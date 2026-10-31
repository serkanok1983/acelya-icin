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

    vektorler: {
      revision: "31 Ekim 2026",
      concepts: [
        ["Vektör", "Büyüklüğü ve yönü olan, uç uca eklenerek toplanan nicelik."],
        ["Bileşen", "Vektörün bir eksen doğrultusundaki izdüşümü; Aₓ=|A|cosθ, Aᵧ=|A|sinθ."],
        ["Bileşke", "Birden çok vektörün toplamına eşdeğer olan tek vektör."],
      ],
      objective: "Vektörleri bileşenlerine ayırıp toplamak; bileşkenin büyüklüğünü ve yönünü hesaplamak ve iki vektör arasındaki açının sonucu nasıl belirlediğini açıklamak.",
      prerequisite: "Dik üçgende sinüs ve kosinüs, Pisagor teoremi, koordinat düzlemi ve açının pozitif x ekseninden saat yönünün tersine ölçülmesi.",
      why: "Kuvvet, hız ve yer değiştirme yönlü niceliklerdir; yönü yok sayan toplama yanlış sonuç verir. Bileşenlere ayırma, iki boyutlu bir problemi iki bağımsız tek boyutlu probleme indirger.",
      realWorld: "Rüzgârda uçan uçağın yere göre hızı, köprü kablolarındaki çekme kuvvetleri, eğik atış ve bilgisayar grafiklerindeki konum hesapları vektör toplamıyla yapılır.",
      example: {
        title: "Bileşenlerle kuvvet toplama",
        prompt: "Bir cisme 0° doğrultusunda 5,0 N ve 60° doğrultusunda 5,0 N büyüklüğünde iki kuvvet etki ediyor. Bileşke kuvvetin büyüklüğünü ve yönünü bul.",
        steps: [
          "Bileşenlere ayır: F₁=(5,0; 0) N, F₂=(5,0·cos60°; 5,0·sin60°)=(2,50; 4,33) N.",
          "Aynı eksendeki bileşenleri topla: R=(5,0+2,50; 0+4,33)=(7,50; 4,33) N.",
          "Büyüklüğü ve yönü bul: |R|=√(7,50²+4,33²)=√75≈8,66 N; θ=arctan(4,33/7,50)=30°.",
        ],
        result: "Bileşke 10 N değil 8,66 N'dir. Kosinüs teoremi aynı sonucu verir: |R|²=5²+5²+2·5·5·cos60°=75 N².",
      },
      experiment: {
        question: "İki vektör arasındaki açı bileşkenin büyüklüğünü nasıl belirler?",
        steps: [
          "A'nın büyüklük sürgüsünü 3,0'a ve açı sürgüsünü 0°'ye, B'nin büyüklüğünü 2,0'a getir; B'nin açısını 0°, 90° ve 180° yapıp üstteki |A+B| değerini kaydet.",
          "B'nin açısını 0° ile 180° arasında 30°'lik adımlarla değiştir; her ölçümü |A+B|²=|A|²+|B|²+2|A||B|cosφ beklentisiyle karşılaştır (φ, A ile B arasındaki açı).",
          "A ile B'nin büyüklük ve açı değerlerini birbiriyle takas et; okumadaki A+B bileşenlerinin değişmediğini, yalnız okların renginin yer değiştirdiğini denetle.",
        ],
        observe: "Beklenen değerler 5,00; 3,61 ve 1,00'dır; bileşke daima |A|−|B| ile |A|+|B| arasında kalır. Kesikli çizgi, B'nin A'nın ucuna taşınmış hâlidir: uç uca ekleme ile bileşen toplamı aynı oku verir.",
      },
      evidence: {
        claim: "Vektörler bileşen bileşen toplanır; büyüklükler yalnız aynı yönlü vektörlerde doğrudan toplanabilir.",
        evidence: "Uç uca ekleme geometrisi ile Rₓ=Aₓ+Bₓ, Rᵧ=Aᵧ+Bᵧ hesabı aynı oku verir; kosinüs teoremi |A+B|'nin aradaki açıya bağlılığını nicel olarak doğrular.",
        boundary: "Yönü olan her nicelik vektör gibi toplanmaz: sonlu dönmelerin sırası sonucu değiştirir. Ayrıca yalnız aynı türden ve aynı birimli vektörler toplanabilir.",
      },
      misconception: ["3 birimlik ve 4 birimlik iki vektörün toplamı her zaman 7 birimdir.", "Bileşkenin yönünü θ=arctan(Rᵧ/Rₓ) her çeyrek düzlemde tek başına doğru verir."],
      modelLimit: "Sayfa yalnız düzlemde iki vektörün toplamını gösterir; çıkarma, skaler ve vektörel çarpım ile üç boyut yoktur. Büyüklükler birimsiz ve 0,1 adımlı, açılar 1° adımlıdır; bileşke açısı −180° ile 180° arasında verilir. Sola veya aşağı uzanan uzun vektörler çizim alanının dışına taşabilir.",
      questions: ["Yalnız toplama yapan bu sayfada A−B'yi nasıl elde edersin?", "Bileşke hangi açı aralığında iki vektörün her birinden de kısa olabilir?", "Koordinat eksenlerini döndürmek bileşenleri değiştirir; bileşkenin büyüklüğünü neden değiştirmez?"],
      check: {
        question: "|A|=3 ve |B|=4 olan iki vektörün bileşkesinin büyüklüğü hangi aralıkta olabilir?",
        options: ["1 ile 7 arasında (uçlar dâhil)", "Her zaman 5", "Her zaman 7"],
        answer: 0,
        explanation: "Aynı yönde 7, zıt yönde 1, dik açıda 5 olur; bileşkenin büyüklüğü aradaki açıya bağlıdır.",
      },
      sources: [{ label: "OpenStax — Vektör bileşenleri ve koordinat sistemleri", url: "https://openstax.org/books/university-physics-volume-1/pages/2-2-coordinate-systems-and-components-of-a-vector" }],
    },

    "matris-donusumleri": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Doğrusal dönüşüm", "Vektör toplamını ve sayıyla çarpımı koruyan, orijini sabit bırakan dönüşüm; düzlemde bir 2×2 matrisle ifade edilir."],
        ["Determinant", "Dönüşümün alanları hangi çarpanla ölçeklediğini ve işaretiyle yönelimi koruyup korumadığını gösteren sayı."],
        ["Özdeğer", "Sıfırdan farklı bir v vektörü için A·v=λ·v eşitliğini sağlayan, o doğrultudaki ölçek çarpanı λ."],
      ],
      objective: "2×2 matrisin sütunlarını birim vektörlerin görüntüsü olarak okumak; determinantı alan çarpanı ve yönelim, özdeğerleri değişmeyen doğrultuların ölçeği olarak yorumlamak ve dönüşüm sırasının sonucu değiştirdiğini göstermek.",
      prerequisite: "Vektör, koordinat düzlemi, sinüs ve kosinüs, matris çarpımı kuralı ve ikinci dereceden denklem çözümü.",
      why: "Matris bir doğrusal dönüşümün eksiksiz tarifidir: birinci sütun e₁'in, ikinci sütun e₂'nin gittiği yeri verir. Determinant ve özdeğerler, dönüşümü tek tek noktaları izlemeden özetler.",
      realWorld: "Bilgisayar grafiği, robot kol kinematiği, görüntü işleme ve CAD dönüşümleri matris çarpım zinciriyle hesaplar; öteleme homojen koordinatlarla bu zincire katılır, özdeğer analizi titreşim modlarında ve temel bileşen analizinde kullanılır.",
      example: {
        title: "Sıra önemlidir: ölçek ve döndürme",
        prompt: "Sx=2, Sy=1 ölçeklemesi S ile 90° döndürme R için R·S ve S·R matrislerini bul; (1, 0) vektörünün görüntülerini karşılaştır.",
        steps: [
          "Satırları sırayla yaz: S=[[2, 0], [0, 1]] ve cos 90°=0, sin 90°=1 olduğundan R=[[0, −1], [1, 0]].",
          "R·S=[[0, −1], [2, 0]] olur; (1, 0) önce (2, 0)'a uzar, sonra (0, 2)'ye döner. S·R=[[0, −2], [1, 0]] olur; (1, 0) önce (0, 1)'e döner, sonra x ölçeği bu vektörü değiştirmez ve görüntü (0, 1) kalır.",
          "İki determinantı hesapla: det(R·S)=0·0−(−1)·2=2 ve det(S·R)=0·0−(−2)·1=2; çünkü det(AB)=det(A)·det(B)=1·2.",
        ],
        result: "Matris çarpımı değişmeli değildir: görüntüler farklıdır ama alan çarpanı ikisinde de 2'dir. Sayfa ölçeği önce, döndürmeyi sonra uyguladığı için M=R·S biçimini kullanır.",
      },
      experiment: {
        question: "Determinant alanı ve yönelimi nasıl kodlar; özdeğerler ne zaman reel olur?",
        steps: [
          "Varsayılan ayarlardan (Sx=Sy=1, Açı 0°, Shx=Shy=0) başlayıp Sx=2, Sy=1,5 yap; Determinant ve Alan Çarpanı kartlarını kaydet, sonra Sy'yi 0,5'e indirip biçim bozulduğu hâlde alan çarpanının 1 olduğunu gör.",
          "Sx ve Sy'yi 1'e döndür; Açı'yı 45° ve 90° yap. Determinantın 1 kaldığını, Özdeğerler kartında cos θ ± i·sin θ biçiminde karmaşık eşlenik bir çift çıktığını not et.",
          "Açı'yı 0°'a döndürüp “X eksenine göre” kutusunu işaretle ve determinantın −1 olduğunu gör; kutuyu kaldırıp Sx'i 0'a getir ve det=0'da evin y ekseni üzerinde bir doğru parçasına çöktüğünü izle.",
        ],
        observe: "|det| alan çarpanıdır, işareti yönelimi verir: det<0 iken şekil ayna görüntüsüne döner. det=0 iken düzlem bir doğruya çöker ve dönüşüm tersinmez olur.",
      },
      evidence: {
        claim: "Bir 2×2 matris, e₁ ve e₂ birim vektörlerinin görüntüleriyle tamamen belirlenir.",
        evidence: "Doğrusallık T(a·e₁+b·e₂)=a·T(e₁)+b·T(e₂) verir; bu yüzden birim kare, sütun vektörlerinin gerdiği paralelkenara gider ve bu paralelkenarın alanı |det|'tir.",
        boundary: "Öteleme orijini taşıdığı için 2×2 doğrusal dönüşüm değildir; homojen koordinatlarda 3×3 afin matrisle yazılır. Karmaşık özdeğerler düzlemde değişmeyen reel bir doğrultu olmadığını gösterir.",
      },
      misconception: ["Matris çarpımında sıra önemsizdir; önce döndürüp sonra ölçeklemek aynı sonucu verir.", "Negatif determinant şeklin alanının negatif olduğu anlamına gelir."],
      modelLimit: "Sayfa yalnız orijini sabit tutan 2×2 doğrusal dönüşümleri 11 köşeli bir ev şekli üzerinde gösterir; öteleme yoktur ve çarpım sırası sabittir (ölçek → kayma → döndürme → yansıtma). Shx ile Shy aynı [[1, Shx], [Shy, 1]] matrisinde birleştiğinden ikisi birlikte saf kayma değildir; bu matrisin determinantı 1−Shx·Shy'dir. Özdeğerler sayı olarak yazılır ama özvektör doğrultuları çizilmez; değerler 3–4 basamağa yuvarlanır.",
      questions: ["Shx ve Shy'yi aynı anda 1 yaptığında determinant neden sıfır olur ve şekle ne olur?", "Hem X hem Y eksenine göre yansıtma hangi açıdaki döndürmeyle aynı matrisi verir?", "Saf döndürmede reel özdeğer neden yalnız 0° ve ±180°'de görülür?"],
      check: {
        question: "Determinantı −2 olan bir 2×2 dönüşüm şekle ne yapar?",
        options: ["Alanı 2 katına çıkarır ve yönelimi tersine çevirir", "Alanı −2 katına çıkarır", "Şekli yarıya küçültür ve yönelimi korur"],
        answer: 0,
        explanation: "Alan çarpanı |det|=2'dir; negatif işaret şeklin ayna görüntüsüne döndüğünü, yani köşe sırasının ters yöne çevrildiğini gösterir.",
      },
      sources: [{ label: "MIT OpenCourseWare — Doğrusal cebir", url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/" }],
    },

    "fonksiyon-grafigi": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Tanım kümesi", "Fonksiyonun reel bir değer ürettiği girdi değerlerinin kümesi."],
        ["Görüntü kümesi", "Fonksiyonun tanım kümesi üzerinde aldığı bütün çıktı değerlerinin kümesi."],
        ["Ters fonksiyon", "f'nin yaptığı eşlemeyi geri alan, grafiği y=x doğrusuna göre f'nin yansıması olan fonksiyon."],
      ],
      objective: "Temel fonksiyon ailelerinin tanım ve görüntü kümesini, periyodunu, simetrisini ve asimptotlarını grafikten okuyup cebirsel olarak doğrulamak; görüntü penceresinin ve eksen ölçeğinin yorumu nasıl etkilediğini ayırt etmek.",
      prerequisite: "Koordinat düzlemi, fonksiyon değeri hesaplama, radyan ölçüsü, üs ve logaritma kuralları.",
      why: "Grafik bir bağıntıyı tek bakışta gösterir: nerede tanımlı olduğunu, nasıl büyüdüğünü, kendini tekrar edip etmediğini. Ancak görülen her zaman seçilen pencere ve ölçeğe bağlıdır; bu yüzden gözlem cebirle doğrulanmalıdır.",
      realWorld: "Alternatif akım ve saf ses tonu sinüsle, bileşik faiz ve sınırsız nüfus büyümesi üstel fonksiyonla, serbest düşüşte alınan yol zamanın karesiyle modellenir; pH ve desibel ise logaritmik ölçeklerdir.",
      example: {
        title: "eˣ ve ln(x): ters fonksiyon grafikleri",
        prompt: "y=eˣ ve y=ln(x) grafiklerinin y=x doğrusuna göre birbirinin yansıması olduğunu nokta eşlemesi ve küme karşılaştırmasıyla göster.",
        steps: [
          "eˣ üzerinde noktalar hesapla: x=0 için y=e⁰=1, x=1 için y=e≈2,72; yani (0, 1) eˣ grafiğindedir.",
          "ln için aynı sayıları ters sırada dene: ln(1)=0 ve ln(e)=1. Genel olarak (a, b) eˣ grafiğindeyse (b, a) ln grafiğindedir; koordinatların yer değiştirmesi y=x'e göre yansımadır.",
          "Kümeleri karşılaştır: eˣ için tanım kümesi ℝ, görüntü kümesi (0, ∞); ln için tanım kümesi (0, ∞), görüntü kümesi ℝ. eˣ'in yatay asimptotu y=0, ln'in düşey asimptotu x=0 olur.",
        ],
        result: "Ters fonksiyonda tanım ve görüntü kümeleri yer değiştirir. eˣ hiçbir zaman 0 ya da negatif olmadığı için ln(0) ve negatif sayıların logaritması reel sayılarda tanımsızdır.",
      },
      experiment: {
        question: "Periyot, asimptot ve tanım kümesi sınırı grafikte nasıl okunur; eksen ölçeği bu okumayı nasıl etkiler?",
        steps: [
          "Fonksiyon menüsünde y = sin(x) seçiliyken “Görünen x aralığı (yarıçap)” kaydırıcısını 2'den 20'ye çıkar. Üstteki x ∈ [..] okumasından aralık genişliğini 2π≈6,28'e bölerek beklediğin dalga sayısını hesapla ve sayarak karşılaştır.",
          "y = eˣ'i seç; grafiği sağa sürükleyerek negatif x bölgesini daha geniş görünür hâle getir. Eğrinin x eksenine yaklaştığını ama kesmediğini, pozitif x'te ise birkaç birim içinde ekranın üstünden çıktığını not et.",
          "y = ln(x)'i seç; açılan görünümde x≤0 bölgesinin boş kaldığını ve x 0'a sağdan yaklaşırken eğrinin ekranın altına indiğini gözle. Sonra “Görünümü sıfırla” ile dön ve bu gözlemi ikinci adımla y=x yansıması üzerinden ilişkilendir.",
        ],
        observe: "Kaydırıcı yalnız yatay ölçeği değiştirir; sinüs eğrisi daha basık ya da daha dik görünse de fonksiyon ve türevi değişmez. Eğrinin ekran kenarında bitmesi ile tanım kümesinin bitmesi aynı şey değildir.",
      },
      evidence: {
        claim: "Bir grafik, fonksiyonun yalnız seçilen penceredeki örneklenmiş bir parçasıdır; periyot, asimptot ve tanım kümesi cebirsel olarak doğrulanmalıdır.",
        evidence: "sin(x+2π)=sin(x) özdeşliği periyodu her x için kanıtlar; ln yalnız x>0 için tanımlı olduğundan eğri x=0'ın solunda hiçbir ölçekte çizilmez.",
        boundary: "Pencere dışındaki davranış farklı olabilir; çok hızlı salınımlar veya süreksizlikler sonlu sayıda örnek noktayla kaybolabilir ya da yanlış birleştirilmiş görünebilir.",
      },
      misconception: ["eˣ eğrisi yeterince sola gidildiğinde x eksenini keser ve negatif değer alır.", "Eksen ölçeği değişince grafiğin görünen dikliğiyle birlikte fonksiyonun türevi de değişir."],
      modelLimit: "Sayfa beş sabit fonksiyonu yaklaşık 865 noktada örnekleyip doğru parçalarıyla birleştirir; eksenlerde sayı etiketi, nokta okuma, türev ya da asimptot çizimi yoktur. x kaydırıcısı yalnız yatay ölçeği değiştirdiği için en-boy oranı ve görünen diklik değişir; ln(x)'te x≤0 için değer üretilmez, x→0⁺'daki sınırsız iniş ise ekran kenarında kesilir.",
      questions: ["sin ve cos grafikleri arasındaki yatay kayma kaç birimdir ve hangi özdeşlikle ifade edilir?", "x² çift, sin(x) tek fonksiyondur: bu simetriler grafikte hangi eksen veya noktaya göre görünür?", "Üstel ve polinom büyümeyi yalnız seçilen pencereye bakarak karşılaştırmak neden yanıltıcı olabilir; eˣ/x² oranı x büyürken nasıl davranır?"],
      check: {
        question: "y=ln(x) fonksiyonunun reel sayılardaki tanım kümesi nedir?",
        options: ["(0, ∞)", "Tüm reel sayılar", "[0, ∞)"],
        answer: 0,
        explanation: "ln, eˣ'in tersidir; eˣ yalnız pozitif değer aldığından ln yalnız x>0 için tanımlıdır ve x=0'da düşey asimptot vardır.",
      },
      sources: [{ label: "OpenStax — Fonksiyonlar ve grafikleri", url: "https://openstax.org/details/books/precalculus-2e" }],
    },

    "newton-hareket-yasalari": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Eylemsizlik", "Net kuvvet sıfırken cismin hız vektörünü, yani hız büyüklüğünü ve yönünü koruması."],
        ["Net kuvvet", "Bir cisme etki eden bütün kuvvetlerin vektörel toplamı; ΣF=m·a ile ivmeyi belirler."],
        ["Etki–tepki çifti", "İki cismin birbirine uyguladığı, eşit büyüklükte, zıt yönlü ve farklı cisimlere etki eden kuvvetler."],
      ],
      objective: "Newton'un üç yasasını aynı olayda ayırt etmek: dış kuvvet yokken sabit hızı, net kuvvet–ivme ilişkisini ve etkileşim kuvvetlerinin eşit–zıt impulsunu momentum korunumuna bağlamak.",
      prerequisite: "Hız, ivme, kütle, vektör yönü ve işaret kuralı; F=m·a bağıntısındaki F'nin tek bir kuvvet değil net kuvvet olduğu.",
      why: "Newton yasaları kuvvet ile hareket değişimi arasındaki nedensel bağı kurar. Momentum korunumu, çarpışma sırasındaki karmaşık kuvvetleri bilmeden önceki ve sonraki durumları ilişkilendirmeyi sağlar.",
      realWorld: "Hava yastığı etki süresini uzatarak ortalama kuvveti azaltır; roket itişi, yürüme ve kürek çekme etki–tepki çiftleriyle açıklanır; trafik kazası analizinde momentum korunumu kullanılır.",
      example: {
        title: "Aynı kuvvet, farklı ivme",
        prompt: "1200 kg'lık bir otomobil ile 6000 kg'lık bir kamyon çarpışırken 0,10 s boyunca birbirine ortalama 3,0×10⁴ N kuvvet uyguluyor. Her birinin ortalama ivmesini ve hız değişimini bul.",
        steps: [
          "Üçüncü yasaya göre iki araca etki eden kuvvetlerin büyüklüğü aynıdır: F=3,0×10⁴ N, yönleri zıttır.",
          "İkinci yasayla ivmeleri bul: a_oto=3,0×10⁴/1200=25 m/s², a_kamyon=3,0×10⁴/6000=5,0 m/s².",
          "Hız değişimleri Δv=a·Δt'dir: otomobil için 2,5 m/s, kamyon için 0,50 m/s; momentum değişimleri 1200·2,5=6000·0,50=3000 kg·m/s olup zıt yönlüdür.",
        ],
        result: "Kuvvetler eşit, ivmeler kütleyle ters orantılıdır; bu yüzden hafif araçtaki yolcular beş kat büyük ivme yaşar. Toplam momentum değişmez.",
      },
      experiment: {
        question: "Çarpışmada topların birbirine uyguladığı impulslar eşit ve zıt mıdır?",
        steps: [
          "Sıfırla'ya, ardından Simülasyonu Başlat'a bas; çarpışmadan önce grafikteki Top 1 Hızı (3) ve Top 2 Hızı (−2) değerlerini kaydet. Sayfa kütleleri m₁=2 ve m₂=3 birim alır.",
          "Grafikte iki hızın aniden değiştiği anı bul; çarpışma sonrası değerleri okuyup her top için Δp=m·Δv hesapla.",
          "Toplam momentumu (m₁v₁+m₂v₂) ve toplam kinetik enerjiyi (½m₁v₁²+½m₂v₂²) çarpışmadan önce ve sonra karşılaştır; çarpışma dışında hızların neden sabit kaldığını birinci yasayla açıkla.",
        ],
        observe: "Hızlar 3 ve −2'den −3 ve 2'ye geçer: Δp₁=−12, Δp₂=+12 birimdir. Toplam momentum 0, kinetik enerji 15 birim kalır; enerji korunumu esnek çarpışma varsayımının sonucudur, her çarpışmanın değil.",
      },
      evidence: {
        claim: "Etkileşen iki cisim birbirine aynı anda eşit büyüklükte ve zıt yönlü kuvvet uygular; bu nedenle yalıtılmış sistemin toplam momentumu korunur.",
        evidence: "F₁₂=−F₂₁ ise etkileşim boyunca impulslar da eşit ve zıttır: Δp₁=−Δp₂. Hava rayı çarpışma deneylerinde kütle oranı ne olursa olsun bu eşitlik ölçüm belirsizliği içinde sağlanır.",
        boundary: "Etki–tepki kuvvetleri farklı cisimlere etki ettiği için birbirini dengelemez. Newton yasaları eylemsiz çerçevelerde ve ışık hızına göre küçük hızlarda geçerlidir; kinetik enerjinin korunması ayrıca esnek çarpışma gerektirir.",
      },
      misconception: ["Ağır kamyon çarpışmada hafif otomobile, otomobilin kamyona uyguladığından daha büyük kuvvet uygular.", "Hareket eden bir cismin hareketini sürdürmesi için üzerine sürekli net kuvvet etki etmelidir."],
      modelLimit: "Toplar tek boyutta, sürtünmesiz ve dış kuvvet olmadan hareket eder; çarpışma tam esnek ve anlık bir hız sıçraması olarak hesaplanır, temas kuvvetinin zamanla değişimi gösterilmez. Kütleler ve başlangıç hızları sabittir; grafik etiketleri m/s ve s yazsa da hızlar piksel/kare biriminde, zaman her karede 0,1 artan sayaçtır. Duvar olmadığından toplar çarpışmadan sonra ekrandan çıkar.",
      questions: ["m₁=m₂ olsaydı esnek çarpışmada hızlara ne olurdu?", "Toplar çarpışıp birbirine yapışsaydı momentum ve kinetik enerjiden hangisi korunurdu?", "Çarpışma süresi kısaldığında aynı Δp için ortalama kuvvet nasıl değişir?"],
      check: {
        question: "2 kg'lık bir top 3 kg'lık bir topla çarpışırken 12 N ortalama kuvvet etkisinde kalıyorsa 3 kg'lık topa etki eden ortalama kuvvet nedir?",
        options: ["12 N, zıt yönde", "18 N, zıt yönde", "8 N, aynı yönde"],
        answer: 0,
        explanation: "Üçüncü yasa kütleden bağımsızdır: kuvvetler eşit ve zıttır. Farklı olan ivmelerdir: 12/2=6 m/s² ve 12/3=4 m/s².",
      },
      sources: [{ label: "OpenStax — Newton'un üçüncü yasası", url: "https://openstax.org/books/university-physics-volume-1/pages/5-5-newtons-third-law" }],
    },

    "serbest-dusme": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Serbest düşme", "Bir cismin yalnız kütleçekim kuvveti etkisinde hareket etmesi; yer yakınında ivmesi yaklaşık sabit g'dir."],
        ["Sürüklenme kuvveti", "Akışkanın harekete zıt yönde uyguladığı, hızla artan direnç kuvveti; bu sayfada F=k·v² alınır."],
        ["Limit hız", "Ağırlık ile direnç kuvvetinin eşitlendiği, net kuvvetin ve ivmenin sıfır olduğu sabit hız."],
      ],
      objective: "Dirençsiz düşmede v=g·t ve h=½g·t² bağıntılarını uygulamak; direnç eklenince ivmenin neden azaldığını ve limit hızın kütleye nasıl bağlı olduğunu açıklamak.",
      prerequisite: "Hız–ivme ayrımı, Newton'un ikinci yasası, ağırlık mg, karekök ve hız–zaman grafiğinin eğiminin ivme olması.",
      why: "Serbest düşme, kütleçekim ivmesinin kütleden bağımsız olduğunu gösteren en sade deneydir. Direnç eklendiğinde aynı ikinci yasa, hıza bağlı bir kuvvetin hareketi nasıl dengeye götürdüğünü gösterir.",
      realWorld: "Paraşüt tasarımı, yağmur damlalarının limit hızı, yüksekten düşen nesnelerin güvenlik analizi ve gravimetrelerle yerel g ölçümü bu modelden başlar.",
      example: {
        title: "Vakumda çarpma hızı ve havada limit hız",
        prompt: "100 m yükseklikten bırakılan 10 kg'lık cisim için g=9,8 m/s² al. Dirençsiz çarpma hızını, F=k·v² direncinde (k=0,10 kg/m) limit hızla karşılaştır.",
        steps: [
          "Dirençsiz durumda v=√(2gh)=√(2·9,8·100)=√1960≈44,3 m/s ve t=v/g≈4,52 s olur.",
          "Limit hızda net kuvvet sıfırdır: k·v_L²=m·g ⇒ v_L=√(mg/k)=√(10·9,8/0,10)=√980≈31,3 m/s.",
          "Dirençsiz çarpma hızı v_L'yi aştığından havadaki cisim 31,3 m/s'yi geçemez; çarpma hızı daha küçük, düşme süresi 4,52 s'den uzun olur.",
        ],
        result: "Dirençsiz hesapta kütle sadeleşir. Dirençte v_L=√(mg/k) olduğundan aynı k ile kütle dört katına çıkarsa limit hız iki katına çıkar.",
      },
      experiment: {
        question: "Kütle düşüşü hangi koşulda etkiler?",
        steps: [
          "Yerçekimi sürgüsünü 9,8 m/s²'de bırakıp Hava Direnci Katsayısı'nı 0 yap; Kütle'yi önce 1, sonra 100 kg seçip her seferinde Sıfırla ve Başlat'a bas, yere varıştaki t ve v değerlerini kaydet.",
          "Katsayıyı 0,1'e getirip aynı iki kütleyi tekrarla; hız–zaman grafiğinde eğrinin düzleştiği değeri √(mg/k) ile karşılaştır (m=1 kg için ≈9,9 m/s).",
          "Katsayı 0 iken Yerçekimi sürgüsünü 5 m/s²'ye al; ölçtüğün düşme süresini √(2h/g)=√(200/5)≈6,3 s beklentisiyle karşılaştır.",
        ],
        observe: "Dirençsiz düşüşte her iki kütle de ≈4,5 s'de ≈44 m/s ile yere varır. Dirençte 1 kg'lık cisim kısa sürede limit hıza oturur; 100 kg'lık cisim ise 100 m içinde dirençsiz duruma yakın kalır.",
      },
      evidence: {
        claim: "Hava direnci ihmal edilebildiğinde aynı yerdeki bütün cisimler kütleden bağımsız olarak aynı ivmeyle düşer.",
        evidence: "Ağırlık mg kütleyle orantılıdır ve eylemsizlik de m ile orantılı olduğundan a=mg/m=g olur; Apollo 15'te çekiç ile tüyün Ay'da birlikte düşmesi ve vakum tüpü deneyleri bunu doğrular.",
        boundary: "Havada direnç kuvveti hıza, şekle ve kesit alanına bağlıdır; ivme g−kv²/m olur ve kütle önem kazanır. g de enleme ve yüksekliğe göre yaklaşık 9,78–9,83 m/s² arasında değişir.",
      },
      misconception: ["Ağır cisimler, hava direnci olmasa bile hafif cisimlerden daha hızlı düşer.", "Limit hıza ulaşan cismin üzerinde hiç kuvvet kalmaz."],
      modelLimit: "Hareket sabit 0,1 s adımlı yarı örtük Euler yöntemiyle hesaplanır; yere varış anı bu adıma yuvarlanır ve son adımda yükseklik kısa süre negatif görünebilir. Direnç F=k·v² biçimindedir ve k kütleden bağımsız seçilir, yani boyut ve şekil kütleyle değişmez varsayılır; hava yoğunluğu ve g yükseklikle değişmez.",
      questions: ["Paraşüt açılıp k aniden büyüdüğünde hız–zaman grafiği nasıl değişir?", "Aynı boyutta demir ve tahta bilyeden hangisinin limit hızı daha büyüktür, neden?", "Dirençsiz düşmede yükseklik dört katına çıkarsa düşme süresi kaç katına çıkar?"],
      check: {
        question: "Hava direnci yokken 20 m yükseklikten bırakılan bir cisim (g=9,8 m/s²) yaklaşık kaç saniyede yere düşer?",
        options: ["≈2,0 s", "≈4,1 s", "≈1,0 s"],
        answer: 0,
        explanation: "h=½gt² ⇒ t=√(2h/g)=√(40/9,8)≈2,0 s. Karekök almayı unutmak 4,1 s gibi yanlış bir sonuç verir; sonuç kütleye bağlı değildir.",
      },
      sources: [{ label: "OpenStax — Serbest düşme", url: "https://openstax.org/books/university-physics-volume-1/pages/3-5-free-fall" }],
    },

    "is-enerji": {
      revision: "31 Ekim 2026",
      concepts: [
        ["İş", "Kuvvetin yer değiştirme doğrultusundaki bileşeni ile yer değiştirmenin çarpımı; W=F·d·cosθ, birimi joule."],
        ["Kinetik enerji", "Kütlesi m, hızı v olan cismin hareketiyle ilişkili ½mv² enerjisi."],
        ["Korunumsuz kuvvet", "Yaptığı iş izlenen yola bağlı olan ve mekanik enerjiyi başka biçimlere aktaran kuvvet; kinetik sürtünme gibi."],
      ],
      objective: "İş–enerji teoremini eğik düzlemde uygulamak: yerçekimi, normal ve sürtünme kuvvetlerinin işlerini ayrı hesaplayıp net işi kinetik enerji değişimine, sürtünme işini mekanik enerji kaybına bağlamak.",
      prerequisite: "Vektör bileşenleri, eğik düzlemde ağırlığın mg·sinθ ve mg·cosθ bileşenleri, kinetik sürtünme f=μN ve Newton'un ikinci yasası.",
      why: "İş–enerji yaklaşımı ivmeyi ve zamanı hesaplamadan, yalnız başlangıç ve son durumlardan hız bulmayı sağlar. Korunumlu ve korunumsuz kuvvetleri ayırmak, enerjinin nereye gittiğini muhasebelemenin temelidir.",
      realWorld: "Araç fren mesafesi, hız treni ve kayak pisti tasarımı, asansör motoru gücü ve rejeneratif frenleme enerji bilançosuyla hesaplanır.",
      example: {
        title: "Sürtünmeli eğik düzlemde son hız",
        prompt: "2,0 kg'lık bir kutu 30° eğimli düzlemde durgun hâlden 5,0 m kayıyor; μ=0,10 ve g=9,8 m/s². Kutunun son hızını iş–enerji teoremiyle bul.",
        steps: [
          "Yerçekimi işi: W_g=m·g·d·sinθ=2,0·9,8·5,0·0,50=49 J. Normal kuvvet harekete dik olduğundan W_N=0'dır.",
          "Sürtünme işi: W_s=−μ·m·g·cosθ·d=−0,10·2,0·9,8·0,866·5,0≈−8,5 J.",
          "Net iş kinetik enerji değişimine eşittir: 49−8,5=40,5 J=½·2,0·v² ⇒ v=√40,5≈6,4 m/s.",
        ],
        result: "Sürtünmesiz olsaydı v=√(2·49/2,0)=7,0 m/s olurdu. Aradaki 8,5 J mekanik enerji yok olmaz; kutu ile yüzeyin iç enerjisine aktarılır.",
      },
      experiment: {
        question: "Sürtünme, yerçekimi işinin ne kadarının kinetik enerjiye dönüşmesine izin verir?",
        steps: [
          "Eğim açısını 25°, Sürtünme μ'yü 0 yap; Başlat'a bas, bir süre sonra Duraklat ile durdurup KE, PE ve W_net çubuklarını ve üstteki E_mek değerini kaydet.",
          "Aynı açıda μ'yü 0,10 ve 0,20 yapıp tekrarla; alttaki satırdan yerçekimi işi ile sürtünme işini oku; W_net çubuğunun her anda KE'ye, Isı çubuğunun ise E_mek'teki azalmaya eşit kaldığını denetle.",
          "Sürtünme işinin yerçekimi işine oranını μ·cosθ/sinθ=μ/tanθ beklentisiyle karşılaştır; açıyı 45°'ye çıkarıp aynı μ için oranın azaldığını göster.",
        ],
        observe: "μ=0'da E_mek sabit kalır; μ>0'da E_mek tam sürtünme işi kadar azalır, KE ise net işe eşit olur. μ=0,10 için oran 25°'de ≈0,21, 45°'de 0,10'dur.",
      },
      evidence: {
        claim: "Bir cisme yapılan net iş, kinetik enerjisindeki değişime eşittir: W_net=ΔKE.",
        evidence: "Sabit net kuvvet için ikinci yasa ile v²=v₀²+2a·d birleştirilince F_net·d=½mv²−½mv₀² çıkar; değişken kuvvetlerde iş integrali aynı sonucu verir.",
        boundary: "Teorem nokta parçacık ya da katı cismin kütle merkezi için kurulur; dönme, şekil değiştirme veya iç enerji değişimi olan sistemlerde bilançoya bu terimler eklenmelidir. Sürtünmenin ‘kaybettirdiği’ enerji iç enerjiye aktarılır.",
      },
      misconception: ["Cisim eğik düzlemde kayarken normal kuvvet de iş yapar.", "Sürtünme varsa enerji korunumu geçerli değildir."],
      modelLimit: "Kütle 2 kg, rampa boyu 5 m ve g=9,8 m/s² sabittir; cisim dönmeyen bir nokta parçacık gibi kayar. Hareket 1/60 s adımlı yarı örtük Euler yöntemiyle hesaplanır. Statik ve kinetik sürtünme katsayısı aynı μ kabul edilir; bu yüzden μ≥tanθ iken cisim hiç kaymaz, gerçekte ise statik katsayı genellikle daha büyüktür. Sürtünmeyle açığa çıkan enerji tek bir ‘Isı’ çubuğunda toplanır; cisim ile yüzey arasındaki paylaşımı, ses ve aşınma gösterilmez.",
      questions: ["Aynı yükseklikten sürtünmesiz ama farklı eğimli iki rampadan inen cisimlerin son hızları neden eşittir?", "μ≥tanθ olduğunda durgun cisim neden harekete başlamaz; bu sınır statik sürtünmeyle nasıl ilişkilidir?", "Sürtünme işinin yola bağlı olması, sürtünme için potansiyel enerji tanımlanmasını neden engeller?"],
      check: {
        question: "Eğik düzlemde kayan bir cisme yerçekimi 50 J, sürtünme −15 J iş yapıyor. Normal kuvvetin işi nedir ve kinetik enerji ne kadar artar?",
        options: ["Normal kuvvet 0 J; KE 35 J artar", "Normal kuvvet 15 J; KE 50 J artar", "Normal kuvvet 0 J; KE 65 J artar"],
        answer: 0,
        explanation: "Normal kuvvet harekete dik olduğundan cos90°=0 ve işi sıfırdır; W_net=50−15=35 J=ΔKE.",
      },
      sources: [{ label: "OpenStax — İş–enerji teoremi", url: "https://openstax.org/books/university-physics-volume-1/pages/7-3-work-energy-theorem" }],
    },

    "dairesel-hareket": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Merkezcil ivme", "Hız vektörünün yön değişiminden doğan, çemberin merkezine yönelik a_c=v²/r=ω²r büyüklüğündeki ivme."],
        ["Açısal hız", "Birim zamanda taranan açı; düzgün dairesel harekette ω=v/r olup birimi rad/s'dir."],
        ["Periyot", "Bir tam turun süresi; T=2πr/v=2π/ω bağıntısıyla hesaplanır."],
      ],
      objective: "Sabit süratte bile hızın yön değişiminin ivme gerektirdiğini göstermek; F=mv²/r'yi ayrı bir kuvvet değil, sürtünme, gerilme veya kütleçekim gibi gerçek kuvvetlerin merkeze yönelik bileşkesi olarak yorumlamak.",
      prerequisite: "Vektör ve bileşen kavramı, Newton'un ikinci yasası, radyan ölçüsü ve çember çevresi 2πr.",
      why: "Dairesel hareket, ‘ivme = hızlanma’ sezgisini düzelten temel örnektir. Newton'un ikinci yasasını büyüklük kadar yön değişimine de uygulamayı öğretir.",
      realWorld: "Viraj ve yol eğimi tasarımı, santrifüj ayrıştırma, uydu yörüngeleri ve hızlandırıcılarda manyetik sapma aynı mv²/r talebine dayanır; talep karşılanmazsa cisim teğet doğrultusunda yoluna devam eder.",
      example: {
        title: "Düz virajda gereken sürtünme",
        prompt: "1200 kg'lık bir araç, yarıçapı 50 m olan eğimsiz bir virajı 20 m/s süratle dönüyor. Gereken merkezcil kuvvet ve en küçük statik sürtünme katsayısı nedir? (g=9,81 m/s²)",
        steps: [
          "Merkezcil ivmeyi hesapla: a_c=v²/r=(20 m/s)²/50 m=8,0 m/s².",
          "Gereken net yatay kuvvet F=m·a_c=1200 kg·8,0 m/s²=9600 N'dur; eğimsiz virajda bu kuvveti yalnız lastiklerle yol arasındaki statik sürtünme sağlar.",
          "μ_s·m·g ≥ m·v²/r koşulundan μ_s ≥ v²/(r·g)=400/(50·9,81)≈0,82 bulunur; kütle sadeleştiği için sonuç araç kütlesinden bağımsızdır.",
        ],
        result: "En az μ_s≈0,82 gerekir. Islak yolda μ_s≈0,5 ise aynı virajdaki güvenli üst sürat v=√(μ_s·g·r)=√(0,5·9,81·50)≈15,7 m/s (≈56 km/h) olur.",
      },
      experiment: {
        question: "Merkezcil ivme ve kuvvet sürat, yarıçap ve kütleye nasıl bağlıdır?",
        steps: [
          "Kütle m'yi 2 kg, Yarıçap r'yi 100 m yap; Hız v kaydırıcısını sırayla 3, 6 ve 12 m/s'ye getirip alt satırdaki a_c ve F_c değerlerini kaydet.",
          "Hızı 6 m/s'de tutup yarıçapı 60 ve 120 m yap; ardından yalnız kütleyi 2 kg'dan 10 kg'a çıkar ve a_c ile F_c'den hangisinin değiştiğini ayır.",
          "Duraklat düğmesiyle hareketi dondur; birkaç farklı konumda yeşil v okunun yarıçapa dik, kırmızı a_c okunun merkeze yönelik olduğunu doğrula, sonra Devam ile sürdür.",
        ],
        observe: "Beklenen a_c değerleri 0,09; 0,36 ve 1,44 m/s²'dir: sürat iki katına çıkınca ivme dört katına çıkar. r=60 m'de 0,60, r=120 m'de 0,30 m/s² okunur; kütle a_c'yi değil yalnız F_c'yi değiştirir. Ok uzunlukları ölçekli değildir; nicel karşılaştırmayı sayılardan yap.",
      },
      evidence: {
        claim: "Düzgün dairesel harekette net kuvvet merkeze yönelir ve büyüklüğü mv²/r'dir.",
        evidence: "Küçük Δt'de hız vektörü Δθ=ωΔt kadar döner; değişim Δv≈v·Δθ olup merkeze yöneliktir, bu yüzden Δv/Δt=v·ω=v²/r. İp koptuğunda cismin teğet doğrultusunda uzaklaşması, merkezcil etkinin bir etkileşimden geldiğini gösterir.",
        boundary: "Sürat değişiyorsa teğetsel ivme de vardır ve net ivme merkezi göstermez. Merkezkaç kuvveti yalnız dönen, eylemsiz olmayan çerçevede kullanılan sanal bir kuvvettir.",
      },
      misconception: ["Dönen cismi dışarı iten merkezkaç kuvveti, eylemsiz bir çerçevede de etkiyen gerçek bir kuvvettir.", "Sürat sabitse ivme sıfırdır; düzgün dairesel hareket ivmesiz bir harekettir."],
      modelLimit: "Yalnız düzgün dairesel hareket modellenir: sürat sabittir, teğetsel ivme yoktur ve merkezcil kuvvetin kaynağı (sürtünme, ip gerilmesi, kütleçekim) gösterilmez. Oklar ölçekli değildir: a_c oku yarıçapla orantılı çizilir, F ve v okları 90 pikselle sınırlanır. Açı her karede ω·0,04 kadar ilerletildiği için ekrandaki tur süresi kare hızına bağlıdır ve gösterilen T ile gerçek zamanda eşleşmez.",
      questions: ["İp koptuğu anda cisim neden merkezden radyal olarak değil teğet doğrultusunda uzaklaşır?", "Aynı ω ile dönen bir diskte a_c=v²/r ve a_c=ω²r ifadeleri yarıçap etkisini neden zıt gösteriyor gibi görünür?", "Düşey çemberde sürat sabit değilse en üst noktada ipin gerilmesini hangi kuvvetler belirler?"],
      check: {
        question: "Yarıçap ve kütle sabitken sürat iki katına çıkarılırsa gereken merkezcil kuvvet ne olur?",
        options: ["4 katına çıkar", "2 katına çıkar", "Değişmez"],
        answer: 0,
        explanation: "F=mv²/r olduğundan kuvvet süratin karesiyle orantılıdır: 2²=4.",
      },
      sources: [{ label: "OpenStax — Düzgün ve düzgün olmayan dairesel hareket", url: "https://openstax.org/books/university-physics-volume-1/pages/4-4-uniform-and-nonuniform-circular-motion" }],
    },

    "kepler-yasalari": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Eksantriklik", "Elipsin daireden sapmasını ölçen e=c/a oranı; e=0 daire, 0<e<1 kapalı elips yörüngedir."],
        ["Yarı büyük eksen", "Elipsin en uzun çapının yarısı; günberi ve günöte uzaklıklarının ortalaması a=(r_min+r_max)/2."],
        ["Açısal momentum korunumu", "Merkezî kuvvet tork üretmediği için L=m·r·v⊥ büyüklüğünün yörünge boyunca sabit kalması; ikinci yasanın fiziksel temeli."],
      ],
      objective: "Üç Kepler yasasını gözlemsel kurallar olarak ifade etmek ve her birini Newton'un ters kare kütleçekimi ile açısal momentum korunumuna bağlamak.",
      prerequisite: "Elips ve odak kavramı, üslü sayılar, oran–orantı, dairesel hareket ve açısal momentum fikri.",
      why: "Kepler yasaları, gözlem verisinden matematiksel düzenlilik çıkarıp sonra bunu daha temel bir yasayla açıklamanın tarihsel örneğidir; Newton kütleçekiminin en güçlü sınamalarından biri olmuştur.",
      realWorld: "Uydu yörünge tasarımı, gezegenler arası transfer yörüngeleri ve ötegezegen araştırmalarında yıldız kütlesinin periyot ile yörünge boyutundan kestirilmesi üçüncü yasaya dayanır.",
      example: {
        title: "Merkür'ün günberi ve günöte hızları",
        prompt: "Merkür için a=0,387 AU ve e=0,206'dır. Günberi ve günöte uzaklıklarını, bu iki noktadaki hız oranını ve yörünge periyodunu bul.",
        steps: [
          "Uç uzaklıkları hesapla: r_min=a(1−e)=0,387·0,794≈0,307 AU; r_max=a(1+e)=0,387·1,206≈0,467 AU.",
          "Bu iki noktada hız yarıçapa diktir; açısal momentum korunumundan r_min·v_max=r_max·v_min, yani v_max/v_min=r_max/r_min=1,206/0,794≈1,52.",
          "Güneş çevresinde yıl–AU biriminde T²=a³ olduğundan T=0,387^(3/2)≈0,241 yıl≈88 gün bulunur.",
        ],
        result: "Merkür günberide günötedekinden yaklaşık %52 hızlı hareket eder; periyot ise e'ye değil yalnız a'ya bağlıdır.",
      },
      experiment: {
        question: "Eksantriklik yörüngenin biçimini ve Güneş'e uzaklığı nasıl değiştirir; T²/a³ neden sabittir?",
        steps: [
          "Gezegen menüsünden Dünya'yı seç (e=0,017); ardından Eksantriklik (e) kaydırıcısını 0'dan 0,35'e götürüp kesikli yörünge çizgisinin basıklığını izle.",
          "e=0,35'te Duraklat düğmesiyle hareketi durdur; Günberi ve Günöte etiketlerini bul ve r_max/r_min=(1+e)/(1−e)=1,35/0,65≈2,1 oranını hesapla.",
          "Menüden sırayla Merkür, Venüs, Dünya ve Mars'ı seç; sol üstteki a ve T değerlerini kaydet, T=a^(3/2) yıl hesabıyla karşılaştır (Mars: 1,524^1,5≈1,88 yıl) ve gezegenlerin aynı boyutta çizilen yörüngeyi neden farklı hızlarda dolandığını açıkla.",
        ],
        observe: "b/a=√(1−e²) olduğundan e=0,35'te bile küçük eksen büyük eksenin yaklaşık %94'üdür; yörünge daireye benzer ama Güneş merkezden a·e kadar kaymıştır. Turkuaz taranan alan biçim değiştirse de her an elipsin sekizde biridir; sol üstteki v değeri günberide en büyük olur. T²/a³ kutusu yıl–AU biriminde her gezegende 1'dir.",
      },
      evidence: {
        claim: "Kepler'in üç yasası, ters kare merkezî kütleçekim kuvveti altındaki iki cisim probleminin çözümünden türetilebilir.",
        evidence: "Alan hızı dA/dt=L/(2m) olduğundan her merkezî kuvvette sabittir; 1/r² kuvveti konik kesit yörüngeler ve T²=4π²a³/(GM) bağıntısını verir. Tycho Brahe'nin Mars verileri ve modern yörünge ölçümleri bu öngörülerle uyuşur.",
        boundary: "Üçüncü yasadaki sabit merkezdeki kütleye bağlıdır (kesin biçimde G(M+m)); Jüpiter'in uyduları için oran farklıdır. Gezegenler arası çekim ve genel görelilik, örneğin Merkür'ün günberi kayması gibi küçük sapmalar üretir.",
      },
      misconception: ["Mevsimler Dünya'nın Güneş'e uzaklığının değişmesinden kaynaklanır; günberide yaz yaşanır.", "Gezegen yörüngesi boyunca sabit süratle dolanır; eşit zamanlarda eşit yay uzunlukları alır."],
      modelLimit: "Güneş sabit odakta tutulur; gezegen kütlesi ve gezegenler arası etkileşim yoktur. Konum Kepler denklemi M=E−e·sinE Newton yöntemiyle çözülerek bulunur; yani hareket kütleçekim kuvveti adım adım entegre edilerek değil, iki cisim probleminin analitik çözümünden çizilir. Bütün yörüngeler ekrana sığsın diye aynı piksel boyutunda gösterilir; gerçek boyut farkı yalnız a ve T değerlerinde görülür. Periyot T=a^(3/2) bağıntısından hesaplandığından T²/a³ kutusu üçüncü yasanın bağımsız ölçümü değil, uygulanmış hâlidir; e kaydırıcısı a ve T'yi değiştirmez.",
      questions: ["Günberi–günöte ışınım farkını (1+e)²/(1−e)² ile kestir; Dünya için bu fark mevsimleri açıklamaya yeter mi?", "Bir ötegezegenin periyodu ve yörünge boyutu biliniyorsa üçüncü yasadan yıldızın kütlesi nasıl bulunur?", "Alanlar yasası neden yalnız ters kare kuvvet için değil her merkezî kuvvet için geçerlidir?"],
      check: {
        question: "Yarı büyük ekseni 4 AU olan bir cismin Güneş çevresindeki periyodu kaç yıldır?",
        options: ["8 yıl", "16 yıl", "4 yıl"],
        answer: 0,
        explanation: "Yıl–AU biriminde T²=a³=64 olduğundan T=8 yıldır; 16 yıl a² ile karıştırmaktan doğar.",
      },
      sources: [{ label: "OpenStax — Kepler'in gezegen hareketi yasaları", url: "https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion" }],
    },

    "yay-kutle": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Geri çağırıcı kuvvet", "Cismi denge konumuna doğru çeken ve ideal yayda yer değiştirmeyle orantılı olan F=−k·x kuvveti."],
        ["Açısal frekans", "Salınımın faz değişim hızı; yay–kütlede ω=√(k/m) olup birimi rad/s'dir ve T=2π/ω ilişkisini verir."],
        ["Faz", "x=A·cos(ωt+φ) ifadesindeki ωt+φ açısı; konum ile hız arasında çeyrek periyotluk (π/2) faz farkı vardır."],
      ],
      objective: "Hooke yasasından basit harmonik hareket denklemine geçmek; periyodun kütle ve yay sabitine bağlılığını nicel olarak sınamak ve kinetik–potansiyel enerji alışverişini açıklamak.",
      prerequisite: "Newton'un ikinci yasası, kuvvet–uzama orantısı, sinüs ve kosinüs grafikleri, karekök ve kinetik enerji.",
      why: "Kararlı bir denge noktası çevresindeki küçük salınımların çoğu yaklaşık olarak harmoniktir; yay–kütle bu genel modelin en temiz örneğidir.",
      realWorld: "Araç süspansiyonları, binalardaki deprem yalıtıcıları, kuvars saat rezonatörleri, atomik kuvvet mikroskobu konsolları ve molekül titreşimlerinin harmonik yaklaşımı aynı ω=√(k/m) ilişkisini kullanır.",
      example: {
        title: "Periyot, en büyük hız ve enerji denetimi",
        prompt: "k=50 N/m olan ideal bir yaya bağlı 0,50 kg'lık cisim, A=0,10 m genlikle sürtünmesiz salınıyor. ω, T, en büyük hız ve toplam enerjiyi bul.",
        steps: [
          "ω=√(k/m)=√(50/0,50)=√100=10 rad/s; buradan T=2π/ω≈0,63 s ve f=1/T≈1,6 Hz bul.",
          "En büyük hız denge noktasından geçerken oluşur: v_max=A·ω=0,10 m·10 rad/s=1,0 m/s.",
          "Toplam enerjiyi uç noktada hesapla: E=½kA²=½·50·(0,10)²=0,25 J; denge noktasında ½m·v_max²=½·0,50·(1,0)²=0,25 J ile aynı çıktığını denetle.",
        ],
        result: "T≈0,63 s, v_max=1,0 m/s ve E=0,25 J'dür. İki farklı noktadan aynı enerjinin bulunması hesabın tutarlılık sınamasıdır; periyot hesabında A hiç kullanılmamıştır.",
      },
      experiment: {
        question: "Periyot kütle ve yay sabitine nasıl bağlıdır?",
        steps: [
          "Yay sabiti k=20 N/m iken Kütle m kaydırıcısını 1,0 kg ve 4,0 kg yap; üst satırdaki T değerlerini kaydet (beklenen ≈1,40 s ve ≈2,81 s).",
          "Kütleyi 1,0 kg'a döndür ve yay sabitini 20 N/m'den 80 N/m'ye çıkar; T'nin yaklaşık yarıya (≈0,70 s) indiğini kontrol et.",
          "Konum / hız grafiği kutusu işaretliyken Sıfırla düğmesine bas; x en büyükken v'nin sıfır, x sıfırdan geçerken |v|'nin en büyük olduğunu ve iki eğri arasındaki çeyrek periyotluk kaymayı gözle.",
        ],
        observe: "Kütleyi 4 katına çıkarmak periyodu 2 katına çıkarır, k'yı 4 katına çıkarmak yarıya indirir: T yalnız m/k oranına bağlıdır. m ve k aynı oranda değişirse ω değişmez. Bu sayfada genlik 0,8 m'de sabittir; genliğin periyodu etkilemediği öngörüsü ideal Hooke yayına aittir.",
      },
      evidence: {
        claim: "İdeal yay–kütle sisteminde periyot genlikten bağımsızdır.",
        evidence: "F=−kx ile m·x″=−kx denklemi elde edilir; çözüm x=A·cos(ωt+φ) olup ω=√(k/m) içinde A yer almaz. Yay doğrusal bölgede kaldıkça farklı genliklerle ölçülen periyotlar ölçüm belirsizliği içinde aynı çıkar.",
        boundary: "Büyük uzamalarda yay Hooke bölgesinden çıkar ve periyot genliğe bağlı hâle gelebilir. Yay kütlesi ihmal edilemezse etkin kütle yaklaşık m+m_yay/3 alınır; sürtünme genliği azaltır ve sönümlü salınım frekansını biraz düşürür.",
      },
      misconception: ["Genlik büyüdükçe ideal bir yayın salınım periyodu uzar.", "Denge noktasında net kuvvet sıfır olduğu için cisim orada durur."],
      modelLimit: "Sayfa hareket denklemini sayısal olarak çözmez; x=A·cos(ωt) analitik çözümünü çizer. Genlik 0,8 m'de sabittir; sürtünme ve sönüm, yay kütlesi ve yerçekimi yoktur (yatay, ideal yay). Zaman her karede 0,016 s ilerletildiği için ekrandaki salınım hızı tarayıcının kare hızına bağlıdır; periyodu üst satırdaki T değerinden oku. Kaydırıcı değiştiğinde t sıfırlanır.",
      questions: ["Aynı yay düşey asıldığında periyot değişir mi; denge konumunun mg/k kadar kayması neyi değiştirir?", "Bir yayı iki eşit parçaya kesersen her parçanın yay sabiti ve aynı kütleyle periyot nasıl değişir?", "Sönüm eklendiğinde mekanik enerji–zaman grafiği nasıl görünür ve enerji nereye gider?"],
      check: {
        question: "Yay sabiti sabitken kütle 4 katına çıkarılırsa periyot ne olur?",
        options: ["2 katına çıkar", "4 katına çıkar", "Yarıya iner"],
        answer: 0,
        explanation: "T=2π√(m/k) olduğundan periyot kütlenin kareköküyle orantılıdır: √4=2.",
      },
      sources: [{ label: "OpenStax — Basit harmonik hareket", url: "https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion" }],
    },

    "manyetik-alan": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Manyetik alan", "Hareketli yüklere F=q·v×B kuvveti uygulayan, tesla (T) birimiyle ölçülen vektör alan."],
        ["Sarım yoğunluğu", "Bobinin birim uzunluğundaki sarım sayısı n=N/L; solenoid alanını akımla birlikte belirler."],
        ["Manyetik geçirgenlik", "Ortamın manyetik alana yanıtını gösteren nicelik; boşlukta μ₀=4π×10⁻⁷ T·m/A'dır, demir gibi çekirdekler alanı μ_r kadar artırır."],
      ],
      objective: "Uzun bir solenoidin içindeki alanı akım, sarım sayısı ve bobin uzunluğuyla nicel olarak ilişkilendirmek; tesla ve militesla birimleriyle büyüklük karşılaştırması yapmak.",
      prerequisite: "Elektrik akımı, doğru orantı, bilimsel gösterim, birim çevirme (1 mT=10⁻³ T) ve alan kavramı.",
      why: "Elektromıknatıs, elektrik akımını açılıp kapatılabilen ve büyüklüğü ayarlanabilen bir manyetik alana dönüştürür; elektrik ile manyetizma arasındaki bağın en doğrudan uygulamasıdır.",
      realWorld: "Röle ve kontaktörler, hoparlörler, hurda vinçleri ve motorlar bobin alanını kullanır; MR cihazlarında süperiletken solenoidler yaklaşık 1,5–3 T alan üretir.",
      example: {
        title: "Hava çekirdekli solenoidin alanı",
        prompt: "Uzunluğu 0,10 m olan 200 sarımlı uzun bir solenoidden 2,0 A akım geçiyor. İçerideki manyetik alan kaç mT'dir?",
        steps: [
          "Sarım yoğunluğunu bul: n=N/L=200/0,10 m=2000 sarım/m.",
          "B=μ₀·n·I bağıntısını kullan: B=(4π×10⁻⁷ T·m/A)·(2000 m⁻¹)·(2,0 A).",
          "B≈5,03×10⁻³ T≈5,0 mT bul.",
        ],
        result: "Bu alan, Dünya'nın yüzeydeki yaklaşık 25–65 μT'lik alanından kabaca 100 kat büyüktür. Demir çekirdek alanı çok artırabilir, ancak doyum nedeniyle sınırsız değil.",
      },
      experiment: {
        question: "Bobin alanı akıma ve sarım sayısına nasıl bağlıdır?",
        steps: [
          "Elektromıknatısı Aç/Kapat düğmesiyle mıknatısı aç; Sarım Sayısı 10'dayken Akım (A) kaydırıcısını 5, 10 ve 20 A yapıp bilgi panelindeki B değerlerini kaydet.",
          "Akımı 5 A'da tutup Sarım Sayısı kaydırıcısını 10'dan 20'ye ve 40'a çıkar; B'nin aynı oranda artıp artmadığını kontrol et.",
          "N·I çarpımı aynı olan iki ayarı karşılaştır (N=10, I=20 A ve N=40, I=5 A); alan–zaman grafiğinde değişimin anlık bir basamak olarak çizildiğine dikkat et.",
        ],
        observe: "N=10 için yaklaşık 0,31; 0,63 ve 1,26 mT okunur; B, N·I çarpımıyla doğru orantılıdır ve aynı N·I aynı alanı verir. Sayfa bobin uzunluğunu 0,2 m'de sabit tutar. Gerçek bir bobinde öz-indüktans nedeniyle akım ve alan anında değil, direnç ve indüktansa bağlı bir zaman sabitiyle yükselir.",
      },
      evidence: {
        claim: "İdeal uzun solenoidin içinde alan yaklaşık düzgündür ve B=μ₀nI ile verilir; dışarıdaki alan çok zayıftır.",
        evidence: "Ampère yasası, solenoidin içinden ve dışından geçen dikdörtgen bir kapalı yol için B·ℓ=μ₀(nℓ)I verir. Hall sondasıyla ölçülen merkez alanı, hava çekirdekli bobinde akımla doğrusal artar.",
        boundary: "Formül uzunluğu yarıçapından çok büyük bobinler içindir; uzun bir solenoidin ucunda eksen üzerindeki alan merkezdekinin yaklaşık yarısıdır. Demir çekirdekte B–I ilişkisi doyum ve histerezis yüzünden doğrusal değildir.",
      },
      misconception: ["Manyetik alan çizgileri kuzey kutbunda başlar, güney kutbunda biter.", "Daha çok sarım her zaman daha güçlü alan demektir; sarımların bobin boyunca ne kadar sık olduğu önemli değildir."],
      modelLimit: "Sayfa B=μ₀NI/L ideal uzun solenoid formülünü kullanır; bobin uzunluğu 0,2 m'de sabit, çekirdek hava (μ_r=1) kabul edilir. Uç etkileri, alanın uzaydaki dağılımı, öz-indüktansın akımı geciktirmesi, direnç ve ısınma modellenmez; açma ve kaydırıcı değişimleri alanı anında değiştirir. Kanvas alan çizgilerini değil yalnız sarımları simgesel olarak çizer.",
      questions: ["Bobinin içine demir çubuk konduğunda alan neden artar ve neden belirli bir değerden sonra artmaz?", "Aynı uzunlukta tel ile daha güçlü bir alan için bobini sık ve kısa mı, seyrek ve uzun mu sarmalısın?", "Akım yönü ters çevrilirse B'nin büyüklüğü ve yönü ne olur; sağ el kuralıyla kutupları nasıl belirlersin?"],
      check: {
        question: "Bobin uzunluğu sabitken akım 2 katına, sarım sayısı 3 katına çıkarılırsa içerideki B ne olur?",
        options: ["6 katına çıkar", "5 katına çıkar", "Değişmez"],
        answer: 0,
        explanation: "B=μ₀NI/L olduğundan alan N·I çarpımıyla orantılıdır: 2·3=6.",
      },
      sources: [{ label: "OpenStax — Solenoidler ve toroidler", url: "https://openstax.org/books/university-physics-volume-2/pages/12-6-solenoids-and-toroids" }],
    },

    "dna-replikasyon": {
      revision: "31 Ekim 2026",
      concepts: [
        ["Yarı korunumlu eşlenme", "Her yeni çift sarmalın bir eski kalıp zincir ile bir yeni sentezlenmiş zincirden oluştuğu kopyalama biçimi."],
        ["Antiparalellik", "Çift sarmaldaki iki zincirin şeker–fosfat omurgalarının zıt yönlerde, biri 5′→3′ diğeri 3′→5′ olacak biçimde uzanması."],
        ["Okazaki parçası", "Geciken zincirde, sentez yönü çatalın ilerleyişine ters düştüğü için her biri ayrı bir RNA primerinden başlayarak üretilen kısa DNA parçası."],
      ],
      objective: "Replikasyon çatalındaki enzimlerin görev sırasını açıklamak; DNA polimerazın 5′→3′ sentez kısıtının öncü ve geciken zincir farkını nasıl doğurduğunu gerekçelendirmek.",
      prerequisite: "Nükleotit yapısı (deoksiriboz, fosfat, baz), tamamlayıcı baz eşleşmesi, hidrojen bağı ve enzimin katalizör rolü.",
      why: "Her hücre bölünmesinde milyonlarca ya da milyarlarca baz çiftinin çok düşük hata oranıyla kopyalanması kalıtımın temelidir. DNA polimerazın yalnız 5′→3′ yönde ve hazır bir 3′-OH ucundan uzatabilmesi çatalın bütün düzenini belirler.",
      realWorld: "PCR; ısıyla zincir ayırma, primer bağlanması ve ısıya dayanıklı DNA polimerazla uzatma adımlarını tekrarlar. 3′-OH grubu taşımayan zincir sonlandırıcılar uzamayı durdurur: AZT bu ilkeyle HIV tedavisinde, dideoksinükleotitler Sanger dizilemesinde kullanılır.",
      example: {
        title: "Tamamlayıcı zinciri yön ve bağ sayısıyla yazmak",
        prompt: "Sayfadaki kalıp dizisi 5′-ATGCGATACGTA-3′ ise yeni zinciri 5′→3′ yönünde yaz ve oluşan çift sarmal bölümündeki hidrojen bağlarını say.",
        steps: [
          "Eşleşme kuralını her konuma uygula (A↔T, G↔C): kalıbın karşısına 3′-TACGCTATGCAT-5′ gelir.",
          "Zincirler antiparalel olduğundan yeni zinciri 5′→3′ yazmak için ters çevir: 5′-TACGTATCGCAT-3′. Polimeraz kalıbı 3′→5′ yönünde okur ve yeni zinciri 3′ ucundan uzatır.",
          "Çiftleri say: 4 A + 3 T kalıp bazı 7 A–T çifti, 3 G + 2 C kalıp bazı 5 G–C çifti verir; 7·2 + 5·3 = 29 hidrojen bağı ve GC oranı 5/12 ≈ %41,7 olur.",
        ],
        result: "Baz sırası kalıp tarafından, zincir yönü ise omurganın kimyasal yapısı tarafından belirlenir. GC oranı arttıkça çift sarmalı ayırmak genellikle zorlaşır; bu kararlılığa hidrojen bağları kadar baz istiflenme etkileşimleri de katkı verir.",
      },
      experiment: {
        question: "Animasyonun aşamaları gerçek replikasyon çatalının hangi olaylarını gösteriyor, hangilerini atlıyor?",
        steps: [
          "“1. Açılma” düğmesine bas; kalıp ipliklerin birbirinden uzaklaştığını gözle ve üst ile alt sıradaki 12 bazı uç etiketleriyle (üstte 5′→3′, altta 3′→5′) birlikte not et. Ardından “2. Primer” düğmesine bas; mor RNA primerlerinin üstte sağ uçta, altta sol uçta, yani her kalıbın 3′ ucunun karşısında belirdiğini ve primeri yapan enzimi kaydet.",
          "“3. Sentez” düğmesine bas; üstteki yeni ipliğin sağdan sola, alttakinin soldan sağa büyüdüğünü izle. Her yeni bazın karşısındaki kalıp bazının tamamlayıcısı (A↔T, G↔C) olduğunu denetle ve iki “DNA Pol III” okunun da yeni ipliğin 3′ ucuna doğru gösterdiğini yeşil uç etiketleriyle doğrula.",
          "“4. Tamamlanma” düğmesine bas ya da “Oynat” ile adımları sırayla izle; primer işaretlerinin kaybolduğunu ve her çift sarmalda bir gri (eski) ile bir yeşil (yeni) iplik kaldığını gör. Okazaki parçaları ve ligaz gibi gösterilmeyen olayları listele.",
        ],
        observe: "Animasyonda iki yeni zincir zıt yönlerde ama ikisi de kesintisiz büyür. Gerçek bir çatalda yalnız öncü zincir çatalın ilerleyişiyle aynı yönde ve kesintisiz uzar; geciken zincir Okazaki parçaları hâlinde üretilir. Bakterilerde RNA primerleri DNA polimeraz I ile çıkarılıp DNA ile doldurulur ve parçalar DNA ligaz ile birleştirilir.",
      },
      evidence: {
        claim: "DNA eşlenmesi yarı korunumludur.",
        evidence: "Meselson ve Stahl (1958), ¹⁵N ortamında üretilip ¹⁴N ortamına aktarılan E. coli DNA'sının yoğunluk gradyanında bir kuşak sonra tek bir ara (hibrit) bant, iki kuşak sonra eşit miktarda hibrit ve hafif bant verdiğini gösterdi.",
        boundary: "Bu deney kopyalama biçimini ayırt eder, enzim mekanizmasını göstermez. Ökaryotlarda polimeraz seti farklıdır: Pol α–primaz sentezi başlatır, öncü zinciri çoğunlukla Pol ε, geciken zinciri çoğunlukla Pol δ uzatır.",
      },
      misconception: ["DNA polimeraz zinciri her iki yönde uzatabildiği için iki yeni zincir de kesintisiz sentezlenir.", "DNA polimeraz sentezi kendi başına başlatabilir; primere gerek yoktur."],
      modelLimit: "Animasyon 12 bazlık düz bir merdiven kullanır; sarmal yapı, ilerleyen Y biçimli çatal, topoizomeraz, tek zincir bağlayıcı proteinler ve Okazaki parçaları gösterilmez. İki kalıp aynı anda bütünüyle açılır ve her yeni iplik tek primerden kesintisiz uzar; bu yüzden öncü–geciken iplik farkı görülmez. Primerin DNA ile değiştirilmesi ve ligaz yalnız tamamlanma adımında primer işaretinin kaybolmasıyla temsil edilir; yalnız bakteri enzim adı (DNA Pol III) kullanılır.",
      questions: ["Helikaz çatalı soldan sağa açsaydı, sayfadaki iki yeni iplikten hangisi öncü, hangisi geciken iplik olurdu? Kendi çizimini yaparak gerekçelendir.", "Doğrusal kromozomda geciken zincirin en ucundaki son primer çıkarıldığında hangi sorun doğar ve telomeraz bunu nasıl telafi eder?", "Polimerazın 3′→5′ ekzonükleaz (düzeltme) etkinliği hata oranını neden düşürür ama sıfırlamaz?"],
      check: {
        question: "Geciken zincir neden Okazaki parçaları hâlinde sentezlenir?",
        options: ["DNA polimeraz yalnız 5′→3′ yönde uzatabildiği ve bu zincirde o yön çatalın ilerleyişine ters düştüğü için", "Helikaz bu zinciri daha yavaş açtığı için", "Geciken zincirde A–T yerine A–U eşleşmesi kullanıldığı için"],
        answer: 0,
        explanation: "Antiparalel kalıplardan birinde yeni zincir çatalla aynı yönde sürekli uzar; diğerinde çatal açıldıkça yeniden primer bağlanır ve kısa parçalar geriye doğru sentezlenip sonra ligazla birleştirilir.",
      },
      sources: [{ label: "OpenStax — DNA eşlenmesi", url: "https://openstax.org/details/books/biology-2e" }],
    },
  };
})(window);
