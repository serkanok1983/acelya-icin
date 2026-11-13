window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["koch-kar-tanesi"] = {
  slug: "koch-kar-tanesi",
  title: "Koch Kar Tanesi: Alan ve Sınır",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 30,
  tagline: "Her adımda sınırı uzat, eklenen alanı küçült. Koch yapımı, sonsuz çevreyle sonlu alanın nasıl bir arada bulunabildiğini ve ölçüm ölçeğinin neden önemli olduğunu gösterir.",
  hook: "Kenarları 9 cm olan bir üçgenin çevresi 27 cm. Her kenarın ortasına küçük bir üçgen çıkıntısı eklediğinde çevre 36 cm'ye, aynı işlemi tekrarladığında 48 cm'ye çıkıyor. Bunu sonsuza kadar sürdürürsen sınırın uzunluğu sınırsız büyürken içerideki alan neden 56,12 cm²'yi bile geçmiyor?",
  bigIdea: "Koch kar tanesinde <strong>uzunluğu artıran oran 4/3, ardışık alan katkılarını küçülten oran 4/9'dur</strong>; bu iki ayrı geometrik dizi, sonsuz uzunluk ile sonlu alanı aynı yapıda buluşturur.",
  story: [
    "1904'te İsveçli matematikçi Helge von Koch, sürekli olduğu hâlde hiçbir noktasında teğeti bulunmayan bir eğriyi temel geometriyle kurdu. Weierstrass'ın sürekli fakat hiçbir yerde türevlenmeyen fonksiyonu analizdeki sezgileri zaten sarsmıştı; Koch'un inşası, düzgün bir çizginin özelliklerini her sürekli eğriye aktaramayacağımızı çizerek görünür kıldı. Kar tanesi adı bir benzetmedir: burada buz kristalinin büyümesini modellemiyoruz.",
    "Kuralı uygulamak için bir doğru parçasını üçe böl. Ortadaki üçte birlik kısmı kaldır; onun yerine eşkenar bir üçgenin öteki iki kenarını koy. Böylece bir parçanın yerini, her biri onun üçte biri uzunluğunda dört parça alır. Tek doğru parçasından başlarsan açık <strong>Koch eğrisini</strong>; eşkenar üçgenin üç kenarında çıkıntıları dışarı doğru kurarsan kapalı <strong>Koch kar tanesini</strong> elde edersin.",
    "Ekrandaki her çizim sonlu sayıda doğru parçasından oluşur. İdeal eğri ise hiçbir adımda durmayan yapımın limitidir. Bu ayrım, fraktal bir şeklin resmine bakmaktan daha fazlasını sağlar: hangi niceliğin yakınsadığını, hangisinin büyümeyi sürdürdüğünü ve bilgisayardaki ölçümün ne zaman yalnızca sonlu çizimi anlattığını sorabiliriz.",
  ],
  core: [
    {
      heading: "Dört parça, üçte bir ölçek",
      body: "Başlangıç üçgenini n = 0 sayalım ve kenarına a diyelim. Her adımda parça sayısı dört katına, tek parçanın uzunluğu üçte birine iner. Toplam uzunluk bunların çarpımı olduğundan 4/3 katına çıkar. n büyüdükçe her parça küçülür; buna rağmen toplamları sınırsız büyür. Açık eğri tek kenardan başladığı için onun sayısı ve uzunluğu, kapalı kar tanesinin üçte biridir.",
      formula: "Nₙ = 3·4ⁿ<br>ℓₙ = a/3ⁿ<br>Lₙ = Nₙℓₙ = 3a(4/3)ⁿ",
      formulaNote: "Açık eğride N ve L bağıntılarındaki baştaki 3 çarpanı kalkar; tek parçanın uzunluğu ℓ değişmez. N bir sayı, ℓ ve L uzunluktur.",
    },
    {
      heading: "Alan neden taşmıyor?",
      body: "Başlangıç alanı A₀ = √3a²/4'tür. j. adımda 3·4ʲ⁻¹ yeni üçgen eklenir; her birinin alanı A₀/9ʲ olur. Dolayısıyla eklenen toplam alan ΔAⱼ = (A₀/3)(4/9)ʲ⁻¹'dir. Bu katkıları toplarken oranı 1'den küçük bir geometrik seri elde ederiz. Çevredeki 4/3 büyümesiyle alan katkısındaki 4/9 küçülmesi farklı işlemlerin sonucudur.",
      formula: "Aₙ = A₀[1 + (1/3)∑<sub>j=0</sub><sup>n−1</sup>(4/9)ʲ]<br>Aₙ = A₀[8/5 − (3/5)(4/9)ⁿ]<br>A∞ = (8/5)A₀",
      formulaNote: "n = 0 için toplam boştur ve Aₙ = A₀. Sonlu toplam özdeşliği ∑ⱼ₌₀ⁿ⁻¹qʲ = (1−qⁿ)/(1−q), alan bağıntısını verir; n → ∞ iken qⁿ → 0.",
    },
    {
      heading: "Bağıntıyı geometriden denetle",
      body: "İlk sekme köşeleri gerçekten üretir; komşu köşeler arasındaki uzaklıkları toplar ve kapalı çokgenin alanını köşe koordinatlarından hesaplar. Kartlardaki ilk sayı bu hesap, ikinci sayı yukarıdaki bağıntıdır. Aralarındaki küçük fark, kayan noktalı sayıların yuvarlanmasından doğar. Çizim ekrana sığdırıldığı için ekrandaki piksel uzunluğu santimetre ölçeği değildir.",
      formula: "L = ∑ᵢ √[(xᵢ₊₁−xᵢ)² + (yᵢ₊₁−yᵢ)²]<br>A = ½|∑ᵢ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|",
      formulaNote: "Alan bağıntısı, sınırı sırayla izleyen ve kendini kesmeyen kapalı çokgen içindir; son köşeden ilkine dönüş de toplama katılır. Bu sayfadaki açık eğri bir bölgeyi kapatmaz.",
    },
    {
      heading: "Boyut, ölçeğe verilen cevaptır",
      body: "Limitteki bir Koch eğrisi, kendisinin 1/3 ölçeğine küçültülmüş dört kopyasından oluşur. Uzunluk için kullanılan 1 üssü yerine hangi D üssü bu dört kopyayı dengeler? 4(1/3)ᴰ = 1 denklemi D = log 4/log 3 verir. Bu, kendine benzerlik boyutudur; standart Koch yapısında Hausdorff boyutuyla da aynıdır. Genel bir şekil için yalnız kopya saymak böyle bir eşitliği kanıtlamaz; kopyaların örtüşme koşulları da önemlidir.",
      formula: "D = log 4 / log 3 ≈ 1,26186",
      formulaNote: "D birimsizdir ve limitteki sınıra aittir. Kar tanesinin doldurulmuş bölgesinin boyutu 2, herhangi bir sonlu yapımın kırık çizgisinin boyutu 1'dir.",
    },
    {
      heading: "Sonlu çizimde ayrıntı bir yerde biter",
      body: "Üçüncü sekme n adımlık açık eğriyi sabit tutar, ölçüm adımı m'yi değiştirir. m ≤ n iken cetvel yapımın köşelerine hizalanır; m > n olduğunda var olan düz parçalar üçe bölünür. Yeni çıkıntı üretilmez. Bu nedenle parça sayısının ölçekler arasındaki artışı önce 4, ardından 3 katına iner. Bu deney kutu sayımı veya serbest bir pergel ölçümü değildir; tek bir görüntüden Hausdorff boyutu çıkardığını da iddia etmez.",
      formula: "ε = a/3ᵐ<br>Nₘ = 4<sup>min(n,m)</sup>·3<sup>max(m−n,0)</sup><br>Dₘ = log(Nₘ/Nₘ₋₁)/log 3",
      formulaNote: "1 ≤ m ≤ n için Dₘ = log 4/log 3; m > n için Dₘ = 1. m = 0'da önceki ölçüm olmadığından Dₘ tanımsızdır. Bu sekmede a = 9 cm sabittir.",
    },
  ],
  lab: {
    intro: "Üç sekmenin ayarları bağımsızdır. <strong>Yap ve ölç</strong> gerçek köşelerden uzunluk ve alan hesaplar; <strong>Limite yaklaş</strong> büyük n için yalnız bağıntıları değerlendirir; <strong>Ölçeği değiştir</strong> sabit bir açık eğrinin ölçümünü inceltir. Her sekmenin kendi sıfırlama düğmesi vardır. Değerleri kartlardan ve açılır sayısal tablolardan okuyabilirsin.",
    experiments: [
      {
        title: "Küçülen parçaların büyüyen toplamı",
        predict: "Parça uzunluğu üçte bire inerken parça sayısı dört katına çıkarsa toplam uzunluk azalabilir mi? Alan da her adımda aynı oranda mı büyür?",
        do: "Yap ve ölç sekmesinde Yapımı sıfırla'ya bas. Başlangıç kenarı a = 9 cm kalsın. Yapım adımı n'yi 0 yap; Bir adım ekle düğmesiyle 1'e ve 2'ye ilerle. Önceki adımı da göster seçeneğini açık tut; köşelerden hesaplanan sayıyı yanındaki bağıntıyla karşılaştır.",
        observe: "Parça sayıları 3 → 12 → 48; tek parça uzunlukları 9 → 3 → 1 cm; çevreler 27 → 36 → 48 cm olur. Alanlar sırasıyla 35,0740 → 46,7654 → 51,9615 cm²'dir. Köşe hesabı ve bağıntı, gösterilen basamaklarda örtüşür. İkinci alan artışı birincinin 4/9'udur.",
        explain: "Çevrenin çarpanı her adımda 4/3'tür. Toplam alanın çarpanı sabit değildir; 4/9 oranı toplam alanları değil, art arda eklenen alanları birbirine bağlar.",
      },
      {
        title: "Büyütmek ile yeni ayrıntı eklemek",
        predict: "n = 2 sabitken a'yı iki katına çıkarmak kaç yeni parça üretir? Aynı kuralı tek bir kenara uyguladığında kapalı alan hâlâ tanımlı mıdır?",
        do: "Yapımı sıfırla ile n = 2, a = 9 cm'ye dön. Başlangıç kenarı a'yı 18 cm yap. Sonra a'yı yeniden 9 cm'ye getir ve Başlangıç şekli menüsünden Tek doğru parçası → Koch eğrisi seç.",
        observe: "18 cm'lik üçgende parça sayısı yine 48'dir; çevre 96,0000 cm, alan 207,8461 cm² olur. a = 9 cm'lik açık eğride 16 parça ve 16,0000 cm uzunluk görürsün; alan kartı Tanımlanmadı yazar. Otomatik sığdırma nedeniyle şeklin ekrandaki boyu aynı kalabilir.",
        explain: "Ölçekleme uzunlukları iki, alanları dört katına çıkarır; n değişmediği için parça sayısını değiştirmez. Açık eğri, kapalı kar tanesinin üç kenarından yalnız birine karşılık gelir ve tek başına bir iç bölge belirlemez.",
      },
      {
        title: "Alanın binde birine ulaşmak",
        predict: "Eksik alan limit alanının %0,1'inin altına indiğinde çevre de başlangıç değerine yakın kalmış olur mu?",
        do: "Limite yaklaş sekmesinde Limit hesabını sıfırla'ya bas. Eksik alan için üst sınır menüsünde Limit alanının %0,1'i seçiliyken Hedef adımına git'e bas. Sonra Hesap adımı n'yi bir azaltıp sonucu karşılaştır.",
        observe: "Hedef n = 8'dir: alan oranı 1,599087, eksik kısım %0,05709146, çevre oranı 9,988721 ve teorik parça sayısı 196.608 olur. n = 7'de eksik kısım %0,12845578 olduğundan hedef henüz sağlanmaz. Üst grafiğin ekseni doğrusal, alt grafiğinki çevre oranının log₁₀ değeridir.",
        explain: "Hata, başlangıç alanına değil limit alanına bölünür: (A∞−Aₙ)/A∞ = (3/8)(4/9)ⁿ. Alanın yakınsaması, çevrenin yakınsaması değildir; n = 8'de çevre başlangıcın yaklaşık on katına çıkmıştır ve büyümeyi sürdürür.",
      },
      {
        title: "Daha ince cetvel ne zaman yeni uzunluk bulamaz?",
        predict: "n = 4'te durdurulmuş eğriyi daha küçük parçalarla ölçmek, uzunluğunu sonsuza kadar artırır mı?",
        do: "Ölçeği değiştir sekmesinde Ölçümü sıfırla'ya bas: Çizilmiş eğrinin adımı n = 4, Ölçüm adımı m = 3 olur. m'yi 4 yap; ardından En küçük parçanın altına in düğmesine basarak m = 5'e geç.",
        observe: "m = 3 → 4 → 5 için parça sayısı 64 → 256 → 768; ölçülen uzunluk 21,3333 → 28,4444 → 28,4444 cm; her ölçümü bir öncekiyle karşılaştıran Dₘ üssü 1,26186 → 1,26186 → 1,00000 olur. Eğrinin tam uzunluğu üç durumda da 28,4444 cm'dir. m = 5'te ε = 1/27 cm'dir.",
        explain: "m = 4 çizilmiş bütün ayrıntıları yakalar. Sonraki adım, her düz parçayı üçe böler: sayı üç katına, parça uzunluğu üçte birine gider ve toplam değişmez. Sonsuz limit eğrisinde ise son bir ayrıntı ölçeği yoktur.",
      },
    ],
  },
  wow: [
    {
      title: "İlk çıkıntılar, eklenecek alanın yarısından fazlası",
      body: "İlk adımda eklenen alan A₀/3, bütün sonsuz yapımda eklenecek alan ise 3A₀/5'tir. Oranları 5/9 ≈ %55,56 eder. Daha ilk üç çıkıntı, bundan sonra eklenecek tüm alanla birlikte düşünüldüğünde toplam ek alanın yarısından fazlasını sağlar.",
    },
    {
      title: "Bir resimde üç farklı boyut",
      body: "Sonlu adımda çizilmiş çizginin Hausdorff boyutu 1, ideal Koch sınırınınki log 4/log 3 ≈ 1,26186, doldurulmuş kar tanesinin boyutu 2'dir. Bunlar aynı nesneye verilmiş çelişkili etiketler değildir: sonlu yaklaşım, limit sınırı ve içi dolu bölge ayrı kümelerdir.",
    },
    {
      title: "16. adım: yaklaşık 12,9 milyar parça",
      body: "3·4¹⁶ = 12.884.901.888 doğru parçası gerekir; bu yüzden limit sekmesi bunların hepsini çizmez. Bu adımda alanın limitten eksiği yalnız yaklaşık %0,00008692 iken çevre başlangıcın yaklaşık 99,77 katıdır. Bir niceliği çok iyi yaklaştırmak, bütün nicelikleri iyi yaklaştırmak anlamına gelmez.",
    },
  ],
  worked: {
    title: "İstenen alan hatasına kaç adım yeter?",
    prompt: "Başlangıç kenarı a = 9 cm olan kapalı Koch kar tanesinde eksik alanın, limit alanının en fazla %0,1'i olmasını istiyoruz. En küçük n'yi, bu adımdaki alanı ve çevreyi bul. Sonuçları limit sekmesindeki hedef hesabıyla karşılaştır.",
    steps: [
      "Önce ölçeği belirle: A₀ = √3(9 cm)²/4 ≈ 35,0740 cm², A∞ = (8/5)A₀ ≈ 56,1184 cm² ve L₀ = 3a = 27 cm. %0,1, bir oran olarak 0,001'dir.",
      "Kalan alanı limit alanına böl: (A∞−Aₙ)/A∞ = (3/8)(4/9)ⁿ ≤ 0,001. Buradan (4/9)ⁿ ≤ (8/3)·0,001 çıkar. Her iki taraf da birimsizdir; logaritma alabiliriz.",
      "ln(4/9) negatif olduğundan ona bölerken eşitsizlik yön değiştirir: n ≥ ln[(8/3)·0,001]/ln(4/9) ≈ 7,3088. n bir tam sayı olduğundan en küçük uygun adım n = 8'dir; 7'ye yuvarlanamaz.",
      "n = 8'i bağıntılara yerleştir: A₈ ≈ 56,0864 cm²; L₈ = 27 cm·(4/3)⁸ ≈ 269,6955 cm; N₈ = 3·4⁸ = 196.608. Eksik alan yaklaşık 0,03204 cm², limit alanına oranı yaklaşık %0,05709146'dır.",
      "Limite yaklaş sekmesinde %0,1 hedefini seçip Hedef adımına git'e bas: n = 8 çıkar. Bu sekme boyutsuz oranlar verir; çevre oranı 9,988721'i başlangıç çevresi 27 cm ile çarparak yaklaşık 269,6955 cm sonucunu elde edersin. n = 7'deki %0,12845578 hedefi aşar.",
    ],
    result: "Sekiz adım alan için istenen binde birlik sınırı sağlar. Alan yaklaşık 56,0864 cm², çevre yaklaşık 269,6955 cm'dir; daha küçük alan hatası istemek sonlu bir çevre limitine yaklaşmak değildir.",
  },
  misconceptions: [
    {
      myth: "Sonlu alanı çevreleyen sınırın uzunluğu da sonlu olmalıdır.",
      truth: "Alan ve uzunluk farklı ölçülerdir. Koch yapımında alan katkıları 4/9 oranıyla küçülürken sınır uzunluğu her adımda 4/3 katına çıkar. Alan 8A₀/5'e yaklaşır; çevrenin sonlu limiti yoktur.",
    },
    {
      myth: "Ekrandaki her Koch çizgisinin boyutu tam olarak 1,26186'dır.",
      truth: "Ekranın gösterdiği sonlu kırık çizgi yeterince küçük ölçekte doğru parçalarından oluşur ve boyutu 1'dir. 1,26186 sayısı ideal limit eğrisine aittir; ölçüm sekmesindeki Dₘ ise yalnız ardışık iki ölçekteki sayım üssüdür.",
    },
    {
      myth: "Açık Koch eğrisinin alan kutusunda 0 yazmalı.",
      truth: "Bu kutu bir sınırın kapattığı bölgenin alanını sorar. Açık eğri tek başına böyle bir bölge tanımlamadığı için Tanımlanmadı yazar. Eğrinin düzlemde kapladığı alanın ölçüsü, kapalı bir bölgenin alanını hesaplamaktan başka bir sorudur.",
    },
    {
      myth: "Daha küçük ölçüm parçası her zaman daha uzun bir sonuç verir.",
      truth: "Bu artış, ölçüm henüz çizilmiş ayrıntıları atladığı sürece görülür. Sonlu eğrinin bütün parçaları çözüldükten sonra onları yeniden bölmek toplam uzunluğu değiştirmez; sayfadaki m > n durumu bunu gösterir.",
    },
  ],
  glossary: [
    { term: "İterasyon", definition: "Aynı yapım kuralının bir kez uygulanması; bu sayfada başlangıç şekli n = 0'dır." },
    { term: "Kendine benzerlik", definition: "Bir kümenin, kendisinin ölçeklenmiş kopyalarından oluşması; ideal Koch eğrisinde dört kopyanın her biri 1/3 ölçeğindedir." },
    { term: "Geometrik seri", definition: "Ardışık terimleri sabit bir oranla değişen toplam; oranının mutlak değeri 1'den küçükse sonsuz toplam yakınsar." },
    { term: "Limit", definition: "Bir dizinin terimlerinin istenen her pozitif hata payı içinde sonunda kalabildiği değer; her dizinin sonlu limiti yoktur." },
    { term: "Yay uzunluğu", definition: "Eğri üzerindeki sıralı noktaları birleştiren kırık çizgilerin uzunluklarının üst sınırı; bu üst sınır sonsuz olabilir." },
    { term: "Kendine benzerlik boyutu", definition: "Eş ölçekli k kopyadan oluşan yapıda k·rᴰ = 1 denklemini sağlayan D üssü; r küçültme oranıdır." },
    { term: "Hausdorff boyutu", definition: "Bir kümeyi giderek küçük kümelerle örterken örtü çaplarının s. kuvvetleri toplamının sonsuzdan sıfıra geçtiği kritik s değeri." },
    { term: "Son ayrıntı ölçeği", definition: "Sonlu yapımın en küçük parça uzunluğu; daha küçük ölçekte yeni Koch çıkıntıları bulunmaz." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Kalkülüs II</strong>'de alan hesabı geometrik seriler ve kalan terim tahminleriyle buluşur. Yalnız A∞ değerini bilmek yetmez; istenen doğruluğu sağlayan en küçük n'yi de hesaplamak gerekir. <strong>Gerçel Analiz</strong>'de ise yakınsamanın hangi özelliği koruduğu sorulur: şekiller birbirine yaklaşırken uzunlukları sınırsız büyüyebilir. Sonsuz uzunluk, resimde sayılamayan piksellerden değil, ideal eğrinin bütün ölçeklerde taşıdığı yapımdan çıkar.",
      "<strong>Fraktal Geometri</strong>'de benzerlik boyutu ile Hausdorff boyutunun hangi koşullarda eşleştiği incelenir. <strong>Sayısal Analiz</strong>'de sonlu çözünürlük ve hata bütçesi öne çıkar. Açık ideal eğri için ε/a = 3⁻ᵐ ölçeklerinde N = (a/ε)ᴰ ve L(ε)/a = (ε/a)¹⁻ᴰ olur: log[L(ε)/a] değerini log(a/ε)'ye karşı çizdiğinde eğim D−1'dir. Sayfadaki grafik uzunluğu değil parça sayısını kullandığından eğimi D verir; n'de durdurulan çizimde bu ilişki m > n için sona erer.",
    ],
    topics: ["Geometrik seriler", "Kalan terim ve hata sınırı", "Yay uzunluğu", "Kendine benzer kümeler", "Hausdorff boyutu", "Sonlu çözünürlük"],
  },
  quiz: [
    {
      question: "Kapalı kar tanesinde n sabitken başlangıç kenarı a iki katına çıkarılırsa ne olur?",
      options: ["Parça sayısı, çevre ve alan iki katına çıkar.", "Parça sayısı değişmez; çevre iki, alan dört katına çıkar.", "Parça sayısı dört katına çıkar; çevre değişmez.", "Boyut iki katına çıkar; alan değişmez."],
      answer: 1,
      explanation: "Nₙ = 3·4ⁿ yalnız n'ye bağlıdır. Lₙ, a ile; Aₙ, a² ile orantılıdır. Şekli ölçeklemek yeni ayrıntı üretmez ve boyutunu değiştirmez.",
    },
    {
      question: "n = 4'te durdurulmuş açık eğri için m = 4'ten m = 5'e geçiliyor. Sayfanın hizalı cetveli ne bulur?",
      options: ["Parça sayısı dört katına, toplam uzunluk 4/3 katına çıkar.", "Parça sayısı ve toplam uzunluk değişmez.", "Parça sayısı üç katına çıkar; toplam uzunluk aynı kalır ve D₅ = 1 olur.", "D₅ = 2 olur, çünkü parçalar artık düzlemde görünmez."],
      answer: 2,
      explanation: "Çizimde yeni tepe eklenmez; 256 düz parçanın her biri üçe bölünerek 768 parça olur. ε üçte bire iner, Nε sabit kalır. log(768/256)/log 3 = 1'dir.",
    },
    {
      question: "n = 7'de limit alanına göre eksik kısım %0,12845578, n = 8'de %0,05709146. En fazla %0,1 hata hedefi ve çevre için hangi çıkarım geçerli?",
      options: ["En küçük uygun adım 8'dir; alan yakın olsa da çevre büyümeyi sürdürür.", "En küçük uygun adım 7'dir; çünkü %0,12845578 küçük bir sayıdır.", "8. adımda çevre de limitinin %0,1 yakınına gelir.", "Alan hatası küçülüyorsa parça sayısı da küçülmelidir."],
      answer: 0,
      explanation: "7. adım hedefi aşar, 8. adım sağlar; kalan alan her adımda 4/9 oranıyla küçüldüğü için daha erken bir adım da yetmez. Çevrenin sonlu bir limiti olmadığından onun için aynı yakınlık iddiası kurulamaz.",
    },
  ],
  next: [
    { href: "integral.html", title: "İntegral: Birikim, Temel Teorem ve Uygulamalar", why: "Alanı sonlu toplamlarla yaklaştırıp limite götürmenin başka bir yolunu incele." },
    { href: "hilbert-egrisi.html", title: "Hilbert Eğrisi", why: "Sonlu çizim ile limit nesnesini ayır; bir sürekli eğrinin kareyi doldurmasıyla karşılaştır." },
    { href: "julia-fraktali.html", title: "Julia Fraktalı", why: "Geometrik yerine cebirsel bir yineleme kullan; sonlu hesapla limit kümesi arasındaki ayrımı sürdür." },
  ],
  sources: [
    { title: "OpenStax · Calculus Volume 2, §5.2 Infinite Series", url: "https://openstax.org/books/calculus-volume-2/pages/5-2-infinite-series", note: "Koch kar tanesinin alanını geometrik seriyle hesaplayan bölüm; sonsuz çevre ile sonlu alanın birlikte oluşumu." },
    { title: "MIT · Mathematics for Computer Science, Problem 5.12", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/mit6_042js15_textbook.pdf", note: "Lehman, Leighton ve Meyer'in açık ders kitabı: n = 0'dan başlayan Koch yapımı ve alan bağıntısının tümevarımla doğrulanması (basılı s. 150)." },
    { title: "Erin Pearse · An Introduction to Dimension Theory and Fractal Geometry", url: "https://pi.math.cornell.edu/~erin/docs/dimension.pdf", note: "Cornell'deki ders notları; özellikle §4, Koch eğrisinin dört kopyası ve log 4/log 3 boyutu. Uzunluk ölçeğinin üssüyle parça sayısının üssünü ayırır." },
    { title: "MacTutor · Helge von Koch", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Koch/", note: "St Andrews Üniversitesi: O'Connor ve Robertson'ın biyografisi; 1904 tarihli eğri, geometrik yapım ve 1906'daki teğet incelemesi." },
  ],
  revision: "Kasım 2026",
};
