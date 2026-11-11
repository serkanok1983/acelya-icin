window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["isletim-sistemleri-ve-linux"] = {
  slug: "isletim-sistemleri-ve-linux",
  title: "İşletim Sistemi: Donanımı Paylaştıran Hakem",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Tek işlemci, sınırlı bellek, ortak bir sayaç, tek bir disk: işletim sistemi dördünü de paylaştırır. Bekleyişi, sayfa hatalarını, kaybolan güncellemeleri ve inode'ları say; her sayıyı kuramıyla karşılaştır.",
  hook:
    "25 Ağustos 1991'de Helsinki'de 21 yaşında bir öğrenci bir tartışma grubuna şöyle yazdı: 'Ücretsiz bir işletim sistemi yapıyorum; yalnızca hobi, GNU gibi büyük ve profesyonel olmayacak.' Bugün dünyanın en hızlı 500 süperbilgisayarının 500'ü, Mars'ta uçmuş bir helikopter ve cebindeki Android telefon o hobinin üzerinde çalışıyor. Peki bir işletim sistemi tam olarak ne yapar ki bu kadar yere sığar?",
  bigIdea:
    "İşletim sistemi bir <strong>hakemdir</strong>: işlemciyi zaman dilimlerine, belleği sayfalara böler, ortak veriyi kilitlerle korur, diski adlar ve inode'larla düzenler; programlar donanıma doğrudan dokunamaz, yalnızca <em>sistem çağrısı</em> ile çekirdekten hizmet ister.",
  story: [
    "1969'da New Jersey'deki Bell Laboratuvarları'nda Ken Thompson'ın bir derdi vardı: yazdığı <em>Space Travel</em> adlı uzay oyunu büyük bilgisayarda oynandığında, Dennis Ritchie'nin sonradan anlattığına göre, bir oyun yaklaşık 75 dolarlık işlemci zamanı tutuyordu. Thompson oyunu köşede duran, az kullanılan bir PDP-7'ye taşıdı; makineyi böylece tanıdı ve ardından kâğıt üzerinde tasarladıkları dosya sistemini onun üzerinde gerçekledi. Kendi anlatımına göre eşi birkaç haftalığına seyahate çıkınca işi haftalara böldü: bir hafta çekirdek, bir hafta kabuk, bir hafta editör, bir hafta çevirici. Ortaya çıkan sisteme <strong>Unix</strong> adı verildi. 1973'te çekirdek, Ritchie'nin yeni dili <strong>C</strong> ile yeniden yazıldı; yüksek düzeyli bir dille yazılmış olması, birkaç yıl sonra Unix'in bambaşka makinelere taşınmasının yolunu açtı.",
    "Unix'in fikirleri yayıldı, ama kodu AT&amp;T'nin malıydı. 27 Eylül 1983'te Richard Stallman, kaynak kodunu herkesin okuyup değiştirebileceği özgür bir Unix benzeri yapma çağrısıyla <strong>GNU</strong> projesini duyurdu. Sonraki yıllarda derleyici (gcc), kabuk (bash), editör ve yüzlerce araç yazıldı; eksik kalan parça en zor olanıydı: çekirdek. 1987'de Andrew Tanenbaum, ders kitabıyla birlikte küçük bir eğitim işletim sistemi olan MINIX'i yayımladı. Helsinki Üniversitesi'nde bu kitabı okuyan Linus Torvalds, yeni 386 bilgisayarının yeteneklerini sonuna kadar kullanan kendi çekirdeğini yazmaya koyuldu. 17 Eylül 1991'de yayımladığı 0.01 sürümü yaklaşık 10 bin satırdı. Adını 'Freax' koymak istemişti; dosyaları sunucuya yükleyen Ari Lemmke dizine 'linux' adını verdi ve ad kaldı.",
    "29 Ocak 1992'de Tanenbaum aynı tartışma grubuna 'LINUX is obsolete' başlıklı bir ileti yazdı: tek parçalı (monolitik) çekirdek tasarımı eskimişti, gelecek mikro çekirdeklerindi. Torvalds sertçe cevap verdi; tartışma bugün hâlâ işletim sistemi derslerinde okutulur. Linux'un asıl gücü ise tasarımından çok lisansında çıktı: Torvalds 1992 başında çekirdeği, ticari dağıtımı yasaklayan kendi lisansından GNU'nun GPL lisansına geçirdi. GPL herkese kodu kullanma, değiştirme ve satma hakkı verir, tek şartla: değiştirdiğini dağıtıyorsan kaynağını da açacaksın. Mart 1994'te çıkan 1.0 sürümü yaklaşık 176 bin satırdı; GNU araçlarıyla birleşince tam bir işletim sistemi doğdu. Bugün çekirdek on milyonlarca satır koddur, her sürümüne binin çok üzerinde geliştirici katkı verir; sunucuların, Android telefonların, Raspberry Pi'lerin ve Kasım 2017'den beri dünyanın en hızlı 500 süperbilgisayarının tamamının altında o 'hobi' çalışır.",
  ],
  core: [
    {
      heading: "İki kip, tek kapı: sistem çağrısı",
      body:
        "İşlemci her komutu aynı yetkiyle çalıştırmaz. x86 işlemcilerde dört yetki halkası vardır; Linux ikisini kullanır. Çekirdek <strong>Ring 0</strong>'da koşar ve bütün donanıma erişir. Senin programların, tarayıcı da kabuk da, <strong>Ring 3</strong>'tedir: yalnızca kendi adres alanına dokunabilir. Bir dosyayı okumak isteyen program <strong>sistem çağrısı</strong> yapar: open, read, write gibi birkaç yüz tanımlı kapıdan birini çalar, işlemci çekirdek kipine geçer, çekirdek isteği denetleyip yerine getirir ve aynı sürece döner. Dördüncü sekmedeki 'Son komut çekirdeğe kaç kez girdi?' paneli bu kapıyı sayar: model kabukta <code>ls</code> 9 çağrı ve 17 kip geçişi, <code>cd odev</code> ise tek bir chdir çağrısı ve 2 kip geçişi gösterir. Fark, Unix'in süreç yaratma biçiminden gelir: kabuk <code>ls</code> için kendini kopyalar (clone), kopya programı yükler (execve), kabuk onun bitmesini bekler (wait4). <code>cd</code> ayrı bir program olamaz, çünkü çalışma dizini sürece aittir; çocuğun dizin değiştirmesi kabuğu etkilemezdi. Bir program çöktüğünde bilgisayarın çökmemesi de aynı sınırın sonucudur: çöken şey Ring 3'te, kendi adres alanının içinde ölür. Paneldeki liste bir modeldir, gerçek bir izleme çıktısı değildir; gerçek bir program kitaplık yüklemek için çok daha fazla çağrı yapar.",
      formula: "kip geçişi = 2 × (sistem çağrısı sayısı) − (geri dönmeyen exit_group)<br>ls: 2 × 9 − 1 = 17",
      formulaNote: "Bu gidiş dönüş bir kip geçişidir; süreç değişmediği için bağlam değiştirme sayılmaz. Bağlam değiştirme, zamanlayıcının işlemciyi bir süreçten alıp başkasına vermesidir ve çok daha pahalıdır. Bir sistem çağrısı buna yol açabilir (wait4 kabuğu uyutur, işlemci çocuğa geçer), ama ikisi aynı şey değildir.",
    },
    {
      heading: "Zamanlayıcı: aynı iş, başka bekleyiş",
      body:
        "Bir işlemci çekirdeği bir anda tek süreç çalıştırır; sırayı zamanlayıcı verir ve neyi ölçtüğüne göre 'iyi' değişir: <strong>bekleme</strong> (hazırken işlemciyi alamadığı süre), <strong>dönüş</strong> (varıştan bitişe), <strong>yanıt</strong> (varıştan ilk çalışmaya). İlk sekmenin 'Ders kitabı dörtlüsü'nde ortalama bekleme FCFS ile 8,75, SJF ile 7,75, kesintili SRTF ile 6,50, Round Robin (q = 2) ile 12,75 birimdir; ortalama yanıt ise Round Robin'de 2,00, FCFS'de 8,75 birimdir. Round Robin'in erken söz hakkının bedeli 3 yerine 12 <strong>bağlam değiştirme</strong>dir. Süreçlerin hepsi aynı anda hazırsa sıranın i. işi, arkasındaki n − i işi kendi süresi kadar bekletir; komşu iki işten kısasını öne almak toplamı hiçbir zaman büyütmez. Eş varışta SJF'nin en iyi kesintisiz sıra olduğunun kanıtı budur; sayfa n! sırayı deneyerek sınar. Öncelikli zamanlamanın riski <strong>açlık</strong>tır (küçük değer daha önceliklidir): 'Açlık' kümesinde önceliği 2 olan P1, önceliği 0 olan beşer birimlik beş iş peş peşe geldiği için 25 birim bekler. <strong>Yaşlandırma</strong> bekleyenin öncelik değerini her 'adım' birimde 1 düşürür; P1 0'a inince ilk karar anında işlemciyi alır. Adım 1–2 iken bekleme 5'e, 3–5 iken 10'a, 6–7 iken 15'e, 8–10 iken 20 birime iner.",
      formula: "bekleme = bitiş − varış − işlem<br>dönüş = bitiş − varış,  yanıt = ilk çalışma − varış<br>eş varış: ort. bekleme = (1/n) Σ (n − i)·t<sub>i</sub>",
      formulaNote: "t<sub>i</sub>, sıranın i. işinin süresidir. Konvoy kümesinde geliş sırası (20, 3, 3): (2·20 + 1·3)/3 = 14,33 birim; kısadan uzuna (3, 3, 20): (2·3 + 1·3)/3 = 3,00 birim. Sayfada zaman birimsizdir: bir birim bir saat vuruşudur.",
    },
    {
      heading: "Sanal bellek: sayfa numarası değişir, ofset kalır",
      body:
        "Her sürece <strong>sanal bellek</strong> verilir: program kendini bütün adres alanının tek sahibi sanır. Bellek sabit boylu <strong>sayfalara</strong> bölünür ve her erişimde adres ikiye ayrılır. Düşük bitler sayfa içindeki konumdur (ofset), çeviride aynen kalır; yüksek bitler sayfa numarasıdır ve <strong>sayfa tablosunda</strong> bir çerçeve numarasıyla değiştirilir. İkinci sekmedeki model 16 bitlik adres ve tek düzeyli bir tablo kullanır: 4 KiB sayfada 1234 (onaltılık) adresi sayfa 1, ofset 0x234 eder; tablo sayfa 1'i çerçeve 8'e eşlediği için fiziksel adres 0x8234 olur. Eşlenmemiş bir adres (örneğin 0234) 'eşlenmemiş · sayfa hatası' verir. Gerçek x86-64'te 48 bitlik adres dört düzeyde çözülür; her düzey 9 bit kullanır. Her erişimde tabloya gitmek pahalı olacağından son çeviriler <strong>TLB</strong> adlı küçük bir önbellekte tutulur. Modeldeki süreler öğretim değeridir (TLB araması 1 ns, bellek erişimi 100 ns), ama ders gerçektir: 64 baytlık adımlarla sıralı taramada 4 girişli TLB 98,44 % isabet eder, etkin erişim süresi 102,56 ns olur; aynı TLB'ye 5 sayfalık bir döngü verirsen isabet 0,00 %'a iner, süre 201,00 ns'ye çıkar. Döngüyü 4 sayfaya indir: 99,90 %. Belirleyici olan, bellek miktarı kadar, programın belleğe hangi düzende dokunduğudur.",
      formula: "sanal adres = sayfa no × 2<sup>k</sup> + ofset  →  fiziksel adres = çerçeve × 2<sup>k</sup> + ofset<br>t<sub>etkin</sub> = t<sub>TLB</sub> + t<sub>bellek</sub> + (ıska oranı) × t<sub>bellek</sub>",
      formulaNote: "k ofsetin bit sayısıdır (4 KiB için 12). Sıralı taramada her sayfanın yalnızca ilk erişimi ıskadır: ıska oranı = adım / sayfa boyutu = 64/4096, süre 1 + 100 + 0,015625 × 100 = 102,56 ns. Disk kaynaklı sayfa hatalarının süresi ve çok düzeyli tablolar modelde yoktur.",
    },
    {
      heading: "Yarış ve kilitlenme: sonuç sıraya kalırsa",
      body:
        "<code>sayaç = sayaç + 1</code> tek adım değildir: değeri yazmaca yükle, yazmaçta bir artır, geri yaz. Zamanlayıcı araya girer de iki iş parçacığı aynı eski değeri yüklerse ikisi de aynı sonucu yazar, artırmalardan biri kaybolur: <strong>yarış durumu</strong>. Çare, <strong>kritik bölge</strong>ye tek iş parçacığı sokan kilittir (mutex); o da yeni bir tehlike getirir. Edsger Dijkstra'nın 1965'te sınav sorusu olarak kurduğu, Tony Hoare'un filozoflarla anlattığı problemde herkes önce solundaki çatalı alırsa beş filozof beş çatalı tutar ve hepsi sağındakini bekler: <strong>kilitlenme</strong>. Bu kuralla erişilebilen 573 durumdan yalnızca 1'i kilitlenmedir; yine de 200 rastgele adımda 1 000 çalıştırmanın 967'si o duruma düşer (kesin: 96,03 %). Coffman'ın 1971'de sıraladığı dört koşul (karşılıklı dışlama, tut ve bekle, geri alınamama, döngüsel bekleme) kilitlenme için <em>gereklidir</em>: biri kırılırsa kilitlenme olamaz. Herkese önce küçük numaralı çatalı aldırmak döngüsel beklemeyi kırar: 534 erişilebilir durum, 0 kilitlenme. Tek örnekli kaynaklarda (çatallar) döngü kilitlenmenin kendisidir. Genelde ise dört koşul <em>yeterli değildir</em>: bir kaynaktan birden çok örnek varsa çizgedeki döngü bile yetmez, Banker tablosundaki gibi bir güvenlik sınaması gerekir.",
      formula: "yükle: r ← sayaç;  artır: r ← r + 1;  yaz: sayaç ← r<br>K = 1 için  P(doğru sonuç) = (1 − p)²",
      formulaNote: "p, modeldeki zamanlayıcının her adımdan sonra öteki iş parçacığına geçme olasılığıdır. Tek artırmada sonuç ancak ilk başlayan, üç adımını bölünmeden bitirirse doğru çıkar: p = 0,50 için 25,00 %, p = 0,05 için 90,25 %; K'yi 1 yapıp 'Doğru sonuç olasılığı · kesin' kartında sına. K ≥ 2 için kapalı formül bu kadar yalın değildir; sayfa olasılığı durum uzayından hesaplar. Bunlar rastgele zamanlayıcı modelinin olasılıklarıdır; gerçek bir çekirdeğin dağılımı değildir.",
    },
    {
      heading: "Ad, inode, izin: dosya dediğin üç ayrı şey",
      body:
        "Dosya dediğimiz şey aslında üç parçadır. Veri diskte bloklarda durur. <strong>inode</strong> o verinin kimlik kartıdır: boyut, sahip, izinler, blokların yeri ve bir <strong>bağ sayacı</strong>. Ad ise inode'da değil, dizinde durur: dizin, 'ad → inode numarası' çiftlerinin listesidir. Bu yüzden bir dosyanın iki adı olabilir (<code>ln</code> ile kurulan <strong>sabit bağ</strong>) ve <code>rm</code> dosyayı değil, bir adı siler; veri ancak sayaç sıfıra inince bırakılır. <strong>Sembolik bağ</strong> ise kendi inode'u olan, içinde yalnızca hedefin yolunu taşıyan küçük bir dosyadır; hedef silinirse boşta kalır. İzinler de inode'dadır: sahip, grup ve diğerleri için üçer bit, her üçlü bir sekizlik basamak. Çekirdek tek bir üçlüye bakar: sahipsen sahip bitlerine, değilsen ama gruptaysan grup bitlerine, yoksa diğerlerine. Dizinde r adları listelemeye, w ad ekleyip silmeye, x içinden geçmeye izin verir. '/proc' diskte hiç yoktur: çekirdek, dosya okundukça içeriği o anda üretir; listede boyutların 0 görünmesi bundandır. Dördüncü sekmedeki kabuk bunları denemen için kurulmuş bir <em>modeldir</em>, Linux değildir: tarayıcının belleğindeki 41 inode'luk bir ağaçta çalışır, bilgisayarındaki hiçbir dosyaya dokunmaz, iletileri Türkçedir; '/proc' dosyaları ile <code>ps</code> çıktısı etiketli model çıktısıdır.",
      formula: "rw-r--r--  =  (4 + 2)(4)(4)  =  644<br>dizinin bağ sayacı = 2 + alt dizin sayısı",
      formulaNote: "r = 4, w = 2, x = 1 toplanır. Dizindeki 2, üst dizindeki adı ile kendi '.' girdisidir; her alt dizin '..' girdisiyle bir bağ daha ekler. 'Inode görünümü' paneli inode'da yazan sayacın yanına, ağacı tarayarak saydığı ad sayısını koyar; ikisi her zaman eşit çıkmalıdır.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var: <strong>01 · İşlemci zamanlama</strong> (Gantt şeması, beş algoritma, süreç tablosu), <strong>02 · Sanal bellek</strong> (sayfa değiştirme, adres çevirisi, TLB), <strong>03 · Eşzamanlılık ve kilitlenme</strong> (yarış durumu, filozoflar, Banker) ve <strong>04 · Dosya sistemi ve kabuk</strong> (model kabuk, inode görünümü, izin bitleri). Her sekme, sayarak ölçtüğü değeri kuramın verdiği değerin yanına ve aralarındaki farkı altına yazar. Sayılar ondalık virgülle gösterilir; yalnızca model terminal Linux biçimini taklit eder. Zamanlayıcıda küçük öncelik değeri daha önceliklidir; eşitlikte önce erken gelen, sonra tabloda üstte duran seçilir. Hepsi birer modeldir: zaman birimsizdir, süreler öğretim değeridir, kabuk tarayıcının belleğinde çalışır ve boru, joker karakter, komut zinciri tanımaz. Her sekmenin kendi sıfırlama düğmesi vardır; R tuşu da etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Konvoy: uzun iş öndeyse herkes bekler",
        predict:
          "Üç iş aynı anda hazır: P1 20, P2 3, P3 3 birim sürüyor. Geliş sırasıyla çalıştırılırlarsa ortalama bekleme kaç olur? En kısa iş öne alınınca kaça iner? Round Robin ikisinin arasında nereye düşer?",
        do: "<strong>01 · İşlemci zamanlama</strong> sekmesinde <strong>Konvoy</strong> düğmesine bas; algoritma kendiliğinden FCFS olur. 'Ortalama bekleme · şemadan sayılan' ve 'tanımdan' kartlarını, ardından 'Kaba kuvvet' diye başlayan satırı oku. <strong>Algoritma</strong> menüsünden önce SJF'yi, sonra Round Robin'i seç (<strong>Zaman dilimi q</strong> 2 kalsın). Son olarak Round Robin'deyken <strong>Bağlam değiştirme maliyeti</strong>ni 1 yap.",
        observe:
          "FCFS'de ortalama bekleme 14,33 birimdir; sayılan değer ile tanım arasındaki fark 0,00 birim, bağlam değiştirme sayısı 2. Kaba kuvvet satırı 6 sıranın hepsini dener: en küçük 3,00 (P2 → P3 → P1), en büyük 14,33 (P1 → P2 → P3). SJF tam 3,00 birim verir. Round Robin'de bekleme 6,33, ortalama yanıt 2,00 birim, 6 bağlam değiştirme. Maliyet 1 olunca son bitiş anı 26'dan 32 birime uzar, bekleme 11,33'e çıkar; 'Bağlam değiştirmeye giden zaman' kartı 6 birim · 18,8 % gösterir.",
        explain:
          "FCFS'de iki kısa iş 20 ve 23 birim bekler: (0 + 20 + 23)/3 = 14,33. Kısalar öne geçince uzun iş yalnızca 6 birim bekler: (0 + 3 + 6)/3 = 3,00. Toplam iş iki durumda da 26 birimdir; zamanlayıcı işi kısaltmaz, bekleyişi dağıtır. Eş varışta SJF'nin en iyi olduğu kanıtlanabilir; kaba kuvvet aynı sayıyı bularak kanıtı sınar. Round Robin süreleri bilmeden konvoyu dağıtır, ama her geçişin bedelini öder. Modelde giriş/çıkış beklemesi yoktur ve işlem süreleri önceden bilinir; gerçek bir çekirdek SJF için gereken süreyi yalnızca tahmin edebilir.",
      },
      {
        title: "Belady: bir çerçeve fazla, bir hata fazla",
        predict:
          "Başvuru dizisi 1 2 3 4 1 2 5 1 2 3 4 5, kural FIFO. Üç çerçeveyle 9 sayfa hatası oluyor. Belleği dört çerçeveye çıkarırsan hata sayısı azalır mı, aynı mı kalır?",
        do: "<strong>02 · Sanal bellek</strong> sekmesinin üst bölümünde <strong>Sıfırla</strong>'ya bas (FIFO, Belady dizisi, 3 çerçeve). 'Dizinin sonunda toplam hata' ve 'Bir çerçeve fazlasıyla hata' kartlarını oku. <strong>Çerçeve sayısı</strong>nı 4 yap; <strong>Başa sar</strong>'a basıp <strong>İleri</strong> düğmesiyle ya da Boşluk tuşuyla adım adım ilerle, 5. ve 6. adımlara dikkat et. Sonra <strong>Algoritma</strong>yı LRU ve OPT yapıp 'Çerçeve sayısına karşı sayfa hatası' tablosunun satırlarını karşılaştır.",
        observe:
          "3 çerçevede 9 hata (hata oranı 75,0 %), OPT ile 7; 'Bir çerçeve fazlasıyla hata' kartı 10 (4 çerçeve) der. 4 çerçevede gerçekten 10 hata çıkar ve durum satırı 'Belady anomalisi: 3 çerçevede 9, 4 çerçevede 10 hata' yazar. Tabloda FIFO satırı 12 12 9 10 ↑ 5 5 5'tir, Saat satırı da aynıdır; LRU 12 12 10 8 5 5 5, OPT 12 9 7 6 5 5 5: bu iki satır hiçbir yerde yükselmez.",
        explain:
          "Dört çerçevede 5. ve 6. adımlar isabettir, ama FIFO isabeti hesaba katmaz: 1 ve 2 kuyruğun en eskileri olarak kalır. 5 gelince 1 atılır, hemen ardından 1 istenir ve 2 atılır; zincir böyle sürer, son altı başvurunun altısı da hata verir (4 + 6 = 10). Üç çerçevede 1 ve 2, 5'ten hemen önce yeniden yüklendikleri için kuyruğun en yenileridir: 5 gelince 4 atılır, 1 ve 2 isabet verir. LRU ve OPT <strong>yığın özelliklidir</strong>: n çerçevede tutulan sayfalar her an n + 1 çerçevedekilerin alt kümesidir, yani küçük bellekteki her isabet büyükte de isabettir. FIFO'da bu kapsama yoktur.",
      },
      {
        title: "Kayıp güncelleme: 6 beklerken 2",
        predict:
          "İki iş parçacığı ortak sayacı üçer kez artırıyor. Son değer en az kaç olabilir? Rastgele 1 000 çalıştırmanın kaçı doğru sonucu, 6'yı verir? Geçişleri on kat seyreltmek hatayı yok eder mi?",
        do: "<strong>03 · Eşzamanlılık ve kilitlenme</strong> sekmesinde <strong>Sekmeyi sıfırla</strong>'ya bas (K = 3, p = 0,50, tohum 1). Önce elle dene: <strong>A bir adım atsın</strong> ve <strong>B bir adım atsın</strong> düğmelerine A, B, A, B, A, B sırasıyla bas ve ortak sayacı oku. Sonra <strong>En kötü sırayı oynat</strong>'a bas. Dağılım kartlarını oku; <strong>Her adımdan sonra geçiş olasılığı p</strong> kaydırıcısını 0,05'e çekip yeniden oku. p'yi 0,50'ye geri al ve <strong>Kritik bölgeyi kilitle (mutex)</strong> kutusunu işaretle.",
        observe:
          "Altı basıştan sonra iki iş parçacığı da birer artırmayı bitirmiştir, ama sayaç 1'dir. En kötü sıra sayacı 2'de bitirir; 'Kayıp güncelleme' kartı 4 gösterir. Dağılımda doğru sonuç oranı 0,6 % (6 / 1000), kesin olasılık 0,57 %; ortalama kayıp 2,399, kesin değeri 2,357; ulaşılabilen son değerler 2 … 6 (5 değer). p = 0,05'te doğru sonuç 72,3 % (723 / 1000), kesin 72,50 % olur. Kilitliyken oran 100,0 % (1000 / 1000), ulaşılabilen son değer 'yalnızca 6'dır; durum satırı çalıştırma başına ortalama 8,31 adımın kilit beklerken boşa gittiğini söyler.",
        explain:
          "A ve B aynı 0'ı yükler, ikisi de 1 yazar: artırmalardan biri ezilir. En kötü sırada A 0'ı yükleyip bekler, B iki artırma yapar, A üzerine 1 yazar; B bu 1'i yükleyip bekler, A kalan iki artırmasını bitirir, B üzerine 2 yazar. Geçişi seyreltmek hatayı azaltır ama sıfırlamaz: çalıştırmaların dörtte birinden fazlası hâlâ yanlıştır. Kilit üç adımı bölünmez kılar, sonuç her sırada 6'dır; bedeli bekleyerek geçen adımlardır. Olasılıklar sayfanın tek işlemcili, rastgele geçişli zamanlayıcı modeline aittir; gerçek bir çekirdeğin dağılımı değildir.",
      },
      {
        title: "Adı sildim, veri duruyor",
        predict:
          "Bir dosyaya <code>ln</code> ile ikinci bir ad verip ilk adı <code>rm</code> ile silersen veri kaybolur mu? Aynı şeyi <code>ln -s</code> ile kurulan sembolik bağla yaparsan ne olur?",
        do: "<strong>04 · Dosya sistemi ve kabuk</strong> sekmesinde <strong>Sabit bağ deneyi</strong> düğmesine bas; düğme dosya sistemini baştaki hâline döndürür ve altı komutu senin yerine yazar. Terminaldeki iki <code>ls -li</code> çıktısında ilk sütunu (inode numarası) ve izinlerden sonraki sayıyı (bağ sayısı) karşılaştır, 'Inode görünümü' panelini oku. Komut satırına <code>ln yedek.txt bir.txt</code> yazıp Enter'a bas ve paneli yeniden oku. Sonra <strong>Sembolik bağ deneyi</strong> düğmesine bas, son iki komutun çıktısına bak.",
        observe:
          "İlk listede <code>asil.txt</code> ve <code>yedek.txt</code> aynı inode numarasını (43) taşır; bağ sayısı 2, boyut 13 bayttır. <code>rm asil.txt</code> sonrasında <code>yedek.txt</code> hâlâ inode 43'tür, bağ sayısı 1'e inmiştir ve <code>cat yedek.txt</code> 'önemli veri' yazar. Inode görünümü 43 · normal dosya, bağ sayacı 1, ağaç taranarak sayılan 1 ad gösterir; yeni <code>ln</code> komutundan sonra sayaç 2, sayılan 2 ad olur. Sembolik bağ deneyinde <code>kisayol</code> ayrı bir inode'dur (44) ve 8 bayttır; <code>rm asil.txt</code> sonrasında <code>cat kisayol</code> 'Böyle bir dosya ya da dizin yok' der, <code>ls -l kisayol</code> ise bağı hâlâ <code>kisayol -&gt; asil.txt</code> diye listeler.",
        explain:
          "Sabit bağda iki ad da aynı inode'u gösteren eşit dizin girdileridir; 'asıl' ile 'yedek' arasında bir üstünlük yoktur. <code>rm</code> bir girdiyi siler ve sayacı bir azaltır; sayaç sıfıra inmediği için veri yerinde kalır. Sembolik bağın 8 baytı, içine yazılı hedef yolun, yani 'asil.txt' sözcüğünün uzunluğudur: bağ bir inode'u değil bir adı gösterir, ad gidince boşta kalır. Bu kabuk bir modeldir: ileti metinleri gerçek Linux iletileriyle birebir aynı değildir, inode numaraları da bu küçük ağaca özgüdür; ama sayacın davranışı gerçek dosya sistemlerindekiyle aynıdır.",
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
      title: "Daha çok bellek, daha çok hata",
      body:
        "László Bélády 1969'da, FIFO sayfa değiştirmede belleği büyütmenin sayfa hatalarını artırabildiğini gösterdi; sayfadaki 12 başvuruluk dizi bu olgunun klasik örneğidir: 3 çerçevede 9, 4 çerçevede 10 hata. Bélády, Nelson ve Shedler büyük bellekte neredeyse iki kat hata veren diziler kurmuş ve 2'nin genel bir üst sınır olduğunu tahmin etmişlerdi. 2010'da Fornai ve Iványi oranın sınırsız olduğunu gösterdi: istenen her oran için bir başvuru dizisi kurulabiliyor.",
    },
  ],
  worked: {
    title: "Dört süreç, iki kural: FCFS ile SRTF",
    prompt:
      "Sayfanın 'Ders kitabı dörtlüsü'nde süreçler (varış, işlem süresi) olarak P1 (0, 8), P2 (1, 4), P3 (2, 9), P4 (3, 5) birimdir. Tek işlemcide, bağlam değiştirme maliyeti 0 iken FCFS ve kesintili SRTF için Gantt şemasını çıkar; ortalama bekleme, dönüş ve yanıt sürelerini bul. Sonra her bağlam değiştirme 1 birim tutarsa SRTF'nin sonucunun nasıl değiştiğini hesapla.",
    steps: [
      "FCFS geliş sırasını bozmaz: P1 0–8, P2 8–12, P3 12–21, P4 21–26. Bekleme = bitiş − varış − işlem: P1 8 − 0 − 8 = 0, P2 12 − 1 − 4 = 7, P3 21 − 2 − 9 = 10, P4 26 − 3 − 5 = 18 birim. Ortalama 35 / 4 = 8,75 birim. Kesinti olmadığı için yanıt beklemeye eşittir: 8,75 birim.",
      "SRTF her varışta kalan süreleri karşılaştırır. t = 0'da yalnızca P1 vardır ve başlar. t = 1'de P2 gelir: 4 &lt; 7 olduğundan P1 kesilir. t = 2'de P3 (9) ve t = 3'te P4 (5) gelir, ama P2'nin kalanı 3 ve 2'dir; kesilmez ve t = 5'te biter. Kalanlar P1 7, P3 9, P4 5: sırasıyla P4 5–10, P1 10–17, P3 17–26 çalışır.",
      "SRTF beklemeleri: P1 17 − 0 − 8 = 9, P2 5 − 1 − 4 = 0, P3 26 − 2 − 9 = 15, P4 10 − 3 − 5 = 2 birim; ortalama 26 / 4 = 6,50 birim. Yanıt = ilk çalışma − varış: 0, 0, 15, 2; ortalama 17 / 4 = 4,25 birim.",
      "Dönüş = bekleme + işlem olduğundan ortalama dönüş, ortalama beklemeye ortalama işlem süresini, (8 + 4 + 9 + 5) / 4 = 6,50 birimi eklemektir: FCFS 15,25, SRTF 13,00 birim. Son bitiş anı ikisinde de 26 birimdir; kural toplam işi değiştirmez.",
      "SRTF işlemciyi P1 → P2 → P4 → P1 → P3 diye 4 kez el değiştirtir (FCFS 3 kez). Her değişim 1 birim tutarsa son bitiş 26 + 4 = 30 birime uzar; 30 birimin 4'ü, yani 13,3 %'ü hiçbir sürecin işine yaramaz. Parçalar 1'er birim kaydıkça bitişler 20, 6, 30 ve 12 olur; beklemeler 12, 1, 19, 4, ortalama 36 / 4 = 9,00 birim. Aynı maliyetle FCFS 10,25 birim verir: bu kümede SRTF yine öndedir, ama farkı 2,25'ten 1,25 birime inmiştir.",
    ],
    result:
      "Maliyetsiz: FCFS ortalama bekleme 8,75, dönüş 15,25, yanıt 8,75 birim; SRTF 6,50, 13,00 ve 4,25 birim. Maliyet 1 birimken SRTF 9,00, FCFS 10,25 birim bekletir. Sayfada sınamak için Ders kitabı dörtlüsü'nü seç, Algoritma'yı SRTF yap, 'Süreç başına ölçümler' tablosundaki bitiş ve bekleme sütunlarını adımlarınla karşılaştır; sonra Bağlam değiştirme maliyeti'ni 1 yap.",
  },
  misconceptions: [
    {
      myth: "Linux bir işletim sistemidir; Ubuntu da Linux'un bir sürümüdür.",
      truth:
        "Dar anlamıyla Linux yalnızca çekirdektir: işlemciyi, belleği ve aygıtları yöneten parça. Kabuk, derleyici, masaüstü ve paket yöneticisi başka projelerden gelir (temel araçların çoğu GNU'dan). Debian, Ubuntu, Fedora gibi dağıtımlar aynı çekirdeği farklı araç ve ayarlarla paketler; aralarındaki fark çekirdekte değil, çevresindedir. Android de Linux çekirdeği kullanır ama GNU araçlarını kullanmaz.",
    },
    {
      myth: "Belleği artırmak sayfa hatalarını azaltır; en kötü ihtimalle aynı bırakır.",
      truth:
        "Bu, kurala bağlıdır. LRU ve OPT için doğrudur: küçük bellekte tuttukları sayfalar büyük bellekte tuttuklarının her an alt kümesidir. FIFO ve Saat için garanti yoktur: sayfadaki Belady dizisinde ikisi de 3 çerçevede 9, 4 çerçevede 10 hata verir. Anomali kuraldan ve diziden doğar; çoğu dizide FIFO da çerçeve eklendikçe iyileşir.",
    },
    {
      myth: "Her sistem çağrısı bir bağlam değiştirmedir.",
      truth:
        "Sistem çağrısında işlemci kullanıcı kipinden çekirdek kipine geçer ve iş bitince aynı sürece döner: bu bir kip geçişidir, süreç değişmez. Bağlam değiştirme, zamanlayıcının işlemciyi bir süreçten alıp başkasına vermesidir; yazmaçlar saklanır, adres alanı değişir, önbellekler ile TLB soğur. Bir çağrı buna yol açabilir (diskten okuma beklerken süreç uyutulur), ama çoğu çağrı çekirdeğe girip aynı sürece dönmekle biter.",
    },
    {
      myth: "Programı defalarca çalıştırdım, sayaç hep doğru çıktı; demek ki yarış yok.",
      truth:
        "Yarışın görünmesi serpiştirmeye bağlıdır ve geçişler seyrekse çoğu çalıştırma doğru sonucu verir. Sayfanın modelinde K = 3 ve p = 0,05 iken 1 000 çalıştırmanın 723'ü doğru sonucu verir, ama bütün serpiştirmeler tarandığında son değer yine 2'ye kadar düşebilir. Bir programın yarışsız olduğunu sınama sayısı değil, ortak veriye her erişimin korunduğunu gösteren akıl yürütme kanıtlar.",
    },
  ],
  glossary: [
    { term: "Çekirdek (kernel)", definition: "İşletim sisteminin donanımı doğrudan yöneten, en yüksek yetkiyle çalışan parçası; Linux dar anlamıyla budur." },
    { term: "Sistem çağrısı (syscall)", definition: "Kullanıcı programının çekirdekten hizmet istediği tanımlı kapı; open, read, write gibi. Kip geçişidir, süreç değişmez." },
    { term: "Bağlam değiştirme", definition: "Zamanlayıcının işlemciyi bir süreçten alıp başkasına verirken yazmaçları saklayıp yüklemesi ve adres alanını değiştirmesi." },
    { term: "Zaman dilimi (quantum)", definition: "Round Robin'de bir sürece kesintisiz verilen en uzun işlemci süresi; dolunca süreç kuyruğun sonuna döner." },
    { term: "Sayfa hatası", definition: "Başvurulan sayfanın bellekte (ya da eşlemede) bulunmaması; çekirdek sayfayı yükler, çerçeveler doluysa önce birini çıkarır." },
    { term: "TLB", definition: "Son kullanılan sayfa → çerçeve çevirilerini tutan küçük önbellek; ıskada sayfa tablosu için fazladan bellek erişimi ödenir." },
    { term: "Yarış durumu", definition: "Sonucun, iş parçacıklarının adımlarının hangi sırayla serpiştiğine bağlı olması; ortak veriye kilitsiz erişimden doğar." },
    { term: "inode", definition: "Bir dosyanın boyutunu, sahibini, izinlerini, veri bloklarının yerini ve bağ sayacını tutan kayıt; dosyanın adı burada değil, dizindedir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisans İşletim Sistemleri dersi bu sayfadaki dört sekmeyi derinleştirir. Zamanlama bölümü çok düzeyli geri beslemeli kuyruklara, gerçek zamanlı sistemlerin teslim tarihlerine ve Linux'un zamanlayıcılarına uzanır: 2007'den beri kullanılan CFS, her sürecin o ana dek aldığı işlemci süresini tutup en az almış olana sıra veriyordu; 6.6 sürümüyle (2023) yerini, aynı adalet fikrine sanal son teslim zamanları ekleyen EEVDF aldı. Gerçek çekirdekler işlem sürelerini bilmez, tahmin eder. Çözümlü örnekteki Gantt şeması ve bekleme-yanıt ödünleşimi dersin ilk sayısal sorusudur. Bellek bölümü <strong>sayfalama</strong>yı açar: çok düzeyli sayfa tabloları, TLB, sayfa hatasının diskle birlikte gerçek maliyeti, çalışma kümesi ve yer değiştirme algoritmaları. Süreçlerin aynı veriye aynı anda dokunmasından doğan <strong>eşzamanlılık</strong> problemleri, kilitler, semaforlar ve ancak dört koşul (karşılıklı dışlama, tut ve bekle, geri alınamama, döngüsel bekleme) birlikte sağlandığında ortaya çıkabilen <strong>kilitlenme</strong>, dersin en çok sınav sorusu çıkan kısmıdır; Banker algoritmasının güvenlik sınaması orada elle yapılır. Dosya sistemleri kısmında ise inode yapısı ve günlükleme (journaling) sayesinde elektrik kesildiğinde dosya sisteminin neden tutarlı kaldığı anlatılır.",
      "Linux çekirdeğindeki iki mekanizma, isim uzayları (namespaces) ve kontrol grupları (cgroups), 2013'te Docker ile yaygınlaşan <strong>konteynerlerin</strong> temelidir: bir süreç kendi dosya ağacını, kendi ağını ve kendi PID 1'ini görür ama öbürleriyle aynı çekirdeği paylaşır. İşletim sistemi dersi aynı zamanda Bilgisayar Mimarisi, Bilgisayar Ağları ve güvenlik derslerinin kesiştiği yerdir: Ring 0'a sızan bir kodun neden her şeye hükmettiğini, 2018'de duyurulan Meltdown ve Spectre açıklarının neden tam çekirdek-kullanıcı sınırını hedef aldığını burada anlarsın. MIT'nin açık 6.828 dersinde öğrenciler bu kavramları C ile küçük bir işletim sistemi yazarak öğrenir; fork, sayfa tablosu ve zamanlayıcı orada birer ödevdir.",
    ],
    topics: ["Süreç zamanlama: MLFQ, CFS/EEVDF, gerçek zamanlı", "Sanal bellek, sayfa tabloları ve TLB", "Eşzamanlılık, kilitler ve kilitlenme", "Dosya sistemleri: inode ve günlükleme", "Konteynerler: namespaces ve cgroups", "Çekirdek güvenliği ve yan kanal saldırıları"],
  },
  quiz: [
    {
      question: "Konvoy kümesinde (P1 20, P2 3, P3 3 birim; hepsi 0 anında hazır) P1'in işlem süresi 10'a indirilirse FCFS ve SJF'nin ortalama beklemeleri nasıl değişir?",
      options: ["İkisi de yarıya iner", "FCFS 14,33'ten 7,67'ye iner, SJF 3,00'te kalır", "FCFS 14,33'te kalır, SJF 1,50'ye iner", "İkisi de değişmez"],
      answer: 1,
      explanation: "Bir iş, yalnızca arkasındakileri bekletir. FCFS'de P1 öndedir: beklemeler 0, 10, 13 olur, ortalama 23 / 3 = 7,67 birim. SJF'de P1 en sondadır ve kimseyi bekletmez; beklemeler 0, 3, 6, ortalama yine 3,00 birim. En sondaki işin süresi ortalama beklemeye hiç girmez; konvoyu yaratan da uzun işin kendisi değil, öndeki yeridir. Süreç tablosunda P1'in 'İşlem' kutusuna 10 yazarak sınayabilirsin.",
    },
    {
      question: "4 girişli, LRU ile yönetilen bir TLB var. Program 5 ayrı sayfaya sırayla dokunup başa dönüyor ve bunu binlerce kez yineliyor. TLB araması 1 ns, bellek erişimi 100 ns ise isabet oranı ve etkin erişim süresi ne olur?",
      options: ["80 % isabet, 121 ns", "0 % isabet, 201 ns", "99,90 % isabet, 101,10 ns", "20 % isabet, 181 ns"],
      answer: 1,
      explanation: "Beş sayfanın dördü her an TLB'dedir, ama aranan hep beşincisidir: LRU, en uzun süredir kullanılmayan girdiyi atar ve döngüde sıradaki sayfa tam da odur. Her erişim ıska olur: 1 + 100 + 1 × 100 = 201 ns. Döngüyü 4 sayfaya indirmek ya da TLB'yi 5 girişe çıkarmak ilk tur dışında her erişimi isabete çevirir. 'Erişim izi'ni Döngü yapıp k'yi 5 ile 4 arasında değiştirerek bu uçurumu sayfada görebilirsin.",
    },
    {
      question: "Model kabukta boş bir dizinin bağ sayacı 2'dir. İçine üç alt dizin ve dört dosya koyarsan sayaç kaç olur?",
      options: ["2 olarak kalır", "5 olur", "7 olur", "9 olur"],
      answer: 1,
      explanation: "Dizinin sayacı, onu gösteren girdileri sayar: üst dizindeki adı, kendi '.' girdisi ve her alt dizinin '..' girdisi. Üç alt dizin üç bağ ekler: 2 + 3 = 5. Dosyalar dizini değil kendi inode'larını gösterir; sayacı değiştirmez. Kabukta <code>mkdir a</code>, <code>mkdir a/b a/c a/d</code>, <code>ls -ld a</code> yazarak sına.",
    },
  ],
  next: [
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Mimarisi Laboratuvarı", why: "TLB'nin büyük kardeşi önbellek: ıskaları say, beş aşamalı boru hattını çevrim çevrim izle, Amdahl yasasını ölçerek sına." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi Laboratuvarı", why: "Bir sürecin adres alanı içeriden: işaretçi aritmetiği, öbek ayırıcının parçalanması, serbest bırakılmış belleğe erişim ve taşma." },
    { href: "veri-yapilari.html", title: "Veri Yapıları Laboratuvarı", why: "Hazır kuyruğunun ve öncelik sırasının ardındaki yapılar: halka tamponda kuyruk, hash tablosu, arama ağaçları ve ikili yığın." },
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "Sistem çağrısının altındaki kat: küçük bir işlemcide komutlar, C'den makine koduna iniş, yığın ve çağrı çerçeveleri." },
  ],
  sources: [
    { title: "Wikipedia · History of Linux", url: "https://en.wikipedia.org/wiki/History_of_Linux", note: "Unix'ten GNU'ya, Torvalds'ın 25 Ağustos 1991 iletisinden 0.01 sürümüne ve GPL'e geçişe kadar tarihçe (İngilizce)." },
    { title: "Wikipedia · Bélády's anomaly", url: "https://en.wikipedia.org/wiki/B%C3%A9l%C3%A1dy%27s_anomaly", note: "Sayfadaki 9 → 10 örneği, yığın özellikli algoritmalar ve oranın sınırsız olduğunu gösteren 2010 sonucu (İngilizce)." },
    { title: "Wikipedia · Deadlock (computer science)", url: "https://en.wikipedia.org/wiki/Deadlock_(computer_science)", note: "Coffman'ın dört koşulu, önleme ve kaçınma yolları, Banker algoritması (İngilizce)." },
    { title: "MIT OCW · 6.828 Operating System Engineering", url: "https://ocw.mit.edu/courses/6-828-operating-system-engineering-fall-2012/", note: "İleri düzey: öğrencilerin C ile küçük bir işletim sistemi yazdığı açık ders; ders notları ve laboratuvarlar (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
