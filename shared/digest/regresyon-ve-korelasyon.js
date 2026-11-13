window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["regresyon-ve-korelasyon"] = {
  slug: "regresyon-ve-korelasyon",
  title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir nokta bulutundan geçen en iyi doğru iki satırlık bir denklemle bulunur. Zor olan, o doğrunun ne zaman yalan söylediğini anlamaktır: artıklar, tek bir uzak nokta ve gizli bir ortak neden.",
  hook:
    "On iki noktalık bir bulutun eğimi 0,52. Buluta tek bir nokta ekliyorsun ve eğim 0,04'e düşüyor. Aynı noktayı aynı x'te yukarı, doğrunun üstüne taşıyınca eğim yine 0,52 oluyor. Bir nokta bir doğruyu nasıl bu kadar kolay devirebilir ve bunu sayıyla nasıl yakalarız?",
  bigIdea:
    "En küçük kareler doğrusu, dikey artıkların kareleri toplamını en küçük yapan tek doğrudur ve <strong>normal denklemlerle</strong> kesin olarak bulunur. Ama doğrunun ne anlattığına <em>artıklar</em>, <em>kaldıraç</em> ve verinin arkasındaki <em>nedensel yapı</em> karar verir; R² ya da r tek başına karar veremez.",
  story: [
    "1 Ocak 1801'de Giuseppe Piazzi yeni bir gök cismi buldu: Ceres. Onu kırk gün izledi, sonra cisim Güneş'in parıltısında kayboldu. Elde birkaç gözlem vardı ve hepsi biraz hatalıydı; soru, bu hatalı noktalardan geçen en iyi yörüngeyi bulmaktı. Yıl sonunda Franz Xaver von Zach, Ceres'i 24 yaşındaki Carl Friedrich Gauss'un en küçük kareler çözümlemesine dayanan tahmininin gösterdiği yerde yeniden buldu. Yöntemi ilk açık ve derli toplu biçimde yayımlayan ise Adrien-Marie Legendre oldu: 1805'te, kuyruklu yıldız yörüngeleri üzerine kitabının ekinde. Gauss 1809'da kendi çözümlemesini yayımlayıp yöntemi 1795'ten beri kullandığını söyleyince bilim tarihinin ünlü öncelik tartışmalarından biri başladı.",
    "Doğruya bugünkü adını veren ise bir kalıtım sorusuydu. Francis Galton 1875'te kokulu bezelye yetiştirmeye başladı ve 1877'de şunu anlattı: iri tohumların yavru tohumları da iri çıkıyordu ama ana tohumdan çok topluluk ortalamasına yakındı; sapma aynı yöndeydi ama kabaca üçte bir kadardı. Galton buna önce 'geri dönüş' (reversion) dedi. 1886'da insan boylarını incelediği makalesinin adı 'Regression towards mediocrity in hereditary stature' idi; 'regresyon' sözcüğü buradan gelir. Korelasyon katsayısının r harfinin de reversion ya da regression sözcüğünden geldiği anlatılır. Katsayının matematiksel formülü 1840'larda Auguste Bravais'nin hata kuramı çalışmasında görülür; Galton 1888'de korelasyon fikrine bağımsız olarak vardı, katsayıyı bugünkü biçimine ise Karl Pearson 1895–1896'da, evrim kuramına matematiksel katkılar dizisinde kavuşturdu. 1904'te Charles Spearman ölçümler yerine sıraları ilişkilendiren katsayısını yayımladı.",
    "Yirminci yüzyıl, sayıların yanıltabileceği yerleri tek tek adlandırdı. Henri Theil 1950'de nokta çiftlerinin eğimlerinin ortancasını alan sağlam bir doğru önerdi; Pranab Kumar Sen 1968'de onu aynı x'i paylaşan noktaları da kapsayacak biçimde genişletti. Edward Simpson 1951'de, birleştirilen grupların içerdeki ilişkiyi tersine çevirebildiğini anlattı; benzer etkilerden daha önce Karl Pearson (1899) ve Udny Yule (1903) söz etmişti, 'Simpson paradoksu' adını ise Colin Blyth 1972'de koydu. Frank Anscombe 1973'te özetleri neredeyse aynı, grafikleri bambaşka dört küçük veri kümesi yayımladı. R. Dennis Cook 1977'de tek bir gözlemin etkisini ölçen uzaklığı, Trevor Breusch ile Adrian Pagan 1979'da artıkların yayılımının değişip değişmediğini soran testi tanıttı; Roger Koenker 1981'de onun normal olmayan hatalara dayanıklı n·R² biçimini önerdi. Bu sayfa o biçimi kullanır.",
  ],
  core: [
    {
      heading: "Normal denklemler nereden gelir?",
      body:
        "Doğru y = a + bx olsun. Artık eᵢ = yᵢ − a − bxᵢ, hedef SSE = Σeᵢ²'dir. SSE, a ve b'nin ikinci dereceden pürüzsüz bir çanağıdır; dibinde iki kısmi türev sıfırdır. ∂SSE/∂a = 0 koşulu Σeᵢ = 0 verir, yani doğru (<span class=ov>x</span>, <span class=ov>y</span>) noktasından geçer. ∂SSE/∂b = 0 koşulu Σxᵢeᵢ = 0 verir: artıklar x ile ilişkisizdir. Bu iki doğrusal denklem birlikte <strong>normal denklemlerdir</strong>. Sayfa aynı doğruyu bir de türev kullanmadan, a ile b'yi sırayla altın oran aramasıyla değiştirerek bulur; iki yol 1,5 × 10⁻⁷ içinde buluşur.",
      formula: "[n Σx; Σx Σx²]·[a; b] = [Σy; Σxy]<br>b = Sxy/Sxx,  a = <span class=ov>y</span> − b·<span class=ov>x</span>",
      formulaNote: "Sxx = Σ(xᵢ − <span class=ov>x</span>)², Sxy = Σ(xᵢ − <span class=ov>x</span>)(yᵢ − <span class=ov>y</span>). Bütün x'ler aynıysa Sxx = 0 olur ve eğim tanımsızdır.",
    },
    {
      heading: "R² ve r: açıklanan pay",
      body:
        "y'nin ortalama çevresindeki toplam değişimi SST, doğrunun açıklayamadığı kısmı SSE, açıkladığı kısmı SSR'dir ve en küçük kareler doğrusu için SST = SSE + SSR tam olarak sağlanır (çapraz terim Σeᵢ = 0 ile Σxᵢeᵢ = 0 yüzünden yok olur). R² = 1 − SSE/SST açıklanan paydır. Tek açıklayıcılı modelde R², Pearson r'nin karesine eşittir; r ise eğimin işaretini de taşır. İkisi de yalnız <em>doğrusal</em> ilişkiyi ölçer: y = x² gibi tekdüze olmayan bir ilişkide r sıfıra yakın çıkabilir.",
      formula: "R² = 1 − SSE/SST = r²,  r = Sxy/√(Sxx·Syy)",
      formulaNote: "Sayfanın varsayılan verisinde R² = 0,3934 ve r = +0,6272; |r² − R²| yalnız kayan nokta yuvarlamasıdır (5,6 × 10⁻¹⁷).",
    },
    {
      heading: "Eğimin belirsizliği ve varsayımları",
      body:
        "Hatalar bağımsız, normal ve sabit varyanslıysa s² = SSE/(n − 2) hata varyansını yansız kestirir; iki serbestlik derecesi a ve b'yi kestirirken harcanmıştır. Eğimin standart hatası SE(b) = s/√Sxx'tir ve (b − β)/SE(b), n − 2 serbestlik dereceli t dağılımına uyar. Buradan güven aralığı çıkar. Sxx, n ile ve x'lerin yayılımıyla büyür: noktaları dört katına çıkarmak SE(b)'yi yaklaşık yarıya indirir. Gürültü x ile büyürse (huni) eğim yine yansızdır ama SE(b) formülü yanlıştır ve '95 %' aralık daha seyrek kapsar. Artık grafiği, eğrilik testi ve Breusch–Pagan testi bu ihlalleri yakalamak içindir.",
      formula: "SE(b) = s/√Sxx,  b ± t<sub>1−α/2; n−2</sub>·SE(b)",
      formulaNote: "Breusch–Pagan (Koenker biçimi): artıkların karesini (e²) x'e karşı uydur, LM = n·R² yaklaşık χ²₁ dağılır.",
    },
    {
      heading: "Kaldıraç, standart artık ve Cook uzaklığı",
      body:
        "Uydurulan değerler gözlemlerin doğrusal birleşimidir, ŷ = Hy. Köşegen öğe hᵢᵢ bir noktanın <strong>kaldıracıdır</strong>: yalnız x'e bağlıdır ve noktanın x ortalamasından uzaklığıyla büyür; toplamı parametre sayısına eşittir (Σhᵢᵢ = p = 2). Artığın varyansı σ²(1 − hᵢᵢ) olduğundan, uzak noktaların artığı doğal olarak küçüktür: doğru onlara doğru çekilir. Bu yüzden ham artık yerine standart artığa bakılır. <strong>Cook uzaklığı</strong>, nokta silinince bütün uydurulmuş değerlerin ne kadar kaydığıdır ve hem artığı hem kaldıracı içerir. Theil–Sen doğrusu ise bütün nokta çiftlerinin eğimlerinin ortancasıdır; kırılma noktası 1 − 1/√2 ≈ 29,3 %'tür.",
      formula: "hᵢᵢ = 1/n + (xᵢ − <span class=ov>x</span>)²/Sxx<br>Dᵢ = rᵢ²·hᵢᵢ / (p(1 − hᵢᵢ)),  rᵢ = eᵢ/(s√(1 − hᵢᵢ))",
      formulaNote: "Sayfa Dᵢ'yi bir de noktayı silip yeniden uydurarak hesaplar; iki yol 10⁻¹⁴ düzeyinde aynıdır (varsayılanda fark −2,7 × 10⁻¹⁴). 2p/n, |t| > 3, D > 4/n ve D > 1 yalnız başparmak kurallarıdır.",
    },
    {
      heading: "Korelasyon, ortak neden ve kısmi korelasyon",
      body:
        "Z hem X'i hem Y'yi etkiliyorsa X ile Y, aralarında hiçbir doğrudan bağ olmasa da ilişkili çıkar. Sayfanın modelinde X = αZ + ε₁, Y = βZ + γX + ε₂; α = β = 1, γ = 0 için kuramsal r(X, Y) = 1/2'dir. Z ölçülmüşse <strong>kısmi korelasyon</strong>, yani X'in ve Y'nin Z'den arta kalanlarının korelasyonu bu sahte bağı sıfıra indirir. X'i kurayla atamak Z'den X'e giden oku keser. Simpson paradoksunda aynı mantık gruplara uygulanır: grup içi eğim eksi, birleşik eğim artı olabilir. Aralık kısıtlamasında ise x'in yalnız bir dilimini tutmak r'yi küçültür, ilişki değişmediği hâlde.",
      formula: "r<sub>XY·Z</sub> = (r<sub>XY</sub> − r<sub>XZ</sub>·r<sub>YZ</sub>) / √((1 − r<sub>XZ</sub>²)(1 − r<sub>YZ</sub>²))",
      formulaNote: "Ölçülmemiş bir ortak neden hiçbir formülle denetlenemez; hangi değişkene göre denetleneceğine veri değil, varsayılan nedensel yapı karar verir.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var ve her şey anında hesaplanır. <strong>01 · En küçük kareler</strong>'de noktaları sürükler, kendi doğrunu a′ ve b′ ile kurar, artık karelerini gerçek kareler olarak görürsün. <strong>02 · Artıklar ve varsayımlar</strong> eğim için t aralığını verir ve 1000 veri kümesiyle kapsamayı sayar. <strong>03 · Aykırı değer ve kaldıraç</strong> tek bir ek noktanın kaldıracını, standart artığını ve Cook uzaklığını ölçer. <strong>04 · Korelasyon ve nedensellik</strong>'te Pearson ile Spearman, gizli ortak neden, Simpson paradoksu ve aralık kısıtlaması deneyleri var. Rastgele veriler tohumludur; aşağıdaki sayılar varsayılan tohum 1 içindir. R tuşu etkin sekmeyi varsayılana döndürür.",
    experiments: [
      {
        title: "Kendi doğrunu en iyiye yaklaştır",
        predict: "Varsayılan on noktada, gözle çizdiğin bir doğrunun kare alanları toplamı en iyisinden ne kadar büyük olur? En iyi doğrunun SSE'sini tahmin et.",
        do: "01. sekmede 'Karelerini çiz' menüsünden 'Senin doğrunun' seç. Başlangıç doğrusu (a′ = 2, b′ = 0,5) için kartları oku, sonra a′ = 3,70 ve b′ = 0,35 yap.",
        observe: "Başlangıçta senin SSE 16,332, en küçüğün 1,85 katı. a′ = 3,70, b′ = 0,35'te 8,818 (1,00 katı), fazla SSE yalnız 0,003. En küçük kareler: b = 0,3456, a = 3,7123, SSE 8,816; kaba kuvvet araması 14 098 SSE hesabıyla aynı doğruya 1,5 × 10⁻⁷ içinde varıyor. R² 0,3934, r +0,6272.",
        explain: "SSE çanağının tek bir dibi var ve normal denklemler onu doğrudan verir. Dipten (Δa, Δb) kadar uzaklaşmanın bedeli Σ(Δa + Δb·xᵢ)² = n(Δa + Δb·<span class=ov>x</span>)² + Sxx·Δb²'dir (çapraz terim Σeᵢ = 0 ile Σxᵢeᵢ = 0 yüzünden düşer): dibin çevresinde düz, uzaklaştıkça karesel büyür. Başlangıç doğrusunda bu 7,517 eder; kart aynı sayıyı doğrudan sayımla da verir. R² = r² ilişkisi de kartlarda görünür.",
      },
      {
        title: "Huni ve yanıltıcı '95 %'",
        predict: "Gürültü x ile büyürse eğim için '95 %' güven aralığı 1000 veri kümesinde kaç kez gerçek eğimi (0,5) kapsar? Sabit gürültüde kaç kez?",
        do: "02. sekmede önce varsayılan 'Doğrusal + sabit gürültü' ile '1000 veri kümesiyle sına'ya bas. Sonra 'Verinin gerçek yapısı' menüsünden 'Doğrusal, gürültü x ile büyür' seç ve yeniden sına.",
        observe: "Sabit gürültüde kapsama 94,2 % (beklenen 95 % ± 0,7 %), b'nin kümeler arası SD'si 0,0659, ortalama SE(b) 0,0643. Hunide 90,9 %: SD 0,0847 ama formül SE ortalaması 0,0726 (oran 1,167); Breusch–Pagan 5,06, p = 0,024.",
        explain: "Eğim hâlâ yansız, ama SE(b) = s/√Sxx formülü bütün noktaların aynı gürültüyü taşıdığını varsayar. Uçtaki gürültülü noktalar eğimi en çok oynatan noktalar olduğu için gerçek saçılım formülden büyüktür. 'Eğri' senaryosunda ise eğrilik testi t = 3,84 verir; Anscombe dörtlüsünde aynı özet tablosu dört farklı grafik gizler.",
      },
      {
        title: "Üç ek nokta: hangisi doğruyu devirir?",
        predict: "Uzak ama doğru üstünde, ortada ama doğrudan uzak, uzak ve doğrudan uzak: üç noktadan hangisi eğimi en çok değiştirir? Kaldıraçları nasıl sıralanır?",
        do: "03. sekmede sırayla 'Uzak ama doğru üstünde', 'Ortada, doğrudan uzak' ve 'Uzak ve doğrudan uzak' düğmelerine bas; kaldıraç, dış standart artık, Cook uzaklığı ve iki eğim kartını oku.",
        observe: "Kaldıraç 0,744 / 0,079 / 0,744 (eşik 0,308); dış standart artık +0,03 / +11,54 / −9,02; Cook 0,002 / 0,437 / 14,261. EKK eğimi 0,5202 / 0,5507 / 0,0390 (ek noktasız 0,5184); Theil–Sen 0,5080 / 0,4854 / 0,4666.",
        explain: "Kaldıraç yalnız x'e bağlıdır; doğrudan sapma artıktır; etki ikisinin birleşimidir. En büyük artık ortadaki noktadadır ama kolu kısa olduğu için eğimi az oynatır. Uzak ve aykırı nokta ise doğruyu kendine çeker; ortanca alan Theil–Sen bu tek noktaya pek aldırmaz.",
      },
      {
        title: "Gizli ortak neden ve müdahale",
        predict: "X'in Y'ye hiçbir etkisi yokken (γ = 0) ikisi de Z'den etkileniyorsa r(X, Y) ne çıkar? X'i kurayla belirlersen ne olur?",
        do: "04. sekmede 'Deney' menüsünden 'Gizli ortak neden Z'yi seç ve kartları oku. Sonra 'Müdahale' kutusunu işaretle; ardından işareti kaldırıp γ = 0,5 yap.",
        observe: "r(X, Y) +0,485 (kuram +0,500); Z denetlenince kısmi korelasyon −0,022 (kuram 0, SE 0,032). Müdahaleyle r +0,024'e iner. γ = 0,5'te denetimsiz eğim +0,983 (kuram +1,000), Z denetlenince +0,477, yani gerçek doğrudan etkiye yakın.",
        explain: "Ortak neden, aralarında ok olmayan iki değişkeni birlikte oynatır. Kısmi korelasyon ölçülen Z'nin izini siler; kurayla atama ise Z → X okunu keser. 'Simpson paradoksu' deneyinde de birleşik eğim +0,908 iken üç grubun eğimleri −0,64, −0,48 ve −0,51'dir.",
      },
    ],
  },
  wow: [
    {
      title: "Dört farklı dünya, tek bir tablo",
      body:
        "Anscombe'un dört kümesinin hepsinde x ortalaması 9, y ortalaması yaklaşık 7,50, korelasyon yaklaşık 0,816 ve doğru yaklaşık y = 3,00 + 0,500x'tir. Biri gürültülü bir doğru, biri neredeyse kusursuz bir parabol, birinde tek aykırı nokta doğruyu eğiyor, dördüncüsünde ise on noktanın x'i aynı ve eğimi tek başına on birinci nokta belirliyor: kaldıracı tam 1. Anscombe, sayısal hesabın kesin, grafiğin kaba sayıldığı yaygın bir kanıya karşı yazmıştı.",
    },
    {
      title: "Verinin üçte birine yakını bozulabilir",
      body:
        "Theil–Sen doğrusu, veri noktalarının yaklaşık 29,3 %'ü keyfî biçimde bozulana kadar sınırsız kaçmaz. En küçük kareler doğrusunda ise tek bir nokta yeter: onu yeterince uzağa taşırsan eğim istediğin değere gider. Sayfadaki 03. sekmede tek nokta EKK eğimini 0,518'den 0,039'a indirirken Theil–Sen 0,491'den yalnız 0,467'ye iner.",
    },
    {
      title: "Regresyon bir kalıtım gözleminden doğdu",
      body:
        "Galton'un kokulu bezelyelerinde iri ana tohumların yavruları da ortalamadan iriydi, ama sapma ana tohumdakinin yalnız üçte biri kadardı. Galton buna 'geri dönüş' dedi ve sözcük sonradan 'regresyon' oldu. Bugün aynı sözcük, ortalamaya dönüşle hiç ilgisi olmayan her doğru uydurmanın adı.",
    },
  ],
  worked: {
    title: "Anscombe I'de eğim ve güven aralığı",
    prompt:
      "Anscombe'un I. kümesinde n = 11 nokta var; x değerleri 4, 5, …, 14 tam sayılarıdır, <span class=ov>y</span> = 7,5009, Sxy = 55,01 ve artık kareler toplamı SSE = 13,763. Eğimi, kesişimi, eğimin standart hatasını ve 95 % güven aralığını bul; IV. kümede neden aynı aralığa güvenilemeyeceğini açıkla.",
    steps: [
      "x'ler 4'ten 14'e on bir ardışık tam sayı: <span class=ov>x</span> = 9, Sxx = Σ(xᵢ − 9)² = 2·(1² + 2² + 3² + 4² + 5²) = 110.",
      "Normal denklemlerin çözümü: b = Sxy/Sxx = 55,01/110 = 0,5001; a = <span class=ov>y</span> − b·<span class=ov>x</span> = 7,5009 − 0,5001·9 = 3,0001. Doğru y = 3,000 + 0,500x.",
      "Hata ölçeği: s² = SSE/(n − 2) = 13,763/9 = 1,529, s = 1,237. Eğimin standart hatası SE(b) = s/√Sxx = 1,237/10,488 = 0,1179; t = b/SE(b) = 4,24.",
      "9 serbestlik derecesi için t₀,₉₇₅ = 2,2622. Aralık 0,5001 ± 2,2622·0,1179 = 0,5001 ± 0,2667, yani [0,2334; 0,7668]. Sayfada 02. sekmede 'Anscombe dörtlüsü' ve küme I'i seç: kartlar 0,5001 ± 0,1179, t kritik 2,2622 ve bu aralığı gösterir.",
      "Küme IV'te özetler neredeyse aynıdır ve aralık da [0,2334; 0,7664] çıkar. Ama on noktanın x'i 8, tek noktanınki 19'dur: o noktanın kaldıracı h = 1/11 + 100/110 = 1. Doğru o noktadan geçmek zorundadır ve eğim tek bir ölçüme dayanır; aralığın varsaydığı 'birçok bağımsız nokta' yoktur.",
    ],
    result:
      "b = 0,5001, a = 3,0001, SE(b) = 0,1179, 95 % aralık [0,2334; 0,7668]. Formül her iki kümede aynı sayıyı verir; hangisine güvenileceğini grafik ve kaldıraç söyler.",
  },
  misconceptions: [
    {
      myth: "R² yüksekse doğrusal model doğrudur.",
      truth:
        "Anscombe'un dört kümesinin R²'si de yaklaşık 0,67'dir, ama biri parabol, biri tek noktanın belirlediği bir sütundur. 02. sekmede 'Eğri' senaryosunda R² 0,775 gibi yüksek bir değerdeyken artıklar U çizer ve eğrilik testi t = 3,84 verir. Önce artıklara bak.",
    },
    {
      myth: "Korelasyon sıfırsa iki değişken arasında ilişki yoktur.",
      truth:
        "r yalnız doğrusal eğilimi ölçer. 04. sekmede 'Tekdüze değil: y = x²' seçeneğinde y tamamen x'e bağlıdır, yine de r = −0,0621 ve Spearman −0,0565 çıkar. Tekdüze ama eğri ilişkide (y = eˣ) Spearman +0,9916 iken Pearson +0,8457'de kalır.",
    },
    {
      myth: "En büyük artıklı nokta, doğruyu en çok etkileyen noktadır.",
      truth:
        "Etki artık ile kaldıracın birleşimidir. 03. sekmede ortadaki aykırı noktanın dış standart artığı +11,54 ama Cook uzaklığı 0,437; uzak noktanınki −9,02 ama Cook uzaklığı 14,261. Uzak bir nokta doğruyu kendine çektiği için artığı küçük bile görünebilir.",
    },
    {
      myth: "Aralık kısıtlaması korelasyonu değiştirmez; ilişki aynı kaldıkça r de aynıdır.",
      truth:
        "Bütün nüfusta ρ = 0,6 olan bir ilişkide yalnız x'i en büyük olan 30 % tutulursa r kuramsal olarak 0,36'ya iner; sayfa 2000 noktalık örnekte +0,596'dan +0,400'e düştüğünü ölçer. Eğim değişmez, ama x'in yayılımı küçüldüğü için gürültünün payı büyür.",
    },
  ],
  glossary: [
    { term: "Artık (eᵢ)", definition: "Gözlenen değer ile doğrunun tahmini arasındaki dikey fark, eᵢ = yᵢ − ŷᵢ." },
    { term: "Normal denklemler", definition: "SSE'nin a ve b'ye göre türevlerini sıfırlayan iki doğrusal denklem; en küçük kareler doğrusunu kesin olarak verir." },
    { term: "Belirleme katsayısı (R²)", definition: "y'deki toplam değişimin doğrunun açıkladığı payı, 1 − SSE/SST. Tek açıklayıcılı modelde r²'ye eşittir." },
    { term: "Değişen varyans", definition: "Hata yayılımının x ile değişmesi (huni biçimli artıklar); eğimi bozmaz ama standart hata formülünü yanıltır." },
    { term: "Kaldıraç (hᵢᵢ)", definition: "Bir noktanın x ekseninde ne kadar yalnız olduğunun ölçüsü; 1/n ile 1 arasında, toplamı parametre sayısına eşit." },
    { term: "Cook uzaklığı", definition: "Bir nokta silindiğinde bütün uydurulmuş değerlerin toplam kayması, p·s² ile ölçeklenmiş." },
    { term: "Spearman sıra korelasyonu", definition: "Ölçümler yerine sıraların Pearson korelasyonu; tekdüze her ilişkiyi yakalar, tek aykırı noktaya daha az duyarlıdır." },
    { term: "Kısmi korelasyon", definition: "Üçüncü bir değişkenin doğrusal etkisi her ikisinden çıkarıldıktan sonra kalan X–Y korelasyonu." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisansta <strong>Olasılık ve İstatistik</strong> dersinde bu sayfanın tek açıklayıcılı modeli, ardından <strong>Regresyon Çözümlemesi</strong> ya da <strong>Ekonometri</strong> dersinde matris biçimi gelir: y = Xβ + ε, normal denklemler XᵀXβ = Xᵀy ve şapka matrisi H = X(XᵀX)⁻¹Xᵀ. <strong>Lineer Cebir</strong> bunun geometrisini verir: ŷ, y'nin X'in sütun uzayına dik izdüşümüdür ve artık o uzaya diktir. Sayısal olarak XᵀX'i açıkça kurmak yerine QR ya da SVD ayrışımı kullanılır, çünkü XᵀX koşul sayısının karesini taşır.",
      "Varsayımlar bozulduğunda araç kutusu genişler: değişen varyansa dayanıklı (White) standart hatalar, ağırlıklı en küçük kareler, Huber gibi sağlam kestiriciler, çok değişkende ridge ve lasso. Korelasyonla nedensellik arasındaki boşluğu ise <strong>nedensel çıkarım</strong> kapatmaya çalışır: rastgele atamalı deneyler, yönlü nedensel graflar ve hangi değişkene göre denetlenmesi ya da denetlenmemesi gerektiğini söyleyen kurallar.",
    ],
    topics: ["Çoklu regresyon ve şapka matrisi", "QR ve SVD ile en küçük kareler", "Genelleştirilmiş doğrusal modeller", "Sağlam regresyon", "Ridge ve lasso", "Nedensel çıkarım"],
  },
  quiz: [
    {
      question: "03. sekmede ek nokta x = 18'de dururken y'sini 11,9'dan 3'e indiriyorsun. Kaldıraç ne olur?",
      options: ["Artar, çünkü nokta doğrudan uzaklaştı", "Azalır, çünkü nokta bulutun altına indi", "Değişmez; kaldıraç yalnız x'e bağlıdır", "Sıfır olur, çünkü nokta aykırıdır"],
      answer: 2,
      explanation: "hᵢᵢ = 1/n + (xᵢ − <span class=ov>x</span>)²/Sxx formülünde y yoktur; iki durumda da h = 0,744. Değişen artıktır ve onunla birlikte Cook uzaklığı 0,002'den 14,261'e çıkar.",
    },
    {
      question: "Aynı gürültü ve aynı x aralığıyla nokta sayısını 30'dan 120'ye çıkarırsan eğimin standart hatası yaklaşık ne olur?",
      options: ["Dörtte birine iner", "Yarısına iner", "Değişmez", "İki katına çıkar"],
      answer: 1,
      explanation: "SE(b) = s/√Sxx ve Sxx nokta sayısıyla orantılı büyür; s aynı kalır. Dört kat nokta √4 = 2 kat küçük SE verir. 02. sekmede n'yi değiştirip '1000 veri kümesiyle sına' ile b'nin SD'sinin 0,0659'dan 0,0333'e indiğini görebilirsin.",
    },
    {
      question: "Gizli ortak neden deneyinde γ = 0 iken r(X, Y) +0,485 ölçülüyor. Z'ye göre denetlenen kısmi korelasyon ve 'Müdahale' sonrası r için en iyi tahmin hangisi?",
      options: ["İkisi de yaklaşık +0,49 kalır", "Kısmi korelasyon sıfıra yakın, müdahale sonrası r de sıfıra yakın", "Kısmi korelasyon sıfıra yakın ama müdahale sonrası r +0,49 kalır", "İkisi de −0,49 olur"],
      answer: 1,
      explanation: "X ile Y arasındaki bağın tamamı Z'den geliyor. Z'nin izi çıkarılınca kısmi korelasyon −0,022'ye, X kurayla atanınca r +0,024'e iner; ikisi de örnekleme gürültüsü düzeyindedir.",
    },
  ],
  next: [
    { href: "hipotez-testi-ve-guven-araligi.html", title: "Hipotez Testi ve Güven Aralığı: Örnekleme, p-Değeri, Hata Türleri ve Güç", why: "Eğimin t aralığının arkasındaki fikir: örnekleme dağılımı, aralıkların gerçek kapsaması, p-değeri ve testin gücü." },
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum", why: "En küçük kareler sekmesinde normal denklemlerin geometrisi: sütun uzayına izdüşüm, QR ve SVD ile çözüm." },
    { href: "bilimsel-yontem-olcme-ve-belirsizlik.html", title: "Bilimsel Yöntem, Ölçme ve Belirsizlik: Basamak, Yayılım, Hata ve Uydurma", why: "Ölçüm belirsizliğiyle ağırlıklı grafik uydurma ve artıkların modeli sorgulaması." },
    { href: "psikometri-ve-olcme.html", title: "Psikometri: Güvenirlik, Geçerlik, Faktör Analizi, Madde Tepki Kuramı, Normlar", why: "Korelasyonun ölçme kuramındaki yeri: güvenirlik, düşüklük düzeltmesi, faktör analizi ve görünmeyen bir özelliği ölçmenin sınırları." },
  ],
  sources: [
    { title: "Wikipedia · Least squares", url: "https://en.wikipedia.org/wiki/Least_squares", note: "Yöntemin tarihi: Piazzi ve Ceres (1801), Gauss'un tahmini, Legendre 1805, Gauss 1809 ve öncelik tartışması (İngilizce)." },
    { title: "Wikipedia · Francis Galton", url: "https://en.wikipedia.org/wiki/Francis_Galton", note: "Bezelye deneyleri (1875–1877), 'reversion', 1886 regresyon makalesi, r harfi ve korelasyonun yeniden keşfi (İngilizce)." },
    { title: "Wikipedia · Anscombe's quartet", url: "https://en.wikipedia.org/wiki/Anscombe%27s_quartet", note: "Dörtlünün 44 değeri, özet istatistikleri ve Anscombe'un 1973 makalesinin amacı; sayfa aynı değerleri kullanır (İngilizce)." },
    { title: "Wikipedia · Theil–Sen estimator", url: "https://en.wikipedia.org/wiki/Theil%E2%80%93Sen_estimator", note: "Theil 1950 ve Sen 1968, çift eğimlerinin ortancası ve 29,3 %'lük kırılma noktası (İngilizce)." },
    { title: "Wikipedia · Simpson's paradox", url: "https://en.wikipedia.org/wiki/Simpson%27s_paradox", note: "Pearson 1899, Yule 1903, Simpson 1951 ve adı koyan Blyth 1972; grupların birleşince tersine dönen ilişkisi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
