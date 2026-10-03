window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["isletim-sistemleri-ve-linux"] = {
  slug: "isletim-sistemleri-ve-linux",
  title: "İşletim Sistemi: Donanımı Paylaştıran Hakem",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 30,
  tagline:
    "Tek bir işlemci, yüzlerce program: hepsi aynı anda çalışıyormuş gibi görünür. Bu yanılsamayı kuran, belleği paylaştıran ve her şeyi dosyaya çeviren yazılıma işletim sistemi denir; Linux onun en çok kopyalanan örneğidir.",
  hook:
    "25 Ağustos 1991'de Helsinki'de 21 yaşında bir öğrenci bir tartışma grubuna şöyle yazdı: 'Ücretsiz bir işletim sistemi yapıyorum, sadece hobi, GNU gibi büyük ve profesyonel olmayacak.' Bugün dünyadaki en hızlı 500 süperbilgisayarın 500'ü, Mars'ta uçan bir helikopter ve cebindeki Android telefon o hobinin üzerinde çalışıyor. Peki bir işletim sistemi tam olarak ne yapar ki bu kadar yere sığar?",
  bigIdea:
    "İşletim sistemi bir <strong>hakemdir</strong>: işlemciyi zaman dilimlerine, belleği sayfalara, aygıtları dosyalara böler; programlar donanıma dokunamaz, yalnızca <em>sistem çağrısı</em> ile çekirdekten hizmet ister. Her şey paylaşılır, hiçbir şey birbirine karışmaz.",
  story: [
    "1969'da New Jersey'deki Bell Laboratuvarları'nda Ken Thompson'ın bir derdi vardı: yazdığı <em>Space Travel</em> adlı uzay oyunu, büyük bilgisayarda oynandığında bir oyun başına 75 dolara mal oluyordu. Köşede duran eski bir PDP-7'ye oyunu taşıdı; ama oyunun çalışması için makineye önce bir dosya sistemi, bir süreç yönetimi ve bir komut yorumlayıcısı gerekiyordu. Thompson ve Dennis Ritchie bunları yazdı ve ortaya çıkan şeye <strong>Unix</strong> adı verildi. Thompson'ın, karısı bir aylığına seyahate çıkınca haftada bir parça (bir hafta çekirdek, bir hafta kabuk, bir hafta editör, bir hafta çevirici) yazdığı anlatılır; kayıtlarda kesin olan ise 1973'te Unix'in, Ritchie'nin yeni icadı <strong>C</strong> diliyle baştan yazıldığı ve böylece tarihte ilk kez bir işletim sisteminin bir makineden başkasına taşınabilir hâle geldiğidir.",
    "Unix'in fikirleri yayıldı, ama kodu AT&T'nin malıydı. 27 Eylül 1983'te Richard Stallman, kaynak kodu herkesin okuyup değiştirebileceği özgür bir Unix yapma çağrısıyla <strong>GNU</strong> projesini duyurdu. On yıl içinde derleyici (gcc), kabuk (bash), editör ve yüzlerce araç yazıldı; eksik kalan tek parça en zor olanıydı: çekirdek. 1987'de Andrew Tanenbaum öğrencileri için küçük bir eğitim çekirdeği olan MINIX'i yayımladı. Helsinki Üniversitesi'nde bu kitabı okuyan Linus Torvalds, yeni 386 bilgisayarının yeteneklerini MINIX'in kullanmadığını görünce kendi çekirdeğini yazmaya başladı. 17 Eylül 1991'de yayımladığı 0.01 sürümü yaklaşık 10 bin satırdı. Adı 'Freax' koymak istemişti; dosyaları sunucuya yükleyen Ari Lemmke dizine 'linux' adını verdi ve ad kaldı.",
    "Ocak 1992'de Tanenbaum aynı tartışma grubuna 'LINUX is obsolete' başlıklı bir ileti yazdı: tek parçalı (monolitik) çekirdek tasarımı eskimişti, gelecek mikro çekirdeklerindi. Torvalds sertçe cevap verdi; tartışma bugün hâlâ ders kitaplarında okutulur. Tanenbaum kuramsal olarak haksız değildi, ama Linux'un asıl gücü tasarımından çok lisansındaydı: 1992 başında Torvalds çekirdeği GNU'nun GPL lisansına geçirdi, böylece dünyanın her yerinden programcı katkıda bulunabildi. Mart 1994'te çıkan 1.0 sürümü 176 bin satırdı; GNU araçlarıyla birleşince tam bir işletim sistemi doğdu. Bugün çekirdek on milyonlarca satır C kodudur, binlerce şirket ve gönüllü her sürüme katkı verir; sunucuların, Android telefonların, Raspberry Pi'lerin ve Kasım 2017'den beri dünyanın en hızlı 500 süperbilgisayarının tamamının altında o 'hobi' çalışır.",
  ],
  core: [
    {
      heading: "İki dünya: kullanıcı alanı ve çekirdek",
      body:
        "İşlemci her komutu aynı yetkiyle çalıştırmaz. x86 işlemcilerde dört yetki halkası vardır; Linux ikisini kullanır. Çekirdek <strong>Ring 0</strong>'da koşar ve her şeyi yapabilir: belleğin her yerini okur, diske yazar, ağ kartını kurar. Senin programların, tarayıcı ve oyun dahil, <strong>Ring 3</strong>'tedir; bir aygıta doğrudan dokunmaya kalkarsa işlemci komutu reddeder ve çekirdeğe haber verir. Programın bir dosyayı okumak istediğinde yaptığı tek şey bir <strong>sistem çağrısı</strong>dır: 'open, read, write, fork, mmap' gibi birkaç yüz tanımlı kapıdan birine çalar, işlemci bir an Ring 0'a geçer, çekirdek işi yapıp sonucu döndürür, işlemci Ring 3'e döner. Sayfadaki 'Çekirdek ve Kullanıcı Alanı' şeması tam bu kapıyı çizer. Bir program çöktüğünde bilgisayarın çökmemesinin sebebi budur: çöken şey Ring 3'te, kendi bellek alanının içinde ölür.",
      formula: "Ring 3 → sistem çağrısı → Ring 0 → sonuç → Ring 3",
      formulaNote: "Bu gidiş-dönüş modern bir işlemcide mikrosaniye mertebesinde sürer; ama 'ucuz' değildir, bu yüzden programlar çağrıları toplu yapar.",
    },
    {
      heading: "Süreç: çalışan bir programın kimliği",
      body:
        "Diskteki program bir tariftir; çalışmaya başladığında <strong>süreç</strong> olur: kendi bellek alanı, kendi açık dosyaları ve bir kimlik numarası (PID) vardır. Sayfadaki süreç canvası beş durumu gösterir. <em>Yeni</em> süreç kabul edilince <em>Hazır</em> kuyruğuna girer; zamanlayıcı onu seçince <em>Çalışıyor</em> olur; zaman dilimi bitince Hazır'a döner; bir dosya ya da ağ yanıtı beklemesi gerekirse <em>Bekliyor</em>'a düşer ve işlemciyi hiç meşgul etmez; işi bitince <em>Sonlandı</em>. Terminalde 'ps' yazdığında gördüğün PID 1, 'systemd', açılışta çekirdeğin başlattığı ilk süreçtir ve diğer her süreç onun soyundan gelir. Linux'ta yeni süreç yaratmanın yolu şaşırtıcı derecede basittir: 'fork' sistem çağrısı çalışan süreci ikiye kopyalar, 'exec' kopyanın içine yeni programı yükler. Kabuk tam olarak bunu yapar: komutunu okur, fork, exec, bitmesini bekler, yeniden sorar.",
      formula: "kabuk döngüsü: oku → fork() → exec() → wait() → oku",
      formulaNote: "fork sonrası iki süreç aynı koddan devam eder; aralarındaki tek fark fork'un döndürdüğü sayıdır: çocukta 0, ebeveynde çocuğun PID'si.",
    },
    {
      heading: "Zamanlayıcı: tek işlemci, çok süreç",
      body:
        "Bir çekirdek, bir anda yalnızca bir süreç çalıştırır. 'Aynı anda' müzik dinleyip yazı yazabilmen, zamanlayıcının süreçleri saniyede yüzlerce kez değiştirmesindendir. En basit adil yöntem <strong>Round-Robin</strong>'dir: hazır süreçler bir kuyrukta durur, sıradaki süreç bir <strong>zaman dilimi</strong> (quantum) çalışır, bitmediyse kuyruğun sonuna döner. Sayfadaki simülasyon dört süreçle (firefox 6, gcc 4, python 3, mysqld 5 dilim) tam bunu yapar. Adalet bedava değildir: her değişimde çekirdek, çalışan sürecin yazmaç değerlerini kaydeder, yenisininkini yükler; buna <strong>bağlam değiştirme</strong> denir ve mikrosaniyeler sürer. Dilim çok kısa olursa zaman bağlam değiştirmeye gider, çok uzun olursa fare imleci takılır. Linux'un 2007'den beri kullandığı CFS, her sürecin 'ne kadar işlemci aldığını' sayıp en az alana sıra verir; 6.6 sürümüyle (2023) yerini aynı fikri son teslim tarihleriyle inceltmiş EEVDF aldı.",
      formula: "Bekleme süresi = Bitiş zamanı − İşlemci süresi (varış 0 ise)",
      formulaNote: "Toplam iş değişmez: dört sürecin 6 + 4 + 3 + 5 = 18 dilimi hangi sırayla verilirse verilsin 18 dilim sürer; sıralama yalnızca kimin ne kadar beklediğini değiştirir.",
    },
    {
      heading: "Bellek: boş değil, kullanılmayı bekleyen",
      body:
        "Terminalde 'free -h' yazdığında iki sayı kafa karıştırır: 'boş' 8.1 GiB ama 'kullanılabilir' 10 GiB. Fazlası nereden geldi? Linux, diskten bir kez okuduğu dosyaları RAM'de tutar; buna <strong>sayfa önbelleği</strong> denir ve 'tampon' sütunundaki 2.7 GiB'in büyük kısmı odur. Bu bellek dolu görünür ama bir program ihtiyaç duyduğu an anında boşaltılır; o yüzden kullanılabilir alan boş alandan büyüktür. Kural basittir: boş RAM israftır, çekirdek onu önbellek olarak harcar. Her sürece ayrıca <strong>sanal bellek</strong> verilir: program kendini bütün belleğin tek sahibi sanır, çekirdek ve işlemcideki bir çeviri birimi onun adreslerini gerçek RAM sayfalarına haritalar. İki program aynı adresi kullanır ama birbirini görmez; RAM biterse çekirdek az kullanılan sayfaları diske ('Swap' satırı, 8 GiB) taşır.",
      formula: "kullanılan + boş + tampon/önbellek = toplam  →  4.2 + 8.1 + 2.7 = 15.0 GiB",
      formulaNote: "Sayfadaki 'free -h' çıktısı bu toplamı tam tutturur; 'kullanılabilir' ise boş artı geri alınabilir önbellektir.",
    },
    {
      heading: "Her şey bir dosyadır",
      body:
        "Unix'in en zarif kararı: klavye, disk, ağ bağlantısı, hatta çalışan süreçlerin bilgisi, hepsi dosya gibi açılır, okunur, yazılır. Böylece bir program yalnızca 'open, read, write' bilerek her şeyle konuşabilir. Sayfadaki <strong>FHS</strong> ağacı bu dünyanın haritasıdır: '/bin' temel komutlar, '/etc' ayarlar, '/home' kullanıcılar, '/var/log' günlükler. İki dizin özeldir: '/dev' aygıt dosyalarını tutar (örneğin '/dev/null', yazılan her şeyi yutan sanal bir delik), '/proc' ise diskte hiç yoktur; çekirdek sen okudukça 'cpuinfo' ya da 'meminfo' içeriğini o anda üretir. Dizinlerin düzenini standartlaştıran FHS sayesinde hangi dağıtımı açarsan aç 'ls /' aynı iskeleti gösterir. Kullanıcı ev dizinindeki '.bashrc' gibi noktayla başlayan dosyalar ise gerçek 'ls'de gizlidir; kabuk her açılışta onları okuyup ayarlarını yükler.",
      formula: "/ → bin, boot, dev, etc, home, lib, proc, usr, var …",
      formulaNote: "Windows'ta C:, D: gibi ayrı kökler vardır; Linux'ta tek kök '/' vardır, her disk bu ağacın bir dalına 'bağlanır' (mount).",
    },
  ],
  lab: {
    intro:
      "Sayfada dört oyun alanı var: tıklanabilir <strong>İşletim Sistemi Mimarisi</strong> katmanları, <strong>Yeni Süreç Oluştur</strong> / <strong>Zamanlayıcıyı Çalıştır</strong> / <strong>Sıfırla</strong> düğmeli süreç canvası, komut yazılan <strong>Linux Terminal Simülatörü</strong> ve <strong>1 Quantum İlerle</strong> / <strong>Otomatik</strong> / <strong>Sıfırla</strong> düğmeli Round-Robin zamanlayıcısı. Terminal yalnızca 'help' listesindeki komutları tanır ve çıktıları sabittir; ama bu sabit sayıların içinde gerçek Linux'un hesapları gizli.",
    experiments: [
      {
        title: "Round-Robin: kim önce biter, kaç kare çizilir?",
        predict:
          "firefox 6, gcc 4, python 3, mysqld 5 dilim istiyor. Her süreç sırayla bir dilim alırsa önce hangisi biter? Zaman çizelgesinde kaç renkli kare oluşur? Hangi tıklamada python kartı 'Tamam' yazar?",
        do: "Zamanlayıcıda Sıfırla'ya bas, sonra '1 Quantum İlerle'ye tıklayarak her seferinde kartlardaki '(n q)' sayılarını ve çizelgeye eklenen kareyi say. Sonra Sıfırla ve Otomatik'e basıp saatle süreyi ölç.",
        observe:
          "Kareler firefox, gcc, python, mysqld renginde dönerek dizilir. 12. tıklamada python 'Tamam' olur, 15.'de gcc, 18.'de mysqld, 19.'da firefox; çizelgede 18 renkli kare vardır, 19. tıklama gri bir 'boş' kare ekler. Otomatik modda her adım 0.4 saniye: yaklaşık 7.6 saniyede durur.",
        explain:
          "Kuyruk sırası sabittir, her tur dört dilim harcar. Üçüncü turun sonunda (11. kare) python'un üç dilimi biter; kartı bir sonraki adımda, zamanlayıcı onu sıradan çıkarırken güncellenir. Kısa işler önce biter, ama en uzun iş olan firefox en son 18. karede tamamlanır: toplam iş 6 + 4 + 3 + 5 = 18 dilimdir ve hiçbir sıralama bunu değiştiremez.",
      },
      {
        title: "df'nin yüzdesi neden tutmuyor?",
        predict:
          "Terminalde 'df -h' yazınca /dev/sda1 için Boyut 476G, Kullanılan 128G görünür. 128 / 476 kaç yüzde eder? Ekranda bu sayıyı mı göreceksin?",
        do: "Terminale 'df -h' yaz. Üç satırdaki Boyut, Kullanılan, Müsait ve %Kull değerlerini bir kâğıda al; her satır için Kullanılan + Müsait toplamını ve Kullanılan / (Kullanılan + Müsait) oranını hesapla.",
        observe:
          "128 / 476 = %26.9, ama ekran %29 der. 128 + 324 = 452, 476'dan 24G eksik. 128 / 452 = %28.3 çıkar ve df bunu yukarı yuvarlar: %29. İkinci disk için 892 / (892 + 812) = %52.3, ekranda %53.",
        explain:
          "Gerçek 'df' iki şey yapar: yüzdeyi toplam alana değil kullanıcıya açık alana göre hesaplar ve her zaman yukarı yuvarlar; 'yüzde 29 dolu' uyarısı erken gelsin diye. Kayıp 24G ise ext4'ün varsayılan olarak yalnızca root kullanıcısına ayırdığı yüzde 5'lik yedek alandır: 476 × 0.05 ≈ 24. Disk 'tamamen dolduğunda' bile sistem yöneticisi çalışabilsin diye.",
      },
      {
        title: "Boş bellekten çok 'kullanılabilir' bellek",
        predict:
          "'free -h' çıktısında 'boş' sütunu mu, 'kullanılabilir' sütunu mu daha büyük olacak? 'kullanılan + boş + tampon' toplamı 'toplam'ı tutar mı?",
        do: "Terminale 'free -h' yaz. Bellek satırındaki altı sayıyı oku; 4.2 + 8.1 + 2.7 toplamını yap. Sonra 'uptime' ve 'ps' komutlarını da çalıştırıp yük ortalamalarını ve PID 1'in adını not et.",
        observe:
          "Toplam 15.0 GiB, tam tutar. Kullanılabilir (10 GiB) boştan (8.1 GiB) büyüktür. 'uptime' 47 gündür kapanmamış bir makine gösterir; yük ortalamaları 0.12, 0.08, 0.05. 'ps' listesinde PID 1 'systemd'dir.",
        explain:
          "2.7 GiB'lik tamponun çoğu diskten okunmuş dosyaların önbelleğidir; gerektiğinde anında bırakılır, bu yüzden kullanılabilir sütunu boşu aşar. Yük ortalaması, son 1, 5 ve 15 dakikada ortalama kaç sürecin işlemci istediğidir: 0.12, dört çekirdekli bir makinede işlemcinin yüzde 3'ünün meşgul olduğu anlamına gelir. PID 1 her süreç ağacının köküdür.",
      },
      {
        title: "Süreç canvası: aynı anda kaç tane çalışır?",
        predict:
          "Başlangıçta init çalışıyor, bash hazır, nginx bekliyor. 'Yeni Süreç Oluştur'a üç kez basıp sonra 'Zamanlayıcıyı Çalıştır'a bir kez bassan Yeni, Hazır ve Çalışıyor sayıları ne olur? Çalışıyor hiç 2 olur mu?",
        do: "Sıfırla, sonra üç kez Yeni Süreç Oluştur'a bas; alttaki sayaçları oku. Ardından Zamanlayıcıyı Çalıştır'a art arda bas ve her tıklamada Çalışıyor ile Sonlandı sayaçlarını izle; canvas boşalana kadar tıklamaları say.",
        observe:
          "Üç yeni süreç önce Yeni'de birikir; ilk zamanlayıcı tıklamasında hepsi Hazır'a geçer. Çalışıyor hiçbir zaman 1'i aşmaz, bazen 0 olur. Sonlandı yalnızca bir tıklama boyunca 1 gösterir, sonraki tıklamada süreç silinir. Canvas çoğunlukla 10 ile 30 tıklama arasında boşalır; ortalama 18, ama her denemede farklı.",
        explain:
          "Simülasyonda tek işlemci var: zamanlayıcı her adımda Hazır kuyruğundan yalnızca bir süreç seçer. Geçişler zar atar: çalışan süreç yüzde 60 Hazır'a, yüzde 40 Bekliyor'a düşer; bekleyenlerin yarısı geri döner; seçilen süreç yüzde 20 olasılıkla biter. Bu yüzden toplam süre rastgeledir. Gerçek çekirdek zar atmaz ama belirsizlik gerçektir: bir sürecin ne zaman disk yanıtı bekleyeceğini önceden kimse bilemez.",
      },
    ],
  },
  wow: [
    {
      title: "500'de 500",
      body:
        "Dünyanın en hızlı 500 süperbilgisayarını sıralayan TOP500 listesinde Kasım 2017'den bu yana istisnasız her makine Linux çalıştırıyor. İlk Linux sistemi listeye 1998'de girmişti. Bir öğrencinin 10 bin satırlık hobisi, yirmi altı yılda milyarlarca dolarlık makinelerin tek ortak dili oldu; lisans ücreti sıfır, kaynak kodu herkese açık.",
    },
    {
      title: "Mars'ta uçan çekirdek",
      body:
        "19 Nisan 2021'de NASA'nın Ingenuity helikopteri Mars'ta başka bir gezegende yapılan ilk motorlu uçuşu gerçekleştirdi. Uçuş bilgisayarı, telefonlardakine benzer bir Snapdragon 801 işlemcisiydi ve üzerinde Linux koşuyordu; NASA'nın JPL laboratuvarı yazılımı açık kaynak olarak yayımladı. Beş uçuş için tasarlanan helikopter 72 uçuş yaptı.",
    },
    {
      title: "Bir tartışmanın otuz yıllık yankısı",
      body:
        "29 Ocak 1992'de Andrew Tanenbaum 'LINUX is obsolete' yazdığında Linux beş aylıktı. Tanenbaum tek parçalı çekirdeklerin öleceğini, 386 işlemcinin yakında unutulacağını söylüyordu. İkisi de olmadı: Linux hâlâ tek parçalı, x86 hâlâ masaüstünde. Ama Tanenbaum'un MINIX'i de ölmedi; 2015'ten beri her Intel işlemcisinin içindeki yönetim motorunda, kullanıcının haberi olmadan çalışıyor.",
    },
  ],
  worked: {
    title: "Dört sürecin bekleme süresi",
    prompt:
      "Sayfadaki Round-Robin simülasyonunda firefox 6, gcc 4, python 3, mysqld 5 dilim istiyor ve hepsi 0. anda hazır. Her sürecin bitiş ve bekleme süresini bul, ortalama bekleme süresini hesapla; sonra 'en kısa iş önce' sıralamasıyla karşılaştır. Bir dilim 10 ms olsun.",
    steps: [
      "Çizelgeyi yaz. Tur 1: firefox, gcc, python, mysqld (kare 1–4). Tur 2: aynı sıra (kare 5–8). Tur 3: aynı sıra (kare 9–12); python üçüncü dilimini 11. karede alır ve biter. Tur 4: firefox, gcc, mysqld (kare 13–15); gcc dördüncü dilimini 14. karede alır ve biter. Tur 5: firefox, mysqld (kare 16–17); mysqld 17. karede biter. Kare 18: firefox'un altıncı dilimi.",
      "Bitiş zamanlarını oku: python 11, gcc 14, mysqld 17, firefox 18 dilim. Toplam 18 dilim = 180 ms; bu, dört işin toplamıdır ve sıralamadan bağımsızdır.",
      "Bekleme = bitiş − kendi işlemci süresi: python 11 − 3 = 8, gcc 14 − 4 = 10, mysqld 17 − 5 = 12, firefox 18 − 6 = 12 dilim. Toplam 42 dilim, ortalama 42 / 4 = 10.5 dilim = 105 ms.",
      "Aynı işleri en kısadan uzuna sırayla tek seferde çalıştır (python, gcc, mysqld, firefox): beklemeler 0, 3, 7, 12 dilim; ortalama 22 / 4 = 5.5 dilim = 55 ms. Listedeki sırayla (firefox önce) ortalama 7.25 dilim olurdu.",
      "Yorumla: 'en kısa iş önce' ortalamayı neredeyse yarıya indirir ama iki kusuru vardır: her işin ne kadar süreceğini önceden bilmek gerekir ve uzun bir iş sürekli ertelenebilir. Round-Robin bilgi istemez ve kimseyi aç bırakmaz; adaletin fiyatı 50 ms.",
    ],
    result:
      "Round-Robin'de ortalama bekleme 10.5 dilim (105 ms), en kısa iş önce'de 5.5 dilim (55 ms). Toplam iş her iki durumda 18 dilimdir; zamanlayıcı işi hızlandırmaz, bekleyişi dağıtır.",
  },
  misconceptions: [
    {
      myth: "Linux bir işletim sistemidir; Ubuntu da Linux'un bir sürümüdür.",
      truth:
        "Linux yalnızca çekirdektir: işlemciyi, belleği ve aygıtları yöneten parça. Kabuk, derleyici, masaüstü ve paket yöneticisi başka projelerden gelir (çoğu GNU'dan). Debian, Ubuntu, Fedora gibi dağıtımlar aynı çekirdeği farklı araç ve ayarlarla paketler; aralarındaki fark çekirdekte değil, çevresindedir. Android da Linux çekirdeği kullanır ama GNU araçlarını kullanmaz.",
    },
    {
      myth: "RAM'in dolu görünmesi bilgisayarın yavaşladığını gösterir.",
      truth:
        "Linux boş belleği israf sayar ve diskten okuduklarını orada önbellekler. 'free' çıktısında 'boş' azken 'kullanılabilir' yüksekse sorun yoktur; önbellek bir program istediği an bırakılır. Asıl sıkışma belirtisi kullanılabilir alanın erimesi ve Swap'ın dolmaya başlamasıdır.",
    },
    {
      myth: "Dört program açıksa işlemci dördünü aynı anda çalıştırır.",
      truth:
        "Bir işlemci çekirdeği bir anda tek bir komut dizisi yürütür. Zamanlayıcı süreçleri milisaniyeler içinde değiştirdiği için hepsi akıyormuş gibi görünür. Sayfadaki süreç canvasında 'Çalışıyor' sayacının hiçbir zaman 1'i aşmaması bu yüzdendir. Çok çekirdekli işlemcilerde gerçek eşzamanlılık vardır, ama o da çekirdek sayısıyla sınırlıdır.",
    },
    {
      myth: "Bir program çökerse bilgisayar da çöker.",
      truth:
        "Kullanıcı alanındaki bir süreç kendi sanal bellek alanının dışına çıkamaz; hatalı bir adrese dokunduğunda işlemci çekirdeğe haber verir, çekirdek yalnızca o süreci sonlandırır. Bütün sistemi götüren çökme ancak Ring 0'da, yani çekirdek ya da bir aygıt sürücüsü hata yaptığında olur; Linux buna 'kernel panic' der.",
    },
  ],
  glossary: [
    { term: "Çekirdek (kernel)", definition: "İşletim sisteminin donanımı doğrudan yöneten, en yüksek yetkiyle çalışan parçası; Linux tam olarak budur." },
    { term: "Süreç (process)", definition: "Çalışmakta olan bir programın kimliği: kendi bellek alanı, açık dosyaları, durumu ve PID numarası vardır." },
    { term: "Sistem çağrısı (syscall)", definition: "Kullanıcı programının çekirdekten hizmet istediği tanımlı kapı; open, read, write, fork gibi." },
    { term: "Zaman dilimi (quantum)", definition: "Zamanlayıcının bir sürece kesintisiz verdiği en uzun işlemci süresi; dolunca süreç kuyruğun sonuna döner." },
    { term: "Bağlam değiştirme", definition: "İşlemcinin bir süreçten ötekine geçerken yazmaç ve bellek durumunu kaydedip yüklemesi; mikrosaniyeler sürer ama bedavaya değildir." },
    { term: "Kabuk (shell)", definition: "Yazdığın komutları okuyup süreçlere dönüştüren program; bash, zsh gibi. Grafik masaüstü de aynı işi düğmelerle yapar." },
    { term: "Dağıtım (distro)", definition: "Linux çekirdeğinin kabuk, kütüphane, paket yöneticisi ve uygulamalarla paketlenmiş hâli: Debian, Fedora, Arch gibi." },
    { term: "Sanal dosya sistemi", definition: "Diskte var olmayan, çekirdeğin okundukça ürettiği dosyalar; /proc ve /sys bunun örnekleridir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisans işletim sistemleri dersi bu sayfadaki dört parçayı derinleştirir. Zamanlayıcı bölümü öncelikli ve çok düzeyli kuyruklara, gerçek zamanlı sistemlerin teslim tarihlerine ve Linux'un süreçleri bir kırmızı-siyah ağaçta tutan CFS tasarımına uzanır. Bellek bölümü <strong>sayfalama</strong>ya dönüşür: 4 KiB'lik sayfalar, sayfa tabloları, işlemcideki TLB önbelleği ve bir sayfanın diske atılıp geri getirilmesi. Süreçlerin aynı anda aynı veriye dokunmasından doğan <strong>eşzamanlılık</strong> problemleri, kilitler, semaforlar ve dört koşulu aynı anda sağlanınca kaçınılmaz olan <strong>kilitlenme</strong> (deadlock), dersin en çok sınav sorusu çıkan kısmıdır. Dosya sistemleri kısmında ise ext4'ün inode yapısı ve günlükleme (journaling) sayesinde elektrik kesilince neden verinin bozulmadığı anlatılır.",
      "Linux'un çekirdeğindeki iki mekanizma, isim uzayları (namespaces) ve kontrol grupları (cgroups), 2013'te Docker ile <strong>konteyner</strong> devrimini başlattı: bir süreç kendi dosya ağacını, kendi ağını ve kendi PID 1'ini görür ama aynı çekirdeği paylaşır. Bulut bilişim bu fikrin üstüne kurulu. İşletim sistemi dersi aynı zamanda bilgisayar mimarisi, ağlar ve güvenlik derslerinin kesiştiği yerdir: Ring 0'a sızan bir kodun neden her şeye hükmettiğini, Meltdown ve Spectre gibi 2018'de duyurulan işlemci açıklarının neden tam olarak çekirdek-kullanıcı sınırını hedef aldığını burada anlarsın. MIT'nin 6.828 dersinde öğrenciler bu kavramları kendi mini çekirdeklerini yazarak öğrenir; sayfadaki süreç canvası o çekirdeğin ilk çizimidir.",
    ],
    topics: ["Süreç zamanlama: öncelik, CFS, gerçek zamanlı", "Sanal bellek ve sayfalama", "Eşzamanlılık, kilitler ve kilitlenme", "Dosya sistemleri ve günlükleme", "Konteynerler: namespaces ve cgroups", "Çekirdek güvenliği ve yan kanal saldırıları"],
  },
  quiz: [
    {
      question: "Aşağıdakilerden hangisi Linux'un kendisidir, yani çekirdek?",
      options: ["Ubuntu", "bash kabuğu", "Donanımı yöneten ve sistem çağrılarına cevap veren parça", "GNOME masaüstü"],
      answer: 2,
      explanation: "Linux yalnızca çekirdektir. Ubuntu bir dağıtım, bash bir kabuk, GNOME bir masaüstü ortamıdır; üçü de kullanıcı alanında, Ring 3'te çalışır ve çekirdekten sistem çağrılarıyla hizmet alır.",
    },
    {
      question: "Round-Robin simülasyonunda dört süreç toplam 18 dilim iş istiyor. Zamanlayıcı yöntemi değiştirilse (örneğin en kısa iş önce) hangisi değişir?",
      options: ["Toplam bitiş süresi azalır", "Toplam iş aynı kalır, bekleme süreleri değişir", "Her süreç daha hızlı çalışır", "Dilim sayısı 18'in altına iner"],
      answer: 1,
      explanation: "İşlemci bir anda tek süreç çalıştırır; 6 + 4 + 3 + 5 = 18 dilim her sıralamada 18 dilim sürer. Sıralama yalnızca kimin ne kadar beklediğini değiştirir: Round-Robin'de ortalama 10.5 dilim, en kısa iş önce'de 5.5 dilim.",
    },
    {
      question: "'free -h' çıktısında 'kullanılabilir' bellek neden 'boş' bellekten büyüktür?",
      options: ["Swap alanı eklenir", "Çekirdek ölçümde hata yapar", "Disk önbelleği gerektiğinde bırakılabildiği için kullanılabilir sayılır", "Kullanılan bellek iki kez sayılır"],
      answer: 2,
      explanation: "Linux boş RAM'i disk önbelleği olarak kullanır. Bu bellek 'tampon' sütununda görünür ama bir program istediği an serbest bırakılır; bu yüzden kullanılabilir = boş + geri alınabilir önbellek. Sayfada 8.1 GiB boşa karşılık 10 GiB kullanılabilir vardır.",
    },
  ],
  next: [
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Sistemleri ve Mimarisi", why: "Çekirdeğin yönettiği donanımın içi: işlem hattı, bellek hiyerarşisi ve Ring 0'ı mümkün kılan işlemci tasarımı." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "Bir sürecin sanal adres alanı (stack, heap, text) tek tek nasıl görünür; çökmelerin bellekteki kökü." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Hazır kuyruğu bir kuyruk, CFS bir ağaçtır; zamanlayıcının kullandığı yapıları yakından gör." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Çekirdek-kullanıcı sınırı güvenliğin temelidir; bu sınırın nasıl aşılmaya çalışıldığını öğren." },
  ],
  sources: [
    { title: "Wikipedia · History of Linux", url: "https://en.wikipedia.org/wiki/History_of_Linux", note: "Unix'ten GNU'ya, Torvalds'ın 1991 iletisinden GPL'e geçişe kadar tarihçe ve kaynak göndermeleri (İngilizce)." },
    { title: "Wikipedia · Round-robin scheduling", url: "https://en.wikipedia.org/wiki/Round-robin_scheduling", note: "Zaman dilimi, bağlam değiştirme maliyeti ve diğer zamanlama yöntemleriyle karşılaştırma." },
    { title: "Wikipedia · Filesystem Hierarchy Standard", url: "https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard", note: "Sayfadaki FHS ağacının resmî tanımı: her dizinin amacı ve standardın sürümleri." },
    { title: "MIT OCW · 6.828 Operating System Engineering", url: "https://ocw.mit.edu/courses/6-828-operating-system-engineering-fall-2012/", note: "Üniversite düzeyi: öğrencilerin kendi çekirdeğini yazdığı açık ders; ders notları ve laboratuvarlar (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
