window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["hesaplama-teorisi"] = {
  slug: "hesaplama-teorisi",
  title: "Hesaplama Teorisi: Makinelerin Yapamayacağı Şeyler",
  field: "Bilgisayar Bilimi",
  level: "Lise ileri",
  minutes: 35,
  tagline:
    "1936'da, daha ortada tek bir bilgisayar yokken, 'hesaplamak' sözcüğü tanımlandı ve aynı yıl hiçbir bilgisayarın asla cevaplayamayacağı bir soru bulundu. Bu sayfa o tanımın ve o sorunun hikâyesi.",
  hook:
    "Telefonundaki uygulama mağazası her programı 'zararlı mı?' diye tarıyor. Peki hiçbir program için yanılmayan bir tarayıcı yazılabilir mi? Cevap hayır; ve bu hayır bir mühendislik eksikliğinden değil, matematiğin kendisinden geliyor. Üstelik bunu kanıtlayan 1936 tarihli makale, aynı zamanda 'her programı çalıştırabilen tek bir makine' fikrini, yani bugünkü bilgisayarı icat etti.",
  bigIdea:
    "Hesaplama bir cihaz değil, bir kavramdır: sonsuz bir bant ve sonlu kurallarla (ya da yalnızca λ işaretiyle) yazılabilen her şey hesaplanabilir; ama <strong>kendine başvuru</strong> yüzünden her soru hesaplanamaz ve hesaplanabilenlerin çoğu da makul sürede hesaplanamaz.",
  story: [
    "1928'de David Hilbert, Wilhelm Ackermann'la yazdığı mantık ders kitabında ve aynı yıl Bologna'daki matematik kongresinde meslektaşlarına bir hedef gösterdi: her matematiksel iddianın doğru mu yanlış mı olduğuna karar veren mekanik bir yöntem bulunsun. Buna <strong>Entscheidungsproblem</strong>, karar problemi dendi. 1931'de Viyana'da genç Kurt Gödel ilk darbeyi vurdu: aritmetiği içeren tutarlı her sistemde ne kanıtlanabilen ne çürütülebilen önermeler vardır. Ama Hilbert'in sorusu hâlâ açıktı, çünkü kimse 'mekanik yöntem' sözünün ne demek olduğunu yazıya dökememişti. 1934'te Gödel, Princeton'daki derslerinde Jacques Herbrand'ın bir mektubundan yola çıkarak <em>genel özyinelemeli fonksiyonları</em> tanımladı; Stephen Kleene bu tanımı işleyip ayağa kaldırdı. Hesaplanabilirlik, ilk kez bir matematiksel nesne olmuştu.",
    "1936, bu alanın mucize yılıdır. Nisan'da Princeton'da Alonzo Church, yalnızca 'fonksiyon tanımla' ve 'fonksiyonu uygula' işlemlerinden oluşan <strong>lambda hesabı</strong>yla hesaplanabilirliği tanımladı ve Hilbert'in istediği yöntemin var olamayacağını gösterdi. 28 Mayıs 1936'da Londra Matematik Derneği'ne, Cambridge'den 23 yaşındaki Alan Turing'in makalesi ulaştı: 'On Computable Numbers'. Turing bambaşka bir yoldan gelmişti; kâğıt ve kalemle hesap yapan bir insanı en yalın parçalarına ayırmıştı: sonsuz bir şerit, bir hücreyi okuyup yazan bir kafa, sonlu sayıda 'akıl durumu'. Aynı makalede iki şey daha vardı: başka her makineyi taklit edebilen tek bir <em>evrensel makine</em> ve o makinenin bile karar veremeyeceği bir soru, durma problemi. Ekim'de New York'ta Emil Post, Turing'inkine şaşırtıcı biçimde benzeyen bir modeli bağımsız olarak yayımladı. Turing o güz Princeton'a gitti, Church'ün yanında doktora yaptı ve 1937'de iki tanımın aynı fonksiyon kümesini verdiğini kanıtladı. Üç farklı yol aynı yere çıkınca ortaya bir kanı doğdu: mekanik olarak hesaplanabilen her şey bu makinelerle hesaplanabilir. Kleene buna sonradan <strong>Church–Turing tezi</strong> adını verdi; kanıtlanmış bir teorem değil, bugüne dek hiç çürütülememiş bir iddiadır.",
    "Savaş sonrası soru 'neyi hesaplayabiliriz'den 'neyi hesaplayamayız'a döndü. 1946'da Post, iki domino listesini eşleme problemini (Post Correspondence) karar verilemez olarak kanıtladı; 1953'te Henry Gordon Rice, programların davranışıyla ilgili aşikâr olmayan <em>her</em> sorunun karar verilemez olduğunu gösterdi. Hilbert'in 1900'de sorduğu 10. problem de aynı kadere ortak oldu: Martin Davis, Hilary Putnam ve Julia Robinson'ın on yıllık çalışmasını, 1970'te 22 yaşındaki Yuri Matiyasevich Fibonacci sayılarının bir özelliğiyle tamamladı. Tamsayılı polinom denklemlerinin çözümü olup olmadığına karar veren genel bir algoritma yoktur. Sonra sorunun ekseni bir kez daha kaydı: hesaplanabilir, ama <strong>ne kadar sürede</strong>? 1965'te Juris Hartmanis ve Richard Stearns 'hesaplama karmaşıklığı' kavramını tanımladı; 1971'de Stephen Cook, 1973'te Sovyetler Birliği'nde Leonid Levin, cevabı hızla doğrulanabilen her problemin tek bir probleme (SAT) sıkıştırılabildiğini buldu. 'Doğrulaması kolay olan her şeyin çözümü de kolay mı?' sorusu, P = NP, 24 Mayıs 2000'den beri Clay Enstitüsü'nün bir milyon dolarlık ödülüyle açık duruyor.",
  ],
  core: [
    {
      heading: "Hesaplamanın en yalın makinesi",
      body:
        "Turing'in makinesinde üç parça vardır: sonsuz uzunlukta, hücrelere bölünmüş bir <strong>bant</strong>; bir hücreyi okuyup üzerine yazabilen ve bir sola ya da bir sağa kayabilen bir <strong>kafa</strong>; ve 'şu durumdayken şunu okursan şunu yaz, şöyle kay, şu duruma geç' diyen sonlu bir <strong>kural tablosu</strong>. Hepsi bu. Bellek yok, işlemci yok, ekran yok. Yine de bugünkü hiçbir bilgisayar bu makinenin yapamadığı bir şeyi yapamaz; yalnızca daha hızlıdır. Sayfadaki dört model kartı, aynı güce dört farklı yoldan ulaşıldığını anlatır: bant, λ, özyineleme ve dizgi yeniden yazma. Hepsinin tam olarak aynı fonksiyonları hesaplayabildiği kanıtlanmıştır; bu yüzden 'hesaplanabilir' demek, 'bunlardan herhangi biriyle hesaplanabilir' demektir.",
      formula: "δ: Q × Γ → Q × Γ × {L, R}",
      formulaNote: "Q durumlar, Γ bant alfabesi. Her kural (durum, okunan) ikilisine (yeni durum, yazılan, yön) üçlüsünü atar.",
    },
    {
      heading: "λ: sayı bile olmadan saymak",
      body:
        "Lambda hesabında sayı, doğru/yanlış, döngü, hiçbir şey hazır gelmez; yalnızca fonksiyon vardır. Church'ün numarası, n sayısını 'bir f fonksiyonunu n kez uygula' talimatı olarak kodlamaktır: 0 = λf.λx.x, 1 = λf.λx.f x, 2 = λf.λx.f (f x). Tek hesaplama kuralı <strong>β-indirgeme</strong>dir: (λx.M) N ifadesinde x yerine N'yi koy. Sayfadaki <strong>SUCC</strong> düğmesi bunu üç adımda gösterir: SUCC = λn.λf.λx.f (n f x), yani 'n'nin yaptığını yap, sonra bir f daha uygula'. Doğru ve yanlış da birer seçicidir: TRUE ilk argümanı, FALSE ikincisini seçer; IF b t f ise yalnızca b t f demektir, çünkü b zaten seçmeyi bilir. Bu kadar az şeyle her şeyin yapılabilmesi, hesaplamanın donanıma değil kurala bağlı olduğunun en çarpıcı kanıtıdır.",
      formula: "n ≡ λf.λx.f<sup>n</sup> x,   SUCC n → λf.λx.f (n f x)",
      formulaNote: "f<sup>n</sup> x, f'nin x'e n kez uygulanması. Toplama: PLUS m n = λf.λx.m f (n f x), 'n kez uygula, sonra m kez daha'.",
    },
    {
      heading: "Durma problemi: makinenin kendine bakması",
      body:
        "Her programın her girdide durup durmayacağını söyleyen bir H programı olduğunu varsay. Ondan yeni bir G programı kur: G, kendisine verilen X programını H'ye 'X, kendi kodunu girdi olarak alırsa durur mu?' diye sordurur ve H'nin dediğinin <em>tersini</em> yapar; 'durur' derse sonsuz döngüye girer, 'durmaz' derse durur. Şimdi G'yi kendi koduyla çalıştır. H 'durur' derse G durmaz; 'durmaz' derse G durur. H ne derse desin yanılır; öyleyse H yoktur. Bu, Cantor'un gerçel sayıların sayılamaz olduğunu gösterdiği <strong>köşegen</strong> argümanının aynısıdır; Gödel'in 'bu önerme kanıtlanamaz' cümlesiyle de aynı iskelet. Kritik nokta programların veri olabilmesidir: bir program başka bir programı girdi olarak okuyabildiği için kendine de bakabilir, ve kendine bakan her yeterince güçlü sistem bir kör nokta taşır.",
      formula: "G(X) := H(X, X) = durur ⇒ döngü;  değilse dur.   G(G) = ?",
      formulaNote: "Hangi cevabı verirsen ver çelişki çıkar. Hiçbir ek varsayım yok: yalnızca 'H vardır' ve 'programlar kopyalanıp girdi olarak verilebilir'.",
    },
    {
      heading: "İndirgeme ve Rice: bir imkânsızlıktan binlercesi",
      body:
        "Karar verilemez olduğu bilinen bir problemi (durma) başka bir probleme <strong>indirgemek</strong>, 'X'i çözebilseydim durmayı da çözerdim' demektir; o zaman X de çözülemez. Rice'ın 1953 teoremi bu numarayı toptan uygular: bir programın <em>ne hesapladığıyla</em> ilgili, bazı programların sağlayıp bazılarının sağlamadığı her özellik karar verilemezdir. 'Bu program hiç çıktı vermiyor mu?', 'Bu iki program aynı işi mi yapıyor?', 'Bu kod zararlı mı?' sorularının hepsi bu sınıftadır. Dikkat: teorem programın <em>metniyle</em> ilgili özellikleri kapsamaz; 'kodda 100'den az satır var mı' elbette karar verilebilir. Sayfanın tablosundaki sonuçlardan Wang dominoları en görseli: 1961'de Hao Wang'ın sorduğu 'bu karo kümesi düzlemi kaplar mı' sorusu, 1966'da Robert Berger tarafından Turing makinesine indirgenerek karar verilemez bulundu.",
      formula: "A ≤ B  ve  A karar verilemez  ⇒  B karar verilemez",
      formulaNote: "≤ işareti 'A, B'ye indirgenir' demek: A'nın her örneği hesaplanabilir biçimde B'nin bir örneğine çevrilebilir.",
    },
    {
      heading: "Hesaplanabilir, ama kaç yılda?",
      body:
        "Karar verilebilir problemler de eşit değildir. Girdi uzunluğu n iken adım sayısı n² ya da n³ gibi bir polinomla büyüyen problemler <strong>P</strong> sınıfındadır: sıralama, en kısa yol. Çözümü verildiğinde polinom sürede <em>doğrulanabilen</em> problemler <strong>NP</strong>'dedir: bir sudoku çözümünü kontrol etmek kolaydır, bulmak değil. P ⊆ NP kesindir; tersi, yani NP ⊆ P, bilinmiyor. Sayfanın peyzajında yukarı çıktıkça kaynak ihtiyacı artar; ama kesikli bir çizgi gibi düşün: komşu basamakların çoğu arasında gerçekten bir fark olduğu kanıtlanmamıştır. Hartmanis–Stearns'ün zaman hiyerarşi teoremi yalnızca üstel aralıkla ayrılan sınıfları kesin ayırır: P ≠ EXPTIME kanıtlıdır. P ile NP arasındaki tek basamak ise alanın en büyük açık sorusudur.",
      formula: "P ⊆ NP ⊆ PSPACE ⊆ EXPTIME,   P ≠ EXPTIME",
      formulaNote: "Zincirdeki ⊆ işaretlerinden en az biri gerçek bir ≠'dir (iki uç farklı); ama hangisi olduğu bilinmiyor.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı ya da canlı bir simülasyon yok; dürüst olmak gerekirse <strong>β-redüksiyon simülatörü</strong> de hazır yazılmış türetmeleri gösterir, metin kutusuna yazdıklarını hesaplamaz. Gerçek kontroller şunlar: dört düğme (<strong>Church 2</strong>, <strong>SUCC</strong>, <strong>TRUE / FALSE</strong>, <strong>Y Combinator</strong>) altlarındaki kutuya adım adım türetme basar; <strong>karmaşıklık peyzajı</strong>ndaki çubukların üzerine gelince tanım baloncuğu çıkar; <strong>büyük teoremler</strong> ızgarasındaki sekiz kart tıklanınca açıklama verir; <strong>karar verilebilirlik tablosu</strong> on iki satırlık sabit bir listedir. Deneylerin bir kısmı bu yüzden kâğıt ve kalemle yapılır: sayfa tanımı verir, hesabı sen yaparsın, sonra sayfanın kendi türetmesiyle karşılaştırırsın.",
    experiments: [
      {
        title: "SUCC düğmesi: kaç ok, kaç gerçek β-adımı?",
        predict:
          "SUCC 2'nin 3'e dönüşmesi için kaç β-indirgeme gerekir? SUCC'ün tanımında üç λ var (n, f, x); bu sana bir ipucu verir mi? Türetmede göreceğin ok sayısıyla gerçek β-adımı sayısı aynı mı olacak?",
        do: "SUCC: n → n+1 düğmesine tıkla. Kutuda beliren satırları say: kaçı '→' ile başlıyor, hangisi '=' ile bitiyor? Her ok satırında hangi λ'nın yok olduğunu işaretle.",
        observe:
          "Dört ok satırı ve bir '= 3 ✓' satırı görürsün. İlk ok yalnızca SUCC ve 2 adlarını açılımlarıyla değiştirir; β-adımı değildir. Kalan üç ok sırayla λn, iç λf ve iç λx'i tüketir: f ((λf.λx.f (f x)) f x) → f ((λx.f (f x)) x) → f (f (f x)). Sonuç λf.λx.f (f (f x)), yani Church 3.",
        explain:
          "Her β-adımı bir λ'yı argümanıyla eşleyip yok eder. SUCC 2'de üç uygulama var (n'ye 2, f'ye f, x'e x), dolayısıyla tam üç β-adımı. Ok sayısı ile adım sayısını ayırt etmek önemlidir: ad açılımı bir hesaplama değil, kısaltmayı çözmedir.",
      },
      {
        title: "TRUE / FALSE düğmesi: sayfanın göstermediği yarıyı sen tamamla",
        predict:
          "Sayfa yalnızca IF TRUE A B → A türetmesini gösterir. IF FALSE A B ne verir? AND TRUE FALSE'un sonucu TRUE mu, FALSE mu? Kaç β-adımı gerekir?",
        do: "TRUE / FALSE düğmesine tıkla; TRUE = λx.λy.x, FALSE = λx.λy.y, IF = λb.λt.λf.b t f ve AND = λp.λq.p q p tanımlarını kâğıda geçir. IF FALSE A B'yi ve AND TRUE FALSE'u satır satır indirge; her satırda yalnızca bir β-adımı at.",
        observe:
          "IF FALSE A B → (λt.λf.FALSE t f) A B → (λf.FALSE A f) B → FALSE A B → (λy.y) B → B: beş adım, sonuç B. AND TRUE FALSE → (λq.TRUE q TRUE) FALSE → TRUE FALSE TRUE → (λy.FALSE) TRUE → FALSE: dört adım, sonuç FALSE. Sayfanın verdiği IF TRUE A B → A da aynı biçimde beş adımdır; kutu bunları tek satıra sıkıştırmıştır.",
        explain:
          "Church boole'ları seçicidir: TRUE ilkini, FALSE ikincisini seçer. IF b t f'nin b t f'den fazlası olmaması bu yüzdendir. AND p q p ise 'p doğruysa q'ya bak, yanlışsa p'yi (yani FALSE'u) döndür' der. Kural tek: β. Mantık, sayı ve koşul hep bu tek kuraldan çıkar.",
      },
      {
        title: "Peyzaj ve teorem kartları: hangi ayrım kanıtlı, hangisi açık?",
        predict:
          "Şu üç iddiadan hangisi kanıtlanmıştır: P ≠ NP, P ≠ EXPTIME, NP ≠ PSPACE? Peyzajda 'P = NP ?' etiketinin hangi iki çubuk arasında duracağını tahmin et.",
        do: "Karmaşıklık peyzajında fareyi P, NP, PSPACE ve EXPTIME çubuklarının üzerinde bekletip baloncukları oku; '$1,000,000' etiketinin yerini not et. Sonra büyük teoremler ızgarasında Zaman Hiyerarşi Teoremi kartına, ardından Cook-Levin kartına tıkla.",
        observe:
          "Etiket P ile NP çubuklarının arasındadır. Zaman hiyerarşisi kartı 'P ⊊ EXPTIME garantidir (ama P ⊊ NP hâlâ açık!)' der; Cook-Levin kartı SAT'ın NP-tam olduğunu ve SAT polinom sürede çözülürse P = NP olacağını söyler. Üç iddiadan yalnızca P ≠ EXPTIME kanıtlıdır; diğer ikisi açıktır.",
        explain:
          "Hiyerarşi teoremi, 'üstel kat daha fazla zaman, kesinlikle daha fazla problem' der; bu yüzden P ile EXPTIME arasındaki uçurum kanıtlanır. Ama aradaki komşu basamaklar (P–NP, NP–PSPACE, PSPACE–EXPTIME) çok yakın olduğundan teorem onları ayıramaz. Zincirin iki ucu farklı, hangi halkanın koptuğu bilinmiyor.",
      },
      {
        title: "Karar tablosu: belleğin biçimi kaderi belirler",
        predict:
          "On iki satırda kaç EVET, kaç HAYIR olacak? 'İki DFA aynı dili tanıyor mu?' ile 'L(TM₁) = L(TM₂)?' aynı soru gibi görünüyor; cevaplarının farklı olmasını bekler misin?",
        do: "Karar verilebilirlik tablosunu baştan sona oku; EVET ve HAYIR'ları say. Her HAYIR satırının not sütununda hangi yöntemin (köşegen, Rice, indirgeme) yazdığını işaretle.",
        observe:
          "5 EVET, 7 HAYIR. İlk dört EVET, sonlu otomatlar ve bağlamdan bağımsız gramerlerle ilgili; yedi HAYIR'ın hepsi Turing makinesi gücündeki sistemlerle ilgili. İki DFA'nın denkliği EVET, iki TM'nin denkliği HAYIR. Beşinci EVET olan 'Mortgage Hesaplama' bir şaka satırıdır; teoremler listesine ait değildir.",
        explain:
          "Sonlu otomatın belleği yoktur; durumlarını tek tek dolaşıp her soruya kesin cevap verebilirsin. Turing makinesi kendi kodunu girdi olarak okuyabilecek kadar güçlüdür ve bu güç, kendine başvuru yoluyla kör nokta yaratır. Aynı soru, makinenin gücü arttıkça EVET'ten HAYIR'a döner: Rice teoremi bunu toptan söyler.",
      },
    ],
  },
  wow: [
    {
      title: "Beş durum, 47 milyon adım, 60 yıl",
      body:
        "Yalnızca beş durumu olan bir Turing makinesi, boş bantta başlayıp durmadan önce en fazla kaç adım atabilir? 1990'da Heiner Marxen ve Jürgen Buntrock 47.176.870 adım atan bir makine buldu; ama 'daha uzun süren yoktur' diyebilmek için beş durumlu bütün makinelerin durup durmayacağına tek tek karar vermek gerekiyordu. Durma problemi genel olarak çözülemediğinden bu, yıllarca süren el emeği istedi. Temmuz 2024'te bbchallenge adlı gönüllü topluluk, bilgisayarla doğrulanmış bir kanıtla BB(5) = 47.176.870 olduğunu kesinleştirdi. Altı durum için ise bilinen alt sınır zaten evrendeki atom sayısından akıl almaz ölçüde büyüktür.",
    },
    {
      title: "22 yaşında bir öğrenci, Hilbert'in 70 yıllık sorusu",
      body:
        "Hilbert'in 1900'de Paris'te sorduğu 10. problem, tamsayı katsayılı bir polinom denkleminin tamsayı çözümü olup olmadığını bulan bir yöntem istiyordu. Davis, Putnam ve Robinson 1961'de problemi tek bir eksik parçaya indirmişti: üstel büyüyen bir dizinin polinom denklemleriyle yazılabildiğini göstermek. Ocak 1970'te Leningrad'da 22 yaşındaki Yuri Matiyasevich o parçayı Fibonacci sayılarının bir özelliğiyle yerine koydu. Sonuç: böyle bir yöntem yoktur; Hilbert'in istediği algoritma, durma problemine indirgenir.",
    },
    {
      title: "Dört satırlık tanım, 19.729 basamaklı sayı",
      body:
        "Sayfanın özyineleme kartında anılan Ackermann fonksiyonu, 'bir sonrakini çağır' kuralını iç içe uygulayan iki satırlık bir tanımdır. A(1, 2) = 4, A(2, 2) = 7, A(3, 2) = 29. A(4, 2) ise 2<sup>65536</sup> − 3'tür: onluk tabanda 19.729 basamak. Fonksiyon tamamen hesaplanabilirdir, her girdi için durur; ama hiçbir sınırlı döngü (for) programıyla yazılamaz, sınırsız while gerekir. Hesaplanabilir ile pratik arasındaki uçurumun en kısa kanıtı budur.",
    },
  ],
  worked: {
    title: "Church sayılarıyla 2 + 3",
    prompt:
      "Sayfadaki metin kutusu '2 + 3' örneğini anar ama hesaplamaz. PLUS = λm.λn.λf.λx.m f (n f x), 2 = λf.λx.f (f x) ve 3 = λf.λx.f (f (f x)) tanımlarıyla PLUS 2 3'ü kâğıtta indirge; kaç β-adımı gerektiğini ve sonucun hangi Church sayısı olduğunu bul.",
    steps: [
      "Dıştaki iki λ'yı argümanlarıyla eşle. PLUS 2 3 → (λn.λf.λx.2 f (n f x)) 3 → λf.λx.2 f (3 f x). İki β-adımı; artık m yerine 2, n yerine 3 var. Dikkat: 2 ve 3'ün kendi λf, λx bağlı değişkenleri dıştaki f ve x'ten ayrıdır, karışmasın diye onları λg.λy diye okuyabilirsin.",
      "İçteki 3 f x'i hesapla: (λg.λy.g (g (g y))) f x → (λy.f (f (f y))) x → f (f (f x)). İki β-adımı daha (toplam 4). Bu, 'f'yi x'e üç kez uygula' demektir.",
      "Şimdi 2 f'yi bu sonuca uygula: (λg.λy.g (g y)) f → λy.f (f y); sonra (λy.f (f y)) (f (f (f x))) → f (f (f (f (f x)))). İki β-adımı daha (toplam 6).",
      "Dıştaki λf.λx'i geri tak: λf.λx.f (f (f (f (f x)))). f tam beş kez uygulanıyor; bu Church 5'tir. Normal sırayla (en dıştaki, en soldaki indirgeme önce) toplam 6 β-adımı; farklı bir sırayla adım sayısı değişebilir ama sonuç değişmez.",
    ],
    result:
      "PLUS 2 3 = λf.λx.f<sup>5</sup> x, yani 5; normal sırada 6 β-adımı. Sayfanın SUCC türetmesindeki 3 adımla karşılaştır: toplama, ardıl işleminin iki kat iş yapan hâlidir ve bütün aritmetik tek kuraldan, β'dan çıkar.",
  },
  misconceptions: [
    {
      myth: "Durma problemi çözülemez, öyleyse hiçbir programın durup durmayacağı bilinemez.",
      truth:
        "Teorem tek tek programlar hakkında değil, <em>her</em> program için çalışan tek bir yöntem hakkındadır. 'while (true) {}' programının durmayacağı apaçıktır; sayfanın SUCC türetmesi üç adımda durur. Olmayan şey, verilen her (program, girdi) çifti için her zaman doğru cevap veren genel algoritmadır.",
    },
    {
      myth: "Daha güçlü bir bilgisayar, mesela kuantum bilgisayar, durma problemini çözer.",
      truth:
        "Kuantum bilgisayar da bir Turing makinesinin hesaplayabildiği fonksiyonları hesaplar; bazı problemlerde çok daha hızlıdır, ama hesaplanabilir kümesini genişletmez. Durma probleminin kanıtı makinenin hızına değil, programların veri olarak okunabilmesine dayanır. Church–Turing tezini aşan bir fiziksel aygıt bugüne dek gösterilememiştir.",
    },
    {
      myth: "NP, 'polinom olmayan' (non-polynomial) demektir.",
      truth:
        "NP, <em>nondeterministic polynomial</em>'ın kısaltmasıdır: çözümü polinom sürede doğrulanabilen problemler. P'deki her problem NP'dedir; sıralama hem P'de hem NP'dedir. NP'nin 'zor problemler' anlamına gelmesi, NP-tam problemlerin P'de olup olmadığının bilinmemesindendir.",
    },
    {
      myth: "Church–Turing tezi kanıtlanmış bir teoremdir.",
      truth:
        "Tez, biçimsel bir kavramla ('Turing makinesinde hesaplanabilir') sezgisel bir kavramı ('mekanik olarak hesaplanabilir') eşler; sezgisel taraf tanımlanmadığı için kanıtlanamaz, ancak çürütülebilir. Kanıtlanmış olan, dört farklı biçimsel modelin birbirine denk olduğudur. Sayfanın Church-Turing kartı bu ayrımı açıkça yapar.",
    },
  ],
  glossary: [
    { term: "Turing makinesi", definition: "Sonsuz bant, okuma-yazma kafası ve sonlu kural tablosundan oluşan soyut makine; hesaplanabilirliğin ölçütü." },
    { term: "Church–Turing tezi", definition: "Mekanik olarak hesaplanabilen her fonksiyonun bir Turing makinesiyle hesaplanabildiği iddiası; teorem değil, çürütülmemiş bir kanı." },
    { term: "β-indirgeme", definition: "Lambda hesabının tek hesaplama kuralı: (λx.M) N ifadesinde M içindeki serbest x'lerin yerine N konması." },
    { term: "Church sayısı", definition: "n sayısının 'bir fonksiyonu n kez uygula' biçiminde kodlanması: n = λf.λx.fⁿ x." },
    { term: "Karar verilebilir", definition: "Her girdi için sonlu adımda doğru evet/hayır cevabı veren bir algoritmanın var olduğu problem." },
    { term: "Özyinelemeli sayılabilir (RE)", definition: "Evet örneklerini sonlu sürede tanıyan ama hayır örneklerinde sonsuza dek çalışabilen bir makinenin var olduğu problem sınıfı; durma problemi buradadır." },
    { term: "İndirgeme", definition: "Bir problemin her örneğini hesaplanabilir biçimde başka bir problemin örneğine çevirme; zorluğu bir problemden ötekine taşır." },
    { term: "NP-tam", definition: "NP'de olan ve NP'deki her problemin polinom sürede kendisine indirgenebildiği problem; biri P'de çıkarsa hepsi P'dedir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bu sayfa bir fikirler galerisidir; üniversitede, çoğu bölümde Sipser'ın <em>Introduction to the Theory of Computation</em> kitabıyla okutulan bir derse dönüşür. Dersin ilk yarısı otomatlardan Turing makinesine çıkar ve durma probleminin kanıtını bu sayfadakinin aynısı, ama her satırı gerekçelendirilmiş hâliyle yazar; ardından Rice teoremi, indirgemeler ve Kleene'in <strong>özyineleme teoremi</strong> gelir: her programın kendi kaynak kodunu okuyabildiğini kanıtlayan ve 'kendini yazdıran program' (quine) bilmecesini çözen sonuç. Gödel'in eksiklik teoremi de bu noktada yeniden ortaya çıkar; bu kez durma probleminden birkaç satırda türetilir.",
      "İkinci yarı karmaşıklıktır: Cook–Levin teoreminin kanıtı, bir Turing makinesinin çalışmasını mantık formülüne çevirmenin nasıl mümkün olduğunu gösterir; sonra Karp'ın 1972'de listelediği 21 problem birbirine indirgenir. Oradan PSPACE, olasılıklı sınıflar (BPP), kuantum sınıfı BQP ve <strong>Kolmogorov karmaşıklığı</strong>na, yani bir dizginin en kısa tanımının uzunluğuna açılırsın. Lambda hesabı ise programlama dilleri dersinde geri döner: tip kuramı, Haskell'in çekirdeği ve Curry–Howard denkliği, yani 'her program bir kanıt, her tip bir teoremdir' fikri. 1936'da bir sorunun cevabı olarak icat edilen λ, bugün derleyicilerin ve kanıt yardımcılarının omurgasıdır.",
    ],
    topics: ["Özyineleme teoremi ve quine'lar", "Rice teoremi ve indirgemeler", "Cook–Levin teoremi ve NP-tamlık", "PSPACE ve oyunlar", "Kolmogorov karmaşıklığı", "Tip kuramı ve Curry–Howard", "Kuantum hesaplama (BQP)"],
  },
  quiz: [
    {
      question: "Rice teoremine göre aşağıdaki sorulardan hangisi karar verilebilir?",
      options: ["Bu program her girdide durur mu?", "Bu programın kaynak kodunda 'while' sözcüğü geçiyor mu?", "Bu iki program her girdide aynı çıktıyı verir mi?", "Bu program hiç çıktı üretir mi?"],
      answer: 1,
      explanation:
        "Rice teoremi programın hesapladığı fonksiyonla ilgili aşikâr olmayan özellikleri kapsar; 'kodda while geçiyor mu' davranışla değil metinle ilgilidir ve basit bir aramayla karar verilir. Diğer üçü davranış özellikleridir ve karar verilemez.",
    },
    {
      question: "Church kodlamasında 3 = λf.λx.f (f (f x)) ise SUCC 3 kaç β-adımında hangi sayıya dönüşür?",
      options: ["1 adımda 4", "3 adımda 4", "4 adımda 4", "3 adımda 6"],
      answer: 1,
      explanation:
        "SUCC = λn.λf.λx.f (n f x) içinde üç uygulama vardır: n'ye 3, sonra 3'ün kendi f ve x'ine dıştaki f ve x. Üç β-adımı sonunda f dört kez uygulanır: λf.λx.f (f (f (f x))) = 4. Sayfanın SUCC 2 türetmesiyle birebir aynı yapı.",
    },
    {
      question: "Aşağıdakilerden hangisi kanıtlanmış bir sonuçtur?",
      options: ["P ≠ NP", "P ≠ EXPTIME", "NP ≠ PSPACE", "Durma problemi NP-tamdır"],
      answer: 1,
      explanation:
        "Zaman hiyerarşi teoremi (Hartmanis–Stearns, 1965) üstel aralıkla ayrılan sınıfların farklı olduğunu kanıtlar; P ≠ EXPTIME bu yüzden kesindir. P–NP ve NP–PSPACE ayrımları açıktır. Durma problemi ise karar verilemezdir, dolayısıyla NP'de bile değildir.",
    },
  ],
  next: [
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Bu sayfanın alt katı: sonlu otomat, yığın ve bantla gerçekten adım adım çalışan simülatörler; karar tablosundaki ilk dört EVET'in nedeni." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "P ile NP arasındaki uçurumu sayılarla gör: n² ile 2ⁿ, girdi büyüdükçe ne olur." },
    { href: "yasam-oyunu.html", title: "Yaşam Oyunu", why: "Dört kurallı bir hücre ızgarası Turing-tamdır: Church–Turing tezinin en beklenmedik örneği bir oyunun içinde." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Rice teoreminin pratik sonucu: derleyici bir optimizasyonun programı bozmayacağından neden hiçbir zaman tam emin olamaz." },
  ],
  sources: [
    { title: "Stanford Encyclopedia of Philosophy · The Church-Turing Thesis", url: "https://plato.stanford.edu/entries/church-turing/", note: "Tezin tarihi, Church, Turing ve Post'un 1936 çalışmaları, tezin neden kanıtlanamayacağı (İngilizce, titiz)." },
    { title: "Stanford Encyclopedia of Philosophy · The Lambda Calculus", url: "https://plato.stanford.edu/entries/lambda-calculus/", note: "β-indirgeme, Church sayıları ve sabit nokta birleştiricileri; sayfadaki düğmelerin arkasındaki kuram." },
    { title: "MIT OCW · 18.404J Theory of Computation (Sipser)", url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", note: "Üniversite dersinin tamamı: video dersler ve problem setleri; durma problemi, Rice, Cook–Levin." },
    { title: "Wikipedia · Halting problem", url: "https://en.wikipedia.org/wiki/Halting_problem", note: "Kanıtın biçimsel hâli, tarihçe ve Busy Beaver gibi ilgili sonuçlar." },
  ],
  revision: "Ekim 2026",
};
