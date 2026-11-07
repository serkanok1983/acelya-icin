window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["makine-dili-assembly-c"] = {
  slug: "makine-dili-assembly-c",
  title: "Makine Dili, Assembly ve C: Soyutlamanın Üç Katı",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 35,
  tagline:
    "Telefonundaki her uygulama sonunda 48 89 F8 gibi byte dizilerine iner. Assembly o byte'lara ad verir, C ise 'hangi işlemci' sorusunu derleyiciye bırakır. Üç kat, tek makine.",
  hook:
    "Üç sayı: <code>48 89 F8</code>. Bir x86-64 işlemcisine bu üç byte'ı verirsen hiç düşünmeden bir yazmacın içeriğini ötekine kopyalar. Aynı işi bir insan <code>mov rax, rdi</code> diye yazar; bir C programcısı ise hiç yazmaz, çünkü derleyici onun yerine yazar. Peki insanlar byte'ları elle dizmeyi ne zaman bıraktı, neden bıraktı ve bugün bile neden hâlâ bazen geri dönüyorlar?",
  bigIdea:
    "Her program, işlemcinin okuduğu bir <strong>byte dizisine</strong> iner; assembly bu byte'lara insanın okuyabileceği adlar verir, C ise 'hangi işlemci?' sorusunu derleyiciye devreder. Yukarı çıktıkça insana, aşağı indikçe makineye yaklaşırsın; ama hiçbir kat ötekini ortadan kaldırmaz.",
  story: [
    "1945'te ENIAC'ı programlamak, duvar boyu panolarda kabloları takıp anahtarları çevirmek demekti; yeni bir hesap için makineyi günlerce yeniden kablolamak gerekiyordu. Program ile veri aynı bellekte, aynı türden sayılar olarak durabilsin fikri 21 Haziran 1948'de Manchester'da ete kemiğe büründü: 'Baby' lakaplı makine, 17 komutluk ilk saklı programı 52 dakikada çalıştırıp 2<sup>18</sup> sayısının en büyük bölenini buldu. Ama o 17 komut da sayı olarak, elle, bit bit yazılmıştı. Kathleen Booth'un 1947'de Birkbeck'teki ARC makinesi için tasarladığı sembolik gösterim genellikle ilk <strong>assembly dili</strong> sayılır; Cambridge'deki EDSAC için David Wheeler'ın 1949'da yazdığı 'ilk emirler' ise programcının <code>A</code> yazıp 'topla' demesine izin veriyor, harfleri sayıya makinenin kendisi çeviriyordu. Byte'ları insanın yerine makine dizmeye başlamıştı.",
    "Bir sonraki adım daha büyük bir dirençle karşılaştı. 1952'de Grace Hopper hazır alt programları birleştiren A-0'ı yazıp ona 'compiler' adını verdi; 1954–1957 arasında IBM'de John Backus'ın ekibi, matematik formülüne benzeyen satırları IBM 704 makine koduna çeviren FORTRAN'ı çıkardı. Dönemin programcılarının çoğu bunun işe yarayacağına inanmıyordu: makineye yazdırılan kod, ellerinin ustalığıyla yazdıkları assembly'den yavaş olacaktı. Backus bunu bildiği için ekibinin en çok vaktini iyileştiriciye harcadı. Bugün bu tartışma tersine döndü: üretim derleyicileri, yazmaç dağıtımı ve komut sıralamasında neredeyse her insanı geçer; elle assembly yalnızca video kodlayıcı çekirdekleri, şifreleme ve işletim sistemi tabanı gibi dar noktalarda yazılır.",
    "C'nin hikâyesi 1969'da New Jersey'deki Bell Laboratuvarları'nda, köşede duran bir PDP-7 ile başlar. Ken Thompson o makine için tipsiz bir dil olan B'yi yazdı; 1970'te gelen PDP-11 ise byte'ları tek tek adresleyebiliyordu ve B bunu anlatamıyordu. Dennis Ritchie 1971–1972 arasında B'ye <strong>türler</strong> ekledi (char, int, işaretçi, yapı) ve ortaya çıkan dile C dedi. Asıl kırılma 1973'te geldi: UNIX çekirdeği assembly'den C'ye yeniden yazıldı. Birkaç yıl sonra aynı sistem PDP-11'den bambaşka bir mimari olan Interdata 8/32'ye taşındı; tarihte ilk kez bir işletim sistemi, altındaki işlemci değişince baştan yazılmak zorunda kalmadı. 1978'de Kernighan ve Ritchie'nin kitabı, 1989'da ANSI standardı geldi. Bugün Linux çekirdeği, Python yorumlayıcısı ve bu sayfayı gösteren tarayıcının büyük bölümü C ya da onun torunu C++ ile yazılıdır.",
    "C'nin gücünün bedeli de aynı yerden gelir: makineye yakın olmak, makinenin hatalarına da yakın olmaktır. 2 Kasım 1988'de Robert Morris'in yazdığı solucan, bir ağ programındaki sınır denetimsiz bir tampona fazla veri yazarak (<strong>buffer overflow</strong>) o günkü internetin önemli bir bölümünü çökertti; aynı hata sınıfı otuz yıl sonra da güvenlik açıklarının başında geliyordu. Bu yüzden 2022 sonunda Linux çekirdeği, C'nin yanına ilk kez ikinci bir dil olarak Rust'ı kabul etti. Yine de C'nin verdiği söz değişmedi: yazdığın her satırın altında hangi byte'ların döneceğini görebilirsin. Bu sayfadaki gezgin o bakışı taklit eder.",
  ],
  core: [
    {
      heading: "Bir komut bir byte dizisidir",
      body:
        "Sayfadaki üç sütunun en solunda <code>48 89 F8</code> yazıyor ve yanında 'mov rax, rdi' duruyor. Bu üç byte'ın her birinin görevi var. <code>48</code> bir ön ek (REX.W): 'bu işlem 64 bit genişliğinde' der. <code>89</code> asıl <strong>opcode</strong>: 'bir yazmacı bir yazmaca ya da belleğe kopyala'. <code>F8</code> ise hangi yazmaçların söz konusu olduğunu söyleyen <strong>ModRM</strong> byte'ıdır: ikilik yazımı 11 111 000. İlk iki bit 11, 'iki taraf da yazmaç' demek; sonraki üç bit 111 kaynak (7 numaralı yazmaç, rdi), son üç bit 000 hedef (0 numaralı yazmaç, rax). İşlemci bu byte'ları sırayla okur, çözer ve uygular; adlar, boşluklar ve yorumlar ona hiçbir zaman ulaşmaz.",
      formula: "ModRM = mod(2 bit) · reg(3 bit) · r/m(3 bit)   →   F8 = 11 111 000",
      formulaNote: "x86-64'te yazmaçların numarası vardır: rax 0, rcx 1, rdx 2, rbx 3, rsp 4, rbp 5, rsi 6, rdi 7. Adlar insan için, numaralar makine içindir.",
    },
    {
      heading: "Assembly: aynı komut, insan adıyla",
      body:
        "Assembly makine dilinin üstüne yeni bir güç eklemez; her satırı tam olarak bir komuta karşılık gelir. Eklediği şey adlardır: <strong>mnemonik</strong>ler (mov, cmp, jl), yazmaç adları ve <code>.loop</code> gibi <strong>etiketler</strong>. Asıl işi yapan program <strong>assembler</strong>'dır: bir dallanma komutunun kaç byte ileri ya da geri atlayacağını sen değil o hesaplar, sen yalnızca etikete 'buraya dön' dersin. Sayfada iki ayrı yazım görürsün: orta sütun AT&T biçimidir (kaynak önce, <code>%rdi</code>, <code>$1</code>), gezgin ve hex sütunu Intel biçimidir (hedef önce). <code>movq %rdi, %rax</code> ile <code>mov rax, rdi</code> aynı üç byte'tır.",
      formula: "hedef adres = sonraki komutun adresi + ofset   (kısa dallanmada ofset −128 … +127 byte)",
      formulaNote: "Bir komut araya girince bütün ofsetler kayar; assembler hepsini yeniden hesaplar. Elle makine dili yazanların en sık hatası tam buydu.",
    },
    {
      heading: "Yazmaçlar ve çağrı sözleşmesi",
      body:
        "x86-64'te 16 genel amaçlı <strong>yazmaç</strong> vardır; her biri 64 bitlik, işlemcinin içinde yaşayan, belleğe gitmekten çok daha hızlı okunan bir kutudur. Bir fonksiyon çağrıldığında argümanların hangi kutuda geleceğini ve sonucun hangi kutuda döneceğini <strong>çağrı sözleşmesi</strong> (ABI) belirler. Linux ve macOS'taki System V kuralı: ilk altı tamsayı argümanı sırayla rdi, rsi, rdx, rcx, r8, r9'da gelir; sonuç rax'ta döner. Sayfanın açılış örneği bu yüzden üç satırdır: x zaten edi'de bekler, <code>imul eax, edi</code> kareyi alır, <code>ret</code> döner. Belleğe hiç dokunulmaz, yığına hiçbir şey konmaz. 'eax' yazmasının nedeni de C'deki <code>int</code>'in 32 bit olmasıdır; eax, rax'ın alt yarısıdır.",
      formula: "square(x):  eax ← edi ;  eax ← eax × edi ;  ret   (sonuç rax'ın alt 32 bitinde)",
      formulaNote: "32 bitlik bir yazmaca yazmak üst 32 biti sıfırlar; 16 ya da 8 bitlik parçaya yazmak ise üst kısmı olduğu gibi bırakır. İkisi aynı kutunun farklı pencereleridir.",
    },
    {
      heading: "Derleyici neyi bilir, sayfadaki gezgin neyi bilir?",
      body:
        "Gerçek bir derleyici kaynak metni önce parçalara, sonra bir ağaca çevirir; türleri denetler, ara kod üretir ve iyileştirir: hiç kullanılmayan değişkeni atar, sabit hesabı önceden yapar, döngüyü yeniden düzenler, bazen döngüyü tamamen bir çarpmaya indirger. Sayfadaki gezgin bunların hiçbirini yapmaz; metinde <code>x * x</code>, <code>sum</code>, <code>factorial</code>, <code>strlen</code> ya da <code>swap</code> sözcüklerini arar ve hazır bir cevabı gösterir. Bu onu değersiz yapmaz: beş hazır çıktının her biri gerçek bir derleyicinin -O2 düzeyinde üretebileceği türden, doğru ve izlenebilir koddur. Değersiz olan, ona bir derleyici muamelesi yapmaktır. Laboratuvardaki ikinci deney tam bu sınırı gösterir; gerçek derleyici çıktısını görmek istediğinde Compiler Explorer'ı (godbolt.org) kullan.",
      formula: "C → (tokenlar) → (ağaç) → (ara kod) → iyileştirme → assembly → assembler → byte'lar",
      formulaNote: "Sayfadaki gezgin bu zincirin yalnızca iki ucunu gösterir; ortadaki adımlar Derleyici ve Yorumlayıcılar sayfasında.",
    },
    {
      heading: "Sayıların bir kenarı var: 32 bit",
      body:
        "C'de <code>int</code>, bu sayfadaki her örnekte 32 bitlik bir kutudur; işaretli olduğu için en büyük değeri 2<sup>31</sup> − 1 = 2 147 483 647'dir. Faktöriyel örneğinde <code>imul eax, edi</code> her turda sonucu büyütür ama kutu büyümez: 12! = 479 001 600 sığar, 13! = 6 227 020 800 sığmaz. Donanım ne yapar? Sonucun yalnızca alt 32 bitini tutar, yani 2<sup>32</sup>'ye göre kalanı. C ne der? İşaretli taşma <strong>tanımsız davranıştır</strong>: derleyici bunun asla olmayacağını varsayıp kodu buna göre iyileştirebilir. Donanımın 'kalan' cevabıyla C'nin 'tanımsız' cevabı arasındaki fark, bu sayfanın en önemli derslerinden biridir.",
      formula: "13! mod 2<sup>32</sup> = 6 227 020 800 − 4 294 967 296 = 1 932 053 504",
      formulaNote: "Sonuç 2³¹'den küçük olduğu için işaretli okunduğunda da pozitif görünür: yanlış ama masum görünüşlü bir sayı.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört etkileşimli bölüm var: üstte tıklanabilir üç <strong>evrim aşaması</strong> (Makine Dili, Assembly, C Dili); ortada bir <strong>C kodu kutusu</strong>, <strong>🔨 Derle (C → ASM)</strong> düğmesi ve dört hazır örnek (<strong>sum array</strong>, <strong>factorial</strong>, <strong>strlen</strong>, <strong>swap</strong>); altta tıklanabilir <strong>12 yazmaç kartı</strong> (rax'tan rip'e) ve sabit bir çağrı düzeni şeması. Gezginin anahtar sözcük eşleyen bir taklit olduğunu unutma; deneyler bunu lehine kullanır.",
    experiments: [
      {
        title: "Üç komutluk fonksiyon",
        predict: "Açılıştaki <code>int square(int x) { return x * x; }</code> için kaç assembly satırı beklersin? Belleğe ya da yığına (stack) hiç dokunulur mu?",
        do: "Kutudaki kodu değiştirmeden 🔨 Derle (C → ASM) düğmesine bas. Çıktıdaki her satırı sırayla oku; sonra yazmaç kartlarından rdi ve rax'a tıklayıp görevlerini karşılaştır.",
        observe: "Etiket dışında tam üç komut: <code>mov eax, edi</code>, <code>imul eax, edi</code>, <code>ret</code>. Köşeli parantez (bellek adresi) yok, push ya da pop yok. rdi kartı '1. fonksiyon argümanı', rax kartı 'dönüş değeri' der.",
        explain: "System V çağrı sözleşmesi x'i zaten edi'de teslim eder, sonucu eax'ta ister. Fonksiyonun saklayacağı yerel değişkeni yoktur; bu yüzden yığın çerçevesi kurmaya gerek kalmaz. Kısa fonksiyonlarda derleyicinin ürettiği kod, insanın yazacağından daha kısa olur.",
      },
      {
        title: "Derleyici mi, sözlük mü?",
        predict: "Değişkenin adını x'ten a'ya çevirirsen gerçek bir derleyici farklı kod üretir mi? Peki sayfadaki gezgin?",
        do: "Kutuyu silip <code>int kare(int a) { return a * a; }</code> yaz ve Derle'ye bas. Sonra en üste tek bir yorum satırı, <code>// sum</code>, ekleyip yeniden derle.",
        observe: "İlk derlemede kare alma kaybolur: <code>func:</code> etiketi, üç açıklama satırı, tek bir <code>ret</code> ve 'basitleştirilmiş bir çıktıdır' notu çıkar. Yorum satırını ekleyince ise kodda döngü olmadığı hâlde dizi toplayan <code>sum:</code> döngüsü (xor, test, jle, add, inc, cmp, jl …) görünür.",
        explain: "Gezgin metinde 'x * x', 'sum', 'factorial', 'strlen', 'swap' gibi parçaları arar; bulduğu ilk eşleşmenin hazır cevabını basar. Gerçek derleyici adlara değil yapıya bakar: a * a ile x * x aynı ağacı verir, yorum satırları ise daha ilk aşamada atılır. Bu deney, sayfanın hangi katta dürüst olduğunu gösterir.",
      },
      {
        title: "Faktöriyel döngüsünü elle çalıştır",
        predict: "n = 5 için <code>imul</code> komutu kaç kez çalışır? n = 0 ve n = 1 için döngüye hiç girilir mi?",
        do: "factorial düğmesine bas, Derle'ye bas. Kâğıda iki sütun aç: eax ve edi. edi = 5 ile başla ve çıktıdaki komutları satır satır uygula; her <code>cmp</code>'den sonra <code>jle</code> ya da <code>jg</code>'nin atlayıp atlamadığına karar ver.",
        observe: "eax sırasıyla 1, 5, 20, 60, 120; edi sırasıyla 5, 4, 3, 2, 1. imul tam dört kez çalışır ve edi 1'e düşünce <code>jg .Lloop</code> atlamaz. n = 0 ve n = 1 için ilk <code>cmp edi, 1</code> ardından <code>jle .Ldone</code> doğrudan çıkışa gider; sonuç eax'taki 1'dir.",
        explain: "Döngü, 'sayaç 1'den büyükken çarp ve azalt' deseninin en kısa biçimidir: girişte bir koruma karşılaştırması, sonda bir devam karşılaştırması. C'deki <code>for (int i = n; i &gt; 1; i--)</code> satırı tam olarak bu iki karşılaştırmaya çevrilir; 'result' değişkeni ise hiç belleğe inmeden eax'ta yaşar.",
      },
      {
        title: "Hangi yazmaçlar sana, hangileri bana?",
        predict: "12 kartın kaçı 'callee-saved' (çağrılan fonksiyon korumalı) yazıyor? swap örneğinde eax ve ecx'in seçilmesi tesadüf mü?",
        do: "Sırayla rbx, rbp ve r12-r15 kartlarına, sonra rcx ve r10-r11 kartlarına tıkla; her açıklamayı en alttaki çağrı düzeni şemasıyla karşılaştır. Ardından swap düğmesine basıp derle.",
        observe: "Callee-saved kutusu altı yazmaç sayar: rbx, rbp, r12, r13, r14, r15. Caller-saved kutusunda dokuz yazmaç vardır. swap çıktısı yalnızca eax ve ecx kullanır ve hiçbir push/pop içermez. r10-r11 kartı ayrıca bir inceliği söyler: sistem çağrılarında dördüncü argüman rcx yerine r10'da taşınır, çünkü <code>syscall</code> komutu rcx'i ezer.",
        explain: "Caller-saved yazmaçları bir fonksiyon sormadan kullanabilir; çağıran taraf değer lazımsa kendisi saklamıştır. Callee-saved yazmaçları kullanmak isteyen fonksiyon önce push ile saklayıp çıkışta pop ile geri koymak zorundadır. Derleyici kısa fonksiyonlarda bu yüzden caller-saved yazmaçları seçer: daha az komut, daha az bellek trafiği.",
      },
    ],
  },
  wow: [
    {
      title: "Bir yazmaç adında kırk beş yıl",
      body:
        "1978'de Intel 8086'nın akümülatörü 16 bitti ve adı AX'ti. 1985'te 80386 onu 32 bite genişletti: EAX. 2003'te AMD'nin Opteron'u 64 bite çıkardı: RAX. Bugün dizüstü bilgisayarındaki işlemci üç adı da anlar; aynı kutunun 8, 16, 32 ve 64 bitlik pencereleridir. Sayfanın yazmaç kartlarındaki 'rax → eax → ax → al/ah' zinciri, bir tasarım kararının yarım yüzyıl boyunca nasıl taşındığının kaydıdır.",
    },
    {
      title: "24 milyar kilometre öteye yama",
      body:
        "1977'de fırlatılan Voyager 1'in bilgisayarları assembly ile programlanmıştır. Kasım 2023'te uçuş veri sistemi anlamsız veri göndermeye başladı; Nisan 2024'te NASA mühendisleri bozulan bellek yongasındaki kodu başka bölgelere taşıyan bir yamayı gönderdi. Sinyal tek yönde yaklaşık 22,5 saat yol aldı; cevabın dönmesi iki gün sürdü. Yarım asırlık bir makinede, byte'ların tam olarak nerede durduğunu bilmek hayat kurtardı.",
    },
    {
      title: "Otuz yedi saniye ve bir taşma",
      body:
        "4 Haziran 1996'da Ariane 5 roketinin ilk uçuşu kalkıştan yaklaşık 37 saniye sonra kendini imha etti. Ariane 4'ten devralınan ataletsel yönlendirme yazılımı, 64 bitlik bir kayan noktalı yatay hız değerini 16 bitlik işaretli tamsayıya çevirmeye çalıştı; yeni roket daha hızlıydı ve değer 32 767'yi aştı. Kod C değil Ada'ydı; ama ders her dilde aynıdır: makine düzeyinde her sayının bir genişliği vardır ve kenarından düşmek sessizdir.",
    },
  ],
  worked: {
    title: "factorial(13) yazmaçlarda ne olur?",
    prompt:
      "Sayfadaki factorial çıktısı 32 bitlik eax yazmacında çalışır. Bu kodu n = 12 ve n = 13 ile çağırırsan işlemci hangi sayıları döndürür? Hesabı 2<sup>32</sup> = 4 294 967 296 ile yap.",
    steps: [
      "Döngü sayısını bul: kod edi = n'den başlar ve edi 1'e düşene kadar her turda bir çarpma yapar; n ≥ 2 için imul tam n − 1 kez çalışır. n = 12 için 11, n = 13 için 12 çarpma.",
      "n = 12: 12! = 479 001 600. İşaretli 32 bitin üst sınırı 2<sup>31</sup> − 1 = 2 147 483 647; sığar. eax = 479 001 600, doğru sonuç.",
      "n = 13: on ikinci çarpma 479 001 600 × 13 = 6 227 020 800 verir. Bu, 32 bite sığmaz; imul sonucun yalnızca alt 32 bitini eax'ta bırakır, yani 2<sup>32</sup>'ye göre kalanı: 6 227 020 800 − 4 294 967 296 = 1 932 053 504.",
      "Yorumla: 1 932 053 504 sayısı 2<sup>31</sup>'den küçük olduğu için işaretli okunduğunda da pozitiftir; program hata vermez, yalnızca yanlış ve inandırıcı bir sayı basar. C standardı bu durumu tanımsız davranış sayar: başka bir derleyici ya da bayrakla bambaşka bir sonuç da çıkabilir.",
    ],
    result:
      "factorial(12) = 479 001 600 doğrudur; factorial(13) sessizce 1 932 053 504 döner. 64 bitlik <code>long</code> ile sınır 20!'e çıkar, ama kenar hiç yok olmaz.",
  },
  misconceptions: [
    {
      myth: "Bilgisayar C kodunu anlar.",
      truth:
        "İşlemci yalnızca makine dilini yürütür; <code>for</code> ya da <code>return</code> sözcüğünü hiçbir zaman görmez. C bir çeviri sözleşmesidir: yazdığın metni derleyici byte'lara çevirir, sonra o byte'lar çalışır. Sayfadaki gezginin ilk satırı bu yüzden bir yorumdur: 'GCC -O2 benzeri'.",
    },
    {
      myth: "Elle yazılmış assembly her zaman derleyici çıktısından hızlıdır.",
      truth:
        "1950'lerde doğruydu, bugün çoğunlukla yanlış. Üretim derleyicileri yazmaç dağıtımı, komut sıralaması ve vektörleştirmede insanı aşar. İnsan, derleyicinin bilmediği bir donanım özelliğini kullanabildiği dar noktalarda (kodlayıcı çekirdekleri, şifreleme, önyükleme kodu) hâlâ kazanır; bütün bir programda değil.",
    },
    {
      myth: "Her değişken bellekte bir yerde durur.",
      truth:
        "Derleyici bir değişkeni yalnızca yazmaçta tutabilir, hatta tamamen yok edebilir. square örneğinde x ve sonuç belleğe hiç inmez; factorial'daki result yalnızca eax'ta yaşar. Değişken, kaynak koddaki bir addır; makinede karşılığı bir kutu, bir yazmaç ya da hiçbir şey olabilir.",
    },
    {
      myth: "Assembly tek bir dildir.",
      truth:
        "Her işlemci ailesinin kendi komut kümesi ve kendi assembly'si vardır: x86-64, ARM (telefonlar), RISC-V. Üstelik aynı x86-64 kodu iki ayrı yazımla yazılabilir; sayfadaki orta sütun AT&T biçimi (<code>movq %rdi, %rax</code>), gezgin Intel biçimidir (<code>mov rax, rdi</code>). Byte'lar aynıdır, metin değildir.",
    },
  ],
  glossary: [
    { term: "Makine dili", definition: "İşlemcinin doğrudan yürüttüğü, opcode ve operandlardan oluşan byte dizileri; her işlemci ailesinin kendi makine dili vardır." },
    { term: "Opcode", definition: "Bir komutun hangi işlemi yapacağını söyleyen byte ya da byte grubu; 89, x86-64'te 'yazmaçtan kopyala' demektir." },
    { term: "Mnemonik", definition: "Opcode'un insan için kısaltılmış adı: mov, add, cmp, jl; assembler bunu byte'a çevirir." },
    { term: "Assembler", definition: "Assembly metnini makine diline çeviren, etiketleri adrese ve dallanma ofsetine dönüştüren program." },
    { term: "Yazmaç (register)", definition: "İşlemcinin içinde yaşayan, belleğe gitmeden okunup yazılan küçük sayı kutusu; x86-64'te 16 genel amaçlı yazmaç 64 bit genişliğindedir." },
    { term: "Çağrı sözleşmesi (ABI)", definition: "Argümanların hangi yazmaçta geleceğini, sonucun nerede döneceğini ve hangi yazmaçların korunacağını belirleyen kurallar; System V ve Windows x64 farklıdır." },
    { term: "Derleyici", definition: "Yüksek düzeyli kaynak kodu çözümleyip iyileştirerek assembly ya da makine diline çeviren program; çeviriyi çalıştırmadan önce bir kez yapar." },
    { term: "Taşınabilirlik", definition: "Aynı kaynak kodun yeniden yazılmadan farklı işlemci ya da işletim sisteminde derlenip çalışabilmesi; C'nin assembly'ye karşı en büyük üstünlüğü." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bilgisayar mühendisliğinin ilk yılında bu sayfanın üç sütunu üç derse dönüşür. <strong>Bilgisayar organizasyonu</strong> dersi hex sütununu açar: komutlar nasıl kodlanır, işlemci bir komutu kaç aşamada (getir, çöz, yürüt, belleğe eriş, yaz) işler, boru hattı ve önbellek neden bir döngünün hızını on kat değiştirir. Çoğu üniversite bunu artık x86 yerine temiz ve açık bir komut kümesi olan RISC-V ile öğretir; ama bir kez yazmaç, yığın ve çağrı sözleşmesi fikrini kavradıysan mimari değiştirmek birkaç haftalık iştir. Sistem programlama dersleri ise GCC'nin ürettiği gerçek x86-64 çıktısını okumayı öğretir; sayfadaki gezginin taklit ettiği şey tam olarak budur.",
      "C sütunu iki yere açılır. <strong>Derleyici tasarımı</strong> dersinde kaynak metinden byte'a giden zinciri kendin kurarsın: sözcük çözümleme, ayrıştırma, tür denetimi, ara kod, iyileştirme, yazmaç dağıtımı. <strong>İşletim sistemleri</strong> ve <strong>sistem güvenliği</strong> dersleri ise C'nin bedelini inceler: bir tamponu taşırmak yığındaki dönüş adresini nasıl ezer, işlemci neden bazı bellek sayfalarını çalıştırılamaz işaretler, Rust gibi diller aynı hızı güvenlik yitirmeden nasıl verir. Bu sayfadaki üç kat, o derslerin ortak haritasıdır.",
    ],
    topics: ["Komut kümesi mimarisi (ISA) ve RISC-V", "Boru hattı ve önbellek hiyerarşisi", "Yığın çerçevesi ve çağrı sözleşmeleri", "Derleyici tasarımı ve yazmaç dağıtımı", "Tanımsız davranış ve bellek güvenliği", "Bağlayıcı ve yükleyici (linker, loader)"],
  },
  quiz: [
    {
      question: "System V ABI'de <code>square(int x)</code> çağrıldığında x hangi yazmaçta gelir, sonuç hangisinde döner?",
      options: ["x rax'ta gelir, sonuç rdi'de döner", "x rdi'de gelir, sonuç rax'ta döner", "x rsi'de gelir, sonuç rdx'te döner", "x yığında gelir, sonuç rbp'de döner"],
      answer: 1,
      explanation: "İlk tamsayı argümanı rdi (32 bitlik int için edi), dönüş değeri rax (edi için eax). Sayfanın açılış çıktısı bu yüzden mov eax, edi ile başlar ve sonucu eax'ta bırakıp döner.",
    },
    {
      question: "Sayfadaki C → Assembly gezgininin gerçek bir derleyici olmadığını hangi gözlem kanıtlar?",
      options: ["Çıktının Intel yazımında olması", "square için yalnızca üç komut üretmesi", "Değişken adını x'ten a'ya çevirince kare alma kodunun kaybolması", "ret komutuyla bitmesi"],
      answer: 2,
      explanation: "Gerçek derleyici adlara değil yapıya bakar; a * a ile x * x aynı kodu verir. Gezgin ise 'x * x' metnini arar. Üç komutluk çıktı ve Intel yazımı gerçek derleyicilerde de görülür, bu yüzden kanıt sayılmaz.",
    },
    {
      question: "32 bitlik işaretli <code>int</code> ile sayfadaki factorial kodu n = 13 için ne döndürür?",
      options: ["6 227 020 800", "1 932 053 504", "2 147 483 647", "Sıfır; taşma sonucu siler"],
      answer: 1,
      explanation: "13! = 6 227 020 800, 2³¹ − 1'den büyüktür; eax yalnızca alt 32 biti tutar: 6 227 020 800 − 4 294 967 296 = 1 932 053 504. Program hata vermez, yanlış sayıyı sessizce döndürür.",
    },
  ],
  next: [
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Sistemleri ve Mimarisi", why: "Byte'ları yürüten makinenin içi: getir-çöz-yürüt döngüsü, boru hattı ve önbellek." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "C ile assembly arasındaki boş bırakılan adımlar: token, ağaç, ara kod ve iyileştirme." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "swap örneğindeki köşeli parantezlerin anlamı: adresler, yığın ve C'nin bedeli." },
    { href: "mantik-kapilari.html", title: "Mantık Kapıları", why: "Bir katman daha aşağı: imul komutunu gerçekten yapan transistör devreleri." },
  ],
  sources: [
    { title: "Wikipedia · x86 calling conventions", url: "https://en.wikipedia.org/wiki/X86_calling_conventions", note: "System V AMD64 ve Windows x64 kurallarının karşılaştırmalı tablosu; sayfadaki çağrı düzeni şemasının kaynağı niteliğinde (İngilizce)." },
    { title: "Wikipedia · Assembly language", url: "https://en.wikipedia.org/wiki/Assembly_language", note: "Mnemonik, assembler, makro ve tarihçe; Kathleen Booth ve EDSAC bölümleri (İngilizce)." },
    { title: "Vikipedi · C (programlama dili)", url: "https://tr.wikipedia.org/wiki/C_(programlama_dili)", note: "Ritchie, B'den C'ye geçiş, UNIX ve standartlaşma tarihçesi." },
    { title: "MIT OCW · 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", note: "Komut kodlamadan boru hattına, üniversite birinci sınıf düzeyinde açık ders (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
