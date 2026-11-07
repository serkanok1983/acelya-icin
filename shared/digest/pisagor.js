window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["pisagor"] = {
  slug: "pisagor",
  title: "Pisagor: Kare, Üçlü ve Küre",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Dik üçgende iki karenin alanı üçüncüsüne eşittir. Açı sapınca kosinüs teoremi, kenarlar tam sayı olunca Öklid üçlüleri, yer eğrilince de açı fazlalığı aynı eşitliğin büyümüş hâlidir.",
  hook:
    "Bin kilometrelik iki dik yayı Dünya'nın üstüne koy. Düzlem hipotenüsü 1414.21356 km sayar; küre, aynı iki uç arasında 1411.29754 km ölçer. Aradaki 2.9160 km, karelerin toplandığı yüzeyin eğriliğidir. Açı dik olmaktan çıkınca ya da kenarlar tam sayıya oturunca bu eşitlik bambaşka bir kılığa girer.",
  bigIdea:
    "Dik üçgende hipotenüsün üzerindeki kare, iki dik kenarın karelerinin toplamıdır, <em>a² + b² = c²</em>; eşitlik açının 90° olduğunun hem sonucu hem karşıt işaretidir, kürede ise yerini açıların toplamındaki fazlalığa bırakır.",
  story: [
    "Teoremin adı Pisagor'dadır; elimizdeki en eski sayı ondan çok daha eskidir. Columbia Üniversitesi'ndeki Plimpton 322 tableti Eski Babil dönemindendir; yaygın tarihleme MÖ 1800 dolaylarıdır, daha dar bir öneri ise yaklaşık MÖ 1822–1784 aralığıdır. Korunan bir satırın kısa kenarı ile köşegeni ondalıkta 119 ve 169'dur. 120 ayrı bir sütun değildir; 119² + 120² = 14 161 + 14 400 = 28 561 = 169² eşitliğinden tamamlanır. Tabletin ne işe yaradığı da kapalıdır. Bir okuma onu dik üçgen listesi sayar, bir başkası altmışlık tabanda ters sayı çiftleri üreten bir okul tableti. Sayfadaki düğme yalnız m = 12, n = 5 ile üç sayıyı üretir. Çin'de aynı bağıntı <em>Zhoubi Suanjing</em>'de gou, gu ve xian adlarıyla 3, 4 ve 5 olarak geçer. Derlemenin tarihi tartışmalıdır: metin kendisini Zhou dönemine bağlar, bugünkü biçimi ise çoğu araştırmacıya göre Han dönemine aittir. Üçgenleri kaydıran ünlü şekil metnin kendisinde değil, Zhao Shuang'ın üçüncü yüzyıl yorumuyla birlikte anılır; onun Zhao'nun kendi kanıtı mı, daha eski bir fikrin çizimi mi olduğu da kapalıdır.",
    "Yazılı kanıtın duru hâli Öklid'in <em>Elementler</em>'idir, MÖ 300 dolayları. I.47 üç kenarın üzerine birer kare kurar ve dik kenarın karesini hipotenüs karesinin bir dikdörtgenine taşır. Hemen ardından I.48 yönü çevirir: kareler eşitse açı diktir. Üç kareli şekle sonradan gelinin sandalyesi denmiştir; bu ad Öklid'in metninde geçmez. Pisagor'un kendi elinden ise tek satır kalmamıştır. Teoremi ona bağlayan tanıklıklar yüzyıllar sonradır; neyi kendisinin bulduğu, neyi okulunun işlediği bugün ayırt edilemez. Okulun √2 ile imtihanı ayrı bir kapıdır. Karenin köşegeni kenara oranlanamaz: √2 = p/q en sade kesir olsaydı, pay da payda da çift çıkardı, yani tek sayı çifte eşit düşerdi. Aristoteles, ortak ölçü varsayılırsa tek sayının çifte eşit düşeceğini, köşegen için bilinen bir örnek diye anar. Hippasos'un denizde boğulduğu anlatılır; geç kaynaklar bunu kimi düzgün on iki yüzlüye, kimi köşegene bağlar ve birbirleriyle uyuşmaz. Anlatının kendisi efsanedir.",
    "Kanıt birikmeye devam etti, tam sayılar ise direndi. 1876'da, ABD Temsilciler Meclisi üyesi James A. Garfield, bir yamuk ile üç üçgenden kurulu kısa bir kanıt yayımladı; 1881'de başkan oldu. Elisha Scott Loomis'in 1940'taki ikinci basımı bu kanıtlardan 370 tanesini sayar. Pierre de Fermat ise 1637 dolaylarında, Diophantos'un bir nüshasının kenarına, n > 2 iken aⁿ + bⁿ = cⁿ eşitliğinin pozitif tam sayılarda çözümü olmadığını yazdı ve kanıtın kenara sığmadığını ekledi. Notu oğlu 1670'te bastı. n = 2, sayfadaki üçlülerin dünyasıdır. Aynı cümle 1993'te Andrew Wiles tarafından duyuruldu; kanıttaki açık Richard Taylor ile kapatıldı, ispat 1995'te yayımlandı. Düzlemin dışında kural bir kez daha değişir. Albert Girard, küresel üçgenin alanının açı fazlalığıyla ölçüldüğünü 1626'daki trigonometri kitabında verdi; 1629'daki cebir kitabı aynı ölçüyü küresel çokgenlere genişletir. Thomas Harriot'un daha erken, yayımlanmamış bir hesabı da anılır. Yer yuvarlaktır; uzun bir dik üçgenin hipotenüsü, haritadaki √(a² + b²)'den kısa kalır.",
  ],
  core: [
    {
      heading: "Karelerin eşitliği ve karşıtı",
      body:
        "Dik açının karşısındaki kenara <strong>hipotenüs</strong> denir. Üç kenarın üzerine, üçgenin dışına birer kare kur. Kanıtlar sekmesi bu karelerin alanını köşelerden, ayakkabı bağı formülüyle ölçer: S = ½|Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|. 3–4–5'te ölçüm 9.0000, 16.0000 ve 25.0000 br² verir. Yeniden düzenleme bunu bir alan özdeşliğine çevirir. Kenarı a + b olan karenin içine dört eş dik üçgen konur; ortadaki boşluk, kenarı c olan eğik bir karedir. Üçgenler yalnız ötelenir. Sol üstteki hipotenüsü boyunca (a, −b) kadar kayar, sağ üstteki b kadar sola, sol alttaki a kadar yukarı gider; sağ alttaki yerinde kalır. Dördünün alanı hep 2ab'dir. Büyük kare iki türlü dolmuş olur ve ortak 2ab silinince c² = a² + b² kalır. 3–4–5'te büyük kare 49.0000, dört üçgen 24.0000, boşluk 25.0000 br²'dir. <strong>Karşıt teorem</strong>, Öklid I.48, yönü çevirir: c² = a² + b² ise γ = 90°'dir. Sayfa γ'yı kaydırıcıdan okur ve cos 90°'yi tam 0 alır; o zaman ölçülen c² − (a² + b²) de 0 çıkar.",
      formula: "(a + b)² = c² + 2ab = a² + b² + 2ab",
      formulaNote: "3–4–5'te 49 = 25 + 24 = 9 + 16 + 24. Ortak 24 silinince 25 = 9 + 16 kalır.",
    },
    {
      heading: "Öklid'in kayması neden alanı korur?",
      body:
        "Sayfadaki Öklid I.47, kitabın üçgen eşliğini hareketli gösterir. C'den inen yükseklik, c² karesini BHLD ve AHLE dikdörtgenlerine böler. a² karesi önce BB′ kenarına paralel kayar. Taban ve yükseklik değişmediği için paralelkenarın alanı, taban çarpı yükseklik, yerinde kalır. Koordinatta bu <strong>kayma</strong> (x, y) → (x + ky, y) diye yazılır; alan çarpanı olan Jacobi determinantı 1'dir. Sonra paralelkenar B çevresinde 90° döner. Dönmenin determinantı da 1'dir, alan yine korunur. BB′ kenarı BC'ye, BA kenarı BD'ye gelir. Altyazı bu dönüşü Öklid'in FBC ≅ ABD eşliğine, kenar–açı–kenara bağlar; tuvalde F harfi yoktur, A′ ve B′ yalnız altyazıdadır. İkinci kayma parçayı BHLD dikdörtgenine oturtur: a² = c·p. b² aynı yolu A çevresinde yürür ve b² = c·q olur. İki dikdörtgen c² karesini doldurur. 3–4–5'te a² parçası adım boyunca 9.0000 br² kalır; p = HB = 1.80000 br ve c·p = 9.0000 br²'dir.",
      formula: "a² = c·p,   b² = c·q,   p + q = c",
      formulaNote: "p, B'ye bitişik parçadır. 3–4–5'te q = 3.20000 br ve c·q = 16.0000 br².",
    },
    {
      heading: "Benzerlik ve geometrik ortalama",
      body:
        "Aynı yükseklik üç üçgeni benzer kılar: CBH, ACH ve ABC'nin açıları α, β ve 90°'dir. CBH, kendi hipotenüsünün orta noktası çevresinde 180° döner ve a² karesine oturur; ACH, b² karesine. Dönme alanı yerinde bırakır. Benzer üçgenlerde alan, hipotenüsün karesiyle orantılıdır. Üçü de kendi karesinin aynı kesrini kaplar: ab/(2c²). 3–4–5'te kesir 0.24000'dir ve çizelge üç satırı da böyle yazar. İki küçük üçgen büyüğü tam doldurduğu için k·a² + k·b² = k·c², yani a² + b² = c². Oranlar bir de <strong>geometrik ortalama</strong> söyler. a/c = p/a olduğundan a = √(c·p): her dik kenar, hipotenüs ile kendisine bitişik parçanın geometrik ortasıdır. 3–4–5'te √(5 × 1.8) = 3. 5–12–13'te p = 25/13 = 1.92308 br, q = 144/13 = 11.0769 br; c·p = 25 ve c·q = 144 olur, üçgenin alanı da 30.0000 br²'dir.",
      formula: "a = √(c·p),   b = √(c·q)",
      formulaNote: "p + q = c olduğundan a² + b² = c(p + q) = c². Kesir ab/(2c²), 3–4–5'te 12/50 = 0.24000'dir.",
    },
    {
      heading: "Kosinüs teoremi: dar, dik, geniş",
      body:
        "γ dik olmaktan çıkınca kareler durur, toplam bozulur. Köşeler C = (0, 0), B = (a, 0), A = (b cos γ, b sin γ)'dır. A'dan CB doğrusuna inen yüksekliğin boyu h = b sin γ, ayağın yeri b cos γ'dır. ABD dik üçgeninde Pisagor açılınca c² = (a − b cos γ)² + (b sin γ)² = a² + b² − 2ab cos γ kalır. Bu <strong>kosinüs teoremi</strong>dir. cos γ pozitifse, yani γ dar ise, c², a² + b²'den küçüktür; γ genişse büyüktür. Eşitlik yalnız cos γ = 0 iken, yani γ = 90° iken döner: karşıt teorem bu özel hâldir. a = 3, b = 4 ve γ = 60° iken 2ab cos γ = 12, c² = 13 ve c = √13 = 3.60555 br. γ = 120° iken c² = 37 ve c = √37 = 6.08276 br; D noktası C'nin ötesine, −2 br'ye düşer. İnce bir ayrım vardır. γ'nın dar olması, üçgenin dar açılı olması demek değildir. a = 1, b = 5, γ = 60° iken γ dardır, c = √21 = 4.58258 br olur, fakat B = 109.11°'dir ve durum satırı üçgeni geniş açılı diye ayrıca işaretler.",
      formula: "c² = a² + b² − 2ab cos γ",
      formulaNote: "γ = 60°, a = 3, b = 4 iken düzeltme 12 br²'dir: 25 − 12 = 13. γ = 120°'de 25 + 12 = 37.",
    },
    {
      heading: "İlkel üçlüler ve kürenin kosinüsü",
      body:
        "a² + b² = c² eşitliğinin pozitif tam sayı çözümüne <strong>Pisagor üçlüsü</strong> denir. İlkel olanında üçünün ortak böleni 1'dir. Öklid formülü hepsini üretir: m > n, ebob(m, n) = 1 ve pariteler zıtken a = m² − n², b = 2mn, c = m² + n². m = 2, n = 1, (3, 4, 5) verir; m = 12, n = 5, (119, 120, 169). İkisi de tekse her şey çift çıkar: m = 3, n = 1, (8, 6, 10) = 2·(4, 3, 5) olur. Hipotenüsü en çok N olan ilkel üçlülerin sayısı P(N), N/(2π)'ye yaklaşır. m² + n² ≤ N ve m > n bölgesinin alanı πN/8'dir. İki tam sayının aralarında asal olma oranı 6/π² = 1/ζ(2)'dir; asal çiftlerin 2/3'ü zıt paritelidir, çünkü tek–tek olanlar üçte bir kalır. Çarpım N/(2π) eder. Sayfa bunu “Lehmer 1900” diye etiketler (D. N.); ana terim 1900'dendir, kalanın N'ye oranı sıfıra gider. O(√N log N) sınırı Lambek ve Moser'in 1955 kanıtıdır. N = 1000'de sayfa 158 sayar, kuram 159.15'tir. Kürede kenarlar büyük çember yaylarıdır. Dik açıda cos(c/R) = cos(a/R)·cos(b/R). cos x = 1 − x²/2 + x⁴/24 açılımı düz teoreme bir düzeltme ekler: c² ≈ a² + b² − a²b²/(3R²); sonraki terim −a²b²(a² + b²)/(45R⁴)'tür. <strong>Girard teoremi</strong> açılarla alanı bağlar: E = A + B + C − π = alan/R². Sayfa E'yi köşe teğetlerinden, alanı Simpson integraliyle ölçer.",
      formula: "P(N) ~ N/(2π),   cos(c/R) = cos(a/R)·cos(b/R)",
      formulaNote: "1000 km'lik eşit kenarda ilk düzeltme c'yi 1411.30710 km'ye indirir; ölçülen değer 1411.29754 km'dir.",
    },
  ],
  lab: {
    intro:
      "Üç sekme var ve hiçbiri zar atmaz: aynı kaydırıcı aynı sayıyı verir, tohum kutusu yoktur. <strong>Kanıtlar</strong> dik kenar a, dik kenar b ve γ ile üçgeni kurar; Kanıt yolu ile Kanıt adımı üç kanıtı yürütür, alanları çizilen çokgenlerden ölçer. γ, 90.0°'den ayrılınca kanıt düğmeleri kapanır ve sahne kosinüs teoremini gösterir. Kanıtlar sekmesinde boşluk tuşu kanıtı oynatır. R tuşu açık olan sekmeyi sıfırlar. Odak yazı kutusunda, menüde veya düğmedeyken ikisi de yok sayılır. <strong>Pisagor üçlüleri</strong> hipotenüs sınırı N'ye kadar sayar ve N ≤ 3000 iken kaba taramayla karşılaştırır. <strong>Eğri yüzeyde</strong> seçilen kürenin üstüne dik üçgen çizer; c'yi üç boyutlu koordinatlardan ölçer.",
    experiments: [
      {
        title: "49'dan 24 çıkınca 25 kalır",
        predict:
          "3–4–5'te büyük kare 49 br², dört üçgenin toplamı 24 br², ortadaki boşluk 25 br² olmalı. Adım değişince boşluğun biçimi değişir, alanı değişir mi?",
        do:
          "Kanıtlar sekmesinde 3–4–5 düğmesine bas: a = 3.00 br, b = 4.00 br, γ = 90.0°. Kanıt yolu “Yeniden düzenleme: dört üçgen” kalsın. Kanıt adımını 0'dan 3'e getir ya da Oynat'a bas. Çizelgedeki Fark sütununu oku. Sonra Kanıt yolunu “Öklid I.47: kaymalar ve dönme” ve “Benzer üçgenler: hipotenüse inen yükseklik” yap. Benzer üçgenler açıkken 5–12–13 ve a = b = 1 düğmelerine de bas.",
        observe:
          "c = 5.00000 br, c² = 25.0000 br², a² + b² = 9.0000 + 16.0000. Büyük kare 49.0000, dört üçgen 24.0000, boşluk 25.0000 br²; baştaki eğik kare de 25.0000. Fark sütunu 0 br² yazar. Öklid yolunda a² parçası 9.0000 br² kalır ve c·p = 9.0000 br² olur. Benzer üçgenlerde p = 1.80000 br, q = 3.20000 br, S(ABC) = 6.0000 br², üç kesir de 0.24000. 5–12–13'te c = 13.0000 br ve S(ABC) = 30.0000 br²; a = b = 1'de c = 1.41421 br ve c² = 2.0000 br².",
        explain:
          "Üçgenler ötelenir, kayar ya da döner; hiçbiri alanı değiştirmez. (a + b)² = 49 iki kez yazılır: c² + 24 ve a² + b² + 24. Ortak 24 silinince 25 = 9 + 16. Dört üçgen 4 × 6 br²'dir. Benzerlikte her parça karesinin 0.24000'sini kaplar; iki küçük, büyüğü doldurduğu için k sadeleşir. a = b = 1'de hipotenüs √2'dir ve karelerin toplamı yine tam oturur.",
      },
      {
        title: "60° ile 120° arasında 12 br²",
        predict:
          "a = 3, b = 4 iken γ = 60° için c = √13 = 3.60555 br, γ = 120° için c = √37 = 6.08276 br beklersin. c², 25'ten 12 br² küçük, sonra 12 br² büyük mü olur? γ dar diye üçgen de dar mıdır?",
        do:
          "γ = 60° düğmesine bas; hipotenüs, c² ve “γ açısı ve üçgenin türü” kartlarını oku. Sonra γ = 120° düğmesine bas. Ardından dik kenar a kutusuna 1, dik kenar b kutusuna 5 yaz ve γ = 60° düğmesine yeniden bas: düğme kenarları bırakır, açıyı 60.0° yapar. Durum satırına ve kapanan Kanıt yolu menüsüne bak. Grafikte eğrinin a² + b² doğrusunu nerede kestiğini gör.",
        observe:
          "γ = 60.0°: c = 3.60555 br, c² = 13.0000 br², c² − (a² + b²) = −12.0000 br². A = 46.10°, B = 73.90°, üçgen dar açılı, h = 3.46410 br. γ = 120.0°: c = 6.08276 br, c² = 37.0000, fark +12.0000 br²; A = 25.28°, B = 34.72°. Ayak C'nin ötesindedir: b cos γ = −2 ve sahne |b·cos γ| yazar. a = 1, b = 5, γ = 60°: c = 4.58258 br, γ dar, fakat B = 109.11° ve durum satırı üçgeni geniş açılı diye uyarır.",
        explain:
          "c² = 9 + 16 − 2·3·4·cos γ. cos 60° = 1/2 olduğundan düzeltme tam 12 br²'dir: 25 − 12 = 13. cos 120° = −1/2, 25 + 12 = 37. Karşıt teorem yalnız eşitlikte konuşur. γ'nın kendisi ile üçgenin en büyük açısı iki ayrı sınavdır: 1 ve 5 birim, 60°'de B, 90°'yi geçer. Kanıt animasyonu tam 90.0° ister; γ = 90° düğmesi onu geri açar. Grafikteki eğri yatay doğruyu yalnız orada keser.",
      },
      {
        title: "158 üçlü ve bir Babil satırı",
        predict:
          "N = 1000 için P(N), 1000/(2π) ≈ 159.15'e yakın olmalı. Kaba tarama Öklid listesinden fazla ya da eksik bir üçlü bulur mu? m = 12, n = 5 hangi üçlüyü verir?",
        do:
          "Pisagor üçlüleri sekmesinde N = 1000 düğmesine bas. P(N), N/(2π), fark, bütün üçlüler ve kaba sayım kartlarını oku; “taranıyor…” bir an görünür, bitsin. Sonra “Plimpton 322: m = 12, n = 5” düğmesine bas ve seçili üçlünün alt satırındaki kareleri topla. N = 100 düğmesine bas. N = 50 için düğme yoktur: hipotenüs sınırı kutusuna 50 yaz. N = 10 000 düğmesinde kaba sayımın neden kapandığını da gör.",
        observe:
          "N = 1000: P(N) = 158, kuram 159.15, oran 0.9927, fark −1.15, bütün üçlüler 881. Kaba sayım “881 üçlü · 158 ilkel” der; eksik 0, fazla 0, tekrar 0. m = 12, n = 5: (119, 120, 169) ve 14 161 + 14 400 = 28 561. N = 100: P = 16, kuram 15.92, oran 1.0053, fark +0.08, bütün üçlüler 52. N = 50: P = 7, kuram 7.96, oran 0.8796; durum satırı formülün asimptotik olduğunu söyler.",
        explain:
          "πN/8 × 6/π² × 2/3 = N/(2π). Karttaki “Lehmer 1900”, bu ana terimin tarihidir; O(√N log N) yazısı Lambek ve Moser'in 1955 sınırıdır. N = 1000'de sapma −1.15'tir ve √N = 31.6'nın yanında küçüktür. N = 10 000'de sayım 1593, kuram 1591.55, oran 1.0009, bütün üçlüler 12 471 olur. Kaba tarama N > 3000'de yapılmaz: deneme yaklaşık 0.39·N²'dir. Sayfa N'yi 10 000'de keser. Aynı sayım 10⁷'de 1 591 579 ilkel üçlü verir; N/(2π) ≈ 1 591 549, oran 1.00002. Bu uç kaydırıcıda yoktur. Tabloda a < b diye sıralanmaz: (15, 8, 17) satırı m = 4, n = 1'dir.",
      },
      {
        title: "Bin kilometre, 2.9160 kilometre kısa",
        predict:
          "R = 6371.0 km ve 1000 km × 1000 km iken düz hipotenüs 1000√2 = 1414.21356 km'dir. Küre daha kısa ölçer; açılar toplamı 180°'nin biraz üstünde, alan 500 000 km²'nin biraz üstünde olmalı. Kenarlar 10 km olunca fazlalık hâlâ kilometre mertebesinde midir?",
        do:
          "Eğri yüzeyde sekmesinde Sıfırla'ya bas: Dünya ve 1000 km × 1000 km. c, düz √(a² + b²), açılar toplamı ve alan kartlarını oku. Çizelgede tek terimli ve iki terimli yaklaşım satırlarının Fark sütununa bak. Sonra 10 km × 10 km düğmesine bas ve durum satırını oku. “Oktant: πR/2 × πR/2” düğmesine, ardından 3000 km × 4000 km düğmesine bas. Boyut sayısı n'yi 3 ve 10 yapıp alttaki köşegen satırını karşılaştır.",
        observe:
          "1000 km'de c = 1411.29754 km, düz değer 1414.21356 km, fazlalık 2.9160 km (0.206%). Toplam 180.708692°, fazlalık etiketi 0.7087° = 0.012369 rad, alan 502 054 km². Tek terim 1411.30710 km, fark −0.009557 km. İki terimde fark +2.4×10⁻⁷ km. 10 km'de düz formül 2.9×10⁻⁶ km fazla verir; durum satırı kalanın, ölçüm duyarlığının (≈ 1.1×10⁻¹¹ km) altında olduğunu söyler. Oktantta toplam 270.000000°, c = 10007.5434 km, alan 63 758 059 km². Durum satırı küçük üçgen açılımının göreli hatasını 8.5% diye yazar ve kırmızıya dönmez. n = 3 köşegeni 1.732050808, n = 10 köşegeni 3.162277660; ikisinde de fark 0.",
        explain:
          "cos(c/R) = cos²(1000/6371). Düz formül eğriliği yok sayar. c²'nin içinden 1000⁴/(3·6371²) = 8212 km² çıkınca c, 1411.30710 km'ye iner; ölçülen değer 9.56 m daha kısadır ve sonraki terim o metreyi kapatır. Durum satırındaki 0.009518 km, bu sonraki terimin öngörüsüdür; çizelgedeki −0.009557 km ise tek terimin gerçek kalanıdır. Göreli hata (kenar/R)² ile küçülür. 3000 km × 4000 km düğmesinde satır kırmızıya döner ve düz formülün 2.49% fazla verdiğini söyler; kart 124.6717 km ve göreli 2.493% yazar. Köşegen ise düz uzaydadır: Pisagor'u n − 1 kez uygulamak √n verir.",
      },
    ],
  },
  wow: [
    {
      title: "Kilden bir 119, 120, 169",
      body:
        "Plimpton 322, Eski Babil döneminden bir kil tablettir; yaygın tarihleme MÖ 1800 dolaylarıdır ve bugün Columbia Üniversitesi'ndedir. Korunan satır 119 ile 169'u yazar; 120 bu ikisinden tamamlanır, 119² + 120² = 28 561 = 169². Sayfada m = 12 ve n = 5 aynı üçlüyü üretir, 14 161 + 14 400 = 28 561. Tabletin ders notu mu, üçgen listesi mi olduğu ise açık bir tartışmadır; sayfa bu tartışmayı çözmez, sayıyı üretir.",
    },
    {
      title: "Bir milletvekilinin yamuğu",
      body:
        "1876'da James A. Garfield, henüz ABD Temsilciler Meclisi üyesiyken bir kanıt yayımladı. Beş yıl sonra, 1881'de, başkan oldu. Şekil bir yamuktur: paralel kenarlar a ve b, yükseklik a + b. Alan (a + b)²/2'dir. İçeride iki dik üçgen birer ab/2, hipotenüslerin dik birleştiği üçüncü üçgen c²/2 eder. (a + b)²/2 = ab + c²/2 açılınca a² + b² = c² kalır. Sayfadaki dört üçgenli boşlukla aynı cins bir alan özdeşliğidir; sayfa Garfield'ın yamuğunu çizmez.",
    },
    {
      title: "Üç dik açı, kürenin sekizde biri",
      body:
        "R = 6371.0 km iken oktantın üç açısı da 90°'dir. Toplam 270.000000°, fazlalık π/2, hipotenüs πR/2 = 10007.5434 km. Alan πR²/2 = 63 758 059 km², yani 4πR²'nin sekizde biri. Düz formül burada 14152.8036 km der: 4145.2602 km, göreli 29.289% fazla. Küçük üçgen açılımı 10859.6048 km verir ve durum satırı göreli hatayı 8.5% diye yazar; satır kırmızı uyarıya geçmez, diğer küre ölçümlerindeki kenarda kalır. Küresel ölçüm ise formülle uyuşur: hipotenüs tam bir çeyrek büyük çemberdir.",
    },
  ],
  worked: {
    title: "Bin kilometrelik dik üçgen, Dünya'nın üstünde",
    prompt:
      "R = 6371.0 km yarıçaplı kürede ekvator boyunca a = 1000 km, meridyen boyunca b = 1000 km giden dik bir küresel üçgenin hipotenüsünü küresel kosinüs kuralıyla bul. Düz √(a² + b²) ve tek terimli küçük üçgen formülüyle karşılaştır; açı fazlalığını ve alanı hesapla. Eğri yüzeyde sekmesindeki 1000 km × 1000 km değerleriyle denetle.",
    steps: [
      "Merkez açısı α = a/R = 1000/6371 = 0.156961 rad = 8.993°'dir. Sayfa kenarın yanında 8.99° yazar. Dik küresel üçgende cos(c/R) = cos α · cos α = cos² α, çünkü C'deki açı 90°'dir ve kuralın çapraz terimi düşer.",
      "c = R · arccos(cos² α) = 1411.29754 km. Sayfanın kararlı biçimi aynı sayıyı verir: sin²(c/(2R)) = 2 sin²(α/2) − 2 sin⁴(α/2). Koordinatlardan ölçülen c ile formülün farkı çizelgede −2.3×10⁻¹³ km'dir.",
      "Düz hipotenüs √(1000² + 1000²) = 1000√2 = 1414.21356 km'dir. Küresel c ondan 2.91602 km kısadır; kart bunu 2.9160 km ve göreli 0.206% diye yazar. İlk düzeltme c² ≈ 2 000 000 − 1000⁴/(3·6371²). 6371² = 40 589 641, payda 121 768 923, çıkan 8212.276 km²'dir. c² ≈ 1 991 787.724 ve c ≈ 1411.30710 km. Ölçülen değer 0.009557 km, yani 9.56 m daha kısadır.",
      "Sonraki terim −a²b²(a² + b²)/(45 R⁴), c'yi kartın basamaklarında 1411.29754 km'ye getirir. Çizelgedeki fark +2.4×10⁻⁷ km'dir. a = b iken sekizinci mertebeden terim sıfırlanır; sayfa bu mertebeyi yazmaz. Çizelgedeki +2.4×10⁻⁷ km, kalanın bu yüzden ne kadar küçüldüğünü gösterir.",
      "tan(E/2) = tan²(α/2). α/2 = 0.078481 rad, tan(α/2) = 0.078642, karesi 0.0061846. E = 2 arctan(0.0061846) = 0.012369 rad. Kart toplamı 180.708692° yazar, fazlalık etiketini 0.7087° diye yuvarlar. Napier: tan A = 1/cos α = 1.01245, A = 45.354346°. İki dar açı ile 90° toplanınca yine 180.708692° çıkar. Alan E·R² = 502 053.86 km²; kart 502 054 km² diye yuvarlar. Düz alan ab/2 = 500 000 km²'dir.",
    ],
    result:
      "Küresel hipotenüs 1411.29754 km'dir, düz değerden 2.9160 km kısa. Tek terimli açılım 9.56 m fazla kalır, iki terim o farkı kartın basamaklarında kapatır. Açılar toplamı 180.708692°, alan 502 054 km²'dir.",
  },
  misconceptions: [
    {
      myth: "Teoremi Pisagor kanıtladı; tabletler ve Çin metinleri ondan sonradır.",
      truth:
        "Pisagor'un kendi yazısı günümüze kalmamıştır; adı, yüzyıllar sonraki tanıklıklarla bir okula bağlanır. Plimpton 322 Eski Babil dönemindendir, yaygın tarihleme MÖ 1800 dolaylarıdır. Yazılı kanıtın duru hâli Öklid I.47 ve karşıtı I.48'dir. Sayfa kanıtı kaydırarak gösterir, bir imza aramaz.",
    },
    {
      myth: "3–4–5, teoremin kendisidir.",
      truth:
        "3–4–5 bir örnektir: 9 + 16 = 25 ve üçgenin alanı 6 br²'dir. Teorem her dik üçgeni kapsar. a = b = 1 düğmesinde c = 1.41421 br olur; √2 iki tam sayının oranı değildir. 5–12–13'te c = 13.0000 br ve benzer üçgenler çizelgesinde S(ABC) = 30.0000 br² yazar. O da yalnızca bir başka örnektir.",
    },
    {
      myth: "a² + b² = c² her üçgende geçerlidir.",
      truth:
        "Eşitlik, karşıt teoremle birlikte, kenarlar arasındaki açının tam 90° olduğunu söyler. a = 3, b = 4, γ = 60° iken c² = 13, a² + b² = 25'tir. Genel bağıntı c² = a² + b² − 2ab cos γ'dır. γ'nın dar olması da yetmez: a = 1, b = 5, γ = 60° iken kart B = 109.11° yazar ve üçgen geniş açılıdır.",
    },
    {
      myth: "Harita düz olduğu için uzaklık √(a² + b²) ile bulunur.",
      truth:
        "Kısa yolda fark ölçülemez küçüklüktedir. 10 km × 10 km'de düz formül 2.9×10⁻⁶ km, yaklaşık 2.9 mm fazla verir ve sayfa bu kalanı ölçüm duyarlığının altında sayar. 1000 km × 1000 km'de fark 2.9160 km'dir. Sayfa R = 6371.0 km'lik kusursuz bir küre kullanır; gerçek Dünya yaklaşık 1/298 basıklığında bir elipsoittir ve sayfa onu modele katmaz.",
    },
  ],
  glossary: [
    { term: "Hipotenüs", definition: "Dik açının karşısındaki kenar; sayfada A ile B'nin koordinatları arasındaki uzaklık c." },
    { term: "Karşıt teorem", definition: "c² = a² + b² ise bu kenarların arasındaki açının 90° olduğunu söyleyen önerme; Öklid'in I.48'i." },
    { term: "İlkel üçlü", definition: "a, b, c'nin 1'den büyük ortak böleni olmayan pozitif tam sayı çözümü; her üçlü bir ilkel üçlünün k katıdır." },
    { term: "Kayma", definition: "Tabanı ve yüksekliği sabit tuttuğu için paralelkenarın alanını değiştirmeyen dönüşüm; Jacobi determinantı 1'dir." },
    { term: "Geometrik ortalama", definition: "İki pozitif sayının çarpımının karekökü; dik kenar, hipotenüs ile bitişik parçanın geometrik ortasıdır." },
    { term: "Küresel fazlalık", definition: "Küresel üçgende açıların toplamının π radyandan farkı; Girard'a göre alan bölü R²'ye eşittir." },
    { term: "Büyük çember", definition: "Kürenin merkezinden geçen bir düzlemin küreyle arakesiti; iki nokta arasındaki en kısa yol onun yayıdır." },
    { term: "Jeodezik", definition: "Bir yüzeyin üstünde iki noktayı birleştiren, yerel olarak en kısa eğri; kürede büyük çember yayına denk gelir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Geometri</strong> dersinde eşitlik, alanı koruyan dönüşümlerin ve benzerliğin sonucudur. <strong>Analiz</strong> dersinde cos x = 1 − x²/2 + x⁴/24 − … açılımı, küçük küresel üçgene uygulanan bir seri olur; c² ≈ a² + b² − a²b²/(3R²) onun ilk düzeltmesidir. <strong>Sayılar Teorisi</strong> aynı eşitliğin tam sayı çözümlerini sorar. Öklid'in (m, n) formülü ilkel üçlülerin hepsini verir. P(N) ~ N/(2π) bir yoğunluk hesabıdır; paydadaki π², iki tam sayının aralarında asal olma olasılığı 6/π² = 1/ζ(2)'den gelir. Fermat'nın n > 2 için çözümsüzlük iddiası bu kapının ardındadır. Wiles'ın 1995 ispatı, çözümü eliptik eğrilerin rasyonel noktalarına bağlar. O dünya bu sayfanın konusu değildir; işaret levhası olarak durur.",
      "<strong>Diferansiyel Geometri</strong> bir adım daha gider. Girard'ın E = alan/R² eşitliği, kürenin Gauss eğriliğinin 1/R² olmasının özel hâlidir. Gauss–Bonnet teoremi aynı fikri herhangi bir yüzeydeki üçgene taşır: açı fazlalığı, eğriliğin üçgen üzerinde integralidir. <strong>Jeodezi</strong> bu hesabı Dünya'ya uygular. Sayfadaki küre, basıklığı yaklaşık 1/298 olan elipsoidin bilinçli bir sadeleştirmesidir; 2.9160 km küresel bir farktır, elipsoit düzeltmesi ayrıca gelir. İç çarpımda |v|² = v·v, Pisagor'un koordinatlara dökülmüş hâlidir; vektörler sayfası boyu böyle ölçer ve dik oklarda kosinüs terimi düşer. Eğri uzay-zaman bir işaret levhasıdır. Özel görelilik sayfasındaki ışık saati bir dik üçgendir; ayrıntı oradadır. Genel görelilikte o üçgenin kurulduğu yüzey artık düz değildir.",
    ],
    topics: [
      "İç çarpım ve normlu uzaylar",
      "Fermat'nın son teoremi",
      "Eliptik eğriler ve rasyonel noktalar",
      "Gauss eğriliği",
      "Gauss–Bonnet teoremi",
      "Jeodezik ve elipsoit",
    ],
  },
  quiz: [
    {
      question: "Dünya'da 1000 km × 1000 km dik üçgende düz formül 2.916 km fazla verir. Kenarlar 10 km olunca fazlalık yaklaşık kaç olur? Göreli hata (kenar/R)² ile ölçeklenir.",
      options: [
        "Yaklaşık 2.9 km, çünkü formül değişmez",
        "Yaklaşık 29 m, çünkü kenar 100 kat kısaldı",
        "Yaklaşık 2.9 mm, çünkü fazlalık kenarın küpüyle küçülür",
        "Tam sıfır, çünkü 10 km'de yer düz sayılır",
      ],
      answer: 2,
      explanation:
        "c² içindeki düzeltme a²b²/(3R²) mertebesindedir; c ≈ a√2 iken uzunluktaki pay, türevle, bu terimin 2c'ye bölümüdür ve a³/R² gibi küçülür. Kenar 100 kat kısalınca fazlalık yaklaşık 100³ = 1 000 000 kat küçülür: 2.916 km / 10⁶ ≈ 2.9×10⁻⁶ km = 2.9 mm. 10 km × 10 km düğmesi bu sayıyı yazar. Kalan sıfır değildir; ölçüm duyarlığının altındadır.",
    },
    {
      question: "a = 3 br, b = 4 br ve γ = 60° iken c² kaçtır?",
      options: ["25 br², çünkü 3–4–5 duruyor", "13 br²", "7 br²", "37 br²"],
      answer: 1,
      explanation:
        "c² = 9 + 16 − 2·3·4·cos 60° = 25 − 12 = 13. cos 60° = 1/2 olduğu için düzeltme tam 12 br²'dir. Sayfa c = 3.60555 br ve c² = 13.0000 br² yazar. 37, aynı kenarlarla γ = 120°'nin karesidir: 25 + 12.",
    },
    {
      question: "m = 4, n = 1 için Öklid formülü hangi üçlüyü verir?",
      options: [
        "(15, 8, 17) ve üçlü ilkeldir",
        "(8, 15, 17) ve üçlü ilkel değildir",
        "(15, 8, 17) ve üçlü ilkel değildir",
        "(3, 4, 5) ve üçlü ilkeldir",
      ],
      answer: 0,
      explanation:
        "a = m² − n² = 16 − 1 = 15, b = 2mn = 8, c = 16 + 1 = 17. m ile n zıt paritelidir ve ebobları 1'dir, bu yüzden üçlü ilkeldir. Tabloda satır (15, 8, 17) diye durur: tek kenar önce yazılır, a < b diye sıralanmaz. Nokta grafiği aynı üçlüyü (15, 8) ve (8, 15) olarak iki kez basar.",
    },
  ],
  next: [
    { href: "vektorler.html", title: "Vektörler", why: "Bir okun boyu √(x² + y²)'dir; aradaki açı kosinüs teoremiyle dolar. Dik oklarda cos 90° = 0 olduğu için çapraz terim düşer." },
    { href: "birim-cember.html", title: "Birim Çember", why: "cos γ ve sin γ, yarıçapı 1 olan çemberdeki noktanın iki koordinatıdır. Buradaki cos 60° = 1/2 ve cos 120° = −1/2 orada okunur." },
    { href: "konik-kesitler.html", title: "Konik Kesitler", why: "Üçlüler grafiğindeki isteğe bağlı eğriler, odağı başlangıçta olan parabollerdir. Konik sayfası parabolü, elipsi ve hiperbolü tek bir dışmerkezlikle kurar." },
    { href: "gorelilik-uzayzaman.html", title: "Özel Görelilik", why: "Işık saati bir dik üçgendir; ayrıntı o sayfadadır. Buradaki küresel üçgen ise düz uzay bitince açılar toplamının neden 180°'de kalmadığını gösterir." },
  ],
  sources: [
    {
      title: "Vikipedi · Pisagor teoremi",
      url: "https://tr.wikipedia.org/wiki/Pisagor_teoremi",
      note: "Teorem, karşıtı ve Öklid I'deki yeri; Türkçe genel çerçeve.",
    },
    {
      title: "Wikipedia · Plimpton 322",
      url: "https://en.wikipedia.org/wiki/Plimpton_322",
      note: "Eski Babil tableti: korunan satırda kısa kenar ve köşegen yazılıdır, uzun kenar onlardan tamamlanır; tabletin amacı tartışmalıdır (İngilizce).",
    },
    {
      title: "Wikipedia · Pythagorean triple",
      url: "https://en.wikipedia.org/wiki/Pythagorean_triple",
      note: "Öklid'in (m, n) formülü ve ilkel üçlünün koşulları. Hipotenüs sayımının ana terimi N/(2π), Lehmer 1900'dür (İngilizce).",
    },
    {
      title: "MathWorld · Spherical Trigonometry",
      url: "https://mathworld.wolfram.com/SphericalTrigonometry.html",
      note: "Küresel kosinüs kuralı, dik üçgen bağıntıları ve açı fazlalığı (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
