window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bilgi-kurami-ve-sikistirma"] = {
  slug: "bilgi-kurami-ve-sikistirma",
  title: "Bilgi Kuramı ve Sıkıştırma: Şaşkınlığı Bitle Ölçmek",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir mesaj kaç bite sığar, gürültülü bir hat saniyede kaç bit taşır? Shannon'ın iki sınırı, ZIP dosyasından cep telefonuna kadar her dijital iletişimin görünmez tavanıdır.",
  hook:
    "Hileli bir paranın her atışı kâğıda bir bitle yazılır, ama içinde yarım bit bile bilgi yoktur. Rastgele baytlarla dolu dosyaları ise hiçbir program ortalamada küçültemez; çoğu denerken büyütür. Aradaki farkı ölçen tek bir sayı var ve bu sayı, gürültülü bir hattan ne kadar hızla güvenle konuşabileceğini de söylüyor.",
  bigIdea:
    "Bilgi, şaşkınlığın ortalamasıdır: <strong>entropi H</strong> bir kaynağın sembol başına kaç bitle yazılabileceğinin alt sınırı, <strong>kapasite C</strong> ise gürültülü bir kanaldan hatasız aktarılabilecek en yüksek hızdır; ikisinin de altına inilebilir, üstüne çıkılamaz.",
  story: [
    "Mühendisler bilgiyi Shannon'dan önce de ölçmeye çalıştı. Harry Nyquist 1924'te, “Certain Factors Affecting Telegraph Speed” makalesinde telgrafın hızını her adımda seçilebilen gerilim düzeyi sayısının logaritmasına bağladı. Ralph Hartley 1928'de “Transmission of Information” adlı makalesinde bir adım daha attı: bilgi, mesajın anlamıyla değil, alıcının gönderilen diziyi olası diziler arasından ayırt edebilmesiyle ilgiliydi. S sembollü bir alfabeden n sembol gönderiliyorsa bilgi log Sⁿ idi. Eksik olan tek şey, sembollerin eşit olasılıklı olmadığı gerçek dünyaydı.",
    "O adımı Bell Laboratuvarları'ndan Claude Shannon attı. “A Mathematical Theory of Communication” <em>Bell System Technical Journal</em>'ın 27. cildinde, Temmuz ve Ekim 1948'de iki parça hâlinde çıktı; Shannon işin büyük kısmını 1944 sonunda bitirmişti. Makale entropiyi, artıklığı, ortak bilgiyi ve kanal kapasitesini aynı anda tanıttı; ikili basamak için “bit” sözcüğünü de, makalenin kendi notuna göre J. W. Tukey'in önerisi olarak kullandı. 1949'da Warren Weaver'ın genel okura yazdığı bir girişle kitap oldu. Shannon gürültülü kanal teoreminin yalnızca bir ispat taslağını vermişti; ayrık durum için ilk sıkı ispatı 1954'te Amiel Feinstein yaptı. 1951'deki “Prediction and Entropy of Printed English” makalesinde de İngilizcenin entropisi için alt ve üst sınırlar verdi.",
    "Kuramın sınırları gösterdiği hedeflere mühendisler adım adım yaklaştı. MIT'de Robert Fano'nun dersinde, final sınavı yerine dönem ödevi seçen David Huffman en verimli ikili kodu aşağıdan yukarı kurulan bir ağaçla buldu ve 1952'de <em>Proceedings of the IRE</em>'de yayımladı. Richard Hamming 1950'de tek hatayı bulup düzelten kodunu yayımladı. Aritmetik kodlamanın temel algoritmalarını 1976'da IBM'de Jorma Rissanen ile Stanford'da Richard Pasco birbirinden bağımsız geliştirdi. Abraham Lempel ve Jacob Ziv, olasılık tablosuna hiç bakmayan sözlük yöntemlerini 1977 ve 1978'de <em>IEEE Transactions on Information Theory</em>'de yayımladı; Terry Welch 1984'te bunlardan LZW'yi türetti. Phil Katz'ın PKZIP 2 için tasarladığı DEFLATE, LZ77 ile Huffman kodunu birleştirdi; biçimi L. Peter Deutsch Mayıs 1996'da RFC 1951 olarak yazdı.",
  ],
  core: [
    {
      heading: "Şaşkınlık ve entropi",
      body:
        "Olasılığı p olan bir olay gerçekleşince <strong>−log₂ p</strong> bit bilgi alırsın: hilesiz yazı-tura 1 bit, hilesiz zar log₂ 6 ≈ 2,585 bit, olasılığı 1/1024 olan bir olay 10 bit. Beklediğin şey sana az şey söyler, şaşırtan şey çok. <strong>Entropi</strong> bu şaşkınlığın ortalamasıdır. n sembollü bir alfabede en büyük değer log₂ n'dir ve yalnız bütün semboller eşit olasılıklıyken ulaşılır; her eğilim entropiyi düşürür. Aradaki pay <strong>artıklık</strong>tır: sayfanın varsayılan hileli zarında (altının olasılığı 0,5) H = 2,1610 bit, log₂ 6 = 2,5850 bit, artıklık 16,4 %. Büyük sayılar yasası yüzünden uzun bir dizide sembol başına ortalama şaşkınlık H'ye yaklaşır; sıkıştırmanın bütün kuramı bu yakınsamanın üstüne kuruludur.",
      formula: "H = −Σ pᵢ log₂ pᵢ ≤ log₂ n",
      formulaNote: "Birim bittir; 0 · log₂ 0 = 0 alınır. Hileli para (p = 0,9) için H₂(0,9) = 0,4690 bit.",
    },
    {
      heading: "Bağlam bilgiyi azaltır: koşullu entropi ve ortak bilgi",
      body:
        "Bir önceki harfi bilmek sıradakinin şaşkınlığını azaltır; bu yüzden <strong>koşullu entropi</strong> hiçbir zaman koşulsuzdan büyük değildir, H(Y | X) ≤ H(Y), eşitlik yalnız bağımsızlıkta. Aradaki fark <strong>ortak bilgi</strong>dir: X'i öğrenmenin Y hakkındaki belirsizlikten ne kadar sildiği. Sayfanın kendi Türkçe örnek metninde tek harf entropisi 4,304 bit iken bir önceki harf bilindiğinde 3,094 bite iner; aradaki 1,210 bit harf çiftlerinin taşıdığı ortak bilgidir (bu sayılar yalnız o kısa metnin sıklıklarıdır, Türkçenin genel değeri değildir). 2 × 2 tabloda “gürültülü kopya” (Y, X'in %10 olasılıkla çevrilmiş hâli) için I = 0,5310 bit çıkar: tam da dördüncü sekmedeki kanalın kapasitesi.",
      formula: "I(X; Y) = H(X) + H(Y) − H(X, Y) = H(Y) − H(Y | X)",
      formulaNote: "I ≥ 0'dır ve yalnız X ile Y bağımsızsa sıfırdır; Y = X ise I = H(X).",
    },
    {
      heading: "Kaynak kodlama: Huffman, Kraft ve blok kodlama",
      body:
        "Bir kodun anlık çözülebilmesi için hiçbir kod sözcüğü başka birinin başı olmamalıdır (<strong>önek kodu</strong>). Bu, uzunluklar üzerine <strong>Kraft eşitsizliğini</strong> getirir ve sonuç şudur: sembol sembol kodlayan hiçbir önek kodunun ortalama uzunluğu L, H'nin altına inemez; ℓᵢ = ⌈−log₂ pᵢ⌉ seçmek ise L < H + 1'i garanti eder. <strong>Huffman</strong> algoritması en küçük iki ağırlığı tekrar tekrar birleştirerek bu sınıftaki en iyi kodu kurar. Tam sayı uzunluk zorunluluğu hileli parada acı verir: H = 0,4690 bit ama L = 1 bit. Çare k sembolü tek blok saymaktır; kayıp sembol başına 1/k'nın altına iner. Aritmetik kodlama blok fikrini sonuna götürür: bütün mesaja tek bir aralık atar ve en çok −log₂ P(mesaj) + 2 bit harcar.",
      formula: "Σ 2<sup>−ℓᵢ</sup> ≤ 1 ⇒ H ≤ L < H + 1,  H ≤ Lₖ/k < H + 1/k",
      formulaNote: "Kraft toplamı 1 ise ağaç doludur. Olasılıklar ikinin kuvvetiyse (1/2, 1/4, 1/8, 1/8) L = H = 1,75 bit ve bloklama kazandırmaz.",
    },
    {
      heading: "Sözlük yöntemleri ve güvercin yuvası",
      body:
        "<strong>LZ77</strong> olasılık tablosu tutmaz: metinde geriye bakar ve “şu kadar geride başlayan şu uzunluktaki parçayı kopyala, sonra şu baytı ekle” der. <strong>LZ78</strong> gördüğü öbekleri numaralı bir sözlüğe yazar ve sonra numarayla anar. Tekrarlı veride bu yöntemler tek harf entropisinin çok altına iner, çünkü uzun bağlamı kullanırlar; <strong>DEFLATE</strong> LZ77 simgelerini bir de Huffman koduyla sıkıştırır. Ama hiçbir kayıpsız sıkıştırıcı her girdiyi küçültemez: 2ⁿ farklı n bitlik girdiye karşılık n bitten kısa yalnız 2ⁿ − 1 dizi vardır ve geri açılabilmek için farklı girdiler farklı çıktılara gitmelidir. Aynı sayım, girdilerin en çok 2<sup>1−k</sup> kadarının k bit kısalabileceğini söyler. Rastgele veri bu yüzden sıkışmaz; sıkıştırma, verideki düzenin kullanılmasıdır.",
      formula: "kısalabilen pay ≤ (2<sup>n−k+1</sup> − 1) / 2ⁿ < 2<sup>1−k</sup>",
      formulaNote: "n = 4, k = 1: 16 girdiye 15 kısa çıktı, en çok 93,75 %. k = 8 (bir bayt kazanç): 1/128'den az.",
    },
    {
      heading: "Kanal kapasitesi ve gürültülü kanal teoremi",
      body:
        "<strong>İkili simetrik kanal</strong> her biti p olasılıkla çevirir. Shannon'a göre bu kanalın kapasitesi C = 1 − H₂(p)'dir; p = 0,1 için 0,5310 bit/kullanım. En basit savunma tekrardır: her biti n kez gönder, çoğunluğa bak. n = 3'te bit hatası 3p²(1 − p) + p³ = 0,028'e iner, ama hız 1/3'e düşer; hatayı sıfıra yaklaştırmak için hız da sıfıra gider. Hamming(7,4) 4 veri bitine 3 parite biti ekler, hız 4/7 ≈ 0,571 olur ve her tek hatayı sendromla bulur. Shannon'ın teoremi şaşırtıcıdır: R < C olan her hızda, yeterince uzun bloklarla hata olasılığı istenildiği kadar küçültülebilir; R > C'de ise alt sınır H₂(Pₑ) ≥ 1 − C/R'dir. Güvenilirlik hızdan değil, uzun ve akıllı kodlardan gelir.",
      formula: "C = 1 − H₂(p),  H₂(p) = −p log₂ p − (1 − p) log₂ (1 − p)",
      formulaNote: "p = 0,5'te C = 0: çıktı girdiden bağımsızdır. p = 0'da C = 1 bit/kullanım.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvar: <strong>01 · Shannon entropisi</strong> kaynaktan tohumlu örnek çekip ortalama şaşkınlığı kuramla karşılaştırır, metin entropisini ve 2 × 2 tabloda ortak bilgiyi ölçer; <strong>02 · Huffman ve aritmetik kodlama</strong> ağacı birleştirme birleştirme kurar, blok kodlama tablosu ve bir mesajın iki kodla gerçekten kodlanıp çözülmesini gösterir; <strong>03 · LZ ve gerçek sıkıştırma</strong> LZ77, LZ78 ve tarayıcının gerçek DEFLATE'ini aynı veri üzerinde yarıştırır, güvercin yuvası sayımını yapar; <strong>04 · Kanal kapasitesi</strong> ikili simetrik kanalda tekrarlama ve Hamming(7,4) kodlarını benzetir ve hız–hata düzleminde Shannon sınırını çizer. Bütün rastgelelik tohumludur: aynı tohum aynı sonucu verir. <kbd>R</kbd> tuşu etkin sekmeyi varsayılana döndürür. Harf sıklıkları yalnız sayfanın kendi iki kısa örnek metninden gelir.",
    experiments: [
      {
        title: "Hileli para kaç bit?",
        predict: "Yüzde 90 yazı gelen bir paranın bir atışı kaç bit bilgi taşır? Huffman koduyla atış başına kaç bit harcarsın?",
        do: "01'de Kaynak menüsünden “Hileli para (p = 0,9)” seç. Sonra 02 · Huffman ve aritmetik kodlama sekmesine geç ve orada da Kaynak = “Hileli para (p = 0,9)” seç; blok kodlama tablosuna ve mesajın Huffman ve aritmetik kod bitlerine bak.",
        observe: "Entropi H 0,4690 bit, 10 000 örnekte ölçülen ortalama şaşkınlık 0,4674 bit (−0,17 σ/√N, rastlantı payı içinde); olası “Y” yalnız 0,152 bit taşır. 02'de L = 1,0000, L − H = +0,5310. Blokla: k = 2'de 0,6450, k = 3'te 0,5327 bit/sembol. 40 sembollük mesaj Huffman'la 40 bit, aritmetik kodla 19 bit tutar; mesajın bilgi içeriği −log₂ P 18,76 bit.",
        explain: "Huffman her sembole tam sayı bit vermek zorunda; iki sembolde bu en az 1 bittir. Blok kodlama kaybı 1/k'nın altına çeker, aritmetik kod ise bütün mesajı tek aralıkla yazıp −log₂ P'ye 2 bitten yakın kalır.",
      },
      {
        title: "Harf mi, harf çifti mi?",
        predict: "Bir önceki harfi bilmek, Türkçe örnek metinde sıradaki harfin şaşkınlığını ne kadar azaltır: yüzde birkaç mı, bir bitten fazla mı?",
        do: "01'de “Bir metnin entropisi” bölümünde Türkçe örnek düğmesine bas; sonra “ab” tekrarı düğmesine bas. Ardından 02'de Kaynak = “Türkçe örnek metnin harfleri” seç.",
        observe: "Türkçe örnekte 1362 harf, 29 farklı sembol; H₁ 4,304 bit, koşullu H(Xₖ₊₁ | Xₖ) 3,094 bit (H₁'in 71,9 %'i): 1,210 bit ortak bilgi. “ab” tekrarında H₁ 1,000 bit, koşullu 0,000 bit. 02'de Huffman L = 4,3429 bit, H = 4,3044 bit; fark yalnız 0,0385.",
        explain: "Huffman tek harf sıklıklarına göre neredeyse kusursuzdur ama harfleri bağımsız sayar; 3,094 bite inmek için bağlamı kullanan bir model gerekir. Sayfanın uyardığı gibi 1361 çiftte 285 farklı çift görüldüğünden çift kestirimi biraz aşağı sapar.",
      },
      {
        title: "Kim, neyi sıkıştırır?",
        predict: "Türkçe metin, “ali ata bak ” tekrarı ve 1 000 rastgele bayt: LZ77, LZ78 ve DEFLATE hangisini ne kadar küçültür? Rastgele baytları küçülten olur mu?",
        do: "03 · LZ ve gerçek sıkıştırma sekmesinde Veri menüsünde sırayla “Doğal dil: Türkçe örnek metin”, “Tekrarlı: ali ata bak × 60” ve “Rastgele baytlar (0–255, 1 000)” seç. Güvercin yuvası bölümünde Dizi uzunluğu n = 4, İstenen kısalma k = 1 iken sayıma bak.",
        observe: "Türkçe (1543 bayt): LZ77 6,34, LZ78 5,93, DEFLATE 4,31 bit/bayt; n·H₁ ile tek bayt sınırı 4,626 bit/bayt. Tekrarlı (720 bayt): LZ77 1188 bit (1,65 bit/bayt, H₁ = 2,522'nin altında), DEFLATE 168 bit. Rastgele baytlar: LZ77 12 760 bit (160 %), LZ78 10 065 bit (126 %), DEFLATE 8040 bit; ham veri 8000 bit. Sayım: 16 girdi, 15 kısa çıktı; 200 rastgele dizinin hiçbiri kısalmaz.",
        explain: "Sözlük yöntemleri uzun tekrarları yakalar, tek harf entropisini aşar; DEFLATE simgeleri bir de Huffman'la sıkıştırır. Rastgele veride kopyalanacak düzen yoktur ve güvercin yuvası sayımı her yöntemin bazı girdileri büyütmek zorunda olduğunu söyler.",
      },
      {
        title: "Hızdan ödünç güvenilirlik",
        predict: "p = 0,1'lik kanalda tekrarlama kodu n'yi büyüttükçe hata ve hız nasıl değişir? Hızı 0,571 olan Hamming(7,4) kapasitenin altında mı, üstünde mi?",
        do: "04 · Kanal kapasitesi sekmesinde Çevirme olasılığı p = 0,1 iken Tekrarlama kodu menüsünde n = 3, 5 ve 25'i dene; Hamming kartlarına ve grafiğe bak. Sonra Hamming bloğunda İkinci hata konumu = 2 seç.",
        observe: "C = 0,5310 bit/kullanım. Kuram n = 3'te 0,02800 (ölçülen 0,02813), n = 5'te 0,008560, n = 25'te 1,621 × 10⁻⁷, ama hız 1/25 = 0,04. Hamming(7,4) bit hatası kuramda 0,06688 (blok hatası 0,1497), ölçülen 0,06811; durum satırı 4/7'nin C'nin üstünde olduğunu ve Shannon'ın o hızdaki en küçük hatasının 0,00851 olduğunu söyler. Tek hatada sendrom “101 = 5”, veri 1011 ✓; ikinci hatayla sendrom “111 = 7”, veri ✗.",
        explain: "Tekrar, hatayı yalnız hızı sıfıra götürerek yok eder; grafikteki noktalar sola kaçar. Shannon'a göre C'nin altındaki her hızda hata sıfıra yaklaştırılabilir; gölgeli bölge C'ye kadar tabana iner. Hamming(7,4) tek hatayı düzeltir, iki hatayı yanlış konuma bağlar.",
      },
    ],
  },
  wow: [
    {
      title: "Sınav yerine dönem ödevi",
      body:
        "1951'de MIT'de Robert Fano, bilgi kuramı öğrencilerine final sınavı ile dönem ödevi arasında seçim hakkı tanıdı; ödevin konusu en verimli ikili kodu bulmaktı. David Huffman hiçbir kodun en iyi olduğunu kanıtlayamayınca sınava çalışmaya dönmek üzereydi; o sırada ağacı aşağıdan yukarı kurma fikri geldi. Yöntemi, Fano'nun Shannon'la geliştirdiği yukarıdan aşağı kodu geride bıraktı.",
    },
    {
      title: "Hafta sonu öfkesinden doğan kod",
      body:
        "1940'ların sonunda Bell Laboratuvarları'nda Richard Hamming, delikli şerit okuyan röleli Bell Model V bilgisayarında hafta sonu işleri çalıştırıyordu. Operatör yoktu; makine bir hata sezince o işi bırakıp sıradakine geçiyordu ve bütün hafta sonunun emeği boşa gidebiliyordu. Hamming'in sorusu şuydu: makine hatayı sezebiliyorsa neden yerini bulup düzeltemiyor? Cevabı 1950'de yayımladığı koddur; Hamming kodları bugün ECC belleklerde hâlâ kullanılıyor.",
    },
    {
      title: "Bir patent, yeni bir resim biçimi",
      body:
        "LZW 1987'de GIF resim biçiminin parçası oldu. Welch'in patenti Unisys'in elindeydi ve 1994'ün sonunda GIF yazan yazılımlardan lisans ücreti isteneceği duyurulunca büyük tepki doğdu. Bu tepki üzerine 1995'in başında patentsiz bir yedek tasarlanmaya başlandı: PNG. PNG, LZ77 ile Huffman'ı birleştiren DEFLATE'i kullanır.",
    },
  ],
  worked: {
    title: "Beş sembollü kaynağın Huffman kodu",
    prompt:
      "Bir kaynak A, B, C, D, E sembollerini 0,4 · 0,2 · 0,2 · 0,1 · 0,1 olasılıkla üretiyor. Entropisini bul, Huffman kodunu kur, ortalama kod uzunluğunu ve verimini hesapla; blok kodlamanın ve aritmetik kodun ne kazandırdığını sayfayla karşılaştır.",
    steps: [
      "Entropi: H = 0,4·log₂(1/0,4) + 2·0,2·log₂ 5 + 2·0,1·log₂ 10 = 0,4·1,3219 + 0,4·2,3219 + 0,2·3,3219 ≈ 0,5288 + 0,9288 + 0,6644 = 2,1219 bit/sembol. En büyük değer log₂ 5 = 2,3219 bit olurdu.",
      "Huffman: en küçük ikiyi birleştir. D + E → 0,2; sonra B + C → 0,4; sonra (D E) 0,2 ile A 0,4 → 0,6; son olarak 0,4 ile 0,6 → 1. Dalları 0/1 diye okuyunca B 00, C 01, D 100, E 101, A 11 çıkar (02'deki ağacın aynısı). D + E'den sonra üç düğüm 0,2'de eşittir; eşitliği başka bozmak uzunlukları 1, 2, 3, 4, 4 olan başka bir Huffman kodu verir, ortalaması yine 2,2: kod tek değildir, en iyi L tektir.",
      "Ortalama uzunluk: L = 0,4·2 + 0,2·2 + 0,2·2 + 0,1·3 + 0,1·3 = 2,2000 bit/sembol. L − H = +0,0781 bit, yani 0 ≤ L − H < 1 sağlanıyor; verim H/L = 96,5 %. Kraft toplamı 3·2⁻² + 2·2⁻³ = 1: ağaç dolu.",
      "Blok kodlama: iki sembolü bir blok (25 blok) saymak L₂/2 = 2,1600, üçü bir blok (125 blok) saymak 2,1253 bit/sembol verir; kayıp 0,0781 → 0,0381 → 0,0034 bit, her seferinde 1/k sınırının altında.",
      "Bir mesaj: sayfanın tohumlu 40 sembollük mesajı Huffman'la 86 bit (2,150 bit/sembol) tutar; bilgi içeriği −log₂ P = 81,88 bit, aritmetik kod 82 bit. İki çözücü de mesajı geri bulur.",
    ],
    result:
      "H = 2,1219 bit, L = 2,2000 bit/sembol, verim 96,5 %. Bloklamayla 2,1253'e, aritmetik kodla mesaj başına −log₂ P'nin 2 bit yakınına inilir; ama hiçbir kayıpsız kod ortalamada 2,1219'un altına inemez.",
  },
  misconceptions: [
    {
      myth: "İyi bir sıkıştırıcı her dosyayı küçültür; iki kez sıkıştırırsan daha da küçülür.",
      truth:
        "Güvercin yuvası buna izin vermez: 2ⁿ girdiye n bitten kısa yalnız 2ⁿ − 1 çıktı vardır, bazı girdiler kısalamaz. Sıkıştırılmış veri neredeyse rastgeledir, ikinci geçişte kazanç kalmaz. Sayfada rastgele baytları seç: LZ77 160 %, LZ78 126 % çıkar, DEFLATE de 8000 bitlik veriyi 8040 bite büyütür.",
    },
    {
      myth: "Entropi bir mesajın ne kadar anlamlı ya da önemli olduğunu ölçer.",
      truth:
        "Hartley'den beri bilgi anlamdan bağımsız tanımlanır: yalnız olası mesajlar arasından hangisinin seçildiğini ayırt etmenin bedelidir. 26 harfi eşit olasılıkla basan bir kaynağın entropisi harf başına log₂ 26 ≈ 4,70 bittir, Türkçe şiirinki ise bağlam yüzünden çok daha düşüktür; yine de anlamlı olan şiirdir.",
    },
    {
      myth: "Huffman kodu en iyi koddur; entropiye her zaman ulaşır.",
      truth:
        "Huffman yalnız sembol sembol yazılan önek kodları arasında en iyisidir ve L ancak olasılıklar ikinin kuvvetiyse H'ye eşittir. Hileli parada H = 0,4690 bit ama L = 1 bit. Blok kodlama, aritmetik kodlama ve bağlamı kullanan modeller (LZ, DEFLATE) daha iyisini yapar. Huffman kodu tek de değildir: eşitlikleri başka sırayla bozmak aynı L'li başka bir kod verir.",
    },
    {
      myth: "Gürültülü bir hatta hatayı sıfıra indirmenin tek yolu tekrar etmektir; bu da hızı sıfıra indirir.",
      truth:
        "Tekrarlama kodu için doğru, kanal için değil. Shannon'ın teoremine göre kapasitenin altındaki her hızda (p = 0,1'de 0,531'e kadar) hata istenildiği kadar küçültülebilir; bedel hız değil, uzun bloklar ve karmaşık çözücülerdir. Sınır yalnız C'nin üstünde aşılmaz.",
    },
  ],
  glossary: [
    { term: "Şaşkınlık (öz bilgi)", definition: "Olasılığı p olan bir olayın gerçekleşmesinin taşıdığı bilgi, −log₂ p bit; olay ne kadar beklenmedikse o kadar büyük." },
    { term: "Entropi H", definition: "Bir kaynağın ortalama şaşkınlığı, −Σ p log₂ p; sembol başına kayıpsız kodlamanın alt sınırı." },
    { term: "Artıklık", definition: "1 − H / log₂ n: kaynağın eşit olasılıklı bir kaynağa göre ne kadar öngörülebilir olduğu, sıkıştırılabilir payın ölçüsü." },
    { term: "Ortak bilgi I(X; Y)", definition: "Bir değişkeni öğrenmenin ötekinin belirsizliğinden sildiği bit miktarı, H(X) + H(Y) − H(X, Y); bağımsızlıkta sıfır." },
    { term: "Önek kodu", definition: "Hiçbir kod sözcüğünün bir başkasının başı olmadığı kod; ayraç olmadan, okundukça anında çözülebilir." },
    { term: "Kraft eşitsizliği", definition: "Uzunlukları ℓᵢ olan bir önek kodunun var olması için gerekli ve yeterli koşul: Σ 2^(−ℓᵢ) ≤ 1." },
    { term: "Kanal kapasitesi C", definition: "Bir kanaldan kullanım başına hata olasılığı istenildiği kadar küçük tutularak aktarılabilecek en yüksek bilgi hızı; ikili simetrik kanalda 1 − H₂(p)." },
    { term: "Sendrom", definition: "Alınan dizide parite denetimlerinin sonucu; Hamming(7,4)'te üç bitlik sendrom, tek hatanın konumunu ikili sayı olarak verir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her şey lisansta <strong>Olasılık ve İstatistik</strong> dersinin üstüne kurulur: entropi rastgele değişkenin bir fonksiyonunun beklenen değeridir, ortalama şaşkınlığın H'ye yakınsaması büyük sayılar yasasıdır ve kaynak kodlama teoreminin ispatı “tipik küme” denen, olasılığın hemen tamamını taşıyan yaklaşık 2<sup>nH</sup> dizilik kümeye dayanır. Elektrik-elektronik ve bilgisayar mühendisliğinde <strong>Bilgi Kuramı</strong>, <strong>Sayısal Haberleşme</strong> ve <strong>Kodlama Kuramı</strong> derslerinde bu fikirler ispatlarıyla gelir; standart ders kitabı Cover ve Thomas'ın <em>Elements of Information Theory</em>'sidir. Bilgisayar biliminde <strong>Algoritmalar</strong> dersi Huffman'ı açgözlü algoritmaların ders kitabı örneği olarak işler.",
      "Bir sonraki basamakta sürekli kanallar gelir: bant genişliği B ve sinyal-gürültü oranıyla sınırlı bir hattın kapasitesi Shannon–Hartley yasasıyla verilir. Kodlama kuramı, Hamming'in tek hata düzelten kodundan, kapasiteye çok yaklaşan modern kodlara (LDPC, turbo ve polar kodlar) uzanır. Öbür yönde kayıplı sıkıştırma (hız-bozulma kuramı), istatistikte en çok olabilirlik ile en kısa betimleme arasındaki bağ ve makine öğrenmesinde çapraz entropi kaybı vardır: bir dil modelini eğitmek, metni olabildiğince az bitle kodlamaya çalışmakla aynı hedeftir. Fizikte ise eşit olasılıklı W durumun Shannon entropisi log₂ W'dir; Boltzmann'ın S = k ln W'si ile arada yalnız birim farkı vardır.",
    ],
    topics: ["Tipik küme ve AEP", "Kanal kodlama teoremi", "Shannon–Hartley yasası", "Doğrusal blok kodlar", "Hız-bozulma kuramı", "Çapraz entropi ve KL ıraksaması", "Kolmogorov karmaşıklığı"],
  },
  quiz: [
    {
      question: "Bir kaynak dört sembolü 1/2, 1/4, 1/8, 1/8 olasılıkla üretiyor. Huffman kodunun ortalama uzunluğu ve blok kodlamanın kazancı için hangisi doğrudur?",
      options: [
        "L = 2 bit; bloklama L'yi 1,75'e indirir",
        "L = H = 1,75 bit; bloklama hiçbir şey kazandırmaz",
        "L = 1,75 bit ama H = 1,5 bit; bloklama farkı kapatır",
        "L = H = 2 bit, çünkü dört sembol var",
      ],
      answer: 1,
      explanation: "Olasılıklar ikinin kuvveti olduğundan −log₂ p tam sayıdır (1, 2, 3, 3) ve Huffman tam bu uzunlukları verir: L = 0,5 + 0,5 + 0,375 + 0,375 = 1,75 = H. Kayıp zaten sıfırdır; sayfada “İkinin kuvvetleri” kaynağında k = 1, 2, 3 satırlarının hepsi 1,7500'dür.",
    },
    {
      question: "Bir yazılım, 1000 baytlık her dosyayı en az 1 bayt küçülttüğünü ve sonra kayıpsız geri açtığını iddia ediyor. Ne dersin?",
      options: [
        "Mümkün; LZ77 ve Huffman birlikte bunu sağlar",
        "Yalnız metin dosyalarında mümkün, rastgele dosyalarda değil",
        "İmkânsız; en az 8 bit kısalabilen dosyalar bütün dosyaların 1/128'inden azdır",
        "Mümkün, yeter ki dosya iki kez sıkıştırılsın",
      ],
      answer: 2,
      explanation: "Geri açılabilmek için farklı girdiler farklı çıktılara gitmeli. n bitlik 2ⁿ girdiye karşılık en az k bit kısa çıktı sayısı 2<sup>n−k+1</sup> − 1'dir; k = 8 için pay 2⁻⁷ = 1/128'in altındadır. Metin dosyaları kısalabilir, ama “her dosya” iddiası sayım yüzünden yanlıştır.",
    },
    {
      question: "Bir ikili simetrik kanal bitlerin %10'unu çeviriyor (C ≈ 0,531). Hızı 1/2 olan bir kodla bit hatasını 10⁻⁹'un altına indirmek mümkün müdür?",
      options: [
        "Hayır; hatayı küçültmek için hız sıfıra inmelidir",
        "Evet, ilke olarak; çünkü 1/2 < C, yeterince uzun bloklu kodlar bunu sağlar",
        "Yalnız tekrarlama koduyla, n = 2 seçerek",
        "Hayır; Hamming(7,4) bile 0,067 hatada kalıyor",
      ],
      answer: 1,
      explanation: "Shannon'ın gürültülü kanal teoremine göre C'nin altındaki her hızda hata istenildiği kadar küçültülebilir; bedel blok uzunluğu ve çözücü karmaşıklığıdır. Tekrarlama kodları bunu yapamaz (hızları 1/n), Hamming(7,4)'ün hızı 0,571 ise zaten C'nin üstündedir; ama bu, hiçbir kodun yapamayacağı anlamına gelmez.",
    },
  ],
  next: [
    { href: "entropi-ve-istatistiksel-fizik.html", title: "Entropi ve İstatistiksel Fizik: Mikro Durumlar, Boltzmann ve Ising", why: "Aynı logaritmanın fizikteki yüzü: mikro durumları say, S = k ln W'yi kur, Boltzmann dağılımını ve Ising modelini dene." },
    { href: "kombinatorik-ve-sayma.html", title: "Kombinatorik ve Sayma: Seçimler, Güvercin Yuvası, İçerme–Dışlama ve Catalan", why: "Rastgele verinin neden sıkışmadığını söyleyen güvercin yuvası ilkesi ve doğum günü sorusu, sayma tekniklerinin içinde." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik Laboratuvarı: Şifre, Özet ve Anahtar", why: "Frekans analiziyle kırılan klasik şifreler, bit cinsinden parola entropisi, özetler ve açık anahtarlı şifreleme." },
    { href: "sezar-sifre.html", title: "Sezar Şifresi: Harf Değişir, İz Kalır", why: "Artıklığın bir şifreyi nasıl ele verdiğini gör: harfler kayar ama sıklık izi kalır ve sayılarak bulunur." },
  ],
  sources: [
    { title: "Wikipedia · History of information theory", url: "https://en.wikipedia.org/wiki/History_of_information_theory", note: "Nyquist 1924, Hartley 1928 ve log Sⁿ ölçüsü, Shannon'ın 1948 makalesi ve tanıttığı kavramlar (İngilizce)." },
    { title: "Wikipedia · Huffman coding", url: "https://en.wikipedia.org/wiki/Huffman_coding", note: "Algoritma, en iyilik ve Fano'nun dersindeki dönem ödevi hikâyesi; 1952 Proceedings of the IRE makalesi (İngilizce)." },
    { title: "Wikipedia · LZ77 and LZ78", url: "https://en.wikipedia.org/wiki/LZ77_and_LZ78", note: "Ziv ve Lempel'in 1977 ve 1978 makaleleri, sözlük yöntemlerinin işleyişi ve DEFLATE ile ilişkisi (İngilizce)." },
    { title: "Wikipedia · Hamming code", url: "https://en.wikipedia.org/wiki/Hamming_code", note: "Hamming(7,4), parite denetimleri ve sendrom; Bell Model V'deki hafta sonu işlerinden 1950 yayınına uzanan tarihçe (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
