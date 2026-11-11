window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["hanoi-kuleleri"] = {
  slug: "hanoi-kuleleri",
  title: "Hanoi Kuleleri: Kendini Çağıran Bulmaca",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 25,
  tagline:
    "Üç çubuk, birkaç disk, tek kural. 1883'te Paris'te satılan bu oyuncak özyinelemenin, ikili sayıların ve üstel büyümenin en temiz dersidir: n disk tam 2ⁿ − 1 hamle ister, bir eksiği olmaz.",
  hook:
    "Sayfadaki yedi diski en az 127 hamlede taşırsın; her biri bir saniye sürse iki dakika eder. Aynı oyunu 64 diskle, yine saniyede bir hamleyle oynayan biri ise işini evrenin bugünkü yaşının kırk iki katı sürede bitirir. Yedi ile altmış dört arasında ne oldu?",
  bigIdea:
    "n diskli kuleyi taşımak, <strong>n − 1 diskli kuleyi iki kez taşımak ve arada en büyük diski bir kez oynatmak</strong> demektir: T(n) = 2·T(n − 1) + 1 = 2ⁿ − 1. Her yeni disk işi ikiye katlar.",
  story: [
    "1883'te Paris'te oyuncakçılarda bir kutu belirdi: tahta bir taban, üç çubuk, ortası delik, boy boy diskler. Kapağında <em>La Tour d'Hanoï</em> yazıyordu; oyunu Tonkin'den getiren kişi de 'Li-Sou-Stian Koleji mandarini Profesör N. Claus (de Siam)' olarak tanıtılıyordu. Böyle bir profesör yoktu. Harfleri yeniden dizersen <em>N. Claus de Siam</em> 'Lucas d'Amiens' olur, <em>Li-Sou-Stian</em> da 'Saint-Louis': oyunun mucidi, Amiens doğumlu matematikçi <strong>Édouard Lucas</strong>, Paris'teki Saint-Louis Lisesi'nde öğretmendi. Adı da tesadüf değildi; Fransa o yıl Tonkin'de savaşıyordu ve Hanoi'nin adı gazetelerden düşmüyordu.",
    "Kutudan çıkan kâğıt bir de efsane anlatıyordu: Benares'teki tapınakta Brahma'nın kutsal kulesi durur; 64 altın diskten örülmüştür. Rahipler nöbetleşe, gece gündüz diskleri taşır; son disk yerine oturduğunda kule de rahipler de yıkılacak, dünya sona erecektir. Bugün anlatılan süslü ayrıntılar, dünyanın merkezini gösteren kubbe ve üç elmas iğne, kısa süre sonra bilim yazarı Henri de Parville'in kaleminden eklendi. Hikâye o kadar güzeldir ki hâlâ 'eski bir Hint efsanesi' diye aktarılır. Kanıt ise başka şey söylüyor: efsanenin bilinen en eski kaydı Lucas'nın kendi oyuncağının tanıtım yazısıdır. Tapınak, rahipler ve altın diskler büyük olasılıkla bir matematikçinin pazarlama zekâsıdır. Hesabı ise gerçektir.",
    "Lucas oyuncakçı değildi. Fibonacci dizisinin kardeşi olan Lucas sayıları onun adını taşır; 1876'da 2<sup>127</sup> − 1'in asal olduğunu kâğıt kalemle gösterdi. 39 basamaklı bu sayı, elle bulunmuş en büyük asal olarak kaldı. 1891'de bir yemekte yere düşen tabaktan sıçrayan parça yanağını kesti; yara iltihaplandı ve Lucas birkaç gün içinde, 49 yaşında öldü. Oyuncağı ondan uzun yaşadı: bugün programlama derslerinde <strong>özyineleme</strong> bu bulmacayla anlatılır, nöropsikologlar planlama becerisini onun türevleriyle ölçer, sistem yöneticileri yedek bantlarını 'Hanoi düzeni'yle döndürür.",
  ],
  core: [
    {
      heading: "Özyineleme: sorunu kendisinin küçüğüne devret",
      body:
        "En büyük diski A'dan C'ye taşıyabilmen için üstündeki her şeyin yoldan çekilmiş, üstelik C'nin de boş olması gerekir. Yani küçük n − 1 diskin tamamı B'de, düzgün bir kule hâlinde durmalıdır. Plan kendiliğinden çıkar: üstteki n − 1 diski B'ye taşı, en büyük diski C'ye koy, n − 1 diski B'den C'ye getir. 'n − 1 diski taşı' adımı aynı bulmacanın bir küçüğüdür; onu da aynı planla çözersin, ta ki tek disk kalana dek. Sayfadaki <strong>Çöz</strong> düğmesinin kodu tam olarak bu üç satırdır. Hamle sayısı T(n) için plan bir <strong>yineleme bağıntısı</strong> verir.",
      formula: "T(n) = 2·T(n − 1) + 1,  T(1) = 1",
      formulaNote: "İki küçük kule taşıması ve aradaki tek büyük disk hamlesi. T(2) = 3, T(3) = 7, T(4) = 15.",
    },
    {
      heading: "2ⁿ − 1: tümevarımla ispat ve neden daha kısası yok",
      body:
        "Dizi 1, 3, 7, 15, 31 diye gidiyor; her terim bir sonraki 2'nin kuvvetinin bir eksiği. Tahmin T(n) = 2ⁿ − 1. <strong>Tümevarım</strong>la ispatı iki satırdır. Temel: T(1) = 2¹ − 1 = 1. Adım: T(n − 1) = 2<sup>n−1</sup> − 1 doğruysa T(n) = 2·(2<sup>n−1</sup> − 1) + 1 = 2ⁿ − 1. Hile yapmadan da görebilirsin: bağıntının iki yanına 1 ekle, T(n) + 1 = 2·(T(n − 1) + 1) olur; 'bir fazlası' her adımda ikiye katlanan bir dizidir. Peki daha kurnaz bir yol olamaz mı? Olamaz. En büyük disk en az bir kez oynamak zorundadır; ilk oynayışından önce küçükler tek çubukta toplanmış olmalı (en az T(n − 1) hamle), son oynayışından sonra da onun üstüne taşınmalıdır (en az T(n − 1) hamle daha). Alt sınır ile planın hamle sayısı çakışır; sayfadaki <strong>Minimum</strong> göstergesi bu yüzden bir tahmin değil, bir teoremdir.",
      formula: "T(n) = 2ⁿ − 1",
      formulaNote: "Sayfadaki Disk menüsüyle: 3 → 7, 4 → 15, 5 → 31, 6 → 63, 7 → 127.",
    },
    {
      heading: "İkili sayaç: hangi disk, ne zaman?",
      body:
        "Hamleleri 1'den başlayıp ikili tabanda numarala. Kural şaşırtıcı ölçüde basittir: m'inci hamlede oynayan disk, m'in ikili yazılışında sağdan ilk 1'in bulunduğu basamaktır. 1 = 0001 → disk 1; 2 = 0010 → disk 2; 4 = 0100 → disk 3; 8 = 1000 → disk 4; 12 = 1100 → yine disk 3. Buradan her şey okunur: tek numaralı hamlelerin tamamı en küçük diske aittir; k numaralı disk toplam 2<sup>n−k</sup> kez oynar; en büyük disk yalnız bir kez, tam ortada, 2<sup>n−1</sup>'inci hamlede yer değiştirir. Oynayan disklerin dizisi 1, 2, 1, 3, 1, 2, 1, 4, … bir cetvelin çentiklerine benzediği için <strong>cetvel dizisi</strong> diye anılır. Aynı diziyi <strong>Gray kodu</strong> da üretir: ardışık sayıların yalnız bir bitle ayrıldığı bu sayma düzeninde 000, 001, 011, 010, 110, 111, 101, 100 sırasıyla değişen bitler 1, 2, 1, 3, 1, 2, 1'dir; değişen bit, oynayan disktir.",
      formula: "disk(m) = m'in ikili yazılışında sağdan ilk 1'in sırası;  k. disk 2<sup>n−k</sup> kez oynar",
      formulaNote: "Toplam: 2<sup>n−1</sup> + 2<sup>n−2</sup> + … + 2 + 1 = 2ⁿ − 1. Geometrik seri, aynı sonuca ikinci yoldan varır.",
    },
    {
      heading: "Durum çizgesi: bulmacanın haritası bir Sierpiński üçgeni",
      body:
        "Bir konumu tarif etmek için her diskin hangi çubukta olduğunu söylemen yeter; çubuk üstündeki sıra zorunludur. n disk için 3ⁿ konum vardır: 3 diskte 27, 4 diskte 81. Her konumu bir nokta, her yasal hamleyi bir çizgi yap; ortaya çıkan <strong>durum çizgesi</strong>nin biçimi sürpriz değildir artık: en büyük diskin durduğu çubuğa göre üç bölge vardır, her bölge n − 1 diskli bulmacanın tam bir kopyasıdır ve bölgeler birbirine yalnız en büyük diskin üç hamlesiyle bağlanır. Üç küçük kopya, üç köprü: bu, Sierpiński üçgeninin kuruluş tarifidir. Üçgenin köşeleri bütün disklerin tek çubukta olduğu üç konumdur; yalnız bu köşelerde iki, diğer bütün konumlarda üç yasal hamle bulunur. En kısa çözüm, üçgenin bir kenarı boyunca dümdüz yürümektir. Yanlış bir hamle seni kenardan içeri sokar. Sayfa bunu anında görür: bulunduğun konumdan hedefe en kısa yolu hesaplar ve sayaçların altına 'En kısa yoldan k hamle fazla' yazar.",
      formula: "konum sayısı = 3ⁿ,  hamle (kenar) sayısı = (3<sup>n+1</sup> − 3)/2,  çap = 2ⁿ − 1",
      formulaNote: "3 disk için 27 konum ve 39 kenar, 4 disk için 81 konum ve 120 kenar. Çap, birbirine en uzak iki konum arasındaki en kısa yoldur: köşeden köşeye.",
    },
    {
      heading: "Üstel duvar: 64 disk neden bitmez?",
      body:
        "T(n) ≈ 2ⁿ, yani algoritmanın maliyeti <strong>üsteldir</strong>: her ek disk süreyi ikiye katlar. Sayfadaki Çöz her hamleyi 0.4 saniyede yapar; 7 disk 51 saniye, 20 disk yaklaşık beş gün, 30 disk on üç buçuk yıl sürerdi. Burada suç algoritmanın değildir; alt sınır ispatı daha hızlısının olamayacağını söylüyor, çünkü çözümün kendisi 2ⁿ − 1 hamle uzunluğundadır ve onu yazmak bile o kadar sürer. Dikkat çekici olan şudur: çözüm çok uzundur ama onu üreten program çok kısadır ve hafızası azdır; özyineleme en fazla n kat derinleşir. Zaman maliyeti ile bellek maliyetinin ayrı şeyler olduğunu gösteren en temiz örneklerden biri budur. Çubuk sayısını dörde çıkarınca ise tablo değişir: hamle sayısı üstelden çok daha yavaş büyür ve en iyi stratejinin ispatı 2014'e kadar beklemiştir.",
      formula: "T(n + 1) = 2·T(n) + 1 ≈ 2·T(n);  T(64) = 2<sup>64</sup> − 1 ≈ 1.84 × 10<sup>19</sup>",
      formulaNote: "Zaman karmaşıklığı Θ(2ⁿ), bellek (özyineleme derinliği) Θ(n).",
    },
  ],
  lab: {
    intro:
      "Bir çubuğa tıklayınca en üstteki disk kalkar ve <strong>↑ seçili</strong> yazısı çıkar; ikinci tıklama diski bırakır, aynı çubuğa yeniden tıklarsan seçim iptal olur. Yasak hamlede ekran titrer. <strong>Disk</strong> menüsü 3 ile 7 arasında seçim yaptırır (açılışta 4), <strong>Hamle</strong> ve <strong>Minimum</strong> göstergeleri üsttedir, <strong>Geri Al</strong> son hamleyi siler. <strong>Çöz</strong> her zaman başlangıç dizilişine dönüp oradan başlar ve 0.4 saniyede bir hamle yapar. En değerli ölçü aletin sayaçların altındaki durum satırıdır: her hamleden sonra 'En kısa yoldasın' ya da 'En kısa yoldan k hamle fazla' yazar. Buradaki k, yaptığın hamleler ile bulunduğun konumdan hedefe kalan en kısa yolun toplamından 2ⁿ − 1 çıkarılarak bulunur; yani bundan sonra kusursuz oynasan bile kaç hamle kaybettiğini söyler. Bitişte hüküm 'Tam minimum hamlede' ya da '+k fazla hamle' olur.",
    experiments: [
      {
        title: "İlk hamle kaderdir",
        predict:
          "3 diskte en küçük diski ilk hamlede B'ye mi, C'ye mi koymalısın? Fark eder mi? Ya 4 diskte?",
        do: "Disk menüsünden 3'ü seç. İlk hamlede en küçük diski B'ye koy ve durum satırını oku; oradan sonra elinden gelen en iyi oyunu oyna. Sonra Yeni Oyun'a basıp bu kez ilk hamleyi C'ye yap. Aynı karşılaştırmayı 4 diskle tekrarla.",
        observe:
          "3 diskte B'ye konan ilk diskten hemen sonra satır 'En kısa yoldan 1 hamle fazla' der; hüküm ilk hamlede verilmiştir. Oradan en iyi oyun 8 hamlede biter: 'Tamamlandı! (+1 fazla hamle)'. C ile başlarsan satır 'En kısa yoldasın' yazar ve 7 hamlede 'Mükemmel!' yazısını görürsün. 4 diskte durum tersine döner: B ile başlayan 15'te bitirir, C ile başlayan en iyi ihtimalle 16'da.",
        explain:
          "Plan geriye doğru okunur: n diski C'ye taşımak için n − 1 disk B'ye, onun için n − 2 disk C'ye gitmelidir; hedef her katta değişir. En küçük diskin ilk durağı bu yüzden disk sayısı tekse hedef çubuk, çiftse yardımcı çubuktur. Yanlış başlangıç tam bir hamleye mal olur: durum çizgesinde kenardan bir adım içeri girmiş, bir adımla geri dönmüşsündür.",
      },
      {
        title: "Çöz'ü izle: cetvelin çentikleri",
        predict:
          "4 diskli çözümde en küçük disk kaç kez oynar, en büyük disk kaç kez? En büyük disk kaçıncı hamlede yerinden kalkar?",
        do: "Disk 4 iken Çöz'e bas ve yalnız en küçük (kırmızı, 1 numaralı) diski izle; Hamle göstergesine bakarak hangi hamlelerde oynadığını say. İkinci izleyişte gözünü 4 numaralı diske dik. İstersen ■ Durdur ile araya gir.",
        observe:
          "Kırmızı disk her tek numaralı hamlede oynar ve hep aynı yöne döner: A → B → C → A. Toplam 8 kez oynar; 2 numaralı disk 4, 3 numaralı 2 kez. En büyük disk yalnız bir kez, 8. hamlede A'dan C'ye geçer. Durum satırı baştan sona 'En kısa yoldasın' der. 15 hamle yaklaşık 6 saniye sürer.",
        explain:
          "Oynayan diskler 1, 2, 1, 3, 1, 2, 1, 4, 1, 2, 1, 3, 1, 2, 1 dizisini izler: hamle numarasının ikili yazılışındaki sağdan ilk 1. k numaralı disk 2<sup>4−k</sup> kez oynar: 8 + 4 + 2 + 1 = 15. En küçük diskin dönüş yönü disk sayısı çiftken A → B → C, tekken A → C → B'dir; Disk 3 ya da 5 seçip yönün ters döndüğünü gör.",
      },
      {
        title: "Bir disk daha, iki kat süre",
        predict:
          "Disk sayısını 3'ten 7'ye çıkarırken Minimum göstergesi nasıl büyür? Çöz'ün 7 diski bitirmesi kaç saniye sürer? Menüde 8 olsaydı?",
        do: "Disk menüsünde sırayla 3, 4, 5, 6, 7'yi seçip Minimum değerlerini yaz. 3 diskte ve 7 diskte Çöz'e basıp süre tut.",
        observe:
          "Minimum: 7, 15, 31, 63, 127. Her değer bir öncekinin iki katının bir fazlası. Çöz 3 diski yaklaşık 3 saniyede, 7 diski yaklaşık 51 saniyede bitirir. 7 diskli çözümde en alttaki mavi disk tek bir kez, 64. hamlede oynar.",
        explain:
          "T(n) = 2ⁿ − 1 ve her hamle 0.4 s: 127 × 0.4 ≈ 51 s. Menüde 8 olsaydı 255 hamle ve 102 s; 20 disk 1 048 575 hamle, yani 4.9 gün; 64 disk aynı tempoda 234 milyar yıl sürerdi. Üstel büyümenin imzası budur: girdiye bir eklersin, iş ikiye katlanır.",
      },
      {
        title: "En uzun yol: yalnız komşu çubuklar",
        predict:
          "Kendine ek bir kural koy: diskler yalnız komşu çubuğa geçebilir, A ile C arasında doğrudan hamle yok. 3 disk yine taşınır mı? Kaç hamlede?",
        do: "Disk 3 ile başla. En küçük diski aynı yönde iki kez oynat (A → B → C), sonra en küçük disk dışındaki tek yasal komşu hamleyi yap; ardından en küçük diski yine iki kez, bu sefer geldiği yöne doğru oynat. Bu düzeni bitene kadar sürdür.",
        observe:
          "Kule 26 hamlede C'ye varır; sayfa 'Tamamlandı! (+19 fazla hamle)' yazar. Yol boyunca hiçbir konumu iki kez görmezsin ve 27 konumun hepsinden tam bir kez geçersin; yarı yolda, 13. hamlenin sonunda bütün diskler B'de toplanır ve durum satırı 'En kısa yoldan 13 hamle fazla' der. İlk dört hamlede satır 1'de kalır, sonra basamak basamak 19'a tırmanır.",
        explain:
          "Komşu kuralıyla n − 1 diskli kuleyi üç kez taşımak ve en büyük diski iki kez oynatmak gerekir: U(n) = 3·U(n − 1) + 2 = 3ⁿ − 1. 3 disk için 26. Konum sayısı 3ⁿ = 27 olduğundan bu yol durum çizgesinin bütün noktalarını tek seferde dolaşır: üçgenin bir köşesinden ötekine en kısa yol 7, en dolambaçlı yol 26 hamledir.",
      },
    ],
  },
  wow: [
    {
      title: "Profesör Claus'un şifresi",
      body:
        "1883'teki kutunun üstündeki 'N. Claus de Siam' ile 'Lucas d'Amiens' aynı harflerden oluşur; 'Li-Sou-Stian' da 'Saint-Louis'nin karıştırılmışıdır. Édouard Lucas kendi adını ve çalıştığı okulu bir anagrama gizlemiş, oyunu Tonkin'den gelmiş bir Doğu bilmecesi gibi satmıştı. Benares tapınağı ve 64 altın disk efsanesi de bilinen en eski hâliyle aynı kutunun tanıtım yazısında geçer.",
    },
    {
      title: "466/885: rastgele iki konumun arası",
      body:
        "Disklerin rastgele dağıldığı iki konum seç ve birinden ötekine en kısa yoldan git. Disk sayısı büyüdükçe bu yolun ortalama uzunluğu, olabilecek en uzun yolun (2ⁿ − 1) tam 466/885'ine, yani yaklaşık yüzde 52.7'sine yaklaşır. Bu tuhaf kesri Andreas Hinz ve Chan Tat-Hung birbirinden bağımsız buldu; aynı sayı Sierpiński üçgeninde rastgele iki nokta arasındaki ortalama uzaklık olarak da karşımıza çıkar.",
    },
    {
      title: "Dördüncü çubuk bir yüzyıl bekletti",
      body:
        "Çubuk sayısı dörde çıkınca bulmaca birden zorlaşır; çözmesi değil, en kısa çözümün hangisi olduğunu ispatlaması. Henry Dudeney bu sürümü 1907 tarihli <em>Canterbury Bulmacaları</em> kitabında sordu; J. S. Frame ve B. M. Stewart 1941'de bir strateji önerdi. Stratejinin dört çubuk için gerçekten en iyisi olduğunu Thierry Bousch ancak 2014'te ispatladı. Beş ve daha çok çubuk için aynı soru bugün hâlâ açıktır.",
    },
  ],
  worked: {
    title: "Efsanenin hesabı: 64 disk, saniyede bir hamle",
    prompt:
      "Benares rahipleri 64 diski hiç hata yapmadan, saniyede bir hamleyle taşıyor. İş kaç yıl sürer? Evrenin yaşı (yaklaşık 13.8 milyar yıl) içinde aynı tempoyla en çok kaç diskli bir kule bitirilebilirdi? En büyük disk ne zaman oynar?",
    steps: [
      "Hamle sayısı: T(64) = 2<sup>64</sup> − 1 = 18 446 744 073 709 551 615, yaklaşık 1.845 × 10<sup>19</sup> hamle. Saniyede bir hamleyle bu kadar saniye eder.",
      "Yıla çevir: bir yıl 365.25 gün × 86 400 s = 31 557 600 s ≈ 3.156 × 10<sup>7</sup> s. Süre = 1.845 × 10<sup>19</sup> s / 3.156 × 10<sup>7</sup> s/yıl ≈ 5.85 × 10<sup>11</sup> yıl, yani 585 milyar yıl.",
      "Evrenle karşılaştır: 585 milyar / 13.8 milyar ≈ 42. Rahipler Büyük Patlama'da başlamış olsalardı bugün işin ancak kırk ikide birini bitirmiş olurlardı.",
      "Tersini sor: 13.8 milyar yıl = 13.8 × 10<sup>9</sup> × 3.156 × 10<sup>7</sup> s ≈ 4.36 × 10<sup>17</sup> s. 2ⁿ − 1 ≤ 4.36 × 10<sup>17</sup> koşulunu sağlayan en büyük n için log₂(4.36 × 10<sup>17</sup>) ≈ 58.6; yani n = 58. Kontrol: 2<sup>58</sup> ≈ 2.88 × 10<sup>17</sup> sığar, 2<sup>59</sup> ≈ 5.76 × 10<sup>17</sup> sığmaz.",
      "En büyük disk 2<sup>63</sup>'üncü hamlede, tam yarı yolda oynar: yaklaşık 292 milyar yıl sonra. O ana kadar yapılan her şey, altmış üç diskli kuleyi yoldan çekmekten ibarettir.",
    ],
    result:
      "64 disk saniyede bir hamleyle yaklaşık 585 milyar yıl, evrenin yaşının 42 katı sürer. Evrenin yaşı ancak 58 diske yeter; kalan altı disk süreyi 2⁶ = 64 katına çıkarır.",
  },
  misconceptions: [
    {
      myth: "Disk sayısı iki katına çıkarsa hamle sayısı da iki katına çıkar.",
      truth:
        "İki katına çıkaran, tek bir ek disktir. Disk sayısını ikiye katlarsan hamle sayısının yaklaşık karesini alırsın: 3 disk 7 hamle, 6 disk 63 hamle (7² = 49'dan bile fazla); 7 disk 127, 14 disk 16 383. Sayfadaki Minimum göstergesini 3'ten 6'ya geçerken izle.",
    },
    {
      myth: "İşin zor kısmı en büyük diski taşımaktır.",
      truth:
        "En büyük disk bütün çözümde tek bir kez oynar. İşin neredeyse tamamı küçük disklerindir: en küçük disk tek başına hamlelerin yarısından fazlasını yapar (7 diskte 127 hamlenin 64'ü). Büyük disk için gereken şey güç değil, önünün açılmasıdır.",
    },
    {
      myth: "En kısa çözümün pek çok farklı yolu vardır; hangisini bulursan o.",
      truth:
        "Bütün diskleri bir çubuktan ötekine taşımanın 2ⁿ − 1 hamlelik yolu tektir. Alt sınır ispatı her adımı zorlar: küçükler önce yardımcı çubukta toplanmak zorundadır, bu da bir küçük bulmacanın tek en kısa çözümüdür. Sayfa bunu hamle hamle denetler: tek yoldan ayrıldığın an durum satırı 'En kısa yoldasın' demeyi bırakır ve en az 1 hamle fazla yazar.",
    },
    {
      myth: "Hanoi Kuleleri Hindistan'dan ya da Vietnam'dan gelen çok eski bir oyundur.",
      truth:
        "Oyunun bilinen ilk örneği 1883'te Paris'te, Édouard Lucas'nın takma adıyla satılan kutudur. Tapınak efsanesi de ilk kez o kutunun tanıtım yazısında görülür. Daha eski bir Asya kaynağı gösterilebilmiş değildir; 'eski efsane' büyük olasılıkla ambalajın parçasıdır.",
    },
  ],
  glossary: [
    { term: "Özyineleme", definition: "Bir problemi, aynı problemin daha küçük örneklerini çözerek çözme yöntemi; en küçük örnek (tek disk) doğrudan çözülür." },
    { term: "Yineleme bağıntısı", definition: "Bir dizinin terimini önceki terimler cinsinden veren eşitlik; burada T(n) = 2·T(n − 1) + 1." },
    { term: "Tümevarım", definition: "Bir önermeyi önce ilk durum için, sonra 'n − 1 için doğruysa n için de doğrudur' adımıyla bütün doğal sayılar için ispatlama yöntemi." },
    { term: "Üstel büyüme", definition: "Girdi bir arttığında çıktının sabit bir sayıyla çarpılması; Hanoi'de her ek disk hamle sayısını yaklaşık ikiye katlar." },
    { term: "Durum çizgesi", definition: "Bir bulmacanın bütün konumlarını nokta, yasal hamlelerini kenar olarak gösteren çizge; n diskli Hanoi'de 3ⁿ nokta vardır." },
    { term: "Gray kodu", definition: "Ardışık iki sayının yalnız tek bir bitle ayrıldığı ikili sayma düzeni; değişen bitlerin sırası Hanoi'de oynayan disklerin sırasıdır." },
    { term: "Cetvel dizisi", definition: "1, 2, 1, 3, 1, 2, 1, 4, … dizisi; m'inci terim, m'in ikili yazılışında sağdan ilk 1'in basamak sırasıdır." },
    { term: "Alt sınır", definition: "Hangi yöntem kullanılırsa kullanılsın bir işin gerektirdiği en az adım sayısı; Hanoi'de 2ⁿ − 1 ve özyinelemeli çözüm tam buna ulaşır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bilgisayar mühendisliğinin ilk yılında, <strong>Programlamaya Giriş</strong> dersinde özyinelemeyi büyük olasılıkla bu bulmacayla göreceksin: üç satırlık bir fonksiyon, kendini iki kez çağırır ve çağrı yığını en çok n kat derinleşir. <strong>Ayrık Matematik</strong> dersi aynı bulmacayı tümevarımın ve yineleme bağıntılarının ilk örneği yapar; T(n) = 2T(n − 1) + 1'i çözmeyi öğrenen, bir sonraki hafta Fibonacci'nin kapalı formülünü üreteç fonksiyonlarla bulur. <strong>Algoritma Analizi</strong>'nde bağıntının biçimi değişir: birleştirmeli sıralamanın T(n) = 2T(n/2) + n'si de iki özyinelemeli çağrı yapar ama problemi bir azaltmak yerine yarıya böler ve üstel yerine n·log n çıkar. 'Azalt ve fethet' ile 'böl ve fethet' arasındaki bu uçurum, dersin ana fikridir.",
      "Durum çizgesi fikri ise daha uzağa gider. Rubik küpü, satranç, bir robotun hareket planı ve bir protokolün doğrulanması aynı soruya indirgenir: devasa bir çizgede bir noktadan ötekine yol var mı, en kısası hangisi? <strong>Çizge Teorisi</strong> ve <strong>Yapay Zekâ</strong> derslerinde bu çizgeler genişlik öncelikli arama ve A* ile dolaşılır; Hanoi'nin 3ⁿ noktalı, Sierpiński biçimli çizgesi bu yöntemlerin en sevilen deneme tahtasıdır. Gray kodu sayısal tasarım dersinde dönüş kodlayıcılarında ve Karnaugh haritalarında karşına çıkar. Psikolojide Tim Shallice'in 1982'de Hanoi'den türettiği Londra Kulesi testi, beynin alın lobundaki hasarlarda planlama becerisini ölçmek için kullanılır.",
    ],
    topics: ["Özyineleme ve çağrı yığını", "Yineleme bağıntıları ve üreteç fonksiyonlar", "Tümevarım ve alt sınır ispatları", "Böl ve fethet, ana teorem", "Durum uzayında arama (BFS, A*)", "Gray kodu ve ikili gösterim", "Fraktal çizgeler ve Sierpiński üçgeni"],
  },
  quiz: [
    {
      question: "5 diskli bulmacanın en kısa çözümünde en büyük disk kaçıncı hamlede oynar ve toplam kaç hamle yapılır?",
      options: ["5. hamlede; toplam 25", "16. hamlede; toplam 31", "31. hamlede; toplam 31", "15. hamlede; toplam 32"],
      answer: 1,
      explanation: "Toplam 2⁵ − 1 = 31 hamle. En büyük disk bir kez, tam ortada oynar: önce 4 diskli kule yardımcı çubuğa taşınır (15 hamle), 16. hamle büyük diskindir, sonra 15 hamle daha gelir. İkili yazılışla: 16 = 10000, sağdan ilk 1 beşinci basamakta.",
    },
    {
      question: "10 diskli en kısa çözümde 3 numaralı disk (küçükten üçüncü) kaç kez oynar?",
      options: ["3 kez", "8 kez", "128 kez", "341 kez"],
      answer: 2,
      explanation: "k numaralı disk 2<sup>n−k</sup> kez oynar: 2<sup>10−3</sup> = 2⁷ = 128. Kontrol için bütün diskleri topla: 512 + 256 + 128 + … + 1 = 1023 = 2¹⁰ − 1. Her disk, bir büyüğünün iki katı kadar oynar.",
    },
    {
      question: "Bir arkadaşın '4 diski 14 hamlede taşıyan bir yol buldum' diyor. Yolu görmeden ne söyleyebilirsin?",
      options: [
        "Olabilir; özyinelemeli çözüm yalnızca bilinen en iyi yoldur",
        "Olamaz; en büyük diskin oynamasından önce ve sonra en az 7'şer hamle zorunludur, 7 + 1 + 7 = 15",
        "Olabilir; ilk hamleyi C'ye yaparsa bir hamle kazanır",
        "Olamaz; çünkü 14 çift sayıdır",
      ],
      answer: 1,
      explanation: "Alt sınır ispatı yönteme bakmaz: en büyük disk oynamadan önce üç küçük disk tek çubukta toplanmalı (en az T(3) = 7 hamle), oynadıktan sonra onun üstüne taşınmalıdır (en az 7 hamle daha). 15'in altına inen bir yol bu yüzden mutlaka yasak bir hamle içerir.",
    },
  ],
  next: [
    { href: "sierpinski-fraktali-peano-egrisi-altin-oran.html", title: "Sierpiński Fraktali", why: "Durum çizgesinin biçimini veren üçgen: üç küçük kopya, sonsuza kadar. Aynı özyineleme, bu kez geometride." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı", why: "2ⁿ ile n·log n arasındaki uçurum; üstel duvarın neden aşılmaz olduğu ve hangi problemlerin ona çarptığı." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi", why: "Konumlar nokta, hamleler kenar: en kısa yol, çap ve bütün noktaları dolaşan yollar burada genel hâliyle." },
    { href: "isik-sondurme.html", title: "Işık Söndürme", why: "Bir başka bulmaca, bir başka gizli cebir: ikili sayılar bu kez doğrusal denklem sistemine dönüşüyor." },
  ],
  sources: [
    { title: "Wikipedia · Tower of Hanoi", url: "https://en.wikipedia.org/wiki/Tower_of_Hanoi", note: "Lucas'nın 1883 oyuncağı ve takma adı, efsanenin kaynağı, Gray kodu çözümü, Sierpiński biçimli durum çizgesi, 466/885 ve Frame–Stewart (İngilizce)." },
    { title: "MathWorld · Tower of Hanoi", url: "https://mathworld.wolfram.com/TowerofHanoi.html", note: "Yineleme bağıntısı, cetvel dizisi ve çok çubuklu sürümlerin formülleri (İngilizce)." },
    { title: "MacTutor · Édouard Lucas", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Lucas/", note: "Lucas'nın yaşamı: Lucas sayıları, 2¹²⁷ − 1'in asallığı, Saint-Louis Lisesi ve 1891'deki ölümü (İngilizce)." },
    { title: "Wikipedia · Gray code", url: "https://en.wikipedia.org/wiki/Gray_code", note: "Tek bit değiştirerek sayma düzeni, kuruluşu ve Hanoi Kuleleri'yle bağlantısı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
