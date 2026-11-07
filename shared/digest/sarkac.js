window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["sarkac"] = {
  slug: "sarkac",
  title: "Sarkaç: Zamanı Ölçen Salınım",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 25,
  tagline:
    "Bir ipin ucundaki küçük bir ağırlık, üç yüzyıl boyunca insanlığın en hassas saatiydi. Nedeni salınımın matematiğinde gizli: periyot kütleye değil, ipin boyuna bakar.",
  hook:
    "Anlatılana göre Galileo, Pisa Katedrali'nde sallanan bir kandili nabzıyla saydığında garip bir şey fark etti: salınım küçüldükçe küçülüyor ama bir gidiş-dönüşün süresi değişmiyordu. Peki ağırlık neden hiç fark etmez de ipin boyu her şeyi değiştirir?",
  bigIdea:
    "Küçük açılarda sarkaç bir <strong>basit harmonik salınıcıdır</strong>: periyodu yalnızca ipin uzunluğuna ve yerçekimine bağlıdır, <em>T = 2π√(L/g)</em>; kütle ve (küçük kaldıkça) genlik denklemde yoktur.",
  story: [
    "İlk biyografi yazarı Vincenzo Viviani'nin anlattığına göre, 1580'lerin başında genç bir tıp öğrencisi olan Galileo, Pisa Katedrali'nde sallanan bir kandili nabzıyla zamanladı. Hikâyenin ne kadarı efsane bilinmez; ama Galileo'nun sarkaç deneyleri gerçektir (en eski yazılı kaydı 1602 tarihli bir mektubudur): salınımın genliği azalsa bile süresi neredeyse aynı kalıyordu. Bu özelliğe <strong>eşzamanlılık</strong> (izokronizm) denir ve zamanı ölçmek için aranan şeydi: kendi kendine tekrar eden, dış koşullardan pek etkilenmeyen bir tik-tak.",
    "1656'da Christiaan Huygens bu fikri bir makineye dönüştürdü. İlk sarkaçlı saatler, günde çeyrek saat kadar şaşan eski saatlerin hatasını günde on beş saniye civarına indirdi. Huygens daha ileri gitti: 1673'te yayımladığı <em>Horologium Oscillatorium</em>'da büyük açılarda eşzamanlılığın bozulduğunu kanıtladı ve topun bir <em>sikloit</em> eğrisi üzerinde salındığı, her genlikte tam eşzamanlı bir sarkaç tasarladı. Bir ip ve bir ağırlık, bilimin ilk hassas ölçüm aletlerinden birine dönüşmüştü.",
    "Sarkaç yalnızca saat değildir; aynı zamanda bir <strong>yerçekimi ölçeridir</strong>. Periyot g'ye bağlı olduğu için, aynı sarkaç dünyanın farklı yerlerinde farklı hızda tıklar. 1672'de Fransız Guyanası'ndaki Cayenne'de gözlem yapan Jean Richer, Paris'te ayarlı sarkaçlı saatinin günde iki dakikadan fazla geri kaldığını gördü. Newton bu veriden Dünya'nın kutuplarda basık olduğunu çıkardı. Bugün aynı denklem bir çocuk salıncağını, gemi yalpalamasını, kristaldeki atom titreşimlerini ve bir elektrik devresindeki salınımı anlatıyor.",
  ],
  core: [
    {
      heading: "Geri çağıran kuvvet",
      body:
        "Topu dengeden uzaklaştırdığında yerçekimi onu doğrudan aşağı çeker, ama ip gerilimi hareketi bir çember yayına hapseder. İşe yarayan kısım, yerçekiminin yay boyunca bileşenidir: <em>mg·sin θ</em>. Bu bileşen her zaman denge noktasına doğru işaret eder; bu yüzden top asla bir tarafta kalmaz, hep geri döner.",
      formula: "F<sub>teğet</sub> = −mg·sin θ",
      formulaNote: "Eksi işareti kuvvetin daima açıyı küçültme yönünde olduğunu söyler.",
    },
    {
      heading: "Küçük açı yaklaşımı ve periyot",
      body:
        "Radyan cinsinden küçük açılar için sin θ ≈ θ'dır: 10° için fark yaklaşık binde beştir. Teğet doğrultuda Newton'un ikinci yasası mL·θ'' = −mg·sin θ verir; yaklaşımla bu θ'' = −(g/L)·θ olur. Bu, yay-kütle sisteminin x'' = −(k/m)·x denklemiyle aynı biçimdir: çözüm θ₀·cos(√(g/L)·t) sinüs dalgasıdır ve bir tam salınım 2π/√(g/L) sürer. Periyot formülünde kütle sadeleşir; çünkü yerçekimi ağır cismi daha çok çeker ama ağır cisim de o kadar zor ivmelenir. Serbest düşmede tüylerin ve taşın aynı anda yere varmasıyla aynı sebep.",
      formula: "T = 2π√(L/g)",
      formulaNote: "Uzunluğu dört katına çıkarırsan periyot iki katına çıkar; kütleyi değiştirmek hiçbir şeyi değiştirmez.",
    },
    {
      heading: "Enerjinin iki yüzü",
      body:
        "En yüksek noktada top bir an durur: bütün enerji potansiyeldir. En alt noktada hız en büyüktür: bütün enerji kinetiktir. Arada enerji sürekli biçim değiştirir ama toplamı sabit kalır. Sayfadaki enerji çubukları tam bu değiş tokuşu gösterir. Sönümü açtığında toplam çubuğun yavaşça eridiğini görürsün; enerji yok olmaz, havaya ısı olarak dağılır.",
      formula: "E = ½m(Lω)² + mgL(1 − cos θ)",
      formulaNote: "ω açısal hız; Lω topun çizgisel hızı. Potansiyel enerji en alt noktada sıfır alınmıştır.",
    },
    {
      heading: "Büyük açılarda formül nerede yanılır?",
      body:
        "sin θ ≈ θ yaklaşımı açı büyüdükçe kötüleşir; gerçek sarkaç formülün dediğinden daha <strong>yavaş</strong> salınır. 20°'de fark yüzde bir bile değildir, 45°'de yüzde dört, 90°'de yüzde on sekize çıkar. Tam çözüm elips integrali denen özel bir fonksiyon gerektirir; ama ilk düzeltme terimi işin özünü anlatır.",
      formula: "T ≈ T<sub>0</sub>·(1 + θ<sub>0</sub>²/16 + …)",
      formulaNote: "θ₀ radyan cinsinden başlangıç açısı. 45° için 1 + 0.039 ≈ 1.04, yani yüzde dört daha uzun periyot.",
    },
  ],
  lab: {
    intro:
      "Sayfadaki laboratuvar gerçek zamanlı çalışır: 1 metrelik sarkaç gerçekten iki saniyede bir gidip gelir. <strong>Ölçülen periyot</strong> kutusu, topun denge noktasından aynı yönde art arda iki geçişi arasındaki sürenin son üç salınımdaki ortalamasını gösterir; <strong>Fark</strong> kutusu bunun <strong>Formül T₀</strong> değerinden yüzde kaç saptığını söyler. İlk değer, bıraktıktan yaklaşık iki salınım sonra gelir. Uzunluğu, açıyı ya da yerçekimini değiştirmek sarkacı θ₀'dan yeniden bırakır.",
    experiments: [
      {
        title: "Kütle gerçekten önemsiz mi?",
        predict: "Kütleyi 0.5 kg'dan 5 kg'a çıkarırsan ölçülen periyot artar mı, azalır mı, aynı mı kalır?",
        do: "L = 1.00 m ve θ₀ = 20° iken kütleyi 0.5 kg yap, birkaç salınım bekle ve ölçülen periyodu not et. Sonra kütleyi 5.0 kg yapıp sıfırla.",
        observe: "İki ölçüm de 2.021 s'dir (formül 2.006 s; Fark kutusundaki +0.77 %, 20°'lik genliğin payıdır); top büyüse de tik-tak değişmez. Çubukların yanındaki joule değerleri on katına çıkar ama paylaşım biçimi aynı kalır.",
        explain: "Yerçekimi kuvveti kütleyle orantılı, ivmeye direnç de kütleyle orantılı; ikisi sadeleşir. Serbest düşmede neden aynı anda düştüklerini hatırla.",
      },
      {
        title: "Dört kat uzunluk, iki kat periyot",
        predict: "Uzunluğu 0.50 m'den 2.00 m'ye çıkarırsan periyot kaç katına çıkar? Dört kat mı, iki kat mı?",
        do: "θ₀ = 15° ve L = 0.50 m seçip sıfırla, ölçülen periyodu kaydet; ardından L = 2.00 m yapıp yeniden sıfırla ve ölç.",
        observe: "1.425 s ve 2.849 s: tam iki kat; 2 × 1.425 = 2.850 ile aradaki binde birlik fark yalnız yuvarlamadır. Grafikteki kesikli çizgiler (formül periyodu T₀) kırmızı eğrinin orta çizgiyi aşağıdan yukarı kestiği noktalara neredeyse tam oturur; 15°'de gerçek periyot formülden yalnız % 0.4 uzundur.",
        explain: "Periyot L'nin kendisiyle değil kareköküyle büyür. √4 = 2 olduğu için dört kat uzunluk iki kat süre demektir.",
      },
      {
        title: "Ay'da sarkaçlı saat",
        predict: "Aynı sarkacı Ay'a götürürsen (g = 1.62 m/s²) periyot kaç katına çıkar? Tahminini √(9.81/1.62) ile karşılaştır.",
        do: "L = 1.00 m, θ₀ = 20° ile Dünya'da ölç. Yerçekimi menüsünden Ay'ı seç ve sıfırla; sonra aynısını Jüpiter'le yap.",
        observe: "Dünya'da 2.021 s, Ay'da 4.974 s, Jüpiter'de 1.272 s; Fark üçünde de +0.77 %. Ay'da salınım ağır çekimde gibi görünür; hız vektörü de kısalır.",
        explain: "g paydada ve karekök içinde: yerçekimi 9.81/1.62 ≈ 6.06 kat azalınca periyot √6.06 ≈ 2.46 kat uzar. Ölçümlerin oranı da 2.46'dır, çünkü 20°'lik genliğin düzeltme çarpanı her gezegende aynıdır. Sarkaçlı saat Ay'da günde saatlerce geri kalırdı.",
      },
      {
        title: "Küçük açı nerede biter?",
        predict: "θ₀ = 10°, 45° ve 90° için <strong>Fark</strong> kutusunda hangi yüzdeleri bekliyorsun? Formül yukarı mı, aşağı mı yanılır?",
        do: "Sönüm kapalıyken sırayla 10°, 45° ve 90° başlangıç açılarını dene; her seferinde birkaç salınım bekleyip farkı oku.",
        observe: "+0.19 %, +4.00 % ve +18.03 %. Gerçek periyot hep formülden uzundur; 90°'de kesikli çizgiler kırmızı eğrinin yukarı yönlü geçişlerine artık oturmaz, her salınımda yaklaşık 0.36 s kayar.",
        explain: "sin θ, θ'dan küçüktür; geri çağıran kuvvet formülün varsaydığından zayıftır, top daha tembel döner. Düzeltme terimi θ₀²/16 bunu nicel olarak verir: 10°'de % 0.19, 45°'de % 3.9. 90°'de ise yalnız % 15.4 verir; kalan farkı serinin sonraki terimleri kapatır.",
      },
    ],
  },
  wow: [
    {
      title: "Metre neredeyse bir sarkaçtı",
      body:
        "1790'da Fransız Meclisi'ne sunulan ilk öneri, metreyi 'bir saniyede yarım salınım yapan sarkacın uzunluğu' olarak tanımlamaktı: yaklaşık 0.994 m. Teklif reddedildi; çünkü g enlemle değişiyordu ve metre dünyanın her yerinde aynı olmalıydı. Yine de bugünkü metre o sarkaçtan yalnızca 6 mm uzun.",
    },
    {
      title: "Dünya'nın döndüğünü gösteren ip",
      body:
        "1851'de Léon Foucault, Paris Panthéon'unun kubbesine 67 metrelik bir tele 28 kilogramlık bir top astı. Salınım düzlemi saatte 11 derece dönüyordu. Düzlemi döndüren sarkaç değil, altındaki yer kürenin dönüşüydü: kutupta bir tam tur bir gün sürerdi, Paris'in enleminde yaklaşık 32 saat sürüyordu. İnsanlık ilk kez Dünya'nın dönüşünü gökyüzüne bakmadan, bir odanın içinde gördü.",
    },
    {
      title: "Günde iki buçuk dakika, basık bir gezegen",
      body:
        "Richer'nin Cayenne'de geri kalan saati, ekvatora yakın yerlerde yerçekiminin biraz daha zayıf olduğunu söylüyordu. Newton bunu, dönen Dünya'nın ekvatorda şiştiği ve kutuplarda basıldığı şeklinde yorumladı. Küçük bir saat hatası, gezegenin biçimini açığa çıkardı.",
    },
  ],
  worked: {
    title: "Saniye sarkacı",
    prompt:
      "Dünya'da (g = 9.81 m/s²) bir metrelik sarkacın periyodunu küçük açı formülüyle bul ve sayfanın varsayılan 20°'lik salınımda ölçtüğü değerle karşılaştır. Sonra periyodu tam 1 saniye olan bir sarkacın uzunluğunu hesapla.",
    steps: [
      "Formülü yaz: T = 2π√(L/g). L = 1.00 m, g = 9.81 m/s² için L/g = 0.1019 s².",
      "Karekökü al: √0.1019 ≈ 0.3193 s. 2π ile çarp: T ≈ 2.006 s. Bir metrelik sarkaç iki saniyede bir gidip gelir; yani her bir saniyede bir denge noktasından geçer. 'Saniye sarkacı' adı buradan gelir.",
      "Büyük açı düzeltmesini ekle: θ₀ = 20° = 0.349 rad için θ₀²/16 = 0.0076, yani T ≈ 2.006 s × 1.0076 ≈ 2.021 s. Sayfa 2.021 s ölçer, Fark kutusu +0.77 % gösterir; serinin sonraki terimi (11θ₀⁴/3072) yalnızca 0.0001 s ekler.",
      "Tersini sor: T = 1 s için L = gT²/(4π²) = (9.81 m/s²)·(1 s)² / 39.48 ≈ 0.248 m.",
      "Sayfada dene: kaydırıcı 0.05 m'lik adımlarla ilerlediği için L = 0.25 m ve θ₀ = 5° seç. Formül T₀ kutusu 1.003 s, ölçülen periyot 1.004 s gösterir (Fark +0.05 %); 20°'de ise 1.011 s'ye çıkar.",
    ],
    result:
      "Bir metrelik sarkaç küçük açıda 2.006 s'de, 20°'den bırakılınca 2.021 s'de; 25 santimetrelik sarkaç 1.0 s'de salınır. Periyodu yarıya indirmek için uzunluğu dörtte bire indirmek gerekir.",
  },
  misconceptions: [
    {
      myth: "Ağır top daha hızlı salınır.",
      truth:
        "Periyot formülünde kütle yoktur. Daha büyük kütle daha büyük kuvvet görür ama o kadar da zor ivmelenir. Sayfada kütleyi on katına çıkar ve birkaç salınım bekle; ölçülen periyot yine aynı değeri gösterir.",
    },
    {
      myth: "T = 2π√(L/g) her açıda tam doğrudur.",
      truth:
        "Bu bir küçük açı yaklaşımıdır. 20°'ye kadar hata yüzde birin altında kalır; 90°'de periyot formülün dediğinden yüzde on sekiz uzundur. Formülün sınırlarını bilmek onu bilmek kadar önemlidir.",
    },
    {
      myth: "En alt noktada top anlık olarak durur.",
      truth:
        "Tam tersi: en alt noktada hız en büyüktür, sıfır olan teğet ivmedir. Top uç noktalarda durur; teğet ivme de orada en büyüktür. Hız vektörünün uzunluğunu izleyerek bunu doğrula.",
    },
    {
      myth: "İp her an aynı kuvvetle gerilir.",
      truth:
        "Gerilim açıyla değişir; en alt noktada hem ağırlığı taşır hem de topu çember üzerinde tutmak için ek kuvvet uygular. 45°'den bırakılan bir sarkaçta alt noktadaki gerilim ağırlığın yaklaşık 1.6 katıdır.",
    },
  ],
  glossary: [
    { term: "Periyot (T)", definition: "Bir tam gidiş-dönüşün süresi; saniye ile ölçülür." },
    { term: "Frekans (f)", definition: "Saniyedeki salınım sayısı, f = 1/T; birimi hertz." },
    { term: "Genlik", definition: "Denge noktasından en büyük uzaklaşma; sarkaçta başlangıç açısı θ₀." },
    { term: "Basit harmonik hareket", definition: "Geri çağıran kuvvetin yer değiştirmeyle orantılı olduğu hareket; konum zamanla sinüs gibi değişir." },
    { term: "Küçük açı yaklaşımı", definition: "Radyan cinsinden küçük θ için sin θ ≈ θ alınması; sarkacı harmonik salınıcıya dönüştüren adım." },
    { term: "Sönüm", definition: "Hava direnci ve sürtünmenin salınım enerjisini zamanla ısıya çevirmesi; sönüm hızla orantılıysa (sayfadaki model) genlik üstel biçimde azalır." },
    { term: "Eşzamanlılık (izokronizm)", definition: "Periyodun genlikten bağımsız olması; sarkacı saat yapan, basit sarkaçta yalnız küçük açılarda yaklaşık, sikloit sarkaçta tam geçerli özellik." },
    { term: "Açısal hız (ω)", definition: "Açının değişim hızı, rad/s. Topun çizgisel hızı v = Lω." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede sarkaç bir formüldür; üniversitede (önce <strong>Fizik I</strong>'de, sonra <strong>Diferansiyel Denklemler</strong> dersinde) bir <strong>diferansiyel denklem</strong>: θ'' + (g/L)·sin θ = 0. Bu denklemin temel fonksiyonlarla yazılan bir çözümü yoktur; büyük açılarda periyot elips integralleriyle, bilgisayarda ise tam bu sayfanın yaptığı gibi 1/240 saniyelik adımlarla, dördüncü mertebe Runge–Kutta (RK4) yöntemiyle sayısal olarak bulunur. Sönüm ve dışarıdan itme eklendiğinde <em>rezonans</em> ortaya çıkar: salıncağı doğru anda itmekle bir radyonun tek bir istasyonu seçmesi aynı matematiktir.",
      "İkinci sarkacı birincinin ucuna astığında ise bambaşka bir dünyaya girersin: çift sarkaç, büyük açılarda başlangıç koşullarına aşırı duyarlı <strong>kaotik</strong> bir sistemdir. Aynı denklemler kuantum mekaniğinde harmonik salınıcı olarak, elektronikte LC devresi olarak, moleküllerde bağ titreşimi olarak karşına çıkar. Bu bir rastlantı değildir: kararlı bir dengenin yakınında potansiyel enerji hemen her zaman bir parabole benzer, bu yüzden küçük salınımlar harmoniktir.",
    ],
    topics: ["Diferansiyel denklemler", "Faz uzayı", "Sönümlü ve sürülen salınıcı", "Rezonans", "Kaos ve çift sarkaç", "Lagrange mekaniği"],
  },
  quiz: [
    {
      question: "Bir sarkacın periyodunu iki katına çıkarmak için ne yapmalısın?",
      options: ["Kütleyi iki katına çıkarmak", "Uzunluğu iki katına çıkarmak", "Uzunluğu dört katına çıkarmak", "Başlangıç açısını iki katına çıkarmak"],
      answer: 2,
      explanation: "T, L'nin kareköküyle orantılıdır; iki kat periyot için dört kat uzunluk gerekir. Kütle denklemde yoktur, küçük açılarda genlik de etkisizdir.",
    },
    {
      question: "Sarkaç en alt noktadan geçerken hangisi doğrudur?",
      options: ["Hız sıfır, ivme en büyük", "Hız en büyük, teğet ivme sıfır", "Hem hız hem ivme sıfır", "Potansiyel enerji en büyük"],
      answer: 1,
      explanation: "Alt noktada geri çağıran kuvvet sıfırdır (sin 0 = 0), bu yüzden teğet ivme sıfırdır; ama top en hızlı oradadır ve enerji tümüyle kinetiktir.",
    },
    {
      question: "Aynı sarkaç Ay'a götürülürse (g altı kat küçük) periyodu yaklaşık kaç kat olur?",
      options: ["Altı kat", "Yaklaşık 2.45 kat", "Değişmez", "Altıda bir"],
      answer: 1,
      explanation: "g paydada ve karekök içindedir: √6 ≈ 2.45. Sayfada Yerçekimi g menüsünden Ay'ı seçip ölç: oran 2.46 çıkar, çünkü 9.81/1.62 tam 6 değil, 6.06'dır.",
    },
  ],
  next: [
    { href: "cift-sarkac.html", title: "Çift Sarkaç", why: "Bir sarkaç daha ekle; düzenli salınımın nasıl kaosa dönüştüğünü gör." },
    { href: "yay-kutle.html", title: "Yay-Kütle Sistemi", why: "Aynı sinüs dalgası, bu kez bir yayda: Hooke yasası ve basit harmonik hareketin öteki yüzü." },
    { href: "serbest-dusme.html", title: "Serbest Düşme", why: "Kütlenin periyotta neden görünmediğinin kökü: her cisim aynı ivmeyle düşer." },
    { href: "dairesel-hareket.html", title: "Dairesel Hareket", why: "Topu çember üzerinde tutan ip gerilimi ve merkezcil kuvvet." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 1, 15.4 Pendulums", url: "https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums", note: "Basit ve fiziksel sarkaç, küçük açı yaklaşımı ve örnek problemler (İngilizce, açık ders kitabı)." },
    { title: "PhET · Sarkaç Laboratuvarı", url: "https://phet.colorado.edu/tr/simulations/pendulum-lab", note: "Uzunluk, kütle ve yerçekimini değiştirebildiğin bir başka simülasyon; ölçümlerini karşılaştır." },
    { title: "HyperPhysics · Large Amplitude Pendulum", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/pendl.html", note: "Büyük açıda periyodun elips integrali ve serisi; açıyı girip küçük açı formülüyle karşılaştıran bir hesaplayıcı (İngilizce)." },
    { title: "Wikipedia · Pendulum", url: "https://en.wikipedia.org/wiki/Pendulum", note: "Tarihçe bölümü: Viviani'nin anlattığı kandil, Galileo'nun 1602 mektubu, Huygens'in 1656 saati ve 1673 kitabı, Richer'in Cayenne ölçümü, Foucault 1851 ve saniye sarkacı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
