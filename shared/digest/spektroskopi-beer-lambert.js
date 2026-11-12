window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["spektroskopi-beer-lambert"] = {
  slug: "spektroskopi-beer-lambert",
  title: "Spektroskopi ve Beer–Lambert: Işığın Soğurulmasıyla Ölçmek",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir çözeltinin içinden geçen ışığı saymak, içinde ne kadar madde olduğunu söyler. Beer–Lambert yasasını foton foton ölç, kalibrasyonla bilinmeyeni bul, renkten ve IR tepelerinden molekülü tanı.",
  hook:
    "Bir küvetin içine yüz bin foton gönderiyorsun; her biri ya karşıya varıyor ya da yolda bir moleküle takılıp kayboluyor. Hiçbir foton ötekinden haberdar değil, yine de sayılar her seferinde aynı üstel yasaya uyuyor. Peki derişimi iki katına çıkarınca geçen ışık neden yarıya değil, karesine iner?",
  bigIdea:
    "Her ince katman kendisine ulaşan ışığın <strong>aynı kesrini</strong> soğurduğu için ışık derinlikle üstel azalır; logaritması olan <em>absorbans A = εlc</em> bu yüzden derişimle ve ışık yoluyla doğru orantılıdır, ve bu doğrusallığın nerede bozulduğunu bilmek ölçümün kendisi kadar önemlidir.",
  story: [
    "Hikâye bir kimya laboratuvarında değil, gökyüzünde başlar. Fransız bilim insanı Pierre Bouguer, yıldız ışığını düzeltmek için atmosferin ışığı ne kadar zayıflattığını araştırıyordu; 1729'daki <em>Essai d'optique sur la gradation de la lumière</em> adlı kitabında, ışığın atmosferde aldığı yol aritmetik olarak uzarken şiddetinin geometrik olarak, yani üstel biçimde azaldığını yazdı. Johann Heinrich Lambert 1760'ta <em>Photometria</em> adlı kitabında bu sonucu genelleştirdi: ince bir katmanda kaybolan ışık, hem gelen ışığın şiddetiyle hem de katmanın kalınlığıyla orantılıdır; bu küçük cümleyi integrallemek üstel yasayı verir. 1852'de August Beer, renkli çözeltilerin kırmızı ışığı da benzer bir yasayla zayıflattığını ve zayıflamanın derişime bağlı olduğunu gösterdi; Bouguer'e ve Lambert'e hiç atıf yapmadan. Absorbansı derişim ve yol uzunluğuyla tek denklemde birleştiren bugünkü biçim ise 20. yüzyılın başında yerleşti; Wikipedia ilk modern yazılışlardan birini, belki de ilkini, 1913'te Robert Luther ile Andreas Nikolopulos'a bağlar. Yani 'Beer–Lambert yasası' tek bir kişinin değil, bir buçuk yüzyıllık bir birikimin adıdır.",
    "Görünür ışığın iki kenarının ötesinde de ışık olduğu aynı dönemde anlaşıldı. William Herschel 1800'de güneş ışığını prizmayla ayırıp renklerin üzerine termometreler koydu ve kırmızının ötesinde, gözle görülmeyen bir bölgede sıcaklığın yine yükseldiğini gördü; bu ışınlara 'ısı ışınları' (calorific rays) dedi. Bir yıl sonra, 1801'de Johann Wilhelm Ritter morun ötesindeki görünmez ışınların gümüş klorürlü kâğıdı mordan bile hızlı kararttığını buldu. Bugün bu iki bölgeye kızılötesi (IR) ve morötesi (UV) diyoruz; sayfanın üçüncü ve dördüncü sekmeleri tam bu iki komşu bölgede çalışır.",
    "Işığın maddeyi tanımak için kullanılabileceğini kanıtlayan ikili Robert Bunsen ile Gustav Kirchhoff'tur. 1859'da geliştirdikleri spektroskopla Kirchhoff, Güneş tayfındaki karanlık D çizgilerinin sodyumun parlak çizgileriyle aynı yerde durduğunu gösterip Güneş'te sodyum bulunduğunu çıkardı; bir yıl sonra ikili, Dürkheim'ın maden suyunda tayfta daha önce görülmemiş parlak mavi çizgiler fark etti ve yeni elementi bu renk yüzünden Latince 'mavimsi gri' anlamındaki <em>caesius</em>'tan sezyum diye adlandırdı. Sezyum, spektroskopla bulunan ilk elementtir. 20. yüzyılın başında ise William Coblentz 1905–1908 arasında pek çok bileşiğin kızılötesi tayfını yayımladı; NIST WebBook'taki pek çok IR tayfı bugün hâlâ onun adını taşıyan Coblentz Society koleksiyonundandır.",
    "Ölçmeyi herkesin işi yapan alet 1941'de geldi: Arnold Beckman'ın şirketinde Howard Cary'nin yönettiği ekibin geliştirdiği DU spektrofotometresi. Ondan önce köpekbalığı karaciğeri yağındaki A vitaminini ölçmek için yağ sıçanlara 21 gün yedirilir, sonra hayvanların kemik yapısı incelenirdi; DU aynı sonucu doğrudan soğurmadan, dakikalar içinde veriyordu. 1941 ile 1976 arasında yaklaşık 30 000 tane üretildi. Bugünkü IR cihazlarının çoğu ise prizma yerine Michelson girişimölçeriyle bütün dalga boylarını aynı anda toplar ve tayfı Fourier dönüşümüyle hesaplar (FTIR); Digilab'ın 1969'da çıkardığı FTS-14, ilk ticari FTIR spektrometresi olarak anılır.",
  ],
  core: [
    {
      heading: "Geçirgenlik ve absorbans",
      body:
        "Küvete giren ışık şiddeti I₀, çıkan I ise <strong>geçirgenlik</strong> T = I/I₀'dır: 0 ile 1 arasında bir kesir. Ölçüm aletleri doğrudan T'yi ölçer, ama kimyacı onun eksi onluk logaritmasıyla çalışır: <strong>absorbans</strong> A = −log₁₀T. Nedeni basit: T çarpımsal, A toplamsaldır. İki özdeş küveti art arda koyarsan T karesine iner (0,5 × 0,5 = 0,25), A ise iki katına çıkar (0,30 + 0,30 = 0,60). A = 1 ışığın onda birinin, A = 2 yüzde birinin geçtiği demektir.",
      formula: "T = I/I₀ = 10<sup>−A</sup>,  A = −log₁₀T",
      formulaNote: "A birimsizdir; 'absorbans birimi' yalnızca okuma kolaylığı için söylenir.",
    },
    {
      heading: "Yasa bir olasılık yasasıdır",
      body:
        "Işığı foton foton düşün. İnce bir dilimde bir fotonun soğurulma olasılığı p, dilimdeki molekül sayısıyla, yani derişim c ile dilim kalınlığı dx'in çarpımıyla orantılıdır. Foton her dilimi bağımsız olarak geçmeye çalıştığı için, S dilimden sağ çıkma olasılığı (1 − p)<sup>S</sup>'dir. Dilimler inceldikçe (S → ∞, pS sabit) bu, e<sup>−pS</sup> olur: Lambert'in üstel yasası. Logaritmayı onluk tabana çevirince ln10 çarpanı ortaya çıkar ve molar soğurma katsayısı ε ile yasa A = εlc biçimini alır. Sayfa bu türetmeyi kelimesi kelimesine uygular, bu yüzden dilim sayısı sonluyken küçük bir yanlılık kalır. Dilim modelinde A = −S·log₁₀(1 − p) olur; −ln(1 − p) = p + p²/2 + p³/3 + … açılımı ve pS = ln10·εlc ile bu A = εlc·(1 + p/2 + p²/3 + …) verir. Ölçülen A göreli olarak ilk mertebede p/2 kadar büyük çıkar: varsayılanda p = 0,0092 ve yanlılık %0,46.",
      formula: "T = lim<sub>S→∞</sub> (1 − ln10·εcl/S)<sup>S</sup> = 10<sup>−εlc</sup>",
      formulaNote: "ε: L mol⁻¹ cm⁻¹, l: cm, c: mol/L. ε, maddenin o dalga boyunda bir fotonu 'yakalama gücüdür'.",
    },
    {
      heading: "Doğrusallık nerede bozulur?",
      body:
        "A = εlc'nin dört gizli varsayımı vardır ve her birinin bozulması doğruyu aşağı büker. <strong>Kaçak ışık</strong>: örneği hiç görmeden dedektöre sızan küçük bir s kesri, T'nin s/(1 + s)'nin altına inmesini engeller; %1 kaçak ışıkla A en çok log₁₀101 ≈ 2,00 olabilir. <strong>Çok renkli ışık</strong>: bant içinde ε değişiyorsa, dedektör geçirgenliklerin ortalamasını görür; az soğurulan dalga boyları baskın hâle gelir ve ölçülen A, ortalama ε'un verdiği εlc'nin altında kalır. ε bant içinde ε(1 − r) ile ε(1 + r) arasında düzgün dağılmışsa ortalama kapalı biçimde hesaplanır: a = εlc için T = [10<sup>−a(1−r)</sup> − 10<sup>−a(1+r)</sup>]/(2ra·ln10). <strong>Kimyasal denge</strong>: molekül derişik çözeltide dimerleşir ve dimer başka dalga boyunda soğurursa, soğurucu türün derişimi toplam derişimle orantılı olmaktan çıkar. <strong>Çok yüksek derişim</strong>: moleküller birbirini etkiler, kırılma indisi değişir. Sayfadaki üç sapma modeli ilk üçünü ayrı ayrı açmana izin verir.",
      formula: "T′ = (T + s)/(1 + s)  ⇒  A′<sub>max</sub> = log₁₀(1 + 1/s)",
      formulaNote: "s = 0,01 için A′ en çok 2,00'dir; εlc = 4 bile olsa alet 2'nin üstünü göremez.",
    },
    {
      heading: "Kalibrasyon, belirsizlik ve en iyi absorbans",
      body:
        "Gerçek bir analizde ε'u bilmezsin; derişimi bilinen standartlar hazırlar, A'larını okur ve en küçük kareler doğrusu y = b₀ + b₁c çizersin. Bilinmeyenin m kez okunan ortalaması <span class=ov>y</span><sub>u</sub>'dan derişim <span class=hat>c</span> = (<span class=ov>y</span><sub>u</sub> − b₀)/b₁ olarak geri hesaplanır; belirsizliği, aşağıdaki standart ters kestirim formülüyle hem okuma gürültüsünü hem de doğrunun kendi belirsizliğini taşır. Tanığın (sıfır derişim) tekrar okumalarının SD'si s<sub>b</sub>'den <strong>tespit sınırı</strong> LOD = 3s<sub>b</sub>/b₁ ve <strong>tayin sınırı</strong> LOQ = 10s<sub>b</sub>/b₁ çıkar. Gürültü T'de sabitse (fotometrik gürültü), σ<sub>A</sub> = σ<sub>T</sub>/(T·ln10) ve A = −ln T/ln10 olduğundan bağıl derişim hatası σ<sub>c</sub>/c = σ<sub>A</sub>/A = σ<sub>T</sub>/(T·|ln T|) olur. Payda T·ln T'nin türevi ln T + 1'dir; sıfır olduğu yer T = 1/e, yani A = log₁₀e = 1/ln10 ≈ 0,434'tür. Orada bağıl hata σ<sub>T</sub>/(e⁻¹·1) = e·σ<sub>T</sub> olur. Çok seyreltik çözeltide sinyal gürültüde boğulur, çok derişikte ise geçen ışık o kadar azdır ki küçük bir T hatası A'yı savurur.",
      formula: "s<sub>c</sub> = (s<sub>y/x</sub>/b₁)·√[1/m + 1/n + (<span class=ov>y</span><sub>u</sub> − <span class=ov>y</span>)²/(b₁²·S<sub>xx</sub>)]",
      formulaNote: "n standart sayısı, S<sub>xx</sub> = Σ(cᵢ − <span class=ov>c</span>)²; dipteki en küçük bağıl hata e·σ<sub>T</sub>'dir.",
    },
    {
      heading: "UV–Vis renk, IR bağ: iki farklı tayf",
      body:
        "UV ve görünür bölgede soğurulan foton bir elektronu daha yüksek bir orbitale çıkarır; bantlar geniştir, molekülün rengini belirler. Bir çözeltinin gördüğün rengi soğurduğu değil geçirdiği ışığın rengidir: 430 nm civarında maviyi soğuran boya sarı görünür. Geçen ve soğurulan ışık toplanınca yeniden beyaz ışık çıktığı için, CIE renk diyagramında ikisi beyaz noktanın tam iki zıt yanında durur: <strong>tamamlayıcı renkler</strong>. İki boya karışmışsa iki dalga boyunda okunan iki absorbans iki bilinmeyenli bir doğrusal sistemdir; bantlar çok benziyorsa sistem kötü koşulludur ve küçük okuma hataları büyük derişim hatalarına dönüşür. Kızılötesinde ise foton bir bağı titreştirir. İki atomu k sertlikte bir yayla bağlanmış kütleler gibi düşün: frekans √(k/μ) ile orantılıdır, μ indirgenmiş kütledir. Bu yüzden her bağ türü kendi bölgesinde soğurur (O–H ~3300, C–H ~2900, C=O ~1700 cm⁻¹) ve fonksiyonel gruplar tayftan okunabilir. Gerçek potansiyel bir parabol değil, kopmaya doğru açılan Morse kuyusudur; düzeyler yukarı çıktıkça sıklaşır ve temel geçiş harmonik tahminin biraz altında kalır.",
      formula: "ṽ = (1/2πc)·√(k/μ),  μ = m₁m₂/(m₁ + m₂)",
      formulaNote: "ṽ dalga sayısı (cm⁻¹), c ışık hızı. Aynı k ile hidrojeni döteryumla değiştirmek ṽ'yi √(μ<sub>CD</sub>/μ<sub>CH</sub>) ≈ 1,362 kat düşürür.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir ve her değişiklik anında yeniden hesaplanır; rastgelelik tohumludur, yani aynı <strong>Tohum</strong> her seferinde aynı sayıları verir (aşağıdaki değerler varsayılan tohum 1 içindir). <strong>01 · Absorbans ve derişim</strong> fotonları küvetten tek tek geçirir: ε, ışık yolu l, derişim c, foton sayısı N ve dilim sayısı S kaydırıcılarla ayarlanır; <strong>Sapma modeli</strong> menüsü kaçak ışığı, çok renkli ışığı ya da dimerleşmeyi açar. <strong>02 · Kalibrasyon doğrusu</strong> standartlardan bir doğru uydurur, bilinmeyeni belirsizliğiyle bulur, 2000 sanal deneyle bu belirsizliği sınar ve LOD, LOQ ile en iyi absorbansı ölçer. <strong>03 · UV–Vis spektrum ve renk</strong> bir soğurma tayfından algılanan rengi CIE 1931 renk eşleme fonksiyonlarıyla hesaplar, iki boyalı karışımı çözer ve bromtimol mavisinin eş soğurma noktasını arar; boyaların ε değerleri ve bant genişlikleri öğretim değeridir (yalnız bromtimol mavisinin 427 ve 602 nm tepe yerleri ile pK = 7,0 kaynaklıdır). Sayfanın bulduğu 511,2 nm'lik eş soğurma noktası bu yüzden bir literatür değeri değil, modelin bantlarının sonucudur. <strong>04 · IR tepe okuma</strong> NIST tayflarından okunan tepe yerleriyle altı molekülün IR tayfını çizer ve bir bağın titreşim düzeylerini Schrödinger denklemini sayısal çözerek bulur. Her sekmenin <strong>Sekmeyi sıfırla</strong> düğmesi ve R kısayolu varsayılana döndürür.",
    experiments: [
      {
        title: "Dilimler inceldikçe Lambert yasası",
        predict:
          "Foton küveti 100 ince dilimden geçiyor. Derişim c'yi 0,20'den 0,50 mmol/L'ye çıkarınca ölçülen absorbans εlc = 1,000'e mi oturur, biraz üstünde mi kalır? Dilimleri beşe indirirsen ne olur?",
        do:
          "01 · Absorbans ve derişim sekmesinde varsayılandan başla, Derişim c'yi 0,50 mmol/L yap; ölçülen A'yı, Beer–Lambert değerini ve Sonlu dilim yanlılığı kutusunu oku. Sonra Dilim sayısı S'yi 500'e çıkar. En son Kalın dilimler hazır ayarını dene.",
        observe:
          "Varsayılanda (c = 0,20 mmol/L) 100 000 fotonun 39 503'ü geçer, A = 0,403 ± 0,002, εlc = 0,400. c = 0,50 mmol/L'de A = 1,017 ± 0,004, εlc = 1,000; dilim başına olasılık p = 0,0230 ve yanlılık +0,0117 (1,17 %). S = 500'de A = 1,008 ± 0,004, yanlılık +0,0023 (0,23 %) ve süpürmeden bulunan eğim 2,001 / 2,000 olur. Kalın dilimlerde (S = 5, c = 0,6) p = 0,5526 ve A = 1,751, oysa εlc = 1,200: +45,9 %.",
        explain:
          "(1 − p)<sup>S</sup>, e<sup>−pS</sup>'ye yalnız p küçükken eşittir; ln(1 − p) ≈ −p − p²/2 olduğundan fazladan soğurma ilk mertebede A'yı göreli olarak p/2 kadar büyütür (0,0230/2 = 0,0115). Ölçülen 1,17 %'nin p/2'yi biraz aşması p²/3 teriminden gelir. Gerçek bir çözeltide 'dilim' bir molekül tabakası kadar incedir, bu yüzden bu yanlılık orada ölçülemeyecek kadar küçüktür.",
      },
      {
        title: "Doğruyu büken üç sapma",
        predict:
          "%1 kaçak ışık olan bir alette εlc = 2,000 olan bir örnek kaç absorbans okutur? Geniş bantlı ışık ve dimerleşme ölçülen A'yı aynı yöne mi iter?",
        do:
          "Aynı sekmede sırayla Derişik + %1 kaçak ışık, Geniş bant ve Dimerleşme hazır ayarlarına bas; her birinde ölçülen A'yı, Fark kutusunu ve grafikteki kesikli model eğrisini incele. Grafiğin yatay ekseni c iken düz doğrudan sapan noktalara bak.",
        observe:
          "Kaçak ışıkta (c = 1 mmol/L) dedektöre ulaşan 1851 fotonun 972'si örneği hiç görmemiş kaçak fotondur; A = 1,733 ± 0,010, yani εlc'nin %13,4 altında, model 1,726. Geniş bantta A = 1,026, εlc ise 1,200 (−14,5 %) ve eğim 1,791'e düşer (−10,4 %). Dimerleşmede 0,60 mmol/L'nin 66,7 %'si dimerdedir; A = 0,403, beklenen 1,200 (−66,4 %), eğim 0,793.",
        explain:
          "Üçü de doğruyu aşağı büker ama nedenleri farklıdır. Kaçak ışık T'ye taban koyar: (T + s)/(1 + s), 0,0099'un altına inemez, A en çok 2,00 olur. Çok renkli ışıkta zayıf soğurulan dalga boyları geçen ışığa egemen olur; ortalaması alınan T'dir, A değil. Kapalı biçim dilimsiz sınırda A = 1,017 verir; sayfanın modeli 100 dilimin yanlılığını da ekleyip 1,026 bulur. Dimerleşmede soğurucu monomerin derişimi toplam c ile orantılı değildir; [M] = 2c/(1 + √(1 + 8Kc)) derişik çözeltide √c gibi büyür.",
      },
      {
        title: "Bilinmeyen, belirsizlik ve gizli sistematik hata",
        predict:
          "Formülün verdiği ± s<sub>c</sub> gerçekten deneyler arası saçılmayı temsil ediyor mu? Standartları 2 mmol/L'ye kadar uzatıp %1 kaçak ışık eklersen %95 aralık gerçek değeri yine yakalar mı?",
        do:
          "02 · Kalibrasyon doğrusu sekmesinde varsayılanı oku: Bilinmeyen, Monte Carlo ve kapsama oranı kutuları. Sonra Geniş aralık + kaçak ışık hazır ayarına bas ve eğrilik testine, artık grafiğine bak. En son Tespit sınırında hazır ayarını dene.",
        observe:
          "Varsayılanda b₁ = 1,9848 ± 0,0108 (εl = 2,0000), <span class=hat>c</span> = 0,2999 ± 0,0016 mmol/L, 2000 deneyin SD'si 0,0018 ve kapsama 94,2 %: formül dürüst. Geniş aralıkta R² 0,86377'ye düşer, eğrilik t'si −18,34 ('Anlamlı eğrilik'), <span class=hat>c</span> = 1,3582 ± 0,2455 mmol/L, oysa gerçek değer 1,00; kapsama 100,0 % görünür, ama deneyler arası SD yalnız 0,0037'dir. Tespit sınırında <span class=hat>c</span> = 0,0032 ± 0,0028 mmol/L, LOD 7,7 µmol/L, LOQ 25,5 µmol/L ve durum metni sonucun tayin sınırının altında olduğunu söyler.",
        explain:
          "Kaçak ışık eğri bir ilişki üretir; doğru uydurmak onu saklamaz, artıklara bir yay olarak gömer. Bu artıklar s<sub>y/x</sub>'i şişirir, aralık genişler ve kapsama %100 çıkar; ama <span class=hat>c</span> her deneyde aynı yönde yanlıştır. Küçük saçılma doğruluk demek değildir: belirsizlik yalnız rastgele hatayı ölçer, sistematik hatayı ancak model denetimi (artıklar, eğrilik testi) yakalar.",
      },
      {
        title: "Döteryum neden √2 vermez?",
        predict:
          "C–H bağında hidrojeni iki kat ağır döteryumla değiştiriyorsun, k aynı kalıyor. Titreşim frekansı √2 = 1,414 kat mı düşer, daha az mı?",
        do:
          "04 · IR tepe okuma sekmesinin osilatör bölümünde varsayılan C–H'yi oku, sonra Hazır bağ menüsünden C–D'yi seç ve izotop oranına bak. Ardından Potansiyel'i Morse yap. Bonus: sekmenin üst bölümünde Etanol için Ortam'ı Gaz yap ve 3330 cm⁻¹'deki geniş bandı izle.",
        observe:
          "C–H için μ = 0,9297 u, formül 3033,3 cm⁻¹, sayısal temel geçiş 3033,2 cm⁻¹. C–D'de μ = 1,7246 u ve 2227,1 cm⁻¹; oran 1,3620, √2 değil. Morse potansiyelinde C–H 2912,1, C–D 2161,8 cm⁻¹ ve oran 1,3471 (C–H'de temel geçiş ω<sub>e</sub>'nin 2ω<sub>e</sub>x<sub>e</sub> = 121,1 cm⁻¹ altında); gerçek CHCl₃ / CDCl₃ oranı (NIST) 1,3389. Gaz etanolde 3330'daki geniş H-bağlı O–H bandı kaybolur, yalnız 3632 cm⁻¹'de dar bir serbest O–H tepesi kalır; çözeltide bu tepe 3635'te zayıf bir yan bant olarak zaten vardı.",
        explain:
          "Frekansı belirleyen hidrojenin kütlesi değil indirgenmiş kütledir; karbon da hareket ettiği için μ, 1'den 2'ye değil 0,930'dan 1,725'e çıkar ve oran √(1,7246/0,9297) = 1,362 olur. Anharmoniklik hafif bağı daha çok etkiler (C–H kuyunun daha yukarısında titreşir), bu yüzden Morse oranı ölçülen değere yaklaşır; kalan fark, Morse kuyu derinliğinin bir öğretim değeri olmasından ve çok atomlu molekülde bağın tek başına titreşmemesinden gelir.",
      },
    ],
  },
  wow: [
    {
      title: "Yirmi bir gün yerine birkaç dakika",
      body:
        "DU spektrofotometresinden önce köpekbalığı karaciğeri yağındaki A vitamini, yağın 21 gün boyunca sıçanlara yedirilip sonra kemik yapılarının incelenmesiyle ölçülüyordu. 1941'de çıkan DU aynı sonucu ışık soğurmasından dakikalar içinde verdi ve 1976'ya kadar yaklaşık 30 000 tane üretildi.",
    },
    {
      title: "44 000 litre su, 7,3 gram tuz",
      body:
        "Bunsen ve Kirchhoff, tayfta gördükleri parlak mavi çizgilerin yeni bir elemente ait olduğunu kanıtlamak için yaklaşık 44 000 litre Dürkheim maden suyunu buharlaştırdı; elde ettikleri 7,3 gram sezyum klorürdü. Element önce ışıkta görüldü, sonra elde tutuldu.",
    },
    {
      title: "En iyi absorbans bir matematik sabitidir",
      body:
        "Okuma gürültüsü geçirgenlikte sabitse derişimin bağıl hatası tam A = log₁₀e = 1/ln10 ≈ 0,434'te, yani ışığın %36,8'i geçerken en küçüktür. Sayfa bunu 40 noktalı bir ızgarada sınar ve 0,436 bulur; dipteki bağıl hata da kuramın öngördüğü gibi e·σ<sub>T</sub>'dir.",
    },
  ],
  worked: {
    title: "Geçen fotonlardan derişime",
    prompt:
      "Molar soğurma katsayısı ε = 2000 L mol⁻¹ cm⁻¹ olan bir boyanın 1,00 cm'lik küvetten geçirildiği bir ölçümde 100 000 fotondan 39 503'ü dedektöre ulaşıyor. Absorbansı, derişimi ve yalnızca foton sayımından gelen belirsizliği bul. Tanığın okuma gürültüsü σ = 0,005 absorbans ise kuramsal tespit sınırı nedir?",
    steps: [
      "Geçirgenlik: T = 39 503 / 100 000 = 0,3950. Absorbans: A = −log₁₀0,3950 = 0,4034 (sayfa 0,403 gösterir).",
      "Derişim: c = A/(εl) = 0,4034 / (2000 L mol⁻¹ cm⁻¹ · 1,00 cm) = 2,017 × 10⁻⁴ mol/L = 0,2017 mmol/L. Sayfadaki gerçek derişim 0,20 mmol/L'dir; aradaki 0,8 %'lik farkın yarıdan fazlası 100 dilimin yanlılığıdır (+0,0019).",
      "Sayım belirsizliği: geçen foton sayısı binom dağılır, σ<sub>T</sub> = √[T(1 − T)/N] = √(0,3950 · 0,6050 / 100 000) = 0,00155. A = −log₁₀T türevinden σ<sub>A</sub> = σ<sub>T</sub>/(T·ln10) = √[(1 − T)/(NT)]/ln10 = 0,0017; sayfa bunu ± 0,002 diye yuvarlar. Derişimde bu σ<sub>c</sub> = σ<sub>A</sub>/(εl) ≈ 0,0009 mmol/L, yani yaklaşık %0,4 eder.",
      "Tespit sınırı: LOD = 3σ/(εl) = 3 · 0,005 / (2 L/mmol) = 0,0075 mmol/L = 7,5 µmol/L. Bu, 02 · Kalibrasyon doğrusu sekmesinin varsayılanında LOD kutusunun gösterdiği kuram değeridir; tanığın on okumasından tahmin edilen s<sub>b</sub> ile ölçülen değer 6,9 µmol/L çıkar.",
      "Sınama: 01 sekmesinde Foton sayısı N'yi 10 000'e düşür; σ<sub>A</sub> √10 ≈ 3,2 kat büyür (0,0017'den 0,0054'e, sayfa ± 0,005 gösterir), çünkü sayım hatası 1/√N ile ölçeklenir.",
    ],
    result:
      "A = 0,403 ± 0,002, c = 0,2017 mmol/L (sayım belirsizliği ≈ 0,0009 mmol/L). Okuma gürültüsü 0,005 absorbans olan bir alet bu boyayı yaklaşık 7,5 µmol/L'ye kadar 'görebilir', güvenle sayısallaştırmak için ise LOQ = 25 µmol/L'nin üstünde olmak gerekir.",
  },
  misconceptions: [
    {
      myth: "Derişim iki katına çıkınca geçen ışık yarıya iner.",
      truth:
        "Yarıya inen değil iki katına çıkan absorbanstır. Geçirgenlik üstel değişir: T = 0,5 olan çözeltiyi iki kat derişik yaparsan T = 0,25 olur. Doğrusal ilişki yalnızca A = −log₁₀T ile derişim arasındadır; bu yüzden kalibrasyon grafiğinin dikey ekseni T değil A'dır.",
    },
    {
      myth: "R² 1'e yakınsa kalibrasyon doğrudur.",
      truth:
        "Kaçak ışıkla bükülmüş bir eğriye bile doğru uydurulduğunda R² yüksek çıkabilir; asıl ipucu artıklardaki sistemli yaydır. 02 sekmesinde varsayılandan En derişik standart'ı 0,80 mmol/L, Kaçak ışık oranı s'yi %1 yap: R² = 0,99812 kalır, ama eğrilik testi t = −4,53 verir ('Anlamlı eğrilik') ve eğim 2,00 yerine 1,83'tür. Aralığı 2 mmol/L'ye uzatan hazır ayarda bilinmeyen 1,00 yerine 1,36 mmol/L bulunur. Kalibrasyon aralığını doğrusal bölgeyle sınırla ve artıklara bak.",
    },
    {
      myth: "Bir çözelti hangi rengi soğuruyorsa o renkte görünür.",
      truth:
        "Gördüğün renk geçen ışıktır, soğurulanın tamamlayıcısıdır. 430 nm civarında soğuran sarı boyanın soğurduğu ışığın baskın dalga boyu 462,9 nm (mavi), geçen ışığınki 570,2 nm'dir (sarı); ikisi beyaz noktadan tam 180° zıt yönlerdedir.",
    },
    {
      myth: "Ölçülen absorbans ne kadar büyükse ölçüm o kadar duyarlıdır.",
      truth:
        "Çok yüksek absorbansta geçen ışık o kadar azdır ki küçük bir okuma hatası büyük bir A hatası doğurur, kaçak ışık da bir tavan koyar. Fotometrik gürültüde en iyi nokta A ≈ 0,434'tür; kaynaklar 0,2–0,5 arasını ideal sayar, gerekirse örnek seyreltilir ya da kısa küvet kullanılır.",
    },
  ],
  glossary: [
    { term: "Geçirgenlik (T)", definition: "Örnekten çıkan ışık şiddetinin giren ışığa oranı, T = I/I₀; 0 ile 1 arasında bir kesir." },
    { term: "Absorbans (A)", definition: "Geçirgenliğin eksi onluk logaritması, A = −log₁₀T; Beer–Lambert yasasına göre derişim ve ışık yoluyla doğru orantılı birimsiz nicelik." },
    { term: "Molar soğurma katsayısı (ε)", definition: "Bir maddenin belirli bir dalga boyunda 1 mol/L derişimde ve 1 cm yolda verdiği absorbans; birimi L mol⁻¹ cm⁻¹." },
    { term: "Kaçak ışık", definition: "Örneği geçmeden dedektöre ulaşan istenmeyen ışık; yüksek absorbanslarda okumayı bir tavana sıkıştırır." },
    { term: "Tespit sınırı (LOD)", definition: "Tanıktan ayırt edilebilen en küçük derişim; genellikle tanık gürültüsünün üç katının kalibrasyon eğimine bölümü, 3s<sub>b</sub>/b₁." },
    { term: "Eş soğurma noktası", definition: "Birbirine dönüşen iki türün aynı molar soğurma katsayısına sahip olduğu dalga boyu; toplam derişim sabitken dönüşümün her aşamasındaki tayflar bu noktadan geçer." },
    { term: "Dalga sayısı (ṽ)", definition: "Santimetredeki dalga sayısı, ṽ = 1/λ; IR tayfının yatay ekseni, birimi cm⁻¹ ve fotonun enerjisiyle doğru orantılı." },
    { term: "İndirgenmiş kütle (μ)", definition: "İki cismin birlikte titreşimini tek bir cismin hareketine indirgeyen kütle, μ = m₁m₂/(m₁ + m₂); her zaman hafif olandan küçüktür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Beer–Lambert yasası <strong>Analitik Kimya</strong> ve <strong>Enstrümantal Analiz</strong> derslerinin omurgasıdır: kalibrasyon, standart ekleme yöntemi, iç standart, belirsizlik bütçesi ve tespit sınırı orada bu sayfadaki hesapların aynısıyla yapılır. İki bileşenli karışımın 2×2 sistemi, çok bileşenli analizde ve kemometride bir matrisin tersine dönüşür; koşul sayısının neden önemli olduğunu <strong>Doğrusal Cebir</strong> ve <strong>Sayısal Analiz</strong> dersleri anlatır. Kalibrasyon doğrusunun belirsizlik formülü ise doğrudan regresyon kuramından gelir.",
      "Bandların nereden geldiği <strong>Fizikokimya</strong> ve <strong>Kuantum Kimyası</strong> sorusudur. Elektronik geçişlerin şiddetini geçiş dipol momenti ve seçim kuralları belirler; IR'de harmonik osilatörün eşit aralıklı düzeyleri, Morse potansiyelinin anharmonik düzeyleri, rotasyon–titreşim yapısı ve normal kip çözümlemesi gelir. Aynı fikirler <strong>Molekül Spektroskopisi</strong> dersinde Raman, NMR ve kütle spektrometrisiyle birleşir ve bir organik kimyacının bilinmeyen bir maddenin yapısını birkaç tayftan çıkarmasını sağlar.",
    ],
    topics: ["Enstrümantal analiz", "Kalibrasyon ve belirsizlik bütçesi", "Kemometri ve çok bileşenli analiz", "Seçim kuralları ve geçiş dipol momenti", "Anharmonik osilatör ve rotasyon–titreşim", "FTIR ve Fourier dönüşümü"],
  },
  quiz: [
    {
      question: "Bir çözeltinin 1 cm'lik küvette absorbansı 0,30'dur. Aynı çözeltiyi 2 cm'lik küvete koyarsan geçirgenlik yaklaşık ne olur?",
      options: ["0,50", "0,25", "0,60", "0,10"],
      answer: 1,
      explanation:
        "Absorbans ışık yoluyla doğru orantılıdır: A = 0,60. Geçirgenlik T = 10<sup>−0,60</sup> ≈ 0,25'tir. 1 cm'de T = 10<sup>−0,30</sup> ≈ 0,50 idi; ikinci santimetre, birincinin geçirdiği ışığın yine yarısını soğurur. T çarpılır, A toplanır.",
    },
    {
      question: "Bir spektrofotometrede ışığın %1'i örneği görmeden dedektöre ulaşıyor. Gerçek εlc = 4 olan çok derişik bir örnekte alet yaklaşık hangi absorbansı gösterir?",
      options: ["4,0", "3,0", "2,0", "1,0"],
      answer: 2,
      explanation:
        "Ölçülen geçirgenlik T′ = (10⁻⁴ + 0,01)/1,01 ≈ 0,0100'dür, yani A′ ≈ 2,0. Kaçak ışık bir tabandır: T ne kadar küçülürse küçülsün, okunan değer s/(1 + s)'nin altına inemez ve A en çok log₁₀(1 + 1/s) ≈ 2,00 olur. Sayfanın kalibrasyon sekmesi bu durumda '4,00 yerine 2,00' uyarısını verir.",
    },
    {
      question: "CHCl₃'ün C–H gerilmesi 3034 cm⁻¹'dir. Bağ sertliği aynı kalırsa, basit harmonik modele göre C–D gerilmesi yaklaşık nerede beklenir?",
      options: ["≈ 1517 cm⁻¹ (yarısı)", "≈ 2145 cm⁻¹ (√2'ye bölünmüş)", "≈ 2228 cm⁻¹", "≈ 3034 cm⁻¹ (değişmez)"],
      answer: 2,
      explanation:
        "Frekans √(k/μ) ile orantılıdır ve μ, hidrojenin değil C–H çiftinin indirgenmiş kütlesidir: 0,930 u'dan 1,725 u'ya çıkar. Oran √(1,725/0,930) ≈ 1,362, yani 3034/1,362 ≈ 2228 cm⁻¹. √2'ye bölmek karbonun sonsuz ağır olduğunu varsaymak olurdu. Gerçek değer 2266 cm⁻¹'dir; aradaki farkı anharmoniklik ve molekülün geri kalanıyla etkileşim açıklar.",
    },
  ],
  next: [
    { href: "ph-indikator.html", title: "pH ve İndikatörler: Logaritmik Ölçek, Su Dengesi ve Renk", why: "Buradaki bromtimol mavisi dengesini asit–baz tarafından açar: indikatörün rengini tayftan hesaplar ve pK değerini bir spektrofotometrik ölçüm dizisinden bulursun." },
    { href: "regresyon-ve-korelasyon.html", title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik", why: "Kalibrasyon doğrusunun arkasındaki en küçük kareler, artık çözümlemesi ve tek bir uzak noktanın doğruyu nasıl çektiği." },
    { href: "organik-kimya-ve-izomeri.html", title: "Organik Kimya ve İzomeri: Fonksiyonel Gruplar, İzomerler ve Kiralite", why: "IR tayfında tanıdığın alkol, keton, ester ve aldehit gruplarını molekül molekül kurduğun, izomerleri saydığın sayfa." },
    { href: "renk-teorisi.html", title: "Renk: Kod, Işık ve Karışım", why: "Burada XYZ'den sRGB'ye çevrilen rengin kodlanması, HSL ve HSV koordinatları, lineer ışıkta karışım ve ideal CMY filtre modelinin sınırı." },
  ],
  sources: [
    { title: "Wikipedia · Beer–Lambert law", url: "https://en.wikipedia.org/wiki/Beer%E2%80%93Lambert_law", note: "Bouguer (1729), Lambert (1760, Photometria) ve Beer (1852) tarihçesi, yasanın geçerlilik koşulları ve sapmaları (İngilizce)." },
    { title: "NIST Chemistry WebBook · Etanol, IR tayfı", url: "https://webbook.nist.gov/cgi/cbook.cgi?ID=C64175&Type=IR-SPEC&Index=3", note: "Sayfadaki IR tepe yerlerinin okunduğu Coblentz Society tayflarından biri; aynı sitede aseton, asetik asit, hekzan, etil asetat ve benzaldehit de bulunur." },
    { title: "Wikipedia · DU spectrophotometer", url: "https://en.wikipedia.org/wiki/DU_spectrophotometer", note: "1941'de çıkan ilk yaygın UV–Vis spektrofotometresi, A vitamini analizi ve üretim sayıları (İngilizce)." },
    { title: "Wikipedia · Infrared", url: "https://en.wikipedia.org/wiki/Infrared", note: "Herschel'in 1800'de kızılötesini bulması ve Coblentz'in 1905–1908 IR tayfları (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
