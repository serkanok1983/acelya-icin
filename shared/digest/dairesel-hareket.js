window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["dairesel-hareket"] = {
  slug: "dairesel-hareket",
  title: "Dairesel Hareket: Hiç Yere Varmayan Düşüş",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Sürat hiç değişmese bile çemberdeki cisim ivmelenir. Bu ivmeyi hız farkından ölç, onu hangi gerçek kuvvetin sağladığını bul, sonra aynı hareketi dönen bir diskin üstünden izle.",
  hook: "Uluslararası Uzay İstasyonu sen bu cümleyi okurken Dünya'ya doğru düşüyor; ama hiç yere varmıyor. Saniyede yaklaşık 7.7 km ile öyle hızlı ilerliyor ki düştükçe altındaki yeryüzü de eğrilip kaçıyor. İpin ucunda çevirdiğin anahtarlık da aynı fiziği yaşar: elin dışa doğru çekildiğini hisseder, oysa ip anahtarlığa yalnızca içe doğru kuvvet uygular.",
  bigIdea:
    "Çember üzerinde dönen bir cismin hızı sürekli yön değiştirdiği için cisim her an merkeze doğru <strong>a = v²/r</strong> ile ivmelenir; bu ivmeyi sağlayan kuvvet ayrı bir kuvvet değil, ip, sürtünme, yolun normal kuvveti ya da kütleçekim gibi gerçek kuvvetlerin merkeze yönelen toplamıdır.",
  story: [
    "Bir taşı sapanda döndürüp bırak: taş merkezden dışarı doğru değil, çembere teğet uçar. René Descartes 1644'te yayımladığı <em>Felsefenin İlkeleri</em>'nde tam bu sapan örneğini kullandı ve kuralı açıkça yazdı: kendi hâline bırakılan cisim <strong>düz bir çizgide</strong> gitmeye devam eder. Bu cümlenin şaşırtıcı bir yan sonucu vardı. Çember üzerinde dönen taş da aslında her an düz gitmek ister; çember onun doğal yolu değil, zorla bükülmüş bir yoldur. O zaman soru değişir: taşı her an çemberin içine doğru büken nedir ve ne kadar güçlü olmalıdır?",
    "Nicel cevabı ilk bulan, sarkaçlı saatin mucidi Christiaan Huygens oldu. Huygens 1659 civarında yazdığı <em>De vi centrifuga</em> (Merkezkaç kuvvet üzerine) adlı incelemede, dönen bir cismin ipi germe eğiliminin süratin karesiyle arttığını ve yarıçapla azaldığını gösterdi; bugünkü diliyle <em>v²/r</em>. 'Merkezkaç' (<em>centrifuga</em>, merkezden kaçan) adını da o koydu. Sonuçlarını kanıtsız olarak 1673'te <em>Horologium Oscillatorium</em> kitabının sonuna ekledi; kanıtlarıyla birlikte tam metin ancak ölümünden sonra, 1703'te basıldı. Huygens olaya ipi tutan elin gözünden bakıyordu: elin hissettiği, dışa doğru bir çekişti.",
    "Isaac Newton aynı ilişkiye 1660'ların ortasında, Huygens'ten bağımsız olarak kendi notlarında ulaştı; o da önce 'merkezden uzaklaşma çabası' diye düşünüyordu. 1679'da Robert Hooke mektupla bir fikir önerdi: gezegen hareketini düz bir eylemsizlik hareketi ile merkeze doğru bir çekimin bileşimi olarak düşünmek. Newton bakışı tersine çevirdi: önemli olan cismin kaçma eğilimi değil, onu içe çeken kuvvetti. 1680'lerde Huygens'in terimine karşılık bu kuvvete <strong>merkezcil</strong> (<em>vis centripeta</em>, merkeze yönelen) adını verdi. 1687'de <em>Principia</em>'nın üçüncü kitabında Ay'ın yörüngesinde kalması için gereken ivmeyi hesaplayıp yeryüzündeki düşmeyle karşılaştırdı. Hesabı sen de yapabilirsin: Ay yaklaşık r = 3.84×10⁸ m uzakta, yani Dünya yarıçapının yaklaşık 60 katı uzaklıkta, bir turunu yıldızlara göre T = 27.32 günde atar. a = 4π²r/T² ≈ 2.72×10⁻³ m/s² çıkar; ters kare yasasının öngördüğü g/60² = 9.81/3600 ≈ 2.73×10⁻³ m/s² ile yüzde bir içinde örtüşür.",
    "Ya elma? Öykünün iki tanığı var. Newton'un genç arkadaşı William Stukeley, 1726'da Newton'la bahçede yaptığı bir sohbeti 1752'de kaleme aldığı anılarında yazıya geçirdi: Newton ona, gençliğinde düşen bir elmayı görünce 'Bu elma neden yana ya da yukarı değil de hep Dünya'nın merkezine doğru düşüyor?' diye sorduğunu anlatmıştı. Darphane'deki yardımcısı ve sonradan halefi, yeğeni Catherine Barton'ın eşi John Conduitt ise aynı bahçe anısında Newton'un 'Bu çekim neden Ay'a kadar uzanmasın?' diye düşündüğünü aktardı. Elmanın Newton'un kafasına düştüğü bu kayıtların hiçbirinde yoktur; o kısım sonradan eklenmiş bir süstür. Kesin olan, elmanın değil hesabın tarihe geçtiğidir: Ay'ı yörüngede tutan ivme ile ağaçtan düşen elmanın ivmesi tek bir ters kare yasasının iki ucuydu.",
  ],
  core: [
    {
      heading: "Yön değişimi de ivmedir",
      body: "İvme yalnızca hızlanmak ya da yavaşlamak değildir; hız bir <strong>vektördür</strong> ve yönü değiştiğinde de ivme vardır. Δt süresinde hız vektörü ωΔt açısı kadar döner. Sürat sabitse iki hız vektörü aynı uzunluktadır ve farkları, yarıçapı v olan bir çemberde bir <strong>kiriştir</strong>: |Δv| = 2v·sin(ωΔt/2). Bunu Δt'ye bölünce ortalama ivme çıkar. Kiriş yaydan (vωΔt) biraz kısa olduğu için bu oran v²/r'nin hep biraz altında kalır; Δt → 0 iken sin x ≈ x olur ve limit tam olarak v²/r'dir. Aynı limitte Δv tam merkeze yönelir; bu yüzden bu ivmeye <strong>merkezcil ivme</strong> denir. Sayfanın ilk sekmesi ivmeyi tam böyle, iki kayıtlı hız vektörünün farkından ölçer.",
      formula: "|Δv|/Δt = 2v·sin(ωΔt/2)/Δt → a<sub>c</sub> = v²/r = ω²r",
      formulaNote:
        "Sürati iki katına çıkarmak ivmeyi dört katına çıkarır: hız vektörü hem iki kat uzundur hem iki kat hızlı döner.",
    },
    {
      heading: "Açısal hız, periyot ve hızlanan dönme",
      body: "Yarıçapın saniyede taradığı açıya <strong>açısal hız</strong> denir: ω = v/r = 2π/T, birimi rad/s. v = ωr yazınca ivme ω²r biçimini alır. v²/r'de yarıçap paydada, ω²r'de payda; çelişki yok, hangi büyüklüğü sabit tuttuğuna bağlı. Dönme hızlanıyorsa (sabit <strong>açısal ivme</strong> α) ivmenin ikinci bir bileşeni doğar: süratin değişimini taşıyan <strong>teğetsel ivme</strong> a<sub>t</sub> = αr. Merkezcil bileşen ise o anki ω ile ω²r'dir. Toplam ivme artık merkeze bakmaz, merkez yönünden tan φ = α/ω² açısı kadar sapar. Sabit ivmeli doğrusal hareketin denklemleri açılar için aynen geçerlidir.",
      formula: "ω = ω₀ + αt · θ = ω₀t + αt²/2 · ω² = ω₀² + 2αθ<br>a<sub>t</sub> = αr · a<sub>c</sub> = ω²r · |a| = √(a<sub>t</sub>² + a<sub>c</sub>²)",
      formulaNote:
        "Cisim bir an durduğunda (ω = 0) merkezcil ivme sıfırdır ama teğetsel ivme sürer: ivme sıfır değil, tamamen teğetseldir.",
    },
    {
      heading: "Merkezcil kuvvet bir görevdir, kuvvet türü değil",
      body: "Newton'un ikinci yasası F = ma'yı merkezcil ivmeye uygula: cismi çemberde tutmak için merkeze doğru <strong>mv²/r</strong> büyüklüğünde net kuvvet gerekir. Bu görevi kim üstlenir? Yatay ipte ipin gerilmesi, düz virajda lastikle asfalt arasındaki statik sürtünme, eğimli virajda yolun normal kuvvetinin yatay bileşeni (ve gerekirse sürtünme), Ay'da Dünya'nın kütleçekimi. Serbest cisim çiziminde 'merkezcil kuvvet' diye ayrı bir ok çizilmez; çizilen gerçek kuvvetlerin merkeze yönelen toplamı mv²/r'ye eşit olmak zorundadır. Düz virajda bu toplam yalnız sürtünmedir ve en çok μmg olabilir; buradan en yüksek sürat çıkar. Eğimli yolda sürtünmesiz bile tutunulan bir <strong>ideal sürat</strong> vardır.",
      formula: "Düz viraj: v<sub>max</sub> = √(μgr) · Eğimli, sürtünmesiz: v<sub>ideal</sub> = √(rg·tan β)",
      formulaNote:
        "Gereken kuvvet sağlanamazsa (sürtünme yetmezse, ip kesilirse) cisim çemberden ayrılır ve o anki hız yönünde, yani teğet boyunca gider.",
    },
    {
      heading: "Eşikler: konik sarkacın açılması, düşey çemberde gevşeyen ip",
      body: "Dönen bir mile menteşeyle bağlı, kütlesi ihmal edilen L boylu bir çubuk ve ucunda m kütleli küçük bir cisim düşün. Çubuk θ açısıyla açılınca çubuğun cisme uyguladığı T kuvveti iki iş görür: düşey bileşen ağırlığı taşır (T cos θ = mg), yatay bileşen merkezcil kuvveti sağlar (T sin θ = mω²L sin θ). İkisini bölünce cos θ = g/(ω²L) çıkar. Bu denklemin θ ≠ 0 çözümü yalnız ω² > g/L iken vardır: <strong>kritik açısal hız</strong> ω<sub>k</sub> = √(g/L)'nin altında çubuk eksende kalır, üstünde birden açılmaya başlar. Matematikte buna <strong>çatallanma</strong> denir. Bu sonuç noktasal kütle içindir: kütlesi boyuna düzgün dağılmış bir çubukta eylemsizlik momenti hesaba girer ve eşik √(3g/(2L))'ye kayar. Düşey çemberde ise ip yalnız çekebilir. Tepede T = mv²/L − mg ≥ 0 olmalıdır; enerji korunumu v<sub>tepe</sub>² = v<sub>alt</sub>² − 4gL verir. İkisi birlikte tam tur için v<sub>alt</sub> ≥ √(5gL) koşulunu çıkarır. Bu koşul sağlanmazsa ip tepeden önce gevşer ve cisim kısa bir eğik atış yapar.",
      formula: "cos θ = g/(ω²L) (ω > √(g/L)) · v<sub>alt</sub> ≥ √(5gL) · T<sub>alt</sub> − T<sub>tepe</sub> = 6mg",
      formulaNote:
        "Son eşitlik süratten bağımsızdır: tam tur atan her cisimde alttaki ve tepedeki ip gerilmesinin farkı altı ağırlıktır.",
    },
    {
      heading: "Dönen çerçeve: merkezkaç ve Coriolis",
      body: "Sağa dönen bir arabada sola, kapıya doğru itildiğini hissedersin. Yoldan bakan biri başka bir şey görür: sen düz gitmeye devam etmek istersin, araba sağa döner ve kapı seni içe doğru iterek dönüşe katar. Seni iten kapıdır; seni kapıya doğru iten bir kuvvet yoktur. Dönen bir çerçevenin içinden bakan biri ise Newton yasalarını kullanabilmek için iki terim eklemek zorundadır: dışa doğru <strong>merkezkaç</strong> ivmesi Ω²r′ ve hareket eden cisme etkiyen <strong>Coriolis</strong> ivmesi −2Ω×v′. Bunlar <strong>sözde kuvvetlerdir</strong>: kaynakları, tepki kuvvetleri yoktur ve eylemsiz çerçevede hiç yazılmazlar. Sürtünmesiz bir pak yerden bakışta düz gider; saat yönünün tersine dönen diskten bakınca hareket yönünün sağına sapar. Kısa sürelerde bu sapma yaklaşık Ωv′t²'dir.",
      formula: "a′ = −2Ω×v′ + Ω²r′ (Ω sabit) · d(t) ≈ Ωv′t² (Ωt ≪ 1)",
      formulaNote:
        "Merkezden düz dışa atılan pak için kesin sapma v·t·sin(Ωt)'dir; Ωv′t² bunun ilk terimidir ve Ωt büyüdükçe gerçek sapmayı abartır.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvardır ve her ölçülen değeri kuramın verdiği değerin yanında, yüzde farkıyla yazar. Ölçümler 1 ms adımlı bir benzetimden gelir; v²/r formülü benzetimin içinde kullanılmaz, ip ve yol kuvvetleri cismin çemberde kalma koşulundan bulunur. <strong>01 · Düzgün dairesel hareket</strong> sekmesinde ipe bağlı cismin ivmesi iki hız vektörünün farkından ölçülür; <strong>Ölçüm aralığı Δt</strong> kaydırıcısı bu iki anın arasını belirler, <strong>İpi kes</strong> düğmesi kuvveti kaldırır. <strong>02 · Düzgün olmayan dairesel hareket</strong> sabit açısal ivme ekler. <strong>03 · Dinamik: hangi kuvvet merkezcil?</strong> sekmesinde menüden ya da hazır düğmelerden konik sarkaç, viraj ve düşey çember seçilir. <strong>04 · Dönen çerçeve</strong> aynı pakı yerden ve dönen diskten gösterir. Bazı ölçümler zaman ister: konik sarkacın açısı ancak yerleşince (varsayılan sönümle yaklaşık 8 s) yazılır, virajın sürat taraması 12 s sürer; kart '—' gösterirken bekle. <kbd>Boşluk</kbd> etkin sekmeyi duraklatır, <kbd>R</kbd> sıfırlar. Sayılar ondalık noktayla yazılır.",
    experiments: [
      {
        title: "Kiriş mi, yay mı? Δt'yi büyüt",
        predict:
          "Ölçüm aralığını büyütürsen ölçülen |Δv|/Δt, v²/r = 6 m/s²'nin üstüne mi çıkar, altına mı iner, yoksa hiç değişmez mi?",
        do: "01 sekmesinde <strong>Sıfırla</strong>'ya bas (r 1.5 m, v 3 m/s). <strong>Ölçüm aralığı Δt</strong> kaydırıcısını sırayla 1, 100, 250 ve 500 ms yap; her seferinde 'Merkezcil ivme |Δv|/Δt · ölçülen' kartını ve durum satırındaki ω·Δt açısını oku. Sonra Δt'yi 20 ms'ye getirip <strong>İpi kes</strong>'e bas.",
        observe:
          "Ölçülen ivme 6.0000 (fark 0.00 %), 5.9900 (−0.17 %), 5.9377 (−1.04 %), 5.7531 m/s² (−4.11 %) olur; hız vektörünün bu aralıkta döndüğü açı 0.11°, 11.46°, 28.65° ve 57.30°'dir. 'Bu Δt için beklenen' kartı her seferinde ölçülenle aynı sayıyı verir. Hız üçgeninde turuncu Δv hep merkeze bakar. İp kesilince ivme 0.0000 m/s²'ye düşer, cisim kesim noktasındaki teğet doğrudan 0.000 mm uzakta kalır; merkezden uzaklığı artar ama düz bir çizgide.",
        explain:
          "Ölçülen değer v²/r'nin altında kalır, çünkü iki hız vektörünün ucunu birleştiren kiriş, aradaki yaydan kısadır: 2v·sin(ωΔt/2) < vωΔt. Fark yaklaşık (ωΔt)²/24 oranındadır; Δt'yi yarıya indirmek hatayı dörde böler ve limit tam v²/r'dir. Türev, bu limitin adıdır. İpi kesmek de bir deneydir: dışa doğru bir kuvvet olsaydı cisim teğetten ayrılırdı; ayrılmıyor.",
      },
      {
        title: "Bir an duran cismin ivmesi sıfır mı?",
        predict:
          "Hızla dönen ve frenlenen cisim bir an durup ters yöne dönecek. Durduğu anda ivmesi sıfır mıdır? İvme o anda nereye bakar?",
        do: "02 sekmesinde <strong>İlk açısal hız ω₀</strong>'ı 4.0 rad/s, <strong>Açısal ivme α</strong>'yı −2.00 rad/s² yap (r 1.5 m). Durum satırı 'bir an durdu' yazar yazmaz <strong>Duraklat</strong>'a bas; teğetsel ve merkezcil ivme kartlarına, φ açısına ve ω² − ω₀² kartına bak. Sonra devam ettir ve deneyin nerede durduğunu izle.",
        observe:
          "Durum satırı 't = 2.00 s'de bir an durdu' yazar. Teğetsel ivme deney boyunca −3.0000 m/s² civarındadır (kuram αr = −3.0000). Durmanın hemen ardından merkezcil ivme 1 m/s²'nin altındadır ve φ −90°'ye yakındır: ivme neredeyse tamamen teğettir. ω² − ω₀² kartı her an 2α(θ − θ₀)'ya eşittir. Cisim ileri doğru en çok 4 rad (yaklaşık 229°) gider; ω grafiği sıfırı keserek düz bir çizgi olarak sürer ve deney |ω| = 15 rad/s sınırında, t = 9.50 s'de durur.",
        explain:
          "ω = 0 anında a<sub>c</sub> = ω²r sıfırdır, ama α sıfır değildir: a<sub>t</sub> = αr = −3 m/s² cismi ters yöne hızlandırmaya devam eder. Durmak ivmenin değil hızın sıfır olmasıdır; havaya atılan topun tepe noktası da aynı derstir. En büyük açı ω₀²/(2|α|) = 16/4 = 4 rad, dönme kinematiğinin ω² = ω₀² + 2αθ denkleminden gelir.",
      },
      {
        title: "Konik sarkaç: yarı hız, yarı açı mı?",
        predict:
          "Mil 4 rad/s ile dönerken çubuk 52° açılıyor. Mili yarı hızla, 2 rad/s ile döndürürsen açı yaklaşık 26° mi olur?",
        do: "03 sekmesinde <strong>Konik sarkaç</strong> düğmesine bas (L 1 m, ω 4 rad/s, b 2.5 1/s). <strong>Milin açısal hızı ω</strong>'yı sırayla 2, 3.5, 4 ve 10 rad/s yap. Her değerde 'Denge açısı · ölçülen (yerleşince)' kartı dolana kadar bekle; varsayılan sönümle bu yaklaşık 8 s sürer. Ölçülen noktaların grafikte kuram eğrisinin üstünde biriktiğine bak.",
        observe:
          "2 rad/s'de çubuk eksene iner, açı 0.00° olur; kritik açısal hız kartı 3.132 rad/s yazar ve 'tek denge θ = 0' der. Gerilme kartı bu durumda T = mg = 4.903 N gösterir: dik çubuk yalnız ağırlığı taşır. 3.5 rad/s'de 36.82°, 4 rad/s'de 52.20°, 10 rad/s'de 84.37° ölçülür; her biri kuramla 0.00° farkla. Gerilme 4 rad/s'de 7.999 N'dir (kuram mω²L = 8.000 N), 10 rad/s'de 50.001 N (kuram 50.000 N). Sönüm b'yi 1 1/s'ye indirirsen aynı açıya yerleşme iki katından uzun sürer.",
        explain:
          "Yarı hız yarı açı vermez; açı hiç oluşmaz. cos θ = g/(ω²L) ancak ω > √(g/L) = 3.132 rad/s iken 1'den küçüktür. Eşiğin altında dönme, çubuğu yana açmaya yetmez. Açılan çubukta gerilme T = mω²L'dir ve θ'ya bağlı değildir, çünkü T sin θ = mω²L sin θ eşitliğinde sin θ sadeleşir. Modelin dürüst notu: sayfa, ip yerine düşey mile menteşeli ve mille birlikte döndürülen kütlesiz bir çubuk ile ucundaki noktasal kütleyi benzetir; sönüm menteşe sürtünmesidir ve sarkacın dengeye oturmasını sağlar. Düzlem dışı salınım yoktur.",
      },
      {
        title: "Dönen diskte sapma t² ile mi büyür?",
        predict:
          "Pak yerden bakışta dümdüz gidiyor. Diskten bakınca sapma, ölçüm anını iki katına çıkarınca dört katına mı çıkar? Diskin dönme yönünü ters çevirirsen ne olur?",
        do: "04 sekmesinde <strong>Sıfırla</strong>'ya bas (Ω 1 rad/s, v 0.8 m/s, r₀ 0 m). <strong>Ölçüm anı t<sub>m</sub></strong>'yi sırayla 0.1, 0.5 ve 1.5 s yap; her seferinde 'Yanal sapma d(t<sub>m</sub>) · ölçülen' ve 'Coriolis tahmini −Ω·v′·t<sub>m</sub>²' kartlarını karşılaştır. Sonra t<sub>m</sub>'yi 0.5 s'ye getirip <strong>Diskin açısal hızı Ω</strong>'yı −1 yap.",
        observe:
          "Ölçülen ve tahmin edilen sapmalar: t<sub>m</sub> 0.1 s'de −0.799 ve −0.800 cm; 0.5 s'de −19.177 ve −20.000 cm (fark −4.11 %); 1.5 s'de −119.699 ve −180.000 cm (−33.50 %). Sapma hareket yönünün sağınadır. Ω = −1'de sapmanın işareti döner: kart 19.177 cm ve 'hareket yönünün soluna' yazar. 'Sözde kuvvetlerle tümleştirilen yol ile fark' kartı 0.0000 mm'de kalır; yerden bakışta net kuvvet 0 N'dir.",
        explain:
          "Kısa sürede Coriolis ivmesi 2Ωv′ neredeyse sabittir ve ½·2Ωv′·t² = Ωv′t² sapma verir: t² ile büyüme buradan gelir. Gerçek sapma −v·t·sin(Ωt)'dir; Ωt büyüdükçe sin(Ωt) < Ωt olur ve tahmin abartır. Sıfır milimetrelik fark asıl derstir: düz yolu döndürerek bulunan yol ile Coriolis ve merkezkaç terimleri tümleştirilerek bulunan yol aynıdır. Sözde kuvvetler yeni bir etki değil, dönen çerçevede düz bir yolu yazmanın hesabıdır. Kuzey yarımkürede Dünya, kuzey kutbunun üstünden bakınca saat yönünün tersine döner; büyük ölçekli hareketler bu yüzden sağa sapar.",
      },
    ],
  },
  wow: [
    {
      title: "Saniyede 7.7 km hızla düşen laboratuvar",
      body: "Uluslararası Uzay İstasyonu yaklaşık 400 km yükseklikte, saniyede yaklaşık 7.7 km hızla dolanır. NASA'ya göre yaklaşık 90 dakikada bir tur atar; 24 saatte 16 gün doğumu ve 16 gün batımı görür. O yükseklikte yerçekimi yok değildir: yeryüzündekinin yaklaşık yüzde 89'u, yani 8.7 m/s² kadardır. Şimdi merkezcil ivmeyi hesapla: Dünya'nın merkezine uzaklık 6371 + 400 = 6771 km, daha kesin sürat 7.67 km/s; v²/r ≈ 8.7 m/s². İki sayı aynı, çünkü kütleçekim tam olarak gereken merkezcil ivmeyi sağlıyor. Astronotlar da istasyon da bu ivmeyle birlikte düşer; bu yüzden yüzerler.",
    },
    {
      title: "Bir buçuk saatten kısa gün, ağırlıksız ekvator",
      body: "Dünya'nın dönüşü ekvatordaki birini saniyede yaklaşık 465 m (saatte yaklaşık 1670 km) hızla taşır. Buna rağmen merkezcil ivme yalnızca 0.034 m/s² eder, g'nin binde 3.5'i: dönüşün tek başına etkisi, 50 kg'lık birinin tartısında 200 gramdan az bir fark yaratır. Peki gün ne kadar kısa olsaydı ekvatordaki cisimler ağırlıksız kalırdı? ω²R = g koşulundan yaklaşık 84 dakika çıkar. Bu, yeryüzünü sıyırarak dolanan bir uydunun tur süresiyle aynıdır: o hızda dönen bir ekvatorda yerde duran taş, aslında yörüngede olurdu.",
    },
    {
      title: "Bir milyon g ile molekül tartmak",
      body: "İsveçli kimyacı The Svedberg 1920'lerin ortasında ultrasantrifüjü geliştirdi ve 1926'da dispers sistemler (kolloidler) üzerine çalışmalarıyla Nobel Kimya Ödülü'nü aldı. Fikir a = ω²r'de gizli: bugünkü laboratuvar ultrasantrifüjlerinin ulaştığı dakikada 150 000 devirle dönen bir rotorda merkezden 4 cm uzaktaki nokta yaklaşık 10⁷ m/s² ivmelenir, yani yaklaşık bir milyon g. Böyle bir ivmede proteinler bile kütlelerine ve biçimlerine göre farklı hızlarda çöker. Biyologların ribozomlara '70S' ve '80S' demesindeki S, onun adını taşıyan çökelme birimidir. Kıyas için: dakikada 1200 devir yapan 25 cm yarıçaplı bir çamaşır makinesi tamburunun duvarı yaklaşık 400 g yaşar.",
    },
  ],
  worked: {
    title: "Eğimli ve sürtünmeli viraj: üç sürat",
    prompt:
      "Yarıçapı r = 50 m olan bir viraj β = 20° eğimle yapılmış; lastik ile yol arasındaki statik sürtünme katsayısı μ = 0.30. Araba virajda kaymadan hangi süratler arasında dönebilir, sürtünmeye hiç ihtiyaç duymadığı ideal sürat nedir? (g = 9.80665 m/s²)",
    steps: [
      "Serbest cisim çizimi: ağırlık mg aşağı, normal kuvvet N yola dik, sürtünme f yol yüzeyi boyunca (f > 0: eğim boyunca aşağı, yani içe). 'Merkezcil kuvvet' diye ayrı ok yok. Yatay (merkeze): N sin β + f cos β = mv²/r. Düşey: N cos β − f sin β = mg.",
      "İdeal sürat (f = 0): iki denklemi bölünce tan β = v²/(rg). rg = 50 m × 9.80665 m/s² = 490.33 m²/s², tan 20° = 0.36397, v² = 178.47 m²/s², v<sub>ideal</sub> = 13.36 m/s (48.1 km/sa).",
      "En yüksek sürat: araba dışa kaymaya çalışır, sürtünme en çok içe doğru μN olur (f = +μN). Denklemleri N'ye bölüp çözünce v² = rg·(tan β + μ)/(1 − μ tan β) = 490.33 × 0.66397/0.89081 = 365.47 m²/s², v<sub>max</sub> = 19.12 m/s (68.8 km/sa).",
      "En düşük sürat: yavaş arabada eğim içe fazla kuvvet verir, araba eğimden aşağı kaymak ister; sürtünme dışa doğru en çok μN olur (f = −μN). v² = rg·(tan β − μ)/(1 + μ tan β) = 490.33 × 0.06397/1.10919 = 28.28 m²/s², v<sub>min</sub> = 5.32 m/s (19.1 km/sa).",
      "Sayfada dene: 03 sekmesinde <strong>Sürtünmeli eğimli viraj</strong> düğmesine, sonra <strong>Sürat taraması (0 → 60 m/s)</strong> düğmesine bas ve 12 s bekle. Tarama, gereken |f|/N'nin −μ, 0 ve +μ düzeylerini kestiği süratleri ölçer: 5.32, 13.36 ve 19.12 m/s, üçü de kuramla 0.00 % farkla. μ'yu 0'a çekip yeniden tararsan üç sürat 13.36 m/s'de birleşir: sürtünmesiz yolda yalnız tek bir sürat tutunur.",
    ],
    result:
      "Araba 5.32 m/s ile 19.12 m/s arasında kaymadan döner; 13.36 m/s'de sürtünmeye hiç gerek kalmaz. Eğim hem üst sınırı yükseltir (düz yolda aynı μ ile √(μgr) = 12.13 m/s olurdu) hem de bir alt sınır doğurur.",
  },
  misconceptions: [
    {
      myth: "Merkezkaç kuvvet dönen cismi dışarı iter; ip kesilirse cisim merkezden dışa doğru fırlar.",
      truth:
        "Yerden bakan biri için dışa doğru iten bir kuvvet yoktur; yalnızca içe doğru çeken ip vardır. İp kesildiğinde bu kuvvet kaybolur ve cisim o anki hız yönünde, yani çembere teğet olarak düz gider. 01 sekmesinde <strong>İpi kes</strong>'e bas: durum satırı cismin teğet doğrudan 0.000 mm uzakta kaldığını yazar. Merkezkaç, yalnız dönen çerçevede hesaba eklenen bir sözde kuvvettir; 04 sekmesi onu orada gösterir.",
    },
    {
      myth: "Sürat sabitse ivme sıfırdır.",
      truth:
        "İvme hız vektörünün değişimidir, yalnızca büyüklüğünün değil. Düzgün dairesel harekette sürat sabittir ama yön her an değişir; ivme merkeze doğru ve v²/r büyüklüğündedir. 01 sekmesinde sürat kartı 3.000 m/s'de dururken ölçülen ivme 6 m/s² civarındadır.",
    },
    {
      myth: "Merkezcil kuvvet, cisme etki eden kuvvetlere eklenen ayrı bir kuvvettir.",
      truth:
        "Merkezcil kuvvet, gerçek kuvvetlerin (gerilme, sürtünme, normal kuvvet, kütleçekim) merkeze yönelen toplamına verilen addır. Serbest cisim çizimine ayrıca 'F<sub>merkezcil</sub>' oku eklemek kuvveti iki kez saymaktır. Doğru yol: gerçek kuvvetleri çiz, merkeze yönelen bileşenlerini topla ve mv²/r'ye eşitle.",
    },
    {
      myth: "Düşey çemberde tepeye çıkacak kadar enerji yeter: alttaki sürat √(4gL) ise cisim tam tur atar.",
      truth:
        "Enerji yalnız tepeye ulaşmayı değil, oraya hangi süratle varılacağını söyler. İpe bağlı cisim tepede en az √(gL) süratle olmalıdır, yoksa ip gevşer; bunun için altta √(5gL) gerekir. L = 1 m'de √(4gL) = 6.26 m/s ile ip yaklaşık 132°'de gevşer ve cisim tepeye hiç varmaz. 03 sekmesinde Düşey çember'i seç ve <strong>Alttaki sürat v<sub>alt</sub></strong>'ı 6.26 m/s yap: ip gevşer, iz turuncu kesikli olur.",
    },
  ],
  glossary: [
    {
      term: "Düzgün dairesel hareket",
      definition:
        "Bir cismin çember üzerinde sabit süratle dolanması; hızın büyüklüğü sabit, yönü sürekli değişir.",
    },
    {
      term: "Merkezcil ivme (a<sub>c</sub>)",
      definition:
        "Hız vektörünün yön değişiminden doğan, çemberin merkezine yönelik ve büyüklüğü v²/r = ω²r olan ivme.",
    },
    {
      term: "Teğetsel ivme (a<sub>t</sub>)",
      definition:
        "Süratin değişiminden doğan, çembere teğet ivme bileşeni; sabit açısal ivmede a<sub>t</sub> = αr.",
    },
    {
      term: "Merkezcil kuvvet",
      definition:
        "Cismi çember üzerinde tutan, gerçek kuvvetlerin merkeze yönelen toplamı; büyüklüğü mv²/r'dir.",
    },
    {
      term: "Açısal hız (ω)",
      definition:
        "Yarıçapın birim zamanda taradığı açı; düzgün dairesel harekette ω = v/r = 2π/T, birimi rad/s.",
    },
    {
      term: "Eylemsiz referans çerçevesi",
      definition:
        "İvmelenmeyen ve dönmeyen bir bakış noktası; Newton yasaları burada ek kuvvet eklemeden geçerlidir.",
    },
    {
      term: "Merkezkaç kuvvet",
      definition:
        "Yalnızca dönen bir çerçeveden bakınca hesaba eklenen, dışa yönelik ve kaynağı olmayan mΩ²r büyüklüğündeki sözde kuvvet.",
    },
    {
      term: "Coriolis kuvveti",
      definition:
        "Dönen çerçevede hareket eden cisme hesapta eklenen, hıza dik ve büyüklüğü 2mΩv′ olan sözde kuvvet; eylemsiz çerçevede yoktur.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede a = v²/r benzer üçgenlerle bulunur; <strong>Fizik I</strong>'de tek satırlık bir türevdir. Konumu vektör olarak yaz: <strong>r</strong>(t) = r·(cos ωt, sin ωt). İki kez türev alınca <strong>a</strong>(t) = −ω²·<strong>r</strong>(t) çıkar: eksi işareti 'merkeze doğru' demektir. Sürat de değişiyorsa ivme teğetsel ve merkezcil bileşenlere ayrılır; kutupsal koordinatlarda genel ivme formülü yarıçapın da değiştiği durumları kapsar ve gezegen yörüngelerinin elips olduğunu kanıtlamanın yolunu açar. Sayfanın kendisi de bir ders taşır: Verlet ve Runge–Kutta gibi <strong>sayısal tümleştirme</strong> yöntemleri, formülü bilmeden hareketi adım adım çözer; Δt'nin hataya etkisi <strong>Sayısal Analiz</strong> dersinin konusudur.",
      "<strong>Klasik Mekanik</strong> dersinde dönen çerçeveler genel biçimde türetilir: dönen eksenlerdeki bir vektörün zaman türevi d/dt|<sub>eylemsiz</sub> = d/dt|<sub>dönen</sub> + Ω× kuralıyla bağlanır ve iki kez uygulanınca Coriolis ile merkezkaç terimleri kendiliğinden çıkar. Bu terimi 1835'te Fransız mühendis Gaspard-Gustave Coriolis, dönen makinelerde iş ve enerji hesabı yaparken türetti. Kuzey yarımkürede tropikal siklonların saat yönünün tersine dönmesi bu etkinin büyük ölçekli sonucudur; hortum ya da lavabo girdabı gibi küçük dönmelerde Coriolis çoğu zaman diğer etkilerin yanında önemsiz kalır. Konik sarkaçtaki ani açılma <strong>Diferansiyel Denklemler</strong> ve doğrusal olmayan dinamikte çatallanma kuramına götürür. Aynı mv²/r eşitliği yüklü parçacıklar için qvB = mv²/r olur ve r = mv/(qB) verir; siklotronlar ve kütle spektrometreleri bu bağıntıyla tasarlanır.",
    ],
    topics: [
      "Vektör değerli fonksiyonların türevi",
      "Kutupsal koordinatlarda ivme",
      "Dönen çerçeveler, Coriolis ve merkezkaç",
      "Kısıtlı hareket ve Lagrange çarpanları",
      "Çatallanma ve denge kararlılığı",
      "Sayısal tümleştirme (Verlet, RK4)",
      "Merkezî kuvvet problemi",
    ],
  },
  quiz: [
    {
      question:
        "Düz bir virajda (r = 50 m, μ = 0.70) araba 15 m/s ile dönerken gereken sürtünme oranı |f|/N = 0.4589 ölçülüyor. Aynı virajı 30 m/s ile almaya kalkarsa ne olur?",
      options: [
        "Oran 0.92'ye çıkar; araba yine de tutunur",
        "Oran yaklaşık 1.84'e çıkar; μ = 0.70 yetmez, araba dışa kayar",
        "Oran değişmez, çünkü viraj ve araba aynı",
        "Oran yarıya iner, çünkü hızlı araba daha az süre virajda kalır",
      ],
      answer: 1,
      explanation:
        "Düz virajda gereken sürtünme oranı (v²/r)/g'dir ve sürat karesiyle girer: (30²/50)/9.80665 = 1.8355, yani 0.4589'un dört katı. Bu, eldeki μ = 0.70'i çok aşar. Tutunmanın sınırı √(μgr) = 18.53 m/s'dir; sayfadaki Düz viraj düzeneğinde sürat taraması da bu sürati ölçer. Hızı iki katına çıkarmak lastiklerden dört kat fazlasını istemektir.",
    },
    {
      question:
        "L = 1 m'lik ip yerine aynı boyda hafif, katı bir çubuk kullanılsaydı, cismin düşey çemberde tam tur atması için alttaki en küçük sürat ne olurdu? (g ≈ 9.81 m/s²)",
      options: [
        "7.00 m/s, yani √(5gL); çubuk da ip gibi davranır",
        "6.26 m/s, yani √(4gL)",
        "4.43 m/s, yani √(2gL)",
        "3.13 m/s, yani √(gL)",
      ],
      answer: 1,
      explanation:
        "İp yalnız çekebildiği için tepede T ≥ 0, yani v<sub>tepe</sub> ≥ √(gL) gerekir; bu da altta √(5gL) = 7.00 m/s eder. Çubuk ise itebilir: tepede gerekirse cismi yukarı iter, bu yüzden tepeye sıfıra yakın bir süratle varmak yeter. Enerji korunumu v<sub>alt</sub>² = v<sub>tepe</sub>² + 4gL'den v<sub>alt</sub> = √(4gL) ≈ 6.26 m/s bulunur. Aradaki fark, kuvvetin hangi yönde olabileceğinden gelir; formüller aynıdır, kısıt farklıdır.",
    },
    {
      question:
        "Dönen diskte (v′ = 0.8 m/s) Ω = 1 rad/s ve t<sub>m</sub> = 0.5 s iken Coriolis tahmini −20.000 cm. Ω'yu 2 rad/s'ye çıkarıp t<sub>m</sub>'yi 0.25 s'ye indirirsen tahmin ne olur, ölçülen sapma ona daha mı yakın olur?",
      options: [
        "−20.000 cm; Ωt aynı kaldığı için hiçbir şey değişmez",
        "−10.000 cm; Ωt aynı kaldığı için tahminin bağıl hatası da aynı kalır",
        "−40.000 cm; Ω iki katına çıktığı için sapma iki katına çıkar",
        "−10.000 cm; t<sub>m</sub> küçüldüğü için tahmin tam doğru olur",
      ],
      answer: 1,
      explanation:
        "Tahmin Ωv′t²'dir: Ω iki kat, t² dörtte bir, sonuç yarı: −10.000 cm. Kesin sapma −v·t·sin(Ωt)'dir: −0.8 × 0.25 × sin(0.5) m = −9.589 cm. Bağıl hata, Ωt = 0.5 rad değişmediği için yine −4.11 %'tür. Tahminin iyiliğini t<sub>m</sub> tek başına değil, diskin o sürede döndüğü açı Ωt belirler.",
    },
  ],
  next: [
    {
      href: "kepler-yasalari.html",
      title: "Kepler Yasaları — Gezegen Yörüngeleri",
      why: "Kütleçekimin merkezcil kuvvet olduğu durum. Birinci sekmedeki Çember düğmesi gezegeni çembersel hızla teğet fırlatır; ölçülen dışmerkezlik sıfıra iner ve buradaki GMm/r² = mv²/r eşitliği geçerli olur. Üçüncü sekmede T² ∝ a³ ilişkisini ölç.",
    },
    {
      href: "is-enerji.html",
      title: "İş, Enerji ve Güç Laboratuvarı",
      why: "Kaykay pisti sekmesinde Döngü pistini seç: pist, ipin tersine yalnız iter. Normal kuvvet sıfıra inince kaykaycı pistten ayrılır; döngü için gereken en küçük bırakma yüksekliğini 2.5R kuramıyla karşılaştır.",
    },
    {
      href: "lorentz-kuvveti.html",
      title: "Lorentz Kuvveti: Yüklü Parçacık Laboratuvarı",
      why: "Merkezcil kuvveti bu kez manyetik alan sağlar: qvB = mv²/r. Sayfa, yörüngeden ölçtüğü yarıçap ve periyodu r = mv/(|q|B) ve T = 2πm/(|q|B) ile karşılaştırır; periyodun süratten bağımsız olduğunu gör.",
    },
  ],
  sources: [
    {
      title:
        "OpenStax · University Physics Vol. 1, 4.4 Uniform and Nonuniform Circular Motion",
      url: "https://openstax.org/books/university-physics-volume-1/pages/4-4-uniform-and-nonuniform-circular-motion",
      note: "Merkezcil ivmenin türetilmesi, teğetsel ivme ve toplam ivme, çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · University Physics Vol. 1, 6.3 Centripetal Force",
      url: "https://openstax.org/books/university-physics-volume-1/pages/6-3-centripetal-force",
      note: "Düz ve eğimli virajlar, ideal eğim açısı, eylemsiz olmayan çerçeveler; merkezkaç ve Coriolis kuvvetinin sözde kuvvet olarak açıklanması.",
    },
    {
      title: "NASA · International Space Station Facts and Figures",
      url: "https://www.nasa.gov/international-space-station/space-station-facts-and-figures/",
      note: "İstasyonun yaklaşık 90 dakikalık tur süresi ve günde 16 tur için resmî veriler.",
    },
    {
      title: "NobelPrize.org · The Svedberg, Nobel Kimya Ödülü 1926",
      url: "https://www.nobelprize.org/prizes/chemistry/1926/svedberg/facts/",
      note: "Ödülün gerekçesi: dispers sistemler üzerine çalışmalar; Svedberg'in yaşamı ve ultrasantrifüj çalışmaları.",
    },
  ],
  revision: "Kasım 2026",
};
