window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["algoritma-karmasikligi"] = {
  slug: "algoritma-karmasikligi",
  title: "Algoritma Karmaşıklığı: Büyüme, NP ve Yaklaşık Çözümler",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bin kat hızlı bir bilgisayar, 2ⁿ adımlık bir aramaya yalnızca on öğe ekler. Büyüme sınıfları, P ve NP, indirgeme ve kanıtlı yaklaşık çözümler: hangi problemin ölçeklendiğini sayarak gör.",
  hook:
    "Saniyede bir milyar işlem yapan bir bilgisayar bir yıl boyunca hiç durmadan çalışsın: 2ⁿ adayın hepsini deneyen bir arama en çok n = 54'e ulaşır. Bin kat hızlısını alırsan sınır 64 olur; bin kat para, on öğe. Peki bir cevabı kontrol etmek birkaç adım sürerken onu bulmak neden bu kadar pahalı görünüyor ve gerçekten pahalı olmak zorunda mı?",
  bigIdea:
    "Bir algoritmanın kaderini makinenin hızı değil, girdi büyüdükçe adım sayısının <strong>büyüme biçimi</strong> belirler; çözümü hızla doğrulanabilen her problemin hızla çözülüp çözülemeyeceği ise (<strong>P = NP?</strong>) bugün hâlâ bilinmiyor.",
  story: [
    "1956'da Kurt Gödel, John von Neumann'a yazdığı bir mektupta tuhaf bir soru sordu: bir önermenin belli uzunlukta bir kanıtı olup olmadığına, kanıt uzunluğuyla doğrusal ya da karesel büyüyen bir sürede karar verilebilir mi? Gödel'e göre cevap evetse, kanıt bulma işi büyük ölçüde makineye devredilebilirdi. Bugün geriye bakınca, bu mektupta P ve NP sorusunun erken bir biçimini görüyoruz: bulmak, doğrulamaktan gerçekten zor mudur?",
    "Soruyu matematiksel olarak sorulabilir kılan dil 1965'te kuruldu. Juris Hartmanis ve Richard Stearns, <em>On the Computational Complexity of Algorithms</em> makalesinde çok şeritli Turing makinesi üzerinde zaman karmaşıklığını tanımladı ve zaman hiyerarşi teoremini kanıtladı: bir makineye belirgin biçimde daha çok zaman verirsen, gerçekten daha çok problem çözebilir. İkisi bu çalışmayla 1993 Turing Ödülü'nü paylaştı. Aynı yıl Alan Cobham ve Jack Edmonds (<em>Paths, Trees, and Flowers</em>) ayrı makalelerde ‘iyi’ algoritmayı, adım sayısı girdi boyutunun bir polinomuyla sınırlı olan algoritma diye önerdi. Bu sınıf bugün <strong>P</strong> adını taşır. Polinomun ‘pratik’ demek olduğu bir teorem değil, bir uzlaşmadır: n¹⁰⁰ adım süren bir algoritma da P'dedir.",
    "Kırılma noktası 1971'de geldi. Stephen Cook, yeni kurulan ACM Hesaplama Kuramı Sempozyumu'nun (STOC) üçüncüsünde sunduğu <em>The complexity of theorem proving procedures</em> makalesinde, NP'deki her problemin doyurulabilirlik problemine (SAT) polinom zamanda indirgenebildiğini gösterdi. Sovyetler Birliği'nde Leonid Levin aynı fikre bağımsız olarak ulaşmış, sonuçlarını konuşmalarında anlatmıştı; <em>Evrensel arama problemleri</em> makalesi 1973'te yayımlandı ve altı ‘evrensel’ arama problemi içeriyordu. Arada, 1972'de Richard Karp <em>Reducibility among combinatorial problems</em> makalesinde SAT'tan başlayan indirgemelerle 21 problemin NP-tam olduğunu gösterdi: klik, köşe örtüsü, Hamilton devresi, kromatik sayı, sırt çantası, en fazla 3 literallı tümcelerle doyurulabilirlik ve ötekiler. Karp'ın kullandığı çoka-bir polinom indirgeme bugün onun adıyla, ‘Karp indirgemesi’ diye anılır. Cook 1982'de, Karp 1985'te Turing Ödülü aldı; iki ödülün gerekçesinde de NP-tamlık kuramı yer alır.",
    "24 Mayıs 2000'de Clay Matematik Enstitüsü, Paris'teki Collège de France'ta yedi Milenyum Problemi'ni duyurdu ve her biri için 1 milyon dolar ayırdı. Bugüne dek yalnız biri, Poincaré Sanısı çözüldü; P ve NP listede hâlâ ‘çözülmemiş’ olarak durur. William Gasarch'ın araştırmacılar arasında yaptığı anketlerde P ≠ NP diyenlerin payı 2001'de yüzde 61, 2011'de yüzde 83, 2018'de yüzde 88'di. Ama bir inanç ne kadar yaygın olursa olsun kanıt değildir: P = NP de, P ≠ NP de bugün kanıtlanmış değildir.",
  ],
  core: [
    {
      heading: "Sabit kesişimi kaydırır, sıralamayı değil",
      body:
        "n² adımlık bir yöntem, 30·n·log₂ n adımlık bir yöntemden küçük girdilerde ucuzdur: n = 100'de biri 10 000, öteki yaklaşık 19 932 adım atar. Ama oranları n/(30·log₂ n) n ile sınırsız büyür; bir yerde eğriler kesişir ve bir daha kesişmez. Kesişim n = 30·log₂ n denkleminin köküdür: yaklaşık 236,59. Asimptotik gösterim tam bu yüzden sabiti atar: makineye ve derleyiciye bağlı olan sabit, kesişimin <em>nerede</em> olduğunu belirler; büyüme biçimi ise sonunda <em>kimin</em> kazanacağını. Donanım da aynı mantıkla sınırlıdır: makine s kat hızlanınca nᵏ adımlık işte çözülebilen n, s<sup>1/k</sup> ile çarpılır (bin kat hızla n²'de × 31,6, n³'te × 10); 2ⁿ adımlık işte ise n'ye yalnızca log₂ s ≈ 10 eklenir.",
      formula: "n² = 30·n·log₂ n ⇔ n = 30·log₂ n ⇒ n* ≈ 236,59",
      formulaNote: "Sabiti 30 yerine 300 yapsan kök n ≈ 3 536'ya, yaklaşık on beş kat sağa kayar; ama n² sonunda yine kaybeder.",
    },
    {
      heading: "O, Ω ve Θ: tanık sabitleri",
      body:
        "T ∈ O(g) demek, bir c₂ &gt; 0 ve bir n₀ bulunduğunu, her n ≥ n₀ için T(n) ≤ c₂·g(n) olduğunu söyler: üst sınır. Ω aynı tanımın alt sınır yüzüdür, Θ ikisinin birden sağlanmasıdır. c ve n₀ birer <strong>tanıktır</strong>; bir tane bulmak yeter. En kullanışlı sınama limittir: T(n)/g(n) oranı 0 ile ∞ arasında bir L sayısına gidiyorsa T ∈ Θ(g). Oran salınıyorsa limit yoktur; o zaman alt ve üst limite bakılır. ‘n çiftse n², tekse n’ fonksiyonu O(n²)'dir ama Ω(n²) değildir, çünkü tek n'lerde oran 1/n ile sıfıra iner.",
      formula: "c₁·g(n) ≤ T(n) ≤ c₂·g(n), her n ≥ n₀ için ⇒ T ∈ Θ(g)",
      formulaNote: "c₁, c₂ &gt; 0 sabittir ve n'ye bağlı olamaz; n₀ ise ‘yeterince büyük’ ifadesinin kesin hâlidir.",
    },
    {
      heading: "P, NP ve sertifika",
      body:
        "<strong>P</strong>, girdi uzunluğunun bir polinomu kadar adımda karar verilebilen problemlerdir. <strong>NP</strong> ise ‘evet’ cevabı için kısa bir <strong>sertifikanın</strong> (önerilen alt küme, önerilen atama) polinom zamanda doğrulanabildiği problemlerdir. Alt küme toplamında sertifikayı doğrulamak n bit okuyup bir karşılaştırma yapmaktır, n + 1 adım; kaba kuvvet ise en kötü durumda 2ⁿ alt kümeyi dener. Her P problemi NP'dedir (sertifikaya bakmadan çöz, sonra kabul et), yani P ⊆ NP. Tersinin doğru olup olmadığı bilinmiyor. Dikkat: kaba kuvvetin 2ⁿ ile büyüdüğünü ölçmek, daha akıllı bir yöntemin olmadığını göstermez.",
      formula: "doğrulama: n + 1 adım &nbsp;·&nbsp; kaba kuvvet: en çok 2ⁿ aday",
      formulaNote: "NP, ‘polinom olmayan’ demek değildir; ‘deterministik olmayan polinom zaman’ın kısaltmasıdır.",
    },
    {
      heading: "İndirgeme: 3-SAT'tan bağımsız kümeye",
      body:
        "m tümceli bir 3-CNF formülü φ verilsin. Her tümce için üç düğümlü bir üçgen kur; düğümler tümcenin literalleridir. Ayrıca her xᵢ düğümünü her ¬xᵢ düğümüne bağla. Bu çizgede m büyüklüğünde bir <strong>bağımsız küme</strong> (aralarında kenar olmayan düğümler) ancak ve ancak φ doyurulabilirse vardır. İleri yön: doyuran atamada her tümceden bir doğru literal seç; aynı üçgenden iki düğüm alınmaz, xᵢ ile ¬xᵢ ikisi birden doğru olamaz. Geri yön: m büyüklüğündeki bir küme her üçgenden tam bir düğüm alır ve çelişen çift içermez; seçilen literalleri doğru yapmak formülü doyurur. Çizge polinom boyutludur; bağımsız küme NP'de olduğu için de <strong>NP-tamdır</strong>.",
      formula: "φ doyurulabilir ⇔ α(G) = m &nbsp;·&nbsp; |E| ≤ 3m + 9m(m − 1)/2",
      formulaNote: "Yön önemlidir: bilinen zor problemi (3-SAT) yeni probleme indirgemek, yeni problemin en az o kadar zor olduğunu gösterir.",
    },
    {
      heading: "Kanıtlı yaklaşık: köşe örtüsünde 2 katı",
      body:
        "Köşe örtüsü, her kenarın en az bir ucunu içeren düğüm kümesidir; en küçüğünü bulmak NP-zordur. Kenarları sırayla tara, iki ucu da boş olanı eşleşmeye al: elde ettiğin maksimal eşleşme M'nin kenarları ortak uç paylaşmaz. Her örtü her M kenarından en az bir uç içermek zorunda olduğundan |M| ≤ OPT. M maksimal olduğu için de M'nin 2|M| ucu bir örtüdür: hiçbir kenar iki ucu da dışarıda kalarak eşleşmeden kaçamaz. Sonuç her çizgede geçerli bir garantidir: 2|M| ≤ 2·OPT. Gezgin satıcıdaki en yakın komşu ya da 2-opt gibi <strong>sezgiseller</strong> ise çoğu örnekte iyi sonuç verse de böyle bir garanti taşımaz.",
      formula: "|M| ≤ OPT ≤ 2|M| ⇒ 2|M| / OPT ≤ 2",
      formulaNote: "Bu yöntem Fanica Gavril ve Mihalis Yannakakis'e atfedilir; sabit bir oran olarak 2'den iyisi bilinmiyor.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar saniye ölçmez; aday, toplama, literal değerlendirmesi ve dinamik programlama geçişi gibi soyut adımları sayar. Dört sekmesi var: <strong>01 · Büyüme sınıfları</strong> iki maliyeti yarıştırır, bütçe tablosunu ve O, Ω, Θ tanıklarını gösterir; <strong>02 · P ve NP</strong> alt küme toplamı ve 3-SAT'ta bulmayı doğrulamayla karşılaştırır; <strong>03 · İndirgeme</strong> bir 3-SAT formülünü çizgeye çevirir; <strong>04 · Yaklaşık çözümler</strong> gezgin satıcıda kesin turu sezgisel turla, köşe örtüsünde eşleşme yöntemini en küçük örtüyle ölçer. Bütün örnekler tohumludur; aynı tohum aynı örneği verir. Her sekmenin ‘Sekmeyi sıfırla’ düğmesi var; R tuşu da etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Sabit mi, sınıf mı?",
        predict: "n = 100'de n² mi ucuzdur, 30 n log₂ n mi? Kesişimi nerede bekliyorsun? Peki 1 000 kat hızlı bir makine, 2ⁿ adımlık işte bir yılda çözülebilen n'yi kaç artırır?",
        do: "01 · Büyüme sınıfları sekmesinde ‘n² ile 30 n log₂ n’ düğmesine bas ve dört kutuyu oku. Sonra ‘2ⁿ ile 1000 n³’ düğmesine geç. Son olarak aşağıdaki bütçe tablosunda (Makinenin hızı 10⁹ işlem/s) 2ⁿ, n² ve n³ satırlarına bak.",
        observe: "Son kesişim n* 236,59, ilk tam sayı N 237; durum satırı ‘n = 237 için A: 56 169, B: 56 089’ der. 2ⁿ ile 1000 n³'te kesişim 23,66, N = 24 (A: 1,68 × 10⁷, B: 1,38 × 10⁷). Bütçe tablosunda 2ⁿ satırı 1 saniye, 1 gün, 1 yıl için 29, 46, 54 ve son sütunda ‘+10 (n = 64)’; n³ satırı 316 010'dan ‘× 10 (n = 3 160 103)’ olur, n² satırı ‘× 31,6’.",
        explain: "n = 100'de n² 10 000, 30 n log₂ n yaklaşık 19 932 adımdır; küçük girdide sabit kazanır. n³'ün sabiti 1 000 olsa bile, n = 24'ten başlayarak 2ⁿ hep daha pahalıdır. Donanım polinom işte n'yi s<sup>1/k</sup> ile çarpar, üstel işte yalnız log₂ 1 000 ≈ 10 ekler.",
      },
      {
        title: "Bulmak ile doğrulamak",
        predict: "16 öğeli bir alt küme toplamı örneğinde kaba kuvvet kaç aday dener, bulunan sertifikayı doğrulamak kaç adım sürer? Çözüm hiç yoksa ne olur?",
        do: "02 · P ve NP sekmesini varsayılan hâlinde aç (Alt küme toplamı, n = 16, tohum 1). Kutuları ve sertifika satırını oku; sonra ‘Sertifikanın ilk bitini çevir’ kutusunu işaretle ve kaldır. Ardından ‘Çözümsüz olabilir’, sonra ‘3-SAT, m/n = 4,3’ ve ‘3-SAT, m/n = 2’ düğmelerine bas.",
        observe: "Kaba kuvvet 30 260 aday dener (2¹⁶ = 65 536'nın 46,2 %'si), doğrulama 17 adımdır (kuram n + 1 = 17); ölçülen büyüme tabanı 1,953, duvar ‘n ≈ 31,6 · n ≈ 57,3’. Bit çevrilince ‘Toplam 393 012 ≠ T: doğrulayıcı reddeder’. ‘Çözümsüz olabilir’de 65 536 adayın hepsi (100 %) denenir, doğrulama ‘Sertifika yok’, taban 2,008. Alt kümede dinamik programlama tablosu 5 242 064 hücredir (T yaklaşık 19 bit). 3-SAT'ta m/n = 4,3 iken taban 1,999, m/n = 2 iken 1,909.",
        explain: "Doğrulama n ile doğrusal, arama 2ⁿ ile büyür. ‘Hayır’ cevabı için bilinen kısa bir sertifika yoktur: ‘hayır’ı kısa sertifikayla doğrulanabilen problemler co-NP sınıfını oluşturur ve NP = co-NP olup olmadığı da açık bir sorudur. Taban 2'nin altına inebilir, çünkü çözüm erken bulunabilir; en kötü durum yine 2ⁿ'dir. Ve hiçbiri, daha akıllı bir yöntemin olmadığını kanıtlamaz.",
      },
      {
        title: "Çözümsüz bir formülün çizgesi",
        predict: "x₁, x₂, x₃ üzerindeki 8 olası tümcenin hepsini içeren formül doyurulamaz. Çizgesinde kaç çelişki kenarı olur, en büyük bağımsız küme m = 8'e ulaşabilir mi?",
        do: "03 · İndirgeme sekmesinde önce varsayılanı oku (n = 4, m = 5, tohum 7). Sonra ‘Çözümsüz’, ardından ‘Tek çözümlü’ düğmesine bas; ‘Gösterilen küme’ menüsünü ‘Kaba kuvvetin bulduğu en büyük küme’ye alarak çizimdeki kümeyi karşılaştır.",
        observe: "Varsayılan: 15 düğüm · 23 kenar, formül doyurulabilir (6 / 16 atama), α = 5 = m, ‘Atama → küme’ ‘Bağımsız, boyut 5’, ‘Küme → atama’ ‘Formülü doyurur’. Çözümsüz: 24 düğüm · 72 kenar (üçgen kenarı 24, çelişki kenarı 48), ‘Hayır’ (16 / 16), α = 7 &lt; k = 8. Tek çözümlü: 21 düğüm · 57 kenar, α = 7 = m. 200 formüllük toplu sınama her durumda 200 / 200.",
        explain: "8 tümcenin her değişkende 4'ü xᵢ, 4'ü ¬xᵢ içerir: değişken başına 4 × 4 = 16, üç değişkende 48 çelişki kenarı. Tek çözümlüde 7 tümce 4'e 3 bölünür: 3 × 12 = 36. Doyurulamayan formülde hangi literalleri seçersen seç bir üçgen boş kalır; α'nın m'ye ulaşamaması, formülün doyurulamamasının çizgedeki yüzüdür.",
      },
      {
        title: "Garanti ile şans",
        predict: "Sekiz şehirde en yakın komşu turu en kısa turdan yüzde kaç uzun olur? 2-opt bunu ne kadar kapatır? Köşe örtüsünde oran 2'yi aşabilir mi, 2'ye değebilir mi?",
        do: "04 · Yaklaşık çözümler sekmesinde varsayılanı oku (n = 8, tohum 6). Sezgisel yöntemi ‘En yakın komşu + 2-opt’ yap. Aşağıdaki köşe örtüsü bölümünde varsayılanı (n = 10, p = 0,3, tohum 1) oku, sonra ‘Seyrek: p = 0,1’ düğmesine bas.",
        observe: "En kısa tur (Held–Karp) 2,8594 birim, en yakın komşu 3,5379 birim, oran 1,2373 (23,73 %); 2-opt ile oran 1,0415 (6 hamle). Held–Karp 1 351 geçiş sayar, kuramla aynı; tek tek denenecek tur sayısı (n − 1)!/2 = 2 520. 200 örnekte en yakın komşu ort. 1,081 · en çok 1,365, 2-opt ort. 1,005 · en çok 1,086 ve en kısa turu 167 / 200 örnekte bulur. Köşe örtüsünde |M| = 4, 2|M| = 8, OPT = 4: oran tam 2. 200 çizgede en büyük oran 2, ortalama 1,587; seyrek çizgelerde ortalama 1,902.",
        explain: "Köşe örtüsündeki 2, ölçülen bir şey değil kanıtlanmış bir sınırdır: oran ona değer ama onu hiç aşamaz. En yakın komşu ve 2-opt'un iyi görünmesi ise düzgün dağılmış küçük örneklerin ölçümüdür; sayfanın da belirttiği gibi en yakın komşunun oranı üçgen eşitsizliğine uyan örneklerde bile log n ile büyüyebilir.",
      },
    ],
  },
  wow: [
    {
      title: "Bin kat hız, on öğe",
      body:
        "Saniyede 10⁹ işlemle bir yılda 2ⁿ adımlık bir arama en çok n = 54'e yetişir; 1 000 kat hızlı makinede sınır 64'tür. Aynı hız artışı n³ adımlık bir işte çözülebilen girdiyi 316 010'dan 3 160 103'e, yani on katına çıkarır. n! adımlık işte ise kazanç yalnızca iki öğedir: 18'den 20'ye.",
    },
    {
      title: "Gödel'in mektubu",
      body:
        "Cook'un makalesinden on beş yıl önce, 1956'da Kurt Gödel John von Neumann'a yazdığı mektupta, kanıt aramanın kanıt uzunluğuyla doğrusal ya da karesel zamanda yapılıp yapılamayacağını sordu. Cevap evet olsaydı, matematikçinin işinin büyük kısmı makineye devredilebilirdi.",
    },
    {
      title: "Yedi problemden biri, bir milyon dolar",
      body:
        "Clay Matematik Enstitüsü'nün 24 Mayıs 2000'de Paris'te duyurduğu yedi Milenyum Problemi'nin her biri için 1 milyon dolar ayrıldı. Bugüne dek yalnız Poincaré Sanısı çözüldü. P ve NP, araştırmacıların yüzde 88'inin (Gasarch, 2018) P ≠ NP diye düşünmesine rağmen hâlâ açık.",
    },
  ],
  worked: {
    title: "Tanığı elle bul: 3n² + 20n + 500 ∈ Θ(n²)",
    prompt:
      "Bir algoritma T(n) = 3n² + 20n + 500 adım atıyor. T ∈ Θ(n²) olduğunu c₁ = 3 ve c₂ = 4 tanıklarıyla göster; her biri için en küçük n₀'ı bul. Sonra c₂'nin 3'e yaklaşınca n₀'a ne olduğunu ve c₂ = 3'ün neden işe yaramadığını açıkla.",
    steps: [
      "Alt sınır: 20n + 500 &gt; 0 olduğundan her n ≥ 1 için T(n) ≥ 3n² (adım). Demek ki c₁ = 3 ile n₀ = 1 yeter.",
      "Üst sınır: 3n² + 20n + 500 ≤ 4n² ⇔ n² − 20n − 500 ≥ 0. Kökler n = 10 ± √600; √600 ≈ 24,49, yani pozitif kök ≈ 34,49. Eşitsizlik n ≥ 34,49 için sağlanır, en küçük tam sayı n₀ = 35.",
      "Sınırda dene: n = 34 için T = 3·1 156 + 680 + 500 = 4 648 adım, 4n² = 4 624; sınır bozulur. n = 35 için T = 3 675 + 700 + 500 = 4 875 ≤ 4n² = 4 900; sağlanır.",
      "Ölçekle: c₂ = 3 + ε için koşul ε·n² ≥ 20n + 500 olur ve n₀ yaklaşık 20/ε'dur. ε = 0,1 için 223, ε = 0,01 için 2 025, ε = 0,0001 için 200 025 çıkar. c₂ = 3'te ise 3n² + 20n + 500 ≤ 3n² hiçbir n için doğru değildir: oran T/n² yukarıdan 3'e yaklaşır ama hep 3'ün üstündedir.",
      "Sayfada dene: 01 · Büyüme sınıfları sekmesindeki tanık bölümünde T(n) ve g(n) varsayılan çifttir. Alt sabit c₁ = 3, üst sabit c₂ = 4 iken üst n₀ 35, alt n₀ 1, oran n = 10⁶'da 3,00002, limit ‘alt 3 · üst 3’, karar Θ. Üst sabiti 3 yapınca üst n₀ ‘Yok’ olur; 3,01 yazınca 2 025.",
    ],
    result:
      "c₁ = 3 (n₀ = 1) ve c₂ = 4 (n₀ = 35) tanıkları T ∈ Θ(n²) olduğunu kanıtlar. Üst sabit limite (3) yaklaştıkça n₀ yaklaşık 20/ε ile büyür; limitin kendisi ise üst sabit olamaz.",
  },
  misconceptions: [
    {
      myth: "NP, ‘polinom olmayan’ demektir; NP problemleri hızla çözülemez.",
      truth:
        "NP ‘deterministik olmayan polinom zaman’dır: ‘evet’ cevabının sertifikası polinom zamanda doğrulanabilen problemler. Her P problemi de NP'dedir. NP'deki bir problemin hızla çözülemeyeceği bilinmiyor; bilinseydi P ≠ NP kanıtlanmış olurdu.",
    },
    {
      myth: "NP-tam problemlerin polinom zamanlı algoritması olmadığı kanıtlandı.",
      truth:
        "Kanıtlanmadı. Bilinen şu: bunlardan biri için polinom algoritma bulunursa NP'deki her problem polinom zamanda çözülür (P = NP). Çoğu araştırmacı bunun olmayacağını düşünüyor, ama soru Clay listesinde hâlâ açık.",
    },
    {
      myth: "Alt küme toplamının n·(T + 1) hücrelik tablosu polinomdur; demek ki problem P'dedir.",
      truth:
        "Tablo T ile büyür; T ise yaklaşık log₂ T bitle yazılır. Girdi uzunluğuna göre bu üsteldir: algoritma <strong>sözde polinomdur</strong>. Sayfanın varsayılan örneğinde T yaklaşık 19 bit, tablo 5 242 064 hücre; kaba kuvvetin denediği 30 260 adaydan çok daha fazla.",
    },
    {
      myth: "Bir sezgisel yöntem denediğim örneklerde hep iyi çıktıysa garantilidir.",
      truth:
        "Ölçüm garanti değildir. Sayfada 2-opt 200 örneğin 167'sinde en kısa turu bulur ama 33'ünde bulamaz; en yakın komşunun oranı ise uygun seçilmiş örneklerde log n ile büyüyebilir. Köşe örtüsündeki 2 katı ise her çizge için kanıtlanmış bir sınırdır.",
    },
  ],
  glossary: [
    { term: "Asimptotik gösterim", definition: "O (üst), Ω (alt) ve Θ (sıkı) sınırlarla bir maliyetin büyük n'deki büyüme biçimini, sabit çarpanları atarak anlatan dil." },
    { term: "Tanık (c, n₀)", definition: "Bir O ya da Ω iddiasını doğrulayan sabit ve eşik: her n ≥ n₀ için eşitsizliği sağlatan bir çift." },
    { term: "P sınıfı", definition: "Girdi uzunluğunun bir polinomu kadar adımda deterministik olarak karar verilebilen problemlerin sınıfı." },
    { term: "NP ve sertifika", definition: "‘Evet’ cevabı için polinom uzunlukta bir kanıtın (sertifikanın) polinom zamanda doğrulanabildiği problemlerin sınıfı." },
    { term: "Polinom zamanlı indirgeme", definition: "A'nın her örneğini, cevabı aynı kalacak biçimde B'nin bir örneğine polinom zamanda çeviren dönüşüm; B'nin en az A kadar zor olduğunu gösterir." },
    { term: "NP-tam", definition: "NP'de olan ve NP'deki her problemin kendisine polinom zamanda indirgenebildiği problem; SAT ilk örnektir (Cook 1971, Levin 1973)." },
    { term: "Sözde polinom", definition: "Çalışma süresi girdideki sayıların değeriyle polinom, ama bu sayıları yazan bit sayısıyla üstel olan algoritma." },
    { term: "Yaklaşıklık oranı", definition: "Bir algoritmanın bulduğu çözümün en iyi çözüme oranı için kanıtlanmış üst sınır; sezgisel yöntemlerde böyle bir sınır yoktur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede ‘O(n²)’ kabaca ‘n² kadar sürer’ demektir; üniversitede, önce <strong>Ayrık Matematik</strong>'te sonra <strong>Algoritma Analizi ve Tasarımı</strong> dersinde, c ve n₀ tanıklarıyla kanıtlanan bir önermeye dönüşür. Özyinelemeli algoritmalarda adım sayısı bir yineleme bağıntısıyla yazılır ve ana teorem gibi araçlarla çözülür; amorti analiz, uzun bir işlem dizisinin toplam maliyetini işlemlere paylaştırır. Dinamik programlama (bu sayfadaki Held–Karp ve alt küme toplamı tablosu) zamanı bellekle takas etmenin en temiz örneğidir.",
      "<strong>Hesaplama Kuramı</strong> dersinde (örneğin MIT'nin Michael Sipser'le verdiği 18.404J) P ve NP Turing makinesi üzerinde kesin olarak tanımlanır ve Cook–Levin teoremi kanıtlanır: deterministik olmayan bir makinenin bütün hesabı bir mantık formülüne kodlanır. Sonra sınıfların haritası genişler: co-NP, PSPACE, rastgele algoritmalar. Yaklaşık algoritmalar dersinde ise hangi oranın mümkün olduğu sorulur: köşe örtüsünde Dinur ve Safra (2005), P ≠ NP ise 1,3606'dan iyi bir oranın olmadığını gösterdi (bu alt sınır sonraki çalışmalarla biraz daha yükseltildi); Khot ve Regev'e (2008) göre Benzersiz Oyunlar Sanısı doğruysa her ε &gt; 0 için 2 − ε oranı da ulaşılmazdır, yani 2'den iyi hiçbir sabit oran yoktur. Bu sanı da kanıtlanmış değildir. Yöneylem araştırması ve kombinatoryal eniyileme de NP-zor problemleri pratikte çözmenin yollarını arar.",
    ],
    topics: ["Yineleme bağıntıları ve ana teorem", "Amorti analiz", "Dinamik programlama", "Cook–Levin teoremi", "co-NP ve PSPACE", "Yaklaşık algoritmalar", "Parametreli karmaşıklık"],
  },
  quiz: [
    {
      question: "Bir yılda n = 54'e kadar çözebildiğin 2ⁿ adımlık bir algoritmayı 1 000 kat hızlı bir makinede çalıştırırsan, bir yılda çözebileceğin en büyük n yaklaşık ne olur?",
      options: ["54 000", "Yaklaşık 54 × 31,6 ≈ 1 700", "64", "54; hız üstel algoritmayı etkilemez"],
      answer: 2,
      explanation: "2ⁿ ≤ 1 000·B koşulu n'ye log₂ 1 000 ≈ 10 ekler, çünkü 2¹⁰ = 1 024. Sayfanın bütçe tablosu da ‘+10 (n = 64)’ gösterir. Çarpma etkisi yalnız polinom sınıflarda görülür: n² için × 31,6, n³ için × 10.",
    },
    {
      question: "Yeni bir X problemi için NP-tam olduğunu göstermek istiyorsun. Ne yapman gerekir?",
      options: [
        "X'i 3-SAT'a polinom zamanda indirgemek",
        "X'in NP'de olduğunu göstermek ve 3-SAT'ı X'e polinom zamanda indirgemek",
        "X için kaba kuvvetin 2ⁿ ile büyüdüğünü ölçmek",
        "X'in hiçbir polinom algoritması olmadığını kanıtlamak",
      ],
      answer: 1,
      explanation: "İndirgemenin yönü bilinen zor problemden yeni probleme olmalıdır: 3-SAT'ı X'e çevirebiliyorsan X en az 3-SAT kadar zordur. X'i 3-SAT'a çevirmek yalnız X'in NP'de olduğunu gösterir. Ölçüm bir şey kanıtlamaz; son seçenek ise P ≠ NP'yi kanıtlamak olurdu.",
    },
    {
      question: "Maksimal eşleşme yöntemi bir çizgede 2|M| = 12 düğümlük bir köşe örtüsü verdi. En küçük örtü OPT hakkında kesin olarak ne söylenebilir?",
      options: ["OPT = 12", "6 ≤ OPT ≤ 12", "OPT ≤ 6", "Hiçbir şey; yöntem sezgiseldir"],
      answer: 1,
      explanation: "M'nin 6 kenarı ortak uç paylaşmaz; her örtü her birinden en az bir uç almak zorundadır, yani OPT ≥ |M| = 6. Bulunan 12 düğümlük küme de bir örtüdür, yani OPT ≤ 12. Bu zincir, yöntemin 2 katı garantisinin ta kendisidir.",
    },
  ],
  next: [
    { href: "algoritmalar.html", title: "Algoritmalar: Adımları Say", why: "Sıralama, arama ve çizge yöntemlerinde karşılaştırma ve yoklamaları tek tek say; büyüme sınıfını log–log eğiminden oku ve dinamik programlamayı adım adım izle." },
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi: Turing Makineleri, Lambda Hesabı ve Çözülemezlik", why: "P ve NP'nin üzerine kurulduğu Turing makinesini kendin programla; sonra ‘ne kadar sürer?’ değil ‘hiç çözülebilir mi?’ sorusuna, durma problemine geç." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi: Yapı, Değişmezler ve Teoremler", why: "Boyama sekmesi kromatik sayıyı, Karp'ın listesindeki NP-tam problemlerden birini, 12 düğüme kadar geri izlemeyle hesaplar ve sınırlarla karşılaştırır." },
  ],
  sources: [
    { title: "Wikipedia · P versus NP problem", url: "https://en.wikipedia.org/wiki/P_versus_NP_problem", note: "Problemin tanımı, Gödel'in 1956 mektubu, Cook ve Levin, Clay ödülü ve Gasarch anketleri (İngilizce)." },
    { title: "Wikipedia · Cook–Levin theorem", url: "https://en.wikipedia.org/wiki/Cook%E2%80%93Levin_theorem", note: "SAT'ın NP-tamlığı; Cook'un 1971 STOC makalesi, Levin'in 1973 makalesi ve kanıtın taslağı (İngilizce)." },
    { title: "Wikipedia · Karp's 21 NP-complete problems", url: "https://en.wikipedia.org/wiki/Karp%27s_21_NP-complete_problems", note: "Karp'ın 1972 makalesindeki 21 problem ve SAT'tan başlayan indirgemeler (İngilizce)." },
    { title: "MIT OpenCourseWare · 18.404J Theory of Computation", url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", note: "Michael Sipser'in hesaplanabilirlik ve karmaşıklık kuramı dersi: zaman ölçüleri, tamlık, hiyerarşi teoremleri (İngilizce, video ve notlar)." },
  ],
  revision: "Kasım 2026",
};
