window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["internet-ve-ag-teknolojileri"] = {
  slug: "internet-ve-ag-teknolojileri",
  title: "İnternet: Paketlerin Dünya Turu",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir tıklamayla yola çıkan veri küçük paketlere bölünür, denizaltı kablolarında ışık hızının üçte ikisiyle gider; yolu yönlendiriciler, adresi DNS, güvenilirliği TCP sağlar. Dört deneyle zinciri tek tek aç.",
  hook:
    "29 Ekim 1969 gecesi Los Angeles'ta bir öğrenci, yaklaşık 500 kilometre uzaktaki bir bilgisayara 'LOGIN' yazmaya çalıştı. L gitti, O gitti, karşı taraf çöktü. Ağın ilk mesajı 'LO' oldu. Bugün bir paket İstanbul'dan San Francisco'ya saniyenin onda birinden kısa sürede varıyor; peki yolu kim söylüyor, adresi kim buluyor, paket kaybolursa kim fark ediyor?",
  bigIdea:
    "İnternet tek bir ağ değil, ortak bir dil (IP) konuşan ağların ağıdır: veri küçük <strong>paketlere</strong> bölünür, her paket kendi adresini taşır, her yönlendirici yalnızca bir sonraki adımı bilir; güvenilirliği uçlardaki TCP, isimleri DNS, adres düzenini CIDR sağlar.",
  story: [
    "1960'ların başında iki mühendis birbirinden habersiz aynı fikre vardı: veriyi tek bir sürekli hat yerine küçük parçalar hâlinde göndermek. RAND'da Paul Baran, bir saldırıda santralleri yıkılsa bile ayakta kalacak bir haberleşme ağı tasarlıyor, parçaların yollarını kendilerinin bulmasını istiyordu. İngiltere'de Donald Davies aynı parçalara 1965'te bir ad verdi: <strong>paket</strong>. MIT'de Leonard Kleinrock ise kuyruk teorisiyle veri ağlarındaki beklemenin matematiğini yazıyordu. ABD Savunma Bakanlığı'nın araştırma kolu ARPA bu fikri 1969'da gerçeğe dönüştürdü. İlk yönlendiriciler, BBN şirketinin yaptığı buzdolabı boyutundaki IMP'lerdi. 29 Ekim 1969'da UCLA'da Charley Kline, Stanford Araştırma Enstitüsü'nde (SRI) Bill Duvall'ın başında durduğu bilgisayara bağlanmayı denedi: 'LOGIN' yazacaktı, iki harften sonra karşı taraf çöktü. Yaklaşık bir saat sonra yeniden denediler ve bu kez oldu. Aralık 1969'da ARPANET'in dört düğümü vardı: UCLA, SRI, Santa Barbara ve Utah.",
    "Birkaç yıl içinde başka ağlar da doğdu: radyo ağları, uydu ağları, yerel ağlar. Sorun, hepsinin farklı dil konuşmasıydı. Mayıs 1974'te Vint Cerf ve Bob Kahn, 'Paket Ağlarının Birbiriyle Haberleşmesi İçin Bir Protokol' başlıklı makaleyle çözümü yazdı: her ağ kendi iç işini bildiği gibi yapsın, ama aralarına giren bir <strong>geçit</strong> ortak bir zarf biçimini anlasın. Zamanla bu tasarım ikiye ayrıldı: zarf IP, zarfların kaybolmasını uçlarda telafi eden kurallar bütünü TCP oldu. 1 Ocak 1983'te ARPANET eski protokolü NCP'yi kapatıp TCP/IP'ye geçti; mühendisler o güne 'bayrak günü' der. Aynı yılın sonunda Paul Mockapetris, o güne dek tek bir dosyada elle tutulan ve bütün bilgisayarlara kopyalanan isim listesinin (HOSTS.TXT) yerine dağıtık bir sistem önerdi: <strong>DNS</strong>. Uluslararası Standartlar Örgütü 1984'te yedi katmanlı OSI modelini yayımladı; yıllar süren 'protokol savaşlarında' OSI kâğıt üzerinde daha düzenliydi ama TCP/IP çalışan kod ve açık belgelerle kazandı. Bugün OSI bir sınıflandırma dili olarak, TCP/IP ise kabloların içinde yaşıyor.",
    "Mart 1989'da CERN'de Tim Berners-Lee, bu ağın üstüne bir uygulama önerdi: birbirine bağlı belgeler. İlk web sitesi 1991'de dış dünyaya açıldı. Ağ büyüdükçe adresler tükenmeye başladı; 1993'te sınıf tabanlı adresleme bırakıldı ve sayfadaki hesaplayıcının kullandığı <strong>CIDR</strong> düzeni geldi. Türkiye de aynı yıl bağlandı: kayıtlara göre 12 Nisan 1993'te ODTÜ'den ABD'ye saniyede 64 kilobitlik kiralık bir hat açıldı; bu hız 3 megabaytlık tek bir fotoğrafı altı dakikada taşır. 3 Şubat 2011'de IANA elindeki son IPv4 bloklarını dağıttı. Ağın felsefesi ise ilk günden değişmedi: ortası yalın, uçları akıllıdır. Yönlendiriciler yalnızca başlığa bakıp paketi ileri atar; hata düzeltme, sıralama ve şifreleme iki uçtaki bilgisayarlara kalır. Jon Postel'in 1980'de TCP belgesine yazdığı ilke hâlâ anılır: gönderirken tutucu, alırken hoşgörülü ol.",
  ],
  core: [
    {
      heading: "Paket: kendi adresini taşıyan zarf",
      body:
        "Eski telefon ağı iki kişi için bir hattı baştan sona ayırırdı; internet öyle yapmaz. Veri çoğunlukla 1500 baytı aşmayan parçalara bölünür ve her parçanın önüne bir <strong>başlık</strong> eklenir: kaynak adresi, hedef adresi, uzunluk, bir de yaşam sayacı. Her <strong>yönlendirici</strong> paketi alır, hedef adrese bakar, tablosunda 'bu adres için bir sonraki kapı hangisi' sorusunun cevabını bulur ve paketi o kapıdan gönderir. Yolun tamamını kimse bilmez; herkes yalnızca bir adımı bilir. Sayfadaki çizimde paket İstanbul'dan çıkıp dört yönlendiriciden geçer; Frankfurt ve Chicago çizili olduğu hâlde tablo onları seçmediği için paket oraya hiç uğramaz. Yaşam sayacı TTL her yönlendiricide bir azalır; sıfıra inen paket atılır. Böylece yanlış kurulmuş bir tablo paketleri sonsuza dek döndüremez. Traceroute programı bu kuralı bir ölçme aracına çevirir: TTL'i 1, 2, 3 diye artırarak paket gönderir, her seferinde paketi atan yönlendirici 'süre doldu' mesajıyla adresini bildirir.",
      formula: "TTL<sub>çıkış</sub> = TTL<sub>giriş</sub> − 1;  TTL = 0 ⇒ paket atılır, ICMP 'Time Exceeded' döner",
      formulaNote: "Linux ve macOS paketleri TTL = 64 ile, Windows 128 ile yola çıkarır. Hedef bilgisayar sayacı azaltmaz: sayfada 64 ile çıkan paket dört yönlendiriciden sonra 60 ile varır.",
    },
    {
      heading: "Katmanlar: zarfın içinde zarf",
      body:
        "Tarayıcının yazdığı HTTP isteği doğrudan kabloya gitmez; aşağı inerken her katman kendi zarfını ekler. Taşıma katmanı (TCP) port numaralarını ve sıra numarasını yazar, ağ katmanı (IP) dünya çapında geçerli adresleri ekler, veri bağı katmanı (Ethernet ya da Wi-Fi) yalnızca yerel ağda anlamlı donanım adreslerini koyar ve en sonda her şey bit olup fibere ya da havaya çıkar. Alıcı tarafta zarflar ters sırayla açılır. Bu düzenin gücü <strong>bağımsızlıktır</strong>: Wi-Fi'den fibere geçtiğinde yalnızca en dış zarf değişir, TCP ve HTTP bunu fark etmez. Aynı sayede HTTP de alttakilere dokunmadan yenilenebildi: HTTP/1.1 (1997) ve HTTP/2 (2015) TCP üstünde çalışır, HTTP/3 (2022) ise UDP üstüne kurulu QUIC'i kullanır. Sayfadaki OSI şeridinde bir katmana tıkladığında veri birimini (bit, çerçeve, paket, segment) ve örnek protokollerini görürsün. Yedi katmanın oturum ve sunum basamakları TCP/IP'de ayrı birer katman olarak yaşamaz; mühendisler çoğu zaman dört ya da beş katmandan söz eder.",
      formula: "Çerçeve = Ethernet başlığı (14 B) + IP başlığı (20 B) + TCP başlığı (20 B) + veri (≤ 1460 B)",
      formulaNote: "Ethernet'in taşıdığı en büyük IP paketi 1500 bayttır (MTU); seçeneksiz IP ve TCP başlıkları 40 bayt tutar, veriye 1460 bayt kalır. Çerçevenin sonuna 4 baytlık bir hata denetim kodu da eklenir.",
    },
    {
      heading: "TCP: her baytın bir numarası var",
      body:
        "IP paketleri kaybedebilir, geç getirebilir, sırasını karıştırabilir; söz vermez. Güvenilirliği TCP, iki ucun arasında kurar. Gönderilen her bayta bir <strong>sıra numarası</strong> verilir; alıcı 'şu numaraya kadar aldım, sıradaki şunu bekliyorum' diyen bir <strong>onay</strong> (ACK) gönderir. Onayı gelmeyen parça yeniden yollanır, karışık gelenler numaraya göre dizilir. Bağlantı başlamadan önce iki taraf başlangıç numaralarını paylaşır; sayfadaki üç adımlı el sıkışma bu alışveriştir. İstemci SYN bayrağıyla 'benim numaram 1000' der; sunucu hem bunu onaylar (ack = 1001) hem kendi numarasını söyler (seq = 5000); istemci de onu onaylar (ack = 5001). SYN bayrağı veri taşımadığı hâlde bir bayt gibi sayılır, onay numaralarının birer fazla olması bundandır. İki yönün de numarası onaylanmadan veri akmaz; üçten az mesajla bu sağlanamaz.",
      formula: "ack = seq + alınan bayt sayısı   (SYN ve FIN birer bayt sayılır)",
      formulaNote: "Sıra numaraları 32 bitliktir ve 2³² = 4 294 967 296 bayttan sonra başa sarar; 1 Gbit/s'lik bir hatta bu yalnızca 34 saniye sürer. Başlangıç numarası tahmin edilemesin diye rastgele seçilir; sayfadaki 1000 ve 5000 okunaklı olsun diye seçilmiştir.",
    },
    {
      heading: "CIDR: adresin kaçı sokak, kaçı kapı numarası?",
      body:
        "Bir IPv4 adresi 32 bittir; noktalarla ayrılmış dört sayı yalnızca insan okusun diyedir. '/24' eki, soldaki 24 bitin <strong>ağ kısmı</strong>, kalan 8 bitin cihaz kısmı olduğunu söyler. Aynı ağdaki cihazlar birbirine yönlendirici olmadan ulaşır; farklı ağdakiler için paket varsayılan geçide verilir. Ağ adresi, adresle maskenin bit bit VE'lenmesidir. Cihaz bitlerinin hepsi sıfır olan adres ağın adı, hepsi bir olan adres <strong>yayın</strong> adresidir; ikisi de cihazlara verilmez, bu yüzden kullanılabilir adres sayısı toplamdan iki eksiktir. Ön eke eklenen her bit ağ sayısını ikiye katlar, ağ başına adresi yarıya indirir: /24'te 254 cihaz, /26'da 62, /30'da yalnızca 2. Omurgadaki yönlendiriciler tek tek adresleri değil, bu ön ekleri bilir; birden çok ön ek uyuyorsa 'en uzun eşleşen ön ek' kuralı paketi en özgül rotaya gönderir.",
      formula: "Kullanılabilir adres = 2<sup>32 − n</sup> − 2;  Ağ = Adres AND Maske",
      formulaNote: "n ön ek uzunluğu. /31 ve /32 istisnadır: iki yönlendirici arasındaki hatlarda /31'in iki adresi de kullanılabilir (2000'de eklenen kural), /32 tek bir cihazı gösterir. Sayfa ikisini de böyle hesaplar.",
    },
    {
      heading: "DNS: isimden sayıya giden yedi adım",
      body:
        "Yönlendiriciler isim bilmez, sayı bilir. 'tr.wikipedia.org' yazdığında bilgisayarın önce yakınındaki bir <strong>özyinelemeli çözümleyiciye</strong> (çoğunlukla internet sağlayıcının ya da 1.1.1.1 gibi açık bir sunucunun) sorar. Çözümleyici cevabı bilmiyorsa yukarıdan aşağıya iner: önce <strong>kök</strong> sunuculara ('org'u kim yönetiyor?'), sonra üst düzey alan (TLD) sunucusuna ('wikipedia.org'u kim yönetiyor?'), en sonda alan adının <strong>yetkili</strong> sunucusuna ('tr.wikipedia.org'un adresi ne?'). Cevap, kayıt sahibinin belirlediği süre boyunca önbellekte tutulur; aynı soru yeniden gelirse bu yol hiç yürünmez. Kök sunucular harflerle anılır, a'dan m'ye on üç tane; ama her harfin adresini dünyaya dağılmış çok sayıda makine paylaşır (anycast) ve soru çoğunlukla en yakındakine ulaşır. Sayfadaki akış bu yedi adımı canlandırır: yazdığın ismi satırlara işler ama gerçek bir sorgu göndermez.",
      formula: "İlk sorgu: 3 gidiş-dönüş (kök → TLD → yetkili);  önbellekte varsa: 0",
      formulaNote: "Çözümleyicinin verdiği cevabın da bir 'TTL'i vardır ama bu, paketlerdeki yaşam sayacı değil, kaydın önbellekte kalma süresidir (saniye).",
    },
  ],
  lab: {
    intro:
      "Sayfada beş düzenek ve bir kart dizisi var. En üstte ağ çizimi ile <strong>Paket Gönder</strong>, <strong>Sıfırla</strong> ve <strong>Hızlı</strong> düğmeleri; altında <strong>Atlama (hop)</strong>, <strong>Gecikme</strong> ve <strong>TTL</strong> göstergeleri. Sonra her basışta bir adım ilerleyen <strong>El Sıkışmayı Başlat</strong> düğmesi; tıklanabilir yedi OSI katmanı; alan adı kutusu ve <strong>Çözümle</strong> düğmesiyle DNS akışı; IP/CIDR kutusu, <strong>Hesapla</strong> düğmesi ve 8–30 arası ön ek kaydırıcısıyla alt ağ hesaplayıcı; en altta on iki protokol kartı. Gecikme göstergesi bir ölçüm değildir: rotadaki hatların yaklaşık uzunluğunu camdaki ışık hızına (200 000 km/s) bölerek tek yön için alt sınırı hesaplar.",
    experiments: [
      {
        title: "Beş atlama, dört yönlendirici, TTL 60",
        predict:
          "Kesikli çizgiyle vurgulanan rotada kaç hat, kaç yönlendirici var? Paket 64 ile çıkıyorsa hedefe vardığında TTL kaç olmalı? Gecikmenin en büyük payı hangi hatta birikir?",
        do: "Paket Gönder'e bas ve paketi sonuna kadar izle; her düğümde Atlama, Gecikme ve TTL göstergelerini, paketin üstündeki küçük TTL etiketini oku. Sonra Sıfırla'ya, ardından Hızlı'ya basıp yeniden gönder ve süreyi karşılaştır.",
        observe:
          "Rota İstanbul → ISP Router → Londra → New York → San Jose → San Francisco: altı düğüm, beş atlama. Gecikme sırasıyla 0.1, 12.6, 40.5, 61 ve 61.3 ms (toplam 12 260 km) olur; TTL 63, 62, 61, 60 diye iner ve varışta 60 kalır. Frankfurt ve Chicago'ya hiç uğranmaz. Yolculuk normal hızda yaklaşık 7 saniye, Hızlı'da 2.3 saniye sürer.",
        explain:
          "TTL'i yalnızca yönlendiriciler azaltır: arada dört tane var, 64 − 4 = 60. En büyük sıçrama okyanusu geçen Londra–New York hattındadır: 5570 km / 200 000 km/s ≈ 28 ms. Toplam 12 260 km / 200 000 km/s = 61.3 ms. İstanbul–San Francisco büyük daire yayı 10 800 km, yani 54 ms olurdu; rota Londra ve New York'a uğradığı için yüzde 14 uzar. Gerçek bir 'ping' gidiş-dönüşü ölçer: bu rotada 123 ms'nin altına inemez.",
      },
      {
        title: "El sıkışmada sayıların izi",
        predict:
          "İstemci 'SYN, seq = 1000' gönderdiğinde sunucunun cevabındaki ack kaç olmalı? Üçüncü mesajda istemcinin seq'i neden 1000 değil de başka bir sayıdır?",
        do: "El Sıkışmayı Başlat'a üç kez bas; her basışta parlayan mesajı ve alttaki durum satırını oku. Dördüncü basış her şeyi başa alır.",
        observe:
          "Birinci basış: SYN seq=1000, durum SYN-SENT. İkinci: SYN + ACK seq=5000, ack=1001; durum satırı sunucuyu SYN-RECEIVED, istemciyi ESTABLISHED gösterir. Üçüncü: ACK seq=1001, ack=5001 ve 'Bağlantı kuruldu'.",
        explain:
          "ack, 'sıradaki beklediğim bayt' demektir; SYN bir bayt gibi sayıldığı için 1000'in onayı 1001'dir ve istemcinin bir sonraki numarası da 1001 olur. Her taraf kendi başlangıç numarasını seçer; sunucununki 5000. İstemci SYN + ACK'i aldığı anda bağlantıyı kurulmuş sayar, sunucu ise üçüncü mesajı bekler ve o ana dek yarım bağlantı için bellek ayırır. Bir sunucuya binlerce SYN gönderip üçüncü mesajı hiç yollamamak bu yüzden bilinen bir saldırıdır (SYN seli).",
      },
      {
        title: "DNS akışında kim kime soruyor?",
        predict:
          "Kutuya 'tr.wikipedia.org' yazıp Çözümle'ye basarsan Root Sunucu satırı hangi TLD'ye yönlendirecek? TLD sunucusu hangi alan adının yetkili sunucusunu gösterecek? Yedi satırın hepsinin yanması kaç saniye sürer?",
        do: "Önce varsayılan www.example.com ile Çözümle'ye bas ve yedi satırın sırayla parlamasını izle. Sonra tr.wikipedia.org yazıp Enter'a bas, satırları tek tek oku. Bir de www.odtu.edu.tr dene.",
        observe:
          "Satırlar 0.45 saniye arayla yanar, toplam yaklaşık 3 saniye. tr.wikipedia.org için Root Sunucu '.org TLD sunucusuna yönlendir (198.41.0.4)', TLD satırı 'wikipedia.org yetkili sunucusuna yönlendir' der. www.odtu.edu.tr için sıra .tr ve odtu.edu.tr olur. Cevap satırındaki adres hep 192.0.2.34'tür.",
        explain:
          "Ad sağdan sola çözülür: önce kök, sonra son etiket (org, tr), sonra alan adı. 198.41.0.4, kök sunuculardan a.root-servers.net'in gerçek adresidir. 192.0.2.34 ise gerçek değildir: 192.0.2.0/24 bloğu belgelerde örnek vermek için ayrılmıştır; sayfa sorgu yapmadığı için 'temsilî adres' notuyla bunu gösterir. Gerçekte ikinci sorgu önbellekten döner ve 3–5. satırlar hiç yaşanmaz; çözümleyici .org sunucularını zaten tanıyorsa kök adımı da atlanır.",
      },
      {
        title: "Bir ağı dörde böl",
        predict:
          "192.168.1.0/24 ağında 254 cihaz adresi var. Kaydırıcıyı /26'ya çekersen kullanılabilir sayı kaça düşer? 192.168.1.130 adresi /26'da hangi alt ağa düşer?",
        do: "Kaydırıcıyı 24'ten 26'ya çek; Alt Ağ Maskesi, Kullanılabilir ve Broadcast kutularını oku. Sonra kutuya 192.168.1.130/26 yazıp Hesapla'ya bas. En son kaydırıcıyı 30'a çek.",
        observe:
          "/26: maske 255.255.255.192, 62 kullanılabilir, Broadcast 192.168.1.63, ikili maskenin son sekizlisi 11000000. 192.168.1.130/26: Ağ Adresi 192.168.1.128, İlk Cihaz .129, Son Cihaz .190, Broadcast .191. Kaydırıcı 30'a gelince: toplam 4, kullanılabilir 2 (.129 ve .130), Broadcast .131.",
        explain:
          "İki bit ağa geçince cihaz bitleri 8'den 6'ya iner: 2⁶ − 2 = 62 ve /24 dört parçaya bölünür: .0, .64, .128, .192. 130'un ikilisi 10000010; ilk iki biti '10' olduğu için 128–191 bloğuna düşer. /30'da yalnızca son iki bit cihaza kalır: 130 = 100000<strong>10</strong>, ağ 128, yayın 131. /30 iki yönlendirici arasındaki hatların klasik boyudur: bir ağ adresi, bir yayın, iki uç.",
      },
    ],
  },
  wow: [
    {
      title: "İlk mesaj iki harfti",
      body:
        "29 Ekim 1969'da UCLA'dan SRI'a gönderilmek istenen 'LOGIN' kelimesinin yalnızca 'LO' kısmı ulaştı; alıcı bilgisayar çöktü ve tam bağlantı ancak bir saat kadar sonra kurulabildi. Ağın ilk yönlendiricileri (IMP) buzdolabı boyutundaydı, aralarındaki hatlar saniyede 50 kilobit taşıyordu. Aralık 1969'da ağın dört düğümü vardı; bugün bağlı cihazlar milyarlarla sayılıyor.",
    },
    {
      title: "Adres stoku 2011'de tükendi",
      body:
        "IPv4'te 2³² = 4 294 967 296 adres vardır. 3 Şubat 2011'de IANA elindeki son beş büyük bloğu (/8) bölgesel kayıt kuruluşlarına dağıttı; merkezî stok bitti. Ardılı IPv6 128 bit kullanır: 2¹²⁸ ≈ 3.4 × 10³⁸ adres. Bunu Dünya'nın yüzeyine (5.1 × 10¹⁴ m²) bölersen metrekare başına yaklaşık 6.7 × 10²³ adres düşer; bir mol maddedeki tanecik sayısı kadar. IPv4 yine de yaşıyor: NAT sayesinde bir evin bütün cihazları tek bir genel adresi paylaşıyor.",
    },
    {
      title: "Işıktan hızlı veri yok",
      body:
        "Kıtalar arası trafiğin çok büyük bölümü okyanus tabanındaki fiber kablolardan geçer ve camın içinde ışık boşluktakinden yavaştır: saniyede yaklaşık 200 000 km. İstanbul–San Francisco arası büyük daire boyunca 10 800 km'dir; tek yön en az 54 ms, gidiş-dönüş en az 108 ms. Kablolar düz çizgi izlemediği için ölçülen süre bunun üstünde kalır. Bant genişliğini artırmak bu sınırı kıpırdatmaz; borsalarda işlem yapan şirketlerin sunucularını borsanın veri merkezine taşımasının nedeni budur.",
    },
  ],
  worked: {
    title: "172.16.5.200/20 hangi ağda?",
    prompt:
      "Bir okulun ağında bir bilgisayarın adresi 172.16.5.200, ön eki /20. Ağ adresini, yayın adresini ve bu ağa sığacak cihaz sayısını bul; sonucu sayfadaki hesaplayıcıyla doğrula.",
    steps: [
      "Maskeyi yaz: /20, soldan 20 bit 1 demektir: 11111111.11111111.11110000.00000000, yani 255.255.240.0. İlk iki sekizli tamamen ağa ait; hesap üçüncü sekizlide dönüyor.",
      "Üçüncü sekizliyi ikiliye çevir: 5 = 00000101. Maskenin o sekizlisi 11110000 ile VE'le: 00000000 = 0. Dördüncü sekizli tamamen cihaz kısmı olduğu için sıfırlanır. Ağ adresi 172.16.0.0.",
      "Yayın adresi için cihaz bitlerinin hepsini 1 yap: üçüncü sekizli 00001111 = 15, dördüncü 255. Yayın adresi 172.16.15.255. Demek ki bu ağ 172.16.0.0'dan 172.16.15.255'e kadar on altı tane /24 bloğunu kapsıyor.",
      "Say: cihaz bitleri 32 − 20 = 12, toplam 2¹² = 4096 adres, kullanılabilir 4096 − 2 = 4094. İlk cihaz 172.16.0.1, son cihaz 172.16.15.254. 172.16.5.200 bu aralığın içinde; aynı ağdaki 172.16.12.7 ile yönlendiriciye uğramadan konuşur, 172.16.16.1 ile konuşamaz.",
      "Sayfada doğrula: kutuya 172.16.5.200/20 yazıp Hesapla'ya bas. Kaydırıcı kendiliğinden 20'ye gelir; Ağ Adresi 172.16.0.0, Alt Ağ Maskesi 255.255.240.0, Toplam Adres 4096, Kullanılabilir 4094 (tarayıcın binlik ayırıcı ekleyebilir), Broadcast 172.16.15.255 görünmeli.",
    ],
    result:
      "Ağ 172.16.0.0/20, yayın 172.16.15.255, 4094 cihaz. Ön ek sekizli sınırına denk gelmediğinde hesap, sınırın düştüğü sekizliyi ikiliye çevirip maskelemekten ibarettir.",
  },
  misconceptions: [
    {
      myth: "İnternet ile Web aynı şeydir.",
      truth:
        "İnternet 1969'da doğan paket ağının devamıdır; Web ise 1989'da önerilen, onun üstünde çalışan bir uygulamadır. Ağ üzerinden e-posta 1971'de gönderilmeye başlandı; Web'den yaklaşık yirmi yıl yaşlıdır. Oyun sunucuları, görüntülü aramalar ve bu sayfadaki DNS sorgusu Web'in parçası değildir ama hepsi internettir.",
    },
    {
      myth: "Veri tek bir kablodan, tek bir yoldan hedefe gider.",
      truth:
        "Veri paketlere bölünür ve her paket yönlendirme tablolarının o andaki kararına göre gider; bir hat koparsa ya da tablo değişirse aynı dosyanın iki paketi farklı yollardan dolaşabilir. Sırayı ve eksikleri alıcıdaki TCP toparlar. Çizimdeki Frankfurt ve Chicago hatları böyle yedek yollardır.",
    },
    {
      myth: "Bant genişliği artınca gecikme azalır.",
      truth:
        "Bant genişliği saniyede kaç bit sığdığını, gecikme bir bitin ne kadar sürede vardığını söyler; ikisi farklı büyüklüklerdir. Fiberdeki ışık hızı sınırı 10 800 km için 54 ms'dir, hattı bin kat genişletsen de değişmez. Oyunlarda 'ping'in yüksek olması çoğu zaman mesafe ve rota meselesidir, internet paketinin megabiti değil.",
    },
    {
      myth: "IP adresi, cihazın değişmez kimliğidir.",
      truth:
        "Adres çoğunlukla DHCP ile geçici verilir ve ağ değiştirince değişir; evdeki telefon, bilgisayar ve televizyon dış dünyaya tek bir genel adresle çıkar (NAT). Donanıma işlenen kimlik MAC adresidir; o da yalnızca yerel ağda görünür ve güncel telefonlar her Wi-Fi ağı için rastgele bir MAC adresi kullanabilir.",
    },
  ],
  glossary: [
    { term: "Paket", definition: "Verinin, başına kaynak ve hedef adresleri eklenmiş, tek başına yolculuk eden parçası; Ethernet'te en çok 1500 bayt." },
    { term: "Yönlendirici (router)", definition: "Paketi alıp hedef adresine göre tablosundan bir sonraki kapıyı seçen ve paketi oraya ileten cihaz." },
    { term: "IP adresi", definition: "Ağ katmanında bir arayüzü tanımlayan 32 bitlik (IPv4) ya da 128 bitlik (IPv6) sayı." },
    { term: "TTL", definition: "Paket başlığındaki yaşam sayacı; her yönlendiricide bir azalır, sıfırda paket atılır ve kaynağa 'süre doldu' mesajı döner." },
    { term: "Port", definition: "Aynı bilgisayardaki farklı programları ayıran 16 bitlik numara (0–65 535); HTTPS 443'ü, DNS 53'ü, SSH 22'yi kullanır." },
    { term: "DNS", definition: "Alan adlarını IP adreslerine çeviren, kök → TLD → yetkili sunucu hiyerarşisiyle çalışan dağıtık sistem." },
    { term: "CIDR ön eki", definition: "Adresin kaç bitinin ağ kısmı olduğunu söyleyen /n gösterimi; kalan 32 − n bit cihazlara ayrılır." },
    { term: "Gecikme ve bant genişliği", definition: "Gecikme bir bitin varış süresi (ms), bant genişliği saniyede geçen bit sayısıdır (Mbit/s); ilki mesafeye ve kuyruklara, ikincisi hattın kapasitesine bağlıdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede ağ bir dizi protokol adıdır; 'Bilgisayar Ağları' dersinde her biri bir <strong>algoritma ve bir matematik problemi</strong> olur. İlk hesap gecikmedir: L bitlik bir paketi R bit/s'lik hattan itmek L/R, d kilometrelik hattı s hızıyla geçmek d/s sürer; 1500 baytlık paket 10 Mbit/s'lik hatta 12 000 bit / 10⁷ bit/s = 1.2 ms'de çıkar, 5570 km'lik okyanusu 28 ms'de aşar. Üçüncü terim yönlendiricideki bekleyiştir ve kuyruk teorisinin konusudur: saniyede ortalama λ paketin geldiği, μ paketin işlendiği en yalın modelde (M/M/1) ortalama kalış süresi 1/(μ − λ)'dır; yük kapasiteye yaklaştıkça gecikme sınırsız büyür. Kleinrock'un 1960'lardaki tezi bu sorunun peşindeydi. TCP'nin 'ne hızda göndereyim' sorusunu 1988'de Van Jacobson'ın tıkanıklık denetimi cevapladı: kayıp yoksa pencereyi birer birer artır, kayıp görünce yarıya indir. Bu, kontrol teorisindeki bir geri besleme döngüsüdür.",
      "Yönlendirme tabloları çizge algoritmalarıyla dolar: OSPF her yönlendiricide Dijkstra'yı çalıştırır; ağların ağını birbirine bağlayan BGP ise komşuların ilan ettiği yolları, ticari anlaşmaları da gözeterek karşılaştıran bir yol-vektör yöntemidir. İkinci köprü güvenliktir: HTTPS, HTTP ile TCP arasına TLS zarfını koyar; 2018'de standartlaşan TLS 1.3 bağlantıyı tek gidiş-dönüşte kurar ve anahtar değişimi asal sayıların ya da eliptik eğrilerin aritmetiğine dayanır. Üçüncüsü dağıtık sistemlerdir: DNS önbelleği, anycast ve videoyu en yakın sunucudan getiren içerik dağıtım ağları aynı soruya cevap arar: dünyanın her yerinden gelen istekler tutarlı ve hızlı nasıl karşılanır? En altta ise bilgi kuramı durur: Shannon'ın C = B log<sub>2</sub>(1 + S/N) bağıntısı, B hertz genişliğindeki gürültülü bir kanaldan saniyede en çok kaç bit geçebileceğini söyler.",
    ],
    topics: ["Gecikme bileşenleri ve kuyruk teorisi (M/M/1)", "Tıkanıklık denetimi ve geri besleme", "En kısa yol algoritmaları: Dijkstra, Bellman–Ford", "TLS ve açık anahtarlı kriptografi", "Dağıtık sistemler ve önbellekleme", "Bilgi kuramı: Shannon kapasitesi"],
  },
  quiz: [
    {
      question: "192.168.1.0/24 ağını /26 ön ekiyle bölersen her alt ağda kaç cihaz adresi kullanılabilir?",
      options: ["64", "62", "128", "254"],
      answer: 1,
      explanation: "Cihaz bitleri 32 − 26 = 6, toplam 2⁶ = 64 adres; ağ adresi ve yayın adresi düşülünce 62 kalır. Sayfadaki kaydırıcıyı 26'ya çekerek doğrulayabilirsin.",
    },
    {
      question: "İstemci 'SYN, seq = 1000' gönderdi. Sunucunun SYN + ACK cevabındaki ack değeri ne olmalı?",
      options: ["1000", "1001", "5000", "5001"],
      answer: 1,
      explanation: "ack, alıcının sıradaki beklediği bayt numarasıdır; SYN bir bayt gibi sayıldığı için 1000 + 1 = 1001. 5000 sunucunun kendi başlangıç numarasıdır, 5001 ise istemcinin üçüncü mesajdaki onayı.",
    },
    {
      question: "Paketlerini TTL = 64 ile gönderen bir sunucuya 'ping' attın; gelen cevapların TTL'i 52 görünüyor. Cevap sana ulaşana dek kaç yönlendiriciden geçmiştir?",
      options: ["52", "64", "12", "13"],
      answer: 2,
      explanation: "TTL'i yalnızca yönlendiriciler, her biri bir azaltır; sunucu ve senin bilgisayarın azaltmaz. 64 − 52 = 12 yönlendirici. Sayfadaki pakette aynı hesap 64 − 4 = 60 verir. Windows sunucular 128 ile başladığından, 64'ten büyük bir cevap TTL'i işletim sistemi hakkında da ipucu taşır.",
    },
  ],
  next: [
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Paket açık bir zarftır; Diffie-Hellman iki ucun herkesin dinlediği hatta ortak anahtarı nasıl kurduğunu, güvenlik duvarı kuralları da hangi portun neden kapatıldığını gösterir." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma: Az Adım mı, Az Maliyet mi?", why: "Aynı ağırlıklı ızgarada BFS, Dijkstra ve A* çalışır; OSPF'nin tablolarını dolduran en düşük maliyetli yol fikrini adım adım izle." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi (Graph Theory)", why: "Sayfadaki düğümler ve hatlar bir çizgedir; kendi ağını çiz, kenarlara ağırlık ver, Dijkstra ile en kısa yolu buldur." },
    { href: "asal-rsa.html", title: "Asal Sayılar ve RSA: Elekten Şifreye", why: "Sunucunun kimliğini kanıtlayan sertifikaların altındaki aritmetik: büyük asallar, mod alma ve anahtar üretimi." },
  ],
  sources: [
    { title: "Wikipedia · Internet protocol suite", url: "https://en.wikipedia.org/wiki/Internet_protocol_suite", note: "TCP/IP katmanları, tarihçesi (Cerf–Kahn 1974, 1 Ocak 1983 geçişi) ve OSI ile karşılaştırma (İngilizce)." },
    { title: "Wikipedia · ARPANET", url: "https://en.wikipedia.org/wiki/ARPANET", note: "29 Ekim 1969'daki ilk mesaj, IMP'ler, 50 kbit/s'lik hatlar ve ilk dört düğüm (İngilizce)." },
    { title: "MDN · HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", note: "Tarayıcının en üst katmanda konuştuğu dil: istek, cevap, başlıklar; 'Evolution of HTTP' rehberi HTTP/0.9'dan HTTP/3'e sürümleri anlatır." },
    { title: "Vikipedi · İnternet", url: "https://tr.wikipedia.org/wiki/%C4%B0nternet", note: "Genel tarihçe, Türkiye'nin 12 Nisan 1993'teki ilk bağlantısı ve temel kavramların Türkçe karşılıkları." },
  ],
  revision: "Kasım 2026",
};
