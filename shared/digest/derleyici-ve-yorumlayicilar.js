window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["derleyici-ve-yorumlayicilar"] = {
  slug: "derleyici-ve-yorumlayicilar",
  title: "Derleyici ve Yorumlayıcı: Kodun Makineye Yolculuğu",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Yazdığın dört satır kod, işlemciye varana kadar beş kez kılık değiştirir: harfler token olur, tokenlar ağaç, ağaç ara kod, ara kod makine komutu. Bu sayfada o dönüşümü adım adım kendin yaparsın.",
  hook:
    "1952'de Grace Hopper, bilgisayarın kendi programını yazmasını sağlayan bir yazılım yaptı ve adına 'compiler' dedi. Kendi anlatımına göre kimse ona elini sürmedi: bilgisayarlar yalnızca aritmetik yapabilirdi, program yazamazdı. Bugün telefonundaki her uygulama o fikrin torunu. Peki <code>x = a + b * 3</code> yazdığında makine çarpmayı toplamadan önce yapacağını nereden biliyor?",
  bigIdea:
    "Program bir metindir; derleyici o metni önce <strong>tokenlara</strong>, sonra bir <strong>ağaca</strong>, sonra makine komutlarına çevirir ve bu çeviriyi bir kez yapar. Yorumlayıcı aynı yolu her çalıştırmada baştan yürür; JIT ise ikisini birleştirir: önce yorumla, sık çalışan kısmı derle.",
  story: [
    "1950'lerin başında programlamak, işlemcinin her komutunu sayı olarak elle yazmak demekti. Grace Hopper 1952'de UNIVAC için <strong>A-0</strong> adını verdiği sistemi yaptı: hazır alt programları bir araya toplayıp (İngilizce <em>compile</em>, 'derlemek') çalışır bir program üreten bir yazılım. Bugünkü anlamda derleyiciden çok bir yükleyici-bağlayıcıydı ama adı kaldı. Asıl kırılma 1954–1957 arasında IBM'de yaşandı: John Backus'ın ekibi, matematik formüllerine benzeyen bir dili, <strong>FORTRAN</strong>'ı, IBM 704 için makine koduna çeviren derleyiciyi Nisan 1957'de teslim etti. Daha dar kapsamlı öncüleri vardı (Manchester'da Alick Glennie'nin 1952 tarihli Autocode'u gibi), ama genellikle ilk eksiksiz ve ilk iyileştirme yapan derleyici sayılan odur. Dönemin programcıları alaycıydı; makinenin ürettiği kodun elle yazılmış koddan yavaş olacağına kesin gözüyle bakılıyordu. Backus ekibinin asıl emeği bu yüzden çeviriye değil, <em>iyileştirmeye</em> gitti: Backus'ın kendi anlatımına göre derleyici, programın hangi bölümünün ne sıklıkta çalışacağını kestirmek için akışın rastgele sayılarla bir benzetimini bile yapıyor, az sayıdaki indis yazmacını buna göre paylaştırıyordu. Çıkan kod, deneyimli programcıların elle yazdığıyla yarışıyordu; FORTRAN'ın tutmasının nedeni buydu.",
    "Yorumlayıcının doğuşu daha garip bir hikâyedir. John McCarthy 1958'de MIT'de LISP dilini tasarlamaya başladı; dili anlatan makalesini yazarken, bir LISP programını girdi olarak alıp çalıştıran <code>eval</code> adlı bir işlevi kâğıt üzerinde, kuramsal bir egzersiz olarak yazdı. McCarthy'nin anlatımına göre ekibindeki programcı Steve Russell bunu IBM 704'ün makine diline çevirmeyi önerdiğinde ona 'kuramla uygulamayı karıştırıyorsun' demişti; Russell yine de yaptı ve ortaya ilk LISP yorumlayıcısı çıktı. Kodu çalıştırmak için önce makine koduna çevirmek gerekmiyordu; programı okuyup anında uygulayan bir program yetiyordu. Bu gelenek 'yaz, hemen dene' fikrinin taşıyıcısı oldu: 1975'te Bill Gates, Paul Allen ve Monte Davidoff'un Altair için 4 kilobaytlık belleğe sığdırdığı BASIC yorumlayıcısı, 1991'de Guido van Rossum'un Python'ı. (Bir ayrıntı: BASIC'in 1964'te Dartmouth'ta Kemeny ve Kurtz'un elinden çıkan ilk sürümü yorumlayıcı değil, hızlı bir derleyiciydi; dil ile onu çalıştırma yöntemi baştan beri ayrı şeylerdi.)",
    "İki dünya 1990'larda birleşti. Java (1995) kaynak kodu önce platformdan bağımsız bir <strong>bytecode</strong>'a derliyor, sonra bu ara kodu bir sanal makinede çalıştırıyordu; 1999'da gelen HotSpot motoru sık çalışan bölümleri çalışma anında makine koduna derledi. Bu yönteme <strong>JIT</strong> (tam zamanında derleme) denir; kökü 1980'lerin Smalltalk ve Self araştırmalarındadır. 2008'de Google'ın Chrome'la birlikte çıkardığı V8 motoru aynı fikri JavaScript'e uyguladı ve tarayıcı, yavaş bir betik yorumlayıcısından ciddi bir çalışma ortamına dönüştü. Tesadüf değil: Self üzerinde çalışmış olan Danimarkalı mühendis Lars Bak hem HotSpot'un hem V8'in baş mimarlarındandı. Bu arada derleyici altyapısının kendisi de ortak bir mala dönüştü: Richard Stallman'ın 1987'de yayımladığı GCC ile Chris Lattner'ın 2000'de Illinois Üniversitesi'nde, Vikram Adve'nin yanında başlattığı LLVM, bugün C'den Rust'a, Swift'ten Fortran'a onlarca dilin arkasındaki ortak motorlardır. Sayfadaki beş aşamalı boru hattı tam da bu motorların iç yapısıdır.",
  ],
  core: [
    {
      heading: "Token: harflerden anlamlı parçalara",
      body:
        "Lexer kaynak kodu soldan sağa tek bir geçişte okur ve karakterleri sözcük benzeri parçalara, <strong>token</strong>lara ayırır: anahtar kelime, tanımlayıcı, sayı, operatör, dizgi, noktalama. Boşluk ve yorum satırları bu aşamada çöpe gider; sonraki hiçbir aşama onları görmez. Sayfadaki tokenleştirici de böyle çalışır: harfle başlayan bir karakter dizisi okunur, sözlükte varsa anahtar kelime, yoksa tanımlayıcı sayılır. Bir inceliği vardır: <code>&lt;=</code> gördüğünde iki ayrı token değil tek bir operatör üretir. Buna <strong>en uzun eşleme</strong> (maximal munch) kuralı denir: lexer her zaman mümkün olan en uzun tokenı yutar. Bu yüzden <code>i++</code> üç karakter ama iki tokendır; <code>i+++j</code> ise <code>i ++ + j</code> diye bölünür, <code>i + ++j</code> diye değil. Her token türü bir <strong>düzenli ifadeyle</strong> tanımlanabildiği için lexer aslında bir sonlu otomattır: belleği yoktur, yalnızca hangi durumda olduğunu bilir.",
      formula: "token = (tür, değer)   örn. (NUMBER, \"42\"), (OPERATOR, \"<=\")",
      formulaNote: "Her token türü bir düzenli ifadeyle tanımlanır; tanımlayıcı için sayfanın kuralı [a-zA-Z_][a-zA-Z0-9_]* biçimindedir.",
    },
    {
      heading: "Gramer ve ağaç: öncelik nereden gelir?",
      body:
        "Token dizisi düzdür; anlam ise iç içedir. <strong>Ayrıştırıcı</strong> (parser) tokenları dilin <strong>gramerine</strong> göre bir ağaca dizer. İlk akla gelen gramer işe yaramaz: <em>ifade → ifade + ifade | ifade * ifade | sayı</em> kuralıyla <code>2 + 3 * 4</code> iki ayrı ağaca açılır; birinde sonuç 14, ötekinde 20'dir. Böyle gramere <strong>belirsiz</strong> denir. Çare grameri katlara ayırmaktır: 'toplam' çarpımlardan, 'çarpım' birimlerden kurulur; birim ya bir sayı, ya bir ad, ya da parantez içinde yeni bir toplamdır. Artık tek bir ağaç mümkündür ve çarpma kendiliğinden alt kata iner. Öncelik makineye ayrıca öğretilmiş bir kural değil, gramerin biçiminin sonucudur. Sayfanın küçük ayrıştırıcısı tam bu üç katı, her kat için bir işlevle uygular (<strong>özyinelemeli iniş</strong>): toplama-çıkarma işlevi çarpma-bölme işlevini, o da birim işlevini çağırır; birim işlevi açılan parantez görürse en üst kata geri döner. Parantezler ağaca girmez; yaptıkları tek şey hangi dalın hangisinin altına gireceğini belirlemektir.",
      formula: "toplam → çarpım (('+' | '−') çarpım)*,   çarpım → birim (('*' | '/') birim)*,   birim → sayı | ad | '(' toplam ')'",
      formulaNote: "Kural yazımının kökü BNF'tir; John Backus 1959'da ALGOL'ü tanımlamak için önerdi. 'Sıfır ya da daha çok kez' diyen yıldız, sonradan eklenen genişletilmiş biçimden (EBNF) gelir. Sayfadaki CFG / BNF kartı aynı dili <code>expr → expr + term | term</code> diye sol özyinelemeli yazar; özyinelemeli iniş bu kuralı olduğu gibi uygularsa kendini sonsuza dek çağırır, yıldızlı biçim o yüzden bir döngüye çevrilmiş hâlidir.",
    },
    {
      heading: "Anlam denetimi ve ara kod",
      body:
        "<code>x = \"merhaba\" + 42;</code> satırı gramer açısından kusursuzdur; sorun anlamındadır. <strong>Semantik analiz</strong> ağacı gezer, her değişkenin türünü ve kapsamını bir <strong>sembol tablosunda</strong> tutar, tanımlanmamış ad ya da uyumsuz tür gördüğünde hata verir. Bu aşamadan sonra ağaç, her satırda en çok üç ad geçen basit komutlara, <strong>üç adresli koda</strong> çevrilir: <code>t1 = b * 3; t2 = a + t1; x = t2</code>. Bu ara kod ne kaynak dile ne hedef işlemciye bağlıdır. LLVM'in IR'si bu biçimdedir; Java ve Python'un bytecode'u aynı katın yığın tabanlı akrabasıdır (geçici ad yerine bir yığına koyup alır). Derleyicinin en zekice işleri burada yapılır, çünkü aynı iyileştirme bir kez yazılır ve her dil, her işlemci için geçerli olur.",
      formula: "AST → üç adresli kod:  t<sub>1</sub> = b * 3,  t<sub>2</sub> = a + t<sub>1</sub>,  x = t<sub>2</sub>",
      formulaNote: "t₁, t₂ geçici değerlerdir; kod üretimi aşamasında bunların hangisinin bir yazmaçta, hangisinin bellekte yaşayacağına karar verilir.",
    },
    {
      heading: "İyileştirme: anlamı değiştirmeden, işi azaltmak",
      body:
        "Optimizasyonun tek yasası <em>sanki</em> kuralıdır: program, hiç dokunulmamış gibi davrandığı sürece derleyici her şeyi değiştirebilir. En basit örnek <strong>sabit katlama</strong>: <code>y = 2 + 3 * 4</code> satırındaki hesabı çalışma anına bırakmak yerine derleyici kendisi yapar ve <code>y = 14</code> yazar. Bunu Python'da kendin görebilirsin: CPython 3.11'de <code>dis</code> modülünün döktüğü bytecode'da ne toplama ne çarpma vardır, yalnızca <code>LOAD_CONST 14</code>. Hiç çalışmayacak dallar silinir (ölü kod eleme), döngü içinde değişmeyen hesaplar dışarı alınır, küçük işlevler çağrıldıkları yere gömülür. Bu adımların her biri küçüktür; etkisi onlarcası art arda uygulanınca birikir. Yasanın sınırı da öğreticidir: kayan noktalı sayılarda (a + b) + c ile a + (b + c) aynı sonucu vermeyebilir, bu yüzden derleyici özel izin almadan toplamaların sırasını değiştiremez.",
      formula: "2 + 3 * 4  ⟶  14   (derleme anında, çalışma anında değil)",
      formulaNote: "Değişken içeren ifadeler katlanamaz: a + b * 3 için gerçekten çarpıp toplamak gerekir; a ve b ancak çalışırken bellidir.",
    },
    {
      heading: "Derleyici, yorumlayıcı, JIT: bir maliyet hesabı",
      body:
        "Bir programı n kez çalıştıracaksın. Derleyici çeviri bedelini bir kez öder, sonra her çalıştırma makine hızındadır. Yorumlayıcı çeviri bedeli ödemez ama her çalıştırmada her komutu yeniden okur, çözer, uygular; bu 'okuma-çözme' yükü basit işlemlerde işin kendisinden pahalıdır. Tek çalıştırma için yorumlayıcı, milyon çalıştırma için derleyici kazanır; aradaki sınırı iki doğrunun kesişimi verir. <strong>JIT</strong> ikisinin arasını bulur: kodu yorumlarken sayar, bir döngü belli bir eşiği aşınca o parçayı çalışma anında derler. Üstelik önceden derleyen bir derleyicinin çoğu zaman bilemeyeceği bir şeyi bilir: bu döngüde <code>x</code> gerçekten hep tam sayı mı? Öyleyse o varsayımla hızlı kod üretir, varsayım bozulursa yorumlayıcıya geri döner. V8 ve HotSpot'un hızı bu kumardan gelir.",
      formula: "T(n) = T<sub>çeviri</sub> + n · t   ⟹   n* = T<sub>çeviri</sub> / (t<sub>yorum</sub> − t<sub>derli</sub>)",
      formulaNote: "n*, iki yolun eşitlendiği çalıştırma sayısıdır: T_çeviri + n·t_derli = n·t_yorum denkleminin çözümü. Örnek: derleme 2 s, derlenmiş çalıştırma 5 ms, yorumlanan çalıştırma 50 ms ise n* = 2 / 0.045 ≈ 44.4; 45. çalıştırmadan itibaren derleyici öndedir.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört etkileşimli bölüm var: tıklanabilir <strong>5 aşamalı boru hattı</strong> (her aşamanın örnek girdi-çıktısı açılır), canlı <strong>tokenleştirici</strong> (metin kutusuna yazdıkça token sayısı ve türleri altta güncellenir; <strong>x = a + b * 3</strong> ve <strong>if (x &gt; 0)</strong> düğmeleri hazır örnek yükler), üç düğmeli <strong>AST tuvali</strong> (turkuaz daire işlem, sarı sayı, mavi ad, pembe atama) ve tıklayınca açıklaması açılan 12 kavram kartı. Sayfada kaydırıcı ya da sayısal ölçüm yok; deneyler tokenleştirici kutusuna yazıp sayıları okumaya ve ağaçları karşılaştırmaya dayanıyor.",
    experiments: [
      {
        title: "Dört satır kaç token eder?",
        predict:
          "Metin kutusundaki hazır kod (toplam değişkeni ve for döngüsü) kaç tokena ayrılır? Boşlukları ve satır sonlarını sayma. Sonra şunu kestir: <code>&lt;=</code> ve <code>++</code> birer token mı, ikişer mi?",
        do: "Sayfa açıldığında kutunun altındaki satırı oku; gerekirse <strong>Tokenleştir</strong> düğmesine bas. Ardından ikinci satırdaki <code>i &lt;= 10</code> ifadesini <code>i &lt; = 10</code> yap (araya boşluk koy) ve sayıya tekrar bak.",
        observe:
          "'29 token — 3 anahtar kelime · 7 tanımlayıcı · 4 sayı · 7 operatör · 8 noktalama'. Boşluk ekleyince sayı 30'a çıkar: <code>&lt;=</code> tek operatör token iken <code>&lt;</code> ve <code>=</code> iki ayrı tokena bölünür ve kutuda iki ayrı kırmızı etiket belirir.",
        explain:
          "<code>toplam</code> üç kez, <code>i</code> dört kez geçtiği için 7 tanımlayıcı; <code>int</code> iki, <code>for</code> bir kez geçtiği için 3 anahtar kelime. Lexer en uzun eşleme kuralıyla çalışır: <code>&lt;</code> gördüğünde bir sonraki karakter <code>=</code> ise ikisini tek tokena yutar. Araya giren boşluk bu zinciri koparır; gerçek bir C derleyicisi de aynı nedenle <code>i &lt; = 10</code> yazımına sözdizimi hatası verir.",
      },
      {
        title: "Lexer neyi görmez, neyi fazla görür?",
        predict:
          "Hazır kodun ilk satırının sonuna <code>// toplamı hesapla</code> yazarsan token sayısı değişir mi? <code>x = \"a + b * 3\";</code> kaç tokendır? Ve <code>int sayı = 5;</code> satırını yazarsan tanımlayıcı olarak ne görünür?",
        do: "Önce ilk satırın sonuna yorumu ekle ve sayıyı oku. Sonra <strong>x = a + b * 3</strong> düğmesine bas, sayıyı not et; ardından ifadeyi tırnak içine al: <code>x = \"a + b * 3\";</code>. Son olarak kutuyu silip <code>int sayı = 5;</code> yaz.",
        observe:
          "Yorum satırı sayıyı 29'da bırakır; yorum tek bir token bile üretmez. Düğme 8 token verir (3 tanımlayıcı · 1 sayı · 3 operatör · 1 noktalama); tırnak içine alınca 4'e düşer: a, +, b, *, 3 tek bir yeşil dizgi tokenında kaybolur. Türkçe satırda ise 6 token çıkar ve <code>say</code> mavi bir tanımlayıcı, <code>ı</code> ayrı bir noktalama tokenı olur.",
        explain:
          "Lexer yorumu okur ve atar: derleyicinin sonraki hiçbir aşaması yorumları görmez, bu yüzden yorumlar çalışma hızına sıfır etki eder. Tırnak işareti lexer için bir mod değiştirir: kapanış tırnağına kadar her şey, operatörler dahil, dizgiye aittir. Türkçe harf meselesi ise bu sayfanın kuralının ASCII ile sınırlı olmasındandır ([a-zA-Z_]); 'ı' kurala uymayınca 'başka her şey' kovasına, yani noktalamaya düşer. Modern dillerin çoğu (Python 3, Swift, Go) Unicode harfleri tanımlayıcıda kabul eder; sayfanın lexer'ı bu konuda eski C'nin tutumunu taklit ediyor.",
      },
      {
        title: "Kök hangi işlem? Parantez nereye gitti?",
        predict:
          "<code>2 + 3 * 4</code> ağacının kökü '+' mı, '*' mı? <strong>(a + b) * c</strong> ağacında kök hangisi olur ve parantezler ağacın neresinde durur? İki ağacın düğüm sayısı farklı mı?",
        do: "AST bölümünde sırayla <strong>2 + 3 * 4</strong>, <strong>(a + b) * c</strong> ve <strong>x = y + 5 * z</strong> düğmelerine bas. Her ağacın kökünü, kat sayısını, düğüm sayısını ve tuvalin altındaki açıklama satırını oku.",
        observe:
          "İlk ağaçta kök '+', solunda sarı 2, sağında '*' ve onun altında 3 ile 4: üç kat, beş düğüm. İkincide kök '*' olur; '+' sol dala iner, altında mavi a ile b, sağda c: yine üç kat, beş düğüm ve hiçbir yerde parantez yok. Açıklama satırı da bunu söyler: 'Parantez ağaçta düğüm olmaz'. Üçüncü ağaçta tepede pembe '=', solunda mavi x, sağında '+', en altta 5 ile z'yi bağlayan '*': dört kat, yedi düğüm.",
        explain:
          "Kök en son yapılan işlemdir, yapraklara en yakın işlem ilk hesaplanır. İlk ağaçta çarpma derindedir çünkü gramerde bir alt kattadır. İkinci ağaçta parantez, ayrıştırıcının birim işlevini en üst kata geri döndürür; böylece '+' bütün hâlinde tek bir birim olur ve '*' onun üstüne oturur. Parantezin işi bu yer değişimiyle biter, ağaçta izi kalmaz. Python'un <code>dis</code> modülü aynı şeyi bytecode sırasıyla doğrular: <code>x = (a + b) * c</code> için önce a ile b toplanır, sonra c yüklenip çarpılır. İlk iki ağacı sayfanın ayrıştırıcısı o anda hesaplar; üçüncüsü koda elle yazılmış hazır bir ağaçtır.",
      },
      {
        title: "Derleyici hesabı senin yerine yapar",
        predict:
          "Boru hattında <strong>Optimizasyon</strong> aşamasına tıkladığında <code>x = 2 + 3 * 4;</code> satırının neye dönüştüğünü tahmin et. Aynı sabit katlamanın Python'da da olup olmadığını kestir: Python 'yorumlanan' bir dil sayılır.",
        do: "Boru hattında beş aşamayı soldan sağa tıkla ve her birinin örnek kutusunu oku; <strong>Optimizasyon</strong>'da iki örneği karşılaştır. Evde Python varsa bir terminalde <code>python3 -c \"import dis; dis.dis(compile('y = 2 + 3 * 4', 's', 'exec'))\"</code> komutunu çalıştır.",
        observe:
          "Aşama kutusu <code>x = 14; (constant folding)</code> gösterir ve döngü açma örneğinde dört adımlık döngü dört ayrı atamaya dönüşür. Python 3.11'de dis çıktısında toplama ya da çarpma komutu yoktur; işi yapan iki komut <code>LOAD_CONST 14</code> ve <code>STORE_NAME y</code>'dir (çevrelerindeki RESUME ve dönüş komutları her modülde bulunur; komut adları sürümden sürüme değişebilir). Buna karşılık <code>x = a + b * 3</code> için altı komut çıkar: a yüklenir, b yüklenir, 3 yüklenir, çarpma, toplama, saklama.",
        explain:
          "Sabitlerden oluşan bir ifade program çalışmadan bellidir; derleyici onu bir kez hesaplar ve sonucu gömer. CPython bile kaynak kodu önce bytecode'a derler ve bu derleme sırasında sabit katlama yapar; 'yorumlanan dil' etiketi dilin değil uygulamanın özelliğidir. Değişkenli ifade katlanamaz, çünkü a ve b'nin değeri ancak çalışırken bilinir. Bytecode'daki sıra (a, b, 3, çarp, topla) ağacın 'önce çocuklar, sonra düğümün kendisi' diye gezilmesidir; buna sondan sıralı (post-order) gezinti denir ve AST ile yığın makinesi kodu arasındaki köprü tam budur.",
      },
    ],
  },
  wow: [
    {
      title: "Kimse elini sürmedi",
      body:
        "Grace Hopper'ın 1952'de UNIVAC için yazdığı A-0, kendi deyişiyle 'çalışan bir derleyici'ydi ve kimse ona dokunmak istemedi; ona bilgisayarların yalnızca aritmetik yapabileceği söylenmişti. Beş yıl sonra, 1957'de Backus'ın FORTRAN derleyicisi IBM 704'te çalıştı ve ürettiği kod elle yazılmış programlarla yarışabildi. Programcıların 'bir makine benim kadar iyi kod yazamaz' inancı, mesleğin kendi aracı tarafından yıkıldı.",
    },
    {
      title: "Kaynak kodu temiz, derleyici hain",
      body:
        "Unix'in yaratıcılarından Ken Thompson, 1983 Turing Ödülü konuşmasında ürkütücü bir numara anlattı: C derleyicisine iki ek yapılır. Biri 'login' programını derlerken içine gizli bir parola yerleştirir; öteki, derleyici kendi kaynak kodunu derlerken bu iki eki yeniden üretir. Ekler derleyicinin kaynak kodundan silinse bile derlenmiş derleyici hileyi kuşaktan kuşağa taşır. 1984'te yayımlanan 'Reflections on Trusting Trust' metninin dersi bugün de geçerli: kendin yazmadığın bir derleyiciye güveniyorsan, kaynak kodu okumak yetmez.",
    },
    {
      title: "Hiç görmedikleri makine için 4 kilobayt",
      body:
        "1975'in başında Bill Gates, Paul Allen ve Monte Davidoff, hiç görmedikleri Altair 8800 için bir BASIC yorumlayıcısı yazdı. Allen, Harvard'ın PDP-10'unda Intel 8080 işlemcisini taklit eden bir benzetim programı yazdı; yorumlayıcı o sanal makinede geliştirildi ve 4 kilobaytlık belleğe sığdırıldı. Anlatılana göre Allen, Albuquerque'ye uçarken yükleyici programı yazmayı unuttuğunu fark edip onu uçakta yazdı; kâğıt şeritteki yorumlayıcı gerçek makinede ilk denemede çalıştı. Microsoft'un ilk ürünü bir yorumlayıcıydı.",
    },
  ],
  worked: {
    title: "Bir satırın beş aşamalı yolculuğu",
    prompt:
      "<code>y = 2 + 3 * 4;</code> satırını sayfadaki boru hattının beş aşamasından elle geçir: her aşamanın girdisini ve çıktısını yaz, sağ tarafı gramerden türet ve en sonda makine koduna kaç bayt kaldığını bul.",
    steps: [
      "<strong>Leksik analiz.</strong> 14 karakter (boşluklar dahil) 8 tokena iner: (ID, y) (OP, =) (NUM, 2) (OP, +) (NUM, 3) (OP, *) (NUM, 4) (PUNCT, ;). Altı boşluk atılır. Sayfanın tokenleştiricisine yazarsan altta '8 token — 1 tanımlayıcı · 3 sayı · 3 operatör · 1 noktalama' görürsün.",
      "<strong>Sözdizimi analizi.</strong> Sağ tarafı sayfadaki CFG kartının grameriyle türet (E → E + T | T, T → T * F | F, F → sayı). En soldan türetme sekiz adımdır: E ⇒ E + T ⇒ T + T ⇒ F + T ⇒ 2 + T ⇒ 2 + T * F ⇒ 2 + F * F ⇒ 2 + 3 * F ⇒ 2 + 3 * 4. '+' ilk adımda, '*' beşinci adımda doğar; ağaçta da '+' üstte, '*' altta kalır. En son '=' y ile toplamı bağlar: dört kat, yedi düğüm. Noktalı virgül ağaca girmez.",
      "<strong>Semantik analiz.</strong> Sembol tablosunda y aranır: tanımlı mı, türü ne? Sağ taraf üç tam sayıdan oluşur, tür int'tir; y de int ise atama geçerlidir. Çıktı, her düğümüne tür yazılmış aynı ağaçtır.",
      "<strong>Optimizasyon.</strong> Ağaçta değişken yok; derleyici önce 3 * 4 = 12, sonra 2 + 12 = 14 hesaplar ve iki işlem düğümünü tek bir sabitle değiştirir: y = 14. Üç adresli kodda üç satır (t₁ = 3 * 4; t₂ = 2 + t₁; y = t₂) tek satıra iner.",
      "<strong>Kod üretimi.</strong> Geriye bir sabiti bir yere koymak kalır. y bir yazmaçta yaşıyorsa x86-64'te bu tek komuttur: <code>mov eax, 14</code>, makine kodunda <code>B8 0E 00 00 00</code>, yani 5 bayt (bir bayt komut, dört bayt sayı; 14 = 0x0E). y yığındaki bir bellek gözündeyse komut <code>mov dword ptr [rbp-4], 14</code> olur: <code>C7 45 FC 0E 00 00 00</code>, 7 bayt. Kaynak kodda 14 karakter, işlemcide 5 ya da 7 bayt ve sıfır aritmetik işlem.",
    ],
    result:
      "Satır başta bir çarpma ve bir toplama gerektiriyor gibi görünür; derleyici ikisini de derleme anında yapar ve işlemciye yalnızca '14'ü yerine koy' komutu kalır. Python'un dis çıktısındaki LOAD_CONST 14 aynı sonucun bytecode hâlidir.",
  },
  misconceptions: [
    {
      myth: "Python yorumlanan bir dildir, C derlenen bir dildir; bu dilin kendi özelliğidir.",
      truth:
        "Derlenme ya da yorumlanma dilin değil, o dili çalıştıran programın özelliğidir. CPython kaynak kodu bytecode'a derler ve bu bytecode'u yorumlar; PyPy aynı Python kodunu JIT ile makine koduna çevirir; C için de yorumlayıcılar yazılmıştır. JavaScript 1995'te saf yorumlayıcıyla başladı, 2008'den beri JIT ile derlenir. Dil bir sözleşmedir, derleyici ve yorumlayıcı o sözleşmeyi uygulamanın iki yoludur.",
    },
    {
      myth: "Parantezler ve noktalı virgüller ağaçta birer düğümdür.",
      truth:
        "Ağaç yalnızca anlam taşıyan parçaları tutar: işlemler, sayılar, adlar. Parantezin tek görevi ayrıştırıcıya hangi dalın hangisinin altına gireceğini söylemektir; iş bitince ağaçta iz bırakmaz. (a + b) * c ve a + b * c farklı ağaçlardır ama ikisinde de parantez düğümü yoktur. 'Soyut' sözdizimi ağacındaki 'soyut' tam bu silmeyi anlatır.",
    },
    {
      myth: "Derleyici hata vermediyse program doğrudur.",
      truth:
        "Derleyici yalnızca biçimsel kuralları denetler: tokenlar geçerli mi, gramer tutuyor mu, türler uyuşuyor mu. 'toplam = toplam − i' yazmak istediğin yerde 'toplam + i' yazmışsan bu kusursuz bir programdır; derleyici niyetini bilmez. Semantik analiz 'anlam' denetler ama bu anlam, dilin kuralları içindeki anlamdır; senin amacın değil.",
    },
    {
      myth: "Derleme her zaman yorumlamadan hızlıdır, o yüzden her şeyi derlemek gerekir.",
      truth:
        "Toplam süre çeviri artı çalıştırmadır. Bir kez çalışacak kısa bir betik için derleme bedeli kendini ödemez; etkileşimli denemelerde yorumlayıcının anında yanıt vermesi daha değerlidir. Milyonlarca kez dönecek bir döngü için derleme kazanır. JIT'in var olma sebebi tam bu ikilemdir: önce yorumla, sadece sık çalışanı derle.",
    },
  ],
  glossary: [
    { term: "Token", definition: "Lexer'ın ürettiği en küçük anlamlı birim; bir tür ve bir değerden oluşur, örneğin (NUMBER, 42)." },
    { term: "Lexer (sözcük çözümleyici)", definition: "Kaynak kodun karakterlerini soldan sağa okuyup tokenlara ayıran, boşluk ve yorumları atan ilk aşama." },
    { term: "Parser (ayrıştırıcı)", definition: "Token dizisini dilin gramerine göre bir ağaca dönüştüren aşama; gramere uymayan diziye sözdizimi hatası verir." },
    { term: "AST (soyut sözdizimi ağacı)", definition: "Programın yapısını tutan ağaç; işlemler iç düğüm, sayılar ve adlar yapraktır, parantez ve noktalama atılmıştır." },
    { term: "Gramer (BNF)", definition: "Dilin hangi token dizilerinin geçerli olduğunu kurallarla tanımlayan biçimsel yazım; işlem önceliği bu kuralların katmanlarından doğar." },
    { term: "Ara kod (IR)", definition: "Kaynak dilden ve hedef işlemciden bağımsız, basit komutlardan oluşan iç temsil; iyileştirmeler bu kat üzerinde yapılır." },
    { term: "Bytecode", definition: "Gerçek bir işlemciye değil sanal bir makineye yazılmış ara kod; Java ve Python bu kodu yorumlar ya da JIT ile derler." },
    { term: "JIT (tam zamanında derleme)", definition: "Program çalışırken sık kullanılan bölümleri saptayıp o anda makine koduna çeviren yöntem; yorumlayıcı ile derleyicinin karışımı." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede derleyici bir kara kutudur: kodu verirsin, program çıkar. Üniversitede o kutunun her aşaması bir kuram alanına açılır. Lexer'ın token kuralları <strong>düzenli diller</strong> ve sonlu otomatlardır; parser'ın grameri <strong>bağlamdan bağımsız dillerdir</strong>. İkisinin ayrı aşama olmasının nedeni kuramsaldır: iç içe parantezleri eşlemek sınırsız sayma ister, sonlu otomat sayamaz, bir yığın gerekir. Bu merdiveni 1956'da Noam Chomsky dilbilim için kurdu, derleyici yazarları ise ona göre araç üretti. Derste iki ayrıştırma ailesi görürsün: <strong>LL</strong> yukarıdan aşağı iner ve en soldan türetmeyi kurar (sayfadaki özyinelemeli iniş böyledir; sol özyinelemeli kuralı kaldıramaz), <strong>LR</strong> aşağıdan yukarı çıkar, tokenları yığına atıp kuralın sağ tarafı tamamlanınca indirger ve sol özyinelemeyle sorunu yoktur. Donald Knuth'un 1965'te tanımladığı LR ayrıştırma, yacc ve bison gibi araçların kullandığı LALR çeşidinin temelidir. Tür denetimi lambda hesabı ve tür kuramına, iyileştirme ise çizge algoritmalarına çıkar: hangi değişkenin hangi yazmaca gireceği, 'aynı anda canlı değişkenler komşu olsun' kuralıyla çizilen bir çizgenin boyanması problemidir. Alanın klasik ders kitabı, kapağındaki ejderha yüzünden 'Ejderha Kitabı' diye anılan, Aho ve Ullman'ın 1977'de yazdığı, 1986'da Sethi ile genişlettiği kitaptır.",
      "Asıl derin fikir şudur: program bir veridir ve onu işleyen de bir programdır. Bu yüzden derleyiciyi kendi dilinde yazabilir, hatta önce basit bir sürümüyle derleyip sonra onunla kendisini derleyebilirsin; buna <strong>kendi kendini yetiştirme</strong> (bootstrapping) denir. Rust derleyicisinin ilk sürümü OCaml'da, Go'nunki C'de yazılmıştı; bugün ikisi de kendi dilinde yazılıdır ve bir önceki sürümüyle derlenir. 1971'de Yoshihiko Futamura daha şaşırtıcı bir şey gösterdi: bir yorumlayıcıyı belirli bir programa göre 'özelleştirirsen' elinde o programın derlenmiş hâli kalır; yorumlayıcı ile derleyici arasında kuramsal bir eşitlik vardır. Thompson'ın derleyici içindeki tuzağı da aynı özyinelemeden beslenir. Derleyici Tasarımı dersi bu yüzden Biçimsel Diller ve Otomatlar, Veri Yapıları, Algoritmalar ve Bilgisayar Mimarisi derslerinin buluştuğu yerdir.",
    ],
    topics: ["Biçimsel diller ve otomatlar", "LL ve LR ayrıştırma", "Tür sistemleri", "SSA ve veri akışı analizi", "Yazmaç ataması ve çizge boyama", "JIT ve çalışma anı sistemleri", "LLVM altyapısı"],
  },
  quiz: [
    {
      question: "<code>2 + 3 * 4</code> ifadesinin soyut sözdizimi ağacında kökteki düğüm hangisidir?",
      options: ["* işlemi, çünkü önce o yapılır", "+ işlemi, çünkü en son o yapılır", "2 sayısı, çünkü ilk tokendır", "Parantez düğümü"],
      answer: 1,
      explanation: "Kök en son yapılan işlemdir; ilk hesaplanan şey en derindedir. Çarpma gramerde daha alt katta olduğu için ağaçta da aşağıdadır. Parantez hiçbir zaman düğüm olmaz; (2 + 3) * 4 yazsaydın değişen şey kökün '*' olmasıydı.",
    },
    {
      question: "Bir programı derlemek 2 s sürüyor; derlenmiş hâli 5 ms'de, yorumlanan hâli 50 ms'de çalışıyor. Program en az kaç kez çalıştırılırsa derlemek toplamda daha kısa sürer?",
      options: ["10", "40", "45", "400"],
      answer: 2,
      explanation: "Eşitlik noktası 2 + 0.005·n = 0.05·n, yani n = 2 / 0.045 ≈ 44.4. 44 çalıştırmada yorumlayıcı hâlâ öndedir (2.20 s'ye karşı 2.22 s), 45'te derleyici öne geçer (2.25 s'ye karşı 2.225 s). 400 cevabı çalıştırma başına kazancı 45 ms yerine 5 ms saymaktan, 40 cevabı derlenmiş çalıştırmanın süresini unutmaktan çıkar.",
    },
    {
      question: "Bir web sayfasındaki döngü saniyede binlerce kez dönüyor. JIT'li bir JavaScript motoru bu döngüyü nasıl ele alır?",
      options: ["Her seferinde baştan yorumlar", "Sayfa yüklenmeden önce tüm kodu makine koduna derler", "Önce yorumlar, döngünün sık çalıştığını fark edince o parçayı çalışma anında makine koduna derler", "Döngüyü atlar"],
      answer: 2,
      explanation: "JIT'in özü budur: yorumlayarak başla, sayaç tut, eşiği aşan 'sıcak' kodu derle. Bu sırada gözlenen gerçek türlere göre özelleşmiş kod üretir; varsayım bozulursa yorumlayıcıya geri döner.",
    },
  ],
  next: [
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Lexer'ın arkasındaki sonlu otomatı DFA simülatöründe ve düzenli ifade deney alanında kendin çalıştır; Chomsky hiyerarşisinde parser'ın gramerinin hangi basamakta durduğunu gör." },
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "Kod üretimi aşamasının vardığı yer: aynı işlevi makine kodu, assembly ve C olarak üç düzeyde yan yana gör." },
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi", why: "'Program da bir veridir' fikrinin kuramsal kökü: lambda hesabında β-indirgemeyi adım adım izle, durma probleminin neden çözülemediğini gör." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "AST bir ağaçtır, sembol tablosu bir hash tablosudur, ayrıştırıcı bir yığınla çalışır; derleyicinin kullandığı yapıları tek tek dene." },
  ],
  sources: [
    { title: "Wikipedia · Compiler", url: "https://en.wikipedia.org/wiki/Compiler", note: "Derleyicinin tarihi (Hopper, FORTRAN), aşamaları ve türleri; kaynakçası geniş (İngilizce)." },
    { title: "Python belgeleri · dis — bytecode çözümleyici", url: "https://docs.python.org/3/library/dis.html", note: "Sayfadaki sabit katlama deneyini kendi bilgisayarında doğrulamak için; CPython'un ürettiği bytecode'u gösterir." },
    { title: "MIT OpenCourseWare · 6.035 Computer Language Engineering", url: "https://ocw.mit.edu/courses/6-035-computer-language-engineering-spring-2010/", note: "Üniversite düzeyinde derleyici dersi: lexer'dan kod üretimine ders notları ve ödevler (İngilizce)." },
    { title: "Vikipedi · Derleyici", url: "https://tr.wikipedia.org/wiki/Derleyici", note: "Türkçe terimler ve genel bakış; sayfadaki İngilizce terimlerin karşılıkları için." },
  ],
  revision: "Kasım 2026",
};
