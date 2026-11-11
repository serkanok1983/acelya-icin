window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mantik-devresi"] = {
  slug: "mantik-devresi",
  title: "Mantık Devresi: Kapılardan Hesaplamaya",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 30,
  tagline:
    "Yedi küçük kapı, iki voltaj seviyesi ve bir doğruluk tablosu: 1847'de bir ayakkabıcının oğlunun bulduğu cebir, 1937'de 21 yaşındaki bir öğrencinin elinde devreye dönüştü. Bugün cebindeki telefonun içinde milyarlarca kopyası var.",
  hook:
    "Elinde yalnızca tek çeşit parça olsa, hepsi birbirinin tıpatıp aynısı, bunlardan bir hesap makinesi yapabilir misin? Yapabilirsin; parçanın adı NAND. Apollo'yu Ay'a götüren bilgisayarın mantığı da neredeyse bütünüyle tek tür kapıdan, binlerce NOR'dan örülmüştü. Bu sayfadaki yedi düğme aslında yedi ayrı fikir değil, tek bir fikirdir: 0 ile 1'in birbirine nasıl dönüştüğü.",
  bigIdea:
    "Geri beslemesiz her mantık devresi bir <strong>doğruluk tablosudur</strong>: n giriş için 2<sup>n</sup> satır, her satırda tek bir çıkış. Kapıları birleştirmek tabloları birleştirmektir; çıkışı girişe geri bağladığın an tablo yetmez olur ve <em>hafıza</em> doğar.",
  story: [
    "George Boole 1815'te İngiltere'nin Lincoln kentinde bir ayakkabıcının oğlu olarak doğdu; üniversiteye hiç gitmedi, Latinceyi ve matematiği kendi başına öğrendi, on altı yaşında öğretmenlik yaparak ailesini geçindirdi. 1847'de <em>The Mathematical Analysis of Logic</em>, 1854'te <em>An Investigation of the Laws of Thought</em> adlı kitaplarında garip bir cebir önerdi: değişkenler yalnızca 0 ya da 1 olabiliyor, x·x = x oluyor, 've' çarpma gibi, 'veya' toplama gibi davranıyordu. Boole bunu düşüncenin yasalarını yazmak için yapmıştı; aklında devre diye bir şey yoktu. 1849'da Cork'taki Queen's College'ın ilk matematik profesörü oldu; 1864'te, 49 yaşında, yağmur altında derse yürüdükten sonra hastalanıp öldü. Cebri yaklaşık seksen yıl boyunca daha çok mantıkçıların ve matematikçilerin konusu olarak kaldı.",
    "1937'de MIT'de yüksek lisans yapan 21 yaşındaki Claude Shannon, Vannevar Bush'un diferansiyel analizörüne, onun röleli denetim devresine bakıyordu. Röle, bir elektromıknatısın çektiği anahtardır: akım var ya da yok, kontak kapalı ya da açık. Shannon lisansta gördüğü Boole cebrini hatırladı ve iki şeyin aynı olduğunu fark etti: seri bağlı iki anahtar 'VE', paralel bağlı iki anahtar 'VEYA' demekti. Tezi <em>A Symbolic Analysis of Relay and Switching Circuits</em> 1938'de yayımlandı ve devre tasarımını deneme yanılmadan cebire çevirdi: artık bir devreyi önce kâğıtta sadeleştirip sonra kurabiliyordun. Aynı yıllarda Berlin'de Konrad Zuse, Shannon'dan habersiz, yaklaşık 2600 röleyle çalışan Z3'ü kurdu (1941); saniyede 5–10 vuruşluk saatiyle bu makine, programla yönetilen ilk bilgisayarlardan biriydi.",
    "Röle yavaş ve gürültülüydü. 1947'de Bell Laboratuvarları'nda transistör bulundu; 1958'de Texas Instruments'ta Jack Kilby bir transistörü, dirençleri ve kondansatörü tek bir germanyum parçasının üstünde birleştirerek ilk tümleşik devreyi yaptı ve 2000 Nobel Fizik Ödülü'nü paylaştı. 1960'larda MIT Instrumentation Laboratory, Apollo Yönlendirme Bilgisayarı'nın mantığını neredeyse bütünüyle tek tür çipten kurdu: her birinde iki tane üç girişli NOR kapısı bulunan yaklaşık 2800 entegre. 1971'de Intel 4004 işlemcisinde 2300 transistör vardı; 2020'de Apple M1'de 16 milyar. Aradaki fark yedi milyon kat, ama ilke aynı: sayfanın solundaki düğmelerle kurduğun kapılar, yalnızca çok daha küçük ve çok daha hızlı.",
  ],
  core: [
    {
      heading: "0 ve 1 birer voltaj aralığıdır",
      body:
        "Sayfadaki LED'in yanında yazan <strong>1 (YÜKSEK)</strong> ve <strong>0 (DÜŞÜK)</strong> gerçek bir mühendislik sözleşmesidir. Klasik 5 voltluk TTL ailesinde bir kapı, girişinde 0.8 V'un altını 'düşük', 2.0 V'un üstünü 'yüksek' sayar; aradaki bant tanımsızdır. Aynı ailenin çıkışları ise daha sıkı bir söz verir: düşükken en çok 0.4 V, yüksekken en az 2.4 V. Aradaki 0.4 voltluk fark <strong>gürültü payıdır</strong>: hat üzerinde sinyale 0.4 V'a kadar parazit binse bile sonraki kapı onu doğru okur ve çıkışında yeniden temiz bir seviye üretir. Dijital devrenin bütün gücü buradadır: analog dünyadaki sonsuz ara değeri iki kutuya indirger, bu yüzden bin kapıdan geçen bir bit bin kapı sonra da aynı bittir. Modern işlemci çekirdekleri 1 volt dolayında çalışır ama fikir değişmez.",
      formula: "Giriş: V ≤ 0.8 V → 0,  V ≥ 2.0 V → 1   ·   Gürültü payı = 0.8 − 0.4 = 2.4 − 2.0 = 0.4 V  (TTL)",
      formulaNote: "Eşikler çip ailesine göre değişir; değişmeyen şey, çıkış aralığının giriş aralığından dar tutulması ve aradaki 'yasak bölge'dir.",
    },
    {
      heading: "Yedi kapı, tek bir tablo",
      body:
        "Bir kapıyı tanımlayan şey biçimi değil, <strong>doğruluk tablosudur</strong>: her giriş birleşimi için çıkışın ne olduğu. İki girişle 2² = 4 satır vardır; sayfanın sağ panelindeki tablo bu dört satırı, B'yi en hızlı değiştirerek 00, 01, 10, 11 sırasıyla yazar. AND yalnızca son satırda 1 verir, OR yalnızca ilk satırda 0, XOR girişler farklıyken 1. NAND, NOR ve XNOR bu üçünün tersidir; baştaki 'N' çıkışın önüne bir değil koyar. Dört satırın her birine 0 ya da 1 yazabildiğine göre iki girişli olası işlev sayısı 2⁴ = 16'dır; sayfadaki altı iki girişli kapı bunların en kullanışlı altısıdır, geri kalan on tanesi de bunlardan kurulur.",
      formula: "AND: A·B   OR: A+B   XOR: A⊕B   NOT: <span class=ov>A</span>",
      formulaNote: "Boole cebrinde 1 + 1 = 1'dir: 'veya' işleminde iki doğru yine doğru eder; 2 diye bir değer yoktur.",
    },
    {
      heading: "De Morgan ve NAND'ın gizli gücü",
      body:
        "Augustus De Morgan'ın (1806–1871) iki yasası, değil işaretini bir çarpımın içine taşırken çarpımı toplama, toplamı çarpıma çevirir. Bu, NAND'ı özel yapar: aynı kapı hem 'A ve B'nin değili' hem de 'A'nın değili veya B'nin değili'dir. İki girişini birbirine bağlarsan NOT olur; arkasına bir NOT koyarsan AND; girişlerine birer NOT koyarsan OR. Bu üçü neden her şeye yeter? Çünkü her doğruluk tablosu, çıkışın 1 olduğu satırların tek tek AND ile yazılıp hepsinin OR'lanmasıyla kurulabilir (çarpımlar toplamı); bu iş yalnızca AND, OR ve NOT ister. Yani yalnızca NAND'larla her tablo, dolayısıyla her kombinasyonel devre kurulur; buna <strong>işlevsel tamlık</strong> denir. Charles Sanders Peirce bunu 1880 dolaylarında fark etmiş ama yayımlamamıştı; Henry Sheffer 1913'te yayımladı ve NAND'ın cebirdeki simgesi bugün 'Sheffer çizgisi' diye anılır. Fabrikalar da NAND'ı sever: CMOS teknolojisinde iki girişli bir NAND 4 transistördür, AND ise NAND artı NOT, yani 6.",
      formula: "¬(A·B) = <span class=ov>A</span> + <span class=ov>B</span>    ¬(A+B) = <span class=ov>A</span> · <span class=ov>B</span>",
      formulaNote: "İlk eşitlik NAND'ın iki yüzüdür. İkinci deney iki yanı ayrı ayrı kurup tablolarını karşılaştırır.",
    },
    {
      heading: "Toplama yapan kapılar",
      body:
        "İkilik sayılarda tek basamağı toplamak dört durumdur: 0+0=0, 0+1=1, 1+0=1, 1+1=10. Toplam basamağı tam olarak XOR'un tablosudur, elde basamağı ise AND'in. Bu çifte <strong>yarım toplayıcı</strong> denir. Bir önceki basamaktan gelen eldeyi de hesaba katan <strong>tam toplayıcı</strong> için iki yarım toplayıcıyı art arda koyup iki eldeyi bir OR ile birleştirmek yeter: beş kapı. Dört tam toplayıcıyı yan yana dizdiğinde dört bitlik, altmış dördünü dizdiğinde işlemcindeki toplayıcının en yalın hâli çıkar. Elde bir basamaktan ötekine dalga gibi yürüdüğü için buna 'dalgalı elde' toplayıcısı denir. Bedeli zamandır: her kapı sonucunu küçük bir τ gecikmesiyle verir ve n bitlik zincirde son elde ancak (2n + 1)·τ sonra kesinleşir. Hızlı işlemciler bu yüzden eldeyi önceden hesaplayan daha kurnaz devreler kullanır.",
      formula: "S = A ⊕ B ⊕ C<sub>giriş</sub>,   C<sub>çıkış</sub> = A·B + C<sub>giriş</sub>·(A ⊕ B)",
      formulaNote: "Yarım toplayıcı için C_giriş = 0 koy: S = A⊕B, C = A·B. Üçüncü deney bu ikiliyi sayfada kurar.",
    },
    {
      heading: "Döngüyü kapat, hafıza doğsun",
      body:
        "Buraya kadarki devrelerde sinyal hep soldan sağa aktı; girişler belliyse çıkış bellidir ve geçmişin önemi yoktur. Buna <strong>kombinasyonel</strong> devre denir. Bir kapının çıkışını geri dönüp komşusunun girişine, onunkini de berikine bağladığında kural bozulur. Sayfadaki <strong>SR Kilidi (NAND)</strong> düğmesi iki NAND'ı böyle çapraz bağlar. Girişler etkin düşüktür: A pini <span class=ov>S</span>, B pini <span class=ov>R</span> rolündedir. İkisi de 1 iken denklemlerin iki ayrı tutarlı çözümü vardır: (Q, <span class=ov>Q</span>) = (1, 0) ve (0, 1). Devre hangisine en son itildiyse orada kalır; bir bitlik bellek budur. Bu hücre, 1918'de William Eccles ve Frank Jordan'ın iki vakum tüpüyle kurduğu tetikleme devresinin torunudur; işlemcindeki her kaydedici ve önbellek hücresi aynı fikrin üstüne kuruludur. Böyle <strong>ardışıl</strong> devrelerde çıkış girişlere değil, girişlerin <em>tarihine</em> bağlıdır.",
      formula: "Q = NAND(<span class=ov>S</span>, <span class=ov>Q</span>),   <span class=ov>Q</span> = NAND(Q, <span class=ov>R</span>)",
      formulaNote: "<span class=ov>S</span> = 0 kurar (Q = 1), <span class=ov>R</span> = 0 sıfırlar (Q = 0), ikisi 1 ise tutar; ikisi birden 0 ise iki çıkış da 1 olur ve 'biri ötekinin tersi' sözü bozulur (yasak durum).",
    },
  ],
  lab: {
    intro:
      "Sayfa bir AND kapısına bağlı iki giriş piniyle açılır. Sol şeritteki <strong>Giriş Pini</strong> düğmesi tuvalin soluna yeni bir pin ekler; pinler eklenme sırasıyla A, B, C… adını alır. Pine tıklayınca değeri 0 ile 1 arasında değişir, basılı tutup sürüklersen yeri değişir. <strong>AND, OR, NOT, NAND, NOR, XOR, XNOR</strong> düğmeleri birer kapı ekler; yeni kapı, çıkışı henüz hiçbir yere gitmeyen pinlere kendiliğinden bağlanır. Elle bağlamak için bir bileşenin sağındaki çıkış dairesine basıp sürükle ve hedef kapının solundaki giriş dairesinin üstünde bırak; dolu bir girişe çekilen yeni tel eskisinin yerini alır. Çift tıklama bileşeni siler. Her kapının adının altındaki küçük sayı o kapının çıkışıdır; 1 taşıyan teller yeşil ve kalın çizilir. Sağdaki <strong>Doğruluk Tablosu</strong> en son eklenen kapının tablosunu (en çok iki pin için), <strong>Canlı Çıkış</strong> LED'i aynı kapının o anki değerini gösterir; üçüncü pini eklediğinde tablo yerine '≥3 giriş' yazar. <strong>Devreyi Temizle</strong> ve <strong>Tümünü Temizle</strong> tuvali boşaltır; <strong>Devreyi Kaydet</strong> ile <strong>Devreyi Yükle</strong> devreyi bu tarayıcıda saklar. Model idealdir: kapılar anında cevap verir, yayılma gecikmesi yoktur ve bağlanmamış giriş 0 sayılır.",
    experiments: [
      {
        title: "Boş kapı hangi değeri söyler?",
        predict: "Hiçbir girişi bağlı değilken hangi kapılar 1 (YÜKSEK) verir? Yedi kapıyı iki gruba ayır: 'girişleri 0 sayılınca 1 veren' ve 'vermeyen'.",
        do: "Devreyi Temizle'ye bas. Sol şeritten yalnızca AND ekle; LED'i ve tabloyu oku. Yeniden temizle, bu kez OR ekle; sonra sırayla XOR, NOT, NAND, NOR ve XNOR ile aynısını yap.",
        observe: "AND, OR ve XOR için LED söner ve '0 (DÜŞÜK)' yazar; NOT, NAND, NOR ve XNOR için yanar ve '1 (YÜKSEK)' yazar. Tuvalde pin olmadığından tabloda yalnızca 'Çıkış' sütunu ve tek satır vardır: 2⁰ = 1.",
        explain: "Sayfa bağlı olmayan girişi 0 kabul eder; 0 ve 0 için AND, OR, XOR sıfır, tersleri bir verir. Gerçek bir çipte boş bırakılan giriş belirsizdir: TTL'de çoğunlukla 1 gibi davranır, CMOS'ta ortamdaki parazite göre gezinir ve çipi gereksiz yere ısıtabilir. Bu yüzden kullanılmayan girişler hep bir yere bağlanır.",
      },
      {
        title: "De Morgan'ı tabloyla sına",
        predict: "A ve B'yi ayrı ayrı tersleyip OR'larsan dört satırda ne çıkar? Tek bir NAND'ın tablosuyla kaç satırda uyuşur?",
        do: "Devreyi Temizle, iki Giriş Pini ekle. Art arda iki NOT ekle: ilki A'ya, ikincisi B'ye kendiliğinden bağlanır. Sonra OR ekle; boşta kalır. İlk NOT'un çıkış dairesinden OR'un üst giriş dairesine, ikinci NOT'unkinden alt giriş dairesine birer tel çek. Tabloyu yaz. Sonra Devreyi Temizle, iki Giriş Pini ve tek bir NAND ekle; tabloyu karşılaştır.",
        observe: "İlk NOT'tan sonra tablo 1, 1, 0, 0 (A'nın tersi), ikincisinden sonra 1, 0, 1, 0 (B'nin tersi) olur. OR boştayken dört satır da 0'dır. Teller çekilince tablo 00→1, 01→1, 10→1, 11→0 yazar. Tek NAND'ın tablosu da 1, 1, 1, 0: dört satırın dördü de aynı.",
        explain: "İki devre her giriş için aynı çıkışı verdiğine göre aynı işlevdir: ¬(A·B) = <span class=ov>A</span> + <span class=ov>B</span>. Dört satırın tamamını denemek burada bir ispattır, çünkü başka giriş birleşimi yoktur. Üç kapılık devre ile tek kapının eşdeğer çıkması, sadeleştirmenin neden para ve zaman kazandırdığını da gösterir.",
      },
      {
        title: "Yarım toplayıcı: 1 + 1 = 10",
        predict: "A = 1 ve B = 1 iken XOR ne verir, AND ne verir? İkisini 'AND XOR' sırasıyla yan yana yazınca hangi ikilik sayı çıkar?",
        do: "Devreyi Temizle, iki Giriş Pini ekle, önce AND ekle (kendiliğinden bağlanır), sonra XOR ekle. XOR boşta kalır: A'nın çıkış dairesinden XOR'un üst giriş dairesine, B'ninkinden alt giriş dairesine birer tel çek. Pinlere tıklayarak dört durumu gez; her durumda AND ve XOR'un altındaki küçük sayıları oku.",
        observe: "Bağlanmadan önce tablo dört satırda 0 yazar; teller çekilince XOR'u gösterir: 00→0, 01→1, 10→1, 11→0. AND'in altındaki sayı yalnızca A = B = 1 iken 1 olur. O durumda XOR 0, AND 1'dir ve LED '0 (DÜŞÜK)' yazar: elde 1, toplam 0, yani ikilikte 10, onlukta 2.",
        explain: "Toplam basamağı XOR, elde basamağı AND'dir; iki kapı birlikte tek basamaklı ikilik toplama yapar. Sayfa tabloyu ve LED'i yalnızca son eklenen kapı için gösterdiğinden XOR'u sona ekledin; eldeyi AND'in gövdesinden okumak gerekir. Dört bitlik toplayıcı için bu fikri eldeyi de alan tam toplayıcıya genişletip dört kez zincirlersin; çözümlü örnek tam bunu yapıyor.",
      },
      {
        title: "SR kilidi: aynı giriş, iki farklı çıkış",
        predict: "A = B = 1 iken alttaki NAND'ın çıkışı kaçtır? Bu soruya girişlere bakarak cevap verilebilir mi, yoksa oraya nereden geldiğini de bilmek mi gerekir?",
        do: "Sol şeritten SR Kilidi (NAND) düğmesine bas: iki pin (A ve B, ikisi de 0) ve çapraz bağlı iki NAND belirir. Üstteki NAND Q, alttaki <span class=ov>Q</span>'dur; tablo ve LED alttakini gösterir. Sırayla tıkla: A (1,0 olur), B (1,1), A (0,1), yine A (1,1). Her adımda iki NAND'ın altındaki sayıları ve tablonun son satırını not et.",
        observe: "Açılışta (0,0) iki NAND da 1 gösterir. A = 1, B = 0: üst 0, alt 1. B'yi de 1 yapınca değişmez: üst 0, alt 1; tablonun 11 satırı 1 yazar. A = 0, B = 1: üst 1, alt 0, LED söner. A'yı yeniden 1 yapınca yine (1,1) durumundasın ama bu kez üst 1, alt 0 kalır ve tablonun 11 satırı 0'a dönmüştür.",
        explain: "Girişler iki seferde de aynıydı (1,1), çıkışlar farklı: kilit en son hangi girişin 0'a çekildiğini hatırlıyor. A'yı 0 yapmak kurar (Q = 1), B'yi 0 yapmak sıfırlar (Q = 0), ikisi 1 iken devre son durumunu kendi kendini besleyerek tutar. Tablonun 11 satırının geçmişe göre değişmesi, doğruluk tablosunun ardışıl devreyi anlatmaya yetmediğinin kanıtıdır. Sayfa her tıklamada değerleri bir önceki durumdan başlatıp kararlı hâle gelene kadar yeniden hesaplar; gerçek kilitte bu yerleşme birkaç kapı gecikmesi sürer ve (0,0)'dan iki girişi tam aynı anda 1 yaparsan hangi duruma düşeceği öngörülemez.",
      },
    ],
  },
  wow: [
    {
      title: "Yüzyılın en ünlü yüksek lisans tezi",
      body:
        "Shannon tezini 1937'de, 21 yaşında yazdı; 1938'de Amerikan Elektrik Mühendisleri Enstitüsü'nün dergisinde yayımlandı. Psikolog Howard Gardner 1985'te bu çalışmayı 'muhtemelen yüzyılın en önemli ve en ünlü yüksek lisans tezi' diye andı. Shannon on yıl sonra bir kez daha çığır açtı: 1948'deki makalesiyle bilgi kuramını kurdu ve bilginin ölçü birimine, meslektaşı John Tukey'nin önerdiği adı verdi: 'bit'.",
    },
    {
      title: "Ay'a tek tür kapıyla gidildi",
      body:
        "Apollo Yönlendirme Bilgisayarı'nın insanlı uçuşlarda kullanılan Block II sürümünde yaklaşık 2800 entegre devre vardı ve bunların neredeyse tamamı aynı çipti: içinde iki tane üç girişli NOR kapısı. Yaklaşık 32 kilogramlık bu kutu, 2048 kelimelik silinebilir çekirdek bellek ve 36 864 kelimelik sabit 'halat' bellekle 1969'da astronotları Ay yüzeyine indirdi. NOR da NAND gibi tek başına tamdır; toplayıcısından kaydedicisine bütün mantık ondan örülmüştü.",
    },
    {
      title: "Beş girişten dört milyar işlev",
      body:
        "n girişli bir doğruluk tablosunun 2ⁿ satırı vardır ve her satıra 0 ya da 1 yazılabilir. Olası işlev sayısı bu yüzden 2 üzeri 2ⁿ'dir: iki girişle 16, üç girişle 256, dört girişle 65 536, beş girişle 4 294 967 296. Altı girişte sayı 2⁶⁴'e, yani yaklaşık 1.8 × 10¹⁹'a varır. Sayfadaki yedi kapı, hatta yalnızca NAND, bu uçsuz bucaksız kümenin her üyesini kurmaya yeter.",
    },
  ],
  worked: {
    title: "Dört bitlik toplama ve eldenin yol süresi",
    prompt:
      "Dört tam toplayıcıdan kurulu dalgalı elde toplayıcıyla 0110 (6) ile 0111 (7) sayılarını topla; her basamakta S ve C değerlerini izle. Sonra her kapının τ = 20 ps geciktiğini varsay: en kötü durumda son elde ne zaman kesinleşir, 64 bitlik aynı tasarım 3 GHz'lik bir saate yetişir mi?",
    steps: [
      "Tam toplayıcının iki formülünü yaz: S = A ⊕ B ⊕ C<sub>g</sub> ve C<sub>ç</sub> = A·B + C<sub>g</sub>·(A ⊕ B). En sağdaki basamaktan başla; ilk elde girişi C<sub>g</sub> = 0.",
      "Basamak 0: A = 0, B = 1, C<sub>g</sub> = 0. A ⊕ B = 1, S = 1 ⊕ 0 = 1; elde 0·1 + 0·1 = 0. Basamak 1: A = 1, B = 1, C<sub>g</sub> = 0. A ⊕ B = 0, S = 0; elde A·B = 1.",
      "Basamak 2: A = 1, B = 1, C<sub>g</sub> = 1. A ⊕ B = 0, S = 0 ⊕ 1 = 1; elde A·B = 1. Basamak 3: A = 0, B = 0, C<sub>g</sub> = 1. S = 0 ⊕ 1 = 1; elde 0 + 1·0 = 0. Sonuç 1101<sub>2</sub> = 8 + 4 + 1 = 13; son elde 0 olduğundan taşma yok.",
      "Gecikmeyi say. Bütün A ⊕ B ve A·B değerleri 1τ sonra hazırdır. Her basamakta elde iki kapıdan daha geçer: C<sub>g</sub>·(A ⊕ B) için bir AND, sonra bir OR. İlk basamakta elde 3τ'da çıkar, sonraki her basamak 2τ ekler: 3τ, 5τ, 7τ, 9τ. n bit için son elde (2n + 1)·τ, son toplam biti 2n·τ sonra kesinleşir.",
      "Sayıları koy. 4 bit: 9 × 20 ps = 180 ps. 64 bit: 129 × 20 ps = 2580 ps = 2.58 ns. 3 GHz'lik saatin periyodu 1/(3 × 10⁹ Hz) ≈ 0.333 ns'dir; 64 bitlik dalgalı toplayıcı bunun yaklaşık 7.7 katı süre ister, yani tek vuruşa sığmaz.",
    ],
    result:
      "6 + 7 = 1101<sub>2</sub> = 13. Dört tam toplayıcı 20 kapı kullanır (her birinde 2 XOR, 2 AND, 1 OR). En kötü durumda, örneğin 1111 + 0001'de elde bütün zinciri yürür: 4 bitte 9τ = 180 ps, 64 bitte 129τ = 2.58 ns. Gecikme n ile doğrusal büyüdüğü için gerçek işlemciler eldeyi önceden hesaplayan, gecikmesi log n ile büyüyen toplayıcılar kullanır.",
  },
  misconceptions: [
    {
      myth: "OR, günlük dildeki 'ya o ya bu' demektir.",
      truth:
        "Kapı dünyasında OR kapsayıcıdır: girişlerin biri <em>ya da ikisi</em> 1 olunca çıkış 1'dir; 11 satırında da 1 verir. 'Yalnızca biri' anlamını XOR taşır ve toplamanın birler basamağını da bu yüzden XOR verir: 1 + 1'in toplam basamağı 0'dır.",
    },
    {
      myth: "Boole cebrinde 1 + 1 = 2'dir.",
      truth:
        "Burada + işareti OR demektir ve 1 + 1 = 1'dir; 2 diye bir değer yoktur. Çarpma da AND'dir: 1·1 = 1, 1·0 = 0. Doğruluk değerleriyle hesap yapıyorsun; ikilik sayıların toplanması ayrı bir iştir ve XOR ile AND'in birlikte çalışmasını gerektirir.",
    },
    {
      myth: "Bağlanmamış giriş 'hiçbir şey' demektir, devreyi etkilemez.",
      truth:
        "Sayfa boş girişi 0 sayar; birinci deneyde NOT, NAND, NOR ve XNOR'un bu yüzden boşken bile 1 verdiğini gördün. Gerçek çiplerde boş bırakılan giriş belirsiz bir voltajda 'yüzer' ve öngörülemez davranır; veri sayfaları kullanılmayan girişlerin bir seviyeye bağlanmasını ister.",
    },
    {
      myth: "Doğruluk tablosu her devreyi tam olarak anlatır.",
      truth:
        "Yalnızca kombinasyonel devreleri anlatır. Geri beslemeli bir devrede, dördüncü deneydeki SR kilidinde gördüğün gibi, aynı girişler için iki farklı çıkış mümkündür ve hangisinin görüneceği geçmişe bağlıdır. Bu devreler için durum tablosu ya da zaman diyagramı gerekir.",
    },
  ],
  glossary: [
    { term: "Boole cebri", definition: "Değişkenlerin yalnızca 0 ve 1 değerini aldığı, AND, OR ve NOT işlemleriyle çalışan cebir; adını 1847'de temelini atan George Boole'dan alır." },
    { term: "Doğruluk tablosu", definition: "Bir devrenin her olası giriş birleşimi için çıkışını listeleyen tablo; n giriş için 2ⁿ satırı vardır." },
    { term: "Mantık kapısı", definition: "Bir ya da birkaç ikili girişten tek bir ikili çıkış üreten en küçük devre birimi; transistörlerle gerçeklenir." },
    { term: "İşlevsel tamlık", definition: "Bir kapı kümesinin bütün Boole işlevlerini kurabilmesi; NAND tek başına, NOR da tek başına bu özelliğe sahiptir." },
    { term: "De Morgan yasaları", definition: "¬(A·B) = <span class=ov>A</span> + <span class=ov>B</span> ve ¬(A+B) = <span class=ov>A</span>·<span class=ov>B</span>; değil içeri taşınırken AND ile OR yer değiştirir." },
    { term: "Yarım toplayıcı", definition: "İki biti toplayan, elde girişi olmayan devre: toplam = A ⊕ B, elde = A·B." },
    { term: "Yayılma gecikmesi", definition: "Bir kapının girişi değiştikten sonra çıkışının yeni değerine yerleşmesi için geçen süre; modern çiplerde onlarca pikosaniye mertebesindedir." },
    { term: "SR kilidi (latch)", definition: "Çapraz bağlı iki NAND ya da NOR'dan oluşan bir bitlik bellek; kur ve sıfırla girişleriyle yazılır, girişler etkin değilken değerini tutar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede kapıları tablolarıyla tanırsın; üniversitede Sayısal Tasarım (Mantık Devreleri) dersi önce bu tabloları en az kapıyla kurmanın yollarını öğretir: çarpımlar toplamı ve toplamlar çarpımı biçimleri, <strong>Karnaugh haritaları</strong> ve Quine–McCluskey yöntemiyle sadeleştirme. Sonra işin içine zaman girer. Her kapının bir yayılma gecikmesi vardır; bir saat vuruşu içinde sinyalin geçmek zorunda olduğu en uzun kapı zinciri, yani <strong>kritik yol</strong>, devrenin en yüksek saat frekansını belirler. Çözümlü örnekteki (2n + 1)·τ hesabı bu analizin en küçük örneğidir; 'ileri bakışlı elde' devreleri aynı toplamı log n ile büyüyen gecikmeyle yapar.",
      "Kilide bir saat girişi ekleyip iki kilidi art arda bağladığında kenar tetiklemeli flip-flop'a, flip-flop'ları dizdiğinde kaydedicilere ve <strong>sonlu durum makinelerine</strong> varırsın: durum flip-flop'larda saklanır, bir sonraki durumu kombinasyonel mantık hesaplar. Biçimsel Diller ve Otomata Teorisi dersindeki otomatlar bu devrelerin matematiksel modelidir. Bir işlemci de toplayıcı, kaydediciler ve onları yöneten bir durum makinesinden oluşur; Bilgisayar Organizasyonu dersi bu yolu adım adım kurar. Üniversitede devreyi artık elle çizmez, Verilog ya da VHDL gibi donanım tanımlama dilleriyle yazıp bir FPGA üzerinde çalıştırırsın; MIT'nin 6.004 dersi kapıdan işlemciye tam bu sırayla ilerler. Shannon'ın devreyle cebir arasında kurduğu köprü, bugün yazılımla donanım arasındaki köprüdür.",
    ],
    topics: ["Karnaugh haritaları ve sadeleştirme", "Yayılma gecikmesi ve kritik yol", "Flip-flop'lar ve saatli ardışıl mantık", "Sonlu durum makineleri", "Verilog / VHDL ve FPGA", "CMOS transistör düzeyinde kapı tasarımı", "ALU ve veri yolu tasarımı"],
  },
  quiz: [
    {
      question: "İki girişli bir devreye üçüncü bir giriş eklenirse doğruluk tablosunun satır sayısı ne olur?",
      options: [
        "6 satır: her giriş tabloya iki satır ekler",
        "8 satır: her yeni giriş satır sayısını ikiye katlar",
        "9 satır: 3² birleşim vardır",
        "5 satır: yalnızca bir yeni birleşim eklenir",
      ],
      answer: 1,
      explanation: "Her giriş 0 ya da 1 olabildiği için birleşim sayısı 2ⁿ'dir: 2² = 4, 2³ = 8. Yeni giriş, eski her satırı bir kez 0 ile bir kez 1 ile yineler. Sayfa iki pine kadar tabloyu çizer; üçüncü pini eklediğinde '≥3 giriş' yazar ve sekiz satırı kâğıtta tutman gerekir.",
    },
    {
      question: "Dört bitlik dalgalı elde toplayıcıda son elde en kötü durumda 9 kapı gecikmesi sonra kesinleşiyor. Aynı tasarım sekiz bite çıkarılırsa bu süre ne olur?",
      options: [
        "9 kapı gecikmesi: basamaklar aynı anda çalışır",
        "17 kapı gecikmesi: her basamak iki kapı ekler",
        "18 kapı gecikmesi: bit sayısıyla tam orantılıdır",
        "81 kapı gecikmesi: bit sayısının karesiyle büyür",
      ],
      answer: 1,
      explanation: "Elde her basamakta bir AND ve bir OR'dan geçer, yani basamak başına 2 kapı; başta A ⊕ B için 1 kapı daha vardır: (2n + 1)·τ. n = 4 için 9, n = 8 için 17. Büyüme doğrusaldır ama sabit terim yüzünden tam iki katı değildir.",
    },
    {
      question: "NAND'lardan kurulu SR kilidinde her iki giriş de 1 iken çıkış ne yapar?",
      options: ["Q daima 1 olur", "Q daima 0 olur", "Q önceki değerini korur", "İki çıkış birden 1 olur"],
      answer: 2,
      explanation: "NAND kilidinde girişler etkin düşüktür: birini 0 yapmak kurar ya da sıfırlar, ikisi birden 1 ise devre son durumunu tutar; hafıza budur. İki çıkışın birden 1 olduğu hâl, iki girişin birden 0 olduğu yasak durumdur: sayfada SR kilidini ilk yüklediğinde gördüğün tablo.",
    },
  ],
  next: [
    { href: "mantik-kapilari.html", title: "Mantık Kapıları Laboratuvarı", why: "Üç sekmeli laboratuvar: tek kapıyı tablosuyla sına, De Morgan eşdeğerliklerini yan yana karşılaştır ve dört bitlik toplayıcıda eldeyi basamak basamak izle." },
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Sistemleri ve Mimarisi", why: "Toplayıcı ve kaydedicilerin bir işlemcide nereye oturduğunu gör: beş aşamalı işlem hattı, bellek hiyerarşisi ve sayı sistemleri dönüştürücüsü." },
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Kilidin tuttuğu 'durum' kavramının matematiksel karşılığı: sonlu durum makineleri ve tanıdıkları diller." },
    { href: "elektronik-muhendisligi.html", title: "Elektronik Mühendisliği", why: "Kapının bir kat altı: diyot, transistör ve MOSFET; ayrıca saat kenarında D'yi yakalayan küçük bir D flip-flop gösterimi." },
  ],
  sources: [
    { title: "Wikipedia · Logic gate", url: "https://en.wikipedia.org/wiki/Logic_gate", note: "Kapı türleri, simgeler, işlevsel tamlık ve transistör düzeyinde gerçekleme (İngilizce)." },
    { title: "Wikipedia · A Symbolic Analysis of Relay and Switching Circuits", url: "https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits", note: "Shannon'ın 1937 tezi: Boole cebrinin anahtarlama devrelerine uygulanışı ve Gardner'ın değerlendirmesi." },
    { title: "Wikipedia · Apollo Guidance Computer", url: "https://en.wikipedia.org/wiki/Apollo_Guidance_Computer", note: "NOR kapılarından kurulu Ay bilgisayarı: çip sayısı, bellek ve ağırlık verileri." },
    { title: "MIT OpenCourseWare · 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", note: "Kapılardan işlemciye uzanan lisans dersi; ders notları ve videolar açık (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
