window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["oyun-kurami"] = {
  slug: "oyun-kurami",
  title: "Oyun Kuramı: Denge, Minimaks ve İşbirliği",
  field: "Toplum ve Ekonomi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Senin en iyi hamlen rakibinin hamlesine, onunki de seninkine bağlıysa nerede durulur? Nash dengesi, minimaks, tutsak ikilemi turnuvaları ve evrimsel oyunlar: kararların matematiği, varsayımlarıyla birlikte.",
  hook:
    "Bir penaltı atıcısı her seferinde güçlü olduğu köşeye vurursa kaleci bunu öğrenir. Her seferinde yazı tura atarsa da kazancı düşer. Peki hangi oranda karıştırmalı ki kaleci her şeyi bilse bile onu sömüremesin? Cevap, atıcının kendi isteklerinde değil, kalecinin kazançlarında saklı.",
  bigIdea:
    "Bir <strong>Nash dengesi</strong>, hiçbir oyuncunun tek başına stratejisini değiştirerek kazanamadığı bir strateji takımıdır: bir öngörü değil, herkesin ötekilere en iyi yanıtı verdiği bir <em>tutarlılık koşulu</em>; ve bu nokta herkes için en iyi sonuç olmak zorunda değildir.",
  story: [
    "Oyun kuramının başlangıç noktası genellikle 1928 sayılır: John von Neumann o yıl <em>Mathematische Annalen</em>'de yayımladığı makalede, iki kişilik sıfır toplamlı her sonlu oyunda karma stratejilerle bir 'değer' bulunduğunu, yani <strong>minimaks kuramını</strong> kanıtladı. 1944'te Oskar Morgenstern ile yazdığı <em>Theory of Games and Economic Behavior</em> ise oyun kuramını ayrı bir araştırma alanı olarak kurdu; ama çözümlemesi büyük ölçüde sıfır toplamlı oyunlarla sınırlıydı. Fikrin bir öncüsü de vardı: Cournot 1838'de, her firmanın ötekilerin üretimi veriyken kârını en büyüklediği bir oligopol dengesi tanımlamış, ama bunu genel bir kavrama dönüştürmemişti.",
    "Genelleme Princeton'dan geldi. John Nash 1950'de PNAS'ta yayımlanan iki sayfalık bir notta, sonlu her oyunun karma stratejilerde en az bir dengesi olduğunu Kakutani sabit nokta kuramıyla gösterdi; 1951'deki <em>Non-Cooperative Games</em> makalesinde aynı sonucu Brouwer sabit nokta kuramıyla verdi. Nash'in notuyla aynı yıl, 1950'nin başında, RAND Corporation'da Merrill Flood ve Melvin Dresher bugün <strong>tutsak ikilemi</strong> dediğimiz kazanç yapısını iki meslektaşına art arda yüz kez oynattı. Kazançları hapis cezası olan mahkûmlar hikâyesini, fikri Stanford'daki psikologlara anlatmak isteyen Albert Tucker ekledi. Brown 1951'de oyuncuların rakibin geçmiş sıklıklarına en iyi yanıt verdiği <em>hayali oyunu</em> önerdi, Julia Robinson aynı yıl bunun sıfır toplamlı oyunlarda dengeye yaklaştığını kanıtladı; Shapley 1964'te genel oyunlarda sonsuza dek dönebildiğini gösterdi. 1994 Nobel İktisat Ödülü, işbirliksiz oyunlarda denge çözümlemesi için Nash, John Harsanyi ve Reinhard Selten'e verildi.",
    "Sonra soru değişti: akılcı oyuncular olmadan da işbirliği doğabilir mi? John Maynard Smith ve George Price 1973'te <em>Nature</em>'da <strong>evrimsel kararlı strateji</strong> kavramını tanıttı; hayvanların dövüşü artık bir hesap değil, kalıtılan davranışların seçilimiydi. Robert Axelrod 1980'de iki turnuvada bilgisayar programlarını yinelenen tutsak ikileminde karşılaştırdı; ikisini de Anatol Rapoport'un gönderdiği çok basit bir program, kısasa kısas kazandı. İkinci turnuvaya, ilkinin sonuçlarını bilen altmışı aşkın program katılmıştı. 2012'de William Press ve Freeman Dyson, kendi kazancıyla rakibinkinin arasına doğrusal bir bağ dayatan <em>sıfır belirleyicili</em> stratejileri buldu. Bu modellerin gerçek davranışı ne kadar açıkladığı ise hâlâ tartışılıyor; aşağıdaki kavramlar bu tartışmayı çözmez, varsayımları açıkça yazar.",
  ],
  core: [
    {
      heading: "Kazanç matrisi, en iyi yanıt ve denge",
      body:
        "İki oyunculu bir oyun bir matris çiftiyle yazılır: satır oyuncusu i'yi, sütun oyuncusu j'yi seçerse kazançlar A[i][j] ve B[i][j] olur. Kazançlar para değil, oyuncunun sonuçları ne kadar istediğini ölçen <strong>fayda</strong> sayılarıdır; oyuncuların akılcı olduğu ve bütün bunları herkesin bildiği (<strong>ortak bilgi</strong>) varsayılır. Bir hücre, A[i][j] kendi sütununun ve B[i][j] kendi satırının en büyüğüyse saf Nash dengesidir. Tutsak ikileminde bozmak <strong>kesin baskındır</strong>: rakip ne yaparsa yapsın daha çok kazandırır (5 > 3, 1 > 0). Bu yüzden tek denge (Bozma, Bozma) olur ve 1;1 verir, oysa (İşbirliği, İşbirliği) ikisine de 3 verirdi. Denge <strong>Pareto etkin</strong> olmak zorunda değildir.",
      formula: "u<sub>1</sub>(x*, y*) ≥ u<sub>1</sub>(x, y*) ve u<sub>2</sub>(x*, y*) ≥ u<sub>2</sub>(x*, y), her x, y için",
      formulaNote: "Tek taraflı sapma kazandırmaz. Tanım, oyuncuların oraya nasıl vardığını ve birden çok denge varken hangisinin seçileceğini söylemez.",
    },
    {
      heading: "Karma denge: rakibi kayıtsız bırakmak",
      body:
        "Yazı tura eşleştirmede hiçbir hücre denge değildir; denge karma stratejidedir. Karıştıran bir oyuncu, karıştırdığı her saf stratejiden aynı beklenen kazancı almalıdır; yoksa iyisine kayardı. Bu <strong>kayıtsızlık koşulu</strong> şaşırtıcı bir sonuç verir: satır oyuncusunun olasılığı p, <em>sütun oyuncusunun</em> kazançlarından gelir, çünkü p'nin işi sütunu kayıtsız bırakmaktır. 3×3 oyunlarda aynı fikir <strong>destek sayımına</strong> dönüşür: eşit büyüklükte her destek çifti için doğrusal denklemler çözülür, olasılıkların pozitifliği ve desteğin dışındaki stratejilerin daha iyi olmadığı sınanır. Wilson 1971'de hemen her sonlu oyunda denge sayısının tek olduğunu gösterdi: cinsiyetler savaşında iki saf ve bir karma, üçlü eşgüdümde yedi denge.",
      formula: "q = (A<sub>22</sub> − A<sub>12</sub>) / (A<sub>11</sub> − A<sub>12</sub> − A<sub>21</sub> + A<sub>22</sub>)",
      formulaNote: "q, sütun oyuncusunun 1. stratejiyi oynama olasılığı; formülde yalnız satır oyuncusunun kazançları A var. p için aynı formül B ile yazılır.",
    },
    {
      heading: "Sıfır toplam, minimaks ve doğrusal program",
      body:
        "Sıfır toplamlı oyunda sütun oyuncusu satırın kazandığını kaybeder (B = −A). Satır oyuncusu x karışımıyla en kötü durumda min<sub>j</sub>(xᵀA)<sub>j</sub> kazanmayı güvenceye alır; bunu en büyükleyen değer maksimindir. Saf stratejilerle maksimin çoğu zaman minimakstan küçüktür (yazı turada −1 ile +1); von Neumann'ın kuramına göre karma stratejilerde ikisi eşitlenir ve bu ortak sayı oyunun <strong>değeri</strong> v'dir. Hesap bir <strong>doğrusal programdır</strong>: matrise k eklenip pozitif yapılır, Σy′ en büyüklenir, satırın karışımı ikil değişkenlerden okunur; iki oyuncunun sorunu birbirinin ikilidir. Denge karışımı x*, rakip onu bilse bile en az v kazandırır ama rakibin hatalarından da yararlanmaz. Hayali oyun bu değere iki yandan, L ≤ v ≤ U sınırlarıyla yaklaşır; Shapley oyununda ise sıklıklar dönmeye devam eder.",
      formula: "max<sub>x</sub> min<sub>y</sub> xᵀAy = min<sub>y</sub> max<sub>x</sub> xᵀAy = v",
      formulaNote: "Sayfa v'yi üç bağımsız yoldan hesaplar: simpleks, kayıtsızlık koşulları ve (iki satırda) alt zarfın tepesi.",
    },
    {
      heading: "Yarının gölgesi: işbirliği eşiği ve gürültü",
      body:
        "Oyun her turdan sonra δ olasılıkla sürüyorsa ortalama maç 1/(1 − δ) turdur ve tur başı kazanç (1 − δ)Σδᵗuₜ olur. <strong>Tetikçi</strong> (grim), rakip bir kez bozunca sonsuza dek bozar. Ona karşı bugün bozan T alır, sonra hep P: tur başı (1 − δ)T + δP. İşbirliği R verir; bozmanın kârsız olması için (1 − δ)T + δP ≤ R, yani aşağıdaki eşik gerekir. 5, 3, 1, 0 kazançlarında δ* = 0,5. Halk teoremleri bundan genel bir olanak çıkarır: gelecek yeterince önemliyse çok sayıda sonuç denge olabilir, hangisinin oynanacağını söylemez. <strong>Gürültü</strong> ise tabloyu değiştirir: tek bir uygulama hatası iki kısas oyuncusunu misilleme zincirine sokar; δ → 1'de ortalamaları (T + R + P + S)/4'e iner. Cömert kısas ve Pavlov bu zinciri kırar. Press–Dyson gaspçısı (χ = 3) ε = 0 ve δ → 1'de (s₁ − P) = 3(s₂ − P) bağını dayatır.",
      formula: "δ ≥ δ* = (T − R) / (T − P)",
      formulaNote: "Kısasa kısasın dönüşümlü bozmaya karşı dayanması için ayrıca δ ≥ (T − R)/(R − S) gerekir; 5, 3, 1, 0 için 2/3.",
    },
    {
      heading: "Akılcılık yerine seçilim: yineleyici denklemi ve ESS",
      body:
        "Evrimsel oyunlarda kimse hesap yapmaz; stratejiler kalıtılan davranışlardır ve kazanç üreme başarısı olarak okunur. Bir stratejinin payı, kazancı nüfus ortalamasından büyükse artar: bu <strong>yineleyici denklemidir</strong>. Şahin–güvercinde şahin oranı x iken şahinin kazancı x(V − C)/2 + (1 − x)V, güvercininki (1 − x)V/2'dir; ikisini eşitlemek x* = V/C verir (C > V iken). Bu karışık nüfus bir <strong>evrimsel kararlı stratejidir</strong>: az sayıda mutant onu istila edemez. Taş–kâğıt–makasta ise kazanma ve kaybetme eşitken nüfus merkez çevresinde sonsuza dek döner ve x₁x₂x₃ korunur. Turnuva stratejilerini nüfusa koyunca da sonuç gürültüye bağlıdır. Sayfanın varsayılanlarında (ε = 0) eşit paylarla başlayan nüfusta 300 zaman birimi sonra en büyük payı tetikçi alır (%26,3); kibar stratejiler kendi aralarında hep R aldığından aralarında seçilim yoktur ve bu sıra yalnız sömürücülerin elendiği ilk dönemden kalır. ε = 0,05'te aynı sürede cömert kısas nüfusun %97,4'üne çıkar.",
      formula: "ẋ<sub>i</sub> = x<sub>i</sub>(f<sub>i</sub> − <span class=ov>f</span>)",
      formulaNote: "f<sub>i</sub> = (Ax)<sub>i</sub> stratejinin kazancı, <span class=ov>f</span> nüfusun ortalaması. Sonsuz nüfus, rastgele eşleşme ve mutasyonsuz kalıtım varsayılır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var: <strong>01 · Nash dengesi</strong> (hazır ya da kendi 2×2 ve 3×3 oyunun, dengeler iki ayrı yoldan), <strong>02 · Karma stratejiler ve sıfır toplam</strong> (oyunun değeri üç yoldan, tohumlu yinelenen oyun ve hayali oyun), <strong>03 · Tutsak ikilemi turnuvası</strong> (sekiz strateji, ölçülen ve Markov zinciriyle kesin değerler, senin bir tur bellekli stratejin) ve <strong>04 · Evrimsel oyunlar</strong>. Her kartta ölçülen değer kuramın yanında durur; sayılar ondalık virgülle yazılır. Bütün rastgele çekilişler tohumludur: aynı tohum aynı sonucu verir. <strong>Sekmeyi sıfırla</strong> düğmesi ya da R tuşu etkin sekmeyi varsayılana döndürür.",
    experiments: [
      {
        title: "Cinsiyetler savaşı: üç denge, biri ikisine de kötü",
        predict: "İki oyuncu iki saf dengeden birinde buluşamıyorsa karışık oynamak bir çıkış yolu mu? Karma dengede her biri kaç kazanır, saf dengelerdeki 2 ve 3'ten iyi mi?",
        do: "01. sekmede Hazır oyun menüsünden Cinsiyetler savaşı'nı seç. Karma denge, Bütün dengeler: destek sayımı, Karma dengede beklenen kazançlar ve Denge sayısı ve Wilson'ın teklik kuralı kartlarını oku. Sonra Geyik avı'nı seç.",
        observe: "p = 0,6000 · q = 0,4000; destek sayımı 3 denge (2 saf, 1 karma), Wilson kartı '3: tek', iki yolun farkı 1,1 × 10⁻¹⁶. Karma dengede iki oyuncu da 1,200 kazanır; saf dengelerde her biri en az 2. Geyik avında p = 0,7500 ve karma kazanç 3,000, tavşan dengesiyle aynı.",
        explain: "p, sütunu kayıtsız bırakacak biçimde seçilir: sütun Konser'den 2p, Maç'tan 3(1 − p) alır; eşitlik p = 0,6 verir. Karışım yanlış buluşmaları da beraberinde getirdiği için karma denge iki saf dengeden de kötüdür. Hangi dengenin seçileceği modelin dışında kalır.",
      },
      {
        title: "Penaltı: sömürülemeyen karışım",
        predict: "Atıcı iki köşeye yarı yarıya vursa, sömürücü bir kaleciye karşı ortalaması denge değerinin altına mı düşer? Ne kadar?",
        do: "02. sekmede Hazır oyun = Penaltı (öğretim değerleri). Değer kartlarını ve x*, y* kartlarını oku. Rakip Sömürücü kalırken Satır oyuncusunun karışımı menüsünden önce Düzgün: her satır eşit'i, sonra Denge karışımı x*'ı seç; Yinelenen oyun: ölçülen ortalama kartını karşılaştır.",
        observe: "v = 0,7909 üç yoldan da; x* = (0,3636; 0,6364), y* = (0,4545; 0,5455); saf maksimin 0,700 ≤ minimaks 0,900. Düzgün karışım 0,7509 ± 0,0042 alır, güvence düzeyi 0,7500; x* ise 0,7918 ± 0,0041 (güvence 0,7909). Hayali oyun: L = 0,7894, U = 0,7913.",
        explain: "Yarı yarıya karışım kalecinin 'sola atla' seçimine karşı yalnız 0,75 güvenceler; sömürücü bunu öğrenip oraya oturur. x* ise iki sütunu da v'ye eşitler: kaleci ne yaparsa yapsın 0,7909'un altına inemez. Penaltı sayıları öğretim değerleridir, ölçülmüş veri değildir.",
      },
      {
        title: "Yüzde beşlik hata kısası ne kadar yıpratır?",
        predict: "Her hamle 0,05 olasılıkla tersine dönerse iki kısasa kısas oyuncusu tur başına kaç alır: 3'e yakın mı, 2,25'e yakın mı? Turnuvanın birincisi değişir mi?",
        do: "03. sekmede varsayılanda Turnuvanın birincisi ve Kısasa kısas kendi kopyasıyla kartlarını not et. Gürültü ε = 0,05 düğmesine bas; aynı kartları, cömert kısası, Pavlov'u ve Press–Dyson kartını oku. Sonra Kısa gölge δ = 0,3 düğmesine bas.",
        observe: "Varsayılanda birinci Tetikçi (grim) · 2,546, kısas kendi kopyasıyla 3,000. Gürültüyle kısas 2,523 (kesin 2,516), cömert kısas 2,868, Pavlov 2,776; birinci Hep bozma · 2,346; Press–Dyson kalıntısı 1,1 ('ε > 0 bağı bozar'). Kısa gölgede Şu anki δ kartı Evet der: bozan 3,800, tetikçi 3,000; durum satırı δ = 0,30 < δ* = 0,500 yazar.",
        explain: "Tek hata iki kısası dönüşümlü misillemeye sokar; cömert kısas g olasılıkla bağışlayarak, Pavlov iki taraf da bozduktan sonra işbirliğine dönerek zinciri kırar. Sıralama havuza, kazançlara ve gürültüye bağlıdır: sekiz strateji bir öğretim kümesidir, genel bir kazanan ilan etmez.",
      },
      {
        title: "Şahin–güvercin: bedel artınca barış mı?",
        predict: "Dövüşün bedeli 6'dan 8'e çıkarsa nüfustaki şahin oranı ne olur? Bedel kaynağın değerinin altına inerse?",
        do: "04. sekmede Model = Şahin–güvercin, V = 4. Dövüşün bedeli C kaydırıcısını 8'e, sonra 2'ye getir; Şahin oranı: yineleyici denklemi, ESS'de ortalama kazanç ve Dengeye yaklaşma hızı λ kartlarını oku. Ardından Model = Taş–kâğıt–makas seçip Merkeze yakın başla ve Sönümlü düğmelerini dene.",
        observe: "C = 6'da 0,6667, C = 8'de 0,5000; ortalama kazanç 1,0000, λ 1,0000 (kuram 1,0000), sonlu nüfus 0,4982 ± 0,031. C = 2'de nüfus saf şahine gider, λ '—'. TKM'de özdeğerler 0,0000 ± 0,5774i, dönme süresi 11,3983 (doğrusal kuram 10,8828); merkeze yakın başlayınca 10,8878. Sönümlü'de özdeğerler −0,0833 ± 0,7217i olur: gerçel kısım negatiftir.",
        explain: "Kayıtsızlık x(V − C)/2 + (1 − x)V = (1 − x)V/2'den x* = V/C. Bedel arttıkça şahin azalır ama ESS'de ortalama kazanç (V/2)(1 − V/C), herkesin güvercin olduğu V/2'den düşük kalır. TKM'de doğrusal kuram 2π/Im λ ancak merkez yakınında geçerlidir; Sönümlü'de döngü içe doğru kapanır.",
      },
    ],
  },
  wow: [
    {
      title: "Yirmi sekiz sayfalık bir tez",
      body:
        "Nash'in 1950'de Princeton'da savunduğu işbirliksiz oyunlar tezi 28 sayfaydı. Kırk dört yıl sonra, 1994'te, Nobel İktisat Ödülü'nü işbirliksiz oyunlarda denge çözümlemesi için John Harsanyi ve Reinhard Selten ile paylaştı.",
    },
    {
      title: "Denge sayısı neredeyse hep tektir",
      body:
        "Robert Wilson'ın 1971 kuralına göre hemen her sonlu oyunun denge sayısı tektir. Cinsiyetler savaşında iki saf ve bir karma, toplam üç; üçlü eşgüdümde 2³ − 1 = 7. Bütün kazançların eşit olduğu gibi 'dejenere' oyunlar istisnadır; sayfa onlarda sonsuz denge kümelerinin yalnız uç noktalarını bulur ve bunu uyarıyla söyler.",
    },
    {
      title: "Gaspçı kazanır, ama nüfusta yok olur",
      body:
        "Stanford Felsefe Ansiklopedisi'nin aktardığı EXTORT-2 stratejisine karşı rakibin yapabileceği en iyi şey koşulsuz işbirliğidir: o zaman rakip ortalama 2,25, gaspçı 3,5 alır. Ama gaspçılar kendi kopyalarına karşı kötü oynar; aynı maddenin aktardığı evrimsel benzetimlerde, nüfus onu aşınca gaspçı stratejilerde geçen süre neredeyse sıfıra iner. Sayfanın 04. sekmesindeki turnuva nüfusunda da gaspçının payı sıfıra iner.",
    },
  ],
  worked: {
    title: "Penaltının değeri elle",
    prompt:
      "Atıcı (satır) sola ya da sağa vurur, kaleci (sütun) sola ya da sağa atlar. Gol olasılıkları (öğretim değerleri) A = [[0,6; 0,95]; [0,9; 0,7]]: satırlar Sola vur, Sağa vur; sütunlar Sola atla, Sağa atla. Atıcının en iyi karışımını, oyunun değerini ve kalecinin karışımını bul; yarı yarıya vurmanın bedelini hesapla.",
    steps: [
      "Eyer noktası var mı? Satır en küçükleri 0,6 ve 0,7, büyüğü (saf maksimin) 0,7; sütun en büyükleri 0,9 ve 0,95, küçüğü (saf minimaks) 0,9. 0,7 < 0,9: saf stratejilerde denge yok, karıştırmak gerekir.",
      "Atıcı p olasılıkla sola vursun. Kaleci sola atlarsa gol olasılığı 0,6p + 0,9(1 − p) = 0,9 − 0,3p; sağa atlarsa 0,95p + 0,7(1 − p) = 0,7 + 0,25p. Kayıtsızlık: 0,9 − 0,3p = 0,7 + 0,25p, yani 0,55p = 0,2 ve p* = 4/11 ≈ 0,3636.",
      "Değer: v = 0,9 − 0,3 · 4/11 = 87/110 ≈ 0,7909. Kaleci ne yaparsa yapsın atıcı en az bu olasılıkla gol atar.",
      "Kaleci q olasılıkla sola atlasın. Atıcı sola vurursa 0,6q + 0,95(1 − q), sağa vurursa 0,9q + 0,7(1 − q). Eşitlik 0,95 − 0,35q = 0,7 + 0,2q verir: q* = 5/11 ≈ 0,4545. Yerine koyunca yine 0,7909: maksimin minimaksa eşit.",
      "Yarı yarıya vurmak: sola atlayan kaleciye karşı 0,5 · 0,6 + 0,5 · 0,9 = 0,75, sağa atlayana karşı 0,825. Sömürücü kaleci sola atlar; kayıp 0,7909 − 0,75 ≈ 0,041, yani yüz penaltıda yaklaşık dört gol.",
      "Sayfada dene: 02. sekmede Penaltı'yı seç. Simpleks, kayıtsızlık ve grafik yöntemi kartları 0,7909 gösterir, x* = (0,3636; 0,6364), y* = (0,4545; 0,5455); Düzgün karışımın güvence düzeyi 0,7500'dür.",
    ],
    result:
      "Atıcı zayıf köşesi olan sola yalnız %36 oranında vurur, gol olasılığı 0,7909 olur; kaleci sola %45 atlar. Karışımın kendi kazancı en büyüklemekle değil, rakibi kayıtsız bırakmakla belirlendiğine dikkat et.",
  },
  misconceptions: [
    {
      myth: "Nash dengesi oyuncular için en iyi sonuçtur.",
      truth:
        "Denge yalnız tek taraflı sapmanın kazandırmadığı yerdir. Tutsak ikileminde tek denge (Bozma, Bozma) 1;1 verir, oysa (İşbirliği, İşbirliği) ikisine 3 verirdi. 01. sekmede bu hücre çerçevelidir ama yıldızsızdır: Pareto etkin değildir.",
    },
    {
      myth: "Karıştıran oyuncu, kendi kazancı en yüksek olacak biçimde karıştırır.",
      truth:
        "Dengede karıştırdığı her stratejiden aynı kazancı alır; olasılıklarını rakibini kayıtsız bırakmak belirler. Cinsiyetler savaşında sütunun kazançlarını değiştir: satırın p'si değişir, kendi q'su değişmez.",
    },
    {
      myth: "Kısasa kısas kanıtlanmış en iyi stratejidir.",
      truth:
        "Axelrod'un iki turnuvasını kazandı, ama 2004'te benzer düzenle yapılan bir turnuvada elli strateji arasında on dördüncü oldu. Sonuç havuza, kazançlara ve gürültüye bağlıdır: sayfanın varsayılanında birinci tetikçidir, ε = 0,05'te ise kıl payı farkla hep bozma (kesin 2,353, tetikçi 2,345).",
    },
    {
      myth: "Denge karışımını oynayan, rakibin hatalarından da yararlanır.",
      truth:
        "x* yalnız v'yi güvenceye alır. Rakip desteğin içindeki her sütunu oynarsa beklenen kazanç yine v'dir. Rakibin zaafını sömürmek için x*'tan ayrılmak gerekir; o zaman sen de sömürülebilir olursun.",
    },
  ],
  glossary: [
    { term: "Normal biçim", definition: "Oyunun her strateji takımına kazançları atayan matris gösterimi; oyuncular eşzamanlı seçer." },
    { term: "En iyi yanıt", definition: "Rakibin stratejisi veriyken oyuncuya en büyük beklenen kazancı getiren strateji." },
    { term: "Nash dengesi", definition: "Hiçbir oyuncunun tek başına stratejisini değiştirerek kazancını artıramadığı strateji takımı." },
    { term: "Karma strateji", definition: "Saf stratejiler üzerinde bir olasılık dağılımı; desteği, olasılığı pozitif olan stratejilerdir." },
    { term: "Pareto etkinlik", definition: "Birini zarara sokmadan ötekinin durumunu iyileştiren başka bir sonucun olmaması." },
    { term: "Oyunun değeri (v)", definition: "Sıfır toplamlı oyunda maksimin ile minimaksın karma stratejilerdeki ortak değeri." },
    { term: "Devam olasılığı (δ)", definition: "Yinelenen oyunda her turdan sonra maçın sürme olasılığı; geleceğin bugünkü ağırlığı, 'yarının gölgesi'." },
    { term: "Evrimsel kararlı strateji", definition: "Nüfusun hepsi onu oynarken az sayıda mutantın istila edemediği strateji (Maynard Smith ve Price, 1973)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisansta oyun kuramı iktisat, matematik, bilgisayar bilimi ve biyoloji bölümlerinde ayrı derslerle karşına çıkar: <strong>Oyun Kuramı</strong>, <strong>Mikroiktisat</strong>, <strong>Doğrusal Programlama</strong> ya da <strong>Yöneylem Araştırması</strong>, <strong>Matematiksel Biyoloji</strong>. Nash'in varlık kanıtı sabit nokta kuramlarına (Brouwer, Kakutani) dayanır; minimaks kuramı doğrusal programlamanın ikillik kuramıyla aynı sonuçtur. Bu sayfanın 3×3'te kullandığı destek sayımı strateji sayısıyla üstel büyür; Lemke–Howson algoritması ve iki oyunculu oyunlarda bile dengeyi bulmanın hesap karmaşıklığı algoritmik oyun kuramının konusudur.",
      "Sonraki adım oyunun zamanını ve bilgisini açmaktır: sıralı hamleli oyunlarda <em>alt oyun yetkin denge</em> (Selten), eksik bilgili oyunlarda <em>Bayes–Nash dengesi</em> (Harsanyi), kuralları istenen sonucu verecek biçimde tasarlayan <em>mekanizma tasarımı</em>. Evrimsel tarafta yineleyici denklemi bir dinamik sistemdir: Jacobian özdeğerleri, korunan nicelikler ve Lyapunov fonksiyonları burada da işe yarar. Her durumda aynı soruyu sormayı sürdür: varsayımlar nedir ve davranış deneyleri onlarla ne kadar örtüşür?",
    ],
    topics: ["Sabit nokta kuramları", "Doğrusal programlamada ikillik", "Alt oyun yetkin denge", "Bayes–Nash dengesi", "Mekanizma tasarımı", "Yineleyici dinamikleri", "Algoritmik oyun kuramı"],
  },
  quiz: [
    {
      question: "Kazançlar R = 3, P = 1 iken ayartı T 5'ten 7'ye çıkarılırsa, tetikçiler arasında işbirliğinin sürmesi için gereken en küçük devam olasılığı δ* ne olur?",
      options: ["0,5'te kalır", "2/3'e çıkar", "0,4'e iner", "3/4'e çıkar"],
      answer: 1,
      explanation: "δ* = (T − R)/(T − P) = (7 − 3)/(7 − 1) = 4/6 ≈ 0,667. Ayartı büyüdükçe bugünkü bozmanın kazancı artar; onu caydırmak için geleceğe daha çok ağırlık verilmesi gerekir. 03. sekmede Ayartı T'yi 7 yap: İşbirliği eşiği kartı 'ölçülen 0,659 · kuram 0,667' gösterir. Kazanç koşulları kartı da bir uyarı verir: 2R = 6 artık T + S = 7'den küçüktür, yani sırayla sömürmek karşılıklı işbirliğinden çok kazandırır.",
    },
    {
      question: "Şahin–güvercin oyununda (C > V) dövüşün bedeli C iki katına çıkarsa evrimsel kararlı nüfustaki şahin oranı ne olur?",
      options: ["İki katına çıkar", "Yarıya iner", "Değişmez", "Sıfıra iner"],
      answer: 1,
      explanation: "x* = V/C olduğu için C'yi iki katına çıkarmak oranı yarıya indirir: V = 4 iken C'yi 6'dan 12'ye çıkarmak 0,667'yi 0,333'e indirir. Şahinler ancak bedel değerin altına inerse (C ≤ V) bütün nüfusu kaplar.",
    },
    {
      question: "Cinsiyetler savaşında yalnız sütun oyuncusunun kazançları değiştirilirse karma dengede hangisi değişir?",
      options: ["Yalnız sütun oyuncusunun olasılığı q", "Yalnız satır oyuncusunun olasılığı p", "İkisi de", "Hiçbiri"],
      answer: 1,
      explanation: "Satır oyuncusu p'yi, sütun oyuncusunu kayıtsız bırakacak biçimde seçer; bu yüzden p sütunun kazançlarından (B), q ise satırın kazançlarından (A) hesaplanır. Sütun kazançlarını değiştirmek p'yi kaydırır, q'yu bırakır.",
    },
  ],
  next: [
    { href: "uluslararasi-iliskiler.html", title: "Uluslararası İlişkiler: İşbirliği, Güvenlik ve Güç Modelleri", why: "Yinelenen tutuklu ikilemi, gürültü ve tetikçi eşiği burada uluslararası ilişkiler modelleri içinde; yanında Richardson silahlanma modeli ve oylama gücü endeksleri." },
    { href: "mikro-ekonomi-ve-uretim-faktorleri.html", title: "Mikro Ekonomi: Piyasa Dengesi, Tüketici ve Firma", why: "Stratejik etkileşimden önceki adım: bütçe kısıtı altında fayda, firma maliyeti ve piyasa dengesi; modelin sınırı olarak davranışsal bulgular." },
    { href: "dogal-secilim.html", title: "Doğal Seçilim: Popülasyon Genetiği Laboratuvarı", why: "Hardy–Weinberg, seçilim ve genetik sürüklenme: yineleyici denkleminin ve sonlu nüfus benzetiminin biyolojideki kökü." },
    { href: "yoneylem-arastirmasi.html", title: "Yöneylem Araştırması: Doğrusal Programlama, Simpleks ve Kritik Yol", why: "Oyunun değerini hesaplayan yöntemin kendisi: uygun bölge, simpleks adım adım ve ikil sorundan gelen gölge fiyatlar." },
  ],
  sources: [
    { title: "Stanford Encyclopedia of Philosophy · Prisoner's Dilemma", url: "https://plato.stanford.edu/entries/prisoner-dilemma/", note: "Kazanç koşulları, Flood–Dresher deneyi, Axelrod turnuvaları ve 2004 turnuvası, gürültü, cömert kısas, Pavlov ve Press–Dyson gaspçı stratejileri (İngilizce)." },
    { title: "Wikipedia · Nash equilibrium", url: "https://en.wikipedia.org/wiki/Nash_equilibrium", note: "Nash'in 1950 ve 1951 makaleleri, Cournot öncülü, von Neumann–Morgenstern 1944 ve Wilson'ın tek sayı kuralı (İngilizce)." },
    { title: "Wikipedia · Minimax theorem", url: "https://en.wikipedia.org/wiki/Minimax_theorem", note: "von Neumann'ın 1928 makalesi (Mathematische Annalen 100) ve oyun kuramının başlangıcı sayılması (İngilizce)." },
    { title: "Wikipedia · Fictitious play", url: "https://en.wikipedia.org/wiki/Fictitious_play", note: "Brown'un 1951 önerisi, Robinson'ın sıfır toplamlı oyunlarda yakınsama kanıtı ve Shapley'nin döngü örneği (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
