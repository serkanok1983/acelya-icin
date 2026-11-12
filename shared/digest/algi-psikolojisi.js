window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["algi-psikolojisi"] = {
  slug: "algi-psikolojisi",
  title: "Algı Psikolojisi: Duyumu Ölçmek",
  field: "Zihin ve Davranış",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "İki çizgi aynı uzunlukta, ama biri açıkça uzun görünüyor. Ne kadar uzun? Psikofizik algıyı sayıya döker; bu sayfada denek sensin: eşiğini, ölçütünü ve tepki süreni kendin ölç.",
  hook:
    "Cetvel iki çizginin eşit olduğunu söylüyor; gözün buna inanmıyor ve bildiğin hâlde inanmamaya devam ediyor. Peki bu inatçı yanılgı yüzde kaç? Görmek gibi özel, içeriden bir deneyimi ölçebilir miyiz, yoksa yalnızca \"bana uzun geldi\" demekle mi kalırız?",
  bigIdea:
    "Algı doğrudan gözlenemez ama ölçülebilir: uyaranı denetler, yanıtları sayar ve bir modelle (Weber, Fechner, Stevens, sinyal saptama, Hick–Hyman) karşılaştırırsın; iyi bir ölçüm her zaman <strong>sistematik sapmayı rastgele saçılmadan</strong>, <strong>görme duyarlılığını karar eğiliminden</strong> ayırır.",
  story: [
    "Hikâye dokunma duyusuyla başlar. Ernst Heinrich Weber (1795–1878), 1834'te dokunma duyusu üzerine Latince çalışmalar yayımladı. Bir pergelin iki ucunu deriye değdirip iki noktanın ne zaman \"iki\" hissedildiğini aradı (<strong>iki nokta eşiği</strong>) ve iki ağırlığın farkının ne zaman sezildiğini ölçtü. Vardığı sonuç basit ama derindi: fark edilebilen en küçük artış sabit bir miktar değil, başlangıçtaki uyaranın sabit bir <em>kesridir</em>. Çalışmanın 1846'daki Almanca sürümünü (<em>Der Tastsinn und das Gemeingefühl</em>) Edward Titchener sonradan \"deneysel psikolojinin temel taşı\" diye anacaktı.",
    "Bu oranı bir ölçme kuramına çeviren Gustav Theodor Fechner oldu. Fechner 1839'da ardıl imgeleri incelerken renkli camların ardından Güneş'e bakarak gözlerine zarar verdi ve kürsüsünü bıraktı. Anlatıldığına göre 22 Ekim 1850 sabahı zihni incelemenin yeni bir yoluyla uyandı; psikofizikçiler bu günü bugün de \"Fechner Günü\" diye anar. Fikir, zihin ile madde arasındaki ilişkiyi bir denklemle yazmaktı. 1860'ta <em>Elemente der Psychophysik</em>'i yayımladı ve alana adını verdi. Fechner, Hermann von Helmholtz ve 1858'de Helmholtz'un asistanı olan Wilhelm Wundt deneysel psikolojinin kurucuları sayılır; Wundt 1879'da Leipzig'de yalnızca psikoloji araştırmalarına ayrılmış ilk laboratuvarı açtı. Aynı yıllarda F. C. Donders (1868), seçimli tepki süresinden basit tepki süresini çıkararak bir zihinsel işlemin süresini ölçmeyi önerdi.",
    "Yüzyılın sonunda yanılsamalar da ölçme masasına geldi. Ludimar Hermann 1870'te ızgara kesişimlerindeki hayalet lekeleri bildirdi; sosyolog Franz Carl Müller-Lyer 1889'da kanatlı çizgilerini yayımladı; Hermann Ebbinghaus'un çevrelenmiş daireleri İngilizce konuşulan dünyaya Titchener'in 1901 tarihli bir ders kitabıyla yayıldı. Kafe duvarının adı ise Bristol'den gelir: Richard Gregory'nin ekibinden Steve Simpson etkiyi St Michael's Hill'in eteğindeki bir kafenin duvar karolarında fark etti; desenin bir sürümünü ise Hugo Münsterberg 1894'te tarif etmişti. Etkilerin varlığı sağlamdır, açıklamaları ise bugün de tartışılır.",
    "Yirminci yüzyıl ölçmenin kendisini sorguladı. 1950'lerde radar araştırmalarından çıkan <strong>sinyal saptama kuramı</strong> (Peterson, Birdsall ve Fox; psikolojideki temelini Tanner, Swets ve Green attı) \"gördüm\" demenin yalnızca görmeye değil, karara da bağlı olduğunu gösterdi; Green ile Swets 1966'da eski eşik yöntemlerini duyarlılığı yanıt eğiliminden ayıramadıkları için eleştirdi. W. E. Hick 1952'de, R. Hyman 1953'te tepki süresini yeni doğan bilgi kuramının diliyle, bit cinsinden yazdı. S. S. Stevens 1957'de \"On the psychophysical law\" makalesinde insanlara izlenimlerini doğrudan sayıyla söyletti ve Fechner'in logaritmasına karşı bir kuvvet yasası savundu. Bu sayfanın beş sekmesi bu beş yöntemin her birini senin üzerinde dener.",
  ],
  core: [
    {
      heading: "Ayarlama yöntemi: yanılsamayı saçılmadan ayırmak",
      body:
        "Yanılsama, uyaranın fiziksel ölçüsü ile algılanan ölçüsünün <strong>sistematik</strong> olarak ayrışmasıdır. Ölçmek için karşılaştırma uyaranını standarda eşit görünene dek ayarlarsın; vardığın değer <strong>öznel eşitlik noktasıdır</strong> (ÖEN). Tek bir ayar iki şeyi karıştırır: elin ve gözün kesinliğini (rastgele saçılma) ve yanılsamayı (ortalamanın kayması). Birkaç denemenin ortalaması alındığında saçılma √n ile söner, yanılsama kalır. Bu yüzden sapmayı <strong>standart hatayla</strong> karşılaştırırız: sapma standart hatanın iki katını aşıyorsa rastlantıyla açıklamak zordur. Her denemenin rastgele bir başlangıçtan açılması da önemlidir; yoksa okur başlangıç değerine takılır (çapa etkisi).",
      formula: "sapma = <span class=ov>x</span> − gerçek,  SH = s / √n,  t = sapma / SH",
      formulaNote: "<span class=ov>x</span> denemelerin ortalaması, s standart sapması, n deneme sayısı. Sayfanın durum satırı üç denemeden sonra t'yi yorumlar; |t| ≥ 2 için \"rastgele saçılmayla açıklanması zor\" der.",
    },
    {
      heading: "Weber yasası ve %70,7'ye yerleşen merdiven",
      body:
        "Fark edilebilir en küçük fark (<strong>FEF</strong>) Δ, standart uyaran S ile orantılı büyür; oranları k (Weber oranı) orta büyüklükteki uyaranlarda yaklaşık sabittir, eşiğe yakın çok zayıf uyaranlarda ise bozulur. \"Eşik\" de keskin bir çizgi değildir: doğru yanıt olasılığı farkla birlikte yumuşak bir S eğrisi (<strong>psikometrik fonksiyon</strong>) boyunca yükselir ve eşik bu eğrinin seçilmiş bir noktasıdır. Uyarlamalı <strong>2 aşağı 1 yukarı</strong> merdiveni bu noktayı kendiliğinden bulur: iki doğru üst üste gelince fark küçülür, tek yanlışta büyür. Merdiven, aşağı inme olasılığının (p²) yukarı çıkma olasılığına (1 − p²) eşit olduğu düzeyde dolaşır.",
      formula: "Δ = k·S,  p² = 1 − p² ⇒ p = √½ ≈ %70,7",
      formulaNote: "\"Hangisi uzun?\" diye soran <strong>zorunlu seçim</strong>, \"fark var mı?\" sorusundaki temkinli ya da atak olma eğilimini ölçümden çıkarır.",
    },
    {
      heading: "Fechner'in logaritması ve Stevens'ın kuvveti",
      body:
        "Fechner Weber'in oranını bir birim gibi kullandı: her FEF duyumda eşit bir adımsa, dψ = α·dS/S yazılabilir; integral alınınca duyum uyaranın logaritmasıyla büyür. Aynı fikir sayarak da görülür: her adımda uyaran (1 + k) katına çıkıyorsa, S₀'dan S'ye n = ln(S/S₀)/ln(1 + k) adım vardır. Bu türetmenin dayanağı, \"her FEF öznel olarak eşittir\" varsayımıdır ve doğrudan sınanmamıştır. Stevens başka yoldan gitti: insanlara izlenimlerini sayıyla söyletti (<strong>büyüklük kestirimi</strong>) ve ortalama yanıtların ψ = k·Sᵃ kuvvet yasasına uyduğunu buldu. Kuvvet yasası log–log eksende eğimi a olan bir doğrudur, logaritma yasası ise yarı-log eksende. Üs a &lt; 1 ise duyum sıkışır (alan için 0,7), a &gt; 1 ise genişler (elektrik şoku için 3,5).",
      formula: "Fechner: ψ = α·ln(S/S₀)  ·  Stevens: ψ = k·Sᵃ ⇔ ln ψ = ln k + a·ln S",
      formulaNote: "İkisi de iki parametrelidir. Hangisinin \"doğru\" olduğu tartışmalıdır: üsler gözlemcilerin ortalamasından uydurulur, insanların sayıları gerçekten oran ölçeği gibi kullanıp kullanmadığı da sorgulanır.",
    },
    {
      heading: "Sinyal saptama: duyarlılık d′ ve ölçüt c",
      body:
        "Her denemede gözlemcinin içinde rastgele bir <strong>iç tepki</strong> oluşur. Eşit varyanslı modelde gürültü denemelerinde bu tepki N(−d′/2, 1), sinyal denemelerinde N(+d′/2, 1) dağılımından gelir; tepki ölçüt c'yi aşarsa \"var\" denir. İsabet oranı H = Φ(d′/2 − c), yanlış alarm oranı F = Φ(−d′/2 − c) olur. Bu iki denklem tersine çevrilince ölçülen oranlardan iki ayrı sayı çıkar: <strong>d′</strong> sinyalin gürültüden ne kadar ayrıştığını, <strong>c</strong> ne kadar kanıtla \"var\" dendiğini söyler. Ölçüt kaydıkça (H, F) noktası sabit d′'nün <strong>ROC eğrisi</strong> boyunca kayar; eğrinin altındaki alan Φ(d′/√2)'dir ve rastgele bir sinyal denemesinin tepkisinin rastgele bir gürültü denemesininkinden büyük olma olasılığına eşittir.",
      formula: "d′ = z(H) − z(F),  c = −[z(H) + z(F)] / 2,  AUC = Φ(d′/√2)",
      formulaNote: "z = Φ⁻¹, standart normal dağılımın tersi. %0 ya da %100 oranlarda z sonsuza gitmesin diye sayfa her sayıma 0,5, her toplama 1 ekler (log-doğrusal düzeltme).",
    },
    {
      heading: "En iyi ölçüt: önsel olasılık ve ödüller",
      body:
        "Hangi ölçüt \"doğrudur\"? Gözlemcinin amacına bağlıdır. Eşit varyanslı modelde, x iç tepkisinin sinyalden gelme olabilirliğinin gürültüden gelme olabilirliğine oranı ℓ(x) = e<sup>d′·x</sup>'tir. Doğru yanıtları en çoklamak için \"var\" demek, sinyalin sonsal olasılığı yarıyı aştığında, yani ℓ(x) &gt; (1 − p)/p olduğunda doğrudur (p sinyal olasılığı). Sınırda x = c koyup logaritma alınca en iyi ölçüt çıkar. Sinyal sıksa (p = 0,75) ölçüt sola kayar: daha az kanıtla \"var\" demek akıllıcadır. Ödüller ve cezalar da işe karışırsa (bir alarmı kaçırmak yanlış alarmdan pahalıysa), oranın sağ yanı ödemelerle çarpılır. Yani ölçütü kaydırmak bir hata değil, çoğu zaman rasyonel bir karardır.",
      formula: "c* = ln β / d′,  β = [(1 − p)/p] · [(D<sub>DR</sub> + M<sub>YA</sub>) / (D<sub>İ</sub> + M<sub>K</sub>)]",
      formulaNote: "D: doğru ret ve isabetin değeri, M: yanlış alarmın ve kaçırmanın maliyeti. Ödüller simetrikse ikinci çarpan 1'dir ve sayfanın formülü c* = ln((1 − p)/p)/d′ kalır.",
    },
  ],
  lab: {
    intro:
      "Sayfanın beş sekmesi beş ölçme yöntemidir: <strong>01 · Yanılsamalar</strong> (ayarlama yöntemi), <strong>02 · Weber yasası</strong> (2 aşağı 1 yukarı merdiven), <strong>03 · Fechner ve Stevens</strong> (büyüklük kestirimi), <strong>04 · Sinyal saptama</strong> (evet/hayır blokları) ve <strong>05 · Tepki süresi</strong> (seçimli tepki). Her deneyin kalıbı aynıdır: önce kendi sonucunu tahmin et, görevi yap, sonra kendi yanıtını modelin ve <strong>benzetilmiş gözlemcinin</strong> yanına koy ve farkı açıkla. Benzetilmiş gözlemciler tohumludur: aynı tohum aynı sonucu verir, bu yüzden aşağıdaki sayılar onlarındır. Senin değerlerin başka çıkacaktır; olması gereken de budur. Yanıtların yalnız bu sekmede, bellekte durur: hiçbir yere gönderilmez, saklanmaz, sayfa kapanınca silinir. Sonuçlar bir öğrenme deneyidir, tanı ya da değerlendirme değildir. R tuşu etkin sekmenin ayarlarını varsayılana döndürür, yanıtlarını silmez.",
    experiments: [
      {
        title: "Müller-Lyer'i kendi gözünde ölç",
        predict:
          "Dışa kanatlı üst çizgiyle eşit görmek için ok başlı alt çizgiyi ne kadar ayarlayacaksın: %100'ün altına mı, üstüne mi? Kaç puan? Kanatları kaldırınca etki büyür mü, küçülür mü?",
        do:
          "01 · Yanılsamalar sekmesinde <strong>Yanılsama</strong> menüsü \"Müller-Lyer: kanatlı çizgiler\" iken <strong>Alttaki çizginin uzunluğu</strong> kaydırıcısını (ince ayar için − ve + düğmeleri) iki çizgi eşit görünene dek oynat ve <strong>Eşit görünüyor</strong>'a bas. Her basıştan sonra yeni bir rastgele başlangıç açılır (ilki %112,0); en az üç deneme yap. Sonra <strong>Karşılaştırma çizgisinin uçları</strong> menüsünü \"Kanatsız düz çizgi\" yapıp tekrarla. En sonda <strong>Hileyi göster</strong>.",
        observe:
          "<strong>Fiziksel eşitlik</strong> kartı %100,0 der (iki çizgi de 240 birim). <strong>Denemelerinin ortalaması</strong> kartı ortalamanı, standart sapmanı ve standart hatanı verir; üç denemeden sonra durum satırı sapmanın standart hatanın kaç katı olduğunu yazar. Çoğu kişinin ortalaması %100'ün üstünde kalır: Segall ve arkadaşlarının kültürler arası örneklemlerinde ortalama yanılgı %1,4 ile %20,3 arasında değişmişti. Hileyi göster uçları ve gerçek uzunlukları çizer.",
        explain:
          "Tek bir ayar elin titremesini de içerir; yanılsamayı gösteren, ortalamanın standart hatayı aşan kaymasıdır. Açıklaması tartışmalıdır: Gregory kanatları derinlik ipucu olarak okuyan bir boyut değişmezliği önerdi; başkaları uç noktaların kanatların ağırlık merkezine doğru kaydığını savunur. Aynı yöntemi kafe duvarında dene: <strong>Sıralar arası kayma</strong>'yı \"Yok (karolar hizalı)\" yapınca karolar siyah ve beyaz sütunlara dizilir; durum satırı bu düzende çizgilerin eğik görünmediğini söyler.",
      },
      {
        title: "Weber oranı ve kısa merdivenin yalanı",
        predict:
          "Benzetilmiş gözlemcinin Weber oranı k = %3,00. 200 merdivenin eşik ortalaması buna ne kadar yakın çıkar? Klasik \"dönüşlerin ortalaması\" kestirimi de aynı yere mi düşer?",
        do:
          "02 · Weber yasası sekmesinde ayarlar varsayılandayken (<strong>Gözlemcinin Weber oranı k</strong> 0,030, tohum 1, <strong>Merdiven uzunluğu</strong> \"Orta: 8 dönüş\") <strong>200 merdiven yürüt</strong>. Sonra merdiven uzunluğunu \"Kısa: 6 dönüş\" ve \"Uzun: 12 dönüş\" yap. Ardından kendin <strong>Başlat</strong>'a basıp S = 60 ve S = 240 birimle birer merdiven yap (üst/alt düğmeleri ya da ↑/↓ okları).",
        observe:
          "8 dönüşte <strong>Benzetilmiş gözlemci: ölçülen k</strong> %2,91 (ss %0,90; ortalama 34,9 deneme), kuram %3,00, fark −%3,2; dönüş ortalaması ise %4,20 (+%40). 6 dönüşte en çok olabilirlik eşiği %2,90, dönüş ortalaması %4,43 (+%48); 12 dönüşte %2,92 ve %3,89 (+%30). Kendi merdivenlerinde <strong>Senin Weber oranın k</strong> kartı bütün S'lere başlangıçtan geçen doğruyu uydurur; grafikte noktalarının o doğruya yaslanıp yaslanmadığına bak.",
        explain:
          "Merdiven %25'lik büyük bir farktan başlar ve kısa bir koşuda dönüşlerin çoğu iniş yolunda, eşiğin üstünde kalır; dönüş sayısı arttıkça bu sapma azalır. Sayfa bu yüzden eşiği bütün denemelere en çok olabilirlikle uydurulan psikometrik eğrinin %70,7 noktasından okur; kalan −%3'lük sapma da raporlanır. Tek bir merdivenin eşiği yaklaşık ±%30 oynar: S = 60 ve S = 240'taki Δ/S'lerin arasındaki fark bundan büyük değilse Weber'i çürütmüş olmazsın. Çok küçük farklarda ekranın piksel sınırına da çarparsın; durum satırı bir pikselin kaç birim olduğunu yazar.",
      },
      {
        title: "Alanları sayıyla söyle: logaritma mı, kuvvet mi?",
        predict:
          "Alanı soldakinin 4 katı olan bir daireye 400 mü dersin, daha az mı? On yanıtına kuvvet yasası mı, logaritma yasası mı daha iyi uyacak?",
        do:
          "03 · Fechner ve Stevens sekmesinde on daire için <strong>Sağdaki dairenin alanı, soldaki 100 ise kaç?</strong> kutusuna izlenimini yaz ve <strong>Tahmini gir</strong>. Bitince <strong>Eksenler</strong> menüsünü \"Log–log\" ile \"Yarı-log\" arasında değiştir. Benzetilmiş gözlemciye bak (üs 0,70, tohum 1), sonra <strong>Yeni benzetim</strong>'e bas. Son olarak <strong>Fechner'in sayımı</strong>'nda uyaran oranını 2 kattan 100 kata çıkar.",
        observe:
          "Tohum 1'de benzetilmiş gözlemcinin uydurulan üssü 0,826 (kuram 0,70, fark +0,126); kuvvet ve logaritma yasalarının KOK hataları 22,3 / 50,2, yani \"kuvvet yasası daha iyi uyuyor\". Tohum 2'de üs 0,644 çıkar. Bu bir yanlılık değil, örnekleme saçılmasıdır: σ = 0,2'lik log gürültü ve bu on oranla eğimin standart hatası yaklaşık 0,064'tür; tohum 1 kuramdan yaklaşık iki standart hata yukarıda kalmıştır, 200 tohumun ortalaması ise 0,70'tir. Fechner sayacı k = 0,030 iken 2 kat için 23,4 FEF, 100 kat için yalnız 155,8 FEF verir. Senin üssünün kartı Stevens'ın görsel alan değeri 0,7'yi yanına koyar.",
        explain:
          "a &lt; 1 sıkıştırmadır: büyük daireleri olduklarından küçük, küçükleri olduklarından büyük söylersin. Her yasa kendi ekseninde düz bir doğrudur; veri hangisinde daha düz duruyorsa o model daha iyi uyar. Ama on yanıt, iki iki-parametreli modeli kesin ayırmak için azdır. Fechner sayacı logaritmanın imzasını gösterir: her ikiye katlama aynı sayıda adım ekler (k = 0,030'da 23,4); 100 kat, 2 katın yaklaşık 6,6 katı adımdır, 50 katı değil.",
      },
      {
        title: "Beklenti görmeyi değil, kararı kaydırır",
        predict:
          "Lekenin sık geldiğini (%75) bildiğinde daha mı iyi görürsün, yoksa yalnız daha sık mı \"var\" dersin? d′ mi değişir, c mi?",
        do:
          "04 · Sinyal saptama sekmesinde varsayılan benzetimi oku (<strong>Duyarlılık d′</strong> 1,5, <strong>Ölçüt c</strong> 0,00, sinyal olasılığı %50, 1000 deneme). Benzetimin <strong>Sinyal olasılığı</strong>'nı %75 yap, sonra <strong>Doğruluğu en çoklayan ölçüt</strong>'e bas. Ardından kendin aynı <strong>Lekenin gücü</strong> ile önce %25, sonra %75 sinyal olasılığında birer blok yap (V ve Y tuşları da çalışır).",
        observe:
          "Varsayılanda H %75,4 (377/500; kuram %77,3), F %21,0 (105/500; kuram %22,7), d′ 1,49, c 0,06, ROC altındaki alan %85,6, doğru yanıt oranı %77,2. %75'e geçince ölçüt hâlâ 0 iken doğruluk %76,3, en iyi ölçütte kuram %82,5 der. Düğme ölçütü −0,75'e çeker (c* = −0,73, kaydırıcının 0,05'lik adımına yuvarlanmış): H %93,5, F %52,4, d′ 1,45, c −0,78, doğruluk %82,0. ROC'ta nokta aynı eğri boyunca sağ üste kaydı.",
        explain:
          "Yanlış alarmlar artarken doğruluk yükseldi, çünkü sinyal sıkken \"var\" demek daha az kanıt ister; bu bir ödünleşimdir, görme gücü (d′) değişmemiştir. Kendi bloklarında da d′ benzer kalıp c değişiyorsa, kararın gördüğünden değil beklentinden etkilenmiştir. Dikkat: %50 sinyal olasılıklı 32 denemelik bir blokta her orana yalnız 16 deneme düşer; H ≈ %75 iken standart hatası yaklaşık 11 puan, d′'nün standart hatası da yaklaşık 0,5'tir. Bloklar arasındaki 0,3–0,4'lük d′ farkları bu yüzden rastlantı olabilir; c'deki büyük kaymaya bak.",
      },
    ],
  },
  wow: [
    {
      title: "Bir sabahın yıldönümü",
      body:
        "Psikofizikçiler 22 Ekim'i anar: anlatıya göre Gustav Fechner 1850'de o sabah, zihni ölçmenin yeni bir yoluyla uyandı. On yıl sonra yayımladığı <em>Elemente der Psychophysik</em> (1860) alanın adını ve ilk yöntemlerini verdi. Fechner'in yolu aslında bir kazayla açılmıştı: 1839'da Güneş'e renkli camlarla bakarak gözlerini yaralamış ve kürsüsünü bırakmıştı.",
    },
    {
      title: "Radar ekranından psikoloji laboratuvarına",
      body:
        "Sinyal saptama kuramının erken çalışmalarının çoğu radar araştırmacılarınındı: gürültülü bir ekranda bir uçağın izini seçme sorunu, sesi duyma ya da bir lekeyi görme sorunuyla aynı matematiğe sahipti. OpenStax'ın psikoloji kitabı kuramın ilk kullanımlarından birinin hava trafik denetçilerinin radardaki izleri saptamasını iyileştirmek olduğunu yazar. Bugün aynı d′ ve ROC, tanı testlerinden bellek deneylerine uzanan geniş bir alanın ortak dilidir.",
    },
    {
      title: "Seçenek sayısı değil, bit",
      body:
        "Hick'in 1951'de başladığı deneylerde on lamba on Morse anahtarına bağlıydı. Tepki süresi seçenek sayısıyla değil, logaritmasıyla, yani seçeneklerin taşıdığı bilgiyle (bit) doğrusal arttı. Yasanın sınırları da öğreticidir: rastgele dizilmiş bir listede aramak doğrusal zaman alır, alışılmış sözel tepkilerde ve göz hareketlerinde artış çok azdır ya da hiç yoktur.",
    },
  ],
  worked: {
    title: "Bir bloğun d′'sü ve en iyi ölçütü",
    prompt:
      "Bir okur %50 sinyal olasılıklı 32 denemelik bir blok yapıyor: 16 sinyal denemesinin 12'sinde \"var\" (isabet), 16 gürültü denemesinin 4'ünde \"var\" (yanlış alarm) diyor. Sayfanın log-doğrusal düzeltmesiyle d′ ve c'yi, ROC altındaki alanı bul. Aynı duyarlılıkla sinyal olasılığı %75 olsaydı doğru yanıtları en çoklayan ölçüt ne olurdu ve doğruluk ne kadar artardı?",
    steps: [
      "Ham oranlar: H = 12/16 = %75, F = 4/16 = %25 (Senin blokların tablosu bunları yazar). Düzeltilmiş oranlar: H = (12 + 0,5)/(16 + 1) = 0,735; F = (4 + 0,5)/(16 + 1) = 0,265.",
      "z değerleri: z(0,735) ≈ +0,629 ve z(0,265) ≈ −0,629. Buradan d′ = 0,629 − (−0,629) ≈ 1,26 ve c = −(0,629 − 0,629)/2 = 0,00: ölçüt tam ortada, okur ne temkinli ne atak.",
      "ROC altındaki alan Φ(d′/√2) = Φ(0,889) ≈ 0,813: rastgele bir sinyal denemesinin iç tepkisi, rastgele bir gürültü denemesininkinden %81 olasılıkla büyüktür. (Düzeltme d′'yü biraz küçültür; ham oranlarla z(0,75) − z(0,25) = 1,35 çıkardı.)",
      "p = 0,75 için en iyi ölçüt: c* = ln((1 − 0,75)/0,75)/d′ = ln(1/3)/1,258 = −1,099/1,258 ≈ −0,87. Bu ölçütte H = Φ(d′/2 − c*) = Φ(1,50) ≈ %93,3 ve F = Φ(−d′/2 − c*) = Φ(0,24) ≈ %59,7.",
      "Doğruluk: c = 0'da 0,75·0,735 + 0,25·(1 − 0,265) = 0,735; c*'da 0,75·0,933 + 0,25·(1 − 0,597) ≈ 0,801. Sayfada sınamak için benzetimde d′ 1,3, sinyal olasılığı %75 seçip <strong>Doğruluğu en çoklayan ölçüt</strong>'e bas: ölçüt c* = ln(1/3)/1,3 ≈ −0,85'e yuvarlanır.",
    ],
    result:
      "d′ ≈ 1,26, c = 0,00, AUC ≈ %81. Sinyal sık olsaydı ölçütü −0,87'ye çekmek, yanlış alarmları %26'dan %60'a çıkarmasına rağmen doğruluğu %73,5'ten %80,1'e yükseltirdi; duyarlılık hiç değişmeden.",
  },
  misconceptions: [
    {
      myth: "Yanılsamaya kanan kişinin gözünde ya da dikkatinde bir kusur vardır.",
      truth:
        "Yanılsamalar sistematiktir ve hemen herkeste görülür; bildiğin hâlde sürer. Eşzamanlı karşıtlıktaki iki kare ve Hermann ızgarasının sokakları piksel düzeyinde aynıdır (çizime dokunup gerçek değeri okuyabilirsin). Bunlar görme sisteminin bağlamı kullanma biçiminin yan ürünleridir; nedenleri hâlâ tartışılır, ama bir \"bozukluk\" belirtisi değildir.",
    },
    {
      myth: "Eşik keskin bir çizgidir: altını hiç görmezsin, üstünü hep görürsün.",
      truth:
        "Doğru yanıt olasılığı farkla birlikte yumuşak bir eğri boyunca yükselir; eşik, bu eğrinin seçilmiş bir noktasıdır (merdivende %70,7). Eşiğin biraz altında da şanstan iyi yanıt verirsin, üstünde de bazen yanılırsın.",
    },
    {
      myth: "Daha sık \"var\" diyen gözlemci daha iyi görüyordur.",
      truth:
        "İsabet oranı tek başına duyarlılığı söylemez; yanlış alarmlar da birlikte artıyorsa yalnızca ölçüt kaymıştır. Sinyal saptama kuramı bu yüzden iki sayı verir: d′ duyarlılığı, c karar eğilimini ölçer. Benzetimde ölçütü 0'dan −0,75'e çekmek kuramda isabeti %77,3'ten %93,3'e çıkarır, d′ ise 1,5'te kalır.",
    },
    {
      myth: "Ekranda ölçtüğüm tepki süresi saf olarak benim beynimin hızıdır.",
      truth:
        "Ekran görüntüyü bir sonraki yenilemede gösterir (60 Hz'de 16,7 ms'ye kadar), dokunmatik ekran ve işletim sistemi onlarca milisaniye ekleyebilir. Bu sabit gecikmeler kesişimi (a) büyütür, eğimi (b) değiştirmez: benzetimde 60 ms gecikme kuram kesişimini 247 ms'den 307 ms'ye taşır, eğim 150 ms/bit kalır. Sonuç bir yeteneğin ya da sağlığın ölçüsü de değildir.",
    },
  ],
  glossary: [
    { term: "Psikofizik", definition: "Fiziksel uyaran ile onun yarattığı duyum arasındaki ilişkiyi nicel olarak ölçen bilim dalı; adını Fechner 1860'ta koydu." },
    { term: "Öznel eşitlik noktası (ÖEN)", definition: "Karşılaştırma uyaranının standarda eşit göründüğü fiziksel değer; fiziksel eşitlikten farkı yanılsamanın büyüklüğüdür." },
    { term: "Fark edilebilir en küçük fark (FEF)", definition: "İki uyaranın belirlenmiş bir olasılıkla (burada %70,7) ayırt edildiği en küçük fark; fark eşiği de denir." },
    { term: "Weber oranı (k)", definition: "Fark eşiğinin standart uyarana oranı Δ/S; Weber yasasına göre orta büyüklükteki uyaranlarda yaklaşık sabittir." },
    { term: "Psikometrik fonksiyon", definition: "Doğru ya da \"var\" yanıtı olasılığını uyaran düzeyinin fonksiyonu olarak veren, S biçimli eğri." },
    { term: "Duyarlılık (d′)", definition: "Sinyal ve gürültü iç tepki dağılımlarının ortalamaları arasındaki uzaklık, gürültünün standart sapması biriminde: d′ = z(H) − z(F)." },
    { term: "ROC eğrisi", definition: "Sabit duyarlılıkta ölçüt kaydıkça izlenen (yanlış alarm, isabet) noktalarının eğrisi; altındaki alan Φ(d′/√2)'dir." },
    { term: "Hick–Hyman yasası", definition: "Seçimli tepki süresinin, eşit olası seçeneklerin taşıdığı bilgiyle doğrusal arttığını söyleyen kural: TS = a + b·log₂ n." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Psikoloji lisansında bu sayfanın yöntemleri <strong>Deneysel Psikoloji</strong> ve <strong>Duyum ve Algı</strong> derslerinin omurgasıdır. Orada psikometrik fonksiyon bir eşik ve bir eğimle birlikte en çok olabilirlikle uydurulur (bu sayfanın Weber sekmesinin yaptığı gibi), dalgınlık hataları modele eklenir ve uyarlamalı yöntemlerin yanlılıkları benzetimle incelenir. Sinyal saptama, <strong>İstatistik</strong> dersindeki I. ve II. tür hatayla ve karar kuramıyla birleşir: isabet testin gücüne, yanlış alarm anlamlılık düzeyine karşılık gelir; en iyi ölçüt bir olabilirlik oranı testidir.",
      "<strong>Bilişsel Psikoloji</strong> ve <strong>Bilişsel Sinirbilim</strong> derslerinde tepki süresi dağılımlarının biçimi (bu sayfanın kullandığı ex-Gauss gibi) ve hız–doğruluk ödünleşimi, kanıtın zamanla biriktiği karar modelleriyle açıklanır. Eşit olmayan varyanslı sinyal saptama, güven derecelendirmeleriyle çizilen z-ROC eğrileri ve tanı testlerinin değerlendirilmesi de buradan devam eder. Fechner–Stevens tartışması ise ölçme kuramına, yani bir sayının ne zaman gerçekten bir büyüklüğü ölçtüğü sorusuna açılır.",
    ],
    topics: ["Psikometrik fonksiyon uydurma", "Uyarlamalı psikofizik yöntemler", "Sinyal saptama ve karar kuramı", "z-ROC ve eşit olmayan varyans", "Bilgi kuramı ve tepki süresi", "Hız–doğruluk ödünleşimi", "Ölçme kuramı ve ölçek türleri"],
  },
  quiz: [
    {
      question: "Weber oranı k = 0,030 olan bir gözlemci için Fechner'in sayımına göre uyaranın 2 katına çıkması 23,4 FEF'tir. Uyaran 4 katına çıkarsa kaç FEF olur?",
      options: ["Yaklaşık 23", "Yaklaşık 47", "Yaklaşık 94", "Yaklaşık 70"],
      answer: 1,
      explanation: "n = ln(S/S₀)/ln(1 + k) logaritmiktir: 4 kat iki ardışık ikiye katlamadır ve her ikiye katlama aynı sayıda adım ekler, 2 × 23,4 ≈ 46,9. Fechner'in sayacında 4 katı seçip doğrulayabilirsin. Bu yüzden 100 kat bile yalnız 155,8 FEF'tir.",
    },
    {
      question: "Bir okur aynı leke gücünde önce %25, sonra %75 sinyal olasılıklı birer blok yapıyor. Eşit varyanslı model doğruysa ve okur beklentisini kullanıyorsa ne görmeyi beklersin?",
      options: [
        "d′ artar, c değişmez",
        "d′ benzer kalır, c azalır (daha sık \"var\")",
        "d′ ve c birlikte artar",
        "İsabet oranı değişmez, yalnız yanlış alarm azalır",
      ],
      answer: 1,
      explanation: "Sinyal olasılığı duyarlılığı değil karar ölçütünü etkiler: en iyi ölçüt c* = ln((1 − p)/p)/d′, p = 0,75'te negatiftir. Okur daha az kanıtla \"var\" der; isabet ve yanlış alarm birlikte artar ve ROC noktası aynı eğri boyunca kayar.",
    },
    {
      question: "Tepki süresi ölçümüne her denemede aynı 60 ms'lik cihaz gecikmesi ekleniyor. Hick–Hyman doğrusu TS = a + b·log₂ n'de ne değişir?",
      options: ["Yalnız eğim b artar", "Yalnız kesişim a 60 ms artar", "a ve b ikisi de 60 ms artar", "Hiçbir şey değişmez"],
      answer: 1,
      explanation: "Sabit gecikme her n'deki süreyi aynı miktarda kaydırır; doğru yukarı ötelenir ama eğimi değişmez. Benzetimde Sabit cihaz gecikmesi'ni 60 ms yapınca ölçülen b · a 150 · 254 ms'den 150 · 314 ms'ye geçer. Bu yüzden farklı cihazlarda eğim, mutlak süreden daha güvenilir bir karşılaştırmadır.",
    },
  ],
  next: [
    { href: "hipotez-testi-ve-guven-araligi.html", title: "Hipotez Testi ve Güven Aralığı: Örnekleme, p-Değeri, Hata Türleri ve Güç", why: "İsabet ve yanlış alarmın istatistikteki adları: güç ve I. tür hata. p-değeri ve hata türleri sekmesinde ölçüt kaydırmanın bedelini binlerce tekrarla gör." },
    { href: "bayes-olasilik.html", title: "Bayes ve Koşullu Olasılık Laboratuvarı", why: "En iyi ölçütün neden sinyal olasılığına bağlı olduğunun kökü: önsel, olabilirlik oranı ve tanı testinde sonsal olasılık." },
    { href: "karar-ve-bilissel-yanliliklar.html", title: "Karar ve Bilişsel Yanlılıklar: İnsanlar Gerçekte Nasıl Seçer?", why: "Algıdan yargıya: klasik karar problemlerini kendin yanıtla, beklenen fayda ve beklenti kuramını insanların gerçek seçimleriyle karşılaştır." },
    { href: "renk-teorisi.html", title: "Renk: Kod, Işık ve Karışım", why: "Eşzamanlı karşıtlıktaki gri düzeylerinin ışık miktarına nasıl çevrildiği: bir renk kodu neden ışık miktarı değildir." },
  ],
  sources: [
    { title: "OpenStax · Psychology 2e, 5.1 Sensation versus Perception", url: "https://openstax.org/books/psychology-2e/pages/5-1-sensation-versus-perception", note: "Mutlak eşik, fark eşiği, Weber yasası ve sinyal saptama kuramına giriş (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Weber–Fechner law", url: "https://en.wikipedia.org/wiki/Weber%E2%80%93Fechner_law", note: "Weber'in oranı, Fechner'in 1860 tarihli Elemente der Psychophysik'i ve logaritma yasası, yasaların zayıf ve güçlü uyaranlarda bozulması (İngilizce)." },
    { title: "Wikipedia · Detection theory", url: "https://en.wikipedia.org/wiki/Detection_theory", note: "Radar kökenleri, Peterson–Birdsall–Fox, Tanner–Swets–Green ve Green–Swets 1966; duyarlılık, ölçüt ve ROC (İngilizce)." },
    { title: "Wikipedia · Hick's law", url: "https://en.wikipedia.org/wiki/Hick%27s_law", note: "Hick (1952) ve Hyman (1953) deneyleri, TS = b·log₂(n + 1) biçimi ve yasanın istisnaları (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
