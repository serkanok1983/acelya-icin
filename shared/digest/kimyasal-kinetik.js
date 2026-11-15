window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kimyasal-kinetik"] = {
  slug: "kimyasal-kinetik",
  title: "Kimyasal Kinetik: Tepkimelerin Saati",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Şeker yanmak 'ister' ama yerinden kıpırdamaz. Hız yasasını eğriden ve başlangıç hızlarından ölç, Arrhenius doğrusundan Eₐ çıkar, ara ürünlü mekanizmada ve katalizörde kuramı sına.",
  hook:
    "Kavanozdaki şeker küpü neden kendiliğinden alev almıyor? Oksijenle tepkimesi bol enerji açığa çıkarır, termodinamik 'yan' der; ama küp yıllarca durur, kibrit tutsan bile çoğunlukla yalnızca erir ve kararır. Vücudun ise aynı dönüşümü 37 °C'de alevsiz yapar: bir tepkimenin olabilmesi ile gerçekten olması arasındaki bu uçurumun adı kinetiktir.",
  bigIdea:
    "Bir tepkimenin ne kadar enerji verdiğini termodinamik, <strong>ne kadar hızlı</strong> yürüdüğünü kinetik söyler: hız, moleküllerin ne kadarının <strong>aktivasyon enerjisi</strong> tepesini aşabildiğine bağlıdır ve hız sabiti sıcaklıkla yaklaşık <em>k = A·e<sup>−Eₐ/RT</sup></em> kuralına göre büyür.",
  story: [
    "1850'de Alman bilim insanı Ludwig Wilhelmy, asitli suda çözünmüş sakkarozun (sofra şekeri) glikoz ve fruktoza ayrışmasını izledi. Elinde bir <strong>polarimetre</strong> vardı: sakkaroz çözeltisi polarize ışığın düzlemini sağa çevirir, ürün karışımı sola. Çevrilme açısını okuyarak şekerin ne kadarının kaldığını, tepkimeyi hiç durdurmadan dakika dakika ölçebiliyordu. Bulduğu kural sadeydi: dönüşüm hızı, o anda kalan şeker miktarıyla orantılıydı. Wilhelmy bunu bir diferansiyel denklem olarak yazdı, çözdü ve verileriyle karşılaştırdı. Bu, bir tepkime hızının ilk nicel ölçümü sayılır; ama çağdaşları pek ilgilenmedi ve önemi ancak 1884'te Wilhelm Ostwald dikkat çekince anlaşıldı.",
    "1864'te Christiania'da (bugünkü Oslo) iki meslektaş, Peter Waage ve sonradan kayınbiraderi olacak Cato Guldberg, <strong>kütlelerin etkisi yasasını</strong> ortaya koydu: bir tepkimenin itici gücü, tepkimeye girenlerin 'etkin kütlelerinin', yani derişimlerinin çarpımıyla orantılıdır. Bugün hız yasası dediğimiz <em>hız = k[A][B]</em> biçiminin ve denge sabitinin kökü bu fikirdir. 1884'te Hollandalı Jacobus van 't Hoff, <em>Études de dynamique chimique</em> (Kimyasal Dinamik Üzerine Çalışmalar) adlı kitabında tepkime derecesini grafikle bulmanın yeni bir yolunu gösterdi ve hız sabitinin sıcaklıkla nasıl değişebileceğine dair bir bağıntı önerdi. 1901'de verilen ilk Nobel Kimya Ödülü, kimyasal dinamik ve ozmotik basınç yasaları için ona gitti.",
    "1889'da İsveçli Svante Arrhenius, Wilhelmy'nin şekerine geri döndü. Sıcaklık birkaç derece artınca tepkime, moleküllerin biraz hızlanmasıyla açıklanamayacak kadar çok hızlanıyordu. Arrhenius'un açıklaması: yalnızca fazladan enerji taşıyan küçük bir 'etkin' molekül azınlığı tepkimeye girer ve bu azınlığın oranı sıcaklıkla üstel biçimde büyür. Bugün onun adıyla anılan denklem buradan doğdu. İlginç bir ayrıntı: Arrhenius 1903'te Nobel aldığında ödül bu denklem için değil, tuzların, asitlerin ve bazların suda iyonlarına ayrıştığını söyleyen elektrolitik ayrışma kuramı içindi.",
    "Ostwald 1890'larda, tepkimeyi hızlandırıp kendisi tükenmeyen maddelere, yani <strong>katalizörlere</strong> bugün de kullandığımıza yakın bir tanım getirdi; 1909 Nobel Kimya Ödülü'nü kataliz, denge ve tepkime hızları üzerine çalışmaları için aldı. Arrhenius'un 'etkin molekülleri' ise 1916'da Max Trautz'un ve 1918'de William Lewis'in birbirinden bağımsız geliştirdiği <strong>çarpışma kuramıyla</strong> somut bir resme kavuştu: molekül çiftleri çarpışır, ama yalnızca yeterince sert ve uygun açıyla çarpışanlar ürün verir. Bugün gübre üretiminden arabaların egzoz dönüştürücülerine, ilaçların vücuttaki ömründen hücrelerimizdeki enzimlere kadar her yerde aynı soru sorulur: ne kadar hızlı?",
  ],
  core: [
    {
      heading: "Hız bir eğimdir, hız yasası bir ölçümdür",
      body:
        "<strong>Tepkime hızı</strong>, derişim–zaman eğrisinin eğimidir; birimi mol/(L·s). İki an arasındaki fark ortalama hızı, teğetin eğimi anlık hızı verir. aA + bB → cC gibi katsayılı tepkimelerde her maddenin değişimi kendi katsayısına bölünür; bu sayfa ise tek maddeli modelde kitapların bir kısmı gibi −d[A]/dt = k[A]ⁿ tanımını kullanır. <strong>Hız yasasındaki</strong> m ve n üslerine <strong>tepkime derecesi</strong> denir ve denklemden okunmaz, ölçülür: H₂ + Br₂ → 2HBr'nin başlangıç hızında [Br₂]'nin üssü 1 değil 1/2 çıkar, çünkü tepkime arka planda birkaç basamakta yürür. 02 sekmesinin yöntemi en doğrudan olanıdır: bir derişimi sabit tutup öbürünü değiştirir, başlangıç hızlarının oranının logaritmasını derişim oranının logaritmasına bölersin.",
      formula: "hız = k·[A]<sup>m</sup>[B]<sup>n</sup>   ·   m = ln(hız₂/hız₁) / ln([A]₂/[A]₁)",
      formulaNote: "İkinci formül yalnız [B] sabitken geçerlidir. k'nın birimi toplam dereceye göre değişir: 0. derecede mol/(L·s), 1.'de s⁻¹, 2.'de L/(mol·s), 3.'de L²/(mol²·s).",
    },
    {
      heading: "Üç integral yasa, üç doğru grafik",
      body:
        "Hız yasası bir diferansiyel denklemdir; integral alınca derişimin zamana bağlı biçimi çıkar. Birinci derecede d[A]/[A] = −k dt, integral alınca ln[A] = ln[A]₀ − kt olur: madde her eşit sürede aynı <em>oranda</em> azalır. Bu yüzden her üç dereceden biri, uygun eksenlerde düz bir doğru verir ve eğimi k'dır. <strong>Yarılanma süresi</strong> t½ de dereceye göre farklı davranır: yalnız birinci derecede başlangıç derişiminden bağımsızdır, çünkü hız ve yarılanacak miktar aynı oranda büyür. Sıfırıncı derecede ikinci yarılanma birincinin yarısı, ikinci derecede iki katı sürer; bu, derecenin eğriye bakarak okunabilen parmak izidir.",
      formula: "0.: [A] = [A]₀ − kt,   t½ = [A]₀/(2k)<br>1.: ln[A] = ln[A]₀ − kt,   t½ = ln 2/k<br>2.: 1/[A] = 1/[A]₀ + kt,   t½ = 1/(k[A]₀)",
      formulaNote: "Sayfa aynı denklemi RK4 ile de çözer; kapalı biçimden sapma varsayılanda [A]₀'ın 2×10⁻¹⁵'i kadardır. Dereceyi R²'ye değil, her doğrusallaştırmanın ağırlıklı uyumunu [A] ölçeğine geri çevirip artıkları karşılaştırarak tanır: logaritma gürültüyü 1/[A], ters alma 1/[A]² oranında büyüttüğü için yüksek gürültüde en yüksek R² yanıltıcıdır.",
    },
    {
      heading: "Arrhenius ve dağılımın kuyruğu",
      body:
        "Moleküllerin enerjileri eşit değildir; sıcaklık yalnızca dağılımı belirler. Üç boyutlu ideal gazda bir molekülün öteleme enerjisi Maxwell–Boltzmann dağılımına uyar ve Eₐ'nın üstündeki pay F, x = Eₐ/RT için kapalı biçimde yazılabilir. Kitaplarda sık görülen e<sup>−x</sup> bu payın kendisi değil: iki serbestlik dereceli (iki boyutlu) bir dağılımda Eₐ'yı aşan payın tam değeridir; çarpışma kuramında da, merkezleri birleştiren doğru boyunca Eₐ'dan fazla bağıl enerji taşıyan <em>çarpışmaların</em> payı tam olarak e<sup>−x</sup> çıkar. 25 °C'de Eₐ = 50 kJ/mol için F = 9.028×10⁻⁹ iken e<sup>−x</sup> = 1.739×10⁻⁹: 5.19 kat küçük. Yine de sıcaklıkla değişimleri neredeyse aynıdır, çünkü ikisinde de baskın olan e<sup>−x</sup> çarpanıdır. Arrhenius'un k = A·e<sup>−Eₐ/RT</sup> biçimi bu yüzden işe yarar; A'nın sıcaklığa zayıf bağımlılığı da önündeki √x gibi çarpanlardan gelir.",
      formula: "k = A·e<sup>−Eₐ/RT</sup>   ⇔   ln k = ln A − (Eₐ/R)·(1/T)<br>F = erfc(√x) + 2√(x/π)·e<sup>−x</sup>,   x = Eₐ/RT",
      formulaNote: "T kelvin cinsinden, R = 8.314 J/(mol·K). ln k'yı 1/T'ye karşı çizersen eğim −Eₐ/R olur. Formüldeki ön çarpan A ile tepkimedeki madde A aynı şey değildir.",
    },
    {
      heading: "Ara ürün, kararlı durum ve hız belirleyen basamak",
      body:
        "Çoğu tepkime tek adımda olmaz. A → I → P zincirinde <strong>ara ürün</strong> I önce birikir, sonra tükenir; tepe anı ve tepe değeri k₁ ile k₂'den tam olarak hesaplanır. Kimyacıların sık kullandığı <strong>kararlı durum yaklaşımı</strong>, d[I]/dt ≈ 0 kabul edip [I] ≈ k₁[A]/k₂ yazar. Bu, I oluşur oluşmaz tükeniyorsa (k₂ ≫ k₁) iyidir ve o zaman yavaş birinci basamak <strong>hız belirleyen basamak</strong> olur. Yaklaşımın [P]'deki hatası şaşırtıcı derecede sade bir şeydir: tam çözümde [P] = [A]₀ − [A] − [I], yaklaşımda [P] = [A]₀ − [A] olduğundan aradaki fark her an tam olarak [I]'dır; en büyük hata da [I]'nın tepe değerine eşittir. Sayfa bunu ölçer: k₂ = 10·k₁'de %7.74, k₂ = k₁/10'da %77.43.",
      formula: "[I] = [A]₀·k₁/(k₂ − k₁)·(e<sup>−k₁t</sup> − e<sup>−k₂t</sup>)<br>t<sub>tepe</sub> = ln(k₁/k₂)/(k₁ − k₂)",
      formulaNote: "k₁ = k₂ özel durumunda [I] = [A]₀k₁t·e<sup>−k₁t</sup>; tepe t = 1/k₁ anında 1/e ≈ 0.3679 değerindedir.",
    },
    {
      heading: "Katalizör: tepeyi aşmak yerine altından tünel",
      body:
        "<strong>Katalizör</strong> tepkimeye daha alçak tepeli başka bir yol açar ve sonunda değişmeden geri çıkar. İleri ve geri yolun tepesi aynı miktarda alçalır, başlangıç ve bitiş düzeyleri yerinde kalır; bu yüzden iki yön aynı çarpanla hızlanır ve denge sabiti değişmez. 25 °C'de tepeyi 15 kJ/mol indirmek iki yönü de 424.5 katına çıkarır; dengeye varış süresi aynı oranda kısalır, varılan nokta aynıdır. Sayfanın A ⇌ B modeli bir sadeleştirme daha yapar: iki yönün ön çarpanı eşit (10¹⁰ s⁻¹) alındığı için K = e<sup>−ΔH/RT</sup> çıkar. Gerçekte K'yı ΔG° = ΔH° − TΔS° belirler; entropi farkı ön çarpanların oranında saklıdır.",
      formula: "k<sub>kat</sub>/k = e<sup>ΔEₐ/RT</sup>   ·   K = k<sub>ileri</sub>/k<sub>geri</sub> (katalizörle değişmez)",
      formulaNote: "25 °C'de RT ≈ 2.479 kJ/mol; e<sup>15/2.479</sup> ≈ 424.5. Durulma süresi τ = 1/(k<sub>ileri</sub> + k<sub>geri</sub>).",
    },
  ],
  lab: {
    intro:
      "Dört sekmenin her biri ölçtüğü değeri kuramın verdiğiyle ve farkla yan yana koyar; her sekmenin kendi <strong>Sıfırla</strong> düğmesi vardır. <strong>01 · Hız yasaları ve derece</strong>: Hazır tepkime menüsü, Tepkime derecesi n, Hız sabiti k ve [A]₀ kutuları, Ölçüm gürültüsü σ ve Gürültü tohumu; kartlar yarılanma süresini eğriden ve formülden, üç doğrusallaştırmanın R²'sini ve [A] ölçeğindeki artıktan tanınan dereceyi verir. <strong>02 · Başlangıç hızları yöntemi</strong>: gizli bir hız = k[A]<sup>m</sup>[B]<sup>n</sup> yasası, Başlangıç [A]₀ ve [B]₀ kaydırıcıları, Deneyi yap, tahmin kutuları ve Denetle. <strong>03 · Sıcaklık ve Arrhenius</strong>: beş sıcaklıkta k ölçüp ln k – 1/T doğrusundan Eₐ çıkarır; altta on derece kuralı ve Maxwell–Boltzmann kuyruğu. <strong>04 · Mekanizmalar ve kataliz</strong>: A → I → P zincirinde logaritmik k₁, k₂ kaydırıcıları ve hazır oran düğmeleri; tersinir A ⇌ B için Eₐ, ΔH, T ve katalizörün indirdiği ΔEₐ. Dürüst bir not: OpenStax'tan açılan dört hazır tepkime (01) ve HI ölçümleri (03) dışındaki bütün k, Eₐ, A değerleri ve gizli yasalar öğretim değeridir; gerçek bir tepkimeye ait değildir.",
    experiments: [
      {
        title: "Derece, yarılanmayı nasıl değiştirir?",
        predict: "k = 0.1 ve [A]₀ = 1 mol/L kalırken derece 0'dan 2'ye çıkarsa ilk yarılanma ve ikinci yarılanma nasıl değişir? [A]₀'ı ikiye katlamak hangi derecede t½'yi değiştirmez?",
        do: "01 sekmesinde Sıfırla. Tepkime derecesi n menüsünü sırayla 0, 1 ve 2 yap; Yarılanma süresi ve İkinci yarılanma kartlarını, alttaki üç satırlı tabloyu oku. Son olarak Hazır tepkime menüsünden Bütadien dimerleşmesi'ni seç.",
        observe: "İlk yarılanma 5.000 s, 6.931 s ve 10.00 s; ikinci/birinci oranı 0.500, 1.000 ve 2.000. Tabloda [A]₀ = 0.5000, 1.000, 2.000 için 0. derecede 2.500 / 5.000 / 10.00 s, 1. derecede üçü de 6.931 s, 2. derecede 20.00 / 10.00 / 5.000 s. Bütadien hazırında t½ 86.81 min çıkar; OpenStax'ın verdiği 86.8 min ile aynı.",
        explain: "Sıfırıncı derecede hız sabittir; yarılanacak miktar azaldıkça süre de kısalır. İkinci derecede hız [A]² ile çok çabuk düştüğü için her yarılanma bir öncekinin iki katı sürer. Yalnız birinci derecede hız ve yarılanacak miktar aynı oranda değişir. Ek sınama: n = 2'de gürültüyü 5 %'e çıkar. En yüksek R² yanlış grafikte, ln[A]–t'de (0.73775; 1/[A]–t 0.41323), çünkü ters alma düşük derişimdeki gürültüyü büyütür. Sayfa yine 2. dereceyi tanır: ağırlıklı uyumların [A] ölçeğindeki artık RMS'i 0.14, 0.089, 0.054 mol/L, en küçüğü 1/[A]'da.",
      },
      {
        title: "Gizli yasayı başlangıç hızlarıyla bul",
        predict: "[B]₀ sabitken [A]₀'ı ikiye katlamak hızı dört katına çıkarıyorsa m kaçtır? Üç deney, m, n ve k'yı bulmaya yeter mi?",
        do: "02 sekmesinde Sıfırla (Gizli hız yasası no 1). Varsayılan 0.10 / 0.10 mol/L ile Deneyi yap. Başlangıç [A]₀'ı 0.20 yapıp tekrarla; sonra Başlangıç [B]₀'ı da 0.20 yapıp bir kez daha. m = 2, n = 1 seç, k kutusuna 0.92 yaz, Denetle; en son Çözümü göster.",
        observe: "Defterde 9.26×10⁻⁴, 0.00373 ve 0.00736 mol/(L·s); ilk ölçüm 5.43 s, sonrakiler 1.36 s sürer. Son iki deney kartı önce m ≈ 2.01, sonra n ≈ 0.98 gösterir; seçtiğin m, n ile son deneyden k = 0.920 L²/(mol²·s). Denetle 'Tebrikler' der. Çözüm: k = 0.92, m = 2, n = 1; üç deneyin en küçük kareler uyumu m = 2.01, n = 0.98, k = 0.906.",
        explain: "ln(0.00373/9.26×10⁻⁴)/ln 2 ≈ 2.01: tam sayıya yuvarlanınca m = 2. Ölçülen hız gürültülü 11 noktaya uydurulan parabolün t = 0'daki eğimidir; tek deneyde yaklaşık 1.5 % saçılır (ikinci deneyin gerçek hızı 0.00368). Bu yüzden üsleri tam sayıya yuvarlamak ve k'yı birkaç deneyin ortak bilgisinden çıkarmak, tek bir ölçümün ham oranına güvenmekten daha doğrudur.",
      },
      {
        title: "On derece kuralı ne zaman doğru?",
        predict: "Eₐ = 50 kJ/mol olan bir tepkimede 10 °C ısınma hızı her sıcaklıkta iki katına mı çıkarır? Eₐ'nın üstündeki molekül payı Arrhenius oranıyla aynı oranda mı büyür?",
        do: "03 sekmesinde Sıfırla; üstteki Eₐ kartında ölçülen değeri not et. Kural ve dağılım için T kaydırıcısını 0, 25, 100 ve 200 °C'ye getir; k(T + 10)/k(T) ve tam iki kat için gereken Eₐ kartlarını oku. 25 °C'ye dönüp dağılım kartlarına bak; sonra Aktivasyon enerjisi Eₐ'yı 100 kJ/mol, T'yi 100 °C yap.",
        observe: "Simülasyon Eₐ'yı 49.81 ± 0.51 kJ/mol ölçer (−0.39 %). Oran 0 °C'de × 2.176, 25 °C'de × 1.924, 100 °C'de × 1.523, 200 °C'de × 1.301; tam iki kat için 44.6, 52.9, 82.4 ve 131.7 kJ/mol gerekir. 25 °C'de pay F = 9.028×10⁻⁹, e<sup>−Eₐ/RT</sup> = 1.739×10⁻⁹ (F/e<sup>−x</sup> = 5.190); F(T + 10)/F(T) = × 1.894, Arrhenius oranından −1.56 % farklı. Eₐ = 100, 100 °C'de × 2.319 ve durum satırı 'tutmuyor' der.",
        explain: "Oran e<sup>(Eₐ/R)(1/T − 1/(T+10))</sup> ≈ e<sup>10Eₐ/RT²</sup>'dir: sıcaklık yükseldikçe küçülür, Eₐ büyüdükçe büyür. 'On derecede iki kat' yalnız oda sıcaklığında Eₐ ≈ 53 kJ/mol civarında tutan bir pratik hesaptır, doğa yasası değil. Payların oranının biraz düşük çıkması, F'deki √x çarpanının sıcaklıkla azalmasından gelir.",
      },
      {
        title: "Hız belirleyen basamak ve katalizör",
        predict: "k₂ = 10·k₁ iken [P]'nin yarıya ulaşması ln 2/k₁'e ne kadar yakındır? Basamakların sırası tersine dönerse kararlı durum yaklaşımı ne olur? Katalizör dengenin yerini değiştirir mi?",
        do: "04 sekmesinde Sıfırla (k₁ = 1.00, k₂ = 10.0 s⁻¹). [I] tepe, kararlı durum hatası ve [P] = [A]₀/2 kartlarını oku. k₂ = k₁/10 düğmesine bas. Sonra alttaki bölümde varsayılan ΔEₐ = 15 kJ/mol ile kartları oku ve Katalizörün indirdiği tepe ΔEₐ'yı 0'a çek.",
        observe: "Varsayılanda [I] tepe 0.0774 mol/L (255.8 ms'de), yaklaşım hatası 7.74 % · [A]₀, [P] yarı anı 0.7984 s; ln 2/min(k) = 0.6931 s'den +15.19 %, 1/k₂ gecikmesi eklenince 0.7931 s'den +0.67 % farklı. k₂ = k₁/10'da tepe 0.7743 mol/L, hata 77.43 %, [P] yarı anı 2.525 s. Katalizde hızlanma × 424.5 · × 424.5, iki plato 2.240, τ 2.245 s · 5.289 ms; ΔEₐ = 0'da × 1.000 ve eğriler üst üste.",
        explain: "Hızlı ikinci basamak I'yı biriktirmez; yavaş basamak süreyi belirler ve 1/k₂ kadar küçük bir gecikme ekler. Yavaş basamak ikinci olunca I birikir, d[I]/dt ≈ 0 varsayımı çöker. Katalizör iki tepeyi aynı ΔEₐ kadar indirdiği için ileri ve geri hız aynı çarpanla büyür; oranları, yani K, değişmez. Plato değerindeki −0.01 %'lik fark, pencerenin 10τ'da bitmesinden kalan yaklaşma artığıdır.",
      },
    ],
  },
  wow: [
    {
      title: "Elmas sonsuza kadar değil; sadece acelesi yok",
      body:
        "Oda sıcaklığında ve normal basınçta karbonun kararlı biçimi grafittir; elmasın standart oluşum Gibbs enerjisi grafitinkinden yaklaşık 2.9 kJ/mol yüksektir. Yani termodinamik açıdan her elmas grafite dönüşmek 'ister'. Ama dönüşüm için kristaldeki güçlü bağların yeniden düzenlenmesi gerekir ve bu engel o kadar yüksektir ki dönüşüm insan ömrü ölçeğinde gözlenmez. Elmasın kalıcılığı termodinamiğin değil kinetiğin hediyesidir.",
    },
    {
      title: "78 milyon yıl yerine 18 milisaniye",
      body:
        "Orotidin 5′-fosfat dekarboksilaz adlı enzim, DNA ve RNA yapı taşlarının üretimindeki bir adımı hızlandırır. Anna Radzicka ile Richard Wolfenden 1995'te enzimsiz tepkimeyi kapalı tüplerde yüksek sıcaklıklarda ölçtü ve sıcaklık bağımlılığından oda sıcaklığına geri hesapladı (bu sayfadaki ln k – 1/T mantığıyla): yarı ömür yaklaşık 78 milyon yıl. Enzimle aynı adımın yarı ömrü yaklaşık 18 milisaniye; hızlanma yaklaşık 10<sup>17</sup> kat. 04 sekmesindeki e<sup>ΔEₐ/RT</sup> bağıntısıyla bu, 25 °C'de tepeyi yaklaşık 97 kJ/mol alçaltmaya denktir; sayfanın kaydırıcısı en çok 30 kJ/mol'e, yani × 1.802×10⁵'e kadar gider.",
    },
    {
      title: "Termometre yerine cırcır böceği",
      body:
        "1897'de fizikçi Amos Dolbear 'Termometre olarak cırcır böceği' başlıklı kısa bir makale yayımladı. Kuralı Fahrenheit cinsindendi: dakikadaki ötüş sayısı N ise sıcaklık T ≈ 50 + (N − 40)/4 °F. Dakikada 120 ötüş, 70 °F yani yaklaşık 21 °C demek. (Margarette W. Brooks benzer bir ilişkiyi 1881'de yayımlamış, ama yazısı fark edilmemişti.) Vücut sıcaklığı ortama uyan bir hayvanın kaslarını ve sinirlerini süren kimyasal tepkimeler sıcaklıkla hızlandığı için ötüş temposu da hızlanır; yaz gecesi pencereden gelen ses aslında bir kinetik ölçümüdür.",
    },
  ],
  worked: {
    title: "Gerçek veriden aktivasyon enerjisi: 2HI → H₂ + I₂",
    prompt:
      "OpenStax'ın HI ayrışması tablosunda 575 K'de k = 1.22×10⁻⁶, 700 K'de k = 1.16×10⁻³ L/(mol·s). Bu iki noktadan Eₐ'yı bul, 645 K için k'yı tahmin et ve tablodaki 8.59×10⁻⁵ L/(mol·s) ile karşılaştır. Sonra sayfada 03 sekmesinde Veri kaynağı'nı 'OpenStax ölçümü' yapıp beş noktalı uyumla kıyasla.",
    steps: [
      "Arrhenius'u iki sıcaklık için yazıp oranlarsan A sadeleşir: ln(k₂/k₁) = (Eₐ/R)(1/T₁ − 1/T₂). Sol taraf: ln(1.16×10⁻³ / 1.22×10⁻⁶) = ln 950.8 ≈ 6.857.",
      "Parantez: 1/575 K − 1/700 K = 3.106×10⁻⁴ K⁻¹. Eₐ = 8.314 J/(mol·K) × 6.857 / 3.106×10⁻⁴ K⁻¹ ≈ 1.836×10⁵ J/mol ≈ 184 kJ/mol. Birim: J/(mol·K) bölü K⁻¹ = J/mol.",
      "645 K tahmini: ln(k/k₁) = −(Eₐ/R)(1/645 − 1/575) = 22081 K × 1.887×10⁻⁴ K⁻¹ ≈ 4.168. k ≈ 1.22×10⁻⁶ × e<sup>4.168</sup> ≈ 1.22×10⁻⁶ × 64.6 ≈ 7.9×10⁻⁵ L/(mol·s); tablodaki 8.59×10⁻⁵'ten yaklaşık 8 % küçük.",
      "Sayfa beş noktaya en küçük kareler uygular: eğim −22290 K, Eₐ = 185.31 ± 2.18 kJ/mol, R² 0.999586. Kitap aynı veriden eğimi grafikle −2.2×10⁴ K okuyup 1.8×10⁵ J/mol verir; sayfa farkı +2.95 % olarak yazar. İki nokta seçmek bilgiyi atar, beş noktalı uyum her ölçümün hatasını ortalar ve bir belirsizlik de verir.",
    ],
    result:
      "Eₐ ≈ 184 kJ/mol (iki nokta), 185.31 ± 2.18 kJ/mol (beş nokta). Bu büyüklükte bir Eₐ ile on derece kuralı hiç tutmaz: 700 K'de 10 K ısınma k'yı yalnız yaklaşık 1.57 katına çıkarır, aynı Eₐ oda sıcaklığında olsaydı 10 °C k'yı yaklaşık 11 katına çıkarırdı.",
  },
  misconceptions: [
    {
      myth: "Katalizör dengeyi ürünler yönüne kaydırır, daha çok ürün verir.",
      truth:
        "Katalizör ileri ve geri tepkimeyi aynı oranda hızlandırır; aynı sıcaklıkta denge sabiti ve denge bileşimi değişmez. Kazandırdığı şey zamandır. 04 sekmesinde ΔEₐ = 15 kJ/mol iki yönü de × 424.5 hızlandırır, iki eğri de [B]/[A] = 2.240 platosuna varır; yalnız τ 2.245 s'den 5.289 ms'ye iner.",
    },
    {
      myth: "Sıcaklık 10 °C artınca tepkime hızı her zaman iki katına çıkar.",
      truth:
        "Oran e<sup>(Eₐ/R)(1/T − 1/(T+10))</sup>'dir; aktivasyon enerjisine ve sıcaklığa bağlıdır. Eₐ = 50 kJ/mol için sayfa 0 °C'de × 2.176, 25 °C'de × 1.924, 200 °C'de yalnız × 1.301 verir. Kural, oda sıcaklığında Eₐ'sı yaklaşık 53 kJ/mol olan tepkimeler için kaba bir hesaptır.",
    },
    {
      myth: "Sıcak ortamda moleküller daha sık çarpıştığı için tepkime hızlanır.",
      truth:
        "Çarpışma sıklığı moleküllerin ortalama hızıyla, yani kabaca √T ile artar: 25'ten 35 °C'ye yalnızca yaklaşık %1.7. Oysa Eₐ = 50 kJ/mol ile k neredeyse iki katına çıkar. Asıl etki, Eₐ'yı aşacak enerjiye sahip moleküllerin payının büyümesidir; 03 sekmesinde bu pay 25 °C'den 35 °C'ye × 1.894 büyür. Arrhenius'u 1889'da 'etkin moleküller' fikrine götüren de tam bu uyumsuzluktu.",
    },
    {
      myth: "Bol enerji açığa çıkaran (kendiliğinden) bir tepkime hızlı da olur.",
      truth:
        "Kendiliğindenlik nereye gidileceğini, kinetik ne kadar sürede gidileceğini söyler; ikisi ayrı sorulardır. Şekerin yanması ve elmasın grafite dönüşmesi termodinamik açıdan elverişlidir ama oda sıcaklığında fark edilmeyecek kadar yavaştır. Tepkimeyi bekleten şey aktivasyon enerjisi tepesidir.",
    },
  ],
  glossary: [
    { term: "Tepkime hızı", definition: "Bir maddenin derişiminin birim zamandaki değişimi, katsayısına bölünmüş hâli; birimi mol/(L·s)." },
    { term: "Hız sabiti (k)", definition: "Hız yasasındaki orantı katsayısı; derişime bağlı değildir ama sıcaklık ve katalizörle değişir, birimi toplam dereceye bağlıdır." },
    { term: "Tepkime derecesi", definition: "Hız yasasında bir maddenin derişimine ait üs; denklemden değil deneyden belirlenir." },
    { term: "Yarılanma süresi (t½)", definition: "Bir maddenin derişiminin yarıya inmesi için geçen süre; yalnız birinci derecede (ln 2/k) başlangıç derişiminden bağımsızdır." },
    { term: "Aktivasyon enerjisi (Eₐ)", definition: "Tepkimeye girenlerin ürüne dönüşmek için aşması gereken enerji engeli; birimi kJ/mol." },
    { term: "Ön çarpan (A)", definition: "Arrhenius denklemindeki, ln k – 1/T doğrusunun kesişiminden okunan çarpan; birimi k'nınkiyle aynıdır." },
    { term: "Kararlı durum yaklaşımı", definition: "Kısa ömürlü bir ara ürünün derişim değişim hızını sıfır sayıp derişimini öbür maddeler cinsinden yazma yöntemi." },
    { term: "Katalizör", definition: "Tepkimeye daha düşük aktivasyon enerjili bir yol açan ve sonunda net olarak tükenmeyen madde." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede hız yasası bir formüldür; <strong>Fizikokimya</strong> derslerinde bir <strong>diferansiyel denklem sistemidir</strong>. Birden çok basamaklı mekanizmalarda denklemler birbirine bağlanır; kapalı çözüm çoğu zaman yoktur, bu yüzden bu sayfanın kullandığı RK4 gibi sayısal yöntemler ve kararlı durum yaklaşımı, ön denge, hız belirleyen basamak gibi sadeleştirmeler kullanılır. Ölçülen hız yasasından görünmeyen mekanizmayı geriye doğru çıkarmak, kinetiğin asıl dedektiflik işidir. Enzimlerde aynı mantık Michaelis–Menten modeline, ilaçlarda farmakokinetiğe, <strong>Kimyasal Reaksiyon Mühendisliği</strong>'nde hız yasasının akış reaktörüne yerleştirilmesine dönüşür.",
      "Arrhenius denklemi bugün çoğunlukla deneysel bir bağıntı olarak görülür; 'A neden bu değerde, tepenin zirvesinde ne var?' sorusunu 1935'te Henry Eyring ve başkalarının geliştirdiği <strong>geçiş hâli kuramı</strong> yanıtlar. Orada zirvedeki kararsız yapı, <strong>İstatistiksel Termodinamik</strong> ve Maxwell–Boltzmann dağılımı devreye girer; ön çarpan bir etkinleşme entropisi taşır, bu sayfanın kataliz modelinde eşit alınan ön çarpanların gerçekte neden farklı olduğu da buradan anlaşılır. Atmosfer kimyası, yanma, yarı iletken üretimi ve pillerin ömür tahmini hep aynı soruyu sorar: bu dönüşüm ne kadar sürer?",
    ],
    topics: ["İntegral hız yasaları", "Başlangıç hızları ve doğrusal regresyon", "Tepkime mekanizmaları", "Kararlı durum ve ön denge yaklaşımı", "Geçiş hâli kuramı", "Maxwell–Boltzmann dağılımı", "Enzim kinetiği", "Reaktör tasarımı"],
  },
  quiz: [
    {
      question: "İkinci dereceden bir tepkimede [A]₀ iki katına çıkarılıyor, k aynı kalıyor. İlk yarılanma süresi ne olur?",
      options: ["İki katına çıkar", "Aynı kalır", "Yarıya iner", "Dörtte birine iner"],
      answer: 2,
      explanation: "t½ = 1/(k[A]₀): derişim iki kat, süre yarı. 01 sekmesinde n = 2 iken tablo 0.5000, 1.000, 2.000 mol/L için 20.00, 10.00, 5.000 s gösterir. Aynı nedenle ikinci yarılanma birincinin iki katıdır: o sırada derişim yarıya inmiştir.",
    },
    {
      question: "Gizli yasa 1'de [B]₀ sabitken [A]₀'ı ikiye katlamak başlangıç hızını 9.26×10⁻⁴'ten 0.00373 mol/(L·s)'ye çıkarıyor. [B]₀ yine sabitken [A]₀ üç katına çıkarılırsa hız yaklaşık kaç katına çıkar?",
      options: ["3 katına", "6 katına", "9 katına", "27 katına"],
      answer: 2,
      explanation: "Oran 0.00373/9.26×10⁻⁴ ≈ 4.03 ≈ 2², yani m = 2 (sayfa m ≈ 2.01 yazar). Hız [A]² ile değiştiğinden üç kat derişim 3² = 9 kat hız verir. 27, m = 3 olsaydı doğru olurdu.",
    },
    {
      question: "25 °C'de Eₐ = 50 kJ/mol olan bir tepkimede 10 °C ısınma k'yı × 1.924 artırıyor. Aynı sıcaklıkta Eₐ = 100 kJ/mol olsaydı oran ne olurdu?",
      options: ["× 1.92", "× 2.92", "× 3.70", "× 3.85"],
      answer: 2,
      explanation: "ln(oran) = (Eₐ/R)(1/T − 1/(T+10)) Eₐ ile doğru orantılıdır; Eₐ ikiye katlanınca ln(oran) ikiye katlanır, oran da karesine çıkar: 1.924² ≈ 3.70. Sayfada Eₐ = 100, T = 25 °C yaparak × 3.703 görebilirsin. × 3.85 oranı iki katına çıkarmak olurdu: üstel bir ilişkide çarpan değil üs ikiye katlanır.",
    },
  ],
  next: [
    { href: "enzim-kinetigi.html", title: "Enzim Kinetiği Laboratuvarı", why: "Biyolojinin katalizörleri: substrat derişimi arttıkça hızın Vmax'a doyduğu Michaelis–Menten eğrisi ve inhibitör modunun Km ile Vmax'ı nasıl değiştirdiği." },
    { href: "kimyasal-denge-ve-gibbs-enerjisi.html", title: "Kimyasal Denge ve Gibbs Enerjisi: Q, K, ΔG ve Çözünürlük", why: "Kinetik 'ne kadar hızlı' diye sorar; oradaki laboratuvar Q'yu K ile karşılaştırıp 'hangi yöne, nereye kadar' sorusunu yanıtlar ve K'yı Gibbs enerjisine bağlar: 04 sekmesindeki K = e<sup>−ΔH/RT</sup> sadeleştirmesinin eksiği ΔS'dir." },
    { href: "radyoaktif-bozunma.html", title: "Radyoaktif Bozunma: Rastlantıdan Doğan Yasa", why: "Birinci derece yasa çekirdeklerde; bozunma zinciri modunda Mo-99 → Tc-99m → Tc-99, 04 sekmesindeki A → I → P ile aynı denklemleri izler." },
    { href: "kimya-muhendisligi.html", title: "Kimya Mühendisliği: Reaktör, Damıtma ve Isı Değiştirici", why: "Reaktörler sekmesi bu sayfada ölçtüğün k·Cⁿ hız yasasını karıştırmalı tank ve borusal reaktörün tasarım denklemlerine yerleştirir." },
  ],
  sources: [
    { title: "OpenStax · Chemistry 2e, 12.4 Integrated Rate Laws", url: "https://openstax.org/books/chemistry-2e/pages/12-4-integrated-rate-laws", note: "Sıfırıncı, birinci ve ikinci derece için integral yasalar ve yarılanma; 01 sekmesinin dört hazır tepkimesi (NH₃, siklobütan, H₂O₂, bütadien) bu bölümün örneklerinden." },
    { title: "OpenStax · Chemistry 2e, 12.5 Collision Theory", url: "https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory", note: "Çarpışma kuramı, Arrhenius denklemi ve 03 sekmesindeki 2HI → H₂ + I₂ tablosu (555–781 K, Eₐ ≈ 180 kJ/mol)." },
    { title: "PhET · Reaksiyonlar ve Oranlar", url: "https://phet.colorado.edu/tr/simulations/reactions-and-rates", note: "Molekülleri tek tek çarpıştırabildiğin, enerji tepesini görebildiğin bir simülasyon; bu sayfanın sayısal laboratuvarına parçacık resmini ekler." },
    { title: "Vikipedi · Arrhenius eşitliği", url: "https://tr.wikipedia.org/wiki/Arrhenius_e%C5%9Fitli%C4%9Fi", note: "Denklemin iki biçimine (R ve Boltzmann sabitiyle) ve kökenine Türkçe kısa giriş." },
  ],
  revision: "Kasım 2026",
};
