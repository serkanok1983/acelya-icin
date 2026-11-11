window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mayin-tarlasi"] = {
  slug: "mayin-tarlasi",
  title: "Mayın Tarlası: Sayılardan Kesinlik Çıkarmak",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 25,
  tagline:
    "Her sayı sekiz komşu hakkında bir denklemdir. 16×16'lık tahtada 40 mayını bulmak; denklem çözmek, olasılığı sayarak hesaplamak ve bilgisayar biliminin bir milyon dolarlık sorusuna dokunmak demek.",
  hook:
    "Yan yana 1, 2, 1 yazıyor ve üstlerinde beş kapalı kare duruyor. Sayfanın ipucu satırı ortadaki kare için 'yüzde 33 güvenli' diyor. Oysa o kare yüzde yüz güvenli, iki yanındakiler yüzde yüz mayın; bunu üç satırlık bir çıkarmayla kanıtlayabilirsin. Tahmin nerede biter, kesinlik nerede başlar?",
  bigIdea:
    "Açık her sayı, komşu kapalı kareler için bir <strong>denklemdir</strong>: bilinmeyenler 0 ya da 1, toplamları o sayı. İyi oyun, bu denklemleri tek tek değil <em>birlikte</em> çözmek; çözülemeyen yerde ise tutarlı yerleşimleri sayıp en küçük olasılığı seçmektir.",
  story: [
    "Mayın tarlası fikri Microsoft'tan eskidir. 1983'te Ian Andrew, ZX Spectrum için <em>Mined-Out</em>'u yazdı: oyuncu görünmez mayınlarla dolu bir alanı yürüyerek geçiyor, ekran da ona bastığı karenin kaç mayına komşu olduğunu söylüyordu. 1980'lerin ikinci yarısında üniversite bilgisayarlarında benzer oyunlar dolaşıyordu. Microsoft sürümünü Curt Johnson önce IBM'in OS/2 sistemi için yazdı; Robert Donner onu Windows'a taşıdı. Andrew, Microsoft'un kendi oyununu kopyaladığını söyler; Johnson tasarımı başka bir oyundan aldığını kabul eder ama o oyunun Mined-Out olmadığını belirtir. Kimin kimden esinlendiği bugün de tam aydınlanmış değil.",
    "Oyun ilk kez 1990'da, ayrıca satılan Microsoft Entertainment Pack'in içinde çıktı. Asıl ününü 1992'de kazandı: Windows 3.1'de Reversi'nin yerini aldı ve her bilgisayara kendiliğinden kurulur oldu. Klasik üç düzey o günlerden kalmadır; bu sayfadaki 16×16 kare ve 40 mayın, 'orta' düzeyin ölçüleridir (uzman düzey 30×16 karede 99 mayındır). Şirketin içinde de bağımlıları vardı: Bill Gates'in mesai bittikten sonra bir çalışma arkadaşının odasına girip oynadığı anlatılır. 1999'da 'Winmine'ı Yasaklama Uluslararası Kampanyası' oyunun gerçek mayın kurbanlarına karşı duyarsız olduğunu savundu; sonraki yıllarda bazı yerel sürümlerde mayınlar çiçeğe, oyunun adı Çiçek Tarlası'na döndü. Windows 8'le birlikte oyun sistemden çıkarılıp mağazaya taşındı.",
    "2000 yılında Birmingham Üniversitesi'nden matematikçi Sadie Kaye, <em>The Mathematical Intelligencer</em>'da 'Minesweeper is NP-complete' başlıklı bir makale yayımladı (makale o dönemki adıyla, Richard Kaye imzasıyla çıktı). Gösterdiği şey şuydu: sayılar ve bayraklarla kısmen doldurulmuş bir tahtanın <strong>tutarlı</strong> olup olmadığına, yani o sayılara uyan en az bir mayın yerleşimi bulunup bulunmadığına karar vermek, bilgisayar biliminin en zor bilinen problem ailesinin tam ortasındadır. Aynı yıl Clay Matematik Enstitüsü, bu ailenin hızlı çözülüp çözülemeyeceği sorusuna, yani P ile NP'nin eşit olup olmadığına bir milyon dolar ödül koydu. Böylece ofis saatlerini yiyen gri oyun, matematiğin açık problemleriyle aynı cümlede anılır oldu.",
  ],
  core: [
    {
      heading: "Her sayı bir denklem",
      body:
        "Kapalı her kareye bir bilinmeyen ver: mayınsa 1, değilse 0. Açık bir karedeki sayı, sekiz komşusundaki bilinmeyenlerin toplamıdır. Bayrak koyduğun komşular bilinenlere geçer; geriye 'kalan mayın = sayı − bayrak' kalır. İki uç durum bütün kolay hamleleri verir. Kalan mayın sayısı kapalı komşu sayısına eşitse hepsi mayındır: çevresinde tek kapalı kare kalan bir 1, o kareyi ele verir. Kalan sıfırsa kapalı komşuların hepsi güvenlidir. Deneyimli oyuncuların 'ezber' dediği kalıpların çoğu bu iki kuralın art arda uygulanmasıdır. Sayfadaki sayaç da aynı muhasebeyi tahtanın tümü için tutar: Mayın = 40 − bayrak.",
      formula: "x<sub>1</sub> + x<sub>2</sub> + … + x<sub>m</sub> = n,  x<sub>i</sub> ∈ {0, 1}",
      formulaNote: "m kapalı ve bayraksız komşu sayısı, n kalan mayın. n = m ise hepsi 1, n = 0 ise hepsi 0.",
    },
    {
      heading: "Denklemleri birleştirmek",
      body:
        "Tek başına hiçbir şey söylemeyen iki sayı, birlikte kesin konuşabilir. En kullanışlı araç <strong>alt küme kuralı</strong>dır: bir sayının kapalı komşuları, komşu sayının kapalı komşularının içinde kalıyorsa iki denklemi birbirinden çıkar; aradaki fark, dışarıda kalan karelerdeki mayın sayısıdır. Bir 1'in iki kapalı komşusu a ve b, yanındaki 2'nin komşuları a, b ve c ise c kesinlikle mayındır: 2 − 1 = 1. Bilgisayar bilimi buna <strong>kısıt sağlama problemi</strong> der: değişkenler, alabilecekleri değerler ve hepsinin birden uyması gereken kısıtlar. Sudoku da, ders programı hazırlamak da aynı kalıptadır. Çözücüler önce kesin çıkarımları yayar, tıkanınca bir değişkene değer verip çelişki arar.",
      formula: "A ⊂ B  ⇒  Σ<sub>B∖A</sub> x<sub>i</sub> = n<sub>B</sub> − n<sub>A</sub>",
      formulaNote: "A ve B iki sayının kapalı komşu kümeleri; fark sıfırsa dışarıdakiler güvenli, dışarıdaki kare sayısına eşitse hepsi mayın.",
    },
    {
      heading: "Olasılık: tutarlı yerleşimleri saymak",
      body:
        "Mantık tükendiğinde doğru soru 'bu kare mayın mı' değil, 'sayılara uyan yerleşimlerin kaçında mayın' sorusudur. Bu bir <strong>koşullu olasılık</strong>tır: bildiklerin, 40 mayının 256 kareye dağılabileceği C(256, 40) ≈ 1.05 × 10<sup>47</sup> yerleşimin çoğunu eler; kalanlar eşit olasıdır. Sınırdaki, yani açık sayılara değen karelerdeki her çözüm aynı ağırlıkta değildir: sınırda k mayın kullanan bir çözüm, geri kalan M − k mayını uzaktaki U kareye C(U, M − k) biçimde dağıtabilir. Bu oyundaki yoğunlukta sınırda bir mayın daha az kullanan çözüm kabaca dört beş kat ağırdır. Sayfanın ipucu bu hesabı yapmaz: kareye değen her sayıya ayrı bakar, kalan/kapalı oranını alır ve en kötümserini gösterir; hiçbir sayıya değmeyen karede ise tahtanın tümündeki kalan mayın/kapalı kare oranını kullanır. Tek sayının konuştuğu yerde iyi bir tahmindir, sayıların birlikte konuştuğu yerde yanılır.",
      formula: "P(mayın) = Σ<sub>kareyi mayın sayan çözümler</sub> C(U, M − k) / Σ<sub>bütün çözümler</sub> C(U, M − k)",
      formulaNote: "M kalan mayın, U hiçbir sayıya değmeyen kapalı kare sayısı, k çözümün sınırda kullandığı mayın sayısı. Ağırlık oranı C(U, m + 1)/C(U, m) = (U − m)/(m + 1): beş karede bir mayın varsa yaklaşık 4.",
    },
    {
      heading: "Sıfıra basınca açılan göl: taşırma",
      body:
        "0 yazan bir kareyi açtığında çevresindeki sekiz kare de güvenlidir; kod onları da açar, aralarında 0 olan varsa aynı işi onun için yineler. Bu özyinelemeli yayılmaya <strong>taşırma</strong> (flood fill) denir; boya programlarındaki kova aracı aynı algoritmadır. Sonuç, birbirine değen sıfırlardan oluşan bir bölge ve onu çevreleyen sayılardan bir kıyıdır. Sayfada ilk tıkladığın kare ve sekiz komşusu mayınsız bırakılır; yani ilk kare her zaman 0'dır ve oyun her zaman bir gölle başlar. Gölün büyüklüğü şansa bağlıdır: mayınlar rastgele dağıldığında bir iç karenin 0 olma olasılığı yaklaşık dörtte birdir ve sıfırlar ancak yan yana düştüklerinde birleşir.",
      formula: "P(0) = C(247, 40) / C(255, 40) ≈ 0.25",
      formulaNote: "Mayınsız bir iç karenin sekiz komşusunun da mayınsız olma olasılığı; komşu başına yoğunluk 40/255 ≈ 0.157; 0.843⁸ ≈ 0.255 kaba hesabı da aynı yere çıkar.",
    },
    {
      heading: "Tutarlılık sorusu ve NP-tamlık",
      body:
        "Kaye'nin 2000'deki teoremi dikkatle okunmalı. Problem şudur: sayılar ve bayraklarla kısmen doldurulmuş, istenen büyüklükte bir tahta veriliyor; bu sayılara uyan bir mayın yerleşimi var mı? Evet yanıtını doğrulamak kolaydır: yerleşimi gösterirsin, her sayı tek tek denetlenir. Bulmak ise zordur: Kaye, mayın kalıplarından tel, VE kapısı ve DEĞİL kapısı kurarak her mantık devresinin bir tahtaya çevrilebileceğini gösterdi. Tutarlılığı hızlı çözen bir yöntem, devre doyurulabilirliğini ve onunla birlikte bütün <strong>NP</strong> problemlerini hızlı çözerdi. Teoremin söylemediği şeyler de var: 16×16'lık oyun sonludur ve bilgisayar onu rahatça inceler; zorluk tahta büyüdükçe ortaya çıkar. Ayrıca oyuncunun asıl sorusu 'bu kare kesin güvenli mi' sorusudur; Scott, Stege ve van Rooij 2011'de bunun da zor olduğunu, co-NP-tam olduğunu gösterdi.",
      formula: "Tutarlılık ∈ P  ⇒  P = NP",
      formulaNote: "Okunuşu: tutarlılık sorusu için hızlı (polinom zamanlı) bir algoritma varsa NP'deki her problem için vardır. Tersini kimse kanıtlayamadı.",
    },
  ],
  lab: {
    intro:
      "Tahta 16×16 = 256 kare, içinde 40 mayın var. <strong>Sol tık</strong> açar; <strong>sağ tık</strong> (ya da Ctrl ile tık, dokunmatikte uzun basış) bayrak koyar ve <strong>Mayın</strong> göstergesini bir azaltır. <strong>Süre</strong> ilk tıkla başlar. Oyun başladıktan sonra fareyi kapalı bir karenin üzerine getirince karede ve üstteki satırda <strong>tahmini güvenli açılma</strong> yüzdesi belirir (dokunmatik ekranda bu ipucu yoktur). İpucunun üç kuralı var: kareye değen sayılardan birinin bütün mayınları bayraklanmışsa % 100 yazar; değilse değen her sayı için 1 − kalan/kapalı oranını hesaplayıp en küçüğünü gösterir; kare hiçbir sayıya değmiyorsa tahtanın tümüne bakar ve 1 − (40 − bayrak)/(bayraksız kapalı kare) yazar. Bayraklarına inanır: yanlış bayrak ipucunu da yanıltır. Kazanmak için bayrak gerekmez: mayınsız 216 karenin hepsini açman yeter.",
    experiments: [
      {
        title: "İlk tık: köşe mi, orta mı?",
        predict:
          "İlk tık her zaman güvenli. Peki köşeye mi tıklamak daha çok kare açar, tahtanın ortasına mı? Ortadan başlayınca 256 karenin kabaca kaçta kaçı tek tıkla açılır?",
        do: "Yeni Oyun'a basıp sol üst köşeye tıkla ve açılan bölgenin büyüklüğüne bak. Bunu beş kez yap. Sonra beş oyunu tahtanın ortasına tıklayarak başlat.",
        observe:
          "İlk tıkladığın kare hiçbir zaman sayı çıkmaz; her seferinde bir bölge açılır. Ortadan başlayınca ortalama 64 kare, yani tahtanın dörtte biri açılır; on oyunun sekizinde 21 ile 108 kare arası. Köşede ortalama 27 karedir ve oyunların yarısında 17 kareyi geçmez; kenar ortasında ortalama 42.",
        explain:
          "Kod, tıkladığın kareyi ve komşularını mayınsız bıraktığı için ilk kare hep 0'dır ve taşırma başlar. Ortadaki karenin sekiz komşusu yayılacak sekiz kapı demektir; köşenin yalnız üç komşusu vardır ve göl duvara sıkışır. Sayılar, sayfanın yerleştirme ve açma kodunun her başlangıç karesi için bilgisayarda 200 000 kez çalıştırılmasından.",
      },
      {
        title: "İpucunu sen hesapla",
        predict:
          "Çevresinde üç kapalı kare olan bir 1'in komşusuna fareyi götürürsen ipucu yüzde kaç yazar? Aynı durumda sayı 2 olsaydı? Tek kapalı komşusu kalmış bir 1'de?",
        do: "Açılan bölgenin kıyısında, başka sayılara değmeyen kapalı kareler ara. Önce komşu sayının kapalı komşularını say, tahminini yaz, sonra fareyi karenin üzerine getir. % 0 gördüğün kareye sağ tıkla bayrak koy ve çevresindeki karelere yeniden bak.",
        observe:
          "1 ve üç kapalı kare: % 67. 2 ve üç kapalı kare: % 33. 1 ve iki kapalı kare: % 50. 1 ve tek kapalı kare: % 0. İlk bayrağı koyunca Mayın göstergesi 39 olur; bayrağa değen sayıların öbür kapalı komşularında yüzde yükselir ya da aynı kalır, hiç düşmez. Bayrak bir 1'in tek mayınıysa o 1'in öbür kapalı komşuları % 100'e çıkar.",
        explain:
          "İpucu her sayı için 1 − kalan/kapalı oranını hesaplar ve tam sayıya yuvarlar: 1 − 1/3 = 0.667. Bayrak, 'kalan'ı bir azaltır ve bayraklı kareyi 'kapalı' sayımından çıkarır; denklem bir bilinmeyen eksilmiş olur. Kalan sıfıra indiyse kod başka sayılara bakmadan % 100 yazar; inmediyse, kareye birden çok sayı değiyorsa bunların en küçüğünü gösterir.",
      },
      {
        title: "İpucunun kör noktası: 1-2-1",
        predict:
          "Açık bölgenin düz bir kıyısında yan yana 1, 2, 1 duruyor; kapalı kareler yalnızca bir yanda. İpucu, 2'nin tam karşısındaki kapalı kare için yüzde kaç yazar? O kareyi açmayı göze alır mısın?",
        do: "Birkaç oyun açıp düz bir kıyıda 1-2-1 dizilişi ara; hiç bayrak koyma. Fareyi 2'nin karşısındaki kapalı kareye götür ve yüzdeyi oku, sonra kareyi aç. Bir sonraki 1-2-1'de önce 1'lerin karşısındaki iki kareye bayrak koy ve ortadaki kareye yeniden bak.",
        observe:
          "Bayraksız durumda ortadaki kare için % 33 yazar; 1'lerin karşısındaki kareler için de en çok % 33. Ortadaki kare açıldığında her seferinde güvenli çıkar. 1'lerin karşısına bayrak koyduğun anda aynı kare % 100'e sıçrar.",
        explain:
          "Kod her sayının oranını ayrı hesaplar ve en küçüğünü gösterir; denklemleri birbirinden çıkarmaz. Oysa üç denklem birlikte tek bir yerleşime izin verir: mayınlar 1'lerin karşısındadır, ortadaki kare güvenlidir (çözümlü örnekte kanıtı var). Kod kesinliği ancak bir sayının kalanı sıfıra inince, yani sen bayrakları koyunca görür. Gerçek bir çözücü önce böyle kesinlikleri kendisi yayar, olasılığı sonra hesaplar.",
      },
      {
        title: "Mecbur kalınca nereye tıklamalı?",
        predict:
          "Kıyıda iki kare ve aralarında tek mayın kaldı: yazı tura. Buna mı güvenmek daha iyi, yoksa hiçbir sayıya değmeyen uzak bir kareyi açmak mı?",
        do: "Ortadan başla. Mayın göstergesindeki sayıyı bayraksız kapalı karelerin sayısına böl (kapalı kareleri, 256'dan açık olanları kabaca çıkararak bul) ve 1'den çıkar. Sonra fareyi hiçbir açık sayıya değmeyen uzak bir kareye götürüp ipucunu oku. Bu yüzdeyi kıyıda gördüğün en iyi yüzdeyle karşılaştır. Oyun ilerledikçe birkaç kez yinele.",
        observe:
          "Tipik bir açılıştan sonra 192 kapalı karede 40 mayın vardır: mayın olasılığı % 21, güvenli açılma 1 − 40/192 ≈ % 79. İpucu uzak karelerde tam bu hesabı gösterir; ortadan başlanan oyunların çoğunda % 73 ile % 83 arasında bir sayı okursun. Bu, kıyıdaki % 50'den de % 67'den de iyidir. Oyunun sonuna doğru oran değişir; 20 kapalı karede 10 mayın kaldıysa uzak kare de yazı turadır.",
        explain:
          "Uzak kareler için kaba tahmin kalan mayın/kapalı kare oranıdır ve sayfanın gösterdiği de budur; kesin değer, kıyıdaki çözümlerin kaç mayın kullandığına göre biraz oynar. İlke değişmez: tahmin edeceksen mayın olasılığının en küçük olduğu yeri seç. Uzak karenin bedeli bilgidir: açılan kare çoğu kez yalnız bir sayı gösterir, yeni bir göl açmaz.",
      },
    ],
  },
  wow: [
    {
      title: "Bir milyon dolarlık oyun",
      body:
        "Kaye'nin 2000 tarihli teoremine göre, verilen bir tahtanın tutarlı olup olmadığını her boyutta hızlı çözen bir algoritma bulan kişi P = NP olduğunu kanıtlamış olur. Bu, Clay Matematik Enstitüsü'nün aynı yıl bir milyon dolar ödül koyduğu yedi problemden biridir. Çoğu araştırmacı öyle bir algoritmanın bulunmadığına inanıyor; ama bunu kanıtlamak da aynı ödülü kazandırır ve çeyrek yüzyıldır kimse başaramadı.",
    },
    {
      title: "10 üzeri 47 tarla",
      body:
        "40 mayın 256 kareye C(256, 40) = 104 921 249 538 770 987 879 991 995 968 495 941 124 675 048 800 farklı biçimde yerleşebilir: yaklaşık 1.05 × 10<sup>47</sup>. Tahtanın ortasına yaptığın ilk tık dokuz kareyi mayınsız bırakır ve bu sayıyı C(247, 40) ≈ 2.2 × 10<sup>46</sup>'ya indirir; tek tıkla olasılıkların beşte dördü elenmiş olur. Oyunun geri kalanı, kalan yerleşimleri bire indirme işidir.",
    },
    {
      title: "Mayınların yerine çiçekler",
      body:
        "1999'da kurulan 'Winmine'ı Yasaklama Uluslararası Kampanyası', gerçek mayınların her yıl insanları sakat bıraktığı bir dünyada oyunun duyarsız olduğunu savundu. Windows 2000, ME ve XP'nin bazı yerel sürümlerinde oyun Çiçek Tarlası adıyla çıktı, mayınların yerini çiçekler aldı; Windows Vista'yla gelen yeni sürümde çiçekli görünüm bazı ülkelerde varsayılan oldu. Matematik aynı kaldı: çiçeklerin de çevresindeki sayılar sekiz komşuyu sayıyordu.",
    },
  ],
  worked: {
    title: "Duvardaki 1-2-1",
    prompt:
      "Açık bir satırda yan yana 1, 2, 1 sayıları var; hemen üstlerindeki satırda soldan sağa a, b, c, d, e kapalı kareleri duruyor ve bu üç sayının başka kapalı komşusu yok. Soldaki 1'in komşuları a, b, c; ortadaki 2'nin b, c, d; sağdaki 1'in c, d, e. Mayınlar nerede? Sayfanın ipucu c karesi için en çok yüzde kaç gösterir?",
    steps: [
      "Bilinmeyenleri tanımla: her kare için mayınsa 1, değilse 0. Üç sayı üç denklem verir: a + b + c = 1, b + c + d = 2, c + d + e = 1.",
      "İkinciden birinciyi çıkar: d − a = 1. İki bilinmeyen de 0 ya da 1 olabildiğinden tek olanak d = 1, a = 0'dır.",
      "İkinciden üçüncüyü çıkar: b − e = 1, yani b = 1 ve e = 0.",
      "Ortadaki denkleme dön: b + c + d = 1 + c + 1 = 2 olduğundan c = 0. Denetle: a + b + c = 0 + 1 + 0 = 1 ve c + d + e = 0 + 1 + 0 = 1. Beş karenin 2⁵ = 32 olası durumundan yalnızca biri üç sayıya birden uyar.",
      "İpucuyla karşılaştır. Kod her sayıya ayrı bakar: c için 1'ler 1 − 1/3 = % 67, 2 ise 1 − 2/3 = % 33 der; satır en küçüğünü, % 33'ü gösterir. b ve d için de en çok % 33, a ve e için en çok % 67 yazar (bu karelere yandaki başka sayılar da değebilir). Gerçek değerler c için % 100, b ve d için % 0, a ve e için % 100'dür. b ve d'yi bayraklarsan 1'lerin kalanı sıfıra iner ve ipucu a, c, e için % 100'e döner.",
    ],
    result:
      "Mayınlar 1'lerin tam üstünde, b ve d'dedir; a, c ve e güvenlidir. İpucunun % 33 dediği c karesi kesin güvenli, yine % 33 dediği b ve d kesin mayındır: üç denklemi birlikte çözmek, üç ayrı tahminin göremediğini görür.",
  },
  misconceptions: [
    {
      myth: "Kazanmak için bütün mayınları bayraklamak gerekir.",
      truth:
        "Sayfa yalnızca mayınsız 216 karenin açılıp açılmadığına bakar; tek bayrak koymadan da kazanırsın. Bayrak senin not defterindir: ipucunun 'kalan mayın' hesabına girer ve yanlışlıkla tıklamayı önler. Hız rekortmenlerinin bir kısmı hiç bayrak kullanmaz.",
    },
    {
      myth: "Her tahta mantıkla çözülür; tıkandıysam bir şeyi kaçırıyorum.",
      truth:
        "Mayınlar rastgele dağıtıldığı için bazı konumlarda sayılara uyan birden çok yerleşim vardır ve hiçbir akıl yürütme onları ayıramaz. En bilinen örnek köşede kalan iki kare ve tek mayındır: gerçek bir yazı tura. O noktada yapılacak şey olasılığı en küçük kareyi seçmektir.",
    },
    {
      myth: "İpucundaki yüzde, karenin gerçek güvenlik olasılığıdır.",
      truth:
        "Sayfa bunu kendisi de söyler: 'basit olasılık tahmini, kesin değildir.' Yüzde, tek bir sayının kalan/kapalı oranıdır ve birden çok sayı varsa en kötümseri gösterilir. 1-2-1 kalıbında kesin güvenli kareye % 33 der. Kesin konuştuğu iki durum vardır ve ikisi de bayraklarının doğruluğuna bağlıdır: % 0 ve % 100. Gerçek olasılık için bütün tutarlı yerleşimleri saymak gerekir.",
    },
    {
      myth: "NP-tam olduğuna göre bilgisayarlar Mayın Tarlası'nı çözemez.",
      truth:
        "NP-tamlık tek bir tahtanın değil, tahta büyüdükçe en kötü durumdaki işin nasıl büyüdüğünün ölçüsüdür. 16×16'lık bir oyunda bir program kıyıdaki bütün tutarlı yerleşimleri saniyenin küçük bir kesrinde sayar. Çözemediği şey başkadır: yazı tura durumunda mayının yerini o da bilemez.",
    },
  ],
  glossary: [
    { term: "Kısıt", definition: "Bilinmeyenlerin birlikte sağlaması gereken koşul; burada bir sayının kapalı komşularındaki mayınların toplamı." },
    { term: "Kısıt sağlama problemi", definition: "Değişkenlere, verilen bütün kısıtlara uyan değerler bulma problemi; Sudoku ve ders programı da bu türdendir." },
    { term: "Koşullu olasılık", definition: "Bir bilginin doğru olduğu durumlarla sınırlandığında bir olayın olasılığı; burada açık sayılara uyan yerleşimler içinde mayınlı olanların payı." },
    { term: "Kombinasyon C(n, k)", definition: "n nesneden sırasız k tanesini seçmenin yol sayısı; 40 mayının 256 kareye yerleşim sayısı C(256, 40)'tır." },
    { term: "Taşırma (flood fill)", definition: "Bir kareden başlayıp koşulu sağlayan komşulara özyinelemeyle yayılan algoritma; 0 açıldığında bölgeyi açan budur." },
    { term: "Tutarlılık problemi", definition: "Kısmen doldurulmuş bir tahtadaki sayılara uyan en az bir mayın yerleşimi var mı sorusu; Kaye'nin NP-tam olduğunu gösterdiği problem." },
    { term: "NP", definition: "'Evet' yanıtı, verilen bir kanıtla hızlıca doğrulanabilen karar problemlerinin sınıfı." },
    { term: "NP-tam", definition: "NP'deki her problemin kendisine hızlıca dönüştürülebildiği NP problemi; biri hızlı çözülürse hepsi çözülür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu oyundaki iki düşünme biçimi iki ayrı dersin konusudur. Kesin çıkarım, <strong>Ayrık Matematik</strong> ve <strong>Yapay Zekâ</strong> derslerinde kısıt sağlama adıyla görülür: kısıt yayılımı, geri izleme, 0-1 tamsayılı doğrusal denklemler. Tahmin ise <strong>Olasılık ve İstatistik</strong> dersinin koşullu olasılığıdır: her yeni sayı bir gözlemdir ve olası dünyaların kümesini daraltır. Bayes kuralı bunun genel biçimidir; 'eşit olası yerleşimleri say' yöntemi, başlangıçta bütün yerleşimlerin eşit olası olduğu özel durumdur. Sınırdaki çözümlere C(U, M − k) ağırlığı vermek ise hipergeometrik dağılımın ta kendisidir.",
      "Kaye'nin teoremi <strong>Hesaplama Kuramı</strong> dersine açılan kapıdır. Orada önce P ve NP sınıflarını, sonra bir problemi ötekine çeviren <em>indirgeme</em> fikrini öğrenirsin; Cook ve Levin'in 1970'lerin başında gösterdiği gibi mantık formüllerinin doyurulabilirliği NP-tamdır ve Mayın Tarlası'nınki gibi yüzlerce kanıt oradan zincirleme türetilir. Kaye daha da ileri gitti: sonsuz bir tahtada mayın kalıplarıyla her hesabın benzetilebileceğini, yani sonsuz Mayın Tarlası'nın Turing-tam olduğunu gösterdi. Taşırma algoritması ise Veri Yapıları dersinde çizgelerde derinlik öncelikli ve genişlik öncelikli arama olarak karşına çıkar.",
    ],
    topics: ["Koşullu olasılık ve Bayes kuralı", "Hipergeometrik dağılım", "Kısıt sağlama ve geri izleme", "P, NP ve indirgeme", "Doyurulabilirlik (SAT)", "Çizgelerde arama (DFS, BFS)"],
  },
  quiz: [
    {
      question: "Açık bir 2'nin çevresinde bir bayrak ve iki kapalı, bayraksız kare var. Bu iki kareden birinin üzerine geldiğinde sayfanın ipucu ne yazar (kareye başka sayı değmiyorsa)?",
      options: ["% 0", "% 33", "% 50", "% 100"],
      answer: 2,
      explanation: "Kalan mayın 2 − 1 = 1, kapalı ve bayraksız kare 2 tane: 1 − 1/2 = % 50. Bayrak hem 'kalan'ı azaltır hem de kendini kapalı kare sayımından çıkarır. Bayrak olmasaydı hesap üç karede iki mayın, yani % 33 olurdu.",
    },
    {
      question: "Bir 1'in kapalı komşuları yalnızca a ve b. Yanındaki 2'nin kapalı komşuları a, b ve c. c hakkında ne söylenebilir?",
      options: ["Kesin güvenlidir", "Kesin mayındır", "Yarı yarıya mayındır", "Üçte iki olasılıkla mayındır"],
      answer: 1,
      explanation: "a + b = 1 ve a + b + c = 2 denklemlerini birbirinden çıkar: c = 1. Bu, alt küme kuralıdır: 1'in komşuları 2'nin komşularının içinde kalıyor, fark dışarıdaki kareye düşüyor. Mayının a'da mı b'de mi olduğu ise hâlâ bilinmez; ikisi de yarı yarıyadır.",
    },
    {
      question: "Kaye'nin 'Mayın Tarlası NP-tamdır' teoremi aşağıdakilerden hangisini söyler?",
      options: [
        "16×16'lık bir oyunu hiçbir bilgisayar çözemez",
        "Her tahtada mutlaka şansa kalan bir kare vardır",
        "Verilen sayılara uyan bir mayın yerleşimi var mı sorusunu her boyutta hızlı çözen yöntem, bütün NP problemlerini de hızlı çözer",
        "Mayın sayısı arttıkça kazanma olasılığı sıfıra iner",
      ],
      answer: 2,
      explanation: "Teorem tutarlılık problemiyle ilgilidir ve tahta büyüdükçe en kötü durumdaki zorluğu anlatır. Sabit boyutlu bir oyun sonludur; şansa kalan kareler de ayrı bir konudur. Böyle bir hızlı yöntem bulunursa P = NP olur; bulunamayacağını kanıtlamak da açık bir problemdir.",
    },
  ],
  next: [
    { href: "bayes-olasilik.html", title: "Bayes Olasılığı", why: "Her açılan sayı bir kanıttır; yeni bilgiyle olasılığı güncellemenin genel kuralı burada." },
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi: Turing Makineleri, Lambda Hesabı ve Çözülemezlik", why: "İndirgeme fikri ve çözülemezlik haritası: Kaye’nin teoreminin oturduğu zemin ve bir milyon dolarlık P–NP sorusu." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "Taşırmanın akrabaları: bir ızgarada komşudan komşuya yayılan aramalar." },
    { href: "isik-sondurme.html", title: "Işık Söndürme", why: "Yine ızgara, yine 0 ve 1; ama bu kez denklemler her zaman tam çözülür ve şansa yer yoktur." },
  ],
  sources: [
    { title: "Wikipedia · Minesweeper (video game)", url: "https://en.wikipedia.org/wiki/Minesweeper_(video_game)", note: "Mined-Out ve öbür atalar, klasik düzeylerin ölçüleri, Kaye'nin NP-tamlık kanıtı ve Scott, Stege, van Rooij'un co-NP-tamlık sonucu (İngilizce)." },
    { title: "Wikipedia · Microsoft Minesweeper", url: "https://en.wikipedia.org/wiki/Microsoft_Minesweeper", note: "Curt Johnson ve Robert Donner, 1990 Entertainment Pack, Windows 3.1, 1999 kampanyası ve çiçekli sürümler (İngilizce)." },
    { title: "Wikipedia · P versus NP problem", url: "https://en.wikipedia.org/wiki/P_versus_NP_problem", note: "NP-tamlığın ne dediği, Cook–Levin teoremi ve Clay Enstitüsü'nün ödülü (İngilizce)." },
    { title: "Wikipedia · Flood fill", url: "https://en.wikipedia.org/wiki/Flood_fill", note: "0'a tıklayınca bölgeyi açan algoritmanın özyinelemeli ve kuyruklu sürümleri (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
