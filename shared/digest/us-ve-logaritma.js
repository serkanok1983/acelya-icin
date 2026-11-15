window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["us-ve-logaritma"] = {
  slug: "us-ve-logaritma",
  title: "Üs ve Logaritma: Çarparak Büyümenin Dili",
  field: "Matematik",
  level: "Lise",
  minutes: 40,
  tagline:
    "Her adımda aynı miktarı eklemek ile aynı oranla çarpmak arasındaki fark, üstel fonksiyonu ve onun tersi logaritmayı doğurur: faizden depreme, pH'den bilgisayarın sınırlarına.",
  hook:
    "Her adımda 10 ekleyen bir sayı ile her adımda %10 büyüyen bir sayı 100'den yola çıksın. İlk adımda ikisi de 110'dur; 30 adım sonra biri 400'de, öteki 1744,94'te. Aradaki farkı yaratan şey tek bir sözcük: çarpmak.",
  bigIdea:
    "Üs, tekrarlı çarpmanın kısaltmasıdır ve bütün kuralları çarpanları saymaktan çıkar; <strong>logaritma</strong> da “kaçıncı kuvvet?” sorusunun cevabıdır. Bu yüzden logaritma çarpmayı toplamaya, “kaç katı?” sorusunu “kaç birim fark?” sorusuna çevirir.",
  story: [
    "1614'te İskoç matematikçi John Napier, <em>Mirifici logarithmorum canonis descriptio</em> adlı kitabını yayımladı. Fikri hesapçının işini kökten değiştirdi: uzun çarpma ve bölmeler, tablodan okunan logaritmaların toplanıp çıkarılmasına indirgenebiliyordu. Kitap iki yıl sonra Edward Wright'ın çevirisiyle İngilizceye de geçti.",
    "İngiliz matematikçi Henry Briggs Mart 1615'te bir dostuna yazdığı mektupta Napier'in logaritmalarının kafasını meşgul ettiğini anlatıyordu; aynı yaz Edinburgh'a gidip Napier'le bir ay geçirdi. Briggs 10 tabanını daha önce mektupla önermişti; görüşmede Napier de 10 tabanlı ve log 1 = 0 olan tabloları savundu. Tabloları hazırlamak Briggs'e düştü. Okulda “log” diye yazılan <strong>bayağı logaritma</strong> bu görüşmenin mirasıdır. Elektronik hesap makinelerinden önce uzun hesaplar böyle tablolarla yapılırdı.",
    "e sayısının hikâyesi faizle başlar. 1683'te Jacob Bernoulli sürekli bileşik faizi incelerken (1 + 1/n)<sup>n</sup>'in n büyüdükçe nereye gittiğini sordu ve sınırın 2 ile 3 arasında olduğunu gösterdi; bir sayının bir sınır süreciyle tanımlandığı ilk örneklerden biridir. e harfi ilk kez Euler'in 1731'de Goldbach'a yazdığı bir mektupta görünür. Euler 1748'de <em>Introductio in analysin infinitorum</em>'da e'yi hem bu sınırla hem 1 + 1/1! + 1/2! + … serisiyle anlattı ve 18 ondalık basamağını verdi.",
  ],
  core: [
    {
      heading: "Üs: tekrarlı çarpma ve merdiven",
      body:
        "a<sup>n</sup>, a'nın n kez kendisiyle çarpımıdır. Sıfır ve negatif üsler keyfî uzlaşma değildir: üs merdiveninde bir basamak inmek a'ya bölmek demekse, 2<sup>1</sup> = 2'den bir basamak inince 2<sup>0</sup> = 2 ÷ 2 = 1, bir basamak daha inince 2<sup>−1</sup> = 1/2 bulunur. Çarpım kuralı çarpan saymaktır: m tane a ile n tane a'yı yan yana koyunca m + n tane a olur. Bölüm, kuvvetin kuvveti ve (a·b)<sup>n</sup> kuralları da aynı sayımdan gelir.",
      formula: "a<sup>m</sup>·a<sup>n</sup> = a<sup>m+n</sup> · a<sup>0</sup> = 1 · a<sup>−n</sup> = 1/a<sup>n</sup>",
      formulaNote: "a ≠ 0. Negatif üs “ters çevir” demektir, sonucu negatif yapmaz: 2<sup>−3</sup> = 1/8 = 0,125.",
    },
    {
      heading: "Kesirli üs neden köktür",
      body:
        "(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup> kuralı kesirli üslerde de geçerli kalsın istiyorsak (a<sup>1/q</sup>)<sup>q</sup> = a<sup>1</sup> = a olmalıdır. Demek ki a<sup>1/q</sup>, q. kuvveti a olan pozitif sayıdır: <strong>q. dereceden kök</strong>. Örneğin 8<sup>1/3</sup> = 2 ve 8<sup>2/3</sup> = 2<sup>2</sup> = 4. Kesirli üslerde taban pozitif alınır: (−8)<sup>1/2</sup> gerçek sayı değildir ve negatif tabanlarda kurallar tutarsız sonuç verebilir. Kökte de toplama kuralı yoktur: √(9 + 16) = 5, ama √9 + √16 = 7.",
      formula: "a<sup>p/q</sup> = (<sup>q</sup>√a)<sup>p</sup> = <sup>q</sup>√(a<sup>p</sup>), a &gt; 0",
      formulaNote: "Elle hesapta önce kök almak sayıları küçük tutar: 16<sup>3/2</sup> = 4<sup>3</sup> = 64.",
    },
    {
      heading: "Üstel büyüme ve sabit katlanma süresi",
      body:
        "Doğrusal büyümede her adımda aynı miktar eklenir (P<sub>0</sub> + k·d); üstel büyümede her adımda aynı oranla çarpılır (P<sub>0</sub>·(1 + r)<sup>k</sup>). Üstelin özelliği <strong>ikiye katlanma süresinin</strong> sabit olmasıdır: (1 + r)<sup>t+T</sup> = (1 + r)<sup>t</sup>·(1 + r)<sup>T</sup>, yani nereden başlarsan başla T adım sonra miktar iki katıdır. T'yi (1 + r)<sup>T</sup> = 2 denklemi verir. r küçükken ln(1 + r) ≈ r olduğundan T ≈ 0,693/r; yüzde olarak yazınca akılda kalan <strong>70 kuralı</strong> çıkar. Azalmada (r &lt; 0) aynı hesap yarılanma süresini verir.",
      formula: "T = ln 2 / ln(1 + r) ≈ 70 / (yüzde olarak r)",
      formulaNote: "%10'da tam değer 7,273 adım, 70 kuralı 7,000 adım (−3,75 %); oran büyüdükçe yaklaşım bozulur.",
    },
    {
      heading: "Logaritma: üssü soran soru",
      body:
        "log<sub>b</sub> x = y, b<sup>y</sup> = x demektir: “b'nin kaçıncı kuvveti x eder?” Bu yüzden logaritma üstel fonksiyonun tersidir ve grafiği b<sup>x</sup>'in y = x doğrusuna göre aynadaki görüntüsüdür. Tanım gereği x &gt; 0, b &gt; 0 ve b ≠ 1 olmalıdır. Kurallar üs kurallarının çevirisidir: x = b<sup>u</sup>, y = b<sup>v</sup> ise x·y = b<sup>u+v</sup>, dolayısıyla log<sub>b</sub>(xy) = u + v. Logaritmik denklem çözerken bulunan kökler yerine konup denetlenmelidir; tanım kümesi bazılarını eler (<strong>yabancı kök</strong>).",
      formula: "log<sub>b</sub>(xy) = log<sub>b</sub> x + log<sub>b</sub> y · log<sub>b</sub>(x<sup>k</sup>) = k·log<sub>b</sub> x · log<sub>b</sub> x = ln x / ln b",
      formulaNote: "Son eşitlik taban değiştirme formülüdür: hesap makinesinde yalnız ln ya da log varsa her tabana böyle geçilir.",
    },
    {
      heading: "e, ln ve eğimi kendine eşit fonksiyon",
      body:
        "Her b<sup>x</sup> eğrisi (0, 1)'den geçer; oradaki eğim b = 2 için yaklaşık 0,693, b = 3 için 1,099'dur. Eğimin tam 1 olduğu taban <strong>e = 2,718281828…</strong> sayısıdır ve aynı sayı (1 + 1/n)<sup>n</sup>'in sınırıdır. b<sup>x</sup> = e<sup>x·ln b</sup> yazılabildiğinden (0, 1)'deki eğim tam olarak ln b'dir; e<sup>x</sup>'in her noktadaki eğimi de kendi değerine eşittir. Değişim hızı miktarla orantılı olan her süreç (nüfus, radyoaktif bozunma, sürekli faiz; soğumada ortamla sıcaklık farkı) bu yüzden e ile yazılır. Bunun kesin hâli lisansın ilk kalkülüs dersinde türev ve limitle kurulur.",
      formula: "e = lim<sub>n→∞</sub> (1 + 1/n)<sup>n</sup> · (b<sup>x</sup>)′ = ln b · b<sup>x</sup> · A = P·e<sup>rt</sup>",
      formulaNote: "e − (1 + 1/n)<sup>n</sup> farkı büyük n için yaklaşık e/(2n)'dir; n = 100'de gerçek fark 0,01347, formül 0,01359.",
    },
  ],
  lab: {
    intro:
      "Sayfa altı sekmeden oluşur: <strong>01 · Üsler ve kökler</strong> (üs merdiveni, kural denetleyici, kesirli üs, √ sadeleştirme), <strong>02 · Üstel büyüme</strong> (doğrusal ve üstel dizi, 70 kuralı tablosu, bileşik faiz), <strong>03 · e sayısı ve ln</strong>, <strong>04 · Logaritma</strong> (ayna grafiği, çarpıp bölerek logaritma, kurallar, adım adım denklem çözücü), <strong>05 · Logaritmik ölçek</strong> (pH, desibel, deprem; eksen düzeltme) ve <strong>06 · Alıştırma ve hatalar</strong> (üç seviyede numaralı sorular, ipucu ve çözüm, sekiz yaygın hata kartı). Bölümlerin çoğunun kendi sıfırlama düğmesi vardır; cevaplar sayfada kalır, hiçbir yere gönderilmez.",
    experiments: [
      {
        title: "Toplamak mı, çarpmak mı?",
        predict:
          "100'den başlayan iki dizi: biri her adımda +10, öteki her adımda %10 büyüyor. 30 adımda hangisi kaça varır, üstel olan doğrusalı kaçıncı adımda geçer? İkinci katlanma birincisinden uzun mu sürer?",
        do:
          "02 · Üstel büyüme sekmesinde “%10 ve +10” düğmesine bas (varsayılan durum budur). Kartları oku; sonra “%5 ve +20 (60 adım)” düğmesine bas. İstersen “Logaritmik y ekseni” kutusunu işaretle.",
        observe:
          "İlk durumda 30. adımda doğrusal 400, üstel 1744,94; üstel 2. adımda öne geçer. Ölçülen ikiye katlanma 7,273 adım, ikinci katlanma yine 7,273 adım; kuram 7,273, 70 kuralı 7,000 adım (−3,75 %). Doğrusalda katlanmalar 10,00 ve 20,00 adım. İkinci hazırda üstel ancak 49. adımda geçer; katlanma 14,207 adım (70/5 = 14). Log eksende üstel dizi düz bir doğruya döner.",
        explain:
          "Üstelde her adımda aynı oran uygulandığı için (1 + r)<sup>t+T</sup> = 2·(1 + r)<sup>t</sup>: katlanma süresi başlangıca bağlı değildir. Doğrusalda eklenen miktar sabit, katlanması gereken miktar büyüdüğü için her katlanma daha uzun sürer. Oran ne kadar küçük olursa olsun üstel dizi er geç geçer; küçük oran yalnız geçişi geciktirir.",
      },
      {
        title: "e'ye yaklaşmak ve bilgisayarın sınırı",
        predict:
          "Yıllık %100 faiz yılda n kez eklenirse 1 lira (1 + 1/n)<sup>n</sup> olur. n'yi milyona, katrilyona çıkarınca sonuç sınırsız büyür mü? Bilgisayar bu hesabı her n için doğru yapabilir mi?",
        do:
          "03 · e sayısı ve ln sekmesinde “n = 12 (aylık)” düğmesine bas; sonra “log n” kaydırıcısını 6'ya getir (n = 1 milyon); en son “n = 10¹⁵” düğmesine bas. Her seferinde “doğru hesap”, “e − değer” ve “Naif hesap” kartlarını karşılaştır.",
        observe:
          "n = 12'de doğru hesap 2,613035290225. n = 1 milyonda 2,718280469319; e − değer 1,359·10⁻⁶, kuramın e/(2n) değeriyle oranı 1,0000. n = 10¹⁵'te doğru hesap 2,718281828459 ve fark “10⁻¹³ altında, ölçülemez”, ama naif hesap 3,035035206549 verir. Tabloda n = 10¹⁶ için naif hesap tam 1'dir.",
        explain:
          "Dizi artar ama e'yi aşamaz. Naif hesabın bozulması matematikten değil bilgisayardan gelir: 1 + 1/n yaklaşık 16 anlamlı basamakla saklanır, 1/n'nin küçük basamakları yuvarlanır ve n'inci kuvvet bu hatayı büyütür; 10¹⁶'da 1 + 1/n tam 1'e yuvarlanır. Doğru hesap exp(n·ln(1 + 1/n)) yazarak yuvarlamadan kaçar.",
      },
      {
        title: "Yabancı kök: çözümü denetlemek",
        predict:
          "log x + log(x − 3) = 1 denklemi çarpım kuralıyla ikinci dereceden bir denkleme döner. İkinci dereceden denklemin iki kökü varsa logaritmik denklemin de iki çözümü olur mu?",
        do:
          "04 · Logaritma sekmesinin “Adım adım çözüm” bölümünde “Denklem türü” menüsünden log_b x + log_b(x + p) = r'yi seç (taban 10, p = −3, r = 1 kendiliğinden gelir). Adımları ve kartları oku; sonra r kaydırıcısını 2'ye getir.",
        observe:
          "Adımlar: tanım kümesi x &gt; 3; log[x(x − 3)] = 1 → x² − 3x − 10 = 0 → x = −2 ya da 5. “Kalan kök sayısı” 1, “Atılan kök sayısı” 1; denetim x = 5 için sol 1 · sağ 1. r = 2'de x² − 3x − 100 = 0 olur, x = −8,61187 atılır, x = 11,6119 kalır.",
        explain:
          "Çarpım kuralı log x + log(x − 3)'ü log[x(x − 3)]'e çevirirken tanım kümesini genişletir: x(x − 3) iki negatif sayının çarpımı olarak da pozitif olabilir. x = −2 yeni denklemi sağlar ama log(−2) tanımsızdır. Bu yüzden logaritmik denklemde son adım her zaman yerine koyup denetlemektir.",
      },
      {
        title: "Hangi eksen eğriyi düzeltir?",
        predict:
          "y = 3·1,5<sup>x</sup> verisini doğrusal eksende, yarı logaritmik eksende (x'e karşı log y) ve log-log eksende çiziyorsun. Hangisinde noktalar bir doğruya en iyi oturur, o doğrunun eğimi ne anlatır?",
        do:
          "05 · Logaritmik ölçek sekmesinin “Veri ve eksen” bölümünde “Veri kümesi” Üstel, “Gürültü” %10, “Gürültü tohumu” 1 iken (varsayılan) “Eksenler” menüsünü sırayla dolaş. Sonra “Veri kümesi”ni Kuvvet yasası, “Eksenler”i Log-log yap; en son gürültüyü 0'a çek.",
        observe:
          "R² doğrusal eksen 0,6377, yarı-log 0,9971, log-log 0,8688. Yarı-log'da eğim 0,1737 ve çıkarılan taban 10^eğim 1,492 (gerçek 1,5). Kuvvet yasası verisi log-log eksende R² 0,9951 ile düzleşir; çıkarılan üs 1,663 (gerçek 1,7). Gürültü 0'da üs tam 1,7 ve R² 1,0000 olur.",
        explain:
          "y = A·b<sup>x</sup> ise log y = log A + x·log b: x'e karşı log y doğrudur, eğimi log b. y = A·x<sup>p</sup> ise log y = log A + p·log x: log-log çizimde doğrudur, eğimi p. Hangi eksenin veriyi düzelttiği, verinin hangi yasaya uyduğunu söyler; gürültü yüzünden çıkarılan taban ve üs gerçeğinden biraz sapar.",
      },
    ],
  },
  wow: [
    {
      title: "İki birim deprem, bin kat enerji",
      body:
        "Moment büyüklüğü ölçeği logaritmiktir: büyüklükteki 1 birimlik artış yaklaşık 10<sup>1,5</sup> ≈ 32 kat, 2 birimlik artış 10<sup>3</sup> = 1000 kat enerji demektir. Sayfanın 05 sekmesinde Deprem seçip A = 5,0, B = 7,0 yapınca genlik oranı 100, enerji oranı 1000 çıkar. Ölçeği 1979'da Thomas Hanks ve Hiroo Kanamori tanımladı.",
    },
    {
      title: "Euler e'yi 18 basamak verdi, nasıl bulduğunu söylemedi",
      body:
        "Euler 1748'de <em>Introductio</em>'da e'yi 18 ondalık basamağıyla yazdı ama hesabını açıklamadı. 1854'te William Shanks e'yi çok daha uzun hesapladı; Glaisher ilk 137 basamağın doğru olduğunu gösterdi ama sonrasında bir hata buldu. Shanks düzeltince e 205 basamağa ulaştı. Bugün sayfadaki (1 + 1/n)<sup>n</sup> tablosu ise 10¹⁶'da bilgisayarın kendi sınırına çarpar.",
    },
    {
      title: "Logaritmayı kare alarak hesaplamak",
      body:
        "Hesap makinesi olmadan log<sub>2</sub> 10 bulunabilir: 10'u 2'ye üç kez bölersin (10 → 5 → 2,5 → 1,25), tam kısım 3. Kalanın karesini alırsın; kare 2'yi aşarsa sıradaki ikili basamak 1'dir. Her kare alma bir basamak verir. 04 sekmesi bu yolla 3,3219280 bulur; taban değiştirme formülü 3,321928095 der.",
    },
  ],
  worked: {
    title: "Aylık faiz: tutar, katlanma süresi ve sürekli sınır",
    prompt:
      "10 000 TL yıllık %12 faizle, faiz her ay eklenerek 10 yıl duruyor (vergisiz, enflasyonsuz bir öğretim örneği). (a) 10 yıl sonraki tutar nedir? (b) Para kaç yılda ikiye katlanır? (c) Faiz sürekli eklenseydi 10 yıl sonunda kaç lira fazla olurdu?",
    steps: [
      "Aylık oran 0,12/12 = 0,01; 10 yılda 12·10 = 120 dönem vardır. A = 10 000·(1,01)<sup>120</sup> = 10 000·3,30039 ≈ 33 003,87 TL.",
      "Katlanma için (1,01)<sup>12t</sup> = 2 çözülür. Logaritma al: 12t·ln 1,01 = ln 2, yani t = 0,693147 / (12·0,0099503) = 0,693147 / 0,119404 ≈ 5,805 yıl.",
      "Denetim: 70 kuralı yıllık %12 için 70/12 ≈ 5,83 yıl der; yakın. Sayfada süreyi 5 ve 6 yıla getirirsen tutar 18 166,97 TL ve 20 470,99 TL çıkar: 20 000 TL'yi bu ikisinin arasında geçer.",
      "Sürekli eklemede A = P·e<sup>rt</sup> = 10 000·e<sup>1,2</sup> ≈ 33 201,17 TL. Fark 33 201,17 − 33 003,87 = 197,30 TL'dir; sıklaştırmanın etkisi bir sınıra dayanır.",
    ],
    result:
      "A ≈ 33 003,87 TL; katlanma süresi ≈ 5,81 yıl; sürekli faiz yalnız ≈ 197,30 TL ekler. Bunu 02 sekmesindeki “Faiz” bölümünde (10 000 TL, %12, 10 yıl, aylık; sonra “Sürekli (e ile)”) kendin görebilirsin.",
  },
  misconceptions: [
    {
      myth: "log(a + b) = log a + log b.",
      truth:
        "Logaritma çarpımı toplama çevirir, toplamı değil: log(a·b) = log a + log b. Örnek: log(10 + 10) = log 20 ≈ 1,301, ama log 10 + log 10 = 2 = log 100. Toplamın logaritması için genel bir kural yoktur.",
    },
    {
      myth: "Negatif üs sonucu negatif yapar: 2⁻³ = −8.",
      truth:
        "Negatif üs “ters çevir” demektir: 2<sup>−3</sup> = 1/2<sup>3</sup> = 1/8 = 0,125. Üs merdiveninde her basamak aşağısı 2'ye bölmektir; 1'den sonra 1/2, 1/4, 1/8 gelir, sayı hiçbir zaman sıfırın altına inmez.",
    },
    {
      myth: "Önce %10 artıp sonra %10 azalan bir şey başladığı yere döner.",
      truth:
        "Yüzdeler toplanmaz, çarpılır: 1,10·0,90 = 0,99, yani %1 kayıp vardır. Aynı nedenle her yıl %12 büyüyen bir şey 10 yılda %120 değil, yaklaşık %211 büyür (1,12<sup>10</sup> ≈ 3,106).",
    },
    {
      myth: "İkinci dereceden denklemin iki kökü varsa logaritmik denklemin de iki çözümü vardır.",
      truth:
        "Logaritma yalnız pozitif sayılar için tanımlıdır. log x + log(x − 3) = 1 çözülürken çıkan x = −2, yeni denklemi sağlasa da log(−2) tanımsız olduğu için atılır; tek çözüm x = 5'tir. Her kök özgün denklemde denetlenmeli.",
    },
  ],
  glossary: [
    { term: "Taban ve üs (kuvvet)", definition: "a<sup>n</sup> ifadesinde a tabandır, n üstür; pozitif tamsayı n için a'nın n kez kendisiyle çarpımı anlamına gelir." },
    { term: "Kesirli üs", definition: "a &gt; 0 için a<sup>p/q</sup>, a'nın q. dereceden kökünün p. kuvvetidir; (a<sup>1/q</sup>)<sup>q</sup> = a olsun diye böyle tanımlanır." },
    { term: "Üstel fonksiyon", definition: "b &gt; 0, b ≠ 1 olmak üzere f(x) = b<sup>x</sup>; her eşit adımda aynı oranla çarpılan nicelikleri anlatır." },
    { term: "Logaritma", definition: "log<sub>b</sub> x, b'nin x'i veren kuvvetidir: log<sub>b</sub> x = y ancak ve ancak b<sup>y</sup> = x; yalnız x &gt; 0 için tanımlıdır." },
    { term: "e ve doğal logaritma (ln)", definition: "e = 2,718281828…, (1 + 1/n)<sup>n</sup>'in sınırıdır; tabanı e olan logaritmaya doğal logaritma denir ve ln diye yazılır." },
    { term: "İkiye katlanma süresi", definition: "Üstel büyüyen bir niceliğin iki katına çıkması için geçen süre; büyüme oranı sabitse başlangıçtan bağımsızdır: T = ln 2 / ln(1 + r)." },
    { term: "Logaritmik ölçek", definition: "Eşit aralıkların eşit oranlara karşılık geldiği ölçek; pH, desibel ve deprem büyüklüğü böyledir." },
    { term: "Yabancı kök", definition: "Denklemi dönüştürürken ortaya çıkan, ama özgün denklemi sağlamayan ya da onun tanım kümesinde olmayan kök." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfa Uygulamalı Matematik önşart dizisinin “Sayılar ve işlemler” basamağını kapatır. Dizide sırada geometri ve fonksiyonlar basamakları var; logaritmanın üstelin tersi olması orada ters fonksiyon fikriyle genelleşir. Analiz basamağı <a href=\"limit-ve-sureklilik.html\">Limit ve Süreklilik</a> ile açılır: (1 + 1/n)<sup>n</sup> → e orada limitin ilk büyük örneği olarak yeniden karşına çıkacak. Ardından türev, e<sup>x</sup>'in türevinin kendisi, ln x'inkinin 1/x olduğunu kesinleştirir; 03 sekmesindeki teğet deneyi bunun sayısal hâlidir.",
      "Lisansta üstel ve logaritma her yerdedir: Matematik I (Kalkülüs) derslerinde ∫(1/x)dx = ln|x| ve Taylor serisi e<sup>x</sup> = 1 + x + x²/2! + …; Diferansiyel Denklemler'de “değişim hızı miktarla orantılı” denkleminin çözümü olarak büyüme, soğuma ve bozunma; Olasılık ve İstatistik'te normal dağılım ve logaritmik dönüşümler; Algoritmalar dersinde log n adımda biten ikili arama; Genel Kimya'da pH ve tepkime hızları; yer biliminde deprem büyüklüğü. Bu derslerde artık kuralların kendisi değil, onları hızlı ve hatasız kullanmak beklenir.",
    ],
    topics: ["Limit ve süreklilik", "Türev ve e<sup>x</sup>", "Taylor serisi", "Birinci mertebe diferansiyel denklemler", "Yarı-log ve log-log veri çözümlemesi", "Algoritma karmaşıklığı (log n)"],
  },
  quiz: [
    {
      question: "Bir nüfus her yıl %7 büyüyor. 70 kuralına göre 30 yıl sonra yaklaşık kaç katına çıkar?",
      options: ["Yaklaşık 2,1 katına", "Yaklaşık 3,1 katına", "Yaklaşık 8 katına", "Yaklaşık 30 katına"],
      answer: 2,
      explanation:
        "Katlanma süresi yaklaşık 70/7 = 10 yıldır; 30 yılda üç katlanma olur: 2·2·2 = 8. Tam hesap 1,07<sup>30</sup> ≈ 7,61'dir. 3,1 kat, yüzdeleri toplayan basit hesabın sonucudur (1 + 30·0,07 = 3,1); 2,1 ise yalnız eklenen %210'u kat sanmaktır.",
    },
    {
      question: "pH'si 3 olan bir çözelti ile pH'si 6 olan bir çözeltiyi karşılaştırıyorsun. Hidrojen iyonu derişimleri arasında kaç kat fark vardır?",
      options: ["2 kat", "3 kat", "100 kat", "1000 kat"],
      answer: 3,
      explanation:
        "pH = −log<sub>10</sub>[H⁺], yani [H⁺] = 10<sup>−pH</sup>. pH 3'te 10<sup>−3</sup>, pH 6'da 10<sup>−6</sup> mol/L: oran 10<sup>3</sup> = 1000. Logaritmik ölçekte 3 birimlik fark, gerçekte 1000 katlık orandır; pH 3 olan daha asidiktir.",
    },
    {
      question: "Bir veri kümesi x'e karşı log<sub>10</sub> y çizildiğinde (yarı-log) eğimi 0,301 olan bir doğru veriyor. Veri hakkında ne söylenebilir?",
      options: [
        "y her adımda 0,301 artıyor",
        "x'te bir birim artış y'yi yaklaşık iki katına çıkarıyor",
        "y, x'in 0,301. kuvvetiyle orantılı",
        "Veri doğrusal büyüyor",
      ],
      answer: 1,
      explanation:
        "Yarı-log çizimde doğru, y = A·b<sup>x</sup> demektir ve eğim log<sub>10</sub> b'dir. b = 10<sup>0,301</sup> ≈ 2: her adımda iki katına çıkma. Üs olarak okunan eğim yalnız log-log çizimde anlamlıdır.",
    },
  ],
  next: [
    { href: "turev.html", title: "Türev: Kesenden Teğete (Limit Laboratuvarı)", why: "03 sekmesindeki teğet deneyinin tam hâli: kesen eğimden teğete geçiş ve e<sup>x</sup>'in türevinin neden kendisi olduğu." },
    { href: "taylor-serisi.html", title: "Taylor Serisi: Fonksiyonları Polinomlarla Yakalamak", why: "e<sup>x</sup> = 1 + x + x²/2! + … serisi ve ln(1 + x) ≈ x yaklaşımının, yani 70 kuralının arkasındaki fikrin nereden geldiği." },
    { href: "radyoaktif-bozunma.html", title: "Radyoaktif Bozunma: Rastlantıdan Doğan Yasa", why: "Yarılanma süresinin gerçek bir uygulaması: rastgele bozunan çekirdeklerden üstel azalma yasasının nasıl doğduğu." },
    { href: "fonksiyon-grafigi.html", title: "Fonksiyon Grafikleri: Dönüşüm, Aile ve Ters", why: "Önşart dizisinde sıradaki fonksiyon basamağı: 04 sekmesindeki y = x aynasının genel hâli, ters fonksiyon ve grafik dönüşümleri." },
  ],
  sources: [
    { title: "MacTutor History of Mathematics: The number e", url: "https://mathshistory.st-andrews.ac.uk/HistTopics/e/", note: "Bernoulli'nin 1683 faiz problemi, Euler'in 1731 mektubu ve 1748 Introductio'su, e'nin basamaklarının hesap tarihi." },
    { title: "MacTutor History of Mathematics: John Napier", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Napier/", note: "Napier'in 1614 tarihli logaritma kitabı ve Briggs'in 1615 ziyaretinde 10 tabanlı tablolar üzerine anlaşma." },
    { title: "Wikipedia: Moment magnitude scale", url: "https://en.wikipedia.org/wiki/Moment_magnitude_scale", note: "Hanks ve Kanamori'nin 1979 tanımı; bir birimde yaklaşık 32, iki birimde 1000 kat enerji." },
    { title: "OpenStax: College Algebra 2e", url: "https://openstax.org/details/books/college-algebra-2e", note: "Üniversite öncesi cebir için açık lisanslı ders kitabı; konuyu alıştırmalarla tekrar etmek isteyene genel başvuru." },
  ],
  revision: "Kasım 2026",
};
