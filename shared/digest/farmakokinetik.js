window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["farmakokinetik"] = {
  slug: "farmakokinetik",
  title: "Farmakokinetik: Bir İlacın Vücuttaki Yolculuğu",
  field: "İnsan Bedeni",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Uydurma bir ilaçla emilim, dağılım ve atılımın matematiği: yarılanma süresi, klerens, eğri altındaki alan, birikim, iki bölme ve doyan enzimler. Doz önerisi değildir; yalnız bilimi anlatır.",
  hook:
    "Bir ilacın dozunu iki katına çıkarırsan vücutta iki kat uzun mu kalır? Hayır: birinci derece atılımda yarılanma süresi yerinden kıpırdamaz, yalnız eğri yukarı kayar. Ama atılımı yapan enzimler doyarsa aynı soru bambaşka bir cevap alır: dozu ikiye katlamak eğri altındaki alanı üç kattan fazla büyütebilir.",
  bigIdea:
    "Vücut, ilacı çoğu zaman <strong>miktarıyla orantılı bir hızla</strong> temizler; bu tek varsayımdan üstel azalış, sabit yarılanma süresi, AUC = D/CL ve kararlı duruma 4–5 yarılanma süresinde varış çıkar. Varsayım bozulduğunda (dağılım anlık değilse, enzim doyarsa) modelin nerede yanıldığını da aynı matematik gösterir.",
  story: [
    "Sözcük, Eski Yunanca <em>pharmakon</em> (ilaç) ile <em>kinetikos</em> (harekete geçiren) sözcüklerinden gelir: ilacın vücuttaki hareketi. Soru basit görünür ama ölçmesi zordur, çünkü kandaki derişimi zaman içinde tekrar tekrar ölçmeyi ve bu sayıları bir modele bağlamayı gerektirir. 1922'de İsveçli profesör Erik Widmark parmak ucundan alınan küçük kan örneklerinde alkol miktarını ölçmenin bir yolunu yayımladı; aynı on yıl içinde bu ölçümlere dayanarak alkolün vücuttaki seyrini anlatan bir model kurdu.",
    "Widmark'ın modeli bugünkü dille tek bölmeli bir modeldir: alkol anında emilmiş sayılır ve kandan <strong>sabit hızla</strong>, yani sıfırıncı derece kinetikle temizlenir. Bugün nedeni bilinir: alkolü yıkan enzim, alkol dehidrogenaz, olağan derişimlerde doymuştur. Hızın derişime nasıl bağlı olduğunu anlatan denklem ise 1913'te Leonor Michaelis ile Maud Menten'in invertaz enzimi üzerine önerdiği modeldir; sayfadaki doymuş atılım bölümü bu denklemi kullanır.",
    "1937'de Teorell, \"Kinetics of distribution of substances administered to the body\" başlıklı çalışmasını <em>Archives Internationales de Pharmacodynamie et de Thérapie</em> dergisinde yayımladı. Bilimsel literatürde anlatılan bu ilk farmakokinetik model aslında organları ayrı ayrı ele alan, fizyolojiye dayalı bir modeldi; ama denklemleri o günün araçlarıyla çözülemeyecek kadar ağırdı. Alan bu yüzden üstellerin toplamıyla kapalı biçimde çözülebilen basit bölme modellerine döndü. Bilgisayarlar ve sayısal integrasyon 1970'lerin başında fizyolojik modellere ilgiyi yeniden canlandırdı. Bu sayfa da iki dünyayı birleştirir: her formülü kapalı biçimde türetir, sonra aynı denklemi RK4 yöntemiyle adım adım çözerek sınar.",
  ],
  core: [
    {
      heading: "ADME ve tek bölmeli model",
      body:
        "İlacın yolculuğu dört durakta anlatılır: <strong>emilim</strong> (kana geçiş), <strong>dağılım</strong> (dokulara yayılma), <strong>metabolizma</strong> (çoğunlukla karaciğerde kimyasal dönüşüm) ve <strong>atılım</strong> (başlıca böbrekle). En basit model vücudu iyi karışan tek bir kap sayar. Atılım hızı vücuttaki miktarla orantılıysa dA/dt = −kA, A = V·C olduğundan dC/dt = −kC ve çözüm üsteldir. Burada V, <strong>görünür dağılım hacmidir</strong>: vücuttaki miktarın plazma derişimine oranı. Gerçek bir organ hacmi değildir; dokulara çok bağlanan ilaçlarda vücut suyundan kat kat büyük çıkabilir.",
      formula: "C(t) = (D/V)·e<sup>−kt</sup>, C₀ = D/V",
      formulaNote: "Damardan (IV) anlık doz. Varsayımlar: anlık ve düzgün karışma, birinci derece atılım, zamanla değişmeyen parametreler.",
    },
    {
      heading: "Yarılanma, klerens ve eğri altındaki alan",
      body:
        "C₀/2 = C₀e<sup>−k·t½</sup> denkleminde C₀ sadeleşir: t½ = ln 2/k, başlangıç ne olursa olsun. <strong>Klerens</strong> CL, birim zamanda ilaçtan temizlenen plazma hacmidir; atılım hızı hem CL·C hem kV·C olduğundan CL = kV. Buradan t½ = ln 2·V/CL çıkar: yarılanmayı doz değil, hacim ile klerensin oranı belirler. Eğri altındaki alan ∫C dt = C₀/k = D/CL'dir; ölçülen AUC'den klerens bulunur. Sayfanın varsayılan İlaç A'sında (D = 500 mg, V = 50 L, t½ = 5 sa) k = 0,1386 1/sa, CL = 6,931 L/sa, AUC = 72,13 mg·sa/L.",
      formula: "t½ = ln 2 / k = ln 2·V / CL · AUC = D / CL",
      formulaNote: "n yarılanma süresi sonra 2<sup>−n</sup> kesri kalır: 2 t½'de %25, 4 t½'de %6,25. Sıfıra hiçbir sonlu sürede inilmez.",
    },
    {
      heading: "Ağızdan alım: Bateman eğrisi ve biyoyararlanım",
      body:
        "Ağızdan alınan ilaç bağırsaktan k<sub>a</sub> hız sabitiyle kana geçer ve dozun yalnız F kesri (<strong>biyoyararlanım</strong>) dolaşıma ulaşır. İki doğrusal denklemin çözümü iki üstelin farkıdır; tepe, türevin sıfır olduğu andadır. t<sub>max</sub> dozdan ve F'den bağımsızdır; C<sub>max</sub> ve AUC ise F·D ile orantılıdır. AUC'de k<sub>a</sub> sadeleşir: emilim hızı yalnız eğrinin biçimini değiştirir, kana ulaşan toplamı değil. Bu yüzden F, aynı dozda AUC<sub>ağız</sub>/AUC<sub>IV</sub> oranıyla ölçülür. k<sub>a</sub> &lt; k ise iniş eğimi k'yi değil k<sub>a</sub>'yı gösterir (<strong>flip-flop</strong>).",
      formula: "C(t) = F·D·k<sub>a</sub> / (V(k<sub>a</sub> − k)) · (e<sup>−kt</sup> − e<sup>−k<sub>a</sub>t</sup>) · t<sub>max</sub> = ln(k<sub>a</sub>/k)/(k<sub>a</sub> − k)",
      formulaNote: "k<sub>a</sub> ≠ k için. AUC = F·D/CL.",
    },
    {
      heading: "Tekrarlı doz, infüzyon ve kararlı durum",
      body:
        "Her τ saatte bir D verilirse bir aralıkta kalan kesir r = e<sup>−kτ</sup> olur ve n. dozdan sonra artıklar geometrik bir toplam oluşturur: (D/V)(1 − rⁿ)/(1 − r). n → ∞ iken <strong>birikim çarpanı</strong> R = 1/(1 − r) çıkar. n. dozun tepesi kararlı tepenin, n. aralığın sonundaki (t = nτ) dip de kararlı dibin 1 − rⁿ = 1 − 2<sup>−m</sup> kesridir (m = t/t½); içinde doz yoktur. Doz düzeyi belirler, oraya varış hızını yalnız t½ belirler: 4 t½'de %93,75, 5 t½'de %96,875. Sürekli infüzyonda dC/dt = R₀/V − kC; dengede C<sub>ss</sub> = R₀/CL. Kararlı ortalama yalnız birim zamandaki dozla klerensin oranına bağlıdır: aynı günlük dozu daha sık bölmek ortalamayı değiştirmez, dalgalanmayı (C<sub>max</sub>/C<sub>min</sub> = e<sup>kτ</sup>) azaltır.",
      formula: "R = 1/(1 − e<sup>−kτ</sup>) · C<sub>ss,ort</sub> = D/(CL·τ) · C<sub>ss</sub> = R₀/CL",
      formulaNote: "Yükleme dozu fikri: hedef derişimi hemen kurmak için D<sub>L</sub> = C<sub>hedef</sub>·V; t½'yi değiştirmez, yalnız başlangıçtaki bekleyişi kaldırır.",
    },
    {
      heading: "Modelin sınırları: iki bölme ve doyan enzim",
      body:
        "Dağılım anlık değilse iki bölmeli model gerekir: doğrusal bir sistemin çözümü olarak C = A·e<sup>−αt</sup> + B·e<sup>−βt</sup>; α + β = k₁₀ + k₁₂ + k₂₁ ve αβ = k₂₁k₁₀. Yarı-log grafikte önce hızlı dağılım, sonra eğimi −β olan uç doğru görülür; uç yarılanma ln 2/β, merkezden atılımın kendi yarılanmasından uzundur. Atılımı sınırlı sayıda enzim yapıyorsa hız Michaelis–Menten biçimini alır: C ≪ K<sub>m</sub> iken birinci derece, C ≫ K<sub>m</sub> iken sıfırıncı derece (sabit hız). Değişkenleri ayırıp integral alınca C'den C/2'ye iniş süresi bulunur ve bu süre derişime bağlıdır: \"yarılanma süresi\" artık tek bir sayı değildir.",
      formula: "dC/dt = −V<sub>max</sub>C/(K<sub>m</sub> + C) · t<sub>C→C/2</sub> = (C/2 + K<sub>m</sub>·ln 2)/V<sub>max</sub>",
      formulaNote: "Doymuş atılımda AUC = (C₀K<sub>m</sub> + C₀²/2)/V<sub>max</sub>; dozu ikiye katlamak AUC'yi 2'den fazla katına çıkarır.",
    },
  ],
  lab: {
    intro:
      "Sayfa altı sekmedir ve bütün sayılar uydurma <strong>İlaç A</strong>'ya ait öğretim değerleridir; 4–12 mg/L gri bant da gerçek bir tedavi aralığı değildir. Bu bir doz önerisi değildir; ilaç kullanımı için hekime ya da eczacıya danışın. Her sekmede kaydırıcılar (Doz D, Dağılım hacmi V, Yarılanma süresi t½ …), \"Yarı logaritmik eksen\" kutusu ve \"Bölümü sıfırla\" düğmesi var. Okuma kartları RK4 sayısal çözümünden <em>ölçülen</em> değeri, kapalı formülün verdiği <em>kuram</em> değerini ve farkı yan yana gösterir. 05 · Veriden k ve V sekmesinde \"İki bölmeli İlaç A\" verisinde \"Regresyonu çiz\"e bas: bütün noktalarla k %151 büyük çıkar; \"Regresyona katılan ilk ölçüm\"ü 10 sa'e alınca fark −2,1 %'ye iner. 06 · Alıştırma ve hatalar sekmesi üç seviyede soru ve yedi yaygın hata kartı sunar.",
    experiments: [
      {
        title: "Doz iki katına çıkınca ne değişir?",
        predict:
          "01 · Yolculuk ve tek doz sekmesinde Doz D'yi 500 mg'dan 1000 mg'a çıkaracaksın. Yarılanma süresi, C₀ ve AUC'nin her biri için tahmin et: aynı kalır mı, iki katına mı çıkar, başka bir şey mi olur?",
        do:
          "Varsayılan ayarlarla (D = 500 mg, V = 50 L, t½ = 5 sa, imleç t = 10 sa) okumaları not et. Sonra Doz D'yi 1000 mg'a getir. Ardından dozu 500'e geri alıp Dağılım hacmi V'yi 100 L yap.",
        observe:
          "Varsayılanda C₀ 10 mg/L, CL 6,931 L/sa, ölçülen t½ 5 sa, AUC 72,13 mg·sa/L, C(10) = 2,5 mg/L. 1000 mg'da C₀ 20 mg/L, AUC 144,3 mg·sa/L, C(10) 5 mg/L; t½ yine 5 sa ve durum satırı yine \"başlangıçtaki ilacın %25 kadarı vücutta kalır\" der. V = 100 L'de C₀ 5 mg/L'ye, AUC 36,07'ye düşer, CL 13,86 L/sa'e çıkar.",
        explain:
          "t½ = ln 2·V/CL içinde doz yoktur; doz yalnız eğriyi ölçekler, AUC = D/CL de dozla doğru orantılıdır. Kaydırıcıda t½'yi sabit tutup V'yi büyütünce sayfa k'yi sabit bırakır, bu yüzden CL = kV iki katına çıkar ve AUC yarıya iner. Ölçülen ile kuram arasındaki fark %0,0001'in altındadır: RK4 adımı (0,01 sa) bu model için çok küçüktür.",
      },
      {
        title: "Flip-flop: iniş eğimi kimi gösteriyor?",
        predict:
          "02 · Ağızdan alım sekmesinde emilim çok yavaşlarsa (k<sub>a</sub> = 0,1 1/sa, atılımın k = 0,1386 1/sa'inden küçük) tepe nereye kayar, AUC değişir mi ve eğrinin son kısmının eğimi hangi sayıya yaklaşır?",
        do:
          "Varsayılan okumaları (F = 0,80, k<sub>a</sub> = 1, t½ = 5 sa) not et, sonra \"Yavaş emilim (k<sub>a</sub> = 0,1)\" düğmesine bas. Karşılaştırma için \"Hızlı emilim (k<sub>a</sub> = 3)\" düğmesini de dene. En sonda sıfırla ve Biyoyararlanım F'yi 0,4'e indir.",
        observe:
          "Varsayılan: t<sub>max</sub> 2,294 sa, C<sub>max</sub> 5,821 mg/L, AUC 57,71 mg·sa/L. Yavaş emilimde t<sub>max</sub> 8,456 sa, C<sub>max</sub> 2,477 mg/L, AUC yine 57,71; iniş eğimi 0,09969 1/sa (kuram 0,1) ve durum satırı flip-flop uyarısı verir. Hızlıda t<sub>max</sub> 1,075 sa, C<sub>max</sub> 6,893 mg/L. F = 0,4'te t<sub>max</sub> aynı, C<sub>max</sub> 2,91, AUC 28,85.",
        explain:
          "AUC = F·D/CL'de k<sub>a</sub> yoktur: emilim hızı kana ulaşan toplamı değil, yalnız eğrinin biçimini değiştirir. Geç evrede iki üstelden yavaş olanı baskın kalır; k<sub>a</sub> &lt; k ise bu emilim terimidir. Yalnız iniş eğrisine bakan biri yarılanmayı ln 2/0,1 = 6,931 sa sanırdı. F ise ölçek çarpanıdır: C<sub>max</sub> ve AUC yarıya iner, t<sub>max</sub> kıpırdamaz.",
      },
      {
        title: "Kararlı duruma kaçıncı dozda varılır?",
        predict:
          "03 · Tekrarlı doz ve infüzyon sekmesinde her 6 saatte 300 mg verilir (t½ = 5 sa). Kaçıncı dozdan sonra tepe, kararlı tepenin %90'ını geçer? Dozu 600 mg'a çıkarırsan bu dozun numarası değişir mi?",
        do:
          "Varsayılan bolus ayarlarında tabloyu ve okumaları incele. Sonra \"Her dozda D\"yi 600 mg yap ve tabloya yeniden bak. 300 mg'a dönüp \"Yükleme dozu ile başla\" kutusunu işaretle. En sonda Model menüsünden \"Sürekli infüzyon\"u seç.",
        observe:
          "R = 1,771 (r = 0,4353); kararlı tepe/dip 10,62 / 4,625 mg/L, ortalama 7,213 mg/L. Tabloda 1 − r<sup>j</sup>: 0,5647, 0,8105, 0,9175 (3. doz), 0,9641 (4. doz). 600 mg'da düzeyler iki katı (21,25 / 9,249) ama kesir sütunu aynen kalır. Yükleme dozuyla (531,2 mg) her satır 1,0000. İnfüzyonda C<sub>ss</sub> 7,213 mg/L, %50'ye 5 sa, %90'a 16,61 sa.",
        explain:
          "Ulaşılan kesir 1 − r<sup>j</sup> = 1 − 2<sup>−jτ/t½</sup> yalnız yarılanma süresine ve aralığa bağlıdır, doza değil. 3. doz t = 12 sa'te (2,4 t½) verilir; tepesinin kesri 1 − r³ = 0,9175, 3. aralığın sonundaki dibin (t = 18 sa, 3,6 t½) kesriyle aynıdır. Yükleme dozu D·R, vücuda kararlı durumun gerektirdiği miktarı baştan koyar. İnfüzyonda %90'a varış ln 10/k ≈ 3,32 t½'dir. Aynı sekmedeki böbrek kaydırıcısı %30'da CL 6,931'den 3,535 L/sa'e iner, ortalama 14,14 mg/L'ye çıkar: bu yalnız bir fikir modelidir, ayarlama kuralı değil.",
      },
      {
        title: "Doyan enzimde yarılanma süresi",
        predict:
          "04 · İki bölme ve doyma sekmesinin \"Doymuş atılım\" bölümünde C₀ = 20 mg/L, K<sub>m</sub> = 4 mg/L, V<sub>max</sub> = 2 mg/L/sa. Ardışık altı yarılanma birbirine eşit mi olur, kısalır mı, uzar mı?",
        do:
          "Varsayılan ayarlarda ardışık yarılanma tablosunu oku. Sonra Doz D'yi 2000 mg yap. Sıfırla, ardından Doz D'yi 100 mg ve K<sub>m</sub>'yi 50 mg/L yap; \"Yarı logaritmik eksen\"i aç.",
        observe:
          "Varsayılan tablo: 6,386 → 3,886 → 2,636 → 2,011 → 1,699 → 1,543 sa; düşük derişim sınırı 1,386 sa, AUC 140 mg·sa/L, doz ×2 AUC oranı 3,429. 2000 mg'da ilk yarılanma 11,39 sa, oran 3,667. D = 100, K<sub>m</sub> = 50'de satırlar 17,83 ile 17,34 sa arasında, oran 2,039; iki eğri üst üste biner.",
        explain:
          "C'den C/2'ye iniş (C/2 + K<sub>m</sub> ln 2)/V<sub>max</sub> sürer: derişim yüksekken enzim doymuştur ve hız tavana (V<sub>max</sub>) dayanır, düştükçe hız derişimle orantılı hâle gelir ve süre K<sub>m</sub> ln 2/V<sub>max</sub>'a iner. C₀ ≪ K<sub>m</sub> olunca model birinci dereceye döner. AUC oranı 2(K<sub>m</sub> + C₀)/(K<sub>m</sub> + C₀/2) her zaman 2'den büyüktür.",
      },
    ],
  },
  wow: [
    {
      title: "Bir sonraki yarılanma neredeyse dörtte bir",
      body:
        "Sayfanın doyan İlaç A'sında derişim 20 mg/L'den 10 mg/L'ye 6,386 saatte iner; altıncı yarılanma (0,625'ten 0,3125 mg/L'ye) yalnız 1,543 saat sürer. Birinci derece atılımda bu iki sayı eşit olurdu. Alkol gerçek hayattaki bilinen örnektir: olağan derişimlerde alkol dehidrogenaz doyar ve kandan yaklaşık sabit hızla temizlenir.",
    },
    {
      title: "23 litrelik kap, 240 litrelik görünür hacim",
      body:
        "Dağılım hacmi gerçek bir hacim değil, bir orandır. 05 · Veriden k ve V sekmesindeki iki bölmeli yapay veride merkez hacim V₁ = 23 L iken uç doğrunun kesişiminden hesaplanan görünür hacim D/B = 239,9 L çıkar: ilacın büyük kısmı ölçülen plazmada değil, yavaş dengelenen dokulardadır.",
    },
    {
      title: "Dozu bölmek ortalamayı değiştirmez",
      body:
        "03. sekmede 6 saatte 300 mg yerine 3 saatte 150 mg verildiğinde (16 doz) kararlı ortalama yine 7,213 mg/L'dir; değişen dalgalanmadır: tepe/dip oranı e<sup>kτ</sup> 2,297'den 1,516'ya iner, tepe 10,62 yerine 8,817 mg/L olur. Birim zamanda giren miktar ile klerens aynı kaldıkça ortalama aynı kalır.",
    },
  ],
  worked: {
    title: "Tekrarlı dozda birikim çarpanı ve kararlı düzey",
    prompt:
      "Uydurma İlaç A tek bölmeli modele uyuyor: t½ = 5 sa, V = 50 L. Her 6 saatte bir damardan 300 mg veriliyor (öğretim örneği; doz önerisi değildir). k, CL, birikim çarpanı R, kararlı durumdaki tepe ve dip derişimleri, ortalama derişim ve tepenin kararlı tepenin %90'ını ilk geçtiği doz numarası nedir?",
    steps: [
      "Hız sabiti ve klerens: k = ln 2/t½ = 0,6931/5 sa = 0,1386 1/sa; CL = kV = 0,1386 1/sa × 50 L = 6,931 L/sa.",
      "Bir aralıkta kalan kesir: kτ = 0,1386 × 6 = 0,8318, r = e<sup>−0,8318</sup> = 0,4353. Birikim çarpanı R = 1/(1 − 0,4353) = 1,771. Tek dozun tepesi D/V = 300 mg / 50 L = 6 mg/L.",
      "Kararlı tepe ve dip: C<sub>ss,max</sub> = 6 mg/L × 1,771 = 10,62 mg/L; C<sub>ss,min</sub> = C<sub>ss,max</sub>·r = 10,62 × 0,4353 = 4,625 mg/L. Dalgalanma oranı e<sup>kτ</sup> = 2,297.",
      "Ortalama: C<sub>ss,ort</sub> = D/(CL·τ) = 300 mg / (6,931 L/sa × 6 sa) = 7,213 mg/L. Tepe ile dibin aritmetik ortalaması (7,62) değildir, çünkü eğri üsteldir.",
      "%90 eşiği: j. dozdan sonraki kesir 1 − r<sup>j</sup> ≥ 0,9 ⇒ j ≥ ln 0,1/ln 0,4353 = 2,77, yani 3. doz (kesir 0,9175; bu doz t = 12 sa'te, 2,4 t½'de verilir). Sayfanın 03. sekmesinde varsayılan ayarlarla bu sayıların hepsi okuma kartlarında ve tabloda görülür.",
    ],
    result:
      "k = 0,1386 1/sa, CL = 6,931 L/sa, R = 1,771; C<sub>ss,max</sub> = 10,62 mg/L, C<sub>ss,min</sub> = 4,625 mg/L, C<sub>ss,ort</sub> = 7,213 mg/L; tepe 3. dozda kararlı tepenin %90'ını geçer (0,9175).",
  },
  misconceptions: [
    {
      myth: "Bir yarılanma süresi sonra ilaç vücuttan tamamen çıkar.",
      truth:
        "Birinci derece atılımda her yarılanma süresi kalanın yarısını götürür: n·t½ sonra 2<sup>−n</sup> kesri kalır. 01. sekmede imleç 10 sa'te (2 t½) %25, 20 sa'te (4 t½) %6,25 gösterir. Sıfıra hiçbir sonlu sürede inilmez; 4–5 t½ sonra \"pratikte atıldı\" denir.",
    },
    {
      myth: "Daha büyük dozla kararlı duruma daha çabuk (ya da daha geç) varılır.",
      truth:
        "Ulaşılan kesir 1 − 2<sup>−t/t½</sup>'dir ve doz içinde geçmez. 03. sekmede dozu 300'den 600 mg'a çıkarınca düzeyler iki katına çıkar ama tablonun kesir sütunu (0,5647, 0,8105, 0,9175…) aynen kalır. Varışı t½, düzeyi doz/CL belirler.",
    },
    {
      myth: "Biyoyararlanım düşükse ilaç vücutta daha kısa süre kalır.",
      truth:
        "F, kana ulaşan doz kesridir; C<sub>max</sub> ile AUC'yi ölçekler. Kana girdikten sonra atılım hızı k = CL/V'ye bağlıdır ve F bu oranda yoktur: 02. sekmede F'yi 0,8'den 0,4'e indirince AUC 57,71'den 28,85'e iner, t<sub>max</sub> 2,294 sa olarak kalır.",
    },
    {
      myth: "Yarı logaritmik grafikteki doğrunun eğimi yarılanma süresidir.",
      truth:
        "ln C = ln C₀ − k·t: eğim −k'dir ve birimi 1/zamandır; t½ = ln 2/k eğimle ters orantılıdır. Üstelik ağızdan alımda k<sub>a</sub> &lt; k ise (flip-flop) iniş eğimi k'yi değil k<sub>a</sub>'yı gösterir.",
    },
  ],
  glossary: [
    { term: "Farmakokinetik", definition: "Vücudun ilaca ne yaptığını, yani emilim, dağılım, metabolizma ve atılımı (ADME) nicel olarak inceleyen bilim; ilacın vücuda etkisi ise farmakodinamiktir." },
    { term: "Görünür dağılım hacmi (V)", definition: "Vücuttaki ilaç miktarının plazma derişimine oranı; gerçek bir organ hacmi değil, miktarı derişime çeviren bir orantı sabitidir." },
    { term: "Klerens (CL)", definition: "Birim zamanda ilaçtan tümüyle temizlenmiş sayılan plazma hacmi; atılım hızı = CL·C, tek bölmeli modelde CL = kV." },
    { term: "Yarılanma süresi (t½)", definition: "Birinci derece atılımda derişimin yarıya inmesi için geçen süre; t½ = ln 2/k = ln 2·V/CL ve dozdan bağımsızdır." },
    { term: "AUC", definition: "Derişim–zaman eğrisinin altındaki alan (mg·sa/L); kana ulaşan toplam ilacın ölçüsü, AUC = F·D/CL." },
    { term: "Biyoyararlanım (F)", definition: "Uygulanan dozun değişmeden dolaşıma ulaşan kesri; aynı dozda AUC<sub>ağız</sub>/AUC<sub>IV</sub> oranıyla ölçülür." },
    { term: "Kararlı durum", definition: "Tekrarlı doz ya da infüzyonda bir aralıkta giren miktarın atılana eşit olduğu, derişim deseninin artık değişmediği durum." },
    { term: "Michaelis–Menten atılımı", definition: "Enzim doyduğunda atılım hızının v = V<sub>max</sub>C/(K<sub>m</sub> + C) biçimini aldığı, yarılanma süresinin derişime bağlı olduğu doğrusal olmayan atılım." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her şey birinci mertebeden doğrusal diferansiyel denklemlerin ve onların sistemlerinin uygulamasıdır: tek bölme dC/dt = −kC, iki bölme 2×2 bir matrisin özdeğerleri, doymuş atılım ise ayrılabilir ama doğrusal olmayan bir denklemdir. Lisansta Diferansiyel Denklemler ve Sayısal Analiz dersleri bu çözümlerin genel kuramını (özdeğerler, kararlılık, Runge–Kutta yöntemlerinin hata mertebesi) verir. Veriden k ve V kestirimi de İstatistik derslerindeki en küçük kareler ve doğrusal olmayan regresyona bağlanır.",
      "Tıp ve eczacılık eğitiminde konu Farmakoloji, Klinik Farmakoloji ve Biyofarmasötik ve Farmakokinetik derslerinde yeniden karşına çıkar: bölmesiz analiz, popülasyon farmakokinetiği (doğrusal olmayan karma etkiler modelleri), fizyoloji temelli modeller ve farmakodinamikle birleşik modeller. Aynı kap modelleri kimya mühendisliğinde tepkime kaplarında da kullanılır. Hatırlatma: bu sayfa bilimi anlatır, bir doz önerisi değildir; ilaç kullanımı için hekime ya da eczacıya danışın. Sağlıkla ilgili kararlar için bir sağlık profesyoneline başvurun; acil durumda 112.",
    ],
    topics: [
      "Birinci mertebeden doğrusal diferansiyel denklemler",
      "Doğrusal sistemler ve özdeğerler",
      "Runge–Kutta (RK4) sayısal çözümü",
      "Michaelis–Menten kinetiği",
      "Log-doğrusal en küçük kareler",
      "Bölmesiz analiz ve popülasyon farmakokinetiği",
      "Fizyoloji temelli farmakokinetik modeller",
    ],
  },
  quiz: [
    {
      question:
        "Tek bölmeli, birinci derece atılımlı bir ilaçta damardan verilen doz iki katına çıkarılıyor. Yarılanma süresi ve AUC ne olur?",
      options: [
        "İkisi de iki katına çıkar.",
        "t½ aynı kalır, AUC iki katına çıkar.",
        "t½ iki katına çıkar, AUC aynı kalır.",
        "t½ bir yarılanma süresi kadar uzar, AUC dört katına çıkar.",
      ],
      answer: 1,
      explanation:
        "t½ = ln 2·V/CL içinde doz yoktur; AUC = D/CL ise dozla doğru orantılıdır. 01. sekmede 500'den 1000 mg'a geçince t½ 5 sa kalır, AUC 72,13'ten 144,3 mg·sa/L'ye çıkar.",
    },
    {
      question:
        "Sürekli infüzyonda t½ = 5 sa iken kararlı düzeyin %90'ına 16,61 saatte varılıyor. İnfüzyon hızı R₀ iki katına çıkarılırsa %90'a varış süresi ne olur?",
      options: [
        "Yaklaşık 8,3 sa'e iner.",
        "16,61 sa kalır; yalnız düzey iki katına çıkar.",
        "Yaklaşık 33,2 sa'e çıkar.",
        "Kararlı duruma hiç varılmaz.",
      ],
      answer: 1,
      explanation:
        "C = C<sub>ss</sub>(1 − e<sup>−kt</sup>) ve C<sub>ss</sub> = R₀/CL. R₀ yalnız C<sub>ss</sub>'yi ölçekler; ulaşılan kesir 1 − e<sup>−kt</sup>'ye girmez. %90'a varış ln 10/k ≈ 3,32 t½ = 16,61 sa'te kalır.",
    },
    {
      question:
        "Atılımı Michaelis–Menten biçiminde olan bir ilaçta başlangıç derişimi K<sub>m</sub>'nin 5 katı. Doz iki katına çıkarılırsa AUC için hangisi doğrudur?",
      options: [
        "Tam iki katına çıkar, çünkü AUC her zaman dozla orantılıdır.",
        "İki kattan az artar, çünkü enzim daha hızlı çalışır.",
        "İki kattan fazla artar, çünkü yüksek derişimde atılım hızı tavana dayanır.",
        "Değişmez, çünkü V<sub>max</sub> sabittir.",
      ],
      answer: 2,
      explanation:
        "AUC = (C₀K<sub>m</sub> + C₀²/2)/V<sub>max</sub> içinde C₀² terimi vardır; oran 2(K<sub>m</sub> + C₀)/(K<sub>m</sub> + C₀/2) her zaman 2'den büyüktür. C₀ = 5K<sub>m</sub> için 12/3,5 = 3,429; sayfanın 04. sekmesindeki değer budur.",
    },
  ],
  next: [
    {
      href: "enzim-kinetigi.html",
      title: "Enzim Kinetiği Laboratuvarı",
      why: "Doymuş atılımın arkasındaki Michaelis–Menten denkleminin mekanizması, K<sub>m</sub> ve V<sub>max</sub>'ın veriden kestirimi ve inhibisyon.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa",
      why: "dC/dt = −kC'nin genel kuramı, sayısal çözümde adım hatası ve iki bölmeli modelin özdeğerlerini veren doğrusal sistemler ve faz portreleri.",
    },
    {
      href: "radyoaktif-bozunma.html",
      title: "Radyoaktif Bozunma: Rastlantıdan Doğan Yasa",
      why: "Aynı yarılanma yasasının rastlantısal bozunmalardan nasıl doğduğu; Hekim yolunda bu basamağın son durağı.",
    },
    {
      href: "regresyon-ve-korelasyon.html",
      title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik",
      why: "05. sekmedeki k ve V kestiriminin dayandığı en küçük kareler doğrusu, R² ve artıkların incelenmesi.",
    },
  ],
  sources: [
    {
      title: "Pharmacokinetics (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Pharmacokinetics",
      note: "Sözcüğün kökeni (pharmakon, kinetikos), bölme modelleri ve doğrusal olmayan farmakokinetikte Michaelis–Menten kinetiği.",
    },
    {
      title: "Physiologically based pharmacokinetic modelling (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Physiologically_based_pharmacokinetic_modelling",
      note: "Tarih: Teorell'in 1937 tarihli çalışması ilk farmakokinetik model, çözümünün o dönemde güçlüğü, basit bölme modellerine dönüş ve 1970'lerde yeniden ilgi.",
    },
    {
      title: "Pharmacology of ethanol (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Pharmacology_of_ethanol",
      note: "Widmark'ın 1922 tarihli parmak ucu kan yöntemi, 1920'lerdeki tek bölmeli sıfırıncı derece modeli ve alkol dehidrogenazın doyması.",
    },
    {
      title: "Michaelis–Menten kinetics (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Michaelis%E2%80%93Menten_kinetics",
      note: "Michaelis ile Menten'in 1913'te invertaz üzerine önerdiği hız denklemi.",
    },
  ],
  revision: "Kasım 2026",
};
