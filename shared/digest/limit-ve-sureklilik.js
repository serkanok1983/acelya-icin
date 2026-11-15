window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["limit-ve-sureklilik"] = {
  slug: "limit-ve-sureklilik",
  title: "Limit ve Süreklilik: İstediğin Kadar Yaklaşmak",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Limit, bir sayıya değip değmemekle değil, ona istediğin kadar yaklaşabilmekle ilgilidir. Bir hata payı seç, sayfa N'yi ya da δ'yı bulsun; bulamıyorsa nedenini görürsün.",
  hook:
    "Bilgisayara (1 − cos x)/x² ifadesini x = 0,00000001 için hesaplatırsan sana 0 der. Doğru cevap 1/2'dir. Hesap makinesi yanılabiliyorsa, bir şeyin bir sayıya “gittiğini” nasıl kesin olarak bilebiliriz?",
  bigIdea:
    "<strong>aₙ → L</strong> demek, hangi hata payı ε seçilirse seçilsin, ondan sonraki bütün terimlerin L'ye ε'dan yakın kaldığı bir N bulunabilmesidir; fonksiyonlarda N'nin yerini a çevresindeki bir δ alır, süreklilik de limitin f(a)'ya eşit olmasıdır.",
  story: [
    "Elealı Zenon'un (doğumu yaklaşık MÖ 490 olarak tahmin edilir) kitabı kayıptır; paradokslarını Aristoteles ve yorumcularından öğreniyoruz. En ünlüsünde koşucu, hedefe varmadan önce yolun yarısını, sonra kalanın yarısını, sonra onun yarısını koşmak zorundadır: sonsuz tane parça, ama hiçbirinin “ilk” ya da “son” olmadığı bir dizi. Akhilleus ile kaplumbağa da aynı yapıdadır. Stanford Felsefe Ansiklopedisi'nin aktardığı yaygın görüşe göre bu bilmecelere tam bir matematiksel cevap ancak 19. yüzyılda, Cauchy'ninki gibi sıkı bir sonsuz toplam kuramıyla verilebildi; uzay ve zamanın gerçekten böyle bir süreklilik olup olmadığı ise ayrı bir sorudur.",
    "17. yüzyılın sonunda Newton ve Leibniz türevi ve integrali kurdular, ama temelde belirsiz bir kavram duruyordu: “sonsuz küçük” artım. 1734'te filozof George Berkeley <em>The Analyst</em> adlı kitabında tam bu noktaya saldırdı: bir hesapta önce sıfır olmayan bir artım varsayılıp onunla bölünüyor, sonra aynı artım sıfır sayılıyordu. Berkeley bu kaybolan niceliklere “ölmüş niceliklerin hayaletleri” diye sordu. Hesaplar doğru sonuç veriyordu; neden doğru olduklarını kimse kesin söyleyemiyordu.",
    "Cevap bir asırda geldi. Bernard Bolzano 1817'de yayımladığı makalede ara değer teoremini kanıtladı ve bugün Cauchy dizisi denen kavramı tanımladı; ancak eserlerinin çoğu el yazması kaldı ve ölümünden sonra tanındı. Augustin-Louis Cauchy 1821'de <em>Cours d'analyse</em>'de limiti ve sürekliliği değişken nicelikler üzerinden anlattı. Karl Weierstrass 1861 dolaylarında ε–δ tanımını bugün kullandığımıza yakın biçimiyle verdi. “Sonsuz küçük” yerine artık yalnız sonlu sayılar ve bir oyun vardı: sen ε'u ver, ben δ'yı bulayım. Bu sayfa o oyunu oynatır.",
  ],
  core: [
    {
      heading: "Limit bir meydan okumadır: ε–N",
      body:
        "Bir dizinin L'ye yakınsadığını söylemek bir vaattir: karşındaki ne kadar küçük bir <strong>hata payı</strong> ε seçerse seçsin, öyle bir sıra numarası N gösterebilirsin ki n ≥ N olan her terim L − ε ile L + ε arasındaki banda girer ve oradan bir daha çıkmaz. aₙ = 1/n ve ε = 1/10 için N = 11'dir: 10. terim tam bandın kenarındadır (1/10 = ε), 11. terimden sonrası içeride. Yeter ki <em>bir</em> geçerli N bulunsun; en küçüğünü bulmak gerekmez. Bir ε için bile N bulunamıyorsa L limit değildir: (−1)ⁿ dizisinde 1 ile −1 arası 2 olduğundan, L ne olursa olsun bu iki değerden biri L'ye en az 1 uzaktır.",
      formula: "aₙ → L ⟺ her ε > 0 için ∃N: n ≥ N ⇒ |aₙ − L| < ε",
      formulaNote: "N, ε'a bağlıdır: ε küçüldükçe N genellikle büyür. Önemli olan her ε için bir N'nin var olmasıdır.",
    },
    {
      heading: "Fonksiyon limiti: ε–δ ve x = a'nın dışarıda kalması",
      body:
        "x bir a noktasına yaklaşırken f(x)'in L'ye gitmesi aynı oyundur, yalnız N'nin yerine a çevresinde bir <strong>δ-şeridi</strong> gelir: şeritteki her x için grafik, L çevresindeki ε-bandının içinde kalmalıdır. Tanımdaki 0 < |x − a| koşulu a'nın kendisini dışarıda bırakır; bu yüzden (x² − 1)/(x − 1) için x = 1'de değer tanımsız olsa da limit 2'dir. Ders kitabı ispatları genellikle en büyük δ'yı değil, kolay kanıtlanan küçük bir δ'yı bulur: x² için a = 2'de δ = min(1, ε/5) yeter, ama ε = 0,1 için en büyük geçerli δ 0,0248457'dir.",
      formula: "lim<sub>x→a</sub> f(x) = L ⟺ her ε > 0 için ∃δ > 0: 0 < |x − a| < δ ⇒ |f(x) − L| < ε",
      formulaNote: "δ'nın daha küçüğü her zaman işe yarar; büyüğü yaramayabilir. İspatta amaç geçerli bir δ'yı ε cinsinden yazmaktır.",
    },
    {
      heading: "Tek taraflı limit, sonsuz ve belirsiz biçimler",
      body:
        "x yalnız soldan ya da yalnız sağdan yaklaşırsa <strong>sol limit</strong> ve <strong>sağ limit</strong> ayrı hesaplanır; iki taraflı limit ancak ikisi varsa ve eşitse vardır. ⌊x⌋ için 1'de sol limit 0, sağ limit 1'dir, limit yoktur. “Limit +∞” bir sayı değil, değerlerin sınırsız büyüdüğünü söyleyen bir ıraksama biçimidir ve düşey asimptotu işaretler. Yerine koyunca 0/0, ∞/∞ ya da ∞ − ∞ çıkması ise sonuç değil uyarıdır: ifade yeniden yazılmalıdır. Sadeleştirme, eşlenikle çarpma, en büyük kuvvete bölme ya da iki fonksiyon arasında sıkıştırma bu işi görür.",
      formula: "√(x² + x) − x = x / (√(x² + x) + x) → 1/2 (x → ∞)",
      formulaNote: "∞ − ∞ biçimi eşlenikle çarpınca ∞/∞'a, x'e bölünce 1/(√(1 + 1/x) + 1)'e döner ve limit 1/2 çıkar.",
    },
    {
      heading: "Süreklilik: üç koşul, üç tür süreksizlik",
      body:
        "f, a'da <strong>süreklidir</strong>: f(a) tanımlıdır, limit vardır ve ikisi eşittir. Bir koşul bozulunca süreksizliğin türü belli olur. <strong>Kaldırılabilir:</strong> limit var ama f(a) yok ya da farklı; tek bir noktayı düzeltmek yeter. <strong>Sıçrama:</strong> sol ve sağ limit var ama farklı. <strong>Sonsuz:</strong> en az bir yanda değerler sınırsız büyür. sin(1/x) gibi salınıp hiçbir yere yerleşmeyen fonksiyonlar bu üçüne de uymaz. “x yerine a yaz” kuralı tam olarak süreklilik demektir; polinomlar, sinüs, kosinüs ve üstel fonksiyon tanımlı oldukları her yerde süreklidir.",
      formula: "f, a'da sürekli ⟺ lim<sub>x→a</sub> f(x) = f(a)",
      formulaNote: "Eşitliğin iki yanının da var olması gerekir: f(a) tanımlı olmalı, limit de var olmalı.",
    },
    {
      heading: "Tamlık: ara değer teoremi ve ikiye bölme",
      body:
        "<strong>Ara değer teoremi:</strong> [a, b]'de sürekli bir f, f(a) ile f(b) arasındaki her değeri alır; uçlarda işaret değişiyorsa arada bir kök vardır. İkiye bölme yöntemi bunu bir algoritmaya çevirir: orta noktaya bak, işaretin değiştiği yarıyı tut. n adımdan sonra kökün yeri (b − a)/2ⁿ genişliğinde bir aralığa sıkışır. İç içe aralıkların tek bir noktada buluşması reel sayıların <strong>tamlığına</strong> dayanır: yalnız kesirlerle çalışan bir dünyada x² − 2'nin kökü √2 yoktur ve aralıklar hiçbir sayıda buluşmaz. Süreklilik de şarttır: 1/x, [−1, 2]'de işaret değiştirir ama kökü yoktur.",
      formula: "|c<sub>n</sub> − kök| ≤ (b − a)/2<sup>n</sup>",
      formulaNote: "Her adım hatayı en az yarıya indirir; 10 adım yaklaşık bin kat, 20 adım yaklaşık bir milyon kat daraltır.",
    },
  ],
  lab: {
    intro:
      "Sayfa altı sekmeden oluşur ve her sekmede bir <strong>Sekmeyi sıfırla</strong> düğmesi vardır. <strong>01 · Diziler ve ε–N</strong>'de <strong>Dizi</strong> menüsünden bir dizi ve <strong>Hata payı ε</strong> kaydırıcısıyla 0,5'ten 0,001'e kadar bir ε seçersin; kartlar en küçük N'yi, eşitsizlikten gelen güvenceli N'yi ve bandın dışında kalan son terimi gösterir. <strong>02 · Fonksiyon limiti ve ε–δ</strong>'da kendi δ'nı logaritmik bir kaydırıcıyla seçersin, sayfa en büyük geçerli δ'yı ve ders kitabı δ'sını yazar, δ'n fazla büyükse bandın dışındaki somut bir x'i gösterir. <strong>03 · Tek taraflı ve sonsuz</strong> asimptotları ve h = 10⁻¹…10⁻⁶ yaklaşma tablolarını, <strong>04 · 0/0 ve sıkıştırma</strong> alanla sin(x)/x kanıtını ve kayan noktanın doğrudan formülü nerede bozduğunu, <strong>05 · Süreklilik ve ara değer</strong> sürüklenebilir bir f(1) noktasıyla süreksizlik türlerini, ikiye bölme yöntemini ve türeve köprüyü gösterir. <strong>06 · Alıştırma</strong> dört düzeyde tohumla üretilen sorular sorar, ipucu ve adım adım çözüm verir; yanıtların hiçbir yere kaydedilmez.",
    experiments: [
      {
        title: "ε'u on kat küçült: N kaç kat büyür?",
        predict:
          "aₙ = (1 + 1/n)ⁿ dizisi e ≈ 2,718282'ye yaklaşır. ε'u 0,1'den 0,01'e, sonra 0,001'e indirirsen en küçük N kaç kat büyür: 10 mu, 100 mü?",
        do:
          "01 sekmesinde <strong>Dizi</strong> menüsünden aₙ = (1 + 1/n)ⁿ'yi seç. <strong>Hata payı ε</strong> kaydırıcısını sırayla 0,1, 0,01 ve 0,001'e getir; her seferinde <strong>En küçük N</strong>, <strong>Eşitsizlikten güvenceli N</strong> ve <strong>Bandın dışındaki son terim</strong> kartlarını oku.",
        observe:
          "En küçük N sırayla N = 13, N = 135 ve N = 1359; güvenceli N 14, 136 ve 1360; bandın dışındaki son terim n = 12, 134 ve 1358. ε on kat küçülünce N yaklaşık on kat büyüyor. ε = 0,1 iken |a<sub>N</sub> − L| kartı 0,0976809 gösterir: ε'un hemen altında.",
        explain:
          "Binom açılımı e − aₙ'nin yaklaşık e/(2n) olduğunu söyler. e/(2n) < ε için n > e/(2ε) gerekir: ε = 0,1, 0,01, 0,001 için 13,6, 135,9 ve 1359,1. Güvenceli N tam bu sınırın yukarı yuvarlanmışıdır ve en küçük N'nin hemen üstündedir: geçerli bir N bulmak yeter. Aynı sekmenin altındaki tabloda ise doğrudan formül n = 10⁹ ile 10¹² arasında e'nin <em>üstüne</em> çıkar; artan ve e'yi hiç geçmeyen bir dizi için bu imkânsızdır, hata kayan noktanındır.",
      },
      {
        title: "sin(x)/x için δ, ve hiç δ'sı olmayan bir fonksiyon",
        predict:
          "sin(x)/x, x → 0 iken 1'e gider. ε = 0,1 için ders kitabının δ = √(6ε)'su ile sayfanın bulduğu en büyük δ arasında büyük fark mı olur, küçük mü? ε = 1 olunca ne olur?",
        do:
          "02 sekmesinde <strong>Fonksiyon ve nokta</strong> menüsünden sin(x)/x, a = 0'ı seç. ε = 0,1 iken <strong>En büyük geçerli δ</strong> ve <strong>Ders kitabı δ'sı</strong> kartlarını oku; sonra ε'u 1'e çıkar. Ardından menüden <strong>sıçrama, a = 0 (limit yok)</strong>'u seç, ε'u yeniden 0,1'e getir, sonra <strong>Senin δ'n</strong> kaydırıcısını en sola kadar çek.",
        observe:
          "ε = 0,1'de δ* = 0,786683, ders kitabı δ = 0,774597 (geçerli): fark yalnız yüzde 1,6 kadar. ε = 1'de δ* = 3,14159, yani π: sin x/x ilk kez orada 0 olur. Sıçramada en büyük δ kartı “yok” der; δ hâlâ 0,1 iken şeridin içindeki x = 0,05 noktasında f(x) = 1 ve |f(x) − L| = 1 ≥ ε olur; kaydırıcıyı en sola, δ = 0,001'e çektiğinde de tanık x = 0,0005'e kayar ama sapma yine 1'dir.",
        explain:
          "1 − x²/6 ≤ sin(x)/x ≤ 1 eşitsizliği 1 − sin(x)/x ≤ x²/6 verir; x²/6 < ε için |x| < √(6ε) yeter. Bu sınır küçük x'te çok iyidir, çünkü sin x'in serisinde sonraki terim çok küçüktür. Kesin δ* ise kapalı formülle çözülemez; sayfa onu ikiye bölmeyle bulur ve sapmanın ε'dan küçük kaldığı ucu döndürür. Sıçramada her şerit hem −1'i hem 1'i içerir; ikisi arası 2 olduğundan biri L'ye en az 1 uzaktır ve ε ≤ 1 iken hiçbir δ yetmez.",
      },
      {
        title: "Tablo ne zaman yalan söylemeye başlar?",
        predict:
          "(1 − cos x)/x²'nin limiti 1/2'dir. x'i 10⁻¹'den 10⁻¹⁶'ya küçültürken doğrudan formül 0,5'e hep daha çok mu yaklaşır?",
        do:
          "04 sekmesinin <strong>Yeniden yazmak ve kayan noktanın tuzakları</strong> bölümünde <strong>İfade</strong> menüsünden (1 − cos x)/x², x → 0'ı seç. Tablonun <strong>doğrudan formül</strong> ve <strong>yeniden yazılmış (doğru değer)</strong> sütunlarını satır satır karşılaştır.",
        observe:
          "10⁻³'e kadar iki sütun aynıdır (0,4999999583). 10⁻⁴ satırı ilk kırmızı satırdır: doğrudan formül 0,499999997, doğru değer 0,4999999996. Sonra doğrudan formül 0,5000000414, 0,5000444503, 0,4996003611 diye savrulur ve 10⁻⁸'de 0 olur. Yeniden yazılmış 2·sin²(x/2)/x² sütunu baştan sona 0,5'e gider.",
        explain:
          "cos(10⁻⁸) ile 1 arasındaki fark yaklaşık 5·10⁻¹⁷'dir; 1'in yanındaki iki double arası boşluk ise 1,1·10⁻¹⁶. Bilgisayar cos(10⁻⁸)'i tam 1 olarak saklar ve 1 − cos x sıfır olur. Daha önceki satırlarda da birbirine çok yakın iki sayıyı çıkarmak (yok edici çıkarma) anlamlı basamakları siler. 1 − cos x = 2·sin²(x/2) özdeşliği çıkarmayı ortadan kaldırır. Ders: tablo sezgi verir, limit cebirle ya da eşitsizlikle gösterilir.",
      },
      {
        title: "İkiye bölme: süreklilik olunca kök, olmayınca kutup",
        predict:
          "İkiye bölme yöntemi her adımda aralığı yarıya indirir. [1, 2]'de x³ − x − 2 için 11 adımdan sonra hata sınırı kaç olur? 1/x de [−1, 2]'de işaret değiştiriyor: yöntem onda ne bulur?",
        do:
          "05 sekmesinin <strong>Ara değer teoremi ve ikiye bölme yöntemi</strong> bölümünde x³ − x − 2 · [1, 2] seçiliyken önce <strong>Bir adım</strong>, sonra <strong>10 adım</strong>, en son <strong>Durana kadar</strong>'a bas. <strong>Baştan</strong> deyip menüden 1/x · [−1, 2] (süreksiz)'i seç ve yine <strong>Durana kadar</strong>'a bas.",
        observe:
          "İlk adımda c = 1,5, f(c) = −0,125, sınır 0,5. 11 adımda sınır 0,000488 olur; tablodaki gerçek hata |c − kök| hep sınırın altındadır. <strong>Durana kadar</strong> 52 adımda durur: c = 1,5213797068 ve f(c) hesapta tam 0. 1/x'te ise yöntem 80 adım sonra c ≈ −8,27·10⁻²⁵ noktasına daralır ve f(c) ≈ −1,209·10²⁴ olur: |f(c)| küçülmek yerine büyür.",
        explain:
          "Başlangıç aralığının uzunluğu 1 olduğundan n adım sonra sınır 1/2ⁿ'dir: 1/2¹¹ = 0,000488. 52 adımda sınır 2,22·10⁻¹⁶'ya iner ve double duyarlığı biter; f(c) = 0 çıkması c'nin gerçek kök olduğunu değil, farkın artık ayırt edilemediğini söyler. 1/x'te ara değer teoreminin koşulu yoktur: fonksiyon 0'da süreksizdir. Yöntem işaret değişimini izlemeye devam eder ve aralık kökün değil kutbun üzerine kapanır.",
      },
    ],
  },
  wow: [
    {
      title: "“Ölmüş niceliklerin hayaletleri”",
      body:
        "George Berkeley 1734'te <em>The Analyst</em>'te Newton'un akışlar hesabını eleştirdi: bir artım önce sıfır değilmiş gibi bölen yapılıyor, sonra sıfırmış gibi atılıyordu. Kaybolan bu artımlar için “ölmüş niceliklerin hayaletleri” demeyelim mi diye sordu. Eleştiriye kesin cevap ancak 19. yüzyılda, ε–δ tanımıyla verilebildi.",
    },
    {
      title: "Cauchy'den önce Cauchy dizisi",
      body:
        "Bolzano 1817'deki makalesinde ara değer teoremini kanıtladı ve bugün Cauchy dizisi dediğimiz kavramı tanımladı; Cauchy aynı kavramı dört yıl sonra kullandı ve büyük olasılıkla Bolzano'yu okumamıştı. Bolzano'nun çalışmalarının çoğu el yazması kaldı ve ancak ölümünden (1848) sonra tanındı.",
    },
    {
      title: "e'nin üstüne çıkan dizi",
      body:
        "(1 + 1/n)ⁿ dizisi artar ve e'yi hiç geçmez. Ama 64 bitlik kayan noktayla doğrudan hesaplanınca n = 10⁹ ile 10¹² arasında e'nin üstüne çıkar, n = 10¹⁶'da 1 + 1/n tam 1'e yuvarlandığı için sonuç 1 olur. Sayfanın 01 sekmesindeki tablo bunu satır satır gösterir: sayısal bir tablo limiti kanıtlamaz.",
    },
  ],
  worked: {
    title: "ε–δ ispatı: x → 2 iken x² → 4",
    prompt:
      "Tanımla kanıtla: lim<sub>x→2</sub> x² = 4. Yani her ε > 0 için 0 < |x − 2| < δ ⇒ |x² − 4| < ε koşulunu sağlayan bir δ > 0'ı ε cinsinden bul. Sonra ε = 0,1 için senin δ'nı en büyük geçerli δ ile karşılaştır.",
    steps: [
      "Hedefi |x − a| cinsinden yaz: |x² − 4| = |x − 2|·|x + 2|. |x − 2| küçük tutulabilir; sorun |x + 2| çarpanıdır, onu bir sabitle sınırlamak gerekir.",
      "Önce δ ≤ 1 al. O zaman |x − 2| < 1, yani 1 < x < 3 ve 3 < x + 2 < 5 olur; dolayısıyla |x + 2| < 5. Bu durumda |x² − 4| < 5·|x − 2|.",
      "5·|x − 2| < ε için |x − 2| < ε/5 yeter. İki şartı birden sağlamak için δ = min(1, ε/5) seç. 0 < |x − 2| < δ ise |x² − 4| < 5δ ≤ ε. İspat bitti: her ε için bir δ yazıldı.",
      "ε = 0,1 koy: δ = min(1; 0,02) = 0,02. Şeritteki en büyük sapma |x² − 4| ≤ 4δ + δ² = 0,0804 < 0,1, yani bu δ gerçekten geçerlidir.",
      "En büyük geçerli δ'yı bul: x > 0 için |x² − 4| < 0,1 ⟺ √3,9 < x < √4,1, yani 1,974842 < x < 2,024846. 2'ye uzaklıklar 0,025158 ve 0,0248457; küçüğü bağlar: δ* = √4,1 − 2 ≈ 0,0248457. Sayfada 02 sekmesinde x², a = 2 seçili ve ε = 0,1 iken <strong>En büyük geçerli δ</strong> kartı δ* = 0,0248457, <strong>Ders kitabı δ'sı</strong> kartı δ = 0,02 · geçerli gösterir.",
    ],
    result:
      "δ = min(1, ε/5) her ε için çalışır; ε = 0,1'de 0,02 verir. En büyük geçerli δ 0,0248457'dir ve ondan küçük her δ da işe yarar. İspatın amacı en büyük δ'yı bulmak değil, ε'a bağlı geçerli bir δ yazmaktır.",
  },
  misconceptions: [
    {
      myth: "Yerine koyunca 0/0 çıktıysa limit 0'dır (ya da “tanımsızdır”).",
      truth:
        "0/0 bir sonuç değil, “daha çalış” uyarısıdır: pay ve payda birlikte 0'a gidiyor, hangisinin hızlı gittiği belli değil. Aynı 0/0 biçimi (x² − 1)/(x − 1)'de 2, sin(x)/x'te 1, (1 − cos x)/x²'de 1/2, x²/x'te 0 verir. f(1) tanımsız olabilir, ama limit vardır.",
    },
    {
      myth: "Limit, fonksiyonun o noktadaki değeridir.",
      truth:
        "Limit, x'in a'ya eşit olmadığı noktalara bakar. f(x) = x + 1 (x ≠ 1) ve f(1) = 5 ise limit 2'dir, f(1) = 5 yalnız o noktadaki değerdir. İkisi eşit olsaydı f sürekli olurdu. 05 sekmesinde f(1) noktasını 3'te bıraktığında sınıf “kaldırılabilir süreksizlik”, 1,5'e çektiğinde “sürekli” olur.",
    },
    {
      myth: "Hesap makinesinde değerler bir sayıya yaklaşıyorsa limit o sayıdır.",
      truth:
        "Tablo yalnız sezgi verir. Kayan nokta (1 − cos x)/x²'yi x = 10⁻⁸'de 0 yapar, oysa limit 1/2'dir. Tersine, sin(1/x)'i x = 1/π, 1/(2π), … noktalarında hesaplayan 0 görür ama limit yoktur: x = 1/(π/2 + 2πn) yolunda değer 1'dir. Limit her yol için aynı olmalıdır.",
    },
    {
      myth: "Terimler L'ye her adımda biraz daha yaklaşıyorsa limit L'dir.",
      truth:
        "“Yaklaşmak” yetmez, istendiği kadar yaklaşmak gerekir. 1/n terimleri −1'e her adımda biraz daha yaklaşır, ama aradaki uzaklık hiç 1'in altına inmez; ε = 1/2 için hiçbir N yoktur. Limit 0'dır.",
    },
  ],
  glossary: [
    { term: "Hata payı (ε)", definition: "Limite ne kadar yakın olunması istendiğini söyleyen, keyfi küçük seçilebilen pozitif sayı." },
    { term: "Yakınsak dizi", definition: "Her ε > 0 için, belirli bir N'den sonraki bütün terimleri bir L'ye ε'dan yakın olan dizi." },
    { term: "ε–δ tanımı", definition: "lim<sub>x→a</sub> f(x) = L ifadesinin anlamı: her ε > 0 için 0 < |x − a| < δ olan her x'te |f(x) − L| < ε sağlayan bir δ > 0 vardır." },
    { term: "Tek taraflı limit", definition: "x'in a'ya yalnız soldan (x < a) ya da yalnız sağdan (x > a) yaklaşırken f(x)'in gittiği değer." },
    { term: "Düşey asimptot", definition: "Fonksiyonun en az bir yandan sınırsız büyüdüğü ya da küçüldüğü x = a doğrusu." },
    { term: "Belirsiz biçim", definition: "Yerine koymanın 0/0, ∞/∞ ya da ∞ − ∞ verdiği, limitin değeri hakkında tek başına hiçbir şey söylemeyen durum." },
    { term: "Süreklilik", definition: "f(a)'nın tanımlı olması, x → a limitinin var olması ve ikisinin eşit olması." },
    { term: "Ara değer teoremi", definition: "[a, b]'de sürekli bir fonksiyonun f(a) ile f(b) arasındaki her değeri aralığın en az bir noktasında alması." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfa Analiz I (Calculus I) dersinin ilk haftalarıdır. Orada limit kuralları (toplam, çarpım, bölüm) ε–δ ile kanıtlanır, sin(x)/x → 1 ve sıkıştırma teoremi türev kurallarının temeli olur, türev de tam bu sayfadaki kesen eğiminin limitidir: ((1 + h)² − 1)/h = 2 + h → 2. Sıradaki adım bu yüzden türevdir.",
      "Reel Analiz derslerinde aynı tanımlar baştan, reel sayıların tamlık aksiyomu üzerine kurulur: monoton ve sınırlı dizilerin yakınsaması ((1 + 1/n)ⁿ gibi), Cauchy dizileri, düzgün süreklilik, iç içe aralıklar. Ara değer teoremi Sayısal Analiz'de kök bulmanın, Diferansiyel Denklemler'de çözümlerin varlığının dayanağıdır; kayan noktanın burada gösterdiği tuzaklar ise sayısal hesabın her yerinde karşına çıkar.",
    ],
    topics: ["Analiz I (Calculus I)", "Limit kurallarının ε–δ ispatı", "Monoton yakınsaklık ve tamlık", "Cauchy dizileri", "Düzgün süreklilik", "Ara değer ve uç değer teoremleri", "Sayısal kök bulma", "Kayan nokta aritmetiği"],
  },
  quiz: [
    {
      question:
        "(1 + 1/n)ⁿ dizisinde e − aₙ yaklaşık e/(2n)'dir. ε = 0,01 için en küçük N 135 ise ε = 0,0001 için en küçük N yaklaşık kaç olur?",
      options: ["Yaklaşık 1350", "Yaklaşık 13 600", "Yaklaşık 1 360 000", "Yine yaklaşık 135"],
      answer: 1,
      explanation:
        "e/(2n) < ε için n > e/(2ε) gerekir; N, ε ile ters orantılıdır. ε yüz kat küçülünce N yaklaşık yüz kat büyür: e/(2·0,0001) ≈ 13 591. 1 360 000 bulmak N'nin 1/ε² gibi büyüdüğünü sanmaktır; bu dizide öyle değildir.",
    },
    {
      question:
        "f(x) = 3x + 4, a = −1, ε = 0,03 için 0 < |x + 1| < δ ⇒ |f(x) − 1| < ε koşulunu sağlayan en büyük δ kaçtır?",
      options: ["0,03", "0,09", "0,01", "Böyle bir δ yoktur"],
      answer: 2,
      explanation:
        "L = f(−1) = 1 ve |3x + 4 − 1| = 3·|x + 1|. 3·|x + 1| < 0,03 ⟺ |x + 1| < 0,01. Eğim 3 olduğu için x'teki sapma f'de üç katına çıkar; δ'yı ε'un üçte biri seçmek gerekir. Doğrusal f(x) = mx + b için her zaman δ = ε/|m| çalışır; 06 sekmesinin 3. düzeyi bu soruları üretir.",
    },
    {
      question:
        "İkiye bölme yöntemi uzunluğu 1 olan bir aralıkla başlıyor. Hata sınırı (b − a)/2ⁿ'nin 10⁻⁶'nın altına inmesi için en az kaç adım gerekir?",
      options: ["6 adım", "20 adım", "50 adım", "1 000 000 adım"],
      answer: 1,
      explanation:
        "Her adım sınırı yarıya indirir: n adımdan sonra 1/2ⁿ. 2¹⁹ = 524 288 yetmez, 2²⁰ = 1 048 576 > 10⁶ yeter; 20 adım. Hatayı on kat azaltmak yalnız 3–4 adım ister. 05 sekmesinde x³ − x − 2 için 11 adımda sınırın 0,000488 olduğunu görebilirsin.",
    },
  ],
  next: [
    {
      href: "turev.html",
      title: "Türev: Kesenden Teğete (Limit Laboratuvarı)",
      why: "Bu sayfanın sonundaki kesen eğimi limiti orada türevin kendisi olur; türev kuralları ve h çok küçülünce bilgisayarın neden yanıldığı orada anlatılır.",
    },
    {
      href: "riemann-toplamlari.html",
      title: "Riemann Toplamları ve Sayısal İntegral",
      why: "Alanı dikdörtgenlerle doldurup n → ∞ iken toplamın limitini alır; hatanın n ile nasıl küçüldüğünü ayrı bir sekmede ölçer.",
    },
    {
      href: "sayisal-analiz.html",
      title: "Sayısal Analiz: Kök Bulma, Kayan Nokta, Sayısal Türev ve İntegral",
      why: "İkiye bölmeyi Newton yöntemiyle karşılaştırır ve burada karşılaştığın kayan nokta tuzaklarını kendi sekmesinde ayrıntılandırır.",
    },
  ],
  sources: [
    {
      title: "(ε, δ)-definition of limit",
      url: "https://en.wikipedia.org/wiki/(%CE%B5,_%CE%B4)-definition_of_limit",
      note: "Tanımın tarihi: Bolzano 1817, Cauchy'nin 1821 tarihli Cours d'analyse'i ve Weierstrass'ın 1861 dolaylarında verdiği bugünkü biçim.",
    },
    {
      title: "Zeno's Paradoxes (Stanford Encyclopedia of Philosophy)",
      url: "https://plato.stanford.edu/entries/paradox-zeno/",
      note: "Zenon'un tahmini doğum tarihi, ikiye bölme ve Akhilleus paradoksları ile sonsuz toplam kuramının bunlara verdiği cevap.",
    },
    {
      title: "Bernard Bolzano (MacTutor History of Mathematics)",
      url: "https://mathshistory.st-andrews.ac.uk/Biographies/Bolzano/",
      note: "1817 tarihli makale, ara değer teoreminin ispatı, Cauchy dizisi kavramı ve eserlerinin geç tanınması.",
    },
    {
      title: "The Analyst",
      url: "https://en.wikipedia.org/wiki/The_Analyst",
      note: "Berkeley'nin 1734'te sonsuz küçükler ve Newton'un akışlar hesabına yönelttiği eleştiri.",
    },
  ],
  revision: "Kasım 2026",
};
