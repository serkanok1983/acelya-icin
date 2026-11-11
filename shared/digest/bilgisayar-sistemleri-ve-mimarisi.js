window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bilgisayar-sistemleri-ve-mimarisi"] = {
  slug: "bilgisayar-sistemleri-ve-mimarisi",
  title: "Bilgisayar Mimarisi: Bir Saat Döngüsünün İçi",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Telefonundaki çip saniyede milyarlarca kez tik tak eder ve her tikte bir komut bir adım ilerler. Von Neumann'ın 1945 taslağından işlem hattına, ikiye tümleyenden önbelleğe: makinenin içindeki düzen.",
  hook:
    "5 GHz'de çalışan bir işlemcide tek bir saat döngüsü 0.2 nanosaniye sürer; ışık bu sürede ancak 6 santimetre yol alır. Bu kadar dar bir aralığa 'topla', 'oku', 'karşılaştır' nasıl sığar? Ve 1948'de 128 baytlık belleğiyle çalışan ilk saklı programlı makine ile cebindeki telefonun aynı planı izlediğini biliyor muydun?",
  bigIdea:
    "Bir bilgisayar, komutları da veri gibi bellekte saklayan ve onları <strong>getir–çöz–çalıştır</strong> döngüsüyle teker teker işleyen bir makinedir; hızı, bu döngüyü işlem hattıyla üst üste bindirmekten ve belleği katmanlara ayırmaktan gelir.",
  story: [
    "1945 yazında Philadelphia'da ENIAC bitmek üzereydi: 17.468 vakum tüpü, yaklaşık 30 ton ağırlık, 150 kilovat güç, saniyede 5.000 toplama. Ama bir kusuru vardı: program makinenin belleğinde değil, kabloların ve anahtarların dizilişindeydi. Yeni bir problem için ekipler günlerce fiş takıp sökerdi. 30 Haziran 1945 tarihli, 101 sayfalık bir daktilo metni çözümü kâğıda döktü: <em>First Draft of a Report on the EDVAC</em>. Kapakta yalnızca John von Neumann'ın adı vardı; oysa tasarım, J. Presper Eckert ve John Mauchly ile aylarca süren tartışmalarda olgunlaşmıştı. Herman Goldstine bitmemiş taslağı çoğaltıp dağıtınca fikir kamuya mal oldu; bu erken dağıtım Eckert ile Mauchly'nin patent yolunu kapadı ve 'von Neumann mimarisi' adı o günden kaldı. Temel fikir şuydu: komut da bir sayıdır, veriyle yan yana aynı bellekte durur; işlemci onu getirir, çözer, çalıştırır ve bir sonrakine geçer. Bu düşünceyi ilk kez 21 Haziran 1948'de Manchester'daki 'Baby' adlı deneme makinesi gerçekten çalıştırdı: 32 kelimelik, toplam 1.024 bitlik belleğiyle 2<sup>18</sup>'in en büyük öz bölenini 52 dakikada buldu.",
    "Makinenin içindeki mantık daha da eskidir. George Boole 1854'te doğru ile yanlışı 1 ve 0'la hesaplanan bir cebire çevirdi; amacı düşünmenin yasalarını yazmaktı, aklında devre yoktu. 1937'de MIT'de 21 yaşındaki Claude Shannon yüksek lisans tezinde bu cebirin röle devrelerini tam olarak tarif ettiğini gösterdi: VE, VEYA, DEĞİL birer anahtar düzeneğiydi. Aralık 1947'de Bell Laboratuvarları'nda transistor çalıştı, 1958'de Jack Kilby ilk tümdevreyi yaptı. 1965'te Gordon Moore, en ucuza üretilen çiplerdeki bileşen sayısının her yıl kabaca ikiye katlandığını yazdı ve bunun on yıl daha süreceğini öngördü; 1975'te süreyi iki yıla çıkardı. Bir doğa yasası değil, bir sanayi gözlemi olan bu 'Moore yasası' yaklaşık yarım yüzyıl tuttu (sık anılan '18 ay' Moore'un kendi rakamı değildir). Kasım 1971'de duyurulan Intel 4004'te 2.300 transistor vardı ve saat hızı 740 kHz'di; 2020'deki Apple M1'de 16 milyar transistor var. Elli yılda yaklaşık yedi milyon kat.",
    "Transistor sayısı artınca soru 'bunları nasıl düzenleyelim' oldu. Fabrika hattı fikri, yani bir komut çalışırken bir sonrakini çözüp ondan sonrakini getirmek, 1961'deki IBM Stretch gibi erken makinelerde denendi. 1970'lerin ortasında IBM'de John Cocke'un 801 projesi, 1980'lerin başında da Berkeley'de David Patterson ile Stanford'da John Hennessy aynı sonuca vardı: az sayıda, basit ve sabit uzunluklu komut, hatta çok daha iyi akar. Bu felsefeye <strong>RISC</strong> adını Patterson'ın ekibi verdi. Sayfadaki beş aşamalı hat, Hennessy'nin MIPS tasarımının ders kitaplarına geçmiş hâlidir; ikisi 2017 Turing Ödülü'nü birlikte aldı. 1985'te Cambridge'deki küçük Acorn şirketinde Sophie Wilson ile Steve Furber'ın tasarladığı, yaklaşık 25.000 transistorlu ARM1 de aynı felsefenin çocuğudur; bugün telefonların neredeyse tamamında onun torunları çalışır.",
    "Sonra bir duvar çıktı. İşlemciler her yıl hızlanırken belleğin gecikmesi çok daha yavaş iyileşiyordu; 1995'te Wulf ve McKee buna 'bellek duvarı' adını verdi. Cevap, sayfadaki piramittir: sık kullanılan veriyi işlemcinin yanındaki küçük ama hızlı önbelleklerde tutmak. İkinci duvar ısıydı: 2004'te Pentium 4 3.8 GHz'e ulaştı; aradan geçen yirmi yılda saat hızları ancak 5–6 GHz dolayına çıkabildi, çünkü daha hızlı tik taklayan çip soğutulamıyor. Çözüm, tek hızlı çekirdek yerine çok sayıda çekirdek oldu. Bugün mimari demek, yavaş belleği gizlemek ve işi paylaştırmak demektir.",
  ],
  core: [
    {
      heading: "Saklı program: komut da bir sayıdır",
      body:
        "Bellekte 'veri' ile 'komut' diye iki ayrı madde yoktur; ikisi de bit dizisidir. Bir dizinin komut olması, işlemcinin ona komut gözüyle bakmasından ibarettir. <strong>Program sayacı</strong> (PC) adlı yazmaç sıradaki komutun adresini tutar; işlemci o adresten komutu getirir (IF), bitlerini çözüp hangi işlem ve hangi yazmaçlar olduğunu anlar (ID), aritmetik birimde hesaplar (EX), gerekiyorsa belleğe gider (MEM) ve sonucu yazmaca yazar (WB). Sayfadaki altı komut tam bu dili konuşur: <code>ADD R1,R2,R3</code> 'R2 ile R3'ü topla, R1'e yaz' demektir; <code>LW R6,0(R1)</code> 'R1'deki adresten bir kelime oku, R6'ya koy'; <code>SW R7,4(R2)</code> ise 'R7'yi R2 + 4 adresine yaz'. Von Neumann darboğazı da buradan çıkar: komut ve veri aynı yoldan geldiği için işlemci çoğu zaman hesaplamayı değil, belleği bekler.",
      formula: "getir → çöz → çalıştır,  PC ← PC + 4",
      formulaNote: "MIPS ve 32 bitlik RISC-V gibi klasik RISC makinelerinde her komut 4 bayttır; dallanma yoksa program sayacı her komutta 4 artar.",
    },
    {
      heading: "İşlem hattı: aynı anda beş komut",
      body:
        "Çamaşırhanede yıkama bitmeden kurutmayı başlatamazsın; ama ikinci partiyi yıkarken birincisini kurutabilirsin. İşlem hattı aynı numaradır: beş aşama birbirinden bağımsız donanımdır, bu yüzden her döngüde beş farklı komut beş farklı aşamada olabilir. Tek bir komut yine beş döngü sürer; değişen, birim zamanda biten komut sayısıdır. n komut, k aşamalı hatta k + (n − 1) döngüde biter: ilk komut hattı doldurur, sonrakiler her döngüde birer birer çıkar. Sırayla çalışmaya göre hızlanma S = n·k / (k + n − 1) olur; n = 6 için 30/10 = 3, n = 1000 için 4.98, n büyüdükçe k = 5'e yaklaşır ama onu geçemez. Hat her zaman dolu da kalamaz: <code>SUB R4,R1,R5</code>, bir önceki <code>ADD</code>'in R1'e yazacağı sonucu ister; sonuç hazır değilse hat bekler. Buna <strong>veri tehlikesi</strong> denir ve her bekleme döngüsü, komut başına döngü sayısını (CPI) 1'in üstüne iter.",
      formula: "Süre = N × CPI × t<sub>döngü</sub>,   CPI = 1 + (komut başına ortalama bekleme döngüsü)",
      formulaNote: "N komut sayısı, t döngü süresi. İdeal hatta CPI 1'dir; her beş komutta bir döngü bekleyen hatta 1.2 olur ve program yüzde 20 uzar.",
    },
    {
      heading: "Bellek piramidi ve yerellik",
      body:
        "Sayfadaki piramitte yazmaçtan diske inerken kapasite büyür, gecikme patlar: L1 için 1 ns, L2 için 4 ns, L3 için 12 ns, RAM için 100 ns, SSD için 50 µs, HDD için 5 ms (hepsi mertebe değerleridir). İnsan ölçeğine çevir: 1 nanosaniye 1 saniye olsaydı L2'ye 4 saniyede, L3'e 12 saniyede, RAM'e yaklaşık 2 dakikada, SSD'ye 14 saatte, HDD'ye ise 58 günde ulaşırdın. İşlemci bu bekleyişi nasıl gizler? Programlar <strong>yerellik</strong> gösterir: az önce dokunduğu veriye ve onun komşularına yine dokunur. Önbellek bu küçük 'sıcak' kümeyi işlemcinin yanında tutar. Her istek önce L1'e sorulur; orada bulunursa isabet, bulunmazsa ıska. Ortalama erişim süresi bir beklenen değerdir: her erişim isabet süresini öder, ıskalayanlar üstüne cezayı ekler. Katmanlar iç içe hesaplanır: L1'de yüzde 5, L2'de yüzde 20, L3'te yüzde 10 ıska varsayarsan 1 + 0.05 × (4 + 0.20 × (12 + 0.10 × 100)) = 1.42 ns bulursun; RAM'in 100 nanosaniyesi ortalamada neredeyse görünmez olur.",
      formula: "t<sub>ort</sub> = t<sub>isabet</sub> + (ıska oranı) × (ıska cezası)",
      formulaNote: "Tek katman için: 1 ns + 0.02 × 100 ns = 3 ns. İsabet oranı yüzde 98'den 90'a düşerse 11 ns: oran az değişir, süre neredeyse dört katına çıkar.",
    },
    {
      heading: "Eksi işareti olmayan negatif sayılar",
      body:
        "Makinenin elinde yalnızca 32 kutu ve her kutuda 0 ya da 1 var; 'eksi' diye bir simge yok. Çözüm, bir kilometre sayacının geriye dönmesine benzer: 32 bitte 0'dan bir geri gidersen 2<sup>32</sup> − 1'e, yani 32 tane 1'e gelirsin. Bu desen −1'dir. Genel kural: −x, 2<sup>32</sup> − x ile aynı bitleri taşır; pratikte bitleri ters çevirip 1 eklersin. Bu <strong>ikiye tümleyen</strong> gösteriminin güzelliği, toplama devresinin işaretten habersiz çalışmasıdır: 5 + (−3) için devre 5 ile 4 294 967 293'ü toplar, 33. bite taşan elde düşer, geriye 2 kalır. En soldaki bitin ağırlığı +2<sup>31</sup> değil −2<sup>31</sup>'dir; o bit 1 ise sayı negatiftir. Bedeli <strong>taşmadır</strong>: aynı işaretli iki sayının toplamı ters işaretli çıkıyorsa sonuç kutuya sığmamıştır. Sekiz bitte 127 + 1 = 01111111 + 00000001 = 10000000, yani −128. Sayfanın 32-bit Two's Complement kutusu bu deseni gösterir.",
      formula: "−x ≡ 2<sup>32</sup> − x  (mod 2<sup>32</sup>)",
      formulaNote: "32 bitlik işaretli aralık: −2 147 483 648'den +2 147 483 647'ye. Üst sınırı 1 artırırsan en alt sınıra düşersin.",
    },
    {
      heading: "Kapılardan toplayıcıya",
      body:
        "Sayfadaki yedi kapı birer doğruluk tablosudur; aritmetik bunların birleşiminden çıkar. İki biti topla: 0+0=0, 0+1=1, 1+0=1, 1+1=10. Sonucun sağ basamağı tam olarak XOR'un tablosudur, sol basamağı (elde) ise AND'inkidir. İki kapı, bir <strong>yarım toplayıcı</strong>. Bir önceki basamaktan gelen eldeyi de hesaba katan <strong>tam toplayıcıyı</strong> 32 kez yan yana dizersen sayfadaki 32 bitlik sayıları toplayan devreyi elde edersin; işlemcinin EX aşamasında olan şey budur. Bu en yalın tasarımda elde bir basamaktan ötekine dalga gibi yürür; gecikme bit sayısıyla doğru orantılıdır ve saat döngüsünün ne kadar kısalabileceğini belirleyen yollardan biridir. NAND'ın 'fonksiyonel olarak tam' olması da burada anlam kazanır: NOT, iki girişi birleştirilmiş bir NAND'dır; AND, bir NAND'ın ardına NOT; OR, girişleri tersinmiş bir NAND. Tek bir kapı türünden her devre, dolayısıyla her bilgisayar kurulabilir.",
      formula: "S = A ⊕ B ⊕ C<sub>giriş</sub>,   C<sub>çıkış</sub> = A·B + C<sub>giriş</sub>·(A ⊕ B)",
      formulaNote: "⊕ XOR, · AND, + OR. C<sub>giriş</sub> = 0 alırsan yarım toplayıcı kalır: toplam A ⊕ B, elde A·B.",
    },
  ],
  lab: {
    intro:
      "Sayfada yedi bölüm var; en üstteki Von Neumann şeması dışında hepsi etkileşimli. <strong>CPU İşlem Hattı</strong>: '1 Saat Döngüsü', 'Otomatik' (600 ms'de bir adım) ve 'Sıfırla' düğmeleri; üstteki beş kutu o anda her aşamada duran komutun adını, alttaki kayıt her döngünün satırını gösterir. <strong>Bellek Hiyerarşisi</strong>: yedi katmana tıklayınca ayrıntı kutusu dolar. <strong>Sayı Sistemleri Dönüştürücü</strong>: tek bir metin kutusu (açılışta 2024; 0b, 0x, 0o önekleri ve eksi işareti kabul edilir) ve altı sonuç kutusu; yazarken anında dönüşür. <strong>Mantık Kapıları</strong>: yedi kapı kartı ve tıklanınca 0/1 değişen giriş kutuları. <strong>Veri Yapıları</strong>: Stack, Queue, Linked List, Binary Tree sekmeleri ile 'Ekle', 'Çıkar', 'Sıfırla' düğmeleri; dört sekme aynı sayı dizisini paylaşır. En alttaki on iki kavram kartı tıklanınca açıklamasını gösterir.",
    experiments: [
      {
        title: "Altı komut kaç saat döngüsü sürer?",
        predict:
          "Her komut beş aşamadan geçiyorsa altı komut sırayla 30 döngü alırdı. İşlem hattıyla son komut WB'ye kaçıncı döngüde varır: 30 mu, 10 mu, 6 mı? Kayıtta kırmızı bir hücre görürsen bu sayı nasıl değişir?",
        do: "'Sıfırla'ya bas, sonra '1 Saat Döngüsü'ne teker teker bas. Her basışta beş kutudaki komut adlarını ve kayda eklenen satırı izle. OR komutunun WB kutusuna girdiği döngüyü ve o ana kadar çıkan kırmızı hücreleri say; denemeyi birkaç kez yinele.",
        observe:
          "Kırmızı hücre çıkmazsa: 2. döngüde ADD ID'ye geçerken SUB IF'e girer; 5. ve 6. döngülerde beş kutu da doludur; 7. döngüden başlayarak hat soldan boşalır ve OR 10. döngüde WB'dedir (11. basışta bütün kutular '—' olur). Her kırmızı EX hücresi, IF kutusunu bir döngü boş bırakır ve OR'un WB'ye varışını bir döngü geciktirir: bir kırmızıyla 11, iki kırmızıyla 12. Denemelerin kabaca yarısı hiç kırmızısız biter.",
        explain:
          "k + n − 1 = 5 + 6 − 1 = 10. Hat dolunca her döngüde bir komut biter; ilk komutun dört döngülük 'doldurma' bedeli yalnızca bir kez ödenir. Hızlanma 30/10 = 3'tür. Dürüst bir not: sayfa tehlikeyi zar atarak canlandırır (uygun her döngüde yüzde 15 olasılık) ve yalnızca yeni komut alımını bir döngü erteler. Gerçek işlemcide tehlike rastgele değildir; hangi komutun hangisini beklediği yazmaç adlarından okunur. Bu altı komutun gerçek hesabı çözümlü örnekte.",
      },
      {
        title: "Dört yüzü olan sayı: 2024 ve −2024",
        predict:
          "2024'ün onaltılığı kaç basamaktır? 'Byte Değerleri' satırında hangi dört sayı çıkar? −2024 yazınca sayfa bir eksi işareti mi gösterir, yoksa bambaşka bir desen mi?",
        do: "Kutudaki 2024'ü olduğu gibi bırak ve altı kutuyu oku. Sonra sırayla 255, 256, −1 ve −2024 yaz; 'Dönüştür'e basmana gerek yok, yazarken dönüşür.",
        observe:
          "2024 → 0x7E8, 0o3750, 11111101000 ve baytlar 0 · 0 · 7 · 232 (Decimal kutusu sayıyı binlik ayırıcıyla, 2.024 diye yazar). 255 → 0xFF ve sekiz bitlik 11111111; 256 → 0x100 ve dokuz bitlik 100000000. −1 → 32 tane 1, 0xFFFFFFFF, baytlar 255 · 255 · 255 · 255. −2024 → 0xFFFFF818; Two's Complement kutusunda iki satır 1111111111111111 ve 1111100000011000; baytlar 255 · 255 · 248 · 24. Decimal kutusu dışında hiçbir yerde eksi işareti yok, ama en soldaki bit 1.",
        explain:
          "7 × 256 + 232 = 2024; her onaltılık basamak dört bittir ve bayt satırı onaltılığı ikişer basamak okur: 00 00 07 E8. Negatif için makine 2<sup>32</sup> − x hesaplar: 4 294 967 296 − 2024 = 4 294 965 272 = 0xFFFFF818. Elle sağlaması: 2024 = 0000…0111 1110 1000; bitleri ters çevir (1111…1000 0001 0111), 1 ekle (1111…1000 0001 1000), dörtlü gruplarla oku: F818.",
      },
      {
        title: "NAND'den DEĞİL, XOR'dan toplama",
        predict:
          "NAND kartında iki girişi de aynı yaparsan (00 ve 11) çıkışlar NOT'un tablosuna benzer mi? 1 + 1 işlemini yalnızca XOR ve AND ile nasıl yazarsın?",
        do: "NAND kartına tıkla; alttaki iki giriş kutusunu tıklayarak 00 ve 11 yap, çıkışı oku. Sonra XOR kartına geç ve dört giriş çiftini (00, 01, 10, 11) dene; aynı dört çifti AND kartında tekrarla. Kart değiştirdiğinde girişler olduğu gibi kalır.",
        observe:
          "NAND: 00 → 1, 11 → 0; tam NOT'un tablosu. XOR: 01 → 1, 10 → 1, 00 ve 11 → 0. AND yalnız 11 → 1. Girişler 1 ve 1 iken XOR 0, AND 1 verir; ikisini yan yana yazınca '10', yani ikilikte 2.",
        explain:
          "İki girişi birleştirilmiş NAND bir DEĞİL kapısıdır; bu yüzden tek kapı türüyle her devre kurulabilir. XOR 'toplamın sağ basamağı', AND 'elde' olduğundan ikisi birlikte yarım toplayıcıdır. Sayfa tek seferde bir kapı gösterir; iki tabloyu kâğıtta yan yana yaz ve üçüncü bir sütuna A + B'yi ikilik olarak ekle: üç sütun satır satır tutar.",
      },
      {
        title: "Aynı beş sayı, dört farklı düzen",
        predict:
          "'Sıfırla'dan sonra dizi 42, 17, 93, 8, 56'dır. Stack sekmesinde 'Çıkar' hangi sayıyı siler? Queue sekmesinde hangisini? Binary Tree sekmesinde kökte hangi sayı durur ve 56 kimin çocuğudur?",
        do: "'Sıfırla'ya bas ve Binary Tree sekmesindeki biçimi incele. Stack sekmesine geçip bir kez 'Çıkar'a bas; Queue sekmesine geçip bir kez daha 'Çıkar'. Linked List sekmesine bak. Son olarak 'Sıfırla'ya bas, Queue sekmesinde 'Ekle'ye sekiz kez bas ve FRONT etiketli kutu ile alttaki eleman sayısını izle.",
        observe:
          "Ağaçta kök 42; solunda 17, sağında 93; 8, 17'nin sol çocuğu, 56 ise 93'ün sol çocuğu. Stack'te TOP etiketli 56 gider, Queue'da FRONT etiketli 42 gider; kalan 17 → 93 → 8 dizisi bağlı listede HEAD'den başlayarak okunur. Yedinci 'Ekle'de sayaç 12'ye ulaşır; sekizincide 12'de kalır ve FRONT'taki 42'nin yerini 17 alır.",
        explain:
          "LIFO ile FIFO aynı diziyi iki ayrı uçtan tüketir. Sayfa ağacı, diziyi sıralayıp ortadakini kök yaparak kurar: 8 17 42 56 93 → kök 42, sol yarının kökü 17, sağ yarının kökü 93. Böyle kurulan ağaç hep dengelidir; n düğümde arama en çok log<sub>2</sub>(n) + 1 adım sürer. Sayıları geliş sırasıyla ekleyen gerçek bir ikili arama ağacı ise sıralı gelen veride tek kola uzar ve arama n adıma çıkar. On iki sınırı çizim alanı içindir: gerçek bir yığın dolunca taşma hatası verir, en eski elemanı sessizce atmaz.",
      },
    ],
  },
  wow: [
    {
      title: "128 baytlık bellekle 52 dakika",
      body:
        "21 Haziran 1948'de Manchester'daki 'Baby', programı kendi belleğinde saklayan ilk elektronik bilgisayar olarak çalıştı. Belleği 32 kelime × 32 bit, yani 1.024 bit: 128 bayt, 128 harflik kısa bir mesaj kadar. 17 komutluk ilk program 262.144'ün en büyük öz bölenini aradı ve yaklaşık 3.5 milyon işlem, 52 dakika sonra 131.072'yi buldu. 8 GB belleği olan bir telefon ondan 67 milyon kat fazlasını taşır.",
    },
    {
      title: "Işığın bir döngüde gidebildiği yol: 6 santimetre",
      body:
        "Işık bir nanosaniyede yaklaşık 30 santimetre gider. 5 GHz'lik bir döngü 0.2 nanosaniyedir: 6 santimetre. Çipin kenarı bir iki santimetredir, ama içindeki tellerde sinyal ışıktan çok daha yavaş ilerler ve bir döngüde art arda dizili pek çok kapıdan geçmek zorundadır. Aynı ölçekle bak: RAM'in 100 nanosaniyesi 500 döngülük bir bekleyiştir. Önbelleğin neden şart olduğunu bu tek sayı anlatır.",
    },
    {
      title: "19 Ocak 2038, saat 03:14:07",
      body:
        "Pek çok sistem zamanı 1 Ocak 1970'ten beri geçen saniye olarak 32 bitlik işaretli bir sayıda tutar. O sayı 2 147 483 647'ye, yani 0x7FFFFFFF'e 19 Ocak 2038'de 03:14:07 UTC'de ulaşır. Bir saniye sonra en soldaki bit 1 olur ve sayı −2 147 483 648'e, yani 13 Aralık 1901'e düşer. Sayfaya 2147483647 yazıp Two's Complement kutusuna bak; ardından 2147483648'i dene: satırın başında beliren 1, bu sorunun ta kendisidir.",
    },
  ],
  worked: {
    title: "Sayfadaki altı komut gerçek bir hatta kaç döngü sürer?",
    prompt:
      "Sayfanın programı: ADD R1,R2,R3 · SUB R4,R1,R5 · LW R6,0(R1) · SW R7,4(R2) · AND R8,R3,R4 · OR R9,R5,R6. Beş aşamalı hatta (a) hiç tehlike olmasaydı, (b) ileri besleme yokken, (c) ileri besleme varken kaç döngü sürer? Saat 5 GHz ise süreleri bul; LW önbelleği ıskalayıp RAM'e (100 ns) giderse ne olur? Varsayım: yazmaç dosyası döngünün ilk yarısında yazar, ikinci yarısında okur.",
    steps: [
      "(a) İdeal hat: k + n − 1 = 5 + 6 − 1 = 10 döngü. Sırayla çalışma 6 × 5 = 30 döngü olurdu; hızlanma 3.",
      "(b) Bağımlılıkları bul. SUB, ADD'in yazdığı R1'i okur. ADD: IF 1, ID 2, EX 3, MEM 4, WB 5; R1 ancak 5. döngüde yazmaca yazılır. SUB normalde 3. döngüde ID'dedir; R1'i okuyabilmek için ID'de 5. döngüye kadar beklemelidir: 2 boş döngü. LW de R1'i okur ama SUB'ın arkasında beklediği için ID'ye 6. döngüde varır; R1 çoktan yazılmıştır.",
      "Geri kalanları denetle. Gecikmeli çizelge: SUB WB 8, LW WB 9, SW WB 10, AND ID 8 ve WB 11, OR ID 9 ve WB 12. AND, SUB'ın R4'ünü 8. döngüde okur; SUB tam o döngüde yazar ve varsayımımız gereği okuma yetişir. OR, LW'nin R6'sını 9. döngüde aynı biçimde yakalar. Başka bekleme yok: toplam 10 + 2 = 12 döngü, bu program için CPI = 12/6 = 2.",
      "(c) İleri besleme: ADD'in sonucu 3. döngünün sonunda aritmetik birimin çıkışında hazırdır; yazmaca yazılması beklenmeden 4. döngüde SUB'ın EX girişine kısa yoldan verilir. Bekleme sıfırlanır: 10 döngü. (LW'nin hemen ardından gelen komut R6'yı isteseydi, veri MEM sonunda geldiği için ileri beslemeyle bile 1 döngü kalırdı; burada araya iki komut girdiğinden gerekmez.)",
      "Süre: 5 GHz'de bir döngü 0.2 ns. (a) ve (c) 10 × 0.2 = 2.0 ns, (b) 12 × 0.2 = 2.4 ns. LW ıskalarsa 100 ns / 0.2 ns = 500 döngü bekler: 10 + 500 = 510 döngü, yani 102 ns. Tek bir ıska, programın geri kalanının tamamından 50 kat pahalıdır.",
    ],
    result:
      "İdeal 10 döngü (2.0 ns), ileri beslemesiz 12 döngü (2.4 ns), ileri beslemeyle yine 10; tek bir RAM ıskası ise 510 döngü (102 ns). Hattın inceliği yüzde 20'lik, belleğin davranışı 50 katlık fark yaratır; mimarların emeğinin büyük kısmı bu yüzden önbelleğe gider.",
  },
  misconceptions: [
    {
      myth: "İşlem hattı her komutu daha hızlı bitirir.",
      truth:
        "Tek bir komut yine beş döngü sürer; sayfada ADD'in IF'e girişinden WB'ye varışına kadar beş adım say. Hızlanan, birim zamanda biten komut sayısıdır: ilk komut 5. döngüde biter ama sonrakiler her döngüde birer birer gelir. Gecikme aynı kalır, verim en çok beş katına çıkar.",
    },
    {
      myth: "Daha yüksek GHz her zaman daha hızlı bilgisayar demektir.",
      truth:
        "Toplam süre komut sayısı × komut başına döngü × döngü süresidir; saat yalnızca üçüncü çarpandır. 2004'ün 3.8 GHz'lik Pentium 4'ü, bugün benzer saat hızında çalışan bir çekirdekten kat kat yavaştır: her döngüde daha az iş bitirir, belleği daha çok bekler. Bellek 100 ns beklerken saatin hızlı tik taklaması işe yaramaz.",
    },
    {
      myth: "Bilgisayar negatif sayıyı başına bir işaret biti koyarak saklar.",
      truth:
        "En soldaki bit işareti söyler ama gösterim 'işaret + büyüklük' değildir: −1, 1000…01 değil, 32 tane 1'dir. İşaret-büyüklük gösteriminde iki ayrı sıfır olurdu ve çıkarma için ayrı devre gerekirdi. İkiye tümleyende tek bir toplama devresi hem toplar hem çıkarır; sayfaya −1 yazıp bak.",
    },
    {
      myth: "RAM ile depolama aynı şeydir; 'telefonumun 128 GB belleği var'.",
      truth:
        "128 GB çoğunlukla depolamadır (flash); RAM genellikle 4 ile 12 GB arasıdır ve güç kesilince silinir. Piramitte ikisi ayrı katmandır: RAM 100 ns, SSD 50 µs, aralarında 500 kat. Bir uygulama açılırken olan şey, depolamadan RAM'e kopyalamaktır; o bekleyişi hissedersin.",
    },
  ],
  glossary: [
    { term: "Komut seti mimarisi (ISA)", definition: "İşlemcinin anladığı komutların, yazmaçların ve bit biçimlerinin sözleşmesi; x86-64, ARM ve RISC-V birer örnektir." },
    { term: "Saat döngüsü", definition: "İşlemcinin bütün aşamalarını eşzamanlayan tik; 5 GHz'de bir döngü 0.2 nanosaniyedir." },
    { term: "Yazmaç (register)", definition: "İşlemcinin içindeki, tek döngüde okunup yazılan en hızlı ve en küçük bellek hücresi; sayfadaki R1, R2 gibi." },
    { term: "CPI", definition: "Komut başına ortalama saat döngüsü sayısı; ideal işlem hattında 1'dir, beklemeler ve ıskalar onu büyütür." },
    { term: "Önbellek (cache)", definition: "Sık kullanılan verinin kopyasını işlemcinin yanında tutan küçük, hızlı SRAM katmanı (L1, L2, L3)." },
    { term: "Iska (cache miss)", definition: "Aranan verinin önbellekte bulunamaması; istek bir alt katmana iner ve o katmanın gecikmesi cezaya eklenir." },
    { term: "Tehlike (hazard)", definition: "İşlem hattında bir komutun, önceki komutun henüz hazır olmayan sonucuna ya da henüz belli olmayan dallanma yönüne bağlı olması." },
    { term: "İkiye tümleyen", definition: "n bitte −x'i 2ⁿ − x deseniyle gösteren yöntem; en soldaki bitin ağırlığı −2ⁿ⁻¹'dir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bilgisayar bir kara kutudur; lisansta kutuyu kapılardan başlayarak yeniden kurarsın. <strong>Sayısal Tasarım</strong> (mantık devreleri) dersinde toplayıcıdan yazmaca, sonlu durum makinesine çıkarsın; <strong>Bilgisayar Organizasyonu ve Mimarisi</strong> dersi ise çoğu yerde Patterson ile Hennessy'nin kitabı etrafında döner: önce bir ISA (bugün genellikle açık <strong>RISC-V</strong>) öğrenir, sonra sayfadaki beş aşamalı hattı gerçekten tasarlarsın. Çözümlü örnekteki hesap o dersin ilk sınav sorusudur. Orada tehlikeler elle izlenir: <em>ileri besleme</em> ile sonucu yazmaca yazmadan EX'e aktarır, <em>dallanma tahmini</em> ile 'if'in hangi yöne gideceğini önceden kestirirsin. Modern çekirdekler komutları sırasız yürütür, aynı anda yüzlerce komutu uçuşta tutar ve bunu yaparken programcıya her şey sırayla olmuş gibi görünmelidir.",
      "Bellek tarafında önbelleğin iç düzeni (doğrudan eşlemeli, kümeli), sanal bellek, sayfa tabloları ve TLB; çok çekirdekte önbellek tutarlılığı; hızlanmanın sınırını veren Amdahl yasası gelir: işin yalnızca p kesri hızlandırılabiliyorsa toplam kazanç 1 / (1 − p)'yi geçemez. Sayı tarafında ikiye tümleyenin yanına IEEE 754 kayan nokta eklenir; 0.1 + 0.2'nin neden 0.30000000000000004 çıktığını orada hesaplarsın. Ocak 2018'de açıklanan Spectre ve Meltdown saldırıları, dallanma tahmini ile önbelleğin birleşiminden sır sızdırılabildiğini gösterdi: mimari artık bir güvenlik dersidir de. 'Nand2Tetris' gibi dersler bütün bu yolu tek dönemde yürütür: tek bir NAND kapısından çalışan bir Tetris'e.",
    ],
    topics: ["RISC-V ve ISA tasarımı", "İleri besleme ve dallanma tahmini", "Sırasız yürütme", "Önbellek düzeni, sanal bellek ve TLB", "Amdahl yasası", "IEEE 754 kayan nokta", "Spectre ve Meltdown", "GPU ve SIMD"],
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
      explanation: "En soldaki bit 1, sayı negatif. 2⁸ − 254 = 2, yani −2. Ya da bitleri ters çevir (00000001) ve 1 ekle: 2. −1 sekiz tane 1 olurdu; −126 ise işaret-büyüklük gösterimiyle okuyanın düştüğü tuzaktır.",
    },
    {
      question: "L1 isabet süresi 1 ns, ıska cezası 100 ns. Iska oranı yüzde 2'den yüzde 4'e çıkarsa ortalama erişim süresi ne olur?",
      options: ["Değişmez; isabet süresi aynıdır", "3 ns'den 5 ns'ye çıkar", "3 ns'den 6 ns'ye, tam iki katına çıkar", "2 ns'den 4 ns'ye çıkar"],
      answer: 1,
      explanation: "t = 1 + 0.02 × 100 = 3 ns ve 1 + 0.04 × 100 = 5 ns. Iska oranı iki katına çıkar ama süre iki katına çıkmaz, çünkü 1 ns'lik isabet süresi her erişimde ödenen sabit paydır. Yine de yüzde 2'lik bir fark erişimi yüzde 67 yavaşlatır; yerelliği bozan bir program bunu hemen hisseder.",
    },
  ],
  next: [
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "Hatta akan ADD, LW, SW gibi komutların gerçek bir işlemcideki karşılığı: x86-64 byte'ları, yazmaçlar ve C kodundan bitlere inen yol." },
    { href: "mantik-kapilari.html", title: "Mantık Kapıları Laboratuvarı", why: "Burada tek tek baktığın kapıları birleştir: yarım toplayıcının tablosunu çıkar, dört bitlik toplayıcıda eldenin basamaktan basamağa yürüyüşünü izle." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "Bellek adresi dediğimiz sayının program tarafındaki yüzü: yığın, öbek, adres aritmetiği ve baytların sırası." },
    { href: "isletim-sistemleri-ve-linux.html", title: "İşletim Sistemleri ve Linux", why: "Aynı işlemciyi yüzlerce programın nasıl paylaştığını gör: süreçler, zamanlayıcı ve çekirdek ile kullanıcı alanı ayrımı." },
  ],
  sources: [
    { title: "Wikipedia · Von Neumann architecture", url: "https://en.wikipedia.org/wiki/Von_Neumann_architecture", note: "Saklı program fikri, EDVAC taslağının yazarlık tartışması ve darboğaz (İngilizce)." },
    { title: "Wikipedia · Classic RISC pipeline", url: "https://en.wikipedia.org/wiki/Classic_RISC_pipeline", note: "Sayfadaki beş aşamanın (IF, ID, EX, MEM, WB) ayrıntısı; veri tehlikeleri ve ileri besleme (İngilizce)." },
    { title: "Wikipedia · Two's complement", url: "https://en.wikipedia.org/wiki/Two%27s_complement", note: "Negatif sayıların gösterimi, 'ters çevir, bir ekle' kuralı ve taşma (İngilizce)." },
    { title: "MIT OCW · 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", note: "Kapılardan işlem hatlı bir işlemciye ve önbelleğe uzanan açık lisans dersi; videolar ve çalışma kâğıtları (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
