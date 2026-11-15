window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["depremler-ve-sismik-dalgalar"] = {
  slug: "depremler-ve-sismik-dalgalar",
  title: "Depremler ve Sismik Dalgalar: Kayaçtan Gelen Haber",
  field: "Yer ve Çevre Bilimleri",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "P ve S dalgalarının hızı kayacın sertliğinden gelir; aralarındaki gecikme uzaklığı, fayın boyutu büyüklüğü, binlerce depremin sayımı istatistiği verir. Dördünü de ölç ve kuramla karşılaştır.",
  hook:
    "Bir sismograf önce küçük, keskin bir titreme yazar; birkaç saniye sonra daha iri bir sallantı gelir. Aynı kırılmadan çıkan iki dalga neden aynı anda varmaz? Ve aradaki o birkaç saniye, depremin nerede olduğunu nasıl söyleyebilir?",
  bigIdea:
    "Bir deprem kayaca iki ayrı dalga yollar: hızları kayacın <strong>sıkışmaya ve kaymaya karşı direncinden</strong> gelir; bu yüzden varışları arasındaki gecikme uzaklığı, S dalgasının geçemediği yerler de Yer'in içindeki sıvıyı ele verir.",
  story: [
    "Depremi bir fizik problemi olarak ele alan ilk araştırmacılardan biri İrlandalı mühendis Robert Mallet'dir. 1852–1858 arasında kumda ve kayada patlatma deneyleri yaparak sarsıntının ne hızla yayıldığını ölçmeye çalıştı; 16 Aralık 1857'de Padula yakınında, Napoli Krallığı'nda olan depremden sonra bölgeye gidip hasarı yerinde, o dönem için yeni bir araç olan fotoğrafla belgeledi. \"Sismoloji\" sözcüğünü ve merkez üssü (epicentre) terimini onun ortaya attığı kabul edilir. Ölçü aletleri ise çeyrek yüzyıl sonra geldi: John Milne'in 1880'de Tokyo'da geliştirdiği yatay sarkaçlı sismograf, yeri sarsıntı sırasında kımıldamayan bir kütleye göre kaydetti. Milne'in daha sonra Royal Society desteğiyle kurdurduğu gözlemevleri zamanla kırk kadar istasyonluk, dünyayı saran bir ağa dönüştü.",
    "Kayıtlar biriktikçe dalgaların bir düzeni olduğu görüldü. Richard Dixon Oldham, 1897 Assam depreminin raporunda üç ayrı varışı ayırdı: önce sıkışma dalgaları (P), sonra kayma dalgaları (S), en son iri yüzey dalgaları. 1906'daki makalesinde, Yer'in derinlerinde yoğun bir çekirdek bulunduğunu savundu; kanıtı, birçok depremin kayıtlarında S varış zamanlarının merkez üssünden yaklaşık 120° ötede birden bozulmasıydı. 8 Ekim 1909'da Zagreb'in güneydoğusunda (Pokuplje) olan depremin kayıtlarında Andrija Mohorovičić iki ayrı öncü dalga takımı gördü: biri yakın istasyonlarda, öbürü daha uzaklarda belirgindi. Birini kabuğun içinden doğrudan gelen yola, öbürünü daha hızlı bir alt katmandan kırılarak gelen yola bağladı ve kabuğun tabanını yaklaşık 50–54 km derinlikte buldu. Bu sınır bugün onun adını taşır.",
    "1913'te Beno Gutenberg, çekirdek–manto sınırında P hızının birden düştüğünü ve S dalgalarının kaybolduğunu gösterdi; bu sınır bugün yaklaşık 2890 km derinlikte bilinir. 1936'da Danimarkalı sismolog Inge Lehmann, 1929 Yeni Zelanda (Murchison) depreminin kayıtlarında, çekirdeğin gölgesinde kalması beklenen Sverdlovsk ve İrkutsk istasyonlarına beklenmedik güçte varan dalgaları inceledi ve sıvı dış çekirdeğin içinde katı bir iç çekirdek önerdi. Makalesinin başlığı yalnızca bir simgeydi: \"P′\".",
    "Büyüklük kavramı da aynı dönemde doğdu. Charles Richter, Kiyoo Wadati'nin genliğin uzaklıkla düzenli azaldığını gösteren 1931 çalışmasından yola çıkarak 1935'te yerel büyüklük ölçeğini (M_L) yayımladı. Gutenberg ile birlikte 1944'te Kaliforniya depremlerinde, 1949'da dünya ölçeğinde, küçük depremlerin büyüklerden belli bir oranda daha sık olduğunu gösterdiler: Gutenberg–Richter yasası. Büyük depremlerde eski ölçekler doyunca Hiroo Kanamori 1977'de büyüklüğü fayın fiziksel boyutundan, sismik momentten tanımladı; Thomas Hanks ile 1979'daki makaleleri bu tanımı bugünkü biçimine getirdi. Kataloglarda okunan M_w budur."
  ],
  core: [
    {
      heading: "İki dalga, iki direnç",
      body:
        "Kayaçtan ince bir dilim düşün. P dalgasında parçacıklar yayılma yönünde ileri geri gider; dilim sıkışıp genişler. Ona karşı koyan hem hacim değişimine direnç (<strong>hacim modülü K</strong>) hem de biçim değişimine direnç (<strong>kayma modülü μ</strong>) olur: düzlem dalgada dilim yalnız bir yönde sıkışır, çevresi onun yanlara şişmesine izin vermez; bu tek eksenli sıkışma hem hacmi küçültür hem de dilimin biçimini bozar. S dalgasında parçacıklar yayılmaya dik gider; dilim yalnız kayar ve geri çağıran tek şey μ'dür. Newton'un ikinci yasası dilim için ρ ∂²u/∂t² = (K + 4μ/3) ∂²u/∂x² verir; bu bir dalga denklemidir ve hız katsayının ρ'ya oranının kareköküdür. Granit benzeri ayarda (K = 50 GPa, μ = 30 GPa, ρ = 2700 kg/m³) sayfa v_P = 5,774 km/s, v_S = 3,333 km/s hesaplar; oran √3 ≈ 1,732'dir ve Poisson oranı ν = 0,250'ye karşılık gelir.",
      formula: "v<sub>P</sub> = √((K + 4μ/3)/ρ),  v<sub>S</sub> = √(μ/ρ)",
      formulaNote: "K ≥ 0 olduğu sürece v_P daima v_S'den büyüktür: oran en az √(4/3) ≈ 1,15 olabilir. P'nin hep önce gelmesinin nedeni budur."
    },
    {
      heading: "Sıvı kaymayı taşımaz: S gölgesi",
      body:
        "Sıvı konduğu kabın biçimini alır, çünkü biçim değişimine kalıcı bir direnci yoktur: μ = 0. O zaman v_S = 0 olur, S dalgası hiç ilerlemez; P ise yalnız K/ρ ile yayılır. Sayfadaki \"Su\" ayarında v_P 1,483 km/s çıkar, S kartı \"S yok: μ = 0\" yazar. Yerküre ölçeğinde bunun izi bir gölgedir: doğrudan S dalgaları merkez üssünden yaklaşık 104°'den uzak istasyonlarda görülmez, doğrudan P varışları ise 104° ile 140° arasında kaybolur (P çekirdeğe girerken kırılıp yön değiştirir). Dikkat: gölge tek başına \"sıvı\" demez, yalnız S'yi geçirmeyen bir katman olduğunu gösterir. Dış çekirdeğin sıvı olduğu sonucu başka gözlemlerle birlikte kurulmuştur.",
      formula: "μ = 0  ⇒  v<sub>S</sub> = 0,  v<sub>P</sub> = √(K/ρ)",
      formulaNote: "Sıvı demir benzeri ayarda (K = 1100 GPa, ρ = 11 000 kg/m³) v_P tam 10,000 km/s olur; S yine yoktur."
    },
    {
      heading: "S − P gecikmesinden uzaklık, üç uzaklıktan yer",
      body:
        "İki dalga aynı anda, aynı yerden çıkar; d uzaklığındaki istasyona varış farkı Δt = d/v_S − d/v_P'dir. Bunu d için çözersen gecikme ile uzaklık arasında sabit bir çarpan bulursun. v_P = 6,00 ve v_S = 3,50 km/s için çarpan 8,4 km/s'dir: \"her saniye gecikme yaklaşık 8 km\" kuralının kaynağı budur. Tek istasyon yalnız bir çember verir; üç çember tek bir noktada kesişmelidir. Ölçümler gürültülü olduğu için çemberler tam buluşmaz, bu yüzden konum Σ(|x − sᵢ| − dᵢ)²'yi en küçük yapan nokta olarak, <strong>en küçük kareler</strong> ile bulunur. Hız modeli yanlışsa bütün uzaklıklar aynı oranda büyür ya da küçülür; çemberler artık ortak bir noktada buluşamaz ve artıklar büyür. Küçük bir konum hatası doğru modelin kanıtı değildir, ama büyük artıklar yanlış modelin işaretidir.",
      formula: "d = Δt · v<sub>P</sub>v<sub>S</sub>/(v<sub>P</sub> − v<sub>S</sub>)",
      formulaNote: "Gerçek konum belirlemede odak derinliği, katmanlı hız modelleri ve çok sayıda istasyon kullanılır; sayfadaki model düz ve homojendir."
    },
    {
      heading: "Sismik moment ve moment büyüklüğü",
      body:
        "Bir deprem, fay yüzeyinin iki yakasının birbirine göre kaymasıdır. Bu kaymanın \"boyutu\" <strong>sismik moment</strong>tir: kayayı kaydırmanın zorluğu (μ), kayan alan (A = L·W) ve ortalama kayma (D) çarpılır. Moment newton·metre birimindedir ve depremden depreme milyarlarca kat değişir; bu yüzden logaritmayla bir büyüklüğe çevrilir. Sayfa 9,1 sabitini kullanır: Kanamori'nin 1977 tanımı (enerji ilişkisi log E = 1,5 M_w + 11,8 ve E = M₀/(2 × 10⁴), dyn·cm ve erg cinsinden) N·m'ye çevrilince tam bu sayıyı verir. Hanks ve Kanamori'nin 1979'daki biçimi M_w = (2/3) log₁₀ M₀ − 10,7'dir (M₀ dyn·cm); N·m'de bu 9,05'e denk düşer ve aynı moment için M_w'yi 0,033 büyük verir. 2/3 çarpanı yüzünden moment her büyüklük biriminde 10^1,5 ≈ 31,6 kat, iki birimde 1000 kat büyür. Yayılan enerji için Kanamori'nin kullandığı E ≈ M₀/(2 × 10⁴) yalnız bir yaklaşıklıktır: aynı momentli iki deprem, gerilme düşümü farklıysa farklı enerji yayar. Richter'in 1935 M_L'si ise bir sismografın gördüğü genliğin logaritmasıdır ve büyük depremlerde yaklaşık 7 dolayında doyar.",
      formula: "M<sub>0</sub> = μ·A·D,  M<sub>w</sub> = (2/3)(log<sub>10</sub> M<sub>0</sub> − 9,1)",
      formulaNote: "M₀ N·m cinsinden. Fayın her boyutunu √10 kat büyütmek momenti 10^1,5 kat, M_w'yi tam 1 artırır."
    },
    {
      heading: "Gutenberg–Richter, en çok olabilirlik ve Poisson",
      body:
        "Bir bölgede M ve üstündeki deprem sayısı log₁₀ N = a − bM ile azalır; etkin bölgelerde b çoğunlukla 1 dolayındadır (gözlenen aralık yaklaşık 0,5–2). b = 1, bir birim büyük depremin on kat seyrek olduğu demektir. Bu dağılım üstel olduğu için b'nin <strong>en çok olabilirlik</strong> kestiricisi yalnız ortalama büyüklüğe dayanır (Aki; yuvarlanmış büyüklükler için ΔM/2 düzeltmesi Utsu'nun). Ama yalnız katalog eksiksizse: <strong>tamlık büyüklüğü</strong> M_c'nin altındaki küçük depremlerin bir kısmı hiç kaydedilmez, ortalama büyüklük yapay olarak yükselir ve b küçük çıkar. Yıllık hız λ biliniyorsa, olaylar bağımsız ve zamanda düzgün kabul edilirse (Poisson süreci), T yılda en az bir olay olasılığı 1 − e^(−λT)'dir. Bu bir istatistik modeldir, tahmin değildir: gerçek depremler kümelenir, b bölgeden bölgeye değişir ve hiçbir yöntem bir depremin yerini, zamanını ve büyüklüğünü önceden bildiremez.",
      formula: "b = log<sub>10</sub>e / (<span class=ov>M</span> − (M<sub>c</sub> − ΔM/2)),  P = 1 − e<sup>−λT</sup>",
      formulaNote: "σ_b ≈ b/√N. λ = 0,02/yıl ve T = 30 yıl için P = 45,12 %; T = 100 yıl için 86,47 %."
    }
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir. <strong>01 · P ve S dalgaları</strong>: Hacim modülü K, Kayma modülü μ ve Yoğunluk ρ kaydırıcılarıyla (ya da Granit benzeri, Gevşek tortul, Su, Sıvı demir benzeri düğmeleriyle) kayacı seç; tek boyutlu sonlu farklar benzetimi R₁ ve R₂ alıcılarındaki tepe anlarından hızı ölçer, kuramın yanına yazar. <strong>02 · Üç istasyondan merkez üssü</strong>: gizli bir depremin sentetik kayıtlarında P ve S varışlarını seç, model hızlarını değiştir, \"Gerçek merkez üssünü ve varışları göster\" kutusuyla hatanı gör. <strong>03 · Büyüklük ve enerji</strong>: L, W, D ve μ'den M₀ ve M_w; \"Referans olarak kaydet\" ile enerji oranları. <strong>04 · Gutenberg–Richter ve olasılık</strong>: tohumlu sentetik katalogda b kestirimi ve Poisson olasılığı. R tuşu etkin sekmeyi varsayılana döndürür.",
    experiments: [
      {
        title: "Sıvıda S dalgası ne olur?",
        predict: "Kayma modülü sıfır olunca S dalgası yavaşlar mı, hiç mi ilerlemez? P'ye ne olur?",
        do: "01 sekmesinde önce varsayılan Granit benzeri ayarı \"Sonuca atla\" ile bitir ve kartları oku. Sonra \"Su\" düğmesine bas ve yine \"Sonuca atla\".",
        observe: "Granitte v_P 5,774 km/s kuram · 5,771 ölçülen (−0,042 %), v_S 3,333 · 3,332; durum satırı R₂'de 4,44 s gecikme yazar. Suda v_P 1,483 km/s (ölçülen 1,483), S kartı \"S yok: μ = 0\", oran \"sınırsız\", ν 0,500; alt banttaki atma kaynakta kalır.",
        explain: "Enine geri çağırıcı kuvvet yalnız μ'den gelir; μ = 0 iken S için dalga denklemi kalmaz. Küçük ölçüm farkı sayısal dağınımdır: Δx yarıya inince dörtte birine düşer. Yer ölçeğinde bu, 104°'nin ötesindeki S gölgesidir."
      },
      {
        title: "Yaklaşık yüzde beş yanlış hız modeli",
        predict: "Model hızlarını yaklaşık %4–5 büyük alırsan (v_P %5, v_S %4,3) konum ne kadar kayar? Bunu anlamanın bir yolu var mı?",
        do: "02 sekmesinde varsayılanda \"Gerçek merkez üssünü ve varışları göster\" kutusunu işaretle, hatayı ve RMS'i oku. Sonra Model v_P'yi 6,30, Model v_S'yi 3,65 km/s yap.",
        observe: "Önce hata 0,18 km, RMS 0,09 km, çarpan 8,400 km/s. Yeni modelde çarpan 8,677 km/s (+3,3 %), kestirim (116,3; 26,6) km, hata 3,83 km, RMS 2,10 km; t₀ 0,48 s geç çıkar.",
        explain: "Çarpan değişince bütün uzaklıklar aynı oranda büyür; üç çember artık tek noktada buluşamaz ve artıklar büyür. Gerçeği bilmesen de büyük RMS modelin yanlış olduğunu ele verir; tersi doğru değildir. Tohumu değiştirip aynı model hatasını dene: istasyon geometrisine göre konum hatası birkaç yüz metrede de kalabilir, birkaç kilometreye de çıkabilir; artıklar ise her seferinde belirgin biçimde büyür."
      },
      {
        title: "Bir birim büyüklük kaç kat?",
        predict: "Fayın uzunluğunu, genişliğini ve kaymasını √10 ≈ 3,16 kat büyütürsen M_w kaç artar, enerji kaç kat olur? Yalnız kaymayı 10 kat artırırsan?",
        do: "03 sekmesinde varsayılanda \"Referans olarak kaydet\", sonra \"Fayı her yönde √10 kat büyüt\". Ardından \"Varsayılana dön\", yeniden kaydet ve \"Yalnız kaymayı 10 kat artır\".",
        observe: "Varsayılan M_w 6,96. Büyütünce M_w 7,96, A 7586 km², oran 31,62 kat. Yalnız kaymayla M_w 7,62 (ΔM_w 0,667), oran 10,00 kat. Varsayılan fayda tablonun son sütunu, 1960 Biobío (M 9,5) için 6499 kat gösterir.",
        explain: "M₀ ∝ L·W·D: üç boyut √10'ar kat, moment 10^1,5 kat; M_w = (2/3) log M₀ ile tam 1 birim. Kayma tek başına 10 kat ise yalnız 2/3 birim. Enerji oranı burada momentle aynıdır, çünkü sayfa E ∝ M₀ alır."
      },
      {
        title: "Eksik katalog, eğri b ve olasılık",
        predict: "Çözümlemedeki M_c'yi gerçek tamlığın (2,0) altına indirirsen b büyür mü, küçülür mü?",
        do: "04 sekmesinde varsayılanda Aki–Utsu b'yi oku; Çözümlemedeki M_c'yi 1,5 yap. Sonra 2,0'a geri al; Eşik büyüklük M* 6,0, Süre T 30 yılken olasılık kartlarını oku, T'yi 100 yap.",
        observe: "Varsayılan Aki 0,992 ± 0,012; M_c 1,5'te 0,677 (−32,3 %). Olasılık: kuram 45,12 %, benzetim 45,50 % ± 0,35; T 100'de 86,47 %. Katalogdaki en büyük deprem 5,4: M* = 6 bir dışa uzatmadır.",
        explain: "Kaydedilmeyen küçük depremler ortalama büyüklüğü yükseltir, b küçük çıkar. 1 − e^(−λT) varsayımların sonucudur, bir yerin depremini söylemez; sayfa bunu durum satırında da yazar."
      }
    ]
  },
  wow: [
    {
      title: "Tek bir depremden kabuğun kalınlığı",
      body:
        "Andrija Mohorovičić, 8 Ekim 1909'da Zagreb'in güneydoğusunda olan bir depremin kayıtlarında iki ayrı öncü dalga takımı gördü: biri yakın istasyonlarda, öbürü daha uzaklarda belirgindi. Birini doğrudan yola, öbürünü daha hızlı bir alt katmandan kırılan yola bağladı ve kabuğun tabanını yaklaşık 50–54 km derinlikte hesapladı. Sonraki çalışmalar bu sonucu destekledi; sınıra bugün kısaca \"Moho\" denir."
    },
    {
      title: "Başlığı tek bir simge olan makale",
      body:
        "Inge Lehmann 1936'da iç çekirdeği önerdiği makaleye yalnızca \"P′\" adını verdi: çekirdekten geçen P dalgasının adı. 1929 Murchison depreminin, çekirdeğin gölgesinde kalması gereken Sverdlovsk ve İrkutsk istasyonlarında beklenmedik güçte kaydedilmesi, sıvı dış çekirdeğin içinde katı bir iç çekirdek olduğu fikrine götürdü."
    },
    {
      title: "Bin kat için iki birim",
      body:
        "Moment büyüklüğü bir birim arttığında moment yaklaşık 31,6 kat, iki birim arttığında 1000 kat büyür. Sayfadaki varsayılan fay (50 km × 15 km, 1,5 m kayma) M_w 6,96 verir; USGS kataloğunda M 9,5 olan 22 Mayıs 1960 Şili depremi, sayfanın formülüyle bunun 6499 katı enerji yayar. Aradaki fark yalnız 2,5 birimdir."
    }
  ],
  worked: {
    title: "Faydan moment büyüklüğüne",
    prompt:
      "Uzunluğu L = 50,1 km, eğim boyunca genişliği W = 15,1 km olan bir fay ortalama D = 1,51 m kayıyor; kayma modülü μ = 30 GPa. Sismik momenti, moment büyüklüğünü (9,1 ve 9,05 sabitleriyle) ve yaklaşık yayılan enerjiyi bul. Sonra kayma iki katına çıkarsa M_w'nin ne kadar değişeceğini hesapla.",
    steps: [
      "Alanı SI birimine çevir: A = L·W = (50,1 × 10³ m)(15,1 × 10³ m) ≈ 7,59 × 10⁸ m², yani 759 km².",
      "Momenti çarp: M₀ = μ·A·D = (3,0 × 10¹⁰ Pa)(7,59 × 10⁸ m²)(1,51 m) ≈ 3,44 × 10¹⁹ N·m. Pa·m²·m = N·m: birim bir kuvvet çarpı uzunluktur, ama burada tork değil, kaymanın boyutudur.",
      "Büyüklüğe çevir: log₁₀ M₀ ≈ 19,537. Sayfanın sabitiyle M_w = (2/3)(19,537 − 9,1) ≈ 6,96; Hanks–Kanamori'nin 9,05'iyle (2/3)(19,537 − 9,05) ≈ 6,99. Fark her momentte aynı: (2/3)(0,05) ≈ 0,033.",
      "Enerjiyi kestir: E ≈ M₀/(2 × 10⁴) ≈ 1,72 × 10¹⁵ J; 1 t TNT = 4,184 × 10⁹ J ile yaklaşık 4,12 × 10⁵ t TNT. Bu sayının gerilme düşümüne bağlı bir yaklaşıklık olduğunu unutma.",
      "Kayma iki katına çıkarsa moment de iki katına çıkar: ΔM_w = (2/3) log₁₀ 2 ≈ 0,20. Sayfada dene: 03 sekmesi varsayılanken Ortalama kayma D kaydırıcısını 3,02 m'ye getir; M_w 7,16 olur. Kayma modülünü 60 GPa yapmak da aynı sonucu verir, çünkü M₀ yalnız μ·A·D çarpımına bakar."
    ],
    result:
      "M₀ ≈ 3,44 × 10¹⁹ N·m, M_w ≈ 6,96 (9,05 sabitiyle 6,99), E ≈ 1,72 × 10¹⁵ J. Kaymayı iki katına çıkarmak büyüklüğü yalnız 0,20 artırır; bir tam birim için momentin 31,6 kat büyümesi gerekir."
  },
  misconceptions: [
    {
      myth: "Büyüklük bir birim artınca deprem on kat güçlüdür.",
      truth:
        "On kat olan, Richter'in tanımındaki sismograf genliğidir. Moment ve yaklaşık yayılan enerji her birimde 10^1,5 ≈ 31,6 kat büyür, iki birimde 1000 kat. 03 sekmesinde referansı kaydedip fayı √10 kat büyüt: oran 31,62 kat çıkar."
    },
    {
      myth: "Aynı büyüklükteki iki deprem her yerde aynı sarsıntıyı yapar.",
      truth:
        "Büyüklük kaynağın bir özelliğidir. Bir yerde hissedilen sarsıntı uzaklığa, odak derinliğine, zeminin cinsine ve kırılmanın yönüne de bağlıdır; bu yüzden aynı büyüklükteki iki deprem çok farklı etki bırakabilir."
    },
    {
      myth: "S gölgesi, dış çekirdeğin sıvı olduğunu tek başına kanıtlar.",
      truth:
        "Gölge yalnız S dalgasını geçirmeyen bir katman olduğunu gösterir. Dış çekirdeğin sıvı olduğu sonucu başka gözlemlerle birlikte kurulmuştur; sayfa da bu ayrımı açıkça yazar."
    },
    {
      myth: "Ortalama 50 yılda bir olan deprem 49 yıldır olmadıysa artık \"vakti gelmiştir\".",
      truth:
        "Poisson modelinde olaylar bellek taşımaz: gelecek yılın olasılığı, geçen süreden bağımsız olarak 1 − e^(−λ) ≈ %2'dir. Gerçek faylar bu modelden sapabilir, ama hiçbir istatistik modeli tek başına bir depremin zamanını söylemez."
    }
  ],
  glossary: [
    { term: "P dalgası", definition: "Parçacıkların yayılma yönünde ileri geri gittiği sıkışma dalgası; katı, sıvı ve gazda yayılır ve ilk varan dalgadır." },
    { term: "S dalgası", definition: "Parçacıkların yayılma yönüne dik gittiği kayma dalgası; hızı √(μ/ρ)'dur, kayma modülü sıfır olan sıvılarda yayılmaz." },
    { term: "Kayma modülü (μ)", definition: "Bir malzemenin biçim değişimine direnci; kayma geriliminin kayma açısına oranı, birimi pascal." },
    { term: "Merkez üssü", definition: "Depremin başladığı yerin (odağın) yer yüzeyindeki izdüşümü; sayfadaki konum hesabı odak derinliğini sıfır alır." },
    { term: "Sismik moment (M₀)", definition: "Kayma modülü, kayan fay alanı ve ortalama kaymanın çarpımı, μ·A·D; depremin fiziksel boyutunun ölçüsü, birimi N·m." },
    { term: "Moment büyüklüğü (M_w)", definition: "Sismik momentin logaritmasından tanımlanan, büyük depremlerde doymayan büyüklük; bir birim, momentte yaklaşık 31,6 kat demektir." },
    { term: "b değeri", definition: "Gutenberg–Richter yasasında log₁₀ N = a − bM doğrusunun eğimi; büyük ve küçük depremlerin göreli sıklığını verir." },
    { term: "Tamlık büyüklüğü (M_c)", definition: "Bir katalogda bunun üstündeki depremlerin hemen hepsinin kaydedildiği en küçük büyüklük; altında katalog eksiktir." }
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Sayfadaki iki ayrı tek boyutlu denklem, üç boyutta tek bir denklemden doğar. <strong>Sürekli Ortamlar Mekaniği</strong> ya da <strong>Elastisite</strong> dersinde Hooke yasasını Lamé sabitleriyle (λ = K − 2μ/3 ve μ) yazar, Newton'un yasasıyla birleştirip ρ ∂²<span class=vec>u</span>/∂t² = (λ + 2μ)∇(∇·<span class=vec>u</span>) − μ∇×∇×<span class=vec>u</span> denklemini elde edersin. Yer değiştirmeyi bir skaler potansiyelin gradyanı ve bir vektör potansiyelin rotasyoneli olarak ayırınca (Helmholtz ayrışımı) biri v_P, öbürü v_S hızıyla yayılan iki dalga denklemi çıkar: P hacim değiştirir ama dönmez, S döner ama hacim değiştirmez. <strong>Sismoloji</strong> ve <strong>Jeofizik</strong> derslerinde bu dalgaların katmanlı bir Yer'de kırılması (Snell yasası), seyahat zamanı eğrileri ve binlerce kayıttan hız yapısını çıkaran tomografi işlenir; konum belirleme de bir <strong>ters problem</strong> olarak, doğrusallaştırılmış en küçük karelerle çözülür.",
      "Gutenberg–Richter sekmesi bir <strong>Olasılık ve İstatistik</strong> dersinin ortasına düşer. Büyüklükler M_c üstünde üstel dağılıyorsa olabilirlik fonksiyonunu yazıp türevini sıfıra eşitlemek doğrudan Aki'nin b = log₁₀e/(<span class=ov>M</span> − M_c) formülünü verir; standart hatası b/√N'dir. Poisson süreci bekleme sürelerinin üstel dağılması ve belleksizlikle tanımlanır; 1 − e^(−λT) bunun en basit sonucudur. Gerçek tehlike çalışmaları bunun üstüne artçı kümelenmesini (Omori yasası), fay kayma hızlarını, jeodezik ölçümleri ve belirsizliğin açık hesabını ekler; sonuçlarını tahmin olarak değil, belirsizlik aralıklı olasılıklar olarak verir."
    ],
    topics: ["Elastisite ve Lamé sabitleri", "Helmholtz ayrışımı", "Seyahat zamanı ve tomografi", "Ters problemler", "Sismik moment tensörü", "En çok olabilirlik", "Poisson süreçleri"]
  },
  quiz: [
    {
      question: "Bir fayın uzunluğu, genişliği ve ortalama kayması ikişer katına çıkarsa (μ aynı), moment büyüklüğü M_w yaklaşık ne kadar artar?",
      options: ["0,2", "0,6", "1,0", "2,0"],
      answer: 1,
      explanation: "M₀ = μ·L·W·D olduğu için moment 2 × 2 × 2 = 8 kat büyür. M_w = (2/3) log₁₀ M₀ + sabit olduğundan ΔM_w = (2/3) log₁₀ 8 ≈ (2/3)(0,903) ≈ 0,60. Her boyutu √10 kat büyütmek ise 03 sekmesindeki gibi tam 1 birim verir."
    },
    {
      question: "Bir katalogda b'yi kestirirken M_c'yi gerçek tamlık büyüklüğünün altında seçersen Aki kestirimi nasıl yanılır?",
      options: ["b'yi büyük gösterir, çünkü küçük depremler fazla sayılır", "b'yi küçük gösterir, çünkü kaydedilmeyen küçük depremler ortalama büyüklüğü yükseltir", "Hiç etkilenmez, çünkü yalnız ortalama kullanılır", "Yalnız σ_b büyür, b değişmez"],
      answer: 1,
      explanation: "Aki kestiricisi b'yi ortalama büyüklüğün M_c'den uzaklığıyla bölerek bulur. M_c altındaki depremlerin bir kısmı katalogda yoksa ortalama büyüklük yapay olarak artar, payda büyür, b küçülür. 04 sekmesinde M_c 1,5'te 0,677 (−32,3 %) çıkar."
    },
    {
      question: "Model hızları v_P = 6,00 ve v_S = 3,50 km/s iken bir istasyonda S − P gecikmesi 10,85 s ölçülüyor. Depremin uzaklığı yaklaşık kaç km'dir?",
      options: ["38 km", "65 km", "91 km", "130 km"],
      answer: 2,
      explanation: "Δt = d/v_S − d/v_P'den d = Δt · v_P v_S/(v_P − v_S) = 10,85 s × (6,00 × 3,50/2,50) km/s = 10,85 × 8,4 ≈ 91 km. 02 sekmesindeki tabloda A istasyonu tam bu gecikmeyle 91,1 km gösterir."
    }
  ],
  next: [
    { href: "levha-tektonigi.html", title: "Levha Tektoniği: Yayılan Sırtlar, Manyetik Şeritler, Sıcak Noktalar ve İzostazi", why: "Depremleri doğuran levha hareketini ölç: deniz tabanı yaşından yayılma hızı, manyetik şeritler, sıcak nokta zincirleri ve izostazi." },
    { href: "dalga-superpozisyonu.html", title: "Dalga Süperpozisyonu: Girişim, Vuru ve Dalga Paketleri", why: "Sismik atmalar da dalgadır: iki dalganın toplamı, vuru ve bir atmanın dalga paketi olarak çözümlenmesi." },
    { href: "bilimsel-yontem-olcme-ve-belirsizlik.html", title: "Bilimsel Yöntem, Ölçme ve Belirsizlik: Basamak, Yayılım, Hata ve Uydurma", why: "Konum hesabındaki artıkların ve hız modeli hatasının arkası: sistematik ve rastgele hata, belirsizlik yayılımı ve grafik uydurma." },
    { href: "normal-dagilim.html", title: "Normal Dağılım ve Merkezi Limit Teoremi", why: "b kestiriminin ± σ_b'si ve benzetimin hata çubukları nereden gelir: standart hata, güven aralıkları ve kapsama oranı." }
  ],
  sources: [
    { title: "Wikipedia · Shadow zone", url: "https://en.wikipedia.org/wiki/Shadow_zone", note: "S gölgesi 104°'nin ötesi, P gölgesi 104°–140°; Oldham 1906 ve Gutenberg 1913 (İngilizce)." },
    { title: "Wikipedia · Moment magnitude scale", url: "https://en.wikipedia.org/wiki/Moment_magnitude_scale", note: "Kanamori'nin 9,1 yaklaşıklığı ve Hanks–Kanamori 1979 biçimi (9,05; dyn·cm'de 10,7), Wadati 1931, doyma, E ≈ M₀/(2 × 10⁴) yaklaşıklığı, Valdivia momenti (İngilizce)." },
    { title: "Wikipedia · Gutenberg–Richter law", url: "https://en.wikipedia.org/wiki/Gutenberg%E2%80%93Richter_law", note: "log₁₀ N = a − bM; 1944 Kaliforniya ve 1949 dünya çalışmaları, b'nin yaklaşık 0,5–2 aralığı (İngilizce)." },
    { title: "Wikipedia · Inge Lehmann", url: "https://en.wikipedia.org/wiki/Inge_Lehmann", note: "1936 tarihli \"P′\" makalesi ve 1929 Murchison depremi kayıtlarından iç çekirdek önerisi (İngilizce)." },
    { title: "USGS · M 7,6 – Kocaeli (Derince yakını), 17 Ağustos 1999", url: "https://earthquake.usgs.gov/earthquakes/eventpage/usp0009d4z", note: "USGS olay sayfası (M 7,6 mwc, 17 Ağustos 1999 00:01 UTC). Tablodaki öbür depremler de USGS kataloğuyla aynı: 1960 Şili 9,5; 1964 Alaska 9,2; 2004 Sumatra 9,1; 2011 Tōhoku 9,1; 6 Şubat 2023 Pazarcık 7,8 ve Elbistan 7,5 (İngilizce)." }
  ],
  revision: "Kasım 2026",
};
