window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["vektorler"] = {
  slug: "vektorler",
  title: "Vektörler: Yönü Olan Sayıların Aritmetiği",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "3 + 4 her zaman 7 etmez: oklar uç uca eklenir, iki ayrı biçimde çarpılır, hızlar da aynı kuralla toplanır. Stevin'in zincirinden Hamilton'ın köprüsüne ve akıntıda karşıya geçen tekneye, vektörlerin cebiri.",
  hook: "4 adım doğuya, ardından 3 adım kuzeye yürü. Toplam 7 adım attın, ama başladığın yerden yalnızca 5 adım uzaktasın. Aynı iki yürüyüş, adımları hangi yönlere attığına göre 1 ile 7 arasındaki her sonucu verebilir. 3 + 4'ün kaç ettiği nereye baktığına bağlıysa, bu toplamanın kuralı ne?",
  bigIdea:
    "Vektör, eksen seçiminden bağımsız bir oktur: <strong>uç uca eklenerek</strong> toplanır, <em>A·B</em> ile bir okun öbürü üzerindeki payını, <em>A×B</em> ile ikisinin gerdiği yönlü alanı verir; bileşenler bu okun yalnızca seçtiğin eksenlerdeki tarifidir.",
  story: [
    "Yönlü nicelikleri toplama kuralı, kendi adından çok daha yaşlıdır. Aristoteles'e atfedilen ama büyük olasılıkla onun okulundan birinin yazdığı <em>Mekanik Problemler</em>'de, iki hareketi aynı anda yapan bir noktanın bir paralelkenarın köşegeni boyunca gittiği fikri vardır. 1586'da Flaman mühendis Simon Stevin, üçgen bir prizmanın üzerine dolanmış, eşit aralıklı toplardan oluşan kapalı bir zincir çizdi ve bununla bir düşünce deneyi kurdu: zincir kendiliğinden kaymaya başlasaydı sonsuza dek dönerdi; bu olanaksız olduğuna göre dengededir. Buradan, eğik düzlemdeki bir ağırlığın ne kadarının yokuş aşağı çektiğini çıkardı. Sloganı bu buluşa çok yakışır: 'Wonder en is gheen wonder', yani mucize gibi ama mucize değil. 1687'de Newton, <em>Principia</em>'da hareket yasalarının hemen ardından gelen ilk sonuçta kuralı açıkça yazdı: aynı anda iki kuvvetin etkisindeki bir cisim, kuvvetler ayrı ayrı uygulansaydı çizeceği kenarlardan oluşan paralelkenarın köşegenini aynı sürede kateder.",
    "Yine de 19. yüzyılın ortasına kadar bugünkü anlamıyla 'vektör' diye bir sözcük yoktu. İrlandalı matematikçi William Rowan Hamilton, karmaşık sayılarla düzlemdeki noktaları çarpabildiği gibi uzaydaki noktaları da çarpmak istiyordu. Sonradan oğluna yazdığı mektuba göre, 1843 Ekim'inin ilk günlerinde çocukları her sabah kahvaltıda 'Babacığım, üçlüleri çarpabiliyor musun?' diye sorar, o da üzgün bir baş sallayışla 'Hayır, onları yalnızca toplayıp çıkarabiliyorum' derdi. 16 Ekim 1843'te eşiyle Dublin'de Kraliyet Kanalı boyunca yürürken cevap aklına geldi: üçlüler değil, dörtlüler. Temel kuralı, <em>i² = j² = k² = ijk = −1</em>, Brougham (bugünkü Broom) Köprüsü'nün bir taşına kazıdı. Kazıdan iz kalmadı ama köprüde bugün bir plaket var. Hamilton bu dörtlülere <strong>kuaterniyon</strong> dedi; üç parçalı kısmına Latincede 'taşıyıcı' anlamına gelen <em>vector</em>, tek sayılık kısmına <em>scalar</em> adını verdi.",
    "Kuaterniyonlar güçlüydü ama hantaldı. 1880'lerde iki kişi birbirinden bağımsız olarak aynı ameliyatı yaptı: Yale'de Josiah Willard Gibbs ve 16 yaşında okulu bırakmak zorunda kalıp telgrafçı olarak çalışmış, kendi kendini yetiştirmiş İngiliz Oliver Heaviside. İkisi de kuaterniyonun vektör kısmını kesip ayırdı ve iki ayrı çarpım tanımladı: bugün nokta (·) ve çarpı (×) dediğimiz çarpımlar. Gibbs <em>Elements of Vector Analysis</em>'in ilk yarısını 1881'de öğrencileri için bastırdı; Heaviside 1884'te Maxwell'in yirmi denklemlik elektromanyetizmasını bugün ders kitaplarında gördüğümüz dört vektör denklemine indirdi. Kuaterniyon taraftarlarıyla sert bir tartışma koptu; Heaviside, kendi ihtiyacı olan vektör hesabı için kuaterniyonun 'yalnızca gereksiz değil, küçümsenemeyecek boyutta bir kötülük' olduğunu yazdı. 1901'de Edwin Bidwell Wilson'ın Gibbs'in derslerinden derlediği <em>Vector Analysis</em>, vektör hesabını kuaterniyonlara dayanmadan, kendi başına ayakta duran bir sistem olarak kurdu; bugün kullandığımız gösterim büyük ölçüde bu çizgiden gelir.",
  ],
  core: [
    {
      heading: "Bileşenler: ok aynı, tarif değişir",
      body: "Kütle, sıcaklık, süre tek bir sayı ve birimle tam söylenir; bunlara <strong>skaler</strong> denir. 'Beş kilometre yürüdüm' dersen nereye vardığını bilemem; yön eksik. <strong>Vektör</strong>, büyüklüğü ve yönü birlikte taşıyan niceliktir ve ok olarak çizilir. Oku sayıya çevirmek için birbirine dik iki <strong>birim vektör</strong> seçersin, <span class=hat>i</span> ve <span class=hat>j</span>; okun bunlar boyunca payları <strong>bileşenleridir</strong>. Ama eksen seçimi senindir. Eksenleri φ kadar döndürürsen ok yerinde durur, onu tarif eden iki sayı değişir. Sayfada bileşke R = (4.00, 3.00) iken <strong>Eksenleri döndür φ</strong> 30° yapıldığında bileşenler (4.96, 0.60), 90° yapıldığında (3.00, −4.00) olur; büyüklük hep 5.00 kalır. Fizik yasaları bu yüzden vektörlerle yazılır: bir vektör eşitliği, hangi eksenleri seçersen seç doğrudur.",
      formula:
        "A = A<sub>x</sub> <span class=hat>i</span> + A<sub>y</sub> <span class=hat>j</span>,  A<sub>x</sub> = |A| cos θ,  A<sub>y</sub> = |A| sin θ<br>A<sub>x′</sub> = A<sub>x</sub> cos φ + A<sub>y</sub> sin φ,  A<sub>y′</sub> = −A<sub>x</sub> sin φ + A<sub>y</sub> cos φ",
      formulaNote:
        "İkinci satırın karelerini topla: çapraz terimler birbirini götürür, cos²φ + sin²φ = 1 kalır. A<sub>x′</sub>² + A<sub>y′</sub>² = A<sub>x</sub>² + A<sub>y</sub>², yani büyüklük eksenlerden bağımsızdır.",
    },
    {
      heading: "Toplama: uç uca ekle, bileşen bileşen topla",
      body: "İki vektörü toplamak için ikincisinin kuyruğunu birincinin ucuna taşı; başlangıçtan son uca çizilen ok <strong>bileşkedir</strong>. Önce B sonra A yürüsen de aynı köşeye varırsın: iki yol bir paralelkenar kurar, bileşke onun köşegenidir. Sayılarla iş daha da kolaydır, x'ler kendi aralarında, y'ler kendi aralarında toplanır. Çıkarma ayrı bir işlem değildir: A − B, A'ya (−1)·B eklemektir. Bileşkenin boyunu aradaki γ açısı belirler; boyları 4 ve 3 olan iki ok aynı yönde 7, dik durumda 5, zıt yönde 1 verir. Hangi açıyı seçersen seç bileşke bu iki uç değerin dışına çıkamaz; buna <strong>üçgen eşitsizliği</strong> denir ve sayfa bunu her an 1.00 ≤ 5.00 ≤ 7.00 biçiminde yazar.",
      formula:
        "A + B = (A<sub>x</sub> + B<sub>x</sub>, A<sub>y</sub> + B<sub>y</sub>)<br>|A + B|² = |A|² + |B|² + 2|A||B| cos γ<br>||A| − |B|| ≤ |A + B| ≤ |A| + |B|",
      formulaNote:
        "γ, kuyrukları aynı noktaya konmuş iki ok arasındaki açıdır. cos γ, −1 ile 1 arasında kaldığı için üçüncü satır ikinciden hemen çıkar.",
    },
    {
      heading: "Skaler çarpım: kosinüs teoremini saklayan sayı",
      body: "İki vektörden tek bir sayı üreten çarpımı bileşenlerle tanımla: A·B = A<sub>x</sub>B<sub>x</sub> + A<sub>y</sub>B<sub>y</sub> + A<sub>z</sub>B<sub>z</sub>. Bu tanımla A·A = |A|² olur. Şimdi A, B ve A − B oklarının kurduğu üçgene iki yoldan bak. Cebir der ki |A − B|² = (A − B)·(A − B) = |A|² + |B|² − 2 A·B. Kosinüs teoremi der ki |A − B|² = |A|² + |B|² − 2|A||B| cos θ. İkisi aynı uzunluğu anlattığına göre A·B = |A||B| cos θ. <strong>Skaler çarpım</strong> böylece bir okun öbürü yönündeki payını ölçer: oklar dikse sıfırdır, zıt yönlere bakıyorlarsa negatiftir. Sayfanın açılışında A = (4, 1, 0) ve B = (2, 3, 0) için 4·2 + 1·3 = 11.00; aynı sayı, ölçülen θ = 42.27° ile |A||B| cos θ'dan da çıkar. Fizikte iş tam olarak budur: W = F·d.",
      formula:
        "A·B = A<sub>x</sub>B<sub>x</sub> + A<sub>y</sub>B<sub>y</sub> + A<sub>z</sub>B<sub>z</sub> = |A||B| cos θ",
      formulaNote:
        "A'nın B üzerindeki izdüşümü A·B/|B| kadardır; açılış değerlerinde sayfa bunu 3.05 diye yazar. A·B = 0 ise ve iki ok da sıfır değilse oklar diktir.",
    },
    {
      heading: "Vektörel çarpım: yönü olan alan",
      body: "İkinci çarpımın sonucu bir vektördür. <strong>Vektörel çarpım</strong> A × B'nin büyüklüğü |A||B| sin θ, yani iki okun gerdiği paralelkenarın alanıdır; yönü bu paralelkenara diktir ve sağ el kuralıyla seçilir: dört parmağın A'dan B'ye kıvrılırken başparmağın A × B'yi gösterir. Sıra değişince parmaklar ters yöne kıvrılır: B × A = −(A × B). Bir okun kendisiyle çarpımı sıfırdır, çünkü gerilen alan yoktur. Açılış değerlerinde A × B = (0.00, 0.00, 10.00): alan 10.00, yön ekrandan sana doğru. İki çarpım birbirini tamamlar: 11² + 10² = 221 = 17 × 13 = |A|²|B|², çünkü cos²θ + sin²θ = 1. Üçüncü bir C eklenince A·(B × C) üç okun gerdiği paralelyüzün işaretli hacmini verir; sayfadaki C = (1, 1, 3) ile 30.00. Fizikteki karşılığı torktur: τ = r × F.",
      formula:
        "A × B = (A<sub>y</sub>B<sub>z</sub> − A<sub>z</sub>B<sub>y</sub>) <span class=hat>i</span> + (A<sub>z</sub>B<sub>x</sub> − A<sub>x</sub>B<sub>z</sub>) <span class=hat>j</span> + (A<sub>x</sub>B<sub>y</sub> − A<sub>y</sub>B<sub>x</sub>) <span class=hat>k</span><br>|A × B|² + (A·B)² = |A|²|B|²",
      formulaNote:
        "İlk satır, satırları (<span class=hat>i</span>, <span class=hat>j</span>, <span class=hat>k</span>), (A<sub>x</sub>, A<sub>y</sub>, A<sub>z</sub>) ve (B<sub>x</sub>, B<sub>y</sub>, B<sub>z</sub>) olan 3×3 determinantın açılımıdır. İki satırın yeri değişince determinant işaret değiştirir; ters değişme kuralı buradan gelir.",
    },
    {
      heading: "Galileo'nun hız toplaması: yere göre hız bir vektör toplamıdır",
      body: "Tekne suya göre, su da kıyıya göre hareket ediyorsa teknenin kıyıya göre konumu iki konum vektörünün toplamıdır. İki tarafın da zamana göre türevini al: <strong>bağıl hızlar</strong> vektör olarak toplanır. Bu adım, herkesin saatinin aynı işlediğini varsayar; gündelik hızlarda kusursuz çalışır, ışık hızına yaklaşıldığında yerini özel göreliliğin toplama kuralına bırakır. Genişliği w olan nehirde akıntı u kıyıya paralel, teknenin suya göre hızı v ve burnu tam karşıdan akıntıya karşı θ kadar çevrilmiş olsun. Karşıya doğru bileşen v cos θ'dır ve içinde u yoktur: akıntı geçiş süresini değiştirmez, yalnızca tekneyi yana taşır. En kısa süre bu yüzden θ = 0'dadır; sürüklenmeyi sıfırlamak ise v sin θ = u ister ve yalnızca v &gt; u iken mümkündür. Yan rüzgârda uçan uçağın yengeç açısı aynı denklemin başka birimlerle okunuşudur.",
      formula:
        "v<sub>yer</sub> = v<sub>araç/ortam</sub> + u<sub>ortam</sub><br>t = w / (v cos θ),  sürüklenme = (u − v sin θ)·t",
      formulaNote:
        "Sayfanın modeli: noktasal araç, yol boyunca sabit v ve θ, kıyıya paralel ve zamanla değişmeyen akıntı. Gerçek bir nehirde akıntı kıyıya ve derinliğe göre değişir.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmeli bir laboratuvardır ve her sekmenin kendi <strong>Sıfırla</strong> düğmesi vardır. <strong>01 · Toplama ve bileşenler</strong> sekmesinde dört oka kadar vektörü ucundaki halkadan sürükler ya da <strong>Seçili vektör</strong> menüsünden seçip <strong>x bileşeni V<sub>x</sub></strong> ve <strong>y bileşeni V<sub>y</sub></strong> kaydırıcılarıyla (0.1 adım) ayarlarsın; <strong>Büyüklük |V|</strong> ve <strong>Yön açısı θ (°)</strong> kutularına yazıp Enter'a basarsan ok kutupsal olarak kurulur. Tablo bileşkeyi iki ayrı yoldan verir: <em>Bileşenlerden</em> ve yalnız boy, açı ve kosinüs teoremi kullanan <em>Çizimden</em>. <strong>02 · Skaler ve vektörel çarpım</strong> sekmesinde A ve B'nin üçer bileşeni vardır; altındaki <strong>Uygulama</strong> menüsü eğik düzlemde işi ve anahtarda torku hesaplar (g = 9.81 m/s², sürtünme yok). <strong>03 · Bağıl hız</strong> sekmesinde bir tekne akıntıda karşıya geçer; tablo simülasyonun ölçtüğünü kuramın yanına yazar, <strong>Senaryo</strong> menüsü aynı problemi yan rüzgârdaki uçak olarak yeniden etiketler. Sayılar ondalık noktayla ve iki basamakla yazılır; birinci sekmede yön açıları +x ekseninden saat yönünün tersine, 0° ile 360° arasında verilir. Bir uyarı: ilk iki sekmedeki Fark sütunları bir ölçüm hatası değil, aynı niceliği veren iki bağımsız formülün uyuşmasıdır; 0.000 görmen beklenen sonuçtur. Birinci sekmede vektörler birimsizdir; kuvvet için N, yer değiştirme için m diye okuyabilirsin.",
    experiments: [
      {
        title: "3 ile 4 ne zaman 7, 5, 1 eder?",
        predict:
          "Boyları 4 ve 3 olan iki okun bileşkesi en çok ve en az kaç olabilir? B'yi ters çevirip A − B'yi kurarsan |R| değişir mi? Eksenleri 30° döndürmek bileşkenin boyunu etkiler mi?",
        do: "01 sekmesinde “Sıfırla”ya bas ve tabloyu oku. Seçili vektör menüsünden B'yi seç; x bileşenini 3.00, y bileşenini 0.00 yap. “Zıt oklar” düğmesine bas. Yeniden “Sıfırla”, B'yi seç ve “Seçili oku ters çevir (k → −k)” düğmesine bas. Son olarak “Sıfırla”dan sonra Eksenleri döndür φ kaydırıcısını 30°, 37° ve 90° yap; en sonda “Kapalı üçgen”i dene.",
        observe:
          "Açılışta |R| iki sütunda da 5.00, yön 36.87°, farklar 0.000; ilk iki ok arasındaki açı 90.00°, üçgen eşitsizliği kartı 1.00 ≤ 5.00 ≤ 7.00. B = (3, 0) iken |R| = 7.00 ve açı 0.00°; “Zıt oklar”da |R| = 1.00 ve açı 180.00°. Ters çevirince R = (4.00, −3.00), |R| yine 5.00, yön 323.13°. Döndürülmüş eksenlerde bileşenler sırasıyla (4.96, 0.60), (5.00, −0.01) ve (3.00, −4.00) olur; yanındaki kart hep 5.00 · fark 0.000 yazar. “Kapalı üçgen”de |R| = 0.00, yön “tanımsız”.",
        explain:
          "Bileşke aradaki açıya bağlıdır: |R|² = 16 + 9 + 24 cos γ, yani γ = 0°, 90° ve 180° için 7, 5 ve 1. Dik oklarda cos γ = 0 olduğundan B'yi ters çevirmek boyu değiştirmez, yalnız yönü x ekseninin öbür yanına atar. Eksen döndürmede 4 cos 30° + 3 sin 30° = 4.96 ve −4 sin 30° + 3 cos 30° = 0.60; y′ bileşeni tan φ = 3/4, yani φ = 36.87° iken sıfırlanır, kaydırıcı 1° adımlı olduğu için 37°'de −0.01 kalır. Üç ok uç uca kapalı bir üçgen çizdiğinde bileşke sıfır vektörüdür ve yönü yoktur.",
      },
      {
        title: "İki çarpım, iki uç durum",
        predict:
          "A = (4, 1, 0) ve B = (2, 3, 0) için A·B ve |A × B| kaç eder? Oklar dikleştiğinde bu iki sayıdan hangisi sıfırlanır, hangisi en büyük değerini alır? B × A, A × B'den nasıl ayrılır?",
        do: "02 sekmesinde “Sıfırla”ya bas; tablonun üç satırını ve altındaki kartları oku. Sırayla “Dik”, “Paralel” ve “Uzayda” düğmelerine bas. “Uzayda” düzeninde “Sırayı değiştir: B × A'yı çiz” kutusunu işaretle. İstersen “İleri: üçüncü vektör C ve hacim” bölümünü açıp “C'yi ve paralelyüzü çiz” kutusuyla paralelyüzü gör.",
        observe:
          "Açılışta A·B iki sütunda da 11.00, |A×B| = alan 10.00; hacim satırı, altında yazan C = (1.00, 1.00, 3.00) ile 30.00; farklar 0.000. Açı 42.27° · cos θ = 0.740, A × B = (0.00, 0.00, 10.00), yön “+z: ekrandan sana doğru”. “Dik”te A·B = 0.00, alan 13.00; “Paralel”de A·B = 10.00, alan 0.00 ve yön “tanımsız (A × B = 0)”. “Uzayda” A·B = 3.00, A × B = (−5.00, −4.00, 7.00), |A×B| = 9.49, θ = 72.45°, hacim 12.00 verir; kutuyu işaretleyince B × A = (5.00, 4.00, −7.00) çizilir.",
        explain:
          "Bileşenlerden: 4·2 + 1·3 = 11 ve 4·3 − 1·2 = 10. İki sayı birbirine bağlıdır: 11² + 10² = 221 = |A|²|B|² = 17 × 13. Dik oklarda cos θ = 0 skaler çarpımı siler, sin θ = 1 alanı en büyük değerine, |A||B| = 13'e çıkarır; paralel oklarda roller değişir. Sıra değişince her bileşen işaret değiştirir, büyüklük aynı kalır. Açılıştaki hacim, taban alanı 10 ile C'nin tabana dik yüksekliği C<sub>z</sub> = 3'ün çarpımıdır. Geometriden sütunu bu sonuçlara bileşen formüllerini kullanmadan, köşegenlerden ölçülen açı ve çokgen alanıyla varır.",
      },
      {
        title: "İş ve tork: aynı açının iki ayrı rolü",
        predict:
          "Eğik düzlemde 50 N'luk çekme kuvvetini yüzeye paralel tutmak yerine 20° yukarı kaldırırsan yaptığı iş artar mı, azalır mı? Anahtara kuvveti 90° yerine 30° ile uygularsan tork kaça iner?",
        do: "02 sekmesinin altında Uygulama menüsünde “İş: eğik düzlemde çekilen blok” seçiliyken “Uygulamayı sıfırla”ya bas ve tabloyu oku. F'nin yüzeyle açısı β kaydırıcısını 0°, sonra 60° yap. Ardından menüden “Tork: anahtarla cıvata sıkmak”ı seç; r'den F'ye açı φ kaydırıcısını 90°, 30°, 0° ve −90° yap.",
        observe:
          "β = 20° iken W<sub>F</sub> iki sütunda da 187.94 J, W<sub>g</sub> = −98.10 J, ölçülen ΔK = 89.84 J ve W<sub>net</sub> = 89.84 J; durum satırına göre blok 1.33 s sonra 5.99 m/s hızla yolun sonundadır. β = 0°'de W<sub>F</sub> = 200.00 J, ΔK = 101.90 J. β = 60°'de W<sub>F</sub> = 100.00 J'e düşer, ama sayfa bloğun yüzeyden kalktığını söyler ve ΔK yerine “—” yazar. Torkta φ = 90° için 20.00 N·m; 30° için 10.00 N·m ve moment kolu 0.125 m; 0° için 0.00, “cıvata dönmez”; −90° için −20.00 N·m.",
        explain:
          "İş bir skaler çarpımdır: W<sub>F</sub> = F d cos β = 50 N × 4 m × cos 20° = 187.94 J. Yerçekimi yola geniş açıyla baktığı için negatif iş yapar: −m g d sin α = −98.10 J; yola dik olan normal kuvvetin işi sıfırdır. Toplam iş, sayfanın hareketi adım adım izleyerek ölçtüğü ΔK'ye eşittir. β = 60°'de kuvvetin yüzeye dik bileşeni 43.30 N, ağırlığınki 42.48 N'dur: blok havalanır, model geçersizleşir. Tork ise vektörel çarpımdır: τ = r F sin φ = 0.25 m × 80 N × sin 30° = 10.00 N·m. Kosinüs işte paralel bileşeni, sinüs torkta dik bileşeni seçer.",
      },
      {
        title: "Karşıya geçmek: en hızlı mı, en doğru mu?",
        predict:
          "Nehir 100 m, akıntı 3 m/s, teknen suya göre 5 m/s. En çabuk geçmek için burnu tam karşıya mı tutmalısın, akıntıya karşı mı çevirmelisin? Tam karşıdaki B noktasına çıkmak kaç saniyeye mal olur? Akıntı tekneden hızlıysa B'ye çıkabilir misin?",
        do: "03 sekmesinde “Sıfırla”ya, sonra “Sonuca atla”ya bas. “En az sürüklenme rotası” düğmesine ve yine “Sonuca atla”ya bas. Şimdi Akıntı hızı u'yu 5.0 m/s, Teknenin suya göre hızı v'yi 3.0 m/s yap; “En kısa süre rotası” ve “En az sürüklenme rotası”nı sırayla dene, her birinden sonra “Sonuca atla”ya bas. Sonra “θ'yı yazarak gir” kutusuna 60 yazıp Enter'a ve “Sonuca atla”ya bas. Son olarak “Sıfırla”ya bas, Ortamın hız dağılımı menüsünden “Kıyıda 0, ortada 1.5u (ortalaması u)” seçeneğini seç ve yine “Sonuca atla”ya bas.",
        observe:
          "θ = 0.00° iken süre iki sütunda da 20.00 s, sürüklenme 60.00 m, yer hızı 5.83 m/s, iz açısı 30.96°, yol 116.62 m. θ = 36.87° iken süre 25.00 s, sürüklenme 0.00 m, yer hızı 4.00 m/s. Kuram ile tarama aynı açıları bulur. u = 5, v = 3 yapınca en kısa süre 33.33 s ve sürüklenme 166.67 m; en az sürüklenme satırı 36.87° · 133.33 m yazar ve o rotada geçiş 41.67 s sürer. θ = 60° yazınca sürüklenme 160.13 m'ye geri büyür. Parabolik dağılımda iz S biçiminde eğrilir, yol 119.06 m'ye uzar, süre ve sürüklenme aynı kalır.",
        explain:
          "Karşıya doğru hız v cos θ'dır; θ = 0'da en büyüktür ve akıntıya bağlı değildir. Sürüklenmeyi sıfırlamak için sin θ = u/v = 3/5 gerekir; karşıya doğru hız 5 × 0.8 = 4 m/s'ye iner ve geçiş 25 s sürer: 3-4-5 üçgeni bu kez hızlarla kurulmuştur. Düğme kesin açıyı 0.01°'ye yuvarlar; durum satırı bu yüzden “gösterilen duyarlıkta 0.00 m” der. Akıntı tekneden hızlıysa v sin θ hiçbir açıda u'ya yetişemez; en iyi açı sin θ = v/u'yu sağlar, burnu daha çok çevirmek sürüklenmeyi yeniden büyütür. Parabolik dağılımda tekne her şeritte eşit süre kaldığı için sürüklenme yalnız akıntının ortalamasına bağlıdır.",
      },
    ],
  },
  wow: [
    {
      title: "Yıldızlar da şemsiye eğdirir",
      body: "Aralık 1725'te Gamma Draconis yıldızını izlemeye başlayan James Bradley, yıldızın eylülden marta 40 yay saniyesi kadar güneye kayıp sonra geri döndüğünü gördü; aranan paralaks bu deseni veremezdi. 1728'de açıklamayı buldu: Dünya yörüngesinde saniyede yaklaşık 30 km hızla koşarken yıldız ışığı, yağmur gibi, biraz önden geliyormuş gibi görünür. Sapma en fazla v/c ≈ 30/300 000 = 10⁻⁴ radyan, yani yaklaşık 20.6 yay saniyesidir (ölçülen değer 20.5″): 200 m öteden bakılan 2 cm'lik bir düğme kadar. Bradley bundan ışık hızını da hesapladı. Thames'te bir teknenin flamasından esinlendiği anlatılır; ama bu öykü Bradley'nin kendi anlatımında geçmez.",
    },
    {
      title: "Yatay atılan ile bırakılan aynı anda düşer",
      body: "Galileo, 1638'de yayımlanan <em>İki Yeni Bilim</em>'de atılan bir cismin hareketini iki bağımsız parçaya ayırdı: yatayda sabit hız, düşeyde düzgün hızlanan düşüş. Sonuç sezgiye aykırıdır: 1.25 m yüksekliğindeki bir masadan 3 m/s hızla yuvarlanan bilye ile aynı anda masa kenarından bırakılan bilye, hava direnci ihmal edilirse yere aynı anda, yaklaşık 0.50 saniyede çarpar. İlki 1.5 m ileriye düşer, ama düşey bileşen yatay hızdan habersizdir.",
    },
    {
      title: "Kuaterniyonların rövanşı",
      body: "Vektör tartışmasını kaybeden kuaterniyonlar, üç boyutlu dönmede geri döndü. Bir cismin yönelimini üç açıyla, iç içe dönen üç halka (gimbal) gibi saklamak, bazı konumlarda bir dönme serbestliğinin kaybolduğu <strong>gimbal kilidine</strong> yol açabilir. Apollo 11'in yön ölçüm biriminde bu risk vardı; Ay modülü indikten sonra Michael Collins 'Bana Noel için dördüncü bir gimbal göndermeye ne dersiniz?' diye şaka yaptı. Kuaterniyonlar bu tuzağa düşmez ve iki yönelim arasında pürüzsüz geçiş sağlar. 1996 yapımı <em>Tomb Raider</em>, akıcı 3B dönme için kuaterniyon kullanan ilk kitlesel bilgisayar oyunu olarak sıkça anılır.",
    },
  ],
  worked: {
    title: "Akıntı senden hızlıysa: en az sürüklenme rotası",
    prompt:
      "Genişliği w = 100 m olan bir nehirde akıntı her yerde u = 5 m/s. Teknenin suya göre hızı v = 3 m/s; burnu, tam karşı yönden akıntıya karşı θ kadar çevrili ve yol boyunca sabit. (a) Geçiş süresini ve sürüklenmeyi θ'nın fonksiyonu olarak yaz. (b) En kısa süreyi veren rotayı bul. (c) Tam karşıya çıkmak olanaksız olduğuna göre, karşı kıyıda en az sürüklenmeyi veren θ'yı türev alarak bul ve o rotadaki süreyi hesapla.",
    steps: [
      "Eksenleri seç: x akıntı yönünde, y karşı kıyıya doğru. Yere göre hız iki vektörün toplamıdır: suya göre hız (−v sin θ, v cos θ) ile akıntı (u, 0). Bileşenleri v<sub>x</sub> = u − v sin θ ve v<sub>y</sub> = v cos θ. Geçiş yalnız y bileşenine bağlıdır: t(θ) = w/(v cos θ). Sürüklenme x(θ) = v<sub>x</sub>·t = w (u − v sin θ)/(v cos θ).",
      "En kısa süre: t(θ) paydadaki cos θ en büyükken en küçüktür, yani θ = 0. t = 100 m / 3 m/s = 33.33 s; bu sürede akıntı tekneyi x = 5 m/s × 33.33 s = 166.67 m aşağı taşır.",
      "En az sürüklenme: x(θ)'nın türevini al. d/dθ [(u − v sin θ)/cos θ] = (−v cos²θ + u sin θ − v sin²θ)/cos²θ = (u sin θ − v)/cos²θ. Demek ki dx/dθ = (w/v)(u sin θ − v)/cos²θ. Türev sin θ = v/u = 3/5 iken sıfırdır: θ = 36.87°. Daha küçük açılarda türev negatif, daha büyük açılarda pozitiftir; bulunan nokta bir minimumdur.",
      "Değerleri yerine koy: cos θ = 0.8 olduğundan t = 100 m / (3 m/s × 0.8) = 41.67 s. x = 100 m × (5 − 3 × 0.6)/(3 × 0.8) = 100 m × 3.2/2.4 = 133.33 m. Kapalı biçimi x = w √(u² − v²)/v = 100 m × 4/3'tür.",
      "Geometrik denetim: bu rotada yere göre hız (3.2, 2.4) m/s, suya göre hız (−1.8, 2.4) m/s'dir. Skaler çarpımları −5.76 + 5.76 = 0: en iyi rotada tekne, suya göre hızını yere göre hızına dik tutar. Yere göre hızın büyüklüğü √(3.2² + 2.4²) = 4.00 m/s. Sayfada 03 sekmesinde u = 5.0, v = 3.0 yapıp “En az sürüklenme rotası” ve “Sonuca atla”ya basarsan 41.67 s, 133.33 m ve 4.00 m/s'yi okursun; θ = 20° için 140.97 m, θ = 60° için 160.13 m çıkar, ikisi de daha kötüdür.",
    ],
    result:
      "En kısa süre θ = 0'da 33.33 s'dir ve 166.67 m sürüklenmeye mal olur. En az sürüklenme sin θ = v/u = 0.6, yani θ = 36.87° ile 133.33 m'dir ve geçiş 41.67 s sürer. Aradaki 33 metrelik kazancın bedeli 8 saniyeden biraz fazladır: hangi rotanın “en iyi” olduğu neyi en aza indirmek istediğine bağlıdır.",
  },
  misconceptions: [
    {
      myth: "3 N ile 4 N'luk iki kuvvetin bileşkesi 7 N'dur.",
      truth:
        "7 N yalnızca iki kuvvet aynı yöndeyse doğrudur. Zıt yöndeyseler 1 N, dik iseler 5 N olur; ara açılarda sonuç 1 ile 7 N arasında herhangi bir değer alabilir. Sayfanın üçgen eşitsizliği kartı bu iki sınırı her an gösterir: 1.00 ≤ |R| ≤ 7.00. Büyüklükler ancak aynı yönlü vektörlerde doğrudan toplanır.",
    },
    {
      myth: "Bileşkenin yönü her zaman θ = arctan(R<sub>y</sub>/R<sub>x</sub>) ile bulunur.",
      truth:
        "arctan yalnızca −90° ile 90° arasında değer döndürür; (2, 2) ile (−2, −2) için aynı 45°'yi verir. İkincisinin gerçek yönü 225°'dir. Bileşenlerin işaretine bakıp okun hangi çeyrekte olduğunu belirlemek ya da iki işareti birlikte kullanan atan2 fonksiyonunu kullanmak gerekir. Sayfada Vektör sayısını 1 yapıp A'yı (−2, −2)'ye getir: yön 225.00° yazar.",
    },
    {
      myth: "Bileşenler bir vektörün değişmez kimliğidir.",
      truth:
        "Bileşenler eksen seçimine bağlıdır; boy ve iki vektör arasındaki açı bağlı değildir. Açılış değerlerinde Eksenleri döndür φ kaydırıcısını 90° yap: R'nin bileşenleri (4.00, 3.00)'ten (3.00, −4.00)'e değişir, büyüklük 5.00 kalır. Skaler çarpım da böyle bir değişmezdir; iki ok birlikte döndürülünce A·B kıpırdamaz.",
    },
    {
      myth: "Karşı kıyıya en kısa yoldan gitmek, en çabuk geçmektir.",
      truth:
        "Sayfanın açılış değerlerinde tam karşıya çıkan rota 100 m'lik en kısa yoldur ama 25.00 s sürer; burnu tam karşıya tutan tekne 116.62 m yol alır ve 20.00 s'de geçer. Burnu akıntıya karşı çevirmek, hızın bir kısmını akıntıyı karşılamaya harcar ve karşıya doğru bileşeni v cos θ'ya düşürür.",
    },
  ],
  glossary: [
    {
      term: "Skaler",
      definition:
        "Yalnızca büyüklüğü olan, tek bir sayı ve birimle tam söylenen nicelik; kütle, sıcaklık ve süre gibi.",
    },
    {
      term: "Vektör",
      definition:
        "Büyüklüğü ve yönü birlikte olan, uç uca eklenerek toplanan nicelik; yer değiştirme, hız ve kuvvet gibi.",
    },
    {
      term: "Bileşen",
      definition:
        "Vektörün seçilen bir eksen boyunca payı, örneğin A<sub>x</sub> = |A| cos θ; değeri eksen seçimine bağlıdır.",
    },
    {
      term: "Bileşke",
      definition:
        "Birden çok vektörün toplamı; hepsinin yerine tek başına aynı etkiyi yapan vektör.",
    },
    {
      term: "Birim vektör",
      definition:
        "Boyu tam 1 olan, yalnızca yön bildiren vektör; sıfırdan farklı her A için A/|A| ile bulunur.",
    },
    {
      term: "Skaler çarpım (A·B)",
      definition:
        "İki vektörden |A||B| cos θ sayısını üreten çarpım; dik vektörler için sıfırdır.",
    },
    {
      term: "Vektörel çarpım (A × B)",
      definition:
        "İki vektöre de dik, büyüklüğü gerdikleri paralelkenarın alanına eşit, yönü sağ el kuralıyla belirlenen vektör.",
    },
    {
      term: "Bağıl hız",
      definition:
        "Bir cismin seçilen bir gözlemciye ya da ortama göre hızı; yere göre hız, ortama göre hız ile ortamın hızının vektör toplamıdır.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki üç araç, <strong>Fizik I</strong> dersinin neredeyse her haftasında yeniden karşına çıkar: kuvvetler bileşenlerine ayrılır, iş bir skaler çarpımdır, tork ve açısal momentum birer vektörel çarpımdır, bağıl hız ise eylemsiz gözlemciler arasındaki Galileo dönüşümünün ilk örneğidir. <strong>Lineer Cebir</strong> dersinde tanım tersine döner: toplanabilen ve bir sayıyla çarpılabilen, bu işlemler belirli kurallara uyan her şey bir vektördür. Polinomlar, ses sinyalleri, üç sayıyla yazılan renkler, bir fotoğrafın milyonlarca pikseli birer <strong>vektör uzayının</strong> elemanıdır; skaler çarpım da uzunluk ve açı kavramlarını bu uzaylara taşıyan <strong>iç çarpıma</strong> genelleşir. Eksenleri döndürünce bileşenleri değiştiren iki satırlık kural bir dönme matrisidir, paralelyüzün hacmini veren üçlü çarpım ise 3×3 determinantın ta kendisidir.",
      "Bir adım ötede, <strong>çok değişkenli kalkülüste</strong> uzayın her noktasına bir ok iliştirilir: rüzgâr haritaları, elektrik ve manyetik alanlar birer <strong>vektör alanıdır</strong>. Heaviside'ın vektör diliyle yazdığı Maxwell denklemleri, bu alanların nasıl değiştiğini dört satırda anlatır; gradyan da en dik yükseliş yönünü gösteren bir vektördür. Yapay zekâda sözcükler ve görüntüler yüzlerce boyutlu vektörlerle temsil edilir; iki sözcüğün anlamca ne kadar yakın olduğu, sayfadaki cos θ okumasının yüksek boyutlu karşılığıyla, yani iki vektörün skaler çarpımının boylarının çarpımına oranıyla ölçülür.",
    ],
    topics: [
      "Vektör uzayları ve tabanlar",
      "İç çarpım uzayları",
      "Determinant ve yönlü hacim",
      "Dönme matrisleri",
      "Galileo dönüşümü ve eylemsiz çerçeveler",
      "Vektör alanları ve gradyan",
      "Kuaterniyonlar ve 3B dönme",
    ],
  },
  quiz: [
    {
      question:
        "Büyüklükleri 5 N, 3 N ve 1 N olan üç kuvvet, yönleri dilediğin gibi seçilerek dengeye getirilebilir mi?",
      options: [
        "Evet; uygun açılarla bileşke her zaman sıfırlanabilir",
        "Hayır; bileşke en az 1 N olur",
        "Hayır; bileşke en az 3 N olur",
        "Evet; ama yalnızca üçü aynı doğru üzerindeyse",
      ],
      answer: 1,
      explanation:
        "Dengede üç ok uç uca kapalı bir üçgen çizmelidir; bunun için en uzun kenar öbür ikisinin toplamını aşmamalıdır. Burada 5 &gt; 3 + 1 olduğundan üçgen kapanmaz: iki kısa ok, uzun okun tam karşısına dizilse bile 5 − 4 = 1 N artar. Sayfada A = (5, 0), B = (−3, 0), C = (−1, 0) kurarsan üçgen eşitsizliği kartı 1.00 ≤ 1.00 ≤ 9.00 yazar; alt sınır sıfır olmadıkça denge olanaksızdır.",
    },
    {
      question:
        "Açılış değerlerinde A·B = 11.00, |A × B| = 10.00 ve θ = 42.27°. A'nın boyunu 2, B'nin boyunu 3 katına çıkarırsan (yönler aynı kalsın) bu üç okuma ne olur?",
      options: [
        "A·B = 16, |A × B| = 15, θ = 42.27°",
        "A·B = 66, |A × B| = 10, θ = 42.27°",
        "A·B = 66, |A × B| = 60, θ = 42.27°",
        "A·B = 66, |A × B| = 60, θ = 84.54°",
      ],
      answer: 2,
      explanation:
        "İki çarpım da her çarpana göre doğrusaldır: (2A)·(3B) = 6 A·B = 66 ve |(2A) × (3B)| = 6 |A × B| = 60. Açı ise boylardan bağımsızdır; tan θ = |A × B|/(A·B) = 60/66 = 10/11 oranı değişmez, θ = 42.27° kalır. Boyları eklemek yerine çarpmak gerektiğini alan sezgisi de söyler: kenarları 2 ve 3 kat uzayan paralelkenarın alanı 6 katına çıkar.",
    },
    {
      question:
        "Nehir 100 m genişliğinde, tekne suya göre 5 m/s hızla ve burnu tam karşıya dönük (θ = 0) gidiyor. Akıntı 2 m/s'den 4 m/s'ye çıkarsa geçiş süresi ve sürüklenme nasıl değişir?",
      options: [
        "Süre 20 s kalır, sürüklenme 40 m'den 80 m'ye çıkar",
        "Süre iki katına çıkar, sürüklenme aynı kalır",
        "Süre de sürüklenme de iki katına çıkar",
        "Süre kısalır, çünkü teknenin yere göre hızı artar",
      ],
      answer: 0,
      explanation:
        "Hareketin iki bileşeni birbirinden bağımsızdır. Karşıya doğru hız v cos θ = 5 m/s'dir ve akıntıyı içermez: t = 100/5 = 20 s. Akıntı yalnızca kıyıya paralel bileşeni belirler: sürüklenme u·t, yani 2 × 20 = 40 m'den 4 × 20 = 80 m'ye çıkar. Yere göre hız gerçekten artar (5.39 m/s'den 6.40 m/s'ye), ama artan kısım karşıya değil yana doğrudur; yol uzar, süre uzamaz.",
    },
  ],
  next: [
    {
      href: "newton-hareket-yasalari.html",
      title: "Newton'un Hareket Yasaları: Kuvvet, Kütle ve İvme",
      why: "ΣF = ma bir vektör denklemidir. Üç sekmede bir bloğu sürtünmeye karşı iter, bir arabayı asılı kütleyle çeker, iki arabayı yayla ayırırsın; her birinde ölçülen ivme kuramın yanında durur.",
    },
    {
      href: "atislar.html",
      title: "Eğik Atış: Hava Direnci ve En İyi Açı",
      why: "Bağımsız bileşenler iş başında: ilk hız yatay ve düşey paylara ayrılır. Oradaki açı taraması, buradaki dümen açısı taramasının kardeşidir; boşlukta yerden atışta en iyi açı 45°, havada daha azdır.",
    },
    {
      href: "tork-denge.html",
      title: "Tork ve Denge: Kaldıraç, Ağırlık Merkezi ve Statik",
      why: "Anahtardaki r × F'yi kaldıraca, iki destekli kirişe ve duvara dayalı merdivene taşı. İşaret kuralı aynıdır: saat yönünün tersine dönme pozitif.",
    },
    {
      href: "is-enerji.html",
      title: "İş, Enerji ve Güç Laboratuvarı",
      why: "Buradaki eğik düzleme sürtünmeyi ekle: Kaykay pistinde yerçekiminin işinin ne kadarının kinetik enerjiye, ne kadarının ısıya gittiğini çubuklarda izle; İş ve kuvvet–yol sekmesinde yalnız F cos θ bileşeninin iş yaptığını ölç.",
    },
  ],
  sources: [
    {
      title:
        "OpenStax · University Physics Vol. 1, 2.2 Coordinate Systems and Components of a Vector",
      url: "https://openstax.org/books/university-physics-volume-1/pages/2-2-coordinate-systems-and-components-of-a-vector",
      note: "Bileşenler, birim vektörler, büyüklük ve yön açısı; çözümlü örneklerle (İngilizce, açık ders kitabı).",
    },
    {
      title:
        "OpenStax · University Physics Vol. 1, 2.4 Products of Vectors",
      url: "https://openstax.org/books/university-physics-volume-1/pages/2-4-products-of-vectors",
      note: "Skaler ve vektörel çarpımın tanımları, bileşen formülleri; iş ve tork örnekleri (İngilizce).",
    },
    {
      title:
        "OpenStax · University Physics Vol. 1, 4.5 Relative Motion in One and Two Dimensions",
      url: "https://openstax.org/books/university-physics-volume-1/pages/4-5-relative-motion-in-one-and-two-dimensions",
      note: "İki boyutta bağıl hız ve hızların vektör toplamı; rüzgârda uçan uçak örneği (İngilizce).",
    },
    {
      title: "Wikipedia · Euclidean vector",
      url: "https://en.wikipedia.org/wiki/Euclidean_vector",
      note: "Tarihçe bölümü: Bellavitis, Hamilton, Grassmann, Gibbs ve Wilson; sözcüğün kökeni (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
