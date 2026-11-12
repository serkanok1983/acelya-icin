window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kepler-yasalari"] = {
  slug: "kepler-yasalari",
  title: "Kepler Yasaları: Sekiz Yay Dakikalık İnat",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Newton'un ters kare çekimini adım adım sayısal olarak çöz, Kepler'in üç yasasını çıkan yoldan ölç: elips, eşit alanlar, T² ∝ a³ ve iki cismin ortak kütle merkezi.",
  hook: "Ocak başında Dünya, Güneş'e yılın en yakın noktasındadır: temmuzdakinden yaklaşık 5 milyon kilometre daha yakın. Yine de o günlerde Erzurum'da kar yağar ve Dünya, temmuzdakinden saniyede bir kilometre daha hızlı koşar. Gezegeni kim hızlandırıp yavaşlatıyor ve bunu teleskopsuz bir gökyüzü kaydından kim çıkardı?",
  bigIdea:
    "Kepler'in üç yasası ayrı ayrı kurallar değil, tek bir ters kare kuvvetin sonuçlarıdır: enerji yörüngenin boyunu, açısal momentum biçimini ve alan tarama hızını belirler; bir turun süresi yalnızca yarı büyük eksene ve merkezdeki kütleye bağlıdır.",
  story: [
    "Teleskop icat edilmeden önceki son büyük gözlemci, Danimarkalı soylu <strong>Tycho Brahe</strong>'ydi. 1576'dan sonra Ven adasında kurdurduğu Uraniborg gözlemevinde, dev duvar çeyrek daireleri ve sekstantlarla yirmi yılı aşkın süre gezegenlerin konumunu ölçtü. Ölçümleri bir-iki yay dakikası duyarlıktaydı; karşılaştırma için dolunayın gökteki genişliği yaklaşık otuz yay dakikasıdır. 1599'da İmparator II. Rudolf'un sarayına, Prag'a taşındı ve 1600'de yanına genç bir matematikçi aldı: <strong>Johannes Kepler</strong>. Tycho verilerini titizlikle koruyordu; Kepler'e çözmesi için tek bir gezegen verdi: yörüngesi, iyi gözlenebilen gezegenler arasında çemberden en belirgin biçimde sapan Mars. Tycho Ekim 1601'de öldü; Kepler imparatorluk matematikçisi oldu ve kayıtların tamamına ulaştı.",
    "Kepler'in işi sekiz günde bitireceğine dair iddiaya girdiği anlatılır; kendi deyişiyle 'Mars'la savaşı' yıllar sürdü. Önce çemberler ve eşit hız noktası (ekuant) üzerine kurulu, Tycho'nun karşı konum gözlemlerine iki yay dakikası içinde uyan bir model kurdu. Ama başka gözlemlerle arasında <strong>sekiz yay dakikalık</strong>, yani dolunayın dörtte biri kadar bir fark kaldı. Tycho'dan önceki gözlemlerle böyle bir fark ölçüm hatasının içinde kaybolurdu. Kepler farkı görmezden gelmeyi reddetti ve 1609'da yayımlanan <em>Astronomia Nova</em>'da (Yeni Astronomi), yalnızca bu sekiz dakikanın bütün astronominin yenilenmesine yol açtığını yazdı. Sonuç iki yasaydı ve tuhaf bir sırayla bulunmuştu: Kepler önce eşit alanlar kuralına, ancak daha sonra yörüngenin elips olduğuna ulaştı.",
    "Üçüncü yasa bambaşka bir kitapta, gezegen hareketlerini müzik aralıklarıyla ilişkilendiren <em>Harmonices Mundi</em>'de (Dünyanın Uyumu, 1619) yer aldı: Kepler, dolanma sürelerinin karesinin Güneş'e ortalama uzaklıkların küpüyle orantılı olduğunu 1618'de bulmuştu. Yasalar doğruydu ama arkalarındaki fizik değil: Kepler gezegenleri Güneş'ten yayılan, mıknatısa benzer bir itici gücün sürüklediğini düşünüyordu. Açıklama Newton'dan geldi. Anlatılana göre 1684'te Edmond Halley, Newton'a ters kare bir çekim altında gezegenin hangi eğriyi çizeceğini sordu; Newton 'elips' dedi ve bunu hesapladığını söyledi. Bu hesap 1687'de <em>Principia</em>'ya dönüştü: üç yasa artık gözlemden çıkarılmış kurallar değil, hareket yasaları ile evrensel kütleçekimin sonuçlarıydı. Newton üçüncü yasadaki sabitin merkezdeki kütleye bağlı olduğunu da gösterdi ve bunu, uyduları olan gezegenleri tartmak için kullandı. Bu sayfa aynı yolu bir bilgisayarla yürür: yalnız kuvvet yasasını verir, yasaları çıkan yoldan ölçer.",
    "Hikâyenin bir de efsane tarafı var. Kepler'in kaydına göre Tycho, Prag'daki bir ziyafette görgü kuralları yüzünden sofradan kalkmadı; aynı gece idrarını yapamaz hâle geldi ve on bir gün sonra, 24 Ekim 1601'de öldü. 'Mesanesi patladı' anlatısı ise sonradan yerleşmiş, kanıtlanmamış bir yorumdur. Daha sonra Tycho'nun cıvayla zehirlendiği, hatta Kepler'in onu verilere ulaşmak için öldürdüğü ileri sürüldü. 2010'da mezarı açılıp kemik ve saç örnekleri incelendi; araştırmacılar öldürücü düzeyde cıva bulmadı. Elimizdeki kanıt, cinayet suçlamasını desteklemiyor.",
  ],
  core: [
    {
      heading: "Birinci yasa: Güneş ortada değil, odakta",
      body: "Bir ipin iki ucunu iki raptiyeye bağla, ipi kalemle gergin tutup dolaş: çizdiğin eğri bir elipstir. Raptiyeler elipsin <strong>odaklarıdır</strong>; eğrinin her noktasından iki odağa uzaklıkların toplamı ipin boyuna, 2a'ya eşittir. Güneş bir odakta durur, öteki odak boştur. Basıklığı <strong>dışmerkezlik</strong> (eksantriklik, e) ölçer: e = 0 çemberdir, e 1'e yaklaştıkça elips incelir. Sayfanın ilk sekmesinde elips çizilmez; gezegen fırlatılır ve yol integre edilir. Sonra yolun en küçük ve en büyük uzaklığı ölçülür, a ile e bunlardan hesaplanır. Varsayılan <em>Elips</em> fırlatmasında r<sub>min</sub> = 1,0000 AU, r<sub>max</sub> = 2,5714 AU çıkar; Güneş elipsin merkezinden a·e = 0,7857 AU uzakta durur, boş odak ise tuvalde küçük bir halkadır.",
      formula:
        "a = (r<sub>min</sub> + r<sub>max</sub>)/2 · e = (r<sub>max</sub> − r<sub>min</sub>)/(r<sub>max</sub> + r<sub>min</sub>) · b = a√(1 − e²)",
      formulaNote:
        "Sayfanın ölçtüğü tam olarak budur: (1 + 2,5714)/2 = 1,7857 AU ve 1,5714/3,5714 = 0,4400.",
    },
    {
      heading: "Enerji boyu, açısal momentum biçimi seçer",
      body: "Güneş'e r uzaklıkta v hızıyla fırlatılan bir cismin kütle başına enerjisi <strong>ε = v²/2 − GM/r</strong>, kütle başına açısal momentumu <strong>h = r·v·sin α</strong>'dır (α, hızın Güneş–gezegen doğrultusuyla açısı). İkisi de yol boyunca korunur ve yörüngeyi tümüyle belirler. ε < 0 ise cisim bağlıdır ve a = −GM/(2ε) olur; ε = 0 parabol, ε > 0 hiperboldür. Çember hızı v<sub>ç</sub> = √(GM/r) iken ε = 0 koşulu v = √2·v<sub>ç</sub> verir: <strong>kaçış hızı</strong>. Sayfa hızı bu yüzden (v₀/v<sub>ç</sub>)² olarak seçtirir: 2'nin altı elips, tam 2 parabol, üstü hiperbol. Enerjiyi a cinsinden yazınca <strong>vis-viva</strong> denklemi çıkar: v² = GM(2/r − 1/a). Biçimi ise ters kare kuvvete özgü bir korunan vektör verir: günberiyi gösteren, boyu e olan dışmerkezlik vektörü (Laplace–Runge–Lenz vektörüyle orantılıdır). Sayfanın 'Kuram' sütunu e'yi tam bu vektörden hesaplar.",
      formula:
        "a = −GM/(2ε) · e = √(1 + 2εh²/(GM)²) · <span class=vec>e</span> = [(v² − GM/r)<span class=vec>r</span> − (<span class=vec>r</span>·<span class=vec>v</span>)<span class=vec>v</span>]/GM",
      formulaNote:
        "Birimler AU, yıl ve Güneş kütlesi; GM = 4π² ≈ 39,478 AU³/yıl². Varsayılan elipste ε = −11,054 AU²/yıl², buradan a = 39,478/22,108 = 1,7857 AU.",
    },
    {
      heading: "İkinci yasa: eşit zamanda eşit alan",
      body: "Güneş'ten gezegene çekilen çizgi eşit sürelerde eşit alanlar tarar. Güneş'e yakınken çizgi kısadır; aynı alanı taramak için gezegenin daha uzun bir yay koşması, yani hızlanması gerekir. Kepler bunu gözlemden çıkardı, nedeni Newton'la anlaşıldı. Türetmesi iki satırdır: <span class=vec>h</span> = <span class=vec>r</span> × <span class=vec>v</span> ise d<span class=vec>h</span>/dt = <span class=vec>v</span> × <span class=vec>v</span> + <span class=vec>r</span> × <span class=vec>a</span>. İlk terim sıfırdır; ivme <span class=vec>r</span>'ye paraleldir, o yüzden ikincisi de sıfırdır. Küçük bir dt'de taranan üçgenin alanı ½|<span class=vec>r</span> × <span class=vec>v</span>|dt olduğundan alan tarama hızı h/2'de sabit kalır. Bu yüzden ikinci yasa yalnız kütleçekiminde değil, <strong>her merkezî kuvvette</strong> geçerlidir; ters kare olmak gerekmez.",
      formula:
        "dA/dt = h/2 = sabit ⇒ r<sub>p</sub>·v<sub>p</sub> = r<sub>a</sub>·v<sub>a</sub> ⇒ v<sub>p</sub>/v<sub>a</sub> = (1 + e)/(1 − e)",
      formulaNote:
        "Uç noktalarda hız yarıçapa diktir. İkinci sekmenin varsayılanında (a = 1 AU, e = 0,6) 59,57 km/s / 14,89 km/s = 4,0000 = 1,6/0,4.",
    },
    {
      heading: "Üçüncü yasa: süreyi boyut ve merkez kütlesi belirler",
      body: "Çember yörüngede çekim merkezcil kuvveti sağlar: GM/a² = v²/a ve v = 2πa/T. Buradan T² = 4π²a³/(GM) çıkar; elipste de aynı bağıntı a ile geçerlidir. Formülde e yoktur: aynı a'lı bir çember ile basık bir elips aynı sürede dolanılır. Sayfanın birim seçimi G = 4π² AU³/(M☉·yıl²) olduğundan T²/a³ = 1/M olur (yıl²/AU³, M güneş kütlesi cinsinden). İki yanın logaritmasını alınca log T = (3/2)·log a + sabit: log–log grafikte <strong>eğimi 3/2 olan bir doğru</strong>. Merkez kütlesi doğruyu yukarı ya da aşağı kaydırır, eğimi değiştirmez. Newton'un kesin biçiminde M yerine M + m gelir; bu yüzden bir uydunun ya da çift yıldızın periyodu ile yörünge boyutu, kütleyi tartmanın yoludur.",
      formula: "T² = 4π²a³ / (G(M + m)) · log T = (3/2)·log a − ½·log(G(M + m)/4π²)",
      formulaNote:
        "m ≪ M ise M + m ≈ M ve Kepler'in 'her gezegende aynı oran' kuralı çıkar. Jüpiter'in kütlesi Güneş'inkinin yaklaşık binde biri olduğundan periyottaki düzeltme on binde beş civarındadır.",
    },
    {
      heading: "Yasaları ölçmek: sayısal integrasyon",
      body: "Sayfa hiçbir yasayı formül olarak kullanmaz; yalnız <span class=vec>a</span> = −GM<span class=vec>r</span>/r³ diferansiyel denklemini <strong>RK4</strong> (dördüncü mertebe Runge–Kutta) ile adım adım çözer. Adım her an η·r/√(v² + GM/r) seçilir: Güneş'e yaklaşınca küçülür, çünkü hareket orada hızlanır. Bir tur, gezegenin açısı 2π artınca biter; bitiş anı ve dönüm noktaları (radyal hızın sıfır olduğu anlar) adımın içinde bir kök bulma yöntemiyle yakalanır. Her ölçümün yanında ε ve h'den gelen kuram değeri ve farkı yazar. Fark, fiziğin değil integrasyonun kalitesini ölçer: ince adımda (η = 0,01) varsayılan elips 933 adımda kapanır, enerji sapması 1,1·10⁻¹⁰'dur; kaba adımda (η = 0,2) 46 adım yeter ama periyot farkı −3,8·10⁻⁵'e çıkar. RK4'ün hatası kabaca adımın dördüncü kuvvetiyle büyür.",
      formula: "d<span class=vec>r</span>/dt = <span class=vec>v</span> · d<span class=vec>v</span>/dt = −GM<span class=vec>r</span>/r³ · Δt = η·r/√(v² + GM/r)",
      formulaNote:
        "Model iki nokta kütleden ibarettir: gezegenlerin birbirini çekmesi, Güneş'in basıklığı ve genel görelilik yoktur.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var ve her biri bir yasayı ölçer: <strong>1 · Birinci yasa: elips</strong>, <strong>2 · İkinci yasa: eşit alanlar</strong>, <strong>3 · Üçüncü yasa: T² ∝ a³</strong> ve <strong>4 · İki cisim ve kütle merkezi</strong>. Birimler AU, yıl ve Güneş kütlesidir; hızlar 1 AU/yıl = 4,74047 km/s ile km/s'ye çevrilir. Sayfanın yılı 365,25 gündür; 1 AU'luk çember yörüngede bir turun gerçek süresi ise 365,2569 gün. Bu yüzden 1 AU'luk çember hızı 29,7853 km/s, yani 29,79 görünür; gerçek değer 29,7847 km/s'dir (29,78). Fark yüz binde iki: yalnız yuvarlamanın sınırında görünür. İlk sekmede <strong>Güneş'e uzaklık r₀</strong>, <strong>Hız oranının karesi (v₀/v_ç)²</strong>, <strong>Fırlatma açısı</strong> kaydırıcıları ve <strong>İntegrasyon adımı η</strong> menüsü vardır; tablo her nicelik için Ölçülen, Kuram ve Fark sütunlarını yan yana yazar. Hazır düğmeler yalnız kendi değerlerini değiştirmez, sekmenin öteki denetimlerini de varsayılana döndürür. Her sekmede <strong>Duraklat</strong> ve <strong>Sıfırla</strong> bulunur; klavyede Boşluk duraklatır, R etkin sekmeyi sıfırlar. Animasyon önceden integre edilmiş yolun yeniden oynatılmasıdır, ölçümler kare hızına bağlı değildir.",
    experiments: [
      {
        title: "Kaçış hızının sınırında",
        predict:
          "Gezegeni 1 AU'dan teğet fırlatıyorsun. Hızın karesini çember hızının karesinin 1,44 katından 2 katına çıkarırsan yörünge ne olur: daha büyük bir elips mi, yoksa bambaşka bir eğri mi? 2,56 katında?",
        do: "<strong>1 · Birinci yasa: elips</strong> sekmesinde sırayla <strong>Elips</strong>, <strong>Parabol (v_k)</strong> ve <strong>Hiperbol</strong> düğmelerine bas. Her seferinde tablodaki dışmerkezlik ve periyot satırlarını, <strong>Özgül enerji</strong> kartını ve tablonun üstündeki durum satırını oku.",
        observe:
          "Elipste e = 0,4400, T = 2,3863 yıl, ε = −11,054 AU²/yıl². Parabolde v₀ = 42,12 km/s, e = 1,0000, ε = 0,000 ve periyot 'yok (kapanmaz)'; integrasyon r = 30,04 AU'da durur. Hiperbolde e = 1,5600, ε = +11,054 ve durum satırı çok uzaktaki hızı 22,29 km/s olarak verir.",
        explain:
          "Yörüngenin türünü ε'nin işareti belirler. (v₀/v<sub>ç</sub>)² = 2 iken v₀²/2 tam GM/r₀'a eşittir, ε = 0 olur: 42,12 = √2 × 29,79. Hiperbolde ε pozitiftir; sonsuzda potansiyel enerji sıfıra iner ve hız √(2ε)'a yaklaşır: √(2 × 11,054) = 4,702 AU/yıl, yani 22,29 km/s. Elips ve hiperbolde ε'nin büyüklüğünün aynı çıkması tesadüf değil: q = 1,44 ve q = 2,56, 2'den eşit uzaklıktadır.",
      },
      {
        title: "Eşit alanlar ve ölçme hatası",
        predict:
          "e = 0,6'lık bir yörüngeyi eşit süreli 12 dilime böldün. Dilim alanlarını tek bir üçgenle ölçersen dilimler hâlâ eşit görünür mü? Görünmezse, hangi dilim en çok alan kaybeder?",
        do: "<strong>2 · İkinci yasa: eşit alanlar</strong> sekmesinde varsayılanla başla. <strong>Dilim alanı</strong>, <strong>Dilimler arası yayılım</strong>, günberi, günöte ve <strong>Hız oranı</strong> kartlarını oku. Sonra <strong>Kaba üçgenler k = 1</strong> düğmesine bas; durum satırını ve h kartını yeniden oku.",
        observe:
          "Varsayılanda (dilim başına 1000 üçgen) dilim alanı 0,20944 / 0,20944 AU², yayılım 3,8·10⁻⁷. Günberide 0,4000 AU · 59,57 km/s, günötede 1,6000 AU · 14,89 km/s; oranlar 4,0000 / 4,0000. k = 1'de yayılım 0,358'e çıkar: en büyük dilim 6. (0,20707 AU²), en küçük 1. (0,13811 AU²). Durum satırı ikiz ölçümü (dilim başına 2 üçgen) 9,4·10⁻² olarak verir, oran 3,81; açısal momentumun yol boyunca sapması ise 1,8·10⁻¹².",
        explain:
          "Fizik değişmedi; h hâlâ 10⁻¹²'den iyi sabittir. Değişen ölçme yöntemidir: tek üçgen, yayın yerine kirişi kullanır ve eğrinin en çok büküldüğü günberi dilimi (1. dilim) en çok alanı kaybeder. Üçgen sayısını ikiye katlayınca hatanın yaklaşık dörtte birine inmesi (3,81 ≈ 4), hatanın k⁻² ile azalan kiriş hatası olduğunu gösterir.",
      },
      {
        title: "Kütle doğruyu kaydırır, eğimi değil",
        predict:
          "Merkezdeki yıldızın kütlesini 4 katına çıkarırsan a = 0,5 AU'daki gezegenin turu ne olur? log T – log a doğrusunun eğimi değişir mi?",
        do: "<strong>3 · Üçüncü yasa: T² ∝ a³</strong> sekmesinde varsayılanı oku: <strong>Uydurulan eğim</strong>, <strong>T²/a³ ortalaması</strong> ve beş yörüngenin tablosu. Sonra <strong>M = 4 M☉</strong>, ardından <strong>e = 0,6</strong> düğmesine bas. NASA kartlarına ve gezegen tablosuna da bak.",
        observe:
          "Varsayılanda eğim 1,500000, T²/a³ = 1,000000 yıl²/AU³; T'ler 0,35355; 0,71554; 1,48223; 2,82843 ve 5,72433 yıl. M = 4 M☉'de T²/a³ = 0,250000, ilk T 0,17678 yıl, eğim yine 1,500000. e = 0,6'da T'ler e = 0 ile aynıdır. NASA'nın sekiz gezegeni için eğim 1,4990 (R² = 0,999999); T²/a³ 0,9878 ile 1,0027 arasında. Merkür'den Mars'a dört gezegen 1,0000 ile 0,9998 arasında, Jüpiter 0,9985.",
        explain:
          "T²/a³ = 1/M olduğundan kütle dört katına çıkınca bütün periyotlar yarıya iner (√4 = 2); doğru aşağı kayar ama eğimi 3/2 kalır. Dışmerkezlik yasada yoktur. Gerçek gezegende M yerine M☉ + m gelir: Jüpiter'in kendi kütlesi beklenen değeri 0,9991'e indirir. Tablo yıldızlara göre (yıldızıl) dönemi kullanır; ilkbahar noktasına göre (tropik) dönem Neptün'ü % 1,3 daha aşağı çekerdi. Satürn, Uranüs ve Neptün'de kalan yüzde birlik fark bilgi sayfasının yarı büyük ekseninden gelir: JPL'nin 1800–2050 ortalama a değerleriyle hepsi 1/(1 + m/M☉) değerine binde 1,2 içinde oturur.",
      },
      {
        title: "İkiz yıldızlar daha hızlı döner",
        predict:
          "1 M☉'lik bir yıldızın yanına 1 AU'luk yörüngede ikinci bir cisim koy. İkinci cismin kütlesi büyüdükçe periyot uzar mı, kısalır mı? Eşit kütlelerde ne olur?",
        do: "<strong>4 · İki cisim ve kütle merkezi</strong> sekmesinde varsayılanla (m = 0,3 M☉) başla. Tablodaki periyot ve yarı büyük eksen satırlarını, <strong>Yalnız M ile hesaplanan T</strong> ve <strong>a_M/a_m</strong> kartlarını oku. Sonra <strong>İkiz yıldız m = 1</strong> ve <strong>Küçük kütle m = 0,01</strong> düğmelerine bas.",
        observe:
          "m = 0,3'te ölçülen T = 0,87706 yıl; Kepler'in yalnız M ile verdiği değer 1,00000 yıl (fark +0,140). a_M = 0,23077 AU, a_m = 0,76923 AU, oranları 0,30000. m = 1'de T = 0,70711 yıl ve a_M = a_m = 0,50000 AU. m = 0,01'de T = 0,99504 yıl, a_M = 0,00990 AU.",
        explain:
          "Bağıl vektör tek cisim denklemine uyar, yalnız GM yerine G(M + m) gelir: T = 1/√1,3 = 0,87706 ve 1/√2 = 0,70711. Kütle merkezi durgun kalır ve her cisim ona, ötekinin kütlesiyle orantılı uzaklıkta döner: a_M/a_m = m/M. Küçük kütlede M neredeyse kıpırdamaz; Kepler'in sabit Güneş varsayımı tam bu sınırdır.",
      },
    ],
  },
  wow: [
    {
      title: "Kuzeyin yaz yarıyılı, kış yarıyılından bir hafta uzun",
      body: "Dünya ocak başında günberidedir (yaklaşık 147,1 milyon km), temmuz başında günötede (yaklaşık 152,1 milyon km). İkinci yasa gereği günöte tarafında daha yavaş ilerler. Bu yüzden kuzey yarımkürede mart ekinoksundan eylül ekinoksuna kadar geçen 'yaz yarıyılı' yaklaşık 186 gün, eylülden marta dönen 'kış yarıyılı' yaklaşık 179 gün sürer. Fark tek bir mevsimde toplanmaz: astronomik yaz (haziran gündönümünden eylül ekinoksuna) kıştan yalnızca 4,7 gün kadar uzundur, kalanı ilkbahardan gelir. Takvimde mart ve eylül ekinoksları arasındaki günleri say: Kepler'in ikinci yasasını kendin ölçmüş olursun.",
    },
    {
      title: "Mars yolculuğunu üçüncü yasa hesaplar",
      body: "Dünya'dan Mars'a en az yakıtla gitmenin yolu, günberisi Dünya'nın (1 AU), günötesi Mars'ın (1,524 AU) yörüngesine değen bir elipstir: <strong>Hohmann transfer yörüngesi</strong>. Yarı büyük ekseni 1,262 AU, periyodu 1,262<sup>1,5</sup> ≈ 1,42 yıldır; yolculuk bu elipsin yarısıdır, yaklaşık 259 gün (çember yörünge yaklaşımıyla). Curiosity gezgini 26 Kasım 2011'de fırlatılıp 6 Ağustos 2012'de Mars'a indi: 254 gün.",
    },
    {
      title: "Merkür'ün 43 yay saniyelik sırrı",
      body: "Merkür'ün elipsi yerinde durmaz; günberi noktası Güneş çevresinde yavaşça döner. Bu dönüşün büyük kısmı öteki gezegenlerin çekimiyle açıklanır, ama Urbain Le Verrier 19. yüzyılın ortasında Newton kuramının açıklayamadığı küçük bir artık buldu: bugünkü değeriyle yüzyılda yaklaşık 43 yay saniyesi. Bazı gökbilimciler Güneş'e daha yakın, görünmeyen bir gezegen (Vulkan) aradı; bulunamadı. 1915'te Einstein bu artığı genel görelilikle hesaplayarak açıkladı.",
    },
  ],
  worked: {
    title: "Eğik fırlatmanın yörüngesi",
    prompt:
      "Bir gezegen Güneş'ten (M = 1 M☉) r₀ = 1 AU uzakta, v₀² = 1,2·GM/r₀ hızıyla ve Güneş–gezegen doğrultusuyla α = 60° açı yaparak fırlatılıyor. GM = 4π² AU³/yıl² ve 1 AU/yıl = 4,74047 km/s alarak yarı büyük ekseni, periyodu, dışmerkezliği, günberi ve günöte uzaklıklarını ve günberi hızını bul.",
    steps: [
      "Enerji: ε = v₀²/2 − GM/r₀ = (0,6 − 1)·GM/r₀ = −0,4 × 39,478 = −15,791 AU²/yıl². ε < 0, yörünge bağlı bir elips. Yarı büyük eksen a = −GM/(2ε) = 1/(2 × 0,4) = 1,2500 AU; periyot T = a<sup>3/2</sup> = 1,25<sup>1,5</sup> = 1,3975 yıl. Bu iki sonuçta açı hiç geçmedi.",
      "Açısal momentum: v₀ = √1,2 × 2π = 6,883 AU/yıl, h = r₀·v₀·sin 60° = 6,883 × 0,8660 = 5,961 AU²/yıl. Yarı-latus rectum p = h²/GM = 1,2 × sin²60° = 1,2 × 0,75 = 0,9000 AU.",
      "Dışmerkezlik: p = a(1 − e²) olduğundan e = √(1 − p/a) = √(1 − 0,72) = √0,28 = 0,5292. (Aynı sonuç e = √(1 + 2εh²/(GM)²) = √(1 − 2 × 0,4 × 0,9) bağıntısından da çıkar.)",
      "Uç noktalar: r<sub>p</sub> = a(1 − e) = 1,25 × 0,4708 = 0,5886 AU; r<sub>a</sub> = a(1 + e) = 1,25 × 1,5292 = 1,9114 AU. Günberi hızı h/r<sub>p</sub> = 5,961/0,5886 = 10,127 AU/yıl ≈ 48,01 km/s; fırlatma hızı ise 6,883 × 4,74047 ≈ 32,63 km/s.",
      "Sayfada dene: ilk sekmede <strong>Eğik fırlatma</strong> düğmesine bas. Tablo günberiyi 0,5886, günöteyi 1,9114, a'yı 1,2500, e'yi 0,5292, periyodu 1,3975 yıl ve günberi hızını 48,01 km/s olarak verir. Sonra yalnız <strong>Fırlatma açısı</strong>nı 90°'ye çek: a ve T değişmez, e 0,2000'e iner, yol 1,0000 ile 1,5000 AU arasında gidip gelir.",
    ],
    result:
      "a = 1,2500 AU, T = 1,3975 yıl, e = 0,5292, r<sub>p</sub> = 0,5886 AU, r<sub>a</sub> = 1,9114 AU, v<sub>p</sub> ≈ 48,01 km/s. Hızın büyüklüğü enerjiyi, dolayısıyla a ile T'yi belirler; açı yalnız açısal momentumu, yani elipsin biçimini değiştirir.",
  },
  misconceptions: [
    {
      myth: "Yazın sıcak olması, Dünya'nın o mevsimde Güneş'e daha yakın olmasındandır.",
      truth:
        "Tam tersi: Dünya Güneş'e en çok ocak başında, kuzey yarımkürede kışın ortasında yaklaşır. Uzaklık yıl boyunca yalnızca yüzde 3,4 değişir; bu, Dünya'ya ulaşan ışınımda yaklaşık yüzde 7'lik bir fark yaratır. Mevsimleri Dünya'nın 23,4°'lik eksen eğikliği yaratır: güneş ışınlarının geliş açısı ve gün uzunluğu değişir. Kanıtı basit: ocakta Avustralya'da yaz yaşanır.",
    },
    {
      myth: "Gezegen yörüngeleri, ders kitabı çizimlerindeki gibi belirgin biçimde basıktır.",
      truth:
        "Çizimler basıklığı abartır. Dünya'nın yörüngesini 10 cm genişliğinde çizseydin büyük eksenle küçük eksen arasındaki fark yaklaşık 0,014 mm olurdu; bir saç teli bunun birkaç katı kalındır. Görülebilecek tek şey, Güneş'in merkezden yaklaşık 0,84 mm kaymasıdır. Basıklık b/a = √(1 − e²) ile e'nin karesine bağlı olduğu için küçük e'de neredeyse görünmez; göze çarpan, odağın merkezden a·e kadar kaymasıdır. İkinci sekmede <strong>Merkür benzeri e = 0,21</strong> düğmesine bas: yörünge hâlâ çembere benzer, ama Güneş belirgin biçimde yana kaymıştır.",
    },
    {
      myth: "Gezegen yörüngesinde sabit süratle ilerler.",
      truth:
        "Eşit zamanda eşit yay değil, eşit alan taranır. İkinci sekmenin varsayılanında (e = 0,6) gezegen günberide 59,57 km/s, günötede 14,89 km/s hızla gider; renkli dilimler günberide kısa ve geniş, günötede uzun ve dardır ama alanları 10⁻⁷ duyarlıkla aynıdır. <strong>Kuyruklu yıldız e = 0,9</strong> düğmesiyle hız oranı 19'a çıkar: 129,83 ve 6,83 km/s.",
    },
    {
      myth: "Ağır gezegenler Güneş'in çevresini daha yavaş dolanır.",
      truth:
        "Periyot neredeyse yalnızca a'ya ve Güneş'in kütlesine bağlıdır; gezegenin kendi kütlesi, serbest düşmede olduğu gibi büyük ölçüde sadeleşir. Kesin formülde kalan küçük M + m terimi de periyodu uzatmaz, <em>kısaltır</em>. Dördüncü sekmede bunu abartılı ölçekte gör: 1 AU'luk yörüngede m = 0,01 M☉'de T = 0,99504 yıl, m = 1 M☉'de 0,70711 yıl. Dünya'dan 318 kat ağır Jüpiter'in 12 yıllık turu ağırlığından değil, Güneş'ten 5,2 AU uzakta olmasından gelir.",
    },
  ],
  glossary: [
    {
      term: "Dışmerkezlik (e)",
      definition:
        "Eksantriklik de denir; bir konik kesitin çemberden ne kadar saptığını gösteren sayı: e = 0 çember, 0 < e < 1 elips, e = 1 parabol, e > 1 hiperbol.",
    },
    {
      term: "Yarı büyük eksen (a)",
      definition:
        "Elipsin en uzun çapının yarısı; günberi ve günöte uzaklıklarının ortalaması, a = (r<sub>min</sub> + r<sub>max</sub>)/2.",
    },
    {
      term: "Odak",
      definition:
        "Büyük eksen üzerindeki iki özel noktadan biri; elipsin her noktasından iki odağa uzaklıkların toplamı 2a'dır ve Güneş bunlardan birinde durur.",
    },
    {
      term: "Günberi ve günöte",
      definition:
        "Yörüngede Güneş'e en yakın (a(1 − e)) ve en uzak (a(1 + e)) noktalar; ikisinde de hız yarıçapa diktir.",
    },
    {
      term: "Astronomik birim (AU)",
      definition:
        "Tam olarak 149 597 870 700 metre olarak tanımlanan uzunluk birimi; kabaca Dünya ile Güneş arasındaki ortalama uzaklık.",
    },
    {
      term: "Özgül yörünge enerjisi (ε)",
      definition:
        "Kütle başına toplam enerji, ε = v²/2 − GM/r; yörünge boyunca sabittir, işareti yörüngenin bağlı olup olmadığını söyler.",
    },
    {
      term: "Özgül açısal momentum (h)",
      definition:
        "Kütle başına açısal momentum, h = r·v<sub>⊥</sub>; merkezî kuvvet altında korunur ve alan tarama hızının iki katıdır.",
    },
    {
      term: "İndirgenmiş kütle (μ)",
      definition:
        "İki cisim problemini tek cisim problemine indiren μ = Mm/(M + m) kütlesi; bağıl hareket, toplam kütle M + m'nin çekimi altında olur.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede Kepler yasaları ezberlenmez, türetilir. Fizik I'in kütleçekim bölümünde ve Klasik Mekanik derslerinde iki cisim problemi <strong>indirgenmiş kütle</strong> yöntemiyle tek cisim problemine iner; merkezî kuvvette açısal momentum korunur ve ikinci yasa kendiliğinden çıkar. Kuvvet tam olarak 1/r² ise yörünge, kutupsal koordinatlarda r = p/(1 + e·cos θ) olur: e < 1 elips, e = 1 parabol, e > 1 hiperbol. Kepler'in elipsleri, Newton'un izin verdiği yörüngelerden yalnızca bağlı olanlarıdır. Ters kare kuvvetin gizli bir simetrisi de vardır: Laplace–Runge–Lenz vektörü korunur ve elips yerinde durur. Merkür'ün günberi kayması, gerçek kuvvetin tam ters kare olmadığını gösteren işaretlerden biridir.",
      "Analitik çözümün bittiği yerde sayısal yöntemler başlar. Birden fazla gezegen işin içine girince kapalı çözüm yoktur: N cisim problemi ya pertürbasyon kuramıyla ya da bu sayfadaki gibi sayısal integrasyonla çözülür. Sayısal Analiz ve Diferansiyel Denklemler derslerinde Runge–Kutta yöntemlerinin hata mertebesi, değişken adım seçimi ve uzun süreli benzetimlerde enerjiyi sınırlı tutan simplektik (leapfrog gibi) yöntemler işlenir. Uydu yörüngeleri, Hohmann transferleri ve kütleçekim yardımıyla hızlanma aynı denklemlerin mühendislik hâlidir; NASA'nın Kepler uzay teleskobu da bir yıldızın önünden düzenli aralıklarla geçen gezegenin periyodunu üçüncü yasayla yörünge boyutuna çevirdi.",
    ],
    topics: [
      "İki cisim problemi ve indirgenmiş kütle",
      "Merkezî kuvvetler ve açısal momentum",
      "Konik kesitler ve kutupsal koordinatlar",
      "Laplace–Runge–Lenz vektörü",
      "Runge–Kutta ve simplektik integratörler",
      "Hohmann transferi",
      "N cisim problemi ve pertürbasyon",
      "Genel görelilik ve günberi kayması",
    ],
  },
  quiz: [
    {
      question:
        "Üçüncü sekmede M = 1 M☉ iken a = 2 AU'luk yörüngenin periyodu 2,82843 yıldır. M = 4 M☉ yapınca aynı yörüngenin periyodu kaç olur?",
      options: ["0,70711 yıl", "1,41421 yıl", "2,82843 yıl", "5,65685 yıl"],
      answer: 1,
      explanation:
        "T² = 4π²a³/(GM) olduğundan T ∝ 1/√M. Kütle 4 katına çıkınca periyot √4 = 2'ye bölünür: 2,82843/2 = 1,41421 yıl. 0,70711, periyodun kütleyle doğrudan (1/M) azaldığını sanmaktan gelir; 5,65685 ise ağır yıldızın gezegeni 'yavaşlattığını' düşünmekten. Log–log grafikte bu, doğrunun eğimi değişmeden aşağı kaymasıdır.",
    },
    {
      question:
        "İlk sekmede r₀ = 1 AU ve (v₀/v_ç)² = 1,2 ile fırlatma açısını 60°'den 90°'ye çeviriyorsun. Hangisi değişmez?",
      options: [
        "Günberi uzaklığı r<sub>min</sub>",
        "Dışmerkezlik e",
        "Periyot T",
        "Günberi hızı v<sub>p</sub>",
      ],
      answer: 2,
      explanation:
        "Hızın büyüklüğü aynı kaldığı için enerji ε = v₀²/2 − GM/r₀ aynıdır; a = −GM/(2ε) ve T = 2π√(a³/GM) yalnız ε'ye bağlıdır: ikisinde de a = 1,2500 AU, T = 1,3975 yıl. Açı açısal momentumu değiştirir: 60°'de e = 0,5292 ve r<sub>min</sub> = 0,5886 AU, 90°'de e = 0,2000 ve r<sub>min</sub> = 1,0000 AU. Günberi hızı da buna göre değişir.",
    },
    {
      question:
        "İkinci sekmede e = 0,6 iken dilim başına 10 üçgenle yayılım 3,8·10⁻³ çıkıyor. Kiriş hatası tek başına belirleyiciyse, dilim başına 100 üçgende yaklaşık ne beklersin?",
      options: ["3,8·10⁻⁴", "3,8·10⁻⁵", "3,8·10⁻⁶", "3,8·10⁻³; fizik değişmediği için aynı"],
      answer: 1,
      explanation:
        "Δθ açılı bir yayı kirişle değiştirince kaybolan alan (Δθ)³ ile orantılıdır. Dilimi k üçgene bölünce her birinin açısı 1/k ile küçülür: k üçgen × k⁻³ = k⁻² toplam hata. k'yi 10 katına çıkarmak hatayı 100'e böler: 3,8·10⁻⁵, sayfanın gösterdiği değer. Aynı kural k = 1'den 2'ye geçişte yaklaşık 4 kat düşüş verir (sayfada 3,81).",
    },
  ],
  next: [
    {
      href: "konik-kesitler.html",
      title: "Konik Kesitler: Elips, Parabol ve Hiperbol",
      why: "Bu sayfada fırlatma hızıyla elde ettiğin elips, parabol ve hiperbolün geometrisi. 'Odak ve doğrultman' sekmesinde PF = e·PD tanımıyla e'yi değiştir; Dünya ve Halley düğmeleri iki gerçek dışmerkezliği aynı çerçevede gösterir.",
    },
    {
      href: "dairesel-hareket.html",
      title: "Dairesel Hareket — Merkezcil Kuvvet",
      why: "e = 0 özel durumunun kinematiği: v²/r merkezcil ivmesini ve hangi kuvvetin onu sağladığını (ip, viraj, düşey çember) kaydırıcılarla dene. Sonra merkezcil kuvveti GMm/r²'ye eşitle: çember hızı ve T² ∝ r³ iki satırda çıkar.",
    },
    {
      href: "gunes-sistemi.html",
      title: "Güneş Sistemi Laboratuvarı",
      why: "Tycho'nun kaydettiği türden veriye Dünya'dan bak: 'Gökyüzünde gezegenler' sekmesinde iki çember yörüngedeki gezegenin ekliptik boylamını izle, geri hareketin süresini ölç ve kuramla karşılaştır.",
    },
    { href: "bilim-tarihinden-deneyler.html", title: "Bilim Tarihinden Deneyler: Eratosthenes, Galileo, Kepler, Cavendish, Rømer", why: "Yasaların nasıl bulunduğu: Tycho'nun Mars verisinde dairenin 8 yay dakikasıyla şaşması; Eratosthenes, Galileo, Cavendish ve Rømer de yeniden kurularak." },
  ],
  sources: [
    {
      title:
        "OpenStax · University Physics Vol. 1, 13.5 Kepler's Laws of Planetary Motion",
      url: "https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion",
      note: "Üç yasanın Newton kütleçekiminden türetilişi: ters kareden elips, açısal momentumdan eşit alanlar, yarı büyük eksenle periyot (İngilizce, açık ders kitabı).",
    },
    {
      title: "NASA NSSDCA · Planetary Fact Sheet",
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/",
      note: "Üçüncü sekmedeki gezegen verisinin kaynağı: her gezegenin kendi sayfasındaki yarı büyük eksen, yıldızıl ve tropik dolanma dönemi, dışmerkezlik ve kütle; tanımlar tablonun notlarında.",
    },
    {
      title: "Wikipedia · Kepler's laws of planetary motion",
      url: "https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion",
      note: "Yasaların tarihçesi (1609, 1619, 1621, 1687) ve iki cisim için M + m düzeltmesi (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
