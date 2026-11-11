window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["snake"] = {
  slug: "snake",
  title: "Yılan: Izgarada Kuyruk ve Döngü",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 30,
  tagline:
    "1976'da bir oyun salonunda doğdu, yirmi yıl sonra yüz milyonlarca cebe girdi. Kuyruğunu kovalayan yılanın altında 1600 köşeli bir çizge, bir kuyruk veri yapısı ve her kareden tam bir kez geçen bir tur var.",
  hook:
    "Bu sayfadaki yılan, skor 40'a ulaşana kadar ölemez: ne kadar beceriksizce oynarsan oyna, dört karelik bir yılanın kendine çarpması geometrik olarak imkânsızdır. Öbür uçta, hiç düşünmeden uygulanan tek bir rota 1600 karenin tamamını doldurur. İkisinin arasında kalan her şey stratejidir.",
  bigIdea:
    "Yılan, 1600 köşeli bir <strong>çizge</strong>de yürüyen bir <strong>kuyruk</strong>tur: baş her adımda komşu bir kareye girer, kuyruğun ucu bir kare boşaltır; oyunun bütün zorluğu bu yürüyüşün kendi son L adımıyla kesişmemesini sağlamaktır.",
  story: [
    "San Diego, 1976. Gremlin Industries'te mühendis Lane Hauck, iki oyuncunun ekranda birer ok yönettiği bir oyun tasarlar; programı Ago Kiss'le birlikte yazar. Oklar ilerledikçe arkalarında kalıcı bir duvar bırakır; kendi duvarına, rakibinkine ya da alanın kenarına çarpan patlar ve sayı karşı tarafa yazılır. Adı <strong>Blockade</strong>'dir. Prototip bir mini golf sahasında denenir, aynı yıl Chicago'daki oyun makineleri fuarında gösterilir ve Gremlin 3000 sipariş alır. Sonrası sektörün o yıllardaki hâlini özetler: rakipler çok geçmeden benzer oyunlarla pazara girer, Blockade Kasım 1976'da çıktığında satışlar fuardaki siparişlerin altında kalır ve şirketin elinde yığınla devre kartı, kabin ve ekran birikir. Hauck sonradan patentin bir buçuk yıl sürdüğünü, o zamana kadar oyunu kimsenin hatırlamadığını anlatır.",
    "Fikir ise ölmez, çünkü bir ekran ve dört yön tuşu olan her makineye sığar. Atari 1977'de salonlar için Dominos'u, yeni ev konsolu için Surround'u çıkarır; Surround konsolun dokuz açılış oyunundan biridir. Ev bilgisayarlarındaki bilinen ilk sürümü, 1978'de Peter Trefonas'ın TRS-80 için yazdığı Worm'dur. Rakibi duvarla sıkıştırma oyunu, 1980'lerin başında tek kişilik bir sabır sınavına dönüşür: 1982 tarihli Snake Byte'ta yılan elma yiyerek bölüm geçer, aynı yılın salon oyunu Nibbler'da bir labirente sığmaya çalışır. 1991'de Nibbles, MS-DOS'la birlikte gelen QBasic'in örnek programı olur ve pek çok kişi oyunun kaynak kodunu kurcalayarak programlamayla tanışır.",
    "Yılanı herkesin cebine sokan kişi Finlandiyalı mühendis Taneli Armanto'dur. Nokia'da arayüz tasarım ekibinde çalışırken yeni telefona bir oyun koyması istenir. Önce Tetris'e benzer bir şey düşünür; hak sorunları yüzünden vazgeçer ve tek renkli, küçücük bir ekranda dört tuşla oynanabilecek en yalın oyunu seçer. Snake, 1998'de Nokia 6110'la satışa çıkar. Nokia'ya göre oyunun şu ya da bu sürümü 350 milyon cihaza yüklenmiştir; Armanto gerçek sayının daha yüksek olduğunu düşünür. Kasım 2012'de New York Modern Sanat Müzesi, koleksiyonuna almak istediği 40 oyun arasında onu da sayar. Bu sayfadaki sürüm duvarsızdır: bir kenardan çıkan yılan karşı kenardan girer. Matematiği güzelleştiren de bu ayrıntıdır.",
  ],
  core: [
    {
      heading: "Tahta bir çizgedir, üstelik simit biçiminde",
      body:
        "Oyun alanı 40×40 = 1600 karedir. Her kareyi bir köşe, komşu iki kareyi birleştiren geçişi bir kenar sayarsan elinde bir <strong>çizge</strong> olur. Kenarlar sarmalı olduğundan en üst satırın üst komşusu en alt satırdır; hiçbir kare köşede ya da kenarda değildir, her birinin tam dört komşusu vardır. Böyle bir ızgarayı gerçek bir yüzeye sarmak istersen önce silindir, sonra simit elde edersin; matematikçiler buna torus der. Çizgeyi satranç tahtası gibi iki renge boyayabilirsin, çünkü 40 çifttir ve sarmal kenarlar boyamayı bozmaz. Her adım renk değiştirir. Bundan hemen bir sonuç çıkar: baş, kendinden yalnızca tek sayıda kare gerideki gövde parçalarına değebilir. Bir gerideki parça boyundur ve oyun geri dönmeye izin vermez. Üç gerideki parça, dört karelik yılanda kuyruğun ucudur ve o adımda yerini boşaltır. Demek ki yılan en erken beş kareyken, yani dördüncü yemden sonra kendine çarpabilir.",
      formula: "V = 40 × 40 = 1600,  E = 4V / 2 = 3200",
      formulaNote: "Her köşeden 4 kenar çıkar; her kenar iki ucundan birer kez sayıldığı için toplam ikiye bölünür.",
    },
    {
      heading: "Yılan bir kuyruktur",
      body:
        "Kod yılanı bir dizi olarak tutar ve her adımda iki şey yapar: yeni baş karesini dizinin önüne ekler, son elemanı siler. Önden giren arkadan çıkar; bu, bilgisayar biliminin <strong>kuyruk</strong> (ilk giren ilk çıkar) yapısıdır. Sonucu şudur: yılanın gövdesi, başın geçtiği son L karedir ve her kare tam L adım boyunca dolu kalır. Yem yenen adımda silme atlanır, kuyruk bir eleman uzar. İnce bir ayrıntı oyunu adil kılar: çarpışma denetiminden önce kod kuyruk ucunu listeden çıkarır, çünkü o kare aynı adımda boşalacaktır. Baş, kuyruğun az önce durduğu kareye girebilir; L karelik kapalı bir halkada yılan sonsuza kadar dönebilir. Bedeli de vardır: dizinin önüne eklemek ve 'bu kare dolu mu' diye bütün gövdeyi taramak L ile orantılı iş ister. 1600 karede bu fark edilmez; büyük tahtalarda dairesel tampon ve doluluk tablosu kullanılır, ikisi de adım başına sabit iş yapar.",
      formula: "gövde(t) = { baş(t), baş(t − 1), …, baş(t − L + 1) }",
      formulaNote: "L yılanın uzunluğu, t adım sayısıdır. Baş bir kareye girdikten tam L adım sonra o kare yeniden boştur.",
    },
    {
      heading: "Yem nereye düşer: beklenen uzaklık",
      body:
        "Yem, yılanın üstünde olmayan karelerden birine eşit olasılıkla konur: kod rastgele bir kare çeker, gövdeye denk gelirse yeniden dener. Baş ile yem arasındaki en kısa yol, yatay ve dikey farkların toplamıdır; köşegen adım olmadığı için buna taksi ya da <strong>Manhattan uzaklığı</strong> denir. Sarmal tahtada her eksende iki yol vardır ve kısa olanı seçersin: 35 kare sağdaki yeme soldan 5 adımda varılır. Tek eksende uzaklık 0 ile 20 arasında değişir ve ortalaması tam 10'dur; iki eksen birbirinden bağımsız hesaplanıp toplanır, beklenen uzaklık 20 kare eder. Kenarlar duvar olsaydı rastgele iki kare arasındaki ortalama uzaklık 26.7 kare olurdu; sarmal kenarlar yolu dörtte bir kısaltır. En uzak yem 40 adım ötededir ve tek bir karedir: tahtanın tam karşı noktası. Bu hesap, en kısa yolu izleyen bir oyuncunun ilk yemlerde skor başına harcadığı zamanı da verir: yem başına ortalama 20 adım.",
      formula: "E[d] = E[d<sub>x</sub>] + E[d<sub>y</sub>] = 10 + 10 = 20 kare",
      formulaNote: "Beklenen değerin doğrusallığı: toplamın ortalaması, ortalamaların toplamıdır. Standart sapma √67 ≈ 8.2 karedir.",
    },
    {
      heading: "Her kareden tam bir kez: Hamilton döngüsü",
      body:
        "Bir çizgede her köşeden tam bir kez geçip başladığı yere dönen tura <strong>Hamilton döngüsü</strong> denir. Yılan böyle bir turu izlerse kendine çarpamaz: gövde, turun son L karesidir ve baş bir kareye ancak 1600 adım sonra yeniden gelir; o zamana kadar kare çoktan boşalmıştır. Bu tahtada tur bulmak kolaydır: 39 adım sağa, 1 adım aşağı; kırk kez tekrarla. Her satırın 40 karesi de ziyaret edilir, iniş sütunu her satırda bir kare sola kayar ve kırk satır sonra başlangıca dönülür. Bu rota hiç karar vermeden tahtayı doldurur: 1599 yem, 15 990 puan. Bedeli zamandır. Yem turun boş kalan kısmında rastgele bir yerdedir; yılan L kareyken ortalama (1601 − L)/2 adım bekler. Hepsi toplanınca yaklaşık 640 bin adım eder. Hızlanmalar hesaba katıldığında bu, kodun adım süreleriyle 9.3 saat, 60 Hz'lik bir ekranda 9.8 saat sürer. Duvarlı tahtada aynı boyama bir engel koyar: kapalı bir tur her adımda renk değiştirdiğinden çift uzunlukta olmalıdır; kare sayısı tek olan 5×5 tahtada Hamilton döngüsü yoktur.",
      formula: "Σ<sub>L=1</sub><sup>1599</sup> (1601 − L)/2 ≈ 640 000 adım",
      formulaNote: "Yem başına ortalama 400 adım. Karşılaştır: en kısa yol ortalama 20 adımdır ama uzun yılanda güvenli değildir.",
    },
    {
      heading: "Güvenli mi, hızlı mı? Zor soru burada",
      body:
        "İki uç strateji var. <strong>Açgözlü</strong> oyuncu her yeme en kısa yoldan gider: hızlıdır ama gövdesi uzadıkça kendi kıvrımlarının ördüğü bir cebe girer ve çıkamaz. Hamilton turunu izleyen oyuncu hiç ölmez ama yirmi kat yavaştır. İyi oyun ikisinin arasındadır: turun sırasını bozmayan kestirmeler yap, kuyruğuna giden bir yolu hep açık tut. İşin kuramsal yüzü şaşırtıcıdır. 'Bu çizgede Hamilton döngüsü var mı?' sorusu genel çizgeler için NP-tamdır; Richard Karp'ın 1972'de yayımladığı ünlü listedeki problemlerden biridir. Alon Itai, Christos Papadimitriou ve Jayme Szwarcfiter 1982'de sorunun, köşeleri ızgara noktaları olan çizgelere daraltılınca bile zor kaldığını gösterdi. Dolu bir dikdörtgende tur kâğıt kalemle bulunur; içinden rastgele kareler çıkarılmış bir ızgarada ise bilinen hiçbir yöntem, en kötü durumda çok terimli zamanda bitmez. Yılanın gövdesi tahtadan tam da böyle kareler çıkarır: güvenli alan her adımda biçim değiştiren, delikli bir ızgaradır.",
      formula: "en kısa yol ≈ 20 adım/yem  ·  Hamilton turu ≈ 400 adım/yem",
      formulaNote: "İlki erken ölür, ikincisi hiç ölmez. Aradaki yirmi katlık fark, stratejinin kazanabileceği alanın tamamıdır.",
    },
  ],
  lab: {
    intro:
      "Kontroller: <strong>ok tuşları</strong> (dokunmatikte parmağını kaydırmak) yönü değiştirir; yılan gittiği yönün tersine dönemez. <strong>Yeni Oyun</strong> düğmesi ya da oyun bitince Enter baştan başlatır. Tek gösterge <strong>Skor</strong>'dur: her yem 10 puan. Tahta 40×40 karedir ve duvarı yoktur; bir kenardan çıkan yılan karşı kenardan girer. Yılan tek kare olarak ortada, sağa doğru başlar. Adım süresi kodda 120 ms'dir ve her 100 puanda 8 ms kısalır.",
    experiments: [
      {
        title: "Bir tur kaç saniye? Kod ile ekran",
        predict:
          "Yılan hiç dönmeden sağa giderse 40 kareyi dolaşıp aynı yere kaç saniyede gelir? Adım 120 ms olduğuna göre hesap 40 × 0.12 = 4.8 s der. Kronometre bunu doğrular mı?",
        do: "Yeni Oyun'a bas ve hiçbir tuşa dokunma. Baş sağ kenardan çıkıp soldan girdiği an kronometreyi başlat, beş tam tur say ve süreyi beşe böl. Yem yoluna çıkarsa skor 10 olur; hız değişmez, saymayı sürdür.",
        observe:
          "60 Hz'lik bir ekranda bir tur 4.8 değil, yaklaşık 5.3 saniye sürer; beş tur 26–27 saniye tutar. 120 Hz'lik bir ekranda tur 5.0 saniyeye iner. Sonuç ekranının tazeleme hızına bağlıdır; hiçbir ekranda 4.8'in altına inmez.",
        explain:
          "Oyun, adım zamanının gelip gelmediğine yalnızca ekran her tazelendiğinde bakar. 60 Hz'de görüntüler 16.7 ms arayla gelir: yedincisi 116.7 ms'dedir ve 120'yi doldurmaz; adım sekizincide, 133.3 ms'de atılır. 40 × 0.1333 = 5.33 s. 120 Hz'de tazelemeler 8.3 ms arayladır; 120 ms'yi dolduran ilki on beşincidir: 125 ms, tur 5.0 s. Kodda yazan süre ile ekranda yaşanan süre arasındaki bu fark, zamanı ayrık adımlarla ölçen her sistemin yaptığı yuvarlamadır.",
      },
      {
        title: "Ölümsüz yılan: ilk dört kare",
        predict:
          "Yılan en az kaç kare uzunluğundayken kendine çarpabilir? Skor 30'a kadar onu bile bile öldürmeye çalışsan başarabilir misin?",
        do: "Yeni oyunda ilk üç yemi ye (skor 30, uzunluk 4). Şimdi olabildiğince hızlı ve dar dön: ↓ ← ↑ → tuşlarına art arda bas, U dönüşleri dene, kuyruğunun üstünden geçmeye çalış. Sonra bir yem daha ye (skor 40) ve aynı hızlı ↓ ← ↑ dönüşünü tekrarla.",
        observe:
          "Skor 30'da ne yaparsan yap oyun bitmez; en dar dönüşte baş, 2×2'lik bir karede kuyruğunu kovalar. Skor 40'ta üç tuş art arda üç adıma denk gelirse üçüncü hamlede 'Oyun Bitti' yazar. Bunu tutturmak kolay değildir: bir adım 60 Hz'lik ekranda 0.13 saniyedir.",
        explain:
          "Tahtayı satranç tahtası gibi düşün: her adım renk değiştirir, baş yalnızca kendinden tek sayıda kare gerideki parçaya değebilir. Bir gerideki boyundur; geri dönüş yasaktır. Üç gerideki parça dört karelik yılanda kuyruk ucudur ve kod, o adımda boşalacağı için onu denetimden çıkarır. Beş karede aynı parça artık uç değildir. İlk dört yem bu yüzden risksizdir.",
      },
      {
        title: "Kaybolan tuş: tek kişilik bekleme odası",
        predict:
          "Yılan sağa giderken ↑ ve hemen ardından ← tuşuna, ikisi aynı adımın içine sığacak kadar hızlı basarsan U dönüşü yapar mı? Ya ↑ ve hemen ardından → tuşuna basarsan?",
        do: "Düz sağa giderken iki tuşa neredeyse aynı anda, sırayla bas: önce ↑, sonra ←. Yılanın ne yaptığına bak. Yeniden sağa dön ve bu kez ↑, sonra → dene. Son olarak iki tuşun arasında kısa bir es ver.",
        observe:
          "İlkinde yılan yukarı döner ve yukarı gitmeyi sürdürür; ← kaybolur. İkincisinde hiç dönmez; → tuşu ↑'yı ezer. Tuşlar arasında bir adımlık süre bırakırsan ikisi de işlenir.",
        explain:
          "Kod bekleyen yön için tek bir değişken tutar ve her yeni tuşu yılanın o anda gittiği yöne göre sınar. ← reddedilir, çünkü yılan hâlâ sağa gitmektedir ve bu geri dönüş sayılır; → kabul edilir ve bekleyen ↑'nın üstüne yazılır. Bekleyen hamleler bir kuyrukta tutulsaydı ikisi de sırayla uygulanırdı. Yılanın gövdesi bir kuyruktur ama klavyenin bekleme odası tek kişiliktir.",
      },
      {
        title: "Hiç düşünmeden: 39 sağ, 1 aşağı",
        predict:
          "Yemi hiç kovalamadan, yalnızca sağa gidip her turda bir satır aşağı inersen yılan kendine çarpabilir mi? Skor yine de artar mı; ilk yem ne kadar sürer?",
        do: "Sağa giderken her turun sonunda ↓, bir adım sonra → tuşuna bas; yukarı ve sola hiç dönme. Yeme doğru sapma. Yanlışlıkla iki satır inersen zararı yok; yalnızca atladığın satır o turda taranmaz. Birkaç dakika sürdür ve skoru izle.",
        observe:
          "Yılan tahtayı satır satır tarar ve kendine hiç çarpmaz. Yemler kendiliğinden yoluna çıkar ama seyrek: 60 Hz'lik ekranda bütün tahtanın taranması 1600 adım, yani 3.5 dakika sürer; ilk yemler ortalama bunun yarısı kadar beklenir.",
        explain:
          "Rota bir Hamilton döngüsüdür: baş her kareye 1600 adımda bir uğrar, gövde ise yalnızca son L kareyi kaplar. Yem boş karelerden birinde rastgele durduğundan ortalama bekleme (1601 − L)/2 adımdır; başta 800 adım. Aynı yemi en kısa yoldan almak ortalama 20 adım tutardı. Güvenliğin bedeli kırk kat sabırdır; yılan uzadıkça bu oran küçülür.",
      },
    ],
  },
  wow: [
    {
      title: "3000 sipariş ve boş kabinler",
      body:
        "Blockade 1976'da Chicago'daki oyun makineleri fuarında gösterildiğinde Gremlin 3000 sipariş aldı. Ardından Atari, Ramtek, Bally ve Meadows benzer oyunlarla pazara girdi. Blockade Kasım 1976'da çıktığında satış, fuardaki siparişlerin altında kaldı; Gremlin'in deposunda satılamayan kartlar, kabinler ve ekranlar birikti. Bir türü başlatan oyun, kendi yapımcısına zarar ettirdi.",
    },
    {
      title: "Tetris olacaktı, Snake oldu",
      body:
        "Taneli Armanto, Nokia 6110'a koymak için önce Tetris'e benzer bir oyun düşünmüş, hak sorunları yüzünden vazgeçmişti. Yerine yazdığı Snake için kızılötesi bağlantıyla iki kişilik bir oyun kipi de tasarladı; ama geliştirme sırasında kullandığı eski telefonda kızılötesi olmadığından bu kipi hiç deneyemedi. Nokia'ya göre oyun 350 milyon cihaza ulaştı.",
    },
    {
      title: "Dokuz saatlik kusursuz oyun",
      body:
        "Bu sayfadaki tahtanın tamamını doldurmak 1599 yem ve 15 990 puan demektir. '39 sağ, 1 aşağı' kuralı bunu hiç risk almadan başarır ama ortalama 640 bin adım ister. Adım süresi 900 puanda 48 ms'ye iner ve orada kalır; oyun buna rağmen kodun süreleriyle 9.3 saat, 60 Hz'lik ekranda 9.8 saat sürer. Daha çabuk bitirmenin tek yolu kestirme yapmaktır; her kestirme de turun verdiği güvenceden biraz götürür.",
    },
  ],
  worked: {
    title: "Yem ortalama kaç kare uzakta?",
    prompt:
      "Tahta 40×40 karedir ve kenarları sarmalıdır. Yem, başın bulunmadığı karelerden birine eşit olasılıkla düşüyor. (a) Başın yeme en kısa yoldan kaç adımda ulaşacağının beklenen değerini bul. (b) Kenarlar duvar olsaydı rastgele iki kare arasındaki beklenen uzaklık ne olurdu? (c) İlk 10 yem en kısa yoldan kaç saniye sürer?",
    steps: [
      "Uzaklığı tanımla: adımlar yalnızca yatay ya da dikeydir, d = d<sub>x</sub> + d<sub>y</sub>. Sarmal tahtada her eksende iki yön vardır: d<sub>x</sub> = min(|Δx|, 40 − |Δx|).",
      "Tek ekseni say: Δx, 0'dan 39'a kadar eşit olasılıklıdır. d<sub>x</sub> = 0 bir kez, 1'den 19'a kadar her değer ikişer kez, 20 bir kez görülür. Toplam 2·(1 + 2 + … + 19) + 20 = 2·190 + 20 = 400; ortalama 400/40 = 10 kare.",
      "(a) İki ekseni topla: E[d] = 10 + 10 = 20 kare. Yemin başın karesine düşememesi sonucu 1600/1599 ile çarpar: 20.01; fark ihmal edilir.",
      "(b) Duvarlı tahtada n kareli bir eksende rastgele iki konumun ortalama farkı (n² − 1)/(3n) = 1599/120 ≈ 13.3 karedir; iki eksen 26.7 kare eder. Sarmal kenarlar yolu yüzde 25 kısaltır.",
      "(c) 10 yem × 20 adım = 200 adım. Kodun 120 ms'lik adımıyla 200 × 0.12 = 24 s; 60 Hz'lik ekranda adım 133 ms'ye yuvarlandığı için 200 × 0.133 ≈ 27 s.",
    ],
    result:
      "Yem ortalama 20 kare ötededir (standart sapma yaklaşık 8 kare); duvarlı tahtada 26.7 olurdu. En kısa yoldan giden oyuncu ilk 100 puanı yarım dakikanın altında toplar. Aynı işi Hamilton turu yaklaşık 8000 adımda, 60 Hz'lik ekranda 18 dakikada yapar.",
  },
  misconceptions: [
    {
      myth: "Oyun yemi bilerek zor yerlere, yılanın gidemeyeceği köşelere koyuyor.",
      truth:
        "Kod rastgele bir kare çeker; kare yılanın üstündeyse yeniden çeker, başka hiçbir şeye bakmaz. Yemin 'kötü' yere düşmesi hissinin kaynağı yılanın kendisidir: gövde uzadıkça boş kareler azalır ve çoğu, kıvrımların arkasında kalır. Zorlaşan zar değil, tahtadır.",
    },
    {
      myth: "Kuyruğun ucuna değmek de ölümdür.",
      truth:
        "Bu sayfada değil. Baş ilerlerken kuyruk ucu aynı adımda yerinden kalkar; kod çarpışma denetiminden önce o son kareyi listeden çıkarır. Baş, kuyruğun az önce durduğu kareye güvenle girer. Uzun yılanla dar alanda hayatta kalmanın yolu budur: kuyruğunu izle, o seni boş kareye götürür.",
    },
    {
      myth: "En iyi strateji her zaman yeme en kısa yoldan gitmektir.",
      truth:
        "Kısa yılanda evet, uzun yılanda hayır. En kısa yol yalnızca bir sonraki yemi düşünür; yemi aldıktan sonra başın çıkış yolu kalıp kalmadığına bakmaz. Gövde tahtanın önemli bir kısmını kaplayınca açgözlü oyuncu kendi ördüğü cebe girer. Güvenli oyun, kuyruğa ulaşan bir yolu açık tutar; gerekirse yolu uzatır.",
    },
    {
      myth: "Skor arttıkça yılan sürekli hızlanır.",
      truth:
        "Adım süresi yalnızca her 100 puanda 8 ms kısalır ve 900 puanda 48 ms'de durur; sonrası sabittir. Üstelik 60 Hz'lik ekranda bu dokuz hızlanmanın ancak beşini görürsün: adım 133, 117, 117, 100, 100, 83, 83, 67, 67 ve 50 ms olarak yaşanır, çünkü süreler ekran tazelemesinin 16.7 ms'lik katlarına yuvarlanır.",
    },
  ],
  glossary: [
    { term: "Çizge", definition: "Köşeler ve onları birleştiren kenarlardan oluşan yapı; burada her kare bir köşe, komşuluk bir kenardır." },
    { term: "Torus", definition: "Karşılıklı kenarları birbirine yapıştırılmış dikdörtgenin oluşturduğu simit biçimli yüzey; sarmal kenarlı oyun alanının geometrisi." },
    { term: "İki parçalı çizge", definition: "Köşeleri, her kenar farklı renkleri birleştirecek biçimde iki renge boyanabilen çizge; içindeki her kapalı tur çift uzunluktadır." },
    { term: "Kuyruk", definition: "İlk giren elemanın ilk çıktığı veri yapısı; yılanın gövdesi önden eklenip arkadan silinen bir kuyruktur." },
    { term: "Hamilton döngüsü", definition: "Bir çizgenin her köşesinden tam bir kez geçip başladığı köşeye dönen kapalı tur." },
    { term: "Manhattan uzaklığı", definition: "İki kare arasındaki yatay ve dikey farkların toplamı; köşegen adımın olmadığı ızgaralarda en kısa yolun uzunluğu." },
    { term: "Beklenen değer", definition: "Rastgele bir büyüklüğün, olasılıklarla ağırlıklandırılmış ortalaması; çok sayıda tekrarın ortalamasının yaklaştığı sayı." },
    { term: "Açgözlü algoritma", definition: "Her adımda o an en iyi görünen seçimi yapan, sonrasını hesaba katmayan yöntem; hızlıdır ama her problemde doğru sonucu vermez." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Yılanın gövdesi, <strong>Veri Yapıları</strong> dersinin ilk haftalarındaki kuyruğun canlı hâlidir. Orada aynı işin kaça mal olduğunu sormayı öğrenirsin: dizinin önüne eklemek neden uzunlukla orantılı zaman alır, dairesel tampon bunu nasıl sabit zamana indirir, 'bu kare dolu mu' sorusu neden bir tabloyla tek bakışta yanıtlanır. Yeme giden en kısa yolu, engelleri hesaba katarak bulan yöntem genişlik öncelikli aramadır ve o da bir kuyrukla çalışır. <strong>Ayrık Matematik</strong> ve <strong>Çizge Teorisi</strong> ise bu defterdeki boyama kanıtlarını genelleştirir: iki parçalı çizgeler, eşlemeler, bütün kenarlardan bir kez geçen Euler turları ile bütün köşelerden bir kez geçen Hamilton turları. İlki için basit bir derece ölçütü vardır; ikincisi NP-tamdır. Birbirine bu kadar benzeyen iki sorunun zorlukça bu kadar ayrılması, dersin en öğretici anlarından biridir.",
      "Yemin konumu <strong>Olasılık</strong> dersinin diliyle konuşur: tekdüze dağılım, beklenen değerin doğrusallığı, varyans. Aynı araçlarla 'açgözlü oyuncu ortalama kaç yem sonra ölür' diye sorabilirsin; bunun kapalı bir cevabı yoktur ve benzetimle, yani Monte Carlo yöntemiyle bulunur. <strong>Yapay Zekâ</strong> dersinde yılan sık kullanılan bir deney alanıdır: durum uzayında arama, sezgisel fonksiyonlar ve ödülü yalnızca skor olan pekiştirmeli öğrenme. Bir de çevrimiçi algoritmalar vardır: geleceği, burada sonraki yemin yerini, bilmeden karar vermek zorunda olan yöntemler ve onların her şeyi önceden bilen bir rakibe göre ne kadar kötü kalabileceğinin hesabı.",
    ],
    topics: [
      "Kuyruk, çift uçlu kuyruk ve dairesel tampon",
      "Genişlik öncelikli arama (BFS)",
      "İki parçalı çizgeler ve boyama kanıtları",
      "Euler ve Hamilton turları, NP-tamlık",
      "Beklenen değer, varyans ve Monte Carlo benzetimi",
      "Çevrimiçi algoritmalar ve pekiştirmeli öğrenme",
    ],
  },
  quiz: [
    {
      question: "Duvarlı (sarmal olmayan) 5×5'lik bir tahtada yılan, her kareden tam bir kez geçip başladığı kareye dönen bir tur atabilir mi?",
      options: [
        "Evet, satır satır tarayarak",
        "Evet, ama yalnızca köşeden başlarsa",
        "Hayır; her adım renk değiştirir, kapalı tur çift sayıda kare ister, 25 tektir",
        "Hayır; çünkü 5 asal sayıdır",
      ],
      answer: 2,
      explanation:
        "Tahtayı satranç tahtası gibi boya. Her adım renk değiştirdiğinden başladığın renge dönmek için çift sayıda adım gerekir; 25 kareli bir tur 25 adımdır. Asallığın ilgisi yoktur: 3×3 de olmaz, 5×6 olur. Sarmal 40×40'ta kare sayısı çift olduğu için engel yoktur.",
    },
    {
      question: "8 kare uzunluğundaki yılanın başı bir kareye girdi. Yılan yem yemezse o kare kaç adım sonra yeniden boşalır?",
      options: ["7 adım", "8 adım", "9 adım", "16 adım"],
      answer: 1,
      explanation:
        "Gövde bir kuyruktur: her adımda öne bir kare eklenir, arkadan bir kare silinir. Kare yedi adım sonra kuyruğun ucuna gelir, sekizinci adımda silinir. Genel kural: bir kare tam L adım dolu kalır. Baş, 2×4'lük bir halkada dönerek o kareye sekizinci adımda güvenle girebilir.",
    },
    {
      question: "Sarmal 40×40 tahtada yemin başa beklenen uzaklığı 20 karedir. Tahta sarmal 80×80 olsaydı bu değer ne olurdu?",
      options: ["20 kare", "Yaklaşık 28 kare", "40 kare", "80 kare"],
      answer: 2,
      explanation:
        "Tek eksende ortalama uzaklık kenar uzunluğunun dörtte biridir: n = 40 için 10, n = 80 için 20. İki eksen toplanınca 40 kare eder. Uzaklık kenarla doğru orantılı büyür, kare sayısıyla (alanla) değil; alan dört katına çıkarken ortalama yol yalnızca iki katına çıkar.",
    },
  ],
  next: [
    { href: "cizge-teorisi.html", title: "Çizge Teorisi", why: "Köşeler, kenarlar, boyama ve turlar; yılanın tahtasını çizge olarak görmenin bütün araçları burada." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Kuyruk, yığın ve dizi: yılanın gövdesini taşıyan yapıyı ve işlemlerin maliyetini yakından incele." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "Yeme engellerin arasından en kısa yolu bulan aramalar; açgözlü oyuncunun kullandığı yöntem." },
    { href: "rastgele-yuruyus.html", title: "Rastgele Yürüyüş", why: "Aynı ızgarada bu kez yönü zar belirliyor: beklenen uzaklık ve geri dönüş olasılığı." },
  ],
  sources: [
    { title: "Wikipedia · Snake (video game genre)", url: "https://en.wikipedia.org/wiki/Snake_(video_game_genre)", note: "Blockade'den Surround, Worm, Nibbler ve Nokia sürümlerine türün tarihçesi (İngilizce)." },
    { title: "Wikipedia · Blockade (video game)", url: "https://en.wikipedia.org/wiki/Blockade_(video_game)", note: "Lane Hauck'ın tasarımı, 1976 fuarındaki 3000 sipariş ve rakip sürümlerin hikâyesi." },
    { title: "NIST · Dictionary of Algorithms and Data Structures: queue", url: "https://xlinux.nist.gov/dads/HTML/queue.html", note: "İlk giren ilk çıkar yapısının kısa ve kesin tanımı." },
    { title: "MathWorld · Hamiltonian Cycle", url: "https://mathworld.wolfram.com/HamiltonianCycle.html", note: "Hamilton döngüsünün tanımı, bilinen sonuçlar ve problemin zorluğu üzerine kaynakça." },
  ],
  revision: "Kasım 2026",
};
