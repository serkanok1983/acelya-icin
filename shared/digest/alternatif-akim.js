window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["alternatif-akim"] = {
  slug: "alternatif-akim",
  title: "Alternatif Akım: Fazörler, Rezonans ve Güç",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bobinde akım gerilimin gerisinde kalır, kondansatörde önüne geçer; doğru frekansta bu iki etki birbirini siler. Aynı zamanlama radyoyu istasyona kilitler ve 10 voltluk kaynaktan yüzlerce volt çıkarır.",
  hook:
    "Tepe değeri 10 volt olan bir kaynağa 1 ohmluk bir direnç, 10 milihenrilik bir bobin ve 10 mikrofaradlık bir kondansatörü seri bağla, frekansı 503 hertze getir. Kondansatörün uçlarında tepe değeri 316 volta ulaşan bir gerilim belirir: kaynağınkinin otuz katından fazla. Devrede transformatör yok, ikinci bir kaynak yok. Bu gerilim nereden geliyor?",
  bigIdea:
    "Alternatif akımda direncin gerilimi akımla aynı anda, bobininki çeyrek periyot önce, kondansatörünki çeyrek periyot sonra tepe yapar; bu zamanlamalar tek bir karmaşık sayıda, empedansta toplanır, <em>Z = R + j(ωL − 1/(ωC))</em>, ve iki tepkinliğin birbirini sildiği frekansta devre yalnızca direnci görür.",
  story: [
    "Eylül 1882'de Thomas Edison'un New York'taki Pearl Street santrali 110 voltluk doğru akımla 85 müşterinin 400 lambasını yakmaya başladı. Sistem iyi çalışıyordu ama uzağa gidemiyordu: düşük gerilimli dinamolar ancak bir buçuk kilometre kadar ötedeki evlere yetişiyordu. Aynı gücü düşük gerilimle taşımak büyük akım demektir ve tellerde ısıya giden güç akımın karesiyle büyür (<em>I²R</em>). Çare gerilimi yolda yükseltip evde düşürmekti; bunu yapan alet, <strong>transformatör</strong>, yalnızca değişen akımla çalışır. 1885'te Budapeşte'deki Macar Ulusal Sergisi'nde, kapalı çekirdekli transformatörü geliştiren Ganz mühendisleri Zipernowsky, Bláthy ve Déri 75 transformatörle 1 067 lamba yaktı; lambalar Edison lambasıydı. 1886'da William Stanley, George Westinghouse'un desteğiyle Massachusetts'in Great Barrington kasabasında sokaktaki 500 voltu dükkânlarda 100 volta indiren bir alternatif akım şebekesi kurdu. Temmuz 1888'de Westinghouse, Nikola Tesla'nın çok fazlı indüksiyon motoru patentlerinin lisansını aldı: artık hem ışık hem motor alternatif akımla çalışabilecekti.",
    "Ardından tarihe 'akımlar savaşı' diye geçen kavga başladı. 1888 yazında mühendis Harold Brown, alternatif akımın daha ölümcül olduğunu göstermek için seyirci önünde köpekleri elektrikle öldürdü; Edison'un West Orange laboratuvarı ona yer, alet ve bir asistan, Arthur Kennelly'yi verdi. Ağustos 1890'da New York eyaletindeki ilk elektrikli sandalye infazında, rakiplerin dolambaçlı yoldan edindiği Westinghouse jeneratörleri kullanıldı; Westinghouse bunu mahkemede durdurmaya çalışmıştı. Sık anlatılan bir hikâyeye göre Edison 1903'te Topsy adlı bir fili de aynı amaçla öldürtmüştür. Kayıtlar bunu desteklemez: olay savaştan on yıl sonra bir lunaparkta yaşandı, Edison orada değildi, yalnızca şirketinin film ekibi çekim yaptı. Savaşı bir birleşme ve sahadaki sonuçlar bitirdi. 1892'de Edison'un şirketi rakibi Thomson-Houston ile birleşip General Electric oldu ve o da alternatif akım satmaya başladı; Westinghouse 1893 Chicago Dünya Fuarı'nın elektriğini alternatif akımla sağladı. Niagara Şelalesi'ndeki santral Westinghouse'un 25 hertzlik jeneratörleriyle 25 Ağustos 1895'te devreye girdi; 16 Kasım 1896'da şelalenin enerjisi Buffalo'nun tramvaylarını yürütüyordu. 1908'de Edison'un, Stanley'nin oğluna 'Babana yanıldığımı söyle' dediği aktarılır.",
    "Bir engel daha vardı: alternatif akım devrelerini hesaplamak türev ve integrallerle dolu diferansiyel denklemler istiyordu. Oliver Heaviside 1886'da <strong>empedans</strong> sözcüğünü türetti. 1893'te aynı Kennelly, hâlâ Edison'un laboratuvarında çalışırken, empedansı karmaşık sayılarla yazan bir bildiri sundu. Aynı yıl Chicago'daki Uluslararası Elektrik Kongresi'nde Charles Proteus Steinmetz <em>Karmaşık Nicelikler ve Elektrik Mühendisliğinde Kullanımları</em> adlı bildirisini okudu: gerilimleri ve akımları da karmaşık sayılarla göstererek hesabı 'basit bir cebir problemine' indirdi. Elektrikte i harfi akıma ayrıldığı için 90 derecelik dönmeyi j gösterir; bu gösterim Steinmetz'in ders kitaplarıyla yerleşti. Bugün her devre kitabı bu yöntemi öğretir; sayfadaki 'Kuram (fazör)' sütunu da onun hesabıdır. Şebeke frekansları ise o yılların kararlarından kaldı: kayıtlara göre Westinghouse 1890'da 60 hertzi, Alman AEG 1891'de 50 hertzi seçti. ABD ve Kanada bugün 60, Avrupa ve Türkiye 50 hertz kullanır.",
  ],
  core: [
    {
      heading: "Etkin değer: prizdeki 230 voltun tepesi 325 volttur",
      body:
        "Prizdeki gerilim saniyede 50 tam çevrimle +325 V ile −325 V arasında gidip gelir; bir periyotluk ortalaması sıfırdır ve bu yüzden işe yaramaz bir sayıdır. Isıtmayı belirleyen ortalama <em>güçtür</em>: dirençte anlık güç v²/R'dir ve sin²'nin bir periyot boyunca ortalaması ½'dir. Demek ki tepe değeri V₀ olan bir sinüs, aynı dirençte V₀/√2 değerindeki doğru gerilimle aynı ısıyı üretir. Bu sayıya <strong>etkin değer</strong> (rms, kareler ortalamasının karekökü) denir; 230 V bir etkin değerdir. Sayfada Genlik V₀ = 10.0 V bir tepe değeridir, kaynağın etkin gerilimi 7.071 V'tur ve tablodaki bütün akım ve gerilimler etkindir. Devre menüsünden Yalnız R'yi seçersen 10 Ω'luk direnç her frekansta 7.071² / 10 = 5.000 W harcar.",
      formula: "V<sub>rms</sub> = √⟨v²⟩ = V<sub>0</sub>/√2,  P = V<sub>rms</sub>²/R (yalnız direnç)",
      formulaNote: "⟨ ⟩ bir periyot boyunca ortalamadır. 230 V × √2 ≈ 325 V: prizdeki gerilimin tepe değeri.",
    },
    {
      heading: "Bobin ve kondansatör: biri önde, öteki geride",
      body:
        "Bobinin gerilimi akımın değişim hızıyla orantılıdır, v<sub>L</sub> = L·di/dt. Akım sinüs ise türevi kosinüstür: bobinin gerilimi akımdan çeyrek periyot (90°) önde koşar ve genliği ωL·I₀ olur. Kondansatörde tersi olur: gerilim biriken yükle orantılıdır, v<sub>C</sub> = q/C, yük ise akımın integralidir; gerilim akımdan 90° geride kalır, genliği I₀/(ωC) olur. ωL ve 1/(ωC) birer <strong>tepkinliktir</strong> (reaktans). Ohm cinsinden ölçülürler ama direnç gibi ısı üretmezler, enerjiyi depolayıp geri verirler. Frekans artınca bobin akıma daha çok karşı koyar, çünkü değişim hızlanır; kondansatör daha az, çünkü dolmaya vakit bulamaz. İki gerilim arasında tam 180° vardır: seri devrede biri bir yöne iterken öteki ters yöne iter ve birbirlerini kısmen siler. Tepkinliklerin zıt işaretli yazılmasının nedeni budur.",
      formula: "X<sub>L</sub> = ωL,  X<sub>C</sub> = 1/(ωC),  ω = 2πf",
      formulaNote: "Varsayılan ayarda (400 Hz) bobinin tepkinliği 25.13 Ω, kondansatörünki 39.79 Ω. Frekansı iki katına çıkarmak birincisini iki katına çıkarır, ikincisini yarıya indirir.",
    },
    {
      heading: "Fazörler: türevi çarpmaya çeviren hile",
      body:
        "Doğrusal bir devrede, kararlı durumda, her akım ve gerilim kaynakla aynı frekansta salınır; bir sinüsü tanımlamak için genliği ve fazı yeter. Bu yüzden her sinüsü ω hızıyla dönen bir ok, yani karmaşık bir sayı olarak yazarız: v(t) = Im(V̂·e<sup>jωt</sup>). e<sup>jωt</sup>'nin türevini almak onu jω ile çarpmaktır ve j 90°'lik bir dönmedir. Böylece bobin için V̂<sub>L</sub> = jωL·Î, kondansatör için V̂<sub>C</sub> = −j·Î/(ωC) olur ve diferansiyel denklem cebire döner: V̂ = Î·Z. Z'nin büyüklüğü akım genliğini, açısı φ akımla gerilim arasındaki faz farkını verir. Sayfadaki fazör diyagramı bu toplamı çizer: V<sub>R</sub> akımla aynı yönde, V<sub>L</sub> 90° önde, V<sub>C</sub> 90° geride; uç uca eklenince kaynak fazörü V çıkar. Açı ortalama gücü de belirler: P = V<sub>rms</sub>I<sub>rms</sub>·cos φ. <strong>Güç çarpanı</strong> cos φ = R/Z varsayılan ayarda 0.5636'dır: kaynak 2.818 VA'lik görünür güç taşır ama yalnızca 1.588 W'ı dirençte ısıya döner.",
      formula: "Z = R + j(ωL − 1/(ωC)),  |Z| = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²),  tan φ = (X<sub>L</sub> − X<sub>C</sub>)/R",
      formulaNote: "Varsayılan ayarda |Z| = 17.74 Ω ve φ = −55.69°: kondansatör baskın, akım ileride. Eksi işaretli φ kapasitif, artı işaretli φ indüktif devre demektir.",
    },
    {
      heading: "Rezonans, Q ve gerilim büyütmesi",
      body:
        "X<sub>L</sub> frekansla büyür, X<sub>C</sub> küçülür; ikisinin eşitlendiği tek bir frekans vardır, ω₀ = 1/√(LC). Orada sanal kısım sıfırlanır, Z = R'ye iner, akım en büyük olur ve kaynakla aynı fazda salınır. Ama bobin ile kondansatör boş durmaz: aynı akım ikisinden de geçer ve her birinin uçlarında Q·V<sub>rms</sub> gerilimi oluşur. <strong>Kalite çarpanı</strong> Q = √(L/C)/R sayfanın varsayılan bileşenlerinde 3.16'dır; 7.071 V'luk kaynak bu yüzden kondansatörde 22.36 V üretir. Enerji yoktan gelmez. Bobinle kondansatör arasında gidip gelen enerji, dirençte bir periyotta harcanan enerjinin Q/2π katıdır ve bu birikim periyotlar boyunca yavaş yavaş kurulur; kararlı durumda kaynak yalnızca dirençteki kaybı karşılar. Q aynı zamanda tepenin darlığıdır: ortalama gücün yarıya indiği iki frekans arasındaki bant Δf = f₀/Q'dur. Radyoda bir istasyonu seçmek dar bir bant istemektir.",
      formula: "f<sub>0</sub> = 1/(2π√(LC)),  Q = √(L/C)/R,  Δf = f<sub>0</sub>/Q = R/(2πL)",
      formulaNote: "Rezonansta bobinin ve kondansatörün etkin gerilimleri eşittir ve kaynağınkinin Q katıdır. Varsayılan bileşenlerde f₀ = 503.3 Hz, Q = 3.16, Δf = 159.2 Hz (430.0–589.1 Hz).",
    },
    {
      heading: "Geçici rejim: denklemin homojen çözümü",
      body:
        "Sayfa formül çizmez, devreyi çözer: Kirchhoff'un ilmek kuralından gelen ikinci mertebe denklemi RK4 yöntemiyle durgun hâlden (q = 0, i = 0) adım adım ilerletir. Doğrusal bir denklemin çözümü iki parçadır: kaynağın dayattığı kararlı durum (fazörlerin bulduğu çözüm) ve kaynak yokmuş gibi çözülen <strong>homojen</strong> kısım. Homojen kısım e<sup>st</sup> biçimindedir; Ls² + Rs + 1/C = 0 denkleminin kökleri s = −R/(2L) ± jω<sub>d</sub>'dir. Bu terim devrenin kendi frekansında çınlar ve τ = 2L/R zaman sabitiyle söner; yalnızca başlangıç koşullarını sağlamak için oradadır. Varsayılan ayarda τ = 2.00 ms, çınlama 497.0 Hz'dir. Q < ½ olunca (R > 2√(L/C)) kökler gerçel olur ve devre salınmadan oturur. Denklem, sürülen sönümlü yay–kütleninkiyle aynıdır: L kütlenin, R sürtünmenin, 1/C yay sabitinin, q konumun yerini alır. Bir bağ daha: Δf·τ = (R/2πL)·(2L/R) = 1/π. Keskin bir rezonans, yavaş bir oturma demektir.",
      formula: "L·q″ + R·q′ + q/C = V<sub>0</sub> sin ωt,  q<sub>h</sub> ∝ e<sup>−t/τ</sup>cos(ω<sub>d</sub>t + θ),  τ = 2L/R",
      formulaNote: "Çınlamanın açısal frekansı √(ω₀² − (R/2L)²)'dir. Sayfa ölçümü t ≥ 9τ olunca kararlı sayar: geçici terim başlangıcının e⁻⁹ ≈ 1.2·10⁻⁴'üne inmiştir.",
    },
  ],
  lab: {
    intro:
      "Benzetim, seri devrenin denklemini RK4 yöntemiyle küçük zaman adımlarında çözer. Bu yüzden her ayar değişikliğinde devre durgun hâlden yeniden başlar ve önce bir geçici rejim görürsün. Panelde <strong>Devre</strong> menüsü (Yalnız R, RL, RC, RLC), logaritmik <strong>Frekans f</strong> kaydırıcısı (10 Hz–100 kHz), <strong>Genlik V₀</strong> (tepe değeri) ve standart E12 değerleriyle <strong>Direnç R</strong>, <strong>İndüktans L</strong>, <strong>Sığa C</strong> var; <strong>Gösterim hızı</strong> 0.25× ile 256× arasında seçilir ve <strong>Rezonansa git</strong> düğmesi frekansı tam f₀'a getirir. <strong>Kuram ve ölçüm</strong> tablosu benzetimin son tam periyodundan ölçtüğü değerleri fazör kuramının yanına yazar; ölçülenler, durum satırı 'Kararlı durum' diyene (t ≥ 9τ) kadar gri ve eğik görünür. Tablodaki bütün değerler etkindir. Zaman grafiği son üç periyodu, fazör diyagramı dönen okları gösterir; rezonans eğrisine dokunmak frekansı oraya taşır ve kararlı her ölçüm eğrinin üstüne bir halka ekler. Bekleme uzun gelirse hızı 16× ya da 64× yap.",
    experiments: [
      {
        title: "Kaynaktan büyük gerilim",
        predict:
          "Varsayılan devrede (RLC, f = 400.0 Hz, V₀ = 10.0 V, R = 10 Ω, L = 10 mH, C = 10 µF) kaynağın etkin gerilimi 7.071 V. Kondansatörün etkin gerilimi bundan büyük olabilir mi? Üç elemanın etkin gerilimlerini toplarsan kaynağı mı bulursun?",
        do: "Durum satırı 'Kararlı durum' diyene kadar bekle (1× hızda 10 saniye kadar, Gösterim hızı 16× ile bir saniyeden kısa). Tablodan V<sub>R</sub>, V<sub>L</sub>, V<sub>C</sub>'yi oku. Sonra <strong>Rezonansa git</strong>'e bas, yeniden kararlı durumu bekle ve aynı satırları I<sub>rms</sub> ile birlikte oku.",
        observe:
          "400 Hz'de V<sub>R</sub> = 3.985 V, V<sub>L</sub> = 10.02 V, V<sub>C</sub> = 15.86 V: toplamları 29.87 V, kaynağın dört katından fazla; Gerilim büyütmesi kartı 2.24× der. Rezonansta (f = 503.3 Hz) φ = 0.00°, I<sub>rms</sub> = 707.1 mA, V<sub>R</sub> = 7.071 V, yani kaynağa eşit; V<sub>L</sub> = V<sub>C</sub> = 22.36 V ve büyütme 3.16×, yani Q. Ölçülen sütun kuramla aynıdır, fark 0.00 %.",
        explain:
          "Etkin değerler toplanmaz, fazörler toplanır. V<sub>L</sub> ile V<sub>C</sub> zıt yönlüdür, farkları 5.84 V'tur ve V<sub>R</sub>'ye dik eklenir: √(3.985² + 5.84²) ≈ 7.07 V. Anlık değerler ise her an tam toplanır; Kirchhoff bozulmaz. Rezonansta V<sub>L</sub> ile V<sub>C</sub> birbirini tam siler, kaynak yalnızca direnci besler; büyük gerilimler bobinle kondansatör arasında gidip gelen enerjinin izidir.",
      },
      {
        title: "Akım önde mi, geride mi?",
        predict:
          "400 Hz'de akım, kaynak geriliminden önce mi tepe yapar, sonra mı? Frekansı rezonansın üstüne, 1 kHz'e çıkarırsan faz açısının işareti ne olur?",
        do: "Varsayılan ayarda Faz kartını, fazör diyagramını ve zaman grafiğindeki çift oklu Δt etiketini incele. Sonra <strong>Frekans f</strong> kaydırıcısını okuma tam 1.000 kHz olana dek kaydır (son adımı ok tuşlarıyla at), Gösterim hızını 16× yap ve kararlı durumu bekle.",
        observe:
          "400 Hz'de X<sub>L</sub> = 25.13 Ω, X<sub>C</sub> = 39.79 Ω, Z = 17.74 Ω, φ = −55.69° ve 'akım ileride (kapasitif)'; grafikte 'akım ileride: Δt = 387 µs'. 1 kHz'de X<sub>L</sub> = 62.83 Ω, X<sub>C</sub> = 15.92 Ω, Z = 47.97 Ω, φ = 77.97°, 'akım geride (indüktif)', Δt = 217 µs ve I<sub>rms</sub> = 147.4 mA. Fazör diyagramında V<sub>L</sub> ile V<sub>C</sub>'nin boyları yer değiştirir.",
        explain:
          "X<sub>L</sub> frekansla büyür, X<sub>C</sub> küçülür; f₀'ın altında kondansatör, üstünde bobin baskındır ve φ'nin işareti X<sub>L</sub> − X<sub>C</sub>'nin işaretidir. Açıyı zamana çevirmek için periyodun o kesrini al: Δt = (|φ|/360°)·T = (55.69/360) × 2.5 ms ≈ 387 µs.",
      },
      {
        title: "Dar bant, uzun çınlama",
        predict:
          "Rezonanstayken direnci 10 Ω'dan 1 Ω'a indirirsen rezonans eğrisi, kondansatör gerilimi ve devrenin oturma süresi nasıl değişir? 100 Ω'da ne olur?",
        do: "<strong>Rezonansa git</strong>'e bas, Gösterim hızını 64× yap ve <strong>Direnç R</strong>'yi en sola, 1 Ω'a çek. Zaman grafiğini ve rezonans eğrisini izle, Q, Δf ve τ kartlarını oku, kararlı durumu bekle. Sonra R'yi 100 Ω yap; yolda 56 Ω ve 68 Ω'da τ kartının etiketine de bak.",
        observe:
          "1 Ω'da Q = 31.6, Δf = 15.92 Hz, τ = 20.0 ms: eğri iğne gibi sivrilir; akım ve v<sub>C</sub> periyot periyot büyür, kararlı durum 64×'te yaklaşık 3 s sonra gelir. Sonunda I<sub>rms</sub> = 7.071 A, V<sub>C</sub> = 223.6 V; grafikte v<sub>C</sub> ±316 V salınır, kaynak ±10 V. 100 Ω'da Q = 0.316, Δf = 1.592 kHz, V<sub>C</sub> = 2.236 V ve τ kartı 'aşırı sönüm, yavaş kök' der: 887 µs.",
        explain:
          "Q = √(L/C)/R ve Δf = R/(2πL): direnç küçüldükçe tepe daralır ve yükselir. Aynı direnç geçici terimi de yönetir, τ = 2L/R; çınlayan devrede Δf·τ = 1/π sabittir. Enerji her periyotta biraz birikir, kayıp kazanca eşitlenene dek. R, 2√(L/C) = 63.2 Ω'u aşınca (Q < ½) devre salınmadan oturur: τ kartı 56 Ω'da hâlâ 'τ = 2L/R (zarf)', 68 Ω'da 'aşırı sönüm, yavaş kök' der.",
      },
      {
        title: "Watt mı, voltamper mi?",
        predict:
          "Devreyi RC yapıp frekansı en düşüğe, 10 Hz'e indirirsen 10 Ω'luk direnç ne kadar güç harcar? Kondansatör alternatif akımı engeller mi? 100 kHz'de ne değişir?",
        do: "<strong>Devre</strong> menüsünden RC'yi seç, Frekans f kaydırıcısını en sola çek (10.00 Hz). Güç çarpanı ve Görünür güç kartlarını, tablodaki Güç P satırını oku. Sonra kaydırıcıyı en sağa (100.0 kHz) götür, Gösterim hızını 256× yap ve kararlı durumu bekle.",
        observe:
          "10 Hz'de X<sub>C</sub> = 1.592 kΩ, I<sub>rms</sub> = 4.443 mA, φ = −89.64°; görünür güç 31.42 mVA ama P yalnızca 197.4 µW, cos φ = 0.00628. Gerilimin neredeyse tamamı (7.071 V) kondansatörün uçlarındadır. 100 kHz'de X<sub>C</sub> = 159.2 mΩ, I<sub>rms</sub> = 707.0 mA, φ = −0.91°, P = 4.999 W, cos φ = 0.9999: kondansatör neredeyse bir teldir.",
        explain:
          "Kondansatör bir çeyrek periyotta enerji depolar, sonraki çeyrekte geri verir; bir periyotluk ortalaması sıfırdır. Bu yüzden ölçülen P = ⟨v·i⟩, S = V<sub>rms</sub>I<sub>rms</sub>'nin yalnızca cos φ katıdır: 10 Hz'de %0.63. Kondansatör doğru akımı keser, alternatif akımı değil: tepkinliği 1/(ωC) frekans arttıkça erir.",
      },
    ],
  },
  wow: [
    {
      title: "Fırın saatleri altı dakika geri kaldı",
      body:
        "Türkiye'nin şebekesi Eylül 2010'dan beri kıta Avrupası'nın senkron şebekesine bağlı: Portekiz'den Türkiye'ye santrallerin jeneratörleri aynı 50 Hz ritmine kilitlidir. Bazı fırın saatleri, radyolu çalar saatler ve ısıtma zamanlayıcıları zamanı bu ritimden sayar. 2018'in Ocak ortasından Mart başına dek Kosova–Sırbistan anlaşmazlığı yüzünden şebekede 113 GWh enerji açığı birikti; ortalama frekans yaklaşık 49.996 Hz'e indi ve bu saatler altı dakikaya yakın geri kaldı. Hesap tutuyor: yüz binde sekizlik fark, 50 günde yaklaşık 350 saniye eder. Mart boyunca ortalama frekans 50.01 Hz'de tutuldu ve Nisan başında saatler yeniden doğruyu gösterdi.",
    },
    {
      title: "Bir ülke, iki frekans",
      body:
        "Japonya'da Tokyo ve doğusu 50 Hz, Nagoya ve batısı 60 Hz kullanır. Bölünme 1895'te Tokyo için Alman AEG'den, 1896'da Osaka için Amerikan General Electric'ten alınan jeneratörlerle başladı ve 130 yıldır kapanmadı. Farklı frekanstaki iki alternatif akım şebekesi doğrudan birleştirilemez; iki yarıyı bugün yalnızca frekans dönüştürücü istasyonlar bağlar. Elektrik önce doğru akıma çevrilir, sonra öteki frekansta yeniden alternatif akıma.",
    },
    {
      title: "Radyonun ayar düğmesi bir kondansatördür",
      body:
        "Avrupa'da orta dalga yayınları 531 ile 1602 kHz arasında, 9 kHz arayla dizilmiş 120 kanaldadır. En basit alıcıda istasyonu seçen şey bir LC devresidir: ayar düğmesi, değişken bir kondansatörün döner plakalarını sabit plakaların arasına sokar. f₀ = 1/(2π√(LC)) olduğundan üç katlık frekans aralığını (1602/531 ≈ 3.02) taramak için sığayı yaklaşık 9 kat değiştirmek yeter; örneğin 240 µH'lik bir bobinle 41 ile 374 pF arası. 1 MHz civarında yarı güç bandını kanal aralığına, 9 kHz'e daraltmak ise Q = f₀/Δf ≈ 110 ister.",
    },
  ],
  worked: {
    title: "100 hertzde bir seri RLC devresi",
    prompt:
      "Tepe değeri V₀ = 10.0 V, frekansı f = 100 Hz olan bir kaynağa R = 10.0 Ω, L = 100 mH ve C = 10.0 µF seri bağlanıyor. Tepkinlikleri, empedansı, faz açısını, etkin akımı, kondansatörün etkin gerilimini ve ortalama gücü bul. Sonra rezonans frekansını, Q'yu ve geçici rejimin zaman sabitini hesapla.",
    steps: [
      "Açısal frekans ve tepkinlikler: ω = 2π × 100 Hz = 628.3 rad/s. X<sub>L</sub> = ωL = 628.3 rad/s × 0.100 H = 62.83 Ω; X<sub>C</sub> = 1/(ωC) = 1/(628.3 rad/s × 10.0×10⁻⁶ F) = 159.2 Ω. Birim denetimi: H = V·s/A olduğundan (1/s)·H = V/A = Ω; F = A·s/V olduğundan 1/((1/s)·F) = Ω.",
      "Empedans ve faz: X = X<sub>L</sub> − X<sub>C</sub> = −96.32 Ω. |Z| = √(10.0² + 96.32²) Ω = 96.84 Ω; φ = arctan(X/R) = arctan(−9.632) = −84.07°. φ negatif: kondansatör baskın, akım gerilimden 84° ileride. Frekans rezonansın altındadır (5. adım).",
      "Akım ve gerilimler (etkin): V<sub>rms</sub> = 10.0 V/√2 = 7.071 V, I<sub>rms</sub> = V<sub>rms</sub>/|Z| = 7.071 V / 96.84 Ω = 73.02 mA. V<sub>R</sub> = I·R = 0.730 V, V<sub>L</sub> = I·X<sub>L</sub> = 4.588 V, V<sub>C</sub> = I·X<sub>C</sub> = 11.62 V. Kondansatörün gerilimi kaynağınkinin 1.64 katı, ama fazör toplamı tutar: √(0.730² + (4.588 − 11.62)²) V ≈ 7.07 V.",
      "Güç: P = I<sub>rms</sub>²·R = (0.07302 A)² × 10.0 Ω = 53.32 mW. Denetim: S = V<sub>rms</sub>I<sub>rms</sub> = 516.3 mVA, cos φ = R/|Z| = 0.1033 ve P = S·cos φ = 53.3 mW. Kaynağın taşıdığı görünür gücün yalnızca onda biri ısıya döner; gerisi her periyotta kondansatöre girip geri çıkar.",
      "Rezonans ve sayfada deneme: f₀ = 1/(2π√(0.100 H × 10.0×10⁻⁶ F)) = 1/(2π × 1.00×10⁻³ s) = 159.2 Hz; Q = √(L/C)/R = 100 Ω / 10.0 Ω = 10.0, Δf = f₀/Q = 15.92 Hz, τ = 2L/R = 20.0 ms. Sayfada Devre RLC, R = 10 Ω, L = 100 mH, C = 10 µF, Frekans f okuması tam 100.0 Hz ve Gösterim hızı 16× seç: kararlı durumda tablo yukarıdaki değerleri gösterir. Rezonansa git'e basınca f = 159.2 Hz, I<sub>rms</sub> = 707.1 mA, V<sub>C</sub> = 70.71 V ve büyütme 10.0× olur.",
    ],
    result:
      "|Z| = 96.84 Ω, φ = −84.07° (akım ileride), I<sub>rms</sub> = 73.02 mA, V<sub>C</sub> = 11.62 V, P = 53.32 mW; f₀ = 159.2 Hz, Q = 10.0, τ = 20.0 ms. Rezonansa çıkınca akım yaklaşık on katına, kondansatör gerilimi kaynağın on katına (70.71 V) çıkar.",
  },
  misconceptions: [
    {
      myth: "Seri devrede elemanların etkin gerilimleri toplanınca kaynağın gerilimi bulunur.",
      truth:
        "Anlık değerler her an toplanır (Kirchhoff), etkin değerler toplanmaz; çünkü gerilimler tepeye farklı anlarda ulaşır. Varsayılan ayarda 3.985 + 10.02 + 15.86 = 29.87 V, kaynak ise 7.071 V. Doğru toplama fazörlerledir: V<sub>L</sub> ile V<sub>C</sub> zıt yönlü, V<sub>R</sub> onlara dik; √(3.985² + (10.02 − 15.86)²) ≈ 7.07 V.",
    },
    {
      myth: "Kondansatör alternatif akımı geçirmez.",
      truth:
        "Kondansatör doğru akımı keser. Alternatif akımda plakalar her periyotta dolup boşalır ve devrede akım dolaşır; plakaların arasından yük geçmez, devreyi Maxwell'in yer değiştirme akımı tamamlar. Tepkinlik 1/(ωC) frekansla düşer: sayfada RC devresinde 10 Hz'de 1.592 kΩ (4.443 mA), 100 kHz'de 159.2 mΩ (707.0 mA).",
    },
    {
      myth: "Q ne kadar yüksekse devre o kadar iyidir.",
      truth:
        "Q bir kalite notu değil, seçicilik ölçüsüdür. Yüksek Q dar bant ve büyük gerilim büyütmesi demektir; ama aynı zamanda yavaş oturma (Δf·τ = 1/π) ve elemanlara binen yüksek gerilim. Sayfada R = 1 Ω'da 7.071 V'luk kaynak kondansatöre 223.6 V uygular ve sayfa kararlı durumu ancak 9τ = 180 ms sonra ilan eder. Geniş bantlı bir yükselteç ya da ölçü aleti düşük Q ister.",
    },
    {
      myth: "Güç çarpanı düşük bir cihaz az güç çektiği için hatlara da az yük bindirir.",
      truth:
        "Ortalama güç P = V<sub>rms</sub>I<sub>rms</sub>·cos φ küçülse de akım küçülmez; kablolar akımın tamamını taşır ve I²R ile ısınır. Sayfada RC devresinde 10 Hz'de kaynak 31.42 mVA taşırken yalnızca 197.4 µW iş görür. Bu yüzden fabrikalar endüktif motorların yanına kondansatör bataryaları koyar: tepkin akımı yerinde dengeleyip cos φ'yi 1'e yaklaştırır, hattan çekilen akımı azaltırlar.",
    },
  ],
  glossary: [
    {
      term: "Etkin değer (rms)",
      definition:
        "Aynı dirençte aynı ortalama gücü veren doğru akım değeri; sinüste tepe değerinin 1/√2 katıdır, bu yüzden 230 V etkin gerilimin tepesi yaklaşık 325 V'tur.",
    },
    {
      term: "Tepkinlik (reaktans)",
      definition:
        "Bobin ya da kondansatörün alternatif akıma ohm cinsinden karşı koyuşu, X<sub>L</sub> = ωL ve X<sub>C</sub> = 1/(ωC); direncin aksine enerjiyi harcamaz, depolayıp geri verir.",
    },
    {
      term: "Empedans (Z)",
      definition:
        "Direnç ile tepkinliğin karmaşık toplamı, Z = R + jX; büyüklüğü gerilim ve akım genliklerinin oranını, açısı aralarındaki faz farkını verir.",
    },
    {
      term: "Fazör",
      definition:
        "Sinüs biçimli bir büyüklüğün genliğini ve fazını taşıyan karmaşık sayı; ωt açısıyla dönen bir ok olarak çizilir ve düşey izdüşümü anlık değerdir.",
    },
    {
      term: "Rezonans frekansı (f₀)",
      definition:
        "Seri RLC'de X<sub>L</sub> = X<sub>C</sub> olduğu frekans, f₀ = 1/(2π√(LC)); empedans R'ye iner, akım en büyük olur ve gerilimle aynı fazda salınır.",
    },
    {
      term: "Kalite çarpanı (Q)",
      definition:
        "Rezonansın keskinliği, Q = √(L/C)/R = f₀/Δf; rezonansta kondansatör geriliminin kaynak gerilimine oranına da eşittir.",
    },
    {
      term: "Güç çarpanı (cos φ)",
      definition:
        "Ortalama gücün görünür güce oranı, P/S; seri devrede R/Z'ye eşittir. 1 ise akımın tamamı iş görür, 0'a yaklaştıkça akım enerjiyi yalnızca götürüp geri getirir.",
    },
    {
      term: "Geçici rejim",
      definition:
        "Devre çalıştırıldığında ya da bir ayar değiştiğinde ortaya çıkan, kaynaktan bağımsız ve e<sup>−t/τ</sup> ile sönen ek salınım; söndükten sonra kararlı durum kalır.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede alternatif akım bir formül listesidir; üniversitede bir yöntem. <strong>Fizik II</strong> (Elektrik ve Manyetizma) dersinde seri RLC, Kirchhoff'un ilmek kuralından çıkan L·q″ + R·q′ + q/C = V₀ sin ωt denklemiyle kurulur ve sürülen sönümlü salınıcının elektrikteki ikizi olarak çözülür. <strong>Devre Analizi</strong> derslerinde fazör yöntemi bütün ağlara genellenir: düğüm ve çevre denklemleri karmaşık empedanslarla yazılır, Thevenin eşdeğeri ve karmaşık güç tanımlanır, üç fazlı şebeke hesaplanır. Ardından <strong>Laplace dönüşümü</strong> gelir: jω yerine s = σ + jω yazınca kararlı durum ile geçici rejim tek bir transfer fonksiyonundan okunur. Kondansatör gerilimi için H(s) = 1/(LCs² + RCs + 1); kutupları s = −R/(2L) ± jω<sub>d</sub>, sayfadaki τ = 2L/R ile 497.0 Hz'lik çınlamanın ta kendisidir. Akımın yanıtı 1/Z(s) aynı paydayı taşır; s = jω konunca sayfadaki rezonans eğrisi çıkar.",
      "<strong>Sinyaller ve Sistemler</strong> dersinde aynı devre bir filtredir: çıkışı direnç üzerinden alırsan bant geçiren, kondansatör üzerinden alırsan alçak geçiren olur; sayfanın RL ve RC modlarında gördüğün f<sub>c</sub>, birinci dereceden filtrelerin köşe frekansıdır. Fourier analizi her periyodik sinyali sinüslere ayırdığı için, doğrusal bir devrenin her girdiye yanıtı fazör hesaplarının toplamıdır. <strong>Elektromanyetik Teori</strong> ise modelin sınırını çizer: sayfa devreyi toplu elemanlarla kurar, bu da devrenin dalga boyundan çok küçük olmasını ister. 50 Hz'de dalga boyu 6 000 km, 100 kHz'de 3 km, 1 GHz'de 30 cm'dir; bir cep telefonunun devre kartındaki iletken artık basit bir tel değil, birim uzunluk başına L ve C taşıyan bir <strong>iletim hattıdır</strong> ve Heaviside'ın telgrafçı denklemleriyle çözülür.",
    ],
    topics: [
      "Fizik II: Elektrik ve Manyetizma",
      "Devre Analizi",
      "Sinyaller ve Sistemler",
      "Elektromanyetik Teori",
      "Laplace dönüşümü ve transfer fonksiyonu",
      "Analog filtreler",
      "İletim hatları",
      "Üç fazlı güç sistemleri",
    ],
  },
  quiz: [
    {
      question:
        "Seri bir RLC devresinde yalnızca bobinin indüktansı dört katına çıkarılıyor; R ve C aynı kalıyor. Rezonans frekansı f₀ ve yarı güç bant genişliği Δf ne olur?",
      options: [
        "f₀ yarıya iner, Δf dörtte bire iner",
        "f₀ yarıya iner, Δf değişmez",
        "f₀ dörtte bire iner, Δf yarıya iner",
        "İkisi de değişmez; yalnızca Q artar",
      ],
      answer: 0,
      explanation:
        "f₀ = 1/(2π√(LC)) olduğundan dört kat L, f₀'ı √4 = 2'ye böler. Δf = R/(2πL) ise L ile ters orantılıdır: dörtte bir. Q = f₀/Δf iki katına çıkar; Q = √(L/C)/R de bunu doğrular. Sayfada L'yi 10 mH'den 100 mH'ye çıkar: f₀ 503.3 Hz'den 159.2 Hz'e (√10 kat), Δf 159.2 Hz'den 15.92 Hz'e (10 kat) iner.",
    },
    {
      question:
        "Seri bir RLC devresinde akımın kaynak geriliminden önce tepe yaptığı görülüyor. Aşağıdakilerden hangisi kesinlikle doğrudur?",
      options: [
        "Sürücü frekans rezonans frekansının altındadır",
        "Sürücü frekans rezonans frekansının üstündedir",
        "Devrede bobin yoktur",
        "Direnç çok büyüktür",
      ],
      answer: 0,
      explanation:
        "Akımın önde olması φ < 0 demektir: kondansatörün tepkinliği bobininkinden büyüktür. Bobininki frekansla artar, kondansatörünki azalır ve ikisi yalnızca f₀'da eşitlenir; demek ki sürücü frekans f₀'ın altındadır. Bobin devrede olabilir (varsayılan 400 Hz ayarı gibi), yalnızca kondansatör baskındır. R açının büyüklüğünü değiştirir, işaretini değil.",
    },
    {
      question:
        "230 V etkin gerilimli şebekeye bağlı bir motor 5.0 A etkin akım çekiyor ve güç çarpanı 0.80. Motorun şebekeden çektiği ortalama güç kaçtır?",
      options: ["1150 W", "920 W", "690 W", "1438 W"],
      answer: 1,
      explanation:
        "Görünür güç etkin gerilimle etkin akımın çarpımıdır: S = 230 V × 5.0 A = 1150 VA. Ortalama güç bunun cos φ katıdır: P = 1150 × 0.80 = 920 W. 690, sin φ = 0.60 ile bulunan ve her periyotta gidip gelen tepkin güçtür (birimi var); 1438 ise bölmeyle çarpmayı karıştırmanın sonucudur. Hattaki ısı kaybı akıma, yani S'ye bağlıdır.",
    },
  ],
  next: [
    {
      href: "karmasik-sayilar.html",
      title: "Karmaşık Sayılar",
      why: "Fazör hesabının cebiri: iki sayıyı çarpınca büyüklükler çarpılır, açılar toplanır. j ile çarpmak 90° döndürmektir; bobinin gerilimini akımın önüne geçiren de bu dönmedir.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler",
      why: "Geçici rejimin kendisi: Sönüm c kaydırıcısını artır, faz düzlemindeki sarmalın salınmadan dengeye çöktüğü eşiği bul (c = 2√k). RLC'de bunun karşılığı R = 2√(L/C), yani Q = ½.",
    },
    {
      href: "yay-kutle.html",
      title: "Yay–Kütle Sistemi",
      why: "Aynı ikinci mertebe denklemin mekanik ikizi: kütle bobinin, yay sabiti 1/C'nin yerini alır. Kütle m ve Yay sabiti k ile ölçtüğün T = 2π√(m/k), buradaki 1/f₀ = 2π√(LC)'nin karşılığıdır.",
    },
    {
      href: "elektrik-muhendisligi.html",
      title: "Elektrik Mühendisliği",
      why: "Hikâyenin bugünü: santralden çıkan elektriğin 154–380 kV iletim hatlarından 230 V prize uzanan yolculuğu, transformatörler ve motorlar. I²R kaybına karşı gerilimi yükseltme fikri orada iş başında.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 2, 15.5 Resonance in an AC Circuit",
      url: "https://openstax.org/books/university-physics-volume-2/pages/15-5-resonance-in-an-ac-circuit",
      note: "Rezonans frekansı, Q ve bant genişliği; RLC devresinin sürülen sönümlü salınıcıyla karşılaştırması ve çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title: "The Feynman Lectures on Physics · Vol. I, Ch. 23: Resonance",
      url: "https://www.feynmanlectures.caltech.edu/I_23.html",
      note: "Karmaşık sayılarla sürülen salınıcı, elektrik rezonansı ve Q: fazör yönteminin bir fizikçinin elinden anlatımı (İngilizce, çevrimiçi ücretsiz).",
    },
    {
      title: "HyperPhysics · RLC Series Circuit",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/electric/rlcser.html",
      note: "Seri RLC empedansı ve faz açısı için etkileşimli hesaplayıcı; sayfadaki bileşen değerlerini girip kuram sütununu denetle (İngilizce).",
    },
    {
      title: "Wikipedia · War of the currents",
      url: "https://en.wikipedia.org/wiki/War_of_the_currents",
      note: "Edison, Westinghouse, Tesla ve Brown; elektrikli sandalye, 1892 birleşmesi, Chicago fuarı ve Niagara, kaynaklarıyla (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
