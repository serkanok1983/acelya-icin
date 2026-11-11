window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["dna-replikasyon"] = {
  slug: "dna-replikasyon",
  title: "DNA Replikasyonu: Kendi Kalıbını Taşıyan Molekül",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir dizi yaz, çift sarmalı say; çatalda Okazaki parçalarını, Meselson–Stahl tüplerinde bantları, kopya başına hataları ölç. Hepsinin altında tek bir kural yatar: yeni iplik yalnız 5′→3′ uzar.",
  hook: '25 Nisan 1953\'te Nature dergisinde çıkan kısa bir makalenin sonlarına doğru, neredeyse fısıltıyla söylenmiş bir cümle vardı: "Önerdiğimiz özgül eşleşmenin, genetik malzeme için olası bir kopyalama mekanizmasını hemen akla getirdiği gözümüzden kaçmadı." Bir molekül nasıl olur da kendi kendinin kalıbı olabilir?',
  bigIdea:
    "DNA'nın iki ipliği birbirinin <strong>tamamlayıcısıdır</strong>; sarmal açılınca her eski iplik yeni bir ipliğe kalıp olur ve ortaya çıkan iki molekülün her biri bir eski, bir yeni iplik taşır: <em>yarı korunumlu</em> kopyalama.",
  story: [
    "1950'de Erwin Chargaff, incelediği her canlının DNA'sında adenin miktarının timine, guaninin sitozine eşit olduğunu gösterdi; ama bunun ne anlama geldiğini kimse bilmiyordu. Mayıs 1952'de Londra King's College'da Rosalind Franklin'in doktora öğrencisi Raymond Gosling, DNA liflerinin bir X-ışını kırınım görüntüsünü çekti; sonradan \"51 numaralı fotoğraf\" diye ünlenen kare, molekülün sarmal olduğunu ve boyutlarını ele veriyordu. Ocak 1953'te Maurice Wilkins bu fotoğrafı, Franklin'in haberi olmadan, Cambridge'den gelen James Watson'a gösterdi. Watson ve Francis Crick ipuçlarını kartondan baz modelleriyle birleştirdi: A her zaman T ile, G her zaman C ile hidrojen bağı kurarsa iki iplik birbirine tam oturuyordu. Chargaff'ın oranları artık bir sayı değil, bir <strong>yapı</strong>ydı. Makalenin sonlarına doğru gelen o ünlü cümle de buradan doğdu: iplikler birbirinin tamamlayıcısıysa, ayrıldıklarında her biri ötekini yeniden kurabilir. 1962 Nobel Tıp Ödülü Watson, Crick ve Wilkins'e verildi. Franklin dört yıl önce, 37 yaşında ölmüştü; Nobel kuralları ölmüş birinin aday gösterilmesine izin vermez.",
    "Fikir güzeldi ama kanıt değildi; üstelik üç rakip senaryo vardı. <strong>Korunumlu</strong> modelde eski molekül olduğu gibi kalır, yanına yepyeni bir molekül yapılır. <strong>Yarı korunumlu</strong> modelde her yeni molekül bir eski, bir yeni iplik taşır. <strong>Dağılımlı</strong> modelde eski ve yeni parçalar her iplikte karışık durur. 1958'de Matthew Meselson ve Franklin Stahl, Caltech'te bu üçünü tek deneyle ayırdı. <em>E. coli</em> bakterilerini nesiller boyu ağır azot (¹⁵N) içeren besiyerinde büyüttüler; DNA'ları \"ağır\" olmuştu. Sonra bakterileri normal azotlu (¹⁴N) besiyerine aktardılar ve her nesilde DNA'yı sezyum klorür çözeltisinde ultrasantrifüjle yoğunluğuna göre ayırdılar. Bir nesil sonra tek bir bant vardı, ağır ile hafifin arasında: her molekül yarı eski, yarı yeniydi. İki nesil sonra iki bant vardı: biri yine arada, biri hafif konumda. Korunumlu model ilk nesilde, dağılımlı model ikinci nesilde elendi. Biyolog John Cairns'in deyişiyle bu, \"biyolojinin en güzel deneyi\"dir.",
    "Peki kopyalamayı kim yapıyordu? 1956'da Arthur Kornberg, <em>E. coli</em> özütünden nükleotitleri zincire ekleyen bir enzim ayırdı: <strong>DNA polimeraz</strong>. 1959'da bu buluşla, Severo Ochoa ile birlikte Nobel Tıp Ödülü'nü aldı. Ama enzimin bir huyu kafaları karıştırdı: yeni nükleotidi yalnızca zincirin 3′ ucuna ekleyebiliyor, yani hep tek yönde çalışıyordu. Oysa çift sarmalın iki ipliği zıt yönde uzanır. İki iplik aynı anda, aynı çatalda nasıl kopyalanıyordu? Cevabı 1968'de Nagoya'da Reiji ve Tsuneko Okazaki verdi: ipliklerden biri kesintisiz, öteki ise kısa parçalar hâlinde, geri geri yapılıp sonradan dikiliyordu. O parçalar bugün onların adını taşır. Reiji Okazaki 14 yaşındayken Hiroşima'da atom bombasının radyasyonuna maruz kalmıştı; 1975'te, 44 yaşında lösemiden öldü. Tsuneko Okazaki araştırmayı sürdürdü.",
  ],
  core: [
    {
      heading: "Tamamlayıcılık: kalıp molekülün kendi içinde",
      body: 'Bir ipliğin dizisini biliyorsan ötekini bilirsin. Adenin yalnız timinle (iki hidrojen bağı), guanin yalnız sitozinle (üç hidrojen bağı) eşleşir; çünkü yalnız bu çiftler hem doğru hidrojen bağlarını kurar hem de sarmalın 2 nanometrelik genişliğine tam sığar. Hücrenin ayrı bir "orijinal" saklamasına gerek yoktur: her iplik ötekinin negatifidir. İki iplik zıt yöne bakar (<strong>antiparalel</strong>): üstteki solda 5′ ile başlarsa alttaki solda 3′ ile başlar. Bu yüzden alt ipliği kendi 5′ ucundan okumak için hem tamamlamak hem ters çevirmek gerekir; buna <strong>ters tamamlayıcı</strong> denir. Erime sıcaklığı için sayfa iki kaba kural kullanır: 14 bazdan kısa diziler için Wallace kuralı T<sub>m</sub> ≈ 2·(A+T) + 4·(G+C) °C, daha uzunlar için T<sub>m</sub> ≈ 64.9 + 41·(G+C − 16.4)/N °C. İkisi de tuz ve iplik derişimini sabit sayar, komşu bazların etkisini hiç hesaba katmaz; gerçek değer birkaç °C, hatta daha fazla sapabilir. Geçerlilik sınırı da süs değildir: GC formülü kısa dizilerde anlamını yitirir, 6 bazlık GAATTC için 64.9 + 41·(2 − 16.4)/6 ≈ −33.5 °C gibi fiziksel olmayan bir sayı verir. Sayfa bu yüzden orada değer yerine "—" yazar.',
      formula: "A = T, G ≡ C · H-bağı = 2·n<sub>AT</sub> + 3·n<sub>GC</sub>",
      formulaNote:
        "Çizgi sayısı hidrojen bağı sayısıdır. G–C bakımından zengin DNA daha yüksek sıcaklıkta ayrılır. Bunun asıl nedeni, üst üste dizilen bazların birbirini çekmesinin (<strong>baz istiflenmesi</strong>) G–C çiftlerinde daha güçlü olmasıdır; fazladan hidrojen bağı da katkı verir.",
    },
    {
      heading: "Yarı korunumlu: her kopyada bir eski iplik",
      body: 'Replikasyon bittiğinde ortada iki molekül vardır ve her birinde bir iplik ana molekülden, bir iplik yeni sentezden gelir. Bunun iki sonucu vardır. Birincisi, hücre asla "sıfırdan" DNA yazmaz; her yeni harf, eski bir ipliğin okunmasıyla yazılır. İkincisi, eski iplikler yok edilmez: ilk molekülün iki ipliği, kaç kez kopyalanırsa kopyalansın, iki ayrı molekülün içinde sağlam durur. ¹⁵N\'li bir kültürü ¹⁴N\'ye aktardığında başlangıçtaki her molekül g nesil sonra 2<sup>g</sup> moleküle dönüşür ve bunların yalnız ikisi eski iplik taşır; bu melez moleküllerin payı 2/2<sup>g</sup> = 2<sup>1−g</sup> olur, geri kalan her şey tamamen hafiftir. Korunumlu model ise 2<sup>−g</sup> oranında tam ağır molekül bırakırdı; dağılımlı modelde tek bant 2<sup>−g</sup> konumuna kayardı.',
      formula: "melez = 2<sup>1−g</sup>, hafif = 1 − 2<sup>1−g</sup> (g ≥ 1)",
      formulaNote:
        "Yarı korunumlu modelin bant payları; sayfa bunları 03 sekmesinin formül kutusunda verir. g = 1'de tek melez bant, g = 2'de yarı melez yarı hafif, g = 3'te 25 % melez, 75 % hafif. Ders kitabı 1958 deneyinden yalnız bantların konumunu aktarır; sayfadaki paylar modelin hesabıdır.",
    },
    {
      heading: "Çatalda çalışan ekip",
      body: "Replikasyon tek bir enzimin değil, bir makinenin işidir. <strong>Helikaz</strong> hidrojen bağlarını kopararak iki ipliği ayırır; açılan Y biçimli bölgeye <strong>replikasyon çatalı</strong> denir. Tek kalan iplikleri <strong>tek iplik bağlayıcı proteinler</strong> yeniden sarılmasın diye tutar. Çatalın önünde biriken burulmayı <strong>topoizomeraz</strong> gevşetir. <strong>Primaz</strong>, kalıba 5–10 nükleotitlik kısa bir RNA parçası (<strong>primer</strong>) yazar; çünkü polimeraz boşa başlayamaz, uzatacak bir 3′ ucu ister. Sonra <strong>DNA polimeraz</strong> (bakteride Pol III) primeri uzatır. Bir Okazaki parçası bitince <strong>DNA polimeraz I</strong>, bu parçanın 3′ ucundan devam ederek önündeki parçanın RNA primerini söker ve yerine DNA yazar; <strong>ligaz</strong> da kalan çentiği kapatır.",
      formula: "Helikaz → tek iplik bağlayıcı → primaz → Pol III → Pol I → ligaz",
      formulaNote:
        "Çatalda iş sırası. 02 sekmesinde helikaz turuncu okla, Pol III dairelerle, primerler morla, kapatılmamış çentikler kırmızı çizgiyle görünür. Tek iplik bağlayıcı proteinler, topoizomeraz ve kayan kıskaç çizilmez.",
    },
    {
      heading: "Yön sorunu: öncü ve geciken iplik",
      body: "Polimeraz yeni nükleotidi yalnızca büyüyen zincirin serbest 3′-OH ucuna ekler; yani her yeni iplik 5′→3′ yönünde uzar ve kalıbını 3′→5′ okur. İki kalıp antiparalel olduğu için bu yön bir kalıpta çatalla aynı, ötekinde çatalın tersidir. Sayfadaki çatal soldan sağa açılır. Alt kalıp solda 3′ ile başladığı için onun karşısındaki yeni iplik 5′ ucu solda, 3′ ucu çatala dönük olarak kesintisiz uzar: <strong>öncü iplik</strong>. Üst kalıp solda 5′ ile başlar; karşısındaki yeni iplik 5′→3′ yazılabilmek için sola, çatalın tersine büyümek zorundadır. Çatal ℓ kadar tek iplik açtıkça primaz yeni bir primer koyar ve polimeraz oradan geriye doğru yazar: <strong>geciken iplik</strong>, kısa <strong>Okazaki parçaları</strong> hâlinde. L uzunluğunda bir bölgede ⌈L/ℓ⌉ parça ve bir fazlası kadar primer gerekir; parça sayısı hızdan bağımsızdır. Okazaki parçaları bakteride 1000–2000, insan hücresinde 100–200 nükleotit uzunluğundadır; sayfa ℓ = 1000 nt'yi öğretim değeri olarak kullanır.",
      formula: "Yeni nükleotit yalnız serbest 3′-OH ucuna eklenir",
      formulaNote:
        "Gelen nükleotit üç fosfatlıdır (dATP, dGTP…); iki fosfatı koparken açığa çıkan enerji yeni bağı kurar. Neden hep bu yön? Enerji gelen nükleotitte taşındığı için, düzeltme okuması yanlış harfi söktüğünde zincirin ucu uzatılmaya hazır kalır. Ters yönde yazan bir enzim, her düzeltmede enerji kaynağını da kesip atardı.",
    },
    {
      heading: "Hata, düzeltme ve Poisson sayımı",
      body: "Polimeraz hızlıdır ama kusursuz değildir. Eklediği nükleotidi hemen kontrol eden bir <strong>düzeltme okuması</strong> vardır: yanlış eşleşmeyi hisseder, geri gider ve 3′→5′ yönünde söker. Replikasyondan sonra devreye giren <strong>yanlış eşleşme onarımı</strong> yeni iplikteki kalan hataların çoğunu temizler. Sayfa bunları öğretim değerleriyle çarpar: polimeraz tek başına baz başına 10⁻⁵, düzeltme ve onarım her biri 100 kat; toplam p = 10⁻⁹. Bu sayılar büyüklük mertebesidir ve enzime, canlıya göre değişir. Sayım tarafı ise kesindir: G baz, her biri bağımsız ve küçük p olasılıkla yanlış kopyalanırsa kopya başına hata sayısı binom dağılır; p küçük, G büyük olduğunda bu dağılım ortalaması E = pG olan <strong>Poisson dağılımına</strong> yaklaşır. Poisson'da varyans ortalamaya eşittir ve hiç hata olmama olasılığı e<sup>−E</sup>'dir.",
      formula: "E = p·G · P(k hata) ≈ Eᵏ e<sup>−E</sup> / k!",
      formulaNote:
        "p = 10⁻⁵ × 10⁻² × 10⁻² = 10⁻⁹ (öğretim değerleri). E. coli'de E = 0.0046, hatasız kopya payı e<sup>−0.0046</sup> ≈ 99.5 %; 6×10⁹ bazlık insan hücresinde E = 6, hatasız kopya payı yalnız 0.2 %.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir ve her sekmede simülasyonun saydığı değer, formülün verdiği değerin yanında durur. <strong>01 · Çift sarmal</strong>: üst ipliği 5′ ucundan 3′ ucuna yazarsın (ya da hazır düğmelerden birini seçersin); sayfa alt ipliği, ters tamamlayıcıyı, hidrojen bağlarını, Chargaff oranlarını, uzunluğu (N × 0.34 nm), tur sayısını (N / 10) ve iki kaba erime sıcaklığı kuralını gösterir. <strong>02 · Replikasyon çatalı</strong>: soldan sağa açılan tek bir çatal; kaydırıcılar <strong>Kopyalanan bölge L</strong>, <strong>Okazaki parçası boyu ℓ</strong>, <strong>Çatal hızı v</strong> ve <strong>RNA primeri boyu</strong>dur. <strong>Başlat</strong> gerçek zamanda oynatır, <strong>Sonuna kadar hesapla</strong> sonuca atlar. <strong>03 · Yarı korunumlu: Meselson–Stahl</strong>: <strong>Kopyalama modeli</strong> menüsü ve <strong>¹⁴N besiyerinde geçen nesil</strong> kaydırıcısıyla beş santrifüj tüpünü ve seçili neslin profilini görürsün; yoğunluk göreli ölçektedir (0 hafif, 1 ağır). <strong>04 · Hata ve onarım</strong>: hata oranını, düzeltme okumasını, onarımı ve genomu seçip binlerce kopyadaki hata sayısını Poisson dağılımıyla karşılaştırırsın; altta 30 bazlık bir okuma çerçevesinde mutasyon yaparsın. Hata oranları, Okazaki boyu ve erime sıcaklığı kuralları öğretim değerleridir; sayfa bunu her yerde söyler.",
    experiments: [
      {
        title: "Chargaff yalnız çift iplikte geçerli",
        predict:
          "Yalnız A ve T'den oluşan 20 bazlık bir dizide üst iplikte A sayısı T'ye eşit olmak zorunda mı? Aynı uzunlukta yalnız G ve C'den oluşan bir dizi kaç hidrojen bağı fazla taşır, erime sıcaklığı kaç derece yükselir?",
        do: "01 · Çift sarmal sekmesinde <strong>Yalnız A ve T (20)</strong> düğmesine bas. \"Yalnız üst iplikte A/T ve G/C\", \"Chargaff oranı A/T ve G/C (çift iplik)\", hidrojen bağı ve iki erime sıcaklığı kartını not et. Sonra <strong>Yalnız G ve C (20)</strong> düğmesine bas ve aynı kartlara bak. En son <strong>GAATTC (EcoRI)</strong> düğmesine bas; alt ipliğin kendi 5′ ucundan okunuşunu ve durum satırını oku.",
        observe:
          "A–T dizisinde tek iplik \"A/T = 1.222\" (üstte 11 A, 9 T), çift iplik \"A/T = 1.000\"; hidrojen bağı 40; GC formülü 31.3 °C, Wallace kuralı gri ve \"40.0 °C (geçerli değil: N ≥ 14)\". G–C dizisinde hidrojen bağı 60, GC formülü 72.3 °C, Wallace \"80.0 °C (geçerli değil: N ≥ 14)\". GAATTC'de ters tamamlayıcı \"5′-GAATTC-3′\", durum satırı dizinin palindrom olduğunu söyler, Wallace 16.0 °C; GC formülü kartında ise sayı yerine \"— (geçerli değil: N < 14; formül burada eksi değer verir)\" yazar.",
        explain:
          "Chargaff kuralı bir dizinin değil, eşleşmenin sonucudur: her A'nın karşısında bir T durduğu için çift iplikte oran her dizide tam 1'dir, tek iplikte ise hiçbir zorunluluk yoktur. 20 çiftin her biri A–T'den G–C'ye geçince bir bağ kazanır: 60 − 40 = 20. GC formülünde N = 20'de 20 G+C, 41·20/20 = 41 °C ekler: 72.3 − 31.3 = 41.0. Bu bir kaba kuraldır; gerçek erime sıcaklığı tuz ve derişimle değişir, G–C kararlılığının asıl kaynağı da baz istiflenmesidir. GAATTC'nin ters tamamlayıcısı kendisidir; EcoRI kesim enzimi tam bu altı bazı tanır.",
      },
      {
        title: "Parça sayısı L/ℓ'ye bağlı, hıza değil",
        predict:
          "L = 10000 nt, ℓ = 300 nt iken kaç Okazaki parçası, kaç primer gerekir? Çatal hızını 1000 nt/s'den 100 nt/s'ye indirirsen parça sayısı mı değişir, süre mi?",
        do: "02 · Replikasyon çatalı sekmesinde <strong>Okazaki parçası boyu ℓ</strong> kaydırıcısını 300 nt'ye getir ve <strong>Sonuna kadar hesapla</strong>'ya bas. Kartları ve durum satırını not et. Sonra <strong>Çatal hızı v</strong>'yi 100 nt/s yap (ayar deneyi baştan başlatır) ve yeniden <strong>Sonuna kadar hesapla</strong>. En son <strong>Geciken ipliği çatal yönünde yazmayı dene</strong> düğmesine bas.",
        observe:
          "v = 1000 nt/s'de Okazaki parçası \"34\", formül \"34\"; primer \"35\" / \"35\"; ortalama parça boyu \"300.0 nt (ℓ = 300)\"; çatal \"10.00 s\" (L / v \"10.00 s\"); durum satırına göre geciken iplik 10.21 s anında tamamen dikilir ve iki RNA primeri kalır. v = 100 nt/s'de parça yine \"34\", primer \"35\"; çatal \"100 s\", geciken iplik 102 s'de biter. Son düğme \"Olmaz\" diye başlayan bir uyarı verir: DNA polimeraz yalnız serbest 3′-OH ucuna ekleyebilir.",
        explain:
          "⌈10000 / 300⌉ = ⌈33.3⌉ = 34: 33 tam parça ve 100 nt'lik kısa bir son parça. Primer sayısı parça sayısı artı öncü ipliğin tek primeridir. Hız yalnız zaman ölçeğini değiştirir: her süre 10 katına çıkar, sayılar aynı kalır. Bitişteki gecikmenin kaynağı sondan bir önceki tam parçadır: çatal 9900 nt'deyken (9.90 s) başlar, 300 nt'yi 0.30 s'de yazar, Pol I 10 nt'lik primeri 0.01 s'de söker: 10.21 s. Bu, sayfanın verdiği üst sınırın, (ℓ + primer)/v = 0.31 s'nin içindedir. Geciken iplik çatal yönünde yazılsaydı 3′→5′, yani zincirin 5′ ucuna eklenerek yazılırdı; böyle bir polimeraz yoktur.",
      },
      {
        title: "Meselson–Stahl: hangi model iki nesle dayanır?",
        predict:
          "Korunumlu model birinci nesilde kaç bant verir? Dağılımlı model birinci nesli geçerse ikinci nesilde ne olur? Önce <strong>Senin kararın</strong> menüsünden bir model seç.",
        do: "03 sekmesinde <strong>Kopyalama modeli</strong>'ni Korunumlu yap, nesil 1'de bant kartlarını ve \"1958 gözlemiyle\" kartını oku. Dağılımlı'ya geç; 1. nesle, sonra <strong>Bir nesil daha</strong> ile 2. nesle bak. Yarı korunumlu modeli 2. nesilde dene. Son olarak <strong>İplikleri ayırarak ölç</strong> kutusunu aç ve yarı korunumlu ile dağılımlı modelleri 1. nesilde karşılaştır.",
        observe:
          "Korunumlu, 1. nesil: \"1.000 (ağır) · 50.0 % | 0.000 (hafif) · 50.0 %\", \"uymuyor\". Dağılımlı, 1. nesil: \"0.500 (melez) · 100.0 %\", \"uyuyor\"; 2. nesil: \"0.250 (arada) · 100.0 %\", \"uymuyor\". Yarı korunumlu, 2. nesil: \"0.500 (melez) · 50.0 % | 0.000 (hafif) · 50.0 %\", \"uyuyor\". İplikler ayrılınca yarı korunumlu 1. nesil \"1.000 (ağır) · 50.0 % | 0.000 (hafif) · 50.0 %\" verir, dağılımlı tek bant 0.500'de kalır; gözlem kartı \"1958 gözlemi çift iplik içindir\" der.",
        explain:
          "Birinci nesil yalnız korunumlu modeli eler: yarı korunumlu ve dağılımlı modelde her molekülün yarısı ağırdır, ikisi de tek melez bant verir. Ayrımı ikinci nesil yapar: yarı korunumlu modelde melez bant durur ve yanına hafif bant eklenir (1958'de görülen budur), dağılımlı modelde tek bant dörtte bir konumuna kayar. Kaynak bantların konumunu verir; kartlardaki 50.0 % gibi paylar modelin 2<sup>1−g</sup> hesabıdır, 1958 ölçümünün bir değeri değil. İplik ayırma kutusu bir düşünce deneyidir: eski ipliklerin bölünmeden durduğunu birinci nesilde gösterirdi.",
      },
      {
        title: "Milyarda bir neden yeter, bir baz neyi bozar?",
        predict:
          "Baz başına 10⁻⁹ hata ile insan hücresinin 6×10⁹ bazında kopya başına kaç hata beklersin? Kopyaların ne kadarı hatasız çıkar? Düzeltme okumasını kapatırsan sayı kaç kat artar?",
        do: "04 sekmesinde <strong>Genom</strong> menüsünü \"İnsan hücresi, S evresi, 6×10⁹ bç\" yap. Sonra <strong>Düzeltme okuması</strong>'nı kapat; ardından <strong>Yanlış eşleşme onarımı</strong>'nı da kapat. Mutasyon bölümünde <strong>Tür</strong>'ü Ekleme yap, <strong>Konum</strong> 4'te önce 1, sonra 3 baz ekle. Sonra Yerine geçme'ye dön ve konum 10'da yeni baz C seç. En son konum 3'te yeni baz A seç.",
        observe:
          "İki koruma da açıkken E \"6.00 hata / kopya\", ölçülen \"6.11\", varyans/ortalama \"1.041\", hatasız kopya \"0.2 % (2 / 1000)\". Düzeltme kapalı: E \"600\", ölçülen \"600\". İkisi de kapalı: E \"60000\", ölçülen \"60043\" ve kopya sayısı 49'a iner (toplam hata sınırı). 1 baz ekleme: \"çerçeve kayması\", \"8 / 10 konum\", \"9 → 5 amino asit\". 3 baz: \"çerçeve içi ekleme\", \"9 → 10 amino asit\". Konum 10, C: \"yanlış anlamlı\" ve geçiş; 4. kodon TGG → CGG, Trp yerine Arg. Konum 3, A: ATG → ATA, \"başlangıç kodonu kayboldu\".",
        explain:
          "E = pG = 10⁻⁹ × 6×10⁹ = 6; Poisson'da hiç hata olmama olasılığı e<sup>−6</sup> ≈ 0.25 %, yani sayfanın gösterdiği 0.2 %. Her koruma 100 kat kazandırdığı için ikisi birlikte 10⁴ kat fark yaratır. Varyansın ortalamaya oranının 1'e yakın çıkması, hataların bağımsız olduğu bir modelin imzasıdır. Okuma çerçevesinde bir baz eklemek o noktadan sonraki bütün üçlüleri kaydırır; üç baz eklemek ise bir kodon ekler, çerçeveyi korur. T → C bir pirimidinden ötekine geçiştir. ATG ise başlangıç işaretidir ve Met'in başka kodonu yoktur: ilk üç bazdaki her yerine geçme bu işareti siler.",
      },
    ],
  },
  wow: [
    {
      title: "Her hücrede iki metre",
      body: "İnsan hücresindeki 6.2 milyar baz çiftinin her biri 0.34 nanometre yer kaplar; ucuca eklersen yaklaşık 2.1 metre DNA eder. Bu ip, çapı yalnız birkaç mikrometre (milimetrenin yüzde birinden az) olan bir çekirdeğe sığar ve her bölünmeden önce baştan sona kopyalanır. Çözeltideki sarmal yaklaşık 10.5 baz çiftinde bir tam tur attığı için bir insan hücresinin DNA'sı yaklaşık 590 milyon tur döner; sayfanın kullandığı ders kitabı değeriyle (turda 10 baz çifti) bu 620 milyon olurdu.",
    },
    {
      title: "Saniyede bin harf, saniyede yüz tur",
      body: "<em>E. coli</em>'de bir replikasyon çatalı saniyede yaklaşık 1000 baz çifti ilerler; çataldaki iki polimerazın her biri saniyede 1000 kadar nükleotit ekler. Sarmal 10.5 baz çiftinde bir döndüğü için her saniye yaklaşık 95 tur çözülür. Topoizomeraz olmasaydı çatalın önündeki DNA ya dakikada 5700 devirle, bir çamaşır makinesinin sıkma devrinden kat kat hızlı dönmek ya da kurulan bir yay gibi gittikçe burulmak zorunda kalırdı. 4.6 milyon baz çiftlik kromozom iki çatalla yaklaşık 40 dakikada kopyalanır; ama bakteri iyi koşullarda 20 dakikada bölünür. Çözüm: bir kopyalama turu bitmeden bir sonrakini başlatır.",
    },
    {
      title: "Bir tüpte bir milyar kopya",
      body: "1983'te Kary Mullis, replikasyonu tüpe taşıyan <strong>polimeraz zincir tepkimesini</strong> (PCR) tasarladı; 1993'te Nobel Kimya Ödülü'nü aldı. Numune ısıtılınca iplikler ayrılır, soğuyunca primerler bağlanır, polimeraz eksik ipliği tamamlar; her döngüde hedef DNA ideal olarak iki katına çıkar. Tek bir molekülden başlayan 30 döngünün sonunda 2³⁰ ≈ 1.07 milyar kopya olur. Yöntemi pratik yapan enzim, Yellowstone kaplıcalarında yaşayan <em>Thermus aquaticus</em> bakterisinin polimerazıdır (Taq). 95 °C'de yarı ömrü yaklaşık 40 dakika olduğu için döngülerdeki kısa ısıtmalara defalarca dayanır. Pandemideki testler RT-PCR'dı: virüsün RNA'sı önce DNA'ya çevrilir, sonra bu döngüyle çoğaltılırdı.",
    },
  ],
  worked: {
    title: "Bir bakteri kromozomunun bütçesi: süre, parça, primer, hata",
    prompt:
      "<em>E. coli</em>'nin halka kromozomu yaklaşık 4.6×10⁶ baz çifti (bç) taşır. Kopyalama tek bir başlangıç noktasından iki yöne ilerler; her çatal saniyede yaklaşık 1000 nükleotit açar (OpenStax Biology 2e, 14.4). Okazaki parçası boyunu ℓ = 1000 nt, baz başına hata oranını p = 10⁻⁹ al (ikisi de öğretim değeri). (a) Kopyalama kaç dakika sürer? (b) Kaç Okazaki parçası ve primer gerekir? (c) Bir yavru kromozomda kaç yeni hata beklenir, kopyaların ne kadarı hatasızdır? Onarım olmasaydı?",
    steps: [
      "(a) Çatallar zıt yönde ilerler ve halkanın yarısını, 2.3×10⁶ nt'yi açtıklarında karşılaşırlar. Süre = 2.3×10⁶ nt ÷ 1000 nt/s = 2300 s ≈ 38 dakika. Ölçülen değer de yaklaşık 40 dakikadır.",
      "(b) Her çatalın geciken ipliği kendi yarısında ⌈2.3×10⁶ / 1000⌉ = 2300 parça ister; iki çatal 4600 parça. Her parçaya bir primer, iki öncü ipliğin her birine birer primer: yaklaşık 4602 primer. Hepsi sonradan Pol I ile DNA'ya çevrilir ve ligaz yaklaşık 4600 çentik kapatır. Hız bu sayıları değiştirmez; yalnız ℓ değiştirir.",
      "(c) Her yavru molekülün bir ipliği yenidir, yani G = 4.6×10⁶ yeni nükleotit. E = pG = 10⁻⁹ × 4.6×10⁶ = 0.0046 hata/kopya. Poisson'a göre hatasız kopya olasılığı e<sup>−0.0046</sup> ≈ 0.9954, yani yaklaşık 99.5 %: kabaca her 200 kopyadan biri tek bir yeni hata taşır.",
      "Onarım kapalıyken p = 10⁻⁵ × 10⁻² = 10⁻⁷, E = 0.46 ve hatasız kopya payı e<sup>−0.46</sup> ≈ 63 %: üç kopyadan biri hatalı çıkar. Yüz kat daha yüksek oran, hatasız kopya payını 99.5 %'ten 63 %'e indirir.",
      "Sayfada sına: 02 sekmesinde L'yi en büyük değere, 20000 nt'ye getir (ℓ = 1000, v = 1000): Okazaki parçası \"20\", primer \"21\", çatal \"20.00 s\" ve geciken iplik 21.01 s'de biter; bir çatalın kromozomdaki işi bunun 2.3×10⁶ / 20000 = 115 katıdır. 04 sekmesinde E. coli seçiliyken E \"0.00460 hata / kopya\", Poisson e<sup>−E</sup> \"99.5 %\"; onarımı kapatınca \"0.460\" ve \"63.1 %\" (ölçülen \"62.4 %\").",
    ],
    result:
      "Yaklaşık 38 dakika, 4600 Okazaki parçası ve 4602 primer; kopya başına 0.0046 hata, yani kopyaların 99.5 %'i hatasız. Onarım olmasaydı bu pay 63 %'e düşerdi.",
  },
  misconceptions: [
    {
      myth: "Kopyalama fotokopi gibidir: sonunda bir orijinal, bir de yepyeni DNA molekülü olur.",
      truth:
        'Hiçbir eski iplik yok edilmez ama hiçbir molekül de olduğu gibi kalmaz: iki molekülün her biri bir eski, bir yeni iplik taşır. Meselson–Stahl deneyinde bir nesil sonra tek bir "orta ağırlıkta" bant görülmesi bunu gösterir. Fotokopi (korunumlu) model doğru olsaydı bir ağır, bir hafif bant çıkardı; 03 sekmesinde Korunumlu modeli 1. nesilde seçince bu iki bant görünür.',
    },
    {
      myth: "Chargaff kuralı her DNA ipliğinde geçerlidir: bir iplikte de A sayısı T'ye eşittir.",
      truth:
        "Kural yalnız çift iplikte geçerlidir, çünkü her A'nın karşısında bir T durur. Tek bir iplikte oran herhangi bir şey olabilir: sayfanın varsayılan 12 bazlık dizisinde üst iplikte A/T = 1.333, G/C = 1.500, ama çift iplikte ikisi de 1.000.",
    },
    {
      myth: "DNA polimeraz kalıbı görür görmez kendi başına yazmaya başlar.",
      truth:
        "Polimeraz yalnızca var olan bir zincirin 3′ ucunu uzatabilir; boş kalıba ilk nükleotidi koyamaz. Bu yüzden primaz önce kısa bir RNA primeri yazar. Geciken iplikte her Okazaki parçası için yeni bir primer gerekir ve hepsi sonradan DNA ile değiştirilir; parça sayısı n ise primer sayısı n + 1'dir.",
    },
    {
      myth: "İki yeni iplik de çatalla aynı yönde, kesintisiz uzar.",
      truth:
        "Yalnız öncü iplik öyle yapılır. Kalıplar antiparalel ve polimeraz yalnız 5′→3′ yazdığı için geciken iplik çatalın tersine, kısa parçalar hâlinde sentezlenir; parçaları ligaz birleştirir. 02 sekmesinde geciken parçaların okları sola, öncü ipliğin polimerazı sağa bakar.",
    },
  ],
  glossary: [
    {
      term: "Nükleotit",
      definition:
        "DNA'nın yapı taşı: bir şeker (deoksiriboz), bir fosfat ve dört bazdan biri (A, T, G, C).",
    },
    {
      term: "Tamamlayıcı baz eşleşmesi",
      definition:
        "A'nın yalnız T ile, G'nin yalnız C ile hidrojen bağı kurması; bir ipliğin dizisi ötekini belirler.",
    },
    {
      term: "Antiparalel",
      definition:
        "İki ipliğin zıt yönde uzanması: biri 5′→3′ giderken öteki 3′→5′ gider.",
    },
    {
      term: "Replikasyon çatalı",
      definition:
        "Helikazın iki ipliği ayırdığı Y biçimli bölge; sentez burada, iki yeni iplik üzerinde birlikte ilerler.",
    },
    {
      term: "Primer",
      definition:
        "Primazın kalıba yazdığı 5–10 nükleotitlik RNA parçası; polimerazın uzatacağı 3′ ucunu sağlar.",
    },
    {
      term: "Öncü ve geciken iplik",
      definition:
        "Çatal yönünde kesintisiz yapılan iplik öncü, ters yönde parçalar hâlinde yapılan iplik gecikendir.",
    },
    {
      term: "Okazaki parçası",
      definition:
        "Geciken iplikte sentezlenen kısa DNA parçası; bakteride 1000–2000, ökaryotta 100–200 nükleotit.",
    },
    {
      term: "Çerçeve kayması",
      definition:
        "Üçün katı olmayan sayıda baz eklenmesi ya da silinmesiyle o noktadan sonraki bütün kodonların değişmesi.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      'Lisede replikasyon bir enzim listesidir; üniversitede bir <strong>makine</strong>: helikaz, primaz, iki ya da üç polimeraz ve kıskaç proteinleri tek bir <em>replizom</em> olarak birlikte hareket eder. Halka biçimli <strong>kayar kıskaç</strong> polimerazı DNA\'ya bağlı tutar; enzimin kalıptan düşmeden kaç nükleotit yazabildiğine <em>işlemsellik</em> denir ve bu sayı kıskaçsız polimeraz için onlarla, kıskaçlıyken binlerle, hatta on binlerle ölçülür. Ökaryotlarda başlangıç noktaları hücre döngüsünün G1 evresinde "lisanslanır" ve S evresinde en fazla bir kez ateşlenir. Bu kontrol bozulursa bazı bölgeler iki kez kopyalanır; böyle bir genom kararsızlığı kanser biyolojisinin önemli konularından biridir. 04 sekmesindeki hesap da bir derse açılır: bağımsız, nadir olayların sayımı olasılık dersindeki Poisson dağılımıdır ve mutasyon oranlarının ölçülmesi genetikte bu dille yapılır.',
      "Doğrusal kromozomların bir de uç sorunu vardır. Sökülen primerin yerini dolduran polimeraz (bakteride Pol I) bunu ancak komşu bir DNA parçasının 3′ ucunu uzatarak yapabilir; geciken ipliğin en ucundaki primerin ötesinde böyle bir parça yoktur. 02 sekmesinde pencerenin sağ ucunda sökülmeden kalan primer bu durumu andırır. Bu yüzden kromozom her bölünmede biraz kısalır. Uçlardaki <strong>telomerler</strong>, insanda TTAGGG dizisinin binlerce kez tekrarından oluşan tamponlardır; üreme hücreleri ve kök hücreler bu tamponu <strong>telomeraz</strong> enzimiyle yeniden uzatır. Elizabeth Blackburn, Carol Greider ve Jack Szostak bu buluşla 2009 Nobel Tıp Ödülü'nü aldı. Halka biçimli bakteri kromozomunda uç olmadığı için bu sorun da yoktur. Aynı polimeraz kimyası laboratuvarda PCR, DNA dizileme ve adli tıp olarak karşına çıkar.",
    ],
    topics: [
      "Moleküler Biyoloji: replizom ve kayar kıskaç",
      "Biyokimya: enzim kinetiği ve işlemsellik",
      "Hücre Biyolojisi: hücre döngüsü ve başlangıç lisanslama",
      "Telomerler ve telomeraz",
      "Genetik: DNA onarım yolları ve mutasyon oranı",
      "Olasılık ve İstatistik: binom ve Poisson dağılımı",
      "PCR ve DNA dizileme",
    ],
  },
  quiz: [
    {
      question:
        "Yarı korunumlu kopyalamada ¹⁵N'den ¹⁴N'ye aktarılan bir kültürde 3. nesilden sonra çift iplikli DNA nasıl dağılır?",
      options: [
        "50 % melez, 50 % hafif",
        "25 % melez, 75 % hafif",
        "Tek bant, 0.125 göreli yoğunlukta",
        "12.5 % ağır, 87.5 % hafif",
      ],
      answer: 1,
      explanation:
        "Başlangıçtaki her molekülün iki eski ipliği hiç bölünmeden iki ayrı molekülde kalır. 3 nesil sonra her başlangıç molekülünden 2³ = 8 molekül vardır ve bunların 2'si melezdir: 2/8 = 2<sup>1−3</sup> = 25 %. Gerisi tamamen hafiftir. Tek bant 0.125'te dağılımlı modelin, ağır + hafif ise korunumlu modelin cevabıdır. 03 sekmesinde Yarı korunumlu, 3. nesil \"0.500 (melez) · 25.0 % | 0.000 (hafif) · 75.0 %\" gösterir.",
    },
    {
      question:
        "L = 10000 nt, ℓ = 1000 nt, v = 1000 nt/s iken çatal 10 parça ve 10 s verir. Hem ℓ'yi hem v'yi yarıya indirirsen (ℓ = 500 nt, v = 500 nt/s) ne olur?",
      options: [
        "10 parça, 10 s",
        "20 parça, 10 s",
        "20 parça, 20 s",
        "10 parça, 20 s",
      ],
      answer: 2,
      explanation:
        "Parça sayısı yalnız L/ℓ'ye bağlıdır: ⌈10000/500⌉ = 20. Süre yalnız L/v'ye bağlıdır: 10000/500 = 20 s. İki değişikliğin etkisi birbirine karışmaz. Sayfada denersen parça \"20\", çatal \"20.00 s\" görürsün; geciken iplik 21.02 s'de, yani en çok (ℓ + primer)/v = 1.02 s sonra biter.",
    },
    {
      question:
        "Baz başına toplam hata oranı 10⁻⁹ iken 3×10⁹ bazlık haploit insan genomunun kopyalarının yaklaşık ne kadarı hiç hata taşımaz?",
      options: [
        "Yaklaşık 95 %",
        "Yaklaşık 37 %",
        "Yaklaşık 5 %",
        "Hiçbiri; her kopyada tam 3 hata olur",
      ],
      answer: 2,
      explanation:
        "Beklenen hata E = pG = 10⁻⁹ × 3×10⁹ = 3. Hatalar bağımsız ve nadir olduğu için sayıları Poisson dağılır; hiç hata olmama olasılığı e<sup>−3</sup> ≈ 0.050. 37 % e<sup>−1</sup>'dir, yani E = 1 için geçerlidir. Ortalama 3 olsa da her kopyada tam 3 hata yoktur: sayı kopyadan kopyaya değişir. 04 sekmesinde haploit insan genomu e<sup>−E</sup> = \"5.0 %\", ölçülen \"4.8 % (48 / 1000)\" verir.",
    },
  ],
  next: [
    {
      href: "mitoz-mayoz.html",
      title: "Mitoz ve Mayoz Laboratuvarı",
      why: "Kopyalanan DNA'nın sonra ne olduğunu izle: hücreyi mitozla ve mayozla bölerken DNA miktarını ve kromozom sayısını evre evre say, dört gametin bileşimini ve ayrılmamanın etkisini gör.",
    },
    {
      href: "gen-ifadesi-ve-molekuler-biyoloji.html",
      title: "Gen İfadesi ve Moleküler Bilgi Akışı",
      why: "Kopyalanan genler nasıl okunur? DNA'dan RNA'ya ve proteine bilgi akışını, promotörleri ve RNA işlenmesini oku; laboratuvarında transkripsiyon, translasyon ve yıkım hızlarını değiştirip mRNA ile proteinin yeni dengeye yaklaşmasını izle.",
    },
    {
      href: "dogal-secilim.html",
      title: "Doğal Seçilim: Popülasyon Genetiği Laboratuvarı",
      why: "Kopyalama hatalarının uzun vadede ne yaptığını gör: Hardy–Weinberg dengesi, seçilim, genetik sürüklenme ve göç–mutasyon sekmeleriyle alel sıklıklarının nesiller boyu değişimini ölç.",
    },
    {
      href: "enzim-kinetigi.html",
      title: "Enzim Kinetiği Laboratuvarı",
      why: "DNA polimeraz da bir enzimdir. Michaelis–Menten mekanizmasını çöz, K<sub>M</sub> ile V<sub>max</sub>'ı kestir, inhibitör türlerini Lineweaver–Burk desenlerinden tanı.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Biology 2e, 14.3 Basics of DNA Replication",
      url: "https://openstax.org/books/biology-2e/pages/14-3-basics-of-dna-replication",
      note: "Üç replikasyon modeli ve Meselson–Stahl deneyi: birinci nesilde tek ara bant, ikinci nesilde ara ve hafif iki bant. Sayfanın diğer değerleri komşu bölümlerdedir: 14.2 (sarmal geometrisi), 14.5 (ökaryot hızı, insan genomu), 14.6 (onarım ve mutasyon türleri) (İngilizce, açık ders kitabı).",
    },
    {
      title: "Wikipedia · Meselson–Stahl experiment",
      url: "https://en.wikipedia.org/wiki/Meselson%E2%80%93Stahl_experiment",
      note: "Deneyin düzeneği, bant fotoğrafları ve üç modelin nasıl elendiği.",
    },
    {
      title: "OpenStax · Biology 2e, 14.4 DNA Replication in Prokaryotes",
      url: "https://openstax.org/books/biology-2e/pages/14-4-dna-replication-in-prokaryotes",
      note: "E. coli'nin 4.6 milyon baz çiftlik kromozomu, saniyede yaklaşık 1000 nükleotit, 5–10 nükleotitlik primer ve çataldaki enzimlerin görevleri (İngilizce, açık ders kitabı).",
    },
    {
      title: "Vikipedi · DNA replikasyonu",
      url: "https://tr.wikipedia.org/wiki/DNA_replikasyonu",
      note: "Türkçe terimler, enzimler ve prokaryot–ökaryot farkları için başlangıç noktası.",
    },
  ],
  revision: "Kasım 2026",
};
