window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["hesaplama-teorisi"] = {
  slug: "hesaplama-teorisi",
  title: "Hesaplama Teorisi: Makinelerin Yapamayacağı Şeyler",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "1936'da, ortada tek bir bilgisayar yokken 'hesaplamak' sözcüğü tanımlandı ve hiçbir makinenin cevaplayamayacağı bir soru bulundu. Burada o makineyi kendin kurar, o soruya köşegende kendi gözünle bakarsın.",
  hook:
    "Telefonundaki uygulama mağazası her programı 'zararlı mı?' diye tarıyor. Peki hiçbir program için yanılmayan bir tarayıcı yazılabilir mi? Cevap hayır; ve bu hayır bir mühendislik eksikliğinden değil, matematiğin kendisinden geliyor. Üstelik bunu kanıtlayan 1936 tarihli makale, aynı sayfalarda 'her programı çalıştırabilen tek bir makine' fikrini, yani bugünkü bilgisayarın kuramını da ortaya koydu.",
  bigIdea:
    "Hesaplama bir cihaz değil, bir kavramdır: sonsuz bir bant ve sonlu kurallarla (ya da yalnızca λ işaretiyle) yazılabilen her şey hesaplanabilir; ama <strong>kendine başvuru</strong> yüzünden her soru hesaplanamaz ve hesaplanabilenlerin çoğu da makul sürede hesaplanamaz.",
  story: [
    "1928'de David Hilbert, Wilhelm Ackermann'la yazdığı mantık ders kitabında bir soruyu matematiğin önüne koydu: verilen bir mantık formülünün her durumda geçerli olup olmadığına, sonlu adımda ve düşünmeden uygulanabilen bir yöntemle karar verilebilir mi? Buna <strong>Entscheidungsproblem</strong>, karar problemi dendi; çözülürse her matematik sorusu ilke olarak bir hesaba dönüşecekti. 1931'de Viyana'da genç Kurt Gödel ilk darbeyi vurdu: aritmetiği içeren, aksiyomları mekanik olarak sıralanabilen tutarlı her sistemde ne kanıtlanabilen ne çürütülebilen önermeler vardır. Ama Hilbert'in sorusu hâlâ açıktı, çünkü kimse 'mekanik yöntem' sözünün ne demek olduğunu yazıya dökememişti. 1934'te Gödel, Princeton'daki derslerinde Jacques Herbrand'ın bir önerisinden yola çıkarak <em>genel özyinelemeli fonksiyonları</em> tanımladı; Stephen Kleene bu tanımı işleyip geliştirdi. Hesaplanabilirlik artık üzerinde teorem kanıtlanabilen matematiksel bir nesneydi.",
    "1936, bu alanın mucize yılıdır. Princeton'da Alonzo Church, yalnızca 'fonksiyon tanımla' ve 'fonksiyonu uygula' işlemlerinden oluşan <strong>lambda hesabı</strong>yla hesaplanabilirliği tanımladı ve o yıl yayımlanan iki makalesinde Hilbert'in istediği yöntemin var olamayacağını gösterdi. 28 Mayıs 1936'da Londra Matematik Derneği'ne, Cambridge'den 23 yaşındaki Alan Turing'in makalesi ulaştı: 'On Computable Numbers'. Turing bambaşka bir yoldan gelmişti; kâğıt ve kalemle hesap yapan bir insanı en yalın parçalarına ayırmıştı: sonsuz bir şerit, bir hücreyi okuyup yazan bir kafa, sonlu sayıda 'akıl durumu'. Aynı makalede iki şey daha vardı: başka her makineyi taklit edebilen tek bir <em>evrensel makine</em> ve o makinenin bile karar veremeyeceği sorular. Bugün bunların en ünlüsüne durma problemi diyoruz; ad Turing'in değildir, 1950'lerde Martin Davis'ten gelir. Aynı yılın ekim ayında New York'ta Emil Post, Turing'inkine şaşırtıcı biçimde benzeyen bir modeli ondan habersiz dergiye gönderdi. Turing o güz Princeton'a gitti, Church'ün yanında doktora yaptı ve iki tanımın aynı fonksiyon kümesini verdiğini kanıtladı. Üç farklı yol aynı yere çıkınca ortaya bir kanı doğdu: mekanik olarak hesaplanabilen her şey bu makinelerle hesaplanabilir. Bugün <strong>Church–Turing tezi</strong> dediğimiz bu iddiaya adını sonradan Kleene verdi; kanıtlanmış bir teorem değil, bugüne dek çürütülememiş bir iddiadır.",
    "Savaş sonrası soru 'neyi hesaplayabiliriz'den 'neyi hesaplayamayız'a döndü. 1946'da Post, iki domino listesini eşleme problemini (Post Correspondence) karar verilemez olarak kanıtladı; 1953'te Henry Gordon Rice, programların davranışıyla ilgili aşikâr olmayan <em>her</em> sorunun karar verilemez olduğunu gösterdi. Hilbert'in 1900 tarihli listesindeki 10. problem de aynı kadere ortak oldu: Martin Davis, Hilary Putnam ve Julia Robinson'ın yıllara yayılan çalışmasını, 1970'te 22 yaşındaki Yuri Matiyasevich Fibonacci sayılarının bir özelliğiyle tamamladı. Tamsayı katsayılı polinom denklemlerinin tamsayı çözümü olup olmadığına karar veren genel bir algoritma yoktur. Sonra sorunun ekseni bir kez daha kaydı: hesaplanabilir, ama <strong>ne kadar sürede</strong>? 1965'te Juris Hartmanis ve Richard Stearns 'hesaplama karmaşıklığı' kavramını tanımladı. 1971'de Toronto'da Stephen Cook, ondan bağımsız olarak 1973'te Sovyetler Birliği'nde Leonid Levin, cevabı hızla doğrulanabilen her problemin tek bir probleme, SAT'a çevrilebildiğini gösterdi; 1972'de Richard Karp aynı zorluğu paylaşan 21 problemi art arda sıraladı. 'Doğrulaması kolay olan her şeyin çözümü de kolay mı?' sorusu, P = NP, 24 Mayıs 2000'den beri Clay Enstitüsü'nün bir milyon dolarlık ödülüyle açık duruyor.",
  ],
  core: [
    {
      heading: "Hesaplamanın en yalın makinesi",
      body:
        "Turing'in makinesinde üç parça vardır: sonsuz uzunlukta, hücrelere bölünmüş bir <strong>bant</strong>; bir hücreyi okuyup üzerine yazabilen ve bir sola ya da bir sağa kayabilen bir <strong>kafa</strong>; ve 'şu durumdayken şunu okursan şunu yaz, şöyle kay, şu duruma geç' diyen sonlu bir <strong>kural tablosu</strong>. Hepsi bu. Ayrı bir işlemci, ekran, işletim sistemi yok; bellek dediğin şey bandın kendisi. Makinenin bir andaki hâli üç bilgiyle eksiksiz yazılır: durum, kafanın yeri ve bandın içeriği. Buna <strong>konfigürasyon</strong> denir; sonraki konfigürasyonu tek başına belirler. Sayfanın ilk sekmesindeki simülatör tam olarak bu makinedir: tabloyu sen yazarsın, her adımda tek bir kural uygulanır. Makine ya bir bitiş durumuna (dur, kabul, ret) varır, ya okuduğu çift için kural bulamayıp takılır, ya da hiç bitmez. Bugünkü hiçbir bilgisayar bu makinenin hesaplayamadığı bir fonksiyonu hesaplayamaz; yalnızca daha hızlıdır. λ hesabı ve özyinelemeli fonksiyonlar gibi öteki modellerin de tam olarak aynı fonksiyonları hesapladığı kanıtlanmıştır.",
      formula: "δ(durum, okunan) = (yazılan, yön, sonraki),   yön ∈ {L, R, N}",
      formulaNote: "Her kural bir (durum, okunan simge) ikilisine bir (yazılan simge, yön, sonraki durum) üçlüsü atar. Sayfadaki N 'yerinde kal' demektir; makinenin gücünü değiştirmez, yalnızca tabloyu kısaltır.",
    },
    {
      heading: "λ: sayı bile olmadan saymak",
      body:
        "Lambda hesabında sayı, doğru/yanlış, döngü, hiçbir şey hazır gelmez; yalnızca fonksiyon vardır. Church'ün numarası, n sayısını 'bir f fonksiyonunu n kez uygula' talimatı olarak kodlamaktır: 0 = λf.λx.x, 2 = λf.λx.f (f x). Hesabı yürüten tek kural <strong>β-indirgeme</strong>dir: (λx.M) N ifadesinde x yerine N'yi koy. İndirgenebilecek böyle bir parçaya <strong>redeks</strong>, hiç redeksi kalmamış terime <strong>normal biçim</strong> denir; hesabın 'sonucu' odur. Doğru ve yanlış birer seçicidir: TRUE ilk argümanı, FALSE ikincisini seçer. Döngü de hazır gelmez: Y = λf.(λx.f (x x)) (λx.f (x x)) ifadesi, bir şeyi kendine uygulayarak özyinelemeyi adsız fonksiyonlardan kurar. Bir terimde birden çok redeks varsa hangisinden başlayacağın önemlidir. <strong>Church–Rosser teoremi</strong> normal biçimin tek olduğunu söyler; ama her sıra oraya varmaz. En soldaki, en dıştaki redeksi seçen normal sıra, normal biçim varsa onu mutlaka bulur; önce argümanları hesaplayan uygulamalı sıra, hiç kullanılmayacak bir argümanın içinde sonsuza dek dönebilir.",
      formula: "(λx.M) N → M[x := N];   n ≡ λf.λx.f<sup>n</sup> x;   PLUS = λm.λn.λf.λx.m f (n f x)",
      formulaNote: "M[x := N]: M içindeki serbest x'lerin yerine N konur. f<sup>n</sup> x, f'nin x'e n kez uygulanmasıdır; PLUS 'önce n kez, sonra m kez daha uygula' der.",
    },
    {
      heading: "Durma problemi: makinenin kendine bakması",
      body:
        "Her programın her girdide durup durmayacağını söyleyen bir H programı olduğunu varsay. Ondan yeni bir D programı kur: D, kendisine verilen M programı için H'ye 'M, kendi kodunu girdi olarak alırsa durur mu?' diye sorar ve H'nin dediğinin <em>tersini</em> yapar; 'durur' derse sonsuz döngüye girer, 'durmaz' derse durur. Şimdi D'yi kendi koduyla çalıştır. H 'durur' derse D durmaz; 'durmaz' derse D durur. H ne derse desin yanılır; öyleyse H yoktur. Bu, Cantor'un gerçel sayıların sayılamaz olduğunu gösterdiği <strong>köşegen</strong> argümanının iskeletidir: programları satırlara, girdileri sütunlara diz, köşegendeki cevapları ters çevir, elde ettiğin satır tabloda olamaz. Gödel'in 'bu önerme kanıtlanamaz' cümlesi de aynı kalıptan çıkar. Kritik nokta programların veri olabilmesidir: bir program başka bir programı girdi olarak okuyabildiği için kendine de bakabilir. Sayma da aynı sonucu sezdirir: programlar sonlu metinlerdir, sayılabilir çokluktadır; evet-hayır soruları (diller) ise sayılamaz çokluktadır. Soruların neredeyse hepsi için program yoktur.",
      formula: "D(M):  H(M, M) = 'durur' ise sonsuz döngü, değilse dur.   D(D) = ?",
      formulaNote: "Hangi cevabı verirsen ver çelişki çıkar. Kullanılan yalnızca iki şey var: 'H vardır' varsayımı ve programların kopyalanıp girdi olarak verilebilmesi. Sayfanın üçüncü sekmesi iki dalı ayrı ayrı yürütür.",
    },
    {
      heading: "İndirgeme ve Rice: bir imkânsızlıktan binlercesi",
      body:
        "Karar verilemez olduğu bilinen bir problemi (durma) başka bir X problemine <strong>indirgemek</strong>, 'X'i çözebilseydim durmayı da çözerdim' demektir; o zaman X de çözülemez. Yön önemlidir: zor olduğu bilinen problem, zorluğu kanıtlanacak olana çevrilir, tersi değil. Rice'ın 1953 teoremi bu numarayı toptan uygular: bir programın <em>ne hesapladığıyla</em> ilgili, bazı programların sağlayıp bazılarının sağlamadığı her özellik karar verilemezdir. 'Bu program hiçbir girdiyi kabul etmiyor mu?' sorusu bu sınıftadır; 'Bu iki program aynı işi mi yapıyor?' sorusu da aynı yolla, indirgemeyle düşer. Dikkat: teorem programın <em>metniyle</em> ilgili özellikleri kapsamaz; 'kodda 100'den az satır var mı' elbette karar verilebilir. Çözülemeyenler de kendi içinde ayrışır. Durma problemi <strong>tanınabilir</strong>dir: makineyi çalıştırırsın, durursa 'evet' dersin; yalnızca 'hayır' cevabı hiç gelmeyebilir. 'Bu makine her girdide durur mu?' sorusunda ise ne 'evet' ne 'hayır' sonlu bir gözlemle doğrulanabilir. Sayfadaki harita on beş problemi dört bölgeye yerleştirir: çözülebilir, tanınabilir, tümleyeni tanınabilir ve ikisi de olmayan.",
      formula: "A ≤ₘ B  ve  A karar verilemez  ⇒  B karar verilemez",
      formulaNote: "≤ₘ işareti 'A, B'ye indirgenir' demek: A'nın her örneği hesaplanabilir biçimde B'nin bir örneğine çevrilebilir, cevap değişmeden. Aynı dönüşüm tanınabilirliği de taşır: B tanınabilirse A da tanınabilir.",
    },
    {
      heading: "Hesaplanabilir, ama kaç adımda?",
      body:
        "Karar verilebilir problemler de eşit değildir; ölçü, girdi uzunluğu n büyürken atılan adım sayısıdır. Sayfadaki palindrom makinesi 0ⁿ girdisinde tam (n+1)(n+2)/2 adım atar: girdi iki katına çıkınca iş yaklaşık dört katına çıkar. Adım sayısı n² ya da n³ gibi bir polinomla sınırlı kalan bir algoritması olan problemler <strong>P</strong> sınıfındadır. Önerilen bir çözümün polinom sürede <em>doğrulanabildiği</em> problemler <strong>NP</strong>'dedir (ad 'polinom olmayan' değil, <em>nondeterministic polynomial</em> demektir): doldurulmuş bir sudokuyu kontrol etmek kolaydır, boş olanı doldurmak öyle görünmüyor. P ⊆ NP kesindir; tersi bilinmiyor. Cook–Levin teoremine göre SAT <strong>NP-tam</strong>dır: NP'deki her problem polinom sürede ona çevrilir. Kesin bildiğimiz ayrımlar <strong>zaman hiyerarşi teoremi</strong>nden gelir: aynı tür makineye belirgin biçimde daha çok zaman verirsen, kesinlikle daha çok problem çözer. Bu yüzden DTIME(n²) ⊊ DTIME(n³) ve P ⊊ EXPTIME kanıtlıdır. P ile NP'yi ise bu teorem ayıramaz, çünkü aralarındaki fark süre miktarı değil kaynağın türüdür: biri çözümü bulmayı, öteki verilmiş çözümü doğrulamayı ölçer.",
      formula: "f(n)·log f(n) = o(g(n))  ⇒  DTIME(f(n)) ⊊ DTIME(g(n));   P ⊆ NP ⊆ PSPACE ⊆ EXPTIME,  P ≠ EXPTIME",
      formulaNote: "o(g): oran n büyüdükçe sıfıra gider. Zincirin iki ucu farklı olduğundan üç ⊆ işaretinden en az biri gerçek bir ≠'dir; hangisi olduğu bilinmiyor.",
    },
  ],
  lab: {
    intro:
      "Sayfada üç sekme var. <strong>01 · Turing makinesi</strong>: <strong>Hazır makine</strong> menüsü, <strong>Girdi (banda yazılır)</strong> kutusu ve düzenlenebilir <strong>Geçiş tablosu</strong>; <strong>Tek adım</strong>, <strong>Çalıştır</strong>, <strong>Hızlı çalıştır</strong> düğmeleri, <strong>Hız</strong> ve <strong>Adım sınırı</strong>; altta girdi uzadıkça adımı sayan 'Ölçüm' bölümü. <strong>02 · Lambda hesabı</strong>: <strong>Hazır örnek</strong>, <strong>λ-terimi</strong>, <strong>İndirgeme sırası</strong>, iki sırayı yan yana koyan karşılaştırma tablosu ve düzenlenebilir makro kitaplığı. <strong>03 · Çözülemezlik</strong>: gerçek makinelerle hesaplanan köşegen tablosu, durma kanıtının iki dalı, meşgul kunduz tablosu ile bütçeli denetçi, çözülebilirlik haritası ve yön denetçisi. Sayılar Türkçe biçimde yazılır: 47.176.870 adım, 1,874 üs. Model tek bantlı ve belirlenimcidir; okumaların çoğunda makineden bağımsız hesaplanan bir 'beklenen' değer, ölçülenin yanında durur.",
    experiments: [
      {
        title: "Palindrom makinesi: girdi iki katına çıkınca adım kaç katına çıkar?",
        predict:
          "Palindrom tanıyıcı iki ucu karşılaştırmak için bandı baştan sona yürümek zorunda. Girdi 16 simgeden 32'ye, oradan 64'e çıkarsa adım sayısı iki katına mı çıkar, dört katına mı? Peki girdi palindrom değilse ve bu daha ilk karşılaştırmada anlaşılıyorsa?",
        do: "1. sekmede <strong>Hazır makine</strong> 'Palindrom tanıyıcı ({0,1})' olsun; önce <kbd>0110</kbd> girdisini <strong>Tek adım</strong>la izle. Sonra 'Ölçüm' bölümüne in: <strong>Hangi girdiler?</strong> menüsünde '0ⁿ: palindrom, her turda bant boyunca yürünür' seçiliyken <strong>En uzun girdi n</strong> kaydırıcısını 32'ye, ardından 64'e getir. Son olarak aileyi '0ⁿ⁻¹1: ilk karşılaştırmada ret' yap ve aynı iki değere bak.",
        observe:
          "0110, 15 adımda kabul edilir; kafa 5 hücrelik bir aralık kullanır. 0ⁿ ailesinde tablo T(16) = 153, T(32) = 561, T(64) = 2.145 verir; 'Fark' her satırda 0 adım, kapalı biçim (n+1)(n+2)/2. 'Ölçülen büyüme üssü' n = 32'de 1,874 (n = 16 → 32), n = 64'te 1,935; 'n → ∞ için üs' 2. İkinci ailede T(32) = 34, T(64) = 66, yani n + 2; üs 0,918 ve 0,957'dir, 1'e yaklaşır.",
        explain:
          "Kabul için her tur iki uçtan birer simge siler ve bandı bir gidip bir gelir: yaklaşık n/2 tur, her biri yaklaşık 2n adım, toplam n² mertebesi. 561/153 = 3,67 ve 2.145/561 = 3,82 oranları 4'e yaklaşır; üssün 2'nin altında kalması formüldeki 3n/2 + 1 teriminden gelir. Ret ise ilk turda gelebilir: makine sona yürür, uyuşmazlığı görür, durur. Ölçtüğün şey bu tablonun adım sayısıdır; problemin kendisinin ne kadar zor olduğunu söylemek için olası bütün makineler hakkında bir kanıt gerekir.",
      },
      {
        title: "Meşgul kunduz: 'durmadı' ile 'durmaz' aynı şey mi?",
        predict:
          "Bir makineyi 100 adım izledin, durmadı. Hiç durmayacağına hükmeder misin? Bütçeyi 1.000.000 adıma çıkarmak hükmü güvenli kılar mı? Bir de şunu tahmin et: üç durumlu makineler arasında en çok adım atanla banda en çok 1 yazan aynı makine midir?",
        do: "3. sekmenin c) bölümünde <strong>Denetçinin bütçesi B</strong> 100 adımken tablonun son sütununu oku; sonra 1.000.000 adım yap. 1. sekmeye dön: <strong>Hazır makine</strong> menüsünden sırayla 'Meşgul kunduz · 3 durum (en çok adım)', '3 durum (en çok 1)', '4 durum' ve '5 durum (hızlı kip)' seç, her birinde <strong>Hızlı çalıştır</strong>a bas. Son olarak 'Hiç durmayan sayaç'ı seç, <strong>Adım sınırı</strong>nı 1.000 adım yap ve yine hızlı çalıştır.",
        observe:
          "B = 100'de denetçi 4 makinede doğru, 2 makinede yanlış (4 durum; 5 durum): ikisine de 'durmaz' der. B = 1.000.000'da yalnız 5 durumluda yanılır. Simülatörde sırayla 21 adım ve 5 bir; 14 adım ve 6 bir; 107 adım, 13 bir, 14 hücre; 47.176.870 adım, 4.098 bir, 12.289 hücre okursun, hepsi 'beklenenle uyuşuyor'. Sayaç 1.000 adımda 254'e kadar sayar (bantta 11111110, 7 bir); durum satırı '1.000 adımda durmadı — bu, hiç durmayacağını kanıtlamaz' diye başlar, ardından kanıtı verir: bitiş durumuna giden tek kural yok ve tablo eksiksiz.",
        explain:
          "'Durur' bir gözlemdir, yanlış olamaz; 'durmaz' sonsuz bir geleceğe dair iddiadır ve kanıt ister. Sayaçta kanıt tablonun kendisidir; sayfa yalnız bu en basit durumu, durma kuralı hiç olmayan eksiksiz tabloyu tanır. Kunduzlarda ise hangi B'yi seçersen seç, S(n) > B olan bir n vardır; B'yi n'den hesaplayan bir kural bulunsaydı S hesaplanabilir, durma problemi de çözülebilir olurdu. S(3) = 21 ile Σ(3) = 6'nın ayrı makinelerden gelmesi de bir uyarıdır: 'en uzun çalışan' ile 'en çok yazan' farklı sorulardır.",
      },
      {
        title: "Aynı terim, iki sıra: FACT 3 ve atılan argüman",
        predict:
          "Y ile yazılmış faktöriyel, FACT 3, iki indirgeme sırasında da 6'ya varır mı? (λx.y) OMEGA teriminde x hiç kullanılmıyor; içindeki sonsuz döngü hesabı batırır mı? PLUS 2 3 için iki sıranın adım sayıları farklı çıkar mı?",
        do: "2. sekmede <strong>Hazır örnek</strong> menüsünden 'Y ile faktöriyel · FACT 3' seç ve sayfanın altındaki 'Aynı terim, iki sıra' karşılaştırma tablosunu oku. <strong>İndirgeme sırası</strong>nı uygulamalı sıraya alıp <strong>Sona kadar</strong>a bas; <strong>Adım sınırı</strong>nı 5.000 adım yapıp yinele. Ardından 'Atılan argüman · (λx.y) OMEGA' örneğini iki sırada da <strong>Tek adım</strong>la yürüt. En son '2 + 3 · PLUS 2 3' örneğine dön.",
        observe:
          "FACT 3: normal sıra 694 β-adımında '= 6' verir, en büyük terim 1.556 düğüm. Uygulamalı sıra 1.000 adımda bitmez, terim 89 düğümden 2.089'a çıkar; sınır 5.000 olunca 10.089 düğüm. (λx.y) OMEGA: normal sıra 1 adımda y; uygulamalı sırada 'Döngü kanıtlandı: 1. adımdaki terim, 0. adımdakiyle aynı'. PLUS 2 3: iki sıra da 6 adım, '= 5'; not Church–Rosser teoremini anar.",
        explain:
          "Uygulamalı sıra önce en içteki redeksi, Y'nin kendini yeniden üreten çekirdeğini açar; her adım terimi 2 düğüm büyütür ve IF'in hangi dalı seçeceğine sıra hiç gelmez. Normal sıra dıştan başladığı için n = 0 olduğunda özyinelemeli dalı açmadan atar. Bu Church–Rosser'la çelişmez: teorem 'varılan normal biçim tektir' der, 'her yol oraya varır' demez. Sayfadaki uygulamalı sıra λ gövdesine de girer; programlama dillerindeki değere göre çağırma böyle yapmaz.",
      },
      {
        title: "Köşegen tablosu: bütçeyi büyütünce soru işaretleri biter mi?",
        predict:
          "8 makine, 8 girdi, 64 hücre. Adım bütçesi 2'den 20'ye, 200'e, 2.000'e çıktıkça '?' hücreleri sıfıra iner mi? İnmezse geride kalan makinelerin ortak özelliği ne olabilir?",
        do: "3. sekmenin a) bölümünde varsayılanları koru (<strong>Liste uzunluğu</strong> 8 makine, <strong>Liste tohumu</strong> 7). <strong>Adım bütçesi</strong>ni sırayla 2, 20, 200 ve 2.000 adım yap; her seferinde 'Bilinmiyor (?)' okumasını not et. Bütçe 200'deyken satır başlığındaki M₅ düğmesine, sonra <strong>Seçili makineyi 1. sekmede aç</strong>a bas; geçiş tablosunun A satırlarını oku ve <strong>Hızlı çalıştır</strong>a bas.",
        observe:
          "'?' sayısı 36 / 64, sonra üç bütçede de 23 / 64. Bütçe 200'de 40 D, 1 S; 'Köşegende belirlenen' 6 / 8, D satırı S S S S ? ? S S. Tek S hücresi M₄'ün 1 girdisindedir: 2. adımda aynı konfigürasyona döner. M₅ (numara 25.926.435) 1. sekmede 10 girdisiyle açılır; A'dan çıkan üç kural da sağa kayıp A'da kalır. Sonuç: '10.000 adımda durmadı — bu, hiç durmayacağını kanıtlamaz', kullanılan hücre 10.001.",
        explain:
          "Tablodaki sınıflandırma iki şeyi yakalar: durmayı ve aynı konfigürasyonun tekrarını. M₅ ikisini de yapmaz; her adımda yeni bir hücreye geçtiği için konfigürasyonu hiç tekrarlanmaz. Sen ise tabloya bakıp bir satırda kanıtlarsın: A durumundan çıkış yok. Tek tek makineler için böyle kanıtlar bulunur; olmayan, hepsinde işleyen tek yöntemdir. D satırındaki '?' hücreleri de bunu söyler: D'yi gerçekten kurmak için durma sorusunun cevabı gerekir.",
      },
    ],
  },
  wow: [
    {
      title: "Beş durum, 47 milyon adım",
      body:
        "Beş durumlu, iki simgeli bir Turing makinesi boş bantta başlayıp durmadan önce en fazla kaç adım atabilir? Soruyu 1962'de Tibor Radó sordu: <em>meşgul kunduz</em>. 1989'da Heiner Marxen ve Jürgen Buntrock, 47.176.870 adım atıp banda 4.098 tane 1 yazarak duran bir makine buldu; sayfanın 'Hızlı çalıştır' düğmesi aynı tabloyu tarayıcında yürütür. 'Daha uzunu yok' diyebilmek içinse beş durumlu bütün makinelerin durup durmayacağına karar vermek gerekiyordu; genel bir yöntem olmadığından inatçı makineler ayrı ayrı kanıt istedi. 2 Temmuz 2024'te bbchallenge adlı gönüllü topluluk, kanıt yardımcısıyla denetlenmiş ispatı duyurdu: S(5) = 47.176.870, Σ(5) = 4.098.",
    },
    {
      title: "22 yaşında bir öğrenci, Hilbert'in 70 yıllık sorusu",
      body:
        "Hilbert'in 1900 tarihli listesindeki 10. problem, tamsayı katsayılı bir polinom denkleminin tamsayı çözümü olup olmadığını bulan bir yöntem istiyordu. Davis, Putnam ve Robinson 1961'de problemi tek bir eksik parçaya indirmişti: üstel hızla büyüyen bir bağıntının polinom denklemleriyle yazılabildiğini göstermek. Ocak 1970'te Leningrad'da 22 yaşındaki Yuri Matiyasevich o parçayı Fibonacci sayılarının bir özelliğiyle yerine koydu. Sonuç: böyle bir yöntem yoktur, çünkü olsaydı durma problemi de onunla çözülürdü; her Turing makinesinin durup durmaması bir polinom denkleminin çözümüne çevrilebilir.",
    },
    {
      title: "Üç satırlık tanım, 19.729 basamaklı sayı",
      body:
        "Ackermann fonksiyonunun bugün kullanılan iki değişkenli biçimi üç satırdır: A(0, n) = n + 1; A(m, 0) = A(m − 1, 1); A(m, n) = A(m − 1, A(m, n − 1)). A(1, 2) = 4, A(2, 2) = 7, A(3, 2) = 29. A(4, 2) ise 2<sup>65536</sup> − 3'tür: onluk tabanda 19.729 basamak. Fonksiyon tamamen hesaplanabilirdir, her girdi için durur; ama tekrar sayısı döngüye girerken belli olan döngülerle (for) yazılamaz, sınırsız while ya da gerçek özyineleme gerekir. Meşgul kunduz bunun öbür yakasıdır: Ackermann çok hızlı büyür ama hesaplanır; S(n) ise yeterince büyük n'lerde hesaplanabilir her fonksiyonu geçer.",
    },
  ],
  worked: {
    title: "Palindrom makinesi kaç adım atar? Tablodan formüle",
    prompt:
      "1. sekmedeki palindrom tanıyıcının 0ⁿ girdisinde attığı adım sayısı T(n)'yi geçiş tablosundan türet. T(4), T(32) ve T(64)'ü hesapla; n = 16 → 32 ve n = 32 → 64 için büyüme üssü log[T(n)/T(n/2)] / log 2'yi bul ve sayfanın 'Ölçüm' bölümüyle karşılaştır.",
    steps: [
      "Bir turu say. Bantta m ≥ 2 simge varken: <code>bas</code> ilk simgeyi silip sağa kayar (1 adım); <code>git0</code> kalan m − 1 simgenin üzerinden yürür (m − 1 adım), boş hücreyi görüp sola döner (1 adım); <code>bak0</code> son simgeyi siler (1 adım); <code>don</code> kalan m − 2 simgeyi geri yürür (m − 2 adım) ve boşu görüp sağa döner (1 adım). Toplam 2m + 1 adım; bantta m − 2 simge kalır.",
      "Tabanları say. m = 0: <code>bas</code> boş hücreyi okur ve kabul eder, T(0) = 1 adım. m = 1: sil, boşu gör ve dön, <code>bak0</code> boşu okuyup kabul et, T(1) = 3 adım. Öyleyse yineleme bağıntısı T(n) = T(n − 2) + 2n + 1'dir.",
      "Çöz. Çift n için T(n) = 1 + (5 + 9 + … + (2n + 1)); parantezde n/2 terim vardır ve toplamı (n/2)(n + 3)'tür. T(n) = 1 + n(n + 3)/2 = (n + 1)(n + 2)/2. Sağlama: (n + 1)(n + 2)/2 − (n − 1)n/2 = 2n + 1 ve formül T(0) = 1, T(1) = 3 verir; demek ki tek n için de geçerlidir.",
      "Sayıları koy. T(4) = 5·6/2 = 15 adım; sayfada 0110 da 15 adımda kabul edilir, çünkü eşleşen her girdide yürüyüş aynıdır. T(16) = 17·18/2 = 153, T(32) = 33·34/2 = 561, T(64) = 65·66/2 = 2.145 adım.",
      "Üssü hesapla. 561/153 = 3,667 ve log 3,667 / log 2 = 1,874; 2.145/561 = 3,824 ve log 3,824 / log 2 = 1,935. Genel oran T(2n)/T(n) = 2(2n + 1)/(n + 2)'dir; n büyüdükçe 4'e, üs de 2'ye yaklaşır.",
    ],
    result:
      "T(n) = (n + 1)(n + 2)/2 adım: T(32) = 561, T(64) = 2.145; büyüme üsleri 1,874 ve 1,935, sınır değeri 2. Sayfa aynı sayıları ölçer ve her satırda 'Fark' 0 adımdır. Sonuç bu geçiş tablosuna aittir: başka bir tablo ya da ikinci bir bant, aynı dili farklı adım sayısıyla tanır.",
  },
  misconceptions: [
    {
      myth: "Durma problemi çözülemez, öyleyse hiçbir programın durup durmayacağı bilinemez.",
      truth:
        "Teorem tek tek programlar hakkında değil, <em>her</em> program için çalışan tek bir yöntem hakkındadır. Sayfadaki palindrom makinesi her girdide durur ve kaç adımda duracağı formülle bilinir; 'Hiç durmayan sayaç'ın durmayacağı tablosundan okunur; köşegendeki S hücreleri konfigürasyon tekrarıyla kanıtlanmış döngülerdir. Olmayan şey, verilen her (makine, girdi) çifti için her zaman doğru cevap veren genel algoritmadır.",
    },
    {
      myth: "Yeterince uzun beklersek bir programın durmayacağını anlarız; mesele bütçeyi büyütmek.",
      truth:
        "Beklemek yalnızca 'durur' cevabını doğrulayabilir. Beş durumlu şampiyon 47.176.870. adımda durur; bir milyon adım bekleyen denetçi ona 'durmaz' der ve yanılır. Varsayılan köşegen tablosunda ise bütçeyi 20'den 2.000'e çıkarmak tek bir '?' hücresini bile çözmez. Sayfanın durum satırı bu yüzden hep aynı cümleyi kurar: N adımda durmadı, ama bu hiç durmayacağını kanıtlamaz.",
    },
    {
      myth: "Daha güçlü bir bilgisayar, mesela kuantum bilgisayar, durma problemini çözer.",
      truth:
        "Kuantum bilgisayar da bir Turing makinesinin hesaplayabildiği fonksiyonları hesaplar; bazı problemlerde çok daha hızlıdır, ama hesaplanabilirler kümesini genişletmez. Durma probleminin kanıtı makinenin hızına değil, programların veri olarak okunabilmesine dayanır. Church–Turing tezini aşan bir fiziksel aygıt bugüne dek gösterilememiştir.",
    },
    {
      myth: "β-indirgeme düz bir bul-değiştir işlemidir: x gördüğün yere argümanı yaz.",
      truth:
        "Argümanın serbest değişkeni, içine girdiği terimdeki bir λ tarafından yakalanırsa anlam değişir. Sayfadaki 'Yakalanma tuzağı' örneğinde (λx y.x y) y terimi düz değiştirmeyle λy.y y olurdu; dışarıdaki y içerideki y'ye karışırdı. Doğru sonuç λy1.y y1'dir: bağlı değişken önce yeniden adlandırılır (α-dönüşümü), iz satırına da 'α-yeniden adlandırma: y → y1' notu düşer.",
    },
  ],
  glossary: [
    { term: "Turing makinesi", definition: "Sonsuz bant, okuma-yazma kafası ve sonlu kural tablosundan oluşan soyut makine; hesaplanabilirliğin ölçütü." },
    { term: "Konfigürasyon", definition: "Makinenin bir andaki eksiksiz hâli: durum, kafanın konumu ve bandın içeriği; aynı konfigürasyon iki kez görülürse makine sonsuz döngüdedir." },
    { term: "Church–Turing tezi", definition: "Mekanik olarak hesaplanabilen her fonksiyonun bir Turing makinesiyle hesaplanabildiği iddiası; teorem değil, çürütülmemiş bir kanı." },
    { term: "β-indirgeme", definition: "Lambda hesabının hesaplama kuralı: (λx.M) N ifadesinde M içindeki serbest x'lerin yerine, değişken yakalanmadan, N konması." },
    { term: "Normal biçim", definition: "İçinde indirgenecek hiçbir redeks kalmamış λ-terimi; varsa tektir (Church–Rosser), ama her terimin normal biçimi yoktur." },
    { term: "Karar verilebilir (çözülebilir)", definition: "Her girdi için sonlu adımda doğru evet/hayır cevabı veren bir algoritmanın var olduğu problem." },
    { term: "Tanınabilir (yarı çözülebilir)", definition: "Evet örneklerini sonlu sürede onaylayan ama hayır örneklerinde sonsuza dek çalışabilen bir makinenin var olduğu problem; durma problemi böyledir." },
    { term: "İndirgeme", definition: "Bir problemin her örneğini hesaplanabilir biçimde başka bir problemin örneğine çevirme; zorluğu birinci problemden ikincisine taşır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki üç sekme, bilgisayar mühendisliği ve matematik bölümlerinde çoğunlukla Sipser'ın <em>Introduction to the Theory of Computation</em> kitabıyla okutulan <strong>Hesaplama Kuramı</strong> (ya da Biçimsel Diller ve Otomata) dersinin iskeletidir. Dersin ilk yarısı otomatlardan Turing makinesine çıkar ve durma probleminin kanıtını bu sayfadakinin aynısı, ama her satırı gerekçelendirilmiş hâliyle yazar; ardından Rice teoremi, indirgemeler ve Kleene'in <strong>özyineleme teoremi</strong> gelir: her programın kendi kaynak kodunu elde edip kullanabileceğini kanıtlayan ve 'kendini yazdıran program' (quine) bilmecesini çözen sonuç. Gödel'in eksiklik teoremi de bu noktada yeniden ortaya çıkar; bu kez durma probleminden birkaç satırda türetilir.",
      "İkinci yarı karmaşıklıktır: Cook–Levin teoreminin kanıtı, bir Turing makinesinin polinom adımlık çalışmasının bir mantık formülüne nasıl çevrildiğini gösterir; sonra Karp'ın 1972'de listelediği 21 problem birbirine indirgenir. Oradan PSPACE, olasılıklı sınıflar (BPP), kuantum sınıfı BQP ve <strong>Kolmogorov karmaşıklığı</strong>na, yani bir dizginin en kısa tanımının uzunluğuna açılırsın. Lambda hesabı ise Programlama Dilleri dersinde geri döner: tip kuramı, Haskell'in çekirdeği ve Curry–Howard denkliği, yani 'her program bir kanıt, her tip bir önermedir' fikri. 1930'larda mantığın temelleri için kurulan λ, bugün derleyicilerin ve kanıt yardımcılarının omurgasıdır.",
    ],
    topics: ["Özyineleme teoremi ve quine'lar", "Rice teoremi ve indirgemeler", "Cook–Levin teoremi ve NP-tamlık", "Zaman ve bellek hiyerarşi teoremleri", "PSPACE ve oyunlar", "Kolmogorov karmaşıklığı", "Tip kuramı ve Curry–Howard", "Kuantum hesaplama (BQP)"],
  },
  quiz: [
    {
      question: "Palindrom makinesi 0ⁿ girdisinde (n+1)(n+2)/2, 0ⁿ⁻¹1 girdisinde n + 2 adım atıyor. Sayfanın kaydırıcısı 64'te bitiyor; n 100'den 200'e çıksaydı iki ailede adım sayısı yaklaşık kaç katına çıkardı?",
      options: ["İkisinde de yaklaşık 2 katına", "Birincide yaklaşık 4, ikincide yaklaşık 2 katına", "İkisinde de yaklaşık 4 katına", "Birincide yaklaşık 8, ikincide yaklaşık 2 katına"],
      answer: 1,
      explanation:
        "T(100) = 101·102/2 = 5.151, T(200) = 201·202/2 = 20.301; oran 3,94. İkinci ailede 102'den 202'ye, oran 1,98. Büyük n'de baskın terim belirleyicidir: n²/2 iki kat girdide dört katına, n iki katına çıkar. Sayfanın 'büyüme üssü' okuması bu oranın 2 tabanındaki logaritmasıdır; sınır değerleri 2 ve 1'dir.",
    },
    {
      question: "(λx.y) OMEGA terimi normal sırada 1 adımda y'ye varıyor, uygulamalı sırada sonsuz döngüye giriyor. Bu, Church–Rosser teoremiyle çelişir mi?",
      options: [
        "Evet; teorem bütün sıraların aynı sonuca varacağını söyler",
        "Hayır; teorem normal biçimin tek olduğunu söyler, her sıranın ona varacağını değil",
        "Hayır; çünkü y bir normal biçim değildir",
        "Evet; ama teorem yalnızca Church sayıları için geçerlidir",
      ],
      answer: 1,
      explanation:
        "Church–Rosser, bir terimden iki ayrı normal biçime varılamayacağını söyler; uygulamalı sıra burada başka bir sonuca değil, hiçbir sonuca varmıyor. Önce argümanı, yani OMEGA'yı indirgemeye çalışıyor ve OMEGA her adımda kendine dönüyor. Normal sıra en dıştaki redeksi seçtiği için kullanılmayan argümanı hesaplamadan atar; normal biçim varsa onu bulması bu yüzden güvencelidir.",
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
        "Yön 'bilinen zor → yeni problem' olmalıdır: durmayı X'e çevirebiliyorsan, X'i çözen bir program durmayı da çözerdi; öyleyse X çözülemez. Ters yön yalnızca X'in durmadan daha zor olmadığını söyler. Sayfanın yön denetçisinde dene: A = DFA kabulü, B = Durma problemi seçince 'vardır ama hiçbir şey kanıtlamaz' yazar. Yavaşlık da karar verilemezlik değildir: EXPTIME'daki her problem karar verilebilir.",
    },
  ],
  next: [
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Bu sayfanın alt katı: Chomsky hiyerarşisi, adım adım çalışan bir sonlu otomat ve regex deney alanı. Haritadaki 'çözülebilir' bölgenin DFA sorularının neden kolay olduğunu orada görürsün." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme: Sınıflar, NP ve Yaklaşık Çözümler", why: "Burada tek bir makinede ölçtüğün n² büyümesinin genel dili: O, Ω ve Θ gösterimi ile büyüme sınıflarının girdi büyüdükçe nasıl ayrıştığı." },
    { href: "yasam-oyunu.html", title: "Yaşam Oyunu", why: "İki kurallı bir hücre ızgarası Turing tamdır: 'bu desen sönecek mi' sorusu da bu yüzden genel olarak karar verilemez. Planörle başla." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Kuramın mühendisliğe döküldüğü yer: tokenleştirici, sözdizimi ağacı ve derleme aşamaları; program davranışı hakkındaki sorular Rice teoremi yüzünden orada hep temkinle yanıtlanır." },
  ],
  sources: [
    { title: "Stanford Encyclopedia of Philosophy · The Church-Turing Thesis", url: "https://plato.stanford.edu/entries/church-turing/", note: "Tezin tarihi, Church, Turing ve Post'un 1936 çalışmaları, adın Kleene'den gelişi ve tezin kanıtlanıp kanıtlanamayacağı tartışması (İngilizce, titiz)." },
    { title: "Stanford Encyclopedia of Philosophy · The Lambda Calculus", url: "https://plato.stanford.edu/entries/lambda-calculus/", note: "β-indirgeme, indirgeme sıraları, Church–Rosser ve birleştiriciler (Y dahil); ikinci sekmedeki indirgeyicinin arkasındaki kuram." },
    { title: "MIT OCW · 18.404J Theory of Computation (Sipser, Güz 2020)", url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", note: "Üniversite dersinin tamamı: video dersler, ders notları ve problem setleri; Turing makineleri, köşegen yöntemi, indirgeme, zaman ve bellek karmaşıklığı." },
    { title: "Wikipedia · Busy beaver", url: "https://en.wikipedia.org/wiki/Busy_beaver", note: "Meşgul kunduz fonksiyonu: S(n) ve Σ(n) değerleri, şampiyon tablolar, 1989 makinesi ve 2 Temmuz 2024'te duyurulan ispat (11 Kasım 2026'da açıldı)." },
  ],
  revision: "Kasım 2026",
};
