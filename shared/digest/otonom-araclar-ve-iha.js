window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["otonom-araclar-ve-iha"] = {
  slug: "otonom-araclar-ve-iha",
  title: "Otonom Araçlar ve İHA: Gören, Planlayan, Düzelten Makineler",
  field: "Mühendislik",
  level: "Lise",
  minutes: 35,
  tagline:
    "Sürücüsüz bir araç saniyede onlarca kez üç soru sorar: Neredeyim, ne görüyorum, nereden gideyim? Lazer, radar, 1968 tarihli bir algoritma ve yüz yıllık bir geri besleme fikri bu soruları yanıtlar.",
  hook:
    "Mart 2004'te Mojave Çölü'nde 15 sürücüsüz araç 240 kilometrelik bir yarışa başladı. En iyisi 12 kilometre gidebildi; ötekiler kuma saplandı, çitlere takıldı ya da olduğu yerde döndü. On dokuz ay sonra aynı çölde beş araç bitiş çizgisini geçti. Bu kadar kısa sürede ne değişmişti? Motorlar değil; makinelerin görme, planlama ve kendi hatasını düzeltme biçimi.",
  bigIdea:
    "Otonom bir makine üç halkalı bir döngüdür: sensörler dünyayı ölçer (<strong>algılama</strong>), bir algoritma hedefe giden yolu seçer (<strong>planlama</strong>), bir denetleyici hatayı durmadan küçültür (<strong>kontrol</strong>). Döngü bir arabada saniyede onlarca, bir drone'da binlerce kez döner.",
  story: [
    "1925'te New York'ta Broadway boyunca içinde kimsenin olmadığı bir otomobil ilerledi; Houdina Radio Control şirketinin aracı, arkasından gelen ikinci bir arabadan radyo dalgalarıyla yönetiliyordu. Bu bir uzaktan kumandaydı, otonomi değil: karar veren hâlâ bir insandı. Aracın kendi gözüyle görüp kendi karar vermesi için elli yıl geçmesi gerekti. 1977'de Japonya'daki Tsukuba Makine Mühendisliği Laboratuvarı'nın aracı, yoldaki beyaz işaretleri iki kamerayla izleyerek saatte 30 kilometreye ulaştı. Asıl sıçrama Münih'te oldu: Ernst Dickmanns'ın ekibi 1987'de kamerayla gören bir Mercedes minibüsü boş otoyolda saatte 96 kilometreye çıkardı; 1994'te iki aracı Paris çevresindeki üç şeritli otoyolda trafiğin içinde bin kilometreden fazla yol aldı; 1995'te Münih'ten Kopenhag'a gidip dönen 1.600 kilometreyi aşkın yolculukta araç yer yer saatte 175 kilometreye çıktı ve zamanın yaklaşık yüzde 95'inde direksiyon bilgisayardaydı. Aynı yıl Carnegie Mellon'ın Navlab 5 aracı ABD'yi bir uçtan ötekine geçti: 4.500 kilometrenin yüzde 98'inde direksiyonu bilgisayar çevirdi, gaz ve freni ise hâlâ insan kullanıyordu.",
    "Sonra kamu parası ve bir yarış işin rengini değiştirdi. ABD Savunma Bakanlığı'nın araştırma kolu DARPA, 2004'te Mojave Çölü'nde bir milyon dolar ödüllü yarış düzenledi; hiçbir araç bitiremedi, en iyi derece Carnegie Mellon'ın Sandstorm'unun 11,8 kilometresiydi. 2005'teki ikinci yarışta Stanford'un Sebastian Thrun yönetimindeki Stanley adlı Volkswagen'i 212 kilometrelik parkuru 6 saat 53 dakikada tamamladı; toplam beş araç bitirdi. Stanley'nin sırrı daha güçlü motor değil, belirsizlikle barışık bir yazılımdı: lazer ve kameradan gelen gürültülü verileri olasılık hesabıyla birleştiriyor, yolun neresinin sürülebilir olduğunu kendi geçtiği yerlerden öğreniyordu. 2007'de yarış şehre taşındı; trafik ışıkları ve başka araçların olduğu Urban Challenge'ı Carnegie Mellon'ın Boss'u kazandı. Bu ekiplerin üyeleri 2009'da Google'ın sürücüsüz araç projesini kurdu; proje 2016'da Waymo adını aldı, 2020'de Phoenix'te içinde hiç güvenlik sürücüsü olmayan taksileri halka açtı ve 2024'te haftada yüz bin ücretli yolculuğu geçti. Aynı sektörün kırılganlığını da aynı yıllar gösterdi: General Motors'un Cruise'u, Ekim 2023'te bir yayayı sürükleyen kazadan sonra San Francisco'daki iznini kaybetti.",
    "Havadaki hikâye daha eskidir ve daha tuhaf başlar. 1907'de Fransa'da Breguet kardeşlerin dört rotorlu Gyroplane'i yerden yalnızca yarım metre kadar yükselebildi ve dört kişi onu tutmak zorunda kaldı: ilk dört pervaneli hava aracı dengede duramıyordu. Çözüm 1914'te Paris'te sergilendi: Lawrence Sperry, babasının jiroskoplu otopilotunu taktığı uçakla ellerini havaya kaldırıp jüri önünden geçti; makinistin kanat üstünde yürüdüğü anlatılır. Birinci Dünya Savaşı'nda Kettering Bug gibi mürettebatsız uçaklar denendi; 1935'te İngiliz Kraliyet Hava Kuvvetleri'nin uzaktan kumandalı hedef uçağı Queen Bee'nin (kraliçe arı) 'drone' (erkek arı) sözcüğüne esin verdiği söylenir. Modern çağ ise ceplerden çıktı: akıllı telefonlar için üretilen ucuz MEMS jiroskop ve ivmeölçerler 2010'da Parrot AR.Drone'u, 2013'te DJI Phantom'u mümkün kıldı; o dört rotor artık saniyede binlerce kez kendini dengeliyordu. 2014'te Bayraktar TB2 ilk uçuşunu yaptı, 2016'da Zipline Ruanda'da hastanelere sabit kanatlı drone'larla kan taşımaya başladı.",
    "Bu sayfadaki her panel aslında üç eski fikrin bir yüzüdür. 1922'de Nicolas Minorsky, ABD donanması için gemileri otomatik rotada tutan denetleyiciyi tarif ederken bugün PID dediğimiz üçlüyü yazdı: hatanın kendisi, birikimi ve değişim hızı. 1960'ta Rudolf Kálmán, gürültülü ölçümleri bir tahminle birleştiren filtreyi yayımladı; birkaç yıl içinde Apollo'nun Ay'a giden seyir bilgisayarına girdi. 1968'de Stanford Research Institute'ta Peter Hart, Nils Nilsson ve Bertram Raphael, Shakey adlı robotun odalar arasında yol bulması için A* algoritmasını tasarladı. Aşağıdaki ızgarada yeşil yolu çizen kod, o makalenin altmış yıllık fikrinin yirmi satırlık bir uygulamasıdır.",
  ],
  core: [
    {
      heading: "Mesafeyi zamanla ölçmek: LiDAR, radar, ultrasonik",
      body:
        "Üç sensör de aynı numarayı yapar: bir dalga gönderir, yankının dönüşünü bekler, süreyi ikiye böler. Fark, dalganın hızındadır. LiDAR ışık kullanır; ışık nanosaniyede 30 santimetre gittiğinden 100 metredeki bir cismin yankısı 667 nanosaniyede döner ve sayaç bu kadar kısa süreleri sayabilmelidir. Ultrasonik sensör sesle çalışır; ses saniyede 343 metre gittiğinden 5 metreye gidip gelmek 29 milisaniye alır, bu yüzden park sensörü yalnızca yakını ölçer. Radar ise radyo dalgasıyla mesafeyi ölçerken yankının frekansındaki kaymadan hızı da okur: <strong>Doppler etkisi</strong>. 77 GHz'lik bir araç radarı için saniyede 30 metre yaklaşan bir cisim frekansı 15,4 kHz kaydırır. Kamera hiçbirini doğrudan ölçmez; derinliği iki görüntüyü karşılaştırarak ya da öğrenerek çıkarır. Sayfadaki altı sensör kartı bu takasları listeler: LiDAR sis ve yağmurda kör, radar küçük cisimlere kör, kamera karanlığa kör.",
      formula: "d = c·Δt / 2,   Δf = 2·v·f<sub>0</sub> / c",
      formulaNote: "Δt gidiş-dönüş süresi, c dalganın hızı (ışık 3×10⁸ m/s, ses 343 m/s). Doppler kaymasında v yaklaşma hızı, f₀ gönderilen frekans.",
    },
    {
      heading: "Kalman filtresi: iki belirsiz ölçüyü tartmak",
      body:
        "GPS aracın 100 metrede olduğunu söylüyor ama ±5 metre şaşabiliyor; tekerlek sayacı ve IMU'dan yapılan tahmin 103 metre diyor ve ±2 metre güvenilir. Hangisine inanmalı? İkisine de, ama güvenilirlikleriyle orantılı. <strong>Kalman filtresi</strong> tam bunu yapar: tahmini, ölçümle arasındaki farkın bir kesriyle düzeltir; kesir, iki belirsizliğin karelerinin oranından gelir. Örnekte K = 4/(4+25) ≈ 0,14; düzeltilmiş konum 103 + 0,14·(100 − 103) ≈ 102,6 metre ve yeni belirsizlik yaklaşık ±1,9 metre. Birleşik tahmin, iki kaynağın her birinden daha kesindir. Araç tünele girip GPS kesilince K sıfıra yaklaşır ve IMU tek başına sürer; sayfadaki 'Sensor Fusion' kartının 'gürültülü verilerden optimal kestirim' dediği şey bu basit tartıdır, her adımda yeniden hesaplanır.",
      formula: "x̂ = x⁻ + K·(z − x⁻),   K = P / (P + R)",
      formulaNote: "x⁻ tahmin, z ölçüm, P tahminin varyansı (σ²), R ölçümün varyansı. K birse yalnız ölçüme, sıfırsa yalnız tahmine inanılır.",
    },
    {
      heading: "A*: bilinen maliyet artı dürüst bir umut",
      body:
        "Yol bulma, her kavşakta 'nereye bakayım' sorusudur. Dijkstra'nın 1959'da yayımladığı yöntem başlangıçtan uzaklığa (<em>g</em>) göre her yöne eşit açılır; bu güvenlidir ama hedefin ters yönündeki sokakları da gezer. A* buna bir tahmin ekler: hedefe kalan yolun alt sınırı <em>h</em>. Öncelik f = g + h olur; hedefe uzaklaşan kareler sıraya düşer, kuyruk hedefe doğru uzanır. Kritik koşul <strong>kabul edilebilirlik</strong>tir: h gerçek kalan yoldan asla büyük olmamalıdır; o zaman A* en kısa yolu bulmayı garanti eder. Sayfadaki ızgara dört komşuya izin verir (çapraz yok), her adım 1'dir ve h olarak Manhattan uzaklığı (sütun farkı + satır farkı) kullanılır; dört komşulu ızgarada bu, kalan yolun tam alt sınırıdır. h'yi sıfır alsan Dijkstra'ya dönersin: aynı yol, çok daha fazla ziyaret. h'yi abartırsan açgözlü aramaya dönersin: hızlı ama bazen dolambaçlı.",
      formula: "f(n) = g(n) + h(n),   h<sub>Manhattan</sub> = |x − x<sub>G</sub>| + |y − y<sub>G</sub>|",
      formulaNote: "g başlangıçtan n'ye bilinen en iyi maliyet, h n'den hedefe tahmin. Sayfadaki kod en küçük f'li kareyi seçer; eşitlikte önce eklenen kazanır.",
    },
    {
      heading: "PID: hatayı üç gözle görmek",
      body:
        "Yol çizildi; şimdi araç onun üstünde kalmalı. Hız sabitleyiciye 100 km/sa dediniz, araç 95'te: hata 5. <strong>Oransal</strong> terim hatayla orantılı gaz verir; hata küçüldükçe gaz azalır, ama yokuşta hata hiç sıfıra inmez, çünkü sıfır hata sıfır ek gaz demektir. <strong>İntegral</strong> terim hatanın zaman içindeki birikimini toplar ve o kalıcı açığı kapatır. <strong>Türev</strong> terim hatanın değişim hızına bakar: hedefe hızla yaklaşırken frene basar, aşmayı ve salınımı söndürür. Üç katsayıyı ayarlamak (Kp, Ki, Kd) bir mühendislik zanaatıdır; fazla P salındırır, fazla I gecikir, fazla D gürültüye kapılır. Sayfanın uçuş kontrolörü kartındaki sayı bu yüzden şaşırtıcıdır: Betaflight yazılımı jiroskopu saniyede 8.000, PID döngüsünü 4.000 kez çalıştırır. Bir arabada aynı döngü saniyede onlarca kez yeter; drone'un dengesi o kadar sabırlı değildir.",
      formula: "u(t) = K<sub>p</sub>·e(t) + K<sub>i</sub>·∫e dt + K<sub>d</sub>·de/dt",
      formulaNote: "e hedef ile ölçüm arasındaki hata, u motora/direksiyona giden komut. Üç terim aynı anda hesaplanıp toplanır.",
    },
    {
      heading: "Dört pervane, bir denge",
      body:
        "Dört rotorlu drone'un dört motoru dışında hareketli parçası yoktur; bütün manevralar dört hız sayısından türer. Askıda dört itkinin toplamı ağırlığa eşittir. Çapraz köşelerdeki motorlar aynı yönde, komşular ters yönde döner; böylece pervanelerin gövdeyi ters yöne çevirmeye çalışan tepki torkları birbirini götürür. Öne eğilmek için arka iki motor hızlanır, burnu çevirmek (yaw) için bir çapraz çift hızlanıp öteki yavaşlar: toplam itki aynı kalır, tork dengesi bozulur ve gövde döner. Motor kartındaki <strong>KV</strong> değeri volt başına devirdir: 2300 KV'lik bir motor 14,8 voltluk 4S pilde yüksüz dakikada 34.000 devire çıkar. Bütün bu hesap dengesizdir: eğik duran bir drone kendini düzeltmez, aksine daha çok eğilir. Onu havada tutan şey pervane değil, saniyede binlerce kez dönen PID döngüsüdür.",
      formula: "T<sub>1</sub> + T<sub>2</sub> + T<sub>3</sub> + T<sub>4</sub> = m·g   (askı)",
      formulaNote: "T her motorun itkisi (newton), m drone kütlesi, g = 9,81 m/s². Eğik uçuşta dikey bileşenler toplamı ağırlığı karşılamalıdır.",
    },
  ],
  lab: {
    intro:
      "Sayfanın tek hesap yapan bölümü <strong>A* Algoritması Simülasyonu</strong>dur. Izgaraya tıklayınca kare kırmızı engel olur (ikinci tıklama kaldırır), <strong>Yol Bul</strong> yeşil yolu çizer, <strong>Rastgele Engeller</strong> her kareyi yüzde 22 olasılıkla kapatır, <strong>Engelleri Temizle</strong> ızgarayı boşaltır. S sol üst köşeden bir kare içeridedir; G sağ kenardan bir kare içeride ve dikeyde ortadadır. Izgara ekrana göre kurulur: geniş ekranda 36 sütun × 15 satır, telefonda yaklaşık 15 × 11. Aşağıdaki sayılar geniş ekran içindir; kendi ızgaranda şu hesabı yap: en kısa yolun adım sayısı = S ile G arasındaki sütun farkı + satır farkı; yeşil kare sayısı bunun bir fazlasıdır (S ve G'nin altındaki kareler de boyanır). İki uyarı: sağ kenara yaklaştıkça tıklama bir kare sola kayabilir, kırmızı karenin nereye düştüğüne bak; pencereyi yeniden boyutlandırmak bütün engelleri siler.",
    experiments: [
      {
        title: "Boş ızgarada yol hangi biçimi alır?",
        predict:
          "Engelsiz ızgarada Yol Bul'a basınca yeşil yol nasıl görünür: köşegen gibi bir merdiven mi, düz bir L mi? Kaç kare boyanır? Geniş ekranda sütun farkı 33, satır farkı 6'dır.",
        do: "Engelleri Temizle'ye, sonra Yol Bul'a bas. Yeşil kareleri S'den G'ye say. Telefondaysan önce S ile G arasındaki sütun ve satır farkını say.",
        observe:
          "Yol bir L çizer: S'den dümdüz aşağı iner, G'nin satırına gelince dümdüz sağa döner. Geniş ekranda 40 kare boyanır (39 adım); 15 × 11'lik telefon ızgarasında 17 kare (16 adım).",
        explain:
          "Dört komşulu ızgarada S'den G'ye yalnızca aşağı ve sağa giden her yol aynı uzunluktadır; geniş ekranda böyle 3.262.623 yol vardır (39 adımın 6'sını 'aşağı' seçmek). A* hepsini eşit görür; L'yi seçen şey kodun komşuları aşağı, sağ, yukarı, sol sırasıyla eklemesi ve eşit öncelikte ilk ekleneni almasıdır. Algoritma en kısa yolu garanti eder, hangi en kısa yolu değil.",
      },
      {
        title: "Tek engel bedava, iki engel iki adım",
        predict:
          "Yeşil yolun yatay bölümünün ortasındaki bir kareyi engel yaparsan yeni yol kaç kare olur: 40 mı, 42 mi? Peki S'nin hemen altındaki ve hemen sağındaki iki kareyi kapatırsan?",
        do: "Yoldaki bir yeşil kareye tıkla; yol anında silinir. Yol Bul'a bas ve say. Engelleri Temizle; sonra S'nin altındaki ve sağındaki kareleri kırmızı yap, Yol Bul.",
        observe:
          "Tek engelde yol yine 40 kare: engelden bir satır yukarı kayar, sonra inip devam eder. S'nin iki komşusu kapalıyken 42 kare: yol S'den yukarı çıkar, sağa döner ve engeli dolaşarak eski L'ye katılır.",
        explain:
          "Yoldaki tek bir kare milyonlarca eş uzunluktaki yoldan yalnızca bir kısmını keser; A* bedelsiz bir başkasına geçer. Ama her en kısa yol ya 'bir aşağı' ya 'bir sağa' adımıyla başlamak zorundadır. İkisi de kapalıysa ilk adım yanlış yöne atılır ve geri alınır: tam iki adım, 41 adım, 42 kare. Darboğazlar engelin sayısına değil yerine bakar.",
      },
      {
        title: "Duvar ve kapı: kapı nerede olmalı?",
        predict:
          "Izgaranın ortasına yukarıdan aşağıya tam bir duvar ör, tek bir kapı bırak. Kapı en üst satırdaysa yol kaç kare olur, en alt satırdaysa kaç? Duvarı başka bir sütuna taşısan sayılar değişir mi?",
        do: "Orta sütunlardan birinde en üst kare hariç her kareyi kırmızı yap (14 tıklama), Yol Bul ve say. Engelleri Temizle; aynı duvarı bu kez en alt kare hariç ör, Yol Bul. Son olarak kapıyı G'nin satırına aç.",
        observe:
          "Kapı üstteyken 42 kare (+2), alttayken 54 kare (+14), G'nin satırındayken yine 40. Duvarı hangi sütuna örersen ör sayılar aynı kalır. Telefon ızgarasında aynı üç deney 19, 27 ve 17 kare verir.",
        explain:
          "Yol kapıdan geçmek zorundadır; uzunluk S'den kapıya artı kapıdan G'ye Manhattan uzaklığıdır. Üst kapı için (c − 1) + 1 + (34 − c) + 7 = 41 adım: c sadeleşir, sütun önemsizdir. Alt kapı için satır bedeli 13 + 7 = 20'ye çıkar. Kapı G'nin satırındaysa L zaten oradan geçer, bedel sıfırdır. Gerçek araçta da en uzun yol, en çok engelin değil, en ters yerdeki tek kapının yoludur.",
      },
      {
        title: "Çıkış yoksa ne olur? Rastgele engellerde kaçta kaç?",
        predict:
          "S'nin dört komşusunu da kapatıp Yol Bul'a basınca sayfa ne der? Rastgele Engeller'i 20 kez üst üste deneyip her seferinde Yol Bul'a bassan kaçında yol bulunur?",
        do: "S'nin üst, alt, sol ve sağ karelerini kırmızı yap, Yol Bul. Temizle; sonra 20 kez sırayla Rastgele Engeller ve Yol Bul'a basıp yolun çizilip çizilmediğini çetele tut.",
        observe:
          "Kuşatılmış S'de hiçbir şey olmaz: ne yol ne uyarı. Rastgele turların yaklaşık 19'unda yol çizilir; yol engellere yapışarak kıvrılır, L biçimi kaybolur. Başarısız turlarda S ya da G'nin çevresi kapanmıştır.",
        explain:
          "Kod yol bulamazsa sessizce boş çizer; gerçek bir araç 'rota yok' demeli ve durmalıdır. S kuşatılmışken A* tek kare bakıp bitirir; G kuşatılmışsa önce ulaşılabilen 500 küsur karenin hepsini gezer. Yüzde 22'lik kapalı kare oranı, kare ızgarada rastgele engellerin geçişi kesmeye başladığı yüzde 41 eşiğinin çok altındadır; bu yüzden yolu kesen şey çoğu kez ortadaki engeller değil, S ya da G'nin dibine düşen üç dört karedir. Bizim 2.000 rastgele ızgaralık denememizde yol oranı yüzde 95 çıktı.",
      },
    ],
  },
  wow: [
    {
      title: "Titreyen bir robot için yazılan algoritma",
      body:
        "A* 1968'de Stanford Research Institute'ta Shakey için tasarlandı: tekerlekli, kameralı, kendi eylemleri üzerine akıl yürüten ilk hareketli robot. Adı, hareket ederken sallanmasından geliyordu; hesaplarını radyo bağlantısıyla oda büyüklüğünde bir bilgisayara yaptırıyordu. Aynı algoritma bugün bu sayfada milisaniyede, telefonundaki harita uygulamasında her gün çalışır.",
    },
    {
      title: "Günde 38 mikrosaniye, günde 10 kilometre",
      body:
        "GPS uyduları konumu zamanla ölçer: ışık nanosaniyede 30 santimetre gider, alıcı sinyalin ne kadar yolda kaldığını saniyenin milyarda birine kadar sayar. Uydulardaki atom saatleri görelilik yüzünden yerdekilere göre günde yaklaşık 38 mikrosaniye ileri gider; düzeltilmese hata her gün 10 kilometreden fazla büyürdü. Sayfadaki 'RTK ile santimetre hassasiyeti' bu düzeltmelerin üstüne kurulur.",
    },
    {
      title: "On dokuz ayda 12 kilometreden 212 kilometreye",
      body:
        "Mart 2004'teki ilk DARPA Grand Challenge'da en iyi araç 11,8 kilometre gidebildi; ödül sahipsiz kaldı. Ekim 2005'te Stanford'un Stanley'si 212 kilometrelik çöl parkurunu 6 saat 53 dakikada bitirip 2 milyon doları aldı, beş araç çizgiyi geçti. Stanley bugün Washington'daki Smithsonian Ulusal Amerikan Tarihi Müzesi'nde duruyor.",
    },
  ],
  worked: {
    title: "Askıdaki drone'un enerji hesabı",
    prompt:
      "Kütlesi 1,2 kg olan dört rotorlu bir drone, sayfadaki batarya kartına uygun bir 4S LiPo pil taşıyor: 14,8 V nominal, 1,5 Ah, 100C. Askıda toplam akım 15 A ölçülüyor. Her motorun itkisini, askı gücünü, uçuş süresini ve pilin akım sınırını bul.",
    steps: [
      "Askıda itki ağırlığa eşittir: T = m·g = 1,2 kg × 9,81 m/s² ≈ 11,8 N. Dört motora bölünür: her motor 2,94 N, yani yaklaşık 300 gram-kuvvet üretmelidir. Motor ve pervane bu değerin en az iki katını verebilmeli ki manevra payı kalsın.",
      "Askı gücü: P = V·I = 14,8 V × 15 A = 222 W. Bu güç havayı aşağı itmeye, motor ve pervane kayıplarına gider; iki ampullük bir güç yalnızca havada durmak için.",
      "Uçuş süresi: t = Q / I = 1,5 Ah / 15 A = 0,10 saat = 6 dakika. LiPo hücreleri 3,0 V'un altına indirilmez, bu yüzden kapasitenin yaklaşık yüzde 80'i kullanılır: gerçekçi süre 4,8 dakika. Sayfadaki 'quadcopter 15–25 dakika' değeri daha büyük pil ve daha verimli, yavaş dönen pervanelerle elde edilir.",
      "Akım sınırı: 100C × 1,5 Ah = 150 A. Askıdaki 15 A pilin gücünün yalnızca onda biridir (10C); sınırlayan şey güç değil, enerjidir: 14,8 V × 1,5 Ah ≈ 22 Wh, bir dizüstü pilinin yarısından az.",
      "Karşılaştır: sabit kanatlı bir İHA ağırlığını pervaneyle değil kanattaki kaldırma kuvvetiyle taşır; motor yalnızca sürüklemeyi yener. Aynı 22 Wh ile saatlerce süzülmesinin nedeni budur; sayfadaki İHA çeşitleri kartı '2–4 saat' der.",
    ],
    result:
      "Her motor ≈ 2,9 N (300 gf), askı gücü 222 W, uçuş süresi 6 dakika (kullanılabilir kapasiteyle ≈ 4,8 dakika), pil akım sınırı 150 A. Dört rotorlu drone'u kısa uçuran şey motorun gücü değil, ağırlığı sürekli itkiyle taşımak zorunda olmasıdır.",
  },
  misconceptions: [
    {
      myth: "'Autopilot' ya da 'Full Self-Driving' yazan araç sürücüsüzdür.",
      truth:
        "Sayfadaki seviye kartlarına göre bu sistemler L2'dir: araç direksiyonu ve gazı aynı anda yönetir ama sorumluluk her an sürücüdedir, eller direksiyonda, gözler yolda. Sürücünün gözünü yoldan ayırabildiği ilk seviye L3'tür ve o da yalnızca belirli koşullarda, uyarıldığında devralmak şartıyla. Gerçekten sürücüsüz L4 araçlar yalnızca sınırları çizilmiş alanlarda (ODD) çalışır.",
    },
    {
      myth: "LiDAR her şeyi görür; onu takan araç kör olmaz.",
      truth:
        "LiDAR mesafeyi milimetre hassasiyetiyle ölçer ama rengi ve yazıyı görmez: trafik ışığının kırmızı mı yeşil mi olduğunu, levhadaki sayıyı bilemez. Yağmur damlası ve sis lazer darbesini saçar. Radar sisi deler ama bir duvarla bir yayayı güç ayırır; kamera ikisini de ayırır ama karanlıkta kalır. Füzyon lüks değil zorunluluktur, her sensör ötekinin kör noktasını örter.",
    },
    {
      myth: "A* 'en kısa yolu' bulur; demek ki tek bir doğru cevap vardır.",
      truth:
        "Boş ızgarada milyonlarca eş uzunlukta yol vardır; A* bunlardan birini, kodun komşu sırasına göre seçer. Üstelik ızgaranın 'en kısa'sı Manhattan uzaklığıdır: çapraz adım yoksa köşegen gitmek serbest değildir. Gerçek yollarda eğri, hız sınırı ve dönüş yasağı maliyete eklenir; algoritma aynıdır, maliyet tanımı değişir.",
    },
    {
      myth: "Askıda duran drone enerji harcamaz; hareket etmiyor ki.",
      truth:
        "Askı, en pahalı uçuş durumlarından biridir: dört pervane her an ağırlığa eşit itki üretmek için havayı aşağı itmek zorundadır. Çözümlü örnekte yalnızca yerinde durmak 222 watt istiyordu. Sabit kanatlı bir İHA'nın saatlerce uçmasının sırrı, ağırlığı itkiyle değil kanadın kaldırma kuvvetiyle taşımasıdır.",
    },
  ],
  glossary: [
    { term: "SAE J3016 seviyesi", definition: "Sürüş otomasyonunu L0 (hepsi insanda) ile L5 (her koşulda makine) arasında altı basamağa ayıran standart; L3'ten itibaren araç belirli koşullarda bütün sürüşü üstlenir." },
    { term: "ODD (Operasyonel Tasarım Alanı)", definition: "Bir otonom sistemin çalışmak üzere tasarlandığı koşullar kümesi: bölge, hava, hız, yol türü; dışına çıkamaz." },
    { term: "LiDAR", definition: "Lazer darbelerinin gidiş-dönüş süresinden mesafe ölçüp çevrenin üç boyutlu nokta bulutunu çıkaran sensör." },
    { term: "IMU", definition: "Üç eksenli ivmeölçer ve üç eksenli jiroskoptan oluşan atalet ölçüm birimi; konumu dışarıdan sinyal almadan kısa süreli kestirir." },
    { term: "Sensör füzyonu", definition: "Farklı sensörlerin gürültülü ölçümlerini belirsizlikleriyle tartarak tek bir dünya modelinde birleştirme; klasik aracı Kalman filtresidir." },
    { term: "Kabul edilebilir sezgisel", definition: "A*'da hedefe kalan maliyeti asla abartmayan tahmin fonksiyonu h; bu koşul sağlanırsa bulunan yol en kısa yoldur." },
    { term: "PID denetleyici", definition: "Hatanın kendisi, zaman içindeki toplamı ve değişim hızından oluşan üç terimi katsayılarla toplayıp komut üreten geri besleme döngüsü." },
    { term: "KV", definition: "Fırçasız motorun yüksüz devir sabiti: volt başına dakikadaki devir; düşük KV büyük pervane ve yüksek tork demektir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede PID üç terimli bir formüldür; üniversitede <strong>kontrol teorisi</strong> olur: sistemin durumu bir vektör, davranışı bir diferansiyel denklem takımıdır ve denetleyicinin kararlı olup olmadığı özdeğerlerden okunur. Sayfadaki MPC kutusu bunun bir adım ötesidir; her an gelecek birkaç saniyeyi bir optimizasyon problemi olarak çözer ve yalnızca ilk komutu uygular. Algılama tarafında Kalman filtresi, <strong>olasılıksal robotik</strong> adlı bir alanın kapısıdır: aracın hem haritayı çıkarıp hem kendini o haritada konumlandırdığı SLAM problemi, Stanley'nin çölde kullandığı parçacık filtreleri, derin öğrenmeyle nesneleri tanıyan kameralar hep aynı soruya cevaptır: belirsiz ölçümlerden en olası dünya hangisi?",
      "Planlama tarafında ızgara yerini sürekli uzaylara bırakır. Bir robot kolunun ya da bir aracın bütün olası duruşları bir <strong>konfigürasyon uzayı</strong> oluşturur; A* burada da çalışır ama hücreler patlar, bu yüzden rastgele örnekleyen RRT gibi yöntemler doğdu. Drone tarafı aerodinamik ve uçuş mekaniğine, gömülü yazılıma ve gerçek zamanlı işletim sistemlerine açılır: saniyede dört bin döngü, her döngünün 250 mikrosaniyede bitmesi demektir. En zor sorular ise denklemsizdir: L3'te direksiyonu devralmayan sürücüden kim sorumludur, drone hava sahasında kimin kuralıyla uçar, bir filo için 'yeterince güvenli' nasıl ölçülür? Mühendislik, Cruise'un 2023'te öğrendiği gibi, bu sorularla da sınanır.",
    ],
    topics: [
      "Kontrol teorisi ve durum uzayı",
      "Olasılıksal robotik: Kalman, parçacık filtresi, SLAM",
      "Hareket planlama: konfigürasyon uzayı, RRT",
      "Bilgisayarla görü ve derin öğrenme",
      "Gömülü sistemler ve gerçek zamanlı yazılım",
      "Uçuş mekaniği ve aerodinamik",
      "Otonomide etik, güvenlik ve regülasyon",
    ],
  },
  quiz: [
    {
      question: "A*'da f = g + h önceliğinde h'yi her kare için sıfır alırsan ne olur?",
      options: [
        "Bulunan yol uzar",
        "Aynı en kısa yol bulunur ama çok daha fazla kare gezilir",
        "Algoritma hiç yol bulamaz",
        "Yol kısalır çünkü tahmin hatası ortadan kalkar",
      ],
      answer: 1,
      explanation:
        "h = 0 kabul edilebilir bir sezgiseldir (hiçbir zaman abartmaz), bu yüzden en kısa yol garantisi sürer; ama öncelik yalnızca g'ye kalır ve arama Dijkstra gibi her yöne eşit açılır. Hedefin ters yönündeki kareler de gezilir: aynı cevap, daha çok iş.",
    },
    {
      question: "Hangi SAE seviyesinde sürücü gözünü yoldan ayırabilir ama araç uyardığında devralmak zorundadır?",
      options: ["L1", "L2", "L3", "L4"],
      answer: 2,
      explanation:
        "L2'de eller ve gözler sürüştedir. L3 (koşullu otomasyon) belirli koşullarda bütün sürüşü araca verir, ancak sürücü uyarıldığında devralmalıdır; sorumluluğun el değiştirdiği bu an onu en tartışmalı seviye yapar. L4'te sınırları çizilmiş alanda devralma beklenmez.",
    },
    {
      question: "Bir LiDAR darbesi gönderildikten 1 mikrosaniye sonra yankısı dönüyor. Cisim ne kadar uzakta?",
      options: ["300 m", "150 m", "30 m", "3 km"],
      answer: 1,
      explanation:
        "Işık 1 mikrosaniyede 300 metre gider; bu süre gidiş ve dönüşü kapsar, bu yüzden ikiye bölünür: d = c·Δt/2 = 150 m. Aynı hesap sesle yapılsaydı (343 m/s) 1 mikrosaniye yalnızca 0,17 milimetreye karşılık gelirdi.",
    },
  ],
  next: [
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "Dijkstra, A* ve ötekilerini adım adım izle; buradaki yeşil yolun arkasındaki kuyruğu gör." },
    { href: "elektrikli-araclar.html", title: "Elektrikli Araçlar", why: "Drone'u ve otonom aracı besleyen lityum hücrenin kimyası, kWh ve C-değeri muhasebesi." },
    { href: "doppler-etkisi.html", title: "Doppler Etkisi", why: "Araç radarının hızı nasıl okuduğunu kaynağın ve gözlemcinin hareketiyle dene." },
    { href: "ucak-muhendisligi-ve-aerodinamik.html", title: "Uçak Mühendisliği ve Aerodinamik", why: "Sabit kanatlı İHA'nın saatlerce uçmasını sağlayan kaldırma kuvveti ve sürükleme." },
  ],
  sources: [
    { title: "Wikipedia · A* search algorithm", url: "https://en.wikipedia.org/wiki/A*_search_algorithm", note: "Hart, Nilsson ve Raphael'in 1968 makalesi, kabul edilebilirlik ve sezgisel seçimi (İngilizce)." },
    { title: "Wikipedia · DARPA Grand Challenge (2005)", url: "https://en.wikipedia.org/wiki/DARPA_Grand_Challenge_(2005)", note: "Stanley'nin kazandığı yarışın parkuru, süreleri ve bitiren beş araç." },
    { title: "Wikipedia · PID controller", url: "https://en.wikipedia.org/wiki/PID_controller", note: "Minorsky'nin 1922 çalışmasından ayarlama yöntemlerine; üç terimin etkisi grafiklerle." },
    { title: "Vikipedi · İnsansız hava aracı", url: "https://tr.wikipedia.org/wiki/%C4%B0nsans%C4%B1z_hava_arac%C4%B1", note: "İHA tarihçesi, sınıfları ve Türkiye'deki gelişmeler (Türkçe)." },
  ],
  revision: "Ekim 2026",
};
