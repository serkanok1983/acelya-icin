window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["matris-donusumleri"] = {
  slug: "matris-donusumleri",
  title: "Matris Dönüşümleri: Dört Sayıyla Düzlemi Yeniden Çizmek",
  field: "Matematik",
  level: "Lise ileri",
  minutes: 30,
  tagline:
    "Dört sayı bir şekli döndürür, gerer, yamultur, aynada çevirir ya da bir çizgiye ezer. Sütunları, determinantı ve özdeğerleri on bir köşeli küçük bir evin üstünde okumayı öğren.",
  hook: "Sayfadaki 'Y eksenine göre' kutusunu işaretle: ev kıpırdamaz, soluk gölgesiyle piksel piksel çakışır. Ama Determinant kartı sakin bir sesle −1.0000 yazar. Göz hiçbir değişiklik görmedi; dört sayı ise evin aynadan geçtiğini, sağıyla solunun yer değiştirdiğini fark etti. Nasıl?",
  bigIdea:
    "Bir 2×2 matris, orijini yerinde bırakan bir <strong>doğrusal dönüşümün</strong> eksiksiz tarifidir: sütunları (1, 0) ile (0, 1)'in nereye gittiğini, determinantı alanın kaç katına çıktığını ve şeklin aynadan geçip geçmediğini, özdeğerleri ise yerinde kalan reel bir doğrultu olup olmadığını ve varsa o doğrultunun kaç kat uzadığını söyler.",
  story: [
    "İki bin yıl kadar önce Çinli bir hesapçı, pirinç demetleriyle ilgili bir bilmeceyi hesap tahtasına dizdiği çubuklarla çözüyordu. Soru, <em>Dokuz Bölümde Matematik Sanatı</em>'ndandır (Jiuzhang Suanshu); kitap kuşaklar boyunca derlendi ve son biçimini en geç MS 1. yüzyılda aldı. Sekizinci bölümü <em>fangcheng</em> (dikdörtgen dizilim) şöyle açılır: 3 demet iyi, 2 demet orta, 1 demet kötü pirinç sapı 39 ölçek tane verir; 2-3-1 demet 34, 1-2-3 demet 26 ölçek verir. Her demet kaç ölçek verir? Çözüm, sayıları sütun sütun dizip bir sütunun katlarını ötekinden çıkararak bilinmeyenleri tek tek elemektir (cevap: 9¼, 4¼ ve 2¾). Doğrusal denklem çözmek bundan da eskidir; Babil kil tabletlerinde iki bilinmeyenli doğrusal problemler vardır. Ama katsayıları bir tabloya dizip sistemli biçimde eleyen bilinen en eski kayıt budur: bugün <strong>Gauss eliminasyonu</strong> dediğimiz yöntem, Gauss'tan en az 1700 yıl önce oradadır. Çok sonra, 1683'te Japonya'da Seki Takakazu ve 1693'te Leibniz, böyle tabloları çözerken katsayılardan kurulan tek bir sayıyı, bugünkü adıyla <strong>determinantı</strong>, birbirinden bağımsız olarak kullandılar.",
    "Sözcüğün kendisi 1850'de geldi. James Joseph Sylvester, Cambridge'in matematik sınavında ikinci olmuştu ama diploma alamadı: mezunların Anglikan Kilisesi'nin inanç maddelerini onaylaması gerekiyordu ve Sylvester Yahudi'ydi. Londra'da sigorta aktüeri olarak çalışırken bir sayı dizilimine Latincede 'rahim' anlamına da gelen <em>matrix</em> adını verdi; 1851'de nedenini yazdı: içinden pek çok determinantın 'ortak bir annenin rahminden doğar gibi' çıkabildiği dikdörtgen bir terim dizisi. Dostu Arthur Cayley o yıllarda avukattı; on dört yıllık hukuk hayatında iki yüzü aşkın makale yazdı ve ikisi Lincoln's Inn'in avlularında yürüyerek matematik konuşurdu. Cayley'nin 1858 tarihli <em>A Memoir on the Theory of Matrices</em> çalışması bir dönüm noktasıdır: matrisi denklem sisteminden kopardı, toplanıp çarpılabilen tek bir nesne olarak ele aldı ve çarpımda sıranın önemli olduğunu, AB'nin genellikle BA'ya eşit olmadığını açıkça gösterdi.",
    "Matrisin geometrik yüzü, yani 'dört sayı = düzlemi yeniden çizen bir makine' bakışı, bilgisayarla birlikte gündelik hayatın içine girdi. Bir oyun karakteri döndüğünde ekran kartı, karakteri oluşturan her köşeyi aynı matrisle çarpar; binlerce çekirdek bu işi aynı anda yapar ve bir sahnede her karede yüz binlerce, hatta milyonlarca köşe bu işlemden geçer. Bu sayfadaki on bir köşeli ev, aynı makinenin en küçük modelidir: bir kaydırıcıyı her oynattığında sayfa ölçek, kayma, döndürme ve yansıma matrislerini çarpıp tek bir 2×2 matris çıkarır, sonra on bir köşenin her birini o matrisle çarparak şekli yeniden çizer. Tablodaki dört sayıyı okumayı öğrenen, şekle bakmadan ona ne olduğunu söyleyebilir.",
  ],
  core: [
    {
      heading: "Matrisin sütunları birer adres",
      body: "Bir dönüşümün düzlemdeki her noktaya ne yaptığını bilmek için yalnızca iki noktayı izlemek yeter: (1, 0) ve (0, 1). Çünkü her nokta bu ikisinin karışımıdır: (3, 2) = 3·(1, 0) + 2·(0, 1). Dönüşüm <strong>doğrusal</strong> ise bu karışım korunur; görüntü de aynı tarifle, iki görüntünün karışımıdır. Bu yüzden 2×2 matris iki sütundan ibarettir: birinci sütun (1, 0)'ın, ikinci sütun (0, 1)'in yeni adresi. Sayfada Açı'yı 90° yap: matris 0 −1 / 1 0 olur. İlk sütun (0, 1): sağa bakan birim adım artık yukarı bakıyor. İkinci sütun (−1, 0): yukarı bakan birim adım sola dönmüş.",
      formula: "[a b; c d]·(x, y) = (a·x + b·y, c·x + d·y)",
      formulaNote:
        "Satırları noktalı virgülle ayırıyoruz. (a, c) birinci, (b, d) ikinci sütundur; orijin (0, 0) her zaman yerinde kalır.",
    },
    {
      heading: "Dört hareketin dört matrisi",
      body: "Ölçekleme köşegene oturur: [Sx 0; 0 Sy]; Sx negatifse yatayda bir de ayna vardır. Tek yönlü kayma [1 k; 0 1] her noktayı yüksekliğiyle orantılı kadar yana iter, tıpkı tabanı sabit bir iskambil destesini yana yatırmak gibi. Yansıma bir koordinatın işaretini çevirir: x eksenine göre ayna [1 0; 0 −1]. Döndürmeyi ezberlemek gerekmez, sütun kuralı onu verir: (1, 0) birim çember üzerinde θ kadar yürüyüp (cos θ, sin θ)'ya, (0, 1) ise (−sin θ, cos θ)'ya gider. Sayfada Açı = 30° iken tabloda beliren 0.866 ve 0.500, cos 30° ile sin 30°'nin ta kendisidir.",
      formula: "R(θ) = [cos θ  −sin θ; sin θ  cos θ]",
      formulaNote:
        "θ pozitifken saat yönünün tersine döner. Sx = −1.00 matrisi, 'Y eksenine göre' yansımasıyla aynı matristir.",
    },
    {
      heading: "Art arda dönüşüm: çarpım ve sıra",
      body: "Bir dönüşümün ardından ötekini uygulamak, matrislerini çarpmaktır; sonuç yine tek bir matristir. Ama matris çarpımı sayı çarpımına benzemez: genellikle AB ≠ BA. Sayfa sırayı senin yerine seçer ve hiç değiştirmez: önce ölçek, sonra kayma, sonra döndürme, en son yansımalar. Yazarken en sağdaki ilk uygulanır, çünkü vektör sağdan çarpılır: M·v = Y·(R·(K·(S·v))). İki ayna matrisinin sırası fark etmez, ikisi de köşegendir. Ölçek ile döndürmenin sırası ise önemlidir: Sx = 2.00 ve Açı = 90° iken ev dikine uzar; önce döndürüp sonra yatayda germek onu yatay uzatırdı (4. deney).",
      formula: "M = Y<sub>y</sub> · Y<sub>x</sub> · R(θ) · K · S",
      formulaNote:
        "S ölçek, K kayma [1 Shx; Shy 1], R döndürme, Y<sub>x</sub> ve Y<sub>y</sub> yansıma kutuları. Kutu boşsa o çarpan birim matristir.",
    },
    {
      heading: "Determinant: alan çarpanı ve ayna dedektörü",
      body: "(1, 0) ile (0, 1)'in gerdiği birim kare, dönüşümden sonra iki sütunun gerdiği bir paralelkenara gider. Bu paralelkenarın işaretli alanı <strong>determinanttır</strong>. Her şekil küçük karelerden örülebildiği için her şeklin alanı aynı sayıyla çarpılır: sayfadaki 5600 birim²'lik ev, determinant 3 iken 16800 birim² olur. İşaret ayrı bir bilgi taşır: eksi, şeklin aynada çevrildiğini, köşelerin dolaşım yönünün tersine döndüğünü söyler. Sıfır ise düzlemin bir doğruya ya da tek noktaya ezildiğini; o zaman dönüşüm geri alınamaz.",
      formula: "det [a b; c d] = a·d − b·c,   det(AB) = det A · det B",
      formulaNote:
        "Sayfada det M = Sx · Sy · (1 − Shx·Shy) · (±1): döndürme 1 ile çarpar, işaretli her yansıma kutusu bir eksi ekler.",
    },
    {
      heading: "Özvektör ve özdeğer: yolundan sapmayan oklar",
      body: "Çoğu vektör dönüşümde hem boyunu hem yönünü değiştirir. Bazı özel vektörler ise yalnızca uzar, kısalır ya da ters döner; kendi doğrultusundan çıkmaz. Bunlar <strong>özvektörlerdir</strong>, uzama çarpanları da <strong>özdeğerler</strong>. Sx = 2.00, Sy = 1.50 iken x ekseni üzerindeki her vektör 2, y ekseni üzerindeki 1.5 kat uzar: özdeğerler 2.000 ve 1.500. 2×2 matriste özdeğerler ikinci dereceden bir denklemin kökleridir. Diskriminant negatifse kökler karmaşık çıkar; bu, düzlemde yerinde kalan reel bir doğrultu olmadığı anlamına gelir. 0° ve ±180° dışındaki her döndürme böyledir; 180°'de ise her vektör tam ters döner ve iki özdeğer de −1 olur.",
      formula: "A·v = λ·v  ⇒  λ² − (a + d)·λ + (a·d − b·c) = 0",
      formulaNote:
        "a + d matrisin izi, a·d − b·c determinantıdır. Özdeğerler kartı bu denklemi çözer; özvektörleri ise çizmez.",
    },
  ],
  lab: {
    intro:
      "Sayfada yan yana iki tuval var. Solda <strong>Orijinal Şekil</strong>: kodda 'ev' diye tanımlanmış, 11 köşeli, y eksenine göre simetrik bir çokgen. Sağda <strong>Dönüştürülmüş Şekil</strong> turkuaz çizilir; orijinal, onun üstüne soluk mor bir gölge olarak bindirilir. Koordinatlar tuval pikselidir, ızgaranın her gözü 32 birimdir. Kontroller: <strong>Ölçekleme</strong> grubunda Sx ve Sy (−3 ile 3 arası, 0.05 adım), <strong>Döndürme</strong> grubunda Açı (°) (−180 ile 180, 1° adım), <strong>Kaydırma (Shear)</strong> grubunda Shx ve Shy (−2 ile 2, 0.05 adım), <strong>Yansıtma</strong> grubunda 'X eksenine göre' ve 'Y eksenine göre' kutuları. Altta Dönüşüm Matrisi, Determinant, Özdeğerler ve Alan Çarpanı kartları anında güncellenir. Çarpım sırası sabittir: ölçek → kayma → döndürme → yansımalar. Sıfırla düğmesi yok; varsayılanlar Sx = Sy = 1.00, Açı 0°, Shx = Shy = 0.00, kutular boş. Tam değere ulaşmak için kaydırıcıya tıklayıp ok tuşlarını kullan. Bir uyarı: ev ters durur, sivri çatısı aşağı bakar; köşeler y'si aşağı doğru artan ekran düzeniyle yazılmış ama y'si yukarı bakan eksenle çizilmiş.",
    experiments: [
      {
        title: "Görünmez ayna",
        predict:
          "Her şey varsayılandayken 'Y eksenine göre' kutusunu işaretlersen sağdaki şekil nasıl değişir, Determinant kaç olur? İki kutuyu birden işaretlemek hangi açıdaki döndürmeyle aynıdır?",
        do: "Önce yalnız 'Y eksenine göre'yi işaretle; Determinant ve Özdeğerler kartlarını oku. Kutuyu kaldırıp 'X eksenine göre'yi işaretle. Sonra ikisini birlikte işaretle ve matrisi yaz. En son iki kutuyu boşaltıp Açı'yı 180°'ye getir ve tabloları karşılaştır.",
        observe:
          "Y eksenine göre: turkuaz şekil mor gölgeyle tam çakışır, ama Determinant −1.0000, özdeğerler 1.000 ve −1.000 (reel). X eksenine göre: ters ev ayağa kalkar, çatı yukarı bakar; Determinant yine −1.0000. İki kutu birlikte: köşegen −1.000 ve −1.000, Determinant 1.0000, özdeğerler −1.000 ve −1.000. Açı 180°'de aynı tablo çıkar; yalnız matrisin sağ üst elemanında '-0.000' görürsün.",
        explain:
          "Şekil simetrik olduğu için aynadaki hâli kendisiyle çakışır; determinant ise noktaların yerini değil <strong>yönelimi</strong> izler: köşelerin dolaşım yönü tersine döner. İki yansımanın determinantı (−1)·(−1) = +1'dir: iki ayna bir döndürme yapar. '-0.000', bilgisayarın sin 180°'yi tam 0 değil, yaklaşık 1.2×10<sup>−16</sup> olarak hesaplamasından gelir.",
      },
      {
        title: "Determinantlar çarpılır, alan ona uyar",
        predict:
          "Sx = 2.00, Sy = 1.50 olunca alan kaç katına çıkar? Üstüne Açı = 30° ve Shx = 1.00 eklersen bu sayı değişir mi? Shy'yi 0.50'ye, sonra 1.00'e çıkarırsan ne olur?",
        do: "Varsayılandan başla. Sx = 2.00, Sy = 1.50 yap ve Alan Çarpanı'nı oku. Açı'yı 30°'ye getir, yeniden oku. Shx = 1.00 yap, oku. Son olarak Shy'yi önce 0.50'ye, sonra 1.00'e çıkar ve sağdaki şekli izle.",
        observe:
          "Alan Çarpanı 3.0000×, özdeğerler 2.000 ve 1.500. Açı 30°'de matris 1.732 −0.750 / 1.000 1.299 olur ama Determinant yine 3.0000. Shx = 1.00 iken de 3.0000. Shy = 0.50'de 1.5000'e iner; Shy = 1.00'de 0.0000 olur, şekil tek bir doğru parçasına yapışır ve özdeğerlerden biri 0.000 gösterir.",
        explain:
          "det M = det R · det K · det S = 1 · (1 − Shx·Shy) · Sx·Sy. Döndürme alanı korur, tek yönlü kayma da. Sayfanın kayma matrisi [1 Shx; Shy 1] ise iki yönü birden karıştırır ve 1 − Shx·Shy çarpanını getirir: 1 − 1·1 = 0. Determinant sıfırsa düzlem bir doğruya ezilmiştir; üst üste düşen noktaları yeniden ayırmanın yolu yoktur, dönüşüm <strong>tersinmez</strong>.",
      },
      {
        title: "Döndürmenin sanal özdeğerleri",
        predict:
          "Açı = 90° iken düzlemde kendi doğrultusunda kalan bir vektör var mı? Özdeğerler kartında reel sayılar mı göreceksin?",
        do: "Varsayılandan başla; Açı'yı sırayla 30°, 60°, 90° ve 180° yap. Her adımda Dönüşüm Matrisi'nin ilk sütununu ve Özdeğerler kartını not et. Sonra Açı'yı 1°'ye getir.",
        observe:
          "30°'de ilk sütun 0.866, 0.500 ve özdeğerler 0.866 ± 0.500i. 60°'de 0.500 ± 0.866i, 90°'de 0.000 ± 1.000i. Determinant her seferinde 1.0000. 180°'de özdeğerler birden reel olur: −1.000 ve −1.000. 1°'de 1.000 ± 0.017i.",
        explain:
          "Döndürmenin özdeğerleri cos θ ± i·sin θ'dır: reel kısım kosinüs, sanal kısım sinüs, ikisi birlikte birim çember üzerinde yürür. Sanal kısım sıfır değilse hiçbir doğrultu yerinde kalmaz, çünkü her vektör θ kadar döner. Yalnız 0° ve ±180°'de her doğru kendi üstüne düşer. Karmaşık sayılarda i ile çarpmak da tam 90° döndürmektir.",
      },
      {
        title: "Sıra sabit: önce ölçek, sonra döndürme",
        predict:
          "Sx = 2.00 ve Açı = 90° iken şekil yatayda mı uzun olur, dikeyde mi? Açı'yı değiştirmeden Sx'i 1.00'e, Sy'yi 2.00'ye alırsan ne değişir?",
        do: "Varsayılandan başla; Sx = 2.00 ve Açı = 90° yap, matrisi yaz ve şeklin enini boyunu ızgara gözleriyle say (bir göz 32 birim). Sonra Açı 90°'de kalsın, Sx'i 1.00'e indirip Sy'yi 2.00'ye çıkar.",
        observe:
          "İlkinde matris 0.000 −1.000 / 2.000 0.000; şekil dikeyde 160 birim (tam 5 göz), yatayda 100 birim (3 gözden biraz fazla): uzun ve dar. İkincisinde 0.000 −2.000 / 1.000 0.000; şekil yatayda 200 birim (6 gözden biraz fazla), dikeyde 80 birim (2½ göz). İkisinde de Determinant 2.0000 ve özdeğerler 0.000 ± 1.414i.",
        explain:
          "Sayfa önce ölçekler, sonra döndürür: M = R·S. Sx evin kendi enini uzatır, döndürme o eni dikeye taşır. İkinci matris ise 'önce 90° döndür, sonra yatayda 2 kat uzat' işleminin, yani S·R'nin aynısıdır. R·S ≠ S·R; ama determinant ve özdeğerler ortaktır, çünkü AB ile BA'nın özdeğerleri her zaman aynıdır.",
      },
    ],
  },
  wow: [
    {
      title: "Köprü taşına kazınan çarpım",
      body: "William Rowan Hamilton yıllarca üç bileşenli sayıları, yani uzaydaki noktaları, karmaşık sayılar gibi çarpmanın bir yolunu aradı ve bulamadı. 16 Ekim 1843'te eşiyle Dublin'de kanal boyunca yürürken cevap birden geldi: dört bileşen gerekiyordu. Kendi anlatımına göre i² = j² = k² = ijk = −1 formülünü çakısıyla Brougham (bugün Broome) Köprüsü'nün taşına kazıdı. Bu <strong>kuaterniyonlarda</strong> ij = k ama ji = −k'dir: çarpımda sıra önemlidir. Kazı çoktan silindi, yerinde bugün bir plaket var. Hamilton'ın amacı döndürme değildi; ama kısa süre sonra, 1845'te Cayley, kuaterniyonlarla üç boyutlu döndürmenin nasıl yazılacağını gösterdi. Bugün oyun motorları, robotlar ve uzay araçları yönelimi kuaterniyonla tutar.",
    },
    {
      title: "Saman nezlesi, bir ada ve bir mezar taşı",
      body: "Haziran 1925'te 23 yaşındaki Werner Heisenberg saman nezlesinden kaçmak için polenin neredeyse hiç olmadığı Kuzey Denizi adası Helgoland'a gitti ve atomların yaydığı ışığı hesaplamak için tuhaf bir çarpım kuralı yazdı: iki niceliği hangi sırayla çarptığın sonucu değiştiriyordu. Göttingen'de Max Born kuralı tanıdı: bu, matris çarpımıydı. Born ve Pascual Jordan kuramı matris diliyle yeniden kurdu; konum ile momentum için pq − qp = h/2πi bağıntısı bugün Born'un Göttingen'deki mezar taşında yazılıdır.",
    },
    {
      title: "25 milyar dolarlık özvektör",
      body: "Sergey Brin ile Larry Page'in 1998'de tanıttığı PageRank'te web devasa bir matristir: her sayfa puanını bağlantı verdiği sayfalara paylaştırır. Aranan puanlar, bu matrisin özdeğeri 1 olan <strong>özvektörünün</strong> bileşenleridir; matrisle çarpıldığında hiç değişmeyen dağılım. 2006'da matematikçiler Kurt Bryan ve Tanya Leise bu fikri anlatan makalelerine <em>The $25,000,000,000 Eigenvector</em> (25 milyar dolarlık özvektör) adını verdi. Sayfadaki Özdeğerler kartı aynı denklemi, A·v = λ·v'yi, 2×2 için çözer.",
    },
  ],
  worked: {
    title: "Bir köşeyi zincir boyunca izlemek",
    prompt:
      "Sayfada Sx = 2.00, Shx = 0.50, Açı = 90° seç ve 'X eksenine göre' kutusunu işaretle (Sy = 1.00, Shy = 0.00 kalsın). Dönüşüm matrisini elle kur; determinantı, alan çarpanını ve özdeğerleri bul; evin sivri ucu (0, −60) noktasının nereye gittiğini hesapla.",
    steps: [
      "Matrisleri yaz: S = [2 0; 0 1], K = [1 0.5; 0 1], R(90°) = [0 −1; 1 0], Y<sub>x</sub> = [1 0; 0 −1]. Sayfanın sırası M = Y<sub>x</sub> · R · K · S; en sağdaki ilk uygulanır.",
      "Sağdan çarp: K·S = [2 0.5; 0 1]. R·(K·S) = [0·2 + (−1)·0, 0·0.5 + (−1)·1; 1·2 + 0·0, 1·0.5 + 0·1] = [0 −1; 2 0.5]. Y<sub>x</sub> alt satırın işaretini çevirir: M = [0 −1; −2 −0.5].",
      "Determinant: 0·(−0.5) − (−1)·(−2) = −2. Kısa yol: det S · det K · det R · det Y<sub>x</sub> = 2 · 1 · 1 · (−1) = −2. Alan çarpanı |−2| = 2. Evin alanı 80×40'lık blok, 40×20'lik boyun ve tabanı 80, yüksekliği 40 olan üçgenden 3200 + 800 + 1600 = 5600 birim²'dir; dönüşümden sonra 11200 birim² olur ve şekil aynada çevrilir.",
      "Köşeyi izle: (0, −60) → S → (0, −60) → K → (0 + 0.5·(−60), −60) = (−30, −60) → R → (60, −30) → Y<sub>x</sub> → (60, 30). Doğrudan M ile: (0·0 + (−1)·(−60), (−2)·0 + (−0.5)·(−60)) = (60, 30). Aynı nokta.",
      "Özdeğerler: iz = 0 + (−0.5) = −0.5, det = −2, yani λ² + 0.5·λ − 2 = 0. λ = (−0.5 ± √8.25)/2 ≈ 1.186 ve −1.686. Determinant negatifken diskriminant iz² − 4·det hep pozitiftir: aynalı her dönüşümün iki reel özdeğeri vardır.",
    ],
    result:
      "Sayfa Dönüşüm Matrisi'nde 0.000 −1.000 / −2.000 −0.500, Determinant −2.0000, Alan Çarpanı 2.0000×, Özdeğerler λ₁=1.186 λ₂=-1.686 (reel) gösterir. Sivri uç, merkezin 60 birim sağında ve 30 birim yukarısındadır.",
  },
  misconceptions: [
    {
      myth: "Matris çarpımında sıra önemsizdir; önce döndürüp sonra germek, önce germekle aynıdır.",
      truth:
        "Sayılarda 2·3 = 3·2'dir, matrislerde genellikle AB ≠ BA. Sayfada Sx = 2.00 ve Açı = 90° matrisi 0 −1 / 2 0 verir ve ev dikine uzar; aynı germeyi döndürmeden sonra yapmak 0 −2 / 1 0 verir ve ev yatay uzar. Ortak kalan determinanttır (2), çünkü determinantlar sayıdır ve sayıların çarpımı sıraya bakmaz.",
    },
    {
      myth: "Determinant negatifse şeklin alanı negatif olmuştur.",
      truth:
        "Alan çarpanı determinantın mutlak değeridir; işaret yalnızca şeklin aynada çevrilip çevrilmediğini söyler. 'Y eksenine göre' kutusunu işaretle: simetrik ev hiç değişmemiş görünür, Alan Çarpanı 1.0000× kalır, ama Determinant −1.0000 olur. Eksi, köşelerin dolaşım yönünün tersine döndüğünü kaydeder.",
    },
    {
      myth: "Kayma şekli yamulttuğuna göre alanını da değiştirir.",
      truth:
        "Tek yönlü kayma [1 k; 0 1] alanı korur: bir iskambil destesini yana yatırınca kartların toplam hacmi değişmez. Sayfada yalnız Shx = 1.00 yap: ev yamulur ama Alan Çarpanı 1.0000× kalır. Dikkat: sayfanın Shx ile Shy'yi tek matriste birleştirmesi saf kayma değildir; Shx = Shy = 0.50'de alan çarpanı 0.7500× olur, çünkü det = 1 − Shx·Shy.",
    },
    {
      myth: "Özdeğer karmaşık çıktıysa bir hata vardır; gerçek bir dönüşümün özdeğeri reel olmalıdır.",
      truth:
        "Karmaşık özdeğer, düzlemde yerinde kalan reel bir doğrultu olmadığını söyler; döndürmenin imzasıdır. Shx = 1.00, Shy = −1.00 dene: matris [1 1; −1 1], özdeğerler 1.000 ± 1.000i. Bu, saat yönünde 45° döndürüp √2 ≈ 1.414 kat büyütmektir; Determinant 2.0000 = (√2)².",
    },
  ],
  glossary: [
    {
      term: "Doğrusal dönüşüm",
      definition:
        "T(u + v) = T(u) + T(v) ve T(k·v) = k·T(v) kurallarına uyan dönüşüm; orijin yerinde kalır ve hiçbir doğru eğriye dönüşmez.",
    },
    {
      term: "Birim vektörler e₁, e₂",
      definition:
        "(1, 0) ve (0, 1); bir 2×2 matrisin birinci ve ikinci sütunu bu iki vektörün görüntüleridir.",
    },
    {
      term: "Bileşke dönüşüm",
      definition:
        "Dönüşümleri art arda uygulamak; matrislerin çarpımıyla hesaplanır ve en sağdaki matris ilk uygulanır.",
    },
    {
      term: "Determinant",
      definition:
        "[a b; c d] için a·d − b·c; mutlak değeri alan çarpanını, işareti yönelimin korunup korunmadığını verir.",
    },
    {
      term: "Yönelim",
      definition:
        "Şeklin köşelerinin dolaşım yönü (saat yönü ya da tersi); yansıma bunu çevirir, döndürme korur.",
    },
    {
      term: "Kayma (shear)",
      definition:
        "Noktaları bir eksene paralel, o eksene uzaklıklarıyla orantılı kadar kaydıran dönüşüm; [1 k; 0 1] alanı değiştirmez.",
    },
    {
      term: "Özvektör",
      definition:
        "Dönüşümden sonra kendi doğrultusunda kalan, sıfırdan farklı vektör: A·v = λ·v.",
    },
    {
      term: "Özdeğer (λ)",
      definition:
        "Özvektörün boyunun çarpıldığı sayı; negatifse vektör ters döner, karmaşıksa düzlemde reel özvektör yoktur.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede matris bir sayı tablosu ve bir çarpma kuralıdır; üniversitenin ilk lineer cebir dersinde asıl nesne <strong>dönüşümün kendisi</strong> olur, matris yalnızca seçilen eksenlere göre tutulmuş kaydıdır. 2×2'den n×n'ye geçilir: Gauss eliminasyonu, ters matris, rank ve çekirdek gelir. İlk sürprizlerden biri bu sayfada saklıdır: determinantı sıfır olmayan her 2×2 matris bir döndürme, bir tek yönlü kayma ve bir ölçeklemenin çarpımı olarak yazılabilir (<em>QR ayrışımının</em> 2×2 hâli). Yani Shy'yi sıfırda tutup kalan kaydırıcılarla, sınırlar elverdiği sürece, düzlemin bütün tersinir doğrusal dönüşümlerine ulaşabilirsin. Bilgisayar grafiğinde öteleme doğrusal değildir, çünkü orijini taşır; çözüm koordinatlara bir sayı daha eklemektir. Möbius'un 1827'de tanıttığı <em>homojen koordinatlarla</em> üç boyutlu her hareket tek bir 4×4 matrise sığar.",
      "Özdeğerler ise lisansın her köşesinde karşına çıkar. Bir matrisi tekrar tekrar uyguladığında, genellikle mutlak değerce en büyük özdeğerin özvektörü öne geçer; nüfus modelleri, Markov zincirleri ve PageRank bu fikre dayanır. Fibonacci sayıları bile [1 1; 1 0] matrisinin kuvvetlerinin elemanları olarak belirir: [1 1; 1 0]⁶ = [13 8; 8 5]. Dizinin her adımda yaklaşık kaç kat büyüdüğünü bu matrisin büyük özdeğeri, altın oran φ ≈ 1.618 verir. Titreşen bir köprünün ya da molekülün doğal titreşim biçimleri bir matrisin özvektörleri, kuantum mekaniğinde ölçülebilen enerjiler bir matrisin (daha genel adıyla operatörün) özdeğerleridir. Veri biliminde temel bileşen analizi, bir veri bulutunun en çok yayıldığı yönleri kovaryans matrisinin özvektörleri olarak bulur.",
    ],
    topics: [
      "Gauss eliminasyonu ve ters matris",
      "Rank ve çekirdek",
      "Homojen koordinatlar ve 4×4 grafik matrisleri",
      "Köşegenleştirme",
      "QR ve tekil değer ayrışımı (SVD)",
      "Markov zincirleri",
      "Temel bileşen analizi (PCA)",
    ],
  },
  quiz: [
    {
      question:
        "Sayfada Sx = 2.00, Sy = 1.50 ve Açı = 30° iken (kayma sıfır, kutular boş) Determinant kartı ne gösterir?",
      options: ["1.0000", "3.0000", "2.5981", "3.5000"],
      answer: 1,
      explanation:
        "det(R·S) = det R · det S = 1 · (2 · 1.5) = 3. Döndürme alanı değiştirmez; yalnızca şekli yerinden çevirir. 2.5981 = 3·cos 30° tuzağıdır: açı determinantın içine girmez.",
    },
    {
      question:
        "Dönüşüm Matrisi 0.000 −1.000 / 2.000 0.000 gösteriyor. Şekle bakmadan söyle: (1, 0) noktası nereye gider ve şekil aynadan geçmiş midir?",
      options: [
        "(0, 2) noktasına gider; ayna yok, çünkü determinant +2",
        "(0, −1) noktasına gider; matriste eksi olduğu için ayna var",
        "(2, 0) noktasına gider; ayna yok",
        "(0, 2) noktasına gider; matriste eksi olduğu için ayna var",
      ],
      answer: 0,
      explanation:
        "(1, 0)'ın yeni adresi birinci sütundur: (0, 2). Sağa bakan birim adım yukarı dönmüş ve iki kat uzamış. Aynayı tek bir elemandaki eksi değil, determinantın işareti söyler: 0·0 − (−1)·2 = +2, yönelim korunmuş. Bu matrisi sayfada Sx = 2.00, Açı = 90° ile elde edersin.",
    },
    {
      question:
        "Açı = 90° iken Özdeğerler kartı 0.000 ± 1.000i gösterir. Bu ne anlama gelir?",
      options: [
        "Hesap hatasıdır; özdeğerler hep reel olmalıdır",
        "Şeklin alanı i katına çıkar",
        "Düzlemde doğrultusu korunan sıfırdan farklı hiçbir reel vektör yoktur",
        "Şekil bir doğruya çöker",
      ],
      answer: 2,
      explanation:
        "90° döndürmede her vektör çeyrek tur döner; hiçbiri kendi doğrultusunda kalamaz, bu yüzden reel özvektör yoktur. Özdeğerler cos 90° ± i·sin 90° = ±i'dir. Alan değişmez (Determinant 1.0000), çökme de yoktur.",
    },
  ],
  next: [
    {
      href: "lineer-cebir-ve-ozdegerler.html",
      title: "Lineer Cebir ve Özdeğerler",
      why: "Buradaki Özdeğerler kartı yalnız sayı verir; oradaki 2×2 tezgâhı reel özdeğer varsa özvektör doğrultularını çizer. Ardından baz değişimi ve köşegenleştirme gelir.",
    },
    {
      href: "karmasik-sayilar.html",
      title: "Karmaşık Sayılar",
      why: "Çarpımda büyüklükler çarpılır, açılar toplanır: a + bi ile çarpmak [a −b; b a] matrisidir ve Özdeğerler kartındaki i'nin geometrisi buradadır.",
    },
    {
      href: "barnsley-egreltiotu.html",
      title: "Barnsley Eğreltiotu",
      why: "Dört afin dönüşümle bir yaprak biçimi üret; determinantın alanı küçültmesi ile bütün uzaklıkların küçülmesinin neden ayrı koşullar olduğunu sına.",
    },
    {
      href: "grup-teorisi.html",
      title: "Grup Teorisi",
      why: "Karenin simetrilerini (D₄) Döndür ve Yansıt düğmeleriyle uygula: rs = sr⁻¹, yani sıra yine önemli. 'Ayna üstüne ayna bir döndürmedir' kuralının grup dilindeki hâli.",
    },
  ],
  sources: [
    {
      title: "3Blue1Brown · Linear transformations and matrices",
      url: "https://www.3blue1brown.com/lessons/linear-transformations",
      note: "Essence of Linear Algebra dizisinden: matrisin sütunlarını birim vektörlerin gittiği yer olarak gösteren görsel ders (İngilizce).",
    },
    {
      title: "MIT OpenCourseWare · 18.06SC Linear Algebra (Gilbert Strang)",
      url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
      note: "Determinant, özdeğer ve ayrışımlar için ücretsiz ders videoları ve çözümlü problemler; köprü bölümünün haritası.",
    },
    {
      title: "Wikipedia · Transformation matrix",
      url: "https://en.wikipedia.org/wiki/Transformation_matrix",
      note: "Döndürme, yansıma, kayma ve ölçek matrisleri; homojen koordinatlarla öteleme ve 3B grafik (İngilizce).",
    },
    {
      title: "Vikipedi · Matris (matematik)",
      url: "https://tr.wikipedia.org/wiki/Matris_(matematik)",
      note: "Türkçe genel bakış ve tarihçe: Çin'deki dizilimlerden Cayley'nin 1858 çalışmasına.",
    },
  ],
  revision: "Ekim 2026",
};
