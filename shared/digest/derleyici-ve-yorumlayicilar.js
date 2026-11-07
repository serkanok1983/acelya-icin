window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["derleyici-ve-yorumlayicilar"] = {
  slug: "derleyici-ve-yorumlayicilar",
  title: "Derleyici ve Yorumlayıcı: Kodun Makineye Yolculuğu",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 35,
  tagline:
    "Yazdığın dört satır kod, işlemciye varana kadar beş kez kılık değiştirir: harfler token olur, tokenlar ağaç, ağaç ara kod, ara kod makine komutu. Bu sayfada o dönüşümü adım adım kendin yaparsın.",
  hook:
    "1952'de Grace Hopper, bilgisayarın kendi programını yazmasını sağlayan bir yazılım yaptı ve adına 'compiler' dedi. Kendi anlatımına göre kimse ona elini sürmedi: bilgisayarlar yalnızca aritmetik yapabilirdi, program yazamazdı. Bugün telefonundaki her uygulama o fikrin torunu. Peki <code>x = a + b * 3</code> yazdığında makine çarpmayı toplamadan önce yapacağını nereden biliyor?",
  bigIdea:
    "Program bir metindir; derleyici o metni önce <strong>tokenlara</strong>, sonra bir <strong>ağaca</strong>, sonra makine komutlarına çevirir ve bu çeviriyi bir kez yapar. Yorumlayıcı aynı yolu her çalıştırmada baştan yürür; JIT ise ikisini birleştirir: önce yorumla, sık çalışan kısmı derle.",
  story: [
    "1950'lerin başında programlamak, işlemcinin her komutunu sayı olarak elle yazmak demekti. Grace Hopper 1952'de UNIVAC için <strong>A-0</strong> adını verdiği sistemi yaptı: hazır alt programları bir araya toplayıp (İngilizce <em>compile</em>, 'derlemek') çalışır bir program üreten bir yazılım. Bugünkü anlamda derleyiciden çok bir bağlayıcıydı ama adı kaldı. Asıl kırılma 1954–1957 arasında IBM'de yaşandı: John Backus'ın küçük ekibi, matematik formüllerine benzeyen bir dili, <strong>FORTRAN</strong>'ı, IBM 704 için makine koduna çeviren ilk tam derleyiciyi Nisan 1957'de teslim etti. Dönemin programcıları alaycıydı; makinenin ürettiği kodun elle yazılmış koddan yavaş olacağına kesin gözüyle bakılıyordu. Backus ekibinin asıl emeği bu yüzden çeviriye değil, <em>iyileştirmeye</em> gitti: kayıtlara göre ekip, hangi döngünün kaç kez döneceğini kestirmek için rastgele sayılarla benzetim bile yaptı. Çıkan kod, deneyimli programcıların elle yazdığıyla yarışıyordu; FORTRAN'ın tutmasının nedeni buydu.",
    "Yorumlayıcının doğuşu daha garip bir hikâyedir. John McCarthy 1958–1960 arasında LISP dilini tasarlarken, bir LISP programını girdi olarak alıp çalıştıran <code>eval</code> adlı bir işlevi kâğıt üzerinde, kuramsal bir egzersiz olarak yazdı. McCarthy'nin anlatımına göre öğrencisi Steve Russell bunu IBM 704'ün makine diline çevirmeyi önerdiğinde ona 'kuramla uygulamayı karıştırıyorsun' demişti; Russell yine de yaptı ve ortaya ilk LISP yorumlayıcısı çıktı. Kodu çalıştırmak için önce makine koduna çevirmek gerekmiyordu; programı okuyup anında uygulayan bir program yetiyordu. 1964'te Dartmouth'ta Kemeny ve Kurtz'un öğrenciler için tasarladığı BASIC, 1975'te Bill Gates ve Paul Allen'ın Altair için 4 kilobaytlık belleğe sığdırdığı BASIC yorumlayıcısı, 1991'de Guido van Rossum'un Python'ı: yorumlayıcı geleneği, 'yaz, hemen dene' fikrinin taşıyıcısı oldu.",
    "İki dünya 1990'larda birleşti. Java (1995) kaynak kodu önce platformdan bağımsız bir <strong>bytecode</strong>'a derliyor, sonra bu ara kodu bir sanal makinede çalıştırıyordu; 1999'da gelen HotSpot motoru sık çalışan bölümleri çalışma anında makine koduna derledi. Buna <strong>JIT</strong> (tam zamanında derleme) dendi. 2008'de Google'ın Chrome'la birlikte çıkardığı V8 motoru aynı fikri JavaScript'e uyguladı ve tarayıcı, yavaş betik dili yorumlayıcısından ciddi bir çalışma ortamına dönüştü. Bu arada derleyici altyapısının kendisi de ortak bir mala dönüştü: Richard Stallman'ın 1987'de yayımladığı GCC ve Chris Lattner'ın 2000'de Illinois Üniversitesi'nde başlattığı LLVM, bugün C'den Rust'a, Swift'ten Fortran'a onlarca dilin arkasındaki ortak motorlardır. Sayfadaki beş aşamalı boru hattı tam da bu motorların iç yapısıdır.",
  ],
  core: [
    {
      heading: "Token: harflerden anlamlı parçalara",
      body:
        "Lexer kaynak kodu soldan sağa tek bir geçişte okur ve karakterleri sözcük benzeri parçalara, <strong>token</strong>lara ayırır: anahtar kelime, tanımlayıcı, sayı, operatör, dizgi, noktalama. Boşluk ve yorum satırları bu aşamada çöpe gider; sonraki hiçbir aşama onları görmez. Sayfadaki tokenleştirici de böyle çalışır: harfle başlayan bir karakter dizisi okunur, sözlükte varsa anahtar kelime, yoksa tanımlayıcı sayılır. Bir inceliği vardır: <code>&lt;=</code> gördüğünde iki ayrı token değil tek bir operatör üretir. Buna <strong>en uzun eşleme</strong> (maximal munch) kuralı denir: lexer her zaman mümkün olan en uzun tokenı yutar. Bu yüzden <code>i++</code> üç karakter ama iki tokendır.",
      formula: "token = (tür, değer)   örn. (NUMBER, \"42\"), (OPERATOR, \"<=\")",
      formulaNote: "Her token türü bir düzenli ifadeyle tanımlanır; tanımlayıcı için sayfanın kuralı [a-zA-Z_][a-zA-Z0-9_]* biçimindedir.",
    },
    {
      heading: "Gramer ve ağaç: öncelik nereden gelir?",
      body:
        "Token dizisi düzdür; anlam ise iç içedir. <strong>Ayrıştırıcı</strong> (parser) tokenları dilin <strong>gramerine</strong> göre bir ağaca dizer. Çarpmanın toplamadan önce gelmesi makineye öğretilmiş bir kural değil, gramerin yapısının sonucudur: 'toplam' kuralı 'çarpım'lardan, 'çarpım' kuralı sayılardan kurulur. Sayfanın kodu tam bu üç katı uygular: önce toplama-çıkarma katmanı, onun altında çarpma-bölme katmanı, en altta sayı ya da değişken. Böylece <code>2 + 3 * 4</code> ağacında kök '+' olur, '*' bir alt kata iner; önce derindeki hesaplanır. Parantezler ağaca girmez; işleri bittiğinde silinirler, çünkü yaptıkları tek şey hangi dalın hangisinin altına gireceğini belirlemektir.",
      formula: "toplam → çarpım (('+' | '−') çarpım)*,   çarpım → birim (('*' | '/') birim)*",
      formulaNote: "Bu yazım biçimine BNF denir; 1959'da John Backus, ALGOL dilini tanımlamak için icat etti. Yıldız 'sıfır ya da daha çok kez' demektir.",
    },
    {
      heading: "Anlam denetimi ve ara kod",
      body:
        "<code>x = \"merhaba\" + 42;</code> satırı gramer açısından kusursuzdur; sorun anlamındadır. <strong>Semantik analiz</strong> ağacı gezer, her değişkenin türünü ve kapsamını bir <strong>sembol tablosunda</strong> tutar, tanımlanmamış ad ya da uyumsuz tür gördüğünde hata verir. Bu aşamadan sonra ağaç, her satırda en çok üç ad geçen basit komutlara, <strong>üç adresli koda</strong> çevrilir: <code>t1 = b * 3; t2 = a + t1; x = t2</code>. Bu ara kod ne kaynak dile ne hedef işlemciye bağlıdır; LLVM'in IR'si ve Python'un bytecode'u bu kattadır. Derleyicinin en zekice işleri burada yapılır, çünkü aynı iyileştirme bir kez yazılır ve her dil, her işlemci için geçerli olur.",
      formula: "AST → üç adresli kod:  t<sub>1</sub> = b * 3,  t<sub>2</sub> = a + t<sub>1</sub>,  x = t<sub>2</sub>",
      formulaNote: "t₁, t₂ geçici değerlerdir; kod üretimi aşamasında bunların hangisinin bir yazmaçta, hangisinin bellekte yaşayacağına karar verilir.",
    },
    {
      heading: "İyileştirme: anlamı değiştirmeden, işi azaltmak",
      body:
        "Optimizasyonun tek yasası <em>sanki</em> kuralıdır: program, hiç dokunulmamış gibi davrandığı sürece derleyici her şeyi değiştirebilir. En basit örnek <strong>sabit katlama</strong>: <code>y = 2 + 3 * 4</code> satırındaki hesabı çalışma anına bırakmak yerine derleyici kendisi yapar ve <code>y = 14</code> yazar. Bunu bu bilgisayarda Python 3.11 ile sınadık: <code>dis</code> modülü bytecode'da ne toplama ne çarpma gösteriyor, yalnızca <code>LOAD_CONST 14</code>. Hiç çalışmayacak dallar silinir (ölü kod eleme), döngü içinde değişmeyen hesaplar dışarı alınır, küçük işlevler çağrıldıkları yere gömülür. Bu adımların her biri küçüktür; yüzlercesi art arda uygulanınca aradaki fark on katı bulabilir.",
      formula: "2 + 3 * 4  ⟶  14   (derleme anında, çalışma anında değil)",
      formulaNote: "Değişken içeren ifadeler katlanamaz: a + b * 3 için gerçekten çarpıp toplamak gerekir; a ve b ancak çalışırken bellidir.",
    },
    {
      heading: "Derleyici, yorumlayıcı, JIT: bir maliyet hesabı",
      body:
        "Bir programı n kez çalıştıracaksın. Derleyici çeviri bedelini bir kez öder, sonra her çalıştırma makine hızındadır. Yorumlayıcı çeviri bedeli ödemez ama her çalıştırmada her komutu yeniden okur, çözer, uygular; bu 'okuma-çözme' yükü basit işlemlerde işin kendisinden pahalıdır. Tek çalıştırma için yorumlayıcı, milyon çalıştırma için derleyici kazanır. <strong>JIT</strong> ikisinin arasını bulur: kodu yorumlarken sayar, bir döngü belli bir eşiği aşınca o parçayı çalışma anında derler. Üstelik derleyicinin asla bilemeyeceği bir şeyi bilir: bu döngüde <code>x</code> gerçekten hep tam sayı mı? Öyleyse o varsayımla hızlı kod üretir, varsayım bozulursa yorumlayıcıya geri döner. V8 ve HotSpot'un hızı bu kumardan gelir.",
      formula: "T<sub>toplam</sub> = T<sub>çeviri</sub> + n · T<sub>bir çalıştırma</sub>",
      formulaNote: "Derleyicide T_çeviri büyük, T_çalıştırma küçük; yorumlayıcıda tersi. n büyüdükçe ikinci terim belirleyici olur.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört etkileşimli bölüm var: tıklanabilir <strong>5 aşamalı boru hattı</strong> (her aşamanın örnek girdi-çıktısı açılır), canlı <strong>tokenleştirici</strong> (metin kutusuna yazdıkça token sayısı ve türleri altta güncellenir; <strong>x = a + b * 3</strong> ve <strong>if (x &gt; 0)</strong> düğmeleri hazır örnek yükler), üç düğmeli <strong>AST tuvali</strong> (sarı daire sayı, mavi tanımlayıcı, pembe atama) ve 12 kavram kartı. Deneyler için tokenleştirici kutusuna doğrudan yazabilirsin.",
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
          "<code>2 + 3 * 4</code> ağacının kökü '+' mı, '*' mı? <strong>(a + b) * c</strong> düğmesine bastığında çizilen ağacın kökünde ne bekliyorsun?",
        do: "AST bölümünde sırayla <strong>2 + 3 * 4</strong>, <strong>(a + b) * c</strong> ve <strong>x = y + 5 * z</strong> düğmelerine bas. Her ağacın kökünü, derinliğini ve tuvalin altındaki açıklama satırını oku.",
        observe:
          "İlk ağaçta kök '+', sağ dalda '*' ve altında sarı 3 ile 4: üç katlı bir ağaç. İkinci düğmede kök yine '+' çıkar ve açıklama satırı itiraf eder: 'Bu haliyle a + (b × c)'. Üçüncü ağaçta tepede pembe '=', solunda mavi x, sağında '+' ve en altta '5 * z': dört kat.",
        explain:
          "Kök en son yapılan işlemdir, yapraklar ilk hesaplanan. Çarpma daha derinde olduğu için önce yapılır; öncelik gramerin katmanlarından doğar. İkinci düğme sayfanın dürüst bir sınırını gösterir: tuvali çizen küçük ayrıştırıcı parantez tanımaz, bu yüzden düğmenin etiketinde parantez olsa da çizdiği ağaç parantezsiz ifadenin ağacıdır. Gerçek (a + b) * c ağacında kök '*' olur, '+' sol dalına iner ve parantezler ağaçta görünmez; işleri bu yer değişimini sağlamaktı. Python'un <code>dis</code> modülü bunu doğrular: parantezli ifadede bytecode önce a ile b'yi toplar, sonra c ile çarpar.",
      },
      {
        title: "Derleyici hesabı senin yerine yapar",
        predict:
          "Boru hattında <strong>Optimizasyon</strong> aşamasına tıkladığında <code>x = 2 + 3 * 4;</code> satırının neye dönüştüğünü tahmin et. Aynı sabit katlamanın Python'da da olup olmadığını kestir: Python 'yorumlanan' bir dil sayılır.",
        do: "Boru hattında beş aşamayı soldan sağa tıkla ve her birinin örnek kutusunu oku; <strong>Optimizasyon</strong>'da iki örneği karşılaştır. Evde Python varsa bir terminalde <code>python3 -c \"import dis; dis.dis(compile('y = 2 + 3 * 4', 's', 'exec'))\"</code> komutunu çalıştır.",
        observe:
          "Aşama kutusu <code>x = 14; (constant folding)</code> gösterir ve döngü açma örneğinde dört adımlık döngü dört ayrı atamaya dönüşür. Python 3.11'de dis çıktısında toplama ya da çarpma komutu yoktur; yalnızca <code>LOAD_CONST 14</code> ve <code>STORE_NAME y</code> görünür. Buna karşılık <code>x = a + b * 3</code> için beş komut çıkar: a ve b yüklenir, 3 yüklenir, çarpma, toplama, saklama.",
        explain:
          "Sabitlerden oluşan bir ifade program çalışmadan bellidir; derleyici onu bir kez hesaplar ve sonucu gömer. CPython bile kaynak kodu önce bytecode'a derler ve bu derleme sırasında sabit katlama yapar; 'yorumlanan dil' etiketi dilin değil uygulamanın özelliğidir. Değişkenli ifade katlanamaz, çünkü a ve b'nin değeri ancak çalışırken bilinir. Bytecode'daki sıra (önce b * 3, sonra +) ağacın yapraklardan köke doğru gezilmesidir: AST ile ara kod arasındaki köprü tam budur.",
      },
    ],
  },
  wow: [
    {
      title: "Kimse elini sürmedi",
      body:
        "Grace Hopper'ın 1952'de UNIVAC için yazdığı A-0, kendi deyişiyle 'çalışan bir derleyici'ydi ve kimse ona dokunmak istemedi; ona bilgisayarların yalnızca aritmetik yapabileceği söylenmişti. Beş yıl sonra Backus'ın FORTRAN derleyicisi IBM 704'te çalıştı ve ürettiği kod elle yazılmış programlarla yarışabildi. Programcıların 'bir makine benim kadar iyi kod yazamaz' inancı, mesleğin kendi aracı tarafından yıkıldı.",
    },
    {
      title: "Kaynak kodu temiz, derleyici hain",
      body:
        "Unix'in yaratıcılarından Ken Thompson, 1983 Turing Ödülü konuşmasında ürkütücü bir numara anlattı: C derleyicisine, 'login' programını derlerken içine gizli bir parola ekleyen; kendi kaynak kodunu derlerken de bu ekleme kodunu yeniden üreten bir değişiklik koydu. Değişiklik derleyicinin kaynak kodundan silinse bile derlenmiş derleyici hileyi sonsuza dek taşırdı. 1984'te yayımlanan 'Reflections on Trusting Trust' metninin dersi bugün de geçerli: kendin yazmadığın bir derleyiciye güveniyorsan, kaynak kodu okumak yetmez.",
    },
    {
      title: "Hiç görmedikleri makine için 4 kilobayt",
      body:
        "1975'in başında Bill Gates ve Paul Allen, henüz ellerinde olmayan Altair 8800 için bir BASIC yorumlayıcısı yazdı. Allen, Harvard'ın PDP-10'unda Intel 8080 işlemcisini taklit eden bir benzetim programı yazdı; yorumlayıcı o sanal makinede geliştirildi ve 4 kilobaytlık belleğe sığdırıldı. Anlatılana göre Allen, Albuquerque'ye uçarken yükleyici programı yazmayı unuttuğunu fark edip onu uçakta yazdı; kâğıt şerit gerçek makineye ilk denemede yüklendi. Microsoft'un ilk ürünü bir yorumlayıcıydı.",
    },
  ],
  worked: {
    title: "Bir satırın beş aşamalı yolculuğu",
    prompt:
      "<code>y = 2 + 3 * 4;</code> satırını sayfadaki boru hattının beş aşamasından elle geçir: her aşamanın girdisini ve çıktısını yaz, en sonda makine koduna kaç bayt kaldığını bul.",
    steps: [
      "<strong>Leksik analiz.</strong> 14 karakter (boşluklar dahil) 8 tokena iner: (ID, y) (OP, =) (NUM, 2) (OP, +) (NUM, 3) (OP, *) (NUM, 4) (PUNCT, ;). Altı boşluk atılır. Sayfanın tokenleştiricisine yazarsan altta '8 token — 1 tanımlayıcı · 3 sayı · 3 operatör · 1 noktalama' görürsün.",
      "<strong>Sözdizimi analizi.</strong> Gramer önce '*' katmanını bağlar: 3 * 4 bir alt ağaç olur. Sonra '+' bu alt ağaçla 2'yi birleştirir, en son '=' y ile toplamı bağlar. Kök '=', altında '+', onun altında '*'; dört kat, yedi düğüm. Noktalı virgül ağaca girmez, görevi satırın bittiğini söylemekti.",
      "<strong>Semantik analiz.</strong> Sembol tablosunda y aranır: tanımlı mı, türü ne? Sağ taraf üç tam sayıdan oluşur, tür int'tir; y de int ise atama geçerlidir. Çıktı, her düğümüne tür yazılmış aynı ağaçtır.",
      "<strong>Optimizasyon.</strong> Ağaçta değişken yok; derleyici önce 3 * 4 = 12, sonra 2 + 12 = 14 hesaplar ve iki işlem düğümünü tek bir sabitle değiştirir: y = 14. Üç adresli kodda üç satır (t₁ = 3 * 4; t₂ = 2 + t₁; y = t₂) tek satıra iner.",
      "<strong>Kod üretimi.</strong> Geriye bir sabiti bir yere koymak kalır. y bir yazmaçta yaşıyorsa x86-64'te bu tek komuttur: <code>mov eax, 14</code>, makine kodunda <code>B8 0E 00 00 00</code>, yani 5 bayt (bir bayt komut, dört bayt sayı; 14 = 0x0E). Kaynak kodda 14 karakter, işlemcide 5 bayt ve sıfır aritmetik işlem.",
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
      "Lisede derleyici bir kara kutudur: kodu verirsin, program çıkar. Üniversitede o kutunun her aşaması bir kuram alanına açılır. Lexer'ın token kuralları <strong>düzenli diller</strong> ve sonlu otomatlardır; parser'ın grameri <strong>bağlamdan bağımsız dillerdir</strong>. Bu merdiveni 1956'da Noam Chomsky dilbilim için kurdu, derleyici yazarları ise ona göre araç üretti: Donald Knuth'un 1965'te tanımladığı LR ayrıştırma, bugün yacc ve bison gibi araçların temelidir. Tür denetimi lambda hesabı ve tür kuramına, iyileştirme ise çizge algoritmalarına çıkar: hangi değişkenin hangi yazmaca gireceği, 'aynı anda canlı değişkenler komşu olsun' kuralıyla çizilen bir çizgenin boyanması problemidir. Alanın klasik ders kitabı, kapağındaki ejderha yüzünden 'Ejderha Kitabı' diye anılan Aho ve Ullman'ın 1977 tarihli kitabıdır.",
      "Asıl derin fikir şudur: program bir veridir ve onu işleyen de bir programdır. Bu yüzden derleyiciyi kendi dilinde yazabilir, hatta önce basit bir sürümüyle derleyip sonra onunla kendisini derleyebilirsin; buna <strong>kendi kendini yetiştirme</strong> (bootstrapping) denir ve GCC, Rust, Go derleyicileri böyle doğdu. 1971'de Yoshihiko Futamura daha şaşırtıcı bir şey gösterdi: bir yorumlayıcıyı belirli bir programa göre 'özelleştirirsen' elinde o programın derlenmiş hâli kalır; yorumlayıcı ile derleyici arasında kuramsal bir eşitlik vardır. Thompson'ın derleyici içindeki tuzağı da aynı özyinelemeden beslenir. Üniversitede derleyici dersi, bu yüzden, bilgisayar biliminin neredeyse her alanının buluştuğu derstir.",
    ],
    topics: ["Biçimsel diller ve otomatlar", "LL ve LR ayrıştırma", "Tür sistemleri", "SSA ve veri akışı analizi", "Yazmaç ataması ve çizge boyama", "JIT ve çalışma anı sistemleri", "LLVM altyapısı"],
  },
  quiz: [
    {
      question: "<code>2 + 3 * 4</code> ifadesinin soyut sözdizimi ağacında kökteki düğüm hangisidir?",
      options: ["* işlemi, çünkü önce o yapılır", "+ işlemi, çünkü en son o yapılır", "2 sayısı, çünkü ilk tokendır", "Parantez düğümü"],
      answer: 1,
      explanation: "Kök en son yapılan işlemdir; ilk hesaplanan şey en derindedir. Çarpma gramerde daha alt katmanda olduğu için ağaçta da aşağıdadır. Parantez hiçbir zaman düğüm olmaz.",
    },
    {
      question: "Kaynak koda uzun bir yorum satırı eklersen derlenmiş programın çalışma hızı ne olur?",
      options: ["Yavaşlar, çünkü her çalıştırmada yorum okunur", "Hızlanır, çünkü kod daha anlaşılırdır", "Değişmez, çünkü lexer yorumu atar ve sonraki aşamalar onu hiç görmez", "Yalnızca yorumlayıcıda yavaşlar, derleyicide değişmez"],
      answer: 2,
      explanation: "Yorumlar leksik analizde silinir; token bile üretmezler. Derleyici de yorumlayıcı da yorumları çalışma anına taşımaz; sayfada yorum ekleyince token sayısının 29'da kalması bunu gösterir.",
    },
    {
      question: "Bir web sayfasındaki döngü saniyede binlerce kez dönüyor. JIT'li bir JavaScript motoru bu döngüyü nasıl ele alır?",
      options: ["Her seferinde baştan yorumlar", "Sayfa yüklenmeden önce tüm kodu makine koduna derler", "Önce yorumlar, döngünün sık çalıştığını fark edince o parçayı çalışma anında makine koduna derler", "Döngüyü atlar"],
      answer: 2,
      explanation: "JIT'in özü budur: yorumlayarak başla, sayaç tut, eşiği aşan 'sıcak' kodu derle. Bu sırada gözlenen gerçek türlere göre özelleşmiş kod üretir; varsayım bozulursa yorumlayıcıya geri döner.",
    },
  ],
  next: [
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Lexer'ın arkasındaki sonlu otomat ve parser'ın arkasındaki bağlamdan bağımsız gramer; Chomsky merdivenini DFA simülatöründe kendin çalıştır." },
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "Kod üretimi aşamasının vardığı yer: aynı C işlevinin assembly ve makine kodu karşılığını yan yana gör." },
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi", why: "McCarthy'nin eval'ı ve 'program da bir veridir' fikrinin kuramsal kökü: evrensel makine ve lambda hesabı." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "AST bir ağaçtır, sembol tablosu bir hash tablosudur; derleyicinin kullandığı yapıları temelden öğren." },
  ],
  sources: [
    { title: "Wikipedia · Compiler", url: "https://en.wikipedia.org/wiki/Compiler", note: "Derleyicinin tarihi (Hopper, FORTRAN), aşamaları ve türleri; kaynakçası geniş (İngilizce)." },
    { title: "Python belgeleri · dis — bytecode çözümleyici", url: "https://docs.python.org/3/library/dis.html", note: "Sayfadaki sabit katlama deneyini kendi bilgisayarında doğrulamak için; CPython'un ürettiği bytecode'u gösterir." },
    { title: "MIT OpenCourseWare · 6.035 Computer Language Engineering", url: "https://ocw.mit.edu/courses/6-035-computer-language-engineering-spring-2010/", note: "Üniversite düzeyinde derleyici dersi: lexer'dan kod üretimine ders notları ve ödevler (İngilizce)." },
    { title: "Vikipedi · Derleyici", url: "https://tr.wikipedia.org/wiki/Derleyici", note: "Türkçe terimler ve genel bakış; sayfadaki İngilizce terimlerin karşılıkları için." },
  ],
  revision: "Ekim 2026",
};
