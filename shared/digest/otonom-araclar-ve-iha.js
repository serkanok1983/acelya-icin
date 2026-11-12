window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["otonom-araclar-ve-iha"] = {
  slug: "otonom-araclar-ve-iha",
  title: "Otonom Araçlar ve İHA: Ölçen, Kestiren, Düzelten Makineler",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Sürücüsüz araç da drone da aynı döngüyü döndürür: algıla, kestir, planla, denetle. Dört canlı deneyde PID'yi, Kalman süzgecini, yol izlemeyi ve durma mesafesini önce ölç, sonra kuramla karşılaştır.",
  hook:
    "Mart 2004'te Mojave Çölü'nde, yaklaşık 230 kilometrelik bir yarışın finaline 15 sürücüsüz araç çıktı. En iyisi 12 kilometre gidebildi; ötekiler bir sete ya da kayaya takıldı, devrildi, kimi başlangıç alanından bile çıkamadı. On dokuz ay sonra aynı çölde beş araç bitiş çizgisini geçti. Bu kadar kısa sürede ne değişmişti? Motorlar değil; makinelerin ölçme, kestirme ve kendi hatasını düzeltme biçimi.",
  bigIdea:
    "Otonom bir makine dört halkalı bir döngüdür: sensörler dünyayı ölçer (<strong>algılama</strong>), bir süzgeç gürültülü ölçümlerden durumu çıkarır (<strong>kestirim</strong>), bir algoritma yolu seçer (<strong>planlama</strong>), bir denetleyici hatayı durmadan küçültür (<strong>denetim</strong>); her halkanın ne kadar iyi çalıştığı ölçülebilir ve kuramla karşılaştırılabilir.",
  story: [
    "1925'te New York'ta Broadway boyunca içinde kimsenin olmadığı bir otomobil ilerledi; araç, arkasından gelen ikinci bir arabadan radyo dalgalarıyla yönetiliyordu. Bu bir uzaktan kumandaydı, otonomi değil: karar veren hâlâ bir insandı. Aracın kendi gözüyle görüp kendi karar vermesi için elli yıl geçmesi gerekti. 1977'de Japonya'daki Tsukuba Makine Mühendisliği Laboratuvarı'nın aracı, yoldaki beyaz işaretleri iki kamerayla izleyerek saatte 30 kilometreye ulaştı. Asıl sıçrama Münih'te oldu: Ernst Dickmanns'ın ekibi 1987'de kamerayla gören bir minibüsü boş otoyolda saatte 96 kilometreye çıkardı; 1994'te iki aracı Paris çevresindeki üç şeritli otoyolda trafiğin içinde bin kilometreden fazla yol aldı; 1995'te Münih'ten Danimarka'ya gidip dönen yaklaşık 1600 kilometrelik yolculukta araç yer yer saatte 175 kilometreye çıktı ve ekibin raporuna göre yolun yaklaşık yüzde 95'ini kendi sürdü. Aynı yıl Carnegie Mellon Üniversitesi'nin Navlab 5 adlı araştırma aracı ABD'yi bir kıyıdan ötekine geçti: 4600 kilometreye yakın yolun yüzde 98'inde direksiyonu bilgisayar çevirdi, gaz ve freni ise hâlâ insan kullanıyordu.",
    "Sonra kamu parası ve bir yarış işin rengini değiştirdi. ABD Savunma Bakanlığı'nın araştırma kolu DARPA, 2004'te Mojave Çölü'nde bir milyon dolar ödüllü bir yarış düzenledi; hiçbir araç bitiremedi, en iyi derece Carnegie Mellon ekibinin Sandstorm adlı aracının yaklaşık 12 kilometresiydi. 2005'teki ikinci yarışta Stanford Üniversitesi'nin Sebastian Thrun yönetimindeki ekibi, Stanley adını verdiği araçla 212 kilometrelik parkuru 6 saat 53 dakikada tamamladı; toplam beş araç bitirdi. Stanley'nin sırrı daha güçlü bir motor değil, belirsizlikle barışık bir yazılımdı: lazer ve kameradan gelen gürültülü verileri olasılık hesabıyla birleştiriyor, lazerin yakında 'düz' bulduğu zeminin kamerada nasıl göründüğünü öğrenip aynı görünümü uzakta arıyordu. 2007'de yarış şehre taşındı; kavşakların, park yerlerinin ve başka araçların olduğu Urban Challenge'ı Carnegie Mellon ekibinin Boss adlı aracı kazandı.",
    "Havadaki hikâye daha eskidir ve daha tuhaf başlar. 1907'de Fransa'da Breguet kardeşlerin dört rotorlu Gyroplane'i yerden yalnızca 60 santimetre kadar yükselebildi ve dört kişi onu tutmak zorunda kaldı: ilk dört rotorlu hava aracı kendi başına dengede duramıyordu. Çözümün ilk hâli 1914'te Paris yakınlarında sergilendi: Lawrence Sperry, jiroskoplu bir dengeleyici taktığı uçakla ellerini havaya kaldırıp jürinin önünden geçti; bu sırada makinistinin kanadın üstünde yürüdüğü anlatılır. Birinci Dünya Savaşı'nda mürettebatsız uçaklar denendi; 1935'te İngiliz Kraliyet Hava Kuvvetleri'nin uzaktan kumandalı hedef uçağı Queen Bee'nin (kraliçe arı) 'drone' (erkek arı) sözcüğüne esin verdiği söylenir. Modern çağ ise ceplerden çıktı: akıllı telefonlar için üretilen ucuz MEMS jiroskop ve ivmeölçerler 2010'lu yıllarda dört rotorlu küçük hava araçlarını herkesin alabileceği bir şeye dönüştürdü. O dört rotor artık saniyede yüzlerce, sonra binlerce kez kendini dengeliyordu.",
    "Bu sayfadaki sekmeler üç eski fikrin üstünde durur. 1922'de Nicolas Minorsky, ABD donanması için gemileri otomatik rotada tutan denetleyiciyi çözümlerken bugün PID dediğimiz üçlüyü yazdı: hatanın kendisi, birikimi ve değişim hızı. 1960'ta Rudolf Kálmán, gürültülü ölçümleri bir öngörüyle birleştiren süzgeci yayımladı; birkaç yıl içinde Apollo'nun Ay'a giden seyir bilgisayarına girdi. 1968'de Stanford Research Institute'ta Peter Hart, Nils Nilsson ve Bertram Raphael, Shakey adlı robotun odalar arasında yol bulması için A* algoritmasını tasarladı. İlk ikisini bu sayfanın birinci ve ikinci sekmesinde kendi elinle ayarlarsın; üçüncüsü, yani planlama halkası, Yol Bulma sayfasında ayrı bir laboratuvardır.",
  ],
  core: [
    {
      heading: "Geri besleme: bir yay, bir amortisör ve bir adım",
      body:
        "Birinci sekmedeki drone tek bir şey yapar: irtifa tutar. Denetleyici itkiyi T = m·g + K<sub>p</sub>·e − K<sub>d</sub>·z′ diye seçer; e = Δz − z hedefe kalan mesafedir. Bunu hareket denklemine (m·z″ = T − m·g − b·z′) koyunca ağırlık sadeleşir ve tanıdık bir denklem kalır: m·z″ + (b + K<sub>d</sub>)·z′ + K<sub>p</sub>·z = K<sub>p</sub>·Δz. Bu, sönümlü bir yay-kütle sistemidir; yalnız yay da amortisör de yazılımdır. <strong>Oransal kazanç</strong> yayın sertliği, <strong>türev kazancı</strong> amortisördür. Sistemi iki sayı anlatır: doğal frekans ω<sub>n</sub> = √(K<sub>p</sub>/m) ve <strong>sönüm oranı</strong> ζ = (b + K<sub>d</sub>)/(2·√(K<sub>p</sub>·m)). ζ birden küçükse drone hedefi aşar; aşımın oranı yalnız ζ'ye bağlıdır. Sayfanın varsayılanında (K<sub>p</sub> = 8 N/m, K<sub>d</sub> = 3 N·s/m, m = 1 kg, b = 0.2 N·s/m) ω<sub>n</sub> = 2.828 rad/s, ζ = 0.566 ve formül 11.59 % aşım öngörür. Yaya sabit bir kuvvet asarsan yay uzar: 3 N'luk rüzgâr drone'u F/K<sub>p</sub> = 0.375 m aşağıda bırakır. <strong>İntegral</strong> terimi bu yüzden vardır: hata sıfırlanana dek birikir ve rüzgârı tam karşılayan itkiyi kendisi bulur.",
      formula: "m·z″ + (b + K<sub>d</sub>)·z′ + K<sub>p</sub>·z = K<sub>p</sub>·Δz,   aşım = e<sup>−πζ/√(1−ζ²)</sup>",
      formulaNote: "Motor gecikmesi τ = 0 ve K<sub>i</sub> = 0 iken geçerlidir (sayfadaki 'İkinci derece' düğmesi). Türev hatadan değil ölçülen hızdan alınır; böylece hedef bir anda değiştiğinde türev terimi sıçrama üretmez. Aşım formülü ζ < 1 içindir.",
    },
    {
      heading: "Gecikme, kararlılık sınırı ve doyma",
      body:
        "Gerçek bir motor istenen itkiye anında çıkamaz. Sayfa bunu T′ = (T<sub>istenen</sub> − T)/τ ile modeller; bu tek satır kapalı döngünün derecesini ikiden üçe çıkarır: τ·m·s³ + (m + τ·b)·s² + (b + K<sub>d</sub>)·s + K<sub>p</sub> = 0. İkinci derece bir sistem, katsayıları artı oldukça hangi kazancı verirsen ver kararlıdır; üçüncü derece öyle değildir. <strong>Routh–Hurwitz ölçütü</strong> kökleri bulmadan cevabı verir: a₃s³ + a₂s² + a₁s + a₀ için koşul a₂·a₁ > a₃·a₀, yani K<sub>p</sub> < (m + τ·b)·(b + K<sub>d</sub>)/(τ·m). Varsayılan τ = 0.05 s ile sınır 1.01 × 3.2 / 0.05 = 64.64 N/m'dir; sayfanın 'kararlı K<sub>p</sub> aralığı' satırı aynı sayıyı yazar. Gecikme büyüdükçe izin verilen kazanç küçülür: denetleyiciyi sertleştirmenin bedeli, eyleyicinin hızına bağlıdır. İkinci sınır doğrusal bile değildir: itki 0 ile T<sub>max</sub> arasına sıkışmıştır (<strong>doyma</strong>). Motor tavana dayanmışken hata sürer, integral büyümeyi sürdürür ve drone hedefe vardığında boşaltılması gereken koca bir birikim kalır. Buna <strong>integral şişmesi</strong> denir; yaygın bir çaresi, doyma sürerken integrali dondurmaktır. 'İntegral şişmesi' düğmesinde aynı kazançlarla aşım korumasız 90.79 %, korumalı 7.47 % çıkar.",
      formula: "K<sub>p</sub> < (m + τ·b)·(b + K<sub>d</sub>) / (τ·m)",
      formulaNote: "K<sub>i</sub> = 0 için kararlılık koşulu. K<sub>i</sub> > 0 olunca payda dördüncü dereceye çıkar ve bir alt sınır da doğar: varsayılanda K<sub>i</sub> = 4 N/(m·s) ile aralık 1.29 – 63.35 N/m'dir. Doymada bu doğrusal çözümleme geçerli değildir; sayfanın durum satırı bunu söyler.",
    },
    {
      heading: "Kalman süzgeci: iki belirsiz bilgiyi tartmak",
      body:
        "GPS aracın 100 metrede olduğunu söylüyor ama ±5 metre şaşabiliyor; ivmeden yapılan öngörü 103 metre diyor ve ±2 metre güvenilir. İkisine de inanmalı, ama güvenilirlikleriyle orantılı. <strong>Kalman süzgeci</strong> (filtresi) öngörüyü, ölçümle arasındaki farkın bir kesriyle düzeltir. Kesri bulmak bir türev sorusudur: birleşik kestirimin varyansı (1 − K)²·P + K²·R'dir; K'ye göre türevini sıfırlarsan K = P/(P + R) çıkar. Örnekte P = 4 m², R = 25 m², K = 4/29 ≈ 0.14; düzeltilmiş konum ≈ 102.6 m, belirsizlik ±1.9 m: birleşik kestirim iki kaynağın her birinden daha kesindir. Süzgeç iki adımı yineler: <em>öngörü</em> adımında durum hareket modeliyle ilerletilir ve belirsizlik büyür, <em>düzeltme</em> adımında ölçüm gelir ve belirsizlik küçülür. İkinci sekmede durum konum ve hızdır, P de 2 × 2'lik bir matristir; 3 m gürültülü GPS ile 0.5 m/s² gürültülü ivmeölçer birleşince konum belirsizliği 0.711 m'ye iner. Süzgeç yalnız bir kestirim değil, ona ne kadar güvendiğini de üretir (P). Bu güven doğru mu? Ölçüsü <strong>NEES</strong>'tir: hatanın, süzgecin kendi belirsizliğine göre ölçeklenmiş karesi e<sup>T</sup>·P⁻¹·e. İki durumlu <strong>tutarlı</strong> bir süzgeçte ortalaması 2'dir; çok büyükse süzgeç kendine fazla güveniyor, küçükse çekingen davranıyor demektir.",
      formula: "<span class=hat>x</span> = x⁻ + K·(z − x⁻),   K = P⁻ / (P⁻ + R),   P = (1 − K)·P⁻",
      formulaNote: "Tek boyutlu durum: x⁻ öngörü, z ölçüm, P⁻ öngörünün varyansı, R ölçümün varyansı. K birse yalnız ölçüme, sıfırsa yalnız öngörüye inanılır. Sayfadaki süzgeç aynı formülün matris hâlini kullanır; R'yi ve Q'yu süzgece sen verirsin, gerçek gürültüyü ise ayrı kaydırıcılar belirler.",
    },
    {
      heading: "Yol izleme: direksiyon bir geometri problemidir",
      body:
        "Üçüncü sekmedeki araç <strong>kinematik bisiklet modeli</strong>dir: ön tekerlek δ kadar dönükse arka aks L/tan δ yarıçaplı bir çember çizer (L dingil açıklığı, sayfada 2.7 m). <strong>Saf takip</strong> arka akstan bakar: yolun üstünde L<sub>d</sub> uzaktaki bir hedef nokta seçer ve arka akstan geçen, araca teğet olan, hedefe uğrayan çemberi sürer. O çemberin eğriliği 2·sin α/L<sub>d</sub>'dir (α hedefin aracın burnuna göre açısı), direksiyon da δ = atan(2·L·sin α/L<sub>d</sub>). Yol R yarıçaplı bir yaysa bu çember yolun kendisidir: arka aks yolun tam üstünde kalır, δ = atan(L/R) olur. <strong>Stanley</strong> ise ön aksa bakar: direksiyonu yolun yönüne çevirir ve ön aksın sapması kadar içeri kırar, δ = ψ − atan(k·e<sub>ön</sub>/v). Küçük sapmalarda ön aksın hatası e′ = −k·e ile, 1/k zaman sabitiyle söner. Saf takibin düzlükteki sapması da küçük açılarda yol boyunca e″ + (2/L<sub>d</sub>)·e′ + (2/L<sub>d</sub>²)·e = 0 denklemine uyar: yine ikinci derece bir sistem, sönüm oranı L<sub>d</sub> ne olursa olsun 1/√2, aşım hep e<sup>−π</sup> = 4.32 %. Bakış mesafesi aşımı değil, düzelmenin kaç metre süreceğini belirler. Direksiyonun gecikmesi (τ<sub>δ</sub>) denklemin başına (τ<sub>δ</sub>·v)·e‴ terimini ekler; Routh–Hurwitz ölçütüne göre salınım ancak L<sub>d</sub> > τ<sub>δ</sub>·v ise söner: araç hızlandıkça daha uzağa bakmalıdır.",
      formula: "δ<sub>saf takip</sub> = atan(2·L·sin α / L<sub>d</sub>),   δ<sub>Stanley</sub> = ψ − atan(k·e<sub>ön</sub> / v)",
      formulaNote: "α: hedef noktanın aracın yönüne göre açısı; ψ: yolun yönü ile aracın yönü arasındaki fark; e<sub>ön</sub>: ön aksın yoldan sapması. Model lastik kaymasını bilmez; sayfa yanal ivme 4 m/s²'yi (öğretim eşiği) geçince uyarır.",
    },
    {
      heading: "Göremediğin mesafede duramazsın",
      body:
        "Mesafe ölçen sensörlerin çoğu aynı numarayı yapar: bir dalga gönderir, yankının dönüşünü bekler, süreyi ikiye böler (d = c·Δt/2). Lidar bunu ışıkla yapar; 100 metredeki bir cismin yankısı 2 × 100 / (3×10⁸) = 667 nanosaniyede döner. Ama tek bir ışın tek bir yöne bakar; lidar çevreyi Δφ açı aralıklı ışınlarla <em>örnekler</em>. d uzaklığında komşu iki ışının arası 2·d·tan(Δφ/2) kadardır: 1°'lik taramada 20 metrede 0.349 m, 50 metrede 0.873 m. ρ yarıçaplı yuvarlak bir engel sensörden 2·asin(ρ/d) açısıyla görünür; bu açı Δφ'den küçükse engel iki ışının arasına düşebilir ve bir taramada yakalanma olasılığı 2·asin(ρ/d)/Δφ olur. Kesin algılama yalnız d ≤ ρ/sin(Δφ/2) içindir. Görmek yetmez, durmak da gerekir. Engel fark edildikten sonra araç tepki süresi t<sub>r</sub> boyunca hızını korur, sonra en çok µ·g ivmesiyle yavaşlar: kapanma mesafesi v·t<sub>r</sub> + v²/(2·µ·g). İlk terim hızla doğru orantılı, ikincisi hızın karesiyle büyür. Sayfanın varsayılanında (20 m/s, t<sub>r</sub> = 0.5 s, µ = 0.7) bu 10.00 m + 29.12 m = 39.12 m eder. Denklemi ters çevirirsen her sensör menzilinin bir güvenli üst hızı olduğunu görürsün: 80 m menzil ve 2 m pay için 29.48 m/s (106 km/h). Sürüş otomasyonunun düzeyi ne olursa olsun bu sınır aynıdır.",
      formula: "d<sub>kapanma</sub> = Δv·t<sub>r</sub> + Δv² / (2·µ·g),   P<sub>algılama</sub> = min(1, 2·asin(ρ/d) / Δφ)",
      formulaNote: "Δv öndeki engele göre bağıl hız (engel duruyorsa kendi hızımız), µ yol–lastik sürtünme katsayısı, g = 9.81 m/s². Düz yol, hızdan bağımsız sürtünme, hava direnci yok. Lidar modelinde ışın sonsuz ince, engel tam yansıtıcı bir dairedir. Bütün sayılar öğretim değeridir; belirli bir aracı ya da sensörü anlatmaz.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvardır ve her sekme döngünün bir halkasını canlı olarak benzetir. <strong>01 · Denetim (PID)</strong>: 1 kg'lık dört pervaneli bir drone irtifa tutar; kazançları, <em>Motor gecikmesi τ</em>, <em>Hedef adımı Δz</em> ve <em>Rüzgâr kuvveti F</em> kaydırıcılarını sen ayarlarsın. <strong>02 · Durum kestirimi (Kalman)</strong>: tek boyutta giden bir aracın konumu gürültülü GPS ve ivmeölçerden kestirilir; 400 koşunun ölçülen RMS hatası süzgecin kendi σ'sıyla yan yana durur. <strong>03 · Yol izleme</strong>: araç bir yarım çemberi ya da şerit değiştirmeyi <em>Saf takip</em> ya da <em>Stanley</em> ile izler. <strong>04 · Algılama ve güvenlik payı</strong>: durma mesafesi, çarpışmaya kalan süre (TTC) ve bir lidar taraması. Kartlar ölçülen değeri kuramın yanında, farkıyla birlikte yazar; her sekmede hazır ayar düğmeleri ve bir <strong>Sıfırla</strong> vardır, <kbd>Boşluk</kbd> canlandırması olan sekmelerde oynatır/duraklatır, <kbd>R</kbd> sekmeyi sıfırlar. Sayılar ondalık noktayla yazılır. Bütün araç ve sensör değerleri öğretim değeridir; aşağıdaki sayılar hazır ayarların varsayılan öteki değerleriyle geçerlidir.",
    experiments: [
      {
        title: "Aşım formülü ne zaman tam tutar? (01 · Denetim)",
        predict:
          "Varsayılan kazançlarla (K<sub>p</sub> = 8 N/m, K<sub>d</sub> = 3 N·s/m) ikinci derece formülü 11.59 % aşım öngörüyor. Motorun 0.05 saniyelik gecikmesi ölçülen aşımı büyütür mü, küçültür mü? Gecikmeyi sıfırlarsan fark kapanır mı? Sonra 3 N'luk bir rüzgâr drone'u aşağı itiyor: integral yokken drone hedefin kaç santimetre altında kalır, K<sub>i</sub> = 4 N/(m·s) eklersen ne ödersin?",
        do: "Sekmeyi <strong>Sıfırla</strong> ve 'Aşım' ile 'İlk tepe zamanı' kartlarını oku. <strong>İkinci derece (τ = 0)</strong> düğmesine bas, aynı kartlara yeniden bak. Sonra sırayla <strong>Rüzgâr, yalnız PD</strong> ve <strong>Rüzgâr, PID</strong> düğmelerine basıp 'Kalıcı hata, rüzgârda' kartını ve aşımı karşılaştır. Son olarak <strong>Kazanç fazla</strong> düğmesine bas; ardından <em>İtki sınırı (doyma) açık</em> kutusunun işaretini kaldır.",
        observe:
          "Varsayılanda aşım 14.25 % (formül 11.59 %, fark +2.66 puan), ilk tepe 1.266 s (formül 1.347 s); periyot ise 2.403 s ile tam modelin kutbuna uyar (fark 0.00 %). τ = 0 olunca aşım 11.59 %, tepe 1.347 s: fark sıfır. Rüzgârda yalnız PD ile kalıcı hata 0.375 m; PID ile 0.001 m, ama aşım 37.42 %'ye çıkar. 'Kazanç fazla' kartı 'Kararsız' yazar (sınır 32.64 N/m, en sağdaki kutup +0.799 1/s): drone tepeden tepeye 4.89 m'lik sönmeyen bir salınıma oturur, ilk 10 saniyenin 95.1 %'i itki sınırında geçer. Doymayı kapatınca kartlar 'ıraksadı' der.",
        explain:
          "Formül ikinci derece bir sistemin formülüdür; motor gecikmesi denkleme üçüncü bir kök ekler ve sönüm oranını düşürür. Eksiği tamamlanmış modelin kutupları periyodu tam verir: hata formülde değil, varsayımdadır. Rüzgârda oransal terim ancak hata varken kuvvet üretir, bu yüzden F/K<sub>p</sub> = 3/8 m'lik açık kalır; integral onu kapatır ama döngüye yavaş bir kök ekleyip aşımı büyütür. K<sub>p</sub> = 60 N/m, Routh sınırının (1.02 × 3.2 / 0.1 = 32.64 N/m) iki katına yakındır: doğrusal model üstel büyüme der, itki sınırı büyümeyi keser ve geriye bir sınır çevrim kalır.",
      },
      {
        title: "Süzgeç kendine ne kadar güvenmeli? (02 · Durum kestirimi)",
        predict:
          "GPS'in gerçek gürültüsü 3 m. Süzgece bunu 0.5 m diye bildirirsen (GPS'e fazla güven) konum hatası küçülür mü? 12 m diye bildirirsen (GPS'e az güven) ne olur? Hangisinde süzgecin çizdiği ±1σ bandı gerçeği yansıtır? GPS 8 saniye kesilirse belirsizlik kaç metreye büyür?",
        do: "Sekmeyi <strong>Sıfırla</strong>; 'Konum RMS hatası' ve 'Ortalama NEES' kartlarını oku, <em>Rastgele tohum</em> kaydırıcısını birkaç değere çekip sayının ne kadar oynadığına bak. Sonra sırayla <strong>R küçük sanılıyor</strong>, <strong>R büyük sanılıyor</strong> ve <strong>Q küçük sanılıyor</strong> düğmelerine bas; her birinde alt grafikteki üç eğriyi karşılaştır. Son olarak <strong>GPS kesintisi 8 s</strong> düğmesine bas ve 'Kesinti sonunda konum RMS' kartını oku.",
        observe:
          "Eşleşmiş süzgeçte (tohum 7) ölçülen konum RMS 0.692 m, süzgecin σ'sı 0.711 m (fark −2.58 %), NEES 1.93; ham GPS 3.007 m'dir. Tohum 8'de 0.705 m, tohum 9'da 0.730 m okunur. R küçük sanılınca ölçülen 0.956 m, süzgecin sandığı 0.182 m (fark +426.56 %), NEES 37.50. R büyük sanılınca ölçülen 1.019 m, süzgeç 2.080 m, NEES 0.97. Q küçük sanılınca 2.006 m'ye karşı 0.504 m, NEES 85.64. Üçünde de 'Gerçek kovaryanstan beklenen σ' ölçüleni izler (0.958 m, 1.036 m, 2.050 m). Kesintinin sonunda (t = 23 s) ölçülen RMS 3.30 m, süzgecin öngörüsü 3.55 m'dir.",
        explain:
          "Eşleşmiş durumdaki yüzde 2–3'lük fark hata değil, örneklemedir: 400 koşu sonlu bir örneklemdir, tohum değişince ölçülen değer 0.711 m'nin çevresinde oynar; durum satırı da bunu söyler. Yanlış ayarın iki bedeli vardır. Doğruluk: her iki yöndeki yanlış R, hatayı eşleşmiş süzgecin 0.71 m'sinin üstüne çıkarır. Tutarlılık: R ya da Q küçük sanılırsa süzgeç dar bir bant çizer ve kestirim bandın dışında dolaşır; o σ'ya bakıp karar veren her sonraki halka yanlış güvenle davranır. Kesintide düzeltme yoktur: ivmeölçerin gürültüsü iki kez tümlenir, σ 0.71 m'den 3.55 m'ye büyür.",
      },
      {
        title: "Hangi aks yolun üstünde? (03 · Yol izleme)",
        predict:
          "Araç 20 m yarıçaplı yayı dönerken saf takipte yolun tam üstünde kalan nokta arka aks mıdır, ön aks mı? Stanley'de hangisi? Yolun 1 m solundan başlayan araç yola dönerken öbür yana ne kadar taşar ve bu, bakış mesafesine bağlı mıdır? Bakış mesafesini 2 m'ye indirip hızı 20 m/s'ye, direksiyon gecikmesini 0.3 s'ye çıkarırsan araç yolu bitirebilir mi?",
        do: "Sekmeyi <strong>Sıfırla</strong> (Saf takip, yarım çember, L<sub>d</sub> = 5 m, v = 8 m/s) ve yay kartlarını oku. <strong>Gecikmesiz</strong> düğmesiyle 'Düzlükte aşım' kartına yeniden bak. <strong>Stanley</strong> düğmesine bas, aynı yay kartlarını karşılaştır. Sonra <strong>Dar yay</strong> ve <strong>Kısa bakış, hızlı</strong> düğmelerini dene; durum satırını oku.",
        observe:
          "Saf takipte yayda direksiyon 7.69° (kuram atan(L/R) = 7.69°), arka aks sapması 0.000 m, ön aks −0.181 m (kuram −0.181 m). Düzlükte aşım 5.20 % (kuram 4.32 %); 'Gecikmesiz' ile 4.34 %. Stanley'de tablo ters döner: ön aks 0.000 m, arka aks 0.183 m, direksiyon 7.76° (asin(L/R)); ön aks sapması 0.592 s'de 1/e'ye iner (kuram 1/k = 0.667 s; <em>Direksiyon gecikmesi τ<sub>δ</sub></em> sıfıra çekilince 0.662 s). 'Dar yay'da en küçük dönüş yarıçapı 7.42 m'dir, yay 5 m ister: araç 4.986 m dışarı taşar. 'Kısa bakış, hızlı'da gecikme sınırı τ<sub>δ</sub>·v = 6.00 m, L<sub>d</sub> = 2.0 m bunun altındadır; araç yolu tamamlayamaz.",
        explain:
          "İki denetleyici de 'yolun üstünde' sözünü farklı aksa göre tanımlar. Çember üstünde dönen aracın iki aksı aynı merkezli iki ayrı çember çizer: arka aks R'deyse ön aks √(R² + L²)'de, 0.181 m dışarıdadır; ön aks R'deyse arka aks √(R² − L²)'de, 0.183 m içeridedir. Bu bir denetim hatası değil, her aracın arka tekerleğinin dönüşte içeriden geçmesidir. Gecikmesiz aşımın 4.34 % ile kuramın 4.32 %'sine oturması ζ = 1/√2'nin sınamasıdır; gecikme sönümü yer. Stanley'de 0.592 s ile 0.667 s arasındaki fark da gecikmedendir. Dar yayda sorun geometridir: 20°'lik sınırla L/tan δ<sub>max</sub> = 7.42 m'den dar dönülmez.",
      },
      {
        title: "Menzil hızı nasıl sınırlar, ince bir direk nasıl kaçar? (04 · Algılama)",
        predict:
          "Sensör 80 m'yi görüyor, araç 20 m/s ile gidiyor ve 39.12 m'de hızını sıfırlayabiliyor. Yol ıslanıp µ 0.40'a düşerse bu mesafe kaç metre olur? Hız 35 m/s'ye çıkarsa araç durabilir mi; duramazsa engele hangi hızla varır? Lidar tarafında: 1° çözünürlükle 50 m'deki 0.20 m çaplı bir direk, taramaların yüzde kaçında görülür?",
        do: "Sekmeyi <strong>Sıfırla</strong>; 'Kapanma mesafesi', 'Tepki payı + fren payı' ve 'Bu menzilde en yüksek güvenli hız' kartlarını oku. Sırayla <strong>Islak yol (µ = 0.40)</strong>, <strong>Yavaş tepki (1.5 s)</strong>, <strong>Menzili aşan hız</strong> ve <strong>Öndeki araç 15 m/s</strong> düğmelerine bas. Sonra aşağıdaki lidar bölümünde <strong>Uzak ince direk</strong>, <strong>Kaba tarama (4°)</strong> ve <strong>Yakın engel</strong> düğmelerini dene; her birinde 'Algılama olasılığı' ve 'Kesin algılama sınırı' kartlarına bak.",
        observe:
          "Varsayılanda kapanma 39.12 m (10.00 m + 29.12 m), TTC 4.00 s, güvenli üst hız 29.48 m/s (106 km/h). Islak yolda 60.97 m (10.00 m + 50.97 m), üst hız 22.86 m/s; yavaş tepkide 59.12 m (30.00 m + 29.12 m). 35 m/s'de formül 106.69 m ister: kart 'çarpışma' yazar, t = 2.81 s'de bağıl hız hâlâ 19.1 m/s'dir (69 km/h). Öndeki araç 15 m/s ile gidiyorsa TTC 16.00 s, kapanma 4.32 m'dir. Lidarda 'Uzak ince direk' olasılığı 24.0 % (geometri 22.9 %), kesin sınır 11.46 m. 'Kaba tarama'da gösterilen tarama 'algılanmadı' der (olasılık 18.6 %). 'Yakın engel'de 5 ışın değer, gürültülü ortalama hata −0.0165 m'dir.",
        explain:
          "Islak yol fren payını (v²/(2µg)), yavaş tepki tepki payını (v·t<sub>r</sub>) büyütür; hız ikisini birden, fren payını karesiyle büyütür ve 35 m/s'de gereken mesafe menzili aşar. Öndeki araç örneği tehlikeyi bağıl hızın belirlediğini gösterir. Direğin kaçmasının nedeni menzil değil açıdır: 50 m'de ışınlar 0.873 m aralıklıdır, direk 0.20 m. Ölçülen olasılığın geometriden bir puan ayrılması örneklemedir (4000 yerleşim; tohumu değiştir, sayı oynar). Yakın engeldeki eksi hata seçimden gelir: algılayıcı değen ışınların en kısasını bildirir, birkaç gürültülü ölçümün en küçüğü ortalamayı aşağı çeker.",
      },
    ],
  },
  wow: [
    {
      title: "On dokuz ayda 12 kilometreden 212 kilometreye",
      body:
        "Mart 2004'teki ilk DARPA Grand Challenge'da en iyi araç yaklaşık 12 kilometre gidebildi; ödül sahipsiz kaldı. Ekim 2005'te Stanford ekibinin Stanley adlı aracı 212 kilometrelik çöl parkurunu 6 saat 53 dakikada bitirip 2 milyon doları aldı, beş araç çizgiyi geçti. Ortalama hız saatte yalnızca 31 kilometreydi: yarışı en hızlı araç değil, yedi saat boyunca hata yapmayan araç kazandı. Stanley sonradan Smithsonian'ın Ulusal Amerikan Tarihi Müzesi koleksiyonuna girdi.",
    },
    {
      title: "Günde 38 mikrosaniye, günde 11 kilometre",
      body:
        "GPS konumu zamanla ölçer: ışık nanosaniyede 30 santimetre gider, alıcı sinyalin ne kadar yolda kaldığını saniyenin milyarda biri düzeyinde ölçer. Uydulardaki atom saatleri görelilik yüzünden yerdekilere göre günde yaklaşık 38 mikrosaniye ileri gider; düzeltilmese 38 × 10⁻⁶ s × 3×10⁸ m/s ≈ 11 kilometrelik hata her gün birikirdi. İkinci sekmedeki 'GPS gürültüsü' kaydırıcısı, bu düzeltmelerden sonra geriye kalan metrelerin öğretim amaçlı bir temsilidir.",
    },
    {
      title: "Bir derece, elli metrede 87 santimetre eder",
      body:
        "Açı küçük görünür, mesafe onu büyütür. 1°'lik açısal çözünürlükle tarayan bir lidarın komşu iki ışını 50 metrede 2 × 50 × tan(0.5°) = 0.873 m açılır; aralarına 0.20 m çaplı bir direk rahatça sığar. Sayfadaki 'Uzak ince direk' düğmesi bunu sayar: direk taramaların yalnızca dörtte biri kadarında yakalanır (geometri 22.9 %, 4000 yerleşimde ölçülen 24.0 %). Çözünürlüğü 0.5°'ye indirmek ışınları iki kat sıklaştırır ve direğin kesin görüldüğü uzaklığı iki katına çıkarır: sınır 11.46 m'den 22.92 m'ye gider.",
    },
  ],
  worked: {
    title: "İrtifa denetleyicisi tasarla, sonra sayfada sına",
    prompt:
      "Kütlesi m = 1.0 kg olan drone'un düşey sürükleme katsayısı b = 0.2 N·s/m. İrtifa PD denetleyiciyle tutulacak: T = m·g + K<sub>p</sub>·e − K<sub>d</sub>·z′. Oransal kazanç K<sub>p</sub> = 16 N/m seçildi. (a) Sönüm oranının ζ = 0.5 olması için K<sub>d</sub> ne olmalı? (b) Δz = 0.5 m'lik hedef adımında aşımı ve ilk tepe zamanını bul. (c) t = 10 s'de F = 4 N'luk aşağı yönlü rüzgâr başlarsa drone hedefin ne kadar altında kalır? (d) Motorun gecikmesi τ = 0.05 s ise bu K<sub>d</sub> ile K<sub>p</sub> en çok kaç olabilir?",
    steps: [
      "Kapalı döngü denklemi: T'yi m·z″ = T − m·g − b·z′ içine koy; m·z″ + (b + K<sub>d</sub>)·z′ + K<sub>p</sub>·z = K<sub>p</sub>·Δz. Standart biçim z″ + 2ζω<sub>n</sub>·z′ + ω<sub>n</sub>²·z = ω<sub>n</sub>²·Δz ile karşılaştır: ω<sub>n</sub> = √(K<sub>p</sub>/m) = √(16 N/m / 1.0 kg) = 4.000 rad/s. (a) 2ζω<sub>n</sub> = (b + K<sub>d</sub>)/m olduğundan b + K<sub>d</sub> = 2 × 0.5 × 4.000 rad/s × 1.0 kg = 4.0 N·s/m; K<sub>d</sub> = 4.0 − 0.2 = 3.8 N·s/m.",
      "(b) Aşım = e<sup>−πζ/√(1−ζ²)</sup> = e<sup>−π × 0.5/0.8660</sup> = e<sup>−1.8138</sup> = 0.1630, yani 16.30 %: drone 0.5 m'lik hedefi 0.5 m × 0.1630 ≈ 0.08 m aşar. İlk tepe zamanı t<sub>p</sub> = π/(ω<sub>n</sub>·√(1−ζ²)) = π/(4.000 × 0.8660) = 0.907 s.",
      "(c) Kalıcı durumda z″ = z′ = 0; fazladan gereken itki rüzgâra eşittir: K<sub>p</sub>·e = F, e = 4 N / 16 N/m = 0.250 m. Kazancı iki katına çıkarmak açığı yarıya indirir ama sıfırlamaz; sıfırlayan integral terimidir.",
      "(d) Gecikmeli modelin kararlılık koşulu K<sub>p</sub> < (m + τ·b)·(b + K<sub>d</sub>)/(τ·m) = (1.0 + 0.05 × 0.2) × 4.0 / (0.05 × 1.0) = 1.01 × 80 = 80.80 N/m. Seçilen 16 N/m sınırın beşte biridir: döngü kararlıdır, ama gecikme sönümü azaltır ve aşım 16.30 %'nin üstüne çıkar.",
      "Sayfada sına (01 · Denetim): Sıfırla; K<sub>p</sub> = 16.0, K<sub>d</sub> = 3.8, τ = 0.00 s, Δz = 0.5 m, F = 4.0 N. Kartlar ζ = 0.500, aşım 16.30 %, tepe 0.907 s, rüzgârda kalıcı hata 0.250 m yazar. τ'yu 0.05 s yapınca aşım 22.74 %'ye çıkar ve 'kararlı K<sub>p</sub> aralığı 0.00 – 80.80 N/m' okunur. Adım neden 0.5 m? İlk anda istenen fazladan itki K<sub>p</sub>·Δz = 8 N'dur; eldeki pay 9.81 N. τ'yu yeniden 0.00 s yapıp Δz'yi 1.0 m'ye çıkarırsan 16 N istenir, motor kısa süre doyar ve aşım formülden ayrılır: 16.07 %.",
    ],
    result:
      "K<sub>d</sub> = 3.8 N·s/m; aşım 16.30 %, ilk tepe 0.907 s; 4 N'luk rüzgârda kalıcı hata 0.250 m; τ = 0.05 s için kararlılık sınırı K<sub>p</sub> < 80.80 N/m. Sayfa dört sayıyı da ölçerek doğrular; gecikme eklendiğinde aşımın 22.74 %'ye çıkması, ikinci derece formülünün bir yaklaşım olduğunu gösterir.",
  },
  misconceptions: [
    {
      myth: "Direksiyonu ve hızı birlikte yöneten bir sürüş desteği devredeyken sürücü yolu izlemeyi bırakabilir.",
      truth:
        "Sayfadaki SAE J3016 özetine göre direksiyonu ve hızlanma/frenlemeyi birlikte yapan özellik Düzey 2'dir ve bu düzeyde sürücü yolu kesintisiz izlemek, her an müdahale etmek zorundadır; eller direksiyonda olsun olmasın gözetim sürücüdedir. Kullanıcının yolu izlemek zorunda olmadığı ilk basamak Düzey 3'tür; o da yalnız tanımlı çalışma koşulları içinde ve sistem istediğinde devralmaya hazır olmak şartıyla. Düzeyler bir aracı değil, o anda devrede olan özelliği sınıflandırır. Bu bir özettir; bağlayıcı tanımlar standardın kendi metnindedir.",
    },
    {
      myth: "Kazancı ne kadar büyütürsen denetleyici o kadar iyi olur.",
      truth:
        "Büyük kazanç hatayı daha sert düzeltir, ama eyleyici gecikmeliyse bir yerden sonra düzeltme geç gelir ve hatayı besler. Birinci sekmede τ = 0.05 s iken K<sub>p</sub> en çok 64.64 N/m olabilir; gecikme 0.10 s'ye çıkınca sınır 32.64 N/m'ye iner. 'Kazanç fazla' düğmesi (K<sub>p</sub> = 60 N/m, τ = 0.10 s) drone'u sönmeyen bir salınıma sokar. İyi ayar en büyük kazanç değil, gecikmenin izin verdiği kazançtır.",
    },
    {
      myth: "Bilgisayar insandan hızlı tepki verdiği için otonom araç 'anında' durur.",
      truth:
        "Durma mesafesinin iki parçası vardır ve hızlı tepki yalnızca birini kısaltır. Dördüncü sekmede 20 m/s (72 km/h) hızda tepki süresi 1.5 s iken araç fren başlamadan 30.00 m gider; 0.1 s iken 2.00 m. Fren payı ise fiziktir: µ = 0.7 ile v²/(2µg) = 29.12 m, direksiyonda kim olursa olsun. Toplam 59.12 m'den 31.12 m'ye iner; sıfıra değil. Yol ıslanınca (µ = 0.40) fren payı tek başına 50.97 m olur.",
    },
    {
      myth: "Lidar menzili içindeki her şeyi görür.",
      truth:
        "Lidar mesafeyi çok iyi ölçer ama dünyayı ayrık ışınlarla örnekler: menzil içinde olmak, bir ışının değmesi demek değildir. 1° çözünürlükte 0.25 m yarıçaplı bir engel ancak 28.65 m'ye kadar her taramada yakalanır; daha uzakta iki ışının arasına düşebilir. Üstelik lidar rengi görmez; yağmur damlası ve sis lazer darbesini saçar. Farklı sensörlerin birleştirilmesi bu yüzden lüks değil zorunluluktur: her biri ötekinin kör noktasını örter.",
    },
  ],
  glossary: [
    { term: "SAE J3016 düzeyi", definition: "Sürüş otomasyonu özelliklerini Düzey 0'dan Düzey 5'e altı basamakta sınıflandıran standardın basamağı; özetle 0–2. düzeylerde sürüşü insan yapar ve sistem destek olur, 3–5. düzeylerde özellik devredeyken sürüşü sistem yapar." },
    { term: "ODD (tanımlı çalışma koşulları)", definition: "Bir otomasyon özelliğinin çalışmak üzere tasarlandığı sınırlar: yol türü, hız aralığı, hava, bölge; bu koşulların dışında özellik sürüşü üstlenmez." },
    { term: "Sönüm oranı (ζ)", definition: "İkinci derece bir sistemin salınıma ne kadar yatkın olduğunu veren boyutsuz sayı; birden küçükse yanıt hedefi aşar, aşımın oranı yalnız ζ'ye bağlıdır." },
    { term: "Doyma ve integral şişmesi", definition: "Eyleyicinin sınırına dayanması (doyma) sürerken integral teriminin büyümeyi sürdürmesi ve hedefe varıldığında büyük bir aşıma yol açması." },
    { term: "Kalman kazancı (K)", definition: "Öngörü ile ölçüm arasındaki farkın ne kadarının kestirime ekleneceğini belirleyen ağırlık; öngörünün belirsizliği büyüdükçe ya da ölçümün gürültüsü küçüldükçe artar." },
    { term: "NEES", definition: "Kestirim hatasının süzgecin kendi kovaryansına göre ölçeklenmiş karesi (eᵀ·P⁻¹·e); tutarlı bir süzgeçte ortalaması durum sayısına, bu sayfada 2'ye eşittir." },
    { term: "Bakış mesafesi (L<sub>d</sub>)", definition: "Saf takip denetleyicisinin arka akstan ölçerek yol üstünde hedef seçtiği uzaklık; kısa olursa izleme keskinleşir ama gecikmeye karşı pay azalır." },
    { term: "TTC (çarpışmaya kalan süre)", definition: "Hiçbir şey değişmezse öndeki engele varmaya kalan süre: aralık bölü bağıl hız." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede PID üç terimli bir formüldür; mühendisliğin Otomatik Kontrol dersinde <strong>kontrol teorisi</strong> olur. Birinci sekmedeki m·z″ + (b + K<sub>d</sub>)·z′ + K<sub>p</sub>·z = K<sub>p</sub>·Δz denklemi Diferansiyel Denklemler dersinin ikinci mertebeden sabit katsayılı denklemidir; Laplace dönüşümü onu bir transfer fonksiyonuna çevirir ve kararlılık paydanın köklerinden, yani kutuplardan okunur. Sayfanın 'en sağdaki kutup' satırı tam bu köktür; Routh–Hurwitz ölçütü kökleri hesaplamadan işaretlerini söyler, kök yer eğrisi ve Bode çizimleri de kazancı değiştirince kutupların nereye gittiğini gösterir. Bir adım ötesi model öngörülü denetimdir (MPC): her an gelecek birkaç saniyeyi kısıtlı bir optimizasyon problemi olarak çözer, doymayı baştan hesaba katar ve yalnızca ilk komutu uygular. Yol izleme tarafında kinematik bisiklet modeli yerini lastik kuvvetlerini içeren dinamik modele bırakır; sayfanın 4 m/s² uyarısının ötesi oradadır.",
      "Kestirim tarafında Kalman süzgeci, Olasılık ve Rastgele Süreçler dersinden <strong>olasılıksal robotiğe</strong> açılan kapıdır. İkinci sekmedeki P ← F·P·Fᵀ + Q özyinelemesi doğrusal cebirle yazılmış bir varyans muhasebesidir; durağan değeri Riccati denkleminin çözümüdür. Gerçek sensörlerde gürültü beyaz değildir, ivmeölçerin kayması (bias) vardır ve hareket doğrusal değildir: genişletilmiş Kalman ve parçacık süzgeçleri, aracın hem haritayı çıkarıp hem kendini o haritada konumlandırdığı SLAM problemi buradan doğar. Planlama tarafında ızgara yerini sürekli uzaylara bırakır: bir aracın bütün olası duruşları bir <strong>konfigürasyon uzayı</strong> oluşturur, boyut arttıkça hücre sayısı üstel büyüdüğü için uzayı rastgele örnekleyen RRT gibi yöntemler kullanılır. En zor sorular ise denklemsizdir: Düzey 3'te devralma çağrısına yanıt vermeyen kullanıcıdan kim sorumludur, bir filo için 'yeterince güvenli' nasıl ölçülür? Dördüncü sekmedeki menzil hesabı bu tartışmanın değişmeyen tabanıdır.",
    ],
    topics: [
      "Otomatik kontrol: transfer fonksiyonu, kutuplar, Routh–Hurwitz, durum uzayı",
      "Diferansiyel denklemler: ikinci mertebe doğrusal sistemler, Laplace dönüşümü",
      "Olasılıksal robotik: Kalman, genişletilmiş Kalman, parçacık süzgeci, SLAM",
      "Araç dinamiği: kinematik ve dinamik bisiklet modeli, lastik kuvvetleri",
      "Hareket planlama: konfigürasyon uzayı, RRT",
      "Model öngörülü denetim (MPC) ve kısıtlı optimizasyon",
      "Otonomide güvenlik, doğrulama ve düzenleme",
    ],
  },
  quiz: [
    {
      question: "Dördüncü sekmenin varsayılanında (t<sub>r</sub> = 0.5 s, µ = 0.7) araç 20 m/s ile giderken kapanma mesafesi 39.12 m'dir (10.00 m tepki + 29.12 m fren). Hız 40 m/s'ye çıkarsa kapanma mesafesi yaklaşık kaç katına çıkar?",
      options: ["2 katına", "Yaklaşık 3.5 katına", "Tam 4 katına", "8 katına"],
      answer: 1,
      explanation:
        "Tepki payı hızla doğru orantılıdır: 10.00 m → 20.00 m. Fren payı hızın karesiyle büyür: 29.12 m → 116.50 m. Toplam 136.50 m, yani 136.50/39.12 ≈ 3.5 kat. Oran 2 ile 4 arasında kalır ve hız arttıkça 4'e yaklaşır, çünkü kare terimi baskınlaşır. Sayfada hızı 40 m/s yaptığında 80 m'lik menzil yetmez ve kart 'çarpışma' yazar.",
    },
    {
      question: "İkinci sekmede GPS'in gerçek gürültüsü 3 m iken süzgece σ<sub>z</sub> = 0.5 m bildiriliyor ('R küçük sanılıyor'). Aşağıdakilerden hangisi olur?",
      options: [
        "Süzgeç GPS'e daha çok güvendiği için gerçek hata küçülür",
        "Gerçek hata büyür, süzgecin çizdiği ±σ bandı daralır ve NEES 2'nin çok üstüne çıkar",
        "Gerçek hata değişmez, yalnız bant genişler",
        "Süzgeç ıraksar ve kestirim sınırsız büyür",
      ],
      answer: 1,
      explanation:
        "R küçük sanılınca kazanç büyür ve süzgeç her gürültülü GPS ölçümünün peşinden koşar: ölçülen RMS 0.692 m'den 0.956 m'ye çıkar. Aynı anda süzgeç kendi hatasını 0.182 m sanır; hata, sanılan belirsizliğin beş katıdır ve NEES 37.50 olur. Süzgeç ıraksamaz, çünkü GPS düzeltmesi sürer; asıl zarar, yanlış güvenin sonraki kararlara taşınmasıdır.",
    },
    {
      question: "Birinci sekmede K<sub>i</sub> = 0 iken kararlılık koşulu K<sub>p</sub> < (m + τ·b)·(b + K<sub>d</sub>)/(τ·m) biçimindedir ve τ = 0.05 s için sınır 64.64 N/m'dir. Motor gecikmesi 0.10 s'ye çıkarsa sınır ne olur?",
      options: ["Değişmez; sınır yalnız K<sub>d</sub>'ye bağlıdır", "Yaklaşık iki katına çıkar", "Yaklaşık yarıya iner (32.64 N/m)", "Dörtte birine iner"],
      answer: 2,
      explanation:
        "τ paydadadır; paydaki τ·b terimi m'nin yanında çok küçüktür (1.01 → 1.02). Sınır bu yüzden gecikmeyle neredeyse ters orantılıdır: 1.02 × 3.2 / 0.10 = 32.64 N/m. Sınır durumuna da bak: τ sıfıra giderken sınır sonsuza gider, yani gecikmesiz ikinci derece model hiçbir kazançta kararsız olmaz. Kararsızlığı doğuran kazanç değil, kazanç ile gecikmenin çarpımıdır.",
    },
  ],
  next: [
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma: Az Adım mı, Az Maliyet mi?", why: "Döngünün bu sayfada olmayan halkası: BFS, Dijkstra ve A*'ı aynı ağırlıklı haritada adım adım çalıştır, hangisinin kaç kareye baktığını karşılaştır." },
    { href: "otomotiv-muhendisligi.html", title: "Otomotiv Mühendisliği: Motor, Aktarma ve Araç Dinamiği", why: "Buradaki µ·g'lik fren ivmesinin arkasını gör: 'Frenleme ve viraj' sekmesinde durma mesafesi ve virajda tutunma, aktarma sekmesinde çekiş kuvveti ölçülür." },
    { href: "ucak-muhendisligi-ve-aerodinamik.html", title: "Uçak Mühendisliği ve Aerodinamik: Kanat, Performans ve Menzil", why: "Sabit kanatlı bir İHA'yı havada tutan fizik: kanat profili, kutup eğrisi, en az itkiyle uçuş, yatışta yük katsayısı ve menzil hesabı." },
    { href: "robotik-ve-kinematik.html", title: "Robotik ve Kinematik: Eklem Açılarından Uç Noktaya ve Geri", why: "Hareketin geometrisi: iki eklemli kolda ileri ve ters kinematik, Jacobian ile hız ve kuvvet, yörünge planlama ve engel denetimi." },
  ],
  sources: [
    { title: "Wikipedia · PID controller", url: "https://en.wikipedia.org/wiki/PID_controller", note: "Minorsky'nin 1922 çalışmasından ayarlama yöntemlerine; üç terimin etkisi ve integral şişmesi (İngilizce)." },
    { title: "Wikipedia · Kalman filter", url: "https://en.wikipedia.org/wiki/Kalman_filter", note: "Öngörü ve düzeltme adımları, kazancın türetimi ve Apollo'daki kullanımı (İngilizce)." },
    { title: "Wikipedia · Routh–Hurwitz stability criterion", url: "https://en.wikipedia.org/wiki/Routh%E2%80%93Hurwitz_stability_criterion", note: "Üçüncü ve dördüncü derece çok terimliler için kökleri bulmadan kararlılık koşulları (İngilizce)." },
    { title: "Wikipedia · DARPA Grand Challenge (2005)", url: "https://en.wikipedia.org/wiki/DARPA_Grand_Challenge_(2005)", note: "Stanley'nin kazandığı yarışın parkuru, süreleri ve bitiren beş araç (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
