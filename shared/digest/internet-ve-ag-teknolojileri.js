window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["internet-ve-ag-teknolojileri"] = {
  slug: "internet-ve-ag-teknolojileri",
  title: "İnternet: Paket, Pencere, Önek, Ad",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Paket yolunu nasıl bulur, kaybolan veri nasıl tamamlanır, bir adres hangi ağa aittir, bir ad nasıl sayıya döner? Dört sekmeli öğretim ağında gecikmeyi, verimi, önekleri ve DNS sorgularını say, kuramla karşılaştır.",
  hook:
    "29 Ekim 1969 gecesi Los Angeles'ta bir öğrenci, yaklaşık 500 kilometre uzaktaki bir bilgisayara 'LOGIN' yazmaya çalıştı. L gitti, O gitti, karşı taraf çöktü; ağın ilk mesajı 'LO' oldu. O geceden bugüne dört soru hiç değişmedi: paketin yolunu kim seçer, kaybolanı kim fark eder, adres hangi ağa aittir, adı sayıya kim çevirir?",
  bigIdea:
    "İnternet tek bir ağ değil, ortak bir dil (IP) konuşan ağların ağıdır: veri küçük <strong>paketlere</strong> bölünür, her paket kendi adresini taşır, her yönlendirici onu yalnızca sıradaki komşuya verir; güvenilirliği uçlardaki TCP, adları DNS, adres düzenini CIDR sağlar.",
  story: [
    "1960'ların başında iki mühendis birbirinden habersiz aynı fikre vardı: veriyi tek bir sürekli hat yerine küçük parçalar hâlinde göndermek. RAND'da Paul Baran, bir saldırıda santralleri yıkılsa bile ayakta kalacak bir haberleşme ağı tasarlıyor, parçaların yollarını kendilerinin bulmasını istiyordu. İngiltere'de Donald Davies aynı parçalara 1965'te bir ad verdi: <strong>paket</strong>. MIT'de Leonard Kleinrock ise kuyruk teorisiyle veri ağlarındaki beklemenin matematiğini yazıyordu. ABD Savunma Bakanlığı'nın araştırma kolu ARPA bu fikri 1969'da gerçeğe dönüştürdü. İlk yönlendiriciler, BBN şirketinin yaptığı buzdolabı boyutundaki IMP'lerdi. 29 Ekim 1969'da UCLA'da Charley Kline, Stanford Araştırma Enstitüsü'nde (SRI) Bill Duvall'ın başında durduğu bilgisayara bağlanmayı denedi: 'LOGIN' yazacaktı, iki harften sonra karşı taraf çöktü. Yaklaşık bir saat sonra yeniden denediler ve bu kez oldu. Aralık 1969'da ARPANET'in dört düğümü vardı: UCLA, SRI, Santa Barbara ve Utah.",
    "Birkaç yıl içinde başka ağlar da doğdu: radyo ağları, uydu ağları, yerel ağlar. Sorun, hepsinin farklı dil konuşmasıydı. Mayıs 1974'te Vint Cerf ve Bob Kahn, 'Paket Ağlarının Birbiriyle Haberleşmesi İçin Bir Protokol' başlıklı makaleyle çözümü yazdı: her ağ kendi iç işini bildiği gibi yapsın, ama aralarına giren bir <strong>geçit</strong> ortak bir zarf biçimini anlasın. Zamanla bu tasarım ikiye ayrıldı: zarf IP, zarfların kaybolmasını uçlarda telafi eden kurallar bütünü TCP oldu. 1 Ocak 1983'te ARPANET eski protokolü NCP'yi kapatıp TCP/IP'ye geçti; mühendisler o güne 'bayrak günü' der. Aynı yılın sonunda Paul Mockapetris, o güne dek tek bir dosyada elle tutulan ve bütün bilgisayarlara kopyalanan isim listesinin (HOSTS.TXT) yerine dağıtık bir sistem önerdi: <strong>DNS</strong>. Uluslararası Standartlar Örgütü 1984'te yedi katmanlı OSI modelini yayımladı; yıllar süren 'protokol savaşlarında' OSI kâğıt üzerinde daha düzenliydi ama TCP/IP çalışan kod ve açık belgelerle kazandı. Bugün OSI bir sınıflandırma dili olarak, TCP/IP ise kabloların içinde yaşıyor.",
    "Mart 1989'da CERN'de Tim Berners-Lee, bu ağın üstüne bir uygulama önerdi: birbirine bağlı belgeler. İlk web sitesi 1991'de dış dünyaya açıldı. Ağ büyüdükçe adresler tükenmeye başladı; 1993'te sınıf tabanlı adresleme bırakıldı ve sayfadaki hesaplayıcının kullandığı <strong>CIDR</strong> düzeni geldi. Türkiye de aynı yıl bağlandı: kayıtlara göre 12 Nisan 1993'te ODTÜ'den, Ankara ile Washington arasında saniyede 64 kilobitlik kiralık bir hat açıldı; bu hız 3 megabaytlık tek bir fotoğrafı altı dakikada taşır. 3 Şubat 2011'de IANA elindeki son IPv4 bloklarını dağıttı. Ağın felsefesi ise ilk günden değişmedi: ortası yalın, uçları akıllıdır. Yönlendiriciler yalnızca başlığa bakıp paketi ileri atar; hata düzeltme, sıralama ve şifreleme iki uçtaki bilgisayarlara kalır. Jon Postel'in 1980'de TCP belgesine yazdığı ilke hâlâ anılır: gönderirken tutucu, alırken hoşgörülü ol.",
  ],
  core: [
    {
      heading: "Paket: kendi adresini taşıyan zarf",
      body:
        "Eski telefon ağı iki kişi için bir hattı baştan sona ayırırdı; internet öyle yapmaz. Veri çoğunlukla 1.500 baytı aşmayan parçalara bölünür ve her parçanın önüne bir <strong>başlık</strong> eklenir: kaynak adresi, hedef adresi, uzunluk, bir de yaşam sayacı. Her <strong>yönlendirici</strong> paketi alır, hedef adrese bakar, tablosunda 'bu adres için sıradaki komşu kim' sorusunun cevabını bulur ve paketi ona verir. Paket yolun tamamını yanında taşımaz; her durakta yalnızca bir sonraki adım seçilir. Sayfanın ilk sekmesindeki öğretim ağında altı yönlendirici ve on bir bağlantı var. Her yönlendirici ağın haritasını bilir (buna <strong>bağlantı durumu</strong> yöntemi denir) ve hedefe en ucuz yolu Dijkstra algoritmasıyla kendi başına hesaplar; maliyet olarak ister toplam gecikmeyi, ister atlama sayısını seçersin. Yaşam sayacı <strong>TTL</strong> her yönlendiricide bir azalır; sıfıra inen paket atılır. Böylece yanlış kurulmuş bir tablo paketleri sonsuza dek döndüremez. Traceroute programı bu kuralı bir ölçme aracına çevirir: TTL'i 1, 2, 3 diye artırarak sonda paketleri gönderir, her seferinde paketi atan yönlendirici 'süre aşıldı' iletisiyle adresini bildirir. Sayfadaki traceroute tablosu tam olarak bunu yapar.",
      formula: "d<sub>uçtan uca</sub> = Σ d<sub>bağlantı</sub> + R · d<sub>işlem</sub>;  TTL<sub>varış</sub> = TTL<sub>çıkış</sub> − R",
      formulaNote: "R, yoldaki yönlendirici sayısıdır (bağlantı sayısı − 1); uç bilgisayarlar TTL'i azaltmaz. Varsayılan ağda 1 + 4 + 7 + 2 + 5 + 1 = 20 ms bağlantı gecikmesine 5 × 0,5 ms eklenir: 22,5 ms; 64 ile çıkan paket 59 ile varır. Modelde kuyrukta bekleme yoktur. Linux ve macOS paketleri TTL = 64 ile, Windows 128 ile yola çıkarır.",
    },
    {
      heading: "Sarmalama: zarfın içinde zarf",
      body:
        "Tarayıcının yazdığı HTTP isteği doğrudan kabloya gitmez; aşağı inerken her katman kendi zarfını ekler. Taşıma katmanı (TCP) port numaralarını ve sıra numarasını yazar, ağ katmanı (IP) dünya çapında geçerli adresleri ekler, veri bağı katmanı (Ethernet ya da Wi-Fi) yalnızca yerel ağda anlamlı donanım adreslerini koyar ve en sonda her şey bit olup fibere ya da havaya çıkar. Alıcı tarafta zarflar ters sırayla açılır. Bu düzenin gücü <strong>bağımsızlıktır</strong>: Wi-Fi'den fibere geçtiğinde yalnızca en dış zarf değişir, TCP ve HTTP bunu fark etmez. Aynı sayede HTTP de alttakilere dokunmadan yenilenebildi: HTTP/1.1 (1997) ve HTTP/2 (2015) TCP üstünde çalışır, HTTP/3 (2022) ise UDP üstüne kurulu QUIC'i kullanır. Zarfların bir bedeli vardır ve sayfadaki <strong>Sarmalama</strong> bölümü bu bedeli bayt bayt sayar: bir segmentin taşıyabileceği en çok veri, <strong>MSS</strong>, bağlantının en büyük paket boyundan (MTU) IP ve TCP başlıkları çıkınca kalandır; daha uzun veriyi TCP birden çok segmente böler. Yedi katmanlı OSI modelinin oturum ve sunum basamakları TCP/IP'de ayrı birer katman olarak yaşamaz; mühendisler çoğu zaman dört ya da beş katmandan söz eder.",
      formula: "Çerçeve baytı = L + n · H + dolgu;  H = 20 (TCP) + 20 (IPv4) + 14 + 4 (Ethernet) = 58 bayt;  n = ⌈L / MSS⌉,  MSS = MTU − 40 (IPv4)",
      formulaNote: "L uygulama verisi, n segment sayısı. MTU 1.500 baytken MSS 1.460 bayttır. 1.000 baytlık veri 1.058 baytlık tek çerçeve olur (ek yük %5,5); 1 baytlık veri, Ethernet'in en az 46 baytlık yük kuralı yüzünden 5 bayt dolguyla 64 baytlık çerçeveye biner (ek yük %98,4). Başlıklar seçeneksiz sayılır. IPv6'da IP başlığı 40 bayttır: H 78 bayta çıkar, MSS = MTU − 60 = 1.440 bayta iner. Sayfa ayrıca kablodaki gerçek bedeli de yazar: her çerçeveye 8 baytlık önsöz ve 12 baytlık boşluk eklenir.",
    },
    {
      heading: "Güvenilir aktarım: onay, zaman aşımı, pencere",
      body:
        "IP paketleri kaybedebilir, geciktirebilir, sırasını karıştırabilir; güvenilirliği iki uç kendi arasında kurar. Veriye <strong>sıra numarası</strong> verilir; alıcı aldığını <strong>onayla</strong> (ACK) bildirir; onayı süresinde gelmeyen parça yeniden yollanır. Adı ARQ'dur; üç klasik biçimi ikinci sekmede yan yana durur. <strong>Dur ve bekle</strong> her segmentten sonra onayı bekler; kayıp olmasa bile zamanın çoğu beklemekle geçer. <strong>N geri git</strong> onay beklemeden W segmentlik bir pencereyi doldurur; ama alıcı sırasız geleni attığı için tek kayıp, arkasından gidenlerin hepsini yeniden yollatır. <strong>Seçici yineleme</strong> alıcıda arabellek tutar ve yalnızca kaybolanı yeniden gönderir. Kuram kısa bir olasılık hesabı: denemenin başarı olasılığı s ise deneme sayısı geometrik dağılır, beklenen değeri 1/s'dir. Gidiş-dönüş süresi r dilimse dur ve bekle'de başarılı deneme 1 + r, başarısız deneme TO dilim tutar. N geri git'te paket başına beklenen kayıp p/(1 − p)'dir ve her biri TO dilime mal olur. Model yalındır: zaman dilimli, r sabit, kayıplar bağımsız. Gerçek TCP ikisinin arasında durur: onayları birikimlidir, ama alıcı sırasız geleni saklar, SACK seçeneğiyle eksikleri bildirir; gönderici çoğu kaybı zaman aşımını beklemeden, üç yinelenen onaydan anlar.",
      formula: "Gönderim / paket = 1/s (dur ve bekle, seçici yineleme);  1 + min(W, TO) · p/(1 − p) (N geri git, q = 0)",
      formulaNote: "s = (1 − p)(1 − q): segmentin ve onayının kaybolmama olasılığı; TO = 1 + r + g dilim. p = 0,10, q = 0, r = 4, g = 0 için 1/0,9 = 1,111 ve 1 + 5 · 0,1/0,9 = 1,556. Verim η, teslim edilen paketin geçen dilime oranıdır: dur ve bekle'de 1/[(1 + r) + (1/s − 1) · TO], N geri git'te (W ≥ 1 + r iken) 1/[1 + TO · p/(1 − p)].",
    },
    {
      heading: "CIDR: adresin kaçı sokak, kaçı kapı numarası?",
      body:
        "Bir IPv4 adresi 32 bittir; noktalarla ayrılmış dört sayı yalnızca insan okusun diyedir. '/24' eki, soldaki 24 bitin <strong>ağ kısmı</strong>, kalan 8 bitin cihaz kısmı olduğunu söyler. Aynı ağdaki cihazlar birbirine yönlendirici olmadan ulaşır; farklı ağdakiler için paket varsayılan geçide verilir. Ağ adresi, adresle maskenin bit bit VE'lenmesidir. Cihaz bitlerinin hepsi sıfır olan adres ağın adı, hepsi bir olan adres <strong>yayın</strong> adresidir; ikisi de cihazlara verilmez, bu yüzden kullanılabilir adres sayısı toplamdan iki eksiktir. Öneke eklenen her bit ağ sayısını ikiye katlar, ağ başına adresi yarıya indirir: /24'te 254 cihaz, /26'da 62, /30'da yalnızca 2. Eski A, B, C sınıfları ağın boyunu adresin ilk bitlerine bağlıyordu; bu düzen 1993'te bırakıldı ve bugün boyu yalnızca önek uzunluğu belirler. Böylece bir blok, ihtiyaca göre farklı boylarda alt ağlara bölünebilir (sayfadaki VLSM bölümü). Omurgadaki yönlendiriciler tek tek adresleri değil, bu önekleri bilir; birden çok önek uyuyorsa <strong>en uzun önek</strong> kuralı paketi en özel rotaya gönderir.",
      formula: "Kullanılabilir adres = 2<sup>32 − n</sup> − 2  (n ≤ 30);  Ağ = Adres AND Maske",
      formulaNote: "n önek uzunluğu. /31 ve /32 istisnadır: iki yönlendirici arasındaki hatlarda /31'in iki adresi de kullanılabilir (2000'de eklenen kural), /32 tek bir cihazı gösterir. Sayfa ikisini de böyle hesaplar. h cihazlık bir alt ağ için 2<sup>b</sup> ≥ h + 2 koşulunu sağlayan en küçük b seçilir; önek 32 − b olur.",
    },
    {
      heading: "DNS: adı sayıya çeviren soru zinciri",
      body:
        "Yönlendiriciler isim bilmez, sayı bilir. 'tr.wikipedia.org' yazdığında bilgisayarın önce yakınındaki bir <strong>özyinelemeli çözümleyiciye</strong> (çoğunlukla internet sağlayıcının ya da 1.1.1.1 gibi açık bir sunucunun) sorar. Çözümleyici cevabı bilmiyorsa yukarıdan aşağıya iner (sayfadaki adıyla <strong>yinelemeli çözümleme</strong>): önce <strong>kök</strong> sunuculara ('org'u kim yönetiyor?'), sonra üst düzey alan (TLD) sunucusuna ('wikipedia.org'u kim yönetiyor?'), en sonda alan adının <strong>yetkili</strong> sunucusuna ('tr.wikipedia.org'un adresi ne?'). Kök ve TLD sunucuları adresi vermez, yalnızca 'şuna sor' der; bu yanıta <strong>yönlendirme</strong> denir. Her yanıt, kayıt sahibinin belirlediği süre boyunca önbellekte tutulur; aynı soru yeniden gelirse yol hiç yürünmez. Kök sunucular harflerle anılır, a'dan m'ye on üç tane; ama her harfin adresini dünyaya dağılmış çok sayıda makine paylaşır (anycast) ve soru çoğunlukla en yakındakine ulaşır. Sayfanın dördüncü sekmesi bu düzenin küçük bir modelidir: bir kök, dört TLD ve dört yetkili sunucu. Gerçek sorgu gönderilmez; adlar, örnekler için ayrılmış example ailesindendir. Önbellek ise gerçekteki gibi çalışır: yönlendirmeleri, yanıtları, takma adları (CNAME) ve 'böyle bir ad yok' yanıtını sürelerince saklar.",
      formula: "Soğuk çözümleme: kök → TLD → yetkili = 3 sorgu (+ her takma ad için yeni sorgular);  önbellekte varsa: 0",
      formulaNote: "Kayıtların da bir 'TTL'i vardır ama bu, paketlerdeki yaşam sayacı değil, kaydın önbellekte kalma süresidir (saniye). Sayfadaki öğretim değerleri: A kaydı 300 s, CNAME 600 s, TLD'nin verdiği yönlendirme 3.600 s, kökün verdiği yönlendirme 86.400 s, olumsuz yanıt 60 s.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvar ve her sekmede sayılan ya da benzetimle ölçülen değer kuramın yanında durur. <strong>01 · Paketin yolculuğu</strong>: sekiz düğümlü ağ çizimi, <strong>Yol ölçütü</strong> menüsü, <strong>Seçili bağlantı</strong> ve gecikme kaydırıcısı, <strong>Başlangıç TTL</strong>, <strong>Paketi gönder</strong>, <strong>R3–R5 kopsun</strong> ve <strong>TTL = 3</strong> düğmeleri, traceroute tablosu; altta başlık baytlarını sayan <strong>Sarmalama</strong> bölümü. <strong>02 · Güvenilir aktarım</strong>: <strong>Protokol</strong> menüsü, <strong>Pencere W</strong>, <strong>Gidiş-dönüş süresi r</strong>, <strong>Segment kayıp olasılığı p</strong> kaydırıcıları, üç protokolü aynı kanalda karşılaştıran tablo ve altta testere dişi grafiğiyle <strong>Tıkanıklık denetimi</strong>. <strong>03 · Adresler ve alt ağlar</strong>: CIDR hesaplayıcı, VLSM bölücü, en uzun önek tablosu ve IPv6 yazımı. <strong>04 · Adlar: DNS</strong>: <strong>Çöz</strong> düğmesi, saati ilerleten düğmeler ve önbellek tablosu. R tuşu etkin sekmeyi sıfırlar. Buradaki her şey bir öğretim modelidir: adresler belgeleme için ayrılmış bloklardan, adlar example ailesinden, gecikmeler ve kayıp olasılıkları seçilmiş değerlerdir; gerçek bir ağ ölçülmez. Sayılar ondalık virgül ve binlik noktayla yazılır.",
    experiments: [
      {
        title: "Kopan bağlantı, biten ömür",
        predict:
          "Varsayılan yol altı bağlantıdan geçiyor. R3–R5 bağlantısı koparsa paket beş bağlantılı bir yola düşecek; yolculuk kısalır mı, uzar mı? TTL'i 3 olan bir paket hangi yönlendiricide ölür ve hedefe varması için TTL en az kaç olmalı?",
        do: "<strong>01 · Paketin yolculuğu</strong> sekmesinde <strong>Ağı sıfırla</strong>, sonra <strong>Paketi gönder</strong> düğmesine (ya da Boşluk tuşuna) bas; altı kartı ve traceroute tablosunu oku. <strong>R3–R5 kopsun</strong> düğmesine bas ve kartları yeniden oku. Ardından <strong>Ağı sıfırla</strong> ve <strong>TTL = 3</strong>.",
        observe:
          "Başta yol K → R1 → R3 → R5 → R4 → R6 → H: ölçülen 22,5 ms, formül 22,5 ms, fark 0,0 ms; varıştaki TTL 59, yol uzunluğu “6 bağlantı · 5 yönlendirici”, RTT 45,0 ms. Traceroute'un RTT sütunu 2,5 · 11,5 · 26,5 · 31,5 · 42,5 · 45,0 ms diye büyür. Bağlantı kopunca yol K → R1 → R2 → R4 → R6 → H olur: 24,0 ms, TTL 60, “5 bağlantı · 4 yönlendirici”. TTL = 3 ile ölçülen kartı “Varmadı · TTL bitti”, TTL kartı “0 · R5 attı” der; durum satırı paketin 13,0 ms sonra atıldığını ve TTL'in en az 6 olması gerektiğini yazar.",
        explain:
          "İlk yolda bağlantılar 1 + 4 + 7 + 2 + 5 + 1 = 20 ms, beş yönlendirici 5 × 0,5 = 2,5 ms tutar. Yedek yolda 1 + 6 + 9 + 5 + 1 = 22 ms ve 4 × 0,5 = 2 ms: daha az durak, daha uzun süre. TTL'i R1 2'ye, R3 1'e, R5 0'a indirir; paket R5'e 1 + 0,5 + 4 + 0,5 + 7 = 13,0 ms'de varır ve atılır. Yolda beş yönlendirici olduğundan TTL en az 6 olmalıdır. Traceroute'un ilk satırı: gidiş 1 ms, dönüş 1 ms, R1'in işlemi 0,5 ms. Modelde kopmayı herkes aynı anda öğrenir ve kuyruk yoktur; gerçek ağda yeni yolların yayılması zaman alır.",
      },
      {
        title: "Aynı kanal, üç protokol",
        predict:
          "Kanal on segmentten birini kaybediyor (p = 0,10). Üç protokol de yaklaşık yüzde on fazladan mı gönderir? Hangisi kaybın bedelini katlar, hangisi kayıp hiç olmasa bile yavaştır?",
        do: "<strong>02 · Güvenilir aktarım</strong> sekmesinde <strong>Aktarımı sıfırla</strong> (N geri git, W = 8, r = 4 dilim, p = 0,10, tohum 2026). Üç protokolün tablosunu oku. <strong>Ağır kayıp: p = 0,30</strong> düğmesine bas. Son olarak <strong>Kayıpsız kanal</strong> düğmesine bas ve <strong>Protokol</strong> menüsünden Dur ve bekle'yi seç.",
        observe:
          "p = 0,10: Dur ve bekle paket başına 1,118 gönderim (kuram 1,111), verim %17,9 (kuram %18,0). N geri git 1,587 gönderim (1,556), verim %62,9 (%64,3). Seçici yineleme 1,118 gönderim (1,111), verim %83,3 (kuram hücresi “≤ %90,0”). p = 0,30: N geri git 3,153 gönderim (3,143), verim %31,7 (%31,8); Seçici yineleme 1,437 gönderim, verim %59,5. Kayıpsız kanalda Dur ve bekle'nin verimi %20,0'da kalır, N geri git %99,8'e çıkar.",
        explain:
          "Dur ve bekle ile seçici yineleme yalnızca kaybolanı yineler: 1/(1 − p) = 1,111. N geri git'te her kayıp TO = 1 + r = 5 dilime mal olur, çünkü arkasındaki dört segment de yinelenir: 1 + 5 · 0,1/0,9 = 1,556; p = 0,30'da 3,143. Dur ve bekle'de her segment 5 dilim tutar; verim en çok 1/5 olur. Seçici yinelemenin kuramı üst sınırdır: penceredeki ilk segment kaybolunca gönderici bekler. Kayıpsız kanaldaki %99,8, son onayları bekleyen dört dilimdir. Yüzde bir iki sapma hata değil, örneklemin saçılmasıdır: <strong>Aktarımı sıfırla</strong>, sonra <strong>Yeni tohum</strong> (2027); N geri git 1,542 gönderime ve %64,6 verime geçer.",
      },
      {
        title: "Önek uzadıkça ağ daralır",
        predict:
          "192.0.2.77/26 ağında kaç cihaz adresi var ve 192.0.2.130 aynı ağda mı? Öneki 31'e çıkarırsan 'toplamdan iki eksik' kuralı sıfır cihaz verir; sayfa ne diyecek? 100, 50, 20 ve 2 cihazlık dört alt ağ 256 adreslik bir bloğa sığar mı?",
        do: "<strong>03 · Adresler ve alt ağlar</strong> sekmesinde <strong>Adresleri sıfırla</strong>. Kartları ve renkli ikili gösterimi oku. <strong>Önek uzunluğu</strong> kaydırıcısını 24'e çek, sonra <strong>/31 dene</strong> ve <strong>/32 dene</strong> düğmelerine bas. Aşağıdaki VLSM bölümünde <strong>Alt ağ başına cihaz sayıları</strong> kutusunda 100, 50, 20, 2 yazdığını gör ve tabloyu oku.",
        observe:
          "/26: ağ 192.0.2.64/26, yayın 192.0.2.127, maske 255.255.255.192, cihaz aralığı 192.0.2.65 – 192.0.2.126, “62 / 64”; ikinci adres kartı “Hayır · 192.0.2.128/26”. /24'te aynı kart “Evet · aynı ağ”, adres kartı “254 / 256” olur. /31: “2 / 2”, yayın kartı “Yok · /31 bağlantısı”, aralık 192.0.2.76 – 192.0.2.77. /32: “1 / 1”. VLSM tablosu sırayla 192.0.2.0/25, 192.0.2.128/26, 192.0.2.192/27 ve 192.0.2.224/30 verir; 228 adres dağıtılmış, 28 adres boş kalmıştır.",
        explain:
          "77 = 01001101; /26 son sekizlinin ilk iki bitini ağa verir, '01' ile başlayan adresler 64–127 bloğundadır. 130 = 10000010 ise '10' ile başlar: komşu blok, 128–191. /31'de ağ ve yayın adresi ayırmak iki adresi de tüketirdi; noktadan noktaya hatlarda ikisi de cihaza verilir. VLSM'de her isteğe, iki özel adresle birlikte sığdığı en küçük ikinin kuvveti düşer: 100 + 2 → 128, 50 + 2 → 64, 20 + 2 → 32, 2 + 2 → 4; toplam 228. 172 cihaz için harcanan fazladan 56 adres bu yuvarlamanın bedelidir. Hiçbir adımda 'C sınıfı' demedik: sınıflar 1993'te bırakıldı, boyu yalnızca önek belirler.",
      },
      {
        title: "Önbellek ısınınca kaç soru kalır?",
        predict:
          "www.example.com için A kaydı boş önbellekle 4 sorguda çözülüyor. Aynı soruyu hemen yeniden sorarsan kaç sorgu gider? Beş dakika sonra? Bir saat daha geçince? (A kaydı 300 s, takma ad 600 s, example.com yönlendirmesi 3.600 s, com yönlendirmesi 86.400 s saklanır.)",
        do: "<strong>04 · Adlar: DNS</strong> sekmesinde <strong>DNS'i sıfırla</strong>; bu düğme www.example.com A sorusunu bir kez boş önbellekle çözer. Kartları ve adım tablosunu oku. Sonra sırayla: <strong>Çöz</strong>; <strong>+ 5 dk</strong> ve <strong>Çöz</strong>; <strong>+ 1 sa</strong> ve <strong>Çöz</strong>; <strong>+ 1 gün</strong> ve <strong>Çöz</strong>. Her seferinde sorgu kartını, süreyi ve önbellek tablosundaki kalan TTL'leri izle.",
        observe:
          "Sıfırlamadan sonra: 4 sorgu, 110 ms; zincir www.example.com → example.com → A 192.0.2.10. Hemen yeniden: 0 sorgu, kazanç kartı “4 sorgu · 110 ms”. Beş dakika sonra: 1 sorgu, 20 ms. Bir saat daha sonra: 3 sorgu, 80 ms. Bir gün daha sonra: yeniden 4 sorgu, 110 ms. Toplam kartı “12 / 20 sorgu” gösterir: önbellek beş çözümlemede yirmi sorgunun sekizini gereksiz kıldı.",
        explain:
          "Soğuk yol kök (30 ms), com TLD (40 ms) ve yetkili sunucudur (20 ms); www bir takma ad çıktığı için asıl ad aynı sunucuya bir kez daha sorulur: 30 + 40 + 20 + 20 = 110 ms. 300 saniye sonra yalnızca A kaydının süresi dolmuştur; tek soru doğrudan yetkili sunucuya gider. t = 3.900 s'de takma ad ve example.com yönlendirmesi de silinmiştir, ama kökün verdiği com yönlendirmesi bir gün yaşar: kök atlanır, 40 + 20 + 20 = 80 ms. Bir gün sonra hiçbir şey kalmaz. Modelde her bölgenin tek sunucusu vardır ve hep yanıt verir. <strong>Olmayan ad</strong> düğmesini de dene: 'yok' yanıtı bile 60 saniye saklanır.",
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
        "IPv4'te 2³² = 4.294.967.296 adres vardır. 3 Şubat 2011'de IANA elindeki son beş büyük bloğu (/8) bölgesel kayıt kuruluşlarına dağıttı; merkezî stok bitti. Ardılı IPv6 128 bit kullanır: 2¹²⁸ ≈ 3,4 × 10³⁸ adres. Bunu Dünya'nın yüzeyine (5,1 × 10¹⁴ m²) bölersen metrekare başına yaklaşık 6,7 × 10²³ adres düşer; bir mol maddedeki tanecik sayısıyla (6,02 × 10²³) aynı mertebede. IPv4 yine de yaşıyor: NAT sayesinde bir evin bütün cihazları tek bir genel adresi paylaşıyor.",
    },
    {
      title: "Işıktan hızlı veri yok",
      body:
        "Kıtalar arası trafiğin çok büyük bölümü okyanus tabanındaki fiber kablolardan geçer ve camın içinde ışık boşluktakinden yavaştır: saniyede yaklaşık 200.000 km. İstanbul–San Francisco arası büyük daire boyunca 10.800 km'dir; tek yön en az 54 ms, gidiş-dönüş en az 108 ms. Kablolar düz çizgi izlemediği için ölçülen süre bunun üstünde kalır. Bant genişliğini artırmak bu sınırı kıpırdatmaz; borsalarda işlem yapan şirketlerin sunucularını borsanın veri merkezine taşımasının nedeni budur.",
    },
  ],
  worked: {
    title: "Testere dişinden megabite",
    prompt:
      "Sayfadaki sadeleştirilmiş TCP modelinde yol, pencere W<sub>max</sub> = 40 MSS'e ulaştığı turda bir kayıp veriyor; gönderici her kayıpta pencereyi yarıya indiriyor, sonra her gidiş-dönüş turunda 1 MSS büyütüyor. MSS = 1.460 bayt, RTT = 100 ms. Ortalama pencereyi, ortalama hızı, iki kayıp arasındaki süreyi ve kayıp başına gönderilen segment sayısını bul; W<sub>max</sub> iki katına çıkınca bunların nasıl ölçeklendiğini söyle.",
    steps: [
      "Bir döngüyü yaz: kayıptan sonra pencere 20 MSS'e iner ve tur tur 20, 21, 22, …, 40 diye büyür; 40'ta yeniden kayıp olur. Bu 40 − 20 + 1 = 21 turdur. Her tur bir RTT sürdüğünden iki kayıp arası 21 × 0,1 s = 2,1 s.",
      "Ortalama pencere: değerler aritmetik dizi olduğundan ortalama iki ucun ortalamasıdır: (20 + 40)/2 = 30 MSS. Genel olarak (W/2 + W)/2 = ¾ · W<sub>max</sub>.",
      "Ortalama hız: her turda ortalama 30 segment, yani 30 × 1.460 bayt × 8 bit/bayt = 350.400 bit gider. Bunu tur süresine böl: 350.400 bit / 0,1 s = 3.504.000 bit/s ≈ 3,50 Mb/s.",
      "Kayıp başına segment: bir döngüde 30 × 21 = 630 segment gönderilir ve yalnızca biri kaybolur; kayıp oranı 1/630 ≈ %0,16. Genel olarak döngü yaklaşık W/2 tur, ortalama ¾ · W olduğundan döngü başına segment ≈ (3/8) · W² kadardır; kayıp oranı p ≈ 8/(3W²).",
      "Ölçekle: W<sub>max</sub> = 80 için ortalama 60 MSS, hız 60 × 1.460 × 8 / 0,1 s = 7.008.000 bit/s ≈ 7,01 Mb/s, döngü 41 tur, döngü başına 60 × 41 = 2.460 segment. Hız iki katına çıktı, ama bunun için kayıp oranının yaklaşık dörtte birine inmesi gerekti: hız, kayıp oranının karekökü ile ters orantılıdır. Dördüncü adımdaki p'den: ortalama pencere ¾ · W ≈ √(3/(2p)) ≈ 1,22/√p; p = 1/630 için 30,7 MSS, sayılan 30'a çok yakın. Ders kitapları bu bağıntıya TCP'nin karekök yasası der (Mathis ve arkadaşları, 1997).",
      "Sayfada doğrula: <strong>02 · Güvenilir aktarım</strong> sekmesinin altındaki Tıkanıklık denetimi bölümünde varsayılan ayarlarla kartlar 30,00 MSS, 30,00 MSS, %0,0, 3,50 Mb/s, “21,0 tur · 2,1 s” ve “9 kayıp / 200 tur” gösterir. <strong>Kaybın başladığı pencere W_max</strong> kaydırıcısını 80'e çek: 60,00 MSS, 7,01 Mb/s, “41,0 tur · 4,1 s”.",
    ],
    result:
      "Ortalama pencere 30 MSS, hız yaklaşık 3,50 Mb/s, kayıplar arası 2,1 s, kayıp başına 630 segment. Toplamsal artış ve çarpımsal azalış, hızı kayıp oranının kareköküyle ters orantılı kılar; model kaybı yalnızca pencere W<sub>max</sub>'a değdiğinde ürettiği için bu, gerçek TCP'nin değil onun en yalın iskeletinin hesabıdır.",
  },
  misconceptions: [
    {
      myth: "İnternet ile Web aynı şeydir.",
      truth:
        "İnternet 1969'da doğan paket ağının devamıdır; Web ise 1989'da önerilen, onun üstünde çalışan bir uygulamadır. Ağ üzerinden e-posta 1971'de gönderilmeye başlandı; Web'den yaklaşık yirmi yıl yaşlıdır. Oyun sunucuları, görüntülü aramalar ve bu sayfada modellenen DNS sorguları Web'in parçası değildir ama hepsi internettir.",
    },
    {
      myth: "Veri tek bir kablodan, tek bir yoldan hedefe gider.",
      truth:
        "Veri paketlere bölünür ve her paket yönlendirme tablolarının o andaki kararına göre gider; bir hat koparsa ya da tablo değişirse aynı dosyanın iki paketi farklı yollardan dolaşabilir. Sırayı ve eksikleri alıcıdaki TCP toparlar. Sayfada <strong>R3–R5 kopsun</strong> düğmesine bastığında bunu görürsün: sıradaki paket R2 ve R4 üzerinden giden yedek yola geçer.",
    },
    {
      myth: "En az duraktan geçen yol en hızlı yoldur.",
      truth:
        "Atlama sayısı ile gecikme farklı ölçütlerdir. Sayfanın varsayılan ağında <strong>Yol ölçütü</strong> menüsünden 'En az atlama'yı seçersen paket 5 bağlantılı yoldan 24,0 ms'de gider; 'En az toplam gecikme' ise 6 bağlantılı yolu seçer ve 22,5 ms'de varır. Yönlendirme protokolleri bu yüzden bağlantılara maliyet atar; hangi yolun 'en kısa' olduğu maliyetin tanımına bağlıdır.",
    },
    {
      myth: "IP adresi, cihazın değişmez kimliğidir.",
      truth:
        "Adres çoğunlukla DHCP ile geçici verilir ve ağ değiştirince değişir; evdeki telefon, bilgisayar ve televizyon dış dünyaya tek bir genel adresle çıkar (NAT). Donanıma işlenen kimlik MAC adresidir; o da yalnızca yerel ağda görünür ve güncel telefonlar her Wi-Fi ağı için rastgele bir MAC adresi kullanabilir.",
    },
  ],
  glossary: [
    { term: "Paket", definition: "Verinin, başına kaynak ve hedef adresleri eklenmiş, tek başına yolculuk eden parçası; Ethernet'te en çok 1.500 bayt." },
    { term: "Yönlendirici (router)", definition: "Paketi alıp hedef adresine göre tablosundan sıradaki komşuyu seçen ve paketi ona ileten cihaz." },
    { term: "TTL", definition: "Paket başlığındaki yaşam sayacı; her yönlendiricide bir azalır, sıfırda paket atılır ve kaynağa 'süre aşıldı' iletisi döner." },
    { term: "MSS", definition: "Bir TCP segmentinin taşıyabileceği en çok veri; bağlantının en büyük paket boyundan (MTU) IP ve TCP başlıkları çıkarılarak bulunur." },
    { term: "ARQ", definition: "Onayı zamanında gelmeyen veriyi yeniden göndererek kayıplı bir kanalda güvenilir aktarım sağlayan yöntemlerin ortak adı." },
    { term: "Tıkanıklık penceresi (cwnd)", definition: "Göndericinin, onayı gelmeden yolda tutmasına izin verdiği segment sayısı; kayıp yokken büyütülür, kayıp görülünce küçültülür." },
    { term: "CIDR öneki", definition: "Adresin kaç bitinin ağ kısmı olduğunu söyleyen /n gösterimi; kalan 32 − n bit cihazlara ayrılır." },
    { term: "DNS", definition: "Alan adlarını IP adreslerine çeviren, kök → TLD → yetkili sunucu hiyerarşisiyle çalışan dağıtık sistem." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede ağ bir dizi protokol adıdır; 'Bilgisayar Ağları' dersinde her biri bir <strong>algoritma ve bir matematik problemi</strong> olur. İlk hesap gecikmedir: L bitlik bir paketi R bit/s'lik hattan itmek L/R, d kilometrelik hattı s hızıyla geçmek d/s sürer; 1.500 baytlık paket 10 Mbit/s'lik hatta 12.000 bit / 10⁷ bit/s = 1,2 ms'de çıkar; camın içinde saniyede 200.000 km yol alan ışık 5.570 km'lik bir okyanus kablosunu 28 ms'de aşar. Üçüncü terim yönlendiricideki bekleyiştir ve kuyruk teorisinin konusudur: saniyede ortalama λ paketin geldiği, μ paketin işlendiği en yalın modelde (M/M/1) ortalama kalış süresi 1/(μ − λ)'dır; yük kapasiteye yaklaştıkça gecikme sınırsız büyür. Kleinrock'un 1960'lardaki tezi bu sorunun peşindeydi. TCP'nin 'ne hızda göndereyim' sorusunu 1988'de Van Jacobson'ın tıkanıklık denetimi cevapladı: kayıp yoksa pencereyi birer birer artır, kayıp görünce yarıya indir. Bu, kontrol teorisindeki bir geri besleme döngüsüdür; sayfanın ikinci sekmesindeki testere dişi onun en yalın hâlidir.",
      "Yönlendirme tabloları çizge algoritmalarıyla dolar: OSPF her yönlendiricide Dijkstra'yı çalıştırır (sayfanın ilk sekmesindeki öğretim ağı bunun küçük bir modelidir); ağların ağını birbirine bağlayan BGP ise komşuların ilan ettiği yolları, ticari anlaşmaları da gözeterek karşılaştıran bir yol-vektör yöntemidir. İkinci köprü güvenliktir: HTTPS, HTTP ile TCP arasına TLS zarfını koyar; 2018'de standartlaşan TLS 1.3 bağlantıyı tek gidiş-dönüşte kurar ve anahtar değişimi asal sayıların ya da eliptik eğrilerin aritmetiğine dayanır. Üçüncüsü dağıtık sistemlerdir: DNS önbelleği, anycast ve videoyu en yakın sunucudan getiren içerik dağıtım ağları aynı soruya cevap arar: dünyanın her yerinden gelen istekler tutarlı ve hızlı nasıl karşılanır? En altta ise bilgi kuramı durur: Shannon'ın C = B log<sub>2</sub>(1 + S/N) bağıntısı, B hertz genişliğindeki gürültülü bir kanaldan saniyede en çok kaç bit geçebileceğini söyler.",
    ],
    topics: ["Gecikme bileşenleri ve kuyruk teorisi (M/M/1)", "Tıkanıklık denetimi ve geri besleme", "En kısa yol algoritmaları: Dijkstra, Bellman–Ford", "TLS ve açık anahtarlı kriptografi", "Dağıtık sistemler ve önbellekleme", "Bilgi kuramı: Shannon kapasitesi"],
  },
  quiz: [
    {
      question: "Kayıpsız bir kanalda dur ve bekle protokolü, gidiş-dönüş süresi r = 4 dilimken %20,0 verimle çalışıyor. Hat uzadı ve r = 9 dilim oldu; başka hiçbir şey değişmedi. Verim ne olur?",
      options: ["%20,0; kayıp olmadığı için değişmez", "%11,1", "%10,0", "%5,0"],
      answer: 2,
      explanation: "Dur ve bekle her segment için bir dilim gönderir, r dilim onay bekler: verim 1/(1 + r). r = 4 için 1/5, r = 9 için 1/10 = %10,0. Kayıp olmasa da hız mesafeyle düşer. Çare pencere açmaktır: sayfada Kayıpsız kanal düğmesine basıp r'yi 9 yap; Dur ve bekle %10,0'da kalırken W = 8 pencereli N geri git %79,8 verir, yani yaklaşık W/(1 + r) = 8/10.",
    },
    {
      question: "192.0.2.0/24 bloğundan 100, 50, 20 ve 2 cihazlık dört alt ağ ayrıldı; 228 adres kullanıldı, 28 adres boş kaldı. Bu bloğa 26 cihazlık beşinci bir alt ağ daha sığar mı?",
      options: [
        "Evet; 28 boş adres 26 cihaza yeter",
        "Evet; ağ ve yayın adresiyle tam 28 eder, boşluk tam dolar",
        "Hayır; 26 + 2 = 28 adres gerekir ama alt ağ boyu ikinin kuvveti olmalıdır: 32 adres",
        "Hayır; bir /24 bloğu en çok dört alt ağa bölünebilir",
      ],
      answer: 2,
      explanation: "Bir alt ağın boyu 2<sup>b</sup> adrestir ve cihazlara ek olarak ağ ile yayın adresini de barındırmalıdır: 2<sup>b</sup> ≥ 28 koşulunu sağlayan en küçük boy 32'dir (/27). Toplam 128 + 64 + 32 + 32 + 4 = 260 adres eder, blok 256 adreslik. Sayfada <strong>Alt ağ başına cihaz sayıları</strong> kutusuna 100, 50, 20, 2, 26 yazarsan durum satırı “toplam 260 adres gerekiyor, blokta 256 adres var” der; büyük istekler önce yerleştiği için açıkta kalan, sıranın sonundaki 2 cihazlık ağdır. 12 cihazlık bir ağ ise 16 adreslik /28 ile sığar.",
    },
    {
      question: "Çözümleyici www.example.com'u boş önbellekle 4 sorguda çözdü: kök, com TLD, yetkili sunucu (takma ad) ve yine yetkili sunucu (A kaydı). Saklama süreleri: A 300 s, takma ad 600 s, example.com yönlendirmesi 3.600 s, com yönlendirmesi 86.400 s. Yirmi dakika sonra aynı soru kaç sorgu ister?",
      options: ["0 sorgu; her şey önbellekte", "1 sorgu", "2 sorgu", "4 sorgu; önbellek boşalmıştır"],
      answer: 2,
      explanation: "1.200 saniye sonra A kaydının (300 s) ve takma adın (600 s) süresi dolmuş, iki yönlendirme ise hâlâ önbellektedir. Çözümleyici kökü ve TLD'yi atlar, doğrudan example.com'un yetkili sunucusuna iki soru sorar: önce takma adı, sonra asıl adın A kaydını öğrenir. Sayfada sınamak için DNS'i sıfırla, + 5 dk düğmesine dört kez bas ve Çöz: 2 sorgu, 40 ms.",
    },
  ],
  next: [
    { href: "siber-guvenlik.html", title: "Siber Güvenlik Laboratuvarı: Şifre, Özet ve Anahtar", why: "Paket açık bir zarftır. Oyuncak boyutta Diffie–Hellman, iki ucun herkesin dinlediği bir hatta ortak anahtarı nasıl kurduğunu; SHA-256 ve HMAC de iletinin yolda değişmediğinin nasıl kanıtlandığını gösterir." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma: Az Adım mı, Az Maliyet mi?", why: "Aynı ağırlıklı ızgarada BFS, Dijkstra ve A* çalışır; bu sayfadaki 'en az atlama mı, en az gecikme mi' sorusunun algoritma tarafını adım adım izlersin." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi (Graph Theory)", why: "Yönlendiriciler ve bağlantılar bir çizgedir; kendi ağını çiz, kenarlara ağırlık ver, Dijkstra ile en kısa yolu buldur." },
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
