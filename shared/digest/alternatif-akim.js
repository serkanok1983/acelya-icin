window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["alternatif-akim"] = {
  slug: "alternatif-akim",
  title: "Alternatif Akım: Fazörler, Rezonans ve Güç",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bobinde akım gerilimin gerisinde kalır, kondansatörde önüne geçer; doğru frekansta bu iki etki birbirini siler. Aynı zamanlama radyoyu istasyona ayarlar, 10 voltluk bir kaynaktan da 300 voltun üstünde gerilim çıkarır.",
  hook:
    "Tepe değeri 10 volt olan bir kaynağa 1 ohmluk bir direnç, 10 milihenrilik bir bobin ve 10 mikrofaradlık bir kondansatörü seri bağla, frekansı 503 hertze getir: saniyenin onda biri içinde kondansatörün uçlarındaki gerilim ±316 volta tırmanır, kaynağınkinin otuz katından fazlasına. Devrede transformatör de yok, ikinci bir kaynak da. Bu gerilim nereden geliyor?",
  bigIdea:
    "Alternatif akımda direncin gerilimi akımla aynı anda, bobininki akımdan çeyrek periyot önce, kondansatörünki çeyrek periyot sonra tepe yapar; bu zamanlamalar tek bir karmaşık sayıda, empedansta toplanır, <em>Z = R + j(ωL − 1/(ωC))</em>, ve iki tepkinliğin birbirini sildiği frekansta devre yalnızca direnci görür.",
  story: [
    "Eylül 1882'de Thomas Edison'un New York'taki Pearl Street santrali 110 voltluk doğru akımla ilk müşterilerinin 400 lambasını yakmaya başladı. Sistem iyi çalışıyordu ama uzağa gidemiyordu: bu kadar düşük gerilimle bir santral ancak bir buçuk kilometre kadar ötedeki evlere yetişebiliyordu. Aynı gücü düşük gerilimle taşımak büyük akım demektir ve tellerde ısıya giden güç akımın karesiyle büyür (<em>I²R</em>): gerilimi on katına çıkarırsan aynı güç için akım onda bire, aynı teldeki kayıp yüzde bire iner. Çare gerilimi yolda yükseltip evde düşürmekti; bunu yapan alet, <strong>transformatör</strong>, yalnızca değişen akımla çalışır. 1885'te Budapeşte'deki ulusal sergide Ganz fabrikasının üç mühendisi, Zipernowsky, Bláthy ve Déri, kapalı demir çekirdekli transformatörlerini tanıttı. Edison'un şirketi bu transformatörün patent opsiyonunu bile almıştı; 1886'da mühendis Frank Sprague'in şirket için yazdığı gizli bir rapor alternatif akıma geçmeyi önerdi, ama Edison karşı çıktı. Mart 1886'da William Stanley, George Westinghouse'un desteğiyle Massachusetts'in Great Barrington kasabasında sokaktaki 500 voltu dükkânlarda 100 volta indiren bir gösteri şebekesi kurdu. Temmuz 1888'de Westinghouse, Nikola Tesla'nın çok fazlı indüksiyon motoru patentlerinin lisansını aldı: artık ışığın yanında motor da alternatif akımla dönebilecekti.",
    "Ardından tarihe 'akımlar savaşı' diye geçen kavga başladı. Temmuz 1888'de mühendis Harold Brown, alternatif akımın daha ölümcül olduğunu göstermek için Columbia Koleji'nde seyirci önünde köpekleri elektrikle öldürdü; Edison'un West Orange laboratuvarı ona yer, alet ve bir asistan, Arthur Kennelly'yi verdi. 6 Ağustos 1890'da New York eyaletinde dünyanın ilk elektrikli sandalye infazı yapıldı. Akımı, rakip şirketlerin el altından edindiği Westinghouse jeneratörleri sağladı; mahkûmun temyiz masraflarını ise infazı durdurmak isteyen Westinghouse ödemişti. Sık anlatılan bir hikâyeye göre Edison 1903'te Topsy adlı bir fili de aynı amaçla öldürtmüştür. Kayıtlar bunu desteklemez: fili Coney Island'daki Luna Park'ın sahipleri öldürttü, Edison oraya hiç gitmedi ve olay savaşın bitişinden on yıl sonra yaşandı; Edison'un film şirketinden bir ekip yalnızca çekim yaptı. Savaşı bir birleşme ve sahadaki sonuçlar bitirdi. 1892'de Edison'un adını taşıyan şirket rakibi Thomson-Houston ile birleşip General Electric oldu ve alternatif akım satmaya başladı; Westinghouse 1893 Chicago Dünya Fuarı'nın elektriğini alternatif akımla sağladı. Niagara Şelalesi'ndeki santral Westinghouse'un 25 hertzlik jeneratörleriyle 25 Ağustos 1895'te devreye girdi; gerilimi 20 000 volta yükseltilen enerji Buffalo'ya kadar taşındı. 1908'de Edison'un, Stanley'nin oğluna 'Babana yanıldığımı söyle' dediği aktarılır.",
    "Bir engel daha vardı: alternatif akım devrelerini hesaplamak türev ve integrallerle dolu diferansiyel denklemler istiyordu. Oliver Heaviside Temmuz 1886'da <strong>empedans</strong> sözcüğünü türetti. Nisan 1893'te aynı Kennelly, hâlâ Edison'un laboratuvarında çalışırken, empedansı karmaşık sayılarla yazan etkili bir makale yayımladı. Aynı yıl Chicago'daki Uluslararası Elektrik Kongresi'nde Charles Proteus Steinmetz <em>Karmaşık Nicelikler ve Elektrik Mühendisliğinde Kullanımları</em> adlı bildirisini sundu: empedansın yanında gerilimleri ve akımları da karmaşık sayılarla gösterdi; böylece Ohm ve Kirchhoff yasaları alternatif akımda da sıradan cebirle kullanılır oldu. Elektrikte i harfi akıma ayrıldığı için mühendisler sanal birimi j ile yazar. Bugün her devre kitabı bu yöntemi öğretir; sayfadaki 'Kuram (fazör)' sütunu da bu hesaptır. Şebeke frekansları ise o yılların kararlarından kaldı: Westinghouse 1890'da, eldeki ark lambaları biraz daha iyi çalıştığı için 60 hertzi seçti; Alman AEG 1891'de 40 hertzlik Lauffen–Frankfurt hattının beslediği lambaların titrediğini görünce standardını 50 hertze çıkardı. ABD ve Kanada bugün 60, Avrupa ve Türkiye 50 hertz kullanır.",
  ],
  core: [
    {
      heading: "Etkin değer: prizdeki 230 voltun tepesi 325 volttur",
      body:
        "Prizdeki gerilim saniyede 50 tam çevrimle +325 V ile −325 V arasında gidip gelir; bir periyotluk ortalaması sıfırdır, yani ısıtma hakkında hiçbir şey söylemez. Isıtmayı belirleyen ortalama <em>güçtür</em>: dirençte anlık güç v²/R'dir ve sin²'nin bir periyot boyunca ortalaması ½'dir, çünkü sin² ωt = (1 − cos 2ωt)/2. Demek ki tepe değeri V₀ olan bir sinüs, aynı dirençte V₀/√2 değerindeki doğru gerilimle aynı ısıyı üretir. Bu sayıya <strong>etkin değer</strong> (rms, kareler ortalamasının karekökü) denir; prizdeki 230 V bir etkin değerdir. Aynı özdeşlik bir şey daha söyler: dirence giden güç 2f frekansıyla nabız atar, 50 Hz'lik prizde saniyede 100 kez sıfıra iner. Sayfada Genlik V₀ = 10.0 V bir tepe değeridir, kaynağın etkin gerilimi 7.071 V'tur ve tablodaki bütün akım ve gerilimler etkindir. Devre menüsünden Yalnız R'yi seçersen 10 Ω'luk direnç her frekansta 7.071² / 10 = 5.000 W harcar.",
      formula: "V<sub>rms</sub> = √⟨v²⟩ = V<sub>0</sub>/√2,  P = V<sub>rms</sub>²/R (yalnız direnç)",
      formulaNote: "⟨ ⟩ bir periyot boyunca ortalamadır. 230 V × √2 ≈ 325 V: prizdeki gerilimin tepe değeri.",
    },
    {
      heading: "Bobin ve kondansatör: biri önde, öteki geride",
      body:
        "Bobinin gerilimi akımın değişim hızıyla orantılıdır, v<sub>L</sub> = L·di/dt. Akım sinüs ise türevi kosinüstür: bobinin gerilimi akımdan çeyrek periyot (90°) önde koşar ve genliği ωL·I₀ olur. Kondansatörde tersi olur: gerilim biriken yükle orantılıdır, v<sub>C</sub> = q/C, yük ise akımın integralidir; gerilim akımdan 90° geride kalır, genliği I₀/(ωC) olur. ωL ve 1/(ωC) birer <strong>tepkinliktir</strong> (reaktans). Ohm cinsinden ölçülürler ama direnç gibi ısı üretmezler, enerjiyi depolayıp geri verirler. Frekans artınca bobin akıma daha çok karşı koyar, çünkü değişim hızlanır; kondansatör daha az, çünkü akım yön değiştirmeden önce dolmaya vakit bulamaz. Seri devrede ikisi aynı akımı taşıdığı için gerilimleri arasında tam 180° vardır: biri bir yöne iterken öteki ters yöne iter ve birbirlerini kısmen siler. Tepkinliklerin zıt işaretli yazılmasının nedeni budur.",
      formula: "X<sub>L</sub> = ωL,  X<sub>C</sub> = 1/(ωC),  ω = 2πf",
      formulaNote: "Varsayılan ayarda (400 Hz) bobinin tepkinliği 25.13 Ω, kondansatörünki 39.79 Ω. Frekansı iki katına çıkarmak birincisini iki katına çıkarır, ikincisini yarıya indirir.",
    },
    {
      heading: "Fazörler: türevi çarpmaya çeviren hile",
      body:
        "Doğrusal bir devrede, kararlı durumda, her akım ve gerilim kaynakla aynı frekansta salınır; bir sinüsü tanımlamak için genliği ve fazı yeter. Bu yüzden her sinüsü ω hızıyla dönen bir ok, yani karmaşık bir sayı olarak yazarız: v(t) = Im(V̂·e<sup>jωt</sup>). e<sup>jωt</sup>'nin türevini almak onu jω ile çarpmaktır ve j ile çarpmak 90° döndürmektir. Böylece bobin için V̂<sub>L</sub> = jωL·Î, kondansatör için V̂<sub>C</sub> = −j·Î/(ωC) olur ve diferansiyel denklem cebire döner: V̂ = Î·Z. |Z| gerilim genliğinin akım genliğine oranını, Z'nin açısı φ ise gerilimin akımdan ne kadar önde olduğunu verir. Sayfadaki fazör diyagramı bu toplamı çizer: V<sub>R</sub> akımla aynı yönde, V<sub>L</sub> 90° önde, V<sub>C</sub> 90° geride; V<sub>R</sub>'nin ucundan V'nin ucuna giden kesikli çizgi V<sub>L</sub> + V<sub>C</sub> toplamıdır, yani üç ok uç uca eklenince kaynak fazörü V çıkar. Açı ortalama gücü de belirler: P = V<sub>rms</sub>I<sub>rms</sub>·cos φ. <strong>Güç çarpanı</strong> cos φ = R/|Z| varsayılan ayarda 0.5636'dır: kaynak 2.818 VA'lik görünür güç taşır ama yalnızca 1.588 W'ı dirençte ısıya döner.",
      formula: "Z = R + j(ωL − 1/(ωC)),  |Z| = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²),  tan φ = (X<sub>L</sub> − X<sub>C</sub>)/R",
      formulaNote: "Varsayılan ayarda |Z| = 17.74 Ω ve φ = −55.69°: kondansatör baskın, akım ileride. Sayfanın işaret kuralı φ = atan2(X<sub>L</sub> − X<sub>C</sub>, R): eksi φ kapasitif (akım önde), artı φ indüktif (akım geride) devre demektir.",
    },
    {
      heading: "Rezonans, Q ve gerilim büyütmesi",
      body:
        "X<sub>L</sub> frekansla büyür, X<sub>C</sub> küçülür; ikisinin eşitlendiği tek bir frekans vardır, ω₀ = 1/√(LC). Orada sanal kısım sıfırlanır, Z = R'ye iner, akım en büyük olur ve kaynakla aynı fazda salınır. Ama bobin ile kondansatör boş durmaz: aynı akım ikisinden de geçer ve her birinin uçlarında Q·V<sub>rms</sub> gerilimi oluşur. <strong>Kalite çarpanı</strong> Q = √(L/C)/R sayfanın varsayılan bileşenlerinde 3.16'dır; rezonansta 7.071 V'luk kaynak bu yüzden kondansatörün uçlarında 22.36 V oluşturur. Enerji yoktan gelmez. Bobinle kondansatör arasında gidip gelen enerji, dirençte bir periyotta harcanan enerjinin Q/2π katıdır ve bu birikim periyotlar boyunca yavaş yavaş kurulur; kararlı durumda kaynak yalnızca dirençteki kaybı karşılar. Q aynı zamanda tepenin darlığıdır: ortalama gücün yarıya indiği iki frekans arasındaki bant Δf = f₀/Q'dur. Radyoda bir istasyonu seçmek dar bir bant istemektir.",
      formula: "f<sub>0</sub> = 1/(2π√(LC)),  Q = √(L/C)/R,  Δf = f<sub>0</sub>/Q = R/(2πL)",
      formulaNote: "Rezonansta bobinin ve kondansatörün etkin gerilimleri eşittir ve kaynağınkinin Q katıdır. Varsayılan bileşenlerde f₀ = 503.3 Hz, Q = 3.16, Δf = 159.2 Hz (430.0–589.1 Hz).",
    },
    {
      heading: "Geçici rejim: denklemin homojen çözümü",
      body:
        "Sayfa yalnızca formülü çizmez, devreyi de çözer: Kirchhoff'un ilmek kuralından gelen ikinci mertebe denklemi RK4 yöntemiyle durgun hâlden (q = 0, i = 0) adım adım ilerletir. Doğrusal bir denklemin çözümü iki parçadır: kaynağın dayattığı kararlı durum (fazörlerin bulduğu çözüm) ve kaynak yokmuş gibi çözülen <strong>homojen</strong> kısım. Homojen kısım e<sup>st</sup> biçimindedir; Ls² + Rs + 1/C = 0 denkleminin kökleri s = −R/(2L) ± jω<sub>d</sub>'dir. Bu terim devrenin kendi frekansında çınlar ve τ = 2L/R zaman sabitiyle söner; yalnızca başlangıç koşullarını sağlamak için oradadır. Varsayılan ayarda τ = 2.00 ms, çınlama 497.0 Hz'dir; 400 Hz'lik sürücüyle birlikte grafikte vuru gibi görünür. Q < ½ olunca (R > 2√(L/C)) kökler gerçel olur ve devre salınmadan oturur. Denklem, sürülen sönümlü yay–kütleninkiyle aynıdır: L kütlenin, R sönüm katsayısının, 1/C yay sabitinin, q konumun yerini alır. Bir bağ daha: Δf·τ = (R/2πL)·(2L/R) = 1/π. Keskin bir rezonans, yavaş bir oturma demektir.",
      formula: "L·q″ + R·q′ + q/C = V<sub>0</sub> sin ωt,  q<sub>h</sub> ∝ e<sup>−t/τ</sup>cos(ω<sub>d</sub>t + θ),  τ = 2L/R",
      formulaNote: "Çınlamanın açısal frekansı √(ω₀² − (R/2L)²)'dir. Sayfa ölçümü t ≥ 9τ olunca kararlı sayar: geçici terim başlangıcının e⁻⁹ ≈ 1.2·10⁻⁴'üne inmiştir.",
    },
  ],
  lab: {
    intro:
      "Benzetim, seri devrenin denklemini RK4 yöntemiyle küçük zaman adımlarında çözer. Devre türü, f, V₀, R, L ya da C değişince benzetim durgun hâlden yeniden başlar ve önce bir geçici rejim görürsün. Panelde <strong>Devre</strong> menüsü (Yalnız R, RL, RC, RLC), logaritmik <strong>Frekans f</strong> kaydırıcısı (10 Hz–100 kHz), <strong>Genlik V₀</strong> (tepe değeri, 1–20 V) ve standart E12 değerleriyle <strong>Direnç R</strong>, <strong>İndüktans L</strong>, <strong>Sığa C</strong> var. <strong>Gösterim hızı</strong> 0.25× ile 256× arasında seçilir ve devreyi yeniden başlatmaz; <strong>Rezonansa git</strong> düğmesi frekansı tam f₀'a getirir; şemada L'ye ya da C'ye dokunmak o elemanı devreye sokar ya da çıkarır. <strong>Kuram ve ölçüm</strong> tablosu benzetimin son tam periyodundan ölçtüğü değerleri fazör kuramının yanına yazar; ölçülenler, durum satırı 'Kararlı durum' diyene (t ≥ 9τ) kadar gri ve eğik görünür. Tablodaki akım ve gerilimler etkin değerdir. Zaman grafiği son üç periyodu, fazör diyagramı dönen okları gösterir; rezonans eğrisine dokunmak frekansı oraya taşır ve kararlı her ölçüm eğrinin üstüne bir halka ekler. Frekans yalnızca açılışta tam 400 Hz'dir; kaydırıcı tam değerleri yalnızca 10'un kuvvetlerinde (10 Hz, 100 Hz, 1 kHz…) tutturur. Bu yüzden deneyleri sırayla yap, baştan almak için sayfayı yenile.",
    experiments: [
      {
        title: "Kaynaktan büyük gerilim",
        predict:
          "Açılış ayarında (RLC, f = 400.0 Hz, V₀ = 10.0 V, R = 10 Ω, L = 10 mH, C = 10 µF) kaynağın etkin gerilimi 7.071 V. Kondansatörün etkin gerilimi bundan büyük olabilir mi? Üç elemanın etkin gerilimlerini toplarsan kaynağı mı bulursun?",
        do: "Gösterim hızını 16× yap ve durum satırı 'Kararlı durum' diyene kadar bekle (16×'te bir saniyeden kısa, 1×'te 11 saniye kadar). Tablodan V<sub>R</sub>, V<sub>L</sub>, V<sub>C</sub>'yi, Faz kartından φ'yi oku; zaman grafiğindeki çift oklu Δt etiketini not et. Sonra <strong>Rezonansa git</strong>'e bas, yeniden kararlı durumu bekle ve aynı satırları I<sub>rms</sub> ile birlikte oku.",
        observe:
          "400 Hz'de V<sub>R</sub> = 3.985 V, V<sub>L</sub> = 10.02 V, V<sub>C</sub> = 15.86 V: toplamları yaklaşık 29.9 V, kaynağın dört katından fazla; Gerilim büyütmesi kartı 2.24× der. Faz kartı −55.69° ve 'akım ileride (kapasitif)', grafikte 'akım ileride: Δt = 387 µs' yazar. Rezonansta (f = 503.3 Hz) φ = 0.00°, I<sub>rms</sub> = 707.1 mA, V<sub>R</sub> = 7.071 V, yani kaynağa eşit; V<sub>L</sub> = V<sub>C</sub> = 22.36 V ve büyütme 3.16×, yani Q. Fark sütunu her satırda 0.00 % (faz için 0.00°) gösterir.",
        explain:
          "Etkin değerler toplanmaz, fazörler toplanır. V<sub>L</sub> ile V<sub>C</sub> zıt yönlüdür, farkları 5.84 V'tur ve V<sub>R</sub>'ye dik eklenir: √(3.985² + 5.84²) ≈ 7.07 V. Anlık değerler ise her an tam toplanır; Kirchhoff bozulmaz. Rezonansta V<sub>L</sub> ile V<sub>C</sub> birbirini tam siler, kaynak yalnızca direnci besler; büyük gerilimler bobinle kondansatör arasında gidip gelen enerjinin izidir.",
      },
      {
        title: "Rezonansın öbür yakası",
        predict:
          "400 Hz'de akım gerilimden önce tepe yapıyordu, rezonansta ikisi aynı anda. Frekansı rezonansın üstüne, 1 kHz'e çıkarırsan faz açısının işareti ne olur? Akımla gerilimin tepeleri arasındaki süre Δt uzar mı, kısalır mı?",
        do: "Rezonanstan başla. <strong>Frekans f</strong> kaydırıcısını okuma tam 1.000 kHz olana dek sağa kaydır (son adımları ok tuşlarıyla at) ve kararlı durumu bekle. Faz kartını, Δt etiketini ve fazör diyagramını 400 Hz'deki okumalarınla karşılaştır.",
        observe:
          "1 kHz'de X<sub>L</sub> = 62.83 Ω, X<sub>C</sub> = 15.92 Ω, Z = 47.97 Ω, φ = 77.97° ve 'akım geride (indüktif)'; grafikte 'akım geride: Δt = 217 µs', I<sub>rms</sub> = 147.4 mA. 400 Hz'de X<sub>L</sub> = 25.13 Ω, X<sub>C</sub> = 39.79 Ω idi: fazör diyagramında V<sub>L</sub> ile V<sub>C</sub>'nin boyları yer değiştirir ve kesikli V<sub>L</sub> + V<sub>C</sub> çizgisi artık bobin fazörüyle aynı yönü gösterir.",
        explain:
          "X<sub>L</sub> frekansla büyür, X<sub>C</sub> küçülür; f₀'ın altında kondansatör, üstünde bobin baskındır ve φ'nin işareti X<sub>L</sub> − X<sub>C</sub>'nin işaretidir. Açıyı zamana çevirmek için periyodun o kesrini al, Δt = (|φ|/360°)·T: 400 Hz'de (55.69/360) × 2.5 ms ≈ 387 µs, 1 kHz'de (77.97/360) × 1 ms ≈ 217 µs. Açı büyüdü ama periyot daha çok kısaldığı için Δt küçüldü.",
      },
      {
        title: "Dar bant, uzun çınlama",
        predict:
          "Rezonanstayken direnci 10 Ω'dan 1 Ω'a indirirsen rezonans eğrisi, kondansatör gerilimi ve devrenin oturma süresi nasıl değişir? 100 Ω'da ne olur?",
        do: "<strong>Rezonansa git</strong>'e bas, Gösterim hızını 64× yap ve <strong>Direnç R</strong>'yi en sola, 1 Ω'a çek; R değişse de frekans f₀'da kalır. Zaman grafiğini ve rezonans eğrisini izle, Q, Δf ve τ kartlarını oku, kararlı durumu bekle. Sonra R'yi 100 Ω yap; yolda 56 Ω ve 68 Ω'da τ kartının etiketine de bak.",
        observe:
          "1 Ω'da Q = 31.6, Δf = 15.92 Hz, τ = 20.0 ms: eğri iğne gibi sivrilir; akım ve v<sub>C</sub> periyot periyot büyür, kararlı durum 64×'te yaklaşık 3 s sonra gelir. Sonunda I<sub>rms</sub> = 7.071 A, V<sub>C</sub> = 223.6 V; grafikte v<sub>C</sub> ±316 V salınır, kaynak ±10 V. 100 Ω'da Q = 0.316, Δf = 1.592 kHz, V<sub>C</sub> = 2.236 V ve τ kartı 'aşırı sönüm, yavaş kök' der: 887 µs.",
        explain:
          "Q = √(L/C)/R ve Δf = R/(2πL): direnç küçüldükçe tepe daralır ve yükselir. Aynı direnç geçici terimi de yönetir, τ = 2L/R; çınlayan devrede Δf·τ = 1/π sabittir. Enerji her periyotta biraz birikir, kayıp kazanca eşitlenene dek. R, 2√(L/C) = 63.2 Ω'u aşınca (Q < ½) devre salınmadan oturur: τ kartı 56 Ω'da hâlâ 'τ = 2L/R (zarf)', 68 Ω'da 'aşırı sönüm, yavaş kök' der.",
      },
      {
        title: "Watt mı, voltamper mi?",
        predict:
          "Devreyi RC yapıp frekansı en düşüğe, 10 Hz'e indirirsen 10 Ω'luk direnç ne kadar güç harcar? Kondansatör alternatif akımı engeller mi? 100 kHz'de ne değişir?",
        do: "R'yi yeniden 10 Ω yap, <strong>Devre</strong> menüsünden RC'yi seç ve Frekans f kaydırıcısını en sola çek (10.00 Hz). Güç çarpanı ve Görünür güç kartlarını, tablodaki Güç P satırını oku. Sonra kaydırıcıyı en sağa (100.0 kHz) götür, Gösterim hızını 256× yap ve kararlı durumu bekle; 1×'te bu bekleme bir buçuk dakikayı bulurdu.",
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
        "Türkiye'nin şebekesi Eylül 2010'dan beri kıta Avrupası'nın senkron şebekesine bağlı: Portekiz'den Türkiye'ye santrallerin jeneratörleri aynı 50 Hz ritmine kilitlidir. Bazı fırın saatleri, radyolu saatler ve ısıtma zamanlayıcıları zamanı bu ritimden sayar. 2018'in Ocak ortasından itibaren Kosova–Sırbistan anlaşmazlığı yüzünden şebekede enerji açığı birikti; Mart başında açık 113 GWh'e ulaşmış, ortalama frekans 49.996 Hz'e inmiş ve bu saatler altı dakikaya yakın geri kalmıştı. Hesap tutuyor: yüz binde sekizlik fark, 50 günde 346 saniye eder. Geri dönüş de yavaştır: Avrupa'da hedef frekans en çok 0.01 Hz kaydırılır ve bu hızla altı dakikayı geri almak üç hafta sürer.",
    },
    {
      title: "Bir ülke, iki frekans",
      body:
        "Japonya'da Tokyo ve doğusu 50 Hz, Nagoya ve batısı 60 Hz kullanır. Bölünme 1895'te Tokyo için Alman AEG'den, 1896'da Osaka için Amerikan General Electric'ten alınan jeneratörlerle başladı ve 130 yıldır kapanmadı. Farklı frekanstaki iki alternatif akım şebekesi doğrudan birleştirilemez; iki yarıyı bugün yalnızca frekans dönüştürücü istasyonlar bağlar. Elektrik önce doğru akıma çevrilir, sonra öteki frekansta yeniden alternatif akıma.",
    },
    {
      title: "Radyonun ayar düğmesi bir kondansatördür",
      body:
        "Avrupa'da orta dalga yayınları 531 ile 1602 kHz arasında, 9 kHz arayla dizilmiş 120 kanaldadır. En basit alıcıda istasyonu seçen şey bir LC devresidir: ayar düğmesi, değişken bir kondansatörün döner plakalarını sabit plakaların arasına sokar. f₀ = 1/(2π√(LC)) olduğundan üç katlık frekans aralığını (1602/531 ≈ 3.02) taramak için sığayı yaklaşık 9 kat değiştirmek yeter; örneğin 240 µH'lik bir bobinle 41 ile 374 pF arası. 1 MHz civarında yarı güç bandını kanal aralığına, 9 kHz'e daraltmak ise Q = f₀/Δf ≈ 111 ister.",
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
      "Güç: P = I<sub>rms</sub>²·R = (0.07302 A)² × 10.0 Ω = 53.32 mW. Denetim: S = V<sub>rms</sub>I<sub>rms</sub> = 516.3 mVA, cos φ = R/|Z| = 0.1033 ve P = S·cos φ = 53.3 mW. Kaynağın taşıdığı görünür gücün yalnızca onda biri ısıya döner; gerisi her periyotta kondansatöre ve bobine girip geri çıkar.",
      "Rezonans ve sayfada deneme: f₀ = 1/(2π√(0.100 H × 10.0×10⁻⁶ F)) = 1/(2π × 1.00×10⁻³ s) = 159.2 Hz; Q = √(L/C)/R = 100 Ω / 10.0 Ω = 10.0, Δf = f₀/Q = 15.92 Hz, τ = 2L/R = 20.0 ms. Sayfada Devre RLC, R = 10 Ω, L = 100 mH, C = 10 µF, Frekans f okuması tam 100.0 Hz ve Gösterim hızı 16× seç: kararlı durumda tablo yukarıdaki değerleri gösterir (V<sub>R</sub> satırı 730.2 mV). Rezonansa git'e basınca f = 159.2 Hz, I<sub>rms</sub> = 707.1 mA, V<sub>C</sub> = 70.71 V ve büyütme 10.0× olur.",
    ],
    result:
      "|Z| = 96.84 Ω, φ = −84.07° (akım ileride), I<sub>rms</sub> = 73.02 mA, V<sub>C</sub> = 11.62 V, P = 53.32 mW; f₀ = 159.2 Hz, Q = 10.0, τ = 20.0 ms. Rezonansa çıkınca akım yaklaşık on katına (9.7 kat), kondansatör gerilimi kaynağın tam on katına (70.71 V) çıkar.",
  },
  misconceptions: [
    {
      myth: "Seri devrede elemanların etkin gerilimleri toplanınca kaynağın gerilimi bulunur.",
      truth:
        "Anlık değerler her an toplanır (Kirchhoff), etkin değerler toplanmaz; çünkü gerilimler tepeye farklı anlarda ulaşır. Çözümlü örnekteki devrede 0.730 + 4.588 + 11.62 = 16.94 V eder, kaynak ise 7.071 V. Doğru toplama fazörlerledir: V<sub>L</sub> ile V<sub>C</sub> zıt yönlü, V<sub>R</sub> onlara dik; √(0.730² + (4.588 − 11.62)²) ≈ 7.07 V.",
    },
    {
      myth: "Kondansatör alternatif akımı geçirmez.",
      truth:
        "Kondansatör doğru akımı keser. Alternatif akımda plakalar her yarım periyotta bir yönde dolup boşalır ve devrede akım dolaşır; plakaların arasından yük geçmez, devreyi Maxwell'in yer değiştirme akımı tamamlar. Tepkinlik 1/(ωC) frekansla düşer: sayfada RC devresinde 10 Hz'de 1.592 kΩ (4.443 mA), 100 kHz'de 159.2 mΩ (707.0 mA).",
    },
    {
      myth: "Q ne kadar yüksekse devre o kadar iyidir.",
      truth:
        "Q bir kalite notu değil, seçicilik ölçüsüdür. Yüksek Q dar bant ve büyük gerilim büyütmesi demektir; ama aynı zamanda yavaş oturma (Δf·τ = 1/π) ve elemanlara binen yüksek gerilim. Sayfada R = 1 Ω'da 7.071 V'luk kaynakla kondansatörün uçlarında 223.6 V oluşur ve sayfa kararlı durumu ancak 9τ = 180 ms'den sonra ilan eder. Geniş bantlı bir yükselteç ya da ölçü aleti düşük Q ister.",
    },
    {
      myth: "Güç çarpanı düşük bir cihaz az güç çektiği için hatlara da az yük bindirir.",
      truth:
        "Aynı ortalama gücü çeken iki cihazdan güç çarpanı düşük olanı daha büyük akım çeker, çünkü I = P/(V·cos φ); kablolar bu akımın tamamını taşır ve I²R ile ısınır. Sayfada RC devresinde 10 Hz'de kaynak 31.42 mVA taşırken yalnızca 197.4 µW iş görür. Bu yüzden fabrikalar endüktif motorların yanına kondansatör bataryaları koyar: tepkin akımı yerinde dengeleyip cos φ'yi 1'e yaklaştırır, hattan çekilen akımı azaltırlar. Türkiye'de de sanayi aboneleri, çektikleri tepkin enerji belli bir oranı aşarsa ayrıca ücret öder.",
    },
  ],
  glossary: [
    {
      term: "Etkin değer (rms)",
      definition:
        "Aynı dirençte aynı ortalama gücü veren doğru akım ya da gerilim değeri; sinüste tepe değerinin 1/√2 katıdır, bu yüzden 230 V'luk prizin tepe gerilimi yaklaşık 325 V'tur.",
    },
    {
      term: "Tepkinlik (reaktans)",
      definition:
        "Bobin ya da kondansatörün alternatif akıma ohm cinsinden karşı koyuşu, X<sub>L</sub> = ωL ve X<sub>C</sub> = 1/(ωC); direncin aksine enerjiyi harcamaz, depolayıp geri verir.",
    },
    {
      term: "Empedans (Z)",
      definition:
        "Direnç ile tepkinliğin karmaşık toplamı, Z = R + jX; büyüklüğü gerilim ve akım genliklerinin oranını, açısı gerilimin akımdan ne kadar önde olduğunu verir.",
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
        "Ortalama gücün görünür güce oranı, P/S; seri devrede R/|Z|'ye eşittir ve 1'den küçüldükçe akımın daha büyük bir kısmı enerjiyi yalnızca götürüp geri getirir.",
    },
    {
      term: "Geçici rejim",
      definition:
        "Devre çalıştırıldığında ya da bir ayar değiştiğinde kararlı duruma eklenen, devrenin kendi kökleriyle belirlenen ve e<sup>−t/τ</sup> gibi sönen terim; söndükten sonra yalnızca kararlı durum kalır.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede alternatif akım bir formül listesidir; üniversitede bir yöntem. <strong>Fizik II</strong> (Elektrik ve Manyetizma) dersinde seri RLC, Kirchhoff'un ilmek kuralından çıkan L·q″ + R·q′ + q/C = V₀ sin ωt denklemiyle kurulur ve sürülen sönümlü salınıcının elektrikteki ikizi olarak çözülür. <strong>Devre Analizi</strong> derslerinde fazör yöntemi bütün ağlara genellenir: düğüm ve çevre denklemleri karmaşık empedanslarla yazılır, Thévenin eşdeğeri ve karmaşık güç tanımlanır, üç fazlı şebeke hesaplanır. Ardından <strong>Laplace dönüşümü</strong> gelir: jω yerine s = σ + jω yazınca kararlı durum ile geçici rejim tek bir transfer fonksiyonundan okunur. Kondansatör gerilimi için H(s) = 1/(LCs² + RCs + 1); kutupları s = −R/(2L) ± jω<sub>d</sub>, sayfadaki τ = 2L/R ile 497.0 Hz'lik çınlamanın ta kendisidir. Akımın yanıtı 1/Z(s) aynı paydayı taşır; s = jω konunca sayfadaki rezonans eğrisi çıkar.",
      "<strong>Sinyaller ve Sistemler</strong> dersinde aynı devre bir filtredir: çıkışı direnç üzerinden alırsan bant geçiren, kondansatör üzerinden alırsan alçak geçiren olur; sayfanın RL ve RC modlarında gördüğün f<sub>c</sub>, birinci dereceden filtrelerin köşe frekansıdır. Fourier analizi her periyodik sinyali sinüslere ayırdığı için, doğrusal bir devrenin periyodik bir girdiye kararlı durum yanıtı, her bileşen için ayrı yapılmış fazör hesaplarının toplamıdır. <strong>Elektromanyetik Teori</strong> ise modelin sınırını çizer: sayfa devreyi toplu elemanlarla kurar, bu da devrenin dalga boyundan çok küçük olmasını ister. 50 Hz'de dalga boyu 6 000 km, 100 kHz'de 3 km, 1 GHz'de 30 cm'dir; bir cep telefonunun devre kartındaki iletken artık basit bir tel değil, birim uzunluk başına L ve C taşıyan bir <strong>iletim hattıdır</strong> ve Heaviside'ın telgrafçı denklemleriyle çözülür.",
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
        "f₀ dörtte bire iner, Δf yarıya iner",
        "f₀ yarıya iner, Δf değişmez",
        "f₀ yarıya iner, Δf dörtte bire iner",
        "İkisi de değişmez; yalnızca Q artar",
      ],
      answer: 2,
      explanation:
        "f₀ = 1/(2π√(LC)) olduğundan dört kat L, f₀'ı √4 = 2'ye böler. Δf = R/(2πL) ise L ile ters orantılıdır: dörtte bir. Q = f₀/Δf iki katına çıkar; Q = √(L/C)/R de bunu doğrular. Sayfada L'yi 10 mH'den 100 mH'ye çıkar: f₀ 503.3 Hz'den 159.2 Hz'e (√10 kat), Δf 159.2 Hz'den 15.92 Hz'e (10 kat) iner.",
    },
    {
      question:
        "Seri bir RLC devresinde akımın kaynak geriliminden önce tepe yaptığı görülüyor. Aşağıdakilerden hangisi kesinlikle doğrudur?",
      options: [
        "Sürücü frekans rezonans frekansının üstündedir",
        "Sürücü frekans rezonans frekansının altındadır",
        "Devrede bobin yoktur",
        "Direnç çok büyüktür",
      ],
      answer: 1,
      explanation:
        "Akımın önde olması φ < 0 demektir: kondansatörün tepkinliği bobininkinden büyüktür. Bobininki frekansla artar, kondansatörünki azalır ve ikisi yalnızca f₀'da eşitlenir; demek ki sürücü frekans f₀'ın altındadır. Bobin devrede olabilir (sayfanın açılıştaki 400 Hz ayarı gibi), yalnızca kondansatör baskındır. R açının büyüklüğünü değiştirir, işaretini değil.",
    },
    {
      question:
        "230 V etkin gerilimli şebekeden 5.0 A etkin akım çeken bir motorun güç çarpanı 0.80. Motorun yanına bağlanan bir kondansatör bataryası güç çarpanını 1.00'a çıkarıyor; motorun çektiği ortalama güç değişmiyor. Hattan çekilen etkin akım ne olur?",
      options: ["5.0 A", "6.25 A", "3.2 A", "4.0 A"],
      answer: 3,
      explanation:
        "Önce ortalama gücü bul: P = V·I·cos φ = 230 V × 5.0 A × 0.80 = 920 W. Güç çarpanı 1 olunca görünür güç ortalama güce eşitlenir, S = 920 VA, ve hattaki akım I = S/V = 920 VA / 230 V = 4.0 A olur. Hattaki I²R kaybı (4.0/5.0)² = 0.64 katına, yani %36 azalır. 6.25 A, 5.0'ı 0.80'e bölüp düzeltmeyi ters yöne yapmaktır; 3.2 A, 0.80 ile iki kez çarpmaktır; 5.0 A ise kondansatörün hattaki akımı değiştirmediğini sanmaktır.",
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
      why: "Geçici rejimin kendisi: Sönüm c kaydırıcısını artır, faz düzlemindeki sarmalın salınmadan dengeye çöktüğü eşiği bul (m = 1 için c = 2√k). RLC'de bunun karşılığı R = 2√(L/C), yani Q = ½.",
    },
    {
      href: "yay-kutle.html",
      title: "Yay–Kütle Sistemi",
      why: "Aynı ikinci mertebe denklemin mekanik ikizi: kütle bobinin, yay sabiti 1/C'nin yerini alır. Kütle m ve Yay sabiti k ile ölçtüğün T = 2π√(m/k), buradaki 1/f₀ = 2π√(LC)'nin karşılığıdır.",
    },
    {
      href: "elektrik-muhendisligi.html",
      title: "Elektrik Mühendisliği",
      why: "Hikâyenin bugünü: santralden çıkan elektriğin 154–380 kV iletim hatlarından prize uzanan yolculuğu, transformatörler ve motorlar. I²R kaybına karşı gerilimi yükseltme fikri orada iş başında.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 2, 15.5 Resonance in an AC Circuit",
      url: "https://openstax.org/books/university-physics-volume-2/pages/15-5-resonance-in-an-ac-circuit",
      note: "Rezonans frekansı, Q ve yarı güç bant genişliği; sürülen RLC devresinin sürülen sönümlü salınıcının elektrikteki karşılığı olduğu ve radyo ayarı, çözümlü örneklerle (İngilizce, açık ders kitabı).",
    },
    {
      title: "The Feynman Lectures on Physics · Vol. I, Ch. 23: Resonance",
      url: "https://www.feynmanlectures.caltech.edu/I_23.html",
      note: "Karmaşık sayılarla sürülen sönümlü salınıcı, elektrik rezonansı, Q = ω₀L/R ve mühendislerin neden i yerine j yazdığı (İngilizce, çevrimiçi ücretsiz).",
    },
    {
      title: "HyperPhysics · RLC Series Circuit",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/electric/rlcser.html",
      note: "Seri RLC empedansı ve faz açısı için etkileşimli hesaplayıcı; sayfadaki bileşen değerlerini girip kuram sütununu denetle (İngilizce).",
    },
    {
      title: "Wikipedia · War of the currents",
      url: "https://en.wikipedia.org/wiki/War_of_the_currents",
      note: "Edison, Westinghouse, Tesla ve Brown; Great Barrington, elektrikli sandalye, 1892 birleşmesi, Chicago fuarı ve Niagara, kaynaklarıyla (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
