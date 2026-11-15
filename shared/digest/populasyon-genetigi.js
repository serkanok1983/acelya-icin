window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["populasyon-genetigi"] = {
  slug: "populasyon-genetigi",
  title: "Popülasyon Genetiği: Gen Havuzunun Matematiği",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 50,
  tagline:
    "Gerçek bir güve sayımını Hardy–Weinberg'e karşı sına, rastlantının bir aleli nasıl sabitlediğini yüzlerce popülasyonda ölç, seçilimin ve göçün hızını kuramla karşılaştır.",
  hook: "İngiltere'de bir kaplan güvesi kolonisinde 1612 güve sayılmış: 1469 beyaz benekli, 138 ara desenli ve yalnızca 5 az benekli. Az benekli desen yok olmaya mı gidiyor, yoksa bu sayılar tam da olması gerekenler mi? Cevap için tek bir aileye değil, bütün gen havuzuna bakmak gerekir.",
  bigIdea:
    "Alel sıklıkları kendiliğinden değişmez; onları yalnızca dört kuvvet oynatır (rastlantısal sürüklenme, seçilim, göç ve mutasyon) ve her birinin ne kadar hızlı işlediği basit, ölçülebilir formüllerle söylenebilir.",
  story: [
    "1902'de istatistikçi Udny Yule, Mendel'ciliğe bir itiraz yöneltti: baskın aleller öyleyse zamanla popülasyonu kaplamalıydı. Genetikçi Reginald Punnett buna cevap bulamayınca sorunu kriket arkadaşı, matematikçi G. H. Hardy'ye götürdü. Hardy 1908'de <em>Science</em> dergisine kısa bir mektup yazdı; biyologların bu “çok basit” noktayı zaten bilmesini beklediğini söyleyerek, seçilim yokken genotip oranlarının kuşaktan kuşağa sabit kaldığını gösterdi. Aynı yıl Alman hekim Wilhelm Weinberg aynı sonuca bağımsız olarak ulaştı. İngilizce konuşulan dünyada kural 1943'e dek “Hardy yasası” diye anıldı; o yıl Curt Stern, Weinberg'in aynı yılki çalışmasına dikkat çekti ve iki ad yan yana yazılmaya başlandı.",
    "Sonraki çeyrek yüzyılda üç kişi Mendel'in kurallarını Darwin'in seçilimiyle nicel olarak birleştirdi. R. A. Fisher 1918'deki bir makalesinde sürekli değişen özelliklerin çok sayıda ayrık lokustan doğabileceğini gösterdi ve 1930'da <em>The Genetical Theory of Natural Selection</em> kitabını yayımladı. J. B. S. Haldane 1920'lerdeki makale dizisinde tek bir lokusta seçilimin hızını hesapladı ve bunu biberli güvenin endüstriyel melanizmi gibi gerçek örneklere uyguladı. Sewall Wright 1932'de uyum manzarası fikrini ortaya attı; küçük popülasyonlarda sürüklenmenin ve popülasyon yapısının önemini vurguladı. Julian Huxley 1942'deki kitabında bu birleşmeye “modern sentez” adını verdi.",
    "1968'de Motoo Kimura <em>Nature</em>'da yayımlanan bir makalede, moleküler düzeydeki değişimlerin çoğunun seçilimce nötr mutantların rastlantısal sürüklenmesinden geldiğini öne sürdü; Jack King ve Thomas Jukes 1969'da aynı fikre bağımsız olarak vardı. Nötr kuram uyumu seçilimin yaptığını inkâr etmez; yalnızca DNA'daki farkların çoğu için rastlantının yeterli olduğunu söyler. 1972'de Richard Lewontin 17 belirteçle insan çeşitliliğini bölüştürdü: %85,4 popülasyonların içinde, %8,3 aynı büyük grubun popülasyonları arasında, %6,3 büyük gruplar arasındaydı. A. W. F. Edwards 2003'te çok sayıda lokus birlikte kullanılınca bireylerin gruplara atanabildiğini savundu; Witherspoon ve arkadaşları 2007'de iki gözlemin birbiriyle uyumlu olduğunu gösterdi (<a href=\"https://en.wikipedia.org/wiki/Human_Genetic_Diversity:_Lewontin%27s_Fallacy\">tartışmanın özeti</a>).",
    "Heterozigot üstünlüğünün en çok çalışılmış insan örneği orak hücre alelidir. Anthony Allison 1949'da Kenya'da bir dağ seferinde, orak hücre özelliğinin bazı topluluklarda alışılmadık sıklıkta olduğunu fark etti ve tek kopya taşımanın sıtmaya karşı bir yarar sağlayabileceğini düşündü. 1954'te yayımladığı, Doğu Afrika'da yaklaşık 5000 kişiyi kapsayan sonuçlar, orak hücre özelliğinin sıtmaya karşı direnç kazandırdığını gösterdi. İki kopya taşıyan kişilerde ağır bir hastalığa yol açan bir alelin, sıtmanın yaygın olduğu bölgelerde yüksek sıklıkta kalması böylece açıklanır: seçilim alellere değil genotiplere etki eder.",
  ],
  core: [
    {
      heading: "Gen havuzu ve Hardy–Weinberg",
      body: "Bir lokusun iki aleli A ve a olsun. Popülasyondaki bütün kopyalar içinde A'nın payı <strong>alel sıklığı</strong> p'dir, a'nınki q = 1 − p. Genotip sıklıkları P (AA), H (Aa), Q (aa) ise gametlerdeki A payı p = P + H/2 olur. Rastgele çiftleşme, gametlerin rastgele birleşmesi demektir: bir yavrunun iki gameti bağımsız çekilir, bu yüzden AA olasılığı p·p, Aa olasılığı 2pq, aa olasılığı q². Yeni kuşağın A payı p² + pq = p'dir, yani alel sıklığı değişmez ve genotipler tek bir kuşakta bu oranlara oturur. Varsayımlar: sonsuz büyük popülasyon, seçilim, mutasyon ve göç yok, rastgele çiftleşme. <strong>Hardy–Weinberg dengesi</strong> bir sıfır modelidir: sapmalar hangi varsayımın bozulduğunu gösterir.",
      formula: "AA : Aa : aa = p² : 2pq : q²",
      formulaNote: "Veriyle sınarken p sayımdan tahmin edildiği için χ² testinde serbestlik derecesi 3 − 1 − 1 = 1'dir; %5 sınırı 3,84.",
    },
    {
      heading: "Sürüklenme: sonlu havuzdan kopya çekmek",
      body: "Wright–Fisher modelinde her kuşağın 2N gen kopyası öncekinin havuzundan iadeli çekilir; A'nın yeni kopya sayısı Binom(2N, p) dağılır. Ortalama p değişmez, ama her popülasyonda p rastgele yürür ve sonunda 0'a ya da 1'e yapışır. Rastgele seçilen iki kopyanın aynı ebeveyn kopyasından gelme olasılığı 1/(2N) olduğundan beklenen heterozigotluk her kuşak aynı oranda küçülür. Ortalama p sabit kaldığı için bir alelin <strong>sabitlenme</strong> olasılığı başlangıç sıklığı p₀'a eşittir; tek bir yeni nötr mutasyon için 1/(2N). N kuşaktan kuşağa değişirse kayıplar çarpılır ve <strong>etkin büyüklük</strong> Nₑ harmonik ortalamaya yaklaşır; tek bir darboğaz kuşağı onu aşağı çeker.",
      formula: "H<sub>t</sub> = H₀ (1 − 1/(2N))<sup>t</sup> ≈ H₀ e<sup>−t/(2N)</sup>",
      formulaNote: "2N kuşakta heterozigotluk başlangıcın yaklaşık e⁻¹ ≈ 0,368 katına iner. Bu, beklenen değer için bir eşitliktir; tek tek popülasyonlar dalgalanır.",
    },
    {
      heading: "Seçilim: uyumdan Δp'ye",
      body: "Genotiplerin göreli uyumları w₁₁, w₁₂, w₂₂ ise seçilimden sonra A₁ payı p′ = (p²w₁₁ + pq w₁₂) / <span class=ov>w</span> olur; <span class=ov>w</span> ortalama uyumdur. Değişimin hızı p'ye bağlıdır: çekinik yararlı bir alel nadirken neredeyse hep heterozigotta saklanır ve seçilim onu görmez; baskın yararlı alel çabuk yayılır ama son adımı yavaştır. Heterozigot en uyumluysa (w₁₂ > w₁₁, w₂₂) iki alel de kararlı bir iç dengede korunur. Sonlu popülasyonda yararlı bir mutasyon da tek kopyayla başlar ve kolayca kaybolabilir: Kimura'nın difüzyon sonucuna göre büyük Ns'de sabitlenme olasılığı yalnızca yaklaşık s'dir (burada s homozigotun, s/2 heterozigotun yararıdır; heterozigot yararı s alınırsa sonuç yaklaşık 2s olur).",
      formula: "Δp = pq [p(w₁₁ − w₁₂) + q(w₁₂ − w₂₂)] / <span class=ov>w</span> ;  p* = (w₁₂ − w₂₂) / (2w₁₂ − w₁₁ − w₂₂)",
      formulaNote: "Δp = 0 olan yerler dengedir. Dengenin solunda Δp > 0, sağında Δp < 0 ise denge kararlıdır.",
    },
    {
      heading: "Göç, yapı ve akrabalı yetişme",
      body: "Bir tür çoğunlukla gevşekçe bağlı alt popülasyonlardan (deme) oluşur. Sürüklenme demeleri birbirinden uzaklaştırır, göç yakınlaştırır. Ayrışmanın ölçüsü <strong>F<sub>ST</sub></strong>: demeler arasındaki alel sıklığı varyansının, olabilecek en büyük varyansa, <span class=ov>p</span>(1 − <span class=ov>p</span>)'ye oranı. Wright'ın ada modelinde dengede belirleyici olan, göç oranı m değil kuşak başına göçmen sayısı Nm'dir. Akrabalı yetişme ise alel sıklığını değiştirmeden genotipleri yeniden dağıtır: heterozigotlar (1 − F) oranında azalır, homozigotlar Fpq kadar artar. Nadir çekinik bir durumun sıklığı bu yüzden belirgin biçimde yükselir.",
      formula: "F<sub>ST</sub> ≈ 1 / (1 + 4Nm) ;  aa sıklığı = q² + Fpq",
      formulaNote: "İlki sonsuz ada modelinin yaklaşımıdır; ikincisinde F, ataların akraba olmadığı varsayılan bir başlangıca göre tanımlanır.",
    },
    {
      heading: "İnsan çeşitliliği: içinde mi, arasında mı?",
      body: "İnsan genetik çeşitliliğinin büyük kısmı popülasyonların içindedir; coğrafyada ise çoğunlukla <strong>klin</strong> biçiminde, yani yer değiştirdikçe yavaşça değişen alel sıklıkları olarak dağılır. Gruplar arasında çizilen sınırlar veride hazır değildir; kümelerin sayısı ve yeri örneklenen popülasyonlara bağlıdır. ABD Ulusal Akademileri'nin 2023 raporu ırkı insan genetik farklılıklarının geçersiz bir ölçüsü sayar ve araştırmalarda yerine genetik benzerlik gibi tanımlayıcılar önerir; NHGRI sözlüğü ırkı insanları gruplamak için kullanılan bir toplumsal yapı olarak tanımlar. Tek tek alel sıklığı farkları gerçektir ve bazıları tıpta önemlidir (HbS gibi), ama hiçbiri insan gruplarını sıralamaya dayanak olmaz; karmaşık özellikler çok sayıda genin ve çevrenin etkileşiminden doğar.",
    },
  ],
  lab: {
    intro:
      "Sayfada beş sekme var: <strong>01 · Hardy–Weinberg</strong> (gamet karesi, χ² testi için <em>Kaynak</em> menüsü, X'e bağlı genler, ABO), <strong>02 · Sürüklenme</strong> (Wright–Fisher, darboğaz ve kurucu etkisi), <strong>03 · Seçilim</strong> (uyum kaydırıcıları, HbS düğmesi, tek mutasyonun kaderi, mutasyon–seçilim dengesi), <strong>04 · Göç ve yapı</strong> (ada modeli, akrabalı yetişme) ve <strong>05 · İnsan çeşitliliği</strong> (yapay klin verisi). Simülasyonlar tohumludur: aynı ayarlar aynı sayıları verir. Aşağıdaki sayılar varsayılan tohumlarla alındı; her bölümdeki <kbd>Sekmeyi sıfırla</kbd> ya da <kbd>Bölümü sıfırla</kbd> düğmesi (ya da bir form denetiminde değilken <kbd>R</kbd> tuşu) başlangıca döner.",
    experiments: [
      {
        title: "Ford'un güveleri ve akraba evliliği",
        predict: "1612 güvenin yalnızca 5'i az benekli. Hardy–Weinberg'e göre bu sayı az mı? Akraba evliliğinin yaygın olduğu bir popülasyonda hangi genotip sınıfı beklenenden az çıkar?",
        do: "01 sekmesinde, χ² bölümünde <em>Kaynak</em> menüsünden “Kaplan güvesi, İngiltere (Ford 1971)” kümesini seç. Sonra “Yapay veri: akraba evliliği yaygın (F = 0,1)” kümesine geç. İstersen sayım kutularını kendin değiştir.",
        observe: "Güvelerde p = 0,9541, beklenen 1467,4 / 141,2 / 3,4; χ² = 0,83, P = 0,362. En büyük terim aa sınıfından (0,756) ama beklenen sayı yalnızca 3,4. Yapay akraba kümesinde (92 / 216 / 192) χ² = 5,00, P = 0,025 ve F = 0,100: heterozigotlar beklenenden %10,0 az.",
        explain: "Beş az benekli birey, q = 0,0459 olan bir havuzda tam da beklenen kadardır: nadir genotip q² ile ölçeklenir. Akraba kümesinde alel sıklığı aynı kalır, genotipler homozigotlara kayar. χ² küçük çıksa da “HW kanıtlandı” denmez; yalnızca sapmayı gösterecek kanıt yoktur.",
      },
      {
        title: "Heterozigotluk saati",
        predict: "50 bireylik popülasyonlarda heterozigotluğun başlangıcın yaklaşık %37'sine inmesi kaç kuşak sürer? N = 10'da bu süre kaç kat kısalır?",
        do: "02 sekmesini varsayılan ayarlarla aç (N = 50, p₀ = 0,5, 200 popülasyon, 400 kuşak). Sonra <kbd>Küçük (N = 10)</kbd> ve <kbd>Darboğaz</kbd> düğmelerine bas.",
        observe: "N = 50: H(100)/H₀ ölçülen 0,391, kuram 0,366; yutulanlar içinde sabitlenme payı 0,448 (%95 aralık 0,379 – 0,519), kuram p₀ = 0,500. N = 10: H(20)/H₀ 0,365 / 0,358. Darboğazda (N = 200, 5 kuşak N = 5) H(400)/H₀ 0,209 / 0,220 ve Nₑ 134,5.",
        explain: "Kayıp her kuşak 1/(2N) oranındadır, bu yüzden e⁻¹ eşiğine 2N kuşakta varılır: 100 kuşak yerine 20. Sabitlenme payı p₀'ın aralığında kalır, çünkü ortalama p değişmez. Darboğazdaki beş kuşak heterozigotluğu (0,9)⁵ = 0,590 katına indirir ve popülasyon yeniden büyüse de bu kayıp geri gelmez.",
      },
      {
        title: "Çekinik mi baskın mı, ve orak hücre",
        predict: "w = 1,1 yararı yalnızca homozigotta görünen (çekinik) bir alel mi, heterozigotta da görünen (baskın) bir alel mi 0,05'ten 0,99'a daha çabuk çıkar?",
        do: "03 sekmesinde sırayla <kbd>Eklemeli</kbd>, <kbd>A₁ çekinik</kbd> ve <kbd>A₁ baskın</kbd> düğmelerine bas; durum satırındaki iki süreyi oku. Sonra <kbd>HbS (öğretim değeri)</kbd> düğmesine bas.",
        observe: "Eklemeli: 0,05 → 0,5 için 61, 0,5 → 0,99 için 99 kuşak (toplam 160). Çekinik: 213 + 59. Baskın: 41 + 1125. HbS (uyumlar 0,2 / 1 / 0,9): iç denge p* = 0,111 kararlı; 0,01'den başlayan sıklık 45 kuşakta dengenin 0,01 yakınına varıyor.",
        explain: "Seçilim yalnızca görünen genotipe etki eder. Çekinik alel nadirken heterozigotta saklanır, başlangıç yavaştır; baskın alelde ise sona doğru zararlı alel heterozigotlarda saklanır, son adım yavaştır. HbS'de en uyumlu genotip heterozigottur; p* = 0,1/(0,1 + 0,8) = 0,111. Bu uyumlar ölçülmüş değil, öğretim değeridir.",
      },
      {
        title: "Çizilen sınırlar, değişmeyen kişi",
        predict: "40 köylük yapay bir klinde grup sınırlarını kaydırırsan köylerin içindeki çeşitlilik payı değişir mi? Aynı kişinin “soy yüzdeleri” değişir mi?",
        do: "05 sekmesinde varsayılanı oku (3 grup, kişinin köyü 20). Sonra <em>Sınırları kaydır</em> kaydırıcısını +0,4'e getir; ardından <em>Grup sayısı</em>nı 5 yap.",
        observe: "Varsayılan: köylerin içinde %89,1, aynı grubun köyleri arasında %1,5, gruplar arasında %9,4; kişi için 1. grup %4, 2. grup %85, 3. grup %12. Sınır +0,4: köy içi yine %89,1, gruplar arası %9,0, kişi %30 / %67 / %3. Beş grupta gruplar arası %10,1.",
        explain: "Köyün içindeki pay sınırlardan bağımsızdır; değişen yalnızca bizim çizdiğimiz grupların payı ve kişinin onlara göre “yüzdesi”dir. Soy tahmini bir kimlik değil, seçilen referans panele göre bir benzerliktir. Veri yapaydır, insan verisi değildir.",
      },
    ],
  },
  wow: [
    {
      title: "Bir kriket ortaklığından doğan yasa",
      body: "Hardy–Weinberg ilkesi, Punnett'in kriket arkadaşı Hardy'ye sorduğu bir sorudan doğdu ve Hardy'nin 1908'de <em>Science</em>'a yazdığı kısa mektupla yayımlandı. Weinberg aynı yıl aynı sonucu bağımsız olarak buldu, ama İngilizce yayınlarda adı ancak 1943'te, Curt Stern'in hatırlatmasıyla ilkeye eklendi.",
    },
    {
      title: "Yararlı mutasyonların çoğu kaybolur",
      body: "Tek kopyayla başlayan, %1 yarar sağlayan (s = 0,01) bir mutasyonun sabitlenme olasılığı büyük bir popülasyonda yalnızca yaklaşık %1'dir. Sayfada N = 100 ve 2000 popülasyonla ölçülen oran 25 / 2000 = 0,0125, Kimura'nın formülü 0,0115. Yeni yararlı mutasyonların büyük çoğunluğu, sayıları azken rastlantıyla silinir.",
    },
    {
      title: "Kuşakta bir göçmen yeter",
      body: "Ada modelinde dengedeki ayrışma yaklaşık 1/(1 + 4Nm)'dir: popülasyonun büyüklüğünden çok, kuşak başına gelen göçmen sayısı Nm belirler. Nm = 1 iken F<sub>ST</sub> ≈ 0,2 olur; sayfada N = 50 ve m = 0,02 ile (<kbd>Nm = 1</kbd> düğmesi) tohum 1'de ölçülen 0,188, yinelemenin dengesi 0,203; tek bir koşunun dalgalanması birkaç yüzde kadardır. Göç kesilince F<sub>ST</sub> 1'e yürür.",
    },
  ],
  worked: {
    title: "Darboğazın bedeli",
    prompt: "200 bireylik bir popülasyon 400 kuşak boyunca izleniyor; 100. kuşaktan başlayarak 5 kuşak boyunca yalnızca 5 bireye iniyor, sonra yeniden 200'e çıkıyor. Wright–Fisher modelinde beklenen heterozigotluk 400. kuşakta başlangıcın kaçta kaçıdır? Etkin büyüklük Nₑ nedir? (Sayfada 02 sekmesi, <kbd>Darboğaz</kbd> düğmesi.)",
    steps: [
      "Her kuşak heterozigotluk 1 − 1/(2N) katına iner ve kayıplar çarpılır. 395 kuşak N = 200'dür: (1 − 1/400)<sup>395</sup> = e<sup>395·ln(0,9975)</sup> ≈ 0,372.",
      "5 darboğaz kuşağı N = 5'tir: (1 − 1/10)<sup>5</sup> = 0,9<sup>5</sup> = 0,590. Yalnızca bu 5 kuşak, öbür 395 kuşağın kaybına yakın bir kayıp getirir.",
      "Toplam: H(400)/H₀ = 0,372 × 0,590 ≈ 0,220. Darboğaz olmasaydı (1 − 1/400)<sup>400</sup> ≈ 0,367 olurdu.",
      "Etkin büyüklük harmonik ortalamadır: Nₑ = 400 / (395/200 + 5/5) = 400 / 2,975 ≈ 134,5 birey; sayım ortalaması ise (395·200 + 5·5)/400 ≈ 197,6.",
      "Denetim: sabit Nₑ = 134,5 ile (1 − 1/269)<sup>400</sup> ≈ 0,225 bulunur; 0,220'ye yakındır ama aynı değildir, çünkü harmonik ortalama kaybı birinci mertebede doğru verir. Sayfa tohum 1 ile 0,209 ölçüyor (kuramdan −%5,1).",
    ],
    result: "H(400)/H₀ ≈ 0,220 ve Nₑ ≈ 134,5 birey: beş kötü kuşak, sayım ortalamasının yaklaşık üçte birini etkin büyüklükten siler.",
  },
  misconceptions: [
    {
      myth: "Baskın alel zamanla popülasyonda yaygınlaşır.",
      truth: "Baskınlık, bir alelin heterozigotta nasıl görüneceğini söyler; kaç kopya aktarılacağını değil. Seçilim, göç, mutasyon ve sürüklenme yoksa p = 0,10 kuşaktan kuşağa 0,10 kalır. Hardy'nin 1908 mektubu tam bu itiraza cevaptı.",
    },
    {
      myth: "Genotipler HW oranlarındaysa popülasyon evrimleşmiyordur.",
      truth: "Rastgele çiftleşen her kuşağın zigotları o kuşağın p'sine göre HW oranındadır; p bir kuşakta değişse de yeni zigotlar yine HW'dedir. HW testi genotiplerin alel sıklığına uyup uymadığını sınar, alel sıklığının değişip değişmediğini değil.",
    },
    {
      myth: "Seçilim her zaman en iyi aleli sabitler.",
      truth: "Seçilim genotiplere etki eder. En uyumlu genotip heterozigotsa (orak hücre ve sıtma örneği) iki alel de kararlı bir dengede korunur. Sonlu popülasyonda yararlı bir alel de sürüklenmeyle kaybolabilir.",
    },
    {
      myth: "Bir soy testindeki yüzdeler kişinin biyolojik ırkını ölçer.",
      truth: "Soy tahmini, kişinin genotipini seçilen referans grupların alel sıklıklarıyla karşılaştıran bir benzerlik ölçüsüdür; sayfanın 05 sekmesinde aynı kişinin yüzdeleri yalnızca sınırları kaydırınca %4 / %85 / %12'den %30 / %67 / %3'e değişir. NHGRI ırkı bir toplumsal yapı olarak tanımlar.",
    },
  ],
  glossary: [
    { term: "Alel sıklığı", definition: "Bir lokustaki bütün gen kopyaları içinde belirli bir alelin payı; iki alelde p + q = 1." },
    { term: "Hardy–Weinberg dengesi", definition: "Rastgele çiftleşen, seçilim, göç, mutasyon ve sürüklenme olmayan bir popülasyonda genotiplerin p², 2pq, q² oranında olması." },
    { term: "Genetik sürüklenme", definition: "Sonlu popülasyonda gametlerin rastlantısal örneklenmesiyle alel sıklığının kuşaktan kuşağa yönsüz dalgalanması." },
    { term: "Sabitlenme", definition: "Bir alelin sıklığının 1'e ulaşması; o lokusta artık tek alel kalmıştır ve yalnızca mutasyon ya da göç yeni çeşitlilik getirir." },
    { term: "Etkin popülasyon büyüklüğü (Nₑ)", definition: "Gözlenen sürüklenme hızını veren ideal Wright–Fisher popülasyonunun büyüklüğü; N değişiyorsa yaklaşık harmonik ortalamadır." },
    { term: "Heterozigot üstünlüğü", definition: "Heterozigot genotipin iki homozigottan da uyumlu olması; iki aleli kararlı bir iç dengede korur." },
    { term: "F<sub>ST</sub>", definition: "Alt popülasyonlar arasındaki alel sıklığı varyansının, <span class=ov>p</span>(1 − <span class=ov>p</span>) ile ölçülen en büyük varyansa oranı; 0 tam karışma, 1 tam ayrışmadır." },
    { term: "Klin", definition: "Bir alelin ya da özelliğin sıklığının coğrafi bir hat boyunca kesintisiz, yavaş yavaş değişmesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede Hardy–Weinberg çoğunlukla p² + 2pq + q² = 1 denklemine indirgenir. Üniversitede bu denklem bir sıfır modeli olur: Evrimsel Biyoloji ve Popülasyon Genetiği derslerinde her varsayımı bozup sonucunu hesaplarsın; sürüklenme bir Markov zinciridir, sabitlenme olasılığı bir martingal argümanıyla bulunur, Kimura'nın formülleri ise difüzyon denkleminden gelir. Olasılık ve Stokastik Süreçler dersinde öğrendiğin emici sınırlı rastgele yürüyüş, burada bir alelin kaderidir.",
      "Aynı fikirler başka derslerde yeniden karşına çıkar: Moleküler Evrim'de nötr kuram ve moleküler saat, Koruma Biyolojisi'nde darboğazlar ve etkin büyüklük, Nicel Genetik'te çok lokuslu özellikler, Genetik Epidemiyoloji'de taşıyıcı sıklıkları ve popülasyon yapısının ilişkilendirme çalışmalarını nasıl yanıltabileceği. Birleşme (koalesan) kuramı, bu sayfadaki modelleri zamanda geriye doğru okur.",
    ],
    topics: ["Wright–Fisher ve Moran modelleri", "Difüzyon yaklaşımı ve Kimura formülleri", "Koalesan kuramı", "F istatistikleri ve popülasyon yapısı", "Nötr kuram ve moleküler saat", "Mutasyon–seçilim dengesi ve genetik yük"],
  },
  quiz: [
    {
      question: "N = 50 bireylik popülasyonlarda beklenen heterozigotluk yaklaşık 100 kuşakta başlangıcın %37'sine iniyor. N = 500 olsaydı aynı düşüş yaklaşık kaç kuşak sürerdi?",
      options: ["100 kuşak", "Yaklaşık 316 kuşak", "1000 kuşak", "10 000 kuşak"],
      answer: 2,
      explanation: "Heterozigotluk her kuşak 1/(2N) oranında azalır; H ≈ H₀e<sup>−t/(2N)</sup> olduğundan e⁻¹ eşiğine t = 2N kuşakta varılır. N on katına çıkınca süre de on katına çıkar: 1000 kuşak. Sayfanın <kbd>Büyük (N = 500)</kbd> düğmesi H(1000)/H₀ için 0,373 ölçer, kuram 0,368.",
    },
    {
      question: "X'e bağlı çekinik bir özelliğin alel sıklığı q = 0,08 iken erkeklerde görülme sıklığı kadınlardakinin 12,5 katı. q = 0,04 olsaydı bu oran ne olurdu?",
      options: ["6,25 kat", "12,5 kat", "25 kat", "50 kat"],
      answer: 2,
      explanation: "Erkeklerde tek X olduğu için sıklık q, kadınlarda iki kopya gerektiği için q²'dir; oran q/q² = 1/q. q yarıya inince oran iki katına çıkar: 1/0,04 = 25. Nadir X'e bağlı çekinik özelliklerin erkeklerde çok daha sık görülmesinin nedeni budur.",
    },
    {
      question: "Ada modelinde N = 50 ve m = 0,01 iken dengedeki F<sub>ST</sub> yaklaşık 0,33. Her demeyi N = 500'e büyütüp göç oranını m = 0,001'e indirirsen F<sub>ST</sub> yaklaşık ne olur?",
      options: ["Yaklaşık 0,033", "Yaklaşık 0,33", "Yaklaşık 0,83", "Göç çok azaldığı için 1'e gider"],
      answer: 1,
      explanation: "Dengede F<sub>ST</sub> ≈ 1/(1 + 4Nm) ve Nm iki durumda da 0,5'tir: 1/(1 + 2) ≈ 0,33. Büyük demede sürüklenme zayıflar, göç oranı da aynı oranda düşer; belirleyici olan kuşak başına göçmen sayısıdır.",
    },
  ],
  next: [
    { href: "genetik-caprazlama.html", title: "Genetik Çaprazlama: Mendel Oranları, Ki-Kare ve Bağlı Genler", why: "Popülasyon genetiğinin üstüne kurulduğu Mendel kuralları: tek bir ailenin oranları, ki-kare testi, X'e bağlı genler ve bağlı genlerden harita." },
    { href: "dogal-secilim.html", title: "Doğal Seçilim: Popülasyon Genetiği Laboratuvarı", why: "Seçilimi niteliksel olarak işler ve tek lokuslu modelin eğrilerini biberli güvenin 2001–2007 gerçek verisiyle karşılaştırır." },
    { href: "rastgele-yuruyus.html", title: "Rastgele Yürüyüş: √N Yasası, Difüzyon ve Geri Dönüş", why: "Sürüklenmenin matematiği: emici sınırlar ve kumarbazın iflası, yani bir alelin kaybolma ya da sabitlenme olasılığının aynı hesabı." },
    { href: "hipotez-testi-ve-guven-araligi.html", title: "Hipotez Testi ve Güven Aralığı: Örnekleme, p-Değeri, Hata Türleri ve Güç", why: "HW uygunluk testinin istatistiksel temeli: p-değeri, I. tür hata ve güven aralıkları." },
  ],
  sources: [
    { title: "Wikipedia: Hardy–Weinberg principle", url: "https://en.wikipedia.org/wiki/Hardy%E2%80%93Weinberg_principle", note: "Yule, Punnett ve Hardy, Weinberg 1908, 1943'te Stern; Ford 1971 kaplan güvesi sayımı ve χ² = 0,83." },
    { title: "Wikipedia: Modern synthesis (20th century)", url: "https://en.wikipedia.org/wiki/Modern_synthesis_(20th_century)", note: "Fisher 1918 ve 1930, Haldane'nin 1920'lerdeki makaleleri, Wright 1932, Huxley 1942." },
    { title: "Wikipedia: Neutral theory of molecular evolution", url: "https://en.wikipedia.org/wiki/Neutral_theory_of_molecular_evolution", note: "Kimura 1968, King ve Jukes 1969; kuramın seçilimle ilişkisi." },
    { title: "Wikipedia: Anthony C. Allison", url: "https://en.wikipedia.org/wiki/Anthony_C._Allison", note: "Kenya 1949 gözlemi ve 1954 yayınları: orak hücre özelliği ve sıtmaya karşı direnç." },
    { title: "NHGRI Talking Glossary: Race", url: "https://www.genome.gov/genetics-glossary/Race", note: "Irk bir toplumsal yapı olarak; kendi beyanına dayalı gruplar içindeki çeşitlilik gruplar arasındakinden fazla." },
  ],
  revision: "Kasım 2026",
};
