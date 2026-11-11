window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["integral"] = {
  slug: "integral",
  title: "İntegral: Birikimin Hesabı",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Hızdan yolu, kuvvetten işi, eğriden hacmi veren tek fikir: birikim. Temel teoremi kendi elinle ölç, küreyi iki ayrı yoldan dilimle, sonsuza uzanan bir borunun hacminin neden π'yi aşamadığını gör.",
  hook: "Bir arabanın kilometre sayacı bozuk, yalnızca hız göstergesi çalışıyor: bir saatlik yolculuğun sonunda kaç kilometre gittiğini yine de bulabilir misin? Bulabilirsin; her an için hız × kısacık süreyi biriktirirsin. Peki biriken yolun o andaki artış hızı nedir? Göstergenin o an gösterdiği sayı. Kalkülüsün en büyük teoremi bu kadar tanıdık bir cümledir.",
  bigIdea:
    "İntegral bir birikimdir: a'dan x'e biriken A(x)'in değişim hızı, f'nin sürekli olduğu her noktada f(x)'in kendisidir; bu yüzden türevi f olan bir F bulduğunda birikim tek satırda gelir: <em>∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)</em>.",
  story: [
    "MÖ 3. yüzyılda Sirakuzalı Arşimet, bir parabolün bir doğruyla kestiği parçanın alanının, içine çizilen üçgenin tam 4/3'ü olduğunu ispatladı. Elinde ne cebir ne koordinat vardı. Knidoslu Eudoksos'tan miras kalan <strong>tüketme yöntemini</strong> kullandı: alanı içten ve dıştan, giderek incelen bilinen parçalarla sıkıştırdı ve aradaki farkın istenen her miktardan küçük yapılabileceğini gösterdi. Bugünün diliyle bu, alt ve üst toplamların aynı sayıya yaklaştığını ispatlamaktır. Sonucu sayfada görebilirsin: ilk sekmede 'x² (polinom)' seç, taban noktası a'yı −1'e, üst sınır x'i 1'e getir. A(x) kartı 0.6666666667 yazar; yani 2/3. Parabol ile y = 1 doğrusu arasındaki parça, 2 × 1'lik dikdörtgenden bu 2/3 çıkınca kalan 4/3'tür; içine çizilen (−1, 1), (0, 0), (1, 1) üçgeninin alanı ise tam 1. Arşimet'in oranı, ekranda.",
    "Arşimet'ten bin iki yüz yılı aşkın bir süre sonra Kahire'de İbnü'l-Heysem, dördüncü kuvvetlerin toplamı için bir formül bulup bir paraboloidin hacmini hesapladı. 1600'lerde fikir hız kazandı. Johannes Kepler 1613'te evine şarap alırken tüccarların fıçı hacmini tek bir çubukla ölçtüğünü gördü; bu gözlem onu farklı biçimli kapların hacmini dilimleyerek incelemeye götürdü. Bonaventura Cavalieri 1635'te alanları sonsuz ince çizgilerden, 'bölünemezler'den oluşmuş gibi ele alan yöntemini yayımladı. Asıl sıçrama, iki ayrı sorunun aslında tek sorun olduğunun görülmesiydi: eğrinin altındaki alanı bulmak ile teğetini bulmak birbirinin tersidir. Bu ilişkinin geometri diliyle yazılmış ilk basılı ispatını James Gregory 1668'de verdi; Isaac Barrow, Cambridge'deki geometri derslerinde daha genel bir biçimini ispatladı. İlişkiyi hesap yapan bir makineye dönüştürenler ise yöntemini 1665–66'da geliştiren Isaac Newton (Barrow'un Cambridge'deki halefi) ve ondan bağımsız olarak, 1670'lerin ortasında Gottfried Wilhelm Leibniz oldu.",
    "Yöntem işliyordu ama 'sonsuz ince dilim' tam olarak neydi? 1823'te Augustin-Louis Cauchy integrali, sürekli fonksiyonlar için sonlu toplamların <strong>limiti</strong> olarak tanımladı. Bernhard Riemann 1854'te Göttingen'de sunduğu, ölümünden sonra 1868'de yayımlanan çalışmasında soruyu tersine çevirdi: hangi fonksiyonların integrali vardır? Ölçütü şuydu: her dilimin içinden <em>herhangi</em> bir nokta seçilebilmeli ve dilimler inceldikçe bütün seçimler aynı sayıya yaklaşmalı. Bugün onun adını taşıyan bu toplamlar her kalkülüs kitabında yer alır. Dikdörtgenleri tek tek görmek istersen sitedeki Riemann Toplamları sayfası tam bunun için kuruldu; bu sayfa o limitin ne anlama geldiğini ve ne işe yaradığını sorar.",
    "İntegral bugün birikim ölçülen her yerde çalışır: hızdan yol, güçten enerji, yoğunluktan kütle, olasılık yoğunluğundan olasılık. İşin ilginç yanı, bilgisayarlar integrallerin çoğunu formülle değil, dilimleyip toplayarak hesaplar. Bu sayfadaki her sayı da öyle üretilir: önce sayısal olarak hesaplanır, sonra varsa ters türevden gelen değerin yanına konur. Ters türevi formülle yazılamayan fonksiyonlarda zaten başka yol yoktur; mühendislik yazılımlarının içinde çalışan şey, Arşimet'in sıkıştırmasının hızlandırılmış bir torunudur.",
  ],
  core: [
    {
      heading: "Birikim fonksiyonu: alan değil, işaretli toplam",
      body: "Bir a noktası seç ve oradan x'e kadar biriken miktara A(x) de. A bir sayı değil, x'in fonksiyonudur: x ilerledikçe f'nin eksenin üstündeki parçaları toplamı artırır, altındaki parçaları azaltır. Bu yüzden integral 'eğrinin altındaki alan'dan daha genel bir şeydir: <strong>işaretli birikim</strong>. İlk sekmede 'x³ − 3x: −2'den 2'ye' düğmesine bas: eksenin üstündeki alan 2.5, altındaki alan 2.5, A(x) ise 0. x'i a'nın soluna çekersen toplama yönü ters döner ve işaret değişir. Birim de birikimden gelir: f'nin birimi ile x'in birimi çarpılır; hız (m/s) zamana (s) göre integrallenince metre çıkar.",
      formula: "A(x) = ∫<sub>a</sub><sup>x</sup> f(t) dt,   A(a) = 0,   ∫<sub>x</sub><sup>a</sup> f = −∫<sub>a</sub><sup>x</sup> f",
      formulaNote:
        "t yalnızca toplama değişkenidir; sonuç a'ya ve x'e bağlıdır. Net birikim ∫f, toplam büyüklük ∫|f| ile hesaplanır.",
    },
    {
      heading: "Temel teorem, 1. kısım: birikimin eğimi f'dir",
      body: "A'nın x'teki eğimini ölçmek için x'i h kadar ilerlet: A(x + h) − A(x), x ile x + h arasındaki ince şeridin alanıdır. f sürekliyse <strong>integraller için ortalama değer teoremi</strong> bu şeritte öyle bir c noktası bulur ki şeridin alanı tam f(c)·h olur. Demek ki fark oranı f(c)'ye eşittir. h küçülürken c, x ile x + h arasında sıkışır ve süreklilik f(c)'yi f(x)'e taşır: A′(x) = f(x). İspatın tek dayanağı sürekliliktir. Sayfanın basamak fonksiyonu x = 1'de 1'den 2'ye sıçrar; orada şeridin solu 1, sağı 2 yüksekliğindedir, soldan eğim 1, sağdan eğim 2 çıkar. A süreklidir ama köşe yapar; türevi yoktur.",
      formula: "[A(x + h) − A(x)]/h = (1/h)·∫<sub>x</sub><sup>x+h</sup> f(t) dt = f(c<sub>h</sub>) → f(x)",
      formulaNote:
        "c<sub>h</sub>, x ile x + h arasında bir noktadır. Soldan ve sağdan eğimin ortalaması f(x)'ten yaklaşık f″(x)·h²/6 kadar sapar; sayfada sin x, x = 4, h = 0.01 için fark 1.26·10⁻⁵.",
    },
    {
      heading: "2. kısım ve +C: taban noktası yalnızca kaydırır",
      body: "Türevi f olan herhangi bir F bul. A'nın türevi de f olduğuna göre A − F'nin türevi her yerde sıfırdır; bir aralıkta türevi sıfır olan fonksiyon sabittir. O sabit x = a konarak bulunur: A(a) = 0 olduğundan sabit −F(a)'dır. Sonuç: A(x) = F(x) − F(a). Toplamı hiç yapmadan birikimi veren satır budur. Taban noktasını a'dan a₂'ye taşırsan iki birikim eğrisi arasındaki fark, a ile a₂ arasındaki integraldir ve x'e hiç bağlı değildir: eğri yalnızca yukarı ya da aşağı kayar, eğimi aynı kalır. Belirsiz integralin sonuna yazılan <strong>+C</strong> bu kaymanın adıdır.",
      formula: "F′ = f  ⇒  ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a);   A<sub>a</sub>(x) − A<sub>a₂</sub>(x) = ∫<sub>a</sub><sup>a₂</sup> f(t) dt",
      formulaNote:
        "x² için F(x) = x³/3. a = 0, a₂ = 1 iken iki eğrinin farkı her x'te 1/3'tür; sayfa 0.33333333 yazar.",
    },
    {
      heading: "Disk ve kabuk neden aynı hacmi verir?",
      body: "Her uygulama aynı reçetedir: ince bir dilimin ölçüsünü yaz, sonra dilimleri integralle topla. Dönel cisimde reçetenin çekirdeği şudur: bölgedeki küçük bir dA parçası eksenden y kadar uzaktaysa, dönerken çevresi 2πy olan bir halka süpürür; hacme katkısı 2πy·dA'dır. Bu katkıları önce düşey sütunlar boyunca topla: dx genişliğindeki bir sütunda y, 0'dan f(x)'e çıkar ve 2πy'nin toplamı ∫<sub>0</sub><sup>f(x)</sup> 2πy dy = π·f(x)² eder; bu, π·f(x)² alanlı, dx kalınlığında bir <strong>disktir</strong>. Önce yatay şeritler boyunca toplarsan y yüksekliğindeki şeridin bütün noktaları eksene aynı uzaklıktadır; uzunluğu w(y) ise katkısı 2πy·w(y)·dy olur: 2πy·w(y) alanlı, dy kalınlığında silindirik bir <strong>kabuk</strong>. Toplanan şey aynıdır, yalnızca toplama sırası değişir. İki sonucun tutması bu yüzden bir tesadüf değil, hesabın sağlamasıdır.",
      formula: "V = π∫ f(x)² dx = 2π∫ y·w(y) dy;   küre: π∫<sub>−r</sub><sup>r</sup> (r² − x²) dx = 4π∫<sub>0</sub><sup>r</sup> y·√(r² − y²) dy = 4πr³/3",
      formulaNote:
        "x ekseni çevresinde, altı eksen üstü f olan bölge için. Kürede y yüksekliğindeki şeridin uzunluğu w(y) = 2√(r² − y²)'dir. r = 1 için sayfa iki yoldan da 4.188790205 bulur.",
    },
    {
      heading: "Sonsuza uzanan toplam: p testi",
      body: "Sonsuz bir aralıkta integral, sonlu bir T'ye kadar alınan kısmi integralin T büyürken yaklaştığı sayıdır; böyle bir sayı yoksa integral <strong>ıraksaktır</strong>. 1/x<sup>p</sup> için hesap açıktır: p ≠ 1 iken ters türev x<sup>1−p</sup>/(1 − p)'dir ve T<sup>1−p</sup> terimi ancak p &gt; 1 ise söner. Aynı şeyi onluk onluk da görebilirsin: [T, 10T] aralığının katkısı, bir önceki onluğun katkısının 10<sup>1−p</sup> katıdır. p &gt; 1 ise katkılar oranı 1'den küçük bir geometrik dizi gibi erir ve toplam biter. p = 1'de her onluk aynı miktarı, ln 10 ≈ 2.30259'u ekler; toplam yavaş ama sınırsız büyür. Fonksiyonun sıfıra gitmesi yetmez, yeterince hızlı gitmesi gerekir.",
      formula: "∫<sub>1</sub><sup>T</sup> x<sup>−p</sup> dx = (T<sup>1−p</sup> − 1)/(1 − p)  →  1/(p − 1)   (p &gt; 1, T → ∞)",
      formulaNote:
        "p = 1'de integral ln T'dir, p ≤ 1 için limit yoktur. 0'a yaklaşırken eşik aynı yerde ters çalışır: ∫<sub>ε</sub><sup>1</sup> x<sup>−p</sup> dx yalnızca p &lt; 1 için sonlu kalır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar üç sekmedir. <strong>01 · Birikim ve temel teorem</strong>: bir fonksiyon seçersin, <strong>Taban noktası a</strong> ve <strong>Üst sınır x</strong> kaydırıcılarıyla (ya da grafiğin üstünde sürükleyerek) birikimi oluşturursun; alttaki grafik A(x)'i çizer, kartlar A'nın soldan, sağdan ve merkezî eğimini f(x)'in yanına koyar. <strong>02 · Geometri uygulamaları</strong>: <strong>Hesap türü</strong> menüsü iki eğri arasındaki alan, dönel cisim hacmi, yay uzunluğu ve Gabriel borusu arasında geçer. <strong>03 · Has olmayan integraller ve fizik</strong>: <strong>Deney türü</strong> menüsünde p testi ve Gauss, kinematik ve değişken kuvvetin işi vardır. Kaydırıcı adımı 0.05'tir; π ya da e gibi değerleri kaydırıcının altındaki kutuya <code>pi</code>, <code>pi/2</code>, <code>e</code> diye yazabilirsin. Sayılar ondalık noktayla ve gereksiz sıfırlar atılarak gösterilir. Bütün integraller sayısal olarak (uyarlamalı Gauss–Kronrod kuralıyla) hesaplanır ve her birinin yanında bir <strong>Hata tahmini</strong> kartı durur; bu bir tahmindir, garanti değil. Fark yuvarlama düzeyindeyse kart '≈ 0 (yuvarlama)' yazar. Sayfa sonsuzu hiç hesaplamaz: her sayı sonlu bir sınıra aittir. Fizik modelleri de sadedir: tek boyutlu hareket, ideal yay, küresel ve dönmeyen bir Dünya (sabitler NASA Earth Fact Sheet'ten). Boş kalan bir köşe için ek görev: 02 sekmesinde 'Yay uzunluğu ve dönel yüzey' açılışında zincir eğrisinin boyu 2.350402387, 8 parçalı kırık çizgi 2.34588419'dur; parça sayısını 16 yap ve açığın dörtte bire indiğini gör.",
    experiments: [
      {
        title: "Birikimin eğimini ölç; sonra sıçramaya git",
        predict:
          "Açılışta sin x seçili, a = 0, x = 4 ve A(x) = 1.653643621. A grafiğinin x = 4'teki eğimi kaç olmalı? Eğim ölçüm adımı h'yi on kat küçültürsen ölçümle f(x) arasındaki fark kaç kat küçülür? Basamak fonksiyonunun sıçradığı noktada eğim için ne beklersin?",
        do: "01 sekmesinde <strong>Eğim ölçüm adımı h</strong> menüsünü sırayla 0.2, 0.1, 0.01 ve 0.001 yap; her seferinde 'Merkezî eğim' ve 'Merkezî eğim − f(x)' kartlarını oku. Sonra <strong>Basamak: x = 1</strong> düğmesine bas, kartlara bak ve <strong>Üst sınır x</strong>'i 2'ye çek.",
        observe:
          "f(x) hep −0.7568025. Merkezî eğim −0.75176723, −0.75554179, −0.75678988, −0.75680237; fark 0.00504, 0.00126, 1.26·10⁻⁵, 1.26·10⁻⁷. Basamakta x = 1: A(x) = 1; h hangi değerde olursa olsun soldan eğim 1, sağdan eğim 2, 'f(x): sol limit; sağ limit' kartı 1; 2 ve fark kartı 'tanımsız: A′(x) yok'. A grafiğinde köşe görünür. x = 2'de A(x) = 3, iki eğim de 2; ortalama değer 1.5, 'f(c) = ortalama olan c' kartı ise 'yok'.",
        explain:
          "Fark oranı ince şeridin ortalama yüksekliğidir; f sürekli olduğunda h küçülürken f(x)'e iner. Merkezî ölçümün hatası h² ile küçülür: h on kat, fark yüz kat. Sıçramada şeridin iki yanı farklı yüksekliktedir, iki tek taraflı eğim iki ayrı limite gider ve A′(1) yoktur. Basamak 1.5 değerini hiç almadığı için ortalama değer teoremi de işlemez: iki teorem de sürekliliğe yaslanır.",
      },
      {
        title: "+C'yi gözünle gör",
        predict:
          "x² için birikimi önce a = 0'dan, sonra a₂ = 1'den başlat. İki birikim eğrisi arasındaki fark x büyüdükçe açılır mı, kapanır mı, sabit mi kalır? Sabitse kaçtır?",
        do: "01 sekmesinde <strong>Fonksiyon f</strong> menüsünden 'x² (polinom)' seç (a = 0, x = 2 gelir). <strong>İkinci taban noktası a₂ ile karşılaştır (+C)</strong> kutusunu işaretle; a₂ = 1'dir. Üst sınır x'i sırayla 1, −1.5 ve 3 yap. Sonra <strong>İkinci taban noktası a₂</strong> kaydırıcısını 2'ye getir.",
        observe:
          "x = 2'de A(x) = 2.666666667; 'A_a(x) − A_a₂(x)' kartı 0.33333333, '∫ₐ^(a₂) f(t) dt (sabit C)' kartı 0.33333333. x = 1'de A(x) = 0.3333333333, x = −1.5'te −1.125, x = 3'te 9 olur; fark kartı hep 0.33333333 kalır. Alttaki grafikte mor kesikli eğri, A eğrisinin 1/3 kadar aşağı kaymış bir kopyasıdır. a₂ = 2 yapınca fark 2.6666667'ye sıçrar ve yine x'ten bağımsızdır.",
        explain:
          "İki birikimin farkı, a ile a₂ arasındaki integraldir: 1³/3 = 1/3, a₂ = 2 için 8/3. Bu parça x'e bağlı olmadığı için iki eğrinin eğimi her x'te aynıdır; ikisinin de türevi x²'dir. Ters türev tek bir fonksiyon değil, birbirinin düşey kaydırması olan bir ailedir. Belirli integralde C sadeleşir, çünkü F(b) − F(a) farkında iki kez görünür.",
      },
      {
        title: "Küreyi iki kez dilimle",
        predict:
          "Birim küreyi önce eksene dik disklerle, sonra iç içe silindirik kabuklarla dilimle. İki integral aynı sayıyı verir mi? Yarıçapı 2 yaparsan hacim kaç katına çıkar? İki eğri arasındaki bir bölgeyi x ekseni yerine y ekseni çevresinde döndürmek hacmi hep değiştirir mi?",
        do: "02 sekmesinde <strong>Hesap türü</strong> menüsünden 'Dönel cisim hacmi: disk/pul ve kabuk' seç; bölge 'Yarım çember … küre', eksen x ekseni, r = 1 gelir. Kartları oku, <strong>Yarıçap r</strong>'yi 2 yap. Sonra <strong>Döndürülen bölge</strong> menüsünden 'y = √x ile y = x² arası (pul)' seç ve <strong>Dönme ekseni</strong>'ni x'ten y'ye çevir.",
        observe:
          "r = 1: disk 4.188790205, kabuk 4.188790205, kuram 4πr³/3 = 4.188790205; 'Disk/pul − kabuk' kartı '≈ 0 (yuvarlama)'. r = 2: üçü de 33.51032164, tam 8 katı. Pul bölgesinde iki eksen için de disk/pul ve kabuk 0.9424777961 (kuram 3π/10).",
        explain:
          "Disk ve kabuk aynı 2πy·dA katkılarını farklı sırayla toplar; sonuç ortak olmak zorundadır. Hacim uzunluğun küpüyle ölçeklenir: r iki katına çıkınca 2³ = 8. Pul bölgesi y = x doğrusuna göre simetriktir (√x ile x² birbirinin tersidir), bu yüzden iki eksen aynı hacmi verir; bu bir kural değildir. Koniyi dene: r = 1, h = 2 için x ekseni 2.094395102, y ekseni 8.37758041 verir.",
      },
      {
        title: "Sonsuza uzanıp biten toplamlar",
        predict:
          "y = 1/x eğrisini x = 1'den b'ye kadar x ekseni çevresinde döndür. b'yi 10'dan bir milyona çıkarırsan hacim mi daha çok büyür, yüzey mi? 1 kg'ı Dünya'dan sonsuza taşımanın işi sonlu mudur?",
        do: "02 sekmesinde 'Gabriel borusu: sonlu hacim, sonsuz yüzey' seç; <strong>b = 10^k</strong> kaydırıcısıyla b = 10, 1000 ve 1000000 yap. Sonra 03 sekmesinde <strong>p = 1 (eşik)</strong> ve <strong>p = 2</strong> düğmelerine bas (T = 1000). Son olarak <strong>Deney türü</strong> 'Değişken kuvvetin işi', <strong>Kuvvet</strong> 'Kütle çekimi…' seç ve yükseklik kaydırıcısını en sağa, h = 10⁷ km'ye çek.",
        observe:
          "Hacim 2.827433388, 3.138451061, 3.141589512: π'ye kalan 3.142·10⁻⁶'ya iner. Yüzey 15.17744987, 44.11266606, 87.51537254: her onlukta yaklaşık 14.4676 artar. p = 1: kısmi integral 6.907755279, ölçülen onluk oranı 1, son onluğun katkısı 2.30259. p = 2: 0.999, oran 0.1, limit 1. Çekim: iş 62.52491189 MJ, kaçış enerjisi 62.564747 MJ'nin 99.9363 %'i.",
        explain:
          "Hacim integralinde x⁻² vardır (p = 2): katkılar onda bire düşe düşe π'de biter. Yüzey integralindeki (1/x)·√(1 + x⁻⁴) her yerde 1/x'ten büyüktür, yani p = 1 eşiğinin ıraksak tarafındadır; yüzey en az 2π·ln b kadardır. Çekim kuvveti de 1/r² ile azalır: sonsuza kadar toplanan iş GMm/R'de biter. Kaçış hızının (11.1861 km/s) sonlu olmasının nedeni bu yakınsamadır.",
      },
    ],
  },
  wow: [
    {
      title: "Dua kitabının altından çıkan Arşimet",
      body: "Arşimet'in dilimleri bir terazide dengeleyerek sonuca nasıl vardığını anlattığı <em>Mekanik Teoremler Yöntemi</em> yalnızca tek bir kopyadan bilinir. 1229'da bu kopyanın parşömeni kazınıp yıkandı ve üstüne bir dua kitabı yazıldı. El yazması yüzyıllar sonra İstanbul'daki bir Ortodoks kilise kütüphanesine ulaştı; Danimarkalı Johan Heiberg 1906'da sayfaları orada fotoğraflayıp silik satırların altında Arşimet'i okudu. 1920'lerde kaybolan kitap 1998'de New York'ta açık artırmada 2 milyon dolara satıldı; X-ışını görüntüleme, sonradan üstüne boyanmış sahte resimlerin altındaki metni bile geri getirdi.",
    },
    {
      title: "∫ işaretinin doğum günü: 29 Ekim 1675",
      body: "∫ işareti ilk kez Leibniz'in 29 Ekim 1675 tarihli bir el yazması notunda göründü; Ekim 2026'da 351 yaşını doldurdu. Leibniz onu o dönemin yazısındaki uzun s (ſ) harfinden türetti, çünkü integrali sonsuz küçük parçaların toplamı (Latince <em>summa</em>) olarak düşünüyordu. İşaret basılı olarak ilk kez Haziran 1686'da <em>Acta Eruditorum</em> dergisinde çıktı. Yani her ∫ f(x) dx, aslında 'f(x) yüksekliğindeki, dx genişliğindeki dilimlerin toplamı' diye okunan kısaltılmış bir cümledir.",
    },
    {
      title: "Hacmi π'yi geçemeyen sonsuz boru",
      body: "y = 1/x eğrisinin x ≥ 1 parçasını x ekseni çevresinde döndürünce oluşan sonsuz uzun boruyu ilk inceleyen Evangelista Torricelli'dir: 1643'te yazdığı çalışma ertesi yıl <em>Opera geometrica</em> içinde basıldı. Borunun hacmi π'yi aşamaz, yüzeyi ise her sınırı aşar. Sayfada b = 1000000 iken hacim 3.141589512, yüzey 87.51537254'tür. 'İçi sonlu boyayla dolar ama yüzeyi boyanamaz' çelişkisi görünüştedir: gerçek boyanın bir kalınlığı vardır, boru ise sonunda her kalınlıktan daha dar olur. Bugünkü adı, Gabriel borusu, Torricelli'den gelmez.",
    },
  ],
  worked: {
    title: "İvmeden hıza, hızdan yola: yer değiştirme ile yol",
    prompt:
      "Durmakta olan bir araba düz bir yolda x = 0'dan kalkıyor. İvmesi ilk 2 saniyede 2 m/s², sonraki 2 saniyede 0, 4–6 s arasında −3 m/s², 6–8 s arasında −1 m/s². 8. saniyede hızı, yer değiştirmesi ve aldığı toplam yol nedir? (03 sekmesindeki Kinematik deneyinin açılış ayarı budur.)",
    steps: [
      "Hız, ivmenin birikimidir: v(t) = v₀ + ∫<sub>0</sub><sup>t</sup> a dτ. İvme parça parça sabit olduğundan hız parça parça doğrusaldır: v(2) = 0 + 2·2 = 4 m/s; v(4) = 4 m/s; v(6) = 4 − 3·2 = −2 m/s; v(8) = −2 − 1·2 = −4 m/s. Birim kontrolü: (m/s²) × s = m/s.",
      "Hızın işaret değiştirdiği anı bul: 4–6 s arasında v(t) = 4 − 3(t − 4). Sıfır olduğu an t = 4 + 4/3 ≈ 5.3333 s. Araba bu anda durur ve geri dönmeye başlar.",
      "Hız–zaman grafiğinin işaretli alanlarını parça parça yaz: 0–2 s üçgeni 4 m; 2–4 s dikdörtgeni 8 m; 4–5.3333 s üçgeni (1/2)·(4/3)·4 = 8/3 m; 5.3333–6 s üçgeni −(1/2)·(2/3)·2 = −2/3 m; 6–8 s yamuğu −(2 + 4)/2·2 = −6 m.",
      "Yer değiştirme işaretli toplamdır: ∫v dt = 4 + 8 + 8/3 − 2/3 − 6 = 8 m. Alınan yol büyüklüklerin toplamıdır: ∫|v| dt = 4 + 8 + 8/3 + 2/3 + 6 = 64/3 ≈ 21.333 m. Arabanın en uzak noktası dönüş anındaki 44/3 ≈ 14.667 m'dir.",
      "Sayfada doğrula: 03 sekmesi, Deney türü 'Kinematik: ivmeden hıza ve konuma', Gözlem anı t = 8 s. Kartlar v(t) = −4 m/s, yer değiştirme 8 m, alınan yol 21.333333 m, dönüş anı 5.3333 s yazar. t'yi 4 s'ye çekersen ikisi de 12 m olur ve dönüş kartı 'yok' der: hız işaret değiştirmeden yol ile yer değiştirme ayrışmaz.",
    ],
    result:
      "8. saniyede araba −4 m/s hızla geri gelmektedir; başlangıcın 8 m ilerisindedir ama 64/3 ≈ 21.33 m yol almıştır. Ortalama hızı (yer değiştirme/süre) 1 m/s, ortalama sürati (yol/süre) yaklaşık 2.67 m/s'dir. Aradaki 13.33 m'lik fark, dönüşten sonra geri gidilen 6.67 m'den gelir: bu parça yola eklenir, yer değiştirmeden ise düşülür.",
  },
  misconceptions: [
    {
      myth: "Belirli integral eğrinin altındaki alandır; o yüzden hiçbir zaman sıfır ya da negatif olamaz.",
      truth:
        "Eksenin altındaki katkılar eksi sayılır. İlk sekmede 'x³ − 3x: −2'den 2'ye' düğmesine bas: grafikte iki boyalı bölge varken A(x) = 0'dır; 'Eksenin üstündeki alan' ve 'Eksenin altındaki alan' kartlarının ikisi de 2.5 yazar. Geometri sekmesinde y = x³ ile y = x çifti aynı şeyi söyler: alan 0.5, işaretli integral 0. Toplam büyüklük isteniyorsa |f| integrallenir; yol ile yer değiştirmenin farkı da budur.",
    },
    {
      myth: "Fonksiyon sıfıra gidiyorsa sonsuza kadar integrali de sonludur.",
      truth:
        "1/x sıfıra gider ama integrali bitmez. 03 sekmesinde 'p = 1 (eşik)' düğmesine bas: T = 1000'de kısmi integral 6.907755279, T = 10⁶'da 13.81551056; her onluk 2.30259 ekler ve bu ekleme hiç küçülmez. 'p = 2' ise T = 1000'de 0.999'a varmıştır ve 1'i aşamaz. Belirleyici olan sıfıra gitmek değil, ne kadar hızlı gidildiğidir; eşik p = 1'dir.",
    },
    {
      myth: "Ters türevin sonundaki +C önemsizdir, yazmasan da olur.",
      truth:
        "x³/3 ile x³/3 + 5'in ikisinin de türevi x²'dir; ters türev tek bir fonksiyon değil, bir ailedir. Sayfada ikinci taban noktasını açtığında bu aileyi görürsün: aynı eğimli, düşeyde kaymış iki birikim eğrisi. Belirli integralde C, F(b) − F(a) farkında sadeleşir. Ama hızdan konum bulurken C başlangıç konumudur: atlarsan arabanın nereden kalktığını bilmeden nerede olduğunu söylemiş olursun.",
    },
    {
      myth: "Her integral bir formülle hesaplanır; formülü bulunamıyorsa integral de yoktur.",
      truth:
        "İlk sekmede 'e^(−x²)' seç: ters türev kartı 'temel ters türev yok' yazar, ama A(x) = 0.7468241328 olarak hesaplanır ve ikinci bir yöntemle (Simpson) aynı çıkar. Sürekli her fonksiyonun bir birikim fonksiyonu vardır; temel teoremin 1. kısmı bunu garanti eder. Olmayan şey, onu bildik fonksiyonlarla yazan bir formüldür. Yine de aynı eğrinin bütün doğru üzerindeki integrali tam √π'dir; 03 sekmesindeki Gauss deneyinde T = 3'te 1.77241469652 görürsün.",
    },
  ],
  glossary: [
    {
      term: "Belirli integral",
      definition:
        "Bir fonksiyonun [a, b] aralığındaki işaretli birikimini veren tek sayı; Riemann toplamlarının dilimler incelirken yaklaştığı limit.",
    },
    {
      term: "Birikim fonksiyonu",
      definition:
        "Sabit bir a taban noktasından değişken x'e kadar alınan integral, A(x) = ∫<sub>a</sub><sup>x</sup> f(t) dt; f'nin sürekli olduğu noktalarda türevi f(x)'tir.",
    },
    {
      term: "Ters türev",
      definition: "Türevi verilen f olan F fonksiyonu; örneğin x² için x³/3 + C.",
    },
    {
      term: "İntegral sabiti (C)",
      definition:
        "Ters türeve eklenen keyfî sabit; türevleri aynı olan fonksiyonlar bir aralıkta yalnızca bir sabit kadar farklı olabildiği için yazılır ve belirli integralde sadeleşir.",
    },
    {
      term: "Kalkülüsün temel teoremi",
      definition:
        "Sürekli f için birikim fonksiyonunun türevinin f olduğunu ve F′ = f ise ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a) olduğunu söyleyen iki kısımlı teorem.",
    },
    {
      term: "Ortalama değer (integral)",
      definition:
        "Birikimin aralık uzunluğuna bölümü, A(x)/(x − a); aynı net alanı veren dikdörtgenin yüksekliğidir ve sürekli f bu değeri aralıkta en az bir c noktasında alır.",
    },
    {
      term: "Disk ve kabuk yöntemleri",
      definition:
        "Dönel cismin hacmini eksene dik dilimlerle (disk, pul) ya da eksene paralel silindirik katmanlarla (kabuk) toplayan iki integral kuruluşu.",
    },
    {
      term: "Has olmayan integral",
      definition:
        "Aralığı sonsuza uzanan ya da fonksiyonu bir uçta sınırsız büyüyen integral; sonlu sınırlı integrallerin limiti olarak tanımlanır, limit yoksa ıraksaktır.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede integral bir kurallar tablosudur; üniversitede önce sınırları sorgulanır. Riemann integrali her fonksiyonda çalışmaz: rasyonel sayılarda 1, irrasyonellerde 0 olan Dirichlet fonksiyonunda her dilimde iki tür nokta da bulunur; [0, 1] aralığında toplamlar seçime göre 0 ile 1 arasında oynar ve hiçbir sayıya yerleşmez. Henri Lebesgue 1902'deki doktora tezinde dilimlemeyi yatay eksenden dikey eksene taşıdı: 'f hangi değerleri ne kadarlık bir kümede alıyor?' diye sordu. Lebesgue integrali bugün olasılık kuramının ve kuantum mekaniğinin temel dilidir. Aynı dönemde integral boyut kazanır: çift ve üç katlı integrallerle hacim, kütle ve ağırlık merkezi; eğri ve yüzey integralleriyle iş ve akı hesaplanır. Disk ile kabuğun aynı hacmi vermesi, çift katlı integralde toplama sırasının değiştirilebilmesinin (Fubini teoremi) ilk örneğidir; Gauss ve Stokes teoremleri de temel teoremin yüksek boyutlu kuzenleridir.",
      "İkinci köprü sayısaldır. Ters türevi formülle yazılamayan integraller çoktur; çan eğrisi e<sup>−x²</sup> bunun en ünlü örneğidir, sin x eğrisinin yay uzunluğu bir başkasıdır. Bilgisayar bu durumda dilimleyip toplar, ama akıllıca: orta nokta hatası 1/n² ile küçülür, Simpson kuralınınki düzgün fonksiyonlarda 1/n⁴ ile; Gauss kuadratürü örnek noktalarını da en iyi yerlere koyar. Bu sayfanın kullandığı uyarlamalı Gauss–Kronrod kuralı bir adım daha atar: iki ayrı kuralın farkından kendi hatasını tahmin eder ve tahmini en büyük olan parçayı ikiye böler. Boyut çok artınca dilimlemek imkânsızlaşır ve rastgele noktalarla Monte Carlo integrasyonu devreye girer; hatası 1/√N ile küçülür ve boyuttan bağımsızdır. Diferansiyel denklemleri adım adım çözen Euler yöntemi de özünde bir Riemann toplamıdır: v = ∫a dt ve x = ∫v dt zinciri, Fizik I'in bütün hareket problemlerinin iskeletidir.",
    ],
    topics: [
      "Değişken değiştirme ve kısmi integrasyon",
      "Has olmayan integraller ve karşılaştırma testi",
      "Çok katlı integraller ve Fubini teoremi",
      "Gauss ve Stokes teoremleri",
      "Sayısal integrasyon (Simpson, Gauss–Kronrod)",
      "Lebesgue integrali",
      "Diferansiyel denklemler",
      "Olasılık yoğunluğu",
    ],
  },
  quiz: [
    {
      question:
        "f, x &lt; 1 için 1, x ≥ 1 için 2 değerini alan basamak fonksiyonu; A(x) = ∫<sub>0</sub><sup>x</sup> f(t) dt. x = 1 noktası için hangisi doğrudur?",
      options: [
        "A orada süreksizdir: değeri 1'den 2'ye sıçrar",
        "A süreklidir ama köşe yapar: soldan eğimi 1, sağdan eğimi 2'dir",
        "A türevlidir ve A′(1) = 1.5'tir",
        "f süreksiz olduğu için integral tanımsızdır",
      ],
      answer: 1,
      explanation:
        "Sıçrayan f'dir, A değil: ince bir şeridin alanı h ile birlikte sıfıra gider, bu yüzden birikim hiç kopmaz (A(1) = 1). Ama şeridin yüksekliği solda 1, sağda 2'dir; iki tek taraflı eğim farklıdır ve türev yoktur. 1.5 yalnızca bu iki eğimin ortalamasıdır. Sayfada 'Basamak: x = 1' düğmesi tam bunu gösterir: 1, 2 ve 'tanımsız: A′(x) yok'.",
    },
    {
      question:
        "∫<sub>1</sub><sup>T</sup> x<sup>−1.5</sup> dx kısmi integrali T = 100'de 1.8, T = 10⁴'te 1.98 çıkıyor. T = 10⁶'da kaç olur?",
      options: ["2.16", "1.998", "1.9998", "Tam 2"],
      answer: 1,
      explanation:
        "p = 1.5 &gt; 1 olduğundan limit 1/(p − 1) = 2'dir ve limite kalan miktar T<sup>−0.5</sup>/0.5 = 2/√T'dir: 0.2, 0.02, 0.002. T yüz katına çıkınca kalan onda bire iner, çünkü her onluğun katkısı bir öncekinin 10<sup>−0.5</sup> ≈ 0.316 katıdır. 2.16 diyen farkın sabit kaldığını, 'tam 2' diyen limite sonlu bir T'de varıldığını sanır. Sayfada p = 1.5, T = 10⁶ için okuma 1.998'dir.",
    },
    {
      question:
        "1 kg'lık bir kütle Dünya yüzeyinden tam bir Dünya yarıçapı kadar yükseğe (h = R) kaldırılıyor. Sabit çekim varsayan m·g₀·h formülü gerçek işi nasıl tahmin eder?",
      options: [
        "Doğru verir; fark ancak çok daha yükseklerde başlar",
        "Yarısını verir",
        "İki katını verir; bu sayı tam kaçış enerjisidir",
        "Dört katını verir, çünkü çekim 1/r² ile azalır",
      ],
      answer: 2,
      explanation:
        "Gerçek iş W = GMm(1/R − 1/r) = GMm·h/(R·r), sabit çekim ise m·g₀·h = GMm·h/R² verir; oranları tam r/R = 1 + h/R'dir. h = R'de oran 2'dir: formül GMm/R'yi, yani kaçış enerjisinin tamamını (62.564747 MJ) söyler, gerçek iş ise bunun yarısıdır. Sayfada h = 1000 km için fazla tahmin 15.696 %'tir; bu tam 1000/6371'dir.",
    },
  ],
  next: [
    {
      href: "riemann-toplamlari.html",
      title: "Riemann Toplamları ve Sayısal İntegral",
      why: "Bu sayfanın anlatmadığı dikdörtgenler orada: sol uç, sağ uç, orta nokta, yamuk ve Simpson'ı aynı aralıkta yarıştır; Hata ve yakınsama hızı sekmesi hatanın n ile hangi kuvvette küçüldüğünü log–log grafikten ölçer.",
    },
    {
      href: "turev.html",
      title: "Türev: Kesenden Teğete (Limit Laboratuvarı)",
      why: "Temel teoremin öteki yüzü: kesenin eğimi h küçüldükçe teğetin eğimine iner. İleri, geri ve merkezî fark oranlarını |x|'in köşesinde de dene; buradaki eğim ölçümünün ikizidir.",
    },
    {
      href: "hareket-ve-grafikler.html",
      title: "Hareket ve Grafikler",
      why: "Çözümlü örneğin fiziği, grafik diliyle: konum–zaman grafiğinin eğimi hızdır, hız–zaman grafiğinin işaretli alanı yer değiştirmedir; yol için alanların büyüklükleri toplanır.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Calculus Vol. 1, 5.3 The Fundamental Theorem of Calculus",
      url: "https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus",
      note: "Temel teoremin iki kısmı, integraller için ortalama değer teoremi ve ispatlar (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · Calculus Vol. 2, 3.7 Improper Integrals",
      url: "https://openstax.org/books/calculus-volume-2/pages/3-7-improper-integrals",
      note: "Has olmayan integralin limit tanımı, karşılaştırma teoremi ve Gabriel borusunun hacmi.",
    },
    {
      title: "Wikipedia · Gabriel's horn",
      url: "https://en.wikipedia.org/wiki/Gabriel%27s_horn",
      note: "Torricelli'nin 1643 tarihli çalışması, hacim ve yüzey hesapları, boyacı paradoksunun çözümü.",
    },
    {
      title: "Wikipedia · Archimedes Palimpsest",
      url: "https://en.wikipedia.org/wiki/Archimedes_Palimpsest",
      note: "Kazınıp dua kitabına dönüştürülen el yazmasının öyküsü: 1229, İstanbul'da 1906, 1998 açık artırması.",
    },
  ],
  revision: "Kasım 2026",
};
