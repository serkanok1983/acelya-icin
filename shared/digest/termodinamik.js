window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["termodinamik"] = {
  slug: "termodinamik",
  title: "Termodinamik: Isıyı İşe Çevirmenin Bedeli",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Isı enerjidir ama çevrimle çalışan hiçbir makine onu tamamen işe çeviremez. Bir gazı PV diyagramında adım adım yönet, birinci yasanın defterini tut; Carnot, Otto ve Stirling'in yüzde yüze neden ulaşamadığını ölç.",
  hook:
    "Dizel motorunda kıvılcım çakan bir buji yoktur. Piston havayı o kadar hızlı sıkıştırır ki duvarlarla ısı alışverişine pek zaman kalmaz; hava ateşten değil, üzerine yapılan işten ısınır ve püskürtülen yakıtı kendiliğinden tutuşturur. Isı vermeden ısıtmak mümkünse ısı ile sıcaklık aynı şey olabilir mi?",
  bigIdea:
    "Enerji korunur (ΔU = Q − W) ama her biçimi aynı değerde değildir: iki sıcaklık arasında çevrimle çalışan hiçbir makine aldığı ısının <strong>1 − T<sub>c</sub>/T<sub>h</sub></strong> oranından fazlasını işe çeviremez; kalanı soğuk tarafa ödenen bir vergidir.",
  story: [
    "Haziran 1824'te Paris'te, 28 yaşındaki bir Fransız askerî mühendisi 118 sayfalık bir kitabı kendi parasıyla 600 nüsha bastırdı: <em>Ateşin Hareket Ettirici Gücü Üzerine Düşünceler</em>. Sadi Carnot'nun sorusu, buhar makinelerinin sanayiyi dönüştürdüğü ama yaktıkları kömürün enerjisinin yalnızca yüzde birkaçını işe çevirebildiği bir çağda son derece pratikti: bir ısı kaynağından alınabilecek işin sınırı var mı, buharın yerine başka bir madde kullanmak işe yarar mı? Carnot, çağının yaygın görüşüyle ısıyı <strong>kalorik</strong> denen ağırlıksız bir akışkan sanıyordu ve makineyi bir su çarkına benzetti: su yüksekten alçağa düşerken çarkı nasıl döndürüyorsa, kalorik de sıcaktan soğuğa 'düşerken' pistonu itiyordu. Bu yanlış resimden yine de kalıcı bir sonuç çıkardı: aynı iki sıcaklık arasında hiçbir makine tersinir çalışan bir makineden verimli olamaz ve bu en yüksek verim çalışan maddeye değil, yalnızca iki sıcaklığa bağlıdır. Verimin formülünü ise yazamadı; mutlak sıcaklık ölçeği henüz yoktu.",
    "Kitap pek ilgi görmedi ve kısa sürede raflardan kayboldu. Carnot 1832'de, 36 yaşında koleradan öldü; kardeşi Hippolyte kişisel kâğıtlarının çoğunu yok etti. Onu unutulmaktan 1834'te mühendis Émile Clapeyron kurtardı: Carnot'nun sözle anlattığı çevrimi, bugün bu sayfada kullandığın basınç-hacim diyagramına çizdi. William Thomson ve Rudolf Clausius, Carnot'yu bu makale sayesinde tanıdı. Hippolyte'in 1878'de yayımladığı not seçkisi ise bir sürpriz saklıyordu: Carnot 1832 baharına gelmeden kalorik kuramından vazgeçmiş, ısıyı 'biçim değiştirmiş hareket' diye tanımlamış ve bir kilokalorinin, 1 kilogramı yaklaşık 370 metre yükseltecek işe denk geldiğini hesaplamıştı. Bugünkü değer 427 metredir. Carnot bunu hiç yayımlamadı.",
    "Isının bir akışkan değil enerjinin bir biçimi olduğunu başkaları gösterdi. Alman hekim Julius Robert Mayer, kendi anlattığına göre 1840 yazında Cava'da bir Hollanda gemisinin hekimiyken hasta denizcilerden aldığı toplardamar kanının şaşırtıcı biçimde açık kırmızı olduğunu gördü ve sıcak iklimde vücudun kendini ısıtmak için daha az 'yaktığını' düşündü. 1842'de, Fransız deneylerinden bilinen, havanın sabit basınçta ve sabit hacimdeki ısı sığaları arasındaki farktan, yani bugün C<sub>p</sub> − C<sub>v</sub> = R diye yazdığımız bağıntıdan, ısının mekanik eşdeğerini hesapladı; bulduğu değer bugünkünden yaklaşık yüzde on beş küçüktü. Salford'lu zengin bir bira üreticisinin oğlu James Prescott Joule ise 1840'larda düşen ağırlıklarla yalıtılmış bir su kabında kanatlı bir çark döndürdü ve suyun ısınmasını Fahrenheit derecesinin iki yüzde birine kadar okuyabildiğini söyledi; 1850'de yayımladığı değer bugünkünden yüzde birden az sapar. 1847'de Hermann von Helmholtz enerjinin korunumunu genel bir ilke olarak yazdı.",
    "Geriye bir bilmece kalıyordu: ısı korunmuyorsa, ısıyı korunan bir akışkan sayan Carnot nasıl haklı olabilirdi? William Thomson (sonradan Lord Kelvin) 1848'de Carnot'nun kuramına dayanan mutlak bir sıcaklık ölçeği önerdi, ama aynı yazıda ısının işe dönüşmesinin 'muhtemelen imkânsız, kesinlikle keşfedilmemiş' olduğunu yazıyordu. Düğümü 1850'de Rudolf Clausius çözdü: makine aldığı ısının bir kısmını işe çevirir, kalanını soğuk tarafa bırakmak zorundadır. 1854'te ilkeyi bugün bilinen biçimine soktu: ısı, başka hiçbir değişiklik olmadan soğuk bir cisimden sıcak bir cisme geçemez. 1865'te de δQ/T toplamından doğan niceliğe, Yunanca 'dönüşüm' demek olan <em>tropē</em>'den ve bilerek 'enerji'ye benzeterek <strong>entropi</strong> adını verdi. Makalesini iki cümleyle bitirdi: 'Evrenin enerjisi sabittir. Evrenin entropisi bir maksimuma yönelir.' S harfini neden seçtiğini ise hiç yazmadı; Sadi Carnot'nun onuruna seçildiği yolundaki yaygın hikâyenin bir dayanağı yok.",
  ],
  core: [
    {
      heading: "İş, eğrinin altındaki alandır",
      body:
        "Silindirdeki gaz, alanı A olan pistonu dx kadar iterse yaptığı iş F·dx = (P·A)·dx = P·dV olur. Genleşme boyunca bu küçük işleri toplamak, PV diyagramında eğrinin altındaki alanı hesaplamaktır. Genleşmede alan pozitiftir (gaz iş yapar), sıkışmada negatiftir (iş gaza yapılır), hacim sabitse iş sıfırdır. Asıl önemli sonuç şudur: aynı iki durum arasında sayısız eğri çizilebilir ve altlarındaki alanlar genelde birbirini tutmaz. Bu yüzden iş, gazın 'sahip olduğu' bir şey değil, bir yolun özelliğidir. Basınç, hacim, sıcaklık ve iç enerji ise yalnızca o anki duruma bağlıdır; bunlara <strong>durum fonksiyonu</strong> denir. Bir çevrimde gaz başladığı yere döner ama çevrelediği alan kadar net iş yapmış olur.",
      formula: "W = ∫<sub>V₁</sub><sup>V₂</sup> P dV",
      formulaNote:
        "İzotermal ideal gazda P = nRT/V ve W = nRT·ln(V₂/V₁): 1 mol, 300 K, 10 L → 20 L için 2494.2 J × ln 2 = 1728.8 J.",
    },
    {
      heading: "Birinci yasa: enerjinin muhasebesi",
      body:
        "Gaza giren ısı iki yere gidebilir: iç enerjiyi artırır ya da gazın dışarıya yaptığı işe harcanır. <strong>Birinci yasa</strong> bu bilançoyu yazar ve enerjinin korunumundan başka bir şey değildir. İşaret kuralı önemlidir: bu sayfada ve çoğu fizik kitabında Q gaza giren ısı, W gazın yaptığı iştir. Kimya kitaplarının çoğu ise ΔU = q + w yazar; oradaki w gaza yapılan iştir. Fizik aynıdır, yalnızca işaret farklıdır. İdeal gazda moleküller birbirini çekip itmediği için iç enerji yalnızca sıcaklığa bağlıdır: U = nC<sub>v</sub>T. Tek atomlu gazda mol başına C<sub>v</sub> = 3/2 R'dir; iki atomlu moleküller dönme hareketinde de enerji taşıdığı için oda sıcaklığında 5/2 R. Sabit basınçta ısıtılan gaz genleşirken iş de yaptığından aynı ısınma için daha çok ısı ister: C<sub>p</sub> = C<sub>v</sub> + R (Mayer bağıntısı).",
      formula: "ΔU = Q − W",
      formulaNote:
        "Q > 0: gaza ısı girer; W > 0: gaz genleşip iş yapar. Sayfanın tablosunda 'Q − W' sütunu her satırda ΔU'ya eşit çıkar; izobarik satırda bu eşitlik Cp − Cv = R bağıntısının sınavıdır.",
    },
    {
      heading: "Dört süreç ve adyabatın türetilişi",
      body:
        "Sayfadaki dört süreç birer kısıt koyar. <strong>İzotermalde</strong> T sabittir, ΔU = 0 ve Q = W = nRT·ln(V₂/V₁). <strong>İzokorikte</strong> V sabittir, W = 0 ve Q = ΔU = nC<sub>v</sub>ΔT. <strong>İzobarikte</strong> P sabittir, W = PΔV ve Q = nC<sub>p</sub>ΔT. <strong>Adyabatikte</strong> Q = 0'dır, yani dU = −P dV: nC<sub>v</sub>dT = −(nRT/V)dV. Değişkenleri ayırınca dT/T = −(R/C<sub>v</sub>)·dV/V çıkar; integral alınca ln T + (γ − 1)·ln V = sabit, yani TV<sup>γ−1</sup> sabittir. PV = nRT ile birleştirince PV<sup>γ</sup> = sabit bulunur; burada γ = C<sub>p</sub>/C<sub>v</sub>. Genleşen gazın basıncı adyabatta hem hacim büyüdüğü hem de gaz soğuduğu için düşer; bu yüzden adyabat, aynı noktadan geçen izotermden γ kat diktir. Sayfadaki PV<sup>γ</sup> göstergesi adyabatik adım boyunca kıpırdamaz.",
      formula: "PV<sup>γ</sup> = sabit   ·   TV<sup>γ−1</sup> = sabit",
      formulaNote:
        "R/Cv = γ − 1 olduğundan iki biçim aynı bilgiyi taşır. γ tek atomlu ideal gazda 5/3, iki atomluda 7/5'tir.",
    },
    {
      heading: "Isı makineleri, ikinci yasa ve Carnot sınırı",
      body:
        "Bir <strong>ısı makinesi</strong> sıcak bir kaynaktan Q<sub>h</sub> ısısı alır, W kadar iş yapar, kalan Q<sub>c</sub>'yi soğuk bir kaynağa bırakır ve başladığı duruma döner. Verimi η = W/Q<sub>h</sub> = 1 − Q<sub>c</sub>/Q<sub>h</sub>'dir. Birinci yasa Q<sub>c</sub> = 0'ı yasaklamaz; yasaklayan <strong>ikinci yasadır</strong>. Kelvin–Planck biçimi: çevrimle çalışan hiçbir makine tek bir kaynaktan aldığı ısının tamamını işe çeviremez. Clausius biçimi: ısı kendiliğinden soğuktan sıcağa geçmez. İki ifade eşdeğerdir. Dikkat: tek bir izotermal genleşme ısının tamamını işe çevirir (sayfada Q = W = 1728.8 J); yasak olan bunu bir çevrimde sürdürmektir, çünkü gazı geri sıkıştırırken ısının bir kısmını soğuk tarafa vermek gerekir. Carnot çevrimi ısıyı yalnızca iki kaynağın sıcaklıklarında alıp verir; ideal gazda iki adyabat V₃/V₄ = V₂/V₁ verdiği için Q<sub>c</sub>/Q<sub>h</sub> = T<sub>c</sub>/T<sub>h</sub> çıkar. Daha verimli bir makine olsaydı onu ters çalışan bir Carnot makinesine bağlayıp ısıyı bedavaya soğuktan sıcağa taşırdık.",
      formula: "η<sub>Carnot</sub> = 1 − T<sub>c</sub>/T<sub>h</sub>",
      formulaNote:
        "Sıcaklıklar kelvin cinsinden. 600 K ile 300 K arasında en fazla yüzde 50; soğuk kaynak 0 K olmadıkça yüzde 100 yoktur. Çalışan madde formülde yer almaz.",
    },
    {
      heading: "Entropi ve TS diyagramı",
      body:
        "Carnot çevriminde Q<sub>h</sub>/T<sub>h</sub> = |Q<sub>c</sub>|/T<sub>c</sub> çıkar: ısı sıcaklığa bölünürse tersinir çevrim boyunca toplamı sıfırdır. Clausius 1850'lerde bunu her tersinir çevrime genelledi, 1865'te de bu niceliğe <strong>entropi</strong> adını verdi. δQ yola bağlıdır, ama tersinir bir yolda 1/T ile çarpılınca bir durum fonksiyonunun değişimine dönüşür; sayfanın 'S − S₁' göstergesi ideal gaz için bunu hesaplar. Sıcaklık–entropi (TS) diyagramında tersinir bir eğrinin altındaki alan ∫T dS = Q'dur: izotermler yatay, adyabatlar dikey çizgidir ve Carnot çevrimi bir dikdörtgene dönüşür. Bu diyagram her tersinir çevrimi bir Carnot makinesine benzetir: gaz ısıyı ortalama T̄<sub>al</sub> sıcaklığında alıp T̄<sub>ver</sub>'de veriyorsa (T̄ = Q/ΔS), verim 1 − T̄<sub>ver</sub>/T̄<sub>al</sub> olur. Tersinmez bir çevrimde ise ∮δQ/T &lt; 0'dır, T ısının alınıp verildiği kaynağın sıcaklığıdır (<strong>Clausius eşitsizliği</strong>); yalıtılmış bir sistemin entropisi artar. Sayfa yalnızca tersinir adımlar kurar; gördüğün ΔS gazın kendi entropi değişimidir, evreninki değil.",
      formula: "ΔS = ∫ (δQ/T)<sub>tersinir</sub> = nC<sub>v</sub>·ln(T₂/T₁) + nR·ln(V₂/V₁)",
      formulaNote:
        "İkinci eşitlik ideal gaz içindir. 10 L, 300 K'den 20 L, 600 K'e hangi yoldan gidilirse gidilsin: 12.471 J/K × ln 2 + 8.314 J/K × ln 2 = 14.41 J/K.",
    },
  ],
  lab: {
    intro:
      "Sayfa, ideal bir gazı adım adım yönettiğin bir laboratuvardır. <strong>Gaz ve başlangıç</strong> panelinde gaz türünü (tek ya da iki atomlu), madde miktarını, başlangıç hacmini ve sıcaklığını seçersin. <strong>Süreç adımı</strong> panelinde dört süreçten birini seçip hedef hacmi (izokorikte hedef sıcaklığı) kaydırıcıyla ya da PV diyagramında sürükleyerek belirlersin; önizleme kutusu W, Q, ΔU ve ΔS'yi daha <em>Uygula</em>'ya basmadan gösterir. Uygulanan her adım 'Adımlar ve birinci yasa' tablosuna bir satır ekler; <em>Başlangıca dön</em> yolu bir ya da iki adımla kapatır. <strong>Hazır çevrimler</strong> paneli Carnot, Otto ve rejeneratörsüz Stirling çevrimlerini kurar ve oynatır. İş göstergeleri, birinci yasanın 384 alt adımlı Runge–Kutta (RK4) tümlemesiyle 'ölçülen' ∫P dV'yi kapalı formülle karşılaştırır. Bağıl fark en fazla 10<sup>−10</sup> mertebesindedir, bu yüzden Fark göstergesi 0.00 % yazar (izokorik adımda iş sıfır olduğundan '—'). Model idealdir: ideal gaz, sabit ısı sığaları, sürtünmesiz ve tersinir adımlar. Deneyler varsayılan ayarlarla başlar (tek atomlu gaz, 1.0 mol, 10.00 L, 300.0 K); emin değilsen sayfayı yenile.",
    experiments: [
      {
        title: "Aynı genleşme, iki yol: izotermal ve adyabatik",
        predict:
          "Gaz 10 L'den 20 L'ye iki ayrı yoldan genleşecek: sıcaklığı sabit tutularak ve yalıtılmış hâlde. Hangisi daha çok iş yapar? Isı alamayan gaz işi nereden öder, sıcaklığına ne olur?",
        do: "Süreç İzotermal iken hedef hacim kaydırıcısını 20.00 L'ye getir ve önizleme kutusunu oku. Sonra Süreç'i Adyabatik yap, hedefi yeniden 20.00 L'ye getir ve <em>Uygula</em>'ya bas. Animasyon bitince Gaz türü menüsünden İki atomlu'yu seç: adım aynı hedefle yeniden hesaplanır.",
        observe:
          "İzotermal önizleme: W = +1728.8 J, Q = +1728.8 J, ΔU = 0.0 J, P₂ = 124.7 kPa. Adyabatik: W = +1384.4 J, Q = 0.0 J, ΔU = −1384.4 J. Önizleme notu ölçümle kuramı yan yana koyar: sayısal tümleme T₂ = 188.99 K, formül de 188.99 K verir. Animasyon bitince basınç 78.6 kPa'dır, U 3741.3 J'den 2356.9 J'e düşmüştür, PV<sup>γ</sup> ise 11577 kPa·L<sup>γ</sup>'da kalır. İki atomlu gazda aynı adım 227.4 K'de biter ve W = +1509.9 J olur.",
        explain:
          "İzotermde ΔU = 0, işin tamamını dışarıdan giren ısı öder. Adyabatta Q = 0, bu yüzden W = −ΔU: gaz pistonu kendi iç enerjisiyle iter ve soğur. Basınç hem hacim büyüdüğü hem gaz soğuduğu için daha hızlı düşer; alan küçülür. Sıcaklık TV<sup>γ−1</sup> sabitinden çıkar: 300 K × 2<sup>−2/3</sup> = 189.0 K, iki atomlu gazda 300 K × 2<sup>−0.4</sup> = 227.4 K. İki atomlu molekül dönmeye de enerji ayırdığı için kelvin başına daha çok enerji bırakır: daha az soğur, basıncı yüksek kalır, daha çok iş yapar.",
      },
      {
        title: "Aynı iki uç, üç farklı yol",
        predict:
          "Gazı A (10 L, 300 K) durumundan B (20 L, 600 K) durumuna üç ayrı yoldan götüreceksin. Tablonun Toplam satırında W, Q, ΔU ve ΔS'den hangileri üç yolda da aynı çıkar?",
        do: "Gaz türünü yeniden Tek atomlu yap ve <em>Temizle</em>'ye bas. Yol 1: Süreç İzobarik, hedef 20.00 L, <em>Uygula</em>; Toplam satırını not et, <em>Temizle</em>. Yol 2: İzotermal 20.00 L, <em>Uygula</em>; sonra İzokorik, hedef sıcaklık 600.0 K, <em>Uygula</em>. Yine <em>Temizle</em>. Yol 3: önce İzokorik 600.0 K, sonra İzotermal 20.00 L.",
        observe:
          "Toplam W sırasıyla +2494.2, +1728.8 ve +3457.7 J; Toplam Q +6235.5, +5470.1 ve +7199.0 J. ΔU ise üç yolda da +3741.3 J, ΔS +14.41 J/K. Her yolun sonunda göstergeler aynıdır: 249.4 kPa, 600.0 K, U = 7482.6 J, S − S₁ = +14.41 J/K.",
        explain:
          "U ve S durum fonksiyonudur; yalnızca başlangıca ve bitişe bakarlar. W ise PV diyagramındaki eğrinin altındaki alandır: önce ısıtıp yüksek basınçta genleşen üçüncü yol en büyük alanı süpürür. Q = ΔU + W olduğundan ısı da yola bağlıdır. Bu yüzden 'gazın içinde ne kadar ısı var?' sorusunun cevabı yoktur; anlamlı soru 'ne kadar iç enerji var?' sorusudur.",
      },
      {
        title: "Kendi ısı makineni kur: dikdörtgen çevrim",
        predict:
          "Gaz iki izobar ve iki izokorla bir dikdörtgen çizip başladığı yere dönecek. Net iş nereden okunur, ΣΔU ve ΣΔS ne olur? En yüksek sıcaklık 600 K, en düşük 150 K olacak: verim bu iki sıcaklığın Carnot sınırına yaklaşır mı?",
        do: "Gaz tek atomluyken <em>Temizle</em>'ye bas. İzobarik 20.00 L, <em>Uygula</em>; İzokorik 300.0 K, <em>Uygula</em>; İzobarik 10.00 L, <em>Uygula</em>. Sonra <em>Başlangıca dön</em> düğmesine bas: sayfa kapanış için gereken izokorik adımı kendisi ekler.",
        observe:
          "Durum satırı 'Başlangıca 1 adımda dönüldü: net iş +1247.1 J.' der. Toplamda ΔU = 0.0 ve ΔS = 0.00, ΣW = ΣQ = +1247.1 J; ∮P dV de +1247.1 J. Çevrim kutusu: alınan ısı +8106.1 J, verim 15.38 %, Carnot sınırı 75.00 %. Boyanan dikdörtgenin alanı (124.7 kPa × 10 L) tam bu net iştir; ortasındaki etiket 'Net iş +1247.1 J' yazar.",
        explain:
          "Kapalı yolda durum fonksiyonları başa döner; net iş çevrelenen alandır ve birinci yasa gereği net ısıya eşittir. Ama verim alınan ısıyla hesaplanır: gaz 8106.1 J alır, 6859.1 J'ünü geri verir. Isı alan iki satırın ΔS toplamı 14.41 + 8.64 = 23.05 J/K'dir; demek ki gaz ısıyı ortalama 8106.1/23.05 ≈ 351.7 K'de alıp 6859.1/23.05 ≈ 297.6 K'de verir. 1 − 297.6/351.7 = 15.38 %: verimi uç sıcaklıklar değil, bu ortalamalar belirler.",
      },
      {
        title: "Carnot, Otto ve Stirling: verim neye bağlı?",
        predict:
          "600 K ile 300 K arasındaki Carnot verimi gaz türüyle değişir mi? Sıkıştırma oranı 8 olan Otto çevriminde tek ve iki atomlu gaz aynı verimi verir mi? Yanma ısısını iki katına çıkarmak Otto'nun verimini artırır mı?",
        do: "Gaz tek atomluyken Hazır çevrimler panelinde Çevrim = Carnot seçip <em>Çevrimi kur</em>'a bas, sonra Gaz türü'nü İki atomlu yap. Çevrim'i Otto yapıp <em>Çevrimi kur</em>'a bas (r = 8.0, Q<sub>in</sub> = 3000 J), ardından gazı Tek atomlu'ya çevir ve Yanma ısısı kaydırıcısını 6000 J'e getir. En sonda Stirling'i kur.",
        observe:
          "Carnot iki gazda da 50.00 %, net iş +1728.8 J; iki atomlu gazda adyabatlar uzar ve soğuk izoterm sağa kayar (en büyük hacim 28.28 L yerine 56.57 L), izotermlerin işi değişmez. Otto iki atomlu gazla 56.47 % (Carnot sınırı 64.01 %), tek atomluyla 75.00 % (79.17 %). 6000 J'de net iş +4500.0 J'e çıkar, verim 75.00 % kalır, Carnot sınırı ise 82.15 % olur. Stirling: 36.75 %, sınır 50.00 %. TS diyagramında Carnot bir dikdörtgendir.",
        explain:
          "Carnot verimi yalnızca iki kaynağın sıcaklığına bağlıdır; çalışan madde formülde yoktur. Otto verimi 1 − r<sup>1−γ</sup> yalnızca r ve γ'ya bağlıdır. Otto ısıyı tek bir sıcaklıkta değil, sabit hacimde ısınırken bir sıcaklık aralığında alır; bu yüzden kendi uç sıcaklıklarının Carnot sınırına ulaşamaz. Fazla yakıt tepe sıcaklığını ve sınırı yükseltir, ama ısının ortalama veriliş ve alınış sıcaklıklarının oranı r<sup>1−γ</sup>'da kalır. Rejeneratörsüz Stirling ise soğurken verdiği ısıyı ısınırken yeniden satın alır.",
      },
    ],
  },
  wow: [
    {
      title: "Bir derece, 427 metre",
      body:
        "1 kg suyu 1 °C ısıtan 4186 J, aynı kilogramın 427 metreden düşerken kaybettiği potansiyel enerjiye eşittir. Demek ki şelalenin dibindeki su tepesindekinden yalnızca biraz daha sıcaktır: 100 metrelik düşüşte en fazla yaklaşık 0.23 °C. Anlatıldığına göre Joule, 1847'deki balayında Alplerde William Thomson'la karşılaşınca ikisi Sallanches şelalesinin tepesi ile dibi arasındaki sıcaklık farkını ölçmeyi planladı; deneme pratik olmadığı için yapılamadı. Mayer'in ilk tahmini 365 metre, Carnot'nun yayımlanmamış notlarındaki değer 370 metreydi.",
    },
    {
      title: "Bu diyagram bir fabrika aletiydi",
      body:
        "PV diyagramı ders kitabında doğmadı. 1796'da James Watt ve çalışanı John Southern bir buhar makinesine ölçüm düzeneği taktı: pistonla birlikte kayan bir levha hacmi, ona dik yönde oynayan basınç göstergesinin kalemi de basıncı çiziyordu. Makine çalışırken kâğıtta kendiliğinden kapalı bir eğri belirir, eğrinin çevrelediği alan her turda yapılan işi verirdi. Watt bu 'indikatör diyagramı' sayesinde makinelerini köklü biçimde iyileştirdi ve yöntemi uzun süre ticari sır olarak sakladı; 1834'te Clapeyron aynı çizimi Carnot'nun hayalî makinesine uyguladı. Bu sayfadaki PV diyagramı o kâğıdın torunudur.",
    },
    {
      title: "Carnot'dan sekiz yıl önce bir ısı geri dönüştürücü",
      body:
        "İskoç din adamı Robert Stirling 1816'da bir sıcak hava makinesinin patentini aldı. Patent, 'ekonomizör' dediği bir ısı deposunu da tarif ediyordu: gaz sıcak taraftan soğuk tarafa geçerken ısısını bu depoya bırakır, dönüşte geri alır. Bugün adı <strong>rejeneratördür</strong>. Sayfanın 'Stirling (rejeneratörsüz)' çevrimi bu parçanın değerini ölçer: 600 K ile 300 K arasında, tek atomlu gaz ve r = 8 ile verim 36.75 %. Tablodaki 3741.3 J'lük izokorik ısı geri dönüştürülseydi verim 5186.5 / 10373.1 = 50.00 % olurdu: tam Carnot sınırı.",
    },
  ],
  worked: {
    title: "Bir Otto çevrimini baştan sona hesaplamak",
    prompt:
      "Nicolaus Otto'nun 1876'da çalıştırdığı dört zamanlı motorun ideal modeli Otto çevrimidir. 1 mol iki atomlu ideal gaz (C<sub>v</sub> = 5/2 R = 20.785 J/(mol·K), γ = 1.4) emme sonunda V₁ = 20 L ve T₁ = 300 K'dedir; sıkıştırma oranı r = 8, yanma ise hacim sabitken gaza Q<sub>in</sub> = 3000 J ısı verir. Dört köşenin sıcaklıklarını, adımların iş ve ısısını, net işi ve verimi bul; sonucu çevrimin uç sıcaklıkları arasındaki Carnot sınırıyla karşılaştır.",
    steps: [
      "Adyabatik sıkışma (1 → 2): TV<sup>γ−1</sup> sabit olduğundan T₂ = T₁·r<sup>γ−1</sup> = 300 K × 8<sup>0.4</sup> = 300 K × 2.2974 = 689.22 K. Q = 0, bu yüzden W₁₂ = −ΔU = −nC<sub>v</sub>(T₂ − T₁) = −(20.785 J/K)(389.22 K) = −8089.9 J. Eksi işaret pistonun gaza iş yaptığını söyler.",
      "Yanma (2 → 3), V sabit: W₂₃ = 0 ve Q<sub>in</sub> = nC<sub>v</sub>(T₃ − T₂), buradan T₃ = 689.22 K + (3000 J)/(20.785 J/K) = 689.22 K + 144.33 K = 833.55 K. P = nRT/V ile basınç 2.50 L'de 2292 kPa'dan 2772 kPa'ya, yani yaklaşık 23 atmosferden 27 atmosfere çıkar.",
      "Adyabatik genleşme (3 → 4): aynı oranla T₄ = T₃/r<sup>γ−1</sup> = 833.55 K / 2.2974 = 362.82 K; gaz soğurken pistona W₃₄ = nC<sub>v</sub>(T₃ − T₄) = (20.785 J/K)(470.73 K) = +9784.1 J iş yapar. Isı atımı (4 → 1), V sabit: iki adyabat aynı oranı taşıdığı için T₄ − T₁ = (T₃ − T₂)/r<sup>γ−1</sup>, yani Q<sub>out</sub> = −Q<sub>in</sub>/r<sup>γ−1</sup> = −3000 J / 2.2974 = −1305.8 J.",
      "Bilanço: W<sub>net</sub> = −8089.9 J + 9784.1 J = +1694.2 J. Birinci yasayla denetle: Q<sub>in</sub> + Q<sub>out</sub> = 3000.0 J − 1305.8 J = +1694.2 J ve ΣΔU = 0. Verim η = 1694.2/3000 = 0.5647. Genel biçim bir önceki adımdan çıkar: |Q<sub>out</sub>|/Q<sub>in</sub> = r<sup>1−γ</sup>, yani η = 1 − r<sup>1−γ</sup> = 1 − 1/2.2974 = 0.5647. Q<sub>in</sub> sonuçta yer almaz.",
      "Karşılaştır: en sıcak nokta 833.55 K, en soğuk 300 K; Carnot sınırı 1 − 300/833.55 = 0.6401. Otto bunun altında kalır, çünkü ısıyı 689 K ile 834 K arasında alır, 363 K ile 300 K arasında verir. Isı girerken ΔS = nC<sub>v</sub> ln(T₃/T₂) = 3.952 J/K'dir; ortalama alış sıcaklığı 3000/3.952 ≈ 759.1 K, ortalama veriş sıcaklığı 1305.8/3.952 ≈ 330.4 K ve 1 − 330.4/759.1 = 0.5647. Otto, bu iki ortalama arasında çalışan bir Carnot makinesi kadar verimlidir.",
    ],
    result:
      "η ≈ yüzde 56.5: her çevrimde 1694 J iş, 1306 J atık ısı. Sayfada Gaz türü = İki atomlu, Çevrim = Otto (r = 8.0, yanma ısısı 3000 J, emme sıcaklığı 300 K) seçip <em>Çevrimi kur</em>'a bas: tablo bu dört satırı, çevrim göstergeleri 56.47 % verim ve 64.01 % Carnot sınırı gösterir. Verim yanma ısısına değil yalnızca r ve γ'ya bağlıdır; Q<sub>in</sub>'i iki katına çıkarmak net işi iki katına çıkarır, verimi değiştirmez. Gerçek benzinli motorlar sürtünme, silindir duvarlarına ısı kaybı, sonlu hızda yanma ve yüksek sıcaklıkta düşen γ yüzünden bu idealin epey altında çalışır.",
  },
  misconceptions: [
    {
      myth: "Isı ile sıcaklık aynı şeydir; sıcak bir cisim çok ısı içerir.",
      truth:
        "Sıcaklık bir durum niceliğidir; ısı ise sıcaklık farkı yüzünden sınırdan geçen enerjidir ve hiçbir cismin içinde depolanmaz. Cismin içinde olan iç enerjidir. Sayfada ikisi kolayca ayrışır: izotermal genleşmede gaza +1728.8 J ısı girer ama sıcaklık 300.0 K'de kalır; adyabatik sıkışmada hiç ısı girmez ama 10 L'den 5 L'ye itilen tek atomlu gaz 476.2 K'e ısınır.",
    },
    {
      myth: "Adyabatik genleşen gaz ısı alıp vermediği için sıcaklığını korur.",
      truth:
        "Q = 0, ΔT = 0 demek değildir; birinci yasa ΔU = −W der. Genleşen gaz pistonu iterken harcadığı enerjiyi kendi iç enerjisinden öder ve soğur: 10 L'den 20 L'ye adyabatik genleşen tek atomlu gaz 300.0 K'den 189.0 K'e iner. Sıcaklığın sabit kalması için tersine dışarıdan ısı vermek gerekir; o süreç izotermaldir. Yükselen hava da basıncı düştükçe genleşir ve bu yolla soğur: kuru hava her kilometrede yaklaşık 9.8 °C (g/c<sub>p</sub>) kaybeder, nemi yoğuşunca bulut belirir.",
    },
    {
      myth: "Yüzde yüz verim yalnızca bir mühendislik sorunudur; sürtünme ve ısı kaçağı yok edilirse ulaşılır.",
      truth:
        "Sayfadaki model zaten sürtünmesiz ve tersinirdir; yine de 600 K ile 300 K arasındaki Carnot çevrimi her turda aldığı 3457.7 J'ün yalnızca yarısını işe çevirir, 1728.8 J soğuk kaynağa gitmek zorundadır. Bu sınır ikinci yasadan gelir: yüzde yüz için soğuk kaynağın 0 K olması gerekir ve mutlak sıfıra sonlu sayıda adımla ulaşılamaz. Mühendislik ancak gerçek makineyi bu sınıra yaklaştırabilir.",
    },
    {
      myth: "İkinci yasaya göre entropi hiçbir zaman azalmaz.",
      truth:
        "Yasa yalıtılmış bir sistemin toplam entropisi için konuşur. Carnot çevriminin 3 → 4 adımında gazın entropisi 5.76 J/K azalır, ama aynı miktar soğuk kaynağa geçer: 1728.8 J / 300 K = 5.76 J/K. Tersinir adımda toplam değişim sıfırdır, gerçek süreçlerde pozitiftir. Buzdolabı da böyle çalışır: içerisi soğurken entropisi azalır, mutfağa atılan ısı daha büyük bir artış getirir.",
    },
  ],
  glossary: [
    {
      term: "Durum fonksiyonu",
      definition:
        "Değeri yalnızca sistemin o anki denge durumuna bağlı olan nicelik (P, V, T, U, S); iki durum arasındaki değişimi izlenen yoldan bağımsızdır.",
    },
    {
      term: "İç enerji (U)",
      definition:
        "Moleküllerin hareket ve etkileşim enerjilerinin toplamı; ideal gazda yalnızca sıcaklığa bağlıdır: U = nC<sub>v</sub>T.",
    },
    {
      term: "Isı (Q)",
      definition:
        "Sıcaklık farkı yüzünden sistem sınırından geçen enerji; bir süreçte aktarılır, bir cisimde depolanmaz. Bu sayfada gaza giren ısı pozitif sayılır.",
    },
    {
      term: "Tersinir süreç",
      definition:
        "Her an dengeye çok yakın (yarı-durgun), sürtünmesiz ve sonlu sıcaklık farkı içermeyen süreç; koşullardaki küçük bir değişiklikle geri çevrilebilir. Sayfa bütün adımları böyle varsayar.",
    },
    {
      term: "Adyabatik süreç",
      definition: "Sistemle çevresi arasında ısı alışverişi olmayan süreç (Q = 0); iç enerji yalnızca işle değişir.",
    },
    {
      term: "Adyabatik üs (γ)",
      definition:
        "Sabit basınçtaki ve sabit hacimdeki molar ısı sığalarının oranı, γ = C<sub>p</sub>/C<sub>v</sub>; tek atomlu ideal gazda 5/3, iki atomluda 7/5.",
    },
    {
      term: "Isı kaynağı (rezervuar)",
      definition:
        "Isı alıp verdiğinde sıcaklığı değişmeyecek kadar büyük cisim; Carnot çevriminin sıcak ve soğuk tarafları.",
    },
    {
      term: "Entropi (S)",
      definition:
        "Tersinir bir yolda δQ/T toplanarak bulunan durum fonksiyonu; yalıtılmış bir sistemde kendiliğinden süreçler onu artırır, tersinir süreçler sabit tutar.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede ısı ve iş birer sayıdır; üniversitede küçük adımların toplamı olarak yazılırlar ve sembolleri bile farklıdır: dU ama δQ ve δW. dU <em>tam</em> bir <strong>diferansiyeldir</strong>: kapalı bir yol boyunca integrali sıfırdır. δQ ve δW ise tam değildir, integralleri yola bağlıdır; 'aynı uçlar, farklı yollar' deneyi bunun sayısal kanıtıdır. Şaşırtıcı olan şu: tersinir δQ'yu T'ye bölünce tam bir diferansiyel elde edilir. 1/T bir <em>integrasyon çarpanıdır</em> ve ortaya çıkan fonksiyon entropidir. Buradan termodinamiğin temel denklemi dU = T dS − P dV doğar. Fizik I–II'de tanıştığın yasalar Termodinamik dersinde bu denklemde birleşir: Legendre dönüşümleriyle entalpi H = U + PV (sayfadaki izobarik ısı tam olarak ΔH'dir), Helmholtz serbest enerjisi F = U − TS ve Gibbs serbest enerjisi G = H − TS türetilir. Karışık ikinci türevlerin eşitliği <strong>Maxwell bağıntılarını</strong> verir: ölçülmesi zor bir entropi değişimini ölçülmesi kolay bir genleşme katsayısına çevirir. Fiziksel Kimya'da G, bir tepkimenin sabit sıcaklık ve basınçta kendiliğinden yürüyüp yürümeyeceğine karar verir.",
      "Çevrimi ters yöne çevirince ısı makinesi bir <strong>buzdolabına</strong> ya da <strong>ısı pompasına</strong> dönüşür: dışarıdan iş verilerek ısı soğuktan sıcağa taşınır. Sayfa saat yönünün tersine dönen çevrimlerde verim yerine '—' gösterir; o çevrimler bu cihazların ideal modelidir. Başarımları <em>performans katsayısıyla</em> (COP) ölçülür ve ikinci yasa burada da bir tavan koyar: Carnot ısı pompası için K<sub>P</sub> = Q<sub>h</sub>/W = T<sub>h</sub>/(T<sub>h</sub> − T<sub>c</sub>). Dışarısı 0 °C, içerisi 20 °C iken bu tavan 293 K / 20 K ≈ 14.7'dir: harcanan her joule elektriğe karşılık eve yaklaşık 15 J ısı. Gerçek pompalar bunun epey altında kalır ama çoğu koşulda elektrikli ısıtıcıdan birkaç kat fazla ısı verir. Mühendislik termodinamiği açık sistemlere (türbin, kompresör, lüle) geçer ve santrallerin Rankine, jet motorlarının Brayton çevrimlerini çözer. İstatistiksel Mekanik ise yasaların altını kazır: Boltzmann'ın S = k<sub>B</sub> ln Ω formülü entropiyi mikrodurum sayısına bağlar; enerjinin eşbölüşümü C<sub>v</sub>'nin neden 3/2 R ve 5/2 R olduğunu, kuantum mekaniği de molekül titreşimlerinin oda sıcaklığında neden katkı vermediğini açıklar.",
    ],
    topics: [
      "Fizik I–II: termodinamik bölümleri",
      "Mühendislik Termodinamiği",
      "Fiziksel Kimya",
      "İstatistiksel Mekanik",
      "Maxwell bağıntıları",
      "Serbest enerjiler (F ve G)",
      "Buzdolabı, ısı pompası ve COP",
      "Rankine ve Brayton çevrimleri",
    ],
  },
  quiz: [
    {
      question:
        "Bir gaz A durumundan B durumuna izobarik tek adımla götürülünce Q = +6235.5 J ve W = +2494.2 J ölçülüyor. Aynı A ile B arasındaki başka bir yolda gaz W = +1728.8 J iş yapıyor. Bu ikinci yolda gaza giren ısı Q ne kadardır?",
      options: ["+1728.8 J", "+3741.3 J", "+5470.1 J", "+6235.5 J"],
      answer: 2,
      explanation:
        "Yola bağlı olmayan tek nicelik iç enerjidir: ΔU = Q − W = 6235.5 J − 2494.2 J = +3741.3 J her yolda aynıdır. İkinci yolda Q = ΔU + W = 3741.3 J + 1728.8 J = +5470.1 J. 3741.3 J ısı değil ΔU'dur; 6235.5 J ise yalnızca izobarik yolun ısısıdır. Sayfada bu yol önce izotermal 20 L, sonra izokorik 600 K'dir ve Toplam satırında ΔS de iki yolda +14.41 J/K çıkar.",
    },
    {
      question:
        "600 K ile 300 K arasında çalışan bir Carnot makinesinin verimi yüzde 50'dir. Aşağıdakilerden hangisi verimi en çok artırır?",
      options: [
        "Sıcak kaynağı 100 K ısıtmak (700 K)",
        "Soğuk kaynağı 100 K soğutmak (200 K)",
        "Tek atomlu gaz yerine iki atomlu gaz kullanmak",
        "Gaz miktarını iki katına çıkarmak",
      ],
      answer: 1,
      explanation:
        "η = 1 − Tc/Th. 700 K ile 300 K arasında 1 − 3/7 = 57.14 %, 600 K ile 200 K arasında 1 − 1/3 = 66.67 %. Kelvin başına etki: ∂η/∂Tc = −1/Th, ∂η/∂Th = Tc/Th²; oranları Th/Tc = 2. Gaz türü ve miktarı formülde yoktur; sayfada iki atomlu gaza geçince 50.00 % aynen kalır. Pratikte soğuk taraf çoğunlukla çevre havası ya da sudur, bu yüzden mühendisler sıcak tarafı yükseltir.",
    },
    {
      question:
        "Yalıtılmış bir silindirdeki gaz sıkıştırılıyor ve piston gaz üzerine 500 J iş yapıyor (Q = 0). Bu sayfanın işaret kuralıyla hangisi doğrudur?",
      options: [
        "W = −500 J, ΔU = +500 J; gaz ısınır",
        "W = +500 J, ΔU = +500 J; gaz ısınır",
        "W = −500 J, ΔU = −500 J; gaz soğur",
        "W = −500 J, ΔU = 0; ısı girmediği için sıcaklık değişmez",
      ],
      answer: 0,
      explanation:
        "W gazın yaptığı iştir; piston gaza iş yaptığında W negatiftir. ΔU = Q − W = 0 − (−500 J) = +500 J. İdeal gazda U = nCvT olduğundan sıcaklık yükselir; dizel motorunda yakıtı tutuşturan budur. Sayfada 10 L'den 5 L'ye adyabatik önizleme W = −2197.6 J, ΔU = +2197.6 J ve T₂ = 476.2 K gösterir.",
    },
  ],
  next: [
    {
      href: "ideal-gaz.html",
      title: "İdeal Gaz: Moleküllerden Basınca",
      why: "Gaz yasasının mikroskobik kaynağı: basıncı duvara çarpan disklerden ölç, pistonla sıkıştırınca gazın neden ısındığını moleküllerin gözünden izle. Dikkat: orada W pistonun gaza yaptığı iştir, defter ΔU = W + Q yazar.",
    },
    {
      href: "entropi-ve-istatistiksel-fizik.html",
      title: "Entropi ve İstatistiksel Fizik",
      why: "Burada hacmi iki katına çıkan 1 mol gazda ΔS = R ln 2 = 5.76 J/K buldun. Orada aynı sayıya mikrodurum sayarak ulaş: her molekül iki yarıdan birinde olabildiği için Ω 2<sup>N</sup> kat büyür, S = k<sub>B</sub> ln Ω de N·k<sub>B</sub> ln 2 = R ln 2 artar.",
    },
    {
      href: "kimyasal-denge-ve-gibbs-enerjisi.html",
      title: "Kimyasal Denge ve Gibbs Enerjisi",
      why: "Köprüdeki G = H − TS'nin kimyadaki işi: ΔG°'yi, sıcaklığı ve tepkime bölümü Q'yu değiştir; ΔG° = −RT ln K ve Q ile K'nın karşılaştırması tepkimenin hangi yöne yürüyeceğini söyler.",
    },
    {
      href: "otomotiv-muhendisligi.html",
      title: "Otomotiv Mühendisliği",
      why: "Otto çevriminin metal hâli: dört zamanlı motorun zamanlarını izle, benzinli ve dizel motorların sıkıştırma oranlarını karşılaştır.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 2, 3.6 Adiabatic Processes for an Ideal Gas",
      url: "https://openstax.org/books/university-physics-volume-2/pages/3-6-adiabatic-processes-for-an-ideal-gas",
      note: "Adyabatik bağıntının nCv·dT = −p·dV'den adım adım türetilişi, adyabat ile izotermin eğim karşılaştırması ve otomobil silindirinde sıkıştırma örneği (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · University Physics Vol. 2, 4.5 The Carnot Cycle",
      url: "https://openstax.org/books/university-physics-volume-2/pages/4-5-the-carnot-cycle",
      note: "Carnot çevriminin dört adımı, verim formülünün ideal gaz için türetilişi, buzdolabı ve ısı pompası için performans katsayısı; köprüdeki 0 °C → 20 °C ısı pompası örneği buradan. İşaret kuralı bu sayfayla aynıdır.",
    },
    {
      title: "Feynman Lectures on Physics, Cilt I, Bölüm 44: The Laws of Thermodynamics",
      url: "https://www.feynmanlectures.caltech.edu/I_44.html",
      note: "Carnot'nun tersinir makine argümanı, termodinamik sıcaklığın tanımı ve entropi; ısıtılınca kasılan bir lastik bantla açılır.",
    },
    {
      title: "HyperPhysics · Carnot Cycle",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/carnot.html",
      note: "Carnot verimi için kısa bir hesaplayıcı; entropi ve Clausius eşitsizliğiyle bağlantısı, formül odaklı.",
    },
  ],
  revision: "Kasım 2026",
};
