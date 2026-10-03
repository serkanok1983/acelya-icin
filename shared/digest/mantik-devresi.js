window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mantik-devresi"] = {
  slug: "mantik-devresi",
  title: "Mantık Devresi: Kapılardan Hesaplamaya",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 30,
  tagline:
    "Yedi küçük kapı, iki voltaj seviyesi ve bir doğruluk tablosu: 1847'de bir ayakkabıcının oğlunun bulduğu cebir, 1937'de 21 yaşındaki bir öğrencinin elinde devreye dönüştü. Bugün cebindeki telefonun içinde milyarlarca kopyası var.",
  hook:
    "Elinde yalnızca bir çeşit parça olsa, hepsi birbirinin tıpatıp aynısı, bunlardan bir hesap makinesi yapabilir misin? Yapabilirsin; adı NAND. Apollo'yu Ay'a götüren bilgisayar tek tür kapıdan, binlerce NOR'dan kurulmuştu. Bu sayfadaki yedi düğme, aslında yedi değil tek bir fikirdir: 0 ile 1'in birbirine nasıl dönüştüğü.",
  bigIdea:
    "Her mantık devresi bir <strong>doğruluk tablosudur</strong>: n giriş için 2<sup>n</sup> satır, her satırda tek bir çıkış. Kapıları birleştirmek tabloları birleştirmektir; çıkışı girişe geri bağladığın an tablo yetmez olur ve <em>hafıza</em> doğar.",
  story: [
    "George Boole 1815'te İngiltere'nin Lincoln kentinde bir ayakkabıcının oğlu olarak doğdu; üniversiteye hiç gitmedi, Latinceyi ve matematiği kendi başına öğrendi, on altı yaşında öğretmenlik yaparak ailesini geçindirdi. 1847'de <em>The Mathematical Analysis of Logic</em>, 1854'te <em>An Investigation of the Laws of Thought</em> adlı kitaplarında garip bir cebir önerdi: değişkenler yalnızca 0 ya da 1 olabiliyor, x·x = x oluyor, 've' çarpma, 'veya' toplama gibi davranıyordu. Boole bunu düşüncenin yasalarını yazmak için yapmıştı; devre diye bir şey aklında yoktu. 1849'da Cork'taki Queen's College'a profesör oldu ve 1864'te, 49 yaşında, yağmurda yürüyüp hastalanarak öldü. Cebri yaklaşık seksen yıl boyunca mantıkçıların ilgi alanı olarak kaldı; mühendisler hiç duymadı.",
    "1937'de MIT'de yüksek lisans yapan 21 yaşındaki Claude Shannon, Vannevar Bush'un yüzlerce elektromekanik röleyle çalışan diferansiyel analizörünün bakımıyla görevliydi. Röle, bir mıknatısın çektiği bir anahtardır: akım var ya da yok, kapalı ya da açık. Shannon lisansta gördüğü Boole cebrini hatırladı ve iki şeyin aynı olduğunu fark etti: seri bağlı iki anahtar 'VE', paralel bağlı iki anahtar 'VEYA' demekti. Tezi <em>A Symbolic Analysis of Relay and Switching Circuits</em> 1938'de yayımlandı ve devre tasarımını deneme yanılmadan cebire çevirdi: artık bir devreyi önce kâğıtta sadeleştirip sonra kurabiliyordun. Aynı yıllarda Berlin'de Konrad Zuse, Shannon'dan habersiz, yaklaşık 2.600 röleyle çalışan Z3'ü kurdu (1941); saniyede 5 ile 10 vuruş yapan bu makine, programlanabilir ilk bilgisayarlardan biriydi.",
    "Röle yavaş ve gürültülüydü; 1947'de Bell Laboratuvarları'nda transistör bulundu, 1958'de Texas Instruments'ta Jack Kilby birkaç transistörü tek bir germanyum parçası üzerine koyarak ilk tümleşik devreyi yaptı ve bunun için 2000 Nobel Fizik Ödülü'nü aldı. 1960'larda MIT Instrumentation Laboratory, Apollo Yönlendirme Bilgisayarı'nı neredeyse tamamen tek tür çipten kurdu: her birinde iki tane üç girişli NOR kapısı bulunan yaklaşık 2.800 entegre. 1971'de Intel 4004 işlemcisinde 2.300 transistör vardı; 2020'de Apple M1'de 16 milyar. Aradaki fark yedi milyon kat, ama ilke aynı: sayfanın solundaki düğmelerle kurabileceğin kapılar, yalnızca çok daha küçük ve çok daha hızlı.",
  ],
  core: [
    {
      heading: "0 ve 1 birer voltajdır",
      body:
        "Sayfadaki LED'in yanında yazan <strong>1 (YÜKSEK)</strong> ve <strong>0 (DÜŞÜK)</strong> ifadeleri gerçek bir mühendislik sözleşmesidir. Klasik 5 voltluk TTL ailesinde bir kapı, girişinde 0,8 V'un altını 'düşük', 2,0 V'un üstünü 'yüksek' sayar; aradaki bant tanımsızdır ve iyi bir tasarımcı oraya hiç girmez. Bu aralık, parazite karşı bir güvenlik payıdır: sinyal biraz bozulsa da anlam bozulmaz. Dijital devrenin bütün gücü buradadır: analog dünyadaki sonsuz ara değeri iki kutuya indirger, bu yüzden bin kapıdan geçen bir sinyal bin kapı sonra da aynı sinyaldir. Modern işlemci çekirdekleri 1 voltun altında çalışır ama fikir değişmez.",
      formula: "V ≤ 0,8 V → 0,  V ≥ 2,0 V → 1  (TTL)",
      formulaNote: "Eşik değerleri çip ailesine göre değişir; değişmeyen şey, aradaki 'yasak bölge'nin varlığıdır.",
    },
    {
      heading: "Yedi kapı, tek bir tablo",
      body:
        "Bir kapıyı tanımlayan şey biçimi değil, <strong>doğruluk tablosudur</strong>: her giriş birleşimi için çıkışın ne olduğu. İki girişle 2² = 4 satır vardır; sayfanın sağ panelindeki tablo tam bu dört satırı, A'yı önce değiştirerek 00, 01, 10, 11 sırasında yazar. AND yalnızca son satırda 1 verir, OR yalnızca ilk satırda 0, XOR girişler farklıyken 1. NAND, NOR ve XNOR ise bu üçünün tersidir; sondaki 'N' çıkışın başına bir değil işareti koyar. Dört satırın her birine 0 ya da 1 yazabildiğine göre iki girişli olası kapı sayısı 2⁴ = 16'dır; sayfadaki altı iki girişli kapı bunların en kullanışlı altısıdır. Geri kalan onu da bunlardan kurabilirsin.",
      formula: "AND: A·B   OR: A+B   XOR: A⊕B   NOT: Ā",
      formulaNote: "Boole cebrinde 1 + 1 = 1'dir: 'veya' işleminde iki doğru, yine doğru eder; 2 diye bir değer yoktur.",
    },
    {
      heading: "De Morgan ve NAND'ın gizli gücü",
      body:
        "Augustus De Morgan'ın (1806–1871) iki yasası, değil işaretini bir çarpımın üzerinden geçirirken çarpımı toplama çevirir ve tersi. Bu, NAND'ı özel yapar: aynı NAND hem 'A ve B'nin değili' hem de 'A'nın değili veya B'nin değili'dir. İki girişini birbirine bağlarsan NOT olur; arkasına bir NOT koyarsan AND; girişlerine birer NOT koyarsan OR. Yani yalnızca NAND'larla bütün 16 kapı, onlardan da her devre kurulabilir; buna <strong>işlevsel tamlık</strong> denir. Charles Sanders Peirce bunu 1880'de NOR için fark etmişti ama yayımlamadı; Henry Sheffer 1913'te yayımladı ve NAND'ın cebirdeki simgesi hâlâ 'Sheffer çizgisi' diye anılır. Fabrikalar bu yüzden NAND'ı sever: CMOS teknolojisinde bir NAND yalnızca 4 transistördür, AND ise NAND artı NOT, yani 6.",
      formula: "¬(A·B) = Ā + B̄    ¬(A+B) = Ā · B̄",
      formulaNote: "İlk eşitlik NAND'ın iki yüzüdür. Sayfada bir NAND ile bir NOT'u art arda bağlayıp AND tablosunu geri alabilirsin.",
    },
    {
      heading: "Toplama yapan kapılar",
      body:
        "İkilik sayılarda bir basamağı toplamak dört durumdur: 0+0=0, 0+1=1, 1+0=1, 1+1=10. Toplam basamağı tam olarak XOR'un tablosudur, elde basamağı ise AND'ın. İki girişli bu çifte <strong>yarım toplayıcı</strong> denir. Bir önceki basamaktan gelen eldeyi de hesaba katan <strong>tam toplayıcı</strong> için iki yarım toplayıcıyı art arda koyup iki eldeyi bir OR ile birleştirmek yeter: beş kapı. Dört tam toplayıcıyı yan yana dizdiğinde dört bitlik, altmış dördünü dizdiğinde işlemcindeki toplayıcı çıkar. Elde bir basamaktan ötekine dalga gibi yürüdüğü için buna 'dalgalı elde' toplayıcısı denir; hızlı işlemciler eldeyi önceden tahmin eden daha kurnaz devreler kullanır.",
      formula: "S = A ⊕ B ⊕ C<sub>giriş</sub>,   C<sub>çıkış</sub> = A·B + C<sub>giriş</sub>·(A ⊕ B)",
      formulaNote: "Yarım toplayıcı için C_giriş = 0 koy: S = A⊕B, C = A·B. Sayfada bu ikiliyi tam olarak kurabilirsin.",
    },
    {
      heading: "Döngüyü kapat, hafıza doğsun",
      body:
        "Buraya kadarki devrelerde sinyal hep soldan sağa aktı; girişler belliyse çıkış bellidir ve geçmişin önemi yoktur. Buna <strong>kombinasyonel</strong> devre denir. Bir kapının çıkışını geri dönüp kendi girişine ya da komşusununkine bağladığında ise kural bozulur. Sayfadaki <strong>SR Latch</strong> düğmesi iki NAND'ı çapraz bağlar: her birinin çıkışı ötekinin girişidir. S ve R ikisi de 1 iken devre iki kararlı durumdan birinde kalır ve neyi en son gördüğünü hatırlar. Bir bitlik bu bellek hücresi 1918'de William Eccles ve Frank Jordan'ın iki vakum tüpüyle kurduğu 'tetikleme devresi'nin torunudur; işlemcindeki her kaydedici, her önbellek hücresi bu fikrin üstüne kuruludur. Doğruluk tablosu artık yetmez: çıkış girişlere değil, girişlerin <em>tarihine</em> bağlıdır.",
      formula: "Q = NAND(S̄, Q̄),   Q̄ = NAND(Q, R̄)",
      formulaNote: "NAND kilidinde girişler 'etkin düşük'tür: S̄ = 0 kurar (Q = 1), R̄ = 0 sıfırlar, ikisi 1 ise tutar, ikisi 0 ise yasak (iki çıkış da 1).",
    },
  ],
  lab: {
    intro:
      "Sol şeritteki <strong>Giriş Pini</strong> düğmesi tuvale sarı bir pin ekler; pine tıkladıkça değeri 0 ile 1 arasında değişir. <strong>AND, OR, NOT, NAND, NOR, XOR, XNOR</strong> düğmeleri birer kapı ekler; yeni kapı, henüz bir yere bağlanmamış giriş pinlerine kendiliğinden bağlanır. Elle bağlamak için bir bileşenin sağındaki çıkış dairesine tıkla, sonra hedef kapının solundaki giriş dairesine tıkla. Kapılar sürüklenir; çift tıklama bileşeni siler. Sağdaki <strong>Doğruluk Tablosu</strong> daima en son eklenen kapının tablosunu, <strong>Canlı Çıkış</strong> LED'i o kapının o anki değerini gösterir. Alttaki <strong>Devreyi Temizle</strong> tuvali boşaltır. Dürüst bir not: bu satırlar yazılırken sayfada bir hata vardı; giriş pinine tıklamak pinin üstündeki sayıyı değiştiriyor ama bu değer kapılara ulaşmıyordu, kapılar her girişi 0 sayıyordu. Birinci deney bu haliyle de çalışır; öteki üçünde 'Gözle' satırını, hata giderilene kadar kâğıtta doğrula.",
    experiments: [
      {
        title: "Boş kapı hangi değeri söyler?",
        predict: "Hiçbir giriş bağlı değilken hangi kapılar 1 (YÜKSEK) verir? Yedi kapıyı iki gruba ayırmayı dene: 'girişleri 0 sayınca 1 veren' ve 'vermeyen'.",
        do: "Devreyi Temizle'ye bas. Sol şeritten yalnızca AND ekle, LED'i ve tabloyu oku. Tekrar temizle, bu kez OR; sonra sırayla XOR, NOT, NAND, NOR, XNOR ile aynı şeyi yap.",
        observe: "AND, OR ve XOR için LED söner, tabloda tek satırlık '0' görünür. NOT, NAND, NOR ve XNOR için LED yanar, tablo '1' yazar. Giriş pini olmadığından tabloda A ve B sütunları yoktur, yalnızca Çıkış.",
        explain: "Sayfa bağlı olmayan bir girişi 0 kabul eder; 0 ve 0 için AND, OR, XOR sıfır, tersleri bir verir. Gerçek bir çipte boş bırakılan 'yüzen' giriş belirsizdir; TTL'de genellikle 1'e, CMOS'ta rastgele bir değere kayar. Bu yüzden mühendisler kullanılmayan girişleri hep bir yere bağlar.",
      },
      {
        title: "AND'den NAND'a tek adım",
        predict: "AND'ın arkasına bir NOT koyarsan tablonun hangi satırları değişir? Hepsi mi, bir tanesi mi?",
        do: "Devreyi Temizle, iki Giriş Pini ve bir AND ekle; AND iki pine kendiliğinden bağlanır. Şimdi NOT ekle: henüz bağlı değil. AND'ın sağındaki çıkış dairesine, sonra NOT'un solundaki giriş dairesine tıkla.",
        observe: "AND eklendiğinde tablo 00→0, 01→0, 10→0, 11→1 yazar. NOT bağlanmadan eklendiğinde tablo dört satırda da 1 gösterir; çünkü NOT'un girişi boşta, yani 0'dır. Bağlantıyı yaptığında tablo 1, 1, 1, 0 olur: NAND'ın tablosu.",
        explain: "Dört satırın hepsi değişir, ama 'ters çevrilerek' değişir: NOT her satırı tek tek tersler. Tablo son eklenen kapıya, yani NOT'a bakar; aradaki AND'ın değeri kapı gövdesindeki küçük sayıda görünür. NAND = NOT(AND) eşitliğini tabloyla kanıtlamış oldun.",
      },
      {
        title: "Yarım toplayıcı: 1 + 1 = 10",
        predict: "A = 1 ve B = 1 iken XOR ne verir, AND ne verir? İkisini yan yana yazınca hangi ikilik sayı çıkar?",
        do: "Devreyi Temizle, iki Giriş Pini ekle, önce AND ekle (kendiliğinden bağlanır), sonra XOR ekle. XOR boşta kalır: A'nın çıkış dairesinden XOR'un üst giriş dairesine, B'ninkinden alt giriş dairesine birer bağlantı çek. Pinlere tıklayarak dört durumu gez.",
        observe: "Tablo XOR'u gösterir: 00→0, 01→1, 10→1, 11→0. AND gövdesindeki küçük sayı eldeyi verir: yalnızca 11'de 1. A = B = 1 iken XOR 0, AND 1: elde 1, toplam 0, yani ikilikte '10', onlukta 2.",
        explain: "Toplam basamağı XOR, elde basamağı AND'dır; iki kapı birlikte tek basamaklı ikilik toplama yapar. Sayfa tabloyu yalnızca son kapı için çizdiği için XOR'u sona ekledin; eldeyi kapı gövdesinden okumak gerekir. Dört bitlik toplayıcı için bu çifti dört kez tekrarlayıp eldeleri zincirlersin.",
      },
      {
        title: "SR kilidi: tablonun bittiği yer",
        predict: "İki NAND çapraz bağlıyken S = 0 ve R = 0 verirsen iki çıkış da ne olur? İpucu: NAND'ın girişlerinden biri 0 ise çıkışı kesindir.",
        do: "Sol şeritten SR Latch (Flip-Flop) düğmesine bas. Tuvalde iki giriş pini (ikisi de 0) ve birbirine çapraz bağlı iki NAND belirir. İki NAND'ın gövdesindeki sayıları oku; sonra kâğıda S̄ = 1, R̄ = 0 ve S̄ = R̄ = 1 durumlarını adım adım çöz.",
        observe: "Sayfada iki NAND da 1 gösterir: NAND kilidinde her iki girişin 0 olması 'yasak' durumdur ve gerçek devrede de iki çıkış birden 1 olur. Pinleri değiştirdiğinde sayfanın hesaplayıcısı döngüyü 'geri dönen hattı bir kez 0 say' kuralıyla kırdığı için tutma davranışını gösteremez; kâğıtta S̄ = 1, R̄ = 0 için Q = 0, Q̄ = 1 bulursun ve S̄ = R̄ = 1'e geçince bu değerler kendi kendini besleyerek kalır.",
        explain: "Geri besleme, devreye geçmiş kazandırır: çıkış girişi, giriş çıkışı belirler ve iki tutarlı çözümden biri seçilir. Doğruluk tablosu anlık bir fotoğraftır; kilidi anlatmak için zamana, yani bir önceki duruma ihtiyaç vardır. Bu sayfanın hesaplayıcısı tek geçişli olduğu için fotoğraf çeker, film değil.",
      },
    ],
  },
  wow: [
    {
      title: "Yüzyılın en önemli yüksek lisans tezi",
      body:
        "Shannon tezini 1937'de, 21 yaşında yazdı; 1938'de Amerikan Elektrik Mühendisleri Enstitüsü'nün dergisinde yayımlandı. Psikolog Howard Gardner yıllar sonra bu çalışmayı 'muhtemelen yüzyılın en önemli ve en ünlü yüksek lisans tezi' diye andı. Shannon on yıl sonra bir kez daha dünyayı değiştirecekti: 1948'de bilgiyi ölçmenin birimi olan 'bit'i tanımladı.",
    },
    {
      title: "Ay'a tek tür kapıyla gidildi",
      body:
        "Apollo Yönlendirme Bilgisayarı'nın Block II sürümü yaklaşık 2.800 entegre devreden kuruluydu ve her entegrede iki tane üç girişli NOR kapısı vardı; mantığın tamamı bu tek tür çipti. Yaklaşık 32 kilogram ağırlığındaki bu kutu, 2.048 kelimelik silinebilir bellek ve 36.864 kelimelik sabit 'halat' bellekle 1969'da astronotları Ay yüzeyine indirdi. Bugün bir kart okuyucunun içindeki çip daha güçlü.",
    },
    {
      title: "Beş girişten dört milyar devre",
      body:
        "n girişli bir doğruluk tablosunun 2ⁿ satırı vardır ve her satıra 0 ya da 1 yazılabilir. Olası devre sayısı bu yüzden 2 üzeri 2ⁿ'dir: iki girişle 16, üç girişle 256, dört girişle 65.536, beş girişle 4.294.967.296. Altı girişte sayı 18 kentilyonu geçer. Sayfadaki yedi kapı, bu uçsuz bucaksız kümenin tamamını kurmaya yeter.",
    },
  ],
  worked: {
    title: "Dört bitlik toplama: 0110 + 0111",
    prompt:
      "Dört tam toplayıcıdan kurulu bir devreyle 0110 (6) ile 0111 (7) sayılarını topla. Her basamakta toplam S ve elde C değerlerini kapı kapı izle; sonucu onluk sayıya çevir.",
    steps: [
      "Tam toplayıcının iki formülünü yaz: S = A ⊕ B ⊕ C<sub>g</sub> ve C<sub>ç</sub> = A·B + C<sub>g</sub>·(A ⊕ B). En sağdaki basamaktan başla; ilk elde girişi C<sub>g</sub> = 0.",
      "Basamak 0: A = 0, B = 1, C<sub>g</sub> = 0. A ⊕ B = 1, S = 1 ⊕ 0 = 1. Elde: A·B = 0, C<sub>g</sub>·(A⊕B) = 0, C<sub>ç</sub> = 0.",
      "Basamak 1: A = 1, B = 1, C<sub>g</sub> = 0. A ⊕ B = 0, S = 0. Elde: A·B = 1, C<sub>ç</sub> = 1. Elde bir sonraki basamağa 'dalga' gibi yürür.",
      "Basamak 2: A = 1, B = 1, C<sub>g</sub> = 1. A ⊕ B = 0, S = 0 ⊕ 1 = 1. Elde: A·B = 1, C<sub>ç</sub> = 1.",
      "Basamak 3: A = 0, B = 0, C<sub>g</sub> = 1. A ⊕ B = 0, S = 1. Elde: 0 + 1·0 = 0. Sonuç soldan sağa 1101; en son elde 0 olduğundan taşma yok.",
    ],
    result:
      "1101<sub>2</sub> = 8 + 4 + 0 + 1 = 13, yani 6 + 7. Dört tam toplayıcı 20 kapı kullanır (her birinde 2 XOR, 2 AND, 1 OR); eldenin dört basamak boyunca sırayla yürümesi, bu tasarımın hızını sınırlayan şeydir.",
  },
  misconceptions: [
    {
      myth: "OR, günlük dildeki 'ya o ya bu' demektir.",
      truth:
        "Kapı dünyasında OR kapsayıcıdır: girişlerin biri <em>ya da ikisi</em> 1 olunca çıkış 1'dir; 11 satırında da 1 verir. 'Yalnızca biri' anlamını XOR taşır ve tam da bu yüzden toplama yapan kapı XOR'dur: 1 + 1'in toplam basamağı 0'dır.",
    },
    {
      myth: "Boole cebrinde 1 + 1 = 2'dir.",
      truth:
        "Burada + işareti OR demektir ve 1 + 1 = 1'dir; 2 diye bir değer yoktur. Çarpma da AND'dır: 1·1 = 1, 1·0 = 0. Sayılarla değil doğruluk değerleriyle hesap yaptığını unutma; ikilik sayıların toplanması ayrı bir iştir ve XOR ile AND'ın birlikte çalışmasını gerektirir.",
    },
    {
      myth: "Bağlanmamış giriş 'hiçbir şey' demektir, devreyi etkilemez.",
      truth:
        "Sayfa boş girişi 0 sayar; birinci deneyde NOT, NAND, NOR ve XNOR'un bu yüzden boşken bile 1 verdiğini gördün. Gerçek çiplerde boş bırakılan giriş belirsiz bir voltajda 'yüzer' ve rastgele davranabilir; veri sayfaları kullanılmayan girişleri bir yere bağlamayı şart koşar.",
    },
    {
      myth: "Doğruluk tablosu her devreyi tam olarak anlatır.",
      truth:
        "Yalnızca kombinasyonel devreleri anlatır. Geri beslemeli bir devrede, SR kilidinde olduğu gibi, aynı girişler için iki farklı çıkış mümkündür ve hangisinin görüneceği geçmişe bağlıdır. Bu devreler için durum tablosu ya da zaman diyagramı gerekir.",
    },
  ],
  glossary: [
    { term: "Boole cebri", definition: "Değişkenlerin yalnızca 0 ve 1 olabildiği, AND, OR ve NOT işlemleriyle çalışan cebir; George Boole, 1847." },
    { term: "Doğruluk tablosu", definition: "Bir devrenin her olası giriş birleşimi için çıkışını listeleyen tablo; n giriş için 2ⁿ satır." },
    { term: "Mantık kapısı", definition: "Bir ya da iki ikili girişten tek bir ikili çıkış üreten en küçük devre birimi; transistörlerle gerçeklenir." },
    { term: "İşlevsel tamlık", definition: "Bir kapı kümesinin bütün Boole işlevlerini kurabilmesi; NAND tek başına, NOR tek başına bu özelliğe sahiptir." },
    { term: "De Morgan yasaları", definition: "¬(A·B) = Ā + B̄ ve ¬(A+B) = Ā·B̄; değil işaretini içeri alırken AND ile OR yer değiştirir." },
    { term: "Yarım toplayıcı", definition: "İki biti toplayan devre: toplam = A ⊕ B, elde = A·B; elde girişi almaz." },
    { term: "Kombinasyonel devre", definition: "Çıkışı yalnızca o anki girişlere bağlı olan, geri beslemesiz devre; doğruluk tablosuyla tam anlatılır." },
    { term: "SR kilidi (latch)", definition: "Çapraz bağlı iki NAND ya da NOR'dan oluşan bir bitlik bellek; Set ve Reset girişleriyle kurulur, girişler pasifken değerini tutar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede kapıları tablolarıyla tanırsın; üniversitede 'Sayısal Tasarım' dersi önce bu tabloları en az kapıyla kurmanın yollarını öğretir: <strong>Karnaugh haritaları</strong> ve Quine–McCluskey yöntemiyle sadeleştirme, çarpımlar toplamı ve toplamlar çarpımı biçimleri. Sonra zaman girer işin içine: her kapının bir yayılma gecikmesi vardır, bugün onlarca pikosaniye; 3 GHz'lik bir işlemcide bir saat vuruşu yalnızca üçte bir nanosaniyedir ve bir vuruş içinde sinyalin kaç kapıdan geçebileceği tasarımın hızını belirler. Dalgalı elde toplayıcının yavaşlığı, eldeyi önceden hesaplayan 'ileri bakışlı elde' devreleriyle aşılır.",
      "Kilitten flip-flop'a, flip-flop'tan kaydedicilere ve <strong>sonlu durum makinelerine</strong> geçtiğinde, Biçimsel Diller sayfasındaki otomatlarla aynı nesneyi kurduğunu görürsün: durumlar flip-flop'larda, geçişler kombinasyonel mantıkta. Bir işlemci de budur: toplayıcı, kaydediciler ve bir durum makinesinden oluşan veri yolu. Üniversitede bunu artık elle çizmez, Verilog ya da VHDL gibi donanım tanımlama dilleriyle yazıp bir FPGA üzerinde çalıştırırsın; MIT'nin 6.004 dersi ilk haftalarda tam bu yolu izler. Shannon'ın devreyle cebir arasındaki köprüsü, bugün yazılımla donanım arasındaki köprüdür.",
    ],
    topics: ["Karnaugh haritaları ve sadeleştirme", "Yayılma gecikmesi ve kritik yol", "Flip-flop'lar ve saatli ardışıl mantık", "Sonlu durum makineleri", "Verilog / VHDL ve FPGA", "CMOS transistör düzeyinde kapı tasarımı", "ALU ve veri yolu tasarımı"],
  },
  quiz: [
    {
      question: "Üç girişli bir mantık devresinin doğruluk tablosunda kaç satır bulunur?",
      options: ["3", "6", "8", "9"],
      answer: 2,
      explanation: "Her giriş 0 ya da 1 olabildiği için birleşim sayısı 2³ = 8'dir. Sayfa iki girişe kadar tabloyu çizer; üçüncü pini eklediğinde '≥3 giriş' uyarısı görürsün; sekiz satırı kâğıtta yazmak zorundasın.",
    },
    {
      question: "Hangi kapı türünden yeterince alırsan, başka hiçbir kapı kullanmadan bütün devreleri kurabilirsin?",
      options: ["AND", "OR", "NAND", "XOR"],
      answer: 2,
      explanation: "NAND (ve NOR) işlevsel olarak tamdır: girişleri birleştirilmiş NAND bir NOT'tur, NOT'lu NAND bir AND, girişleri NOT'lanmış NAND bir OR. AND ve OR tek başlarına değil üretemez; XOR ise sabit 1 üretemez.",
    },
    {
      question: "NAND'lardan kurulu SR kilidinde her iki giriş de 1 iken çıkış ne yapar?",
      options: ["Daima 1 olur", "Daima 0 olur", "Önceki değerini korur", "Belirsiz, iki çıkış da 1 olur"],
      answer: 2,
      explanation: "NAND kilidinde girişler etkin düşüktür: 0 vermek kurar ya da sıfırlar, ikisi birden 1 ise devre son durumunu tutar; hafıza budur. İki girişin birden 0 olması ise yasak durumdur: sayfada SR Latch'i yüklediğinde gördüğün 'iki çıkış da 1' hâli.",
    },
  ],
  next: [
    { href: "mantik-kapilari.html", title: "Mantık Kapıları", why: "Tek bir kapıyı yakından incele: simgesi, iki girişi ve tablosu; buradaki devreleri kurmadan önce parçaları tanı." },
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Sistemleri ve Mimarisi", why: "Toplayıcı, kaydedici ve durum makinesinin bir işlemciye nasıl dönüştüğünü gör." },
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata", why: "Flip-flop'ların tuttuğu 'durum' kavramının matematiksel karşılığı: sonlu durum makineleri." },
    { href: "makine-dili-assembly-c.html", title: "Makine Dili → Assembly → C", why: "Kapıların çalıştırdığı 0 ve 1'lerin bir programa nasıl dönüştüğünü izle." },
  ],
  sources: [
    { title: "Wikipedia · Logic gate", url: "https://en.wikipedia.org/wiki/Logic_gate", note: "Kapı türleri, simgeler, işlevsel tamlık ve transistör düzeyinde gerçekleme (İngilizce)." },
    { title: "Wikipedia · A Symbolic Analysis of Relay and Switching Circuits", url: "https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits", note: "Shannon'ın 1937 tezi: Boole cebrinin devreye nasıl uygulandığı ve etkisi." },
    { title: "Wikipedia · Apollo Guidance Computer", url: "https://en.wikipedia.org/wiki/Apollo_Guidance_Computer", note: "NOR kapılarından kurulu Ay bilgisayarı: çip sayısı, bellek ve ağırlık verileri." },
    { title: "MIT OpenCourseWare · 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", note: "Kapılardan işlemciye uzanan lisans dersi; ders notları ve videolar açık (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
