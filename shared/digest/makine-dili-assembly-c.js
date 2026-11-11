window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["makine-dili-assembly-c"] = {
  slug: "makine-dili-assembly-c",
  title: "Makine Dili, Assembly ve C: Soyutlamanın Üç Katı",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Her program sonunda bir bayt dizisine iner. Küçük bir öğretim işlemcisine assembly yaz, aynı işlevi C ve x86-64 baytlarıyla satır satır eşleştir; yığını ve bayrakları kendin say.",
  hook:
    "Onaltılık iki sayı: <code>40 01</code>. Bu sayfadaki küçük öğretim işlemcisine bu iki baytı verirsen hiç düşünmeden R1 yazmacını R0'a ekler. Aynı işi bir insan <code>ADD R0, R1</code> diye yazar; bir C programcısı ise yalnızca <code>toplam += sayaç</code> der ve baytları hiç görmez. Peki insanlar baytları elle dizmeyi ne zaman bıraktı, neden bıraktı ve bugün bile neden bazen geri dönüyorlar?",
  bigIdea:
    "Her program, işlemcinin okuduğu bir <strong>bayt dizisine</strong> iner; assembly bu baytlara insanın okuyabileceği adlar verir, C ise 'hangi işlemci?' sorusunu derleyiciye devreder. Yukarı çıktıkça insana, aşağı indikçe makineye yaklaşırsın; ama hiçbir kat ötekini ortadan kaldırmaz.",
  story: [
    "1945'te ENIAC'ı programlamak, duvar boyu panolarda kabloları takıp anahtarları çevirmek demekti; yeni bir hesap için makineyi günlerce yeniden kablolamak gerekiyordu. Program ile veri aynı bellekte, aynı türden sayılar olarak durabilsin fikri 21 Haziran 1948'de Manchester'da ete kemiğe büründü: 'Baby' lakaplı makine, 17 komutluk ilk saklı programı 52 dakika çalıştırıp 2<sup>18</sup> sayısının en büyük öz bölenini buldu. Ama o 17 komut da sayı olarak, elle, bit bit girilmişti. Kathleen Booth'un 1947'de Londra'daki Birkbeck Koleji'nin ARC makinesi için tasarladığı sembolik gösterim genellikle ilk <strong>assembly dili</strong> sayılır. 1949'da çalışmaya başlayan Cambridge'deki EDSAC'ta ise David Wheeler'ın yazdığı 'ilk emirler' programı, programcının <code>A</code> yazıp 'topla' demesine izin veriyor, harfleri sayıya makinenin kendisi çeviriyordu. Baytları insanın yerine makine dizmeye başlamıştı.",
    "Bir sonraki adım daha büyük bir dirençle karşılaştı. 1952'de Grace Hopper hazır alt programları birleştiren A-0'ı yazıp ona 'compiler' adını verdi; 1954–1957 arasında IBM'de John Backus'ın ekibi, matematik formülüne benzeyen satırları IBM 704 makine koduna çeviren FORTRAN'ı çıkardı. Dönemin programcılarının çoğu bunun işe yarayacağına inanmıyordu: makineye yazdırılan kod, kendi elleriyle yazdıkları assembly'den yavaş olacaktı. Backus bu kuşkuyu bildiği için ekip, emeğinin büyük bölümünü üretilen kodu hızlandıran iyileştiriciye verdi. Bugün bu tartışma tersine döndü: üretim derleyicileri, yazmaç dağıtımı ve komut sıralamasında çoğu programcıyı geçer; elle assembly yalnızca video kodlayıcı çekirdekleri, şifreleme ve işletim sistemi tabanı gibi dar noktalarda yazılır.",
    "C'nin hikâyesi 1969'da New Jersey'deki Bell Laboratuvarları'nda, köşede duran bir PDP-7 ile başlar. Ken Thompson o makinede tipsiz bir dil olan B'yi yazdı; 1970'te gelen PDP-11 ise baytları tek tek adresleyebiliyordu ve B bunu anlatamıyordu. Dennis Ritchie 1971–1972 arasında B'ye <strong>türler</strong> ekledi (char, int, işaretçi) ve ortaya çıkan dile C dedi; 1973'te yapılar (struct) da gelince dil bir çekirdek yazacak kadar güçlendi ve aynı yıl UNIX çekirdeği assembly'den C'ye yeniden yazıldı. Birkaç yıl sonra aynı sistem PDP-11'den bambaşka bir mimari olan Interdata 8/32'ye taşındı: bir işletim sistemi, altındaki işlemci değişince baştan yazılmak zorunda kalmamıştı. 1978'de Kernighan ile Ritchie'nin kitabı, 1989'da ANSI standardı geldi. Bugün Linux çekirdeği, Python'ın yaygın yorumlayıcısı ve bu sayfayı gösteren tarayıcının büyük bölümü C ya da onun torunu C++ ile yazılıdır.",
    "C'nin gücünün bedeli de aynı yerden gelir: makineye yakın olmak, makinenin hatalarına da yakın olmaktır. 2 Kasım 1988'de Robert Morris'in yazdığı solucan, yayılma yollarından biri olarak bir ağ hizmetindeki sınır denetimsiz tampona fazla veri yazdı (<strong>buffer overflow</strong>, tampon taşması); binlerce makineye sızdı ve o günkü küçük internetin hatırı sayılır bir bölümünü günlerce uğraştırdı. Aynı hata sınıfı otuz yıl sonra da en sık görülen ciddi güvenlik açıkları arasındaydı. Bu yüzden 2022 sonunda Linux çekirdeği, C'nin yanına ilk kez ikinci bir dil olarak Rust'ı kabul etti. Yine de C'nin verdiği söz değişmedi: yazdığın her satırın altında hangi baytların döneceğini görebilirsin. Bu sayfadaki küçük işlemci o bakışı çalıştırır; üçüncü sekmesinde, denetimsiz bir yazmanın programın kendi baytlarını nasıl ezdiğini zararsız bir makinede izlersin.",
  ],
  core: [
    {
      heading: "Bir komut bir bayt dizisidir",
      body:
        "İlk sekmedeki işlemci gerçek bir yonga değil, fikri en az ayrıntıyla göstermek için tasarlanmış bir <strong>öğretim makinesidir</strong>: sekiz adet 8 bitlik yazmaç (R0–R7), 256 baytlık tek bir bellek ve her biri tam iki bayt tutan komutlar. Birinci baytın üst beş biti <strong>işlem kodudur</strong> (ne yapılacak), alt üç biti hedef yazmacın numarası; ikinci bayt kaynak yazmacı, bir sabiti ya da bir adresi taşır. ADD'in işlem kodu 8'dir: 8 × 8 + 0 = 64 = 0x40, ikinci bayt R1 için 01; böylece <code>ADD R0, R1</code> satırı <code>40 01</code> olur. <code>MOV R2, #9</code> için 3 × 8 + 2 = 26 = 0x1A ve sabit 09: <code>1A 09</code>. Gerçek mimariler aynı fikri daha sıkışık kodlar: ikinci sekmedeki x86-64 panelinde komutlar 1 ile 5 bayt arasında değişir. Oradaki <code>8B 07</code>'de 8B 'yazmaca kopyala' işlem kodudur; 07 = 00 000 111 ikilisinde baştaki 00 'yazmacın kendisi değil, gösterdiği bellek adresi', ortadaki 000 hedef (0 numaralı yazmaç, eax), sondaki 111 adresi tutan yazmaçtır (7 numara, rdi): <code>mov eax, [rdi]</code>, yani max = arr[0]. İşlemci baytları sırayla okur, çözer ve uygular; adlar, boşluklar ve açıklamalar ona hiçbir zaman ulaşmaz.",
      formula: "bayt₁ = işlem kodu × 8 + Rd,   bayt₂ = Rs | sabit | adres   →   ADD R0, R1 = 40 01",
      formulaNote: "Bu kodlama öğretim işlemcisine özgüdür. 29 kodlamanın tamamı, sayfadaki 'Komut kümesi ve kodlama' başlığının altındaki tabloda örnek baytlarıyla durur.",
    },
    {
      heading: "Assembly: aynı komut, insan adıyla",
      body:
        "Assembly makine dilinin üstüne yeni bir güç eklemez; her komut satırı bir makine komutuna karşılık gelir. Eklediği şey adlardır: <strong>anımsatıcılar</strong> (MOV, CMP, JZ), yazmaç adları ve <code>döngü:</code> gibi <strong>etiketler</strong>. Çeviriyi yapan programa <strong>assembler</strong> (çevirici) denir; ikinci sekmede C'yi çeviren <strong>derleyiciden</strong> ayrı bir araçtır ve işi çok daha basittir. Sayfadaki assembler kaynağı iki kez okur: ilk geçişte her satırın adresini sayıp etiketleri bir tabloya yazar, ikinci geçişte baytları üretir. Bu sayede <code>JZ bitti</code> satırı, <code>bitti</code> etiketi daha aşağıda tanımlansa bile sorunsuz çevrilir. Öğretim işlemcisinde atlama komutu hedefin adresini doğrudan taşır: <code>JMP döngü</code>, döngü 0x04 adresinde olduğu için <code>98 04</code> olur. x86-64 panelindeki kısa dallanmalar ise adres değil <strong>uzaklık</strong> taşır: <code>7C F2</code>'de 7C 'küçükse atla', F2 ise ikiye tümleyenle −14'tür; işlemci bir sonraki komutun adresinden 14 bayt geri gider ve <code>.loop</code>'a varır. Panelde iki ayrı yazım da görürsün: orta sütun AT&amp;T biçimidir (kaynak önce, <code>%rdi</code>, <code>$1</code>), hex sütununun açıklamaları Intel biçimidir (hedef önce). <code>movl (%rdi), %eax</code> ile <code>mov eax, [rdi]</code> aynı iki bayttır.",
      formula: "hedef adres = sonraki komutun adresi + ofset   (kısa dallanmada ofset −128 … +127 bayt)",
      formulaNote: "Panelde sına: baytları 0'dan başlayarak sayarsan 7C F2 27. adrestedir, sonraki komut (C3) 29'dadır; 29 − 14 = 15, yani .loop'un ilk baytı (8B). Araya bir komut girince ofsetler kayar; assembler hepsini yeniden hesaplar.",
    },
    {
      heading: "Komut saymak: döngünün ve özyinelemenin bedeli",
      body:
        "Bir programın ne kadar süreceğini tahmin etmenin en dürüst yolu, yürütülen komutları saymaktır; sayfa bunu yapar ve yanına bir <strong>kapalı biçim</strong> koyar. '1'den n'ye toplam' programında döngünün her turu beş komuttur (CMP, JZ, ADD, SUB, JMP). Döngüden önce iki komut, sayaç sıfırlandığında son bir CMP ile JZ, ardından STORE ve HLT çalışır: toplam 5n + 6. Özyineli faktöriyelde hesap bir kat daha derindir, çünkü bu işlemcide çarpma komutu yoktur ve n × (n − 1)! tekrarlı toplamayla bulunur. <code>çarp</code> alt programı R1 = k için 5k + 5 komut yürütür; <code>fakt</code>'ın kendi dokuz komutuyla birlikte bir düzeyin bedeli 5k + 14 olur. Taban durumu 4, ana program 4 komut tutar. Hepsini toplarsan T(n) = 8 + Σ(5k + 14) = 8 + 14n + 5n(n + 1)/2 bulursun: n = 5 için 153, n = 103 için 28.230 komut. Toplam programı n ile doğru orantılı büyürken faktöriyel n² ile büyür; karesel terimi getiren özyineleme değil, her düzeyde yeniden yapılan tekrarlı toplamadır.",
      formula: "toplam: 5n + 6      faktöriyel: T(n) = T(n − 1) + 5n + 14,  T(0) = 8   →   8 + 14n + 5n(n + 1)/2",
      formulaNote: "Kapalı biçim yalnız değiştirilmemiş hazır programlar için gösterilir; kaynağa tek bir komut eklersen kart '—' olur, çünkü formül artık o programın formülü değildir.",
    },
    {
      heading: "Yığın ve çağrı sözleşmesi",
      body:
        "Bir alt program bittiğinde nereye döneceğini bilmek zorundadır. <code>CALL</code> bir sonraki komutun adresini <strong>yığına</strong> yazar ve hedefe atlar; <code>RET</code> o adresi geri çekip program sayacına koyar. Yığın, belleğin sonundan (0xFF) aşağı doğru büyüyen bir bölgedir; tepesini SP (bu makinede R7) gösterir ve derinlik 255 − SP bayttır. Özyineli bir işlev, sonra yeniden gerek duyacağı yazmacı iç çağrı bozmasın diye <code>PUSH</code> ile saklar. Faktöriyelde her düzey iki bayt harcar (saklanan n ve dönüş adresi), ilk çağrı bir bayt: en büyük derinlik 2n + 1. Argümanların hangi yazmaçta geleceğini ve sonucun nerede döneceğini belirleyen kurallara <strong>çağrı sözleşmesi</strong> (ABI) denir. Linux ve macOS'taki System V AMD64 kuralında ilk altı tamsayı ya da işaretçi argümanı sırayla rdi, rsi, rdx, rcx, r8, r9'da gelir, sonuç rax'ta döner; paneldeki max_value bu yüzden diziyi <code>%rdi</code>'den, uzunluğu <code>%esi</code>'den okur ve cevabı <code>%eax</code>'te bırakır. Öğretim işlemcisindeki çeviri aynı rolleri bu sayfaya özgü bir sözleşmeyle R1, R2 ve R0'a verir. Ölçek farkını unutma: burada dönüş adresi 1 bayttır, gerçek 64 bit işlemcilerde 8 bayt tutar.",
      formula: "derinlik = 255 − SP      faktöriyel: 2n + 1 ≤ 256 − 48 = 208 bayt   →   n ≤ 103",
      formulaNote: "48, faktöriyel programının bayt cinsinden boyutudur; yığın ile program aynı 256 baytı paylaşır. Özyineli Fibonacci'de çağrı sayısı çok hızlı büyür (n = 13 için 753 CALL), ama aynı anda tek bir dal açık olduğundan derinlik yalnızca 2n = 26 bayttır.",
    },
    {
      heading: "Elde ile taşma: aynı bitler, iki ayrı soru",
      body:
        "Sekiz bit iki ayrı sayı olarak okunabilir: işaretsiz (0 … 255) ya da ikiye tümleyenle işaretli (−128 … 127). Toplayıcı bu ayrımı bilmez; yalnızca bitleri toplar ve iki ayrı bayrak bırakır. <strong>C (elde)</strong> işaretsiz okuyuşta sonucun sığmadığını, <strong>V (taşma)</strong> işaretli okuyuşta sığmadığını söyler. 127 + 1 = 0x80 işaretsiz okuyana 128, yani doğrudur; işaretli okuyana −128 görünür: C = 0, V = 1. 255 + 1 = 0x00 için durum terstir: işaretsiz okuyuşta 256 sığmaz, işaretli okuyuşta (−1) + 1 = 0 kusursuzdur: C = 1, V = 0. Kaç çiftte ne olduğunu sayabilirsin. Toplamada C = 1 olması A + B ≥ 256 demektir; her A için bunu sağlayan A tane B vardır, toplam 1 + 2 + … + 255 = 32.640 çift. V = 1 iki yerden gelir: iki pozitifin toplamı 127'yi aşar (8.128 çift) ya da iki negatifin toplamı −128'in altına iner (8.256 çift); toplam 16.384, yani 65.536 çiftin tam dörtte biri. Sayfa bu sayıları bütün çiftleri deneyerek de bulur. C dili aynı sınıra başka bir cevap verir: donanım işaretli taşmada sessizce 256'ya (32 bitlik <code>int</code>'te 2<sup>32</sup>'ye) göre kalanı tutar, C standardı ise işaretli taşmayı <strong>tanımsız davranış</strong> sayar; derleyici bunun hiç olmayacağını varsayıp kodu buna göre iyileştirebilir.",
      formula: "V = (en üst basamağa giren elde) ⊕ (oradan çıkan elde)      C = 1 çiftleri: 255 · 256 / 2 = 32.640",
      formulaNote: "⊕ 'ikisi farklıysa 1' demektir. Çıkarmada C bu sayfada borç anlamına gelir (A < B, işaretsiz); bazı işlemci aileleri aynı bayrağı ters kurar. Bayrak tanımları mimariye göre değişir.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeden oluşur. <strong>01 · Küçük işlemci</strong>: öğretim amaçlı, kurgu bir işlemcinin emülatörü. 'Kaynak metin' kutusuna yazdığın assembly her tuşta yeniden baytlara çevrilir; <strong>Tek adım</strong>, <strong>Çalıştır</strong>, <strong>Sonuna kadar</strong> düğmeleri, 'Program' menüsündeki dört hazır program, yazmaçlar, bayraklar ve 256 baytlık bellek ızgarası buradadır. <strong>02 · C'den makine koduna</strong>: aynı max_value işlevinin doğrulanmış x86-64 baytları, AT&amp;T assembly'si ve C kaynağı yan yana durur; 'Eşleştirilecek adım' menüsü dokuz adımı üç sütunda ve öğretim işlemcisine elle yapılmış çeviride birlikte işaretler. <strong>03 · Yığın ve çağrı</strong>: özyineli programlarda yığın derinliğini, CALL ve komut sayılarını ölçüp kuramla karşılaştırır. <strong>04 · Bayraklar ve taşma</strong>: 8 bitlik bir işlemin bitlerini, dört bayrağı ve 65.536 çiftin haritasını gösterir. Sayfadaki tek gerçek mimari kodu ikinci sekmedeki paneldir; geri kalan her şey öğretim işlemcisinin kendi komut kümesidir. Yazı kutusu dışında <kbd>Boşluk</kbd> çalıştırır ya da duraklatır, <kbd>R</kbd> etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Döngünün bedeli: 5n + 6",
        predict: "Açılıştaki '1'den n'ye toplam' programı n = 10 için kaç komut yürütür? n'yi 23 yaparsan bellekteki sonuç 276 olur mu?",
        do: "01 · Küçük işlemci sekmesinde hiçbir şeyi değiştirmeden <strong>Tek adım</strong>'a art arda bas; listede turkuaz satırın 04 ile 0C adresleri arasında dönmesini ve R0 ile R1'in değişmesini izle. Sonra <strong>Sonuna kadar</strong>'a bas. 'n' kaydırıcısını 23'e, ardından 0'a getirip her seferinde yine <strong>Sonuna kadar</strong> de.",
        observe: "n = 10: 'Yürütülen komut (sayılan)' 56, 'Kapalı biçim 5n + 6' 56, fark 0; sonuç '55 · 0x37'. 'Program sayacının izi' grafiğinde on dişli bir testere çıkar. n = 23: 121 komut, sonuç '20 · 0x14', beklenen sonuç '20 (276 mod 256)'. n = 0: yalnızca 6 komut, sonuç 0. Program boyutu hep '20 bayt · 9 komut'tur.",
        explain: "Dokuz komutluk bir program 121 komut yürütebilir, çünkü JMP aynı beş komutu yeniden çalıştırır; testerenin her dişi bir geri atlamadır. Döngü dışındaki altı komut n'den bağımsızdır, n = 0'da geriye yalnız onlar kalır. 276 ise sekiz bite sığmaz: yazmaç 256'yı sessizce atar ve 20 kalır. Sonucun doğru çıktığı en büyük n 22'dir (253).",
      },
      {
        title: "Bir C satırı kaç komut eder?",
        predict: "C'deki <code>if (arr[i] &gt; max) max = arr[i];</code> satırı x86-64 panelinde kaç komuta, kaç bayta karşılık gelir; içinde bir dallanma var mı? Yedi sayıyı küçükten büyüğe ya da büyükten küçüğe dizmek, yürütülen komut sayısını değiştirir mi?",
        do: "02 · C'den makine koduna sekmesinde 'Eşleştirilecek adım' menüsünden sırayla 5., 6. ve 8. adımı seç; her seferinde üç sütundaki sarı satırlara, alttaki açıklamaya ve öğretim işlemcisi listesine bak. Sonra 'Dizi' kutusuna <code>1, 2, 3, 4, 5, 6, 7</code>, ardından <code>7, 6, 5, 4, 3, 2, 1</code> yaz; son olarak kutuyu tamamen boşalt.",
        observe: "5. adım: <code>8B 14 8F</code> ve <code>39 D0</code>, iki komut, beş bayt; öğretim listesinde dört satır (MOV, ADD, LOAD, CMP). 6. adım: tek satır <code>0F 4C C2</code>; öğretim listesinde iki satır (<code>JGE atla</code> ve <code>MOV R0, R5</code>). 8. adım: <code>39 F1</code> ile <code>7C F2</code>, açıklamada 'F2 işaretli okununca −14'. Açılıştaki dizide sonuç '90 · 0x5A', 65 komut. Artan dizi 68, azalan dizi 62 komut; boş dizi 9 komut ve sonuç 0. 'İşlevin boyutu' kartı: öğretim 16 komut, 32 bayt; x86-64 13 komut, 30 bayt.",
        explain: "x86-64, 'max küçükse kopyala' işini dallanmasız tek bir koşullu taşıma komutuyla, dizi elemanının adresini de komutun içine gömülü rdi + rcx × 4 hesabıyla yapar. Öğretim işlemcisinde ikisi de yoktur: adres MOV ve ADD ile elle kurulur, koşullu taşıma yerine MOV'un üstünden atlanır. Komut sayısı 8L + 6 + u'dur; u, en büyüğün kaç kez güncellendiğidir. Artan dizide her eleman yeni rekor olduğundan u = 6, azalan dizide u = 0: aynı veri, altı komut fark. Paneldeki 30 bayt belirli bir derleyicinin çıktısı diye değil, C işleviyle aynı sonucu verdiği sınanmış bir çeviri olarak sunulur.",
      },
      {
        title: "Yığın ne kadar derine iner, ne zaman taşar?",
        predict: "5! hesaplanırken yığında en çok kaç bayt birikir? Yığına 208 bayt yer varsa hangi n'de yer biter?",
        do: "03 · Yığın ve çağrı sekmesinde 'Özyineli faktöriyel' ve n = 5 ile yedi kez <strong>Tek adım</strong>'a bas ve 'Yığın (tepe en üstte)' panelini oku; sonra <strong>Sonuna kadar</strong>. 'n' kaydırıcısını 103'e, ardından 104'e getirip her seferinde <strong>Sonuna kadar</strong> de. Sonra n = 120'de 'Yığın koruması açık' kutusunun işaretini kaldırıp yinele; koruma kapalıyken son olarak n'yi 104'e indirip bir kez daha <strong>Sonuna kadar</strong> de.",
        observe: "Yedi adımdan sonra yığında üç hücre vardır: 'dönüş adresi → 0x16 (satır 14)', 'R1 = 5 · saklanan yazmaç: n', 'dönüş adresi → 0x04 (satır 4)'. Bitince: en büyük derinlik 11 bayt (kuramla fark 0), CALL 11, komut 153, sonuç 120. n = 103: 207 bayt, 28.230 komut. n = 104: 521 komuttan sonra 'Yığın taşması: sıradaki yazma 0x2F adresine …'. Koruma kapalı, n = 120: 591 komutta 'Geçersiz işlem kodu: PC = 0x14 adresindeki 0x03 baytı bir komut değil'; yığın 28 hücreyi (0x14–0x2F) ezmiştir. Koruma kapalı, n = 104: HLT'ye ulaşır (28.764 komut, 209 bayt); ezilen tek hücre 0x2F, <code>sonuç</code> veri baytıdır.",
        explain: "Her düzey iki bayt harcar, ilk çağrı bir bayt: 2n + 1. Kapasite 256 − 48 = 208 bayt olduğundan 103 (207 bayt) sığar, 104 (209 bayt) sığmaz. Koruma açıkken makine yazmadan durur. Kapalıyken yığın programı sondan başa doğru ezer; n = 120'de işlemci, yığına saklanmış bir n değerini (0x03) komut sanar. n = 104'te taşan tek bayt komuta değil, sonda zaten yeniden yazılan <code>sonuç</code> hücresine denk gelir ve hiçbir şey kırılmış görünmez. Bellek hatalarının sinsiliği budur: belirti, ezilen baytın ne olduğuna bağlıdır. Gerçek işletim sistemleri bu yüzden yığının altına erişilemez bir bellek sayfası koyar.",
      },
      {
        title: "Elde ile taşma aynı şey değil",
        predict: "127 + 1, 255 + 1 ve 128 + 128 işlemlerinden hangisi C bayrağını, hangisi V bayrağını kurar? 200 ile 100 karşılaştırıldıktan sonra 'küçükse atla' gerçekleşir mi?",
        do: "04 · Bayraklar ve taşma sekmesinde sırayla <strong>127 + 1</strong>, <strong>255 + 1</strong>, <strong>128 + 128</strong> ve <strong>CMP 200, 100</strong> düğmelerine bas. Her birinde 'Elde girişi' satırına, iki 'gerçek sonuç' kartına, haritadaki artı işaretinin düştüğü renge ve atlama tablosuna bak.",
        observe: "127 + 1: sonuç '0x80 · işaretsiz 128 · işaretli −128', C = 0, V = 1; artı mor bölgededir. 255 + 1: 0x00, Z = 1, C = 1, V = 0; turuncu bölge. 128 + 128: 0x00, C = 1, V = 1; işaretli kart '(−128) + (−128) = −256 · −128 … 127 dışında' der, bölge kırmızıdır. CMP 200, 100: bayraklar Z = 0, C = 0, N = 0, V = 1; JC atlamaz, JNC atlar, JLT atlar, JGE atlamaz. Sayım kartları seçtiğin çifte değil işleme bağlıdır ve dört düğmede de aynı kalır: C = 1 olan 32.640 çift, V = 1 olan 16.384 çift, ikisi birlikte 8.256 çift; sayılan ile kapalı biçim eşittir.",
        explain: "Toplayıcı tektir, soru iki tanedir. 200 ile 100'ü işaretsiz okursan 200 ≥ 100'dür ve C bunu doğru söyler; işaretli okursan aynı bitler −56'dır, −56 &lt; 100 olduğundan N ≠ V tutar ve JLT atlar. İki atlama da doğrudur, yalnız farklı soruları yanıtlar; hangisinin seçileceğini sayının türü belirler ve C'de bu kararı derleyici verir. Toplamada 'ikisi birlikte' sayısı da rastlantı değildir: iki negatif sayının en üst bitleri 1 olduğundan toplamları hep elde çıkarır, yani 8.256 negatif taşmanın hepsi eldedir; iki pozitifin toplamı 254'ü geçemediğinden 8.128 pozitif taşmanın hiçbiri elde üretmez.",
      },
    ],
  },
  wow: [
    {
      title: "Bir yazmaç adında yarım yüzyıl",
      body:
        "1978'de Intel 8086'nın akümülatörü 16 bitti ve adı AX'ti. 1985'te 80386 onu 32 bite genişletti: EAX. 2003'te AMD'nin Opteron'u 64 bite çıkardı: RAX. Bugün dizüstü bilgisayarındaki işlemci üç adı da anlar; hepsi aynı kutunun farklı genişlikteki pencereleridir. Sayfadaki x86-64 panelinde ikisini yan yana görürsün: adres taşıyan <code>%rdi</code> 64 bitlik, <code>int</code> taşıyan <code>%eax</code> 32 bitlik addır. 1978'de verilmiş bir tasarım kararı bugünün kodunda hâlâ okunur.",
    },
    {
      title: "24 milyar kilometre öteye yama",
      body:
        "1977'de fırlatılan Voyager 1'in bilgisayarları assembly ile programlanmıştır. Kasım 2023'te uçuş veri sistemi anlamsız veri göndermeye başladı; Nisan 2024'te NASA mühendisleri, bozulan bellek yongasındaki kodu belleğin başka bölgelerine taşıyan bir yama gönderdi. Sinyal tek yönde yaklaşık 22.5 saat yol aldı; cevabın dönmesi iki gün sürdü. Yarım asırlık bir makinede, baytların tam olarak nerede durduğunu bilmek görevi kurtardı.",
    },
    {
      title: "Otuz yedi saniye ve bir taşma",
      body:
        "4 Haziran 1996'da Ariane 5 roketinin ilk uçuşu, ana motorun ateşlenmesinden yaklaşık 37 saniye sonra yönlendirme bilgisayarlarını yitirdi ve birkaç saniye içinde parçalandı. Ariane 4'ten devralınan ataletsel yönlendirme yazılımı, yatay hızla ilgili 64 bitlik kayan noktalı bir değeri 16 bitlik işaretli tamsayıya çevirmeye çalıştı; yeni roket daha hızlıydı ve değer 32.767'yi aştı. Kod C değil Ada'ydı ve taşma sessiz kalmadı: bir istisna fırlattı, istisna da bilgisayarı kapattı. Ders her dilde aynıdır: makine düzeyinde her sayının bir genişliği vardır ve kenarında ne olacağına önceden karar vermek gerekir.",
    },
  ],
  worked: {
    title: "103! sığar, 104! taşar: yığın ve komut hesabı",
    prompt:
      "Öğretim işlemcisinde özyineli faktöriyel programı 48 bayt tutar; bellek 256 bayttır ve yığın 0xFF adresinden aşağı büyür. (a) Koruma açıkken taşmadan çalışan en büyük n kaçtır? (b) Bu n için kaç komut yürütülür ve en yüksek hızda (500 komut/s) izlemek ne kadar sürer? (c) Bellekteki sonuç ne olur?",
    steps: [
      "Yığına kalan yer: 256 − 48 = 208 bayt. Ana programın <code>CALL fakt</code> komutu yığına 1 bayt (dönüş adresi) yazar. n &gt; 0 olan her düzey <code>PUSH R1</code> ile 1 bayt, içteki <code>CALL fakt</code> ile 1 bayt daha ekler. En derin anda, yani fakt(0) çalışırken, yığında 1 + 2n bayt vardır.",
      "Koşul 2n + 1 ≤ 208, yani n ≤ 103.5. En büyük tam sayı n = 103; derinlik 2 · 103 + 1 = 207 bayt, bir bayt boş kalır. n = 104 için 209 bayt gerekir: 208. bayttan sonraki yazma 0x2F adresine, programın son baytına (<code>sonuç</code> verisinin durduğu hücreye) düşer ve makine yazmadan durur.",
      "Komut sayısı: <code>çarp</code> alt programı R1 = k için 2 + 5k + 3 = 5k + 5 komut yürütür (iki hazırlık, k tur, son sınama ve RET). fakt(k), k &gt; 0 için kendi dokuz komutunu, fakt(k − 1)'i ve çarp'ı çalıştırır: T(k) = T(k − 1) + 5k + 14. fakt(0) dört, ana program dört komuttur. Toplam: 8 + 14n + 5n(n + 1)/2.",
      "n = 103 için: 14 · 103 = 1.442 ve 5 · 103 · 104 / 2 = 26.780; toplam 8 + 1.442 + 26.780 = 28.230 komut. Bunun 26.780'i, yani yaklaşık yüzde 95'i tekrarlı toplamanın karesel terimidir. 500 komut/s hızla 28.230 / 500 ≈ 56 s sürer; açılıştaki 10 komut/s ile 2.823 s, yani yaklaşık 47 dakika. <strong>Sonuna kadar</strong> düğmesi aynı sayımı anında yapar.",
      "Sonuç: yazmaçlar 8 bit olduğundan her çarpım 256'ya göre kalanıyla saklanır. 10! = 3.628.800 sayısının içinde 2<sup>8</sup> çarpanı vardır (10, 8, 6, 4 ve 2'den toplam sekiz tane 2 gelir), yani 10! mod 256 = 0; sıfır bir kez oluştu mu sonraki bütün çarpımlar da sıfırdır. 103! mod 256 = 0.",
    ],
    result:
      "En büyük n = 103: en büyük derinlik 207 bayt (kuramla fark 0), 207 CALL, 28.230 komut, sonuç '0 (beklenen 0, 103! mod 256)'. Üçüncü sekmede n = 103 ve <strong>Sonuna kadar</strong> ile aynı sayıları okursun; n = 104'te makine 521 komuttan sonra yığın taşmasıyla durur. Sonucun doğru çıktığı son değer ise çok daha erkendedir: 5! = 120 sığar, 6! = 720 sığmaz.",
  },
  misconceptions: [
    {
      myth: "Bilgisayar C kodunu anlar.",
      truth:
        "İşlemci yalnızca makine dilini yürütür; <code>for</code> ya da <code>return</code> sözcüğünü hiçbir zaman görmez. C bir çeviri sözleşmesidir: yazdığın metni derleyici baytlara çevirir, sonra o baytlar çalışır. İkinci sekmedeki üç sütun aynı işlevin bu yolculuktaki üç hâlidir; işlemciye yalnızca en soldaki 30 bayt ulaşır. C'de tek satır olan <code>for</code> bile orada üç ayrı yere dağılır: başlangıç, artırma ve sınama.",
    },
    {
      myth: "Her değişken bellekte bir yerde durur.",
      truth:
        "Derleyici bir değişkeni yalnızca yazmaçta tutabilir, hatta tamamen yok edebilir. Paneldeki max_value'da <code>max</code> bütün ömrünü <code>%eax</code>'te, <code>i</code> ise <code>%ecx</code>'te geçirir; ikisi de belleğe hiç yazılmaz. Değişken, kaynak koddaki bir addır; makinede karşılığı bir bellek hücresi, bir yazmaç ya da hiçbir şey olabilir. İyileştirme kapalıyken derleyiciler değişkenleri çoğunlukla yığında tutar; bu bir zorunluluk değil, hata ayıklamayı kolaylaştıran bir tercihtir.",
    },
    {
      myth: "Elde bayrağı kurulduysa sonuç yanlıştır.",
      truth:
        "Elde yalnızca işaretsiz okuyuş için bir uyarıdır. 255 + 1 işleminde C = 1 olur; ama aynı bitleri işaretli okuyan biri için (−1) + 1 = 0 tam da doğru cevaptır. Tersine, 127 + 1'de C = 0'dır ve işaretli sonuç yine de yanlıştır (−128); onu V bayrağı haber verir. Dördüncü sekmedeki haritada turuncu ve mor bölgelerin ayrı yerlerde durması bu yüzdendir.",
    },
    {
      myth: "Assembly tek bir dildir.",
      truth:
        "Her işlemci ailesinin kendi komut kümesi ve kendi assembly'si vardır: x86-64 (çoğu dizüstü ve sunucu), ARM (telefonlar), RISC-V. Bu sayfada bile iki ayrı makine dili yan yana durur: paneldeki 30 bayt x86-64 içindir, ilk sekmedeki iki baytlık komutları ise yalnızca öğretim işlemcisi anlar. Üstelik aynı x86-64 kodu iki ayrı yazımla yazılabilir: orta sütun AT&amp;T biçimi (<code>movl (%rdi), %eax</code>), hex sütununun açıklamaları Intel biçimidir (<code>mov eax, [rdi]</code>). Baytlar aynıdır, metin değildir.",
    },
  ],
  glossary: [
    { term: "Makine dili", definition: "İşlemcinin doğrudan yürüttüğü, işlem kodu ve işlenenlerden oluşan bayt dizileri; her işlemci ailesinin kendi makine dili vardır." },
    { term: "İşlem kodu (opcode)", definition: "Bir komutun hangi işlemi yapacağını söyleyen bit ya da bayt grubu; öğretim işlemcisinde ilk baytın üst beş bitidir." },
    { term: "Assembler (çevirici)", definition: "Assembly metnini makine diline çeviren, etiketleri adrese ya da dallanma uzaklığına dönüştüren program." },
    { term: "Yazmaç (register)", definition: "İşlemcinin içinde duran, belleğe gitmeden okunup yazılan küçük sayı kutusu; öğretim işlemcisinde sekiz tane ve 8 bit, x86-64'te on altı genel amaçlı yazmaç 64 bit genişliğindedir." },
    { term: "Yığın (stack)", definition: "Dönüş adreslerinin ve saklanan yazmaçların son giren ilk çıkar düzeniyle tutulduğu bellek bölgesi; tepesini yığın göstergesi (SP) gösterir." },
    { term: "Çağrı sözleşmesi (ABI)", definition: "Argümanların hangi yazmaçta geleceğini, sonucun nerede döneceğini ve hangi yazmaçların korunacağını belirleyen kurallar; System V ve Windows x64 kuralları farklıdır." },
    { term: "Bayrak", definition: "Son aritmetik ya da mantık işleminin sonucunu özetleyen tek bitlik işaret; bu sayfada Z (sıfır), C (elde ya da borç), N (en üst bit) ve V (işaretli taşma)." },
    { term: "Tanımsız davranış", definition: "C standardının sonucuna dair hiçbir söz vermediği durum (işaretli taşma, dizi sınırını aşma); derleyici böyle bir şeyin hiç olmayacağını varsayabilir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bilgisayar mühendisliğinin ilk iki yılında bu sayfanın sekmeleri ayrı derslere dönüşür. <strong>Bilgisayar Organizasyonu</strong> dersi ilk sekmeyi açar: komutlar nasıl kodlanır, işlemci bir komutu kaç aşamada (getir, çöz, yürüt, belleğe eriş, yaz) işler, boru hattı ve önbellek aynı döngünün hızını neden kat kat değiştirir. Pek çok üniversite bunu x86 yerine temiz ve açık bir komut kümesi olan RISC-V ya da MIPS ile öğretir: orada her komut 4 bayttır ve paneldeki ModRM bulmacası yoktur; buradaki iki baytlık öğretim işlemcisi o sadeliğin küçük bir provasıdır. Bir kez yazmaç, yığın ve çağrı sözleşmesi fikrini kavradıysan mimari değiştirmek birkaç haftalık iştir. <strong>Sistem Programlama</strong> dersleri ise bir derleyicinin ürettiği gerçek x86-64 çıktısını okumayı öğretir: dallanma ofsetini elle hesaplamak, bir döngünün komutlarını saymak ve yığındaki dönüş adreslerini izlemek o derslerin ilk ödevlerindendir.",
      "C sütunu iki yere açılır. <strong>Derleyici Tasarımı</strong> dersinde kaynak metinden bayta giden zinciri kendin kurarsın: sözcük çözümleme, ayrıştırma, tür denetimi, ara kod, iyileştirme, yazmaç dağıtımı. <strong>İşletim Sistemleri</strong> ve <strong>Bilgisayar Güvenliği</strong> dersleri ise C'nin bedelini inceler: bir tamponu taşırmak yığındaki dönüş adresini nasıl ezer, işlemci neden bazı bellek sayfalarını çalıştırılamaz işaretler, Rust gibi diller aynı hızı bellek güvenliğinden vazgeçmeden nasıl verir. Üçüncü sekmede korumayı kapatıp gördüğün bozulma, o derslerde ayrıntısıyla çözümlenen hata sınıfının en yalın örneğidir.",
    ],
    topics: ["Komut kümesi mimarisi (ISA) ve RISC-V", "Komut kodlama ve adresleme kipleri", "Yığın çerçevesi ve çağrı sözleşmeleri", "İkiye tümleyen aritmetiği ve durum bayrakları", "Derleyici tasarımı ve yazmaç dağıtımı", "Tanımsız davranış ve bellek güvenliği"],
  },
  quiz: [
    {
      question: "Özyineli faktöriyel programı 48 bayttır ve koruma açıkken n = 103'e kadar taşmadan çalışır. Programa iki baytlık bir komut daha eklenirse taşmadan çalışan en büyük n kaç olur?",
      options: ["104; program büyüdükçe yığın da büyür", "103; bir komut bir şey değiştirmez", "101", "102"],
      answer: 3,
      explanation: "Program ile yığın aynı 256 baytı paylaşır: program 50 bayt olunca yığına 206 bayt kalır. Derinlik 2n + 1 olduğundan 2n + 1 ≤ 206, yani n ≤ 102.5. n = 102 için 205 bayt sığar; n = 103 artık 207 bayt ister. Yeni kodlar eklerken yığın payını da hesaba katmak, küçük belleği olan gömülü sistemlerde gündelik bir kaygıdır.",
    },
    {
      question: "x86-64 panelinde döngünün sonundaki <code>7C F2</code> (jl, ofset −14) komutunu düşün. <code>.loop</code> ile <code>.check</code> arasına, döngü gövdesine 3 baytlık yeni bir komut eklenirse assembler bu ofset baytını ne yapar?",
      options: ["F2 olarak bırakır; ofset etikete bağlıdır", "EF yapar; atlama 3 bayt uzar", "F5 yapar; atlama 3 bayt kısalır", "Kısa dallanma yetmez; 6 baytlık uzun dallanmaya çevirir"],
      answer: 1,
      explanation: "Ofset, sonraki komutun adresi ile hedef arasındaki farktır. Araya 3 bayt girince geri atlanacak uzaklık 14'ten 17'ye çıkar; −17, sekiz bitlik ikiye tümleyende 256 − 17 = 239 = 0xEF'tir. −128 sınırı aşılmadığı için iki baytlık kısa dallanma yeter. Aynı nedenle yukarıdaki <code>EB 0A</code> (jmp .check) da <code>EB 0D</code> olur. Etiket aynı kalır, bayt değişir: assembler'ın varlık nedeni budur.",
    },
    {
      question: "İki bayt işaretli sayı olarak yorumlanacak: A = 0xC8 (işaretsiz 200, işaretli −56) ve B = 0x64 (100). <code>CMP A, B</code>'den sonra 'A küçükse atla' demek için öğretim işlemcisinde hangi atlama kullanılmalı ve atlama gerçekleşir mi?",
      options: ["JC; gerçekleşir, çünkü çıkarma borç ister", "JC; gerçekleşmez, çünkü 200 ≥ 100", "JLT; gerçekleşir, çünkü N ≠ V", "JLT; gerçekleşmez, çünkü sonuç pozitif"],
      answer: 2,
      explanation: "CMP 200, 100 sonucu 0x64 bırakır: N = 0. İşaretli okuyuşta (−56) − 100 = −156, −128'in altındadır: V = 1. N ≠ V olduğundan JLT atlar; −56 &lt; 100 doğrudur. JC işaretsiz karşılaştırmadır: 200 ≥ 100 olduğu için C = 0'dır ve atlamaz. Yalnız sonucun işaretine (N) bakmak da yanıltırdı; taşma olduğunda işaret ters döner, V bunu düzeltir.",
    },
  ],
  next: [
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Mimarisi Laboratuvarı", why: "Baytları yürüten makinenin içi: 8, 16 ve 32 bitte ikiye tümleyen, beş aşamalı boru hattı, önbellek ve başarım denklemi." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "C ile assembly arasında burada boş bırakılan adımlar: tokenleştirici, sözdizimi ağacı ve derleme aşamaları." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "Paneldeki (%rdi) parantezinin C'deki karşılığı: adresler, işaretçi aritmetiği, çağrı yığınının çerçeveleri ve bellek sızıntısı." },
    { href: "mantik-kapilari.html", title: "Mantık Kapıları Laboratuvarı", why: "Bir katman daha aşağı: 'Elde girişi' satırının altındaki tam toplayıcıyı kapılardan kur, dört bitlik toplamada taşımanın yürüyüşünü izle." },
  ],
  sources: [
    { title: "Wikipedia · x86 calling conventions", url: "https://en.wikipedia.org/wiki/X86_calling_conventions", note: "System V AMD64 ve Windows x64 kurallarının karşılaştırmalı tablosu; paneldeki rdi, esi ve eax rollerinin kaynağı (İngilizce)." },
    { title: "Wikipedia · Assembly language", url: "https://en.wikipedia.org/wiki/Assembly_language", note: "Anımsatıcı, assembler, makro ve tarihçe; Kathleen Booth ve EDSAC'ın 'ilk emirler'i (İngilizce)." },
    { title: "Vikipedi · C (programlama dili)", url: "https://tr.wikipedia.org/wiki/C_(programlama_dili)", note: "Ritchie, B'den C'ye geçiş, UNIX ve standartlaşma tarihçesi." },
    { title: "MIT OCW · 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", note: "Komut kodlamadan yığına, çağrı düzeninden boru hattına uzanan açık lisans dersi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
