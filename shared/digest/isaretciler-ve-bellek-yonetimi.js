window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["isaretciler-ve-bellek-yonetimi"] = {
  slug: "isaretciler-ve-bellek-yonetimi",
  title: "İşaretçiler ve Bellek: Adresi Elinde Tutmak",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir değişkenin değerini değil adresini saklamak, programcıya belleğin anahtarını verir: en hızlı veri yapıları da, 1988'de interneti durduran solucan da aynı anahtarla açıldı.",
  hook:
    "2 Kasım 1988 gecesi, o günkü internetin tahminen onda biri birkaç saat içinde işlemez hâle geldi. Saldıran bir ordu değil, bir lisansüstü öğrencisinin yazdığı tek bir programdı; içeri girdiği kapılardan biri, 512 baytlık bir kutuya 536 bayt yazdırmaktan ibaretti. Bu sayfadaki küçük hücrelerde, bir adresin nasıl hem güç hem tehlike olduğunu kendi elinle göreceksin.",
  bigIdea:
    "Bir <strong>işaretçi</strong>, değerin kendisini değil değerin bellekteki <em>adresini</em> tutar: <code>p = &amp;x</code> adresi alır, <code>*p</code> o adrese gider. Yığındaki bellek fonksiyonla birlikte kendiliğinden gelir ve gider; öbekten aldığın her baytı ise geri vermek senin sorumluluğundur.",
  story: [
    "1945'te John von Neumann, EDVAC raporunda belleği numaralı hücrelerden oluşan tek bir sıra olarak tarif etti: her hücrenin bir numarası, yani bir <strong>adresi</strong> vardı. Makine dilinde adreslerle oynamak ilk günden beri mümkündü; ama bir değişkenin içine başka bir değişkenin adresini koymak, yüksek düzeyli dillere yirmi yıl sonra girdi. 1964'te IBM'de çalışan Harold Lawson, PL/I diline 'pointer' adını verdiği bir değişken türü ekledi; liste ve ağaç gibi birbirine bağlı yapılar artık dilin içinde kurulabiliyordu. IEEE bu buluş için Lawson'a 2000 yılında Computer Pioneer ödülünü verdi. Aynı yıllarda Tony Hoare, ALGOL W dilinde 'hiçbir yeri göstermeyen' özel değeri, <strong>null</strong>'ı tanıttı (1965). Kırk dört yıl sonra, 2009'da bir konferansta bunu 'milyar dolarlık hatam' diye andı.",
    "İşaretçiyi gündelik araca çeviren dil C oldu. Ken Thompson'ın 1969'daki B dilinden yola çıkan Dennis Ritchie, 1972 dolaylarında Bell Laboratuvarları'nda C'yi tasarladı; 1973'te Unix çekirdeğinin büyük bölümü C ile yeniden yazıldı. C'nin tavrı açıktı: makineye yakın kal, programcıya adreslerle aritmetik yapma hakkı ver, çalışma anında onun arkasından denetleme yapma. Bu özgürlüğün iki yüzü vardı. Bir yüzünde, fonksiyon çağrılarının bir <strong>yığın</strong> üzerinde kendiliğinden yer bulması (Edsger Dijkstra 1960'ta özyinelemeli çağrıların yığınla nasıl yürütüleceğini ALGOL 60 için yazmıştı); öbür yüzünde, programcının <code>malloc</code> ile aldığı her bellek parçasını <code>free</code> ile kendisinin geri vermesi gerekliliği. Kernighan ve Ritchie'nin 1978 tarihli kitabı, böyle bir ayırıcının nasıl yazılacağını sekizinci bölümde bizzat gösterir: boş parçaların bağlı listesi, her parçanın başında bir boyut etiketi.",
    "Bedel, 1988'de ortaya çıktı. Cornell'de lisansüstü öğrencisi olan Robert Tappan Morris'in yazdığı solucan, Unix'in <code>fingerd</code> servisindeki sınır denetimsiz bir <code>gets()</code> çağrısına 536 bayt göndererek yığındaki dönüş adresinin üzerine yazdı ve kendi kodunu çalıştırdı. Yaygın tahmine göre o günkü yaklaşık 60 bin internet makinesinin altı bin kadarı etkilendi; bu sayının kendisi de bir tahmindir, daha düşük kestirimler vardır. 1996'da Phrack dergisindeki 'Smashing the Stack for Fun and Profit' yazısı tekniği herkesin okuyabileceği bir tarife dönüştürdü. 2014'teki Heartbleed açığı ise yazmayı değil okumayı kullandı: OpenSSL, bir mesajın iddia ettiği uzunluğa güvenip belleğinden her istekte 64 kilobayta kadar veri sızdırdı. Microsoft'tan bir güvenlik mühendisi 2019'da şirketin yamaladığı açıkların yaklaşık yüzde 70'inin bellek güvenliği hatası olduğunu bildirdi; Chromium ekibi 2020'de kendi ciddi güvenlik hataları için aynı oranı buldu.",
    "Cevaplar da sırayla geldi: John McCarthy'nin 1950'lerin sonunda Lisp için tasarladığı çöp toplayıcı, Bjarne Stroustrup'un C++'ta kaynağı nesnenin ömrüne bağlayan RAII fikri, 2011'de C++11 ile standarda giren <code>unique_ptr</code> ve <code>shared_ptr</code>, 2015'te 1.0 sürümüne ulaşan ve sahipliği derleme anında denetleyen Rust. Aralık 2022'de yayımlanan Linux 6.1 çekirdeği, otuz yılı aşan tarihinde ilk kez C ve assembly'nin yanına ikinci bir dili, Rust'ı kabul etti.",
  ],
  core: [
    {
      heading: "İki sayı: değer ve adres",
      body:
        "Her değişken bellekte bir yerde durur; o yerin numarası adresidir. Sayfadaki <code>int x = 42</code> hücresine bak: üstünde <strong>0x100</strong> yazar, içinde 42. Bunlar birbirinden bağımsız iki sayıdır. <code>&amp;x</code> ifadesi adresi verir (256, onaltılıkta 0x100); <code>*p</code> ise bir adresi alıp 'oraya git, içindekini getir' der. Buna <strong>çözümleme</strong> (dereference) denir. İşaretçi hücresinin kendisi de bellekte yer kaplar: sayfada p, 0x104'te durur ve içinde 0x100 yazar. Yani işaretçi de bir değişkendir; onun da adresi vardır ve o adres başka bir işaretçide saklanabilir (<code>int **pp = &amp;p</code>). Bağlı listeler ve ağaçlar bu zincirle kurulur. Bir ayrıntı: sayfa her hücreyi 4 bayt çizer, yani 32 bitlik bir makineyi modeller. Bugünkü 64 bitlik Linux ve macOS'ta (LP64 düzeni) <code>int</code> yine 4 bayttır ama bir işaretçi 8 bayt tutar.",
      formula: "p = &amp;x  ⇒  *p ≡ x",
      formulaNote: "& adres alır, * adrese gider. Sayfada: x 0x100'de, p 0x104'te; p'nin içinde 0x100 yazar. *p = 7 yazmak x'i 7 yapar.",
    },
    {
      heading: "İşaretçi aritmetiği: adım boyu tipten gelir",
      body:
        "Bir işaretçiye 1 eklemek adresi 1 artırmaz; gösterdiği tipin boyu kadar artırır. Yaygın platformlarda <code>int</code> 4 bayt olduğundan sayfadaki <strong>p++</strong> düğmesi adresi 0x100'den 0x104'e taşır; bir <code>double</code> işaretçisi 8, bir <code>char</code> işaretçisi 1 bayt atlardı. C standardı yalnızca <code>sizeof(char) = 1</code> der; ötekiler platforma bağlıdır ve <code>sizeof</code> ile sorulur. Dizilerin bütün sırrı budur: <code>dizi[3]</code>, tanım gereği <code>*(dizi + 3)</code> demektir; başlangıç adresine üç eleman boyu ekle, oraya git. Bu yüzden dizinin on bininci elemanına ulaşmak da ilk elemanına ulaşmak kadar sürer: tek çarpma, tek toplama. Kuralın sınırı da bellidir: işaretçiyi dizinin son elemanının <em>bir ötesine</em> kadar ilerletebilirsin, ama o adresi çözümlemek ya da daha öteye geçmek tanımsız davranıştır. Derleyici bunu senin yerine denetlemez.",
      formula: "p + k  →  adres(p) + k · sizeof(*p)",
      formulaNote: "int 4 baytsa 0x100'de başlayan bir int dizisinde dizi[3], 0x100 + 3·4 = 0x10C adresindedir. İki işaretçinin farkı (q − p) bayt değil eleman sayısı verir.",
    },
    {
      heading: "Yığın: otomatik, hızlı ve geçici",
      body:
        "Bir fonksiyon çağrıldığında yığına bir <strong>çerçeve</strong> (stack frame) konur: yerel değişkenler, saklanan yazmaçlar, yazmaçlara sığmayan parametreler ve işin bitince nereye dönüleceğini söyleyen <strong>dönüş adresi</strong>. Fonksiyon döndüğünde çerçeve tek hamlede bırakılır; <code>free</code> yok, unutma yok. Sayfadaki çağrı yığını her çerçeveyi 64 bayt sayar ve alttaki <strong>Stack Pointer</strong> değeri her çağrıda 0x40 azalır: yaygın işlemcilerde yığın yüksek adresten düşük adrese doğru büyür. Son giren ilk çıkar; factorial(1) döner, sonra factorial(2), en son main. Bedeli sınırlı alandır: Linux'ta ana iş parçacığının yığın sınırı varsayılan olarak 8 MiB'dir; sonsuz özyineleme bu sınıra dayanınca çekirdek süreci segmentation fault ile durdurur. Yerel bir değişkenin adresini dışarı vermek de tehlikelidir: fonksiyon dönünce o adres artık ömrü bitmiş bir nesneyi gösterir.",
      formula: "SP ← SP − çerçeve boyu  (sayfada 0x40 = 64 B)",
      formulaNote: "main + factorial(5…1) altı çerçeve eder: 0x7FF0 − 6·0x40 = 0x7E70. Gerçek çerçeve boyu derleyiciye, işlemciye ve eniyileme düzeyine göre değişir.",
    },
    {
      heading: "Öbek: sen aldın, sen geri vereceksin",
      body:
        "Boyutunu önceden bilmediğin ya da fonksiyondan uzun yaşaması gereken veri <strong>öbekten</strong> (heap) alınır: <code>malloc(16)</code> en az 16 kullanılabilir baytın adresini verir (yer yoksa NULL), <code>free(p)</code> onu geri alır. Ayırıcı her parçanın yanında kendi defter kaydını da tutar; 64 bitlik Linux'taki glibc ayırıcısında 16 baytlık bir istek, 8 baytlık boyut etiketi ve hizalama yüzünden 32 baytlık bir parça tüketir. Üç şey ters gidebilir ve üçü de sayfadaki tehlike kartlarında vardır. Adresi kaybedersen <code>free</code> çağıracak bir şeyin kalmaz: <strong>sızıntı</strong>. <code>free</code>'den sonra adresi kullanmaya devam edersen başkasına verilmiş olabilecek belleğe dokunursun: <strong>sarkan işaretçi</strong>, use-after-free. Aynı adresi iki kez geri verirsen ayırıcının defterini bozarsın: double free. Sızıntı yalnızca israftır; son ikisi ise C standardında <strong>tanımsız davranıştır</strong>: program çökebilir, yanlış sonuç verebilir ya da o gün tesadüfen doğru çalışabilir. Hiçbirine güvenemezsin.",
      formula: "p = malloc(n); … free(p); p = NULL;",
      formulaNote: "free(NULL) hiçbir şey yapmaz; bu yüzden free'den sonra NULL atamak, aynı değişken üzerinden ikinci free'yi zararsız kılar. Aynı adresi tutan başka kopyalar ise sarkmaya devam eder.",
    },
    {
      heading: "Sahipliği makineye devretmek",
      body:
        "Bütün bu hataların kökü tek bir sorudur: bu belleğin <strong>sahibi</strong> kim, yani <code>free</code>'yi kim çağıracak? C++ bu soruyu nesnelerin ömrüne bağlar: <code>unique_ptr</code> tek sahipli bir işaretçidir, kapsamdan çıkınca belleği kendi geri verir ve kopyalanamaz, yalnızca taşınır. <code>shared_ptr</code> bir <strong>referans sayacı</strong> tutar: her kopya sayacı bir artırır, her yok oluş bir azaltır, sıfırda bellek silinir. Fikir eskidir; George Collins 1960'ta Lisp listeleri için önermişti. Zayıf noktası döngüdür: iki nesne birbirini sayarsa sayaç hiç sıfıra inmez; <code>weak_ptr</code> sayaca katılmadan bakan bir gözlemci olarak bu döngüyü kırar. Java ve JavaScript soruyu tümüyle devralır: <strong>izleyen çöp toplayıcı</strong>, programın elindeki köklerden (yığın, global değişkenler) başlayıp işaretçileri izler, ulaşamadığı her nesneyi çöp sayar; döngüler de böylece toplanır. Python'un yaygın gerçeklemesi CPython ikisini birleştirir: referans sayar, döngüler için ayrıca bir toplayıcı çalıştırır. Sayfadaki 'İşaretçiyi Kaybet' düğmesi, çöp toplayıcısız bir dünyada o 16 baytın kaderini gösterir.",
      formula: "shared_ptr: sayaç +1 (kopya), −1 (yok oluş), 0 ⇒ delete",
      formulaNote: "Sayaç nesnenin dışında, ayrı bir denetim bloğunda tutulur; make_shared çoğu gerçeklemede nesneyle bu bloğu tek ayırmada alır.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört canlı panel var. <strong>Bellek Modeli</strong> tuvali bir sürecin adres alanını yüksek adresten düşüğe sıralar; 'Genel Görünüm', 'Stack' ve 'Heap' sekmeleri ilgili bölgeyi öne çıkarır ve alttaki açıklamayı değiştirir. <strong>İşaretçi Simülatörü</strong>'nde 'int x = 42', 'int *p = &amp;x', 'y = *p (deref)', 'p++ (aritmetik)', 'p = NULL' ve 'Sıfırla' düğmeleri hücreleri (adres üstte, değer içte, ad altta) ve alttaki bilgi satırını değiştirir. <strong>Çağrı Yığını</strong>'nda 'main() → factorial(5)', 'factorial(5) → factorial(4)', 'Return' ve 'Sıfırla' düğmeleri çerçeveleri üst üste koyar; alttaki satır çerçeve sayısını ve Stack Pointer'ı yazar. <strong>Bellek Sızıntısı</strong> panelinde 'malloc(16)', 'free()', 'İşaretçiyi Kaybet' ve 'Sıfırla' düğmeleri 'Ayrılan | Sızan | Toplam blok' satırını günceller. Akıllı işaretçi, endianness ve tehlike kartları ise okunacak sabit kartlardır.",
    experiments: [
      {
        title: "Üç hücre, üç adres",
        predict:
          "Sırayla 'int x = 42', 'int *p = &x' ve 'y = *p (deref)' düğmelerine basınca üç hücre belirecek. Hangi adreslerde duracaklar ve p hücresinin içinde ne yazacak: 42 mi, bir adres mi?",
        do: "'Sıfırla'ya bas. Sonra 'int *p = &x', ardından 'y = *p (deref)' düğmelerine bas. Her basıştan sonra hücrelerin üstündeki adresleri ve alttaki bilgi satırını oku.",
        observe:
          "Hücreler 0x100 (x, 42), 0x104 (p, '→100') ve 0x108 (y, 42) adreslerinde dizilir; aralarında tam 4 bayt vardır. p'nin içinde 42 değil, x'in adresi yazar. Bilgi satırı 'p'nin gösterdiği adresteki değer (42) y'ye kopyalandı' der.",
        explain:
          "Bu modelde int de işaretçi de 4 bayttır (32 bitlik makine); adresler bu yüzden 4'er artar. 64 bitlik bir sistemde p 8 bayt kaplardı. y = *p iki adımdır: p'deki adrese git (0x100), oradaki değeri kopyala (42). y bir kopyadır; gerçek C'de y'yi değiştirmek x'e dokunmaz, ama *p = 7 yazmak x'i 7 yapardı. Sayfa işaretçi üzerinden yazmayı göstermiyor; o adımı kafanda tamamla.",
      },
      {
        title: "Kendini okuyan işaretçi",
        predict:
          "p, x'i gösterirken 'p++' düğmesine basarsan p hangi adresi gösterir? Ardından 'y = *p (deref)' basınca y'ye hangi sayı kopyalanır: 42 mi, başka bir şey mi? Peki p = NULL iken deref ne yapar?",
        do: "'Sıfırla', sonra 'int *p = &x'. Bir kez 'p++ (aritmetik)', sonra 'y = *p (deref)' düğmelerine bas; p hücresindeki oku ve y'nin değerini oku. Ardından 'p = NULL' ve yeniden 'y = *p (deref)' düğmelerine bas, bilgi satırını oku.",
        observe:
          "p hücresinde '→104' belirir: işaretçi artık kendi durduğu adresi gösteriyor. Deref sonrası 0x108'de beliren y'nin değeri 42 değil 260'tır; 260, onaltılıkta 0x104'tür, yani p kendi içeriğini y'ye kopyalamıştır. p = NULL'dan sonra p hücresi 'NULL' yazar; deref yeni hücre oluşturmaz, bilgi satırı tanımsız davranış uyarısı verir.",
        explain:
          "p++ adresi int boyu kadar, 4 bayt ilerletti; bu küçük bellekte 0x100'den sonraki hücre p'nin kendisidir ve içindeki sayı 0x104 = 260'tır. Gerçek C'de durum daha serttir: tek bir int olan x'in 'bir ötesini' göstermek serbesttir, ama orayı okumak tanımsız davranıştır. Sayfadaki 260, olası sonuçlardan yalnızca biridir; eniyileyici o okumayı tümüyle silebilir de. NULL'ı çözümlemek de tanımsızdır; masaüstü sistemlerde 0 adresi bilerek eşlenmemiş bırakıldığından pratikte segmentation fault görürsün. 'Buffer Overflow' kartı aynı kapıdan girer: sınırın ötesine bu kez yazılır.",
      },
      {
        title: "Altı çerçeve, altı kez 64 bayt",
        predict:
          "'main() → factorial(5)' bir kez basılınca kaç çerçeve belirir? Sonra 'factorial(5) → factorial(4)' düğmesi kaç kez işe yarar ve Stack Pointer her seferinde ne kadar değişir?",
        do: "Çağrı Yığını'nda 'Sıfırla', sonra 'main() → factorial(5)'. Alt satırdaki Stack Pointer'ı not et. 'factorial(5) → factorial(4)' düğmesine tepki vermez olana kadar bas, her basışta SP'yi yaz. Sonra 'Return' ile çerçeveleri tek tek boşalt ve hangi sırayla kaybolduklarına bak.",
        observe:
          "İlk düğme iki çerçeveyi birden koyar (main ve factorial n=5); satır '2 frame stack'te — Stack Pointer: 0x7f70' der. Sonraki düğme dört kez işler: n=4, 3, 2, 1 çerçeveleri gelir, SP sırayla 0x7f30, 0x7ef0, 0x7eb0, 0x7e70 olur; n=1'den sonra düğme tepki vermez. Return en üstteki factorial n=1'den başlar, main en son gider.",
        explain:
          "Her çerçeve 64 bayt = 0x40; yeni çerçeve çizimde üste eklenir ama adresi daha küçüktür, bu yüzden SP her çağrıda 0x40 azalır: 0x7FF0 − 6·0x40 = 0x7E70. Sayfa n=1'de durur; gerçek bir program 'n ≤ 1 ise dön' koşulunu unutursa çerçeveler yığın sınırına kadar birikir: 8 MiB = 8 388 608 bayt, 64 baytlık çerçevelerle 131 072 çağrı eder. Bu defter hazırlanırken eniyilemesiz derlenen benzer bir fonksiyon, 64 bitlik bir ARM makinede çağrı başına 80 bayt harcadı ve yüz bin küsur çağrıdan sonra çöktü.",
      },
      {
        title: "Kaybolan 16 bayt",
        predict:
          "Üç kez 'malloc(16)', bir kez 'İşaretçiyi Kaybet', sonra üç kez 'free()' basarsan 'Ayrılan | Sızan | Toplam blok' satırı sonunda ne gösterir? Sızan 16 bayt free ile geri gelir mi?",
        do: "Sızıntı panelinde 'Sıfırla'. 'malloc(16)' düğmesine üç kez bas ve satırı oku. 'İşaretçiyi Kaybet (Sızıntı!)' düğmesine bir kez bas; hangi bloğun kırmızıya döndüğüne bak. Sonra 'free()' düğmesine üç kez bas ve her seferinde hangi bloğun silindiğini izle.",
        observe:
          "Üç malloc'tan sonra 'Ayrılan: 48 B | Sızan: 0 B | Toplam blok: 3'. Kaybet, en son blok [3]'ü kırmızı yapar: 'Ayrılan: 32 B | Sızan: 16 B'. Free önce [2]'yi, sonra [1]'i siler; üçüncü free hiçbir şey yapmaz. Son durum: 'Ayrılan: 0 B | Sızan: 16 B | Toplam blok: 1'. Kırmızı blok yalnızca 'Sıfırla' ile gider.",
        explain:
          "free() bir adres ister; kaybolan bloğun adresi programda hiçbir değişkende kalmadığı için ona ulaşmanın yolu yoktur. Blok hem kullanılamaz hem geri verilemez. 'Sıfırla' sürecin kapanmasına benzer: işletim sistemi biten sürecin bütün bellek sayfalarını geri alır, sızıntı o an biter. Sorun uzun ömürlü programlardadır: saniyede bin kez çalışan bir döngü her seferinde 16 bayt kaçırırsa bir günde 1000 × 16 × 86 400 ≈ 1.38 GB birikir. Sayfanın 'Ayrılan' sayacı yalnızca istenen baytları toplar; gerçek ayırıcı her blok için etiket ve hizalama payı da harcar.",
      },
    ],
  },
  wow: [
    {
      title: "Milyar dolarlık hata",
      body:
        "Tony Hoare 1965'te ALGOL W'ye null referansı eklerken gerekçesi basitti: gerçeklemesi çok kolaydı. 2009'da Londra'daki bir konferansta bunu 'milyar dolarlık hatam' diye niteledi; kırk yıl boyunca null yüzünden çöken programların, güvenlik açıklarının ve kaybedilen zamanın bedelini kabaca bu kadar tahmin ediyordu. Sayfadaki 'p = NULL' düğmesi aynı değeri üretir.",
    },
    {
      title: "536 bayt, binlerce makine",
      body:
        "2 Kasım 1988'de yayılan Morris solucanı, Unix'in fingerd servisinde 512 baytlık bir tampona 536 bayt göndererek yığındaki dönüş adresinin üzerine yazdı. En çok anılan tahmine göre interneti oluşturan yaklaşık 60 bin makinenin altı bin kadarı etkilendi. Olay, 1986 tarihli Bilgisayar Dolandırıcılığı ve Kötüye Kullanım Yasası kapsamında ABD'deki ilk ağır suç mahkûmiyetiyle sonuçlandı ve tampon taşmasının sıradan bir programcı hatası değil, bir güvenlik sorunu olduğunu dünyaya gösterdi.",
    },
    {
      title: "Açıkların yüzde yetmişi",
      body:
        "Microsoft'tan bir güvenlik mühendisi 2019'da, şirketin her yıl yamaladığı güvenlik açıklarının yaklaşık yüzde 70'inin bellek güvenliği hatası olduğunu bildirdi: sarkan işaretçiler, tampon taşmaları, use-after-free'ler. Chromium ekibi 2020'de kendi ciddi güvenlik hatalarında aynı orana ulaştı. İki ayrı kod tabanında çıkan aynı sayı, Rust gibi sahipliği derleme anında denetleyen dillere ilginin ve Aralık 2022'de Linux 6.1 çekirdeğine eklenen Rust desteğinin arkasındaki başlıca gerekçedir.",
    },
  ],
  worked: {
    title: "Bir milyon sayı: liste mi, dizi mi?",
    prompt:
      "64 bitlik Linux'ta (LP64: int 4 bayt, işaretçi 8 bayt) bir milyon tam sayıyı <code>struct dugum { int deger; struct dugum *sonraki; };</code> düğümlerinden oluşan bir bağlı listede tutuyorsun; her düğüm ayrı bir malloc ile alınıyor. Liste öbekte kaç bayt tüketir? Aynı sayılar tek bir int dizisinde kaç bayt eder?",
    steps: [
      "Düğümün boyunu bul. Alanların toplamı 4 + 8 = 12 bayttır, ama 8 baytlık işaretçi 8'in katı bir adreste durmak zorundadır (<strong>hizalama</strong>). Derleyici <code>deger</code>'den sonra 4 bayt dolgu bırakır: sizeof(struct dugum) = 4 + 4 + 8 = 16 bayt.",
      "Ayırıcının payını ekle. glibc her parçanın başına 8 baytlık bir boyut etiketi koyar ve parça boyunu 16'nın katına yuvarlar: 16 + 8 = 24 → 32 bayt. Yani malloc(16) öbekten 32 bayt düşer.",
      "Listeyi topla: 10<sup>6</sup> × 32 B = 32 000 000 B ≈ 30.5 MiB.",
      "Diziyi topla: 10<sup>6</sup> × 4 B = 4 000 000 B ≈ 3.8 MiB; tek bir malloc'un etiketi bunun yanında görünmez. Oran: 32 / 4 = 8.",
      "Yorumla: listede her 32 baytın yalnızca 4'ü veridir (yüzde 12.5); gerisi işaretçi, dolgu ve etikettir. Hız farkı da buradan doğar: 64 baytlık bir önbellek satırına 16 dizi elemanı sığar, liste düğümlerinden ise en çok ikisi; üstelik düğümler bellekte dağınık durabilir.",
    ],
    result:
      "Bağlı liste yaklaşık 30.5 MiB, dizi yaklaşık 3.8 MiB tutar: sekiz kat. Sayılar platforma bağlıdır (32 bitlik bir sistemde düğüm 8 bayttır); ama ders aynıdır: her işaretçinin bir bellek ve önbellek bedeli vardır. Liste, bu bedeli araya eleman eklemenin ucuzluğuyla öder.",
  },
  misconceptions: [
    {
      myth: "İşaretçi, gösterdiği değişkenin değerini tutar.",
      truth:
        "Adresini tutar, değerini değil. Sayfada p hücresinde 42 değil '→100' yazar. Değere ulaşmak ayrı bir adımdır: *p. Bu ayrım sayesinde aynı adresi iki işaretçiye verebilir, biriyle değiştirip öbürüyle okuyabilirsin; ortada kopya yoktur, ikisi de aynı yere bakar.",
    },
    {
      myth: "free(p) işaretçiyi de siler; p artık boştur.",
      truth:
        "free yalnızca belleği ayırıcıya geri verir; p'nin içinde eski adres durmaya devam eder. Sarkan işaretçi tam budur: adres geçerli görünür ama arkasındaki bellek başkasına verilmiş olabilir. Bu yüzden free'den hemen sonra p = NULL yazmak yaygın bir alışkanlıktır.",
    },
    {
      myth: "p++ adresi 1 artırır.",
      truth:
        "Gösterilen tipin boyu kadar artırır: int için tipik olarak 4, double için 8 bayt. Sayfada p++ sonrası adres 0x100'den 0x104'e sıçrar. Dizi erişimini mümkün kılan kural budur; bir char işaretçisiyle bir int işaretçisinin aynı '+1'de farklı yerlere gitmesi ilk bakışta şaşırtır.",
    },
    {
      myth: "Sızan bellek program kapanınca da kayıp kalır; bilgisayar yavaş yavaş dolar.",
      truth:
        "Süreç bitince işletim sistemi bütün sayfalarını geri alır. Sızıntı, günlerce çalışan sunucular, tarayıcılar ve oyunlar için sorundur: her döngüde kaçan küçük bir parça birikir, program sonunda bellek bulamaz ya da sistemi takasa boğar. Kısa ömürlü bir programda sızıntı çirkindir ama ölümcül değildir.",
    },
  ],
  glossary: [
    { term: "İşaretçi (pointer)", definition: "Başka bir nesnenin bellek adresini tutan değişken; sayfada p, 0x104'te durur ve içinde 0x100 yazar." },
    { term: "Adres alma (&)", definition: "Bir değişkenin bellekteki yerini veren işlem; &x, x'in adresidir." },
    { term: "Çözümleme (dereference, *)", definition: "İşaretçideki adrese gidip oradaki nesneye ulaşma; *p okumada değeri getirir, yazmada o adresteki değeri değiştirir." },
    { term: "Yığın çerçevesi (stack frame)", definition: "Bir fonksiyon çağrısının yığındaki alanı: yerel değişkenler, saklanan yazmaçlar ve dönüş adresi; fonksiyon dönünce bırakılır." },
    { term: "Öbek (heap)", definition: "malloc/new ile elle ayrılıp free/delete ile elle geri verilen, ömrü fonksiyon çağrılarından bağımsız bellek bölgesi." },
    { term: "Sarkan işaretçi (dangling pointer)", definition: "Geri verilmiş ya da ömrü bitmiş bir nesneyi göstermeye devam eden işaretçi; kullanılması tanımsız davranıştır." },
    { term: "Tanımsız davranış (undefined behavior)", definition: "C standardının hiçbir sonuç güvencesi vermediği işlem; program çökebilir, yanlış değer üretebilir ya da tesadüfen doğru çalışabilir." },
    { term: "Bayt sırası (endianness)", definition: "Çok baytlı bir sayının baytlarının bellekteki dizilişi; little-endian'da 0x0A0B0C0D, artan adreslerde 0D 0C 0B 0A olarak saklanır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Sayfadaki 0x100 gibi adresler gerçek bir sistemde <strong>sanal</strong> adreslerdir. Bilgisayar Organizasyonu ve İşletim Sistemleri derslerinde, her sürecin kendi adres alanında yaşadığını ve işlemcideki bellek yönetim biriminin (MMU) bu adresleri sayfa tabloları üzerinden fiziksel RAM'e çevirdiğini öğrenirsin; fikir 1960'ların başında Manchester'daki Atlas bilgisayarında hayata geçti. Bellek modeli tuvalindeki Text, Data ve BSS bölgeleri, programın diskteki yürütülebilir dosyasının (Linux'ta ELF) bölümlerinden gelir; yığını ve öbeği ise çalışma anında çekirdek ve ayırıcı kurar. Sistem programlama dersi bir fonksiyon çağrısının yığına ve yazmaçlara hangi sırayla ne koyduğunu, yani <em>çağrı kuralını</em> satır satır gösterir. Çözümlü örnekteki hizalama ve önbellek hesabı da aynı dersin konusudur: veri yapısı seçimi, büyük-O kadar bellek yerleşimine de bağlıdır.",
      "İkinci büyük başlık <strong>bellek güvenliği</strong>dir. Çöp toplama algoritmaları (işaretle-süpür, kopyalayan ve kuşaklı toplayıcılar, referans sayma) Lisp'teki ilk fikrin torunlarıdır ve Java'dan JavaScript'e her yerde çalışır. Rust aynı soruya derleyiciyle cevap verir: her değerin tek bir sahibi vardır, ödünç alma kuralları derleme anında denetlenir ve güvenli Rust kodunda sarkan işaretçi derlenmez. Valgrind ve AddressSanitizer gibi araçlar ise C programını çalışırken izleyip sayfadaki tehlike kartlarının çoğunu, hatanın yapıldığı satırı göstererek yakalar; bedeli programın birkaç kat (Valgrind'de onlarca kat) yavaşlamasıdır. Pek çok sistem programlama dersinin klasik ödevi de bu sayfanın öbek panelinin gerçeğidir: kendi malloc ve free'ni yazmak.",
    ],
    topics: ["Sanal bellek, sayfalama ve MMU", "Çağrı kuralları ve ABI", "Hizalama, önbellek ve veri yerelliği", "Çöp toplama algoritmaları", "Rust: sahiplik ve ödünç alma", "Bellek hata ayıklama: Valgrind, AddressSanitizer", "Kendi malloc'unu yazmak"],
  },
  quiz: [
    {
      question: "p bir int işaretçisi ve 0x100'ü gösteriyor; int 4 bayt. p++ sonrasında hangi adresi gösterir?",
      options: ["0x101", "0x102", "0x104", "0x108"],
      answer: 2,
      explanation: "İşaretçi aritmetiği gösterilen tipin boyuyla ilerler: 0x100 + 1·sizeof(int) = 0x104. Sayfadaki 'p++' düğmesi tam bunu yapar ve ok '→104'e döner. char işaretçisi olsaydı 0x101, double işaretçisi olsaydı 0x108 olurdu.",
    },
    {
      question: "<code>int *f(void) { int a = 5; return &amp;a; }</code> fonksiyonunu çağıran kod, dönen işaretçiyi çözümleyip değeri yazdırıyor. Ne olur?",
      options: ["Her zaman 5 yazar; a'nın değeri bellekte kalır", "Her zaman 0 yazar; yığın dönüşte sıfırlanır", "Derleyici bu fonksiyonu derlemeyi reddeder", "Tanımsız davranış: a'nın ömrü dönüşte bitti; 5 de çıkabilir, çöp de, çökme de"],
      answer: 3,
      explanation: "a, f'nin yığın çerçevesinde yaşar ve çerçeve dönüşte bırakılır; dönen adres sarkan bir işaretçidir. O baytların üzerine henüz yazılmadıysa 5 görebilirsin, ama bu bir güvence değildir: sonraki ilk fonksiyon çağrısı aynı yeri kullanır, eniyileyici de böyle bir okumayı dilediği gibi ele alabilir. Derleyiciler genellikle uyarır ama derler. Uzun yaşaması gereken veri öbekten alınır ya da çağıranın verdiği bir adrese yazılır.",
    },
    {
      question: "Sayfadaki çağrı yığınında dört çerçeve varken Stack Pointer kaçtır? (Başlangıç 0x7FF0, çerçeve 64 bayt)",
      options: ["0x7FF0", "0x7EF0", "0x7F30", "0x7E70"],
      answer: 1,
      explanation: "64 bayt = 0x40; dört çerçeve 4 × 0x40 = 0x100 eder. 0x7FF0 − 0x100 = 0x7EF0. SP azalır çünkü yığın yüksek adresten düşük adrese doğru büyür. 0x7F30 üç, 0x7E70 altı çerçevenin değeridir.",
    },
  ],
  next: [
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Bağlı listede her düğüm {değer, sonraki} taşır; 'sonraki' tam da bu sayfadaki işaretçidir. Dizi ile bağlı listeyi yan yana, ağaç ve hash tablosunu canlı izle." },
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "Aynı fonksiyonun C, assembly ve makine kodu hâli; x86-64 yazmaçları ve yığın çerçevesini kuran System V çağrı düzeni." },
    { href: "isletim-sistemleri-ve-linux.html", title: "İşletim Sistemleri ve Linux", why: "Süreçleri kim yaratır, işlemciyi kim paylaştırır, biten sürecin belleğini kim toplar: çekirdek, sistem çağrıları ve canlı bir terminal." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Tampon taşması saldırı sözlüğünde bir satır; yanında parola entropisi, şifreleme, hash ve anahtar değişimi deneyleri var." },
  ],
  sources: [
    { title: "Wikipedia · Pointer (computer programming)", url: "https://en.wikipedia.org/wiki/Pointer_(computer_programming)", note: "Lawson'ın 1964 PL/I işaretçisi ve 2000 ödülü, işaretçi aritmetiği, null ve farklı dillerdeki karşılıklar (İngilizce)." },
    { title: "Wikipedia · Morris worm", url: "https://en.wikipedia.org/wiki/Morris_worm", note: "2 Kasım 1988 solucanı: fingerd tampon taşması, 6000/60 000 tahmininin kaynağı ve davanın sonucu (İngilizce)." },
    { title: "Wikipedia · Memory safety", url: "https://en.wikipedia.org/wiki/Memory_safety", note: "Bellek güvenliği hatalarının sınıflandırması, Microsoft ve Chromium'un yüzde 70 bulguları, Valgrind ve AddressSanitizer'ın bedeli (İngilizce)." },
    { title: "MIT OpenCourseWare · 6.087 Practical Programming in C (IAP 2010)", url: "https://ocw.mit.edu/courses/6-087-practical-programming-in-c-january-iap-2010/", note: "İşaretçiler ve dinamik bellek ayırmayı ders notları, ödevler ve laboratuvarlarla işleyen kısa bir C dersi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
