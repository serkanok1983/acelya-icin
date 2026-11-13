window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["gen-ifadesi-ve-molekuler-biyoloji"] = {
  slug: "gen-ifadesi-ve-molekuler-biyoloji",
  title: "Gen İfadesi: DNA'dan Proteine, Anahtardan Saate",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir geni mRNA'ya yaz, kodon kodon proteine çevir; sonra aynı genin hücrede kaç protein yaptığını say, bir hücrenin geçmişini nasıl hatırladığını ve üç genin nasıl saat kurduğunu ölç.",
  hook:
    "Sinir hücren ile kas hücren aynı DNA'yı taşır; harf harf aynı kitap. Biri elektrik sinyali taşır, öteki kasılır. Fark kitapta değil, hangi sayfanın ne zaman, ne kadar sık okunduğunda. Daha da tuhafı: genetik olarak özdeş iki bakteri, aynı indükleyici derişiminde biri laktoz genlerini açık, öteki kapalı tutabilir. Fark ortamda değil, hücrenin geçmişindedir.",
  bigIdea:
    "Gen ifadesi bir <strong>üretim–yıkım dengesidir</strong>: DNA'dan mRNA, mRNA'dan protein yapılır, ikisi de yıkılır; düzeyleri hızların oranı belirler ve genler birbirini baskılayıp desteklediğinde bu basit denge bir hafızaya, bir anahtara ya da bir saate dönüşür.",
  story: [
    "Francis Crick 1957'de bir kural ortaya attı ve ertesi yıl yayımladı: dizi bilgisi nükleik asitten proteine akar, proteinden geri dönmez. Adını <strong>merkezî dogma</strong> koydu. 1970'te <em>Nature</em>'da kuralı yeniden yazarken neyi kastettiğini netleştirdi: bilginin kalıntı kalıntı, dizi olarak proteinden nükleik aside ya da başka bir proteine aktarılamayacağını. RNA'dan DNA'ya yazılan ters transkripsiyon, örneğin HIV gibi retrovirüslerde, bu kuralı bozmaz; okun yönü proteinde biter.",
    "Peki dört harfli bir alfabe yirmi amino asidi nasıl yazar? 1961'de Crick, Sydney Brenner ve ekibi, T4 adlı bir bakteri virüsünün tek bir geninde proflavin denen bir mutajenle nükleotit ekleyip çıkararak kodun üçerli okunduğunu gösterdi: bir ya da iki ekleme okuma çerçevesini kaydırıp proteini bozuyor, üç ekleme ise çerçeveyi yeniden yerine oturtuyor ve gen çoğunlukla işini görüyordu. Aynı yıl Marshall Nirenberg ve Heinrich Matthaei hücresiz bir sisteme yalnız urasilden oluşan bir RNA verdiler; çıkan zincir yalnız fenilalanindi. Kodun ilk sözcüğü okunmuştu: <strong>UUU</strong>. Sonraki yıllarda 64 üçlünün hepsi çözüldü; Nirenberg, Har Gobind Khorana ve Robert Holley 1968 Nobel ödülünü paylaştı.",
    "Kodu bilmek, genin ne zaman okunduğunu bilmek değildir. Jacques Monod savaş yıllarında bakterilerin iki şekerden önce birini, sonra ötekini tükettiğini gözlemişti. Ortağı François Jacob'un yolu daha çetindi: tıp eğitiminin ortasında, 1940'ta işgal altındaki Fransa'dan İngiltere'ye geçmiş, Fransız 2. Zırhlı Tümeni'nin sağlık bölüğünde savaşmış ve 1944'te bir Alman hava saldırısında ağır yaralanmıştı. Savaştan sonra ikisi Paris'teki Pasteur Enstitüsü'nde <em>E. coli</em>'nin laktoz genlerini birlikte incelediler. İkilinin 1961'de <em>Journal of Molecular Biology</em>'de yayımladığı makale bir genler kümesinin bir baskılayıcı tarafından nasıl açılıp kapatıldığını anlattı: <strong>operon</strong>. Jacob, Monod ve André Lwoff 1965 Nobel ödülünü enzim ve virüs sentezinin genetik denetimi üzerine buluşlarıyla aldı.",
    "Kırk yıl sonra soru tersine döndü: devreyi anlıyorsak kurabilir miyiz? Ocak 2000'de <em>Nature</em>'ın aynı sayısında arka arkaya iki makale çıktı. Timothy Gardner, Charles Cantor ve James Collins birbirini baskılayan iki genle <em>E. coli</em>'de iki kararlı bir <strong>genetik anahtar</strong> kurdu; Michael Elowitz ve Stanislas Leibler üç baskılayıcıyı bir halkaya bağlayıp kendi kendine salınan bir <strong>repressilatör</strong> yaptı. Hücrelerin salınımları bir süre sonra birbirinden faz kaydırıyordu; 2016'da başka bir ekip proteinlerin yıkım etiketlerini kaldırıp raportör geni devrenin plazmitine taşıyınca periyot uzadı ve salınımlar daha düzenli hâle geldi. Gürültünün kendisi de araştırma konusu oldu: 2002'de Michael Elowitz, Arnold Levine, Eric Siggia ve Peter Swain'in <em>Science</em>'ta \"Stochastic gene expression in a single cell\" başlığıyla yayımladığı çalışma, aynı biçimde düzenlenen iki raportör genle tek hücredeki rastlantısallığı ölçmenin yolunu açtı. Sayfanın tek hücre benzetimi ise Daniel Gillespie'nin 1976–1977'de geliştirdiği algoritmadır.",
  ],
  core: [
    {
      heading: "İki iplik, bir mRNA, üçlü bir kod",
      body:
        "DNA'nın iki ipliği antiparaleldir. RNA polimeraz <strong>kalıp ipliği</strong> 3′→5′ yönünde okur ve mRNA'yı 5′→3′ yönünde uzatır; bu yüzden mRNA, öteki ipliğin, yani <strong>kodlayan ipliğin</strong> dizisinin T yerine U yazılmış hâlidir. Ribozom mRNA'yı 5′ ucundan başlayarak üçer üçer okur. 64 kodonun 61'i bir amino asit, 3'ü (UAA, UAG, UGA) dur demektir; AUG hem metiyonin hem başlangıç kodonudur ve okuma çerçevesini belirler. Dur kodonu zincire amino asit eklemez. Sayfadaki örnek gende çeviri mRNA'nın 13. nükleotidindeki AUG'dan başlar, 52. nükleotitteki UAA'da biter: 13 amino asit, MASKGEELFTGWH.",
      formula: "5′-ATG GCA…-3′ (kodlayan) → 5′-AUG GCA…-3′ (mRNA) → Met–Ala–…",
      formulaNote: "Kalıp iplik aynı bölgede 3′-TAC CGT…-5′ diye okunur; mRNA ona tamamlayıcı, kodlayana özdeştir.",
    },
    {
      heading: "Rastgele dizide gen gibi görünen çerçeveler",
      body:
        "<strong>Açık okuma çerçevesi</strong> (ORF), AUG ile başlayıp aynı çerçevede bir dur kodonuyla biten bölgedir. Dört bazın eşit olasılıklı ve bağımsız olduğu rastgele bir dizide bir konumda AUG çıkma olasılığı 1/64'tür; sonraki her kodonun dur olmama olasılığı 61/64. AUG'u 0'dan sayılan i. konumda başlayan ve tam j kodon (AUG dahil, dur hariç) süren bir ORF'nin olasılığı (1/64)(61/64)<sup>j−1</sup>(3/64)'tür. Dur kodonunun dizi içinde kalması için j en çok J<sub>i</sub> = ⌊(L − i)/3⌋ − 1 olabilir; j = k'dan J<sub>i</sub>'ye geometrik seri toplanır ve 3/64, 1 − 61/64 paydasını sadeleştirince aşağıdaki kapalı biçim kalır. Beklenen değerlerin toplanabilirliği sayesinde iç içe ORF'ler sorun çıkarmaz. Uzun dizide bu L/64·(61/64)<sup>k−1</sup>'e yaklaşır. Sayfada L = 1000 nt, k = 30 kodon için tam değer 3.29, yaklaşım 3.88 (+18 %), 200 rastgele dizide ölçülen 2.99 ± 0.14. Dur kodonları ortalama 64/3 ≈ 21.3 kodonda bir geldiği için kısa bir ORF hiçbir şey kanıtlamaz; ancak uzun bir ORF rastlantıdan çok seçilime işaret eder.",
      formula: "E = Σ<sub>i</sub> (1/64)[(61/64)<sup>k−1</sup> − (61/64)<sup>J<sub>i</sub></sup>]",
      formulaNote: "Üç ileri çerçeve sayılır; iç içe AUG'lar ayrı başlangıçtır. Ters ipliğin çerçeveleri ve gerçek dizilerin baz eğilimleri modelde yok.",
    },
    {
      heading: "Üretim ve yıkım: düzeyi hızların oranı belirler",
      body:
        "En sade modelde mRNA sabit k<sub>m</sub> hızıyla yapılır ve her molekül γ<sub>m</sub> olasılık hızıyla yıkılır; her mRNA da k<sub>p</sub> hızıyla protein yapar, protein γ<sub>p</sub> hızıyla kaybolur (bakteride bunun büyük kısmı bölünmeyle seyrelmedir). Türevleri sıfıra eşitleyince denge düzeyleri çıkar. mRNA tek basamaklı bir süreçtir: yarı yola ln 2/γ<sub>m</sub>'de varır. Protein ise mRNA'nın yükselmesini beklediği için önce yavaş başlar; kapalı biçimden γ<sub>m</sub> ≫ γ<sub>p</sub> iken yarı yükselme süresi t<sub>½</sub> ≈ [ln 2 + ln(γ<sub>m</sub>/(γ<sub>m</sub> − γ<sub>p</sub>))]/γ<sub>p</sub> olur: protein kendi ln 2/γ<sub>p</sub> süresine ek olarak yaklaşık 1/γ<sub>m</sub> kadar gecikir. Kararlı bir protein bu yüzden yavaş yanıt verir.",
      formula: "dm/dt = k<sub>m</sub> − γ<sub>m</sub>m,  dp/dt = k<sub>p</sub>m − γ<sub>p</sub>p  ⇒  m* = k<sub>m</sub>/γ<sub>m</sub>,  p* = k<sub>m</sub>k<sub>p</sub>/(γ<sub>m</sub>γ<sub>p</sub>)",
      formulaNote: "Sayfadaki bütün hızlar öğretim değeridir; belirli bir organizmanın ölçülmüş değerleri değildir.",
    },
    {
      heading: "Gürültü: aynı ortalama, farklı hücreler",
      body:
        "Molekül sayıları küçükse her yapım ve yıkım bir zar atışıdır. mRNA sayısı Poisson dağılır: varyans ortalamaya eşittir, <strong>Fano çarpanı</strong> (varyans/ortalama) 1'dir. Protein ise patlamalarla gelir: bir mRNA ömrü boyunca ortalama b = k<sub>p</sub>/γ<sub>m</sub> protein yapar. Durağan moment denklemleri bunu nicel yapar: Var(m) = ⟨m⟩, Cov(m, p) = k<sub>p</sub>⟨m⟩/(γ<sub>m</sub> + γ<sub>p</sub>) ve Var(p) = ⟨p⟩ + k<sub>p</sub>Cov(m, p)/γ<sub>p</sub>. ⟨p⟩ = k<sub>p</sub>⟨m⟩/γ<sub>p</sub> ile bölünce aşağıdaki formül kalır. γ<sub>p</sub> ≪ γ<sub>m</sub> iken formül 1 + b kaba kuralına iner; sayfadaki Gillespie benzetimi dört olayı tek tek seçip ikisini de sınar.",
      formula: "Fano<sub>p</sub> = Var(p)/⟨p⟩ = 1 + k<sub>p</sub>/(γ<sub>m</sub> + γ<sub>p</sub>)",
      formulaNote: "Varsayılan hızlarla 1 + 2/0.22 = 10.09; kaba kural 1 + b = 11.0. Promotörün açılıp kapanması (telegraf modeli) gürültüyü daha da artırır ama sayfada modellenmez.",
    },
    {
      heading: "Geri besleme: hafıza, anahtar ve saat",
      body:
        "<strong>lac operonunda</strong> karar iki sinyalle verilir: laktoz yokken baskılayıcı operatöre bağlanır; glukoz azalınca cAMP–CAP promotöre bağlanıp transkripsiyonu güçlendirir. OpenStax Tablo 16.2'nin dört satırı (glukoz var/yok × laktoz yok/var) transkripsiyon için sırayla <em>No, Some, No, Yes</em> (hayır, biraz, hayır, evet) der; sayfanın modeli dördünü de verir (0.1 %, 9.9 %, 1.0 %, 99.0 %). Operonun ürünü permease indükleyiciyi hücreye taşıdığında <strong>pozitif geri besleme</strong> doğar ve eğri S biçimini alır: bir aralıkta iki kararlı durum vardır, hücre geçmişini hatırlar. Karşılıklı baskılayan iki gen (anahtar) simetrik denge noktası kararsızlaştığında iki kararlı olur; bunun koşulu kazanç çarpımının 1'i aşmasıdır. Üç genli bir baskı halkasında ise gecikmeli <strong>negatif geri besleme</strong> dengeyi kararsız yapınca kalıcı bir salınım, bir limit çevrim doğar. Doğrusal kuramın verdiği 2π/Im λ periyodu yalnız salınımın doğduğu eşiğin yakınında geçerlidir.",
      formula: "α<sub>c</sub> = s·n/(n − 1),  s = (n − 1)<sup>−1/n</sup>;   (λ + 1)(λ + β) = −aβω,  ω³ = 1",
      formulaNote: "Anahtarda n = 2 için α<sub>c</sub> = 2; n = 1'de hiçbir α yetmez. Halkada a, dengede baskılama eğrisinin eğimidir; Re λ = 0 eşiği verir.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var. <strong>01 · Transkripsiyon ve çeviri</strong> yazdığın DNA'yı üç iplik hâlinde gösterir, oynatınca polimerazı ve ribozomu yürütür; altında rastgele dizilerde ORF sayar. <strong>02 · mRNA ve protein dinamiği</strong> aynı geni hem ortalama denklemlerle (RK4 ve kapalı biçim) hem de Gillespie ile tek hücrede çözer. <strong>03 · lac operonu</strong> doğruluk tablosunu, doz–yanıt eğrisini ve permease geri beslemesinin histerezisini gösterir. <strong>04 · Gen ağları: anahtar ve saat</strong> genetik anahtarın faz düzlemini ve repressilatörü içerir. Her kartta ölçülen değer kuramın yanında durur. Bütün hızlar öğretim değeridir; RNA kırpma ve kromatin modellenmez.",
    experiments: [
      {
        title: "Dur kodonu silinirse ne olur?",
        predict: "Örnek gendeki UAA'yı UAC'ye çevirirsen protein kısalır mı, uzar mı, hiç yapılmaz mı? Kalıp ipliği yazarsan protein değişir mi?",
        do: "01 sekmesinde <strong>Dur kodonu yok</strong> düğmesine bas ve Protein kartlarını oku. Sonra <strong>Örnek gen</strong>'e dön, dizinin ters tamamlayıcısını kutuya yapıştır: <code>GCTCGAGCTTAGTGCCAACCGGTGAACAGTTCTTCACCTTTGGATGCCATAGCTGACCTCCT</code> ve <strong>Yazdığın iplik</strong> menüsünde Kalıp iplik'i seç.",
        observe: "Protein uzunluğu \"16 amino asit (dur yok)\", Dur kodonu \"yok\", zincir MASKGEELFTGWHYAR olur; durum satırı ribozomun mRNA'nın sonuna kadar 16 kodon okuyup takıldığını söyler. Ters tamamlayıcı kalıp olarak yazıldığında kart \"62 nt · kalıptan çevrildi\" der ve protein yine 13 amino asitlik MASKGEELFTGWH'dir.",
        explain: "Çerçeveyi AUG belirler; dur kodonu yalnız bitişi söyler. UAC tirozin olduğundan zincir Y ile sürer. Kalıp iplik 3′→5′ okunduğu için mRNA onun ters tamamlayıcısıdır, yani kodlayan ipliğin aynısı. Hücrede dursuz mRNA'lar için kurtarma yolları vardır; sayfa bunları içermez.",
      },
      {
        title: "Aynı ortalama, dört kat fazla gürültü",
        predict: "İki gen aynı ortalama protein düzeyine sahipse hücreden hücreye çeşitlilikleri de aynı mı olur?",
        do: "02 sekmesinde önce varsayılanı oku, sonra <strong>Büyük patlamalar (b = 50)</strong> ve <strong>Sakin gen (b = 1)</strong> düğmelerine sırayla bas. Denge ve Fano kartlarını karşılaştır.",
        observe: "Varsayılanda p* 500 protein, protein Fano 9.75 ± 0.63, kuram 10.09. Büyük patlamalarda p* yine 500 ama Fano 43.5 ± 3.4, kuram 42.67: varsayılanın dört katından fazla; kaba kural 1 + b = 51.0 tam formülden +19.5 % sapar. Sakin gende p* 250, Fano 1.96 ± 0.11, kuram 1.962; mRNA Fano ikisinde de 1'e yakındır.",
        explain: "Fano = 1 + k<sub>p</sub>/(γ<sub>m</sub> + γ<sub>p</sub>). Az mRNA yapıp her birinden çok protein çıkarmak ortalamayı korur ama proteini iri paketler hâlinde getirir. Büyük patlamalarda γ<sub>p</sub>/γ<sub>m</sub> = 0.20 olduğundan 1 + b yaklaşımı bozulur.",
      },
      {
        title: "Aynı ortam, iki hücre, iki karar",
        predict: "İndükleyici I = 2.40 K iken daha önce hiç indüklenmemiş bir hücre ile tam indüklenmiş bir hücre aynı duruma mı gider?",
        do: "03 sekmesinde <strong>Hücrenin geçmişi</strong> menüsünü önce indüklenmemiş, sonra tam indüklenmiş yap ve \"Bu geçmişle hücrenin durumu y\" kartını oku. Süpürme grafiğinde iki eşiği bul. Sonra <strong>n = 1: işbirliği yok</strong> düğmesine bas.",
        observe: "İndüklenmemiş hücre \"0.018 · kapalı\", indüklenmiş hücre \"0.795 · indüklenmiş\" kalır; denge kartı \"2 / 3\". Açılma 2.945 K (katlanma noktası 2.948 K), kapanma 1.905 K (1.901 K), histerezis genişliği 1.040 K. n = 1'de eşik kartları \"sıçrama yok · katlanma yok\" der, y = 0.603.",
        explain: "Permease indükleyiciyi içeri taşıdıkça kendi genini daha çok açtırır. İşbirliğiyle (n = 2) bu S biçimli bir denge eğrisi ve iki kararlı durum kurar; 1.90–2.95 K arasında hücrenin durumu geçmişine bağlıdır. n = 1'de eğri y doğrusunu bir kez keser, hafıza yok olur.",
      },
      {
        title: "Saatin periyodu: doğrusal kuram ne zaman tutar?",
        predict: "Repressilatörde doğrusal kuramın 2π/Im λ periyodu ölçülen periyoda ne kadar yakın? n'yi eşiğe yaklaştırınca fark büyür mü, küçülür mü?",
        do: "04 sekmesinde varsayılan halkanın periyot kartlarını oku. Sonra <strong>n = 1.65: eşiğe yakın</strong>'a bas, ardından Hill katsayısını 1.50'ye indir. Son olarak <strong>n eşiğini tara</strong>.",
        observe: "Varsayılanda ölçülen 42.42, doğrusal 24.53 (−42.2 %); 2 dk yarı ömürle 122.4 dk. n = 1.65'te 30.10'a karşı 28.15 (−6.5 %), Re λ +0.0047. n = 1.50'de \"salınım yok\", Re λ −0.0135. Tarama \"1.65 (önceki 1.60)\" bulur; kuram 1.611.",
        explain: "Doğrusal kuram dengenin hemen çevresindeki küçük salınımı anlatır; eşikte doğru, uzakta büyük genlikli limit çevrim doğrusal değildir ve daha yavaş döner. Bu yüzden 24.53 varsayılan halkanın periyodu için iyi bir tahmin değildir; doğrusal formül yalnız eşiğe yakın, küçük genlikli salınımlarda tutar.",
      },
    ],
  },
  wow: [
    {
      title: "Anahtar ve saat aynı dergide, arka arkaya",
      body:
        "Sentetik biyolojinin iki kurucu devresi, Gardner–Cantor–Collins anahtarı ve Elowitz–Leibler repressilatörü, <em>Nature</em>'ın 403. cildinin aynı sayısında yayımlandı: repressilatör 335–338, anahtar 339–342. sayfalarda. İkisi de <em>E. coli</em>'deydi; biri iki kararlı bir hafıza, öteki kendi kendine salınan bir saatti.",
    },
    {
      title: "Rastgele harfler de gen gibi görünür",
      body:
        "Sayfanın varsayılan ayarında 200 rastgele 1000 nükleotitlik dizide en uzun açık okuma çerçevesi 139 kodondur. Dizi başına en az 30 kodonluk ortalama 3.29 ORF beklenir. Sayfadaki 13 kodonluk örnek gen ise rastlantıyla çıkabilecek bir ORF'den ayırt edilemez. Bir dizide gen ararken AUG ile dur kodonunu görmek bu yüzden yetmez; asıl ipucu, rastlantıyla açıklanamayacak bir uzunluktur.",
    },
    {
      title: "Kodun ilk sözcüğü: UUU",
      body:
        "1961'de Nirenberg ve Matthaei hücresiz bir sisteme yalnız urasilden yapılmış bir RNA verdi; çıkan zincir yalnız fenilalanindi. 64 üçlüden ilki böyle okundu. Bugün bildiğimiz tabloda 61 kodon amino asit, 3'ü dur kodonu; çoğu amino asidi birden fazla kodon yazar (dejenerelik).",
    },
  ],
  worked: {
    title: "Bir proteinin denge düzeyi, yanıt süresi ve gürültüsü",
    prompt:
      "Bir genin mRNA'sı k<sub>m</sub> = 1.0 mRNA/dk hızıyla yapılıyor, γ<sub>m</sub> = 0.20 /dk ile yıkılıyor; her mRNA k<sub>p</sub> = 2.0 protein/dk yapıyor, protein γ<sub>p</sub> = 0.020 /dk ile kayboluyor. Denge düzeylerini, protein yarı yükselme süresini ve protein Fano çarpanını bul. Hücre iki kat hızlı bölünür de γ<sub>p</sub> 0.040 /dk olursa ne değişir?",
    steps: [
      "Denge: m* = k<sub>m</sub>/γ<sub>m</sub> = 1.0/0.20 = 5.0 mRNA; p* = k<sub>p</sub>m*/γ<sub>p</sub> = 2.0·5.0/0.020 = 500 protein. Patlama boyu b = k<sub>p</sub>/γ<sub>m</sub> = 10 protein/mRNA.",
      "mRNA yarı yükselmesi: ln 2/γ<sub>m</sub> = 0.693/0.20 = 3.47 dk; e-katlı süre 1/γ<sub>m</sub> = 5.00 dk.",
      "Protein: γ<sub>m</sub> ≫ γ<sub>p</sub> olduğundan kapalı biçimde e<sup>−γ<sub>m</sub>t</sup> terimi hızla söner ve p/p* ≈ 1 − e<sup>−γ<sub>p</sub>t</sup>·γ<sub>m</sub>/(γ<sub>m</sub> − γ<sub>p</sub>) kalır. 1/2'ye eşitle: t<sub>½</sub> = [ln 2 + ln(0.20/0.18)]/0.020 = (0.693 + 0.105)/0.020 ≈ 39.9 dk. Proteinin kendi 34.7 dk'sına yaklaşık 1/γ<sub>m</sub> = 5 dk gecikme eklenmiş; protein mRNA'dan 11.5 kat yavaştır.",
      "Gürültü: Fano<sub>p</sub> = 1 + k<sub>p</sub>/(γ<sub>m</sub> + γ<sub>p</sub>) = 1 + 2.0/0.22 = 10.09. Ortalaması 500 olan proteinin standart sapması √(10.09·500) ≈ 71 protein; Poisson olsaydı yalnız √500 ≈ 22 olurdu.",
      "γ<sub>p</sub> = 0.040 /dk: p* = 250 protein'e iner, t<sub>½</sub> ≈ (0.693 + 0.223)/0.040 ≈ 22.9 dk (tam değer 22.8 dk), Fano = 1 + 2.0/0.24 = 9.33. Sayfada 02 sekmesini varsayılanda bırak, sonra γ<sub>p</sub> kaydırıcısını 0.040'a getir: kartlar 250 protein, \"22.8 dk · 22.8 dk\" ve kuram 9.333 der; Gillespie tohum 1'de 8.44 ± 0.65 ölçer (1.4 standart hata, istatistik dalgalanması).",
    ],
    result:
      "m* = 5.00 mRNA, p* = 500 protein, protein yarı yükselmesi 39.9 dk, Fano 10.09. Hızlı bölünme proteini yarıya indirir ve yanıtı yaklaşık 1.75 kat hızlandırır (39.9 dk yerine 22.8 dk); Fano'yu ise pek değiştirmez (10.09 yerine 9.33).",
  },
  misconceptions: [
    {
      myth: "mRNA, kalıp ipliğin dizisinin aynısıdır.",
      truth:
        "Tam tersi: mRNA kalıba tamamlayıcıdır, dolayısıyla <strong>kodlayan ipliğin</strong> dizisini taşır (T yerine U). Kalıp iplik 3′→5′ okunur, mRNA 5′→3′ uzar. Sayfada Yazdığın iplik menüsünü değiştirip üç ipliği yan yana gör.",
    },
    {
      myth: "Her gen tek ve değişmez bir protein yapar.",
      truth:
        "Ökaryotlarda öncül mRNA'dan intronlar çıkarılır ve ekzonlar farklı biçimlerde birleştirilebilir (alternatif kırpma); aynı gen birkaç protein çeşidi yapabilir. Bu laboratuvar kırpmayı ve kromatini modellemez, çeviriyi ilk AUG'dan başlatır; bu bir sadeleştirmedir.",
    },
    {
      myth: "Aynı genleri taşıyan, aynı ortamdaki hücrelerde aynı miktarda protein bulunur.",
      truth:
        "Yapım ve yıkım rastlantısal olaylardır; protein patlamalarla geldiği için varyans ortalamanın çok üstünde olabilir. Varsayılan ayarda Fano 10'dur: 500 proteinli bir ortalama çevresinde hücreler kabaca ±71 protein dağılır.",
    },
    {
      myth: "Bir gen kendi baskılayıcısını üretirse sistem zorunlu olarak salınır.",
      truth:
        "Negatif geri besleme tek başına saat yapmaz; yeterli gecikme ve keskin (işbirlikli) baskı gerekir. Sayfanın varsayılan halkasında (α = 100, β = 0.20) Hill katsayısı 1.611'in altındayken üç protein dengeye yerleşir, Re λ negatiftir.",
    },
  ],
  glossary: [
    { term: "Transkripsiyon", definition: "RNA polimerazın kalıp ipliği 3′→5′ okuyup ona tamamlayıcı RNA'yı 5′→3′ yönünde sentezlemesi." },
    { term: "Çeviri (translasyon)", definition: "Ribozomun mRNA'yı 5′ ucundan üçer nükleotit okuyup kodonları amino asit zincirine çevirmesi." },
    { term: "Kodon", definition: "mRNA'da bir amino asidi ya da durmayı belirten üç nükleotitlik birim; 64 kodonun 61'i amino asit, 3'ü dur yazar." },
    { term: "Açık okuma çerçevesi (ORF)", definition: "AUG ile başlayıp aynı okuma çerçevesindeki ilk dur kodonuna kadar kesintisiz süren kodon dizisi." },
    { term: "Operon", definition: "Bakterilerde tek bir promotör ve operatörden birlikte okunan, birlikte düzenlenen genler kümesi; örneği lac operonu." },
    { term: "Hill katsayısı (n)", definition: "Bir düzenleyicinin etkisinin derişimle ne kadar keskin değiştiğini ölçen üs; n > 1 işbirlikli, anahtar gibi bir yanıt demektir." },
    { term: "Fano çarpanı", definition: "Bir molekül sayısının varyansının ortalamasına oranı; Poisson dağılımında 1, patlamalı üretimde 1'den büyük." },
    { term: "Histerezis", definition: "Bir sistemin aynı girdide geçmişine göre farklı durumda bulunması; artırırken ve azaltırken eşiklerin farklı olması." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede gen ifadesi bir ok dizisidir: DNA → RNA → protein. Üniversitede bu ok önce <strong>Moleküler Biyoloji</strong> ve <strong>Biyokimya</strong> derslerinde bir makineye dönüşür: promotörler ve transkripsiyon faktörleri, ökaryotlarda 5′ başlık, poli(A) kuyruğu ve intron kırpma, kromatin ve histon değişimleri, ribozomun başlangıç kodonunu seçişi. Sayfanın bilerek dışarıda bıraktığı bu katmanlar, aynı genden farklı dokularda farklı ürünlerin nasıl çıktığını açıklar. Mutasyonların okuma çerçevesini nasıl bozduğu ise DNA replikasyonu laboratuvarındadır.",
      "Öteki yol <strong>sistem biyolojisine</strong> çıkar. Buradaki dm/dt = k<sub>m</sub> − γ<sub>m</sub>m denklemi <strong>Diferansiyel Denklemler</strong> dersinin birinci mertebe doğrusal denklemidir; anahtarın sıfır eğimli eğrileri ve kazanç çarpımı faz düzlemi ile doğrusal kararlılık analizidir; repressilatörün eşiği bir Hopf çatallanmasıdır. Gillespie algoritması ve Fano formülü <strong>Olasılık ve Stokastik Süreçler</strong>'de kimyasal ana denklem ve moment kapanışı olarak yeniden karşına çıkar. ORF beklentisi ise biyoinformatikte gen bulmanın ilk, en kaba istatistik testidir.",
    ],
    topics: ["Moleküler biyoloji", "Kimyasal ana denklem", "Telegraf modeli ve transkripsiyon patlamaları", "Faz düzlemi ve iki kararlılık", "Hopf çatallanması ve limit çevrim", "Alternatif kırpma ve kromatin", "Biyoinformatikte gen bulma"],
  },
  quiz: [
    {
      question: "Uzun bir rastgele dizide, en kısa ORF eşiğini k = 30'dan k = 50 kodona çıkarırsan beklenen ORF sayısı yaklaşık kaç katına iner?",
      options: ["30/50 = 0.6 katına", "(61/64)<sup>20</sup> ≈ 0.38 katına", "Yarısına", "Değişmez; yalnız L'ye bağlıdır"],
      answer: 1,
      explanation: "Beklenen sayı (61/64)<sup>k−1</sup> ile üstel düşer: fazladan 20 kodonun her biri 61/64 olasılıkla dur olmamalıdır. (61/64)<sup>20</sup> ≈ 0.38. Sayfada L = 1000 nt için tam değer 3.29'dan 1.17'ye iner (0.36 kat); fark, uzun ORF'lerin dizinin sonunda dur kodonuna yer bulamamasındandır.",
    },
    {
      question: "Varsayılan gende (k<sub>m</sub> = 1.0, γ<sub>m</sub> = 0.20, k<sub>p</sub> = 2.0, γ<sub>p</sub> = 0.020 /dk) transkripsiyonu iki katına çıkarıp çeviriyi yarıya indirirsen ortalama protein ve Fano ne olur?",
      options: ["Ortalama 500, Fano 10.09 (değişmez)", "Ortalama 1000, Fano 10.09", "Ortalama 500, Fano yaklaşık 5.5", "Ortalama 250, Fano yaklaşık 20"],
      answer: 2,
      explanation: "p* = k<sub>m</sub>k<sub>p</sub>/(γ<sub>m</sub>γ<sub>p</sub>) çarpım olduğu için değişmez: 500. Fano ise yalnız k<sub>p</sub>'ye bağlıdır: 1 + 1.0/0.22 ≈ 5.55. Daha çok mRNA ve her birinden daha az protein, aynı ortalamayı daha sakin üretir.",
    },
    {
      question: "lac sekmesinde I = 2.40 K iken iki özdeş hücreden biri \"kapalı\" (y = 0.018), öteki \"indüklenmiş\" (y = 0.795). Bunun en iyi açıklaması hangisi?",
      options: ["Biri glukozlu ortamda, öteki glukozsuz ortamdadır", "Permease geri beslemesi bu aralıkta iki kararlı durum yaratır; hücre geçmişini hatırlar", "Gillespie gürültüsü iki hücreyi rastgele ayırmıştır", "Baskılayıcı birinde bağlı, ötekinde hiç yoktur"],
      answer: 1,
      explanation: "Geri besleme modeli glukozsuz ve deterministiktir; fark yalnız başlangıç durumundadır. n = 2 ile denge eğrisi S biçimlidir, 1.90 ile 2.95 K arasında iki kararlı ve bir kararsız denge vardır. n = 1 yapınca histerezis kaybolur ve iki hücre aynı y'ye gider.",
    },
  ],
  next: [
    { href: "dna-replikasyon.html", title: "DNA ve Replikasyon Laboratuvarı", why: "Genin kopyalanma yanı: çift sarmal, replikasyon çatalı, Meselson–Stahl deneyi ve Hata ve onarım sekmesinde mutasyonların okuma çerçevesine etkisi." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa", why: "Anahtarın faz düzleminin ve halkanın kararlılık analizinin matematiği: yön alanları, dengelerin özdeğerlerle sınıflandırılması, doğrusal olmayan sistemler ve limit çevrim." },
    { href: "enzim-kinetigi.html", title: "Enzim Kinetiği Laboratuvarı", why: "Proteinlerin iş başında hali: Michaelis–Menten doyma eğrisi, burada n = 1 iken gördüğün I/(K + I) biçiminin aynısı; parametre kestirimi ve inhibisyon." },
  ],
  sources: [
    { title: "OpenStax · Biology 2e, 15.1 The Genetic Code", url: "https://openstax.org/books/biology-2e/pages/15-1-the-genetic-code", note: "Merkezî dogma, 64 kodondan 61'i amino asit ve 3'ü dur, AUG başlangıcı, okuma çerçevesi ve Crick–Brenner proflavin deneyi (İngilizce, açık ders kitabı)." },
    { title: "OpenStax · Biology 2e, 16.2 Prokaryotic Gene Regulation", url: "https://openstax.org/books/biology-2e/pages/16-2-prokaryotic-gene-regulation", note: "lac baskılayıcısı, allolaktoz, cAMP–CAP ve sayfanın doğruluk tablosunun dayandığı Tablo 16.2 (İngilizce)." },
    { title: "Wikipedia · Lac operon", url: "https://en.wikipedia.org/wiki/Lac_operon", note: "Jacob ve Monod'un 1961 J. Mol. Biol. makalesi, 1965 Nobel ödülü, IPTG ve operonun yapısı (İngilizce)." },
    { title: "Wikipedia · Synthetic biological circuit", url: "https://en.wikipedia.org/wiki/Synthetic_biological_circuit", note: "2000 yılında Nature'da yayımlanan genetik anahtar ve repressilatör; sentetik gen devrelerinin genel çerçevesi (İngilizce)." },
    { title: "Wikipedia · Repressilator", url: "https://en.wikipedia.org/wiki/Repressilator", note: "Elowitz ve Leibler'in devresi, salınımların hücreler arasında faz kaydırması ve 2016'daki daha düzenli sürüm (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
