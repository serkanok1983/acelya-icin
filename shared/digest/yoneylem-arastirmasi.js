window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yoneylem-arastirmasi"] = {
  slug: "yoneylem-arastirmasi",
  title: "Yöneylem Araştırması: En İyi Karar Hangi Köşede?",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir tesise eklenen bir saat 1500 lira ederken ötekine eklenen saat hiçbir şey etmeyebilir. Köşeleri, gölge fiyatları, simpleks tablosunu ve bir projenin kritik yolunu kendi ellerinle sına.",
  hook:
    "Bir cam atölyesinin üç tesisi var; haftada 4, 12 ve 18 saat çalışabiliyorlar. Ustabaşı gelip ‘birine bir saat fazla mesai yazabilirim, hangisine yazayım?’ diye soruyor. Cevap tesise göre değişiyor: o bir saat birinde haftada 1500 lira, ötekinde 1000 lira getiriyor, üçüncüsünde tek kuruş getirmiyor. Üstelik bunu öğrenmek için fazladan tek bir cam üretmen gerekmiyor.",
  bigIdea:
    "Doğrusal bir amacın, doğrusal kısıtlarla çevrili bir bölgedeki en iyi değeri bir <strong>köşede</strong> bulunur; her kısıtın o köşedeki <strong>gölge fiyatı</strong> ise o kaynağın bir birim fazlasının amaca ne kattığını söyler.",
  story: [
    "Ağustos 1940'ta fizikçi Patrick Blackett, Britanya'nın uçaksavar komutanı General Frederick Pile'ın bilim danışmanı oldu. Savaşın ilk yıllarında çevresine topladığı, fizikçiden fizyoloğa uzanan karma ekip ‘Blackett'in Sirki’ diye anıldı. İşleri yeni silah icat etmek değildi; eldeki silahın nasıl kullanıldığını sayıyla incelemekti. Aktarılan sonuç çarpıcıdır: Britanya Savaşı'nın başında düşürülen her uçak için 20 000'den fazla uçaksavar mermisi harcanırken 1941'de bu sayı 4 000'e indi. Aynı yaklaşım denizde de işledi: uçaklardan atılan su bombalarının patlama derinliği 100 fitten 25 fite çekilince, dalmış denizaltılara yapılan saldırılarda batırma oranının yüzde 1'den yüzde 7'ye çıktığı aktarılır. Bu işe, 1937'de Bawdsey'deki radar çalışmalarından kalan adla <strong>operational research</strong> dendi; Türkçesi <strong>yöneylem araştırması</strong>. Blackett 1948'de Nobel Fizik Ödülü'nü aldı, ama sis odası çalışmalarıyla; savaş yıllarındaki hesaplarıyla değil.",
    "Kaynak paylaştırmanın matematiği iki ayrı yerde, birbirinden habersiz doğdu. Leonid Kantorovich 1939'da bir kontrplak işletmesinin üretimini en iyileme göreviyle uğraşırken bugün doğrusal programlama dediğimiz sorunu yazdı; çalışması Sovyetler Birliği'nde uzun süre ilgi görmedi. George Dantzig ise savaş yıllarını ABD Hava Kuvvetleri'nin istatistik biriminde geçirmiş, eğitim, ikmal ve konuşlanma planlarının masa başı hesap makineleriyle nasıl hazırlandığını yakından öğrenmişti. Orduda bu planlara ‘program’ denirdi; <strong>doğrusal programlama</strong>daki sözcük buradan gelir, bilgisayar programından değil. Dantzig 1947'de <strong>simpleks yöntemini</strong> buldu. Yöntemini aynı yıl John von Neumann'a anlattığında von Neumann, sorunun oyun kuramında üzerinde çalıştığı bir sorunla eşdeğer olduğunu görüp ikillik kuramını öne sürdü. ‘Doğrusal programlama’ adını ise 1948'de ekonomist Tjalling Koopmans önerdi. 1975 Nobel Ekonomi Ödülü ‘kaynakların en iyi dağıtımı kuramına katkıları’ için Kantorovich ile Koopmans'a verildi; Dantzig'in listede olmaması meslektaşlarının bir bölümünü öfkelendirdi.",
    "Dantzig'in adı bir efsaneyle de anılır ve efsanenin gerçek kısmı çoğu anlatılandan sadedir. 1939'da Berkeley'de Jerzy Neyman'ın dersine geç kalır, tahtadaki iki problemi ödev sanıp defterine geçirir, ‘her zamankinden biraz zor’ bulduğu çözümleri birkaç gün sonra teslim eder. Yaklaşık altı hafta sonra Neyman kapısına gelir: bunlar istatistiğin çözülmemiş iki ünlü problemidir. Öyküyü Dantzig'in kendisi anlatmıştır; Neyman'ın sonradan ‘ikisini bir dosyaya koy, tezin olarak kabul edeyim’ dediğini de o aktarır. Dikkat edilecek nokta şu: problemler istatistik problemleridir. Simpleks yöntemi bu olaydan sekiz yıl sonra, bambaşka bir işin içinden çıkmıştır; ikisini birleştiren anlatılar süslemedir.",
    "Proje çizelgeleme aynı ailenin küçük kardeşidir. 1950'lerin sonunda DuPont'tan Morgan Walker ile Remington Rand'dan James Kelley, büyük bakım ve inşaat işlerini bilgisayarda planlamak için <strong>kritik yol yöntemini</strong> (CPM) geliştirdi. 1958'de ABD Donanması'nın Özel Projeler Ofisi, Polaris füze programı için <strong>PERT</strong>'i geliştirdi: süresi kimsenin kesin bilmediği işlere üç tahminle yaklaşan bir yöntem. Sayfadaki üç sekme bu üç buluşu sırayla önüne koyar: bir doğrusal programı çizerek çöz, aynı sorunu simpleks tablosunda izle, bir projenin kritik yolunu ve teslim olasılığını sına.",
  ],
  core: [
    {
      heading: "En iyi nokta neden bir köşede durur?",
      body:
        "Her kısıt düzlemi bir doğruyla ikiye böler ve bir yarısını yasaklar. Geriye kalan <strong>uygun bölge</strong> dışbükey bir çokgendir: içindeki iki noktayı birleştiren doğru parçası da bölgede kalır. Amaç Z = c₁x + c₂y doğrusaldır; sabit bir Z değeri veren noktalar bir <strong>eş kâr doğrusu</strong> oluşturur ve Z büyüdükçe bu doğru kendine paralel kayar. Bölgeye değdiği son yer ya bir köşedir ya da bütün bir kenar. Cebirle söylersek: P ile Q arasındaki bir noktada Z, iki uçtaki değerlerin ağırlıklı ortalamasıdır, dolayısıyla büyüğünü aşamaz. Varsayılan sorunda beş sınır doğrusunun sekiz kesişim noktası vardır; beşi uygundur ve sayfa bunları A'dan E'ye sıralar. Köşe sayısı sonlu olduğu için sonsuz noktalı bir sorun sonlu bir aramaya iner. Kısıtlar bölgeyi kârın arttığı yönde kapatmıyorsa hiçbir köşe en iyi değildir; sayfanın Sınırsız düzeni bunu gösterir.",
      formula: "Z((1 − t)P + tQ) = (1 − t)·Z(P) + t·Z(Q) ≤ max{Z(P), Z(Q)},  0 ≤ t ≤ 1",
      formulaNote: "Doğrusal bir fonksiyon bir doğru parçası üzerinde en büyük değerini uçlardan birinde alır; köşe kuralının bütün dayanağı budur.",
    },
    {
      heading: "Simpleks: Gauss elemesiyle köşeden köşeye yürümek",
      body:
        "Her eşitsizliğe bir <strong>aylak değişken</strong> ekleyince (x + s₁ = 4 gibi) elimizde beş bilinmeyenli üç denklem kalır. İki bilinmeyeni sıfıra sabitlersek geri kalan üçü tek biçimde çözülür: bu bir <strong>temel çözüm</strong>dür ve geometride bir köşeye karşılık gelir. Sıfıra sabitlenen iki değişken, o köşeden geçen iki sınırı söyler. Simpleks bir köşeden komşusuna geçerken temele bir değişken sokar, birini çıkarır. Bu <strong>pivot</strong> işlemi lise matris dersindeki satır işlemlerinden başka bir şey değildir: pivot satırını pivota böl, öteki satırlardan uygun katını çıkar. Hangi değişkenin gireceğine Z satırı karar verir: oradaki negatif girdi, o değişkeni büyütmenin Z'yi artıracağını söyler. Hangisinin çıkacağını <strong>oran testi</strong> belirler: giren değişkeni, ilk kısıt dolana kadar büyütürüz; daha ileri gidersek bir değişken eksiye düşer ve bölgeden çıkarız.",
      formula: "θ = min { bᵢ / aᵢⱼ : aᵢⱼ &gt; 0 }<br>ΔZ = −(z<sub>j</sub> − c<sub>j</sub>)·θ",
      formulaNote: "j giren sütun, θ en küçük oran. Sütunda pozitif girdi yoksa oran testi yapılamaz: giren değişken sınırsız büyür, sorun sınırsızdır.",
    },
    {
      heading: "İkillik: her kaynağın bir fiyatı var",
      body:
        "Her doğrusal programın bir ikizi vardır. Atölye sahibi kârı büyütürken, tesis saatlerini kiralamak isteyen biri her saate y₁, y₂, y₃ fiyatını biçsin. Teklifin kabul edilmesi için bir parti kapının tükettiği saatlerin kira bedeli en az kapının kârı kadar olmalı; pencere için de aynısı. Kiracı toplam ödemeyi küçültür. Bu <strong>ikil sorun</strong>dur. Uygun her üretim planı ile uygun her fiyat takımı için kâr, ödemeyi aşamaz (zayıf ikillik); optimumda ikisi eşitlenir (güçlü ikillik). Sayfadaki İkil amaç Σ bᵢyᵢ kartının Z* ile aynı sayıyı göstermesi bunun denetimidir. Optimumdaki yᵢ değerleri <strong>gölge fiyat</strong>tır: Z*'ın bᵢ'ye göre türevi. Kullanılmayan kapasitesi olan kısıtın fiyatı sıfırdır; fiyatı pozitif olan kısıt tam dolmuştur (tamamlayıcı gevşeklik). Türev yereldir. Optimum köşeden üç sınır birden geçiyorsa Z*(b) grafiği orada kırılır ve tek bir eğim yoktur: sağ tarafı artırırken küçük eğim, azaltırken büyük eğim ölçülür. Sayfa bu durumda tek sayı yerine ‘0 … 3’ gibi bir aralık yazar.",
      formula: "Asıl: en büyük Z = c·x,  Ax ≤ b,  x ≥ 0<br>İkil: en küçük W = b·y,  Aᵀy ≥ c,  y ≥ 0<br>c·x ≤ (Aᵀy)·x = y·(Ax) ≤ y·b<br>yᵢ = ∂Z*/∂bᵢ",
      formulaNote: "Üçüncü satır zayıf ikilliğin tek satırlık ispatıdır; x ≥ 0 ve y ≥ 0 olduğu için eşitsizlikler yön değiştirmez.",
    },
    {
      heading: "Kritik yol: yönlü çevrimsiz bir çizgede en uzun yol",
      body:
        "Bir projeyi ‘şu iş bitmeden bu iş başlayamaz’ oklarıyla çizersen çevrimi olmayan yönlü bir çizge (DAG) elde edersin. Projenin en kısa süresi, baştan sona en <strong>uzun</strong> yolun süresidir; çünkü bütün yolların bitmesi gerekir. <strong>İleri geçiş</strong> her faaliyetin en erken başlangıcını (ES) öncüllerinin en geç biteninden alır. <strong>Geri geçiş</strong> sondan başlar ve her faaliyetin en geç bitişini (LF) ardıllarının en erken başlaması gerekeninden alır. İkisinin farkı <strong>toplam bolluk</strong>tur: faaliyet projeyi geciktirmeden ne kadar kayabilir. Bolluğu sıfır olan faaliyetler <strong>kritik yolu</strong> oluşturur. Sayfadaki dokuz faaliyetli ağda dört yol vardır: A-B-E-H-I 17 gün, A-C-F-H-I 16, A-C-F-G-I 15, A-D-G-I 12 gün. Çevrimli genel bir çizgede en uzun yolu bulmanın verimli bir yöntemi bilinmiyor (sorun NP-zordur); çevrim olmayınca faaliyetleri öncelik sırasına dizip her oka bir kez bakmak yeter. Bu hesap da aslında bir doğrusal programdır.",
      formula: "ES<sub>j</sub> = max<sub>i → j</sub> EF<sub>i</sub>,  EF = ES + t<br>LF<sub>i</sub> = min<sub>i → j</sub> LS<sub>j</sub>,  LS = LF − t<br>Toplam bolluk = LS − ES",
      formulaNote: "i → j, ‘i, j'nin öncülüdür’ demek. İleri geçişte en büyük, geri geçişte en küçük alınır; ikisini karıştırmak en sık yapılan hesap hatasıdır.",
    },
    {
      heading: "PERT'in normal eğrisi neden iyimserdir?",
      body:
        "PERT her faaliyet için üç tahmin ister: iyimser a, en olası m, kötümser b. Beklenen süre bunların ağırlıklı ortalamasıdır ve çarpık bir tahminde m'den ayrılır: B faaliyetinde (3, 5, 13) en olası süre 5 gündür ama beklenen süre 6 gün. Sonra kritik yoldaki beklenen süreler ve varyanslar toplanır, toplamın normal dağıldığı varsayılır (merkezi limit teoremine yaslanan bir kabul) ve hedefe yetişme olasılığı Φ ile okunur. Bu zincirde üç ayrı yaklaştırma vardır ve sayfa onları tek tek ölçer: (b − a)/6 kuralı gerçek varyans değildir; biri belirgin biçimde çarpık beş sürenin toplamı tam normal değildir; en önemlisi, hesap yalnız <em>bir</em> yola bakar. Proje bütün yollar bitince biter, yani süre yolların en büyüğüdür. Birkaç rastgele sayının en büyüğünün ortalaması, ortalamaların en büyüğünden küçük olamaz. Bu etkiye <strong>birleşme yanlılığı</strong> denir: iki yolun birleştiği her düğüm, beklenen süreyi yukarı iter ve tek yola bakan hesap projeyi olduğundan kısa gösterir.",
      formula: "tₑ = (a + 4m + b)/6,  σ² = ((b − a)/6)²<br>P(T ≤ hedef) ≈ Φ((hedef − T<sub>E</sub>)/σ)<br>E[max(T₁, T₂)] ≥ max(E[T₁], E[T₂])<br>P(max(T₁, T₂) ≤ D) = P(T₁ ≤ D)·P(T₂ ≤ D)  (bağımsız yollar)",
      formulaNote: "Son satır ortak faaliyeti olmayan iki yol içindir. Çarpanların ikisi de 1'den küçük olduğundan, projenin olasılığı tek yolun olasılığını geçemez.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmedir ve hiçbiri zamanla akmaz: bir kaydırıcıyı oynattığın anda her şey yeniden hesaplanır. <strong>01 · Doğrusal programlama</strong> sekmesinde sekiz kaydırıcı, kâr katsayılarını ve üç kısıtı (K1, K2, K3) değiştirir; kısıt tablosu her gölge fiyatı iki yoldan verir: ikil sorundan gelen kuram ve sağ tarafı h = 0.01 oynatıp sorunu yeniden çözen ölçüm. <strong>02 · Simpleks adım adım</strong> aynı sorunu tam kesirli tabloyla, Sonraki pivot ve Geri düğmeleriyle yürütür. <strong>03 · Kritik yol ve PERT</strong> dokuz faaliyetli bir projede normal yaklaşımı, tohumlu bir Monte Carlo benzetimiyle yan yana koyar. Varsayılan sorun, Hillier ile Lieberman'ın ders kitabından tanınan cam atölyesi örneğinin sayılarıdır: x haftalık kapı partisi, y pencere partisi, kâr bin lira. Her sekmenin kendi Sıfırla düğmesi vardır; <kbd>R</kbd> de aynı işi görür. 3. sekmenin iki hazır düzeni de varsayılanlardan başlar: süreler, 18 günlük hedef, 20 000 koşu ve tohum 1 geri gelir.",
    experiments: [
      {
        title: "Bir saat fazla mesai kaç lira eder?",
        predict:
          "Üç tesisten hangisine bir saat eklemek kârı en çok artırır? Aynı tesise saat eklemeyi sürdürürsen her saat aynı parayı getirmeye devam eder mi?",
        do: "1. sekmede Sıfırla'ya bas ve kısıt tablosundaki Gölge fiyat (kuram) sütununu oku. K3 sağ tarafı b₃ kaydırıcısını 18'den 19'a getir, Z*'ı not et, 18'e geri dön. Aynısını K2 sağ tarafı b₂ için 12'den 13'e, K1 sağ tarafı b₁ için 4'ten 5'e yap. Son olarak hepsi varsayılandayken b₃'ü önce 24'e, sonra 25'e çıkar.",
        observe:
          "Başlangıçta optimum D köşesi (2, 6), Z* = 36; gölge fiyatlar K1 için 0, K2 için 1.5, K3 için 1 ve ölçülen iki sütun da aynı. b₃ = 19'da Z* = 37, optimum (2.3333, 6). b₂ = 13'te Z* = 37.5, optimum (1.6667, 6.5). b₁ = 5'te Z* 36'da kalır, K1'in aylağı 2'den 3'e çıkar. b₃ = 24'te optimum (4, 6), Z* = 42 olur ve köşe ‘(dejenere)’ diye işaretlenir; gölge fiyatlar aralığa döner: K1 0 … 3, K2 1.5 … 2.5, K3 0 … 1. b₃ = 25'te Z* 42'de kalır; K3'ün aylağı 1, gölge fiyatı 0'dır, K1 ve K2'ninki 3 ve 2.5 olur.",
        explain:
          "K1'in zaten 2 saati boş duruyor; boş duran kaynağın bir fazlası hiçbir şey kazandırmaz. K2 ve K3 dolu olduğu için fiyatları pozitiftir. Ama bu fiyat bir türevdir: b₃ büyüdükçe D köşesi y = 6 doğrusu (K2) boyunca sağa kayar ve b₃ = 24'te K1 duvarına dayanır. O noktadan sonra K3 artık darboğaz değildir; darboğaz K1 ile K2'ye geçmiştir. Gölge fiyat, ‘bu kaynağı bugünkü düzende bir birim artırırsam’ sorusunun cevabıdır; ‘sınırsız artırırsam’ sorusunun değil.",
      },
      {
        title: "Üç doğru tek noktada buluşursa",
        predict:
          "Optimum köşeden iki yerine üç kısıt geçerse gölge fiyat hâlâ tek bir sayı olur mu? Simpleks tablosu bu durumda hangi fiyatı yazar?",
        do: "1. sekmede Dejenere köşe düğmesine bas. Köşe tablosunu ve kısıt tablosunun üç gölge fiyat sütununu oku. 2. sekmeye geç (Sorun menüsü Dejenere köşe gösterir), Sonraki pivot ile son tabloya kadar ilerle ve alttaki ikil değerler tablosuna bak. Sonra 1. sekmede Sıfırla'ya basıp yalnız K3 sağ tarafı b₃'ü 12 yap. 2. sekmede (Sorun menüsü artık Özel: 1. sekmedeki ayarlar gösterir) önce Bland, sonra Dantzig kuralıyla son tabloya kadar git ve iki Z satırını karşılaştır.",
        observe:
          "Dejenere köşe düzeninde optimum C (2, 6), Z = 36; Çözüm türü ‘Tek optimum, dejenere’. Kuram K1 için 0 … 3, K2 için 1.5 … 2.5, K3 için 0 … 1 verir; Ölçülen b + h sütunu 0, 1.5, 0, Ölçülen b − h sütunu 3, 2.5, 1 gösterir. Simpleks iki pivotta biter; son tabloda s₃ temeldedir ama değeri 0'dır, ikil değerler y₁ = 3, y₂ = 5/2, y₃ = 0. b₃ = 12 düzeninde optimum (0, 6), Z = 30'dur ve kuram K1 için 0, K2 için 0 … 1.5, K3 için 1 … 2.5 verir. Bland 3 pivotta y = (0, 0, 5/2), Dantzig 2 pivotta y = (0, 3/2, 1) bulur; ikisinde de oranı 0 olan bir pivot görülür.",
        explain:
          "Üç doğru tek noktadan geçince köşeyi birden fazla taban anlatır; simpleks, Z satırında negatif girdi bırakmayan ilkinde durur ve hangisine varacağını pivot kuralı belirler. b₃ = 12'de iki sonucu ikil sorunda sına (en küçük 4y₁ + 12y₂ + 12y₃; y₁ + 3y₃ ≥ 3, 2y₂ + 2y₃ ≥ 5): ikisi de kısıtları sağlar ve 30 verir; ikisi de ikil optimumdur. Bland K2'de aralığın alt, K3'te üst ucuna, Dantzig tersine varmıştır. Geçerli fiyat yöne bağlıdır: kaynağı artırırken alt uç, azaltırken üst uç ölçülür. Oranı 0 olan pivotta taban değişir, köşe ve Z yerinde sayar; döngü tehlikesi yalnız böyle köşelerde doğar.",
      },
      {
        title: "İki kural, iki ayrı yol",
        predict:
          "Z'yi birim başına en hızlı artıran değişkeni seçmek (Dantzig) her zaman daha az pivot demek midir? Eş kâr doğrusu bir kenara paralel olursa tablo bunu nasıl belli eder?",
        do: "2. sekmede Sorun menüsünden Cam atölyesi (varsayılan) seç. Giren değişken kuralı Bland iken Sonraki pivot'a (ya da <kbd>Boşluk</kbd> tuşuna) basarak sona kadar git; her adımda Temel çözüm ve Z kartlarını, sağdaki yol çizimini izle. Kuralı Dantzig yapıp yinele. Sonra Sorun menüsünden Çoklu optimum'u seç ve son tablonun durum satırını oku.",
        observe:
          "Bland'de Adım kartı 0 / 3 ile başlar: (0, 0) → (4, 0) → (4, 3) → (2, 6), Z sırasıyla 0, 12, 27, 36. İlk pivotta oranlar s₁ için 4, s₃ için 6'dır; s₁ çıkar. Dantzig 0 / 2 ile başlar: (0, 0) → (0, 6) → (2, 6), Z 0, 30, 36. İki yol da aynı son Z satırına varır: 0, 0, 0, 3/2, 1 ve sağ tarafta 36. Çoklu optimum sorununda iki kural da 2 pivotta (4, 3)'te durur, Z = 18; son Z satırı 0, 0, 0, 0, 1'dir ve durum satırı temel dışı s₁ için Z satırının 0 olduğunu, yani seçenek optimum çözümler bulunduğunu söyler.",
        explain:
          "Bland en küçük indisli sütunu (x) seçip uzun yoldan dolaşır; Dantzig en negatif girdiyi (y) seçip kısa yoldan gider. Bu bir yasa değildir: ikisinin de üstel sayıda köşe gezdiği sorunlar kurulabilir. Bland kuralının değeri hızında değil güvencesindedir: Robert Bland 1977'de bu kuralla simpleksin döngüye girmediğini kanıtladı. Son tablonun aylak sütunlarındaki 3/2 ve 1, 1. sekmenin gölge fiyatlarıdır; simpleks ikil sorunu da çözmüş olur. Temel dışı bir değişkenin Z satırındaki 0, onu temele sokmanın Z'yi değiştirmeyeceğini söyler: (4, 3) ile (2, 6) arasındaki kenarın tümü optimumdur.",
      },
      {
        title: "Kritik olmayan yol projeyi geciktirir mi?",
        predict:
          "Kritik yol 17 gün, hedef 18 gün. PERT'in normal yaklaşımı ile bütün ağı binlerce kez ‘yaşayan’ Monte Carlo aynı olasılığı verir mi? C faaliyetinin kötümser süresi uzarsa aradaki fark büyür mü, küçülür mü?",
        do: "3. sekmede Sıfırla'ya bas (Hedef teslim süresi 18 gün, Monte Carlo koşusu 20 000, Rastgele tohum 1). Üst kartları ve en alttaki dört satırlık olasılık tablosunu oku. Hedef teslim süresini 17 güne çek, sonra yeniden 18 yap. C gecikebilir (b = 14) düğmesine bas ve aynı okumaları yinele; düğme önce her şeyi varsayılana döndürür, sonra yalnız C'yi (2, 4, 14) yapar. Son olarak Rastgele tohumu birkaç değerde dene.",
        observe:
          "Varsayılanda T<sub>E</sub> = 17 gün, kritik yol A → B → E → H → I, σ = 1.886 gün, z = 0.53. Kuram %70.2, Monte Carlo %67.4 ± 0.6 puan; fark −2.8 puan. Tablo farkı böler: varyans formülü −1.1, dağılımın biçimi +1.3, yolların birleşmesi −3 puan; koşuların %35.5'inde başka bir yol daha uzundur. Hedef 17 günde kuram tam %50, Monte Carlo %44.5 ± 0.7 puan. C gecikebilir düzeninde kritik yol A → C → F → H → I'ya geçer, T<sub>E</sub> = 17.333 gün; 18 günlük hedef için kuram %62, Monte Carlo %46 ± 0.7 puan verir. Birleşme tek başına −18.5 puandır; koşuların %56.8'inde öteki yol daha uzundur.",
        explain:
          "A-C-F-H-I yolunun beklenen süresi kritik yoldan yalnız bir gün kısadır; iki yolun dağılımları iç içe geçer ve hangisinin uzun çıkacağı koşudan koşuya değişir. Normal yaklaşım bu ikinci yolu hiç görmez. C düzeninde iki yolun beklenen süreleri 17.333 ve 17 gündür: neredeyse başa baş iki yolun en büyüğünü almak, tek birine bakmaktan belirgin biçimde kötü sonuç verir. ‘Dağılımın biçimi’ satırındaki +1.3 puan ise örnekleme aralığının (±0.6 puan) ancak iki katıdır; ona fazla anlam yüklememek gerekir. Tohumu değiştirince son basamaklar oynar, tablonun söylediği değişmez.",
      },
    ],
  },
  wow: [
    {
      title: "70 kişi, 70 iş ve 101 basamaklı bir sayı",
      body: "Dantzig'in doğrusal programlamayı anlatırken verdiği örnek 70 kişiyi 70 işe atamaktı. Olası atama sayısı 70!, yani yaklaşık 1.2 × 10<sup>100</sup>'dür: 101 basamaklı bir sayı, gözlenebilir evrendeki parçacık sayısı için verilen kestirimlerden çok büyük. Bütün atamaları tek tek denemek söz konusu olamaz; simpleks ise bu çokyüzlünün köşelerinden yalnız küçük bir bölümüne uğrayarak en iyisini bulur.",
    },
    {
      title: "Bütün köşeleri gezdiren küp",
      body: "1972'de Victor Klee ile George Minty, köşeleri hafifçe kaydırılmış, ‘ezik’ bir D boyutlu küp kurdular: Dantzig kuralı bu küpte optimuma varmadan önce 2<sup>D</sup> köşenin hepsine uğrar. Üç boyutta 8 köşe eder; 50 boyutta yaklaşık 1.1 × 10<sup>15</sup>. Bland kuralı için de benzer örnekler vardır. Buna karşın simpleks, uygulamada karşılaşılan sorunlarda onlarca yıldır hızlı çalışıyor; doğrusal programlamanın her durumda çok terimli sürede çözülebildiğini ise 1979'da Leonid Khachiyan başka bir yöntemle gösterdi.",
    },
    {
      title: "Her üç koşudan birinde en uzun yol ‘kritik’ yol değil",
      body: "Sayfanın varsayılan ağında kritik yol 17, ikinci yol 16 gündür. 20 000 koşuluk benzetimde (tohum 1) koşuların %35.5'inde en uzun çıkan yol, kritik diye işaretlenen yol değildir. B ve E faaliyetleri ‘kritik’ damgası taşıdıkları hâlde koşuların yalnız %64.5'inde en uzun yolun üzerindedir; kritik sayılmayan C ve F ise %35'inde oradadır. Tek bir kritik yol, belirsiz bir projede bir kesinlik değil, bir olasılıktır.",
    },
  ],
  worked: {
    title: "Cam atölyesini elle çöz, sonra ikiliyle sağlamasını yap",
    prompt:
      "En büyük yap: Z = 3x + 5y (bin lira/hafta). Kısıtlar: x ≤ 4, 2y ≤ 12, 3x + 2y ≤ 18 (saat/hafta), x ≥ 0, y ≥ 0. Simpleks tablosunu Dantzig kuralıyla yürüt; optimumu, gölge fiyatları ve K2'nin gölge fiyatının hangi b₂ aralığında geçerli kaldığını bul. Sayfada: 2. sekme, Sorun = Cam atölyesi (varsayılan), Giren değişken kuralı = Dantzig.",
    steps: [
      "Aylak değişkenleri ekle: x + s₁ = 4, 2y + s₂ = 12, 3x + 2y + s₃ = 18. Başlangıç köşesi (0, 0), temel değişkenler s₁ = 4, s₂ = 12, s₃ = 18 saat, Z = 0. Z satırı: −3, −5, 0, 0, 0.",
      "Birinci pivot. En negatif girdi −5 olduğu için y girer. Oranlar: s₂ satırında 12 ÷ 2 = 6, s₃ satırında 18 ÷ 2 = 9; s₁ satırında y'nin katsayısı 0 olduğundan oran yoktur. En küçük oran 6: s₂ çıkar, pivot 2. Satır işlemlerinden sonra y satırı (0, 1, 0, 1/2, 0 | 6), s₃ satırı (3, 0, 0, −1, 1 | 6), Z satırı (−3, 0, 0, 5/2, 0 | 30) olur. Yeni köşe (0, 6), Z = 30 bin lira.",
      "İkinci pivot. Tek negatif girdi −3: x girer. Oranlar: s₁ için 4 ÷ 1 = 4, s₃ için 6 ÷ 3 = 2. s₃ çıkar, pivot 3. Yeni satırlar: x (1, 0, 0, −1/3, 1/3 | 2), s₁ (0, 0, 1, 1/3, −1/3 | 2), y (0, 1, 0, 1/2, 0 | 6); Z satırı (0, 0, 0, 3/2, 1 | 36). (Sayfa bu satırları temel sırasıyla, s₁, y, x diye gösterir.) Negatif girdi kalmadı: optimum x = 2 parti, y = 6 parti, Z = 36 bin lira; K1'de s₁ = 2 saat boş.",
      "Gölge fiyatlar Z satırının aylak sütunlarındadır: y₁ = 0, y₂ = 3/2, y₃ = 1 (saat başına bin lira). İkil sorunla sağla: en küçük W = 4y₁ + 12y₂ + 18y₃; y₁ + 3y₃ ≥ 3 ve 2y₂ + 2y₃ ≥ 5. Yerine koy: 0 + 3 = 3 ve 3 + 2 = 5, iki kısıt da sağlanıyor; W = 0 + 18 + 18 = 36 = Z. Zayıf ikillik gereği hiçbir plan 36'yı aşamaz; demek ki bulduğumuz köşe gerçekten en iyisidir.",
      "Geçerlilik aralığı. Son tablonun s₂ sütunu (−1/3, 1/3, 1/2), b₂ bir birim artınca x, s₁ ve y'nin ne kadar değiştiğini verir: x = 2 − Δ/3, s₁ = 2 + Δ/3, y = 6 + Δ/2. Üçü de eksiye düşmemeli: Δ ≤ 6 ve Δ ≥ −6. Yani 6 ≤ b₂ ≤ 18 saat aralığında taban aynı kalır ve Z* = 36 + 1.5·(b₂ − 12) bin lira olur. Denetim: b₂ = 13 için 37.5; sayfa da 1. sekmede aynı değeri, (1.6667, 6.5) köşesinde gösterir.",
    ],
    result:
      "Optimum (x, y) = (2, 6), Z* = 36 bin lira/hafta. Gölge fiyatlar 0, 1.5 ve 1 bin lira/saat; ikil amaç da 36. K2'nin 1.5'lik fiyatı b₂ = 6 ile 18 saat arasında geçerlidir; uçlarda köşe dejenere olur ve fiyat değişir.",
  },
  misconceptions: [
    {
      myth: "En iyi planda bütün kaynaklar sonuna kadar kullanılır.",
      truth: "Cam atölyesinin optimumunda K1'in 4 saatinden 2'si boş kalır. İki değişkenli bir sorunda tek bir köşeyi belirlemeye iki sınır yeter; ötekiler aylak kalabilir ve gölge fiyatları 0 olur. Boş kapasite bir planlama hatası olmak zorunda değildir.",
    },
    {
      myth: "Gölge fiyat 1.5 ise eklediğim her saat 1.5 bin lira getirir.",
      truth: "Gölge fiyat bir türevdir ve yalnız optimum taban değişmediği sürece geçerlidir. K2'de bu aralık b₂ = 18'de biter: sayfada b₂ = 19 yaptığında Z* 45'te kalır, K2'nin aylağı 1, gölge fiyatı 0 olur.",
    },
    {
      myth: "Simpleks bütün köşeleri tek tek dener.",
      truth: "Her pivot yalnız Z'yi azaltmayan komşu bir köşeye geçer. Varsayılan sorunda beş köşe vardır; Dantzig kuralı üçüne, Bland dördüne uğrar. Bütün köşeleri gezdiren Klee–Minty türü örnekler özel olarak kurulmuştur.",
    },
    {
      myth: "Bolluğu olan bir faaliyet projeyi geciktiremez.",
      truth: "Bolluk, beklenen sürelerle hesaplanmış bir paydır. Süreler belirsizse bir günlük bolluğu olan C ve F, varsayılan benzetimde koşuların %35'inde en uzun yolun üzerindedir. Bolluk küçükse o faaliyeti de kritik gibi izlemek gerekir.",
    },
  ],
  glossary: [
    { term: "Uygun bölge", definition: "Bütün kısıtları aynı anda sağlayan noktaların kümesi; doğrusal kısıtlarda dışbükey bir çokgen ya da çokyüzlüdür." },
    { term: "Aylak değişken", definition: "Bir ≤ kısıtını eşitliğe çevirmek için eklenen, kısıtın kullanılmayan kapasitesini ölçen negatif olmayan değişken." },
    { term: "Temel çözüm", definition: "Kısıt sayısı kadar değişkenin denklem sisteminden çözüldüğü, geri kalanların sıfır alındığı çözüm; uygunsa bir köşeye karşılık gelir." },
    { term: "Pivot", definition: "Temele bir değişkenin girip birinin çıktığı, satır işlemleriyle yapılan simpleks adımı." },
    { term: "Gölge fiyat", definition: "Bir kısıtın sağ tarafı bir birim artırıldığında en iyi amaç değerindeki değişim; ikil değişkenin optimum değeridir." },
    { term: "Dejenere köşe", definition: "Belirlenmesi için gerekenden fazla sınırın üzerinden geçtiği köşe; tabloda temeldeki bir değişkenin 0 değer almasıyla tanınır." },
    { term: "Toplam bolluk", definition: "Bir faaliyetin, projenin bitiş süresini uzatmadan gecikebileceği en büyük süre: LS − ES." },
    { term: "Kritik yol", definition: "Proje ağında baştan sona en uzun süreli yol; üzerindeki faaliyetlerin toplam bolluğu sıfırdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Endüstri mühendisliği, işletme ve uygulamalı matematik bölümlerinde bu sayfanın konuları <strong>Yöneylem Araştırması I</strong> ya da <strong>Doğrusal Programlama</strong> adıyla okutulur ve <strong>Lineer Cebir</strong> üzerine kurulur: taban, B matrisinin sütunlarıdır; temel çözüm x<sub>B</sub> = B⁻¹b, gölge fiyatlar y = c<sub>B</sub>B⁻¹ biçiminde yazılır ve tablodaki her sayı bu iki çarpımdan okunur. Sayfada kurulamayan durumlar derste ilk karşılaşacakların arasındadır: başlangıç köşesi belli olmayan sorunlar için iki evreli simpleks, sağ taraf ve kâr katsayıları için tam duyarlılık aralıkları, ikil simpleks. Değişkenlerin tamsayı olması gerektiğinde (yarım kamyon gönderilmez) sürekli çözümü yuvarlamak yetmez; dal-sınır ve kesme düzlemi yöntemleri gerekir. <strong>Algoritmalar</strong> dersi ise Klee–Minty örneğinden yola çıkıp elipsoit ve iç nokta yöntemlerine, yani köşelerde yürümek yerine bölgenin içinden geçen çözücülere uzanır.",
      "Kritik yol tarafı <strong>Çizge Kuramı</strong> ile birleşir: topolojik sıralama, en kısa ve en uzun yol, ağ akışları ve atama sorunu aynı doğrusal programlama ailesinin özel üyeleridir. PERT tarafı <strong>Olasılık ve İstatistik</strong> dersine açılır: bağımsız rastgele değişkenlerin toplamı, merkezi limit teoremi, en büyük değerin dağılımı ve Jensen eşitsizliği. Sayfadaki Monte Carlo, <strong>Benzetim</strong> dersinin ilk haftasıdır: tohumlu sözde rastgele sayı üreteci, beta dağılımından örnekleme, örnekleme hatasının 1/√n ile küçülmesi. Burada faaliyet süreleri bağımsız sayıldı ve kaynak kısıtı yok; aynı ekibe ya da aynı tedarikçiye bağlı işler birlikte gecikir ve gerçek yayılım daha geniştir. Bu yüzden büyük projelerde çizelge riski bugün çoğunlukla benzetimle hesaplanır.",
    ],
    topics: [
      "İki evreli ve ikil simpleks",
      "Duyarlılık analizi",
      "Tamsayılı programlama",
      "Ağ akışları ve atama sorunu",
      "İç nokta yöntemleri",
      "Dışbükey optimizasyon",
      "Monte Carlo benzetimi",
    ],
  },
  quiz: [
    {
      question: "Cam atölyesinde (optimum (2, 6), Z* = 36; gölge fiyatlar K1: 0, K2: 1.5, K3: 1) hangi değişiklik haftalık kârı en çok artırır?",
      options: ["K1'e 3 saat eklemek", "K2'ye 2 saat eklemek", "K3'e 2 saat eklemek", "Üçü de aynı artışı verir"],
      answer: 1,
      explanation:
        "K1'in zaten 2 saati boştur; 3 saat daha eklemek Z'yi değiştirmez. K2'ye 2 saat 2 × 1.5 = 3 bin lira (Z* = 39), K3'e 2 saat 2 × 1 = 2 bin lira (Z* = 38) getirir. İki değişiklik de gölge fiyatların geçerli olduğu aralıkta kalır (b₂ ≤ 18, b₃ ≤ 24).",
    },
    {
      question: "Aynı sorunda yalnız kapının birim kârı c₁ artırılıyor (c₂ = 5 sabit). Optimum, D (2, 6) köşesinden C (4, 3) köşesine hangi c₁ değerinde geçmeye başlar?",
      options: ["c₁ = 5", "c₁ = 6", "c₁ = 7.5", "c₁ = 10"],
      answer: 2,
      explanation:
        "İki köşede Z'yi eşitle: Z(D) = 2c₁ + 30, Z(C) = 4c₁ + 15. Eşitlik c₁ = 7.5'te sağlanır; o anda eş kâr doğrusunun eğimi K3'ün eğimine (−3/2) eşittir ve kenarın tümü optimumdur (Z = 45). Kaydırıcıyı 8'e getirince optimum C'ye atlar, Z* = 47 olur. Kısıtlar değişmediği hâlde plan değişir: köşeyi kâr katsayılarının oranı seçer.",
    },
    {
      question: "Bir projede ortak faaliyeti olmayan iki bağımsız yol var ve her birinin 20 günde bitme olasılığı %50. Projenin 20 günde bitme olasılığı kaçtır?",
      options: ["%50", "%75", "%25", "%100"],
      answer: 2,
      explanation:
        "Proje ancak iki yol da bittiğinde biter: 0.5 × 0.5 = 0.25. Tek yola bakan PERT hesabı %50 derdi. Yol sayısı arttıkça ya da yolların süreleri birbirine yaklaştıkça bu birleşme yanlılığı büyür; sayfanın C gecikebilir düzeninde normal yaklaşım ile benzetim arasındaki 16 puanlık farkın kaynağı budur.",
    },
  ],
  next: [
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum", why: "Simpleks tablosundaki satır işlemlerinin ve tabanın arkasındaki matris dilini kur." },
    { href: "normal-dagilim.html", title: "Normal Dağılım", why: "PERT'in yaslandığı merkezi limit teoremini ve çarpık toplamların normale ne kadar çabuk yaklaştığını dene." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "Kritik yol en uzun yoldur; aynı çizge düşüncesinin en kısa yol yüzünü gör." },
    { href: "uretim-planlama-ve-endustri-muhendisligi.html", title: "Üretim Planlama ve Endüstri Mühendisliği", why: "Buradaki darboğaz bir gölge fiyattı; orada bir hattın akışını belirleyen istasyon. Sipariş miktarı, kontrol grafikleri ve akış deneyleriyle aynı karar mantığını sürdür." },
  ],
  sources: [
    {
      title: "Wikipedia · Operations research",
      url: "https://en.wikipedia.org/wiki/Operations_research",
      note: "Bawdsey (1937), Blackett'in ekibi, uçaksavar mermisi sayıları ve su bombası derinliği; rakamlar bu maddede aktarıldığı biçimiyle.",
    },
    {
      title: "MacTutor · George Dantzig biyografisi",
      url: "https://mathshistory.st-andrews.ac.uk/Biographies/Dantzig_George/",
      note: "Neyman'ın dersindeki iki problem, savaş yıllarındaki planlama işi, 1947'de simpleks ve ‘doğrusal programlama’ adını Koopmans'ın önermesi.",
    },
    {
      title: "Wikipedia · Linear programming",
      url: "https://en.wikipedia.org/wiki/Linear_programming",
      note: "Kantorovich, Koopmans ve Dantzig'in katkıları, von Neumann ve ikillik, 70 kişi–70 iş örneği, 1975 Nobel Ekonomi Ödülü, Khachiyan (1979).",
    },
    {
      title: "Wikipedia · Klee–Minty cube",
      url: "https://en.wikipedia.org/wiki/Klee%E2%80%93Minty_cube",
      note: "Dantzig kuralının 2^D köşenin hepsine uğradığı örnek ve Bland kuralı için benzer davranış.",
    },
    {
      title: "Wikipedia · Program evaluation and review technique",
      url: "https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique",
      note: "PERT'in 1958'de Polaris programı için duyurulması; beklenen süre, (b − a)/6 kuralı ve bolluk tanımları.",
    },
  ],
  revision: "Kasım 2026",
};
