window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["takvimler-ve-zaman-olcumu"] = {
  slug: "takvimler-ve-zaman-olcumu",
  title: "Takvimler: Gün, Ay ve Yılın Pazarlığı",
  field: "Tarih ve Toplum",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Gün, ay ve yıl birbirine tam bölünmez; her takvim bu artığı bir kuralla saklar. Kuralları kur, hatalarını ölç, bir belgedeki tarihi tarihçi gibi oku.",
  hook:
    "Eylül 1752'de bir Londralı 2 Eylül Çarşamba gecesi yattı, ertesi sabah 14 Eylül Perşembe'ye uyandı: on bir tarih takvimden silinmişti, ama hafta bir gün bile kesilmemişti. Bir devlet neden takvimden günleri siler, ve aynı gün nasıl iki ayrı tarih taşıyabilir?",
  bigIdea:
    "Gökteki üç saat, gün, ay ve yıl, tam sayı oranında değildir; her takvim bu oranlara bir <strong>kesirle yaklaşır</strong> ve hatasını biriktirir, tarihçi de bir tarihi ancak hangi kuralla yazıldığını bilerek çevirebilir.",
  story: [
    "Roma'nın eski takvimi mevsimlerden o kadar kopmuştu ki Julius Caesar MÖ 46'da işe tek bir uzun yılla başladı: 445 gün süren bu yıla sonradan \"son karışıklık yılı\" dendi. Yeni takvim 1 Ocak MÖ 45'te yürürlüğe girdi; Plinius'a göre reforma İskenderiyeli gökbilimci Sosigenes yardım etti. Kural sadeydi: her dördüncü yıl bir artık gün. Ama rahipler ilk yıllarda artık günü dört yılda bir değil, üç yılda bir ekledi. Macrobius'un aktardığına göre bu 36 yıl sürdü, dokuz yerine on iki artık gün eklendi; Augustus fazlayı silmek için on iki yıl boyunca artık gün koydurmadı.",
    "Jülyen yılı ortalama 365,25 gündür, mevsim yılından yılda on bir dakika kadar uzun. Yüzyıllar içinde ilkbahar ılımı takvimde geriye kaydı ve Paskalya hesabı gökten koptu. 1545'te Trento Konsili Papa III. Paulus'a reform yetkisi verdi. Sonunda kabul edilen öneri Kalabriyalı hekim Aloysius Lilius'undu: 400 yılda 100 yerine 97 artık gün. Matematikçi Christopher Clavius öneriyi geliştirip savundu. Papa XIII. Gregorius'un <em>Inter gravissimas</em> bulgusu 24 Şubat 1582 tarihlidir: 4 Ekim 1582 Perşembe'yi 15 Ekim 1582 Cuma izledi.",
    "Reform bir buyruktu ama her devlet onu kendi zamanında benimsedi. Fransa aynı yılın Aralık'ında geçti. Britanya ve kolonileri 1752'de geçti: 1750 tarihli Takvim Yasası hem Gregoryen günleri getirdi hem yılbaşını 25 Mart'tan 1 Ocak'a aldı. İsveç aşamalı bir geçiş denedi, işi yürütemeyince Jülyen takvime dönmek için 1712'de bir kez 30 Şubat'ı yaşadı ve ancak 1753'te geçti. Rusya'da 31 Ocak 1918 Çarşamba'yı 14 Şubat Perşembe izledi; Doğu Ortodoks Avrupa'da son ülke, 1923'te yalnız dünyevi işler için geçen Yunanistan oldu.",
    "Osmanlı maliyesi Mart'ta başlayan bir yılı çok daha önce kullanıyordu: TDV İslâm Ansiklopedisi'ne göre bu malî yıl 1677 tarihli bir fermanla başlatılmıştı ve yıl sayısı Hicrî yılla bir tutulduğu için yaklaşık 33 yılda bir malî yıl atlanırdı (\"sıvış\"). 1840'ta malî işler için <strong>Rumî</strong> takvim kabul edildi: 1 Mart 1256, Gregoryen 13 Mart 1840'tır. Günler Jülyen'di, yıl sayısı ise o günkü Hicrî yıldan alınıp güneş yılıyla ilerledi; İngilizce Vikipedi farkın bundan sonra hep 584 kaldığını, TDV ise 1288 malî yılının sıvışla atlandığını yazar, yani iki anlatım bu noktada ayrışır. 1917'deki düzenlemeyle (Türkçe kaynaklarda 8 Şubat 1332 tarihli, 125 sayılı kanun) 15 Şubat 1332'yi 1 Mart 1333 izledi; günler Gregoryen'e bağlandı, 1918'den itibaren yıl Ocak'ta başladı. Son adım 698 sayılı Kanun'du: 31 Kânunuevvel 1341'i izleyen gün 1 Kânunusani 1926 sayıldı ve kanun 2 Ocak 1926'da Resmî Ceride'de yayımlandı. Aynı kanunun üçüncü maddesi Hicrî kamerî takvimin özel işlerde eskisi gibi kullanılacağını, ay başlarını rasathanenin resmen tespit edeceğini söyler. Kanunun altında iki tarih yan yana durur: \"26 kânunuevvel 1341 ve 9 cemaziyelâhir 1344\". Laboratuvarda göreceğin gibi, aritmetik Hicrî tablo bu güne 10 Cemaziyelahir der; gözlem ile kural arasındaki bir günlük fark tarihçinin günlük işidir.",
  ],
  core: [
    {
      heading: "Gökteki üç saat",
      body:
        "Gün Dünya'nın dönüşünden, ay Ay'ın evrelerinden, yıl mevsimlerden gelir ve bunlar birbirinden bağımsız hareketlerdir. <strong>Ortalama tropik yıl</strong> (ortalama Güneş'in ılım noktasına göre bir dolanımı) J2000 için 365,2421897 gün, <strong>ortalama sinodik ay</strong> (yeni aydan yeni aya) 29,530588861 gündür. Takvimin \"günü\" Güneş'e göre ölçülür; Dünya'nın ılım noktasına (pratikte yıldızlara) göre bir dönüşü, <strong>yıldız günü</strong>, bundan kısadır. Neden? Dünya bir yılda Güneş'in çevresini bir kez dolandığı için yıldızlara göre bir yılda güneş günü sayısından bir fazla döner. Sayfanın ilk sekmesindeki sağlama bu tek satırlık akıl yürütmeyi ölçümle karşılaştırır: hesap 86 164,0905 s, kaynaktaki değer 86 164,0905 s, fark 0,0000 s.",
      formula: "yıldız günü = 86 400 s × Y / (Y + 1),  Y = 365,24217",
      formulaNote: "Y yıldaki ortalama güneş günü sayısıdır. Güneş günü ile yıldız günü arasındaki fark 3 dk 55,9095 s'dir.",
    },
    {
      heading: "Zincir kesirler ve Metonik döngü",
      body:
        "Ay ile yılı birlikte izleyen bir <strong>ayışık takvim</strong> Y yılda tam M ay sayıp döngüyü yineler; o hâlde M/Y, tropik yılın sinodik aya oranı olan 12,368266…'ya yakın olmalıdır. Bir gerçek sayıya en iyi kesirli yaklaşımları <strong>zincir kesir</strong> açılımı verir: tam kısmı ayır, kalanı ters çevir, tekrarla. Açılım [12; 2, 1, 2, 1, 1, 17, …] olur ve yaklaşımlar 12/1, 25/2, 37/3, 99/8, 136/11, 235/19, 4131/334 diye dizilir. 235/19, Meton'un MÖ 432'de Atina takvimine soktuğu döngüdür: 19 yılın 7'si on üç aylıktır. Sonraki terimin 17 gibi büyük bir sayı olması 235/19'un olağanüstü iyi bir yaklaşım olduğunu söyler; daha iyisi için 334 yıllık bir döngü gerekir. Babilliler 19 yıllık döngüyü MÖ 6. yüzyılın sonlarından beri kullanıyordu; bugün İbrani takviminin ve Paskalya hesabının iskeletidir.",
      formula: "235 × 29,530588861 − 19 × 365,2421897 ≈ +0,0868 gün ≈ +2,08 saat",
      formulaNote: "Döngü başına hata 2 saati biraz geçer; bir günlük kayma 19 × 24 / 2,08 ≈ 219 yıl sürer.",
    },
    {
      heading: "Artık yıl kuralı bir kesirdir",
      body:
        "Güneş takvimi yalnız yılın gün kesrine, 0,2421897'ye yaklaşmak zorundadır. \"a'ya bölünen yıl artık, b'ye bölünen değil, c'ye bölünen yine artık\" kuralının ortalama yılı 365 + 1/a − 1/b + 1/c'dir. Jülyen kural 1/4 = 0,25 alır ve yılda yaklaşık 11 dakika fazla sayar. Gregoryen kural 97/400 = 0,2425 alır: ortalama tropik yıldan yılda yaklaşık 27 saniye uzundur. İlginç olan, 97/400'ün gün kesrinin zincir kesir yaklaşımlarından biri olmamasıdır (onlar 1/4, 7/29, 8/33, 31/128, 845/3489 …); Lilius'un kesri yüzyıllara bölünebildiği, yani uygulanması kolay olduğu için seçildi. Hangi kuralın \"en iyi\" olduğu neye göre ölçtüğüne de bağlıdır: Mart ılımından Mart ılımına geçen süre ortalama tropik yıldan biraz farklıdır ve Gregoryen kural ona daha yakındır.",
      formula: "ortalama yıl = 365 + 1/a − 1/b + 1/c   (Gregoryen: 365 + 1/4 − 1/100 + 1/400 = 365,2425 gün)",
      formulaNote: "Yıllık hata saniye olarak (ortalama yıl − hedef yıl) × 86 400; bir günlük kayma için 1 / |ortalama yıl − hedef yıl| yıl gerekir.",
    },
    {
      heading: "Her tarihi tek sayıya çevirmek: Jülyen gün numarası",
      body:
        "Takvimleri karşılaştırmanın en temiz yolu, her günü tek bir tamsayıyla adlandırmaktır. Joseph Scaliger 1583'te 7980 yıllık bir <strong>Jülyen dönemi</strong> önerdi; 19. yüzyılda önce kronoloji yazarı Ludwig Ideler (1825), sonra gökbilimci John Herschel (1849) bu dönemi bir gün sayımına çevirdi. <strong>Jülyen gün numarası</strong> (JGN) 0, Jülyen takvimle 1 Ocak MÖ 4713'te öğlen başlayan gündür. Bir tarih önce bu sayıya, sonra o sayıdan başka bir takvime çevrilir. Formüldeki ⌊(153M + 2)/5⌋ terimi işin inceliğidir: yıl Mart'tan başlatılınca ayların gün sayıları (31, 30, 31, 30, 31, …) ortalaması 30,6 olan düzenli bir desen oluşturur ve Şubat yılın sonuna, artık günle birlikte, kaçar. Haftanın günü ise tek bir modüler işlemdir; hiçbir takvim reformu haftayı kesmediği için çevirinin bağımsız sağlamasıdır.",
      formula: "JGN = d + ⌊(153M + 2)/5⌋ + 365Y + ⌊Y/4⌋ − ⌊Y/100⌋ + ⌊Y/400⌋ − 32 045",
      formulaNote: "Gregoryen için; a = ⌊(14 − m)/12⌋, Y = y + 4800 − a, M = m + 12a − 3. Jülyen için yüzyıl terimleri düşer ve sabit −32 083 olur. Haftanın günü (JGN + 1) mod 7, 0 = Pazar.",
    },
    {
      heading: "Hicrî tablo takvimi ve gözlem",
      body:
        "Hicrî takvim yalnız Ay'ı izler: on iki ay, 354 ya da 355 gün. Güneş yılından yaklaşık 11 gün kısa olduğu için aylar mevsimler arasında gezinir ve yaklaşık 33 yılda turu tamamlar. Ay başı geleneksel olarak hilalin görülmesiyle belirlenir; uygulama ülkeden ülkeye, kurumdan kuruma değişir. Tarihçilerin dönüşümde kullandığı <strong>tablo takvim</strong> ise aritmetiktir: tek sayılı aylar 30, çift sayılı aylar 29 gün, 30 yıllık döngüde 11 artık yıl. Hangi yılların artık olduğu geleneğe göre değişir (en yaygın dizide 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29; bazı kaynaklarda 16 yerine 15; Tayyibî İsmailî gelenekte 8, 19, 27 kayar). Tablo gözleme dayalı tarihlerden bir iki gün ayrılabilir; sayfa yalnız bu yayımlanmış kuralı hesaplar ve hangi yöntemin dinen geçerli olduğuna karar vermez.",
      formula: "30 Hicrî yıl = 30 × 354 + 11 = 10 631 gün;  ortalama ay = 10 631 / 360 = 29,530556 gün",
      formulaNote: "Sinodik ay 29,530589 gün; tablo ayı ondan biraz kısa olduğu için tablo gökten yaklaşık 2500 Hicrî yılda bir gün kayar.",
    },
  ],
  lab: {
    intro:
      "Sayfa beş sekmeli bir kural tezgâhıdır. <strong>Gökteki üç saat</strong> sekmesinde yıldız günü sağlamasını görür, <strong>Kendi döngün</strong> kutusunda ayışık bir döngü (Yıl sayısı Y, Ay sayısı M) ve <strong>Kural</strong> kutusunda bir artık yıl kuralı (Artık: her / değil: her / yine artık: her, Hedef yıl menüsü) kurarsın; çizim 2000 yılını sıfır alıp 4000'e kadar kaymayı gösterir. <strong>Jülyen ve Gregoryen</strong> sekmesinde bir yıl seçip iki takvimin farkını okursun. <strong>Hicrî, Rumî ve ötekiler</strong> sekmesi tablo Hicrî yılı, 698 sayılı Kanun'un tarihini ve İbrani yılını gösterir. <strong>Tarih çevirici</strong> bir tarihi beş takvime ve Jülyen gün numarasına çevirir, Paskalya hesabını adım adım yazar. <strong>Tarihçinin işi</strong> İngiliz belgesindeki çift yılı ve sıfır yılı tuzağını çözer. Her sekmede \"Bu sekmeyi sıfırla\" düğmesi vardır. Bütün takvimler geriye doğru uzatılmış (proleptik) hesaplanır; kayma çizimleri yıl uzunluğunu sabit sayar.",
    experiments: [
      {
        title: "Kaç yılda kaç ay?",
        predict: "8 yılda 99 ay sayan eski Yunan döngüsü mü, 19 yılda 235 ay sayan Metonik döngü mü mevsimlere daha uzun süre bağlı kalır? Kaç kat?",
        do: "Gökteki üç saat sekmesinde, Kendi döngün kutusuna Yıl sayısı Y = 8, Ay sayısı M = 99 yaz. Sonra 19 ve 235'e dön; en son 334 ve 4131'i dene. İstersen zincir kesir tablosundaki satırlara da tıklayabilirsin.",
        observe: "8/99: artık ay sayısı 3, ortalama takvim yılı 365,4410 gün, döngü başına +38,18 saat, bir günlük kayma 5 yıl. 19/235: 7 artık ay, 365,2468 gün, +2,08 saat, 219 yıl. 334/4131: −0,69 saat, 11 607 yıl.",
        explain: "Döngü başına hata kesrin oranı ne kadar iyi yakaladığını, döngünün uzunluğu da hatanın ne kadar sık biriktiğini söyler: kayma süresi Y × 24 / |hata (saat)|. Metonik döngü, döngüyü yalnız iki buçuk kat uzatıp hatayı on sekiz kat küçültür; zincir kesir açılımındaki büyük 17 terimi bu yüzdendir. 334 yıllık döngü daha iyidir ama bir takvimin bu kadar uzun bir kuralı ezberlemesi pratik değildir.",
      },
      {
        title: "Lilius'un kesri ne kadar iyi?",
        predict: "Jülyen kuralın bir günlük kayması yüzyıl düzeyinde. Gregoryen kural bunu kaç bin yıla çıkarır? \"4'e bölünen artık, 128'e bölünen değil\" diye daha basit bir kural Gregoryen'i geçebilir mi?",
        do: "Kural kutusunda sırayla Jülyen, Gregoryen ve 4 ve 128 düğmelerine bas; Yılda hata ve Bir günlük kayma okumalarını not et. Ardından Gregoryen'e dönüp Hedef yıl menüsünde \"2000'deki Mart ılımı yılı\"nı seç; bu hedefle 4 ve 128 düğmesine bir kez daha bas.",
        observe: "Jülyen: 365,2500000 gün, +674,8 s, 128 yıl. Gregoryen: 365,2425000 gün, +26,8 s, 3223 yıl, 4000 yılında kayma +0,62 gün. 4 ve 128: 365,2421875 gün, −0,2 s, 454 545 yıl. Hedef Mart ılımı yılı olunca Gregoryen'in hatası +10,9 s'ye iner, kayma 7937 yıl olur; 4 ve 128 kuralının hatası ise −16,1 s'ye büyür, kayma 5362 yıla iner.",
        explain: "31/128 gün kesrinin zincir kesir yaklaşımıdır, 97/400 değildir; ortalama tropik yıla gerçekten de daha yakındır. Ama Mart ılımı yılını hedef alınca sıra tersine döner ve Gregoryen kural önde çıkar. Gregoryen kuralın bir üstünlüğü de uygulamadadır: istisnalar yüzyıl yıllarına düşer. Hedefi değiştirmek de bir ders verir: \"hata\" tek bir sayı değildir, takvimin hangi gök olayına bağlanmak istediğine göre ölçülür. Bu sayılar sayfanın aritmetiğidir, gerçek bir öngörü değildir; Dünya'nın dönüşü de yavaşça değişir.",
      },
      {
        title: "On üç gün her zaman on üç müydü?",
        predict: "Bugün Gregoryen tarih Jülyen tarihten 13 gün ileride. 1582'de, 1700'de, 2000'de ve 2100'de fark kaç olur? 2000'de fark değişir mi?",
        do: "Jülyen ve Gregoryen sekmesinde 1582, 1700 ve 2100 hazırlarına bas; sonra kaydırıcıyı ya da ±1, ±100 düğmelerini kullanarak 2000 yılına git. Her seferinde 1 Mart'ta fark ve Jülyen 25 Aralık, Gregoryen'de okumalarına bak. En son yılı 250'ye getir.",
        observe: "1582: +10 gün (geçerli aralık 1 Mart 1500 – 28 Şubat 1700). 1700: +11, Jülyen'de artık evet, Gregoryen'de hayır. 2000: +13, iki takvimde de artık; fark değişmez. 2100: +14 ve Jülyen 25 Aralık Gregoryen 8 Ocak 2101'e düşer. 250: fark 0.",
        explain: "Fark yalnız Jülyen'de artık olup Gregoryen'de olmayan yıllarda, yani 400'e bölünmeyen yüzyıl yıllarında büyür: fark = ⌊Y/100⌋ − ⌊Y/400⌋ − 2. Bugün 7 Ocak'ta Noel'i kutlayan kiliselerin Noeli 2100'den sonra 8 Ocak'a kayacaktır. Farkın 3. yüzyılda sıfır olması da rastlantı değildir: reformun on günü ılımı İznik Konsili (325) dönemindeki tarihine döndürmek için seçildi, bu yüzden iki takvim o çağın yakınında çakışır. Tam 325'te fark zaten +1 gündür; 250'yi 325'e çekip kendin bak.",
      },
      {
        title: "Ramazan neden her yıl erkene gelir?",
        predict: "Tablo Hicrî takvimde bir ay her Gregoryen yılda kaç gün erkene kayar? 698 sayılı Kanun'un altındaki \"9 cemaziyelâhir 1344\" ile tablonun aynı gün için verdiği tarih tutar mı?",
        do: "Hicrî, Rumî ve ötekiler sekmesinde Hicrî yıl (tablo) kutusuna sırayla 1448, 1449, 1450, 1451 ve 1452 yaz; Döngüdeki yeri, Yıl uzunluğu ve durum satırındaki Ramazan başlangıcını oku. Sonra \"Kural ile belge\" kartındaki Tablonun verdiği değerine ve Artık yıl dizisi menüsünü değiştirince ne olduğuna bak.",
        observe: "Ramazan tabloya göre 8 Şubat 2027, 28 Ocak 2028, 16 Ocak 2029, 6 Ocak 2030 ve 26 Aralık 2030'da başlar. 1450 \"10. yıl / 30\" ve 355 gün (artık). 1452'de durum satırı ayın bu yıl yılbaşını geçip Aralık'a sıçradığını söyler. Durum satırı: Gregoryen yıldan 10,88 gün kısa, bir mevsim turu 33,6 Hicrî yıl. Kanunun Hicrî tarihi için tablo üç dizide de 10 Cemaziyelahir 1344 der.",
        explain: "Tablo yılı ortalama 354,3667 gün, Gregoryen yıl 365,2425 gün: aradaki 10,88 gün her yıl birikir, 365,2425 / 10,88 ≈ 33,6 yılda tam bir tur olur. Kanundaki bir günlük fark bir hata değildir: dönemin gerçek ay başları gözleme bağlıydı (kanunun 3. maddesi bunu rasathaneye verir) ve Hicrî gün bir önceki akşam başlar. Tablo yalnız ortalamayı izler; belgeyi okuyan tarihçi hangisinin kullanıldığını sorar.",
      },
    ],
  },
  wow: [
    {
      title: "Bir kez yaşanmış 30 Şubat",
      body:
        "İsveç 1700'den başlayarak artık günleri atlayıp Gregoryen takvime yavaş yavaş geçmeyi planladı, ama plan iyi yürütülemedi. Kral XII. Karl vazgeçince ülke Jülyen takvime dönmek için 1712'de takvime fazladan bir gün ekledi: tarihte bir kez yaşanmış 30 Şubat. İsveç Gregoryen takvime ancak 1753'te, 17 Şubat Çarşamba'yı 1 Mart Perşembe izleyerek geçti.",
    },
    {
      title: "7980 yıllık sayaç",
      body:
        "Joseph Scaliger 1583'te üç döngünün çarpımı olan bir dönem kurdu: 28 yıllık güneş döngüsü, 19 yıllık ay döngüsü ve 15 yıllık indiksiyon döngüsü, 28 × 19 × 15 = 7980 yıl. Dönemin başlangıcı MÖ 4713'e konur. Adını babası Julius'tan değil, Jülyen yılına göre kurulduğu için aldığını kendisi yazmıştır. Gökbilimciler bugün de zamanı bu sayaçla yazar: 1 Ocak 2000 öğlen başlayan gün JGN 2 451 545'tir.",
    },
    {
      title: "Paskalya tarihleri 5 700 000 yılda bir yinelenir",
      body:
        "Batı Paskalyası 22 Mart ile 25 Nisan arasında bir Pazar'a düşer ve Gregoryen kurallar altında tarihlerin aynı sırayla tekrarlanması yaklaşık 5 700 000 yıl sürer. Adım adım hesaplayan \"anonim algoritma\"yı 1876'da <em>Nature</em> dergisine bir New York okuru göndermişti. 2026'da iki hesap bir hafta ayrılır: Batı Paskalyası 5 Nisan, Ortodoks Paskalyası Jülyen 30 Mart, yani Gregoryen 12 Nisan.",
    },
  ],
  worked: {
    title: "Bir kanunun tarihini sayıya çevirmek",
    prompt:
      "698 sayılı Kanun Rumî 26 Kânunuevvel 1341 tarihlidir. Bu günü Gregoryen ve Jülyen takvime, Jülyen gün numarasına ve haftanın gününe çevir; sonucu Tarih çevirici sekmesinin varsayılan hazırıyla karşılaştır.",
    steps: [
      "Rumî'den Gregoryen'e: 1917'den sonra Rumî günler Gregoryen günlerdir ve Mart–Aralık arasında yıl farkı 584'tür. 1341 + 584 = 1925, Kânunuevvel = Aralık: Gregoryen 26 Aralık 1925.",
      "Formül değişkenleri: m = 12 için a = ⌊(14 − 12)/12⌋ = 0, Y = 1925 + 4800 − 0 = 6725, M = 12 + 0 − 3 = 9 (Mart'tan sayınca Aralık dokuzuncu ay).",
      "Terimleri hesapla: ⌊(153 × 9 + 2)/5⌋ = ⌊1379/5⌋ = 275 gün (Mart başından Aralık başına), 365 × 6725 = 2 454 625, ⌊6725/4⌋ = 1681, ⌊6725/100⌋ = 67, ⌊6725/400⌋ = 16. Topla: 26 + 275 + 2 454 625 + 1681 − 67 + 16 − 32 045 = 2 424 511.",
      "Haftanın günü: (2 424 511 + 1) mod 7 = 6, yani Cumartesi. Jülyen karşılık için aynı değişkenlerle yüzyıl terimleri olmadan, sabit −32 083 ile 26 Aralık'ı hesaplarsan 2 424 524 çıkar: Jülyen 26 Aralık 13 gün sonradır, o hâlde aynı gün Jülyen takvimde 13 Aralık 1925'tir.",
      "Sayfada dene: Tarih çevirici sekmesi bu hazırla açılır ve 26 Aralık 1925 · 13 Aralık 1925 · 2 424 511 · Cumartesi · 10 Cemaziyelahir 1344 · 26 Kânunuevvel 1341 · +13 gün gösterir. Sonraki gün düğmesine altı kez bas: 1 Ocak 1926 Cuma, JGN 2 424 517, Rumî okuması \"Kullanımdan kalktı (1926)\".",
    ],
    result:
      "Kanunun günü JGN 2 424 511, 26 Aralık 1925 Cumartesi'dir (Jülyen 13 Aralık 1925). Belgedeki Hicrî tarih 9 Cemaziyelahir, tablo 10 Cemaziyelahir der; altı gün sonra Rumî yıl sayısı yerini 1926'ya bırakır.",
  },
  misconceptions: [
    {
      myth: "Gregoryen ve Jülyen takvim arasındaki fark hep 13 gündü.",
      truth:
        "Fark 1582'de 10 gündü; 1700, 1800 ve 1900'de birer gün büyüdü, 2100'de 14 olacak. Yalnız 400'e bölünmeyen yüzyıl yılları farkı büyütür; 2000 iki takvimde de artık olduğu için hiçbir şey değişmedi. Bu yüzden 1752'de Britanya 11, 1918'de Rusya 13 gün atladı.",
    },
    {
      myth: "MÖ 44 ile MS 14 arasında 44 + 14 = 58 yıl vardır.",
      truth:
        "MÖ 1'i doğrudan MS 1 izler; sıfır yılı yoktur. Gökbilimcilerin 1740'tan beri kullandığı astronomik numarada MÖ 44 = −43 olduğu için aralık 14 − (−43) = 57 yıldır. Tarihçinin işi sekmesindeki Sıfır yılı yok kutusu iki sonucu yan yana gösterir: 57 yıl ve saf toplamanın 58'i.",
    },
    {
      myth: "Eski Usul tarihi Yeni Usul'e çevirmek yalnız birkaç gün eklemektir.",
      truth:
        "İngiltere'de 1155–1752 arasında yasal yıl 25 Mart'ta başlıyordu; bu yüzden yalnız gün değil yıl da değişebilir. George Washington'un doğumu \"11 Şubat 1731/32\" diye yazılır: 1 Ocak yılbaşıyla 1732, Gregoryen takvimle 22 Şubat 1732. Bir belgeyi çevirirken takvimi, yılbaşını ve günün ne zaman başladığını ayrı ayrı sormak gerekir.",
    },
    {
      myth: "Tablo Hicrî takvim belgeyle bir gün uyuşmuyorsa ya tablo ya belge yanlıştır.",
      truth:
        "İkisi farklı şeyleri yazar: belge gözleme ya da resmî ilana dayanan gerçek ay başını, tablo ise ortalama bir aritmetik kuralı. Bir iki günlük fark beklenen bir durumdur ve Hicrî gün önceki akşam başladığı için gün sınırı da kayabilir. Uygulama ülkeden ülkeye değişir; tarihçi hangi yöntemin kullanıldığını sorar, hangisinin doğru olduğuna değil.",
    },
  ],
  glossary: [
    { term: "Tropik yıl", definition: "Güneş'in ılım noktasına göre bir dolanımı; mevsimlerin yılı, ortalaması J2000 için 365,2421897 gün." },
    { term: "Sinodik ay", definition: "Yeni aydan yeni aya geçen süre; ortalaması 29,530588861 gün, tek tek aylar yaklaşık 29,27 ile 29,83 gün arasında değişir." },
    { term: "Yıldız günü", definition: "Dünya'nın ılım noktasına göre bir dönüşü, 23 sa 56 dk 4,0905 s; güneş gününden yaklaşık 4 dakika kısa." },
    { term: "Metonik döngü", definition: "19 tropik yılın neredeyse tam 235 sinodik aya eşit olmasından doğan ayışık takvim döngüsü; 19 yılın 7'si on üç aylıktır." },
    { term: "Proleptik takvim", definition: "Bir takvimin kullanılmadığı dönemlere de kurallarıyla geriye doğru uzatılması; örneğin 1582 öncesine yazılan Gregoryen tarihler." },
    { term: "Jülyen gün numarası (JGN)", definition: "Jülyen takvimle 1 Ocak MÖ 4713'te öğlen başlayan günden beri sayılan günlerin numarası; takvimler arası çevirinin ortak dili." },
    { term: "Eski Usul / Yeni Usul (O.S. / N.S.)", definition: "Bir takvim değişikliğinden önceki ve sonraki tarihleme biçimi; İngilizce kaynaklarda Jülyen gün ve eski yılbaşı ile Gregoryen gün ve 1 Ocak yılbaşı." },
    { term: "Astronomik yıl numarası", definition: "Sıfır yılını içeren sayım: 0 = MÖ 1, −1 = MÖ 2; yıllar arası farkı doğrudan çıkarmayla verir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Takvim, sayılar kuramının gündelik hayattaki en eski uygulamalarından biridir. <strong>Sayılar Teorisi</strong> dersinde zincir kesirlerin en iyi rasyonel yaklaşım olduğu (bir yaklaşımdan daha küçük paydalı hiçbir kesir gerçek sayıya daha yakın olamaz) ispatlanır; Metonik döngü ile 31/128 bunun örnekleridir. Jülyen gün formülleri taban bölme ve modüler aritmetikle kurulur; <strong>Algoritmalar</strong> ve <strong>Ayrık Matematik</strong> derslerinde aynı fikir, tarihleri bir sayıya çevirip geri getiren bijeksiyonlar ve bunların sınanması olarak karşına çıkar. Bu sayfanın test dosyası çekirdeği milyonlarca günü tek tek yürüyen bağımsız bir sayaçla karşılaştırır: bir algoritmayı kapalı formülle değil, kaba kuvvetle doğrulamak yazılım mühendisliğinin temel alışkanlığıdır.",
      "Gökbilim tarafında <strong>Küresel Astronomi</strong> ve <strong>Gök Mekaniği</strong> dersleri tropik yılın neden sabit olmadığını (presesyon, yörünge tedirginlikleri), efemeris zamanı ile Dünya'nın dönüşüne bağlı zaman arasındaki farkı (ΔT) ve artık saniyeyi anlatır; bu sayfa bu etkileri bilerek dışarıda bırakır. Tarih tarafında <strong>Tarih Metodolojisi</strong>, <strong>Kronoloji</strong> ve belgelerin biçimini inceleyen <strong>Osmanlı Diplomatikası</strong> gibi dersler, bir belgedeki Hicrî, Rumî ya da Miladi tarihi okuma, çevirme ve sağlamasını yapma becerisini öğretir: Tarihçinin işi sekmesindeki beş soruluk denetim listesi bu işin özüdür.",
    ],
    topics: ["Zincir kesirler ve Diophantos yaklaşımı", "Modüler aritmetik", "Presesyon ve tropik yıl", "ΔT ve artık saniye", "Kronoloji ve belge tarihleme", "Osmanlı diplomatikası"],
  },
  quiz: [
    {
      question: "Bir ayışık döngü 8 yılda 99 ay sayıyor ve döngü başına yaklaşık 38 saat hata biriktiriyor. Takvim mevsimlere göre yaklaşık kaç yılda bir gün kayar?",
      options: ["Yaklaşık 5 yılda", "Yaklaşık 38 yılda", "Yaklaşık 99 yılda", "Yaklaşık 219 yılda"],
      answer: 0,
      explanation: "Bir gün 24 saattir; 38 saatlik hata 8 yılda birikiyorsa bir günlük hata 8 × 24 / 38,18 ≈ 5 yılda birikir. Kendi döngün kutusuna 8 ve 99 yazınca sayfa da 5 yıl der. 219 yıl Metonik döngünün (19/235) sonucudur.",
    },
    {
      question: "Gregoryen ile Jülyen takvim arasındaki fark 1900'de 12'den 13'e çıktı. 2000 yılında neden 14'e çıkmadı?",
      options: [
        "2000 Jülyen takvimde artık değildir",
        "2000 iki takvimde de artık yıldır, bu yüzden iki takvim aynı günü ekledi",
        "Fark 1923'ten sonra dondurulmuştur",
        "Gregoryen takvim 2000'de bir gün atlamıştır",
      ],
      answer: 1,
      explanation: "Fark yalnız Jülyen'de artık olup Gregoryen'de olmayan yıllarda büyür. 2000 dörde bölünür ve 400'e de bölündüğü için Gregoryen'de de artıktır; iki takvim 29 Şubat'ı birlikte ekler. Sıradaki büyüme 2100'dedir: Jülyen ve Gregoryen sekmesinde 2100 hazırına basınca +14 görürsün.",
    },
    {
      question: "Bir olay MÖ 44 yılının bir gününde, öteki MS 14 yılının aynı gününde oldu. Aralarında kaç yıl vardır?",
      options: ["30 yıl", "57 yıl", "58 yıl", "59 yıl"],
      answer: 1,
      explanation: "MÖ 1'den MS 1'e geçerken sıfır yılı yoktur. Astronomik numarayla MÖ 44 = −43, MS 14 = 14; fark 14 − (−43) = 57 yıl. Saf toplamanın verdiği 58, olmayan sıfır yılını da saymış olur.",
    },
  ],
  next: [
    { href: "ay-evreleri.html", title: "Ay Evreleri, Tutulmalar ve Mevsimler", why: "Takvimlerin dayandığı iki saati gökte izle: sinodik ile yıldızıl ayın farkı, tutulmalar ve mevsimleri eksen eğikliğinin yarattığı." },
    { href: "kepler-yasalari.html", title: "Kepler Yasaları — Gezegen Yörüngeleri", why: "Ilımdan ılıma sürenin yörüngede nereden ölçüldüğüne bağlı olmasının kökü: Dünya eliptik yörüngede eşit sürelerde eşit alan tarar, hızı değişir." },
    { href: "arkeoloji-ve-tarihleme.html", title: "Arkeoloji ve Tarihleme: Stratigrafi, Radyokarbon, Ağaç Halkaları, Seriasyon", why: "Yazılı takvimin ulaşamadığı geçmiş: stratigrafiyle sıra, radyokarbon ve IntCal20 kalibrasyonuyla yaş, ağaç halkalarıyla yıl yıl kronoloji." },
    { href: "tarihsel-veri-ve-haritalar.html", title: "Tarihsel Veri ve Haritalar: Minard, Snow, Nüfus Tahminleri ve Kaynak Eleştirisi", why: "Belgedeki tarihi okuduktan sonra belgenin kendisini tart: Minard'ın 1812 haritası, Snow'un kolera verisi ve kaynak eleştirisi." },
  ],
  sources: [
    { title: "TDV İslâm Ansiklopedisi · Takvim", url: "https://islamansiklopedisi.org.tr/takvim", note: "Osmanlı malî yılı: 1677 fermanı, 1 Mart yılbaşı ve Hicrî yılla bir tutulan yıl sayısından doğan sıvış yılları (1255, 1288, 1321)." },
    { title: "Wikipedia · Gregorian calendar", url: "https://en.wikipedia.org/wiki/Gregorian_calendar", note: "Trento Konsili, Lilius'un önerisi, Clavius'un rolü, 24 Şubat 1582 tarihli Inter gravissimas ve 4 → 15 Ekim 1582 geçişi (İngilizce)." },
    { title: "Wikipedia · Adoption of the Gregorian calendar", url: "https://en.wikipedia.org/wiki/Adoption_of_the_Gregorian_calendar", note: "Ülke ülke geçiş tarihleri ve haftanın günleri: Fransa, Britanya, İsveç'in 30 Şubat'ı, Rusya, Yunanistan ve Osmanlı/Türkiye (İngilizce)." },
    { title: "Wikipedia · Julian day", url: "https://en.wikipedia.org/wiki/Julian_day", note: "Scaliger'in 1583'teki 7980 yıllık dönemi, adının kökeni, JGN 0'ın Jülyen ve Gregoryen karşılıkları ve dönüşüm formülleri (İngilizce)." },
    { title: "TBMM · 698 sayılı Takvimde tarih mebdeinin tebdili hakkında kanun", url: "https://www5.tbmm.gov.tr/tutanaklar/KANUNLAR_KARARLAR/kanuntbmmc004/kanuntbmmc004/kanuntbmmc00400698.pdf", note: "Kanunun taranmış metni: beş madde, altındaki Rumî ve Hicrî tarih, Resmî Ceride 2 Ocak 1926, sayı 260." },
  ],
  revision: "Kasım 2026",
};
