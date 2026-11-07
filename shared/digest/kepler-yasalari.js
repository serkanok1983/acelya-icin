window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kepler-yasalari"] = {
  slug: "kepler-yasalari",
  title: "Kepler Yasaları: Sekiz Yay Dakikalık İnat",
  field: "Fizik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Tycho Brahe'nin gözlemlerindeki inatçı bir sekiz yay dakikası, gezegenlerin çember değil elips çizdiğini ortaya çıkardı. Üç yasa: elips yörünge, eşit alanlar ve T² = a³.",
  hook: "Ocak başında Dünya, Güneş'e yılın en yakın noktasındadır: temmuzdakinden yaklaşık 5 milyon kilometre daha yakın. Yine de o günlerde Erzurum'da kar yağar ve Dünya, temmuzdakinden saniyede bir kilometre daha hızlı koşar. Gezegeni kim hızlandırıp yavaşlatıyor ve bunu teleskopsuz bir gökyüzü kaydından kim çıkardı?",
  bigIdea:
    "Gezegenler, Güneş'in bir odağında durduğu elipsler çizer, Güneş'e yaklaştıkça hızlanır ve bir turu yörüngenin biçimine değil yalnızca büyüklüğüne bağlı bir sürede tamamlar: yıl ve AU cinsinden <em>T² = a³</em>.",
  story: [
    "Teleskop icat edilmeden önceki son büyük gözlemci, Danimarkalı soylu <strong>Tycho Brahe</strong>'ydi. 1576'dan sonra Ven adasında kurdurduğu Uraniborg gözlemevinde, dev duvar çeyrek daireleri ve sekstantlarla yirmi yılı aşkın süre gezegenlerin konumunu ölçtü. Ölçümleri bir-iki yay dakikası duyarlıktaydı; karşılaştırma için dolunayın gökteki genişliği yaklaşık otuz yay dakikasıdır. 1599'da İmparator II. Rudolf'un sarayına, Prag'a taşındı ve 1600'de yanına genç bir matematikçi aldı: <strong>Johannes Kepler</strong>. Tycho verilerini titizlikle koruyordu; Kepler'e çözmesi için tek bir gezegen verdi: yörüngesi, iyi gözlenebilen gezegenler arasında çemberden en belirgin biçimde sapan Mars. Tycho Ekim 1601'de öldü; Kepler imparatorluk matematikçisi oldu ve kayıtların tamamına ulaştı.",
    "Kepler'in işi sekiz günde bitireceğine dair iddiaya girdiği anlatılır; kendi deyişiyle 'Mars'la savaşı' yıllar sürdü. Önce çemberler ve eşit hız noktası (ekuant) üzerine kurulu, Tycho'nun karşı konum gözlemlerine iki yay dakikası içinde uyan bir model kurdu. Ama başka gözlemlerle arasında <strong>sekiz yay dakikalık</strong>, yani dolunayın dörtte biri kadar bir fark kaldı. Tycho'dan önceki gözlemlerle böyle bir fark ölçüm hatasının içinde kaybolurdu. Kepler farkı görmezden gelmeyi reddetti ve 1609'da yayımlanan <em>Astronomia Nova</em>'da (Yeni Astronomi), yalnızca bu sekiz dakikanın bütün astronominin yenilenmesine yol açtığını yazdı. Sonuç iki yasaydı ve tuhaf bir sırayla bulunmuştu: Kepler önce eşit alanlar kuralına, ancak daha sonra yörüngenin elips olduğuna ulaştı.",
    "Üçüncü yasa bambaşka bir kitapta, gezegen hareketlerini müzik aralıklarıyla ilişkilendiren <em>Harmonices Mundi</em>'de (Dünyanın Uyumu, 1619) yer aldı: Kepler, dolanma sürelerinin karesinin Güneş'e ortalama uzaklıkların küpüyle orantılı olduğunu 1618'de bulmuştu. Yasalar doğruydu ama arkalarındaki fizik değil: Kepler gezegenleri Güneş'ten yayılan, mıknatısa benzer bir itici gücün sürüklediğini düşünüyordu. Açıklama Newton'dan geldi. Anlatılana göre 1684'te Edmond Halley, Newton'a ters kare bir çekim altında gezegenin hangi eğriyi çizeceğini sordu; Newton 'elips' dedi ve bunu hesapladığını söyledi. Bu hesap 1687'de <em>Principia</em>'ya dönüştü: üç yasa artık gözlemden çıkarılmış kurallar değil, hareket yasaları ile evrensel kütleçekimin sonuçlarıydı. Newton üçüncü yasadaki sabitin merkezdeki kütleye bağlı olduğunu da gösterdi ve bunu, uyduları olan gezegenleri tartmak için kullandı.",
    "Hikâyenin bir de efsane tarafı var. Kepler'in kaydına göre Tycho, Prag'daki bir ziyafette görgü kuralları yüzünden sofradan kalkmadı; aynı gece idrarını yapamaz hâle geldi ve on bir gün sonra, 24 Ekim 1601'de öldü. 'Mesanesi patladı' anlatısı ise sonradan yerleşmiş, kanıtlanmamış bir yorumdur. Daha sonra Tycho'nun cıvayla zehirlendiği, hatta Kepler'in onu verilere ulaşmak için öldürdüğü ileri sürüldü. 2010'da mezarı açılıp kemik ve saç örnekleri incelendi; araştırmacılar öldürücü düzeyde cıva bulmadı. Elimizdeki kanıt, cinayet suçlamasını desteklemiyor.",
  ],
  core: [
    {
      heading: "Birinci yasa: Güneş ortada değil, odakta",
      body: "Bir ipin iki ucunu iki raptiyeye bağla, ipi kalemle gergin tutup dolaş: çizdiğin eğri bir elipstir. Raptiyeler elipsin <strong>odaklarıdır</strong>; eğrinin her noktasından iki odağa uzaklıkların toplamı ipin boyuna, 2a'ya eşittir. Güneş bir odakta durur, öteki odak boştur. Basıklığı <strong>eksantriklik</strong> (e) ölçer: e = 0 çemberdir, e 1'e yaklaştıkça elips incelir. Gezegenlerde e küçüktür; asıl göze çarpan, Güneş'in elipsin merkezinden a·e kadar kaymasıdır. Sayfada Merkür'ü (e = 0.206) seç: Güneş belirgin biçimde merkezin sağındadır, boş odak solda küçük beyaz bir halkadır. Venüs'te ve Dünya'da kayma birkaç pikseli geçmez; halka ya hiç çizilmez ya da Güneş'in ışıltısının altında kalır. Kaydırıcının en büyük değeri olan 0.35'te bile küçük eksen, büyük eksenin yüzde 94'üdür. Halley Kuyruklu Yıldızı'nda ise e ≈ 0.967'dir: günötesi, günberisinden yaklaşık 60 kat uzaktır.",
      formula:
        "r<sub>min</sub> = a(1 − e) · r<sub>max</sub> = a(1 + e) · b = a√(1 − e²)",
      formulaNote:
        "Merkür için (a = 0.387 AU, e = 0.206) günberi 0.307 AU, günöte 0.467 AU'dur; sayfadaki r göstergesi bu iki değer arasında gidip gelir.",
    },
    {
      heading: "İkinci yasa: eşit zamanda eşit alan",
      body: "Güneş'ten gezegene çekilen çizgi eşit sürelerde eşit alanlar tarar. Güneş'e yakınken çizgi kısadır; aynı alanı taramak için gezegenin daha uzun bir yay koşması, yani hızlanması gerekir. Kepler bunu gözlemden çıkardı, nedeni Newton'la anlaşıldı: Güneş'in çekimi hep Güneş'e doğru olduğu için gezegeni döndürecek bir tork uygulamaz ve <strong>açısal momentum</strong> korunur. Alan tarama hızı açısal momentumla orantılı olduğundan o da sabittir. Bu yüzden ikinci yasa yalnız kütleçekiminde değil, her merkezî kuvvette geçerlidir.",
      formula:
        "dA/dt = L/(2m) = sabit ⇒ r<sub>min</sub>·v<sub>max</sub> = r<sub>max</sub>·v<sub>min</sub>",
      formulaNote:
        "Uç noktalarda hız yarıçapa diktir; bu yüzden hız oranı uzaklık oranının tersidir. Merkür'de 0.467/0.307 ≈ 1.52.",
    },
    {
      heading: "Üçüncü yasa: süreyi boyut belirler",
      body: "Periyodun karesi yarı büyük eksenin küpüyle orantılıdır. Birim olarak yılı ve astronomik birimi (AU) seçersen Güneş çevresindeki her cisim için orantı sabiti 1 olur: a = 4 AU ise T² = 64 ve T = 8 yıl. Formülde e yoktur; aynı a'ya sahip bir çember ile basık bir elips aynı sürede dolanılır. Newton'un genel biçiminde sabit merkezdeki kütleyi içerir; bir uydunun periyodunu ve yörünge boyutunu ölçmek, merkezdeki gök cismini tartmak demektir. Çift yıldızların kütleleri bu yolla ölçülür; ötegezegen araştırmalarında ise yıldızın kütlesi bilindiğinde periyottan yörünge boyutu bulunur.",
      formula: "T² = a³ (yıl, AU) · T² = 4π²a³ / (G·M)",
      formulaNote:
        "Kesin biçimde M yerine M + m yazılır. Jüpiter'in kütlesi bile Güneş'inkinin yaklaşık binde biri olduğundan periyottaki düzeltme on binde beş civarındadır.",
    },
    {
      heading: "Hız uzaklığa bağlı: vis-viva denklemi",
      body: "Sayfadaki v göstergesi, enerji korunumundan çıkan <strong>vis-viva</strong> (Latince 'canlı kuvvet') denklemini kullanır. Kinetik enerji ile kütleçekim potansiyel enerjisinin toplamı yörünge boyunca sabittir ve yalnızca a'ya bağlıdır; gezegen Güneş'e yaklaşınca potansiyel enerji azalır, kinetik enerji artar. Güneş için √(GM/1 AU) ≈ 29.78 km/s'dir: 1 AU yarıçaplı bir çember yörüngedeki hız. Gezegen Güneş'ten tam a uzaklıktayken (küçük eksenin uçlarında) hızı, aynı a'lı çember yörüngedeki hıza eşittir.",
      formula: "v = 29.78·√(2/r − 1/a) km/s (r ve a AU cinsinden)",
      formulaNote:
        "Genel biçimi v² = GM(2/r − 1/a). Merkür günberide 59.0, günötede 38.8 km/s; Mars 26.5 ve 22.0 km/s.",
    },
    {
      heading: "Kepler denklemi: sayfanın motoru",
      body: "Eşit alanlar yasası 'gezegen t anında nerede?' sorusunu bir denkleme çevirir. <strong>Ortalama anomali</strong> M zamanla düzgün artar (M = 2πt/T); <strong>eksantrik anomali</strong> E ise gezegenin elips üzerindeki yerini verir. İkisini Kepler denklemi bağlar, ama E'yi M cinsinden sonlu bir formülle yazmak mümkün değildir. Sayfa bu yüzden Newton yöntemini kullanır: E = M tahminiyle başlar ve E ← E − (E − e·sin E − M)/(1 − e·cos E) düzeltmesini sekiz kez uygular; e ≤ 0.35 için dört adım bilgisayarın duyarlılık sınırına ulaşmaya yeter. Güneş'ten bakınca taranan alan M ile doğru orantılı olduğundan, turkuaz bölge kendiliğinden hep elipsin sekizde biri çıkar.",
      formula: "M = E − e·sin E · x = a(cos E − e), y = b·sin E",
      formulaNote:
        "x ve y, Güneş'i başlangıç alan koordinatlardır; E = 0 günberi, E = π günöte.",
    },
  ],
  lab: {
    intro:
      "Sayfada her yörünge aynı piksel boyutunda çizilir; gezegenler arasındaki fark büyüklükte değil hızda görünür. Ekranda 1 yıl yaklaşık 6 saniyedir: Merkür bir turu 1.4 s'de, Mars 11.3 s'de atar. <strong>Gezegen</strong> menüsü a'yı seçer ve e'yi o gezegenin gerçek değerine döndürür; <strong>Eksantriklik (e)</strong> kaydırıcısı (0–0.35) yalnızca biçimi değiştirir, a'ya ve T'ye dokunmaz. Sol üstte e, a, T, r ve v okunur; turkuaz bölge son T/8 sürede taranan alandır, kırmızı ok hızı gösterir. Okun boyu, o gezegenin aynı a'lı çember yörüngedeki hızına göre ölçeklidir; bu yüzden iki gezegenin okları karşılaştırılamaz, gezegenleri karşılaştırırken v değerini oku. Alttaki T²/a³ satırı ölçüm değildir: sayfa T'yi a<sup>1.5</sup>'ten hesapladığı için hep 1.00 gösterir. Menüden gezegen seçmek ya da kaydırıcıyı oynatmak gezegeni günberiye (sağ uç) taşır; bu, ölçümde işine yarar.",
    experiments: [
      {
        title: "Merkür'ün günberi ve günöte hızı",
        predict:
          "Merkür günöteden günberiye inerken Güneş'e uzaklığı 0.467 AU'dan 0.307 AU'ya düşer. Hızı kaç katına çıkar: 1.2 mi, 1.5 mi, 2.3 mü?",
        do: "<strong>⏸ Duraklat</strong>'a bas. Gezegen menüsünden önce Venüs'ü, sonra Merkür'ü seç: gezegen tam günberiye yerleşir. Sol üstteki r ve v'yi yaz. Sonra <strong>▶ Oynat</strong>'a bas ve gezegen soldaki Günöte etiketine vardığında yeniden duraklat. Merkür turu 1.4 saniyede attığı için birkaç deneme gerekebilir.",
        observe:
          "Günberide r = 0.307 AU, v ≈ 59.0 km/s. Günöteye yakın duraklattığında r 0.46 ile 0.467 AU, v 38.8 ile 39.5 km/s arasında okunur (tam günötede 38.8). Hız oranı yaklaşık 1.52; kırmızı ok da günberide belirgin biçimde uzundur.",
        explain:
          "Uç noktalarda hız yarıçapa diktir ve açısal momentum korunur, yani r·v sabittir: 0.307 × 59.0 ≈ 0.467 × 38.8 ≈ 18.1. Hız oranı, uzaklık oranının tam tersidir: 0.467/0.307 ≈ 1.52.",
      },
      {
        title: "Mars'ı basıklaştır, kronometreyle ölç",
        predict:
          "Mars'ın yörüngesini e = 0.35'e kadar basıklaştırırsan gezegen turun yüzde kaçını Güneş'in sağında (günberi tarafında) geçirir? Yarısını mı, daha azını mı?",
        do: "Menüden Mars'ı seç, <strong>Eksantriklik (e)</strong> kaydırıcısını en sağa (0.350) çek. Gezegen ekranda saat yönünün tersine döner. Telefon kronometresiyle iki süre ölç: gezegenin Güneş'in tam altından geçip günberiden dolanarak tam üstüne varması, oradan günöteyi dolanıp yeniden alta dönmesi. Bir kez de duraklatıp turkuaz bölgenin biçimine bak.",
        observe:
          "Sağ kısım yaklaşık 3.2 s, sol kısım yaklaşık 8.1 s sürer; toplam 11.3 s, yani 1.881 yıllık periyot. Gezegen turun yalnızca yüzde 28'ini Güneş'in sağında geçirir. Turkuaz alan günberide kısa ve geniş, günötede uzun ve dardır; r 0.991 ile 2.057 AU, v 34.8 ile 16.7 km/s arasında değişir.",
        explain:
          "Turkuaz alan her an elipsin sekizde biridir: eşit zamana eşit alan düşer. Güneş'in sağındaki bölgenin alanı küçük olduğu için gezegen orayı çabuk geçer; oran (arccos e − e√(1 − e²))/π ≈ 0.28. Gerçek Mars'ta (e = 0.093) bu oran 0.44'tür; küçük ama Tycho'nun verisinde görülebilen bir fark.",
      },
      {
        title: "Biçim değişir, süre değişmez",
        predict:
          "Dünya'nın yörüngesini çemberden (e = 0) epey basık bir elipse (e = 0.35) çevirirsen bir yıl uzar mı, kısalır mı? Günberideki hız ne olur?",
        do: "Menüden Dünya'yı seç. <strong>Eksantriklik (e)</strong> kaydırıcısını 0'a çekip bir tur izle, sonra 0.35'e çekip bir tur daha izle. Her seferinde sol üstteki T satırını, r ve v'nin hangi aralıkta gezindiğini not et ve bir turu kronometreyle ölç.",
        observe:
          "T iki durumda da 1.000 yıl (365 gün) ve tur yaklaşık 6 saniye sürer. e = 0'da r hep 1.000 AU, v hep 29.8 km/s'dir. e = 0.35'te r 0.650 ile 1.350 AU, v 42.9 ile 20.7 km/s arasında gidip gelir. Gerçek Dünya (e = 0.017) için aralık 0.983–1.017 AU ve 30.3–29.3 km/s'dir.",
        explain:
          "Üçüncü yasada e yoktur: periyodu yalnızca a belirler. Basık yörüngede gezegen günberide kazandığı zamanı günötede yavaş ilerleyerek geri verir. Toplam enerji de yalnızca a'ya bağlıdır; vis-viva denkleminde e görünmez.",
      },
      {
        title: "Dört gezegen, tek kural",
        predict:
          "Mars, Güneş'ten Dünya'nın 1.524 katı uzakta. Bir Mars yılı kaç Dünya günüdür? T = a<sup>1.5</sup> ile hesapla; Merkür ve Venüs için de dene.",
        do: "Gezegen menüsünden sırayla Merkür, Venüs, Dünya ve Mars'ı seç. Her birinde sol üstteki T satırını kaydet ve bir turun ekranda kaç saniye sürdüğünü ölç. Alttaki T²/a³ satırına da bak.",
        observe:
          "Merkür 0.241 yıl (88 gün), Venüs 0.615 yıl (225 gün), Dünya 1.000 yıl (365 gün), Mars 1.881 yıl (687 gün). Ekranda turlar yaklaşık 1.4, 3.7, 6.0 ve 11.3 saniye sürer. T²/a³ hep 1.00 gösterir.",
        explain:
          "Sayfa T'yi zaten a<sup>1.5</sup>'ten hesaplar; 1.00 bir ölçüm değil, yasanın uygulanmış hâlidir. Asıl sınama gözlemdir: yıldızlara göre ölçülen dolanma süreleri 87.97, 224.70, 365.26 ve 686.98 gündür ve sayfanın değerleriyle bir günden az farkla örtüşür. Jüpiter'de (a = 5.20 AU, T = 11.86 yıl) de oran 1.00 çıkar.",
      },
    ],
  },
  wow: [
    {
      title: "Kuzeyin yaz yarıyılı, kış yarıyılından bir hafta uzun",
      body: "Dünya ocak başında günberidedir (yaklaşık 147.1 milyon km), temmuz başında günötede (yaklaşık 152.1 milyon km). İkinci yasa gereği günöte tarafında daha yavaş ilerler. Bu yüzden kuzey yarımkürede mart ekinoksundan eylül ekinoksuna kadar geçen 'yaz yarıyılı' yaklaşık 186 gün, eylülden marta dönen 'kış yarıyılı' yaklaşık 179 gün sürer. Fark tek bir mevsimde toplanmaz: astronomik yaz (haziran gündönümünden eylül ekinoksuna) kıştan yalnızca 4.7 gün kadar uzundur, kalanı ilkbahardan gelir. Takvimde mart ve eylül ekinoksları arasındaki günleri say: Kepler'in ikinci yasasını kendin ölçmüş olursun.",
    },
    {
      title: "Mars yolculuğunu üçüncü yasa hesaplar",
      body: "Dünya'dan Mars'a en az yakıtla gitmenin yolu, günberisi Dünya'nın (1 AU), günötesi Mars'ın (1.524 AU) yörüngesine değen bir elipstir: <strong>Hohmann transfer yörüngesi</strong>. Yarı büyük ekseni 1.262 AU, periyodu 1.262<sup>1.5</sup> ≈ 1.42 yıldır; yolculuk bu elipsin yarısıdır, yaklaşık 259 gün (çember yörünge yaklaşımıyla). Curiosity gezgini 26 Kasım 2011'de fırlatılıp 6 Ağustos 2012'de Mars'a indi: 254 gün.",
    },
    {
      title: "Merkür'ün 43 yay saniyelik sırrı",
      body: "Merkür'ün elipsi yerinde durmaz; günberi noktası Güneş çevresinde yavaşça döner. Bu dönüşün büyük kısmı öteki gezegenlerin çekimiyle açıklanır, ama Urbain Le Verrier 19. yüzyılın ortasında Newton kuramının açıklayamadığı küçük bir artık buldu: bugünkü değeriyle yüzyılda yaklaşık 43 yay saniyesi. Bazı gökbilimciler Güneş'e daha yakın, görünmeyen bir gezegen (Vulkan) aradı; bulunamadı. 1915'te Einstein bu artığı genel görelilikle hesaplayarak açıkladı.",
    },
  ],
  worked: {
    title: "Mars'ın günberi ve günöte hızları",
    prompt:
      "Mars için a = 1.524 AU ve e = 0.093. Günberi ve günöte uzaklıklarını, bu noktalardaki hızları ve yörünge periyodunu bul; sonucu açısal momentumla denetle. Güneş için √(GM/1 AU) = 29.78 km/s al.",
    steps: [
      "Uç uzaklıklar: r<sub>min</sub> = a(1 − e) = 1.524 × 0.907 ≈ 1.382 AU; r<sub>max</sub> = a(1 + e) = 1.524 × 1.093 ≈ 1.666 AU. 1 AU ≈ 149.6 milyon km olduğundan bunlar yaklaşık 206.8 ve 249.2 milyon km'dir.",
      "Günberi hızı (vis-viva): v = 29.78 km/s × √(2/1.382 − 1/1.524) = 29.78 × √(1.447 − 0.656) = 29.78 × √0.791 ≈ 29.78 × 0.889 ≈ 26.5 km/s.",
      "Günöte hızı: v = 29.78 km/s × √(2/1.666 − 0.656) = 29.78 × √(1.200 − 0.656) = 29.78 × √0.544 ≈ 29.78 × 0.738 ≈ 22.0 km/s.",
      "Denetim: uç noktalarda r·v aynı olmalı. 1.382 AU × 26.5 km/s ≈ 36.62 AU·km/s; 1.666 AU × 22.0 km/s ≈ 36.65 AU·km/s. Fark yuvarlamadan gelir. Periyot: T = 1.524<sup>1.5</sup> = √3.540 ≈ 1.881 yıl; 1.881 × 365.25 ≈ 687 gün.",
      "Sayfada dene: <strong>⏸ Duraklat</strong>'a bas, menüden başka bir gezegen, ardından Mars'ı seç. Gezegen günberiye yerleşir ve sol üstte r = 1.382 AU, v ≈ 26.5 km/s, T = 1.881 yıl (687 gün) okunur.",
    ],
    result:
      "Mars günberide yaklaşık 26.5 km/s (saatte 95 000 km'nin üzerinde), günötede 22.0 km/s hızla yol alır; hız oranı 1.205, uzaklık oranının tam tersidir. Bir Mars yılı 687 gündür ve bu sayı e'ye değil yalnızca a'ya bağlıdır.",
  },
  misconceptions: [
    {
      myth: "Yazın sıcak olması, Dünya'nın o mevsimde Güneş'e daha yakın olmasındandır.",
      truth:
        "Tam tersi: Dünya Güneş'e en çok ocak başında, kuzey yarımkürede kışın ortasında yaklaşır. Uzaklık yıl boyunca yalnızca yüzde 3.4 değişir; bu, Dünya'ya ulaşan ışınımda yaklaşık yüzde 7'lik bir fark yaratır. Mevsimleri Dünya'nın 23.4°'lik eksen eğikliği yaratır: güneş ışınlarının geliş açısı ve gün uzunluğu değişir. Kanıtı basit: ocakta Avustralya'da yaz yaşanır.",
    },
    {
      myth: "Gezegen yörüngeleri, ders kitabı çizimlerindeki gibi belirgin biçimde basıktır.",
      truth:
        "Çizimler basıklığı abartır. Dünya'nın yörüngesini 10 cm genişliğinde çizseydin büyük eksenle küçük eksen arasındaki fark yaklaşık 0.014 mm olurdu; bir saç teli bunun birkaç katı kalındır. Görülebilecek tek şey, Güneş'in merkezden yaklaşık 0.85 mm kaymasıdır. Sayfada önce Dünya'yı seç: yörünge çember gibi durur, Güneş yalnızca birkaç piksel kayar. Sonra Merkür'ü seç: Güneş belirgin biçimde merkezin sağındadır, boş odağın halkası solda açıkça görünür.",
    },
    {
      myth: "Gezegen yörüngesinde sabit süratle ilerler.",
      truth:
        "Eşit zamanda eşit yay değil, eşit alan taranır. Merkür günberide saniyede 59 km, günötede 39 km yol alır. Sayfada Merkür'ü seç ve turkuaz bölgeyi bir tur izle: günberide kısa ve geniş, günötede uzun ve dardır ama tur boyunca alanı aynı kalır; kırmızı ok da günberide uzar, günötede kısalır. Kaydırıcıyla e'yi değiştirmek ise elipsin kendisini değiştirir: e = 0.35'te elips, dolayısıyla turkuaz alan, çembere göre yüzde 6 kadar küçüktür.",
    },
    {
      myth: "Ağır gezegenler Güneş'in çevresini daha yavaş dolanır.",
      truth:
        "Periyot neredeyse yalnızca a'ya ve Güneş'in kütlesine bağlıdır; gezegenin kendi kütlesi, serbest düşmede olduğu gibi sadeleşir. Kesin formüldeki M + m terimi Jüpiter için bile periyodu yalnızca on binde beş kadar değiştirir. Dünya'dan 318 kat ağır Jüpiter'in 12 yıllık turu ağırlığından değil, Güneş'ten 5.2 AU uzakta olmasından gelir.",
    },
  ],
  glossary: [
    {
      term: "Eksantriklik (e)",
      definition:
        "Elipsin çemberden ne kadar saptığını gösteren e = c/a oranı (c, merkezle odak arasındaki uzaklık): e = 0 çember, 0 ile 1 arasındaki her e kapalı bir elips demektir.",
    },
    {
      term: "Yarı büyük eksen (a)",
      definition:
        "Elipsin en uzun çapının yarısı; günberi ve günöte uzaklıklarının ortalaması, a = (r<sub>min</sub> + r<sub>max</sub>)/2.",
    },
    {
      term: "Odak",
      definition:
        "Büyük eksen üzerindeki iki özel noktadan biri; elipsin her noktasından iki odağa uzaklıkların toplamı 2a'dır.",
    },
    {
      term: "Günberi ve günöte",
      definition:
        "Yörüngede Güneş'e en yakın (a(1 − e)) ve en uzak (a(1 + e)) noktalar.",
    },
    {
      term: "Astronomik birim (AU)",
      definition:
        "Tam olarak 149 597 870 700 metre olarak tanımlanan uzunluk birimi; kabaca Dünya ile Güneş arasındaki ortalama uzaklık.",
    },
    {
      term: "Ortalama anomali (M)",
      definition:
        "Günberiden ölçülen ve zamanla düzgün artan açı, M = 2πt/T; gezegen çember üzerinde sabit hızla dönseydi alacağı açı.",
    },
    {
      term: "Eksantrik anomali (E)",
      definition:
        "Gezegenin elips üzerindeki yerini elipsi çevreleyen yardımcı çember üzerinden veren açı; Kepler denklemiyle M'ye bağlanır.",
    },
    {
      term: "Açısal momentum (L)",
      definition:
        "Bir cismin bir merkez çevresindeki dönme hareketinin ölçüsü, L = m·r·v<sub>⊥</sub>; merkezî kuvvet altında korunur ve eşit alanlar yasasını verir.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede Kepler yasaları ezberlenmez, türetilir. İki cisim problemi <strong>indirgenmiş kütle</strong> yöntemiyle tek cisim problemine iner; merkezî kuvvette açısal momentum korunur ve ikinci yasa kendiliğinden çıkar. Kuvvet tam olarak 1/r² ise yörünge, kutupsal koordinatlarda r = p/(1 + e·cos θ) olur: e < 1 elips, e = 1 parabol, e > 1 hiperbol. Kepler'in elipsleri, Newton'un izin verdiği yörüngelerden yalnızca bağlı olanlarıdır, yani Güneş'ten kaçamayanlar. Ters kare kuvvetin gizli bir simetrisi de vardır: Laplace–Runge–Lenz vektörü korunur ve elips yerinde durur. Merkür'ün günberi kayması, gerçek kuvvetin tam ters kare olmadığını gösteren işaretlerden biridir.",
      "Pratikte bir yörüngeyi altı sayı (<em>yörünge elemanları</em>) tanımlar ve 'gezegen yarın nerede?' sorusu, bu sayfadaki gibi Kepler denklemini Newton–Raphson yöntemiyle çözmeye varır. Uydu yörüngeleri, Hohmann transferleri ve kütleçekim yardımıyla hızlanma aynı denklemlerin mühendislik hâlidir. Birden fazla gezegen işin içine girince kapalı çözüm biter: N cisim problemi ya pertürbasyon kuramıyla ya da sayısal integrasyonla çözülür. NASA'nın Kepler uzay teleskobu da bu yasalara dayandı: bir yıldızın önünden düzenli aralıklarla geçen gezegenin periyodu, üçüncü yasayla yörünge boyutuna çevrilir.",
    ],
    topics: [
      "İki cisim problemi ve indirgenmiş kütle",
      "Merkezî kuvvetler ve açısal momentum",
      "Konik kesitler ve kutupsal koordinatlar",
      "Yörünge elemanları",
      "Newton–Raphson yöntemi",
      "Hohmann transferi",
      "N cisim problemi ve pertürbasyon",
      "Genel görelilik ve günberi kayması",
    ],
  },
  quiz: [
    {
      question:
        "Bir kuyruklu yıldız Güneş'in yanına her 27 yılda bir geri dönüyor. Yörüngesinin yarı büyük ekseni kaç AU'dur?",
      options: ["3 AU", "9 AU", "27 AU", "140 AU"],
      answer: 1,
      explanation:
        "Yıl ve AU biriminde T² = a³: 27² = 729 ve ∛729 = 9. 3 AU, T'nin karesini almayı unutmaktan (∛27); 27 AU, T ile a'yı eşit sanmaktan; 140 AU, yasayı ters çevirmekten (a² = T³, a = 27<sup>1.5</sup>) doğar. Denetim: 9<sup>1.5</sup> = 9 × √9 = 27.",
    },
    {
      question:
        "Merkür'ün günöte uzaklığı (0.467 AU), günberi uzaklığının (0.307 AU) yaklaşık 1.52 katıdır. Günberideki hızı günötedekinin kaç katıdır?",
      options: [
        "Aynı; yörünge hızı sabittir",
        "Yaklaşık 1.23 (√1.52)",
        "Yaklaşık 1.52",
        "Yaklaşık 2.31 (1.52²)",
      ],
      answer: 2,
      explanation:
        "Uç noktalarda hız yarıçapa diktir ve açısal momentum korunur: r<sub>min</sub>·v<sub>max</sub> = r<sub>max</sub>·v<sub>min</sub>. Hız oranı uzaklık oranının tersidir: 59.0/38.8 ≈ 1.52. Karekök, farklı çember yörüngeleri karşılaştırırken çıkar (v ∝ 1/√r); aynı elipsin iki ucunda oran doğrudandır.",
    },
    {
      question:
        "Sayfada Dünya seçiliyken Eksantriklik (e) kaydırıcısını 0'dan 0.35'e çekiyorsun. Hangisi değişmez?",
      options: [
        "Günberi uzaklığı r",
        "Günberideki hız v",
        "Dolanma süresi T",
        "Turkuaz bölgenin biçimi",
      ],
      answer: 2,
      explanation:
        "Üçüncü yasa periyodu yalnızca yarı büyük eksene bağlar. Kaydırıcı a'yı değiştirmediği için T 1.000 yıl kalır ve tur yine yaklaşık 6 saniye sürer. Günberi 0.650 AU'ya yaklaşır, oradaki hız 42.9 km/s'ye çıkar; turkuaz bölgenin biçimi değişir ama alanı her an (yeni) elipsin sekizde biridir.",
    },
  ],
  next: [
    {
      href: "konik-kesitler.html",
      title: "Konik Kesitler",
      why: "Ters kare çekimin izin verdiği bütün yörüngeler. Odak ve doğrultman sekmesinde e'yi değiştir, r = ℓ/(1 + e cos θ) eğrisinin çemberden parabole ve hiperbole açılışını izle; Dünya ve Halley düğmeleri iki yörüngeyi aynı ölçekte çizer.",
    },
    {
      href: "dairesel-hareket.html",
      title: "Dairesel Hareket",
      why: "e = 0 özel durumu. Orada F = mv²/r'yi kaydırıcılarla dene; sonra bu kuvveti GMm/r²'ye eşitle: T² ∝ r³, yani üçüncü yasa, iki satırda çıkar.",
    },
    {
      href: "ay-evreleri.html",
      title: "Ay Evreleri ve Mevsimler",
      why: "Mevsimlerin gerçek nedenini gör: Dünya'yı yörüngede dolaştır, eksen eğikliğinin yazı ve kışı nasıl yarattığını izle.",
    },
    {
      href: "gunes-sistemi.html",
      title: "Güneş Sistemi",
      why: "3B modelde uzaklıklar ölçekli değil ama dolanma süreleri gerçek oranlarda: Jüpiter'in Dünya'dan ne kadar yavaş döndüğünü izle, 5.2 AU'dan 12 yılı üçüncü yasayla hesapla.",
    },
  ],
  sources: [
    {
      title:
        "OpenStax · University Physics Vol. 1, 13.5 Kepler's Laws of Planetary Motion",
      url: "https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion",
      note: "Üç yasanın Newton kütleçekiminden türetilişi, yörünge enerjisi ve çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title: "NASA Science · Orbits and Kepler's Laws",
      url: "https://science.nasa.gov/resource/orbits-and-keplers-laws/",
      note: "Tycho, Kepler ve Newton'un hikâyesi; yasaların görsel anlatımı (İngilizce).",
    },
    {
      title: "HyperPhysics · Kepler's Laws",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/kepler.html",
      note: "Elips geometrisi, alanlar yasası ve periyot bağıntısı için kısa, formül odaklı özet.",
    },
    {
      title: "Vikipedi · Kepler'in gezegensel hareket yasaları",
      url: "https://tr.wikipedia.org/wiki/Kepler%27in_gezegensel_hareket_yasalar%C4%B1",
      note: "Türkçe genel bakış ve tarihçe.",
    },
  ],
  revision: "Ekim 2026",
};
