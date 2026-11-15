window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["gen-muhendisligi"] = {
  slug: "gen-muhendisligi",
  title: "Gen Mühendisliği: Kes, Çoğalt, Oku, Değiştir",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 50,
  tagline:
    "Gerçek pUC19 plazmitini bilgisayarda kes, PCR'ın eşik döngüsünden başlangıç miktarını geri hesapla, yapay bir kromatogramı oku ve bir dizide Cas9'un kesebileceği yerleri say.",
  hook: "Bin kopyalık bir DNA parçası, verim %90 iken 35 döngüde kâğıt üzerinde 5,71 × 10¹² kopyaya çıkmalı. Sayfadaki tepkime ise 3,16 × 10¹¹'de duruyor, yani kuramın on sekizde birinde. Laboratuvarlar yine de başlangıç miktarını bu eğriden şaşırtıcı bir kesinlikle okuyor. Nasıl?",
  bigIdea:
    "Gen mühendisliğinin araçları tek bir mantığa dayanır: DNA bir harf dizisidir. Bu yüzden bir enzimin nereden keseceği, PCR'ın kaç kopya yapacağı, bir okumanın ne kadar güvenilir olduğu ve bir kılavuzun nereye gideceği deneyden önce hesaplanabilir.",
  story: [
    "1970'te Hamilton Smith, Thomas Kelly ve Kent Wilcox, <em>Haemophilus influenzae</em> bakterisinden ilk II. tip restriksiyon enzimini, HindII'yi ayırıp tanımladı. Bu enzimler DNA'yı rastgele değil, belirli bir harf dizisinden keser. Werner Arber, Daniel Nathans ve Hamilton Smith, restriksiyon enzimlerini bulup moleküler genetiğin sorunlarına uyguladıkları için 1978 Nobel Fizyoloji ya da Tıp Ödülü'nü aldı. Kasım 1973'te Stanley Cohen, Annie Chang, Herbert Boyer ve Robert Helling, <em>PNAS</em>'ta enzimlerle kesilmiş plazmit parçalarını deney tüpünde birleştirdiklerini ve yeni plazmitlerin <em>E. coli</em>'ye aktarılınca iki atanın özelliklerini taşıyarak çoğaldığını bildirdi.",
    "Yöntemin gücü, riskleri üzerine de soru doğurdu. 1974'te bir Ulusal Bilimler Akademisi komitesi, uluslararası bir toplantı yapılana kadar bazı çalışmalara ara verilmesini istedi. Şubat 1975'teki Asilomar Konferansı'nda, Paul Berg ve Maxine Singer'ın da aralarında olduğu yaklaşık 140 kişi gönüllü kurallar benimsedi: riske göre dört kapsama düzeyi ve en tehlikeli sayılan çalışmalara yasak. Birkaç yıl içinde ilk ürün geldi: City of Hope'tan Arthur Riggs ve Keiichi Itakura ile Herbert Boyer'in ekibi insan insülinini sentetik genlerden bakteride ürettirdi (Ocak 1979'da yayımlandı). Ekim 1982'de Humulin, rekombinant DNA ile üretilen ilk protein ilaç olarak onaylandı.",
    "Kesmek yetmez; okumak ve çoğaltmak da gerekir. Frederick Sanger ve arkadaşlarının 1977'de geliştirdiği zincir sonlandırma yöntemi, 1980'lerden 2000'lerin ortasına kadar başat dizileme yöntemi oldu. Kary Mullis 1983'te Cetus şirketinde PCR'ı geliştirdi ve 1993 Nobel Kimya Ödülü'nü Michael Smith ile paylaştı; tepkimeyi pratik kılan ısıya dayanıklı polimeraz <em>Thermus aquaticus</em>'tan geldi. 2012'de Martin Jinek, Emmanuelle Charpentier, Jennifer Doudna ve arkadaşları <em>Science</em>'ta Cas9'un RNA ile programlanabildiğini ve DNA'yı NGG motifinin üç baz çifti önünden kör uçla kestiğini gösterdi. Charpentier ve Doudna 2020 Nobel Kimya Ödülü'nü “genom düzenleme için bir yöntem geliştirdikleri” gerekçesiyle aldı.",
    "Kasım 2018'de He Jiankui, CCR5 geni düzenlenmiş embriyolardan ikizlerin doğduğunu duyurdu ve 28 Kasım'da Hong Kong'daki İkinci Uluslararası İnsan Genomu Düzenleme Zirvesi'nde sundu. Zirvenin düzenleme komitesi kapanış bildirisinde yapılanı sorumsuz buldu; Çin makamları ertesi gün araştırmayı durdurdu ve 30 Aralık 2019'da mahkeme üç yıl hapis ile 3 milyon yuan para cezası verdi. Dünya Sağlık Örgütü Aralık 2018'de bir uzman komitesi kurdu, 12 Temmuz 2021'de önerilerini dokuz başlıkta yayımladı. Tartışma kapanmadı; kalıtsal düzenlemeyi ağır hastalıkları önlemenin bir yolu sayanlar da, rıza veremeyecek kuşakları etkilediği için karşı çıkanlar da var. Türkiye'de genetiği değiştirilmiş organizmalar 5977 sayılı Biyogüvenlik Kanunu ile düzenlenir (kabul 18/3/2010, Resmî Gazete 26/3/2010, sayı 27533; 13 Kasım 2026'da mevzuat.gov.tr'de okunan metin).",
  ],
  core: [
    {
      heading: "Belirli bir diziyi tanıyan makas",
      body: "II. tip bir <strong>restriksiyon enzimi</strong> 4–8 harflik bir <strong>tanıma dizisini</strong> bulur ve iki ipliği de keser. Tanıma dizileri çoğunlukla palindromdur: EcoRI'nın yeri GAATTC'dir, karşı iplik de 5'→3' okununca GAATTC'dir. İki iplik aynı sütunda kesilirse <strong>kör uç</strong> (SmaI, EcoRV, HaeIII), kaydırılmış yerlerden kesilirse tek iplikli çıkıntılı <strong>yapışkan uç</strong> çıkar (EcoRI'da 5' AATT). İki parça ancak çıkıntıları hem aynı dizide hem aynı türdense birleşir: BamHI ile BglII birleşir (ikisi de 5' GATC), HindIII ile SacI birleşmez — çıkıntı dizisi ikisinde de AGCT'dir ama biri 5', öbürü 3' çıkıntıdır. Rastgele bir dizide n harflik bir dizinin belirli bir yerde başlama olasılığı 1/4ⁿ'dir.",
      formula: "beklenen kesim ≈ L / 4ⁿ ;  halkada parça sayısı = kesim, doğrusalda = kesim + 1",
      formulaNote: "pUC19 (2686 bp) için dört harfli HaeIII'te 2686/256 ≈ 10,5 kesim beklenir, sayfa 11 bulur; altı harfli EcoRI'da 0,66 beklenir, 1 yer vardır. Gerçek diziler rastgele değildir; tahmin yalnız mertebe verir.",
    },
    {
      heading: "PCR: üstel evre, plato ve eşik döngüsü",
      body: "Her döngüde kopya sayısı (1 + E) katına çıkar; E <strong>verimdir</strong>, 0 ile 1 arasındadır. Üstel büyüme sonsuza gitmez: primerler ve nükleotitler tükenir, polimeraz etkinliğini yitirir, eğri bir <strong>platoya</strong> oturur. Sayfa bunu tek bir kapasiteyle modeller: N ← N(1 + E(1 − N/P)). Ölçüm bu yüzden platoda değil, eğrinin bir <strong>eşiği</strong> kestiği üstel evrede yapılır. Eşiğe varma koşulu N₀(1 + E)<sup>Cq</sup> = T'dir; logaritma alınınca C<sub>q</sub>, log₁₀N₀'ın doğrusal bir fonksiyonu çıkar. Başlangıç miktarı 10 kat artınca C<sub>q</sub> 1/log₁₀(1 + E) döngü öne gelir: E = 1'de 3,32, E = 0,9'da 3,59 döngü. Bilinen seyreltmelerle çizilen <strong>standart eğrinin</strong> eğimi, verimi geri verir.",
      formula: "C<sub>q</sub> = [log₁₀T − log₁₀N₀] / log₁₀(1 + E) ;  m = −1/log₁₀(1 + E) ;  E = 10<sup>−1/m</sup> − 1",
      formulaNote: "Bu kapalı biçim yalnız üstel evrede geçerlidir; eşik platoya yakın seçilirse model kuramdan ayrılır ve C<sub>q</sub> başlangıç miktarını ölçmez olur.",
    },
    {
      heading: "Primer: iki uç ve bir sıcaklık",
      body: "PCR yalnız iki ucu bilinen bir bölgeyi çoğaltabilir. <strong>İleri primer</strong> üst iplikteki dizinin aynısıdır; <strong>geri primer</strong>, alt ipliğe bağlandığı için hedefin sonundaki dizinin ters tümleyenidir. Ürün, ileri primerin başından geri primerin bağlandığı yerin sonuna kadar uzanır: sayfadaki M13 çifti pUC19'da 379. bazdan 481. baza, yani 103 bp'lik bir ürün verir. İki primerin <strong>erime sıcaklığı</strong> (T<sub>m</sub>) birbirine yakın olmalıdır; biri çok daha düşükse aynı bağlanma sıcaklığında zayıf kalır. Wallace kuralı her harfe sabit bir katkı verdiği için uzunlukla doğrusal büyür ve uzun primerde değeri şişirir; GC formülü uzunluğa bölerek bunu yumuşatır. Doğru hesap, komşu baz çiftlerinin birbirini etkilediğini hesaba katan en yakın komşu termodinamiğiyle yapılır.",
      formula: "T<sub>m</sub> ≈ 2(A + T) + 4(G + C) ;  T<sub>m</sub> ≈ 64,9 + 41(G + C − 16,4)/N",
      formulaNote: "İleri primer GTAAAACGACGGCCAGT (17 nt, 9 G/C): Wallace 2·8 + 4·9 = 52 °C, GC formülü 64,9 + 41·(9 − 16,4)/17 ≈ 47,1 °C. Geri primer CAGGAAACAGCTATGAC (17 nt, 8 G/C) için 50 °C ve 44,6 °C; sayfa dört değeri yan yana gösterir. Hepsi yaklaşıktır.",
    },
    {
      heading: "Okumak: Sanger'den kapsamaya",
      body: "Sanger yönteminde polimeraza az miktarda <strong>didezoksi nükleotit</strong> karıştırılır; bunlarda fosfodiester bağı için gereken 3'-OH grubu yoktur, biri zincire katılınca uzama durur. Milyonlarca kopyada durma noktası her uzunluğa düştüğü için, son harfi bilinen bir parça dizisi oluşur; dört boya ve kılcal elektroforezle bir <strong>kromatogram</strong> çizilir. Okumalar yaklaşık 800 baza kadar gider, ilk 15–40 baz ve 700–900'den sonrası güvenilmezdir. Bir genomu okumak için ise çok sayıda kısa okuma gerekir. G uzunluğundaki genoma L uzunluğunda N okuma rastgele düşerse <strong>kapsama</strong> C = LN/G olur. Tek bir okumanın belirli bir bazı kaçırma olasılığı yaklaşık 1 − L/G, hepsinin kaçırması (1 − L/G)<sup>N</sup> ≈ e<sup>−C</sup>'dir.",
      formula: "C = L·N / G ;  okunmayan baz payı ≈ e<sup>−C</sup>",
      formulaNote: "Poisson yaklaşımı okumaları bağımsız ve düzgün dağılmış sayar. C = 7,5'te e⁻ᶜ ≈ %0,055; sayfanın benzetimi aynı ayarda %0,085 ölçer. Gerçekte GC yanlılığı ve tekrar bölgeleri boşlukları artırır.",
    },
    {
      heading: "Kılavuzla adreslenen kesim ve onarım",
      body: "Restriksiyon enziminin adresi sabittir; CRISPR–Cas9'da adresi kılavuz RNA'nın 20 harflik bölümü belirler. <em>Streptococcus pyogenes</em> Cas9'u yalnız hedefin hemen 3' tarafında bir <strong>PAM</strong> (NGG) varsa keser. PAM hedef DNA'nın üstündedir, kılavuzun parçası değildir. Kesim PAM'dan üç baz çifti önce, kör uçlarla olur. Değişikliği hücrenin onarımı yazar: <strong>NHEJ</strong> uçları doğrudan birleştirir ve sıklıkla kısa ekleme ya da eksilmeler (<strong>indel</strong>) bırakır; indelin uzunluğu üçün katı değilse okuma çerçevesi kayar. Uzunluklar 1 ile maksimum arasında düzgün dağılırsa üçün katı olmayanların payı maksimum üçün katıyken tam 2/3'tür. <strong>HDR</strong> ise bir kalıp kullanır, verimi düşüktür. Sayfadaki hedef dışı puanı bir tahmin aracı değil, çekirdek bölge fikrini gösteren bir öğretim ölçüsüdür.",
      formula: "P(çerçeve kayar) = #{k ≤ k<sub>enb</sub> : k mod 3 ≠ 0} / k<sub>enb</sub>",
      formulaNote: "k<sub>enb</sub> = 9 için 6/9 = %66,7; sayfanın 2000 hücrelik benzetimi aynı ayarda %67,6 ölçer. Gerçek onarımda uzunluklar düzgün dağılmaz, kısa eksilmeler daha sıktır.",
    },
  ],
  lab: {
    intro:
      "Sayfada beş sekme var: <strong>01 · Kesme ve yapıştırma</strong> (dizi ve enzim menüleri, agaroz kaydırıcısı, benzetilmiş jel, halkasal harita, ligasyon paneli), <strong>02 · PCR</strong> (N₀, verim, döngü, plato ve eşik kaydırıcıları; standart eğri; primer kutuları), <strong>03 · Dizileme</strong> (yapay kromatogram, pencere ve gürültü kaydırıcıları, kapsama benzetimi), <strong>04 · CRISPR–Cas9</strong> (kılavuz bulucu, eşleşmezlik tablosu, onarım modeli) ve <strong>05 · Uygulama ve yönetişim</strong> (tarih çizgisi, amaç seçici, tartışma kartları). Bütün araçlar yalnız hesap yapar. Aşağıdaki sayılar varsayılan ayarlarla alındı; her sekmedeki <kbd>Sekmeyi sıfırla</kbd> düğmesi (ya da bir form denetiminde değilken <kbd>R</kbd> tuşu) başlangıca döndürür.",
    experiments: [
      {
        title: "Çift kesim, bir jel ve agarozun yüzdesi",
        predict: "Halkasal bir plazmitte iki enzim birer yer kesiyorsa kaç parça çıkar? Parçaların toplamı ne olmalı? 51 bp'lik bir parçayı %1,0'lik jelde görebilir misin?",
        do: "01 sekmesinde <kbd>Çift kesim: ek yeri</kbd> düğmesine bas (pUC19 + EcoRI + HindIII, halkasal, %1,0 jel). Okumaları not et, sonra <em>Agaroz jeli</em> kaydırıcısını %2,0'ye çek. Ardından <kbd>Tek kesim</kbd> düğmesine bas ve <em>bundan sonra</em> <em>Topoloji</em>yi “Doğrusal” yap — ön ayar düğmeleri sekmenin geri kalanını varsayılana döndürdüğü için sıra önemlidir.",
        observe: "Kesim sayısı 2, parça sayısı 2, en büyük/en küçük 2635 / 51 bp, toplam 2686 bp — dizi uzunluğuyla birebir. %1,0'de durum satırı küçük parçanın ayırma aralığının (500 bp) altında kaldığını söyler; %2,0'de aralık 100–2000 bp'ye kayar ve bu kez büyük parça aralığın üstünde, küçük parça altında kalır. Tek enzimde (EcoRI) halkasal plazmit tek bir 2686 bp'lik parçaya açılır; topolojiyi “Doğrusal” yapınca aynı 1 kesim 2 parça verir: 2290 ve 396 bp.",
        explain: "Halkada her kesim bir parça ekler, çünkü ipin iki ucu yoktur: n kesim n parça. Doğrusal bir parçada n kesim n + 1 parça verir. Toplamın 2686 bp'de sabit kalması modelin denetimi: kesmek harf eklemez. 51 bp'lik parça çoklu klonlama bölgesidir; jel belirli bir aralıkta ayırır, o yüzden hangi parçayı göreceğin agarozun yüzdesine bağlıdır.",
      },
      {
        title: "Dört harf mi, altı harf mi keser?",
        predict: "pUC19 2686 bp. Dört harflik tanıma dizisi olan bir enzim kaç yerden keser? Altı harflik olan?",
        do: "01 sekmesinde <kbd>Sık kesen enzim</kbd> düğmesine bas (HaeIII, GGCC, %2,0 jel). Kesim sayısını ve parça listesini oku. Sonra agarozu %1,0'e çekip durum satırını izle — enzimi değiştirmeden. En sonunda <em>Birinci enzim</em>i EcoRI yap.",
        observe: "HaeIII 11 yerden keser; parçalar 587, 458, 434, 298, 267, 257, 174, 102, 80, 18 ve 11 bp, toplam yine 2686. %2,0'de 3 parça aralığın altında, 3 bant komşusuyla üst üste biniyor. %1,0'e inince 10 parça aralığın altına düşer. EcoRI ise tek bir yerden keser.",
        explain: "Rastgele bir dizide dört harflik bir dizi ortalama 4⁴ = 256 bazda bir, altı harflik 4⁶ = 4096 bazda bir bulunur. 2686/256 ≈ 10,5 beklenir, 11 çıkar; 2686/4096 ≈ 0,66 beklenir, 1 çıkar. Jelde “bant sayısı = parça sayısı” değildir: boyutları yakın parçalar tek bant gibi görünür, aralığın dışındakiler ayırt edilmez.",
      },
      {
        title: "Eşik döngüsü başlangıç miktarını nasıl ölçer?",
        predict: "Verim %90 iken başlangıç kopya sayısını 10 kat artırırsan C<sub>q</sub> kaç döngü öne gelir? Verim %100 olsaydı bu fark büyür mü, küçülür mü?",
        do: "02 sekmesinde varsayılanı oku (N₀ = 1,0 × 10³, E = 0,9, 35 döngü, eşik 1,0 × 10⁸). <em>Başlangıç kopya sayısı</em> kaydırıcısını 1,0 × 10⁴'e, sonra 1,0 × 10⁵'e getir. Ardından <kbd>Tam verim</kbd>e basıp aynı iki adımı yinele. Son olarak <kbd>Tek kopyadan</kbd> düğmesine bas.",
        observe: "E = 0,9'da C<sub>q</sub> sırasıyla 17,94 → 14,35 → 10,76. döngü: her onda bir seyreltme 3,59 döngü. Tam verimde 16,61 → 13,29, yani 3,32 döngü. Standart eğri bunu doğrular: eğim −3,587 ve geri hesaplanan verim %90,0 (tam verimde −3,322 ve %100,0). <kbd>Tek kopyadan</kbd>'da 45 döngüde model 3,16 × 10¹¹'de, kuram 3,50 × 10¹²'de durur.",
        explain: "C<sub>q</sub> = [log₁₀T − log₁₀N₀]/log₁₀(1 + E) olduğu için N₀ on kat artınca C<sub>q</sub> tam 1/log₁₀(1 + E) döngü azalır: E = 0,9 için 3,59, E = 1 için 3,32. Eğim de bunun eksilisidir, bu yüzden eğimden verime dönülebilir. Model ile kuramın ayrıştığı yer platodur; ölçüm orada değil, eşiğin kesildiği üstel evrede yapıldığı için C<sub>q</sub> hâlâ başlangıç miktarını ölçer.",
      },
      {
        title: "PAM hedefin içinde mi? Ve kaç tane var?",
        predict: "420 bp'lik yapay bir dizide iki iplikte kaç kılavuz bulunur? Kılavuzun 20 harfine PAM dahil midir?",
        do: "04 sekmesinde varsayılanı oku (Yapay dizi B, iki iplik). Hedef satırını (<em>crView</em>) dikkatle incele. <em>İplik</em> menüsünü “Yalnız üst iplik”e, sonra “Yalnız alt iplik”e çevirip sayıları karşılaştır. Son olarak <em>İplik</em>i “İkisi de”ye geri al (ya da <kbd>Sekmeyi sıfırla</kbd>), diziyi pUC19 yap ve <em>Kılavuz</em> menüsünden “+ iplik · kesim 118 · GC %75” girdisini seç ve <em>eşleşmezlik</em> kaydırıcısını 5'e çek.",
        observe: "420 bp'de 52 kılavuz, ortalama 8,08 bazda bir; tek iplikte 26, yani iki iplikte tam iki katı. Hedef satırı 20 harfi, kesim çizgisini ve ayrı yazılmış PAM'ı gösterir: PAM hedefin dışındadır. pUC19'da (2686 bp) 326 kılavuz, ortalama 8,24 bazda bir; seçilen kılavuz için tabloda 5 eşleşmezlikli bir benzer yer belirir ve çekirdek sütunu o yerin PAM'a yakın 12 harfinde de uyumsuzluk taşıdığını söyler.",
        explain: "NGG motifi rastgele bir dizide 16 konumda bir beklenir; iki iplik birlikte ortalama 8 bazda bir kılavuz demektir ve ölçülen 8,08 ile 8,24 bunu doğrular. Kılavuzun eşleşen bölümü 20 nükleotittir; PAM'ı ona eklemek hedefi üç harf kaydırmak olur. Benzer yerlerin sayısı taranan dizi uzunluğuyla büyür: 420 bp'de hiç yokken 2686 bp'de görünmeye başlar, bir genomda çok daha fazlası beklenir. Eşleşmezliğin yeri sayısından önemlidir; sayfadaki puan bunu göstermek içindir, tahmin için değil.",
      },
    ],
  },
  wow: [
    {
      title: "Otuz döngü, bir milyar kat",
      body: "Verim tam olsaydı 30 döngü 2³⁰ = 1 073 741 824 kat yapardı: tek bir molekülden bir milyarın üzerinde kopya. Sayfada bunu <kbd>Tam verim</kbd> ile görebilirsin — ama aynı eğri 30. döngüde plato kapasitesinin %95'ine de varır. Üstel büyümenin bedeli, kısa sürede kendi sınırına çarpmasıdır.",
    },
    {
      title: "Bir enzimin adı nereden gelir",
      body: "Her restriksiyon enzimi ayrıldığı bakterinin adını taşır: EcoRI'da E cins adından (<em>Escherichia</em>), co tür adından (<em>coli</em>), R suştan (RY13), I ise o bakteriden ayrılan ilk enzim olduğundan gelir. HindIII de <em>Haemophilus influenzae</em>'den gelir. Bugün 250'den fazla farklı özgüllükte, 3600'ü aşkın restriksiyon endonükleazı bilinir; sayfadaki panelde bunlardan 18'i var.",
    },
    {
      title: "Bir harf cezası",
      body: "He Jiankui'nin 26 Kasım 2018'de duyurduğu çalışma, bilim çevrelerinde hemen hemen tek sesle kınandı: Hong Kong zirvesinin düzenleme komitesi kapanış bildirisinde yapılanı sorumsuz buldu, Çin makamları 29 Kasım'da araştırmayı durdurdu ve 30 Aralık 2019'da mahkeme üç yıl hapis ile 3 milyon yuan para cezası verdi. Bir derlemeye göre 2020 Ekim'inde, politikası olan 96 ülkeden 70'i kalıtsal düzenlemenin üreme amaçlı kullanımını açıkça yasaklıyor, hiçbiri açıkça izin vermiyordu.",
    },
  ],
  worked: {
    title: "Bilinmeyen örneğin kopya sayısı",
    prompt: "Bir qPCR çalışmasında bilinen seyreltmelerden çizilen standart eğrinin eğimi m = −3,587, başlangıç kopya sayısı 1,0 × 10³ olan örnek eşiği C<sub>q</sub> = 17,94. döngüde geçiyor. (a) Tepkimenin verimi nedir? (b) Bilinmeyen bir örnek aynı eşiği 24,0. döngüde geçiyorsa başlangıç kopya sayısı kaçtır? (Sayfada 02 sekmesi, varsayılan ayarlar.)",
    steps: [
      "Verim: m = −1/log₁₀(1 + E) olduğundan E = 10<sup>−1/m</sup> − 1 = 10<sup>1/3,587</sup> − 1 = 10<sup>0,2788</sup> − 1 = 1,900 − 1 = 0,900, yani %90,0. Sayfa <em>Eğimden geri hesaplanan verim</em> kutusunda %90,0 gösterir.",
      "Eğimin anlamı: başlangıç miktarı 10 kat değişince C<sub>q</sub> 3,587 döngü kayar. İki örnek arasındaki fark ΔC<sub>q</sub> = 24,0 − 17,94 = 6,06 döngü; bilinmeyen daha geç eşiği geçtiğine göre daha az kalıpla başlamıştır.",
      "Kaç kat az: 10<sup>ΔCq/|m|</sup> = 10<sup>6,06/3,587</sup> = 10<sup>1,689</sup> ≈ 48,9 kat.",
      "Başlangıç kopya sayısı: N₀ = 1,0 × 10³ / 48,9 ≈ 20,4 kopya, yani yaklaşık 2 × 10¹ kopya.",
      "Denetim: sayfada <em>Başlangıç kopya sayısı</em> kaydırıcısını yarım basamak adımlarla gezdir. 1,0 × 10² kopyada C<sub>q</sub> = 21,52. döngü çıkar; 20 kopya bunun beşte biri olduğu için C<sub>q</sub>'nun yaklaşık log₁₀5 · 3,587 ≈ 2,5 döngü daha geç, yani 24 dolayında olmasını bekleriz. Tutuyor.",
    ],
    result: "Verim %90,0 ve bilinmeyen örnek yaklaşık 20 kopyayla başlamıştır: altı döngülük bir gecikme, elli kata yakın bir miktar farkı demektir. Birim “kopya”dır; eğim ancak standart eğri üstel evrede ölçüldüyse anlamlıdır.",
  },
  misconceptions: [
    {
      myth: "PCR her döngüde ikiye katlar, yeterince uzun sürerse istediğin kadar ürün verir.",
      truth: "Katlanma oranı (1 + E)'dir ve tepkime bir platoya oturur. Sayfanın varsayılanında 35 döngüde model 3,16 × 10¹¹ kopyada durur, platosuz kuram 5,71 × 10¹² der: 18 kat fark. Eğri 33. döngüde kapasitenin %95'ine varır; ondan sonraki döngüler neredeyse hiçbir şey katmaz.",
    },
    {
      myth: "Jelde görünen bant sayısı parça sayısıdır.",
      truth: "Jel belirli bir aralıkta ayırır. HaeIII ile kesilmiş pUC19'da 11 parça vardır ama %2,0'lik jelde üçü aralığın altına düşer ve üç bant komşusuyla üst üste biner; %1,0'de on parça aralığın altında kalır. Parça saymak için jele değil, hesaba bakmak gerekir.",
    },
    {
      myth: "PAM, kılavuz RNA'nın bir parçasıdır: kılavuz 20 nt hedef artı NGG'dir.",
      truth: "PAM hedef DNA'nın üstündedir. Kılavuzun eşleşen bölümü 20 nükleotittir; Cas9 yalnız hedefin hemen 3' tarafında NGG varsa keser. Kılavuza PAM'ı eklemek hedefi üç harf kaydırmak ve yanlış yeri aramak olur. Sayfadaki hedef satırı ikisini ayrı yazar.",
    },
    {
      myth: "Wallace kuralı her primer için erime sıcaklığını verir.",
      truth: "2(A + T) + 4(G + C) her harfe sabit bir katkı verir, bu yüzden uzunlukla doğrusal büyür ve uzun primerlerde değeri şişirir. 17 nt'lik ileri M13 primerinde Wallace 52 °C, GC formülü 47,1 °C der; “Sık yapılan hatalar” bölümünde primer uzunluğu kaydırıcısını çekerek farkın nasıl açıldığını görebilirsin. Doğru hesap en yakın komşu termodinamiğiyle yapılır.",
    },
  ],
  glossary: [
    { term: "Restriksiyon enzimi", definition: "DNA'da belirli bir kısa diziyi tanıyıp iki ipliği de o bölgeden kesen bakteri enzimi; II. tipi tanıdığı yerden keser." },
    { term: "Yapışkan uç", definition: "Kesimin iki iplikte farklı sütunlarda olmasıyla kalan tek iplikli çıkıntı; aynı çıkıntıyı taşıyan uçlar birbirine bağlanabilir." },
    { term: "Plazmit", definition: "Bakteride kromozomdan ayrı duran, kendi başına kopyalanabilen halkasal DNA; klonlama vektörü olarak kullanılır." },
    { term: "Verim (E)", definition: "PCR'da bir döngüde kopya sayısının (1 + E) katına çıkmasını veren oran; E = 1 tam ikiye katlanmadır." },
    { term: "Eşik döngüsü (C<sub>q</sub>)", definition: "Ürün miktarının seçilen saptama eşiğini geçtiği döngü; başlangıç miktarının logaritmasıyla doğrusal değişir." },
    { term: "Kapsama", definition: "Dizilemede bir genomun her bazının ortalama kaç okumayla örtüldüğü: C = L·N/G." },
    { term: "PAM", definition: "Cas9'un kesebilmesi için hedefin hemen 3' tarafında bulunması gereken kısa motif; SpCas9 için NGG'dir ve kılavuzun parçası değildir." },
    { term: "İndel", definition: "Bir kırığın onarılması sırasında eklenen ya da eksilen birkaç baz; uzunluğu üçün katı değilse okuma çerçevesi kayar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede gen mühendisliği çoğunlukla bir anlatı olarak geçer: kesilir, takılır, bakteriye verilir. Üniversitede aynı konu hesap hâline gelir. Moleküler Biyoloji ve Genetik Mühendisliği derslerinde kesim haritası çıkarmak, vektör seçmek ve klonlama tasarlamak bir problem türüdür. Biyokimya'da polimerazın ve ligazın kinetiği, Biyofizik'te DNA'nın jeldeki hareketi işlenir. qPCR'ın standart eğrisi Biyoistatistik'te en küçük kareler, R² ve ölçüm belirsizliği başlıklarının altına girer; sayfadaki eğimden verim hesabı tam olarak oradaki doğrusal regresyonun bir uygulamasıdır.",
      "Dizileme ve CRISPR, iki ayrı dalın kapısını açar. Biyoinformatik'te okumaların birleştirilmesi, kapsama ve hizalama algoritmaları; Genomik'te varyant çağırma ve kalite puanları öğrenilir. Hedef dışı tarama, kabaca dizi arama ve yaklaşık eşleme probleminin bir örneğidir. Yöntemlerin kendisi kadar kurallar da ders konusudur: biyogüvenlik, etik kurul süreçleri ve ulusal mevzuat, Biyoteknoloji ve Biyoetik derslerinin başlıklarıdır.",
    ],
    topics: ["Klonlama tasarımı ve vektörler", "qPCR ve standart eğri istatistiği", "Dizileme teknolojileri ve kalite puanları", "Dizi hizalama ve yaklaşık eşleme", "Genom düzenleme araçları", "Biyogüvenlik, etik ve mevzuat"],
  },
  quiz: [
    {
      question: "Verim %90 olan bir qPCR'da iki örneğin eşik döngüleri 17,9 ve 24,0. İkinci örnek birinciden yaklaşık kaç kat az kalıpla başlamıştır?",
      options: ["Yaklaşık 6 kat", "Yaklaşık 12 kat", "Yaklaşık 50 kat", "Yaklaşık 500 kat"],
      answer: 2,
      explanation: "E = 0,9'da on kat seyreltme C<sub>q</sub>'yu 1/log₁₀1,9 ≈ 3,59 döngü geciktirir. Fark 6,1 döngü, yani 6,1/3,59 ≈ 1,69 ondalık basamak: 10<sup>1,69</sup> ≈ 49 kat. Tam verimde aynı fark 10<sup>6,1/3,32</sup> ≈ 70 kata karşılık gelirdi.",
    },
    {
      question: "Dört harflik tanıma dizisi olan bir enzim 2686 bp'lik pUC19'u 11 yerden kesiyor. Altı harflik bir enzimden aynı plazmitte kaç kesim beklersin?",
      options: ["Yaklaşık 11 kesim", "Yaklaşık 3 kesim", "Yaklaşık 1 kesim (çoğu zaman hiç ya da bir)", "Yaklaşık 170 kesim"],
      answer: 2,
      explanation: "Rastgele dizide bir dizinin bulunma sıklığı 1/4ⁿ ile ölçeklenir; iki harf eklemek beklenen aralığı 16 katına çıkarır. 2686/4096 ≈ 0,66, yani çoğu altı harflik enzim bu plazmiti ya hiç kesmez ya bir yerden keser. Sayfada EcoRI tek bir yerden keser.",
    },
    {
      question: "Bir dizilemede kapsama C = 7,5 iken okunmayan baz oranı yaklaşık %0,06. Okuma sayısını iki katına çıkarırsan bu oran kabaca ne olur?",
      options: ["Yarıya iner: %0,03", "Karesi alınır: %0,00003 dolayına iner", "Değişmez", "İki katına çıkar"],
      answer: 1,
      explanation: "Oran e<sup>−C</sup> ile düşer, C'yle ters orantılı değil. C 15'e çıkınca e⁻¹⁵ ≈ 3 × 10⁻⁷, yani e⁻⁷·⁵'in karesi olur. Sayfada <kbd>Yüksek kapsama</kbd> C = 29,86'da kuramı %0,000 gösterir; orada sınırlayıcı olan artık rastlantı değil, modelin dışında kalan GC yanlılığı ve tekrar bölgeleridir.",
    },
  ],
  next: [
    { href: "dna-replikasyon.html", title: "DNA ve Replikasyon Laboratuvarı", why: "PCR'ın taklit ettiği şey hücrenin kendi kopyalama makinesidir: çatal, primer, polimeraz ve kopya başına hata oranı orada ölçülüyor." },
    { href: "gen-ifadesi-ve-molekuler-biyoloji.html", title: "Gen İfadesi ve Moleküler Bilgi Akışı Laboratuvarı", why: "Kesilen ve değiştirilen dizinin ne anlama geldiği: transkripsiyon, kodon kodon çeviri, okuma çerçevesi ve lac operonu." },
    { href: "enzim-kinetigi.html", title: "Enzim Kinetiği Laboratuvarı", why: "Restriksiyon enzimi de polimeraz da enzimdir; hız tavanı, Michaelis–Menten ve inhibisyon o sayfada ölçülüyor." },
    { href: "biyoinformatik-ve-dizi-hizalama.html", title: "Biyoinformatik: Dizi Hizalama, Puanlama Matrisleri ve Soy Ağaçları", why: "Hedef dışı tarama kabaca bir yaklaşık eşleme problemidir; orada Needleman–Wunsch ve Smith–Waterman tabloları adım adım kuruluyor, BLOSUM62 ve anlamlılık sınaması işleniyor." },
  ],
  sources: [
    { title: "Wikipedia · Restriction enzyme", url: "https://en.wikipedia.org/wiki/Restriction_enzyme", note: "HindII'nin 1970'te Smith, Kelly ve Wilcox tarafından ayrılması; 1978 Nobel Fizyoloji ya da Tıp Ödülü; adlandırma kuralı; 250'den fazla özgüllük ve 3600'ü aşkın enzim." },
    { title: "Wikipedia · Polymerase chain reaction", url: "https://en.wikipedia.org/wiki/Polymerase_chain_reaction", note: "Mullis 1983 (Cetus), 1993 Nobel Kimya Ödülü'nün Michael Smith ile paylaşılması, <em>Thermus aquaticus</em> polimerazı, 30 döngüde 2³⁰ = 1 073 741 824 kopya, plato nedenleri." },
    { title: "Wikipedia · Sanger sequencing", url: "https://en.wikipedia.org/wiki/Sanger_sequencing", note: "1977 Sanger ve arkadaşları, ddNTP'lerde 3'-OH eksikliği, yaklaşık 800 bazlık üst sınır, ilk 15–40 bazın ve 700–900'den sonrasının düşük kalitesi." },
    { title: "Jinek M. ve ark., Science 2012 · A programmable dual RNA-guided DNA endonuclease", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6286148/", note: "Kesimin PAM'dan üç baz çifti önce kör uçla olması, NGG uzlaşı dizisi, hedefe bağlanan 20 nükleotitlik bölüm ve tek zincirli kimerik RNA." },
    { title: "Dünya Sağlık Örgütü · Human genome editing: recommendations (12 Temmuz 2021)", url: "https://www.who.int/publications/i/item/9789240030381", note: "Aralık 2018'de kurulan uzman komitesinin dokuz başlıktaki önerileri ve kayıt sistemi önerisi." },
  ],
  revision: "Kasım 2026",
};
