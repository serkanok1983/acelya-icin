window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["vektorler"] = {
  slug: "vektorler",
  title: "Vektörler: Yönü Olan Sayıların Aritmetiği",
  field: "Matematik",
  level: "Lise",
  minutes: 30,
  tagline:
    "3 + 4 her zaman 7 etmez: yönü olan nicelikler uç uca eklenir, sonucu aradaki açı belirler. Stevin'in top zincirinden Hamilton'ın köprüsüne ve rüzgârda yan yan uçan uçağa, okların aritmetiği.",
  hook: "3 adım kuzeye, ardından 4 adım doğuya yürü. Toplam 7 adım attın, ama başladığın yerden yalnızca 5 adım uzaktasın. Aynı iki yürüyüş, adımları hangi yönlere attığına göre 1 ile 7 arasındaki her sonucu verebilir. 3 + 4'ün kaç ettiği nereye baktığına bağlıysa, bu toplamanın kuralı ne?",
  bigIdea:
    "Vektörler boyları toplanarak değil <strong>uç uca eklenerek</strong> toplanır; sayılarla bu, bileşen bileşen toplamak demektir, <em>A + B = (Aₓ + Bₓ, Aᵧ + Bᵧ)</em>, ve toplamın boyunu iki ok arasındaki açı belirler.",
  story: [
    "Yönlü nicelikleri toplama kuralı, kendi adından çok daha yaşlıdır. Aristoteles'e atfedilen ama büyük olasılıkla onun okulundan birinin yazdığı <em>Mekanik Problemler</em>'de, iki hareketi aynı anda yapan bir noktanın bir paralelkenarın köşegeni boyunca gittiği fikri vardır. 1586'da Flaman mühendis Simon Stevin, üçgen bir prizmanın üzerine dolanmış, eşit aralıklı toplardan oluşan kapalı bir zincir çizdi ve bununla bir düşünce deneyi kurdu: zincir kendiliğinden kaymaya başlasaydı sonsuza dek dönerdi; bu olanaksız olduğuna göre dengededir. Buradan, eğik düzlemdeki bir ağırlığın ne kadarının yokuş aşağı çektiğini çıkardı. Sloganı bu buluşa çok yakışır: 'Wonder en is gheen wonder', yani mucize gibi ama mucize değil. 1687'de Newton, <em>Principia</em>'da hareket yasalarının hemen ardından gelen ilk sonuçta kuralı açıkça yazdı: aynı anda iki kuvvetin etkisindeki bir cisim, kuvvetler ayrı ayrı uygulansaydı çizeceği kenarlardan oluşan paralelkenarın köşegenini aynı sürede kateder.",
    "Yine de 19. yüzyılın ortasına kadar bugünkü anlamıyla 'vektör' diye bir sözcük yoktu. İrlandalı matematikçi William Rowan Hamilton, karmaşık sayılarla düzlemdeki noktaları çarpabildiği gibi uzaydaki noktaları da çarpmak istiyordu. Sonradan oğluna yazdığı mektuba göre, 1843 Ekim'inin ilk günlerinde çocukları her sabah kahvaltıda 'Babacığım, üçlüleri çarpabiliyor musun?' diye sorar, o da üzgün bir baş sallayışla 'Hayır, onları yalnızca toplayıp çıkarabiliyorum' derdi. 16 Ekim 1843'te eşiyle Dublin'de Kraliyet Kanalı boyunca yürürken cevap aklına geldi: üçlüler değil, dörtlüler. Temel kuralı, <em>i² = j² = k² = ijk = −1</em>, Brougham (bugünkü Broom) Köprüsü'nün bir taşına kazıdı. Kazıdan iz kalmadı ama köprüde bugün bir plaket var. Hamilton bu dörtlülere <strong>kuaterniyon</strong> dedi; üç parçalı kısmına Latincede 'taşıyıcı' anlamına gelen <em>vector</em>, tek sayılık kısmına <em>scalar</em> adını verdi.",
    "Kuaterniyonlar güçlüydü ama hantaldı. 1880'lerde iki kişi birbirinden bağımsız olarak aynı ameliyatı yaptı: Yale'de Josiah Willard Gibbs ve 16 yaşında okulu bırakmak zorunda kalıp telgrafçı olarak çalışmış, kendi kendini yetiştirmiş İngiliz Oliver Heaviside. İkisi de kuaterniyonun vektör kısmını kesip ayırdı ve iki ayrı çarpım tanımladı: bugün nokta (·) ve çarpı (×) dediğimiz çarpımlar. Gibbs <em>Elements of Vector Analysis</em>'in ilk yarısını 1881'de öğrencileri için bastırdı; Heaviside 1884'te Maxwell'in onlarca denklemlik elektromanyetizmasını bugün ders kitaplarında gördüğümüz dört vektör denklemine indirdi. Kuaterniyon taraftarlarıyla sert bir tartışma koptu; Heaviside, kendi ihtiyacı olan vektör hesabı için kuaterniyonun 'yalnızca gereksiz değil, küçümsenemeyecek boyutta bir kötülük' olduğunu yazdı. 1901'de Edwin Bidwell Wilson'ın Gibbs'in derslerinden derlediği <em>Vector Analysis</em>, vektör hesabını kuaterniyonlara dayanmadan, kendi başına ayakta duran bir sistem olarak kurdu; bugün kullandığımız gösterim büyük ölçüde bu çizgiden gelir.",
  ],
  core: [
    {
      heading: "Ok: büyüklük artı yön",
      body: "Kütle, sıcaklık, süre tek bir sayı ve birimle tam söylenir; bunlara <strong>skaler</strong> denir. Ama 'beş kilometre yürüdüm' dersen nereye vardığını bilemem; yön eksik. <strong>Vektör</strong>, büyüklüğü ve yönü birlikte taşıyan niceliktir ve ok olarak çizilir: okun boyu büyüklük, ucu yön. Ok kâğıtta nereye kaydırılırsa kaydırılsın, boyu ve yönü aynı kaldıkça aynı vektördür. Sayfada üç ok da beyaz başlangıç noktasından çıkar; bu bir çizim tercihidir, vektörün zorunluluğu değil.",
      formula: "A = (|A|, θ)  ⟷  A = (A<sub>x</sub>, A<sub>y</sub>)",
      formulaNote:
        "Aynı ok iki dilde yazılır: boy ve açı ya da iki bileşen. Sayfanın kaydırıcıları birinci dili, üstteki okuma ikinci dili konuşur.",
    },
    {
      heading: "Bileşenler: oku eksenlere düşür",
      body: "Bir okun iki gölgesini düşün. Işığı y eksenine paralel, tepeden düşürürsen okun x eksenine düşen gölgesi <strong>x bileşenidir</strong>; ışığı x eksenine paralel, yandan düşürürsen y eksenine düşen gölge <strong>y bileşenidir</strong>. Kural tek: ışık, gölgenin düştüğü eksene her seferinde dik gelir. Açı, sağı gösteren x ekseninden saat yönünün tersine ölçülür. Sayfanın açılış değerinde A, 30°'de 3.0 birimdir: bileşenleri (2.60, 1.50). B ise 120°'de 2.0 birimdir: (−1.00, 1.73). B'nin x bileşeni negatif, çünkü ok sola eğiliyor; işaret, yönün bir parçasıdır.",
      formula: "A<sub>x</sub> = |A|·cos θ,  A<sub>y</sub> = |A|·sin θ",
      formulaNote:
        "Geri dönüş Pisagor'la: |A| = √(Aₓ² + Aᵧ²). Okumadaki yuvarlanmış sayılarla 2.60² + 1.50² = 9.01 ≈ 3.0².",
    },
    {
      heading: "Toplama: uç uca ekle",
      body: "İki vektörü toplamak için ikincisinin kuyruğunu birincinin ucuna taşı; başlangıçtan son uca çizilen ok toplamdır. Buna <strong>bileşke</strong> denir. Sayfadaki kesikli çizgi tam olarak budur: B'nin, A'nın ucuna taşınmış hâli; açık yeşil ok da başlangıçtan oraya uzanır. Aynı şeyi sayılarla yapmak daha kolaydır: x'leri kendi aralarında, y'leri kendi aralarında topla. Önce B sonra A yürüsen de aynı köşeye varırsın; iki yol bir paralelkenar oluşturur, bileşke onun köşegenidir.",
      formula:
        "A + B = (A<sub>x</sub> + B<sub>x</sub>, A<sub>y</sub> + B<sub>y</sub>)",
      formulaNote:
        "Açılış değerleriyle (2.60 − 1.00, 1.50 + 1.73) = (1.60, 3.23). Sıra önemsizdir: A + B = B + A.",
    },
    {
      heading: "Aradaki açı her şeydir",
      body: "Boyları sabit iki ok, aralarındaki açıya göre çok farklı toplamlar verir. Aynı yöndeyseler boylar toplanır, zıt yöndeyseler çıkarılır, dik iseler Pisagor devreye girer. Arası <strong>kosinüs teoremiyle</strong> doldurulur. Şaşırtıcı bir sonucu var: 3 birimlik bir oka 2 birimlik bir ok eklemek, aradaki açı yaklaşık 109.5°'yi geçince toplamı 3'ün altına düşürür; 138.6°'den sonra bileşke iki oktan da kısadır. Ne olursa olsun bileşkenin boyu ||A| − |B|| ile |A| + |B| arasında kalır.",
      formula: "|A + B|² = |A|² + |B|² + 2|A||B|·cos φ",
      formulaNote:
        "φ, iki ok arasındaki açı. φ = 0° → |A| + |B|; φ = 90° → √(|A|² + |B|²); φ = 180° → ||A| − |B||.",
    },
    {
      heading: "Çıkarma: ters oku ekle",
      body: "<strong>Ters vektör</strong> −B, B ile aynı boyda ama tam zıt yöndedir: açısına 180° eklenmiş B. Vektör çıkarmanın tek sırrı budur: A − B, A'ya −B eklemektir. Geometride A − B, B'nin ucundan A'nın ucuna giden oktur; 'B'den A'ya nasıl giderim?' sorusunun cevabı. Yağmurda koşarken şemsiyeyi öne eğmen de bir çıkarmadır: sana göre yağmurun hızı, yağmurun hızı eksi senin hızındır. Bir vektörü kendi tersiyle toplarsan boyu sıfır, yönü tanımsız olan <strong>sıfır vektörü</strong> bulursun.",
      formula: "A − B = A + (−B),  −B: |B| aynı, açı θ<sub>B</sub> + 180°",
      formulaNote:
        "Sayfada çıkarma düğmesi yok; B'nin açı kaydırıcısını 180° çevirmek aynı işi görür: 120° → 300°, 200° → 20°.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört kaydırıcı var, ikişer ikişer. Mavi <strong>A</strong> satırında üstteki kaydırıcı <strong>|A|</strong> büyüklüğünü 0.5 ile 5.0 arasında 0.1 adımla, alttaki <strong>açı</strong> kaydırıcısı yönü 0° ile 360° arasında 1° adımla ayarlar; turuncu <strong>B</strong> satırı aynı biçimde çalışır. Açılışta A = 3.0 ve 30°, B = 2.0 ve 120°'dir. Üstteki okuma A'nın, B'nin ve A + B'nin bileşenlerini, <strong>|A+B|</strong>'yi ve bileşkenin açısı <strong>θ</strong>'yı verir. Okuma θ'yı −180° ile 180° arasında yazar, kaydırıcılar ise 0°–360° diliyle konuşur: okumadaki −90° ile kaydırıcıdaki 270° aynı yöndür. Toplam sıfır olduğunda θ'nın gösterdiği sayı anlamsızdır. Tuvalde ızgaranın her karesi 1 birimdir; açık yeşil ok A + B, ok ucu olmayan kesikli çizgi B'nin A'nın ucuna taşınmış hâlidir. Sayfa yalnızca toplar; çıkarmayı 4. deneydeki numarayla yaparsın. Başlangıç noktası sol alt köşeye yakın olduğu için sola ya da aşağı yaklaşık 2.9 birimden uzun uzanan oklar çerçeveden taşar; sayılar yine doğrudur.",
    experiments: [
      {
        title: "Açılış ekranındaki gizli dik üçgen",
        predict:
          "Sayfa açıldığında |A| = 3.0 ve |B| = 2.0. |A+B| için 5 mi dersin, 1 mi, arada bir yer mi? Açılar 30° ve 120°: bu iki ok arasında kaç derece var?",
        do: "Hiçbir kaydırıcıya dokunmadan üstteki iki satırı oku. Sonra kendi hesabını yap: aradaki açı 120° − 30° = 90° ise Pisagor ne der? Bileşkenin A'dan ne kadar saptığını arctan ile tahmin et.",
        observe:
          "A = (2.60, 1.50), B = (−1.00, 1.73), A + B = (1.60, 3.23), |A+B| = 3.61, θ ≈ 64°. Yeşil ok iki okun tam ortasında değil; uzun olan A'ya daha yakın.",
        explain:
          "Oklar dik olduğu için |A+B| = √(3² + 2²) = √13 ≈ 3.61. Bileşke A'dan arctan(2/3) ≈ 33.7° sapar; 30°'ye eklenince 63.7° ≈ 64°. Uzun vektör, toplamın yönünü kendine doğru çeker.",
      },
      {
        title: "Bir ok eklemek toplamı kısaltabilir mi?",
        predict:
          "A = 3.0 ve 0°'de, B = 2.0 olsun. B'nin açısını 0°'den 180°'ye çevirirken |A+B| hangi değerden hangisine iner? Hangi açıdan sonra bileşke, A'nın tek başına 3.0'lık boyundan bile kısa olur: 90° mi, daha fazlası mı?",
        do: "|A| = 3.0, A'nın açısı 0°, |B| = 2.0 yap. B'nin açısını sırayla 0°, 60°, 90°, 120°, 180°'ye getirip |A+B|'yi kaydet. Sonra 109° ile 110° arasında, ardından 138° ile 139° arasında gidip gel.",
        observe:
          "Sırasıyla 5.00, 4.36, 3.61, 2.65, 1.00. 109°'de 3.02, 110°'de 2.98: eşik burada. 138°'de 2.02, 139°'de 1.99: bundan sonra bileşke iki oktan da kısadır. 180°'de θ ≈ 0°, çünkü A daha uzundur.",
        explain:
          "|A+B|² = 9 + 4 + 12·cos φ. Bunu 9'a eşitlersen cos φ = −1/3, φ ≈ 109.5°; 4'e eşitlersen cos φ = −0.75, φ ≈ 138.6°. 90°'de B yana bakar ve A'yı hiç geri çekmez, toplam yine uzar. Kısalma için B'nin A doğrultusundaki bileşeni yeterince geriye, −0.67'nin altına düşmelidir.",
      },
      {
        title: "Takas et: paralelkenarın öbür kenarı",
        predict:
          "A ile B'nin değerlerini takas edersen (A = 2.0 ve 120°, B = 3.0 ve 30°) yeşil ok kıpırdar mı? Kesikli çizgi nereye gider?",
        do: "Önce açılış değerlerinde kesikli çizginin yerini aklına yaz: A'nın ucundan yeşilin ucuna. Sonra |A| = 2.0, A'nın açısı 120°, |B| = 3.0, B'nin açısı 30° yap ve iki ekranı karşılaştır.",
        observe:
          "Okumanın ilk satırı yer değiştirir: A = (−1.00, 1.73) · B = (2.60, 1.50). İkinci satır kıpırdamaz: A + B = (1.60, 3.23), |A+B| = 3.61, θ ≈ 64°. Tuvalde mavi ile turuncu yer değiştirir; kesikli çizgi yeşil okun öbür yanına geçer. İki kesikli çizgiyi birlikte düşünürsen bir paralelkenar tamamlanır ve yeşil ok onun köşegeni olur.",
        explain:
          "Bileşenler sayıdır ve sayı toplamında sıra önemsizdir: 2.60 + (−1.00) = (−1.00) + 2.60. Geometride bu, 'önce A sonra B' ile 'önce B sonra A' yollarının aynı köşeye varması demektir: Newton'un paralelkenarı. Sayfa her seferinde yalnızca bir kenarı çizer; öbürünü takas ederek görürsün.",
      },
      {
        title: "Çıkarma düğmesi yok, ters ok var",
        predict:
          "Açılış değerlerinde A − B'yi bulmak için B'yi ters çevirmen yeter: aynı boy, açıya +180°. |A − B|, |A + B| olan 3.61'den büyük mü çıkar, küçük mü? Sayfa yönü kaç derece diye yazar?",
        do: "A'yı 3.0 ve 30°'de bırak, |B| = 2.0 kalsın, B'nin açısını 120°'den 300°'ye çevir. Sonra |B|'yi 3.0, açısını 210° yaparak A + (−A)'yı dene.",
        observe:
          "B = (1.00, −1.73), toplam (3.60, −0.23), |A+B| = 3.61, θ ≈ −4°: A − B'nin boyu A + B ile aynı. İkinci denemede toplam (0.00, −0.00) ve büyüklük 0.00 görünür, ama θ ≈ −90° yazar.",
        explain:
          "Dik oklarda cos 90° = 0 olduğundan kosinüs teoremindeki ± terimi düşer: |A − B| = |A + B|. Sayfa açıyı −180° ile 180° arasında verir; −4°, kaydırıcıların diliyle 356°'dir. Sıfır vektörün yönü yoktur: −90°, 10⁻¹⁶ mertebesinde bir yuvarlama artığının işaretinden doğar. A = 3.0 ve 0°, B = 3.0 ve 180° denersen aynı sıfır için 90° yazar.",
      },
    ],
  },
  wow: [
    {
      title: "Yıldızlar da şemsiye eğdirir",
      body: "Aralık 1725'te Gamma Draconis yıldızını izlemeye başlayan James Bradley, yıldızın eylülden marta 40 yay saniyesi kadar güneye kayıp sonra geri döndüğünü gördü; aranan paralaks bu deseni veremezdi. 1728'de açıklamayı buldu: Dünya yörüngesinde saniyede yaklaşık 30 km hızla koşarken yıldız ışığı, yağmur gibi, biraz önden geliyormuş gibi görünür. Sapma en fazla v/c ≈ 30/300 000 = 10⁻⁴ radyan, yani yaklaşık 20.6 yay saniyesidir (ölçülen değer 20.5″): 200 m öteden bakılan 2 cm'lik bir düğme kadar. Bradley bundan ışık hızını da hesapladı. Thames'te bir teknenin flamasından esinlendiği anlatılır; hikâye büyük olasılıkla efsanedir.",
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
    title: "Rüzgârda kuzeye uçmak",
    prompt:
      "Bir uçak havaya göre 250 km/sa hızla uçuyor; rüzgâr batıdan doğuya 50 km/sa esiyor. Pilot tam kuzeye gitmek istiyor. Uçağın burnunu hangi yöne çevirmeli ve yere göre hızı kaç olur? Açıları doğudan (x ekseni) saat yönünün tersine ölç; kuzey 90°'dir.",
    steps: [
      "Vektörleri yaz: rüzgâr W = (50, 0) km/sa. Uçağın havaya göre hızı V = (250·cos α, 250·sin α) km/sa. Yere göre hız bunların toplamıdır: G = V + W.",
      "Kuzeye gitmek, G'nin x bileşeninin sıfır olması demektir: 250·cos α + 50 = 0, yani cos α = −0.2 ve α ≈ 101.5°. Burun kuzeyden yaklaşık 11.5° batıya, rüzgâra doğru döner.",
      "Yere göre hız, G'nin y bileşenidir: 250·sin α = 250·√(1 − 0.2²) = 250·√0.96 ≈ 250 × 0.9798 = 244.95 km/sa. Pisagor'la denetle: V hipotenüs, rüzgârı karşılayan 50 km/sa ile yere göre hız dik kenarlardır: 244.95² + 50² ≈ 62 500 = 250².",
      "Saf yaklaşımla karşılaştır: burun tam kuzeye tutulsaydı G = (50, 250) km/sa olurdu; uçak 255 km/sa hızla ama kuzeyden yaklaşık 11.3° doğuya kayarak giderdi, yani her saatte 50 km rotadan sapardı.",
      "Sayfada dene, 1 birim = 50 km/sa olsun: |A| = 5.0 ve açı 102°, |B| = 1.0 ve açı 0°. Okuma A + B = (−0.04, 4.89), |A+B| = 4.89, θ ≈ 90° gösterir; 4.89 × 50 ≈ 245 km/sa. 101°'de (0.05, 4.91) ve θ ≈ 89° çıkar: tam değer 101.5°, iki tamsayının arasındadır.",
    ],
    result:
      "Burun 101.5°'ye, yani kuzeyden yaklaşık 11.5° batıya; yere göre hız yaklaşık 245 km/sa. Uçak burnunun gösterdiği yere değil, iki vektörün toplamının gösterdiği yere gider. Pilotlar yan rüzgârda bu yüzden hafifçe yan yan uçar; buna rüzgâr düzeltme açısı denir.",
  },
  misconceptions: [
    {
      myth: "3 N ile 4 N'luk iki kuvvetin bileşkesi 7 N'dur.",
      truth:
        "7 N yalnızca iki kuvvet aynı yöndeyse doğrudur. Zıt yöndeyseler 1 N, dik iseler 5 N olur; ara açılarda sonuç 1 ile 7 N arasında herhangi bir değer olabilir. Büyüklükler ancak aynı yönlü vektörlerde doğrudan toplanır.",
    },
    {
      myth: "Bir vektöre başka bir vektör eklemek toplamı her zaman büyütür.",
      truth:
        "Eklenen vektörün ilk vektör doğrultusundaki bileşeni yeterince geriye bakıyorsa toplam kısalır. Sayfada A = 3.0 ve 0°, B = 2.0 yap: B'nin açısı 110° olduğunda |A+B| = 2.98, yani A'nın tek başına boyundan kısa. Halat çekmede karşı takımın kuvveti de böyle 'eklenir'.",
    },
    {
      myth: "Bileşkenin yönü her zaman θ = arctan(Rᵧ/Rₓ) ile bulunur.",
      truth:
        "arctan yalnızca −90° ile 90° arasında değer döndürür; (2, 2) ile (−2, −2) için aynı 45°'yi verir. İkincisinin gerçek yönü 225°'dir. Bileşenlerin işaretine bakıp hangi çeyrekte olduğunu belirlemek ya da iki işareti birlikte kullanan atan2 fonksiyonunu kullanmak gerekir. Sayfa atan2 kullanır ve aynı yönü −135° diye yazar.",
    },
    {
      myth: "Bileşenler bir vektörün değişmez kimliğidir.",
      truth:
        "Bileşenler eksen seçimine bağlıdır; boy ve iki vektör arasındaki açı ise bağlı değildir. Sayfada açılış değerlerinden iki açıya da 60° ekle (A 90°'de, B 180°'de): A + B'nin bileşenleri (1.60, 3.23)'ten (−2.00, 3.00)'e değişir, ama |A+B| yine 3.61 kalır ve θ tam 60° artarak 64°'den 124°'ye çıkar. Eksenleri döndürmek, bütün okları ters yönde döndürmekle aynı şeydir.",
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
      term: "Büyüklük (|A|)",
      definition:
        "Vektörün uzunluğu; bileşenlerden √(Aₓ² + Aᵧ²) ile bulunur ve hiçbir zaman negatif değildir.",
    },
    {
      term: "Bileşen",
      definition:
        "Vektörün bir eksen boyunca payı, örneğin Aₓ = |A|·cos θ; işareti o eksende hangi yöne baktığını söyler.",
    },
    {
      term: "Bileşke",
      definition:
        "Birden çok vektörün toplamı; hepsinin yerine tek başına aynı etkiyi yapan vektör.",
    },
    {
      term: "Ters vektör (−A)",
      definition:
        "A ile aynı boyda ve tam zıt yönde olan vektör; A ile toplanınca sıfır vektörü verir.",
    },
    {
      term: "Sıfır vektörü",
      definition:
        "Boyu sıfır olan ve yönü tanımsız tek vektör; herhangi bir vektöre eklendiğinde onu değiştirmez.",
    },
    {
      term: "Birim vektör",
      definition:
        "Boyu tam 1 olan, yalnızca yön bildiren vektör; x ve y eksenleri boyunca î ve ĵ ile gösterilir.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede vektör bir oktur; üniversitede tanım tersine döner: toplanabilen ve bir sayıyla çarpılabilen, bu işlemler belirli kurallara uyan her şey bir vektördür. Polinomlar, ses sinyalleri, üç sayıyla yazılan renkler, bir fotoğrafın milyonlarca pikseli birer <strong>vektör uzayının</strong> elemanıdır. <strong>Lineer cebir</strong> bu uzayların ve onları birbirine götüren makinelerin, yani matrislerin dilidir. Kosinüs teoremindeki 2|A||B|·cos φ terimi de tesadüf değildir: o, <em>A·B = |A||B|·cos φ</em> diye tanımlanan <strong>skaler çarpımın</strong> iki katıdır. Fizikte iş, gölge, açı ve benzerlik hesapları hep bu çarpımdan geçer.",
      "Bir adım ötede, uzayın her noktasına bir ok iliştirilir: rüzgâr haritaları, elektrik ve manyetik alanlar birer <strong>vektör alanıdır</strong>. Heaviside'ın vektör diliyle yazdığı Maxwell denklemleri, bu alanların nasıl değiştiğini dört satırda anlatır; çok değişkenli kalkülüsteki gradyan da en dik yükseliş yönünü gösteren bir vektördür. Yapay zekâda sözcükler ve görüntüler yüzlerce boyutlu vektörlerle temsil edilir; iki sözcüğün anlamca ne kadar yakın olduğu, sayfadaki iki ok arasındaki açıya bakmanın yüksek boyutlu karşılığıyla ölçülür.",
    ],
    topics: [
      "Vektör uzayları",
      "Skaler (iç) çarpım",
      "Vektörel çarpım",
      "Matrisler ve doğrusal dönüşümler",
      "Vektör alanları",
      "Gradyan",
      "Kuaterniyonlar ve 3B dönme",
    ],
  },
  quiz: [
    {
      question:
        "|A| = 3 ve |B| = 4 olan iki vektörün toplamının büyüklüğü aşağıdakilerden hangisi OLAMAZ?",
      options: ["0.5 birim", "1 birim", "5 birim", "7 birim"],
      answer: 0,
      explanation:
        "Bileşkenin boyu ||A| − |B|| = 1 ile |A| + |B| = 7 arasında kalır: 7 aynı yönde, 1 zıt yönde, 5 dik açıda elde edilir. 0.5 için 3 birimlik okun 4 birimlik oku neredeyse tamamen silmesi gerekirdi; en iyi ihtimalle 1 birim artar. Üçgenin bir kenarı, öbür ikisinin farkından kısa olamaz.",
    },
    {
      question:
        "Açılış değerlerinde A ile B diktir ve okuma |A+B| = 3.61 gösterir. B'nin açısını 120°'den 300°'ye çevirerek A − B'yi elde edersen |A − B| kaç olur?",
      options: ["1.00", "3.00", "3.61", "5.00"],
      answer: 2,
      explanation:
        "−B, B ile aynı boyda ama zıt yönde bir oktur ve A'ya hâlâ diktir, yalnızca öbür yana bakar. Pisagor aynı iki kenarı görür: √(3² + 2²) ≈ 3.61. Kosinüs teoreminde cos 90° = 0 olduğundan 2|A||B|·cos φ terimi düşer. Değişen boy değil yöndür: θ ≈ 64°'den θ ≈ −4°'ye, yani 356°'ye geçer.",
    },
    {
      question:
        "Bir bileşke R = (−2, −2). Hesap makinesi arctan(Rᵧ/Rₓ) = arctan(1) = 45° verir. R'nin gerçek yönü nedir (x ekseninden saat yönünün tersine)?",
      options: ["45°", "135°", "225°", "315°"],
      answer: 2,
      explanation:
        "İki bileşen de negatif: ok sola ve aşağı bakar, yani üçüncü çeyrektedir. arctan bu bilgiyi kaybeder; doğru açı 45° + 180° = 225°'dir. Sayfa atan2 kullandığı için aynı yönü −135° diye yazar; ikisi aynı oktur. Boyu ise √8 ≈ 2.83.",
    },
  ],
  next: [
    {
      href: "matris-donusumleri.html",
      title: "Matris Dönüşümleri",
      why: "Okları bir makineye sok: 2×2 matris her vektörü döndürür, uzatır, büker. Döndürme açısını 90° yap: matrisin ilk sütunu (0, 1) olur, çünkü î artık ĵ'nin yerindedir.",
    },
    {
      href: "birim-cember.html",
      title: "Birim Çember",
      why: "Boyu 1 olan bir okun bileşenleri tam olarak cos θ ve sin θ'dır. Açıyı 30° yap, cos θ = 0.866 oku; 3 ile çarpınca A'nın açılıştaki x bileşeni 2.60 çıkar.",
    },
    {
      href: "atislar.html",
      title: "Atış Simülasyonu",
      why: "Bağımsız bileşenler iş başında: açı ve hız kaydırıcılarıyla seçtiğin ilk hız v·cos α ve v·sin α diye ikiye ayrılır; yatay pay sabit kalır, düşey pay g yüzünden değişir ve yol bir parabol olur.",
    },
    {
      href: "newton-hareket-yasalari.html",
      title: "Newton'un Hareket Yasaları",
      why: "Momentum da bir vektördür; bu tek boyutlu çarpışmada yönü yalnızca işaret taşır. Hız grafiğinde Top 1'in hızı +3'ten −3'e döner: büyüklük aynı, yön ters.",
    },
  ],
  sources: [
    {
      title:
        "OpenStax · University Physics Vol. 1, 2.2 Coordinate Systems and Components of a Vector",
      url: "https://openstax.org/books/university-physics-volume-1/pages/2-2-coordinate-systems-and-components-of-a-vector",
      note: "Bileşenler, büyüklük ve yön açısı; çözümlü örneklerle (İngilizce, açık ders kitabı).",
    },
    {
      title: "PhET · Vektör Ekleme",
      url: "https://phet.colorado.edu/tr/simulations/vector-addition",
      note: "Okları sürükleyip yerleştirebildiğin, bileşenleri ayrıca çizen bir başka simülasyon; buradaki sonuçlarla karşılaştır.",
    },
    {
      title: "Wikipedia · Euclidean vector",
      url: "https://en.wikipedia.org/wiki/Euclidean_vector",
      note: "Tarihçe bölümü: Bellavitis, Hamilton, Grassmann, Gibbs ve Wilson; sözcüğün kökeni (İngilizce).",
    },
    {
      title: "3Blue1Brown · Linear Algebra",
      url: "https://www.3blue1brown.com/topics/linear-algebra",
      note: "Vektörden matrise, determinanttan özdeğere görsel bir yolculuk; köprü bölümünün doğal devamı (İngilizce).",
    },
  ],
  revision: "Ekim 2026",
};
