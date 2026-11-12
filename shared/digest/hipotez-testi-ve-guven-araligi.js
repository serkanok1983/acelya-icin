window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["hipotez-testi-ve-guven-araligi"] = {
  slug: "hipotez-testi-ve-guven-araligi",
  title: "Hipotez Testi ve Güven Aralığı: Belirsizliği Ölçmek",
  field: "Matematik",
  level: "Lisans",
  minutes: 35,
  tagline:
    "Tek bir örneklem tek bir sayı verir; o sayıya ne kadar güvenebileceğini görmek için aynı deneyi binlerce kez yaparsın. Standart hata, güven aralığı, p-değeri ve güç bu tekrarın dilidir.",
  hook:
    "1710'da John Arbuthnot, Londra'da 82 yıl boyunca her yıl erkek doğumların kız doğumlardan fazla olduğunu gördü ve sordu: doğumlar yazı-tura gibi yarı yarıyaysa bu ne kadar olası? Cevap 1/2⁸²'ydi. Bugün aynı soruyu her ilaç denemesinde soruyoruz; ama o küçük olasılık tam olarak neyi söyler, neyi söylemez?",
  bigIdea:
    "Çıkarımsal istatistikte olasılık, <strong>yöntemin tekrarlarda nasıl davrandığını</strong> anlatır: %95'lik aralıkların uzun vadede %95'i μ'yü yakalar, H₀ doğruyken testler %5 oranında yanlış alarm verir; tek bir aralığın ya da tek bir hipotezin doğruluğuna olasılık biçmez.",
  story: [
    "John Arbuthnot 1710'da Royal Society'nin dergisinde yayımladığı kısa yazıda Londra'nın 1629–1710 doğum kayıtlarını inceledi: 82 yılın her birinde erkek doğumlar kız doğumlardan fazlaydı. İki cinsiyet eşit olasılıklı olsaydı bunun olasılığı 1/2⁸², yaklaşık 4,8 × 10²⁴'te bir olurdu. Arbuthnot şansı reddetti ve düzeni ilahi takdire bağladı. Sonucu tartışmalı olsa da akıl yürütmesi bugünkü dille bir anlamlılık testidir: bir \"yalnız şans\" modeli kur, gözlenen veri o modelde ne kadar şaşırtıcı, hesapla.",
    "Testlerin arkasındaki çan eğrisi daha eskidir. Abraham de Moivre 1733'te çok sayıda yazı-tura atışındaki yazı sayısını normal eğriyle yaklaştırdı; Laplace 1812'deki <em>Théorie analytique des probabilités</em>'te bu sonucu genişletti. Bugün <strong>merkezi limit teoremi</strong> dediğimiz ad ise ancak 1920'de George Pólya'nın bir makale başlığında ortaya çıktı. Ama bu teorem büyük örneklemler içindir; az veriyle çalışanın derdine yetmez.",
    "O dert, 1899'dan beri Dublin'deki Guinness bira fabrikasında kimyager olarak çalışan William Sealy Gosset'in derdiydi: arpa çeşitleri ve bira kalitesi üzerindeki fabrika deneylerinde örneklemler küçüktü, Karl Pearson'ın biyometricileri ise yüzlerce gözlemle çalışıyordu. Gosset 1906–07 ders yılını Londra'da Pearson'ın laboratuvarında geçirdi. Yaygın anlatıya göre Guinness, çalışanlarının yayınlarında birayı, şirketi ve yazarın gerçek adını anmamalarını istiyordu; Gosset 1908'de <em>Biometrika</em>'daki \"The probable error of a mean\" makalesini \"Student\" adıyla yayımladı. Dağılımın biçimini kısmen matematikle, kısmen elle çekilmiş rastgele örneklemlerle buldu: bu sayfanın binlerce kez yaptığı benzetimin kâğıt kalemle yapılmış erken bir örneği. Bugün t dağılımı dediğimiz şey, σ yerine örneklemin s'sini kullanmanın bedelini tam olarak hesaplar.",
    "R. A. Fisher 1925'teki <em>Statistical Methods for Research Workers</em>'ta \"anlamlılık testlerini\" yaygınlaştırdı ve yirmide bir (0,05) olasılığı uygun bir ret sınırı olarak önerdi. Jerzy Neyman ile Egon Pearson 1933'te testi bir karar kuralı olarak yeniden kurdular: eşiğe α dediler, veriden önce seçilmesini istediler ve belirli bir α'da en güçlü testi veren lemmalarını kanıtladılar. Neyman güven aralığı fikrini 1934'te ortaya koydu, 1937'de de ilk kapsamlı genel kuramını verdi. Seksen yıl sonra yanlış okumalar o kadar yaygınlaşmıştı ki Amerikan İstatistik Derneği (ASA) 2016'da, Ronald Wasserstein ve Nicole Lazar imzasıyla, p-değerinin ne olduğunu ve ne olmadığını altı ilkede anlatan bir bildiri yayımladı.",
  ],
  core: [
    {
      heading: "Örnekleme dağılımı ve standart hata",
      body:
        "Bir örneklemin ortalaması da rastgele bir sayıdır: deneyi tekrarlasan başka çıkar. n bağımsız gözlemin ortalamasının varyansı σ²/n'dir, çünkü bağımsız terimlerin varyansları toplanır ve n'ye bölmek varyansı n² ile böler. Bu yüzden ortalamanın standart sapması, yani <strong>standart hata</strong>, σ/√n'dir: kesinliği iki katına çıkarmak dört kat veri ister. Biçim de düzelir: üçüncü ve dördüncü kümülantlar da toplanır, bu yüzden ortalamanın çarpıklığı γ/√n, fazla basıklığı κ/n olur. Merkezi limit teoreminin \"ortalama normale yaklaşır\" demesi budur; ama yavaştır: çarpıklığı 2 olan üstel bir evrende n = 30'da bile ortalamaların çarpıklığı 0,37'dir.",
      formula: "SH = σ/√n,  çarpıklık(<span class=ov>X</span>) = γ/√n,  fazla basıklık(<span class=ov>X</span>) = κ/n",
      formulaNote: "Teorem sonlu varyanslı bağımsız gözlemler için bir limittir; belirli bir n'de \"artık normal\" demez. Cauchy gibi varyansı sonsuz dağılımlarda bu biçimde geçerli değildir.",
    },
    {
      heading: "Güven aralığı: %95 neyin özelliği?",
      body:
        "σ biliniyorsa (<span class=ov>x</span> − μ)/(σ/√n) tam olarak standart normaldir ve <span class=ov>x</span> ± 1,96·σ/√n aralıklarının %95'i μ'yü kapsar. Gerçekte σ bilinmez ve yerine s konur; s küçük örneklemde σ'yı sık sık küçük kestirir, aralık fazla dar kalır. Normal evrende (<span class=ov>x</span> − μ)/(s/√n) tam olarak n − 1 serbestlik dereceli t dağılır; t* = 1,96'dan büyüktür (n = 10'da 2,262) ve kapsamayı tam düzeltir. Yorum kritik: μ sabittir, rastgele olan aralıktır. Kurulmuş tek bir aralık μ'yü ya içerir ya içermez; %95, aynı yöntemin uzun vadeli başarı oranıdır.",
      formula: "<span class=ov>x</span> ± t*<sub>n−1</sub> · s/√n",
      formulaNote: "Aralık yalnız örneklemenin rastgele oynaklığını taşır; kalibrasyon hatası gibi sistematik kaymaları görmez.",
    },
    {
      heading: "p-değeri ve H₀ altında düzgünlük",
      body:
        "<strong>p-değeri</strong>, H₀ doğru olsaydı en az gözlenen kadar uç bir test istatistiği görme olasılığıdır. H₀'ı varsayarak hesaplanır; bu yüzden H₀'ın doğru olma olasılığı değildir ve etkinin büyüklüğünü ölçmez (ASA 2016 bildirisinin de vurguladığı iki nokta). Güzel bir sonucu vardır: istatistiğin H₀ altındaki dağılımı sürekli ve tam biliniyorsa p, 0 ile 1 arasında düzgün dağılır. Nedeni: F, |T|'nin H₀ altındaki dağılım fonksiyonu ise p = 1 − F(|T|) olur; sürekli bir rastgele değişkeni kendi dağılım fonksiyonuna koymak düzgün bir sayı verir, dolayısıyla P(p ≤ u) = u. Özel olarak P(p ≤ α) = α: \"p ≤ α ise reddet\" kuralı, H₀ doğruyken tam α oranında yanlış alarm verir. H₀ yanlışken p'ler sıfıra yığılır.",
      formula: "p = P(|T| ≥ |t<sub>göz</sub>| ∣ H₀),  H₀ altında P(p ≤ u) = u",
      formulaNote: "İki yönlü test için. p ≤ α ise H₀ reddedilir; α veriden önce seçilen bir karar eşiğidir, kanıtın doğal bir sınırı değil.",
    },
    {
      heading: "İki hata türü, güç ve gereken n",
      body:
        "<strong>I. tür hata</strong> H₀ doğruyken onu reddetmektir, olasılığı α'dır. <strong>II. tür hata</strong> H₀ yanlışken reddetmemektir, olasılığı β'dır; 1 − β testin <strong>gücüdür</strong>. Gerçek fark σ birimiyle d = (μ₁ − μ₀)/σ ise test istatistiği yaklaşık δ = d√n kadar kayar. Güç δ'ya bağlı olduğu için d yarıya inerse aynı gücü korumak dört kat n ister. σ bilinseydi iki yönlü z testinde n ≈ ((z<sub>1−α/2</sub> + z<sub>güç</sub>)/d)²; d = 0,5, α = 0,05, %80 güç için bu 31,4 verir. t testi s'nin oynaklığını da taşır, kesin hesap merkezsel olmayan t dağılımıyla yapılır ve n = 34 bulur. d için 0,2 / 0,5 / 0,8'e \"küçük / orta / büyük\" demek Cohen'in (1988) önerdiği bir uzlaşımdır; Cohen bu adların göreli olduğunu kendisi vurgular.",
      formula: "güç = Φ(δ − z*) + Φ(−δ − z*),  δ = d·√n",
      formulaNote: "σ bilinen iki yönlü z testi için kesin; t testinde T, n − 1 serbestlik dereceli ve δ merkezsizlik parametreli bir t dağılımına uyar.",
    },
    {
      heading: "Çoklu test ve Bonferroni",
      body:
        "H₀'ların hepsi doğru olan m bağımsız testte en az bir yanlış alarm olasılığı (aile bazında hata oranı, FWER) 1 − (1 − α)ᵐ'dir: α = 0,05 ve m = 20 için %64. Bonferroni düzeltmesi her testi α/m düzeyinde yapar. Gerekçesi bir satırdır: birleşimin olasılığı olasılıkların toplamını aşamaz, P(A₁ ∪ … ∪ A<sub>m</sub>) ≤ m · α/m = α. Bu eşitsizlik bağımsızlık istemez; bu yüzden düzeltme her durumda geçerlidir ama tutucudur ve her testin gücünü düşürür. Çok sayıda test için yanlış keşif oranını denetleyen Benjamini–Hochberg gibi daha az tutucu yöntemler vardır.",
      formula: "FWER = 1 − (1 − α)ᵐ,  Bonferroni: her test α/m",
      formulaNote: "İlk formül bağımsız testler içindir; Bonferroni'nin FWER ≤ α güvencesi bağımlı testlerde de geçerlidir.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvardır ve her deneyi tohumlu bir üreteçle binlerce kez tekrarlar; aynı tohum aynı sayıları verir, <strong>Yeni örneklemler</strong> / <strong>Yeni benzetim</strong> düğmeleri tohumu bir artırır. Bütün evrenlerin ortalaması 50, standart sapması 10'dur; yalnız biçimleri farklıdır. Her kartta ölçülen değer kuramın yanında durur ve fark hem puan hem standart hata (SH) cinsinden yazılır: ±2 SH içindeki farklar rastlantıdır. <strong>01 · Örnekleme dağılımı</strong> ortalamaların biçimini, <strong>02 · Güven aralığı</strong> kapsamayı, <strong>03 · p-değeri ve hata türleri</strong> tek bir testi ve binlercesini, <strong>04 · Güç ve örneklem büyüklüğü</strong> tasarımı ve çoklu testi ölçer.",
    experiments: [
      {
        title: "Çarpıklık 1/√n hızıyla söner",
        predict: "Çarpık bir evrende n = 30 olunca örneklem ortalamaları artık simetrik midir? Ortalamaların çarpıklığı 2'den ne kadar aşağı iner?",
        do: "01 · Örnekleme dağılımı sekmesinde varsayılan ayarlarla kal (Evren: Çarpık, 5000 örneklem, tohum 1). Sırayla n = 1, n = 5, n = 30 ve n = 100 düğmelerine bas; \"Ortalamaların çarpıklığı\" kartını ve \"μ ± 1,96 σ/√n içinde kalan ortalamalar\" kartını oku.",
        observe: "Çarpıklık 2,138 / 0,845 / 0,345 / 0,258; kuram 2,000 / 0,894 / 0,365 / 0,200. n = 1'de histogram evrenin kendisidir; n = 30 ve 100'de durum satırı hâlâ sağa çarpık olduğunu söyler. ±1,96 SH içinde kalma: n = 5'te ölçülen %95,56, kesin %95,62; n = 30'da kesin %95,19, n = 100'de %95,06. Alttaki grafikte noktalar γ/√n eğrisini izler.",
        explain: "Bağımsız toplamda üçüncü kümülant n ile, varyansın 3/2 kuvveti n<sup>3/2</sup> ile büyür; oranları γ/√n'dir. Normalleşme gerçek ama yavaştır: \"n = 30 yeter\" bir kural değil, bir alışkanlıktır. n = 1'deki 2,138 ile 2 arasındaki fark, üstel evrende örneklem çarpıklığının çok oynak olmasındandır.",
      },
      {
        title: "σ bilinmezken 1,96 yetmez",
        predict: "n = 3'te σ yerine s koyup yine 1,96 kullanırsan %95'lik aralıkların yüzde kaçı μ'yü yakalar? t aralığı bunu düzeltir mi, her evrende mi?",
        do: "02 · Güven aralığı sekmesinde \"n = 3, σ bilinmiyor\" düğmesine bas; üç kapsama kartını ve genişlikleri karşılaştır. Sonra \"Çarpık evren, n = 5\" düğmesine bas.",
        observe: "n = 3'te z ile s %80,66 (kuram %81,09), t %95,09, σ bilinen z %95,26; ortalama genişlik t'de 43,72, z ile s'de 19,91; t* = 4,3027. Yığında kırmızı çubuklar çoğalır. Çarpık evrende n = 5'te t aralığı %88,42'de kalır (−6,58 puan = −30,2 SH), σ bilinen z %95,58.",
        explain: "Küçük n'de s çoğu zaman σ'dan küçük çıkar, aralık daralır. Normal evrende (<span class=ov>x</span> − μ)/(s/√n) tam t dağılır ve t* bu kaybı tam karşılar. Çarpık evrende ortalama ile s birbirine bağımlıdır; t'nin kesinliği normallik varsayımına dayanır ve oradan çıkınca bozulur.",
      },
      {
        title: "p-değerleri H₀ altında düzgündür",
        predict: "H₀ doğruyken 10 000 testin p histogramı nasıl görünür? μ = 55 olunca kaç test H₀'ı reddeder?",
        do: "03 · p-değeri ve hata türleri sekmesini varsayılanla aç (μ = 50, n = 20, α = 0,05, t testi) ve p histogramına bak. Sonra \"μ = 55 dene\" düğmesine bas. İsteğe bağlı: Test menüsünde z testini, Seçenek hipotez H₁ menüsünde \"Sol yönlü\"yü seç.",
        observe: "H₀ altında ret oranı %4,85 (kuram %5,00, −0,7 SH), histogram düz: χ² = 18,6 (sd 19), p = 0,4851. μ = 55'te ret oranı %56,60, kuram %56,45, β = %43,55; histogram sıfıra yığılır. Tek örneklem 58,127 · 9,059, t = 4,012, p = 7,46 × 10⁻⁴. z testinde kuram güç %60,88; sol yönlüde durum satırı yanlış yöne bakıldığını söyler.",
        explain: "H₀ doğruyken p = 1 − F(T) düzgündür; 10 000 testin her 0,05'lik p dilimine yaklaşık 500'ü düşer ve α tam da yanlış alarm oranıdır. Gerçek bir etki T'yi kaydırır, p'leri küçültür. z testi σ'yı bildiği için biraz daha güçlüdür; yanlış yöne bakan tek yönlü test etkiyi neredeyse hiç göremez.",
      },
      {
        title: "Gereken n ve yirmi testin tuzağı",
        predict: "d = 0,5 için %80 güç kaç gözlem ister? d = 0,2 için kaç? Hiçbir etki yokken 20 testten en az biri ne sıklıkla \"anlamlı\" çıkar?",
        do: "04 · Güç ve örneklem büyüklüğü sekmesinde varsayılanı oku, sonra \"n'yi gerekene ayarla\" düğmesine bas. Ardından \"Küçük etki: d = 0,2\" düğmesine bas. Çoklu test bölümünde Test sayısı m = 20 iken üç kartı oku; m'yi 1'e indir.",
        observe: "n = 20'de güç %56,45; gereken n = 34, orada güç %80,78 (benzetim %80,71). d = 0,2'de gereken n = 199 (yaklaşık formül 196,22); kaydırıcı 34'te kaldığı için güç yalnız %20,50 (benzetim %20,52). m = 20'de en az bir yanlış pozitif %63,35 (kuram %64,15), Bonferroni ile %4,98 (kuram %4,88); m = 1'de kuram %5,00.",
        explain: "Güç δ = d√n'ye bağlıdır: d'yi 2,5 kat küçültmek n'yi yaklaşık 6,25 kat büyütür. Bağımsız 20 testte hepsinin temiz çıkma olasılığı 0,95²⁰ ≈ 0,36'dır. Bonferroni eşiği α/20 = 0,0025'e çekerek aileyi korur, ama her tek testin gücünü düşürür.",
      },
    ],
  },
  wow: [
    {
      title: "82 yıl, 1/2⁸²",
      body:
        "Arbuthnot'un 1710 hesabı erken bir anlamlılık testi olarak anılır: Londra'da 1629'dan 1710'a 82 yılın hepsinde erkek doğumlar fazlaydı. Eşit olasılık varsayımıyla bu, yaklaşık 4,8 × 10²⁴'te bir şanstır. Bugünkü dille p = 1/2⁸² ile \"yalnız şans\" hipotezini reddetti.",
    },
    {
      title: "Bir bira fabrikasının takma adı",
      body:
        "t testini istatistiğe kazandıran soru bir üniversite kürsüsünden değil, Guinness'in Dublin fabrikasından geldi: birkaç ölçümle bira kalitesi hakkında nasıl karar verilir? Anlatılana göre şirket, çalışanların yayınlarında birayı, Guinness adını ve yazarın gerçek adını yasaklamıştı; Gosset de 1908 makalesini \"Student\" diye imzaladı. Bu yüzden ders kitapları hâlâ \"Student t\" der.",
    },
    {
      title: "\"Merkezi\" sıfatının kaynağı",
      body:
        "De Moivre 1733'te yazı-tura sayılarını normal eğriyle yaklaştırdı, ama \"merkezi limit teoremi\" adı 187 yıl sonra, George Pólya'nın 1920 tarihli Almanca makalesinin başlığında (zentraler Grenzwertsatz) doğdu. \"Merkezi\" sıfatı limite değil teoreme aittir: Pólya onu olasılık kuramının merkezinde gördüğü için böyle adlandırdı. Fransız okulu ise sıfatı başka okur: teorem dağılımın kuyruklarını değil, merkezini anlatır.",
    },
  ],
  worked: {
    title: "Tek örneklem t testi ve aynı verinin güven aralığı",
    prompt:
      "Normal bir evrenden n = 20 ölçüm alınmış: <span class=ov>x</span> = 53,127, s = 9,059. H₀: μ = 50'yi α = 0,05 düzeyinde iki yönlü t testiyle sına, %95'lik t aralığını kur ve ikisinin neden aynı kararı verdiğini göster. Gerçek ortalama 55 olsaydı (σ = 10) bu tasarımın gücü neydi, %80 güç için kaç ölçüm gerekirdi?",
    steps: [
      "Standart hata: s/√n = 9,059/√20 = 9,059/4,472 = 2,026. Test istatistiği: t = (53,127 − 50)/2,026 = 1,544; serbestlik derecesi n − 1 = 19.",
      "Kritik değer: t*<sub>0,975; 19</sub> = 2,093. |t| = 1,544 < 2,093, H₀ reddedilmez. Kesin p = 2·P(T<sub>19</sub> ≥ 1,544) = 0,1391.",
      "Aralık: 53,127 ± 2,093 × 2,026 = 53,127 ± 4,240, yani [48,887; 57,367]. 50 aralığın içinde. Bu rastlantı değil: aynı t* ile kurulan %95'lik aralık, tam olarak α = 0,05'te reddedilmeyen μ₀ değerlerinin kümesidir.",
      "Güç: gerçek fark 5, σ = 10, yani d = 0,5 ve δ = 0,5·√20 = 2,236. Merkezsel olmayan t dağılımıyla güç %56,45, β = %43,55: gerçek bir etki varken bile deney neredeyse yarı yarıya onu kaçırır. z formülüyle n ≈ ((1,960 + 0,842)/0,5)² = 31,4; kesin t hesabı n = 34 verir (güç %80,78).",
      "Sayfada dene: 03 · p-değeri ve hata türleri sekmesi varsayılanda tam bu örneklemi gösterir (53,127 · 9,059, t = 1,544, kritik ±2,093, p = 0,1391). 04 · Güç ve örneklem büyüklüğü sekmesinde varsayılan güç %56,45'tir; \"n'yi gerekene ayarla\" n'yi 34'e çeker.",
    ],
    result:
      "t = 1,544, p = 0,1391: H₀ α = 0,05'te reddedilmez ve %95'lik aralık [48,887; 57,367] 50'yi içerir. Bu, μ = 50 olduğunu göstermez: aynı tasarım 5 birimlik gerçek bir farkı ancak %56 olasılıkla yakalar; %80 güç için 34 ölçüm gerekir.",
  },
  misconceptions: [
    {
      myth: "p = 0,03 ise H₀'ın doğru olma olasılığı %3'tür.",
      truth:
        "p, H₀ doğru varsayılarak hesaplanır: \"H₀ doğruysa en az bu kadar uç veri görme olasılığı\". H₀'ın kendisine olasılık vermek için bir önsel ve Bayes kuralı gerekir. ASA'nın 2016 bildirisi de p-değerinin incelenen hipotezin doğru olma olasılığını ölçmediğini vurgular.",
    },
    {
      myth: "Bu %95'lik aralığın μ'yü içerme olasılığı %95'tir.",
      truth:
        "Klasik yorumda μ sabittir; kurulmuş bir aralık onu ya içerir ya içermez. %95 yöntemin özelliğidir: aynı yolla kurulan aralıkların uzun vadede %95'i μ'yü yakalar. Güven aralığı sekmesindeki yığında her çubuk bir aralıktır ve kırmızılar ıskalayanlardır.",
    },
    {
      myth: "Test anlamlı çıkmadıysa etki yoktur.",
      truth:
        "p > α yalnızca verinin H₀'ı reddetmeye yetmediğini söyler. Gücü düşük bir deneyde bu çok sık olur: d = 0,5 ve n = 20'de t testi gerçek etkiyi %43,55 olasılıkla kaçırır. Ayrıca çok büyük n'de önemsiz bir fark da küçük p verebilir; p etkinin büyüklüğünü ölçmez.",
    },
    {
      myth: "n = 30'u geçince örneklem ortalaması normal dağılır.",
      truth:
        "Merkezi limit teoremi belirli bir eşik vermez; ortalamanın çarpıklığı γ/√n hızıyla söner. Çarpıklığı 2 olan üstel evrende n = 30'da çarpıklık hâlâ 0,37'dir ve n = 5'te t aralığı %95 yerine yaklaşık %88 kapsar. Ne kadar n'nin yeteceği evrenin biçimine bağlıdır.",
    },
  ],
  glossary: [
    { term: "Örnekleme dağılımı", definition: "Bir istatistiğin (ör. örneklem ortalamasının) deney sayısız kez tekrarlansaydı alacağı değerlerin dağılımı." },
    { term: "Standart hata (SH)", definition: "Bir kestiricinin örnekleme dağılımının standart sapması; ortalama için σ/√n, σ bilinmezse s/√n ile kestirilir." },
    { term: "Güven aralığı", definition: "Veriden kurulan ve aynı yöntemle tekrarlandığında belirtilen oranda (ör. %95) gerçek parametreyi kapsayan aralık." },
    { term: "Student t dağılımı", definition: "Normal evrende (<span class=ov>x</span> − μ)/(s/√n) oranının dağılımı; n − 1 serbestlik derecelidir, kuyrukları normalden kalındır ve n büyüdükçe normale yaklaşır." },
    { term: "p-değeri", definition: "H₀ doğru olsaydı en az gözlenen kadar uç bir test istatistiği elde etme olasılığı." },
    { term: "I. ve II. tür hata", definition: "I. tür: doğru H₀'ı reddetmek (olasılığı α). II. tür: yanlış H₀'ı reddetmemek (olasılığı β)." },
    { term: "Güç", definition: "Belirli bir gerçek etki varken testin H₀'ı reddetme olasılığı, 1 − β; etki büyüklüğü, n, σ ve α ile belirlenir." },
    { term: "Aile bazında hata oranı (FWER)", definition: "Bir test ailesinde en az bir I. tür hata yapma olasılığı; Bonferroni bunu her testi α/m düzeyinde yaparak α'nın altında tutar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede istatistik çoğunlukla ortalama, standart sapma ve normal eğrinin alanlarıdır. Üniversitede <strong>Olasılık ve İstatistik</strong> dersi bunların üzerine kestirim ve test kuramını kurar; <strong>Matematiksel İstatistik</strong> ise neden böyle olduğunu kanıtlar: ki-kare ve t dağılımlarının türetilmesi, normal örneklemde <span class=ov>x</span> ile s²'nin bağımsızlığı, Neyman–Pearson lemması ve olabilirlik oranı testleri, en çok olabilirlik kestirimi ve bunların büyük örneklem davranışı. Bu sayfadaki merkezsel olmayan t dağılımı ve c₄ düzeltmesi de bu derslerin alıştırma konularıdır.",
      "Aynı fikirler <strong>Deney Tasarımı</strong>'nda (rastgeleleştirme, güç analizi, varyans analizi), <strong>Regresyon Analizi</strong>'nde (eğim için t testi ve güven aralığı) ve <strong>Bayesçi istatistik</strong>'te (önsel ve sonsal dağılım, kredi aralığı) yeniden karşına çıkar. Çok sayıda karşılaştırmanın olağan olduğu genetik ve görüntüleme gibi alanlarda yanlış keşif oranı ve Benjamini–Hochberg yöntemi temel araçtır. Benzetimle kapsama ve güç ölçmek, bu sayfanın yaptığı gibi, bugün yeni bir yöntemi sınamanın standart yoludur.",
    ],
    topics: ["Matematiksel istatistik", "Neyman–Pearson lemması", "Olabilirlik oranı testi", "Güç analizi ve deney tasarımı", "Regresyonda çıkarım", "Bayesçi kredi aralığı", "Yanlış keşif oranı"],
  },
  quiz: [
    {
      question: "d = 0,5 için %80 güce n = 34 ölçümle ulaşan bir t testi var. Beklenen etki d = 0,25'e inerse aynı güç için yaklaşık kaç ölçüm gerekir?",
      options: ["Yaklaşık 68", "Yaklaşık 128", "Yaklaşık 48", "34; güç etki büyüklüğüne bağlı değildir"],
      answer: 1,
      explanation: "Güç δ = d√n'ye bağlıdır. d yarıya inince aynı δ için √n iki katına, n dört katına çıkmalıdır: 4 × 34 ≈ 136. Kesin t hesabı 128 verir (yaklaşık formül 31,4 → 125,6). Sayfada 04 sekmesinde d = 0,25 seçip \"n'yi gerekene ayarla\" ile dene.",
    },
    {
      question: "Her biri α = 0,05 olan 20 bağımsız testte hiçbir gerçek etki yoksa en az bir \"anlamlı\" sonuç bulma olasılığı yaklaşık kaçtır?",
      options: ["%5", "%20", "%64", "%100"],
      answer: 2,
      explanation: "Hepsinin temiz çıkma olasılığı 0,95²⁰ ≈ 0,358'dir; tümleyeni 1 − 0,358 ≈ %64. Ortalama yanlış pozitif sayısı ise 20 × 0,05 = 1'dir. Bonferroni her testi 0,05/20 = 0,0025'te yaparak bu olasılığı %5'in altına çeker.",
    },
    {
      question: "H₀ doğru olan 10 000 bağımsız t testinde, p-değeri 0,90 ile 1,00 arasında kalan test sayısı yaklaşık kaçtır?",
      options: ["Yaklaşık 500", "Yaklaşık 1000", "Neredeyse hiç; H₀ doğruyken p hep büyüktür", "Yaklaşık 9000"],
      answer: 1,
      explanation: "H₀ doğruyken ve istatistiğin dağılımı sürekliyken p, 0 ile 1 arasında düzgün dağılır: P(0,90 ≤ p ≤ 1) = 0,10, yani yaklaşık 1000 test. Aynı nedenle yaklaşık 500'ü p ≤ 0,05 verir; bu, α'nın yanlış alarm oranı olmasının ta kendisidir.",
    },
  ],
  next: [
    { href: "normal-dagilim.html", title: "Normal Dağılım ve Merkezi Limit Teoremi", why: "Galton tahtası, normal eğrinin alanları ve merkezi limit teoremi: bu sayfadaki 1,96'nın ve σ/√n'nin geldiği yer." },
    { href: "bayes-olasilik.html", title: "Bayes ve Koşullu Olasılık Laboratuvarı", why: "p-değerinin vermediği şey: önsel ve veriyle bir hipotezin olasılığını güncellemek; koşullu olasılığın iki yönünü karıştırmamak." },
    { href: "bilimsel-yontem-olcme-ve-belirsizlik.html", title: "Bilimsel Yöntem, Ölçme ve Belirsizlik: Basamak, Yayılım, Hata ve Uydurma", why: "Güven aralığının görmediği sistematik hata, ölçüm belirsizliği ve anlamlı basamaklar." },
    { href: "regresyon-ve-korelasyon.html", title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik", why: "Aynı çıkarım fikirleri iki değişkenli veride: en küçük kareler doğrusu, artıklar, etkili noktalar ve korelasyonun nedensellik olmadığı." },
  ],
  sources: [
    { title: "Wikipedia · P-value", url: "https://en.wikipedia.org/wiki/P-value", note: "Tanım, H₀ altında düzgünlük, ASA 2016 bildirisinden alıntılar ve Arbuthnot'un 1710 doğum oranı hesabı (İngilizce)." },
    { title: "Wikipedia · Confidence interval", url: "https://en.wikipedia.org/wiki/Confidence_interval", note: "Uzun vadeli kapsama yorumu, sık yapılan yanlış okumalar, Neyman'ın 1934 makalesi ve 1937 kuramı (İngilizce)." },
    { title: "Wikipedia · Statistical significance", url: "https://en.wikipedia.org/wiki/Statistical_significance", note: "Fisher'ın 1925'te önerdiği 0,05 sınırı ve Neyman–Pearson'ın 1933'te α adını verdiği anlamlılık düzeyi (İngilizce)." },
    { title: "MacTutor · William Sealy Gosset", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Gosset/", note: "St Andrews matematik tarihi arşivi: 1899'da Guinness, 1906–07'de Pearson'ın laboratuvarı, \"Student\" adı ve dağılımı rastgele örneklemlerle sınaması (İngilizce)." },
    { title: "Wikipedia · Central limit theorem", url: "https://en.wikipedia.org/wiki/Central_limit_theorem", note: "De Moivre 1733, Laplace 1812 ve Pólya'nın 1920'de koyduğu ad; teoremin koşulları ve türleri (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
