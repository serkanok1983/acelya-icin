window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["makine-dili-assembly-c"] = {
  slug: "makine-dili-assembly-c",
  title: "Makine Dili, Assembly ve C: Soyutlamanın Üç Katı",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bilgisayarındaki her program sonunda 89 F8 gibi byte dizilerine iner. Assembly o byte'lara ad verir, C ise 'hangi işlemci' sorusunu derleyiciye bırakır. Üç kat, tek makine.",
  hook:
    "İki sayı: <code>89 F8</code>. Bir x86-64 işlemcisine bu iki byte'ı verirsen hiç düşünmeden bir yazmacın içeriğini ötekine kopyalar. Aynı işi bir insan <code>mov eax, edi</code> diye yazar; bir C programcısı ise hiç yazmaz, çünkü derleyici onun yerine yazar. Peki insanlar byte'ları elle dizmeyi ne zaman bıraktı, neden bıraktı ve bugün bile neden bazen geri dönüyorlar?",
  bigIdea:
    "Her program, işlemcinin okuduğu bir <strong>byte dizisine</strong> iner; assembly bu byte'lara insanın okuyabileceği adlar verir, C ise 'hangi işlemci?' sorusunu derleyiciye devreder. Yukarı çıktıkça insana, aşağı indikçe makineye yaklaşırsın; ama hiçbir kat ötekini ortadan kaldırmaz.",
  story: [
    "1945'te ENIAC'ı programlamak, duvar boyu panolarda kabloları takıp anahtarları çevirmek demekti; yeni bir hesap için makineyi günlerce yeniden kablolamak gerekiyordu. Program ile veri aynı bellekte, aynı türden sayılar olarak durabilsin fikri 21 Haziran 1948'de Manchester'da ete kemiğe büründü: 'Baby' lakaplı makine, 17 komutluk ilk saklı programı 52 dakika çalıştırıp 2<sup>18</sup> sayısının en büyük öz bölenini buldu. Ama o 17 komut da sayı olarak, elle, bit bit girilmişti. Kathleen Booth'un 1947'de Londra'daki Birkbeck Koleji'nin ARC makinesi için tasarladığı sembolik gösterim genellikle ilk <strong>assembly dili</strong> sayılır. 1949'da çalışmaya başlayan Cambridge'deki EDSAC'ta ise David Wheeler'ın yazdığı 'ilk emirler' programı, programcının <code>A</code> yazıp 'topla' demesine izin veriyor, harfleri sayıya makinenin kendisi çeviriyordu. Byte'ları insanın yerine makine dizmeye başlamıştı.",
    "Bir sonraki adım daha büyük bir dirençle karşılaştı. 1952'de Grace Hopper hazır alt programları birleştiren A-0'ı yazıp ona 'compiler' adını verdi; 1954–1957 arasında IBM'de John Backus'ın ekibi, matematik formülüne benzeyen satırları IBM 704 makine koduna çeviren FORTRAN'ı çıkardı. Dönemin programcılarının çoğu bunun işe yarayacağına inanmıyordu: makineye yazdırılan kod, kendi elleriyle yazdıkları assembly'den yavaş olacaktı. Backus bunu bildiği için ekibinin en çok vaktini iyileştiriciye harcadı. Bugün bu tartışma tersine döndü: üretim derleyicileri, yazmaç dağıtımı ve komut sıralamasında çoğu programcıyı geçer; elle assembly yalnızca video kodlayıcı çekirdekleri, şifreleme ve işletim sistemi tabanı gibi dar noktalarda yazılır.",
    "C'nin hikâyesi 1969'da New Jersey'deki Bell Laboratuvarları'nda, köşede duran bir PDP-7 ile başlar. Ken Thompson o makinede tipsiz bir dil olan B'yi yazdı; 1970'te gelen PDP-11 ise byte'ları tek tek adresleyebiliyordu ve B bunu anlatamıyordu. Dennis Ritchie 1971–1972 arasında B'ye <strong>türler</strong> ekledi (char, int, işaretçi) ve ortaya çıkan dile C dedi; 1973'te yapılar (struct) da gelince dil bir çekirdek yazacak kadar güçlendi ve aynı yıl UNIX çekirdeği assembly'den C'ye yeniden yazıldı. Birkaç yıl sonra aynı sistem PDP-11'den bambaşka bir mimari olan Interdata 8/32'ye taşındı: bir işletim sistemi, altındaki işlemci değişince baştan yazılmak zorunda kalmamıştı. 1978'de Kernighan ile Ritchie'nin kitabı, 1989'da ANSI standardı geldi. Bugün Linux çekirdeği, Python'ın yaygın yorumlayıcısı ve bu sayfayı gösteren tarayıcının büyük bölümü C ya da onun torunu C++ ile yazılıdır.",
    "C'nin gücünün bedeli de aynı yerden gelir: makineye yakın olmak, makinenin hatalarına da yakın olmaktır. 2 Kasım 1988'de Robert Morris'in yazdığı solucan, bir ağ hizmetindeki sınır denetimsiz bir tampona fazla veri yazarak (<strong>buffer overflow</strong>) binlerce makineye sızdı ve o günkü internetin önemli bir bölümünü kullanılmaz hâle getirdi; aynı hata sınıfı otuz yıl sonra da güvenlik açıklarının başında geliyordu. Bu yüzden 2022 sonunda Linux çekirdeği, C'nin yanına ilk kez ikinci bir dil olarak Rust'ı kabul etti. Yine de C'nin verdiği söz değişmedi: yazdığın her satırın altında hangi byte'ların döneceğini görebilirsin. Bu sayfa o bakışı çalıştırır.",
  ],
  core: [
    {
      heading: "Bir komut bir byte dizisidir",
      body:
        "Sayfadaki gezginin açılış çıktısı <code>mov eax, edi</code> ile başlar; makine dilinde bu iki byte'tır: <code>89 F8</code>. <code>89</code> asıl <strong>opcode</strong>: 'bir yazmacı bir yazmaca ya da belleğe kopyala'. <code>F8</code> ise kimin kime kopyalanacağını söyleyen <strong>ModRM</strong> byte'ıdır; ikilik yazımı 11 111 000. İlk iki bit 11, 'iki taraf da yazmaç' demek; sonraki üç bit 111 kaynak (7 numaralı yazmaç, edi), son üç bit 000 hedef (0 numaralı yazmaç, eax). Başına <code>48</code> ön ekini (REX.W) koyarsan aynı komut 64 bit genişliğinde çalışır: <code>48 89 F8</code>, yani <code>mov rax, rdi</code>. Şimdi sayfanın hex sütunundaki dördüncü satıra bak: <code>8B 07</code>. Opcode 8B ters yönde kopyalar; ModRM 07 = 00 000 111 ve baştaki 00 bu kez 'rdi yazmacın kendisi değil, gösterdiği bellek adresi' demektir: <code>mov eax, [rdi]</code>, yani max = arr[0]. İşlemci bu byte'ları sırayla okur, çözer ve uygular; adlar, boşluklar ve yorumlar ona hiçbir zaman ulaşmaz.",
      formula: "ModRM = mod(2 bit) · reg(3 bit) · r/m(3 bit)   →   F8 = 11 111 000,   07 = 00 000 111",
      formulaNote: "x86-64'te yazmaçların numarası vardır: rax 0, rcx 1, rdx 2, rbx 3, rsp 4, rbp 5, rsi 6, rdi 7. Adlar insan için, numaralar makine içindir.",
    },
    {
      heading: "Assembly: aynı komut, insan adıyla",
      body:
        "Assembly makine dilinin üstüne yeni bir güç eklemez; her komut satırı bir makine komutuna karşılık gelir. Eklediği şey adlardır: <strong>mnemonik</strong>ler (mov, cmp, jl), yazmaç adları ve <code>.loop</code> gibi <strong>etiketler</strong>. Asıl işi yapan program <strong>assembler</strong>'dır: bir dallanma komutunun kaç byte ileri ya da geri atlayacağını sen değil o hesaplar, sen yalnızca etikete 'buraya dön' dersin. Sayfadaki <code>7C F2</code> buna örnektir: 7C 'küçükse atla' (jl), F2 ise ikiye tümleyenle −14'tür; işlemci bir sonraki komutun adresinden 14 byte geri gider ve <code>.loop</code>'a varır. Sayfada iki ayrı yazım görürsün: orta sütun AT&T biçimidir (kaynak önce, <code>%rdi</code>, <code>$1</code>), hex sütununun açıklamaları ve gezgin Intel biçimidir (hedef önce). <code>movl (%rdi), %eax</code> ile <code>mov eax, [rdi]</code> aynı iki byte'tır.",
      formula: "hedef adres = sonraki komutun adresi + ofset   (kısa dallanmada ofset −128 … +127 byte)",
      formulaNote: "Araya bir komut girince bütün ofsetler kayar; assembler hepsini yeniden hesaplar. Elle makine dili yazanların en sık hatası buydu.",
    },
    {
      heading: "Yazmaçlar ve çağrı sözleşmesi",
      body:
        "x86-64'te 16 genel amaçlı <strong>yazmaç</strong> vardır; her biri 64 bitlik, işlemcinin içinde yaşayan, belleğe gitmekten çok daha hızlı okunan bir kutudur. Bir fonksiyon çağrıldığında argümanların hangi kutuda geleceğini ve sonucun hangi kutuda döneceğini <strong>çağrı sözleşmesi</strong> (ABI) belirler. Linux ve macOS'taki System V AMD64 kuralı: ilk altı tamsayı ya da işaretçi argümanı sırayla rdi, rsi, rdx, rcx, r8, r9'da gelir; sonuç rax'ta döner. Sayfanın açılış örneği bu yüzden üç satırdır: x zaten edi'de bekler, <code>imul eax, edi</code> kareyi alır, <code>ret</code> döner. Belleğe hiç dokunulmaz, yığına hiçbir şey konmaz. 'eax' yazmasının nedeni C'deki <code>int</code>'in burada 32 bit olmasıdır; eax, rax'ın alt yarısıdır. Aynı nedenle max_value ve sum, uzunluğu <code>test esi, esi</code> ile sınar: <code>int len</code> rsi'nin yalnızca alt 32 bitinde gelir, üst yarı için sözleşme hiçbir söz vermez. Kısa fonksiyonların eax, ecx, edx gibi 'çağıranın koruduğu' yazmaçları seçmesi de sözleşmeden gelir: bunları kullanmak için önce saklamak gerekmez.",
      formula: "square(x):  eax ← edi ;  eax ← eax × edi ;  ret   (sonuç rax'ın alt 32 bitinde)",
      formulaNote: "32 bitlik bir yazmaca yazmak üst 32 biti sıfırlar; 16 ya da 8 bitlik parçaya yazmak ise üst kısmı olduğu gibi bırakır. Hepsi aynı kutunun farklı pencereleridir.",
    },
    {
      heading: "Derleyici neyi bilir, sayfadaki gezgin neyi bilir?",
      body:
        "Gerçek bir derleyici kaynak metni önce parçalara, sonra bir ağaca çevirir; türleri denetler, ara kod üretir ve iyileştirir: hiç kullanılmayan değişkeni atar, sabit hesabı önceden yapar, döngüyü yeniden düzenler, bazen döngüyü aynı anda dört ya da sekiz sayıyı işleyen vektör komutlarına çevirir. Sayfadaki gezgin bunların hiçbirini yapmaz ve bunu açıkça söyler: metinde <code>x * x</code>, <code>sum</code>, <code>factorial</code>, <code>strlen</code> ya da <code>swap</code> parçalarını arar ve hazır bir cevabı gösterir. Bu onu değersiz yapmaz: beş hazır çıktının her biri x86-64 ve System V sözleşmesi için doğru, satır satır izlenebilir koddur. Değersiz olan, ona derleyici muamelesi yapmaktır. Laboratuvardaki ikinci deney tam bu sınırı gösterir; kendi kodunun gerçek çıktısını görmek istediğinde Compiler Explorer'ı (godbolt.org) kullan.",
      formula: "C → (tokenlar) → (ağaç) → (ara kod) → iyileştirme → assembly → assembler → byte'lar",
      formulaNote: "Sayfa bu zincirin yalnızca iki ucunu gösterir; ortadaki adımlar Derleyici ve Yorumlayıcılar sayfasında.",
    },
    {
      heading: "Sayıların bir kenarı var: 32 bit",
      body:
        "C'de <code>int</code>, bu sayfadaki her örnekte 32 bitlik bir kutudur; işaretli olduğu için en büyük değeri 2<sup>31</sup> − 1 = 2 147 483 647'dir. Faktöriyel örneğinde <code>imul eax, edi</code> her turda sonucu büyütür ama kutu büyümez: 12! = 479 001 600 sığar, 13! = 6 227 020 800 sığmaz. Donanım ne yapar? Çarpımın yalnızca alt 32 bitini tutar; bu, sonucu 2<sup>32</sup>'ye göre kalanıyla değiştirmek demektir ve kalan aritmetiğinde çarpmanın sırası fark etmediği için döngü hangi sırayla çarparsa çarpsın aynı deseni bulur. C ne der? İşaretli taşma <strong>tanımsız davranıştır</strong>: derleyici bunun asla olmayacağını varsayıp kodu buna göre iyileştirebilir. Donanımın 'kalan' cevabıyla C'nin 'tanımsız' cevabı arasındaki fark, bu sayfanın en önemli derslerinden biridir.",
      formula: "13! mod 2<sup>32</sup> = 6 227 020 800 − 4 294 967 296 = 1 932 053 504",
      formulaNote: "Sonuç 2³¹'den küçük olduğu için işaretli okunduğunda da pozitif görünür: yanlış ama masum görünüşlü bir sayı.",
    },
  ],
  lab: {
    intro:
      "Sayfada üç etkileşimli bölüm var: üstte tıklanabilir üç <strong>evrim aşaması</strong> (Makine Dili, Assembly, C Dili); ortada bir <strong>C kodu kutusu</strong>, <strong>Derle (C → ASM)</strong> düğmesi ve dört hazır örnek (<strong>sum array</strong>, <strong>factorial</strong>, <strong>strlen</strong>, <strong>swap</strong>); altta tıklanabilir <strong>12 yazmaç kartı</strong> (rax'tan rip'e). İki bölüm ise sabittir: aynı max_value fonksiyonunu hex, AT&T assembly ve C olarak gösteren üç sütun ile en alttaki çağrı düzeni şeması. Gezgin gerçek bir derleyici değil, anahtar sözcük eşleyen bir sözlüktür; deneyler bunu lehine kullanır.",
    experiments: [
      {
        title: "Üç komutluk fonksiyon",
        predict: "Açılıştaki <code>int square(int x) { return x * x; }</code> için kaç assembly komutu beklersin? Belleğe ya da yığına (stack) hiç dokunulur mu?",
        do: "Kutudaki kodu değiştirmeden Derle (C → ASM) düğmesine bas. Çıktıdaki her satırı sırayla oku; sonra yazmaç kartlarından rdi ve rax'a tıklayıp görevlerini karşılaştır. Ardından swap düğmesine bas ve iki çıktıyı kıyasla.",
        observe: "square için etiket dışında tam üç komut: <code>mov eax, edi</code>, <code>imul eax, edi</code>, <code>ret</code>. Köşeli parantez (bellek adresi) yok, push ya da pop yok. rdi kartı '1. fonksiyon argümanı', rax kartı 'dönüş değeri' der. swap'ta ise dört <code>mov</code>'un dördünde de köşeli parantez vardır: <code>[rdi]</code> ve <code>[rsi]</code>.",
        explain: "System V çağrı sözleşmesi x'i edi'de teslim eder, sonucu eax'ta ister; fonksiyonun saklayacağı yerel değişken olmadığından yığın çerçevesi kurmaya gerek kalmaz. swap'ın argümanları ise değer değil adrestir: rdi ve rsi birer işaretçi taşır, köşeli parantez 'bu adresteki belleğe git' demektir. İki çıktı da yalnızca çağıranın koruduğu yazmaçlara (eax, ecx, edi) dokunduğu için hiçbir şeyi saklayıp geri yüklemez.",
      },
      {
        title: "Derleyici mi, sözlük mü?",
        predict: "Değişkenin adını x'ten a'ya çevirirsen gerçek bir derleyici farklı kod üretir mi? Peki sayfadaki gezgin?",
        do: "Kutuyu silip <code>int kare(int a) { return a * a; }</code> yaz ve Derle'ye bas. Sonra en üste tek bir yorum satırı, <code>// sum</code>, ekleyip yeniden derle.",
        observe: "İlk derlemede kare alma kaybolur: <code>func:</code> etiketi, üç açıklama satırı, tek bir <code>ret</code> ve 'basitleştirilmiş bir çıktıdır' notu çıkar. Yorum satırını ekleyince ise kodda döngü olmadığı hâlde dizi toplayan <code>sum:</code> döngüsü (xor, test, jle, add, inc, cmp, jl) görünür.",
        explain: "Gezgin metinde 'x * x', 'sum', 'factorial', 'strlen', 'swap' gibi parçaları sırayla arar; bulduğu ilk eşleşmenin hazır cevabını basar. Gerçek derleyici adlara değil yapıya bakar: a * a ile x * x aynı ağacı verir, yorum satırları ise daha ilk aşamada atılır. Bu deney, sayfanın hangi katta dürüst olduğunu gösterir.",
      },
      {
        title: "Faktöriyel döngüsünü elle çalıştır",
        predict: "n = 5 için <code>imul</code> komutu kaç kez çalışır? n = 0 ve n = 1 için döngüye hiç girilir mi?",
        do: "factorial düğmesine bas (çıktı kendiliğinden yenilenir). Kâğıda iki sütun aç: eax ve edi. edi = 5 ile başla ve çıktıdaki komutları satır satır uygula; her <code>cmp</code>'den sonra <code>jle</code> ya da <code>jg</code>'nin atlayıp atlamadığına karar ver.",
        observe: "eax sırasıyla 1, 5, 20, 60, 120; edi sırasıyla 5, 4, 3, 2, 1. imul tam dört kez çalışır ve edi 1'e düşünce <code>jg .Lloop</code> atlamaz. n = 0 ve n = 1 için ilk <code>cmp edi, 1</code> ardından <code>jle .Ldone</code> doğrudan çıkışa gider; sonuç eax'taki 1'dir.",
        explain: "Döngü, 'sayaç 1'den büyükken çarp ve azalt' deseninin en kısa biçimidir: girişte bir koruma karşılaştırması, sonda bir devam karşılaştırması. C'deki <code>for (int i = n; i &gt; 1; i--)</code> satırı bu iki karşılaştırmaya çevrilir; i için ayrı bir kutu açılmaz, n'nin geldiği edi sayaç olarak kullanılır; 'result' ise hiç belleğe inmeden eax'ta yaşar. Genel kural: n ≥ 2 için n − 1 çarpma.",
      },
      {
        title: "Dallanma ofsetini elle hesapla",
        predict: "Hex sütununun sondan bir önceki satırı <code>7C F2</code>: 'küçükse .loop'a atla'. F2 bir adres mi, bir uzaklık mı? Kaç byte, hangi yöne?",
        do: "'Aynı Fonksiyon, Üç Seviye' bölümündeki hex sütununda her satırın byte'larını say ve satırların başlangıç adreslerini 0'dan başlayarak alt alta yaz. <code>.loop</code> etiketli satırın ve <code>7C F2</code>'den sonraki satırın adresini bul; ikisini birbirinden çıkar. Aynı hesabı <code>7E 17</code> için yap.",
        observe: "Satır uzunlukları 2, 2, 2, 2, 5, 2, 3, 2, 3, 2, 2, 2, 1 byte: toplam 30 byte, 13 komut. <code>.loop</code> 15. byte'ta başlar; <code>7C F2</code> 27. byte'tadır ve ondan sonraki komut (ret) 29'dadır. 15 − 29 = −14. <code>7E 17</code> 4. byte'tadır; sonraki komut 6'da, 6 + 23 = 29: doğrudan ret.",
        explain: "Sekiz bitlik ikiye tümleyende −14, 256 − 14 = 242 = 0xF2 olarak yazılır; 0x17 ise 23'tür. Ofset her zaman bir sonraki komutun adresine eklenir, çünkü işlemci dallanmayı çözdüğünde sayacı çoktan ilerletmiştir. Döngünün içine tek bir komut eklersen iki ofset birden değişir. Bir zamanlar bu hesabı insanlar yapıyordu; etiket ve assembler bu yüzden icat edildi.",
      },
    ],
  },
  wow: [
    {
      title: "Bir yazmaç adında yarım yüzyıl",
      body:
        "1978'de Intel 8086'nın akümülatörü 16 bitti ve adı AX'ti. 1985'te 80386 onu 32 bite genişletti: EAX. 2003'te AMD'nin Opteron'u 64 bite çıkardı: RAX. Bugün dizüstü bilgisayarındaki işlemci üç adı da anlar; hepsi aynı kutunun 8, 16, 32 ve 64 bitlik pencereleridir. Sayfanın yazmaç bölümündeki 'rax → eax → ax → al/ah' zinciri, 1978'de verilmiş bir tasarım kararının bugüne kadar nasıl taşındığının kaydıdır.",
    },
    {
      title: "24 milyar kilometre öteye yama",
      body:
        "1977'de fırlatılan Voyager 1'in bilgisayarları assembly ile programlanmıştır. Kasım 2023'te uçuş veri sistemi anlamsız veri göndermeye başladı; Nisan 2024'te NASA mühendisleri, bozulan bellek yongasındaki kodu belleğin başka bölgelerine taşıyan bir yama gönderdi. Sinyal tek yönde yaklaşık 22.5 saat yol aldı; cevabın dönmesi iki gün sürdü. Yarım asırlık bir makinede, byte'ların tam olarak nerede durduğunu bilmek görevi kurtardı.",
    },
    {
      title: "Otuz yedi saniye ve bir taşma",
      body:
        "4 Haziran 1996'da Ariane 5 roketinin ilk uçuşu, kalkış sıralamasının yaklaşık 37. saniyesinde yönlendirme bilgisayarlarını yitirdi ve birkaç saniye içinde parçalandı. Ariane 4'ten devralınan ataletsel yönlendirme yazılımı, yatay hızla ilgili 64 bitlik kayan noktalı bir değeri 16 bitlik işaretli tamsayıya çevirmeye çalıştı; yeni roket daha hızlıydı ve değer 32 767'yi aştı. Kod C değil Ada'ydı ve taşma sessiz kalmadı: bir istisna fırlattı, istisna da bilgisayarı kapattı. Ders her dilde aynıdır: makine düzeyinde her sayının bir genişliği vardır ve kenarında ne olacağına önceden karar vermek gerekir.",
    },
  ],
  worked: {
    title: "factorial(13) yazmaçlarda ne olur?",
    prompt:
      "Sayfadaki factorial çıktısı 32 bitlik eax yazmacında çalışır. Bu kodu n = 12, n = 13 ve n = 17 ile çağırırsan işlemci hangi sayıları döndürür? Hesabı 2<sup>32</sup> = 4 294 967 296 ile yap.",
    steps: [
      "Döngü sayısını bul: kod edi = n'den başlar ve edi 1'e düşene kadar her turda bir çarpma yapar; n ≥ 2 için imul tam n − 1 kez çalışır. n = 12 için 11, n = 13 için 12 çarpma.",
      "n = 12: 12! = 479 001 600. İşaretli 32 bitin üst sınırı 2<sup>31</sup> − 1 = 2 147 483 647; sığar. eax = 479 001 600, doğru sonuç.",
      "n = 13: gerçek değer 479 001 600 × 13 = 6 227 020 800 = 0x1 7328 CC00. Bu 33 bitlik bir sayıdır; imul sonucun yalnızca alt 32 bitini eax'ta bırakır, yani baştaki 1 düşer: 0x7328CC00 = 6 227 020 800 − 4 294 967 296 = 1 932 053 504. Ara çarpımlar da yol boyunca taşar, ama her adımda 2<sup>32</sup>'ye göre kalan alındığı için son desen değişmez.",
      "Yorumla: 1 932 053 504 sayısı 2<sup>31</sup>'den küçük olduğu için işaretli okunduğunda da pozitiftir; program hata vermez, yalnızca yanlış ve inandırıcı bir sayı basar. Aynı hesabı sürdürürsen 17! mod 2<sup>32</sup> = 0xEECD8000 çıkar; en soldaki bit 1 olduğundan işaretli değeri −288 522 240'tır. Bir faktöriyelin eksi çıkması, taşmanın ancak dört adım gecikmeyle verdiği ilk açık işarettir.",
      "C standardı işaretli taşmayı tanımsız davranış sayar: işlemcinin yaptığı bu 'kalan' hesabına güvenemezsin, başka bir derleyici ya da iyileştirme bayrağıyla başka bir sonuç da çıkabilir. Doğru çözüm, taşmadan önce denetlemek ya da daha geniş bir tür kullanmaktır.",
    ],
    result:
      "factorial(12) = 479 001 600 doğrudur; factorial(13) sessizce 1 932 053 504, factorial(17) ise −288 522 240 döner. 64 bitlik <code>long</code> ile sınır 20!'e çıkar (21! sığmaz), ama kenar hiç yok olmaz.",
  },
  misconceptions: [
    {
      myth: "Bilgisayar C kodunu anlar.",
      truth:
        "İşlemci yalnızca makine dilini yürütür; <code>for</code> ya da <code>return</code> sözcüğünü hiçbir zaman görmez. C bir çeviri sözleşmesidir: yazdığın metni derleyici byte'lara çevirir, sonra o byte'lar çalışır. Sayfadaki üç sütun aynı fonksiyonun bu yolculuktaki üç hâlidir; işlemciye yalnızca en soldaki 30 byte ulaşır.",
    },
    {
      myth: "Elle yazılmış assembly her zaman derleyici çıktısından hızlıdır.",
      truth:
        "1950'lerde doğruydu, bugün çoğunlukla yanlış. Üretim derleyicileri yazmaç dağıtımı, komut sıralaması ve vektörleştirmede çoğu insanı aşar. İnsan, derleyicinin göremediği bir bilgiyi ya da donanım özelliğini kullanabildiği dar noktalarda (kodlayıcı çekirdekleri, şifreleme, önyükleme kodu) hâlâ kazanır; bütün bir programda değil.",
    },
    {
      myth: "Her değişken bellekte bir yerde durur.",
      truth:
        "Derleyici bir değişkeni yalnızca yazmaçta tutabilir, hatta tamamen yok edebilir. square örneğinde x ve sonuç belleğe hiç inmez; factorial'daki result yalnızca eax'ta yaşar, i ise n ile aynı yazmacı paylaşır. Değişken, kaynak koddaki bir addır; makinede karşılığı bir bellek hücresi, bir yazmaç ya da hiçbir şey olabilir.",
    },
    {
      myth: "Assembly tek bir dildir.",
      truth:
        "Her işlemci ailesinin kendi komut kümesi ve kendi assembly'si vardır: x86-64 (çoğu dizüstü ve sunucu), ARM (telefonlar), RISC-V. Bu sayfadaki bütün byte'lar x86-64 içindir; bir telefon işlemcisi onları bambaşka komutlar olarak okur. Üstelik aynı x86-64 kodu iki ayrı yazımla yazılabilir: orta sütun AT&T biçimi (<code>movl (%rdi), %eax</code>), gezgin Intel biçimidir (<code>mov eax, [rdi]</code>). Byte'lar aynıdır, metin değildir.",
    },
  ],
  glossary: [
    { term: "Makine dili", definition: "İşlemcinin doğrudan yürüttüğü, opcode ve operandlardan oluşan byte dizileri; her işlemci ailesinin kendi makine dili vardır." },
    { term: "Opcode", definition: "Bir komutun hangi işlemi yapacağını söyleyen byte ya da byte grubu; 89, x86-64'te 'yazmaçtan kopyala' demektir." },
    { term: "Mnemonik", definition: "Opcode'un insan için kısaltılmış adı: mov, add, cmp, jl; assembler bunu byte'a çevirir." },
    { term: "Assembler", definition: "Assembly metnini makine diline çeviren, etiketleri adrese ve dallanma ofsetine dönüştüren program." },
    { term: "Yazmaç (register)", definition: "İşlemcinin içinde yaşayan, belleğe gitmeden okunup yazılan küçük sayı kutusu; x86-64'te 16 genel amaçlı yazmaç 64 bit genişliğindedir." },
    { term: "Çağrı sözleşmesi (ABI)", definition: "Argümanların hangi yazmaçta geleceğini, sonucun nerede döneceğini ve hangi yazmaçların korunacağını belirleyen kurallar; System V ve Windows x64 kuralları farklıdır." },
    { term: "Derleyici", definition: "Yüksek düzeyli kaynak kodu çözümleyip iyileştirerek assembly ya da makine diline çeviren program; çeviriyi program çalışmadan önce yapar." },
    { term: "Tanımsız davranış", definition: "C standardının sonucuna dair hiçbir söz vermediği durum (işaretli taşma, dizi sınırını aşma); derleyici böyle bir şeyin hiç olmayacağını varsayabilir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bilgisayar mühendisliğinin ilk iki yılında bu sayfanın üç sütunu üç derse dönüşür. <strong>Bilgisayar Organizasyonu</strong> dersi hex sütununu açar: komutlar nasıl kodlanır, işlemci bir komutu kaç aşamada (getir, çöz, yürüt, belleğe eriş, yaz) işler, boru hattı ve önbellek aynı döngünün hızını neden kat kat değiştirir. Çoğu üniversite bunu x86 yerine temiz ve açık bir komut kümesi olan RISC-V ya da MIPS ile öğretir: orada her komut 4 byte'tır ve bu sayfadaki ModRM bulmacası yoktur; ama bir kez yazmaç, yığın ve çağrı sözleşmesi fikrini kavradıysan mimari değiştirmek birkaç haftalık iştir. <strong>Sistem Programlama</strong> dersleri ise GCC'nin ürettiği gerçek x86-64 çıktısını okumayı öğretir: laboratuvardaki ofset hesabı ile faktöriyel izlemesi o derslerin ilk ödevleridir.",
      "C sütunu iki yere açılır. <strong>Derleyici Tasarımı</strong> dersinde kaynak metinden byte'a giden zinciri kendin kurarsın: sözcük çözümleme, ayrıştırma, tür denetimi, ara kod, iyileştirme, yazmaç dağıtımı. <strong>İşletim Sistemleri</strong> ve <strong>Bilgisayar Güvenliği</strong> dersleri ise C'nin bedelini inceler: bir tamponu taşırmak yığındaki dönüş adresini nasıl ezer, işlemci neden bazı bellek sayfalarını çalıştırılamaz işaretler, Rust gibi diller aynı hızı bellek güvenliğinden vazgeçmeden nasıl verir. Bu sayfadaki üç kat, o derslerin ortak haritasıdır.",
    ],
    topics: ["Komut kümesi mimarisi (ISA) ve RISC-V", "Komut kodlama ve adresleme kipleri", "Yığın çerçevesi ve çağrı sözleşmeleri", "Derleyici tasarımı ve yazmaç dağıtımı", "Tanımsız davranış ve bellek güvenliği", "Bağlayıcı ve yükleyici (linker, loader)"],
  },
  quiz: [
    {
      question: "System V ABI'de <code>square(int x)</code> çağrıldığında x hangi yazmaçta gelir, sonuç hangisinde döner?",
      options: ["x rax'ta gelir, sonuç rdi'de döner", "x rdi'de gelir, sonuç rax'ta döner", "x rsi'de gelir, sonuç rdx'te döner", "x yığında gelir, sonuç rbp'de döner"],
      answer: 1,
      explanation: "İlk tamsayı argümanı rdi (32 bitlik int için alt yarısı edi), dönüş değeri rax (int için eax). Sayfanın açılış çıktısı bu yüzden mov eax, edi ile başlar ve sonucu eax'ta bırakıp döner.",
    },
    {
      question: "Bir döngünün sonundaki <code>7C F2</code> (jl, ofset −14) komutundan hemen önce, döngünün içine 3 byte'lık yeni bir komut eklendi. Assembler ofset byte'ını ne yapar?",
      options: ["F2 olarak bırakır; ofset etikete bağlıdır", "F5 yapar; atlama 3 byte kısalır", "EF yapar; atlama 3 byte uzar", "Komutu 5 byte'lık uzun dallanmaya çevirmek zorunda kalır"],
      answer: 2,
      explanation: "Ofset, sonraki komutun adresi ile hedef arasındaki farktır. Araya 3 byte girince geri atlanacak uzaklık 14'ten 17'ye çıkar; −17, sekiz bitlik ikiye tümleyende 256 − 17 = 239 = 0xEF'tir. −128 sınırı aşılmadığı için kısa dallanma yeter. Etiket aynı kalır, byte değişir: assembler'ın varlık nedeni budur.",
    },
    {
      question: "32 bitlik işaretli <code>int</code> ile sayfadaki factorial kodu n = 13 için işlemcide ne üretir?",
      options: ["6 227 020 800", "1 932 053 504", "2 147 483 647", "Sıfır; taşma sonucu siler"],
      answer: 1,
      explanation: "13! = 6 227 020 800, 2³¹ − 1'den büyüktür; eax yalnızca alt 32 biti tutar: 6 227 020 800 − 4 294 967 296 = 1 932 053 504. Program hata vermez, yanlış sayıyı sessizce döndürür; üst sınıra 'yapışma' (2 147 483 647) diye bir şey olmaz.",
    },
  ],
  next: [
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Sistemleri ve Mimarisi", why: "Byte'ları yürüten makinenin içi: getir-çöz-yürüt döngüsü, beş aşamalı işlem hattı, önbellek ve ikiye tümleyen dönüştürücüsü." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "C ile assembly arasında burada boş bırakılan adımlar: token, sözdizimi ağacı, ara kod ve iyileştirme." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "swap örneğindeki köşeli parantezlerin anlamı: adresler, yığın çerçeveleri ve C'nin bedeli." },
    { href: "mantik-kapilari.html", title: "Mantık Kapıları Laboratuvarı", why: "Bir katman daha aşağı: add komutunun altındaki tam toplayıcıyı kapılardan kur, dört bitlik toplamada eldenin yürüyüşünü izle." },
  ],
  sources: [
    { title: "Wikipedia · x86 calling conventions", url: "https://en.wikipedia.org/wiki/X86_calling_conventions", note: "System V AMD64 ve Windows x64 kurallarının karşılaştırmalı tablosu; sayfadaki çağrı düzeni şemasının karşılığı (İngilizce)." },
    { title: "Wikipedia · Assembly language", url: "https://en.wikipedia.org/wiki/Assembly_language", note: "Mnemonik, assembler, makro ve tarihçe; Kathleen Booth ve EDSAC'ın 'ilk emirler'i (İngilizce)." },
    { title: "Vikipedi · C (programlama dili)", url: "https://tr.wikipedia.org/wiki/C_(programlama_dili)", note: "Ritchie, B'den C'ye geçiş, UNIX ve standartlaşma tarihçesi." },
    { title: "MIT OCW · 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", note: "Komut kodlamadan boru hattına uzanan açık lisans dersi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
