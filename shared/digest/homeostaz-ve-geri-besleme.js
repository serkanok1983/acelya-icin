window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["homeostaz-ve-geri-besleme"] = {
  slug: "homeostaz-ve-geri-besleme",
  title: "Homeostaz ve Geri Besleme: Dengeyi Tutan Döngüler",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Ayar noktası, algılayıcı, denetleyici ve etkileyici: aynı döngü glukozu, vücut ısısını ve iki durumlu bir anahtarı yönetir. Kazancın hatayı nasıl böldüğünü, gecikmenin neden salınım doğurduğunu ölç.",
  hook:
    "22 °C'lik bir odada hiçbir düzenleme yapmayan bir vücut, modelde 28,94 °C'ye kadar soğurdu; titreme, terleme ve damar ayarı birlikte onu 36,66 °C'de tutar. Peki düzeltme bu kadar güçlüyse neden tam 37 °C'ye varamaz, ve kazancı daha da artırmak neden bir noktadan sonra dengeyi bozar?",
  bigIdea:
    "Negatif geri besleme sapmayı ölçüp ona karşı koyar ve hatayı (1 + K) kadar küçültür ama sıfırlamaz; algılamadaki gecikme kazanca bir tavan koyar, pozitif geri besleme ise küçük bir itkiyi büyütüp sistemi bir durumdan ötekine geçirir.",
  story: [
    "Fransız fizyolog Claude Bernard (1813–1878), 19. yüzyılın ortasında bir gözlemi ilkeye dönüştürdü: canlının bir <strong>iç ortamı</strong> (<em>milieu intérieur</em>) vardır ve beden, dış koşullar değişirken bu iç ortamı görece sabit tutar. Wikipedia'nın homeostaz maddesi düşüncenin ilk tarifini 1849'a tarihler; Bernard onu sonraki otuz yıl boyunca derslerinde ve kitaplarında geliştirdi ve <em>milieu intérieur</em> adı ondan kalmadır.",
    "Yetmiş yıl kadar sonra Amerikalı fizyolog Walter Bradford Cannon bu kararlılığa bir ad verdi: 1926'da <strong>homeostaz</strong> sözcüğünü önerdi ve fikri 1932'de yayımlanan <em>The Wisdom of the Body</em> kitabıyla geniş kitleye taşıdı. Cannon için homeostaz durgunluk değildi; sürekli çalışan, birbirine bağlı düzeltme süreçlerinin vardığı dinamik bir dengeydi.",
    "Mühendislik aynı soruya başka bir kapıdan girmişti. James Watt 1788'de buhar makinesinin hızını dönen ağırlıklı bir regülatörle denetlemeye başladı; makineler hızlandıkça bu düzenek aşırı düzeltmeye, buhar vanasını açıp kapayarak salınmaya eğilim gösterdi. James Clerk Maxwell 1868'de <em>On Governors</em> adlı makalesinde bu davranışı denklemlerle inceledi; makale geri beslemeli denetim kuramının klasiklerinden sayılır. 1948'de Norbert Wiener <em>Cybernetics</em> kitabında makineyi ve canlıyı aynı dille, geri besleme ve iletişim diliyle anlattı; homeostaz da bu ortak dilin örneklerinden biri oldu.",
    "Biyolojideki döngüleri ölçmek için de model gerekti. 1979'da Richard Bergman ve Claudio Cobelli (makalenin öteki yazarları Y. Z. Ider ve C. R. Bowden ile) sık örneklemeli damar içi glukoz yükleme testinin verisinden iki sayı çıkaran bir <strong>en küçük model</strong> (<em>minimal model</em>) kurdu: insülinden bağımsız temizlenmeyi anlatan <strong>glukoz etkinliği</strong> ve insülinin bu temizlenmeyi ne kadar hızlandırdığını anlatan <strong>insülin duyarlılığı</strong>. Bu sayfanın ikinci sekmesi o modelin sadeleştirilmiş bir öğretim uyarlamasıdır.",
  ],
  core: [
    {
      heading: "Döngünün dört parçası",
      body:
        "Her homeostatik döngüde aynı roller vardır. <strong>Ayar noktası</strong>, değerin çevresinde dalgalandığı hedeftir; <strong>algılayıcı</strong> (reseptör) değeri izler; <strong>denetim merkezi</strong> ölçüleni hedefle karşılaştırır; <strong>etkileyici</strong> sapmayı geri çeviren değişikliği yapar. Vücut ısısında algılayıcı sıcaklık duyarlı sinir uçları, denetim merkezi hipotalamus, etkileyiciler ter bezleri, deri damarları ve iskelet kaslarıdır. Döngü <em>negatif</em> ise etkileyici sapmanın tersine çalışır; <em>pozitif</em> ise sapmayı destekler. Sayfanın ilk sekmesindeki blok çizimi bu dört kutuyu soyut bir değişkenle gösterir.",
      formula: "τ z′ = −z + u + d,  u = −K·z(t − θ)",
      formulaNote: "z ayar noktasından sapma, d dışarıdan gelen bozucu, K denetleyicinin kazancı, θ algılama gecikmesi, τ sürecin kendi zaman sabiti.",
    },
    {
      heading: "Oransal düzeltme hatayı böler, sıfırlamaz",
      body:
        "Denetleyici yalnız o anki sapmayla orantılı tepki veriyorsa (oransal, P denetimi), bir düzeltme üretmek için sapmanın sürmesi gerekir. Kalıcı durumda z′ = 0 koyunca 0 = −z − Kz + d, yani z = d/(1 + K) çıkar: kazanç 4 ise bozucunun beşte biri kalır, 9 ise onda biri. Gecikme yokken denklem τ z′ = −(1 + K) z + d olur; çözüm üstel yaklaşımdır ve kapalı döngü (1 + K) kat hızlanır. Bozucuyu tümüyle silmek, hatayı zaman içinde biriktiren bir integral terimi ister; bu sayfadaki modelde böyle bir terim yoktur.",
      formula: "z<sub>ss</sub> = d/(1 + K),  t<sub>%2</sub> = τ ln 50/(1 + K)",
      formulaNote: "İkinci formül sapmanın kalıcı değerin ±%2'si içine girdiği an; yalnız θ = 0 için geçerli kapalı biçimdir.",
    },
    {
      heading: "Gecikme salınım doğurur; pozitif döngü kaçar",
      body:
        "Algılayıcı bir θ süre geç haber veriyorsa denetleyici geçmişe göre düzeltir. Kazanç küçükken bu yalnız yanıtı biraz değiştirir; büyüdükçe düzeltme fazla gelir, sapma öteki yana geçer ve döngü salınmaya başlar. Eşik, açık döngünün sinüs bir girdiye verdiği yanıtın tam yarım tur (π) geciktiği frekansta yanıtın büyüklüğünün 1 olduğu kazançtır. Varsayılan değerlerde (θ = 0,5 s, τ = 10 s) K<sub>c</sub> ≈ 32 çıkar; gecikmeyi iki katına çıkarmak eşiği yaklaşık yarıya indirir. Pozitif geri beslemede işaret döner: K > 1 olunca sapma kendini besler ve üstel büyür.",
      formula: "ω<sub>c</sub>θ + arctan(ω<sub>c</sub>τ) = π,  K<sub>c</sub> = √(1 + ω<sub>c</sub>²τ²)",
      formulaNote: "Pozitif döngüde büyüme hızı s, τs + 1 = K e<sup>−θs</sup> denkleminin pozitif köküdür; ikiye katlanma süresi ln 2/s.",
    },
    {
      heading: "Glukoz ve insülin: Bergman'ın en küçük modeli",
      body:
        "Model glukozu (G), uzak bölmedeki insülin etkisini (X) ve plazma insülinini (I) izler. Glukoz kendiliğinden S<sub>G</sub> hızıyla tabana döner; X bu temizlenmeyi hızlandırır. X ise insülinin tabanın üstündeki kısmını bir gecikmeyle izler; uzun dönemdeki etkinlik S<sub>I</sub> ile ölçülür. Bergman'ın özgün insülin denklemi bir eşik ve zamanla çarpılan bir terim içerir; sayfa onun yerine doğrusal, sıfırın altına inmeyen bir salgı yazar ve bunu açıkça söyler. Taban çevresinde doğrusallaştırınca glukoz sapmasının toplam alanı, girdinin etkin temizlenme hızına bölümüdür. Bunlar öğretim değerleridir; hiçbir sayı tanı ölçütü ya da öneri değildir.",
      formula: "G′ = −(S<sub>G</sub> + X)G + S<sub>G</sub>G<sub>b</sub>,  X′ = −p₂X + p₂S<sub>I</sub>(I − I<sub>b</sub>)",
      formulaNote: "Doğrusal kuramda alan = girdi/(S<sub>G</sub> + G<sub>b</sub>S<sub>I</sub>γ/n); X·G çarpımı büyük dozda modeli doğrusallıktan uzaklaştırır.",
    },
    {
      heading: "Pozitif geri besleme ve iki durumlu anahtar",
      body:
        "Bir değişken kendi üretimini artırıyorsa (öz-aktivasyon) üretim eğrisi S biçimli olur ve düz yıkım doğrusunu üç yerde kesebilir: iki kararlı durum ve aralarında kararsız bir ayırıcı. Bu iki eğri <strong>sıfır eğimli eğrilerdir</strong> (nullcline): kesiştikleri yerde x′ = 0'dır. Dış girdi a yavaşça artırılınca alt durum bir <strong>katlanma noktasında</strong> kaybolur ve sistem sıçrar; geri azaltınca başka, daha düşük bir a'da geri döner. Bu farka <strong>histerezis</strong> denir, sistemin geçmişini hatırlamasıdır. Alttaki katlanma a < 0'a kayarsa anahtar girdi sıfıra inse bile açık kalır: geri dönüşsüz olur. OpenStax doğumdaki oksitosin döngüsünü ve pıhtılaşmayı pozitif geri beslemenin örnekleri olarak verir; sayfadaki model onlara yalnız kavramsal olarak benzer.",
      formula: "x′ = a + b·xⁿ/(1 + xⁿ) − x",
      formulaNote: "Katlanmada hem x′ = 0 hem ∂x′/∂x = 0 olur; n = 1 iken S biçimi kaybolur ve tek denge kalır.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvardır ve her kartta ölçülen değer kuramın yanında durur. <strong>01 · Geri besleme döngüsü</strong> sekmesinde Geri besleme türü menüsü, Kazanç K, Algılama gecikmesi θ, Süreç zaman sabiti τ ve Bozucu basamak d kaydırıcıları vardır; bozucu t = 5 s'de gelir. <strong>02 · Glukoz ve insülin</strong> sekmesinde Girdi, İnsülin duyarlılığı S_I, Glukoz etkinliği S_G ve Pankreas yanıtı γ; <strong>03 · Sıcaklık düzenlemesi</strong> sekmesinde ortam sıcaklığı, ısı üretimi ve üç etkileyicinin onay kutuları; <strong>04 · Pozitif geri besleme ve iki durumluluk</strong> sekmesinde dış girdi, tarama hızı ve darbe ayarları. Her sekmenin Varsayılana dön düğmesi vardır; R tuşu da etkin sekmeyi sıfırlar. Model eğitim amaçlıdır; tıbbi yorum ya da öneri içermez.",
    experiments: [
      {
        title: "Kazanç hatayı böler, gecikme kazancı sınırlar",
        predict: "Kazancı 4'ten 9'a çıkarınca kalıcı sapma yarıya mı iner, dörtte bire mi? Gecikme varken kazancı sınırsız artırabilir misin?",
        do: "Sekme 01'de Gecikmesiz, K = 4 düğmesine bas, sonra Kazanç K'yi 9 ve 19 yap. Ardından Varsayılana dön (θ = 0,5 s), sırayla Eşiğe yakın, K = 30 ve Eşiğin ötesi, K = 36 düğmelerine bas; en sonda θ'yı 1,00 s yap.",
        observe: "Kalıcı sapma 1,000 → 0,500 → 0,250; oran 0,2000, 0,1000, 0,0500; yerleşme 7,82, 3,91, 1,96 s. Eşik kartı 32,03 · 32,06 der. K = 30'da sapma yine 0,161'e oturur ama aşım 97,4 %, periyot 1,998 s; K = 36'da sapma büyür. θ = 1 s'de eşik 16,36 · 16,35'e düşer.",
        explain: "Hata d/(1 + K)'dir ve yanıt (1 + K) kat hızlanır. Gecikmede düzeltme yarım tur geç kalınca kendi sapmasını besler; eşik K<sub>c</sub> = √(1 + ω<sub>c</sub>²τ²) ile hesaplanır ve θ büyüdükçe düşer.",
      },
      {
        title: "İnsülin yolu dönüşü kısaltır, ama doğrusal değildir",
        predict: "İnsülin yanıtı kapatılırsa glukozun tabana dönüşü ne kadar uzar? Dozu küçültmek ölçülen alanı doğrusal kurama yaklaştırır mı?",
        do: "Sekme 02 varsayılanında Tabana dönüş ve Glukoz alanı kartlarını oku. Sonra İnsülin yanıtı yok, Düşük duyarlılık senaryosu ve Küçük doz: doğrusal sınır düğmelerini sırayla dene.",
        observe: "Varsayılan: dönüş 60,5 dk (insülinsiz kuram 113,0 dk), alan 4506 mg/dl·dk, doğrusal kuramdan −11,33 %; G 108. dakikada 83,1 mg/dl'ye, tabanın altına iner. İnsülin yanıtı yok: 113,0 dk, alan 7547 = kuram. Düşük duyarlılık: 151,1 dk, alan 11 017. Küçük doz: fark −0,70 %.",
        explain: "İnsülinsiz glukoz e<sup>−S<sub>G</sub>t</sup> ile döner; %5'e iniş ln 20/S<sub>G</sub> sürer. İnsülin temizlenmeyi hızlandırır ama X·G terimi doğrusal değildir; doz küçüldükçe bu etki söner. Tabanın altına iniş, insülin etkisinin gecikmeyle sürmesindendir.",
      },
      {
        title: "Üç etkileyici, kalan küçük bir hata",
        predict: "22 °C'de hiçbir etkileyici çalışmazsa denge kaç dereceye iner? Üçü birlikte çalışınca tam 37 °C'ye varılır mı?",
        do: "Sekme 03 varsayılanında Edilgin denge, Kararlı iç sıcaklık ve etkileyici tablosunu oku; Etkileyiciler kapalı düğmesine basıp Newton soğuma süresini gör. Sonra Sıcak gün, 40 °C düğmesine bas.",
        observe: "Edilgin denge 28,94 °C; tabloda yalnız titreme 36,453, üçü birlikte 36,663 °C (kalan hata 4,2 %). Newton süresi 5,852 sa, kuram m c/G ile aynı. 40 °C'de denge 37,39 °C, terleme 116 W, kuru akış −36 W; yalnız damar 45,472 °C'de kalır.",
        explain: "Etkileyiciler sapmayla orantılı güç verir; onları çalıştıran bir sapma kalmalıdır, tıpkı P denetimindeki gibi. Sıcak ortamda deri damarlarının genişlemesi ısıyı dışarıdan içeri taşır; o yüzden orada asıl iş terlemenindir.",
      },
      {
        title: "Histerezis: anahtarın belleği",
        predict: "Dış girdiyi yavaşça artırıp sonra azalttığında anahtar aynı a değerinde mi açılır ve kapanır? Darbe süresinin bir eşiği var mı?",
        do: "Sekme 04 varsayılanında yukarı ve aşağı tarama kartlarını oku, Tarama hızını 0,0001 yap. Sonra Darbe süresi T_d'yi 5,5 ve 6,0 yap. En sonda Geri dönüşsüz anahtar düğmesine bas.",
        observe: "Açılma 0,4459, kapanma 0,1656 (katlanmalar 0,4279 ve 0,1858); yavaş taramada 0,4320 ve 0,1812. 5,5'lik darbede x düşük duruma döner, 6,0'da 1,6025'te kalır; en kısa darbe 5,59. Geri dönüşsüz anahtarda alt katlanma −0,1878: kapanmadı.",
        explain: "Katlanmada kararlı durum yok olur ama sistem yavaşça uzaklaşır; tarama hızlandıkça sıçrama gecikir. Kapanma noktası negatif a'ya kayınca sıfır girdi bile anahtarı kapatamaz.",
      },
    ],
  },
  wow: [
    {
      title: "Termostat yukarı alınınca ateş",
      body:
        "OpenStax Biology'ye göre akyuvarlar bakterileri yok ederken kana pirojenler salınır; bunlar hipotalamusa ulaşır ve vücudun termostatını daha yüksek bir sıcaklığa ayarlar; ateş böyle oluşur. Ateşte döngü bozulmuş değildir, hedefi değişmiştir. Sayfadaki Ateş kavramı senaryosunda ayar noktası 1. saatte 38,5 °C'ye çıkınca titreme 350 W sınırına dayanır; iniş başlayınca da terleme açılır.",
    },
    {
      title: "Gecikme iki katına çıkınca eşik yarıya iner",
      body:
        "Süreç zaman sabiti 10 s iken 0,5 s'lik algılama gecikmesi salınım eşiğini K<sub>c</sub> ≈ 32'ye koyar; gecikme 1 s olunca eşik 16,35'e düşer. τ ≫ θ olduğunda arctan(ω<sub>c</sub>τ) ≈ π/2, yani ω<sub>c</sub> ≈ π/(2θ) ve K<sub>c</sub> ≈ πτ/(2θ) olur: varsayılanda 31,4, tam değer 32,06. Eşik gecikmeyle ters orantılıdır. Uzun bir duyusal ya da hormonal gecikme, güçlü bir düzeltmeyi kendi başına salınıma çevirebilir.",
    },
    {
      title: "Gecikme yerleşmeyi kısaltabilir",
      body:
        "Sezgi tersini söyler, ama sayfanın varsayılanında (K = 4, θ = 0,5 s, τ = 10 s) sapma ±%2 bandına 6,06 s'de girer; gecikmesiz kuram τ ln 50/(1 + K) ise 7,82 s verir. Neden: karakteristik denklem τs + 1 + K e<sup>−θs</sup> = 0'ın baskın kökü θ = 0'da −0,500 1/s iken θ = 0,5 s'de −0,655 1/s'ye kayar; gecikmeli terim e<sup>−θs</sup> bu kökte 1'den büyüktür, düzeltmeyi etkin olarak güçlendirir. θ = 1 s'de baskın kök karmaşık bir çifte dönüşür (−0,98 ± 0,60i 1/s): yerleşme 3,35 s'ye iner ama %0,6'lık bir aşım belirir. Gecikme bu yüzden önce hızlandırır, sonra salındırır.",
    },
  ],
  worked: {
    title: "Isıtmasız bir vücut ne kadar ve ne hızda soğur?",
    prompt:
      "Sayfanın ısı modelinde m = 70 kg, c = 3470 J/(kg·K), ısı üretimi M = 80 W, deri yüzeyi A = 1,8 m², yüzey ısı aktarım katsayısı h = 9 W/(m²·K), etkileyiciler kapalıyken doku iletkenliği 40 W/K'dir. Ortam 22 °C'dir ve vücut 37 °C'den başlar. Edilgin dengeyi, Newton soğuma süresini ve 12. saatteki sıcaklığı bul.",
    steps: [
      "Isı iki seri dirençten geçer: doku (1/40 K/W) ve yüzey (1/(hA) = 1/16,2 K/W). Toplam iletkenlik G = 1/(0,02500 + 0,06173) = 11,53 W/K.",
      "Dengede üretilen ısı yitirilene eşittir: M = G(T − T<sub>a</sub>), yani T = 22 + 80/11,53 = 28,94 °C. Sayfanın Edilgin denge kartı da 28,94 °C gösterir.",
      "Isı sığası C = m c = 70 × 3470 = 242 900 J/K. Denklem C T′ = M − G(T − T<sub>a</sub>) üstel bir yaklaşımdır ve zaman sabiti τ = C/G = 242 900/11,53 ≈ 21 066 s = 5,852 sa olur.",
      "Başlangıç farkı 37 − 28,94 = 8,06 °C'dir. 12 saatte bu fark e<sup>−12/5,852</sup> ≈ 0,129 katına iner: 8,06 × 0,129 ≈ 1,04 °C. Sıcaklık ≈ 29,98 °C.",
      "Sayfada dene: Etkileyiciler kapalı düğmesine bas. Newton soğuma süresi 5,852 sa, 12. saatteki değer 29,98 °C olur. Üç etkileyici yeniden açılınca denge 36,66 °C'ye çıkar.",
    ],
    result:
      "Edilgin denge 28,94 °C, zaman sabiti yaklaşık 5,85 saat, 12. saatte 29,98 °C. Kütleyi iki katına çıkarmak dengeyi değiştirmez, yalnız soğumayı iki kat yavaşlatır.",
  },
  misconceptions: [
    {
      myth: "Negatif geri besleme sapmayı tamamen ortadan kaldırır.",
      truth:
        "Yalnız sapmayla orantılı tepki veren bir döngü hatayı (1 + K) kat küçültür ama sıfırlamaz; düzeltme üretmek için biraz sapma kalmalıdır. Sayfada K = 4'te bozucunun 0,2000'si kalır; 22 °C'de üç etkileyici birlikte çalışırken bile iç sıcaklık 37 yerine 36,66 °C'dir.",
    },
    {
      myth: "Kazanç ne kadar büyükse denetim o kadar iyidir.",
      truth:
        "Gecikme yokken bu doğrudur, ama gerçek döngülerde algılama ve iletim zaman alır. 0,5 s gecikmede K = 30 hâlâ kararlıdır ama 97,4 % aşımla salınır; K = 36'da sapma büyür. Kazancın tavanını gecikme belirler.",
    },
    {
      myth: "Ateş, vücudun sıcaklık denetimini kaybetmesidir.",
      truth:
        "OpenStax'a göre pirojenler hipotalamustaki ayar noktasını yükseltir; döngü yeni hedefi savunur. Bu yüzden ateş yükselirken titreme, düşerken terleme görülür. Sayfadaki ateş senaryosu bu kavramı gösterir; klinik bir anlatım değildir.",
    },
    {
      myth: "Pozitif geri besleme her zaman zararlı ya da bozuk bir durumdur.",
      truth:
        "Pozitif geri besleme bir süreci kararlılıkla sonuna götürür: OpenStax doğum ve pıhtılaşmayı örnek verir, ikisi de bir son olayla kapanır. İki durumlu anahtarda aynı ilke, hücrelere bir karar verme ve onu hatırlama yolu sağlar.",
    },
  ],
  glossary: [
    { term: "Homeostaz", definition: "Canlının iç ortamını, dış koşullar değişirken düzeltme döngüleriyle görece sabit tutması; terimi 1926'da Walter Cannon önerdi." },
    { term: "Ayar noktası", definition: "Düzenlenen değerin çevresinde dalgalandığı hedef değer; ateşte olduğu gibi yeniden ayarlanabilir." },
    { term: "Etkileyici", definition: "Denetim merkezinin komutuyla sapmayı geri çeviren bileşen; ör. ter bezi, deri damarı, iskelet kası." },
    { term: "Kalıcı hata", definition: "Oransal denetimde bozucu sürdükçe kalan sapma; bozucunun 1/(1 + K) katıdır." },
    { term: "Salınım eşiği K_c", definition: "Gecikmeli döngünün kararlılığını yitirdiği kazanç; üstünde sapma büyüyerek salınır." },
    { term: "İnsülin duyarlılığı S_I", definition: "Bergman modelinde plazma insülinindeki bir μU/ml'lik kalıcı artışın glukoz temizlenme hızını ne kadar artırdığı (dk⁻¹ per μU/ml)." },
    { term: "Glukoz etkinliği S_G", definition: "Bergman modelinde glukozun insülinden bağımsız olarak tabana dönme hızı, dk⁻¹." },
    { term: "Histerezis", definition: "Bir sistemin açılma ve kapanma eşiklerinin farklı olması; çıktı, girdinin geçmişine bağlıdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede homeostaz bir şemadır: algılayıcı, merkez, etkileyici. Üniversitede <strong>Fizyoloji</strong> derslerinde bu şema ölçülen döngülere, <strong>Diferansiyel Denklemler</strong> ve <strong>Denetim Sistemleri</strong> derslerinde ise transfer fonksiyonlarına dönüşür. Kalıcı hata formülü d/(1 + K), son değer kuramının en basit uygulamasıdır; salınım eşiği, Nyquist ölçütünün gecikmeli bir süreçteki karşılığıdır. Hatayı sıfırlamak için integral, salınımı bastırmak için türev terimi eklenince mühendisliğin PID denetleyicisine varılır.",
      "<strong>Sistem Biyolojisi</strong> ve <strong>Matematiksel Biyoloji</strong> dersleri aynı aracı hücrenin içine taşır: öz-aktivasyonun iki durumluluğu, katlanma çatallanması, sıfır eğimli eğrilerle faz çizgisi çözümlemesi, iki genin birbirini baskıladığı anahtar ve gecikmeli negatif döngülerin kurduğu biyolojik saatler. Bergman tipi en küçük modeller ise <strong>Farmakokinetik</strong> ve bölmeli modellemede parametre kestiriminin klasik örneğidir: bir test eğrisinden birkaç anlamlı sayı çıkarmak.",
    ],
    topics: ["Denetim sistemleri ve PID", "Nyquist kararlılık ölçütü", "Gecikmeli diferansiyel denklemler", "Bölmeli modeller", "Çatallanma kuramı", "Sistem biyolojisi"],
  },
  quiz: [
    {
      question: "Oransal denetimli bir döngüde kazanç K = 4 iken kalıcı sapma 1,000'dir. Bozucu aynı kalırken K = 19 yapılırsa kalıcı sapma ne olur?",
      options: ["0,211", "0,250", "0,500", "Sıfır"],
      answer: 1,
      explanation: "z<sub>ss</sub> = d/(1 + K): d = 5 olduğu için K = 4'te 5/5 = 1, K = 19'da 5/20 = 0,25. Hata K ile değil 1 + K ile bölünür ve hiçbir sonlu kazançta sıfırlanmaz.",
    },
    {
      question: "τ = 10 s olan bir süreçte algılama gecikmesi 0,5 s'den 1 s'ye çıkarılıyor. Salınım eşiği K_c yaklaşık nasıl değişir?",
      options: ["İki katına çıkar", "Değişmez", "Yaklaşık yarıya iner", "Dörtte birine iner"],
      answer: 2,
      explanation: "τ ≫ θ iken ω<sub>c</sub> ≈ π/(2θ) ve K<sub>c</sub> ≈ πτ/(2θ) olur; eşik gecikmeyle ters orantılıdır. Sayfa 32,06'dan 16,35'e düştüğünü gösterir.",
    },
    {
      question: "İki durumlu anahtarda dış girdi yavaşça artırılınca anahtar a ≈ 0,45'te açılıyor. Girdi geri azaltılınca ne olur?",
      options: ["Yine 0,45'te kapanır", "Daha düşük bir a'da kapanır, çünkü yüksek durum alt katlanmaya kadar varlığını sürdürür", "Hiçbir zaman kapanamaz, her anahtar geri dönüşsüzdür", "Hemen kapanır, çünkü pozitif geri besleme kararsızdır"],
      answer: 1,
      explanation: "Katlanmalar arasında iki kararlı durum bir arada bulunur; sistem içinde bulunduğu durumu katlanmaya kadar korur. Varsayılan değerlerde kapanma a ≈ 0,17'dedir. Alt katlanma a < 0'a kayarsa anahtar geri dönüşsüz olur.",
    },
  ],
  next: [
    { href: "gen-ifadesi-ve-molekuler-biyoloji.html", title: "Gen İfadesi ve Moleküler Bilgi Akışı Laboratuvarı", why: "Gen ağları sekmesinde birbirini baskılayan iki genle kurulan anahtarı ve üç genin saatini ölç; buradaki tek değişkenli anahtarın iki boyutlu eşi." },
    { href: "mekatronik-muhendisligi.html", title: "Mekatronik Mühendisliği Laboratuvarı", why: "Aynı geri besleme ilkesi bir motorda: enkoder ve örneklemeyle çalışan ayrık PID konum denetimi ve onun kararlılık sınırı." },
    { href: "sinir-hucresi-ve-aksiyon-potansiyeli.html", title: "Sinir Hücresi ve Aksiyon Potansiyeli: Nernst, Hodgkin–Huxley, Eşik ve İletim", why: "Dinlenim gerilimini, eşiği ve refrakter dönemi Hodgkin–Huxley denklemleriyle ölç: bir eşiği aşınca kendi kendini sürdüren bir olayın başka bir örneği." },
    { href: "kontrol-kurami.html", title: "Kontrol Kuramı: Transfer Fonksiyonu, Kök Yeri, Bode ve PID", why: "Geri beslemenin mühendislik dili: basamak yanıtı, kök yeri, Bode ve Nyquist ile kararlılık payı, gecikmenin payı nasıl yediği ve PID ayarı." },
  ],
  sources: [
    { title: "OpenStax · Anatomy and Physiology 2e, 1.5 Homeostasis", url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-5-homeostasis", note: "Ayar noktası, algılayıcı, denetim merkezi ve etkileyici tanımları; ısı ve glukoz döngüleri; doğum ve pıhtılaşmada pozitif geri besleme (İngilizce, açık ders kitabı)." },
    { title: "OpenStax · Biology 2e, 33.3 Homeostasis", url: "https://openstax.org/books/biology-2e/pages/33-3-homeostasis", note: "Hipotalamusun sıcaklık ayar noktası, pirojenlerin termostatı yükseltmesi ve pozitif geri beslemenin tanımı (İngilizce)." },
    { title: "Wikipedia · Homeostasis", url: "https://en.wikipedia.org/wiki/Homeostasis", note: "Claude Bernard'ın iç ortamın düzenlenmesini 1849'da tarif etmesi ve Walter Cannon'un 1926'da terimi önermesi; ayar noktasının enfeksiyonda yeniden ayarlanması (İngilizce)." },
    { title: "R. N. Bergman · Origins and History of the Minimal Model of Glucose Regulation (Frontiers in Endocrinology, 2021)", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7917251/", note: "Modelin kurucusunun anlatımı: Bergman, Ider, Bowden ve Cobelli'nin 1979 makalesi, sık örneklemeli damar içi glukoz testi, S<sub>I</sub> = p₃/p₂ ve glukoz etkinliğinin tanımı (İngilizce, açık erişim)." },
  ],
  revision: "Kasım 2026",
};
