window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mantik-kapilari"] = {
  slug: "mantik-kapilari",
  title: "Mantık Kapıları: Karardan Hesaba",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "İki anahtar bir karar verir; aynı kapılar bir araya gelince toplama yapar. Doğruluk tablolarını, De Morgan eşdeğerliklerini ve dört bit boyunca ilerleyen taşımayı araştır.",
  hook: "Ekranda 0111 yazıyor. Yalnızca 1 ekliyorsun ve dört basamağın dördü de değişiyor: 1000. En sağdaki küçücük toplama, soldaki biti nasıl haberdar etti?",
  bigIdea: "Bir <strong>mantık kapısı</strong> bitlerden bit üreten bir işlevdir; bu işlevleri birleştirip bütün giriş durumlarını denetleyerek, bir kararın doğruluğundan çok basamaklı hesabın doğruluğuna geçebiliriz.",
  story: [
    "1854'te George Boole, <em>An Investigation of the Laws of Thought</em> adlı kitabında mantıksal çıkarımı cebirle ele aldı. Amaç bir elektronik işlemci tasarlamak değildi; sınıflar, önermeler ve çıkarımlar üzerinde sembollerle çalışmaktı. Bir sınıftan yine aynı sınıfı seçmenin yeni bir şey değiştirmemesi, x² = x gibi alışılmış sayı cebrinden farklı bir kurala yol açıyordu. Bugün kullandığımız Boole cebri bu tarihsel çalışmayla ilişkilidir; kitabın bütün notasyonunu modern kapı denklemleriyle özdeş saymak doğru olmaz.",
    "Claude Shannon'ın 1938'de yayımlanan <em>A Symbolic Analysis of Relay and Switching Circuits</em> makalesi başka bir soruya yöneldi: Çok sayıda anahtar ve röleden oluşan bir devreyi nasıl çözümler, aynı işi daha az bağlantıyla nasıl yaparız? Devrenin davranışı denklemlere çevrilince sembolik mantık, çizimler arasında güvenilir bir çeviri dili oluyordu. Makalenin son örneklerinden biri ikili sayıların elektriksel toplanmasıydı. Böylece bir önermenin doğru olma koşullarıyla bir makinenin toplama koşulları aynı matematikte buluştu.",
    "Laboratuvardaki dört bitlik toplayıcı bu köprüyü küçük ölçekte yeniden kurar. Bir basamak iki veri bitiyle gelen eldeyi alır; toplam bitini ve bir sonraki basamağa gidecek eldeyi verir. Dört basamağın hiçbirinin 7 sayısını bir bütün olarak tanıması gerekmez. Her birinin yerel kuralı doğru çalışır ve taşıma doğru bağlanırsa, bütün devre 7 + 1 = 8 sonucunu üretir. Bir sistemi parçalarından anlayabilmek, bilgisayar mühendisliğinin en verimli düşünme biçimlerinden biridir."
  ],
  core: [
    {
      heading: "Bir bit, bir karar alanı",
      body: "<strong>Bit</strong>, iki olası değerden birini taşıyan bilgi birimidir. Bu sayfada 0 ve 1 ile çalışıyoruz; kapıdaki A ve B ise bu değerleri alabilen girişlerdir. AND iki koşulun birden, OR en az birinin, XOR tam birinin sağlanmasını ister; NOT tek girdiyi tersler. NAND ve NOR, AND ve OR sonuçlarının değili; XNOR iki bitin eşitlik denetimidir. Fiziksel bir çipte bu değerler gerilim aralıklarıyla temsil edilebilir. 0 mantıksal değerinin her koşulda tam 0 volt olması gerekmez; bu laboratuvar gerilim veya gürültü ölçmez.",
      formula: "AND: A ∧ B<br>OR: A ∨ B<br>XOR: A ⊕ B<br>NOT: ¬A",
      formulaNote: "A ve B boyutsuz bit değerleridir; ∧, ∨, ⊕ ve ¬ farklı mantıksal işlemlerdir. NOT'un yalnız bir girişi vardır."
    },
    {
      heading: "Doğruluk tablosu eksiksiz bir sözleşmedir",
      body: "İki bağımsız bitin olası girişleri 00, 01, 10 ve 11'dir. <strong>Doğruluk tablosu</strong> her girişin çıkışını listeler; böylece bir kapının yalnız birkaç örneğini değil, ideal davranışının tamamını tanımlar. İki devrenin dört satırda da eşleşmesi, iki girişli bu Boolean işlevlerin eşdeğerliğini kanıtlar. Bir satırın farklı çıkması ise eşdeğerliği çürütmeye yeter. Giriş sayısı büyüdüğünde tablo da büyür: n giriş için 2ⁿ satır vardır. Bu, doğrulamayı yalnız gözle denemenin neden hızla zorlaştığını açıklar.",
      formula: "f: {0,1}ⁿ → {0,1}; giriş durumu sayısı = 2ⁿ",
      formulaNote: "Bir çıkışlı, belleksiz, ideal bir işlev anlatılıyor. Aynı tablo gerçek devrelerin hız, enerji veya gürültü özelliklerinin eşit olduğunu söylemez."
    },
    {
      heading: "Değili içeri taşırken işlem de değişir",
      body: "“İkisinin de olması doğru değil” ile “ikisinin de olmaması doğru” aynı söz değildir. İlk cümle, koşullardan en az birinin yanlış olmasını ister; ikincisi ikisini birden yanlış ister. <strong>De Morgan yasaları</strong> bu ayrımı cebirle tutar: bir AND sonucunu terslemek, terslenmiş girişleri OR ile birleştirmektir. OR'un değili için de terslenmiş girişler AND ile birleşir. A = 0, B = 1 satırını dene: ¬(A ∧ B) = 1 iken ¬A ∧ ¬B = 0. Girişleri tersleyip aynı işlemi korumak bu satırda yakalanır.",
      formula: "¬(A ∧ B) ≡ ¬A ∨ ¬B<br>¬(A ∨ B) ≡ ¬A ∧ ¬B",
      formulaNote: "≡, bütün girişlerde eşdeğerlik demektir. Bir seçili satırdaki L = R eşitliğinden daha güçlü bir iddiadır."
    },
    {
      heading: "Tek kapı türünden bir mantık dili",
      body: "NAND'ın iki girişine aynı A bitini bağlarsan ¬A elde edersin. Bir NAND çıktısını bu biçimde yeniden terslersen AND oluşur. A ile B'yi ayrı ayrı tersleyip NAND'a verirsen, De Morgan sayesinde OR elde edilir. AND, OR ve NOT ile herhangi bir sonlu doğruluk tablosu kurulabilir: çıkışı 1 olan her satırı bir AND koşuluyla seç, bu koşulları OR ile birleştir. Dolayısıyla yalnız iki girişli NAND kullanmak da yeterlidir; buna <strong>işlevsel tamlık</strong> denir. Bu varlık sonucu, NAND ile kurulan her devrenin en küçük veya en hızlı olduğu anlamına gelmez.",
      formula: "N(A,B) = ¬(A ∧ B)<br>¬A = N(A,A)<br>A ∧ B = N(N(A,B),N(A,B))<br>A ∨ B = N(N(A,A),N(B,B))",
      formulaNote: "N iki girişli NAND'dır; AND ifadesindeki aynı iç N(A,B) çıktısı iki girişe paylaştırılabilir. Eşdeğerlik, ideal mantıksal davranış içindir."
    },
    {
      heading: "Toplamın sakladığı ikinci bit",
      body: "İki biti toplarken 1 + 1 = 2 sonucu tek bite sığmaz. <strong>Yarım toplayıcı</strong> bu yüzden iki çıkış verir: S = A ⊕ B birler basamağı, C = A ∧ B ikiler basamağıdır. <strong>Tam toplayıcı</strong> önceki basamaktan gelen Cᵢ'yi de ekler. P = A ⊕ B, taşımanın iletilebildiği durumu; G = A ∧ B ise bu basamakta taşıma üretildiği durumu ayırır. Çıkış taşıması G ∨ (P ∧ Cᵢ) olur. Yerel özdeşliği basamak ağırlığı 2ⁱ ile çarpıp bütün basamaklarda topladığında ara taşımalar iki tarafta sadeleşir: bütün sayının toplamı, sonuç bitleri ve en sondaki taşıma tarafından korunur.",
      formula: "Sᵢ = Aᵢ ⊕ Bᵢ ⊕ Cᵢ<br>Cᵢ₊₁ = (Aᵢ ∧ Bᵢ) ∨ ((Aᵢ ⊕ Bᵢ) ∧ Cᵢ)<br>Aᵢ + Bᵢ + Cᵢ = Sᵢ + 2Cᵢ₊₁",
      formulaNote: "Son satır sıradan tamsayı toplamıdır; üsttekiler Boolean işlemlerdir. Dört bit için A + B + C₀ = S₀ + 2S₁ + 4S₂ + 8S₃ + 16C₄."
    }
  ],
  lab: {
    intro: "Üç sekme sırayla bir kapıyı, iki devrenin eşdeğerliğini ve taşımalı toplamayı inceler. İşaretli kutu 1, boş kutu 0'dır. Tablolardaki <strong>Uygula</strong> düğmeleri girişleri doğrudan seçer; tek bit deneylerindeki <strong>Sonraki giriş</strong> bütün giriş durumlarını dolaşır. Dört bitlik toplayıcıda <strong>Sonraki basamak</strong>, aynı işlemin basamakları arasında ilerler. Çizimler ideal işlev bloklarıdır: sonuçlar anında hesaplanır, fiziksel yayılma süresi modellenmez.",
    experiments: [
      {
        title: "İki tane 1, iki farklı VEYA",
        predict: "A ve B aynı anda 1 olursa OR ile XOR'un çıkışı aynı mı olur? Bütün tablo boyunca hangisi daha çok durumda 1 üretir?",
        do: "Kapılar ve tablolar sekmesinde A ile B'yi işaretle. Kapı türü menüsünden önce OR · VEYA, sonra XOR · Dışlayan VEYA seç. Çıkışı ve Çıkışı 1 yapan durumlar kutusunu karşılaştır.",
        observe: "A = B = 1 için OR çıkışı 1, XOR çıkışı 0 olur. OR'un dört satırından üçü, XOR'un ikisi 1'dir: okumalar 3 / 4 ve 2 / 4. 00, 01, 10 girişlerinde iki kapı aynı, yalnız 11'de farklıdır.",
        explain: "OR en az bir tane 1 ister; XOR iki bitin farklı olmasını ister. İki girişin de 1 olması OR koşulunu bozmadan XOR koşulunu bozar. Günlük dildeki belirsiz 'veya' sözcüğünü tablo kesinleştirir."
      },
      {
        title: "Bir örnek onaylar, karşı örnek çürütür",
        predict: "¬(A ∧ B) ile ¬A ∧ ¬B, 00 girişinde 1 veriyor. Bu tek ortak sonuç, ifadelerin aynı olduğunu söylemek için yeterli mi?",
        do: "De Morgan yasaları sekmesinde Sıfırla'ya bas. Terslenmiş girişleri birleştiren kapı menüsünde Karşı örnek ara · aynı işlem seç. Önce 00'ı, sonra yalnız B'yi işaretleyerek 01'i incele. Son olarak Doğru eş · diğer işlem seç.",
        observe: "Yanlış aday 00'da L = R = 1 gösterir, fakat tüm tabloda yalnız 2 / 4 eşleşme vardır. 01'de L = 1, R = 0 çıkar; 10 da karşı örnektir. Doğru aday seçilince alttaki işlem OR olur ve eşleşme 4 / 4'e çıkar.",
        explain: "Eşdeğerlik tüm girişleri kapsar. 00 ve 11'in uyuşması, 01 ve 10'daki farkı örtemez. De Morgan dönüşümünde girişleri terslemenin yanında AND ile OR'u da değiştirmek gerekir."
      },
      {
        title: "Toplam biti sıfır olsa da toplam sıfır değil",
        predict: "İki tane 1'in toplam biti neden 0 olabilir? Gelen taşıma da 1 olursa toplam biti ve çıkan taşıma nasıl değişir?",
        do: "Bitlerden toplama sekmesinde Yarım toplayıcı · iki giriş seç, Sıfırla'ya bas ve A ile B'yi işaretle. Sonra Tam toplayıcı · üç giriş seçip Cᵢₙ kutusunu da işaretle.",
        observe: "Yarım toplayıcı S = 0, Cₒᵤₜ = 1 ve toplam 2 = 10₂ verir. Tam toplayıcıda üç giriş de 1 olduğunda S = 1, Cₒᵤₜ = 1, toplam 3 = 11₂ olur. Çizimde P = 0, G = 1, H = 0 görünür.",
        explain: "S yalnız birler basamağıdır; çıkan taşıma iki birim değer taşır. 1 + 1 + 1 = 1 + 2×1 özdeşliği korunur. A ve B zaten bir taşıma ürettiği için gelen taşıma, bu örnekte yalnız toplam bitini değiştirir."
      },
      {
        title: "Taşımanın dört basamaklık yolculuğu",
        predict: "7 + 1 ile 15 + 1 işlemlerinde üç ara basamakta taşıma görebilirsin. İkisinde de son taşıma 1 olmak zorunda mı?",
        do: "Bitlerden toplama sekmesinde 4 bit · taşımalı toplama seç. Önce 7 + 1 düğmesine bas; İncelenen basamak menüsünde bit 0'dan 3'e ilerle. Sonra 15 + 1 düğmesiyle aynı dört satırı karşılaştır.",
        observe: "7 + 1 için düşükten yükseğe S bitleri 0,0,0,1; çıkan taşımalar 1,1,1,0'dır. Tam sonuç 01000₂ = 8, son taşıma 0. 15 + 1'de S bitlerinin hepsi 0, çıkan taşımaların hepsi 1 olur: 10000₂ = 16; alt dört bit 0000'dır.",
        explain: "7 + 1'de son basamak 0 + 0 + 1 = 1 hesaplar; yeni elde doğmaz. 15 + 1'de son basamak 1 + 0 + 1 = 2 hesaplar ve beşinci bit gerekir. Son taşımayı atmak, işaretsiz toplamın yalnız 16 ile bölümünden kalanını saklar."
      }
    ]
  },
  wow: [
    {
      title: "Dört satır, on altı farklı işlev",
      body: "İki girişin dört satırlık tablosunda her çıkış ayrı ayrı 0 veya 1 seçilebilir: toplam 2⁴ = 16 farklı Boolean işlev vardır. Sayfadaki altı iki girişli kapı bu listenin yalnız bir bölümüdür; sürekli 0, sürekli 1 veya yalnız A'yı kopyalamak da geçerli işlevlerdir. Dört girişte ise 16 satır ve 2¹⁶ = 65.536 olası işlev bulunur. Bu sayım devre çizmeden yapılır."
    },
    {
      title: "Dört NAND bir XOR eder",
      body: "N(A,B) NAND olsun. T = N(A,B), U = N(A,T), V = N(B,T) ve Y = N(U,V) kur: dört kapının çıkışı XOR'dur. 00, 01, 10, 11 girişleri için Y sırasıyla 0, 1, 1, 0 çıkar. İlk kapının T çıktısı iki ayrı kapıya gider; bu bağlantı paylaşımı sayesinde aynı ara işlemi iki kez kurmak gerekmez."
    },
    {
      title: "Bir bitlik bekçi, bütün hataları göremez",
      body: "Bir bit dizisinin XOR'u, içindeki 1 sayısının tek mi çift mi olduğunu söyler. Dört veri bitine toplam 1 sayısını çift yapan bir eşlik biti eklersen 5 bitlik 32 desenin yalnız 16'sı geçerli olur. Bu beş bitin tek sayıda konumu terslenirse eşlik bozulur; çift sayıda konumu terslenirse eşlik değişmez ve hata kaçırılır. Bu nedenle eşlik denetimi tek bit hatasını saptar ama tek başına hatalı bitin yerini bulmaz."
    }
  ],
  worked: {
    title: "Eldeyi üreten kim, ileten kim?",
    prompt: "Dört bitlik işaretsiz toplayıcıda A = 9, B = 6 ve ilk taşıma C₀ = 1 olsun. Her basamağın P, G, S ve çıkan taşımasını bul; alt dört bit ile tam sonucu ayır. Bitler boyutsuzdur, onluk sayılar yalnız ikili örüntülerin değerini gösterir.",
    steps: [
      "İkili yaz: A = 1001₂, B = 0110₂. Her basamakta Aᵢ ile Bᵢ farklıdır; dolayısıyla dört basamağın tamamında Pᵢ = Aᵢ ⊕ Bᵢ = 1, Gᵢ = Aᵢ ∧ Bᵢ = 0.",
      "En sağdaki bit 0'a C₀ = 1 gelir. S₀ = P₀ ⊕ C₀ = 0; C₁ = G₀ ∨ (P₀ ∧ C₀) = 1. Yerel toplam 1 + 0 + 1 = 0 + 2×1 biçimindedir.",
      "Bit 1 ve 2'de 0 + 1 + 1, bit 3'te 1 + 0 + 1 hesaplanır. Hepsinde Sᵢ = 0, çıkan taşıma 1'dir. G hiçbir basamakta 1 olmaz; dışarıdan gelen taşıma dört P = 1 basamağının tamamından iletilir.",
      "Ağırlıkları topla: S₀ + 2S₁ + 4S₂ + 8S₃ + 16C₄ = 0 + 0 + 0 + 0 + 16 = 16. Alt dört bit 0000, beş bitlik tam sonuç 10000₂'dir; 9 + 6 + 1 = 16 doğrulanır.",
      "Sayfada 4 bit · taşımalı toplama seçip 9 + 6 + 1 düğmesine bas. Her basamağı seçerek P = 1, G = 0, H = 1 değerlerini gör. İlk taşıma C₀ kutusunu kapatırsan bütün S bitleri 1 olur: sonuç 01111₂ = 15, son taşıma 0."
    ],
    result: "Tek bir ilk taşıma, dört sonuç bitini ve son taşıma bitini değiştirir. Devre 16'yı hesaplar; yalnız dört bit saklanırsa görülen 0, 16'nın mod 16 karşılığıdır."
  },
  misconceptions: [
    {
      myth: "OR ile XOR aynı VEYA işleminin iki adıdır.",
      truth: "OR iki giriş de 1 olduğunda 1 verir; XOR bu durumda 0 verir. İki girişin farklı olmasını istemek ile en az birinin 1 olmasını istemek farklı koşullardır. Dört satırlık tabloda ayrıldıkları tek satır 11'dir."
    },
    {
      myth: "İki devre bir örnekte aynıysa eşdeğerdir.",
      truth: "Eşdeğerlik bütün izinli girişlerde aynı çıkışı gerektirir. İki girişli ideal bir işlevde dört satırın tamamı denetlenebilir. Bir karşı örnek iddiayı çürütür; birkaç uyumlu örnek kalan satırlar hakkında garanti vermez."
    },
    {
      myth: "Bir taşıma oluştuysa sonuç mutlaka taşmıştır.",
      truth: "Ara basamak taşıması ile son taşıma farklıdır. 7 + 1'de ilk üç basamak taşıma verir ama C₄ = 0'dır; 8 dört bite sığar. Bu sayfa işaretsiz sayıları kullanır. İkinin tümleyeniyle işaretli toplamada taşma ölçütü ayrıca tanımlanır."
    },
    {
      myth: "Aynı doğruluk tablosu, aynı fiziksel devre demektir.",
      truth: "Tablo yalnız ideal mantıksal giriş–çıkış ilişkisini belirler. Aynı işlev farklı kapı sayılarıyla, farklı gecikme ve enerji maliyetleriyle kurulabilir. Buradaki anlık güncelleme, gerçek kapıların sıfır sürede çalıştığı anlamına gelmez."
    }
  ],
  glossary: [
    { term: "Bit", definition: "İki olası değerden birini taşıyan; burada 0 ve 1 ile gösterilen bilgi birimi." },
    { term: "Boolean işlev", definition: "Her izinli ikili giriş birleşimine belirli bir ikili çıkış atayan matematiksel işlev." },
    { term: "Doğruluk tablosu", definition: "Bir mantıksal işlevin bütün olası girişlerini ve her birinin çıkışını listeleyen tablo." },
    { term: "Eşdeğerlik", definition: "İki mantıksal ifadenin bütün izinli girişlerde aynı sonucu vermesi." },
    { term: "İşlevsel tamlık", definition: "Bir kapı kümesinden, sonlu sayıdaki ikili girişin herhangi bir Boolean işlevinin kurulabilmesi." },
    { term: "Taşıma", definition: "Bir basamaktaki toplamın sonraki basamağa aktarılan, o basamağın ağırlığıyla sayılan kısmı." },
    { term: "Birleşimsel devre", definition: "İdeal çıkışı yalnız mevcut girişlerine bağlı olan, durum belleği içermeyen mantık devresi." },
    { term: "Eşlik biti", definition: "Bir bit grubundaki 1 sayısını seçilen tek veya çift koşuluna tamamlamak için eklenen denetim biti." }
  ],
  bridge: {
    heading: "Üniversiteye köprü: doğruluk, maliyet ve zaman",
    body: [
      "Ayrık Matematik ve Sayısal Mantık derslerinde bir tablodan denklem, denklemden devre çıkarılır. Çıkışı 1 olan satırların koşullarını OR ile birleştirmek sistematik bir başlangıçtır; cebirsel özdeşlikler ve Karnaugh haritaları ifadeyi sadeleştirebilir. Her sadeleştirme adımı eşdeğerliği korumalıdır. Buradaki De Morgan tablosu bu fikrin küçük bir denetleyicisidir. Giriş sayısı büyüdüğünde bütün satırları sırayla denemek pahalılaşır; biçimsel doğrulama ve Boolean doyurulabilirlik yöntemleri daha büyük devrelerin doğruluğuna yönelir.",
      "Bilgisayar Organizasyonu dersinde tam toplayıcılar bir aritmetik birime bağlanır. Dört bitlik örnekte taşıma bağımlılığını gözle izledin; n bitlik sıradan taşıma zincirinde en kötü yol n basamak boyunca uzayabilir. Gerçek kapı gecikmeleri modele katıldığında bu bir hız sınırıdır. Taşıma üretme ve iletme ifadelerini gruplayan tasarımlar, ağaç biçiminde daha az mantıksal derinlik sağlayabilir; alan ve bağlantı maliyeti de değerlendirilir. Bellek elemanları ve saat eklendiğinde birleşimsel devreden ardışıl devreye geçilir; bu laboratuvar o zaman boyutunu hesaplamaz."
    ],
    topics: ["Ayrık Matematik", "Sayısal Mantık Tasarımı", "Bilgisayar Organizasyonu", "Biçimsel doğrulama", "Taşıma öngörülü toplayıcılar"]
  },
  quiz: [
    {
      question: "¬(A ∧ B) ≡ ¬A ∧ ¬B iddiasını hangi giriş tek başına çürütür?",
      options: ["A = 0, B = 0; ikisi de 1 verir.", "A = 1, B = 1; ikisi de 0 verir.", "A = 0, B = 1; sol 1, sağ 0 verir.", "Hiçbiri; girişleri terslemek yeterlidir."],
      answer: 2,
      explanation: "01 satırı bir karşı örnektir. Sol tarafta A ∧ B = 0 olduğu için değili 1'dir; sağda ¬A = 1 ve ¬B = 0 olduğundan AND sonucu 0 olur. Doğru dönüşüm ¬A ∨ ¬B'dir."
    },
    {
      question: "Dört bitlik işaretsiz toplayıcıda 15 + 1 için alt dört bit ve son taşıma hangisidir?",
      options: ["Alt dört bit 0000, son taşıma 1.", "Alt dört bit 1111, son taşıma 0.", "Alt dört bit 0000, son taşıma 0.", "Alt dört bit 1000, son taşıma 1."],
      answer: 0,
      explanation: "1111₂ + 0001₂ = 10000₂ = 16. Tam sonuç beş bit ister; alt dört bit 0000, C₄ = 1'dir. Taşımayı saklamazsan 16 yerine yalnız 16 mod 16 = 0'ı görürsün."
    },
    {
      question: "Tam toplayıcıda A = B = 1 sabitken gelen taşıma 0'dan 1'e çıkarsa ne olur?",
      options: ["S değişmez; çıkan taşıma 1'den 0'a iner.", "S, 0'dan 1'e çıkar; çıkan taşıma 1 kalır.", "Hem S hem çıkan taşıma 0 olur.", "Çıkan taşıma ikiye çıkar; S sıfır kalır."],
      answer: 1,
      explanation: "A + B zaten 2'dir: S = 0 ve Cₒᵤₜ = 1. Gelen 1 toplamı 3 yapar; 3 = 1 + 2×1 olduğu için S = 1, Cₒᵤₜ = 1 olur. Taşıma bitinin değeri 2 değil 1'dir; ağırlığı ikidir."
    }
  ],
  next: [
    { href: "mantik-devresi.html", title: "Mantık Devreleri Laboratuvarı", why: "Tek kapının sözleşmesini öğrendin; şimdi kapıları bağlantılarla birleştiren daha geniş devreleri incele." },
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Mimarisi Laboratuvarı", why: "Toplayıcının işlemci, bellek ve komut yürütme yapısının neresinde bulunduğunu araştır." },
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Yalnız mevcut girdiye bakan kapılardan, geçmişi bir durumla hatırlayan makinelere geç." },
    { href: "mantik-ve-argumantasyon.html", title: "Mantık ve Argümantasyon: Geçerlilik, Kanıt, Safsatalar ve Paradokslar", why: "Kapıların arkasındaki mantık: doğruluk tabloları, geçerli ve geçersiz argüman kalıpları, doğal çıkarımla kanıt, safsatalar ve paradokslar." }
  ],
  sources: [
    { title: "MIT OCW · Computation Structures, 4.1: Combinational Logic", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c4/c4s1/", note: "Doğruluk tabloları, De Morgan dönüşümleri, NAND/NOR'un işlevsel tamlığı ve devre maliyetleri." },
    { title: "MIT OCW · Computation Structures, 8.1: Design Tradeoffs", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/pages/c8/c8s1/", note: "Yarım/tam toplayıcı, taşıma zinciri, taşıma üretme ve iletme denklemleri." },
    { title: "Stanford Encyclopedia of Philosophy · George Boole", url: "https://plato.stanford.edu/entries/boole/", note: "Boole'un 1854 tarihli kitabı, sınıflar cebri ve modern notasyonla tarihsel sistem arasındaki farklar." },
    { title: "Shannon · A Symbolic Analysis of Relay and Switching Circuits (1938)", url: "https://tubes.mit.edu/6S917/_static/2025/resources/shannon38.pdf", note: "Özgün makalenin Collected Papers içindeki yeniden basımı; MIT ders arşivindeki PDF. İkili toplayıcı örneği basılı 494–495. sayfalarda (PDF'nin 24–25. sayfaları)." }
  ],
  revision: "Kasım 2026"
};
