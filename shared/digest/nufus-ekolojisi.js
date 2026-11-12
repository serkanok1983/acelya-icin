window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["nufus-ekolojisi"] = {
  slug: "nufus-ekolojisi",
  title: "Nüfus Ekolojisi: Büyüme, Kaos ve Yaş Yapısı",
  field: "Biyoloji",
  level: "Lisans",
  minutes: 40,
  tagline:
    "On bireyle başlayan bir nüfus önce yaklaşık her 1,4 günde ikiye katlanır, sonra frene basar. Aynı basit kural kuşak kuşak işletilince kaos, bir matrisle yazılınca yaş piramidi doğar.",
  hook:
    "Bir şişeye on hücre koyarsın; üç hafta sonra şişe dolmuştur ve sayı bir daha neredeyse hiç değişmez. Ama aynı büyüme kuralını günlük değil yıllık kuşaklarla işletirsen nüfus bir yıl patlar, ertesi yıl çöker ve birkaç kuşak sonrası artık öngörülemez. Bu kadar basit bir denklem nasıl bu kadar farklı davranabilir?",
  bigIdea:
    "Bir nüfusun geleceğini kişi başı büyüme hızının nüfusla nasıl değiştiği belirler: sürekli zamanda bu fren dengeli bir S eğrisi verir, kuşaklar arası gecikme aşırı düzeltmeye ve kaosa yol açar, yaş yapısı ise büyüme hızını bir matrisin baskın özdeğerine dönüştürür.",
  story: [
    "Thomas Malthus 1798'de, adını koymadan yayımladığı <em>Nüfus İlkesi Üzerine Bir Deneme</em>'de, sınırlanmayan bir nüfusun geometrik dizi gibi, yani üstel olarak büyüdüğünü savundu. Belçikalı matematikçi Pierre François Verhulst bu denemeyi okuduktan sonra, istatistikçi Adolphe Quetelet'nin yönlendirmesiyle üstel modele bir fren ekledi: 1838'de kısa bir not, 1844'te okunup 1845'te basılan ikinci makalesinde de eğriye <em>logistique</em> adını verdi. Bu adı neden seçtiğini hiç açıklamadı. Eğri uzun süre unutuldu; 1910'ların başında A. G. McKendrick onu et suyunda üreyen bakteriler için, 1920'de Johns Hopkins Üniversitesi'nden Raymond Pearl ile Lowell Reed yeniden buldu.",
    "Alfred Lotka 1925'te <em>Elements of Physical Biology</em> kitabında, Vito Volterra 1926'da aynı av–avcı denklemlerini ondan bağımsız olarak yayımladı ve Lotka'nın daha önceki çalışmasını andı. Volterra'yı harekete geçiren, deniz biyoloğu Umberto D'Ancona'nın gözlemiydi: Birinci Dünya Savaşı yıllarında Adriyatik'te balıkçılık azalmışken, yakalanan balıkların içinde yırtıcı balıkların payı artmıştı. Türler arası rekabeti laboratuvara taşıyan ise Rus biyolog Georgy Gause oldu. 1934 tarihli <em>The Struggle for Existence</em> kitabında anlattığı deneylerde, aynı besini paylaşan iki terliksi hayvandan <em>Paramecium aurelia</em> öbürünü, <em>P. caudatum</em>'u sonunda yok etti. Bu sonuç bugün <strong>rekabetçi dışlama ilkesi</strong> olarak bilinir; Joseph Grinnell benzer bir fikri 1904'te arazi gözlemlerinden yazmıştı.",
    "Sonraki otuz yıl modelin iki yeni yüzünü ortaya çıkardı. P. H. Leslie 1945'te <em>Biometrika</em>'da yaş gruplarına ayrılmış bir nüfusu tek bir matrisle ileri taşımayı gösterdi. W. E. Ricker 1954'te Kanada Balıkçılık Araştırma Kurulu dergisinde, balıkçılıkta stok ile yavru katılımı arasındaki ilişki için kendi kuşak modelini yayımladı. 1950'lerde lojistik büyümeye dayanan artık üretim modelleri balıkçılıkta <strong>en büyük sürdürülebilir verim</strong> fikrini yaygınlaştırdı; P. A. Larkin ise 1977'de bu kavrama bir \"kitabe\" yazacak kadar eleştirdi. Kuramsal fizik doktorasını Sydney'de yapan Robert May 1976'da <em>Nature</em>'da yayımladığı \"Simple mathematical models with very complicated dynamics\" makalesiyle, en basit kuşak modelinin bile kaotik olabileceğini ekolojistlere gösterdi.",
  ],
  core: [
    {
      heading: "Üstelden lojistiğe: katlanma, büküm ve rK/4",
      body:
        "Kaynak sınırsızsa her birey birim zamanda ortalama net r kadar yeni birey katar ve nüfus her ln 2 / r sürede ikiye katlanır; r = 0,5 /gün için 1,386 gün. Sabit olan sayı değil orandır: 10'dan 20'ye çıkmak, 1000'den 2000'e çıkmak kadar sürer. Verhulst'ün fikri kişi başı hızın nüfusla doğrusal düşmesidir: N, <strong>taşıma kapasitesi</strong> K'ye yaklaştıkça 1 − N/K sıfıra iner. Toplam hız rN(1 − N/K) bir paraboldür; tepesi N = K/2'dedir ve değeri rK/4'tür. Eğrinin içbükeyliği tam bu anda değişir: <strong>büküm noktası</strong>. Kapalı çözümden büküm anı t* = ln(K/N₀ − 1)/r çıkar; r = 0,5 /gün, K = 1000, N₀ = 10 için 9,190 gün ve en büyük hız 125 birey/gün. N₀ zaten K/2'nin üstündeyse büküm yoktur, eğri baştan yavaşlar.",
      formula: "dN/dt = rN(1 − N/K),  N(t) = K / (1 + (K/N₀ − 1)e<sup>−rt</sup>)",
      formulaNote: "N ≪ K iken parantez ≈ 1 ve model üstele döner; N = K kararlı, N = 0 kararsız dengedir.",
    },
    {
      heading: "Kuşaklar arası gecikme: Ricker modeli ve lojistik harita",
      body:
        "Birçok türde üreme mevsimlidir; nüfus sürekli değil kuşaktan kuşağa değişir: x<sub>t+1</sub> = f(x<sub>t</sub>). Dengenin kararlılığını eğim belirler: |f′(x*)| < 1 ise sapma her kuşakta bu oranla küçülür. Ricker modelinde f′(x*) = 1 − r'dir; r > 2'de eğim −1'in altına iner, nüfus dengenin bir üstüne bir altına sıçrayarak <strong>2-döngüye</strong> geçer. r büyüdükçe döngüler 4, 8, 16 diye <strong>periyot ikilenmesiyle</strong> katlanır ve sonunda kaos başlar. Lojistik haritada ikilenmeler r = 3 ve r = 1 + √6 ≈ 3,449'da olur, kaos ≈ 3,570'te başlar. Bu basamakları <strong>örümcek ağı diyagramı</strong> doğrudan gösterir: eğriden köşegene, köşegenden eğriye yatay ve dikey çizgiler.",
      formula: "Ricker: x′ = x e<sup>r(1 − x)</sup>   ·   lojistik harita: x′ = r x(1 − x)",
      formulaNote: "x = N/K. Sürekli lojistik model hiçbir r'de salınmaz; salınımı yaratan, düzeltmenin bir kuşak geç gelmesidir.",
    },
    {
      heading: "Lyapunov üsteli: kaosun ölçüsü",
      body:
        "İki yörünge δ kadar farkla başlarsa fark kabaca e<sup>λt</sup> ile değişir. <strong>Lyapunov üsteli</strong> λ, yörünge boyunca ln|f′(x)|'in ortalamasıdır. Kararlı dengede λ = ln|f′(x*)| < 0'dır ve fark söner; λ > 0 ise fark üstel büyür: kural tamamen belirlenimci olsa da uzun vadeli öngörü imkânsızlaşır. Farkın 0,1'e ulaşması yaklaşık ln(0,1/δ)/λ kuşak sürer; δ'yı bin kat küçültmek bu süreye yalnız ln 1000/λ ekler. Lojistik haritada r = 4'te λ tam ln 2'dir: her kuşakta ölçüm hatası ortalama iki katına çıkar.",
      formula: "λ = lim (1/n) Σ ln |f′(x<sub>t</sub>)|",
      formulaNote: "λ = 0 çatallanma noktalarında görülür; orada sapmalar üstel değil, cebirsel olarak yavaş söner.",
    },
    {
      heading: "Yaş yapısı: Leslie matrisi ve Euler–Lotka",
      body:
        "Nüfusu yaş sınıflarına ayırırsan bir adım bir matris çarpımıdır: ilk satırda doğurganlıklar Fᵢ, alt köşegende bir sonraki sınıfa geçme olasılıkları Pᵢ. Uzun vadede nüfus <strong>baskın özdeğer</strong> λ₁ ile büyür ve yaş payları <strong>kararlı yaş dağılımına</strong> (sağ özvektör) oturur. λ₁, Euler–Lotka denkleminin tek pozitif köküdür; lᵢ doğumdan i. sınıfa dek hayatta kalma olasılığıdır. R₀ = Σ Fᵢlᵢ ile λ₁ hep aynı yandadır: R₀ > 1 ⇔ λ₁ > 1. Yakınsamanın hızını <strong>sönüm oranı</strong> ρ = λ₁/|λ₂| verir; sapma her adımda kabaca 1/ρ çarpanıyla küçülür. Sol özvektör de <strong>üreme değerini</strong> verir: bir sınıftaki bireyin gelecekteki nüfusa beklenen katkısı. Doğurganlık yalnız tek bir yaş sınıfındaysa (ve bu ilk sınıf değilse) matris <em>ilkel</em> değildir: |λ₂| = λ₁ olur ve dağılım hiç oturmadan döngü yapar.",
      formula: "1 = Σ Fᵢ lᵢ λ<sup>−i</sup>,  lᵢ = P₁P₂⋯Pᵢ₋₁",
      formulaNote: "Matrisin karakteristik denklemi bu denklemle aynıdır; sağ taraf λ'da azalan olduğu için pozitif kök tektir.",
    },
    {
      heading: "Rekabet, Allee eşiği ve hasat",
      body:
        "İki türün lojistik denklemine ötekinin baskısını αᵢⱼ katsayısıyla eklersen dört sonuç çıkar. Her tür kendini ötekinden çok sınırlıyorsa (K₁ > α₁₂K₂ ve K₂ > α₂₁K₁) birlikte yaşarlar; yalnız biri sağlanırsa o tür kazanır; ikisi de sağlanmazsa iç denge bir eyerdir ve kazananı başlangıç belirler. <strong>Allee etkisinde</strong> seyrek nüfusta eş bulmak ya da birlikte savunmak zorlaşır; büyüme bir A eşiğinin altında negatife döner ve N = A kararsız bir dengedir. Hasatta ise sabit kota H, büyüme parabolünü aşağı kaydırır: H > rK/4 olunca hiçbir denge kalmaz ve nüfus, ne kadar büyük başlarsa başlasın, sonlu sürede çöker.",
      formula: "dN₁/dt = r₁N₁(1 − (N₁ + α₁₂N₂)/K₁)   ·   dN/dt = rN(1 − N/K) − H",
      formulaNote: "Hasat dengeleri N± = (K/2)(1 ± √(1 − 4H/(rK))); büyük kök kararlı, küçük kök kararsız eşiktir. Bunlar idealleştirilmiş modellerdir.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeden oluşur ve her sekmede ölçülen değer kuramla yan yana durur. <strong>01 · Üstel ve lojistik büyüme</strong> RK4 ile çözülen eğriyi kapalı çözümle karşılaştırır, katlanma süresini ve büküm noktasını yörüngeden ölçer, gürültülü veriye r, K ve N₀ uydurur. <strong>02 · Ayrık zaman ve kaos</strong> Ricker modeli ile lojistik haritayı örümcek ağı, zaman serisi ve çatallanma diyagramıyla gösterir; Lyapunov üstelini ve iki yakın yörüngenin ayrılmasını ölçer. <strong>03 · Yaş yapısı ve Leslie matrisi</strong> F ve P kutularına yazdığın matrisi projekte eder, λ₁'i üç yoldan (Euler–Lotka, kuvvet yinelemesi, gözlenen oran) bulur ve yaş piramidini kararlı dağılımla kıyaslar. <strong>04 · Rekabet ve taşıma kapasitesi</strong> menüsündeki <strong>Deney</strong> seçicisiyle iki türün rekabeti, Allee etkisi ve hasat arasında geçer. Her sekmenin <strong>Varsayılana dön</strong> düğmesi vardır; <kbd>R</kbd> tuşu etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Lojistik eğri başta gerçekten üstel mi?",
        predict:
          "Varsayılan ayarlarda (r = 0,5 /gün, K = 1000, N₀ = 10) ikiye katlanma süresi ln 2 / r = 1,386 gün mü olur, yoksa K'nin freni bunu uzatır mı? Kaç gün sonra en hızlı büyümeyi beklersin?",
        do:
          "01 sekmesinde varsayılan değerleri oku. Sonra <strong>Model</strong> menüsünden Üstel'i seç ve aynı kutulara bak. Lojistiğe dönüp <strong>Başlangıç nüfusu N₀</strong> kaydırıcısını 600'e getir.",
        observe:
          "Lojistikte ölçülen katlanma 1,407 gündür ve lojistik kesin formülle farkı +0,015 %; büküm kuramda \"t* = 9,190 gün · N = 500\", ölçülen 9,190 gün ve N = 499,9, en büyük hız 125,0 birey/gün (kuram rK/4 = 125,0). Üstel modelde katlanma 1,386 güne iner. N₀ = 600'de sayfa \"N₀ ≥ K/2: büküm yok\" ve katlanma için \"tanımsız: 2N₀ ≥ K\" yazar.",
        explain:
          "N = 10 iken 1 − N/K = 0,99'dur; fren yalnız yüzde bir, bu yüzden katlanma üsteldekinden ancak 0,02 gün uzundur. Hız parabolünün tepesi N = K/2'de olduğundan, o noktanın üstünden başlayan bir nüfus hep yavaşlar; ne büküm vardır ne ikiye katlanma.",
      },
      {
        title: "Kararlı dengeden kaosa dört basamak",
        predict:
          "Ricker modelinde f′(x*) = 1 − r. r = 1,5'te denge kararlı mıdır? r = 2,3'te ne olur? Lyapunov üstelinin işareti hangi basamakta değişir?",
        do:
          "02 sekmesinde Model Ricker iken hazır düğmelere sırayla bas: <strong>Kararlı (r = 1,5)</strong>, <strong>2-döngü (r = 2,3)</strong>, <strong>4-döngü (r = 2,6)</strong>, <strong>Kaos (r = 3,0)</strong>. Her seferinde örümcek ağına, \"Ölçülen uzun dönem davranış\" ve \"Ölçülen Lyapunov üsteli λ\" kutularına bak.",
        observe:
          "r = 1,5: \"x* = 1,0000 · f′(x*) = −0,500\", denge, λ = −0,6931 (kuram ln 0,5 ile aynı). r = 2,3: 2-döngü \"0,408 · 1,592\", λ = −0,9011. r = 2,6: 4-döngü \"0,181 · 0,391 · 1,523 · 1,905\", λ = −0,5751. r = 3,0: kaos, \"aralık 0,031 – 2,462\" ve λ = 0,3886. Bu 20 000 kuşaklık bir ortalamadır; çok daha uzun bir ortalama ≈ 0,386 verir, yani λ'nın ancak ilk iki ondalığına güvenebilirsin. Örümcek ağı önce içe sarılan bir spirale, sonra kapalı bir kareye, en sonda bütün bir bölgeyi dolduran karmaşık bir ağa dönüşür. Ölçülen ilk ikilenme r₁ = 2,0000, ikincisi r₂ = 2,5265.",
        explain:
          "Eğim −1'i geçince denge kararsızlaşır ve yerini kararlı bir 2-döngü alır; 2-döngünün çarpanı f′(a)f′(b) −1'i geçince o da ikilenir. λ periyodik yörüngelerde negatif, kaosta pozitiftir. Lojistik haritayı seçersen aynı merdiven r₁ = 3,0000 ve r₂ = 3,4495 = 1 + √6'da görünür.",
      },
      {
        title: "Yaş dağılımı neden bazen hiç oturmaz?",
        predict:
          "Yalnız son yaş sınıfı doğuruyorsa ve R₀ = 1 ise nüfus sabit mi kalır? Yaş piramidi kararlı dağılıma oturur mu?",
        do:
          "03 sekmesinde önce varsayılan <strong>Büyüyen (öğretim)</strong> matrisinin kutularını oku. Sonra <strong>Yalnız son sınıf doğurur</strong> düğmesine bas ve <strong>Piramidin gösterdiği an t</strong> kaydırıcısını birer birer kaydır.",
        observe:
          "Büyüyende λ₁ = 1,09200 üç yoldan da aynı çıkar; R₀ = 1,2420, \"|λ₂| 0,5096 (karmaşık eşlenik) · ρ = 2,1430\", d(t) 8 adımda 0,01'in altına iner. Yalnız son sınıf doğurduğunda λ₁ = 1,00000 ve R₀ = 1,0000, ama |λ₂| de 1,0000 ve ρ = 1,0000: kuvvet yinelemesi \"yakınsamadı\", yakınsama süresi \"hiç: dalgalanma sönmez\", durum satırı matrisin ilkel olmadığını söyler. Piramit üç adımda bir aynı biçime döner. Tablodaki kararlı paylar 57,14 · 28,57 · 14,29 %'tür.",
        explain:
          "Yakınsama ikinci özdeğerin sönmesine bağlıdır. Doğurganlık tek sınıftaysa kuşaklar birbirine karışmaz; üç özdeğer de birim çember üzerindedir (1'in küp kökleri) ve hiçbiri ötekini bastıramaz. İlk sınıftan başlayan 1000 birey üç adımda bir aynı sınıfa döner.",
      },
      {
        title: "Kotayı en büyük sürdürülebilir verimin %10 üstüne koymak",
        predict:
          "r = 0,5 /gün, K = 1000 ve nüfus K'de başlıyor. Günde 100 birey avlanırsa nüfus nerede dengelenir? Kota rK/4'ün yüzde on üstüne çıkarsa ne olur?",
        do:
          "04 sekmesinde <strong>Deney</strong> menüsünden Hasat ve sürdürülebilir verim'i seç; varsayılan Kota H = 100'ü oku. Sonra <strong>Kotayı rK/4'e koy</strong> ve <strong>Kotayı %10 aş</strong> düğmelerine sırayla bas.",
        observe:
          "rK/4 = 125,00 birey/gün; H = 100'de N₊ = 723,61 (kararlı), N₋ = 276,39 (kararsız eşik), ölçülen son nüfus 723,61 ve sürdürülen verim 100,00 birey/gün. rK/4'te iki denge K/2 = 500,00'de birleşir (yarı kararlı); ölçülen son nüfus 500,50'de kalır, çünkü bu dengeye yaklaşma üstel değil, çok yavaş ve cebirseldir. Kota 138 olunca nüfus çöker; çöküş süresi \"31,23 gün · 31,23\", ölçülen ile kuram aynı.",
        explain:
          "Kota sabit olduğu için parabolün altına çekilen yatay bir doğrudur; doğru tepenin üstüne çıkınca kesişme kalmaz ve dN/dt her yerde negatiftir. Sayfa açıkça söyler: tek stoklu, r ve K'si kesin bilinen idealleştirilmiş bir modeldir, yönetim önerisi değildir.",
      },
    ],
  },
  wow: [
    {
      title: "Önde başlayan kaybetti",
      body:
        "Gause'un deneylerinde <em>Paramecium caudatum</em> başta öndeydi; ama <em>P. aurelia</em> toparlandı ve aynı besin için rekabette onu yok etti. Gause besin ve su koşullarını değiştirdiğinde ise <em>P. caudatum</em> hayatta kaldı: kimin dışlanacağını türler kadar çevre de belirler.",
    },
    {
      title: "Kalabalıkta hayatta kalan japon balıkları",
      body:
        "W. C. Allee ile Bowen 1932'de, koloidal gümüş içeren suda japon balıklarının tankta birey sayısı arttıkça daha iyi hayatta kaldığını yazdı. Seyrekliğin kendisi bir tehlike olabilir: Allee etkisinin özü budur.",
    },
    {
      title: "Planktonun paradoksu",
      body:
        "G. Evelyn Hutchinson 1961'de bir bilmece sordu: açık denizdeki plankton türlerinin hemen hepsi güneş ışığı ve birkaç çözünmüş mineral için yarışır. Rekabetçi dışlamaya göre yalnızca birkaçı kalmalıydı; oysa küçük bir su hacminde bile çok sayıda tür bir arada yaşar.",
    },
  ],
  worked: {
    title: "Kota, iki denge ve çöküş süresi",
    prompt:
      "Lojistik büyüyen bir stokta r = 0,5 /gün ve K = 1000 birey olsun; günde sabit H birey alınıyor. (a) En büyük sürdürülebilir verimi ve hangi nüfusta elde edildiğini bul. (b) H = 100 birey/gün için dengeleri ve kararlılıklarını bul. (c) H = 138 birey/gün (verimin yaklaşık %10 üstü) iken N₀ = K'den başlayan nüfus kaç günde sıfıra iner?",
    steps: [
      "(a) Büyüme g(N) = rN(1 − N/K) bir paraboldür; g′(N) = r(1 − 2N/K) = 0 ⇒ N = K/2 = 500 birey. En büyük değer g(K/2) = rK/4 = 0,5 × 1000 / 4 = 125 birey/gün.",
      "(b) Denge için rN(1 − N/K) = H, yani N² − KN + HK/r = 0. Kök: N± = (K/2)(1 ± √(1 − 4H/(rK))) = 500(1 ± √0,2) = 500(1 ± 0,4472): N₊ = 723,61, N₋ = 276,39 birey. N₊'nın üstünde büyüme kotadan küçüktür, altında büyüktür: N₊ kararlıdır. N₋ ise tersine kararsızdır; nüfus bir kez onun altına düşerse kota onu sıfıra götürür.",
      "(c) Kareyi tamamla: dN/dt = −(r/K)[(N − K/2)² + c²], c² = HK/r − K²/4 = 276 000 − 250 000 = 26 000, c ≈ 161,2 birey. H > rK/4 olduğundan c² > 0 ve dN/dt her N'de negatiftir: denge yoktur.",
      "Değişkenlere ayırıp N₀ = 1000'den 0'a integral al: t = (K/(rc))[arctan((N₀ − K/2)/c) + arctan(K/(2c))]. Burada K/(rc) = 1000/80,62 = 12,40 gün ve iki arctan da arctan(500/161,2) = arctan(3,101) = 1,2588 rad. t = 12,40 gün × 2,5177 ≈ 31,23 gün.",
      "Sayfada dene: 04 sekmesinde Hasat'ı seç; varsayılanda N₊ \"723,61 (kararlı)\", N₋ \"276,39 (kararsız eşik)\" görünür. \"Kotayı %10 aş\" düğmesi H = 138 koyar ve çöküş süresini \"31,23 gün · 31,23\" olarak, ölçülen ve kuram yan yana verir.",
    ],
    result:
      "En büyük sürdürülebilir verim 125 birey/gündür ve N = 500'de elde edilir. H = 100'de nüfus 723,61'de dengelenir, 276,39 kararsız eşiktir. Kota 138'e çıkınca denge kalmaz ve tam kapasiteden başlayan stok bile yaklaşık 31,2 günde tükenir.",
  },
  misconceptions: [
    {
      myth: "Taşıma kapasitesi, nüfusun büyümeye devam edip sonunda çarptığı bir duvardır.",
      truth:
        "Lojistik modelde fren baştan beri çalışır: kişi başı hız r(1 − N/K) her bireyle biraz düşer. En hızlı toplam büyüme K/2'dedir; sonrasında nüfus yavaşlayarak K'ye yaklaşır ve ona sonlu sürede ulaşmaz.",
    },
    {
      myth: "Bir nüfus düzensiz dalgalanıyorsa bunun nedeni dışarıdan gelen rastlantılardır.",
      truth:
        "Ricker modeli tamamen belirlenimcidir, içinde hiç gürültü yoktur; yine de r = 3'te yörünge hiçbir periyoda oturmaz ve λ > 0'dır. Düzensizlik dış etkenlerden de gelebilir, ama yalnız ona bakarak gürültü olduğu sonucuna varamazsın.",
    },
    {
      myth: "Bir nüfusun büyüme hızı, en kalabalık yaş grubunun doğurganlığıyla belirlenir.",
      truth:
        "Uzun dönem büyüme hızı bütün matrisin baskın özdeğeridir; geçici yaş dağılımı yalnız başlangıçtaki dalgalanmayı belirler. Sayfada başlangıcı \"Hepsi 1. sınıfta\" ya da \"Hepsi son sınıfta\" seçsen de N(T)/N(T − 1) aynı λ₁'e yakınsar.",
    },
    {
      myth: "En büyük sürdürülebilir verimde avlanmak güvenlidir, çünkü tanım gereği sürdürülebilirdir.",
      truth:
        "Sabit kotada rK/4 dengesi yarı kararlıdır: nüfusu biraz aşağı iten herhangi bir sapma onu çöküşe götürür. Kota bu değeri biraz aşınca hiç denge kalmaz. Üstelik gerçekte r ve K kesin bilinmez; MSY kavramı tam bu nedenlerle eleştirilmiştir.",
    },
  ],
  glossary: [
    { term: "İç büyüme hızı (r)", definition: "Kaynaklar sınırsızken birey başına birim zamandaki net artış; birimi 1/zamandır." },
    { term: "Taşıma kapasitesi (K)", definition: "Lojistik modelde kişi başı büyümenin sıfıra indiği, kararlı denge nüfusu." },
    { term: "Büküm noktası", definition: "Lojistik eğrinin içbükeyliğinin değiştiği an; N = K/2'dir ve büyüme hızı orada en büyük değeri rK/4'e ulaşır." },
    { term: "Periyot ikilenmesi", definition: "Bir parametre artarken kararlı bir k-döngünün kararsızlaşıp yerini kararlı bir 2k-döngüye bırakması." },
    { term: "Lyapunov üsteli (λ)", definition: "Yakın yörüngeler arasındaki farkın ortalama üstel büyüme hızı; pozitifse sistem kaotiktir." },
    { term: "Leslie matrisi", definition: "İlk satırında yaşa özgü doğurganlıklar, alt köşegeninde hayatta kalma olasılıkları bulunan ve yaş yapılı nüfusu bir adım ileri taşıyan matris." },
    { term: "Kararlı yaş dağılımı", definition: "Baskın özdeğerin özvektörü; uzun vadede yaş paylarının oturduğu ve sonra değişmediği dağılım." },
    { term: "Rekabetçi dışlama", definition: "Aynı sınırlı kaynağı aynı biçimde kullanan iki türün sabit bir çevrede uzun süre bir arada yaşayamayacağı ilkesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede nüfus bir grafik ve bir \"J ile S eğrisi\" karşılaştırmasıdır; üniversitede <strong>Ekoloji</strong> ve <strong>Matematiksel Biyoloji</strong> derslerinde bir dinamik sistemdir. Lojistik denklem <strong>Diferansiyel Denklemler</strong> dersinin ilk ayrılabilir örneklerinden biridir; dengelerin kararlılığını doğrusallaştırma, iki türlü rekabeti faz düzlemi, sıfır çizgileri ve Jacobi matrisinin özdeğerleriyle incelersin. Sayfa bütün bunları RK4 ile sayısal olarak çözer ve kapalı formüllerle karşılaştırır: <strong>Sayısal Analiz</strong>'deki hata mertebesi kavramını da burada görürsün (Δt yarıya inince hata yaklaşık on altıda birine iner; sayfada varsayılan Δt = 0,5 günde oran 14,6'dır ve adım küçüldükçe 16'ya yaklaşır).",
      "Ayrık modeller seni <strong>Dinamik Sistemler ve Kaos</strong> dersine götürür: çatallanma kuramı, periyot ikilenmesindeki ardışık aralıkların oranının yaklaştığı Feigenbaum sabiti δ ≈ 4,669 ve Lyapunov üstelleri. Leslie matrisi ise <strong>Lineer Cebir</strong>'in özdeğer ve özvektörlerinin en somut uygulamalarından biridir; Perron–Frobenius kuramı, baskın özdeğerin neden pozitif ve tek olduğunu, ilkel olmayan matrislerde neden yakınsamanın bozulduğunu açıklar. Bir sonraki adım rastlantıdır: demografik gürültü, sönme olasılıkları ve stokastik süreçler.",
    ],
    topics: ["Ayrılabilir diferansiyel denklemler", "Faz düzlemi ve doğrusallaştırma", "Çatallanma ve kaos", "Perron–Frobenius kuramı", "Doğrusal olmayan en küçük kareler", "Stokastik nüfus modelleri"],
  },
  quiz: [
    {
      question:
        "Lojistik büyüyen bir nüfusta r = 0,5 /gün ve N₀ = 10 sabit tutulup K 1000'den 2000'e çıkarılıyor. Büküm anı t* nasıl değişir?",
      options: ["İki katına çıkar", "Değişmez, çünkü r aynıdır", "Yaklaşık 1,4 gün (≈ ln 2 / r) gecikir", "Yarıya iner"],
      answer: 2,
      explanation:
        "t* = ln(K/N₀ − 1)/r. K/N₀ ≫ 1 iken bu ≈ ln(K/N₀)/r'dir ve K'yi ikiye katlamak paya ln 2 ekler: ln 199/0,5 − ln 99/0,5 ≈ 10,59 − 9,19 = 1,40 gün. Büküm noktası K/2 olduğundan, nüfusun K/2'ye ulaşması için bir katlanma daha gerekir. Sayfada K kaydırıcısını 2000 yapıp \"Kuram: büküm\" kutusuna bakabilirsin.",
    },
    {
      question:
        "İki tür için K₁ = 500, K₂ = 400, α₁₂ = 0,5, α₂₁ = 1,2. Lotka–Volterra rekabet modeline göre ne olur?",
      options: ["İkisi birlikte yaşar", "Tür 1 kazanır", "Tür 2 kazanır", "Kazananı başlangıç belirler"],
      answer: 1,
      explanation:
        "K₁ − α₁₂K₂ = 500 − 200 = 300 > 0: tür 1, tür 2'nin dengesine istila edebilir. K₂ − α₂₁K₁ = 400 − 600 = −200 < 0: tür 2, tür 1'in dengesine giremez. Yalnız bir koşul sağlandığı için tür 1 kazanır. Bu değerler 04 sekmesindeki \"Tür 1 kazanır\" hazır ayarıdır.",
    },
    {
      question:
        "Bir Leslie matrisinde yalnız son (3.) yaş sınıfı doğuruyor ve R₀ = 1. Yaş piramidi neden kararlı dağılıma hiç oturmaz?",
      options: [
        "Çünkü λ₁ = 1 olduğundan nüfus büyümez",
        "Çünkü ikinci özdeğerin modülü de 1'dir, sönüm oranı ρ = 1 olur",
        "Çünkü kuvvet yinelemesi sayısal olarak hatalıdır",
        "Çünkü R₀ = 1 iken kararlı dağılım tanımsızdır",
      ],
      answer: 1,
      explanation:
        "Yakınsama hızını ρ = λ₁/|λ₂| belirler. Bu matriste karakteristik denklem λ³ = 1'dir; üç kökün hepsinin modülü 1'dir ve hiçbiri ötekilerini bastıramaz. Kararlı dağılım vardır, ama ona başlamayan bir nüfus her üç adımda aynı biçime döner. Matris ilkel değildir.",
    },
  ],
  next: [
    { href: "av-avci-lotka-volterra.html", title: "Av–Avcı Modeli: Lotka–Volterra Döngüleri ve Ötesi", why: "Av ile avcının sonsuz döngüsü ve bu sayfadaki rekabet denklemlerinin yedi başlangıçlı faz portresi, ayrıçla birlikte \"Rekabet\" sekmesinde." },
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum", why: "Leslie matrisinin baskın özdeğeri ve özvektörü neden büyüme hızı ve yaş dağılımıdır: özdeğer kuramının kendisi, n×n matrislerle." },
    { href: "salgin-modelleri-sir.html", title: "Salgın Modelleri (SIR): R₀, Sürü Bağışıklığı, Rastlantı ve Ağlar", why: "Aynı R₀ fikri bu kez bulaşmada: eşik, salgın tepesi ve deterministik modelin yanında stokastik sönme." },
    { href: "lorenz-cekici.html", title: "Lorenz Çekicisi: Kaos ve Kelebek Etkisi", why: "Kuşak haritasındaki kaosun sürekli zamandaki karşılığı: üç diferansiyel denklem, garip çekici ve kelebek etkisi." },
  ],
  sources: [
    { title: "Wikipedia · Logistic function", url: "https://en.wikipedia.org/wiki/Logistic_function", note: "Verhulst'ün 1838–1847 makaleleri, Quetelet ve \"logistique\" adı; McKendrick 1911 ile Pearl ve Reed 1920 yeniden keşifleri (İngilizce)." },
    { title: "Wikipedia · Logistic map", url: "https://en.wikipedia.org/wiki/Logistic_map", note: "May'in 1976 makalesi, r = 3 ve 1 + √6'daki ikilenmeler, ≈ 3,56995'te kaosun başlaması, r = 4'te λ = ln 2 ve Feigenbaum sabiti (İngilizce)." },
    { title: "Wikipedia · Leslie matrix", url: "https://en.wikipedia.org/wiki/Leslie_matrix", note: "Leslie 1945 (Biometrika 33, 183–212), baskın özdeğer, kararlı yaş dağılımı ve Euler–Lotka bağlantısı (İngilizce)." },
    { title: "Wikipedia · Competitive exclusion principle", url: "https://en.wikipedia.org/wiki/Competitive_exclusion_principle", note: "Gause'un 1934 Paramecium deneyleri, Grinnell 1904 ve Hutchinson'ın 1961 plankton paradoksu (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
