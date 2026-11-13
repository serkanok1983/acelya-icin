window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["cizge-teorisi"] = {
  slug: "cizge-teorisi",
  title: "Çizge Teorisi: Köprülerden Dört Renge",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Yedi köprü, beş nokta, dört renk: çizge kuramının teoremleri resme bakarak değil, sayarak kanıtlanır. Dereceleri, ağaçları, renkleri ve yüzleri say; sayfa her sonucu teoremin verdiği değerle yan yana koyar.",
  hook:
    "Königsberg'in yedi köprüsünü her birinden bir kez geçerek dolaşabilir misin? Beş noktayı ikişer ikişer, hiçbir çizgi ötekini kesmeden birleştirebilir misin? Dört renk her haritaya yeter mi? Üç sorunun cevabı da çizime uzun uzun bakarak değil, bir şeyleri sayarak bulunur: dereceleri, kenarları, yüzleri.",
  bigIdea:
    "Bir çizgede önemli olan çizim değil, <strong>kimin kime kaç kenarla bağlı olduğudur</strong>: Euler yolu derecelerin tek ya da çift olmasına, kapsayan ağaç sayısı bir determinanta, düzlemsellik V − E + F sayımına iner.",
  story: [
    "Pregel Nehri, Königsberg'i (bugünkü Kaliningrad) dört kara parçasına bölüyordu: kuzey ve güney kıyıları, ortadaki Kneiphof adası ve doğudaki Lomse adası. Yedi köprünün dördü Kneiphof'u kıyılara bağlıyordu (her kıyıya iki), biri Kneiphof'u Lomse'ye; kalan ikisi Lomse'den kıyılara uzanıyordu. Kentin bilmecesi, her köprüden tam bir kez geçen bir yürüyüşün olup olmadığıydı. Soru St. Petersburg'daki Leonhard Euler'e ulaştı. Euler çözümünü 26 Ağustos 1735'te St. Petersburg Akademisi'nde sundu; makale, akademinin <em>Commentarii</em> dizisinde 1741'de basıldı. Makale, Leibniz'in 'konum geometrisi' (<em>geometria situs</em>) dediği ama hangi soruları kapsadığı henüz belirsiz olan alanı anarak açılır ve köprü sorusunu bu alanın bir örneği olarak sunar. Mektuplarında Euler daha mesafelidir. 3 Nisan 1736'da, çözümü kanıtıyla birlikte isteyen Danzig'li Carl Ehler'e, böyle bir çözümün matematikle pek ilgisi olmadığını, yalnızca akla dayandığını ve neden bir matematikçiden beklendiğini anlamadığını yazar. Aynı yıl İtalyan matematikçi ve mühendis Giovanni Marinoni'ye ise sorunun sıradan olduğunu, ama ne geometrinin ne cebirin ne de sayma sanatının çözmeye yetmediği için ilgisini çektiğini söyler.",
    "Euler'in kanıtı bir sayımdı. Çizge çizmedi; bölgelere A, B, C, D, köprülere a'dan g'ye harfler verdi ve yürüyüşü, geçilen bölgelerin harf dizisi olarak yazdı: yedi köprüden geçen bir yürüyüş sekiz harf tutar. Bir bölgeye tek sayıda, k tane köprü iniyorsa o bölgenin harfi dizide (k + 1)/2 kez geçmek zorundadır. Beş köprülü ada A üç kez, üçer köprülü B, C ve D ikişer kez: toplam dokuz harf, oysa dizide sekiz yer var. Euler aynı makalede genel kuralı da verdi: tek sayıda köprü inen bölge ikiden fazlaysa yürüyüş yoktur; tam iki tane varsa yürüyüş birinde başlar, ötekinde biter; hiç yoksa her yerden başlanabilir. Kuralın 'ikiden fazlaysa yürüyüş yok' yarısını kanıtladı; 'sıfır ya da iki tane varsa yürüyüş var' yarısını ise kanıtsız bıraktı. O yarıyı Carl Hierholzer kanıtladı; makalesi 1871'deki ölümünden sonra, 1873'te yayımlandı.",
    "Alanın adı bile yüz kırk yıldan uzun bekledi. 'Graph' sözcüğünü 1878'de J. J. Sylvester, kimyacıların molekül çizimlerinden esinlenerek <em>Nature</em> dergisinde kullandı. O sırada Kirchhoff elektrik devrelerini çözmek (1847), Cayley ise ağaçları ve hidrokarbon izomerlerini saymak için bu yapılarla çoktan çalışmıştı; Francis Guthrie'nin 1852'de ortaya attığı dört renk problemi ise bir asırdan uzun süre çözümsüz kalacaktı. Alanın ilk ders kitabını 1936'da Macar matematikçi Dénes Kőnig yazdı. Türkçede 'çizge' sözcüğü kullanılır; böylece fonksiyon grafiğiyle karışmaz: burada eksen yok, yalnızca düğümler ve kenarlar var.",
    "Yirminci yüzyılda kuram büyük sorularına cevap buldu. Kazimierz Kuratowski 1930'da bir çizgenin ne zaman kesişmesiz çizilebileceğini tam olarak söyledi: ancak ve ancak beş düğümlü tam çizge K₅'in ya da 'üç ev, üç kuyu' çizgesi K₃,₃'ün bir alt bölünmesini içermiyorsa. 1959'da Edgar Gilbert, aynı yıllarda da Paul Erdős ile Alfréd Rényi kenarları rastgele seçilen çizgeleri incelemeye başladı; Erdős ile Rényi'nin bulgularından biri, bağlılığın belli bir eşikte birdenbire ortaya çıkmasıydı. 1976'da Kenneth Appel ve Wolfgang Haken, Guthrie'nin dört renk sorusunu bilgisayarın denetlediği bir kanıtla kapattı. Aynı yüzyılda çizgeler bir algoritma alanı da oldu; en kısa yol ve arama yöntemlerini Algoritmalar ve Yol Bulma sayfalarında adım adım izleyebilirsin. Bu sayfa öbür yüzü gösterir: bir sayının neden öyle çıkmak zorunda olduğunu söyleyen teoremleri.",
  ],
  core: [
    {
      heading: "Derece, el sıkışma ve Euler'in teoremi",
      body:
        "Bir düğümün <strong>derecesi</strong> ona değen kenar uçlarının sayısıdır: paralel kenarların her biri ayrı sayılır, bir <em>ilmek</em> dereceye 2 katar. Bütün (düğüm, kenar ucu) çiftlerini iki yoldan sayınca <strong>el sıkışma önermesi</strong> çıkar: derecelerin toplamı 2|E|'dir, bu yüzden tek dereceli düğüm sayısı her zaman çifttir. Euler'in teoremi bu sayıya bakar. Kenarlar tek bir bileşendeyse, hiç tek dereceli düğüm yoksa bir <strong>Euler devresi</strong>, tam iki tane varsa o ikisi arasında bir <strong>Euler yolu</strong> vardır; başka durumda yoktur. Gereklilik basittir: uç olmayan bir düğümden her geçiş bir giriş ve bir çıkış harcar. Yeterliliği Hierholzer'in yöntemi kurar: bütün dereceler çiftse kullanılmamış kenarlardan yürüyen biri ancak başladığı yerde takılır; kalan kenarlardan yeni kapalı turlar bulunup araya eklenir ve her kenara bir kez bakılır. Yol yoksa da kenarlar max(1, t/2) kalem darbesiyle örtülebilir (t: tek dereceli düğüm sayısı): tekleri hayalî kenarlarla eşle, devreyi bul, hayalî kenarlarda kes.",
      formula: "Σ<sub>v</sub> deg(v) = 2|E|  ·  Euler devresi ⇔ t = 0  ·  Euler yolu ⇔ t = 2",
      formulaNote: "İki koşulda da kenarı olan bütün düğümler tek bileşende olmalı; yalnız düğümler etkisizdir. Gerekliliği Euler (1735 sunumu), yeterliliği Hierholzer (1873) kanıtladı. Sayfa Σ deg(v) ile 2|E|'yi ayrı ayrı sayar, darbe sayısını bileşen başına max(1, t/2) kuramıyla karşılaştırır.",
    },
    {
      heading: "Ağaçlar ve kapsayan ağaçları saymak",
      body:
        "Bağlı ve döngüsüz çizgeye <strong>ağaç</strong> denir. n düğümlü bir çizgede şu üç özellikten herhangi ikisi üçüncüsünü gerektirir: bağlı, döngüsüz, |E| = n − 1. Bir çizgenin bütün düğümlerini kapsayan ağaçlarına <strong>kapsayan ağaç</strong> denir; her biri tam n − 1 kenarlıdır. Kaç tane olduklarını Kirchhoff'un <strong>matris-ağaç teoremi</strong> (1847) söyler: Laplace matrisi L = D − A'dan bir satır ve aynı sütun silinince kalan determinant τ(G)'dir. Çoklu kenarda A<sub>uv</sub> kenar sayısıdır, yani paralel kenarlar ayrı ağaçlar verir; ilmekler hiçbir ağaca giremez ve atılır. Tam çizge Kₙ'de bu determinant n<sup>n−2</sup>'ye iner: Cayley formülü (önce Borchardt 1860, sonra Cayley 1889). Ağırlıklı çizgede en küçük toplamlı kapsayan ağacı Kruskal (kenarları hafiften ağıra dene, döngü kurmayanı al) ve Prim (tek düğümden büyüt, sınırı geçen en hafif kenarı ekle) bulur; ikisi de 'bir kesiti geçen en hafif kenar bir en küçük ağaçta vardır' özelliğine dayanır.",
      formula: "τ(G) = det L<sub>(i)</sub>,  L = D − A  ·  τ(Kₙ) = n<sup>n−2</sup>",
      formulaNote: "L<sub>(i)</sub>: L'den i. satır ve i. sütun silinmiş matris; hangi i seçilirse seçilsin sonuç aynıdır. Sayfa determinantı tam sayılarla (BigInt) hesaplar ve 1,5 milyon alt kümeye kadar ağaçları tek tek sayarak denetler.",
    },
    {
      heading: "Boyama: iki sınır ve bir teorem",
      body:
        "Komşu iki düğüme aynı rengi vermeden bir çizgeyi boyamaya yeten en az renk sayısı <strong>kromatik sayı</strong> χ'dir. Alttan en büyük klik ω sınırlar: karşılıklı komşu ω düğüm ω renk ister. Üstten Δ + 1 sınırlar: <strong>açgözlü boyama</strong> düğümleri bir sırayla dolaşıp her birine komşularında kullanılmamış en küçük rengi verir ve bir düğümün en çok Δ komşusu olduğu için Δ + 1'i hiç aşmaz. İki sınır da sıkı olmayabilir: Petersen çizgesinde ω = 2, χ = 3, Δ + 1 = 4. χ ≤ 2 sorusunun ise kesin bir cevabı var: çizge <strong>iki parçalıdır</strong> ancak ve ancak tek uzunlukta döngüsü yoksa. BFS katmanların tek–çift olmasına göre boyar; aynı renkli iki komşu bulursa, ikisinin ortak ataya giden yolları tek uzunlukta bir döngü kapatır. <strong>Dört renk teoremi</strong>: bölgeleri bağlantılı ve komşuluğu sıfırdan uzun bir ortak sınır olan her düzlem haritası dört renkle boyanabilir; eşdeğeri, her düzlemsel çizgede χ ≤ 4.",
      formula: "ω(G) ≤ χ(G) ≤ Δ(G) + 1  ·  iki parçalı ⇔ tek döngü yok ⇔ χ ≤ 2",
      formulaNote: "Açgözlünün sonucu sıraya bağlıdır; her çizgede χ renk bulduğu bir sıra vardır ama onu bulmak kolay değildir. Sayfa kesin χ'yi geri izlemeyle yalnız 12 düğüme kadar hesaplar.",
    },
    {
      heading: "Düzlemsellik: V − E + F ve ondan çıkan sınırlar",
      body:
        "Kenarları kesişmeden çizilmiş sonlu ve bağlı bir çizgede <strong>Euler formülü</strong> V − E + F = 2'dir; F dış yüzü de sayar. Kanıt bir tümevarımdır: bir kapsayan ağaç için E = V − 1, F = 1 ve toplam 2'dir; bir döngü kapatan her yeni kenar bir yüzü ikiye böler, E ile F birlikte bir artar. C bileşenli kesişmesiz bir çizimde toplam 1 + C olur. Buradan gerekli bir koşul çıkar: V ≥ 3 düğümlü <strong>basit</strong> (ilmeksiz, paralel kenarsız) düzlemsel bir çizgede her yüz en az 3 kenarla çevrilidir, her kenar en çok 2 yüze değer; 3F ≤ 2E, formülle birlikte E ≤ 3V − 6 verir. Üçgen yoksa 4F ≤ 2E ve E ≤ 2V − 4. K₅'te 10 > 9, K₃,₃'te 9 > 8: ikisi de düzlemsel değildir. Koşulun sağlanması ise hiçbir şey kanıtlamaz. Tam ölçüt Kuratowski teoremidir (1930): sonlu bir çizge, ancak ve ancak K₅ ya da K₃,₃'ün bir alt bölünmesini içermiyorsa düzlemseldir.",
      formula: "V − E + F = 2 (bağlı)  ·  1 + C (genel)  ·  E ≤ 3V − 6 (basit, V ≥ 3)",
      formulaNote: "Basitlik şartı gereklidir: paralel iki kenar yalnız 2 kenarla çevrili bir yüz bırakır. Sayfadaki Königsberg çiziminde V = 4, E = 7, F = 5; V − E + F = 2 tutar ama 7 > 3·4 − 6 = 6, sayfa bu yüzden sınırı 'Uygulanmaz' diye yazar.",
    },
    {
      heading: "Rastgele çizge: bağlılık neden ln n / n'de açılır",
      body:
        "<strong>G(n, p)</strong> modelinde n etiketli düğümün her çifti, öbürlerinden bağımsız olarak p olasılıkla kenar alır. Modeli 1959'da Edgar Gilbert tanımladı; Erdős ile Rényi aynı yıl kenar sayısı sabit M olan yakın akrabası G(n, M)'yi incelemeye başladı (1959–1960) ve büyük n'de iki model aynı eşikleri verir. Bir düğüm n − 1 kenarın hiçbirini almazsa yalnız kalır; beklenen yalnız düğüm sayısı μ = n(1 − p)<sup>n−1</sup> ≈ n e<sup>−pn</sup>'dir. μ = 1 koşulu p = ln n / n verir: eşik budur. Eşiğin biraz altında hemen her zaman yalnız bir düğüm vardır, biraz üstünde çizge hemen her zaman bağlıdır; bu bir limit ifadesidir (her ε > 0 için (1 ± ε) ln n / n). Eşik yakınında bağlılığı çoğunlukla tek bir yalnız düğüm bozar; sayfa n = 30, p = 0,1'de bağlı çıkmayan denemelerin %96'sında yalnız düğüm bulur. Yalnız düğüm sayısı yaklaşık Poisson dağılır, bu yüzden P(bağlı) ≈ P(yalnız düğüm yok) ≈ e<sup>−μ</sup>. Sonlu n için kesin değeri özyineleme verir: 1 numaralı düğümün bileşeni tam k düğümlüyse o k düğüm kendi aralarında bağlıdır ve kalan m − k düğümle aralarında hiç kenar yoktur.",
      formula: "P<sub>m</sub> = 1 − Σ<sub>k=1…m−1</sub> C(m−1, k−1) · P<sub>k</sub> · (1 − p)<sup>k(m−k)</sup>",
      formulaNote: "n = 100, p = 0,046 için μ = 100 · 0,954<sup>99</sup> ≈ 0,94 ve e<sup>−0,94</sup> ≈ 0,39; sayfanın kesin değeri 0,3866. p = (ln n + c)/n iken limitte P(bağlı) → e<sup>−e<sup>−c</sup></sup>; tam eşikte e<sup>−1</sup> ≈ 0,368.",
    },
  ],
  lab: {
    intro:
      "Dört sekme aynı çizgeyi paylaşır; tuval ve <strong>Çizgeyi kur</strong> paneli hangi sekmedeysen oraya taşınır. Tuvalin üstündeki kipler: <strong>Düğüm ekle / taşı</strong> (boş yere dokun ya da düğümü sürükle), <strong>Kenar çiz</strong> (iki düğüme sırayla dokun; aynı düğüme iki kez ilmek, aynı çifte ikinci kez paralel kenar) ve <strong>Sil</strong>. Panelde <strong>Hazır çizge</strong> menüsü (Königsberg, K₅, K₃,₃, Petersen, Küp, ağaç, harita, Taç, Kₙ, G(n, p), boş tuval) ve <strong>Hazır çizgeyi yükle</strong> düğmesi var; <strong>Uç 1</strong>, <strong>Uç 2</strong> ve <strong>Kenar ekle</strong> klavyeyle kenar ekler. <strong>01 · Derece ve Euler</strong> dereceleri, bileşenleri ve Hierholzer'in izini canlandırır; <strong>02 · Ağaçlar ve kapsayan ağaç</strong> Kruskal, Prim, kaba kuvvet ve Kirchhoff'u yan yana koyar; <strong>03 · Boyama</strong> açgözlü renk sayısını kesin χ ile karşılaştırır; <strong>04 · Düzlemsellik ve Euler formülü</strong> yüzleri çizimden sayar ve altındaki <strong>Rastgele çizge G(n, p)</strong> bölümünde bağlı çıkma olasılığını Monte Carlo ile kesin formül arasında sınar. Her sekmenin bir sıfırlama düğmesi var; <kbd>R</kbd> da etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Sekizinci köprü: dört tek düğümden ikiye",
        predict:
          "Königsberg'de dört kara parçasının dördü de tek dereceli. Kenarları en az kaç ayrı kalem darbesiyle çizebilirsin? B ile C arasına tek bir köprü eklemek yürüyüşü mümkün kılar mı; kılarsa nerede başlayıp nerede biter?",
        do:
          "01 · Derece ve Euler sekmesinde okumalara bak ve Oynat'a bas. Sonra «Sekizinci köprü: B–C» düğmesine basıp yeniden oynat. Son olarak Başlangıç düğümü menüsünden önce B'yi, sonra D'yi seç.",
        observe:
          "Önce: Σ deg(v) 14, 2|E| 14; tek dereceli «4 · A, B, C, D»; «Euler yolu yok (t = 4)»; darbe «2 / 2», sıra «darbe 1: D → B · darbe 2: A → B → A → C → A → D → C». Köprüden sonra: 16 ve 16; «2 · A, D»; «Euler yolu var: A ↔ D»; iz «8 / 8». B seçilince durum satırı B'nin çift dereceli olduğunu söyler ve izi A'dan başlatır; D seçilince iz D'den A'ya gider.",
        explain:
          "Yeni köprü B'nin ve C'nin derecesini 3'ten 4'e çıkarır; tek kalan A ve D yolun zorunlu uçlarıdır. Çift dereceli bir düğümden çıkan iz oraya her dönüşünde bir çıkış bulur, iki tek ucu birden karşılayamaz. Köprüsüz hâlde t = 4: her darbe en çok iki tek düğümü uç olarak tüketir, en az t/2 = 2 darbe gerekir ve sayfa tam ikisini bulur.",
      },
      {
        title: "Küpün 384 ağacı ve Cayley'in sayısı",
        predict:
          "Küpün 8 düğümü, 12 kenarı var. Her kapsayan ağaç kaç kenarlıdır? Bütün ağırlıklar eşit olursa kaç farklı 'en küçük' ağaç çıkar? K₆ ve K₉'da kaç kapsayan ağaç beklersin?",
        do:
          "02 · Ağaçlar sekmesini sıfırla (Küp, tohum 1) ve okumalara bak. «Bütün ağırlıklar 1» düğmesine bas. Sonra «Kₙ için n» kaydırıcısını 6 yapıp «Kₙ yükle»ye bas; ardından n = 9 ile tekrarla.",
        observe:
          "Küp: «Hayır · 12 / 7», Kruskal 18, Prim 18, kaba kuvvet «en küçük 18 · 1 en küçük ağaç», τ 384, tek tek sayım 384. Ağırlıklar 1 olunca: Kruskal 7, «en küçük 7 · 384 en küçük ağaç». K₆: τ «1 296», sayım «1 296», Cayley «1 296 = 6⁴». K₉: τ «4 782 969», Cayley «4 782 969 = 9⁷», kaba kuvvet «atlandı · 30 260 340 alt küme».",
        explain:
          "Her kapsayan ağaç n − 1 = 7 kenarlıdır; ağırlıklar 1 iken hepsi 7 tutar ve 384'ünün hepsi en küçüktür. Tohum 1'in ağırlıklarıyla ise en küçük ağaç tektir; bütün ağırlıklar birbirinden farklı olsaydı bu her zaman böyle olurdu. Eşitlikler bunu bozabilir: Königsberg'de kaba kuvvet aynı toplamı veren 2 ağaç bulur. K₉'da 36 kenardan 8'ini seçmenin 30 milyonu aşkın yolu var; bunları tek tek denemek yerine 8 × 8'lik bir determinant aynı sayıyı anında verir: 9⁷.",
      },
      {
        title: "Açgözlü boyama sıraya bağlıdır",
        predict:
          "Taç çizgesinde 8 düğüm iki sıradadır ve her düğüm karşı sıradaki üç düğüme bağlıdır. Kaç renk gerekir? Düğümleri numara sırasıyla boyayan açgözlü yöntem kaç renk kullanır?",
        do:
          "03 · Boyama sekmesinde «Taç çizgesi»ne bas. Sonra Açgözlü sıra menüsünde «Derece azalan (Welsh–Powell)», ardından «Tohumlu rastgele sıra» seç ve Sıra tohumunu 1'den 8'e kadar kaydır. En son «Düzlemsel harita»yı yükle.",
        observe:
          "Taç: açgözlü 4, χ 2, fark «+2», iki parçalı «Evet»; sıra «1: 1 · 2: 1 · 3: 2 · 4: 2 · 5: 3 · …». Derece azalan sıra da 4 verir. Rastgele sırada tohum 1, 2, 3, 5, 7 ve 8 iki renk, 4 ve 6 üç renk bulur. Harita: açgözlü 4, χ 4, ω 3, Δ + 1 = 6; durum satırı dört renk teoremini anar.",
        explain:
          "1 ile 2 aralarında kenar olmayan bir çifttir ve ikisi de 1. rengi alır. Sonraki her çift, önceki bütün renkleri komşularında görür ve yeni bir renk açar. Bütün dereceler 3 olduğu için Welsh–Powell sırası değişmez. Çizge iki parçalıdır, yani χ = 2: BFS iki renkle çatışmasız boyar. Açgözlü yöntem hızlıdır ama en iyiyi garanti etmez.",
      },
      {
        title: "Aynı çizge, iki çizim; sonra K₃,₃",
        predict:
          "«Küpü dolaştır» aynı 8 düğümü ve 12 kenarı iki kesişmeyle çizer. Kesişme çizgenin mi, çizimin mi özelliği? K₃,₃ E ≤ 3V − 6 koşulunu sağlar mı; sağlıyorsa düzlemsel midir?",
        do:
          "04 · Düzlemsellik sekmesinde «Küpü dolaştır»a bas. İç karenin üstteki iki düğümünü (5 ve 6) sürükleyerek yer değiştir: birini önce boş bir yere çek, ötekini onun eski yerine taşı, sonra ilkini kalan yere getir. Sonra «K₃,₃» düğmesine bas.",
        observe:
          "Dolaşık çizim: kesişme 2, F «Tanımsız», sonuç «Karar verilemedi». İki düğüm yer değişince kesişme 0, F 6, V − E + F = 2, kuram 2, «Düzlemsel». K₃,₃: kesişme 9, «Evet: 9 ≤ 12» ama «Hayır: 9 > 8», «Düzlemsel değil».",
        explain:
          "Kesişme sayısı ekrandaki çizimin sayımıdır; aynı küp 2 kesişmeyle de 0 kesişmeyle de çizilebilir. Yüzleri saymak için kesişmesiz bir çizim gerekir. K₃,₃'te tek döngü yoktur, en kısa döngü 4 kenarlıdır; her yüz en az 4 kenarla çevrilidir, 4F ≤ 2E ve Euler formülü E ≤ 2V − 4 verir: 9 > 8. 3V − 6 testini geçmek bir şey kanıtlamaz.",
      },
    ],
  },
  wow: [
    {
      title: "Bilgisayar yardımıyla kanıtlanan ilk büyük teorem",
      body:
        "1852'de Francis Guthrie, İngiltere'nin kontluklar haritasını boyarken komşu bölgeleri ayırmak için dört rengin yettiğini fark etti. Kesin ifade iki koşul ister: her bölge tek parça olmalı ve yalnız bir noktada değen bölgeler komşu sayılmamalı. Kanıt 1976'da geldi: Kenneth Appel ve Wolfgang Haken sorunu bin sekiz yüzü aşkın özel yapılandırmaya indirip her birini bilgisayara denetletti; hesap bin saati aştı. İnsanın elle denetleyemediği bir kanıtın kanıt sayılıp sayılamayacağı uzun süre tartışıldı. 1997'de Robertson, Sanders, Seymour ve Thomas yapılandırma sayısını 633'e indirdi; 2005'te Georges Gonthier ve Benjamin Werner kanıtı Coq kanıt denetleyicisinde baştan sona biçimselleştirdi.",
    },
    {
      title: "Eşikte bile yazı tura değil",
      body:
        "30 düğümlü bir rastgele çizgede eşik p = ln 30 / 30 ≈ 0,113'tür. Sayfanın kesin eğrisine göre bu değerde çizgenin bağlı çıkma olasılığı 0,3869'dur. p'yi yarıya, 0,057'ye indirirsen olasılık 0,0021'e düşer; iki katına, 0,226'ya çıkarırsan 0,9823'e yükselir. Kenar olasılığı yalnız dört kat değişirken bağlılık neredeyse imkânsızdan neredeyse kesine geçer. Kaydırıcıyla kendin dene: «Kenar olasılığı p» değerini değiştirdikçe «Kesin P(bağlı)» okuması bu sayıları verir.",
    },
    {
      title: "Her köprüden iki kez geçmek mümkün",
      body:
        "Euler makalesinde bir not daha düşer: Königsberg'de her köprüden tam iki kez geçen bir yürüyüş vardır. Her köprüyü iki köprü saymak, her bölgeye inen köprü sayısını çiftler. Sayfada dene: Uç 1, Uç 2 ve «Kenar ekle» ile her köprünün yanına bir kenar daha koy (A–B ve A–C için ikişer, öteki üçü için birer). Dereceler 10, 6, 6, 6 olur ve sayfa «Euler devresi var» der. Fikir her bağlı çizgeye genellenir: bütün kenarları ikiye katlarsan bütün dereceler çift olur.",
    },
  ],
  worked: {
    title: "Königsberg'in 21 kapsayan ağacı: determinantla ve elle",
    prompt:
      "Königsberg çoklu çizgesinde A–B ve A–C ikişer, A–D, B–D ve C–D birer kenarla bağlı. Kaç kapsayan ağaç vardır? Matris-ağaç teoremiyle hesapla, iki farklı satır silerek sonucun değişmediğini gör, sonra ağaçları elle sayarak doğrula. Sayfada: 02 · Ağaçlar sekmesinde Hazır çizge = Königsberg, «Hazır çizgeyi yükle».",
    steps: [
      "Dereceler A: 5, B: 3, C: 3, D: 3. Laplace matrisi L = D − A, satırlar A, B, C, D sırasıyla: (5, −2, −2, −1), (−2, 3, 0, −1), (−2, 0, 3, −1), (−1, −1, −1, 3). Köşegen dışındaki −2'ler paralel kenarlardır; her satırın toplamı 0'dır.",
      "A'nın satırını ve sütununu sil: kalan matris (3, 0, −1), (0, 3, −1), (−1, −1, 3). İlk satıra göre aç: det = 3 · (3 · 3 − (−1)(−1)) − 0 + (−1) · (0 · (−1) − 3 · (−1)) = 3 · 8 − 3 = 21.",
      "Bu kez D'nin satırını ve sütununu sil: (5, −2, −2), (−2, 3, 0), (−2, 0, 3). det = 5 · 9 − (−2) · (−6) + (−2) · 6 = 45 − 12 − 12 = 21. Teorem söz verdiği gibi hangi satırı sildiğimize bakmaz.",
      "Elle sayım: paralel kenarları teke indirince 5 kenar kalır; 3'lü seçimlerin 10'undan iki üçgen (A–B–D ve A–C–D) atılır, 8 ağaç iskeleti kalır. Her iskelet, kullandığı kenarların kat sayılarının çarpımı kadar ağaç verir: A–B ile A–C'nin ikisini de içeren 3 iskelet 2 · 2 = 4'er, yalnız birini içeren 4 iskelet 2'şer, hiçbirini içermeyen yıldız (A–D, B–D, C–D) 1 ağaç. Toplam 12 + 8 + 1 = 21.",
      "Sayfa da aynı sayıyı verir: τ (Kirchhoff) 21 ve tek tek sayım 21. Her ağaç 3 kenarlıdır, yani 7 kenardan her ağacın dışında 7 − 3 = 4 kenar kalır. Bu sayı, E − V + 1 = 7 − 4 + 1, çizgenin bağımsız döngü sayısıdır: dışarıda kalan her kenar ağaca eklenince tam bir döngü kapatır.",
    ],
    result:
      "τ = 21. Determinant 'kaç ağaç?' sorusunu bir hesaba çevirir; 4 düğümde elle doğrulanabilir, 9 düğümlü tam çizgede ise 30 milyonu aşkın kenar seçimini denemek yerine tek bir 8 × 8 determinant 4 782 969 verir.",
  },
  misconceptions: [
    {
      myth: "Kenarları kesişen bir çizim, çizgenin düzlemsel olmadığını gösterir.",
      truth:
        "Kesişme çizimin özelliğidir, çizgenin değil. «Küpü dolaştır» küpü 2 kesişmeyle çizer; iki düğümü yer değiştirince kesişme 0 olur. Sayfadaki «Çizimdeki kenar kesişmesi» kutusu bu yüzden ekrandaki çizimin sayımıdır; bütün çizimler üzerindeki en küçük değer olan kesişme sayısı başka bir niceliktir. Düzlemsel olmamayı kanıtlamak için bir değişmez gerekir: E > 3V − 6, E > 2V − 4 ya da Kuratowski.",
    },
    {
      myth: "E ≤ 3V − 6 sağlanıyorsa çizge düzlemseldir.",
      truth:
        "Koşul gereklidir, yeterli değildir. K₃,₃'te 9 ≤ 12 sağlanır, ama üçgensiz çizgeler için daha sıkı olan E ≤ 2V − 4 bozulur: 9 > 8. Petersen çizgesi ikisini de sağlar (15 ≤ 24 ve 15 ≤ 16) ve yine de düzlemsel değildir; sayfa bu yüzden ona «Karar verilemedi» der. Düzlemselliği ancak kesişmesiz bir çizim kanıtlar.",
    },
    {
      myth: "Açgözlü boyamanın kullandığı renk sayısı, çizgenin gerçekten ihtiyaç duyduğu sayıdır.",
      truth:
        "Açgözlü yöntem sıraya bağlıdır. Taç çizgesi iki parçalıdır, yani χ = 2; ama düğüm sırasıyla boyanınca 4 renk kullanılır. En büyük klik de χ'yi her zaman vermez: Petersen çizgesinde üçgen yoktur (ω = 2), ama 5 kenarlı tek döngüleri yüzünden χ = 3'tür.",
    },
    {
      myth: "Bir çizgede tek dereceli düğüm sayısı herhangi bir sayı olabilir; üç tane de olur.",
      truth:
        "Olamaz. Derecelerin toplamı kenar sayısının iki katıdır, yani çifttir; çift bir toplama ulaşmak için tek sayıların adedi çift olmalıdır. Sayfada paralel kenar ya da ilmek eklesen bile «Tek dereceli düğüm» okuması 1, 3 ya da 5 gösteremez.",
    },
  ],
  glossary: [
    { term: "Derece", definition: "Bir düğüme değen kenar uçlarının sayısı; paralel kenarların her biri ayrı sayılır, ilmek 2 katar." },
    { term: "Euler yolu ve devresi", definition: "Her kenarı tam bir kez kullanan, düğümlerden ise istediği kadar geçebilen yürüyüş; başladığı düğümde bitiyorsa devre, bitmiyorsa yol adını alır." },
    { term: "Ağaç ve kapsayan ağaç", definition: "Döngüsü olmayan bağlı çizge ağaçtır; bir çizgenin bütün düğümlerini içeren ve yalnız onun kenarlarını kullanan ağaca kapsayan ağaç denir." },
    { term: "Laplace matrisi", definition: "L = D − A: köşegende dereceler, köşegen dışında iki düğüm arasındaki kenar sayısının eksisi; herhangi bir satır ve aynı sütun silinince kalan determinant kapsayan ağaç sayısıdır." },
    { term: "Kromatik sayı χ", definition: "Komşu iki düğüme aynı rengi vermeden çizgeyi boyamaya yeten en az renk sayısı." },
    { term: "İki parçalı çizge", definition: "Düğümleri, her kenar bir kümeden ötekine gidecek biçimde iki kümeye ayrılabilen çizge; tek uzunlukta döngüsü olmayan çizgelerin tam kendisi." },
    { term: "Düzlemsel çizge ve yüz", definition: "Kenarları kesişmeden düzleme çizilebilen çizge düzlemseldir; böyle bir çizimin düzlemi böldüğü bölgelere, dıştaki sınırsız bölge de dahil, yüz denir." },
    { term: "G(n, p)", definition: "n etiketli düğümün her çiftine, öbürlerinden bağımsız olarak p olasılıkla kenar konan rastgele çizge modeli." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın dört sekmesi üniversitede dört derse açılır. <strong>Ayrık Matematik</strong> çift sayımı, tümevarımı, Euler–Hierholzer teoremini, ağaç eşdeğerliklerini, boyamayı ve Kuratowski teoremini kanıtlarıyla işler. <strong>Lineer Cebir</strong> Laplace matrisini bir nesne olarak inceler: L simetrik ve yarı pozitif tanımlıdır, 0 özdeğerinin katlılığı bileşen sayısına eşittir ve matris-ağaç teoremi τ'yu sıfır olmayan özdeğerlerin çarpımının n'ye bölümü olarak da verir; Kₙ'nin özdeğerleri 0 ve (n − 1 kez) n olduğundan n<sup>n−1</sup>/n = n<sup>n−2</sup>. <strong>Olasılık</strong> derslerinde G(n, p) birinci ve ikinci moment yöntemlerinin klasik örneğidir; p, 1/n eşiğini geçince düğümlerin sabit bir kesrini içeren bir de dev bileşen belirir. <strong>Topoloji</strong>de V − E + F bir yüzeyin Euler karakteristiğidir: kürede 2, simitte 0; K₅ ve K₃,₃ düzlemde kesişmesiz çizilemez ama simit üzerine çizilebilir.",
      "Sonra hesaplamanın sınırları başlar. Euler yolunu dereceler ve Hierholzer doğrusal zamanda çözer; her düğümden bir kez geçen <strong>Hamilton yolu</strong> (adını, 1857'de bir onikiyüzlünün köşelerini dolaştıran Icosian oyununu tasarlayan William Rowan Hamilton'dan alır) için ise bilinen hiçbir polinom zamanlı yöntem yoktur: problem NP-tamdır. Boyamada aynı ayrım var: χ ≤ 2 sorusunu BFS doğrusal zamanda cevaplar, χ ≤ 3 sorusu NP-tamdır; sayfanın kesin χ'yi 12 düğümle sınırlaması bu yüzden. Düzlemsellik ise doğrusal zamanda sınanabilir. Ağ biliminde Watts ve Strogatz 1998'de 'küçük dünya' ağlarını, Barabási ve Albert 1999'da az sayıda çok yüksek dereceli düğümün baskın olduğu ölçeksiz ağları modelledi. Kenarlar üzerinde en kısa yol, akış ve eşleştirme ise <strong>Algoritmalar</strong> ve <strong>Yöneylem Araştırması</strong> derslerinin konusudur.",
    ],
    topics: ["El sıkışma ve çift sayım", "Euler–Hierholzer teoremi", "Matris-ağaç teoremi ve Laplace spektrumu", "Kromatik sayı ve NP-tamlık", "Euler karakteristiği ve yüzeyler", "Kuratowski ve Wagner teoremleri", "Rastgele çizgeler: eşikler ve dev bileşen", "Hamilton yolları"],
  },
  quiz: [
    {
      question: "Bir partide 9 kişinin her biri tam 3 kişiyle el sıkışmış olabilir mi?",
      options: ["Evet; 9 kişi bunun için yeterince kalabalık", "Hayır; derecelerin toplamı tek olurdu", "Yalnızca bazı çiftler iki kez el sıkışırsa", "Yalnızca herkes herkesi tanıyorsa"],
      answer: 1,
      explanation: "Kişiler düğüm, el sıkışmalar kenar olsun. Derecelerin toplamı 9 × 3 = 27 çıkar; oysa her el sıkışma iki kişiye sayıldığı için bu toplam kenar sayısının iki katı, yani çift olmalıdır. İki kez el sıkışmak (paralel kenar) da kurtarmaz: her kenar yine iki uçla sayılır.",
    },
    {
      question: "Sayfadaki Königsberg çoklu çizgesi kesişmesiz çizilir: V = 4, E = 7, F = 5. Oysa 7 > 3 · 4 − 6 = 6. Bu, E ≤ 3V − 6 koşulunu çürütür mü?",
      options: ["Evet; koşul yanlış olmalı", "Hayır; koşul basit çizgeler içindir ve paralel kenarlar yalnız 2 kenarla çevrili yüzler bırakır", "Hayır; koşul yalnız V ≥ 5 için geçerlidir", "Evet; demek ki Königsberg çizgesi aslında düzlemsel değildir"],
      answer: 1,
      explanation: "E ≤ 3V − 6'nın kanıtı her yüzün en az 3 kenarla çevrili olduğunu (3F ≤ 2E) kullanır. Paralel iki köprünün arasında 2 kenarlı bir yüz kalır; Königsberg çiziminde A–B ve A–C arasında iki tane var. Yüz uzunlukları 2 + 2 + 3 + 3 + 4 = 14 = 2E. Euler formülü ise yine tutar: 4 − 7 + 5 = 2. Sayfa bu yüzden sınır için «Uygulanmaz» yazar.",
    },
    {
      question: "G(n, p)'de n = 100 ve p = 0,046 (≈ ln n / n). Beklenen yalnız düğüm sayısı yaklaşık kaçtır?",
      options: ["Yaklaşık 0,01", "Yaklaşık 1", "Yaklaşık 4,6", "Yaklaşık 50"],
      answer: 1,
      explanation: "Bir düğüm 99 kenarın hiçbirini almazsa yalnızdır: (1 − 0,046)<sup>99</sup> ≈ e<sup>−4,6</sup> ≈ 0,0095. 100 düğümle çarpınca μ ≈ 0,94. Eşiğin tanımı tam da budur: n e<sup>−pn</sup> = 1. Yalnız düğüm yok olasılığı yaklaşık e<sup>−0,94</sup> ≈ 0,39; sayfanın kesin P(bağlı) değeri 0,3866. p iki katına çıkarsa μ ≈ 0,007'ye iner ve bağlılık 0,99'u geçer.",
    },
  ],
  next: [
    { href: "algoritmalar.html", title: "Algoritmalar: Adımları Say", why: "Bu sayfada olmayan yarı: BFS, DFS, Dijkstra ve Bellman–Ford aynı çizgede, kuyruk, yığın ve 'en ucuz önce' kuralıyla adım adım ve işlem sayılarıyla." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma: Az Adım mı, Az Maliyet mi?", why: "Ağırlıklı bir ızgarada BFS, Dijkstra ve A*: en az adımlı yol ile en ucuz yolun neden ayrıldığını gör." },
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri: Düzlemi Dört Sayıyla Yeniden Çizmek", why: "Kirchhoff'un ağaç sayısı bir determinant; orada 2×2 bir matrisin determinantını alanın büyüme çarpanı olarak ölçersin." },
    {
      href: "sosyal-modeller-ve-aglar.html",
      title: "Sosyal Modeller ve Ağlar: Basit Kurallar, Şaşırtıcı Toplumlar",
      why: "Çizgeler toplumu modellediğinde: küçük dünya ağlarında kümelenme ve yol uzunluğunu, tercihli bağlanmada derece dağılımını ölç.",
    },
  ],
  sources: [
    { title: "Wikipedia · Seven Bridges of Königsberg", url: "https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg", note: "Euler'in derece argümanı, 26 Ağustos 1735 sunumu ve 1741 baskısı, 5–3–3–3 köprü sayıları (İngilizce)." },
    { title: "Wikipedia · Eulerian path", url: "https://en.wikipedia.org/wiki/Eulerian_path", note: "Euler devresi ve yolu koşulları, çoklu çizgeler, Hierholzer'in 1873 kanıtı ve algoritması (İngilizce)." },
    { title: "Wikipedia · Planar graph", url: "https://en.wikipedia.org/wiki/Planar_graph", note: "Euler formülü, E ≤ 3V − 6 ve E ≤ 2V − 4, Kuratowski ve Wagner teoremleri, dört renk teoremiyle bağı (İngilizce)." },
    { title: "Wikipedia · Erdős–Rényi model", url: "https://en.wikipedia.org/wiki/Erd%C5%91s%E2%80%93R%C3%A9nyi_model", note: "G(n, p) ve G(n, M) modelleri, Gilbert 1959, ln n / n bağlılık eşiği ve dev bileşen (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
