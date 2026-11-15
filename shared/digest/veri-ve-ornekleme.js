window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["veri-ve-ornekleme"] = {
  slug: "veri-ve-ornekleme",
  title: "Veri ve Örnekleme: Betimsel İstatistik",
  field: "Matematik",
  level: "Lise",
  minutes: 30,
  tagline: "Veri türlerini tanı, aynı evrenden farklı yöntemlerle örneklem çek ve dağılımı histogram, ortalama ve ortancayla özetle.",
  hook: "Otobüs durağında 80 kişiye ulaşabiliyorsun. Hepsi merkezden geliyor. Bu sayı, bütün kentin ulaşım süresini tahmin etmeye yeter mi?",
  bigIdea: "Örneklemin kimi kapsadığını ve kullandığın özetin dağılımın hangi özelliğini gösterdiğini birlikte düşün.",
  story: [
    "Kurgusal bir kent, ulaşım süresini ölçmek için önce merkezdeki duraklara anketör gönderiyor. Merkezde daha kısa yolculuklar var. İlk ölçüm merkezdeki yolcular için işe yarayabilir. Kentin bütünü hakkında aynı güvenle konuşmak için çeperdeki yolcuların da ölçüme girme şansı olmalı.",
    "Bu atölyede 120 yolculuğun tamamını görebiliyoruz. Bu yüzden örneklem ortalamasını gerçek evren ortalamasıyla karşılaştırmak mümkün. Saha araştırmasında evrenin ortalaması genellikle bilinmez. Araştırmayı okurken önce kimi saymak istediklerine, sonra kayıtlara kimlerin girebildiğine bak.",
  ],
  core: [
    {
      heading: "Bir sayı ölçüm mü, kod mu?",
      body: "Bir satırın birimini ve her sütunun türünü yaz. Mahalle adı <strong>kategorik</strong>, memnuniyetteki beş seçenek <strong>sıralı kategorik</strong> veridir. Aktarma sayısı sayılarak bulunur ve kesiklidir. Yolculuk süresi ölçülür ve sürekli bir niceliktir. Mahalle kodlarının ortalamasını almak, mahalleler arasındaki farkı anlamlı biçimde ölçmez.",
    },
    {
      heading: "Örneklemi yöntem belirler",
      body: "<strong>Basit rastgele</strong> seçimde aynı büyüklükteki bütün alt kümeler eşit olasılıklıdır. <strong>Orantılı tabakalı</strong> seçim her bölgenin örneklemde evrendeki payı kadar yer almasını sağlar ve kişiler kendi bölgeleri içinde rastgele seçilir. <strong>Kolayda</strong> seçim erişimi kolay kişilerden yapılır. Bu atölyede bu kişiler merkezde yaşayanlarla sınırlı.",
    },
    {
      heading: "Ortalama, ortanca ve açıklık",
      body: "<strong>Ortalama</strong> her gözlemin değerine duyarlıdır. Bir değer 70 dakika artarsa beş gözlemli listenin ortalaması 14 dakika artar. <strong>Ortanca</strong> sıralamanın ortasından hesaplanır. Beş yolculuğun en uzunu daha da uzadığında ortadaki değer aynı kalabilir. <strong>Açıklık</strong> iki uca bakar ve aradaki yığılmanın şeklini göstermez.",
      formula: "Ortalama = toplam / gözlem sayısı · Açıklık = en büyük − en küçük",
    },
    {
      heading: "Dağılıma frekansla bak",
      body: "<strong>Histogram</strong>, nicel değerleri komşu aralıklarda toplar. Atölyede 20 dakikalık bir gözlem 20–&lt;30 aralığına girer. Her aralığın kişi sayısını kendi grubunun büyüklüğüne bölerek örneklemi ve evreni aynı yüzde ölçeğinde karşılaştırabilirsin.",
      formula: "Göreli frekans = aralıktaki gözlem sayısı / gruptaki gözlem sayısı",
    },
    {
      heading: "Yanlılık ve değişkenlik",
      body: "Bir yöntem farklı çekilişlerde farklı tahminler verebilir. Aynı tasarımı çok kez tekrarladığında tahminlerin ortalaması hedef değerden sistematik olarak ayrılıyorsa yöntem bu hedef için yanlıdır. Merkezden rastgele seçmek merkez ortalaması için işe yarar. Bütün kent için beklenen tahmin 14, hedef ise 19,4 dakikadır.",
    },
  ],
  lab: {
    intro: "Örnekleme yöntemini ve büyüklüğünü değiştir. Yeni çekilişin merkez ile çeper bileşimini ve dağılım tablosunu karşılaştır.",
    experiments: [
      {
        title: "Daha çok kişiye sor, aynı bölgeye bağlı kal",
        predict: "Merkezle sınırlı bir örneklemde büyüklüğü 10’dan 80’e çıkarınca çeperin payı ne olur?",
        do: "Kolayda · sadece merkez seç. Örneklem büyüklüğünü 10’dan 80’e çıkar. Birkaç kez “Yeni örneklem çek” düğmesine bas.",
        observe: "Çeper payı her seferinde %0. 80 kişilik çekilişte ortalama 13,7 ile 14,3 dakika arasındadır. Kent ortalaması 19,4 dakikadır.",
        explain: "80 kaydı seçmek, merkezdeki 84 kayıttan dördünü dışarıda bırakır. En kısa dördünü çıkarmak ortalamayı 14,3’e, en uzun dördünü çıkarmak 13,7’ye getirir. Çeperdeki 36 kişi hiçbir çekilişe girmez.",
      },
      {
        title: "Bölge payını sabitle",
        predict: "Orantılı tabakalı yöntemde her yeni çekilişin ortalaması da aynı olur mu?",
        do: "Orantılı tabakalı seç. Büyüklüğü 20 yap. “Yeni örneklem çek” ile birkaç çekilişi ve dağılım tablosunu karşılaştır.",
        observe: "14 merkez ve 6 çeper kaydı her seferinde korunur. Ortalama ile aralıklardaki kişi sayıları değişebilir.",
        explain: "Tabakalı tasarım grupların sayılarını belirler. Her grubun içindeki yolculuk süreleri yine örneklenen kişilere bağlıdır.",
      },
      {
        title: "Rastgele örneklemin bileşimini izle",
        predict: "Basit rastgele çekilen 20 kişinin tam altısının çeperden gelmesi gerekir mi?",
        do: "Yöntemi Basit rastgele yap. Örneklem büyüklüğünü 20’de tut ve “Yeni örneklem çek” ile çeper sayısına bak.",
        observe: "Çeper sayısı çekilişler arasında değişebilir. Bazı çekilişlerin bileşimi evrendeki %30’a daha yakındır.",
        explain: "Bu tasarım her kişiye aynı seçilme olasılığını verir. Bölge payını her çekilişte sabitleyen ayrı bir kural yoktur.",
      },
      {
        title: "Bir uç değerin etkisini ayır",
        predict: "Dört yolculuk aynı kalırken beşinci yolculuğu 20’den 90 dakikaya çıkarınca hangi özet değişmez?",
        do: "Bir yolculuk uzarsa bölümünde Son yolculuk kaydırıcısını 20’den 90 dakikaya getir.",
        observe: "Ortalama 16’dan 30’a ve açıklık 8’den 78’e çıkar. Ortanca 16 dakika kalır.",
        explain: "Son gözlem 70 dakika arttığı için ortalama 70 / 5 = 14 artar. Sıralamanın ortasındaki gözlem yerinden oynamaz.",
      },
    ],
  },
  wow: [
    { title: "Daha büyük örneklem aynı açığı taşıyabilir", body: "Merkezden çekilen 80 kişi merkez için iyi bir özet verebilir. Çeper bu çekilişe hiç katılamadığı için bütün kent hakkında aynı yorum yapılamaz." },
    { title: "Bölge ortalamalarına eşit ağırlık vermek", body: "14 ve 32 dakikayı doğrudan ortalarsan 23 dakika bulursun. Çeper kent nüfusunun %30’unu oluşturduğu için kent ortalaması 19,4 dakikadır." },
    { title: "Aynı ortalama, başka bir dağılım", body: "10, 10, 30, 30 ile 20, 20, 20, 20 dizilerinin ortalaması 20’dir. İlk dizinin açıklığı 20, ikincinin açıklığı 0’dır. Frekans tablosu aradaki farkı görünür kılar." },
  ],
  worked: {
    title: "Bir kent ortalaması",
    prompt: "84 merkez yolculuğunun ortalaması 14 dakika ve 36 çeper yolculuğunun ortalaması 32 dakika. Kentin 120 yolculuğunun ortalamasını bul.",
    steps: [
      "Merkezdeki toplam süre 84 × 14 = 1176 dakika.",
      "Çeperdeki toplam süre 36 × 32 = 1152 dakika.",
      "Toplam süreyi 120 yolculuğa böl. (1176 + 1152) / 120 = 19,4 dakika.",
    ],
    result: "Aynı hesabı grup paylarıyla da yapabilirsin. 0,70 × 14 + 0,30 × 32 = 19,4 dakika.",
  },
  misconceptions: [
    { myth: "Büyük örneklem temsil gücünü garanti eder.", truth: "Örneklem büyüklüğü değişkenliği azaltabilir. Çeper örnekleme listesinde yoksa kişi sayısını artırmak eksik kapsamı gidermez." },
    { myth: "Bir sayı biçimindeki her veri niceldir.", truth: "Mahalle kodlarının değerleri yalnız kategori adlarının yerini tutar. Kodlar değiştiğinde mahallelerin sıklığı değişmez." },
    { myth: "Ortalama dağılımı tek başına gösterir.", truth: "Aynı ortalamaya sahip listelerin yayılımı ve biçimi çok farklı olabilir. Ortancayı, açıklığı ve dağılımı da incele." },
  ],
  glossary: [
    { term: "Gözlem birimi", definition: "Bir veri satırının ait olduğu kişi, nesne ya da olay." },
    { term: "Evren", definition: "Sonucun genellenmek istendiği bütün birimler." },
    { term: "Örnekleme çerçevesi", definition: "Örnekleme girebilme olasılığı olan birimlerin listesi veya kaynağı." },
    { term: "Tabaka", definition: "Örneklem seçiminden önce tanımlanan ve başka tabakayla örtüşmeyen evren grubu." },
    { term: "Ortanca", definition: "Sıralı verinin ortasındaki değer veya çift sayıda gözlemde ortadaki ikisinin ortalaması." },
    { term: "Göreli frekans", definition: "Belirli bir değer ya da aralıktaki gözlemlerin gruptaki payı." },
    { term: "Örnekleme yanlılığı", definition: "Seçim biçiminin tahminleri hedef değerden sistematik biçimde uzaklaştırması." },
  ],
  bridge: {
    heading: "Araştırma tasarımına köprü",
    body: [
      "Halk sağlığında araştırmanın kimlere genellenebildiği, psikometride ölçme aracının hangi grupta sınandığı ve iktisatta anketin hangi işletmeleri kapsadığı aynı soruyla başlar. Örnekleme planı, sonuç tablosunu okumadan önce incelenir.",
      "Olasılık ve istatistik derslerinde örneklemler arasındaki değişimi örnekleme dağılımıyla, tahminin belirsizliğini standart hata ve güven aralığıyla incelersin. Çeyrekler arası açıklık ve kutu grafiği de dağılımın ortadaki yarısını karşılaştırmanı sağlar.",
    ],
    topics: ["Örnekleme dağılımı", "Anket tasarımı ve ağırlıklar", "Çeyrekler arası açıklık", "Standart hata"],
  },
  quiz: [
    {
      question: "Bir kent, çalışanlarının yol süresini tahmin etmek için yalnız arabayla gelen 200 kişiyi ölçüyor. Çalışanların tamamı için en güçlü ilk itiraz hangisi?",
      options: ["200 sayısının çift olması", "Yolculuk süresinin nicel olması", "Diğer ulaşım biçimlerinin örnekleme girememesi", "Aynı mahalleden birden çok kişinin seçilmesi"],
      answer: 2,
      explanation: "Örnekleme çerçevesi yalnız sürücülerden oluşuyor. Diğer çalışanların yolculuk süreleri farklıysa daha çok sürücüye ulaşmak kapsama sorununu gidermez.",
    },
    {
      question: "Bir dağılım tablosunda 10–<20 dakikalık aralıkta evrenden 60, 20 kişilik örneklemden 8 gözlem var. Bu aralığın payları nedir?",
      options: ["Evren %50, örneklem %40", "Evren %60, örneklem %8", "İki grupta da %50", "Evren %40, örneklem %50"],
      answer: 0,
      explanation: "Her grubu kendi büyüklüğüne böl. Evrende 60 / 120 = 0,50 ve örneklemde 8 / 20 = 0,40.",
    },
    {
      question: "11, 13, 15, 17 ve 19 dakikalık beş teslimatın sonuncusu 59 dakika sürmüş olsaydı ortalama ve ortanca nasıl değişirdi?",
      options: ["İkisi de 8 artardı", "Ortalama 8 artar, ortanca aynı kalırdı", "Ortalama 40 artar, ortanca aynı kalırdı", "Ortalama aynı kalır, ortanca 8 artardı"],
      answer: 1,
      explanation: "Toplam süre 40 dakika, ortalama 40 / 5 = 8 dakika artar. Sıralamanın ortasındaki 15 dakika değişmez.",
    },
  ],
  next: [
    { href: "kombinatorik-ve-sayma.html", title: "Kombinatorik ve Sayma", why: "Geri koymadan seçimde kaç farklı alt küme olduğunu say." },
    { href: "normal-dagilim.html", title: "Normal Dağılım", why: "Merkez ve yayılımın bir dağılım modelini nasıl değiştirdiğini gör." },
    { href: "hipotez-testi-ve-guven-araligi.html", title: "Hipotez Testi ve Güven Aralığı", why: "Bir örneklemden yapılan tahminin belirsizliğini hesapla." },
  ],
  sources: [
    { title: "OpenStax · Introductory Statistics 2e", url: "https://openstax.org/details/books/introductory-statistics-2e", note: "Bölüm 1.2–1.3 veri türleri, örnekleme ve frekans. Bölüm 2.2 ve 2.5 histogram ile merkez ölçüleri." },
    { title: "NIST/SEMATECH · Histogram", url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda33e.htm", note: "Eşit genişlikli aralıklar, göreli frekans ve dağılım biçiminin yorumlanması." },
  ],
  revision: "Kasım 2026",
};
