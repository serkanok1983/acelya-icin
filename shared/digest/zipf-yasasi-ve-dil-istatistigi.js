window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["zipf-yasasi-ve-dil-istatistigi"] = {
  slug: "zipf-yasasi-ve-dil-istatistigi",
  title: "Zipf Yasası: Sözcüklerin Sıklığı, Sırası ve Maymunun Metni",
  field: "Dil ve Edebiyat",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir metnin en sık sözcüğü, ikincisinin kabaca iki, üçüncüsünün üç katı geçer. Bu düzeni gerçek metinlerde ölç, üssünü dürüstçe kestir ve rastgele tuşlayan bir maymunun da aynı eğriyi çizip çizmediğini tart.",
  hook:
    "Oscar Wilde'ın masallarında her on dört sözcükten biri \"the\"dır. Sayfadaki Osmanlı dönemi Türkçe metinlerde \"bir\" 338, \"ve\" 159, \"bu\" 147 kez geçer. Sıklık sırayla ters orantılıya yakın düşer; klavyeye rastgele basan bir maymunun metni de benzer bir eğri çizer. Bu düzen dil hakkında bir şey mi söylüyor, yoksa sözcük saymanın kaçınılmaz bir yan ürünü mü?",
  bigIdea:
    "Sözcük sıklıkları geniş bir aralıkta yaklaşık <strong>f(r) ∝ r<sup>−α</sup></strong> kuvvet yasasıyla düşer; ama tek bir \"doğru\" α yoktur, eğri tek başına bir mekanizmayı kanıtlamaz ve kestirimin dürüstlüğü yönteme, aralığa ve neyi \"sözcük\" saydığına bağlıdır.",
  story: [
    "Düzeni ilk fark eden Zipf değildi. Fransız stenograf Jean-Baptiste Estoup 1916'da, E. Condon 1928'de sözcük sıklığıyla sıra arasındaki bu ilişkiyi kaydetmişti; Alman fizikçi Felix Auerbach ise 1913'te şehir nüfuslarında benzer bir ters orantı görmüştü. Ama düzeni bir yasa gibi savunan, adını ona veren Amerikalı dilbilimci George Kingsley Zipf oldu: <em>The Psycho-Biology of Language</em> (1935) ve <em>Human Behavior and the Principle of Least Effort</em> (1949). Zipf'e göre konuşan da dinleyen de anlaşmak için gerekenden fazla çaba harcamak istemez; az sayıda kısa ve çok kullanılan sözcükle geniş, seyrek bir dağarcık arasındaki denge bu eğriyi doğurur. Zipf, sık sözcüklerin kısa olduğunu da ileri sürdü; bugün buna <strong>kısalma yasası</strong> denir.",
    "Zipf'in açıklaması bir öneriydi, ölçülmüş bir mekanizma değil; ardından gelenler başka yollar denedi. Benoit Mandelbrot 1953'te sözcük sıklıklarını bilgi kuramıyla, iletilen bilgi başına maliyeti en aza indiren bir kodlamadan türetmeyi önerdi; eğriye bir kaydırma terimi ekleyen genelleme bugün Zipf–Mandelbrot yasası diye anılır. Herbert Simon 1955'te <em>Biometrika</em>'da \"zengin daha zengin olur\" türünden bir süreç önerdi: metne yeni sözcükler girer, eski sözcükler ise o ana kadarki sıklıklarıyla orantılı olarak yeniden kullanılır. Sonra en sert itiraz geldi: George A. Miller 1957'de boşlukla kesilen rastgele harf dizilerinin de Zipf benzeri bir eğri verdiğini gösterdi, Wentian Li 1992'de bunu matematiksel olarak ayrıntılandırdı. Bir maymun da yapabiliyorsa bu düzen dil hakkında ne söyler?",
    "Tartışma bugün de sürüyor ve ölçüm yöntemleri onun bir parçası oldu. Clauset, Shalizi ve Newman 2009'da log–log grafiğe en küçük kareler doğrusu çekmenin kuvvet yasası üslerini ciddi biçimde yanlış kestirebildiğini gösterip en çok olabilirlik ve uyum testleri önerdi. Ferrer-i-Cancho ve Elvevåg 2010'da üç istatistik testle, rastgele metinlerin sıra dağılımının gerçek metinlerinkiyle tutarsız olduğunu bildirdi; harf olasılıkları gerçek metinden alınsa bile. Piantadosi'nin 2014 incelemesi ise sıklık dağılımında klasik yasanın ötesinde güvenilir bir yapı bulunduğunu, sıra ile sıklığı aynı sayımlardan kestirmenin sahte bir düzen gösterebileceğini ve hiçbir açıklamanın bütün olguları tek başına karşılamadığını vurgular. Dağarcığın metinle büyümesini anlatan yasa da benzer bir kaderi paylaşır: Heaps'e (1978) mal edilir, ama Gustav Herdan 1960'ta öne sürmüştü.",
  ],
  core: [
    {
      heading: "Belirteç, tür ve uzun kuyruk",
      body:
        "Metindeki her sözcük geçişi bir <strong>belirteç</strong>tir (N); farklı sözcüklerin her biri bir <strong>tür</strong>dür (V). Türleri sıklığa göre dizince en sık olana sıra 1, sonrakine sıra 2 verilir. Zipf yasası sıklığın sırayla bir kuvvet yasasıyla düştüğünü söyler; iki ekseni de logaritmik çizince bu, eğimi −α olan bir doğrudur. Sayfanın Türkçe derleminde 9473 belirteç, 4770 tür vardır ve türlerin 74,9 %'u yalnız bir kez geçer: bunlara <strong>hapaks</strong> denir. Kuyruk hiç bitmez: metni uzattıkça hep yeni, seyrek sözcükler gelir. En sık 20 biçim metnin yaklaşık 16 %'sını kaplar; bir kez geçen 3575 biçim ise metnin 37,7 %'sini.",
      formula: "f(r) ≈ C · r<sup>−α</sup>,  ln f = ln C − α ln r",
      formulaNote: "f: r. sıradaki türün sıklığı. Klasik değer α ≈ 1, yani f × r yaklaşık sabit; sayfadaki \"f × r\" sütunu bunu sınar.",
    },
    {
      heading: "Üssü kestirmek: en küçük kareler ile en çok olabilirlik",
      body:
        "En kolay yol, log–log noktalara düz bir doğru çekmektir. Ama noktalar eşit değerde değildir: sağdaki uzun yatay \"basamak\", her biri bir kez geçen yüzlerce sözcüktür ve en küçük kareler bunların her birini ayrı bir gözlem sayar. <strong>En çok olabilirlik</strong> ise soruyu tersinden sorar: her belirtecin r sırasında çıkma olasılığı P(r) = r<sup>−α</sup>/Z(α) ise hangi α bu metni en olası kılar? Log-olabilirliğin türevi sıfırlanınca koşul çok sade çıkar: modelin ln r ortalaması, metnin ln r ortalamasına eşit olmalı. Sayfa bunu Newton yöntemiyle çözer; belirsizlik de olabilirliğin eğriliğinden gelir. Clauset–Shalizi–Newman (CSN) yöntemi sıra yerine sıklıkların kuyruğuna kesikli kuvvet yasası uydurur, kuyruğun başladığı f<sub>min</sub>'i Kolmogorov–Smirnov uzaklığıyla seçer.",
      formula: "ℓ(α) = −α Σ ln r<sub>i</sub> − M ln Z(α)  ⇒  E<sub>α</sub>[ln r] = (1/M) Σ ln r<sub>i</sub>,  SE = 1/√(M · Var<sub>α</sub>[ln r])",
      formulaNote: "M: aralıktaki belirteç sayısı, Z(α) = Σ s<sup>−α</sup>. CSN'de sıra üssü α ≈ 1/(β − 1) dönüşümüyle bulunur; bu dönüşüm büyük örneklem sınırında geçerlidir.",
    },
    {
      heading: "Sırayı aynı sayımdan kestirmenin yanlılığı",
      body:
        "Gerçek metinde hiçbir sözcüğün \"gerçek\" sırasını bilmeyiz; sırayı da sıklığı da aynı sayımlardan çıkarırız. Bu iki hata kaynağı doğurur. Birincisi: sayımlar azalan sıraya dizildiği için rastlantısal dalgalanmalar bile hep azalan bir eğri gibi görünür; Piantadosi bütün sözcükler eşit olasılıklı olsa bile böyle bir grafiğin belirgin biçimde azalacağını hatırlatır. İkincisi: hiç görülmemiş sözcükler grafikte yoktur, kuyruk kesilir. Sayfanın ikinci sekmesi bunu ancak yapay veride yapılabilecek bir karşılaştırmayla ayırır: <strong>Kâhin</strong>, sözcüklerin gerçek sırasını bilerek aynı en çok olabilirlik kestirimini yapar ve yanlılığı sıfıra indirir. Gerçek metin için Piantadosi'nin çaresi metni ikiye bölmektir: sıra bir yarıdan, sıklık öbür yarıdan sayılır, böylece hatalar birbirinden bağımsızlaşır.",
      formula: "sapma = ortalama kestirim − gerçek α",
      formulaNote: "Kestirimin yanlılığı ancak cevabı bilinen veride ölçülebilir; gerçek metinde \"doğru α\" diye bir karşılaştırma ölçütü yoktur.",
    },
    {
      heading: "Heaps yasası: dağarcık nasıl büyür?",
      body:
        "Metni okurken saydığın farklı sözcük sayısı V(N), metin uzadıkça büyür ama giderek yavaşlar: <strong>Heaps (Herdan) yasası</strong> bunu V ≈ K·N<sup>β</sup>, 0 &lt; β &lt; 1 diye yazar. İngilizce derlemlerde β genellikle 0,4–0,6 arasında bildirilir. Zipf ile bağı basit bir akıl yürütmeden çıkar: N belirteçte r. sözcüğü görmeyi bekleyebilmek için N·P(r) ≳ 1 olmalı. P(r) ∝ r<sup>−α</sup> ise görülen en büyük sıra r ∝ N<sup>1/α</sup> olur; dağarcık da bu kadardır. Bu türetme α &gt; 1 ister (yoksa olasılıklar sonsuz dağarcıkta toplanamaz); α &lt; 1 iken β'nın 1'e yakın olması beklenir. Sayfanın küçük derlemlerinde f ≥ 5 aralığında α &lt; 1 çıktığı için tablodaki 1/α değerleri β'ya oturmaz; sayfa bunu saklamaz.",
      formula: "V(N) ≈ K · N<sup>β</sup>,  α &gt; 1 ve büyük N için β → 1/α",
      formulaNote: "Karıştırılmış bir metinde beklenen dağarcık E[V(n)] = Σ<sub>w</sub> [1 − C(N − f<sub>w</sub>, n)/C(N, n)]; gerçek metin bundan daha yavaş büyür, çünkü sözcükler yerel olarak kümelenir.",
    },
    {
      heading: "Bitişken Türkçe: biçim mi, gövde mi?",
      body:
        "Türkçe ekler bir gövdeyi onlarca <strong>sözcük biçimine</strong> dağıtır: göz, gözü, gözlerini, gözleriyle… Biçimleri saydığında Türkçe derlem İngilizceden çok daha zengin görünür: aynı uzunlukta, ilk 9473 sözcükte Türkçede 4770, İngilizcede 1573 farklı biçim vardır (3,0 kat). Biçimleri gövdeye indirince Türkçe V 2933'e düşer ama İngilizcenin düzeyine inmez. Sayfanın ek kesicisi bilerek kabadır: sözlük kullanmaz, ünlü uyumunu denetlemez; \"dedi\"yi \"ded\"e indirir, \"kitabı\"nı \"kitab\" yapar. Bu yüzden sonucu ikinci bir kaba yöntemle (ilk 5 harf) karşılaştırmak gerekir: ikisi aynı yönü gösteriyorsa sonuç kesicinin hatalarına dayanmıyordur. Bir uyarı daha: iki derlem farklı yazar, dönem ve türdendir; farkın bir kısmı dilden değil metinden gelir.",
      formula: "biçim: 4770 tür · gövde: 2933 · ilk 5 harf: 3133 (Türkçe, N = 9473)",
      formulaNote: "Sözlük biçimine (lemma) indirmek gerçek bir biçimbirim çözümleyicisi ister; buradaki gövde yalnız bir yaklaşıktır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var. <strong>01 · Sıklık ve sıra</strong> gerçek metinleri sayar: Türkçe derlem, Vikikaynak'taki sadeleştirilmemiş çeviriyazılardan 11 kamu malı metindir (Ziya Paşa'nın 1868 tarihli \"Şiir ve İnşâ\" makalesi ve Ömer Seyfettin'in 1902 ile 1923 arasında yayımlanmış on hikâyesi, toplam 9473 sözcük); İngilizce derlem Oscar Wilde'ın <em>The Happy Prince and Other Tales</em> kitabıdır (1888, 16 278 sözcük). Türkçe derlem küçüktür ve tümüyle Osmanlı dönemi düzyazısıdır: Arapça ve Farsça tamlamalarla yüklü süslü bir dille sade bir dili karıştırır, bugünkü Türkçeyi temsil etmez. Tireyle yazılan Farsça tamlama eki ayrı sayıldığı için en sık birimler arasında \"i\" ve \"ı\" görünür. Kendi metnini de yapıştırabilirsin; metin yalnız tarayıcında işlenir. <strong>02 · Üssü dürüstçe ölçmek</strong> gerçek üssü bilinen yapay metinde yöntemleri sınar, <strong>03 · Heaps ve kısalma</strong> dağarcığın büyümesini ve sözcük uzunluğunu ölçer, <strong>04 · Maymun metni tartışması</strong> rastgele tuşlanmış metni gerçek metinle yan yana koyar. Sayılar ondalık virgülle yazılır.",
    experiments: [
      {
        title: "Daha çok nokta, daha iyi kestirim mi?",
        predict: "Uydurmaya bir kez geçen binlerce sözcüğü de katarsan en küçük kareler üssü gerçeğe yaklaşır mı, yoksa kayar mı?",
        do: "01 · Sıklık ve sıra sekmesinde Türkçe metin ve \"Sözcük biçimi\" seçiliyken \"Uydurma aralığı: sıklığı en az\" menüsünü 5'ten 1'e çevir. Sonra 5'e geri dönüp \"Sırayı bir yarıdan, sıklığı öbür yarıdan say\" kutusunu işaretle.",
        observe: "Eşik 5'te en çok olabilirlik 0,781 ± 0,010, en küçük kareler 0,749 (R² = 0,993). Eşik 1'de en çok olabilirlik 0,706, en küçük kareler 0,570'e düşer; 3575 hapaks sıra 1196–4770'te tek bir yatay basamak çizer. İngilizcede aynı adım en küçük kareleri tersine 1,005'ten 1,111'e çıkarır. İkiye bölmede en çok olabilirlik 0,843 ± 0,019 verir; aralık da sıra 1–100'e daralır.",
        explain: "En küçük kareler basamaktaki her sırayı ayrı bir gözlem sayar; basamağın nerede ve ne kadar uzun olduğuna göre doğruyu bir yöne ya da öbürüne çeker. Yüksek R² bunu yakalamaz. İkiye bölme, sırayla sıklığın aynı gürültüyü paylaşmasını önler. Yükselişin çoğu bundan gelir, aralığın daralmasından değil: bölmeden aynı 1–100 aralığı 0,795 verir. Belirsizlik büyür, çünkü her yarı metnin yarısıdır.",
      },
      {
        title: "Cevabı bilinen veri ve Kâhin",
        predict: "Gerçek üs 1,00 olan yapay bir metinde hangi yöntem 1,00'e en yakın çıkar? En çok olabilirlik bütün sıralarda kusursuz olur mu?",
        do: "02 · Üssü dürüstçe ölçmek sekmesini varsayılan ayarlarla aç (α = 1,00, N = 10 000, 20 tohum) ve \"Ortalama ± ss\" sütununu oku. Sonra \"Belirteç sayısı N\" menüsünden 100 000'i seç.",
        observe: "N = 10 000'de: en küçük kareler bütün sıralar 0,609 ± 0,006, f ≥ 5 ile 0,958; en çok olabilirlik bütün sıralar 0,875 ± 0,003, f ≥ 5 ile 0,985; CSN 0,877 ± 0,084; Kâhin 1,000 ± 0,003. Evrendeki 50 000 sözcüğün yalnız 3879'u görülmüştür. N = 100 000'de en küçük kareler bütün sıralar 0,837'ye, en çok olabilirlik bütün sıralar 0,963'e yükselir.",
        explain: "Kâhin ile \"en çok olabilirlik, bütün sıralar\" aynı yöntemdir; tek farkı Kâhin'in gerçek sıraları bilmesidir. Aradaki −0,125'lik sapma yöntemin değil, sıraları örneklemden kestirmenin ve görülmeyen sözcüklerin bedelidir. Veri büyüdükçe bu bedel küçülür ama kaybolmaz; f ≥ 5 aralığı ise iyi sayılmış sıralarla yetinerek onu en aza indirir.",
      },
      {
        title: "Dağarcık ve ekler",
        predict: "Türkçe metin her yeni sayfada İngilizceden daha çok mu yeni sözcük biçimi getirir? Gövdeye geçince fark kapanır mı?",
        do: "03 · Heaps ve kısalma sekmesinde varsayılan tabloyu oku; sonra \"Sayılan birim\" menüsünden \"Yaklaşık gövde\"yi seç. Kısalma tablosundaki ρ değerlerini ve ortalama uzunlukları da karşılaştır.",
        observe: "Biçimde Heaps üssü Türkçe 0,892, İngilizce 0,650; N = 1000'de Türkçede 662 farklı biçim sayılır, karıştırılmış metinde beklenen 756,5. Gövdede Türkçe β 0,801'e iner, İngilizce 0,616. Kısalma: ρ Türkçe −0,339, İngilizce −0,349; metinde okunan Türkçe birimler İngilizceden 1,86 harf uzunken gövdede fark 0,20 harfe iner.",
        explain: "Ekler hem dağarcığı hızla büyütür hem de sözcükleri uzatır; gövdeye inince ikisinin büyük kısmı kaybolur, ama dağarcık farkı tümüyle kapanmaz. Gerçek metin karıştırılmış hâlinden yavaş büyür, çünkü kişi ve yer adları bir hikâyede kümelenir. İki derlem farklı dönem ve türden olduğu için farkın tamamını dile bağlayamayız.",
      },
      {
        title: "Maymun aynı üssü tutturabilir mi?",
        predict: "Harf sayısı ve boşluk olasılığı Türkçe metne eşlenen bir maymunun f ≥ 5 üssü gerçek metninkine ne kadar yakın çıkar? Peki öteki ölçüler?",
        do: "04 · Maymun metni tartışması sekmesinde \"Karşılaştırılan gerçek metin\" menüsünden Türkçeyi seç ve \"Karşılaştırılan metne eşle\" düğmesine bas (k = 29, q = 0,17). Sonra \"Sekmeyi sıfırla\"ya bas (İngilizce, k = 26, q = 0,20) ve \"Harfler\" menüsünden \"İngilizce derlemin harf sıklıklarıyla\"yı seç.",
        observe: "Türkçede üsler neredeyse aynıdır: gerçek metin 0,781, maymun 0,774; ortalama uzunluk ikisinde de 5,86 harf. Ama hapaks oranı maymunda 93,7 %, gerçekte 74,9 %; maymunun en sık \"sözcükleri\" tek harflerdir. Sıfırlayıp İngilizce harf sıklıklarına geçince üs 0,888 olur (gerçek 0,882), hapaks oranı 92,7 % (gerçek 49,3 %). Kısalma yasası maymunda da çıkar: ρ eksidir.",
        explain: "Tek bir üs iki süreci ayırmaya yetmez: Miller ve Li'nin noktası budur. Ama eğrinin geri kalanı (dağarcık, hapaks, en sık sözcükler) apayrıdır; Ferrer-i-Cancho ve Elvevåg'ın testleri bu ayrıntıya bakar. Kısalma da maymunda bedavaya gelir, çünkü her ek harf olasılığı küçültür. Benzer eğri aynı süreç demek değildir.",
      },
    ],
  },
  wow: [
    {
      title: "\"The\" her yerde aynı payda",
      body:
        "Wilde'ın beş masalında \"the\" 1179 kez geçer: metnin 7,24 %'u. Bir milyonu biraz aşan sözcüklük İngilizce Brown derleminde \"the\" 69 971 kez geçer, yani yaklaşık 7 %. On altı bin sözcüklük beş masal ile bir milyonluk bir derlem, en sık sözcüğe metnin neredeyse aynı payını ayırır.",
    },
    {
      title: "Yaklaşık bin dilde kısalma",
      body:
        "Sık sözcüklerin kısa olduğunu ilk Zipf ileri sürmüştü. Christian Bentz ve Ramon Ferrer-i-Cancho'nun 2016 çalışması bu kısalma yasasını 80 dil ailesinden yaklaşık bin dilde, yazılı sözcüklerin harf sayısıyla sınadı. Yasa insan dilinin ötesine de uzanabilir: 2025'te yayımlanan bir çalışma, incelenen beş balina türünün ikisinin seslenmelerinde benzer bir düzen bildirdi.",
    },
    {
      title: "Şehirler, türler ve sözcükler",
      body:
        "Felix Auerbach 1913'te şehir nüfuslarında sıra ile büyüklük arasında ters orantı gördü; Udny Yule 1920'lerde biyolojide cinslerin içerdiği tür sayısının dağılımını modelledi. Herbert Simon 1955'te aynı \"zengin daha zengin olur\" sürecini sözcüklere uyguladı: yeni sözcükler arada bir girer, eskiler o ana kadarki sıklıklarıyla orantılı olarak yeniden kullanılır. Ortaya çıkan dağılımın kuyruğu Zipf yasasına uyar; aynı matematik çok farklı dünyalarda iş görür.",
    },
  ],
  worked: {
    title: "Maymunun kuramsal eğimi",
    prompt:
      "Bir maymun her vuruşta q = 0,20 olasılıkla boşluğa, yoksa k = 26 harften birine eşit olasılıkla basıyor. Belirli bir L harfli sözcüğün olasılığını bul, sıra–sıklık eğrisinin kuramsal eğimini türet ve 15 000 sözcüklük bir metinde tek harfli sözcüklerin kaçar kez geçmesi gerektiğini hesapla. Sonuçları 04 · Maymun metni tartışması sekmesinin varsayılan ayarlarıyla karşılaştır.",
    steps: [
      "Bir sözcük, L harf ve ardından bir boşluktur; boş sözcükler atıldığı için sözcüğün boş olmadığı koşulu altında çalışırız. Belirli bir L harfli dizinin olasılığı p(L) = q/(1 − q) · ((1 − q)/k)<sup>L</sup> olur. Tek harfli her sözcük için: 0,25 × (0,80/26) = 0,25 × 0,0308 ≈ 0,0077, yani 0,77 %.",
      "Aynı uzunluktaki bütün sözcükler eşit olasılıklıdır; bu yüzden eğri bir merdivendir. L harfli k<sup>L</sup> sözcük vardır: 26 tek harfli sözcük sıra 1–26'yı, 676 iki harfli sözcük sıra 27–702'yi kaplar. Her basamakta olasılık (1 − q)/k = 1/32,5 kat düşerken sıra yaklaşık 26 kat büyür.",
      "Merdivenin zarfı bir kuvvet yasasıdır: sıra r ≈ k<sup>L</sup> ise L = ln r / ln k, dolayısıyla p ∝ ((1 − q)/k)<sup>ln r/ln k</sup> = r<sup>−α</sup>, α = −ln((1 − q)/k)/ln k = 1 − ln(1 − q)/ln k. Sayılarla: 1 − ln 0,80/ln 26 = 1 + 0,2231/3,2581 = 1,068. Sayfa \"Kuramsal α\" satırında 1,068 gösterir.",
      "Beklenen sayımlar: 15 000 sözcükte her tek harfli sözcük 15 000 × 0,0077 ≈ 115 kez, her iki harfli sözcük 15 000 × 0,000237 ≈ 3,6 kez geçmelidir. Dolayısıyla f ≥ 5 aralığına 26 tek harf ve yalnız şansı yaver giden yaklaşık 190 iki harfli sözcük girer: sayfa 220 sıra bildirir.",
      "Bu aralık merdivenin tek bir düz basamağını ve bir sonrakinin başını kapsar; bu yüzden ölçülen üs (0,823) kuramsal eğimden küçük çıkar. Kuramsal eğim merdivenin zarfının eğimidir, kısa bir aralıktaki uydurma ise basamağın düzlüğünü görür. Ortalama sözcük uzunluğu 1/q = 5 harf olmalıdır; sayfa 4,97 ölçer.",
    ],
    result:
      "Eşit harfli maymunun kuramsal üssü α = 1 − ln(1 − q)/ln k; k = 26, q = 0,20 için 1,068. Bir sayıda Zipf'e çok benzer, ama eğrisi basamaklıdır ve hapaks oranı gerçek metinden çok yüksektir. Harf sayısı azaldıkça (k küçüldükçe) üs büyür.",
  },
  misconceptions: [
    {
      myth: "Log–log grafikte noktalar bir doğruya benziyor ve R² yüksekse eğim doğru üstür.",
      truth:
        "R² yalnız noktaların bir doğru çevresinde toplandığını söyler; üssün yansız kestirildiğini değil. Sayfanın yapay verisinde en küçük kareler bütün sıralarda gerçek üs 1,00 iken 0,609 verir. Clauset, Shalizi ve Newman bu yüzden en çok olabilirlik ve uyum testleri önerir; log–log doğru bir uyum testi değildir.",
    },
    {
      myth: "Türkçenin Zipf üssü 0,78'dir.",
      truth:
        "0,781 bu 11 Osmanlı dönemi metnin, sözcük biçimiyle, f ≥ 5 aralığında, en çok olabilirlikle verdiği kestirimdir. Gövdeye geçince 0,680, bütün sıralarda 0,706, ikiye bölmede 0,843 olur. Bir dilin tek bir \"üssü\" yoktur: kestirim yönteme, aralığa, birime, metnin türüne ve uzunluğuna bağlıdır.",
    },
    {
      myth: "Rastgele tuşlayan bir maymun da Zipf eğrisi çizdiğine göre yasa dil hakkında hiçbir şey söylemez.",
      truth:
        "Bu, tartışmanın yalnız bir yanıdır. Maymunun eğrisi kaba bir benzerlik gösterir; ama basamaklıdır, hapaks oranı çok yüksektir ve en sık \"sözcükleri\" anlamsız tek harflerdir. Ferrer-i-Cancho ve Elvevåg rastgele metinleri istatistik testlerle gerçek metinlerden ayırabildi. Tersi de aşırıdır: eğri tek başına bir mekanizmayı kanıtlamaz; Piantadosi yasanın ötesinde kanıt aranmasını önerir.",
    },
    {
      myth: "Yeterince uzun bir metin okursan dildeki bütün sözcükleri görmüş olursun.",
      truth:
        "Heaps yasasına göre dağarcık metinle hep büyür, yalnız yavaşlayarak: Türkçe derlemde β = 0,892, yani metni iki katına çıkarmak dağarcığı yaklaşık 2<sup>0,892</sup> ≈ 1,86 katına çıkarır. Uzun kuyruk yüzünden her yeni metin yeni ve seyrek sözcükler getirir; dil modelleri de bu görülmemiş sözcüklerle uğraşmak zorundadır.",
    },
  ],
  glossary: [
    { term: "Belirteç (token)", definition: "Metindeki her bir sözcük geçişi; \"ev ve ev\" üç belirteçtir." },
    { term: "Tür (type)", definition: "Metindeki farklı sözcüklerden her biri; \"ev ve ev\" iki türdür. Tür sayısı V, dağarcığın büyüklüğüdür." },
    { term: "Hapaks", definition: "Bir metinde yalnız bir kez geçen sözcük (hapax legomenon); Zipf eğrisinin sağındaki uzun yatay basamağı oluşturur." },
    { term: "Sıra (r)", definition: "Türler sıklığa göre azalan diziye konduğunda bir türün yeri; en sık türün sırası 1'dir." },
    { term: "Kuvvet yasası", definition: "Bir niceliğin ötekinin sabit bir üssüyle orantılı olması, y ∝ x<sup>−α</sup>; log–log grafikte eğimi −α olan bir doğru verir." },
    { term: "En çok olabilirlik", definition: "Gözlenen veriyi en olası kılan parametre değerini seçen kestirim yöntemi; Zipf üssü için log–log en küçük karelerden daha az yanlıdır." },
    { term: "Heaps (Herdan) yasası", definition: "Metin uzadıkça farklı sözcük sayısının alt-doğrusal büyümesi: V ≈ K·N<sup>β</sup>, 0 &lt; β &lt; 1." },
    { term: "Kısalma yasası", definition: "Sık kullanılan sözcüklerin kısa olma eğilimi; sayfada sıklık ile harf sayısı arasındaki eksi Spearman korelasyonuyla ölçülür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfa <strong>niceliksel dilbilim</strong> ile <strong>matematiksel istatistiğin</strong> kesiştiği yerde durur. Üniversitede en çok olabilirlik kestirimi, Fisher bilgisi ve standart hata (sayfadaki ± değerinin kaynağı) olasılık ve istatistik derslerinde; kuvvet yasaları ve uzun kuyruklu dağılımlar karmaşık sistemler ve ağ bilimi derslerinde karşına çıkar. <strong>Derlem dilbilimi</strong> ve <strong>doğal dil işleme</strong> dersleri ise bu sayfanın kaba araçlarının gerçeklerini kullanır: sözlüklü biçimbirim çözümleyicileri, sözlük biçimine (lemma) indirgeme ve milyonlarca sözcüklük dengeli derlemler.",
      "Uzun kuyruğun pratik bir sonucu vardır: bir dil modeli eğitim verisinde hiç görmediği sözcüklerle karşılaşmaya devam eder. Görülmemiş sözcüklere olasılık ayırmak (yumuşatma) ve sözcükleri daha sık tekrar eden alt-sözcük parçalarına bölmek, bu yüzden bugünkü dil teknolojisinin temel adımlarıdır; Türkçe gibi bitişken dillerde ise iyice zorunludur. Kuramsal yanda soru açıktır: Zipf benzeri dağılımlar iletişimin verimliliğinden mi, sözcüklerin yeniden kullanım dinamiğinden mi, anlamın yapısından mı doğar? Piantadosi'nin önerisi, yasanın kendisinden öte kanıt aramaktır.",
    ],
    topics: ["En çok olabilirlik ve Fisher bilgisi", "Kuvvet yasaları ve uzun kuyruklar", "Zipf–Mandelbrot yasası", "Derlem dilbilimi", "Biçimbilimsel çözümleme", "Görülmemiş sözcükler ve yumuşatma", "Bilgi kuramı ve kodlama"],
  },
  quiz: [
    {
      question: "Eşit harfli maymunun kuramsal üssü α = 1 − ln(1 − q)/ln k. Boşluk olasılığı q = 0,20 sabitken klavyedeki harf sayısını 26'dan 2'ye indirirsen üs ne olur?",
      options: ["Değişmez, çünkü q aynı", "Büyür: yaklaşık 1,32", "Küçülür: yaklaşık 0,68", "Tanımsız olur"],
      answer: 1,
      explanation: "ln k küçüldüğü için kesir büyür: 1 − ln 0,80/ln 2 = 1 + 0,2231/0,6931 ≈ 1,32. Az harfle sözcük çeşidi her uzunlukta daha yavaş artar, sıra daha az ilerlerken olasılık yine (1 − q)/k oranında düşer; eğri dikleşir. Sayfada \"Harf sayısı k\" kaydırıcısını 2'ye çekip \"Kuramsal α\" satırını okuyabilirsin.",
    },
    {
      question: "Türkçe derlemde Heaps üssü β = 0,892 ölçülüyor. Aynı türden metni iki katına çıkarırsan farklı sözcük biçimi sayısı yaklaşık kaç katına çıkar?",
      options: ["2 kat", "Yaklaşık 1,86 kat", "Yaklaşık 1,41 kat", "Değişmez"],
      answer: 1,
      explanation: "V ∝ N<sup>β</sup> ise oran 2<sup>0,892</sup> ≈ 1,86'dır. Dağarcık metinden biraz yavaş ama yine de hızla büyür; İngilizce derlemin β = 0,650'si ile aynı artış yalnız 2<sup>0,65</sup> ≈ 1,57 kat olurdu. Fark büyük ölçüde eklerden gelir: gövdeye geçince Türkçe β 0,801'e iner.",
    },
    {
      question: "Yapay metinde en çok olabilirlik bütün gözlenen sıralarda 0,875, Kâhin (aynı yöntem, gerçek sıralarla) 1,000 veriyor; gerçek α = 1,00. Aradaki farkın nedeni nedir?",
      options: ["En çok olabilirlik yönteminin kendisi yanlıdır", "Sıraların aynı sayımlardan kestirilmesi ve hiç görülmeyen sözcükler", "Tohum sayısının az olması", "Rastgele sayı üretecindeki bir hata"],
      answer: 1,
      explanation: "İki satır aynı formülü kullanır; tek fark sıraların kaynağıdır. Gözlenen sayımlardan dizilen sıralar rastlantısal dalgalanmayı da azalan eğriye katar ve görülmeyen sözcüklerle kuyruk kesilir. Tohum sayısı yalnız ± ss'yi etkiler; 20 tohumda sapma −0,125'tir ve N büyüdükçe küçülür (100 000'de −0,037).",
    },
  ],
  next: [
    { href: "bilgi-kurami-ve-sikistirma.html", title: "Bilgi Kuramı ve Sıkıştırma: Entropi, Huffman, LZ ve Kanal Kapasitesi", why: "Sık sembole kısa kod veren Huffman ağacı, kısalma yasasının ve Mandelbrot'un kodlama fikrinin mühendislikteki karşılığı; LZ sekmesinde gerçek metinler sıkıştırılır." },
    { href: "regresyon-ve-korelasyon.html", title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik", why: "Log–log en küçük karelerin neden yanıltabildiğini anlamak için: artıkların varsayımları, aykırı değer ve kaldıraç." },
    { href: "turkcenin-ses-yapisi.html", title: "Türkçenin Ses Yapısı: Ünlü Uyumu, Ünsüz Değişimi ve Hece", why: "Buradaki kaba ek kesicinin bilmediği kurallar: ünlü uyumu, ünsüz değişimi ve kurallı bir ek motoru. \"kitabı\"nın \"kitap\"tan yumuşamayla mı, temeldeki /kitab/'dan mı geldiği orada iki çözümleme olarak tartışılır." },
    { href: "normal-dagilim.html", title: "Normal Dağılım ve Merkezi Limit Teoremi", why: "Uzun kuyruğun karşıtı: ortalamanın temsil ettiği, uç değerlerin hızla seyreldiği dağılım ve onu doğuran merkezi limit teoremi." },
  ],
  sources: [
    { title: "Piantadosi · Zipf's word frequency law in natural language (2014)", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4176592/", note: "Psychonomic Bulletin & Review 21(5), 1112–1130. Yasanın eleştirel incelemesi: ikiye bölme yöntemi, rastgele tuşlama ve öteki açıklamaların değerlendirmesi (İngilizce, açık erişim)." },
    { title: "Clauset, Shalizi, Newman · Power-law distributions in empirical data", url: "https://arxiv.org/abs/0706.1062", note: "SIAM Review 51, 661–703 (2009). En küçük karelerin yanıltıcılığı, en çok olabilirlik ve Kolmogorov–Smirnov ile kuyruk seçimi (İngilizce)." },
    { title: "Wikipedia · Zipf's law", url: "https://en.wikipedia.org/wiki/Zipf%27s_law", note: "Estoup 1916, Condon 1928, Auerbach 1913, Zipf'in kitapları, Miller ve Li'nin rastgele metin argümanı, Brown derleminde \"the\" (İngilizce)." },
    { title: "Wikipedia · Heaps' law", url: "https://en.wikipedia.org/wiki/Heaps%27_law", note: "Herdan 1960 ve Heaps 1978, İngilizce derlemlerde tipik K ve β değerleri, Zipf yasasıyla asimptotik ilişki (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
