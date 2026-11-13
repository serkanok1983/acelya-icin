window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["ispat-yontemleri"] = {
  slug: "ispat-yontemleri",
  title: "İspat Yöntemleri: Örnekten Kesinliğe",
  field: "Matematik",
  level: "Lise",
  minutes: 45,
  tagline: "Doğrudan ispat, karşıt ters, çelişki, durumlara ayırma, varlık ve tümevarım: her yöntemi bir hesap tezgâhında sayılarla izleyin, karışık adımlardan ispat kurun, hatalı ispatın kopuk halkasını bulun.",
  hook: "n² + n + 41 ifadesine 0, 1, 2 … verin: 41, 43, 47, 53 … tam kırk kez üst üste asal sayı çıkar. Kırk birinci denemede, n = 40'ta, sonuç 1681 = 41 · 41 olur. Kırk başarı bir yasa değildi. Peki sonsuz sayıda durumun hepsinde doğru olduğunu nasıl bilebiliriz?",
  bigIdea: "Örnekler bir iddiayı ancak çürütebilir, kanıtlayamaz; ispat ise tanımlardan ve önceden kanıtlanmış sonuçlardan, her satırı bir gerekçeye dayanan bir zincirle sonsuz sayıda durumu birden kapsar.",
  story: [
    "Bilinen en eski ve hâlâ okullarda anlatılan ispatlardan biri Öklid'in <em>Elemanlar</em>'ında, IX. kitabın 20. önermesindedir: asallar, önerilen herhangi bir asal topluluğundan daha çoktur. Öklid sonsuzluktan söz etmez; elinize verilen her sonlu asal listesinin dışında bir asal bulunduğunu gösterir. Bugün kitapların çoğu bu ispatı çelişki biçiminde anlatır, ama Öklid'in kendi akıl yürütmesi doğrudandır: listedeki asalları çarpar, 1 ekler ve bu sayının bir asal böleninin listede olamayacağını gösterir. Sayfadaki \"Öklid'in sayısı\" tezgâhı bu yapıyı her k için kurar.",
    "√2'nin hiçbir kesre eşit olmadığının keşfi, Pisagorcularla ilgili en ünlü anlatılardan birine bağlanır. <strong>Efsaneye göre</strong> Metapontumlu Hippasus bu sırrı açığa vurduğu için denizde boğulmuştur. Antik kaynaklar ise birbirini tutmaz: Pappus sırrı ilk yayan kişinin boğulduğunu söyler ama adını vermez; Iamblichus'un anlatılarının birinde irrasyoneli açığa vuran bir Pisagorcu yalnızca topluluktan dışlanır, bir başkasında Hippasus küre içine düzgün on iki yüzlüyü çizmeyi açıkladığı için denizde boğulur. Hiçbir antik yazar keşfi açıkça Hippasus'a vermez; bu bağlantı sonradan yapılmış bir çıkarımdır.",
    "Büyük matematikçiler de örneklere fazla güvendi. Fermat, 2^(2ⁿ) + 1 biçimindeki sayıların hepsinin asal olduğunu tahmin etti; ilk beşi, 3, 5, 17, 257 ve 65 537 gerçekten asaldır. Euler 1732'de altıncısını, F₅'i 641'e bölerek tahmini çürüttü: 4 294 967 297 = 641 · 6 700 417. Bugün bunlardan başka asal Fermat sayısı bilinmiyor. Euler'in kendisi de k² − k + 41 ifadesinin k = 1'den 40'a kadar hep asal verdiğini yayımladı; bu, kancadaki ifadenin bir kaydırılmış biçimidir. Neden 41? Georg Rabinowitsch 1913'te, n² + n + p'nin n = 0'dan p − 2'ye kadar hep asal olmasını 1 − 4p ile kurulan bir sayı cisminin sınıf sayısının 1 olmasına bağladı. Bu cisimlerin tam listesini Kurt Heegner 1952'de verdi; ispatı ancak Alan Baker ve Harold Stark 1966'da sonucu bağımsız olarak kanıtladıktan sonra kabul gördü. Buradan bu türden yalnızca altı \"Euler'in şanslı sayısı\" olduğu çıkar: 2, 3, 5, 11, 17, 41.",
    "Tümevarımın da uzun bir öncesi var. 1000 yılı dolaylarında el-Kerecî aritmetik dizilerde ve binom açılımında tümevarıma benzeyen bir akıl yürütme kullandı; eseri kayıptır, ona yaklaşık 1150'de es-Semev'el'in kitabından ulaşırız. Francesco Maurolico 1575'te, ilk n tek sayının toplamının n² olduğunu bu teknikle gösterdi; ilkenin ilk açık ifadesi ise Pascal'ın 1665'te yayımlanan <em>Traité du triangle arithmétique</em>'indedir. Bugünkü biçimsel hâline 19. yüzyılda Boole, De Morgan, Peirce, Peano ve Dedekind'in çalışmalarıyla kavuştu. Sınırı da açıktır: Goldbach 7 Haziran 1742'de Euler'e yazdığı mektupla başlayan tartışmada ortaya çıkan san bugün 4 × 10¹⁸'e kadar denenmiş, yine de kanıtlanamamıştır.",
  ],
  core: [
    {
      heading: "Önerme, niceleyici ve karşı örnek",
      body: "<strong>Önerme</strong>, doğru ya da yanlış olduğu belli olan bir cümledir: \"7 asaldır\" doğru, \"7 çifttir\" yanlıştır; \"x > 3\" ise x bilinmedikçe önerme değil, <strong>açık önermedir</strong>. Matematiksel iddiaların çoğu bir <strong>niceleyici</strong> taşır: \"her n için\" (∀) ya da \"en az bir n için\" (∃). Değil alınınca niceleyiciler yer değiştirir: \"her asal tektir\"in değili \"her asal çifttir\" değil, \"tek olmayan bir asal vardır\"dır ve 2 bunu hemen gösterir. İşin asimetrisi buradan doğar: bir \"her\" iddiasını çürütmek için tek bir <strong>karşı örnek</strong> yeter, ama onu kanıtlamak için hiçbir örnek yığını yetmez. İki niceleyicinin sırası da önemlidir: \"her n için n'den büyük bir asal vardır\" doğru, \"bütün n'lerden büyük bir asal vardır\" yanlıştır.",
      formula: "¬∀n P(n) ≡ ∃n ¬P(n)  ·  ¬∃n P(n) ≡ ∀n ¬P(n)  ·  ¬(p ⇒ q) ≡ p ∧ ¬q",
      formulaNote: "Sayfanın 01 sekmesindeki altı değilleme sorusu bu üç kuralı sınar; 5. sekmedeki dokuzuncu hatalı ispat, niceleyicilerin yerini değiştirmenin nasıl yanlış bir sonuç ürettiğini gösterir.",
    },
    {
      heading: "Koşullu önerme, karşıtı, tersi ve karşıt tersi",
      body: "\"p ise q\" yalnız p doğru, q yanlışken yanlıştır. Ondan üç önerme türetilir; Türk ders kitaplarındaki adlarıyla <strong>karşıtı</strong> q ⇒ p, <strong>tersi</strong> ¬p ⇒ ¬q, <strong>karşıt tersi</strong> ¬q ⇒ ¬p. p ⇒ q'yu yanlışlayan bir sayı p'yi sağlar, q'yu sağlamaz; aynı sayı ¬q'yu sağlar, ¬p'yi sağlamaz, yani karşıt tersi de yanlışlar. Bu yüzden önerme ile karşıt tersi her zaman aynı değeri alır. Karşıtı ile tersi de birbirine denktir, ama önermeye değil. <strong>Karşıt ters ile ispat</strong> bu denkliği kullanır: \"n² çiftse n çifttir\"i doğrudan göstermek zordur, çünkü n² = 2m'den n'ye inmek için karekök almak gerekir. Karşıt tersi ise kolaydır: n = 2k + 1 tekse n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1 de tektir.",
      formula: "p ⇒ q ≡ ¬q ⇒ ¬p  ·  q ⇒ p ≡ ¬p ⇒ ¬q",
      formulaNote: "Adlar kaynaktan kaynağa değişir: lise ders kitapları burada verilen adları kullanır, bazı sınav kitaplarında karşıt ile ters yer değiştirir, mantık sayfası karşıt için \"evrik\" der; bazı kitaplar ¬p yerine p′ yazar. Ada değil biçime bakın. 01 sekmesindeki dörtlü tablo, her biçimin karşı örneklerini 1'den N'ye kadar sayarak bu denklikleri gösterir.",
    },
    {
      heading: "Çelişki ile ispat: √2 bir kesir değildir",
      body: "Bir q önermesini kanıtlamak için ¬q'yu varsayıp bir önermeyle değilinin birlikte doğru olduğu bir duruma varılır; böyle bir durum imkânsız olduğundan varsayım yanlıştır. Klasik örnek: √2 = p/q olsun; p ve q pozitif tam sayılar ve kesir sadeleşmiş, yani 1'den büyük ortak bölenleri yok. Kare alınca p² = 2q², demek ki p² çifttir; karşıt ters ile kanıtlanan sonuca göre p de çifttir, p = 2r. Yerine konunca 4r² = 2q², yani q² = 2r²; aynı gerekçeyle q de çifttir. O hâlde 2, hem p'yi hem q'yu böler ve bu, kesrin sadeleşmiş olmasıyla çelişir. Demek ki √2 hiçbir p/q'ya eşit değildir. Dikkat: ispat, \"her pozitif rasyonel sayı sadeleşmiş bir kesirle yazılabilir\" bilgisine dayanır ve onu açıkça söyler.",
      formula: "p² = 2q² ⇒ p = 2r ⇒ q² = 2r² ⇒ 2 | q",
      formulaNote: "02 sekmesindeki \"√2 için kesir ara\" tezgâhı her payda için en yakın payı dener: |p² − 2q²| en az 1'e iner, 0 olmaz. Bu ispatın öngördüğünün gözlemidir, ispatın kendisi değil.",
    },
    {
      heading: "Durumlara ayırma ve varlık ispatı",
      body: "<strong>Durumlara ayırmada</strong> bütün olasılıkları kapsayan birkaç hâl seçilir ve iddia her hâlde ayrı kanıtlanır. n çiftse n = 2k ve n² = 4k², 4'e bölümden kalan 0; n tekse n² = 4(k² + k) + 1, kalan 1. Buradan iki satırda yeni bir sonuç çıkar: iki karenin toplamı 4'e bölündüğünde 0, 1 ya da 2 kalanını verir, hiçbir zaman 3'ü değil; öyleyse 3, 7, 11, 15 … gibi 4k + 3 biçimli sayılar iki karenin toplamı olamaz. <strong>Varlık ispatı</strong> \"öyle bir x vardır\" der. Yapıcı olanı x'i gösterir: (k + 1)! + 2, …, (k + 1)! + (k + 1) sayılarının her biri, 2 ≤ j ≤ k + 1 için j'ye bölünür ve j'den büyüktür, yani k ardışık bileşik sayı vardır. Yapıcı olmayan ispat, √2^√2 rasyonel de olsa irrasyonel de olsa irrasyonel a, b ile aᵇ'nin rasyonel olabileceğini gösterir, ama hangi hâlin geçerli olduğunu söylemez.",
      formula: "n² ≡ 0 ya da 1 (mod 4)  ·  j | (k + 1)! + j,  2 ≤ j ≤ k + 1",
      formulaNote: "02 sekmesinde \"Hangi hâl?\" tezgâhı n = 7 için 49 = 4 · 12 + 1 gösterir; \"Ardışık bileşikler\" k = 5'te 722'den 726'ya beş bileşik sayıyı çarpanlarıyla listeler.",
    },
    {
      heading: "Tümevarım: taban, adım ve neden geçerli olduğu",
      body: "Her n ≥ 1 için P(n)'yi kanıtlamak için iki şey gösterilir: <strong>taban</strong> P(1) doğrudur; <strong>adım</strong>, her k ≥ 1 için P(k) doğruysa P(k + 1) de doğrudur. Örnek: 1 + 2 + … + n = n(n + 1)/2. Taban: 1 = 1 · 2/2. Adım: 1 + … + k + (k + 1) = k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2, ki bu P(k + 1)'dir. İlke neden geçerli? P'nin yanlış olduğu sayılar varsa, doğal sayıların her boş olmayan alt kümesinin bir en küçük elemanı bulunduğundan (iyi sıralama) bunların en küçüğü m olsun. P(1) doğru olduğundan m ≥ 2; m − 1 < m olduğundan P(m − 1) doğrudur ve adım P(m)'yi verir: çelişki. <strong>Güçlü tümevarımda</strong> P(k + 1) için daha küçük durumların hepsi kullanılır; 1'den büyük her sayının asalların çarpımı olduğu böyle kanıtlanır, çünkü k + 1 = a · b'deki a ve b, k'dan çok daha küçük olabilir.",
      formula: "P(1) ∧ ∀k ≥ 1 [P(k) ⇒ P(k + 1)]  ⇒  ∀n ≥ 1 P(n)",
      formulaNote: "İki parçadan biri eksikse hiçbir şey kanıtlanmaz: \"n² + n tektir\" iddiasının adımı doğrudur (tek + çift = tek), ama tabanı yanlıştır ve iddia hiçbir n için doğru değildir.",
    },
  ],
  lab: {
    intro: "Sayfa altı sekmeden oluşur: <strong>01 · Önerme ve niceleyici</strong> (cümle türleri, koşullu önermenin dörtlü tablosu, değilleme soruları), <strong>02 · Yöntemler</strong> (doğrudan, karşıt ters, çelişki, durumlara ayırma, varlık; her birinin yanında sayılarla izlenen bir tezgâh ve en sonda \"Karşı örnek ve iddiayı sına\" kum havuzu), <strong>03 · Tümevarım</strong> (domino modeli, toplam formülü, çarpan ağacı), <strong>04 · İspatı kur</strong> (karışık adımları sıralayıp gerekçe seçme), <strong>05 · Hatayı bul</strong> (dokuz hatalı ispat, yedi sık hata) ve <strong>06 · Alıştırma</strong> (dört düzeyli, tohumlu soru üreteci, ipucu ve adım adım çözüm). Bütün tam sayı hesapları kesin yapılır; yanıtlarınız hiçbir yere kaydedilmez ya da gönderilmez.",
    experiments: [
      {
        title: "Kırk başarı, bir yenilgi",
        predict: "n² + n + 41 ifadesi n = 0'dan başlayarak kaç kez üst üste asal verir? Sonsuza kadar mı, yoksa bir yerde bozulur mu? Bozulursa hangi n'de olabileceğini tahmin edin.",
        do: "02 · Yöntemler sekmesinde \"Karşı örnek ve iddiayı sına\" bölümüne inin. \"Hazır iddia\" menüsünde \"n² + n + 41 her n ≥ 0 için asaldır\" zaten seçili; \"Karşı örnek ara\" düğmesine basın. Sonra \"n² − n + 41 her n ≥ 1 için asaldır\"ı seçip yeniden arayın.",
        observe: "İddia 0 ≤ n ≤ 1000 aralığı için kurulur, ama arama ilk karşı örnekte durur: \"Denenen n\" 41, \"Karşı örnek\" n = 40, durum satırı \"1681 = 41 · 41\" der ve önceki 40 başarılı denemenin bunu değiştirmediğini ekler. Euler'in biçimi n² − n + 41 ise n = 41'de 1681 ile bozulur.",
        explain: "Tek bir karşı örnek tümel iddiayı çürütür. Bozulmanın yeri tesadüf değildir: n = 40 için n² + n + 41 = 40² + 40 + 41 = 40 · 41 + 41 = 41². Genel olarak n² + n + p, n = p − 1'de (p − 1)² + (p − 1) + p = p² verir; yani hiçbir p için ifade sonsuza kadar asal kalamaz.",
      },
      {
        title: "Yüz bin deneme yetmez",
        predict: "991n² + 1 hiç tam kare olur mu? n'yi 1'den 100 000'e kadar denediğinizde bir karşı örnek bulunmazsa iddiayı doğru sayar mıydınız?",
        do: "Aynı kum havuzunda \"Hazır iddia\" menüsünden \"991n² + 1 hiçbir n ≥ 1 için tam kare değildir\"i seçin ve \"Karşı örnek ara\"ya basın. \"Bu iddia hakkında\" notunu sonuna kadar okuyun.",
        observe: "\"Denenen n\" 100 000, \"Karşı örnek\" bulunmadı. Not ise iddianın yanlış olduğunu söyler: 991n² + 1'i tam kare yapan en küçük n, 29 basamaklı 12 055 735 790 331 359 447 442 538 767 sayısıdır; sayfa bu çözümü √991'in zincir kesrinden hesaplayıp eşitliği tam sayı aritmetiğiyle doğrular.",
        explain: "Başarısız bir arama ispat değildir: sonsuz sayıda n vardır ve hiçbir sonlu tarama hepsini kapsamaz. Buradaki iddia, x² − 991n² = 1 Pell denkleminin hiç pozitif çözümü olmadığını söylemekle aynıdır; çözüm vardır ama ilki bir trilyonu çok aşan bir sayıdadır. Goldbach notu da aynı dersi tersinden verir: 4 × 10¹⁸'e kadar denenmiş bir san hâlâ teorem değildir.",
      },
      {
        title: "Karşıtı ile karşıt tersi",
        predict: "\"n 4'e bölünüyorsa çifttir\" doğru. Karşıtı \"n çiftse 4'e bölünür\" ve karşıt tersi \"n çift değilse 4'e bölünmez\" de doğru mu? Ya \"2ⁿ − 1 asal ise n asaldır\" doğruysa, \"n asal ise 2ⁿ − 1 asaldır\" da doğru mu?",
        do: "01 sekmesinde \"Önerme\" menüsünde \"n 4'e bölünüyorsa çifttir\" seçiliyken \"Denenen aralık\"ı N = 100 yapın. Sonra 02 sekmesinin kum havuzunda \"n bileşik ise 2ⁿ − 1 bileşiktir\" ve \"n asal ise 2ⁿ − 1 asaldır\" hazır iddialarını sırayla arayın.",
        observe: "Tabloda karşı örnek sayıları önerme 0, karşıtı 25, tersi 25, karşıt tersi 0; karşıtın ilk karşı örnekleri \"2, 6, 10, 14, 18, …\". Kum havuzunda \"n bileşik ise …\" 1…80 aralığında 57 bileşik n dener ve karşı örnek bulmaz; \"n asal ise …\" n = 11'de bozulur: \"2047 = 23 · 89\".",
        explain: "Önerme ile karşıt tersi her sayıda birlikte doğru ya da birlikte yanlıştır; karşıtı ile tersi de öyle. \"n bileşik ise 2ⁿ − 1 bileşiktir\" bir teoremdir: n = ab, 1 < a, b < n ise 2ᵃ − 1 sayısı 2ⁿ − 1'i böler ve 1 ile 2ⁿ − 1 arasındadır. Karşıt tersi \"2ⁿ − 1 asal ise n asaldır\" da bu yüzden doğrudur; karşıtı ise ayrı bir iddiadır ve yanlıştır.",
      },
      {
        title: "Kopuk halka",
        predict: "Tümevarımın tabanı kalkarsa ya da adım bir yerde kanıtlanamazsa ne kanıtlanmış olur? Kopuk halkanın ötesindeki önermeler yanlış mı olur?",
        do: "03 · Tümevarım sekmesinde \"İt\" düğmesine basın. Sonra \"Kopuk halka\" kaydırıcısını k = 4'e getirip yeniden \"İt\"e basın. En sonda kaydırıcıyı \"yok\"a geri alın, \"Taban: P(1) kanıtlandı\" kutusunun işaretini kaldırın ve bir kez daha itin.",
        observe: "Varsayılan durumda \"Kanıtlanan önermeler\" P(1) … P(10), \"Kanıtlanmayan\" \"yok (bu on tanede)\". k = 4'te kanıtlanan P(1) … P(4), kanıtlanmayan P(5) … P(10). Taban kapalıyken kanıtlanan \"hiçbiri\" ve durum satırı \"n² + n tektir\" iddiasını örnek verir.",
        explain: "Tümevarım iki parça ister: taban ilk dominoyu iter, adım her dominonun bir sonrakini devirmesini sağlar. Kopuk halka, P(5) ve sonrasının yanlış olduğunu söylemez; yalnız kanıtlanmadığını söyler. Tabansız bir adım ise doğru olsa bile hiçbir şey kanıtlamaz. 05 sekmesindeki \"Bütün atlar aynı renktir\" ispatında halka k = 1'de kopar: iki atlık grupta iki alt grubun ortak atı yoktur.",
      },
    ],
  },
  wow: [
    {
      title: "Öklid'in sayısı asal olmak zorunda değil",
      body: "İlk altı asalın çarpımına 1 eklerseniz 2 · 3 · 5 · 7 · 11 · 13 + 1 = 30 031 = 59 · 509 bulunur; asal değildir. İspat bunu hiç istemez: yalnız N'nin bir asal böleninin listede olamayacağını kullanır ve burada 59 ile 509 gerçekten listede yoktur. 02 sekmesinde \"İlk k asal\" kaydırıcısını k = 7'ye getirince 510 511 = 19 · 97 · 277 çıkar.",
    },
    {
      title: "29 basamaklı ilk karşı örnek",
      body: "991n² + 1 ifadesi n = 1'den 12 055 735 790 331 359 447 442 538 766'ya kadar hiçbir n için tam kare değildir; bir sonraki n'de tam kare olur. Bilgisayarla saniyede milyarlarca deneme yapsanız da oraya ulaşamazsınız. Sayfa bu sayıyı aramayla değil, √991'in zincir kesrinden bir kuramla bulur ve sonra tam sayı aritmetiğiyle doğrular.",
    },
    {
      title: "Euler'in 641'i",
      body: "Fermat, 2^(2ⁿ) + 1 biçimindeki sayıların hep asal olduğunu tahmin etmişti ve ilk beşi (3, 5, 17, 257, 65 537) gerçekten asaldır. Euler 1732'de altıncısını, 4 294 967 297'yi 641'e bölerek tahmini çürüttü: 641 · 6 700 417. Bugüne kadar başka asal Fermat sayısı bulunamadı; 02 sekmesindeki hazır iddia aynı karşı örneği n = 5'te yakalar.",
    },
  ],
  worked: {
    title: "Teleskop toplamı tümevarımla kanıtlamak",
    prompt: "Her n ≥ 1 için 1/(1 · 2) + 1/(2 · 3) + … + 1/(n(n + 1)) = n/(n + 1) olduğunu tümevarımla kanıtlayın; sonra aynı sonucu doğrudan, teleskop toplamla elde edin ve tümevarım adımını k = 6 için sayılarla izleyin.",
    steps: [
      "P(n) iddia edilen eşitlik olsun. Taban: n = 1 için sol yan 1/(1 · 2) = 1/2, sağ yan 1/(1 + 1) = 1/2. P(1) doğrudur.",
      "Hipotez: bir k ≥ 1 için 1/(1 · 2) + … + 1/(k(k + 1)) = k/(k + 1) olsun. P(k + 1)'in sol yanı bu toplama bir terim daha ekler: k/(k + 1) + 1/((k + 1)(k + 2)).",
      "Ortak payda (k + 1)(k + 2): [k(k + 2) + 1] / ((k + 1)(k + 2)) = (k² + 2k + 1) / ((k + 1)(k + 2)) = (k + 1)² / ((k + 1)(k + 2)) = (k + 1)/(k + 2). Bu tam olarak P(k + 1)'in sağ yanıdır; tümevarım ilkesiyle P(n) her n ≥ 1 için doğrudur.",
      "Sayılarla: k = 6 için 6/7 + 1/56 = 48/56 + 1/56 = 49/56 = 7/8, yani (k + 1)/(k + 2). 06 · Alıştırma sekmesinin 4. düzeyi (\"Eksik adımı tamamla\") bu adımı farklı k'larla sorar ve 7/8 gibi kesir yanıtlarını kabul eder.",
      "Doğrudan yol: 1/(i(i + 1)) = 1/i − 1/(i + 1) olduğundan toplam (1 − 1/2) + (1/2 − 1/3) + … + (1/n − 1/(n + 1)) olur; aradaki terimler birbirini götürür ve geriye 1 − 1/(n + 1) = n/(n + 1) kalır. Tümevarım formülü doğrular, teleskop ise formülün nereden geldiğini gösterir.",
    ],
    result: "1/(1 · 2) + … + 1/(n(n + 1)) = n/(n + 1); toplam hep 1'in altında kalır ve n büyüdükçe 1'e yaklaşır.",
  },
  misconceptions: [
    {
      myth: "Bir iddia yüzlerce, binlerce örnekte doğru çıktıysa kanıtlanmış sayılır.",
      truth: "Örnekler yalnız çürütebilir. n² + n + 41 kırk örnekte asal çıkıp n = 40'ta bozulur; 991n² + 1 ilk 100 000 n'de tam kare olmaz, ama 29 basamaklı bir n'de olur. Bir \"her\" iddiası ancak bütün n'leri birden kapsayan genel bir akıl yürütmeyle kanıtlanır.",
    },
    {
      myth: "Bir önerme doğruysa karşıtı da (q ⇒ p) doğrudur; tersi de önermeyle aynı şeyi söyler.",
      truth: "Önermeye denk olan yalnız karşıt tersidir (¬q ⇒ ¬p). \"n 4'e bölünüyorsa çifttir\" doğru, karşıtı \"n çiftse 4'e bölünür\" yanlış: 2, 6, 10 … çifttir ama 4'e bölünmez. Tersi ¬p ⇒ ¬q, karşıtla denktir ve aynı sayılarda yanlışlanır. 05 sekmesindeki \"Tersini kanıtlamak\" ispatı bu hatayı yapar.",
    },
    {
      myth: "Tümevarımda asıl iş adımdır; tabanı denetlemek bir formalitedir.",
      truth: "Taban olmadan hiçbir domino itilmez. \"n² + n tektir\" iddiasında adım kusursuzdur, ama n = 1'de 1 + 1 = 2 çifttir ve iddia hiçbir n için doğru değildir. Ters yönde de dikkat gerekir: adım, tabanın başladığı yerden itibaren her k için geçmelidir; \"Bütün atlar aynı renktir\" ispatı k = 1'de çöker.",
    },
    {
      myth: "Öklid asalların sonsuzluğunu çelişkiyle kanıtladı; çelişki en güçlü yöntemdir.",
      truth: "Öklid'in IX.20 önermesi doğrudandır: verilen her sonlu asal listesinin dışında bir asal bulunduğunu, listedekilerin çarpımına 1 ekleyerek gösterir. Çelişki kalıbından kurtarılabilen ispatlar çoğu zaman daha bilgilendiricidir; burada her listeye yeni bir asal üreten bir yol verir.",
    },
  ],
  glossary: [
    { term: "Önerme", definition: "Doğru ya da yanlış olduğu belli olan cümle; değeri bir değişkene bağlı olan \"x > 3\" gibi cümlelere açık önerme denir." },
    { term: "Niceleyici", definition: "Bir açık önermenin kaç değer için iddia edildiğini söyleyen \"her\" (∀) ya da \"en az bir\" (∃) sözcüğü." },
    { term: "Karşı örnek", definition: "\"Her n için P(n)\" iddiasını sağlamayan tek bir n; iddiayı çürütmek için yeter." },
    { term: "Karşıt ters", definition: "p ⇒ q önermesinden türetilen ¬q ⇒ ¬p; önermeyle mantıksal olarak denktir. Karşıtı q ⇒ p, tersi ¬p ⇒ ¬q'dur." },
    { term: "Çelişki ile ispat", definition: "Kanıtlanacak önermenin değilini varsayıp bir önermeyle değilinin birlikte doğru olduğu sonuca varma ve varsayımı bu yüzden reddetme yöntemi." },
    { term: "Tümevarım", definition: "P(1)'in doğru olduğunu ve her k için P(k)'den P(k + 1)'in çıktığını göstererek P(n)'yi bütün doğal sayılar için kanıtlama yöntemi." },
    { term: "Yardımcı teorem (lemma)", definition: "Asıl amacı daha büyük bir ispata basamak olmak olan kanıtlanmış önerme; \"n² çiftse n çifttir\" √2 ispatında böyle kullanılır." },
    { term: "San (konjektür)", definition: "Doğru olduğu düşünülen ama henüz kanıtlanmamış iddia; Goldbach sanı gibi. Kanıtlanınca teorem, çürütülünce yanlış önerme olur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Matematik bölümlerinin ilk yılında \"Soyut Matematik\" ya da \"Matematiğe Giriş\" adıyla okutulan ders tam olarak bu sayfanın konusudur: önermeler, niceleyiciler, kümeler ve fonksiyonlar, ardından doğrudan, karşıt ters, çelişki ve tümevarım ile ispat yazmak. Fark yazımdadır: üniversitede ispat artık bir tezgâhla izlenmez, her satırı gerekçesiyle kâğıda dökülür ve okunur.",
      "Sonraki derslerin hepsi bu araçları kullanır. Analizde limitin ε–δ tanımı iç içe geçmiş niceleyicilerle kurulur ve \"limit L değildir\" demek o niceleyicileri doğru değillemeyi gerektirir. Ayrık matematik ve çizge kuramında tümevarım her hafta karşınıza çıkar; lineer ve soyut cebirde teoremler birkaç aksiyomdan çıkarılır. Bilgisayar biliminde bir döngünün doğru çalıştığını göstermek, döngü değişmezi üzerine bir tümevarımdır; durma probleminin çözülemezliği ise çelişki ile ve köşegen yöntemiyle kanıtlanır.",
    ],
    topics: ["Soyut Matematik / Matematiğe Giriş", "Analiz: ε–δ ispatları", "Ayrık Matematik", "Çizge Kuramı", "Lineer ve Soyut Cebir", "Algoritmaların doğruluğu: döngü değişmezi", "Hesaplanabilirlik ve köşegen yöntemi"],
  },
  quiz: [
    {
      question: "01 sekmesinde \"n 6'ya bölünüyorsa 3'e bölünür\" önermesini N = 100 ile sayıyorsunuz. Karşıt tersi ile tersi kaçar karşı örnek verir?",
      options: ["Karşıt tersi 0, tersi 17", "Karşıt tersi 17, tersi 0", "İkisi de 0", "Karşıt tersi 0, tersi 33"],
      answer: 0,
      explanation: "Önerme doğrudur (n = 6k = 3 · 2k), karşıt tersi ona denk olduğundan 0 karşı örnek verir. Tersi karşıtıyla denktir: 3'e bölünüp 6'ya bölünmeyen sayılar, yani 3, 9, 15, …, 99. 100'e kadar 33 tane 3'ün katından 16'sı 6'nın katı, geriye 17 kalır.",
    },
    {
      question: "Domino modelinde taban açık ve \"Kopuk halka\" k = 7. \"İt\"e bastıktan sonra P(9) için ne söylenebilir?",
      options: ["P(9) yanlıştır", "P(9) kanıtlanmamıştır; doğru da olabilir, yanlış da", "P(9) kanıtlanmıştır, çünkü taban sağlam", "P(9) kanıtlanmıştır, çünkü P(8) ⇒ P(9) halkası sağlam"],
      answer: 1,
      explanation: "Kanıtlanan P(1) … P(7)'dir. P(7) ⇒ P(8) kanıtlanmadığı için P(8)'e ulaşılamaz; P(8) ⇒ P(9)'un sağlam olması, ilk domino P(8)'e kadar düşmedikçe işe yaramaz. Kopuk halka yanlışlık değil, kanıt eksikliği demektir.",
    },
    {
      question: "Biri \"her n ≥ 1 için 2ⁿ ≥ n²\" iddiasını şöyle kanıtlıyor: taban n = 1'de 2 ≥ 1; adımda 2ᵏ⁺¹ = 2 · 2ᵏ ≥ 2k² ≥ (k + 1)². 2k² ≥ (k + 1)² eşitsizliği ise yalnız k ≥ 3 için doğrudur. Doğru değerlendirme hangisi?",
      options: ["İspat doğrudur, çünkü taban da adım da kâğıtta yazılı", "Adım k = 1 ve k = 2'de geçmez; iddia n = 3'te gerçekten yanlıştır (8 < 9), ama taban n = 4'ten başlatılınca n ≥ 4 için kanıtlanır", "Adım hiçbir k için geçmez; iddia her n için yanlıştır", "Tabanı n = 2 yapmak hatayı düzeltir"],
      answer: 1,
      explanation: "2k² − (k + 1)² = k² − 2k − 1, k ≥ 3 için pozitiftir, k = 1 ve 2'de negatiftir. Kopuk halkalar P(1) ⇒ P(2) ve P(2) ⇒ P(3)'tür ve n = 3'te 2³ = 8 < 9 = 3² ile iddia bozulur. n = 4'te 16 ≥ 16 tabanıyla adım k ≥ 4 için geçerlidir. 05 sekmesindeki yedinci hatalı ispat budur.",
    },
  ],
  next: [
    { href: "tek-sayi-toplam3.html", title: "Tek Sayılardan Kareye", why: "Önşart dizisinde sıradaki sayfa: 1 + 3 + … + (2n − 1) = n² eşitliğini resimle, eşlemeyle ve tümevarımla kanıtlayarak ilk ispatlarınızı kendiniz kurarsınız." },
    { href: "kumeler-bagintilar-ve-fonksiyonlar.html", title: "Kümeler, Bağıntılar ve Fonksiyonlar: Matematiğin Ortak Dili", why: "Önşart dizisinde sonraki halka: küme, bağıntı ve fonksiyon tanımları burada öğrenilen ispat yöntemleriyle kullanılır; iki kümenin eşitliğini ya da bir fonksiyonun birebirliğini kanıtlamak bu sayfanın kalıplarına dayanır." },
    { href: "kombinatorik-ve-sayma.html", title: "Kombinatorik ve Sayma: Seçimler, Güvercin Yuvası, İçerme–Dışlama ve Catalan", why: "Güvercin yuvası ilkesi, hangisi olduğunu söylemeden bir şeyin var olduğunu kanıtlayan yapıcı olmayan varlık ispatlarının en bilinen örneğidir." },
    { href: "asal-rsa.html", title: "Asal Sayılar ve RSA: Elekten Şifreye", why: "Bu sayfadaki asal sayı iddiaları sayı kuramına bağlanır: Öklid algoritması, Euler teoremi, asallık sınamaları ve iki asaldan kurulan RSA." },
  ],
  sources: [
    { title: "Euclid's theorem (Wikipedia)", url: "https://en.wikipedia.org/wiki/Euclid%27s_theorem", note: "Elemanlar IX.20; Öklid'in ispatının çelişki değil, doğrudan bir ispat olduğu." },
    { title: "Mathematical induction (Wikipedia)", url: "https://en.wikipedia.org/wiki/Mathematical_induction", note: "Tarihçe: el-Kerecî, Maurolico (1575), Pascal (1665) ve 19. yüzyıldaki biçimsel kuruluş." },
    { title: "Hippasus (Wikipedia)", url: "https://en.wikipedia.org/wiki/Hippasus", note: "Boğulma anlatıları, Pappus ve Iamblichus'un birbirini tutmayan aktarımları; keşfin Hippasus'a bağlanmasının kanıtsızlığı." },
    { title: "Heegner number (Wikipedia)", url: "https://en.wikipedia.org/wiki/Heegner_number", note: "Rabinowitsch 1913: n² + n + p'nin asallığı ile sınıf sayısı 1 arasındaki bağ; Heegner 1952, Baker ve Stark 1966. Euler 1732 ve 641 için sayfanın kaynakçasındaki Fermat number maddesine bakın." },
    { title: "Goldbach's conjecture (Wikipedia)", url: "https://en.wikipedia.org/wiki/Goldbach%27s_conjecture", note: "7 Haziran 1742 mektubu, Euler'in yanıtı, Pipping 1938 ve 4 × 10¹⁸'e kadar bilgisayar doğrulaması." },
  ],
  revision: "Kasım 2026",
};
