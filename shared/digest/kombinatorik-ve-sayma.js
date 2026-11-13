window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kombinatorik-ve-sayma"] = {
  slug: "kombinatorik-ve-sayma",
  title: "Kombinatorik: Listelemeden Saymanın Sanatı",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "23 kişilik bir odada iki kişinin aynı gün doğmuş olma olasılığı neden yarıyı aşar? Seçimleri, güvercinleri, şapkaları ve parantezleri önce formülle say, sonra bilgisayara tek tek saydır.",
  hook:
    "On kişi şapkalarını vestiyere bırakıyor, görevli şapkaları rastgele geri dağıtıyor. Hiç kimsenin kendi şapkasına kavuşmama olasılığı yaklaşık %36,8. Kişi sayısını bine çıkarsan da bu sayı neredeyse hiç değişmez. Böyle bir kesinliği, bütün durumları tek tek yazmadan nasıl bulabiliriz?",
  bigIdea:
    "Saymak, nesneleri tek tek listelemeden bir kümenin büyüklüğünü bulmaktır: problemi <strong>sıralı seçimlere</strong> çevirir, fazla sayılanı böler, iki kez sayılanı işaretli toplamla düzeltir ya da problemi kendi küçük kopyalarına ayırıp bir <strong>özyineleme</strong> kurarız.",
  story: [
    "Eylül 1751'de Leonhard Euler, Christian Goldbach'a yazdığı bir mektupta bir çokgenin kesişmeyen köşegenlerle kaç farklı biçimde üçgenlere bölünebileceğini ele aldı ve ilk değerleri hesapladı: üçgen 1, kare 2, beşgen 5, altıgen 14 biçimde. Birkaç yıl sonra Johann Andreas Segner, 1758–59 tarihli bir makalede bu sayıların bir özyinelemeye uyduğunu gösterdi: büyük çokgenin üçgenlemesi, tabana oturan bir üçgen ve iki yanında kalan iki küçük çokgenin üçgenlemelerinden kurulur. Aynı dizinin Çin'de, Moğol asıllı matematikçi Minggatu tarafından 1730'a gelindiğinde, yani Euler'den önce kullanılmış olduğu ise ancak 1988'de ortaya çıktı.",
    "Sayılar bugünkü adını Bruges'de doğup Liège'de ölen, kendini hep Fransız sayan matematikçi Eugène Catalan'dan (1814–1894) alır. Catalan 1838'de Liouville'in <em>Journal de Mathématiques Pures et Appliquées</em> dergisinde iki kısa not yayımladı; ikincisi, çokgeni üçgenlere bölme probleminin çözümünde bu sayıları içerir. Adı ise diziye Catalan değil, çok sonra Amerikalı kombinatorikçi John Riordan verdi: önce 1948 ve 1964'te <em>Mathematical Reviews</em>'a yazdığı değerlendirmelerde, sonra 1968 tarihli kitabında. Daha önce zaman zaman “Segner sayıları” da denirdi. Aynı dizi bugün dengeli parantezleri, iç düğüm sayısı belli ikili ağaçları ve sıfırın altına inmeyen yolları sayar. Sayfanın dördüncü sekmesi bu dört aileyi birbirinden bağımsız olarak üretip sayar.",
    "Olasılık hesabı da sayma üzerine kuruldu. Pierre Raymond de Montmort 1708'de şans oyunları üzerine yazdığı <em>Essay d'analyse sur les jeux de hazard</em>'da, hiçbir öğenin kendi yerine düşmediği dizilişleri saymayı ilk kez ele aldı; 1713'te soruyu kendisi ve aşağı yukarı aynı sıralarda Nicolaus Bernoulli çözdü. Bugün bu durumlara <strong>düzensizlik</strong> diyoruz. Güvercin yuvası ilkesini 1834'te Peter Gustav Lejeune Dirichlet ele aldı; ilke Almancada <em>Schubfachprinzip</em> (çekmece ilkesi), birçok dilde de Dirichlet ilkesi diye anılır. Doğum günü problemi genellikle 1927 dolaylarında Harold Davenport'a atfedilir; basılı ilk biçimi 1939'da Richard von Mises'e aittir.",
  ],
  core: [
    {
      heading: "Dört seçim: sıra var mı, tekrar var mı?",
      body:
        "n harften k tanesini seçmenin dört yolu vardır. Sıra önemliyse <strong>çarpım kuralı</strong> işler: ilk konum için n, ikinci için (tekrar yoksa) n − 1 seçenek vardır. Sıra önemli değilse aynı k'lı küme k! farklı sırayla sayılmıştır; sıralı sayıyı k!'e bölmek gerekir. Böylece sıralı tekrarsız seçim n!/(n − k)!, sıralı tekrarlı seçim nᵏ, sırasız tekrarsız seçim C(n, k) olur. Dördüncüsü, sırasız ve tekrarlı seçim, bölmeyle bulunmaz: {A,A,B} gibi bir çoklu kümenin sırası k! değil, 3!/2! = 3'tür. Bu durum için ayrı bir hile gerekir. Sayfanın ilk sekmesi n = 5, k = 3 için dördünü yan yana gösterir: 60, 125, 10 ve 35.",
      formula: "C(n, k) = n! / (k!·(n − k)!)",
      formulaNote: "Sıralı tekrarsız sayının k!'e bölümü; Pascal üçgeninin n'inci satırının k'ıncı terimi.",
    },
    {
      heading: "Yıldızlar, çubuklar ve anagramlar",
      body:
        "Tekrarlı ve sırasız bir seçimi, her harf için o kadar <strong>yıldız</strong> ve harfleri ayırmak için n − 1 <strong>çubuk</strong> yazarak kodlarız: n = 5 için {A,A,A} seçimi ★★★││││ olur. Kod seçimi tam belirler, her kod da bir seçime karşılık gelir; yani bu bir birebir eşlemedir. Öyleyse çoklu küme sayısı, n + k − 1 konumdan çubukların n − 1 konumunu seçme sayısıdır. Aynı bölme düşüncesi tekrarlı harfli anagramları da sayar: m harfli bir sözcüğün m! dizilişinde, aynı harflerin kendi aralarındaki yer değişimleri farkedilemez. KELEBEK'te üç E ve iki K vardır; 7! = 5 040 dizilişin her biri 3!·2! = 12 kez sayılmıştır, farklı diziliş sayısı 420'dir.",
      formula: "C(n + k − 1, k)   ·   m! / (m₁!·m₂!·…)",
      formulaNote: "Soldaki çoklu küme sayısı, sağdaki çok terimli katsayı; mᵢ her harfin kaç kez geçtiğidir.",
    },
    {
      heading: "Güvercin yuvası ve doğum günü",
      body:
        "Bütün kutularda en çok q nesne olsaydı toplam en çok k·q olurdu; N > k·q ise bir kutuda en az q + 1 nesne vardır. En küçük böyle değer ⌈N/k⌉'dir. İlke hiçbir olasılık içermez ama şaşırtıcı sonuçlar verir: 1 … 2n arasından seçilen her n + 1 sayıda biri ötekini böler, çünkü her sayı 2ʲ·t biçimindedir ve t tek kısmı için yalnızca n seçenek vardır. Doğum gününde ise kesinlik yerine olasılık sorarız. Kimsenin çakışmama olasılığı ∏(1 − i/d)'dir, i = 1 … n − 1. Küçük x için 1 − x ≈ e<sup>−x</sup> alınırsa üstler toplanır: Σ i/d = n(n − 1)/(2d). Olasılık n ile değil n² ile büyür; d = 365 için 1/2'yi geçtiği ilk n, √(2d ln 2) ≈ 22,49'un hemen üstündeki 23'tür.",
      formula: "P(çakışma) ≈ 1 − e<sup>−n²/(2d)</sup>",
      formulaNote: "n > d olunca olasılık tam 1 olur: bu da güvercin yuvası ilkesidir.",
    },
    {
      heading: "İçerme–dışlama ve 1/e",
      body:
        "Kümelerin boyutlarını toplamak, kesişimdeki öğeleri birden çok kez sayar. Düzeltme işaretli bir toplamdır: tek sayıda kümenin kesişimleri eklenir, çift sayıdakiler çıkarılır. Neden tam doğru olduğu bir satırda görülür: tam r kümede bulunan bir öğe toplamda C(r, 1) − C(r, 2) + … = 1 − (1 − 1)<sup>r</sup> = 1 kez sayılır. Düzensizliklerde Aᵢ, i'nci kişinin kendi şapkasını aldığı permütasyonlar olsun; j kişinin sabit kaldığı kesişimde (n − j)! permütasyon vardır. Sonuç D(n) = n!·Σ(−1)ʲ/j! olur. Parantezdeki toplam, e<sup>−1</sup> serisinin ilk n + 1 terimidir. Bu yüzden D(n)/n! çok hızla 1/e ≈ 0,3679'a yaklaşır ve n ≥ 1 için D(n), n!/e'nin en yakın tam sayısıdır.",
      formula: "D(n) = (n − 1)·(D(n − 1) + D(n − 2)),  D(0) = 1, D(1) = 0",
      formulaNote: "Aynı sayılar: 1, 0, 1, 2, 9, 44, 265, 1 854, … ; 10 kişide 1 334 961.",
    },
    {
      heading: "Catalan sayıları: bir özyineleme, birçok aile",
      body:
        "Dengeli bir parantez dizisi tek biçimde ( A ) B diye ayrılır: A ilk parantezin içi, B sonrasıdır ve ikisi de dengelidir. İkisinin çift sayılarının toplamı n − 1 olduğundan C(n) = Σ C(i)·C(n − 1 − i) özyinelemesi çıkar. İkili ağaçta kök ve iki alt ağaç, üçgenlemede tabana oturan üçgen ve iki yandaki çokgenler aynı ayrışmayı verir. Aynı özyinelemeye ve aynı başlangıç değerine uyan diziler eşittir; her aile için ayrı formül aramaya gerek kalmaz. Kapalı biçim C(2n, n)/(n + 1)'dir. Stirling yaklaşımıyla C(2n, n) ≈ 4ⁿ/√(πn) olduğundan C(n) üstel olarak 4ⁿ gibi büyür, ama n<sup>3/2</sup> payı onu yavaşlatır. Ardışık oran 2(2n − 1)/(n + 1) de 4'e yaklaşır.",
      formula: "C(n) = C(2n, n)/(n + 1) ≈ 4ⁿ / (n<sup>3/2</sup>·√π)",
      formulaNote: "Oranın ilk düzeltmesi 1 − 9/(8n): n = 50'de oran 0,977944, düzeltilmiş kuram 0,977953.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var ve her sekme aynı şeyi yapar: önce formülü hesaplar, sonra bilgisayara nesneleri tek tek ürettirip saydırır ve iki sonucu farkıyla yan yana yazar. <strong>01 · Permütasyon ve kombinasyon</strong> sekmesinde <strong>Harf sayısı n</strong>, <strong>Seçilen öğe sayısı k</strong> sürgüleri, yıldız–çubuk kodu ve <strong>Sözcük</strong> kutusu var. <strong>02 · Güvercin yuvası ve doğum günü</strong> nesne–kutu dağıtımını, bölen çifti kurgusunu ve <strong>Gün sayısı d</strong>, <strong>Kişi sayısı n</strong> denetimli doğum günü benzetimini içerir. <strong>03 · İçerme–dışlama</strong> Venn şeması ve şapka odasını, <strong>04 · Catalan ve özyineleme</strong> dört aileyi ve büyüme grafiğini gösterir. Kaba kuvvet sayımı 2 000 000 nesnede durur; sınırın ötesinde sayfa uydurmaz, “sayılmadı” yazar. Benzetimler tohumludur, aynı tohum aynı sonucu verir. R tuşu etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Sıranın bedeli",
        predict: "20 harften 10'unu sırasız seçmenin kaç yolu vardır? Sıralı seçim bundan kaç kat büyük olmalı?",
        do: "01 sekmesinde <strong>20'den 10</strong> düğmesine bas. Dört kartı ve altlarındaki ölçüm satırlarını, ardından durum satırını oku.",
        observe: "Sırasız seçim 184 756 ve altında “sayılan 184 756 · fark 0” yazar. Sıralı tekrarsız 670 442 572 800, sıralı tekrarlı 10 240 000 000 000 olur; ikisi de 2 000 000 sınırını aştığı için “sayılmadı” der. Durum satırı sıralı/sırasız oranını 3 628 800 = 10! diye verir. Çoklu küme sayısı 20 030 010'dur.",
        explain: "Her 10'lu küme 10! = 3 628 800 farklı sırayla sayılmıştır; bölünce kombinasyon çıkar. Sınırın ötesinde bilgisayar bile listeleyemez; orada yalnız formül, yani akıl yürütme güvenilirdir.",
      },
      {
        title: "23 kişilik oda",
        predict: "365 günlük bir yılda, en az iki kişinin aynı gün doğmuş olma olasılığı kaç kişide %50'yi geçer? 100 mü, 183 mü, daha az mı?",
        do: "02 sekmesinde <strong>365 gün, 23 kişi</strong> düğmesine bas. Sonra <strong>Deneme sayısı</strong>nı 100 000 yap. Ardından <strong>365 gün, 70 kişi</strong>yi, en son <strong>12 ay</strong> düğmesini dene ve <strong>Kişi sayısı n</strong>'yi 13'e çıkar.",
        observe: "Tam olasılık 50,73 %, benzetim 50,35 %, yaklaşık formül 51,55 %; 1/2'nin aşıldığı ilk n 23'tür ve 22 kişide olasılık 47,57 %'dir. 100 000 denemede benzetim 50,80 % olur. 70 kişide olasılık 99,92 %'ye çıkar. 12 ayda ilk n 5'tir (61,81 %); 13 kişide olasılık tam 100,00 % olur.",
        explain: "Soru belli bir günle değil herhangi iki kişiyle ilgilidir: 23 kişide 253 çift var. Çakışmama olasılığı yaklaşık e<sup>−n²/(2d)</sup> olduğundan gereken kişi sayısı √d ile ölçeklenir. 13 kişi 12 aya sığmaz: bu güvercin yuvasıdır.",
      },
      {
        title: "Şapka odası ve 1/e",
        predict: "10 kişide kimsenin kendi şapkasını almama olasılığı nedir? 2 kişide ve 20 kişide nasıl değişir?",
        do: "03 sekmesinde şapka odası bölümünde <strong>10 kişi</strong> düğmesine bas; sonra <strong>2 kişi</strong>yi dene ve <strong>Kişi sayısı n</strong>'yi 20'ye çek.",
        observe: "D(10) hem özyinelemeyle hem de 3 628 800 permütasyonun taranmasıyla 1 334 961 bulunur. n!/e = 1 334 960,9161; fark +0,0839, sınır 1/11 = 0,0909'dan küçüktür. Olasılık 36,79 %, benzetim 36,86 %. 2 kişide D(2) = 1 ve olasılık %50; 20 kişide D(20) = 895 014 631 192 902 121.",
        explain: "D(n)/n!, e<sup>−1</sup> serisinin kısmi toplamıdır; terimler 1/n! hızıyla küçüldüğü için olasılık birkaç kişiden sonra artık değişmez. Sabit nokta sayısının dağılımı da ortalaması 1 olan Poisson dağılımına yaklaşır.",
      },
      {
        title: "Aynı sayının dört yüzü",
        predict: "3 çift parantezle kaç dengeli dizi yazılır? Bir beşgen kaç türlü üçgenlenir? Sonra n = 4 için aynı soruyu sor.",
        do: "04 sekmesinde <strong>n (parantez çifti, iç düğüm)</strong> sürgüsünü 3'e, sonra 4'e ve 9'a çek; <strong>Sonraki nesne</strong> ile aynı dizinin yolunu, ağacını ve üçgenlemesini izle. En son <strong>n = 200</strong> düğmesine bas.",
        observe: "n = 3'te dört sayım da 5, n = 4'te 14 verir. n = 9'da hepsi 4 862'dir (262 144 dizi, 48 620 diziliş taranır). n = 200'de C(n) 5,122 × 10¹¹⁶ (117 basamak) ve asimptotik orana oran 0,994403; n = 50'de oran 0,977944, kuram 0,977953.",
        explain: "Dört sayım birbirinden habersiz yapılır ama aynı özyinelemeye uyar. Asimptotik formül büyük n'de doğruya yaklaşır; küçük n'deki sapma 1 − 9/(8n) düzeltmesiyle açıklanır.",
      },
    ],
  },
  wow: [
    {
      title: "Saç telleri 1622'de sayıldı",
      body:
        "Güvercin yuvası ilkesinin bilinen en eski yazılı biçimlerinden biri, Fransız Cizvit Jean Leurechon'un 1622 tarihli <em>Selectæ Propositiones</em> kitabındadır: iki insanın aynı sayıda saç teline (ya da aynı sayıda sikkeye) sahip olması gerektiğini söyler. Gerekçe aynıdır: insanların sayısı, bir başta olabilecek saç sayılarından çoktur; kutudan fazla güvercin varsa iki güvercin aynı kutuya düşer.",
    },
    {
      title: "Benim doğum günüm için 253 kişi",
      body:
        "23 kişide herhangi iki kişinin çakışma olasılığı yarıyı aşar. Ama odada <em>sizinle</em> aynı gün doğmuş biri olma olasılığının yarıyı aşması için 253 kişi gerekir, çünkü bu kez yalnız n çift sınanır, n(n − 1)/2 değil. Aynı hesap bilgisayarda da işler: 64 bitlik bir özet işlevinde çakışma olasılığı 2³² mertebesinde girdide, daha kesin olarak yaklaşık 5,1 milyarda yarıyı geçer; “doğum günü saldırısı” adı buradan gelir.",
    },
    {
      title: "On kişi de bin kişi de aynı",
      body:
        "Kimsenin kendi şapkasını almama olasılığı 2 kişide %50, 3 kişide %33,3, 4 kişide %37,5'tir; 10 kişide %36,79'a oturur ve bir daha kıpırdamaz. 1/e'ye uzaklık 10 kişide on milyonda birin altındadır. Kişi sayısı bin de olsa milyon da olsa sonuç yaklaşık %36,8'dir; olasılık ne 0'a ne 1'e gider.",
    },
  ],
  worked: {
    title: "Dört asal, bin sayı",
    prompt:
      "1 … 1 000 arasındaki tam sayılardan kaç tanesi 2, 3, 5 ve 7'nin hiçbirine bölünmez? İçerme–dışlamayla hesapla, sonucu bölünmeme oranlarının çarpımıyla kurulan kestirimle karşılaştır ve sayfada doğrula.",
    steps: [
      "Aᵢ'ler 2, 3, 5 ve 7'nin katları olsun. Asal sayılar için iki kümenin kesişimi çarpımın katlarıdır (genelde ekok). Tekli boyutlar: ⌊1000/2⌋ + ⌊1000/3⌋ + ⌊1000/5⌋ + ⌊1000/7⌋ = 500 + 333 + 200 + 142 = 1 175. Yalnızca bunları toplamak, 1 000'den büyük bir sonuç verir; aşırı sayım açıktır.",
      "İkili kesişimleri çıkar: 6, 10, 14, 15, 21 ve 35'in katları 166 + 100 + 71 + 66 + 47 + 28 = 478 tanedir.",
      "Üçlüleri geri ekle, dörtlüyü çıkar: 30, 42, 70 ve 105'in katları 33 + 23 + 14 + 9 = 79; 210'un katları 4. Birleşim |A₁ ∪ … ∪ A₄| = 1 175 − 478 + 79 − 4 = 772.",
      "Hiçbirine bölünmeyenler 1 000 − 772 = 228'dir. Kestirim: 1 000·(1/2)(2/3)(4/5)(6/7) ≈ 228,57. Kestirim, içerme–dışlamada her ⌊1000/m⌋ yerine 1000/m yazmakla aynı şeydir; fark yalnız taban işlevinin attığı kesirlerden gelir. 15 terimin her biri 1'den az kaydığı için sapma kaba olarak 15 ile sınırlıdır, burada yalnız 0,57'dir. N, 210'un katı olsaydı hiç kesir atılmaz, ikisi tam eşit çıkardı.",
      "Sayfada dene: 03 sekmesinde <strong>2, 3, 5, 7 ve 1 000</strong> düğmesine bas. Birleşim ve kaba kuvvet sayımı 772, hiçbir kümede olmayan 228 gösterir; tablo 15 terimi listeler: birikimli toplam tekliler bitince 1 175'e çıkar, ikililerden sonra 697'ye iner, üçlülerle 776'ya, dörtlüyle 772'ye oturur. Her düzeyin sonundaki ara toplam sırayla bir üst ve bir alt sınırdır (Bonferroni eşitsizlikleri).",
    ],
    result:
      "1 … 1 000 içinde 2, 3, 5 ve 7'ye bölünmeyen 228 sayı vardır; içerme–dışlamanın 15 terimi bunu tam verir, oranların çarpımı ise 228,57 diye kestirir.",
  },
  misconceptions: [
    {
      myth: "23 kişilik bir odada birinin benimle aynı gün doğmuş olma olasılığı %50'dir.",
      truth:
        "%50'yi aşan, herhangi iki kişinin çakışmasıdır; 23 kişide 253 çift vardır. Belli bir günü, örneğin sizinkini paylaşan birini %50 olasılıkla bulmak için 1 − (364/365)ⁿ ≥ 1/2, yani 253 kişi gerekir.",
    },
    {
      myth: "Tekrarlı ve sırasız seçimin sayısı nᵏ/k!'dir.",
      truth:
        "Bölme yalnız her nesne aynı sayıda sırayla sayılmışsa doğrudur. {A,A,A} tek bir dizilişle, {A,B,C} altı dizilişle sayılır. n = 5, k = 3 için 125/6 tam sayı bile değildir; doğru sayı yıldız–çubukla C(7, 3) = 35'tir.",
    },
    {
      myth: "4'e ve 6'ya bölünenler, 24'ün katlarıdır.",
      truth:
        "İki sayının ortak katları ekoklarının katlarıdır: ekok(4, 6) = 12. 1 … 100'de 4 ya da 6'nın katı olan 25 + 16 − 8 = 33 sayı vardır. Sayfadaki <strong>4 ve 6</strong> düğmesi tam bu uyarıyı gösterir; yalnız boyutları toplamak 41 verir.",
    },
    {
      myth: "Kişi sayısı arttıkça birinin kendi şapkasını alması neredeyse kesinleşir.",
      truth:
        "Her kişinin kendi şapkasını alma şansı 1/n'ye düşer, kişi sayısı ise n'ye çıkar; ikisi dengelenir. Kendi şapkasını alanların ortalaması her n'de tam 1'dir ve kimsenin almama olasılığı 1/e ≈ %36,8'e yerleşir.",
    },
  ],
  glossary: [
    { term: "Permütasyon", definition: "Nesnelerin sıralı bir dizilişi; n nesneden k tanesinin sıralı tekrarsız seçim sayısı n!/(n − k)!." },
    { term: "Kombinasyon C(n, k)", definition: "n nesneden sırasız ve tekrarsız k nesne seçme sayısı, n!/(k!(n − k)!); Pascal üçgeninin terimleri." },
    { term: "Çoklu küme", definition: "Öğelerin tekrar edebildiği sırasız topluluk, ör. {A,A,B}; n türden k öğelik olanların sayısı C(n + k − 1, k)." },
    { term: "Birebir eşleme", definition: "İki küme arasında her öğeyi tam bir öğeyle eşleyen kural; iki kümenin aynı büyüklükte olduğunu saymadan kanıtlar." },
    { term: "Güvercin yuvası ilkesi", definition: "N nesne k kutuya dağıtılırsa bir kutuda en az ⌈N/k⌉ nesne bulunur." },
    { term: "İçerme–dışlama", definition: "Kümelerin birleşimini, tek sayıda kümenin kesişimlerini ekleyip çift sayıdakileri çıkararak bulan işaretli toplam." },
    { term: "Düzensizlik D(n)", definition: "Hiçbir öğeyi kendi yerinde bırakmayan permütasyon; sayıları 1, 0, 1, 2, 9, 44, 265, … ve n!/e'nin en yakın tam sayısı." },
    { term: "Catalan sayısı C(n)", definition: "C(2n, n)/(n + 1): n çiftli dengeli parantez dizilerinin, n iç düğümlü ikili ağaçların ve (n + 2)-gen üçgenlemelerinin sayısı." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her şey üniversitede <strong>Ayrık Matematik</strong> dersinin ilk haftalarını oluşturur: çarpım ve bölme kuralları, birebir eşlemeyle sayma, güvercin yuvası, içerme–dışlama ve özyinelemeler. <strong>Olasılık Kuramı</strong> dersinde aynı sayılar eşit olasılıklı uzayların paydası olur; doğum günü ve şapka problemleri Poisson yaklaşımına, beklenen değerin doğrusallığına ve göstergeç değişkenlerine giden yolun ilk taşlarıdır. <strong>Algoritmalar</strong> dersinde ise Catalan sayıları arama ağaçlarının, parantezleme ve çokgen üçgenleme gibi dinamik programlama problemlerinin karmaşıklığında karşına çıkar.",
      "Bir sonraki büyük araç <strong>üreteç fonksiyonlarıdır</strong>: bir diziyi kuvvet serisinin katsayıları olarak yazmak, özyinelemeyi cebirsel bir denkleme çevirir. Catalan için bu denklem C(x) = 1 + x·C(x)² olur ve ikinci derece formülüyle çözülür; düzensizlikler için üstel üreteç fonksiyonu e<sup>−x</sup>/(1 − x)'tir. 4ⁿ/(n<sup>3/2</sup>√π) gibi asimptotik sonuçlar da bu serilerin tekil noktalarından okunur; analitik kombinatorik adı verilen alan bu düşünceden doğar.",
    ],
    topics: ["Ayrık matematik", "Üreteç fonksiyonları", "Özyinelemeler", "Olasılık kuramı", "Poisson yaklaşımı", "Stirling formülü", "Algoritma analizi"],
  },
  quiz: [
    {
      question: "Bir gezegende yıl 1 000 gün sürüyor. En az iki kişinin aynı gün doğmuş olma olasılığı kabaca kaç kişide %50'yi geçer?",
      options: ["Yaklaşık 23", "Yaklaşık 38", "Yaklaşık 500", "Yaklaşık 1 000"],
      answer: 1,
      explanation: "Gereken kişi sayısı d ile değil √d ile ölçeklenir: √(2·1000·ln 2) ≈ 37,2, tam hesap 38 verir. Sayfada Gün sayısı d'yi 1 000 yaparak doğrulayabilirsin; d dört katına çıkınca gereken kişi yalnız iki katına çıkar.",
    },
    {
      question: "1 … 200 arasından rastgele değil, istediğin gibi sayı seçiyorsun. Seçimde biri ötekini bölen bir çift bulunmasını kesinleştirmek için en az kaç sayı seçmelisin?",
      options: ["100", "101", "51", "200"],
      answer: 1,
      explanation: "Her sayı 2ʲ·t biçimindedir ve 1 … 200'de t için yalnız 100 tek değer var; 101 sayıdan ikisi aynı tek kısma düşer ve küçüğü büyüğünü böler. 100 sayı yetmez: 101, 102, …, 200 kümesinde hiçbir sayı ötekini bölmez.",
    },
    {
      question: "C(10) = 16 796. Ardışık oran 2(2n − 1)/(n + 1) bilindiğine göre C(11) kaçtır, ve n büyüdükçe oran neye yaklaşır?",
      options: ["33 592; oran 2'ye yaklaşır", "58 786; oran 4'e yaklaşır", "67 184; oran 4'e eşittir", "58 786; oran sınırsız büyür"],
      answer: 1,
      explanation: "n = 11 için oran 2·21/12 = 3,5; 16 796 × 3,5 = 58 786. Oran 4 − 6/(n + 1) diye yazılabilir: hep 4'ün altında kalır ve 4'e yaklaşır. Bu yüzden C(n) 4ⁿ gibi büyür ama n<sup>3/2</sup> payıyla geride kalır.",
    },
  ],
  next: [
    { href: "pascal-ucgeni.html", title: "Pascal Üçgeni Laboratuvarı", why: "C(n, k) sayılarını üçgen olarak kur, binom deneyinde olasılık dağılımına dönüştür ve kalanlarından Sierpiński fraktalını, Lucas teoremini çıkar." },
    { href: "bayes-olasilik.html", title: "Bayes ve Koşullu Olasılık Laboratuvarı", why: "Saydığın sayılar paydaya dönüşür: tanı testi, koşullu olasılık ve bağımsızlık, beta–binom güncellemesi." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi: Yapı, Değişmezler ve Teoremler", why: "Saymanın çizgelerdeki devamı: dereceler ve Euler, kapsayan ağaçlar ve Cayley'in nⁿ⁻² formülü, boyama ve düzlemsellik." },
    { href: "fibo.html", title: "Fibonacci: Kareler, Alan ve Eğrilik", why: "Başka bir ünlü özyineleme: iki önceki terime bakan ve yaklaşık 1,618ⁿ ile büyüyen dizinin karelerle kurulan geometrisi." },
  ],
  sources: [
    { title: "Wikipedia · Catalan number", url: "https://en.wikipedia.org/wiki/Catalan_number", note: "Tanım, dört aile, özyineleme, C(n) ~ 4ⁿ/(n<sup>3/2</sup>√π); tarihçe: Euler 1751, Segner 1758–59, Minggatu ve 1988, adın Riordan'dan gelişi (İngilizce)." },
    { title: "MacTutor · Eugène Charles Catalan", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Catalan/", note: "Catalan'ın yaşamı, Fransız kimliği ve 1838'de Liouville'in dergisinde çıkan iki notu; ikincisi çokgen üçgenlemesinin çözümündeki Catalan sayılarını içerir (İngilizce)." },
    { title: "Wikipedia · Derangement", url: "https://en.wikipedia.org/wiki/Derangement", note: "D(n), özyineleme, n!/e'nin en yakın tam sayısı; Montmort 1708 ve 1713, Nicolaus Bernoulli (İngilizce)." },
    { title: "Wikipedia · Birthday problem", url: "https://en.wikipedia.org/wiki/Birthday_problem", note: "Tam olasılık (23 kişide 0,5073), yaklaşımlar, kendi doğum gününüz için 253 kişi, doğum günü saldırısı; Davenport ve von Mises atfı (İngilizce)." },
    { title: "Wikipedia · Pigeonhole principle", url: "https://en.wikipedia.org/wiki/Pigeonhole_principle", note: "Genelleştirilmiş ilke ⌈N/k⌉, örnekler; Leurechon'un 1622 saç örneği ve Dirichlet'nin 1834 Schubfachprinzip'i (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
