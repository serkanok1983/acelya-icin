window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tarihsel-veri-ve-haritalar"] = {
  slug: "tarihsel-veri-ve-haritalar",
  title: "Tarihsel Veri ve Haritalar: Sayılarla Tarih Okumak",
  field: "Tarih ve Toplum",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir ordunun eriyişi, bir kuyunun çevresindeki ölümler, iki bin yıllık nüfus tahminleri. Tarihçi sayıları da okur; ama her sayıya önce “bunu kim, neyi, neden saydı?” diye sorar.",
  hook:
    "Minard'ın 1812 seferi haritasında Moskova'ya varan 100 000 askerin bandı, geri dönen birkaç bin kişinin ince çizgisine dönüşür ve altında dondurucu sıcaklıklar yazar. Göz hemen “Rus kışı öldürdü” der. Peki aynı haritanın kendi sayıları kayıpların çoğunun daha ilk sıcaklık okuması yazılmadan, Moskova yolunda verildiğini söylüyorsa, hangisine inanacaksın: resme mi, sayılara mı?",
  bigIdea:
    "Tarihsel bir sayı ya da harita bir <strong>kanıttır, gerçeğin kendisi değil</strong>: neyi saydığını, kimin hangi amaçla ürettiğini ve kendi içinde tutarlı olup olmadığını sorduğunda ne kadar şey söyleyebileceğini öğrenirsin.",
  story: [
    "İstatistik grafiğinin kendisi de tarihî bir buluştur. İskoç William Playfair (1759–1823), 1786'da Londra'da yayımladığı <em>Commercial and Political Atlas</em>'ta İngiltere'nin dış ticaretini zaman çizgileriyle, İskoçya'nın bir yıllık ithalat ve ihracatını çubuklarla gösterdi; çizgi, alan, çubuk ve pasta grafiklerinin mucidi sayılır. Pasta grafiği 1801 tarihli <em>Statistical Breviary</em>'dedir ve Osmanlı İmparatorluğu'nun Asya, Avrupa ve Afrika'daki paylarını gösterir. Sayıları tablodan çıkarıp göze sunmak, onları okumanın ve onlarla ikna etmenin yeni bir yoluydu.",
    "Charles Joseph Minard (1781–1870) köprü ve kanal yapmış bir Fransız mühendisiydi; 1851'de 70 yaşında zorunlu emekliliğe ayrıldıktan sonra kendini istatistik haritalarına verdi. 20 Kasım 1869 tarihli haritası Napolyon ordusunun 1812–1813 Rusya seferini anlatır: bandın genişliği asker sayısıdır (1 mm, 10 000 kişi), renk gidişi ve dönüşü ayırır, altta geri çekilişin sıcaklıkları Réaumur derecesiyle yazılıdır. Étienne-Jules Marey 1878'de haritanın “tarihçinin kalemine meydan okuyan acımasız belagatini” övdü; Edward Tufte onu belki de çizilmiş en iyi istatistik grafiği saydı. Ama Minard seferi yaşamadı; sayılarını 57 yıl sonra Thiers, Ségur, Fezensac ve Chambray'in kitaplarından ve ordu eczacısı Jacob'un yayımlanmamış günlüğünden derledi. Haritanın notunda bir kurgu da itiraf eder: kayıpları gözle daha iyi okutmak için Minsk ve Mogilev'e ayrılıp Orşa ile Vitebsk yakınında geri katılan Jérôme ve Davout birliklerini, ordunun yanından hiç ayrılmamış gibi çizmiştir.",
    "31 Ağustos 1854'te Londra'nın Soho semtinde ani bir kolera salgını başladı. Hekim John Snow (1813–1858), hastalığın havadaki kötü kokuyla (<strong>miazma</strong>) değil suyla yayıldığını 1849'daki <em>On the Mode of Communication of Cholera</em> adlı yazısında savunmuştu. Son üç günde kaydedilen 83 ölümü tek tek soruşturdu, neredeyse hepsinin Broad Street'teki sokak pompasına yakın evlerde olduğunu buldu ve 7 Eylül akşamı St James mahallesinin yöneticilerine başvurdu; pompanın kolu ertesi gün söküldü. Önce miazmaya inanan papaz yardımcısı Henry Whitehead onunla birlikte çalışıp ilk vakayı buldu. Yine de Sağlık Kurulu salgını sonunda miazmaya bağladı. Snow'a veri sağlayan ama kendisi de miazmacı olan istatistikçi William Farr ise 1866'daki yeni salgına gelindiğinde, Snow'un ölümünden sekiz yıl sonra, onun açıklamasını kabul etmişti.",
    "Nüfus sayımı ise yakın zamanın icadıdır. Daha eski dönemler için tarihçi vergi defterlerinden, hane sayımlarından, asker listelerinden yola çıkar ve bir <strong>çarpanla</strong> nüfusa varır: Osmanlı tahminlerinde yaygın varsayım hane başına beş kişidir. 1831 Osmanlı sayımı yalnız 15 yaşın üstündeki sağlıklı erkekleri saydı, bazı köyler hiç sayılmadı; sayılanlar 3 377 307 kişiydi. Bu bir nüfus değil, devletin vergi ve asker için önemsediği kesimin sayısıdır. Bir belgenin neyi, kimin için ve hangi amaçla kaydettiğini sormak tarihçinin temel aracıdır: <strong>kaynak eleştirisi</strong>. 19. yüzyılda Ernst Bernheim'ın ve Langlois ile Seignobos'un ünlü yöntem kitapları bu soruları kurallara bağladı; bugün de bir kaynağın güvenilirliğinin ona sorulan soruya bağlı olduğu kabul edilir.",
  ],
  core: [
    {
      heading: "Bir grafik neyi kodlar?",
      body:
        "Minard'ın haritası iki boyutlu bir kâğıda altı değişken sığdırır: asker sayısı, konum (boylam ve enlem), yön, yol boyu uzaklık, tarih ve sıcaklık. Her biri ayrı bir görsel kanalda taşınır: sayı bant genişliğinde, yön renkte, sıcaklık alttaki şeritte. Bir grafiği okumak, hangi değişkenin hangi kanalda olduğunu ve hangisinin hiç gösterilmediğini fark etmektir. Minard'da ilerleyişte sıcaklık yoktur; noktalar arasında da bant düz çizilir, çünkü aradaki sayılar bilinmez.",
      formula: "bant genişliği ∝ N  ·  kalan pay = N / N<sub>0</sub>",
      formulaNote: "Özgün haritada 1 mm, 10 000 kişidir. Sayfada N<sub>0</sub> = 422 000 (üç kolun başlangıç toplamı); Moskova'da 100 000 / 422 000 = 23,7 %.",
    },
    {
      heading: "İç tutarlılık: kaynağı kendisine karşı sınamak",
      body:
        "Bir kaynağın sayıları başka bir kaynak olmadan da sınanabilir: toplamlar tutuyor mu, geri çekilen bir kol büyüyebilir mi, tarih sütunu kendi kuralına uyuyor mu? Minard verisinde üç kol 340 000 + 60 000 + 22 000 = 422 000 eder ve Neman'a 4000 + 6000 = 10 000 kişi döner; ama Moiodexno ile Smorgoni arasında geri çekilen ordu 12 000'den 14 000'e “büyür”. Bu bir çürütme değil, açıklama isteyen bir sorudur: takviye mi katıldı, okuma hatası mı? Birim dönüşümü de bir denetimdir: Réaumur ölçeğinde su 0°'de donar, 80°'de kaynar.",
      formula: "°C = 1,25 × °R",
      formulaNote: "Minard'ın en düşük okuması −30 °R, yani −37,5 °C'dir.",
    },
    {
      heading: "Mekânsal çözümleme ve eksik payda",
      body:
        "Snow'un sorusu “ölümler hangi pompaya en yakın?” idi. Her ölümü en yakın pompaya atamak, haritayı bugün <strong>Voronoi bölgeleri</strong> denen hücrelere bölmek demektir. Sayfadaki veride 578 ölümün 359'u (62,1 %) Broad Street pompasına en yakındır, oysa sokak uzunluğunun yalnız yüzde 8,6'sı o pompanın bölgesindedir: gözlenen pay, beklenenin 7,22 katı. Ama gerçek bir oran için payda, yani o sokaklarda yaşayan nüfus gerekir ve veri setinde yoktur. Kalabalık bir sokakta ölüm de çok olur; sokak uzunluğu yalnız kaba bir yedektir. Pay da eksiktir: Snow'un günlük tablosunda 616 ölüm vardır, ev numarası bilinmeyenler haritaya girmediği için haritada 578. Wikipedia'nın salgın maddesi ise 1884 tarihli bir din dergisine dayanarak 420 der ve neyi saydığını söylemez. Bir sayıyı aktarmadan önce kimin, hangi bölgede, hangi günler arasında saydığını sormak gerekir.",
      formula: "gözlenen / beklenen = (n<sub>i</sub> / n) / (L<sub>i</sub> / L)",
      formulaNote: "n<sub>i</sub>: pompa i'ye en yakın ölümler, L<sub>i</sub>: o pompaya en yakın sokak uzunluğu. 1'den büyükse ölümler o bölgede beklenenden yoğundur.",
    },
    {
      heading: "Oranlar ve doğal deney",
      body:
        "Güney Londra'da Southwark and Vauxhall ile Lambeth şirketlerinin boruları aynı sokaklardan geçiyordu; Lambeth 1852'de su alma yerini lağımların ulaşmadığı yukarı akışa, Snow'un Thames Ditton dediği yere taşımıştı (Wikipedia aynı tesisi bugünkü semt adıyla Seething Wells diye verir). Snow bunu hazır bir deney olarak gördü: üç yüz bin kişi, kendi seçimleri olmadan iki gruba ayrılmıştı. Ölüm sayılarını değil, <strong>ev başına oranları</strong> karşılaştırdı; çünkü iki şirketin ev sayısı farklıydı. İki oranın bölümü <strong>göreli risk</strong>tir: 9. tabloda, salgının ilk yedi haftasında 10 000 evde 315'e karşı 37, yani 8,4 kat. Sık alıntılanan “on dört kat” ise başka bir dönemdir: Snow'un yalnız ilk dört haftadaki 286'ya karşı 14 ölümden, yuvarlanmış oranlarla (71'e karşı 5) bulduğu değer.",
      formula: "oran = ölüm / ev × 10 000  ·  göreli risk = oran<sub>A</sub> / oran<sub>B</sub>",
      formulaNote: "Doğal deneyin gücü grupların başka her bakımdan benzer olmasından gelir; Snow da evlerin ve insanların iki şirket arasında farklı olmadığını vurgular.",
    },
    {
      heading: "Tahminlerin dağılımı ve çarpan",
      body:
        "MS 1 için on tahmin 170 ile 330 milyon arasında dağılır: en yüksek, en düşüğün 1,94 katıdır. Bu bant bir güven aralığı değildir; tahminciler çoğu zaman aynı eski kaynaklara dayanır ve hep birlikte yanılabilir. Belirsizliğin bir kaynağı çarpandır: sayım ne kadar kesin olursa olsun, hane başına 4 ile 6 kişi arasında kalan bir varsayım sonucu 1,5 kat oynatır. Uzun dönem büyüme hızı da logaritmayla hesaplanır; MS 1 ile 1500 arasında tahminler yılda yüzde 0,034 ile 0,066 arası bir büyüme verir.",
      formula: "nüfus = hane × çarpan / (1 − p)  ·  r = ln(N<sub>2</sub> / N<sub>1</sub>) / (t<sub>2</sub> − t<sub>1</sub>)",
      formulaNote: "p: kayda hiç girmeyenlerin payı. r yıllık sürekli büyüme hızıdır; 100 ile çarpınca yüzde olur.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeden oluşur ve iki haritayı resimlerinden değil, kendi verilerinden yeniden çizer. <strong>01 · Minard: 1812 seferi</strong> sekmesinde <strong>Ana koldaki nokta</strong> kaydırıcısı ve hazır düğmelerle (Kowno, Haziran · Moskova · Berezina yakını · Dönüş) yol boyunca ilerler, katmanları açıp kapatır, <strong>Denetimleri çalıştır</strong> ile sayıları birbirine karşı sınarsın. <strong>02 · Snow: Broad Street 1854</strong> sekmesinde <strong>Şüpheli pompa</strong> menüsü, sürüklenebilir kaynak işareti, günlük salgın eğrisi ve <strong>Oranları yeniden hesapla</strong> düğmesi vardır. <strong>03 · Dünya nüfusu: tahminler</strong> on tahmin dizisini ve bir hane çarpanı hesabını, <strong>04 · Kaynak eleştirisi</strong> ise bu sayfanın kendi kaynaklarıyla bir tartma alıştırmasını sunar. Uzaklıklar kuş uçuşudur. Snow koordinatlarının bir birimi yaklaşık 54 m'dir; veri paketinin belgesi 100 m yazar, ama pompaların bugünkü konumları 54 m verir (4. sekmedeki hata kutusu).",
    experiments: [
      {
        title: "Kayıpların çoğu soğukta mı verildi?",
        predict: "Ana kol 340 000 kişiyle yola çıktı ve sonunda 4000 kişi kaldı. Bu kaybın büyük kısmı Moskova'ya giderken mi, yoksa kışın geri çekilirken mi verildi?",
        do: "Minard sekmesinde <strong>Moskova</strong> düğmesine bas ve <strong>Ana kolun başlangıcından kayıp</strong> kutusunu oku. Sonra <strong>Dönüş</strong> düğmesine bas; en sonda <strong>Denetimleri çalıştır</strong> ile tablodaki “Kayıpların çoğu ne zaman verildi?” satırına bak.",
        observe: "Moskova'da kutu 240 000 (70,6 %) gösterir; askerin kendisi 100 000, başlangıçtaki 422 000'in yüzde 23,7'si. Dönüşte kalan 4000'dir: geri çekilişte ana kol 96 000 kişi daha kaybetmiştir. Dönüş noktasında en yakın sıcaklık okuması −26 °R'dir; birimi Celsius yapınca −32,5 °C olur.",
        explain: "Minard'ın kendi sayılarına göre ana kolun kaybının çoğu kıştan önce, ilerleyişte verildi. Sıcaklık şeridi yalnız geri çekilişe çizildiği için göz soğuğa yönelir. Grafik hem bir kanıt sunumu hem de bir anlatıdır; hangi değişkenin nereye çizildiği okurun vardığı sonucu biçimlendirir.",
      },
      {
        title: "Hangi pompa, hangi nokta?",
        predict: "Ölümler bir pompanın çevresinde toplanıyorsa, ölümlere toplam uzaklığı en küçük olan nokta o pompaya ne kadar yakın düşer: 20 m mi, 100 m mi, 300 m mi?",
        do: "Snow sekmesinde <strong>Şüpheli pompa</strong> menüsünü gez ve <strong>Gözlenen / beklenen</strong> kutusunu izle. Sonra <strong>Ölümlere toplam uzaklığı en küçük nokta</strong> düğmesine bas ve <strong>İşaretin Broad Street pompasına uzaklığı</strong> kutusunu oku. İstersen <strong>En yakın pompa bölgelerini göster</strong> ile Voronoi hücrelerini aç.",
        observe: "Broad St seçiliyken 359 ölüm (62,1 % / 578 ölüm), sokak payı 8,6 %, oran 7,22 kat. Oxford Market'e en yakın tek bir ölüm bile yoktur. Geometrik medyan Broad Street pompasından yaklaşık 23 m uzağa, yani aşağı yukarı bir sokak genişliği öteye düşer. <strong>İşareti Broad Street pompasına koy</strong> denince işaretin 100 m çevresinde 227, 200 m çevresinde 510 ölüm vardır; ölümlerin pompaya ortalama uzaklığı yaklaşık 123 m'dir.",
        explain: "Ölümleri en yakın pompaya atamak haritayı Voronoi hücrelerine böler; bir hücre beklenenden çok daha yoğunsa şüphe oraya yönelir. <strong>Geometrik medyan</strong>, Σ|x − p<sub>i</sub>| toplamını en küçük yapan noktadır: ortalamanın tersine uzaktaki birkaç ölümden az etkilenir, kapalı bir formülü yoktur ve sayfa onu Weiszfeld yinelemesiyle bulur. Medyanın pompaya bu kadar yakın düşmesi güçlü bir işarettir, ama nedenin kanıtı değildir: nüfus paydası yoktur ve insanlar kuş uçuşu değil sokaktan yürür. Snow'un tanık ifadeleri bu yüzden harita kadar önemlidir.",
      },
      {
        title: "1700'deki dört aykırı değer",
        predict: "Diyelim ki bir tahminci 1650 için 550 milyon, 1750 için 700 milyon veriyor. Aynı kişinin 1700 için yazdığı 1000 milyona güvenir misin? Sabit oranlı büyümeyle 1700'de ne beklerdin?",
        do: "Nüfus sekmesinde <strong>Yıl</strong> menüsünden 1700'ü seç ve tahmin sayısını oku. Sonra <strong>Tutarsız bulunan değerleri de göster</strong> kutusunu aç; aşağıdaki “Tablo kendi içinde tutarlı mı?” tablosuna bak. Karşılaştırma için MS 1 ve 1900'ü de seç.",
        observe: "1700'de 4 tahmin kalır (603 – 679 milyon, oran 1,13); kutu açılınca sayı 8'e çıkar ve oran 1,79'a fırlar. İşaretlenen dört değer Biraben 1079, McEvedy ve Jones 1010, Thomlinson 1000 ve Clark 1041'dir; komşularından beklenen 592 ile 785 arasındadır. MS 1'de oran 1,94, 1900'de 1,11'dir.",
        explain: "Denetim, her değeri aynı tahmincinin komşu değerleri arasında sabit oranlı büyümeyle beklenecek değerle karşılaştırır. 1,3 katı aşan sapma bir şüphedir, hüküm değil: hatanın tabloda mı yoksa özgün yayında mı olduğunu söylemez. Kara Ölüm'ün 1340–1400 düşüşü sınırın içinde kalır. Bu kez şüphe doğru çıktı: Wikipedia tablosunun Aralık 2019 sürümünde aynı dört hücrede 679, 610, 600 ve 641 yazıyordu, yani komşulardan beklenene yakın sayılar; değerler sonraki düzenlemelerde değişmiş. Hata bulmak için önce beklentiyi açıkça yazmak gerekir.",
      },
      {
        title: "Kolun sökülüşü ve kaynakların ağırlığı",
        predict: "1 Eylül'deki zirveye göre 7 Eylül'de, yani kol sökülmeden önceki gün, günlük yeni hastalanma yüzde kaç azalmıştı: 10 mu, 40 mı, 80 mi?",
        do: "Snow sekmesinin <strong>Kol sökülmeden önce</strong> panelinde tahminini seç. Sonra <strong>04 · Kaynak eleştirisi</strong> sekmesinde <strong>Soru</strong> menüsünden pompa kolu sorusunu al, dört kaynağın her biri için tür ve kanıt değeri seç ve <strong>Değerlendir</strong>'e bas.",
        observe: "Zirve 143 hastalanma (1 Eylül), 7 Eylül'de 28: düşüş 80,4 %; 8 Eylül ve sonrasında yalnız 55 tarihli hastalanma vardır. Alıştırmada sayfa Snow'un kitabını ve günlük tabloyu birincil ve yüksek, popüler anlatımları üçüncül ve düşük, Sağlık Kurulu'nun sonucunu ise birincil ama bu soru için düşük değerli bulur.",
        explain: "Snow kendi kuramının aleyhine görünen bir şeyi yazar: hastalanmalar kol kesilmeden o kadar azalmıştı ki kuyunun hâlâ etkin olup olmadığına karar verilemez. Kişinin çıkarına aykırı beyanı güçlü bir kanıttır. Sağlık Kurulu çağdaş ve resmîdir, ama kolun etkisini tartmamıştır: bir kaynağın değeri ona sorulan soruya bağlıdır.",
      },
    ],
  },
  wow: [
    {
      title: "Emeklilikte başlayan bir ikinci kariyer",
      body:
        "Minard en ünlü haritasını 88 yaşında çizdi. 1851'de zorunlu emeklilik yaşı olan 70'te köprü ve yol mühendisliğini bıraktı ve kendini istatistik haritalarına verdi. Hayatı boyunca 51 tematik harita yaptı; ilk akış haritası 1845'te Dijon ile Mulhouse arasındaki yol trafiğini, 1858 tarihli bir haritası Fransa'nın her yerinden Paris'e gönderilen sığırları harita üstündeki pasta grafikleriyle gösteriyordu.",
    },
    {
      title: "Yüz metre mi, elli dört metre mi?",
      body:
        "Snow verisini yayan R paketinin belgesi koordinat biriminin 100 m olduğunu yazar. Aynı 13 pompanın bugünkü enlem ve boylamlarıyla eşleştirildiği başka bir veri setinde 78 pompa çiftinin hepsi birim başına 52 ile 56 m arası verir. Snow'un kendi cümlesi de hakem olur: Cambridge Street köşesinin 250 yarda (yaklaşık 230 m) çevresinde on günde 500'ü aşkın ölümcül vaka. 54 m'lik birimle haritadaki ölümlerin 536'sı bu çemberin içindedir, 100 m'lik birimle yalnız 316'sı. Bir veri belgesindeki tek bir sayı, bütün uzaklıkları neredeyse iki katına çıkarıyordu.",
    },
    {
      title: "Üç yüz bin kişilik deney",
      body:
        "Snow, iki su şirketinin müşterileri hakkında “hiçbir deney bunu daha iyi sınayamazdı” diye yazar: üç yüz binden fazla insan, her yaştan ve her sınıftan, kendi seçimleri olmadan ve çoğu zaman haberleri bile olmadan biri lağım karışmış, öteki temiz su içen iki gruba ayrılmıştı. Snow'a göre yapılması gereken tek şey, her ölümün olduğu evin suyunu hangi şirketten aldığını öğrenmekti.",
    },
  ],
  worked: {
    title: "Snow'un 9. tablosunu yeniden hesaplamak",
    prompt:
      "Snow'un 1855 kitabına göre salgının 26 Ağustos'ta biten ilk yedi haftasında Southwark and Vauxhall şirketinin 40 046 evinde 1263, Lambeth'in 26 107 evinde 98, Londra'nın geri kalanındaki 256 423 evde 1422 kolera ölümü oldu. Basılmış oranlar 315, 37 ve 59'dur. Oranları ve göreli riski yeniden hesapla, uyuşmazlıkları bul ve sonucun bunlara ne kadar duyarlı olduğunu tart.",
    steps: [
      "Oranı tanımla: 10 000 evdeki ölüm = ölüm / ev × 10 000. Southwark and Vauxhall: 1263 / 40 046 × 10 000 = 315,4; Lambeth: 98 / 26 107 × 10 000 = 37,5. Snow 315 ve 37 basmıştır; ikincisi yuvarlanmamış, kesilmiştir.",
      "Göreli riski bul: 315,4 / 37,5 = 8,4. Snow'un metni de “sekiz ile dokuz kat arası” der. Ölüm sayılarını doğrudan karşılaştırmak (1263 / 98 = 12,9) yanıltırdı, çünkü iki şirketin ev sayısı farklıdır.",
      "Üçüncü satırı denetle: 1422 / 256 423 × 10 000 = 55,5, oysa basılmış değer 59'dur. Fark 3,5 birimdir ve yuvarlamayla açıklanamaz. 59'u verecek ölüm sayısı yaklaşık 1513, ev sayısı yaklaşık 241 000 olurdu.",
      "İkinci yedi haftaya geç: metinde 40 046 evde 2353 ölüm “10 000 evde 537” diye geçer; hesap 587,6 verir. 537'yi tutturmak için ölüm sayısı yaklaşık 2150 olmalıydı; oysa 2353, Snow'un 10. tablosundaki yedi haftalık sayıların (399 + 580 + 524 + 432 + 228 + 121 + 69) toplamıyla tam tutar. Demek ki burada yanlış olan sayım değil, oranın kendisidir. Lambeth'in 302 / 26 107 × 10 000 = 115,7 değeri basılmış 115 ile uyuşur.",
      "Duyarlılığı tart: ikinci dönemde göreli risk 587,6 / 115,7 = 5,1, basılmış sayılarla 537 / 115 = 4,7 olur. Snow “yaklaşık beş kat” der; iki değer de bu yargıyı destekler. Sayfada <strong>Oranları yeniden hesapla</strong> düğmesiyle aynı tabloyu görebilirsin.",
    ],
    result:
      "İlk yedi haftada lağım karışmış su içen evlerde ölüm oranı yaklaşık 8,4 kat yüksektir. İki basılmış değer (59 ve 537) sayılarla uyuşmaz ve 1855 baskısının taranmış kopyasında da aynen böyle basılıdır, yani hata dijital metinde değildir. 537'de oran yanlıştır; 59'da hatanın ölüm sayısında mı, ev sayısında mı, oranda mı olduğunu bu kaynaktan bilemeyiz. Snow'un vardığı sonuç her iki durumda da ayakta kalır.",
  },
  misconceptions: [
    {
      myth: "Snow pompanın kolunu söktürdü ve salgın böylece durdu.",
      truth:
        "Snow'un kendi tablosuna göre günlük hastalanmalar 1 Eylül'deki 143'ten kolun söküldüğü 8 Eylül'e kadar 12'ye inmişti. Snow, kuyunun o sırada hâlâ etkin olup olmadığına karar vermenin olanaksız olduğunu ve kaçan nüfusun da ölümleri azalttığını yazar. Kolun sökülmesi akıllıca bir önlemdi, salgının bittiğinin kanıtı değil.",
    },
    {
      myth: "Minard'ın haritası Napolyon ordusunu Rus kışının yok ettiğini gösterir.",
      truth:
        "Haritanın kendi sayılarına göre ana kol Moskova'ya varana kadar 240 000, geri çekilişte ise 96 000 kişi kaybetti. Sıcaklık şeridi yalnız dönüşe çizildiği için soğuk öne çıkar. Kayıpların nedenini (salgın hastalık, açlık, firar, çatışma) harita ayırmaz; bunun için başka kaynaklar gerekir.",
    },
    {
      myth: "Tahminlerin en düşüğü ile en yükseği arasındaki bant, gerçek değerin bulunduğu aralıktır.",
      truth:
        "Bant yalnız uzmanların ne kadar anlaşamadığını gösterir. Tahminciler birbirinden bağımsız değildir, çoğu aynı eski kayıtlara dayanır ve hep birlikte aynı yönde yanılabilir. Bir güven aralığı, istatistiksel bir modelle ve bilinen bir hata yapısıyla hesaplanır.",
    },
    {
      myth: "Birincil kaynak her zaman ikincil kaynaktan daha güvenilirdir.",
      truth:
        "Bir kaynağın güvenilirliği ona sorulan soruya bağlıdır. Sağlık Kurulu'nun 1854 sonucu çağdaş ve resmîdir, ama kolun etkisini tartmaz; bu soru için zayıf, kurulun ne düşündüğünü anlamak içinse çok değerlidir. Yöntemini açıklayan bir demografın ikincil çalışması, tek bir bölgeyi sayan bir defterden daha iyi bir dünya nüfusu tahmini verir.",
    },
  ],
  glossary: [
    { term: "Birincil kaynak", definition: "Olayın zamanında ya da ona tanık olan biri tarafından üretilmiş belge, kayıt ya da veri; Snow'un kendi tablosu gibi." },
    { term: "İkincil ve üçüncül kaynak", definition: "İkincil kaynak birincil kaynakları yorumlayan sonraki çalışmadır; üçüncül kaynak ikincil çalışmaları özetleyen ansiklopedi, ders kitabı ya da veri derlemesidir." },
    { term: "Dış eleştiri", definition: "Belgenin sahiciliğini, kim tarafından ve ne zaman üretildiğini, sonradan değiştirilip değiştirilmediğini sorgulama." },
    { term: "İç eleştiri", definition: "Belgenin söylediğine ne kadar güvenilebileceğini tartma: yazar olayı görebilecek yerde miydi, ne kadar sonra yazdı, bir çıkarı var mıydı?" },
    { term: "Miazma kuramı", definition: "Kolera gibi hastalıkların çürüyen maddelerden yükselen kötü havayla yayıldığını savunan, 19. yüzyılın ortasında yaygın görüş." },
    { term: "Voronoi bölgesi", definition: "Düzlemde belirli bir noktaya (örneğin bir pompaya) öteki noktaların hepsinden daha yakın olan yerlerin oluşturduğu hücre." },
    { term: "Hane çarpanı", definition: "Hane ya da vergi birimi sayan bir kayıttan kişi sayısına geçmek için kullanılan, hane başına ortalama kişi varsayımı." },
    { term: "Göreli risk", definition: "İki grubun olay oranlarının bölümü; örneğin iki su şirketinin 10 000 evdeki ölüm oranlarının birbirine oranı." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Tarih bölümlerinde bu sayfanın dördüncü sekmesi <strong>Tarih Metodolojisi</strong> ve <strong>Tarih Felsefesi</strong> derslerine karşılık gelir: kaynak türleri, dış ve iç eleştiri, tarihleme, tanıklığın değeri. Osmanlı tarihi çalışan biri <strong>Osmanlı Paleografisi</strong> ve <strong>Diplomatik</strong> derslerinde tahrir ve vergi defterlerini okumayı öğrenir; hane ve nefer sayılarından nüfusa geçmek ise <strong>tarihsel demografinin</strong> konusudur. Bu alan doğum ve ölüm kayıtlarından yaşam tabloları kurar, çarpanların ve kayıt dışı payın belirsizliğini açıkça hesaba katar.",
      "Minard ve Snow'un yöntemleri bugün başka bölümlerde de karşına çıkar. Snow'un çalışması <strong>Epidemiyoloji</strong> derslerinin ilk konusudur: oranlar, göreli risk, salgın eğrisi ve doğal deney. Ölümleri pompalara atamak <strong>Coğrafi Bilgi Sistemleri (CBS)</strong> ve mekânsal istatistiğin, Minard'ın haritası ise veri görselleştirme derslerinin klasik örneğidir. <strong>Dijital beşerî bilimler</strong> bu araçları tarihî kaynaklara uygular; ama hangi aracı kullanırsan kullan ilk soru değişmez: bu sayıyı kim, neyi, neden saydı?",
    ],
    topics: ["Tarih metodolojisi", "Osmanlı paleografisi ve diplomatik", "Tarihsel demografi", "Epidemiyoloji", "Coğrafi bilgi sistemleri", "Veri görselleştirme", "Dijital beşerî bilimler"],
  },
  quiz: [
    {
      question: "Bir tahrir defterinde 1000 yerine 2000 hane sayılmış olsun. Hane başına 4 ile 6 kişi arasındaki çarpan belirsizliği yüzünden nüfus tahmininin üst sınırı alt sınırının kaç katı olur?",
      options: ["0,75 katı", "1,5 katı", "3 katı", "Hane sayısı arttıkça 1'e yaklaşır"],
      answer: 1,
      explanation: "Nüfus = hane × çarpan olduğu için üst ve alt sınırın oranı 6 / 4 = 1,5'tir; hane sayısı sadeleşir. Sayımı ne kadar büyütür ya da kesinleştirirsen, çarpandaki belirsizlik sonuca aynen geçer. Sayfadaki çarpan hesabında hane sayısını değiştirip <strong>Çarpan 4 ile 6 arasında</strong> kutusuna bakarak dene.",
    },
    {
      question: "Minard'ın ölçeğinde 1 mm 10 000 kişidir. Moskova'daki 100 000 kişilik bant ile Neman'a dönen ana kolun 4000 kişilik bandı arasındaki genişlik farkı nasıldır?",
      options: ["10 mm'ye karşı 0,4 mm: 25 kat", "10 mm'ye karşı 4 mm: 2,5 kat", "Genişlikler aynıdır, yalnız renk değişir", "100 mm'ye karşı 4 mm: 25 kat"],
      answer: 0,
      explanation: "Genişlik sayıyla doğru orantılıdır: 100 000 / 10 000 = 10 mm ve 4000 / 10 000 = 0,4 mm, oran 25. Gözün bir alanı değil bir genişliği karşılaştırması, Minard'ın kodlamasını doğrudan okunur kılar.",
    },
    {
      question: "Snow ilk dört hafta için Southwark and Vauxhall'ın 40 046 evinde 286, Lambeth'in 26 107 evinde 14 ölüm sayar, oranları 71 ve 5 diye yuvarlar ve “on dört kat” der. Ham sayılardan hesaplanan göreli risk yaklaşık kaçtır?",
      options: ["Yaklaşık 20", "Tam 14,2", "Yaklaşık 13,3", "Yaklaşık 8,4"],
      answer: 2,
      explanation: "286 / 40 046 × 10 000 = 71,4 ve 14 / 26 107 × 10 000 = 5,36; bölümleri 13,3'tür. 71 / 5 = 14,2 çıkar, çünkü küçük sayı (5,36) aşağı yuvarlanınca bölüm büyür. Önce yuvarlayıp sonra bölmek küçük paydalarda belirgin bir hata yaratır; sonuç yine de çok güçlüdür.",
    },
  ],
  next: [
    { href: "bilim-tarihinden-deneyler.html", title: "Bilim Tarihinden Deneyler: Eratosthenes, Galileo, Kepler, Cavendish, Rømer", why: "Ünlü ölçümleri kendi verileriyle yeniden yap: kayıp kitaplar ve ikinci elden aktarımlarla gelen bilimsel iddiaları tartmanın başka bir yolu." },
    { href: "salgin-modelleri-sir.html", title: "Salgın Modelleri (SIR): R₀, Sürü Bağışıklığı, Rastlantı ve Ağlar", why: "Broad Street eğrisi kol sökülmeden neden düşüyordu? Hastalanabilecek kişiler azaldıkça bir salgının kendiliğinden döndüğünü modelle gör." },
    { href: "demografi-ve-nufus.html", title: "Demografi: Doğurganlık, Yaşam Tablosu, Nüfus Piramidi ve Projeksiyon", why: "Tarihsel nüfus tahminlerinin bugünkü karşılığı: doğurganlık ve ölümlülüğün ölçülmesi, demografik geçiş ve istisnaları, koşullu nüfus senaryoları." },
    { href: "regresyon-ve-korelasyon.html", title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik", why: "Ölümlerin pompanın çevresinde toplanması bir ilişkidir; ilişkiden nedenselliğe geçmenin istatistikteki koşullarını incele." },
  ],
  sources: [
    { title: "Project Gutenberg · J. Snow, On the Mode of Communication of Cholera (1855)", url: "https://www.gutenberg.org/ebooks/72894", note: "Snow'un genişletilmiş ikinci baskısı: Broad Street soruşturması, günlük tablo, kolun sökülüşü üzerine yorumu, su şirketleri karşılaştırması ve 9. tablo (İngilizce)." },
    { title: "Wikipedia · Charles Joseph Minard", url: "https://en.wikipedia.org/wiki/Charles_Joseph_Minard", note: "Minard'ın hayatı, 1869 haritasının kodlaması (1 mm = 10 000 kişi), Marey, Tufte ve Wainer'ın değerlendirmeleri (İngilizce)." },
    { title: "Wikipedia · 1854 Broad Street cholera outbreak", url: "https://en.wikipedia.org/wiki/1854_Broad_Street_cholera_outbreak", note: "Salgının seyri, Henry Whitehead ve ilk vaka, Sağlık Kurulu'nun miazma yargısı, William Farr ve Voronoi yaklaşımı (İngilizce)." },
    { title: "Wikipedia · Estimates of historical world population", url: "https://en.wikipedia.org/wiki/Estimates_of_historical_world_population", note: "Sayfadaki on tahmin dizisinin kaynak tablosu, tahmin yöntemleri ve eski dönem tahminlerinin belirsizliği üzerine notlar (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
