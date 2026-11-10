window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["siralama-yarisi"] = {
  slug: "siralama-yarisi",
  title: "Sıralama: Yarışın Ölçüsü Ne?",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 32,
  tagline: "Aynı sekiz kayıt, üç yöntem ve üç ayrı iş sayacı. Karşılaştırma ile yazmayı ayır; pivot seçiminin, tamponun ve girdi boyutunun sonucu nasıl değiştirdiğini hesapla.",
  hook: "Sekiz kayıt zaten sıralı. Kabarcık yöntemi 7 karşılaştırmayla bitirirken adı Hızlı olan yöntem 28 karşılaştırma yapıyor. İsimler kazananı söylemiyorsa, adil bir yarışta neyi ölçmeliyiz?",
  bigIdea: "Bir algoritmanın maliyeti, uygulanan sürüm, girdi ailesi ve açıkça tanımlanmış işlem modelinin birlikte verdiği sonuçtur; animasyonun bitiş zamanı evrensel hız ölçüsü değildir.",
  story: [
    "Bir bilgisayarın önünde beklemek ile algoritmanın ne kadar iş yaptığını anlamak aynı deney değildir. Çizim, ekran yenileme ve seçilen oynatma hızı bekleme süresine karışır. Bu laboratuvarda üç yöntem aynı başlangıç dizisinin ayrı kopyalarını alır; ortak bütçe karşılaştırma ve yazma olaylarını ilerletir. Böylece farklı sonuçların farklı girdilerden doğması engellenir.",
    "MIT'nin 2015 tarihli Algoritma Tasarımı ve Analizi dersinde hızlı sıralama tek bir reçete olarak sunulmaz: uç pivot, medyana dayalı pivot ve rastgele pivot ayrı incelenir. İlk veya son elemanı seçen sürümün sıralı girdide nasıl dengesiz bölündüğü gösterilir. Buradaki Hızlı, son pivotlu iki parçalı Lomuto sürümüdür; dersteki üç parçalı anlatımın eşit anahtar davranışı ona aynen aktarılamaz.",
    "Birleştirmeli yöntemin farkı, iki küçük sıralı diziyi birleştirmesinde yatar. MIT'nin 2011 dersindeki böl ve birleştir fikrini burada bellek hareketleriyle birlikte görürsün. Geçici tampon yalnız yardımcı bir ayrıntı değildir: toplam iş hesabına hangi yazmaların katıldığını değiştiren somut bir depolama yeridir."
  ],
  core: [
    { heading: "Önce ölçüm sözleşmesi", body: "<strong>C</strong> iki anahtarın karşılaştırılması, <strong>W</strong> ana diziye yazma, <strong>B</strong> tampona yazmadır. Laboratuvar üçünü eşit ağırlıkla toplar. Gerçek takas W'ye 2 ekler; kendi konumuyla takas sayılmaz. İndis testleri, skaler atamalar, bellek tahsisi ve çizim dışarıda kalır. Bu yüzden iş birimi saniyeye çevrilemez.", formula: "İş = C + W + B", formulaNote: "Boyutsuz, seçilmiş maliyet modelidir. Başka bir donanım veya amaç için ağırlıklar farklı olabilir." },
    { heading: "Pivotun böldüğü iş", body: "<strong>Pivot</strong>, alt diziyi parçalara ayıran referans anahtardır. Burada son anahtardan küçükler sola, diğerleri sağa ayrılır; pivot son yerine konur. Artan girdide pivot hep en büyüktür: bir parça n−1 kayıt, öteki boş olur. Hepsi eşit girdide de küçükler parçası boştur; iki parçalı sürüm eşitleri topluca atlayamaz.", formula: "C(n) = C(n−1) + (n−1)<br>C(n) = n(n−1)/2", formulaNote: "Artan, azalan ve hepsi eşit girdilerde bu sayfanın sürümü için. Rastgele pivot veya üç parçalı bölümleme aynı algoritma deneyi değildir." },
    { heading: "Tampon nereye yazılıyor?", body: "Birleştirmeli sıralama iki yarıyı çözer, geçici tamponlara kopyalar ve küçük tampon başını ana diziye yazar. Bir tampon bitince kalanlar karşılaştırmasız kopyalanır. Bu sırada ana dizide yinelenen değerler görülebilir; henüz okunmayan özgün değer tamponda durur. Tam ara durum ana dizi ve tamponlar birlikte düşünülmelidir.", formula: "n = 2ᵏ için W = B = n log₂n", formulaNote: "Her birleştirme düzeyinde bütün n kayıt bir kez tampona, bir kez ana diziye yazılır. Düzey sayısı log₂n'dir." },
    { heading: "Kesin sayıdan büyüme sınıfına", body: "<strong>Θ</strong>, yeterince büyük n için sabit katlar arasında kalan büyümeyi anlatır. Azalan girdide kabarcığın C=n(n−1)/2 sayacı kareseldir. Birleştirmelide iki yarım problem ve doğrusal birleştirme işi Θ(n log n) verir. C/n² veya C/(n log₂n) tablosu ipucu sağlar; dört ölçüm tek başına bütün boyutlar için kanıt değildir.", formula: "T(n) = 2T(n/2) + Θ(n)<br>T(n) = Θ(n log n)", formulaNote: "n'in iki kuvveti olduğu durumda düzey düzey okunabilir. Θ sınıfı küçük girdide kimin daha az iş yaptığını tek başına söylemez." },
    { heading: "Karşılaştırmanın bilgi sınırı", body: "n farklı anahtarın n! olası sırası vardır. Yalnız ikili karşılaştırma sonuçlarına dayanan bir yöntemin karar ağacında her giriş sırasını ayırt edecek kadar yaprak gerekir. Yüksekliği h olan ikili ağaçta en çok 2ʰ yaprak vardır. Bu yüzden en kötü durum için h≥log₂(n!). Bu sınır, sayma sıralaması gibi anahtarın yapısını kullanan yöntemleri aynı modele sokmaz.", formula: "2ʰ ≥ n!<br>h ≥ ⌈log₂(n!)⌉", formulaNote: "Farklı anahtarlar ve karşılaştırmaya dayalı sıralama modeli varsayılır; tek bir sıralı girdinin maliyeti için alt sınır değildir." }
  ],
  lab: {
    intro: "Ortak girdi ve Kayıt sayısı n üç yöntemi birlikte değiştirir. Sonuçları göster kesin C/W/B tablosunu açar; Aynı girdiyi başa al değerleri korur. İş birimi/saniye yalnız gösterim hızıdır. Bütçe +1, bir işlemi tamamlamaya yetmediğinde aynı görüntü kalabilir.",
    experiments: [
      { title: "Aynı sekiz kayıt, üç hesap", predict: "Karşılaştırması daha az olan yöntem, yazmaları eklediğinde de daha az işe sahip olacak mı?", do: "Sayfayı yeniden açarak Tohum 1, Tohumlu karışık ve n=8 başlangıcına dön. Başlangıç dizisinin 19,25,27,74,92,50,22,33 olduğunu kontrol et; Sonuçları göster düğmesine bas.", observe: "Kabarcık C=27,W=20,B=0,iş 47; Hızlı C=14,W=8,B=0,iş 22; Birleştirmeli C=15,W=24,B=24,iş 63. Üçü de 19,22,25,27,33,50,74,92 sonucunu üretir.", explain: "Bu girdide Hızlı hem az karşılaştırma hem az yazma yapar. Birleştirmelinin 15 karşılaştırması, 48 yazmasıyla birlikte değerlendirilmelidir. Sonuç, bu girdi ve eşit ağırlıklı model içindir; bütün girdiler veya gerçek işlemciler için bir sıralama değildir." },
      { title: "Sıralı ve eşit girdinin tuzağı", predict: "Zaten sıralı bir dizi son pivot için neden kötü olabilir? Bütün anahtarlar eşit olduğunda bölmeler dengelenir mi?", do: "n=8 için Ortak girdi menüsünden Artan seç; Sonuçları göster. Sonra Hepsi eşit seçip tekrarla.", observe: "Her iki girdide Kabarcık C=7,W=0; Hızlı C=28. Hızlı'nın W değeri Artan'da 0, Hepsi eşit'te 14 olur. Birleştirmeli her ikisinde C=12,W=24,B=24 gösterir.", explain: "Kabarcık takassız ilk turda durur. Hızlı'nın bölmesi her turda yalnız pivotu ayırır. Artan durumda kendiyle takaslar yazma sayılmaz; eşit durumda uç kayıtlar gerçekten takaslanır. Aynı karşılaştırma sayısı, aynı toplam iş demek değildir." },
      { title: "Dört boyut, bir döngü toplamı", predict: "Azalan girdide n iki katına çıkınca C/n² nasıl değişir? Birleştirmelinin C/(n log₂n) oranı ne olur?", do: "Ortak girdi Azalan olsun; 8,16,32,64 için hesapla düğmesine bas. Büyüme tablosunda üç yöntemin karşılaştırmalarını oku.", observe: "Kabarcık ve Hızlı C=28,120,496,2016. C/n² sırasıyla 0,4375;0,4688;0,4844;0,4922. Birleştirmeli C=12,32,80,192; C/(n log₂n)=0,5.", explain: "İlk iki yöntemde C/n²=(1−1/n)/2, dolayısıyla oran 1/2'ye yaklaşır. Bu ailede birleştirmenin bir tamponu her düzeyde yarı karşılaştırmayla tükenir. Sayısal tabloyu kanıta bağlayan şey sonlu gözlem değil, döngü toplamı ve düzey hesabıdır." },
      { title: "Tamponu hesaptan çıkarma", predict: "n=8 için birleştirmeli yalnız 24 ana dizi yazması mı yapar? Tampona kopyalama hangi bütçeyle tamamlanır?", do: "n=8 ve Artan seç. Aynı girdiyi başa al; Bütçe +1 düğmesine iki kez basarak ilk kopyalama olayını geç. Birleştirmeli açıklamasını ve B sayacını izle. Sonuçları göster; sonra n=16 ile tekrarla.", observe: "İlk 2 kayıt tampona kopyalanınca B=2 olur; bütçe 1'de bu olay henüz tamamlanmamıştır. Son durumda n=8 için W=B=24; n=16 için W=B=64. Artan girdide toplam işler 60 ve 160'tır.", explain: "n=8 üç düzey, n=16 dört düzey içerir. Her düzeyde n tampon yazması ve n ana dizi yazması vardır. Kopyalamanın tek görüntüde gösterilmesi onun tek iş birimi olduğu anlamına gelmez; bütçe modeldeki tam maliyeti öder." }
    ]
  },
  wow: [
    { title: "Hızlı adını değil pivotu izle", body: "Artan 64 kayıt bu son pivotlu sürümde 2.016 karşılaştırma, erken duran Kabarcık'ta 63 karşılaştırma gerektirir. Aradaki 32 kat fark bir animasyon tercihi değil, iki döngünün aynı girdideki kesin sayımıdır." },
    { title: "n log n küçükken kaybedebilir", body: "Artan 16 kayıtta bu modelde Hızlı 120, Birleştirmeli 160 iş birimi kullanır. Artan 32 kayıtta sayılar 496 ve 400 olur. Daha iyi büyüme sınıfı, bütün sonlu boyutlarda daha küçük sayı demek değildir." },
    { title: "Sekiz kayıt, kırk bin sıra", body: "Sekiz farklı anahtarın 8!=40.320 olası sırası vardır. 2¹⁵=32.768 yetmez, 2¹⁶=65.536 yeter: karşılaştırma karar ağacı için en kötü durum alt sınırı en az 16'dır. Bu yüzden belirli bir sıralı girdinin 7 karşılaştırmada tanınması sınırı ihlal etmez." }
  ],
  worked: {
    title: "Büyüme sınıfı ile sonlu bütçe",
    prompt: "Artan n kaydı son pivotlu Hızlı ve Birleştirmeli ile sırala. n=16 ve 32 için C+W+B maliyetlerini türet. Bu laboratuvardaki tamponlu uygulamayı ve n=2ᵏ koşulunu kullan.",
    steps: [
      "Hızlı'nın pivotu her seferinde en büyük anahtardır. C=1+…+(n−1)=n(n−1)/2. Kendiyle takas yazılmadığından W=B=0; toplam iş C'dir.",
      "Artan girdide birleştirmede sol yarı önce tükenir. Her düzeyde n/2 karşılaştırma olduğundan C=(n log₂n)/2; W=B=n log₂n. Toplam iş=(5/2)n log₂n.",
      "n=16 için log₂16=4. Hızlı 16×15/2=120; Birleştirmeli C=32,W=64,B=64,toplam 160 iş birimi. Küçük girdide Hızlı daha az iş yapar.",
      "n=32 için log₂32=5. Hızlı 32×31/2=496; Birleştirmeli 80+160+160=400 iş birimi. Tercih bu iki boyut arasında değişir.",
      "Karşılaştırmayı sadeleştir: Hızlı'nın toplamı daha büyük olduğunda n−1>5log₂n olur. n=16 için 15>20 yanlış, n=32 için 31>25 doğrudur. Denklemin anlattığı bu modeldir; ölçülmemiş bir CPU süresi değildir."
    ],
    result: "n=16'da 120 karşı 160, n=32'de 496 karşı 400 iş birimi. Katsayılar ve düşük boyutlar önemlidir; asimptotik mertebe onların yerine geçmez."
  },
  misconceptions: [
    { myth: "Hızlı sıralama her girdide Θ(n log n) çalışır.", truth: "Sürüm ve girdi önemlidir. Buradaki son pivotlu iki parçalı yöntem artan, azalan ve eşit girdilerde n(n−1)/2 karşılaştırma yapar. Rastgeleleştirilmiş analiz başka varsayımlar taşır." },
    { myth: "Bütçe +1 her çubuğu bir kez ilerletir.", truth: "Bir takas iki yazma, bir tampon kopyası uzunluğu kadar yazma gerektirir. Görüntü yalnız bütçeyle tamamlanabilen son olaydır; bir bütçe artışı görünür değişim yaratmayabilir." },
    { myth: "Ara ana dizide aynı değer iki kez görünürse kayıt kaybolmuştur.", truth: "Birleştirme sırasında kaynak değerler geçici tamponlarda bulunur. Ana dizi tek başına tam ara durum değildir. Tamamlanmış çıktı ise girdinin doğru sıralanmış permütasyonu olmalıdır." },
    { myth: "n=8…64 tablosu bütün girdilerin büyümesini kanıtlar.", truth: "Tablo seçili girdi ailesi ve tohum için sonlu deneydir. Genel sonuç için döngü, yineleme bağıntısı veya karar ağacı analizi gerekir." }
  ],
  glossary: [
    { term: "Pivot", definition: "Hızlı sıralamada kalan kayıtları anahtara göre parçalara ayıran referans kayıt." },
    { term: "Tampon", definition: "Birleştirme sırasında kaynak kayıtları geçici olarak saklayan ek dizi." },
    { term: "İş bütçesi", definition: "Bu sayfada tamamlanabilen karşılaştırma ve yazmaların toplamına ayrılan boyutsuz sınır." },
    { term: "Böl ve yönet", definition: "Problemi alt problemlere ayırıp çözümlerini bir araya getiren tasarım yaklaşımı." },
    { term: "Yineleme bağıntısı", definition: "Bir boyuttaki maliyeti daha küçük boyutların maliyetleriyle ilişkilendiren denklem." },
    { term: "Θ gösterimi", definition: "Yeterince büyük girdiler için bir maliyetin pozitif sabit katlar arasında büyüdüğünü belirten sınıf." },
    { term: "En kötü durum", definition: "Sabit n için bütün geçerli girdiler arasındaki en büyük maliyet." },
    { term: "Karar ağacı", definition: "Karşılaştırma sonuçlarının dallara, belirlenen sonuçların yapraklara karşılık geldiği hesap modeli." }
  ],
  bridge: { heading: "Üniversiteye köprü", body: [
    "Algoritma Analizi'nde ölçü birimini seçmek deneyin ilk adımıdır. Aynı program için yalnız C'yi, bütün yazmaları veya ağırlıklı αC+βW+γB toplamını inceleyebilirsin. Hiçbiri ölçülmüş donanım süresiyle otomatik özdeş değildir. Önbellek, dallanma ve tahsis maliyetleri için ayrı deney tasarımı gerekir; ekrandaki bütün izlerin saklanması da normal sıralama algoritmasının bellek maliyeti değildir.",
    "Ayrık Matematik'teki karar ağacı sınırı neden karşılaştırmalı genel sıralamanın en kötü durumda Ω(n log n) gerektirdiğini açıklar: log₂(n!)=Σ log₂k ve son yaklaşık n/2 terim en az log₂(n/2)'dir. Olasılıklı Algoritmalar'da ise beklenen maliyetin ne üzerinden alındığını sorarsın. Rastgele pivotun seçimleriyle, burada yalnız başlangıç dizisini tekrarlanabilir üreten tohumlu girdi farklı rastlantı modelleridir."
  ], topics: ["Maliyet modelleri", "Yineleme bağıntıları", "Asimptotik analiz", "Karar ağacı alt sınırı", "Rastgeleleştirilmiş algoritmalar", "Bellek ve önbellek maliyeti"] },
  quiz: [
    { question: "Artan 8 kayıtta son pivotlu Hızlı neden 28 karşılaştırma yapar?", options: ["Her bölmede iki eşit yarı çıkar", "Her bölmede yalnız pivot ayrılır; 7+…+1 karşılaştırma yapılır", "Sayı çizim hızından gelir", "Bütün kayıtlar tampona kopyalanır"], answer: 1, explanation: "Son anahtar hep en büyüktür. Kalan alt diziler 7,6,…,1 kayıtlıdır; karşılaştırmalar 7+6+…+1=28 olur." },
    { question: "n=32 için bu Birleştirmeli sürümün toplam W+B yazması kaçtır?", options: ["80 yazma", "160 yazma", "320 yazma", "496 yazma"], answer: 2, explanation: "Beş birleştirme düzeyinin her birinde 32 tampon ve 32 ana dizi yazması yapılır: 2×32×5=320. Karşılaştırmalar bu toplama dahil değildir." },
    { question: "n=16'da Birleştirmeli'nin 160 işi, Hızlı'nın 120 işinden büyük. Bundan ne çıkar?", options: ["Θ(n log n) hesabı yanlıştır", "Hızlı her boyutta daha az iş yapar", "Bu boyut, girdi ve maliyet modelinde Hızlı daha az iş yapmıştır", "Birleştirmeli yanlış sıralamıştır"], answer: 2, explanation: "Asimptotik sınıf küçük boyuttaki sıralamayı belirlemez. Aynı artan ailede n=32 için işler Hızlı 496, Birleştirmeli 400 olur; sonuçların doğruluğu ayrı ölçüttür." }
  ],
  next: [
    { href: "siralama-algoritmalari.html", title: "Sıralama: Adım ve Kararlılık", why: "İş maliyetinden kayıt kimliklerine dön; eşit anahtarların korunmasını ve tur değişmezlerini incele." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "Benzer sayım sorusunu aramada sor: az hücre seçmek az toplam işlem anlamına gelir mi?" },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Dizi, tampon ve kuyruk seçiminin işlemlere etkisini araştır." }
  ],
  sources: [
    { title: "NIST DADS · Bubble sort", url: "https://xlinux.nist.gov/dads/HTML/bubblesort.html", note: "Komşu kıyasları ve takassız turda erken durma; laboratuvarın C sayacı ayrıca koddan doğrulandı." },
    { title: "MIT OCW 6.006 · Insertion sort, merge sort (2011)", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/mit6_006f11_lec03/", note: "İki sıralı diziyi birleştirme ve T(n)=2T(n/2)+Θ(n) analizi. Tampon yazma sayaçları bu sayfanın uygulamasına özgüdür." },
    { title: "MIT OCW 6.046J · Randomized Algorithms, Lecture 6 (2015)", url: "https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/cb55cb123a557eed0738a1187a452c24_MIT6_046JS15_lec06.pdf", note: "Uç pivotla sıralı girdide karesel maliyet ve ayrı rastgele pivot analizi. Notlardaki üç parçalı eşitlik işlemi laboratuvarın iki parçalı Lomuto sürümünden ayrılır." }
  ],
  revision: "Kasım 2026"
};
