window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["internet-ve-ag-teknolojileri"] = {
  slug: "internet-ve-ag-teknolojileri",
  title: "İnternet: Paketlerin Dünya Turu",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 30,
  tagline:
    "Bir tıklamayla yola çıkan veri küçük paketlere bölünür, denizaltı kablolarında ışık hızının üçte ikisiyle gider; yolu yönlendiriciler, adresi DNS, güvenilirliği TCP sağlar. Beş deneyle zinciri tek tek aç.",
  hook:
    "29 Ekim 1969 gecesi Los Angeles'ta bir öğrenci, 550 kilometre uzaktaki bir bilgisayara 'LOGIN' yazmaya çalıştı. L gitti, O gitti, sistem çöktü. İnternetin ilk mesajı 'LO' oldu. Bugün bir paket İstanbul'dan San Francisco'ya saniyenin onda birinde varıyor; peki yolu kim söylüyor, adresi kim buluyor, paket kaybolursa kim fark ediyor?",
  bigIdea:
    "İnternet tek bir ağ değil, ortak bir dil (IP) konuşan ağların ağıdır: veri küçük <strong>paketlere</strong> bölünür, her paket kendi adresini taşır, her yönlendirici yalnızca bir sonraki adımı bilir; güvenilirliği uçlardaki TCP, isimleri DNS, adres düzenini CIDR sağlar.",
  story: [
    "1960'ların başında üç kişi birbirinden habersiz aynı fikre vardı: veriyi tek bir sürekli hat yerine küçük parçalar hâlinde göndermek. RAND'da Paul Baran, nükleer saldırıda bile ayakta kalacak bir haberleşme ağı tasarlıyordu; parçaları yollarını kendileri bulsun istiyordu. İngiltere'de Donald Davies aynı parçalara 1965'te bir ad verdi: <strong>paket</strong>. MIT'de Leonard Kleinrock ise kuyruk teorisiyle böyle bir ağın matematiğini yazıyordu. ABD Savunma Bakanlığı'nın araştırma kolu ARPA bu fikri 1969'da gerçeğe dönüştürdü. İlk yönlendiriciler, BBN şirketinin yaptığı buzdolabı boyutundaki IMP'lerdi. 29 Ekim 1969'da UCLA'da Charley Kline, Stanford Araştırma Enstitüsü'ndeki Bill Duvall'ın bilgisayarına bağlanmayı denedi: 'LOGIN' yazacaktı, iki harften sonra karşı taraf çöktü. Yaklaşık bir saat sonra tekrar denediler ve bu kez oldu. Aralık 1969'da ARPANET'in dört düğümü vardı: UCLA, SRI, Santa Barbara ve Utah.",
    "Birkaç yıl içinde başka ağlar da doğdu: radyo ağları, uydu ağları, yerel ağlar. Sorun, hepsinin farklı dil konuşmasıydı. Mayıs 1974'te Vint Cerf ve Bob Kahn, 'Paket Ağlarının Birbirleriyle Haberleşmesi İçin Bir Protokol' başlıklı makaleyle çözümü yazdı: her ağ kendi iç işini bildiği gibi yapsın, ama aralarına giren bir <strong>geçit</strong> ortak bir zarf biçimini anlasın. Bu zarf IP, zarfların kaybolmasını uçlarda telafi eden kurallar bütünü TCP oldu. 1 Ocak 1983'te ARPANET bir gecede eski protokolünü kapatıp TCP/IP'ye geçti; mühendisler o güne 'bayrak günü' der. Aynı yıl Paul Mockapetris, SRI'da tek bir dosyada elle tutulan isim listesini (HOSTS.TXT) dağıtık bir sisteme çevirdi: <strong>DNS</strong>. Uluslararası Standartlar Örgütü 1984'te yedi katmanlı OSI modelini yayımladı; on yıl süren 'protokol savaşları'nda OSI kâğıt üzerinde daha düzenliydi ama TCP/IP çalışan kod ve açık belgelerle kazandı. Bugün OSI bir sınıflandırma dili, TCP/IP ise gerçek olarak yaşıyor.",
    "1989'da CERN'de Tim Berners-Lee, bu ağın üstüne bir uygulama önerdi: birbirine bağlı belgeler, yani Web. Ağ büyüdükçe adresler tükenmeye başladı; 1993'te sınıf tabanlı adresleme bırakıldı ve bu sayfadaki hesaplayıcının kullandığı <strong>CIDR</strong> düzeni geldi. Türkiye de aynı yıl bağlandı: kayıtlara göre 12 Nisan 1993'te ODTÜ'den ABD'ye saniyede 64 kilobitlik bir hat açıldı; bugün tek bir fotoğrafı yüklemeye yetmeyecek bir hız. 3 Şubat 2011'de IANA, elindeki son IPv4 bloklarını dağıttı. Ağın felsefesi ise ilk günden değişmedi: ağın ortası aptal, uçları akıllıdır. Yönlendiriciler paketin içine bakmaz, yalnızca ileriye atar; hata düzeltme, sıralama ve şifreleme işi iki uçtaki bilgisayarlara kalır. Jon Postel'in 1980'de bir belgeye yazdığı ilke hâlâ geçerli: gönderirken tutucu, alırken hoşgörülü ol.",
  ],
  core: [
    {
      heading: "Paket: kendi adresini taşıyan zarf",
      body:
        "Bir telefon görüşmesi iki kişi için bir hattı baştan sona ayırır; internet öyle yapmaz. Veri en fazla birkaç bin baytlık parçalara bölünür ve her parçanın önüne bir <strong>başlık</strong> eklenir: kaynak adresi, hedef adresi, uzunluk, bir de yaşam sayacı. Her <strong>yönlendirici</strong> paketi alır, hedef adrese bakar, elindeki tabloda 'bu adres için bir sonraki kapı hangisi' sorusuna cevap bulur ve paketi o kapıdan atar. Yolun tamamını kimse bilmez; herkes yalnızca bir adımı bilir. Sayfadaki canvas'ta paket İstanbul'dan çıkıp beş kapıdan geçer; Frankfurt ve Chicago çizili olduğu hâlde tablo onları seçmediği için paket oraya hiç uğramaz. Yaşam sayacı TTL her kapıda bir azalır; sıfıra inen paket çöpe gider. Böylece yanlış kurulmuş bir tablo paketleri sonsuza dek döndüremez. Traceroute programı bu kuralı hileye çevirir: TTL'i 1, 2, 3 diye artırarak paket gönderir, her seferinde paketi öldüren yönlendirici 'süre doldu' mesajıyla kendini ele verir.",
      formula: "TTL<sub>çıkış</sub> = TTL<sub>giriş</sub> − 1;  TTL = 0 ⇒ paket atılır, ICMP 'Time Exceeded' döner",
      formulaNote: "Linux ve macOS paketleri TTL = 64 ile, Windows 128 ile yola çıkarır. Sayfada 64'ten başlar, 5 kapıdan sonra 59 olur.",
    },
    {
      heading: "Katmanlar: zarfın içinde zarf",
      body:
        "Tarayıcının yazdığı HTTP isteği doğrudan kabloya gitmez; aşağı inerken her katman kendi zarfını ekler. Taşıma katmanı (TCP) port numaralarını ve sıra numarasını yazar, ağ katmanı (IP) dünya çapında geçerli adresleri ekler, veri bağı katmanı (Ethernet ya da Wi-Fi) yalnızca yerel ağda anlamlı donanım adreslerini koyar ve en sonda her şey bit olup fibere ya da havaya çıkar. Alıcı tarafta zarflar ters sırayla açılır. Bu düzenin güzelliği <strong>bağımsızlıktır</strong>: Wi-Fi'den fibere geçtiğinde yalnızca alt zarf değişir, TCP ve HTTP bunu fark bile etmez. Sayfadaki OSI şeridine tıkladığında her katmanın veri birimini (bit, çerçeve, paket, segment) ve örnek protokollerini görürsün. Yedi katmanın beş ve altıncısı (oturum, sunum) pratikte TCP/IP'de ayrı bir şey olarak yaşamaz; o yüzden mühendisler çoğu zaman dört ya da beş katmandan söz eder.",
      formula: "Çerçeve = Ethernet başlığı (14 B) + IP başlığı (20 B) + TCP başlığı (20 B) + veri (≤ 1460 B)",
      formulaNote: "Ethernet'in taşıyabildiği en büyük paket 1500 bayttır (MTU); 40 bayt başlık düşülünce veriye 1460 bayt kalır. Büyük bir dosya bu boyda dilimlere kesilir.",
    },
    {
      heading: "TCP: her baytın bir numarası var",
      body:
        "IP paketleri kaybedebilir, geç getirebilir, sırasını karıştırabilir; söz vermez. Güvenilirliği TCP, iki ucun arasında kurar. Gönderilen her bayta bir <strong>sıra numarası</strong> verilir; alıcı 'şu numaraya kadar aldım, sıradaki şunu bekliyorum' diyen bir <strong>onay</strong> (ACK) gönderir. Onayı gelmeyen parça yeniden yollanır, karışık gelenler numaraya göre dizilir. Bağlantı başlamadan önce iki taraf başlangıç numaralarını paylaşır; sayfadaki üç adımlı el sıkışma tam bu pazarlıktır. İstemci SYN bayrağıyla 'benim numaram 1000' der; sunucu hem bunu onaylar (ack = 1001) hem kendi numarasını söyler (seq = 5000); istemci de onu onaylar (ack = 5001). SYN bayrağı veri taşımadığı hâlde bir bayt gibi sayılır, onay numarasının birer fazla olması bundandır. Üçüncü mesajdan sonra iki taraf da 'kurulu' durumdadır ve veri akabilir.",
      formula: "ack = seq + alınan bayt sayısı   (SYN ve FIN birer bayt sayılır)",
      formulaNote: "Sıra numaraları 32 bitliktir: 4 294 967 296'da başa sarar. Başlangıç numarası tahmin edilemesin diye rastgele seçilir; sayfadaki 1000 ve 5000 okunaklı olsun diye seçilmiş değerlerdir.",
    },
    {
      heading: "CIDR: adresin kaçı sokak, kaçı kapı numarası?",
      body:
        "Bir IPv4 adresi 32 bittir; dört sayı yalnızca insan okusun diyedir. '/24' eki, soldaki 24 bitin <strong>ağ kısmı</strong>, kalan 8 bitin cihaz kısmı olduğunu söyler. Aynı ağdaki cihazlar birbirine yönlendirici olmadan ulaşır; farklı ağdakiler paketi varsayılan geçide verir. Ağ adresi, adresle maskenin bit bit VE'lenmesidir. Cihaz bitlerinin hepsi sıfır olan adres ağın adı, hepsi bir olan adres <strong>yayın</strong> adresidir; ikisi de cihazlara verilmez, bu yüzden kullanılabilir adres sayısı ikiden eksiktir. Her ön ek biti ağ sayısını ikiye katlar, ağ başına adresi yarıya indirir: /24'te 254 cihaz, /26'da 62, /30'da yalnızca 2. İnternet omurgasındaki yönlendiriciler tek tek adresleri değil, bu ön ekleri bilir; 'en uzun eşleşen ön ek' kuralı paketi en özgül rotaya gönderir.",
      formula: "Kullanılabilir adres = 2<sup>32 − n</sup> − 2;  Ağ = Adres AND Maske",
      formulaNote: "n ön ek uzunluğu. /31 ve /32 istisnadır: sayfa /31 için 2 adres gösterir (noktadan noktaya hatlar için 2000'de yapılan kural değişikliği).",
    },
    {
      heading: "DNS: isimden sayıya giden yedi adım",
      body:
        "Yönlendiriciler isim bilmez, sayı bilir. 'tr.wikipedia.org' yazdığında bilgisayarın önce yakınındaki bir <strong>özyinelemeli çözümleyiciye</strong> (genelde internet sağlayıcının ya da 1.1.1.1 gibi açık bir sunucunun) sorar. Çözümleyici cevabı bilmiyorsa yukarıdan aşağıya iner: önce <strong>kök</strong> sunuculara ('org'u kim yönetiyor?'), sonra üst düzey alan (TLD) sunucusuna ('wikipedia.org'u kim yönetiyor?'), en sonda alan adının <strong>yetkili</strong> sunucusuna ('tr.wikipedia.org'un adresi ne?'). Cevap, kayıt sahibinin belirlediği bir süre boyunca önbellekte tutulur; ikinci sorgu aynı yolu hiç yürümez. Kök sunucuların adı harflerle anılır, a'dan m'ye on üç tane; ama aynı adresi dünyada yüzlerce makine paylaşır (anycast), İstanbul'dan sorduğunda cevap büyük olasılıkla Türkiye'den ya da yakın bir ülkeden gelir. Sayfadaki akış bu yedi adımı canlandırır; girdiğin ismi satırlara yazar ama cevabı gerçekten sormaz.",
      formula: "İlk sorgu: 3 gidiş-dönüş (kök → TLD → yetkili);  önbellekte varsa: 0",
      formulaNote: "Çözümleyicinin verdiği cevabın bir 'TTL'i de vardır ama bu, paketlerdeki yaşam sayacı değil, önbellekte kalma süresidir (saniye).",
    },
  ],
  lab: {
    intro:
      "Sayfada beş ayrı düzenek var. Üstte <strong>Paket Gönder</strong>, <strong>Sıfırla</strong> ve <strong>Hızlı</strong> düğmeleriyle canvas; altında <strong>Atlama</strong>, <strong>Gecikme</strong> ve <strong>TTL</strong> göstergeleri. Sonra her basışta bir adım ilerleyen <strong>El Sıkışmayı Başlat</strong>; tıklanabilir yedi OSI katmanı; alan adı kutusu ve <strong>Çözümle</strong> düğmesiyle DNS akışı; IP/CIDR kutusu, <strong>Hesapla</strong> düğmesi ve 8–30 arası CIDR kaydırıcısıyla alt ağ hesaplayıcı; en altta on iki protokol kartı. Gecikme sayıları rastgele üretilir; ölçüm değil, canlandırmadır.",
    experiments: [
      {
        title: "Beş kapı, TTL 59",
        predict:
          "Kesikli çizgiyle vurgulanan rotada kaç düğüm var? Paket hedefe vardığında Atlama sayısı ve TTL kaç olmalı? Frankfurt IXP ve Chicago düğümleri yolculuğa katılacak mı?",
        do: "Paket Gönder'e bas ve paketi sonuna kadar izle; paketin üstündeki küçük TTL etiketini de oku. Sıfırla'ya, sonra Hızlı'ya basıp yeniden gönder ve süreyi karşılaştır.",
        observe:
          "Rota İstanbul → ISP Router → Londra → New York → San Jose → San Francisco: altı düğüm, beş atlama. Atlama 5, TTL 59 olur; Frankfurt ve Chicago'ya hiç uğranmaz. Normal hızda yolculuk 60 Hz ekranda yaklaşık 7 saniye, Hızlı'da 2.3 saniye sürer. Varıştaki Gecikme 30 ile 210 ms arasında rastgele bir sayıdır; her gönderişte değişir.",
        explain:
          "Yönlendirme tablosu her düğümde tek bir 'sonraki kapı' seçer; çizili ama seçilmeyen hatlar yedek yollardır. TTL her kapıda bir azalır: 64 − 5 = 59. Gecikme kutusu ise fizikten değil zar atışından geliyor: İstanbul–San Francisco büyük daire mesafesi yaklaşık 10 800 km, fiberde ışık saniyede 200 000 km gider, tek yön en az 54 ms sürer. Kutuda 54'ün altında bir sayı görürsen simülatörü yakalamışsın demektir.",
      },
      {
        title: "El sıkışmada sayıların izi",
        predict:
          "İstemci 'SYN, seq = 1000' gönderdiğinde sunucunun cevabındaki ack kaç olmalı? Üçüncü mesajda istemcinin seq'i neden 1000 değil de başka bir sayı olur?",
        do: "El Sıkışmayı Başlat'a üç kez bas; her basışta parlayan paketi ve alttaki durum satırını oku. Dördüncü basış her şeyi sıfırlar.",
        observe:
          "Birinci basış: SYN seq=1000, durum SYN-SENT. İkinci: SYN+ACK seq=5000, ack=1001; durum satırı sunucuyu SYN-RECEIVED, istemciyi ESTABLISHED gösterir. Üçüncü: ACK seq=1001, ack=5001 ve 'Bağlantı kuruldu'.",
        explain:
          "ack, 'sıradaki beklediğim bayt' demektir; SYN bir bayt gibi sayıldığı için 1000'in onayı 1001'dir. Her taraf kendi başlangıç numarasını seçer, sunucununki 5000. İstemci sunucunun SYN'ini aldığı anda bağlantıyı kurulmuş sayar; sunucu ise üçüncü mesaj gelene kadar bekler. Bu asimetri yüzünden bir sunucuya binlerce SYN gönderip ACK göndermemek klasik bir saldırıdır (SYN flood).",
      },
      {
        title: "DNS akışını yakala",
        predict:
          "Kutuya 'tr.wikipedia.org' yazıp Çözümle'ye basarsan Kök Sunucu satırı '.org' mu diyecek, '.com' mu? Satırların hepsinin yanması kaç saniye sürer?",
        do: "Önce varsayılan www.example.com ile Çözümle'ye bas ve yedi satırın sırayla parlamasını izle. Sonra tr.wikipedia.org yaz, Enter'a bas; satırları tek tek oku.",
        observe:
          "Yedi satır 0.45 saniye arayla yanar, toplam yaklaşık 3 saniye. İsim satırlara işlenir ama Kök Sunucu satırı hâlâ '.com TLD' der ve cevap hep 93.184.216.34 çıkar; hangi ismi yazarsan yaz adres değişmez.",
        explain:
          "Sayfa gerçek bir sorgu yapmıyor, bir şablonu dolduruyor. Gerçek çözümleyici 'org' için kök sunucudan .org TLD sunucusunun adresini alır; cevap da alan adının yetkili sunucusundan gelir. Gösterilen 198.41.0.4 gerçekten a.root-servers.net'in adresidir; 93.184.216.34 ise uzun yıllar example.com'un gerçek adresiydi. Bir de şunu düşün: gerçek hayatta ikinci sorgu önbellekten döner ve 3–5. satırlar hiç yaşanmaz.",
      },
      {
        title: "Bir ağı dörde böl",
        predict:
          "192.168.1.0/24 ağında 254 cihaz var. Kaydırıcıyı /26'ya çekersen kullanılabilir sayı kaça düşer? 192.168.1.130 adresi /26'da hangi alt ağa düşer?",
        do: "Kaydırıcıyı 24'ten 26'ya çek ve Alt Ağ Maskesi, Kullanılabilir, Broadcast kutularını oku. Sonra kutuya 192.168.1.130/26 yazıp Hesapla'ya bas. En son kaydırıcıyı 30'a çek.",
        observe:
          "/26: maske 255.255.255.192, 62 kullanılabilir, broadcast 192.168.1.63, ikili maskenin son sekizlisi 11000000. 192.168.1.130/26: Ağ Adresi 192.168.1.128, İlk Cihaz .129, Son Cihaz .190, Broadcast .191. /30: toplam 4, kullanılabilir 2 (.1 ve .2).",
        explain:
          "İki bit ağa geçince cihaz bitleri 8'den 6'ya iner: 2⁶ − 2 = 62. 130'un ikilisi 10000010; ilk iki biti '10' olduğu için 128–191 bloğuna düşer. /30 iki yönlendirici arasındaki noktadan noktaya hatların klasik boyudur: bir ağ adresi, bir yayın, iki uç.",
      },
    ],
  },
  wow: [
    {
      title: "İlk mesaj iki harfti",
      body:
        "29 Ekim 1969'da UCLA'dan SRI'a gönderilmek istenen 'LOGIN' kelimesinin yalnızca 'LO' kısmı ulaştı; alıcı bilgisayar çöktü. Ağın ilk yönlendiricileri (IMP) buzdolabı boyutundaydı ve hat hızı saniyede 50 kilobitti. Aralık 1969'da ağın dört düğümü vardı; bugün bağlı cihaz sayısı on milyarlarla ölçülüyor.",
    },
    {
      title: "Adresler 2011'de bitti",
      body:
        "IPv4'te 2³² = 4 294 967 296 adres vardır. 3 Şubat 2011'de IANA elindeki son beş büyük bloğu (/8) bölgesel kayıt kuruluşlarına dağıttı; stok tükendi. Halef IPv6 128 bit kullanır: 2¹²⁸ ≈ 3.4 × 10³⁸ adres, yani Dünya yüzeyinin her metrekaresine yaklaşık 6.7 × 10²³ adres. IPv4 yine de ölmedi: NAT sayesinde bir evin bütün cihazları tek bir genel adresi paylaşıyor.",
    },
    {
      title: "Işıktan hızlı veri yok",
      body:
        "Kıtalar arası trafiğin büyük bölümü okyanus tabanındaki fiber kablolardan geçer ve camın içinde ışık boşluktakinden yavaştır: saniyede yaklaşık 200 000 km. İstanbul–San Francisco arası büyük daire boyunca 10 800 km; tek yön en az 54 ms, gidiş-dönüş en az 108 ms. Kablolar düz çizgi izlemediği için ölçülen süre bunun üstünde kalır. Bant genişliğini artırmak bu sınırı kıpırdatmaz; borsa şirketlerinin veri merkezlerini birbirine yaklaştırmasının nedeni budur.",
    },
  ],
  worked: {
    title: "172.16.5.200/20 hangi ağda?",
    prompt:
      "Bir okulun ağında bir bilgisayarın adresi 172.16.5.200, ön eki /20. Ağ adresini, yayın adresini ve bu ağa sığacak cihaz sayısını bul; sonucu sayfadaki hesaplayıcıyla doğrula.",
    steps: [
      "Maskeyi yaz: /20, soldan 20 bit 1 demektir: 11111111.11111111.11110000.00000000, yani 255.255.240.0. İlk iki sekizli tamamen ağa ait; iş üçüncü sekizlide dönüyor.",
      "Üçüncü sekizliyi ikiliye çevir: 5 = 00000101. Maskenin o sekizlisi 11110000 ile VE'le: 00000000 = 0. Ağ adresi 172.16.0.0 çıkar; dördüncü sekizli zaten tamamen cihaz kısmı olduğu için sıfırlanır.",
      "Yayın adresi için cihaz bitlerinin hepsini 1 yap: üçüncü sekizli 00001111 = 15, dördüncü 255. Yayın adresi 172.16.15.255. Demek ki bu ağ 172.16.0.0'dan 172.16.15.255'e kadar on altı tane /24 bloğunu kapsıyor.",
      "Say: cihaz bitleri 32 − 20 = 12, toplam 2¹² = 4096 adres, kullanılabilir 4094. İlk cihaz 172.16.0.1, son cihaz 172.16.15.254. 172.16.5.200 bu aralığın içinde; aynı ağdaki 172.16.12.7 ile yönlendiriciye uğramadan konuşabilir.",
      "Sayfada doğrula: kutuya 172.16.5.200/20 yazıp Hesapla'ya bas. Kaydırıcı kendiliğinden 20'ye gelir; Ağ Adresi 172.16.0.0, Alt Ağ Maskesi 255.255.240.0, Kullanılabilir 4 094, Broadcast 172.16.15.255 görünmeli.",
    ],
    result:
      "Ağ 172.16.0.0/20, yayın 172.16.15.255, 4094 cihaz. Ön ekin sekizli sınırına denk gelmediği durumlarda hesap, ortadaki sekizliyi ikiliye çevirip maskelemekten ibarettir.",
  },
  misconceptions: [
    {
      myth: "İnternet ile Web aynı şeydir.",
      truth:
        "İnternet 1969'da doğan paket ağı, Web ise 1989'da üstüne kurulan bir uygulamadır; e-posta Web'den on beş yıl yaşlıdır. Oyun sunucuları, mesajlaşma, video araması ve bu sayfanın DNS sorgusu Web'in parçası değildir ama hepsi internettir.",
    },
    {
      myth: "Veri tek bir kablodan, tek bir yoldan hedefe gider.",
      truth:
        "Veri paketlere bölünür ve her paket yönlendirme tablolarının o andaki kararına göre gider; bir hat tıkanırsa aynı dosyanın iki paketi farklı kıtalardan dolaşabilir. Sırayı ve eksikleri alıcıdaki TCP toparlar. Canvas'taki yedek hatlar bunun için çizilmiştir.",
    },
    {
      myth: "Bant genişliği artınca gecikme azalır.",
      truth:
        "Bant genişliği saniyede kaç bit sığdığını, gecikme bir bitin ne kadar sürede vardığını söyler; ikisi farklı büyüklüklerdir. Fiberde ışık hızı sınırı 10 800 km için 54 ms'dir, hattı bin kat genişletsen de değişmez. Oyunlarda 'ping'in yüksek olması çoğu zaman mesafe ve rota meselesidir, hız paketinin değil.",
    },
    {
      myth: "IP adresi, cihazın değişmez kimliğidir.",
      truth:
        "Adres genellikle DHCP ile geçici verilir ve ağ değiştirince değişir; evdeki telefon, bilgisayar ve televizyon dış dünyaya tek bir genel adresle çıkar (NAT). Kalıcı donanım kimliği MAC adresidir; o da yalnızca yerel ağda görünür ve modern cihazlar onu bile rastgeleleştirir.",
    },
  ],
  glossary: [
    { term: "Paket", definition: "Verinin, başına kaynak ve hedef adresleri eklenmiş, tek başına yolculuk eden parçası; Ethernet'te en çok 1500 bayt." },
    { term: "Yönlendirici (router)", definition: "Paketi alıp hedef adresine göre tablosundan bir sonraki kapıyı seçen ve paketi oraya ileten cihaz." },
    { term: "IP adresi", definition: "Ağ katmanında bir arayüzü tanımlayan 32 bitlik (IPv4) ya da 128 bitlik (IPv6) sayı; dört sekizli yazımı insanlar içindir." },
    { term: "TTL", definition: "Paketin başlığındaki yaşam sayacı; her yönlendiricide bir azalır, sıfırda paket atılır ve kaynağa 'süre doldu' mesajı döner." },
    { term: "Port", definition: "Aynı bilgisayardaki farklı programları ayıran 16 bitlik numara; HTTPS 443, DNS 53 kullanır." },
    { term: "DNS", definition: "Alan adlarını IP adreslerine çeviren, kök → TLD → yetkili sunucu hiyerarşisiyle çalışan dağıtık sistem." },
    { term: "CIDR ön eki", definition: "Adresin kaç bitinin ağ kısmı olduğunu söyleyen /n gösterimi; kalan 32 − n bit cihazlara ayrılır." },
    { term: "Gecikme ve bant genişliği", definition: "Gecikme bir bitin varış süresi (ms), bant genişliği saniyede geçen bit sayısı (Mbit/s); biri mesafeye, öteki hatta bağlıdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede ağ bir dizi protokol adıdır; üniversitede her biri bir <strong>algoritma ve bir matematik problemi</strong> olur. Yönlendiricinin tablosu, çizge teorisindeki en kısa yol algoritmalarıyla dolar: OSPF, Dijkstra'yı; internetin omurgasındaki BGP ise komşu otonom sistemlerin ilan ettiği yolları karşılaştıran, ekonomik anlaşmaları da hesaba katan bir yol-vektör yöntemini kullanır. TCP'nin 'ne hızda göndereyim' sorusu 1988'de Van Jacobson'ın tıkanıklık kontrolüyle cevaplandı: kayıp yoksa yavaşça artır, kayıp görünce yarıya in. Bu kural bir geri besleme döngüsüdür ve kontrol teorisiyle, kuyruk teorisiyle incelenir. Kleinrock'un 1960'lardaki tezi de tam olarak buydu: bir yönlendiricinin kuyruğunda paketler ne kadar bekler?",
      "İkinci büyük köprü güvenliktir. Katmanlı model, şifrelemeyi de bir zarf olarak eklemeye izin verir: HTTPS, TCP ile HTTP arasına TLS zarfını koyar; anahtar değişimi asal sayıların ve eliptik eğrilerin aritmetiğidir. Üçüncüsü dağıtık sistemlerdir: DNS'in önbelleği, anycast'in aynı adresi yüzlerce makineye vermesi, bir video akışının en yakın sunucudan gelmesi (CDN) hep aynı soruya cevaptır: dünyanın her yerinden gelen istekleri tutarlı ve hızlı nasıl karşılarsın? Bilgisayar mühendisliğinde 'Bilgisayar Ağları' dersi genellikle Kurose ve Ross'un kitabıyla, tam bu sayfadaki sırayla okutulur: uygulama katmanından fiziksel katmana doğru, yukarıdan aşağıya.",
    ],
    topics: ["Çizge teorisi ve en kısa yol", "Tıkanıklık kontrolü ve geri besleme", "Kuyruk teorisi", "TLS ve açık anahtarlı kriptografi", "Dağıtık sistemler ve önbellekleme", "Bilgi teorisi (Shannon kapasitesi)"],
  },
  quiz: [
    {
      question: "192.168.1.0 ağını /26 ön ekiyle bölersen her alt ağda kaç cihaz adresi kullanılabilir?",
      options: ["64", "62", "128", "254"],
      answer: 1,
      explanation: "Cihaz bitleri 32 − 26 = 6, toplam 2⁶ = 64 adres; ağ adresi ve yayın adresi düşülünce 62 kalır. Sayfadaki kaydırıcıyı 26'ya çekerek doğrulayabilirsin.",
    },
    {
      question: "İstemci 'SYN, seq = 1000' gönderdi. Sunucunun SYN+ACK cevabındaki ack değeri ne olmalı?",
      options: ["1000", "1001", "5000", "5001"],
      answer: 1,
      explanation: "ack, alıcının sıradaki beklediği bayt numarasıdır; SYN bir bayt gibi sayıldığı için 1000 + 1 = 1001. 5000 sunucunun kendi başlangıç numarasıdır, 5001 ise istemcinin üçüncü mesajdaki onayı.",
    },
    {
      question: "Bir paketin başlığındaki TTL alanı asıl olarak neyi önler?",
      options: ["Paketin şifresiz gitmesini", "Paketin yanlış sırada gelmesini", "Yanlış tablolar yüzünden paketin sonsuza dek dolaşmasını", "Paketin 1500 bayttan büyük olmasını"],
      answer: 2,
      explanation: "TTL her yönlendiricide bir azalır ve sıfırda paket atılır; böylece bir döngüye giren paket ağı tıkamaz. Sıralama TCP'nin, boyut sınırı MTU'nun, şifreleme TLS'nin işidir.",
    },
  ],
  next: [
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Paket açık bir zarftır; HTTPS'in TLS katmanı onu nasıl mühürler, Diffie-Hellman anahtarı ortak kanalda nasıl kurar?" },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "OSPF'nin içindeki Dijkstra'yı kendi gözünle çalıştır: yönlendirme tablosu böyle dolar." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi", why: "Canvas'taki düğümler ve hatlar bir çizgedir; yedek yollar, kesme noktaları ve bağlantılılık burada başlar." },
    { href: "asal-rsa.html", title: "Asal Sayılar ve RSA", why: "Sunucunun kimliğini kanıtlayan sertifikaların altındaki aritmetik: büyük asallar ve mod alma." },
  ],
  sources: [
    { title: "Khan Academy · Computers and the Internet", url: "https://www.khanacademy.org/computing/computers-and-internet", note: "Lise düzeyinde internet, IP, TCP, DNS ve yönlendirme; kısa videolar ve alıştırmalar (İngilizce)." },
    { title: "MDN · HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", note: "Tarayıcının üst katmanda konuştuğu dil: istek, cevap, başlıklar ve HTTPS." },
    { title: "Wikipedia · Internet protocol suite", url: "https://en.wikipedia.org/wiki/Internet_protocol_suite", note: "TCP/IP katmanları, tarihçesi (Cerf–Kahn, 1983 geçişi) ve OSI ile karşılaştırma." },
    { title: "Vikipedi · İnternet", url: "https://tr.wikipedia.org/wiki/%C4%B0nternet", note: "Genel tarihçe, Türkiye'nin bağlanışı ve temel kavramların Türkçe karşılıkları." },
  ],
  revision: "Ekim 2026",
};
