window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["serbest-dusme"] = {
  slug: "serbest-dusme",
  title: "Serbest Düşme: Tüy, Çekiç ve Hava",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Stroboskop izlerinden Galileo'nun tek sayılarını ve g'yi ölç; havada limit hızın kütleye nasıl bağlandığını gör; Ay'daki tüy ile çekici ve yuvarlanan bilyenin 5/7 çarpanını sına.",
  hook: "Bir çekiçle bir tüyü aynı anda bırak: tüy salınarak geride kalır. 2 Ağustos 1971'de Ay'da bir astronot aynı ikiliyi bıraktı ve ikisi toprağa aynı anda değdi. Düşmenin gerçek hâli hangisi ve hava işin içine girince kütle neden birden önem kazanır?",
  bigIdea:
    "Havasız ortamda her cisim kütlesinden bağımsız olarak aynı <em>g</em> ivmesiyle düşer, çünkü ağırlık kütleyle tam orantılıdır; hava ise hızın karesiyle büyüyen bir fren ekler ve hızı, frenin ağırlığa eşitlendiği bir <strong>limit hızla</strong> sınırlar.",
  story: [
    "Aristoteles'e göre ağır cisim, ağırlığıyla orantılı olarak daha hızlı düşerdi. Gündelik deneyim de bunu destekler gibidir: taş düşer, yaprak süzülür. Bu fikir neredeyse iki bin yıl boyunca ders kitabı bilgisi olarak kaldı, ama itirazsız değil. 6. yüzyılda İskenderiyeli düşünür <strong>Ioannes Philoponos</strong>, ağırlıkları çok farklı iki cisim bırakıldığında düşüş sürelerinin ağırlıklar oranında değil, çok az farklı olduğunu yazdı. 1586'da Flaman matematikçi <strong>Simon Stevin</strong>, Jan Cornets de Groot ile birlikte biri ötekinden on kat ağır iki kurşun bilyeyi Delft'teki bir kilise kulesinden otuz ayak (kabaca dokuz-on metre) yükseklikten bıraktıklarını kitabında anlattı: bilyeler yere birlikte varmıştı.",
    "En ünlü hikâye ise Pisa Kulesi'dir: Galileo'nun 1589–1592 yıllarında kuleden farklı ağırlıklar bırakıp Aristoteles'i çürüttüğü <em>anlatılır</em>. Hikâyeyi öğrencisi Vincenzo Viviani yazmıştır; Galileo'nun kendi yazılarında böyle bir gösteri yoktur ve tarihçilerin çoğu onu bir düşünce deneyi ya da efsane sayar. Galileo'nun gerçek kanıtı daha zekicedir. Düşmeyi yavaşlatmak için topları eğik rampalardan yuvarladı, zamanı bir kaptan akan suyu tartarak ölçtü ve eşit zaman aralıklarında alınan yolların <strong>1 : 3 : 5 : 7</strong> diye tek sayılarla büyüdüğünü buldu. 1638'de yayımlanan <em>İki Yeni Bilim</em>'de bir de mantık tuzağı kurdu: ağır taş gerçekten daha hızlı düşseydi, ona bağlanan hafif taş onu frenlemeli, ama ikisi birlikte daha ağır olduğu için daha hızlı düşmeliydi. Çelişki, ancak hepsi aynı hızla düşerse ortadan kalkar.",
    "Newton bu sonucu açıkladı: çekim kuvveti kütleyle orantılıdır, ivmelenmeye direnç de; ikisi sadeleşir. İçi altın, gümüş, kurşun, cam, kum, tuz, tahta, su ve buğdayla doldurulmuş sarkaçlarla bu orantının bininde bir hassasiyetle tuttuğunu da sınadı. Tüyü geride bırakan şey yerçekimi değil, havaydı. En çok izlenen gösteri 2 Ağustos 1971'de geldi: Apollo 15 komutanı <strong>David Scott</strong>, son Ay yürüyüşünün sonunda televizyon kameraları önünde 1.32 kg'lık alüminyum bir jeoloji çekici ile bir şahin tüyünü yaklaşık 1.6 m yükseklikten birlikte bıraktı. Havasız Ay'da ikisi aynı ivmeyle düşüp toprağa aynı anda değdi. NASA'nın sayfası tüyün kütlesini görev raporundan 0.03 kg diye aktarır, ama hemen ardından bu değerin fazla büyük olduğunu, tipik bir tüyün 0.3–3 g geldiğini ve rapordaki sayının bir yazım hatası olabileceğini not eder. Ay'ın zayıf çekiminde bu 1.6 metre yaklaşık 1.4 saniye sürer; Dünya'da, havasız bir ortamda olsa 0.57 saniye sürerdi.",
  ],
  core: [
    {
      heading: "Kütle neden sadeleşir?",
      body: "Dünya 10 kg'lık bir taşı 1 kg'lık bir taştan on kat güçlü çeker. Ama Newton'un ikinci yasasına göre ivme, kuvvetin kütleye bölümüdür ve on kat kütle on kat zor ivmelenir. İki etki birbirini tam götürür. Bu sıradan bir tesadüf değildir: çekimi belirleyen <strong>çekim kütlesi</strong> ile ivmelenmeye direnen <strong>eylemsizlik kütlesi</strong> kavram olarak farklıdır ve eşit olmaları bir deney sonucudur. Bu eşitliğe <strong>eşdeğerlik ilkesi</strong> denir.",
      formula: "a = F/m = m·g/m = g",
      formulaNote:
        "Sayfanın hesabı da böyledir: ivme = −g + F<sub>direnç</sub>/m. Havasız seçeneklerde ikinci terim yoktur ve kütle hiçbir yere girmez; üçüncü sekmede Ay'daki 1.32 kg'lık çekiç ile 1 g'lık tüy aynı 1.4055 s'de iner.",
    },
    {
      heading: "Tek sayılar ve sabit ikinci fark",
      body: "Havasız düşüşte hız her saniye g kadar artar, yol ise zamanın karesiyle büyür. Düşüşü eşit Δt aralıklarıyla fotoğraflayan bir <strong>stroboskop</strong> düşün: k'inci aralıkta alınan yol, k·Δt ve (k − 1)·Δt anlarındaki konumların farkıdır ve (2k − 1) ile orantılı çıkar. Galileo'nun 1 : 3 : 5 : 7 kuralı budur; 1'den başlayan ardışık tek sayıların toplamı hep bir tam kare olduğundan toplam yol 1, 4, 9, 16 diye büyür. Kuralın daha dayanıklı bir kardeşi de vardır: komşu iki aralıkta alınan yolların farkı her zaman g·Δt²'dir ve cisim durgun bırakılsa da, yukarı ya da aşağı fırlatılsa da değişmez. İvmenin sabit olup olmadığını sınamanın en yalın yolu budur; sayfa bu farkı izlerden ölçüp kuram değerinin yanına yazar.",
      formula: "y = h + v₀·t − ½·g·t²<br>d<sub>k</sub> = (2k − 1)·½·g·Δt²  (v₀ = 0)<br>d<sub>k+1</sub> − d<sub>k</sub> = g·Δt²",
      formulaNote:
        "Dünya'da Δt = 0.25 s için ilk üç aralık 0.306, 0.919 ve 1.532 m'dir; ardışık fark 9.80665 × 0.25² = 0.6129 m. Yukarıdaki y'de yukarı yön artıdır.",
    },
    {
      heading: "Hava: hızın karesiyle büyüyen fren ve limit hız",
      body: "Düşen cisim önündeki havayı durmadan itip yana savurmak zorundadır; hava da onu geri iter. Gündelik boyut ve hızlarda bu direnç yaklaşık olarak hızın karesiyle büyür ve üç şeye bağlıdır: havanın yoğunluğu ρ, cismin kesit alanı A ve biçimini özetleyen birimsiz <strong>sürüklenme katsayısı</strong> C<sub>d</sub>. Kütle bu listede yoktur. Cisim hızlandıkça fren büyür, ivme g·(1 − v²/v<sub>t</sub>²) biçiminde küçülür: limit hızın yarısında hâlâ g'nin dörtte üçüdür, yüzde doksanında yalnızca 0.19·g. Frenin ağırlığa eşitlendiği <strong>limit hızda</strong> ivme sıfırlanır; cisim durmaz, sabit hızla inmeyi sürdürür. Denklem çözülünce hızın limite bir tanh eğrisiyle yaklaştığı görülür; ölçeği <strong>zaman sabiti</strong> τ = v<sub>t</sub>/g belirler. Hız 0.95·v<sub>t</sub>'ye 1.832·τ sonra, cisim 1.164·v<sub>t</sub>²/g kadar düştüğünde ulaşır.",
      formula: "F = ½·ρ·C<sub>d</sub>·A·v²<br>v<sub>t</sub> = √(2·m·g/(ρ·C<sub>d</sub>·A))<br>v(t) = v<sub>t</sub>·tanh(t/τ),  τ = v<sub>t</sub>/g",
      formulaNote:
        "Sayfadaki pinpon topunda (r = 20 mm, 2.701 g, C<sub>d</sub> = 0.47) v<sub>t</sub> = 8.557 m/s ve τ = 872.5 ms'dir; top 0.95·v<sub>t</sub>'ye 1.598 s'de, 8.690 m düşünce varır. Aynı boydaki çelik kürede v<sub>t</sub> = 84.45 m/s çıkar.",
    },
    {
      heading: "Boyut, Reynolds sayısı ve Stokes yasası",
      body: "Aynı malzemeden bir küreyi büyüt: kütle r³ ile, kesit r² ile artar; karesel dirençte limit hız √r ile büyür. Küçük şeyler yavaş düşer. Biyolog J. B. S. Haldane 1926'da yazdığı <em>On Being the Right Size</em> (Doğru Boyda Olmak Üzerine) denemesinde bunu bir maden kuyusuyla anlatır: yaklaşık 900 metrelik kuyuya düşen fare, zemin yeterince yumuşaksa hafif bir sarsıntı geçirip yürüyüp gider; sıçan ölür, insanın kemikleri kırılır, at ise yere çarpıp dağılır. Hangi direnç yasasının geçerli olduğuna <strong>Reynolds sayısı</strong> karar verir: Re, akışta eylemsizlik etkilerinin viskoz (iç sürtünme) etkilere oranını ölçer. Küre için C<sub>d</sub>'yi sabit saymak kabaca 10³ &lt; Re &lt; 2×10⁵ arasında iyi bir yaklaşıktır. Re &lt; 1 iken direnç hızın kendisiyle orantılıdır (<strong>Stokes yasası</strong>) ve limit hız r² ile küçülür; sis bu yüzden havada asılı duruyormuş gibi görünür.",
      formula: "Re = ρ<sub>hava</sub>·v·2r/μ<br>Karesel: v<sub>t</sub> = √(8·r·ρ<sub>cisim</sub>·g/(3·ρ<sub>hava</sub>·C<sub>d</sub>)) ∝ √r<br>Stokes: F = 6π·μ·r·v,  v<sub>t</sub> = 2·r²·ρ<sub>cisim</sub>·g/(9·μ) ∝ r²",
      formulaNote:
        "Sayfadaki sis damlası (r = 0.01 mm) saniyede 0.01218 m, yani 12 mm kadar çöker; Re = 0.0167. Pinpon topunda Re = 23400'dür; çelik kürenin limit hızında 231000 olur ve üst sınırı aşar, sayfa da bunu söyler. Sınırlar kesin çizgiler değil, öğretim sınırlarıdır.",
    },
    {
      heading: "Yuvarlanan bilye: yavaşlatmanın bedeli",
      body: "Eğik düzlem düşmeyi yavaşlatır: sürtünmesiz kayan bir cismin ivmesi g·sin θ'dır. Ama bilye kaymaz, yuvarlanır; rampa onu sürtünme kuvveti f ile döndürmek zorundadır. Rampa boyunca Newton'un ikinci yasası m·a = m·g·sin θ − f, dönme için I·α = f·r verir; kaymadan yuvarlanmada a = α·r olduğundan f iki denklem arasında yok edilir. <strong>Eylemsizlik momenti</strong> I, kütlenin dönme ekseninden ne kadar uzağa dağıldığını ölçer; içi dolu kürede (2/5)·m·r²'dir. Sonuç a = (5/7)·g·sin θ çıkar: potansiyel enerjinin 2/7'si dönmeye gider, kütle de yarıçap da sadeleşir. İvme yine sabit olduğundan yol yine t² ile büyür ve tek sayılar kuralı bozulmaz; değişen yalnızca ivmenin büyüklüğüdür. Gereken sürtünme μ·m·g·cos θ'yı aşarsa bilye kaymaya başlar; sınır açıyı tan θ<sub>c</sub> = μ·(1 + m·r²/I) verir.",
      formula: "a = g·sin θ/(1 + I/(m·r²))<br>İçi dolu küre: a = (5/7)·g·sin θ",
      formulaNote:
        "θ = 10° için a = (5/7) × 9.80665 × sin 10° = 1.2164 m/s². Dönmeyi unutup g = a/sin θ diyen biri 7.005 m/s² bulur. μ = 0.30 için θ<sub>c</sub> = 46.4°'dir. Sayfa statik ve kinetik sürtünme katsayılarını eşit sayar.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın üç sekmesi var: <strong>01 · Boşlukta düşüş</strong>, <strong>02 · Hava direnci</strong> ve <strong>03 · Tüy, çekiç ve eğik düzlem</strong>. Hepsinde düzen aynıdır: ayarı yap, <strong>Bırak</strong>'a bas ve izle ya da <strong>Sona atla</strong> ile sonucu hemen gör. Her kartta üstte <em>ölçülen</em> değer (sayısal çözümden, izlerden ya da uyumdan), altında <em>kuram</em> değeri ve ikisinin farkı durur; fark, (ölçülen − kuram)/kuram oranıdır. <kbd>Boşluk</kbd> etkin sekmedeki deneyi bırakır ya da duraklatır, <kbd>R</kbd> sekmeyi sıfırlar. İkinci sekmedeki <em>Yarıçap r (mm)</em> ve <em>Yoğunluk ρ (kg/m³)</em> metin kutularıdır; yazdığın değer <kbd>Enter</kbd>'a basınca okunur.<br><strong>Modelin sınırları:</strong> g sabittir, cisim noktasaldır. Hava deniz düzeyindeki standart atmosferdir ve yükseklikle değişmez; kaldırma kuvveti yok sayılır, C<sub>d</sub> sabittir. Hazır cisimlerin ölçüleri, çekiç ile tüyün sürüklenme alanları ve tüyün 1 g'lık kütlesi öğretim değerleridir. “Tüy benzeri” cisim hafif ve geniş bir küredir; gerçek tüy süzülür ve döner.",
    experiments: [
      {
        title: "Tek sayılar: Dünya'da ve Ay'da",
        predict:
          "Eşit zaman aralıklarında alınan yollar nasıl büyür? Ay'da g altıda bire yakın bir değere inince 1 : 3 : 5 oranı da değişir mi, yoksa yalnızca yolların kendisi mi küçülür? Peki cismi yukarı fırlatırsan kuraldan geriye ne kalır?",
        do: "<strong>01 · Boşlukta düşüş</strong> sekmesinde ayarlara dokunmadan (Dünya, h = 20.0 m, Δt = 0.25 s) <strong>Bırak</strong>'a bas; tabloda <em>Aralık yolu</em> ve <em>Oran</em> sütunlarını, kartlarda <em>Ardışık yol farkı</em>'nı oku. Sonra <em>Gök cismi ve g</em> menüsünden Ay'ı seçip <strong>Sona atla</strong>'ya bas. Son olarak Dünya'ya dön, <em>İlk hız v₀ (yukarı +)</em> kaydırıcısını 10.0 m/s yap ve yeniden bırak.",
        observe:
          "Dünya: düşüş süresi 2.0196 s (fark 0.00 %), çarpma hızı 19.806 m/s. Aralık yolları 0.306, 0.919, 1.532 … 4.597 m; oranlar 1.000, 3.000, 5.000 … 15.000; ardışık yol farkı 0.6129 m. Ay: 4.9690 s, 8.050 m/s, 20 iz; yollar 0.051, 0.152, 0.253 m diye küçülür ama oranlar yine 1, 3, 5'tir; ardışık fark 0.1013 m. v₀ = 10.0 m/s: tepe 25.099 m (t = 1.020 s), süre 3.2822 s, çarpma 22.187 m/s; Oran sütunu boşalır, ardışık yol farkı yine 0.6129 m çıkar.",
        explain:
          "Durgun bırakılan cisim k·Δt anına kadar ½·g·(k·Δt)² düşer; ardışık iki konumun farkı (2k − 1)·½·g·Δt²'dir. g yalnızca ortak çarpanda durduğu için oran her gök cisminde aynıdır. İlk hız her aralığa aynı v₀·Δt'yi ekler ve oranı bozar; komşu aralıkların farkında ise bu terim götürülür, geriye g·Δt² kalır: 9.80665 × 0.25² = 0.6129 m.",
      },
      {
        title: "g'yi ölç: gürültü ve belirsizlik",
        predict:
          "İzlerin zamanını 5 ms'lik rastgele bir hatayla okusaydın, parabol uyumundan çıkan g gerçek değerden yüzde kaç sapardı? Beş kat sık iz almak belirsizliği beş kat mı küçültür? “±” aralığı gerçek değeri her seferinde içine alır mı?",
        do: "Birinci sekmede <strong>Sıfırla</strong> ve <strong>Sona atla</strong>; <em>y(t) uyumundan g</em> kartını oku. <em>Zaman okuma gürültüsü σ</em>'yı 5 ms yap, <em>Gürültü tohumu</em>'nu 1'den 5'e birer birer artır ve her seferinde kartı yaz. Sonra <em>Stroboskop aralığı Δt</em>'yi 0.05 s seç, <strong>Sona atla</strong>'ya bas (σ 5 ms'de kalır) ve tohumu 1, 2, 3 yap.",
        observe:
          "Gürültüsüz: 9.807 ± 0.000 m/s² (9 iz; bırakma noktası da bir izdir, yani 8 aralık). σ = 5 ms, tohum 1'den 5'e: 9.639 ± 0.157 (fark −1.71 %, 1.1 σ), 9.874 ± 0.158, 9.841 ± 0.134, 9.948 ± 0.142 ve 9.818 ± 0.069 m/s². Δt = 0.05 s ile 41 iz: tohum 1'de 9.864 ± 0.054, tohum 2'de 9.934 ± 0.054 (fark +1.30 %, 2.4 σ), tohum 3'te 9.835 ± 0.071 m/s².",
        explain:
          "Zamanı δ kadar yanlış okumak konumu v·δ kadar kaydırır: düşüşün sonunda v ≈ 20 m/s olduğundan 5 ms, 10 cm eder. ± değeri <strong>jackknife</strong> ile kestirilir: izler birer birer dışarıda bırakılıp uyum yinelenir; az izle kendisi de oynar (dokuz izde 0.069–0.158). İz sayısı 4.6 katına çıkınca ± kabaca yarıya iner, çünkü bağımsız okumalarda hata 1/√N ile küçülür. ± bir garanti de değildir: 41 izle tohumu 1'den 50'ye gezdirirsen gerçek g 38 tohumda ±1 σ, 47 tohumda ±2 σ içinde kalır. Tohum 2 dışarıda kalan üç tohumdan biridir (ötekiler 36 ve 39); 2.4 σ seyrektir ama model hatası değildir; ölçüm yinelenir.",
      },
      {
        title: "Havada kütle sahneye çıkar",
        predict:
          "Boyları aynı (r = 20 mm) iki küre 30 m'den birlikte bırakılıyor: 2.701 g'lık pinpon topu ve 263.1 g'lık çelik küre. Aynı anda mı değerler? Hangisi limit hızına ulaşır? Düşüş enerjisinin ne kadarı havaya gider?",
        do: "<strong>02 · Hava direnci</strong> sekmesinde ayarlara dokunmadan <strong>Bırak</strong>'a bas: A pinpon topu, B “A ile aynı boyut ve C_d, çelik yoğunluğu”. Tabloyu satır satır oku. Sonra <em>B cismi</em> menüsünden “A ile aynı küre, havasız ortamda”yı seçip <strong>Sona atla</strong>'ya bas. Son olarak <strong>Sis damlası</strong> düğmesine ve <strong>Sona atla</strong>'ya bas; <em>Grafik aralığı</em>'nı “Yalnız hızlanma evresi” yap.",
        observe:
          "Limit hız: A 8.557 m/s, B 84.45 m/s. A, 0.95·v_t'ye 1.598 s'de ve 8.690 m düşünce ulaşır; B için “ulaşılmadı” yazar. Yere varış 4.111 s ve 2.491 s: “B yere 1.620 s önce değdi”. Çarpma hızları 8.555 ve 23.77 m/s; dirençte harcanan enerji A'da 695.8 mJ (m·g·h'nin 87.6 %'i), B'de 3.107 J (4.0 %). Havasız B: 2.474 s ve 24.26 m/s. Sis damlası: v_t = 0.01218 m/s, Re = 0.0167; 1 m'yi 82.11 s'de iner (havasız 451.6 ms), limit hıza milisaniyeler içinde oturur.",
        explain:
          "Fren ½·ρ·C<sub>d</sub>·A·v² yalnızca boyuta, biçime ve hıza bakar: aynı hızda iki küreyi aynı kuvvetle iter. Ağırlık ise kütleyle büyür. Çelik küre 97.4 kat ağırdır, limit hızı √97.4 ≈ 9.87 kat büyüktür ve 30 metre ona yaklaşmasına yetmez; düşüşü neredeyse havasızdır. Havayı kaldırınca kütle sadeleşir ve pinpon topu da 2.474 s'de iner. Sis damlasında Re çok küçüktür; direnç hızla doğru orantılıdır (Stokes) ve damla enerjisinin neredeyse tamamını havaya bırakır.",
      },
      {
        title: "Tüy, çekiç ve 5/7",
        predict:
          "Ay'da 1.32 kg'lık çekiç mi önce değer, 1 g'lık tüy mü? Aynı ikili Dünya'da havada 1.6 m'den bırakılırsa aralarında ne kadar süre açılır? Rampadan yuvarlanan bilyenin ivmesinden g·sin θ mı çıkar?",
        do: "<strong>03 · Tüy, çekiç ve eğik düzlem</strong> sekmesinde (a) bölümünde <strong>Bırak</strong>'a bas; <em>Nerede bırakılıyor?</em> menüsünü sırayla “Dünya, vakum odası” ve “Dünya, deniz düzeyinde hava” yapıp yinele. (b) bölümünde ayarlara dokunmadan (içi dolu küre, θ = 10.0°, μ = 0.30, L = 2.0 m) <strong>Bırak</strong>'a bas. <em>Cisim</em> menüsünden “Sürtünmesiz kayan blok”u dene; sonra içi dolu küreye dönüp θ'yı 50.0° yap.",
        observe:
          "Ay: çekiç 1.4055 s, tüy 1.4055 s, fark 0.00 ms. Vakum odası: ikisi de 0.5712 s. Hava: çekiç 0.5715 s, tüy 1.0206 s, fark 449.09 ms; çarpma hızları 5.594 / 1.789 m/s. Rampa: a = 1.2164 m/s², a/(g·sin θ) = 0.7143 (kuram 5/7), a/sin θ = 7.005 m/s², enerji payları 71.4 / 28.6 / 0.0 %, aralık oranı 1.00 : 3.00 : 5.00 : 7.00 : 9.00. Blok: 1.7029 m/s², oran 1.0000, 9.807 m/s². 50.0°: a = 5.6213 m/s², oran 0.7483 “(kayıyor)”, paylar 74.8 / 21.2 / 4.0 %.",
        explain:
          "Havasız yerde kütle sadeleşir; Ay ile vakum odası arasındaki tek fark g'dir. Havada hafif ve geniş tüy 1.79 m/s'lik limit hızına hemen oturur, çekiç ise havayı neredeyse hiç duymaz. Rampada sürtünme bilyeyi döndürür ve potansiyel enerjinin 2/7'sini dönmeye ayırır: ivme g·sin θ'nın 5/7'sidir, ama sabit olduğu için tek sayılar bozulmaz. 46.4°'lik sınır açının üstünde sürtünme yetmez; bilye kayar, enerjinin bir kısmı ısıya gider ve 5/7 artık geçerli değildir.",
      },
    ],
  },
  wow: [
    {
      title: "Hava olmasaydı yağmur yaralardı",
      body: "Bir kilometre yükseklikteki buluttan havasız bir ortamda düşen damla yere √(2·9.8·1000) ≈ 140 m/s ile, yani saatte yaklaşık 500 km hızla çarpardı. Gerçekte en iri yağmur damlaları bile saniyede 9 metre civarındaki limit hızı aşmaz. Hız yaklaşık 15 kat küçük olduğu için çarpma enerjisi (140/9)² ≈ 240 kat küçüktür. Yağmurun bizi yaralamak yerine yalnızca ıslatmasını sağlayan, yerçekimiyle hava direnci arasındaki bu dengedir. Sayfanın ikinci sekmesindeki 1.5 mm yarıçaplı damla 30 metrede 8.253 m/s'ye oturur; havasız olsaydı 24.26 m/s ile çarpardı.",
    },
    {
      title: "Ses hızını aşan bir insan",
      body: "14 Ekim 2012'de Felix Baumgartner yaklaşık 39 km yükseklikteki bir balon kapsülünden atladı. Paraşütü sırtında kapalı dururken, yalnızca serbest düşüşle saatte 1357.6 km'ye (Mach 1.25) ulaştı ve ses hızını hiçbir motor ya da araç olmadan aşan ilk insan oldu. Sır havanın inceliğidir: aynı hızda direnç havanın yoğunluğu ρ ile orantılıdır, bu yüzden limit hız 1/√ρ ile büyür. Yere yakın havada bir paraşütçü 55 m/s civarında sabitlenir. Baumgartner yoğun katmanlara girdikçe fren arttı ve yavaşladı; paraşütünü ancak dört dakikayı aşkın serbest düşüşten sonra açtı.",
    },
    {
      title: "Katrilyonda bir hassasiyetle aynı",
      body: "Fransız uzay ajansı CNES'in MICROSCOPE uydusu 2016–2018 arasında yörüngede platin ve titanyum alaşımından test kütlelerini birlikte 'düşürdü'; çünkü yörünge de kesintisiz bir serbest düşmedir. 2022'de yayımlanan son sonuçlar, iki malzemenin ivmelerinin yaklaşık 10<sup>−15</sup> düzeyinde, yani katrilyonda bir hassasiyetle aynı olduğunu gösterdi. Galileo'nun rampası, Newton'un sarkaçları ve Scott'ın tüyü aynı sorunun giderek keskinleşen cevaplarıydı.",
    },
  ],
  worked: {
    title: "Otuz metreden bir pinpon topu",
    prompt:
      "Yarıçapı 20 mm, yoğunluğu 80.6 kg/m³ olan bir pinpon topu 30 m yükseklikten durgun bırakılıyor. Hava için ρ = 1.225 kg/m³, C<sub>d</sub> = 0.47, g = 9.80665 m/s² al; direnç karesel olsun. (a) Limit hızı ve zaman sabitini, (b) yere varış süresini ve çarpma hızını, (c) enerjinin havaya giden payını bul. Sonuçları ikinci sekmenin açılış ayarlarıyla karşılaştır.",
    steps: [
      "Kütle ve direnç katsayısı: m = (4/3)·π·r³·ρ = (4/3)·π·(0.020 m)³·(80.6 kg/m³) = 2.701×10⁻³ kg. Kesit A = π·r² = 1.2566×10⁻³ m². Dirençte F = k·v² yazarsak k = ½·ρ·C<sub>d</sub>·A = ½·(1.225)·(0.47)·(1.2566×10⁻³) = 3.618×10⁻⁴ kg/m.",
      "Limit hız, k·v<sub>t</sub>² = m·g koşulundan: v<sub>t</sub> = √(m·g/k) = √(2.701×10⁻³ × 9.80665 / 3.618×10⁻⁴) = 8.557 m/s. Zaman sabiti τ = v<sub>t</sub>/g = 0.8725 s, uzunluk ölçeği v<sub>t</sub>²/g = 7.466 m. Bırakma yüksekliği bu ölçeğin dört katı olduğundan top düşüşün çoğunu limit hızda geçirecek.",
      "Hareket denklemi dv/dt = g·(1 − v²/v<sub>t</sub>²). Değişkenlerine ayırıp integral alınca v = v<sub>t</sub>·tanh(t/τ), bir kez daha integral alınca düşülen yol s = (v<sub>t</sub>²/g)·ln cosh(t/τ) bulunur. s = h koyup t'yi çek: T = τ·arcosh(e<sup>g·h/v<sub>t</sub>²</sup>).",
      "Sayılar: g·h/v<sub>t</sub>² = 30 m / 7.466 m = 4.018 ve e<sup>4.018</sup> = 55.60. arcosh(55.60) = 4.711, dolayısıyla T = 0.8725 s × 4.711 = 4.111 s. Havasız düşüş √(2h/g) = 2.474 s sürerdi.",
      "Çarpma hızı: v = v<sub>t</sub>·√(1 − e<sup>−2·g·h/v<sub>t</sub>²</sup>) = 8.557 × √(1 − 3.2×10⁻⁴) = 8.555 m/s; limit hızın yalnızca 0.02 % altında. Enerji: m·g·h = 0.7946 J, yerdeki kinetik enerji ½·m·v² = 0.0988 J. Aradaki 0.6958 J havaya gitmiştir.",
    ],
    result:
      "v<sub>t</sub> = 8.557 m/s, τ = 0.8725 s, T = 4.111 s, çarpma hızı 8.555 m/s; başlangıçtaki potansiyel enerjinin 87.6 %'i dirençte harcanır. Sayfa aynı değerleri sayısal çözümden ölçer: 4.111 s, 8.555 m/s ve 695.8 mJ. Sayfa enerjiyi bir de F·v gücünü zaman boyunca toplayarak bulur; iki yolun uyuşması çözümün sınanmasıdır.",
  },
  misconceptions: [
    {
      myth: "Havasız ortamda bile ağır cisim hafif olandan önce yere varır.",
      truth:
        "Ağır cisim daha çok çekilir ama o kadar da zor ivmelenir; ivme ikisi için de g'dir. Sayfanın üçüncü sekmesinde kütleleri 1320 kat farklı çekiç ile tüy Ay'da da, Dünya'daki vakum odasında da aynı anda değer: 1.4055 s ve 0.5712 s. İkinci sekmede havayı kaldırınca pinpon topu da 30 metreyi çelik küre gibi 2.474 s'de iner.",
    },
    {
      myth: "Limit hıza ulaşan cisme artık hiçbir kuvvet etki etmez.",
      truth:
        "İki kuvvet hâlâ oradadır ve ikisi de büyüktür: ağırlık aşağı, hava direnci yukarı. Eşit oldukları için net kuvvet, dolayısıyla ivme sıfırdır. Limit hızdaki 80 kg'lık paraşütçüyü hava 784 N'luk bir kuvvetle yukarı iter.",
    },
    {
      myth: "Havada ağır olan her zaman önce düşer.",
      truth:
        "Belirleyici olan kütlenin kendisi değil, ağırlığın frene oranıdır: v<sub>t</sub>² = 2·m·g/(ρ·C<sub>d</sub>·A). İkinci sekmede A'yı <strong>Yağmur damlası</strong>, B'yi “Tüy benzeri cisim” yap: 14.14 mg'lık damla 30 metreyi 4.218 s'de iner, ondan 71 kat ağır olan 1.005 g'lık geniş cisim 10.47 s'de. Küçük ve yoğun olan, iri ve hafif olanı geçer.",
    },
    {
      myth: "Eğik düzlemde yuvarlanan bilye g·sin θ ivmesiyle iner.",
      truth:
        "O ivme sürtünmesiz kayan bir cisme aittir. Yuvarlanan içi dolu küre potansiyel enerjisinin 2/7'sini dönmeye harcar ve (5/7)·g·sin θ ile hızlanır; içi boş ince kürede çarpan 3/5'tir. Sayfada 10°'lik rampada a/sin θ = 7.005 m/s² çıkar, 9.807 değil. Yolun zamanın karesiyle büyümesi ise bundan etkilenmez.",
    },
  ],
  glossary: [
    {
      term: "Serbest düşme",
      definition:
        "Bir cismin yalnızca yerçekiminin etkisiyle yaptığı hareket; hava direnci devreye girince düşüş artık tam anlamıyla serbest değildir.",
    },
    {
      term: "Yerçekimi ivmesi (g)",
      definition:
        "Serbest düşen cismin hızının saniyede artış miktarı; Dünya yüzeyinde enleme ve yüksekliğe göre yaklaşık 9.78–9.83 m/s², standart değeri 9.80665 m/s².",
    },
    {
      term: "Stroboskop izi",
      definition:
        "Hareketli cismin eşit zaman aralıklarıyla kaydedilen konumu; ardışık izler arasındaki uzaklık o aralıkta alınan yoldur.",
    },
    {
      term: "Sürüklenme katsayısı (C<sub>d</sub>)",
      definition:
        "Cismin biçiminin havayı ne kadar zor yardığını gösteren birimsiz sayı; F = ½·ρ·C<sub>d</sub>·A·v² içinde yer alır ve Reynolds sayısıyla değişir.",
    },
    {
      term: "Limit hız (v<sub>t</sub>)",
      definition:
        "Hava direncinin ağırlığa eşitlendiği, ivmenin sıfıra indiği sabit düşüş hızı; karesel dirençte √(2·m·g/(ρ·C<sub>d</sub>·A)).",
    },
    {
      term: "Reynolds sayısı (Re)",
      definition:
        "Akışta eylemsizlik etkilerinin viskoz etkilere oranını veren birimsiz sayı; küre için ρ·v·2r/μ.",
    },
    {
      term: "Eylemsizlik momenti (I)",
      definition:
        "Bir cismin dönme hızındaki değişime direncinin ölçüsü; kütlenin dönme ekseninden uzaklığına bağlıdır, içi dolu kürede (2/5)·m·r².",
    },
    {
      term: "Eşdeğerlik ilkesi",
      definition:
        "Çekim kütlesi ile eylemsizlik kütlesinin eşit olması; her cismin aynı yerde aynı ivmeyle düşmesinin temeli.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede serbest düşme iki formüldür; üniversitede bir <strong>diferansiyel denklem</strong>: m·dv/dt = m·g − k·v², burada k = ½·ρ·C<sub>d</sub>·A. Değişkenlerine ayrılarak çözülür ve hız v(t) = v<sub>t</sub>·tanh(g·t/v<sub>t</sub>) çıkar: t = v<sub>t</sub>/g anında hız limitin 76 %'sına, iki katı sürede 96 %'sına ulaşır. Stokes bölgesinde denklem doğrusaldır ve hız limite üstel olarak yaklaşır. Hangisinin geçerli olduğunu Akışkanlar Mekaniği dersinde <em>Reynolds sayısı</em> söyler; gerçek C<sub>d</sub> de Re ile değişir ve sayfanın sabit C<sub>d</sub> modeli bu eğriyi içermez, yalnızca sınır aşılınca uyarır. Fizik I'in ikinci yarısındaki dönme dinamiği ise rampadaki 5/7'nin kaynağıdır: tork, eylemsizlik momenti ve kaymadan yuvarlanma.",
      "Sayfanın kendisi de bir köprüdür: hareket denklemini dördüncü mertebe Runge–Kutta yöntemiyle, 1/240 s'lik (hava direncinde en çok τ/40) sabit adımlarla çözen küçük bir <strong>sayısal integratördür</strong> ve yere değme anını adımın içinde ara değerle bulur. Havasız düşüşte mekanik enerji sapması 10⁻¹⁴ düzeyinde kalır. İzlerden g çıkarmak Fizik Laboratuvarı ve İstatistik derslerinin konusudur: en küçük kareler, belirsizlik ve bir aralığın gerçek değeri hangi sıklıkla kapsadığı. Kuramsal tarafta eşdeğerlik ilkesi Einstein'ın, sonradan 'hayatının en mutlu düşüncesi' dediği 1907 fikrine götürür: serbest düşen bir insan kendi ağırlığını hissetmez. Bu fikir genel göreliliğe dönüştü. Uluslararası Uzay İstasyonu'ndaki astronotlar yerçekimsiz değildir; orada çekim yüzeydekinin yaklaşık 90 %'ıdır. Sürekli serbest düşmede oldukları için süzülürler.",
    ],
    topics: [
      "Diferansiyel denklemler",
      "Sayısal yöntemler (Runge–Kutta)",
      "Akışkanlar mekaniği ve Reynolds sayısı",
      "Dönme dinamiği ve eylemsizlik momenti",
      "En küçük kareler ve belirsizlik",
      "Boyut analizi ve ölçekleme",
      "Eşdeğerlik ilkesi ve genel görelilik",
    ],
  },
  quiz: [
    {
      question:
        "Birinci sekmede Dünya'da Δt = 0.25 s iken ardışık yol farkı 0.6129 m çıkıyor. Stroboskop aralığını 0.50 s yaparsan bu fark ne olur?",
      options: ["0.6129 m", "1.2258 m", "2.4517 m", "4.9033 m"],
      answer: 2,
      explanation:
        "Komşu aralıklarda alınan yolların farkı g·Δt²'dir; Δt iki katına çıkınca fark dört katına çıkar: 9.80665 × 0.50² = 2.4517 m. Yüksekliği ya da ilk hızı değiştirmek bu sayıyı oynatmaz; yalnızca g ve Δt belirler.",
    },
    {
      question:
        "İkinci sekmede B cismi olarak “A ile aynı boyut ve C_d, 10 kat kütle” seçiliyor. Karesel dirençte B'nin limit hızı A'nınkinin kaç katıdır?",
      options: ["Aynı", "Yaklaşık 3.16 katı", "10 katı", "100 katı"],
      answer: 1,
      explanation:
        "Fren aynı, ağırlık on kat: v<sub>t</sub> = √(2·m·g/(ρ·C<sub>d</sub>·A)) kütlenin kareköküyle büyür, √10 ≈ 3.16. Pinpon topu için 8.557 m/s yerine 27.06 m/s. Stokes yasasında direnç v ile orantılı olduğundan limit hız tam 10 katına çıkardı; havasız ortamda ise limit hız diye bir şey yoktur.",
    },
    {
      question:
        "Bir öğrenci içi dolu bilyeyi 10°'lik rampadan yuvarlayıp a = 1.2164 m/s² ölçüyor ve g = a/sin θ ile 7.005 m/s² buluyor. Deneyi 20°'de yinelerse aynı hesap ne verir?",
      options: [
        "Yaklaşık 9.81 m/s²; dik rampada hata kaybolur",
        "Yine 7.005 m/s²",
        "Yaklaşık 14 m/s²",
        "Yaklaşık 3.5 m/s²",
      ],
      answer: 1,
      explanation:
        "Kaymadan yuvarlanan içi dolu kürede a = (5/7)·g·sin θ olduğundan a/sin θ her açıda (5/7)·g = 7.005 m/s²'dir; 20°'de a = 2.3958 m/s² ölçülür. Hata rastgele değil sistematiktir: açıyı değiştirmek ya da ölçümü yinelemek onu gidermez, modele dönmeyi eklemek giderir.",
    },
  ],
  next: [
    {
      href: "tek-sayi-toplam3.html",
      title: "Tek Sayılardan Kareye",
      why: "Galileo'nun 1 : 3 : 5 : 7 kuralının sayı tarafı: bir kareyi büyütmek için her seferinde neden bir tek sayı kadar hücre gerektiğini katman katman kur.",
    },
    {
      href: "atislar.html",
      title: "Eğik Atış: Hava Direnci ve En İyi Açı",
      why: "Aynı düşüşe yatay hız ekle. Sayfa uçuştan ölçtüğü menzil, süre ve çarpma hızını boşluk formülleriyle karşılaştırır; açı taraması havada en iyi açının 45°'nin altına indiğini gösterir.",
    },
    {
      href: "newton-hareket-yasalari.html",
      title: "Newton'un Hareket Yasaları: Kuvvet, Kütle ve İvme",
      why: "Kütlenin sadeleşmesinin ardındaki F = m·a: sürtünmeli blok, asılı kütleyle çekilen araba ve yayla ayrılan iki araba. Orada da ölçülen değer kuramın yanında durur.",
    },
    {
      href: "akiskanlar-mekanigi.html",
      title: "Akışkanlar Mekaniği: Akış, Kayıp ve Pompa",
      why: "Reynolds sayısı orada boru akışının rejimini belirler; tanktan çıkan suyun hızı da tanıdık √(2gh)'dir. Venturi, ince boru ve pompa deneyleriyle akışkanın öbür yüzünü gör.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 3.5 Free Fall",
      url: "https://openstax.org/books/university-physics-volume-1/pages/3-5-free-fall",
      note: "Serbest düşme denklemleri ve çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title:
        "OpenStax · University Physics Vol. 1, 6.4 Drag Force and Terminal Speed",
      url: "https://openstax.org/books/university-physics-volume-1/pages/6-4-drag-force-and-terminal-speed",
      note: "Sürüklenme kuvveti, ½ρC<sub>d</sub>Av² ve limit hız; paraşütçü örnekleri.",
    },
    {
      title: "NASA NSSDCA · The Apollo 15 Hammer-Feather Drop",
      url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html",
      note: "David Scott'ın Ay'daki gösterisi: 1.32 kg'lık çekiç, şahin tüyü, yaklaşık 1.6 m; tüyün rapordaki 0.03 kg'lık kütlesi için düzeltme notu.",
    },
    {
      title: "Wikipedia · Galileo's Leaning Tower of Pisa experiment",
      url: "https://en.wikipedia.org/wiki/Galileo%27s_Leaning_Tower_of_Pisa_experiment",
      note: "Pisa hikâyesinin kaynağı Viviani, Stevin'in 1586 Delft deneyi ve Philoponos: efsane ile kanıtın ayrımı.",
    },
  ],
  revision: "Kasım 2026",
};
