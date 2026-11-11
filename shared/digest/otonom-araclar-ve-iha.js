window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["otonom-araclar-ve-iha"] = {
  slug: "otonom-araclar-ve-iha",
  title: "Otonom Araçlar ve İHA: Gören, Planlayan, Düzelten Makineler",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Sürücüsüz bir araç saniyede onlarca kez üç soru sorar: Neredeyim, ne görüyorum, nereden gideyim? Lazer, radar, 1968 tarihli bir algoritma ve yüz yıllık bir geri besleme fikri bu soruları yanıtlar.",
  hook:
    "Mart 2004'te Mojave Çölü'nde 15 sürücüsüz araç yaklaşık 230 kilometrelik bir yarışa başladı. En iyisi 12 kilometre gidebildi; ötekiler kuma saplandı, çitlere takıldı ya da daha başlangıç alanından çıkamadı. On dokuz ay sonra aynı çölde beş araç bitiş çizgisini geçti. Bu kadar kısa sürede ne değişmişti? Motorlar değil; makinelerin görme, planlama ve kendi hatasını düzeltme biçimi.",
  bigIdea:
    "Otonom bir makine üç halkalı bir döngüdür: sensörler dünyayı ölçer (<strong>algılama</strong>), bir algoritma hedefe giden yolu seçer (<strong>planlama</strong>), bir denetleyici hatayı durmadan küçültür (<strong>kontrol</strong>). Döngü bir arabada saniyede onlarca, bir drone'da binlerce kez döner.",
  story: [
    "1925'te New York'ta Broadway boyunca içinde kimsenin olmadığı bir otomobil ilerledi; Houdina Radio Control şirketinin aracı, arkasından gelen ikinci bir arabadan radyo dalgalarıyla yönetiliyordu. Bu bir uzaktan kumandaydı, otonomi değil: karar veren hâlâ bir insandı. Aracın kendi gözüyle görüp kendi karar vermesi için elli yıl geçmesi gerekti. 1977'de Japonya'daki Tsukuba Makine Mühendisliği Laboratuvarı'nın aracı, yoldaki beyaz işaretleri iki kamerayla izleyerek saatte 30 kilometreye ulaştı. Asıl sıçrama Münih'te oldu: Ernst Dickmanns'ın ekibi 1987'de kamerayla gören bir Mercedes minibüsü boş otoyolda saatte 96 kilometreye çıkardı; 1994'te iki aracı Paris çevresindeki üç şeritli otoyolda trafiğin içinde bin kilometreden fazla yol aldı; 1995'te Münih'ten Danimarka'ya gidip dönen yaklaşık 1.600 kilometrelik yolculukta araç yer yer saatte 175 kilometreye çıktı ve yolun yaklaşık yüzde 95'inde direksiyon bilgisayardaydı. Aynı yıl Carnegie Mellon'ın Navlab 5 aracı ABD'yi bir kıyıdan ötekine geçti: 4.600 kilometreye yakın yolun yüzde 98'inde direksiyonu bilgisayar çevirdi, gaz ve freni ise hâlâ insan kullanıyordu.",
    "Sonra kamu parası ve bir yarış işin rengini değiştirdi. ABD Savunma Bakanlığı'nın araştırma kolu DARPA, 2004'te Mojave Çölü'nde bir milyon dolar ödüllü bir yarış düzenledi; hiçbir araç bitiremedi, en iyi derece Carnegie Mellon'ın Sandstorm'unun 11,8 kilometresiydi. 2005'teki ikinci yarışta Stanford'un Sebastian Thrun yönetimindeki Stanley adlı Volkswagen'i 212 kilometrelik parkuru 6 saat 53 dakikada tamamladı; toplam beş araç bitirdi. Stanley'nin sırrı daha güçlü bir motor değil, belirsizlikle barışık bir yazılımdı: lazer ve kameradan gelen gürültülü verileri olasılık hesabıyla birleştiriyor, lazerin yakında 'düz' bulduğu zeminin kamerada nasıl göründüğünü öğrenip aynı görünümü uzakta arıyordu. 2007'de yarış şehre taşındı; kavşakların, park yerlerinin ve başka araçların olduğu Urban Challenge'ı Carnegie Mellon'ın Boss'u kazandı. Bu ekiplerin üyeleri 2009'da Google'ın sürücüsüz araç projesini kurdu; proje 2016'da Waymo adını aldı, 2020'de Phoenix'te içinde güvenlik sürücüsü olmayan taksileri halka açtı ve Ağustos 2024'te haftada yüz bin ücretli yolculuğu geçtiğini duyurdu. Aynı yıllar sektörün kırılganlığını da gösterdi: General Motors'un Cruise'u, Ekim 2023'te bir yayayı sürükleyen kazadan sonra Kaliforniya'daki iznini kaybetti; Aralık 2024'te GM robotaksi programını kapattı.",
    "Havadaki hikâye daha eskidir ve daha tuhaf başlar. 1907'de Fransa'da Breguet kardeşlerin dört rotorlu Gyroplane'i yerden yalnızca yarım metre kadar yükselebildi ve dört kişi onu tutmak zorunda kaldı: ilk dört rotorlu hava aracı kendi başına dengede duramıyordu. Çözümün ilk hâli 1914'te Paris yakınlarında sergilendi: Lawrence Sperry, babasının şirketinde geliştirdiği jiroskoplu dengeleyiciyi taktığı uçakla ellerini havaya kaldırıp jürinin önünden geçti; bu sırada makinistinin kanadın üstünde yürüdüğü anlatılır. Birinci Dünya Savaşı'nda Kettering Bug gibi mürettebatsız uçaklar denendi; 1935'te İngiliz Kraliyet Hava Kuvvetleri'nin uzaktan kumandalı hedef uçağı Queen Bee'nin (kraliçe arı) 'drone' (erkek arı) sözcüğüne esin verdiği söylenir. Modern çağ ise ceplerden çıktı: akıllı telefonlar için üretilen ucuz MEMS jiroskop ve ivmeölçerler 2010'da Parrot AR.Drone'u, 2013'te DJI Phantom'u mümkün kıldı; o dört rotor artık saniyede yüzlerce, sonra binlerce kez kendini dengeliyordu. 2014'te Bayraktar TB2 ilk uçuşunu yaptı, 2016'da Zipline Ruanda'da hastanelere sabit kanatlı drone'larla kan taşımaya başladı.",
    "Bu sayfadaki her panel aslında üç eski fikrin bir yüzüdür. 1922'de Nicolas Minorsky, ABD donanması için gemileri otomatik rotada tutan denetleyiciyi çözümlerken bugün PID dediğimiz üçlüyü yazdı: hatanın kendisi, birikimi ve değişim hızı. 1960'ta Rudolf Kálmán, gürültülü ölçümleri bir tahminle birleştiren filtreyi yayımladı; birkaç yıl içinde Apollo'nun Ay'a giden seyir bilgisayarına girdi. 1968'de Stanford Research Institute'ta Peter Hart, Nils Nilsson ve Bertram Raphael, Shakey adlı robotun odalar arasında yol bulması için A* algoritmasını tasarladı. Aşağıdaki ızgarada yeşil yolu çizen kod, altmış yıla yakın o fikrin otuz satırlık bir uygulamasıdır.",
  ],
  core: [
    {
      heading: "Mesafeyi zamanla ölçmek: LiDAR, radar, ultrasonik",
      body:
        "Üç sensör de aynı numarayı yapar: bir dalga gönderir, yankının dönüşünü bekler, süreyi ikiye böler. Fark, dalganın hızındadır. LiDAR ışık kullanır; ışık nanosaniyede 30 santimetre gittiğinden 100 metredeki bir cismin yankısı 2 × 100 / (3×10⁸) = 667 nanosaniyede döner. Mesafeyi 1 santimetre ayırt etmek için saatin 67 pikosaniyeyi ayırt etmesi gerekir; LiDAR'ı pahalı yapan şey lazer değil, bu kronometredir. Ultrasonik sensör sesle çalışır; ses saniyede 343 metre gittiğinden 5 metreye gidip gelmek 29 milisaniye alır, üstelik ses havada çabuk söner: park sensörü bu yüzden yalnızca yakını ölçer. Radar, radyo dalgasıyla mesafeyi ölçerken yankının frekansındaki kaymadan hızı da okur: <strong>Doppler etkisi</strong>. 77 GHz'lik bir araç radarı için saniyede 30 metre yaklaşan bir cisim frekansı 2 × 30 × 77×10⁹ / (3×10⁸) = 15,4 kHz kaydırır. Kamera hiçbirini doğrudan ölçmez; derinliği iki görüntüyü karşılaştırarak ya da öğrenerek çıkarır. Sayfadaki altı sensör kartı bu takasları listeler: LiDAR yağmur ve siste zayıflar, radarın çözünürlüğü kabadır, kamera karanlıkta zorlanır.",
      formula: "d = c·Δt / 2,   Δf = 2·v·f<sub>0</sub> / c",
      formulaNote: "Δt gidiş-dönüş süresi, c dalganın hızı (ışık 3×10⁸ m/s, 20 °C havada ses 343 m/s). Doppler kaymasında v yaklaşma hızı, f₀ gönderilen frekans; 2 çarpanı dalganın yolu iki kez kat etmesinden gelir.",
    },
    {
      heading: "Kalman filtresi: iki belirsiz ölçüyü tartmak",
      body:
        "GPS aracın 100 metrede olduğunu söylüyor ama ±5 metre şaşabiliyor; tekerlek sayacı ve IMU'dan yapılan tahmin 103 metre diyor ve ±2 metre güvenilir. Hangisine inanmalı? İkisine de, ama güvenilirlikleriyle orantılı. <strong>Kalman filtresi</strong> tam bunu yapar: tahmini, ölçümle arasındaki farkın bir kesriyle düzeltir. Kesri bulmak bir türev sorusudur: birleşik tahminin varyansı (1 − K)²·P + K²·R'dir; K'ye göre türevini sıfırlarsan K = P/(P + R) çıkar. Örnekte P = 2² = 4 m², R = 5² = 25 m², K = 4/29 ≈ 0,14; düzeltilmiş konum 103 + 0,14 × (100 − 103) ≈ 102,6 metre, yeni varyans (1 − K)·P ≈ 3,45 m², yani belirsizlik ±1,9 metre. Birleşik tahmin, iki kaynağın her birinden daha kesindir. Filtre iki adımı sırayla yineler: <em>tahmin</em> adımında araç hareket modeliyle ilerletilir ve belirsizlik büyür (P⁻ = P + Q), <em>düzeltme</em> adımında ölçüm gelir ve belirsizlik küçülür. Araç tünele girip GPS kesilince düzeltme adımı atlanır, P her adımda büyür; sayfadaki 'Sensor Fusion' kartının 'gürültülü verilerden optimal kestirim' dediği şey bu tartıdır.",
      formula: "<span class=hat>x</span> = x⁻ + K·(z − x⁻),   K = P⁻ / (P⁻ + R),   P = (1 − K)·P⁻",
      formulaNote: "x⁻ tahmin, z ölçüm, P⁻ tahminin varyansı (σ²), R ölçümün varyansı, Q hareket modelinin eklediği belirsizlik. K birse yalnız ölçüme, sıfırsa yalnız tahmine inanılır. Tek boyutlu, doğrusal durum; gerçek araçta x bir vektör, P bir matristir.",
    },
    {
      heading: "A*: bilinen maliyet artı dürüst bir umut",
      body:
        "Yol bulma, her kavşakta 'önce nereye bakayım' sorusudur. Dijkstra'nın 1959'da yayımladığı yöntem başlangıçtan uzaklığa (<em>g</em>) göre her yöne eşit açılır; bu güvenlidir ama hedefin ters yönündeki sokakları da gezer. A* buna bir tahmin ekler: hedefe kalan yolun alt sınırı <em>h</em>. Öncelik f = g + h olur; hedeften uzaklaşan kareler sıranın sonuna düşer. Kritik koşul <strong>kabul edilebilirlik</strong>tir: h gerçek kalan yoldan asla büyük olmamalıdır. Kanıtın özü kısadır: en kısa yolun henüz açılmamış her karesinde f, gerçek en kısa uzunluğu aşamaz; daha uzun bir yol hedefe varmadan önce o kare sıranın başına gelir. Sayfadaki ızgara dört komşuya izin verir (çapraz yok), her adım 1'dir ve h olarak Manhattan uzaklığı (sütun farkı + satır farkı) kullanılır; dört komşulu ızgarada bu, kalan yolun olabilecek en sıkı alt sınırıdır. h'yi sıfır alsan Dijkstra'ya dönersin: aynı yol, çok daha fazla inceleme. h'yi abartırsan açgözlü aramaya yaklaşırsın: hızlı ama bazen dolambaçlı.",
      formula: "f(n) = g(n) + h(n),   h<sub>Manhattan</sub> = |x − x<sub>G</sub>| + |y − y<sub>G</sub>|",
      formulaNote: "g başlangıçtan n'ye bilinen en iyi maliyet, h n'den hedefe tahmin. Sayfadaki kod en küçük f'li kareyi seçer; eşitlikte sıraya önce giren kazanır.",
    },
    {
      heading: "PID: hatayı üç gözle görmek",
      body:
        "Yol çizildi; şimdi araç onun üstünde kalmalı. Hız sabitleyiciye 100 km/sa dedin, araç 95'te: hata 5. <strong>Oransal</strong> terim hatayla orantılı gaz verir. Tek başına yetmez; nedenini bir denklem gösterir. Aracı m·dv/dt = u − b·v − d ile modelle (u itki, b·v direnç, d yokuşun geri çeken kuvveti) ve u = K<sub>p</sub>·e yaz. Kalıcı durumda dv/dt = 0 olur ve hata e = (b·v<sub>hedef</sub> + d)/(K<sub>p</sub> + b) değerinde takılır: K<sub>p</sub> ne kadar büyük olursa olsun sıfır değildir, çünkü sıfır hata sıfır gaz demektir. <strong>İntegral</strong> terim hatanın zaman içindeki birikimini toplar; hata sıfırlanana kadar büyümeyi sürdürdüğü için o kalıcı açığı kapatır. <strong>Türev</strong> terim hatanın değişim hızına bakar: hedefe hızla yaklaşırken komutu kısar, aşmayı ve salınımı söndürür. Üç katsayıyı ayarlamak bir zanaattır: fazla P salındırır, fazla I hedefi aşırtıp ağır ağır salındırır, fazla D ölçüm gürültüsünü büyütür. Sayfanın uçuş kontrolörü kartındaki sayı bu yüzden çarpıcıdır: Betaflight jiroskopu saniyede 8.000, PID döngüsünü 4.000 kez çalıştırır. Bir arabada aynı döngü saniyede onlarca kez yeter.",
      formula: "u(t) = K<sub>p</sub>·e(t) + K<sub>i</sub>·∫e dt + K<sub>d</sub>·de/dt",
      formulaNote: "e hedef ile ölçüm arasındaki hata, u motora ya da direksiyona giden komut. Üç terim aynı anda hesaplanıp toplanır.",
    },
    {
      heading: "Dört pervane, bir denge",
      body:
        "Dört rotorlu drone'un dört motoru dışında hareketli parçası yoktur; bütün manevralar dört devir sayısından türer. Askıda dört itkinin toplamı ağırlığa eşittir. Çapraz köşelerdeki motorlar aynı yönde, komşular ters yönde döner; böylece pervanelerin gövdeyi ters yöne çevirmeye çalışan tepki torkları birbirini götürür. Öne eğilmek için arka iki motor hızlanır, burnu çevirmek (yaw) için bir çapraz çift hızlanıp öteki yavaşlar: toplam itki aynı kalır, tork dengesi bozulur ve gövde döner. Askının bedeli momentum kuramından okunur: A alanlı pervane diski havayı v<sub>i</sub> = √(T/(2ρA)) hızıyla aşağı çeker ve en az P = T·v<sub>i</sub> güç harcar; küçük pervane aynı itki için havayı daha hızlı atmak zorundadır, bu yüzden pahalıdır. Motor kartındaki <strong>KV</strong> değeri volt başına devirdir: 2300 KV'lik bir motor 14,8 voltluk 4S pilde yüksüz dakikada 34.000 devire çıkar. Bu düzenin kendiliğinden dengesi yoktur: gövde eğilince itki de onunla birlikte eğilir, geri çeviren bir tork doğmaz ve en küçük bozucu birikir. Drone'u havada tutan şey pervane değil, saniyede binlerce kez dönen PID döngüsüdür.",
      formula: "T<sub>1</sub> + T<sub>2</sub> + T<sub>3</sub> + T<sub>4</sub> = m·g,   P<sub>askı</sub> ≥ T<sup>3/2</sup> / √(2·ρ·A)",
      formulaNote: "T itki (newton), m drone kütlesi, g = 9,81 m/s², ρ hava yoğunluğu (1,225 kg/m³), A dört pervane diskinin toplam alanı. Eşitsizlik ideal alt sınırdır; gerçek güç motor ve pervane kayıplarıyla yaklaşık iki katına çıkar.",
    },
  ],
  lab: {
    intro:
      "Sayfanın hesap yapan bölümü <strong>A* Algoritması Simülasyonu</strong>dur. Izgaraya tıklayınca kare kırmızı engel olur (ikinci tıklama kaldırır), <strong>Yol Bul</strong> yeşil yolu çizer, <strong>Rastgele Engeller</strong> her kareyi yüzde 22 olasılıkla kapatır, <strong>Engelleri Temizle</strong> ızgarayı boşaltır. Düğmelerin altındaki satır sonucu yazar: 'Yol: 40 kare (39 adım) · incelenen kare: 237' ya da 'Yol yok: hedefe ulaşılamıyor'. <em>İncelenen kare</em>, algoritmanın sıradan çekip komşularına baktığı kare sayısıdır; aramanın emeğini ölçer. S sol üst köşeden bir kare içeridedir; G sağ kenardan bir kare içeride ve dikeyde ortadadır. Izgara ekrana göre kurulur: geniş ekranda 36 sütun × 15 satır, telefonda 14 × 11 dolayında. Aşağıdaki sayılar geniş ekran içindir; kendi ızgaranda en kısa yolun adım sayısı S ile G arasındaki sütun farkı + satır farkıdır. Pencereyi yeniden boyutlandırmak bütün engelleri siler.",
    experiments: [
      {
        title: "Boş ızgarada yol hangi biçimi alır, arama ne kadar emek harcar?",
        predict:
          "Engelsiz ızgarada Yol Bul'a basınca yeşil yol nasıl görünür: köşegen gibi bir merdiven mi, düz bir L mi? Sütun farkı 33, satır farkı 6 ise kaç adım? 540 karelik ızgarada 40 karelik yolu bulmak için sence kaç kare incelenir?",
        do: "Engelleri Temizle'ye, sonra Yol Bul'a bas. Yolun biçimine bak, alttaki satırı oku.",
        observe:
          "Yol bir L çizer: S'den dümdüz aşağı iner, G'nin satırına gelince dümdüz sağa döner. Satır 'Yol: 40 kare (39 adım) · incelenen kare: 237' yazar. 14 × 11'lik telefon ızgarasında 16 kare, 15 adım ve 59 inceleme.",
        explain:
          "Dört komşulu ızgarada S'den G'ye yalnızca aşağı ve sağa giden her yol aynı uzunluktadır; geniş ekranda böyle 3.262.623 yol vardır (39 adımın 6'sını 'aşağı' seçmek). Bu yolların üstündeki her karede f = g + h = 39'dur; A* hepsini eşit görür ve S ile G'nin köşe olduğu 34 × 7 = 238 karelik dikdörtgeni, G'nin kendisi dışında baştan sona inceler: 237. Sezgisel, dikdörtgenin dışındaki 302 kareyi eler ama içindeki eşitliği bozamaz. L'yi seçen şey kodun komşuları aşağı, sağ, yukarı, sol sırasıyla eklemesidir. Algoritma en kısa yolu garanti eder, hangi en kısa yolu değil.",
      },
      {
        title: "Tek engel bedava, iki engel iki adım",
        predict:
          "Yeşil yolun yatay bölümünün ortasındaki bir kareyi engel yaparsan yeni yol kaç kare olur: 40 mı, 42 mi? Peki S'nin hemen altındaki ve hemen sağındaki iki kareyi kapatırsan?",
        do: "Yoldaki bir yeşil kareye tıkla; yol silinir. Yol Bul'a bas ve satırı oku. Engelleri Temizle; sonra S'nin altındaki ve sağındaki kareleri kırmızı yap, Yol Bul.",
        observe:
          "Tek engelde yol yine 40 kare: bu kez G'nin satırına inmeden bir üst satırdan gider, engeli geçince iner; incelenen kare 236'ya düşer. S'nin iki komşusu kapalıyken 'Yol: 42 kare (41 adım) · incelenen kare: 275': yol S'den yukarı çıkar, iki kare sağa gider, sonra aşağı dönüp eski L'ye katılır.",
        explain:
          "Yoldaki tek bir kare milyonlarca eş uzunluktaki yoldan yalnızca bir kısmını keser; A* bedelsiz bir başkasına geçer. Ama her en kısa yol ya 'bir aşağı' ya 'bir sağa' adımıyla başlamak zorundadır. İkisi de kapalıysa ilk adım hedeften uzağa atılır ve sonra geri alınır: tam iki adım fazlası. f artık 41 olduğundan dikdörtgenin bir sıra dışındaki kareler de incelenir, sayaç 275'e çıkar. Darboğazı belirleyen engelin sayısı değil, yeridir.",
      },
      {
        title: "Duvar ve kapı: kapı nerede olmalı?",
        predict:
          "Izgaranın ortasına yukarıdan aşağıya tam bir duvar ör, tek bir kapı bırak. Kapı en üst satırdaysa yol kaç kare olur, en alt satırdaysa kaç? Kapı G'nin satırındaysa incelenen kare sayısı boş ızgaradaki 237'den büyük mü olur, küçük mü?",
        do: "Orta sütunlardan birinde en üst kare hariç her kareyi kırmızı yap (14 tıklama), Yol Bul ve satırı yaz. Engelleri Temizle; aynı duvarı bu kez en alt kare hariç ör, Yol Bul. Son olarak yalnızca G'nin satırında kapı bırak.",
        observe:
          "Kapı üstteyken 42 kare ve 290 dolayında inceleme, alttayken 54 kare ve 400 dolayında inceleme, G'nin satırındayken yine 40 kare ama yalnızca 135 dolayında inceleme. Yol uzunlukları duvarın hangi sütunda olduğuna bağlı değildir; inceleme sayıları ise sütuna göre oynar (soldan 19. sütunda tam 288, 397 ve 135). Telefon ızgarasında (14 × 11) üç yol 18, 26 ve 16 kare çıkar.",
        explain:
          "Yol kapıdan geçmek zorundadır; uzunluk S'den kapıya artı kapıdan G'ye Manhattan uzaklığıdır. c sütunundaki üst kapı için (c − 1) + 1 + (34 − c) + 7 = 41 adım: c sadeleşir. Alt kapı için satır bedeli 13 + 7 = 20'ye çıkar, 53 adım. Kapı G'nin satırındaysa L zaten oradan geçer; duvar üstelik dikdörtgendeki eşit f'li karelerin çoğunu kapattığı için arama 237 yerine 135 dolayında kareyle biter. İyi yerleştirilmiş bir engel yolu uzatmaz, aramayı kısaltır.",
      },
      {
        title: "Çıkış yoksa ne olur? Rastgele engellerde kaçta kaç?",
        predict:
          "S'nin dört komşusunu kapatıp Yol Bul'a basınca kaç kare incelenir? Aynısını G'ye yaparsan? Rastgele Engeller'i 20 kez üst üste deneyip her seferinde Yol Bul'a bassan kaçında yol bulunur?",
        do: "S'nin üst, alt, sol ve sağ karelerini kırmızı yap, Yol Bul. Temizle; aynısını G'nin dört komşusuna yap, Yol Bul. Temizle; sonra 20 kez sırayla Rastgele Engeller ve Yol Bul'a basıp sonucu çetele tut.",
        observe:
          "Kuşatılmış S'de satır 'Yol yok: hedefe ulaşılamıyor · incelenen kare: 1' yazar. Kuşatılmış G'de yine yol yoktur ama incelenen kare 535'tir. Rastgele turların 20'de yaklaşık 19'unda yol çizilir; yol engellere yapışarak kıvrılır, L biçimi kaybolur.",
        explain:
          "'Yol yok' demenin tek kesin yolu, ulaşılabilen her kareyi tüketmektir: S kuşatılmışken bu tek karedir, G kuşatılmışken 540 − 4 engel − G = 535 kare. Başarısızlık, başarının en pahalı hâlidir; gerçek bir araç bu yüzden aramaya süre sınırı koyar ve 'rota yok' deyip güvenli biçimde durur. Yüzde 22'lik kapalı kare oranı, kare ızgarada rastgele engellerin geçişi kesmeye başladığı yaklaşık yüzde 41'lik eşiğin çok altındadır; yolu kesen şey çoğu kez ortadaki engeller değil, S ya da G'nin dibine düşen üç dört karedir. Sayfanın kodunu 4.000 rastgele ızgarada çalıştırdığımızda yol oranı yüzde 95 çıktı.",
      },
    ],
  },
  wow: [
    {
      title: "Titreyen bir robot için yazılan algoritma",
      body:
        "A* 1968'de Stanford Research Institute'ta Shakey için tasarlandı: tekerlekli, kameralı, kendi eylemleri üzerine akıl yürüten ilk hareketli robot. Adı, hareket ederken sallanmasından geliyordu; hesaplarını radyo bağlantısıyla oda büyüklüğünde bir bilgisayara yaptırıyordu. Aynı algoritma bugün bu sayfada milisaniyeler içinde çalışır; harita uygulamalarının yol bulucuları onun torunlarıdır.",
    },
    {
      title: "Günde 38 mikrosaniye, günde 10 kilometre",
      body:
        "GPS konumu zamanla ölçer: ışık nanosaniyede 30 santimetre gider, alıcı sinyalin ne kadar yolda kaldığını saniyenin milyarda biri düzeyinde ölçer. Uydulardaki atom saatleri görelilik yüzünden yerdekilere göre günde yaklaşık 38 mikrosaniye ileri gider; düzeltilmese 38 × 10⁻⁶ s × 3×10⁸ m/s ≈ 11 kilometrelik hata her gün birikirdi. Sayfadaki 'RTK ile cm hassasiyeti' bu düzeltmelerin üstüne kurulur.",
    },
    {
      title: "On dokuz ayda 12 kilometreden 212 kilometreye",
      body:
        "Mart 2004'teki ilk DARPA Grand Challenge'da en iyi araç 11,8 kilometre gidebildi; ödül sahipsiz kaldı. Ekim 2005'te Stanford'un Stanley'si 212 kilometrelik çöl parkurunu 6 saat 53 dakikada bitirip 2 milyon doları aldı, beş araç çizgiyi geçti. Ortalama hız saatte yalnızca 31 kilometreydi: yarışı en hızlı araç değil, yedi saat boyunca hata yapmayan araç kazandı. Stanley sonradan Smithsonian'ın Ulusal Amerikan Tarihi Müzesi koleksiyonuna girdi.",
    },
  ],
  worked: {
    title: "Askıdaki drone'un enerji hesabı",
    prompt:
      "Kütlesi 1,2 kg olan dört rotorlu bir drone, 5 inç (12,7 cm) çaplı dört pervane ve sayfadaki batarya kartına uygun bir 4S LiPo pil taşıyor: 14,8 V nominal, 1,5 Ah, 100C. Askıda toplam akım 15 A ölçülüyor. Her motorun itkisini, askının ideal ve gerçek gücünü, uçuş süresini ve pilin akım sınırını bul.",
    steps: [
      "Askıda itki ağırlığa eşittir: T = m·g = 1,2 kg × 9,81 m/s² ≈ 11,8 N. Dört motora bölünür: her motor 2,94 N, yani yaklaşık 300 gram-kuvvet üretmelidir. Manevra payı için motor ve pervane bunun en az iki katını verebilmelidir.",
      "İdeal askı gücü (momentum kuramı): toplam disk alanı A = 4 × π × (0,0635 m)² ≈ 0,0507 m². Havanın diskten geçiş hızı v<sub>i</sub> = √(T/(2ρA)) = √(11,8 / (2 × 1,225 × 0,0507)) ≈ 9,7 m/s; P<sub>ideal</sub> = T·v<sub>i</sub> ≈ 11,8 N × 9,7 m/s ≈ 115 W.",
      "Gerçek güç: P = V·I = 14,8 V × 15 A = 222 W. Oran 115/222 ≈ 0,52: elektrik gücünün yaklaşık yarısı havaya momentum olarak geçer, kalanı pervane, motor ve sürücü kayıplarında ısıya döner.",
      "Uçuş süresi: t = Q/I = 1,5 Ah / 15 A = 0,10 saat = 6 dakika. Pili korumak için kapasitenin yaklaşık yüzde 80'i kullanılır: gerçekçi süre 4,8 dakika. Akım sınırı 100C × 1,5 Ah = 150 A'dır; askıdaki 15 A bunun onda biridir. Sınırlayan güç değil enerjidir: 14,8 V × 1,5 Ah ≈ 22 Wh.",
      "Karşılaştır: aynı kütlede, süzülüş oranı L/D = 10 olan sabit kanatlı bir İHA 15 m/s'de yalnızca sürüklemeyi yener: P = W·v/(L/D) = 11,8 N × 15 m/s / 10 ≈ 18 W. İdeal askı gücünün altıda biri. Sayfadaki İHA çeşitleri kartının çok rotorluya 15–25 dakika, sabit kanada 2–4 saat demesinin fiziği budur.",
    ],
    result:
      "Her motor ≈ 2,9 N (300 gf); ideal askı gücü ≈ 115 W, ölçülen 222 W (verim ≈ yüzde 52); uçuş süresi 6 dakika (kullanılabilir kapasiteyle ≈ 4,8 dakika); pil akım sınırı 150 A. Dört rotorlu drone'u kısa uçuran şey motorun gücü değil, ağırlığı her an itkiyle taşımak zorunda olmasıdır.",
  },
  misconceptions: [
    {
      myth: "'Autopilot' ya da 'Full Self-Driving' yazan araç sürücüsüzdür.",
      truth:
        "Sayfadaki seviye kartlarına göre bu tür sistemler L2'dir: araç direksiyonu ve gazı aynı anda yönetir ama yolu izlemek ve her an müdahale etmek sürücünün işidir; kimi sistem elleri serbest bıraksa bile gözetim sürücüde kalır. Sürücünün gözünü yoldan ayırabildiği ilk seviye L3'tür ve o da yalnızca belirli koşullarda, uyarıldığında devralmak şartıyla. Gerçekten sürücüsüz L4 araçlar yalnızca tasarlandıkları koşullar ve bölgeler (ODD) içinde çalışır.",
    },
    {
      myth: "LiDAR her şeyi görür; onu takan araç kör olmaz.",
      truth:
        "LiDAR mesafeyi santimetre düzeyinde ölçer ama rengi ve yazıyı görmez: trafik ışığının kırmızı mı yeşil mi olduğunu, levhadaki sayıyı bilemez. Yağmur damlası ve sis lazer darbesini saçar. Radar sisi deler ama kaba çözünürlüğüyle yan yana duran iki cismi güç ayırır; kamera ikisini de ayırır ama karanlıkta zorlanır. Füzyon lüks değil zorunluluktur, her sensör ötekinin kör noktasını örter.",
    },
    {
      myth: "Bilgisayar insandan hızlı tepki verdiği için otonom araç 'anında' durur.",
      truth:
        "Durma mesafesinin iki parçası vardır ve bilgisayar yalnızca birini kısaltır. Saatte 100 km (27,8 m/s) hızda 1,5 saniyelik insan tepkisi boyunca araç 42 metre gider; 0,2 saniyelik bir algıla-karar ver döngüsünde 6 metre. Fren mesafesi ise fiziktir: kuru asfaltta μ ≈ 0,7 ile v²/(2μg) = 27,8² / (2 × 0,7 × 9,81) ≈ 56 metre, direksiyonda kim olursa olsun. Toplam 98 metreden 62 metreye iner; sıfıra değil.",
    },
    {
      myth: "Askıda duran drone enerji harcamaz; hareket etmiyor ki.",
      truth:
        "Askı, en pahalı uçuş durumlarından biridir: dört pervane her an ağırlığa eşit itki üretmek için havayı aşağı itmek zorundadır. Drone'un üstünde iş yapılmaz ama aşağı hızlandırılan havanın kinetik enerjisi her saniye yeniden ödenir. Çözümlü örnekte yalnızca yerinde durmak 222 watt istiyordu.",
    },
  ],
  glossary: [
    { term: "SAE J3016 seviyesi", definition: "Sürüş otomasyonunu L0 (bütün sürüş insanda) ile L5 (her koşulda sistemde) arasında altı basamağa ayıran standart; L2'ye kadar yolu sürücü izler, L3'ten itibaren sistem belirli koşullarda bütün sürüş görevini üstlenir." },
    { term: "ODD (Operasyonel Tasarım Alanı)", definition: "Bir otonom sistemin çalışmak üzere tasarlandığı koşullar kümesi: bölge, hava, hız, yol türü; bu koşulların dışında sistem sürüşü üstlenmez." },
    { term: "LiDAR", definition: "Lazer darbelerinin gidiş-dönüş süresinden mesafe ölçüp çevrenin üç boyutlu nokta bulutunu çıkaran sensör." },
    { term: "IMU", definition: "Üç eksenli ivmeölçer ve üç eksenli jiroskoptan oluşan atalet ölçüm birimi; konumu dışarıdan sinyal almadan kısa süreli kestirir, hatası zamanla birikir." },
    { term: "Sensör füzyonu", definition: "Farklı sensörlerin gürültülü ölçümlerini belirsizlikleriyle tartarak tek bir dünya modelinde birleştirme; klasik aracı Kalman filtresidir." },
    { term: "Kabul edilebilir sezgisel", definition: "A*'da hedefe kalan maliyeti asla abartmayan tahmin fonksiyonu h; bu koşul sağlanırsa bulunan yol en kısa yoldur." },
    { term: "PID denetleyici", definition: "Hatanın kendisi, zaman içindeki toplamı ve değişim hızından oluşan üç terimi katsayılarla toplayıp komut üreten geri besleme döngüsü." },
    { term: "KV", definition: "Fırçasız motorun yüksüz devir sabiti: volt başına dakikadaki devir; düşük KV büyük pervane ve yüksek tork demektir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede PID üç terimli bir formüldür; mühendisliğin üçüncü yılındaki Otomatik Kontrol dersinde <strong>kontrol teorisi</strong> olur. Yukarıdaki m·dv/dt = u − b·v − d modeli birinci mertebeden doğrusal bir diferansiyel denklemdir; Laplace dönüşümü onu G(s) = 1/(m·s + b) biçiminde bir transfer fonksiyonuna çevirir ve denetleyicinin kararlı olup olmadığı kapalı döngünün kutuplarından, durum uzayı dilinde özdeğerlerden okunur. Sayfadaki MPC kutusu bunun bir adım ötesidir; her an gelecek birkaç saniyeyi kısıtlı bir optimizasyon problemi olarak çözer ve yalnızca ilk komutu uygular. Algılama tarafında Kalman filtresi, Olasılık ve Rastgele Süreçler dersinden <strong>olasılıksal robotiğe</strong> açılan kapıdır: aracın hem haritayı çıkarıp hem kendini o haritada konumlandırdığı SLAM problemi, doğrusal olmayan sistemler için genişletilmiş Kalman ve parçacık filtreleri, derin öğrenmeyle nesneleri tanıyan kameralar hep aynı soruya cevaptır: belirsiz ölçümlerden en olası dünya hangisi?",
      "Planlama tarafında ızgara yerini sürekli uzaylara bırakır. Bir robot kolunun ya da bir aracın bütün olası duruşları bir <strong>konfigürasyon uzayı</strong> oluşturur; A* burada da çalışır ama boyut arttıkça hücre sayısı üstel büyür, bu yüzden uzayı rastgele örnekleyen RRT gibi yöntemler doğdu. Drone tarafı uçuş mekaniğine, gömülü yazılıma ve gerçek zamanlı işletim sistemlerine açılır: saniyede dört bin döngü, her döngünün 250 mikrosaniyede bitmesi demektir. En zor sorular ise denklemsizdir: L3'te direksiyonu devralmayan sürücüden kim sorumludur, drone hava sahasında kimin kuralıyla uçar, bir filo için 'yeterince güvenli' nasıl ölçülür? Mühendislik, Cruise'un 2023'te öğrendiği gibi, bu sorularla da sınanır.",
    ],
    topics: [
      "Otomatik kontrol: transfer fonksiyonu, kararlılık, durum uzayı",
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
        "Aynı uzunlukta en kısa yol bulunur ama çok daha fazla kare incelenir",
        "Algoritma hiç yol bulamaz",
        "Yol kısalır çünkü tahmin hatası ortadan kalkar",
      ],
      answer: 1,
      explanation:
        "h = 0 kabul edilebilir bir sezgiseldir (hiçbir zaman abartmaz), bu yüzden en kısa yol garantisi sürer; ama öncelik yalnızca g'ye kalır ve arama Dijkstra gibi her yöne eşit açılır. Sayfanın kodunu h = 0 ile çalıştırdığımızda boş geniş ızgarada incelenen kare 237'den 502'ye çıktı: aynı cevap, iki kat iş.",
    },
    {
      question: "Hangi SAE seviyesinde sürücü gözünü yoldan ayırabilir ama araç uyardığında devralmak zorundadır?",
      options: ["L1", "L2", "L3", "L4"],
      answer: 2,
      explanation:
        "L2'de sistem direksiyonu ve hızı yönetse de yolu izlemek sürücünün görevidir. L3 (koşullu otomasyon) belirli koşullarda bütün sürüşü sisteme verir, ancak sürücü uyarıldığında devralmalıdır; sorumluluğun el değiştirdiği bu an onu en tartışmalı seviye yapar. L4'te tasarım koşulları içinde devralma beklenmez; sistem gerekirse kendi başına güvenli biçimde durur.",
    },
    {
      question: "Bir LiDAR darbesi gönderildikten 1 mikrosaniye sonra yankısı dönüyor. Cisim ne kadar uzakta?",
      options: ["300 m", "150 m", "30 m", "3 km"],
      answer: 1,
      explanation:
        "Işık 1 mikrosaniyede 300 metre gider; bu süre gidiş ve dönüşü kapsar, bu yüzden ikiye bölünür: d = c·Δt/2 = 150 m. Aynı süre sesle ölçülseydi (343 m/s) yalnızca 0,17 milimetreye karşılık gelirdi: ultrasonik sensörün saati LiDAR'ınkinden bir milyon kat yavaş olabilir.",
    },
  ],
  next: [
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma: Az Adım mı, Az Maliyet mi?", why: "BFS, Dijkstra ve A*'ı aynı ağırlıklı haritada tek tek adımlat ve üçünü karşılaştır; buradaki 'incelenen kare' sayısının arkasındaki kuyruğu gör." },
    { href: "doppler-etkisi.html", title: "Doppler Etkisi: Dalga Cepheleri ve Ses Patlaması", why: "Radarın dayandığı frekans kaymasını dalga tepelerini sayarak ölç: kaynak hareket edince öndeki ve arkadaki gözlemci neden farklı frekans duyar?" },
    { href: "ucak-muhendisligi-ve-aerodinamik.html", title: "Uçak Mühendisliği ve Aerodinamik", why: "Sabit kanatlı İHA'yı saatlerce havada tutan L/D oranını kanat profili üzerinde açı açı oku." },
    { href: "elektrikli-araclar.html", title: "Elektrikli Araçlar: Enerji, Batarya ve Menzil", why: "Drone’u ve otonom aracı besleyen bataryanın hesabı: paketin gerilimi ve akımı, şarj eğrisi, sürüş direncinden menzil ve frenlemede geri kazanılan enerji." },
  ],
  sources: [
    { title: "Wikipedia · A* search algorithm", url: "https://en.wikipedia.org/wiki/A*_search_algorithm", note: "Hart, Nilsson ve Raphael'in 1968 makalesi, kabul edilebilirlik ve sezgisel seçimi (İngilizce)." },
    { title: "Wikipedia · Kalman filter", url: "https://en.wikipedia.org/wiki/Kalman_filter", note: "Tahmin ve düzeltme adımları, kazancın türetimi ve Apollo'daki kullanımı." },
    { title: "Wikipedia · PID controller", url: "https://en.wikipedia.org/wiki/PID_controller", note: "Minorsky'nin 1922 çalışmasından ayarlama yöntemlerine; üç terimin etkisi grafiklerle." },
    { title: "Wikipedia · DARPA Grand Challenge (2005)", url: "https://en.wikipedia.org/wiki/DARPA_Grand_Challenge_(2005)", note: "Stanley'nin kazandığı yarışın parkuru, süreleri ve bitiren beş araç." },
  ],
  revision: "Kasım 2026",
};
