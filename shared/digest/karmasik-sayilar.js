window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["karmasik-sayilar"] = {
  slug: "karmasik-sayilar",
  title: "Karmaşık Sayılar: Çarpmak Döndürmektir",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "i ile çarpmak düzlemi 90° döndürür; her karmaşık sayıyla çarpmak bir döndürme ve bir büyütmedir. Euler formülü, birim kökler ve açıları koruyan dönüşümler bu tek fikrin üstüne kurulur.",
  hook:
    "Hangi sayının karesi −1'dir? Sayı doğrusunda yok, çünkü pozitifin de negatifin de karesi pozitiftir; ama −1 ile çarpmayı 'yarım tur dönmek' diye okursan cevap düzlemde kendiliğinden belirir. İki kez yapılınca yarım tur eden hareket çeyrek turdur: i ile çarpmak 90° dönmektir ve i·i = −1, iki çeyrek turun bir yarım tur etmesinden ibarettir.",
  bigIdea:
    "Bir karmaşık sayıyla çarpmak düzlemi döndürüp büyütmektir (uzunluklar çarpılır, açılar toplanır: <em>|zw| = |z||w|</em>, <em>arg zw = arg z + arg w</em>); Euler formülü <em>e<sup>iθ</sup> = cos θ + i sin θ</em> bu dönmenin adıdır, kökler, kuvvetler ve açıları koruyan dönüşümler de onun sonuçlarıdır.",
  story: [
    "Karmaşık sayılar x² = −1'i çözmek için icat edilmedi; o denkleme 'çözümü yok' denip geçiliyordu. Onları matematiğe sokan, üçüncü dereceden denklemlerdi. Girolamo Cardano 1545'te <em>Ars Magna</em>'da kübik denklemin çözüm formülünü yayımladı; yöntemi Scipione del Ferro ve Niccolò Tartaglia bulmuştu ve Tartaglia, Cardano'nun ona sır tutma sözü verdiğini öne sürdü. Aynı kitapta Cardano 10'u, çarpımı 40 olan iki parçaya böldü: 5 + √−15 ve 5 − √−15. Çarpımın gerçekten 25 − (−15) = 40 ettiğini gösterdi ama bu hesaba pek değer vermedi; ilgili cümlesi İngilizce çevirilerde aşağı yukarı 'ince olduğu kadar yararsız' diye aktarılır.",
    "Asıl sıkıntı başkaydı: x³ = 15x + 4 denkleminin bir kökü 4'tür (64 = 60 + 4), oysa Cardano'nun formülü x = ∛(2 + √−121) + ∛(2 − √−121) verir. Apaçık gerçel bir kök, eksi sayıların karekökleriyle yazılıyordu. 1572'de Rafael Bombelli <em>L'Algebra</em>'da cesur bir adım attı: √−1'i sıradan bir sayı gibi kullandı ve (2 + √−1)³ = 2 + √−121 olduğunu fark etti. İki küp kök 2 + √−1 ile 2 − √−1'dir, toplamları 4. Gerçel bir cevaba, 'imkânsız' sayıların içinden geçerek varılmıştı. Bombelli'nin küpünü sayfanın Düzlemde işlemler sekmesinde de kurabilirsin: z = w = 2 + i çarpımı 3 + 4i, ardından z = 3 + 4i, w = 2 + i çarpımı 2 + 11i verir.",
    "Adlar bu tedirginliği hâlâ taşır. René Descartes 1637'de <em>La Géométrie</em>'de bu köklere 'hayalî' (<em>imaginaires</em>) dedi; Türkçedeki 'sanal' sözcüğü bu adın karşılığıdır. Leonhard Euler ise onlarla korkusuzca hesap yaptı. 1748'de <em>Introductio in analysin infinitorum</em>'da üstel fonksiyonu trigonometriye bağlayan formülü yayımladı: e<sup>ix</sup> = cos x + i sin x. Aynı bağıntıyı logaritma diliyle 1714'te Roger Cotes da yazmıştı. √−1 yerine i harfini Euler 1777'de önerdi (yazı ancak 1794'te basıldı). Her polinom denkleminin bu sayılar arasında kökü bulunduğu 17. yüzyıldan beri tahmin ediliyordu; d'Alembert 1746'da, Euler 1749'da kanıtlamayı denedi. 1799'da 22 yaşındaki Carl Friedrich Gauss doktora tezinde bu girişimlerin eksiklerini eleştirip yeni bir kanıt verdi; ama onun kanıtında da topolojik bir boşluk vardı ve o boşluğu ancak 1920'de Alexander Ostrowski kapattı. Gauss bu <strong>cebirin temel teoremine</strong> ömrü boyunca dört kanıt yazdı, sonuncusunu 1849'da; Fransa'da teorem bugün de d'Alembert–Gauss teoremi diye anılır.",
    "Sayıları düzleme yerleştirmek bir haritacının işi oldu. Norveç doğumlu ölçmen ve haritacı Caspar Wessel'in yönlerin cebirle gösterilmesi üzerine yazısı, 10 Mart 1797'de Danimarka Kraliyet Bilimler Akademisi'nde onun adına okundu: Wessel Akademi üyesi değildi, yazıyı matematikçi Johannes Nikolaus Tetens sundu. Yazı doğru parçalarını toplamayı uç uca eklemek, çarpmayı ise boyları çarpıp açıları toplamak olarak tanımlıyordu. 1799'da Danca basıldı ve neredeyse bir yüzyıl fark edilmedi; Akademi Fransızca çevirisini 1897'de yayımladı. 1806'da Paris'te yaşayan İsviçreli amatör matematikçi Jean-Robert Argand aynı fikri adını koymadan küçük bir kitapçıkta anlattı; cebirin temel teoreminin ilk eksiksiz kanıtını da aynı yıl bu amatör yayımladı. Fikre itibar kazandıran Gauss oldu: 1831'de 'karmaşık sayı' adını kullandı ve +1, −1 ve √−1'e pozitif, negatif ve sanal birim yerine doğrudan, ters ve yanal birim denseydi konunun etrafındaki karanlığa pek yer kalmayacağını yazdı. 4 Kasım 1833'te William Rowan Hamilton, İrlanda Kraliyet Akademisi'nde karmaşık sayıyı bir gerçel sayı çifti olarak tanımlayan çalışmasını okudu: (a, b)·(c, d) = (ac − bd, ad + bc). i artık gizemli bir sembol değil, (0, 1) noktasıydı.",
  ],
  core: [
    {
      heading: "Sayı değil, düzlemde bir ok",
      body:
        "Gerçel sayılar bir doğru üzerinde dizilir, karmaşık sayılar bir düzlemde. z = a + bi, yatayda a, düşeyde b birim giden noktadır; 0'dan oraya çizilen ok da aynı sayıdır. Toplama okları uç uca eklemektir: z + w, kenarları z ve w olan paralelkenarın köşegenidir. Sayfadaki 'Paralelkenar' hazır deneyinde 2 + i ile 1 + 2i'nin toplamı 3 + 3i'dir. Okun boyu <strong>modül</strong> |z| = √(a² + b²), pozitif gerçel eksenle yaptığı açı <strong>argümandır</strong>. Açı her 360°'de bir tekrar ettiği için tek bir değer seçmek gerekir: sayfa <strong>esas değeri</strong> kullanır, −180° < arg ≤ 180°. Buna göre arg(−1) = 180°'dir, −180° değil. Modül ile argüman birlikte <strong>kutupsal biçimi</strong> verir.",
      formula: "z = a + bi = r(cos φ + i sin φ),  r = |z| = √(a² + b²),  φ = arg z",
      formulaNote:
        "Varsayılan z = 2 + i için r = √5 ≈ 2.2361 ve φ ≈ 26.57°. Re, Im, |z| ve arg kutularından hangisini değiştirirsen ötekiler ona göre güncellenir.",
    },
    {
      heading: "Çarpma: döndür ve büyüt",
      body:
        "(a + bi)(c + di) = (ac − bd) + (ad + bc)i kuralı ilk bakışta bir ezberdir. Kutupsal biçimde yazınca anlam kazanır: kosinüs ve sinüsün toplam formülleri tam bu çarpımın gerçel ve sanal kısmıdır. Sonuç, boyları çarpılmış ve açıları toplanmış bir oktur. Yani w ile çarpmak, düzlemin her noktasını 0 çevresinde arg w kadar döndürüp |w| kat büyütmektir. Geometride bunun adı benzerliktir: 0–1–w üçgeni ile 0–z–zw üçgeni benzerdir ve sayfa çarpımı bu üçgenden iletki ile cetvelle kurar. i'nin modülü 1, argümanı 90°'dir; i ile çarpmak yalnızca çeyrek tur döndürür. Bölme ters harekettir: geri döndür, küçült. <strong>Eşlenik</strong> <span class=ov>z</span> = a − bi gerçel eksene göre yansımadır ve z ≠ 0 iken z·<span class=ov>z</span> = |z|² her zaman pozitif bir gerçel sayıdır. Logaritma alınca çarpma toplamaya döner: sayfanın alttaki iki cetvelinde açılar ve log uzunluklar ok gibi uç uca eklenir.",
      formula: "zw = r₁r₂[cos(φ₁ + φ₂) + i sin(φ₁ + φ₂)],  |zw| = |z||w|,  arg zw = arg z + arg w (mod 360°)",
      formulaNote:
        "Toplam esas aralıktan taşarsa 360° eklenir ya da çıkarılır. Matris dilinde a + bi ile çarpmak [a −b; b a] matrisidir: bir döndürme çarpı bir ölçekleme.",
    },
    {
      heading: "Euler formülü: e<sup>iθ</sup> neden çemberde?",
      body:
        "eˣ'in serisi 1 + x + x²/2! + x³/3! + … her sayı için yakınsar; aynı seriye x = iθ koymak e<sup>iθ</sup>'nın tanımıdır. i'nin kuvvetleri dört adımda bir tekrar eder: 1, i, −1, −i. Bu yüzden çift numaralı terimler gerçel, tek numaralılar sanal çıkar; seri mutlak yakınsadığı için onu iki seriye ayırmak serbesttir: gerçel kısım 1 − θ²/2! + θ⁴/4! − …, yani cos θ; sanal kısım θ − θ³/3! + …, yani sin θ. Geometrisi daha çarpıcıdır: her terim bir öncekinin iθ/k katıdır, yani 90° döner ve boyu |θ|/k ile çarpılır; k, |θ|'yı geçince terimler hızla kısalır. Kısmi toplamlar (θ > 0 iken) her adımda sola kıvrılan bir yol çizer ve yol birim çemberdeki noktaya sarılır. Neden çember? f(θ) = e<sup>iθ</sup> için f′ = i·f: hız her an konuma diktir ve boyu 1'dir. Konuma dik hareket 0'a uzaklığı değiştirmez; birim hız da θ sürede θ uzunluğunda yay demektir. θ = π'de yarım çember tamamlanır: e<sup>iπ</sup> = −1.",
      formula: "e<sup>iθ</sup> = Σ<sub>k≥0</sub> (iθ)<sup>k</sup>/k! = cos θ + i sin θ,   |e<sup>iθ</sup> − S<sub>n</sub>| ≤ |θ|<sup>n</sup>/n!",
      formulaNote:
        "θ radyan cinsindendir. S<sub>n</sub> ilk n terimin toplamıdır; sınır ilk atılan terimin büyüklüğüdür ve θ = π, n = 13 için 4.66·10⁻⁴ eder.",
    },
    {
      heading: "Kuvvetler, kökler ve cebirin temel teoremi",
      body:
        "Çarpma açıları topladığına göre bir sayıyı n kez kendisiyle çarpmak açısını n katına, modülünü n'inci kuvvetine çıkarır: de Moivre formülü. r > 1 ise noktalar dışa, r < 1 ise içe doğru bir logaritmik sarmal üzerinde dizilir. Tersini sor: zⁿ = c'yi hangi z sağlar? Modül |c|<sup>1/n</sup> olmalı; açı ise n ile çarpılınca arg c'ye ya da ondan 360°'nin bir katı kadar farklı bir açıya varmalı. Böylece n farklı açı çıkar ve kökler |c|<sup>1/n</sup> yarıçaplı çemberde <strong>düzgün bir n-gen</strong> kurar. −8'in küp kökleri yalnızca −2 değildir; 1 ± √3·i'nin (≈ 1 ± 1.732i) küpü de −8'dir. Köklerin toplamı 0'dır, çünkü zⁿ − c'de zⁿ⁻¹ terimi yoktur; kökleri 360°/n döndürmek kümeyi değiştirmediği için toplam da kendi döndürülmüşüne eşittir, bu yalnızca 0 için olur. Genel kural <strong>cebirin temel teoremidir</strong>: n'inci dereceden her polinomun, katlılıklar sayılınca tam n karmaşık kökü vardır. Yeni bir sayı türüne gerek kalmaz.",
      formula: "w<sub>k</sub> = |c|<sup>1/n</sup>·e<sup>i(arg c + 2πk)/n</sup>,  k = 0, 1, …, n − 1",
      formulaNote:
        "w₀ esas köktür; kökler birbirinden 360°/n uzaktır. n ≥ 2 için toplamları 0, çarpımları (−1)<sup>n+1</sup>c'dir.",
    },
    {
      heading: "Düzlemi eğen fonksiyonlar: konformluk, kritik noktalar, kutuplar",
      body:
        "f(z) = z² gibi bir fonksiyon düzlemin bir resmini başka bir düzleme çizer. Türev gerçel analizdeki gibi tanımlanır, f′(z₀) = lim [f(z₀ + Δz) − f(z₀)]/Δz; ama Δz artık her yönden 0'a yaklaşabilir ve limit yönden bağımsız olmalıdır. Bu güçlü bir koşuldur: z₀ çevresinde f, f′(z₀) ile çarpmaya benzer, küçük bir şekli arg f′ kadar döndürür ve |f′| kat büyütür. Bu yüzden f′ ≠ 0 olan her noktada iki eğri arasındaki açı korunur; f <strong>konformdur</strong>. Gerçel dilde bu koşul Cauchy–Riemann denklemleridir: f = u + iv için u<sub>x</sub> = v<sub>y</sub> ve u<sub>y</sub> = −v<sub>x</sub>, yani f'nin yerel matrisi [a −b; b a] biçiminde bir döndür-büyüt matrisidir. f′ = 0 olan <strong>kritik noktalarda</strong> açılar korunmaz, katlanır: z² 0'da açıları ikiye katlar. <strong>Kutuplarda</strong> f sonsuza kaçar (1/z için z = 0). Joukowski dönüşümü z + 1/z'nin kritik noktası olan −1'den geçen bir çemberin oradaki 180°'lik düz açısı 360°'ye açılır: görüntüde sivri bir kanat ucu belirir.",
      formula: "f(z₀ + Δz) ≈ f(z₀) + f′(z₀)·Δz",
      formulaNote:
        "z² için f′(z) = 2z; z₀ = 1 + i'de f′ = 2 + 2i = 2√2·e<sup>i45°</sup>: küçük kare 2.83 kat büyür, 45° döner, alanı 8 katına çıkar.",
    },
  ],
  lab: {
    intro:
      "Üç sekme var. <strong>Düzlemde işlemler</strong>: z ile w'yi sürükle, kaydırıcılarla taşı ya da Re, Im, |·| ve arg kutularına yaz; İşlem menüsünden toplama, çıkarma, çarpma, bölme ya da eşlenik seç. Tablonun 'Ölçülen (çizim)' sütunu cebirden değil çizimden gelir: çarpmada 0–1–w üçgeninin açısı iletkiyle, |0w|/|01| oranı cetvelle ölçülür ve z bu açıyla döndürülüp bu oranla büyütülür. Bu kurulum kesindir; 'Fark' sütunu yalnızca kayan nokta yuvarlamasını (10⁻¹⁶ düzeyi) gösterir. <strong>Euler formülü ve kökler</strong> sekmesinin Konu menüsünde üç deney var: Euler serisi, De Moivre kuvvetleri ve n'inci kökler. <strong>Düzlemi eğen fonksiyonlar</strong> sekmesinde z², 1/z, eᶻ, Joukowski ve Möbius dönüşümlerinden birini seç: merkezi z₀, kenarı h olan küçük karenin görüntüsü ölçülür ve f′(z₀)'ın öngördüğü büyütme, dönme ve açıyla karşılaştırılır. Her sekmenin Sıfırla düğmesi (ya da R tuşu) varsayılana döndürür.",
    experiments: [
      {
        title: "1 + i ile çarpmak: 45° döndür, √2 kat büyüt",
        predict:
          "z = 2 + i'yi w = 1 + i ile çarpınca sonuç nereye düşer? |w| = √2 ve arg w = 45° olduğuna göre z'nin kaç derece döneceğini, kaç kat uzayacağını ve zw'nin argümanını önceden yaz. i · i'nin argümanı ne olur? Argümanları 153.43° ve 135° olan iki sayının çarpımının argümanı 288.43° olabilir mi?",
        do: "Düzlemde işlemler sekmesinde Sıfırla'ya bas (z = 2 + i, w = 1 + i, Çarpma). Tabloyu oku; sonra Çarpmayı canlandır düğmesiyle noktanın z'den zw'ye sarmal çizerek gidişini izle. Ardından 'i · i = −1' ve 'Açılar 180°'yi aşar' hazır deneylerini sırayla seç ve durum satırını oku.",
        observe:
          "Varsayılanda kurulan nokta 1 + 3i, fark 2.2·10⁻¹⁶; |z · w| = 3.162278 (√10), arg(z · w) = 71.5651° = 26.5651° + 45°, Dönme 45.0000°, Büyütme 1.414214, Benzerlik 2.236068. i · i'de sonuç −1 + 0i, arg 180.0000°, dönme 90.0000°; durum satırı '|w| = 1: yalnız dönme, uzunluk korunur' diye biter. Son deneyde z = −2 + i, w = −1 + i: durum satırı 'arg z + arg w = 288.43° esas aralığın dışında; 360° çıkarılınca arg(z · w) = −71.57°' yazar ve çarpım 1 − 3i çıkar.",
        explain:
          "Modüller çarpılır (√5 · √2 = √10), açılar toplanır. 0–1–w ve 0–z–zw üçgenleri benzer olduğu için çarpım iletki ve cetvelle kurulabilir; kurulum kesin olduğundan fark 10⁻¹⁶ düzeyinde kalır, yalnızca kayan nokta yuvarlar. Açı 360°'de bir tekrar ettiği için esas argüman toplamı (−180°, 180°] aralığına geri sarar: arg zw = arg z + arg w kuralı 360°'nin bir katı farkıyla geçerlidir.",
      },
      {
        title: "Euler serisi −1'e kaç terimde varır?",
        predict:
          "θ = π iken Σ(iθ)ᵏ/k! serisinin ilk 8 teriminin toplamı −1'e ne kadar yakındır? πⁿ/n! sınırını kullanarak hatanın kaç terimden sonra 10⁻³'ün altına ineceğini tahmin et. Her yeni terim bir öncekine göre kaç derece döner?",
        do: "Euler formülü ve kökler sekmesini aç (Konu: Euler serisi, θ = π, n = 8). Kartlardaki ölçülen hatayı ve sınırı oku. Sonra 'θ = π: e^(iπ) = −1' hazır deneyine bas ya da Terim sayısı n kaydırıcısını 13'e getir. Terimleri tek tek ekle düğmesiyle yolun nasıl kıvrıldığını, alttaki log grafikte de hatanın nasıl düştüğünü izle.",
        observe:
          "n = 8'de S₈ = −1.211353 − 0.075221i, ölçülen hata 0.224, sınır 0.235. n = 13'te hata 4.56·10⁻⁴, sınır 4.66·10⁻⁴; 'Hata 10⁻³'ün altında kalır' kartı 'n ≥ 13 terim' der. Tabloda 'Dönme ∠(t₁₁, t₁₂)' satırı 90.0000°, 'Boy oranı |t₁₂| / |t₁₁|' satırı 0.261799 = π/12. 'e<sup>iθ</sup> + 1 (kayan nokta)' kartı 0 + 1.22·10⁻¹⁶i gösterir.",
        explain:
          "Her terim bir öncekinin iθ/k katıdır: i 90° döndürür, θ/k boyu ölçekler. k < π iken terimler büyür (en uzunu (iπ)³/3!, boyu ≈ 5.17) ve yol dışarı savrulur; k > π olunca faktöriyel kuvveti yener ve yol hızla −1'e sarılır. Ölçülen hata, yuvarlama tabanına inene dek sınırın hep biraz altında kalır; sınır ilk atılan terimin boyudur. 1.22·10⁻¹⁶ bir hesap hatası değildir: Math.PI, π'ye en yakın 64 bitlik kayan nokta sayısıdır ve sin(Math.PI) ≈ π − Math.PI.",
      },
      {
        title: "Kökler bir çokgen kurar, toplamları sıfırdır",
        predict:
          "z⁵ = 1'in beş kökü düzlemde nasıl bir şekil oluşturur, toplamları kaçtır? −8'in kaç küp kökü vardır; yalnızca −2 mi?",
        do: "Konu menüsünden 'n'inci kökler ve birim kökler'i seç ve '5. birim kökler' hazır deneyine bas. Kartları ve tabloyu oku; alttaki grafikte köklerin uç uca eklenişini izle. Sonra 'z³ = −8' hazır deneyini seç.",
        observe:
          "Beş kök birim çemberde düzgün bir beşgen kurar; çizimde w₀ … w₄ diye adlandırılır, w₀ kartı 1 + 0i ve 'komşu kökler arası 72.0000°' gösterir. Tabloda iki kenar satırı da 1.175571 (= 2 sin 36°), iç açı 108.0000°, köklerin çarpımı 1 + 0i. Alttaki grafikte uç uca eklenen oklar başladıkları yere döner; Σ wₖ kartı kuramdaki 0 yerine 10⁻¹⁶ düzeyinde bir sayı gösterir. z³ = −8'de w₀ = 1 + 1.7321i, |c|<sup>1/n</sup> = 2.000000, iç açı 60.0000°, çarpım −8 + 0i: yarıçapı 2 olan çemberde bir eşkenar üçgen.",
        explain:
          "zⁿ = c'nin kökleri |c|<sup>1/n</sup> yarıçaplı çemberde 360°/n arayla dizilir; beşinci birim kökler 1, cos 72° ± i sin 72° ≈ 0.309 ± 0.951i ve cos 144° ± i sin 144° ≈ −0.809 ± 0.588i'dir. Beşgeni 72° döndürmek onu değiştirmez; o hâlde toplam da 72° dönünce kendine eşit kalmalıdır ve bu yalnızca 0 için mümkündür. Cebirden bakınca z⁵ − 1'de z⁴ terimi yoktur ve Vieta'ya göre köklerin toplamı o katsayının ters işaretlisidir. Toplamın tam 0 yerine 10⁻¹⁶ çıkması yuvarlamadır. −8'in üç küp kökü 1 + √3·i, −2 ve 1 − √3·i'dir; −2 yalnızca gerçel olanıdır.",
      },
      {
        title: "Küçük kare: z² 1 + i çevresinde ne yapar?",
        predict:
          "f(z) = z² için f′(1 + i) = 2 + 2i. Kenarı h olan küçük kare kaç kat büyür, kaç derece döner, köşesi dik kalır mı? Kenarı 0.20'den 0.01'e indirince ölçüm kurama nasıl yaklaşır; alan oranı da aynı hızla mı yaklaşır? z₀ = 0'da ne değişir?",
        do: "Düzlemi eğen fonksiyonlar sekmesinde Sıfırla'ya bas (z², z₀ = 1 + i, h = 0.20). Tabloyu oku; sağ üstteki büyüteçlerde kareyi ve görüntüsünü karşılaştır. Karenin kenarı h kaydırıcısını 0.01'e indirip yeniden oku. Sonra 'z², z₀ = 0' hazır deneyine bas.",
        observe:
          "h = 0.20'de yerel büyütme 2.9000, dönme 43.6028°, köşe açısı 92.7944°, alan oranı 8.0267; kuram 2.8284, 45°, 90° ve 8. h = 0.01'de 2.8320, 44.9285°, 90.1431° ve 8.0001. Fark sütununda büyütme 0.072'den 0.0035'e, dönme −1.4°'den −0.072°'ye, köşe açısı 2.8°'den 0.14°'ye iner: h ile birlikte yirmide bire. Alan farkı ise 0.027'den 6.7·10⁻⁵'e, yani dört yüzde bire düşer. z₀ = 0'da kart 'kritik nokta: f′ = 0' der; köşe açısı 180.0000°, dönme tanımsız, büyütme 0.1000 (= h/2).",
        explain:
          "Ölçüm, merkezden sağ kenarın ortasına giden yarım çizginin görüntüsünü kullanır: sayfanın kırmızı oku Δf₁ = f(z₀ + h/2) − f(z₀)'dır ve z² için Δf₁/(h/2) = 2z₀ + h/2 tam olarak doğrudur. Bu yüzden büyütme ve dönme farkı h ile orantılıdır ve h → 0'da f′(z₀)'a gider. Alan ise ikinci mertebeden doğrudur: görüntünün alanı ∬|f′(z)|² dA'dır (Jacobi determinantı |f′|²), kare üzerinde integral alınca alan oranı tam olarak 8 + 2h²/3 çıkar; h = 0.2'de 8.0267. z = 0'da ise z² açıları ikiye katlar: 90°'lik köşe 180°'ye açılır ve konformluk bozulur.",
      },
    ],
  },
  wow: [
    {
      title: "Bir çemberden uçak kanadı",
      body:
        "Taşıma kuvvetini kanadın çevresindeki hava dolaşımına bağlayan teorem, 20. yüzyılın ilk yıllarında Martin Kutta ile Nikolay Jukovski'nin (Batı yazımıyla Joukowski) çalışmalarından doğdu ve bugün ikisinin adını taşır. Jukovski 1910'da bir adım daha attı: z + 1/z dönüşümü, −1'den geçen ve +1'i içine alan bir çemberi kanat kesitine çevirir. Konform dönüşümler ideal akışın denklemini korur; bu yüzden elle çözülebilen silindir çevresindeki akış, kanadın çevresindeki akışa dönüşür. Sayfadaki 'Kanat profili' hazır deneyi merkezi 0.1 + 0.1i, yarıçapı 1.1045 olan çemberi −2'den yaklaşık 2.03'e uzanan kamburlu bir profile çevirir; sivri firar kenarı, kritik nokta −1'in görüntüsü −2'dedir.",
    },
    {
      title: "On sekiz yaşında, on yedi köşe",
      body:
        "30 Mart 1796'da, 19 yaşına girmesine bir ay kala, Gauss matematik günlüğüne ilk notunu yazdı: düzgün 17-gen pergel ve cetvelle çizilebilir. Öklid'den beri iki bin yılı aşkın süre, kenar sayısı asal olan çizilebilir düzgün çokgen olarak yalnız eşkenar üçgen ve beşgen biliniyordu. Anahtar z¹⁷ = 1'in kökleriydi: bu kökler birim çemberde düzgün bir 17-gen kurar ve cos(2π/17) yalnızca dört işlem ve iç içe kareköklerle yazılabilir. Mezar taşına bir 17-gen istediği anlatılır; dileği yerine getirilmedi. Braunschweig'de 1880'de açılan Gauss anıtının kaidesinde ise 17 uçlu bir yıldız var. Biyografi yazarı Dunnington'a göre taş ustası, düzgün bir 17-genin çemberden ayırt edilemeyeceğini söylemişti.",
    },
    {
      title: "i'nin i'nci kuvveti gerçel bir sayı",
      body:
        "14 Haziran 1746'da Euler, Christian Goldbach'a yazdığı mektupta √−1'in √−1'inci kuvvetinin gerçel bir değeri olduğunu, ondalık olarak 0.2078795763 ettiğini bildirdi ve bunu dikkate değer bulduğunu ekledi. Euler formülüyle kontrol etmek kolaydır: i = e<sup>iπ/2</sup> olduğundan iⁱ = e<sup>i·iπ/2</sup> = e<sup>−π/2</sup> ≈ 0.20788. Hikâyenin bir kıvrımı var: i = e<sup>i(π/2 + 2πk)</sup> diye de yazılabilir, bu yüzden iⁱ'nin sonsuz sayıda değeri vardır: e<sup>−π/2 − 2πk</sup>, k tam sayı. Hepsi gerçeldir. 0.20788 yalnızca esas değerdir; karmaşık kuvvetlerde 'hangi dal?' sorusu her zaman sorulmalıdır.",
    },
  ],
  worked: {
    title: "z³ = 8i'nin üç kökü",
    prompt:
      "z³ = 8i denkleminin üç kökünü a + bi biçiminde bul; köklerin toplamını ve çarpımını hesapla. Sonra sayfada Euler formülü ve kökler sekmesinde, n'inci kökler konusunda |c| = 8, arg c = 90° ve n = 3 seçerek sonucu denetle.",
    steps: [
      "Kutupsal biçime geç: 8i, 0'ın 8 birim yukarısındadır. |c| = 8, arg c = 90°, yani 8i = 8(cos 90° + i sin 90°).",
      "z = r(cos φ + i sin φ) yaz. De Moivre'ye göre z³ = r³(cos 3φ + i sin 3φ). Bunun 8i'ye eşit olması için r³ = 8, yani r = 2 (modül pozitif bir gerçel sayıdır), ve 3φ = 90° + k·360°, yani φ = 30° + k·120° olmalı. k = 0, 1, 2 farklı kökler verir; k = 3 yeniden 30° + 360°'ye, yani ilk köke döner.",
      "Kökleri yaz: k = 0 için 2(cos 30° + i sin 30°) = √3 + i ≈ 1.7321 + i; k = 1 için 2(cos 150° + i sin 150°) = −√3 + i; k = 2 için 2(cos 270° + i sin 270°) = −2i. Birini cebirle doğrula: (√3 + i)³ = 3√3 + 9i + 3√3·i² + i³ = 3√3 + 9i − 3√3 − i = 8i.",
      "Toplam ve çarpım: (√3 + i) + (−√3 + i) + (−2i) = 0, çünkü z³ − 8i'de z² terimi yoktur. (√3 + i)(−√3 + i) = −3 + i² = −4 ve (−4)(−2i) = 8i = (−1)<sup>3+1</sup>·c. Kökler yarıçapı 2 olan çemberde bir eşkenar üçgendir; kenarı 2·2·sin 60° = 2√3 ≈ 3.4641.",
      "Sayfada denetle: Konu menüsünden n'inci kökleri seç, |c| kutusuna 8, arg c kutusuna 90 yaz (Re c kutusuna 0, Im c kutusuna 8 yazmak da aynı c'yi verir), Kök derecesi n kaydırıcısını 3'e getir. w₀ kartı 1.7321 + 1i ve 'arg w₀ = arg c / n = 30.00°', |c|<sup>1/n</sup> kartı 2.000000 gösterir; Bütün kökler kartı üçünü de yazar: w₀ = 1.7321 + 1i · w₁ = −1.7321 + 1i · w₂ = 0 − 2i; tabloda kenar uzunluğu 3.464102, iç açı 60.0000°, köklerin çarpımı 0 + 8i'dir.",
    ],
    result:
      "z³ = 8i'nin kökleri √3 + i, −√3 + i ve −2i'dir (≈ 1.7321 + i, −1.7321 + i, −2i): yarıçapı 2 olan çemberde 30°'den başlayıp 120° arayla dizilen bir eşkenar üçgen. Toplamları 0, çarpımları 8i; sayfadaki |Σ wₖ| yalnızca 10⁻¹⁶ düzeyinde bir yuvarlama gösterir.",
  },
  misconceptions: [
    {
      myth: "Sanal sayılar gerçek değildir; matematikçilerin uydurduğu, işe yaramayan sembollerdir.",
      truth:
        "'Sanal' (<em>imaginaire</em>) 1637'de Descartes'ın koyduğu küçümseyici bir addır; negatif sayılar da yüzyıllarca 'saçma' sayılmıştı. Karmaşık sayı, toplama ve çarpma kuralı belli olan, düzlemdeki bir noktadır; Gauss i'ye 'yanal birim' denmesini önermişti. Bombelli onlarla gerçel bir kök buldu; bugün alternatif akım devreleri, sinyal işleme ve kuantum mekaniği onlarla yazılır. Sayfadaki çarpım bir iletki ve cetvelle çizimden kurulur: ortada sihir yok, geometri var.",
    },
    {
      myth: "i = √−1 olduğuna göre √−1·√−1 = √((−1)(−1)) = √1 = 1, yani i² = 1 olmalı.",
      truth:
        "√a·√b = √(ab) kuralı a, b ≥ 0 için güvencelidir; ikisi birden negatifse bozulur. Sıfırdan farklı her karmaşık sayının iki karekökü vardır (−1 için i ve −i); √ sembolü bunlardan esas olanı seçer: modülün karekökünü alır, esas argümanı yarıya böler. Önce karekök alırsan iki açı da 90° olur ve çarpımın açısı 180°'dir. Önce çarparsan 180° + 180° = 360° esas aralıktan taşar, 0°'ye sarar ve √ bu 0°'yi yarıya bölüp 0° verir. Sonuç: √−1·√−1 = i·i = −1, ama √((−1)(−1)) = √1 = 1. Sayfadaki 'Açılar 180°'yi aşar' deneyi aynı sarmayı gösterir.",
    },
    {
      myth: "a + bi'nin argümanı her zaman arctan(b/a)'dır.",
      truth:
        "arctan yalnızca −90° ile 90° arasında değer verir ve b/a oranı z ile −z için aynıdır: −2 + i ile 2 − i aynı oranı, −1/2'yi verir. Bu yüzden arctan(1/(−2)) = −26.57°, −2 + i'nin değil, tam ters yöndeki 2 − i'nin açısıdır; doğrusu 153.43°'tir. a < 0 iken 180° eklemek ya da çıkarmak gerekir; hesap programları ve bu sayfa, noktanın hangi bölgede olduğuna da bakan atan2(b, a) fonksiyonunu kullanır. Sayfada 'Açılar 180°'yi aşar' hazır deneyine bas: z kartı '|z| = 2.2361 · arg z = 153.43°' yazar.",
    },
    {
      myth: "Karmaşık sayılar da sıralanabilir: 1 + 3i, 2 + i'den büyüktür.",
      truth:
        "Gerçel sayılardaki sıra çarpmayla uyumludur: iki pozitifin çarpımı pozitiftir, sıfırdan farklı her sayının karesi pozitiftir. Karmaşık sayılarda böyle bir sıra kurulamaz: i > 0 dersen i·i = −1 > 0 olur; i < 0 dersen −i > 0 ve (−i)·(−i) = −1 > 0 olur. İkisi de çelişkidir. Modülleri karşılaştırabilirsin, ama |z| yönü unutur: |2 + i| = |1 − 2i| = √5. Karmaşık sayılar arasında bir eşitsizlik görürsen içinde gizli bir |·| ya da Re aranmalıdır.",
    },
  ],
  glossary: [
    { term: "Sanal birim (i)", definition: "Karesi −1 olan ve düzlemde (0, 1) noktasına karşılık gelen sayı; onunla çarpmak düzlemi 0 çevresinde 90° döndürür." },
    { term: "Karmaşık düzlem", definition: "a + bi'nin (a, b) noktası olarak çizildiği düzlem: yatay eksen gerçel kısım Re z, düşey eksen sanal kısım Im z." },
    { term: "Modül |z|", definition: "z'nin 0'a uzaklığı, |a + bi| = √(a² + b²); çarpımda modüller çarpılır." },
    { term: "Esas argüman", definition: "Pozitif gerçel eksenden z'ye saat yönünün tersine ölçülen açının −180° < arg ≤ 180° aralığındaki değeri; 0'ın argümanı tanımsızdır." },
    { term: "Eşlenik (<span class=ov>z</span>)", definition: "a + bi için a − bi, yani z'nin gerçel eksene göre yansıması; z·<span class=ov>z</span> = |z|² ve 1/z = <span class=ov>z</span>/|z|² bağıntılarını verir." },
    { term: "Birim kökler", definition: "zⁿ = 1'in n çözümü e<sup>2πik/n</sup>; birim çemberde, köşelerinden biri 1 olan düzgün bir n-gen kurarlar (n = 2'de bir çap) ve n ≥ 2 için toplamları 0'dır." },
    { term: "Konform dönüşüm", definition: "Küçük ölçekte açıların büyüklüğünü ve yönünü koruyan dönüşüm; analitik bir f, f′ ≠ 0 olan her noktada konformdur." },
    { term: "Kritik nokta ve kutup", definition: "Kritik noktada f′ = 0 olur ve açılar katlanır (z² 0'da açıları ikiye katlar); kutupta f sonsuza gider (1/z için z = 0)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede karmaşık sayılar bir hesap kuralıdır; üniversitede bir dil. <strong>Kompleks Analiz</strong> dersi bu sayfanın üçüncü sekmesinden başlar: her noktada yerel olarak döndür-büyüt gibi davranan, yani türevi olan <em>analitik</em> fonksiyonlar. Cauchy–Riemann denklemleri bu koşulun gerçel dildeki yazımıdır ve şaşırtıcı sonuçlar doğurur: açık bir bölgede bir kez türevlenebilen karmaşık fonksiyon sonsuz kez türevlenebilir ve her noktanın çevresinde kendi Taylor serisine eşittir. Seri, merkezden en yakın tekilliğe kadar yakınsar; 1/(1 + x²)'nin 0 merkezli serisi gerçel eksende hiçbir sorun yokken |x| = 1'de durur, çünkü ±i'de kutuplar vardır. Kapalı eğriler boyunca alınan <strong>kontur integralleri</strong> ve <strong>rezidü teoremi</strong> gerçel integralleri de çözer: ∫ dx/(1 + x²) (−∞'dan ∞'a) = π sonucu, i'deki kutbun rezidüsü 1/(2i) ile 2πi·1/(2i) olarak tek satırda çıkar. Konform dönüşümler elektrostatikte, ısı iletiminde ve ideal akışta Laplace denklemini korur; Joukowski'nin kanadı bunun ilk büyük uygulamalarındandır.",
      "Aynı fikir öteki derslerde başka adlarla karşına çıkar. <strong>Diferansiyel Denklemler</strong>'de y″ + 2y′ + 5y = 0'ın karakteristik kökleri −1 ± 2i'dir ve e<sup>(−1+2i)t</sup> = e<sup>−t</sup>(cos 2t + i sin 2t) sönen bir salınım demektir. <strong>Elektrik Devreleri</strong> dersinde sinüs biçimli gerilim ve akımlar dönen oklar, yani <em>fazörler</em> olarak yazılır; türev almak jω ile çarpmaya, devre denklemi cebire döner (mühendisler i yerine j yazar, çünkü i akımdır). <strong>Sinyal İşleme</strong>'de Fourier dönüşümü bir sinyali e<sup>iωt</sup> dalgalarına ayırır; hızlı Fourier dönüşümü (FFT) birim köklerin simetrisinden yararlanır. <strong>Kuantum Mekaniği</strong>'nde dalga fonksiyonu karmaşık değerlidir, Schrödinger denklemi iħ ∂ψ/∂t = Hψ i'yi açıkça içerir ve parçacığı bir yerde bulma olasılık yoğunluğu |ψ|²'dir: genliklerin açıları girişimi belirler.",
    ],
    topics: [
      "Analitik fonksiyonlar ve Cauchy–Riemann denklemleri",
      "Kontur integralleri ve Cauchy integral teoremi",
      "Rezidü teoremi",
      "Konform dönüşümler ve potansiyel akış",
      "Fourier dönüşümü ve FFT",
      "Fazörler ve karmaşık empedans",
      "Laplace dönüşümü",
    ],
  },
  quiz: [
    {
      question: "|z| = 2, arg z = 150° ve |w| = 3, arg w = 60° ise z · w için hangisi doğrudur (esas argümanla)?",
      options: ["|zw| = 5, arg zw = 210°", "|zw| = 6, arg zw = 210°", "|zw| = 6, arg zw = −150°", "|zw| = 6, arg zw = 90°"],
      answer: 2,
      explanation:
        "Modüller çarpılır, toplanmaz: 2 · 3 = 6. Açılar toplanır: 150° + 60° = 210°; ama esas değer −180° < arg ≤ 180° aralığındadır ve 360° çıkarınca −150° olur. 210° aynı yönü gösterir ama esas değer değildir; 90° ise açıları çıkarmanın, yani bölmenin tuzağıdır. Sayfadaki 'Açılar 180°'yi aşar' deneyi aynı sarmayı gösterir.",
    },
    {
      question: "Hesap makinesi kullanmadan: (1 + i)⁸ kaçtır?",
      options: ["−16", "16i", "16", "256"],
      answer: 2,
      explanation:
        "|1 + i| = √2 ve arg(1 + i) = 45°. Sekizinci kuvvette modül (√2)⁸ = 16 olur, açı 8 · 45° = 360°, yani tam bir tur: sonuç pozitif gerçel eksende, 16. '−16' ve '16i' cevapları (1 + i)² = 2i'den sonra (2i)⁴ = 16·i⁴'te i⁴'ü yanlış almaktan gelir (i⁴ = 1'dir); '256' ise modülü √2 yerine 2 sanmanın tuzağıdır. Sayfada De Moivre konusunun '(1 + i)⁸ = 16' hazır deneyi, noktaları 45°'lik adımlarla dışa doğru bir sarmal üzerinde 16'ya götürür.",
    },
    {
      question:
        "Fonksiyonlar sekmesinde z² için z₀ = 1 + i'de karenin kenarı h = 0.20 iken ölçülen büyütme 2.9000, kuram 2.8284'tür (fark 0.0716). h'yi 0.10'a indirince fark yaklaşık ne olur?",
      options: ["Değişmez, yaklaşık 0.072", "Yarıya iner, yaklaşık 0.036", "Dörtte bire iner, yaklaşık 0.018", "Tam sıfır olur"],
      answer: 1,
      explanation:
        "Ölçülen büyütme |Δf₁|/(h/2) = |2z₀ + h/2| tam olarak doğrudur; h/2'lik ek terim yüzünden fark h ile orantılıdır. h yarıya inince fark da yarıya iner: sayfa 2.8640 gösterir, fark 0.0356. Fark ancak h → 0 limitinde kapanır ve türev tam bu limittir. Alan oranının farkı ise h² ile küçülür: 8.0267'den 8.0067'ye.",
    },
  ],
  next: [
    {
      href: "matris-donusumleri.html",
      title: "Matris Dönüşümleri",
      why: "a + bi ile çarpmak [a −b; b a] matrisidir. Sx = Sy = 2.00 ve Açı = 30° seç: matris [1.732 −1.000; 1.000 1.732], yani √3 + i ile çarpma olur; Özdeğerler 1.732 ± 1.000i = 2·e<sup>±i30°</sup>, Determinant 4.0000 = |√3 + i|².",
    },
    {
      href: "alternatif-akim.html",
      title: "Alternatif Akım: Fazörler",
      why: "Fazör, e<sup>jωt</sup> ile dönen bir karmaşık sayıdır. j ile çarpmak 90° döndürdüğü için sayfanın Fazör diyagramında bobinin gerilimi akımdan 90° önde, kondansatörünki 90° geride döner.",
    },
    {
      href: "taylor-serisi.html",
      title: "Taylor Serisi",
      why: "Yakınsaklık yarıçapı sekmesinde 1/(1 + x²)'nin 0 merkezli serisi, fonksiyon gerçel eksende pürüzsüz olduğu hâlde |x| = 1'in ötesinde ıraksar ('1/(1 + x²), x = 1.2' hazır deneyi); nedeni karmaşık düzlemde ±i'deki kutuplardır.",
    },
    {
      href: "mandelbrot-fraktali.html",
      title: "Mandelbrot Seti",
      why: "Sade bir çizim: z ↦ z² + c her piksel için en çok 100 kez uygulanır, |z| 2'yi aşmayan noktalar siyah kalır. Açılıştaki çizimde kümenin −2'deki sol ucu kadraja sığmaz; Zoom Faktörü kutusuna 140 yazıp Çiz!'e basınca bütün küme görünür.",
    },
  ],
  sources: [
    {
      title: "Feynman Lectures on Physics · Cilt I, Bölüm 22: Algebra",
      url: "https://www.feynmanlectures.caltech.edu/I_22.html",
      note: "Feynman e<sup>iθ</sup>'yı 10'un sanal kuvvetlerini tablolarla hesaplayarak kurar ve formüle 'mücevherimiz' (our jewel) der (İngilizce, ücretsiz).",
    },
    {
      title: "MIT OpenCourseWare · 18.04 Complex Variables with Applications",
      url: "https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/",
      note: "Analitik fonksiyonlar, Cauchy–Riemann, kontur integralleri, rezidüler ve konform dönüşümler için ders notları ve problem setleri (İngilizce).",
    },
    {
      title: "Wikipedia · Joukowsky transform",
      url: "https://en.wikipedia.org/wiki/Joukowsky_transform",
      note: "z + 1/z dönüşümü, çemberden kanat profiline geçiş ve Jukovski'nin 1910 tarihli makalesi (İngilizce).",
    },
    {
      title: "Vikipedi · Karmaşık sayı",
      url: "https://tr.wikipedia.org/wiki/Karma%C5%9F%C4%B1k_say%C4%B1",
      note: "Türkçe genel bakış: cebirsel ve kutupsal biçim, eşlenik, De Moivre formülü ve n'inci kökler.",
    },
  ],
  revision: "Kasım 2026",
};
