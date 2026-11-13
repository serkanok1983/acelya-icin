window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bilgisayar-sistemleri-ve-mimarisi"] = {
  slug: "bilgisayar-sistemleri-ve-mimarisi",
  title: "Bilgisayar Mimarisi: Bir Saat Çevriminin İçi",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Bir komut bitlerle başlar, saat çevrimleriyle biter. İkiye tümleyen ve kayan nokta, beş aşamalı boru hattı, önbellek ve Amdahl yasası: dört deneyde sayfanın saydığını kuramın söylediğiyle karşılaştır.",
  hook:
    "5 GHz'de çalışan bir işlemcide tek bir saat çevrimi 0,2 nanosaniye sürer; ışık bu sürede ancak 6 santimetre yol alır. Bu kadar dar bir aralıkta toplama yapabilen makine, 0,1 ile 0,2'yi toplayınca neden 0,3 bulamaz? Ve saati yüzde 50 hızlanan bir işlemci nasıl olur da ancak yüzde 25 hızlı çıkar?",
  bigIdea:
    "Bir bilgisayar, komutları da veri gibi bellekte saklayan ve onları <strong>getir–çöz–çalıştır</strong> döngüsüyle işleyen bir makinedir; hızını saatin tik sayısı tek başına değil, kaç komut gerektiği, her komutun kaç çevrim tuttuğu ve belleğin ne kadar beklettiği birlikte belirler.",
  story: [
    "1945 yazında Philadelphia'da ENIAC bitmek üzereydi: 17 468 vakum tüpü, yaklaşık 30 ton ağırlık, 150 kilovat güç, saniyede 5000 toplama. Ama bir kusuru vardı: program makinenin belleğinde değil, kabloların ve anahtarların dizilişindeydi. Yeni bir problem için ekipler günlerce fiş takıp sökerdi. 30 Haziran 1945 tarihli, 101 sayfalık bir daktilo metni çözümü kâğıda döktü: <em>First Draft of a Report on the EDVAC</em>. Kapakta yalnızca John von Neumann'ın adı vardı; oysa tasarım, J. Presper Eckert ve John Mauchly ile aylarca süren tartışmalarda olgunlaşmıştı. Herman Goldstine bitmemiş taslağı çoğaltıp dağıtınca fikir kamuya mal oldu; bu erken dağıtım, fikri kamuya açıklanmış saydırarak Eckert ile Mauchly'nin EDVAC için patent yolunu kapadı ve 'von Neumann mimarisi' adı o günden kaldı. Temel fikir şuydu: komut da bir sayıdır, veriyle yan yana aynı bellekte durur; işlemci onu getirir, çözer, çalıştırır ve bir sonrakine geçer. Bu düşünceyi ilk kez 21 Haziran 1948'de Manchester'daki 'Baby' adlı deneme makinesi gerçekten çalıştırdı: 32 kelimelik, toplam 1024 bitlik belleğiyle 2<sup>18</sup>'in en büyük öz bölenini 52 dakikada buldu.",
    "Makinenin içindeki mantık daha da eskidir. George Boole 1854'te doğru ile yanlışı 1 ve 0'la hesaplanan bir cebire çevirdi; amacı düşünmenin yasalarını yazmaktı, aklında devre yoktu. 1937'de MIT'de 21 yaşındaki Claude Shannon yüksek lisans tezinde bu cebirin röle devrelerini tam olarak tarif ettiğini gösterdi: VE, VEYA, DEĞİL birer anahtar düzeneğiydi. Aralık 1947'de Bell Laboratuvarları'nda transistor çalıştı, 1958'de Jack Kilby ilk tümdevreyi yaptı. 1965'te Gordon Moore, en ucuza üretilen çiplerdeki bileşen sayısının her yıl kabaca ikiye katlandığını yazdı ve bunun on yıl daha süreceğini öngördü; 1975'te süreyi iki yıla çıkardı. Bir doğa yasası değil, bir sanayi gözlemi olan bu 'Moore yasası' yaklaşık yarım yüzyıl tuttu (sık anılan '18 ay' Moore'un kendi rakamı değildir). Kasım 1971'de duyurulan Intel 4004'te 2300 transistor vardı ve saat hızı 740 kHz'di; 2020'deki Apple M1'de 16 milyar transistor var. Elli yılda yaklaşık yedi milyon kat.",
    "Transistor sayısı artınca soru 'bunları nasıl düzenleyelim' oldu. Fabrika hattı fikri, yani bir komut çalışırken bir sonrakini çözüp ondan sonrakini getirmek, 1961'deki IBM Stretch gibi erken makinelerde denendi. 1970'lerin ortasında IBM'de John Cocke'un 801 projesi, 1980'lerin başında da Berkeley'de David Patterson ile Stanford'da John Hennessy aynı sonuca vardı: az sayıda, basit ve sabit uzunluklu komut, hatta çok daha iyi akar. Bu felsefeye <strong>RISC</strong> adını Patterson'ın ekibi verdi. Sayfadaki beş aşamalı boru hattı, Hennessy'nin MIPS tasarımının ders kitaplarına geçmiş hâlidir; ikisi 2017 Turing Ödülü'nü birlikte aldı. 1985'te Cambridge'deki küçük Acorn şirketinde Sophie Wilson ile Steve Furber'ın tasarladığı, yaklaşık 25 000 transistorlu ARM1 de aynı felsefenin çocuğudur; bugün telefonların neredeyse tamamında onun torunları çalışır.",
    "Sonra bir duvar çıktı. İşlemciler her yıl hızlanırken belleğin gecikmesi çok daha yavaş iyileşiyordu; 1995'te Wulf ve McKee buna 'bellek duvarı' adını verdi. Cevap önbellek oldu: sık kullanılan veriyi işlemcinin yanındaki küçük ama hızlı belleklerde tutmak. Sayfanın üçüncü sekmesi bunun tek katmanlı bir modelidir. İkinci duvar ısıydı: 2004'te Pentium 4 3,8 GHz'e ulaştı; aradan geçen yirmi yılda saat hızları ancak 5–6 GHz dolayına çıkabildi, çünkü daha hızlı tik taklayan çip soğutulamıyor. Çözüm, tek hızlı çekirdek yerine çok sayıda çekirdek oldu; onun da bir sınırı var ve dördüncü sekmedeki Amdahl yasası bu sınırı verir. Bugün mimari demek, yavaş belleği gizlemek ve işi paylaştırmak demektir.",
  ],
  core: [
    {
      heading: "İkiye tümleyen: aynı devre, iki okuma",
      body:
        "Makinenin elinde n kutu ve her kutuda 0 ya da 1 var; 'eksi' diye bir simge yok. Çözüm bir kilometre sayacının geriye dönmesine benzer: 8 bitte 0'dan bir geri gidersen 11111111'e gelirsin; bu desen işaretsiz okununca 255, işaretli okununca −1'dir. Genel kural: −x, 2<sup>n</sup> − x ile aynı bitleri taşır; pratikte bitleri ters çevirip 1 eklersin. <strong>İkiye tümleyenin</strong> güzelliği, toplama devresinin işaretten habersiz çalışmasıdır: sayfadaki dalgalı elde toplayıcısı iki okuma için de aynı bitleri üretir. Sonucun sığmadığını iki ayrı bayrak haber verir. <strong>Elde C</strong>, en soldaki bitten çıkan eldedir; işaretsiz okumanın taştığını söyler. <strong>Taşma V</strong>, en soldaki bite giren elde ile oradan çıkan eldenin farklı olmasıdır; işaretli okumanın taştığını söyler. Sayfanın açılışındaki 100 + 50, 8 bitte 10010110 desenini bırakır: işaretsiz okuyana 150 (doğru, C = 0), işaretli okuyana −106 (yanlış, V = 1). Yanlış sonuç gelişigüzel değildir; doğrusundan tam 2<sup>8</sup> = 256 uzaktadır, çünkü devre mod 2<sup>n</sup> toplar.",
      formula: "−x ≡ 2<sup>n</sup> − x  (mod 2<sup>n</sup>),   V = c<sub>giren</sub> ⊕ c<sub>çıkan</sub>",
      formulaNote: "n bitlik işaretli aralık −2<sup>n−1</sup> ile 2<sup>n−1</sup> − 1 arasıdır; 8 bitte −128 … 127. En soldaki bitin ağırlığı +2<sup>n−1</sup> değil, −2<sup>n−1</sup>'dir. ⊕ işareti XOR'dur.",
    },
    {
      heading: "Kayan nokta: sonlu bitle gerçel sayı",
      body:
        "Kayan nokta, bilimsel gösterimin ikili hâlidir: bir işaret biti, bir üs ve 1 ile 2 arasında bir anlamlı kısım. Çift duyarlıkta 64 bit 1 + 11 + 52 diye bölünür ve saklanan üsten 1023 çıkarılır. 52 kesir biti, 2<sup>e</sup> ile 2<sup>e+1</sup> arasını 2<sup>52</sup> eşit parçaya böler; bu yüzden komşu iki sayının <strong>aralığı</strong> 2<sup>e−52</sup>'dir ve her üs basamağında ikiye katlanır. Sayfa bunu ölçer: bitlere 1 ekleyip farkı alır ve kuramın değeriyle yan yana yazar. Onluk 0,1'in ikilik açılımı 0,000110011… diye sonsuza dek devreder, tıpkı onlukta 1/3 gibi. Makine onu 53 anlamlı bitte keser ve en yakın komşuyu saklar: 0,1000000000000000055511…; hata, o bölgedeki 2<sup>−56</sup>'lık aralığın onda dördüdür. Her işlemin sonucu da en yakın komşuya yuvarlanır; sonuç iki komşunun tam ortasına düşerse kesrinin son biti 0 olan seçilir («eşitlikte çifte»). Hata hiçbir adımda yarım aralığı geçmez, ama sıfır da değildir.",
      formula: "x = (−1)<sup>işaret</sup> × 1,kesir × 2<sup>e</sup>,   aralık = 2<sup>e−52</sup>",
      formulaNote: "Çift duyarlıkta e = ham üs − 1023; tek duyarlıkta (1 + 8 + 23 bit) e = ham üs − 127 ve aralık 2<sup>e−23</sup>. 1 ile 2 arasında aralık 2<sup>−52</sup> ≈ 2,22 × 10<sup>−16</sup>'dır: yaklaşık 16 ondalık basamak.",
    },
    {
      heading: "Boru hattı: n + 4 + bekleme",
      body:
        "Her komut beş aşamadan geçer: getir (IF), çöz ve yazmaç oku (ID), hesapla (EX), belleğe git (MEM), sonucu yaz (WB). Çamaşırhanede ikinci partiyi yıkarken birincisini kurutabilirsin; <strong>boru hattı</strong> aynı numaradır: beş aşama ayrı donanım olduğu için her çevrimde beş komut beş ayrı aşamada durabilir. Tek komut yine beş çevrim sürer; değişen, birim zamanda biten komut sayısıdır. İlk komut 5. çevrimde biter, sonrakiler birer çevrim arayla gelir: n komut n + 4 çevrim. Hat her zaman dolu kalamaz. Bir komut, önündekinin henüz yazmadığı yazmacı isterse (<strong>veri tehlikesi</strong>) ID'de bekler; <strong>ileri besleme</strong>, sonucu yazmaca yazılmadan EX girişine kısa yoldan verip bu bekleyişi siler. Tek istisna yükle–kullan çiftidir: yüklenen değer ancak MEM sonunda hazırdır, bir çevrim kalır. Dallanmanın yönü EX'te belli olur; tahmin yanlışsa arkadan getirilen iki komut boşaltılır. Sayfa bunların hepsini tek satırda toplar ve her koşuda çizelgeden saydığı çevrimle karşılaştırır.",
      formula: "çevrim = n + 4 + bekleme,   CPI = çevrim / n  →  1 + bekleme / n",
      formulaNote: "Bekleme, veri beklemesi ile boşaltma kaybının toplamıdır; CPI komut başına çevrimdir. Kısa programda hattı doldurmanın 4 çevrimi ağır basar (6 komutta CPI 1,667); uzun programda bu pay 4/n diye erir.",
    },
    {
      heading: "Önbellek: yerellik ve ortalama erişim süresi",
      body:
        "İşlemci bir çevrimde hesap yapar, ama ana bellekten bir sözcük getirmek onlarca, yüzlerce çevrim sürer. Bu bekleyişi gizleyen şey programların <strong>yerelliğidir</strong>: az önce dokundukları veriye ve onun komşularına yeniden dokunurlar. Önbellek veriyi tek tek sözcük olarak değil, <strong>blok</strong> olarak getirir; 16 baytlık bir blok 4 baytlık dört elemanı birlikte taşır. Diziyi sırayla gezen bir döngü bu yüzden dört erişimde bir ıskalar: oran 4/B. Bloğun nereye konacağını adres belirler: blok numarası = ⌊adres / B⌋, küme = blok numarası mod küme sayısı. Aynı kümeye düşen bloklar yol sayısı kadar yer için yarışır. Iskalar üç türdür: <strong>soğuk</strong> (blok ilk kez isteniyor, kaçınılmaz), <strong>kapasite</strong> (önbellek bu kadar bloğu tutamıyor) ve <strong>çakışma</strong> (yer var, ama bloklar aynı kümeye yığılıyor). Bedel bir beklenen değerdir: her erişim isabet süresini öder, ıskalayanlar üstüne cezayı ekler.",
      formula: "t<sub>ort</sub> = t<sub>isabet</sub> + (ıska oranı) × (ıska cezası)",
      formulaNote: "Sayfanın öğretim değerleriyle (isabet 1, ceza 100 çevrim) yüzde 25 ıska 1 + 0,25 × 100 = 26 çevrim eder; ıska oranındaki her yüzde puanı ortalamaya 1 çevrim ekler.",
    },
    {
      heading: "Başarım denklemi ve Amdahl yasası",
      body:
        "Bir programın işlemci süresi üç çarpanın çarpımıdır: kaç komut yürütüldüğü (N), komut başına ortalama kaç çevrim gittiği (CPI) ve bir çevrimin ne kadar sürdüğü. Derleyici ile komut kümesi N'yi, mimari CPI'yi, devre teknolojisi saati belirler; birini iyileştiren karar çoğu kez ötekini bozar. CPI bir ağırlıklı ortalamadır: her komut sınıfının payını o sınıfın çevrim sayısıyla çarpıp toplarsın. Aynı mantığı bir işin parçalarına uygularsan <strong>Amdahl yasası</strong> çıkar. İşin f kesri p çekirdeğe bölünebiliyor, 1 − f kesri sırayla yapılmak zorundaysa yeni süre eskisinin (1 − f) + f/p katıdır. Türetme bu kadardır; sonucu ise serttir: p sonsuza giderken hızlanma 1/(1 − f)'te durur. Yüzde 90'ı paralel bir işte sınır 10 kattır; kalan yüzde 10 hiçbir çekirdekle kısalmaz. Yasanın iki varsayımı vardır: iş yükü sabittir ve işi paylaştırmak bedelsizdir. Sayfadaki «Eşgüdüm maliyeti» kaydırıcısı ikincisini bozmana izin verir.",
      formula: "T = N × CPI / f<sub>saat</sub>,   S(p) = 1 / ((1 − f) + f / p)",
      formulaNote: "İlk denklemde f<sub>saat</sub> saat frekansıdır (çevrim/s); çevrim süresi onun tersidir. İkincide f, işin paralelleştirilebilir payıdır; sayfa da aynı ayrımı yapar. S(p), tek çekirdek süresinin p çekirdek süresine oranıdır.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmedir ve her sekmede sayılan değer kuramın değerinin yanında, farkıyla birlikte durur. <strong>01 · Sayıların gösterimi</strong>: «Genişlik» (8, 16, 32 bit), A ve B kutuları, tıklanabilir bitler ve «En büyük + 1», «−1 + 1», «En küçük + (−1)» hazırları; altında IEEE 754 bölümü: «Duyarlık», x kutusu, «Sonraki değer» / «Önceki değer» ve a, b, c kutularıyla toplama deneyi. <strong>02 · Boru hattı</strong>: altı «Hazır program», düzenlenebilir program kutusu, «İleri besleme (forwarding) açık» onay kutusu, «Dallanma tahmini» menüsü, «Çevrim» kaydırıcısı ve «Geri» / «İleri» / «Oynat» düğmeleri. <strong>03 · Önbellek</strong>: «Önbellek boyutu», «Blok boyutu», «İlişkilendirme», «Erişim izi», «İsabet süresi», «Iska cezası» ve üç hazır düğme. <strong>04 · Başarım</strong>: iki tasarımın saatleri ve komut payları; altında Amdahl için «Paralelleştirilebilir pay f», «Çekirdek sayısı p» ve «Eşgüdüm maliyeti». Her sekmede «Bu sekmeyi sıfırla» düğmesi var; <kbd>R</kbd> tuşu da aynı işi görür. Sayfadaki bütün süreler ve çevrim sayıları öğretim değeridir, gerçek bir yonganın ölçüsü değildir.",
    experiments: [
      {
        title: "0,1 + 0,2 neden 0,3 değil?",
        predict:
          "Bilgisayara 0,1 + 0,2 ile 0,3 eşit mi diye sorarsan ne der? 0,5 + 0,25 ile 0,75 için yanıt aynı mı olur? Fark çıkarsa, makinenin bulduğu toplam 0,3'ün saklanan değerinden kaç komşu uzaktadır?",
        do: "«01 · Sayıların gösterimi» sekmesinin alt yarısında «0,1 + 0,2 = 0,3» düğmesine bas; «a ⊕ b = c mi?», «Fark (aralık cinsinden)» ve «Yuvarlama hatası» kartlarını, alttaki sayı doğrusuyla birlikte oku. Sonra «0,5 + 0,25 = 0,75» ve «2⁵³ + 1» düğmelerini dene.",
        observe:
          "0,1 + 0,2: «Hayır», fark +1 aralık. Makinenin sonucu 0,3000000000000000444…, c'nin saklanan değeri 0,29999999999999998889…; yuvarlamadan önceki tam toplam 0,30000000000000001665…, yuvarlama hatası 2,776 × 10⁻¹⁷ (+0,5 aralık). 0,5 + 0,25: «Evet, bit bit aynı», hata 0. 2⁵³ + 1: tam toplam 9007199254740993, makinenin sonucu 9007199254740992; yanıt yine «Evet», ama durum satırı bunun bir güvence değil, rastlantı olduğunu söyler.",
        explain:
          "0,1 ve 0,2 ikilide devirlidir; ikisi de gerçek değerinden biraz büyük saklanır ve saklanan b, saklanan a'nın tam iki katıdır. Toplam 3a eder ve 0,25 ile 0,5 arasındaki 2<sup>−54</sup>'lük ızgarada iki komşunun tam ortasına düşer. Eşitlikte kesrinin son biti çift olan komşu seçilir; o komşu 0,3'ün saklanan değeri değil, bir üstündekidir. 0,5, 0,25 ve 0,75 ise ikinin kuvvetleriyle tam yazılır, yuvarlanacak bir şey yoktur. Model yalnız «en yakına» yuvarlar; öteki kipler sayfada yok.",
      },
      {
        title: "Bekleme kaç çevrim tutar, tahminci döngüyü öğrenir mi?",
        predict:
          "Altı komut sırayla 30 çevrim tutardı. Boru hattında bağımsız altı komut kaç çevrimde biter: 30 mu, 10 mu, 6 mı? Her komut bir öncekinin sonucunu istiyorsa ve ileri besleme kapalıysa bu sayı ne olur? İç içe bir döngüde 1 bitlik tahminci mi daha az yanılır, 2 bitlik mi?",
        do: "«02 · Boru hattı» sekmesinde «Hazır program»dan «Bağımsız altı komut»u seç ve kartları oku. «Bağımlılık zinciri»ne geç; «İleri besleme (forwarding) açık» kutusunun işaretini kaldır, sonra geri koy. Ardından «İç içe döngü: tahminci sınavı»nı seç ve «Dallanma tahmini» menüsündeki dört seçeneği sırayla dene.",
        observe:
          "Bağımsız: 10 çevrim, formül 6 + 4 + 0 = 10, hızlanma 3 kat. Zincir, ileri besleme açık: yine 10; kapalı: 20 çevrim (6 + 4 + 10 = 20), CPI 3,333, hızlanma 1,5 kat. İç içe döngü (61 komut, 27 dallanma): hep «dallanmaz» 97 çevrim, 11 / 27 doğru; hep «dallanır» 87; 1 bitlik 85 (17 / 27); 2 bitlik 79 çevrim, 20 / 27 (74,1 %), CPI 1,295. Her koşuda «Fark» 0 çevrim, «Sıralı yürütücüyle son durum» da «Aynı»dır.",
        explain:
          "Zincirde beş komutun her biri, kaynağını yazan komut WB'ye varana dek ID'de 2 çevrim bekler: 5 × 2 = 10. İleri besleme sonucu EX çıkışından verir, bedel sıfırlanır. Her yanlış tahmin 2 çevrimdir: 16 yanlış 32, 7 yanlış 14 çevrim. 1 bitlik tahminci yalnız son sonucu hatırlar; iç döngünün çıkışında bir, bir sonraki turun ilk sınamasında bir kez daha yanılır. 2 bitlik sayaç fikrini değiştirmek için art arda iki kanıt ister, tek bir çıkış onu saptırmaz. Modelin sınırı: dallanma hep EX'te çözülür, ceza hep 2 çevrimdir; ders kitabı MIPS'i karşılaştırmayı ID'ye çekip cezayı 1 çevrime indirir.",
      },
      {
        title: "Satır satır mı, sütun sütun mu?",
        predict:
          "32 × 32'lik diziyi iki döngü de baştan sona bir kez okur; yalnızca gezme sırası farklıdır. Iska oranları aynı mı çıkar? Sütun sütun gezerken ıskaları azaltmak için yol sayısını 2'ye ya da 4'e çıkarmak yeter mi?",
        do: "«03 · Önbellek» sekmesini açılış ayarlarında oku (1 KiB, 16 B blok, 1 yollu, satır satır). «Satır ve sütun farkı» düğmesine bas. «İlişkilendirme»yi sırayla 2 yollu, 4 yollu ve «Tam ilişkili» yap («Çakışmayı tam ilişkiyle çöz» düğmesi sonuncusunu doğrudan kurar). Son olarak 1 yolluya dön ve «Önbellek boyutu»nu 4 KiB yap.",
        observe:
          "Satır satır: 1024 · 768 · 256, ıska 25 %, basit beklenti 25 %, ıska türleri 256 · 0 · 0, ortalama 26 çevrim, önbelleksiz duruma göre 3,88 kat. Sütun sütun: 1024 · 0 · 1024, ıska 100 %, türler 256 · 0 · 768, ortalama 101 çevrim, 1 kat; erişim haritası baştan sona kırmızıdır. 2 ve 4 yollu düzende yalnız «Küme × yol» kartı değişir (32 × 2, 16 × 4); ıska sayıları yerinden oynamaz. Tam ilişkili düzende ya da 1 yollu 4 KiB'de oran yeniden 25 %'e iner.",
        explain:
          "Bir sütunda art arda iki eleman 32 × 4 = 128 bayt, yani 8 blok aralıklıdır. 64 kümeli doğrudan eşlemede sütunun 32 bloğu yalnız 8 kümeye düşer; her kümede tek satır için dört blok yarışır ve her gelen bir öncekini atar; komşu sütuna geçildiğinde blok çoktan gitmiştir. 768 ıskanın hepsi çakışmadır: 64 satırın 32'si yeterdi. 2 yollu düzende 4 kümeye, 4 yollu düzende 2 kümeye düşerler: ellerinde yine 8 satır vardır, yetmez. Tam ilişkili düzen 64 satırın hepsini açar, 4 KiB ise 256 kümeyle 32 bloğu ayrı ayrı yerleştirir. Model tek katmanlıdır, yalnız okur, önceden getirme yapmaz.",
      },
      {
        title: "Çekirdek eklemek ne zaman zarar eder?",
        predict:
          "İşin yüzde 90'ı paralelleştirilebiliyor. 8 çekirdek kaç kat hızlandırır: 8 mi, 7,2 mi, daha mı az? 256 çekirdek 10 katı geçebilir mi? Her ek çekirdek 2 adımlık eşgüdüm bedeli getirirse en iyi çekirdek sayısı kaç olur?",
        do: "«04 · Başarım» sekmesinin Amdahl bölümünde «Paralelleştirilebilir pay f» 0,9 iken «Çekirdek sayısı p»yi 8, 9 ve 256 yap; «Tek çekirdek · p çekirdek (adım)», «Ölçülen hızlanma» ve «Verim» kartlarını oku. Sonra «Eşgüdüm maliyeti»ni 2 adıma getir ve p'yi 8, 16, 32, 64 diye artır.",
        observe:
          "p = 8: 1000 · 213 adım, ölçülen 4,695 kat, Amdahl 4,706 kat, fark −0,23 %, verim 58,7 %. p = 9: 200 adım, tam 5 kat. p = 256: 104 adım, 9,615 kat; sınır 10 kat. Maliyet 2 adımken: p = 8 → 227 adım (4,405 kat), 16 → 187 (5,348 kat), 32 → 191 (5,236 kat), 64 → 241 (4,149 kat; Amdahl 8,767 der). En kısa süre p = 20–22 arasında, 183 adımdır.",
        explain:
          "Seri 100 adım hiçbir çekirdekle kısalmaz: süre 100 + ⌈900/p⌉ adımdır. p = 8'de 900/8 = 112,5 eder, ama işler bölünemediği için 113 adım sayılır; ölçümün Amdahl'dan binde iki sapması bu yarım adımdır. 9 çekirdekte 900 tam bölünür, fark kapanır. Eşgüdüm bedeli eklenince süre 100 + 900/p + 2(p − 1) olur: ilk terim azalır, son terim büyür. Türevi sıfırlarsan p = √450 ≈ 21 bulursun. Amdahl yasası bu bedeli saymaz; çekirdek ekledikçe eğrinin aşağı dönmesi yasanın değil, varsayımının bozulmasıdır.",
      },
    ],
  },
  wow: [
    {
      title: "128 baytlık bellekle 52 dakika",
      body:
        "21 Haziran 1948'de Manchester'daki 'Baby', programı kendi belleğinde saklayan ilk elektronik bilgisayar olarak çalıştı. Belleği 32 kelime × 32 bit, yani 1024 bit: 128 bayt, 128 harflik kısa bir mesaj kadar. 17 komutluk ilk program 262 144'ün en büyük öz bölenini aradı ve yaklaşık 3,5 milyon işlem, 52 dakika sonra 131 072'yi buldu. 8 GB belleği olan bir telefon ondan 67 milyon kat fazlasını taşır.",
    },
    {
      title: "Işığın bir çevrimde gidebildiği yol: 6 santimetre",
      body:
        "Işık bir nanosaniyede yaklaşık 30 santimetre gider. 5 GHz'lik bir çevrim 0,2 nanosaniyedir: 6 santimetre. Çipin kenarı bir iki santimetredir, ama içindeki tellerde sinyal ışıktan çok daha yavaş ilerler ve bir çevrimde art arda dizili pek çok kapıdan geçmek zorundadır. Aynı ölçekle bak: ana bellekten bir yanıt mertebe olarak 100 nanosaniye sürer, yani 500 çevrimlik bir bekleyiştir. Önbelleğin neden şart olduğunu bu tek sayı anlatır.",
    },
    {
      title: "19 Ocak 2038, saat 03:14:07",
      body:
        "Pek çok sistem zamanı 1 Ocak 1970'ten beri geçen saniye olarak 32 bitlik işaretli bir sayıda tutar. O sayı 2 147 483 647'ye, yani 0x7FFFFFFF'e 19 Ocak 2038'de 03:14:07 UTC'de ulaşır. Bir saniye sonra en soldaki bit 1 olur ve sayı −2 147 483 648'e, yani 13 Aralık 1901'e düşer. Sayfada «Genişlik»i 32 bit yapıp «En büyük + 1» düğmesine bas: saklanan toplam −2 147 483 648, matematiksel toplamdan farkı −4 294 967 296 = −2³²; elde C = 0, taşma V = 1. O tek bayrak, bu sorunun ta kendisidir.",
    },
  ],
  worked: {
    title: "Saati yüzde 50 hızlı işlemci ne kadar hızlıdır?",
    prompt:
      "10 milyar komutluk bir programda komutların yüzde 50'si aritmetik, yüzde 25'i yükleme, yüzde 10'u saklama, yüzde 15'i dallanmadır. A tasarımında bu sınıflar sırasıyla 4, 5, 4 ve 3 çevrim tutar; saat 2 GHz'dir. B tasarımı saati 3 GHz'e çıkarır, ama yükleme ve dallanma komutları 2'şer çevrim uzar. (a) İki tasarımın CPI'sini ve süresini bul. (b) B kaç kat hızlıdır? (c) Ek çevrim 4 olsaydı B'nin saati en az kaç GHz olmalıydı? (Çevrim sayıları sayfanın öğretim değerleridir.)",
    steps: [
      "A'nın CPI'si ağırlıklı ortalamadır: 0,50 × 4 + 0,25 × 5 + 0,10 × 4 + 0,15 × 3 = 2,00 + 1,25 + 0,40 + 0,45 = 4,1 çevrim/komut.",
      "A'nın süresi: T = N × CPI / f<sub>saat</sub> = (10 × 10<sup>9</sup> komut × 4,1 çevrim/komut) / (2 × 10<sup>9</sup> çevrim/s) = 20,5 s. Birimleri izle: komut × (çevrim/komut) ÷ (çevrim/s) = saniye.",
      "B'de ek çevrimi yalnız yükleme ve dallanma öder; paylarının toplamı 0,25 + 0,15 = 0,40'tır. CPI = 4,1 + 0,40 × 2 = 4,9 çevrim/komut. Süre: (10 × 10<sup>9</sup> × 4,9) / (3 × 10<sup>9</sup>) = 16,33 s.",
      "Oran: 20,5 s / 16,33 s = 1,255. Kısa yoldan: (3/2) × (4,1/4,9) = 1,5 × 0,837 = 1,255. Saat yüzde 50 hızlandı, CPI yüzde 19,5 büyüdü; net kazanç yüzde 25,5.",
      "(c) Ek çevrim 4 ise CPI = 4,1 + 0,40 × 4 = 5,7. Başa baş koşulu 5,7 / f<sub>B</sub> = 4,1 / 2 GHz, yani f<sub>B</sub> = 2 × 5,7 / 4,1 = 2,78 GHz. Sayfada sına: «B'de yükleme ve dallanmaya ek çevrim» 4 iken 3 GHz'de B yüzde 7,9 daha hızlıdır; 2,5 GHz'de kuramsal süresi 22,8 s'ye çıkar ve durum satırı «yüzde 11,2 daha uzun sürüyor, yani daha yavaş» der.",
    ],
    result:
      "CPI<sub>A</sub> = 4,1 ve T<sub>A</sub> = 20,5 s; CPI<sub>B</sub> = 4,9 ve T<sub>B</sub> = 16,33 s; B 1,255 kat hızlıdır. Sayfa aynı durumu 100 000 komutluk rastgele bir akışın çevrimlerini sayarak ölçer: A'nın CPI'si 4,0982, süreler 20,491 s ve 16,31 s, oran 1,256. Kuramdan −0,044 %'lik fark örnekleme hatasıdır; tohumu değiştirince o da değişir. Ek çevrim 4 olduğunda başa baş saati 2,78 GHz'dir: GHz tek başına hız değildir.",
  },
  misconceptions: [
    {
      myth: "Boru hattı her komutu daha hızlı bitirir.",
      truth:
        "Tek bir komut yine beş çevrim sürer; çizelgede beklemeyen herhangi bir satırın hücrelerini say, IF'ten WB'ye tam beş tanedir. Hızlanan, birim zamanda biten komut sayısıdır: «Bağımsız altı komut»ta ilk komut 5. çevrimde biter, sonrakiler birer çevrim arayla gelir ve hızlanma 3 kat olur. Program uzadıkça bu sayı 5'e yaklaşır, ama onu geçemez.",
    },
    {
      myth: "Daha yüksek GHz her zaman daha hızlı bilgisayar demektir.",
      truth:
        "Süre, komut sayısı × komut başına çevrim × çevrim süresidir; saat yalnızca üçüncü çarpandır. «04 · Başarım» sekmesinde ek çevrimi 4, B'nin saatini 2,5 GHz yap: B'nin saati A'nınkinin 1,25 katıdır, ama CPI 4,1 yerine 5,7'dir ve aynı program B'de yüzde 11,2 daha uzun sürer. Saati hızlandırmak için aşamaları bölen bir tasarım, her komuta ek çevrim ödetiyorsa kazancını geri verir.",
    },
    {
      myth: "Bilgisayar negatif sayıyı başına bir işaret biti koyarak saklar.",
      truth:
        "En soldaki bit işareti söyler, ama gösterim 'işaret + büyüklük' değildir: 8 bitte −1, 10000001 değil, sekiz tane 1'dir. İşaret-büyüklük gösteriminde iki ayrı sıfır olurdu ve çıkarma için ayrı devre gerekirdi. İkiye tümleyende tek bir toplama devresi hem toplar hem çıkarır. «−1 + 1» düğmesine bas: 11111111 + 00000001 sekiz sıfır bırakır, dokuzuncu bite taşan elde düşer.",
    },
    {
      myth: "0,1 + 0,2'nin 0,3 çıkmaması bir hesap hatasıdır; bilgisayar yanlış topluyor.",
      truth:
        "Toplama kusursuz yapılır: sonuç, saklanan iki sayının tam toplamına en yakın gösterilebilir sayıdır. Yanlış olan beklentidir. 0,1, 0,2 ve 0,3 ikilide sonlu basamakla yazılamaz; üçü de daha toplama başlamadan yuvarlanmıştır. 0,5 + 0,25 gibi ikinin kuvvetleriyle yazılan sayılarda sonuç bit bit doğrudur. Bu yüzden kayan noktalı iki sayı eşitlikle değil, 'fark yeterince küçük mü' diye karşılaştırılır.",
    },
  ],
  glossary: [
    { term: "Komut seti mimarisi (ISA)", definition: "İşlemcinin anladığı komutların, yazmaçların ve bit biçimlerinin sözleşmesi; x86-64, ARM ve RISC-V birer örnektir." },
    { term: "Saat çevrimi", definition: "İşlemcinin bütün aşamalarını eşzamanlayan tik; 5 GHz'de bir çevrim 0,2 nanosaniyedir." },
    { term: "CPI", definition: "Komut başına ortalama saat çevrimi sayısı; ideal boru hattında 1'e yaklaşır, beklemeler ve ıskalar onu büyütür." },
    { term: "Tehlike (hazard)", definition: "Boru hattında bir komutun, önceki komutun henüz hazır olmayan sonucuna ya da henüz belli olmayan dallanma yönüne bağlı olması." },
    { term: "İleri besleme (forwarding)", definition: "Bir sonucun yazmaç dosyasına yazılması beklenmeden, ara yazmaçlardan doğrudan EX girişine verilmesi." },
    { term: "İkiye tümleyen", definition: "n bitte −x'i 2ⁿ − x deseniyle gösteren yöntem; en soldaki bitin ağırlığı −2ⁿ⁻¹'dir." },
    { term: "Aralık (ulp)", definition: "Bir kayan noktalı sayı ile bir sonraki gösterilebilir sayı arasındaki fark; çift duyarlıkta 2 üzeri (e − 52)'dir." },
    { term: "Iska (cache miss)", definition: "Aranan bloğun önbellekte bulunamaması; istek daha yavaş belleğe iner ve erişim süresine ıska cezası eklenir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bilgisayar bir kara kutudur; lisansta kutuyu kapılardan başlayarak yeniden kurarsın. <strong>Sayısal Tasarım</strong> (mantık devreleri) dersinde toplayıcıdan yazmaca, sonlu durum makinesine çıkarsın; <strong>Bilgisayar Organizasyonu ve Mimarisi</strong> dersi ise çoğu yerde Patterson ile Hennessy'nin kitabı etrafında döner: önce bir ISA (bugün genellikle açık <strong>RISC-V</strong>) öğrenir, sonra sayfadaki beş aşamalı boru hattını gerçekten tasarlarsın. Çözümlü örnekteki hesap o dersin ilk sınav sorusudur; ikinci soru çoğu kez bir çevrim çizelgesidir ve tehlikeler elle izlenir: hangi komut kimi bekliyor, ileri besleme hangi ara yazmaçtan geliyor, yanlış tahmin kaç komutu boşaltıyor. Modern çekirdekler bunun çok ötesine geçer: komutları sırasız yürütür, aynı anda yüzlerce komutu uçuşta tutar ve bunu yaparken programcıya her şey sırayla olmuş gibi görünmelidir.",
      "Bellek tarafında sayfadaki tek katmanlı önbelleğin yerini çok katmanlı bir sıradüzen, sanal bellek, sayfa tabloları ve TLB alır; çok çekirdekte önbellek tutarlılığı ve Amdahl'ın sabit iş yükü varsayımını gevşeten ölçekleme çözümlemeleri gelir. Sayı tarafında <strong>Sayısal Analiz</strong> dersi burada tek bir toplamada gördüğün yuvarlama hatasının uzun bir hesap boyunca nasıl biriktiğini ve hangi algoritmaların onu büyüttüğünü inceler. Ocak 2018'de açıklanan Spectre ve Meltdown saldırıları, dallanma tahmini ile önbelleğin birleşiminden sır sızdırılabildiğini gösterdi: mimari artık bir güvenlik dersidir de. 'Nand2Tetris' gibi dersler bütün bu yolu tek dönemde yürütür: tek bir NAND kapısından çalışan bir Tetris'e.",
    ],
    topics: ["RISC-V ve ISA tasarımı", "İleri besleme ve dallanma tahmini", "Sırasız yürütme", "Önbellek düzeni, sanal bellek ve TLB", "Amdahl yasası ve paralel ölçekleme", "IEEE 754 ve yuvarlama hatası çözümlemesi", "Spectre ve Meltdown", "GPU ve SIMD"],
  },
  quiz: [
    {
      question: "Sayfadaki «Bağımlılık zinciri»nde her komut bir öncekinin sonucunu kullanır; ileri besleme kapalıyken 6 komut 20 çevrim sürer. Zincir aynı kuralla 11 komuta uzatılırsa kaç çevrim sürer?",
      options: ["15 çevrim", "25 çevrim", "35 çevrim", "55 çevrim"],
      answer: 2,
      explanation: "Toplam = n + 4 + bekleme. İlk komut kimseyi beklemez; kalan 10 komutun her biri, kaynağını yazan komut WB'ye varana dek 2 çevrim bekler: 11 + 4 + 20 = 35. 15, ileri besleme açıkken bulacağın sayıdır (bekleme 0); 25, bekleyen her komuta 1 çevrim sayanın sonucu (11 + 4 + 10); 55 ise boru hatsız 5 × 11. Zincir uzadıkça CPI 1 + 2 = 3'e yaklaşır: hattın kazancının yarıdan çoğu bekleyerek harcanır.",
    },
    {
      question: "8 bitlik bir toplayıcıda hangi toplama elde bayrağını yakar (C = 1) ama taşma bayrağını yakmaz (V = 0)?",
      options: ["127 + 1", "(−1) + 1", "(−128) + (−1)", "100 + 50"],
      answer: 1,
      explanation: "11111111 + 00000001 dokuz bitlik 1 0000 0000 eder; dokuzuncu bit düşer, C = 1. İşaretli okumada −1 + 1 = 0 doğrudur, V = 0; işaretsiz okumada aynı bitler 255 + 1 = 256 demektir ve sığmaz. 127 + 1 ile 100 + 50'de tersi olur (C = 0, V = 1): işaretsiz sonuç doğru, işaretli sonuç yanlış. (−128) + (−1) iki bayrağı da yakar. İki bayrak bağımsızdır, çünkü devre aynı, okuma farklıdır.",
    },
    {
      question: "Bir işin yüzde 95'i paralelleştirilebiliyor. Çekirdek sayısını 20'den 256'ya çıkarmak hızlanmayı nasıl değiştirir?",
      options: [
        "Çekirdek sayısıyla orantılı: yaklaşık 12,8 katına çıkarır",
        "Yaklaşık 10,3 kattan 18,6 kata çıkarır; iki katına bile ulaşmaz",
        "Hiç değiştirmez; sınıra 20 çekirdekte ulaşılmıştır",
        "20 kattan 256 kata çıkarır",
      ],
      answer: 1,
      explanation: "S(20) = 1 / (0,05 + 0,95/20) = 1 / 0,0975 = 10,26 ve S(256) = 1 / (0,05 + 0,95/256) = 18,62. Sınır 1 / 0,05 = 20 kattır; 20 çekirdekte paralel kısım (0,0475) ile seri kısım (0,05) zaten neredeyse eşittir, sonraki 236 çekirdek yalnız o küçülen yarıyı kırpar. Sayfada f = 0,95 ile dene: 98 ve 54 adım, yani 10,204 ve 18,519 kat. 12,8 kat çekirdek, 1,8 kat hız.",
    },
  ],
  next: [
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "Boru hattından geçen komutların bayt bayt nasıl kodlandığını gör: küçük bir öğretim işlemcisine assembly yaz, tek tek yürüt; bayraklar sekmesinde C ile V ayrımını 8 bitlik bir ALU'da yeniden sına." },
    { href: "mantik-kapilari.html", title: "Mantık Kapıları Laboratuvarı", why: "Buradaki dalgalı elde toplayıcısının içine in: yarım toplayıcının tablosunu çıkar, dört bitlik toplayıcıda taşımanın basamaktan basamağa yürüyüşünü izle." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "Adres dediğimiz sayının program tarafındaki yüzü: işaretçiler, çağrı yığını, bellek sızıntısı ve buradaki bayt sırası tablosunun C'deki karşılığı." },
    { href: "isletim-sistemleri-ve-linux.html", title: "İşletim Sistemleri ve Linux", why: "Aynı işlemciyi yüzlerce programın nasıl paylaştığını gör: süreç yaşam döngüsü, Round-Robin zamanlayıcı ve çekirdek ile kullanıcı alanı ayrımı." },
  ],
  sources: [
    { title: "Wikipedia · Von Neumann architecture", url: "https://en.wikipedia.org/wiki/Von_Neumann_architecture", note: "Saklı program fikri, EDVAC taslağının yazarlık tartışması ve darboğaz (İngilizce)." },
    { title: "Wikipedia · Classic RISC pipeline", url: "https://en.wikipedia.org/wiki/Classic_RISC_pipeline", note: "Beş aşamanın (IF, ID, EX, MEM, WB) ayrıntısı; veri tehlikeleri, ileri besleme ve yükle–kullan beklemesi. Dikkat: madde dallanmayı ID'de çözen tasarımı anlatır, sayfa EX'te çözer (İngilizce)." },
    { title: "Wikipedia · IEEE 754", url: "https://en.wikipedia.org/wiki/IEEE_754", note: "İkili biçimler, duyarlıkları (24 ve 53 anlamlı bit), üs aralıkları ve varsayılan 'en yakına, eşitlikte çifte' yuvarlama kuralı (İngilizce)." },
    { title: "MIT OCW · 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", note: "Sayısal devrelerden boru hatlı bir işlemciye ve önbellek sıradüzenine uzanan açık lisans dersi; konu videoları ve çalışma kâğıtları (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
