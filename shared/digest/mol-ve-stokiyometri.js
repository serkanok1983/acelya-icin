window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mol-ve-stokiyometri"] = {
  slug: "mol-ve-stokiyometri",
  title: "Mol ve Stokiyometri: Atomları Tartarak Saymak",
  field: "Kimya",
  level: "Lise",
  minutes: 40,
  tagline: "Bir kavanoz vidayı saymadan saymaktan Avogadro sabitine, formülden molar kütleye, yakma analizinden formüle, sınırlayıcı bileşenden çözelti ve gaz hacmine: kimyanın sayma birimini adım adım kurun.",
  hook: "Bir bardak suda, 250 gramda, kaç molekül vardır? Saymaya kalkarsanız saniyede bir tane bile olsa evrenin yaşı yetmez. Oysa cevap bir terazi ve bir bölmeyle bulunur: yaklaşık 8,357 × 10²⁴ molekül. Hırdavatçının bin vidayı tartarak saydığı yöntemle aynıdır bu.",
  bigIdea: "Atomlar tek tek sayılamayacak kadar küçüktür ama tartılabilir; mol, kütleyi tanecik sayısına çeviren köprüdür ve denklemin katsayıları gramları değil bu tanecikleri, yani molleri oranlar.",
  story: [
    "Kimyacılar atomları görmeden çok önce onları tartmaya başladı. Alman kimyacı Jeremias Benjamin Richter 1792'de yayımlanan bir kitabında <strong>stokiyometri</strong> sözcüğünü kullandı: Yunanca <em>stoikheion</em> (öğe, element) ile <em>metron</em> (ölçü) birleşimi, yani \"elementlerin ölçü sanatı\". Bu ölçünün dayanağı kütlenin korunmasıydı; Antoine Lavoisier vardığı sonucu 1773'te dile getirmiş ve ilkeyi yaygınlaştırmıştı (Rus bilgin Mihail Lomonosov'un 1756'da benzer bir ilke ortaya koyduğu da kaydedilir). John Dalton laboratuvar defterlerine göre atom kuramını 1803'te geliştirdi ve 1808'de yayımlamaya başladığı <em>A New System of Chemical Philosophy</em> ile elementlerin belirli kütle oranlarında birleşmesini, her elementin kendine özgü ağırlıkta atomlardan oluşmasıyla açıkladı.",
    "Sorun şuydu: yalnız kütle oranlarına bakarak bir atomun ötekinden kaç kat ağır olduğu bulunamaz; bunun için formülü, yani kaç atomun birleştiğini bilmek gerekir. Amedeo Avogadro 1811'de cesur bir öneri yaptı: aynı sıcaklık ve basınçta bir gazın hacmi, gazın türünden bağımsız olarak içindeki tanecik sayısıyla orantılıdır. Öneri yarım yüzyıl kenarda kaldı. 1858'de Stanislao Cannizzaro yayımladığı ders özetinde atom ağırlığı ile molekül ağırlığını kesin çizgilerle ayırdı ve gaz hacimlerinden atom ağırlıklarının nasıl hesaplanacağını gösterdi; 1860'taki Karlsruhe Kongresi'nde, Avogadro'nun ölümünden dört yıl sonra, bu görüşü savundu ve atom ağırlıkları üzerine tartışmalarda etkili bir rol oynadı.",
    "Tanecik sayısının kendisi ise çok daha zor bir soruydu. Josef Loschmidt 1865'te bir gaz hacmindeki tanecik sayısını dolaylı yoldan kestiren ilk kişi oldu. Jean Perrin 1909'da bu sayıya \"Avogadro sayısı\" adını verdi ve onu tam 32 gram oksijen gazındaki molekül sayısı olarak tanımladı; sayıyı birbirinden bağımsız birkaç yöntemle ölçen Perrin, maddenin kesikli yapısı üzerine çalışmalarıyla 1926 Nobel Fizik Ödülü'nü aldı. \"Mol\" sözcüğü ise biraz daha eskidir: Wilhelm Ostwald 1890'ların başında, kaynakların çoğuna göre 1894'te, Almanca <em>Molekül</em>'den <em>Mol</em>'ü türetti.",
    "Mol 1971'de, 14. Genel Ağırlıklar ve Ölçüler Konferansı'nda (CGPM) SI'ın yedinci temel birimi oldu ve 0,012 kg karbon-12'deki atom sayısıyla tanımlandı. Bu tanımda Avogadro sabiti ölçülen bir sayıydı. CGPM 16 Kasım 2018'de sırayı tersine çevirdi: 20 Mayıs 2019'dan beri bir mol tam olarak 6,022 140 76 × 10²³ tanecik içerir ve tanım artık kilograma bağlı değildir. Bedeli küçüktür: 12 g karbon-12 artık tanım gereği değil, yalnız milyarda bir düzeyinde 1 mol eder.",
  ],
  core: [
    {
      heading: "Tartarak saymak: mol bir sayma birimidir",
      body: "Bir vidanın ortalama kütlesini bilen, bütün yığını tartıp bölerek kaç vida olduğunu bulur: adet = toplam kütle ÷ bir tanenin ortalama kütlesi. Kimya aynı fikri atomlara uygular. Bir karbon-12 atomunun kütlesinin on ikide biri <strong>atomik kütle birimidir</strong> (u, dalton); bir elementin <strong>bağıl atom kütlesi</strong> A<sub>r</sub>, atomlarının ortalama kütlesinin bu birime oranıdır. <strong>Mol</strong> ise tam olarak 6,022 140 76 × 10²³ tanecik demektir, tıpkı düzinenin 12 demesi gibi. Sayı öyle seçilmiştir ki A<sub>r</sub> kadar gram madde, çok iyi bir yaklaşıkla 1 mol atom içerir: bir karbon atomu 1,994 × 10⁻²⁶ kg'dır, 12,011 g karbonda 1 mol atom vardır. Sayfaya göre 1 mol vida yaklaşık 1,4 × 10¹⁸ ton çekerdi; atomların gram ölçeğinde mol olarak sayılabilmesinin nedeni tek tek ne kadar hafif olduklarıdır.",
      formula: "N<sub>A</sub> = 6,022 140 76 × 10²³ mol⁻¹ (tam)  ·  M = A<sub>r</sub> × M<sub>u</sub>",
      formulaNote: "M<sub>u</sub> = N<sub>A</sub>·u = 1,000 000 001 05 g/mol (CODATA 2022): 2019'dan beri tam 1 g/mol değildir, ama fark milyarda birdir; okul ve laboratuvar hesaplarında M = A<sub>r</sub> g/mol yazmak yeterlidir.",
    },
    {
      heading: "Molar kütle ve birim analizi zinciri",
      body: "Bir formül, bir molekülün ya da iyonik bileşikte bir <strong>formül biriminin</strong> içindeki atomları sayar. <strong>Molar kütle</strong> M, her elementin atom ağırlığının formüldeki sayısıyla çarpılıp toplanmasıyla bulunur: M(H₂O) = 2 × 1,0080 + 15,999 = 18,015 g/mol. Parantezin dışındaki sayı içerideki her şeyi çarpar; CuSO₄·5H₂O gibi bir hidratta kristal suyu da molar kütleye girer (249,677 g/mol, CuSO₄ yalnız 159,602 g/mol). Kütle, madde miktarı ve tanecik sayısı iki köprüyle bağlıdır. Her köprü, değeri 1 olan bir kesirle çarpmaktır: 1 mol / 18,015 g. Pay ile payda aynı miktarı anlatır, birimler sadeleşir. Hangi yöne çarpıp böleceğinizi ezberlemek yerine birimlere bakarak bulursunuz.",
      formula: "n = m ÷ M  ·  N = n × N<sub>A</sub>",
      formulaNote: "36 g su: 36 g × (1 mol / 18,015 g) = 1,998 mol → × 6,022 × 10²³ = 1,203 × 10²⁴ molekül → her molekülde 3 atom, 3,610 × 10²⁴ atom. Sonuç 1'den küçük bir \"molekül sayısı\" çıkarsa N<sub>A</sub> ile çarpmak yerine bölmüşsünüzdür.",
    },
    {
      heading: "Analizden formüle: mol oranı = atom oranı",
      body: "Yeni bir bileşiğin formülü klasik olarak <strong>yakma analiziyle</strong> bulunur: tartılmış örnek oksijende yakılır, bütün C CO₂'ye, bütün H H₂O'ya döner ve bu ürünler ayrı ayrı tartılır; oksijen farktan bulunur. Kütleler oranı doğrudan vermez, çünkü atomların kütleleri farklıdır; ama her mol sayısı N<sub>A</sub> ile çarpılınca atom sayısı olduğundan mol oranı atom oranına eşittir. Mol sayıları en küçüğüne bölünür ve tam sayıya yaklaşana kadar küçük bir k ile çarpılır: <strong>basit (ampirik) formül</strong>. 1,333 görmek ölçüm hatası değil 4/3'tür; yuvarlamak yanlış formül üretir. Basit formül molekülün büyüklüğünü söylemez: glukoz, asetik asit ve formaldehit aynı CH₂O oranını taşır; aralarını ancak ölçülen molar kütle ayırır.",
      formula: "k = M<sub>ölçülen</sub> ÷ M<sub>basit</sub>  ⇒  molekül formülü = (basit formül)<sub>k</sub>",
      formulaNote: "Sayfanın kabul ölçütü: her oran, k ≤ 10 olan bir çarpanla en yakın tam sayıya 0,1'den yakın olmalı. Tartım hatası büyüdükçe bu ölçüt ya hiç sağlanmaz ya da yanlış bir k ile sağlanabilir.",
    },
    {
      heading: "Tepkime hesabı: n/ν, sınırlayıcı bileşen ve verim",
      body: "Denkleştirilmiş bir denklemin katsayıları ν tanecik ve mol oranıdır, kütle oranı değildir: 2H₂ + O₂ → 2H₂O, \"2 mol H₂ 1 mol O₂ ile\" demektir. Her girenin mol sayısı katsayısına bölünürse o girenin kaç \"tepkime olayına\" yettiği bulunur; en küçük n/ν'yi veren giren önce biter ve tepkimeyi durdurur: <strong>sınırlayıcı bileşen</strong>. Ürünlerin miktarı bu en küçük değerin katsayılarla çarpımıdır. Tartılan ürün (<strong>gerçek verim</strong>) kuramsal verimden genellikle azdır; oranları <strong>yüzde verimdir</strong> ve %100'ü aşamaz. Lisans dilinde en küçük n/ν'nin adı <strong>tepkime ilerleme derecesidir</strong>, ξ: her türün mol sayısı n<sub>i</sub> = n<sub>i,0</sub> + ν<sub>i</sub>ξ biçiminde yazılır (girenler için ν negatif alınır). Fizikokimyada denge, tepkimenin ξ'nin bu uç değerine varmadan durduğu yerdir.",
      formula: "ξ = min(n<sub>i</sub> ÷ ν<sub>i</sub>)  ·  n<sub>ürün</sub> = ν<sub>ürün</sub> × ξ  ·  % verim = gerçek ÷ kuramsal × 100",
      formulaNote: "Sayfa her hesabın sonunda kütle korunumunu da sınar: girenlerin toplam kütlesi, ürünlerle artan girenin toplamına eşittir.",
    },
    {
      heading: "Çözeltide ve gazda mol: c = n/V, c₁V₁ = c₂V₂, V<sub>m</sub> = RT/p",
      body: "Çözeltide tartmak yerine hacim ölçülür. <strong>Molarite</strong> c = n ÷ V, birimi mol/L (M); V çözeltinin son hacmidir, eklenen suyun hacmi değil: 5,8 g NaCl 250 mL'ye tamamlanınca 0,09925 mol ve 0,3970 mol/L olur. Seyreltmede çözünenin mol sayısı değişmez, yalnız daha büyük bir hacme dağılır; c₁V₁ = c₂V₂ bu korunumun ifadesidir. Gazda ideal bir gazın 1 molü, kimliğinden bağımsız olarak V<sub>m</sub> = RT/p hacmini kaplar. Bu hacim koşula bağlıdır: IUPAC'ın 1982'den beri kullandığı STP (0 °C, 100 kPa) için 22,711 L/mol, eski kitaplardaki 0 °C ve 1 atm için 22,414 L/mol. Gerçek gazlar bu koşullarda idealden biraz sapar; kolay sıvılaşan NH₃ ve CO₂ daha çok.",
      formula: "c₁V₁ = c₂V₂  ·  V<sub>m</sub> = RT ÷ p,  R = N<sub>A</sub>·k = 8,314 462 618… J/(mol·K)",
      formulaNote: "J/mol ÷ kPa = L/mol: R·T/p'de basınç kPa cinsinden yazılırsa sonuç doğrudan litre çıkar. 2 M stoktan 500 mL 0,10 M için V₁ = 0,10 × 500 ÷ 2 = 25,00 mL alınır ve balon çizgiye tamamlanır.",
    },
  ],
  lab: {
    intro: "Sayfa beş sekmeden oluşur: <strong>01 · Tartarak saymak</strong> (vida, pul ve pirinç kavanozu; element seçerek atom ve mol kütlesi; klor izotoplarından ortalama atom kütlesi), <strong>02 · Molar kütle</strong> (formül yazma kutusu, altı hazır formül ve kütle–mol–tanecik dönüştürücüsü), <strong>03 · Analizden formül</strong> (yapay yakma analizi verisinden basit ve molekül formülü), <strong>04 · Tepkime hesabı</strong> (altı denk tepkime; önce molekül düzeyinde eşleştirme, sonra gram ölçeğinde sınırlayıcı bileşen ve verim) ve <strong>05 · Çözelti ve gaz</strong> (molarite, seyreltme, dört koşulda gaz hacmi). Altta üç seviyeli tohumlu alıştırmalar, ipucu ve adım adım çözüm ile sık yapılan sekiz hata kartı var. Her sekmede \"Sekmeyi sıfırla\" düğmesi bulunur; R tuşu etkin sekmeyi sıfırlar. Kavanoz ve analiz verileri öğretim amaçlı yapay verilerdir; sayfa hiçbir şey kaydetmez.",
    experiments: [
      {
        title: "Pirinç tanesi ve 0,01 g'lık terazi",
        predict: "Kavanozda 500 pirinç tanesi var. Tek bir taneyi tartıp yığının kütlesini ona bölerseniz tahmin ne kadar tutar? Elli tane tartarsanız?",
        do: "01 sekmesinde Nesne menüsünden \"Pirinç tanesi\"ni seçin, \"Örnek: tek tek tartılan adet\" kaydırıcısını 1'e çekin. Sonra \"Yeni kavanoz\" düğmesine üç kez basın, ardından bir kez daha. En sonda örnek kaydırıcısını 50'ye getirin.",
        observe: "İlk kavanozda yığın 9,96 g, tek tane 0,02 g: tahmin ≈ 498 tane, %0,4 eksik; ama durum satırı kırmızıya döner, ±%25'lik yuvarlama belirsizliğini ve bu iyi sonucun şans olduğunu söyler. Dördüncü kavanozda tane 0,01 g görünür ve tahmin 988'e çıkar; beşincide 0,03 g görünür, tahmin 334'e iner. Aynı kavanozda 50 tane tartılınca (0,96 g) tahmin 522 tane, %4,4 fazla.",
        explain: "Bir pirinç tanesi (ortalama 0,020 g) terazinin 0,01 g'lık adımının yalnız iki katıdır: tek tanede yuvarlama ±0,005 g, yani tanenin dörtte biri kadar hata getirebilir. İlk kavanozdaki iyi sonuç şanstır: tartılan tane yaklaşık 0,0215 g'dı ve yuvarlanınca tesadüfen ortalamaya eşit 0,02 g göründü. Dördüncü kavanozda aynı yuvarlama tahmini neredeyse ikiye katladı. Büyük örnekte hem yuvarlama hem tanelerin kendi farkları ortalamada küçülür. Kimya da atomları tek tek değil, 10²³'lük yığınlar hâlinde tartar.",
      },
      {
        title: "C vitamininin dörtte üçü",
        predict: "Askorbik asidin yakma analizinde mol oranları en küçüğe bölününce H için 1,337 çıkarsa bunu 1'e mi yuvarlarsınız? Tartım hatası %3 olursa yöntem yine çalışır mı?",
        do: "03 · Analizden formül sekmesinde Bileşik menüsünden \"Askorbik asit (C vitamini)\"ni seçin; örnek kütlesi 0,250 g, tartım hatası %0,2, Ölçüm no 1 kalsın. Tabloyu ve oran cetvelini okuyun. Sonra tartım hatasını %3'e çıkarın ve Ölçüm no'yu 1'den 5'e kadar sürün.",
        observe: "Tutulan CO₂ 0,3754 g, H₂O 0,1024 g; \"÷ en küçük\" sütunu C 1,003, H 1,337, O 1,000. Sayfa ×3 ile C₃H₄O₃'ü bulur; ölçülen M = 175,9 g/mol, 175,9 ÷ 88,06 ≈ 2 ve molekül formülü C₆H₈O₆. %3 hatada Ölçüm no 1–4 için basit formül \"bulunamadı\"; 5'te yine C₃H₄O₃ ve C₆H₈O₆ çıkar.",
        explain: "1,337 ölçüm gürültüsü değil, 4/3'tür; 1'e yuvarlamak C, H ve O'yu eşit sayar ve yanlış formül verir. Mol oranı atom oranıdır, kesirli bir oran küçük bir tam sayıyla çarpılıp düzeltilir. Hata %3'e çıkınca H oranı 1,35–1,39 arasında dolaşır; ×3 ile tam sayıdan 0,1'den fazla uzaklaşabilir ve ölçüt sağlanmaz. Gerçek laboratuvarda ölçüm bu yüzden tekrarlanır.",
      },
      {
        title: "Az olan mı biter?",
        predict: "4,0 g H₂ ile 16,0 g O₂ yakılıyor: kütlesi küçük olan H₂ mi önce biter? 10,0 g Al ile 21,3 g Cl₂'de hangisi artar?",
        do: "04 · Tepkime hesabı sekmesinde \"Hidrojenin yanması\" seçili. Önce molekül çiziminde 6 H₂ ve 4 O₂'ye bakın, sonra gram tablosunu okuyun ve \"Tartılan ürün\" kutusuna 21 yazın. Ardından Tepkime menüsünden \"Alüminyum ve klor\"u seçin.",
        observe: "Moleküllerde 3 olay, sınırlayıcı H₂, artan 1 O₂. Gramda ise n/ν H₂ için 0,9921, O₂ için 0,5000: O₂ sınırlayıcı, 1,98 g H₂ (0,984 mol) artar, kuramsal verim 18,02 g H₂O. 21 yazınca yüzde verim %116,6 ve \"imkânsız\" uyarısı. Alüminyumda n/ν 0,1853 ile 0,1001: Cl₂ sınırlayıcı, kütlesi küçük Al'den 4,60 g artar, kuramsal 26,70 g AlCl₃.",
        explain: "Sınırlayıcıyı kütle değil, her girenin kaç tepkime olayına yettiği belirler. Bir H₂ molekülü bir O₂'den yaklaşık 16 kat hafiftir; 4 g H₂ yaklaşık 2 mol, 16 g O₂ yalnız 0,5 mol eder. Molekül çiziminde H₂'nin bitmesi de aynı kuralın sonucudur: orada 6 H₂ yalnız 3 olaya yeter. %100'ü aşan verim, ıslak ya da kirli ürünün ya da bir hesap hatasının işaretidir.",
      },
      {
        title: "Hangi STP?",
        predict: "4,4 g CO₂ ile 0,2 g H₂: hangisi daha büyük hacim kaplar? 1 mol gaz için 22,4 L mi yazmalı, 22,7 L mi?",
        do: "05 · Çözelti ve gaz sekmesinin gaz bölümünde varsayılan CO₂, 4,4 g. Koşul menüsünde sırayla \"IUPAC STP\", \"Eski STP\" ve \"SATP\"yi seçin. Sonra Gaz menüsünden H₂'yi seçip kütleyi 0,2 g'a çekin ve koşulu IUPAC STP'ye döndürün.",
        observe: "CO₂ 0,09998 mol; molar hacim 22,711 L/mol iken 2,271 L, eski STP'de 22,414 L/mol ile 2,241 L (%1,32 fark), SATP'de 24,790 L/mol ile 2,478 L. 0,2 g H₂ 0,09921 mol eder ve IUPAC STP'de 2,253 L kaplar: kütlesi 22 kat küçük olduğu hâlde hacmi neredeyse aynı.",
        explain: "İdeal gazda hacim gazın kimliğine değil mol sayısına bağlıdır: V = n·RT/p. İki örnek de yaklaşık 0,1 mol olduğu için hacimleri yakındır. İki STP arasındaki %1,32'lik fark basınç oranından gelir: 101,325 ÷ 100. Hangi koşulu kullandığınızı her zaman yazın; gerçek gazlar bu koşullarda idealden biraz sapar.",
      },
    ],
  },
  wow: [
    {
      title: "Hiçbir klor atomu 35,45 u değildir",
      body: "Doğal klorun yaklaşık dörtte üçü ³⁵Cl (34,968 852 682 u), dörtte biri ³⁷Cl'dir (36,965 902 602 u). Tablodaki değer bolluklarla ağırlıklandırılmış ortalamadır: 01 sekmesindeki klor bölümü %75,76 için 35,4529 u verir. Bolluk doğal örnekten örneğe biraz değiştiği için CIAAW 1961'de 35,453(1) önerdiği klor için 2009'dan beri tek bir sayı değil [35,446; 35,457] aralığı veriyor.",
    },
    {
      title: "Bir bardak suda 10²⁴'ten fazla molekül",
      body: "02 sekmesinde formül H2O iken dönüştürücüye 250 yazın: 250 g su 13,88 mol, yani 8,357 × 10²⁴ molekül ve 2,507 × 10²⁵ atomdur. Saniyede bir molekül sayan biri için evrenin bugünkü yaşı bile bunun milyonda birine yetmezdi. Terazi ve molar kütle aynı sayıyı tek bir bölmeyle verir.",
    },
    {
      title: "12 g karbon-12 artık tam 1 mol değil",
      body: "2019'a kadar mol, 0,012 kg karbon-12'deki atom sayısıyla tanımlanıyordu; 12 g karbon-12 tanım gereği tam 1 mol ederdi. 20 Mayıs 2019'dan beri tam olan Avogadro sabitidir ve molar kütle sabiti ölçülen bir sayıya dönüştü: 1,000 000 001 05 g/mol. Fark milyarda bir düzeyindedir; hiçbir okul hesabını değiştirmez ama tanımın hangi yöne bağlandığını gösterir.",
    },
  ],
  worked: {
    title: "Propanın yanması: sınırlayıcı, ürün, gaz hacmi ve verim",
    prompt: "4,4 g propan (C₃H₈) ile 12,0 g O₂ bir kapta yakılıyor: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. (a) Sınırlayıcı bileşen hangisidir? (b) En çok kaç gram CO₂ ve H₂O oluşur, hangi girenden ne kadar artar? (c) Bu CO₂ IUPAC STP'de (0 °C, 100 kPa) kaç litre kaplar? (d) Tepkimeden sonra 8,42 g CO₂ toplanırsa yüzde verim nedir? Atom ağırlıkları: H 1,0080, C 12,011, O 15,999.",
    steps: [
      "Molar kütleler: M(C₃H₈) = 3 × 12,011 + 8 × 1,0080 = 44,097 g/mol; M(O₂) = 31,998 g/mol. Mol sayıları: n(C₃H₈) = 4,4 g ÷ 44,097 g/mol = 0,09978 mol; n(O₂) = 12,0 g ÷ 31,998 g/mol = 0,3750 mol.",
      "Her girenin kaç tepkime olayına yettiği: C₃H₈ için 0,09978 ÷ 1 = 0,09978; O₂ için 0,3750 ÷ 5 = 0,07500. En küçüğü O₂'nin: O₂ sınırlayıcıdır, ξ = 0,07500 mol. Propanın kütlesi daha küçük olduğu hâlde artan odur.",
      "Ürünler: n(CO₂) = 3 × 0,07500 = 0,2250 mol → 0,2250 mol × 44,009 g/mol = 9,903 g; n(H₂O) = 4 × 0,07500 = 0,3000 mol → × 18,015 g/mol = 5,405 g. Artan propan: 0,09978 − 0,07500 = 0,02478 mol → 1,09 g. Sağlama (kütle korunumu): 4,4 + 12,0 = 16,40 g = 9,90 + 5,40 + 1,09 g.",
      "Gaz hacmi: V = n × V<sub>m</sub> = 0,2250 mol × 22,711 L/mol = 5,110 L. Eski STP'nin 22,414 L/mol'üyle 5,043 L çıkardı: koşulu yazmak bu yüzden önemlidir.",
      "Yüzde verim = gerçek ÷ kuramsal × 100 = 8,42 g ÷ 9,903 g × 100 = %85,0. Kalan CO₂ aktarmada kaybolmuş, ya da yanma eksik kalıp (örneğin CO'ya) yan ürün vermiş olabilir.",
    ],
    result: "(a) O₂; (b) 9,903 g CO₂ ve 5,405 g H₂O, 1,09 g propan artar; (c) 5,110 L; (d) %85,0. Sayfada 04 sekmesinde \"Propanın yanması\"nın varsayılan kütleleri tam bu sorudur: tablo O₂'yi sınırlayıcı, artanı \"1,09 g C₃H₈\", kuramsal verimi 9,903 g gösterir; \"Tartılan ürün\" kutusuna 8,42 yazınca %85,0 okunur. 05 sekmesinde CO₂ için 9,9 g girilince IUPAC STP'de 5,109 L çıkar (kütle 0,1 g'a yuvarlandığı için son basamak farklı).",
  },
  misconceptions: [
    {
      myth: "Kütlesi küçük olan giren önce biter.",
      truth: "Önce biten, mol sayısının katsayısına oranı (n/ν) en küçük olandır. 4,0 g H₂ ve 16,0 g O₂ karışımında kütlesi küçük H₂ yaklaşık 2 mol, O₂ ise 0,5 mol eder; O₂ biter ve 1,98 g H₂ artar. 04 sekmesinin durum satırı bunu her tepkimede açıkça söyler: \"Az olan biter\" mol üzerinden doğrudur, gram üzerinden değil.",
    },
    {
      myth: "Bir mol gaz her zaman 22,4 litredir.",
      truth: "Molar hacim RT/p'dir ve koşula bağlıdır. 22,414 L/mol 0 °C ve 1 atm için, 22,711 L/mol IUPAC'ın bugünkü STP'si (0 °C, 100 kPa) için, 24,790 L/mol 25 °C ve 100 kPa için geçerlidir. Değer yalnız ideal gaz için kimlikten bağımsızdır; gerçek gazlar biraz sapar. Hangi koşulu kullandığınızı her zaman yazın.",
    },
    {
      myth: "Basit formül bulurken 1,33 gibi oranlar 1'e yuvarlanır.",
      truth: "Oranın virgülden sonrası 0,1'den büyükse bu bir ölçüm hatası değil, kesirli bir orandır: 1,333 = 4/3 (×3), 1,5 = 3/2 (×2), 1,25 = 5/4 (×4). C vitamininde 1 : 1,333 : 1 oranı ×3 ile C₃H₄O₃ olur; 1'e yuvarlamak yanlış bir formül üretir.",
    },
    {
      myth: "2H₂ + O₂ → 2H₂O, 2 gram hidrojenin 1 gram oksijenle tepkimeye girdiğini söyler.",
      truth: "Katsayılar tanecik, dolayısıyla mol oranıdır. 10 g O₂ = 0,3125 mol; bunun için 0,6250 mol, yani yalnız 1,26 g H₂ gerekir, 20 g değil. Önce kütleyi mole çevirin, oranı mol üzerinde uygulayın, sonra gerekirse yeniden kütleye dönün.",
    },
  ],
  glossary: [
    { term: "Mol", definition: "Madde miktarının SI birimi; bir mol tam olarak 6,022 140 76 × 10²³ temel tanecik (atom, molekül, iyon, formül birimi) içerir." },
    { term: "Avogadro sabiti", definition: "Bir moldeki tanecik sayısı: N<sub>A</sub> = 6,022 140 76 × 10²³ mol⁻¹; 20 Mayıs 2019'dan beri tanım gereği tamdır." },
    { term: "Bağıl atom kütlesi (A<sub>r</sub>)", definition: "Bir elementin doğal izotop karışımındaki atomlarının ortalama kütlesinin, karbon-12 atomunun kütlesinin on ikide birine oranı; birimsizdir." },
    { term: "Molar kütle", definition: "Bir mol maddenin gram cinsinden kütlesi (g/mol); formüldeki her elementin atom ağırlığı atom sayısıyla çarpılıp toplanarak bulunur." },
    { term: "Basit (ampirik) formül", definition: "Bir bileşikteki atom sayılarının en küçük tam sayılarla yazılmış oranı; molekülün gerçek büyüklüğünü söylemez (glukozun basit formülü CH₂O)." },
    { term: "Sınırlayıcı bileşen", definition: "Mol sayısının katsayısına oranı en küçük olan, bu yüzden tepkimede ilk tükenen ve ürün miktarını belirleyen giren." },
    { term: "Yüzde verim", definition: "Tartılan ürünün (gerçek verim) sınırlayıcı bileşenden hesaplanan kuramsal verime oranının yüzdesi; %100'ü aşamaz." },
    { term: "Molarite", definition: "Bir litre çözeltideki çözünen madde miktarı, c = n ÷ V; birimi mol/L, kısaca M." },
  ],
  bridge: {
    heading: "Bundan sonra ve üniversitede",
    body: [
      "Bu sayfa Öğrenme Yolları'ndaki Temel Kimya önşart dizisinin \"Madde miktarı ve tepkime\" basamağını açar. Buradaki katsayıların nereden geldiğini <a href=\"denklem-denklestirme.html\">Kimyasal Denklem Denkleştirme</a> sayfası atom sayımından lineer cebire kadar gösterir; V<sub>m</sub> = RT/p'nin arkasındaki molekül hareketi ise <a href=\"ideal-gaz.html\">İdeal Gaz</a> sayfasının konusudur. Molarite ve mol oranı, çözeltiler ve titrasyon sayfalarında yeniden karşınıza çıkar.",
      "Üniversitede Genel Kimya I'in ilk haftaları bu sayfanın konusudur ve sonrasında hiç kaybolmaz. Analitik kimyada gravimetri ve titrimetri doğrudan mol hesabıdır; yakma analizi bugün otomatik CHN analizörlerinde yapılır. Fizikokimyada tepkime sonuna kadar gitmez: burada n/ν diye gördüğünüz ilerleme derecesi ξ, dengenin ve termodinamiğin temel değişkeni olur. Kimya mühendisliği kütle denkliklerini ve reaktör verimini aynı yolla kurar; elektrokimyada Faraday yasası elektronları mol olarak sayar.",
    ],
    topics: ["Genel Kimya I: stokiyometri", "Analitik Kimya: gravimetri ve titrimetri", "Fizikokimya: ilerleme derecesi ve denge", "Kimya mühendisliği: kütle denklikleri", "Elektrokimya: Faraday yasası", "Metroloji: SI ve 2019 tanımları"],
  },
  quiz: [
    {
      question: "Bir kapta 1 g H₂, ötekinde 1 g O₂ var. Hangisinde daha çok molekül vardır ve yaklaşık kaç kat?",
      options: ["İkisinde de aynı sayıda molekül vardır", "O₂'de, yaklaşık 16 kat fazla", "H₂'de, yaklaşık 16 kat fazla", "H₂'de, yaklaşık 2 kat fazla"],
      answer: 2,
      explanation: "Aynı kütlede tanecik sayısı molar kütleyle ters orantılıdır: N = (m ÷ M) × N<sub>A</sub>. M(O₂) ÷ M(H₂) = 31,998 ÷ 2,016 ≈ 15,9, öyleyse 1 g H₂ yaklaşık 16 kat fazla molekül içerir. Sınırlayıcı bileşenin \"kütlesi küçük olan\" olmamasının nedeni de budur.",
    },
    {
      question: "Bir hidrokarbonun yakma analizinde mol sayıları en küçüğüne bölününce C 1,00 ve H 2,50 çıkıyor; ölçülen molar kütle 58,0 g/mol. Molekül formülü nedir?",
      options: ["CH₂", "C₂H₅", "C₄H₁₀", "C₅H₁₀"],
      answer: 2,
      explanation: "2,50 bir kesirdir (5/2), yuvarlanmaz: ×2 ile basit formül C₂H₅ olur, M(basit) = 2 × 12,011 + 5 × 1,0080 = 29,06 g/mol. k = 58,0 ÷ 29,06 ≈ 2, molekül formülü C₄H₁₀ (bütan). C₂H₅ yalnız orandır; 03 sekmesinde Bütan seçilince aynı adımlar görünür.",
    },
    {
      question: "2 M stoktan 500 mL 0,10 M çözelti için 25,00 mL stok alınıyor. Hem istenen son hacim iki katına (1000 mL) çıksa hem istenen derişim yarıya (0,05 M) inse stoktan kaç mL alınmalıdır?",
      options: ["12,5 mL", "25,00 mL", "50,0 mL", "100 mL"],
      answer: 1,
      explanation: "Alınan hacim, son çözeltideki mol sayısıyla belirlenir: V₁ = c₂V₂ ÷ c₁. c₂V₂ = 0,05 × 1000 = 0,10 × 500 = 50 mmol değişmediği için V₁ yine 25,00 mL'dir; yalnız balon daha büyük bir hacme tamamlanır. 05 sekmesindeki seyreltme kaydırıcılarıyla deneyebilirsiniz.",
    },
  ],
  next: [
    { href: "denklem-denklestirme.html", title: "Kimyasal Denklem Denkleştirme: Atom Sayımı, Matris Yöntemi ve Stokiyometri", why: "Dizinin sonraki basamağı: bu sayfada hazır verilen katsayıların atom sayımından ve matris yönteminden nasıl bulunduğu, yüklü iyonik denklemler dahil." },
    { href: "ideal-gaz.html", title: "İdeal Gaz: Moleküllerden Basınca (Kinetik Teori)", why: "Molar hacim neden gazın kimliğine bağlı değil? Basıncın duvara çarpan moleküllerden nasıl doğduğunu kinetik kuramla görün." },
    { href: "cozeltiler-ve-koligatif-ozellikler.html", title: "Çözeltiler ve Koligatif Özellikler: Raoult, Donma, Kaynama ve Osmoz", why: "Mol sayısı donma ve kaynama noktasını, buhar basıncını ve osmotik basıncı belirler: molarite hesabının bir sonraki adımı." },
    { href: "asit-baz-titrasyonu.html", title: "Asit-Baz Titrasyonu Laboratuvarı", why: "Molarite ve mol oranı bir bürette buluşur: bilinmeyen bir derişimi eşdeğerlik noktasından ölçmek." },
  ],
  sources: [
    { title: "BIPM · SI base unit: mole (mol)", url: "https://www.bipm.org/en/si-base-units/mole", note: "Molün resmî tanımı: bir mol tam olarak 6,022 140 76 × 10²³ temel tanecik içerir." },
    { title: "Wikipedia · Mole (unit)", url: "https://en.wikipedia.org/wiki/Mole_(unit)", note: "Ostwald'ın \"Mol\"ü (1894), 1971'de SI temel birimi olması, eski karbon-12 tanımı, 16 Kasım 2018 kararı ve 20 Mayıs 2019 yürürlüğü." },
    { title: "Wikipedia · Avogadro constant", url: "https://en.wikipedia.org/wiki/Avogadro_constant", note: "Avogadro'nun 1811 varsayımı, Cannizzaro ve Karlsruhe (1860), Loschmidt (1865), Perrin'in 1909'da verdiği ad ve 2019'daki tam değer." },
    { title: "CIAAW · Atomic weight of chlorine", url: "https://www.ciaaw.org/chlorine.htm", note: "Klorun standart atom ağırlığı aralığı [35,446; 35,457] (2009'dan beri), 1961 değeri ve izotop bollukları." },
  ],
  revision: "Kasım 2026",
};
