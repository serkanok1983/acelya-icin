window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kirinim-izgarasi"] = {
  slug: "kirinim-izgarasi",
  title: "Kırınım Izgarası: Işığın Parmak İzini Okuyan Çizgiler",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir CD'deki gökkuşağından Güneş'te bulunan helyuma: binlerce eş yarık ışığı renklerine ayırır, parlak tepeleri 1/N oranında inceltir ve hidrojenin tayfında protonun kütlesini bile fark ettirir.",
  hook:
    "Bir CD'yi lambanın altında yavaşça eğ: boyasız yüzünde bir gökkuşağı kayar. Aynı ilke, sodyum lambasının tek bir sarı gibi görünen ışığını, dalga boyları binde bir farklı iki renge ayırır; bunun için milimetresinde 600 çizgi olan bir camın iki milimetrelik şeridi yeter. Yarık sayısı arttıkça ışık neden bu kadar keskinleşir?",
  bigIdea:
    "N eş yarıktan gelen dalgalar yalnız <em>d·sin θ = mλ</em> yönlerinde aynı fazda buluşur ve orada tepe tek yarığınkinin N² katı parlaklaşırken tepeden ilk karanlığa uzaklık sin θ cinsinden λ/(Nd)'ye iner; bu yüzden ızgara, aralarında Δλ olan iki rengi ancak <strong>mN ≥ λ/Δλ</strong> olduğunda ayırabilir.",
  story: [
    "Francis Hopkinson'ın Mart 1785'te dostu David Rittenhouse'a yazdığı mektuba göre, bir önceki yaz bir akşam Philadelphia'da kapısının önünde otururken ipek mendilini gerdi ve yaklaşık yüz yarda ötedeki bir sokak lambasına onun ardından baktı. İpliklerin kalın teller gibi büyüdüğünü bekliyordu; ama mendili sağa sola kaydırdığında koyu çubuklar yerinden kıpırdamadı. Gökbilimci ve alet yapımcısı Rittenhouse deneyi karanlık bir odada yeniden kurdu: bir saatçiye inçte 106 diş açılmış iki ince pirinç vida yaptırdı, dişlere 50–60 kıl yerleştirip yarım inçlik bir kare ızgara elde etti. Ortadaki renksiz çizginin iki yanında altışar renkli görüntü saydı ve renklerin prizmadakinin tersine dizildiğini not etti; yanıtı 1786'da Amerikan Felsefe Derneği'nin dergisinde yayımlandı. Izgarayı bir ölçü aletine dönüştüren ise Bavyeralı bir camcıydı. Joseph Fraunhofer, alev ışığındaki parlak sarı çizgiyi Güneş tayfında ararken 1814'te 574 karanlık çizgi saydı, en belirginlerine A, B, C, D… diye harfler verdi ve alevin çizgisinin Güneş'in karanlık D çizgisiyle aynı yerde durduğunu gördü. 1821'de ince tellerden ızgaralar yaptı ve tayf çizgilerinin dalga boyunu bir ızgarayla ölçen ilk kişi oldu. 1826'da 39 yaşında öldüğünde mezar taşına Latince 'yıldızları yaklaştırdı' yazıldı.",
    "Çizgilerin anlamını 1859'da Heidelberg'de Gustav Kirchhoff ile Robert Bunsen çözdü: her element alevde kendine özgü parlak çizgiler yayar ve daha sıcak bir kaynağın önünde dururken aynı çizgileri karanlık olarak soğurur. Güneş'in karanlık D çifti, Güneş atmosferindeki sodyumun imzasıydı. İkili, prizmalı spektroskoplarıyla 1860'ta Dürkheim maden suyunda iki mavi çizgiden sezyumu, 1861'de lepidolit mineralinde koyu kırmızı çizgilerden rubidyumu buldu; iki elementin adı da Latincede bu renkleri anlatır. 18 Ağustos 1868'deki tam Güneş tutulmasında, aralarında Hindistan'daki Jules Janssen'in de bulunduğu gözlemciler, Güneş'in kenarındaki çıkıntıların tayfında sodyumun D çizgilerine çok yakın, parlak sarı bir çizgi gördü. Norman Lockyer aynı yılın Ekim'inde çizgiyi İngiltere'den gözledi, ona D₃ adını verdi ve Dünya'da bilinmeyen bir elementten geldiğini öne sürdü: Yunanca Güneş'ten <strong>helyum</strong>. Kanıt 27 yıl bekledi: William Ramsay 1895'te uranyum minerali kleveitten çıkan gazda aynı sarı çizgiyi gördü.",
    "Ölçümün inceliği ızgaranın kalitesine bağlıydı ve 19. yüzyılın sonunda en iyileri Baltimore'dan çıktı. Johns Hopkins Üniversitesi'nde Henry Rowland, elmas uçla metal ya da cama on binlerce çizgiyi eşit aralıkla çizen son derece hassas bölme makineleri kurdu; içbükey ızgaralarını 1882'de tanıttı, 1888'de Güneş tayfının fotoğrafik haritasını, 1898'de Güneş dalga boyları tablosunu yayımladı. Bu arada Basel'de bir kız okulunda matematik öğreten 60 yaşındaki Johann Balmer, Anders Ångström'ün ölçtüğü dört hidrojen çizgisinin dalga boylarında bir düzen aradı ve 1885'te hepsinin tek bir sabitle, λ = B·n²/(n² − 4) biçiminde yazılabildiğini buldu; B yaklaşık 364.6 nm'dir. Formül n = 7 için 397.0 nm'de beşinci bir çizgi öngördü ve Basel'deki meslektaşı Eduard Hagenbach, Ångström'ün o yerde bir çizgi gözlemiş olduğunu haber verdi: sayfadaki Hε. Johannes Rydberg 1888–1890'da formülü dalga sayısıyla yeniden yazıp genelleştirdi. Formülün neden işlediğini 1913'te Niels Bohr'un atom modeli açıkladı: Rydberg sabiti elektronun kütlesi ve yükü, Planck sabiti ve ışık hızı gibi temel sabitlerden hesaplanabiliyordu.",
  ],
  core: [
    {
      heading: "N fazörün toplamı: tepeler neden 1/N ile incelir?",
      body:
        "Komşu iki yarıktan ekrandaki bir noktaya giden yollar d·sin θ kadar farklıdır; her yarığın dalgası bir öncekine göre φ = 2πd·sin θ/λ kadar faz kaymasıyla gelir. Her dalgayı karmaşık düzlemde bir ok, yani <strong>fazör</strong> olarak çiz ve N oku uç uca ekle. φ, 2π'nin tam katıyken bütün oklar aynı yöne bakar: genlik N kat, şiddet N² kat olur. φ biraz değişince zincir kıvrılır; N·φ = 2π olduğunda kapalı bir çokgene döner ve toplam sıfırdır. Bu ilk sıfır tepeden yalnız Δ(sin θ) = λ/(Nd) uzaktadır: yarık sayısı on katına çıkınca tepe on kat incelir. İki ana tepe arasında N − 1 sıfır ve N − 2 küçük <strong>ikincil maksimum</strong> vardır. Enerji korunur: tepe tek yarığınkinin N² katı yüksektir ama genişliği 1/N ile daralır; desenin altındaki toplam alan N ile, yani ızgaradan geçen ışıkla büyür.",
      formula: "I(θ) = I<sub>1</sub>(θ)·[sin(Nγ)/sin γ]²,  γ = φ/2 = πd·sin θ/λ",
      formulaNote: "I₁ tek yarığın o açıdaki şiddeti; γ = mπ'de köşeli parantez N²'ye gider. Sayfa şiddeti merkez tepeye, N²·I₁(0)'a böler.",
    },
    {
      heading: "Izgara denklemi, mertebeler ve renk sırası",
      body:
        "Ana tepelerin yeri yalnız d'ye ve λ'ya bağlıdır: d·sin θ = mλ. sin θ 1'i aşamayacağından en yüksek <strong>mertebe</strong> m<sub>max</sub> = ⌊d/λ⌋'dır. Milimetrede 600 çizgilik ızgarada d = 1.667 µm; He-Ne lazerinin 632.8 nm'si için θ₁ = 22.31°, θ₂ = 49.41°, m = 3 ise sin θ = 1.14 isteyeceği için yoktur. Açı λ ile büyür, bu yüzden kırmızı mordan çok sapar; prizmada sıra terstir. Denklemin türevi <strong>açısal dağıtımı</strong> verir: yüksek mertebe ve sık çizgi renkleri daha geniş açıya yayar. Beyaz ışıkta birinci mertebe temizdir (2 × 380 > 750 nm), ama ikinci mertebenin 570–750 nm kısmı üçüncünün 380–500 nm kısmıyla aynı açılara düşer, çünkü 2λ₂ = 3λ₃; spektrograflar bu yüzden mertebe ayırıcı süzgeç kullanır. Işık eğik gelirse sağ taraf aynı kalır, sol taraf d(sin θ<sub>m</sub> − sin θ<sub>i</sub>) olur.",
      formula: "d·sin θ = mλ  ·  dθ/dλ = m/(d·cos θ)",
      formulaNote: "m = 0, ±1, ±2, …; açılar ızgara normalinden ölçülür. dθ/dλ, iki yakın rengin kaç radyan ayrıldığını söyler.",
    },
    {
      heading: "Tek yarık zarfı ve kaybolan mertebeler",
      body:
        "Gerçek yarıkların bir genişliği a vardır ve her yarık ışığı tek yarık deseninin (sin β/β)² <strong>zarfı</strong> içinde yollar. Izgaranın deseni iki çarpanın çarpımıdır: N yarık tepelerin yerini ve inceliğini, zarf parlaklıklarını belirler. d/a bir tam sayıysa o mertebe zarfın sıfırına düşer ve kaybolur: sayfadaki d = 3a ayarında (d = 6.00 µm, a = 2.00 µm) m = ±3, ±6, ±9 yoktur. Zarfın eğimi bir iz daha bırakır: çarpımın tepeleri merkeze doğru çekilir. Sayfanın varsayılan ayarında (d = 5.00 µm, a = 1.50 µm, λ = 632.8 nm) N = 2'de birinci tepe 7.0462°'de, kuramın 7.2709°'sinden 3.09 % içeridedir; N = 10'da 7.2638°'dedir (−0.10 %). Kayma, zarfın eğiminin tepenin eğriliğine oranıdır ve eğrilik N² ile büyüdüğü için kabaca 1/N² ile söner. Sıfırlar ise ızgara çarpanının sıfırlarıdır, kıpırdamaz; Δ(sin θ) = λ/(Nd) bu yüzden tam çıkar.",
      formula: "I/I<sub>0</sub> = (sin β/β)²·[sin Nγ/(N sin γ)]²,  β = πa·sin θ/λ = (a/d)·γ",
      formulaNote: "d/a = p tam sayıysa m = ±p, ±2p, … kaybolur. N = 2 için bu, çift yarık sayfasındaki cos² × zarf deseninin kendisidir.",
    },
    {
      heading: "Çözme gücü: R = mN ve Rayleigh ölçütü",
      body:
        "λ ve λ + Δλ aynı mertebede biraz farklı açılara düşer. sin θ cinsinden iki tepenin aralığı mΔλ/d, her tepenin ilk sıfırına uzaklığı λ/(Nd)'dir. <strong>Rayleigh ölçütüne</strong> göre iki çizgi, birinin tepesi ötekinin ilk sıfırına düştüğünde ayrılmış sayılır: mΔλ/d = λ/(Nd), yani λ/Δλ = mN. d sadeleşti: <strong>çözme gücü</strong> çizgilerin sıklığına değil, ışığı alan çizgi sayısına ve mertebeye bağlıdır. Sodyumun D çifti için λ/Δλ = 986.4: birinci mertebede en az 987, ikincide 494 çizgi gerekir. Daha derin bir sınır da var: mN = Nd·sin θ/λ = W·sin θ/λ olduğundan dik gelişte çözme gücü, aydınlatılan genişliğin W kaç dalga boyu olduğunu aşamaz. Ölçüt bir uzlaşımdır: eşit parlaklıktaki iki çizgide sınırdaki çukur 19 % derinliktedir (8/π² = 0.81); D₂, D₁'den iki kat parlak olduğundan sayfada sınırdaki çukur yalnız 2 % civarındadır.",
      formula: "R = λ/Δλ = mN  ·  R ≤ W/λ (dik geliş)",
      formulaNote: "N ışık alan çizgi sayısı, W = Nd aydınlatılan genişlik. Sayfada 'Çözme gücü R = |m|·N' kartında okunur.",
    },
    {
      heading: "Balmer, Rydberg ve protonun kütlesi",
      body:
        "Hidrojenin görünür çizgileri, elektronun n = 3, 4, 5, … düzeylerinden n = 2'ye inişleridir ve dalga sayıları Rydberg formülüne uyar. Bohr modeli sabiti temel sabitlerden verir: R<sub>∞</sub> = mₑe⁴/(8ε₀²h³c) = 10 973 731.568 m⁻¹. Bu değer sonsuz ağır bir çekirdek içindir. Gerçekte proton da ortak kütle merkezi çevresinde döner; elektron kütlesinin yerine <strong>indirgenmiş kütle</strong> μ = mₑmₚ/(mₑ + mₚ) girer ve hidrojenin sabiti 0.054 % küçülür: R<sub>H</sub> = 10 967 758 m⁻¹. Bir tuzak daha var: ızgara havadaki dalga boyunu ölçer, formül vakumdakini ister. Hα'da havanın kırılma indisi 1.000276'dır; dönüşüm atlanırsa R 0.028 % büyük çıkar, indirgenmiş kütle etkisinin yarısı kadar. Sayfada 0.01°'lik ölçekle ölçülen bütün Balmer çizgileri R = 1.09672 × 10⁷ m⁻¹ verir: R<sub>H</sub>'den yalnız 0.005 %, R<sub>∞</sub>'dan 0.059 % uzak. Ölçüm protonun kütlesini görür.",
      formula: "1/λ<sub>vak</sub> = R<sub>H</sub>·(1/2² − 1/n²),  R<sub>H</sub> = R<sub>∞</sub>/(1 + mₑ/mₚ),  λ<sub>vak</sub> = n<sub>hava</sub>·λ<sub>hava</sub>",
      formulaNote: "n = 3, 4, 5, 6, 7 sırasıyla Hα, Hβ, Hγ, Hδ, Hε; mₑ/mₚ = 1/1836.15. Döteryumda çekirdek iki kat ağırdır ve bütün çizgiler 0.027 % kısalır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın üç sekmesi var; adresin sonuna <code>#desen</code>, <code>#spektrometre</code> ya da <code>#cd</code> ekleyerek doğrudan açabilirsin. <strong>Çok yarıklı desen</strong> sekmesinde yarık sayısını (N = 1–500), dalga boyunu, yarık aralığını d, yarık genişliğini a ve ekran uzaklığını kaydırıcılarla değiştirirsin; tablo, hesaplanan desenden bulunan tepe ve sıfırları kuramla yan yana koyar. <strong>Spektrometre</strong> sekmesinde lambayı (hidrojen, sodyum, cıva ya da beyaz ışık), geçirgen ızgarayı (100–1200 çizgi/mm) ve aydınlatılan genişlik W'yi seçer, dürbünü kaydırıcıyla, ±0.01°, ±0.1°, ±1° düğmeleriyle ya da sahnede sürükleyerek çevirirsin; okumaları Okumayı kaydet ya da Bütün çizgileri ölç düğmesiyle tabloya alırsın. <strong>CD, DVD ve Blu-ray</strong> sekmesinde iki imleçle duvardaki lekelerin arasını ölçersin. Her sekmenin Sıfırla düğmesi ya da <kbd>R</kbd> tuşu o sekmeyi varsayılana döndürür.",
    experiments: [
      {
        title: "İki yarıktan on yarığa",
        predict:
          "d = 5.00 µm ve λ = 632.8 nm iken N = 2'den N = 10'a geçince birinci ana maksimum yer değiştirir mi? Tepeden ilk sıfıra uzaklık Δ(sin θ) = λ/(Nd) kaç olur, iki ana tepe arasında kaç ikincil maksimum belirir?",
        do: "Desen sekmesinde Sıfırla'ya, sonra N = 2 düğmesine bas; grafik m = 0 ile m = 1 arasını gösterir. Tablodaki açı, Δ(sin θ) ve ikincil maksimum satırlarını oku. Ardından N = 10'a bas, Grafik aralığını 'Seçili ana maksimumun çevresi' yap ve tepenin daralışına bak.",
        observe:
          "Kuram iki durumda da θ₁ = 7.2709° der. N = 2'de ölçülen tepe 7.0462° (−3.09 %), Δ(sin θ) 0.063280, ikincil maksimum 0; N = 10'da 7.2638° (−0.10 %), Δ(sin θ) 0.012656, yani tam beş kat dar, ve 8 ikincil maksimum. İki durumda da Δ(sin θ) satırının farkı 0.00 %'dır; merkez tepe kartı N² = 4'ten 100'e çıkar.",
        explain:
          "Tepelerin yerini d belirler, N değil. N, fazör zincirinin ne çabuk kapandığını belirler: ilk sıfır Nφ = 2π'de, yani λ/(Nd)'dedir. Sıfırlar ızgara çarpanından geldiği için zarf onları kaydıramaz. Tepenin içeri kayması ise tek yarık zarfının eğiminden gelir ve tepe daraldıkça kabaca 1/N² ile söner: N = 100'de ölçülen açı 7.2708°'dir, kuramdan yalnız 0.0001° içeride.",
      },
      {
        title: "Sodyum çiftini ayır, sonra ölç",
        predict:
          "Na çiftinde λ/Δλ = 986.4. W = 2.00 mm'de (N = 1200) çift birinci mertebede ayrılır mı, ölçüt hangi W'de bozulur? Sınırda profildeki çukur, eşit parlak iki çizgideki gibi 19 % mu olur? 0.01°'lik ölçek Δλ = 0.597 nm'yi hangi mertebede daha doğru verir?",
        do: "Spektrometre sekmesinde Sıfırla'ya, sonra 'Na çifti, m = 1' düğmesine bas; 'Kıl çizgisinde' kartını ve durum satırını oku. Kıl çizgisini çizgiye hizala'ya bas, 'Tek okumadan λ' kartını not et; −0.01°'ye iki kez basıp öbür çizgiyi oku. W'yi 1.65 ve 1.64 mm yapıp her seferinde 'Na çifti, m = 1'e yeniden bas. Son olarak W = 2.00 mm'de 'Na çifti, m = 2'ye bas, hizala; +0.1°'ye bir kez basıp yeniden hizala.",
        observe:
          "W = 2.00 mm'de kart 'Na D₂ ile Na D₁ arası, m = +1' der; durum satırı R = 1200 ≥ 986.4 ve çukur %39.7 verir. Hizalama D₁'i 20.72°'de 589.67 nm, iki adım sonra D₂'yi 20.70°'de 589.12 nm okur: fark 0.55 nm, gerçeğinden %8 az. 1.65 mm'de ölçüt hâlâ 'çözülür', çukur yalnız %2.0; 1.64 mm'de kart 'Na D₂ + Na D₁, m = +1' ve 'çözülmemiş: tek çizgi gibi görünür' der. İkinci mertebede 588.95 ve 589.56 nm: fark 0.61 nm, sapma %2.",
        explain:
          "Rayleigh sınırı N = λ/(mΔλ)'dır: birinci mertebede 990 çizgi geçer, 984 geçemez. D₂, D₁'den iki kat parlak olduğundan sınırdaki çukur eşit çizgilerdeki 19 % değil, 2 % kadardır; ölçüt bir uzlaşımdır. Okumada asıl sınır ölçektir: birinci mertebedeki 0.022°'lik aralık 0.01°'lik adımlarla 0.02° okunur. İkinci mertebede açısal dağıtım m/(d·cos θ) 2.6 kat büyür, aralık 0.058°'ye çıkar ve aynı yuvarlama Δλ'yı yalnız %2 bozar.",
      },
      {
        title: "Rydberg sabiti ve protonun kütlesi",
        predict:
          "Hidrojen çizgilerinden bulunacak R, sonsuz ağır çekirdeğin R<sub>∞</sub> = 1.09737 × 10⁷ m⁻¹ değerine mi, indirgenmiş kütleli R<sub>H</sub> = 1.09678 × 10⁷ m⁻¹ değerine mi yakın çıkar? Fark yalnız 0.054 %; 0.01° okuyan bir ölçek bunu ayırabilir mi?",
        do: "Spektrometre sekmesinde Sıfırla'ya bas (hidrojen, 600 çizgi/mm, W = 2.00 mm) ve Bütün çizgileri ölç düğmesine bas. Kayıt tablosunu ve Rydberg tablosunu oku. Sonra Ölçeğin sıfırı kaymış kutusunu işaretle (kayıtlar silinir), yeniden ölç ve Hα satırına bak.",
        observe:
          "28 okuma ve sıfır okuması gelir: Hα iki, öbür dört çizgi üçer mertebede, her biri iki yandan. Hα, m = 1: θ = 23.190°, λ = 656.30 nm, NIST'ten +0.003 %. Rydberg tablosu R = 1.09672 × 10⁷ m⁻¹ gösterir: R<sub>H</sub>'den −0.005 %, R<sub>∞</sub>'dan −0.059 %. Sıfır hatasıyla Hα okumaları +23.49° ve −22.89° olur, ama θ ve R hiç değişmez.",
        explain:
          "Ölçüm R<sub>H</sub>'yi seçer: çekirdek sonsuz ağır değildir. Bunu görmek iki dikkat ister. Hava–vakum dönüşümü atlansa R 0.028 % büyürdü. θ = (φ₊ − φ₋)/2 ise ölçeğin sıfır hatasını götürür; sıfır düzeltmesi yapmadan yalnız + yandaki okumalar kullanılsaydı hata −1.07 % olurdu, aranan etkinin yirmi katı.",
      },
      {
        title: "Bir CD'nin iz aralığını cetvelle ölç",
        predict:
          "CD'nin iz aralığı p = 1.6 µm, lazer 650 nm. Duvar diskten D = 10 cm uzaktayken ±1 lekeleri merkezden kaç cm uzağa düşer? Blu-ray'de (p = 0.32 µm) hangi lazerle birinci mertebe görürsün?",
        do: "CD, DVD ve Blu-ray sekmesinde Sıfırla'ya bas ve tablodaki iz aralığını oku (imleçler ±4.0 cm'de). İmleçleri ±1 lekelerine koy düğmesine bas. D'yi 30 cm yapıp düğmeye yeniden bas. Son olarak Disk menüsünden DVD'yi, sonra Blu-ray'i seç ve üç lazeri dene.",
        observe:
          "Kartlar θ₁ = 23.97° ve y₁ = 4.446 cm der. İmleçler ±4.0 cm'deyken p = 1750 nm (+9.39 %); lekelere konunca ±4.4 cm ve p = 1614 nm (+0.87 %), cetvel belirsizliği ± 10.6 nm. D = 30 cm'de ±13.3 cm ve p = 1604 nm (+0.24 %, ± 3.5 nm). DVD 650 nm'de tek mertebe verir, 61.45°'de. Blu-ray hiçbir lazerle birinci mertebe vermez.",
        explain:
          "p = λ/sin(atan(Δy/2D)). Cetvelin ±0.5 mm hatası sabittir; D büyüdükçe lekeler açılır ve göreli hata küçülür. Blu-ray'de λ/p, 405 nm için 1.27, 650 nm için 2.03'tür ve sin θ 1'i aşamaz: dik gelişte renk yoktur. Eğik gelişte iki sinüsün farkı 2'ye kadar çıkabildiğinden koşul λ < 2p = 640 nm'ye gevşer; Blu-ray'in parıltısı eğik bakıştan gelir.",
      },
    ],
  },
  wow: [
    {
      title: "Önce Güneş'te, sonra Dünya'da",
      body:
        "Helyumun sarı D₃ çizgisi bugünkü ölçümle 587.56 nm'dedir, sodyumun D₂ çizgisinden yalnız 1.43 nm kısa. 1868'de tutulmayı izleyenlerin bir kısmı onu önce sodyum sandı. Oysa ayırmak için λ/Δλ ≈ 410 yeter: sayfadaki 600 çizgi/mm'lik ızgaranın 0.7 mm'lik bir şeridi birinci mertebede işi görürdü. Element 1895'e kadar yalnız Güneş'te biliniyordu; bugün evrendeki sıradan maddenin kütlece yaklaşık dörtte biri helyumdur.",
    },
    {
      title: "Çekirdeğin kütlesini gösteren çizgi",
      body:
        "Döteryumun çekirdeği protondan iki kat ağırdır; indirgenmiş kütle elektronunkine biraz daha yaklaşır ve bütün çizgiler 0.027 % kısalır, Hα'da 0.18 nm. 1931'in sonunda Harold Urey bu kaymayı aradı: Ferdinand Brickwedde beş litre sıvı hidrojeni buharlaştırıp 1 mililitreye indirdi, ağır izotop zenginleşti ve Balmer çizgilerinin hemen kısa dalga yanında sönük eşler belirdi. Ayırmak için λ/Δλ ≈ 3700 gerekir. Urey 1934 Nobel Kimya Ödülü'nü aldı.",
    },
    {
      title: "Bir CD'de 5.4 kilometrelik ızgara",
      body:
        "Bir CD'nin verisi 25 mm ile 58 mm yarıçap arasında tek bir spiral iz boyunca dizilir; sarımlar arası 1.6 µm, milimetrede 625 iz. Halka alanını iz aralığına bölünce izin uzunluğu çıkar: 86.05 cm² / 1.6 µm ≈ 5.4 km. 33 mm'lik genişliğe 20 000'den fazla sarım sığar. 1 mm'lik bir lazer lekesi bile 625 izi aydınlatır; lambanın altında gördüğün renkler, bu sarımların birlikte çalıştığı yansıtıcı bir ızgaradan gelir.",
    },
  ],
  worked: {
    title: "Sodyum çiftini ayırmak için kaç çizgi?",
    prompt:
      "Sodyumun D₂ ve D₁ çizgileri havada 588.9950 nm ve 589.5924 nm'dir. Milimetrede 600 çizgilik bir geçirgen ızgaraya ışık dik geliyor. (a) Çifti Rayleigh ölçütüyle ayırmak için birinci ve ikinci mertebede en az kaç çizgi ve ne genişlikte bir aydınlatılmış şerit gerekir? (b) Birinci mertebede iki çizgi arasındaki açı kaçtır? (c) 0.01° okuyan bir ölçek bu ayrımı görmeye yeter mi?",
    steps: [
      "Gereken çözme gücünü bul: <span class=ov>λ</span> = (588.9950 + 589.5924)/2 = 589.2937 nm, Δλ = 0.5974 nm, <span class=ov>λ</span>/Δλ = 986.4. Rayleigh ölçütü mN ≥ 986.4 ister.",
      "Çizgi sayısına ve genişliğe çevir: m = 1'de N ≥ 986.4, en az 987 çizgi; m = 2'de N ≥ 493.2, en az 494 çizgi. d = 1/600 mm = 1.6667 µm ve W = N·d olduğundan birinci mertebede W ≥ 987 × 1.6667 µm = 1.645 mm, ikincide W ≥ 0.823 mm. İkinci mertebe aynı işi yarım şeritle görür.",
      "Açıları hesapla: sin θ = mλ/d. m = 1'de D₂ için sin θ = 588.995/1666.67 = 0.35340, θ = 20.695°; D₁ için 0.35376, θ = 20.717°. Aralık Δθ = 0.022° = 3.83 × 10⁻⁴ rad. Türevle de aynısı çıkar: Δθ = mΔλ/(d·cos θ) = 0.5974 nm/(1666.67 nm × 0.9354) = 3.83 × 10⁻⁴ rad.",
      "Rayleigh sınırını denetle: W = 1.65 mm (990 çizgi) için bir çizginin tepeden ilk sıfıra yarı genişliği λ/(W·cos θ) = 589.29 nm/(1.65 mm × 0.9354) = 3.82 × 10⁻⁴ rad, aralıkla neredeyse eşit: ölçüt tam sınırda sağlanır. İkinci mertebede θ ≈ 45.0° ve aralık 0.058°'ye çıkar.",
      "Ölçeği değerlendir: birinci mertebedeki 0.022° ölçeğin yalnız iki adımıdır, ikinci mertebedeki 0.058° ise altı adım. Sayfada dene: Na çifti, m = 1 düğmesine bas ve W'yi 1.65 mm'den 1.64 mm'ye indir; Rayleigh kartı 990 çizgide 'çözülür', 984 çizgide 'çözülmez' der.",
    ],
    result:
      "Birinci mertebede en az 987 çizgi (W ≥ 1.645 mm), ikincide 494 çizgi (W ≥ 0.823 mm); çizgiler birinci mertebede 0.022°, ikincide 0.058° ayrıktır. 0.01°'lik ölçek için asıl sınır ızgara değil okumadır: çifti ikinci mertebede ölç.",
  },
  misconceptions: [
    {
      myth: "Yarık sayısını artırırsan parlak saçaklar birbirinden uzaklaşır.",
      truth:
        "Ana tepelerin yeri yalnız d·sin θ = mλ'ya bağlıdır; N tepeleri yerinden oynatmaz, inceltir ve parlatır. Sayfada N = 2'den N = 10'a geç: kuram iki durumda da 7.2709° der; ölçülen tepe 7.05°'ten 7.26°'ye yalnız zarfın çekmesi azaldığı için kayar, tepeden ilk sıfıra uzaklık ise 0.0633'ten 0.0127'ye, beş kat daralır.",
    },
    {
      myth: "Milimetrede daha çok çizgisi olan ızgara her zaman daha iyi ayırır.",
      truth:
        "Çözme gücü R = mN = W·sin θ/λ'dır: sık çizgi daha geniş açılar verir ama izin verilen en yüksek mertebeyi düşürür. W = 2.00 mm'de 600 çizgi/mm'lik ızgara sodyum çiftini ikinci mertebede R = 2400 ile, 1200 çizgi/mm'lik ızgara birinci mertebede yine R = 2400 ile ayırır; ikisi de çifti 45°'ye yollar. Çözme gücünü artırmanın yolu aydınlatılan genişliği büyütmektir.",
    },
    {
      myth: "CD'nin renkleri boyadan ya da sabun köpüğündeki gibi ince bir zardan gelir.",
      truth:
        "Renkler 1.6 µm aralıklı spiral izin kırınımıdır. İnce zar girişimi bakış açısıyla dar bir renk aralığında oynar; ızgara ise açı değiştikçe bütün tayfı sırayla gösterir. Sayfada lazeri 650'den 405 nm'ye çevir: ±1 lekeleri 23.97°'den 14.66°'ye iner, çünkü kısa dalga daha az sapar. DVD'nin izleri daha sık olduğu için aynı kırmızı 61.45°'ye gider.",
    },
    {
      myth: "Izgara renkleri prizma gibi sıralar: en çok mor sapar.",
      truth:
        "Prizmada mor en çok sapar, çünkü camın kırılma indisi kısa dalgada büyüktür. Izgarada sıra terstir: sin θ = mλ/d olduğundan en çok kırmızı sapar. Spektrometrede 600 çizgi/mm ile birinci mertebede kırmızı Hα (656 nm) 23.19°'de, mor Hδ (410 nm) 14.25°'de durur. Prizmanın ayırması camın malzemesine bağlıdır; ızgaranınki yalnız geometriye, bu yüzden dalga boyu ölçmek için ızgara tercih edilir.",
    },
  ],
  glossary: [
    { term: "Kırınım ızgarası", definition: "Eşit aralıklı çok sayıda yarık ya da çizgiden oluşan, ışığı dalga boyuna göre belirli açılara ayıran optik eleman; geçirgen ya da yansıtıcı olabilir." },
    { term: "Izgara sabiti (d)", definition: "Komşu iki çizginin merkezleri arasındaki uzaklık; çizgi yoğunluğunun tersidir, 600 çizgi/mm için d = 1.667 µm." },
    { term: "Mertebe (m)", definition: "Komşu çizgilerden gelen dalgaların yol farkının kaç tam dalga boyu olduğu; m = 0 düz geçen ışıktır." },
    { term: "İkincil maksimum", definition: "N yarıklı desende iki ana tepe arasındaki N − 2 küçük tepeden her biri; ortadakiler N büyüdükçe 1/N² gibi söner, ana tepenin hemen yanındaki ise ana tepenin %4.7'sinin altına hiç inmez." },
    { term: "Çözme gücü (R)", definition: "Bir tayf aletinin ayırabildiği en küçük dalga boyu farkının ölçüsü, R = λ/Δλ; ızgarada R = mN." },
    { term: "Rayleigh ölçütü", definition: "İki çizginin, birinin tepesi ötekinin ilk sıfırına düştüğünde ayrılmış sayılması uzlaşımı." },
    { term: "Rydberg sabiti", definition: "Hidrojen benzeri atomların tayf çizgilerinin dalga sayılarını veren sabit; sonsuz ağır çekirdek için R∞ = 10 973 731.568 m⁻¹." },
    { term: "İndirgenmiş kütle (μ)", definition: "İki cisimli bir sistemi tek cisim gibi ele almayı sağlayan etkin kütle, μ = mₑmₚ/(mₑ + mₚ); hidrojende elektron kütlesinden 0.054 % küçüktür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede ızgara d·sin θ = mλ'dır; üniversitede <strong>Fizik II</strong> ve <strong>Optik</strong> derslerinde aynı desen bir Fourier dönüşümünden çıkar. Uzak alanda ekrandaki genlik, açıklık fonksiyonunun Fourier dönüşümüdür: eşit aralıklı N dar yarık bir 'tarak'tır, dönüşümü de periyodik tepelerden oluşan bir taraktır. Tarağın sonlu genişliği Nd her dişi 1/N incelikte dar bir sinc'e yayar, yarık genişliği a ise bütün tarağı geniş bir sinc zarfıyla çarpar. <strong>Fourier optiği</strong> buradan merceklerin görüntü oluşturmasını, uzaysal süzgeçleri ve holografiyi kurar. Aynı matematik üç boyuta geçince <strong>X ışını kırınımı</strong> olur: kristaldeki atom düzlemleri bir ızgaradır ve Bragg koşulu 2d·sin θ = nλ kristallerin içini okutur. Optik derslerinde iki tasarım da öğrenilir: çizgi yüzleri eğik kesilmiş, ışığın çoğunu tek bir mertebeye yollayan <strong>blaze ızgaralar</strong> ve onlarca mertebede birden çalışıp mertebeleri ikinci bir ızgara ya da prizmayla dik yönde ayıran <strong>eşel (echelle) spektrografları</strong>.",
      "<strong>Atom Fiziği</strong> ve <strong>Spektroskopi</strong> derslerinde Balmer çizgileri inceldikçe yeni fizik çıkar: Hα, 0.014 nm aralıklı bileşenlerden oluşur (ince yapı); onları ayırmak için λ/Δλ ≈ 47 000 gerekir, sayfanın Hα için ulaşabildiği en yüksek çözme gücünün (24 000) iki katı. Dirac denklemi ince yapıyı, kuantum elektrodinamiği Lamb kaymasını açıklar. <strong>Astrofizikte</strong> ızgara yıldızların bileşimini, sıcaklığını ve hızını okur: çizgilerin Doppler kayması Δλ/λ = v/c'dir. 1929'da Edwin Hubble, galaksilerin tayf çizgilerindeki kırmızıya kaymanın uzaklıkla büyüdüğünü gösterdi. 1995'te Michel Mayor ve Didier Queloz, 51 Pegasi yıldızının hızındaki 4.2 günlük bir salınımdan Güneş benzeri bir yıldızın çevresindeki ilk gezegeni buldu. Bugün eşel spektrografları saniyede yaklaşık bir metrelik hız değişimlerini, yani 3 × 10⁻⁹ düzeyinde bir Δλ/λ'yı izliyor. Bu, aletin yaklaşık 10⁵'lik çözme gücünün verdiği 10⁻⁵'ten binlerce kat incedir: tek bir çizgi ayrılmaz, binlerce çizginin merkezi birlikte izlenir.",
    ],
    topics: [
      "Fizik II / Optik",
      "Fourier optiği",
      "Blaze ve eşel ızgaralar",
      "X ışını kırınımı ve Bragg yasası",
      "Atom Fiziği: ince yapı ve Lamb kayması",
      "Astronomik spektroskopi ve kırmızıya kayma",
    ],
  },
  quiz: [
    {
      question:
        "Bir ızgarada N = 10 iken birinci ana tepeden ilk sıfıra uzaklık Δ(sin θ) = 0.0127. d ve λ aynı kalırken yarık sayısı 100'e çıkarsa ne olur?",
      options: [
        "Tepe yerinde kalır, Δ(sin θ) 0.00127'ye iner ve iki ana tepe arasında 98 ikincil maksimum olur",
        "Tepe on kat uzağa kayar ve genişliği değişmez",
        "Tepe yerinde kalır, yalnız parlaklaşır; genişliği değişmez",
        "Tepe yerinde kalır, Δ(sin θ) 0.00127'ye iner ve iki ana tepe arasında 99 ikincil maksimum olur",
      ],
      answer: 0,
      explanation:
        "Ana tepenin yeri d·sin θ = mλ'dan gelir ve N içermez. İlk sıfır Nφ = 2π'de, yani Δ(sin θ) = λ/(Nd)'dedir: N on katına çıkınca tepe on kat incelir, 0.0127'den 0.00127'ye. İki ana tepe arasında N − 1 = 99 sıfır vardır; ikincil maksimumlar bu sıfırların arasında kaldığı için sayıları bir eksik, N − 2 = 98'dir. Sayfa N = 100'de tam bunları ölçer.",
    },
    {
      question: "Milimetrede 600 çizgilik bir ızgaraya beyaz ışık (380–750 nm) dik geliyor. Hangisi doğrudur?",
      options: [
        "Birinci ve ikinci mertebe tayfları üst üste biner",
        "İkinci mertebenin kırmızı yanı, üçüncü mertebenin mor-mavi kısmıyla aynı açılara düşer",
        "Bütün mertebeler birbirinden karanlık boşluklarla ayrılır",
        "Mertebeler yalnız 1200 çizgi/mm'lik ızgarada örtüşür",
      ],
      answer: 1,
      explanation:
        "Bir açıya gelen dalga boyları λ = d·sin θ/m'dir. 2 × 380 = 760 > 750 olduğundan birinci ile ikinci mertebe arasında boşluk kalır. Ama 3 × 380 = 1140 < 2 × 750 = 1500: ikinci mertebenin 570–750 nm kısmı üçüncünün 380–500 nm kısmıyla örtüşür, çünkü 2λ₂ = 3λ₃. Bu sınırlar d'yi içermez; mertebeler var oldukça her ızgarada aynıdır. Spektrometrede beyaz ışıkla dürbünü 49°'ye çevir: kart 628.9 ve 419.3 nm'yi birlikte gösterir.",
    },
    {
      question:
        "Döteryumun Hα çizgisi hidrojeninkinden 0.18 nm kısadır (656.10 ve 656.28 nm). Milimetrede 600 çizgilik bir ızgarayla ikinci mertebede bu iki çizgiyi Rayleigh ölçütüyle ayırmak için en az ne genişlikte bir şerit aydınlatılmalıdır?",
      options: ["Yaklaşık 0.3 mm", "Yaklaşık 3 mm", "Yaklaşık 6 mm", "Yaklaşık 30 mm"],
      answer: 1,
      explanation:
        "Gereken çözme gücü λ/Δλ ≈ 656.2/0.18 ≈ 3650. İkinci mertebede 2N ≥ 3650 için en az 1823 çizgi gerekir; d = 1/600 mm olduğundan W = N·d ≈ 3.04 mm. Birinci mertebede iki katı, yaklaşık 6 mm gerekirdi. Urey'in 1931'de döteryumu tanıdığı kayma tam bu büyüklükteydi.",
    },
  ],
  next: [
    { href: "klasik-girisim.html", title: "Young'un Çift Yarık Deneyi", why: "Izgaranın N = 2 hâli: yol farkı, cos² saçakları ve tek yarık zarfı orada iki yarık ve bir cetvelle ölçülür." },
    { href: "optik-yansima-kirilma.html", title: "Işığın Yansıması ve Kırılması", why: "Prizma renkleri ters sırayla ayırır, en çok mor sapar; dispersiyonun kaynağını, Sellmeier denklemini ve en küçük sapmayı gör." },
    { href: "kara-cisim-isimasi.html", title: "Kara Cisim Işıması", why: "Çizgi tayfının karşıtı: akkor cisimlerin sürekli tayfı ve biçimini yalnız sıcaklığın belirlediği Planck eğrisi." },
    { href: "kuantum-mekanigi.html", title: "Kuantum Çift Yarık", why: "Elektronlar da kırınır: aynı girişim saçakları, tek tek gelen parçacıklarla nokta nokta birikir." },
  ],
  sources: [
    {
      title: "Feynman Lectures · Vol. I, Ch. 30 Diffraction",
      url: "https://www.feynmanlectures.caltech.edu/I_30.html",
      note: "N eş salınıcının bileşke genliği (fazör çokgeni), kırınım ızgarası ve ızgaranın çözme gücü; ilk dört kavram kartının dayanağı (İngilizce).",
    },
    {
      title: "OpenStax · University Physics Vol. 3, 4.4 Diffraction Gratings",
      url: "https://openstax.org/books/university-physics-volume-3/pages/4-4-diffraction-gratings",
      note: "Çok yarıktan ızgaraya geçiş (N − 2 ikincil maksimum), ızgara denklemi ve beyaz ışıkla çözümlü örnek (İngilizce, açık ders kitabı).",
    },
    {
      title: "NIST · CODATA 2022, Rydberg constant",
      url: "https://physics.nist.gov/cgi-bin/cuu/Value?ryd",
      note: "R∞ = 10 973 731.568 157(12) m⁻¹; sayfanın R_H değeri bu sabitten ve proton-elektron kütle oranından hesaplanır.",
    },
    {
      title: "Wikipedia · Diffraction grating",
      url: "https://en.wikipedia.org/wiki/Diffraction_grating",
      note: "Tarihçe (Rittenhouse, Fraunhofer, Nobert, Rowland), ızgara türleri, CD ve DVD örnekleri ve ince zar girişimiyle farkı (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
