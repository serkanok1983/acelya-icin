window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["isik-sondurme"] = {
  slug: "isik-sondurme",
  title: "Işık Söndürme: 1 + 1 = 0 Cebiri",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 25,
  tagline:
    "Bir düğmeye iki kez basmak hiç basmamaktır. Bu tek kural, 25 ışıklı bulmacayı iki elemanlı bir sayı sisteminde 25 bilinmeyenli bir denklem takımına çevirir; çözümü deneme yanılma değil, lineer cebirdir.",
  hook:
    "5×5'lik tahtada öyle on iki düğme var ki hepsine bastığında hiçbir şey değişmez: on iki hamle harcarsın, tek bir ışık bile farklı durmaz. 3×3'te, 6×6'da ve 7×7'de böyle bir desen yoktur. Bir ızgarayı ötekinden ayıran ne, ve bunun bulmacanın çözülebilir olmasıyla ne ilgisi var?",
  bigIdea:
    "Işık Söndürme, yalnız 0 ve 1'den oluşan ve 1 + 1 = 0 sayılan sayı sisteminde bir <strong>doğrusal denklem sistemidir</strong>: A·x = b. b ekrandaki desen, x basacağın düğmeler, A ise her düğmenin hangi ışıkları çevirdiğini yazan matristir.",
  story: [
    "Düğmesine basınca komşularını da çeviren ışıklar fikri 1970'lerin elektronik oyuncaklarına uzanır. 1978'de Parker Brothers, eski bir NASA çalışanı olan Bob Doyle'un eşi Holly ve kayınbiraderi Wendl Thomis'le birlikte tasarladığı <strong>Merlin</strong>'i piyasaya sürdü: iri bir tuşlu telefonu andıran, on bir ışıklı düğmesi olan kırmızı bir el oyuncağı. İçindeki oyunlardan biri, 3×3'lük bir alanda benzer kurallarla oynanan 'Sihirli Kare'ydi (Magic Square). 1983'te Vulcan Electronics benzer bir oyun olan XL-25'i çıkardı. Oyunun bugün bilinen adı ve biçimi ise 1995'te geldi: Tiger Electronics'in <strong>Lights Out</strong>'u, 25 ışıklı düğmesi olan avuç içi bir cihazdı ve kural tek cümleydi: bastığın düğme ile üstündeki, altındaki, solundaki ve sağındaki ışık tersine döner.",
    "Matematikçiler oyunu oyuncakçılardan önce tanıyordu, ama başka bir adla. 1989'da Klaus Sutner, hücresel otomatlar üzerine çalışırken şu soruyu sordu: her hücrenin kendisiyle komşularının toplamına göre değiştiği bir sistemde, bütün ışıkların yandığı desene ulaşılabilir mi? Yanıtı, <em>The Mathematical Intelligencer</em>'da yayımladığı şaşırtıcı ölçüde genel bir teoremdi: evet, hem de düğmeler birbirine nasıl bağlanmış olursa olsun. Oyunu her ızgara boyutunda 'hepsi yanık' durumundan söndürebilmenin güvencesi bu teoremdir.",
    "Tiger'ın cihazı yayılınca bulmaca dersliklere girdi. 1998'de Marlow Anderson ve Todd Feil, <em>Mathematics Magazine</em>'de 'Turning Lights Out with Linear Algebra' başlıklı dört sayfalık bir makale yazdı ve 5×5'lik oyunun bütün sırrını iki vektöre indirdi: bir desen, ancak bu iki vektöre 'dik' ise söndürülebilir. O günden beri Işık Söndürme, lineer cebir derslerinde gerçek sayılar dışındaki bir cisim üzerinde rank, çekirdek ve sütun uzayı anlatmanın en sevilen örneğidir. Yirmi beş düğmeli bir oyuncağın bir teoremin tamamını avucunda taşıması, bu sayfanın da derdi.",
  ],
  core: [
    {
      heading: "İki basış sıfır eder, sıra fark etmez",
      body:
        "Bir ışığın yalnızca iki hâli vardır; onu çevirmek, 0 ile 1 arasında gidip gelmektir. Aynı ışığı iki kez çevirirsen başladığın yere dönersin. Bu yüzden bir ışığın son hâlini belirleyen tek şey, onu etkileyen düğmelere toplam kaç kez basıldığının <strong>tek mi çift mi</strong> olduğudur; hangi sırayla basıldığı değil. İki sonuç hemen çıkar. Birincisi, bir düğmeye iki kez basmak boşa giden iki hamledir; en kısa çözümde her düğmeye ya bir kez basılır ya hiç basılmaz. İkincisi, çözüm bir hamle <em>dizisi</em> değil bir düğme <em>kümesi</em>dir. 5×5'te bu, 2<sup>25</sup> = 33 554 432 küme demektir; 7×7'de 2<sup>49</sup>, yani 560 trilyondan fazla. Hepsini denemek yerine cebir kullanmanın zamanı.",
      formula: "1 + 1 = 0,  a + b = b + a",
      formulaNote: "Mod 2 toplama: mantık devrelerindeki XOR kapısının yaptığı iş. 0 sönük, 1 yanık; 'çevirmek' 1 eklemektir.",
    },
    {
      heading: "Tahta bir vektör, düğme bir sütun",
      body:
        "Işıkları soldan sağa, yukarıdan aşağıya numarala ve durumlarını alt alta yaz: 5×5 için 25 bileşenli, 0 ve 1'lerden oluşan bir b vektörü. Her düğmenin etkisi de böyle bir vektördür: çevirdiği ışıkların yerinde 1 (içeride beş, kenarda dört, köşede üç tane), geri kalanında 0. Bu 25 vektörü yan yana dizersen 25×25'lik A matrisini elde edersin. Bastığın düğmelerin kümesini x ile gösterirsen, toplam etki A·x'tir ve bütün işlemler mod 2 yapılır. Tahtayı söndürmek, b + A·x = 0 demektir; mod 2'de çıkarma ile toplama aynı şey olduğundan bu A·x = b ile eşdeğerdir. Yalnız 0 ve 1'den oluşan bu sayı sistemine <strong>GF(2)</strong> denir; toplaması, çıkarması, çarpması ve bölmesi olan en küçük cisimdir ve lineer cebirin bütün teoremleri onda da geçerlidir.",
      formula: "A·x = b  (mod 2)",
      formulaNote: "A simetriktir: i düğmesi j ışığını çeviriyorsa j düğmesi de i ışığını çevirir.",
    },
    {
      heading: "Rank, sessiz desenler ve çözülebilirlik",
      body:
        "A'nın <strong>rankı</strong>, düğme vektörlerinden kaç tanesinin gerçekten bağımsız olduğunu sayar. 3×3'te rank 9, 6×6'da 36, 7×7'de 49'dur: matris tersinirdir, her desenin bir ve yalnız bir çözümü vardır. 5×5'te rank 23'tür, 25 değil. Eksik iki boyut iki şey demektir. Bir: A·x = 0 denkleminin sıfırdan farklı çözümleri vardır; bunlar basıldığında hiçbir ışığı değiştirmeyen <strong>sessiz desenler</strong>dir ve boş desenle birlikte 2² = 4 tanedir. İki: ulaşılabilen desenler 2<sup>25</sup> değil 2<sup>23</sup> = 8 388 608 tanedir; rastgele yakılmış bir 5×5 tahtanın söndürülebilme olasılığı tam dörtte birdir ve söndürülebilen her desenin dört ayrı çözümü vardır. 4×4 daha da eksiktir: rank 12, on altı desenden yalnız biri çözülür. Bu sayfa güvenli oynar: tahtayı sönükken 2n² rastgele basışla karıştırır, yani verdiği her bulmacanın çözümü vardır.",
      formula: "rank(A) + dim çekirdek(A) = n²;  5×5 için 23 + 2 = 25",
      formulaNote: "Çözülebilirlik sınaması: b, iki temel sessiz desenin her biriyle çift sayıda ortak yanık ışığa sahip olmalıdır.",
    },
    {
      heading: "Işık kovalamaca: parmakla Gauss elemesi",
      body:
        "Denklemi kâğıtsız çözmenin yolu satır satır ilerlemektir. En üst satırdaki her yanık ışığın <em>tam altındaki</em> düğmeye bas; üst satır söner. Aynısını ikinci, üçüncü ve dördüncü satır için yap. Geriye yalnızca en alt satır kalır. 5×5'te alt satırda, hepsinin sönük olması dışında yalnızca yedi desen görülebilir ve her birinin üst satırda bir karşılığı vardır (ışıklar soldan 1–5): 1-2-3 yanıksa üstte 2'ye; 3-4-5 yanıksa 4'e; 1-2-4-5 yanıksa 3'e; 1-5 yanıksa 1 ve 2'ye; 2-4 yanıksa 1 ve 4'e; 1-3-4 yanıksa 5'e; 2-3-5 yanıksa 1'e bas. Sonra kovalamayı baştan yap: tahta söner. Yöntem her zaman çalışır ama cimri değildir: ortalama 19 basış harcar, oysa en kısa çözümlerin ortalaması 10'dur. Yaptığın şey Gauss elemesidir: üst satırdaki beş seçim geri kalan her şeyi belirler, 25 bilinmeyen beşe iner.",
      formula: "2⁵ / 2² = 8 olası alt satır",
      formulaNote: "32 alt satır deseninden yalnız 8'i (biri boş) ortaya çıkabilir; eksik iki boyut burada dörde bölme olarak görünür.",
    },
    {
      heading: "Hepsi yanıksa her zaman söner: Sutner'in teoremi",
      body:
        "Rank eksik olsa bile 'bütün ışıklar yanık' deseni her ızgarada söndürülebilir. Kanıtı üç adımdır ve birinci sınıf lineer cebiriyle okunur. Bir sessiz desen x al: A·x = 0. Şimdi x<sup>T</sup>·A·x sayısını mod 2 hesapla. A simetrik olduğundan köşegen dışındaki terimler çift çift gelir ve birbirini götürür; köşegende hep 1 vardır (her düğme kendi ışığını çevirir), geriye x'in bileşenlerinin toplamı kalır. Sol taraf 0 olduğuna göre her sessiz desen <strong>çift sayıda</strong> düğme içerir; 5×5'tekiler 12, 12 ve 16 düğmelidir. Bu, 'hepsi 1' vektörünün her sessiz desene dik olduğunu söyler. Simetrik bir matriste sütun uzayı, çekirdeğe dik olan vektörlerin tamamıdır; demek ki 'hepsi 1' ulaşılabilir bir desendir. Kanıt ızgaranın biçimini hiç kullanmaz: komşuluk simetrik olduğu sürece her bağlantı düzeninde geçerlidir.",
      formula: "A·x = 0  ⇒  0 = x<sup>T</sup>·A·x = x<sub>1</sub> + x<sub>2</sub> + … + x<sub>N</sub>  (mod 2)",
      formulaNote: "Okunuşu: sessiz bir desendeki düğme sayısı çifttir; bu yüzden 'hepsi yanık' deseniyle iç çarpımı sıfırdır.",
    },
  ],
  lab: {
    intro:
      "<strong>Izgara</strong> menüsü tahtayı 3×3'ten 7×7'ye kadar değiştirir; açılışta 5×5 seçilidir. Bir ışığa tıklamak onu ve dört komşusunu tersine çevirir, <strong>Hamle</strong> sayacını bir artırır. <strong>Yeni Oyun</strong> tahtayı söndürüp 2n² rastgele basışla (5×5'te 50 basış; aynı düğme birden çok kez gelebilir) yeni bir bulmaca kurar; bu yüzden her bulmaca çözülebilir. <strong>Geri Al</strong> son hamleyi siler, <strong>İpucu</strong> bir karenin üzerinde kısa bir sarı kıvılcım çakar ve hamle saymaz. Bütün ışıklar sönünce oyun kilitlenir; denemeye devam etmek için Yeni Oyun'a bas.",
    experiments: [
      {
        title: "Sıra önemli mi?",
        predict:
          "Üç düğmeye A, B, C sırasıyla basmakla C, A, B sırasıyla basmak aynı tahtayı verir mi? Aynı düğmeye art arda iki kez basarsan Hamle sayacı ve tahta ne gösterir?",
        do: "5×5'te birbirine komşu üç düğme seç. Sırayla bas ve tahtanın görüntüsünü aklında tut (ya da fotoğrafını çek). Geri Al'a üç kez bas; aynı üç düğmeye bu kez başka bir sırayla bas. Sonra tek bir düğmeye iki kez bas.",
        observe:
          "İki sıra da aynı deseni bırakır; Hamle ikisinde de 3 gösterir. Aynı düğmeye iki basıştan sonra tahta eski hâline döner ama Hamle 2 artmıştır: iki hamle harcadın, hiçbir şey değişmedi.",
        explain:
          "Her ışığın son hâli, onu etkileyen basışların sayısının tek ya da çift oluşuna bağlıdır; toplama sırası sonucu değiştirmez. Çözüm bu yüzden bir düğme kümesidir ve en kısa çözümde hiçbir düğme iki kez geçmez.",
      },
      {
        title: "On iki hamlelik hiçlik",
        predict:
          "5×5'te 1., 2., 4. ve 5. satırların her birinde 1., 3. ve 5. sütundaki düğmeye basarsan (toplam 12 düğme) tahta nasıl değişir? Aynı şey 3×3'te mümkün mü?",
        do: "5×5'te yeni bir oyun aç ve deseni aklında tut. Tarif edilen on iki düğmeye istediğin sırayla bas; orta satıra ve 2., 4. sütunlara hiç dokunma. Sonra aynı deseni yan çevir: 1., 2., 4., 5. sütunlarda 1., 3., 5. satırlar.",
        observe:
          "On ikinci basıştan sonra tahta, başladığın desenin tıpatıp aynısıdır; Hamle 12 gösterir. Yan çevrilmiş desen de aynı sonucu verir. Arada ışıklar dağılır, sonunda hepsi yerine döner.",
        explain:
          "Bu on iki düğme A·x = 0 denkleminin bir çözümüdür: her ışık çift sayıda kez çevrilir. Sol üst köşeye bak: onu yalnız kendi düğmesi ve altındaki düğme çevirir, iki kez. 5×5'te böyle üç desen vardır (ikisi 12, toplamları 16 düğmeli); rankı tam olan 3×3, 6×6 ve 7×7'de hiç yoktur.",
      },
      {
        title: "Kovalamaca ve yedi alt satır",
        predict:
          "5×5'te ışıkları yukarıdan aşağı kovalarsan en alt satırda 2⁵ − 1 = 31 farklı yanık desenden herhangi biri kalabilir mi? Kaç ayrı desen görmeyi bekliyorsun?",
        do: "Yeni oyunda üst satırdaki her yanık ışığın tam altındaki düğmeye bas; sonra ikinci, üçüncü, dördüncü satır için yinele. Alt satırda kalan deseni yaz. Kavramlar bölümündeki listeden karşılığını bulup üst satırda o düğmelere bas ve yeniden kovala. On oyunda dene.",
        observe:
          "Alt satırda yalnızca şu yedi desen çıkar: 1-2-3, 3-4-5, 1-2-4-5, 1-5, 2-4, 1-3-4, 2-3-5. Sekiz oyundan birinde ilk kovalama tahtayı kendiliğinden söndürür. İkinci kovalamadan sonra tahta her zaman söner; Hamle çoğu kez 12 ile 24 arasında, ortalama 19'dur (sayfanın karıştırma koduyla kurulan 100 000 bulmacada).",
        explain:
          "Kovalama, üst satır dışındaki her düğmeyi zorunlu kılar; serbest olan yalnız üst satırdaki beş seçimdir. Çözülebilir tahtalar iki eşlik koşulunu sağladığından 32 alt satırın dörtte biri, yani sekizi görülür. Tablo, her birini üreten üst satır seçimini tersinden okur.",
      },
      {
        title: "İpucu seni çözüme götürür mü?",
        predict:
          "İpucu düğmesi her seferinde 'en çok ışığı sönük bırakan' kareyi gösteriyor. Hep onun dediğini yaparsan 5×5 bulmaca söner mi? Kaç hamle sonra bir tuhaflık görürsün?",
        do: "5×5'te yeni bir oyun aç. İpucu'na bas, kıvılcımın çaktığı kareye tıkla; yine İpucu, yine tıkla. On beş hamle kadar sürdür ve kıvılcımın hangi karelerde çaktığını izle. Aynısını 3×3'te ve 7×7'de dene.",
        observe:
          "İlk dört beş hamlede yanık ışık sayısı düşer, tahtada dört kadar ışık kalır. Sonra ipucu iki tahta arasında gidip gelmeye başlar: az önce bastığın kareyi yeniden gösterir, basınca bir önceki tahtaya dönersin. Sayfanın koduyla denenen 20 000 bulmacada bu yol 5×5'te bin oyunun yalnız üç dördünde tahtayı söndürdü; 3×3'te yüzde altısında, 7×7'de hiçbirinde.",
        explain:
          "İpucu <strong>açgözlü</strong> bir kuraldır: yalnız bir hamle ileriye bakar ve sönük ışık sayısını en çok artıran kareyi seçer. Oysa çözüme giden yol çoğu kez önce daha fazla ışık yakmaktan geçer. Yerel olarak en iyi adım, toplamda en iyi sonucu vermez; doğrusal denklemi çözmek ise verir.",
      },
    ],
  },
  wow: [
    {
      title: "Dört desenden yalnız biri söner",
      body:
        "5×5'lik tahtada ışıkları gelişigüzel yakarsan bulmacanın çözülebilir olma olasılığı tam 1/4'tür: 33 554 432 desenin 8 388 608'i. Tek bir köşe ışığı yanan tahta, ne yaparsan yap sönmez. Tek başına ortadaki ışık ise söner, ama en az 11 düğmeye basman gerekir. Aradaki farkı on iki düğmelik iki sessiz desen belirler: köşe ikisinin de içindedir, orta kare hiçbirinin.",
    },
    {
      title: "En kötü bulmaca: 15 hamle",
      body:
        "5×5'te çözülebilir hiçbir desen 15'ten fazla basış gerektirmez. Bu defter için yapılan tam sayıma göre 8 388 608 çözülebilir desenin yalnız 7350'si tam 15 basış ister; ortalama 9.9'dur. 'Bütün ışıklar yanık' deseni de o en zorlardan biridir: dört ayrı çözümü vardır ve dördü de 15 düğmelidir. 3×3'te aynı desen beş basışla söner: dört köşe ve orta.",
    },
    {
      title: "Boyut büyüdükçe düzen yok",
      body:
        "Sessiz desenlerin sayısı ızgara boyutuyla düzgün artmaz. Eksik boyut sayısı 1×1'den 9×9'a şöyle gider: 0, 0, 0, 4, 2, 0, 0, 0, 8. Yani 4×4'te 16, 5×5'te 4, 9×9'da 256 sessiz desen varken 6×6, 7×7 ve 8×8'de hiç yoktur. Buna karşın Sutner'in 1989'da kanıtladığı gibi 'hepsi yanık' deseni bu boyutların hepsinde, hatta her bağlantı düzeninde söndürülebilir.",
    },
  ],
  worked: {
    title: "3×3'te bütün ışıklar yanık",
    prompt:
      "3×3'lük tahtada dokuz ışığın hepsi yanıyor. Hangi düğmelere basılırsa hepsi söner ve en az kaç basış gerekir? Denklemi simetriden yararlanarak mod 2 çöz.",
    steps: [
      "Bilinmeyenleri seç. 3×3'te rank 9 olduğundan çözüm tektir. Tahta ve hedef, döndürme ve ayna simetrilerine sahip; tek olan çözüm de aynı simetrileri taşımak zorundadır (yoksa döndürülmüşü ikinci bir çözüm olurdu). Demek ki dört köşe aynı değeri alır: k. Dört kenar ortası: e. Orta kare: m. Her biri 0 ya da 1.",
      "Köşe ışığının denklemini yaz. Bir köşeyi kendi düğmesi ve komşusu olan iki kenar düğmesi çevirir: k + 2e. Mod 2'de 2e = 0 olduğundan k = 1 olmalı (ışık yanık, tek sayıda çevrilmeli).",
      "Orta ışığın denklemi: kendi düğmesi ve dört kenar düğmesi, m + 4e = m. Demek ki m = 1.",
      "Kenar ışığının denklemi: kendi düğmesi, iki yanındaki köşeler ve orta, e + 2k + m = e + m = 1. m = 1 olduğundan e = 0.",
      "Denetle. Basılan düğmeler dört köşe ve orta: 5 basış. Köşe ışığı 1 kez, kenar ışığı 2 köşe + 1 orta = 3 kez, orta ışık 1 kez çevrilir: hepsi tek, hepsi söner. Çözüm tek olduğundan daha kısası yoktur.",
    ],
    result:
      "Dört köşe ve orta: beş basış. Aynı beş düğme, 3×3'te hangi desenle başlarsan başla dokuz ışığın hepsini tersine çevirir; sayfada 3×3 seçip deneyebilirsin: yanıklar söner, sönükler yanar.",
  },
  misconceptions: [
    {
      myth: "Düğmelere hangi sırayla bastığım sonucu değiştirir.",
      truth:
        "Değiştirmez. Her ışığın son hâli yalnızca kaç kez çevrildiğinin tek ya da çift olmasına bağlıdır. Aynı düğmeleri hangi sırayla basarsan bas aynı tahtaya varırsın; sayfada Geri Al ile iki sırayı karşılaştırabilirsin.",
    },
    {
      myth: "Her hamlede en çok ışığı söndüren düğme beni çözüme yaklaştırır.",
      truth:
        "Sayfanın İpucu düğmesi tam bunu yapar ve 5×5'te bin bulmacanın yalnız üç dördünü bitirir; geri kalanında dört beş hamle sonra iki tahta arasında gidip gelir. Yanık ışık sayısı çözüme uzaklığı ölçmez: tek ışığı yanan bir tahta 11 basış uzakta olabilir.",
    },
    {
      myth: "Her ışık deseni söndürülebilir.",
      truth:
        "Izgaraya bağlı. 3×3, 6×6 ve 7×7'de evet. 5×5'te desenlerin yalnız dörtte biri, 4×4'te on altıda biri söndürülebilir. Bu sayfada çıkmaza girmezsin, çünkü bulmacalar sönük tahtaya rastgele basılarak kurulur; ama kâğıda rastgele çizdiğin bir desen büyük olasılıkla çözümsüzdür.",
    },
    {
      myth: "Çözüm varsa tektir.",
      truth:
        "5×5'te her çözülebilir desenin dört çözümü vardır: birine sessiz desenlerden herhangi birini eklersen yine çözüm olur. Ortak düğmeler iptal olduğundan basış sayısı değişir; en kısa çözümü bulmak, dördünü karşılaştırmak demektir. 4×4'te çözüm sayısı on altıdır.",
    },
  ],
  glossary: [
    { term: "Mod 2 toplama", definition: "Sonucun yalnız tek mi çift mi olduğuna bakılan toplama: 0 + 0 = 0, 1 + 0 = 1, 1 + 1 = 0; mantıktaki XOR işlemi." },
    { term: "GF(2)", definition: "Yalnız 0 ve 1 elemanlarından oluşan, işlemleri mod 2 yapılan iki elemanlı cisim; lineer cebir onun üzerinde de kurulur." },
    { term: "Doğrusal denklem sistemi", definition: "Bilinmeyenlerin yalnız sabitlerle çarpılıp toplandığı denklemler takımı; matrisle A·x = b biçiminde yazılır." },
    { term: "Rank", definition: "Bir matrisin doğrusal bağımsız sütunlarının sayısı; ulaşılabilen desenlerin sayısı 2 üzeri ranktır." },
    { term: "Çekirdek (sıfır uzayı)", definition: "A·x = 0 denklemini sağlayan bütün x vektörlerinin kümesi; bu oyunda sessiz desenler." },
    { term: "Sessiz desen", definition: "Basıldığında hiçbir ışığın son hâlini değiştirmeyen düğme kümesi; 5×5'te boş olmayan üç tane vardır." },
    { term: "Gauss elemesi", definition: "Denklemleri birbirine ekleyerek bilinmeyenleri sırayla yok eden çözüm yöntemi; ışık kovalamaca bunun elle yapılan biçimidir." },
    { term: "Açgözlü algoritma", definition: "Her adımda o an en iyi görünen seçimi yapan, ileriye bakmayan yöntem; sayfadaki İpucu böyledir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu bulmaca <strong>Lineer Cebir</strong> dersinin dört temel kavramını tek ekranda gösterir. Düğmelerin ulaşabildiği desenler A'nın <em>sütun uzayı</em>dır; sessiz desenler <em>çekirdeği</em>; rank ile çekirdeğin boyutunun toplamının düğme sayısına eşit olması <em>rank–boyut teoremi</em>dir (5×5'te 23 + 2 = 25); çözülebilirlik sınaması ise sütun uzayının, devriğin çekirdeğine dik olmasıdır. Derste bunları gerçek sayılarla görürsün; burada sayılar yalnız 0 ve 1 olduğu için hiçbir yuvarlama hatası yoktur ve her şey sayılarak denetlenebilir. Gauss elemesi aynen çalışır, yalnız 'satırı bir sayıyla çarp' adımına gerek kalmaz: tek sıfır olmayan sayı 1'dir.",
      "GF(2) üzerindeki lineer cebir bir oyuncak değildir; sayısal dünyanın altyapısıdır. <strong>Kodlama kuramı</strong>nda bir eşlik denetim matrisi, bozulmuş bir mesajı çekirdeğe düşmediği için yakalar; Hamming kodu hatanın yerini tam bu oyundaki gibi bir A·x = b çözerek bulur. Disk dizilerinde bir sürücü bozulduğunda veriyi geri getiren şey XOR toplamıdır. Kriptografide akış şifrelerinin kaydırmalı yazmaçları GF(2) üzerinde doğrusal dönüşümlerdir. Sutner'in çıkış noktası olan <strong>hücresel otomatlar</strong> ise aynı kuralı zamanda yineler: her hücre komşularının mod 2 toplamına bakar. Ayrık Matematik, Soyut Cebir ve Sayısal Tasarım derslerinde aynı 1 + 1 = 0 ile yeniden karşılaşacaksın.",
    ],
    topics: ["Sonlu cisimler ve GF(2)", "Rank–boyut teoremi", "Sütun uzayı ve çekirdek", "Gauss elemesi", "Hata düzelten kodlar (Hamming)", "Hücresel otomatlar", "Açgözlü algoritmalar ve yerel en iyi"],
  },
  quiz: [
    {
      question: "5×5'te çözülebilir bir bulmacanın, hiçbir düğmeye iki kez basmayan kaç farklı çözümü vardır?",
      options: ["1 çözüm", "2 çözüm", "4 çözüm", "25 çözüm"],
      answer: 2,
      explanation: "Çekirdek iki boyutludur; boş desenle birlikte 2² = 4 sessiz desen vardır. Bir çözüme bunlardan birini eklemek yine çözüm verir, başka çözüm de yoktur. Rankı tam olan 3×3, 6×6 ve 7×7'de yanıt 1 olurdu.",
    },
    {
      question: "5×5'te bulduğun bir çözüm 14 düğme içeriyor. Bu düğmelerin 9'u, 12 düğmelik bir sessiz desenin de içinde. Sessiz deseni çözümüne eklersen yeni çözüm kaç düğmeli olur?",
      options: ["26 düğmeli", "17 düğmeli", "8 düğmeli", "5 düğmeli"],
      answer: 2,
      explanation: "Mod 2'de ortak düğmeler iki kez basılmış sayılır ve silinir. Çözümden 14 − 9 = 5 düğme, sessiz desenden 12 − 9 = 3 düğme kalır: 5 + 3 = 8. Genel kural: |x| + |s| − 2·(ortak sayısı) = 14 + 12 − 18. En kısa çözümü aramak böyle yapılır.",
    },
    {
      question: "6×6'lık ızgarada matrisin rankı 36'dır. Buna göre hangisi doğrudur?",
      options: [
        "Desenlerin yalnız dörtte biri söndürülebilir",
        "Her desen söndürülebilir ve en kısa çözüm tektir",
        "Her desen söndürülebilir ama dört farklı çözümü vardır",
        "Hiçbir düğmeye basmadan tahtayı değiştiren desenler vardır",
      ],
      answer: 1,
      explanation: "Rank düğme sayısına eşitse matris tersinirdir: A·x = b'nin her b için tek çözümü vardır, x = A⁻¹·b. Çekirdek yalnız sıfır vektöründen oluşur, yani sessiz desen yoktur. Dörtte bir ve dört çözüm, rankı 23 olan 5×5'in özellikleridir.",
    },
  ],
  next: [
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler", why: "Rank, çekirdek ve sütun uzayının gerçek sayılardaki hâli; bu bulmacanın oturduğu kuram." },
    { href: "mantik-kapilari.html", title: "Mantık Kapıları", why: "Mod 2 toplama, devrelerdeki XOR kapısıdır; bir ışığı çevirmenin elektronikteki karşılığını kur." },
    { href: "yasam-oyunu.html", title: "Yaşam Oyunu", why: "Komşularına bakan hücreler bu kez zamanda ilerler: Sutner'in teoreminin doğduğu hücresel otomat dünyası." },
    { href: "mayin-tarlasi.html", title: "Mayın Tarlası", why: "Yine ızgarada 0-1 bilinmeyenler, ama toplama mod 2 değil; denklemler bu kez her zaman çözülmez." },
  ],
  sources: [
    { title: "Wikipedia · Lights Out (game)", url: "https://en.wikipedia.org/wiki/Lights_Out_(game)", note: "Tiger Electronics 1995, Merlin ve XL-25, Anderson–Feil'in iki vektörlü çözülebilirlik ölçütü ve ışık kovalamaca tablosu (İngilizce)." },
    { title: "Wolfram MathWorld · Lights Out Puzzle", url: "https://mathworld.wolfram.com/LightsOutPuzzle.html", note: "Sutner'in 1989 teoremi, boyutlara göre çözüm sayıları ve 5×5'te 'hepsi yanık' için en az 15 basış (İngilizce)." },
    { title: "Wikipedia · Merlin (console)", url: "https://en.wikipedia.org/wiki/Merlin_(console)", note: "Parker Brothers'ın 1978 tarihli el oyuncağı, tasarımcıları ve içindeki Magic Square oyunu (İngilizce)." },
    { title: "MIT OpenCourseWare · 18.06 Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", note: "Gilbert Strang'in dersi: Gauss elemesi, rank, dört temel altuzay; bu defterdeki kavramların gerçek sayılardaki anlatımı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
