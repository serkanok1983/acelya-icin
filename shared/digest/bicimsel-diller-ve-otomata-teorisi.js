window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bicimsel-diller-ve-otomata-teorisi"] = {
  slug: "bicimsel-diller-ve-otomata-teorisi",
  title: "Otomatlar: Dört Daireyle Düşünen Makine",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Dört daire bir dizgiyi yargılar, bir yığın parantez sayar. Makineni kur; NFA'yı DFA'ya çevir, düzenli ifadeyi otomata dönüştür, ayrıştırma ağaçlarını say ve her iddiayı bütün kısa dizgilerde sına.",
  hook:
    "Sayfadaki dört daireli makineye 0101 ver: KABUL der. 01 ver: RET. Oysa bu makinenin defteri yok; okuduğu hiçbir simgeyi saklamıyor, yalnızca hangi dairede durduğunu biliyor. Dört daire tam olarak neyi hatırlayabilir? Uzunluğu 8'i geçmeyen 511 dizgiden kaçını kabul eder ve bunu tek bir dizgi bile denemeden nasıl hesaplarsın?",
  bigIdea:
    "Bir dil bir <strong>dizgi kümesidir</strong>; onu tanıyan makinenin gücü, belleğinin biçimiyle belirlenir: sonlu durum → düzenli diller, yığın → bağlamdan bağımsız diller, bant → hesaplanabilen her şey. Chomsky hiyerarşisi bu belleklerin merdivenidir.",
  story: [
    "1928'de David Hilbert matematikçilere bir hedef gösterdi: verilen bir mantık formülünün her durumda geçerli olup olmadığına karar veren mekanik bir yöntem bulunsun. Buna <strong>Entscheidungsproblem</strong>, karar problemi dendi. 1936 baharında Cambridge'de 23 yaşındaki Alan Turing, soruyu cevaplamak için önce 'yöntem' sözcüğünü tanımlamak zorunda kaldı. O yıllarda 'computer' bir meslek adıydı: kâğıt, kalem ve kurallar listesiyle hesap yapan insan. Turing o insanı soydu: sonsuz bir kâğıt şerit, bir hücreyi okuyup yazan bir kafa ve sonlu sayıda 'akıl durumu'. 28 Mayıs 1936'da Londra Matematik Derneği'ne ulaşan makalesi iki şey kanıtladı: başka her makineyi taklit edebilen tek bir <strong>evrensel makine</strong> vardır; ve makinelerin davranışıyla ilgili öyle sorular vardır ki (bugünkü adıyla durma problemi gibi) hiçbir makine onlara her zaman doğru cevap veremez. Hilbert'in istediği yöntem yoktur. Princeton'da Alonzo Church aynı sonuca birkaç ay önce bambaşka bir yoldan, lambda hesabıyla varmıştı; iki tanımın aynı fonksiyonları yakaladığı kanıtlanınca 'mekanik hesap budur' iddiası sonradan Church–Turing tezi adını aldı.",
    "Küçük makineler büyük makineden sonra geldi. 1943'te Warren McCulloch ve Walter Pitts sinir hücrelerini açık-kapalı anahtarlar olarak modelledi; 1951'de Stephen Kleene bu ağların neyi 'fark edebildiğini' sordu ve cevabı üç işlemle yazdı: art arda ekleme, seçenek ve yıldız. <strong>Düzenli ifadeler</strong> böyle doğdu. 1959'da Michael Rabin ve Dana Scott, aynı anda birden çok yolu deneyebilen 'belirlenimsiz' otomatın belirlenimli olandan daha fazla dil tanımadığını, yalnızca daha az durumla yazıldığını gösterdi; bu çalışma 1976'da onlara Turing Ödülü getirdi. Aynı dönemde 27 yaşındaki dilbilimci Noam Chomsky, İngilizcenin gramerini matematikle yazmaya çalışıyordu. 1956 tarihli 'Three Models for the Description of Language' makalesinde üç gramer modelini karşılaştırdı ve sonlu durumlu makinelerin İngilizceye yetmediğini gösterdi; 1959'daki 'On Certain Formal Properties of Grammars' ile gramerleri kısıtlarına göre dört basamağa, Tip 0'dan Tip 3'e dizdi. Doğal dil için aradığını tam bulamadı, ama bilgisayar dilleri için tam ölçüyü vermişti: aynı yıllarda John Backus ve ardından Peter Naur, ALGOL dilinin söz dizimini bugün <em>BNF</em> dediğimiz bağlamdan bağımsız kurallarla yazdı.",
    "1968'de Ken Thompson, Kleene'in ifadelerini bir metin editöründe hızlı aramanın yolunu yayımladı: yazdığın desen anında küçük bir otomata derleniyor, metin o otomattan tek geçişte geçiriliyordu. Birkaç yıl sonra Unix'teki <code>g/re/p</code> komutu ayrı bir programa dönüştü; adı <code>grep</code>. Bugün kod editöründeki 'bul ve değiştir'den form doğrulamaya kadar pek çok metin eşleştirme, bu sayfadaki dört daireli makinenin torunlarıyla çalışır. Derleyiciler de aynı merdiveni iner: önce düzenli bir otomat kaynak kodu sözcüklere böler, sonra yığınlı bir otomat parantezleri ve blokları eşler. 1971'de Stephen Cook, merdivenin tepesinde, hesaplanabilen problemlerin içinde yeni bir soru açtı: cevabı hızla <em>doğrulanabilen</em> her problem hızla <em>çözülebilir</em> mi? P = NP sorusu 2000'den beri Clay Enstitüsü'nün bir milyon dolarlık ödülüyle açık duruyor.",
  ],
  core: [
    {
      heading: "Dil, dizgilerden oluşan bir kümedir",
      body:
        "Önce sözcükleri yerine oturt. <strong>Alfabe</strong> (Σ) sonlu bir simge kümesidir; sayfadaki makinelerin çoğu için {0, 1}. <strong>Dizgi</strong> bu simgelerden kurulu sonlu bir sıradır; '0101' gibi. Boş dizgi de (ε) bir dizgidir, uzunluğu sıfır. Bir <strong>dil</strong>, dizgilerin herhangi bir kümesidir: 'çift sayıda 0 içeren dizgiler' bir dildir, 'asal uzunluklu dizgiler' de. Bir otomatın tek işi, verilen dizginin dildeki üyeliğine evet ya da hayır demektir. Kümenin tanımını yazmak kolay, onu sonlu bir makineye sığdırmak zor olan budur; bütün kuram bu zorluğun haritasıdır.",
      formula: "L ⊆ Σ*",
      formulaNote:
        "Σ* alfabeden kurulabilen bütün sonlu dizgilerin kümesi; ε de içindedir. Dil, bunun bir alt kümesi.",
    },
    {
      heading: "Sonlu durum: belleği olmayan makinenin belleği",
      body:
        "Bir DFA'nın (belirlenimci sonlu otomat) hatırladığı tek şey şu an hangi durumda olduğudur; okuduğu simgelere geri dönemez, sınırsız sayamaz. Buna rağmen sayfanın açılışındaki dört durum şaşırtıcı bir şeyi hatırlar: şimdiye kadar okunan 0'ların ve 1'lerin <em>tekliğini</em>. q0 'ikisi de çift', q1 'tek 0, çift 1', q2 'çift 0, tek 1', q3 'ikisi de tek' demektir. Bir 0 okumak yalnız 0'ların, bir 1 okumak yalnız 1'lerin tekliğini çevirir. Makine sayıyı değil, iki evet-hayır bilgisini taşır; dört durum tam da 2 × 2 olasılıktır. Dizgi bitince makine çift halkalı bir <strong>kabul durumunda</strong> ise evet, değilse hayır. Dili belirleyen yalnızca oklar ve çift halkalardır: çift halka q0'da olduğu için dil 'çift sayıda 0 ve çift sayıda 1 içeren dizgiler'dir; q0 aynı zamanda başlangıç olduğundan boş dizgi de dildedir. Geçiş tablosunda Kabul kutusunu q0'dan q2'ye taşırsan oklara dokunmadan bambaşka bir dil, 'çift 0, tek 1' tanınır.",
      formula: "δ: Q × Σ → Q,  w ∈ L ⇔ δ*(q₀, w) ∈ F",
      formulaNote:
        "δ geçiş fonksiyonu: (durum, simge) → yeni durum; sayfadaki geçiş tablosunun kendisi. δ* bütün dizgiyi okuduktan sonraki durum, F kabul durumları kümesi.",
    },
    {
      heading: "Üç yazım, tek sınıf: ifade, NFA, DFA",
      body:
        "Kleene'in üç işlemi, birleştirme (ab), seçenek (a|b) ve yıldız (a*: sıfır ya da daha çok yineleme), tam olarak sonlu otomatların tanıdığı dilleri üretir; buna <strong>Kleene teoremi</strong> denir. İfadeden makineye çeviri iki adımdır ve laboratuvar ikisini de gösterir. <strong>Thompson kurulumu</strong> ifadeyi parça parça bir NFA'ya dönüştürür: bu sayfadaki biçimiyle her simge ve her |, *, +, ? işleci iki durum ekler, birleştirme hiç eklemez; m parçalı ifade 2m durumlu makine olur. <strong>Alt küme kurulumu</strong> (Rabin–Scott) sonra NFA'nın 'şu anda bulunabileceğim durumlar' kümelerinin her birini tek bir DFA durumu sayar. NFA tahmin yürütmez, izin verilen bütün yolları birlikte izler; DFA o kümenin adını taşır. Bedel boyuttadır: n durumun 2ⁿ alt kümesi vardır. Çoğu makinede bunların azına ulaşılır; ama 'sondan k. simge 1' dilinde k + 1 durumlu NFA'nın en küçük DFA'sı tam 2ᵏ durumludur.",
      formula:
        "Düzenli ifade ≡ NFA ≡ DFA  (tanınan diller aynı)<br>δ_D(S, a) = ε-kapanış(⋃ δ(q, a)),  q ∈ S",
      formulaNote:
        "S, NFA durumlarının bir alt kümesidir; içinde bir kabul durumu varsa kabul eder. Eşdeğerlik dil için geçerlidir, boyut için değil. 2m sayımı bu sayfadaki kurulum biçimine özgüdür; bazı kitaplar birleştirmede durumları kaynaştırır.",
    },
    {
      heading: "Pompalama: sonlu belleğin sınırı",
      body:
        "p durumlu bir makine en az p uzunlukta bir dizgi okurken, güvercin yuvası ilkesi gereği, ilk p simge içinde bir durumu iki kez ziyaret eder; aradaki parça bir döngüdür. Döngüyü istediğin kadar yinelersen (pompalarsan) ya da hiç dolaşmazsan makine farkı göremez, aynı durumda biter. Bu gözlem <strong>pompalama lemması</strong>dır ve bir dilin düzenli <em>olmadığını</em> kanıtlamanın standart yoludur. Örnek: aⁿbⁿ, yani n tane a ardından n tane b. Dilin p durumlu bir DFA'sı olsaydı s = aᵖbᵖ dizgisini kabul ederdi; döngü ilk p simgenin içinde olduğundan yalnızca a'lardan oluşur. Onu bir kez daha dolaşınca a sayısı artar, b sayısı yerinde kalır; makine yine kabul eder, ama dizgi artık dilde değildir. Çelişki: aⁿbⁿ düzenli olamaz. Dengeli parantezler de aynı nedenle düzenli değildir. Sekme 03'te p = 4 için |xy| ≤ p koşuluna uyan 10 bölmenin hepsini tek tek deneyebilirsin; hiçbiri ayakta kalmaz.",
      formula: "L düzenli ⇒ ∃p: ∀s ∈ L, |s| ≥ p için ∃ s = xyz,<br>|xy| ≤ p,  |y| ≥ 1  ve  ∀i ≥ 0: xyⁱz ∈ L",
      formulaNote:
        "Niceleyicilerin sırası işin özüdür: bir p vardır (DFA'nın durum sayısı yeter); dildeki, uzunluğu en az p olan <em>her</em> s için <em>en az bir</em> bölme bulunur ve o bölme <em>her</em> i'de dilde kalır. Düzenli olmadığını göstermek için karşıt tersi kullanılır: her p için bir s seç, bütün bölmeleri çürüt.",
    },
    {
      heading: "Yığın ve gramer: merdivende bir basamak yukarı",
      body:
        "Sayamayan makineye bir <strong>yığın</strong> ekle: her ( için bir jeton it, her ) için bir jeton çek; girdi bittiğinde yığında yalnız dip işareti Z kaldıysa kabul et. Sonlu otomatın yapamadığı iş tek kuralla biter, çünkü yığın derinliği sınırsız sayar. Yığınlı otomatların tanıdığı dilleri <strong>bağlamdan bağımsız gramerler</strong> üretir: S → aSb | ab, aⁿbⁿ'nin (n ≥ 1) tamamıdır. Bir dizginin gramere uyup uymadığını <strong>CYK algoritması</strong> küçükten büyüğe doldurulan üçgen bir tabloyla bulur: l uzunluğundaki her parça için l − 1 bölme noktası dener ve iki yarıyı türeten değişkenlerden A → BC kuralıyla yenisini çıkarır. n simgeli girdide l uzunluğunda n − l + 1 parça vardır; denemelerin toplamı (n³ − n)/6 eder, yani iş n³ ile büyür. Tablo fazlasını da verir: dizginin kaç ayrı ağaçla türediğini. Sayı 1'den büyükse gramer o dizgide <strong>belirsizdir</strong>. Yığının da sınırı vardır: aⁿbⁿcⁿ iki sayıyı birden tutmayı ister; orası merdivenin üst basamaklarıdır.",
      formula:
        "A ∈ Hücre(i, l) ⇔ A → BC,  B ∈ Hücre(i, k),  C ∈ Hücre(i + k, l − k)<br>Σ<sub>l=1…n</sub> (n − l + 1)(l − 1) = (n³ − n)/6",
      formulaNote:
        "Hücre(i, l): i. simgeden başlayan l uzunluğundaki parçayı türeten değişkenler; k = 1 … l − 1 bölme noktasıdır. Gramer Chomsky normal biçiminde olmalıdır: yalnız A → BC ve A → a kuralları.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var: <strong>01 · DFA</strong>, <strong>02 · NFA → DFA</strong>, <strong>03 · Düzenli ifadeler</strong> ve <strong>04 · Bağlamdan bağımsız diller</strong>. Her birinde makineyi sen kurar ya da hazır listeden seçersin; kartlar ölçülen bir sayıyı (bütün kısa dizgiler tek tek denenerek sayılan) kuramın verdiği sayının yanına, farkıyla birlikte yazar. İki değerli kartlarda sıra 'ölçülen · kuram'dır. Sayılar Türkçe biçimdedir: 2.047 iki bin kırk yedi, %33,5 yüzde otuz üç buçuk demektir. Boşluk tuşu etkin sekmede bir adım atar (03'te adımlanacak bir şey yoktur), R sekmeyi sıfırlar; ikisi de imleç bir kutunun ya da düğmenin içinde değilken çalışır. Modelin sınırları: alfabeler iki simgelidir (aritmetik gramerinde beş; ifadene hem harf hem rakam yazarsan dört), DFA en çok 6 durumludur, NFA'lar ve gramerler hazır listeden seçilir. Kısa dizgilerdeki uyuşma da bir sınamadır, kanıt değil; ikinci sekme kanıt için gereken uzunluğu ayrıca yazar.",
    experiments: [
      {
        title: "Dört daire neyi hatırlıyor, kaç dizgiyi geçiriyor?",
        predict:
          "Açılıştaki makine çift sayıda 0 ve çift sayıda 1 içeren dizgileri kabul ediyor. Uzunluğu 8'i geçmeyen 511 dizgiden kaçı geçer: yarısı mı, dörtte biri mi? q3'ü de kabul durumu yaparsan makine hangi dili tanır; dört durumun hepsi hâlâ gerekli midir?",
        do:
          "01 · DFA sekmesinde Çalıştır'a bas, dolu dairenin yolunu izle. Girdi dizgisine 01, sonra 0110 yaz; kutuyu bir kez de tamamen boşalt. Alttaki tabloda Sayım ve Matris sütunlarını karşılaştır. Sonra geçiş tablosunda q3 satırının Kabul kutusunu işaretle ve 'Ulaşılabilir durum · en küçük eşdeğer DFA' kartını oku.",
        observe:
          "0101 → KABUL, yol q0 —0→ q1 —1→ q3 —0→ q2 —1→ q0. 01 → RET (q3'te biter), 0110 → KABUL, boş kutu → KABUL: ε hiç adım atmadan q0'da karar verir. Sayım l = 0…8 için 1, 0, 2, 0, 8, 0, 32, 0, 128; toplam 171, yani 511 dizginin %33,5 kadarı. Matris sütunu da 171 verir, fark 0. q3 işaretlenince Hazır makine 'Özel'e döner, sayım 341'e (%66,7) çıkar ve kart '4 · 2' der: 2 durum fazlalık.",
        explain:
          "Son durum simgelerin sırasına değil, iki tekliğe bağlıdır. Tek uzunlukta iki sayı birden çift olamaz; çift l ≥ 2'de ilk l − 1 simge serbesttir; o anda iki sayıdan tam biri tektir ve son simge onu düzeltmek zorundadır: 2<sup>l−1</sup> dizgi. Matris hiç dizgi üretmeden aynı sayıyı bulur, çünkü Mˡ'nin (i, j) girdisi i'den j'ye l adımda giden dizgileri sayar. q0 ile q3 birlikte kabul edince dil 'çift uzunluklu dizgiler' olur; bunun için tek bir teklik, yani iki durum yeter. Küçültme bunu senin yerine fark eder.",
      },
      {
        title: "Bir durum ekle, DFA ikiye katlansın",
        predict:
          "'Sondan k. simge 1' dilini NFA k + 1 durumla tanıyor. k'yi 3'ten 4'e çıkarınca NFA bir durum büyür; ondan kurulan DFA kaç durum büyür? En küçük eşdeğer DFA bu şişkinliği geri alır mı? Her NFA böyle mi patlar?",
        do:
          "02 · NFA → DFA sekmesinde Kurulumu baştan al'a, sonra birkaç kez Bir alt küme işle'ye bas; tablonun satır satır dolmasını izle ve Tümünü kur ile bitir. k kaydırıcısını 4'e, sonra 8'e çek; her seferinde kartları ve alttaki Üstel patlama ölçümü tablosunu oku. Son olarak Hazır NFA menüsünden 'Uzunluk 2'nin ya da 3'ün katı · ε ile dallanma'yı seç.",
        observe:
          "İlk adımda D0 = {q0} işlenir: 0 ile D0'da kalır, 1 ile D1 = {q0, q1} doğar. k = 3: NFA 4 durum, üst sınır 2⁴ = 16, ulaşılabilir alt küme 8 (kuram 2³ = 8 · fark 0), en küçük DFA 8; eşdeğerlik kartı '2.047 dizgi · 0 uyuşmazlık'. k = 4: 5'e karşı 16. k = 8: 9'a karşı 256, en küçüğü de 256; çizimin yerini bir açıklama alır. Tablonun k = 10 satırı 11'e karşı 1.024. Öbür NFA'da 6 durum, 7 alt küme (sınırın %10,9 kadarı), en küçük DFA 6.",
        explain:
          "DFA geri dönüp bakamaz; sondan k. simgeyi bilmek için son k simgenin tamamını durumunda taşır. 2ᵏ farklı 'son k simge' vardır ve herhangi ikisi uygun bir devamla ayrılır; bu yüzden küçültme tek durum bile kazandırmaz. NFA ise her 1'de yeni bir yol açar, saymayı yollara bırakır. Uzunluk sayan NFA'da durumlar iki ayrı sayaçtır; alt kümeler 'iki sayacın konumu' olur ve 2 × 3 = 6 birleşimi aşamaz. Yedinci alt küme başlangıçtaki {q0, q1, q3}'tür; küçültme onu {q1, q3} ile birleştirir. Üstel patlama en kötü durumdur, kural değil.",
      },
      {
        title: "Dört daireyi tek satıra sığdır, sonra sınırı aş",
        predict:
          "Kleene teoremine göre sekme 01'deki dört dairenin dili tek satırlık bir ifadeyle yazılabilir. O ifadeden kurulan NFA kaç durumlu olur; en küçük DFA'sı kaç? Pompalama panelinde s = a⁴b⁴ için |xy| ≤ 4 koşuluna uyan 10 bölmeden kaçı her i'de dilde kalır?",
        do:
          "03 · Düzenli ifadeler sekmesinde Hazır ifade menüsünden 'çift sayıda 0 ve çift sayıda 1'i seç; kartları oku, Karşılaştırma uzunluğu L'yi 6'dan 8'e çek. Sonra Pompalama lemması panelinde önce hiçbir şeye dokunmadan sonucu oku; Kopya sayısı i'yi 0, 1 ve 3 yap. Dil menüsünden '(ab)* · düzenli'yi seç; |x| = 0, |y| = 2, i = 4 dene.",
        observe:
          "İfade (00|11|(01|10)(00|11)*(01|10))* olur. NFA kartı '44 · 2 × 22 = 44', DFA kartı '13 · 4': en küçük DFA yine dört daire. L = 6'da '127 dizgi · 127 uyuşma', dilde 43 dizgi; L = 8'de '511 dizgi · 511 uyuşma', dilde 171: sekme 01'deki sayının aynısı. Pompalama: a·aa·abbbb bölmesinde i = 2 → a⁶b⁴, 'Dilde değil'; i = 0 → a²b⁴, i = 3 → a⁸b⁴; yalnız i = 1 'Dilde'. Kart '10 bölmenin 0 tanesi' der. (ab)* için '10 bölmenin 4 tanesi'; seçtiğin bölme i = 4'te 'Dilde'.",
        explain:
          "İfade dizgiyi ikişer ikişer okur: 00 ve 11 teklikleri değiştirmez; 01 ya da 10 'ikisi de tek' bölgesine sokar, oradan yine 01 ya da 10 çıkarır. Tablo, ifade ve 44 durumlu NFA aynı 171 dizgide buluşur. {aⁿbⁿ}'de |xy| ≤ p koşulu y'yi a'ların içine hapseder; pompalamak yalnız a sayısını oynatır. Bir bölmeyi elemek için tek bir i yeter, o yüzden '0 tanesi' kesindir. Bir bölmenin kalması içinse her i gerekir; sayfa yalnız i = 0…4'ü dener. (ab)*'da kalan dört bölmenin hepsinde y çift uzunluktadır.",
      },
      {
        title: "Aynı dizgi, kaç ağaç?",
        predict:
          "()()() dizgisinde üç dengeli parça yan yana duruyor. S → SS kuralı bunları kaç farklı sırayla birleştirebilir? Dört ve altı parçada kaç ağaç çıkar? Aynı dili üreten başka bir gramer bu sayıyı değiştirir mi? Yığınlı otomat ())( dizgisini kaçıncı simgede reddeder?",
        do:
          "04 · Bağlamdan bağımsız diller sekmesinde Girdi dizgisine ()()() yaz, Gösterilen ağaç kaydırıcısıyla ağaçları gez. Sonra ()()()() ve ()()()()()() dene; 'Denenen bölme noktası' kartını da oku. Hazır gramer menüsünden 'Dengeli parantez · belirsiz olmayan'ı seç ve altı çifti yeniden yaz. En altta Parantez dizgisi kutusuna sırayla (()()), ())( ve (( yaz.",
        observe:
          "()()(): KABUL, ağaç sayısı '2 · 2' (kuram C(2)), bölme '35 · 35'. Dört çift: '5 · 5' ve '84 · 84'. Altı çift: '42 · 42' ve '286 · 286'. Belirsiz olmayan gramerde aynı on iki simge '1 · 1' verir; bölme yine 286'dır. CYK ile gramersiz tanıyıcı '2.046 dizgi · 0 fark' der; 64 tanesi dilde. Yığınlı otomat: (()()) KABUL, derinlik '2 · 2'; ())( RET, '3. simgede takıldı'; (( RET, 'girdi bitti, yığında 2 açık parantez kaldı'.",
        explain:
          "k parçayı ikişer ikişer birleştirmenin yolları Catalan sayısıdır: C(k − 1); k = 2, 3, 4, 5, 6 için 1, 2, 5, 14, 42. Ağaç sayısı dilin değil gramerin özelliğidir: ikinci gramer her dizgiyi 'ilk parantez çifti, içi, sonrası' diye tek biçimde böler. Bölme denemeleri yalnız uzunluğa bağlıdır: (n³ − n)/6, n = 6, 8, 12 için 35, 84, 286. Yığınlı otomat ağaç kurmaz, derinliği sayar; iki ret iki ayrı kusurdur: birinde çekecek jeton yoktur, öbüründe jeton artar. Model sınırı: gramerler ε üretmez, bu otomat ise boş dizgiyi kabul eder.",
      },
    ],
  },
  wow: [
    {
      title: "Altmış yıllık soru: tahmin etmek işe yarar mı?",
      body:
        "Sonlu otomatta belirlenimsizlik güç katmaz (Rabin ve Scott); yığınlı otomatta katar: çift uzunluklu palindromları tanımak için dizginin ortasını tahmin etmek gerekir, belirlenimli bir yığın bunu yapamaz. Peki bandı girdi uzunluğuyla sınırlı makinede (LBA)? 1964'te S.-Y. Kuroda iki soru sordu. Birincisi, bağlama duyarlı dillerin tümleyenlerinin de bağlama duyarlı olup olmadığıydı; 1987'de Neil Immerman ve Róbert Szelepcsényi birbirinden bağımsız olarak 'evet' diye kanıtladı. İkincisi, belirlenimli LBA'nın belirlenimsiz olanla aynı dilleri tanıyıp tanımadığı, bugün hâlâ açık. Hiyerarşinin bir basamağında 'tahmin etmek işe yarar mı' sorusunun cevabını altmış yılı aşkın süredir kimse bilmiyor.",
    },
    {
      title: "Yirmi bir durumdan bir milyon duruma",
      body:
        "'Sondan n. simgesi 1 olan dizgiler' dilini belirlenimsiz bir otomat n + 1 durumla tanır: 1'i gördüğünde 'belki de bu sondan n.dir' diye bir yol açar ve n − 1 simge daha sayar. Aynı dilin en küçük DFA'sı ise 2ⁿ durum ister; çünkü son n simgenin hepsini aklında tutmak zorundadır: son n simgesi farklı olan iki dizgi, uygun bir devamla biri dilde biri dışında kalacak biçimde ayrılabilir (Myhill–Nerode ölçütü). Sayfa bunu n = 10'a kadar kurup sayar: 11 duruma karşı 1.024. n = 20 için 21 duruma karşılık 1.048.576 durum. Rabin ve Scott'ın 1959'da gösterdiği eşdeğerlik dil için geçerlidir, boyut için değil.",
    },
    {
      title: "On bir simge, kırk iki anlam",
      body:
        "Öncelik kuralı silinmiş 'E → E+E | E*E' gramerinde x+x*x iki ayrı ağaçla okunur: (x+x)*x ve x+(x*x). İşleç sayısı arttıkça ağaçlar Catalan sayılarıyla çoğalır: 1, 2, 5, 14, 42, 132… Sayfanın dördüncü sekmesinde Hazır gramer menüsünden 'Aritmetik · E → E+E | E*E (belirsiz)'i seç ve x+x*x+x*x+x yaz: beş işleç, on bir simge ve tam 42 ayrıştırma ağacı; her biri ifadeyi başka bir sırayla hesaplar. On işleçte sayı 16.796 olurdu. Programlama dillerinin gramerleri bu yüzden önceliği kurallarına gömer: 'Aritmetik · öncelikli' gramerde aynı dizginin tek ağacı vardır.",
    },
  ],
  worked: {
    title: "Üçe bölünen ikili sayılar: makineyi kur, dizgileri say",
    prompt:
      "İkili yazılmış bir sayıyı soldan sağa okuyan ve sayı 3'e bölünüyorsa kabul eden bir sonlu otomat tasarla; üç durumdan azının yetmeyeceğini göster. Uzunluğu 8 simgeyi geçmeyen 511 ikili dizgiden kaçının kabul edileceğini hiçbir dizgi denemeden hesapla. Sonucu 01 · DFA sekmesindeki 'İkili sayı 3'e bölünür' hazır makinesiyle karşılaştır.",
    steps: [
      "Hatırlanması gereken tek şeyi bul: şimdiye kadar okunan sayının 3'e bölümünden kalan. Yalnızca üç olasılık var: 0, 1, 2. Demek ki üç durum yeter: q0, q1, q2 (durumun numarası kalandır). Başlangıç q0 (hiçbir şey okunmadı, değer 0), kabul durumu da q0.",
      "Geçiş kuralını türet: sağa bir bit eklemek sayıyı ikiyle çarpıp biti eklemektir, N′ = 2N + b; kalan için r′ = (2r + b) mod 3. Tablo: q0 —0→ q0, q0 —1→ q1, q1 —0→ q2, q1 —1→ q0, q2 —0→ q1, q2 —1→ q2. Dene: 1001 (9) için q0 —1→ q1 —0→ q2 —0→ q1 —1→ q0, KABUL. 1011 (11) için q0 —1→ q1 —0→ q2 —1→ q2 —1→ q2, RET; 11 = 3·3 + 2, bitiş durumu kalanı söylüyor.",
      "Üç durum gerçekten gerekli mi? ε, 1 ve 10 dizgilerine bak (kalanları 0, 1, 2). ε dildedir, 1 ve 10 değildir; 1 ile 10'u da sona bir 1 eklemek ayırır: 11 = 3 dildedir, 101 = 5 değildir. Hiçbir ikisi aynı durumda bitemez; öyleyse en az üç durum şarttır (Myhill–Nerode). Sayfadaki kart bunu ölçer: '3 · 3', notu 'Hiçbir durum birleştirilemez: makine en küçük'.",
      "Say: l simgelik dizgilerden q0, q1, q2'de bitenlerin sayısı (a, b, c) olsun. Tablodaki okları geriye doğru oku: a′ = a + b, b′ = a + c, c′ = b + c. Boş dizgiyle başla: (1, 0, 0) → (1, 1, 0) → (2, 1, 1) → (3, 3, 2) → (6, 5, 5) → (11, 11, 10) → (22, 21, 21) → (43, 43, 42) → (86, 85, 85). Bu, geçiş matrisinin kuvvetlerini almanın elle yapılışıdır.",
      "Kabul edilenler a sütunudur: 1 + 1 + 2 + 3 + 6 + 11 + 22 + 43 + 86 = 175 dizgi; 175/511 ≈ %34,2. Üç sayı her adımda birbirinden en çok 1 ayrılır ve toplamları 2ˡ'dir; bu yüzden oran 1/3'e yaklaşır: l = 8'de 86/256 ≈ %33,6. Baştaki sıfırlar ayrı dizgi sayılır: 011 ile 11 aynı sayıdır ama iki ayrı dizgidir.",
      "Sayfada doğrula: hazır makineyi seç, n = 8'de Sayım 175, Matris 175, fark 0; not '511 dizginin %34,2 kadarı'. Sonra 03 · Düzenli ifadeler sekmesinde ifade kutusuna <code>(0|1(01*0)*1)*</code> yaz: aynı dilin ifadesidir. Sınama kutusunda harfli eski bir dizgi kaldıysa karar kartı '—' gösterir ve durum satırı alfabeyi hatırlatır; Sınama dizgisine 1001 yazınca 'NFA: KABUL · RegExp: KABUL' olur. NFA kartı '20 · 2 × 10 = 20', DFA kartı '7 · 3'; L = 8'de '511 dizgi · 511 uyuşma', dilde yine 175 dizgi.",
    ],
    result:
      "Üç durum, altı ok, daha azı olmaz; 511 dizgiden 175'i kabul edilir (%34,2) ve bu sayı üç ayrı yoldan çıkar: elle yineleme, sayfanın kaba kuvvet sayımı ve düzenli ifadenin NFA'sı. Sonlu otomatın sırrı budur: hatırlaman gereken şeyin sonlu olduğu her soru ona sığar. Aynı yöntem her m için m durumlu bir 'm'ye bölünür mü' makinesi verir: r′ = (2r + b) mod m.",
  },
  misconceptions: [
    {
      myth: "Belirlenimsiz otomat (NFA) daha güçlüdür, DFA'nın tanıyamadığı dilleri tanır.",
      truth:
        "İkisi tam olarak aynı dilleri, düzenli dilleri tanır; Rabin ve Scott 1959'da her NFA'nın bir DFA'ya çevrilebildiğini gösterdi. Sekme 02 bu çeviriyi gözünün önünde yapar ve iki makineyi 2.047 dizgide karşılaştırır. Fark ekonomidedir: NFA daha az durumla yazılır, DFA ise 2ⁿ'ye kadar şişebilir. 'Belirlenimsiz' rastgele demek de değildir; 'bütün yolları birlikte izle, biri kabul ediyorsa kabul et' demektir.",
    },
    {
      myth: "Düzenli ifadelerle her metin yapısı, HTML bile ayrıştırılabilir.",
      truth:
        "İç içe geçmiş etiketleri eşlemek parantez saymaktır ve pompalama lemması bunu sonlu otomata yasaklar. Programlama dillerindeki regex motorları geri başvuru (\\1) gibi eklerle biraz daha ileri gider; sayfa bu yüzden karşılaştırmayı yalnız ortak alt kümede yapar. Ağaç yapısını güvenilir biçimde yakalamak için yığınlı bir ayrıştırıcı gerekir. Derleyiciler bu yüzden iki katmanlıdır: düzenli ifade sözcükleri, gramer yapıyı tanır.",
    },
    {
      myth: "Bir dizgiyi pompalayabiliyorsam dil düzenlidir.",
      truth:
        "Lemma tek yönlüdür: düzenli dil pompalanır, ama pompalanabilmek düzenliliği kanıtlamaz; lemmayı sağlayıp düzenli olmayan diller vardır. Lemmanın işe yaradığı yön ötekidir: uygun bir s için hiçbir geçerli bölme ayakta kalmıyorsa dil düzenli değildir. Sekme 03'te {aⁿbⁿ} için |x| = 3, |y| = 2, i = 0 seçersen a³b³ dilde kalır; ama |xy| = 5 > p olduğundan bu bölme sayılmaz, i = 2'de de sıra bozulur.",
    },
    {
      myth: "Bir dizginin iki ayrıştırma ağacı varsa sorun dildedir.",
      truth:
        "Belirsizlik çoğu zaman gramerin kusurudur. Sekme 04'te ()()() dizgisi S → SS gramerinde 2, aynı dili üreten öbür gramerde 1 ağaçla türer; x+x*x için de öncelikli gramer tek ağaç verir. Yine de her dil kurtarılamaz: hangi gramerle yazılırsa yazılsın belirsiz kalan bağlamdan bağımsız diller vardır (özünde belirsiz diller); bu sayfadaki örnekler onlardan değildir.",
    },
  ],
  glossary: [
    { term: "Alfabe, dizgi, dil", definition: "Alfabe sonlu bir simge kümesi, dizgi bu simgelerin sonlu bir sırası (ε boş dizgidir), dil ise dizgilerin herhangi bir kümesidir." },
    { term: "DFA", definition: "Her durum ve simge için tam bir geçişi olan sonlu otomat; belleği yalnızca içinde bulunduğu durumdur, dizgi çift halkalı bir kabul durumunda biterse dildedir." },
    { term: "NFA ve ε geçişi", definition: "Aynı simgeyle birden çok duruma, ε okuyla simge okumadan başka duruma geçebilen otomat; yollardan biri kabul ediyorsa dizgi kabul edilir." },
    { term: "Alt küme kurulumu", definition: "NFA'nın aynı anda bulunabileceği durum kümelerini tek tek DFA durumu sayan çeviri; n durumdan en çok 2ⁿ durum çıkar." },
    { term: "Düzenli ifade", definition: "Birleştirme, seçenek (|) ve yıldız (*) işlemleriyle yazılan dil tarifi; Kleene teoremine göre sonlu otomatla eşdeğerdir." },
    { term: "Pompalama lemması", definition: "Düzenli bir dilde yeterince uzun her dizginin ilk p simgesi içinde, silinince de yinelenince de dizgiyi dilde bırakan boş olmayan bir parça vardır; bir dilin düzenli olmadığını kanıtlamanın aracıdır." },
    { term: "Yığınlı otomat (PDA)", definition: "Sonlu otomata bir yığın eklenmiş hâli; bağlamdan bağımsız dilleri, örneğin dengeli parantezleri tanır." },
    { term: "Belirsiz gramer", definition: "En az bir dizgiyi birden çok ayrıştırma ağacıyla türeten gramer; ağaç sayısını CYK tablosu sayar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bilgisayar mühendisliğinin ikinci ya da üçüncü yılında bu sayfa bir ders olur: <strong>Biçimsel Diller ve Otomata</strong>, çoğu yerde Sipser'ın kitabıyla. Orada DFA'nın en küçük hâlini bulan Myhill–Nerode teoremini, NFA'dan DFA'ya alt küme inşasını, düzenli ve bağlamdan bağımsız diller için iki ayrı pompalama lemmasını ve gramerleri Chomsky normal biçimine çevirmeyi öğrenirsin. Derleyici dersi aynı kuramı makineye döker: <em>flex</em> gibi araçlar düzenli ifadeleri sözcük tanıyıcıya, <em>bison</em> gibi araçlar bağlamdan bağımsız grameri LR ayrıştırıcıya derler. Bu sayfadaki dört daire, her programlama dilinin ilk katmanıdır.",
      "Hiyerarşinin tepesinde ders adı değişir: <strong>Hesaplanabilirlik ve Karmaşıklık</strong>. Durma problemi, Rice teoremi ve indirgemeler bir sorunun çözülemez olduğunu kanıtlamayı öğretir; P, NP, PSPACE sınıfları ise çözülebilir olanların ne kadar pahalı olduğunu. Hiyerarşi dilbilime de geri döndü: 1985'te Stuart Shieber, İsviçre Almancasındaki çapraz bağımlılıkların bağlamdan bağımsız bir gramerle yazılamayacağını gösterdi; Chomsky'nin doğal dil için başlattığı program, 'hangi basamakta' sorusunu hâlâ tartışıyor. Hücresel otomatlar ve Kural 110 ise aynı soruyu fizik ve biyolojiye taşır: basit yerel kurallar, evrensel hesaplama gücünü ne zaman kazanır?",
    ],
    topics: [
      "Myhill–Nerode teoremi ve DFA küçültme",
      "Alt küme inşası (NFA → DFA)",
      "Bağlamdan bağımsız gramerler ve LR ayrıştırma",
      "Durma problemi ve indirgeme",
      "P, NP ve Cook–Levin teoremi",
      "Hücresel otomatlar ve Kural 110",
    ],
  },
  quiz: [
    {
      question:
        "'Sondan k. simge 1' dilinin en küçük DFA'sı k = 3'te 8, k = 4'te 16 durumlu. Belleğin en çok 1.000 durumluk bir DFA tablosuna yetiyorsa bu dili hangi k'ye kadar tanıyabilirsin? Aynı k için NFA kaç durumludur?",
      options: [
        "k = 9; NFA 10 durum",
        "k = 10; NFA 11 durum",
        "k = 31; NFA 32 durum",
        "k = 999; NFA 1.000 durum",
      ],
      answer: 0,
      explanation:
        "En küçük DFA 2ᵏ durumludur, çünkü son k simgenin 2ᵏ olasılığı birbirinden ayırt edilmek zorundadır. 2⁹ = 512 ≤ 1.000 < 1.024 = 2¹⁰; sınır k = 9'dur. NFA ise yalnız k + 1 = 10 durum ister. Bellek on kat büyüse bile k yalnızca 4 artar (2¹³ = 8.192 ≤ 10.000): üstel büyümeye karşı donanım az şey kazandırır.",
    },
    {
      question:
        "CYK, 6 simgelik bir girdide 35 bölme noktası deniyor. Girdi 12 simgeye çıkarsa deneme sayısı yaklaşık kaç katına çıkar?",
      options: [
        "2 katına (70)",
        "4 katına (140)",
        "Yaklaşık 8 katına (286)",
        "64 katına (2.240)",
      ],
      answer: 2,
      explanation:
        "Deneme sayısı (n³ − n)/6'dır: n = 6 için (216 − 6)/6 = 35, n = 12 için (1.728 − 12)/6 = 286. Oran 286/35 ≈ 8,2; baskın terim n³ olduğundan uzunluğu ikiye katlamak işi yaklaşık 2³ = 8 katına çıkarır. Sayı gramere değil yalnız uzunluğa bağlıdır; sayfada on iki simgelik ()()()()()() ile ölçebilirsin.",
    },
    {
      question:
        "Bir arkadaşın s = a⁴b⁴, p = 4 için |x| = 3, |y| = 2 bölmesini seçip i = 0'da a³b³ elde ediyor ve 'dizgi dilde kaldı, demek {aⁿbⁿ} lemmayı sağlıyor' diyor. Akıl yürütmedeki asıl hata nedir?",
      options: [
        "a³b³ aslında dilde değildir",
        "|xy| = 5 > p olduğu için bu bölme lemmanın izin verdiği bölmelerden değildir",
        "i = 0 seçmek yasaktır; i en az 1 olmalıdır",
        "s olarak a⁴b⁴ seçilemez, çünkü uzunluğu p'den büyüktür",
      ],
      answer: 1,
      explanation:
        "Lemma |xy| ≤ p ister; bu koşul y'yi ilk p simgenin, yani a'ların içine hapseder. |x| = 3, |y| = 2 seçince y = ab olur ve koşul bozulur. Üstelik tek bir i'de dilde kalmak yetmez: aynı bölme i = 2'de aaaababbbb verir, sıra bozulur. i = 0 ise serbesttir; lemma her i ≥ 0 için konuşur. İzin verilen 10 bölmenin hiçbiri ayakta kalmaz.",
    },
  ],
  next: [
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi: Turing Makineleri, Lambda Hesabı ve Çözülemezlik", why: "Merdivenin tepesi: tablosunu düzenleyebildiğin bir Turing makinesi, adım adım çalışan bir lambda indirgeyicisi ve köşegen tablosuyla durma probleminin kanıtı." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Düzenli ifade sözcükleri, gramer yapıyı tanır: birkaç satır kodun önce tokenlara, sonra ağaca, ara koda ve makine komutlarına dönüşmesini adım adım kendin yaparsın." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme: Sınıflar, NP ve Yaklaşık Çözümler", why: "CYK'nın n³'ü ile alt küme kurulumunun 2ⁿ'si aynı grafikte nasıl ayrışır? Big-O ve büyüme sınıflarını karşılaştıran etkileşimli grafik." },
    { href: "turkcenin-ses-yapisi.html", title: "Türkçenin Ses Yapısı: Ünlü Uyumu, Ünsüz Değişimi ve Hece", why: "Kurallı bir dilin canlı örneği: Türkçenin ünlü uyumu ve ses olayları adım adım işleyen bir ek motoruyla; kural ve istisna sözlük verisiyle." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 18.404J Theory of Computation (Sipser, 2020)", url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", note: "Sonlu otomatlardan Turing makinelerine ve karmaşıklığa, ders videoları ve notlarıyla tam bir lisans dersi (İngilizce)." },
    { title: "Wikipedia · Chomsky hierarchy", url: "https://en.wikipedia.org/wiki/Chomsky_hierarchy", note: "Dört dil sınıfı, karşılık gelen gramer kısıtları ve otomatlar; 1956 ve 1959 makalelerinin kaynakları." },
    { title: "Stanford Encyclopedia of Philosophy · Turing Machines", url: "https://plato.stanford.edu/entries/turing-machine/", note: "Turing'in 1936 makalesi, evrensel makine, durma problemi ve Church–Turing tezinin tarihsel ve kavramsal anlatımı." },
    { title: "MDN · Regular expressions (JavaScript)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions", note: "Üçüncü sekmenin karşılaştırma için kullandığı motorun belgeleri: gruplar, yineleme işaretleri ve sayfanın bilerek dışarıda bıraktığı geri başvurular." },
  ],
  revision: "Kasım 2026",
};
