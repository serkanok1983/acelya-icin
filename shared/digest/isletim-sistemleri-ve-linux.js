window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["isletim-sistemleri-ve-linux"] = {
  slug: "isletim-sistemleri-ve-linux",
  title: "İşletim Sistemi: Donanımı Paylaştıran Hakem",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Tek bir işlemci, yüzlerce program: hepsi aynı anda çalışıyormuş gibi görünür. Bu yanılsamayı kuran, belleği paylaştıran ve her şeyi dosyaya çeviren yazılıma işletim sistemi denir; Linux onun en çok kopyalanan örneğidir.",
  hook:
    "25 Ağustos 1991'de Helsinki'de 21 yaşında bir öğrenci bir tartışma grubuna şöyle yazdı: 'Ücretsiz bir işletim sistemi yapıyorum; yalnızca hobi, GNU gibi büyük ve profesyonel olmayacak.' Bugün dünyanın en hızlı 500 süperbilgisayarının 500'ü, Mars'ta uçmuş bir helikopter ve cebindeki Android telefon o hobinin üzerinde çalışıyor. Peki bir işletim sistemi tam olarak ne yapar ki bu kadar yere sığar?",
  bigIdea:
    "İşletim sistemi bir <strong>hakemdir</strong>: işlemciyi zaman dilimlerine, belleği sayfalara böler, aygıtları dosya gibi sunar; programlar donanıma doğrudan dokunamaz, yalnızca <em>sistem çağrısı</em> ile çekirdekten hizmet ister. Her şey paylaşılır, hiçbir şey birbirine karışmaz.",
  story: [
    "1969'da New Jersey'deki Bell Laboratuvarları'nda Ken Thompson'ın bir derdi vardı: yazdığı <em>Space Travel</em> adlı uzay oyunu büyük bilgisayarda oynandığında, Dennis Ritchie'nin sonradan anlattığına göre, bir oyun yaklaşık 75 dolarlık işlemci zamanı tutuyordu. Thompson oyunu köşede duran, az kullanılan bir PDP-7'ye taşıdı; makineyi böylece tanıdı ve ardından kâğıt üzerinde tasarladıkları dosya sistemini onun üzerinde gerçekledi. Kendi anlatımına göre eşi birkaç haftalığına seyahate çıkınca işi haftalara böldü: bir hafta çekirdek, bir hafta kabuk, bir hafta editör, bir hafta çevirici. Ortaya çıkan sisteme <strong>Unix</strong> adı verildi. 1973'te çekirdek, Ritchie'nin yeni dili <strong>C</strong> ile yeniden yazıldı; yüksek düzeyli bir dille yazılmış olması, birkaç yıl sonra Unix'in bambaşka makinelere taşınmasının yolunu açtı.",
    "Unix'in fikirleri yayıldı, ama kodu AT&amp;T'nin malıydı. 27 Eylül 1983'te Richard Stallman, kaynak kodunu herkesin okuyup değiştirebileceği özgür bir Unix benzeri yapma çağrısıyla <strong>GNU</strong> projesini duyurdu. Sonraki yıllarda derleyici (gcc), kabuk (bash), editör ve yüzlerce araç yazıldı; eksik kalan parça en zor olanıydı: çekirdek. 1987'de Andrew Tanenbaum, ders kitabıyla birlikte küçük bir eğitim işletim sistemi olan MINIX'i yayımladı. Helsinki Üniversitesi'nde bu kitabı okuyan Linus Torvalds, yeni 386 bilgisayarının yeteneklerini sonuna kadar kullanan kendi çekirdeğini yazmaya koyuldu. 17 Eylül 1991'de yayımladığı 0.01 sürümü yaklaşık 10 bin satırdı. Adını 'Freax' koymak istemişti; dosyaları sunucuya yükleyen Ari Lemmke dizine 'linux' adını verdi ve ad kaldı.",
    "29 Ocak 1992'de Tanenbaum aynı tartışma grubuna 'LINUX is obsolete' başlıklı bir ileti yazdı: tek parçalı (monolitik) çekirdek tasarımı eskimişti, gelecek mikro çekirdeklerindi. Torvalds sertçe cevap verdi; tartışma bugün hâlâ işletim sistemi derslerinde okutulur. Linux'un asıl gücü ise tasarımından çok lisansında çıktı: Torvalds 1992 başında çekirdeği, ticari dağıtımı yasaklayan kendi lisansından GNU'nun GPL lisansına geçirdi. GPL herkese kodu kullanma, değiştirme ve satma hakkı verir, tek şartla: değiştirdiğini dağıtıyorsan kaynağını da açacaksın. Mart 1994'te çıkan 1.0 sürümü yaklaşık 176 bin satırdı; GNU araçlarıyla birleşince tam bir işletim sistemi doğdu. Bugün çekirdek on milyonlarca satır koddur, her sürümüne binin çok üzerinde geliştirici katkı verir; sunucuların, Android telefonların, Raspberry Pi'lerin ve Kasım 2017'den beri dünyanın en hızlı 500 süperbilgisayarının tamamının altında o 'hobi' çalışır.",
  ],
  core: [
    {
      heading: "İki dünya: kullanıcı alanı ve çekirdek",
      body:
        "İşlemci her komutu aynı yetkiyle çalıştırmaz. x86 işlemcilerde dört yetki halkası vardır; Linux ikisini kullanır. Çekirdek <strong>Ring 0</strong>'da koşar ve her şeyi yapabilir: belleğin her yerini okur, diske yazar, ağ kartını kurar. Senin programların, tarayıcı ve oyun dahil, <strong>Ring 3</strong>'tedir; bir aygıta doğrudan dokunmaya kalkarsa işlemci komutu yürütmez, denetimi çekirdeğe verir. Programın bir dosyayı okumak istediğinde yaptığı tek şey bir <strong>sistem çağrısı</strong>dır: open, read, write, fork, mmap gibi birkaç yüz tanımlı kapıdan birini çalar, işlemci Ring 0'a geçer, çekirdek isteği denetleyip işi yapar, sonucu döndürür, işlemci Ring 3'e döner. Sayfadaki 'Çekirdek ve Kullanıcı Alanı' şeması tam bu kapıyı çizer. Bir program çöktüğünde bilgisayarın çökmemesinin sebebi budur: çöken şey Ring 3'te, kendi bellek alanının içinde ölür.",
      formula: "Ring 3 → sistem çağrısı → Ring 0 → sonuç → Ring 3",
      formulaNote: "Bu bir kip geçişidir; süreç değişmez. Gidiş-dönüş modern bir işlemcide kabaca yüz nanosaniye mertebesindedir: sıradan bir fonksiyon çağrısından onlarca kat pahalı. Programlar bu yüzden okuma ve yazmaları tamponlayıp toplu yapar.",
    },
    {
      heading: "Süreç: çalışan bir programın kimliği",
      body:
        "Diskteki program bir tariftir; çalışmaya başladığında <strong>süreç</strong> olur: kendi bellek alanı, kendi açık dosyaları ve bir kimlik numarası (PID) vardır. Sayfadaki süreç canvası beş durumu gösterir. <em>Yeni</em> süreç kabul edilince <em>Hazır</em> kuyruğuna girer; zamanlayıcı onu seçince <em>Çalışıyor</em> olur; zaman dilimi bitince Hazır'a döner; bir dosya ya da ağ yanıtı beklemesi gerekirse <em>Bekliyor</em>'a düşer ve işlemciyi hiç meşgul etmez; işi bitince <em>Sonlandı</em>. Sayfadaki terminalde 'ps' yazdığında gördüğün PID 1, 'systemd', açılışta çekirdeğin başlattığı ilk kullanıcı sürecidir; kullanıcı alanındaki bütün süreçler onun soyundan gelir. Unix'te yeni süreç yaratmanın yolu şaşırtıcı derecede yalındır: <code>fork</code> çağıran süreci kopyalar, <code>exec</code> kopyanın içine yeni programı yükler. Kabuk tam olarak bunu yapar: komutunu okur, fork, exec, bitmesini bekler, yeniden sorar.",
      formula: "kabuk döngüsü: oku → fork() → exec() → wait() → oku",
      formulaNote: "fork sonrası iki süreç aynı satırdan devam eder; aralarındaki fark fork'un döndürdüğü sayıdır: çocukta 0, ebeveynde çocuğun PID'si. Bellek hemen kopyalanmaz; sayfalar, biri yazana kadar paylaşılır (copy-on-write).",
    },
    {
      heading: "Zamanlayıcı: tek işlemci, çok süreç",
      body:
        "Bir işlemci çekirdeği bir anda yalnızca bir süreç çalıştırır. 'Aynı anda' müzik dinleyip yazı yazabilmen, zamanlayıcının süreçleri saniyede yüzlerce kez değiştirmesindendir. En yalın adil yöntem <strong>Round-Robin</strong>'dir: hazır süreçler bir kuyrukta durur, sıradaki süreç bir <strong>zaman dilimi</strong> (quantum) çalışır, bitmediyse kuyruğun sonuna döner. Sayfadaki simülasyon dört süreçle (firefox 6, gcc 4, python 3, mysqld 5 dilim) tam bunu yapar. Adalet bedava değildir: her değişimde çekirdek, çalışan sürecin yazmaçlarını kaydeder, yenisininkini yükler; buna <strong>bağlam değiştirme</strong> denir ve doğrudan maliyeti mikrosaniyeler mertebesindedir. Dilim çok kısa olursa zaman bağlam değiştirmeye gider, çok uzun olursa fare imleci takılır. Linux'un 2007'den beri kullandığı CFS sabit dilim dağıtmaz; her sürecin o ana dek aldığı işlemci süresini tutar ve en az almış olana sıra verir. 6.6 sürümüyle (2023) yerini, aynı adalet fikrine sanal son teslim zamanları ekleyen EEVDF aldı.",
      formula: "bekleme = bitiş − işlemci süresi;  yanıt = ilk çalışma − varış  (varış 0)",
      formulaNote: "Toplam iş değişmez: dört sürecin 6 + 4 + 3 + 5 = 18 dilimi hangi sırayla verilirse verilsin 18 dilim sürer; sıralama yalnızca kimin ne kadar beklediğini değiştirir.",
    },
    {
      heading: "Bellek: sanal adresler ve sayfalar",
      body:
        "Her sürece <strong>sanal bellek</strong> verilir: program kendini bütün adres alanının tek sahibi sanır. Çekirdek belleği sabit boylu <strong>sayfalara</strong> böler (x86-64'te tipik olarak 4 KiB); işlemcideki bellek yönetim birimi (MMU) her erişimde sanal adresin sayfa numarasını sürecin <strong>sayfa tablosundan</strong> fiziksel bir çerçeveye çevirir, adresin son 12 biti (2<sup>12</sup> = 4096) sayfa içindeki konum olarak aynen kalır. 48 bitlik bir sanal adres dört düzeyli bir tabloyla çözülür: her düzey 9 bit kullanır, yani 512 girişlik bir tablodur; 512 × 8 bayt tam bir sayfa eder. Sık kullanılan çevirileri TLB adlı küçük bir önbellek tutar. İki süreç aynı sanal adresi kullanır ama farklı çerçevelere düşer, birbirini göremez; eşlenmemiş bir adrese dokunan süreci çekirdek durdurur. RAM daralırsa çekirdek uzun süredir dokunulmamış sayfaları diske, takas alanına taşır. Artan RAM de boş bırakılmaz: Linux diskten okuduğu dosyaları <strong>sayfa önbelleğinde</strong> tutar ve bir program bellek isteyince onu bırakır.",
      formula: "48 bit = 9 + 9 + 9 + 9 + 12  →  2<sup>48</sup> B = 256 TiB",
      formulaNote: "Sayfadaki 15 GiB'lik makinede 15 · 2<sup>30</sup> / 2<sup>12</sup> = 3 932 160 fiziksel sayfa çerçevesi vardır. Terminalde 'cat /proc/cpuinfo' çıktısındaki '48 bits virtual' satırı bu adres genişliğidir.",
    },
    {
      heading: "Her şey bir dosyadır",
      body:
        "Unix'in en zarif kararı: klavye, disk, hatta çalışan süreçlerin bilgisi, hepsi dosya gibi açılır, okunur, yazılır. Böylece bir program yalnızca open, read, write bilerek pek çok şeyle konuşabilir; 'her şey' biraz abartıdır ama fikir budur. Sayfadaki <strong>FHS</strong> ağacı bu dünyanın haritasıdır: '/bin' temel komutlar, '/etc' ayarlar, '/home' kullanıcılar, '/var/log' günlükler. İki dizin özeldir: '/dev' aygıt dosyalarını tutar (örneğin '/dev/null', yazılan her şeyi yutan sanal bir delik), '/proc' ise diskte hiç yoktur; çekirdek sen okudukça 'cpuinfo' ya da 'meminfo' içeriğini o anda üretir. Dizinlerin düzenini standartlaştıran FHS sayesinde hemen her dağıtımda 'ls /' aynı iskeleti gösterir. Ev dizinindeki '.bashrc' gibi noktayla başlayan dosyaları gerçek 'ls' gizler ('ls -a' gösterir); sayfadaki basitleştirilmiş terminal ise hepsini listeler.",
      formula: "/ → bin, boot, dev, etc, home, lib, proc, usr, var …",
      formulaNote: "Windows'ta C:, D: gibi ayrı kökler vardır; Linux'ta tek kök '/' vardır, her disk bu ağacın bir dalına 'bağlanır' (mount).",
    },
  ],
  lab: {
    intro:
      "Sayfada dört oyun alanı var: tıklanabilir <strong>İşletim Sistemi Mimarisi</strong> katmanları, <strong>Yeni Süreç Oluştur</strong> / <strong>Zamanlayıcıyı Çalıştır</strong> / <strong>Sıfırla</strong> düğmeli süreç canvası, komut yazılan <strong>Linux Terminal Simülatörü</strong> ve <strong>1 Quantum İlerle</strong> / <strong>Otomatik</strong> / <strong>Sıfırla</strong> düğmeli Round-Robin zamanlayıcısı. Terminal yalnızca 'help' listesindeki komutları tanır ve çıktıları sabittir; ama bu sabit sayıların içinde gerçek Linux'un hesapları gizli. FHS ağacı, çekirdek şeması ve dağıtım kartları okunacak panellerdir.",
    experiments: [
      {
        title: "Round-Robin: kim önce biter, kaç kare çizilir?",
        predict:
          "firefox 6, gcc 4, python 3, mysqld 5 dilim istiyor. Her süreç sırayla bir dilim alırsa önce hangisi biter? Zaman çizelgesinde kaç renkli kare oluşur? Hangi tıklamada python kartı 'Tamam' yazar?",
        do: "Zamanlayıcıda Sıfırla'ya bas, sonra '1 Quantum İlerle'ye tek tek tıkla; her seferinde kartlardaki 'Hazır (n q)' sayılarını ve çizelgeye eklenen kareyi izle. Sonra Sıfırla ve Otomatik'e basıp kendiliğinden durana kadar geçen süreyi saatle ölç.",
        observe:
          "Kareler firefox, gcc, python, mysqld renginde dönerek dizilir. python üçüncü dilimini 11. karede alır, kartı 12. tıklamada 'Tamam' olur; gcc 15., mysqld 18. tıklamada, firefox 19. tıklamada 'Tamam' yazar. Çizelgede tam 18 kare vardır; 19. tıklama kare eklemez, yalnızca son kartı kapatır. Otomatik modda her adım 0.4 saniyedir: 19 adım yaklaşık 7.6 saniye sürer ve düğme kendiliğinden 'Otomatik'e döner.",
        explain:
          "Kuyruk sırası sabittir, dolu bir tur dört dilim harcar. Bir sürecin kartı, dilimi bittikten sonraki adımda güncellenir; 'Tamam' yazıları bu yüzden bitiş karesinden bir tıklama sonra gelir. Kısa işler önce biter, en uzun iş olan firefox en son, 18. karede tamamlanır: toplam iş 6 + 4 + 3 + 5 = 18 dilimdir ve hiçbir sıralama bunu değiştiremez. Çözümlü örnek aynı çizelgeden bekleme ve yanıt sürelerini çıkarır.",
      },
      {
        title: "df'nin yüzdesi neden tutmuyor?",
        predict:
          "Terminalde 'df -h' yazınca /dev/sda1 için Boyut 476G, Kullanılan 128G görünür. 128 / 476 kaç yüzde eder? Ekranda bu sayıyı mı göreceksin?",
        do: "Terminale 'df -h' yaz. Üç satırdaki Boyut, Kullanılan, Müsait ve %Kull değerlerini bir kâğıda al; ilk iki satır için Kullanılan + Müsait toplamını ve Kullanılan / (Kullanılan + Müsait) oranını hesapla.",
        observe:
          "128 / 476 = %26.9, ama ekran %29 der. 128 + 324 = 452, 476'dan 24G eksik. 128 / 452 = %28.3 çıkar; yukarı yuvarlanınca %29. İkinci disk için 892 / (892 + 812) = %52.3, ekranda %53.",
        explain:
          "Gerçek 'df' iki şey yapar: yüzdeyi toplam alana değil, kullanılan + sıradan kullanıcıya açık alana göre hesaplar ve sonucu yukarı yuvarlar. Kayıp 24G, ext4 dosya sisteminin varsayılan olarak root kullanıcısına ayırdığı yüzde 5'lik yedekle örtüşür: 476 × 0.05 ≈ 24. Bu yedek, disk sıradan kullanıcılar için 'tamamen dolduğunda' bile sistem servislerinin ve yöneticinin çalışabilmesi içindir. Terminalin sayıları sabittir, ama gerçek bir ext4 diskinde de aynı farkı görürsün.",
      },
      {
        title: "Boş bellekten çok 'kullanılabilir' bellek",
        predict:
          "'free -h' çıktısında 'boş' sütunu mu, 'kullanılabilir' sütunu mu daha büyük olacak? 'kullanılan + boş + tampon' toplamı 'toplam'ı tutar mı? Aynı sayıları çekirdek başka nerede söyler?",
        do: "Terminale 'free -h' yaz, Bellek satırındaki altı sayıyı oku ve 4.2 + 8.1 + 2.7 toplamını yap. Sonra 'cat /proc/meminfo' yaz; MemTotal, MemFree ve MemAvailable değerlerini 1 048 576'ya bölerek GiB'e çevir. Son olarak 'uptime' ve 'ps' çalıştırıp yük ortalamalarını ve PID 1'in adını not et.",
        observe:
          "4.2 + 8.1 + 2.7 = 15.0 GiB, toplamı tam tutar. Kullanılabilir (10 GiB) boştan (8.1 GiB) büyüktür. /proc/meminfo aynı sayıları kB olarak verir: 15 728 640 kB = 15.0 GiB, 8 493 466 kB = 8.1 GiB, 10 485 760 kB = 10.0 GiB; Buffers + Cached = 2 830 950 kB = 2.7 GiB. 'uptime' 47 gündür açık bir makine ve 0.12, 0.08, 0.05 yük ortalamaları gösterir; 'ps' listesinde PID 1 'systemd'dir.",
        explain:
          "'free' kendi başına ölçüm yapmaz; /proc/meminfo'yu okuyup biçimlendirir. 2.7 GiB'lik tamponun çoğu sayfa önbelleğidir; gerektiğinde bırakılabildiği için kullanılabilir sütunu boşu aşar. Toplamın tam tutması 'kullanılan'ın eski tanımından gelir (toplam − boş − tampon); procps'in güncel sürümleri onu toplam − kullanılabilir diye hesaplar, yeni bir dağıtımda toplam tutmayabilir. Yük ortalaması, son 1, 5 ve 15 dakikada çalışan ya da işlemci bekleyen görev sayısının ortalamasıdır: /proc/cpuinfo'daki dört çekirdekte 0.12, kabaca yüzde 3 meşguliyet demektir.",
      },
      {
        title: "Süreç canvası: aynı anda kaç tane çalışır?",
        predict:
          "Sıfırla'dan sonra 'Yeni Süreç Oluştur'a üç kez, ardından 'Zamanlayıcıyı Çalıştır'a bir kez bassan Yeni, Hazır ve Çalışıyor sayıları ne olur? Çalışıyor hiç 2 olur mu? Üç sürecin hepsi kaç tıklamada biter?",
        do: "Süreç canvasında Sıfırla'ya bas (bütün sayaçlar sıfırlanır), sonra üç kez Yeni Süreç Oluştur'a bas; alttaki sayaçları oku. Ardından Zamanlayıcıyı Çalıştır'a art arda bas ve her tıklamada Çalışıyor ile Sonlandı sayaçlarını izle; canvas boşalana kadar tıklamaları say. Deneyi birkaç kez yinele.",
        observe:
          "Üç yeni süreç (P1, P2, P3) önce Yeni'de birikir; ilk zamanlayıcı tıklamasında hepsi Hazır'a geçer ve biri seçilir. Çalışıyor hiçbir zaman 1'i aşmaz, bazen 0 olur. Sonlandı yalnızca bir tıklama boyunca 1 gösterir, sonraki tıklamada süreç silinir. Tıklama sayısı her denemede değişir: denemelerin yaklaşık dörtte üçünde 10 ile 30 arasındadır, ortancası 16, ortalaması 18 dolayındadır.",
        explain:
          "Simülasyonda tek işlemci var: zamanlayıcı her adımda Hazır'dan yalnızca bir süreç seçer. Geçişler zar atar: çalışan süreç yüzde 60 Hazır'a, yüzde 40 Bekliyor'a düşer; bekleyenlerin her biri yüzde 50 olasılıkla geri döner; seçilen süreç yüzde 20 olasılıkla biter. Üç bitiş için ortalama 3 / 0.2 = 15 'seçilme' gerekir; silme adımları ve kimsenin hazır olmadığı boş tıklamalar ortalamayı 18'e çıkarır. Gerçek çekirdek zar atmaz, ama belirsizlik gerçektir: bir sürecin ne zaman disk ya da ağ yanıtı bekleyeceğini önceden kimse bilemez.",
      },
    ],
  },
  wow: [
    {
      title: "500'de 500",
      body:
        "Dünyanın en hızlı 500 süperbilgisayarını sıralayan TOP500 listesinde Kasım 2017'den bu yana istisnasız her makine Linux çalıştırıyor. İlk Linux sistemi listeye 1998'de girmişti. Bir öğrencinin 10 bin satırlık hobisi, yirmi altı yılda dünyanın en pahalı makinelerinin ortak dili oldu; lisans ücreti sıfır, kaynak kodu herkese açık.",
    },
    {
      title: "Mars'ta uçan çekirdek",
      body:
        "19 Nisan 2021'de NASA'nın Ingenuity helikopteri Mars'ta, başka bir gezegendeki ilk motorlu ve denetimli uçuşu yaptı. Uçuş bilgisayarı, telefonlardakine benzer bir Snapdragon 801 işlemcisiydi ve üzerinde Linux koşuyordu; uçuş yazılımının çatısı olan F Prime'ı NASA'nın JPL laboratuvarı açık kaynak olarak yayımlamıştı. En çok beş deneme uçuşu için tasarlanan helikopter 72 uçuş yaptı.",
    },
    {
      title: "Bir tartışmanın otuz yıllık yankısı",
      body:
        "29 Ocak 1992'de Andrew Tanenbaum 'LINUX is obsolete' yazdığında Linux beş aylıktı. Tanenbaum tek parçalı çekirdeği 1970'lere dönüş sayıyor, tasarımın Intel 386'ya bağlı kalmasını da hata buluyordu. Otuz yıl sonra Linux hâlâ tek parçalı ve yirmi kadar işlemci mimarisinde çalışıyor. Ama mikro çekirdek fikri de ölmedi: 2017'de ortaya çıktı ki Intel, 2015'ten sonraki yonga setlerinin içindeki yönetim motorunda MINIX 3'ün bir uyarlamasını çalıştırıyordu.",
    },
  ],
  worked: {
    title: "Dört sürecin bekleme ve yanıt süresi",
    prompt:
      "Sayfadaki Round-Robin simülasyonunda firefox 6, gcc 4, python 3, mysqld 5 dilim istiyor ve hepsi 0. anda hazır. Bir dilim 10 ms olsun. Round-Robin için ortalama bekleme ve ortalama yanıt süresini bul; sonra aynı işleri 'en kısa iş önce' (SJF) ve 'ilk gelen önce' (FCFS, listedeki sırayla) yöntemleriyle karşılaştır.",
    steps: [
      "Çizelgeyi yaz. Tur 1–3: firefox, gcc, python, mysqld (kare 1–12); python üçüncü dilimini 11. karede alır ve biter. Tur 4: firefox, gcc, mysqld (kare 13–15); gcc 14. karede biter. Sonra firefox, mysqld (kare 16–17); mysqld 17. karede biter. Kare 18: firefox'un altıncı dilimi. Bitişler: python 11, gcc 14, mysqld 17, firefox 18.",
      "Bekleme = bitiş − kendi işlemci süresi: python 11 − 3 = 8, gcc 14 − 4 = 10, mysqld 17 − 5 = 12, firefox 18 − 6 = 12 dilim. Ortalama 42 / 4 = 10.5 dilim = 105 ms.",
      "SJF (python, gcc, mysqld, firefox; her iş kesintisiz): beklemeler 0, 3, 7, 12; ortalama 22 / 4 = 5.5 dilim = 55 ms. FCFS (firefox, gcc, python, mysqld): 0, 6, 10, 13; ortalama 29 / 4 = 7.25 dilim. SJF'nin ortalama beklemeyi en aza indirdiği kanıtlanabilir: uzun bir işi kısa bir işin önüne almak, arkada bekleyenlerin toplamını her zaman büyütür.",
      "Yanıt süresi = ilk kez işlemciye çıkış anı. Round-Robin'de 0, 1, 2, 3 dilim: ortalama 1.5 dilim = 15 ms. SJF'de yanıt beklemeye eşittir: ortalama 55 ms, firefox ilk kez 120 ms sonra kıpırdar. FCFS'de ortalama 72.5 ms.",
      "Yorumla: SJF ortalama beklemede en iyisidir ama iki kusuru vardır: her işin süresini önceden bilmek gerekir ve kısa işler geldikçe uzun bir iş sürekli ertelenebilir. Round-Robin bilgi istemez, kimseyi aç bırakmaz ve herkese 30 ms içinde ilk yanıtı verir; bedeli ortalama beklemenin 50 ms uzaması ve 3 yerine 17 bağlam değiştirmedir. Her değişim birkaç mikrosaniye tutsa bile 180 ms'lik işin yanında bu kayıp binde birin altındadır.",
    ],
    result:
      "Ortalama bekleme: Round-Robin 105 ms, FCFS 72.5 ms, SJF 55 ms. Ortalama yanıt: Round-Robin 15 ms, SJF 55 ms. Toplam iş her durumda 18 dilimdir; zamanlayıcı işi hızlandırmaz, bekleyişi dağıtır. Etkileşimli sistemler bu yüzden beklemeyi değil yanıtı öne alır.",
  },
  misconceptions: [
    {
      myth: "Linux bir işletim sistemidir; Ubuntu da Linux'un bir sürümüdür.",
      truth:
        "Dar anlamıyla Linux yalnızca çekirdektir: işlemciyi, belleği ve aygıtları yöneten parça. Kabuk, derleyici, masaüstü ve paket yöneticisi başka projelerden gelir (temel araçların çoğu GNU'dan). Debian, Ubuntu, Fedora gibi dağıtımlar aynı çekirdeği farklı araç ve ayarlarla paketler; aralarındaki fark çekirdekte değil, çevresindedir. Android de Linux çekirdeği kullanır ama GNU araçlarını kullanmaz.",
    },
    {
      myth: "RAM'in dolu görünmesi bilgisayarın yavaşladığını gösterir.",
      truth:
        "Linux boş belleği israf sayar ve diskten okuduklarını orada önbellekler. 'free' çıktısında 'boş' azken 'kullanılabilir' yüksekse sorun yoktur; önbellek bir program istediği an bırakılır. Asıl sıkışma belirtisi kullanılabilir alanın erimesi ve takas alanının (Swap) hızla dolup boşalmasıdır.",
    },
    {
      myth: "Dört program açıksa işlemci dördünü aynı anda çalıştırır.",
      truth:
        "Bir işlemci çekirdeği bir anda tek bir komut dizisi yürütür. Zamanlayıcı süreçleri milisaniyeler içinde değiştirdiği için hepsi akıyormuş gibi görünür. Sayfadaki süreç canvasında 'Çalışıyor' sayacının hiçbir zaman 1'i aşmaması bu yüzdendir. Çok çekirdekli işlemcilerde gerçek eşzamanlılık vardır, ama o da çekirdek sayısıyla sınırlıdır.",
    },
    {
      myth: "Bir program çökerse bilgisayar da çöker.",
      truth:
        "Kullanıcı alanındaki bir süreç kendi sanal bellek alanının dışına çıkamaz; eşlenmemiş bir adrese dokunduğunda işlemci denetimi çekirdeğe verir, çekirdek yalnızca o süreci sonlandırır. Bütün sistemi götüren çökme, hata Ring 0'da, yani çekirdekte ya da bir aygıt sürücüsünde olduğunda yaşanır; Linux buna 'kernel panic' der.",
    },
  ],
  glossary: [
    { term: "Çekirdek (kernel)", definition: "İşletim sisteminin donanımı doğrudan yöneten, en yüksek yetkiyle çalışan parçası; Linux dar anlamıyla budur." },
    { term: "Süreç (process)", definition: "Çalışmakta olan bir program: kendi sanal bellek alanı, açık dosyaları, durumu ve PID numarası vardır." },
    { term: "Sistem çağrısı (syscall)", definition: "Kullanıcı programının çekirdekten hizmet istediği tanımlı kapı; open, read, write, fork gibi." },
    { term: "Zaman dilimi (quantum)", definition: "Zamanlayıcının bir sürece kesintisiz verdiği en uzun işlemci süresi; dolunca süreç kuyruğun sonuna döner." },
    { term: "Bağlam değiştirme", definition: "İşlemcinin bir süreçten ötekine geçerken yazmaçları ve adres alanını kaydedip yüklemesi; mikrosaniyeler sürer, bedavaya gelmez." },
    { term: "Sayfa (page)", definition: "Sanal belleğin sabit boylu birimi, tipik olarak 4 KiB; sayfa tablosu her sanal sayfayı bir fiziksel çerçeveye eşler." },
    { term: "Dağıtım (distro)", definition: "Linux çekirdeğinin kabuk, kütüphane, paket yöneticisi ve uygulamalarla paketlenmiş hâli: Debian, Fedora, Arch gibi." },
    { term: "Sanal dosya sistemi", definition: "Diskte yer kaplamayan, içeriğini çekirdeğin okundukça ürettiği dosyalar; /proc ve /sys bunun örnekleridir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisans İşletim Sistemleri dersi bu sayfadaki dört parçayı derinleştirir. Zamanlayıcı bölümü öncelikli ve çok düzeyli geri beslemeli kuyruklara, gerçek zamanlı sistemlerin teslim tarihlerine ve Linux'un çalıştırılabilir görevleri bir kırmızı-siyah ağaçta tutan tasarımına uzanır; çözümlü örnekteki bekleme-yanıt ödünleşimi dersin ilk sayısal sorusudur. Bellek bölümü <strong>sayfalama</strong>yı açar: çok düzeyli sayfa tabloları, TLB, sayfa hatası ve hangi sayfanın diske atılacağını seçen yer değiştirme algoritmaları. Süreçlerin aynı veriye aynı anda dokunmasından doğan <strong>eşzamanlılık</strong> problemleri, kilitler, semaforlar ve ancak dört koşul (karşılıklı dışlama, tut-ve-bekle, elinden alınamama, döngüsel bekleme) birlikte sağlandığında ortaya çıkabilen <strong>kilitlenme</strong> (deadlock), dersin en çok sınav sorusu çıkan kısmıdır. Dosya sistemleri kısmında ise inode yapısı ve günlükleme (journaling) sayesinde elektrik kesildiğinde dosya sisteminin neden tutarlı kaldığı anlatılır.",
      "Linux çekirdeğindeki iki mekanizma, isim uzayları (namespaces) ve kontrol grupları (cgroups), 2013'te Docker ile yaygınlaşan <strong>konteynerlerin</strong> temelidir: bir süreç kendi dosya ağacını, kendi ağını ve kendi PID 1'ini görür ama öbürleriyle aynı çekirdeği paylaşır. İşletim sistemi dersi aynı zamanda Bilgisayar Mimarisi, Bilgisayar Ağları ve güvenlik derslerinin kesiştiği yerdir: Ring 0'a sızan bir kodun neden her şeye hükmettiğini, 2018'de duyurulan Meltdown ve Spectre açıklarının neden tam çekirdek-kullanıcı sınırını hedef aldığını burada anlarsın. MIT'nin açık 6.828 dersinde öğrenciler bu kavramları C ile küçük bir işletim sistemi yazarak öğrenir; fork, sayfa tablosu ve zamanlayıcı orada birer ödevdir.",
    ],
    topics: ["Süreç zamanlama: MLFQ, CFS/EEVDF, gerçek zamanlı", "Sanal bellek, sayfa tabloları ve TLB", "Eşzamanlılık, kilitler ve kilitlenme", "Dosya sistemleri: inode ve günlükleme", "Konteynerler: namespaces ve cgroups", "Çekirdek güvenliği ve yan kanal saldırıları"],
  },
  quiz: [
    {
      question: "Bir sistemde zaman dilimi 10 ms, bir bağlam değiştirme 10 µs sürüyor. Dilim 100 µs'ye indirilirse işlemci zamanının yaklaşık ne kadarı bağlam değiştirmeye gider?",
      options: ["Binde biri; değişmez", "Yüzde 1", "Yüzde 9", "Yüzde 50"],
      answer: 2,
      explanation: "Her dilimin ardından bir değişim gelir: kayıp oranı değişim / (dilim + değişim). 10 ms'lik dilimde 10 / 10 010 ≈ binde 1; 100 µs'lik dilimde 10 / 110 ≈ yüzde 9. Dilimi yüz kat kısaltmak yanıtı hızlandırır ama boşa giden zamanı kabaca yüz kat büyütür; zamanlayıcı tasarımı bu ikisi arasındaki dengedir.",
    },
    {
      question: "Round-Robin simülasyonunda dört süreç toplam 18 dilim iş istiyor. Zamanlayıcı yöntemi değiştirilse (örneğin en kısa iş önce) hangisi değişir?",
      options: ["Son işin bittiği an öne gelir", "Toplam iş aynı kalır, bekleme ve yanıt süreleri değişir", "Her süreç daha hızlı çalışır", "Dilim sayısı 18'in altına iner"],
      answer: 1,
      explanation: "İşlemci bir anda tek süreç çalıştırır; 6 + 4 + 3 + 5 = 18 dilim her sıralamada 18 dilim sürer (bağlam değiştirme bedeli sayılmazsa). Sıralama yalnızca kimin ne kadar beklediğini değiştirir: ortalama bekleme Round-Robin'de 10.5, en kısa iş önce'de 5.5 dilim; ortalama yanıt ise Round-Robin'de 1.5, en kısa iş önce'de 5.5 dilimdir.",
    },
    {
      question: "'free -h' çıktısında 'kullanılabilir' bellek neden 'boş' bellekten büyüktür?",
      options: ["Swap alanı eklenir", "Çekirdek ölçümde hata yapar", "Disk önbelleği gerektiğinde bırakılabildiği için kullanılabilir sayılır", "Kullanılan bellek iki kez sayılır"],
      answer: 2,
      explanation: "Linux boş RAM'i sayfa önbelleği olarak kullanır. Bu bellek 'tampon' sütununda görünür ama bir program istediği an bırakılabilir; kullanılabilir sütunu, boş belleğe geri alınabilir önbelleği ekleyen bir çekirdek kestirimidir. Sayfada 8.1 GiB boşa karşılık 10 GiB kullanılabilir vardır.",
    },
  ],
  next: [
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Sistemleri ve Mimarisi", why: "Çekirdeğin yönettiği donanımın içi: Von Neumann mimarisi, işlem hattı ve önbellekten diske uzanan bellek hiyerarşisi." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "Bir sürecin adres alanı içeriden nasıl görünür: yığın çerçeveleri, öbek, sızıntı ve çökmelerin bellekteki kökü." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Hazır kuyruğu bir kuyruk, zamanlayıcının görev ağacı bir arama ağacıdır; kuyruk, ikili arama ağacı ve heap'i canlı izle." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Çekirdek-kullanıcı sınırı güvenliğin temelidir; parola, şifreleme, güvenlik duvarı kuralları ve saldırı sözlüğüyle devam et." },
  ],
  sources: [
    { title: "Wikipedia · History of Linux", url: "https://en.wikipedia.org/wiki/History_of_Linux", note: "Unix'ten GNU'ya, Torvalds'ın 25 Ağustos 1991 iletisinden 0.01 sürümüne ve GPL'e geçişe kadar tarihçe (İngilizce)." },
    { title: "Wikipedia · Round-robin scheduling", url: "https://en.wikipedia.org/wiki/Round-robin_scheduling", note: "Zaman dilimi, açlık yaşatmama özelliği ve sayısal bir çizelge örneği (İngilizce)." },
    { title: "Wikipedia · Filesystem Hierarchy Standard", url: "https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard", note: "Sayfadaki FHS ağacının dayandığı standart: her dizinin amacı ve standardın sürümleri (İngilizce)." },
    { title: "MIT OCW · 6.828 Operating System Engineering", url: "https://ocw.mit.edu/courses/6-828-operating-system-engineering-fall-2012/", note: "İleri düzey: öğrencilerin C ile küçük bir işletim sistemi yazdığı açık ders; ders notları ve laboratuvarlar (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
