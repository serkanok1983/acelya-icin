window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["isaretciler-ve-bellek-yonetimi"] = {
  slug: "isaretciler-ve-bellek-yonetimi",
  title: "İşaretçiler ve Bellek: Adresi Elinde Tutmak",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir adresi elinde tutmak hem güç hem sorumluluktur. Bayt bayt görünen bir model bellekte işaretçiyi ilerlet, ayırıcının belleği nasıl parçaladığını say, taşmayı ve sarkan işaretçiyi adım adım izle.",
  hook:
    "2 Kasım 1988 gecesi, o günkü internetin tahminen onda biri birkaç saat içinde işlemez hâle geldi. Saldıran bir ordu değil, bir lisansüstü öğrencisinin yazdığı tek bir programdı; içeri girdiği kapılardan biri, 512 baytlık bir kutuya 536 bayt yazdırmaktan ibaretti. Bu sayfadaki model bellekte sekiz baytlık bir kutunun nasıl taştığını bayt bayt izleyeceksin.",
  bigIdea:
    "Bir <strong>işaretçi</strong>, değerin kendisini değil değerin bellekteki <em>adresini</em> tutar: <code>p = &amp;x</code> adresi alır, <code>*p</code> o adrese gider. Yığındaki bellek fonksiyonla birlikte kendiliğinden gelir ve gider; öbekten aldığın her baytı ise geri vermek senin sorumluluğundur.",
  story: [
    "1945'te John von Neumann, EDVAC raporunda belleği numaralı hücrelerden oluşan tek bir sıra olarak tarif etti: her hücrenin bir numarası, yani bir <strong>adresi</strong> vardı. Makine dilinde adreslerle oynamak ilk günden beri mümkündü; ama bir değişkenin içine başka bir değişkenin adresini koymak, yüksek düzeyli dillere sonradan girdi. Kiev'de Kateryna Yuşçenko 1955'te tasarladığı Adres programlama dilinde dolaylı adreslemeyi kullanmıştı; bu çalışma Sovyetler Birliği dışında uzun süre bilinmedi. Buluş çoğunlukla, 1964'te IBM'de PL/I diline 'pointer' adını verdiği değişken türünü ekleyen Harold Lawson'a atfedilir; liste ve ağaç gibi birbirine bağlı yapılar artık dilin içinde kurulabiliyordu. IEEE, Lawson'a 2000 yılında bu katkısı için Computer Pioneer ödülünü verdi. Aynı yıllarda Tony Hoare, ALGOL W dilinde 'hiçbir yeri göstermeyen' özel değeri, <strong>null</strong>'ı tanıttı (1965). Kırk dört yıl sonra, 2009'da bir konferansta bunu 'milyar dolarlık hatam' diye andı.",
    "İşaretçiyi gündelik araca çeviren dil C oldu. Ken Thompson'ın 1969'daki B dilinden yola çıkan Dennis Ritchie, 1972 dolaylarında Bell Laboratuvarları'nda C'yi tasarladı; 1973'te Unix çekirdeğinin büyük bölümü C ile yeniden yazıldı. C'nin tavrı açıktı: makineye yakın kal, programcıya adreslerle aritmetik yapma hakkı ver, çalışma anında onun arkasından denetleme yapma. Bu özgürlüğün iki yüzü vardı. Bir yüzünde, fonksiyon çağrılarının bir <strong>yığın</strong> üzerinde kendiliğinden yer bulması (Edsger Dijkstra 1960'ta özyinelemeli çağrıların yığınla nasıl yürütüleceğini ALGOL 60 için yazmıştı); öbür yüzünde, programcının <code>malloc</code> ile aldığı her bellek parçasını <code>free</code> ile kendisinin geri vermesi gerekliliği. Kernighan ve Ritchie'nin 1978 tarihli kitabı, böyle bir ayırıcının nasıl yazılacağını sekizinci bölümde bizzat gösterir: boş parçaların bağlı listesi, her parçanın başında bir boyut etiketi.",
    "Bedel, 1988'de ortaya çıktı. Cornell'de lisansüstü öğrencisi olan Robert Tappan Morris'in yazdığı solucan, Unix'in <code>fingerd</code> servisindeki sınır denetimsiz bir <code>gets()</code> çağrısına 536 bayt göndererek yığındaki dönüş adresinin üzerine yazdı ve kendi kodunu çalıştırdı. Yaygın tahmine göre o günkü yaklaşık 60 bin internet makinesinin altı bin kadarı etkilendi; bu sayının kendisi de bir tahmindir, daha düşük kestirimler vardır. 1996'da Phrack dergisindeki 'Smashing the Stack for Fun and Profit' yazısı tekniği herkesin okuyabileceği bir tarife dönüştürdü. 2014'teki Heartbleed açığı ise yazmayı değil okumayı kullandı: OpenSSL, bir mesajın iddia ettiği uzunluğa güvenip belleğinden her istekte 64 kilobayta kadar veri sızdırdı. Microsoft'tan bir güvenlik mühendisi 2019'da şirketin yamaladığı açıkların yaklaşık yüzde 70'inin bellek güvenliği hatası olduğunu bildirdi; Chromium ekibi 2020'de kendi ciddi güvenlik hataları için aynı oranı buldu.",
    "Cevaplar da sırayla geldi: John McCarthy'nin 1950'lerin sonunda Lisp için tasarladığı çöp toplayıcı, Bjarne Stroustrup'un C++'ta kaynağı nesnenin ömrüne bağlayan RAII fikri, 2011'de C++11 ile standarda giren <code>unique_ptr</code> ve <code>shared_ptr</code>, 2015'te 1.0 sürümüne ulaşan ve sahipliği derleme anında denetleyen Rust. Aralık 2022'de yayımlanan Linux 6.1 çekirdeği, otuz yılı aşan tarihinde ilk kez C ve assembly'nin yanına ikinci bir dili, Rust'ı kabul etti.",
  ],
  core: [
    {
      heading: "İki sayı: değer ve adres",
      body:
        "Her değişken bellekte bir yerde durur; o yerin numarası adresidir. Birinci sekmedeki 'Değişkenler' tablosuna bak: <code>int a[4]</code> 0x1010 adresinde başlar ve içinde 10, 20, 30, 40 durur. Adres ile değer birbirinden bağımsız iki sayıdır. <code>&amp;x</code> bir değişkenin adresini verir; <code>*p</code> ise bir adresi alıp 'oraya git, içindekini getir' der. Buna <strong>çözümleme</strong> (dereference) denir. İşaretçi de bellekte yer kaplayan sıradan bir değişkendir: sayfada <code>q</code> 0x1030'da durur ve sekiz baytında 0x1010 yazar; <code>pp</code> ise 0x1038'de durur ve q'nun adresini tutar. <code>**pp</code> iki kez yol alıp 10'a varır. '(*pp)++ : q'yu bir int ilerlet' düğmesine basınca değişen pp değil, 0x1030'daki sekiz bayttır: q 0x1014 olur, **pp 20'ye döner. Bağlı listeler ve ağaçlar bu zincirle kurulur. Model, yaygın 64 bitlik sistemlerin boyutlarını kullanır: int 4, işaretçi 8 bayt. C standardı bu sayıları sabitlemez; kendi sisteminde <code>sizeof</code> ile sorarsın.",
      formula: "p = &amp;x  ⇒  *p ≡ x",
      formulaNote:
        "& adres alır, * adrese gider. Sayfada pp = 0x1030, *pp = 0x1010, **pp = 10. '*p = değer yaz' düğmesi de aynı yoldan gider: p'nin gösterdiği adresteki baytları değiştirir.",
    },
    {
      heading: "İşaretçi aritmetiği: adım boyu türden gelir",
      body:
        "Bir işaretçiye 1 eklemek adresi 1 artırmaz; gösterdiği türün boyu kadar artırır. Sayfa bunu ölçtürür: 'Ölçülen adres' p'yi k kez tek tek ilerleterek bulunur, yanındaki kutu taban + k × sizeof(T) çarpımını yazar, 'Fark' 0 bayt kalır. Taban a ve k = 1 iken int işaretçisi 0x1014'e, char işaretçisi 0x1011'e, double işaretçisi 0x1018'e gider. Dizilerin bütün sırrı budur: <code>a[k]</code>, tanım gereği <code>*(a + k)</code> demektir; toplama değişmeli olduğundan <code>k[a]</code> da aynı adrese varır. Dizinin on bininci elemanına ulaşmak bu yüzden ilk elemanına ulaşmak kadar sürer: tek çarpma, tek toplama. Kuralın sınırı bellidir: işaretçiyi dizinin son elemanının <em>bir ötesine</em> kadar ilerletebilirsin, ama o adresi çözümlemek ya da daha öteye geçmek tanımsız davranıştır. Derleyici bunu senin yerine denetlemez. Model durum satırında uyarır (satırın kenar çizgisi kırmızıya döner) ve o adresteki baytları yine de gösterir; gördüğün sayı modelin belleğine aittir, gerçek bir programın vereceği söz değildir.",
      formula: "p + k  →  adres(p) + k · sizeof(T)   ·   p − r = adres farkı ÷ sizeof(T)",
      formulaNote:
        "T = int, taban a (0x1010), k = 3, j = 1: p = 0x101C, r = 0x1014. Sayfa 'Ölçülen p − r' için 8 bayt ÷ 4 = 2 eleman, kuram için 3 − (1) = 2 eleman yazar: fark bayt değil eleman sayar.",
    },
    {
      heading: "Yığın: otomatik, hızlı ve geçici",
      body:
        "Bir işlev çağrıldığında yığına bir <strong>çerçeve</strong> (stack frame) konur: yerel değişkenler, saklanan yazmaçlar ve işin bitince nereye dönüleceğini söyleyen <strong>dönüş adresi</strong>. İşlev dönünce çerçeve tek hamlede bırakılır; <code>free</code> yok, unutma yok. Yaygın işlemcilerde yığın yüksek adresten düşük adrese doğru büyür. Bedeli sınırlı alandır: yaygın Linux dağıtımlarında ana iş parçacığının yığın sınırı varsayılan olarak 8 MiB'dir (<code>ulimit -s</code> ile görülür); sonsuz özyineleme bu sınıra dayanınca süreç çoğunlukla bir bölütleme hatasıyla durur. Yerel bir değişkenin adresini dışarı vermek de tehlikelidir: işlev dönünce o adres ömrü bitmiş bir nesneyi gösterir. Üçüncü sekmedeki 'Yığın tamponu taşması' programı çerçevenin öteki zaafını gösterir. Model çerçevede 8 baytlık <code>ad</code> dizisi 0x7F00'da, hemen üstünde <code>yetki</code> (0x7F08), sonra dolgu, kaydedilmiş çerçeve işaretçisi (0x7F10) ve dönüş adresi (0x7F18) durur. <code>strcpy</code> uzunluğa bakmaz: n karakter için n + 1 bayt yazar, 8'i aşan her bayt komşunun üzerine düşer. Verinin ve dönüş bilgisinin aynı bölgede yan yana durması, bir sınır hatasını güvenlik sorununa çevirir. Bu yerleşim modele aittir; gerçek derleyici sırayı değiştirebilir, araya koruma değeri koyabilir.",
      formula: "taşan bayt = max(0, n + 1 − 8)",
      formulaNote:
        "n karakter ve bir sonlandırıcı sıfır yazılır, dizi 8 bayttır. n = 12 için sayfa 'Dizinin dışına yazılan bayt (sayım)' kutusunda 5, kuram kutusunda '5; fark 0' gösterir.",
    },
    {
      heading: "Öbek: ayırıcının defteri",
      body:
        "Boyutunu önceden bilmediğin ya da işlevden uzun yaşaması gereken veri <strong>öbekten</strong> (heap) alınır: <code>malloc(n)</code> en az n kullanılabilir baytın adresini verir (yer yoksa NULL), <code>free(p)</code> onu geri alır. Ayırıcı her parçanın yanında kendi kaydını da tutar. İkinci sekmedeki model bunu sayar: her blok 8 baytlık başlık ile yük alanından oluşur ve boyu hizalamanın katına yuvarlanır. 8 baytlık hizalamada malloc(100) 112 baytlık blok tüketir; istenmeyen 4 bayt <strong>iç parçalanmadır</strong>. Gerçek ayırıcılar da benzer bir pay öder: 64 bitlik Linux'taki glibc'de 16 baytlık bir istek, boyut etiketi ve hizalama yüzünden 32 baytlık bir parça tüketir. <strong>Dış parçalanma</strong> ise boş alanın bölünmüşlüğüdür: toplam boş bayt yeter, ama hiçbir boş blok tek başına yetmez. Ayırıcı dolu blokları kaydıramaz, çünkü adresleri programın elindedir; elinden gelen, serbest kalan komşuları birleştirmektir. Hangi boş bloğun seçileceği de bir politikadır ve sezgi burada yanıltır: sayfanın varsayılan iş yükünde (tohum 5, 200 işlem) 'ilk uyan' 106 isteğin 9'unu, 'en iyi uyan' 13'ünü geri çevirir. Hizalamayı 16 bayt yapınca sıra döner: 11'e karşı 10. Sıralama iş yüküne ve ayara bağlıdır.",
      formula: "blok = yuvarla(n + 8, A)   ·   dış parçalanma = 1 − en büyük boş ÷ toplam boş",
      formulaNote:
        "A hizalama, 8 başlık baytıdır. Boş alan tek parçaysa oran %0,0 olur; hiç boş alan yoksa sayfa 'tanımsız: boş alan yok' yazar. Bu ölçüt ve sayılar küçük modele aittir; gerçek ayırıcılar boyut sınıfları kullanır.",
    },
    {
      heading: "Ömür hataları ve sahiplik",
      body:
        "Öbekte üç şey ters gidebilir; üçü de üçüncü sekmede satır satır izlenir. Adresi kaybedersen <code>free</code> çağıracak bir şeyin kalmaz: <strong>sızıntı</strong>. <code>free</code>'den sonra adresi kullanırsan başkasına verilmiş olabilecek belleğe dokunursun: <strong>sarkan işaretçi</strong>. Aynı adresi iki kez geri verirsen ayırıcının listesini bozarsın. Sızıntı israftır; öteki ikisi C'de <strong>tanımsız davranıştır</strong> ve modelin gösterdiği sonuç (42 yerine 7) olasılıklardan yalnızca biridir. Hepsinin kökü tek sorudur: bu belleğin <strong>sahibi</strong> kim? C++'ta <code>unique_ptr</code> tek sahiplidir; <code>shared_ptr</code> bir sayaç tutar, sayaç sıfıra inince belleği bırakır. Fikir eskidir; George Collins 1960'ta liste işleyen programlar için önermişti. Sayımın zaafı döngüdür: birbirini gösteren nesnelerin sayacı sıfıra inmez; <code>weak_ptr</code> sayılmayan bir başvuruyla döngüyü kırar. Java ve JavaScript'teki <strong>izleyen çöp toplayıcı</strong> köklerden yürür ve ulaşamadığı her nesneyi, döngüler dahil, geri verir. CPython ikisini birleştirir: sayar, döngüler için ayrıca bir toplayıcı çalıştırır. Dördüncü sekme iki kuralı aynı çizgede karşılaştırır.",
      formula: "sayımın sızdırdığı = erişilemeyen döngüler + onlardan ulaşılan nesneler",
      formulaNote:
        "Varsayılan çizgede 'kök → D' kalkınca D ⇄ E döngüsü ve E'nin gösterdiği F sızar: sayfa benzetimden de kuramdan da '3 (D, E, F)' bulur, fark 0. İşaretle-süpür aynı üçünü geri verir: 6 − 3 = 3.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir ve hepsi baytları tek tek görünen bir <strong>model bellekte</strong> çalışır; hiçbir şey kendiliğinden akmaz, her sayı bir tıklamayla hesaplanır. <strong>01 · İşaretçi aritmetiği</strong>: 0x1000 – 0x103F arasındaki 64 baytta 'Tür T', 'Taban adres', 'Artırma sayısı k' ve 'İkinci işaretçi' denetimleriyle p ve r'yi gezdirir, '*p = değer yaz' ile belleğe yazarsın; 'int dizisinde gez', 'int'i bayt bayt oku', 'Dizinin dışı' ve 'NULL' hazırları sık kullanılan durumları kurar. <strong>02 · Yığın ve öbek ayırıcı</strong>: 1024 baytlık arenada 'malloc(n)' ve 'free(p)' ile elle çalışır ya da tohumlu bir 'Rastgele iş yükü' üretirsin; 'Yerleştirme politikası', 'Hizalama' ya da birleştirme kutusu değişince aynı işlem dizisi baştan yürür. <strong>03 · Bellek hataları</strong>: 'Hata türü' menüsündeki beş model programı 'Bir adım', 'Bir adım geri' ve 'Sonuna kadar' düğmeleriyle satır satır yürütür, 'Düzeltilmiş sürümü göster' kutusuyla onarılmış hâliyle karşılaştırırsın. <strong>04 · Otomatik bellek yönetimi</strong>: en çok on nesnelik bir çizgede başvuru ekleyip kaldırır, başvuru sayımı ile işaretle-süpürün kararını yan yana okursun. Her sekmenin kendi 'Sekmeyi sıfırla' düğmesi vardır. Bir uyarı baştan: gerçek C'de buradaki hataların çoğu tanımsız davranıştır. Model her biri için tek bir sonuç seçer ve bunu açıkça yazar; gördüğün belirli bir sayı ya da 'model duruyor' iletisi, gerçek bir programın vereceği güvence değildir. Adresler, boyutlar ve iş yükleri de öğretim değeridir.",
    experiments: [
      {
        title: "Adım, türün boyu kadardır",
        predict:
          "Taban a (0x1010) ve k = 1 iken p hangi adresi gösterir? 'Tür T'yi int'ten char'a, sonra double'a çevirirsen adres ve okunan değer nasıl değişir? a[1] = 20 sayısının dört baytı bellekte hangi sırayla durur?",
        do:
          "'01 · İşaretçi aritmetiği' sekmesinde 'Sekmeyi sıfırla'ya bas; 'Ölçülen adres', kuram ve '*p' kutularını oku. 'Tür T' menüsünden önce char, sonra double seç. Ardından 'int'i bayt bayt oku' hazırına bas. Son olarak türü yeniden int yap, k kaydırıcısını 3'e, 'İkinci işaretçi' kaydırıcısını 1'e getir; sonra k'yi 4 yapıp durum satırını oku.",
        observe:
          "int: ölçülen adres 0x1014, kuram '0x1010 + 1 × 4 = 0x1014', fark 0 bayt, *p 20, baytlar 14 00 00 00. char: 0x1011, *p '0 ('\\0')'. double: 0x1018, *p '8,4880 × 10^−313' ve durum satırında katı örtüşme uyarısı. Hazır (char, k = 4): 0x1014, *p '20 (yazdırılamaz)'. k = 3, j = 1: ölçülen p − r '8 bayt ÷ 4 = 2 eleman', kuram '3 − (1) = 2 eleman'. k = 4: adres 0x1020, *p 0; durum satırının kenarı kırmızıya döner ve 'sonundan bir sonraki adres' yazar.",
        explain:
          "Aynı taban, aynı k, üç ayrı adres: adım türden gelir. char işaretçisi a[0] = 10'un ikinci baytına düşer; o bayt 0'dır, çünkü model little-endian'dır ve düşük değerli bayt (0A) düşük adrestedir. Aynı nedenle 0x1014'teki tek bayt 0x14 = 20'dir. double işaretçisi a[2] ile a[3]'ün sekiz baytını tek sayı diye yorumlar: aynı baytlar IEEE 754 kalıbında okununca 10<sup>−313</sup> mertebesinde anlamsız bir sayı çıkar; gerçek C'de bu okuma katı örtüşme kuralını çiğner. 0x1020'yi hesaplamak serbesttir, çözümlemek tanımsızdır: modelin orada gösterdiği 0 komşu d dizisinin baytlarıdır, gerçek bir programın sözü değil.",
      },
      {
        title: "Bellek var ama bitişik değil",
        predict:
          "1024 baytlık arenada sekiz kez malloc(100) yapıp p1, p3, p5 ve p7'yi geri verirsen 536 bayt boş yük alanı kalır. Bu durumda malloc(200) başarır mı? Başarmazsa, tek bir free ile durumu kurtarmak için hangi bloğu bırakırdın?",
        do:
          "'02 · Yığın ve öbek ayırıcı' sekmesinde 'Sekmeyi sıfırla', sonra 'Hazır dizi: delikli düzen'. 'Sayım' kutularını oku. 'İstek boyu n' kaydırıcısını 200 B yap, 'malloc(n)' düğmesine bas ve durum satırını oku. 'Serbest bırakılacak blok' menüsünden p2'yi seçip 'free(p)' düğmesine, ardından yeniden 'malloc(n)' düğmesine bas. Son olarak 'Serbest bırakınca komşu boş blokları birleştir' kutusunun işaretini kaldır.",
        observe:
          "Delikli düzen: başlıklar 9 × 8 = 72 B, kullanılan 416 B, boş 536 B, toplam 1024 B, korunum 0 B, en büyük boş 120 B, dış parçalanma %77,6, iç parçalanma 16 B. malloc(200) NULL döner: bitişik 208 bayt gerekir; boş blokların başlıklarıyla toplamı 576 bayt, en büyüğü 128 bayttır. Başarısız malloc 1 / 9. free(p2) iki komşuyla birleşir, en büyük boş 328 B olur; ikinci malloc(200) 0x2008 adresini alır (1 / 10). Birleştirme kapanınca aynı dizi baştan yürür: 2 / 10.",
        explain:
          "Her malloc(100), yuvarla(100 + 8, 8) = 112 baytlık blok tüketir; sekiz blok 896 bayt eder, sona 128 baytlık tek boş blok kalır. Dört delik 112'şer bayttır ve aralarında dolu bloklar durur: 576 bayt boştur, ama 208 baytlık bitişik yer yoktur. p2 gidince p1, p2 ve p3'ün yeri tek blokta birleşir: 3 × 112 = 336 bayt. Birleştirme kapalıyken aynı üç blok yan yana ama ayrı durur ve ikinci istek de geri çevrilir. Sayılar bu küçük modele aittir; gerçek ayırıcılar boyut sınıfları kullanır, işletim sisteminden yeni bellek de isteyebilir.",
      },
      {
        title: "Sekiz baytlık diziye dokuzuncu harf",
        predict:
          "ad dizisi 8 bayt, hemen yanında int yetki = 0 duruyor ve strcpy uzunluğa bakmıyor. Girdi uzunluğu n = 7, 8 ve 9 iken dizinin dışına kaç bayt yazılır? yetki ilk kez hangi n'de sıfırdan farklı olur: 8'de mi, 9'da mı?",
        do:
          "'03 · Bellek hataları' sekmesinde 'Hata türü' menüsünden 'Yığın tamponu taşması'nı seç. 'Girdi uzunluğu n' kaydırıcısını sırayla 7, 8, 9, 12, 16 ve 24 yap; her birinde 'Sonuna kadar' düğmesine bas, 'Ölçülen ve beklenen' kartlarını ve program çıktısını oku. Sonra 'Düzeltilmiş sürümü göster' kutusunu işaretle ve n = 24 için yeniden 'Sonuna kadar' de.",
        observe:
          "n = 7: dışarı yazılan 0 bayt, yetki 0. n = 8: 1 bayt, yetki yine 0, çıktı yok. n = 9: 2 bayt, yetki '65 = 0x00000041', çıktı 'ozel_islem() çağrıldı'. n = 12: 5 bayt, kuram '5; fark 0', yetki '1094795585 = 0x41414141', dönüş adresi '0x401136 (sağlam)'. n = 16: çerçeve işaretçisi bozulur, dönüş adresi sağlamdır. n = 24: 17 bayt, dönüş adresi '0x401100 (bozuk)', model durur. Düzeltilmiş sürümde 0 bayt; her şey sağlam.",
        explain:
          "strcpy n karakterin ardına bir de sonlandırıcı sıfır yazar: toplam n + 1 bayt, taşan max(0, n + 1 − 8). n = 8'de taşan tek bayt o sıfırdır ve yetki'nin zaten 0 olan ilk baytına düşer; hata vardır ama iz bırakmaz. n = 9'da oraya 'A' (0x41 = 65) gelir ve hiçbir satırın atamadığı bir değer bir dalı yönetir. snprintf dizinin boyunu bilir, girdiyi keser. Yerleşim ve durma anı modelin seçimidir: gerçek C'de bu taşma tanımsız davranıştır, derleyici değişkenleri başka sıraya koyabilir, araya koruma değeri yerleştirebilir.",
      },
      {
        title: "Döngü, sayacı sıfıra indirmez",
        predict:
          "Varsayılan çizgede D ile E birbirini, E ayrıca F'yi gösteriyor. 'kök → D' başvurusu kalkarsa program bu üç nesneye ulaşamaz. Başvuru sayımı kaçını geri verir, işaretle-süpür kaçını? E → D başvurusunu zayıf yaparsan ne değişir?",
        do:
          "'04 · Otomatik bellek yönetimi' sekmesinde 'Sekmeyi sıfırla'. 'Kök başvuruları' altındaki 'kök → D ×' düğmesine bas; 'Ölçülen ve kuram' kutularını ve 'Nesne nesne karar' tablosunu oku. Sonra 'Kaynak' menüsünden E'yi, 'Hedef' menüsünden D'yi seç, 'Zayıf başvuru olarak ekle' kutusunu işaretle ve 'Başvuru ekle' düğmesine bas. E → D zaten var olduğundan sayfa yeni bir başvuru eklemez, var olanı zayıfa çevirir.",
        observe:
          "Kök kalkınca: erişilebilen '3 (A, B, C)', işaretle-süpürün geri verdiği '3 (D, E, F)', kuram '6 − 3 = 3', sayımın geri verdiği '0 (yok)', sayımın sızdırdığı '3 (D, E, F)', kuram '3 (D, E, F)'; iki fark da 0. Tabloda D, E ve F'nin son sayacı 1'dir. E ⇢ D zayıf olunca durum satırı başvurunun 'güçlüden zayıfa çevrildi'ğini yazar: sızan '0 (yok)', sayımın geri verdiği '3 (D, E, F)', sayaç azaltma 2.",
        explain:
          "D'nin sayacını E, E'nin sayacını D tutar; F döngünün gösterdiği nesnedir ve E yaşadıkça onun sayacı da 1 kalır. Sayım yalnızca yerel bilgiye bakar; programdan kopmuş bir döngüyü ve ondan ulaşılanları bırakamaz. Kuram kutusu tam bunu sayar. İşaretle-süpürün ölçütü erişilebilirliktir: köklerden yürür, varamadığı her şeyi geri verir. Zayıf başvuru sayılmaz: D'nin sayacı 0'a iner, D bırakılırken E'nin, E bırakılırken F'nin sayacı azalır. Model yalnızca karar kuralını gösterir; duraklama süreleri ve kuşaklı toplama kapsam dışıdır.",
      },
    ],
  },
  wow: [
    {
      title: "Milyar dolarlık hata",
      body:
        "Tony Hoare 1965'te ALGOL W'ye null referansı eklerken gerekçesi basitti: gerçeklemesi çok kolaydı. 2009'da Londra'daki bir konferansta bunu 'milyar dolarlık hatam' diye niteledi; kırk yıl boyunca null yüzünden çöken programların, güvenlik açıklarının ve kaybedilen zamanın bedelini kabaca bu kadar tahmin ediyordu. Birinci sekmedeki 'NULL' hazırı p'ye aynı değeri koyar.",
    },
    {
      title: "536 bayt, binlerce makine",
      body:
        "2 Kasım 1988'de yayılan Morris solucanı, Unix'in fingerd servisinde 512 baytlık bir tampona 536 bayt göndererek yığındaki dönüş adresinin üzerine yazdı. En çok anılan tahmine göre interneti oluşturan yaklaşık 60 bin makinenin altı bin kadarı etkilendi. Olay, 1986 tarihli Bilgisayar Dolandırıcılığı ve Kötüye Kullanım Yasası kapsamında ABD'deki ilk ağır suç mahkûmiyetiyle sonuçlandı ve tampon taşmasının sıradan bir programcı hatası değil, bir güvenlik sorunu olduğunu dünyaya gösterdi.",
    },
    {
      title: "Açıkların yüzde yetmişi",
      body:
        "Microsoft'tan bir güvenlik mühendisi 2019'da, şirketin her yıl yamaladığı güvenlik açıklarının yaklaşık yüzde 70'inin bellek güvenliği hatası olduğunu bildirdi: sarkan işaretçiler, tampon taşmaları, use-after-free'ler. Chromium ekibi 2020'de kendi ciddi güvenlik hatalarında aynı orana ulaştı. İki ayrı kod tabanında çıkan aynı sayı, Rust gibi sahipliği derleme anında denetleyen dillere ilginin ve Aralık 2022'de Linux 6.1 çekirdeğine eklenen Rust desteğinin arkasındaki başlıca gerekçelerden biridir.",
    },
  ],
  worked: {
    title: "0x1024'teki dört bayt: 1073217536 nereden çıktı?",
    prompt:
      "Birinci sekmede 'Dizinin dışı' hazırına bas: T = int, taban a (0x1010), k = 5. Sayfa *p için 1073217536 gösterir. Bu sayıyı kâğıt üzerinde bul: p hangi adrestedir, orada kimin baytları durur ve dört bayt hangi tam sayıyı verir? Model: int 4 bayt, double 8 bayt (IEEE 754), bayt sırası little-endian; <code>double d[2]</code> 0x1020 adresinde başlar ve d[0] = 1,5'tir.",
    steps: [
      "Adresi hesapla: p = 0x1010 + 5 × 4 B = 0x1010 + 0x14 = 0x1024. a dizisi 4 × 4 B = 16 B tutar ve 0x101F'de biter; 0x1020 'sondan bir sonraki' adrestir, 0x1024 onun da ötesindedir ve d[0]'ın (0x1020 – 0x1027) üst yarısına düşer.",
      "1,5'i IEEE 754 çift duyarlıkta yaz: 1,5 = 1,1<sub>2</sub> × 2<sup>0</sup>. İşaret biti 0; üs alanı 0 + 1023 = 1023 = 0x3FF; kesir alanının ilk biti 1, kalan 51 biti 0. 64 bitin tamamı: 0x3FF8000000000000.",
      "Baytları belleğe diz: little-endian'da düşük değerli bayt düşük adrestedir. 0x1020'den 0x1027'ye doğru: 00 00 00 00 00 00 F8 3F.",
      "p'nin okuduğu dört bayt 0x1024 – 0x1027 aralığıdır: 00 00 F8 3F. Bunları int olarak yine little-endian birleştir: 0x3FF80000.",
      "Onluğa çevir: 0x3FF80000 = 0x40000000 − 0x00080000 = 2<sup>30</sup> − 2<sup>19</sup> = 1073741824 − 524288 = 1073217536.",
    ],
    result:
      "p = 0x1024'tür ve model orada 1073217536 gösterir: 1,5 sayısının üst dört baytı, int diye okunmuş hâli. 'Okunan baytlar' kutusu 00 00 F8 3F yazar. Bu sonuç modele aittir: gerçek C'de a + 5 adresini hesaplamak bile tanımsız davranıştır, derleyici a ile d'yi başka yerlere koyabilir ve okumanın ne vereceği konusunda hiçbir söz yoktur. Örneğin öğrettiği şudur: bellekte tür yoktur, yalnızca baytlar vardır; türü işaretçi getirir.",
  },
  misconceptions: [
    {
      myth: "p++ adresi 1 artırır.",
      truth:
        "Gösterilen türün boyu kadar artırır. Birinci sekmede taban a ve k = 1 iken int işaretçisi 0x1010'dan 0x1014'e, double işaretçisi 0x1018'e gider; yalnızca char işaretçisi 0x1011'e varır. 'Ölçülen adres' ile 'Kuram: taban + k × sizeof(T)' kutuları her seçimde aynı sayıyı gösterir. Dizi erişimini mümkün kılan kural budur.",
    },
    {
      myth: "free(p) işaretçiyi de siler; p artık boştur.",
      truth:
        "free yalnızca belleği ayırıcıya geri verir; p'nin içinde eski adres durmaya devam eder. Üçüncü sekmenin ilk programında free(p) satırından sonra p hâlâ 0x3000 değerini tutar ve tabloda 'sarkan' diye işaretlenir; sonraki malloc aynı parçayı q'ya verir. Modelde *p bu yüzden 42 yerine 7 okur; gerçek C'de bu okuma tanımsızdır, 7 de 42 de çökme de söz verilmiş bir sonuç değildir. free'den hemen sonra p = NULL yazmak yaygın bir alışkanlıktır, ama aynı adresi tutan başka kopyaları kurtarmaz.",
    },
    {
      myth: "Toplam boş bellek isteğimden büyükse malloc başarır.",
      truth:
        "malloc bitişik yer ister. İkinci sekmedeki delikli düzende boş blokların toplamı 576 bayttır, ama en büyüğü 128 bayt olduğu için malloc(200) NULL döner. Ayırıcı kullanılan blokları kaydırıp delikleri birleştiremez: C'de o blokların adresleri programın değişkenlerinde durur. malloc'un dönüş değerini denetlemek bu yüzden süs değildir.",
    },
    {
      myth: "Program çalıştı ve beklediğim çıktıyı verdi; demek ki bellek hatası yok.",
      truth:
        "Tanımsız davranışın olası sonuçlarından biri de doğru görünmektir. Yığın taşması modelinde n = 8 iken dizinin dışına bir bayt yazılır, ama hiçbir değer değişmez ve program olağan biçimde biter. Gerçek bir derleyici, tanımsız davranışın hiç olmayacağını varsayarak kodu dönüştürebilir; aynı program başka bir makinede ya da başka bir eniyileme düzeyinde farklı davranabilir. Sayfadaki sonuçlar modelin seçtiği tek sonuçtur. Hatayı çıktıya bakarak değil, AddressSanitizer ya da Valgrind gibi araçlarla ararsın.",
    },
  ],
  glossary: [
    { term: "İşaretçi (pointer)", definition: "Başka bir nesnenin bellek adresini tutan değişken; sayfada q, 0x1030'da durur ve içinde 0x1010 yazar." },
    { term: "Çözümleme (dereference, *)", definition: "İşaretçideki adrese gidip oradaki nesneye ulaşma; *p okumada değeri getirir, yazmada o adresteki baytları değiştirir." },
    { term: "Yığın çerçevesi (stack frame)", definition: "Bir işlev çağrısının yığındaki alanı: yerel değişkenler, saklanan yazmaçlar ve dönüş adresi; işlev dönünce bırakılır." },
    { term: "Öbek (heap)", definition: "malloc/new ile elle ayrılıp free/delete ile elle geri verilen, ömrü işlev çağrılarından bağımsız bellek bölgesi." },
    { term: "Parçalanma (fragmentation)", definition: "Belleğin kullanılamayan payı: iç parçalanma bir bloğun içinde istenenden fazla ayrılan bayt, dış parçalanma boş alanın bitişik olmayan küçük parçalara bölünmesidir." },
    { term: "Sarkan işaretçi (dangling pointer)", definition: "Geri verilmiş ya da ömrü bitmiş bir nesneyi göstermeye devam eden işaretçi; kullanılması tanımsız davranıştır." },
    { term: "Tanımsız davranış (undefined behavior)", definition: "C standardının hiçbir sonuç güvencesi vermediği işlem; program çökebilir, yanlış değer üretebilir ya da tesadüfen doğru çalışabilir." },
    { term: "Bayt sırası (endianness)", definition: "Çok baytlı bir sayının baytlarının bellekteki dizilişi; little-endian modelde 20 = 0x00000014, artan adreslerde 14 00 00 00 olarak durur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Sayfadaki 0x1000 gibi adresler öğretim değeridir; gerçek bir sistemde bir programın gördüğü adresler <strong>sanal</strong> adreslerdir. Bilgisayar Organizasyonu ve İşletim Sistemleri derslerinde, her sürecin kendi adres alanında yaşadığını ve işlemcideki bellek yönetim biriminin (MMU) bu adresleri sayfa tabloları üzerinden fiziksel RAM'e çevirdiğini öğrenirsin; fikir 1960'ların başında Manchester'daki Atlas bilgisayarında hayata geçti. Birinci sekmedeki adres alanı şemasında görülen Text, Data ve BSS bölgeleri, programın diskteki yürütülebilir dosyasının (Linux'ta ELF) bölümlerinden gelir; yığını ve öbeği ise çalışma anında çekirdek ve ayırıcı kurar. Sistem programlama dersi bir işlev çağrısının yığına ve yazmaçlara hangi sırayla ne koyduğunu, yani <em>çağrı kuralını</em> satır satır gösterir. Çözümlü örnekteki bayt hesabı da aynı dersin konusudur: veri gösterimi, hizalama ve bayt sırası, yapıların bellekte nasıl yerleştiğini ve iki makinenin birbirinin verisini nasıl okuyacağını belirler.",
      "İkinci büyük başlık <strong>bellek güvenliği</strong>dir. Çöp toplama algoritmaları (işaretle-süpür, kopyalayan ve kuşaklı toplayıcılar, başvuru sayımı) Lisp'teki ilk fikrin torunlarıdır ve Java'dan JavaScript'e her yerde çalışır; dördüncü sekme bunların yalnızca karar kuralını gösterir. Rust aynı soruya derleyiciyle cevap verir: her değerin tek bir sahibi vardır, ödünç alma kuralları derleme anında denetlenir ve güvenli Rust kodunda sarkan başvuru derlenmez. Valgrind ve AddressSanitizer gibi araçlar ise C programını çalışırken izleyip üçüncü sekmedeki hataların çoğunu, hatanın yapıldığı satırı göstererek yakalar; bedeli programın belirgin biçimde yavaşlamasıdır. Pek çok sistem programlama dersinin klasik ödevi de ikinci sekmenin gerçeğidir: kendi malloc ve free'ni yazmak, yani başlıkları, boş listeyi, bölmeyi ve birleştirmeyi kendi elinle kurmak.",
    ],
    topics: [
      "Sanal bellek, sayfalama ve MMU",
      "Çağrı kuralları ve ABI",
      "Hizalama, önbellek ve veri yerelliği",
      "Çöp toplama algoritmaları",
      "Rust: sahiplik ve ödünç alma",
      "Bellek hata ayıklama: Valgrind, AddressSanitizer",
      "Kendi malloc'unu yazmak",
    ],
  },
  quiz: [
    {
      question:
        "Delikli düzende (sekiz malloc(100), sonra p1, p3, p5 ve p7 için free) 'Hizalama'yı 8 bayttan 4 bayta indirirsen 'Ölçülen iç parçalanma' ve 'En büyük boş blok' kutuları ne gösterir?",
      options: ["16 B ve 120 B; hizalama bu sayıları değiştirmez", "0 B ve 152 B", "0 B ve 120 B", "32 B ve 88 B"],
      answer: 1,
      explanation:
        "100 + 8 = 108 zaten 4'ün katıdır: blok 108 bayt, yük alanı tam 100 bayt olur, dolgu kalmaz. Sekiz blok 864 bayt eder; sona 160 baytlık boş blok kalır ve yük alanı 160 − 8 = 152 B'dir. 8 baytlık hizalamada blok 112 bayta yuvarlanıyor, kullanılan dört blokta 4 × 4 = 16 B dolgu birikiyor ve sona 128 baytlık blok (120 B yük) kalıyordu. Menüyü değiştirince aynı dizi baştan yürür ve bu iki sayıyı görürsün.",
    },
    {
      question:
        "Üçüncü sekmedeki yığın taşması modelinde ad dizisi 8 bayttır ve hemen ardında int yetki = 0 durur. strcpy ile kopyalanan girdinin uzunluğu n en az kaç olursa yetki sıfırdan farklı olur?",
      options: ["n = 7", "n = 8", "n = 9", "n = 12"],
      answer: 2,
      explanation:
        "strcpy n + 1 bayt yazar. n = 7'de sekiz bayt tam sığar. n = 8'de dokuzuncu bayt sonlandırıcı sıfırdır; yetki'nin ilk baytına düşer ama o bayt zaten 0'dır, değer değişmez. n = 9'da o bayta 'A' (0x41) yazılır ve yetki 65 olur. İz bırakmaması n = 8'i zararsız yapmaz: gerçek C'de ikisi de aynı tanımsız davranıştır. 8 ile 9 arasındaki fark bu modelin yerleşimine aittir; başka bir derleyicide komşu değişken bambaşka bir yerde durabilir.",
    },
    {
      question:
        "'Çift bağlı liste' hazırında (A ⇄ B ⇄ C ⇄ D, kök A) 'Bütün kökleri kaldır'a basınca başvuru sayımı dört nesneyi de sızdırır. Sayımın dördünü de geri verebilmesi için en az kaç başvuruyu zayıf yapman gerekir?",
      options: ["1 başvuru", "2 başvuru", "3 başvuru", "6 başvuru"],
      answer: 2,
      explanation:
        "Listede üç ayrı ikili döngü vardır: A ⇄ B, B ⇄ C, C ⇄ D. Bir çiftin iki başvurusu da güçlü kaldıkça sayaçları birbirini ayakta tutar; her çiftten bir kenar zayıf olmalıdır. Geri başvuruları (B → A, C → B, D → C) zayıf yapınca A'nın sayacı 0'a iner ve bırakma zincirleme D'ye kadar yürür: sayfa 'Sayımın geri verdiği' için '4 (A, B, C, D)', sayaç azaltma için 3 gösterir. Yalnızca B → A zayıfken sızan '3 (B, C, D)' kalır.",
    },
  ],
  next: [
    {
      href: "veri-yapilari.html",
      title: "Veri Yapıları Laboratuvarı",
      why:
        "Bağlı listede her düğümün 'sonraki' alanı bu sayfadaki işaretçidir. Araya eklemede dizinin kaydırdığı elemanları ve listenin izlediği işaretçileri say; büyüyen dizinin kopyalarını kuramla karşılaştır.",
    },
    {
      href: "makine-dili-assembly-c.html",
      title: "Makine Dili → Assembly → C",
      why:
        "Küçük bir işlemcide özyineli faktöriyeli adım adım çalıştır: 'Yığın ve çağrı' sekmesi her CALL'un yığına yazdığı dönüş adresini gösterir, ölçülen yığın derinliğini kuramın öngördüğüyle karşılaştırır.",
    },
    {
      href: "isletim-sistemleri-ve-linux.html",
      title: "İşletim Sistemleri ve Linux Laboratuvarı",
      why:
        "Bir programın gördüğü adresler gerçekte sanal adreslerdir. 'Sanal bellek' sekmesinde bir adresi sayfa numarası ile ofsete böl, sayfa hatalarını say; FIFO, LRU ve OPT'yi karşılaştır.",
    },
    {
      href: "bilgisayar-sistemleri-ve-mimarisi.html",
      title: "Bilgisayar Mimarisi Laboratuvarı",
      why:
        "Baytların ardındaki gösterimi aç: ikiye tümleyen ve IEEE 754 bitleri. 'Önbellek' sekmesinde aynı diziyi satır satır ve sütun sütun gezmenin ıska oranını ölç.",
    },
  ],
  sources: [
    {
      title: "Wikipedia · Pointer (computer programming)",
      url: "https://en.wikipedia.org/wiki/Pointer_(computer_programming)",
      note:
        "Lawson'ın 1964 PL/I işaretçisi ve 2000 ödülü, işaretçi aritmetiği, null ve farklı dillerdeki karşılıklar (İngilizce).",
    },
    { title: "Wikipedia · Morris worm", url: "https://en.wikipedia.org/wiki/Morris_worm", note: "2 Kasım 1988 solucanı: fingerd tampon taşması, 6000/60 000 tahmininin kaynağı ve davanın sonucu (İngilizce)." },
    {
      title: "Wikipedia · Memory safety",
      url: "https://en.wikipedia.org/wiki/Memory_safety",
      note:
        "Bellek güvenliği hatalarının sınıflandırması, Microsoft ve Chromium'un yüzde 70 bulguları, Valgrind ve AddressSanitizer gibi araçlar (İngilizce).",
    },
    {
      title: "MIT OpenCourseWare · 6.087 Practical Programming in C (IAP 2010)",
      url: "https://ocw.mit.edu/courses/6-087-practical-programming-in-c-january-iap-2010/",
      note:
        "İşaretçiler ve dinamik bellek ayırmayı ders notları, ödevler ve laboratuvarlarla işleyen kısa bir C dersi (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
