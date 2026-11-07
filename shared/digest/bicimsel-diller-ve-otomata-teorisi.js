window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bicimsel-diller-ve-otomata-teorisi"] = {
  slug: "bicimsel-diller-ve-otomata-teorisi",
  title: "Otomatlar: Dört Daireyle Düşünen Makine",
  field: "Bilgisayar Bilimi",
  level: "Lise ileri",
  minutes: 35,
  tagline:
    "Dört daire ve sekiz ok, bir dizgiyi 'evet' ya da 'hayır' diye yargılayabilir; ama parantez saymak için bir yığın, toplama yapmak için bir bant gerekir. Hangi makine neyi başarabilir, bu sayfanın sorusu.",
  hook:
    "Sayfadaki dört daireli makineye '0101' ver: KABUL der. '01' ver: RED. Oysa bu makinenin belleği yok; okuduğu hiçbir şeyi hatırlamıyor, yalnızca hangi dairenin üzerinde durduğunu biliyor. Dört daire tam olarak neyi hatırlayabilir, neyi asla hatırlayamaz? Ve neden aynı soru, 1936'da 23 yaşındaki bir öğrencinin 'hesaplamak ne demektir' sorusuna verdiği cevapla aynı yere çıkar?",
  bigIdea:
    "Bir dil bir <strong>dizgi kümesidir</strong>; onu tanıyan makinenin gücü, belleğinin biçimiyle belirlenir: sonlu durum → düzenli diller, yığın → bağlamdan bağımsız diller, bant → hesaplanabilen her şey. Chomsky hiyerarşisi bu üç belleğin merdivenidir.",
  story: [
    "1928'de David Hilbert matematikçilere bir hedef gösterdi: her matematiksel iddianın doğru mu yanlış mı olduğuna karar veren mekanik bir yöntem bulunsun. Buna <strong>Entscheidungsproblem</strong>, karar problemi dendi. 1936 baharında Cambridge'de 23 yaşındaki Alan Turing, soruyu cevaplamak için önce 'yöntem' sözcüğünü tanımlamak zorunda kaldı. O yıllarda 'computer' bir meslek adıydı: kâğıt, kalem ve kurallar listesiyle hesap yapan insan. Turing o insanı soydu: sonsuz bir kâğıt şerit, bir hücreyi okuyup yazan bir kafa ve sonlu sayıda 'akıl durumu'. 28 Mayıs 1936'da Londra Matematik Derneği'ne ulaşan makalesi iki şey kanıtladı: başka her makineyi taklit edebilen tek bir <strong>evrensel makine</strong> vardır; ve hiçbir makine, verilen bir makinenin durup durmayacağına her zaman karar veremez. Hilbert'in istediği yöntem yoktur. Princeton'da Alonzo Church aynı sonuca birkaç ay önce bambaşka bir yoldan, lambda hesabıyla varmıştı; iki tanımın aynı şeyi yakaladığı anlaşılınca buna Church–Turing tezi dendi.",
    "Küçük makineler büyük makineden sonra geldi. 1943'te Warren McCulloch ve Walter Pitts sinir hücrelerini açık-kapalı anahtarlar olarak modelledi; 1951'de Stephen Kleene bu ağların neyi 'fark edebildiğini' sordu ve cevabı üç işlemle yazdı: art arda ekleme, seçenek ve yıldız. <strong>Düzenli ifadeler</strong> böyle doğdu. 1959'da Michael Rabin ve Dana Scott, aynı anda birden çok yolu deneyebilen 'belirlenimsiz' otomatın belirlenimli olandan daha fazla dil tanımadığını, yalnızca daha az durumla yazıldığını gösterdi; bu çalışma 1976'da onlara Turing Ödülü getirdi. Aynı dönemde 27 yaşındaki dilbilimci Noam Chomsky, İngilizcenin gramerini matematikle yazmaya çalışıyordu. 1956 tarihli 'Three Models for the Description of Language' makalesinde gramerleri kısıtlarına göre dört basamağa dizdi; 1959'da hiyerarşiyi kesinleştirdi. Doğal dil için aradığını tam bulamadı, ama bilgisayar dilleri için tam ölçüyü vermişti: 1959–60'ta John Backus ve Peter Naur, ALGOL dilinin sözdizimini bugün <em>BNF</em> dediğimiz bağlamdan bağımsız kurallarla yazdı.",
    "1968'de Ken Thompson, Kleene'in ifadelerini bir metin editörünün içine koydu: yazdığın desen anında küçük bir otomata derleniyor, metin o otomattan geçiriliyordu. Birkaç yıl sonra Unix'teki <code>g/re/p</code> komutu ayrı bir programa dönüştü; adı <code>grep</code>. Bugün tarayıcının adres satırından telefonundaki arama kutusuna kadar her metin eşleştirme, bu sayfadaki dört daireli makinenin torunlarıyla çalışır. Derleyiciler de aynı merdiveni iner: önce düzenli bir otomat kaynak kodu sözcüklere böler, sonra yığınlı bir otomat parantezleri ve blokları eşler. 1971'de Stephen Cook, hiyerarşinin tepesinde yeni bir soru açtı: cevabı hızla <em>doğrulanabilen</em> her problem hızla <em>çözülebilir</em> mi? P = NP sorusu 2000'den beri Clay Enstitüsü'nün bir milyon dolarlık ödülüyle açık duruyor.",
  ],
  core: [
    {
      heading: "Dil, dizgilerden oluşan bir kümedir",
      body:
        "Önce sözcükleri yerine oturt. <strong>Alfabe</strong> (Σ) sonlu bir sembol kümesidir; sayfadaki makine için {0, 1}. <strong>Dizgi</strong> bu sembollerden kurulu sonlu bir sıradır; '0101' gibi. Boş dizgi de (ε) bir dizgidir, uzunluğu sıfır. Bir <strong>dil</strong>, dizgilerin herhangi bir kümesidir: 'çift sayıda 0 içeren dizgiler' bir dildir, 'asal uzunluklu dizgiler' de. Bir otomatın tek işi, verilen dizginin dildeki üyeliğine evet ya da hayır demektir. Kümenin tanımını yazmak kolay, onu sonlu bir makineye sığdırmak zor olan budur; bütün kuram bu zorluğun haritasıdır.",
      formula: "L ⊆ Σ*",
      formulaNote: "Σ* alfabeden kurulabilen bütün sonlu dizgilerin kümesi; ε de içindedir. Dil, bunun bir alt kümesi.",
    },
    {
      heading: "Sonlu durum: belleği olmayan makinenin belleği",
      body:
        "Bir DFA'nın hatırladığı tek şey şu an hangi durumda olduğudur; okuduğu sembolleri geri alamaz, sayamaz. Buna rağmen sayfadaki dört durum şaşırtıcı bir şeyi hatırlar: şimdiye kadar okunan 0'ların ve 1'lerin <em>tekliğini</em>. q0 'ikisi de çift', q1 'tek 0, çift 1', q2 'çift 0, tek 1', q3 'ikisi de tek' demektir. Bir 0 okumak yatay komşuya, bir 1 okumak dikey komşuya atlatır. Sayıyı hatırlamıyor, yalnızca iki evet-hayır bilgisini taşıyor. Dizgi bitince makine çift çemberli bir <strong>kabul durumunda</strong> ise evet, değilse hayır. Dili belirleyen şey yalnızca budur: oklar ve çift çemberler. Sayfadaki çift çember q0'dadır; yani makinenin gerçekten tanıdığı dil 'çift sayıda 0 ve çift sayıda 1'dir, metnin yazdığı 'tek sayıda 1' değil. Deney 1'de bunu kendin sınayacaksın.",
      formula: "δ: Q × Σ → Q,  w ∈ L ⇔ δ*(q₀, w) ∈ F",
      formulaNote: "δ geçiş fonksiyonu: (durum, sembol) → yeni durum. δ* bütün dizgiyi okuduktan sonraki durum, F kabul durumları kümesi.",
    },
    {
      heading: "Düzenli ifade ve otomat aynı şeyin iki dilidir",
      body:
        "Kleene'in üç işlemi, ekleme (ab), seçenek (a|b) ve yıldız (a*: sıfır ya da daha çok tekrar), tam olarak sonlu otomatların tanıyabildiği dilleri üretir; buna <strong>Kleene teoremi</strong> denir. Her düzenli ifade bir otomata, her otomat bir düzenli ifadeye çevrilebilir. Sayfadaki parite makinesinin ifadesi şudur: <code>^(00|11|(01|10)(00|11)*(01|10))*$</code>. Okunuşu: ya aynı iki sembol gelir ve hiçbir şey değişmez, ya da farklı iki sembolle 'ikisi de tek' bölgesine girilir ve yine farklı iki sembolle çıkılır. Belirlenimsiz otomat (NFA) aynı dili çoğu zaman çok daha az durumla yazar; ama Rabin–Scott alt küme inşası onu DFA'ya çevirirken durum sayısı en kötü hâlde 2ⁿ'ye fırlar.",
      formula: "Regex ≡ NFA ≡ DFA  (tanınan diller aynı)",
      formulaNote: "Eşdeğerlik dil için geçerlidir, boyut için değil: n durumlu bir NFA'nın en küçük DFA'sı 2ⁿ durum gerektirebilir.",
    },
    {
      heading: "Pompalama: sonlu belleğin sınırı",
      body:
        "p durumlu bir makine p'den uzun bir dizgi okurken bir durumu mutlaka iki kez ziyaret eder; aradaki parça bir döngüdür. Döngüyü istediğin kadar tekrarlarsan (pompalarsan) makine farkı göremez, aynı cevabı verir. Bu gözlem <strong>pompalama lemması</strong>dır ve bir dilin düzenli <em>olmadığını</em> kanıtlamanın standart yoludur. Örnek: aⁿbⁿ, yani n tane a ardından n tane b. a'lar bölgesindeki bir döngüyü pompalayınca a sayısı artar, b sayısı yerinde kalır; makine yine kabul eder, ama dizgi artık dilde değildir. Çelişki: aⁿbⁿ düzenli olamaz. Parantez eşlemek de aynı dildir; bu yüzden sayfadaki sınıfta bir basamak yukarı çıkılır. <strong>Yığın</strong> eklenmiş otomat (PDA) her a için bir jeton iter, her b için bir jeton çeker; gramer tek satırdır: S → aSb | ε.",
      formula: "w = xyz,  |y| ≥ 1,  |xy| ≤ p  ⇒  xyⁱz ∈ L  (her i ≥ 0)",
      formulaNote: "p makinenin durum sayısı (pompalama uzunluğu). Lemma 'düzenli ise böyle davranır' der; düzenli olmadığını göstermek için tersi kullanılır.",
    },
    {
      heading: "Bant: hiyerarşinin tepesi ve tavanı",
      body:
        "Yığının tek kusuru, yalnızca en üstteki jetona bakabilmesidir; aⁿbⁿcⁿ için iki sayaç gerekir ve PDA onu tanıyamaz. Turing makinesi kısıtı kaldırır: sonsuz bant, istediği hücreye gidip okuyan ve yazan bir kafa, sonlu bir durum tablosu. Sayfadaki makine bu yapıyla ikili sayıya 1 ekler: sağa yürü, bandın sonunu bul, geri dön, 1'leri 0 yaparak elde taşı, ilk 0'ı (ya da boşluğu) 1 yap, dur. Üç durum ve beş kural, toplama işleminin tamamı. Church–Turing tezi, mekanik yoldan hesaplanabilen her şeyin bu makineyle hesaplanabildiğini söyler; bugüne kadar hiçbir fiziksel bilgisayar tezi aşamamıştır. Tavan da buradadır: Turing 1936'da, bir makinenin durup durmayacağına karar veren makinenin var olamayacağını kanıtladı. Hiyerarşinin üstünde 'her şey' yoktur; hesaplanamayan sorular vardır.",
      formula: "δ: Q × Γ → Q × Γ × {L, R}",
      formulaNote: "Γ bant alfabesi (girişe ek olarak boş hücre B). Her kural: (durum, okunan) → (yeni durum, yazılan, kafa yönü).",
    },
  ],
  lab: {
    intro:
      "Sayfada altı panel var. <strong>Chomsky piramidi</strong>nin dört katmanı tıklanınca açıklama verir. <strong>DFA simülatörü</strong>nde bir metin kutusu, <strong>⏭️ Adım</strong>, <strong>▶️ Çalıştır</strong> ve <strong>↺ Sıfırla</strong> düğmeleri var; altındaki satır durumu ve kalan dizgiyi yazar. Önemli ayrıntı: Çalıştır kutuyu yeniden okumaz; yeni dizgi yazdıktan sonra önce <kbd>Enter</kbd>'a bas ya da Sıfırla'ya tıkla. Yalnızca 0 ve 1 kabul edilir, başka karakterde makine olduğu yerde kalır. <strong>Turing makinesi</strong>nde Adım, Çalıştır, Sıfırla ve <strong>🎲 Yeni Bant</strong> var; durum satırı bandı, onluk değerini ve kafanın hücre numarasını gösterir. <strong>Regex deney alanı</strong>nda iki kutu (Regex ve Test) ve EŞLEŞTİ/EŞLEŞMEDİ etiketi vardır; eşleştirme JavaScript'in <code>RegExp</code> motoruyla yapılır. Karmaşıklık kartları fareyle üzerine gelince, otomata kartları tıklanınca açıklama verir.",
    experiments: [
      {
        title: "Etiket mi, çift çember mi? Makinenin gerçek dili",
        predict:
          "Panel metni 'çift sayıda 0 ve tek sayıda 1' diyor. Varsayılan dizgi '0101'de iki 0 ve iki 1 var: bu kurala göre RED beklenir. Çizimdeki çift çember ise q0'da. Hangisi kazanır?",
        do: "Hiçbir şey değiştirmeden ▶️ Çalıştır'a bas ve okları izle. Sonra kutuya sırayla '01', '1', '11', '0110' yaz; her birinden sonra Enter'a bas, ardından Çalıştır.",
        observe:
          "'0101' → KABUL, son durum q0 (yol q0→q1→q3→q2→q0). '01' → RED, q3. '1' → RED, q2. '11' → KABUL, q0. '0110' → KABUL, q0. Tek sayıda 1 içeren her dizgi reddediliyor; metin değil, çizim haklı.",
        explain:
          "Bir otomatın dili yalnızca oklarla ve kabul durumlarıyla tanımlanır; çift çember q0'da olduğu sürece dil 'çift 0 ve çift 1'dir. Metindeki kuralı tanımak için çift çemberin q2'ye taşınması gerekirdi. Bu, kuramın ilk dersi: makineye ne söylediğin değil, nasıl çizdiğin sayılır.",
      },
      {
        title: "Elde taşıma: Turing makinesi kaç adımda biter?",
        predict:
          "Bant 1011 (11). Makine sağdaki 1'leri 0 yapıp ilk 0'ı 1 yapacak. Sondaki art arda 1'lerin sayısına n dersen adım sayısı n + 3 olmalı: 1011 için 5. Ara adımlarda bandın onluk değeri ne olur, hiç küçülür mü?",
        do: "↺ Sıfırla'ya bas, sonra ⏭️ Adım'a her basışta durum satırını not et. Bitince 🎲 Yeni Bant'a bas; 111 (7) ya da 1111 (15) gelene kadar tekrarla ve aynı sayımı yap.",
        observe:
          "1011: adım 1 q0, kafa 4'e gider; adım 2 q1, kafa 3; adım 3 bant 1010 (10); adım 4 bant 1000 (8); adım 5 HALT, 1100 (12). Tam 5 adım. 111 için 6 adım ve bant 1000 (8): sola yeni bir hücre açılır. 1111 için 7 adım, 10000 (16). 110 (6) gibi 0 ile bitenlerde yalnızca 3 adım.",
        explain:
          "Elde taşıma, kâğıt üzerinde yaptığınla aynıdır: her 1 bir 0 olur ve elde sola taşınır; ilk 0 eldeyi yutar. Ara adımlarda bant 'yalan söyler' (11 iken 10, sonra 8 görünür); hesaplama bitene kadar ara değerin anlamı yoktur. Tüm hücreler 1 ise bant solda büyür: sonsuz bant tam bunun içindir.",
      },
      {
        title: "Açılışta neden EŞLEŞMEDİ?",
        predict:
          "Regex kutusunda e-posta deseni, Test kutusunda 'test@example.com' var. Desen tam bu metne göre yazılmış görünüyor: EŞLEŞTİ beklenir. Sayfa açıldığında etiket ne diyor?",
        do: "Etikete bak. Sonra Regex kutusunda noktanın önündeki iki ters bölüden (\\\\) birini sil; desen <code>^[a-z]+@[a-z]+\\.(com|org)$</code> olsun. Test kutusuna sırayla 'test@example.net', 'Test@example.com' ve 'xx test@example.com' yaz. Son olarak desenin başındaki ^ ve sonundaki $ işaretlerini silip son metni yeniden dene.",
        observe:
          "Açılışta ❌ EŞLEŞMEDİ. Tek ters bölü kalınca ✅ EŞLEŞTİ. '.net' → EŞLEŞMEDİ (seçenek yalnızca com|org). Büyük T → EŞLEŞMEDİ ([a-z] küçük harf). Başında 'xx ' olan metin → EŞLEŞMEDİ; ^ ve $ silinince aynı metin → EŞLEŞTİ.",
        explain:
          "Desen HTML dosyasına iki ters bölüyle yazılmış; regex dilinde <code>\\\\</code> 'gerçek bir ters bölü karakteri', ardından gelen <code>.</code> 'herhangi bir karakter' demektir. Test metninde ters bölü olmadığı için eşleşme yok. ^ ve $ ise dizginin başını ve sonunu sabitler: onlar olmadan motor, deseni metnin herhangi bir yerinde arar. Bir karakterin yeri bütün dili değiştirir; biçimsel diller bu yüzden 'biçimsel'dir.",
      },
      {
        title: "Dört daireyi tek satıra sığdır, sonra sınırı aş",
        predict:
          "Kleene teoremine göre DFA'nın dili bir düzenli ifadeyle yazılabilir. <code>^(00|11|(01|10)(00|11)*(01|10))*$</code> deseni, Deney 1'deki dizgilerde DFA ile aynı kararı verir mi? Boş Test kutusu için ne der?",
        do: "Deseni Regex kutusuna yaz. Test kutusuna sırayla '0101', '01', '11', '0110', '0100' yaz; en sonunda kutuyu tamamen boşalt. Ardından deseni <code>^(.+)\\1$</code> yap ve 'abcabc', 'abcab', '0101', '0110' dene.",
        observe:
          "'0101' ✅, '01' ❌, '11' ✅, '0110' ✅, '0100' ❌: DFA ile birebir aynı. Boş kutu ✅ (yıldız sıfır tekrara izin verir; DFA da ε'u q0'da kabul ederdi). İkinci desende 'abcabc' ✅, 'abcab' ❌, '0101' ✅, '0110' ❌: yalnızca 'bir parçanın iki kez tekrarı' biçimindeki dizgiler geçer.",
        explain:
          "İlk desen, aynı dilin otomatsız yazımıdır; iki gösterim arasında bilgi kaybı yoktur. İkinci desendeki <code>\\1</code> bir <strong>geri başvuru</strong>dur: 'birinci grupta ne yakaladıysan aynısı'. Bu, ww dilidir ve sonlu otomat onu tanıyamaz; pompalama lemması bunu yasaklar, dil bağlamdan bağımsız bile değildir. JavaScript'in 'regex'i bu yüzden adının söylediğinden daha güçlü, Chomsky'nin 3. tipinden daha yukarıdadır. Pratik araç ile matematiksel tanım her zaman örtüşmez.",
      },
    ],
  },
  wow: [
    {
      title: "Beş durumun en uzun nefesi: 47.176.870 adım",
      body:
        "Beş durumlu, iki sembollü, boş bantla başlayıp sonunda duran bir Turing makinesi en çok kaç adım atabilir? 1990'da Heiner Marxen ve Jürgen Buntrock 47.176.870 adım atıp duran bir makine buldu. Bunun gerçekten en uzun olduğu, yani BB(5) = 47.176.870, ancak 2024 yazında kanıtlandı: bbchallenge adlı gönüllü topluluk 180 milyona yakın aday makinenin her birini ya durdurdu ya da asla durmayacağını gösterdi ve ispatı bilgisayarla doğruladı. Altı durum için cevap bilinmiyor; bilinen tek şey, sayının gözle okunamayacak kadar büyük olduğu.",
    },
    {
      title: "Yirmi bir durumdan bir milyon duruma",
      body:
        "'Sondan n'inci sembolü a olan dizgiler' dilini belirlenimsiz bir otomat n + 1 durumla tanır: a'yı gördüğünde 'belki de bu sondan n'incidir' diye tahmin eder ve n adım sayar. Aynı dilin en küçük DFA'sı ise 2ⁿ durum ister; çünkü son n sembolün hepsini aklında tutmak zorundadır. n = 20 için 21 duruma karşılık 1.048.576 durum. Rabin ve Scott'ın 1959'da gösterdiği eşdeğerlik dil için geçerlidir, boyut için değil.",
    },
    {
      title: "Turing'in 'computer'ı bir insandı",
      body:
        "1936'da 'computer' sözcüğü bir mesleği anlatıyordu: tablolar, kurallar ve kâğıtla hesap yapan insan. Turing makalesinde kendi makinesini tam bu insanı taklit ederek kurdu: kâğıt yerine bant, bakış yerine kafa, 'akıl durumu' yerine sonlu durum tablosu. Makale Londra Matematik Derneği'ne 28 Mayıs 1936'da ulaştı; Turing 23 yaşındaydı. Makinenin mekanik bir örneğini hiç yapmadı, yapması da gerekmiyordu: gösterdiği şey, kâğıt-kalem hesabının sınırlarının makinenin sınırlarıyla aynı olduğuydu.",
    },
  ],
  worked: {
    title: "Üçe bölünebilen ikili sayılar için bir DFA",
    prompt:
      "İkili yazılmış bir sayıyı soldan sağa okuyan ve sayı 3'e bölünebiliyorsa kabul eden bir sonlu otomat tasarla. Sonra sayfadaki Turing makinesinin başlangıç bandı 1011 (11) ile bitiş bandı 1100 (12) için makineyi elle çalıştır.",
    steps: [
      "Hatırlanması gereken tek şeyi bul: şimdiye kadar okunan sayının 3'e bölümünden kalan. Yalnızca üç olasılık var: 0, 1, 2. Demek ki üç durum yeter: r0, r1, r2. Başlangıç r0 (hiçbir şey okunmadı, değer 0), kabul durumu da r0.",
      "Geçiş kuralını türet: sağa bir bit eklemek sayıyı ikiyle çarpıp biti eklemektir, N′ = 2N + b. Kalan için de aynısı geçerlidir: r′ = (2r + b) mod 3. Tablo: r0 —0→ r0, r0 —1→ r1, r1 —0→ r2, r1 —1→ r0, r2 —0→ r1, r2 —1→ r2.",
      "1100 (12) için çalıştır: r0 —1→ r1 —1→ (2·1+1 = 3 → 0) r0 —0→ r0 —0→ r0. Bitiş r0: KABUL. Gerçekten 12 = 3·4.",
      "1011 (11) için çalıştır: r0 —1→ r1 —0→ r2 —1→ (2·2+1 = 5 → 2) r2 —1→ (5 → 2) r2. Bitiş r2: RED. Gerçekten 11 = 3·3 + 2; durumun adı kalanı söylüyor.",
      "Sayfada doğrula: Regex kutusuna <code>^(0|1(01*0)*1)*$</code> yaz; bu, aynı üç durumlu makinenin düzenli ifade biçimidir. Test kutusuna 1100 → EŞLEŞTİ, 1011 → EŞLEŞMEDİ, 10010 (18) → EŞLEŞTİ.",
    ],
    result:
      "Üç durum, altı ok: sayının tamamını değil, yalnızca kalanını hatırlayan bir makine sonsuz sayıda sayıyı doğru yargılar. Sonlu otomatın sırrı budur: hatırlaman gereken şeyin sonlu olduğu her soru ona sığar.",
  },
  misconceptions: [
    {
      myth: "Belirlenimsiz otomat (NFA) daha güçlüdür, DFA'nın tanıyamadığı dilleri tanır.",
      truth:
        "İkisi tam olarak aynı dilleri, düzenli dilleri tanır; Rabin ve Scott 1959'da her NFA'nın bir DFA'ya çevrilebildiğini gösterdi. Fark ekonomidedir: NFA daha az durumla yazılır, DFA ise 2ⁿ'ye kadar şişebilir. 'Belirlenimsiz' rastgele demek de değildir; 'bütün yolları aynı anda dene, biri kabul ediyorsa kabul' demektir.",
    },
    {
      myth: "Düzenli ifadelerle her metin yapısı, HTML bile ayrıştırılabilir.",
      truth:
        "İç içe geçmiş etiketleri eşlemek parantez saymaktır ve pompalama lemması bunu sonlu otomata yasaklar. Programlama dillerindeki regex motorları geri başvuru gibi eklerle biraz daha ileri gider (Deney 4), ama ağaç yapısını güvenilir biçimde yakalamak için yığınlı bir ayrıştırıcı gerekir. Bu yüzden derleyiciler iki katmanlıdır: regex sözcükleri, gramer yapıyı.",
    },
    {
      myth: "Durma problemi daha hızlı bilgisayarlarla bir gün çözülür.",
      truth:
        "Karar verilemezlik hız sorunu değildir; Turing'in 1936 kanıtı, hangi makineyi kurarsan kur, onu yanıltan bir girdi inşa eder. Daha hızlı donanım cevabı bekleme süresini kısaltır, var olmayan bir cevabı yaratmaz. Belirli programlar için durma kararı verilebilir; genel bir yöntem olmaz.",
    },
    {
      myth: "Gerçek bilgisayarların belleği sonlu olduğu için aslında birer DFA'dır, Turing makinesi kuramı onlara uymaz.",
      truth:
        "Teknik olarak doğru, pratik olarak yanıltıcıdır. 8 GB bellekli bir makinenin durum sayısı 2 üzeri yaklaşık 69 milyar (2 üzeri 2³⁶); bu DFA'yı yazmak ya da onun hakkında akıl yürütmek olanaksızdır. Turing modeli, 'yeterince bellek olsa ne hesaplanabilir' sorusuna temiz cevap verir ve mühendislik bu cevabı kullanır. Hiyerarşi makineyi değil, soruyu sınıflandırır.",
    },
  ],
  glossary: [
    { term: "Alfabe (Σ) ve dizgi", definition: "Alfabe sonlu bir sembol kümesi, dizgi bu sembollerden kurulu sonlu bir sıra; ε uzunluğu sıfır olan boş dizgidir." },
    { term: "Dil", definition: "Bir alfabe üzerindeki dizgilerin herhangi bir kümesi; otomat, bir dizginin bu kümede olup olmadığına karar verir." },
    { term: "DFA", definition: "Her durum ve sembol için tam bir geçişi olan sonlu otomat; belleği yalnızca içinde bulunduğu durumdur." },
    { term: "Kabul durumu", definition: "Çizimde çift çemberle gösterilen durum; dizgi bittiğinde makine buradaysa dizgi dildedir." },
    { term: "Düzenli ifade", definition: "Ekleme, seçenek (|) ve yıldız (*) işlemleriyle yazılan dil tarifi; Kleene teoremine göre sonlu otomatla eşdeğer." },
    { term: "Pompalama lemması", definition: "Düzenli bir dilde yeterince uzun her dizginin, tekrarlanınca dilde kalan bir parçası vardır; bir dilin düzenli olmadığını kanıtlamanın aracı." },
    { term: "Yığınlı otomat (PDA)", definition: "Sonlu otomata bir yığın eklenmiş hâli; bağlamdan bağımsız dilleri, örneğin dengeli parantezleri tanır." },
    { term: "Karar verilemezlik", definition: "Bir sorunun her girdi için doğru cevap veren algoritmasının var olmaması; durma problemi ilk kanıtlanmış örnektir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bilgisayar mühendisliğinin ikinci ya da üçüncü yılında bu sayfa bir ders olur: <strong>Biçimsel Diller ve Otomata</strong>, çoğu yerde Sipser'ın kitabıyla. Orada DFA'nın en küçük hâlini bulan Myhill–Nerode teoremini, NFA'dan DFA'ya alt küme inşasını, düzenli ve bağlamdan bağımsız diller için iki ayrı pompalama lemmasını ve gramerleri Chomsky normal biçimine çevirmeyi öğrenirsin. Derleyici dersi aynı kuramı makineye döker: <em>flex</em> gibi araçlar düzenli ifadeleri sözcük tanıyıcıya, <em>bison</em> gibi araçlar bağlamdan bağımsız grameri LR ayrıştırıcıya derler. Bu sayfadaki dört daire, her programlama dilinin ilk katmanıdır.",
      "Hiyerarşinin tepesinde ders adı değişir: <strong>Hesaplanabilirlik ve Karmaşıklık</strong>. Durma problemi, Rice teoremi ve indirgemeler bir sorunun çözülemez olduğunu kanıtlamayı öğretir; P, NP, PSPACE sınıfları ise çözülebilir olanların ne kadar pahalı olduğunu. Hiyerarşi dilbilime de geri döndü: 1985'te Stuart Shieber, İsviçre Almancasındaki çapraz bağımlılıkların bağlamdan bağımsız bir gramerle yazılamayacağını gösterdi; Chomsky'nin doğal dil için başlattığı program, 'hangi basamakta' sorusunu hâlâ tartışıyor. Hücresel otomatlar ve Kural 110 ise aynı soruyu fizik ve biyolojiye taşır: basit yerel kurallar, evrensel hesaplama gücünü ne zaman kazanır?",
    ],
    topics: ["Myhill–Nerode teoremi ve DFA küçültme", "Alt küme inşası (NFA → DFA)", "Bağlamdan bağımsız gramerler ve LR ayrıştırma", "Durma problemi ve indirgeme", "P, NP ve Cook–Levin teoremi", "Hücresel otomatlar ve Kural 110"],
  },
  quiz: [
    {
      question: "Sayfadaki dört durumlu makineye '0110' dizgisini verirsen hangi durumda biter ve kararı ne olur?",
      options: ["q0, KABUL", "q1, RED", "q2, RED", "q3, RED"],
      answer: 0,
      explanation: "Yol q0 —0→ q1 —1→ q3 —1→ q1 —0→ q0. İki 0 ve iki 1 var, ikisi de çift; çift çember q0'da olduğu için KABUL. Her 0 yatay, her 1 dikey komşuya atlatır; sayıyı değil tekliği hatırlar.",
    },
    {
      question: "n tane a'nın ardından n tane b gelen dizgilerden oluşan aⁿbⁿ dilini tanıyabilen en basit makine hangisidir?",
      options: ["Sonlu otomat (DFA)", "Yığınlı otomat (PDA)", "Doğrusal sınırlı otomat (LBA)", "Hiçbir makine tanıyamaz"],
      answer: 1,
      explanation: "Pompalama lemması DFA'yı eler: a'lar bölgesindeki döngü pompalanınca sayım bozulur. Yığın yeter: her a için jeton it, her b için çek; sonunda yığın boşsa kabul. Bu dil bağlamdan bağımsızdır, gramer S → aSb | ε.",
    },
    {
      question: "Belirlenimsiz sonlu otomat (NFA) ile belirlenimli olanı (DFA) karşılaştıran doğru cümle hangisidir?",
      options: ["NFA daha fazla dil tanır", "DFA daha fazla dil tanır", "Aynı dilleri tanırlar; DFA çok daha fazla durum gerektirebilir", "NFA yalnızca sonlu dilleri tanır"],
      answer: 2,
      explanation: "Rabin–Scott (1959): her NFA alt küme inşasıyla bir DFA'ya çevrilir, dil değişmez. Bedel durum sayısıdır: n durumlu NFA 2ⁿ durumlu DFA'ya şişebilir; 'sondan 20'nci sembol a' dili için 21'e karşı 1.048.576.",
    },
  ],
  next: [
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi", why: "Hiyerarşinin tepesinden sonrası: durma probleminin kanıtı, lambda hesabı ve karar verilemezlik." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Düzenli ifade sözcükleri, bağlamdan bağımsız gramer yapıyı tanır: kuramın bir derleyiciye dönüşmesi." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı", why: "Çözülebilen problemler ne kadar pahalı? P, NP ve büyüme hızları." },
    { href: "yasam-oyunu.html", title: "Yaşam Oyunu", why: "Üç kurallı bir hücresel otomatın Turing makinesi kadar güçlü olması: evrenselliğin en basit yüzü." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 18.404J Theory of Computation (Sipser, 2020)", url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", note: "Sonlu otomatlardan Turing makinelerine ve karmaşıklığa, ders videoları ve notlarıyla tam bir lisans dersi (İngilizce)." },
    { title: "Wikipedia · Chomsky hierarchy", url: "https://en.wikipedia.org/wiki/Chomsky_hierarchy", note: "Dört dil sınıfı, karşılık gelen gramer kısıtları ve otomatlar; 1956 ve 1959 makalelerinin kaynakları." },
    { title: "Stanford Encyclopedia of Philosophy · Turing Machines", url: "https://plato.stanford.edu/entries/turing-machine/", note: "Turing'in 1936 makalesi, evrensel makine, durma problemi ve Church–Turing tezinin tarihsel ve kavramsal anlatımı." },
    { title: "MDN · Regular expressions (JavaScript)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions", note: "Sayfadaki deney alanının kullandığı motorun belgeleri: kaçış karakterleri, çapalar, gruplar ve geri başvurular." },
  ],
  revision: "Ekim 2026",
};
