window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["dna-replikasyon"] = {
  slug: "dna-replikasyon",
  title: "DNA Replikasyonu: Kendi Kalıbını Taşıyan Molekül",
  field: "Biyoloji",
  level: "Lise",
  minutes: 30,
  tagline:
    "Her hücre bölünmesinden önce iki metre DNA harf harf kopyalanır; hata payı milyarda bir. Sırrı 1953'te tek bir cümleyle sezildi: çift sarmalın her ipliği, ötekinin kalıbıdır.",
  hook:
    "25 Nisan 1953'te Nature dergisinde çıkan bir sayfalık makalenin sonunda, neredeyse fısıltıyla söylenmiş bir cümle vardı: \"Önerdiğimiz özgül eşleşmenin, genetik malzeme için olası bir kopyalama mekanizmasını hemen akla getirdiği gözümüzden kaçmadı.\" Bir molekül nasıl olur da kendi kendinin kalıbı olabilir?",
  bigIdea:
    "DNA'nın iki ipliği birbirinin <strong>tamamlayıcısıdır</strong>; sarmal açılınca her eski iplik yeni bir ipliğe kalıp olur ve ortaya çıkan iki molekülün her biri bir eski, bir yeni iplik taşır: <em>yarı korunumlu</em> kopyalama.",
  story: [
    "1950'de Erwin Chargaff, hangi canlıdan alırsa alsın DNA'da adenin miktarının timine, guaninin sitozine eşit olduğunu ölçtü; ama bunun ne anlama geldiğini kimse bilmiyordu. 1952'de Londra King's College'da Rosalind Franklin ve öğrencisi Raymond Gosling, DNA liflerinden X-ışını kırınım görüntüleri aldı; sonradan \"51 numaralı fotoğraf\" diye ünlenen kare, molekülün sarmal olduğunu ve boyutlarını ele veriyordu. Cambridge'de James Watson ve Francis Crick bu ipuçlarını kartondan baz modelleriyle birleştirdi: A her zaman T ile, G her zaman C ile hidrojen bağı kurarsa iki iplik birbirine tam oturuyordu. Chargaff'ın oranları artık bir sayı değil, bir <strong>yapı</strong>ydı. Makalenin son cümlesi de buradan doğdu: iplikler birbirinin tamamlayıcısıysa, ayrıldıklarında her biri ötekini yeniden kurabilir.",
    "Fikir güzeldi ama kanıt değildi; üstelik üç rakip senaryo vardı. <strong>Korunumlu</strong> modelde eski molekül olduğu gibi kalır, yanına yepyeni bir molekül yapılır. <strong>Yarı korunumlu</strong> modelde her yeni molekül bir eski, bir yeni iplik taşır. <strong>Dağılımlı</strong> modelde eski ve yeni parçalar her iplikte karışık durur. 1958'de Matthew Meselson ve Franklin Stahl, Caltech'te bu üçünü tek deneyle ayırdı. <em>E. coli</em> bakterilerini nesiller boyu ağır azot (¹⁵N) içeren besiyerinde büyüttüler; DNA'ları \"ağır\" olmuştu. Sonra bakterileri normal azotlu (¹⁴N) besiyerine aktardılar ve her nesilde DNA'yı sezyum klorür çözeltisinde ultrasantrifüjle yoğunluğuna göre ayırdılar. Bir nesil sonra tek bir bant vardı, tam ağır ile hafifin ortasında: her molekül yarı eski, yarı yeniydi. İki nesil sonra bantın yarısı ortada, yarısı hafifti. Korunumlu model ilk nesilde, dağılımlı model ikinci nesilde elendi. Bu çalışma bugün hâlâ \"biyolojinin en güzel deneyi\" diye anılır.",
    "Peki kopyalamayı kim yapıyordu? 1956'da Arthur Kornberg, <em>E. coli</em> özütünden nükleotitleri zincire ekleyen bir enzim ayırdı: <strong>DNA polimeraz</strong>. 1959'da bu buluşla Nobel Tıp Ödülü'nü aldı. Ama enzimin bir huyu kafaları karıştırdı: yeni nükleotidi yalnızca zincirin 3' ucuna ekleyebiliyor, yani hep tek yönde çalışıyordu. Oysa çift sarmalın iki ipliği zıt yönde uzanır. İki iplik aynı anda, aynı çatalda nasıl kopyalanıyordu? Cevabı 1968'de Nagoya'da Reiji ve Tsuneko Okazaki verdi: ipliklerden biri kesintisiz, öteki ise kısa parçalar hâlinde, geri geri yapılıp sonradan dikiliyordu. O parçalar bugün onların adını taşır.",
  ],
  core: [
    {
      heading: "Tamamlayıcılık: kalıp molekülün kendi içinde",
      body:
        "Bir ipliğin dizisini biliyorsan ötekini bilirsin. Adenin yalnız timinle (iki hidrojen bağı), guanin yalnız sitozinle (üç hidrojen bağı) eşleşir; çünkü yalnız bu çiftler hem bağ kurabilir hem de sarmalın 2 nanometrelik genişliğine tam sığar. Kopyalamanın bütün sırrı budur: hücrenin ayrı bir \"orijinal\" saklamasına gerek yoktur, her iplik ötekinin negatifidir. Sayfadaki üst ipliği okuyup altını kendin yazabilirsin; hücre de tam bunu yapar.",
      formula: "A = T · G ≡ C",
      formulaNote: "Çizgi sayısı hidrojen bağı sayısıdır. G–C bakımından zengin DNA daha zor ayrılır; bu yüzden erime sıcaklığı daha yüksektir.",
    },
    {
      heading: "Yarı korunumlu: her kopyada bir eski iplik",
      body:
        "Replikasyon bittiğinde ortada iki molekül vardır ve her birinde bir iplik ana molekülden, bir iplik yeni sentezden gelir. Bu, Meselson–Stahl deneyinin ölçtüğü şeydir ve iki sonucu vardır. Birincisi, hücre asla \"sıfırdan\" DNA yazmaz; her zaman eski ipliği okuyarak yazar. İkincisi, bugün senin hücrelerindeki bazı DNA iplikleri, kelimenin tam anlamıyla, doğduğunda bölünen hücrelerden kalmadır. Her nesilde eski ipliklerin payı yarıya iner ama hiçbir zaman sıfır olmaz.",
      formula: "1 molekül → 2 molekül, her biri (1 eski + 1 yeni) iplik",
      formulaNote: "n bölünme sonra 2ⁿ molekülün yalnız ikisi ilk molekülün ipliklerini taşır: iki nesil sonra yarısı, üç nesil sonra dörtte biri.",
    },
    {
      heading: "Çatalda çalışan ekip",
      body:
        "Replikasyon tek bir enzimin değil, bir makinenin işidir. <strong>Helikaz</strong> hidrojen bağlarını kopararak iki ipliği ayırır; açılan Y biçimli bölgeye <strong>replikasyon çatalı</strong> denir. Tek kalan iplikleri <strong>tek iplik bağlayıcı proteinler</strong> yeniden sarılmasın diye tutar. Çatalın önünde biriken burulmayı <strong>topoizomeraz</strong> gevşetir. <strong>Primaz</strong>, kalıba yaklaşık on nükleotitlik kısa bir RNA parçası (<strong>primer</strong>) yazar; çünkü polimeraz boşa başlayamaz, uzatacak bir 3' ucu ister. Sonra <strong>DNA polimeraz</strong> (bakteride Pol III) primeri uzatır. İş bitince başka bir polimeraz (Pol I) RNA primerlerini söküp yerine DNA yazar, <strong>ligaz</strong> da kalan tek çentiği kapatır.",
      formula: "Helikaz → tek iplik bağlayıcı → primaz → Pol III → Pol I → ligaz",
      formulaNote: "Çatalda iş sırası. Topoizomeraz çatalın önünde, ötekilerden bağımsız çalışır. Sayfa yalnız helikazı ve Pol III'ü adıyla gösterir.",
    },
    {
      heading: "Yön sorunu: öncü ve geciken iplik",
      body:
        "Polimeraz yeni nükleotidi yalnızca büyüyen zincirin 3' ucuna ekler; yani her yeni iplik 5'→3' yönünde uzar. İki kalıp iplik ise birbirine zıt yönde uzanır (<strong>antiparalel</strong>). Sonuç: çatalın açılma yönüyle aynı yönde uzayan <strong>öncü iplik</strong> kesintisiz yapılır. Öteki kalıpta polimeraz çatalın tersine gitmek zorundadır; bu yüzden <strong>geciken iplik</strong> kısa parçalar hâlinde, her parça için yeni bir primerle yapılır. Bu <strong>Okazaki parçaları</strong> bakteride 1000–2000, insan hücresinde 100–200 nükleotit uzunluğundadır. Sayfadaki iki polimeraz oku bu yüzden zıt yönlere bakar.",
      formula: "Yeni nükleotit yalnız serbest 3'-OH ucuna eklenir",
      formulaNote: "Gelen nükleotit üç fosfatlıdır (dATP, dGTP…); iki fosfat kopar ve bağ enerjisi oradan gelir.",
    },
    {
      heading: "Hata ve düzeltme: milyarda bir",
      body:
        "Polimeraz hızlıdır ama kusursuz değildir: tek başına kabaca her yüz bin nükleotitte bir yanlış harf koyar. Eklediği nükleotidi hemen kontrol eden bir <strong>düzeltme okuması</strong> mekanizması vardır: yanlış eşleşmeyi hisseder, geri gider ve 3'→5' yönünde söker. Bu, hatayı yaklaşık yüz kat azaltır. Replikasyondan sonra devreye giren <strong>yanlış eşleşme onarımı</strong> yeni iplikteki kalan hataları bir yüz kat daha azaltır. Sonuç kabaca milyarda bir hata; insan hücresinde her bölünmede yalnız birkaç harf. Bu birkaç harf, bir yandan mutasyonun, öte yandan evrimin ham maddesidir.",
      formula: "10⁻⁵ × 10⁻² × 10⁻² ≈ 10⁻⁹",
      formulaNote: "Polimeraz · düzeltme okuması · onarım. Rakamlar büyüklük mertebesidir; enzime ve organizmaya göre değişir.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört adım düğmesi (<strong>1. Açılma</strong>, <strong>2. Primer</strong>, <strong>3. Sentez</strong>, <strong>4. Tamamlanma</strong>) ve bir <strong>Oynat</strong> düğmesi var. Tuval, 12 bazlık bir DNA parçasını renkli dairelerle çizer: A kırmızı, T mavi, G yeşil, C turuncu. Oynat, her adımı yaklaşık 1.2 saniye gösterip bir sonrakine geçer; 4. adımdan sonra başa döner. İki pratik ayrıntı: 3. ve 4. adımda bazlar yalnızca Oynat çalışırken soldan sağa belirir, düğmeye basıp boş bir tuval görürsen Oynat'a bas. Harfler tam belirdiği anda <strong>Durdur</strong>'a basarsan görüntü olduğu yerde donar; rahat rahat sayarsın. Bir adım düğmesine basmak ise sayacı sıfırlar ve tuvali yeniden boşaltır.",
    experiments: [
      {
        title: "Chargaff'ı say",
        predict: "1. Açılma adımında iki iplikteki kırmızı ve mavi daireleri saysan, sayılar birbirine eşit çıkar mı? Ya yeşil ve turuncu? Tek bir iplikte de eşit midir?",
        do: "1. Açılma'ya bas. Önce yalnız üst ipliğin renklerini say ve not et; sonra iki ipliği birlikte say. Ardından A–T için 2, G–C için 3 diyerek sütunlardaki hidrojen bağlarını topla.",
        observe: "Üst iplik tek başına: 4 kırmızı, 3 mavi, 3 yeşil, 2 turuncu; eşit değil. İki iplik birlikte: 7 kırmızı, 7 mavi, 5 yeşil, 5 turuncu; tam eşit. Hidrojen bağı toplamı 7×2 + 5×3 = 29.",
        explain: "Chargaff kuralı tek ipliğin değil çift sarmalın kuralıdır: her A bir T'yle, her G bir C'yle karşılıklı durur. Helikaz 2. adımda bu 29 bağı koparır; molekülün omurgasını tutan kovalent bağlara dokunmaz.",
      },
      {
        title: "Tamamlayıcıyı önceden yaz",
        predict: "Üst iplik ATGCGATACGTA ise, kopyalama bittiğinde üst sırada hangi diziyi okuyacaksın? Önce kâğıda yaz, sonra bak.",
        do: "1. Açılma'da üst ipliği soldan sağa oku ve kâğıda tamamlayıcısını yaz. Sonra 3. Sentez'e bas ve Oynat'ı başlat; harflerin belirişini izle. Üst sıra dolduğu anda Durdur'a bas ve sırayı soldan sağa oku.",
        observe: "Harfler soldan sağa, bir saniyeden kısa sürede belirir ve üst sıra TACGCTATGCAT olur: kâğıdındaki dizinin aynısı. Sayfa yeni ipliği kalıbın üstüne çizdiğinden eski harfler yeni harflerin altında kaybolur; gerçekte yeni iplik kalıbın yanına, ona hidrojen bağlarıyla tutunarak dizilir.",
        explain: "Her yeni harf kalıptaki harfin eşidir; kalıp bilgiyi taşır, polimeraz yalnızca okur ve yazar. Hız kıyaslaması: E. coli polimerazı saniyede yaklaşık 1000 nükleotit ekler; bu 12 harf gerçekte 0.012 saniyede, yani sayfadakinden yüz kat hızlı yazılırdı.",
      },
      {
        title: "Primer gelir, primer gider",
        predict: "Primer kaç bazın üstüne oturur ve hangi adımda ortadan kalkar? Bitmiş DNA'da RNA kalır mı?",
        do: "2. Primer'e bas ve mor dikdörtgenleri say: hangi dairelerin üstünde, her iplikte kaç tane? 3. Sentez'e geç, Oynat'ı aç ve harflerle birlikte mor blokların da belirip belirmediğine bak. Bir adım sonra 4. Tamamlanma geldiğinde Durdur'a bas.",
        observe: "Her ipliğin en soldaki iki bazının üstünde birer mor blok vardır; 3. adımda da harflerle birlikte belirip yerinde durur. 4. Tamamlanma'da kaybolurlar. Ortadaki \"Helikaz\" yazısı ise 2. adımdan itibaren hep kalır; iplikler de 2. adımdan itibaren birbirinden uzaklaşmıştır.",
        explain: "Primaz'ın yazdığı RNA parçası polimeraza bir başlangıç 3' ucu verir; iş bitince Pol I primeri söker, yerine DNA yazar ve ligaz çentiği kapatır. Bitmiş molekülde RNA kalmaz. Gerçek primerler on nükleotit civarındadır; sayfa iki bazla temsil eder.",
      },
      {
        title: "Oklar neden zıt bakıyor?",
        predict: "3. Sentez'de iki \"DNA Pol III\" yazısının okları aynı yöne mi, zıt yöne mi bakar? Tuvalin sol üstündeki 5' ve sağ altındaki 3' etiketlerinden bunu önceden çıkarabilir misin?",
        do: "3. Sentez'e bas, Oynat'ı aç. Sağ üstteki ve sol alttaki polimeraz etiketlerini bul; oklarını ve 5'/3' etiketlerini karşılaştır. Harflerin hangi yönde belirdiğine de dikkat et.",
        observe: "Üstteki ok sağa, alttaki ok sola bakar; etiketler üst ipliğin 5' ucunu solda, alt ipliğin 3' ucunu sağda gösterir. Buna rağmen animasyon iki sırada da harfleri soldan sağa doldurur; sayfa yönü oklarla söyler, çizimle değil.",
        explain: "İki kalıp antiparaleldir ve polimeraz yalnız 5'→3' yazar; bu yüzden iki yeni iplik zıt yönde uzar. Gerçek çatalda biri kesintisiz öncü iplik, öteki Okazaki parçalarıyla yapılan geciken ipliktir. Sayfa iki ipliği de kesintisiz çizer; Okazaki parçalarını hayalinde eklemen gerekir.",
      },
    ],
  },
  wow: [
    {
      title: "Her hücrede iki metre",
      body:
        "İnsan hücresindeki 6.2 milyar baz çiftinin her biri 0.34 nanometre yer kaplar; ucuca eklersen yaklaşık 2.1 metre DNA eder. Bu ip, çapı milimetrenin yüzde birinden küçük bir çekirdeğe sığar ve her bölünmeden önce baştan sona kopyalanır. 10.5 baz çiftinde bir tam tur atan sarmal, insan genomunda 600 milyon kez bükülüdür.",
    },
    {
      title: "Saniyede bin harf, saniyede yüz tur",
      body:
        "<em>E. coli</em>'de bir replikasyon çatalı saniyede yaklaşık 1000 nükleotit ekler. Sarmal 10.5 baz çiftinde bir döndüğü için çatalın önündeki DNA saniyede yaklaşık 95 kez dönmek zorundadır; bu, dakikada 5700 devirle çalışan bir motor demektir. Burulmayı topoizomeraz enzimleri gevşetir. 4.6 milyon baz çiftlik kromozom iki çatalla yaklaşık 40 dakikada kopyalanır; ama bakteri iyi koşullarda 20 dakikada bölünür. Çözüm: bir tur bitmeden bir sonrakini başlatır.",
    },
    {
      title: "Bir tüpte bir milyar kopya",
      body:
        "1983'te Kary Mullis, replikasyonu laboratuvara taşıyan <strong>polimeraz zincir tepkimesini</strong> (PCR) tasarladı ve 1993'te Nobel Kimya Ödülü aldı. Numune ısıtılarak iplikler ayrılır, soğutulunca primerler bağlanır, polimeraz tamamlar; her döngüde DNA iki katına çıkar. 30 döngü sonunda 2³⁰ ≈ 1.07 milyar kopya vardır. Enzim, Yellowstone kaplıcalarında yaşayan <em>Thermus aquaticus</em> bakterisinden alınır; çünkü 95 °C'de bozulmaz. Pandemideki PCR testleri bu döngünün ta kendisidir.",
    },
  ],
  worked: {
    title: "Bir bakteri kromozomu kaç dakikada kopyalanır?",
    prompt:
      "<em>E. coli</em> kromozomu halka biçiminde ve yaklaşık 4.6 milyon baz çifti. Kopyalama tek bir başlangıç noktasından iki yöne doğru ilerler ve her çatal saniyede yaklaşık 1000 nükleotit ekler. Kromozom kaç dakikada kopyalanır? Aynı hesabı insan genomu için yap.",
    steps: [
      "İki çatal zıt yönde ilerlediği için toplam hız 2 × 1000 = 2000 baz çifti/saniye.",
      "Süre = uzunluk / hız = 4.6 × 10⁶ bç ÷ 2000 bç/s = 2300 s. Dakikaya çevir: 2300 ÷ 60 ≈ 38 dakika. Ölçülen değer de yaklaşık 40 dakikadır.",
      "İnsan genomu (tek takım) 3.1 × 10⁹ bç ve insan polimerazı daha yavaş, saniyede yaklaşık 50 nükleotit. Tek bir başlangıç noktasıyla: 3.1 × 10⁹ ÷ (2 × 50) = 3.1 × 10⁷ s ≈ 359 gün, yani neredeyse bir yıl.",
      "Oysa insan hücresi DNA'sını yaklaşık 8 saatte kopyalar. 8 saat = 28 800 s; bir başlangıç noktası bu sürede en çok 2 × 50 × 28 800 ≈ 2.9 × 10⁶ bç kopyalar. Gerekli en az başlangıç noktası sayısı: 3.1 × 10⁹ ÷ 2.9 × 10⁶ ≈ 1100. Gerçekte hepsi aynı anda çalışmadığından hücre on binlerce başlangıç noktası kullanır.",
    ],
    result:
      "Bakteri: tek başlangıç, iki çatal, yaklaşık 38–40 dakika. İnsan: tek başlangıçla bir yıl sürecek iş, on binlerce paralel başlangıç noktasıyla 8 saate iner. Hız yetmeyince hücre paralelleşir.",
  },
  misconceptions: [
    {
      myth: "Replikasyonda eski DNA bozulur ve yerine iki yepyeni molekül yapılır.",
      truth:
        "Hiçbir eski iplik yok edilmez. İki yeni molekülün her biri bir eski, bir yeni iplik taşır. Meselson–Stahl deneyinde bir nesil sonra tek bir \"orta ağırlıkta\" bant görülmesi tam olarak bunu kanıtlar; yepyeni moleküller olsaydı ağır ve hafif diye iki bant olurdu.",
    },
    {
      myth: "DNA polimeraz kalıbı görür görmez kendi başına yazmaya başlar.",
      truth:
        "Polimeraz yalnızca var olan bir zincirin 3' ucunu uzatabilir; boş kalıba ilk nükleotidi koyamaz. Bu yüzden primaz önce kısa bir RNA primeri yazar. Geciken iplikte her Okazaki parçası için yeni bir primer gerekir ve hepsi sonradan DNA ile değiştirilir.",
    },
    {
      myth: "İki yeni iplik de çatalla aynı yönde, kesintisiz uzar.",
      truth:
        "Yalnız öncü iplik öyle yapılır. Kalıplar antiparalel ve polimeraz tek yönlü olduğu için geciken iplik çatalın tersine, kısa parçalar hâlinde sentezlenir; parçaları ligaz birleştirir. Sayfadaki zıt yönlü oklar bunun ipucudur, ama çizim her iki ipliği de kesintisiz gösterir.",
    },
    {
      myth: "Replikasyon ile transkripsiyon aynı şeydir; ikisi de DNA'yı okur.",
      truth:
        "Replikasyon bütün genomu DNA'dan DNA'ya, hücre döngüsünde bir kez kopyalar. Transkripsiyon ise seçilmiş genleri DNA'dan RNA'ya, ihtiyaç oldukça ve tekrar tekrar yazar. Enzimler de farklıdır: DNA polimeraz primer ister, RNA polimeraz istemez.",
    },
  ],
  glossary: [
    { term: "Nükleotit", definition: "DNA'nın yapı taşı: bir şeker (deoksiriboz), bir fosfat ve dört bazdan biri (A, T, G, C)." },
    { term: "Tamamlayıcı baz eşleşmesi", definition: "A'nın yalnız T ile, G'nin yalnız C ile hidrojen bağı kurması; bir ipliğin dizisi ötekini belirler." },
    { term: "Antiparalel", definition: "İki ipliğin zıt yönde uzanması: biri 5'→3' giderken öteki 3'→5' gider." },
    { term: "Replikasyon çatalı", definition: "Helikazın iki ipliği ayırdığı Y biçimli bölge; sentez burada, iki yöne doğru ilerler." },
    { term: "Primer", definition: "Primazın kalıba yazdığı yaklaşık on nükleotitlik RNA parçası; polimerazın uzatacağı 3' ucunu sağlar." },
    { term: "Öncü ve geciken iplik", definition: "Çatal yönünde kesintisiz yapılan iplik öncü, ters yönde parçalar hâlinde yapılan iplik gecikendir." },
    { term: "Okazaki parçası", definition: "Geciken iplikte sentezlenen kısa DNA parçası; bakteride 1000–2000, ökaryotta 100–200 nükleotit." },
    { term: "Düzeltme okuması", definition: "Polimerazın yanlış eklediği nükleotidi 3'→5' yönünde geri sökmesi; hata oranını yaklaşık yüz kat düşürür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede replikasyon bir enzim listesidir; üniversitede bir <strong>makine</strong>: helikaz, primaz, iki ya da üç polimeraz ve kıskaç proteinleri tek bir <em>replizom</em> olarak birlikte hareket eder. Polimerazı kalıptan düşürmeyen halka biçimli <strong>kayar kıskaç</strong>, enzimin kalıba bir kez tutunup binlerce nükleotit yazmasını sağlar; bu sayıya <em>işlemsellik</em> denir ve kıskaçsız polimeraz için onlarla, kıskaçlıyken binlerle ölçülür. Ökaryotlarda başlangıç noktaları hücre döngüsünün G1 evresinde \"lisanslanır\" ve S evresinde yalnız bir kez ateşlenir; bu kontrol bozulduğunda genom iki kez kopyalanır ve kanser biyolojisinin ana konularından biri doğar.",
      "Doğrusal kromozomların bir de uç sorunu vardır: geciken iplikte son primer söküldüğünde yerine DNA yazılamaz ve kromozom her bölünmede biraz kısalır. Hücre bu kaybı <strong>telomeraz</strong> enziminin eklediği tekrar dizileriyle (telomer) karşılar; Elizabeth Blackburn, Carol Greider ve Jack Szostak bu buluşla 2009 Nobel Tıp Ödülü'nü aldı. Aynı polimeraz kimyası laboratuvarda PCR, DNA dizileme ve adli tıp olarak karşına çıkar; tek molekül deneylerinde ise bir polimerazın bir kalıp üzerinde ilerleyişi nanometre hassasiyetinde izlenir.",
    ],
    topics: ["Replizom ve kayar kıskaç", "Enzim kinetiği ve işlemsellik", "Hücre döngüsü ve başlangıç lisanslama", "Telomerler ve telomeraz", "DNA onarım yolları", "PCR ve DNA dizileme"],
  },
  quiz: [
    {
      question: "Meselson–Stahl deneyinde ¹⁵N'den ¹⁴N'ye aktarılan bakterilerin DNA'sı bir nesil sonra santrifüjde nasıl görünür?",
      options: ["Yalnız ağır bant", "Yalnız hafif bant", "Yalnız orta ağırlıkta tek bant", "Yarısı ağır, yarısı hafif iki bant"],
      answer: 2,
      explanation: "Her yeni molekül bir ağır (eski) bir hafif (yeni) iplik taşır; yoğunluğu tam ortadadır. Korunumlu model ağır ve hafif diye iki bant verirdi. Dağılımlı modeli ayırmak için ikinci nesle bakmak gerekir.",
    },
    {
      question: "Geciken iplik neden Okazaki parçaları hâlinde sentezlenir?",
      options: ["Helikaz o iplikte daha yavaş çalışır", "Polimeraz yalnız 5'→3' yazar ve kalıplar antiparaleldir", "O iplikte primer bağlanamaz", "Ligaz o iplikte daha hızlıdır"],
      answer: 1,
      explanation: "Polimeraz yeni nükleotidi yalnız 3' uca ekler. Kalıplardan biri çatalın yönüne ters uzandığından polimeraz çataldan uzaklaşarak kısa parçalar yazar, sonra ligaz onları birleştirir.",
    },
    {
      question: "Hata oranı milyarda bir ise, 6 milyar baz çiftlik bir insan hücresi her kopyalamada yaklaşık kaç yanlış harf yapar?",
      options: ["Sıfır", "Yaklaşık 6", "Yaklaşık 6000", "Yaklaşık 6 milyon"],
      answer: 1,
      explanation: "6 × 10⁹ × 10⁻⁹ = 6. Düzeltme okuması ve onarım olmasaydı (10⁻⁵) bu sayı 60 bin olurdu. Birkaç harflik hata mutasyonun ve uzun vadede evrimin kaynağıdır.",
    },
  ],
  next: [
    { href: "mitoz-mayoz.html", title: "Mitoz & Mayoz", why: "Kopyalanan DNA'nın iki hücreye nasıl paylaştırıldığını gör; replikasyon S evresinde, bölünme hemen sonra." },
    { href: "gen-ifadesi-ve-molekuler-biyoloji.html", title: "Gen İfadesi ve Moleküler Bilgi Akışı", why: "DNA'dan RNA'ya, RNA'dan proteine: aynı tamamlayıcılık kuralının öteki iki durağı." },
    { href: "genetik-caprazlama.html", title: "Genetik Çaprazlama", why: "Sadakatle kopyalanan genlerin nesiller boyunca nasıl dağıldığını Punnett karesiyle izle." },
    { href: "enzim-kinetigi.html", title: "Enzim Kinetiği", why: "Polimerazın 'saniyede bin nükleotit' hızı bir enzim hızıdır; Michaelis–Menten eğrisinde bunun anlamını gör." },
  ],
  sources: [
    { title: "OpenStax · Biology 2e, 14.3 Basics of DNA Replication", url: "https://openstax.org/books/biology-2e/pages/14-3-basics-of-dna-replication", note: "Üç model, Meselson–Stahl deneyi ve çatal mekanizması; sonraki iki bölüm prokaryot ve ökaryot ayrıntılarını verir (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Meselson–Stahl experiment", url: "https://en.wikipedia.org/wiki/Meselson%E2%80%93Stahl_experiment", note: "Deneyin düzeneği, bant fotoğrafları ve üç modelin nasıl elendiği." },
    { title: "Nobel Ödülü · 1959 Fizyoloji veya Tıp", url: "https://www.nobelprize.org/prizes/medicine/1959/summary/", note: "Kornberg ve Ochoa: DNA ve RNA sentezinin mekanizması için verilen ödül." },
    { title: "Vikipedi · DNA replikasyonu", url: "https://tr.wikipedia.org/wiki/DNA_replikasyonu", note: "Türkçe terimler, enzimler ve prokaryot–ökaryot farkları için başlangıç noktası." },
  ],
  revision: "Ekim 2026",
};
