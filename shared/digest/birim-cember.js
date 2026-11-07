window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["birim-cember"] = {
  slug: "birim-cember",
  title: "Birim Çember: Dönen Bir Noktanın Gölgeleri",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Yarıçapı 1 olan çemberde her açı bir noktadır; kosinüs ve sinüs onun iki gölgesi. İki dönmeyi art arda yapmak toplama formüllerini verir; sinüs de küçük dönmeleri kaydırıp toplayarak hesaplanabilir.",
  hook:
    "Hiçbir dik üçgenin 120°'lik bir açısı olamaz; yine de hesap makinesi sin 120° için tereddütsüz 0.866025… der. Üçgen yetmiyorsa bu sayı nereden geliyor? Cevap, yarıçapı 1 olan bir çemberin üstünde dönen tek bir noktada; bu sayfanın son sekmesindeki algoritma da sinüsü o noktayı küçük adımlarla döndürerek, tek bir çarpma yapmadan bulur.",
  bigIdea:
    "Birim çemberde her açı bir noktadır, <em>P = (cos θ, sin θ)</em>: açı o noktaya giden yayın uzunluğudur (radyan), θ kadar dönmek <em>R(θ)</em> matrisiyle çarpmaktır; trigonometrinin özdeşlikleri bu noktanın geometrisinden, toplama formülleri de iki dönmenin art arda yapılmasından çıkar.",
  story: [
    "Trigonometri sinüsle değil, kirişle başladı: bir yayın iki ucunu birleştiren doğru parçasıyla. Trigonometrinin kurucusu sayılan Hipparkos MÖ 2. yüzyılda yaşadı; bugünkü İznik'te, o zamanki Nikaia'da doğmuştu. İlk kiriş tablosunu onun hazırladığı kabul edilir, ama tablo kayıptır: ondan yalnızca sonraki yazarların aktarmalarıyla haberdarız, kaç derece arayla dizildiği ve hangi yarıçapla hesaplandığı ise tartışmalı yeniden kurgulardır. Günümüze ulaşan en eski kapsamlı kiriş tablosu Batlamyus'un (Ptolemaios) MS 2. yüzyılda yazdığı <em>Almagest</em>'tedir: çapı 120 birim olan bir çemberde ½°'den 180°'ye kadar her yarım derecenin kirişi, altmışlık tabanda, 360 satır. Kiriş kılık değiştirmiş bir sinüstür: yarıçapı 1 olan çemberde α yayının kirişi 2 sin(α/2)'dir. Batlamyus kirişleri birbirinden bugün <strong>Batlamyus teoremi</strong> denen bir bağıntıyla türetti: çembere çizilmiş bir dörtgende köşegenlerin çarpımı, karşılıklı kenarların çarpımlarının toplamına eşittir. Teorem iki yayın toplamının ve farkının kirişini verir; bugünün diliyle sin(α ± β) formüllerini. Bu yollarla ulaşılamayan 1°'yi ise bir eşitsizlikle komşu açıların kirişleri arasına sıkıştırdı ve 1;2,50 buldu: 1 + 2/60 + 50/3600 = 1.047222. Bugünkü değer 120·sin 0.5° = 1.047184; bağıl fark 3.6×10⁻⁵.",
    "Yarım kirişi, yani bugünkü sinüsü tablonun merkezine Hint gökbilimcileri koydu. Bilinen ilk sinüs tablosu, Aryabhata'nın <em>Aryabhatiya</em>'sının tek bir kıtasındadır. Metin, yazarın Kali çağının 3600. yılında 23 yaşında olduğunu söyler; bu yıl 499'dur ve kitap çoğu zaman bu yıla tarihlenir, ama ayet metnin o yıl bittiğini yazmaz. Çeyrek çember 3°45′'lik 24 adıma bölünür ve değerlerin kendisi değil, ardışık farkları verilir: 225, 224, 222, 219, … , 22, 7. Farkların toplamı 3438'dir, tablonun yarıçapı. Bu sayı rastgele değildir: çemberin çevresi 360·60 = 21 600 yay dakikası olduğuna göre yarıçap 21 600/2π ≈ 3438 dakikadır. Yarıçap yayla aynı birimle ölçülünce güzel bir şey olur: ilk sinüs 225, yayın kendisi de 225′'dir; küçük yaylarda sinüs ile yay neredeyse eşittir. Bugün aynı fikre <strong>radyan</strong> diyoruz. Kitabın ikinci bölümündeki bir kıta tabloyu kurmanın kuralını verir. Çevirisi tartışmalıdır, ama bir okunuşa göre her fark bir öncekinden, o ana dek birikmiş sinüsün 225'e bölümü kadar küçüktür: 225 − 225/225 = 224, 224 − 449/225 ≈ 222. Böyle okununca kural, sinüsün ikinci türevinin eksi sinüs olmasına benzeyen kesikli bir bağıntıya varır; ayet bunu açıkça söylemez.",
    "Toplama formülleri bir hesap aracı olarak da çalıştı. 16. yüzyılın sonunda gökbilimciler büyük sayıları çarpmak için 2 cos a·cos b = cos(a − b) + cos(a + b) özdeşliğinden yararlandılar: iki sayıyı tablodan birer kosinüs olarak okumak, açılarının farkını ve toplamını bulmak, bu iki açının kosinüslerini okumak ve toplayıp yarıya bölmek yetiyordu. Örneğin 0.866025 × 0.707107 ≈ cos 30°·cos 45° = (cos 15° + cos 75°)/2 ≈ (0.965926 + 0.258819)/2 ≈ 0.61237. Çarpma, toplama ve çıkarmaya dönüşmüştü. Bu hesaba Yunanca <em>prosthaphaeresis</em> denir; aynı sözcük eski gökbilimde, görünen konumu ortalama konuma indiren düzeltmenin adıdır. Tycho Brahe bu yöntemi gökbilim hesaplarında yaygın kullandı. 1580'de Hven'de, Uraniborg'da yanında çalışan matematikçi Paul Wittich'in yöntemi oraya getirdiği aktarılır. 1614'te John Napier'in logaritması aynı işi daha kolay yapan bir araç oldu.",
    "Dönme fikri 20. yüzyılda elektroniğe taşındı. 1956'da ABD'li uçak üreticisi Convair'in havacılık elektroniği bölümünde çalışan Jack Volder, B-58 bombardıman uçağının seyrüsefer bilgisayarındaki analog bir çözücüyü (resolver) daha doğru ve hızlı bir sayısal devreyle değiştirmenin yolunu arıyordu. Bulduğu yöntemi 1959'da <em>CORDIC</em> adıyla (İngilizce baş harfleriyle 'koordinat döndüren sayısal bilgisayar') yayımladı: bir oku, tanjantları 1, ½, ¼, … olan açılarla hedefe doğru ileri geri döndürmek. Tanjantlar 2'nin kuvvetleri olduğu için her dönme yalnızca kaydırma ve toplama ister; çarpma devresi gerekmez. 1971'de Hewlett-Packard'da John Walther yöntemi üstel, logaritmik ve hiperbolik fonksiyonları da kapsayan tek bir algoritmada birleştirdi. Bu çalışma 1972'de ilk bilimsel cep hesap makinesi HP-35'e uzandı; cep hesap makinelerinde CORDIC'in ondalık bir türü yaygınlaştı. Bugünkü bilgisayar kütüphaneleri sinüsü çoğunlukla polinom yaklaşımıyla hesaplar; ama çarpma devresinin pahalı olduğu küçük yongalarda CORDIC hâlâ yaşıyor: ARM tabanlı STM32G4 mikrodenetleyicilerinin içinde bir CORDIC birimi bulunur.",
  ],
  core: [
    {
      heading: "Üçgenden çembere: her açıya bir nokta",
      body:
        "Dik üçgende sin θ = karşı kenar / hipotenüs tanımı yalnızca 0° < θ < 90° için anlamlıdır. Birim çember bu sınırı kaldırır: pozitif x ekseninden saat yönünün tersine θ kadar dönerek vardığın nokta P olsun; cos θ onun x, sin θ onun y koordinatıdır. Dar açılarda bu eski tanımın aynısıdır, çünkü hipotenüs OP'dir ve boyu 1'dir. Ama artık 120°, 225° ya da −30° için de bir nokta, dolayısıyla bir değer vardır. İşareti bölge verir (II. bölgede cos −, sin +), büyüklüğü <strong>referans açı</strong>: sin 120° = sin 60° = 0.866025. Nokta 360° sonra aynı yere döndüğü için iki fonksiyon da 360° periyotludur. Simetriler çizimden okunur: −θ, P'nin x eksenine göre yansımasıdır, bu yüzden cos(−θ) = cos θ ve sin(−θ) = −sin θ; 180° − θ ise y eksenine göre yansımadır, sin(180° − θ) = sin θ. Pisagor teoremi OP'ye uygulanınca her açıda geçerli temel özdeşlik çıkar.",
      formula: "P(θ) = (cos θ, sin θ),   cos²θ + sin²θ = 1",
      formulaNote:
        "İkinci eşitlik |OP| = 1 için Pisagor teoremidir. Sayfa 30°'de toplamı 1 − 1.1×10⁻¹⁶ yazar: kusur formülde değil, 64 bitlik sayıların yuvarlanmasında.",
    },
    {
      heading: "Radyan: açıyı yay uzunluğuyla ölçmek",
      body:
        "Derece bir gelenektir: tam turu 360 parçaya bölmek. Radyan ise çemberin kendisinden gelir: yarıçapı 1 olan çemberde θ radyanlık açı, uzunluğu θ olan yayı görür; tam tur 2π ≈ 6.283185 radyan, 1 rad ≈ 57.2958°'dir. Analiz bu seçimi zorunlu kılar. Küçük açılarda yay ile yarım kiriş neredeyse eşittir: sin θ ≈ θ, kesin dille sin θ / θ → 1 (θ → 0). Türevin tanımına toplama formülüyle girince sin(θ + h) − sin θ = sin θ·(cos h − 1) + cos θ·sin h çıkar; h'ye bölüp h → 0 alınca ilk terim söner, ikincisi cos θ'ya gider. θ derece olsaydı aynı limit π/180 çıkardı ve sinüsün her türevine 0.01745 çarpanı eklenirdi. Sayfa yay uzunluğunu ayrıca ölçer: yay 1°'lik kirişlerden kurulmuş bir çokgen olarak çizilir; 30°'de kirişlerin toplamı 0.523592, θ'nın radyan değeri 0.523599'dur.",
      formula: "s = r·θ,   lim<sub>h→0</sub> (sin h)/h = 1,   (d/dθ) sin θ = cos θ   (θ radyan)",
      formulaNote:
        "Derecede (d/dx) sin x° = (π/180)·cos x°. 1°'lik kiriş 2 sin(Δ/2) ≈ Δ − Δ³/24 olduğundan çokgen yaydan göreli Δ²/24 = 1.27×10⁻⁵ kısa kalır (Δ = π/180); sayfanın tablosu her açıda bu oranı gösterir.",
    },
    {
      heading: "İki dönme, bir toplama formülü",
      body:
        "θ kadar dönme, düzlemdeki her oku θ kadar çeviren doğrusal bir dönüşümdür: (1, 0)'ı P = (cos θ, sin θ)'ya, (0, 1)'i ondan 90° ileriye, (−sin θ, cos θ)'ya götürür. Matrisin sütunları bu iki görüntüdür. Önce β sonra α kadar dönmek, bir kerede α + β kadar dönmektir: R(α)·R(β) = R(α + β). Soldaki çarpımı satır × sütun kuralıyla aç: sol üst eleman cos α cos β − sin α sin β, sol alt eleman sin α cos β + cos α sin β çıkar. Sağdaki matrisin aynı yerlerinde cos(α + β) ve sin(α + β) durduğuna göre toplama formülleri iki dönmenin art arda yapılmasından ibarettir; ayrıca ezberlenecek bir bilgi değildir. β = 90° özel hâli çeyrek tur kaymayı verir: sin(θ + 90°) = cos θ, cos(θ + 90°) = −sin θ. β yerine −β koymak fark formüllerini, α = β koymak iki kat açı formüllerini verir. Sayfada α = 30°, β = 45° iken çarpımın sol üst sayısı 0.2588190451 = cos 75°'tir; doğrudan hesapla farkı 5.6×10⁻¹⁷, yalnızca yuvarlama.",
      formula: "R(θ) = [cos θ  −sin θ; sin θ  cos θ],   R(α)·R(β) = R(α + β)",
      formulaNote:
        "Satırlar noktalı virgülle ayrılmıştır. det R(θ) = cos²θ + sin²θ = 1: dönme alanı ve yönelimi korur, sütunları birbirine dik birim vektörlerdir.",
    },
    {
      heading: "Fazörler: iki dalga, tek bir ok",
      body:
        "Dönen bir okun yüksekliği bir sinüs dalgası çizer: boyu A olan ok θ açısındayken yüksekliği A sin θ'dır. B cos θ = B sin(θ + 90°) ise ondan 90° ileride dönen, boyu B olan bir okun yüksekliğidir. İki ok uç uca eklenince toplam ok R = √(A² + B²) boyundadır ve φ kadar öndedir; aynı frekanstaki iki dalganın toplamı yine tek bir sinüs dalgasıdır. Sağ yanı toplama formülüyle açmak A = R cos φ, B = R sin φ verir. Ölçmek ayrı bir sorudur. Bir periyottan alınmış N gürültülü örnekte en büyük örneği genlik saymak <strong>yanlıdır</strong>: gürültünün en çok yukarı ittiği örnek seçilir. <strong>En küçük kareler</strong> ise A ile B'yi bütün örneklerden birlikte kestirir; eşit aralıklı örneklerde sin ile cos birbirine dik olduğundan kestirim kapalı bir toplamdır, <span class=hat>A</span> = (2/N)·Σ yₙ sin θₙ, ve belirsizliği σ√(2/N)'dir: örnek sayısı dört katına çıkınca yarıya iner.",
      formula: "A sin θ + B cos θ = R sin(θ + φ),   R = √(A² + B²),   φ = atan2(B, A)",
      formulaNote:
        "A = 3, B = 4 için R = 5, φ = 53.13°. atan2, arctan(B/A)'dan farklı olarak A'nın işaretine de bakar ve doğru bölgeyi seçer: A = −2, B = 2 için φ = 135°, −45° değil.",
    },
    {
      heading: "CORDIC: sinüsü kaydırıp toplayarak bulmak",
      body:
        "Dönme açısını tan δ = 2⁻ᵏ olacak biçimde seçersen R(δ) = cos δ·[1  −2⁻ᵏ; 2⁻ᵏ  1] olur ve köşeli matrisle çarpmak, ikili sayıyı k basamak sağa kaydırıp toplamaktan ibarettir. CORDIC hedef açıya bu açılarla yaklaşır: 45°, 26.565°, 14.036°, 7.125°, … Her adımda kalan açı z'nin işaretine bakar; pozitifse ileri, negatifse geri döner ve tablodaki açıyı z'den düşer. Atılan cos δ çarpanları dönme yönünden bağımsızdır, bu yüzden çarpımları her açı için aynıdır: K = 0.607252935… Başlangıç vektörünü bir kez (K, 0) almak hepsini öder. n adımdan sonra |z| ≤ arctan 2<sup>1−n</sup> olur; sınır her adımda kabaca yarıya iner, yani ortalamada adım başına bir doğru bit. Tek bir açıda ise hata yarılanmaz, dalgalanır: kalan z çok küçük olsa bile bir sonraki adım tam arctan 2⁻ᵏ kadar dönmek zorundadır. Tablodaki açıların toplamı 99.883° olduğundan sayfa |θ| > 90° iken önce tam 90° döner.",
      formula: "x ← x − d·2⁻ᵏ·y,   y ← y + d·2⁻ᵏ·x,   z ← z − d·arctan 2⁻ᵏ,   d = +1 (z ≥ 0) ya da −1",
      formulaNote:
        "K = Π 1/√(1 + 2⁻²ᵏ) = 0.607252935008881. Sayfa 300 açının tablosunda eğimi −0.9996 ± 0.0005 bit/adım yazar; durum satırı aynı ölçümü −1.000 ± 0.001 diye yuvarlar.",
    },
  ],
  lab: {
    intro:
      "Üç sekme var. <strong>Birim çember</strong>: <strong>Açı θ</strong> kaydırıcısı (0–360°, 1° adım, varsayılan 30°), yanındaki kutu (30, 89.99, π/6 ya da 0.5236 rad gibi girişler; Enter'a bas), sürüklenebilen P noktası, özel açı düğmeleri (0°, 15°, 30°, 45°, 60°, 90°, 150°, 180°, 225°, 270°, 300°), <strong>θ'yı 90° artır</strong>, <strong>Döndür</strong> ve <strong>Sıfırla</strong>. Kartlar cos θ, sin θ, tan θ ve (1 − cos θ)/2'yi altı ondalıkla, 15°'nin katlarında tam köklü biçimleriyle yazar; tablo, çizilen yayın uzunluğunu ve kayan noktada sin²θ + cos²θ'yı ölçüp kuramla karşılaştırır. <strong>Dalgalar ve faz</strong>: dönen nokta sinüs ve kosinüs eğrilerini çizer; A ve B katsayıları, örnek sayısı N, gürültü σ ve tohumla A sin θ + B cos θ'nın genliği ve fazı üç yöntemle ölçülür. <strong>Hesap makinesi nasıl hesaplar</strong>: <strong>Sahnede göster</strong> menüsünden iki dönmenin bileşkesini ya da CORDIC adımlarını seç; <strong>Adım sayısı n</strong> (0–40), n = 8, 16, 24 düğmeleri, <strong>Bir adım daha</strong> ve <strong>Sayı biçimi</strong> (64 bit kayan nokta ya da 32 bit sabit nokta) CORDIC'i yönetir. Her sekmenin Sıfırla düğmesi kendi varsayılanlarına döndürür.",
    experiments: [
      {
        title: "Çeyrek tur ileri: sin(θ + 90°) = cos θ",
        predict:
          "θ = 30°'de cos θ ve sin θ kaçtır? θ'yı 90° artırınca yeni sin θ hangi eski değere eşit çıkar? (1 − cos θ)/2 kartı 0°, 90° ve 180°'de ne gösterir?",
        do: "Birim çember sekmesinde Sıfırla'ya bas ve kartları oku. Sonra <strong>θ'yı 90° artır</strong> düğmesine bas; 'θ'yı 90° artırınca' kartını ve Döndürme matrisi panelini oku. Son olarak sırayla 0°, 90° ve 180° düğmelerine bas; her seferinde (1 − cos θ)/2 kartına bak.",
        observe:
          "30°'de cos θ = 0.866025 (tam değer √3/2), sin θ = 0.500000 (1/2). Düğmeden sonra θ = 120° olur ve kart 'eski cos θ = 0.866025 · yeni sin θ = 0.866025' yazar, fark 0. P artık (−0.500000, 0.866025)'tedir: 30°'deyken R(θ)·(0, 1) okunun gösterdiği nokta. (1 − cos θ)/2 kartı 0°'de 0.000000, 90°'de 0.500000, 180°'de 1.000000 okur.",
        explain:
          "Çeyrek tur dönmek (x, y)'yi (−y, x)'e götürür: (cos θ, sin θ)'nın görüntüsü (−sin θ, cos θ)'dır, yani yeni yükseklik eski yatay konumdur. Bu, toplama formülüne β = 90° koymaktır. (1 − cos θ)/2 = sin²(θ/2) ise yarım açı özdeşliğidir: P ile (1, 0) arasındaki kiriş 2 sin(θ/2) uzunluğundadır ve kart bu kirişin yarısının karesidir; Batlamyus'un kirişi yeniden karşına çıkar. 180°'de P, (1, 0)'dan en uzak noktadadır ve kart 1'e ulaşır.",
      },
      {
        title: "tan 90° sonsuz mu?",
        predict:
          "θ 90°'ye yaklaşırken tan θ nasıl büyür? 89.99°'de yaklaşık kaç beklersin? Tam 90°'de kart ne yazar, 90.01°'de ne?",
        do: "Birim derece iken açı kutusuna sırayla 89, 89.9 ve 89.99 yazıp her seferinde Enter'a bas; tan θ kartını ve durum satırındaki 'Yaklaşık değer ±1/ε' sayısını not et. Sonra 90 ve 90.01 yaz.",
        observe:
          "tan θ kartı 57.289962, 572.957213 ve 5729.577893 gösterir; durum satırının 1/ε yaklaşımı 57.2958, 572.9578 ve 5729.5780'dir. 90°'de kart 'tanımsız' yazar ve nedenini söyler: cos θ = 0, OP doğrusu x = 1 teğetine paraleldir ve onu hiç kesmez. 90.01°'de kart −5729.577893 okur.",
        explain:
          "90°'den ε radyan geride tan θ = cot ε ≈ 1/ε − ε/3'tür: uzaklık on kat küçülünce değer on kat büyür. 89.99°'de ε = 0.01° = 1.74533×10⁻⁴ rad ve 1/ε = 5729.57795. Durum satırı bunu 5729.5780 diye yuvarlar; kart 5729.577893 okur. Fark ε/3 ≈ 5.8×10⁻⁵'tir. 90°'yi geçince işaret döner. Soldan +∞'a, sağdan −∞'a giden bir fonksiyonun 90°'de 'sonsuz' diye tek bir değeri olamaz; orada değer yoktur. Sayfa sinüs ve kosinüsü dereceden hesapladığı için cos 90° tam 0 çıkar ve kart büyük bir sayı yerine dürüstçe 'tanımsız' yazabilir.",
      },
      {
        title: "Gürültüde genlik: tepeye mi bakmalı, bütün örneklere mi?",
        predict:
          "A = 3, B = 4 iken toplam dalganın genliği ve fazı ne olmalı? Her örneğe σ = 0.3'lük gürültü eklenince 'en büyük örnek' yöntemi genliği ortalamada büyük mü, küçük mü bulur? En küçük kareler? Örnek sayısını üç katına çıkarmak tepe yöntemini düzeltir mi?",
        do: "Dalgalar ve faz sekmesini aç (A = 3, B = 4, N = 24, σ = 0 varsayılandır). Kuram kartını ve tablonun ilk dört satırını oku. Sonra <strong>Ölçüm gürültüsü σ</strong> kutusuna 0.3 yazıp Enter'a bas; tabloyu ve 'Gürültünün etkisi: 200 tohumun ortalaması' kartını oku. En son <strong>Bir periyottaki örnek sayısı N</strong> menüsünden 72'yi seç ve aynı kartı yeniden oku.",
        observe:
          "Kuram kartı 'R = 5.0000 · φ = 53.13°' yazar. Gürültüsüz örneklerde tepe yöntemi 4.999516 (fark −0.000484), sıfır geçişi 53.1265°, en küçük kareler tam 5.0000 ve 53.1301° verir. σ = 0.3'te tohum 1 için tepe 5.336406, en küçük kareler 5.0420 ± 0.0784 (+0.5 SE). 200 tohumun ortalamasında tepe R'yi +0.1763 ± 0.0166 saptırır, en küçük kareler +0.0014 ± 0.0064; beklenen SE σ√(2/N) = 0.0866. N = 72'de tepenin sapması +0.3676 ± 0.0128'e büyür, en küçük karelerinki −0.0045 ± 0.0037'dir.",
        explain:
          "3-4-5 üçgeni: R = √(3² + 4²) = 5, φ = arctan(4/3) = 53.13°. Gürültüsüz tepe hatası örnekleme aralığından gelir: en büyük örnek 30°'de 4.964102'dir ve parabolik ara değer bunu 4.999516'ya taşır. Gürültüde en büyük örneği seçmek, gürültüsü en çok yukarı itilmiş örneği seçmektir; yöntem sistematik olarak yukarı yanılır ve örnek çoğaldıkça 'şanslı' bir sıçrama olasılığı arttığından yanlılık büyür. En küçük kareler bütün örnekleri sin θₙ ve cos θₙ ile ağırlıklandırıp toplar; gürültünün ortalaması sıfır olduğundan yanlı değildir ve N ile iyileşir: beklenen SE N = 24'te 0.0866, N = 72'de 0.0500.",
      },
      {
        title: "CORDIC: her adım bir bit mi?",
        predict:
          "Hedef θ = 30° iken 8, 16 ve 24 adımdan sonra hata kabaca kaç olur? 2⁻ⁿ ile karşılaştır. Bir adım daha eklemek hatayı her zaman küçültür mü?",
        do: "Hesap makinesi nasıl hesaplar sekmesini aç (θ = 30°, n = 8, 64 bit kayan nokta). n = 8, n = 16 ve n = 24 düğmelerine sırayla bas; tablodaki 'Hata' satırını ve durum satırındaki 2⁻ⁿ değerini oku. Sonra <strong>Adım sayısı n</strong> kaydırıcısını 3'e getirip <strong>Bir adım daha</strong>'ya bas. En son 'Adım başına kazanılan bit' satırına ve alttaki grafiğe bak.",
        observe:
          "Hata 8 adımda 4.62×10⁻³, 16'da 1.46×10⁻⁵, 24'te 9.18×10⁻⁸; 2⁻ⁿ sırasıyla 3.91×10⁻³, 1.53×10⁻⁵ ve 5.96×10⁻⁸. n = 3'te hata 4.31×10⁻²'dir, bir adım sonra 8.12×10⁻²'ye çıkar. Grafikte bu açının eğrisi 40 adımın 9'unda yukarı sıçrar; 300 açının geometrik ortalaması ise düz bir doğru gibi iner ve tablo eğimi −0.9996 ± 0.0005 bit/adım yazar (beklenen −1).",
        explain:
          "Hata kalan açıdan gelir: 2|sin(z/2)| ≈ |z|, ve n adımdan sonra |z| ≤ arctan 2<sup>1−n</sup>. Sınır her adımda yarıya iner, hatanın kendisi inmez: 3 adımdan sonra z = −2.47°'dir ve dördüncü adım ne olursa olsun 7.125° dönmek zorundadır; kalan açı 4.65°'ye çıkar. Ortalamada ise her adım ikili gösterimde bir basamak doğruluk ekler: 24 adımdan sonra hata 2⁻²⁴ ≈ 6×10⁻⁸ mertebesindedir.",
      },
    ],
  },
  wow: [
    {
      title: "Radyanın adı bir sınav kâğıdında doğdu",
      body:
        "Açıyı yay uzunluğuyla ölçme fikri eskidir, ama 'radyan' sözcüğü ilk kez 5 Haziran 1873'te, Belfast'taki Queen's College'da James Thomson'ın (Lord Kelvin'in kardeşi) hazırladığı sınav sorularında basıldı. Uluslararası Birimler Sistemi (SI) radyanı 1960'ta ayrı bir 'ek birim' sınıfına koydu; 1995'te bu sınıf kaldırıldı ve radyan boyutsuz bir türetilmiş birim oldu: 1 rad = 1 m/m, yay uzunluğunun yarıçapa oranı.",
    },
    {
      title: "Bilgisayara göre tan 90° = 16 331 239 353 195 370",
      body:
        "Radyanla çalışan bir program tan(π/2) istediğinde 'tanımsız' demez: JavaScript'te Math.tan(Math.PI / 2) tam olarak 16331239353195370 döndürür. Sebep, π/2'nin 64 bitlik bir sayıyla tam yazılamamasıdır: Math.PI / 2 gerçek π/2'den yaklaşık 6.12×10⁻¹⁷ küçüktür ve tan, 90°'nin bu kadar gerisinde yaklaşık 1.633×10¹⁶ değerini alır. Bu sayfa açıyı derece olarak tutarak tuzaktan kaçar: cos 90° tam 0, tan 90° 'tanımsız' çıkar.",
    },
    {
      title: "Ay'da yol bulan algoritma",
      body:
        "CORDIC, Apollo programındaki Ay aracının (Lunar Roving Vehicle) seyrüsefer sisteminde, aracın Ay modülüne göre yönünü ve uzaklığını hesaplamak için kullanıldı. Intel'in 1980'de çıkardığı 8087 matematik yardımcı işlemcisi de CORDIC'le çalışıyordu ve bu sayede donanımda bir çarpma devresine gerek duymadı; yongasının ROM'unda 2⁻ⁿ'lerin 16 arktanjantı saklıdır. Bu sayfanın adım tablosundaki 'arctan 2⁻ᵏ' sütunu aynı sabitleri derece olarak gösterir.",
    },
  ],
  worked: {
    title: "Üç CORDIC adımını elle yürütmek",
    prompt:
      "θ = 30° için CORDIC'i n = 3 adımla elle çalıştır: tablo açıları arctan 1, arctan ½ ve arctan ¼'tür. Başlangıç vektörü (K₃, 0) olsun. Her adımdaki (x, y) ve kalan açı z'yi bul; sonucu (cos 30°, sin 30°) ile karşılaştır, hatanın 2|sin(z/2)|'ye eşit olduğunu ve arctan 2<sup>1−n</sup> sınırının altında kaldığını göster. Sonra sayfanın adım tablosuyla denetle.",
    steps: [
      "Kazancı hesapla: her adım oku √(1 + 2⁻²ᵏ) kat uzatır. K₃ = 1/√((1 + 1)(1 + ¼)(1 + 1/16)) = 1/√2.65625 = 0.613571991; sayfa bunu 0.613572 diye yuvarlar. Açılar 45°, arctan ½ = 26.565051° ve arctan ¼ = 14.036243°; başlangıç (x, y) = (0.613572, 0), z = 30°.",
      "k = 0: z = 30° ≥ 0, d = +1. x ← x − y = 0.613572, y ← y + x = 0.613572; z ← 30° − 45° = −15°. k = 1: z < 0, d = −1. x ← x + y/2 = 1.5·K₃ = 0.920358, y ← y − x/2 = 0.5·K₃ = 0.306786; z ← −15° + 26.565051° = 11.565051°.",
      "k = 2: z > 0, d = +1. x ← x − y/4 = 1.375·K₃ = 0.843661, y ← y + x/4 = 0.875·K₃ = 0.536875; z ← 11.565051° − 14.036243° = −2.471192°. Bütün iş kaydırma ve toplamaydı: 1.375 ikili tabanda 1.011, 0.875 ise 0.111'dir.",
      "Karşılaştır: cos 30° = 0.866025, sin 30° = 0.5. Farklar −0.022364 ve +0.036875, hata √(0.022364² + 0.036875²) = 0.04313. Ok 30° − z = 32.4712° yönündedir ve boyu 1'dir; bu yüzden hata 2·sin(2.471192°/2) = 0.04313 ile aynıdır. Sınır arctan 2<sup>1−3</sup> = 14.036243°, |z| = 2.471192° bunun altındadır.",
      "Sayfada denetle: Hesap makinesi sekmesinde Adım sayısı n'yi 3'e getir. Adım tablosu k = 0, 1, 2 satırlarında + − + yönlerini, kalan z için −15.0000°, 11.5651°, −2.4712°'yi (−2.471192°'nin dört ondalığı; 11.5651 − 14.0362 = −2.4711) ve x, y için 0.613572 / 0.613572, 0.920358 / 0.306786, 0.843661 / 0.536875'i gösterir; sonuç tablosunda hata 4.31×10⁻², kalan açı −2.471192°, sınır ≤ 14.036243°. Bir adım daha'ya basınca hata 8.12×10⁻²'ye çıkar: dördüncü adım 7.125° dönmek zorundadır.",
    ],
    result:
      "Üç adımda (x, y) = (0.843661, 0.536875), kalan açı −2.4712°, hata 0.0431 = 2|sin(z/2)|: yaklaşık 4.5 doğru bit. Hesap hiçbir çarpma içermedi; K₃ bir kez hesaplanıp saklanan bir sabittir.",
  },
  misconceptions: [
    {
      myth: "Sinüs ve kosinüs yalnızca dik üçgende tanımlıdır; 90°'den büyük açıların sinüsü olmaz.",
      truth:
        "Dik üçgen tanımı yalnız dar açılar içindir; birim çember tanımı her gerçel açıya bir nokta, dolayısıyla bir kosinüs ve sinüs verir ve dar açılarda eski tanımla çakışır. Sayfada 150°'ye bas: cos θ = −0.866025, sin θ = 0.500000, referans açı 30°, II. bölge. Negatif açılar saat yönünde dönmektir: kutuya −30 yaz, sayfa aynı noktayı 330° olarak alır.",
    },
    {
      myth: "Radyan da derece gibi bir birimdir; hangisini kullandığın fark etmez.",
      truth:
        "Değer dönüştürülebilir ama formüller dönüştürülemez. sin θ ≈ θ ve (sin θ)′ = cos θ yalnız radyanda doğrudur: sin 0.1 = 0.0998, oysa sin 0.1° = 0.001745. Derecede türeve π/180 çarpanı girer, Taylor serisi x − x³/6 + … de bozulur. Radyan bir oran olduğu için boyutsuzdur: yay uzunluğu bölü yarıçap.",
    },
    {
      myth: "tan 90° sonsuzdur.",
      truth:
        "tan 90° tanımsızdır: cos 90° = 0 olduğundan sin/cos sıfıra bölmedir ve OP doğrusu x = 1 teğetine paralel kalıp onu hiç kesmez. 90°'ye soldan yaklaşınca tan θ +∞'a, sağdan yaklaşınca −∞'a gider; sayfada 89.99° için 5729.577893, 90.01° için −5729.577893 okursun. 'Sonsuz' bir değer değil, bir limit davranışının adıdır.",
    },
    {
      myth: "Hesap makinesi sinüs değerlerini içindeki büyük bir tablodan okur.",
      truth:
        "Hesap makinesi her açının sinüsünü saklamaz, hesaplar. CORDIC yalnızca arctan 2⁻ᵏ gibi birkaç düzine sabit tutar ve gerisini kaydırıp toplayarak bulur; bugünkü kütüphaneler ise açıyı küçük bir aralığa indirip bir polinom hesaplar. Uzun sinüs tabloları, yüzyıllarca hesabı elle yapan insanlar içindi.",
    },
  ],
  glossary: [
    { term: "Birim çember", definition: "Merkezi orijinde, yarıçapı 1 olan çember, x² + y² = 1; θ açısının noktası (cos θ, sin θ)'dır." },
    { term: "Radyan", definition: "Yarıçapı 1 olan çemberde uzunluğu 1 olan yayı gören merkez açı; tam tur 2π rad, 1 rad ≈ 57.2958°." },
    { term: "Referans açı (θ′)", definition: "θ'nın son kolunun x ekseniyle yaptığı 0°–90° arasındaki açı; trigonometrik değerlerin büyüklüğünü verir, işaretini bölge belirler." },
    { term: "Kiriş", definition: "Bir çemberin iki noktasını birleştiren doğru parçası; yarıçapı 1 olan çemberde α yayının kirişi 2 sin(α/2)'dir." },
    { term: "Dönme matrisi R(θ)", definition: "Düzlemi orijin çevresinde θ kadar döndüren [cos θ −sin θ; sin θ cos θ] matrisi; determinantı 1'dir ve R(α)R(β) = R(α + β)." },
    { term: "Fazör", definition: "Bir sinüs dalgasını temsil eden dönen ok; boyu genliği, başlangıç açısı fazı verir ve aynı frekanstaki dalgalar oklar gibi toplanır." },
    { term: "En küçük kareler", definition: "Modelin parametrelerini, ölçümlerden farkların kareleri toplamı en küçük olacak biçimde seçen kestirim yöntemi." },
    { term: "CORDIC", definition: "Bir vektörü ±arctan 2⁻ᵏ açılarıyla döndürerek yalnız toplama, kaydırma ve küçük bir tabloyla sin ve cos hesaplayan algoritma (Volder, 1959)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede trigonometri bir formül listesidir; üniversitede listenin arkasındaki nesneler öne çıkar. <strong>Analiz / Kalkülüs</strong> derslerinde sin ve cos, türevleri birbirine dönen fonksiyonlar olarak yeniden tanınır: y″ + y = 0 denkleminin y(0) = 0, y′(0) = 1 koşulunu sağlayan tek çözümü sin'dir ve Taylor serileri bu tanımdan çıkar. Karmaşık sayılarda aynı nokta e<sup>iθ</sup> = cos θ + i sin θ olarak yazılır ve dönmek bir çarpmaya dönüşür. <strong>Lineer Cebir</strong>'de R(θ) matrisleri <strong>SO(2)</strong> grubunu kurar: determinantı 1 olan ortogonal 2×2 matrisler. Üç boyutta dönmeler SO(3)'tür ve artık sıranın önemi vardır: önce x sonra y ekseni çevresinde 90° dönmek, ters sırayla yapılanla aynı sonucu vermez. Bilgisayar grafiği, robotik ve uzay araçları yönelimi çoğunlukla <em>kuaterniyonlarla</em> tutar: dört sayılık bu nesneler dönmeleri birleştirmeyi ve iki yönelim arasında yumuşak geçişi kolaylaştırır.",
      "<strong>Sinyaller ve Sistemler</strong> dersinde A sin ωt + B cos ωt = R sin(ωt + φ) fazör hesabının çekirdeğidir; <strong>Fourier serisi</strong> periyodik bir sinyali bu tür terimlerin toplamı olarak yazar ve katsayıları, sayfadaki en küçük kareler toplamlarının sürekli hâlidir: a<sub>n</sub> = (2/T)∫ f(t)·cos(nωt) dt. Elektrik devrelerinde 50 Hz'lik şebeke gerilimi saniyede 50 tur dönen bir okun izdüşümüdür ve bobinle kondansatörün etkisi 90°'lik dönmelerle hesaplanır. <strong>Sayısal Analiz</strong>'de soru 'sin x'i nasıl hesaplarız?' olur: açıyı küçük bir aralığa indirmek (bu sayfanın 0°–45°'e indirmesi gibi), minimax polinomları ve makine epsilonu ε = 2⁻⁵². <strong>Bilgisayar Mimarisi</strong> ve sayısal tasarım derslerinde aynı soru donanıma iner: kayan ve sabit nokta gösterimi, kaydırıcılar, toplayıcılar, CORDIC'in hiperbolik ve doğrusal kipleriyle eˣ, ln x, √x ve bölme.",
    ],
    topics: [
      "Fourier serileri",
      "Fazörler ve AC devreler",
      "SO(2), SO(3) ve kuaterniyonlar",
      "Karmaşık üstel e<sup>iθ</sup>",
      "y″ + y = 0 ve harmonik salınıcı",
      "Makine epsilonu ve yuvarlama",
      "CORDIC ve donanım aritmetiği",
      "En küçük kareler kestirimi",
    ],
  },
  quiz: [
    {
      question: "sin θ = 0.6 ve θ II. bölgedeyse cos θ kaçtır?",
      options: ["0.8", "−0.8", "−0.6", "0.4"],
      answer: 1,
      explanation:
        "Birim çemberde cos²θ + sin²θ = 1, yani cos²θ = 1 − 0.36 = 0.64 ve |cos θ| = 0.8. II. bölgede P, y ekseninin solundadır, bu yüzden cos θ = −0.8. 0.4 cevabı 1 − 0.6'dan gelir: özdeşlik kareler içindir. θ ≈ 143.13°'tür; açı kutusuna 143.13 yazınca cos θ kartı −0.799999 okur (143.13°, tam açının yuvarlanmış hâlidir).",
    },
    {
      question:
        "Hesap makinen derece kipindeyken f(x) = sin x fonksiyonunun x = 0'daki eğimi (türevi) yaklaşık kaçtır?",
      options: ["Tam 1, radyandaki gibi", "π/180 ≈ 0.01745", "180/π ≈ 57.3", "0, çünkü sin 0 = 0"],
      answer: 1,
      explanation:
        "Derece kipinde makine sin(πx/180) hesaplar; zincir kuralı türeve π/180 çarpanını getirir: x = 0'da (π/180)·cos 0 = 0.01745. Sınamak için: sin 1° = 0.017452, yani 1 derecelik adımda yükseklik 0.01745 artar. Türevin tam cos x olması yalnız radyanda geçerlidir; analizin radyanla çalışmasının nedeni budur. Fonksiyonun 0 olması eğiminin de 0 olması demek değildir.",
    },
    {
      question: "Bir CORDIC biriminden sonucu yaklaşık 24 bit doğrulukla vermesi isteniyor. Hangisi en iyi tahmindir?",
      options: [
        "Yaklaşık 24 adım; her adım ortalamada bir doğru bit ekler",
        "Tam 24 adım; hata her adımda kesin olarak yarıya iner",
        "Yaklaşık 5 adım; çünkü 2⁵ = 32 > 24",
        "Yaklaşık 240 adım; her bit on adım ister",
      ],
      answer: 0,
      explanation:
        "n adımdan sonra kalan açı en çok arctan 2<sup>1−n</sup>, yani kabaca 2<sup>1−n</sup> radyandır: sınır her adımda yarıya iner, bu da adım başına bir bit demektir. Ama 'kesin olarak yarıya iner' yanlıştır: sayfada θ = 30°'de hata 40 adımın 9'unda büyür (3 adımda 4.31×10⁻², 4 adımda 8.12×10⁻²). Kural ortalamada geçerlidir; varsayılan tohumda tablo eğimi −0.9996 ± 0.0005 bit/adımdır. 30°'de 24 adımdan sonra hata 9.18×10⁻⁸ ≈ 2<sup>−23.38</sup>'dir.",
    },
  ],
  next: [
    {
      href: "karmasik-sayilar.html",
      title: "Karmaşık Sayılar",
      why: "Dönmenin cebiri: cos θ + i sin θ ile çarpmak düzlemi θ kadar döndürür ve toplama formülleri iki karmaşık sayının çarpımından tek satırda çıkar. Euler serisinin kısmi toplamlarının çemberdeki noktaya nasıl sarıldığını orada izle.",
    },
    {
      href: "matris-donusumleri.html",
      title: "Matris Dönüşümleri",
      why: "Açı kaydırıcısıyla döndürme matrisini 11 köşeli bir evin üstünde uygula; ölçek ve kaymayla birleştirince determinantın ve özdeğerlerin dönmeyi nasıl ele verdiğini gör (90°'de özdeğerler ±i).",
    },
    {
      href: "alternatif-akim.html",
      title: "Alternatif Akım: Fazörler",
      why: "Buradaki fazör toplamı bir devrede: Fazör diyagramında bobinin gerilimi akımdan 90° önde, kondansatörünki 90° geride döner ve üçünün toplamı kaynak gerilimini verir.",
    },
    {
      href: "taylor-serisi.html",
      title: "Taylor Serisi",
      why: "Bugünkü kütüphanelerin CORDIC yerine çoğunlukla seçtiği yol: sin ve cos'u polinomla yaklaşık; hatanın derece arttıkça nasıl eridiğini ve Lagrange sınırını ölç.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Calculus Volume 1, §3.5 Derivatives of Trigonometric Functions",
      url: "https://openstax.org/books/calculus-volume-1/pages/3-5-derivatives-of-trigonometric-functions",
      note: "Sinüs ve kosinüsün türevleri. Kanıt, limitler bölümündeki sin h / h → 1 limitini kullanır ve açıyı radyan kabul eder (İngilizce, açık ders kitabı).",
    },
    {
      title: "Wikipedia · CORDIC",
      url: "https://en.wikipedia.org/wiki/CORDIC",
      note: "Volder'in 1956'daki Convair raporu ve B-58, 1959 yayını, Walther'in 1971'deki birleşik CORDIC'i, HP-35, Ay aracı ve Intel 8087; kazanç K (İngilizce).",
    },
    {
      title: "Wikipedia · Ptolemy's table of chords",
      url: "https://en.wikipedia.org/wiki/Ptolemy%27s_table_of_chords",
      note: "Almagest'teki yarım derecelik kiriş tablosu, altmışlık yazım, Batlamyus teoremi ve 1°'nin kirişinin bir eşitsizlikle bulunuşu (İngilizce).",
    },
    {
      title: "Wikipedia · Radian",
      url: "https://en.wikipedia.org/wiki/Radian",
      note: "Tanım, analizdeki rolü ve tarihçe: sözcüğün 1873'te basılması, SI'daki 1960 ve 1995 kararları (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
