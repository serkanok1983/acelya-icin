window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["isaretciler-ve-bellek-yonetimi"] = {
  slug: "isaretciler-ve-bellek-yonetimi",
  title: "İşaretçiler ve Bellek: Adresi Elinde Tutmak",
  field: "Bilgisayar Bilimi",
  level: "Lise ileri",
  minutes: 35,
  tagline:
    "Bir değişkenin değerini değil adresini saklamak, programcıya belleğin anahtarını verir: en hızlı veri yapıları da, 1988'de interneti durduran solucan da aynı anahtarla açıldı.",
  hook:
    "2 Kasım 1988 gecesi, o günkü internetin onda biri birkaç saat içinde durdu. Saldıran bir ordu değil, bir lisansüstü öğrencisinin yazdığı 99 satırlık bir programdı; içeri girdiği kapı ise 512 baytlık bir kutuya 536 bayt yazdırmaktan ibaretti. Bir adres, bir sayı. Bu sayfadaki küçük hücrelerde o sayının nasıl hem güç hem tehlike olduğunu kendi elinle göreceksin.",
  bigIdea:
    "Bir <strong>işaretçi</strong>, değerin kendisini değil değerin bellekteki <em>adresini</em> tutar: <code>p = &amp;x</code> adresi alır, <code>*p</code> o adrese gider. Yığındaki bellek fonksiyonla birlikte kendiliğinden gelir ve gider; öbekten aldığın her baytı ise geri vermek senin sorumluluğundur.",
  story: [
    "1945'te John von Neumann, EDVAC raporunda belleği numaralı hücrelerden oluşan tek bir sıra olarak tarif etti: her hücrenin bir numarası, yani bir <strong>adresi</strong> vardı. Ama bir hücrenin içine başka bir hücrenin numarasını yazmak, programlama dillerine yirmi yıl sonra girdi. 1964'te IBM'de çalışan Harold Lawson, PL/I diline 'pointer' adını verdiği bir değişken türü ekledi; liste ve ağaç gibi birbirine bağlı yapılar artık dilin içinde kurulabiliyordu. IEEE bu buluş için Lawson'a 2000 yılında Computer Pioneer ödülünü verdi. Aynı yıllarda Tony Hoare, ALGOL W dilinde 'hiçbir yeri göstermeyen' özel değeri, <strong>null</strong>'ı tanıttı (1965). Kırk dört yıl sonra, 2009'da bir konferansta bunu 'milyar dolarlık hatam' diye andı: null yüzünden çöken programların bedelinin yarım yüzyılda bu rakamı bulduğunu tahmin ediyordu.",
    "İşaretçiyi gündelik araca çeviren dil C oldu. Ken Thompson'ın 1969'daki B dilinden yola çıkan Dennis Ritchie, 1972'de Bell Laboratuvarları'nda C'yi tasarladı; 1973'te Unix işletim sistemi baştan sona C ile yeniden yazıldı. C'nin iddiası açıktı: makineye yakın kal, programcıya adreslerle aritmetik yapma hakkı ver, hiçbir şeyi onun arkasından denetleme. Bu özgürlüğün iki yüzü vardı. Bir yüzünde, fonksiyon çağrılarının Edsger Dijkstra'nın 1960'ta ALGOL 60 için önerdiği <strong>yığın</strong> üzerinde kendiliğinden yer bulması; öbür yüzünde, programcının <code>malloc</code> ile aldığı her bellek parçasını <code>free</code> ile kendisinin geri vermesi gerekliliği. Kernighan ve Ritchie'nin 1978 tarihli kitabı, böyle bir ayırıcının nasıl yazılacağını sekizinci bölümde bizzat gösteriyordu: boş parçaların bağlı listesi, her parçanın başında bir boyut etiketi.",
    "Bedel, 1988'de ortaya çıktı. Cornell'de lisansüstü öğrencisi olan Robert Tappan Morris'in yazdığı solucan, Unix'in <code>fingerd</code> servisindeki sınır denetimsiz bir <code>gets()</code> çağrısına 536 bayt göndererek yığındaki dönüş adresinin üzerine yazdı ve kendi kodunu çalıştırdı; tahminlere göre o günkü 60 bin internet makinesinin yaklaşık altı bini birkaç saat içinde kilitlendi. 1996'da Phrack dergisindeki 'Smashing the Stack for Fun and Profit' yazısı tekniği herkesin okuyabileceği bir tarife dönüştürdü; 2014'teki Heartbleed açığı ise bu kez yazmayı değil okumayı kullandı: OpenSSL, bir mesajın iddia ettiği uzunluğa güvenip belleğinden her istekte 64 kilobayta kadar veri sızdırdı. Microsoft 2019'da yamaladığı güvenlik açıklarının yaklaşık yüzde 70'inin bellek güvenliği hatası olduğunu açıkladı; Chromium ekibi 2020'de kendi ciddi hataları için aynı oranı buldu. Cevaplar da sırayla geldi: 1959'da John McCarthy'nin Lisp için icat ettiği çöp toplayıcı, Bjarne Stroustrup'un C++'ta kaynağı nesnenin ömrüne bağlayan RAII fikri, 2011'de C++11 ile gelen akıllı işaretçiler ve 2015'te sahipliği derleme anında denetleyen Rust. Aralık 2022'de yayımlanan Linux 6.1 çekirdeği, elli yıl sonra ilk kez C dışında bir dile, Rust'a kapı açtı.",
  ],
  core: [
    {
      heading: "İki sayı: değer ve adres",
      body:
        "Her değişken bellekte bir yerde durur; o yerin numarası adresidir. Sayfadaki <code>int x = 42</code> hücresine bak: üstünde <strong>0x100</strong> yazar, içinde 42. Bunlar birbirinden bağımsız iki sayıdır. <code>&amp;x</code> ifadesi adresi verir (256, onaltılıkta 0x100); <code>*p</code> ise bir adresi alıp 'oraya git, içindekini getir' der. Buna <strong>çözümleme</strong> (dereference) denir. İşaretçi hücresinin kendisi de bellekte bir yer kaplar: sayfada p, 0x104'te durur ve içinde 0x100 yazar. Yani işaretçi de bir değişkendir; onun da adresi vardır ve içine başka bir işaretçinin adresi konabilir. Bu zincir, bağlı listelerin ve ağaçların kurulma biçimidir.",
      formula: "p = &amp;x  ⇒  *p ≡ x",
      formulaNote: "& adres alır, * adrese gider. Sayfada: x 0x100'de, p 0x104'te; p'nin içinde 0x100 yazar.",
    },
    {
      heading: "İşaretçi aritmetiği: adım boyu tipten gelir",
      body:
        "Bir işaretçiye 1 eklemek adresi 1 artırmaz; gösterdiği tipin boyu kadar artırır. <code>int</code> 4 bayt olduğundan sayfadaki <strong>p++</strong> düğmesi adresi 0x100'den 0x104'e taşır; bir <code>double</code> işaretçisi 8, bir <code>char</code> işaretçisi 1 bayt atlardı. Dizilerin bütün sırrı budur: <code>dizi[3]</code> yazmak, derleyici için <code>*(dizi + 3)</code> demektir; başlangıç adresine üç eleman boyu ekle, oraya git. Bu yüzden dizinin on binlerci elemanına ulaşmak da ilk elemanına ulaşmak kadar sürer. Aynı güç, dizinin sonundan bir adım öteye gitmeyi de yasaklamaz; derleyici sınır bilmez, sen bilmek zorundasın.",
      formula: "p + k  →  adres(p) + k · sizeof(*p)",
      formulaNote: "int için 4, double için 8, char için 1 bayt. 0x100'deki int dizisinin 3. elemanı 0x10C'dedir.",
    },
    {
      heading: "Yığın: otomatik, hızlı ve geçici",
      body:
        "Bir fonksiyon çağrıldığında yığına bir <strong>çerçeve</strong> (stack frame) konur: parametreler, yerel değişkenler, kayıt edilen yazmaçlar ve işin bitince nereye dönüleceğini söyleyen <strong>dönüş adresi</strong>. Fonksiyon döndüğünde çerçeve tek hamlede silinir; <code>free</code> yok, unutma yok. Sayfadaki çağrı yığını her çerçeveyi 64 bayt sayar ve <strong>Stack Pointer</strong> göstergesi her çağrıda 0x40 azalır: yığın yüksek adresten düşük adrese doğru büyür. Son giren ilk çıkar; factorial(1) döner, sonra factorial(2), en son main. Bedeli sınırlı alandır: Linux'ta bir sürecin ana yığını varsayılan olarak 8 MiB'dir; sonsuz özyineleme bu sınıra dayanınca program 'stack overflow' ile ölür. Yerel bir değişkenin adresini dışarı vermek de tehlikelidir: fonksiyon dönünce o adres artık silinmiş bir çerçeveyi gösterir.",
      formula: "SP ← SP − çerçeve boyu  (sayfada 0x40 = 64 B)",
      formulaNote: "main + factorial(5…1) altı çerçeve eder: 0x7FF0 − 6·0x40 = 0x7E70. Gerçek çerçeve boyları derleyiciye göre değişir.",
    },
    {
      heading: "Öbek: sen aldın, sen geri vereceksin",
      body:
        "Boyutunu önceden bilmediğin ya da fonksiyondan uzun yaşaması gereken veri <strong>öbekten</strong> (heap) alınır: <code>malloc(16)</code> 16 kullanılabilir baytın adresini verir, <code>free(p)</code> onu geri alır. Ayırıcı her parçanın başına görünmez bir boyut etiketi koyar; Linux'taki yaygın glibc ayırıcısında 16 baytlık bir istek gerçekte 32 baytlık bir parça tüketir. Üç şey ters gidebilir ve üçü de sayfadaki tehlike kartlarında vardır. Adresi kaybedersen <code>free</code> çağıracak bir şeyin kalmaz: <strong>sızıntı</strong>. <code>free</code>'den sonra adresi kullanmaya devam edersen artık başkasına verilmiş olabilecek belleğe dokunursun: <strong>sarkan işaretçi</strong>, use-after-free. Aynı adresi iki kez geri verirsen ayırıcının defterini bozarsın: double free. Dil bunların hiçbirini yakalamaz; C bunu 'tanımsız davranış' diye adlandırır ve ne olacağına karışmaz.",
      formula: "p = malloc(n); … free(p); p = NULL;",
      formulaNote: "free'den sonra NULL atamak sarkan işaretçiyi 'belli bir yeri göstermiyor' durumuna çevirir; ikinci free zararsız olur.",
    },
    {
      heading: "Sahipliği makineye devretmek",
      body:
        "Bütün bu hataların kökü tek bir sorudur: bu belleğin <strong>sahibi</strong> kim, yani <code>free</code>'yi kim çağıracak? C++ bu soruyu nesnelerin ömrüne bağlar: <code>unique_ptr</code> tek sahipli bir işaretçidir, kapsamdan çıkınca belleği kendi geri verir ve kopyalanamaz, yalnızca taşınır. <code>shared_ptr</code> bir <strong>referans sayacı</strong> tutar: her kopya sayacı bir artırır, her yok oluş bir azaltır, sıfırda bellek silinir. Bu fikir yeni değildir; George Collins 1960'ta Lisp listeleri için önermişti. Zayıf noktası döngüdür: iki nesne birbirini sayarsa sayaç hiç sıfırlanmaz; <code>weak_ptr</code> sayaca katılmadan bakan bir gözlemci olarak bu döngüyü kırar. Java, Python ve JavaScript ise soruyu tümüyle devralır: çöp toplayıcı, hiçbir işaretçinin ulaşamadığı nesneleri bulup kendisi temizler. Sayfadaki 'İşaretçiyi Kaybet' düğmesi, çöp toplayıcısız bir dünyada o 16 baytın kaderini gösterir.",
      formula: "shared_ptr: sayaç +1 (kopya), −1 (yok oluş), 0 ⇒ delete",
      formulaNote: "Sayaç bellekte ayrıca tutulur; make_shared nesneyle sayacı tek parçada ayırır.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört canlı panel var. <strong>İşaretçi Simülatörü</strong>'nde 'int x = 42', 'int *p = &amp;x', 'y = *p (deref)', 'p++ (aritmetik)', 'p = NULL' ve 'Sıfırla' düğmeleri hücreleri (adres üstte, değer içte, ad altta) ve altındaki bilgi satırını değiştirir. <strong>Çağrı Yığını</strong>'nda 'main() → factorial(5)', 'factorial(5) → factorial(4)', 'Return' ve 'Sıfırla' düğmeleri çerçeveleri yığar; alttaki satır çerçeve sayısını ve Stack Pointer'ı yazar. <strong>Bellek Sızıntısı</strong> panelinde 'malloc(16)', 'free()', 'İşaretçiyi Kaybet' ve 'Sıfırla' düğmeleri 'Ayrılan | Sızan | Toplam blok' satırını günceller. Bellek Modeli tuvali ise sabit bir haritadır; sekmeleri değil, bölgelerin sırasını incele.",
    experiments: [
      {
        title: "Üç hücre, üç adres",
        predict:
          "Sırayla 'int x = 42', 'int *p = &x' ve 'y = *p (deref)' düğmelerine basınca üç hücre belirecek. Hangi adreslerde duracaklar ve p hücresinin içinde ne yazacak: 42 mi, bir adres mi?",
        do: "'Sıfırla'ya bas. Sonra 'int *p = &x', ardından 'y = *p (deref)' düğmelerine bas. Her basıştan sonra hücrelerin üstündeki adresleri ve alttaki bilgi satırını oku.",
        observe:
          "Hücreler 0x100 (x, 42), 0x104 (p, '→100') ve 0x108 (y, 42) adreslerinde dizilir; aralarında tam 4 bayt vardır. p'nin içinde 42 değil, x'in adresi yazar. Bilgi satırı 'p'nin gösterdiği adresteki değer (42) y'ye kopyalandı' der.",
        explain:
          "Her hücre bir int ya da bir işaretçi, bu modelde ikisi de 4 bayt; adresler bu yüzden 4'er artar. y = *p iki adımdır: p'deki adrese git (0x100), oradaki değeri kopyala (42). y bir kopyadır; gerçek C'de y'yi değiştirmek x'e dokunmaz, ama *p = 7 yazmak x'i 7 yapardı. Sayfa yazma işlemini göstermiyor; bunu kafanda tamamla.",
      },
      {
        title: "Kendini okuyan işaretçi",
        predict:
          "p, x'i gösterirken 'p++' düğmesine basarsan p hangi adresi gösterir? Ardından 'y = *p (deref)' basınca y'ye hangi sayı kopyalanır: 42 mi, başka bir şey mi?",
        do: "'Sıfırla', sonra 'int *p = &x'. Şimdi bir kez 'p++ (aritmetik)', sonra 'y = *p (deref)' düğmelerine bas. p hücresindeki oku ve y'nin değerini oku.",
        observe:
          "p hücresinde '→104' belirir: işaretçi artık kendi bulunduğu adresi gösteriyor. Deref sonrası 0x108'de beliren y'nin değeri 42 değil 260'tır. 260, onaltılıkta 0x104'tür; yani p kendi içeriğini (kendi adresini) y'ye kopyalamıştır.",
        explain:
          "p++ adresi int boyu kadar, 4 bayt ilerletti; 0x100'den sonraki hücre bu küçük bellekte p'nin kendisidir. Oradaki baytları 'int' diye okuyunca p'nin içindeki sayı (0x104 = 260) çıkar. Gerçek C'de tek elemanlı x'in bir ötesini okumak tanımsız davranıştır: derleyici x'in yanına ne koyduysa onu görürsün; bazen p, bazen çöp. Tehlike kartlarındaki 'Wild Pointer' ve 'Buffer Overflow' tam bu kapıdan girer.",
      },
      {
        title: "Altı çerçeve, altı kez 64 bayt",
        predict:
          "'main() → factorial(5)' bir kez basılınca kaç çerçeve belirir? Sonra 'factorial(5) → factorial(4)' düğmesi kaç kez işe yarar ve Stack Pointer her seferinde ne kadar değişir?",
        do: "'Sıfırla' sonra 'main() → factorial(5)'. Alt satırdaki Stack Pointer'ı not et. 'factorial(5) → factorial(4)' düğmesine duruncaya kadar bas, her basışta SP'yi yaz. Sonra 'Return' ile çerçeveleri tek tek boşalt ve hangi sırayla kaybolduklarına bak.",
        observe:
          "İlk düğme iki çerçeveyi birden koyar (main ve factorial(5)); satır '2 frame stack'te — Stack Pointer: 0x7f70' der. Sonraki düğme dört kez işler: n=4, 3, 2, 1 çerçeveleri gelir, SP sırayla 0x7f30, 0x7ef0, 0x7eb0, 0x7e70 olur; n=1'den sonra düğme tepki vermez. Return en üstteki factorial(1)'den başlar, main en son gider.",
        explain:
          "Her çerçeve 64 bayt = 0x40; SP her çağrıda 0x40 azalır çünkü yığın aşağı, düşük adreslere doğru büyür. 0x7FF0 − 6·0x40 = 0x7E70. Sayfa factorial(1)'de durur; gerçek bir program 'n ≤ 1 ise dön' koşulunu unutursa çerçeveler 8 MiB'lik sınıra kadar birikir: 64 baytlık çerçevelerle 131 072 çağrı sonra program çöker. Dönüşün ters sırada olması, Dijkstra'nın yığını özyineleme için seçmesinin nedenidir.",
      },
      {
        title: "Kaybolan 16 bayt",
        predict:
          "Üç kez 'malloc(16)', bir kez 'İşaretçiyi Kaybet', sonra üç kez 'free()' basarsan 'Ayrılan | Sızan | Toplam blok' satırı sonunda ne gösterir? Sızan 16 bayt free ile geri gelir mi?",
        do: "'Sıfırla'. 'malloc(16)' düğmesine üç kez bas ve satırı oku. 'İşaretçiyi Kaybet (Sızıntı!)' düğmesine bir kez bas; hangi bloğun kırmızıya döndüğüne bak. Sonra 'free()' düğmesine üç kez bas ve her seferinde hangi bloğun silindiğini izle.",
        observe:
          "Üç malloc'tan sonra 'Ayrılan: 48 B | Sızan: 0 B | Toplam blok: 3'. Kaybet, en son blok [3]'ü kırmızı yapar: 'Ayrılan: 32 B | Sızan: 16 B'. Free önce [2]'yi, sonra [1]'i siler; üçüncü free hiçbir şey yapmaz. Son durum: 'Ayrılan: 0 B | Sızan: 16 B | Toplam blok: 1'. Kırmızı blok yalnızca 'Sıfırla' ile gider.",
        explain:
          "free() bir adres ister; adresi kaybolan bloğun adresi programda hiçbir değişkende kalmadığı için ona ulaşmanın yolu yoktur. Blok hem kullanılamaz hem geri verilemez. 'Sıfırla' sürecin kapanmasıdır: işletim sistemi sürecin bütün sayfalarını geri alır, sızıntı o an biter. Sorun uzun ömürlü programlardadır: saniyede bin kez çalışan bir döngü her seferinde 16 bayt kaçırırsa bir günde 1.38 GB birikir.",
      },
    ],
  },
  wow: [
    {
      title: "Milyar dolarlık hata",
      body:
        "Tony Hoare 1965'te ALGOL W'ye null referansı eklerken bunun 'kolay' olduğunu düşünüyordu. 2009'da Londra'daki bir konferansta bunu 'milyar dolarlık hatam' diye niteledi: kırk yıl boyunca null yüzünden çöken programların, güvenlik açıklarının ve kaybedilen zamanın maliyetini bu kadar tahmin ediyordu. Sayfadaki 'p = NULL' düğmesi aynı değeri gösterir; onu çözümlemek günümüz sistemlerinde hâlâ en sık çökme sebeplerinden biridir.",
    },
    {
      title: "99 satır, 6000 makine",
      body:
        "2 Kasım 1988'de yayılan Morris solucanı, Unix'in fingerd servisinde 512 baytlık bir tampona 536 bayt göndererek yığındaki dönüş adresinin üzerine yazdı. Sonuç, interneti oluşturan yaklaşık 60 bin makineden tahminen altı bininin saatlerce durması oldu. Robert Tappan Morris, 1986 tarihli Bilgisayar Dolandırıcılığı ve Kötüye Kullanım Yasası'ndan mahkûm edilen ilk kişi oldu; olay, tampon taşmasının bir 'programcı hatası' değil bir güvenlik sorunu olduğunu dünyaya öğretti.",
    },
    {
      title: "Hataların yüzde yetmişi",
      body:
        "Microsoft 2019'da, her yıl yamaladığı güvenlik açıklarının yaklaşık yüzde 70'inin bellek güvenliği hatası olduğunu açıkladı; sarkan işaretçiler, tampon taşmaları ve use-after-free'ler. Chromium ekibi 2020'de 2015'ten beri kaydettiği ciddi hataların yüzde 70'inde aynı sonuca ulaştı. Bu sayılar, Rust gibi sahipliği derleme anında denetleyen dillerin neden hızla yayıldığını ve Aralık 2022'de Linux 6.1 çekirdeğine neden Rust desteği eklendiğini açıklar.",
    },
  ],
  worked: {
    title: "Yığın ne zaman taşar?",
    prompt:
      "Sayfadaki model her çerçeveyi 64 bayt sayıyor ve Stack Pointer 0x7FF0'dan başlıyor. Altı çerçeve varken SP'yi hesapla. Sonra aynı çerçeve boyuyla, Linux'un varsayılan 8 MiB'lik yığınında 'n ≤ 1' koşulunu unutmuş bir factorial kaç çağrıdan sonra taşar?",
    steps: [
      "Çerçeve boyunu onaltılığa çevir: 64 = 0x40. Altı çerçeve: 6 × 0x40 = 0x180 (ondalık 384 bayt).",
      "SP'yi bul: 0x7FF0 − 0x180 = 0x7E70. Kontrol: 0x7FF0 = 32 752, 32 752 − 384 = 32 368 = 0x7E70. Sayfada altıncı çerçeveden sonra satır tam bunu yazar.",
      "Yığın sınırını bayta çevir: 8 MiB = 8 × 1 048 576 = 8 388 608 bayt.",
      "Çağrı sayısını bul: 8 388 608 / 64 = 131 072 çerçeve. Yani 131 072'nci özyinelemeli çağrı civarında yığın biter ve program segmentation fault ile ölür.",
      "Ölçeğe bak: gerçek derleyiciler factorial için 32–64 baytlık çerçeveler üretir; sayı yüz binler mertebesinde kalır. Bir milyonluk bir derinliğe yığınla ulaşamazsın; bunu özyinelemeyi döngüye çevirmek ya da öbekte kendi yığınını kurmak çözer.",
    ],
    result:
      "Altı çerçeve: SP = 0x7E70. 64 baytlık çerçevelerle 8 MiB'lik yığın 131 072 çağrıda dolar. Yığın hızlıdır ama sınırlıdır; sınırsız olan öbek, sınırsız sorumlulukla gelir.",
  },
  misconceptions: [
    {
      myth: "İşaretçi, gösterdiği değişkenin değerini tutar.",
      truth:
        "Adresini tutar, değerini değil. Sayfada p hücresinde 42 değil '→100' yazar. Değere ulaşmak ayrı bir adımdır: *p. Bu ayrım yüzünden aynı adresi iki işaretçiye verebilir, biriyle değiştirip öbürüyle okuyabilirsin; kopya değil, aynı yer.",
    },
    {
      myth: "free(p) işaretçiyi de siler; p artık boştur.",
      truth:
        "free yalnızca belleği ayırıcıya geri verir; p'nin içinde eski adres durmaya devam eder. İşte sarkan işaretçi budur: adres geçerli görünür ama arkasındaki bellek başkasına verilmiş olabilir. Bu yüzden deneyimli programcılar free'den hemen sonra p = NULL yazar.",
    },
    {
      myth: "p++ adresi 1 artırır.",
      truth:
        "Gösterilen tipin boyu kadar artırır: int için 4, double için 8 bayt. Sayfada p++ sonrası adres 0x100'den 0x104'e sıçrar. Bu kural dizi erişimini mümkün kılar ama bir char işaretçisiyle int işaretçisinin aynı '+1'de farklı yerlere gitmesi başlangıçta şaşırtır.",
    },
    {
      myth: "Sızan bellek program kapanınca da kayıp kalır; bilgisayar yavaş yavaş dolar.",
      truth:
        "Süreç bitince işletim sistemi bütün sayfalarını geri alır; sayfadaki 'Sıfırla' tam bunu yapar. Sızıntı, günlerce çalışan sunucular, tarayıcılar ve oyunlar için sorundur: her döngüde kaçan küçük bir parça birikir, program sonunda bellek bulamayıp çöker. Kısa ömürlü bir programda sızıntı çirkindir ama ölümcül değildir.",
    },
  ],
  glossary: [
    { term: "İşaretçi (pointer)", definition: "Başka bir değişkenin bellek adresini tutan değişken; sayfada p, 0x104'te durur ve içinde 0x100 yazar." },
    { term: "Adres alma (&)", definition: "Bir değişkenin bellekteki yerini veren işlem; &x, x'in adresidir." },
    { term: "Çözümleme (dereference, *)", definition: "İşaretçideki adrese gidip oradaki değere ulaşma; *p okumada değeri getirir, yazmada o adresi değiştirir." },
    { term: "Yığın çerçevesi (stack frame)", definition: "Bir fonksiyon çağrısının yığındaki alanı: parametreler, yerel değişkenler ve dönüş adresi; fonksiyon dönünce silinir." },
    { term: "Öbek (heap)", definition: "malloc/new ile elle ayrılıp free/delete ile elle geri verilen, fonksiyon ömründen bağımsız bellek bölgesi." },
    { term: "Sarkan işaretçi (dangling pointer)", definition: "Geri verilmiş ya da silinmiş belleği göstermeye devam eden işaretçi; kullanılırsa tanımsız davranış." },
    { term: "Tanımsız davranış (undefined behavior)", definition: "C standardının sonucunu belirlemediği işlem; program çökebilir, yanlış değer verebilir ya da tesadüfen doğru çalışabilir." },
    { term: "Bayt sırası (endianness)", definition: "Çok baytlı bir sayının baytlarının bellekteki dizilişi; little-endian'da 0x0A0B0C0D, 0D 0C 0B 0A olarak saklanır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Sayfadaki 0x100 gibi adresler aslında <strong>sanal</strong> adreslerdir. Üniversitedeki sistem ve işletim sistemi derslerinde, her sürecin kendi adres alanında yaşadığını ve işlemcideki bellek yönetim biriminin (MMU) bu adresleri sayfa tabloları üzerinden fiziksel RAM'e çevirdiğini öğrenirsin; bu fikir 1962'de Manchester'daki Atlas bilgisayarında doğdu. Bellek modeli tuvalindeki bölgeler, bir programın diskteki yürütülebilir dosyasının (ELF) bölümleriyle birebir eşleşir; makine dili dersi, bir fonksiyon çağrısının yığına hangi sırayla ne koyduğunu, yani <em>çağrı kuralını</em> yazmaç yazmaç gösterir. Önbellek dersinde ise işaretçilerin gizli bedelini görürsün: bellekte dağınık duran bağlı liste düğümleri, yan yana duran dizi elemanlarından onlarca kat yavaş gezilebilir.",
      "İkinci büyük başlık <strong>bellek güvenliği</strong>dir. Çöp toplama algoritmaları (işaretle-süpür, kuşaklı toplayıcılar, referans sayma) 1959'daki Lisp fikrinin modern torunlarıdır ve Java'dan JavaScript'e her yerde çalışır. Rust bu soruna derleyiciyle cevap verir: her değerin tek bir sahibi vardır, ödünç alma kuralları derleme anında denetlenir ve çöp toplayıcı olmadan sarkan işaretçi imkânsız hale gelir. Valgrind ve AddressSanitizer gibi araçlar ise C programını çalışırken izleyip sayfadaki tehlike kartlarının her birini anında yakalar. Bir lisans öğrencisinin ilk işletim sistemi laboratuvarı genellikle tam bu sayfanın yaptığı şeydir: kendi malloc'unu yazmak.",
    ],
    topics: ["Sanal bellek, sayfalama ve MMU", "Çağrı kuralları ve ABI", "Önbellek ve veri yerelliği", "Çöp toplama algoritmaları", "Rust: sahiplik ve ödünç alma", "Bellek hata ayıklama: Valgrind, AddressSanitizer", "Kendi malloc'unu yazmak"],
  },
  quiz: [
    {
      question: "p bir int işaretçisi ve 0x100'ü gösteriyor. p++ sonrasında hangi adresi gösterir?",
      options: ["0x101", "0x102", "0x104", "0x108"],
      answer: 2,
      explanation: "İşaretçi aritmetiği gösterilen tipin boyuyla ilerler; int 4 bayt olduğundan 0x100 + 4 = 0x104. Sayfadaki 'p++' düğmesi tam bunu yapar ve okun '→104'e döndüğünü gösterir. char işaretçisi olsaydı 0x101, double olsaydı 0x108 olurdu.",
    },
    {
      question: "Aşağıdakilerden hangisi bellek sızıntısıdır?",
      options: ["free edilmiş bir bloğu yeniden okumak", "malloc ile alınan bloğun adresini hiçbir değişkende tutmamak", "Aynı bloğu iki kez free etmek", "Bir dizinin sınırını aşarak yazmak"],
      answer: 1,
      explanation: "Sızıntı, adresi kaybolduğu için artık free edilemeyen bellektir; sayfadaki 'İşaretçiyi Kaybet' düğmesinin yaptığı şey. İlk seçenek use-after-free, üçüncüsü double free, dördüncüsü buffer overflow: hepsi tehlike kartlarında ayrı ayrı durur.",
    },
    {
      question: "Sayfadaki çağrı yığınında dört çerçeve varken Stack Pointer kaçtır? (Başlangıç 0x7FF0, çerçeve 64 bayt)",
      options: ["0x7FF0", "0x7EF0", "0x7F30", "0x7E70"],
      answer: 1,
      explanation: "64 bayt = 0x40; dört çerçeve 4 × 0x40 = 0x100 eder. 0x7FF0 − 0x100 = 0x7EF0. SP azalır çünkü yığın yüksek adresten düşük adrese doğru büyür. 0x7F30 üç, 0x7E70 altı çerçevenin değeridir.",
    },
  ],
  next: [
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Bağlı listede her düğüm {değer, sonraki} taşır; 'sonraki' tam da bu sayfadaki işaretçidir. Zincirin nasıl kurulduğunu gör." },
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "&x ve *p derlenince hangi komutlara dönüşür? Yığın çerçevesinin yazmaç yazmaç kurulduğu yer." },
    { href: "isletim-sistemleri-ve-linux.html", title: "İşletim Sistemleri ve Linux", why: "Sanal adres alanını süreçlere kim dağıtır, sızan belleği süreç bitince kim toplar: işletim sisteminin tarafı." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Morris solucanının tampon taşmasından bugünün bellek güvenliği açıklarına; işaretçi hatalarının saldırıya dönüştüğü yer." },
  ],
  sources: [
    { title: "Wikipedia · Pointer (computer programming)", url: "https://en.wikipedia.org/wiki/Pointer_(computer_programming)", note: "Lawson'ın 1964 PL/I işaretçisi, işaretçi aritmetiği, null ve farklı dillerdeki karşılıklar (İngilizce)." },
    { title: "Wikipedia · Morris worm", url: "https://en.wikipedia.org/wiki/Morris_worm", note: "1988 solucanının fingerd/gets() taşması, yayılma tahminleri ve davanın sonucu." },
    { title: "Wikipedia · Memory safety", url: "https://en.wikipedia.org/wiki/Memory_safety", note: "Bellek güvenliği hatalarının sınıflandırması ve Microsoft/Chromium'un yüzde 70 istatistikleri; köprü bölümündeki araçlar." },
    { title: "MIT OpenCourseWare · 6.087 Practical Programming in C (IAP 2010)", url: "https://ocw.mit.edu/courses/6-087-practical-programming-in-c-january-iap-2010/", note: "İşaretçiler, dinamik bellek ve bağlı listeler için ders notları ve laboratuvarlarla kısa bir C dersi (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
