window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["lazer-ve-uyarilmis-salim"] = {
  slug: "lazer-ve-uyarilmis-salim",
  title: "Lazer ve Uyarılmış Salım: Einstein Katsayılarından Rezonatöre",
  field: "Fizik",
  level: "Lisans",
  minutes: 35,
  tagline:
    "Einstein 1916–1917'de Planck yasasını tutarlı kılmak için ışığa bir terim ekledi: gelen foton, uyarılmış bir atomdan kendi kopyasını koparabiliyordu. Lazer, o terimin kırk yıl sonra bir aynalı kutuda büyütülmesidir.",
  hook:
    "Bir ampulün ışığı milyarlarca atomun birbirinden habersiz, rastgele yaydığı fotonlardır. Bir lazerinki ise aynı yönde, aynı frekansta, aynı evrede yürüyen bir foton ordusu. Aradaki fark atomlarda değil, onları nasıl kandırdığımızda: atomların yarısından fazlasını üst düzeyde tutmak doğanın sevmediği bir şeydir. Peki bunu nasıl başarıyoruz?",
  bigIdea:
    "Işık ile madde üç yolla konuşur: <strong>soğurma</strong>, <strong>kendiliğinden salım</strong> ve <strong>uyarılmış salım</strong>. Uyarılmış salım soğurmayı yenerse ortam ışığı güçlendirir; bunun için <em>nüfus terslenmesi</em> gerekir. Bir rezonatör de tur kazancı tur kaybına eşitlendiği anda bu güçlendiriciyi bir osilatöre, yani lazere çevirir.",
  story: [
    "Hikâye bir kuram sorusuyla başlar. Albert Einstein 1916'daki iki makalesinde ve 1917'de <em>Physikalische Zeitschrift</em>'te yeniden basılan <em>Zur Quantentheorie der Strahlung</em> (Işımanın Kuantum Kuramı Üzerine) ile atomlarla ışınımın dengesini üç süreçle yazdı ve bugün kendi adıyla anılan A ve B katsayılarını tanımladı. Soğurma ve kendiliğinden salım, Bohr'un atomundaki kuantum sıçramalarından tanıdık süreçlerdi; Einstein'ın eklediği üçüncü süreç, gelen ışığın uyarılmış bir atomu kendisiyle aynı türden bir foton salmaya zorlamasıydı. Bu terim olmadan dengedeki ışınım Planck yasasını değil, onun yüksek frekans ucunu, Wien biçimini verir. 1928'de Rudolf Ladenburg uyarılmış salımın ve 'negatif soğurma'nın varlığını deneyle doğruladı; ama fikir bir çeyrek yüzyıl daha bir laboratuvar merakı olarak kaldı.",
    "İlk adım ışıkla değil mikrodalgayla atıldı. Columbia Üniversitesi'nde Charles Townes, James Gordon ve Herbert Zeiger, amonyak molekülleriyle yaklaşık 24 GHz'lik mikrodalgaları güçlendiren ilk <strong>maser</strong>i 1953'te çalıştırdılar; sonucu 1954'te <em>Physical Review</em>'da yayımladılar. Sovyetler Birliği'nde, Lebedev Fizik Enstitüsü'nde Nikolay Basov ile Aleksandr Prokhorov aynı fikre bağımsız olarak ulaşmış, Mayıs 1952'de bir konferansta sunmuş ve Ekim 1954'te yayımlamışlardı. 1955'te terslenmeyi sağlamak için çok düzeyli bir sistemin optik pompalanmasını önerdiler: bu sayfanın 02 sekmesindeki üç ve dört düzey fikrinin kökü. 1964 Nobel Fizik Ödülü'nü Townes, Basov ve Prokhorov 'kuantum elektroniği alanındaki temel çalışmaları için' paylaştı.",
    "Sonra yarış görünür ışığa taşındı. Gordon Gould Kasım 1957'de fikirlerini bir deftere yazdı; o defter 'laser' sözcüğünün bilinen ilk yazılı kaydını taşır. 1958'de Arthur Schawlow ile Townes, optik bir maser için kuramsal hesaplarını <em>Physical Review</em>'da yayımladılar. 16 Mayıs 1960'ta Theodore Maiman, Malibu'daki Hughes Research Laboratories'te ilk çalışan lazeri, 694,3 nm'de kırmızı ışık veren yakut lazerini ateşledi. Aynı yılın sonunda Bell Laboratuvarları'nda Ali Javan, William Bennett ve Donald Herriott helyum ile neondan ilk gaz lazerini kurdular; 1,15 µm'de, kızılötesinde sürekli çalışıyordu. Bugün tanıdığımız kırmızı 632,8 nm'lik He–Ne çizgisi iki yıl sonra geldi. 1964'te Bell Laboratuvarları'nda Joseph Geusic, H. M. Marcos ve L. G. Van Uitert, bugün en yaygın katı hâl lazerlerinden biri olan Nd:YAG'ın çalıştığını gösterdi. Sayfadaki 'yakut benzeri' ve 'Nd:YAG benzeri' hazır ayarlar bu iki ortamın üç ve dört düzeyli şemalarını taklit eder.",
  ],
  core: [
    {
      heading: "Üç süreç ve Einstein katsayıları",
      body:
        "Alt düzeyde N₁, üst düzeyde N₂ atom ve frekansta u enerji yoğunluğu olsun. Soğurma hızı B₁₂uN₁, uyarılmış salım hızı B₂₁uN₂, kendiliğinden salım hızı A₂₁N₂'dir. Uyarılmış salımla doğan foton gelen fotonun kopyasıdır: aynı frekans, yön, evre ve kutuplanma. Kendiliğinden salım ise rastgele yönde ve evrede olur; lazerde gürültüyü o getirir. Katsayılar atomun özelliğidir ve birbirine bağlıdır: katlılıklar g₁, g₂ ise g₁B₁₂ = g₂B₂₁. 01 sekmesinde <strong>Katlılık oranı g₂/g₁</strong> menüsünü 3 yapınca dengedeki oran da üç katına çıkar.",
      formula: "dN₂/dt = B₁₂uN₁ − B₂₁uN₂ − A₂₁N₂",
      formulaNote: "Sayfa zamanı 1/A₂₁ biriminde ölçer; <span class=ov>n</span> = B₂₁u/A₂₁ kipteki ortalama foton sayısıdır.",
    },
    {
      heading: "Planck yasası neden uyarılmış salım ister?",
      body:
        "Isıl dengede nüfuslar Boltzmann'a uyar: N₂/N₁ = (g₂/g₁)e^(−x), x = hν/kT. Net geçişi sıfırlayan u'yu çözünce u = (A/B)/(e^x − 1) çıkar; bu tam olarak Planck yasasıdır ve A/B = 8πhν³/c³ olmak zorundadır. B₂₁ terimini silersen paydadaki −1 kaybolur ve u = (A/B)e^(−x), yani Wien biçimi kalır. Aradaki göreli fark tam e^(−x)'tir: 632,8 nm ve 3000 K'de −0,05 %, 500 nm ve 5800 K'de −0,70 %; hν ≪ kT olan mikrodalgada ise Wien biçimi çöker (1 mm'de −99,52 %). Sayfa bu dengeyi her dalga boyunda sayısal olarak çözer ve iki takım nokta çizer: turkuaz noktalar (B₂₁'li) Planck eğrisine, turuncu noktalar (B₂₁'siz) Wien eğrisine oturur.",
      formula: "u<sub>ν</sub> = (8πhν³/c³) · 1/(e<sup>hν/kT</sup> − 1)",
      formulaNote: "A/B ∝ ν³: aynı u altında uyarılmış salımın kendiliğinden salıma oranı ν³ ile küçülür. Isıl alanda bu oran <span class=ov>n</span> = 1/(e^x − 1)'dir ve kısa dalgada üstel olarak düşer.",
    },
    {
      heading: "Terslenme: neden iki düzey yetmez, üç ya da dört gerekir?",
      body:
        "Pompa, ışığın kendisi gibi simetriktir: W hızıyla yukarı taşıdığı her atomu aynı W hızıyla aşağı da indirir. İki düzeyde kararlı oran N₂/N₁ = Wτ/(1 + Wτ) olur; pompa sonsuza gitse bile 1'e yaklaşır ama geçemez. Üç düzeyde (yakut) pompa atomu üçüncü düzeye çıkarır, oradan τ<sub>h</sub> içinde hızla lazer düzeyine düşer; alt lazer düzeyi taban olduğu için terslenme ancak atomların yarısından fazlası yukarı taşınınca başlar: W<sub>eş</sub> = 1/(τ<sub>üst</sub> − τ<sub>h</sub>). Dört düzeyde (Nd:YAG) alt lazer düzeyi tabanın ΔE kadar üstündedir ve hemen boşalır; ısıl doluluğu yalnız f = e^(−ΔE/kT) kadardır, bu yüzden eşik binlerce kat küçülür.",
      formula: "W<sub>eş</sub>(4 düzey) = f / [τ<sub>üst</sub> − τ<sub>h</sub>(1 + f)]",
      formulaNote: "f → 0 iken eşik sıfıra iner; f = 1 (ΔE/kT = 0) iken eşik aynı ömürlü üç düzeyli şemanınkine eşitlenir, hatta onu biraz aşar (4349'a karşı 4347 s⁻¹).",
    },
    {
      heading: "Rezonatör: eşik, kazanç kilitlenmesi, durulma salınımları",
      body:
        "Aynalar arasında bir tur atan ışık e^(2σN/A) kat güçlenir, R₁R₂e^(−2αL) kat zayıflar. Eşik koşulu bu ikisinin çarpımının 1 olmasıdır: N<sub>eş</sub> = Aδ/(2σ), δ = −ln(R₁R₂) + 2αL. Hız denklemleri dN/dt = P − N/τ − KNq ve dq/dt = KNq − q/τ<sub>c</sub> eşiğin üstünde şaşırtıcı bir şey söyler: kararlı durumda N tam N<sub>eş</sub>'e kilitlenir. Fazla pompa terslenmeyi değil foton sayısını artırır; çıkış pompayla doğrusal büyür ve eğimi η = (λ<sub>p</sub>/λ)(−ln R₂)/δ'dır. Lazer açılırken N eşiği aşar, büyük bir foton sıçraması N'yi eşiğin altına indirir; sistem sönümlü salınımlarla kararlı noktaya oturur. Doğrusallaştırma, frekansı aşağıdaki formülle, sönüm hızını γ = r/(2τ) ile verir (r = P/P<sub>eş</sub>).",
      formula: "f<sub>R</sub> = (1/2π)·√[(r − 1)/(ττ<sub>c</sub>) − (r/2τ)²]",
      formulaNote: "τ üst düzey ömrü, τ<sub>c</sub> = (2L/c)/δ foton ömrü. Rezonatörü uzatmak τ<sub>c</sub>'yi büyütür ve salınımı yavaşlatır.",
    },
    {
      heading: "Kipler, uyumluluk, kip kilitleme ve Gauss demeti",
      body:
        "Rezonatör yalnız tur başına tam sayıda dalga sığan frekanslarda çınlar: kipler c/2L aralıklıdır. Doppler genişliği Δν<sub>D</sub> olan bir kazanç eğrisinde, kaybı aşan bant içine düşen kip sayısı kabaca bant genişliği bölü c/2L'dir. Birçok kip birlikte salınınca ışığın uyumluluk uzunluğu kısalır, kabaca 2L/N. Kiplerin evreleri kilitlenirse alanlar her turda bir kez üst üste biner: süre ≈ 0,886/(NΔν), tepe şiddet ortalamanın N katı olan darbeler doğar. Evreler rastgeleyse aynı kipler gürültülü, darbesiz bir ışık verir. Enine yönde en temiz kip Gauss demetidir: bel w₀'dan sonra demet z<sub>R</sub> = πw₀²/λ'ya kadar neredeyse paraleldir, uzakta θ = λ/(πw₀) açısıyla açılır.",
      formula: "Δt ≈ 0,886/(NΔν), &nbsp; θ = λ/(πw₀), &nbsp; z<sub>R</sub> = πw₀²/λ",
      formulaNote: "Δν = c/2L kip aralığı. Dar bel hızlı açılır: w₀'ı yarıya indirmek ıraksamayı iki katına çıkarır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var: <strong>01 · Einstein katsayıları</strong>, <strong>02 · Nüfus terslenmesi</strong>, <strong>03 · Rezonatör ve eşik</strong>, <strong>04 · Kip ve uyumluluk</strong>. Her sekmede sayfa denklemleri sayısal olarak çözer ve ölçtüğü değeri kapalı biçim formülün yanında, farkıyla yazar: kutuların yanında kuram ve fark durur. Ortam değerlerinin bir kısmı (σ, kip alanı, τ<sub>h</sub>) öğretim değeridir ve sayfada öyle etiketlenmiştir. Her sekmenin <strong>Sekmeyi sıfırla</strong> düğmesi, form dışındayken R tuşu da aynı işi görür.",
    experiments: [
      {
        title: "Einstein'ın eksik terimi",
        predict: "01 sekmesinde uyarılmış salımı kapatırsan atomlar yine Boltzmann oranına oturur mu? Görünür ışıkta mı, mikrodalgada mı daha çok saparlar?",
        do: "Varsayılanda (632,8 nm, 3000 K) <strong>Uyarılmış salım terimi B₂₁ açık</strong> kutusunu kaldır; sonra <strong>1 mm, 3000 K</strong> düğmesine bas ve kutuyu yeniden işaretle.",
        observe: "632,8 nm'de ölçülen oran 5,117 × 10⁻⁴, Boltzmann 5,114 × 10⁻⁴: fark yalnız +0,05 %. 1 mm'de x = 0,004796 ve B₂₁ olmadan ölçülen oran 208,0, Boltzmann 0,9952: fark +20 801,08 %. Kutu açılınca 0,9952'ye iner, fark 0,00 %; tayf durumu Wien/Planck − 1 = −99,52 % yazar.",
        explain: "B₂₁'siz denge oranı Boltzmann'dan tam 1 + <span class=ov>n</span> kat büyüktür, <span class=ov>n</span> = 1/(e^x − 1). Görünürde <span class=ov>n</span> ≈ 5 × 10⁻⁴, 1 mm'de 208. Uyarılmış salım, düşük frekansta kalabalık foton kiplerinin atomları aşağı itmesidir; o olmadan ne denge ne Planck yasası kurulur.",
      },
      {
        title: "Yarıdan fazlası: yakut ile Nd:YAG",
        predict: "Üç düzeyli yakut benzeri ortamda eşik pompası kaç s⁻¹'dir? Aynı üst düzey ömrüyle dört düzeyli bir ortam kaç kat kolay terslenir?",
        do: "02 sekmesinde varsayılanda (<strong>Yakut benzeri (3 düzey)</strong>) Pompa hızı W'yi 316 s⁻¹ ve 1000 s⁻¹'e çek. Sonra <strong>Nd:YAG benzeri (4 düzey)</strong> ve <strong>2 düzey, güçlü pompa</strong> düğmelerini dene.",
        observe: "Yakutta eşik 333,4 s⁻¹ (ölçülen = formül); 316 s⁻¹'de ΔN = −0,02648, 1000 s⁻¹'de 0,4999. Eşikte tabanı terk eden oran 50,000 %. Nd:YAG benzerinde eşik 0,2944 s⁻¹, terk eden 0,014 %; durum satırı aynı ömürlü üç düzeyli eşikten 14 765 kat küçük der. İki düzeyde W = 1,00 × 10⁵ s⁻¹'de bile N₂/N₁ = 0,9967.",
        explain: "Üç düzeyde alt lazer düzeyi tabandır; terslenme atomların yarısı yukarı taşınmadan başlamaz. Dört düzeyde alt düzey boş kalır (f = 6,8 × 10⁻⁵). Alt lazer düzeyi ΔE/kT'yi 0'a çekersen eşik 4349 s⁻¹'e fırlar: avantaj yok olur.",
      },
      {
        title: "Rezonatörün açılışı ve kilitlenen kazanç",
        predict: "Pompayı eşiğe yaklaştırınca durulma salınımı hızlanır mı, yavaşlar mı? Kararlı terslenme N değişir mi?",
        do: "03 sekmesinde varsayılanı (Soğurulan pompa gücü 5,0 W) oku, sonra <strong>Eşiğin hemen üstü</strong> (1,2 W) düğmesine bas. Ardından <strong>Yüksek kayıp: R₂ = 0,80</strong> düğmesine bas; hazır düğmeler yalnız kendi değerini değiştirdiği için pompa 1,2 W'ta kalır. En son pompayı yeniden 5,0 W'a çek.",
        observe: "5 W'ta çıkış 3,05 W, salınım 186 kHz (kuram 186 kHz), eşiğe varış 50,1 µs, ilk sıçrama kararlı gücün 18,5 katı. 1,2 W'ta 168 mW, 43,7 kHz, 389 µs. İkisinde de N = 9,160 × 10¹⁴. R₂ = 0,80 ve 1,2 W'ta lazer söner: r = 0,282, çıkış ≈ 0, durum satırı 'Eşiğin altında' der. 5,0 W'a dönünce eşik 4,26 W, çıkış 563 mW, salınım 80,0 kHz; eğim verimi yine 75,94 %.",
        explain: "Eşiğin üstünde N, tur kazancını kayba eşitleyen değere kilitlenir; fazla pompa fotona gider. f<sub>R</sub> ∝ √(r − 1) olduğu için eşiğe yaklaşınca salınım yavaşlar. R₁ = 1 iken bütün kayıp çıkış aynasındadır, bu yüzden eğim yalnız λ<sub>p</sub>/λ = 808/1064 kuantum oranına eşittir.",
      },
      {
        title: "Kipler, uyumluluk ve darbeler",
        predict: "30 cm'lik He–Ne benzeri rezonatörde kaç kip salınır? Kipleri kilitlersen darbe kaç pikosaniye olur?",
        do: "04 sekmesinde varsayılanı oku (g₀/g<sub>eş</sub> = 2,00, Kip sayısı N = 10, evreler kilitli). Sonra <strong>Kayma 0,5</strong>'e bas ve Kiplerin evreleri menüsünü rastgeleye çevir. En son <strong>Sekmeyi sıfırla</strong> ile kaymayı 0'a döndürüp <strong>Kısa rezonatör: 10 cm</strong>'yi dene.",
        observe: "Kip aralığı 500 MHz, 3 kip, uyumluluk uzunluğu 153 mm (kaba tahmin 200 mm). Kilitli 10 kipte darbe 178 ps, kuram 177 ps, tepe/ortalama 10,00. Kayma 0,5'te 4 kip (kenardaki ikisi eşiğin ancak üstünde) ama ortalama sayım yine 3,002. Rastgele evrelerde darbe genişliği '—', tepe/ortalama 2,86. 10 cm'de aralık 1,50 GHz, tek kip: uyumluluk 'sınırsız (tek kip)'. Kayma 0,5'te kalsaydın 10 cm'de bile iki kip salınırdı.",
        explain: "Eşiğin üstündeki 1,5 GHz'lik banda 500 MHz aralıklı ortalama üç kip sığar. Darbe süresi toplam bant genişliğinin tersidir: 0,886/(10 × 500 MHz) = 177 ps. Evreler rastgeleyse aynı tayf darbe değil gürültü verir.",
      },
    ],
  },
  wow: [
    {
      title: "X ışını lazeri neden bu kadar zor?",
      body:
        "A/B oranı ν³ ile büyür. 01 sekmesinde <strong>1 nm X ışını</strong> düğmesine basınca sayfa, A/B'nin 632,8 nm'dekinin 2,53 × 10⁸ katı olduğunu yazar. Aynı B katsayısında kendiliğinden salım da o kadar hızlıdır: üst düzey yüz milyonlarca kat çabuk boşalır ve terslenmeyi ayakta tutacak pompa en az o oranda büyümek zorundadır. 1 nm'de x = 4796 olduğundan e^(−x) çift duyarlıklı sayının altına iner; sayfa ölçülen oranı '0 (alt taşma)' diye yazar.",
    },
    {
      title: "Lazer önce bir mikrodalga cihazıydı",
      body:
        "İlk uyarılmış salım yükselteci ışık değil, yaklaşık 24 GHz'lik mikrodalga güçlendiriyordu: 1953'te Columbia'da amonyak molekülleriyle çalışan maser. Adı 'uyarılmış ışıma salımıyla mikrodalga yükseltme'nin baş harflerinden gelir; lazer sözcüğü aynı kalıbın ışığa uyarlanmasıdır.",
    },
    {
      title: "Bir sözcüğün doğduğu defter",
      body:
        "'Laser' sözcüğünün bilinen ilk yazılı kaydı, Gordon Gould'un Kasım 1957'de fikirlerini not ettiği defterdedir. Bir yıl sonra Schawlow ile Townes kuramsal hesaplarını yayımladı, 1960'ta Maiman yakut lazerini çalıştırdı. Fikirden çalışan cihaza giden yol üç yıldan kısa sürdü.",
    },
  ],
  worked: {
    title: "Nd:YAG benzeri rezonatörün eşiği ve çıkışı",
    prompt:
      "L = 10 cm'lik bir rezonatörde arka ayna R₁ = 1, çıkış aynası R₂ = 0,95, iç kayıp yok. Ortam: τ = 230 µs, λ = 1064 nm, pompa λ<sub>p</sub> = 808 nm, σ = 2,8 × 10⁻²³ m², kip alanı A = 1,0 × 10⁻⁶ m². Foton ömrünü, eşik terslenmesini, eşik pompa gücünü, 10 W pompada çıkış gücünü ve durulma salınımı frekansını bul.",
    steps: [
      "Tur kaybı δ = −ln(R₁R₂) = −ln 0,95 = 0,05129. Tur süresi 2L/c = 0,20 m / (3,00 × 10⁸ m/s) = 0,667 ns, foton ömrü τ<sub>c</sub> = 0,667 ns / 0,05129 = 13,0 ns.",
      "Eşik: tur kazancı e^(2σN/A) = 1/(R₁R₂) olmalı, yani N<sub>eş</sub> = Aδ/(2σ) = (1,0 × 10⁻⁶ m²)(0,05129) / (2 · 2,8 × 10⁻²³ m²) = 9,160 × 10¹⁴ terslenmiş atom.",
      "Bu terslenmeyi korumak için saniyede N<sub>eş</sub>/τ = 3,98 × 10¹⁸ atom pompalanmalı. 808 nm'lik bir foton hc/λ<sub>p</sub> = 2,458 × 10⁻¹⁹ J taşır, dolayısıyla P<sub>eş</sub> = 3,98 × 10¹⁸ s⁻¹ × 2,458 × 10⁻¹⁹ J ≈ 0,979 W.",
      "Eğim verimi η = (808/1064)·(−ln R₂)/δ = 0,7594 (R₁ = 1 olduğundan bütün kayıp çıkış aynasında). 10 W pompada P<sub>çıkış</sub> = 0,7594 × (10 − 0,979) W ≈ 6,85 W.",
      "r = 10/0,979 = 10,21. f<sub>R</sub> = (1/2π)√[(r − 1)/(ττ<sub>c</sub>) − (r/2τ)²] = (1/2π)√[9,21/(230 × 10⁻⁶ s × 13,0 × 10⁻⁹ s) − (22 204 s⁻¹)²] ≈ 279 kHz. Eşiğe varış τ ln[r/(r − 1)] = 230 µs × 0,103 ≈ 23,7 µs.",
      "Sayfada dene: 03 sekmesinde Soğurulan pompa gücü'nü 10,0 W yap. Ölçülen çıkış 6,85 W, ölçülen salınım frekansı 279 kHz, eşiğe varış 23,7 µs; kararlı N yine 9,160 × 10¹⁴, eşik pompası 979 mW.",
    ],
    result:
      "τ<sub>c</sub> = 13,0 ns, N<sub>eş</sub> = 9,160 × 10¹⁴, P<sub>eş</sub> = 0,979 W, 10 W'ta 6,85 W çıkış ve 279 kHz durulma salınımı. Pompayı 5 W'tan 10 W'a çıkarmak frekansı √(9,21/4,11) ≈ 1,50 kat artırır (186 kHz'den 279 kHz'e).",
  },
  misconceptions: [
    {
      myth: "Yeterince güçlü pompayla iki düzeyli bir sistemde de nüfus terslenmesi sağlanır.",
      truth:
        "Pompa ışığı aşağı yönde de aynı hızla uyarılmış salım yaptırır. Kararlı oran N₂/N₁ = Wτ/(1 + Wτ) 1'e yaklaşır ama onu geçemez: 02 sekmesinde <strong>2 düzey, güçlü pompa</strong> ile W = 10⁷ s⁻¹'de bile 0,999967 okunur. Terslenme için pompanın ve lazerin ayrı geçişleri kullanması gerekir.",
    },
    {
      myth: "Pompayı artırdıkça ortamdaki terslenme de artmaya devam eder.",
      truth:
        "Eşiğin üstünde terslenme N<sub>eş</sub>'e kilitlenir; fazladan pompalanan her atom hemen bir foton olarak kipe geçer. 03 sekmesinde 1,2 W'ta da 5 W'ta da kararlı N = 9,160 × 10¹⁴'tür; değişen yalnız çıkış gücüdür.",
    },
    {
      myth: "Uyarılmış salımla çıkan foton rastgele bir yöne gider, tıpkı kendiliğinden salım gibi.",
      truth:
        "Uyarılmış salımla doğan foton, onu tetikleyen fotonla aynı kipe girer: aynı frekans, yön, evre ve kutuplanma. Kendiliğinden salım ise bütün kiplere dağılır; rezonatör kipine düşen küçük payı lazerin ilk tohumudur (sayfadaki β = 10⁻⁹).",
    },
    {
      myth: "Lazer demeti hiç yayılmaz, sonsuza kadar aynı kalınlıkta gider.",
      truth:
        "Kırınım her demeti açar. 632,8 nm ve w₀ = 0,50 mm için θ = λ/(πw₀) = 0,4029 mrad ve z<sub>R</sub> = 1,241 m; yüz metre sonra demet yarıçapı yaklaşık 4 cm olur. 04 sekmesinde sayfanın FFT ile ölçtüğü ıraksama 0,4026 mrad'dir.",
    },
  ],
  glossary: [
    { term: "Uyarılmış salım", definition: "Gelen bir fotonun uyarılmış atomu, kendisiyle aynı frekans, yön ve evrede ikinci bir foton salmaya zorlaması; ışığı güçlendiren süreç." },
    { term: "Kendiliğinden salım", definition: "Uyarılmış atomun dış alan olmadan, A₂₁ hızıyla ve rastgele yönde foton salarak alt düzeye inmesi." },
    { term: "Einstein katsayıları", definition: "A₂₁ (kendiliğinden salım), B₁₂ (soğurma) ve B₂₁ (uyarılmış salım); g₁B₁₂ = g₂B₂₁ ve A₂₁/B₂₁ = 8πhν³/c³ ile birbirine bağlıdır." },
    { term: "Nüfus terslenmesi", definition: "Üst lazer düzeyindeki atom sayısının alt düzeydekinden büyük olması; ortamın soğurmak yerine güçlendirmesi için gereken koşul." },
    { term: "Eşik koşulu", definition: "Bir rezonatör turundaki kazancın tur kaybına eşit olması: e^(2σN/A)·R₁R₂e^(−2αL) = 1." },
    { term: "Kazanç kilitlenmesi", definition: "Eşiğin üstünde terslenmenin ve kazancın pompadan bağımsız olarak eşik değerinde sabit kalması." },
    { term: "Boyuna kip", definition: "Rezonatörde tur boyuna tam sayıda dalga sığan frekans; komşu kipler arası aralık c/2L." },
    { term: "Kip kilitleme", definition: "Birçok boyuna kipin evrelerinin sabitlenmesi; sonuçta her turda bir kez, süresi yaklaşık 0,886/(NΔν) olan kısa darbeler oluşur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın ilk iki sekmesi <strong>Modern Fizik</strong> ve <strong>İstatistik Fizik</strong>'in kesiştiği yerdedir: Boltzmann dağılımı, kara cisim ışıması ve ayrıntılı denge. A ve B katsayılarının değerini ise <strong>Kuantum Mekaniği</strong>'nde zamana bağlı tedirgeme kuramı ve Fermi'nin altın kuralı verir; kendiliğinden salımın kökeni tam olarak ancak elektromanyetik alan da kuantumlanınca anlaşılır. Einstein'ın termodinamik bağıntısı A/B = 8πhν³/c³, bu derin kuramı beklemeden doğru sonucu verir.",
      "Son iki sekme <strong>Lazer Fiziği</strong> ve <strong>Fotonik</strong> derslerinin çekirdeğidir. Hız denklemleri evreyi yok sayar; evreyi, kip yarışmasını ve tayf çizgisinin yapısını Maxwell–Bloch denklemleri ve yarı klasik lazer kuramı ele alır. Gauss demeti ve rezonatör kararlılığı <strong>Optik</strong>'te ABCD matrisleriyle, kip kilitleme ise ultra hızlı optikte Fourier dönüşümüyle derinleşir. Gerçek lazerlerle çalışırken demete ya da yansımasına doğrudan bakılmaz ve dalga boyuna uygun koruyucu gözlük kullanılır.",
    ],
    topics: ["Ayrıntılı denge", "Zamana bağlı tedirgeme", "Hız denklemleri", "Optik rezonatörler", "Gauss optiği", "Ultra hızlı optik"],
  },
  quiz: [
    {
      question: "Uyarılmış salımın kendiliğinden salıma oranı <span class=ov>n</span> = B₂₁u/A₂₁'dir. Aynı enerji yoğunluğu u altında geçişin dalga boyunu 632,8 nm'den 63,28 nm'ye indirirsen bu oran nasıl değişir?",
      options: ["10 kat artar", "Değişmez", "10 kat azalır", "1000 kat azalır"],
      answer: 3,
      explanation: "A/B ∝ ν³; dalga boyu 10 kat kısalınca ν 10 kat, A/B 1000 kat büyür. Aynı u ile <span class=ov>n</span> = u/(A/B) bin kat küçülür. X ışını lazerlerinin zorluğu buradan gelir: 01 sekmesinde 1 nm için ölçek çarpanı 2,53 × 10⁸'dir.",
    },
    {
      question: "R₁ = 1, iç kayıp sıfır. Çıkış aynasını R₂ = 0,95'ten 0,80'e indirirsen eşik pompası ve eğim verimi ne olur?",
      options: [
        "Eşik yaklaşık 4,35 kat artar, eğim verimi değişmez",
        "Eşik değişmez, eğim verimi artar",
        "İkisi de yaklaşık 4,35 kat artar",
        "Eşik artar, eğim verimi yarıya iner",
      ],
      answer: 0,
      explanation: "Eşik δ = −ln R₂ ile orantılıdır: 0,2231/0,05129 ≈ 4,35, yani 979 mW'tan 4,26 W'a. Eğim η = (λ<sub>p</sub>/λ)(−ln R₂)/δ'da ise R₁ = 1 ve α = 0 iken (−ln R₂)/δ = 1'dir; eğim 75,94 % kalır. Bu yalnız iç kayıp sıfırken doğrudur: α > 0 iken (−ln R₂)/δ < 1 olur ve çıkış aynasını değiştirmek eğimi de değiştirir. Sayfada varsayılandan 'Yüksek kayıp: R₂ = 0,80' düğmesiyle doğrula.",
    },
    {
      question: "Pompa oranı r ve aynalar aynı kalırken rezonatör uzunluğunu 10 kat artırırsan durulma salınımı frekansı yaklaşık ne olur?",
      options: ["10 kat artar", "Değişmez", "√10 ≈ 3,2 kat azalır", "10 kat azalır"],
      answer: 2,
      explanation: "Tur süresi 2L/c ve onunla foton ömrü τ<sub>c</sub> 10 kat uzar. f<sub>R</sub> ≈ (1/2π)√[(r − 1)/(ττ<sub>c</sub>)] olduğundan frekans √10 kat düşer: 186 kHz'den 58,9 kHz'e ('Uzun rezonatör: 1 m'). Eşik ve çıkış gücü L'ye bağlı değildir, ikisi de aynı kalır.",
    },
  ],
  next: [
    { href: "kara-cisim-isimasi.html", title: "Kara Cisim Işıması: Planck, Wien ve Stefan–Boltzmann", why: "Einstein'ın dengesinden çıkan Planck eğrisi: sıcaklıkla kayan tepe, Wien yasası ve toplam gücün T⁴ ile büyümesi." },
    { href: "fotoelektrik.html", title: "Fotoelektrik Olay: Planck Sabitini Ölç", why: "Işığın foton foton soğurulduğunun en doğrudan kanıtı; durdurma gerilimlerinden hν = E ilişkisini kendin ölç." },
    { href: "klasik-girisim.html", title: "Young'un Çift Yarık Deneyi: Işığın Girişimi", why: "Saçaklar iki yarıktan gelen ışığın evresi birbirine bağlıysa oluşur. O sayfa kusursuz uyumlu bir kaynak varsayar ve Δy = λL/d'yi ölçtürür; lazerin neden ideal girişim kaynağı olduğunu orada görürsün." },
    { href: "elektromanyetik-dalgalar-ve-polarizasyon.html", title: "Elektromanyetik Dalgalar ve Polarizasyon: Malus, Brewster, Dalga Plakaları", why: "Lazer ışığının bir başka özelliği olan kutuplanma: polarizörler, Brewster açısında yansımanın sönmesi ve dalga plakaları." },
  ],
  sources: [
    { title: "Wikipedia · Einstein coefficients", url: "https://en.wikipedia.org/wiki/Einstein_coefficients", note: "A ve B katsayıları, g₁B₁₂ = g₂B₂₁ ve A/B bağıntısı, Planck yasasının türetilişi; Einstein'ın 1916 ve 1917 makalelerinin künyeleri (İngilizce)." },
    { title: "Wikipedia · Laser", url: "https://en.wikipedia.org/wiki/Laser", note: "Tarihçe: Einstein 1917, Ladenburg 1928, Townes–Gordon–Zeiger maseri, Basov ve Prokhorov, Gould'un 1957 defteri, Schawlow–Townes 1958, Maiman 16 Mayıs 1960, ilk He–Ne lazeri ve 1964 Nobel Ödülü (İngilizce)." },
    { title: "Wikipedia · Maser", url: "https://en.wikipedia.org/wiki/Maser", note: "1953 Columbia amonyak maseri ve yaklaşık 24 GHz frekansı, Basov ile Prokhorov'un 1952 sunumu ve 1954 yayını (İngilizce)." },
    { title: "Wikipedia · Nd:YAG laser", url: "https://en.wikipedia.org/wiki/Nd:YAG_laser", note: "1064 nm geçişi, 230 µs floresans ömrü ve Geusic ile çalışma arkadaşlarının 1964 Bell Laboratuvarları gösterimi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
