window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["biyoinformatik-ve-dizi-hizalama"] = {
  slug: "biyoinformatik-ve-dizi-hizalama",
  title: "Biyoinformatik: Dizileri Hizalamak, Ağaç Kurmak",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 55,
  tagline:
    "Gerçek insülin ve globin dizilerinde gen ara, hizalama tablosunu göz göz doldur, bir benzerliğin şans eseri olup olmadığını karıştırarak ölç ve uzaklıklardan soy ağacı kur.",
  hook: "İki yedi harflik dizi, GCATGCG ile GATTACA, 48 639 farklı biçimde alt alta yazılabilir. UniProt'taki 142 ve 147 harflik hemoglobin α ve β dizileri için sayı yaklaşık 1,9 × 10¹⁰⁹'dur. Yine de bilgisayar en iyi hizalamayı göz açıp kapayıncaya kadar bulur. Nasıl? Ve bulduğu benzerlik gerçekten ortak bir atadan mı geliyor, yoksa rastlantı mı?",
  bigIdea:
    "Dizi karşılaştırmak, bir puanlama kuralı seçip en iyi hizalamayı dinamik programlamayla bulmak ve ardından bu puanın rastgele dizilerle açıklanıp açıklanamayacağını sormaktır; ağaç kurmak ise bu karşılaştırmalardan çıkan uzaklıkları, varsayımlarını bilerek yorumlamaktır.",
  story: [
    "1965'te bilinen bütün protein dizileri tek bir kitaba sığıyordu. Biyofizikçi Margaret Dayhoff'un o yıl yayımladığı <em>Atlas of Protein Sequence and Structure</em>, bilinen 65 diziyi bir araya getirdi. Veri dosyaları küçülsün diye amino asitlere birer harf verdi; bu tek harfli kod IUPAC tarafından benimsendi ve bugün de kullanılıyor (<a href=\"https://en.wikipedia.org/wiki/Margaret_Oakley_Dayhoff\">Dayhoff</a>). 1978'de 71 yakın akraba protein ailesinde gözlenen 1572 değişimden <strong>PAM</strong> puanlama matrislerini türetti.",
    "Algoritmalar da aynı yıllarda geldi. Saul Needleman ve Christian Wunsch 1970'te <em>Journal of Molecular Biology</em>'de iki proteinin bütünüyle hizalanması için bir yöntem yayımladı; bu, dinamik programlamanın biyolojik dizilere ilk uygulamalarından biridir. Temple Smith ve Michael Waterman 1981'de aynı dergide, tablodaki negatif değerleri sıfıra çekerek dizilerin yalnızca en benzer parçalarını bulan yerel hizalamayı tanıttı. 1992'de Steven ve Jorja Henikoff, 500'den fazla protein grubunu temsil eden yaklaşık 2000 korunmuş bloktan <strong>BLOSUM</strong> matrislerini çıkardı; BLOSUM62 bugün protein BLAST'ın varsayılan matrisidir.",
    "Veri tabanları büyüdükçe her diziyi tam tabloyla taramak yavaşladı. 1990'da ABD Ulusal Sağlık Enstitüleri'ne bağlı NCBI'da Altschul, Gish, Miller, Myers ve Lipman <strong>BLAST</strong>'ı yayımladı; makale, karşılaştırılabilir duyarlılıktaki araçlardan bir mertebe hızlı olduğunu bildiriyordu. Aynı yıl Samuel Karlin ve Altschul, yüksek puanlı bir parçanın şans eseri ortaya çıkma olasılığını hesaplayan kuramı PNAS'ta yayımladı; BLAST'ın E değerleri bu uç değer kuramına dayanır. Ağaç tarafında Naruya Saitou ve Masatoshi Nei 1987'de <strong>komşu birleştirme</strong> yöntemini önerdi ve bilgisayar benzetimiyle UPGMA dahil beş yöntemle karşılaştırdı.",
    "Bu araçların en büyük sınavı <a href=\"https://en.wikipedia.org/wiki/Human_Genome_Project\">İnsan Genomu Projesi</a> oldu. 1990'da başlayan proje 2000'de bir taslak açıkladı ve 14 Nisan 2003'te, genomun yaklaşık %92'sini kapsayarak tamamlandı ilan edildi; maliyeti yaklaşık 2,7 milyar dolardı. Uzun tekrarlarla dolu kalan bölgeler Telomerden Telomere konsorsiyumunun çalışmasıyla kapandı: Y dışındaki kromozomlar 2022'de, Y kromozomu 2023'te. Bugün bir laboratuvarın yeni bulduğu her gen, ilk iş olarak bu sayfadaki yöntemlerin torunlarıyla bilinen dizilere karşı aranır.",
  ],
  core: [
    {
      heading: "Dizi bir metindir: iki iplik, altı çerçeve",
      body: "DNA dört harfli bir metindir ve FASTA biçiminde bir başlık satırı ile düz harflerden oluşur. Çift sarmalın öbür ipliği <strong>ters tümleyen</strong>dir: diziyi tersten oku ve A↔T, C↔G değiştir. Bir protein kodlayan bölge üç bazlık kodonlarla okunur; okuma ilk, ikinci ya da üçüncü bazdan başlayabilir ve iki iplik vardır, yani altı <strong>okuma çerçevesi</strong>. ATG'den başlayıp bir dur kodonuna (TAA, TAG, TGA) kadar kesintisiz giden parçaya <strong>açık okuma çerçevesi</strong> (ORF) denir. 64 kodonun 3'ü dur olduğundan rastgele bir dizide uzun ORF hızla seyrekleşir: uzun bir ORF, orada gerçek bir gen olabileceğinin ilk işaretidir. Ama yalnızca işarettir; insan genlerindeki intronları bu basit tarama görmez.",
      formula: "E[ORF ≥ k kodon] ≈ 6 · (L/3) · (1/64) · (3/4) · (61/64)<sup>k−1</sup> = (3L/128) · (61/64)<sup>k−1</sup>",
      formulaNote: "Altı çerçevede L/3 kodon; her biri 1/64 olasılıkla ATG'dir ve 3/4 olasılıkla kendi ORF'unun ilk ATG'sidir (geriye doğru giderken dur kodonu, başka bir ATG'den 3 kat sık gelir); ardından k − 1 kodonun hiçbiri dur olmamalıdır. Eşit baz sıklığı ve uzun dizi için geçerlidir; sayfa bileşimi ve dizinin uçlarını da hesaba katar.",
    },
    {
      heading: "Hizalama ve dinamik programlama",
      body: "İki diziyi hizalamak, harfleri sütunlar halinde alt alta yazmak, gerekirse araya boşluk (–) koymaktır. Her sütun bir puan alır: eşleşmeye ödül, uyuşmazlığa ve boşluğa ceza. Bütün hizalamaları tek tek denemek umutsuzdur, sayıları Delannoy sayıları gibi üstel büyür. <strong>Needleman–Wunsch</strong> yöntemi şunu fark eder: A'nın ilk i ve B'nin ilk j harfinin en iyi hizalaması, son sütunun yalnızca üç biçiminden birinde biter. Bu yüzden (n + 1) × (m + 1)'lik bir tabloyu sol üstten sağ alta doldurmak yeter; her göz yalnızca üç komşusuna bakar. Sağ alt göz en iyi küresel puandır, oklar geri izlenerek hizalama okunur. <strong>Smith–Waterman</strong> tek bir değişiklikle yerel hizalama yapar: gözler 0'ın altına inmez ve geri izleme tablonun en büyük gözünden başlar.",
      formula: "F(i, j) = max { F(i−1, j−1) + s(a<sub>i</sub>, b<sub>j</sub>),  F(i−1, j) − g,  F(i, j−1) − g }   [yerelde ayrıca 0]",
      formulaNote: "İş miktarı n·m gözle orantılıdır: iki diziyi iki katına çıkarmak işi dört katına çıkarır, üstel değil. Gerçek proteinlerde boşluk cezası afindir (açma a, her harf b: a + b·k); Gotoh 1982'de bunu üç tabloyla yine n·m adımda çözdü.",
    },
    {
      heading: "Puan nereden gelir: BLOSUM62",
      body: "Proteinlerde her uyuşmazlık eşit kötü değildir. İzolösinin valine dönüşmesi işlevi çoğu zaman bozmaz, triptofanın glisine dönüşmesi bozabilir. Puanlama matrisleri bunu veriden öğrenir: akraba proteinlerin hizalı bloklarında i ile j'nin karşı karşıya gelme sıklığı p<sub>ij</sub>, harflerin genel sıklıklarından beklenen q<sub>i</sub>q<sub>j</sub> ile karşılaştırılır. Oran 1'den büyükse puan pozitif, küçükse negatiftir. BLOSUM62'de 62, en az %62 özdeş dizilerin tek bir küme gibi sayıldığı anlamına gelir; puanlar yarım bit birimindedir. Nadir ve yeri zor doldurulan triptofanın kendisiyle eşleşmesi 11, sık görülen alaninin 4 puandır. PAM, yakın akrabalardan dışa doğru uzatılarak; BLOSUM, uzak akrabaların bloklarından doğrudan çıkarılmıştır.",
      formula: "S<sub>ij</sub> = (1/λ) · log ( p<sub>ij</sub> / (q<sub>i</sub> q<sub>j</sub>) )",
      formulaNote: "Log-olabilirlik oranı: \"akrabalık\" ile \"rastlantı\" modellerinin aynı harf çiftini üretme olasılıklarının oranı. Bağımsız sütunların puanları toplandığında toplam puan da bir log-oran olur.",
    },
    {
      heading: "Puan şans eseri mi: karıştırma ve uç değerler",
      body: "Herhangi iki dizi için bir \"en iyi\" hizalama her zaman vardır; soru, puanın rastlantıyla açıklanıp açıklanamayacağıdır. Sayfa bunu doğrudan ölçer: ikinci diziyi harf bileşimini koruyarak N kez karıştırır, her seferinde en iyi yerel puanı hesaplar ve gözlenen S'nin bu dağılımın neresine düştüğüne bakar. Gözlenen puanı geçen k karıştırma varsa <strong>permütasyon p değeri</strong> (k + 1)/(N + 1)'dir; bu yüzden 200 karıştırmayla 1/201'den küçük bir p ölçülemez. En iyi yerel puan bir maksimumdur ve maksimumlar normal değil <strong>Gumbel</strong> (uç değer) dağılımına uyar: kuyruğu üstel incelir. Karlin–Altschul kuramı ve BLAST'ın E değeri bu kuyruğa dayanır: D dizilik bir veri tabanında aynı puanı şansla aşan beklenen dizi sayısı, küçük p için yaklaşık p·D'dir.",
      formula: "P(S ≥ x) = 1 − exp(−e<sup>−λ(x − u)</sup>) ;  λ = π / (s√6), u = <span class=ov>S</span> − 0,5772/λ",
      formulaNote: "Sayfa λ ve u'yu karıştırılmış puanların ortalaması ve standart sapmasından (momentler yöntemi) bulur. Gözlenen puan dağılımın çok dışındaysa kestirim kabadır. Küresel puanlar maksimum olmadığından bu formül onlara uygulanmaz.",
    },
    {
      heading: "Uzaklıktan ağaca: Jukes–Cantor, UPGMA, NJ",
      body: "İki dizinin farklı olduğu konumların payı <strong>p uzaklığı</strong>dır. Ama aynı konum iki kez değişmiş ya da eski haline dönmüş olabilir; p gerçek değişim sayısını hep küçük gösterir ve DNA'da 3/4'e doyar. <strong>Jukes–Cantor</strong> modeli bütün değişimlerin eşit hızlı olduğunu varsayarak bu gizli değişimleri geri ekler. Uzaklıklardan ağaç kurmanın iki klasik yolu vardır. <strong>UPGMA</strong> her adımda en yakın iki kümeyi birleştirir ve köklü bir ağaç verir; bu, bütün soyların aynı hızda evrildiğini (moleküler saat) varsayar. <strong>Komşu birleştirme</strong> (NJ) her adımda Q değerini en küçük yapan çifti birleştirir; uzaklıklar bir ağacın yol uzunluklarına tam uyuyorsa (toplanabilir) doğru ağacı bulması garantidir ve saat varsayımı gerekmez. Bedeli: kök vermez, kök bir dış grupla seçilir.",
      formula: "d = −(3/4) ln(1 − 4p/3) ;  Q(i, j) = (n − 2)·d(i, j) − Σ<sub>k</sub> d(i, k) − Σ<sub>k</sub> d(j, k)",
      formulaNote: "Proteinler için 20 harfli biçim d = −(19/20) ln(1 − 20p/19). p 3/4'e yaklaştıkça d sonsuza gider ve küçük bir sayım hatası d'de büyük bir hataya dönüşür.",
    },
  ],
  lab: {
    intro:
      "Sayfada beş sekme var: <strong>01 · Dizi ve genetik kod</strong> (FASTA kutusu, ORF haritası, altı çerçevede çeviri; NCBI RefSeq NM_000207.3 insülin mRNA'sı yüklü açılır), <strong>02 · Nokta grafiği ve düzenleme</strong> (pencere w ve eşik t kaydırıcıları, kitten/sitting düzenleme uzaklığı), <strong>03 · Hizalama tablosu</strong> (<kbd>Bir göz</kbd>, <kbd>Bir satır</kbd>, <kbd>Hepsini doldur</kbd>; tablonun sonucu kaba kuvvetle denetlenir), <strong>04 · Gerçek proteinler ve anlamlılık</strong> (UniProt dizileri, BLOSUM62, afin boşluk, karıştırma testi) ve <strong>05 · Uzaklık ve ağaçlar</strong> (yapay JC verisi ya da insan globinleri; UPGMA ve komşu birleştirme). Rastgele işlemler tohumludur: aynı ayarlar aynı sayıları verir. Her sekmede <kbd>Sekmeyi sıfırla</kbd> var; altta üç seviyeli bir alıştırma üreteci bulunur.",
    experiments: [
      {
        title: "Rastgele dizide gen var mı?",
        predict: "İnsülin mRNA'sında 110 amino asitlik bir ORF var. Hiç gen içermeyen 600 bazlık rastgele bir dizide en az 30 amino asitlik kaç ORF bulursun? Sınırı 60'a çıkarınca ne olur?",
        do: "01 sekmesini varsayılan haliyle oku. Sonra <kbd>Rastgele dizi (yapay)</kbd> düğmesine bir kez bas (her basış yeni bir dizi üretir; buradaki sayılar ilk basışın) ve sayıları oku. Ardından <em>En kısa ORF</em> kaydırıcısını 60 aa'ya getir.",
        observe: "İnsülin: 465 baz, GC %63,9; en uzun ORF 60..392 (+3), 110 amino asit, kayıttaki CDS ile aynı ve çevirisi UniProt P01308 ile harfi harfine aynı. Rastgele dizi: 5 ORF, beklenen ≈ 2,55, en uzunu 85 amino asit. Sınır 60'ta: 1 ORF, beklenen ≈ 0,43. İnsülin bileşimindeki rastgele bir dizide ≥ 110 amino asitlik bir ORF beklentisi yalnızca 0,055.",
        explain: "Her kodonun dur olma olasılığı kabaca 3/64 olduğundan, ORF uzunluğu arttıkça rastgele beklenti (61/64)<sup>k</sup> gibi üstel düşer. Kısa ORF'ler her dizide çıkar; 110 kodonluk kesintisiz bir parça ise rastlantıyla zor açıklanır. Yine de gen bulmak bundan ibaret değildir: tarama yalnızca ATG'yi tanır ve intronları bilmez.",
      },
      {
        title: "Tablo en iyiyi gerçekten bulur mu?",
        predict: "7 × 7 harflik iki dizinin 49 gözlük tablosu, 48 639 olası hizalamanın en iyisini kaçırmadan bulabilir mi? Aynı iki diziyi küresel ve yerel hizalamak aynı puanı verir mi?",
        do: "03 sekmesi GCATGCG / GATTACA (+1/−1/−1) ile açılır. <kbd>Boşalt</kbd> deyip <kbd>Bir göz</kbd> ile birkaç gözü izle, sonra <kbd>Hepsini doldur</kbd>. Ardından <kbd>Yerel örnek</kbd> düğmesine bas; son olarak <em>Hizalama</em> menüsünü Küresel (NW) yap.",
        observe: "Varsayılan: sağ alt göz 0, eş-en iyi 3 yol; kaba kuvvet 48 639 hizalamanın hepsini puanlıyor, en iyisi de 0 (GCA-TGCG / G-ATTACA). Yerel örnek (TGTTACGG / GGTTGACTA, +3/−3, boşluk 2): en büyük göz 13, hizalama GTT-AC / GTTGAC; kaba kuvvet 598 417 hizalamada yine 13. Aynı diziler küresel: 4.",
        explain: "Tablo her gözde son sütunun üç olasılığını karşılaştırdığı için hiçbir hizalamayı atlamaz, ama her birini ayrı ayrı yazmaz: 72 göz, 598 417 hizalamanın işini görür. Yerel ve küresel hizalama farklı sorulardır: biri dizilerin en benzer parçasını, öbürü baştan sona en iyi eşleşmeyi arar. Uçlardaki uyuşmaz harfler küresel puanı 13'ten 4'e düşürür.",
      },
      {
        title: "Puan yüksek, ama şans eseri mi?",
        predict: "Hemoglobin α ile miyoglobin yalnızca %27,5 özdeş; preproinsülinle hemoglobin α'nın hizalanan parçası ise %45,5 özdeş. Hangisi ortak bir atayı daha güçlü gösterir?",
        do: "04 sekmesinde (yerel, açma 11, uzatma 1, 200 karıştırma, tohum 1) <em>Dizi çifti</em> menüsünden sırayla Hemoglobin α – β, Hemoglobin α – miyoglobin, Hemoglobin β – lizozim ve Preproinsülin – hemoglobin α'yı seç. Her seferinde ilerleme çubuğu dolana kadar bekle.",
        observe: "α–β: S 285, %44,5 (61/137), karıştırılmış ort. 28,9 ± 4,8, p ≤ 0,0050, z 53,9. α–miyoglobin: S 123, %27,5, p ≤ 0,0050, Gumbel 1,30 × 10⁻¹¹. β–lizozim: S 21, ort. 25,8 ± 4,0, p 0,950. Preproinsülin–α: S 29, %45,5 ama yalnızca 44 sütun ve 14 boşluklu sütun, p 0,124.",
        explain: "Özdeşlik yüzdesi kısa bir parçada kolayca yüksek çıkar; belirleyici olan puanın, aynı bileşimdeki rastgele dizilerin en iyi puanlarıyla karşılaştırılmasıdır. Miyoglobin uzak bir akrabadır ama 142 sütun boyunca biriken puan rastlantıyla açıklanamaz. β–lizozimde ise bir hizalama yine çıkar, yalnızca anlamsızdır. 200 karıştırmayla p'nin 1/201'den küçük olduğu ölçülemez; daha küçük değerler Gumbel kuyruğundan kestirilir.",
      },
      {
        title: "UPGMA ne zaman yanılır?",
        predict: "Altı dizilik bir ağaçta A'nın soyunda evrim birden hızlanırsa, A en çok kime benzer görünür? En yakın çifti birleştiren UPGMA ile komşu birleştirme aynı ağacı bulur mu?",
        do: "05 sekmesini varsayılanla oku (moleküler saat geçerli, 1000 baz, tohum 1). <em>Veri</em> menüsünden \"bir soyda hızlanma (uzun dal)\" seç, <kbd>Önyükleme: 100 tekrar</kbd> düğmesine bas. Sonra <em>Evrim süresi</em>ni ×4 yap. En son Veri'yi \"insan globinleri\" yap.",
        observe: "Saat geçerliyken ikisi de doğru topoloji (Robinson–Foulds 0); A–B gerçek 0,100, p 0,088, JC 0,094. Uzun dalda UPGMA yanlış (RF 2), NJ doğru: A–B p 0,434 iken B–C yalnızca 0,124. Önyükleme UPGMA'nın yanlış ağacının iç dallarına bile 100, 100, 100 yazar; NJ'nin doğru ağacında destekler 100, 98, 88. Süre ×4: ikisi de yanlış. Globinler: HBB–HBD p 0,068, HBA–MB p 0,725 ve JC-20 d 1,370; NJ miyoglobinle köklenince (MB,((HBG1,(HBB,HBD)),HBA)).",
        explain: "UPGMA \"en benzer olan en yakın akrabadır\" der; bu yalnızca hızlar eşitse doğrudur. NJ ise uzaklıkların ağaç üzerindeki yol uzunlukları olduğunu kullanır, uzun dalı düzeltir. Önyükleme desteği verinin tutarlılığını ölçer, yöntemin doğruluğunu değil: yanlış varsayımlı bir yöntem her tekrarda aynı yanlışı yapar. Süre uzayınca p doymaya yaklaşır ve JC düzeltmesi küçük sayım hatalarını büyütür: hiçbir yöntem gürültüden ağaç çıkaramaz. Globin ağacı türlerin değil, aynı genomdaki gen kopyalarının (paralogların) ağacıdır.",
      },
    ],
  },
  wow: [
    {
      title: "48 639 hizalama, 49 göz",
      body: "İki yedi harflik dizinin olası bütün hizalamalarının sayısı Delannoy sayısı D(7, 7) = 48 639'dur ve uzunlukla üstel büyür. Dinamik programlama tablosu ise yalnızca 7 × 7 = 49 göz doldurur. Sayfa küçük dizilerde ikisini yan yana koyar: kaba kuvvetin bulduğu en iyi puan, tablonun verdiği puanla (küreselde sağ alt göz, yerelde en büyük göz) her seferinde aynıdır.",
    },
    {
      title: "Bir harfin mirası",
      body: "Proteinleri bugün MVHLTPEEK gibi tek harflerle yazmamızın nedeni Margaret Dayhoff'tur. Veri dosyalarını küçültmek için her amino aside bir harf verdi; kod IUPAC tarafından benimsendi. 1965'teki atlası bilinen bütün protein dizilerini, toplam 65 tanesini, tek bir kitapta topluyordu.",
    },
    {
      title: "On üç yıl, 2,7 milyar dolar ve kalan %8",
      body: "İnsan Genomu Projesi 1990'da başladı ve Nisan 2003'te tamamlandı ilan edildi; yaklaşık 2,7 milyar dolara mal oldu. Ama \"tamam\" denen dizi genomun yaklaşık %92'siydi; proje zaten yalnızca ökromatin bölgelerini hedeflemişti. Uzun tekrarlarla dolu kalan kısım ancak Telomerden Telomere konsorsiyumunun çalışmasıyla kapandı: Y dışındaki kromozomlar 2022'de, Y 2023'te. Tekrarlar tam da hizalamanın en zorlandığı yerlerdir: nokta grafiğinde ana köşegene paralel çizgiler olarak görünürler.",
    },
  ],
  worked: {
    title: "Gizli değişimleri saymak: Jukes–Cantor düzeltmesi",
    prompt: "05 sekmesinde varsayılan veride (saat, 1000 baz, tohum 1) A ile C dizileri 1000 konumun 236'sında farklı. Jukes–Cantor uzaklığını bul, kaç değişimin \"gizli\" kaldığını söyle ve kestirimin standart hatasını yaklaşık hesapla. Gerçek ağaçtaki yol uzunluğu 0,300 ile karşılaştır.",
    steps: [
      "p uzaklığı: p = 236 / 1000 = 0,236. Bu, gözlenen farklı konumların payıdır; aynı konumda birden fazla değişim tek fark gibi görünür.",
      "Jukes–Cantor: d = −(3/4) ln(1 − 4·0,236/3) = −0,75 · ln(0,68533) = −0,75 · (−0,37784) ≈ 0,283 konum başına değişim. Tablodaki A–C satırı da 0,236 ve 0,283'tür.",
      "1000 konumda bu yaklaşık 283 değişim demektir; yalnızca 236'sı fark olarak görünüyor. Yaklaşık 47 değişim ya aynı konuma ikinci kez düşmüş ya da eski bazı geri getirmiştir.",
      "Hata: sayım binomdur, Var(p) = p(1 − p)/L. d'nin p'ye göre türevi 1/(1 − 4p/3) olduğundan (delta yöntemi) SE(d) ≈ √(p(1 − p)/L) / (1 − 4p/3) = √(0,236·0,764/1000) / 0,68533 ≈ 0,0134 / 0,68533 ≈ 0,020.",
      "Gerçek değer 0,300, kestirimden 0,017 uzakta, yani bir standart hatanın içinde. Düzeltmesiz p ise 0,064 aşağıdadır, üç standart hatadan fazla. p büyüdükçe 1 − 4p/3 sıfıra yaklaşır ve hata hızla büyür: doyma budur.",
    ],
    result: "d ≈ 0,283 ± 0,020 (konum başına değişim); yaklaşık 47 değişim gözden saklı. Düzeltme kestirimi gerçek 0,300'e yaklaştırır, ama bedeli daha büyük belirsizliktir.",
  },
  misconceptions: [
    {
      myth: "Özdeşlik yüzdesi yüksekse iki dizi kesin akrabadır.",
      truth: "Kısa bir parçada yüksek özdeşlik kolayca rastlantıyla çıkar. Sayfada preproinsülin ile hemoglobin α'nın 44 sütunluk parçası %45,5 özdeş ama karıştırma testinde p 0,124; hemoglobin α ile miyoglobin yalnızca %27,5 özdeş ama p ≤ 0,0050. Karar, puanın aynı bileşimdeki rastgele dizilerle karşılaştırılmasıyla verilir.",
    },
    {
      myth: "En benzer iki tür en yakın akrabadır.",
      truth: "Bu yalnızca bütün soylar aynı hızda evrildiyse doğrudur. Bir soyda hız artarsa o tür kardeşine bile uzak görünür: sayfanın uzun dal verisinde A–B p 0,434 iken B–C 0,124, yine de A ile B kardeştir. UPGMA bu yüzden yanılır; komşu birleştirme uzaklıkları ağaç üzerindeki yollar olarak ele aldığı için doğru ağacı bulur.",
    },
    {
      myth: "Bir dizinin tümleyeni, karşı ipliği verir.",
      truth: "Karşı iplik ters tümleyendir: iplikler zıt yönlüdür (5′→3′ ve 3′→5′), bu yüzden hem harfleri değiştirmek hem diziyi tersten okumak gerekir. Yalnızca tümleyen almak eksi iplikteki genleri görünmez kılar; sayfadaki \"Eksi iplikte gen\" örneğinde 45 kodonluk gen ancak −1 çerçevesinde çıkar.",
    },
    {
      myth: "p değeri 0 çıktı; benzerliğin şansla oluşma olasılığı sıfır.",
      truth: "N karıştırmanın hiçbiri gözlenen puana ulaşmasa da permütasyon p değeri ancak \"en çok 1/(N + 1)\" diye söylenebilir: 200 karıştırmayla ≤ 0,0050. Daha küçük değerler için ya daha çok karıştırma ya da Gumbel kuyruğu gibi bir modelden dış değerleme gerekir; o da kaba bir kestirimdir.",
    },
  ],
  glossary: [
    { term: "Açık okuma çerçevesi (ORF)", definition: "Bir başlangıç kodonundan (ATG) aynı çerçevedeki ilk dur kodonuna kadar kesintisiz uzanan, protein kodlayabilecek dizi parçası." },
    { term: "Ters tümleyen", definition: "Bir DNA dizisinin harfleri tümleyenleriyle değiştirilip tersten okunmuş hali; çift sarmalın öbür ipliğini 5′→3′ yönünde verir." },
    { term: "Küresel ve yerel hizalama", definition: "Küresel hizalama iki diziyi baştan sona eşler (Needleman–Wunsch); yerel hizalama yalnızca en yüksek puanlı ortak parçayı bulur (Smith–Waterman)." },
    { term: "Afin boşluk cezası", definition: "k harflik bir boşluğa a + b·k ceza veren kural; tek uzun boşluğu, aynı toplam uzunluktaki birçok kısa boşluktan daha az cezalandırır." },
    { term: "BLOSUM62", definition: "Uzak akraba proteinlerin korunmuş bloklarındaki amino asit değişim sıklıklarından türetilen, yarım bit birimli log-oran puanlama matrisi." },
    { term: "E değeri", definition: "Belirli bir veri tabanında, akraba olmayan dizilerin şans eseri en az gözlenen puan kadar puan alacağı beklenen sayı." },
    { term: "Homolog, paralog", definition: "Homolog diziler ortak bir atadan gelir; paraloglar bu ortak atadan aynı genomdaki bir gen çoğalmasıyla ayrılmış kopyalardır (ör. hemoglobin α ve β)." },
    { term: "Moleküler saat", definition: "Değişimlerin bütün soylarda zamanla aynı hızda biriktiği varsayımı; UPGMA bu varsayıma dayanır, komşu birleştirme dayanmaz." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfa üç dersin kesişiminde durur. Algoritmalar dersinde dinamik programlama, en uzun ortak alt dizi ve düzenleme uzaklığıyla öğretilir; burada aynı fikir tabloyu göz göz doldurarak görünür ve O(nm) ile üstel sayım arasındaki fark ölçülür. Olasılık ve istatistik dersinde permütasyon testleri, p değerinin anlamı ve uç değer dağılımları; moleküler biyoloji ve genetikte genetik kod, okuma çerçeveleri, gen çoğalmaları ve moleküler evrim.",
      "Lisans biyoinformatik derslerinde sonraki adımlar, bu sayfanın kasıtlı olarak sınırlı bıraktığı yerlerdir: çoklu dizi hizalaması ve profil yöntemleri, gizli Markov modelleriyle protein aileleri, Kimura ve GTR gibi daha zengin değişim modelleri, olabilirlik ve Bayesçi ağaç kurma, okuma hizalama ve genom birleştirme. Hepsinin ortak dili yine burada gördüğün üçlüdür: bir puanlama modeli, en iyiyi bulan bir algoritma ve sonucun şansla açıklanıp açıklanamayacağını soran bir istatistik.",
    ],
    topics: ["Dinamik programlama", "Log-olabilirlik oranı", "Permütasyon testi", "Uç değer (Gumbel) dağılımı", "Jukes–Cantor ve değişim modelleri", "Komşu birleştirme ve UPGMA", "Çoklu hizalama ve gizli Markov modelleri"],
  },
  quiz: [
    {
      question: "Needleman–Wunsch ile 300 ve 400 harflik iki protein 0,1 saniyede hizalanıyor. Her iki dizi de iki katına (600 ve 800 harf) çıkarsa süre kabaca ne olur?",
      options: ["0,2 saniye", "0,4 saniye", "0,8 saniye", "Olası hizalama sayısı üstel büyüdüğü için saatler"],
      answer: 1,
      explanation: "Tablo (n + 1)(m + 1) gözdür ve her göz sabit iş ister; n ile m iki katına çıkınca göz sayısı 2 · 2 = 4 katına çıkar. Olası hizalamaların sayısı gerçekten üstel büyür, ama dinamik programlama onları tek tek saymaz; sayfadaki kaba kuvvet denetimi bu yüzden yalnızca kısa dizilerde yapılır.",
    },
    {
      question: "Bir sorgu proteini için 200 karıştırmanın hiçbiri gözlenen yerel puana ulaşmadı. Hangi yorum doğrudur?",
      options: ["Benzerliğin şansla oluşma olasılığı tam sıfırdır", "p değeri en çok 1/201 ≈ 0,005'tir; daha küçüğünü ölçmek için daha çok karıştırma ya da bir kuyruk modeli gerekir", "Özdeşlik yüzdesine bakmadan bir şey söylenemez", "Küresel hizalamaya geçilirse p değeri kesinleşir"],
      answer: 1,
      explanation: "Permütasyon p değeri (k + 1)/(N + 1)'dir; k = 0 iken yalnızca bir üst sınır verir. Sayfada N'yi 1000 yapınca HBA–HBB için sınır ≤ 0,0010'a iner. Gumbel kuyruğu çok daha küçük bir değer kestirir, ama gözlenen dağılımın çok dışına uzandığı için kabadır.",
    },
    {
      question: "İki DNA dizisi konumların %70'inde farklı (p = 0,70). Jukes–Cantor modeline göre en doğru yorum hangisi?",
      options: ["Konum başına yaklaşık 0,70 değişim olmuştur", "Diziler akraba değildir, çünkü p 0,5'ten büyük", "d ≈ 2 kadar büyüktür ama p doymaya (0,75) çok yakın olduğu için kestirim çok belirsizdir", "Düzeltme p'yi küçültür, yani gerçek uzaklık 0,70'ten azdır"],
      answer: 2,
      explanation: "d = −(3/4) ln(1 − 4·0,70/3) = −0,75 ln(0,0667) ≈ 2,03. Tersinden, d = 2 için p = (3/4)(1 − e<sup>−8/3</sup>) ≈ 0,698. Bu bölgede 1 − 4p/3 sıfıra yakındır; küçük bir sayım hatası d'yi çok oynatır. Sayfanın uzun dal verisinde evrim süresini ×4 yapınca iki ağaç yönteminin de yanılması bu yüzdendir.",
    },
  ],
  next: [
    { href: "algoritmalar.html", title: "Algoritmalar: Adımları Say", why: "O sayfanın 04 sekmesindeki en uzun ortak alt dizi tablosu, burada kullanılan dinamik programlamanın genel biçimi; üstel arama ile O(nm) arasındaki farkı başka problemlerde de görürsün." },
    { href: "gen-ifadesi-ve-molekuler-biyoloji.html", title: "Gen İfadesi ve Moleküler Bilgi Akışı Laboratuvarı", why: "Burada okuduğun dizilerin nasıl transkripsiyon ve çeviriyle proteine dönüştüğünü, kodonların nasıl okunduğunu ve gen ifadesinin nasıl düzenlendiğini anlatır." },
    { href: "dogal-secilim.html", title: "Doğal Seçilim: Popülasyon Genetiği Laboratuvarı", why: "Dizilerdeki farkları biriktiren süreçler: Hardy–Weinberg, seçilim, genetik sürüklenme, göç ve mutasyon." },
    { href: "hipotez-testi-ve-guven-araligi.html", title: "Hipotez Testi ve Güven Aralığı: Örnekleme, p-Değeri, Hata Türleri ve Güç", why: "Karıştırma testinde kullandığın p değerinin genel anlamı, hata türleri ve bir testin gücünün örneklem büyüklüğüne nasıl bağlı olduğu." },
  ],
  sources: [
    { title: "Wikipedia: Point accepted mutation", url: "https://en.wikipedia.org/wiki/Point_accepted_mutation", note: "Dayhoff'un PAM matrisleri (1978): 71 yakın akraba protein ailesinin soy ağaçlarında 1572 değişim; hizalamalar en az %85 özdeş." },
    { title: "Wikipedia: Needleman–Wunsch algorithm", url: "https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm", note: "1970 makalesi, dinamik programlamanın dizilere ilk uygulamalarından biri; O(nm) karmaşıklık ve GCATGCG / GATTACA örneği." },
    { title: "PubMed: Henikoff ve Henikoff 1992, Amino acid substitution matrices from protein blocks", url: "https://pubmed.ncbi.nlm.nih.gov/1438297/", note: "PNAS, 15 Kasım 1992: 500'den fazla protein grubundan yaklaşık 2000 blok; BLOSUM matrisleri." },
    { title: "PubMed: Altschul ve ark. 1990, Basic local alignment search tool", url: "https://pubmed.ncbi.nlm.nih.gov/2231712/", note: "J Mol Biol, 5 Ekim 1990, NCBI: BLAST ve yerel hizalama puanlarının istatistiği." },
    { title: "PubMed: Saitou ve Nei 1987, The neighbor-joining method", url: "https://pubmed.ncbi.nlm.nih.gov/3447015/", note: "Mol Biol Evol, Temmuz 1987: komşu birleştirme ve UPGMA dahil beş yöntemle benzetim karşılaştırması." },
  ],
  revision: "Kasım 2026",
};
