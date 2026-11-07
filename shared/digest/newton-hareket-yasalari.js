window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["newton-hareket-yasalari"] = {
  slug: "newton-hareket-yasalari",
  title: "Newton Yasaları: Kuvvet, Değişim ve Bir Çarpışma",
  field: "Fizik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Newton'un üç yasası iki topun tek bir çarpışmasına sığar: kuvvet yokken dümdüz giden toplar, temas anında eşit ve zıt iki itme, önce de sonra da kuruşu kuruşuna aynı kalan toplam momentum.",
  hook: "Kırmızı top sağa, mavi top sola gidiyor; çarpışıyorlar ve ikisi de geldiği hızla, geldiği yoldan geri dönüyor, sanki film geri sarılmış gibi. Oysa kütleleri farklı: biri 2, öteki 3 birim. Bu kusursuz simetri nereden geliyor?",
  bigIdea:
    "Kuvvet hareketi değil, hareketin <strong>değişimini</strong> belirler; iki cisim birbirini her an eşit ve zıt kuvvetle ittiği için birinin kazandığı momentumu öteki kaybeder ve toplam hiç değişmez.",
  story: [
    "Aristoteles'in fiziğinde zorla yaptırılan her hareketin bir iticisi olmalıydı; itici ortadan kalkınca hareket de biterdi. Bu fikrin açığı ortadaydı: elden çıkan bir taş neden yoluna devam ediyordu? Soru yüzyıllarca tartışıldı. Galileo, 1630'larda yayımlanan kitaplarında eğik düzlemlerle düşündü: bir eğimden yuvarlanan top, karşıdaki eğimde neredeyse aynı yüksekliğe çıkar. Karşı eğimi giderek yatırırsan top o yüksekliğe ulaşmak için hep daha uzağa gitmek zorunda kalır. Eğim tamamen yatay olursa ve sürtünme olmasaydı, top hiç durmazdı. 1644'te Descartes bu fikri daha keskin söyledi: kendi hâline bırakılan bir cisim <em>düz bir çizgide</em> hareketini sürdürür.",
    "Çarpışmalar ayrı bir bilmeceydi. 1668'de Londra'daki Kraliyet Cemiyeti, çarpışan cisimlerin kurallarını sordu. John Wallis, Christopher Wren ve Christiaan Huygens birbirinden bağımsız yanıtlar gönderdi. Ortak sonuçları bugün <strong>momentum korunumu</strong> dediğimiz şeydi. Huygens bir adım daha ileri gitmişti: esnek çarpışmalarda, her cismin kütlesiyle hızının karesinin çarpımı toplanınca bu toplam da değişmiyordu. Bugünkü kinetik enerji kavramının atası budur. Newton, <em>Principia</em>'da yasalarının ardından gelen açıklamada bu üç ismi anar ve kendi sarkaç çarpışması deneylerini anlatır. Esnekliği tam olmayan toplarla bile etki ile tepki eşit çıkıyordu.",
    "<em>Principia</em>'nın yazılması bir ziyaretle başladı. 1684'te Edmond Halley, Cambridge'de Newton'a uzaklığın karesiyle azalan bir çekim kuvvetinin gezegene nasıl bir yörünge çizdireceğini sordu. Newton'un yanıtı 'elips' oldu; bunu çoktan hesaplamıştı. Halley'nin ısrarıyla kısa bir hesap, üç yıl içinde koca bir kitaba dönüştü. <em>Philosophiae Naturalis Principia Mathematica</em> 1687 yazında Latince olarak basıldı. Kraliyet Cemiyeti'nin yayın bütçesi bir yıl önce bir balık kitabına harcandığı için baskı masrafını Halley kendi cebinden karşıladı. Üç hareket yasası kitabın başında, tanımların hemen ardından gelir. Newton aynı yasalarla hem düşen bir taşın hem de Ay'ın hareketini açıklar.",
    "Peki elma? Newton'un yaşlılığında, 1726'da arkadaşı William Stukeley'e, kütleçekim fikrinin gençliğinde bir bahçede otururken düşen bir elmayı görünce aklına geldiğini anlattığı kayıtlıdır. Stukeley bu sohbeti 1752'de yazdığı <em>Memoirs of Sir Isaac Newton's Life</em> (Sir Isaac Newton'un Hayatına Dair Anılar) adlı kitapta aktarır. Elmanın Newton'un kafasına düştüğü ise sonradan eklenmiş bir süsleme; bu ayrıntı Newton'un kendi anlatımında yok. Hikâye doğru olsa bile hareket yasalarıyla değil, kütleçekimle ilgilidir. Üç yasa bir anlık ilhamdan değil, Galileo'dan Huygens'e uzanan yarım yüzyıllık bir birikimin Newton'un elinde tek bir dizgeye dönüşmesinden doğdu.",
  ],
  core: [
    {
      heading: "Birinci yasa: hareketi sürdürmek bedavadır",
      body: "Net kuvvet sıfırsa hız vektörü değişmez: duran durmaya devam eder, giden aynı hızla ve aynı doğrultuda gider. Buna <strong>eylemsizlik</strong> denir. Günlük hayatta kayan, yuvarlanan her şey eninde sonunda durur, çünkü sürtünme ve hava direnci hiç eksik olmaz. Yani hareket kendiliğinden sönmez; hareket eden bir cismin yavaşlayıp durması için de bir kuvvet gerekir. Sayfada çarpışmadan önceki her karede iki topun hızı aynıdır. Grafikteki iki yatay çizgi birinci yasanın resmidir.",
      formula: "ΣF = 0 ⇔ v = sabit",
      formulaNote:
        "'Sabit hız' sıfır hızı da kapsar: durgun kalmak ile düzgün doğrusal hareket etmek aynı yasanın iki hâlidir.",
    },
    {
      heading: "İkinci yasa: kuvvet, değişimin hızıdır",
      body: "Net kuvvet bir cismin <strong>momentumunu</strong> (kütle × hız) değiştirir. Kuvvet ne kadar büyük ve ne kadar uzun süre etkirse değişim o kadar büyük olur. Kütle sabitken bu ifade tanıdık F = m·a biçimine dönüşür. Aynı kuvvet, büyük kütleye küçük ivme verir; kütle bu yüzden bir <strong>eylemsizlik ölçüsüdür</strong>. Kuvvet × süre çarpımına <strong>itme</strong> (impuls) denir ve tam olarak momentum değişimine eşittir.",
      formula: "ΣF = Δp/Δt = m·a   ·   F·Δt = Δp",
      formulaNote:
        "p = m·v. Kuvvetin birimi newton: 1 N = 1 kg·m/s². Hava yastığı Δt'yi uzatarak aynı Δp için gereken kuvveti küçültür.",
    },
    {
      heading: "Üçüncü yasa: kuvvet tek başına gezmez",
      body: "Kuvvet her zaman iki cisim arasındaki bir etkileşimdir. A, B'yi iterse B de aynı anda A'yı aynı büyüklükte ve zıt yönde iter. Newton'un kendi örneği: parmağınla bir taşa bastırırsan taş da parmağına bastırır. Bu iki kuvvet <em>farklı cisimlere</em> etki eder; bu yüzden birbirini götürmez. Roket egzoz gazını geriye iter, gaz da roketi ileri iter. İtecek havaya gerek yoktur.",
      formula: "F<sub>A→B</sub> = −F<sub>B→A</sub>",
      formulaNote:
        "Kuvvetler eşit, ivmeler değil: hafif cisim daha çok ivmelenir, çünkü a = F/m.",
    },
    {
      heading: "Momentum korunumu: üçüncü yasanın muhasebesi",
      body: "Çarpışma boyunca iki top birbirine her an eşit ve zıt kuvvet uygular ve bu kuvvetler aynı süre etkir. Öyleyse itmeler de eşit ve zıttır: birinin kazandığı momentumu öteki kaybeder. Dışarıdan net kuvvet yoksa toplam momentum değişmez. Temas kuvvetinin ne kadar karmaşık olduğunu bilmeye gerek kalmaz. Sayfadaki toplar için toplam baştan sıfırdır: 2·(+3) + 3·(−2) = 0. Bu yüzden kütle merkezi kıpırdamaz, kanvasın x = 440 pikselinde sabit kalır.",
      formula: "m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′",
      formulaNote:
        "Hızların işareti yönü gösterir; bu sayfada sağa doğru artı, sola doğru eksi.",
    },
    {
      heading: "Esnek çarpışma: enerji de korunduğunda",
      body: "Momentum her çarpışmada korunur. Kinetik enerjinin de korunduğu çarpışmalara <strong>esnek</strong> denir. Bilardo topları buna yakındır. İki korunum denklemi birlikte çözülünce çarpışma sonrası hızlar tek anlamlı olarak belirlenir. Sayfanın kodundaki satır tam olarak bu formüldür. Güzel bir yan sonuç: iki topun birbirine göre hızı çarpışmada yön değiştirir ama büyüklüğü aynı kalır. Önce kare başına 5 piksel yaklaşırlar, sonra kare başına 5 piksel uzaklaşırlar.",
      formula: "v₁′ = ((m₁ − m₂)/(m₁ + m₂))·v₁ + (2m₂/(m₁ + m₂))·v₂",
      formulaNote:
        "v₂′ için indisleri yer değiştir. m₁ = m₂ ise toplar hızlarını takas eder; Newton beşiğinin sırrı budur.",
    },
  ],
  lab: {
    intro:
      "Sayfada yalnızca iki düğme var: <strong>Simülasyonu Başlat</strong> ve <strong>Sıfırla</strong>. Kütleler (kırmızı top 2, mavi top 3 birim) ve başlangıç hızları (+3 ve −2) koda gömülüdür; ekranda yazmazlar ve iki top aynı boyda çizilir. Alttaki grafik <em>Top 1 Hızı</em> (kırmızı) ve <em>Top 2 Hızı</em> (mavi) çizgilerini gösterir. Eksenlerde 'm/s' ve 's' yazsa da hızlar aslında <strong>piksel/kare</strong>, zaman ise her karede 0.1 artan bir sayaçtır: 60 Hz bir ekranda gerçek saniyede yaklaşık 6 ilerler, yenileme hızı daha yüksek ekranlarda daha da hızlı. Sahnede duvar yoktur; toplar ekrandan çıkar ve simülasyon sen Sıfırla'ya basana dek sürer. Grafik yalnızca son 51 kareyi tutar ve duraklat düğmesi yoktur. Önemli anlarda ekran görüntüsü almak işini kolaylaştırır.",
    experiments: [
      {
        title: "Kuvvet yokken hız ne yapar?",
        predict:
          "Çarpışmadan önce ve sonra hiçbir kuvvet yok. Grafikteki çizgiler bu aralıklarda eğimli mi olur, yatay mı? Toplar ekrandan çıkınca ne olur?",
        do: "Sıfırla'ya, ardından Simülasyonu Başlat'a bas. Çarpışmaya kadar grafiği izle, sonra Sıfırla'ya basmadan toplar ekrandan çıkana kadar bekle.",
        observe:
          "Çizgiler önce 3.00 ve −2.00'de, çarpışmadan sonra −3.00 ve 2.00'de dümdüz uzanır. Duvar olmadığı için sayaç 22.0'ı gösterdiğinde kırmızı top sol kenardan, 25.6'yı gösterdiğinde mavi top sağ kenardan tamamen kaybolur. Çizgiler ise düz akmayı sürdürür.",
        explain:
          "Net kuvvet sıfırsa ivme sıfırdır ve hız-zaman grafiğinin eğimi ivmedir. Ekrandan kaçan toplar bir hata gibi görünse de birinci yasanın en dürüst gösterimidir: onları durduracak hiçbir şey yok.",
      },
      {
        title: "Çarpışma ne zaman ve nerede olur?",
        predict:
          "Merkezler arası uzaklık 400 piksel. Toplar 20'şer piksel yarıçaplı ve her karede toplam 3 + 2 = 5 piksel yaklaşıyor. Sayaç kaçı gösterirken çarpışırlar? Temas noktası kanvasın ortasında mı (x = 400) olur?",
        do: "Sıfırla, sonra Başlat. Topların temas ettiği anda grafiğin sağ ucundaki zaman etiketine bak. Temasın kanvasın neresinde olduğunu gözle.",
        observe:
          "Hızlar 7.2 ile 7.3 etiketleri arasında sıçrar. 7.3, yeni hızların ilk göründüğü etikettir (60 Hz'de başlangıçtan yaklaşık 1.2 gerçek saniye sonra). Temas, ortanın biraz sağında, x ≈ 436 civarında olur. Sıçrama grafikte yalnızca 50 kare kalır (60 Hz'de 1 saniyeden az), sonra kayıp gider.",
        explain:
          "Temas için kapanması gereken boşluk 400 − 40 = 360 pikseldir; 360/5 = 72 kare, yani sayaçta 7.2. Kod çakışmayı ancak bir sonraki karede yakalar (toplar 5 piksel iç içe geçmiştir). Hızlı kırmızı top yolun 3/5'ini (216 px), mavi top 2/5'ini (144 px) gider.",
      },
      {
        title: "Etki–tepki defteri: eşit kuvvet, farklı ivme",
        predict:
          "Çarpışmada hangi top daha büyük kuvvet görür: 2 birimlik mi, 3 birimlik mi? Hangisinin hızı daha çok değişir?",
        do: "Çarpışmadan hemen önceki ve hemen sonraki hızları grafikten oku: düz çizgilerin hizasını y ekseninden okuyabilir ya da fareyi bir noktanın üzerine getirip değeri görebilirsin (grafik kaydığı için ekran görüntüsünde okumak daha kolay). Her top için Δp = m·Δv hesapla.",
        observe:
          "Kırmızı: 3.00 → −3.00, Δv = −6, Δp = 2·(−6) = −12. Mavi: −2.00 → 2.00, Δv = +4, Δp = 3·(+4) = +12. Hız değişimleri 6'ya 4, yani 3'e 2 oranında; momentum değişimleri tam eşit ve zıt.",
        explain:
          "Değişim aynı tek karede olduğu için iki itme de aynı Δt'ye bölünür ve kuvvetler eşit ve zıt çıkar (üçüncü yasa). İvmeler ise kütleyle ters orantılıdır: 6/4 = 3/2 = m₂/m₁ (ikinci yasa).",
      },
      {
        title: "Geri sarılan film: sıfır momentumun sırrı",
        predict:
          "Toplam momentum 2·3 + 3·(−2) = 0 ve kinetik enerji ½·2·3² + ½·3·2² = 15 (sayfanın birimleriyle). Çarpışmadan sonra bu iki sayı ne olur? Sayaç 14.6'yı gösterdiğinde toplar nerede olur?",
        do: "Sıfırla ve Başlat. Çarpışmadan sonra iki topu birlikte izle; başladıkları noktalara dönüp dönmediklerine ve oradan aynı anda mı geçtiklerine bak.",
        observe:
          "Çarpışmadan sonra toplam momentum 2·(−3) + 3·2 = 0, enerji ½·2·9 + ½·3·4 = 15; ikisi de aynı. Her top kendi yolunu ters yönde, geldiği hızla geri alır. Sayaç 14.6'da (60 Hz'de yaklaşık 2.4 s) iki top da tam başlangıç noktalarındadır ve oradan aynı anda geçer.",
        explain:
          "Toplam momentum sıfır olduğundan kütle merkezi x = 440'ta çakılı kalır; sayfa olayı kütle merkezinin gözünden gösterir. Bu çerçevede esnek çarpışmanın tek çözümü her hızın işaret değiştirmesidir. Çarpışmaya 73 kare kalmıştı; geri dönüş de 73 kare sürer ve 73 + 73 = 146 kare, sayaçta 14.6 eder.",
      },
    ],
  },
  wow: [
    {
      title: "Principia'da F = m·a yazmaz",
      body: "Newton'un ikinci yasası Latince aslında şunu söyler: 'Hareketin değişimi, uygulanan hareket ettirici kuvvetle orantılıdır ve o kuvvetin etkidiği doğru boyunca olur.' Newton 'hareket niceliği'ni kütle ile hızın çarpımı, yani bugünkü momentum olarak tanımlamıştı. Kitap neredeyse tamamen geometrik oranlarla yazılmıştır; bugünkü anlamda denklem çok azdır. Yasayı ivmeli bir denklem olarak 1716'da Jakob Hermann yazdı; 18. yüzyılın ortasında Leonhard Euler onu mekaniğin genel ilkesi hâline getirdi. Newton yasayı hem sürekli etkiyen kuvvetlere hem de bir çarpmanın verdiği ani darbeye uygular. Bu sayfadaki tek karelik hız sıçraması ikinci türdendir.",
    },
    {
      title: "49 yıl sonra gelen özür",
      body: "13 Ocak 1920'de The New York Times bir başyazıda roket öncüsü Robert Goddard'la alay etti: boşlukta itecek hava yoktu, roket orada çalışamazdı. Üçüncü yasa tersini söylüyordu; roket egzozu iter, egzoz da roketi iter. Gazete, Apollo 11 Ay'a doğru yola çıktıktan bir gün sonra, 17 Temmuz 1969'da bir düzeltme yayımladı: roketin boşlukta da çalıştığı artık kesinleşmişti, gazete hatası için üzgündü. Goddard 1945'te ölmüştü.",
    },
    {
      title: "1980'den beri itilmeden giden sonda",
      body: "Voyager 1 Eylül 1977'de fırlatıldı. Hızını, fırlatma günü ateşlenip ayrılan roket kademelerinden ve Jüpiter (1979) ile Satürn (1980) yakın geçişlerindeki <strong>kütleçekim yardımından</strong> aldı: gezegenin yanından geçerken onun çekimiyle hızlandı. 1980'den beri yolunu değiştiren bir ateşleme yapılmadı; küçük iticiler yalnızca antenini Dünya'ya dönük tutuyor. Yine de Güneş'e göre saniyede yaklaşık 17 km hızla, insan yapımı en uzak nesne olarak yol alıyor. Onu yavaşlatan neredeyse tek etki, uzaklaştıkça zayıflayan Güneş çekimi. Birinci yasa Güneş Sistemi ölçeğinde de iş başında.",
    },
  ],
  worked: {
    title: "Sayfadaki çarpışmayı kâğıtta çöz",
    prompt:
      "Sayfanın sayılarını gerçek birimlerle oku: m₁ = 2 kg'lık kırmızı top v₁ = +3 m/s, m₂ = 3 kg'lık mavi top v₂ = −2 m/s hızla (sağa doğru artı) esnek çarpışıyor. Çarpışma sonrası hızları bul, korunumları denetle ve temas 5 ms sürseydi topların birbirine uyguladığı ortalama kuvveti hesapla.",
    steps: [
      "Çarpışmadan önceki defter: p = 2·(+3) + 3·(−2) = 6 − 6 = 0 kg·m/s. KE = ½·2·3² + ½·3·(−2)² = 9 + 6 = 15 J. Göreli yaklaşma hızı 3 − (−2) = 5 m/s.",
      "Kırmızı top: v₁′ = ((2 − 3)/5)·3 + (2·3/5)·(−2) = −0.6 − 2.4 = −3.0 m/s. Top aynı süratle sola döner.",
      "Mavi top: v₂′ = ((3 − 2)/5)·(−2) + (2·2/5)·3 = −0.4 + 2.4 = +2.0 m/s. Top aynı süratle sağa döner.",
      "Denetim: p′ = 2·(−3) + 3·2 = 0 kg·m/s ve KE′ = 9 + 6 = 15 J; ikisi de korundu. Göreli uzaklaşma hızı 2 − (−3) = 5 m/s, yani önceki 5 m/s'nin yön değiştirmiş hâli.",
      "İtmeler: Δp₁ = 2·(−3 − 3) = −12 kg·m/s, Δp₂ = 3·(2 − (−2)) = +12 kg·m/s. Ortalama kuvvet F = |Δp|/Δt = 12 kg·m/s ÷ 0.005 s = 2400 N. Bu kuvvet iki topa da etki eder, yönleri zıttır.",
    ],
    result:
      "v₁′ = −3 m/s, v₂′ = +2 m/s; sayfanın grafiği de (piksel/kare cinsinden) tam bunu gösterir. Toplam momentum 0 kg·m/s, kinetik enerji 15 J kalır. 5 ms'lik bir temasta iki top birbirine 2400 N'luk eşit ve zıt kuvvet uygular: kırmızı top 1200 m/s², mavi top 800 m/s² ivmelenir. 2400 N, Dünya'da yaklaşık 245 kg'lık bir kütlenin ağırlığı kadardır.",
  },
  misconceptions: [
    {
      myth: "Bir cismin hareket etmeye devam etmesi için ona sürekli kuvvet uygulanmalıdır.",
      truth:
        "Kuvvet hareketi sürdürmek için değil, değiştirmek için gerekir. Bisiklette pedalı bırakınca yavaşlarsın, çünkü sürtünme ve hava direnci seni frenler. Sayfadaki toplar hiçbir kuvvet olmadan sabit hızla gider ve ekrandan çıkıp gider.",
    },
    {
      myth: "Ağır cisim çarpışmada hafif cisme, hafifin ona uyguladığından daha büyük kuvvet uygular.",
      truth:
        "Kuvvetler kütleden bağımsız olarak eşittir. Sayfada Δp₁ = −12 ve Δp₂ = +12'dir. Farklı olan sonuçtur: hafif topun hızı 6, ağır topunki 4 birim değişir. Kamyonla çarpışan otomobilin yolcusu daha çok sarsılır; bunun nedeni daha büyük kuvvet değil, daha büyük ivmedir.",
    },
    {
      myth: "Etki ve tepki eşit ve zıtsa birbirini götürür; o hâlde hiçbir şey hareket edemez.",
      truth:
        "Etki–tepki çiftindeki kuvvetler farklı cisimlere etki eder. Bir cismin ivmesini yalnızca o cisme etki eden kuvvetler belirler. Yürürken ayağın yeri geriye iter, yer de seni ileri iter. Seni hareket ettiren, sana etki eden kuvvettir.",
    },
    {
      myth: "Momentum korunuyorsa kinetik enerji de korunur.",
      truth:
        "Momentum, dış kuvvet yoksa her çarpışmada korunur; kinetik enerji yalnızca esnek çarpışmada korunur. Sayfadaki toplar birbirine yapışsaydı ortak hız (2·3 + 3·(−2))/5 = 0 olurdu. İkisi de olduğu yerde durur ve 15 birimlik kinetik enerjinin tamamı ısıya, sese ve şekil bozulmasına giderdi.",
    },
  ],
  glossary: [
    {
      term: "Eylemsizlik",
      definition:
        "Bir cismin, net kuvvet etki etmedikçe hız vektörünü (büyüklüğünü ve yönünü) koruması.",
    },
    {
      term: "Net kuvvet (ΣF)",
      definition:
        "Bir cisme etki eden bütün kuvvetlerin vektörel toplamı; ivmeyi tek başına bu belirler.",
    },
    {
      term: "Newton (N)",
      definition:
        "Kuvvet birimi, 1 N = 1 kg·m/s²; yaklaşık 102 gramlık bir kütlenin Dünya'daki ağırlığıdır.",
    },
    {
      term: "Momentum (p)",
      definition:
        "Kütle ile hızın çarpımı, p = m·v; hız gibi yönü olan bir niceliktir, birimi kg·m/s.",
    },
    {
      term: "İtme (impuls)",
      definition:
        "Kuvvet ile etki süresinin çarpımı, F·Δt; bir cismin momentum değişimine eşittir.",
    },
    {
      term: "Esnek çarpışma",
      definition: "Hem momentumun hem toplam kinetik enerjinin korunduğu çarpışma.",
    },
    {
      term: "Tamamen esnek olmayan çarpışma",
      definition:
        "Cisimlerin çarpışmadan sonra birbirine yapışıp ortak hızla hareket ettiği, kinetik enerji kaybının en büyük olduğu çarpışma.",
    },
    {
      term: "Kütle merkezi",
      definition:
        "Konumların kütlelerle ağırlıklandırılmış ortalaması; dış kuvvet yoksa sabit hızla hareket eder ya da durur.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede F = m·a bir formüldür; üniversitede bir <strong>diferansiyel denklemdir</strong>: m·d²x/dt² = F(x, v, t). Kuvveti, başlangıç konumunu ve hızı bilirsen hareketin geleceği belirlenir. Bu denklem çoğu zaman kâğıt üzerinde çözülemez. Bilgisayar onu, bu sayfanın yaptığı gibi küçük zaman adımlarıyla ilerleterek çözer. Adım seçimi, çarpışma algılama ve hata birikimi <em>hesaplamalı fizik</em> ile oyun motorlarının ortak dertleridir; bu sayfadaki bir karelik gecikmeli çarpışma algılaması da bunun küçük bir örneğidir. Lisans mekaniğinde aynı fizik <strong>Lagrange</strong> ve <strong>Hamilton</strong> biçimleriyle yeniden yazılır. Kuvvetler yerine enerjiler konuşur ve korunum yasaları simetrilerden türetilir. Noether teoremine göre momentum korunumu, fizik yasalarının uzayın her yerinde aynı olmasının sonucudur.",
      "Newton yasalarının bir de sınırı vardır. Yasalar yalnızca <strong>eylemsiz referans çerçevelerinde</strong> bu sade hâlleriyle geçerlidir. Dönen bir atlıkarıncada 'hayalî' kuvvetler eklemek gerekir. Işık hızına yaklaşan cisimlerde özel görelilik, atom ölçeğinde kuantum mekaniği devreye girer. Yine de bu kuramlar momentum korunumunu korur ve düşük hızlarda Newton'a geri döner. Köprü, uzay aracı ve çarpışma testi hesaplarında hâlâ Newton kullanılır. Çarpışma fiziği ise parçacık hızlandırıcılarında yeni parçacıkları bulmanın temel aracıdır.",
    ],
    topics: [
      "Diferansiyel denklemler",
      "Sayısal integrasyon",
      "Kütle merkezi çerçevesi",
      "Lagrange ve Hamilton mekaniği",
      "Noether teoremi",
      "Özel görelilikte momentum",
    ],
  },
  quiz: [
    {
      question:
        "Voyager 1'de 1980'den beri yolunu değiştiren bir ateşleme yapılmadığı hâlde sonda saniyede yaklaşık 17 km hızla gitmeyi sürdürüyor. Bunu en iyi ne açıklar?",
      options: [
        "Uzayda hava olmadığı için kütleçekim de yoktur",
        "Üzerindeki net kuvvet çok küçüktür; eylemsizlik hızını korur",
        "Küçük iticileri onu sürekli ileri iter",
        "Fırlatmada aldığı 'itici güç' henüz tükenmemiştir; tükenince duracaktır",
      ],
      answer: 1,
      explanation:
        "Birinci yasa: net kuvvet yoksa hız değişmez. Voyager 1'e etkiyen başlıca kuvvet, uzaklaştıkça zayıflayan Güneş çekimidir; o da sondayı hızlandırmaz, çok yavaş frenler. Küçük iticiler yalnızca antenini Dünya'ya dönük tutar. Uzayda hava yoktur ama kütleçekim vardır; 'tükenen itici güç' fikri ise Newton öncesi fiziğin yanılgısıdır.",
    },
    {
      question:
        "Sayfadaki çarpışmada kırmızı topun (2 birim) hızı 6, mavi topun (3 birim) hızı 4 birim değişiyor. Bundan hangi sonuç çıkar?",
      options: [
        "Kırmızı top daha büyük kuvvet görmüştür, çünkü hızı daha çok değişmiştir",
        "Mavi top daha büyük kuvvet görmüştür, çünkü kütlesi daha büyüktür",
        "İki top eşit ve zıt kuvvet görmüştür; aynı kuvvet hafif topu daha çok ivmelendirmiştir",
        "Kuvvetler, kütlelerin oranı gibi 2'ye 3 oranındadır",
      ],
      answer: 2,
      explanation:
        "Üçüncü yasa kütleden ve hızdan bağımsızdır: sayfada Δp₁ = −12, Δp₂ = +12. Aynı itme hafif topun hızını daha çok değiştirir, çünkü Δv = Δp/m: 12/2 = 6 ve 12/3 = 4. Hız değişiminin büyük olması kuvvetin büyük olduğunu değil, kütlenin küçük olduğunu gösterir.",
    },
    {
      question:
        "Mavi topun kütlesi 3 yerine 2 birim olsaydı (hızlar yine +3 ve −2, çarpışma yine esnek), çarpışmadan sonra ne olurdu?",
      options: [
        "Yine kırmızı −3, mavi +2 hızla geri dönerlerdi",
        "Hızlarını takas ederlerdi: kırmızı −2, mavi +3",
        "İkisi de olduğu yerde dururdu",
        "Birbirlerinin içinden geçip aynı hızlarla yollarına devam ederlerdi",
      ],
      answer: 1,
      explanation:
        "Kütleler eşitse esnek çarpışma formülündeki (m₁ − m₂) terimi sıfır olur ve toplar hızlarını takas eder; Newton beşiğinin sırrı budur. Denetim: momentum önce 2·3 + 2·(−2) = 2, sonra 2·(−2) + 2·3 = 2; kinetik enerji iki durumda da 9 + 4 = 13.",
    },
  ],
  next: [
    {
      href: "momentum-itme-ve-carpismalar.html",
      title: "Momentum, İtme ve Çarpışmalar",
      why: "Bu çarpışmayı orada kaydırıcılarla gerçek birimlerle kur: mavi araba 2 kg ve +3 m/s, altın araba 3 kg ve −2 m/s. <strong>Çarpışma türü</strong> menüsünde e = 1, 0,5 ve 0'ı dene; momentum hep 0 kalırken kinetik enerji 15 J'den 3,75 J'ye ve 0'a iner.",
    },
    {
      href: "hareket-ve-grafikler.html",
      title: "Hareket ve Grafikler",
      why: "Bu sayfadaki yatay hız çizgilerini okumanın dili: hız-zaman grafiğinde eğim ivmedir, alan yer değiştirmedir.",
    },
    {
      href: "serbest-dusme.html",
      title: "Serbest Düşme ve Hava Direnci",
      why: "İkinci yasa iş başında: Kütle ve Hava Direnci Katsayısı kaydırıcılarıyla, ağırlık ile hızın karesiyle büyüyen direnç dengelenince ivmenin sıfıra indiğini ve hızın bir limit değere yaklaştığını gör.",
    },
    {
      href: "is-enerji.html",
      title: "İş–Enerji İlkesi",
      why: "Eğim açısı ve Sürtünme μ kaydırıcılarıyla, kuvvetlerin yaptığı işin kinetik enerjiyi nasıl değiştirdiğini ve sürtünmenin enerjiyi nasıl ısıya çevirdiğini çubuk grafikte izle.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 5.5 Newton's Third Law",
      url: "https://openstax.org/books/university-physics-volume-1/pages/5-5-newtons-third-law",
      note: "Etki–tepki çiftleri, sistem seçimi ve çözümlü örnekler (İngilizce, açık ders kitabı); 5. bölümün tamamı üç yasayı işler.",
    },
    {
      title: "PhET · Çarpışma Laboratuvarı",
      url: "https://phet.colorado.edu/tr/simulations/collision-lab",
      note: "Kütle, hız ve esnekliği değiştirebildiğin Türkçe simülasyon; bu sayfadaki çarpışmayı farklı değerlerle tekrarla.",
    },
    {
      title: "Stanford Encyclopedia of Philosophy · Newton's Principia",
      url: "https://plato.stanford.edu/entries/newton-principia/",
      note: "Principia'nın yazılış öyküsü, yasaların özgün ifadesi, Hermann ve Euler'in F = m·a biçimi (İngilizce, ileri düzey).",
    },
    {
      title: "Vikipedi · Newton'un hareket yasaları",
      url: "https://tr.wikipedia.org/wiki/Newton%27un_hareket_yasalar%C4%B1",
      note: "Üç yasanın Türkçe özeti ve tarihçe.",
    },
  ],
  revision: "Ekim 2026",
};
