window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["celik-yapilar"] = {
  slug: "celik-yapilar",
  title: "Çelik Yapılar: Kesit, Bağlantı ve Kararlılık",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Bir I kesiti başka yönde eğ, bağlantıya bulon ekle, kolonu yandan tut. Her müdahale hangi hesabı değiştirir; hangi soruyu hâlâ yanıtsız bırakır?",
  hook: "Dört bulonlu bir bağlantıda levhanın enine kesitine üçüncü bir delik açıp iki bulon daha takıyorsun. Her bulonun payına düşen kuvvet 30 kN'den 20 kN'ye iniyor; ama aynı kesitten daha çok çelik çıkardığın için levhanın nominal çekme gerilmesi yaklaşık 77 MPa'dan 90 MPa'ya çıkıyor. Aynı müdahale bir hesabı rahatlatırken ötekini nasıl zorlar?",
  bigIdea: "Kesit geometrisi, bağlantının yük aktarımı ve elemanın kararlılığı ayrı sorulardır; birinin hesabını çözmek diğerlerini kendiliğinden çözmez.",
  story: [
    "Leonhard Euler, ince bir çubuğun eksenel basınç altında hangi yükte yana kaçabileceğini 1744'te hesapladı. O formülde malzemenin dayanımı hiç geçmez: yalnız rijitlik EI ve boy L vardır. Bu, bugün de şaşırtıcı gelen bir ayrımın ilk işaretidir. Bir eleman, malzemesi tükenmeden çok önce biçimini koruyamaz hâle gelebilir; ne kadar gerilme taşıyor sorusu ile düz kalabilir mi sorusu aynı soru değildir.",
    "David M. Parks'ın MIT'de 9 Şubat 2004 tarihli Euler–Bernoulli kirişleri ders notu, eğilme ile kolon burkulmasını aynı elastik çerçevede ele alır. Eğilmede bir yükün ne kadar şekil değiştirme ürettiğini sorarız; burkulmada düz denge durumunun hangi yükte kararlılığını yitirebildiğini. Her iki hesapta EI görünür, fakat sorular ve sınır koşulları farklıdır. Aynı çubuk, iki ayrı sınava girer.",
    "SCI ve BCSA'nın SteelConstruction.info kaynağı da kesit, eleman ve bağlantı denetimlerini ayrı başlıklarda işler. Bir levhanın alanını bilmek bulon kuvvetlerini; bir kolonun akma gerilmesini bilmek yanal kararlılığını tek başına vermez. Bu laboratuvar, gerçek tasarımın tamamını taklit etmek yerine üç hesabın hangi bilgilere ihtiyaç duyduğunu görünür kılar. Buradaki E = 200 GPa ve f_y = 250 MPa belirli bir çelik sınıfının verileri değil, seçilmiş varsayımsal malzeme değerleridir."
  ],
  core: [
    {
      heading: "Malzemenin miktarı kadar nerede olduğu da önemlidir",
      body: "Alan A, kesitte ne kadar malzeme bulunduğunu söyler. Alanın ikinci momenti I ise malzemenin seçilen eksenden uzaklığını karesiyle tartar. I kesitin başlıkları, x ekseninden uzakta alan topladığı için x çevresindeki eğilmeye büyük katkı yapar. Aynı kesitin y eksenine göre I değeri farklıdır. Dikdörtgen bir parçanın kendi merkez eksenindeki I değerini kullanırken, kesitin ortak eksenine taşıma için A_parça·d² eklenir: paralel eksen teoremi. Buradaki I, kütle atalet momenti değildir.",
      formula: "I<sub>x</sub> = ∫<sub>A</sub> y² dA, &nbsp; I<sub>y</sub> = ∫<sub>A</sub> x² dA<br>I<sub>ortak</sub> = I<sub>parça,merkez</sub> + A<sub>parça</sub>d²",
      formulaNote: "A'nın birimi m², I'nın m⁴'tür. 1 cm⁴ = 10⁻⁸ m⁴. Kesit modeli çift simetrili, keskin köşeli ideal I geometrisidir; gerçek hadde profilinin köşe yuvarlatmaları yoktur."
    },
    {
      heading: "Kesit modülü gerilmenin kolunu belirler",
      body: "Düz kesitlerin düz kaldığı, küçük şekil değiştirmeli doğrusal elastik eğilmede boyuna gerilme nötr eksenden uzaklıkla doğrusal değişir. En uzak lifin uzaklığı c ise en büyük gerilme büyüklüğü |M|c/I olur. W = I/c tanımı bu hesabı |M|/W biçimine indirger. x için c = h/2; y için c = b/2. f_yW, ilk lifin akmaya eriştiği elastik moment referansıdır. Akma sonrasında gerilmelerin yeniden dağılımını, plastik momenti, başlık ve gövde levhalarının yerel burkulmasını bu formül hesaplamaz.",
      formula: "|σ|<sub>max</sub> = |M|c/I = |M|/W<br>W<sub>x</sub> = 2I<sub>x</sub>/h, &nbsp; W<sub>y</sub> = 2I<sub>y</sub>/b<br>M<sub>ilk akma,ref</sub> = f<sub>y</sub>W",
      formulaNote: "W birimi m³, M birimi N·m, gerilme Pa = N/m². Ara yanal bağ, verilen M ve kesit için bu M/W hesabını değiştirmez; yanal burulmalı burkulma ayrı bir kararlılık problemidir."
    },
    {
      heading: "Bulon eklerken levhadan ne çıkarıyorsun?",
      body: "Enine a delik ve boyuna l sıra için toplam bulon sayısı n = al. Bu deney her bulona eşit P/n kuvveti verir. Boyuna sıra eklemek, seçilen enine net kesitten daha fazla alan çıkarmaz; enine delik eklemek çıkarır. Brüt gerilme P/(bt), net gerilme P/[(b−ad₀)t] olur. Bulonun tek kesme düzlemindeki ortalama gerilmesi kuvvetin dairesel gövde alanına bölümüdür. Ezilme hesabında ise td izdüşüm alanı kullanılır. Bu üç gerilme farklı alanlarda tanımlanır; birini diğerinin dayanımıyla kıyaslayamazsın.",
      formula: "A<sub>g</sub> = bt, &nbsp; A<sub>n</sub> = (b − ad₀)t, &nbsp; F<sub>bulon</sub> = P/(al)<br>τ<sub>ort</sub> = F<sub>bulon</sub>/(πd²/4), &nbsp; σ<sub>ez,ort</sub> = F<sub>bulon</sub>/(td)",
      formulaNote: "d₀ = d + 2 mm yalnız bu deneyin delik varsayımıdır. Dişsiz gövde ve tek kesme düzlemi kabul edilir. Nominal P/A_n hesabı delik çevresindeki yerel gerilme yığılmasını ve her sıradaki gerçek yük aktarımını çözmez. Eşit paylaşım bir idealizasyondur: sürtünme, eksantriklik, kayma gecikmesi (kesitin bağlanmayan parçalarının yüke geç katılması), kenar yırtılması ve blok kopma modelde yoktur."
    },
    {
      heading: "Kolonun iki ayrı kaçış yönü vardır",
      body: "Merkezî basınç altındaki kusursuz elastik kolon, akmadan önce yanal kararlılığını kaybedebilir. İki uç mafsallı ve ara bağsız kolon için Euler yükü π²EI/L²'dir. Burada iki eğilme düzlemine ayrı ayrı ideal öteleme bağları koyarsın. Eşit n panelde etkin boy L/n olur; seçilen düzlemdeki Euler referansı n² ile büyür. Diğer düzlemin değeri değişmez. İki eğilme özdeğerinin küçüğü belirleyicidir. x ekseni çevresinde eğilme y yönünde, y çevresinde eğilme x yönünde yer değiştirmeyle ilişkilidir.",
      formula: "N<sub>Ex</sub> = π²EI<sub>x</sub>/(L/n<sub>x</sub>)²<br>N<sub>Ey</sub> = π²EI<sub>y</sub>/(L/n<sub>y</sub>)²<br>N<sub>E</sub> = min(N<sub>Ex</sub>, N<sub>Ey</sub>)",
      formulaNote: "Bağlar sonsuz enine rijitlikte, dönmeler serbesttir. Gerçek bağ kuvveti ve gerekli rijitlik hesaplanmaz. Kolon sekmesi ilk sekmeden bağımsız, sabit 300 × 150 mm, t_f = 12 mm, t_w = 8 mm kesiti kullanır."
    },
    {
      heading: "Bir sonuç, kendi varsayımını geçersiz kılabilir",
      body: "Atalet yarıçapı r = √(I/A), etkin boyla birleşince boyutsuz narinliği λ = L_e/r verir. Euler gerilmesi π²E/λ²'dir. λ küçüldükçe bu biçimsel sonuç büyür; fakat N_E/A akma referansına ulaşırsa doğrusal elastik modelin koşulu artık sağlanmaz. Eşiği π²E/λ² = f_y koşulu verir: λ<sub>s</sub> = π√(E/f_y). Sayfanın varsayımsal değerleriyle λ<sub>s</sub> = π√800 ≈ 88,9; daha küt kolonlarda Euler sayısı yalnız biçimseldir. Sonucu Af_y ile kesmek de gerçek kolon kapasitesini üretmez. Kusurlar, artık gerilmeler, yerel ve burulmalı burkulma ile malzemenin elastik olmayan davranışı ayrı modeller ister. Benzer biçimde σ < f_y bulmak, kirişte yanal burulmalı burkulmayı veya bağlantıda kopmayı denetlediğin anlamına gelmez.",
      formula: "r = √(I/A), &nbsp; λ = L<sub>e</sub>/r<br>σ<sub>E</sub> = N<sub>E</sub>/A = π²E/λ²<br>σ<sub>E</sub> &lt; f<sub>y</sub> &nbsp;⇔&nbsp; λ &gt; λ<sub>s</sub> = π√(E/f<sub>y</sub>)",
      formulaNote: "r uzunluk, λ boyutsuzdur; I ve etkin boy, incelenen eğilme eksenine aittir. f_y ile karşılaştırma burada model geçerliliği uyarısıdır; yönetmelik güvenlik katsayısı veya tasarım onayı değildir. λ > λ_s olması da kolonun Euler yükünü taşıyacağını göstermez: kusurlu gerçek kolonlar bu ideal değere ulaşamaz."
    }
  ],
  lab: {
    intro: "Üç sekme bağımsızdır. Her birinde Bu deneyi sıfırla yalnız o sekmeyi sıfırlar. Kartlar yuvarlanmış sonuçları, tablolar ilgili alan ve momentleri gösterir; bunlar hesaplanan değerlerdir. Bir sekme adı seçiliyken sol/sağ ok tuşlarıyla öbür sekmelere geçebilirsin. Hazır düzen düğmesi yoktur; deneyleri aşağıdaki değerleri elle girerek kurarsın. Bir önceki deneyin ayarlarını taşımamak için her deneye belirtilen sıfırlamayla başla.",
    experiments: [
      {
        title: "Aynı I kesiti başka yönde eğ",
        predict: "Malzeme miktarı aynıyken moment eksenini x'ten y'ye geçirmek gerilmeyi değiştirebilir mi?",
        do: "Kesit ve eğilme sekmesinde Bu deneyi sıfırla: h = 300 mm, b = 150 mm, t_f = 12 mm, t_w = 8 mm; Eğilme momenti |M| = 30 kN·m. Momentin ekseni menüsünde önce x, sonra y seç. Ardından x'e dönüp 6 m kirişte ara yanal bağ sayısı değerini 0'dan 3'e çıkar.",
        observe: "Alan iki yönde de 5.808 mm². W_x ≈ 591,395 cm³, W_y ≈ 90,157 cm³; gerilmeler sırasıyla 50,728 ve 332,753 MPa. İki gerilmenin oranı W_x/W_y ≈ 6,56'dır. y sonucu 250 MPa referansını aşar; durum satırı da bunu bildirir. Bu sayı, doğrusal formülün geçerli olmadığı bölgeye taşmış biçimsel bir değerdir, kesitteki gerçek gerilme değildir. x'e dönüp üç bağ ekleyince bağ aralığı 6 m'den 1,5 m'ye iner; M/W sonucu 50,728 MPa olarak kalır.",
        explain: "W eksene bağlıdır. Aynı momentin gerilmesi W küçüldüğünde büyür. Bağlar kesitin W değerini değiştirmez. Kısalan bağ aralığı gerçek kirişin yanal kararlılığı açısından önemlidir, fakat bu sekme yanal burulmalı burkulma kapasitesi hesaplamaz."
      },
      {
        title: "Bulonları hangi yönde çoğalttığın önemlidir",
        predict: "Dört bulonu sekize çıkarmakla dört bulonu altıya çıkarmak, levha gerilmesini aynı yönde mi değiştirir?",
        do: "Delik ve bağlantı sekmesini sıfırla: b = 200 mm, t = 10 mm, d = 20 mm, Enine delik sayısı a = 2, Boyuna bulon sırası l = 2, P = 120 kN. Önce yalnız l'yi 4 yap. Sonra yeniden sıfırla ve yalnız a'yı 3 yap.",
        observe: "Başta A_n = 1.560 mm², σ_n = 76,923 MPa; bulon başına 30 kN, ortalama kesme 95,493 MPa ve ezilme 150 MPa. l = 4 olduğunda A_n ve σ_n aynı; bulon başına 15 kN, kesme 47,746 MPa, ezilme 75 MPa. Sıfırlama sonrası a = 3 olduğunda A_n = 1.340 mm², σ_n = 89,552 MPa; bulon başına 20 kN, kesme 63,662 MPa ve ezilme 100 MPa.",
        explain: "Boyuna sıra, modelin seçilen enine net alanını değiştirmez. Üçüncü enine delik daha çok bulona yük paylaştırırken levhadan ek alan çıkarır. Hangi düzenin gerçek tasarımda uygun olduğu bu nominal gerilmelerden tek başına çıkmaz; bulon dayanımı, kenar mesafeleri ve kopma biçimleri burada yoktur."
      },
      {
        title: "Boyu ikiye katla, sonra zayıf yönü bağla",
        predict: "Kolon boyu iki katına çıkınca Euler referansı kaçta kaça iner? Tek bir düzlemde ortadan tutmak bunu nasıl değiştirir?",
        do: "Kolon ve yanal bağ sekmesini sıfırla: L = 4 m, n_x = n_y = 1. Kolon boyu L'yi 8 m yap. Ardından yalnız y ekseninde eğilme: eşit panel sayısı n_y menüsünü 2 yap; n_x = 1 kalsın.",
        observe: "L = 4 m'de belirleyici y referansı 834,201 kN. L = 8 m'de 208,55 kN'ye iner. Bu 8 m kolonda n_y = 2 seçilince y referansı yeniden 834,201 kN olur; x referansı 2.736,014 kN olarak kalır. Belirleyici y gerilmesi N_E/A 35,907 MPa'dan 143,63 MPa'ya çıkar; ikisi de 250 MPa'nın altındadır. x yönünün biçimsel Euler gerilmesi ise 471,077 MPa'dır; tablo bu satıra elastik sınır dışında notunu düşer.",
        explain: "L iki katına çıkınca 1/L² dörtte bire iner. n_y = 2, yalnız y eğilmesinin etkin boyunu 8/2 = 4 m yapar. Her iki durumda daha düşük y özdeğeri elastik aralıktadır; yüksek x değerini ayrı bir gerçek kapasite gibi yorumlayamayız."
      },
      {
        title: "Daha çok bağ, modelin dışına çıkarabilir",
        predict: "4 m kolona ortada y ekseni çevresindeki eğilmeyi sınırlayan bağ ekleyince bulunan daha büyük Euler sayısı hâlâ elastik bir sonuç mudur?",
        do: "Kolon ve yanal bağ sekmesini yeniden sıfırla. L = 4 m ve n_x = 1 değerlerini koru, n_y = 2 yap. Küçük Euler özdeğeri ve Bu özdeğerde N_E/A kartlarını, tablodaki Üniform akma referansı A f_y satırını ve durum satırını birlikte oku.",
        observe: "Biçimsel belirleyici değer 3.336,803 kN, N_E/A = 574,518 MPa olur. Narinlik λ_y 117,231'den 58,616'ya iner; eşik 88,9'un altındadır. Gerilme 250 MPa'yı aşar; durum satırı ve tablo elastik sınırın aşıldığını bildirir. Af_y referansı 1.452 kN'dir, ancak sayfa onu bir tasarım kapasitesi olarak sunmaz.",
        explain: "Euler özdeğeri doğrusal elastik varsayımla türetilmiştir. Sonucu büyütmek bu varsayımı garanti etmez. 3.336,803 kN ile 1.452 kN'nin küçüğünü almak da kusurlu, yerel veya elastik olmayan gerçek kolon davranışını çözmez."
      }
    ]
  },
  wow: [
    { title: "Boyutlar iki katı, eğilme gerilmesi sekizde bir", body: "Kesit sekmesini sıfırla; h = 600, b = 300, t_f = 24 ve t_w = 16 mm yap. x yönünde 30 kN·m momenti koru. Bütün uzunluklar iki katına çıktığında alan 4, I 16, W 8 katına çıkar. Gerilme 50,728 MPa'dan 6,341 MPa'ya iner. Bu, kesit ölçeklemesidir; kolon boyunun da değiştiği benzer bir yapının bütün davranışını aynı oranla açıklamaz." },
    { title: "%22 alan kaybı, %28,2 gerilme artışı", body: "Varsayılan bağlantıda iki 22 mm delik, 200 mm genişliğin %22'sini götürür: A_n/A_g = 0,78. Aynı P için net/brüt nominal gerilme oranı 1/0,78 ≈ 1,28205'tir. Alanın yüzde azalması ile gerilmenin yüzde artışı eşit değildir. Bu oran delik kenarındaki gerilme yığılma katsayısı değildir." },
    { title: "Sıfır kuvvette oran sıfır değil, tanımsızdır", body: "Bağlantı sekmesini sıfırlayıp Merkezî çekme kuvveti P'yi 0 yap. Bütün kuvvetler ve gerilmeler sıfır olur; durum metni ise σ_n/σ_g oranının tanımsız olduğunu belirtir: 0/0 hesaplanamaz. Geometrik A_g/A_n oranı hâlâ 1,28205'tir ve pozitif P değerlerinden yaklaşırken gerilme oranının limitini verir; tam sıfırdaki bölümün değeri değildir." }
  ],
  worked: {
    title: "Euler formülü hangi boyda kendi sınırına dayanır?",
    prompt: "Sayfanın sabit kolon kesitinde (h = 300, b = 150, t_f = 12, t_w = 8 mm) A = 58,08 cm² ve I_y = 676,178 cm⁴. E = 200 GPa, f_y = 250 MPa varsayımsal değerleriyle, iki ucu mafsallı ve ara bağsız ideal kolonda y ekseni çevresindeki Euler gerilmesi hangi boyun altında f_y'ye ulaşır? Ortaya tek bir bağ koymak bu boyu nasıl değiştirir? Bulunan boy bir tasarım sınırı değil, elastik modelin geçerlilik eşiğidir.",
    steps: [
      "Eşik narinlik: π²E/λ² = f_y koşulundan λ_s = π√(E/f_y). E/f_y = 200.000 MPa / 250 MPa = 800 olduğundan λ_s = π√800 ≈ 3,1416 · 28,284 ≈ 88,858. Bu sayı yalnız iki malzeme sabitine bağlıdır, kesite bağlı değildir.",
      "Atalet yarıçapı: r_y = √(I_y/A) = √(676,178 cm⁴ / 58,08 cm²) = √(11,642 cm²) ≈ 3,412 cm = 34,12 mm.",
      "Eşik boy: L_s = λ_s·r_y ≈ 88,858 · 34,12 mm ≈ 3.032 mm ≈ 3,03 m. Bağsız kolon bundan kısaysa N_Ey/A, f_y'yi aşar ve Euler sayısı elastik varsayımın dışına düşer.",
      "Sayfada sına: Kolon ve yanal bağ sekmesini sıfırla, Kolon boyu L'yi 3,25 m yap: λ_y = 95,25 ve N_Ey/A = 217,569 MPa. L = 3 m'de λ_y = 87,923 olur, gerilme 255,341 MPa'ya çıkar ve tablo elastik sınır dışında notunu ekler. Eşik, iki kaydırıcı adımının arasındadır.",
      "Ortada bağ (n_y = 2): etkin boy L/2 olduğundan eşik boy iki katına, yaklaşık 6,06 m'ye çıkar. Sayfada L = 6,25 m'de 235,323 MPa, L = 6 m'de yine 255,341 MPa okunur. x ekseni için r_x = 123,586 mm ve eşik boy ≈ 10,98 m'dir; kaydırıcı 8 m'de bittiğinden x yönünün Euler değeri bu sayfada hep biçimsel kalır."
    ],
    result: "λ_s ≈ 88,9; bağsız kolonda L_s ≈ 3,03 m, ortadan bağlı kolonda ≈ 6,06 m. Bağ eklemek Euler sayısını büyütür, ama aynı anda kolonu Euler modelinin geçerli olmadığı küt bölgeye doğru iter; eşiğin altında gereken şey elastik olmayan burkulma modelidir, daha büyük bir Euler sayısı değil."
  },
  misconceptions: [
    { myth: "Kesit alanları aynıysa eğilmeleri de aynıdır.", truth: "Eğilme rijitliğinde EI, en büyük elastik gerilmede W = I/c gerekir. Alanın eksene göre dağılımı ve eksen seçimi önemlidir; tek başına A yeterli değildir." },
    { myth: "Bulon sayısını artırmak bağlantıyı her açıdan iyileştirir.", truth: "Eşit paylaşım modelinde bulon kuvveti azalır. Enine ek delikler net alanı da azaltır; nominal levha gerilmesi büyüyebilir. Gerçek bağlantı için ayrıca birçok dayanım ve detaylandırma kontrolü gerekir." },
    { myth: "Gerilme akmanın altındaysa eleman güvenlidir.", truth: "Bu karşılaştırma yalnız bir malzeme sınırını denetler. Yanal, yerel veya burulmalı kararsızlık; bağlantı göçmesi ve diğer etkiler ayrı sorulardır. Sayfa yapı güvenliği kararı vermez." },
    { myth: "Euler yükü akma yükünü aşınca küçük olanı seçmek yeterlidir.", truth: "Akma referansını aşan Euler sonucu elastik varsayımın dışındadır. min(N_E, Af_y) almak kusur, artık gerilme veya elastik olmayan burkulma hesabının yerini tutmaz." }
  ],
  glossary: [
    { term: "Alanın ikinci momenti I", definition: "Alan elemanlarının seçilen eksene uzaklığının karesiyle ağırlıklandırılmış integrali; birimi m⁴." },
    { term: "Kesit modülü W", definition: "I'nın en uzak lif mesafesine bölümü; elastik en büyük gerilme |M|/W'dir, W birimi m³." },
    { term: "Brüt ve net alan", definition: "Brüt alan delikler çıkarılmadan, net alan seçilen kesitteki delik kayıpları çıkarılarak hesaplanan alandır." },
    { term: "Nominal gerilme", definition: "Seçilen kuvvetin ideal hesap alanına bölümünden gelen ortalama/referans değer; yerel tepe gerilmesi olmak zorunda değildir." },
    { term: "Ezilme gerilmesi", definition: "Bu modelde bulon kuvvetinin levha kalınlığı ile bulon çapının çarpımı olan td izdüşüm alanına bölümü." },
    { term: "Narinlik λ", definition: "Bir eğilme ekseni için etkin boyun atalet yarıçapına oranı L_e/√(I/A); boyutsuzdur." },
    { term: "Yanal bağ", definition: "Belirli bir doğrultudaki yanal hareketi kısıtlayan eleman; burada ideal öteleme kısıtı veya geometrik bağ yeri olarak temsil edilir." },
    { term: "Euler özdeğeri", definition: "İdeal doğrusal elastik kolonda düz denge biçiminin yanında eğilmiş bir denge biçiminin de mümkün olduğu en küçük basınç yükü." }
  ],
  bridge: {
    heading: "Kesit integralinden kararlılık özdeğerine",
    body: [
      "Mukavemette eğrilik κ ile boyuna birim uzama ε = −κy arasında bağ kurulur. Hooke bağıntısı σ = Eε ve iç momentin alan integrali bir araya gelince, seçilen işaret düzenine göre büyüklük olarak M = EIκ elde edilir: I = ∫y²dA bu yüzden ortaya çıkar. Gerilmenin en dış lifteki değerine gitmek I/c kesit modülünü doğurur. Malzemenin E değeri rijitliği, f_y ise elastik kabul için verilen sınırı temsil eder; iki sabiti birbirinin yerine kullanamazsın.",
      "Kolon hesabı bir özdeğer problemine dönüşür. Mafsallı ideal kolonda u(z) = C sin(πz/L) biçimini EIu″ + Nu = 0 denklemine koy: N = π²EI/L² çıkar. C'nin bu doğrusal denklemde belirlenmemesi, çizilen eğrinin genliğinin neden gerçek deplasman olmadığına işaret eder. Eşit aralıklı ideal bağlar için sin(nπz/L) modu bağlarda sıfırdır ve n² çarpanını verir. Gerçek bağ esnekliği, başlangıç eğriliği ve elastik olmayan malzeme eklendiğinde farklı bir sınır değer problemi çözmek gerekir."
    ],
    topics: ["Mukavemet: eğilme ve kesit integralleri", "Yapı statiği: yük aktarımı", "Diferansiyel denklemler: sınır değer ve özdeğer", "Yapı kararlılığı: elastik ve elastik olmayan burkulma", "Çelik Yapılar: eleman ve birleşim tasarımı"]
  },
  quiz: [
    { question: "Varsayılan bağlantıda yalnız boyuna sıra l, 2'den 4'e çıkarılıyor. Eşit yük paylaşımı modelinde ne olur?", options: ["Net alan yarıya iner.", "Bulon kuvveti yarıya iner, nominal net levha gerilmesi değişmez.", "Net levha gerilmesi de yarıya iner.", "Gerçek bağlantının tüm dayanımları iki katına çıkar."], answer: 1, explanation: "Enine a ve delik çapı sabit: A_n değişmez. n = al iki katına çıktığı için P/n yarıya iner. Bu, gerçek göçme dayanımlarının hesabı değildir." },
    { question: "İdeal kolonun kesiti, E değeri ve iki yöndeki panel sayıları sabitken boyu iki katına çıkıyor. İki Euler referansı nasıl değişir?", options: ["İkisi de yarıya iner.", "Yalnız zayıf yön değişir.", "İkisi de dörtte bire iner.", "İkisi de dört katına çıkar."], answer: 2, explanation: "Her iki yönde L_e = L/n iki katına çıkar; π²EI/L_e² dörtte bire iner. Narinlik de iki katına çıktığı için Euler gerilmesi düşer; sonuç elastik aralığa yaklaşır, ama bu kolonun daha dayanıklı olduğu anlamına gelmez." },
    { question: "Kirişte M/W < f_y bulundu ve ara yanal bağ sayısı artırıldı. Sayfanın bu sonucu neyi gösterir?", options: ["Seçilen momentte elastik kesit gerilmesi referansı sınırın altında; yanal burulmalı kapasite henüz hesaplanmadı.", "Bütün burkulma biçimleri önlendi.", "Bulon bağlantısı da yeterlidir.", "Kesitin W değeri bağ sayısıyla büyüdü."], answer: 0, explanation: "Bağ sayısı kesit geometrisini değiştirmez. Yanal burulmalı kararlılık, yerel burkulma ve bağlantı denetimleri M/W karşılaştırmasından çıkmaz." }
  ],
  next: [
    { href: "mukavemet.html", title: "Mukavemet", why: "Gerilme–birim uzama, kiriş kesme/moment/sehim ve Euler kolonunun temel modellerini karşılaştır." },
    { href: "statik.html", title: "Statik: Yük, Mesnet ve Denge", why: "Kesit hesabından önce dış yüklerin mesnet tepkilerine ve iç kuvvetlere nasıl dönüştüğünü incele." },
    { href: "tork-denge.html", title: "Tork ve Denge", why: "Momentin kuvvet koluyla bağını ve farklı kuvvetlerin dönme dengesini yeniden kur." }
  ],
  sources: [
    { title: "MIT OCW 2.002 · David M. Parks, Euler–Bernoulli Beams: Bending, Buckling, and Vibration (2004)", url: "https://ocw.mit.edu/courses/2-002-mechanics-and-materials-ii-spring-2004/bc25a56b5a91ad29ca5c7419616686f7_lec2.pdf", note: "9 Şubat 2004 tarihli, 16 sayfalık ders notu: doğrusal birim uzama dağılımı ve moment–eğrilik bağı (s. 4–5), Euler kolon burkulması ve sınır koşullarının etkisi (s. 11–13)." },
    { title: "SCI / BCSA · Member design", url: "https://steelconstruction.info/topics/design/member-design/", note: "Kesit sınıflandırması, brüt/net kesit, kesit direnci, eğilmeli burkulma ve yanal burulmalı burkulma ayrı başlıklarda. Kaynaktaki gerçek tasarım yöntemlerinin kapsamı bu ideal laboratuvardan çok geniştir; buradan hiçbir tasarım değeri alınmadı." },
    { title: "SCI / BCSA · Simple connections", url: "https://steelconstruction.info/topics/design/simple-connections/", note: "Birleşimde yük yolunun belirlenmesi, standart detaylandırma ve eksantriklikler. İdeal eşit bulon paylaşımının gerçek birleşim denetimlerinin yalnız küçük bir parçası olduğunu gösteren bağlam." },
    { title: "Wikipedia · Euler's critical load", url: "https://en.wikipedia.org/wiki/Euler%27s_critical_load", note: "Formülün Euler tarafından 1744'te türetildiği bilgisi ve etkin boy kavramı." }
  ],
  revision: "Kasım 2026"
};
