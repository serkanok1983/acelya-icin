window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["atom-orbitalleri"] = {
  slug: "atom-orbitalleri",
  title: "Atom Orbitalleri: Elektronun Olasılık Haritası",
  field: "Kimya",
  level: "Lise",
  minutes: 30,
  tagline:
    "Elektron çekirdeğin çevresinde dönmez; bir dalga gibi titreşir ve yalnızca belirli biçimlere izin verilir. Küre, dambıl, yonca: bu biçimler periyodik tablodan kimyasal bağa kadar her şeyi düzenler.",
  hook: "Hidrojenin tek elektronu nerede diye sorsan, kuantum mekaniği sana bir adres değil bir harita verir. Haritanın en koyu noktası çekirdeğin tam üstüdür; ama elektronu en sık bulacağın uzaklık 52.9 pikometredir, yani Bohr'un 1913'te çizdiği ilk yörüngenin yarıçapı. Elektron dönmüyorsa, o sayı oraya nereden geldi?",
  bigIdea:
    "Orbital bir yol değil, elektronun <strong>dalga fonksiyonudur</strong>: karesi elektronun nerede bulunabileceğinin olasılık haritasını verir; biçimini n, ℓ ve mℓ sayıları, içindeki sessiz yüzeyleri de ℓ açısal ve n − ℓ − 1 radyal düğüm belirler.",
  story: [
    "1911'de Ernest Rutherford atomun ortasında minicik, ağır, artı yüklü bir çekirdek bulunduğunu gösterince fizik bir çıkmaza girdi. Elektronlar çekirdeğin çevresinde gezegenler gibi dönüyorsa, klasik elektromanyetizmaya göre sürekli ışık yayıp enerji kaybetmeli ve saniyenin çok küçük bir kesrinde çekirdeğe spiral çizerek düşmeliydi. Oysa atomlar milyarlarca yıldır yerinde duruyor. 1913'te genç Danimarkalı fizikçi Niels Bohr cüretkâr bir kural koydu: elektron yalnızca belirli 'izinli' yörüngelerde dolanabilir, bu yörüngelerde ışık yaymaz; ışığı ancak bir yörüngeden ötekine atlarken yayar. Model, hidrojenin renkli spektrum çizgilerinin dalga boylarını şaşırtıcı bir doğrulukla verdi ve en içteki yörüngenin yarıçapını yaklaşık 0.053 nanometre buldu. Bohr 1922'de Nobel aldı. Ama kural bir açıklama değil, bir buyruktu: neden yalnızca bu yörüngeler? Üstelik model iki elektronlu helyumda bile tökezliyordu.",
    "İlk ipucu 1924'te Louis de Broglie'nin doktora tezinden geldi: ışık hem dalga hem parçacık gibi davranıyorsa, elektron da bir dalga olabilirdi; dalga boyu λ = h/p. Bu gözle bakınca Bohr'un izinli yörüngeleri, çevresine tam sayıda dalga boyu sığanlardı; tıpkı bir gitar telinde yalnızca belirli titreşimlerin kalıcı olabilmesi gibi. 1927'de Davisson ve Germer elektronların bir kristalden ışık gibi kırınıma uğradığını gösterdi; de Broglie 1929'da Nobel aldı. Bu arada Erwin Schrödinger elektron dalgasının denklemini yazdı; denklemi 1925'in sonunda İsviçre'nin Arosa kasabasında geçirdiği bir tatilde bulduğu anlatılır. 1926'da yayımladığı çözüm, hidrojenin enerji seviyelerini hiçbir yörünge varsaymadan verdi. Üstelik n, ℓ ve m sayıları elle konmamıştı: üç boyutta kendi üzerine tutarlı biçimde kapanması gereken bir dalganın matematiğinden kendiliğinden çıkıyorlardı.",
    "Peki dalgalanan ne? Schrödinger elektronun yükünün bulut gibi yayıldığını düşünüyordu. 1926'da Max Born, çarpışmalar üzerine yazdığı bir makalede başka bir yorum önerdi: dalga fonksiyonu elektronun nerede olduğunu değil, nerede bulunabileceğinin olasılığını söyler. İşin ilginç yanı, makalenin ana metninde olasılığı dalganın kendisi belirliyordu; baskı sırasında eklenen bir dipnot bunu düzeltti: olasılık, dalga fonksiyonunun büyüklüğünün karesiyle orantılıdır. Bugün <strong>Born kuralı</strong> denen bu cümle kuantum mekaniğinin temel taşlarından biri oldu ve Born'a 1954'te Nobel getirdi. Herkes ikna olmadı: Einstein 1926'nın sonunda Born'a yazdığı bir mektupta Tanrı'nın zar attığına inanmadığını söyledi. Ders kitaplarındaki her orbital bulutu, aslında Born'un o dipnotunun bir çizimidir.",
    "Elektronların bu dalga biçimlerine nasıl dağıldığını 1925'te Wolfgang Pauli söyledi: bir atomda iki elektronun bütün kuantum sayıları aynı olamaz. Pauli bunun için iki değerli, anlamı belirsiz bir dördüncü sayıya ihtiyaç duydu; aynı yıl George Uhlenbeck ile Samuel Goudsmit bu sayının elektronun kendi iç açısal momentumu, yani <strong>spini</strong> olduğunu önerdi. Böylece her orbitale en çok iki zıt spinli elektron sığıyordu ve kabukların 2, 8, 18, 32 kapasitesi bir hesabın sonucu hâline geldi; periyodik tablonun 2, 8, 8, 18, 18, 32 elementlik satırları da bu kapasitelerden ve dolum sırasından okunur oldu. Pauli bu ilke için 1945'te Nobel aldı. 'Orbital' kelimesi ise 1932'de Robert Mulliken'in önerisiyle, 'tek elektronlu yörüngemsi dalga fonksiyonu' ifadesinin kısaltması olarak doğdu. Ad yörüngeyi çağrıştırsa da anlamı tam tersidir: belirli bir yol yok, yalnızca bir olasılık haritası var.",
  ],
  core: [
    {
      heading: "Yörünge değil, olasılık haritası",
      body: "Orbital, elektronun izlediği bir yol değildir; elektronun durumunu betimleyen bir <strong>dalga fonksiyonudur</strong> (ψ). ψ uzayın her noktasına bir sayı atar; bu sayının karesi |ψ|², o noktanın çevresindeki küçük bir hacimde elektron bulma olasılığını verir. Hidrojenin 1s durumunda yoğunluk çekirdeğin tam üstünde en büyüktür ve dışa doğru üstel olarak azalır, ama hiçbir uzaklıkta tam sıfır olmaz. Bir ölçümde elektronu tek bir noktada bulursun; binlerce ölçümü üst üste koyarsan bulut ortaya çıkar. Sayfadaki 3B çizim tam olarak budur: her nokta |ψ|²'den rastgele çekilmiş bir olası konumdur. Ders kitaplarındaki keskin kenarlı balonlar, olasılığın örneğin %90'ını içine alan seçilmiş bir yüzeydir; elektronu içeride tutan bir duvar değildir.",
      formula: "P = |ψ|² · dV",
      formulaNote:
        "Küçük bir dV hacminde elektron bulma olasılığı. Bütün uzay üzerinden toplam 1 olmalıdır: elektron bir yerdedir.",
    },
    {
      heading: "Dört sayıyla bir adres",
      body: "Schrödinger denkleminin hidrojen çözümü her durumu üç tam sayıyla etiketler. <strong>Baş kuantum sayısı</strong> n (1, 2, 3 …) kabuğu, enerjiyi ve büyüklüğü belirler. <strong>Açısal kuantum sayısı</strong> ℓ, 0'dan n − 1'e kadar değer alır ve biçimi söyler: ℓ = 0, 1, 2, 3 sırasıyla s, p, d, f. <strong>Manyetik kuantum sayısı</strong> mℓ, −ℓ'den +ℓ'ye kadar gider ve aynı biçimin uzaydaki yönelimlerini sayar: p'de 3, d'de 5, f'de 7. Dördüncü sayı olan <strong>spin</strong> mₛ, orbitalin değil elektronun özelliğidir ve yalnızca +½ ya da −½ olabilir. Bir n kabuğunda n² orbital, 2n² elektron yeri vardır: 2, 8, 18, 32.",
      formula: "ℓ = 0 … n − 1 · m<sub>ℓ</sub> = −ℓ … +ℓ · m<sub>s</sub> = ±½",
      formulaNote:
        "Bir alt kabukta 2ℓ + 1 orbital bulunur. 1p ya da 2d yoktur, çünkü ℓ her zaman n'den küçüktür.",
    },
    {
      heading: "Düğümler: dalganın sustuğu yüzeyler",
      body: "Gitar telinin hiç kıpırdamayan noktaları gibi, orbitallerin de ψ'nin sıfır olduğu yüzeyleri vardır; bunlara <strong>düğüm</strong> denir ve orada elektron bulma olasılığı sıfırdır. İki tür düğüm vardır. <strong>Açısal düğümler</strong> çekirdekten geçen düzlemler ya da konilerdir, p orbitalinin iki lobunu ayıran düzlem gibi; sayıları ℓ'dir. <strong>Radyal düğümler</strong> çekirdeği saran iç içe kürelerdir: 2s'de bir, 3s'te iki tane; sayıları n − ℓ − 1'dir. ψ bir düğümden geçerken işaret değiştirir; orbital resimlerindeki iki renk bu işareti gösterir. 'Elektron düğümden nasıl geçiyor?' sorusu, elektronu loblar arasında koşan bir top sanmaktan doğar: orbital tek bir duran dalgadır, iki lob aynı dalganın iki yarısıdır.",
      formula: "radyal = n − ℓ − 1 · açısal = ℓ · toplam = n − 1",
      formulaNote:
        "3d: 0 radyal + 2 açısal. 4s: 3 radyal + 0 açısal. Toplam her zaman n − 1.",
    },
    {
      heading: "Biçim nereden gelir: açısal kısım",
      body: "Hidrojenin dalga fonksiyonu iki parçanın çarpımına ayrılır: uzaklığa bağlı <strong>radyal kısım</strong> R(r) ve yöne bağlı <strong>açısal kısım</strong> Y(θ, φ). Lobların açısal düzenini ve yönünü Y belirler; R ise orbitalin ne kadar büyük olduğunu ve lobları iç içe parçalara bölen radyal düğümleri. s için Y sabittir, bu yüzden her yön eşittir. p<sub>z</sub> için Y, cos θ ile orantılıdır: z ekseninin yukarısında artı, aşağısında eksi, xy düzleminde sıfır. d<sub>z²</sub> için 3cos²θ − 1 ile orantılıdır ve cos²θ = 1/3'te, yani θ ≈ 54.7° ile θ ≈ 125.3°'de sıfır olur: z ekseninin iki ucunu saran iki koni, düğüm yüzeyleridir. Sayfadaki bulut ikisini birlikte gösterir, çünkü noktalar tam |ψ|² = R²·Y² dağılımından çekilir: lobların düzenini ve yönünü Y'den, bulutun boyunu ve 2s ile 3s'teki iç içe katmanları R'den görürsün.",
      formula: "ψ<sub>nℓm</sub>(r, θ, φ) = R<sub>nℓ</sub>(r) · Y<sub>ℓm</sub>(θ, φ)",
      formulaNote:
        "θ z ekseninden ölçülen açı, φ xy düzlemindeki açı. 1s, 2s ve 3s aynı Y'yi paylaşır; yalnızca R'leri farklıdır.",
    },
    {
      heading: "Dolum kuralları: Aufbau, Pauli, Hund",
      body: "Çok elektronlu bir atomda elektronlar orbitalleri en alttan başlayarak doldurur; buna <strong>Aufbau</strong> (Almanca 'inşa') ilkesi denir. Hidrojende enerji yalnızca n'ye bağlıdır, Eₙ = −13.6 eV/n². Başka elektronlar devreye girince iç elektronlar çekirdeği perdeler; çekirdeğe daha çok sokulan s elektronları daha sıkı tutulur. Sonuç: 2s 2p'den, 4s 3d'den önce dolar. <strong>Pauli ilkesi</strong> her orbitale en çok iki elektron koyar ve bunların spinleri zıt olmalıdır. <strong>Hund kuralı</strong>, eş enerjili orbitallerde elektronların önce tek tek ve aynı spinle yerleştiğini söyler: azotun üç 2p elektronu üç ayrı orbitale dağılır. Aufbau sırası yaklaşıktır; krom ([Ar] 3d⁵ 4s¹) ve bakır ([Ar] 3d¹⁰ 4s¹) bilinen istisnalardır.",
      formula:
        "Sıra: önce küçük n + ℓ, eşitse küçük n → 1s 2s 2p 3s 3p 4s 3d 4p 5s …",
      formulaNote:
        "Alt kabuk kapasitesi 2(2ℓ + 1): s 2, p 6, d 10, f 14. 4s (4 + 0 = 4), 3d'den (3 + 2 = 5) önce gelir.",
    },
  ],
  lab: {
    intro:
      "Üç sekme (<strong>s Orbitalleri</strong>, <strong>p Orbitalleri</strong>, <strong>d Orbitalleri</strong>) bir aile seçer; altındaki küçük düğmeler tek tek orbitalleri: 1s, 2s, 3s; 2p<sub>z</sub>, 2p<sub>x</sub>, 2p<sub>y</sub>; 3d<sub>z²</sub>, 3d<sub>x²−y²</sub>, 3d<sub>xy</sub>, 3d<sub>xz</sub>, 3d<sub>yz</sub>. Her nokta, hidrojenin gerçek olasılık yoğunluğundan (|ψ|²) rastgele çekilmiş olası bir elektron konumudur; turkuaz noktalar <strong>Pozitif faz (+)</strong>, mor noktalar <strong>Negatif faz (−)</strong>. Her orbital ekrana sığacak biçimde ölçeklenir; gerçek boyu sağ alttaki ölçek çubuğu verir (a₀ = 52.9 pm, Bohr yarıçapı). Gösterge <strong>n (baş)</strong>, <strong>ℓ (açısal)</strong>, <strong>mℓ (manyetik)</strong>, <strong>radyal düğüm</strong> ve <strong>açısal düğüm</strong> değerlerini, altında da toplam düğüm sayısını yazar. Tuvali sürükleyerek döndürürsün; z ekseni ekranda hiç ters dönmez. Ctrl (Mac'te ⌘) basılıyken fare tekerleği yakınlaştırır. Düğmeler: <strong>Otomatik döndür</strong>, <strong>Sıfırla</strong>, <strong>Üstten görünüm (xy)</strong> (x sağa, y yukarı, z sana doğru), <strong>Yandan görünüm (xz)</strong> (x sağa, z yukarı) ve <strong>Kesit</strong>. Kesit yalnızca çekirdekten geçen, ekrana paralel ince bir dilimdeki noktaları gösterir; bulutun içindeki katmanları ve düğümleri görmenin yolu budur. En alttaki <strong>Enerji Seviyesi Diyagramı</strong>, <strong>Çok elektronlu atom</strong> ve <strong>Hidrojen (tek elektron)</strong> düğmeleriyle iki sıralama arasında geçer ve seçtiğin orbitalin alt kabuğunu vurgular.",
    experiments: [
      {
        title: "Bulutun içindeki boş kabuklar: 1s, 2s, 3s",
        predict:
          "1s, 2s ve 3s'in üçü de küreseldir. Öyleyse içleri de aynı mı? 2s'in içinde elektronun hiç bulunmadığı bir yüzey var mı; varsa kaç tane, nerede?",
        do: "<strong>s Orbitalleri</strong> sekmesinde sırayla <strong>1s</strong>, <strong>2s</strong> ve <strong>3s</strong> düğmelerine bas; her birinde göstergeyi ve ölçek çubuğunu oku. Sonra <strong>Kesit</strong>'i açıp üçüne yeniden bak.",
        observe:
          "Bütün bulutta 1s, merkezde yoğunlaşıp dışa doğru seyrelen turkuaz bir küredir; 2s'de büyük mor bir bulutun ortasında, mor noktaların kısmen örttüğü turkuaz bir çekirdek seçilir. Kesitte fark netleşir: 2s'de iki bölge arasında r = 2a₀'da boş bir halka; 3s'te ≈1.9a₀ ve ≈7.1a₀'da iki boş halka ve renkleri dönüşümlü üç katman (turkuaz, mor, turkuaz). Her düğümü kesikli bir çember ve 'düğüm 2a₀' gibi bir etiket işaretler; 3s'in iç düğümü küçüktür, merkeze yakından bak. Göstergede radyal düğüm 0, 1, 2; açısal düğüm hep 0. Ölçek çubuğunun gösterdiği uzunluk her adımda büyür.",
        explain:
          "Bu boş yüzeyler <strong>radyal düğümlerdir</strong>: R(r)'nin sıfır olduğu, çekirdeği saran küreler; sayıları n − ℓ − 1. ψ düğümden geçerken işaret değiştirir, katmanların rengi bu yüzden değişir. Orbital n ile büyür: 2s'in olasılığının yalnızca ≈%5'i iç bölgededir, 3s'inkinin ≈%89'u en dış katmandadır. Bütün bulutta düğümler zor seçilir, çünkü ekran öndeki ve arkadaki noktaları üst üste düşürür; kesit bu örtüşmeyi kaldırır.",
      },
      {
        title: "p üçlüsü: tek düğüm düzlemi ve '±1'in anlamı",
        predict:
          "2p<sub>z</sub>, 2p<sub>x</sub> ve 2p<sub>y</sub> arasında geçince göstergede hangi sayılar değişir? z ekseni boyunca uzanan 2p<sub>z</sub>'nin tam ortasından, xy düzleminden ince bir dilim alırsan ne kalır?",
        do: "<strong>p Orbitalleri</strong> sekmesini aç, <strong>Yandan görünüm (xz)</strong>'e bas ve sırayla 2p<sub>z</sub>, 2p<sub>x</sub>, 2p<sub>y</sub>'ye tıkla. Sonra 2p<sub>z</sub>'ye dön, <strong>Üstten görünüm (xy)</strong>'e bas ve <strong>Kesit</strong>'i aç.",
        observe:
          "Üçünde de n = 2, ℓ = 1, radyal düğüm 0, açısal düğüm 1. mℓ ise 2p<sub>z</sub>'de 0 (kesin değer), 2p<sub>x</sub> ve 2p<sub>y</sub>'de '±1' ve altında '+1 ve −1 karışımı'. Yandan görünümde 2p<sub>z</sub> dikeydir: turkuaz lob yukarıda, mor lob aşağıda, aralarında boş bir bant. 2p<sub>x</sub> yataydır, turkuaz lob sağda. 2p<sub>y</sub> ise tam bakış doğrultusunda uzandığı için iki lob üst üste biner ve karışık renkli tek bir yuvarlak leke görünür. Üstten kesitte ekran neredeyse boşalır: yandan kesitte binlerce nokta varken burada çekirdeğin çevresinde yalnızca birkaç yüz noktalık soluk, iki renkli bir leke kalır.",
        explain:
          "Her p orbitalinin tek açısal düğümü, lob eksenine dik olan düzlemdir: 2p<sub>z</sub> için xy, 2p<sub>x</sub> için yz, 2p<sub>y</sub> için xz. Üstten kesit tam xy düzlemini aldığı için 2p<sub>z</sub>'nin düğüm düzlemine denk gelir; orada ψ = 0'dır. Kalan noktalar dilimin ince ama sıfır olmayan kalınlığından gelir: düğüm düzleminin hemen üstündeki turkuaz ve hemen altındaki mor noktalar da dilime girer. 2p<sub>x</sub> ve 2p<sub>y</sub> gerçek sayılarla yazılabilen orbitallerdir ve mℓ = +1 ile −1 durumlarının karışımıdır; tek bir mℓ değerleri yoktur. Kimyacılar bu biçimleri tercih eder, çünkü lobları eksenlere oturur ve bağları anlatmayı kolaylaştırır.",
      },
      {
        title: "d ailesi: yonca, dönmüş yonca, halka",
        predict:
          "3d<sub>x²−y²</sub> ile 3d<sub>xy</sub> aynı biçimde mi, lobları nerede durur? 3d<sub>z²</sub>'nin düğümleri de düzlem mi?",
        do: "<strong>d Orbitalleri</strong> sekmesinde <strong>Üstten görünüm (xy)</strong>'e bas; <strong>Kesit</strong> açık değilse aç ve 3d<sub>x²−y²</sub> ile 3d<sub>xy</sub>'yi karşılaştır; kesit açık kalsın. Ardından <strong>Yandan görünüm (xz)</strong>'e geçip 3d<sub>z²</sub> ve 3d<sub>xz</sub>'ye bak.",
        observe:
          "3d<sub>x²−y²</sub>: dört lob eksenlerin üstünde; turkuaz loblar sağda ve solda (±x), mor loblar yukarıda ve aşağıda (±y). 3d<sub>xy</sub>: aynı yonca 45° dönmüş; turkuaz loblar sağ üstte ve sol altta, eksenler boyunca boş bir haç. Yandan kesitte 3d<sub>z²</sub>: yukarıda ve aşağıda iki turkuaz lob, sağda ve solda halkanın kesiti olan iki mor bölge, aralarında eğik boş kamalar. 3d<sub>xz</sub>: x ve z eksenleri arasında dört lob. Beşinde de n = 3, ℓ = 2, radyal düğüm 0, açısal düğüm 2. mℓ: 3d<sub>z²</sub>'de 0, 3d<sub>xz</sub> ve 3d<sub>yz</sub>'de ±1, ötekilerde ±2.",
        explain:
          "Her d orbitalinin iki açısal düğümü vardır; 3d'de radyal düğüm yoktur (3 − 2 − 1 = 0). 3d<sub>xy</sub>'nin düğümleri xz (y = 0) ve yz (x = 0) düzlemleridir; x ve y eksenleri bu düzlemlerin içinde kaldığı için boş haç eksenlerin üstüne düşer. 3d<sub>x²−y²</sub>'de düğümler x = y ve x = −y köşegen düzlemleridir, 3d<sub>xz</sub>'de xy ve yz düzlemleri. 3d<sub>z²</sub> aykırıdır: düğümleri z ekseniyle ≈54.7° açı yapan iki konidir, kesitteki eğik kamalar bunlardır. Görünüşü farklı olsa da 3d<sub>z²</sub>, 2z² − x² − y² = (z² − x²) + (z² − y²) biçiminde iki yoncanın toplamıdır.",
      },
      {
        title: "İki enerji merdiveni: hidrojen ve ötekiler",
        predict:
          "Hidrojende 2s ile 2p'nin enerjisi aynı mıdır? Potasyum 19. elektronunu 3d'ye değil 4s'e koyar; öyleyse çok elektronlu bir atomda 4s, 3d'nin neresinde olmalı?",
        do: "Sayfanın altındaki <strong>Enerji Seviyesi Diyagramı</strong>'na in. <strong>Çok elektronlu atom</strong> görünümünde alt kabukları aşağıdan yukarı oku ve kutuları say. Sonra <strong>Hidrojen (tek elektron)</strong>'a bas, kutuların nasıl kaydığını izle ve sağdaki eV değerlerini oku.",
        observe:
          "Çok elektronlu görünümde aşağıdan yukarı sıra: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p; 4s, 3d'nin altındadır. s'de 1, p'de 3, d'de 5 kutu var. Hidrojene geçince aynı n'deki alt kabuklar tek bir kesikli çizgide buluşur: 2s ile 2p; 3s, 3p ile 3d; 4s ile 4p. Sağda −13.6, −3.40, −1.51, −0.85 eV yazar ve çizgiler yukarı doğru sıklaşır.",
        explain:
          "Hidrojenin tek elektronu vardır ve enerjisi yalnızca n'ye bağlıdır: Eₙ = −13.6 eV/n²; aynı n'deki bütün orbitaller eş enerjilidir. Aralıklar 10.2, 1.89 ve 0.66 eV diye daralır; diyagram ölçekli değildir, yalnızca sıralamayı gösterir. Çok elektronlu atomlarda iç elektronlar çekirdeği perdeler; çekirdeğe daha çok sokulan s elektronu daha sıkı tutulur. Bu yüzden aynı n'de enerji s'den p'ye, p'den d'ye artar ve 4s, 3d'nin altına iner; potasyum ile kalsiyum 4s'i önce doldurur. Bu sıra sabit değildir: demir iyonlaşırken önce 4s elektronlarını verir.",
      },
    ],
  },
  wow: [
    {
      title: "s, p, d, f: dört eski sıfat",
      body: "Harfler orbitallerden çok önce doğdu. 19. yüzyılın sonunda alkali metallerin spektrumlarını inceleyen bilim insanları çizgi dizilerine ad verdi: <em>principal</em> (ana) dizi p'yi, çizgilerinin görünüşünden adını alan <em>sharp</em> (keskin) ve <em>diffuse</em> (dağınık) diziler s ile d'yi verdi. Dördüncü dizi 1907'de kızılötesinde bulundu; 1909'da W. M. Hicks, formülü daha basit göründüğü için ona <em>fundamental</em> (temel) dedi, oysa bu adın fiziksel bir gerekçesi yoktu. Atom kuramı bu dizileri elektronun açısal momentumuna, bugünkü ℓ = 0, 1, 2, 3 değerlerine bağlayınca baş harfler kaldı. f'den sonrası için yeni bir hikâye uydurulmadı: harfler alfabetik sürer, g, h …",
    },
    {
      title: "Bohr'un yarıçapı geri döndü",
      body: "Kuantum mekaniği Bohr'un yörüngesini yıktı ama sayısını korudu. Hidrojenin 1s elektronunu çekirdekten r uzaklıktaki ince bir küresel kabukta bulma olasılığı, kabuğun alanı (r² ile büyür) ile yoğunluğun (r büyüdükçe üstel olarak azalır) çarpımıdır ve tam r = a₀ = 52.9 pm'de en büyük olur: Bohr'un 1913'teki ilk yörünge yarıçapı. Yine de elektron oraya bağlı değildir; a₀'dan daha yakında bulunma olasılığı yalnızca yaklaşık %32'dir, %90'ı içine almak için yaklaşık 141 pm'lik bir küre gerekir.",
    },
    {
      title: "Havadaki argonu s elektronları yaptı",
      body: "Çekirdeğin tam üstünde yoğunluğu sıfır olmayan tek orbitaller s orbitalleridir; bu yüzden bazı çekirdekler kendi elektronunu yutabilir. Bu <strong>elektron yakalama</strong>da elektron çoğunlukla en içteki 1s'den gelir, bir proton nötrona döner. Potasyum-40 bozunmalarının yaklaşık onda birinde böylece argon-40'a dönüşür; geri kalanında beta bozunmasıyla kalsiyum-40 olur. Atmosferin %0.93'ünü oluşturan argonun neredeyse tamamı, yer kabuğunda bu yolla üretilmiş argon-40'tır.",
    },
  ],
  worked: {
    title: "Demirin elektron haritası",
    prompt:
      "Demir (Fe, Z = 26) atomunun elektron dizilimini yaz, kaç eşleşmemiş elektronu olduğunu bul ve en dıştaki 4s ile 3d orbitallerinin düğümlerini say. Fe²⁺ iyonu oluşurken hangi elektronlar gider?",
    steps: [
      "Sırayı n + ℓ kuralıyla kur: 1s (1), 2s (2), 2p (3), 3s (3), 3p (4), 4s (4), 3d (5); toplamlar eşitse küçük n önce gelir. Kapasiteler 2(2ℓ + 1): s 2, p 6, d 10.",
      "Doldur: 1s² 2s² 2p⁶ 3s² 3p⁶ = 18 elektron, yani argonun dizilimi. 4s² ile 20'ye çıkar; kalan 26 − 20 = 6 elektron 3d'ye girer. Sonuç: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶, kısaca [Ar] 3d⁶ 4s².",
      "3d'nin beş kutusuna Hund kuralıyla yerleştir: ilk beş elektron her kutuya birer tane ve aynı spinle (↑ ↑ ↑ ↑ ↑) girer; altıncısı ilk kutuya zıt spinle eşleşir (Pauli). Eşleşmemiş elektron sayısı: 4.",
      "Düğümleri say. 4s: n = 4, ℓ = 0 → radyal 4 − 0 − 1 = 3, açısal 0; çekirdeği saran üç iç içe küre. 3d: n = 3, ℓ = 2 → radyal 0, açısal 2; sayfadaki d orbitallerinde gördüğün iki düzlem ya da iki koni. İkisinde de toplam n − 1.",
      "İyonlaştır: Fe²⁺ olurken giden iki elektron 3d'den değil 4s'ten gider: [Ar] 3d⁶, hâlâ 4 eşleşmemiş elektron. Fe³⁺ bir 3d elektronu daha verir: [Ar] 3d⁵, beş kutuda beş tek elektron.",
    ],
    result:
      "Fe: [Ar] 3d⁶ 4s², 4 eşleşmemiş elektron; 4s'te 3 radyal düğüm, 3d'de 2 açısal düğüm. Önce dolan 4s, iyonlaşmada önce boşalır: dolum sırası değişmez bir enerji merdiveni değildir.",
  },
  misconceptions: [
    {
      myth: "Elektron çekirdeğin etrafında gezegen gibi belirli bir yörüngede döner.",
      truth:
        "Orbital bir yol değil, bir olasılık dağılımıdır; elektronun konumu ölçülene kadar belirli değildir. Daha da çarpıcısı: 1s'de ℓ = 0'dır, yani elektronun yörüngesel açısal momentumu sıfırdır. Temel durumdaki hidrojen elektronu çekirdeğin çevresinde hiçbir anlamda dolanmaz; spin ise elektronun ayrı, iç bir özelliğidir. Bohr'un yörüngeleri tarihsel bir basamaktır, bugünkü resim değil.",
    },
    {
      myth: "Orbitalin çizilen yüzeyi bir duvardır; elektron o balonun içinde kalır.",
      truth:
        "Dalga fonksiyonu çekirdekten uzaklaştıkça hızla küçülür ama hiçbir yerde birden sıfıra inmez. Kitaplardaki yüzeyler olasılığın örneğin %90'ını kapsayacak biçimde seçilir; hidrojen 1s için bu küre yaklaşık 141 pm yarıçaplıdır ve ölçümlerin yaklaşık %10'unda elektron bu kürenin dışında bulunur. Sayfadaki nokta bulutunda da keskin bir kenar yoktur: noktalar dışa doğru giderek seyrelir, ama hiçbir yerde birden bitmez.",
    },
    {
      myth: "Turkuaz ve mor loblar artı ve eksi elektrik yükünü gösterir.",
      truth:
        "Renkler dalga fonksiyonunun işaretini, yani fazını gösterir. Olasılık |ψ|² her iki lobda da pozitiftir ve elektron her yerde aynı eksi yüke sahiptir. İşaret, iki atomun orbitalleri üst üste bindiğinde önem kazanır: aynı işaretli loblar birbirini güçlendirir ve bağ oluşur, zıt işaretliler birbirini söndürür.",
    },
    {
      myth: "4s, 3d'den önce dolduğuna göre iyon oluşurken en son 4s elektronları gider.",
      truth:
        "Tam tersi: demir Fe²⁺ olurken önce iki 4s elektronunu verir ve [Ar] 3d⁶ olur. 3d dolmaya başlayınca 3d'nin enerjisi 4s'in altına iner. Aufbau sırası nötr atomların temel durum dizilimini tahmin etmeye yarayan bir kuraldır; her atom ve iyon için sabit bir enerji sıralaması değildir.",
    },
  ],
  glossary: [
    {
      term: "Orbital",
      definition:
        "Atomdaki bir elektronun izinli durumunu betimleyen dalga fonksiyonu; karesi elektronun nerede bulunabileceğinin olasılık haritasıdır.",
    },
    {
      term: "Dalga fonksiyonu (ψ)",
      definition:
        "Uzayın her noktasına bir sayı (genelde karmaşık; sayfadaki gerçek orbitallerde artı ya da eksi) atayarak bir kuantum durumunu tam olarak tanımlayan fonksiyon.",
    },
    {
      term: "Olasılık yoğunluğu (|ψ|²)",
      definition:
        "Birim hacimde elektron bulma olasılığı; küçük bir dV hacmi için olasılık |ψ|²·dV'dir.",
    },
    {
      term: "Düğüm",
      definition:
        "Dalga fonksiyonunun sıfır olduğu ve işaret değiştirdiği yüzey; orada elektron bulma olasılığı sıfırdır.",
    },
    {
      term: "Alt kabuk",
      definition:
        "Aynı n ve ℓ değerlerine sahip orbitallerin grubu; örneğin 2p alt kabuğu üç orbitalden oluşur.",
    },
    {
      term: "Spin (mₛ)",
      definition:
        "Elektronun iç açısal momentumu; yalnızca +½ ya da −½ değerini alabilen dördüncü kuantum sayısı.",
    },
    {
      term: "Pauli dışlama ilkesi",
      definition:
        "Bir atomda iki elektronun dört kuantum sayısı birden aynı olamaz; bu yüzden bir orbitalde en çok iki zıt spinli elektron bulunur.",
    },
    {
      term: "Hund kuralı",
      definition:
        "Eş enerjili orbitallere elektronlar önce birer birer ve aynı spinle yerleşir; ancak ondan sonra eşleşir.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede orbitaller hazır resimlerdir; üniversitede bir <strong>özdeğer probleminin</strong> çözümleri. Hidrojen için Schrödinger denklemi küresel koordinatlarda ayrı parçalara bölünür; açısal kısmın çözümleri <em>küresel harmonikler</em> Y<sub>ℓm</sub>'dir. Aynı fonksiyonlar Dünya'nın çekim alanının haritalanmasında, kozmik mikrodalga arka plan ışımasının analizinde ve bilgisayar grafiklerinde ışıklandırma hesabında karşına çıkar. Tam sayıların kökü bir davul zarının ya da gitar telinin modlarıyla aynıdır: dalga kendi üzerine tutarlı biçimde kapanmalıdır. Açısal momentumun büyüklüğü √(ℓ(ℓ + 1))·ħ olarak çıkar; 1s'de sıfırdır. 1928'de Paul Dirac denklemi görelilikle birleştirdi ve Pauli'nin el yordamıyla eklediği spin, denklemden kendiliğinden doğdu.",
      "Birden fazla elektron olunca, yani daha helyumda, denklemin tam çözümü yoktur; kimyacılar Hartree–Fock ve yoğunluk fonksiyonel teorisi (DFT) gibi yaklaşık yöntemlerle orbitalleri bilgisayarda hesaplar ve bugün ilaç molekülleri ile pil malzemeleri bu hesaplarla taranır. Atomlar birleşince orbitaller de birleşir: aynı işaretli loblar üst üste binince bağ oluşur; karbonun bir s ve üç p orbitali karışarak metanın 109.5°'lik dört kolunu verir (<em>hibritleşme</em>). Molekül orbital teorisi, sıvı oksijenin bir mıknatısın kutupları arasında neden asılı kaldığını açıklar. Geçiş metali bileşiklerinde ise çevredeki atomlar beş d orbitalinin enerjisini ayırır; yakutun kırmızısı, krom iyonunun bu ayrılmış d düzeyleri arasındaki ışık soğurmasından gelir.",
    ],
    topics: [
      "Küresel harmonikler",
      "Schrödinger denklemi ve özdeğer problemleri",
      "Açısal momentum ve spin",
      "Hartree–Fock ve yoğunluk fonksiyonel teorisi",
      "Hibritleşme ve molekül orbital teorisi",
      "Kristal alan teorisi",
    ],
  },
  quiz: [
    {
      question: "3p orbitalinde kaç radyal ve kaç açısal düğüm vardır?",
      options: [
        "0 radyal, 2 açısal",
        "1 radyal, 1 açısal",
        "2 radyal, 0 açısal",
        "1 radyal, 2 açısal",
      ],
      answer: 1,
      explanation:
        "p için ℓ = 1, yani bir açısal düğüm (lobları ayıran düzlem). Radyal düğüm n − ℓ − 1 = 3 − 1 − 1 = 1. Toplam n − 1 = 2. Sayfadaki 2p'de radyal düğüm yoktur (2 − 1 − 1 = 0); 3p ise her lobu içten ve dıştan iki parçaya ayıran bir küresel düğüm daha taşır.",
    },
    {
      question:
        "Aşağıdaki kuantum sayısı takımlarından hangisi bir atomda mümkün değildir?",
      options: [
        "n = 2, ℓ = 1, mℓ = −1",
        "n = 3, ℓ = 2, mℓ = +2",
        "n = 2, ℓ = 2, mℓ = 0",
        "n = 4, ℓ = 0, mℓ = 0",
      ],
      answer: 2,
      explanation:
        "ℓ en çok n − 1 olabilir; n = 2 için ℓ yalnızca 0 ya da 1'dir. Bu yüzden 2d alt kabuğu yoktur ve d orbitalleri ilk kez n = 3'te ortaya çıkar; sayfanın d sekmesinin n = 3 göstermesi bundandır.",
    },
    {
      question:
        "Yalnızca hidrojen atomu için hangisi doğrudur?",
      options: [
        "2s, 2p'den daha düşük enerjilidir",
        "4s, 3d'den daha düşük enerjilidir",
        "3s, 3p ve 3d aynı enerjiye sahiptir",
        "Enerji n'ye değil yalnızca ℓ'ye bağlıdır",
      ],
      answer: 2,
      explanation:
        "Tek elektronlu hidrojende perdeleme yoktur; enerji Eₙ = −13.6 eV/n² ile yalnızca n'ye bağlıdır. n = 3'teki dokuz orbitalin (bir 3s, üç 3p, beş 3d) hepsi −1.51 eV'tadır. 2s'in 2p'nin, 4s'in 3d'nin altında olması çok elektronlu atomlara özgüdür; sayfadaki diyagramda iki düğme arasında geçerek görebilirsin.",
    },
  ],
  next: [
    {
      href: "periyodik-tablo.html",
      title: "Periyodik Tablo",
      why: "Dolum sırasının haritası: alkali metallere tıklayıp atom numarası farklarının 8, 8, 18, 18, 32 olduğunu gör; bunlar orbital kapasitelerinin toplamıdır.",
    },
    {
      href: "kuantum-dalga.html",
      title: "Kuantum Dalga Fonksiyonu",
      why: "Bir kutuya hapsolmuş parçacığın ψ ve |ψ|² eğrileri: n kaydırıcısını 1'den 5'e çek, düğüm sayısının n − 1 olduğunu tek boyutta say.",
    },
    {
      href: "duran-dalgalar.html",
      title: "Duran Dalgalar",
      why: "de Broglie'nin fikrinin kökü bir telde: harmonik modu artırdıkça düğüm noktalarının nasıl çoğaldığını izle; orbitaller bu titreşimlerin üç boyutlu akrabasıdır.",
    },
    {
      href: "molekul-sekli.html",
      title: "Molekül Şekli (VSEPR)",
      why: "Orbitaller bağ kurunca: metan, amonyak, su ve SF₆'nın 3B geometrisini döndür, 109.5°, 107°, 104.5° bağ açılarını karşılaştır.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Chemistry 2e, 6.3 Development of Quantum Theory",
      url: "https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory",
      note: "de Broglie dalgaları, Schrödinger denklemi, dört kuantum sayısı ve orbital biçimleri (İngilizce, açık ders kitabı).",
    },
    {
      title:
        "OpenStax · Chemistry 2e, 6.4 Electronic Structure of Atoms (Electron Configurations)",
      url: "https://openstax.org/books/chemistry-2e/pages/6-4-electronic-structure-of-atoms-electron-configurations",
      note: "Aufbau sırası, Hund kuralı, orbital kutu diyagramları ve Cr, Cu gibi istisnalar.",
    },
    {
      title: "PhET · Hidrojen Atomu Modelleri",
      url: "https://phet.colorado.edu/tr/simulations/models-of-the-hydrogen-atom",
      note: "Bilardo topu modelinden Bohr'a, de Broglie'ye ve Schrödinger'e: hangi modelin deneyle uyuştuğunu kendin sına.",
    },
    {
      title: "Wikipedia · Atomic orbital",
      url: "https://en.wikipedia.org/wiki/Atomic_orbital",
      note: "Gerçek |ψ|² biçimleri, s-p-d-f adlarının spektroskopi kökeni ve Mulliken'in 'orbital' terimi (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
