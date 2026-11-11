window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["atom-orbitalleri"] = {
  slug: "atom-orbitalleri",
  title: "Atom Orbitalleri: Hidrojenin Kesin Çözümü",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Tek elektronlu atom, Schrödinger denkleminin kâğıt üstünde tam çözülebilen nadir problemlerinden biridir. Düğümleri say, olasılık bulutunu örnekle, hidrojenin kırmızı çizgisini NIST ölçümüyle karşılaştır.",
  hook: "Hidrojenin tek elektronu nerede diye sorsan, kuantum mekaniği sana bir adres değil bir harita verir. Haritanın en koyu noktası çekirdeğin tam üstüdür; ama elektronu en sık bulacağın uzaklık 52,9 pikometredir, yani Bohr'un 1913'te çizdiği ilk yörüngenin yarıçapı. Elektron dönmüyorsa, o sayı oraya nereden geldi?",
  bigIdea:
    "Orbital bir yol değil, tek elektronlu atomun <strong>dalga fonksiyonudur</strong>: ψ = R(r)·Y(θ, φ) çarpımının karesi elektronun nerede bulunabileceğini söyler; ℓ açısal ve n − ℓ − 1 radyal düğümü, enerjisi de yalnız n'ye bağlı −13,6 eV·Z²/n² değerini verir.",
  story: [
    "1911'de Ernest Rutherford atomun ortasında minicik, ağır, artı yüklü bir çekirdek bulunduğunu gösterince fizik bir çıkmaza girdi. Elektronlar çekirdeğin çevresinde gezegenler gibi dönüyorsa, klasik elektromanyetizmaya göre sürekli ışık yayıp enerji kaybetmeli ve saniyenin çok küçük bir kesrinde çekirdeğe spiral çizerek düşmeliydi. Oysa atomlar milyarlarca yıldır yerinde duruyor. 1913'te genç Danimarkalı fizikçi Niels Bohr cüretkâr bir kural koydu: elektron yalnızca belirli 'izinli' yörüngelerde dolanabilir, bu yörüngelerde ışık yaymaz; ışığı ancak bir yörüngeden ötekine atlarken yayar. Model, İsviçreli öğretmen Johann Balmer'in 1885'te hidrojenin dört görünür çizgisine uydurduğu ve İsveçli Johannes Rydberg'in 1888'de genelleştirdiği deneysel formülü ilk kez bir kuramdan türetti; Rydberg sabitini elektronun yükü ve kütlesi ile Planck sabitinden hesapladı ve en içteki yörüngenin yarıçapını yaklaşık 0,053 nanometre buldu. Bohr 1922'de Nobel aldı. Ama kural bir açıklama değil, bir buyruktu: neden yalnızca bu yörüngeler? Üstelik model iki elektronlu helyumda bile tökezliyordu.",
    "İlk ipucu 1924'te Louis de Broglie'nin doktora tezinden geldi: ışık hem dalga hem parçacık gibi davranıyorsa, elektron da bir dalga olabilirdi; dalga boyu λ = h/p. Bu gözle bakınca Bohr'un izinli yörüngeleri, çevresine tam sayıda dalga boyu sığanlardı; tıpkı bir gitar telinde yalnızca belirli titreşimlerin kalıcı olabilmesi gibi. 1927'de Davisson ve Germer elektronların bir kristalden ışık gibi kırınıma uğradığını gösterdi; de Broglie 1929'da Nobel aldı. Bu arada Erwin Schrödinger elektron dalgasının denklemini yazdı; denklemi 1925'in sonunda İsviçre'nin Arosa kasabasında geçirdiği bir tatilde bulduğu anlatılır. 1926'da yayımladığı çözüm, hidrojenin enerji seviyelerini hiçbir yörünge varsaymadan verdi. Üstelik n, ℓ ve m sayıları elle konmamıştı: üç boyutta kendi üzerine tutarlı biçimde kapanması gereken bir dalganın matematiğinden kendiliğinden çıkıyorlardı.",
    "Peki dalgalanan ne? Schrödinger elektronun yükünün bulut gibi yayıldığını düşünüyordu. 1926'da Max Born, çarpışmalar üzerine yazdığı bir makalede başka bir yorum önerdi: dalga fonksiyonu elektronun nerede olduğunu değil, nerede bulunabileceğinin olasılığını söyler. İşin ilginç yanı, makalenin ana metninde olasılığı dalganın kendisi belirliyordu; baskı sırasında eklenen bir dipnot bunu düzeltti: olasılık, dalga fonksiyonunun büyüklüğünün karesiyle orantılıdır. Bugün <strong>Born kuralı</strong> denen bu cümle kuantum mekaniğinin temel taşlarından biri oldu ve Born'a 1954'te Nobel getirdi. Herkes ikna olmadı: Einstein 1926'nın sonunda Born'a yazdığı bir mektupta Tanrı'nın zar attığına inanmadığını söyledi. Ders kitaplarındaki her orbital bulutu, aslında Born'un o dipnotunun bir çizimidir.",
    "Elektronların bu dalga biçimlerine nasıl dağıldığını 1925'te Wolfgang Pauli söyledi: bir atomda iki elektronun bütün kuantum sayıları aynı olamaz. Pauli bunun için iki değerli, anlamı belirsiz bir dördüncü sayıya ihtiyaç duydu; aynı yıl George Uhlenbeck ile Samuel Goudsmit bu sayının elektronun kendi iç açısal momentumu, yani <strong>spini</strong> olduğunu önerdi. Böylece her orbitale en çok iki zıt spinli elektron sığıyordu ve kabukların 2, 8, 18, 32 kapasitesi bir hesabın sonucu hâline geldi; periyodik tablonun 2, 8, 8, 18, 18, 32 elementlik satırları da bu kapasitelerden ve dolum sırasından okunur oldu. Pauli bu ilke için 1945'te Nobel aldı. 'Orbital' kelimesi ise 1932'de Robert Mulliken'in önerisiyle, 'tek elektronlu yörüngemsi dalga fonksiyonu' ifadesinin kısaltması olarak doğdu. Ad yörüngeyi çağrıştırsa da anlamı tam tersidir: belirli bir yol yok, yalnızca bir olasılık haritası var.",
  ],
  core: [
    {
      heading: "Yörünge değil, olasılık haritası",
      body: "Orbital, elektronun izlediği bir yol değildir; elektronun durumunu betimleyen bir <strong>dalga fonksiyonudur</strong> (ψ). ψ uzayın her noktasına bir sayı atar; bu sayının karesi |ψ|², o noktanın çevresindeki küçük bir hacimde elektron bulma olasılığını verir. Hidrojenin 1s durumunda yoğunluk çekirdeğin tam üstünde en büyüktür ve dışa doğru üstel olarak azalır, ama hiçbir uzaklıkta tam sıfır olmaz. Bir ölçümde elektronu tek bir noktada bulursun; binlerce ölçümü üst üste koyarsan bulut ortaya çıkar. Sayfanın <strong>Olasılık bulutu</strong> sekmesi tam olarak bunu yapar: her nokta |ψ|²'den rastgele çekilmiş bir olası konumdur. Ders kitaplarındaki keskin kenarlı balonlar, olasılığın %90'ını içine alan seçilmiş bir yüzeydir; elektronu içeride tutan bir duvar değildir.",
      formula: "dP = |ψ|² dV,  ∫ |ψ|² dV = 1",
      formulaNote:
        "Küçük bir dV hacminde elektron bulma olasılığı. Bütün uzay üzerinden toplam 1 olmalıdır: elektron bir yerdedir. Sayfa bu integrali her durumda sayısal olarak alır ve 1'den farkını yazar.",
    },
    {
      heading: "Dört sayıyla bir adres",
      body: "Schrödinger denkleminin hidrojen çözümü her durumu üç tam sayıyla etiketler. <strong>Baş kuantum sayısı</strong> n (1, 2, 3 …) kabuğu, enerjiyi ve büyüklüğü belirler. <strong>Açısal kuantum sayısı</strong> ℓ, 0'dan n − 1'e kadar değer alır ve biçimi söyler: ℓ = 0, 1, 2, 3 sırasıyla s, p, d, f. <strong>Manyetik kuantum sayısı</strong> mℓ, −ℓ'den +ℓ'ye kadar gider ve aynı biçimin uzaydaki yönelimlerini sayar: p'de 3, d'de 5, f'de 7. Dördüncü sayı olan <strong>spin</strong> mₛ, orbitalin değil elektronun özelliğidir ve yalnızca +½ ya da −½ olabilir. Bir n kabuğunda n² orbital, 2n² elektron yeri vardır: 2, 8, 18, 32. Kimyacıların p<sub>x</sub>, d<sub>xy</sub> dediği orbitaller, +m ve −m durumlarının gerçel bileşimleridir; bu yüzden sayfa onları cos(|m|φ) ve sin(|m|φ) ile, '+1' ya da '−2' gibi bir m etiketiyle gösterir.",
      formula: "ℓ = 0 … n − 1 · m<sub>ℓ</sub> = −ℓ … +ℓ · m<sub>s</sub> = ±½",
      formulaNote:
        "Bir alt kabukta 2ℓ + 1 orbital bulunur. 1p ya da 2d yoktur, çünkü ℓ her zaman n'den küçüktür; sayfadaki ℓ kaydırıcısının üst sınırı bu yüzden n − 1'dir.",
    },
    {
      heading: "En yoğun nokta ile en olası uzaklık",
      body: "ψ, uzaklığa bağlı <strong>radyal kısım</strong> R(r) ile yöne bağlı <strong>açısal kısım</strong> Y(θ, φ)'nin çarpımıdır. Elektronun çekirdekten r ile r + dr arasında bulunma olasılığını istiyorsan, |ψ|²'yi o ince kabuğun hacmiyle çarparsın; kabuğun alanı r² ile büyür. Sonuç <strong>radyal olasılık yoğunluğu</strong> P(r) = r²R²'dir. 1s için R ∝ e<sup>−Zr/a₀</sup>, yani P ∝ r²e<sup>−2Zr/a₀</sup>; türevini sıfıra eşitlersen 2r − 2Zr²/a₀ = 0 ve r = a₀/Z çıkar. Bohr'un yarıçapı bir yol değil, bu fonksiyonun tepesidir. Ortalama uzaklık ise tepeden büyüktür, çünkü P(r)'nin dışa doğru uzun bir kuyruğu vardır: 1s'te ⟨r⟩ = 1,5 a₀. Bohr'un n²a₀/Z yarıçapı yalnız ℓ = n − 1 durumlarında (1s, 2p, 3d, 4f) tepeye denk gelir; 2s'in en yüksek tepesi 4 a₀'da değil 5,2361 a₀'dadır.",
      formula: "P(r) = r²R<sub>nℓ</sub>(r)² · ⟨r⟩ = (a₀/2Z)[3n² − ℓ(ℓ + 1)] · ⟨1/r⟩ = Z/(n²a₀)",
      formulaNote:
        "P(r)'nin integrali 1'dir. Bütün uzunluklar 1/Z ile küçülür: He⁺ iyonunun (Z = 2) 1s'i hidrojeninkinin yarısı boyundadır.",
    },
    {
      heading: "Düğümler: dalganın sustuğu yüzeyler",
      body: "Gitar telinin hiç kıpırdamayan noktaları gibi, orbitallerin de ψ'nin sıfır olduğu yüzeyleri vardır; bunlara <strong>düğüm</strong> denir ve orada elektron bulma olasılığı sıfırdır. <strong>Radyal düğümler</strong> çekirdeği saran iç içe kürelerdir ve R(r)'nin içindeki Laguerre polinomunun kökleridir; sayıları n − ℓ − 1. <strong>Açısal düğümler</strong> çekirdekten geçen düzlemler ya da konilerdir ve Y'nin sıfırlarıdır; sayıları ℓ'dir. Bunların ℓ − |m| tanesi θ = sabit yüzeyidir (koni ya da xy düzlemi), |m| tanesi z ekseninden geçen düşey düzlemdir. d<sub>z²</sub> için Y ∝ 3cos²θ − 1 olduğundan düğümler cos²θ = 1/3'te, θ = 54,7356° ve 125,2644°'te iki konidir. ψ bir düğümden geçerken işaret değiştirir; sayfadaki turkuaz ve turuncu renkler bu işareti gösterir. 'Elektron düğümden nasıl geçiyor?' sorusu, elektronu loblar arasında koşan bir top sanmaktan doğar: orbital tek bir duran dalgadır.",
      formula: "radyal = n − ℓ − 1 · açısal = ℓ = (ℓ − |m|) + |m| · toplam = n − 1",
      formulaNote:
        "3d: 0 radyal + 2 açısal. 4s: 3 radyal + 0 açısal. Ayrıca Y(−u) = (−1)<sup>ℓ</sup>Y(u): ℓ tekse ters yöndeki lobun işareti terstir (parite).",
    },
    {
      heading: "Enerji: Bohr formülü, sonra düzeltmeleri",
      body: "Schrödinger çözümünün enerjisi yalnız n'ye bağlıdır: 2s ile 2p, 3s, 3p ve 3d eş enerjilidir. <strong>Virial teoremi</strong> Coulomb potansiyeli için E = ⟨V⟩/2 der; ⟨1/r⟩ = Z/(n²a₀) koyunca E = −R∞hc·Z²/n² çıkar ve sayfa bunu radyal integralden yeniden hesaplar. Gerçek çekirdek sonsuz ağır değildir: elektron ile proton ortak kütle merkezi çevresinde hareket eder ve mₑ yerine <strong>indirgenmiş kütle</strong> μ = mₑM/(mₑ + M) girer. Hidrojende μ/mₑ = 0,99945568; çizgiler yaklaşık %0,054 uzar. Geriye kalan pikometre düzeyindeki farkı Dirac'ın göreli kuramındaki (Zα)² mertebesindeki <strong>ince yapı</strong> açıklar; daha da küçük artık Lamb kayması mertebesindedir ve bu sayfada hesaplanmaz. Bütün bunlar tek elektron içindir: helyumdan itibaren elektronlar birbirini de iter ve kapalı biçimli bir çözüm yoktur. Kimyadaki orbitaller orada bir yaklaşımdır: her elektron, öteki elektronların perdelediği etkin bir çekirdek yükü görür; aynı n'deki s, p, d enerjilerini ayıran da bu perdelemedir.",
      formula: "E<sub>n</sub> = −R∞hc·(μ/mₑ)·Z²/n² · 1/λ = R∞(μ/mₑ)Z²(1/n<sub>alt</sub>² − 1/n<sub>üst</sub>²)",
      formulaNote:
        "R∞hc = 13,605693122990 eV (CODATA 2022). Sonsuz ağır çekirdekte μ/mₑ = 1. Ölçülen çizgiler havada verildiği için sayfa vakum dalga boyunu havanın kırılma indisine böler.",
    },
  ],
  lab: {
    intro:
      "Sayfa her şeyi kapalı formüllerden hesaplar ve her okumada sayısal olarak <em>ölçülen</em> değeri kuram değerinin yanına, '/' ile ayırarak yazar. Dört sekme var. <strong>01 · Radyal dağılım</strong>: <strong>Baş kuantum sayısı n</strong> (1–4), <strong>Açısal momentum kuantum sayısı ℓ</strong> ve <strong>Çekirdek yükü Z</strong> (1 · H'den 6 · C⁵⁺'ya) kaydırıcıları, 1s, 2s, 3d, 4s düğmeleri (Z'yi değiştirmezler); grafik R(r)'yi ve P(r)'yi, kartlar düğüm sayısını, normalizasyonu, ⟨r⟩'yi, en olası yarıçapı, ⟨1/r⟩'yi ve virial enerjiyi gösterir, alttaki tablo bütün n ≤ 4 durumlarını listeler. <strong>02 · Açısal şekiller</strong>: <strong>Orbital (ℓ, m)</strong> menüsünde s'den yedi f orbitaline 16 gerçel orbital, <strong>Çizilen büyüklük</strong> (|Y| ya da |Y|²), dönüş ve eğim açıları, <strong>Düğüm yüzeylerini göster</strong> kutusu, <strong>Üstten bak</strong> ve <strong>Yandan bak</strong> düğmeleri; 3B lob çiziminin altında θ–φ işaret haritası ve ölçülen düğüm açıları tablosu durur. <strong>03 · Olasılık bulutu</strong> (yalnız Z = 1): n, ℓ, <strong>Gerçel orbital (m)</strong>, <strong>Örnek sayısı N</strong>, <strong>Küre yarıçapı R</strong>, <strong>Kesit düzlemi</strong>; <strong>Yeni tohum</strong>, <strong>R'yi r₉₀'a getir</strong> düğmeleri. <strong>04 · Enerji ve spektrum</strong>: Z, <strong>Çekirdek kütlesi</strong> (¹H, ²H ya da sonsuz ağır), <strong>Üst düzey n<sub>üst</sub></strong> ve <strong>Alt düzey n<sub>alt</sub></strong>; Hα, Lyman α, Paschen α düğmeleri ve Balmer çizgilerini NIST ölçümleriyle karşılaştıran tablo. 3B tuvaller sürükleyerek ya da odaklanıp ok tuşlarıyla döner; her sekmenin kendi sıfırlama düğmesi vardır ve R tuşu etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Elektron en çok nerede, Bohr'un yarıçapı ne işe yarar?",
        predict:
          "1s'te |ψ|² çekirdeğin tam üstünde en büyük. Öyleyse en olası uzaklık 0 mı? 2s'in tepesi Bohr'un n²a₀ = 4 a₀ yarıçapına mı düşer? Z = 2'de boylar ve enerji nasıl değişir?",
        do: "<strong>01 · Radyal dağılım</strong> sekmesinde varsayılan 1s'i oku. Sonra sırayla <strong>2s</strong>, <strong>3d</strong> ve <strong>4s</strong> düğmelerine bas; düğüm kartını, en olası yarıçapı ve ⟨r⟩'yi not et, alttaki tabloda 2s ile 2p satırlarını karşılaştır. En sonda <strong>1s</strong>'e dönüp <strong>Çekirdek yükü Z</strong>'yi 2 yap. Ön ayar düğmeleri Z'yi değiştirmez; durum satırının başındaki '1s (H)' ya da '1s (He⁺, Z = 2)' hangi çekirdeği okuduğunu söyler.",
        observe:
          "1s: en olası yarıçap '1,0000 / 1,0000 a₀' (52,9 pm), ⟨r⟩ '1,5000 / 1,5000 a₀' (79,4 pm), virial enerji '−13,6057 / −13,6057 eV'. 2s: düğüm '1 / 1', r = 2,0000 a₀; P(r)'de iki tepe; en olası yarıçap '5,2361 / — a₀' ve 'basit kapalı biçim yok' notu; ⟨r⟩ 6,0000 a₀. Tabloda 2p'nin ⟨r⟩'si 5,0000, tepesi 4,0000 a₀. 3d: düğüm yok, tepe '9,0000 / 9,0000 a₀'. 4s: '3 / 3' düğüm, r = 1,8716; 6,6108; 15,5175 a₀, dört tepe, en yüksek tepe 24,6181 a₀. Z = 2'de 1s tepesi '0,5000', ⟨r⟩ '0,7500 a₀', enerji '−54,4228 eV'.",
        explain:
          "P(r) = r²R²: yoğunluk çekirdekte en büyük olsa da kabuk hacmi r = 0'da sıfırdır, çarpımın tepesi a₀/Z'de oluşur. 2s için P ∝ r²(2 − r)²e<sup>−r</sup> (a₀ biriminde); türev sıfırı r² − 6r + 4 = 0, yani r = 3 ± √5 verir: iç tepe 0,76, dış tepe 5,2361 a₀. Bohr'un n²a₀/Z yarıçapı yalnız ℓ = n − 1'de tepeye denk gelir. 2s ile 2p aynı enerjidedir ama farklı dağılır; 2s'in iç tepesi çekirdeğe sızar. Çok elektronlu atomlarda bu sızma s elektronunu daha sıkı bağlar. Z ile uzunluklar 1/Z, enerji Z² ile ölçeklenir.",
      },
      {
        title: "Açısal düğümler: düzlem, koni ve dönme simetrisi",
        predict:
          "d<sub>z²</sub>'nin iki açısal düğümü düzlem mi? d<sub>xy</sub>'yi z ekseni çevresinde kaç derece döndürürsen kendine döner? f<sub>x(x²−3y²)</sub> için?",
        do: "<strong>02 · Açısal şekiller</strong> sekmesinde varsayılan d<sub>z²</sub>'yi incele, düğüm tablosunu oku. Sonra <strong>Orbital (ℓ, m)</strong> menüsünden sırayla dxy, pz, fz³ ve fx(x²−3y²)'yi seç; her birinde düğüm kartını, parite ve dönme kartlarını oku. Lobları <strong>Üstten bak</strong> ile de gör.",
        observe:
          "d<sub>z²</sub>: '2 / 2' düğüm, ikisi de koni: θ = 54,7356° ve 125,2644° (kuram cos²θ = 1/3); dönme kartı 'her açıda aynı'. d<sub>xy</sub>: düşey düzlemler φ = 0° ve 90°; '180° dönmede kendine döner', '90° dönmede işaret değiştirir'. p<sub>z</sub>: tek düğüm xy düzlemi, parite 'tek (−1)'. f<sub>z³</sub>: bir xy düzlemi ve iki koni, θ = 39,2315°, 90° ve 140,7685°. f<sub>x(x²−3y²)</sub>: φ = 30°, 90°, 150°'de üç düşey düzlem; 120°'de kendine döner, 60°'de işaret değiştirir. Normalizasyon kartı her seferinde 1,000000000.",
        explain:
          "Açısal düğüm sayısı ℓ'dir; bunların ℓ − |m| tanesi θ = sabit (koni ya da xy düzlemi), |m| tanesi z'den geçen düzlemdir. m = 0 orbitalleri φ'ye bağlı olmadığından z çevresinde her açıda aynıdır; |m| ≠ 0 için cos(|m|φ) çarpanı 360°/|m| dönmede kendine döner, 180°/|m| dönmede işaret değiştirir. Parite (−1)<sup>ℓ</sup>: p ve f tek, s ve d çift. Lob bir yol değil, açısal kısmın kutup grafiğidir.",
      },
      {
        title: "Bulutu say, integrali yakala",
        predict:
          "2p<sub>z</sub> elektronunu 5 a₀ yarıçaplı bir kürenin içinde bulma olasılığı yarıdan fazla mı? 5.000 rastgele noktayla bu olasılığı ne kadar doğru ölçebilirsin?",
        do: "<strong>03 · Olasılık bulutu</strong> sekmesinde varsayılan 2p<sub>z</sub>'yi (N = 5.000, R = 5,0 a₀, tohum 1) oku. <strong>R'yi r₉₀'a getir</strong>'e bas. Sonra n'yi 1 yap (R 8,0 a₀'da kalır) ve kartı oku; yeniden <strong>R'yi r₉₀'a getir</strong>'e bas. En sonda <strong>Örnek sayısı N</strong>'yi 20.000 yap.",
        observe:
          "2p<sub>z</sub>, R = 5: '%56,70 / %55,95'; 2835 / 5.000 nokta, fark +0,75 puan = +1,1σ (σ = 0,70 puan). r₉₀ '7,878 / 7,994 a₀', ⟨r⟩ '4,950 / 5,000 a₀'. R = 8,0: '%90,64 / %90,04'. 1s'e geçince R = 8: '%99,98 / %100,00' ve 'beklenen 0,08 nokta: σ karşılaştırması anlamsız' uyarısı. R = 2,7: '%90,42 / %90,52'. N = 20.000: '%90,53 / %90,52', r₉₀ '2,660 / 2,661 a₀', %90 eş yoğunluk düzeyi '1,559·10⁻³ / 1,554·10⁻³'.",
        explain:
          "Her nokta |ψ|²'den çekilmiş bir olası konumdur; içeride kalanların oranı ∫₀ᴿ P dr integralini tahmin eder. Hata binom dağılımından gelir, σ = √[p(1 − p)/N]: N'yi dört katına çıkarmak σ'yı yarıya indirir. Küre neredeyse bütün olasılığı içine alınca dışarıda beklenen nokta sayısı 1'in altına düşer ve σ ile karşılaştırma anlamını yitirir; sayfa bunu söyler. '%90 sınır yüzeyi' bir tanımdır: 1s'te r₉₀ küresi ile eş yoğunluk yüzeyi aynıdır, 2p'de eş yoğunluk yüzeyi iki loba ayrılır ve kapalı biçimi yoktur.",
      },
      {
        title: "Hidrojenin kırmızı çizgisi ve protonun kütlesi",
        predict:
          "Bohr formülü hidrojenin kırmızı Hα çizgisini ne kadar tutturur? Çekirdeği sonsuz ağır saymak ne kadar hata getirir; döteryumda çizgi nereye kayar?",
        do: "<strong>04 · Enerji ve spektrum</strong> sekmesinde varsayılanı (Z = 1, ¹H, 3 → 2) oku ve tabloda Hα satırına bak. <strong>Çekirdek kütlesi</strong>'ni önce 'Sonsuz ağır çekirdek', sonra '²H: döteron' yap. <strong>Enerjiyi sıfırla</strong> ile ¹H'e dönüp <strong>Lyman α</strong>'ya bas. En sonda Z'yi 2 yapıp n<sub>üst</sub> = 3, n<sub>alt</sub> = 2 seç.",
        observe:
          "¹H: ΔE '1,8887 eV', '656,470 nm / 656,288 nm' (vakum / hava), '456,67 THz', seri sınırı 364,71 nm. Tabloda model 656,2883, NIST 656,2790 ± 0,0030, fark +0,0093 nm; ince yapılı model 656,28516, NIST bileşeni 656,28518. Sonsuz kütle: 655,9311 nm, fark −0,3479 nm ve 'yüz katından fazla' uyarısı. ²H: 656,1098 nm, 'Hα döteryumda 0,1785 nm daha kısadır'. İyonlaşma '13,598287 eV / 13,598435 eV'. Lyman α: '121,568 nm / —', 'vakum morötesi', seri sınırı 91,18 nm. He⁺, 3 → 2: 164,028 nm, iyonlaşma 54,422772 eV. Durum satırının başı ('¹H', '²H (döteryum)', 'Z = 2 (He⁺)') hangi modeli okuduğunu söyler.",
        explain:
          "Sonsuz ağır çekirdek her dalga boyunu mₑ/m<sub>p</sub> ≈ %0,054 kısaltır: Hα'da 0,36 nm, ölçüm belirsizliğinin yüz katı. İndirgenmiş kütle farkı 9,3 pm'ye indirir; Dirac ince yapısı en güçlü bileşende kalan farkı 0,02 pm'nin altına çeker, geri kalanı Lamb kayması mertebesindedir. Döteron protondan iki kat ağır olduğundan döteryum çizgileri biraz kısa dalga boyuna kayar. Ağır hidrojen tam bu kaymayla bulundu: 1931'in sonunda Harold Urey, Ferdinand Brickwedde ve George Murphy zenginleştirilmiş sıvı hidrojende Balmer çizgilerinin yanında soluk eş çizgiler gördü; Urey 1934'te Nobel Kimya Ödülü'nü aldı.",
      },
    ],
  },
  wow: [
    {
      title: "s, p, d, f: dört eski sıfat",
      body: "Harfler orbitallerden çok önce doğdu. 19. yüzyılın sonunda alkali metallerin spektrumlarını inceleyen bilim insanları çizgi dizilerine ad verdi: <em>principal</em> (ana) dizi p'yi, çizgilerinin görünüşünden adını alan <em>sharp</em> (keskin) ve <em>diffuse</em> (dağınık) diziler s ile d'yi verdi. Dördüncü dizi 1907'de kızılötesinde bulundu; 1909'da W. M. Hicks, formülü daha basit göründüğü için ona <em>fundamental</em> (temel) dedi, oysa bu adın fiziksel bir gerekçesi yoktu. Atom kuramı bu dizileri elektronun açısal momentumuna, bugünkü ℓ = 0, 1, 2, 3 değerlerine bağlayınca baş harfler kaldı. f'den sonrası için yeni bir hikâye uydurulmadı: harfler alfabetik sürer, g, h …",
    },
    {
      title: "Bohr'un yarıçapı geri döndü",
      body: "Kuantum mekaniği Bohr'un yörüngesini yıktı ama sayısını korudu. Hidrojenin 1s elektronunu çekirdekten r uzaklıktaki ince bir küresel kabukta bulma olasılığı, kabuğun alanı (r² ile büyür) ile yoğunluğun (üstel olarak azalır) çarpımıdır ve tam r = a₀ = 52,9 pm'de en büyük olur: Bohr'un 1913'teki ilk yörünge yarıçapı. Yine de elektron oraya bağlı değildir; a₀'dan daha yakında bulunma olasılığı yalnızca yaklaşık %32'dir, %90'ı içine almak için 2,661 a₀, yani yaklaşık 141 pm'lik bir küre gerekir.",
    },
    {
      title: "Havadaki argonu s elektronları yaptı",
      body: "Çekirdeğin tam üstünde yoğunluğu sıfır olmayan tek orbitaller s orbitalleridir; bu yüzden bazı çekirdekler kendi elektronunu yutabilir. Bu <strong>elektron yakalama</strong>da elektron çoğunlukla en içteki 1s'den gelir, bir proton nötrona döner. Potasyum-40 bozunmalarının yaklaşık onda birinde böylece argon-40'a dönüşür; geri kalanında beta bozunmasıyla kalsiyum-40 olur. Atmosferin %0,93'ünü oluşturan argonun neredeyse tamamı, yer kabuğunda bu yolla üretilmiş argon-40'tır.",
    },
  ],
  worked: {
    title: "Hα çizgisi: indirgenmiş kütle ve izotop kayması",
    prompt:
      "Hidrojenin n = 3 → 2 geçişinin (Hα) vakum dalga boyunu önce sonsuz ağır çekirdekle, sonra indirgenmiş kütleyle hesapla. Döteryumda çizgi ne kadar kayar? R∞ = 10.973.731,568 m⁻¹, m<sub>p</sub>/mₑ = 1836,1527, m<sub>d</sub>/mₑ = 3670,4830 al. Sonuçları <strong>04 · Enerji ve spektrum</strong> sekmesinde <strong>Çekirdek kütlesi</strong> menüsüyle sına.",
    steps: [
      "Dalga sayısı: 1/λ = R∞(1/2² − 1/3²) = R∞·(5/36) = 10.973.731,568 m⁻¹ × 0,138889 = 1.524.129,4 m⁻¹. Sonsuz ağır çekirdekte λ∞ = 1/(1.524.129,4 m⁻¹) = 6,56112·10⁻⁷ m = 656,112 nm.",
      "Hidrojenin indirgenmiş kütlesi: μ/mₑ = 1/(1 + mₑ/m<sub>p</sub>) = 1/(1 + 1/1836,1527) = 0,99945568. Dalga sayısı bu oranla küçülür, dalga boyu büyür: λ<sub>H</sub> = 656,112 nm / 0,99945568 = 656,470 nm. Fark 0,357 nm, yani yaklaşık mₑ/m<sub>p</sub> = %0,054.",
      "Döteryum: μ/mₑ = 1/(1 + 1/3670,4830) = 0,99972763, λ<sub>D</sub> = 656,112 nm / 0,99972763 = 656,291 nm. İzotop kayması λ<sub>H</sub> − λ<sub>D</sub> ≈ 0,179 nm. Kısa yoldan: Δλ/λ ≈ mₑ/m<sub>p</sub> − mₑ/m<sub>d</sub> = 0,0005446 − 0,0002724 = 0,0002722; 656,47 nm × 0,0002722 ≈ 0,179 nm.",
      "Ölçümle karşılaştır: NIST, Hα'yı havada 656,279 ± 0,003 nm verir. Havanın kırılma indisi bu dalga boyunda yaklaşık 1,000276'dır, 656,470 nm / 1,000276 ≈ 656,288 nm; sayfa da '656,470 nm / 656,288 nm' yazar. NIST'in 656,279 nm'si ince yapı bileşenlerinin ayrılamayan karışımıdır; kalan +0,009 nm, Bohr formülünün içermediği bu ince yapıdan gelir.",
    ],
    result:
      "λ∞ = 656,112 nm, λ<sub>H</sub> = 656,470 nm (vakum), λ<sub>D</sub> = 656,291 nm; izotop kayması ≈ 0,18 nm. Çekirdeğin sonlu kütlesi ölçümün yüz katı büyüklüğünde bir etkidir; ince yapı ise birkaç pikometrelik bir etki.",
  },
  misconceptions: [
    {
      myth: "Elektron çekirdeğin etrafında gezegen gibi belirli bir yörüngede döner.",
      truth:
        "Orbital bir yol değil, bir olasılık dağılımıdır; elektronun konumu ölçülene kadar belirli değildir. Daha da çarpıcısı: 1s'te ℓ = 0'dır, yani elektronun yörüngesel açısal momentumu sıfırdır. Temel durumdaki hidrojen elektronu çekirdeğin çevresinde hiçbir anlamda dolanmaz; spin ise elektronun ayrı, iç bir özelliğidir. Bohr'un yörüngeleri doğru enerjileri veren tarihsel bir basamaktır, gerçek bir yol değil.",
    },
    {
      myth: "Bohr yarıçapı elektronun ortalama uzaklığıdır ve her orbitalin tepesi n²a₀'dadır.",
      truth:
        "a₀ 1s'in en olası uzaklığıdır; ortalama uzaklık 1,5 a₀'dır, çünkü P(r)'nin dışa doğru uzun bir kuyruğu vardır. n²a₀/Z yalnız ℓ = n − 1 durumlarında tepeye denk gelir: 2p'nin tepesi 4 a₀'da, ama 2s'inki 5,2361 a₀'da ve 4s'inki 24,6181 a₀'da. Sayfanın radyal tablosu bunu bütün n ≤ 4 durumları için yan yana gösterir.",
    },
    {
      myth: "Orbitalin çizilen yüzeyi bir duvardır; elektron o balonun içinde kalır.",
      truth:
        "Dalga fonksiyonu çekirdekten uzaklaştıkça hızla küçülür ama hiçbir yerde birden sıfıra inmez. Kitaplardaki yüzeyler olasılığın %90'ını kapsayacak biçimde seçilir; hidrojen 1s için bu küre 2,661 a₀, yaklaşık 141 pm yarıçaplıdır ve ölçümlerin %10'unda elektron bu kürenin dışında bulunur. Sayfadaki nokta bulutunda da keskin bir kenar yoktur: noktalar dışa doğru giderek seyrelir.",
    },
    {
      myth: "Turkuaz ve turuncu loblar artı ve eksi elektrik yükünü gösterir.",
      truth:
        "Renkler dalga fonksiyonunun işaretini, yani fazını gösterir. Olasılık |ψ|² her iki lobda da pozitiftir ve elektron her yerde aynı eksi yüke sahiptir. İşaretin kendisi de bir uzlaşımdır: sayfa Condon–Shortley çarpanını kullanmadığı için bazı lobların rengi başka kitaplardakinin tersi olabilir, düğümler değişmez. İşaret, iki atomun orbitalleri üst üste bindiğinde önem kazanır: aynı işaretli loblar birbirini güçlendirir ve bağ oluşur.",
    },
  ],
  glossary: [
    {
      term: "Orbital",
      definition:
        "Tek elektronlu bir atomda elektronun izinli durumunu betimleyen dalga fonksiyonu; çok elektronlu atomlarda aynı ad bir yaklaşımın tek elektronlu durumları için kullanılır.",
    },
    {
      term: "Dalga fonksiyonu (ψ)",
      definition:
        "Uzayın her noktasına bir sayı (genelde karmaşık; sayfadaki gerçel orbitallerde artı ya da eksi) atayarak bir kuantum durumunu tam olarak tanımlayan fonksiyon.",
    },
    {
      term: "Radyal olasılık yoğunluğu P(r)",
      definition:
        "Elektronu çekirdekten r ile r + dr arasındaki ince kabukta bulma olasılığının dr'ye oranı; P(r) = r²R(r)².",
    },
    {
      term: "Küresel harmonik",
      definition:
        "Dalga fonksiyonunun yöne bağlı kısmı Y<sub>ℓm</sub>(θ, φ); açısal düğümleri ve lobların düzenini belirler.",
    },
    {
      term: "Düğüm",
      definition:
        "Dalga fonksiyonunun sıfır olduğu ve işaret değiştirdiği yüzey; orada elektron bulma olasılığı sıfırdır.",
    },
    {
      term: "İndirgenmiş kütle",
      definition:
        "İki cisimli hareketi tek cisme indirgeyen μ = mₑM/(mₑ + M) kütlesi; hidrojende mₑ'nin 0,99945568 katıdır.",
    },
    {
      term: "İnce yapı",
      definition:
        "Göreli etkiler ve spin–yörünge etkileşimi nedeniyle aynı n'deki düzeylerin (Zα)² mertebesinde ayrılması.",
    },
    {
      term: "Perdeleme",
      definition:
        "Çok elektronlu atomda iç elektronların çekirdek yükünün bir kısmını dış elektrondan gizlemesi; elektron çekirdeğin gerçek yükü yerine etkin bir yük görür.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Modern Fizik</strong> ve <strong>Kuantum Mekaniği I</strong> derslerinde hidrojen atomu bir <strong>özdeğer probleminin</strong> çözümü olarak kurulur. Schrödinger denklemi küresel koordinatlarda üç parçaya ayrılır: φ denklemi m'yi, θ denklemi Legendre fonksiyonlarını ve ℓ'yi, radyal denklem genelleştirilmiş Laguerre polinomlarını ve n'yi verir; sayfadaki formül kutusu tam bu çözümü yazar. Açısal kısmın çözümleri <em>küresel harmonikler</em>dir; aynı fonksiyonlar Dünya'nın çekim alanının haritalanmasında, kozmik mikrodalga arka plan ışımasının analizinde ve bilgisayar grafiklerinde ışıklandırma hesabında karşına çıkar. Açısal momentumun büyüklüğü √(ℓ(ℓ + 1))·ħ olarak çıkar; 1s'te sıfırdır. 1928'de Paul Dirac denklemi görelilikle birleştirdi ve Pauli'nin el yordamıyla eklediği spin, denklemden kendiliğinden doğdu; sayfanın 'ince yapılı model' sütunu bu kuramın birinci mertebe sonucunu kullanır.",
      "Birden fazla elektron olunca, yani daha helyumda, denklemin tam çözümü yoktur; kimyacılar Hartree–Fock ve yoğunluk fonksiyonel teorisi (DFT) gibi yaklaşık yöntemlerle orbitalleri bilgisayarda hesaplar ve bugün ilaç molekülleri ile pil malzemeleri bu hesaplarla taranır. Bu yaklaşımlarda her elektron tek elektronlu bir durum gibi ele alınır, ama çok elektronlu dalga fonksiyonu kendi başına bir fonksiyondur. Atomlar birleşince orbitaller de birleşir: aynı işaretli loblar üst üste binince bağ oluşur; karbonun bir s ve üç p orbitali karışarak metanın 109,5°'lik dört kolunu verir (<em>hibritleşme</em>). Molekül orbital teorisi, sıvı oksijenin bir mıknatısın kutupları arasında neden asılı kaldığını açıklar. Geçiş metali bileşiklerinde ise çevredeki atomlar beş d orbitalinin enerjisini ayırır; yakutun kırmızısı, krom iyonunun bu ayrılmış d düzeyleri arasındaki ışık soğurmasından gelir.",
    ],
    topics: [
      "Küresel koordinatlarda değişkenlere ayırma",
      "Küresel harmonikler ve Laguerre polinomları",
      "Açısal momentum ve spin",
      "İnce yapı, Lamb kayması ve kuantum elektrodinamiği",
      "Hartree–Fock ve yoğunluk fonksiyonel teorisi",
      "Hibritleşme ve molekül orbital teorisi",
    ],
  },
  quiz: [
    {
      question:
        "Hidrojenin 1s durumunda en olası uzaklık a₀, enerji −13,6 eV'tur. Tek elektronlu He⁺ iyonunda (Z = 2) bu iki değer ne olur?",
      options: [
        "2a₀ ve −27,2 eV",
        "a₀/2 ve −27,2 eV",
        "a₀/2 ve −54,4 eV",
        "a₀/4 ve −54,4 eV",
      ],
      answer: 2,
      explanation:
        "Çekirdek yükü Z kat artınca Coulomb çekimi güçlenir: bütün uzunluklar 1/Z, enerji Z² ile ölçeklenir (E = −13,6 eV·Z²/n²). He⁺ 1s'in tepesi a₀/2'de, enerjisi 4 × (−13,6) = −54,4 eV'tadır. Radyal sekmede Z'yi 2 yaptığında '0,5000 / 0,5000 a₀' ve '−54,4228 eV' görürsün.",
    },
    {
      question: "3p orbitalinde kaç radyal ve kaç açısal düğüm vardır?",
      options: [
        "0 radyal, 2 açısal",
        "1 radyal, 1 açısal",
        "2 radyal, 0 açısal",
        "1 radyal, 2 açısal",
      ],
      answer: 1,
      explanation:
        "p için ℓ = 1, yani bir açısal düğüm (lobları ayıran düzlem). Radyal düğüm n − ℓ − 1 = 3 − 1 − 1 = 1; toplam n − 1 = 2. Radyal sekmede n = 3, ℓ = 1 seçince düğüm kartı '1 / 1' ve r = 6,0000 a₀ yazar: her lobu içten ve dıştan iki parçaya ayıran bir küre.",
    },
    {
      question:
        "Hidrojenin Hα çizgisi, sonsuz ağır çekirdek modelinde ölçülenden yaklaşık 0,35 nm kısa çıkar. Döteronun kütlesi protonunkinin yaklaşık iki katıdır. Döteryumun Hα çizgisi hidrojeninkine göre nerede olur?",
      options: [
        "Aynı yerde, çünkü çekirdek yükü aynıdır",
        "Yaklaşık 0,18 nm daha kısa dalga boyunda",
        "Yaklaşık 0,35 nm daha uzun dalga boyunda",
        "Yaklaşık 0,7 nm daha kısa dalga boyunda",
      ],
      answer: 1,
      explanation:
        "Dalga boyu sonsuz kütle değerinden yaklaşık mₑ/M oranında uzar. Hidrojende bu oran 1/1836, döteryumda bunun yaklaşık yarısıdır; döteryum çizgisi sonsuz kütle değerine iki kat daha yakın düşer, yani hidrojeninkinden yaklaşık 0,36/2 ≈ 0,18 nm kısa olur. Sayfa '0,1785 nm daha kısadır' yazar.",
    },
  ],
  next: [
    {
      href: "periyodik-tablo.html",
      title: "Periyodik Tablo Laboratuvarı",
      why: "Kesin çözümün bittiği yerden devam et: elektron dizilimini Madelung kuralıyla kur, istisnalarını gör ve Slater kurallarıyla perdelenmiş etkin çekirdek yükünü hesapla.",
    },
    {
      href: "kuantum-dalga.html",
      title: "Kuantum Dalga Fonksiyonu: Kuyular, Süperpozisyon ve Tünelleme",
      why: "Aynı Schrödinger denklemi tek boyutta: nanometrelik kuyularda enerjinin basamaklara bölündüğünü, iki durum karışınca olasılığın çalkalandığını ve tünellemeyi izle.",
    },
    {
      href: "fotoelektrik.html",
      title: "Fotoelektrik Olay: Planck Sabitini Ölç",
      why: "Spektrum çizgilerindeki E = hν bağıntısının deneysel kökü: birkaç renk ve bir gerilim kaynağıyla Planck sabitini kendin ölç.",
    },
    {
      href: "molekul-sekli.html",
      title: "Molekül Şekli (VSEPR)",
      why: "Orbitaller bağ kurunca: elektron bölgelerinin birbirini itmesinden bağ açılarını ölç, ortaklanmamış çiftlerin açıları nasıl sıkıştırdığını gör.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Volume 3, 8.1 The Hydrogen Atom",
      url: "https://openstax.org/books/university-physics-volume-3/pages/8-1-the-hydrogen-atom",
      note: "Hidrojen için Schrödinger denkleminin değişkenlerine ayrılması, n, ℓ, m sayılarının anlamı ve radyal olasılık yoğunluğu (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · Chemistry 2e, 6.3 Development of Quantum Theory",
      url: "https://openstax.org/books/chemistry-2e/pages/6-3-development-of-quantum-theory",
      note: "de Broglie dalgaları, Schrödinger denklemi, dört kuantum sayısı ve s, p, d, f orbital biçimleri (İngilizce, açık ders kitabı).",
    },
    {
      title: "NIST Atomic Spectra Database · H I çizgileri",
      url: "https://physics.nist.gov/PhysRefData/ASD/lines_form.html",
      note: "Sayfanın Balmer tablosundaki gözlenen hava dalga boyları ve ince yapı bileşenleri bu veritabanından alınmıştır.",
    },
    {
      title: "Wikipedia · Atomic orbital",
      url: "https://en.wikipedia.org/wiki/Atomic_orbital",
      note: "Gerçel orbitallerin biçimleri, s-p-d-f adlarının spektroskopi kökeni ve Mulliken'in 'orbital' terimi (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
