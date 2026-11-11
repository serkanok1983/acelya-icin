window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["elektrokimya"] = {
  slug: "elektrokimya",
  title: "Elektrokimya: Pilin İçindeki Merdiven",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "İki yarı hücreden pil kur, derişimle gerilimi kaydır, elektrolizde yükü grama çevir ve bir Daniell pilini bitene kadar boşalt: gerilim bir basamak farkıdır, akan yük ise atomları sayar.",
  hook:
    "Bir pil neden yavaş yavaş değil de birdenbire biter? Bu sayfadaki çinko-bakır hücresi +1.099 V ile başlar; bakır çözeltisini on bin kat seyreltsen bile voltmetre +0.980 V gösterir. Dördüncü sekmede aynı pil iki gün boyunca 0.9 voltun altına inmez, sonra tek adımda sıfıra düşer. Cevap bir logaritmada saklı.",
  bigIdea:
    "Hücre gerilimi, iki yarı tepkimenin indirgenme potansiyelleri arasındaki farktır ve derişimle yalnızca logaritmik olarak kayar (<em>E = E° − (RT/nF) ln Q</em>); telden geçen yük ise tepkimeye giren maddeyi sayar: her mol elektron 96485 C eder.",
  story: [
    "1780'lerde Bolonya'da anatomi profesörü Luigi Galvani, kesilmiş kurbağa bacaklarının iki farklı metale aynı anda dokununca seğirdiğini gördü ve 1791'de bunu 'hayvansal elektrik' olarak yayımladı: kas, kendi elektriğini üretiyordu. Pavia'da fizikçi Alessandro Volta buna inanmadı. Ona göre elektriğin kaynağı kurbağa değil, iki farklı metalin nemli bir iletken üzerinden temasıydı; kurbağa yalnızca hassas bir ölçü aletiydi. Tartışmayı kazanmanın yolu kurbağasız bir düzenekti. 20 Mart 1800'de Volta, Londra'daki Royal Society'nin başkanı Joseph Banks'e yazdığı mektupta çinko ve gümüş (ya da bakır) diskleri, aralarına tuzlu suya batırılmış karton koyarak üst üste dizdiği 'yığın'ı anlattı. Bu, insanlığın ilk sürekli akım kaynağıydı: sürtünme elektriği bir kıvılcımda boşalıp biterken yığın akım vermeyi sürdürüyordu.",
    "Sonrası baş döndürücüdür. Mektubun Royal Society'de okunması haziranı buldu, ama William Nicholson ve Anthony Carlisle daha mayıs başında Londra'da kendi yığınlarını kurup suyu hidrojen ve oksijene ayırmışlardı. 1807'de Humphry Davy, Royal Institution'daki büyük pil bataryasıyla erimiş potası elektrolize edip o güne kadar kimsenin görmediği bir metali, potasyumu açığa çıkardı; birkaç gün sonra da sodyumu. 1833–34'te Michael Faraday, elektrolizde açığa çıkan madde miktarının geçen yükle doğru orantılı olduğunu ölçtü ve bugün kullandığımız sözcükleri dolaşıma soktu: <strong>elektrot</strong>, <strong>elektrolit</strong>, <strong>anot</strong>, <strong>katot</strong> ve <strong>iyon</strong> 1834'ün ürünüdür; son üçünü, danıştığı Cambridge'li bilgin William Whewell önermişti. Bir not: 1930'larda Bağdat yakınlarında bulunan, içinde bakır silindir ve demir çubuk olan kil kavanozun 'antik pil' olduğu anlatılır; ama yanında ne tel ne de başka bir iletken bulunmuştur ve arkeologların çoğu kavanozu bir saklama kabı sayar. Eldeki kanıt, Volta'dan önce bir pil olduğunu göstermiyor.",
    "Volta'nın yığınının bir derdi vardı: akım çekildikçe gerilimi hızla düşüyordu. Gümüş ya da bakır yüzeyde biriken hidrojen kabarcıkları elektrodu yalıtıyordu (buna <strong>polarizasyon</strong> denir). 1836'da Londra'da King's College profesörü John Frederic Daniell çözümü buldu: iki ayrı çözelti ve aralarında iyonları geçiren bir bölme. Bakır bir kabın içinde bakır sülfat çözeltisi, ortasında çinko çubuk ve onu saran seyreltik asit duruyordu; ikisini ilk tasarımda bir öküz yemek borusu, sonraki sürümlerde gözenekli toprak kap ayırdı, asidin yerini de zamanla çinko sülfat aldı. Artık katotta yalıtkan hidrojen değil, iletken bakır birikiyordu ve pil saatlerce yaklaşık 1.1 volt veriyordu. Daniell pili telgraf ağlarının ilk güç kaynaklarından oldu. Sayfanın ilk sekmesindeki şema bu pilin ders kitabı biçimidir: gözenekli kabın yerini bir tuz köprüsü almış, voltmetre +1.099 V gösteriyor.",
    "Peki bu 1.1 volt nereden gelir? Tek bir yarı tepkimeye kendi başına gerilim atanamaz; ölçülebilen hep bir farktır. Kimyacılar bu yüzden bir sıfır noktası seçti: standart hidrojen elektrodu, uzlaşmayla tam 0 V. Öteki her yarı tepkime ona göre ölçülür ve ilk sekmenin altındaki tablo, yani merdiven ortaya çıkar. 1889'da Walther Nernst, gerilimin derişimle nasıl değiştiğini veren denklemi yazdı; ikinci sekmede o denklemin eğimini iki voltmetre okumasından kendin ölçersin. Sayfadaki tablo magnezyumda (−2.372 V) biter; aynı OpenStax tablosunda daha da aşağıda, −3.04 V'ta lityum durur ve bugünün hikâyesi odur: 2019 Nobel Kimya Ödülü, lityum iyon pilini geliştiren John Goodenough, Stanley Whittingham ve Akira Yoshino'ya verildi. Telefonundaki hücre sulu çözeltiyle çalışmaz, ama 3.7 voltu aynı fikirden gelir: birbirinden uzak iki basamak arasındaki fark.",
  ],
  core: [
    {
      heading: "Redoks: elektron el değiştirir",
      body:
        "Bir çinko parçasını bakır sülfat çözeltisine atarsan dakikalar içinde üstü koyu kızıl bir bakır tabakasıyla kaplanır ve çözeltinin mavisi solar: Zn atomları elektron verip Zn²⁺ olarak çözünür, Cu²⁺ iyonları elektron alıp metal bakır olarak çöker. Elektron verme olayına <strong>yükseltgenme</strong>, alma olayına <strong>indirgenme</strong> denir; ikisi aynı anda olmak zorundadır, elektron ortada kalmaz. Bu deneyde enerji ısı olarak dağılır. Galvanik hücrenin numarası, iki yarıyı ayrı kaplara koyup elektronları bir telden geçmeye zorlamaktır: aynı tepkime, ama bu kez elektronlar yolda iş yapar. İki kabı bir <strong>tuz köprüsü</strong> bağlar; telde elektronlar, çözeltide ve köprüde iyonlar yük taşır. Şemadaki turuncu noktaların yalnız telde, mavi ve kırmızı noktaların yalnız köprüde ilerlemesi bu yüzdendir.",
      formula: "Zn(k) + Cu²⁺ → Zn²⁺ + Cu(k)",
      formulaNote: "İlk sekmedeki 'Net' satırı. Anot yarı tepkimesi 2 elektron verir, katot yarı tepkimesi 2 elektron alır (n = 2); atom sayısı da toplam yük de iki yanda eşittir.",
    },
    {
      heading: "Merdiven: standart indirgenme potansiyeli",
      body:
        "İlk sekmenin altındaki tabloda dokuz yarı tepkime indirgenme yönünde yazılmış ve bir voltaj basamağına yerleştirilmiştir: en üstte +0.7996 V ile gümüş, en altta −2.372 V ile magnezyum. Basamak yüksekse o iyon elektronu kuvvetle çeker (iyi yükseltgen); basamak düşükse metal elektronunu kolayca bırakır (iyi indirgen). Sıfır noktası bir ölçüm değil bir uzlaşmadır: 2H⁺ + 2e⁻ → H₂ için E° = 0.00 V. İki yarı hücre bağlanınca elektron alçak basamaktaki metalden yüksek basamaktaki iyona akar; hücre gerilimi iki basamak arasındaki mesafedir. Daniell pilinde +0.337 − (−0.7618) = 1.0988 V; sayfa bunu +1.099 V diye yazar. Pek çok ders kitabındaki 1.10 V, aynı sayının iki ondalığa yuvarlanmış hâlidir. Sol kaba yüksek basamağı yazarsan fark eksi çıkar: bu bir hata değil, tepkimenin yazdığın yönde kendiliğinden yürümediğinin haberidir.",
      formula: "E°<sub>hücre</sub> = E°<sub>katot</sub> − E°<sub>anot</sub>",
      formulaNote: "İki değer de tablodaki indirgenme potansiyelidir (sayfa ikisini de E°<sub>ind</sub> diye etiketler). Anodun işaretini ayrıca çevirme; çıkarma işlemi bunu zaten yapar.",
    },
    {
      heading: "Gerilim yoğun bir niceliktir: ΔG° = −nFE°",
      body:
        "Sol kaba Zn, sağ kaba Ag yazınca katot satırı '2Ag⁺ + 2e⁻ → 2Ag(k)' olur; ama yanındaki değer hâlâ +0.800 V'tur, 1.600 değil. Çünkü potansiyel, <em>birim yük başına</em> enerjidir (1 V = 1 J/C): tepkimeyi ikiyle çarpmak enerjiyi de aktarılan yükü de ikiyle çarpar, oran değişmez. Sıcaklık ya da yoğunluk gibi, miktara bağlı olmayan bir ölçüdür. Toplam enerji ise miktara bağlıdır: n mol elektron nF kadar yük taşır ve bu yük E° gerilimi boyunca en çok nFE° kadar iş yapar. Sabit sıcaklık ve basınçta alınabilecek en büyük elektrik işi Gibbs enerjisindeki azalmaya eşit olduğundan ΔG° = −nFE° çıkar. F, <strong>Faraday sabiti</strong>dir: bir mol elektronun yükü, 96485 C/mol. Al | Cu çiftinde n = 6 olduğu için +1.999 V'luk gerilim, yazıldığı biçimiyle tepkimenin molü başına −1157.2 kJ demektir; n = 2 olan Mg | Ag çifti +3.172 V verdiği hâlde −612.0 kJ/mol'de kalır.",
      formula: "ΔG° = −nFE°",
      formulaNote: "Daniell pili için n = 2: ΔG° = −2 × 96485 C/mol × 1.0988 V = −212.0 kJ/mol; sayfadaki ΔG° kartı bunu gösterir. Negatif ΔG° ile pozitif E° aynı şeyi söyler.",
    },
    {
      heading: "Nernst denklemi: Q, K ve gerilimin işareti",
      body:
        "Tablodaki sayılar 1 molar çözeltiler içindir. Başka derişimlerde Gibbs enerjisi ΔG = ΔG° + RT ln Q olur; Q <strong>tepkime oranı</strong>dır, Daniell pilinde [Zn²⁺]/[Cu²⁺] (saf katılar ifadeye girmez). İki yana ΔG = −nFE ve ΔG° = −nFE° yazıp −nF'ye bölersen Nernst denklemi çıkar. 25 °C'de RT/F = 25.69 mV'tur; ln 10 = 2.303 ile çarpınca 59.16 mV eder. Derişim oranındaki her onluk gerilimi 59.16/n mV oynatır: n = 2 için 29.58 mV. Bu yüzden [Cu²⁺] on bin kat seyrelince gerilim yalnız 4 × 29.58 ≈ 118 mV düşer. E = 0 koyarsan dengeyi bulursun: Q = K ve K = e<sup>nFE°/RT</sup>. Daniell pilinde K = 1.40×10³⁷ çıkar; E°'si yalnız +0.131 V olan Ni | Pb çiftinde K = 2.64×10⁴'tür ve Q'yu bunun üstüne çıkarmak, yani tepkimeyi ters çevirmek kaydırıcıyla mümkündür. Modelin sınırı: derişim yerine aslında etkinlik (aktivite) yazılmalıdır, 1 M çözeltide sapma belirgindir; sayfa ayrıca E° değerlerini sıcaklıkla değiştirmez.",
      formula: "E = E° − (RT/nF)·ln Q = E° − (59.16 mV / n)·log Q   (25 °C)",
      formulaNote: "Q < K ise E > 0 ve tepkime yazılan yönde yürür; Q > K ise E < 0, kendiliğinden yürüyen ters yöndür; Q = K ise E = 0. Katsayı sıcaklıkla orantılıdır: 75 °C'de 59.16 yerine 69.08 mV.",
    },
    {
      heading: "Faraday yasası: yük madde sayar",
      body:
        "Gerilim 'ne kadar istekli' sorusunu yanıtlar; 'ne kadar madde' sorusunun cevabı yüktedir. Her elektron bir temel yük taşıdığından geçen yükü saymak elektronları saymaktır: n(e⁻) = q/F. z elektron alan bir iyondan q/(zF) mol indirgenir, kütlesi m = M·q/(zF) olur. Aynı 96485 C bir mol gümüş (107.87 g), yarım mol bakır (31.77 g) ya da üçte bir mol alüminyum (8.99 g) bırakır: kütle M/z ile orantılıdır. Yükün kendisi bir integraldir, q = ∫ I dt; ders kitabındaki m = M·I·t/(zF) yalnız akım sabitken doğrudur. Üçüncü sekme yükü 1 saniyelik adımlarla toplar ve akım doğrusal azaldığında sabit akım formülünün tam iki kat fazla söylediğini gösterir. Aynı sayım pili de sınırlar: bir Daniell pilinin verebileceği yük en çok 2F × (sınırlayıcı bileşenin molü) kadardır. Model akım verimini %100 alır; gerçek hücrede yan tepkimeler yükün bir kısmını yer.",
      formula: "q = ∫ I dt,   m = M·q / (zF)",
      formulaNote: "M mol kütlesi (g/mol), z iyon başına elektron sayısı, F = 96485 C/mol. 2.0 A sabit akım 30 dakikada 3600 C eder: 3600 × 63.546 / (2 × 96485) = 1.185 g bakır.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvardır. <strong>01 · Galvanik hücre</strong>: iki menüden <strong>Sol kap</strong> (anot yazılan) ve <strong>Sağ kap</strong> (katot yazılan) yarı hücrelerini seçersin; iki logaritmik derişim kaydırıcısı (10⁻⁶ M ile 1 M arası), <strong>Sıcaklık T</strong> ve <strong>yük direnci R</strong> menüsü (22 Ω, 100 Ω, 470 Ω, açık devre) vardır. Kartlar E°, Q, Nernst gerilimi E, K, ΔG ve akımı verir; ölçülen akım, dirençten geçen turuncu noktaların (her biri 10 mC) sayımıdır. <strong>02 · Nernst ve derişim hücresi</strong>: aynı metalden iki kap, c₁ ve c₂ kaydırıcıları, 0.1 mV çözünürlüklü bir voltmetre ve iki okumayı saklayan <strong>A olarak kaydet</strong> / <strong>B olarak kaydet</strong> düğmeleri. <strong>03 · Elektroliz (Faraday)</strong>: katot tepkimesi, <strong>Akım I₀</strong>, <strong>Hedef süre</strong>, <strong>Hücre gerilimi V</strong> ve <strong>Akım biçimi</strong>; <strong>Başlat</strong> ya da <strong>Hedefe kadar hesapla</strong>. <strong>04 · Pil boşalması</strong>: hacim, başlangıç derişimleri, <strong>Çinko elektrot kütlesi</strong> ve <strong>Yük direnci R</strong>; <strong>Sonuna kadar hesapla</strong> günler süren boşalmayı anında bitirir. Her sekmenin kendi sıfırlama düğmesi vardır; R tuşu da etkin sekmeyi sıfırlar. Model bir denge termodinamiği ve yük sayımı modelidir: iç direnç, aşırı gerilim ve etkinlik katsayıları yoktur; sayfa bunu her sekmede açıkça yazar.",
    experiments: [
      {
        title: "İşaret bir yöndür: çevir, dengele, ters döndür",
        predict: "Çinkoyu katot, bakırı anot diye yazarsan voltmetre ne gösterir; akım durur mu? E° değeri pozitif olan bir çift (Ni | Pb, +0.131 V) yalnızca derişim değiştirilerek ters yöne döndürülebilir mi?",
        do: "01 · Galvanik hücre sekmesi açılışta Zn | Cu, iki kap 1.00 M, 25 °C ve 100 Ω ile gelir; kartları oku. <strong>Yönü çevir</strong> düğmesine bas. Sonra <strong>Dengeye getir (Ni | Pb)</strong> düğmesine bas ve Sağ kap [Pb²⁺] kaydırıcısını 1.00×10⁻⁵ M'ye çek.",
        observe: "Açılışta E°<sub>hücre</sub> +1.099 V, Q 1.00, E +1.099 V, K 1.40×10³⁷, ΔG −212.0 kJ/mol; kuram akımı da birkaç saniye sonra ölçülen akım da 11.0 mA, fark 0.0000 %. Çevirince E −1.099 V, ΔG +212.0 kJ/mol, K 7.13×10⁻³⁸, akım '−11.0 mA (ters yön)'; noktalar yine çinkodan bakıra, bu kez sağdan sola akar. Ni | Pb hazır ayarında [Pb²⁺] 3.80×10⁻⁵ M, Q 2.63×10⁴, K 2.64×10⁴, E 0.000 V, ΔG 0.0 kJ/mol, ΔG° −25.2 kJ/mol; durum satırı 'Dengede' der, 'Q / K = 0.996' ve 'kalan gerilim +0.06 mV' diye ekler. [Pb²⁺] 1.00×10⁻⁵ M olunca Q 1.00×10⁵, E −0.017 V, ΔG +3.3 kJ/mol.",
        explain: "Kaplara ne yazdığın elektronların umurunda değildir: çinko iki durumda da yükseltgenir, E'nin işareti yalnızca yazdığın yönün doğru olup olmadığını söyler. Eksi gerilim, o yönü ancak en az 1.099 V'luk bir dış kaynağın zorlayabileceği anlamına gelir; bunun adı elektrolizdir. Ni | Pb ise yönü E°'nin değil E'nin belirlediğini gösterir: Q, K'yi aşınca aynı çift ters döner. Q'nun K'ye tam değmemesi kaydırıcının 0.01'lik adımındandır. Ölçülen akımın kuramla tam çakışması sıradandır, çünkü bu sekmede derişimler tükenmez; iç direnç olmadığından I = E/R gerçek pil için bir üst sınırdır.",
      },
      {
        title: "On bin kat seyrelt, sonra eğimi kendin ölç",
        predict: "Daniell pilinde [Cu²⁺] 1.00 M'den 1.00×10⁻⁴ M'ye inerse gerilim yarıya mı düşer? Bakır derişim hücresinde derişim oranı on kat değişince voltmetre kaç mV oynar; metal gümüş olsaydı?",
        do: "01'de <strong>Hücreyi sıfırla</strong>, Sağ kap [Cu²⁺] kaydırıcısını 1.00×10⁻⁴ M'ye çek ve E kartını oku. 02 · Nernst ve derişim hücresi sekmesine geç: açılış ayarında (Cu, c₁ = 0.0100 M, c₂ = 1.00 M) <strong>A olarak kaydet</strong>; c₁'i 0.100 M yap, <strong>B olarak kaydet</strong>. Sonra metal menüsünden Ag | Ag⁺ (n = 1) seç, c₁'i yeniden 0.0100 M yap ve aynı iki kaydı al.",
        observe: "01'de Q 1.00×10⁴, E +0.980 V, akım 9.80 mA, ΔG −189.2 kJ/mol: on bin kat seyrelme yalnız 0.12 V kadar götürür. 02'de Kayıt A '−2.00 ; +59.2 mV', Kayıt B '−1.00 ; +29.6 mV'; ölçülen eğim −29.60 mV/onluk, kuram −29.58 mV/onluk, fark −0.0687 %. Gümüşte A '−2.00 ; +118.3 mV', B '−1.00 ; +59.2 mV'; eğim −59.10'a karşı kuram −59.16 mV/onluk, fark +0.1003 %.",
        explain: "Gerilim derişimin kendisine değil logaritmasına bağlıdır: 25 °C'de onluk başına 59.16/n mV. Bakırda n = 2 olduğu için 29.58, gümüşte n = 1 olduğu için 59.16 mV. Derişim hücresinde E° sıfırdır; gerilimi doğuran şey iki çözeltinin eşitlenme eğilimidir, <strong>Derişimleri eşitle</strong> düğmesine basınca voltmetre 0.0 mV'a iner. Binde birlik fark fizikten değil ölçmeden gelir: voltmetre 0.1 mV'a yuvarlar ve yalnız bir onluk açtığın için bu yuvarlama eğime olduğu gibi yansır. B'yi c₁ = 1.00×10⁻⁶ M'de kaydedersen ('−6.00 ; +177.5 mV') kaldıraç kolu dört onluğa uzar ve fark +0.0158 %'ye iner.",
      },
      {
        title: "Aynı yük, farklı kütleler; formülün sessiz koşulu",
        predict: "2.0 A akım 30 dakika boyunca geçerse bakır, gümüş ve alüminyumdan hangisi en çok birikir; kütleler arasındaki oran ne olur? Akım 2.0 A'dan sıfıra doğrusal inseydi m = M·I·t/(zF) formülü yine tutar mıydı?",
        do: "03 · Elektroliz (Faraday) sekmesinde açılış ayarıyla (Bakır, 2.0 A, 30 dk, 2.0 V) <strong>Hedefe kadar hesapla</strong> düğmesine bas. <strong>Katot tepkimesi</strong> menüsünden sırayla Gümüş, Alüminyum (erimiş tuz) ve Su seç; her birinde yeniden hesapla. Bakıra dön, <strong>Akım biçimi</strong> menüsünden 'Doğrusal azalan: I₀'dan sıfıra' seç ve yeniden hesapla.",
        observe: "Bakır: geçen yük 3600.0 C, biriken Cu 1.185 g, kuram 1.185 g, fark 0.0000 %, enerji '7200 J = 2.00 Wh', geçen elektron 0.0373 mol e⁻. Gümüş 4.025 g, alüminyum 0.3356 g. Suda 0.03761 g H₂ açığa çıkar; gaz hacmi kartı 25 °C ve 1 atm için 'H₂ 0.456 L · O₂ 0.228 L' yazar. Azalan akımda bakır için yük 1800.0 C, kütle 0.5927 g; durum satırı sabit akım formülünün 1.185 g diyeceğini, bunun 'gerçeğin 2.00 katı' olduğunu söyler ve grafikte kırmızı noktalı çizgi ölçülen eğriden ayrılır.",
        explain: "Üç metalden de aynı 0.0373 mol elektron geçti; fark, bir mol elektronun kaç gram bıraktığındadır: gümüşte 107.87, bakırda 31.77, alüminyumda 8.99 g. Hidrojenin hacmi oksijenin iki katıdır, çünkü bir H₂ molekülü 2, bir O₂ molekülü 4 elektron ister. Azalan akımda yük, akım–zaman üçgeninin alanıdır: I₀·t<sub>s</sub>/2. Formüldeki I·t, ∫ I dt'nin sabit akımdaki özel hâlidir. Farkın 0.0000 % çıkması şaşırtmasın: sabit ve doğrusal akımda yamuk kuralı integrali tam verir. Hücre gerilimi kütleyi değil yalnız enerjiyi belirler; modelde akım verimi %100'dür.",
      },
      {
        title: "Pili ne bitirir: gerilim mi, madde mi?",
        predict: "100 mL, 1.00 M çözeltiler ve 10.0 g çinko ile kurulan Daniell pili 10 Ω'luk dirence boşalırken gerilim düzgün mü azalır? Direnci 20 Ω yaparsan pilin verdiği toplam yük değişir mi? Çinko yalnız 3 g olsaydı pil kaç voltta ölürdü?",
        do: "04 · Pil boşalması sekmesinde açılış ayarıyla <strong>Sonuna kadar hesapla</strong> düğmesine bas (ya da <strong>Başlat</strong> ile grafiğin çizilişini izle). <strong>Yük direnci R</strong> kaydırıcısını 20 Ω yapıp yeniden hesapla. Sonra <strong>Çinko sınırlayıcı (3 g)</strong> düğmesine bas ve yeniden hesapla.",
        observe: "Başlamadan önce durum satırı 'süre en az 2 gün 0 sa' der. Açılış ayarı bitince: süre 2 gün 1 sa, verilen yük '19297 C = 5360 mAh', kuram aynı, fark −0.0003 %, enerji '20.86 kJ · ortalama 1.081 V', [Zn²⁺] 2.000 M, kalan çinko 3.462 g. Durum satırına göre gerilim 1.099 V'tan yalnız 0.939 V'a iner ve son adımın içinde sıfıra düşer. 20 Ω'da süre 4 gün 3 sa olur; yük ve enerji kıpırdamaz. Çinko 3 g iken: süre 22 sa 30 dk, yük '8854.6 C = 2460 mAh', gerilim kartı '— (devre koptu; son değer 1.086 V)', kapta 0.541 M Cu²⁺ kullanılmadan kalır.",
        explain: "Kapasiteyi gerilim değil madde belirler: 2F × (sınırlayıcının molü). Açılışta sınırlayıcı 0.100 mol Cu²⁺'tır, 3 g çinkoda 0.0459 mol Zn; direnç yalnızca süreyi ayarlar. 'En az' süre q·R/E₀ = 48.8 saattir; gerilim yolda azaldıkça akım da azalır ve boşalma 49.6 saat sürer. Gerilimin sona kadar düz kalması logaritmanın işidir: Cu²⁺'nin yüzde doksan dokuzu bittiğinde E hâlâ 1.031 V'tur. E = 0 için [Cu²⁺] ≈ 1.4×10⁻³⁷ M gerekir; 100 mL'de bu, tek bir iyondan bile azdır. Uçurum ideal modelin özelliğidir: gerçek pilde iç direnç ve iyon taşınımı gerilimi çok daha erken ve yumuşak düşürür.",
      },
    ],
  },
  wow: [
    {
      title: "Bir mektup, bir bahar, altı yeni element",
      body:
        "Volta'nın yığını anlatan mektubu 20 Mart 1800 tarihlidir. Royal Society'de okunması haziranı buldu; ama mektubu erkenden gören Nicholson ve Carlisle daha mayıs başında kendi yığınlarıyla suyu hidrojen ve oksijene ayırmışlardı. 1807'de Davy aynı yöntemle potasyumu ve sodyumu, 1808'de kalsiyum, stronsiyum, baryum ve magnezyumu elde etti. Tek bir aygıt, periyodik tablonun ilk iki sütununa iki yılda altı yeni element ekledi.",
    },
    {
      title: "Özgürlük Heykeli yüz yıl boyunca paslanan bir pildi",
      body:
        "1886'da açılan heykelin dış kabuğu bakır, iç iskeleti demirdir. Aradaki yalıtım bozulunca deniz havasının tuzlu nemi elektrolit oldu ve tabloda daha alçakta duran demir (−0.447 V), bakırın (+0.337 V) yanında anot olarak çözünmeye başladı. 1984–86 restorasyonunda aşınmış demir çubuklar paslanmaz çelikle değiştirildi, bakırla çelik arasına Teflon kondu. Sayfada kuracağın Fe | Cu hücresiyle anot aynıdır; katot farklıdır: heykelde bakır yüzeyinde indirgenen şey Cu²⁺ değil havanın oksijenidir, bu yüzden gerilim sayfadaki +0.784 V değildir.",
    },
    {
      title: "Merdivenin dibi: lityum ve 2019 Nobel'i",
      body:
        "Sayfadaki tablo magnezyumda, −2.372 V'ta biter; OpenStax'in tam tablosunda lityum daha da aşağıdadır: −3.04 V. Üstelik en hafif metaldir. Bu iki özellik onu yüksek gerilimli, hafif pillerin doğal adayı yaptı. Stanley Whittingham 1970'lerde ilk şarj edilebilir lityum hücreyi kurdu; John Goodenough 1980'de kobalt oksit katotla gerilimi yükseltti; Akira Yoshino 1985'te lityum metali yerine karbon anot kullanarak güvenli ilk prototipi yaptı. Üçü 2019 Nobel Kimya Ödülü'nü paylaştı. Telefonundaki 3.7 voltluk hücre, Daniell pilinin üç katından fazla gerilim verir.",
    },
  ],
  worked: {
    title: "Seyreltik bakır çözeltisiyle bir Daniell pili: gerilim, kapasite, enerji",
    prompt:
      "25 °C'de bir Daniell pilinde [Zn²⁺] = 1.00 M, [Cu²⁺] = 0.0100 M ve dış devrede 100 Ω'luk bir direnç var. (a) Hücre gerilimini, ΔG'yi ve akımı bul. (b) Ayrı bir pil 100 mL, 1.00 M çözeltiler ve 10.0 g çinko elektrotla kurulup 10 Ω'luk dirence boşaltılıyor: en çok ne kadar yük ve enerji verir, yaklaşık ne kadar sürer? (E°: Cu²⁺/Cu +0.337 V, Zn²⁺/Zn −0.7618 V; F = 96485 C/mol, R = 8.314 J/(mol·K), M<sub>Zn</sub> = 65.38 g/mol)",
    steps: [
      "Standart gerilim: E° = E°<sub>katot</sub> − E°<sub>anot</sub> = 0.337 V − (−0.7618 V) = 1.0988 V. Net tepkime Zn(k) + Cu²⁺ → Zn²⁺ + Cu(k), n = 2, Q = [Zn²⁺]/[Cu²⁺] = 1.00/0.0100 = 100, log Q = 2.",
      "Nernst: E = E° − (0.05916 V / 2)·log Q = 1.0988 V − 0.02958 V × 2 = 1.0396 V ≈ 1.040 V. Derişim yüz kat düştü, gerilim yalnız 59 mV oynadı. ΔG = −nFE = −2 × 96485 C/mol × 1.0396 V = −200.6 kJ/mol. Akım: I = E/R = 1.0396 V / 100 Ω = 10.4 mA.",
      "Kapasite: n(Cu²⁺) = 0.100 L × 1.00 mol/L = 0.100 mol; n(Zn) = 10.0 g / 65.38 g/mol = 0.153 mol. Tepkime bire birdir, sınırlayıcı Cu²⁺'tır. q = 2F × 0.100 mol = 2 × 96485 C/mol × 0.100 mol = 19297 C; 3.6 C = 1 mAh olduğundan 5360 mAh. Geriye 10.0 g − 0.100 mol × 65.38 g/mol = 3.46 g çinko kalır.",
      "Süre: gerilim boşalma boyunca 1.1 V dolayında kaldığından ortalama akım yaklaşık 1.09 V / 10 Ω ≈ 0.11 A'dır; t ≈ q/I = q·R/E = 19297 C × 10 Ω / 1.0988 V ≈ 1.76×10⁵ s ≈ 48.8 saat. Gerilim yolda biraz düştüğü için gerçek süre bundan biraz uzundur.",
      "Enerji: gerilim sabit kalsaydı W = q·E° = 19297 C × 1.0988 V = 21.20 kJ olurdu. Oysa E derişimle değişir; W = ∫ E dq integralinde Nernst terimi, c = 1.00 M ve V = 0.100 L için 2 ln 2 · RT · cV = 1.386 × 8.314 J/(mol·K) × 298.15 K × 0.100 mol = 0.34 kJ eksiltir. W = 21.20 − 0.34 = 20.86 kJ; ortalama gerilim 20860 J / 19297 C = 1.081 V.",
    ],
    result:
      "(a) E ≈ 1.040 V, ΔG = −200.6 kJ/mol, I = 10.4 mA. (b) En çok 19297 C = 5360 mAh yük ve 20.86 kJ enerji, yaklaşık iki günde; 3.46 g çinko artar. Sayfada sağla: 01'de Sağ kap [Cu²⁺] = 0.0100 M iken kartlar +1.040 V, −200.6 kJ/mol ve 10.4 mA gösterir; 04'ün açılış ayarında 'Sonuna kadar hesapla' 19297 C, 20.86 kJ, ortalama 1.081 V ve 2 gün 1 sa verir. İç direnç hesaba girmediği için bunlar üst sınırdır.",
  },
  misconceptions: [
    {
      myth: "Elektronlar tuz köprüsünden geçerek devreyi tamamlar.",
      truth:
        "Elektronlar yalnızca telde ve elektrotlarda ilerler; çözeltide yükü iyonlar taşır. Köprüden geçen şey de iyonlardır: nitrat yükseltgenmenin olduğu kaba, potasyum indirgenmenin olduğu kaba gider ve çözeltileri nötr tutar. Şemada turuncu elektron noktaları bu yüzden hiç kaba inmez; köprüde ilerleyenler mavi NO₃⁻ ve kırmızı K⁺ noktalarıdır.",
    },
    {
      myth: "Anot her zaman eksi kutuptur.",
      truth:
        "Anot, yükseltgenmenin olduğu elektrottur; işareti düzeneğe bağlıdır. Galvanik hücrede anot eksidir, çünkü elektronlar dış devreye oradan çıkar; ilk sekmenin şeması yükseltgenen elektrodu (−) ile işaretler. Üçüncü sekmedeki elektrolizde ise dış kaynağın artı ucu anoda bağlıdır ve şema 'anot (+): yükseltgenme' yazar. Tanımı tepkimeyle yap, işaretle değil.",
    },
    {
      myth: "E° pozitifse tepkime her koşulda yazıldığı yönde yürür.",
      truth:
        "Yönü E° değil E belirler. Ni | Pb çiftinde E° = +0.131 V'tur; ama [Ni²⁺] = 1.00 M iken [Pb²⁺] 1.00×10⁻⁵ M'ye inerse Q = 1.00×10⁵ olur, K = 2.64×10⁴ değerini aşar ve sayfa E = −0.017 V, 'Yazılan yönde kendiliğinden değil' gösterir. E° yalnızca bütün derişimlerin 1 M olduğu standart hâl için konuşur.",
    },
    {
      myth: "Yarı tepkimeyi 2 ile çarpınca E° de iki katına çıkar.",
      truth:
        "E° birim yük başına enerjidir, miktara bağlı değildir. Zn | Ag kurunca sayfa katot satırına '2Ag⁺ + 2e⁻ → 2Ag(k)' yazar ama yanında +0.800 V kalır. Çarpılan şey ΔG°'dir: ΔG° = −nFE° eşitliğinde n iki katına çıkar, E° değişmez.",
    },
  ],
  glossary: [
    { term: "Anot", definition: "Yükseltgenmenin, yani elektron vermenin olduğu elektrot; galvanik hücrede eksi, elektrolizde artı kutuptur." },
    { term: "Katot", definition: "İndirgenmenin, yani elektron almanın olduğu elektrot; galvanik hücrede artı, elektrolizde eksi kutuptur." },
    { term: "Standart indirgenme potansiyeli (E°)", definition: "Bir indirgenme yarı tepkimesinin 25 °C'de, 1 M çözelti ve 1 bar gaz koşullarında standart hidrojen elektroduna göre gerilimi, volt cinsinden." },
    { term: "Standart hidrojen elektrodu", definition: "2H⁺ + 2e⁻ → H₂ yarı tepkimesinin uzlaşmayla tam 0 V sayıldığı referans elektrot; bütün merdiven ona göre ölçülür." },
    { term: "Tuz köprüsü", definition: "İki yarı hücreyi iyon geçişiyle birbirine bağlayan, tepkimeye karışmayan bir tuzun (sayfada KNO₃) çözeltisiyle dolu bağlantı; çözeltileri elektriksel olarak nötr tutar." },
    { term: "Tepkime oranı (Q)", definition: "Ürün derişimlerinin, katsayıları üs alınarak giren derişimlerine oranı; dengede denge sabiti K'ye eşit olur, saf katılar ifadeye girmez." },
    { term: "Derişim hücresi", definition: "İki kabında aynı yarı tepkime, farklı derişim bulunan hücre; E° sıfırdır, gerilim yalnız derişim oranının logaritmasından doğar." },
    { term: "Faraday sabiti (F)", definition: "Bir mol elektronun taşıdığı yükün büyüklüğü, 96485 C/mol; geçen yükü madde miktarına çevirir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede hücre gerilimi bir çıkarma işlemidir; üniversitede, Genel Kimya II ve Fizikokimya derslerinde, bir <strong>termodinamik</strong> köprüsüdür. ΔG° = −nFE° ile ΔG° = −RT ln K birleşince E° = (RT/nF) ln K, 25 °C'de log K = nE°/0.0592 V çıkar. Daniell pili için bu, K ≈ 10³⁷ demektir (sayfada 1.40×10³⁷): tepkime dengeye vardığında çözeltide ölçülebilir Cu²⁺ kalmaz. Gerilimin sıcaklıkla değişimi tepkimenin entropisini verir: ΔS° = nF(∂E°/∂T). Nernst denklemi de kimyayla sınırlı değildir: bir pH elektrodunun pH birimi başına yaklaşık 59 mV değişmesi ve bir sinir hücresinin zarındaki −70 mV dolayındaki dinlenme potansiyeli aynı RT/F katsayısından gelir.",
      "Termodinamik 'olur mu' sorusuna cevap verir; 'ne hızla' sorusu ise <strong>elektrokimyasal kinetik</strong>tir. Elektrot yüzeyindeki elektron aktarım hızı Butler–Volmer denklemiyle, akım geçerken gerilimin denge değerinden sapması <em>aşırı gerilim</em> kavramıyla anlatılır. Bu kavramlar lityum iyon pil tasarımında, suyun elektroliziyle hidrojen üretiminde, yakıt hücrelerinde ve korozyon mühendisliğinde (Pourbaix diyagramları, katodik koruma) günlük araçlardır. Sayfanın bilerek dışarıda bıraktığı iç direnç ve aşırı gerilim, tam da bu derslerin konusudur; ilk sekmedeki tablo ise hepsinde başlangıç noktasıdır.",
    ],
    topics: ["Gibbs enerjisi ve denge sabiti", "Nernst denklemi ve derişim pilleri", "Etkinlik (aktivite) katsayıları", "Elektrokimyasal kinetik ve aşırı gerilim", "Elektroliz ve Faraday yasaları", "Korozyon ve katodik koruma", "Lityum iyon piller ve yakıt hücreleri", "Zar potansiyeli (Nernst–Goldman)"],
  },
  quiz: [
    {
      question: "Bakır derişim hücresinde c₁ = 0.0100 M, c₂ = 1.00 M iken voltmetre 25 °C'de +59.2 mV gösteriyor. Derişimler aynı kalıp iki elektrot ve iki çözelti gümüşle (Ag | Ag⁺) değiştirilirse voltmetre ne gösterir?",
      options: ["+29.6 mV; gümüş daha soy bir metaldir", "+59.2 mV; derişim oranı değişmedi", "+118.3 mV; iyon başına aktarılan elektron yarıya indi", "+799.6 mV; gümüşün E° değeri kadar"],
      answer: 2,
      explanation: "Derişim hücresinde E° sıfırdır; metalin merdivendeki yeri sonuca hiç girmez. E = (59.16 mV / n) × log(c₂/c₁) ve log 100 = 2. Bakırda n = 2 olduğundan 59.2 mV, gümüşte n = 1 olduğundan iki katı, 118.3 mV çıkar. İkinci sekmede metal menüsünden Ag seçince voltmetre tam bunu gösterir.",
    },
    {
      question: "Bir bakır kaplama banyosunda akım 2.0 A'dan başlayıp 30 dakikada doğrusal olarak sıfıra iniyor. Sabit 2.0 A akım aynı sürede 1.185 g bakır biriktirdiğine göre bu kez ne kadar bakır birikir?",
      options: ["1.185 g; başlangıç akımı ve süre aynı", "0.5927 g; yük, akım–zaman üçgeninin alanıdır", "0.2964 g; akım yarıya inince kütle dörtte bire iner", "Hiç birikmez; akım sabit değilse Faraday yasası geçersizdir"],
      answer: 1,
      explanation: "Faraday yasası akımla değil yükle konuşur: m = M·q/(zF) ve q = ∫ I dt. Doğrusal azalan akımın grafiği bir üçgendir; alanı I₀·t/2 = 1800 C, sabit akımdaki 3600 C'nin yarısı. Kütle de yarıya iner: 0.5927 g. Üçüncü sekmede akım biçimini değiştirince aynı sayıyı okursun.",
    },
    {
      question: "Pil boşalması sekmesinin açılış ayarında (100 mL, 1.00 M çözeltiler, 10.0 g çinko) pil 19297 C verir. Yalnız kap hacmini 200 mL yaparsan verilen yük ne olur?",
      options: ["Değişmez; yükü direnç belirler", "Tam iki katına, 38594 C'ye çıkar", "29515 C olur; artık çinko elektrot sınırlayıcıdır", "Yarıya iner; çözelti seyrelmiş olur"],
      answer: 2,
      explanation: "Hacim iki katına çıkınca Cu²⁺ 0.200 mol olur, ama çinko hâlâ 10.0 g / 65.38 g/mol = 0.153 mol'dür. Sınırlayıcı artık çinkodur: q = 2 × 96485 C/mol × 0.153 mol = 29515 C, yani iki kat değil yaklaşık 1.5 kat. Çinko bitince devre kopar; sayfa son gerilimi 1.073 V diye yazar. Derişim değişmediği için 'seyrelme' de yoktur.",
    },
  ],
  next: [
    { href: "kimyasal-denge-ve-gibbs-enerjisi.html", title: "Kimyasal Denge ve Gibbs Enerjisi", why: "Nernst denkleminin çıktığı yer: Q ile K'yı karşılaştır, ΔG = ΔG° + RT ln Q ve ΔG° = −RT ln K ilişkilerini Q–K yön bulucuda dene." },
    { href: "elektrikli-araclar.html", title: "Elektrikli Araçlar: Enerji, Batarya ve Menzil", why: "Merdivenin çok aşağısındaki lityum bir arabayı nasıl yürütür: hücrelerden kurulan paketin gerilimi, akımı ve ısısı, şarj eğrisi ve bir dolumla gidilen yolun hesabı." },
    { href: "elektrik-devresi-simulasyonu.html", title: "DC Devre Laboratuvarı: Ohm ve Kirchhoff Yasaları", why: "Pilin gerilimi bir devrede ne yapar: iç direnç uç gerilimini nasıl düşürür, akım ve güç dirençlere nasıl paylaşılır." },
    { href: "periyodik-tablo.html", title: "Periyodik Tablo", why: "Magnezyum neden merdivenin dibinde, gümüş neden tepesinde: elementlerin iyonlaşma enerjisi ve elektronegatiflik değerlerine bak." },
  ],
  sources: [
    { title: "OpenStax · Chemistry 2e, 17.4 Potential, Free Energy, and Equilibrium", url: "https://openstax.org/books/chemistry-2e/pages/17-4-potential-free-energy-and-equilibrium", note: "ΔG° = −nFE°, E° ile K ilişkisi ve Nernst denklemi; 0.0592 V katsayısının kaynağı (İngilizce, açık ders kitabı)." },
    { title: "OpenStax · Chemistry 2e, 17.7 Electrolysis", url: "https://openstax.org/books/chemistry-2e/pages/17-7-electrolysis", note: "Elektrolizin nicel yanı: akım ve süreden yüke, Faraday sabitiyle mol elektrona ve biriken kütleye; gümüş kaplama örneği." },
    { title: "OpenStax · Chemistry 2e, Appendix L: Standard Electrode (Half-Cell) Potentials", url: "https://openstax.org/books/chemistry-2e/pages/l-standard-electrode-half-cell-potentials", note: "Sayfadaki tablonun kaynağı: Cu²⁺/Cu +0.337 V, Zn²⁺/Zn −0.7618 V, Ag⁺/Ag +0.7996 V; lityum için −3.04 V." },
    { title: "Wikipedia · Daniell cell", url: "https://en.wikipedia.org/wiki/Daniell_cell", note: "1836 tasarımı, öküz yemek borusundan gözenekli kaba geçiş ve telgraf ağlarındaki kullanımı." },
  ],
  revision: "Kasım 2026",
};
