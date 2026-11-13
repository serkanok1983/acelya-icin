window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["matris-donusumleri"] = {
  slug: "matris-donusumleri",
  title: "Matris Dönüşümleri: Dört Sayıyla Düzlemi Yeniden Çizmek",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Dört sayı düzlemi döndürür, gerer, aynalar ya da bir doğruya ezer. Determinantı alan olarak ölç, AB ile BA'yı karşılaştır, yalnızca uzayan okları tara, aynı özdeğerleri Markov zincirinde bul.",
  hook: "Bir şekli, hiç yassılaştırmadan, yavaş yavaş kendi ayna görüntüsüne çevirebilir misin? Sayfada özdeşlikten bir yansımaya giden yolu oynat: tam yarı yolda determinant 0 olur ve ev bir doğruya yapışır. Bu, seçilen yolun bir kusuru değil; düzlemde aynaya giden her sürekli yol bu çizgiden geçmek zorundadır.",
  bigIdea:
    "Bir 2×2 matris, düzlemin bütün noktalarına uygulanan tek bir kuraldır: sütunları iki birim okun yeni yerini, determinantı alanın işaretli çarpanını, özdeğerleri ise hangi doğrultuların yalnızca uzayıp kısaldığını ve matris tekrar tekrar uygulandığında neyin baskın çıktığını söyler.",
  story: [
    "İki bin yıl kadar önce Çinli bir hesapçı, tahıl demetleriyle ilgili bir bilmeceyi hesap tahtasına dizdiği çubuklarla çözüyordu. Soru, <em>Dokuz Bölümde Matematik Sanatı</em>'ndandır (Jiuzhang Suanshu); kitap kuşaklar boyunca derlendi ve son biçimini en geç MS 1. yüzyılda aldı. Sekizinci bölümü <em>fangcheng</em> (dikdörtgen dizilim) şöyle açılır: 3 demet iyi, 2 demet orta, 1 demet kötü tahıl sapı 39 ölçek tane verir; 2-3-1 demet 34, 1-2-3 demet 26 ölçek verir. Her demet kaç ölçek verir? Çözüm, sayıları sütun sütun dizip bir sütunun katlarını ötekinden çıkararak bilinmeyenleri tek tek elemektir (cevap: 9¼, 4¼ ve 2¾). Doğrusal denklem çözmek bundan da eskidir; Babil kil tabletlerinde iki bilinmeyenli doğrusal problemler vardır. Ama katsayıları bir tabloya dizip sistemli biçimde eleyen bilinen en eski kayıt budur: bugün <strong>Gauss eliminasyonu</strong> dediğimiz yöntem, Gauss'tan en az 1700 yıl önce oradadır. Çok sonra, birbirinden habersiz iki kişi katsayılardan kurulan tek bir sayıya, bugünkü adıyla <strong>determinanta</strong> ulaştı: 1683'te Japonya'da Seki Takakazu bilinmeyen yok etme hesaplarında, 1693'te Leibniz de l'Hôpital'e yazdığı bir mektupta, üç denklemli bir takımın çözülebilirliğini bu sayının sıfır olmasıyla yokladı.",
    "Sözcüğün kendisi 1850'de geldi. James Joseph Sylvester, Cambridge'in matematik sınavında ikinci olmuştu ama diploma alamadı: mezunların Anglikan Kilisesi'nin inanç maddelerini onaylaması gerekiyordu ve Sylvester Yahudi'ydi. Londra'da sigorta aktüeri olarak çalışırken bir sayı dizilimine Latincede 'rahim' anlamına da gelen <em>matrix</em> adını verdi; 1851'de nedenini yazdı: içinden pek çok determinantın 'ortak bir annenin rahminden doğar gibi' çıkabildiği dikdörtgen bir terim dizisi. Dostu Arthur Cayley o yıllarda avukattı; on dört yıllık hukuk hayatında yaklaşık 250 makale yazdı. İkisi de Londra'da Lincoln's Inn'deki mahkemelerde çalışıyordu ve iş günü arasında derin matematik sorularını konuşurlardı. Cayley'nin 1858 tarihli <em>A Memoir on the Theory of Matrices</em> çalışması bir dönüm noktasıdır: matrisi denklem sisteminden kopardı, toplanıp çarpılabilen tek bir nesne olarak ele aldı ve çarpımda sıranın önemli olduğunu, AB'nin genellikle BA'ya eşit olmadığını açıkça gösterdi.",
    "Matrisin geometrik yüzü, yani 'dört sayı düzlemi yeniden çizen bir makinedir' bakışı, bilgisayarla birlikte gündelik hayatın içine girdi. Bir oyun karakteri döndüğünde ekran kartı, karakteri oluşturan her köşeyi aynı matrisle çarpar; binlerce çekirdek bu işi aynı anda yapar. Ötelemeyi de çarpıma sokabilmek için koordinatlara bir sayı daha eklenir: düzlemde 3×3, uzayda 4×4 matrisler. Bu sayfadaki küçük ev aynı makinenin en küçük modelidir. Birinci sekmede dört sayıyla eğilip bükülür, dördüncüde ölçek, dönme ve öteleme tek bir 3×3 matriste birleşir. Sütunları okumayı öğrenen, şekle bakmadan ona ne olduğunu söyleyebilir.",
  ],
  core: [
    {
      heading: "Sütunlar her şeyi söyler",
      body: "Bir dönüşümün düzlemdeki her noktaya ne yaptığını bilmek için yalnızca iki oku izlemek yeter: î = (1, 0) ve ĵ = (0, 1). Her nokta bu ikisinin karışımıdır: (3, 2) = 3î + 2ĵ. Dönüşüm <strong>doğrusal</strong> ise karışım korunur; görüntü de aynı tarifle, iki görüntünün karışımıdır. Bu yüzden 2×2 matris iki sütundan ibarettir: birinci sütun Aî, ikinci sütun Aĵ. Birinci sekmede turuncu Aî ve turkuaz Aĵ oklarının uçları sürüklenebilir; varsayılan A = [1.25 −0.5; 0.5 1] için canlı satır 'Aî = (1.250, 0.500) · Aĵ = (−0.500, 1.000)' yazar ve bütün ızgara, ev dahil, bu iki oka uyar. Doğrular doğru, paralel doğrular paralel kalır, başlangıç noktası yerinden kıpırdamaz.",
      formula: "A = [a b; c d],  A(x, y) = x·Aî + y·Aĵ = (ax + by, cx + dy)",
      formulaNote:
        "Satırları noktalı virgülle ayırıyoruz. (a, c) birinci, (b, d) ikinci sütundur. Öteleme bu kurala uymaz, çünkü orijini taşır.",
    },
    {
      heading: "Determinant: birim karenin işaretli alanı",
      body: "Birim kare O → î → î+ĵ → ĵ dönüşümden sonra iki sütunun gerdiği paralelkenara gider. Sayfa bu paralelkenarın alanını köşelerinden, ayakkabı bağı formülüyle <em>ölçer</em> ve ad − bc formülüyle yan yana yazar. Fark ya tam 0 ya da 10⁻¹⁷ mertebesinde bir yuvarlama kalıntısıdır (izdüşümde 2.8 × 10⁻¹⁷): ikisi aynı cebirin iki ayrı işlem sırasıdır. Her şekil küçük karelerden örülebildiği için her şeklin alanı aynı sayıyla çarpılır. İşaret ayrı bir bilgi taşır: eksi, dolaşım yönünün tersine döndüğünü, yani şeklin aynada çevrildiğini söyler; sıfır, düzlemin bir doğruya ya da noktaya ezildiğini. Determinant matrisin girdilerinin sürekli bir fonksiyonu olduğundan, +1'den −1'e giden her sürekli yol bir yerde 0'dan geçer: aynaya dönmek ancak bir an yassılaşarak olur.",
      formula: "½[a(c + d) − (a + b)c + (a + b)d − b(c + d)] = ad − bc,   det(AB) = det A · det B",
      formulaNote:
        "Sol taraf O, Aî, Aî+Aĵ, Aĵ köşelerine uygulanan ayakkabı bağı toplamıdır; terimler sadeleşince ad − bc kalır.",
    },
    {
      heading: "Sıra önemlidir; öteleme bir boyut ister",
      body: "Bir dönüşümün ardından ötekini uygulamak, matrislerini çarpmaktır ve sağdaki ilk uygulanır: ABx = A(Bx). Sayılarda 2·3 = 3·2'dir; matrislerde genellikle AB ≠ BA. İkinci sekmenin varsayılanında A = [1 −1; 1 1] (√2 ölçekli 45° dönme) ve B = [1 1; 0 1] (yatay kesme) için AB = [1 0; 1 2], BA = [2 0; 1 1] çıkar. Sıra değişince değişmeyen tek şey alan çarpanıdır: iki determinant da 2. Öteleme doğrusal olmadığı için 2×2 matrise sığmaz; (x, y) noktasını (x, y, 1) yazınca öteleme de bir matris çarpımına dönüşür. Dördüncü sekmenin grafik hattı ölçek ve dönmeyi bir p noktasına göre kurar: S<sub>p</sub> = T(p)·S·T(−p).",
      formula: "T(tₓ, tᵧ) = [1 0 tₓ; 0 1 tᵧ; 0 0 1],   önce S, sonra R, sonra T:  M = T·R·S",
      formulaNote:
        "Son satır (0, 0, 1) kaldıkça dönüşüm afindir: doğruları ve paralelliği korur. Perspektif izdüşümü bu satırı değiştirir; sayfa onu modellemez.",
    },
    {
      heading: "Yalnızca uzayan oklar: iki yoldan özvektör",
      body: "Çoğu ok dönüşümde hem boyunu hem yönünü değiştirir. <strong>Özvektörler</strong> ise kendi doğrultularında kalır, yalnızca λ kadar uzar, kısalır ya da ters döner. Üçüncü sekme bunları iki ayrı yoldan bulur. Tarama, v = (cos θ, sin θ) okunu 1° adımlarla döndürür ve v ile Av arasındaki α açısının 0'dan (λ &gt; 0) ya da ±180°'den (λ &lt; 0) geçtiği yerleri arar; bunun için v × Av'nin işaret değiştirdiği noktayı iki örnek arasında doğrusal ara değerle bulur. Kuram ise Av = λv'yi (A − λI)v = 0 diye yazar: sıfırdan farklı çözüm için A − λI tekil olmalıdır. Δ &gt; 0 iki gerçel doğrultu, Δ &lt; 0 hiç gerçel doğrultu yok (dönme benzeri), Δ = 0 ise tekrarlı kök demektir; tekrarlı kökte tek doğrultu kalabilir ve matris köşegenleşmez.",
      formula: "det(A − λI) = λ² − (a + d)λ + (ad − bc) = 0,   Δ = (a + d)² − 4(ad − bc)",
      formulaNote:
        "a + d iz, ad − bc determinanttır: λ₁ + λ₂ = iz, λ₁λ₂ = det. Tarama bu denklemi hiç kullanmaz; iki yolun aynı doğrultuya varması bir denetimdir.",
    },
    {
      heading: "Kuvvet yinelemesi neden |λ₂/λ₁| hızında yakınsar?",
      body: "İki gerçel özvektör varsa her başlangıç oku x₀ = c₁v₁ + c₂v₂ diye yazılır. A'yı k kez uygulamak her bileşeni kendi özdeğerinin kuvvetiyle çarpar: Aᵏx₀ = λ₁ᵏ[c₁v₁ + c₂(λ₂/λ₁)ᵏv₂]. |λ₁| &gt; |λ₂| ise köşeli parantezin içindeki v₂ payı her adımda |λ₂/λ₁| katına iner ve ok v₁'e döner; normalize etmek yalnızca boyu ayarlar. Sayfa bu yüzden ardışık iki ok arasındaki açının sinüsünü (dₖ) izler: oranı dₖ₊₁/dₖ kuramdaki |λ₂/λ₁|'e oturur. Aynı hesap Markov zincirinde de geçerlidir: geçiş matrisinin en büyük özdeğeri 1'dir, durağan dağılım onun özvektörüdür ve hata her adımda ikinci en büyük |λ| kadar küçülür. c₁ = 0 ise, yani başlangıç tam v₂ üzerindeyse, kesin aritmetikte yineleme v₁'i hiç bulamaz. Kayan noktada 10⁻¹⁶ düzeyindeki yuvarlama kalıntısı her adımda |λ₁/λ₂| katına büyüyüp oku sonunda v₁'e çevirebilir; ama bunun için durma ölçütünün beklemesi gerekir.",
      formula: "xₖ₊₁ = Axₖ / |Axₖ|,   dₖ₊₁/dₖ → |λ₂/λ₁|,   adım sayısı ≈ log(10⁻¹⁰/d₁) / log|λ₂/λ₁|",
      formulaNote:
        "Hata her adımda sabit bir oranla küçüldüğü için log₁₀ dₖ grafiği düz bir doğrudur (doğrusal yakınsama). |λ₂/λ₁| = 1 ise yakınsama yoktur.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var; her birinin kendi Sıfırla düğmesi bulunur, <kbd>R</kbd> etkin sekmeyi sıfırlar. <strong>01 · Dönüşüm olarak matris</strong>: a, b, c, d kaydırıcıları (−3 ile 3 arası, 0.05 adım) ve kutuları (−5 ile 5 arası), sürüklenebilir Aî ve Aĵ okları, Hazır dönüşüm menüsü (dönme, ölçekleme, kesme, yansıma, dik izdüşüm, tekil) ve bir Ara değer t kaydırıcısı. t, M(t) = (1 − t)I + tA ile girdileri doğrusal olarak karıştırır; sayfa bunun bir dönmeyi 'dönerek' göstermediğini açıkça yazar. Kartlar ölçülen ve formülden gelen determinantı, şeklin işaretli alan oranını, yönelimi ve rank · izi verir. <strong>02 · Bileşke ve ters</strong>: A ve B için hazırlar ve kutular, AB ile BA'nın adım adım çarpımı, formülle ve Gauss–Jordan ile ters, b₁ ve b₂ kaydırıcılarıyla Ax = b'nin hem doğru kesişimi hem Cramer çözümü. <strong>03 · Özvektörler ve özdeğerler</strong>: hazır matrisler, açı taraması, Başlangıç oku x₀'ın açısı ve kuvvet yinelemesi. <strong>04 · Uygulamalar</strong>: 3×3 homojen grafik hattı, Markov zinciri (olasılıklar öğretim değeridir) ve birim çemberin elipse gidişiyle tekil değerler. Sayılar üç ondalıkla, ondalık noktayla ve '−' işaretiyle yazılır; farklar 2.2 × 10⁻¹⁶ biçiminde bilimsel gösterimle.",
    experiments: [
      {
        title: "Aynanın imzası ve doğrusal yolun tuzağı",
        predict:
          "Bir doğruya göre yansıma evin alanını değiştirir mi? Özdeşlikten bu yansımaya doğrusal yolla giderken determinant nasıl değişir? Peki 180° dönmeye giden doğrusal yol?",
        do: "01'de Hazır dönüşüm menüsünden 'Bir doğruya göre yansıma'yı seç (Ayna doğrusunun açısı φ 30°). Kartları ve durum satırını oku, sonra Ara değer t'yi 0.50'ye çek. Ardından 'Dönme'yi seçip Dönme açısı θ'yı 180°'ye getir, t'yi yeniden 0.50 yap. En son 'Bir doğruya dik izdüşüm'ü seç.",
        observe:
          "Yansımada det ölçülen −1.000, formül −1.000, fark 0; Yönelim 'ters döner (det &lt; 0)'; Aî = (0.500, 0.866), Aĵ = (0.866, −0.500); 'Şeklin alan oranı (işaretli)' −1.000 ve birim kare içindeki yay saat yönünde döner. Durum satırı 'det(M(t)) = 1 − 2.000t, t = 0.500 anında sıfırdan geçer' der; t = 0.50'de ev 30.00° açılı ayna doğrusuna ezilir. 180° dönmede det 1.000, ama yol 1 − 4.000t + 4.000t² olur ve t = 0.50'de M(t) sıfır matrise iner: bütün düzlem tek noktaya çöker. İzdüşümde rank · iz '1 · 1.000', alan oranı 0.000.",
        explain:
          "Alan oranı işaretli bir orandır: büyüklüğü 1 (alan korunur), eksisi aynayı kaydeder. Yansımada M(0.5) = (I + F)/2 tam olarak ayna doğrusuna dik izdüşümdür; det'in +1'den −1'e geçerken 0'a uğraması kaçınılmazdır, çünkü det süreklidir. 180° dönmede ise çöküş yalnızca <em>doğrusal ara değerin</em> sonucudur: M(t) = (1 − 2t)I. Dönme açısını 0'dan 180°'ye artıran bir yol boyunca det hep 1 kalırdı. Ara değer t bir animasyon kolaylığıdır, dönüşümün 'gerçek' yolu değildir.",
      },
      {
        title: "Önce hangisi, geri dönülebilir mi?",
        predict:
          "Varsayılan A (√2 ölçekli 45° dönme) ve B (yatay kesme) için AB ile BA aynı mı? Determinantı 0.020 olan bir matrisle Ax = b'yi çözerken b₂'yi 0.25 oynatmak çözümü ne kadar oynatır?",
        do: "02'yi sıfırla ve iki çarpım tablosunu karşılaştır. B hazır menüsünden '90° dönme [0 −1; 1 0]'ı seç. Sonra Sıfırla'ya basıp A hazır menüsünden 'Neredeyse tekil [1 1; 1 1.02]'yi seç; b₁ = 1.00, b₂ = 1.00 yap ve b₂'yi bir adım, 1.25'e çıkar. En son A'yı 'Tekil [1 2; 0.5 1]' yapıp b₂'yi 0.50'ye indir.",
        observe:
          "Varsayılanda AB = [1.000 0.000; 1.000 2.000], BA = [2.000 0.000; 1.000 1.000], en büyük |AB − BA| girdisi 1.000; det(AB) · det(BA) yine 2.000 · 2.000. B = 90° dönme olunca 0.000 (değişmeli). Neredeyse tekil A'da A⁻¹ = [51.000 −50.000; −50.000 50.000] ve koşul sayısı σ₁/σ₂ = 202.015 (uyarıyla). b = (1, 1) iken x = (1.000, 0.000); b₂ = 1.25'te x = (−11.500, 12.500). Tekil A'da not 'Gauss–Jordan 2. sütunda pivot bulamadı' der; b₂ = 1.25'te doğrular paralel (çözüm yok), b₂ = 0.50'de 'aynı doğru' (sonsuz çözüm).",
        explain:
          "Kesme ile dönmenin sırası evi farklı yerlere taşır; iki dönme-ölçekleme ise karmaşık sayı çarpımları gibi değişmelidir. Determinantlar sayı olduğu için sıradan bağımsız çarpılır. Neredeyse tekil matrisin iki satırı neredeyse paralel iki doğrudur: sağ taraftaki 0.25'lik oynama, kesişim noktasını yaklaşık 17.7 birim kaydırır. Koşul sayısı bu büyütmenin ölçüsüdür. Tam tekil durumda ise tek bir çözüm hiç yoktur: b ya iki doğruyu paralel bırakır ya da üst üste bindirir.",
      },
      {
        title: "Yalnızca uzayan oklar",
        predict:
          "[1 2; 1 0] matrisinde kendi doğrultusunda kalan oklar var mı; varsa biri ters dönüyor mu? [1 −1; 1 1] ve [1 1; 0 1] için ne beklersin?",
        do: "03'te Hazır durum 'Bir negatif özdeğer [1 2; 1 0]'ı seç ve Taramayı oynat; α grafiğinde 0 ve ±180° geçişlerini izle, tabloyu oku. Sonra sırayla 'Karmaşık (dönme benzeri) [1 −1; 1 1]' ve 'Tekrarlı, tek doğrultu [1 1; 0 1]' hazırlarını seç; karakteristik denklem kutusunu, tabloyu ve köşegenleştirme notunu oku.",
        observe:
          "Negatif özdeğerde denklem λ² − 1.000λ − 2.000 = 0, Δ = 9.000, λ₁ = 2.000, λ₂ = −1.000. Tablo: v₁ ölçülen 26.56°, kuram 26.57°, fark '−1.4 × 10⁻³° · −2.5 × 10⁻⁴'; v₂ 135.00° / 135.00°, λ −1.000 (orada Av, v'nin tersine bakar). Dönme benzeri matriste Δ = −4.000, λ = 1.000 ± 1.000 i, |λ| = 1.414, arg λ = 45.00°; tarama 'α hiç 0 ya da ±180 olmadı' der, |α| her yerde 45.00°. Tekrarlı kökte tek satır 'v (çift kök, teğet)' 0.00° / 0.00° kalır ve not 'Köşegenleşmez' yazar.",
        explain:
          "Tarama 1° aralıklı örnekler arasında doğrusal ara değer kullandığı için 26.565°'lik gerçek doğrultuyu binde bir derece hatayla bulur; 45° ve 135° gibi ızgaraya denk gelen doğrultularda fark tam 0'dır. [1 −1; 1 1] her oku 45° döndürüp √2 kat büyütür: hiçbir ok yerinde kalmaz, özdeğerler karmaşık eşleniktir ve 1 + i sayısıyla çarpmanın matrisidir. Kesmede v × Av = −sin²θ olur: α eğrisi sıfıra yalnızca dokunur, işaret değiştirmez. Burada dokunma noktası 0° zaten bir örnektir; ızgaraya denk gelmeyen bir teğet noktayı sayfa üç örnekten geçen parabolün tepesiyle bulur.",
      },
      {
        title: "Aynı oran iki kez: kuvvet yinelemesi ve Markov",
        predict:
          "Özdeğerleri 3 ve 1 olan matriste kuvvet yinelemesi kaç adımda yakınsar; özdeğerler 2.339 ve 1.261 olunca daha mı hızlı, daha mı yavaş? Bir hava zincirinde uzun dönem dağılımı yinelemeyle mi, özvektörle mi bulursun?",
        do: "03'ü sıfırla ve Yakınsayana dek'e bas. Hazır durumu 'Yakın özdeğerler [2 0.5; 0.5 1.6]' yapıp tekrarla. Sonra simetrik hazıra dön ve Başlangıç oku x₀'ın açısı'nı 135°'ye getir. Ardından 04'te Uygulama seç menüsünden 'Markov zinciri ve durağan dağılım'ı seç (Hava, Kesin durum 1); en son Hazır zincir 'Dönemli (2 durum)'.",
        observe:
          "Simetrik [2 1; 1 2]: Adım sayısı '22 · yakınsadı', λ₁ tahmini 3.000, ölçülen oran 0.333, kuram 0.333 (fark −7.9 × 10⁻⁸), bulunan doğrultu 45.00°. Yakın özdeğerler: 39 adım, oran 0.539 / 0.539. x₀ = 135°'de Adım sayısı '1 · durdu, v₂ üzerinde', λ₁ tahmini 1.000, doğrultu '135.00° · 45.00°'; durum satırı c₁ = 0 der. Markov Hava: 37 adım, π = (0.457, 0.283, 0.261), λ = 1 özvektörüyle fark 4.8 × 10⁻¹³; oran 0.473, kuram 0.473 (diğer λ: 0.473, 0.127). Dönemli zincir 'yakınsamadı (500 adım)' der; durağan dağılım yine (0.500, 0.500).",
        explain:
          "Oran 1/3 iken her adım hatayı üçte birine indirir; 10 basamak için yaklaşık 10/log₁₀3 ≈ 21 adım gerekir. Oran 0.539'da adım sayısı neredeyse iki katıdır. 135° ikinci öz doğrultudur (c₁ = 0): ok ilk adımda dönmez, durma ölçütü hemen sağlanır, yineleme λ₂ = 1'de kalır. 10⁻¹⁶'lık yuvarlama kalıntısı, durdurulmasaydı oku yaklaşık 40 adımda 45°'ye çevirirdi. Markov'da π, Pᵀ'nin λ = 1 özvektörüdür (kesin 21/46, 13/46, 12/46); hızı ikinci en büyük |λ| = (0.6 + √0.12)/2 belirler. Dönemli zincirde ikinci özdeğer −1'dir; olasılık iki durum arasında sonsuza dek gidip gelir.",
      },
    ],
  },
  wow: [
    {
      title: "Köprü taşına kazınan çarpım",
      body: "William Rowan Hamilton yıllarca üç bileşenli sayıları, yani uzaydaki noktaları, karmaşık sayılar gibi çarpmanın bir yolunu aradı ve bulamadı. 16 Ekim 1843'te eşiyle Dublin'de kanal boyunca yürürken cevap birden geldi: dört bileşen gerekiyordu. Kendi anlatımına göre i² = j² = k² = ijk = −1 formülünü çakısıyla Brougham (bugün Broome) Köprüsü'nün taşına kazıdı. Bu <strong>kuaterniyonlarda</strong> ij = k ama ji = −k'dir: çarpımda sıra önemlidir. Kazı çoktan silindi, yerinde bugün bir plaket var. Hamilton'ın aradığı bir sayı sistemiydi; ama çok geçmeden kuaterniyonların üç boyutlu döndürmeyi tıkız biçimde yazdığı anlaşıldı. Bugün oyun motorları, robotlar ve uzay araçları yönelimi kuaterniyonla tutar.",
    },
    {
      title: "Saman nezlesi, bir ada ve bir mezar taşı",
      body: "Haziran 1925'te 23 yaşındaki Werner Heisenberg saman nezlesinden kaçmak için polenin neredeyse hiç olmadığı Kuzey Denizi adası Helgoland'a gitti ve atomların yaydığı ışığı hesaplamak için tuhaf bir çarpım kuralı yazdı: iki niceliği hangi sırayla çarptığın sonucu değiştiriyordu. Göttingen'de Max Born kuralı tanıdı: bu, matris çarpımıydı. Born ve Pascual Jordan kuramı matris diliyle yeniden kurdu; konum ile momentum için pq − qp = h/2πi bağıntısı bugün Born'un Göttingen'deki mezar taşında yazılıdır.",
    },
    {
      title: "25 milyar dolarlık özvektör",
      body: "Sergey Brin ile Larry Page'in 1998'de tanıttığı PageRank'te web devasa bir matristir: her sayfa puanını bağlantı verdiği sayfalara paylaştırır. Aranan puanlar, bu matrisin özdeğeri 1 olan <strong>özvektörünün</strong> bileşenleridir; matrisle çarpıldığında hiç değişmeyen dağılım. 2006'da matematikçiler Kurt Bryan ve Tanya Leise bu fikri anlatan makalelerine <em>The $25,000,000,000 Eigenvector</em> (25 milyar dolarlık özvektör) adını verdi. Sayfanın Markov uygulaması aynı soruyu üç durumluk bir zincirde sorar: hem yinelemeyle hem λ = 1 özvektörüyle.",
    },
  ],
  worked: {
    title: "Bir negatif özdeğer: özvektör, Aⁿ ve yineleme süresi",
    prompt:
      "A = [1 2; 1 0] olsun. (a) Özdeğerleri ve öz doğrultuları (açı olarak) bul. (b) A = PDP⁻¹ yazıp A¹⁰'u hesapla. (c) x₀ açısı 100° iken ilk yön değişimi d₁ ≈ 0.96'dır; kuvvet yinelemesinin dₖ &lt; 10⁻¹⁰ ölçütüne kaç adımda ulaşacağını tahmin et. Sonuçları 03 sekmesinde 'Bir negatif özdeğer [1 2; 1 0]' hazırıyla denetle.",
    steps: [
      "İz 1 + 0 = 1, determinant 1·0 − 2·1 = −2. Karakteristik denklem λ² − λ − 2 = (λ − 2)(λ + 1) = 0; Δ = 1 + 8 = 9 &gt; 0, yani iki gerçel kök: λ₁ = 2, λ₂ = −1. Denetim: λ₁ + λ₂ = 1 = iz, λ₁λ₂ = −2 = det.",
      "λ₁ = 2: A − 2I = [−1 2; 1 −2], iki satır da x = 2y der; v₁ = (2, 1), açısı arctan(1/2) = 26.57°. λ₂ = −1: A + I = [2 2; 1 1], x = −y; v₂ = (1, −1), doğrultusu −45°, yani 135°. λ₂ eksi olduğu için Av₂ = −v₂: ok aynı doğruda kalır ama ters döner, taramada α = ±180° görünür.",
      "P = [2 1; 1 −1] (sütunlar v₁, v₂), det P = −3, P⁻¹ = (1/3)[1 1; 1 −2], D = diag(2, −1). Aⁿ = PDⁿP⁻¹ = (1/3)[2ⁿ⁺¹ + (−1)ⁿ, 2ⁿ⁺¹ − 2(−1)ⁿ; 2ⁿ − (−1)ⁿ, 2ⁿ + 2(−1)ⁿ]. n = 1 için A'nın kendisi çıkar. n = 10 için A¹⁰ = [683 682; 341 342]; denetim: det = 683·342 − 682·341 = 1024 = (−2)¹⁰. Sayfa P'nin sütunlarını birim uzunluğa ölçekler, [0.894 0.707; 0.447 −0.707]; ölçek PDP⁻¹'i değiştirmez.",
      "Yineleme: Aᵏx₀ = 2ᵏ[c₁v₁ + c₂(−1/2)ᵏv₂]. v₂ payı ve onunla birlikte yön değişimi dₖ her adımda yarıya iner. 0.96·(1/2)ⁿ &lt; 10⁻¹⁰ için n &gt; log₂(0.96·10¹⁰) ≈ 33.2; ilk adımı da sayınca yaklaşık 35 adım. 10 basamak doğruluk, özdeğer oranı 1/2 iken adım başına log₁₀2 ≈ 0.30 basamak demektir.",
    ],
    result:
      "λ = 2 ve −1; öz doğrultular 26.57° ve 135°; A¹⁰ = [683 682; 341 342]. Sayfa tabloda 26.56° / 26.57° ve 135.00° / 135.00° gösterir; Yakınsayana dek ile 36 adımda durur, durum satırındaki tahmin ≈ 35 adım, ölçülen oran 0.500, kuram 0.500, λ₁ tahmini 2.000.",
  },
  misconceptions: [
    {
      myth: "Matris çarpımında sıra önemsizdir; önce döndürüp sonra ötelemek, önce ötelemekle aynıdır.",
      truth:
        "02'nin varsayılanında AB = [1 0; 1 2], BA = [2 0; 1 1]. 04'teki grafik hattında Ölçekle → Döndür → Ötele sırası ile ters sıra arasında en büyük |M − M′| girdisi 1.268'dir; evin ağırlık merkezi (2.021, 0.996) yerine (1.948, 1.906)'ya düşer. sy'yi 2'ye çıkarıp ölçeği eşitlersen dönme ile ölçek değişmeli olur (0.000), ama ötelemenin sırası yine önemlidir: fark 2.328. Sıradan bağımsız kalan yalnızca determinanttır.",
    },
    {
      myth: "Determinant negatifse şeklin alanı negatif olmuştur.",
      truth:
        "Alan çarpanı |det|'tir; işaret yalnızca yönelimi söyler. Bir doğruya göre yansımada sayfa 'Şeklin alan oranı (işaretli)' için −1.000 yazar: ev aynı büyüklükte kalır, ama köşeleri ters yönde dolaşılır ve birim karedeki yay saat yönüne döner.",
    },
    {
      myth: "Determinant sıfır değilse denklem takımının çözümü güvenilirdir.",
      truth:
        "Neredeyse tekil [1 1; 1 1.02] tersinirdir (det 0.020), ama koşul sayısı 202.015'tir: b₂'yi 1.00'den 1.25'e oynatmak çözümü (1.000, 0.000)'dan (−11.500, 12.500)'e fırlatır. Determinantın küçüklüğü de tek başına ölçüt değildir: 0.1·I'nın determinantı 0.01'dir ama koşul sayısı 1'dir. Hassasiyeti en büyük ve en küçük tekil değerin oranı belirler.",
    },
    {
      myth: "Tekil değerler özdeğerlerin mutlak değeridir; elipsin eksenleri özvektörler boyuncadır.",
      truth:
        "Bu yalnızca simetrik matriste doğrudur. 04'te 'Birim çember → elips' uygulamasında Simetrik matris kutusunu kaldır, a = 1, b = 1, c = 0, d = 1 yap: özdeğerler 1 ve 1, ama yarı eksenler 1.618 ve 0.618, büyük eksen 31.72°'de. Kesme yalnızca x eksenindeki okları olduğu gibi bırakır; öteki okların çoğunu uzatır ya da kısaltır ve en çok uzattığı doğrultu bu özvektör değildir.",
    },
  ],
  glossary: [
    {
      term: "Doğrusal dönüşüm",
      definition:
        "A(u + v) = Au + Av ve A(kv) = k·Av kurallarına uyan dönüşüm; orijin yerinde kalır; tersinirse doğrular doğru, paraleller paralel kalır.",
    },
    {
      term: "Determinant",
      definition:
        "[a b; c d] için ad − bc: birim karenin görüntüsünün işaretli alanı; mutlak değeri alan çarpanını, işareti yönelimi verir.",
    },
    {
      term: "Yönelim",
      definition:
        "Bir şeklin köşelerinin dolaşım yönü (saat yönü ya da tersi); yansıma ve negatif çarpanlı tek eksen ölçeklemesi onu çevirir, dönme korur.",
    },
    {
      term: "Özvektör ve özdeğer",
      definition:
        "Av = λv eşitliğini sağlayan sıfırdan farklı v ve λ sayısı: v kendi doğrultusunda kalır, boyu λ ile çarpılır (λ &lt; 0 ise ters döner).",
    },
    {
      term: "Koşul sayısı",
      definition:
        "En büyük ve en küçük tekil değerin oranı σ₁/σ₂; Ax = b'de girdideki göreli hatanın çözümde en çok kaç kat büyüyebileceğini söyler.",
    },
    {
      term: "Homojen koordinat",
      definition:
        "(x, y) noktasını (x, y, 1) diye yazmak; böylece öteleme de bir 3×3 matris çarpımı olur ve bütün afin işlemler tek matriste birleşir.",
    },
    {
      term: "Tekil değer",
      definition:
        "AᵀA'nın özdeğerlerinin karekökleri σ₁ ≥ σ₂; birim çemberin A altındaki görüntüsü olan elipsin yarı eksen uzunlukları.",
    },
    {
      term: "Durağan dağılım",
      definition:
        "Bir Markov zincirinde πP = π eşitliğini sağlayan olasılık vektörü; Pᵀ'nin λ = 1 özdeğerine ait, bileşenleri toplamı 1 olan özvektör.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede matris bir sayı tablosu ve bir çarpma kuralıdır; üniversitenin ilk lineer cebir dersinde asıl nesne <strong>dönüşümün kendisi</strong> olur, matris yalnızca seçilen eksenlere göre tutulmuş kaydıdır. 2×2'den n×n'ye geçilir: Gauss eliminasyonu, ters matris, rank, çekirdek ve sütun uzayı gelir; ikinci sekmedeki 'paralel' ve 'aynı doğru' durumları, b'nin sütun uzayında olup olmamasının iki boyutlu hâlidir. Sayısal lineer cebir dersleri koşul sayısını ve kısmi pivotlamayı ciddiye alır, çünkü bilgisayar her sayıyı yaklaşık tutar. Bilgisayar grafiğinde öteleme doğrusal değildir; Möbius'un 1827'de tanıttığı <em>homojen koordinatlarla</em> üç boyutlu her hareket tek bir 4×4 matrise sığar.",
      "Özdeğerler ise lisansın her köşesinde karşına çıkar. Bir matrisi tekrar tekrar uyguladığında genellikle mutlak değerce en büyük özdeğerin özvektörü öne geçer; nüfus modelleri, Markov zincirleri ve PageRank bu fikre dayanır. Fibonacci sayıları bile [1 1; 1 0] matrisinin kuvvetlerinin elemanları olarak belirir: [1 1; 1 0]⁶ = [13 8; 8 5]. Dizinin her adımda yaklaşık kaç kat büyüdüğünü bu matrisin büyük özdeğeri, altın oran φ ≈ 1.618 verir. Titreşen bir köprünün ya da molekülün doğal titreşim biçimleri bir matrisin özvektörleri, kuantum mekaniğinde ölçülebilen enerjiler bir matrisin (daha genel adıyla operatörün) özdeğerleridir. Tekil değer ayrışımı her matrisi 'döndür, eksenler boyunca ger, yeniden döndür' diye yazar; veri biliminde temel bileşen analizi bir veri bulutunun en çok yayıldığı yönleri bu yolla bulur.",
    ],
    topics: [
      "Gauss eliminasyonu, rank ve dört temel altuzay",
      "Koşul sayısı ve sayısal kararlılık",
      "Homojen koordinatlar ve 4×4 grafik matrisleri",
      "Köşegenleştirme ve Jordan biçimi",
      "Kuvvet yinelemesi ve özdeğer algoritmaları",
      "Markov zincirleri",
      "Tekil değer ayrışımı (SVD) ve temel bileşen analizi",
    ],
  },
  quiz: [
    {
      question:
        "01'de Hazır dönüşüm 'Dönme', θ = 180° seçili. Ara değer t'yi 0'dan 1'e götürürken det(M(t)) nasıl değişir?",
      options: [
        "Hep 1 kalır, çünkü dönme alanı korur",
        "(1 − 2t)² olur: t = 0.50'de sıfıra iner, ev bir an tek noktaya çöker",
        "1 − 2t olur: t = 0.50'den sonra ev aynalanır",
        "t² olur: 0'dan başlayıp 1'e çıkar",
      ],
      answer: 1,
      explanation:
        "180° dönme −I'dır, bu yüzden M(t) = (1 − t)I + t(−I) = (1 − 2t)I ve det = (1 − 2t)². Durum satırı bunu '1 − 4.000t + 4.000t²' diye yazar. Bu, girdilerin doğrusal ara değerinden gelir: dönme açısını 0'dan 180°'ye artıran bir yolda det hep 1 kalırdı. Bir yansıma için ise durum farklıdır: +1'den −1'e giden her sürekli yol 0'dan geçer.",
    },
    {
      question:
        "Bir matrisin özdeğerleri için |λ₂/λ₁| = 0.9 olsun. Kuvvet yinelemesinin yön hatasını 10⁻¹⁰ kat küçültmesi için yaklaşık kaç adım gerekir?",
      options: ["Yaklaşık 22", "Yaklaşık 100", "Yaklaşık 220", "Yaklaşık 2200"],
      answer: 2,
      explanation:
        "Hata her adımda 0.9 ile çarpılır: 0.9ⁿ = 10⁻¹⁰ ⇒ n = 10 / (−log₁₀0.9) ≈ 10 / 0.046 ≈ 218. Oran 1/3 iken aynı hesap 10 / 0.477 ≈ 21 verir; sayfa simetrik [2 1; 1 2] için 22 adım gösterir. Oran 1'e yaklaştıkça adım sayısı 1/(1 − oran) gibi patlar; sayfa en çok 300 adım dener.",
    },
    {
      question:
        "Kesme matrisi [1 1; 0 1]'in iki özdeğeri de 1'dir. Birim çemberin görüntüsü olan elipsin yarı eksenleri (tekil değerler) kaçtır?",
      options: [
        "1 ve 1, çünkü özdeğerler 1",
        "Yaklaşık 1.618 ve 0.618",
        "2 ve 0.5",
        "√2 ve √2",
      ],
      answer: 1,
      explanation:
        "σ₁σ₂ = |det A| = 1 ve σ₁² + σ₂² = AᵀA'nın izi = a² + b² + c² + d² = 3. O hâlde σ² değerleri x² − 3x + 1 = 0'ın kökleridir: (3 ± √5)/2. Karekök alınca σ₁ = φ ≈ 1.618, σ₂ = 1/φ ≈ 0.618. Elips alanı πσ₁σ₂ = π, çünkü kesme alanı korur. Simetrik olmayan matriste tekil değerler özdeğerlerden ayrılır.",
    },
  ],
  next: [
    {
      href: "lineer-cebir-ve-ozdegerler.html",
      title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum",
      why: "Buradaki 2×2 dünyanın n×n hâli: Gauss eleme, dört temel alt uzay, QR ile özdeğerler ve SVD. AᵀAx = Aᵀb'nin rolünü En küçük kareler ve SVD sekmesinde, normal denklemleri QR ile karşılaştırarak gör.",
    },
    {
      href: "karmasik-sayilar.html",
      title: "Karmaşık Sayılar: Düzlemde Döndürme ve Büyütme",
      why: "03'teki [1 −1; 1 1] matrisi 1 + i ile çarpmadır. Oradaki 'Düzlemde işlemler' sekmesinde z ile w'yi sürükleyip çarpımda açıların toplandığını, uzunlukların çarpıldığını ölç: λ = 1.000 ± 1.000 i'nin geometrisi budur.",
    },
    { href: "robotik-ve-kinematik.html", title: "Robotik ve Kinematik: Eklem Açılarından Uç Noktaya ve Geri", why: "Dönüşüm matrisleri bir robot kolunda: homojen matrislerle ileri kinematik, ters kinematik, Jacobian ve tekillik." },
    {
      href: "grup-teorisi.html",
      title: "Grup Teorisi: Simetrinin Cebiri",
      why: "'Simetri grupları' sekmesinde bir çokgeni r (döndür) ve s (yansıt) hamleleriyle oynat; 'iki hamlenin bileşkesi: sıra önemli mi?' sorusunu ve iki yansımanın bir dönme verdiğini Cayley tablosunda gör.",
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
      note: "Determinant, özdeğer, Markov matrisleri ve tekil değer ayrışımı için ücretsiz ders videoları ve çözümlü problemler; sayfanın kavram başvurusu.",
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
  revision: "Kasım 2026",
};
