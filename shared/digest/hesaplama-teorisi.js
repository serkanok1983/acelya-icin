window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["hesaplama-teorisi"] = {
  slug: "hesaplama-teorisi",
  title: "Hesaplama Teorisi: Makinelerin Yapamayacağı Şeyler",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "1936'da, daha ortada tek bir bilgisayar yokken, 'hesaplamak' sözcüğü tanımlandı ve aynı yıl hiçbir bilgisayarın asla cevaplayamayacağı bir soru bulundu. Bu sayfa o tanımın ve o sorunun hikâyesi.",
  hook:
    "Telefonundaki uygulama mağazası her programı 'zararlı mı?' diye tarıyor. Peki hiçbir program için yanılmayan bir tarayıcı yazılabilir mi? Cevap hayır; ve bu hayır bir mühendislik eksikliğinden değil, matematiğin kendisinden geliyor. Üstelik bunu kanıtlayan 1936 tarihli makale, aynı sayfalarda 'her programı çalıştırabilen tek bir makine' fikrini, yani bugünkü bilgisayarın kuramını da ortaya koydu.",
  bigIdea:
    "Hesaplama bir cihaz değil, bir kavramdır: sonsuz bir bant ve sonlu kurallarla (ya da yalnızca λ işaretiyle) yazılabilen her şey hesaplanabilir; ama <strong>kendine başvuru</strong> yüzünden her soru hesaplanamaz ve hesaplanabilenlerin çoğu da makul sürede hesaplanamaz.",
  story: [
    "1928'de David Hilbert, Wilhelm Ackermann'la yazdığı mantık ders kitabında bir soruyu matematiğin önüne koydu: verilen bir mantık formülünün her durumda geçerli olup olmadığına, sonlu adımda ve düşünmeden uygulanabilen bir yöntemle karar verilebilir mi? Buna <strong>Entscheidungsproblem</strong>, karar problemi dendi; çözülürse her matematik sorusu ilke olarak bir hesaba dönüşecekti. 1931'de Viyana'da genç Kurt Gödel ilk darbeyi vurdu: aritmetiği içeren, aksiyomları mekanik olarak sıralanabilen tutarlı her sistemde ne kanıtlanabilen ne çürütülebilen önermeler vardır. Ama Hilbert'in sorusu hâlâ açıktı, çünkü kimse 'mekanik yöntem' sözünün ne demek olduğunu yazıya dökememişti. 1934'te Gödel, Princeton'daki derslerinde Jacques Herbrand'ın bir önerisinden yola çıkarak <em>genel özyinelemeli fonksiyonları</em> tanımladı; Stephen Kleene bu tanımı işleyip geliştirdi. Hesaplanabilirlik ilk kez bir matematiksel nesne olmuştu.",
    "1936, bu alanın mucize yılıdır. Princeton'da Alonzo Church, yalnızca 'fonksiyon tanımla' ve 'fonksiyonu uygula' işlemlerinden oluşan <strong>lambda hesabı</strong>yla hesaplanabilirliği tanımladı ve o yıl yayımlanan iki makalesinde Hilbert'in istediği yöntemin var olamayacağını gösterdi. 28 Mayıs 1936'da Londra Matematik Derneği'ne, Cambridge'den 23 yaşındaki Alan Turing'in makalesi ulaştı: 'On Computable Numbers'. Turing bambaşka bir yoldan gelmişti; kâğıt ve kalemle hesap yapan bir insanı en yalın parçalarına ayırmıştı: sonsuz bir şerit, bir hücreyi okuyup yazan bir kafa, sonlu sayıda 'akıl durumu'. Aynı makalede iki şey daha vardı: başka her makineyi taklit edebilen tek bir <em>evrensel makine</em> ve o makinenin bile karar veremeyeceği sorular. Bugün bunların en ünlüsüne durma problemi diyoruz; ad Turing'in değildir, 1950'lerde Martin Davis'ten gelir. Aynı yılın ekim ayında New York'ta Emil Post, Turing'inkine şaşırtıcı biçimde benzeyen bir modeli ondan habersiz dergiye gönderdi. Turing o güz Princeton'a gitti, Church'ün yanında doktora yaptı ve iki tanımın aynı fonksiyon kümesini verdiğini kanıtladı. Üç farklı yol aynı yere çıkınca ortaya bir kanı doğdu: mekanik olarak hesaplanabilen her şey bu makinelerle hesaplanabilir. Bugün <strong>Church–Turing tezi</strong> dediğimiz bu iddiaya adını sonradan Kleene verdi; kanıtlanmış bir teorem değil, bugüne dek çürütülememiş bir iddiadır.",
    "Savaş sonrası soru 'neyi hesaplayabiliriz'den 'neyi hesaplayamayız'a döndü. 1946'da Post, iki domino listesini eşleme problemini (Post Correspondence) karar verilemez olarak kanıtladı; 1953'te Henry Gordon Rice, programların davranışıyla ilgili aşikâr olmayan <em>her</em> sorunun karar verilemez olduğunu gösterdi. Hilbert'in 1900 tarihli listesindeki 10. problem de aynı kadere ortak oldu: Martin Davis, Hilary Putnam ve Julia Robinson'ın yıllara yayılan çalışmasını, 1970'te 22 yaşındaki Yuri Matiyasevich Fibonacci sayılarının bir özelliğiyle tamamladı. Tamsayı katsayılı polinom denklemlerinin tamsayı çözümü olup olmadığına karar veren genel bir algoritma yoktur. Sonra sorunun ekseni bir kez daha kaydı: hesaplanabilir, ama <strong>ne kadar sürede</strong>? 1965'te Juris Hartmanis ve Richard Stearns 'hesaplama karmaşıklığı' kavramını tanımladı. 1971'de Toronto'da Stephen Cook, ondan bağımsız olarak 1973'te Sovyetler Birliği'nde Leonid Levin, cevabı hızla doğrulanabilen her problemin tek bir probleme, SAT'a çevrilebildiğini gösterdi; 1972'de Richard Karp aynı zorluğu paylaşan 21 problemi art arda sıraladı. 'Doğrulaması kolay olan her şeyin çözümü de kolay mı?' sorusu, P = NP, 24 Mayıs 2000'den beri Clay Enstitüsü'nün bir milyon dolarlık ödülüyle açık duruyor.",
  ],
  core: [
    {
      heading: "Hesaplamanın en yalın makinesi",
      body:
        "Turing'in makinesinde üç parça vardır: sonsuz uzunlukta, hücrelere bölünmüş bir <strong>bant</strong>; bir hücreyi okuyup üzerine yazabilen ve bir sola ya da bir sağa kayabilen bir <strong>kafa</strong>; ve 'şu durumdayken şunu okursan şunu yaz, şöyle kay, şu duruma geç' diyen sonlu bir <strong>kural tablosu</strong>. Hepsi bu. Ayrı bir işlemci, ekran, işletim sistemi yok; bellek dediğin şey bandın kendisi. Yine de bugünkü hiçbir bilgisayar bu makinenin hesaplayamadığı bir fonksiyonu hesaplayamaz; yalnızca daha hızlıdır. Sayfadaki dört model kartı, aynı güce dört farklı yoldan ulaşıldığını anlatır: bant, λ, özyineleme ve dizgi yeniden yazma. Hepsinin tam olarak aynı fonksiyonları hesaplayabildiği kanıtlanmıştır; bu yüzden 'hesaplanabilir' demek, 'bunlardan herhangi biriyle hesaplanabilir' demektir.",
      formula: "δ: Q × Γ → Q × Γ × {L, R}",
      formulaNote: "Q durumlar, Γ bant alfabesi. Her kural (durum, okunan) ikilisine (yeni durum, yazılan, yön) üçlüsünü atar; kuralı olmayan bir ikiliye gelindiğinde makine durur.",
    },
    {
      heading: "λ: sayı bile olmadan saymak",
      body:
        "Lambda hesabında sayı, doğru/yanlış, döngü, hiçbir şey hazır gelmez; yalnızca fonksiyon vardır. Church'ün numarası, n sayısını 'bir f fonksiyonunu n kez uygula' talimatı olarak kodlamaktır: 0 = λf.λx.x, 1 = λf.λx.f x, 2 = λf.λx.f (f x). Hesabı yürüten kural <strong>β-indirgeme</strong>dir: (λx.M) N ifadesinde x yerine N'yi koy. Sayfadaki <strong>SUCC</strong> düğmesi bunu gösterir: SUCC = λn.λf.λx.f (n f x), yani 'n'nin yaptığını yap, sonra bir f daha uygula'. Doğru ve yanlış da birer seçicidir: TRUE ilk argümanı, FALSE ikincisini seçer; IF b t f ise yalnızca b t f demektir, çünkü b zaten seçmeyi bilir. Döngü de hazır gelmez: <strong>Y Combinator</strong> düğmesindeki Y = λf.(λx.f (x x)) (λx.f (x x)) ifadesi, bir şeyi kendine uygulayarak (x x) özyinelemeyi adsız fonksiyonlardan kurar. Bu kadar az şeyle her şeyin yapılabilmesi, hesaplamanın donanıma değil kurala bağlı olduğunun en çarpıcı kanıtıdır.",
      formula: "n ≡ λf.λx.f<sup>n</sup> x,   SUCC n → λf.λx.f (n f x)",
      formulaNote: "f<sup>n</sup> x, f'nin x'e n kez uygulanması. Toplama: PLUS m n = λf.λx.m f (n f x), 'n kez uygula, sonra m kez daha'.",
    },
    {
      heading: "Durma problemi: makinenin kendine bakması",
      body:
        "Her programın her girdide durup durmayacağını söyleyen bir H programı olduğunu varsay. Ondan yeni bir G programı kur: G, kendisine verilen X programı için H'ye 'X, kendi kodunu girdi olarak alırsa durur mu?' diye sorar ve H'nin dediğinin <em>tersini</em> yapar; 'durur' derse sonsuz döngüye girer, 'durmaz' derse durur. Şimdi G'yi kendi koduyla çalıştır. H 'durur' derse G durmaz; 'durmaz' derse G durur. H ne derse desin yanılır; öyleyse H yoktur. Bu, Cantor'un gerçel sayıların sayılamaz olduğunu gösterdiği <strong>köşegen</strong> argümanının iskeletidir: programları satırlara, girdileri sütunlara diz, köşegendeki cevapları ters çevir, elde ettiğin satır tabloda olamaz. Gödel'in 'bu önerme kanıtlanamaz' cümlesi de aynı kalıptan çıkar. Kritik nokta programların veri olabilmesidir: bir program başka bir programı girdi olarak okuyabildiği için kendine de bakabilir. Sayma da aynı sonucu sezdirir: programlar sonlu metinlerdir, sayılabilir çokluktadır; evet-hayır soruları (diller) ise sayılamaz çokluktadır. Soruların neredeyse hepsi için program yoktur; durma problemi bunların adını koyabildiğimiz ilk örneğidir.",
      formula: "G(X):  H(X, X) = 'durur' ise sonsuz döngü, değilse dur.   G(G) = ?",
      formulaNote: "Hangi cevabı verirsen ver çelişki çıkar. Kullanılan yalnızca iki şey var: 'H vardır' varsayımı ve programların kopyalanıp girdi olarak verilebilmesi.",
    },
    {
      heading: "İndirgeme ve Rice: bir imkânsızlıktan binlercesi",
      body:
        "Karar verilemez olduğu bilinen bir problemi (durma) başka bir X problemine <strong>indirgemek</strong>, 'X'i çözebilseydim durmayı da çözerdim' demektir; o zaman X de çözülemez. Yön önemlidir: zor olduğu bilinen problem, zorluğu kanıtlanacak olana çevrilir, tersi değil. Rice'ın 1953 teoremi bu numarayı toptan uygular: bir programın <em>ne hesapladığıyla</em> ilgili, bazı programların sağlayıp bazılarının sağlamadığı her özellik karar verilemezdir. 'Bu program hiçbir girdiyi kabul etmiyor mu?', 'Bu iki program aynı işi mi yapıyor?', 'Bu program sıralama mı yapıyor?' sorularının hepsi bu sınıftadır. Dikkat: teorem programın <em>metniyle</em> ilgili özellikleri kapsamaz; 'kodda 100'den az satır var mı' elbette karar verilebilir. Teorem tek tek programlar hakkında da susar: pek çok programın davranışı kanıtlanabilir, olmayan şey hepsi için çalışan tek yöntemdir. Sayfanın tablosundaki sonuçlardan Wang dominoları en görsel olanı: 1961'de Hao Wang'ın sorduğu 'bu karo kümesi düzlemi kaplar mı' sorusunun karar verilemez olduğunu 1966'da Robert Berger, Turing makinelerinin çalışmasını karolara kodlayarak gösterdi.",
      formula: "A ≤ B  ve  A karar verilemez  ⇒  B karar verilemez",
      formulaNote: "≤ işareti 'A, B'ye indirgenir' demek: A'nın her örneği hesaplanabilir biçimde B'nin bir örneğine çevrilebilir, cevap değişmeden.",
    },
    {
      heading: "Hesaplanabilir, ama kaç yılda?",
      body:
        "Karar verilebilir problemler de eşit değildir. Girdi uzunluğu n iken adım sayısı n² ya da n³ gibi bir polinomla sınırlı kalan problemler <strong>P</strong> sınıfındadır: sıralama, en kısa yol. Önerilen bir çözümün polinom sürede <em>doğrulanabildiği</em> problemler <strong>NP</strong>'dedir: doldurulmuş bir sudokuyu kontrol etmek kolaydır, boş olanı doldurmak öyle görünmüyor. P ⊆ NP kesindir; tersi, yani NP ⊆ P, bilinmiyor. Cook–Levin teoremi soruyu tek bir probleme bağlar: SAT, yani bir mantık formülünü doğru yapan bir değer ataması var mı sorusu, <strong>NP-tam</strong>dır; NP'deki her problem polinom sürede ona çevrilir. Kesin bildiğimiz ayrımlar <strong>zaman hiyerarşi teoremi</strong>nden gelir: aynı tür makineye belirgin biçimde daha çok zaman verirsen, kesinlikle daha çok problem çözer. Bu yüzden DTIME(n²) ⊊ DTIME(n³) ve P ⊊ EXPTIME kanıtlıdır. P ile NP'yi ise bu teorem ayıramaz, çünkü aralarındaki fark süre miktarı değil kaynağın türüdür: biri çözümü bulmayı, öteki verilmiş çözümü doğrulamayı ölçer.",
      formula: "f(n)·log f(n) = o(g(n))  ⇒  DTIME(f(n)) ⊊ DTIME(g(n));   P ⊆ NP ⊆ PSPACE ⊆ EXPTIME,  P ≠ EXPTIME",
      formulaNote: "o(g): oran n büyüdükçe sıfıra gider. Zincirin iki ucu farklı olduğundan üç ⊆ işaretinden en az biri gerçek bir ≠'dir; hangisi olduğu bilinmiyor.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı ya da canlı bir simülasyon yok; <strong>β-redüksiyon simülatörü</strong> de hazır yazılmış türetmeleri gösterir, üstündeki metin kutusuna yazdıklarını hesaplamaz. Gerçek kontroller şunlar: dört düğme (<strong>Church 2</strong>, <strong>SUCC: n → n+1</strong>, <strong>TRUE / FALSE</strong>, <strong>Y Combinator</strong>) altlarındaki kutuya adım adım türetme basar; <strong>karmaşıklık peyzajı</strong>ndaki dokuz çubuğun üzerinde fareyi bekletince tek satırlık tanım çıkar (dokunmatik ekranda bu ipucu görünmez; çubukların sağındaki örnekler yine okunur); <strong>büyük teoremler</strong> ızgarasındaki sekiz kart tıklanınca açıklama verir; <strong>karar verilebilirlik tablosu</strong> on iki satırlık sabit bir listedir. Deneyler bu yüzden kâğıt ve kalemle yapılır: sayfa tanımı verir, hesabı sen yaparsın, sonra sayfanın kendi türetmesiyle karşılaştırırsın.",
    experiments: [
      {
        title: "SUCC düğmesi: kaç ok, kaç gerçek β-adımı?",
        predict:
          "SUCC 2'nin 3'e dönüşmesi için kaç β-indirgeme gerekir? SUCC'ün tanımında üç λ var (n, f, x); bu sana bir ipucu verir mi? Türetmede göreceğin ok sayısıyla gerçek β-adımı sayısı aynı mı olacak?",
        do: "SUCC: n → n+1 düğmesine tıkla. Kutuda beliren satırları say: kaçı '→' ile, hangisi '=' ile başlıyor? Her ok satırında hangi λ'nın yok olduğunu işaretle.",
        observe:
          "Dört ok satırı ve bir '= 3 ✓' satırı görürsün. İlk ok yalnızca SUCC ve 2 adlarını açılımlarıyla değiştirir; β-adımı değildir. Kalan üç ok sırayla λn'yi, içteki 2'nin λf'sini ve λx'ini tüketir: λf.λx.f ((λf.λx.f (f x)) f x) → λf.λx.f ((λx.f (f x)) x) → λf.λx.f (f (f x)). Sonuç Church 3.",
        explain:
          "Her β-adımı bir λ'yı argümanıyla eşleyip yok eder. SUCC 2'de üç uygulama var (n'ye 2, f'ye f, x'e x), dolayısıyla tam üç β-adımı. Ok sayısı ile adım sayısını ayırt etmek önemlidir: ad açılımı bir hesaplama değil, kısaltmayı çözmedir. Aynı sayım SUCC 3 ya da SUCC 100 için de üç verir; ardıl işleminin maliyeti sayının büyüklüğüne bağlı değildir.",
      },
      {
        title: "TRUE / FALSE düğmesi: sayfanın göstermediği yarıyı sen tamamla",
        predict:
          "Sayfa yalnızca IF TRUE A B → A türetmesini gösterir. IF FALSE A B ne verir? AND TRUE FALSE'un sonucu TRUE mu, FALSE mu? Her biri kaç β-adımı ister?",
        do: "TRUE / FALSE düğmesine tıkla; TRUE = λx.λy.x, FALSE = λx.λy.y, IF = λb.λt.λf.b t f ve AND = λp.λq.p q p tanımlarını kâğıda geçir. IF FALSE A B'yi ve AND TRUE FALSE'u satır satır indirge; her satırda yalnızca bir β-adımı at.",
        observe:
          "IF FALSE A B → (λt.λf.FALSE t f) A B → (λf.FALSE A f) B → FALSE A B → (λy.y) B → B: beş adım, sonuç B. AND TRUE FALSE → (λq.TRUE q TRUE) FALSE → TRUE FALSE TRUE → (λy.FALSE) TRUE → FALSE: dört adım, sonuç FALSE. Sayfanın verdiği IF TRUE A B → A da aynı biçimde beş adımdır; kutu bunları iki satıra sıkıştırmıştır.",
        explain:
          "Church boole'ları seçicidir: TRUE ilkini, FALSE ikincisini seçer. IF b t f'nin b t f'den fazlası olmaması bu yüzdendir. AND p q = p q p ise 'p doğruysa q'ya bak, yanlışsa p'nin kendisini (yani FALSE'u) döndür' der. Mantık, sayı ve koşul hep aynı tek kuraldan, β'dan çıkar.",
      },
      {
        title: "Peyzaj ve hiyerarşi kartı: hangi ayrım kanıtlı, hangisi açık?",
        predict:
          "Şu dört iddiadan hangileri kanıtlanmıştır: P ≠ NP, P ≠ EXPTIME, NP ≠ PSPACE, DTIME(n²) ≠ DTIME(n³)? Peyzajda 'P = NP ?' etiketinin hangi iki çubuk arasında duracağını tahmin et.",
        do: "Karmaşıklık peyzajında P, NP, PSPACE ve EXPTIME çubuklarının örneklerini oku; '$1,000,000' etiketinin yerini not et. Sonra büyük teoremler ızgarasında Zaman Hiyerarşi Teoremi kartına tıkla ve koşulu kâğıda geçir: f(n) log f(n) = o(g(n)). f = n², g = n³ için f·log f / g oranını n = 10³ ve n = 10⁶'da hesapla (log tabanı 2). Ardından Cook-Levin kartına tıkla.",
        observe:
          "Etiket P ile NP çubuklarının arasındadır. Oran 2·log₂n / n'dir: n = 10³ için yaklaşık 0,020, n = 10⁶ için yaklaşık 0,00004; sıfıra gidiyor, koşul sağlanıyor, öyleyse DTIME(n²) ⊊ DTIME(n³). Kart ayrıca 'P ⊊ EXPTIME garantidir (ama P ⊊ NP hâlâ açık!)' der; Cook-Levin kartı SAT'ın NP-complete olduğunu ve SAT polinom sürede çözülürse P = NP olacağını söyler. Dört iddiadan ikisi kanıtlı: P ≠ EXPTIME ve DTIME(n²) ≠ DTIME(n³).",
        explain:
          "Hiyerarşi teoremi aynı tür kaynağın azı ile çoğunu karşılaştırır; P'nin içinde bile n², n³, n⁴ diye sonsuz kesin basamak vardır. P–NP, NP–PSPACE ve PSPACE–EXPTIME ise farklı türden kaynakları (bulma, doğrulama, bellek) karşılaştırdığı için teoremin kapsamı dışında kalır. Peyzajı okurken iki uyarı: çubuklar tam bir iç içelik çizmez (NP ile co-NP'den hiçbirinin ötekini kapsadığı bilinmiyor) ve en alttaki 'Karar Verilemez' çubuğu üsttekileri kapsayan bir sınıf değil, R'nin dışında kalan bölgedir.",
      },
      {
        title: "Karar tablosu: aynı soru, farklı makine, farklı kader",
        predict:
          "On iki satırda kaç EVET, kaç HAYIR olacak? 'İki DFA aynı dili tanıyor mu?' ile 'L(TM₁) = L(TM₂)?' aynı soru gibi görünüyor; cevaplarının farklı olmasını bekler misin? HAYIR'ların hepsi Turing makineleriyle mi ilgili?",
        do: "Karar verilebilirlik tablosunu baştan sona oku; EVET ve HAYIR'ları say. Her HAYIR satırının not sütununda hangi yöntemin (diyagonal, Rice, redüksiyon, TM simülasyonu) yazdığını işaretle. CFG geçen iki satırı yan yana koy.",
        observe:
          "5 EVET, 7 HAYIR. İlk dört EVET sonlu otomatlar ve bağlamdan bağımsız gramerlerle (CFG) ilgili. İki DFA'nın denkliği EVET, iki TM'nin denkliği HAYIR. Sürpriz satır 'CFG belirsiz mi?': gramerde tek bir dizginin üyeliği EVET (CYK, O(n³)), ama gramerin belirsiz olup olmadığı HAYIR. Beşinci EVET olan 'Mortgage Hesaplama' bir şaka satırıdır; teoremler listesine ait değildir.",
        explain:
          "Sonlu otomatın belleği sınırlıdır; durumlarını tek tek dolaşıp her soruya kesin cevap verebilirsin. Turing makinesi kendi kodunu girdi olarak okuyabilecek kadar güçlüdür ve bu güç, kendine başvuru yoluyla kör nokta yaratır. Karar verilemezlik için Turing gücü şart da değildir: bir yığın bile bazı soruları (belirsizlik, iki gramerin denkliği) sınırın öbür yanına iter, çünkü bu sorular tek bir dizgi hakkında değil, sonsuz sayıda dizgi hakkındadır.",
      },
    ],
  },
  wow: [
    {
      title: "Beş durum, 47 milyon adım",
      body:
        "Beş durumlu, iki simgeli bir Turing makinesi boş bantta başlayıp durmadan önce en fazla kaç adım atabilir? Soruyu 1962'de Tibor Radó sordu: <em>çalışkan kunduz</em>. 1989'da Heiner Marxen ve Jürgen Buntrock, 47.176.870 adım atıp banda 4098 tane 1 yazarak duran bir makine buldu. 'Daha uzunu yok' diyebilmek içinse beş durumlu bütün makinelerin durup durmayacağına karar vermek gerekiyordu; genel bir yöntem olmadığından her inatçı makine ayrı bir kanıt istedi. 2 Temmuz 2024'te bbchallenge adlı gönüllü topluluk, kanıt yardımcısıyla denetlenmiş ispatı duyurdu: S(5) = 47.176.870, Σ(5) = 4098. Bu fonksiyon hesaplanabilir her fonksiyondan hızlı büyür; hesaplanabilseydi durma problemi de çözülürdü.",
    },
    {
      title: "22 yaşında bir öğrenci, Hilbert'in 70 yıllık sorusu",
      body:
        "Hilbert'in 1900 tarihli listesindeki 10. problem, tamsayı katsayılı bir polinom denkleminin tamsayı çözümü olup olmadığını bulan bir yöntem istiyordu. Davis, Putnam ve Robinson 1961'de problemi tek bir eksik parçaya indirmişti: üstel hızla büyüyen bir bağıntının polinom denklemleriyle yazılabildiğini göstermek. Ocak 1970'te Leningrad'da 22 yaşındaki Yuri Matiyasevich o parçayı Fibonacci sayılarının bir özelliğiyle yerine koydu. Sonuç: böyle bir yöntem yoktur, çünkü olsaydı durma problemi de onunla çözülürdü; her Turing makinesinin durup durmaması bir polinom denkleminin çözümüne çevrilebilir.",
    },
    {
      title: "Üç satırlık tanım, 19.729 basamaklı sayı",
      body:
        "Sayfanın özyineleme kartında anılan Ackermann fonksiyonunun bugün kullanılan iki değişkenli biçimi üç satırdır: A(0, n) = n + 1; A(m, 0) = A(m − 1, 1); A(m, n) = A(m − 1, A(m, n − 1)). A(1, 2) = 4, A(2, 2) = 7, A(3, 2) = 29. A(4, 2) ise 2<sup>65536</sup> − 3'tür: onluk tabanda 19.729 basamak. Fonksiyon tamamen hesaplanabilirdir, her girdi için durur; ama tekrar sayısı döngüye girerken belli olan döngülerle (for) yazılamaz, sınırsız while ya da gerçek özyineleme gerekir. Hesaplanabilir ile pratik arasındaki uçurumun en kısa örneği budur.",
    },
  ],
  worked: {
    title: "Church sayılarıyla 2 + 3",
    prompt:
      "Sayfadaki metin kutusu '2 + 3' örneğini anar ama hesaplamaz. PLUS = λm.λn.λf.λx.m f (n f x), 2 = λf.λx.f (f x) ve 3 = λf.λx.f (f (f x)) tanımlarıyla PLUS 2 3'ü kâğıtta indirge; kaç β-adımı gerektiğini ve sonucun hangi Church sayısı olduğunu bul.",
    steps: [
      "Dıştaki iki λ'yı argümanlarıyla eşle. PLUS 2 3 → (λn.λf.λx.2 f (n f x)) 3 → λf.λx.2 f (3 f x). İki β-adımı; artık m yerine 2, n yerine 3 var. Dikkat: 2 ve 3'ün kendi λf, λx bağlı değişkenleri dıştaki f ve x'ten ayrıdır; karışmasın diye onları λg.λy diye yeniden adlandır (α-dönüşümü).",
      "İçteki 3 f x'i hesapla: (λg.λy.g (g (g y))) f x → (λy.f (f (f y))) x → f (f (f x)). İki β-adımı daha (toplam 4). Bu, 'f'yi x'e üç kez uygula' demektir.",
      "Şimdi 2 f'yi bu sonuca uygula: (λg.λy.g (g y)) f → λy.f (f y); sonra (λy.f (f y)) (f (f (f x))) → f (f (f (f (f x)))). İki β-adımı daha (toplam 6).",
      "Dıştaki λf.λx yerinde duruyor: λf.λx.f (f (f (f (f x)))). f tam beş kez uygulanıyor; bu Church 5'tir. Adımları başka bir sırayla atsaydın da sonuç değişmezdi (Church–Rosser teoremi); bu örnekte hiçbir adım indirgenecek bir parçayı çoğaltmadığı için adım sayısı da her sırada 6'dır.",
      "Genelle: PLUS m n her zaman 6 β-adımı ister, m ve n ne olursa olsun; çünkü f<sup>n</sup> x'i kurmak 2, üstüne f<sup>m</sup>'yi geçirmek 2, PLUS'ın kendi λm ve λn'si 2 adımdır. Sayının büyüklüğü adım sayısına değil, terimin uzunluğuna yansır.",
    ],
    result:
      "PLUS 2 3 = λf.λx.f<sup>5</sup> x, yani 5; tam 6 β-adımı. Sayfanın SUCC türetmesindeki 3 adımla karşılaştır: toplama, ardıl işleminin iki kat iş yapan hâlidir ve bütün aritmetik tek kuraldan, β'dan çıkar.",
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
        "Kuantum bilgisayar da bir Turing makinesinin hesaplayabildiği fonksiyonları hesaplar; bazı problemlerde çok daha hızlıdır, ama hesaplanabilirler kümesini genişletmez. Durma probleminin kanıtı makinenin hızına değil, programların veri olarak okunabilmesine dayanır. Church–Turing tezini aşan bir fiziksel aygıt bugüne dek gösterilememiştir.",
    },
    {
      myth: "NP, 'polinom olmayan' (non-polynomial) demektir.",
      truth:
        "NP, <em>nondeterministic polynomial</em>'ın kısaltmasıdır: çözümü polinom sürede doğrulanabilen problemler. P'deki her problem NP'dedir; sıralama hem P'de hem NP'dedir. NP'nin 'zor problemler' diye anılması, NP-tam problemlerin P'de olup olmadığının bilinmemesindendir.",
    },
    {
      myth: "Church–Turing tezi kanıtlanmış bir teoremdir.",
      truth:
        "Tez, biçimsel bir kavramla ('Turing makinesinde hesaplanabilir') sezgisel bir kavramı ('mekanik olarak hesaplanabilir') eşler; sezgisel taraf tanımlanmadığı için kanıtlanamaz, ancak çürütülebilir. Kanıtlanmış olan, farklı biçimsel modellerin birbirine denk olduğudur. Sayfanın Church-Turing Tezi kartı bu ayrımı açıkça yapar.",
    },
  ],
  glossary: [
    { term: "Turing makinesi", definition: "Sonsuz bant, okuma-yazma kafası ve sonlu kural tablosundan oluşan soyut makine; hesaplanabilirliğin ölçütü." },
    { term: "Church–Turing tezi", definition: "Mekanik olarak hesaplanabilen her fonksiyonun bir Turing makinesiyle hesaplanabildiği iddiası; teorem değil, çürütülmemiş bir kanı." },
    { term: "β-indirgeme", definition: "Lambda hesabının hesaplama kuralı: (λx.M) N ifadesinde M içindeki serbest x'lerin yerine N konması." },
    { term: "Church sayısı", definition: "n sayısının 'bir fonksiyonu n kez uygula' biçiminde kodlanması: n = λf.λx.fⁿ x." },
    { term: "Karar verilebilir", definition: "Her girdi için sonlu adımda doğru evet/hayır cevabı veren bir algoritmanın var olduğu problem." },
    { term: "Özyinelemeli sayılabilir (RE)", definition: "Evet örneklerini sonlu sürede tanıyan ama hayır örneklerinde sonsuza dek çalışabilen bir makinenin var olduğu problem sınıfı; durma problemi buradadır." },
    { term: "İndirgeme", definition: "Bir problemin her örneğini hesaplanabilir biçimde başka bir problemin örneğine çevirme; zorluğu birinci problemden ikincisine taşır." },
    { term: "NP-tam", definition: "NP'de olan ve NP'deki her problemin polinom sürede kendisine indirgenebildiği problem; biri P'de çıkarsa NP'nin hepsi P'dedir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfa bir fikirler galerisidir; üniversitede, bilgisayar mühendisliği ve matematik bölümlerinde çoğunlukla Sipser'ın <em>Introduction to the Theory of Computation</em> kitabıyla okutulan <strong>Hesaplama Kuramı</strong> (ya da Biçimsel Diller ve Otomata) dersine dönüşür. Dersin ilk yarısı otomatlardan Turing makinesine çıkar ve durma probleminin kanıtını bu sayfadakinin aynısı, ama her satırı gerekçelendirilmiş hâliyle yazar; ardından Rice teoremi, indirgemeler ve Kleene'in <strong>özyineleme teoremi</strong> gelir: her programın kendi kaynak kodunu elde edip kullanabileceğini kanıtlayan ve 'kendini yazdıran program' (quine) bilmecesini çözen sonuç. Gödel'in eksiklik teoremi de bu noktada yeniden ortaya çıkar; bu kez durma probleminden birkaç satırda türetilir.",
      "İkinci yarı karmaşıklıktır: Cook–Levin teoreminin kanıtı, bir Turing makinesinin polinom adımlık çalışmasının bir mantık formülüne nasıl çevrildiğini gösterir; sonra Karp'ın 1972'de listelediği 21 problem birbirine indirgenir. Oradan PSPACE, olasılıklı sınıflar (BPP), kuantum sınıfı BQP ve <strong>Kolmogorov karmaşıklığı</strong>na, yani bir dizginin en kısa tanımının uzunluğuna açılırsın. Lambda hesabı ise Programlama Dilleri dersinde geri döner: tip kuramı, Haskell'in çekirdeği ve Curry–Howard denkliği, yani 'her program bir kanıt, her tip bir önermedir' fikri. 1930'larda mantığın temelleri için kurulan λ, bugün derleyicilerin ve kanıt yardımcılarının omurgasıdır.",
    ],
    topics: ["Özyineleme teoremi ve quine'lar", "Rice teoremi ve indirgemeler", "Cook–Levin teoremi ve NP-tamlık", "Zaman ve bellek hiyerarşi teoremleri", "PSPACE ve oyunlar", "Kolmogorov karmaşıklığı", "Tip kuramı ve Curry–Howard", "Kuantum hesaplama (BQP)"],
  },
  quiz: [
    {
      question: "Rice teoremine göre aşağıdaki sorulardan hangisi karar verilebilir?",
      options: ["Bu program her girdide durur mu?", "Bu programın kaynak kodunda 'while' sözcüğü geçiyor mu?", "Bu iki program her girdide aynı çıktıyı verir mi?", "Bu program en az bir girdide çıktı üretir mi?"],
      answer: 1,
      explanation:
        "Rice teoremi programın hesapladığı fonksiyonla ilgili aşikâr olmayan özellikleri kapsar; 'kodda while geçiyor mu' davranışla değil metinle ilgilidir ve basit bir aramayla karar verilir. Diğer üçü davranış özellikleridir ve karar verilemez.",
    },
    {
      question: "Church kodlamasında 3 = λf.λx.f (f (f x)) ise SUCC 3 kaç β-adımında hangi sayıya dönüşür?",
      options: ["1 adımda 4", "3 adımda 4", "4 adımda 4", "3 adımda 6"],
      answer: 1,
      explanation:
        "SUCC = λn.λf.λx.f (n f x) içinde üç uygulama vardır: n'ye 3, sonra 3'ün kendi f ve x'ine dıştaki f ve x. Üç β-adımı sonunda f dört kez uygulanır: λf.λx.f (f (f (f x))) = 4. Sayfanın SUCC 2 türetmesiyle birebir aynı yapı; adım sayısı n'ye bağlı değildir.",
    },
    {
      question: "Yeni bir X probleminin karar verilemez olduğunu kanıtlamak istiyorsun. Hangisini göstermen gerekir?",
      options: [
        "X'in her örneği durma probleminin bir örneğine çevrilebilir",
        "Durma probleminin her örneği X'in bir örneğine çevrilebilir",
        "X'i çözen bilinen bütün programlar çok yavaştır",
        "X, NP'de değildir",
      ],
      answer: 1,
      explanation:
        "İndirgemenin yönü 'bilinen zor → yeni problem' olmalıdır: durmayı X'e çevirebiliyorsan, X'i çözen bir program durmayı da çözerdi; bu olanaksız, öyleyse X çözülemez. Ters yön (X'i durmaya çevirmek) yalnızca X'in durmadan daha zor olmadığını söyler; kolay problemler de durmaya çevrilebilir. Yavaşlık ise karar verilemezlik değildir: P ≠ EXPTIME kanıtlıdır ama EXPTIME'daki her problem karar verilebilir.",
    },
  ],
  next: [
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Bu sayfanın alt katı: adım adım çalışan bir sonlu otomat, ikili sayıya 1 ekleyen bir Turing makinesi ve regex deney alanı; karar tablosundaki ilk dört EVET'in nedeni." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "P ile EXPTIME arasındaki uçurumu sayılarla gör: büyüme sınıflarını karşılaştıran grafikte n², n³ ve 2ⁿ, girdi büyüdükçe nasıl ayrışır." },
    { href: "yasam-oyunu.html", title: "Yaşam Oyunu", why: "İki kurallı bir hücre ızgarası Turing tamdır: 'bu desen sönecek mi' sorusu da bu yüzden genel olarak karar verilemez." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Kuramın mühendisliğe döküldüğü yer: tokenleştirici, sözdizimi ağacı ve Rice teoremi yüzünden hep temkinli davranmak zorunda kalan optimizasyon." },
  ],
  sources: [
    { title: "Stanford Encyclopedia of Philosophy · The Church-Turing Thesis", url: "https://plato.stanford.edu/entries/church-turing/", note: "Tezin tarihi, Church, Turing ve Post'un 1936 çalışmaları, adın Kleene'den gelişi ve tezin neden kanıtlanamayacağı (İngilizce, titiz)." },
    { title: "Stanford Encyclopedia of Philosophy · The Lambda Calculus", url: "https://plato.stanford.edu/entries/lambda-calculus/", note: "β-indirgeme, birleştiriciler (Y dahil) ve λ ile hesaplama; sayfadaki düğmelerin arkasındaki kuram." },
    { title: "MIT OCW · 18.404J Theory of Computation (Sipser, Güz 2020)", url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", note: "Üniversite dersinin tamamı: video dersler, ders notları ve problem setleri; karar verilemezlik, indirgeme, zaman ve bellek karmaşıklığı." },
    { title: "Wikipedia · Busy beaver", url: "https://en.wikipedia.org/wiki/Busy_beaver", note: "Çalışkan kunduz fonksiyonu: S(5) = 47.176.870 ve Σ(5) = 4098 değerleri, 1989 şampiyonu ve 2024 ispatı." },
  ],
  revision: "Kasım 2026",
};
