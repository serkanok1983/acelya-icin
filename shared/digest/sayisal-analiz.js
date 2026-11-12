window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["sayisal-analiz"] = {
  slug: "sayisal-analiz",
  title: "Sayısal Analiz: Yaklaşık Hesabın Kesin Bilimi",
  field: "Matematik",
  level: "Lisans",
  minutes: 40,
  tagline:
    "Bilgisayar 0,1 + 0,2'yi 0,3 bulmaz; ama hatasının ne kadar olacağını önceden söyleyebilir. Kök bulmadan integrale, yaklaşık hesabın hatasını ölçen ve evcilleştiren matematik.",
  hook:
    "Tarayıcına 0.1 + 0.2 yazarsan 0.30000000000000004 cevabını alırsın. Bir hata mı? Hayır: dünyadaki hemen her bilgisayarın uyduğu bir sözleşmenin, tam olarak öngörülen sonucu. Asıl soru şu: her işlemde biraz yanılan bir makine nasıl olur da bir uzay aracının yörüngesini güvenle hesaplar? Cevap, hatanın ne kadar olacağını işlem yapılmadan önce bilmekte.",
  bigIdea:
    "Sayısal analiz yanlışsız hesap yapmayı değil, <strong>hatayı ölçmeyi ve sınırlamayı</strong> öğretir: her yöntemin bir yakınsama mertebesi, her makinenin bir yuvarlama birimi vardır ve iyi algoritma bu ikisini dengeleyendir.",
  story: [
    "Yale Üniversitesi'nin Babil koleksiyonundaki küçük bir kil tablet, YBC 7289, MÖ 1800 ile 1600 arasına tarihlenir. Bir karenin köşegenine altmışlık tabanda 1;24,51,10 yazılmıştır: 1 + 24/60 + 51/60² + 10/60³ ≈ 1,41421296. Gerçek √2'den farkı yaklaşık 6 × 10⁻⁷, yani altı ondalık basamak doğru. Tableti yazan öğrencinin değeri bir sabitler tablosundan kopyaladığı düşünülür; Babillilerin bu değere hangi yolla vardığı ise kesin bilinmez. İskenderiyeli Heron'un <em>Metrica</em>'sında (MS 1.–2. yüzyıl) anlatılan yol ise bellidir: bir tahmin al, sayıyı tahmine böl, ikisinin ortalamasını yeni tahmin yap. Bugün buna Newton yöntemi diyoruz.",
    "Newton bu fikri 1669'da yazdığı <em>De analysi</em>'de polinom denklemlerine uyguladı; metin ancak 1711'de basıldı. Joseph Raphson 1690'da daha yalın bir tarif yayımladı; ikisi de yöntemi yalnız polinomlara uyguladı. Yöntemi bugünkü yinelemeli biçimiyle, genel doğrusal olmayan denklemler için kalkülüs diliyle ilk yazan 1740'ta Thomas Simpson'dı. Simpson'ın adı bir integral kuralına da verilmiştir, ama kural ondan önce Cavalieri ve Gregory tarafından da kullanılmıştı; Almanca konuşulan ülkelerde ona Kepler'in fıçı kuralı denir, çünkü Kepler onu 1615'te şarap fıçılarının hacmini ölçmek için türetmişti. Gauss 1814–1815'te yazdığı bir çalışmada düğümlerin yerini de serbest bırakarak çok daha keskin bir integral kuralı buldu; 1826'da Jacobi onu dik polinomlar diliyle yeniden kurdu.",
    "Yirminci yüzyılda sorun tersine döndü: artık yöntemler değil, makineler yanılıyordu. Her üreticinin kendi kayan nokta biçimi vardı ve aynı program farklı bilgisayarlarda farklı sonuç veriyordu. William Kahan'ın baş tasarımcısı olduğu <strong>IEEE 754</strong> standardı 1985'te bu kargaşaya son verdi: 64 bitlik bir sayının bitleri, yuvarlama kuralı, sonsuz ve NaN her yerde aynı oldu. Kahan 1989'da sayısal analize katkıları için Turing Ödülü'nü aldı. Kahan'ın adı bir de 1965'te yayımladığı, toplamanın kaybettiği basamakları geri kazanan küçük bir hileyle anılır (Ivo Babuška benzerini 1969'da bağımsız olarak buldu); bu sayfa onu milyonlarca terimle sınar.",
  ],
  core: [
    {
      heading: "Yakınsama mertebesi: her adımda kaç basamak?",
      body:
        "Bir yineleme köke yaklaşırken hata eₙ = |xₙ − r| nasıl küçülür? eₙ₊₁ ≈ C·eₙᵖ ise p <strong>yakınsama mertebesidir</strong>. p = 1'de (doğrusal) her adım hatayı sabit bir C < 1 oranıyla çarpar: ikiye bölmede C = 1/2, yani adım başına yaklaşık 0,3 ondalık basamak. p = 2'de (karesel) doğru basamak sayısı kabaca ikiye katlanır: 10⁻³ hatadan bir adımda 10⁻⁶ civarına, sonra 10⁻¹²'ye inilir. Bu yüzden ikiye bölme √2'yi makine duyarlığına 51 adımda bulurken Newton 6 adımda bulur. Mertebeyi ölçmenin yolu ardışık üç hatadan p ≈ ln(eₙ₊₁/eₙ)/ln(eₙ/eₙ₋₁) oranını hesaplamaktır; sayfa tam bunu yapar.",
      formula: "e<sub>n+1</sub> ≈ C·e<sub>n</sub><sup>p</sup>",
      formulaNote: "Log ölçekli hata grafiğinde p = 1 düz bir çizgi, p > 1 giderek dikleşen bir eğri verir.",
    },
    {
      heading: "Newton, kiriş ve sabit nokta: mertebeler nereden gelir?",
      body:
        "Newton adımı xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ), f'yi xₙ'deki teğetiyle değiştirir. f'yi kök r çevresinde Taylor'a açınca 0 = f(xₙ) + f′(xₙ)(r − xₙ) + ½f″(ξ)(r − xₙ)² çıkar; Newton adımını bundan çıkarmak eₙ₊₁ = [f″/(2f′)]·eₙ² verir: p = 2, C = |f″(r)/(2f′(r))|. Kiriş yöntemi türev yerine son iki noktadan geçen doğruyu kullanır; hata eₙ₊₁ ≈ C·eₙ·eₙ₋₁ biçimindedir ve eₙ₊₁ ∼ eₙᵖ denemesi p² = p + 1, yani p = φ = (1 + √5)/2 ≈ 1,618 verir. Sabit nokta yinelemesi xₙ₊₁ = g(xₙ) ise eₙ₊₁ ≈ |g′(r)|·eₙ ile doğrusal yakınsar; |g′(r)| < 1 şarttır ve g′(r) = 0 olursa mertebe sıçrar.",
      formula: "Newton: e<sub>n+1</sub> ≈ |f″/(2f′)|·e<sub>n</sub>² · kiriş: p = φ · sabit nokta: oran |g′(r)|",
      formulaNote: "Kiriş adım başına daha yavaştır ama türev istemez ve adımda tek fonksiyon değeri harcar.",
    },
    {
      heading: "Kuram ne zaman susar: döngü, katlı kök, ıraksama",
      body:
        "Newton'un ikinci mertebesi iki koşula bağlıdır: köke yakın başlamak ve f′(r) ≠ 0. Uzaktan başlarsan garanti yoktur. x³ − 2x + 2 için 0'daki teğet ekseni 1'de, 1'deki teğet 0'da keser: dizi sonsuza dek 0 → 1 → 0 diye döner. arctan x için |x₀| ≈ 1,3917'yi aşan her başlangıçta adımlar giderek büyüyerek kaçar. Çift kökte (f = (x − r)²h) f′(r) = 0 olur; Newton g(x) = x − f/f′ yinelemesine dönüşür ve g′(r) = 1 − 1/m bulunur: m katlı kökte mertebe 1'e, oran (m − 1)/m'ye düşer, çift kökte her adım hatayı yalnızca yarıya indirir. Üstelik f orada çok yassı olduğundan kök ancak √ε ≈ 10⁻⁸ duyarlıkla belirlenebilir.",
      formula: "m katlı kökte Newton: e<sub>n+1</sub> ≈ (m − 1)/m · e<sub>n</sub>",
      formulaNote: "Katlılık biliniyorsa xₙ₊₁ = xₙ − m·f/f′ düzeltmesi karesel yakınsamayı geri getirir.",
    },
    {
      heading: "IEEE 754: 64 bitte bir gerçel sayı",
      body:
        "Bir <strong>double</strong> 1 işaret biti s, 11 üs biti E ve 52 kesir biti f taşır; normal bir sayının değeri (−1)ˢ × 1,f × 2^(E − 1023)'tür ve baştaki 1 saklanmadığından duyarlık 53 bittir. Her temel işlem tam sonucu en yakın double'a yuvarlar; göreli hata en çok <strong>birim yuvarlama</strong> u = 2⁻⁵³ ≈ 1,11 × 10⁻¹⁶ olur. Programlama dillerindeki <em>makine epsilonu</em> ise 1 ile ondan büyük ilk double arasındaki aralıktır: ε = 2⁻⁵² ≈ 2,22 × 10⁻¹⁶ = 2u. 0,1'in paydası 2'nin kuvveti olmadığından ikili açılımı sonsuz tekrarlar ve saklanan değer 0,1000000000000000055511…'dir; 0,1 + 0,2'nin 0,3'e en yakın double'dan bir ulp uzağa düşmesi bundandır. E = 0 alt normal sayılara, E = 2047 sonsuz ve NaN'e ayrılmıştır.",
      formula: "fl(a ∘ b) = (a ∘ b)(1 + δ), |δ| ≤ u = 2<sup>−53</sup>",
      formulaNote: "Bu tek eşitsizlik, kayan nokta hata çözümlemesinin temel aksiyomudur (alt ve üst taşma dışında).",
    },
    {
      heading: "Kesme mi yuvarlama mı: en iyi adım ve mertebeler",
      body:
        "İleri fark D₊ = (f(x + h) − f(x))/h'nin <strong>kesme hatası</strong> Taylor'dan h|f″|/2'dir; ama f'nin iki değeri yaklaşık ε|f| kadar yuvarlanmıştır ve fark h'ye bölünür: <strong>yuvarlama hatası</strong> ε|f|/h. Toplamı h·|f″|/2 + ε|f|/h en küçük h* = √(2ε|f|/|f″|) ≈ √ε'da olur ve en iyi hata da √ε ≈ 10⁻⁸ mertebesindedir. Merkezi farkta kesme h²|f‴|/6'dır, denge h* ∼ ∛ε ≈ 6 × 10⁻⁶'da kurulur ve hata ε^(2/3) ≈ 10⁻¹¹'e iner. Aynı mertebe dili integrale de geçer: n parçalı yamuk kuralının hatası n⁻², Simpson'ınki n⁻⁴'tür. m noktalı Gauss–Legendre kuralı düğümleri Legendre polinomu Pₘ'nin köklerine koyarak 2m − 1. dereceye kadar her polinomu tam integre eder; bileşik hâli n⁻²ᵐ hızla yakınsar.",
      formula: "E(h) ≈ T·h<sup>p</sup> + R/h, h* = (R/(pT))<sup>1/(p+1)</sup>",
      formulaNote: "p = 1 için h* ∝ ε^(1/2), p = 2 için ε^(1/3): yüksek mertebe daha büyük adım ve daha küçük en iyi hata demektir.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var ve her kartta ölçülen değer kuramın yanında durur. <strong>Kök bulma</strong> sekmesinde Hazır problem menüsü ve metin kutuları (f(x), Aralık başı a, Başlangıç x₀, Sabit nokta çarpanı λ) dört yöntemi aynı anda çalıştırır; tablo her yöntemin adım sayısını, ölçülen ve kuramsal p'sini ve oranını verir. <strong>Kayan nokta</strong> sekmesi bir sayının 64 bitini dokunulabilir düğmeler olarak gösterir; altta 0,1 + 0,2, yıkıcı sadeleşme ve dört toplama yöntemi bulunur. <strong>Sayısal türev</strong> sekmesinde Adım h kaydırıcısı 10⁻¹⁶ ile 1 arasında kayar; <strong>Sayısal integral</strong> sekmesinde Parça sayısı n ve Polinom derecesi kaydırıcıları vardır. Metin kutuları Enter ya da Hesapla ile uygulanır; R tuşu etkin sekmeyi varsayılana döndürür.",
    experiments: [
      {
        title: "Newton'u şaşırtmak: döngü ve çift kök",
        predict: "Newton her başlangıçtan köke gider mi? Çift kökte yine her adımda basamak sayısını ikiye katlar mı?",
        do: "Kök bulma sekmesinde Hazır problem menüsünden \"x³ − 2x + 2: Newton döngüsü\"nü seç ve karşılaştırma tablosuyla yineleme tablosuna bak. Sonra \"x³ − 3x + 2: çift kök\"ü seç.",
        observe: "İlkinde Newton \"döngü (dönem 2)\" der, dizi 0, 1, 0, 1 diye gider; aynı problemde ikiye bölme ve kiriş −1,7692923542386314 kökünü bulur. Çift kökte ikiye bölme hiç başlayamaz (f(a), f(b) aynı işaretli), Newton 30 adım sürer: oran 0,507 · kuram 0,500, ölçülen p ≈ 1. Kirişin oranı 0,627 · 0,618 (1/φ) olur, yuvarlama bandı 1,19 × 10⁻⁷'ye çıkar.",
        explain: "0'daki ve 1'deki teğetler ekseni birbirinin başlangıç noktasında keser; yerel bir yakınsama kuramı bunu yasaklamaz, çünkü 0 kökten uzaktır. Çift kökte f′(r) = 0 olur ve Newton adımı g′(r) = 1/2 olan doğrusal bir yinelemeye dönüşür. f kök çevresinde (x − 1)² gibi yassı olduğundan yuvarlama gürültüsü kökü yalnız √ε ≈ 10⁻⁸ duyarlıkla belirler.",
      },
      {
        title: "0,1 + 0,2 ve donan harmonik seri",
        predict: "Kayan noktada toplamanın sırası önemli mi? 1 + 1/2 + 1/3 + … float ile toplanırsa ne olur; seri ıraksadığına göre toplam büyümeye devam eder mi?",
        do: "Kayan nokta sekmesinde Toplanan a = 0,1 ve b = 0,2 iken farkı oku, sonra b'yi 0,7 yap. Aşağıda Terimler \"1/k (harmonik seri)\", Toplamanın duyarlığı float iken Terim sayısı N kaydırıcısını 7'ye (N = 10⁷) getir.",
        observe: "0,1 + 0,2 = 0,30000000000000004, 0,3'e en yakın double'dan +1 ulp; 0,1 + 0,7 = 0,7999999999999999, −1 ulp. N = 10⁷'de ileri toplam 15,403682708740234'te takılıp kalır (göreli hata 0,0774) ve durum satırı donmanın k = 2 097 152. terimde başladığını yazar; geri toplam 16,686031341552734 (5,56 × 10⁻⁴), Kahan 16,695310592651367 (5,02 × 10⁻⁸) verir.",
        explain: "Float'ta duyarlık 24 bittir. Toplam 8 ile 16 arasındayken ulp'si 2⁻²⁰'dir; 1/k bunun yarısına inince eklenen terim yuvarlanıp kaybolur. Bu tam 2²¹ = 2 097 152. terimde olur: 1/2²¹ ulp'nin tam yarısıdır ve eşitlikte yuvarlama çift olan komşuyu, yani toplamın kendisini seçer. Daha sonraki terimler daha da küçük olduğundan sonrası hiç işlemez. Küçükten büyüğe toplamak küçük terimleri önce birbirine ekler; Kahan ise kaybolan düşük bitleri c değişkeninde taşıyıp bir sonraki terime geri ekler.",
      },
      {
        title: "Küçük h her zaman iyi değil",
        predict: "eˣ'in x = 1'deki türevini ileri farkla bulurken h'yi 10⁻⁵'ten 10⁻⁸'e küçültürsen hata ne olur? Merkezi farkta?",
        do: "Sayısal türev sekmesinde varsayılan \"eˣ, x = 1\" ile Adım h kaydırıcısını önce −5'te bırak, sonra −8'e çek; grafikteki iki kola ve en iyi h satırlarına bak.",
        observe: "h = 10⁻⁵'te ileri farkın hatası 5,00 × 10⁻⁶, merkezininki 2,06 × 10⁻¹¹. h = 10⁻⁸'de ileri farkın hatası yaklaşık 3,7 × 10⁻⁹'a iyileşir, merkezi farkınki ise yaklaşık 1,9 × 10⁻⁹'a kötüleşir. Kesme kolunun eğimleri 1, 2 ve 4, yuvarlama kolununki −1'e yakındır; en iyi h ileri farkta yaklaşık 9 × 10⁻⁹ (model √(2ε) ≈ 2,1 × 10⁻⁸, √ε ≈ 1,5 × 10⁻⁸), merkezide yaklaşık 5,5 × 10⁻⁶ (model ∛(1,5ε) ≈ 6,9 × 10⁻⁶, ∛ε ≈ 6,1 × 10⁻⁶) çıkar.",
        explain: "Merkezi farkın kesme hatası h² ile gittiği için daha büyük bir h'de dengeye gelir; 10⁻⁸ onun için yuvarlama bölgesidir. İleri fark ise 10⁻⁸'de hâlâ dengesinin yakınındadır. Ölçülen h* modelden yaklaşık iki kat küçüktür, çünkü yuvarlama modeli en kötü durumu varsayar; sol koldaki rakamlar gürültüdür ve başka tarayıcıda biraz değişebilir.",
      },
      {
        title: "Simpson'ın sürprizi ve Runge'nin salınımı",
        predict: "Simpson kuralının hatası n⁻⁴ ile azalır. 4/(1 + x²)'nin [0, 1] integralinde (sonuç π) n'yi ikiye katlamak hatayı 16'da bire mi indirir? Ayrıca 1/(1 + 25x²)'yi daha yüksek dereceli polinomla interpolasyon her zaman daha iyi midir?",
        do: "Sayısal integral sekmesinde \"∫₀¹ 4/(1 + x²) dx = π\" seç ve Parça sayısı n'yi 16'ya (kaydırıcı 4) getir. Sonra Runge kutusunda Polinom derecesini 12'den 20'ye çıkar.",
        observe: "Simpson 33 fonksiyon değeriyle 3,141592653552836 bulur, hata 3,7 × 10⁻¹¹, ölçülen p 6,00; yamuk 6,5 × 10⁻⁴'te p = 2,00'dır. Runge kutusunda eşit aralıklı düğümlerin en büyük hatası 3,66'dan 59,8'e fırlar, Chebyshev düğümlerininki 0,0692'den 0,0153'e iner.",
        explain: "Simpson'ın baş hata terimi h⁴[f‴(1) − f‴(0)] ile orantılıdır. 4/(1 + x²) çift fonksiyon olduğundan tek türevleri 0'da sıfırdır; 1'de ise f‴, Im[(1 − i)⁻⁴] ile orantılıdır ve (1 − i)⁴ = −4 gerçel olduğundan o da sıfırdır. Baş terim kaybolur, sıradaki h⁶ terimi görünür (2 noktalı Gauss da 6,00 ölçer). Runge fonksiyonunun ±i/5'te karmaşık kutupları vardır; eşit aralıklı interpolasyon uçlarda patlar, uçlarda sıklaşan Chebyshev düğümleri ise hatayı ρ⁻ⁿ hızıyla küçültür; ρ = (1 + √26)/5 ≈ 1,2198 kutuplardan geçen Bernstein elipsinden gelir, sayfa 1,2174 ölçer.",
      },
    ],
  },
  wow: [
    {
      title: "3700 yıllık altı basamak",
      body:
        "YBC 7289 tabletindeki 1;24,51,10 değeri √2'yi 6 × 10⁻⁷ hatayla verir. Heron yöntemi 1'den başlayınca 1,5, 1,41666…, 1,4142156862745099 değerlerini üretir; üçüncü adımın hatası 2,1 × 10⁻⁶, dördüncününki 1,6 × 10⁻¹²'dir. Yani Babil katibinin sayısı, aynı yöntemin üçüncü ve dördüncü adımları arasında bir yerde durur.",
    },
    {
      title: "Üçte bir saniye, 600 metre",
      body:
        "25 Şubat 1991'de, Körfez Savaşı sırasında, Suudi Arabistan'ın Dhahran kentindeki bir Patriot hava savunma bataryası gelen bir Scud füzesini önleyemedi; füze bir kışlaya düştü ve 28 ABD askeri hayatını kaybetti. ABD hükümetinin incelemesi (GAO raporu) teknik nedeni zaman hesabında buldu: batarya 100 saattir kesintisiz çalışıyordu ve zamanı 24 bitlik sabit noktalı bir yazmaçta kesilerek saklanan 0,1 saniyeyle hesaplıyordu. Her tikteki küçük kesme hatası birikip hesaplanan zamanı yaklaşık üçte bir saniye kaydırmıştı; Scud'un hızında bu, yaklaşık 600 metrelik bir izleme hatası demekti. 0,1'in ikili tabanda sonlu yazılamaması burada da işin içindeydi.",
    },
    {
      title: "Üç nokta, beşinci derece",
      body:
        "Simpson kuralı üç noktayla kübik polinomlara kadar tam sonuç verir. Gauss aynı üç noktanın yerini de seçince beşinci dereceye kadar her polinomu tam integre eder: m noktayla 2m − 1. dereceye kadar. Sayfada ∫₀¹ eˣ dx için 8 parçalı 3 noktalı Gauss (24 fonksiyon değeri) 3,3 × 10⁻¹² hata verirken, 17 değerli Simpson 1,5 × 10⁻⁷'de kalır.",
    },
  ],
  worked: {
    title: "√2: Newton'un basamak katlaması",
    prompt:
      "f(x) = x² − 2 için Newton yöntemini x₀ = 1'den başlat. İlk dört adımı ve hataları hesapla, karesel yakınsamanın sabitini kuramla karşılaştır. Aynı duyarlık için ikiye bölmenin [1, 2] aralığında kaç adım gerektireceğini kestir. Kök bulma sekmesindeki varsayılan durum tam bu problemdir.",
    steps: [
      "Newton adımı f′(x) = 2x ile xₙ₊₁ = xₙ − (xₙ² − 2)/(2xₙ) = (xₙ + 2/xₙ)/2 olur: Heron'un \"tahmin ile 2/tahmin'in ortalaması\" kuralı. x₁ = (1 + 2)/2 = 1,5; x₂ = (1,5 + 1,3333…)/2 = 17/12 = 1,4166666666666667; x₃ = 577/408 = 1,4142156862745099; x₄ = 1,4142135623746899.",
      "Hatalar eₙ = |xₙ − √2|: e₀ = 0,414, e₁ = 0,0858, e₂ = 2,45 × 10⁻³, e₃ = 2,12 × 10⁻⁶, e₄ = 1,59 × 10⁻¹². Doğru basamak sayısı (−log₁₀ e) yaklaşık 1,1 → 2,6 → 5,7 → 11,8: her adımda kabaca ikiye katlanıyor.",
      "Kuramsal sabit C = |f″/(2f′)| = 2/(2·2√2) = 1/(2√2) ≈ 0,354. Sına: C·e₂² = 0,354 × (2,45 × 10⁻³)² ≈ 2,12 × 10⁻⁶ = e₃; C·e₃² ≈ 1,59 × 10⁻¹² = e₄. Sayfanın tablosu ölçülen sabiti 0,353, kuramı 0,354 olarak verir; ölçülen p = 1,984.",
      "İkiye bölme her adımda aralığı yarıya indirir: k adımda genişlik 2⁻ᵏ. Durma eşiği yaklaşık 4ε·√2 ≈ 1,3 × 10⁻¹⁵ olduğuna göre 2⁻ᵏ ≤ 1,3 × 10⁻¹⁵ için k ≥ log₂(7,9 × 10¹⁴) ≈ 49,5, yani yaklaşık 50 adım. Sayfa 51 adım sayar; ölçülen oran 0,516 (kuram 0,500).",
      "Bedel karşılaştırması: Newton her adımda f ve f′'yü, toplam 12 değer hesapladı; ikiye bölme 51 fonksiyon değeri harcadı. Beşinci Newton adımı zaten tam √2'ye (1,4142135623730951) iner; sonrası yuvarlama bandının (3,22 × 10⁻¹³) içindedir ve mertebe ölçümüne katılmaz.",
    ],
    result:
      "Newton 1'den başlayıp 4 adımda 1,6 × 10⁻¹² hataya, 6 adımda makine duyarlığına iner; sabit C ≈ 1/(2√2) = 0,354. İkiye bölme aynı iş için yaklaşık 50 adım ister. Karesel yakınsama \"biraz daha hızlı\" değil, bambaşka bir ölçektir.",
  },
  misconceptions: [
    {
      myth: "0,1 + 0,2 = 0,30000000000000004 sonucu JavaScript'in ya da işlemcinin bir hatasıdır.",
      truth:
        "Sonuç IEEE 754'ün tam olarak öngördüğü şeydir. 0,1 ve 0,2 ikili tabanda sonlu yazılamaz, en yakın double'lara yuvarlanır; toplamları da doğru yuvarlanır ama 0,3'e en yakın double'dan bir ulp uzağa düşer. Python, C ve Java'da da aynı sonuç çıkar. Sayfada Toplanan b'yi 0,7 yapınca hatanın bu kez aşağı yönde olduğunu görürsün.",
    },
    {
      myth: "Sayısal türevde h ne kadar küçükse sonuç o kadar doğrudur.",
      truth:
        "Yalnızca kesme hatası küçülür. h küçüldükçe f(x + h) ile f(x) birbirine yaklaşır ve farkları yuvarlama gürültüsünde boğulur; bu hata ε/h ile büyür. İleri fark için en iyi h √ε ≈ 10⁻⁸ civarıdır; h = 10⁻¹⁶'da x + h çoğu zaman x'in kendisine yuvarlanır ve türev sıfır ya da anlamsız çıkar.",
    },
    {
      myth: "Newton yöntemi her zaman karesel yakınsar.",
      truth:
        "Yalnızca basit bir köke yeterince yakın başlarsa. Katlı kökte mertebe 1'e düşer, uzak başlangıçta dizi döngüye girebilir (x³ − 2x + 2'de 0 → 1 → 0) ya da ıraksayabilir (arctan x'te |x₀| > 1,3917). Sağlam yazılımlar bu yüzden Newton'u ikiye bölme gibi bir güvenlik ağıyla birlikte kullanır.",
    },
    {
      myth: "İnterpolasyon polinomunun derecesini artırmak yaklaşımı her zaman iyileştirir.",
      truth:
        "Eşit aralıklı düğümlerde tersi olabilir: Runge'nin 1901'de gösterdiği gibi 1/(1 + 25x²) için hata derece arttıkça uçlarda büyür (sayfada derece 20'de 59,8). Düğümleri uçlarda sıklaştırmak, örneğin Chebyshev düğümleri, hatayı geometrik hızla küçültür.",
    },
  ],
  glossary: [
    { term: "Yakınsama mertebesi (p)", definition: "eₙ₊₁ ≈ C·eₙᵖ ilişkisindeki üs; p = 1 doğrusal, p = 2 karesel yakınsamadır." },
    { term: "Birim yuvarlama (u)", definition: "En yakına yuvarlamada tek bir işlemin en büyük göreli hatası; double için u = 2⁻⁵³ ≈ 1,11 × 10⁻¹⁶." },
    { term: "Makine epsilonu (ε)", definition: "1 ile ondan büyük ilk kayan noktalı sayı arasındaki fark; double için ε = 2⁻⁵² ≈ 2,22 × 10⁻¹⁶ = 2u." },
    { term: "Ulp", definition: "Bir kayan noktalı sayının yanındaki komşusuna uzaklığı (unit in the last place); sayının büyüklüğüyle birlikte büyür." },
    { term: "Yıkıcı sadeleşme", definition: "Birbirine çok yakın, önceden yuvarlanmış iki sayının çıkarılması; ortak baş basamaklar silinir, geriye çoğunlukla yuvarlama hatası kalır." },
    { term: "Kesme hatası", definition: "Sonsuz bir süreci (Taylor serisi, limit, integral) sonlu bir adımda kesmekten doğan hata; h ya da n'nin bir kuvvetiyle ölçeklenir." },
    { term: "Richardson ekstrapolasyonu", definition: "Hatanın h'ye bağlı biçimini bilip iki farklı adımdaki sonucu birleştirerek baş hata terimini yok etme; ör. (4D(h/2) − D(h))/3." },
    { term: "Gauss–Legendre kuralı", definition: "Düğümleri Legendre polinomunun kökleri olan m noktalı integral kuralı; 2m − 1. dereceye kadar polinomları tam integre eder." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın konuları, mühendislik ve fen fakültelerinde genellikle ikinci yılda okutulan <strong>Sayısal Analiz</strong> (ya da Sayısal Yöntemler) dersinin ilk yarısıdır. Kalkülüs I'deki Taylor teoremi burada iş aracına dönüşür: her hata formülü, kesilen ilk terimin bir tahminidir. Dersin geri kalanında <strong>Doğrusal Cebir</strong> ile birleşen konular gelir: Gauss eliminasyonu ve LU ayrışımı, koşul sayısı (problemin kendisinin girdideki hatayı ne kadar büyüttüğü), en küçük kareler ve özdeğer algoritmaları. <strong>Diferansiyel Denklemler</strong> dersindeki Euler ve Runge–Kutta yöntemleri de aynı mertebe diliyle çözümlenir.",
      "İki fikir bütün alanı taşır. Birincisi <strong>geriye doğru hata</strong>: bir algoritma, verilen problemin değil de ona çok yakın bir problemin tam cevabını veriyorsa kararlıdır; James Wilkinson'ın 1960'larda geliştirdiği, Kahan'ın sürdürdüğü kayan nokta hata çözümlemesi bu bakışla kuruldu. İkincisi <strong>yaklaşım kuramı</strong>: Chebyshev polinomları, Bernstein elipsi ve karmaşık kutuplar, hangi fonksiyonun ne hızla yaklaşılabileceğini söyler. Makine öğrenmesindeki gradyan inişinden hava tahmini modellerine kadar büyük hesapların güvenilirliği bu iki fikirle sınanır.",
    ],
    topics: ["Sayısal Analiz", "Koşul sayısı ve kararlılık", "Sayısal doğrusal cebir", "Runge–Kutta yöntemleri", "Romberg integrali", "Yaklaşım kuramı", "Euler–Maclaurin formülü"],
  },
  quiz: [
    {
      question: "Newton yöntemi basit bir kökte hatayı 10⁻⁴ düzeyine getirmiş ve C = |f″/(2f′)| ≈ 1. Bir sonraki adımdan sonra hata yaklaşık ne olur? Aynı fonksiyonun çift kökünde, 10⁻⁴'ten bir adım sonra?",
      options: ["Basit kökte 10⁻⁵, çift kökte 10⁻⁵", "Basit kökte 10⁻⁸, çift kökte 5 × 10⁻⁵", "Basit kökte 10⁻⁸, çift kökte 10⁻⁸", "Basit kökte 5 × 10⁻⁵, çift kökte 10⁻⁸"],
      answer: 1,
      explanation: "Basit kökte eₙ₊₁ ≈ C·eₙ² = (10⁻⁴)² = 10⁻⁸: doğru basamak sayısı 4'ten 8'e çıkar. Çift kökte f′(r) = 0 olduğundan yakınsama doğrusala düşer ve oran (m − 1)/m = 1/2'dir: hata yalnızca yarıya, 5 × 10⁻⁵'e iner. Sayfadaki çift kök probleminde oran 0,507 ölçülür.",
    },
    {
      question: "Merkezi fark (f(x + h) − f(x − h))/(2h) ile bir türev hesaplıyorsun. h'yi 10 kat küçültüyorsun. Kesme hatasının baskın olduğu bölgede ve yuvarlama hatasının baskın olduğu bölgede toplam hata ne olur?",
      options: ["Her iki bölgede de 10 kat azalır", "Kesme bölgesinde 100 kat azalır, yuvarlama bölgesinde 10 kat artar", "Kesme bölgesinde 10 kat azalır, yuvarlama bölgesinde 100 kat artar", "Kesme bölgesinde 100 kat azalır, yuvarlama bölgesinde değişmez"],
      answer: 1,
      explanation: "Kesme hatası h²|f‴|/6 ile gider: h/10 hatayı 100'de bire indirir. Yuvarlama hatası ε|f|/h gibidir: h/10 onu 10 kat büyütür. Log–log grafikte bu, sağda eğimi 2, solda eğimi −1 olan iki koldur; en iyi h ikisinin kesiştiği ∛ε ≈ 6 × 10⁻⁶ civarındadır.",
    },
    {
      question: "∫₀¹ eˣ dx'i bileşik Simpson kuralıyla n = 8 parçada hesaplayınca hata 1,5 × 10⁻⁷ çıkıyor. n = 16'da hata yaklaşık ne olur?",
      options: ["7,5 × 10⁻⁸", "3,7 × 10⁻⁸", "9 × 10⁻⁹", "1,5 × 10⁻¹⁴"],
      answer: 2,
      explanation: "Simpson'ın hatası h⁴ ∝ n⁻⁴ ile ölçeklenir; n'yi ikiye katlamak hatayı 2⁴ = 16'da bire indirir: 1,5 × 10⁻⁷/16 ≈ 9 × 10⁻⁹. Sayfa n = 16'da 9,1 × 10⁻⁹ ölçer. Yamuk kuralında (n⁻²) aynı adım hatayı yalnızca dörtte bire indirirdi.",
    },
  ],
  next: [
    { href: "turev.html", title: "Türev: Kesenden Teğete (Limit Laboratuvarı)", why: "Sayısal türevin dayandığı kesen-teğet limiti; yuvarlamasız, saf matematik hâliyle h → 0." },
    { href: "riemann-toplamlari.html", title: "Riemann Toplamları ve Sayısal İntegral", why: "Dikdörtgenlerden yamuğa ve Simpson'a giden yol; Hata ve yakınsama hızı sekmesinde mertebeler ve bir de Monte Carlo integrali." },
    { href: "taylor-serisi.html", title: "Taylor Serisi: Fonksiyonları Polinomlarla Yakalamak", why: "Her hata formülünün kaynağı olan seri; Yakınsaklık yarıçapı sekmesi, Runge olgusundaki karmaşık kutupların bir başka yüzü." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa", why: "Aynı mertebe fikri bu kez zaman adımında: Euler ile RK4'ün hata mertebeleri log–log grafikte ölçülür." },
  ],
  sources: [
    { title: "Wikipedia · Newton's method", url: "https://en.wikipedia.org/wiki/Newton%27s_method", note: "Babil ve Heron, Newton'un 1669 De analysi'si (basım 1711), Raphson 1690, Simpson 1740; karesel yakınsamanın kanıtı ve x³ − 2x + 2 döngüsü (İngilizce)." },
    { title: "Wikipedia · Kahan summation algorithm", url: "https://en.wikipedia.org/wiki/Kahan_summation_algorithm", note: "Kahan 1965 (Communications of the ACM 8(1), s. 40), Babuška'nın 1969'daki bağımsız çalışması, ikili toplama ve hata büyümesi (İngilizce)." },
    { title: "Wikipedia · Gaussian quadrature", url: "https://en.wikipedia.org/wiki/Gaussian_quadrature", note: "Gauss'un 1815 tarihli Methodus nova'sı, Jacobi 1826; Legendre kökleri, ağırlıklar ve 2n − 1 kesinlik derecesi (İngilizce)." },
    { title: "Wikipedia · MIM-104 Patriot", url: "https://en.wikipedia.org/wiki/MIM-104_Patriot", note: "Dhahran olayı (25 Şubat 1991): 100 saatlik çalışma, 24 bitlik yazmaçta kesme, üçte bir saniyelik kayma ve GAO raporu IMTEC-92-26 (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
