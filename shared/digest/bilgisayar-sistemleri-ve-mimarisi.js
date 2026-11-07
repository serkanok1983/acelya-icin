window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bilgisayar-sistemleri-ve-mimarisi"] = {
  slug: "bilgisayar-sistemleri-ve-mimarisi",
  title: "Bilgisayar Mimarisi: Bir Saat Döngüsünün İçi",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 35,
  tagline:
    "Telefonundaki çip saniyede milyarlarca kez tik tak eder ve her tikte bir komut bir adım ilerler. Von Neumann'ın 1945 taslağından işlem hattına, ikiye tümleyenden önbelleğe: makinenin içindeki düzen.",
  hook:
    "Bir işlemci 5 GHz'de çalışırken her saat döngüsü 0.2 nanosaniye sürer; ışık bile bu sürede yalnızca 6 santimetre yol alır, yani çipin bir ucundan öbürüne yetişemez. Bu kadar dar bir zaman dilimine 'topla', 'oku', 'karşılaştır' nasıl sığar? Ve 1948'de 128 baytlık belleğiyle çalışan ilk makineyle bugünkü telefonun aynı planı kullandığını biliyor muydun?",
  bigIdea:
    "Bir bilgisayar, komutları da veri gibi bellekte saklayan ve onları <strong>getir–çöz–çalıştır</strong> döngüsüyle teker teker işleyen bir makinedir; hızı, bu döngüyü işlem hattıyla üst üste bindirmekten ve belleği katmanlara ayırmaktan gelir.",
  story: [
    "1945 yazında Philadelphia'da ENIAC neredeyse bitmişti: 17.468 vakum tüpü, yaklaşık 30 ton ağırlık, 150 kilovat güç, saniyede 5.000 toplama. Ama bir kusuru vardı: program makinenin içinde değil, kabloların ve anahtarların dizilişindeydi. Yeni bir problem için ekipler günlerce fiş takıp sökerdi. 30 Haziran 1945 tarihli, 101 sayfalık bir daktilo metni bu kusuru kökten çözdü: <em>First Draft of a Report on the EDVAC</em>. Kapakta yalnızca John von Neumann'ın adı vardı; oysa fikirlerin çoğu J. Presper Eckert ve John Mauchly ile aylarca süren tartışmalarda doğmuştu. Herman Goldstine taslağı dağıtınca fikir kamuya mal oldu ve Eckert ile Mauchly patent alamadı; 'von Neumann mimarisi' adı o günden kaldı. Temel fikir şuydu: komut da bir sayıdır, veriyle yan yana aynı bellekte durur; işlemci onu getirir, çözer, çalıştırır ve bir sonrakine geçer. Bu düşünceyi ilk kez 21 Haziran 1948'de Manchester'daki 'Baby' adlı makine gerçekten çalıştırdı: 32 kelimelik, toplam 1.024 bitlik belleğiyle 2<sup>18</sup>'in en büyük öz bölenini 52 dakikada buldu.",
    "Makinenin içindeki mantık daha da eskidir. George Boole 1854'te doğru ve yanlışı 1 ve 0'la hesaplanabilen bir cebire çevirdi; ne işe yarayacağını kendisi de bilmiyordu. 1937'de MIT'de 21 yaşındaki Claude Shannon yüksek lisans tezinde bu cebirin röle devrelerini tam olarak tarif ettiğini gösterdi: VE, VEYA, DEĞİL kapıları birer anahtar düzeneğiydi. Aralık 1947'de Bell Laboratuvarları'nda transistor icat edildi, 1958'de Jack Kilby ilk tümdevreyi yaptı. 1965'te Gordon Moore, bir çipe sığan transistor sayısının her yıl ikiye katlandığını yazdı; 1975'te süreyi iki yıla çekti ve bu 'Moore yasası' yarım yüzyıl tuttu. 1971'deki Intel 4004'te 2.300 transistor vardı ve saat hızı 740 kHz'di; 2020'deki Apple M1'de 16 milyar transistor var. Elli yılda yaklaşık yedi milyon kat.",
    "Transistor sayısı artınca soru 'bunları nasıl düzenleyelim' oldu. Fabrika hattı fikri, yani bir komut çalışırken bir sonrakini çözüp ondan sonrakini getirmek, 1961'deki IBM Stretch gibi erken makinelerde denendi; 1980'lerde Berkeley'de David Patterson ve Stanford'da John Hennessy bunu bir tasarım felsefesine dönüştürdü: <strong>RISC</strong>, az sayıda basit ve sabit uzunluklu komut. Bu sayfadaki beş aşamalı hat Hennessy'nin MIPS tasarımının ders kitabı hâlidir; ikisi 2017 Turing Ödülü'nü birlikte aldı. 1985'te Cambridge'deki küçük Acorn şirketinde Sophie Wilson ve Steve Furber'ın tasarladığı yaklaşık 25.000 transistorlu ARM1 de aynı felsefenin çocuğudur; bugün telefonların neredeyse tamamında onun torunları çalışır.",
    "Sonra bir duvar çıktı. İşlemciler her yıl hızlanırken belleğin gecikmesi çok yavaş iyileşiyordu; 1995'te Wulf ve McKee buna 'bellek duvarı' adını verdi. Cevap, sayfadaki piramittir: sık kullanılan veriyi işlemcinin yanındaki küçük ama hızlı önbelleklerde tutmak. İkinci duvar ısıydı: 2004'te Pentium 4 3,8 GHz'e ulaştı ve saat hızları o günden beri pek kıpırdamadı; çip daha hızlı tik taklayamıyor, çünkü soğutulamıyor. Çözüm, tek hızlı çekirdek yerine çok sayıda çekirdek oldu. Bugün mimari demek, yavaş belleği gizlemek ve işi paylaştırmak demektir.",
  ],
  core: [
    {
      heading: "Saklı program: komut da bir sayıdır",
      body:
        "Bellekte 'veri' ile 'komut' diye iki ayrı madde yoktur; ikisi de bit dizisidir. Bir dizinin komut olması, işlemcinin ona komut gözüyle bakmasından ibarettir. <strong>Program sayacı</strong> (PC) adlı yazmaç sıradaki komutun adresini tutar; işlemci o adresten komutu getirir (IF), bitlerini çözüp hangi işlem ve hangi yazmaçlar olduğunu anlar (ID), aritmetik birimde hesaplar (EX), gerekiyorsa belleğe gider (MEM) ve sonucu yazmaca yazar (WB). Sayfadaki altı komut tam bu dili konuşur: <code>ADD R1,R2,R3</code> 'R2 ile R3'ü topla, R1'e yaz' demektir, <code>LW R6,0(R1)</code> ise 'R1'deki adresten bir kelime oku'. Von Neumann darboğazı da buradan çıkar: komut ve veri aynı yoldan geldiği için işlemci sık sık yolun boşalmasını bekler.",
      formula: "getir → çöz → çalıştır,  PC ← PC + 4",
      formulaNote: "RISC türü makinelerde her komut 4 bayttır; dallanma yoksa program sayacı her döngüde 4 artar.",
    },
    {
      heading: "İşlem hattı: aynı anda beş komut",
      body:
        "Çamaşırhanede yıkama bitmeden kurutmayı başlatamazsın; ama ikinci partiyi yıkarken birincisini kurutabilirsin. İşlem hattı aynı numaradır: beş aşama birbirinden bağımsız donanımdır, bu yüzden her döngüde beş farklı komut beş farklı aşamada olabilir. Tek bir komut yine beş döngü sürer; değişen, birim zamanda biten komut sayısıdır. Hat her zaman dolu olamaz: <code>SUB R4,R1,R5</code>, bir önceki <code>ADD</code>'in R1'e yazacağı sonucu ister; sonuç hazır değilse hat bir döngü bekler. Buna <strong>veri tehlikesi</strong> denir; sayfada kırmızı EX hücresi olarak görünür. Bir işlemcinin toplam süresi üç çarpanın ürünüdür: komut sayısı, komut başına döngü (CPI) ve döngü süresi. İşlem hattı CPI'yi 5'ten 1'e doğru çeker; tehlikeler onu yeniden yukarı iter.",
      formula: "Döngü sayısı = k + (n − 1)",
      formulaNote: "k aşama sayısı, n komut sayısı. 5 aşama ve 6 komut için 10 döngü; sırayla çalışsaydı 30 olurdu.",
    },
    {
      heading: "Bellek piramidi ve yerellik",
      body:
        "Sayfadaki piramitte yazmaçtan diske inerken kapasite büyür, gecikme patlar: L1 için 1 ns, RAM için 100 ns, SSD için 50 µs, HDD için 5 ms. Bu sayıları insan ölçeğine çevir: 1 nanosaniye 1 saniye olsaydı L2'ye 4 saniyede, L3'e 12 saniyede, RAM'e yaklaşık 2 dakikada, SSD'ye 14 saatte, HDD'ye ise 58 günde ulaşırdın. İşlemci bu bekleyişi nasıl gizler? Programlar <strong>yerellik</strong> gösterir: az önce dokunduğu veriye ve onun komşularına yine dokunur. Önbellek, bu küçük 'sıcak' kümeyi işlemcinin yanında tutar. Her istek önce L1'e sorulur; orada bulunursa isabet, bulunmazsa ıska. Yüzde doksan sekiz isabetle bile RAM'in 100 nanosaniyesi ortalamada 3 nanosaniyeye iner.",
      formula: "Ortalama erişim = t<sub>isabet</sub> + (ıska oranı) × t<sub>ıska</sub>",
      formulaNote: "1 ns + 0.02 × 100 ns = 3 ns. Isabet oranı yüzde 90'a düşerse 11 ns: küçük bir oran farkı, büyük bir zaman farkı.",
    },
    {
      heading: "Eksi işareti olmayan negatif sayılar",
      body:
        "Makinenin elinde yalnızca 32 kutu ve her kutuda 0 ya da 1 var; 'eksi' diye bir simge yok. Çözüm, bir kilometre sayacının geriye dönmesine benzer: 32 bitte 0'dan bir geri gidersen 2<sup>32</sup> − 1'e, yani 32 tane 1'e gelirsin. Bu desen −1'dir. Genel kural: −x, 2<sup>32</sup> − x ile aynı bitleri taşır; pratikte bitleri ters çevirip 1 eklersin. Bu <strong>ikiye tümleyen</strong> gösteriminin dehası, toplama devresinin işaretten habersiz çalışmasıdır: 5 + (−3) için devre 5 ile 4 294 967 293'ü toplar, taşan bit düşer, geriye 2 kalır. En soldaki bitin ağırlığı +2<sup>31</sup> değil −2<sup>31</sup>'dir; o bit 1 ise sayı negatiftir. Sayfanın 32-bit Two's Complement kutusu tam bunu gösterir.",
      formula: "−x ≡ 2<sup>32</sup> − x  (mod 2<sup>32</sup>)",
      formulaNote: "32 bitlik işaretli aralık: −2 147 483 648'den +2 147 483 647'ye. Üst sınırı 1 artırırsan en alt sınıra düşersin.",
    },
    {
      heading: "Kapılardan toplayıcıya",
      body:
        "Sayfadaki yedi kapı birer doğruluk tablosudur; ama aritmetik bunların birleşiminden çıkar. İki biti topla: 0+0=0, 0+1=1, 1+0=1, 1+1=10. Sonucun sağ basamağı tam olarak XOR'un tablosudur, sol basamağı (elde) ise AND'inkidir. İki kapı, bir <strong>yarım toplayıcı</strong>. Eldeyi de hesaba katan tam toplayıcıyı 32 kez yan yana dizersen sayfadaki 32 bitlik sayıları toplayan devreyi elde edersin; işlemcinin EX aşamasında olan şey budur. NAND'ın 'fonksiyonel olarak tam' olması da bu yüzden önemli: NOT, iki girişi birleştirilmiş bir NAND'dır; AND, bir NAND'ın ardına NOT; OR, girişleri tersinmiş bir NAND. Tek bir kapı türünden her devre, dolayısıyla her bilgisayar kurulabilir.",
      formula: "toplam = A ⊕ B,  elde = A ∧ B",
      formulaNote: "⊕ XOR, ∧ AND. Tam toplayıcı için üçüncü giriş olarak önceki elde eklenir.",
    },
  ],
  lab: {
    intro:
      "Sayfada yedi bölüm var; dördü etkileşimli. <strong>CPU İşlem Hattı</strong>: '1 Saat Döngüsü', 'Otomatik' (600 ms'de bir adım) ve 'Sıfırla' düğmeleri; altta her döngünün beş hücrelik kaydı birikir. <strong>Bellek Hiyerarşisi</strong>: yedi katmana tıklayınca ayrıntı kutusu dolar. <strong>Sayı Sistemleri Dönüştürücü</strong>: tek bir metin kutusu (varsayılan 2024; 0b, 0x, 0o önekleri ve eksi işareti kabul edilir) ve altı sonuç kutusu; yazarken anında dönüşür. <strong>Mantık Kapıları</strong>: yedi kapı kartı ve tıklanınca 0/1 değişen A, B giriş kutuları. <strong>Veri Yapıları</strong>: Stack, Queue, Linked List, Binary Tree sekmeleri ile 'Ekle', 'Çıkar', 'Sıfırla' düğmeleri; dört sekme aynı sayı dizisini paylaşır. Kavram kartları ise okumak içindir.",
    experiments: [
      {
        title: "Altı komut kaç saat döngüsü sürer?",
        predict:
          "Her komut beş aşamadan geçiyorsa altı komut sırayla 30 döngü alırdı. İşlem hattıyla kaç döngüde biter: 30 mu, 10 mu, 6 mı? Kırmızı bir hücre görürsen sayaca ne olur?",
        do: "'Sıfırla'ya bas, sonra '1 Saat Döngüsü'ne teker teker bas. Her basışta beş kutuda hangi komut numaralarının durduğunu ve alttaki kayda eklenen satırı izle; bütün hücreler '—' olana kadar say.",
        observe:
          "Kırmızı hücre çıkmazsa sayaç 10'da durur: 2. döngüde ADD ID'ye geçerken SUB IF'e girer, 6. döngüde IF'ten MEM'e dört kutu birden doludur, 7. döngüden sonra hat boşalmaya başlar. WB kutusu hiç dolmaz; komut MEM'den sonra doğrudan kaybolur. Kırmızı EX hücresi (veri tehlikesi) çıkarsa, altıncı komut hatta girmeden önce gelen her kırmızı hücre sayaca bir döngü ekler: 11 ya da 12. Yaklaşık iki denemeden birinde hiç kırmızı çıkmaz.",
        explain:
          "k + n − 1 = 5 + 6 − 1 = 10. Hat dolunca her döngüde bir komut biter; ilk komutun dört döngülük 'doldurma' bedeli bir kez ödenir. Hızlanma 30/10 = 3; komut sayısı büyüdükçe 5'e yaklaşır. Sayfa tehlikeyi yüzde 15 olasılıkla rastgele üretir; gerçek işlemcide tehlike rastgele değildir: SUB'ın R1'i, ADD'in henüz yazmadığı R1'dir.",
      },
      {
        title: "Dört yüzü olan sayı: 2024 ve −2024",
        predict:
          "2024'ün onaltılığı kaç basamaktır? 'Byte Değerleri' satırında hangi dört sayı çıkar? −2024 yazınca sayfa bir eksi işareti mi gösterir, yoksa bambaşka bir desen mi?",
        do: "Kutudaki 2024'ü olduğu gibi bırak ve altı kutuyu oku. Sonra sırayla 255, 256, −1 ve −2024 yaz; 'Dönüştür'e basmana gerek yok, yazarken dönüşür.",
        observe:
          "2024 → 0x7E8, 0o3750, 11111101000 ve baytlar 0 · 0 · 7 · 232. 255 → 0xFF ve sekiz bitlik 11111111; 256 → 0x100 ve dokuz bitlik 100000000. −1 → 32 tane 1, 0xFFFFFFFF, baytlar 255 · 255 · 255 · 255. −2024 → 0xFFFFF818; iki satır 1111111111111111 ve 1111100000011000; baytlar 255 · 255 · 248 · 24. Hiçbir yerde eksi işareti yok, ama en soldaki bit 1.",
        explain:
          "7 × 256 + 232 = 2024; her onaltılık basamak dört bittir ve bayt sütunu onaltılığı ikişer basamak okur: 00 00 07 E8. Negatif için makine 2<sup>32</sup> − x hesaplar: 4 294 967 296 − 2024 = 4 294 965 272 = 0xFFFFF818. Soldaki bit 1 ise sayı negatiftir. Çözümlü örnekte aynı hesabı elle yapacaksın.",
      },
      {
        title: "NAND'den DEĞİL, XOR'dan toplama",
        predict:
          "NAND kartında iki girişi de aynı yaparsan (00 ve 11) çıkışlar NOT'un tablosuna benzer mi? 1 + 1 işlemini yalnızca XOR ve AND ile nasıl yazarsın?",
        do: "NAND kartına tıkla; A ve B kutularını tıklayarak 00 ve 11 yap, çıkışı oku. Sonra XOR kartına geç ve dört giriş çiftini (00, 01, 10, 11) dene; aynı dört çifti AND kartında tekrarla.",
        observe:
          "NAND: 00 → 1, 11 → 0; tam NOT'un tablosu. XOR: 01 → 1, 10 → 1, 00 ve 11 → 0. AND yalnız 11 → 1. A = 1, B = 1 için XOR 0, AND 1 verir; ikisini yan yana yazınca '10', yani ikilikte 2.",
        explain:
          "İki girişi birleştirilmiş NAND, bir DEĞİL kapısıdır; bu yüzden tek kapı türüyle her devre kurulabilir. XOR 'toplamın sağ basamağı', AND 'elde' olduğundan ikisi birlikte yarım toplayıcıdır. Sayfa tek seferde bir kapı gösterir; iki tablonun birleşimini kâğıtta yan yana yaz.",
      },
      {
        title: "Aynı beş sayı, dört farklı düzen",
        predict:
          "'Sıfırla'dan sonra dizi 42, 17, 93, 8, 56'dır. Stack sekmesinde 'Çıkar' hangi sayıyı siler? Queue sekmesinde hangisini? Binary Tree sekmesinde kökte hangi sayı durur?",
        do: "'Sıfırla'ya bas. Stack sekmesinde bir kez 'Çıkar'. Queue sekmesine geç, bir kez 'Çıkar'. Linked List sekmesine bak. Binary Tree'ye geç ve biçimi incele. Son olarak 'Sıfırla'ya basıp 'Ekle'ye sekiz kez bas; en alttaki elemanı izle.",
        observe:
          "Stack'te 56 (TOP) gider, Queue'da 42 (FRONT) gider; kalan 17, 93, 8 dizisi üç sekmede de aynıdır. Ağaçta kök 42, altında 17 ve 93, en altta 8 ve 56. Sekizinci 'Ekle'de sayaç 12'de kalır ve en eski eleman 42 sessizce kaybolur.",
        explain:
          "LIFO ile FIFO aynı diziyi iki ayrı uçtan tüketir. Ağaç, diziyi sıralayıp ortadakini kök yapar: 8 17 42 56 93 → kök 42, sol yarının ortası 17, sağ yarının ortası 93. On iki sınırı sayfanın çizim alanı içindir; gerçek bir yığın dolunca taşma hatası verir, en alttakini atmaz. Bir de kusur: sayfa 56'yı 17'nin altına çizer; doğru ikili arama ağacında 56, 93'ün sol çocuğudur.",
      },
    ],
  },
  wow: [
    {
      title: "128 baytlık bellekle 52 dakika",
      body:
        "21 Haziran 1948'de Manchester'daki 'Baby', programı bellekte saklayan ilk bilgisayar olarak çalıştı. Belleği 32 kelime × 32 bit, yani 1.024 bit: 128 bayt, bu cümleden biraz daha kısa. İlk program 262.144'ün en büyük öz bölenini aradı ve 52 dakika sonra 131.072'yi buldu. 8 GB belleği olan bir telefon ondan 67 milyon kat fazlasını taşır.",
    },
    {
      title: "Işık bile bir saat döngüsüne yetişemez",
      body:
        "Işık bir nanosaniyede yaklaşık 30 santimetre gider. 5 GHz'lik bir döngü 0.2 nanosaniyedir: 6 santimetre. Bir işlemci çekirdeği birkaç milimetre, bütün çip bir iki santimetredir; bakır tellerde sinyal ışıktan da yavaştır. Saat hızlarının 2004'ten beri yerinde sayması tek başına bundan değil, ısıdan; ama bu sayı, RAM'in 100 nanosaniyesinin neden 500 döngülük bir bekleyiş olduğunu ve önbelleğin neden şart olduğunu anlatır.",
    },
    {
      title: "19 Ocak 2038, saat 03:14:07",
      body:
        "Pek çok sistem zamanı 1 Ocak 1970'ten beri geçen saniye olarak 32 bitlik işaretli bir sayıda tutar. O sayı 2 147 483 647'ye, yani 0x7FFFFFFF'e 19 Ocak 2038'de 03:14:07 UTC'de ulaşır. Bir saniye sonra en soldaki bit 1 olur ve sayı −2 147 483 648'e, yani 13 Aralık 1901'e düşer. Sayfaya 2147483647 yazıp Two's Complement satırına bak; ardından 2147483648'i dene: aynı satırın başındaki 1, bu sorunun ta kendisidir.",
    },
  ],
  worked: {
    title: "−2024'ü 32 bitte yazmak",
    prompt:
      "−2024 sayısını 32 bitlik ikiye tümleyenle yaz; onaltılık karşılığını ve dört baytını bul. Sonucu sayfadaki dönüştürücüyle karşılaştır.",
    steps: [
      "Önce 2024'ü ikiye çevir. 2024 = 1024 + 512 + 256 + 128 + 64 + 32 + 8; yani 2¹⁰, 2⁹, 2⁸, 2⁷, 2⁶, 2⁵ ve 2³ bitleri 1: 111 1110 1000. Dörtlü gruplarla onaltılık: 7 E 8 → 0x7E8.",
      "32 bite doldur: 0000 0000 0000 0000 0000 0111 1110 1000. Bu, +2024'tür; en soldaki bit 0 olduğundan pozitif.",
      "Bütün bitleri ters çevir: 1111 1111 1111 1111 1111 1000 0001 0111. Sonra 1 ekle: 1111 1111 1111 1111 1111 1000 0001 1000.",
      "Onaltılığa çevir: FFFF F818 → 0xFFFFF818. Baytlara ayır: FF, FF, F8, 18 → 255, 255, 248, 24. Sağlama: 2³² − 2024 = 4 294 967 296 − 2024 = 4 294 965 272 ve 0xFFFFF818 tam bu sayıdır.",
      "Sayfaya −2024 yaz. Two's Complement satırı 1111111111111111 ve 1111100000011000, Hexadecimal kutusu 0xFFFFF818, Byte Değerleri 255 · 255 · 248 · 24 göstermeli.",
    ],
    result:
      "−2024 = 0xFFFFF818 = 11111111 11111111 11111000 00011000. 'Ters çevir, bir ekle' kuralı her zaman 2³² − x ile aynı deseni verir; sayfadaki altı kutudan dördü bu deseni farklı tabanlarda yazar.",
  },
  misconceptions: [
    {
      myth: "İşlem hattı her komutu daha hızlı bitirir.",
      truth:
        "Tek bir komut yine beş döngü sürer; sayfada ADD'in girişinden kaybolmasına kadar beş adım say. Hızlanan, birim zamanda biten komut sayısıdır: ilk komut 5. döngüde biter ama sonrakiler her döngüde birer birer gelir. Gecikme aynı, verim beş kat.",
    },
    {
      myth: "Daha yüksek GHz her zaman daha hızlı bilgisayar demektir.",
      truth:
        "Toplam süre komut sayısı × komut başına döngü × döngü süresidir; saat yalnızca üçüncü çarpandır. 2004'teki 3,8 GHz'lik Pentium 4, bugünkü benzer hızlı çiplerden kat kat yavaştır: daha çok önbellek ıskası, daha az aynı anda iş. Bellek 100 ns beklerken saatin hızlı tik taklaması işe yaramaz.",
    },
    {
      myth: "Bilgisayar negatif sayıyı başına bir işaret biti koyarak saklar.",
      truth:
        "En soldaki bit işareti söyler ama 'işaret + büyüklük' değildir: −1, 1 000…0 değil, 32 tane 1'dir. İşaret-büyüklük gösteriminde iki tane sıfır olur ve çıkarma için ayrı devre gerekirdi. İkiye tümleyende tek bir toplama devresi hem toplar hem çıkarır; sayfaya −1 yazıp bak.",
    },
    {
      myth: "RAM ile depolama aynı şeydir; 'telefonumun 128 GB belleği var'.",
      truth:
        "128 GB çoğunlukla depolamadır (flash); RAM genellikle 4 ile 12 GB arasıdır ve güç kesilince silinir. Piramitte ikisi ayrı katmandır: RAM 100 ns, SSD 50 µs, aralarında 500 kat. Program açılırken olan şey, depolamadan RAM'e kopyalamaktır; o bekleyişi hissedersin.",
    },
  ],
  glossary: [
    { term: "Komut seti mimarisi (ISA)", definition: "İşlemcinin anladığı komutların, yazmaçların ve bit biçimlerinin sözleşmesi; x86, ARM ve RISC-V birer örnektir." },
    { term: "Saat döngüsü", definition: "İşlemcinin bütün aşamalarını eşzamanlayan tik; 5 GHz'de bir döngü 0,2 nanosaniyedir." },
    { term: "Yazmaç (register)", definition: "İşlemcinin içindeki, bir döngüde erişilen en hızlı ve en küçük bellek hücreleri; sayfadaki R1, R2 gibi." },
    { term: "Önbellek (cache)", definition: "Sık kullanılan verinin kopyasını işlemcinin yanında tutan küçük, hızlı SRAM katmanı (L1, L2, L3)." },
    { term: "Iska (cache miss)", definition: "Aranan verinin önbellekte bulunamaması; istek bir alt katmana iner ve gecikme katlanır." },
    { term: "Tehlike (hazard)", definition: "İşlem hattında bir komutun, önceki komutun henüz hazır olmayan sonucuna ya da bilinmeyen dallanma yönüne bağlı olması; hat bekler." },
    { term: "Veri yolu (bus)", definition: "İşlemci, bellek ve çevre birimleri arasında adres, veri ve kontrol sinyallerini taşıyan ortak hat." },
    { term: "İkiye tümleyen", definition: "Negatif sayıları 2ⁿ − x deseniyle gösteren yöntem; en soldaki bitin ağırlığı −2ⁿ⁻¹'dir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bilgisayar bir kara kutudur; lisansta kutuyu kapılardan başlayarak yeniden kurarsın. Bilgisayar mimarisi dersleri Patterson ve Hennessy'nin kitabı etrafında döner: önce bir ISA (bugün genellikle açık kaynak <strong>RISC-V</strong>) öğrenir, sonra sayfadaki beş aşamalı hattı gerçekten tasarlarsın. Burada tehlikeler rastgele değildir: <em>ileri besleme</em> ile sonucu yazmaca yazmadan EX'ten EX'e aktarır, <em>dallanma tahmini</em> ile 'if'in hangi yöne gideceğini önceden kestirirsin. Modern çekirdekler komutları sırasız yürütür, aynı anda yüzlerce komutu uçuşta tutar ve bunu yaparken programcıya her şey sırayla olmuş gibi görünmelidir.",
      "Bellek tarafında sanal bellek, sayfa tabloları ve TLB; çok çekirdekte önbellek tutarlılığı ve bellek modelleri; hızlanmanın sınırını veren Amdahl yasası. 2018'de açıklanan Spectre ve Meltdown saldırıları, dallanma tahmini ile önbelleğin birleşiminden sır sızdırılabildiğini gösterdi: mimari artık güvenlik dersidir de. GPU'lar ve SIMD birimleri ise aynı komutu binlerce veriye uygular; yapay sinir ağlarını eğiten şey bu mimaridir. 'Nand2Tetris' gibi dersler bütün bu yolu tek dönemde yürütür: tek bir NAND kapısından çalışan bir Tetris'e.",
    ],
    topics: ["RISC-V ve ISA tasarımı", "İleri besleme ve dallanma tahmini", "Sırasız yürütme", "Sanal bellek ve TLB", "Önbellek tutarlılığı", "Amdahl yasası", "Spectre ve Meltdown", "GPU ve SIMD"],
  },
  quiz: [
    {
      question: "Beş aşamalı bir işlem hattında, tehlike yoksa, sekiz komut kaç saat döngüsünde biter?",
      options: ["40 döngü", "13 döngü", "12 döngü", "8 döngü"],
      answer: 2,
      explanation: "k + n − 1 = 5 + 8 − 1 = 12. İlk komut 5. döngüde biter, kalan yedi komut her döngüde birer birer tamamlanır. Sırayla çalışsaydı 40 döngü sürerdi.",
    },
    {
      question: "8 bitlik ikiye tümleyen gösteriminde 11111110 hangi sayıdır?",
      options: ["254", "−2", "−126", "−1"],
      answer: 1,
      explanation: "En soldaki bit 1, sayı negatif. 2⁸ − 254 = 2, yani −2. Ya da bitleri ters çevir (00000001) ve 1 ekle: 2. −1 ise sekiz tane 1 olurdu.",
    },
    {
      question: "Önbellek, RAM'den çok daha küçük olduğu hâlde neden işe yarar?",
      options: ["Çünkü RAM'den daha büyük veri tutar", "Çünkü programlar az sayıda adrese tekrar tekrar erişir (yerellik)", "Çünkü ışık hızında çalışır", "Çünkü diskteki bütün verinin kopyasını saklar"],
      answer: 1,
      explanation: "Programlar aynı değişkenlere ve komşu adreslere kısa sürede yeniden dokunur. Küçük bir 'sıcak' küme isteklerin büyük çoğunluğunu karşılar; yüzde 98 isabetle ortalama erişim 100 ns'den 3 ns'ye iner.",
    },
  ],
  next: [
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "Hatta akan ADD, LW, SW komutlarının nereden geldiğini gör: C kodundan bitlere inen yol." },
    { href: "mantik-devresi.html", title: "Mantık Devresi Tasarımcısı", why: "Burada tek tek baktığın kapıları bağla; yarım toplayıcıyı gerçekten kur." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "Bellek adresi dediğimiz sayının program tarafındaki yüzü: yığın, öbek ve adres aritmetiği." },
    { href: "isletim-sistemleri-ve-linux.html", title: "İşletim Sistemleri ve Linux", why: "Aynı işlemciyi yüzlerce program nasıl paylaşır: bağlam değişimi ve sanal bellek." },
  ],
  sources: [
    { title: "Wikipedia · Von Neumann architecture", url: "https://en.wikipedia.org/wiki/Von_Neumann_architecture", note: "Saklı program fikri, EDVAC taslağı tartışması ve darboğaz (İngilizce)." },
    { title: "Wikipedia · Classic RISC pipeline", url: "https://en.wikipedia.org/wiki/Classic_RISC_pipeline", note: "Sayfadaki beş aşamanın (IF, ID, EX, MEM, WB) ayrıntısı; tehlikeler ve ileri besleme." },
    { title: "Wikipedia · Two's complement", url: "https://en.wikipedia.org/wiki/Two%27s_complement", note: "Negatif sayıların gösterimi, 'ters çevir, bir ekle' kuralı ve taşma." },
    { title: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", note: "'6.004 Computation Structures' dersini ara: kapılardan işlem hatlı bir işlemciye uzanan açık ders." },
  ],
  revision: "Ekim 2026",
};
