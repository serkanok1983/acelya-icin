window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bicimsel-diller-ve-otomata-teorisi"] = {
  slug: "bicimsel-diller-ve-otomata-teorisi",
  title: "Otomatlar: Dört Daireyle Düşünen Makine",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Dört daire ve sekiz ok, bir dizgiyi 'evet' ya da 'hayır' diye yargılayabilir; ama parantez saymak için bir yığın, her hesabı yapabilmek için bir bant gerekir. Hangi makine neyi başarabilir, bu sayfanın sorusu.",
  hook:
    "Sayfadaki dört daireli makineye '0101' ver: KABUL der. '01' ver: RED. Oysa bu makinenin defteri yok; okuduğu hiçbir simgeyi saklamıyor, yalnızca hangi dairenin üzerinde durduğunu biliyor. Dört daire tam olarak neyi hatırlayabilir, neyi asla hatırlayamaz? Ve neden aynı soru, 1936'da 23 yaşındaki bir öğrencinin 'hesaplamak ne demektir' sorusuna verdiği cevapla aynı yere çıkar?",
  bigIdea:
    "Bir dil bir <strong>dizgi kümesidir</strong>; onu tanıyan makinenin gücü, belleğinin biçimiyle belirlenir: sonlu durum → düzenli diller, yığın → bağlamdan bağımsız diller, bant → hesaplanabilen her şey. Chomsky hiyerarşisi bu belleklerin merdivenidir.",
  story: [
    "1928'de David Hilbert matematikçilere bir hedef gösterdi: verilen bir mantık formülünün her durumda geçerli olup olmadığına karar veren mekanik bir yöntem bulunsun. Buna <strong>Entscheidungsproblem</strong>, karar problemi dendi. 1936 baharında Cambridge'de 23 yaşındaki Alan Turing, soruyu cevaplamak için önce 'yöntem' sözcüğünü tanımlamak zorunda kaldı. O yıllarda 'computer' bir meslek adıydı: kâğıt, kalem ve kurallar listesiyle hesap yapan insan. Turing o insanı soydu: sonsuz bir kâğıt şerit, bir hücreyi okuyup yazan bir kafa ve sonlu sayıda 'akıl durumu'. 28 Mayıs 1936'da Londra Matematik Derneği'ne ulaşan makalesi iki şey kanıtladı: başka her makineyi taklit edebilen tek bir <strong>evrensel makine</strong> vardır; ve makinelerin davranışıyla ilgili öyle sorular vardır ki (bugünkü adıyla durma problemi gibi) hiçbir makine onlara her zaman doğru cevap veremez. Hilbert'in istediği yöntem yoktur. Princeton'da Alonzo Church aynı sonuca birkaç ay önce bambaşka bir yoldan, lambda hesabıyla varmıştı; iki tanımın aynı fonksiyonları yakaladığı kanıtlanınca 'mekanik hesap budur' iddiası sonradan Church–Turing tezi adını aldı.",
    "Küçük makineler büyük makineden sonra geldi. 1943'te Warren McCulloch ve Walter Pitts sinir hücrelerini açık-kapalı anahtarlar olarak modelledi; 1951'de Stephen Kleene bu ağların neyi 'fark edebildiğini' sordu ve cevabı üç işlemle yazdı: art arda ekleme, seçenek ve yıldız. <strong>Düzenli ifadeler</strong> böyle doğdu. 1959'da Michael Rabin ve Dana Scott, aynı anda birden çok yolu deneyebilen 'belirlenimsiz' otomatın belirlenimli olandan daha fazla dil tanımadığını, yalnızca daha az durumla yazıldığını gösterdi; bu çalışma 1976'da onlara Turing Ödülü getirdi. Aynı dönemde 27 yaşındaki dilbilimci Noam Chomsky, İngilizcenin gramerini matematikle yazmaya çalışıyordu. 1956 tarihli 'Three Models for the Description of Language' makalesinde gramerleri kısıtlarına göre dört basamağa dizdi; 1959'da hiyerarşiyi kesinleştirdi. Doğal dil için aradığını tam bulamadı, ama bilgisayar dilleri için tam ölçüyü vermişti: 1959–60'ta John Backus ve Peter Naur, ALGOL dilinin sözdizimini bugün <em>BNF</em> dediğimiz bağlamdan bağımsız kurallarla yazdı.",
    "1968'de Ken Thompson, Kleene'in ifadelerini bir metin editöründe hızlı aramanın yolunu yayımladı: yazdığın desen anında küçük bir otomata derleniyor, metin o otomattan tek geçişte geçiriliyordu. Birkaç yıl sonra Unix'teki <code>g/re/p</code> komutu ayrı bir programa dönüştü; adı <code>grep</code>. Bugün kod editöründeki 'bul ve değiştir'den form doğrulamaya kadar pek çok metin eşleştirme, bu sayfadaki dört daireli makinenin torunlarıyla çalışır. Derleyiciler de aynı merdiveni iner: önce düzenli bir otomat kaynak kodu sözcüklere böler, sonra yığınlı bir otomat parantezleri ve blokları eşler. 1971'de Stephen Cook, merdivenin tepesinde, hesaplanabilen problemlerin içinde yeni bir soru açtı: cevabı hızla <em>doğrulanabilen</em> her problem hızla <em>çözülebilir</em> mi? P = NP sorusu 2000'den beri Clay Enstitüsü'nün bir milyon dolarlık ödülüyle açık duruyor.",
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
        "Bir DFA'nın hatırladığı tek şey şu an hangi durumda olduğudur; okuduğu sembollere geri dönemez, sınırsız sayamaz. Buna rağmen sayfadaki dört durum şaşırtıcı bir şeyi hatırlar: şimdiye kadar okunan 0'ların ve 1'lerin <em>tekliğini</em>. q0 'ikisi de çift', q1 'tek 0, çift 1', q2 'çift 0, tek 1', q3 'ikisi de tek' demektir. Bir 0 okumak yatay komşuya, bir 1 okumak dikey komşuya atlatır. Makine sayıyı değil, yalnızca iki evet-hayır bilgisini taşır; dört durum tam da 2 × 2 olasılıktır. Dizgi bitince makine çift çemberli bir <strong>kabul durumunda</strong> ise evet, değilse hayır. Dili belirleyen yalnızca oklar ve çift çemberlerdir: çift çember q0'da olduğu için bu makinenin dili 'çift sayıda 0 ve çift sayıda 1 içeren dizgiler'dir; q0 aynı zamanda başlangıç durumu olduğundan boş dizgi de dildedir. Çift çemberi q2'ye taşısaydın oklara dokunmadan bambaşka bir dil, 'çift 0, tek 1' tanınırdı.",
      formula: "δ: Q × Σ → Q,  w ∈ L ⇔ δ*(q₀, w) ∈ F",
      formulaNote: "δ geçiş fonksiyonu: (durum, sembol) → yeni durum. δ* bütün dizgiyi okuduktan sonraki durum, F kabul durumları kümesi.",
    },
    {
      heading: "Düzenli ifade ve otomat aynı şeyin iki dilidir",
      body:
        "Kleene'in üç işlemi, ekleme (ab), seçenek (a|b) ve yıldız (a*: sıfır ya da daha çok tekrar), tam olarak sonlu otomatların tanıyabildiği dilleri üretir; buna <strong>Kleene teoremi</strong> denir. Her düzenli ifade bir otomata, her otomat bir düzenli ifadeye çevrilebilir. Sayfadaki teklik (parite) makinesinin ifadesi şudur: <code>^(00|11|(01|10)(00|11)*(01|10))*$</code>. Okunuşu: ya aynı iki sembol gelir ve hiçbir şey değişmez, ya da farklı iki sembolle 'ikisi de tek' bölgesine girilir ve yine farklı iki sembolle çıkılır. Belirlenimsiz otomat (NFA) aynı dili çoğu zaman çok daha az durumla yazar; ama Rabin–Scott alt küme inşası onu DFA'ya çevirirken durum sayısı en kötü hâlde 2ⁿ'ye fırlar.",
      formula: "Regex ≡ NFA ≡ DFA  (tanınan diller aynı)",
      formulaNote: "Eşdeğerlik dil için geçerlidir, boyut için değil: n durumlu bir NFA'nın en küçük DFA'sı 2ⁿ durum gerektirebilir.",
    },
    {
      heading: "Pompalama: sonlu belleğin sınırı",
      body:
        "p durumlu bir makine en az p uzunlukta bir dizgi okurken, güvercin yuvası ilkesi gereği, ilk p sembol içinde bir durumu iki kez ziyaret eder; aradaki parça bir döngüdür. Döngüyü istediğin kadar tekrarlarsan (pompalarsan) ya da hiç dolaşmazsan makine farkı göremez, aynı durumda biter. Bu gözlem <strong>pompalama lemması</strong>dır ve bir dilin düzenli <em>olmadığını</em> kanıtlamanın standart yoludur. Örnek: aⁿbⁿ, yani n tane a ardından n tane b. Dilin p durumlu bir DFA'sı olsaydı w = aᵖbᵖ dizgisini kabul ederdi; döngü ilk p sembolün içinde olduğundan yalnızca a'lardan oluşur. Onu bir kez daha dolaşınca a sayısı artar, b sayısı yerinde kalır; makine yine kabul eder, ama dizgi artık dilde değildir. Çelişki: aⁿbⁿ düzenli olamaz. Dengeli parantezler de aynı nedenle düzenli değildir; ikisi için de Chomsky merdiveninde bir basamak yukarı çıkmak gerekir. <strong>Yığın</strong> eklenmiş otomat (PDA) her a için bir jeton iter, her b için bir jeton çeker; gramer tek satırdır: S → aSb | ε.",
      formula: "w = xyz,  |y| ≥ 1,  |xy| ≤ p  ⇒  xyⁱz ∈ L  (her i ≥ 0)",
      formulaNote: "p makinenin durum sayısı (pompalama uzunluğu); |w| ≥ p olan her w ∈ L böyle bölünebilir. Lemma 'düzenli ise böyle davranır' der; düzenli olmadığını göstermek için karşıt tersi kullanılır.",
    },
    {
      heading: "Bant: hiyerarşinin tepesi ve tavanı",
      body:
        "Yığının kusuru, yalnızca en üstteki jetona bakabilmesidir; aⁿbⁿcⁿ için iki sayıyı birden tutmak gerekir ve PDA onu tanıyamaz. Bandı girdi uzunluğuyla sınırlı bir makine (LBA) bunu başarır; bu, hiyerarşinin üçüncü basamağıdır. Turing makinesi son kısıtı da kaldırır: sonsuz bant, istediği hücreye gidip okuyan ve yazan bir kafa, sonlu bir durum tablosu. Sayfadaki makine bu yapıyla ikili sayıya 1 ekler: sağa yürü, bandın sonunu bul, geri dön, 1'leri 0 yaparak elde taşı, ilk 0'ı 1 yap, dur. Üç durum (q0, q1 ve durma) ile altı satırlık bir kural tablosu, 'bir ekle' işleminin tamamı. Church–Turing tezi, mekanik yoldan hesaplanabilen her şeyin bu makineyle hesaplanabildiğini söyler; bugüne kadar hiçbir fiziksel bilgisayar tezi aşamamıştır. Tavan da buradadır: Turing'in 1936 kanıtından çıkan sonuçla, her makinenin durup durmayacağına karar veren bir makine var olamaz. Hiyerarşinin üstünde 'her şey' yoktur; hesaplanamayan sorular vardır.",
      formula: "δ: Q × Γ → Q × Γ × {L, R}",
      formulaNote: "Γ bant alfabesi (girişe ek olarak boş hücre B). Her kural: (durum, okunan) → (yeni durum, yazılan, kafa yönü).",
    },
  ],
  lab: {
    intro:
      "Sayfada altı panel var. <strong>Chomsky piramidi</strong>nin dört katmanı tıklanınca açıklama verir. <strong>DFA simülatörü</strong>nde bir metin kutusu ile <strong>⏭️ Adım</strong>, <strong>▶️ Çalıştır</strong> ve <strong>↺ Sıfırla</strong> düğmeleri var; altındaki satır durumu, kalan dizgiyi ve sonunda KABUL ya da RED kararını yazar. Kutuya yazdığın her dizgi makineyi q0'a döndürür; alfabe yalnızca 0 ve 1'dir, başka bir karakterde makine uyarı verip durur. <strong>Turing makinesi</strong>nde Adım, Çalıştır, Sıfırla ve <strong>🎲 Yeni Bant</strong> (1 ile 15 arasında rastgele bir sayı) var; durum satırı bandı, onluk değerini ve kafanın hücre numarasını gösterir. <strong>Regex deney alanı</strong>nda iki kutu (Regex ve Test) ile EŞLEŞTİ/EŞLEŞMEDİ etiketi vardır; eşleştirme JavaScript'in <code>RegExp</code> motoruyla yapılır. Karmaşıklık kartlarının tanımı fareyle üzerinde bekleyince, otomata kartlarınınki tıklayınca görünür.",
    experiments: [
      {
        title: "Dört daire neyi hatırlıyor?",
        predict:
          "Varsayılan dizgi '0101'de iki 0 ve iki 1 var. Makine hangi durumda biter? '01', '1', '11' ve '0110' için karar ne olur? Kutuyu tamamen boşaltırsan makine ne der: hiçbir şey okumamış bir makine kabul edebilir mi?",
        do: "Hiçbir şeyi değiştirmeden ▶️ Çalıştır'a bas ve sarı dairenin yolunu izle. Sonra kutuya sırayla '01', '1', '11', '0110' yaz; her birinden sonra Çalıştır'a bas ve alt satırdaki 'Son durum'u not et. Ardından kutuyu boşalt. En son '012' yazıp Çalıştır'a bas.",
        observe:
          "'0101' → KABUL, son durum q0 (yol q0→q1→q3→q2→q0). '01' → RED, q3. '1' → RED, q2. '11' → KABUL, q0. '0110' → KABUL, q0. Boş kutu → KABUL: ε hiç adım atmadan q0'da biter. '012' → makine 0 ve 1'i okuyup q3'e gelir, 2'de 'alfabede yok' uyarısıyla durur; karar vermez.",
        explain:
          "Her 0 makineyi yatay, her 1 dikey komşuya geçirir; iki kez aynı yöne gitmek başa döndürür. Bu yüzden son durum yalnızca 0'ların ve 1'lerin tekliğine bağlıdır, sıralarına değil: '0110' ile '0011' aynı yerde biter. Boş dizginin kabulü bir tuhaflık değil, tanımın gereğidir: sıfır çifttir ve başlangıç durumu aynı zamanda kabul durumudur. '2' ise alfabenin dışındadır; biçimsel bir dilde alfabede olmayan sembol içeren dizgi hakkında soru bile sorulmaz.",
      },
      {
        title: "Elde taşıma: Turing makinesi kaç adımda biter?",
        predict:
          "Bant 1011 (11). Makine bir adım sağa yürüyüp boşluğu bulacak, geri dönecek, sondaki 1'leri 0 yapıp ilk 0'ı 1 yapacak. Sondaki art arda 1'lerin sayısına t dersen adım sayısı t + 3 olmalı: 1011 için 5. Ara adımlarda bandın onluk değeri ne olur, hiç küçülür mü?",
        do: "↺ Sıfırla'ya bas, sonra ⏭️ Adım'a her basışta durum satırını not et. Bitince 🎲 Yeni Bant'a bas; 111 (7) ya da 1111 (15) gelene kadar tekrarla ve aynı sayımı yap. 110 (6) gibi 0 ile biten bir bant gelirse onu da say.",
        observe:
          "1011: adım 1 q0, Kafa [4]; adım 2 q1, Kafa [3]; adım 3 bant 1010 (10); adım 4 bant 1000 (8); adım 5 HALT, 1100 (12). Tam 5 adım. 111 için 6 adım: bant 110 (6), 100 (4), sonra sola yeni bir hücre açılıp 0000 (0) ve HALT'ta 1000 (8). 1111 için 7 adım, 10000 (16). 110 (6) gibi 0 ile bitenlerde yalnızca 3 adım.",
        explain:
          "Sayım kuraldan çıkar: 1 adım sağa, 1 adım geri dönüş, her sondaki 1 için bir elde adımı, 1 adım da yazıp durma; toplam t + 3. Elde taşıma, kâğıt üzerinde yaptığınla aynıdır: her 1 bir 0 olur ve elde sola taşınır; ilk 0 eldeyi yutar. Ara adımlarda bant 'yalan söyler' (11 iken 10, sonra 8 görünür); hesap bitene kadar ara değerin anlamı yoktur. Bütün hücreler 1 ise bant solda büyür: sonsuz bant tam bunun içindir. En kötü durumda adım sayısı bit sayısıyla doğru orantılıdır; n bitlik sayıya 1 eklemek O(n) adımdır.",
      },
      {
        title: "Bir karakterin gücü: nokta, ters bölü, çapa",
        predict:
          "Regex kutusunda <code>^[a-z]+@[a-z]+\\.(com|org)$</code>, Test kutusunda 'test@example.com' var ve etiket EŞLEŞTİ diyor. Test metnini 'test@example.net', 'Test@example.com' ve 'xx test@example.com' yaparsan hangileri geçer? Desendeki ters bölüyü silersen 'test@examplexcom' geçer mi?",
        do: "Test kutusuna sırayla üç metni yaz ve etiketi oku. Sonra desenin başındaki ^ ve sonundaki $ işaretlerini silip 'xx test@example.com'u yeniden dene; işaretleri geri koy. Son olarak noktanın önündeki ters bölüyü sil ve Test kutusuna 'test@examplexcom' yaz.",
        observe:
          "Açılışta ✅ EŞLEŞTİ. '.net' → ❌ (seçenek yalnızca com|org). Büyük T → ❌ ([a-z] yalnızca küçük harf). Başında 'xx ' olan metin → ❌; ^ ve $ silinince aynı metin → ✅. Ters bölü silinince 'test@examplexcom' → ✅: içinde hiç nokta olmayan bir adres geçti.",
        explain:
          "^ ve $ dizginin başını ve sonunu sabitler; onlar olmadan motor deseni metnin herhangi bir yerinde arar, yani dil 'tam bu biçimdeki dizgiler'den 'içinde bu biçim geçen dizgiler'e genişler. Düzenli ifadede çıplak nokta 'herhangi bir karakter' demektir; <code>\\.</code> ise gerçek nokta. Tek bir ters bölü, tanınan dili değiştirir. Biçimsel diller bu yüzden 'biçimsel'dir: desenin anlamı niyetinde değil, sembollerindedir.",
      },
      {
        title: "Dört daireyi tek satıra sığdır, sonra sınırı aş",
        predict:
          "Kleene teoremine göre DFA'nın dili bir düzenli ifadeyle yazılabilir. <code>^(00|11|(01|10)(00|11)*(01|10))*$</code> deseni, Deney 1'deki dizgilerde DFA ile aynı kararı verir mi? Boş Test kutusu için ne der?",
        do: "Deseni Regex kutusuna yaz. Test kutusuna sırayla '0101', '01', '11', '0110', '0100' yaz; en sonunda kutuyu tamamen boşalt. Ardından deseni <code>^(.+)\\1$</code> yap ve 'abcabc', 'abcab', '0101', '0110' dene.",
        observe:
          "'0101' ✅, '01' ❌, '11' ✅, '0110' ✅, '0100' ❌: DFA ile birebir aynı. Boş kutu ✅ (yıldız sıfır tekrara izin verir; DFA da ε'u q0'da kabul eder). İkinci desende 'abcabc' ✅, 'abcab' ❌, '0101' ✅, '0110' ❌: yalnızca 'bir parçanın iki kez tekrarı' biçimindeki dizgiler geçer.",
        explain:
          "İlk desen, aynı dilin otomatsız yazımıdır: dizgiyi ikişer ikişer okur; 00 ve 11 tekliği değiştirmez, 01 ya da 10 'ikisi de tek' durumuna götürür ve oradan yine 01 ya da 10 ile dönülür. İkinci desendeki <code>\\1</code> bir <strong>geri başvuru</strong>dur: 'birinci grupta ne yakaladıysan aynısı'. Bu, ww dilidir ve sonlu otomat onu tanıyamaz; pompalama lemması bunu yasaklar, dil bağlamdan bağımsız bile değildir. JavaScript'in 'regex'i bu yüzden adının söylediğinden daha güçlü, Chomsky'nin 3. tipinden daha yukarıdadır. Pratik araç ile matematiksel tanım her zaman örtüşmez.",
      },
    ],
  },
  wow: [
    {
      title: "Altmış yıllık soru: tahmin etmek işe yarar mı?",
      body:
        "Sonlu otomatta belirlenimsizlik güç katmaz (Rabin ve Scott); yığınlı otomatta katar: çift uzunluklu palindromları tanımak için dizginin ortasını tahmin etmek gerekir, belirlenimli bir yığın bunu yapamaz. Peki bandı girdi uzunluğuyla sınırlı makinede (LBA)? 1964'te S.-Y. Kuroda iki soru sordu. Birincisi, bağlama duyarlı dillerin tümleyenlerinin de bağlama duyarlı olup olmadığıydı; 1987'de Neil Immerman ve Róbert Szelepcsényi birbirinden habersiz 'evet' diye kanıtladı. İkincisi, belirlenimli LBA'nın belirlenimsiz olanla aynı dilleri tanıyıp tanımadığı, bugün hâlâ açık. Hiyerarşinin bir basamağında 'tahmin etmek işe yarar mı' sorusunun cevabını altmış yılı aşkın süredir kimse bilmiyor.",
    },
    {
      title: "Yirmi bir durumdan bir milyon duruma",
      body:
        "'Sondan n'inci sembolü a olan dizgiler' dilini belirlenimsiz bir otomat n + 1 durumla tanır: a'yı gördüğünde 'belki de bu sondan n'incidir' diye tahmin eder ve n adım sayar. Aynı dilin en küçük DFA'sı ise 2ⁿ durum ister; çünkü son n sembolün hepsini aklında tutmak zorundadır: son n sembolü farklı olan iki dizgi, uygun bir devamla biri dilde biri dışında kalacak biçimde ayrılabilir (Myhill–Nerode ölçütü). n = 20 için 21 duruma karşılık 1.048.576 durum. Rabin ve Scott'ın 1959'da gösterdiği eşdeğerlik dil için geçerlidir, boyut için değil.",
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
      "İkili yazılmış bir sayıyı soldan sağa okuyan ve sayı 3'e bölünebiliyorsa kabul eden bir sonlu otomat tasarla. Makinenin daha az durumla kurulamayacağını göster; sonra sayfadaki Turing makinesinin başlangıç bandı 1011 (11) ve bitiş bandı 1100 (12) üzerinde otomatını elle çalıştır ve Regex kutusunda doğrula.",
    steps: [
      "Hatırlanması gereken tek şeyi bul: şimdiye kadar okunan sayının 3'e bölümünden kalan. Yalnızca üç olasılık var: 0, 1, 2. Demek ki üç durum yeter: r0, r1, r2. Başlangıç r0 (hiçbir şey okunmadı, değer 0), kabul durumu da r0.",
      "Geçiş kuralını türet: sağa bir bit eklemek sayıyı ikiyle çarpıp biti eklemektir, N′ = 2N + b. Kalan için de aynısı geçerlidir: r′ = (2r + b) mod 3. Tablo: r0 —0→ r0, r0 —1→ r1, r1 —0→ r2, r1 —1→ r0, r2 —0→ r1, r2 —1→ r2.",
      "1100 (12) için çalıştır: r0 —1→ r1 —1→ (2·1+1 = 3 → 0) r0 —0→ r0 —0→ r0. Bitiş r0: KABUL. Gerçekten 12 = 3·4.",
      "1011 (11) için çalıştır: r0 —1→ r1 —0→ r2 —1→ (2·2+1 = 5 → 2) r2 —1→ (5 → 2) r2. Bitiş r2: RED. Gerçekten 11 = 3·3 + 2; durumun adı kalanı söylüyor.",
      "Üç durum gerçekten gerekli mi? ε, 1 ve 10 dizgilerine bak (kalanları 0, 1, 2). ε dildedir, 1 ve 10 değildir; 1 ile 10'u da sona bir 1 eklemek ayırır: 11 = 3 dildedir, 101 = 5 değildir. Hiçbir ikisi aynı durumda bitemez; öyleyse en az üç durum şarttır (Myhill–Nerode).",
      "Sayfada doğrula: Regex kutusuna <code>^(0|1(01*0)*1)*$</code> yaz; bu, aynı üç durumlu makinenin düzenli ifade biçimidir. Test kutusuna 1100 → EŞLEŞTİ, 1011 → EŞLEŞMEDİ, 10010 (18) → EŞLEŞTİ.",
    ],
    result:
      "Üç durum, altı ok, daha azı olmaz: sayının tamamını değil, yalnızca kalanını hatırlayan bir makine sonsuz sayıda sayıyı doğru yargılar. Sonlu otomatın sırrı budur: hatırlaman gereken şeyin sonlu olduğu her soru ona sığar. Aynı yöntem her m için m durumlu bir 'm'ye bölünür mü' makinesi verir: r′ = (2r + b) mod m.",
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
        "Karar verilemezlik hız sorunu değildir; kanıt, 'durma kararı veren' hangi makineyi kurarsan kur, onu yanıltan bir girdi inşa eder. Daha hızlı donanım cevabı bekleme süresini kısaltır, var olmayan bir cevabı yaratmaz. Belirli programlar için durma kararı verilebilir; genel bir yöntem olmaz.",
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
      question: "Sayfadaki Turing makinesi 1011 (11) bandında 5, 111 (7) bandında 6 adımda duruyor. Aynı makine 10111 (23) bandında kaç adımda durur ve bantta ne kalır?",
      options: ["5 adım, 11000 (24)", "6 adım, 11000 (24)", "8 adım, 11000 (24)", "6 adım, 10000 (16)"],
      answer: 1,
      explanation: "Adım sayısı bandın uzunluğuna değil, sondaki art arda 1'lerin sayısına (t) bağlıdır: 1 adım sağa, 1 adım geri dönüş, t elde adımı ve 1 yazma adımı, toplam t + 3. 10111'de t = 3, yani 6 adım; üç 1 sıfırlanır, soldaki 0 bire döner: 11000 = 24. 1011'de t = 2 (5 adım), 111'de t = 3 (6 adım) aynı kuralı doğrular.",
    },
  ],
  next: [
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi: Turing Makineleri, Lambda Hesabı ve Çözülemezlik", why: "Hiyerarşinin tepesinden sonrası: tablosunu düzenleyebildiğin gerçek bir Turing makinesi, adım adım çalışan bir lambda indirgeyicisi ve köşegen tablosuyla durma probleminin kanıtı." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Düzenli ifade sözcükleri, bağlamdan bağımsız gramer yapıyı tanır: tokenleştirici simülatörü ve sözdizimi ağacıyla kuramın derleyiciye dönüşmesi." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "Çözülebilen problemler ne kadar pahalı? Big-O ve büyüme sınıflarını karşılaştıran etkileşimli grafik." },
    { href: "yasam-oyunu.html", title: "Yaşam Oyunu", why: "İki kurallı bir hücresel otomatın Turing makinesi kadar güçlü olması: evrenselliğin en yalın yüzlerinden biri." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 18.404J Theory of Computation (Sipser, 2020)", url: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", note: "Sonlu otomatlardan Turing makinelerine ve karmaşıklığa, ders videoları ve notlarıyla tam bir lisans dersi (İngilizce)." },
    { title: "Wikipedia · Chomsky hierarchy", url: "https://en.wikipedia.org/wiki/Chomsky_hierarchy", note: "Dört dil sınıfı, karşılık gelen gramer kısıtları ve otomatlar; 1956 ve 1959 makalelerinin kaynakları." },
    { title: "Stanford Encyclopedia of Philosophy · Turing Machines", url: "https://plato.stanford.edu/entries/turing-machine/", note: "Turing'in 1936 makalesi, evrensel makine, durma problemi ve Church–Turing tezinin tarihsel ve kavramsal anlatımı." },
    { title: "MDN · Regular expressions (JavaScript)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions", note: "Sayfadaki deney alanının kullandığı motorun belgeleri: kaçış karakterleri, çapalar, gruplar ve geri başvurular." },
  ],
  revision: "Kasım 2026",
};
