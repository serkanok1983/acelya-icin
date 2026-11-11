window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["hidrolik-sistemler"] = {
  "slug": "hidrolik-sistemler",
  "title": "Hidrolik Sistemler: Debi, Yük ve Güç",
  "field": "Mühendislik",
  "level": "Lise–Lisans",
  "minutes": 28,
  "tagline": "Silindirin hızını debi, basıncını yük belirler. Pompa, kısma valfi ve emniyet (relief) valfi arasında şaft gücünün nereye gittiğini watt watt izle.",
  "hook": "Bir hidrolik silindiri kısma valfiyle yarı hızına düşürdün; motor rahatladı mı? Bu sayfadaki devrede hız %49 azalırken motorun vermesi gereken güç %21 artıyor. Aynı silindir geri çekilirken de içine giren 12 litre yağa karşılık dışarı 16 litre atıyor.",
  "bigIdea": "Hidrolik devrede <strong>debi</strong> hareketin hızını, <strong>yük</strong> gereken basıncı belirler; basınç farkı ile debinin çarpımı olan güç ise yararlı iş ile kayıplar arasında son watt'ına kadar paylaşılır.",
  "story": [
    "Blaise Pascal, kapalı bir sıvıya uygulanan basıncın her yöne azalmadan iletildiğini 1653'te ortaya koydu; incelemesi ancak ölümünden sonra, 1663'te basıldı. Fikrin bir makineye dönüşmesi yüz yıldan uzun sürdü: İngiliz mucit Joseph Bramah hidrolik presinin patentini 1795'te aldı. Küçük bir pistonla pompalanan sıvı, büyük pistonda alanların oranı kadar büyütülmüş bir kuvvet doğuruyordu. Bu kazanç bedava değildir: büyük piston aynı oranda kısa yol alır, yapılan iş aynı kalır.",
    "Pascal ilkesi duran sıvıyı anlatır. Bir pres, vinç ya da kepçe ise hareket eder ve o zaman soru değişir: kuvvet ne kadar büyüdü değil, <strong>güç nereye gidiyor</strong>? Üreticilerin eğitim belgeleri bu yüzden iki ayrı hesabı yan yana verir. Enerpac silindir kuvvetini basınç ile etkin alanın çarpımına, gereken yağ hacmini etkin alan ile strokun çarpımına bağlar; pompa katalogları ise debiyi deplasman ve devirden, torku basınç farkından, kayıpları iki ayrı verimden hesaplar.",
    "Bu laboratuvar o hesapları tek bir enerji bütçesinde birleştirir ve sezgiyi sınar. Bir silindirin yavaşlaması motorun da aynı oranda rahatladığı anlamına gelmez: akış yolu daraltılırsa yağın bir kısmı yükü itmek yerine emniyet valfinden tanka döner. Sayfadaki devrede kısma açıklığı 10 mm²'den 4 mm²'ye inerken silindir hızı 89,5 mm/s'den 45,7 mm/s'ye düşer, gereken şaft gücü ise 3,88 kW'tan 4,71 kW'a çıkar. Bu sayılar bir makinenin ölçümü değil, ideal bir devrenin hesabıdır; sayfa ürün seçimi ya da güvenlik tasarımı yapmaz."
  ],
  "core": [
    {
      "heading": "Mil, pistonun iki yüzünü eşitsiz yapar",
      "body": "Pistonun bir yüzü tam dairedir; öbür yüzünden milin kesiti eksilir ve geriye bir <strong>halka alanı</strong> kalır. Sıkıştırılamaz, kaçaksız yağ için hacim korunur: küçük bir dt süresinde giren Q·dt hacmi, pistonun süpürdüğü Aᵢ·v·dt hacmine eşittir. Aynı debi küçük alana girerse piston daha hızlı gider. Çekilirken boşalan taraf tam alandır; bu yüzden dönüş debisi giriş debisinden büyük çıkar. Yağ yaratılmaz: fark, silindirin içine giren milin kapladığı hacimdir.",
      "formula": "Aₚ = πD²/4; Aₕ = π(D² − d²)/4<br>v = Q/Aᵢ<br>Qₒ = Aₒ·v",
      "formulaNote": "Aᵢ beslenen, Aₒ boşalan alandır. Uzamada Aᵢ = Aₚ, çekilmede Aᵢ = Aₕ. Alan m², debi m³/s ise hız m/s çıkar."
    },
    {
      "heading": "Basıncı pompa değil, yük ister",
      "body": "Sabit hızla giden ideal silindirde net kuvvet sıfırdır: giriş tarafındaki basınç kuvveti, karşı koyan yük ile dönüş tarafındaki <strong>karşı basıncın</strong> kuvvetini tam dengeler. Dönüş basıncını yok sayarsan gereken besleme basıncını küçük bulursun. Kuvvet dengesini hızla çarpınca güç dengesi çıkar: giren hidrolik güç, yüke verilen güç ile dönüş hattında harcanan gücün toplamıdır. Sayfadaki basınçlar tankın 0 bar sayıldığı gösterge basınçlarıdır.",
      "formula": "pᵢAᵢ − pᵦAₒ = F<br>pᵢ = (F + pᵦAₒ)/Aᵢ<br>pᵢQ = Fv + pᵦQₒ",
      "formulaNote": "Pa·m³/s = W. pᵦQₒ gücü dönüş hattında tanka kadar harcanır. Silindir sürtünmesi, kaçak ve atalet bu modelde yoktur."
    },
    {
      "heading": "Pompa: bir turun işi ve iki ayrı kayıp",
      "body": "Sabit deplasmanlı pompa her turda Vd hacmini süpürür; teorik debisi bu hacim ile devir sayısının çarpımıdır. Bir turda Vd hacmini Δp basınç farkına karşı itmek Δp·Vd kadar iş ister; aynı turda şaft τ·2π kadar iş verir. İkisini eşitlersen ideal tork ΔpVd/(2π) çıkar. Gerçek pompada iki ayrı kayıp vardır: <strong>hacim verimi</strong> ηᵥ iç kaçak yüzünden çıkış debisini azaltır, <strong>mekanik verim</strong> ηₘ sürtünme yüzünden gereken torku büyütür. Biri akışı, öbürü torku etkilediği için toplam verim ikisinin çarpımıdır. Sayfada verimler çalışma noktasına atanmış sabit katsayılardır; gerçek bir pompanın basınç ve sıcaklık eğrileri değildir.",
      "formula": "Qₜ = Vd·n/60; Q = ηᵥQₜ<br>τ = ΔpVd/(2πηₘ); ω = 2πn/60<br>Pşaft = τω; Pakış = ΔpQ<br>Pakış/Pşaft = ηᵥηₘ",
      "formulaNote": "Vd m³/tur, n dev/dak. Son oran n > 0 ve Δp > 0 içindir; Δp = 0'da sayfa ideal yüksüz sınırı (Q = Qₜ) kullanır, n = 0'da tork hesaplanmaz."
    },
    {
      "heading": "Kısma: basınç farkı hıza, hız ısıya dönüşür",
      "body": "Dar bir açıklıktan (<strong>orifis</strong>) geçen yağ hızlanır. Bernoulli denklemi basınç düşümünü jetin kinetik enerjisine eşitler: Δp = ½ρu², yani u = √(2Δp/ρ). Jet açıklıktan biraz daha dar aktığı için debi, alan ile bu hızın çarpımından küçüktür; aradaki oranı <strong>boşaltma katsayısı</strong> C<sub>d</sub> taşır. Jetin kinetik enerjisi aşağı akışta girdaplarda ısıya dönüşür, basınç geri gelmez. Debi basınç farkının kareköküyle arttığı için aynı açıklıktan iki kat debi geçirmek dört kat basınç düşümü ister.",
      "formula": "Qvalf = C<sub>d</sub>·a·√[2(ps − pc)/ρ]<br>Pkısma = (ps − pc)·Qvalf",
      "formulaNote": "ps pompa çıkışındaki, pc silindir girişindeki basınç; ps ≥ pc. C<sub>d</sub> = 0,62 ve ρ = 850 kg/m³ sayfanın örnek sabitleridir. Türbülanslı orifis yaklaşımıdır; çok küçük debideki laminer akışı ve kavitasyonu çözmez."
    },
    {
      "heading": "Relief: ya kapalıdır ya basınç ayardadır",
      "body": "<strong>Relief</strong> (basınç emniyet) valfi pompa çıkışına paralel bağlanır ve basıncı pᵣ ayarında sınırlar. Devrenin iki dalı vardır. Pompanın bütün debisi kısmadan pᵣ'yi aşmadan geçebiliyorsa relief kapalıdır: açıklığı küçültmek hızı değiştirmez, yalnız pompa basıncını yükseltir. Gereken basınç pᵣ'ye ulaşınca relief açılır, basınç orada kalır ve fazla debi tanka döner; bu dalda ps ile pc sabit olduğundan silindir debisi açıklıkla doğru orantılıdır. Hangi dalda olduğunu bilmeden \"açıklığı yarıya indirirsem hız yarıya iner\" diyemezsin. Yük, pᵣ'nin karşılayabileceğinden büyükse ileri hız sıfırdır; pompa ise dönmeye ve güç harcamaya devam eder.",
      "formula": "Qpompa = Qvalf + Qrelief<br>ps ≤ pᵣ; Qrelief ≥ 0; (pᵣ − ps)·Qrelief = 0<br>Prelief = ps·Qrelief",
      "formulaNote": "Üçüncü koşul iki dalı tek satırda söyler: çarpanlardan biri sıfır olmalıdır. Relief ideal ve yeterli kapasitede kabul edilir; gerçek açılma eğrisi ve tepki süresi yoktur."
    }
  ],
  "lab": {
    "intro": "Sayfa bir ölçüm düzeneği değil, bir hesap masasıdır: zaman animasyonu ve sensör yoktur, her kaydırıcı hareketinde kuramsal çalışma noktası yeniden çözülür. Karşılaştıracağın iki şey kendi kâğıt-kalem hesabın ile sayfanın kartlarıdır. Üç sekme (<strong>01 · Silindir</strong>, <strong>02 · Pompa</strong>, <strong>03 · Devre</strong>) birbirinden bağımsızdır; her deneye o sekmedeki <strong>Bu deneyi sıfırla</strong> düğmesiyle başla. Kartların altındaki <strong>Güç dağılımı</strong> satırı ile tablo bütçenin kalemlerini watt olarak verir. Sayfa en çok dört ondalık gösterir, binlikleri noktayla, ondalığı virgülle yazar: 4.705,8824 W.",
    "experiments": [
      {
        "title": "Aynı debi, iki farklı hız",
        "predict": "Giriş debisi 12 L/dak'ta kalırken silindiri uzamadan çekilmeye çevirirsen hız, dönüş debisi ve gereken basınç artar mı, azalır mı?",
        "do": "Silindir sekmesini sıfırla: D = 80 mm, d = 40 mm, F = 20 kN, Q = 12 L/dak, pᵦ = 5 bar. Kartları not et. Sonra <strong>Hareket yönü</strong> menüsünde <em>Uzama · tam alan beslenir</em> yerine <em>Çekilme · halka alan beslenir</em> seç.",
        "observe": "Uzamada gerekli giriş basıncı 43,5387 bar, hız 39,7887 mm/s, dönüş debisi 9 L/dak. Çekilmede basınç 59,7183 bar, hız 53,0516 mm/s, dönüş debisi 16 L/dak olur. Giriş hidrolik gücü 870,7747 W'tan 1.194,3663 W'a, dönüşte harcanan güç 75 W'tan 133,3333 W'a çıkar.",
        "explain": "Mil çapı piston çapının yarısıdır, kesiti tam alanın dörtte biri; halka alanı tam alanın 3/4'ü kalır. Aynı debi 3/4 alana girince hız 4/3 katına çıkar (39,79 × 4/3 = 53,05). Aynı 20 kN yükü daha küçük alan taşıdığı, üstelik karşı basınç bu kez büyük alana bastığı için gereken basınç da artar. Kâğıtta dene: (20 000 N + 5×10⁵ Pa × 50,265 cm²)/37,699 cm² = 59,72 bar. Bu sekme, beslemenin gereken basınç ve debiyi verebildiğini varsayar; sınırı üçüncü sekme sınar."
      },
      {
        "title": "Hacim verimi ile mekanik verimi ayır",
        "predict": "Δp ve devir sabitken yalnız hacim verimini 0,90'dan 1'e çıkarırsan gereken şaft torku azalır mı?",
        "do": "Pompa sekmesini sıfırla: Vd = 20 cm³/tur, n = 1500 dev/dak, Δp = 80 bar. Önce <strong>Hacim verimi ηᵥ</strong> kaydırıcısını 0,9'dan 1'e, ardından <strong>Mekanik verim ηₘ</strong> kaydırıcısını 0,85'ten 1'e getir. Her adımda kartları ve Güç dağılımı satırını oku.",
        "observe": "Başlangıçta debi 27 L/dak, tork 29,9586 N·m, şaft gücü 4.705,8824 W; dağılım akış 3.600 W + kaçak 400 W + mekanik 705,8824 W, işletim verimi 76,5 %. ηᵥ = 1 olunca debi 30 L/dak'ya, akış gücü 4.000 W'a çıkar, kaçak sıfırlanır; tork ve şaft gücü kıpırdamaz, verim 85 % olur. ηₘ de 1 olunca tork 25,4648 N·m'ye, şaft gücü 4.000 W'a iner.",
        "explain": "Tork kaçaktan haberdar değildir: pompa her turda aynı Vd hacmini aynı Δp'ye karşı iter, kaçan yağ için de iş yapılmıştır. ηᵥ yalnız o işin ne kadarının çıkışa ulaştığını belirler. İdeal torku elle bul: ΔpVd/(2π) = 8×10⁶ Pa × 20×10⁻⁶ m³ / 6,2832 = 25,46 N·m; 0,85'e bölünce 29,96 N·m. Başlangıçtaki toplam verim 0,90 × 0,85 = 0,765'tir."
      },
      {
        "title": "Yavaşlayan silindir, artan motor gücü",
        "predict": "Kısma açıklığını 10 mm²'den 4 mm²'ye indirirsen silindir hızı ile şaft gücü aynı yönde mi değişir? Açıklığı 10'dan 8'e indirmek hızı düşürür mü?",
        "do": "Devre sekmesini sıfırla (F = 20 kN, a = 10 mm², pᵣ = 80 bar, n = 1500 dev/dak, pᵦ = 5 bar, uzama) ve kartları oku. <strong>Kısma açıklık alanı a</strong> kaydırıcısını önce 8, sonra 7,5 mm²'ye getir; durum satırını izle. Son olarak <strong>Kıs: a = 4 mm²</strong> düğmesine bas ve tablodaki güç kalemlerini karşılaştır.",
        "observe": "a = 10'da pompa basıncı 65,9275 bar, silindir debisi 27 L/dak, relief debisi 0, hız 89,5247 mm/s, şaft gücü 3.878,0896 W. a = 8'de hız aynı kalır, yalnız basınç 78,5212 bar'a çıkar. a = 7,5'te durum satırı \"Relief açık\" olur: basınç 80 bar'da durur, relief debisi 1,158 L/dak, hız 85,6849 mm/s. a = 4'te silindire 13,7824, reliefe 13,2176 L/dak gider; hız 45,6986 mm/s, şaft gücü 4.705,8824 W. Yük gücü 913,9727 W, kısma kaybı 837,5385 W, relief kaybı 1.762,3489 W.",
        "explain": "Yükün istediği basınç hep 43,5387 bar'dır. Relief kapalıyken pompa bütün debiyi kısmadan geçirmek zorundadır; açıklık küçüldükçe basıncı yükselterek bunu başarır ve hız değişmez. Eşik, kısma düşümünün 80 − 43,54 = 36,46 bar'a ulaştığı yerdir: a ≈ 7,84 mm². Altında basınç 80 bar'a kilitlenir, kısmadan geçemeyen debi tanka döner. Motor artık 27 L/dak'nın tamamını 80 bar'a basmaktadır; gücü yükün aldığına değil, pompa basıncına bağlıdır."
      },
      {
        "title": "Üç ayrı durma",
        "predict": "Silindir duruyorsa şaft gücü ve basınç da sıfır mıdır? Her durma aynı fiziksel durum mudur?",
        "do": "Devre sekmesini yeniden sıfırla ve <strong>Yük: F = 50 kN</strong> düğmesine bas. Sonra <strong>Kısma açıklık alanı a</strong> kaydırıcısını 0 mm²'ye, en son <strong>Pompa devri n</strong> kaydırıcısını 0 dev/dak'ya getir. Her adımda durum satırını ve \"—\" yazan satırları oku.",
        "observe": "50 kN'da hız 0 mm/s, relief debisi 27 L/dak, şaft gücü 4.705,8824 W, relief kaybı 3.600 W; silindirin ürettiği net kuvvet 38,3274 kN'da kalır. a = 0'da güç bütçesi değişmez ama silindir giriş basıncı ve net kuvvet \"—\" olur. n = 0'da bütün debiler ve güçler 0, pompa basıncı da \"—\" olur.",
        "explain": "50 kN yük 103,22 bar ister; 80 bar'lık relief en çok 80×10⁵ Pa × 50,265 cm² − 5×10⁵ Pa × 37,699 cm² = 38,33 kN üretebilir. Model burada yükün silindiri geri itmesini ideal bir mekanik durdurucuyla engeller. Kısma kapalıyken silindir akıştan yalıtılmıştır: tutma basıncı bu akış modelinden bulunamaz, sayfa da sıfır yazmak yerine \"—\" koyar. Pompa durunca enerji aktarılmaz; bu, hapsolmuş yağın basıncının sıfır olduğunu göstermez. \"Hesaplanamıyor\" ile \"sıfır\" farklı cevaplardır."
      }
    ]
  },
  "wow": [
    {
      "title": "12 litre girer, 16 litre çıkar",
      "body": "D = 80 mm, d = 40 mm silindir çekilirken halka tarafına 12 L/dak girer, tam alan tarafından 16 L/dak çıkar. Aradaki 4 L/dak, 53,05 mm/s hızla silindire giren 12,57 cm² kesitli milin saniyede kapladığı hacmin tam karşılığıdır. Dönüş hattı ve filtresi bu yüzden pompa debisine göre değil, bu büyük debiye göre düşünülür."
    },
    {
      "title": "Kısınca yavaşlar, pahalılaşır",
      "body": "Sayfanın varsayılan devresinde açıklığı 10'dan 4 mm²'ye indirmek hızı %49 düşürür, şaft gücünü %21 artırır. Şaftın 4.705,9 W'ından yüke yalnız 914,0 W ulaşır: her beş watt'tan biri bile değil. Relief tek başına 1.762,3 W harcar. Yüzdeler bu devreye ve bu çalışma noktasına aittir."
    },
    {
      "title": "Kımıldamayan yük, 3,6 kW'lık ısıtıcı",
      "body": "50 kN yük silindiri durdurduğunda 27 L/dak yağın tamamı 80 bar'lık relieften tanka döner: 3.600 W, hiçbir iş yapmadan ısıya gider. Basınç düşümü yağı ΔT = Δp/(ρc) kadar ısıtır; ρ = 850 kg/m³ ve madeni yağlar için tipik c ≈ 1,9 kJ/(kg·K) alınırsa her geçişte yaklaşık 5 K. Sayfa sıcaklığı hesaplamaz; bu, aynı enerji bütçesinin bir adım ötesidir."
    }
  ],
  "worked": {
    "title": "4 mm² kısma ile bütün güç bütçesi",
    "prompt": "D = 80 mm, d = 40 mm silindir 20 kN yükü uzayarak itiyor. Dönüş karşı basıncı pᵦ = 5 bar, relief ayarı pᵣ = 80 bar, kısma açıklığı a = 4 mm² (C<sub>d</sub> = 0,62; ρ = 850 kg/m³). Pompa: Vd = 20 cm³/tur, n = 1500 dev/dak, ηᵥ = 0,90, ηₘ = 0,85. Silindir hızını, relief debisini ve şaft gücünün kalemlerini bul. (Sayfada: Devre sekmesini sıfırla, Kıs: a = 4 mm² düğmesine bas.)",
    "steps": [
      "Alanlar: Aᵢ = π(0,08 m)²/4 = 5,026548×10⁻³ m²; Aₒ = π[(0,08 m)² − (0,04 m)²]/4 = 3,769911×10⁻³ m². Yükün istediği basınç: pc = (20 000 N + 5×10⁵ Pa × 3,769911×10⁻³ m²)/(5,026548×10⁻³ m²) = 4,353874×10⁶ Pa = 43,5387 bar.",
      "Pompa debisi: Qp = 0,90 × (20×10⁻⁶ m³)(1500/60 s⁻¹) = 4,5×10⁻⁴ m³/s = 27 L/dak. Dal seçimi: bu debinin tamamı 4 mm²'den geçseydi düşüm (ρ/2)[Qp/(C<sub>d</sub>a)]² = 425 kg/m³ × (181,45 m/s)² = 139,93 bar olurdu. 43,54 + 139,93 = 183,47 bar, 80 bar'ı aşar: relief açıktır, ps = 80 bar.",
      "Kısmadan geçen debi: Qvalf = 0,62 × 4×10⁻⁶ m² × √[2 × (8×10⁶ − 4,353874×10⁶) Pa / 850 kg/m³] = 2,48×10⁻⁶ m² × 92,624 m/s = 2,297064×10⁻⁴ m³/s = 13,7824 L/dak. Qrelief = 27 − 13,7824 = 13,2176 L/dak. Hız v = Qvalf/Aᵢ = 0,0456986 m/s = 45,6986 mm/s.",
      "Hidrolik kalemler: yük Fv = 913,973 W; kısma (ps − pc)Qvalf = 837,539 W; relief ps·Qrelief = 1.762,349 W; dönüş pᵦAₒv = 86,140 W. Toplam 3.600 W = ps·Qp: pompanın akışa verdiği gücün tamamı.",
      "Pompa kalemleri: Qₜ = 30 L/dak = 5×10⁻⁴ m³/s. Pşaft = ps·Qₜ/ηₘ = 4.000 W/0,85 = 4.705,882 W. Kaçak ps(Qₜ − Qp) = 400 W; mekanik kayıp 4.705,882 − 4.000 = 705,882 W. Sağlama: 913,973 + 837,539 + 1.762,349 + 86,140 + 400 + 705,882 = 4.705,883 W; son basamaktaki fark yuvarlamadır."
    ],
    "result": "Hız 45,6986 mm/s, relief debisi 13,2176 L/dak. Şaftın 4,706 kW'ının yalnız 0,914 kW'ı (%19,4) yüke ulaşır; kalan %80,6 kısma, relief, dönüş ve pompa kayıplarında ısıya dönüşür."
  },
  "misconceptions": [
    {
      "myth": "Pompa basınç üretir; yük ne olursa olsun aynı basıncı verir.",
      "truth": "Sabit deplasmanlı pompa debi sağlar. Basınç, o debinin karşılaştığı dirençten doğar: yük, kısma ve dönüş hattı. Pompa sekmesindeki Δp bu yüzden \"Devrenin dayattığı Δp\" diye adlandırılır; Devre sekmesinde ise girdi değil, çözümün sonucudur."
    },
    {
      "myth": "Valfi kısıp silindiri yavaşlatmak enerji tasarrufudur.",
      "truth": "Sabit debili pompada kısmadan geçemeyen yağ relief üzerinden tanka döner ve pompa basıncı ayar değerine çıkar. Sayfadaki devrede a = 4 mm² iken yük gücü 1.790 W'tan 914 W'a inerken şaft gücü 3.878 W'tan 4.706 W'a çıkar."
    },
    {
      "myth": "Dönüş debisi giriş debisinden büyükse bir yerden enerji kazanılıyordur.",
      "truth": "Debi yalnızca birim zamandaki hacimdir; güç için basınçla çarpmak gerekir. Çekilmede 16 L/dak dönüş 5 bar'dadır (133 W), 12 L/dak giriş ise 59,7 bar'da (1.194 W)."
    },
    {
      "myth": "Hız sıfırsa basınçlar ve güçler de sıfırdır.",
      "truth": "Relieften geçen akış hiçbir şeyi hareket ettirmeden güç harcar: duran 50 kN yükte şaft 4.706 W çeker. Kapalı bir silindirin basıncı ise akış denklemlerinden hiç bulunamayabilir; \"hesaplanamıyor\" ile \"sıfır\" aynı şey değildir."
    }
  ],
  "glossary": [
    {
      "term": "Deplasman",
      "definition": "Pompanın bir turda süpürdüğü teorik hacim (Vd); sayfada cm³/tur olarak girilir."
    },
    {
      "term": "Debi",
      "definition": "Birim zamanda geçen hacim (Q); 1 L/dak = 10⁻³/60 m³/s."
    },
    {
      "term": "Halka alanı",
      "definition": "Pistonun mil tarafındaki etkin alanı: tam piston alanından mil kesitinin çıkarılmasıyla kalan alan."
    },
    {
      "term": "Karşı basınç",
      "definition": "Silindirin boşalan tarafında tank basıncının üzerinde kalan ve net kuvveti azaltan basınç."
    },
    {
      "term": "Relief valfi",
      "definition": "Basınç emniyet valfi; pompa basıncı ayar değerine ulaştığında fazla debiyi tanka yönlendirerek basıncı sınırlar."
    },
    {
      "term": "Orifis",
      "definition": "Akışın geçtiği dar açıklık; debisi açıklık alanıyla ve basınç farkının kareköküyle orantılıdır."
    },
    {
      "term": "Boşaltma katsayısı",
      "definition": "Gerçek orifis debisinin ideal (kayıpsız, tam kesitli) debiye oranı (C<sub>d</sub>); sayfada 0,62 alınır."
    },
    {
      "term": "Çalışma noktası",
      "definition": "Kaynak, akış yolu ve yükün denklemlerini birlikte sağlayan kararlı basınç–debi çifti."
    }
  ],
  "bridge": {
    "heading": "Üniversiteye köprü",
    "body": [
      "<strong>Akışkanlar Mekaniği</strong> ile <strong>Termodinamik</strong> derslerinde bu sayfanın yaptığı işe kontrol hacmi analizi denir: bir sınır çizer, içeri giren ve çıkan kütleyi ve enerjiyi sayarsın. Silindirde süreklilik Q = Aᵢv, kuvvet dengesi pᵢAᵢ − pᵦAₒ = F verir; ikincisini v ile çarpınca pᵢQ = Fv + pᵦQₒ çıkar. Sınırı pompayı da içine alacak kadar genişletince şaft gücü, yük gücü ile bütün kayıpların toplamına eşitlenir. Kararlı durumda kayıp dediğimiz güç yok olmaz, yağın iç enerjisine geçer; sıcaklığın nerede dengeleneceği soğutucuya ve tankın ısı atma hızına bağlıdır, bu da ısı transferi dersinin konusudur.",
      "<strong>Sayısal Yöntemler</strong> açısından devre, doğrusal olmayan bir denklem ile bir dal seçiminden oluşur. Süreklilik Qp = Qvalf + Qrelief doğrusaldır, orifis bağıntısı basıncın karekökünü içerir. İdeal relief ise bir <strong>tamamlayıcılık koşuludur</strong>: ps ≤ pᵣ, Qrelief ≥ 0 ve (pᵣ − ps)·Qrelief = 0. Çözüm yolu çözümlü örnekteki gibidir: bir dalı varsay, çöz, eşitsizlikleri sına, tutmuyorsa öbür dala geç. Aynı yapı diyotlu devrelerde, temas mekaniğinde ve optimizasyonun KKT koşullarında karşına çıkar. <strong>Sistem Dinamiği ve Kontrol</strong> dersleri bu resme zamanı ekler: yağın sıkışabilirliği ve yükün ataleti bir yay-kütle sistemi kurar, valf dinamiği de sönümü ve kararlılığı belirler. Bu sayfa yalnız o hareketin vardığı kararlı noktayı gösterir."
    ],
    "topics": [
      "Süreklilik denklemi",
      "Kontrol hacmi ve enerji denklemi",
      "Bernoulli denklemi ve orifis akışı",
      "Pozitif deplasmanlı pompalar",
      "Tamamlayıcılık koşulları ve parçalı modeller",
      "Akışkan sıkışabilirliği ve hidrolik rezonans"
    ]
  },
  "quiz": [
    {
      "question": "D = 80 mm, d = 40 mm silindirde giriş debisi aynı kalırsa çekilme hızı uzama hızının kaç katıdır?",
      "options": [
        "3/4 katı",
        "4/3 katı",
        "2 katı",
        "Aynıdır"
      ],
      "answer": 1,
      "explanation": "Mil çapı yarı olduğundan mil kesiti tam alanın 1/4'üdür; halka alanı 3/4 kalır. v = Q/A olduğundan hız oranı 1/(3/4) = 4/3'tür. \"2 katı\" çap oranını alan oranı sanmanın sonucudur."
    },
    {
      "question": "Devre sekmesinde a = 4 mm² iken relief açık ve hız 45,7 mm/s. Başka hiçbir şeye dokunmadan açıklığı 2 mm²'ye indirirsen hız ve şaft gücü ne olur?",
      "options": [
        "Hız aynı kalır, şaft gücü artar",
        "Hız yaklaşık 32 mm/s'ye iner, şaft gücü azalır",
        "Hız yaklaşık 22,8 mm/s'ye iner, şaft gücü aynı kalır",
        "Hız sıfırlanır, şaft gücü sıfırlanır"
      ],
      "answer": 2,
      "explanation": "Relief açıkken pompa basıncı 80 bar'da, silindir basıncı 43,54 bar'da sabittir; orifis debisi yalnız açıklıkla orantılı kalır ve hız yarıya iner (22,85 mm/s). Pompa aynı debiyi aynı basınca bastığı için şaft gücü 4.705,9 W'ta kalır; yükten eksilen güç reliefe geçer. İlk şık relief kapalı dalın davranışıdır."
    },
    {
      "question": "27 L/dak yağ, 80 bar'a ayarlı relief üzerinden tanka dönüyor. Valfte ısıya dönüşen güç kaçtır?",
      "options": [
        "360 W",
        "2.160 W",
        "3.600 W",
        "36.000 W"
      ],
      "answer": 2,
      "explanation": "SI'ya çevir: 80 bar = 8×10⁶ Pa, 27 L/dak = 4,5×10⁻⁴ m³/s. Çarpım 3.600 W'tır. Pratik kısayol: bar × L/dak ÷ 600 = kW; 80 × 27/600 = 3,6 kW. 2.160, bar ile L/dak'yı dönüştürmeden çarpınca çıkan sayıdır; birimi watt değildir."
    }
  ],
  "next": [
    {
      "href": "basinc.html",
      "title": "Basınç ve Hidrolik Pres",
      "why": "Pascal ilkesini ve kuvvetin alan oranıyla büyümesini, buradaki güç hesabının durağan ön koşulu olarak gör."
    },
    {
      "href": "akiskanlar-mekanigi.html",
      "title": "Akışkanlar Mekaniği",
      "why": "Bu sayfanın yok saydığı boru kayıplarını ve pompa eğrisi ile sistem eğrisinin kesiştiği çalışma noktasını incele."
    },
    {
      "href": "basit-makineler.html",
      "title": "Basit Makineler: Kuvvet, Yol ve İş",
      "why": "Kuvvet kazancının bedelini yolla ödeyen kaldıraç ile alan oranıyla ödeyen hidrolik silindiri karşılaştır."
    },
    {
      "href": "termodinamik.html",
      "title": "Termodinamik",
      "why": "Kısma ve reliefte \"kaybolan\" gücün iç enerjiye dönüşmesini birinci yasa ile izle."
    }
  ],
  "sources": [
    {
      "title": "Enerpac · Basic Hydraulics",
      "url": "https://www.enerpac.com/en-US/resources/education/basic-hydraulics",
      "note": "Üreticinin eğitim sayfası: Pascal yasası, kuvvet = basınç × etkin alan, yağ hacmi = etkin alan × strok."
    },
    {
      "title": "20-sim · Orifice (model belgesi)",
      "url": "https://www.20sim.com/webhelp/library_iconic_diagrams_hydraulics_restrictions_orifice.php",
      "note": "C<sub>d</sub>·A·√(2Δp/ρ) orifis bağıntısı. Belgedeki ek laminer kaçak terimi ve buhar basıncı sınırı bu sayfanın modelinde yoktur."
    },
    {
      "title": "Parker · eREADY Pumps kataloğu (MSG30-8253/UK)",
      "url": "https://www.parker.com/content/dam/Parker-com/Literature/PMDE/Catalogs/eready/MSG30-8253-UK.pdf",
      "note": "Pompa debisi, torku ve verimleri için üreticinin temel bağıntıları. Kataloglar bağıntıları bar, cm³ ve L/dak gibi pratik birimler için dönüşüm katsayılarıyla yazar; sayfa SI birimleriyle ve 2π ile hesaplar."
    },
    {
      "title": "Wikipedia · Hydraulic press",
      "url": "https://en.wikipedia.org/wiki/Hydraulic_press",
      "note": "Joseph Bramah'ın 1795 patenti ve presin Pascal ilkesine dayanan çalışma biçimi."
    }
  ],
  "revision": "Kasım 2026"
};
