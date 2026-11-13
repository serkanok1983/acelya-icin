window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tek-sayi-toplam4"] = {
  slug: "tek-sayi-toplam4",
  title: "Farklar ve Toplamlar: İki Yönde Hesap",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Karelerin arasından tek sayıları çıkar; işaretli terimleri eşleştir ve aynı tek sayıları bir integralde bul. Sonlu fark ile türevi, tam eşitlik ile yaklaşımı ayır.",
  hook: "Çarpma yapmadan 16'dan sonraki kareyi bulabilir misin? Önceki artış 7'ydi; ona 2 ekle, çıkan 9'u da 16'ya ekle. 25 hazır. Kareleri üreten bu küçük düzen, bir eğrinin altındaki alan hesabına kadar uzanır.",
  bigIdea: "Fark almak bir toplamın artışlarını ortaya çıkarır; bu artışları doğru indis ve ağırlıklarla yeniden toplamak, ayrık hesabı integrale bağlar.",
  story: [
    "Charles Babbage, 1821'de polinom değerlerini otomatik hesaplayıp tabloya yazacak bir Fark Makinesi üzerinde çalışmaya başladı. Temel fikir, mekanik olarak zor olan çarpma ve bölme yerine ardışık toplamalar kullanmaktı. Sayfadaki kareler tablosu bunun küçük bir örneğidir: ikinci fark 2 olarak sabit tutulur, bu sayı ilk farka, yeni ilk fark da önceki kareye eklenir. Böylece 16 → 25 → 36 ilerleyişi için 5² ve 6²'yi yeniden çarpmak gerekmez.",
    "Babbage, 1847–1849 arasında geliştirdiği Fark Makinesi No. 2 tasarımında yedinci dereceye kadar polinomları, 31 basamaklı sayılarla tablolamayı hedefledi. Büyük tasarımları yaşamı boyunca bütünüyle kurulmadı; tamamlananlar kısmi düzenekler ve deneme modelleriydi. Buradaki önemli matematik, sayıları azaltan bir kestirme değil, aynı işlemi farklı biçimde örgütlemektir: polinomun yeterli başlangıç farkları biliniyorsa sonraki değerler yalnız toplamayla üretilebilir.",
    "Şimdi tabloyu öteki yönden oku. 0, 1, 4, 9, 16 dizisindeki artışlar 1, 3, 5, 7'dir. Farkları toplamak başlangıç değerinden son değere götürür. Üçüncü deneyde aynı tek sayılar yeniden görünür; fakat bu kez her birinin önünde daralan dikdörtgenlerden gelen h² çarpanı vardır. 1+3+… toplamı büyürken h² küçülür. Bir ayrık özdeşlik, bu iki değişimin birlikte izlendiği yerde integral hesabına dönüşür.",
  ],
  core: [
    {
      heading: "Aynı noktada iki farklı artış",
      body: "Sₙ = n² dizisinde n = 4'e soldan gelirken 16 − 9 = 7, sağa giderken 25 − 16 = 9 eklenir. Geri fark ile ileri fark bu yüzden aynı sayı değildir. İkinci ileri fark, ardışık ileri farkların farkıdır: 11 − 9 = 2. İşlemin başlangıç indisini korursan Δ²Sₙ = Sₙ₊₂ − 2Sₙ₊₁ + Sₙ çıkar. Buradaki adım 1'dir; sonlu farkı doğrudan türev sanmamalısın. Örneğin x²'nin x=4'teki türevi 8'dir, iki karttan hiçbiri 8 değildir.",
      formula: "∇Sₙ = Sₙ − Sₙ₋₁ = 2n − 1<br>ΔSₙ = Sₙ₊₁ − Sₙ = 2n + 1<br>Δ²Sₙ = 2",
      formulaNote: "İlk formül n ≥ 1 için; dizi n ≥ 0'da tanımlıdır. Tablo sonundaki çizgi ise gereken komşunun gösterilen veri penceresinde bulunmadığını belirtir.",
    },
    {
      heading: "Aradaki terimler birbirini götürür",
      body: "(S₁−S₀)+(S₂−S₁)+…+(Sₙ−Sₙ₋₁) yazıldığında her iç değer bir kez artı, bir kez eksi görünür. Geriye Sₙ−S₀ kalır. Bu teleskopik toplam, verilen kare dizisi için tek sayı özdeşliğinin genel gerekçesidir. İleri fark kullanırsan başlangıç indisi değişir: k=0'dan n−1'e kadar toplamalısın. Küplerde aynı işlem geçerlidir, fakat eklenenler 2k−1 değil, 3k²−3k+1 olur.",
      formula: "∑<sub>k=1</sub><sup>n</sup> ∇Sₖ = Sₙ − S₀ = ∑<sub>k=0</sub><sup>n−1</sup> ΔSₖ<br>Sₙ = n² için: ∑<sub>k=1</sub><sup>n</sup>(2k−1) = n²",
      formulaNote: "S₀=0. Sonlu örneklerin eşit çıkması tek başına bütün indisleri kanıtlamaz; burada genel sonuç cebirsel sadeleşmeden gelir.",
    },
    {
      heading: "Eşleme neden toplamın iki katını verir?",
      body: "Aritmetik dizide aₖ = a+(k−1)d olsun. Bir kopyayı ileri, ötekini geri yaz: aₖ+aₙ₊₁₋ₖ = 2a+(n−1)d, k'dan bağımsızdır. n satırın toplamı iki kopyayı, yani 2Sₙ'yi sayar. Bu gerekçe n tekken de çalışır: ortadaki terim iki kopyadan birer kez alınır. a ve d negatif olabilir; cebir değişmez. Çubukların sıfırın altındaki kısmı işaretli sayı katkısıdır, pozitif bir alan ölçüsü değildir.",
      formula: "2Sₙ = n[2a+(n−1)d]<br>Sₙ = na + d·n(n−1)/2",
      formulaNote: "Boş toplam n=0'da 0'dır. Ancak son terim, eşlenik çift ve Sₙ/n ortalaması yoktur; ortalamayı 0 diye dolduramayız.",
    },
    {
      heading: "Tek sayıların önüne neden h² gelir?",
      body: "[0,L] aralığını n eşit parçaya böl: genişlik h=L/n. k'ncı parçanın orta noktası xₖ*=(k−½)h'dir. f(x)=2x için buradaki yükseklik (2k−1)h, dikdörtgenin katkısı ise bu yüksekliğin h ile çarpımıdır. Böylece Mₙ=h²(1+3+…+2n−1)=h²n²=L² çıkar. Bu fonksiyonda orta nokta toplamı her n için analitik integrale eşittir; n arttığı için doğru hâle gelmesi gerekmez.",
      formula: "Mₙ = h∑<sub>k=1</sub><sup>n</sup> f((k−½)h)<br>f(x)=2x için: Mₙ = h²n² = L² = ∫₀ᴸ 2x dx",
      formulaNote: "L sabitken n'yi değiştirince h de değişir. Sayfadaki x ve f(x) boyutsuzdur; dikdörtgen katkıları da boyutsuzdur.",
    },
    {
      heading: "Bir karşıörnek yöntemin sınırını gösterir",
      body: "f(x)=x² seçilince orta nokta toplamı artık sonlu n'de tam değildir. Eğri dışbükeydir: her alt aralığın ortasındaki değer, o aralıktaki ortalama yükseklikten küçüktür. Toplam bu yüzden integrali eksik hesaplar. Burada hata cebirle tam bulunabilir: Mₙ−I=−L³/(12n²). Sabit L'de n iki katına çıkınca bu hata dörtte bire iner. Sol ve sağ uç toplamları da hesaplanır; bu iki artan fonksiyonda integralin alt ve üst tarafında kalırlar.",
      formula: "f(x)=x²: I=L³/3<br>Mₙ=L³(4n²−1)/(12n²)<br>Mₙ−I=−L³/(12n²)",
      formulaNote: "Bu kapalı hata ifadesi x² ve eş bölüntü içindir. Kartlardaki kayan nokta farkını, bütün fonksiyonlar için geçerli bir kesin hata sınırı sayma.",
    },
  ],
  lab: {
    intro: "Üç sekmenin ayarları ve sıfırlaması bağımsızdır; bekleyen animasyon yoktur. Farklar ve aritmetik dizi sekmelerindeki sınırlı tam sayılar kesin hesaplanır. İntegral sekmesinde gerçek örnek yükseklikleri h ile çarpılıp toplanır; ondalık sonuçlar yuvarlanır. Çizilen yöntemi değiştirmek üç toplamın sayısını değiştirmez, yalnız dikdörtgenleri ve seçili hata kartını değiştirir.",
    experiments: [
      {
        title: "7 mi, 9 mu? Farkın yönünü izle",
        predict: "S₄=16 iken geri ve ileri artış aynı mı olmalı? Karelerden küplere geçince ikinci fark yine sabit kalır mı?",
        do: "01 · Farkları oku sekmesinde Farkları sıfırla'ya bas: Son tablo indisi N=8, İncelenen indis n=4. Kartları oku; Dizi kuralı'nı Sₙ=n³ · küpler yap. Ardından Başlangıç: n=0 düğmesine bas.",
        observe: "Karelerde S₄=16, geri fark 7, ileri fark 9, ikinci fark 2. Küplerde aynı indis için 64; 37; 61; 30 görülür. Küp ikinci farkları n=0…6 boyunca 6,12,18,24,30,36,42'dir. n=0'da geri fark çizgi, ileri fark 1, küp ikinci farkı 6 olur.",
        explain: "Karelerde (n+1)²−n²=2n+1; bunu bir kez daha farklayınca 2 kalır. Küplerde Δ²(n³)=6n+6 olduğundan yatay bir çizgi beklenmez. n=0 geri farkı S₋₁ gerektirir; bu dizinin tanım alanı n≥0 olduğu için kartta değer yoktur.",
      },
      {
        title: "Sıfır toplam, boş toplam değildir",
        predict: "Yedi terimin toplamı 0 olabilir mi? Bu durumda ortalama ile hiç terim bulunmayan durumun ortalaması aynı mı olur?",
        do: "02 · Terimleri eşleştir sekmesinde Diziyi sıfırla'ya bas. Tabloyu oku; ardından Artılar ve eksiler düğmesine bas. Son olarak Boş toplam'ı seç ve kartları karşılaştır.",
        observe: "Varsayılanda 1,3,5,7,9,11,13 toplamı 49; her çift 14, çift tablosu toplamı 98, ortalama 7,0'dır. Artılar ve eksiler ile 6,4,2,0,−2,−4,−6 gelir: pozitif katkı 12, negatif −12, net 0; ortalama 0,0. Boş toplamda toplam yine 0, fakat ortalama, son terim ve çift kartları çizgidir.",
        explain: "Yedi terim varken ortalama 0/7=0 tanımlıdır. Hiç terim yokken 0/0 tanımlı değildir. Çift tablosunda n satır bulunur ve her terim iki kez sayılır; 98'i 49 yerine kullanmak toplamı iki katına çıkarır. İşaretler birbirini götürebilir, terimleri yok etmez.",
      },
      {
        title: "Dört dikdörtgen tam alanı bulabilir mi?",
        predict: "f(x)=2x için [0,2]'de yalnız dört orta nokta dikdörtgeni eksik mi, fazla mı, tam mı sonuç verir? n'yi ikiye katlamak alanı değiştirir mi?",
        do: "03 · İntegrale yaklaş sekmesinde İntegrali sıfırla'ya bas: f(x)=2x, L=2, n=4, Orta nokta. Çizilen dikdörtgenler menüsünden Sol uç ve Sağ uç'u da seç. Orta nokta'ya dönüp Aralık sayısını ikiye katla'ya bas.",
        observe: "n=4'te h=0,5; sol toplam 3, orta 4, sağ 5, integral 4'tür. Seçili hatalar sırayla −1, 0, +1 olur. Orta katkılar 0,25;0,75;1,25;1,75'tir. n=8'de h=0,25; sol 3,5, orta 4, sağ 4,5 görünür. İntegral değişmez.",
        explain: "Dört katkı h²×(1,3,5,7)'dir: (1/4)×16=4. Sekiz aralıkta tek sayılar toplamı 64'e çıkar, fakat h²=1/16 olur; sonuç yine 4'tür. Doğrusal fonksiyonda orta yükseklik, her aralığın ortalama yüksekliğidir. Bu tamlık yalnız grafiğin güzel görünmesine dayanmıyor.",
      },
      {
        title: "Aynı dört dikdörtgen bu kez yanılıyor",
        predict: "Fonksiyonu x² yaptığında orta nokta toplamı hâlâ tam kalır mı? n iki kat olunca hatanın büyüklüğü ikiye mi, dörde mi bölünür?",
        do: "İntegrali sıfırla'ya bas; Fonksiyon menüsünden f(x)=x² · karşıörnek seç. L=2, n=4 ve Orta nokta kalsın. Sonuçları kaydet; Aralık sayısını ikiye katla'ya bir kez bas.",
        observe: "n=4: sol 1,750000; orta 2,625000; sağ 3,750000; integral 2,666667. Seçili hata −0,04166667. n=8: sol 2,187500; orta 2,656250; sağ 3,187500; hata −0,01041667. Orta nokta eksik hesaplar, hata büyüklüğü dörtte bire iner.",
        explain: "L=2 için Mₙ−I=−2/(3n²). n=4'te −1/24, n=8'de −1/96 elde edilir. Buradaki hata oranı yuvarlanmış kartları bölerek tahmin edilmek zorunda değildir; kapalı ifade tam oranı verir. Orta noktanın doğrusal fonksiyondaki kesinliği, eğriye genellenemez.",
      },
    ],
  },
  wow: [
    {
      title: "Yedi fark sütunu, 31 basamak",
      body: "Babbage'ın Fark Makinesi No. 2 tasarımı, yedinci dereceye kadar polinomları 31 basamaklı sayılarla hesaplayabilecek biçimde düzenlenmişti. Uygun başlangıç geri farklarıyla, sabit yedinci fark altıncı farka; güncellenen altıncı fark beşinciye eklenir ve değer sütununa kadar ilerlenir. Sayfanın kareler için kullandığı sabit 2, aynı fikrin ikinci derecedeki örneğidir. Bu mekanizma genel amaçlı bir bilgisayarın bütün işlemleriyle aynı şey değildir.",
    },
    {
      title: "Dokuz doğru nokta, yanlış devamı dışlamaz",
      body: "0'dan 8'e kadar bütün kareleri bildiğini düşün. P(n)=n²+n(n−1)…(n−8) polinomu bu dokuz indiste n² ile aynıdır; çünkü çarpımın bir çarpanı sıfırdır. Ama n=9'da P(9)=81+9!=362961 olur. Sonlu bir tablo, sonraki değeri tek başına zorunlu kılmaz. Laboratuvarda n² veya n³ kuralının baştan verilmesi bu belirsizliği kaldırır.",
    },
    {
      title: "İki eksik toplamdan tam sonuç",
      body: "x² için orta nokta hatası tam olarak −C/n² biçimindedir. Bu yüzden (4M₂ₙ−Mₙ)/3 birleşiminde hata terimleri birbirini götürür. L=2'de tablodan M₄=2,625 ve M₈=2,65625 al: (4×2,65625−2,625)/3=8/3. Bu, Richardson ekstrapolasyonunun basit bir örneğidir. x²'de cebirsel olarak tamdır; genel bir eğride bütün hata terimlerini yok etmez.",
    },
  ],
  worked: {
    title: "Orta nokta hatası 0,001'i geçmesin",
    prompt: "f(x)=x² için [0,2] aralığında eş bölüntülü orta nokta toplamını kur. Hatanın mutlak değerini en çok 0,001 yapan en küçük tam sayı n'yi bul; n=25 ve n=26 ayarlarıyla denetle. x, f(x) ve toplamlar boyutsuzdur.",
    steps: [
      "Genişlik h=L/n, orta örnek xₖ*=(k−½)h. Katkı h(xₖ*)²=h³(k−½)² olduğundan Mₙ=(L³/n³)∑ₖ₌₁ⁿ(k²−k+¼).",
      "∑k=n(n+1)/2 ve ∑k²=n(n+1)(2n+1)/6 kullan. Köşeli toplam n(4n²−1)/12 olur. Dolayısıyla Mₙ=L³(4n²−1)/(12n²)=L³/3−L³/(12n²).",
      "Analitik integral I=∫₀ᴸx²dx=L³/3. L=2 için Mₙ−I=−2/(3n²). |Mₙ−I|≤0,001 koşulu n²≥2000/3, yani n≥√(2000/3)≈25,8199 gerektirir; ilk tam sayı 26'dır.",
      "n=25'te h=0,08, orta toplam 2,665600; hata −0,00106667, hedefi aşar. n=26'da h≈0,07692308, orta toplam 2,665680; hata −0,00098619, hedefi sağlar. Ekrandaki integral her ikisinde 2,666667'ye yuvarlanır.",
      "Sayfada İntegrali sıfırla, f(x)=x² seç, L=2 ve Orta nokta'yı koru; Alt aralık sayısı'nı önce 25, sonra 26 yap. Seçili toplam − integral kartını oku. Hesaptaki en küçüklük gerekçesi, 1/n²'nin pozitif n'de azalmasıdır; yalnız iki kartın görünüşü değildir.",
    ],
    result: "En küçük n=26. Kuramsal orta nokta hatasının büyüklüğü 1/1014≈0,000986193'tür. Bu, seçilen x² modelinin kesim hatasıdır; bütün bilgisayar yuvarlama hataları için bir sertifika değildir.",
  },
  misconceptions: [
    { myth: "Karelerin artışı 2n−1'dir; ileri fark kartında da bu çıkmalı.", truth: "2n−1, n−1'den n'ye gelen geri farktır. n'den n+1'e giden ileri fark 2n+1'dir. Aynı tek sayıları toplamak için geri farkta k=1…n, ileri farkta k=0…n−1 kullanılır." },
    { myth: "Sonlu tabloda ikinci fark sabitse dizinin sonsuz devamı kesinlikle karedir.", truth: "Bu sonuç yalnız gözlenen satırlar için geçerlidir; aynı sonlu veriye uyan başka devamlar vardır. Baştan ikinci derece polinom olduğu verilirse sabit ikinci fark o yapıyla ilişkilidir. Sayfada kural verilmiştir; cebirsel açılım genel sonucu sağlar." },
    { myth: "Toplam 0 ise terim yoktur ve ortalama da her durumda 0'dır.", truth: "6,4,2,0,−2,−4,−6 dizisinin yedi terimi vardır; toplam ve ortalama 0'dır. Boş toplamda ise hiç terim bulunmaz: toplam 0 kabul edilir, fakat 0/0 ortalaması tanımsızdır." },
    { myth: "Orta nokta yönteminde dikdörtgenler eğrinin iki tarafını dengeler, sonuç hep tamdır.", truth: "Doğrusal fonksiyonlarda eşitlik vardır. x² karşıörneğinde orta toplam her sonlu n için eksiktir; hata −L³/(12n²). Daha çok dikdörtgen bu hatayı küçültür, sıfıra yuvarlanan bir kart ise tek başına tamlık kanıtı değildir." },
  ],
  glossary: [
    { term: "İndis", definition: "Bir dizideki konumu belirten tam sayı. Bu sayfada n incelenen konum veya terim sayısı, k toplam içindeki dolaşan indistir; bağlamı kontrol etmek gerekir." },
    { term: "İleri ve geri fark", definition: "İleri fark Sₙ₊₁−Sₙ, geri fark Sₙ−Sₙ₋₁. Aynı noktada farklı komşuları kullanırlar; burada adım 1'dir." },
    { term: "İkinci ileri fark", definition: "İleri farkların ileri farkı: Sₙ₊₂−2Sₙ₊₁+Sₙ. Karelerde 2, küplerde 6n+6'dır." },
    { term: "Teleskopik toplam", definition: "Ara terimlerin artı ve eksi olarak birbirini götürmesiyle yalnız uç değerlerin kaldığı toplam." },
    { term: "Aritmetik dizi", definition: "Ardışık terimleri arasındaki farkı sabit olan dizi: aₖ=a+(k−1)d. Ortak fark pozitif, sıfır veya negatif olabilir." },
    { term: "Riemann toplamı", definition: "Bir aralığın alt parçalarında seçilen fonksiyon değerlerini parça genişlikleriyle çarpıp toplama; uygun limit belirli integrali verir." },
    { term: "Orta nokta yöntemi", definition: "Her alt aralıktaki örneği o aralığın ortasından seçen integral yaklaşımı. Doğrusal fonksiyonlar için tamdır; genel eğrilerde hata bırakır." },
    { term: "Ekstrapolasyon", definition: "Farklı adım boylarıyla bulunan sonuçları hata yapısını kullanarak birleştirme. Buradaki x² örneğinde (4M₂ₙ−Mₙ)/3, n⁻² hata terimini yok ederek integrali verir." },
  ],
  bridge: {
    heading: "Ayrık kalkülüsten sayısal integrasyona",
    body: [
      "Ayrık Matematik dersinde fark ve toplam işlemleri, türev ve integralin ayrık akrabaları olarak incelenir. ∑<sub>k=0</sub><sup>n−1</sup>ΔSₖ=Sₙ−S₀, ayrık temel teorem fikridir. Genel adım h ile Δₕf(x)=f(x+h)−f(x); türeve yaklaşan ifade farkın kendisi değil Δₕf(x)/h'dir. Polinomlarda fark almak dereceyi düşürür. Newton enterpolasyonu, bir polinomu fark tablosundan yeniden kurmak için uygun bir baz kullanır: n²=n+2·n(n−1)/2. İlk iki deney bu dili somut sayılarla başlatır.",
      "Kalkülüs I ve Sayısal Analiz derslerinde genişliklerle ağırlıklandırılmış toplamların limitine ve hatasına geçersin. Sürekli bir fonksiyon için eş bölüntüde n→∞, h=L/n→0 demektir; düzensiz bölüntülerde ise yalnız parça sayısını artırmak yetmez, en büyük parçanın genişliği de sıfıra gitmelidir. Orta nokta yönteminin ikinci mertebe davranışı, adımı yarılayınca baskın hatanın yaklaşık dörtte bire inmesini açıklar. Bu sayfadaki x² özel durumunda hata formülü tamdır; genel eğrilerde düzgünlük, hata terimleri ve kayan nokta etkileri ayrıca değerlendirilir.",
    ],
    topics: ["Sonlu farklar", "Teleskopik toplamlar", "Newton enterpolasyonu", "Riemann integrali", "Sayısal integral hatası", "Richardson ekstrapolasyonu"],
  },
  quiz: [
    {
      question: "Sₙ=n² için n=4'te ileri fark ΔS₄ hangisidir?",
      options: ["7; çünkü 16−9=7", "8; çünkü x²'nin türevi 2x'tir", "9; çünkü 25−16=9", "2; çünkü ikinci fark sabittir"],
      answer: 2,
      explanation: "İleri fark sağ komşuyu kullanır: S₅−S₄=25−16=9. 7 geri fark, 2 ikinci ileri farktır. Türev olan 8 ise sonlu birim adımla aynı işlem değildir.",
    },
    {
      question: "Yedi tek sayının eşleme tablosunda her satır 14 ediyor. Neden toplam 7×14=98 değil, 49'dur?",
      options: ["Ortadaki 7 tamamen atılmalıdır", "İleri ve ters iki kopya toplanmıştır; 98=2S₇'dir", "Tek sayıda terim varken aritmetik toplam formülü geçersizdir", "Her çiftin toplamı aslında 7'dir"],
      answer: 1,
      explanation: "Yedi satırın her biri bir terimi ters sıradaki terimle eşler. Böylece her özgün terim iki kez sayılır; ortadaki 7 de 7+7 satırında iki kez yer alır. 2S₇=98, dolayısıyla S₇=49.",
    },
    {
      question: "x² için orta nokta hatası −L³/(12n²). Hem L'yi hem n'yi iki katına çıkarırsan hatanın büyüklüğü ne olur?",
      options: ["Dörtte bire iner", "Değişmez", "İki katına çıkar", "Sekiz katına çıkar"],
      answer: 2,
      explanation: "L³ çarpanı 8, n² çarpanı 4 kat olur; oran 8/4=2'dir. Hatanın dörtte bire inmesi n iki katına çıkarılırken L'nin sabit tutulmasına bağlıydı. [0,2], n=4'te hata −1/24; [0,4], n=8'de −1/12'dir.",
    },
  ],
  next: [
    { href: "tek-sayi-toplam3.html", title: "Tek Sayılardan Kareye", why: "Aynı özdeşliği kareye eklenen katmanlar ve tam sayı bütçesiyle incele." },
    { href: "tek-sayi-toplam5.html", title: "Tek Sayılar: Toplamdan Seriye", why: "Tek sayılara geometrik ağırlık ekle; sonlu toplamı sonsuz seri ve kalan hedefinden ayır." },
    { href: "turev.html", title: "Türev", why: "Birim adımlı sonlu farktan, adım küçülürken ortaya çıkan değişim hızına geç." },
    { href: "integral.html", title: "İntegral: Birikim, Temel Teorem ve Uygulamalar", why: "Dikdörtgen toplamı ile integral arasındaki bağı daha geniş bir laboratuvarda sürdür." },
  ],
  sources: [
    { title: "Computer History Museum · The Engines", url: "https://www.computerhistory.org/babbage/engines/", note: "Babbage'ın 1821 başlangıcı, yalnız toplamaya dayanan fark makineleri, 1847–1849 No. 2 tasarımı ve yaşamında yalnız kısmi düzeneklerin tamamlanması." },
    { title: "A. F. Pixley · Topics in Discrete Mathematics", url: "https://math.hmc.edu/pixley/wp-content/uploads/sites/16/2019/10/Topics_in_Discrete_Math.pdf", note: "Harvey Mudd College ders notları; §3.1–3.2 sonlu farklar, polinom derece düşmesi, Newton enterpolasyonu ve toplam hesabı." },
    { title: "OpenStax · Algebra and Trigonometry 2e, §13.4", url: "https://openstax.org/books/algebra-and-trigonometry-2e/pages/13-4-series-and-their-notations", note: "Sigma gösterimi, aritmetik toplamın ters sıra eşlemesiyle türetilmesi ve işaretli terimler." },
    { title: "OpenStax · Calculus 1, §5.2 The Definite Integral", url: "https://openstax.org/books/calculus-volume-1/pages/5-2-the-definite-integral", note: "Riemann toplamının limiti, [0,2]'de x² örneği ve düzensiz bölüntüde en büyük aralığın küçülmesi gereği. Orta nokta hata formülü burada doğrudan toplamdan türetildi." },
  ],
  revision: "Kasım 2026",
};
