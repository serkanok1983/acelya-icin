window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["riemann-toplamlari"] = {
  slug: "riemann-toplamlari",
  title: "Riemann Toplamları: Hatanın Hızı ve Monte Carlo",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Dikdörtgen, yamuk, parabol ve rastgele nokta: aynı alanı dört yolla ölç, hatanın n ile hangi hızda eridiğini log–log grafikte gör, tek boyutta kaybeden Monte Carlo'nun çok boyutta neden kazandığını hesapla.",
  hook:
    "Çeyrek çemberin altındaki alanı, yüksekliği sol uçtan alınan 100 dikdörtgenle ölçüp 4 ile çarparsan π için 3.160 bulursun; yüksekliği dilimin ortasından alırsan 3.14194, ünlü Simpson kuralıyla ise daha kötü bir 3.14113. Rastgele 10 000 noktayla ölçen Monte Carlo 3.146'da kalır, ama on boyutlu bir integralde yarışı o kazanır. En iyi yöntem neden fonksiyona ve boyuta göre değişir?",
  bigIdea:
    "Belirli integral, dilimler incelirken Riemann toplamlarının yerleştiği sayıdır; sayısal kurallar bu sayıya farklı hızlarla yaklaşır: düzgün bir fonksiyonda hata Δx<sup>p</sup> gibi küçülür (sol ve sağ uçta p = 1, orta nokta ve yamukta 2, Simpson'da 4), pürüz bu mertebeyi düşürür, rastgele örnekleme ise boyuttan bağımsız ama yavaş bir 1/√n hızıyla ilerler.",
  story: [
    "MÖ 3. yüzyılda Arşimet, <em>Çemberin Ölçümü</em>'nde bir çembere içten ve dıştan 96 kenarlı çokgenler çizdi: çevrelerinin çapa oranı π'yi alttan ve üstten kıstırıyordu, 3 10/71 &lt; π &lt; 3 1/7, yani 3.1408 ile 3.1429 arası. Bu sayfadaki alt ve üst toplamlar aynı işi yapar. İki bin yıl sonra soru tersine döndü: alan derken tam olarak neyi kastediyoruz? Bernhard Riemann 1854'te Göttingen'e sunduğu habilitasyon tezinde (konusu, bir fonksiyonun trigonometrik seriyle yazılıp yazılamayacağıydı) integrali, her dilimden <em>herhangi</em> bir nokta seçilerek kurulan toplamların limiti olarak tanımladı; tez ancak ölümünden sonra, 1868'de basıldı. 1875'te Gaston Darboux tanımı, her dilimdeki en büyük ve en küçük değerle kurulan <strong>üst ve alt toplamlarla</strong> sadeleştirdi: ikisi aynı sayıya sıkışıyorsa fonksiyon integrallenebilirdir.",
    "Tanım bir limittir; hesap ise sonlu bir toplamla yetinmek zorundadır. Isaac Newton eşit aralıklı noktalardan geçen polinomu integralleme fikrini ortaya attı; kuralların katsayılarını, <em>Principia</em>'nın ikinci baskısını Newton'la birlikte hazırlayan genç Roger Cotes çıkardı. Yamuk ve Simpson kuralları bu <strong>Newton–Cotes</strong> ailesinin en küçük iki üyesidir. Cotes 1716'da 33 yaşında ölünce Newton'un 'Yaşasaydı bir şeyler öğrenebilirdik' dediği aktarılır. Hatanın kendisini 1730'larda Leonhard Euler ve Colin Maclaurin birbirinden bağımsız olarak yakaladı: toplam ile integral arasındaki fark, uçlardaki türevlerle yazılabiliyordu. Euler bu <strong>Euler–Maclaurin formülüyle</strong> 1735'te 1 + 1/4 + 1/9 + … serisinin toplamını virgülden sonra 20 basamakla buldu; terim terim toplasaydı 10<sup>20</sup>'den fazla terim gerekirdi. Sayfadaki 'öncü hata terimi' kartı bu formülün ilk terimidir. 1814'te Carl Friedrich Gauss soruyu değiştirdi: noktalar eşit aralıklı olmak zorunda mı? Doğru yerlere konan n nokta, derecesi 2n − 1'e kadar her polinomu tam integralliyordu.",
    "Hatanın biçimini bilmek onu silmeyi de sağlar. 1911'de Lewis Fry Richardson bir taş barajın içindeki gerilmeleri sonlu farklarla hesaplarken bunu yönteme dönüştürdü: hata adım boyunun karesiyle küçülüyorsa, iki farklı adımla bulunan iki yaklaşık sonuç birleştirilip o kare terim silinebilir. Fikrin bir biçimini Christiaan Huygens 17. yüzyılda Arşimet'in çokgenleriyle π'yi hesaplarken kullanmıştı; adını Richardson'ın 1927'de J. A. Gaunt ile yazdığı makale koydu: 'limite ertelenmiş yaklaşım' (<em>the deferred approach to the limit</em>). 1955'te Werner Romberg aynı hileyi yamuk kuralına art arda uyguladı; tek bir yamuk tablosundan giderek yüksek mertebeli sonuçlar çıkaran <strong>Romberg yöntemi</strong> bugün sayısal analiz derslerinin klasiğidir. Sayfadaki (4T<sub>2n</sub> − T<sub>n</sub>)/3 kartı bu merdivenin ilk basamağıdır ve şaşırtıcı biçimde Simpson kuralını yeniden üretir.",
    "Kendi anlatımına göre Stanisław Ulam 1946'da ağır bir hastalıktan iyileşirken Canfield adlı tek kişilik iskambil oyununun kazanılma olasılığını merak etti. Kombinatorik hesap umutsuzdu; aklına daha pratik bir yol geldi: oyunu yüz kez açıp başarılı olanları saymak. Los Alamos'ta fikri John von Neumann'la birlikte nötronların maddede yayılmasına uyguladılar. Gizli çalışmaya <strong>Monte Carlo</strong> adını Nicholas Metropolis koydu: Ulam'ın bir amcası, Monako'daki ünlü kumarhaneye 'gitmesi şart olduğu' için akrabalarından borç alırdı. İlk tam otomatik hesaplar 1948 baharında ENIAC'ta yapıldı, Metropolis ile Ulam'ın 'The Monte Carlo Method' makalesi 1949'da yayımlandı. Fikrin atası daha eskidir: Buffon'un 1733'te sorup 1777'de yayımladığı problemde, çizgili bir zemine atılan iğnenin çizgiyi kesme olasılığında π saklıdır. Sayfanın varsayılan tohumu 1946, Ulam'ın iskambil masasına bir selamdır.",
  ],
  core: [
    {
      heading: "Alttan ve üstten sıkıştırmak: integralin tanımı",
      body:
        "[a, b]'yi n dilime böl; her dilimden bir nokta seç, f'nin orada aldığı değeri dilim genişliğiyle çarp ve topla. Noktayı sol uçtan, sağ uçtan ya da ortadan seçmek farklı <strong>Riemann toplamları</strong> verir. Hepsini birden denetlemenin yolu Darboux'nunkidir: her dilimde f'nin en büyük değeriyle <strong>üst toplam</strong> U<sub>n</sub>, en küçüğüyle <strong>alt toplam</strong> L<sub>n</sub> kurulur ve her Riemann toplamı ikisinin arasında kalır. Dilimler inceldikçe U<sub>n</sub> ile L<sub>n</sub> aynı sayıya sıkışıyorsa f integrallenebilir, o ortak sayı da integraldir. Artan bir fonksiyonda fark teleskop gibi sadeleşir: U<sub>n</sub> − L<sub>n</sub> = Δx·[f(b) − f(a)]. x² için [0, 1]'de n = 10 iken sayfa U = 0.385 ve L = 0.285 gösterir; fark tam 0.1'dir ve n büyüdükçe sıfıra gider. Bu tek satır, her monoton fonksiyonun integrallenebilir olduğunun ispatıdır.",
      formula: "L<sub>n</sub> ≤ Σ f(ξ<sub>i</sub>)·Δx ≤ U<sub>n</sub>,   U<sub>n</sub> − L<sub>n</sub> → 0 ⇔ f integrallenebilir",
      formulaNote:
        "ξ<sub>i</sub>, i'inci dilimden seçilen herhangi bir nokta. Sayfanın alt grafiğindeki gri şerit L<sub>n</sub> ile U<sub>n</sub> arasıdır; seçili yöntemin eğrisi hep o şeridin içinde kalır.",
    },
    {
      heading: "1/n, 1/n², 1/n⁴: hata mertebeleri",
      body:
        "Hata, her dilimde eğriyi daha basit bir şekille değiştirmekten doğar. Sol uç dikdörtgeni eğimi görmez: dilim başına hata f′·Δx²/2 mertebesindedir, n dilimde toplanınca Δx ile orantılı kalır. Sol ve sağ uç bu yüzden <strong>birinci mertebedendir</strong>. Orta noktada eğimin katkısı dilimin iki yarısında birbirini götürür, geriye eğrilik (f″) kalır: hata Δx² ile küçülür. Yamuk da ikinci mertebedendir ama ters işaretle ve iki kat büyük yanılır; bu yüzden (2M<sub>n</sub> + T<sub>n</sub>)/3 bileşimi Δx² terimini siler ve <strong>Simpson kuralını</strong> (S<sub>2n</sub>) verir: hata Δx⁴. Hata C·Δx<sup>p</sup> ise log|hata| ile log n arasındaki ilişki eğimi −p olan bir doğrudur; 'Hata ve yakınsama hızı' sekmesinin eğim tablosu tam bunu ölçer. Pratik kural: n'yi iki katına çıkarmak hatayı 2<sup>p</sup> kat küçültür; sol uçta 2, yamukta 4, Simpson'da 16 kat.",
      formula:
        "E<sub>sol</sub> ≈ −(Δx/2)·[f(b) − f(a)],  E<sub>M</sub> ≈ −(Δx²/24)·[f′(b) − f′(a)],  E<sub>T</sub> ≈ +(Δx²/12)·[f′(b) − f′(a)],  E<sub>S</sub> ≈ +(Δx⁴/180)·[f‴(b) − f‴(a)]",
      formulaNote:
        "E = toplam − I; M orta nokta, T yamuk, S Simpson. Sayfadaki 'Kuram: öncü hata terimi' kartı bu terimleri yazar: x² için [0, 1]'de n = 10 iken sol uçta −0.0500, orta noktada −0.000833, yamukta +0.00167, Simpson'da '0 (tam)'.",
    },
    {
      heading: "Düzgünlük yoksa mertebe de yok",
      body:
        "Hata formüllerinin hepsi türev ister; türev uçta sonsuza giderse ya da fonksiyon sıçrarsa geçersiz kalırlar. Çeyrek çember √(1 − x²), x = 1'de dikey teğetle biter: orada f, √2·√(1 − x) gibi davranır ve f′ sonsuza gider. Euler–Maclaurin formülünün böyle uçlara genişletilmiş hâli (Navot açılımı) hatanın Δx<sup>3/2</sup> ile küçüldüğünü söyler; sayfa orta nokta, yamuk ve Simpson için aynı eğimi ölçer: −1.50. Simpson'ın fazladan iki mertebesi yok olur, artık yalnız sabitler yarışır ve en küçük sabit orta noktanınkidir. Orta nokta/yamuk hata oranı da −½ değil, 2<sup>−½</sup> − 1 ≈ −0.293 olur. Basamak fonksiyonunda (1/√2'de 1'den 2'ye sıçrar) durum daha serttir: sıçramayı içeren tek dilim J·Δx mertebesinde hata taşır ve yüksek mertebeli kurallar da birinci mertebeye düşer. Ölçülen eğimler −0.94 ile −1.05 arasında saçılır.",
      formula: "T<sub>n</sub> − I ≈ √2·ζ(−½)·Δx<sup>3/2</sup> ≈ −0.294·Δx<sup>3/2</sup>   (çeyrek çember, [0, 1])",
      formulaNote:
        "ζ(−½) ≈ −0.2079, Riemann zeta fonksiyonunun bir değeri. Orta noktada katsayı (2<sup>−½</sup> − 1) ile çarpılır (+0.0861·Δx<sup>3/2</sup>), Simpson'da (4 − 2√2)/3 ile (−0.1148·Δx<sup>3/2</sup>).",
    },
    {
      heading: "Euler–Maclaurin: periyodik mucize ve Richardson'ın hilesi",
      body:
        "Yamuk hatasının açılımı yalnız Δx'in çift kuvvetlerini içerir ve her terim uçlardaki bir türev farkıyla çarpılır. İki sonuç çıkar. Birincisi: f düzgün ve periyodikse ve aralık tam bir periyotsa bütün farklar sıfırdır; hata Δx'in hiçbir kuvveti gibi değil, hepsinden hızlı küçülür. exp(cos x) için [0, 2π]'de yamuk hatası n = 4'te 0.0344, n = 8'de 1.25·10<sup>−6</sup>, n = 12'de 6.53·10<sup>−12</sup>'dir. Simpson burada yamuktan kötüdür, çünkü kaba T<sub>n/2</sub>'yi karışıma katar. İkincisi: hata c₁Δx² + c₂Δx⁴ + … biçimindeyse Δx'i yarıya indirmek ilk terimi dörtte birine indirir ve (4T<sub>2n</sub> − T<sub>n</sub>)/3 onu siler. Bu <strong>Richardson ekstrapolasyonudur</strong>; sonuç cebirsel olarak S<sub>2n</sub>'dir. eˣ için T<sub>200</sub>'ün hatası 3.58·10<sup>−6</sup>, T<sub>100</sub> ile T<sub>200</sub>'den kurulan Richardson'ınki 5.97·10<sup>−12</sup>: 600 bin kat küçük. Varsayım bozulursa (çeyrek çember) kazanç 2.6 kata iner.",
      formula:
        "T<sub>n</sub> − I = Σ<sub>k≥1</sub> [B<sub>2k</sub>/(2k)!]·Δx<sup>2k</sup>·[f<sup>(2k−1)</sup>(b) − f<sup>(2k−1)</sup>(a)]",
      formulaNote:
        "B<sub>2</sub> = 1/6 ve B<sub>4</sub> = −1/30 Bernoulli sayıları; ilk terimler +(Δx²/12)·[f′(b) − f′(a)] ve −(Δx⁴/720)·[f‴(b) − f‴(a)]. Seri her zaman yakınsamaz; kalan terimiyle birlikte asimptotik bir açılım olarak okunur.",
    },
    {
      heading: "Monte Carlo: 1/√n ve boyut laneti",
      body:
        "x'i [a, b]'de rastgele seç, f(x)'lerin ortalamasını (b − a) ile çarp: <strong>ortalama değer Monte Carlo</strong> tahmini budur. Tahmin bir örneklem ortalaması olduğu için merkezi limit teoremi işler: hata yaklaşık normal dağılır ve standart sapması σ/√n'dir. Türev istemez; sıçrama ya da sonsuz eğim hızını değiştirmez, yalnız σ'yı belirler. Ama yavaştır: bir basamak için 100 kat örnek. Tek boyutta bu bir yenilgidir: çeyrek çemberde n = 10<sup>4</sup>'te Monte Carlo'nun standart hatası 0.0022, yamuk hatası 2.9·10<sup>−7</sup>. Kozunu boyut artınca oynar. d boyutlu bir küpte N noktalık ızgara her eksene yalnız N<sup>1/d</sup> nokta ayırabilir; p'inci mertebeden bir kuralın hatası N<sup>−p/d</sup> gibi küçülür. Monte Carlo'nun N<sup>−1/2</sup> hızı d'den bağımsızdır (σ integranda göre değişebilir, üs değişmez), bu yüzden d &gt; 2p olunca kazanır: N = 10<sup>6</sup> ile sayfada yamuğu d = 5'ten, Simpson'ı d = 9'dan itibaren geçer. Richard Bellman'ın deyişiyle bu, <strong>boyut lanetidir</strong>.",
      formula:
        "I ≈ (b − a)·<span class=ov>y</span><sub>n</sub>,   standart hata σ/√n,   σ² = (b − a)·∫<sub>a</sub><sup>b</sup> f² dx − I²",
      formulaNote:
        "<span class=ov>y</span><sub>n</sub>, n örnekteki f değerlerinin ortalaması. Çeyrek çember için σ = √(2/3 − π²/16) ≈ 0.2232. Hatayı 10 kat küçültmek 100 kat örnek ister; boyut sayısı formülde hiç geçmez.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın üç sekmesinin her birinde ayrı bir <strong>Fonksiyon f(x)</strong> menüsü (x², sin x, eˣ, 1/x, √(1 − x²) çeyrek çember, basamak, periyodik exp(cos x)), <strong>Alt sınır a</strong> ve <strong>Üst sınır b</strong> kaydırıcıları, π, 2π, π/2 gibi ifadeleri de kabul eden sınır kutuları ve bir <strong>Sıfırla</strong> düğmesi var; fonksiyon değişince aralık o fonksiyonun varsayılanına döner. <strong>Toplamlar</strong>'da <strong>Toplama kuralı</strong> menüsü yedi yöntemden birini seçer (sol uç, sağ uç, orta nokta, yamuk, yalnız çift n için Simpson, üst ve alt Darboux toplamı); n'yi <strong>Dilim sayısı n</strong> kaydırıcısı, n kutusu ve <strong>n ÷ 2</strong>, <strong>n × 2</strong> düğmeleri ayarlar. Kartlar ölçülen toplamı, tam integrali, hatayı, kuramın öncü hata terimini ve ikisinin oranını yan yana yazar; 'Aynı dilim sayısıyla bütün yöntemler' tablosu yedi yöntemi aynı n'de karşılaştırır. Yuvarlama eşiğinin altındaki bir hata sayı olarak değil, '≈ 0 (yuvarlama)' diye yazılır. <strong>Hata ve yakınsama hızı</strong> |hata|'yı n = 1 … 10<sup>5</sup> arasında 92 değerde log–log çizer, eğimleri ölçüp kuramla karşılaştırır ve Richardson kartlarını gösterir. <strong>Monte Carlo</strong>'da <strong>Tohum</strong> kutusu (varsayılan 1946), <strong>Örneklemeyi canlandır</strong> düğmesi (8 saniyede 10<sup>5</sup> örnek), <strong>İncelenen n</strong> ve <strong>Boyut d</strong> kaydırıcıları var. <kbd>R</kbd> açık sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Sol uç, orta nokta, Simpson: n'yi ikiye katla",
        predict:
          "x² için [0, 1]'de I = 1/3. n = 10'da sol uç toplamı 1/3'ün altında mı kalır, üstünde mi? n'yi 20'ye çıkarınca sol uç hatası ve orta nokta hatası kaç kat küçülür? Simpson ne kadar yanılır?",
        do: "<strong>Toplamlar</strong> sekmesinde <strong>Sıfırla</strong>'ya bas (x², [0, 1], n = 10, sol uç). Kartları ve 'Aynı dilim sayısıyla bütün yöntemler' tablosunu oku. Sonra <strong>n × 2</strong>'ye bas ve tabloyu yeniden oku.",
        observe:
          "n = 10: sol uç 0.285 (hata −0.0483), sağ uç 0.385 (+0.0517), orta nokta 0.3325 (−0.000833), yamuk 0.335 (+0.00167), Simpson 0.333333333333 ve hata sütununda '≈ 0 (yuvarlama)': tablonun altındaki not eşiği 64·ε·max[(b − a)·max|f|, |I|] diye verir, burada 1.4·10<sup>−14</sup>. Üst toplam sağ uca, alt toplam sol uca eşit. n = 20'de sol uç hatası −0.0246 (yaklaşık yarısı), orta nokta −0.000208 (tam dörtte biri), yamuk +0.000417.",
        explain:
          "Sol ucun öncü terimi −(Δx/2)·[f(1) − f(0)] = −0.05; aradaki fark Δx²/6 düzeltmesidir (oran kartı 0.9667). x²'de f″ sabit olduğu için orta nokta ve yamuk hataları tam −Δx²/12 ve +Δx²/6'dır: oran −½. Simpson üçüncü dereceye kadar her polinomda tamdır. x² artan olduğundan her dilimin en küçük değeri sol uçta, en büyüğü sağ uçtadır.",
      },
      {
        title: "Eğimleri ölç: pürüzsüz, dikey teğet, sıçrama",
        predict:
          "eˣ için log–log grafikte sol uç, orta nokta, yamuk ve Simpson'ın eğimleri ne olur? Çeyrek çemberde (x = 1'de dikey teğet) Simpson −4'ü korur mu? Sıçrayan basamak fonksiyonunda ne olur?",
        do: "<strong>Hata ve yakınsama hızı</strong> sekmesinde <strong>Sıfırla</strong>'ya bas (eˣ, [0, 1], n = 100) ve eğim tablosunu oku. Sonra <strong>Fonksiyon f(x)</strong> menüsünden çeyrek çemberi, ardından basamağı seç; her seferinde tabloyu ve 'Orta nokta hatası / yamuk hatası' kartını oku.",
        observe:
          "eˣ: −1.00, −1.00, −2.00, −2.00, −4.00 (sol, sağ, orta, yamuk, Simpson); Simpson yalnız n = 8–630 arasında uydurulur. Orta/yamuk oranı −0.5000. Çeyrek çember: orta nokta, yamuk ve Simpson −1.50, sol ve sağ uç −0.98 ve −1.02; oran −0.2928 (kuram −0.2929). Basamak: bütün yöntemler −0.94 ile −1.05 arasında, tabloda 'saçılmalı' notuyla.",
        explain:
          "Ölçülen eğim kuramın −p'sidir. Simpson'ın hatası n ≈ 630'da kayan noktanın yuvarlama eşiğine (3.9·10<sup>−14</sup>) iner; daha büyük n onu küçültmez. Çeyrek çemberde f′(1) sonsuzdur: öncü terimler Δx<sup>3/2</sup>'ye düşer, oran 2<sup>−½</sup> − 1 olur. Sıçrama noktasında türev yoktur; hata en çok J·Δx'tir ve n ile düzensiz oynar.",
      },
      {
        title: "Periyodik mucize: 12 dilimde 11 basamak",
        predict:
          "exp(cos x)'i tam bir periyotta, [0, 2π]'de yamuk kuralıyla topla. n'yi 8'den 12'ye çıkarınca 1/n² kuralı hatanın (8/12)² ≈ 0.44 katına inmesini söyler. Gerçekte ne olur? Aynı n'de Simpson yamuğu geçer mi?",
        do: "<strong>Toplamlar</strong>'da <strong>Fonksiyon f(x)</strong> menüsünden exp(cos x)'i seç (aralık kendiliğinden [0, 2π] olur), <strong>Toplama kuralı</strong>'nı yamuk yap ve n kutusuna sırayla 4, 8, 12, 14 yaz. Sonra n = 8 ve 12'de kuralı Simpson'a çevir.",
        observe:
          "I = 7.95492652101. Yamuk hatası n = 4'te +0.0344, 8'de +1.25·10<sup>−6</sup>, 12'de +6.53·10<sup>−12</sup> (8'den 12'ye 190 bin kat düşüş), 14'te '≈ 0 (yuvarlama)'; öncü terim kartı orada kuramın +8.95·10<sup>−15</sup>'ini yazıp 'yuvarlama eşiğinin altında, ölçülemez' der. Sol ve sağ uç aynı sayıyı verir. Simpson n = 8'de −0.0115, yamuktan yaklaşık 9 bin kat kötü; n = 12'de −9.42·10<sup>−5</sup>.",
        explain:
          "Tam periyotta Euler–Maclaurin'in bütün uç terimleri sıfırdır. Kalan hata, fonksiyonun yüksek frekanslı Fourier bileşenlerinin ızgarada düşük frekans gibi görünmesinden (örtüşme) gelir. exp(cos x) için bu hata ≈ 4π·I<sub>n</sub>(1)'dir (I<sub>n</sub>: değiştirilmiş Bessel fonksiyonu) ve n büyüdükçe her kuvvetten hızlı söner. Simpson ise (4T<sub>n</sub> − T<sub>n/2</sub>)/3'tür ve kaba T<sub>n/2</sub>'nin hatasını taşır.",
      },
      {
        title: "Rastgele noktalar ızgaraya karşı",
        predict:
          "Çeyrek çemberde 10 000 rastgele noktanın tahmini kaç basamak doğru olur? Aynı n'de yamuk kuralı ne kadar yanılır? Kaç boyutta Monte Carlo yamuğu geçer?",
        do: "<strong>Monte Carlo</strong> sekmesinde <strong>Sıfırla</strong>'ya bas (çeyrek çember, tohum 1946, n = 10000, d = 6) ve kartları oku; istersen <strong>Örneklemeyi canlandır</strong> ile 8 saniyelik örneklemeyi izle. Sonra <strong>Boyut d</strong> kaydırıcısını 4, 5, 8 ve 9'a getirip tabloyu karşılaştır.",
        observe:
          "Tahmin 0.7866 ± 0.0022 (π için 3.146 ± 0.0088), hata +0.00117: +0.53 kuramsal standart hata. σ/√n = 0.00223, 64 koşunun kök ortalama karesi 0.00208, eğim −0.50. Yamuk hatası −2.94·10<sup>−7</sup>: eşitlemek için n ≈ 5.76·10<sup>11</sup> örnek gerekir. Tabloda d = 4'te yamuk önde, d = 5'te Monte Carlo (6.95·10<sup>−4</sup> ile 2.13·10<sup>−3</sup>); Simpson d = 9'da geçilir (1.02·10<sup>−3</sup> ile 3.04·10<sup>−3</sup>).",
        explain:
          "Monte Carlo'nun hatası σ/√n'dir: 100 kat örnek, 10 kat doğruluk. Tek boyutta, çeyrek çemberde bile n<sup>−3/2</sup> ile küçülen yamuk hatası karşısında şansı yoktur; n ≈ (σ/|E<sub>T</sub>|)² hesabı bunu sayıya döker. d boyutta ızgara her eksene N<sup>1/d</sup> nokta ayırabilir ve hatası N<sup>−p/d</sup> gibi küçülür; d &gt; 2p olunca (yamukta d ≥ 5, Simpson'da d ≥ 9) 1/√N kazanır. Tablonun Monte Carlo satırı da d ile biraz büyür (d = 4'te 6.09·10<sup>−4</sup>, d = 9'da 1.02·10<sup>−3</sup>), çünkü bu integrandın bağıl σ'sı boyutla artar; boyuttan bağımsız olan, −1/2 üssüdür.",
      },
    ],
  },
  wow: [
    {
      title: "Lazzarini'nin fazla şanslı iğneleri",
      body:
        "1901'de İtalyan matematikçi Mario Lazzarini, Buffon'un iğne deneyini 3408 atışla yaptığını ve π için 355/113 = 3.1415929 bulduğunu yazdı: altı doğru ondalık. Bu büyüklükte dürüst bir deneyin standart hatası yaklaşık 0.05'tir; 355/113 ise π'den yalnız 2.7·10<sup>−7</sup> uzakta. Sayfanın çeyrek çember Monte Carlo'su bu doğruluğa tipik olarak ancak 10<sup>13</sup> civarında örnekle ulaşır. Sır aritmetikte: iğne boyu çizgi aralığının 5/6'sı olunca tahmin (5/3)·atış/kesişme olur ve 3408 = 16 × 213 atışta tam 1808 kesişme 355/113'ü verir. Bildirdiği ara sonuçların istatistiği, deneyin belki de hiç yapılmadığını düşündürür.",
    },
    {
      title: "En basit kural, en hızlı kural",
      body:
        "Periyodik bir fonksiyonu tam bir periyotta integrallerken sıradan yamuk kuralı 'akıllı' kuralların çoğunu geride bırakır. Sayfada exp(cos x) için 12 dilim hatayı 6.53·10<sup>−12</sup>'ye indirir; aynı 12 dilimle Simpson'ın hatası 9.42·10<sup>−5</sup>, yaklaşık 14 milyon kat büyük. Lloyd N. Trefethen ile J. A. C. Weideman'ın 2014'te <em>SIAM Review</em>'da yayımlanan derlemesine göre bunu ilk fark eden, 1820'lerde bir elipsin çevresini hesaplayan Siméon Denis Poisson'dı: simetriden yararlanıp yalnız üç karekök hesabıyla on basamak buldu. Aynı derleme olgunun özel fonksiyonlardan integral denklemlere kadar bilimsel hesaplamanın her köşesinde iş gördüğünü gösterir.",
    },
    {
      title: "On boyutta eksen başına 3 nokta",
      body:
        "Bir milyon fonksiyon değeri bol görünür. On boyutlu bir küpte ızgara kurarsan her eksene yalnız 3 nokta düşer: 3<sup>10</sup> = 59 049 sığar, 4<sup>10</sup> = 1 048 576 sığmaz. Sayfanın tablosunda d = 10 için yamuk kuralının bağıl hatası 0.228, yani yüzde 23; aynı bütçeyle Monte Carlo'nun bağıl standart hatası 1.09·10<sup>−3</sup>, binde bir. Fizikte kafes hesapları, finansta opsiyon fiyatlama, bilgisayar grafiğinde gerçekçi ışık hesabı gibi çok boyutlu integraller bu yüzden rastgele örneklemeyle yapılır.",
    },
  ],
  worked: {
    title: "10⁻⁶ hata için kaç dilim?",
    prompt:
      "∫<sub>0</sub><sup>1</sup> eˣ dx = e − 1 ≈ 1.718281828 integralini yamuk kuralıyla, hatası 10<sup>−6</sup>'yı aşmayacak biçimde hesaplamak istiyoruz. (a) Hata sınırı |E<sub>T</sub>| ≤ (b − a)³·max|f″|/(12n²) ile kaç dilim yeter? (b) Euler–Maclaurin öncü terimine göre gerçekte kaç dilim gerekir? (c) Aynı soruyu Simpson kuralı için cevapla ve sonuçları sayfada doğrula.",
    steps: [
      "(a) [0, 1]'de f″(x) = eˣ en büyük değerini x = 1'de alır: max|f″| = e ≈ 2.71828. Koşul e/(12n²) ≤ 10<sup>−6</sup>, yani n² ≥ e·10<sup>6</sup>/12 ≈ 226 524 ve n ≥ 475.9. Sınır n = 476 der.",
      "(b) Sınır, eğriliğin en kötü değerini bütün aralığa yayar; öncü terim ise ortalamasını kullanır: ∫f″ dx = f′(1) − f′(0) = e − 1 olduğundan E<sub>T</sub> ≈ (Δx²/12)·(e − 1) = (e − 1)/(12n²). (e − 1)/(12n²) ≤ 10<sup>−6</sup> ⇒ n² ≥ 143 190, n ≥ 378.4, yani n = 379.",
      "Sayfada doğrula: <strong>Toplamlar</strong>'da eˣ'i seç (aralık [0, 1]), kuralı yamuk yap, n kutusuna 476 yaz: hata +6.32·10<sup>−7</sup>, öncü terim aynı, oran 1.000. n = 379'da hata +9.97·10<sup>−7</sup>; n = 378'de +1.00·10<sup>−6</sup> (tam değeri 1.002·10<sup>−6</sup>, sınırın hemen üstü). Sınır güvenlidir ama gereğinden yaklaşık yüzde 26 fazla dilim ister.",
      "(c) Simpson için |E<sub>S</sub>| ≤ (b − a)⁵·max|f⁽⁴⁾|/(180n⁴) = e/(180n⁴) ≤ 10<sup>−6</sup> ⇒ n⁴ ≥ 15 102, n ≥ 11.09; n çift olmalı, sınır n = 12 der. Öncü terim (e − 1)/(180n⁴) ise n = 10'u yeterli bulur. Sayfa: Simpson n = 12'de +4.60·10<sup>−7</sup>, n = 10'da +9.53·10<sup>−7</sup> (öncü terim +9.55·10<sup>−7</sup>).",
      "Maliyeti karşılaştır: yamuk 379 dilimle 380 fonksiyon değeri, Simpson 10 dilimle 11 değer ister; yaklaşık 35 kat az. Aynı sayıya Richardson'la da varılır: <strong>Hata ve yakınsama hızı</strong>'nda n kutusuna 5 yazınca Richardson kartı (4T<sub>10</sub> − T<sub>5</sub>)/3 = 1.71828278192 gösterir, yanındaki S<sub>10</sub> kartı da aynı sayıyı.",
    ],
    result:
      "Hata sınırı 476 yamuk dilimi der, gerçekte 379 yeter; Simpson aynı doğruluğu 10 dilimle verir. Sınır en kötü durumu, öncü terim tipik durumu ölçer; aradaki fark, f″'nün aralık boyunca ne kadar değiştiğinden gelir.",
  },
  misconceptions: [
    {
      myth: "Sol uç toplamı hep eksik sayar, sağ uç toplamı hep fazla.",
      truth:
        "Bu yalnız artan fonksiyonlarda doğrudur. Çeyrek çember [0, 1]'de azalır: sayfada n = 100'de sol uç toplamı 0.790104, tam değer π/4 ≈ 0.785398'den büyüktür ve 4·S<sub>n</sub> = 3.1604 olur. Alttan ve üstten garanti veren toplamlar alt ve üst Darboux toplamlarıdır; azalan bir fonksiyonda üst toplam sol uca, alt toplam sağ uca eşit çıkar.",
    },
    {
      myth: "Dilim sayısını iki katına çıkarmak hatayı her zaman küçültür, hem de hep aynı oranda.",
      truth:
        "Kazanç yöntemin mertebesine bağlıdır: sol uçta 2, yamukta 4, Simpson'da 16 kat. Düzgünlük yoksa garanti de yoktur. Basamak fonksiyonunda orta nokta hatası n = 10, 20 ve 40'ta aynıdır: +0.00711. Yamuk hatası n = 200'de −0.000393 iken n = 400'de +0.000857'ye büyür. Sıçramayı içeren dilimin hatası, sıçramanın o dilimin neresine düştüğüne bağlıdır.",
    },
    {
      myth: "Simpson kuralı her zaman orta nokta ve yamuk kurallarından iyidir.",
      truth:
        "Simpson'ın fazladan iki mertebesi, f'nin dördüncü türevine kadar düzgün olmasına dayanır. Çeyrek çemberde x = 1'de türev sonsuzdur: n = 100'de 4·S<sub>n</sub> orta noktayla 3.14193685790 (hata +0.000344), Simpson'la 3.14113320534 (−0.000459) olur; ikisi de Δx<sup>3/2</sup> ile küçülür ve sabiti küçük olan kazanır. Periyodik exp(cos x)'te [0, 2π] üzerinde n = 8 iken Simpson yamuktan yaklaşık 9 bin kat kötüdür.",
    },
    {
      myth: "Monte Carlo kaba ve yavaş bir yöntemdir; ciddi hesapta işe yaramaz.",
      truth:
        "Tek boyutta gerçekten yavaştır: çeyrek çemberde n = 10<sup>4</sup>'te standart hatası yamuk hatasının 7.59·10<sup>3</sup> katıdır. Ama σ/√N'deki 1/√N hızı boyuta bağlı değildir; ızgaranın N<sup>−p/d</sup> hızı ise boyutla bozulur. 10<sup>6</sup> değer bütçesiyle sayfada Monte Carlo d = 5'ten itibaren yamuğu, d = 9'dan itibaren Simpson'ı geçer. Yüksek boyutlu integraller bu yüzden çoğunlukla Monte Carlo ve türevleriyle hesaplanır.",
    },
  ],
  glossary: [
    { term: "Riemann toplamı", definition: "Aralığı dilimlere bölüp her dilimden seçilen bir noktadaki f değeriyle dilim genişliğinin çarpımlarını toplayan yaklaşık değer." },
    { term: "Üst ve alt (Darboux) toplam", definition: "Her dilimde f'nin en büyük (üst) ya da en küçük (alt) değeriyle kurulan toplamlar; her Riemann toplamı ikisinin arasında kalır." },
    { term: "Yakınsama mertebesi (p)", definition: "Hatanın Δx<sup>p</sup> ile, yani 1/n<sup>p</sup> ile orantılı küçülmesi; log–log grafikte eğimin −p olması demektir." },
    { term: "Simpson kuralı", definition: "Dilimleri ikişer ikişer parabolle kapatan kural, S<sub>n</sub> = (Δx/3)[f<sub>0</sub> + 4f<sub>1</sub> + 2f<sub>2</sub> + … + 4f<sub>n−1</sub> + f<sub>n</sub>], n çift; düzgün f'de hatası Δx⁴ ile küçülür." },
    { term: "Euler–Maclaurin formülü", definition: "Yamuk toplamı ile integral arasındaki farkı Δx'in çift kuvvetleri ve uçlardaki türev farkları cinsinden veren açılım." },
    { term: "Richardson ekstrapolasyonu", definition: "Hatanın biçimi biliniyorsa iki farklı adımla bulunan sonuçları birleştirip öncü hata terimini silme yöntemi; ör. (4T<sub>2n</sub> − T<sub>n</sub>)/3." },
    { term: "Monte Carlo integrasyonu", definition: "İntegrali rastgele noktalardaki fonksiyon değerlerinin ortalamasıyla tahmin eden yöntem; standart hatası σ/√n'dir ve bu 1/√n hızı boyuta bağlı değildir." },
    { term: "Boyut laneti", definition: "Izgara tabanlı yöntemlerin maliyetinin boyutla üstel büyümesi: d boyutta eksen başına m nokta, m<sup>d</sup> fonksiyon değeri demektir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede integral ters türevle hesaplanır; üniversitede önce var olup olmadığı sorulur. <strong>Analiz I–II</strong> (Kalkülüs) derslerinde Riemann ve Darboux toplamlarıyla integrallenebilirlik ispatlanır: sürekli ve monoton fonksiyonlar integrallenebilir, sınırlı bir fonksiyondaki sonlu sayıda sıçrama zarar vermez. <strong>Gerçel Analiz</strong> dersinde Riemann integralinin sınırları görülür ve Henri Lebesgue'in ölçüye dayanan integrali gelir: dilimleme x ekseninden değer eksenine taşınır, limit ile integralin yer değiştirmesi güçlü teoremlerle güvenceye kavuşur. <strong>Sayısal Analiz</strong> bu sayfanın yaptığını sistemleştirir: Newton–Cotes kuralları ve hata sınırları, Euler–Maclaurin ve Romberg, n noktayla 2n − 1'inci dereceye kadar tam olan <strong>Gauss kuadratürü</strong> ve hatayı tahmin edip dilimleri yalnız gereken yerde incelten <strong>uyarlamalı integrasyon</strong>. Bilimsel hesap kütüphanelerindeki integral fonksiyonlarının birçoğu (ör. QUADPACK tabanlı olanlar) uyarlamalı Gauss–Kronrod kuralları kullanır.",
      "Monte Carlo'nun devamı <strong>Olasılık ve İstatistik</strong> ile <strong>Hesaplamalı Fizik</strong> derslerindedir. Merkezi limit teoremi ±σ/√n'nin neden bir güven aralığı olduğunu açıklar; <strong>önem örneklemesi</strong> noktaları f'nin büyük olduğu yerlere yığarak σ'yı küçültür. <strong>Quasi-Monte Carlo</strong> rastgele sayılar yerine Halton ve Sobol gibi düşük tutarsızlıklı diziler kullanır; düzgün integrandlarda hata, log çarpanlarıyla birlikte N<sup>−1</sup>'e yaklaşabilir. <strong>Markov zinciri Monte Carlo</strong> (1953'te yayımlanan Metropolis algoritması ve torunları) doğrudan örneklenemeyen dağılımlardan örnek çeker; istatistiksel fizikte, Bayesçi istatistikte ve kafes kuantum renk dinamiğinde integral hesaplamanın ana yoludur. Sayfanın log–log grafiğinde yaptığın şey (hata ∝ n<sup>−p</sup> varsay, eğimi ölç, kuramla karşılaştır) bu derslerin hepsinde bir yöntemi sınamanın ilk adımıdır.",
    ],
    topics: [
      "Darboux ölçütü ve integrallenebilirlik",
      "Lebesgue integrali",
      "Newton–Cotes ve Gauss kuadratürü",
      "Uyarlamalı integrasyon",
      "Euler–Maclaurin ve Romberg",
      "Merkezi limit teoremi",
      "Quasi-Monte Carlo",
      "Markov zinciri Monte Carlo",
    ],
  },
  quiz: [
    {
      question:
        "Düzgün bir fonksiyonda bir integral kuralının hatası n = 100'de 4.0·10<sup>−8</sup>, n = 200'de 2.5·10<sup>−9</sup> ölçülüyor. Kuralın mertebesi kaçtır, hangi kural olabilir?",
      options: ["p = 1: sol uç", "p = 2: yamuk", "p = 4: Simpson", "p = 1/2: Monte Carlo"],
      answer: 2,
      explanation:
        "Oran 4.0·10<sup>−8</sup> / 2.5·10<sup>−9</sup> = 16 = 2⁴. n iki katına çıkınca hata 2<sup>p</sup> kat küçülür, demek ki p = 4; log–log grafikte eğim −4 olur. Yamukta hata 4 kat, sol uçta 2 kat inerdi. Monte Carlo'nun hatası rastgeledir ve ortalamada yalnız √2 kat iner.",
    },
    {
      question:
        "Monte Carlo ile n = 10<sup>4</sup> örnekte standart hata 0.0022. Aynı integrali 10 kat küçük standart hatayla (0.00022) hesaplamak için yaklaşık kaç örnek gerekir?",
      options: ["10<sup>5</sup>", "10<sup>6</sup>", "10<sup>8</sup>", "2·10<sup>4</sup>"],
      answer: 1,
      explanation:
        "Standart hata σ/√n'dir: 10 kat küçültmek için √n'yi 10 kat, n'yi 100 kat büyütmek gerekir, yani 10<sup>6</sup>. Sayfada n = 10<sup>5</sup>'te (10 kat örnek) kuramsal hata yalnız √10 ≈ 3.2 kat iner: 0.00223'ten 0.000706'ya. Düzgün bir fonksiyonda yamuk kuralı aynı kazancı n'yi √10 ≈ 3.2 katına çıkararak sağlardı (hata 1/n²); x = 1'de dikey teğeti olan çeyrek çemberde bile 10<sup>2/3</sup> ≈ 4.6 kat yeter.",
    },
    {
      question:
        "√(1 − x²)'yi [0, 1]'de Simpson kuralıyla integralliyorsun. n'yi 100'den 400'e çıkarırsan hata yaklaşık kaç kat küçülür?",
      options: ["256 kat", "16 kat", "8 kat", "4 kat"],
      answer: 2,
      explanation:
        "x = 1'deki dikey teğet Simpson'ın Δx⁴ mertebesini Δx<sup>3/2</sup>'ye düşürür: dört kat n, 4<sup>3/2</sup> = 8 kat küçük hata demektir. Düzgün bir fonksiyonda 4⁴ = 256 kat beklerdin. Toplamlar'da dene: Simpson'ın hatası n = 100'de −0.000115, n = 400'de −1.44·10<sup>−5</sup>. Hata ve yakınsama hızı sekmesi de çeyrek çemberde Simpson için −4 değil −1.50 eğimi ölçer.",
    },
  ],
  next: [
    { href: "integral.html", title: "İntegral: Birikim, Temel Teorem ve Uygulamalar", why: "Toplamların vardığı yer: imleci sürüklerken biriken işaretli alan, eğimi f(x) olan birikim fonksiyonu ve kalkülüsün temel teoremi; ardından hacimler ve has olmayan integraller." },
    { href: "taylor-serisi.html", title: "Taylor Serisi", why: "Bu sayfadaki hata terimlerinin kaynağı: bir dilimde f'yi Taylor polinomuyla açınca Δx, Δx², Δx⁴ kuvvetleri ortaya çıkar; Lagrange kalanı hata sınırını verir." },
    { href: "normal-dagilim.html", title: "Normal Dağılım", why: "Monte Carlo tahmini bir örneklem ortalamasıdır: merkezi limit teoremi hatanın neden çan eğrisine uyduğunu ve ±σ/√n'nin ne sıklıkla ıskaladığını gösterir." },
    { href: "sayisal-analiz.html", title: "Sayısal Analiz: Kök Bulma, Kayan Nokta, Sayısal Türev ve İntegral", why: "Toplamların hatası nasıl ölçülür? Yamuk, Simpson ve Gauss kurallarının mertebesi, kayan nokta yuvarlaması ve Runge olgusu ölçülerek incelenir." },
  ],
  sources: [
    { title: "OpenStax · Calculus Vol. 2, 3.6 Numerical Integration", url: "https://openstax.org/books/calculus-volume-2/pages/3-6-numerical-integration", note: "Orta nokta, yamuk ve Simpson kuralları, hata sınırları ve çözümlü örnekler (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Euler–Maclaurin formula", url: "https://en.wikipedia.org/wiki/Euler%E2%80%93Maclaurin_formula", note: "Yamuk toplamı ile integral arasındaki farkın Bernoulli sayılarıyla açılımı, kalan terimi ve Euler'in 1735'teki 20 basamaklı Basel hesabı (İngilizce)." },
    { title: "Wikipedia · Monte Carlo integration", url: "https://en.wikipedia.org/wiki/Monte_Carlo_integration", note: "Ortalama değer tahmini, σ/√N hata, önem örneklemesi ve tabakalı örnekleme (İngilizce)." },
    { title: "Wikipedia · Buffon's needle problem", url: "https://en.wikipedia.org/wiki/Buffon%27s_needle_problem", note: "Buffon'un 1733'te sorup 1777'de yayımladığı iğne problemi ve Lazzarini'nin 1901 'deneyinin' çözümlemesi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
