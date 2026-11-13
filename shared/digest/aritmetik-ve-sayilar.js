window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["aritmetik-ve-sayilar"] = {
  slug: "aritmetik-ve-sayilar",
  title: "Aritmetik ve Sayılar: Kuralların Arkasındaki Neden",
  field: "Matematik",
  level: "Lise hazırlık",
  minutes: 40,
  tagline: "Sayı doğrusundan √2'ye, işlem önceliğinden EBOB'a, kesirden yüzdeye: her kuralı önce bir modelde görün, sonra neden doğru olduğunu anlayın, en sonunda seviyeli alıştırmalarla kendinizi sınayın.",
  hook: "Bir fiyat önce %20 artsın, sonra %20 insin. Başa döner mi? Çoğumuz \"evet\" deriz; oysa 200 liralık ürün 192 liraya iner. Okulda ezberlenen kuralların çoğu böyle küçük bir \"neden\" sorusuyla yeniden canlanır.",
  bigIdea: "Aritmetiğin kuralları keyfî ezberler değildir: her biri ya sayıların yapısından (dağılma, asal çarpanlar, kalanlar) çıkar ya da herkesin aynı şeyi okuması için yapılmış açık bir uzlaşmadır; hangisinin hangisi olduğunu bilmek, matematiğe geri dönmenin en sağlam yoludur.",
  story: [
    "Bugün hiç düşünmeden kullandığımız on rakam ve sıfır uzun bir yolculuğun ürünüdür. Hint matematikçi Brahmagupta 628 yılında yazdığı <em>Brahmasphutasiddhanta</em>'da sıfırı \"bir sayıyı kendisinden çıkarmanın sonucu\" olarak tanımladı ve pozitif sayıları \"varlık\", negatifleri \"borç\" diye adlandırarak işaret kurallarını yazdı: iki borcun çarpımı bir varlıktır. Aynı eserde 0 ÷ 0'ı sıfır sayması ise bugün bir hata olarak anılır: sıfıra bölmenin tanımsız bırakılması çok daha sonra yerleşti.",
    "Bağdat'ta 9. yüzyılın ilk yarısında çalışan el-Hârizmî, Hint rakamlarıyla hesap üzerine bir kitap yazdı. Arapça aslı kayboldu; bize Latince bir çevirisi, <em>Algoritmi de numero Indorum</em> ulaştı ve \"algoritma\" sözcüğü bu başlıktaki adından türedi. MacTutor matematik tarihi arşivine göre sıfırın basamaklı yazımda yer tutucu olarak ilk kullanımı büyük olasılıkla bu eserdedir: 205 ile 25'i ayıran şey o sıfırdı.",
    "Avrupa'ya geçişte bir İtalyan'ın payı büyüktür. Pisalı Fibonacci matematiği Kuzey Afrika'da, Bugia'da (bugünkü Cezayir'in Bejaia kenti) öğrendi ve 1202'de yayımladığı <em>Liber abaci</em> ile basamaklı onluk sistemi ve Hint-Arap rakamlarını Avrupa'ya tanıttı. Kitabın ikinci bölümü tüccarlara yönelik büyük bir problem derlemesiydi: mal fiyatları, kâr hesabı, Akdeniz paraları arasında çevirme. Yani kesir, oran ve yüzde, daha baştan gündelik hesabın diliydi.",
    "Ondalık kesirler de benzer bir yol izledi. Onları ilk kez sistemli kullananlar İslam dünyasının matematikçileriydi; el-Uklîdisî 952'de yazdığı bir kitapta bunları tanıtmıştı. Ama günlük kullanıma sokan, Flaman bilgin Simon Stevin'in 1585'te yayımladığı 35 sayfalık <em>De Thiende</em> (\"onda birler sanatı\") oldu. Stevin virgül kullanmıyordu; ondalık noktası büyük olasılıkla 1612'de Pitiscus'un tablolarında belirdi. Yüzde işareti ise İtalyanca <em>per cento</em> (\"yüzde\") kısaltmasından doğdu: 15. yüzyıldan bir el yazmasında \"pc\" harfleri küçük bir halkayla yazılır; bu işaret 1650'ye gelindiğinde yatay bir kesir çizgisine benzemişti, önündeki \"per\" de zamanla düştü.",
  ],
  core: [
    {
      heading: "Sayı kümeleri: her genişleme bir işlemi mümkün kılar",
      body: "<strong>Doğal sayılar</strong> (ℕ) saymak içindir; Türkiye'deki okul kitapları 0'ı ℕ'ye katar, bazı üniversite kitapları katmaz. Çıkarma her zaman yapılabilsin diye negatifler eklenir: <strong>tam sayılar</strong> (ℤ). Bölme de yapılabilsin diye p/q kesirleri eklenir: <strong>rasyonel sayılar</strong> (ℚ). Doğru üzerinde yine delikler kalır: √2 ve π hiçbir kesre eşit değildir, bunlara <strong>irrasyonel</strong> denir. Hepsi birlikte <strong>gerçel sayılar</strong>dır (ℝ). Sayfadaki iç içe kümeler çizimi, her sayıyı ait olduğu en içteki kümeye yerleştirir: √9 = 3 doğal sayıdır, −7/4 rasyoneldir, π ise ℚ'nun dışında, irrasyonel bölgede durur.",
      formula: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ",
      formulaNote: "√2 rasyonel olsaydı bir p/q için p² = 2q² olurdu; sayfa bu eşitliğin denediğiniz hiçbir kesirde tutmadığını gösterir, her kesir için geçerli olduğunun ispatı ise ispat yöntemleri dersinin konusudur.",
    },
    {
      heading: "İşaret kuralı ispatlanır, işlem önceliği kararlaştırılır",
      body: "(−) × (−) = (+) bir ezber değildir. Dağılma özelliğinin negatif sayılar için de geçerli olmasını istersek başka seçeneğimiz kalmaz: (−a)·b + (−a)·(−b) = (−a)·(b + (−b)) = (−a)·0 = 0, ilk terim −ab olduğuna göre ikincisi ab olmak zorundadır. İşlem önceliği ise bir doğa yasası değil, bir yazım uzlaşmasıdır: önce parantez, sonra üs, sonra çarpma ve bölme (soldan sağa), en son toplama ve çıkarma (soldan sağa). Uzlaşma olmasa 2 + 3 × 4 kimine 14, kimine 20 olurdu. Uzlaşmanın gri bölgeleri de vardır: −3² yazılı matematikte −9 okunur; 48 ÷ 2(9 + 3) gibi yazımlar ise gerçekten belirsizdir: yan yana çarpmayı sıradan × sayan okuma 288, onu tek bir nicelik sayan okuma 2 verir ve ikisini de kullanan kitaplar ve hesap makineleri vardır. Tek doğru cevap yoktur; çözüm parantez eklemektir.",
      formula: "(−a)·(−b) = ab  ·  −3² = −(3²) = −9",
      formulaNote: "Sayfadaki desen tablosu aynı şeyi sayılarla gösterir: −3 × 3, −3 × 2, … satırlarında sonuç her adımda +3 artar ve desen sıfırın öbür yanında da sürer.",
    },
    {
      heading: "Asal çarpanlar, EBOB ve EKOK",
      body: "1'den büyük her doğal sayı asalların çarpımıdır ve bu çarpım, sıralama dışında tektir: <strong>aritmetiğin temel teoremi</strong>. Çarpan ağacını hangi yoldan büyütürseniz büyütün yapraklar aynı kalır. Bu tek yazılış çok şey verir. 360 = 2³ × 3² × 5'in bir böleni 2'yi 0–3 kez, 3'ü 0–2 kez, 5'i 0–1 kez kullanabilir; seçimler bağımsız olduğundan bölen sayısı 4 × 3 × 2 = 24'tür. <strong>EBOB</strong> için Öklid'in yolu çarpanlara ayırmadan da çalışır: büyük = bölüm × küçük + kalan yazılır ve iki sayıyı bölen her sayı kalanı da böler, bu yüzden EBOB adım adım değişmez. 84 ile 60 için üç adımda 12 bulunur. EBOB × EKOK = a × b eşitliği EKOK'u da hemen verir: 84 × 60 ÷ 12 = 420.",
      formula: "n = p₁<sup>e₁</sup> · p₂<sup>e₂</sup> ⋯  ⇒  bölen sayısı = (e₁ + 1)(e₂ + 1)⋯",
      formulaNote: "Bölünebilme kuralları da buradan doğar: 10, 100, 1000 … 9'a bölündüğünde hep 1 kalanını verdiği için bir sayının 9'a bölümünden kalan, rakamları toplamınınkiyle aynıdır.",
    },
    {
      heading: "Kesirler: parça saymak, alan ölçmek, kaç tane sığdığını sormak",
      body: "a/b'de <strong>payda</strong> bütünün kaç eşit parçaya bölündüğünü, <strong>pay</strong> kaç parça alındığını söyler. Toplamada ortak payda gerekir, çünkü yalnız aynı büyüklükteki parçalar sayılabilir: 1/2 = 3/6 ve 1/3 = 2/6, toplam 5/6. \"Pay paya, payda paydaya\" toplamak 2/5 verir; bu sayı iki kesrin arasında kalır, toplamları olamaz. Çarpma \"bir kesrin kesri\"dir ve alan modelinde görünür: 2/3 genişlik, 3/4 yükseklik, 12 hücrenin 6'sı boyalı, yani 1/2. Bölme \"kaç tane sığar\" sorusudur: 3/4'ün içine 6 tane 1/8 sığar. \"Ters çevir ve çarp\" kuralının gerekçesi bölmenin tanımıdır: bölüm, bölenle çarpılınca bölüneni veren sayıdır ve (a/b × d/c) × c/d = a/b.",
      formula: "a/b + c/d = (ad + cb)/bd  ·  a/b ÷ c/d = a/b × d/c",
      formulaNote: "1'den küçük bir sayıya bölmek büyütür (3/4 ÷ 1/3 = 9/4), 1'den küçük bir sayıyla çarpmak küçültür (2/3 × 3/4 = 1/2).",
    },
    {
      heading: "Ondalık, devir ve yüzde: kalanlar ve çarpanlar",
      body: "p/q'yu ondalık yazmak bölmeyi virgülden sonra sürdürmektir. Her adımın kalanı 0 ile q − 1 arasındadır; kalan 0 olursa ondalık biter, olmazsa en geç q adımda bir kalan tekrar eder ve rakamlar aynı sırayla döner. Sade paydada 2 ve 5'ten başka asal yoksa ondalık sonludur (3/8 = 0,375); varsa devirlidir (1/7 = 0,(142857), devir 6). Aynı mantık geriye de işler: x = 0,(9) ise 10x − x = 9 ve x = 1. Bu bir hile değil, 0,999… yazımının anlamıdır: 0,9; 0,99; 0,999 … dizisinin yaklaştığı sayı. <strong>Yüzde</strong> ise paydası 100 olan bir orandır ve bir değişim, değeri bir <strong>çarpanla</strong> çarpar: %20 artış 1,2 ile, %20 azalış 0,8 ile. Ardışık değişimler bu yüzden toplanmaz, çarpılır.",
      formula: "%r artış: × (1 + r/100)  ·  1,2 × 0,8 = 0,96",
      formulaNote: "İki yüzdenin farkı yüzde puanla söylenir: %10'dan %12'ye çıkış +2 yüzde puandır, oransal olarak ise +%20'lik bir artıştır.",
    },
  ],
  lab: {
    intro: "Sayfa beş sekmeden oluşur: <strong>01 · Sayılar ve işlemler</strong> (sayı doğrusu, √2 için kesir denemesi, işaret kuralları, işlem önceliği), <strong>02 · Bölünebilme, EBOB, EKOK</strong> (çarpan ağacı, Öklid kareleri, katlar şeridi), <strong>03 · Kesirler</strong> (şerit, alan ve \"kaç tane sığar\" modelleri), <strong>04 · Ondalık, oran, yüzde</strong> (uzun bölme, 0,999… = 1, bilimsel gösterim, orantı, ardışık yüzdeler) ve <strong>05 · Alıştırma ve hatalar</strong> (yedi konuda üç seviyeli, tohumlu alıştırma üreteci, ipucu, adım adım çözüm ve on sık hata kartı). Her sekmenin altında \"Bu sekmeyi sıfırla\" düğmesi var. Bütün hesaplar kesin kesirlerle yapılır; yanıtlarınız hiçbir yere kaydedilmez.",
    experiments: [
      {
        title: "√2'ye yakınlaşmak",
        predict: "Sayı doğrusunu yeterince büyütürseniz √2 sonunda bir ondalık çentiğin tam üstüne düşer mi? Ya da bir gün p² = 2q² eşitliğini sağlayan bir kesir bulabilir misiniz?",
        do: "01 sekmesinde √2 zaten seçili. Yakınlaştırma kaydırıcısını 1 kattan 10⁶ kata kadar adım adım sürün ve \"Ondalık aralık\" kutusunu izleyin. Sonra \"Bir kesir dene\" bölümünde 3/2, 17/12, 99/70 ve 577/408 düğmelerine basın; en sonda 1414/1000'i deneyin.",
        observe: "Aralık daralır ama hiç kapanmaz: 1 < √2 < 2, 10³ katta 1,414 < √2 < 1,415 (kareleri 1,999396 < 2 < 2,002225), 10⁶ katta 1,414213 < √2 < 1,414214. 99/70'te p² = 9801, 2·q² = 9800, fark +1; 577/408'de 332 929 ile 332 928, yine +1 ve √2'den fark yalnız +0,00000212. 1414/1000 ise −604 farkla çok daha kötüdür.",
        explain: "p² ile 2q² birbirinden farklı iki tam sayıysa aralarındaki fark en az 1'dir; en iyi kesirler bu sınıra iner ama 0'a hiçbir zaman inmez. √2'nin ondalık açılımı da bu yüzden ne biter ne de bir desenle tekrar eder. Sayfa yalnız örnekleri gösterir; bunun her kesir için doğru olduğunu çelişki yöntemiyle kanıtlamak ispat yöntemleri dersinin işidir.",
      },
      {
        title: "Aynı ifade, iki ayrı sayı",
        predict: "−3² + 2 × (7 − 4)² ÷ 6 kaçtır? Önce kâğıt üzerinde çözün; sonra yalnız soldan sağa giden birinin ne bulacağını tahmin edin.",
        do: "01 sekmesinin \"İşlem önceliği\" bölümünde varsayılan ifade hazır. Adımları okuyun, sonra hazır ifadelerden \"2 + 3 × 4\", \"48 ÷ 2(9 + 3)\" ve \"−3² + (−3)²\" düğmelerine basın.",
        observe: "Varsayılan ifade 6 adımda −6 verir (parantez, iki üs, çarpma, bölme, toplama); yalnız soldan sağa gidilirse −10,5 = −21/2 çıkar. 2 + 3 × 4'te 14'e karşı 20. 48 ÷ 2(9 + 3) için sayfa \"Okunan: 48 ÷ 2 × (9 + 3)\" yazar ve 288 bulur; durum satırı bunun yalnızca sayfanın uzlaşması olduğunu söyler ve öteki okumayı da gösterir: 48 ÷ (2 × (9 + 3)) = 2. −3² + (−3)² ise −9 + 9 = 0'dır.",
        explain: "Öncelik kuralı bir uzlaşmadır ve tam da bu tür belirsizlikleri ortadan kaldırmak için vardır. Baştaki eksi üsten sonra uygulandığı için −3² = −9, (−3)² = 9. 48 ÷ 2(9 + 3) türü yazımlarda ise herkesin kabul ettiği bir kural yoktur: 288 de 2 de bir uzlaşmanın sonucudur. Doğru tavır birini savunmak değil, parantez ekleyip ifadeyi tek anlamlı yapmaktır.",
      },
      {
        title: "Kesirleri parça parça saymak",
        predict: "1/2 + 1/3 kaç eder: 2/5 mi, başka bir şey mi? Peki 3/4'ün içine kaç tane 1/8 sığar, kaç tane 1/3?",
        do: "03 · Kesirler sekmesinde toplama varsayılan olarak 1/2 + 1/3'ü gösterir. Şeritleri ve \"Modelden sayılan\" kutusunu inceleyin. Sonra \"3/4 ÷ 1/8\" ve \"3/4 ÷ 1/3\" hazır düğmelerine basın.",
        observe: "Kural 5/6 ≈ 0,8333 verir; şeritte 1/6'lık parçalar tek tek sayılır: 3 + 2 = 5 / 6 parça. Durum satırı 2/5'in 0,4 ettiğini ve iki kesrin arasında kaldığını söyler. 3/4 ÷ 1/8 = 6 ve modelde \"6 tam parça\"; 3/4 ÷ 1/3 = 2,25 = 9/4 ve modelde \"2 tam + 1/4 parça\".",
        explain: "Toplamada parçaların aynı büyüklükte olması gerekir, ortak payda bunu sağlar. Bölme ise \"kaç tane sığar\" sorusudur; bölen 1'den küçükse içine birden fazla sığar ve bölüm bölünenden büyük çıkar. Kural ile parça sayımının her durumda aynı sonucu vermesi, kuralın bu modellerin kısaltması olduğunu gösterir.",
      },
      {
        title: "%20 zam, %20 indirim",
        predict: "200 liralık bir ürüne önce %20 zam, sonra %20 indirim yapılırsa son fiyat kaç olur? %10 ve yine %10 zam yapılırsa toplam artış %20 mi olur?",
        do: "04 sekmesinin \"Yüzde\" bölümünde varsayılanlar zaten başlangıç değeri 200, 1. değişim +%20, 2. değişim −%20. Sonra \"+%10, +%10\" ve \"−%50, +%100\" düğmelerine basın. En sonda \"Yüzde puan\" kaydırıcılarında önceki oranı 10, sonrakini 12 bırakıp okuyun.",
        observe: "240'tan sonra 192'ye inilir; toplam değişim −%4, not \"çarpan 1,2 × 0,8 = 0,96\"; \"Başa dönmek için gereken 2. değişim\" ≈ −%16,67: 240'tan 200'e inmek için %20 değil, yaklaşık %16,67 indirim yeter. +%10, +%10: 220 → 242, toplam +%21. −%50, +%100: %0. Yüzde puan: \"fark +2 yüzde puan. Oransal değişim +2/10 = +%20\".",
        explain: "Her yüzde değişimi bir önceki değer üzerinden hesaplanır; yani değişimler çarpan olarak çarpılır, toplanmaz. 1,2 × 0,8 = 0,96 olduğundan net etki %4 düşüştür. Aynı nedenle %50 düşüşü geri almak için %100 artış gerekir. Oranların farkını ise yüzde puanla, oransal değişimi yüzdeyle söylemek gerekir.",
      },
    ],
  },
  wow: [
    {
      title: "1/97'nin 96 basamaklık devri",
      body: "04 sekmesinde 1/97'yi seçin: ondalık açılım 0,(010309278350…) diye başlar ve devreden blok tam 96 basamaktır. Daha uzun olamaz, çünkü 97'ye bölmede yalnız 96 farklı sıfır olmayan kalan vardır; 1/97 bunların hepsini kullanır. Sayfa aynı uzunluğu kalanlardan ve paydadan ayrı ayrı hesaplar.",
    },
    {
      title: "Bilgisayar 0,1 + 0,2'yi tam bilemez",
      body: "Sayfa sizin tarayıcınızda 0.1 + 0.2'yi hesaplar ve 0,30000000000000004 gösterir. Bilgisayarlar ikili sayı kullanır; 1/10'un paydasında 5 olduğu için ikili açılımı devirlidir, tıpkı 1/3'ün onluk açılımı gibi. Bu yüzden 0,1 bellekte kesin saklanamaz. Sayfanın kendi hesapları ise kesin kesirlerle yapıldığından bu hatayı taşımaz.",
    },
    {
      title: "Neredeyse √2: 577/408",
      body: "577² = 332 929 ve 2 × 408² = 332 928: fark yalnız 1. Bu yüzden 577/408, √2'den 0,00000212 kadar uzaktadır; paydası 408'den küçük hiçbir kesir bu kadar yaklaşamaz. Ama fark 0'a hiçbir zaman inmez. 3/2, 7/5, 17/12, 41/29, 99/70 aynı ailenin önceki üyeleridir: her birinde p² − 2q² ya +1 ya da −1'dir.",
    },
  ],
  worked: {
    title: "Fayanslar ve yanıp sönen iki lamba",
    prompt: "84 cm × 60 cm boyutlarındaki bir tezgâh, kesilmeden ve boşluksuz olarak eş kare fayanslarla kaplanacak. (a) Fayansın kenarı en çok kaç cm olabilir ve kaç fayans gerekir? (b) Tezgâhın üstündeki iki lamba sırasıyla 84 saniyede ve 60 saniyede bir yanıp sönüyor. Şu an birlikte yandılarsa bir sonraki ortak yanış kaç dakika sonradır?",
    steps: [
      "Kare kenarı hem 84'ü hem 60'ı bölmelidir; en büyüğü EBOB'dur. Öklid algoritması: 84 = 1 × 60 + 24; 60 = 2 × 24 + 12; 24 = 2 × 12 + 0. Son sıfır olmayan kalan 12, yani EBOB(84, 60) = 12 cm. Çarpanlarla sağlama: 84 = 2² × 3 × 7, 60 = 2² × 3 × 5, ortak kısım 2² × 3 = 12.",
      "Uzun kenara 84 ÷ 12 = 7, kısa kenara 60 ÷ 12 = 5 fayans sığar: toplam 7 × 5 = 35 fayans. Alanla sağlama: 84 × 60 = 5040 cm² ve 35 × 12² = 35 × 144 = 5040 cm².",
      "İki lambanın birlikte yandığı anlar hem 84'ün hem 60'ın katıdır; ilki EKOK'tur. EBOB × EKOK = a × b eşitliğinden EKOK = 84 × 60 ÷ 12 = 5040 ÷ 12 = 420 s. Çarpanlarla: 2² × 3 × 5 × 7 = 420.",
      "420 s = 420 ÷ 60 = 7 dakika. Bu arada birinci lamba 420 ÷ 84 = 5 kez, ikincisi 420 ÷ 60 = 7 kez yanar. EKOK'un çarpım (5040 s) olmadığına dikkat: çarpım da ortak bir kattır ama en küçüğü değildir.",
    ],
    result: "(a) Kenarı 12 cm olan 35 fayans; (b) 420 s = 7 dakika sonra. Sayfada 02 sekmesindeki \"84 ve 60\" hazır çifti aynı sonuçları gösterir: EBOB 12, EKOK 420, \"12 × 420 = 5040 ve 84 × 60 = 5040 ✓\" ve 7 × 5 = 35 kare.",
  },
  misconceptions: [
    {
      myth: "0,999… 1'e çok yakındır ama 1'den biraz küçüktür.",
      truth: "0,999… yazımı 0,9; 0,99; 0,999 … dizisinin yaklaştığı sayıyı anlatır ve o sayı 1'dir. n tane 9'un 1'e uzaklığı 10⁻ⁿ'dir; 1 ile 0,999… arasındaki fark her n için 10⁻ⁿ'den küçük ya da eşit, negatif olmayan bir sayı olmalıdır ve böyle tek sayı 0'dır. Sayfada n kaydırıcısı 12'de \"0,000000000001 = 10⁻¹²\" gösterir; 10x − x yöntemi de doğrudan 1 verir.",
    },
    {
      myth: "Ondalık kısmı uzun olan sayı daha büyüktür: 0,45 > 0,5.",
      truth: "Ondalıklar basamak basamak karşılaştırılır, basamak sayısıyla değil. 0,5 = 0,50 yazılınca 50 yüzde birin 45 yüzde birden fazla olduğu görülür. \"45 > 5\" karşılaştırması farklı birimleri (yüzde birleri ve onda birleri) karıştırır; alıştırma sekmesindeki hata kartlarından biri tam olarak bu adımı işaretler.",
    },
    {
      myth: "Bölmek her zaman küçültür, çarpmak her zaman büyütür.",
      truth: "Bu yalnız 1'den büyük sayılar için doğrudur. 3/4 ÷ 1/8 = 6: 3/4'ün içine altı tane 1/8 sığar. 2/3 × 3/4 = 1/2: bir şeyin 3/4'ünü almak onu küçültür. Bölmek \"kaç tane sığar\", çarpmak \"kaç katı\" sorusudur; bölen ya da çarpan 1'den küçükse sonuç beklenenin tersine gider.",
    },
    {
      myth: "Faiz %10'dan %12'ye çıktıysa \"%2 arttı\" denir.",
      truth: "İki oranın farkı 2 <strong>yüzde puandır</strong>. Oranın kendisi ise 10'dan 12'ye çıkarak 2/10 = %20 artmıştır. \"%2 arttı\" demek yanlıştır, çünkü 10'un %2'si yalnız 0,2'dir. Sayfadaki kaydırıcıları %40 ve %44'e getirin: +4 yüzde puan, oransal olarak +%10.",
    },
  ],
  glossary: [
    { term: "Rasyonel sayı", definition: "p ve q tam sayı, q ≠ 0 olmak üzere p/q biçiminde yazılabilen sayı; ondalık açılımı ya sonludur ya da devirlidir." },
    { term: "İrrasyonel sayı", definition: "Hiçbir p/q kesrine eşit olmayan gerçel sayı; ondalık açılımı ne biter ne de bir desenle tekrar eder (√2, π)." },
    { term: "Asal sayı", definition: "1'den büyük olup yalnız 1'e ve kendisine bölünen doğal sayı; 2, 3, 5, 7, 11, … ." },
    { term: "EBOB", definition: "En büyük ortak bölen: iki ya da daha çok sayının hepsini kalansız bölen en büyük doğal sayı." },
    { term: "EKOK", definition: "En küçük ortak kat: verilen sayıların hepsinin katı olan en küçük pozitif doğal sayı; iki sayı için EBOB × EKOK = a × b." },
    { term: "Payda", definition: "Bir kesirde bütünün kaç eşit parçaya bölündüğünü gösteren, çizginin altındaki sayı; üstteki sayı paydır ve kaç parça alındığını söyler." },
    { term: "Devirli ondalık", definition: "Virgülden sonra belli bir rakam bloğunun sonsuza dek aynı sırayla tekrar ettiği ondalık yazılış; tekrar eden blok parantezle gösterilir: 0,1(6) = 0,1666… ." },
    { term: "Yüzde puan", definition: "İki yüzde arasındaki farkın birimi: %10'dan %12'ye çıkış 2 yüzde puanlık, ama oransal olarak %20'lik bir artıştır." },
  ],
  bridge: {
    heading: "Bundan sonra ve üniversitede",
    body: [
      "Bu sayfa Öğrenme Yolları'ndaki Uygulamalı Matematik dizisinin ilk adımıdır. Sıradaki iki ders <a href=\"cebirin-temelleri.html\">Cebirin Temelleri</a> ve <a href=\"us-ve-logaritma.html\">Üstel Fonksiyon ve Logaritma</a>. Cebirde buradaki her kural (dağılma, ters çevirip çarpma, işaret kuralları) harflerle yazılır ve bilinmeyeni bulmanın aracına dönüşür; ardışık yüzdeler ise bileşik faize, 10'un kuvvetleri logaritmaya götürür.",
      "Üniversitede bu konular kaybolmaz, derinleşir. Analiz I'in ilk haftaları gerçel sayıları aksiyomlarla kurar ve 0,999… = 1 gibi sonuçları limitle kanıtlar; Arşimet özelliği orada adıyla karşınıza çıkar. Sayılar kuramı Öklid algoritmasından ve aritmetiğin temel teoreminden başlar; devir uzunluğunun \"10'un payda modundaki mertebesi\" olması da modüler aritmetiğin ilk örneklerindendir. Soyut cebir kesirleri tam sayı çiftlerinden kurar, sayısal analiz kayan noktalı sayıların yuvarlama hatalarıyla uğraşır. İktisat, istatistik ve tıp ise oran, yüzde ve yüzde puan dilini her gün kullanır.",
    ],
    topics: ["Analiz I: gerçel sayılar ve limit", "Sayılar kuramı", "Modüler aritmetik", "Soyut cebir: kesirlerin kuruluşu", "Sayısal analiz: kayan nokta", "Oran ve yüzde dili (istatistik, iktisat)"],
  },
  quiz: [
    {
      question: "Bir hisse fiyatı bir günde %50 düşüyor. Ertesi gün kaç yüzde artarsa ilk fiyatına geri döner?",
      options: ["%50", "%75", "%100", "%150"],
      answer: 2,
      explanation: "Düşüş fiyatı 0,5 ile çarpar. Geri dönmek için çarpan 1/0,5 = 2 olmalıdır, bu da %100 artıştır. Değişimler çarpılır, toplanmaz: %50 artış yalnız 0,5 × 1,5 = 0,75'e, yani ilk fiyatın %75'ine götürür. Sayfadaki \"−%50, +%100\" düğmesi toplam değişimi %0 gösterir.",
    },
    {
      question: "Aşağıdaki kesirlerden hangisinin ondalık açılımı sonludur (devirli değildir)?",
      options: ["1/6", "5/12", "7/40", "2/7"],
      answer: 2,
      explanation: "Sade bir kesrin ondalığı, paydasında 2 ve 5'ten başka asal yoksa sonludur. 40 = 2³ × 5 olduğundan 7/40 = 0,175. 6 ve 12'nin paydasında 3, 7'nin paydasında 7 vardır: 1/6 = 0,1(6), 5/12 = 0,41(6), 2/7 = 0,(285714). Neden? 10 = 2 × 5; ancak bu asallardan oluşan bir payda 10'un bir kuvvetine genişletilebilir.",
    },
    {
      question: "144 = 2⁴ × 3² sayısının kaç pozitif böleni vardır?",
      options: ["6 bölen", "8 bölen", "12 bölen", "15 bölen"],
      answer: 3,
      explanation: "Bir bölen 2'yi 0'dan 4'e kadar (5 seçenek), 3'ü 0'dan 2'ye kadar (3 seçenek) kullanabilir; seçimler bağımsız olduğundan 5 × 3 = 15 bölen vardır: 1, 2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 36, 48, 72, 144. 02 sekmesine 144 yazarsanız formülle ve tek tek sayarak bulunan değerin ikisi de 15 çıkar.",
    },
  ],
  next: [
    { href: "pisagor.html", title: "Pisagor Teoremi: Kanıtlar, Üçlüler ve Eğri Yüzey", why: "Kenarı 1 olan karenin köşegeninin neden √2 olduğunu ve teoremin farklı kanıtlarını görürsünüz; Öklid formülüyle tam sayı üçlüleri aramak, buradaki çarpan ve EBOB düşüncesini sürdürür." },
    { href: "asal-rsa.html", title: "Asal Sayılar ve RSA: Elekten Şifreye", why: "Asalları elekle bulmaktan modüler aritmetiğe ve RSA şifrelemesine uzanır: aritmetiğin temel teoreminin ve EBOB'un bugün internet güvenliğinde nasıl iş gördüğünü gösterir." },
    { href: "kombinatorik-ve-sayma.html", title: "Kombinatorik ve Sayma: Seçimler, Güvercin Yuvası, İçerme–Dışlama ve Catalan", why: "Bölen sayısı formülünün arkasındaki çarpım kuralını genelleştirir; permütasyon, kombinasyon, güvercin yuvası ve içerme–dışlama ile saymayı bir yönteme dönüştürür." },
    { href: "sayisal-analiz.html", title: "Sayısal Analiz: Kök Bulma, Kayan Nokta, Sayısal Türev ve İntegral", why: "0,1 + 0,2'nin neden tam 0,3 çıkmadığını bir double'ın 64 biti ve makine epsilonu üzerinden açıklar; bilgisayarda ondalık hesabın sınırlarını gösterir." },
  ],
  sources: [
    { title: "MacTutor: Brahmagupta", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Brahmagupta/", note: "628 tarihli Brahmasphutasiddhanta; sıfırın tanımı, \"varlık\" ve \"borç\" ile işaret kuralları, 0 ÷ 0 hatası." },
    { title: "MacTutor: Al-Khwarizmi", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/", note: "Hint rakamları üzerine kitabının Latince çevirisi Algoritmi de numero Indorum, \"algoritma\" sözcüğü ve sıfırın yer tutucu olarak kullanımı." },
    { title: "MacTutor: Fibonacci", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Fibonacci/", note: "Bugia'daki eğitim, 1202'de yayımlanan Liber abaci ve tüccarlara yönelik problemleri." },
    { title: "Wikipedia: Simon Stevin", url: "https://en.wikipedia.org/wiki/Simon_Stevin", note: "1585 tarihli De Thiende, el-Uklîdisî'nin 952'deki öncülüğü ve ondalık noktasının Pitiscus'a atfedilmesi." },
    { title: "Wikipedia: Percent sign", url: "https://en.wikipedia.org/wiki/Percent_sign", note: "Yüzde işaretinin per cento kısaltmasından ve halkalı \"pc\" yazımından evrilmesi." },
  ],
  revision: "Kasım 2026",
};
