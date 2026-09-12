/**
 * Açelya — çekirdek konular için üniversiteye uzanan araştırma rehberleri.
 * Genel alan rehberinin üzerine uygulanır; sayfa içeriğini tekrar etmez,
 * örnek, kanıt, model sınırı ve ölçme sorusuyla derinleştirir.
 */
(function exposeTopicStudyGuides(root) {
  "use strict";

  root.AcelyaTopicStudyGuides = {
    turev: {
      concepts: [
        ["Anlık değişim hızı", "Bir niceliğin başka bir niceliğe göre belirli bir andaki değişim oranı."],
        ["Limit", "Girdi bir değere yaklaşırken fonksiyon değerinin yaklaştığı değer."],
        ["Yerel doğrusallaştırma", "Bir fonksiyonu seçilen noktanın çok yakınında teğet doğrusu ile yaklaşık ifade etme."],
      ],
      objective: "Türevi limit tanımından hesaplamak; işaretini, birimini ve grafikteki yerel eğimi aynı açıklamada birleştirmek.",
      prerequisite: "Fonksiyon değeri, doğru eğimi, cebirsel çarpanlara ayırma ve bir değişkenin bir değere yaklaşması fikri.",
      why: "Türev yalnızca bir işlem kuralı değil, değişimin yerel dilidir. Bir modelin o andaki eğilimini ve küçük bir girdinin çıktıyı yaklaşık ne kadar değiştireceğini söyler.",
      realWorld: "Hız ve ivme, marjinal maliyet, salgın büyüme hızı, sinyal eğimi ve makine öğrenmesindeki optimizasyon türevle ifade edilir; türevin birimi ‘çıktı birimi / girdi birimi’dir.",
      example: {
        title: "Limitten türev: f(x) = x²",
        prompt: "f(x)=x² fonksiyonunun x=2 noktasındaki türevini fark oranıyla bul.",
        steps: [
          "Ortalama değişim oranını yaz: [f(2+h)−f(2)]/h = [(2+h)²−4]/h.",
          "Payı açıp sadeleştir: (4+4h+h²−4)/h = 4+h; burada h sıfır değilken sadeleştirme yapılır.",
          "h sıfıra yaklaşırken 4+h değeri 4'e yaklaşır. Bu yüzden f′(2)=4'tür.",
        ],
        result: "x saniye, f(x) metre olsaydı sonuç 4 m/s olurdu. Türev sayı kadar birim ve bağlam da taşır.",
      },
      experiment: {
        question: "x² grafiğinde sekant eğimi teğet eğimine nasıl yaklaşır?",
        steps: [
          "Fonksiyon olarak x²'yi seç ve x noktasını önce −2, sonra 0, sonra 2 yap; teğetin yönünü kaydet.",
          "Her noktada ikinci noktayı yaklaştırarak fark oranının kararlılaştığı değeri gözle.",
          "Eğimleri f′(x)=2x beklentisiyle karşılaştır; işaretin grafiğin azalma veya artma yönüyle uyumunu denetle.",
        ],
        observe: "x=0'da yatay teğet vardır; fakat her yatay teğet maksimum ya da minimum olmak zorunda değildir.",
      },
      evidence: {
        claim: "Türev, uygun koşullarda fonksiyonun bir noktadaki en iyi doğrusal yaklaşımını verir.",
        evidence: "Yakın iki noktanın sekant eğimleri tek bir limite yaklaşıyorsa bu limit teğet eğimini ve anlık değişim hızını tanımlar.",
        boundary: "Köşe, sıçrama veya dik teğet gibi durumlarda sonlu ve iki taraflı türev bulunmayabilir; grafiğin pürüzsüz görünmesi tek başına yeterli değildir.",
      },
      misconception: ["f′(a)=0 ise a noktası mutlaka maksimumdur.", "Türevin fiziksel birimi ve tanım aralığı önemli değildir."],
      modelLimit: "Ekran h değerini gerçekten sıfır yapmaz; sonlu piksel ve sayı hassasiyetiyle limite yaklaşmayı gösterir. Sayısal yakınlık matematiksel ispat değildir.",
      questions: ["Bir fonksiyon artarken türevi anlık olarak sıfır olabilir mi? x³ örneğini incele.", "Eksen ölçeği teğetin görünüşünü değiştirirken türev değeri neden değişmez?", "Türevin birimi yanlış kurulmuş bir modeli nasıl ele verir?"],
      check: {
        question: "f(x)=x² için x=3 noktasındaki anlık değişim hızı kaçtır?",
        options: ["6", "9", "3"],
        answer: 0,
        explanation: "f′(x)=2x olduğundan f′(3)=6'dır; 9 fonksiyon değeridir, türev değildir.",
      },
      sources: [{ label: "OpenStax — Türevin tanımı", url: "https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative" }],
    },

    integral: {
      concepts: [
        ["Belirli integral", "Bir fonksiyonun bir aralıktaki işaretli birikimini veren sayı."],
        ["Riemann toplamı", "Aralığı küçük parçalara bölüp dikdörtgen katkılarını toplayarak integrale yaklaşan toplam."],
        ["Kalkülüsün temel teoremi", "Birikim ile anlık değişim arasındaki türev–integral bağını kuran teorem."],
      ],
      objective: "Belirli integrali işaretli birikim olarak yorumlamak, Riemann toplamıyla yaklaşık hesaplamak ve bir ters türevle kesin değere bağlamak.",
      prerequisite: "Fonksiyon grafiği, dikdörtgen alanı, toplam fikri ve temel türev kuralları.",
      example: {
        title: "Birikim hesabı: ∫₀² 3x² dx",
        prompt: "3x² değişim hızının 0 ile 2 arasındaki toplam birikimini hesapla.",
        steps: ["3x²'nin bir ters türevi x³'tür; çünkü (x³)′=3x².", "Üst ve alt sınır değerlerini çıkar: x³|₀² = 2³−0³.", "Sonucu 8 bul ve grafikte x ekseninin üstündeki alanın pozitif olmasıyla tutarlılığını kontrol et."],
        result: "Belirli integral 8'dir. İntegrandın birimi ‘birim/zaman’ ise integralin birimi ‘birim’ olur.",
      },
      experiment: {
        question: "Riemann toplamı bölme sayısı arttıkça neden kararlılaşır?",
        steps: ["Bir fonksiyon ve [a,b] aralığı seç; n=5 için dikdörtgenlerin taşan ve eksik kalan bölümlerini incele.", "Aynı aralıkta n değerini 20 ve 100 yap; yaklaşık sonuçları kaydet.", "Fonksiyon x eksenini kesiyorsa geometrik alanla işaretli integral arasındaki farkı not et."],
        observe: "Daha çok bölme genellikle yaklaşımı iyileştirir; kullanılan örnekleme kuralı ve fonksiyonun davranışı hatayı etkiler.",
      },
      evidence: {
        claim: "Belirli integral yalnız ‘eğri altındaki alan’ değil, işaretli birikimdir.",
        evidence: "Riemann toplamları bölmeler incelirken ortak bir değere yaklaşır; kalkülüsün temel teoremi bu değeri ters türevle hesaplamayı sağlar.",
        boundary: "x ekseninin altındaki katkılar negatiftir. Belirsiz integral de tek fonksiyon değil, +C içeren bir ters türev ailesidir.",
      },
      misconception: ["Belirli integral her zaman pozitif geometrik alandır.", "Belirsiz integralde sabit terimi yazmamak sonucu değiştirmez."],
      modelLimit: "Sonlu sayıdaki dikdörtgen yaklaşık değer verir; çizimde boşluk görünmemesi limite ulaşıldığı anlamına gelmez.",
      questions: ["Hız grafiğinin işaretli alanı ile alınan yol hangi durumda farklıdır?", "Farklı Riemann toplamları aynı değere neden farklı hızlarda yaklaşır?", "İki ters türev neden yalnız sabit kadar farklı olabilir?"],
      check: {
        question: "Hız grafiği bir süre x ekseninin altındaysa belirli integral neyi verir?",
        options: ["Yönü hesaba katan net yer değiştirmeyi", "Her zaman toplam alınan yolu", "Yalnız en büyük hızı"],
        answer: 0,
        explanation: "Negatif hız katkıları belirli integralde çıkarılır; toplam yol için hızın mutlak değeri integre edilir.",
      },
      sources: [{ label: "OpenStax — Kalkülüsün temel teoremi", url: "https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus" }],
    },

    "normal-dagilim": {
      concepts: [
        ["Ortalama", "Dağılımın merkezini belirleyen beklenen değer."],
        ["Standart sapma", "Değerlerin ortalama çevresindeki yayılımını ölçen nicelik."],
        ["Merkezî limit teoremi", "Uygun koşullarda örneklem ortalamalarının dağılımının örneklem büyüdükçe normal dağılıma yaklaşmasını açıklayan teorem."],
      ],
      objective: "Ortalama ve standart sapmanın çan eğrisini nasıl değiştirdiğini açıklamak; ham veri dağılımı ile örneklem ortalamaları dağılımını ayırmak.",
      prerequisite: "Ortalama, yüzde, histogram, olasılık alanı ve karekök hakkında temel fikir.",
      example: {
        title: "Bir puanı standartlaştırmak",
        prompt: "Ortalaması 70, standart sapması 10 olan bir dağılımda 85 puanın z-skorunu bul.",
        steps: ["Puanın ortalamadan farkını bul: 85−70=15.", "Farkı standart sapmaya böl: z=15/10=1,5.", "Sonucu ‘ortalamanın 1,5 standart sapma üstünde’ diye yorumla; yüzdelik sıra için dağılım modeli de gerekir."],
        result: "z=1,5 boyutsuzdur ve farklı ölçeklerdeki değerleri karşılaştırmayı kolaylaştırır.",
      },
      experiment: {
        question: "μ ve σ eğrinin hangi özelliklerini değiştirir?",
        steps: ["σ=1 sabitken μ'yü −2, 0 ve 2 yap; tepenin konumunu karşılaştır.", "μ=0 sabitken σ'yı 0,5; 1 ve 2 yap; yayılma ile tepe yüksekliğini kaydet.", "Aynı ayarda birkaç kez 1000 örnek çek; histogramların neden özdeş olmadığını açıkla."],
        observe: "μ eğriyi yatay taşır; σ yayılımı değiştirir. Olasılık yoğunluğu eğrisinin toplam alanı 1 kalır.",
      },
      evidence: {
        claim: "Normal dağılım güçlü bir modeldir; ham verinin evrensel biçimi değildir.",
        evidence: "Birçok küçük ve yaklaşık bağımsız etkinin toplamı ile uygun örneklem ortalamaları normal biçime yaklaşabilir.",
        boundary: "Gelir ve bekleme süresi gibi veriler çarpık, kesikli veya ağır kuyruklu olabilir. Normal varsayımı veriyle sınanmalıdır.",
      },
      misconception: ["Merkezî limit teoremi yeterince çok ham verinin mutlaka normal dağılacağını söyler.", "Çan biçiminde görünen her örneklem tam olarak normaldir."],
      modelLimit: "Rastgele üretilen 1000 değer kuramsal eğriyi yaklaşık izler. Örneklem dalgalanması olasılıklı sürecin beklenen parçasıdır.",
      questions: ["Aynı μ ve σ'ya sahip iki dağılım neden farklı biçimde olabilir?", "Aykırı değer ortalama ve standart sapmayı nasıl etkiler?", "%68–95 kuralı hangi varsayım altında kullanılabilir?"],
      check: {
        question: "Merkezî limit teoremi öncelikle hangi dağılımın normale yaklaşmasını açıklar?",
        options: ["Uygun koşullarda örneklem ortalamalarının dağılımının", "Her ham veri kümesinin", "Yalnız tek bir ölçümün"],
        answer: 0,
        explanation: "Teorem ham verinin biçimini değil, örneklem ortalamalarının örnekleme dağılımını konu eder.",
      },
    },

    termodinamik: {
      concepts: [
        ["İç enerji", "Sistemin mikroskobik hareket ve etkileşimleriyle ilişkili toplam durum enerjisi."],
        ["Durum fonksiyonu", "Değişimi yalnız başlangıç ve son denge durumlarına bağlı olan nicelik."],
        ["Entropi", "Enerjinin dağılımı ve erişilebilir mikrodurum sayısıyla ilişkili termodinamik durum fonksiyonu."],
      ],
      objective: "Sistem sınırını ve işaret kuralını seçerek birinci yasayı uygulamak; ikinci yasayı sistem ile çevrenin toplam entropisi üzerinden yorumlamak.",
      prerequisite: "Enerji korunumu, sıcaklık–ısı ayrımı, basınç ve hacim ile Kelvin ölçeği.",
      example: {
        title: "Isı, iş ve iç enerji bilançosu",
        prompt: "Bir gaza 500 J ısı aktarılıyor ve gaz çevresine 200 J iş yapıyorsa iç enerji nasıl değişir?",
        steps: ["Sistemi gaz seç; Q>0 sisteme ısı, W>0 sistemin yaptığı iş olsun.", "Birinci yasayı uygula: ΔU=Q−W=500−200.", "ΔU=+300 J bul; kalan 200 J çevreye iş olarak aktarılmıştır."],
        result: "Gazın iç enerjisi 300 J artar. Başka işaret kuralı kullanılabilir; önemli olan onu tanımlayıp tutarlı uygulamaktır.",
      },
      experiment: {
        question: "İdeal gazda sıcaklık sabitken hacim artarsa basınç nasıl değişir?",
        steps: ["Sıcaklığı 300 K'de tutup başlangıç hacmi ve basıncı kaydet.", "Hacmi iki katına çıkar; parçacık sayısını sabit kabul et.", "PV=nRT bağıntısından basıncın yarıya inmesi beklentisini simülasyonla karşılaştır."],
        observe: "Bu karşılaştırma izotermal ve ideal gaz varsayımına dayanır; sıcaklık da değişirse tek başına ters orantı kullanılamaz.",
      },
      evidence: {
        claim: "İzole bir sistemin toplam entropisi kendiliğinden gerçekleşen süreçlerde azalmaz.",
        evidence: "Makroskobik denge çok daha fazla erişilebilir mikroduruma karşılık gelir; ısı farkları toplam entropiyi artıracak yönde dengelenir.",
        boundary: "Entropiyi yalnız ‘düzensizlik’ diye tanımlamak eksiktir. Bir alt sistemin entropisi, çevrede daha büyük artış varsa azalabilir.",
      },
      misconception: ["İkinci yasa evrendeki her nesnenin entropisinin her an artmasını gerektirir.", "Isı ve sıcaklık aynı niceliktir."],
      modelLimit: "Parçacık animasyonu ideal gaz yaklaşımındadır; moleküller arası kuvvetleri, faz geçişlerini ve gerçek gaz sapmalarını göstermez.",
      questions: ["Buzdolabının içi soğurken oda neden ısınır?", "ΔU aynı kalırken Q ve W neden izlenen yola bağlı olabilir?", "Tersinir süreç neden gerçek süreçler için bir sınır modelidir?"],
      check: {
        question: "Bir alt sistemin entropisi azalabilir mi?",
        options: ["Evet; çevredeki artış daha büyükse izole toplam yine azalmaz", "Hayır; hiçbir koşulda azalmaz", "Yalnız 0 °C'de azalır"],
        answer: 0,
        explanation: "İkinci yasa izole toplam için konur; açık bir alt sistem çevreyle alışveriş yaparak entropisini azaltabilir.",
      },
      sources: [{ label: "OpenStax — Entropi", url: "https://openstax.org/books/university-physics-volume-2/pages/4-6-entropy" }],
    },

    "kuantum-mekanigi": {
      concepts: [
        ["Olasılık genliği", "Olası sonuçlara ilişkin karmaşık sayı; ölçüm olasılığı mutlak değerinin karesinden elde edilir."],
        ["Koherens", "Farklı kuantum yollarının faz ilişkisinin girişim üretebilecek biçimde korunması."],
        ["Yol bilgisi", "Parçacığın hangi yarıktan geçtiğini ilkece ayırt etmeyi sağlayan fiziksel bilgi."],
      ],
      objective: "Tekil algılama olayları ile zamanla oluşan olasılık desenini ayırmak; yol bilgisinin koherensi neden azalttığını bilinçli gözlem fikrine başvurmadan açıklamak.",
      prerequisite: "Dalga girişimi, olasılık, dalga boyu ve yapıcı–yıkıcı girişim.",
      example: {
        title: "Saçak aralığını kestirmek",
        prompt: "λ=550 nm, L=1,5 m ve d=60 μm için komşu saçakların aralığını yaklaşık bul.",
        steps: ["Uzak ekran yaklaşımını kullan: Δy≈λL/d.", "Birimleri metreye çevir: 550×10⁻⁹ m ve 60×10⁻⁶ m.", "Δy≈0,01375 m≈13,8 mm bul."],
        result: "Dalga boyu veya ekran uzaklığı arttıkça saçaklar açılır; yarık aralığı arttıkça sıklaşır.",
      },
      experiment: {
        question: "Yol bilgisi ile parçacık sayısı deseni farklı biçimde nasıl etkiler?",
        steps: ["Gözlemci kapalıyken düşük atış hızında tekil noktaları, sonra biriken deseni izle.", "Yalnız atış hızını artır; desenin daha çabuk oluşup geometrisinin değişmediğini kontrol et.", "Yol bilgisi düğmesini aç; aynı λ, d ve L altında girişim görünürlüğünü karşılaştır."],
        observe: "Her olay yerel bir iz bırakır; girişim çok sayıda olayın istatistiksel dağılımında ortaya çıkar.",
      },
      evidence: {
        claim: "Tekil kuantum olayları birikerek girişimle uyumlu bir olasılık dağılımı oluşturabilir.",
        evidence: "İki yol ayırt edilemezken olasılık genlikleri toplanır; yol bilgisi çevreye kaydolduğunda faz uyumu ve girişim görünürlüğü azalır.",
        boundary: "‘İnsan bakınca elektron değişti’ anlatımı yanıltıcıdır. Fiziksel etkileşim ve yol bilgisinin ayırt edilebilirliği önemlidir.",
      },
      misconception: ["Girişimi bozan şey insan bilincinin ekrana bakmasıdır.", "Tek bir elektron ekranda birçok noktaya dağılmış soluk bir iz bırakır."],
      modelLimit: "Görsel noktasal yarık ve uzak ekran yaklaşımını kullanır; sonlu yarık genişliğini, kaynak koherensini ve gerçek dedektörü sadeleştirir.",
      questions: ["Atış hızını artırmak saçak aralığını neden değiştirmez?", "Yol bilgisi ile ölçüm aygıtı arasındaki fiziksel bağ nedir?", "Tek yarık kırınımı ile iki yarık girişimini nasıl ayırırsın?"],
      check: {
        question: "Hangi-yol bilgisi elde edildiğinde girişimin azalmasının temel nedeni nedir?",
        options: ["Yolların faz uyumunun aygıt veya çevreyle etkileşim sonucu kaybolması", "Bir insanın sonucu bilmesi", "Elektron enerjisinin mutlaka sıfır olması"],
        answer: 0,
        explanation: "Koherens kaybı fiziksel etkileşim ve ayırt edilebilirlik sorunudur; bilinçli gözlem şart değildir.",
      },
      sources: [{ label: "OpenStax — Dalga–parçacık ikiliği", url: "https://openstax.org/books/university-physics-volume-3/pages/6-6-wave-particle-duality" }],
    },

    "gorelilik-uzayzaman": {
      concepts: [
        ["Öz zaman", "Aynı yerde gerçekleşen iki olay arasında, olaylarla birlikte hareket eden saatin ölçtüğü süre."],
        ["Lorentz çarpanı", "γ=1/√(1−v²/c²) ifadesi; görelilik etkilerinin hızla nasıl büyüdüğünü belirler."],
        ["Referans çerçevesi", "Konum ve zaman ölçümlerinin tanımlandığı gözlemci ve koordinat sistemi."],
      ],
      objective: "Aynı olay çifti için öz zaman ile başka eylemsiz çerçevede ölçülen süreyi ayırmak ve Lorentz çarpanıyla nicel karşılaştırmak.",
      prerequisite: "Hız, karekök, Pisagor bağıntısı, bilimsel gösterim ve ışık hızının sembolü c.",
      example: {
        title: "0,8c hızında zaman karşılaştırması",
        prompt: "Araçtaki saat 1,0 saat ölçerken araç Dünya'ya göre 0,8c ile gidiyorsa Dünya çerçevesindeki süre nedir?",
        steps: ["γ=1/√(1−0,8²)=1/0,6≈1,667 hesapla.", "Araçla birlikte hareket eden saat öz zamanı ölçer: Δτ=1,0 saat.", "Δt=γΔτ≈1,667 saat, yani yaklaşık 1 saat 40 dakika bul."],
        result: "İki ölçümden biri yanlış değildir; farklı uzayzaman yolları ve çerçeveler farklı süreler verir.",
      },
      experiment: {
        question: "Görelilik etkisi hızla doğrusal mı büyür?",
        steps: ["Hızı 0,1c; 0,5c; 0,8c ve 0,99c yapıp γ'yı kaydet.", "Her hız için araçta 1 saat geçtiğinde dış çerçevedeki süreyi karşılaştır.", "v≪c bölgesinde γ'nın 1'e yakın, c'ye yaklaşırken çok hızlı büyüdüğünü açıkla."],
        observe: "Kütleli bir cisim için v=c seçilemez; gereken enerji hız c'ye yaklaştıkça sınırsız büyür.",
      },
      evidence: {
        claim: "Zaman aralıkları mutlak değildir; aynı olay çifti farklı hareket durumlarındaki saatlerle farklı ölçülebilir.",
        evidence: "Atmosferik müon ömürleri, parçacık hızlandırıcıları ve atom saatleri Lorentz dönüşümlerinin nicel öngörüleriyle uyuşur.",
        boundary: "Bu sayfa özel göreliliğin eylemsiz çerçeve modelidir. GPS hem hareket hem kütleçekim kaynaklı zaman düzeltmeleri kullanır.",
      },
      misconception: ["Hareketli saat mekanik arıza yüzünden yavaşlar.", "İkizler tamamen simetrik durumda farklı yaşlanır; bu yüzden çelişki vardır."],
      modelLimit: "Tek sürgülü model ivmelenme, yön değişimi ve uzayzaman eğriliğini göstermez; trambolin benzetmesi yalnız sınırlı sezgi verir.",
      questions: ["Eşzamanlılık neden uzak olaylar için çerçeveye bağlıdır?", "İkizler senaryosunda çerçeve değişimi simetriyi nasıl bozar?", "Düşük hızlarda Newton mekaniğinin başarısı görelilikle nasıl uyumludur?"],
      check: {
        question: "v, c'den çok küçük olduğunda Lorentz çarpanı γ için ne beklenir?",
        options: ["1'e çok yaklaşır", "Sıfıra eşit olur", "Daima sonsuz olur"],
        answer: 0,
        explanation: "v²/c² çok küçükken γ≈1 olur; gündelik hızlarda görelilik düzeltmeleri çoğunlukla çok küçüktür.",
      },
      sources: [{ label: "OpenStax — Zaman genişlemesi", url: "https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation" }],
    },

    "kimyasal-kinetik": {
      concepts: [
        ["Tepkime hızı", "Bir reaktanın tüketilmesi veya ürünün oluşmasıyla ilgili derişim değişiminin zamana oranı."],
        ["Hız yasası", "Tepkime hızının derişimlere deneysel olarak nasıl bağlı olduğunu gösteren bağıntı."],
        ["Aktivasyon enerjisi", "Bir tepkime yolunda etkin çarpışmaların aşması gereken enerji engeli."],
      ],
      objective: "Ortalama ve anlık tepkime hızını ayırmak; hız yasasını deneysel veriden yorumlamak ve sıcaklık/katalizör etkisini açıklamak.",
      prerequisite: "Derişim, mol, zaman grafiği, eğim, kimyasal denklem ve enerji profili.",
      example: {
        title: "Birinci dereceden hız yasası",
        prompt: "Hız=k[A] olan bir tepkimede [A] iki katına çıkarsa başlangıç hızı ne olur?",
        steps: ["Başlangıç hızını v₁=k[A] yaz.", "Yeni derişimde v₂=k·2[A]=2v₁ olur.", "Bu sonucu yalnız verilen hız yasası için kullan; denklem katsayısından tepkime derecesi çıkarma."],
        result: "Birinci dereceden bağımlılıkta derişimin iki katı hızı iki katına çıkarır; ikinci derecede dört katına çıkarırdı.",
      },
      experiment: {
        question: "Sıcaklık ile katalizör etkisini nasıl ayrı sınarsın?",
        steps: ["[A]₀=1,0 mol/L ve katalizör yokken 25 °C için başlangıç eğimini kaydet.", "Yalnız sıcaklığı değiştir; sonra başlangıca dönüp yalnız katalizör düzeyini değiştir.", "Aynı dönüşüm yüzdesine ulaşma sürelerini karşılaştır."],
        observe: "Katalizör daha düşük aktivasyon enerjili yol sağlar; denge sabitini veya toplam ΔG'yi değiştirmez.",
      },
      evidence: {
        claim: "Tepkime derecesi ve hız yasası genel olarak dengelenmiş denklemden değil deneyden belirlenir.",
        evidence: "Başlangıç hızları farklı derişimlerde ölçülür; hız oranlarının derişim oranlarına yanıtı üsleri sınar.",
        boundary: "Yalnız elementer adımlarda stokiyometri molekülerlikle doğrudan ilişkilendirilebilir; çok basamaklı mekanizmalarda ara türler önemlidir.",
      },
      misconception: ["Denklem katsayıları her hız yasasındaki üslerdir.", "Katalizör denge konumunu ürünler yönüne taşır."],
      modelLimit: "Simülasyon tek bir ideal hız modeli kullanır; ters tepkimeyi, yan yolları, çözücü ve kütle aktarımı etkilerini içermez.",
      questions: ["Anlık hız derişim–zaman grafiğinin hangi özelliğidir?", "Arrhenius grafiğinden aktivasyon enerjisi nasıl çıkarılır?", "Katalizör ileri ve geri tepkimeyi nasıl etkiler?"],
      check: {
        question: "Bir katalizör dengeye ulaşan sistemi nasıl etkiler?",
        options: ["İleri ve geri yolları hızlandırır; denge sabitini değiştirmez", "Yalnız ürün miktarını artırır", "Enerji korunumunu kaldırır"],
        answer: 0,
        explanation: "Katalizör kinetiği değiştirir; aynı sıcaklıktaki termodinamik denge konumunu değiştirmez.",
      },
      sources: [
        { label: "OpenStax — Kimyasal tepkime hızları", url: "https://openstax.org/books/chemistry-2e/pages/12-1-chemical-reaction-rates" },
        { label: "OpenStax — Çarpışma teorisi", url: "https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory" },
      ],
    },

    "enzim-kinetigi": {
      concepts: [
        ["Kₘ", "Basit Michaelis–Menten modelinde hızın Vmax/2 olduğu substrat derişimi."],
        ["Vmax", "Belirli toplam enzim miktarında modelin doygun substratta yaklaştığı en büyük başlangıç hızı."],
        ["İnhibisyon", "Bir molekülün enzimin hızını bağlanma biçimine göre değiştirmesi."],
      ],
      objective: "Michaelis–Menten eğrisinden Kₘ ve Vmax'ı okumak, doygunluğu açıklamak ve inhibitör türlerini karşılaştırmak.",
      prerequisite: "Derişim, tepkime hızı, protein, aktif bölge ve grafik asimptotu.",
      example: {
        title: "Yarı maksimum hız noktası",
        prompt: "Vmax=1,0 µM/s ve Kₘ=0,5 mM ise [S]=0,5 mM'de başlangıç hızı nedir?",
        steps: ["v=Vmax[S]/(Kₘ+[S]) bağıntısını yaz.", "[S]=Kₘ olduğundan payda 2Kₘ olur.", "v=Vmax/2=0,50 µM/s bul."],
        result: "Kₘ yarı maksimum noktayı verir; onu her durumda doğrudan ‘bağlanma gücü’ diye yorumlamak doğru değildir.",
      },
      experiment: {
        question: "Rekabetçi inhibitör eğriyi nasıl değiştirir?",
        steps: ["İnhibitör yokken birkaç [S] noktasında hızı kaydet.", "Rekabetçi inhibitörü seçip aynı [S] değerlerini karşılaştır.", "Yüksek [S]'de hızın aynı Vmax'a yaklaşırken görünür Kₘ'nin artmasını açıkla."],
        observe: "İdeal rekabetçi inhibisyonda yüksek substrat inhibitörle rekabet eder; saf rekabetçi olmayan modelde Vmax azalır.",
      },
      evidence: {
        claim: "Enzimler aktivasyon enerjisini düşürerek hızı artırır; tepkimenin denge serbest enerjisini değiştirmez.",
        evidence: "Başlangıç hızı deneyleri substrat arttıkça doygunluğa yaklaşan eğri verir; inhibitör desenleri mekanizmaları ayırır.",
        boundary: "Michaelis–Menten başlangıç hızı ve basit mekanizma varsayar; kooperatif ve çok substratlı enzimler basit eğriye uymayabilir.",
      },
      misconception: ["Daha yüksek Kₘ her koşulda enzimin daha hızlı olduğunu gösterir.", "Enzimler dengeyi ürünler yönüne taşır."],
      modelLimit: "Eğriler ideal parametreleri gösterir; gürültü, enzim bozulması, pH, sıcaklık ve karma inhibisyon gerçek ölçümü etkiler.",
      questions: ["Enzim miktarı iki katına çıkarsa Vmax ve Kₘ nasıl değişir?", "Başlangıç hızı neden ürün birikmeden ölçülür?", "Sigmoidal eğri hangi etkileşime işaret edebilir?"],
      check: {
        question: "Basit Michaelis–Menten modelinde [S]=Kₘ olduğunda hız kaçtır?",
        options: ["Vmax/2", "2Vmax", "Sıfır"],
        answer: 0,
        explanation: "Bağıntıya [S]=Kₘ yazıldığında v=VmaxKₘ/(2Kₘ)=Vmax/2 olur.",
      },
      sources: [{ label: "OpenStax — Enzimler", url: "https://openstax.org/books/biology-2e/pages/6-5-enzymes" }],
    },

    algoritmalar: {
      concepts: [
        ["Algoritma", "Bir problemi sonlu ve açık adımlarla çözen yöntem."],
        ["Döngü değişmezi", "Döngünün her yinelemesinden önce ve sonra doğru kalan, doğruluk gerekçesinde kullanılan önerme."],
        ["En kötü durum", "Belirli girdi boyutunda algoritmanın gerektirebileceği en yüksek kaynak maliyeti."],
      ],
      objective: "Algoritma doğruluğunu değişmezle savunmak; zaman maliyetini girdi büyüklüğünün büyüme düzeniyle karşılaştırmak.",
      prerequisite: "Liste, karşılaştırma, döngü, fonksiyon ve logaritmanın tekrarlı yarıya bölme anlamı.",
      example: {
        title: "1024 öğede arama",
        prompt: "Sıralı 1024 öğelik listede doğrusal ve ikili aramanın en kötü karşılaştırma sayılarını kıyasla.",
        steps: ["Doğrusal arama en çok 1024 karşılaştırma yapar: O(n).", "İkili arama aralığı yarıya indirir; 1024=2¹⁰ olduğundan yaklaşık 10 bölme adımı gerekir: O(log n).", "Bu avantaj için verinin sıralı ve rastgele erişilebilir olması gerektiğini belirt."],
        result: "Asimptotik fark girdi büyüdükçe belirginleşir; hazırlık maliyeti ve veri yapısı da kararın parçasıdır.",
      },
      experiment: {
        question: "Sıralama algoritmalarını nasıl adil karşılaştırırsın?",
        steps: ["Aynı başlangıç dizisini bütün algoritmalarda kullan.", "Karşılaştırma ve yer değiştirme sayılarını ayrı kaydet; animasyon hızını sabitle.", "Rastgele, sıralı ve ters sıralı girdileri tekrarla; ortalama ile en kötü durumu ayır."],
        observe: "Duvar saati süresi tarayıcıdan etkilenir; işlem sayısı büyüme düzenini daha doğrudan gösterir.",
      },
      evidence: {
        claim: "Algoritma kalitesi yalnız örnek çıktısı değil, bütün geçerli girdilerde doğruluk ve kaynak büyümesidir.",
        evidence: "Döngü değişmezi doğruluğu destekler; karmaşıklık analizi temel işlemleri girdi boyutuna göre sayar.",
        boundary: "Big-O kesin süre değildir; sabitleri gizler. Donanım, önbellek, veri dağılımı ve uygulama ayrıntısı gerçek süreyi değiştirir.",
      },
      misconception: ["O(n) algoritma her girdi boyutunda mutlaka O(n log n)'den hızlıdır.", "Birkaç örnekte doğru çıktı veren algoritma kanıtlanmıştır."],
      modelLimit: "Animasyon küçük diziler kullanır; bellek erişimi, önbellek, paralellik ve dil çalışma zamanı maliyetlerini tam temsil etmez.",
      questions: ["Merge sort neden ek bellek isteyebilir?", "Quick sort'un ortalama ve en kötü durumu neden farklıdır?", "Bir algoritmanın sona erdiğini nasıl gerekçelendirirsin?"],
      check: {
        question: "İkili aramayı doğrudan kullanmak için temel önkoşul nedir?",
        options: ["Verinin sıralı olması", "Bütün değerlerin eşit olması", "Girdi boyutunun tek olması"],
        answer: 0,
        explanation: "İkili arama hangi yarının eleneceğine sıralama düzeni sayesinde karar verir.",
      },
    },

    "veri-yapilari": {
      concepts: [
        ["Soyut veri tipi", "Bellek ayrıntısından bağımsız olarak desteklenen işlemleri ve davranışı tanımlayan sözleşme."],
        ["Amortize maliyet", "Nadir pahalı işlemleri uzun bir işlem dizisine yayarak işlem başına üst sınırı ifade eden analiz."],
        ["Yük faktörü", "Hash tablosundaki öğe sayısının bölme sayısına oranı."],
      ],
      objective: "Erişim, arama, ekleme ve silme maliyetlerini yapıya göre karşılaştırmak; ortalama, amortize ve en kötü durumu ayırmak.",
      prerequisite: "Dizi indeksi, bağlantı, bellek ve Big-O gösterimi.",
      example: {
        title: "Neden tek bir ‘en iyi’ yapı yok?",
        prompt: "Müşteri sırası ve son işlemi geri alma için hangi yapıları seçersin?",
        steps: ["Müşteri sırası ilk giren ilk çıkar davranışı ister: queue/FIFO.", "Geri alma son yapılanı önce çıkarır: stack/LIFO.", "Uçtan işlem O(1) olabilir; ortadaki belirli öğeyi aramak genellikle O(n)'dir."],
        result: "Seçim veri adından değil, gereken işlemler ve maliyet hedeflerinden yapılır.",
      },
      experiment: {
        question: "Dizi ve bağlı listede eklemenin gizli maliyetleri nelerdir?",
        steps: ["Dizide başa, sona ve ortaya ekleyip kaç öğenin kaydığını say.", "Listede konumu bulma ile bağlantıyı değiştirme maliyetini ayır.", "Hash tablosunda çakışan anahtarlar ekleyip arama yolunu izle."],
        observe: "Listede düğüm biliniyorsa bağlantı değişimi O(1) olabilir; düğümü aramak O(n) maliyeti ortadan kaldırmaz.",
      },
      evidence: {
        claim: "Veri yapısı hangi işlemlerin ucuz veya pahalı olacağını belirleyen performans sözleşmesidir.",
        evidence: "Dizi indeksi adres hesabı yapar; ağaç yüksekliği ve hash dağılımı arama yolunu belirler.",
        boundary: "Hash tabloda O(1) arama ortalama beklentidir. Dinamik dizide sona ekleme amortize O(1), tek yeniden boyutlandırma O(n) olabilir.",
      },
      misconception: ["Bağlı listede hedefi bulmak dâhil her ekleme O(1)'dir.", "Hash tablosunda çakışma olmadığı varsayılabilir."],
      modelLimit: "Görseller işaretçi boyutu, önbellek yakınlığı, çöp toplama ve yeniden boyutlandırma eşiklerini sadeleştirir.",
      questions: ["Önbellek yerelliği diziyi neden hızlandırabilir?", "Dengeli ağaç ile hash tabloyu sıralı dolaşım gereksinimi nasıl ayırır?", "Amortize O(1) ile ortalama O(1) aynı mıdır?"],
      check: {
        question: "Hash tablosunda aramanın O(1) olması nasıl bir ifadedir?",
        options: ["İyi dağılım ve yük altında beklenen maliyet", "Her girdide kesin garanti", "Hiç bellek kullanmadığı anlamı"],
        answer: 0,
        explanation: "Kötü çakışmalar zinciri uzatabilir; performans hash işlevi, kapasite ve yük faktörüne bağlıdır.",
      },
    },

    "makine-ogrenmesi-derin-ogrenme-llm": {
      concepts: [
        ["Genelleme", "Modelin eğitimde görmediği, hedef süreci temsil eden yeni veride işe yarama düzeyi."],
        ["Aşırı uyum", "Modelin eğitim verisinin ayrıntı ve gürültüsünü öğrenip yeni veride başarısının düşmesi."],
        ["Öz-dikkat", "Dizideki her konumun diğer konumlardan hangi bilgiyi ne ölçüde kullanacağını öğrenen Transformer işlemi."],
      ],
      objective: "Eğitim, doğrulama ve test verisini ayırmak; kayıp azalması ile genelleme arasındaki farkı açıklamak ve LLM çıktısını olasılıklı tahmin olarak değerlendirmek.",
      prerequisite: "Fonksiyon, vektör, ortalama, olasılık, veri örneği ve temel türev.",
      example: {
        title: "Eğitim başarısı genelleme değildir",
        prompt: "Bir sınıflandırıcı eğitimde %99, bağımsız testte %72 doğruluk veriyorsa ilk teşhis ne olmalıdır?",
        steps: ["İki kümenin aynı hedef ve ölçütle değerlendirildiğini doğrula.", "Farkı aşırı uyum veya eğitim–test dağılım farkı uyarısı olarak gör.", "Sınıf dengesini, hata matrisini ve alt grup sonuçlarını incele."],
        result: "Daha düşük eğitim hatası tek başına daha iyi model değildir; hedef temsil edici yeni veride güvenilir performanstır.",
      },
      experiment: {
        question: "Aynı ağda öğrenme ile ezberlemeyi nasıl ayırırsın?",
        steps: ["Başlangıç ağırlıklarıyla forward pass çalıştırıp kaybı kaydet.", "Aynı küçük eğitim örneklerinde birkaç backprop adımı uygula.", "Ayrı tuttuğun örneklerde sonucu karşılaştır; eğitim iyileşirken doğrulama kötüleşirse aşırı uyumu tartış."],
        observe: "Tek deneme güvenilir kıyas değildir; farklı başlangıçlarla çoklu koşu ve belirsizlik gerekir.",
      },
      evidence: {
        claim: "LLM bağlama göre sonraki token olasılıklarını modelleyerek metin üretir; akıcılık doğruluk garantisi değildir.",
        evidence: "Parametreler eğitim kaybını azaltacak biçimde güncellenir; bağımsız değerlendirme genelleme ve hata türlerini ölçer.",
        boundary: "Veri yanlılığı, dağılım kayması ve istem sonucu değiştirir. Model ikna edici ama yanlış içerik üretebilir; yüksek riskte bağımsız doğrulama gerekir.",
      },
      misconception: ["Eğitim kaybı en düşük model her zaman en güvenilir modeldir.", "LLM akıcı yazıyorsa bilgi doğrulanmıştır."],
      modelLimit: "Küçük ağ modern modellerin veri ölçeğini, dağıtık eğitimi, dikkat maskelerini ve güvenlik değerlendirmelerini temsil etmez.",
      questions: ["Precision, recall veya kalibrasyon hangi durumda doğruluktan önemlidir?", "Veri sızıntısı test sonucunu nasıl yapay yükseltir?", "Öz-dikkat neden tek başına nedensel anlayış kanıtı değildir?"],
      check: {
        question: "Eğitim kaybı düşerken doğrulama kaybı yükseliyorsa en olası sorun nedir?",
        options: ["Aşırı uyum", "Kesinlikle daha iyi genelleme", "Test verisinin gereksizleşmesi"],
        answer: 0,
        explanation: "Açılan eğitim–doğrulama farkı modelin eğitim ayrıntılarına uyup yeni veride kötüleştiğini gösterebilir.",
      },
      sources: [{ label: "MIT OpenCourseWare — Makine öğrenmesine giriş", url: "https://ocw.mit.edu/courses/18-642-topics-in-mathematics-with-applications-in-finance-fall-2024/resources/mit18_642_f24_lec23_pdf/" }],
    },
  };
})(window);
