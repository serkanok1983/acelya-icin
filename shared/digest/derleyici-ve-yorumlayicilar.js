window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["derleyici-ve-yorumlayicilar"] = {
  slug: "derleyici-ve-yorumlayicilar",
  title: "Derleyici ve Yorumlayıcı: Kodun Makineye Yolculuğu",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 45,
  tagline: "Küçük bir dilde yazdığın program gözünün önünde tokenlara, ağaca, ara koda ve bytecode'a dönüşür; dört ayrı yürütücü aynı sonucu bulup bulmadığını komut komut sayarak gösterir.",
  hook: "1952'de Grace Hopper, bilgisayarın kendi programını yazmasını sağlayan bir yazılım yaptı ve adına 'compiler' dedi. Kendi anlatımına göre kimse ona elini sürmedi: bilgisayarlar yalnızca aritmetik yapabilirdi, program yazamazdı. Bugün telefonundaki her uygulama o fikrin torunu. Peki <code>x = a + b * 3</code> yazdığında makine çarpmayı toplamadan önce yapacağını nereden biliyor?",
  bigIdea: "Program bir metindir; derleyici o metni önce <strong>tokenlara</strong>, sonra bir <strong>ağaca</strong>, sonra makine komutlarına çevirir ve bu çeviriyi bir kez yapar. Yorumlayıcı aynı yolu her çalıştırmada baştan yürür; JIT ise ikisini birleştirir: önce yorumla, sık çalışan kısmı derle.",
  story: [
    "1950'lerin başında programlamak, işlemcinin her komutunu sayı olarak elle yazmak demekti. Grace Hopper 1952'de UNIVAC için <strong>A-0</strong> adını verdiği sistemi yaptı: hazır alt programları bir araya toplayıp (İngilizce <em>compile</em>, 'derlemek') çalışır bir program üreten bir yazılım. Bugünkü anlamda derleyiciden çok bir yükleyici-bağlayıcıydı ama adı kaldı. Asıl kırılma 1954–1957 arasında IBM'de yaşandı: John Backus'ın ekibi, matematik formüllerine benzeyen bir dili, <strong>FORTRAN</strong>'ı, IBM 704 için makine koduna çeviren derleyiciyi Nisan 1957'de teslim etti. Daha dar kapsamlı öncüleri vardı (Manchester'da Alick Glennie'nin 1952 tarihli Autocode'u gibi), ama genellikle ilk eksiksiz ve ilk iyileştirme yapan derleyici sayılan odur. Dönemin programcıları alaycıydı; makinenin ürettiği kodun elle yazılmış koddan yavaş olacağına kesin gözüyle bakılıyordu. Backus ekibinin asıl emeği bu yüzden çeviriye değil, <em>iyileştirmeye</em> gitti: Backus'ın kendi anlatımına göre derleyici, programın hangi bölümünün ne sıklıkta çalışacağını kestirmek için akışın rastgele sayılarla bir benzetimini bile yapıyor, az sayıdaki indis yazmacını buna göre paylaştırıyordu. Çıkan kod, deneyimli programcıların elle yazdığıyla yarışıyordu; FORTRAN'ın tutmasının nedeni buydu.",
    "Yorumlayıcının doğuşu daha garip bir hikâyedir. John McCarthy 1958'de MIT'de LISP dilini tasarlamaya başladı; dili anlatan makalesini yazarken, bir LISP programını girdi olarak alıp çalıştıran <code>eval</code> adlı bir işlevi kâğıt üzerinde, kuramsal bir egzersiz olarak yazdı. McCarthy'nin anlatımına göre ekibindeki programcı Steve Russell bunu IBM 704'ün makine diline çevirmeyi önerdiğinde ona 'kuramla uygulamayı karıştırıyorsun' demişti; Russell yine de yaptı ve ortaya ilk LISP yorumlayıcısı çıktı. Kodu çalıştırmak için önce makine koduna çevirmek gerekmiyordu; programı okuyup anında uygulayan bir program yetiyordu. Bu gelenek 'yaz, hemen dene' fikrinin taşıyıcısı oldu: 1975'te Bill Gates, Paul Allen ve Monte Davidoff'un Altair için 4 kilobaytlık belleğe sığdırdığı BASIC yorumlayıcısı, 1991'de Guido van Rossum'un Python'ı. (Bir ayrıntı: BASIC'in 1964'te Dartmouth'ta Kemeny ve Kurtz'un elinden çıkan ilk sürümü yorumlayıcı değil, hızlı bir derleyiciydi; dil ile onu çalıştırma yöntemi baştan beri ayrı şeylerdi.)",
    "İki dünya 1990'larda birleşti. Java (1995) kaynak kodu önce platformdan bağımsız bir <strong>bytecode</strong>'a derliyor, sonra bu ara kodu bir sanal makinede çalıştırıyordu; 1999'da gelen HotSpot motoru sık çalışan bölümleri çalışma anında makine koduna derledi. Bu yönteme <strong>JIT</strong> (tam zamanında derleme) denir; fikir daha eskidir, bugünkü biçimini ise 1980'lerin Smalltalk ve Self araştırmalarında almıştır. 2008'de Google'ın Chrome'la birlikte çıkardığı V8 motoru aynı fikri JavaScript'e uyguladı ve tarayıcı, yavaş bir betik yorumlayıcısından ciddi bir çalışma ortamına dönüştü. Tesadüf değil: Self üzerinde çalışmış olan Danimarkalı mühendis Lars Bak hem HotSpot'un hem V8'in baş mimarlarındandı. Bu arada derleyici altyapısının kendisi de ortak bir mala dönüştü: Richard Stallman'ın 1987'de yayımladığı GCC ile Chris Lattner'ın 2000'de Illinois Üniversitesi'nde, Vikram Adve'nin yanında başlattığı LLVM, bugün C'den Rust'a, Swift'ten Fortran'a onlarca dilin arkasındaki ortak motorlardır. Sayfadaki küçük derleme hattı bu motorların iç yapısının oyuncak ölçekli bir kopyasıdır: aşamalar aynı, sıra aynı; yalnızca dil küçük, hedef de gerçek bir işlemci değil, sayfanın kendi öğretim makinesi."
  ],
  core: [
    {
      heading: "Token: harflerden anlamlı parçalara",
      body: "Lexer kaynak metni soldan sağa tek geçişte okur ve karakterleri sözcük benzeri parçalara, <strong>token</strong>lara ayırır. Sayfanın küçük dilinde beş tür vardır: sayı, ad, anahtar sözcük, işleç, ayraç. Boşluklar, satır sonları ve <code>#</code> ile başlayan yorumlar bu aşamada atılır; sonraki hiçbir aşama onları görmez. Belirsizliği iki kural çözer. İlki <strong>en uzun eşleşme</strong>dir (maximal munch): lexer her konumda alabileceği en uzun parçayı alır. Bu yüzden <code>&lt;=</code> tek işleçtir, <code>ifade</code> de tek bir addır; <code>if</code> ile <code>ade</code> değil. C'de <code>i+++j</code> yazımının <code>i ++ + j</code> diye bölünmesi aynı kuralın sonucudur. İkincisi anahtar sözcük önceliğidir: tam olarak <code>print</code> yazan parça ad değil anahtar sözcüktür, <code>Print</code> ise sıradan bir addır. Hatalar da aynı mantıkla sınıflanır: rakamla başlayıp harf ya da noktayla süren öbek (<code>10e5</code>, <code>1.2.3</code>) bütün hâlinde tek bir hatalı sayıdır; sessizce <code>10</code> ve <code>e5</code> diye ikiye bölünmez. Her token türü bir <strong>düzenli ifadeyle</strong> tanımlanabildiği için lexer aslında bir sonlu otomattır: saymaz, hatırlamaz, yalnızca hangi durumda olduğunu bilir. <code>) ( ; ;</code> onun için kusursuz dört tokendır; yanlışlığını bulmak bir sonraki aşamanın işidir.",
      formula: "SAYI = rakam { rakam },   AD = harf { harf | rakam },   token = (tür, metin, satır:sütun)",
      formulaNote: "Sayfanın sözcük kuralları. Harf, herhangi bir Unicode harfi ya da alt çizgidir; <code>sayı</code> geçerli bir addır. Sayının metni ile değeri ayrı tutulur: metin 007, değer 7."
    },
    {
      heading: "Gramer ve ağaç: öncelik nereden gelir?",
      body: "Token dizisi düzdür; anlam ise iç içedir. <strong>Ayrıştırıcı</strong> (parser) tokenları dilin <strong>gramerine</strong> göre bir ağaca dizer. İlk akla gelen gramer işe yaramaz: <em>ifade → ifade + ifade | ifade * ifade | sayı</em> kuralıyla <code>2 + 3 * 4</code> iki ayrı ağaca açılır; birinde sonuç 14, ötekinde 20'dir. Böyle gramere <strong>belirsiz</strong> denir. Çare grameri katlara ayırmaktır: 'toplam' çarpımlardan, 'çarpım' tekli ifadelerden kurulur; en altta bir sayı, bir ad ya da parantez içinde yeniden başlayan bir ifade durur. Artık tek bir ağaç mümkündür ve çarpma kendiliğinden alt kata iner. Öncelik makineye ayrıca öğretilmiş bir kural değil, gramerin biçiminin sonucudur. Birleşme yönü de oradan gelir: tekrar soldan sağa biriktiği için <code>a - b - c</code>, (a − b) − c diye okunur. Sayfanın ayrıştırıcısı her kural için bir işlev yazar (<strong>özyinelemeli iniş</strong>), ikili işleçleri de tek bir döngüde bağlama güçlerini karşılaştırarak toplar. Bunu sınamanın yolu kuralı bozmaktır: 02 sekmesindeki 'Ayrıştırma kuralı' menüsü aynı tokenları önceliksiz ya da sağa birleşen bir kuralla yeniden ağaca dizer ve çıktının değiştiğini gösterir. Parantez, noktalı virgül ve atamanın <code>=</code> işareti ağaca girmez; işlerini ağacın biçimi görür.",
      formula: "toplam = çarpım { (\"+\" | \"-\") çarpım },   çarpım = tekli { (\"*\" | \"/\" | \"%\") tekli },   tekli = \"-\" tekli | birincil,   birincil = SAYI | AD | \"(\" ifade \")\"",
      formulaNote: "Kural yazımının kökü BNF'tir (Backus–Naur biçimi): John Backus 1959'da ALGOL'ü tanımlamak için önerdi, Peter Naur ALGOL 60 raporunda kullanıp yaygınlaştırdı. 'Sıfır ya da daha çok kez' diyen süslü parantez, sonradan eklenen genişletilmiş biçimden (EBNF) gelir. Ders kitapları aynı dili çoğu zaman <code>toplam → toplam + çarpım | çarpım</code> diye sol özyinelemeli yazar; özyinelemeli iniş bu kuralı olduğu gibi uygularsa kendini sonsuza dek çağırır, tekrarlı biçim o yüzden bir döngüye çevrilmiş hâlidir."
    },
    {
      heading: "Ağaçtan koda: anlam denetimi ve iki ara biçim",
      body: "Gramere uyan her program anlamlı değildir. <strong>Anlam denetimi</strong> ağacı gezer ve söz dizimiyle anlatılamayan kuralları sınar. Sayfanın dilinde tek kural vardır: bir değişken, okunduğu noktaya varan <em>her yoldan</em> önce değer almış olmalıdır (kesin atama). Denetim koşulların değerine bakmaz; <code>if (1) { x = 1; } print x;</code> bu yüzden reddedilir. Gerçek dillerde aynı aşama türleri ve kapsamları da bir <strong>sembol tablosunda</strong> izler. Denetimden geçen ağaç iki ara biçime çevrilir. <strong>Üç adresli kodda</strong> her satırda en çok bir işleç ve üç ad bulunur; ara sonuçlar geçici adlarda durur: <code>t1 = 3 * 4</code>, <code>x = 2 + t1</code>. LLVM'in ara dili bu ailedendir; iyileştirmeler böyle bir katta yapılır, çünkü aynı dönüşüm bir kez yazılır, her dil ve her işlemci için geçerli olur. <strong>Yığın makinesi kodunda</strong> ad yoktur: ağaç 'önce çocuklar, sonra düğümün kendisi' sırasıyla düzleştirilir; her yaprak yığına bir değer koyar, her işleç tepedeki iki değeri alıp sonucu geri koyar. Java bytecode'u, .NET'in CIL'i ve CPython'un bytecode'u böyle yığın tabanlı ara biçimlerdir, üç adresli kod değil. Düzleştirme o kadar mekaniktir ki komut sayısı ağaca bakarak önceden söylenebilir.",
      formula: "bytecode komutu = yaprak + işleç + atama + print + if + else'li if + 2 · while + 1",
      formulaNote: "Her yaprak bir PUSH ya da LOAD, her işleç bir komut, her atama bir STORE üretir; if bir JZ, else bir JMP, while bir JZ ile bir JMP ekler; sondaki 1, HALT'tır. Varsayılan örnekte 7 + 4 + 1 + 2 + 0 + 0 + 0 + 1 = 15. Bu komut kümesi ve onaltılık kodlaması sayfanın öğretim makinesine özgüdür; gerçek bir sanal makinenin biçimi değildir."
    },
    {
      heading: "İyileştirme: anlamı değiştirmeden, işi azaltmak",
      body: "Optimizasyonun tek yasası <em>sanki</em> kuralıdır: program, hiç dokunulmamış gibi davrandığı sürece derleyici her şeyi değiştirebilir. En basit örnek <strong>sabit katlama</strong>: <code>gun = 60 * 60 * 24</code> satırındaki iki çarpmayı derleyici kendisi yapar ve 86400 yazar. Python'da da görebilirsin: <code>dis</code> modülünün <code>y = 2 + 3 * 4</code> için döktüğü bytecode'da ne toplama ne çarpma vardır; CPython işlemi derlerken yapmış, geriye yalnızca 14 sabitini yükleyen tek bir komut bırakmıştır (komutun adı sürüme göre değişir; 3.11'de <code>LOAD_CONST</code>). Sayfanın iyileştiricisi iki dönüşüm daha yapar: <strong>cebirsel sadeleştirme</strong> (x * 1 ve x + 0 yerine x) ve <strong>ölü kod eleme</strong> (koşulu sabit olan if'in çalışmayacak dalı, <code>while (0)</code> döngüsü). Üçü birbirini besler: <code>2 &gt; 3</code> koşulunu 0'a çeviren katlamadır, o dalı atan elemedir. Yasanın sınırları daha öğreticidir. <code>1 / 0</code> katlanmaz, çünkü hata derleme anına taşınamaz: program o satıra hiç varmayabilir. İçinde sıfıra bölebilecek bir işlem bulunan x için x * 0 da 0 yapılmaz; yapılsaydı o hata sessizce kaybolurdu. Kayan noktalı sayılarda (a + b) + c ile a + (b + c) aynı sonucu vermeyebilir; gerçek derleyiciler bu yüzden özel izin almadan toplamaların sırasını değiştiremez.",
      formula: "60 * 60 * 24  ⟶  86400     x * 1 + 0  ⟶  x     if (0) { A } else { B }  ⟶  B",
      formulaNote: "Üç dönüşüm ağaç üzerinde yapılır; üç adresli kod ve bytecode iyileştirilmiş ağaçtan yeniden üretilir. Katlama makinenin 32 bit sarmalı aritmetiğini aynen kullanır, yoksa derleme anındaki sonuç çalışma anındakinden farklı çıkabilirdi."
    },
    {
      heading: "Derleyici, yorumlayıcı, JIT: bir maliyet hesabı",
      body: "Çevirinin bedeli bir kez ödenir; kazanç her çalıştırmada alınır. Bir programı N kez çalıştıracaksan iki yolun toplam işi iki doğrudur: çevirisiz yol sıfırdan başlar ama dik çıkar, çevirili yol yukarıdan başlar ama yatık ilerler; sınırı kesişim noktası verir. Sayfa bu hesabı kendi ölçüleriyle yapar: iyileştiricinin gezdiği her düğümü ve makinenin yürüttüğü her komutu 1 iş birimi sayar. Varsayılan örnekte iyileştirici 15 düğüm gezer, ham kod 15, iyileştirilmiş kod 7 komut yürütür; iyileştirme ikinci çalıştırmada kendini öder. Faktöriyel döngüsünde katlanacak sabit yoktur: bedel ödenir, hiç geri dönmez. Bu bir sayım modelidir, süre ölçümü değil; gerçek işlemcide komutların bedeli eşit değildir, ama dengenin biçimi aynıdır. Önceden derleyen bir derleyici bu kararı baştan, her şey için verir; yorumlayıcı hiç vermez. <strong>JIT</strong> arasını bulur: kodu yorumlarken sayar, bir döngü eşiği aşınca yalnızca o parçayı çalışma anında makine koduna çevirir. Sayfadaki 'Komut başına yürütülme sayısı' grafiği bu sayaçları çizer. JIT ayrıca çalışırken gördüğüne güvenir: <code>x</code> bu döngüde hep tam sayıysa o varsayımla hızlı kod üretir, varsayım bozulursa yorumlayıcıya döner. V8 ve HotSpot'un hızı bu kumardan gelir.",
      formula: "W<sub>ham</sub>(N) = N · s<sub>0</sub>,   W<sub>iyi</sub>(N) = v + N · s<sub>1</sub>   ⟹   kârlı ilk N = ⌊v / (s<sub>0</sub> − s<sub>1</sub>)⌋ + 1",
      formulaNote: "v: iyileştiricinin gezdiği düğüm sayısı; s₀ ve s₁: ham ve iyileştirilmiş kodun bir çalıştırmada yürüttüğü komut sayısı. Varsayılan örnekte ⌊15 / (15 − 7)⌋ + 1 = 2; N = 100 için sayfa 'ham 1.500 · iyileştirilmiş 715' yazar (15 + 100 · 7 = 715)."
    }
  ],
  lab: {
    intro: "Sayfanın üstünde ortak bir düzenleyici var: <strong>Kaynak program</strong> kutusuna 'Mini' adlı küçük bir dilde program yazarsın (tam sayılar, + - * / %, karşılaştırmalar, değişken, atama, if / else, while, print; her atama ve print noktalı virgülle biter, <code>#</code> yorum başlatır) ya da <strong>Hazır program</strong> menüsünden on bir örnekten birini yüklersin. Bütün değerler 32 bit işaretli tam sayıdır: taşma hata vermez, sarar (2147483647 + 1 = -2147483648); bölme sıfıra doğru yuvarlar (-7 / 2 = -3), kalanın işareti bölünenle aynıdır (-7 % 2 = -1); sıfıra bölme çalışma hatasıdır. Yanındaki derleme hattı beş aşamanın durumunu gösterir; varsayılan örnekte '20 token', '15 düğüm', '1 değişken', '15 → 7 komut', '2 çıktı' yazar ve hata olursa takılan aşama kırmızıya döner, sonrakiler 'bekliyor' der. Dört sekme aynı metni dört açıdan gösterir: <strong>01 · Sözcük çözümleme</strong>, <strong>02 · Ayrıştırma</strong>, <strong>03 · Kod üretimi ve iyileştirme</strong>, <strong>04 · Yürütme</strong>. Hiçbir ağaç ya da liste hazır değildir; hepsi o an yazılı metinden hesaplanır. Sayımlar Türkçe biçimde (1.500, %53,3), programın çıktıları ise makinenin yazdığı gibi ayırıcısız gösterilir. Sınırları bil: sayfa makine kodu üretmez, JIT içermez; bytecode ve onaltılık baytları sayfanın kendi öğretim makinesine aittir ve dört yürütücünün hepsi tarayıcıda çalışan yorumlayıcılardır. Ölçülen şey süre değil, komut sayısıdır.",
    experiments: [
      {
        title: "Lexer neyi tek parça sayar?",
        predict: "<strong>Hatalı: sözcük hataları</strong> örneğinde dört satır var: <code>x = 3 $ 4;</code>, <code>y = 1.2.3;</code>, <code>z = 10e5;</code>, <code>c = 'a';</code>. Lexer kaç hata bildirir? <code>1.2.3</code> bir hata mıdır, iki mi? Sonra şunu kestir: <code>&lt;=</code> yazarken araya bir boşluk kaçarsa bunu lexer mı yakalar, ayrıştırıcı mı?",
        do: "<strong>Hazır program</strong> menüsünden bu örneği seç ve <strong>01 · Sözcük çözümleme</strong> sekmesinde 'Sözcük hatası' kartını, token tablosunu ve yukarıdaki derleme hattını oku. Ardından kutudaki metni silip iki satır yaz: <code>sayı = 007;</code> ve altına <code>print sayı &lt;= 7;</code>. Son olarak <code>&lt;</code> ile <code>=</code> arasına bir boşluk koy.",
        observe: "Beş hata çıkar: 1:7 ($), 2:5 (1.2.3 tek parça), 3:5 (10e5 tek parça), 4:5 ve 4:7 (iki tırnak ayrı ayrı). Derleme hattının ilk satırı kırmızıyla '5 hata' der, öbür dördü 'bekliyor'. İki satırlık programda '9 token' okunur, hata yoktur; tabloda 007'nin 'Değer' sütununda 7 yazar, <code>&lt;=</code> tek satırdır ve program 1 yazdırır. Boşluğu koyunca token sayısı 10 olur, sözcük hatası yine 0'dır; ama durum satırı 'Söz dizimi hatası (2:14)' der: 'Beklenen: sayı, ad ya da “(” · bulunan: “=”'.",
        explain: "Lexer her konumda en uzun parçayı alır; rakamdan hemen sonra harf ya da nokta gelirse bütün öbeği tek bir hatalı sayı sayar, böylece <code>10e5</code> sessizce bir sayı ile bir ada bölünmez. Tırnak dilin alfabesinde yoktur, o yüzden her biri ayrı hatadır. Lexer hatada durmaz, ama tek bir sözcük hatası bile ayrıştırmayı başlatmaz. Boşluklu <code>&lt; =</code> ise iki kusursuz tokendır: lexer sözcüklere bakar, sıralarına bakmaz; karşılaştırmadan sonra işlenen bekleyen ayrıştırıcı <code>=</code> görünce durur. <code>sayı</code> adının geçmesi bir tasarım kararıdır: ad kuralı bütün Unicode harflerine açıktır."
      },
      {
        title: "Aynı tokenlar, üç ayrı ağaç",
        predict: "<strong>Birleşme: a - b - c</strong> örneğinde a = 10, b = 4, c = 3. <code>print a - b - c;</code> 3 mü yazar, 9 mu? Çıkarma sağdan birleşseydi ne olurdu? Kural değişince ağacın düğüm sayısı da değişir mi?",
        do: "Örneği yükle, <strong>02 · Ayrıştırma</strong> sekmesine geç. 'Aynı tokenlar, üç ayrı kural' tablosunu ve 'Düğüm sayısı' kartını oku. <strong>Ayrıştırma kuralı</strong> menüsünü önce 'Sağa birleşen: * / % önce', sonra 'Önceliksiz: beş işleç eşit, sola birleşir' yap ve ağacın nasıl yattığına bak. Ardından <strong>Öncelik: 2 + 3 * 4</strong> örneğini yükleyip aynı tabloyu yeniden oku.",
        observe: "Standart kuralda okuma '(a - b) - c · a - (b - c)', çıktı 3, 9'dur. Sağa birleşen kuralda ilk ifade de a - (b - c) diye okunur ve çıktı 9, 9 olur; önceliksiz kural burada standartla aynı sonucu verir (3, 9). Düğüm sayısı üç kuralda da '19 · 19', yükseklik '4 kenar' kalır; değişen yalnızca dalların yönüdür. Öncelik örneğinde durum tersine döner: standart ve sağa birleşen 14, 20 verirken önceliksiz kural 20, 20 yazar, çünkü <code>2 + 3 * 4</code>'ü (2 + 3) * 4 diye okur.",
        explain: "Üç kural da aynı 28 tokenı görür; fark, gramerin onları bir araya getirme sırasındadır. Standart gramerde tekrar soldan sağa biriktiği için çıkarma sola yatar: 10 − 4 − 3 = 3. Sağa yatan ağaç 10 − (4 − 3) = 9 hesaplar. Önceliksiz kural birleşme yönünü koruduğu için çıkarmada zarar vermez; zararı çarpma ile toplamanın yan yana geldiği yerde görünür. Düğüm sayısının değişmemesi de bir ipucudur: 'kuram' değeri ağaca bakmadan, yalnızca tokenlar sayılarak bulunur. Biçim değişir, malzeme değişmez. Öncelik ve birleşme tokenlarda yazılı değildir; anlamın gramerde saklı parçasıdır."
      },
      {
        title: "Üç iyileştirme: tek tek ve birlikte",
        predict: "<strong>İyileştirilecek program</strong> on bir satırdır ve ham bytecode'u 31 komuttur. İçinde <code>60 * 60 * 24</code>, <code>x * 1 + 0</code>, koşulu <code>2 &gt; 3</code> olan bir if ve bir <code>while (0)</code> var. Yalnızca 'Ölü kod eleme' açıkken if'in hiç çalışmayacak dalı atılır mı? Üç kutu birlikte 31 komutu kaça indirir?",
        do: "Örneği yükle, <strong>03 · Kod üretimi ve iyileştirme</strong> sekmesine geç. Üç onay kutusunu da kapat; sonra sırayla yalnızca <strong>Ölü kod eleme</strong>'yi, ardından <strong>Sabit katlama</strong>'yı, en son <strong>Cebirsel sadeleştirme</strong>'yi aç. Her adımda 'Bytecode' kartını ve 'Uygulanan dönüşümler' tablosunu oku; üçü de açıkken tablonun altındaki 'İyileştirilmiş ağacın kaynak karşılığı' başlığına tıklayıp aç. Sonra kutudaki metni şu üç satırla değiştir: <code>a = 0;</code>, <code>x = (1 / a) * 0;</code>, <code>print 1 / 0;</code>.",
        observe: "Kutular kapalıyken '31 → 31 komut'. Yalnızca ölü kod eleme: '31 → 26'; atılan tek şey <code>while (0)</code> döngüsüdür. Sabit katlama eklenince '31 → 15'. Üçü birlikte '31 → 11 komut' (%64,5 azalma), üç adresli kod '14 → 5 komut', kodlanmış boyut '89 → 25 bayt'; durum satırı '7 dönüşüm uygulandı' der, açtığın başlığın altındaki kaynak dört satıra iner: <code>gun = 86400; x = 7; y = x; print y + gun;</code>. Çıktı hep 86407'dir, kart 'Aynı sonuç' yazar. Üç satırlık programda hiçbir dönüşüm uygulanmaz; iki sürüm de 2:8 konumunda 'Sıfıra bölme' ile durur.",
        explain: "Ölü kod eleme yalnızca değeri derleme anında bilinen koşullara bakar. <code>while (0)</code> zaten sabittir; <code>2 &gt; 3</code> ise bir işlemdir ve onu 0'a çeviren sabit katlamadır. Bu yüzden iki kutu birlikte 16 komut kazandırır; ayrı ayrı kazandırdıklarının toplamı 5 + 6 = 11'dir. Sonuçta <code>y = x</code> kalması da öğreticidir: x yerine 7 koymak (sabit yayma) bu sayfanın yapmadığı bir iştir. Üç satırlık program güvenlik koşulunu gösterir: <code>(1 / a) * 0</code> 0 yapılmaz, <code>1 / 0</code> katlanmaz, çünkü ikisi de gözlenen davranışı, yani hatayı değiştirirdi. Bayt sayıları sayfanın öğretim makinesinin kodlamasına aittir."
      },
      {
        title: "Dört yürütücü ve sayaçlar",
        predict: "<strong>Faktöriyel döngüsü</strong> n = 5 için 120 yazar. Yığın makinesi bunun için kaç komut yürütür: 20 mi (kodun uzunluğu), daha mı çok? İlk satırı <code>n = 6;</code> yaparsan sayı kaç artar? İyileştirme bu programa bir şey kazandırır mı? <strong>Bitmeyen döngü</strong> örneğinde sayfa döngünün sonsuz olduğunu söyleyebilir mi?",
        do: "Faktöriyel örneğini yükle, <strong>04 · Yürütme</strong> sekmesine geç. 'Aynı program, dört yürütücü' tablosunu ve 'Yürütülen komut', 'Yığın derinliği', 'İyileştirmenin kazancı' kartlarını oku. <strong>Adım</strong> ile birkaç komutu izle, <strong>Sona git</strong>'e basıp 'Komut başına yürütülme sayısı' grafiğine bak. Kaynakta 5'i önce 6, sonra 10, sonra 13 yap. En son 'Bitmeyen döngü' örneğini yükle.",
        observe: "Dört yürütücü de 120 yazar: yorumlayıcı 63 değerlendirme, iki yığın makinesi 63'er, üç adresli kod 25 komut. Kartlar: '63 · 63 komut', yığın '2 · 2', kazanç '63 → 63 komut', 'kazanç yok'; N = 100 için 'ham 6.300 · iyileştirilmiş 6.320'. Grafikte 4–16 adreslerinin sütunları yükselir; tablonun 'Kaç kez' sütununa göre 4–7 (koşul) 5'er, 8–16 (gövde ve geri atlama) 4'er kez çalışmıştır. n = 6 için 76, n = 10 için 128 komut ve çıktı 3628800; n = 13'te çıktı 1932053504. Bitmeyen döngüde dört satır da 'adım sınırı (100.000) aşıldı' yazar, kart 'Sınır içinde uyumlu' der.",
        explain: "Kod 20 komuttur ama döngü her turda 13 komut yürütür (koşul 4, gövde 8, geri atlama 1); toplam 13n − 2 olur. Ölçülen ile kuramın tutması tesadüf değildir: kuram sütunu makineye bakmaz, yorumlayıcının sayaçlarından gelir. İyileştirici 20 düğüm gezer, katlayacak sabit bulamaz: 6.320 − 6.300 = 20 geri dönmeyen bedeldir. 13! = 6.227.020.800 işaretli 32 bite sığmaz; makine hata vermez, sarar ve geriye 6.227.020.800 − 2<sup>32</sup> = 1.932.053.504 kalır. Sınırın aşılması döngünün sonsuz olduğunun kanıtı değildir; bunu genel olarak hiçbir program kanıtlayamaz (durma problemi)."
      }
    ]
  },
  wow: [
    {
      title: "Rastgele programlarla derleyici avı",
      body: "Sayfadaki 'Dördü de aynı sonucu verdi' kartının fikri gerçek derleyicileri de sınar: aynı programı birkaç derleyiciye ver, çıktılar ayrışıyorsa en az biri hatalıdır. Utah Üniversitesi'nden Yang, Chen, Eide ve Regehr bunun için rastgele C programı üreten Csmith'i yazdı; 2011'de yayımladıkları çalışmaya göre araç, aralarında GCC ve LLVM'in de bulunduğu derleyicilerde o güne dek bilinmeyen 325'ten fazla hata buldu. İstisna dikkat çekiciydi: Xavier Leroy'nın doğruluğu ispat yardımcısı Coq ile kanıtlanmış derleyicisi CompCert'in kanıtlanmış bölümlerinde yanlış kod üreten hata çıkmadı; bulunanlar ispatın kapsamadığı kısımlardaydı."
    },
    {
      title: "Kaynak kodu temiz, derleyici hain",
      body: "Unix'in yaratıcılarından Ken Thompson, 1983 Turing Ödülü konuşmasında ürkütücü bir numara anlattı: C derleyicisine iki ek yapılır. Biri 'login' programını derlerken içine gizli bir parola yerleştirir; öteki, derleyici kendi kaynak kodunu derlerken bu iki eki yeniden üretir. Ekler derleyicinin kaynak kodundan silinse bile derlenmiş derleyici hileyi kuşaktan kuşağa taşır. 1984'te yayımlanan 'Reflections on Trusting Trust' metninin dersi bugün de geçerli: kendin yazmadığın bir derleyiciye güveniyorsan, kaynak kodu okumak yetmez."
    },
    {
      title: "Hiç görmedikleri makine için 4 kilobayt",
      body: "1975'in başında Bill Gates, Paul Allen ve Monte Davidoff, hiç görmedikleri Altair 8800 için bir BASIC yorumlayıcısı yazdı. Allen, Harvard'ın PDP-10'unda Intel 8080 işlemcisini taklit eden bir benzetim programı yazdı; yorumlayıcı o sanal makinede geliştirildi ve 4 kilobaytlık belleğe sığdırıldı. Anlatılana göre Allen, Albuquerque'ye uçarken yükleyici programı yazmayı unuttuğunu fark edip onu uçakta yazdı; kâğıt şeritteki yorumlayıcı gerçek makinede ilk denemede çalıştı. Microsoft'un ilk ürünü bir yorumlayıcıydı."
    }
  ],
  worked: {
    title: "Öklid algoritmasını elle derle ve say",
    prompt: "<strong>EBOB (Öklid algoritması)</strong> örneği şudur: <code>a = 1071; b = 462; while (b != 0) { t = a % b; a = b; b = t; } print a;</code>. Sayfayı açmadan bul: (a) ağaç kaç düğümdür, (b) ham bytecode kaç komut ve sayfanın öğretim makinesinin kodlamasıyla kaç bayt tutar, (c) program biterken makine kaç komut yürütmüş olur, (d) yığın en çok kaç göz derinleşir? Sonra örneği yükleyip her sayıyı denetle.",
    steps: [
      "<strong>Token ve düğüm.</strong> Programda 33 token var: 3 sayı, 11 ad, 2 anahtar sözcük (while, print), 7 işleç (beş <code>=</code>, bir <code>!=</code>, bir <code>%</code>) ve 10 ayraç. Düğüm sayısı ağaç kurulmadan sayılabilir: 1 (program) + 3 sayı + 11 ad + atama dışındaki 2 işleç + 2 (while, print) + 1 açılan süslü parantez = 20 düğüm. Sayfada 02 sekmesi '20 · 20' yazar.",
      "<strong>Bytecode.</strong> Ağacı sondan sıralı gez. Hazırlık 4 komut: PUSH 1071, STORE a, PUSH 462, STORE b. Koşul 4 komut (adres 4–7): LOAD b, PUSH 0, NE, JZ 17. Gövde 8 komut (adres 8–15): LOAD a, LOAD b, MOD, STORE t; LOAD b, STORE a; LOAD t, STORE b. Adres 16'da JMP 4; çıkışta LOAD a, PRINT, HALT. Toplam 4 + 4 + 8 + 1 + 3 = 20 komut. Kuramla sağlama: 9 yaprak (3 sayı, ifadelerde okunan 6 ad) + 2 işleç + 5 atama + 1 print + 2 · 1 while + 1 HALT = 20.",
      "<strong>Bayt.</strong> Öğretim makinesinde her komut 1 bayt işlem koduyla başlar; PUSH 4, LOAD ve STORE 1, JMP ve JZ 2 bayt işlenen taşır. 3 PUSH × 5 = 15, 6 LOAD × 2 = 12, 5 STORE × 2 = 10, işlenensiz 4 komut (NE, MOD, PRINT, HALT) = 4, iki atlama × 3 = 6; toplam 47 bayt. Sabitler küçük uçlu yazılır: 1071 = 0x0000042F olduğundan ilk komutun baytları <code>01 2F 04 00 00</code>; JZ 17 ise <code>11 11 00</code>'dır (işlem kodu 0x11, hedef 17 = 0x11).",
      "<strong>Yürütülen komut.</strong> Döngü k kez dönerse koşul k + 1 kez sınanır: 4 + 4(k + 1) + 9k + 3 = 13k + 11. Öklid adımları 1071 mod 462 = 147, 462 mod 147 = 21, 147 mod 21 = 0; yani k = 3 ve toplam 13 · 3 + 11 = 50 komut, çıktı 21. 04 sekmesi '50 · 50 komut' yazar; notundaki döküm 23 yaprak + 7 işleç + 11 atama + 1 print + 4 sınama + 3 atlama + 1 bitiş = 50.",
      "<strong>Yığın.</strong> Her ifade en çok iki işlenenlidir ve sağ çocuk yapraktır: ikili düğüm için gereken yer en çok(sol, 1 + sağ) = en çok(1, 2) = 2 gözdür. Atama ve print tepeyi geri aldığı için deyimler arasında yığın boşalır; ölçülen ve üst sınır '2 · 2' çıkar."
    ],
    result: "20 düğüm, 20 komut, 47 bayt, 50 yürütülen komut, 2 yığın gözü. Ölçekleme de formülden okunur: aynı programı ardışık iki Fibonacci sayısıyla, a = 89 ve b = 55 ile çalıştırırsan Öklid algoritması 9 adım atar ve makine 13 · 9 + 11 = 128 komut yürütür; kodun uzunluğu yine 20 komuttur. Kodun boyutu programın metnine, yürütülen komut sayısı ise girdiye bağlıdır. Bu sayılar sayfanın öğretim makinesi içindir; gerçek bir işlemcide ya da başka bir sanal makinede komut kümesi ve bayt düzeni farklı olur."
  },
  misconceptions: [
    {
      myth: "Python yorumlanan bir dildir, C derlenen bir dildir; bu dilin kendi özelliğidir.",
      truth: "Derlenme ya da yorumlanma dilin değil, o dili çalıştıran programın özelliğidir. CPython kaynak kodu bytecode'a derler ve bu bytecode'u yorumlar; PyPy aynı Python kodunu JIT ile makine koduna çevirir; C için de yorumlayıcılar yazılmıştır. JavaScript 1995'te saf yorumlayıcıyla başladı; 2008'den beri yaygın motorların hepsi sık çalışan kodu JIT ile derler. Dil bir sözleşmedir, derleyici ve yorumlayıcı o sözleşmeyi uygulamanın iki yoludur."
    },
    {
      myth: "Parantezler ve noktalı virgüller ağaçta birer düğümdür.",
      truth: "Ağaç yalnızca anlam taşıyan parçaları tutar: deyimler, işleçler, sayılar, adlar. Parantezin tek görevi ayrıştırıcıya hangi dalın hangisinin altına gireceğini söylemektir; iş bitince ağaçta iz bırakmaz. (a + b) * c ve a + b * c farklı ağaçlardır ama ikisinde de parantez düğümü yoktur; sayfadaki 'Parantez' örneğinde iki ifade de aynı sayıda düğümle çizilir. 'Soyut' söz dizimi ağacındaki 'soyut' tam bu silmeyi anlatır."
    },
    {
      myth: "Derleyici hata vermediyse program doğrudur.",
      truth: "Derleyici yalnızca biçimsel kuralları denetler: tokenlar geçerli mi, gramer tutuyor mu, dilin anlam kuralları çiğnenmiş mi. Sayfadaki 'Çalışma hatası: sıfıra bölme' örneği beş aşamanın dördünden kusursuz geçer, 1 yazdırır ve ancak çalışırken, 4:9 konumunda durur; bölenin sıfır olduğu derleme anında bilinemez. 'toplam − i' yazmak istediğin yerde 'toplam + i' yazmışsan bu da kusursuz bir programdır. Anlam denetimi dilin kuralları içindeki anlamı sınar; senin niyetini değil."
    },
    {
      myth: "Derleme her zaman yorumlamadan hızlıdır, o yüzden her şeyi derlemek gerekir.",
      truth: "Toplam süre çeviri artı çalıştırmadır. Bir kez çalışacak kısa bir betik için derleme bedeli kendini ödemez; etkileşimli denemelerde yorumlayıcının anında yanıt vermesi daha değerlidir. Milyonlarca kez dönecek bir döngü için derleme kazanır. JIT'in var olma sebebi tam bu ikilemdir: önce yorumla, sadece sık çalışanı derle."
    }
  ],
  glossary: [
    {
      term: "Token",
      definition: "Lexer'ın ürettiği en küçük anlamlı birim; bir tür ve bir metinden oluşur, örneğin (sayı, 42) ya da (işleç, <=)."
    },
    {
      term: "Lexer (sözcük çözümleyici)",
      definition: "Kaynak kodun karakterlerini soldan sağa okuyup tokenlara ayıran, boşluk ve yorumları atan ilk aşama."
    },
    {
      term: "Parser (ayrıştırıcı)",
      definition: "Token dizisini dilin gramerine göre bir ağaca dönüştüren aşama; gramere uymayan diziye söz dizimi hatası verir."
    },
    {
      term: "AST (soyut söz dizimi ağacı)",
      definition: "Programın yapısını tutan ağaç; deyimler ve işleçler iç düğüm, sayılar ve adlar yapraktır, parantez ve noktalama atılmıştır."
    },
    {
      term: "Gramer (BNF)",
      definition: "Dilin hangi token dizilerinin geçerli olduğunu kurallarla tanımlayan biçimsel yazım; işleç önceliği bu kuralların katmanlarından doğar."
    },
    {
      term: "Üç adresli kod",
      definition: "Her satırında en çok bir işleç ve üç ad bulunan, ara sonuçları geçici adlarda tutan ara kod biçimi."
    },
    {
      term: "Bytecode ve yığın makinesi",
      definition: "Gerçek bir işlemciye değil sanal bir makineye yazılmış ara kod; yığın makinesinde her işlem işlenenlerini yığının tepesinden alır, sonucu oraya bırakır."
    },
    {
      term: "JIT (tam zamanında derleme)",
      definition: "Program çalışırken sık kullanılan bölümleri sayaçlarla saptayıp o anda makine koduna çeviren yöntem; yorumlayıcı ile derleyicinin karışımı."
    }
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede derleyici bir kara kutudur: kodu verirsin, program çıkar. Üniversitede o kutunun her aşaması bir kuram alanına açılır. Lexer'ın token kuralları <strong>düzenli diller</strong> ve sonlu otomatlardır; parser'ın grameri <strong>bağlamdan bağımsız dillerdir</strong>. İkisinin ayrı aşama olmasının nedeni kuramsaldır: iç içe parantezleri eşlemek sınırsız sayma ister, sonlu otomat sayamaz, bir yığın gerekir. Bu merdiveni 1956'da Noam Chomsky dilbilim için kurdu, derleyici yazarları ise ona göre araç üretti. Derste iki ayrıştırma ailesi görürsün: <strong>LL</strong> yukarıdan aşağı iner ve en soldan türetmeyi kurar (sayfadaki özyinelemeli iniş böyledir; sol özyinelemeli kuralı kaldıramaz), <strong>LR</strong> aşağıdan yukarı çıkar, tokenları yığına atıp kuralın sağ tarafı tamamlanınca indirger ve sol özyinelemeyle sorunu yoktur. Donald Knuth'un 1965'te tanımladığı LR ayrıştırma, yacc ve bison gibi araçların kullandığı LALR çeşidinin temelidir. Tür denetimi lambda hesabı ve tür kuramına, iyileştirme ise çizge algoritmalarına çıkar: hangi değişkenin hangi yazmaca gireceği, 'aynı anda canlı değişkenler komşu olsun' kuralıyla çizilen bir çizgenin boyanması problemidir. Alanın klasik ders kitabı, kapağındaki ejderha yüzünden 'Ejderha Kitabı' diye anılan, Aho ve Ullman'ın 1977'de yazdığı, 1986'da Sethi ile genişlettiği kitaptır.",
      "Asıl derin fikir şudur: program bir veridir ve onu işleyen de bir programdır. Bu yüzden derleyiciyi kendi dilinde yazabilir, hatta önce basit bir sürümüyle derleyip sonra onunla kendisini derleyebilirsin; buna <strong>kendi kendini yetiştirme</strong> (bootstrapping) denir. Rust derleyicisinin ilk sürümü OCaml'da, Go'nunki C'de yazılmıştı; bugün ikisi de kendi dilinde yazılıdır ve bir önceki sürümüyle derlenir. 1971'de Yoshihiko Futamura daha şaşırtıcı bir şey gösterdi: bir yorumlayıcıyı belirli bir programa göre 'özelleştirirsen' elinde o programın derlenmiş hâli kalır; yorumlayıcıdan derleyiciye giden kuramsal bir köprü vardır (Futamura izdüşümleri). Thompson'ın derleyici içindeki tuzağı da aynı özyinelemeden beslenir. Derleyici Tasarımı dersi bu yüzden Biçimsel Diller ve Otomatlar, Veri Yapıları, Algoritmalar ve Bilgisayar Mimarisi derslerinin buluştuğu yerdir."
    ],
    topics: [
      "Biçimsel diller ve otomatlar",
      "LL ve LR ayrıştırma",
      "Tür sistemleri",
      "SSA ve veri akışı analizi",
      "Yazmaç ataması ve çizge boyama",
      "JIT ve çalışma anı sistemleri",
      "LLVM altyapısı"
    ]
  },
  quiz: [
    {
      question: "<code>print 10 - 4 * 2 + 1;</code> programı sayfanın standart gramerinde 3 yazar. 02 sekmesindeki kurallardan hangisi aynı tokenlardan 1 sonucunu çıkarır?",
      options: [
        "Önceliksiz kural: beş işleç eşit, sola birleşir",
        "Sağa birleşen kural: * / % önce",
        "İkisi de 1 verir",
        "Hiçbiri; tokenlar aynıysa sonuç da aynıdır"
      ],
      answer: 1,
      explanation: "Standart okuma (10 − (4 * 2)) + 1 = 3'tür. Sağa birleşen kural çarpmayı yine önce yapar ama aynı düzeydeki işleçleri sağdan toplar: 10 − ((4 * 2) + 1) = 1. Önceliksiz kural soldan sağa gider: ((10 − 4) * 2) + 1 = 13. Üçü de aynı dokuz tokenı görür; sonucu değiştiren, gramerin onları ağaca dizme biçimidir. Programı kutuya yazıp tabloyu okuyarak denetleyebilirsin."
    },
    {
      question: "Faktöriyel döngüsünde yığın makinesi n = 5 için 63, n = 6 için 76 komut yürütüyor. Kodun uzunluğu ikisinde de 20 komut. n = 10 için kaç komut yürütülür?",
      options: [
        "126",
        "128",
        "152",
        "200"
      ],
      answer: 1,
      explanation: "n bir artınca döngü bir tur fazla döner ve sayı 76 − 63 = 13 artar: koşul 4, gövde 8, geri atlama 1 komut. n = 5'ten 10'a beş tur eklenir: 63 + 5 · 13 = 128. Kapalı biçimi 13n − 2'dir. 126 cevabı sayıyı n ile doğru orantılı saymaktan (63 · 2) çıkar; oysa döngüye bağlı olmayan sabit bir pay vardır. 200 cevabı kodun uzunluğunu n ile çarpar; kodun uzunluğu ile yürütülen komut sayısı ayrı şeylerdir."
    },
    {
      question: "Sayfanın sayım modelinde iyileştirici 300 düğüm geziyor; ham kod çalıştırma başına 25, iyileştirilmiş kod 11 komut yürütüyor. İyileştirme kaçıncı çalıştırmadan başlayarak toplamda daha az iş demektir?",
      options: [
        "12.",
        "21.",
        "22.",
        "28."
      ],
      answer: 2,
      explanation: "Her çalıştırma 25 − 11 = 14 komut kazandırır; 300 birimlik bedel ⌊300 / 14⌋ + 1 = 22. çalıştırmada aşılır. Sağlama: 21 çalıştırmada ham 525, iyileştirilmiş 300 + 231 = 531 (hâlâ geride); 22'de 550'ye karşı 542. 12 cevabı bedeli 25'e, 28 cevabı 11'e bölmekten çıkar; oysa bedeli geri ödeyen, ikisinin farkıdır. Derleme ile yorumlama arasındaki denge de aynı biçimdedir: bedel bir kez ödenir, kazanç her çalıştırmada alınır."
    }
  ],
  next: [
    {
      href: "bicimsel-diller-ve-otomata-teorisi.html",
      title: "Biçimsel Diller ve Otomata Teorisi",
      why: "Lexer'ın arkasındaki sonlu otomatı DFA ve düzenli ifade sekmelerinde kendin kur; bağlamdan bağımsız diller sekmesinde parantez eşlemek için neden bir yığın gerektiğini gör."
    },
    {
      href: "makine-dili-assembly-c.html",
      title: "Makine Dili → Assembly → C",
      why: "Bu sayfanın durduğu yerden devam eder: küçük bir öğretim işlemcisine assembly yaz, sonra aynı işlevin C, x86-64 assembly ve makine kodu hâllerini satır satır eşleştir."
    },
    {
      href: "hesaplama-teorisi.html",
      title: "Hesaplama Teorisi: Turing Makineleri, Lambda Hesabı ve Çözülemezlik",
      why: "'Bitmeyen döngü' örneğinde sayfanın neden yalnızca adım sınırından söz edebildiğinin kuramı: Turing makinesi, lambda hesabı ve durma probleminin çözülemezliği."
    },
    {
      href: "veri-yapilari.html",
      title: "Veri Yapıları Laboratuvarı",
      why: "Derleyicinin elindeki araçlar: yığın makinesinin yığını, sembol tablosunun hash tablosu ve ağaçlar; her işlemin bedelini sayaçlarla ölç."
    }
  ],
  sources: [
    {
      title: "Wikipedia · Compiler",
      url: "https://en.wikipedia.org/wiki/Compiler",
      note: "Derleyicinin tarihi (Hopper, FORTRAN), aşamaları ve türleri; kaynakçası geniş (İngilizce)."
    },
    {
      title: "Python belgeleri · dis — bytecode çözümleyici",
      url: "https://docs.python.org/3/library/dis.html",
      note: "Sabit katlamayı kendi bilgisayarında doğrulamak için: CPython'un ürettiği yığın tabanlı bytecode'u döker."
    },
    {
      title: "MIT OpenCourseWare · 6.035 Computer Language Engineering",
      url: "https://ocw.mit.edu/courses/6-035-computer-language-engineering-spring-2010/",
      note: "Üniversite düzeyinde derleyici dersi: lexer'dan kod üretimine ders notları ve ödevler (İngilizce)."
    },
    {
      title: "Vikipedi · Derleyici",
      url: "https://tr.wikipedia.org/wiki/Derleyici",
      note: "Türkçe terimler ve genel bakış; sayfadaki İngilizce terimlerin karşılıkları için."
    }
  ],
  revision: "Kasım 2026"
};
