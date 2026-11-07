window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["denklem-denklestirme"] = {
  slug: "denklem-denklestirme",
  title: "Denklem Denkleştirme: Atom Sayımından Sıfır Uzayına",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Lavoisier'nin terazisinden lineer cebire: her atomu ve yükü iki tarafta eşitleyen katsayılar, A·v = 0 sisteminin çözümüdür. Elektronları say, sınırlayıcı gireni bul, verimi hesapla.",
  hook:
    "Bir kütüğü yaktığında geriye bir avuç kül kalır; kaybolan kütle nereye gitti? Hiçbir yere: karbondioksite ve su buharına dönüşüp uçan her atom hâlâ oradadır, yalnızca ortak değiştirmiştir. Kimyasal denklem bu büyük sayımın defteridir ve tek bir atom eksik yazılırsa yalan söyler.",
  bigIdea:
    "Denklemi denkleştirmek, her element ve toplam yük iki tarafta eşit kalacak katsayıları, yani bileşim matrisinin <strong>sıfır uzayında</strong> pozitif bir v vektörünü (A·v = 0) bulmaktır; kütlenin korunumu, mol oranları ve elektron dengesi bu tek koşuldan çıkar.",
  story: [
    "1774'te Antoine Lavoisier kalayı ağzı kapatılmış bir cam kapta ısıttı. Metalin yüzeyi beyaz bir toza, bugünkü adıyla kalay okside döndü; ama kabı açmadan tarttığında toplam kütle değişmemişti. Ağzı açınca içeri hava doldu ve kap ağırlaştı: metalin kazandığı kütle havadan gelmişti. Robert Boyle bir yüzyıl önce benzer deneylerde ağırlaşmayı camdan geçen 'ateş parçacıklarına' bağlamıştı; fark, kabı kapalı tutup her şeyi tartmaktaydı. Lavoisier 1789'da <em>Traité élémentaire de chimie</em>'de ilkeyi açıkça yazdı: her işlemde, işlemden önce ve sonra eşit miktarda madde vardır. Ona atfedilen 'Hiçbir şey kaybolmaz, hiçbir şey yaratılmaz, her şey dönüşür' cümlesi ise kitapta bu biçimde geçmez; fikrin sonradan yapılmış kısa bir özetidir. Lavoisier 1794'te, vergi toplayan Ferme générale'in ortaklarından biri olduğu için giyotinle idam edildi.",
    "Kütle korunuyorsa maddeler birbirine hangi oranlarda girer? Alman kimyacı Jeremias Benjamin Richter, asitlerin bazları ve bazların asitleri hangi ağırlıklarla doyurduğunu ölçen ilk kişilerdendi. Aynı miktar asidi doyuran farklı baz miktarlarının birbirine <em>eşdeğer</em> olduğunu gördü ve kimyanın uygulamalı matematiğin bir dalı olduğu sonucuna vardı. 1792'de yayımlamaya başladığı üç ciltlik kitabında bu işe Yunanca <em>stoikheion</em> (öğe) ve <em>metron</em> (ölçü) sözcüklerinden bir ad verdi: <strong>stokiyometri</strong>. Üslubu öyle karışıktı ki fikirleri, Ernst Gottfried Fischer 1802'de verilerini sülfürik asidi 1000 alan ilk eşdeğerler tablosuna dökene kadar pek ilgi görmedi. Oranların neden düzenli olduğunu John Dalton'un 1803–1808 arasında geliştirdiği atom kuramı açıkladı: her element kendine özgü kütlede atomlardan oluşur, bileşikler bu atomların tam sayılı birleşimleridir. Kuramın en güçlü dayanaklarından biri <strong>katlı oranlar yasasıdır</strong>. Klasik örneği bu sayfadaki iki gazdır: 12 g karbon CO'da 16 g, CO₂'de 32 g oksijenle birleşir; oran 1:2. Sayfanın C + O₂ → CO + CO₂ denkleminin tek bir denk biçimi olmaması da bu iki bileşiğin ayrı ayrı var olmasından gelir.",
    "Sayım için bir dil de gerekiyordu. Jöns Jacob Berzelius 1810'larda elementleri Latince adlarının baş harfleriyle yazmayı önerdi ve dönemin en güvenilir atom ağırlığı tablolarını yayımladı; sayıları bugünkü gibi alt simge değil, üst simge olarak yazıyordu. Yine de yarım yüzyıl boyunca kimyacılar aynı maddeye farklı formüller yazdı: Dalton suyu HO sanmıştı ve oksijen birçok tabloda 16 yerine 8 ağırlığıyla görünüyordu. Düğümü 1860'ta Karlsruhe'deki ilk uluslararası kimya kongresinde Stanislao Cannizzaro çözdü: Avogadro'nun 'eşit hacimlerde eşit sayıda molekül' varsayımına dayanan tutarlı atom ağırlıklarını anlatan broşürü kongrenin sonunda dağıtıldı. Sayfanın Stokiyometri sekmesinde kullandığı IUPAC 2021 tablosu bu çizginin bugünkü hâlidir.",
    "Denkleştirmenin kendisi ise uzun süre bir el becerisi sayıldı. 1615'te Jean Beguin'in çizdiği bir diyagram ilk kimyasal denklem sayılır; formüller ve katsayılar iki yüzyıl sonra geldi, ders kitapları da 'önce metaller, sonra ametaller, en son hidrojen ve oksijen' gibi kurallar öğretti. Elektron alışverişi olan zor tepkimeler için yarı tepkime yöntemi yerleşti. Kimya eğitimi dergilerinde ise sorunun aslında bir doğrusal cebir sorusu olduğu defalarca işlendi; L. R. Thorne'un 2010'da <em>The Chemical Educator</em>'da yayımlanan makalesi gibi çalışmalar katsayıları bileşim matrisinin sıfır uzayından okumayı öğretir. Bu bakış, deneme-yanılmanın fark etmediği iki durumu görünür kıldı: denk biçimi tek olmayan denklemler ve hiç denkleşmeyenler. Sayfanın Matris yöntemi sekmesi bu yöntemi adım adım ve kesirleri hiç yuvarlamadan uygular.",
  ],
  core: [
    {
      heading: "Her atom kendi defterini tutar",
      body:
        "Tepkimede atomlar yok olmaz, yoktan da var olmaz; yalnızca ortak değiştirir. Bu yüzden her element için ayrı bir sayım yapılır: bir maddenin katkısı <strong>katsayı</strong> × formüldeki atom sayısıdır. 3CO₂'de 3 karbon ve 6 oksijen vardır; Ca(OH)₂'de parantezin içi 2 ile çarpılır, CuSO₄·5H₂O'da su beş kez sayılır. Katsayı 'bu maddeden kaç tane' der; <strong>alt indis</strong> ise maddenin kimliğidir: H₂O'yu H₂O₂ yapmak suyu başka bir maddeye çevirir. İyonlar varsa bir sayım daha eklenir: toplam yük, elektron −1 sayılarak. Sayfanın Atom sayımı tablosu tam bu satırları tutar; denklem ancak bütün Fark hücreleri 0 iken denktir.",
      formula: "Σ<sub>giren</sub> ν<sub>j</sub>·a<sub>ij</sub> = Σ<sub>ürün</sub> ν<sub>j</sub>·a<sub>ij</sub> (her element i) · Σ<sub>giren</sub> ν<sub>j</sub>·z<sub>j</sub> = Σ<sub>ürün</sub> ν<sub>j</sub>·z<sub>j</sub>",
      formulaNote: "ν<sub>j</sub>: j maddesinin katsayısı; a<sub>ij</sub>: o maddenin formülündeki i atomu sayısı; z<sub>j</sub>: maddenin yükü.",
    },
    {
      heading: "Denkleştirme bir doğrusal sistemdir: A·v = 0",
      body:
        "Sayımı bir tabloya dök: satırlar elementler, sütunlar maddeler; girenlerin atom sayıları artı, ürünlerinki eksi yazılır. Bu <strong>bileşim matrisi</strong> A'dır; katsayı vektörü v ile çarpımı her element için 'giren − çıkan'ı verir. Denk denklem A·v = 0 demektir: sağ tarafı sıfır olan, yani <em>homojen</em> bir doğrusal sistem. Gauss–Jordan eliminasyonu A'yı indirgenmiş basamak biçimine (RREF) getirir; pivot sayısı <strong>rank</strong> r'dir. Pivotsuz sütunlar serbest değişkendir ve çözümlerin oluşturduğu <strong>sıfır uzayının</strong> boyutu n − r'dir (rank–sıfırlık teoremi). Propanda n = 4, r = 3: tek serbest değişken x₄ için x₁ = (1/4)·x₄, x₂ = (5/4)·x₄, x₃ = (3/4)·x₄ çıkar; paydaların en küçük ortak katı olan x₄ = 4 seçilince 1, 5, 3, 4 bulunur.",
      formula: "A·v = 0 · boyut N(A) = n − rank A",
      formulaNote: "n madde (sütun) sayısı. Boyut 1 ise bütün denk katsayılar tek bir vektörün katlarıdır; en küçük tam sayılar, ortak böleni 1 olan kattır.",
    },
    {
      heading: "Bir, sonsuz ya da hiç",
      body:
        "Çözüm uzayının boyutu denklemin karakterini söyler. <strong>Boyut 1</strong>: denk biçim ölçek dışında tektir; çoğu tepkime böyledir. <strong>Boyut 0</strong>: tek çözüm v = 0'dır, denklem imkânsızdır; CH₄ + O₂ → CO₂'de hidrojen yalnız soldadır ve hiçbir katsayı onu sağda bulamaz. <strong>Boyut 2 ya da daha fazla</strong>: denklem aslında birden çok bağımsız tepkimenin toplamıdır. C + O₂ → CO + CO₂'de dört bilinmeyene yalnız iki koşul düşer; eksi olmayan çözümler, her biri bir maddeyi sıfırlayan iki kenar ışınının birleşimleridir. Tek boyutta da tuzak vardır: çözüm vektöründe eksi bir bileşen o maddenin yanlış tarafa yazıldığını, sıfır bileşen tepkimeye hiç katılmadığını söyler. Satırlar da gereksiz olabilir: CuSO₄·5H₂O → CuSO₄ + 5H₂O'nun 4 satırından yalnız 2'si bağımsızdır.",
      formula: "v = p·(2, 1, 2, 0) + q·(1, 1, 0, 1), p, q ≥ 0",
      formulaNote: "Sıra C, O₂, CO, CO₂. p = q = 1 için 3C + 2O₂ → 2CO + CO₂; p = 2, q = 1 için 5C + 3O₂ → 4CO + CO₂.",
    },
    {
      heading: "Elektron defteri: yükseltgenme basamakları ve yarı tepkimeler",
      body:
        "Redoks tepkimelerinde atomların yanında elektronlar da sayılır. <strong>Yükseltgenme basamağı</strong>, bağ elektronları hep daha elektronegatif atoma verilmiş gibi yapılan resmî bir hesaptır: O çoğunlukla −2, H +1, alkali metaller +1; bir maddedeki basamakların toplamı yüküne eşittir. KMnO₄'te Mn +7, MnCl₂'de +2'dir. Aynı formüldeki atomlar farklı basamaklarda olabilir ve formülden yalnız ortalama çıkar: propanda uçtaki iki karbon −3, ortadaki −2'dir; sayfa −8/3 yazar. Verilen elektron alınan elektrona eşit olmalıdır. <strong>Yarı tepkime yöntemi</strong> bunu düzenli yapar: indirgenme ve yükseltgenme ayrı yazılır; asidik ortamda O'lar H₂O, H'ler H⁺, yük e⁻ ile eşitlenir; sonra iki yarı tepkime elektronlar eşit olacak sayılarla çarpılıp toplanır.",
      formula: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O · Fe²⁺ → Fe³⁺ + e⁻ (×5)",
      formulaNote: "Yük denetimi: solda −1 + 8 − 5 = +2, sağda +2. Toplam: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O; 5 elektron el değiştirir.",
    },
    {
      heading: "Mol köprüsü: sınırlayıcı giren, verim ve gaz hacmi",
      body:
        "Katsayılar mol oranıdır, kütle oranı değil. Kütleyi n = m/M ile mole çevir ve her girenin n/ν oranını hesapla: en küçüğü <strong>sınırlayıcı giren</strong>dir ve <strong>tepkime ilerlemesi</strong> ξ'yi belirler. Her ürün ν·ξ mol oluşur, her girenden ν·ξ mol harcanır; gerisi artar. Kütlenin korunması bu hesaptan kendiliğinden çıkar: molar kütle atom ağırlıklarının toplamı olduğu için Σν·M, A·v = 0 ise iki tarafta eşittir; hangi atom ağırlıkları kullanılırsa kullanılsın. İyonlarda elektronun kütlesi de girer (M = Σ atom ağırlığı − z·M<sub>e</sub>) ve onu yük denkliği eşitler. Gazlarda ideal gaz yasası V = nRT/p'dir; molar hacim koşula bağlıdır: 0 °C ve 1 bar'da 22.711, 0 °C ve 1 atm'de 22.414, 25 °C ve 1 bar'da 24.790 L/mol.",
      formula: "ξ = min<sub>i</sub>(n<sub>i</sub>/ν<sub>i</sub>) · n<sub>j</sub> = ν<sub>j</sub>·ξ · V<sub>m</sub> = RT/p",
      formulaNote: "Yüzde verim = gerçek kütle / kuramsal kütle × 100. Gerçek gazlar ideal değerden biraz sapar.",
    },
  ],
  lab: {
    intro:
      "Üç sekmenin üstünde ortak bir <strong>Denklem</strong> paneli durur: <strong>Tepkime</strong> menüsünde 19 hazır tepkime, <strong>Kendi denklemin</strong> kutusunda gerçek bir formül okuyucu (Enter ya da <strong>Uygula</strong>; yük ^ ile yazılır: <code>Fe^3+</code>). Menüden seçim bütün katsayıları 1 yapar. Katsayılar 0–999 arasıdır; + ve − düğmeleri, kutuya yazmak, ↑/↓ tuşları ya da kutuyu yukarı-aşağı sürüklemek değiştirir. Durum satırı <strong>Denk</strong> rozetini yalnız her element ve toplam yük eşitken ve hiçbir katsayı 0 değilken gösterir; yoksa Denk değil, Eksik, İmkânsız ya da Okunamadı yazar. <strong>Atomları say</strong>: atom resmi, <strong>Atom sayımı (ölçülen)</strong> tablosu (Fark sütunu, Yük satırı), <strong>Çözümü göster</strong> ve <strong>Katsayılara uygula</strong>, yükseltgenme basamakları. <strong>Matris yöntemi</strong>: bileşim matrisi ve A·v sütunu, <strong>Adım</strong> kaydırıcısıyla tam kesirli Gauss–Jordan, n, r ve n − r kartları. <strong>Stokiyometri</strong>: kütle kutuları, <strong>Gaz hacmi koşulu</strong>, <strong>Gerçek verim (tartılan)</strong>; sınırlayıcı giren, verim ve kütle korunumu kartları.",
    experiments: [
      {
        title: "Propanı elle denkleştir",
        predict: "C₃H₈ + O₂ → CO₂ + H₂O'da hangi katsayıdan başlarsın? O₂'nin katsayısı kaç çıkar? Bütün katsayıları ikiye katlarsan denklem hâlâ denk midir?",
        do: "Tepkime menüsünden 'C₃H₈ + O₂: propanın yanması'nı seç. Tabloyu oku; sonra sırayla CO₂'yi 3, H₂O'yu 4, O₂'yi 5 yap ve her adımda Fark sütununa bak. En sonda dört kutuyu 2, 10, 6, 8 yap.",
        observe: "Başta C 3 | 1, H 8 | 2, O 2 | 3 ve durum 'C 3 ≠ 1, H 8 ≠ 2, O 2 ≠ 3'. CO₂ = 3 ve H₂O = 4'ten sonra yalnız O kalır: 2 ≠ 10. O₂ = 5 ile bütün farklar 0 olur, rozet Denk. 2, 10, 6, 8 de Denk, ama sayfa 'bütün katsayılar 2'ye bölünür' diye ekler. Yükseltgenme tablosunda C₃H₈ için C −8/3 yazar; elektron kartı 1, 5, 3, 4'te 20 e⁻, 2, 10, 6, 8'de 40 e⁻ gösterir.",
        explain: "C ve H yalnız birer giren ve birer üründe geçtiği için önce onlar sabitlenir; O₂ en sona kalır, çünkü serbest element olarak katsayısı başka hiçbir atomu bozmaz. −8/3 bir ortalamadır: uçtaki iki karbon −3, ortadaki −2. Üç karbonun her biri +4'e çıkar: 3 × (4 + 8/3) = 20 elektron verir; on oksijen atomu ikişer elektron alır: yine 20.",
      },
      {
        title: "Atomlar tamam, yük değil",
        predict: "MnO₄⁻ + Fe²⁺ + 8H⁺ → Mn²⁺ + Fe³⁺ + 4H₂O'da her elementten iki tarafta eşit sayıda var. Denklem denk mi? Değilse kaç Fe²⁺ gerekir?",
        do: "'MnO₄⁻ + Fe²⁺ + H⁺: asidik ortamda'yı seç. H⁺ kutusunu 8, H₂O kutusunu 4 yap; ötekiler 1 kalsın. Tablonun Yük satırını oku. Sonra Fe²⁺ ve Fe³⁺ kutularını birlikte artır.",
        observe: "Bütün element satırlarında Fark 0, ama Yük satırı +9 | +5 ve durum 'Atomlar denk ama yük denk değil: yük +9 ≠ +5'; elektron kartı '—' ve 'yük denk değil' yazar. İki demir kutusu 5 olunca yük +17 = +17 ve rozet Denk. Elektron panelinde 'Mn: +7 → +2, atom başına 5 e⁻ alır (indirgenir)' ve 'Fe: +2 → +3, atom başına 1 e⁻ verir (yükseltgenir)'; aktarılan elektron 5 e⁻.",
        explain: "Yük korunumu elektronların korunumudur: manganın aldığı 5 elektronu beş demir iyonu birer birer verir. Fe²⁺ → Fe³⁺ değişimi iki tarafta aynı demir atomunu sayar; atom satırları eşitken yük satırı her demir için bir birim kayar. İyonik denklemlerde yük ayrı bir korunum satırıdır; Matris yöntemi sekmesinde 'yük' adlı bir satır olarak görünür.",
      },
      {
        title: "Bir denklem, iki tepkime",
        predict: "C + O₂ → CO + CO₂'de 4 madde ama yalnız 2 element var. Çözüm uzayı kaç boyutlu olmalı? 5, 3, 4, 1 denk mi? CH₄ + O₂ → CO₂ için ne beklersin?",
        do: "'C + O₂ → CO + CO₂: iki bağımsız tepkime'yi seç, Matris yöntemi sekmesine geç ve Sona'ya bas. Kartları ve tabanı oku. Katsayıları 5, 3, 4, 1 yap; sonra CO'yu 0'a indir (1, 1, 0, 1). En son 'CH₄ + O₂ → CO₂: eksik ürün'ü seç.",
        observe: "n = 4, r = 2, n − r = 2. RREF x₁ = x₃ + x₄, x₂ = (1/2)·x₃ + x₄ verir; kenar ışınları r₁ = (2, 1, 2, 0), yani 2C + O₂ → 2CO, ve r₂ = (1, 1, 0, 1), yani C + O₂ → CO₂. 5, 3, 4, 1 Denk ve sayfa 'v = 2·r₁ + 1·r₂' yazar. 1, 1, 0, 1'de A·v = 0 ama rozet Eksik. Eksik ürünlü denklemde n = r = 3, n − r = 0, rozet İmkânsız: 'H yalnız girenlerde var'.",
        explain: "Her element bir denklem, her madde bir bilinmeyen getirir; dört bilinmeyene iki denklem iki serbest değişken bırakır. Bu yüzden denkleştirme burada belirsizdir: CO ile CO₂'nin oranını atomlar değil, oksijen miktarı ve sıcaklık seçer. Sıfır boyutta ise tek çözüm v = 0'dır: hiçbir pozitif katsayı soldaki hidrojeni sağda bulamaz.",
      },
      {
        title: "Hafif olan mı önce biter?",
        predict: "Termit karışımında 50 g Fe₂O₃ ve 25 g Al var. Kütlesi küçük olan Al mi önce biter? Kaç gram demir oluşur, ne kadar giren artar?",
        do: "'Fe₂O₃ + Al: termit'i seç ve Stokiyometri sekmesine geç; kütleler 50 ve 25 g gelir. Girenler tablosunun n/ν sütununu ve kartları oku. Sonra Gerçek verim (tartılan) kutusuna 30.5 yaz.",
        observe: "n/ν: Fe₂O₃ 0.3131, Al 0.4633 mol; sınırlayıcı Fe₂O₃, ξ = 0.3131 mol. Kuramsal verim Fe 34.97 g (0.6262 mol), Al₂O₃ 31.93 g, artan Al 8.103 g; giren 75.00 g = çıkan 75.00 g, fark 0.000 g. 30.5 g ile yüzde verim 87.2 %, kayıp 4.472 g. Katsayılar 1 iken Σν·M kartı 186.669'a karşı 157.806 g/mol der; hesap en küçük tam sayılı çözümle (1, 2 → 1, 2) yapılır.",
        explain: "Tepkime gramla değil mol ile tartar: bir mol Fe₂O₃ iki mol Al ister. 50 g Fe₂O₃ için 2 × 0.3131 mol × 26.982 g/mol = 16.90 g Al yeter; 25 g'ın 8.10 g'ı artar. Sınırlayıcıyı n/ν'nün en küçüğü seçer, kütle değil. Çıkan kütlenin girene eşit çıkması şans değildir: denk denklemde Σν·M iki tarafta da 213.651 g/mol'dür.",
      },
    ],
  },
  wow: [
    {
      title: "Kütle aslında azıcık azalır",
      body:
        "Bir mol metan yandığında yaklaşık 890 kJ ısı açığa çıkar. Einstein'ın E = mc² bağıntısına göre bu enerji Δm = E/c² ≈ 9.9·10⁻¹² kg, yani yaklaşık 10 nanogramlık bir kütleye karşılık gelir: 80 gramlık CH₄ + 2O₂ karışımının on milyarda biri mertebesi (1.2·10⁻¹⁰). Kimyacının terazisi için kütle korunur; tam olarak korunan kütle-enerjidir. Güneş'te hidrojeni helyuma çeviren füzyonda bu oran binde 7'ye çıkar.",
    },
    {
      title: "1028 katsayılı canavar",
      body:
        "Sayfanın 'zor örnek'i: 10 K₄[Fe(CN)₆] + 122 KMnO₄ + 299 H₂SO₄ → 162 KHSO₄ + 5 Fe₂(SO₄)₃ + 122 MnSO₄ + 60 HNO₃ + 60 CO₂ + 188 H₂O. Katsayıların toplamı 1028, her iki tarafta 2995 atom var. Demir (+2 → +3), karbon (+2 → +4) ve azot (−3 → +5) aynı anda yükseltgenir, mangan (+7 → +2) indirgenir: 610 elektron el değiştirir. Matris yöntemi 8 × 9'luk matrisi 43 adımda çözer ve x₉ = 188 seçer, çünkü 188 bütün kesirlerin paydalarının en küçük ortak katıdır.",
    },
    {
      title: "22.4 litre artık standart değil",
      body:
        "Okulda ezberlenen '1 mol gaz 22.4 L' değeri 0 °C ve 1 atm (101.325 kPa) içindir. IUPAC 1982'de standart basıncı yuvarlak 1 bar'a (100 kPa) çekti; ideal gazın molar hacmi böylece 22.711 L/mol oldu. Fizik değişmedi, yalnızca tanım değişti: iki değerin oranı tam 1.01325'tir. Sayfanın Gaz hacmi koşulu menüsü üç tanımı yan yana koyar (25 °C ve 1 bar'da 24.790 L/mol); bir kitaptan aldığın sayının hangi koşula ait olduğunu sormak gerekir.",
    },
  ],
  worked: {
    title: "Permanganat ve hidroklorik asitten klor gazı",
    prompt:
      "KMnO₄ derişik HCl ile klor gazı verir: KMnO₄ + HCl → KCl + MnCl₂ + Cl₂ + H₂O. Denklemi yarı tepkime yöntemiyle denkleştir, bileşim matrisiyle denetle ve 15.80 g KMnO₄ ile 36.50 g HCl'den 0 °C ve 1 bar'da kaç litre Cl₂ çıkacağını bul. Atom ağırlıkları (g/mol): K 39.098, Mn 54.938, O 15.999, H 1.008, Cl 35.45.",
    steps: [
      "Basamakları yaz: KMnO₄'te Mn +7 (K +1, dört O toplam −8), MnCl₂'de +2; her Mn 5 e⁻ alır. HCl'de Cl −1, Cl₂'de 0; her Cl 1 e⁻ verir. K, H ve O'nun basamağı değişmez.",
      "Yarı tepkimeler (asidik ortam): MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O ve 2Cl⁻ → Cl₂ + 2e⁻. Elektronları eşitlemek için EKOK(5, 2) = 10: birinciyi 2, ikinciyi 5 ile çarp ve topla: 2MnO₄⁻ + 16H⁺ + 10Cl⁻ → 2Mn²⁺ + 5Cl₂ + 8H₂O.",
      "Seyirci iyonları geri koy: 2 KCl ve 2 MnCl₂ için 2 + 4 = 6 Cl⁻ daha gerekir; H⁺ ile Cl⁻ birlikte 16 HCl olarak gelir: 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂ + 8H₂O. 16 Cl'nin yalnız 10'u yükseltgenir; HCl hem indirgen hem asittir.",
      "Matrisle denetle: 5 element × 6 madde, rank 5, çözüm uzayı 1 boyutlu; denk biçim ölçek dışında tektir. Sayfanın 15 adımlık eliminasyonu x₁ = (1/4)·x₆, x₂ = 2·x₆, x₃ = x₄ = (1/4)·x₆, x₅ = (5/8)·x₆ verir; x₆ = 8 seçilince v = (2, 16, 2, 2, 5, 8) ve A·v = 0.",
      "Kütleden hacme: M(KMnO₄) = 158.032, M(HCl) = 36.458 g/mol. n(KMnO₄) = 0.09998 mol, n/ν = 0.04999; n(HCl) = 1.001 mol, n/ν = 0.06257. KMnO₄ sınırlayıcı, ξ = 0.04999 mol. Cl₂ = 5ξ = 0.2499 mol = 17.72 g; V = 0.2499 mol × 22.711 L/mol = 5.677 L. Harcanan HCl 16ξ = 0.7998 mol (29.16 g), artan 7.340 g.",
    ],
    result:
      "2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂ + 8H₂O; 10 elektron aktarılır. 15.80 g KMnO₄ ve 36.50 g HCl'den 17.72 g klor çıkar: 0 °C ve 1 bar'da 5.677 L (1 atm'de 5.602 L, 25 °C'de 6.196 L); 7.340 g HCl artar, 52.30 g girer ve 52.30 g çıkar. Sayfada 'KMnO₄ + HCl: klor gazı'nı seçip aynı sayıları üç sekmede de okuyabilirsin.",
  },
  misconceptions: [
    {
      myth: "Denkleştirirken formüldeki küçük sayıları (alt indisleri) de değiştirebilirim.",
      truth:
        "Alt indis maddenin kimliğidir: H₂O'yu H₂O₂ yapmak suyu hidrojen peroksite çevirir. Yalnız katsayılar değişir. Matematik bile tek başına yetmez: sayfadaki 'H₂O₂ → H₂O + O₂ + H₂' denklemi 3H₂O₂ → 2H₂O + 2O₂ + H₂ diye 'denk' yazılabilir, ama hidrojen peroksit bozunurken hidrojen gazı vermez. Denklem, gerçekte olan tepkimenin kaydıdır.",
    },
    {
      myth: "Denkleştirmek, iki tarafın kütlelerini eşitlemek demektir.",
      truth:
        "Sıra tersidir: her element ayrı ayrı eşitlenince kütle eşitliği kendiliğinden gelir, çünkü molar kütleler atom ağırlıklarının toplamıdır. Tek bir kütle eşitliği, element sayısı kadar koşulun yerini tutamaz. Sayfada H₂SO₄ + NaOH'u bütün katsayılar 1 iken bırak: Stokiyometri sekmesindeki Σν·M kartı girenler 138.069, ürünler 160.051 g/mol der; 1, 2, 1, 2'de iki taraf da 178.066 g/mol olur.",
    },
    {
      myth: "Her kimyasal denklemin tek bir denk biçimi vardır.",
      truth:
        "Bu, çözüm uzayı bir boyutluysa doğrudur (katları saymazsak). C + O₂ → CO + CO₂'de uzay iki boyutludur: 2C + O₂ → 2CO ile C + O₂ → CO₂'nin eksi olmayan her birleşimi, örneğin 3C + 2O₂ → 2CO + CO₂ ya da 5C + 3O₂ → 4CO + CO₂, denktir. Hangisinin gerçekleştiğini atom sayımı değil, ürünlerin ölçülen oranı söyler.",
    },
    {
      myth: "Kütlesi küçük olan giren önce biter.",
      truth:
        "Tepkime maddeleri katsayılara göre mol mol harcar; sınırlayıcıyı n/ν'nün en küçüğü belirler. Termitte 25 g Al, 50 g Fe₂O₃'ten hafiftir ama biten Fe₂O₃'tür: n/ν 0.3131 mol'e karşı 0.4633 mol. Ağır bir molekülün bir molü çok gram tutar; gram sayısı tek başına bir şey söylemez.",
    },
  ],
  glossary: [
    { term: "Stokiyometri", definition: "Tepkimeye giren ve çıkan maddelerin miktarları arasındaki nicel ilişkilerin hesabı; adı Yunanca 'öğe' ve 'ölçü' sözcüklerinden gelir." },
    { term: "Bileşim matrisi (A)", definition: "Satırları elementler (ve gerekirse yük), sütunları maddeler olan, girenler için artı, ürünler için eksi atom sayılarını tutan tablo." },
    { term: "Rank", definition: "Bir matrisin doğrusal bağımsız satır (ya da sütun) sayısı; eliminasyonda pivot sayısına eşittir." },
    { term: "Sıfır uzayı (çekirdek)", definition: "A·v = 0'ı sağlayan bütün v vektörlerinin kümesi; boyutu sütun sayısı eksi rank'tır ve denk katsayıların hepsi bu uzaydadır." },
    { term: "Yükseltgenme basamağı", definition: "Bağ elektronlarının hepsi daha elektronegatif atoma verilmiş sayılınca bir atoma düşen resmî yük; elektron alışverişini saymak için kullanılır." },
    { term: "Yarı tepkime", definition: "Bir redoks tepkimesinin yalnız yükseltgenme ya da yalnız indirgenme kısmı; elektronlar madde gibi yazılır (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O)." },
    { term: "Sınırlayıcı giren", definition: "Mol sayısının katsayısına oranı (n/ν) en küçük olan, bu yüzden ilk tükenen ve ürün miktarını belirleyen giren." },
    { term: "Tepkime ilerlemesi (ξ)", definition: "Tepkimenin kaç 'mol tepkime' yürüdüğü; her madde ν·ξ mol harcanır ya da oluşur, tam dönüşümde ξ = min(n/ν)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede denkleştirme bir bulmacadır; üniversitede bir <strong>doğrusal cebir</strong> problemi ve bir muhasebe ilkesidir. <strong>Genel Kimya</strong>'da stokiyometri, sınırlayıcı giren ve redoks denkleştirme ilk haftaların konusudur. <strong>Analitik Kimya</strong>'da aynı hesaplar ölçüme döner: permanganatla demir tayininde MnO₄⁻ + 5Fe²⁺ + 8H⁺ oranı, büretten harcanan her mililitreyi demir miligramına çevirir; KMnO₄ kendi indikatörüdür, ilk fazla damla çözeltiyi pembeye boyar. <strong>Lineer Cebir</strong> dersinde A·v = 0'ın çözüm kümesi bir alt uzaydır; boyutunu rank–sıfırlık teoremi verir, tabanını sayfanın kullandığı indirgenmiş basamak biçimi (RREF) yazar.",
      "<strong>Kimya Mühendisliği</strong>'nin temel derslerinden kütle ve enerji denkliklerinde bir reaktöre giren ve çıkan akımlar element element ya da tepkime ilerlemesi ξ ile yazılır. Kaç bağımsız tepkime gerektiğini yine n − rank A söyler: C, O₂, CO ve CO₂ için iki. Yüksek fırınların Boudouard tepkimesi C + CO₂ → 2CO yeni bir tepkime değil, sayfadaki iki ışının farkıdır (r₁ − r₂). <strong>Fizikokimya</strong>'da ξ'nin nerede durduğunu sınırlayıcı giren değil, kimyasal denge belirler. Biyokimya ve sistem biyolojisinde binlerce tepkimeli metabolik ağlar bir <em>stokiyometrik matris</em> S ile yazılır ve kararlı durumda akılar S·v = 0'ı sağlar: aynı sıfır uzayı fikri, bu kez hücre ölçeğinde. Her tepkime atomları koruduğu için A·S = 0'dır.",
    ],
    topics: ["Rank–sıfırlık teoremi", "Stokiyometrik matris ve tepkime ağları", "Bağımsız tepkime sayısı", "Tepkime ilerlemesi (ξ)", "Kütle denklikleri", "Kimyasal denge", "Redoks titrasyonları", "Metabolik akı analizi"],
  },
  quiz: [
    {
      question: "C + O₂ → CO + CO₂ denkleminde 4 madde ama yalnız 2 element var; bileşim matrisinin rankı en fazla 2'dir. Bu ne demektir?",
      options: ["Denklem imkânsızdır", "Denk biçim ölçek dışında tektir", "Çözüm uzayı en az 2 boyutludur; tek bir denk biçim yoktur", "Katsayılar kesirli olmak zorundadır"],
      answer: 2,
      explanation: "Rank–sıfırlık: boyut = n − r = 4 − 2 = 2. İki bağımsız tepkime (2C + O₂ → 2CO ve C + O₂ → CO₂) vardır ve eksi olmayan her birleşimleri denktir. Hangi oranın gerçekleştiğini oksijen miktarı ve sıcaklık seçer; atom sayımı söyleyemez.",
    },
    {
      question: "16 g CH₄ (M = 16.043 g/mol) ile 48 g O₂ (M = 31.998 g/mol) yakılıyor: CH₄ + 2O₂ → CO₂ + 2H₂O. Hangisi sınırlayıcıdır?",
      options: ["CH₄, çünkü kütlesi daha küçük", "O₂, çünkü n/ν oranı daha küçük", "İkisi aynı anda biter", "Kütleler verilince sınırlayıcı belirlenemez"],
      answer: 1,
      explanation: "n(CH₄) = 0.9973 mol, n(O₂) = 1.500 mol. Katsayılara bölünce 0.9973 ve 0.7500: O₂ önce biter, ξ = 0.7500 mol. 33.01 g CO₂ ve 27.02 g H₂O oluşur, 3.967 g CH₄ artar; 64.00 g girer, 64.00 g çıkar. Sayfanın Stokiyometri sekmesi açılışta tam bu durumu gösterir.",
    },
    {
      question: "3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O tepkimesinde toplam kaç elektron aktarılır?",
      options: ["2 e⁻", "3 e⁻", "6 e⁻", "8 e⁻"],
      answer: 2,
      explanation: "Her Cu 0'dan +2'ye çıkar: 3 × 2 = 6 e⁻ verilir. 8 azotun yalnız NO'ya giden 2'si +5'ten +2'ye iner: 2 × 3 = 6 e⁻ alınır; öteki 6 azot nitratta +5 kalır. Nitrik asit, KMnO₄ + HCl'deki HCl gibi iki iş görür: hem yükseltgen hem asit. Sayfada 'Cu + seyreltik HNO₃'ü seçip Çözümü göster'e basınca çözüm kartı 6 e⁻ yazar.",
    },
  ],
  next: [
    { href: "asit-baz-titrasyonu.html", title: "Asit-Baz Titrasyonu", why: "Stokiyometri çözeltide: H₂SO₄ + NaOH (diprotik) seçeneğinde eşdeğerlik noktası, denklemdeki '2' yüzünden asidin iki katı mol NaOH'ta gelir." },
    { href: "elektrokimya.html", title: "Elektrokimya", why: "Yarı tepkimeleri iki ayrı kaba koy: Daniell pilinde çinkonun verdiği elektronlar telden bakıra akar ve voltmetre bu alışverişin itici gücünü ölçer." },
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri", why: "Determinant sıfıra inince bir 2×2 matris düzlemi bir çizgiye ezer: bir doğrultudaki bütün vektörler sıfıra gider. Sıfır uzayı ve rankın gözle görülen hâli." },
    { href: "fotosentez-solunum.html", title: "Fotosentez ve Hücresel Solunum", why: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O'yu burada denkleştirdin; hücrenin onu Krebs döngüsü ve ATP üretimiyle nasıl adım adım yürüttüğünü orada izle." },
  ],
  sources: [
    { title: "OpenStax · Chemistry 2e, 4.1 Writing and Balancing Chemical Equations", url: "https://openstax.org/books/chemistry-2e/pages/4-1-writing-and-balancing-chemical-equations", note: "Atom sayım tablolarıyla denkleştirme, alt indisin neden değiştirilemeyeceği, iyonik ve net iyonik denklemler; bölümün devamı stokiyometri ve verim (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Chemical equation", url: "https://en.wikipedia.org/wiki/Chemical_equation", note: "Denkleştirme bölümü: deneme yöntemi, homojen doğrusal sistem, bileşim matrisinin çekirdeği (sıfır uzayı) ve yükün ek satır olarak eklenmesi (İngilizce)." },
    { title: "L. R. Thorne · An Innovative Approach to Balancing Chemical-Reaction Equations (arXiv)", url: "https://arxiv.org/abs/1110.4321", note: "The Chemical Educator'da 2010'da yayımlanan makalenin arşiv sürümü: katsayıları sıfır uzayından bulmanın pratik bir yolu (İngilizce)." },
    { title: "Wikipedia · Stoichiometry", url: "https://en.wikipedia.org/wiki/Stoichiometry", note: "Terimin kökeni (Richter, 1792), sınırlayıcı giren ve yüzde verim, tepkime ilerlemesi ve stokiyometrik matris (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
