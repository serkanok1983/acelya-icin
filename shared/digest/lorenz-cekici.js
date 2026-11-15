window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["lorenz-cekici"] = {
  slug: "lorenz-cekici",
  title: "Lorenz Çekicisi: Üç Denklemin Garip Kelebeği",
  field: "Matematik",
  level: "Lisans",
  minutes: 40,
  tagline:
    "Üç denklem, düzensiz iki kanat: faz hacmi birim zamanda 860 bin kat küçülür; seçili deneyde milyarda birlik başlangıç farkı yaklaşık 23 birim zamanda bir mertebesine büyür.",
  hook:
    "Her küçük hacmi bir birim zamanda 860 bin kat ezen bir akış düşün: içine bıraktığın her damlanın hacmi hızla sıfıra gider. Yine de tipik bir başlangıçtan çıkan yörünge hiçbir noktaya yerleşmez, hiçbir turu bir öncekini tam yinelemez ve kendini asla kesmez. Hacmi sıfır olan bir kümenin içinde sonsuza dek dolaşan bir eğri nasıl mümkün?",
  bigIdea:
    "Lorenz sistemi hacmi yutar (her küçük hacim e<sup>−(σ+1+β)t</sup> ile büzülür) ama komşu yörüngeleri birbirinden ayırır (λ ≈ 0.9); bu iki etkinin uzlaştığı yer, hacmi sıfır, boyutu yaklaşık 2.06 olan sonsuz katlı bir <strong>garip çekicidir</strong> ve üzerindeki hareket belirlenimci olduğu hâlde uzun vadede öngörülemez.",
  story: [
    "Lorenz'in 1961'de 12 değişkenli hava modelinde yaşadığı yuvarlama sürprizi ve ünlü kelebek konuşması <a href=\"cift-sarkac.html\">Çift Sarkaç</a> defterinde anlatılıyor; bu sayfanın hikâyesi ondan sonra gelen, çok daha küçük modelle başlar. 1962'de Barry Saltzman, alttan ısıtılıp üstten soğutulan ince bir akışkan katmanındaki konveksiyonu (Rayleigh–Bénard konveksiyonu) sonlu sayıda Fourier bileşenine indirip ortaya çıkan adi diferansiyel denklemleri bilgisayarda çözüyordu. Bazı çözümlerde üç değişken dışında hepsi zamanla sıfıra sönüyor, kalan üçü ise düzensiz, hiç yinelemeyen dalgalanmalar yapıyordu. Lorenz modeli en baştan bu üç bileşene kesti: <em>x</em> konveksiyon hücresinin dönme hızı, <em>y</em> yükselen ve inen akımlar arasındaki sıcaklık farkı, <em>z</em> düşey sıcaklık dağılımının doğrusallıktan sapması. Sonuç, Mart 1963'te <em>Journal of the Atmospheric Sciences</em>'ta çıkan 12 sayfalık <em>Deterministic Nonperiodic Flow</em> (Belirlenimci Periyodik Olmayan Akış) makalesiydi. Lorenz σ = 10, b = 8/3, r = 28 değerlerini seçti ve (0, 1, 0) noktasından başladı; bugün aynı sayılar ρ ve β harfleriyle yazılıyor. Sayısal hesapları yürütüp çizimleri hazırlayan Ellen Fetter'dı.",
    "Makale bugün de ders kitabı gibi okunur. Lorenz önce denge noktalarını buldu ve sabit konveksiyonun kararlı kalabileceği eşiği hesapladı: r<sub>c</sub> = σ(σ + b + 3)/(σ − b − 1) = 470/19 ≈ 24.74. Seçtiği r = 28 bu eşiğin biraz üstündeydi: hiçbir denge noktası yakınındaki bütün küçük sapmaları geri çekmiyordu. Sonra her hacmin her yerde aynı hızla büzüldüğünü gösterdi ve bir sayı verdi: denge noktalarından birinin çevresindeki tipik bir tur yaklaşık 0.7 birim zaman sürer, bu sürede her hacim 0.00007'sine iner. Bütün yörüngeler hacmi sıfır olan bir kümeye çekilmeliydi. Küme tek bir yüzey gibi görünüyordu, ama yörüngeler birleşemeyeceği için öyle olamazdı; Lorenz onu “sonsuz bir yüzeyler karmaşası” diye tarif etti. En zarif adımı bir kısaltmaydı: sürekli akışı bırakıp yalnızca z'nin ardışık tepe değerlerini kaydetti ve her tepeyi bir öncekine karşı çizdi. Noktalar sivri uçlu tek bir eğriye dizildi; kendi deyişiyle eğimin büyüklüğü “görünüşe göre her yerde” 1'i aşıyordu. Bu yaklaşık tepe ilişkisi, tek boyutlu bir yineleme modeli kurmayı sağlıyordu. Modelde bir çevrim boyunca eğimlerin çarpımının mutlak değeri 1’i aşarsa çevrim kararsızdır; çizim gerçek akışın bütün periyodik yörüngeleri için kesin kanıt vermez. Sayfanın Lorenz haritası sekmesi bu çizimi 3000 tepeyle yeniden yapar.",
    "Lorenz'in çizdiği türden kümelere ad 1971'de verildi. David Ruelle ile Floris Takens türbülansın nasıl başladığını tartıştıkları makalede, sönümlü bir sistemin yörüngelerini kendine çeken ama bir nokta, kapalı bir eğri ya da düzgün bir yüzey olmayan kümelere <strong>garip çekici</strong> dediler; Lorenz çekicisi bu adın en ünlü örneği oldu. Aynı denklemler masaya da kondu. MIT'de Willem Malkus ve Louis Howard tabanları delik kovalarla donatılmış, tepesinden su dökülen bir çark kurdular. Su yavaş akarken çark hep aynı yöne döner; akış artınca hızlanır, yavaşlar, durur ve öngörülemez anlarda yön değiştirir. Kovaların çarkın çevresine sürekli dağıldığı ideal bir çarkta açısal hız ile kütle merkezinin iki koordinatı, değişkenler yeniden ölçeklenince tam olarak Lorenz denklemlerine uyar: çarkın yön değiştirmesi, sayfadaki yörüngenin kanat değiştirmesidir. 1975'te Hermann Haken, tek kipli bir lazerin denklemlerinin de aynı biçime indiğini gösterdi.",
    "Çizilen şeklin gerçekten var olduğunu kanıtlamak ise kırk yıla yakın sürdü. Bilgisayar çizimleri kanıt sayılmazdı: kaotik bir yörüngede her küçük hata büyür. Sayfadaki adım yarılama deneyi, belirli başlangıçlarda yaklaşık 30 birim zaman sonra iki sayısal yolun belirgin biçimde ayrıldığını gösterir. Bu süre bütün başlangıçlar için aynı değildir; iki yaklaşık yolun farkı da tek başına gerçek çözüme karşı kesin hata sınırı vermez. 1970'lerin sonunda John Guckenheimer ile Robert Williams, bağımsız olarak da Valentin Afraimovich, Vladimir Bykov ve Leonid Şilnikov, çekicinin nasıl davranması gerektiğini anlatan geometrik bir model kurdular; ama gerçek denklemlerin bu modele uyduğunu kimse gösteremedi. Stephen Smale 1998'de yeni yüzyıl için derlediği 18 problemlik listeye bunu 14. problem olarak koydu. Warwick Tucker ayrıntılı bilgisayar destekli kanıtını 2002'de yayımladı. Kanıt bilgisayar destekliydi ama yuvarlamaya teslim olmadı: <strong>aralık aritmetiği</strong> her sayıyı kesin alt ve üst sınırları olan bir aralık olarak taşıdı; yörüngelerin uzun süre oyalandığı orijin çevresindeki en zor bölge ise normal form kuramının çözümsel kestirimleriyle aşıldı. Sonuç: klasik değerlerde garip çekici gerçekten vardır ve parametrelerdeki küçük değişikliklere dayanıklıdır.",
  ],
  core: [
    {
      heading: "Isınan bir katman, üç sayı",
      body:
        "Bir tencerede suyu alttan ısıttığında sıcak su yükselir, soğuyan su iner; ısıtma bir eşiği aşınca akışkan düzenli dönen silindirlere, <strong>konveksiyon hücrelerine</strong> bölünür. Lorenz bu hareketi üç sayıya indirdi: <em>x</em> hücrenin dönme hızı (işareti dönme yönü), <em>y</em> yükselen ve inen akımlar arasındaki sıcaklık farkı, <em>z</em> düşey sıcaklık dağılımının düz bir çizgiden sapması. σ (Prandtl sayısı) viskozitenin ısı yayınımına oranıdır: su için yaklaşık 7, hava için 0.7. ρ, ısıtmanın konveksiyon eşiğinin kaç katı olduğunu söyler; β hücrenin en-boy oranından gelir (8/3, en kolay başlayan hücre içindir). Denklemlerin doğrusal olmayan kısmı yalnız iki çarpımdır: −xz ve xy. Dürüst bir not: model gerçek konveksiyonu ancak ρ, 1'e yakınken nicel olarak anlatır; ρ = 28'de gerçek bir akışkan çok daha fazla kip kullanır. Orada incelenen, denklemlerin kendisidir.",
      formula: "dx/dt = σ(y − x),   dy/dt = x(ρ − z) − y,   dz/dt = xy − βz",
      formulaNote:
        "Değişkenler ve zaman boyutsuzdur (sayfada “birim zaman”). Klasik seçim σ = 10, β = 8/3, ρ = 28; ρ = 1, ısının yalnız iletimle taşındığı durumdan konveksiyona geçiş eşiğidir.",
    },
    {
      heading: "Denge noktaları ve Jacobi matrisi",
      body:
        "Üç türev birden sıfırsa sistem durur. ẋ = 0'dan y = x, ż = 0'dan z = x²/β, ẏ = 0'dan x(ρ − 1 − z) = 0 çıkar: ya orijin O (konveksiyon yok) ya da ρ &gt; 1 iken C± = (±√(β(ρ − 1)), ±√(β(ρ − 1)), ρ − 1), yani iki yönde dönen sabit hücreler. Bir dengenin yakınında hareket doğrusallaştırılır: ṡ ≈ J·(s − s*). <strong>Jacobi matrisi</strong> J kısmi türevlerden oluşur; özdeğerlerinin hepsinin gerçel kısmı negatifse küçük sapmalar söner. Orijinde bir özdeğer ρ = 1'de sıfırdan geçer: iletim kararsızlaşır, C± doğar (çatal çatallanması). C±'da karakteristik polinom λ³ + (σ + β + 1)λ² + β(σ + ρ)λ + 2σβ(ρ − 1) = 0'dır; klasik σ ve β ile ρ &gt; 1.35 için bir negatif gerçel kök ve karmaşık bir çift verir. Çiftin gerçel kısmı ρ<sub>H</sub>'de sıfırdan geçer: <strong>Hopf çatallanması</strong>. Lorenz'de bu geçiş alt-kritiktir: 13.93 &lt; ρ &lt; ρ<sub>H</sub> aralığında C±'yı kararsız periyodik yörüngeler çevreler ve ρ → ρ<sub>H</sub>'de C±'ya büzülürler; eşiğin üstünde yörüngeyi yakalayacak kararlı bir denge kalmaz.",
      formula: "J = [ −σ  σ  0 ;  ρ − z  −1  −x ;  y  x  −β ],   ρ<sub>H</sub> = σ(σ + β + 3)/(σ − β − 1)",
      formulaNote:
        "J'nin satırları ẋ, ẏ, ż'nin x, y, z'ye göre türevleridir. λ³ + aλ² + bλ + c kübiğinin sanal bir kök çifti olması için ab = c gerekir; bu koşul ρ<sub>H</sub>'yi verir. σ = 10, β = 8/3 için 470/19 ≈ 24.74 (yalnız σ &gt; β + 1 ise vardır).",
    },
    {
      heading: "Hacim yutan akış: çekici neden sıfır hacimli?",
      body:
        "Faz uzayında küçük bir damla düşün: içindeki her nokta ayrı bir başlangıç koşulu. Damlanın hacmi, akışın <strong>ıraksaması</strong> ∇·f oranında değişir. Lorenz'de ∂ẋ/∂x + ∂ẏ/∂y + ∂ż/∂z = −σ − 1 − β: her noktada aynı ve negatif. Bu yüzden her hacim V(t) = V₀e<sup>−(σ+1+β)t</sup> ile, klasik değerlerde birim zamanda yaklaşık 860 000 kat küçülür. Öte yandan W = ρx² + σy² + σ(z − 2ρ)² için dW/dt = −2σ(ρx² + y² + β(z − ρ)² − βρ²) çıkar; W bir elipsoidin dışında hep azalır, yani her yörünge sonunda sınırlı bir bölgeye girer ve orada kalır. Sınırlı bir bölgeye hapsolan ve hacmi sıfıra büzülen her damla, sonunda hacmi sıfır olan bir kümeye, <strong>çekiciye</strong> yığılır. ρ = 28'de üç denge noktası da kararsızdır; ancak tam bu noktalardan başlayan çözümler orada kalır. Tipik başlangıçların düzensiz hareketi ve çizilen dönüş ilişkisi, garip çekici resmiyle uyumludur. Bu gözlemler bütün periyodik yörüngeler için bir ispat değildir; çekicinin varlığına ilişkin kesin sonuç Tucker'ın ayrı, bilgisayar destekli kanıtına dayanır. Çift sarkaçta durum terstir: enerji korunur, faz uzayı hacmi de korunur (Liouville teoremi) ve çekici yoktur.",
      formula: "∇·f = −(σ + 1 + β),   V(t) = V₀·e<sup>−(σ+1+β)t</sup>",
      formulaNote:
        "σ = 10, β = 8/3 için −13.667. Sayfa dört yakın noktanın gerdiği hacmin logaritmasından eğimi −13.6667 ölçer; kuramla bağıl farkı 5×10⁻⁷.",
    },
    {
      heading: "Üç Lyapunov üsteli ve öngörü ufku",
      body:
        "Çekicinin üzerinde komşu iki yörünge arasındaki küçük fark üç yönde farklı davranır. Akış boyunca ne büyür ne söner (λ₂ = 0); çekicinin yaprakları boyunca gerilir (λ₁ &gt; 0); yapraklara dik yönde ezilir (λ₃ &lt; 0). Üçünün toplamı hacim küçülme hızıdır: λ₁ + λ₂ + λ₃ = −(σ + 1 + β). Klasik değerlerde λ₁ ≈ 0.906 ve λ₃ ≈ −14.57: fark ortalama her 0.77 birim zamanda ikiye katlanır. Ortalama üstel büyüme yaklaşımında Δ hatasının tol eşiğine ulaşma süresi t* ≈ ln(tol/Δ)/λ₁'dir; hassasiyeti bin kat artırmak ufka yalnızca ln 1000/λ₁ ≈ 7.6 birim zaman ekler. Üsteller çekicinin boyutunu da verir: Kaplan–Yorke formülü D = 2 + λ₁/|λ₃| ≈ 2.06. Sayfa λ₁'i Benettin yöntemiyle ölçer: çok yakın bir gölge yörüngeyi her 0.1 birim zamanda referansa geri çekip logaritmik büyümeleri 2000 birim zaman boyunca toplar.",
      formula: "t* = ln(tol/Δ)/λ₁,   λ₁ + λ₂ + λ₃ = −(σ + 1 + β),   D<sub>KY</sub> = 2 + λ₁/|λ₃|",
      formulaNote:
        "Δ = 10⁻⁹, tol = 1 ve λ₁ = 0.9056 (Sprott) ile t* = 20.72/0.9056 = 22.88; sayfada ölçülen ayrılma 22.86. D<sub>KY</sub> = 2 + 0.9056/14.5723 = 2.062.",
    },
    {
      heading: "Lorenz haritası: tepeler ne anlatır?",
      body:
        "Akışın tamamını izlemek yerine yalnız z'nin ardışık tepe değerlerini kaydet ve her tepeyi bir öncekine karşı çiz. Noktalar yaklaşık tek bir eğri boyunca toplanır; zₙ₊₁ ≈ f(zₙ) kullanışlı bir indirgemedir. Gerçek kesit durumu iki boyutludur; yalnız z tepesini tutmak kalan bilgiyi siler. Tam bir tek boyutlu modelde, bir periyodik çevrimin kararlılığı çevrim boyunca türevlerin çarpımıyla sınanır. Her çarpanın mutlak değeri 1'den büyükse çevrim iticidir. Fakat sayfadaki sonlu nokta bulutuna uydurulan eğimler, bütün gerçek Lorenz periyodik yörüngelerinin kararlılığını kanıtlamaz. Ölçülen en küçük eğim büyüklüğü örnekleme ve parametrelere bağlıdır; ρ = 35 deneyinde 1'in altına da inebilir.",
      formula: "Yaklaşık tepe ilişkisi: zₙ₊₁ ≈ f(zₙ)<br>Tek boyutlu modelde: (f<sup>k</sup>)′(z*) = f′(z₁)·f′(z₂)···f′(z<sub>k</sub>)",
      formulaNote:
        "Sayfada ρ = 28 için örneklerden kestirilen en küçük |eğim| yaklaşık 1.09'dur. Yaklaşık tepe ilişkisinin köşegenle kesişimi z* ≈ 39.83; çevresindeki tepe çiftlerine uydurulan doğrunun eğimi yaklaşık −2.18'dir. Tek boyutlu modelin doğrusallaştırmasında bu eğim, küçük sapmanın büyüyüp işaret değiştirmesini anlatır. Bu değerler tam dönüş haritasının türevleri veya gerçek akışta periyodik yörünge varlığının kanıtı olarak okunmamalıdır.",
    },
  ],
  lab: {
    intro:
      "Sayfa Lorenz sistemini sabit adımlı dördüncü mertebe Runge–Kutta yöntemiyle (RK4, h = 0.005; ρ = 99.65 gibi büyük değerlerde yarısı) çözer; x, y, z ve zaman boyutsuzdur. Üç sekme var. <strong>Çekici</strong>: yedi hazır deney düğmesi, σ, ρ, β kaydırıcıları ve sayı kutuları, <strong>Başlangıç noktası</strong> menüsü ve <strong>100 birim ileri sar</strong> düğmesi; sahneyi sürükleyerek ya da Görünüm kaydırıcılarıyla döndürürsün. Tablo hacim küçülme hızını ve ⟨z⟩'yi kuramla karşılaştırır; kartlar kanat değiştirme sayısını, denge noktalarının kararlılığını ve bulutun üç üstelini verir. <strong>Kelebek etkisi</strong>: <strong>Sistem</strong> menüsü, <strong>Kopya sayısı N</strong>, <strong>Başlangıç farkı Δ (x'te)</strong> ve <strong>Ayrılma eşiği</strong>; tablo Benettin λ'sını ve ayrılma zamanını öngörü ufkuyla karşılaştırır. <strong>Lorenz haritası ve çatallanma</strong>: ardışık z tepelerinin haritası ve arka planda hesaplanan 400 sütunluk ρ taraması (<strong>Tarama aralığı</strong>, <strong>Tarama biçimi</strong>); taramaya tıklamak haritanın ρ'sunu seçer. Yörünge yalnız dört işlemle hesaplandığından aynı ayarlar her tarayıcıda aynı yolu verir. Çekici sekmesi sayfa açılır açılmaz saniyede 1 birim zaman hızla koşmaya başlar; deneylerde bu yüzden önce hazır düğmeye ya da <strong>Baştan başlat</strong>'a basıp t = 0'dan başla. Her sekmenin <strong>Sıfırla</strong> düğmesi varsayılanlara döndürür; ilk iki sekmede <kbd>Boşluk</kbd> duraklatır, <kbd>R</kbd> baştan başlatır (haritada yeniden hesaplar).",
    experiments: [
      {
        title: "Ortalama yükseklik neden 27 değil?",
        predict:
          "Yörünge iki kanatta, yüksekliği ρ − 1 = 27 olan C₊ ve C₋ noktalarının çevresinde dolanıyor. Uzun sürede z'nin zaman ortalaması ⟨z⟩ 27'ye mi yerleşir, daha büyük mü olur, daha küçük mü?",
        do: "Çekici sekmesinde <strong>Lorenz 1963: ρ = 28</strong> düğmesine bas (başlangıç (0, 1, 0), t = 0), hemen <strong>Duraklat</strong>'a bas, sonra <strong>100 birim ileri sar</strong> düğmesine iki kez bas. Tablodaki ⟨z⟩ ve hacim küçülme hızı satırlarını, Özdeşlik kartını, kanat değiştirme sayısını ve bulutun üç üstelini oku.",
        observe:
          "t ≈ 200'de ⟨z⟩ ≈ 23.67 ± 0.09, Kuram 27.00 (C±), Fark yaklaşık −12 %; son basamak, Duraklat'a bastığın ana göre birkaç yüzde birlik oynar. Özdeşlik kartı ⟨x²⟩/β ve ⟨xy⟩/β için de 23.6–23.7 gösterir; kanat yaklaşık 100 kez değişmiştir. Hacim satırında Ölçülen −13.6667, Kuram −13.6667, Fark bağıl +5×10⁻⁷; üç üstel yaklaşık 0.81, 0.02 ve −14.50, toplamları yine −13.6667. Durum satırı ayrıca adımı yarıya indirilmiş ikiz hesabın bu yoldan t = 30.9'da ayrıldığını yazar.",
        explain:
          "Sınırlı bir niceliğin türevinin uzun süreli ortalaması sıfıra gider. Ortalamaların limitleri varsa ż = xy − βz ve d(x²)/dt = 2σ(xy − x²), ⟨xy⟩ = β⟨z⟩ = ⟨x²⟩ verir; sonlu sürede uç terimleri kalır. 27, C±'nın yüksekliğidir, her yolun ortalaması değildir. Tek tek üstel kestirimleri değişebilir; toplamları ıraksamayla karşılaştırılır. İkiz yolların ayrılması noktasal tahmine uyarıdır. İstatistikler daha kararlı olabilir, fakat süre ve adım denetimi gerekir.",
      },
      {
        title: "Kararlı denge, ama kim yakalanır?",
        predict:
          "ρ = 20 ve ρ = 24.5'te C± kararlıdır: karmaşık özdeğerlerin gerçel kısmı negatiftir. Her başlangıç noktası sonunda C₊ ya da C₋'ya yerleşir mi?",
        do: "<strong>Kararlı denge: ρ = 20</strong> düğmesine bas ve durum satırını izle (beklemek istemezsen 100 birim ileri sar). Sonra <strong>Çift kararlılık: ρ = 24.5</strong>'e bas, bir süre izle; ardından Başlangıç noktası menüsünden <strong>C₊'nın yanı</strong>'nı seç ve 100 birim ileri sar'a beş kez bas. İstersen <strong>Geçici kaos: ρ = 22</strong>'yi de dene.",
        observe:
          "ρ = 20'de tek kanat değişiminden sonra yörünge t = 46.3'te C₋'ya yerleşir, ⟨z⟩ 19'a gider. ρ = 24.5'te (0, 1, 0)'dan çıkan yörünge kanat değiştirmeyi sürdürür, oysa Denge noktaları kartı “C± kararlı” der. C₊'nın yanından başlayan yörünge ise hiç kanat değiştirmeden t ≈ 438'de C₊'ya yerleşir. ρ = 22'de birkaç on kanat değişiminden sonra yerleşme gelir.",
        explain:
          "Doğrusal kararlılık yereldir: C±'nın çekim bölgesini çevrelerindeki kararsız periyodik yörüngeler sınırlar. 24.06 &lt; ρ &lt; 24.74 aralığında dışarıda bir de kaotik çekici vardır; iki çekici yan yana durur, sonucu başlangıç seçer (çift kararlılık). 13.93 ile 24.06 arasında kaos yalnız geçicidir: rastgele başlangıçlarla ortalama süresi ρ = 22'de yaklaşık 30, ρ = 23'te 200 birim zamandır. Kaç kanat değişimi olacağı ve hangi C'ye inileceği adım boyuna bile bağlıdır.",
      },
      {
        title: "Milyarda bir fark: öngörü ufku",
        predict:
          "Üç kopya x'te 10⁻⁹ ve 2×10⁻⁹ farkla başlıyor. λ ≈ 0.9 ise fark 1'e ne zaman ulaşır? 2Δ ile başlayan kopya ne kadar erken ayrılır? Δ'yı bin kat küçültmek kaç birim zaman kazandırır?",
        do: "Kelebek etkisi sekmesini aç ve <strong>Sıfırla</strong>'ya bas (Lorenz 1963, N = 3, Δ = 1×10⁻⁹, eşik |δ| = 1). Kopyalar ayrılınca tabloyu, λ kartlarını ve kopya notunu oku. Sonra <strong>Başlangıç farkı Δ (x'te)</strong> kaydırıcısını en sola, 1×10⁻¹²'ye çek.",
        observe:
          "Benettin λ = 0.902 ± 0.004; Sprott'un 0.9056'sından −0.43 %. Kopya 1 t = 22.86'da ayrılır, kuram t* = 22.88 (−0.10 %); 2Δ'lı kopya 18.16'da. ln|δ| eğimi 0.887 (t = 1–17.7), ikiye katlanma süresi 0.765. Δ = 10⁻¹²'de ayrılma 30.43, t* = 30.51.",
        explain:
          "ln|δ| düzgün yükselmez; sıçramalar kanat değişimlerinde gelir. 2Δ'lı kopya ortalama büyüme yaklaşımında ln 2/λ ≈ 0.77 öndedir; bu koşuda 4.7 önde, çünkü t ≈ 18'deki sıçrama yalnız onu eşiğe taşıdı. Bin kat hassasiyet yaklaşık ln 1000/λ ≈ 7.6 birim zaman kazandırır (burada 7.57). 2000 birim zamanda ölçülen λ sonlu bir kestirimdir. Bütün başlangıçlar için ortak kopuş zamanı yoktur; istatistikler noktasal yoldan daha dayanıklı olsa bile süre ve adım değişimiyle sınanmalıdır.",
      },
      {
        title: "Bir tepe sonrakini söyler: harita ve tarama",
        predict:
          "Her z tepesini bir öncekine karşı çizersen dağınık bir bulut mu, bir eğri mi görürsün? İleri taramada C± kararlılığını tam ρ<sub>H</sub> = 24.74'te mi yitirir?",
        do: "<strong>Lorenz haritası ve çatallanma</strong> sekmesini aç (ρ = 28, Tarama aralığı 0 – 30, Tarama biçimi İleri). Harita 3000 tepeyi, tarama 400 sütunu bitirince tabloyu ve kartları oku. Sonra Tarama biçimi'ni <strong>Geri</strong> yap; en sonda ρ = 99.65 düğmesine bas.",
        observe:
          "Noktalar tek tepeli, sivri uçlu bir eğriye dizilir (zₙ ≈ 30–47, uç 38 dolayında). En küçük |eğim| 1.09, Fark “sağlanıyor”; z* = 39.83, f′(z*) = −2.18. İleri tarama 25.26'da kopar (kuram 24.7368, +2.13 %); geri taramada kaos 23.08'e dek sürer (lit. 24.06, −4.06 %). ρ = 99.65'te harita altı noktaya çöker.",
        explain:
          "Tam bir tek boyutlu modelde, çevrim boyunca bütün |f′| değerleri 1'i aşarsa o çevrim iticidir. Burada sonlu tepe örneklerinden ölçülen eğimler bu varsayımı gerçek akışın her noktasında kanıtlamaz. Taramada her sütun yalnız 60 birim zaman koşar: ρ<sub>H</sub>'nin hemen üstünde büyüme hızı Re λ ≈ 0.03(ρ − ρ<sub>H</sub>) kopmaya yetmez; 24.06'nın altında ise geçici kaos sütundan uzun sürer. İki tarama birlikte histerezis döngüsünü, yani çift kararlılık penceresini gösterir. ρ = 99.65 periyodik bir penceredir.",
      },
    ],
  },
  wow: [
    {
      title: "Hacmi sıfır, boyutu 2.06",
      body:
        "Çekici ne bir yüzeydir ne bir hacim. Üç Lyapunov üstelinden (0.9056, 0, −14.5723) Kaplan–Yorke formülüyle boyut 2 + 0.9056/14.5723 ≈ 2.06 çıkar. Peter Grassberger ve Itamar Procaccia 1983'te yalnızca yörüngenin noktaları arasındaki uzaklıkları sayarak çekicinin “korelasyon boyutunu” 2.05 ± 0.01 ölçtü. İki bağımsız yöntem aynı şeyi söylüyor: kanatlar, aralarına hep yeni katlar sığan sonsuz ince bir deste gibidir. 2'yi aşan o 0.06, bu sonsuz katlanmanın imzasıdır.",
    },
    {
      title: "Isıtmayı artır, düzen geri döner",
      body:
        "Kaos ρ büyüdükçe hep artmaz. Sayfanın 0–200 taraması, en genişleri 99.75–100.75 ve 146.87–165.91 olan altı periyodik pencere bulur. ρ = 99.65'te yörünge her dönüşte aynı altı z tepesini (114.1'den 144.9'a) yineler, ρ = 160'ta yalnız ikisini (188.7 ve 216.6); iki pencerede de Benettin λ hata payı içinde sıfırdır ve kopyalar ayrılmaz. Malkus–Howard su çarkı da benzer bir sıra izler: az suyla tek yöne döner, orta debide kaotik biçimde yön değiştirir, daha çok suyla düzenli ileri-geri salınıma geçer.",
    },
    {
      title: "Fraktal sözcüğünden on iki yıl önce",
      body:
        "Benoît Mandelbrot “fraktal” sözcüğünü 1975'te türetti. Lorenz ise 1963'te çekicinin ince yapısını çoktan tarif etmişti: x eksenine paralel bir doğrunun o sonsuz yüzeyler karmaşasını kestiği noktaları, ondalık açılımında yalnız 0 ve 1 bulunan sayılara benzetti. Böyle sayılar sayılamayacak kadar çoktur, ama kapladıkları toplam uzunluk sıfırdır; bugün bu tür kümelere Cantor kümesi diyoruz. Lorenz basamaklara bir anlam da yükledi: virgülden sonraki ilk basamak, o yüzeydeki yörüngelerin son turunu hangi denge noktasının çevresinde attığını, ikincisi bir önceki turu söyler. Her kat, yörüngenin geçmişini ikili bir sayı olarak saklar.",
    },
  ],
  worked: {
    title: "C± noktalarının kararlılığı: ρ = 28'de Jacobi matrisi",
    prompt:
      "σ = 10, β = 8/3, ρ = 28 için Lorenz sisteminin denge noktalarını bul, C₊'daki Jacobi matrisini yaz, karakteristik polinomu kur ve özdeğerleri hesapla. C₊'nın yanından başlayan bir yörünge ne yapar? Sonucu C±'nın kararlılığını yitirdiği ρ<sub>H</sub> ile ve sayfanın kartlarıyla karşılaştır. (Nicelikler boyutsuzdur; özdeğerlerin birimi 1/birim zaman.)",
    steps: [
      "Dengede ẋ = ẏ = ż = 0. İlkinden y = x, üçüncüsünden z = x²/β; ikincisi x(ρ − 1 − z) = 0 olur. x = 0 orijini verir; öbür çözüm z = ρ − 1 = 27 ve x² = β(ρ − 1) = (8/3)·27 = 72, yani x = ±√72 = ±8.4853. C± = (±8.4853, ±8.4853, 27).",
      "Jacobi matrisinin satırları (−σ, σ, 0), (ρ − z, −1, −x), (y, x, −β)'dır. C₊'da ρ − z = 1 ve x = y = 8.4853: satırlar (−10, 10, 0), (1, −1, −8.4853), (8.4853, 8.4853, −2.6667). İzi −13.6667, yani akışın ıraksaması; özdeğerlerin toplamı da bu olmalı.",
      "det(λI − J) açılınca λ³ + (σ + β + 1)λ² + β(σ + ρ)λ + 2σβ(ρ − 1) = λ³ + 13.6667λ² + 101.333λ + 1440 çıkar. Gerçel kökü ara: λ = −14'te değer −44.0, λ = −13.8'de +16.2; işaret değiştiği için kök arada, ikiye bölme ya da Newton yöntemiyle λ₁ = −13.8546.",
      "Bu kökü bölünce λ² + pλ + q kalır: p = 13.6667 − 13.8546 = −0.1879, q = 1440/13.8546 = 103.937. Kökler λ = −p/2 ± i√(q − p²/4) = 0.0940 ± 10.1945i. Denetim: −13.8546 + 2·0.0940 = −13.6667, yani iz.",
      "Yorum: bir yönde sapma e<sup>−13.85t</sup> ile hemen söner; öbür iki yönün düzleminde yörünge C₊'nın çevresinde döner. Bir tur 2π/10.1945 = 0.616 birim zaman sürer, genlik e<sup>0.094t</sup> ile büyür: her turda yüzde 6, e katına çıkması 1/0.094 ≈ 10.6 birim zaman, yaklaşık 17 tur. Orijinin özdeğerleri −22.83, +11.83, −2.67: o da eyerdir. Hopf koşulu ab = c'den ρ<sub>H</sub> = 10·(10 + 8/3 + 3)/(10 − 8/3 − 1) = 470/19 = 24.74 &lt; 28.",
      "Sayfada dene: haritanın sekmesindeki kartlar “−13.8546; +0.0940 ± 10.1945i” ve “−22.8277; +11.8277; −2.6667” gösterir. Çekici sekmesinde ρ = 28 iken Başlangıç noktası'nı C₊'nın yanı yap: x(t) grafiğinde kesikli +x<sub>C</sub> çizgisi çevresindeki salınımın yaklaşık 0.6 birim zamanlık turlarla yavaş yavaş büyüdüğünü ve t ≈ 40'ta ilk kanat değişimini görürsün.",
    ],
    result:
        "C± = (±8.485, ±8.485, 27); özdeğerler −13.855 ve 0.094 ± 10.195i, yani C± dışa doğru sarmal çizdiren kararsız noktalardır. ρ = 28, ρ<sub>H</sub> ≈ 24.74'ün üstünde olduğundan üç denge noktası da kararsızdır: çevrelerindeki bütün küçük sapmaları geri çekmezler. Tam dengede başlayan çözüm yine dengede kalır; kararlı manifold üzerindeki özel çözümler de dengeye yaklaşabilir. Bu yerel hesap tek başına kaosun kanıtı değildir.",
  },
  misconceptions: [
    {
      myth: "Kaos rastgelelik demektir; Lorenz yörüngesi zar atar gibi kanat seçer.",
      truth:
        "Denklemlerde hiç rastlantı yok. Aynı uygulamada aynı ayarlarla Baştan başlat'a basınca aynı hesap tekrarlanır. Kaotik hareket, küçük farkları ortalamada üstel büyütebilir. Uzun süreli ⟨z⟩ ve λ gibi kestirimlerin güvenilirliği ayrıca süre ve adım denetimi gerektirir. Bir sonraki durumu mevcut tam (x, y, z) durumu belirler; yalnız önceki z tepesini tutan Lorenz grafiği yaklaşık bir ilişkidir.",
    },
    {
      myth: "Daha güçlü bir bilgisayarla Lorenz sistemini istediğimiz kadar uzağa öngörebiliriz.",
      truth:
        "Ufuk hassasiyetin yalnız logaritmasıyla uzar: t* = ln(tol/Δ)/λ. Sayfada Δ = 10⁻⁹ ile ayrılma 22.86'da, bin kat küçük Δ = 10⁻¹² ile 30.43'te: üç basamak, 7.6 birim zaman. Yuvarlama ve adım hataları da büyüyebilir; ancak sürekli eklenen bu hataları tek bir başlangıç farkıyla özdeşleştirip kesin bir kopuş zamanı çıkarmak doğru değildir. Sayfadaki belirli adım yarılama deneyinde yollar yaklaşık 30 birim zamanda ayrılır; bu evrensel bir sınır veya kesin hata ölçümü değildir. Uzun koşunun ⟨z⟩ ve λ kestirimleri de süre ve adım değişimine karşı denetlenmelidir.",
    },
    {
      myth: "Ekranda çizgiler kesiştiğine göre yörünge üç boyutta kendini kesiyor.",
      truth:
        "Kesemez. Sağ taraf doğrusal terimlerle iki çarpımdan (xz ve xy) oluşan bir polinomdur ve varlık-teklik teoremine göre her noktadan tek bir çözüm geçer. İki yörünge bir noktada buluşsaydı oradan sonrası da öncesi de aynı olurdu; daha önce geçtiği bir noktaya dönen yörünge ise periyodik olurdu. Ekrandaki kesişmeler iki boyutlu izdüşümün ürünüdür: sahneyi sürükle ya da x–y (üstten) düğmesine bas, kesişme noktaları kayar ya da kaybolur.",
    },
    {
      myth: "Lorenz çekicisi iki kanatlı bir yüzeydir; yörünge bir kâğıdın üzerinde dolaşır.",
      truth:
        "Öyle görünür ama olamaz: iki kanat ortada birleşiyormuş gibi durur, oysa yörüngeler birleşemez. Lorenz 1963'te bu çelişkiden, her yüzeyin aslında bir çift olduğu, birleşme yerinde dört, bir tur daha izleyince sekiz yüzey bulunduğu sonucuna vardı. Katları göremememizin nedeni ezilmenin hızıdır: yapraklara dik yöndeki her uzaklık ortalamada e<sup>−14.57t</sup> ile, yani 2.5 birim zamanda 10¹⁶ kat küçülür. Birkaç tur önce ayrılmış katlar ekranın da bilgisayarın sayılarının da ayırt edemeyeceği kadar yakınlaşır. Boyut ölçümleri aynı şeyi söyler: yaklaşık 2.06, bir yüzeyden biraz fazlası.",
    },
  ],
  glossary: [
    { term: "Çekici", definition: "Yakınındaki yörüngelerin zamanla yaklaştığı ve akışın kendi içinde tuttuğu küme; bir denge noktası, kapalı bir eğri ya da garip çekici olabilir." },
    { term: "Garip çekici", definition: "Fraktal yapılı, üzerindeki hareketin kaotik olduğu çekici; adı Ruelle ve Takens'ten (1971). Lorenz çekicisinin boyutu yaklaşık 2.06'dır." },
    { term: "Jacobi matrisi", definition: "Vektör alanının bileşenlerinin kısmi türevlerinden oluşan matris; bir denge noktası yakınındaki hareketi doğrusal olarak verir, özdeğerleri kararlılığı belirler." },
    { term: "Hopf çatallanması", definition: "Bir denge noktasının karmaşık özdeğer çifti sanal ekseni geçerken çevresinde periyodik bir yörüngenin doğması ya da yok olması; Lorenz sisteminde ρ<sub>H</sub> = 470/19 ≈ 24.74'te alt-kritiktir: kararsız yörüngeler C±'ya büzülüp kaybolur." },
    { term: "Iraksama (∇·f)", definition: "Akışın küçük hacimleri genişletme (+) ya da sıkıştırma (−) hızı, ∂ẋ/∂x + ∂ẏ/∂y + ∂ż/∂z; Lorenz sisteminde her yerde −(σ + 1 + β)." },
    { term: "Lyapunov üstelleri", definition: "Komşu yörüngeler arasındaki farkın farklı yönlerdeki ortalama üstel büyüme hızları; klasik Lorenz sisteminde yaklaşık 0.906, 0 ve −14.57." },
    { term: "Lorenz haritası", definition: "z'nin ardışık tepe değerlerinin yaklaşık ilişkisi; üç boyutlu akışın davranışını görselleştirir, fakat bütün kesit durumunu tek sayıyla kesin olarak temsil etmez." },
    { term: "Rayleigh oranı ρ", definition: "Isıtmanın konveksiyon eşiğinin kaç katı olduğunu söyleyen oran, ρ = Ra/Ra<sub>c</sub>; ρ &lt; 1'de ısı yalnız iletimle taşınır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bir denklemi çözersin; üniversitede çözemediğin bir denklem hakkında yine de kesin şeyler söylemeyi öğrenirsin. <strong>Diferansiyel Denklemler</strong> dersinde varlık-teklik teoremi (Picard–Lindelöf) yörüngelerin neden kesişemediğini, x′ = Ax doğrusal sistemleri ve özdeğerler de denge noktalarının çevresini anlatır; çözümlü örnekteki Jacobi hesabı o dersin tipik bir sınav sorusudur. <strong>Dinamik Sistemler ve Kaos</strong> dersinde (Steven Strogatz'ın <em>Nonlinear Dynamics and Chaos</em> kitabının bütün bir bölümü Lorenz denklemlerine ayrılmıştır) çatallanma kuramı sistematik hâle gelir: ρ = 1'deki çatal, 13.93'teki homoklinik patlama, 24.06'da kaotik çekicinin doğuşu ve 24.74'teki alt-kritik Hopf; ardından Poincaré haritaları, Lyapunov üstelleri, fraktal boyut ve garip çekiciler. <strong>Akışkanlar Mekaniği</strong>'nde modelin kaynağına inersin: Navier–Stokes denklemleri, Boussinesq yaklaşımı ve Rayleigh–Bénard konveksiyonu. Lorenz'in kullandığı kaymalı sınırlarda konveksiyon Ra<sub>c</sub> = 27π⁴/4 ≈ 658'de başlar; iki katı levha arasında ise yaklaşık 1708'de.",
      "<strong>Sayısal Analiz</strong> dersinde RK4'ün hatasının neden h⁴ ile küçüldüğünü, adım denetimli yöntemleri ve kaotik bir hesaba ne zaman güvenilebileceğini öğrenirsin. Uzun bir sayısal yolu aynı başlangıcın gerçek çözümü olarak yorumlamak hata denetimi gerektirir. Gölgeleme (shadowing) sonuçları bazı sistemlerde yaklaşık yolun yakınında gerçek bir yörünge bulunduğunu garanti eder; Tucker'ın kanıtındaki aralık aritmetiği ise yuvarlamayı tümüyle hesaba katmanın yoludur. Tipik başlangıçların uzun zaman ortalamalarının doğal olasılık dağılımının ortalamasıyla ilişkisi <strong>ergodik kuramın</strong> konusudur. Sonlu sürede ölçülen ⟨z⟩ ≈ 23,6 bütün başlangıçlar için ortak ve kesin bir değer değildir; denge noktaları bile bu genellemenin karşı örneğidir. Hava tahmininde sonuç pratik bir disipline dönüşür: <strong>veri özümseme</strong> (data assimilation) modeli birkaç saatte bir yeni gözlemlerle birleştirerek Δ'yı küçük tutar, topluluk tahminleri de kalan belirsizliği ölçer. Lorenz'in üç denklemi bugün de bu yöntemlerin sınandığı oyuncak modeller arasındadır.",
    ],
    topics: [
      "Varlık-teklik teoremi",
      "Doğrusallaştırma ve Jacobi matrisi",
      "Çatallanma kuramı: çatal, Hopf, homoklinik",
      "Poincaré ve dönüş haritaları",
      "Lyapunov üstelleri ve fraktal boyut",
      "Ergodik kuram",
      "Rayleigh–Bénard konveksiyonu",
      "Veri özümseme ve topluluk tahmini",
    ],
  },
  quiz: [
    {
      question:
        "Çekici sekmesinde ρ = 28'de 200 birim zamanlık bir koşudan sonra Özdeşlik kartı ⟨xy⟩/β için de, tablo ⟨z⟩ için de yaklaşık 23.67 gösteriyor. Bu eşitliğin nedeni nedir?",
      options: [
        "ρ = 28'e özgü sayısal bir rastlantıdır; başka ρ'da tutmaz",
        "Yörünge zamanının çoğunu C± noktalarında geçirir ve orada xy = βz'dir",
        "z sınırlı kaldığından ż = xy − βz'nin uzun süreli ortalaması sıfırdır",
        "Hacim her yerde aynı hızla küçüldüğü için bütün zaman ortalamaları eşitlenir",
      ],
      answer: 2,
      explanation:
        "ż'nin W süreli ortalaması [z(t) − z(t − W)]/W'dir. Pay sınırlı kalırken W büyüyünce bu uç terimi sıfıra gider. Zaman ortalamalarının limitleri varsa ⟨xy⟩ = β⟨z⟩ çıkar; d(x²)/dt = 2σ(xy − x²) de ⟨x²⟩ = ⟨xy⟩ verir. Sonlu sürede eşitlikler uç terimleriyle düzeltilir. Bunlar bütün başlangıçların ortak bir ⟨z⟩ değeri olduğunu söylemez: tam C±'da başlayan çözümün ortalaması 27'dir.",
    },
    {
      question: "Lorenz akışında her küçük hacim birim zamanda yaklaşık 860 000 kat küçülüyor. Buna göre hangisi doğrudur?",
      options: [
        "Yörüngeler sonunda bir noktaya ya da kapalı bir eğriye yerleşmek zorundadır",
        "Komşu yörüngeler her yönde birbirine yaklaşır; kopyalar hiç ayrılamaz",
        "Çekicinin hacmi sıfırdır, ama bir yönde gerilme sürdüğü için komşu yörüngeler yine ayrılır",
        "Hacim küçüldükçe yörünge yavaşlar ve hareket sonunda durur",
      ],
      answer: 2,
      explanation:
        "Hacim üç üstelin toplamıyla küçülür: 0.906 + 0 − 14.572 = −13.667. Toplam negatif olsa da λ₁ pozitiftir: damla bir yönde uzar, öbür yönde çok daha hızlı incelir ve katlanır. Hacmi sıfır olan küme bir nokta ya da kapalı bir eğri olmak zorunda değildir; burada boyutu yaklaşık 2.06 olan sonsuz katlı bir yapıdır. Sayfada ln(V/V₀) grafiği eğimi −13.67 olan bir doğruyken kopyaların ln|δ| eğrisi yükselir.",
    },
    {
      question:
        "Tam bir tek boyutlu zₙ₊₁ = f(zₙ) modelinde, var olduğu bilinen üç adımlı bir çevrimin her noktasında |f′| &gt; 1 olsun. Bu çevrim için ne söylenebilir?",
      options: [
        "Kararlıdır; üç turda başa döndüğü için sapma da her seferinde sıfırlanır",
        "Var olamaz; |f′| > 1 olan bir haritada periyodik yörünge bulunmaz",
        "Kararlılığı eğimlerin büyüklüğüne değil, yalnız işaretlerine bağlıdır",
        "Vardır ama kararsızdır: sapma her üç turda |f′(z₁)f′(z₂)f′(z₃)| > 1 katına çıkar",
      ],
      answer: 3,
      explanation:
        "Çevrim f³'ün sabit noktasıdır; zincir kuralıyla (f³)′ = f′(z₁)f′(z₂)f′(z₃). Çarpımın mutlak değeri 1'den büyük olduğundan çevrim iticidir: yeterince küçük sapmalar doğrusal yaklaşımda her üç adımda büyür. Bu sonuç çevrimin varlığını kanıtlamaz; soruda varlığı verilmiştir. Ayrıca sonlu Lorenz tepe grafiğine uydurulan eğimlerden gerçek üç boyutlu akışın bütün periyodik yörüngeleri hakkında aynı kesinlikte sonuç çıkmaz.",
    },
  ],
  next: [
    {
      href: "cift-sarkac.html",
      title: "Çift Sarkaç",
      why: "Kaosun sürtünmesiz yüzü: enerji ve faz uzayı hacmi korunur, çekici yoktur, ama kopyalar yine 11 saniyede ayrılır. Lorenz'in 1961 yuvarlaması ve kelebek konuşmasının hikâyesi orada.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa",
      why: "Doğrusal olmayan sistemler sekmesinde sıfır eğrilerini, dengeleri, Jacobian özdeğerleriyle kararlılık sınamasını ve van der Pol'un limit çevrimini gör: buradaki denge, kararlılık ve faz uzayı dilinin iki boyutlu başlangıcı.",
    },
    {
      href: "mandelbrot+lorenz.html",
      title: "Harita ve Akış",
      why: "Mandelbrot'un parametresiyle başlangıç durumunu, bir haritanın yinelemesiyle Lorenz akışının zaman adımını karşılaştır; aynı kaçış eşiğinin iki sisteme uygulanamayacağını dene.",
    },
    {
      href: "lorenz-cekici2.html",
      title: "Lorenz: Faz Uzayı ve Kesit",
      why: "Aynı yörüngeye farklı izdüşümlerden bak, yönlü düzlem geçişlerini topla ve adım boyunu değiştirerek kısa zaman hesabının güvenilirliğini sına.",
    },
  ],
  sources: [
    {
      title: "Warwick Tucker · A Rigorous ODE Solver and Smale's 14th Problem",
      url: "https://research.monash.edu/en/publications/a-rigorous-ode-solver-and-smales-14th-problem/",
      note: "2002 özgün araştırma makalesinin üniversite kaydı ve özeti: aralık aritmetiği ve normal form kuramıyla Lorenz çekicisinin varlığı, dayanıklılığı ve doğal ölçüsü. Sonlu çizimin kesin kanıttan farkı.",
    },
    {
      title: "Wikipedia · Lorenz system",
      url: "https://en.wikipedia.org/wiki/Lorenz_system",
      note: "Denklemler, kararlılık analizi, Saltzman'dan türetiliş, Ellen Fetter ve Margaret Hamilton'ın katkısı, boyut tahminleri (2.06 ve 2.05) ve Tucker'ın kanıtının ana hatları (İngilizce).",
    },
    {
      title: "Wikipedia · Malkus waterwheel",
      url: "https://en.wikipedia.org/wiki/Malkus_waterwheel",
      note: "Lorenz denklemlerine uyan kaotik su çarkı: düşük debide tek yönlü dönüş, orta debide kaotik yön değiştirme, yüksek debide periyodik salınım (İngilizce).",
    },
    {
      title: "MathWorld · Lorenz Attractor",
      url: "https://mathworld.wolfram.com/LorenzAttractor.html",
      note: "Denklemlerin konveksiyondan türetilişi, x, y, z'nin fiziksel anlamı, C±'nın kararlılık koşulu, Grassberger–Procaccia boyutları ve Tucker'ın kanıtına kısa bir not (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
