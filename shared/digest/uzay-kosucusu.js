window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["uzay-kosucusu"] = {
  slug: "uzay-kosucusu",
  title: "Uzay Koşucusu: Tek Tuşla Yerçekimi",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 25,
  tagline:
    "Tek bir tuş, sabit bir yerçekimi ve saniyede altmış kez dönen bir döngü. Zıplayan geminin arkasında atış hareketinin matematiği, paralaks yıldızlar ve kronometre kılığında bir mesafe sayacı var.",
  hook:
    "Gemi her zıplayışta aynı yüksekliğe çıkar ve tam 35 adımda yere iner; oyun ne kadar hızlanırsa hızlansın havada kalış süresi bir adım bile değişmez. Öyleyse en büyük asteroidin üstünden tek zıplamayla geçmek neden oyunun en yavaş anında, ilk saniyelerde en zordur ve mavi kuyruklu yıldız yerde duran gemiye neden hiç çarpamaz?",
  bigIdea:
    "Sonsuz koşuda gemi değil dünya hareket eder: yatay hız oyunun saatidir, dikey hareket ise her adımda <em>v ← v + g, y ← y + v</em> ile hesaplanan bir atış hareketidir ve ikisi birbirinden bağımsızdır.",
  story: [
    "Kendiliğinden kayan bir dünyada engel atlama fikri 1980'lerin başında salon makinelerine girdi. Japon şirketi Irem'in 1982'de çıkardığı <strong>Moon Patrol</strong>'da bir ay aracı durmadan ilerler, kraterlerin üstünden zıplar ve tepeden gelen uçan dairelere ateş eder. Oyun başka bir yenilikle de anılır: arkadaki dağlar ve şehir silüeti üç ayrı katmanda, farklı hızlarda kayar. Derinlik duygusu veren bu <strong>paralaks</strong> tekniğinin sınırlı bir biçimi bir yıl önce Jump Bug'da görülmüştü; tam hâlini yan kaydırmalı oyunlara getiren oyun olarak çoğunlukla Moon Patrol gösterilir. Bu sayfadaki yıldızlar da üç katmanda, oyun hızının 0.3, 0.65 ve 1.0 katıyla akar; kırk yıllık numara hâlâ iş görüyor.",
    "Türün bugünkü kalıbı çok sonra geldi. Eylül 2009'da Adam Saltsman, deneysel oyunlar üreten bir topluluk projesi için <strong>Canabalt</strong>'ı yaptı: çatıdan çatıya koşan bir adam, giderek artan hız, tek bir tuş. Oyuncu yalnızca ne zaman zıplayacağına karar verir; hız, yön ve engeller oyunundur. Tarayıcıda doğan oyun haftalar içinde telefona taşındı ve 'tek tuşlu sonsuz koşu' dokunmatik ekrana tam oturdu: Temple Run (2011), Jetpack Joyride (2011) ve Subway Surfers (2012) milyonlarca kişiye aynı şeyi yaptırdı, parmağını doğru anda oynatmayı.",
    "2014'te tek tuşlu oyun iki kez daha gündeme oturdu. Vietnamlı geliştirici Dong Nguyen'in bir yıl önce sessizce çıkardığı <strong>Flappy Bird</strong>, her dokunuşta kuşa yukarı hız veren, yerçekimine bırakıp boru aralıklarından geçiren acımasız bir oyundu. Ocak 2014 sonunda App Store'un en çok indirilen ücretsiz oyunuydu; geliştiricisi günde 50 bin dolar kazandırdığını söyledi ve 10 Şubat 2014'te, bağımlılık yarattığı için vicdan azabı duyduğunu belirterek oyunu mağazalardan kaldırdı. Aynı yılın eylül ayında Google'dan Sebastien Gabriel, Alan Bettes ve Edward Jung, Chrome'un 'internet yok' sayfasına küçük bir dinozor yerleştirdi; boşluk tuşuna basınca kaktüslerin üstünden atlamaya başlıyordu.",
    "Bu sayfadaki oyun o soydan gelir: bir gemi, bir tuş, saniyede 60 kez dönen bir döngü. Her adımda gemiye yerçekimi eklenir, engeller sola kayar, kutuların kesişip kesişmediğine bakılır ve ekran yeniden çizilir. Döngünün fizik kısmı iki satırdır; aşağıdaki sayıların hepsi o iki satırdan ve birkaç rastgele zardan çıkar.",
  ],
  core: [
    {
      heading: "Dünya kayar, gemi yerinde durur",
      body:
        "Gemi hiç ilerlemez; x koordinatı 120 pikselde sabittir. İlerleme hissini engellerin, yıldızların ve zemin çizgilerinin her adımda <strong>oyun hızı</strong> kadar sola kayması verir. Fizikçi buna referans çerçevesi seçimi der: zemine bağlı gözlemciye göre gemi sağa koşar, gemiye bağlı gözlemciye göre zemin sola kayar ve iki anlatım aynı fiziği verir. Kod ikincisini seçmiştir, çünkü gemiyi ekranda tutmanın en ucuz yolu budur. Hız mesafeyle doğrusal büyür: oyun 5 piksel/adımla başlar, her 60 metrede 1 piksel/adım artar ve 600 metrede 15'e ulaşıp orada kilitlenir. Saniyede 60 adım olduğundan 5 piksel/adım 300 piksel/saniye, 15 piksel/adım 900 piksel/saniye demektir: 900 piksel genişliğindeki sahne her saniye baştan sona bir kez akar.",
      formula: "v = 5 + m/60 (piksel/adım), en çok 15",
      formulaNote: "m, göstergedeki 📏 mesafe değeridir. 300 m'de hız 10, 600 m'de 15'tir; ⚡ Hız etkinken buna 3 eklenir (tavan 18).",
    },
    {
      heading: "Zıplama: her adımda iki satır",
      body:
        "Tuşa basınca geminin dikey hızı −13.5 piksel/adım olur (ekranda y aşağı doğru büyür; eksi, yukarı demektir). Sonra her adımda kod iki şey yapar: önce hıza yerçekimini ekler, v ← v + 0.75; sonra konumu o yeni hızla günceller, y ← y + v. n adım sonraki yükseklik bir aritmetik dizinin toplamıdır: h<sub>n</sub> = v₀·n − g·n(n + 1)/2. Hız n = v₀/g = 18. adımda sıfırlanır; tepe yüksekliği v₀²/2g − v₀/2 = 121.5 − 6.75 = 114.75 pikseldir, geminin 38 piksellik boyunun üç katı. Toplam 2v₀/g − 1 = 35. adımda sıfıra döner: 0.58 saniye. Sürekli zamanın ders kitabı formülleri v₀²/2g = 121.5 piksel ve 2v₀/g = 36 adım verir. Aradaki fark, hızın konumdan önce güncellenmesinden gelir ve adım küçüldükçe küçülür: zaman adımı Δt iken eksik yükseklik v₀·Δt/2'dir.",
      formula: "v<sub>n+1</sub> = v<sub>n</sub> + g,  y<sub>n+1</sub> = y<sub>n</sub> + v<sub>n+1</sub>  ⇒  h<sub>tepe</sub> = v₀²/2g − v₀/2",
      formulaNote: "g = 0.75 piksel/adım², v₀ = 13.5 piksel/adım. Bu güncelleme sırasına 'yarı örtük Euler' denir.",
    },
    {
      heading: "Yatay ve dikey birbirini görmez",
      body:
        "Zıplama denkleminde oyun hızı hiç geçmez. Havada kalış bu yüzden hep 35 adımdır; oyun ister 5 ister 15 piksel/adımla aksın. Değişen, o 35 adımda geminin altından kaç piksel geçtiğidir: hız 5'te 175 piksel, 10'da 350, 15'te 525. Zemine bağlı çerçeveden bakınca gemi bir <strong>parabol</strong> çizer; yatayda sabit hız, düşeyde sabit ivme. Aynı yükseklikteki kemer hız arttıkça yayvanlaşır; gemi daha hızlı düşüyormuş gibi görünür ama düşmez. Buna hareket bileşenlerinin bağımsızlığı denir: yatay fırlatılan top, aynı anda bırakılan topla birlikte yere varır. Bağımsızlığın şaşırtıcı bir sonucu var. 80 piksellik en yüksek asteroidin üstünde kalabildiğin süre hep 20 adımdır; asteroidin altından geçmesi ise hız 5'te 19, hız 15'te 7 adım sürer. Aradaki fark senin payındır: başta iki üç adım, sonda on dört on beş.",
      formula: "Δx = v·35 adım;   zamanlama payı ≈ 21 − (w + 34)/v adım",
      formulaNote: "w asteroidin genişliği (en çok 58), 34 geminin çarpışma kutusunun genişliği; 21, uçları da sayılan 20 güvenli adımdan gelir. Parabol: h(x) = (v₀/v)·x − (g/2v²)·x².",
    },
    {
      heading: "Çarpışma: kutular ve çemberler",
      body:
        "Gemi 46×38 piksel çizilir ama çarpışma için içine 34×30'luk daha küçük bir kutu konur; kanat ucunun sürtmesi hasar sayılmaz. Asteroit, kristal ve lazer için kod iki dikdörtgenin kesişip kesişmediğine bakar: biri ötekinin tamamen solunda, sağında, üstünde ya da altında değilse çarpışmışlardır. Buna <strong>eksenlere hizalı sınır kutusu</strong> testi denir ve dört karşılaştırmadan ibarettir. Yıldızlar ve güçlendirmeler için merkezler arası uzaklık ölçülür: 23 + 8 = 31 pikselden yakınsa yıldız alınır, 23 + 14 = 37 pikselden yakınsa güçlendirme. Geometri bazı sonuçları baştan belirler. Yerdeki geminin merkezi en alçak yıldızın 71 piksel altındadır: zıplamadan tek yıldız toplayamazsın. Kristal kapının alt parçasının tepesi zeminden en az 151 piksel yukarıdadır; boşluğa girmek 147 pikselden fazla yükselmeyi, yani en az iki zıplamayı gerektirir.",
      formula: "Kutu: A.x < B.x+B.w ∧ A.x+A.w > B.x ∧ A.y < B.y+B.h ∧ A.y+A.h > B.y",
      formulaNote: "Çember: √(dx² + dy²) < r₁ + r₂. Dört koşuldan biri bile yanlışsa kutular kesişmez.",
    },
    {
      heading: "Zar ve zorluk eğrisi",
      body:
        "Engeller bir sayaçla doğar: sayaç başta 75 adımda bir dolar ve yüzde 80 olasılıkla bir engel üretilir. Aralık mesafeyle kısalır, 376 metrede 28 adıma iner ve orada kalır. Tür de zarla seçilir: yüzde 35 asteroit, yüzde 25 kristal kapı, yüzde 20 kuyruklu yıldız, yüzde 20 üçlü lazer. Yıldızlar ortalama saniyede 0.8'e yakın sıklıkla, güçlendirmeler her 5 saniyede bir yazı turayla gelir. Hız ile aralığın çarpımı ilginçtir: (75 − m/8)·(5 + m/60) pikseldir ve bütün oyun boyunca 315 ile 422 arasında kalır. Demek ki zorlaşan şey engellerin ekrandaki sıklığı değil, aynı boşluğu geçmek için sana kalan süredir: 1.25 saniyeden 0.47 saniyeye. Çarpımın türevi 0.625 − m/240'tır; boşluk 150 metrede en geniş hâline ulaşır, sonra daralır; 376 metreden sonra aralık sabitlenince yeniden açılır.",
      formula: "aralık = max(28, 75 − m/8) adım",
      formulaNote: "m metre cinsinden mesafe. 28 adım 0.47 saniyedir; tipik bir görsel tepki süresinin kabaca iki katı.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı yok, tek bir eylem var: oyun alanına <strong>tıklamak ya da dokunmak</strong>, <strong>Space</strong>, <strong>↑</strong> ya da <strong>W</strong> gemiyi zıplatır; ilk basış oyunu da başlatır. Üstteki gösterge beş sayı taşır: ⭐ skor, 🏆 rekor, 📏 mesafe (m), yıldız topladıkça beliren 🔥 kombo çarpanı ve ❤️ canlar. Etkin güçlendirme (Kalkan, Mıknatıs, Hız) sahnenin üstünde sarı bir rozetle yazılır ve 5 saniye sürer. Üç can bitince 'Görev Başarısız' ekranı skoru ve mesafeyi gösterir; yarım saniye kadar sonra tıklama, Space ya da Enter yeni oyunu başlatır. Deneyler için telefonundaki kronometre ve dikkatli bir göz yeter.",
    experiments: [
      {
        title: "Mesafe sayacı aslında bir kronometre",
        predict:
          "Oyun hızlandıkça 📏 mesafe daha hızlı artar mı? Hiç yıldız toplamazsan skorla mesafe arasında nasıl bir ilişki olur?",
        do: "Kronometreyi oyunu başlattığın anda çalıştır. 10. ve 20. saniyede mesafeyi oku. Sonra yıldızlara ve ⚡ rozetine dokunmadan bir süre koş, skorla mesafeyi karşılaştır; ölürsen de olur, bitiş ekranı ikisini birden yazar.",
        observe:
          "10 saniyede 60 m, 20 saniyede 120 m: ekran gittikçe hızlı aksa da sayaç saniyede hep 6 m yazar. Yıldız ve ⚡ alınmadıysa skor her an mesafenin 10 katıdır: 30 saniyede 180 m ve 1800 puan.",
        explain:
          "Kod her adımda mesafeyi ve skoru 1 artırır, ekrana mesafenin onda birini yazar. Saniyede 60 adım olduğundan buradaki 'metre' 1/6 saniyelik bir zaman birimidir. Dünyanın gerçekten kaydığı piksel yolu ise hızın toplamıdır: 600 m yazdığında (100. saniye) yaklaşık 60 bin piksel, yani 67 ekran genişliği akmıştır. Sayaç hızın değil, zamanın integralini tutar.",
      },
      {
        title: "Üç zıplama, bir tavan ve kristal kapı",
        predict:
          "Yere değmeden kaç kez zıplayabilirsin? Tek zıplamada gemi kendi boyunun kaç katı yükselir? Mor kristal kapının boşluğundan tek zıplamayla geçilebilir mi?",
        do: "Engelsiz bir anda bir kez bas ve inişi izle. Sonra art arda dört kez bas. Ardından her tepe noktasında bir kez olmak üzere üç basış dene. Son olarak bir kristal kapıya tek zıplamayla, bir sonrakine iki zıplamayla gir.",
        observe:
          "Tek zıplama 0.6 saniyeye yakın sürer ve gemiyi boyunun üç katı kadar yükseltir. Dördüncü basış hiçbir şey yapmaz; yere inince hak yenilenir. Tepe noktalarında üç basış gemiyi sahnenin üst kenarından 64 piksel aşağıya kadar taşır. Kristal kapıda tek zıplama her seferinde alt kristale çarpar.",
        explain:
          "Kod yere inişte zıplama hakkını 3'e kurar: yerden bir, havada iki. Her basış dikey hızı o anki değere bakmadan −13.5'e eşitler; tepe noktasında basarsan 114.75 piksel daha kazanırsın, üçü 344 piksel eder. Kapının boşluğu en alçak hâlinde bile 147 pikselden fazla yükselmeyi ister; tek zıplama 114.75'te kalır. En yüksek kapılar 229.5 pikseli, yani üçüncü zıplamayı da gerektirir.",
      },
      {
        title: "Yerde kalmak ne zaman en iyi savunmadır?",
        predict:
          "Aşağı yukarı sekerek gelen mavi kuyruklu yıldız yerde duran gemiye çarpabilir mi? Üç kırmızı lazerden hangisi yerdeki gemiyi vurabilir ve o zaman tek zıplama kurtarır mı?",
        do: "Kuyruklu yıldız göründüğünde zıplama, geçmesini bekle. Üçlü lazer geldiğinde üçüncü lazerin alt ucuna bak: zemin çizgisine değmiyorsa yerde kal. Değiyorsa bir kez tek zıplamayı, başka bir kapıda tepe noktalarında basılmış iki–üç zıplamayla üçünün de üstünden aşmayı dene.",
        observe:
          "Kuyruklu yıldız yerdeki gemiye hiç değmez. İlk lazer hiçbir zaman, ikincisi binde üç gibi bir olasılıkla zemine yaklaşır; üçüncüsü kabaca her beş kapıdan birinde yere kadar iner. O durumda tek zıplama kurtarmaz; üç lazerin de üstünden geçmek gerekir.",
        explain:
          "Kuyruklu yıldızın kutusunun altı en fazla 387.5 piksele iner; yerdeki geminin kutusu 412'de başlar. Lazerlerin üstü 206–326, boyu 70–120 pikseldir; üçüncüsünün alt ucunun 412'yi geçme olasılığı hesapla yüzde 19'dur. Lazerler 50 piksel arayla, geminin kutusu 34 piksel: araya girip yükselecek yer yoktur. Hepsinin üstünden aşmak en az 203 piksel yükselmek demektir; oyunun başındaki düşük hızlarda üç zıplamanın üçü de gerekir.",
      },
      {
        title: "Kombo, mıknatıs ve ⚡ Hız",
        predict:
          "🔥 x2 kaçıncı yıldızda yanar? Mıknatıs geride kalan bir yıldızı geri çekebilir mi? ⚡ Hız rozeti yanarken mesafe sayacı mı hızlanır, skor mu?",
        do: "Art arda yıldız toplayıp 🔥 göstergesini izle; sonra iki saniye hiç yıldız alma. 🧲 aldığında bir yıldızın altından bilerek geç. ⚡ aldığında 5 saniye boyunca zemin çizgilerinin akışına, mesafeye ve skora ayrı ayrı bak.",
        observe:
          "🔥 x2, aralarında 1.5 saniyeden az boşluk bırakılan 5. yıldızda yanar, x3 10. yıldızda; en çok x8. İki saniyelik boşlukta çarpan 1'e döner. Mıknatıs 200 piksel içindeki yıldızı çeker, ama 60 m'den sonra arkada kalmış yıldızı geri getiremez. ⚡ Hız'da dünya gözle görülür biçimde hızlanır ve skor iki kat hızlı artar; mesafe yine saniyede 6 m yazar.",
        explain:
          "Çarpan 1 + ⌊sayaç/5⌋'tir (en çok 8); sayaç 90 adım (1.5 s) yıldız gelmezse sıfırlanır ve her yıldız 10 × çarpan puan verir. Mıknatıs yıldızı adımda 6 piksel çeker, dünya ise oyun hızı kadar kayar: hız 6'yı geçince geride kalan yıldız net olarak uzaklaşır. ⚡ Hız 300 adım boyunca oyun hızına 3 piksel/adım ekler ve adım başına 2 puan yazdırır: aynı sürede daha çok engel, karşılığında 300 fazladan puan.",
      },
    ],
  },
  wow: [
    {
      title: "Paralaks ay yüzeyinde olgunlaştı",
      body:
        "Irem'in 1982 tarihli Moon Patrol'unda arkadaki dağlar yavaş, öndeki yol hızlı kayar; göz bunu derinlik olarak okur. Oyunun üç ayrı arka plan katmanı vardı ve yan kaydırmalı oyunlara tam paralaksı getiren oyun olarak anılır. Bugün hemen her yan kaydırmalı oyunun, bu sayfadaki üç katmanlı yıldız alanı dahil, standart parçasıdır. Aynı hile gökbilimde ölçüm aracıdır: Dünya yörüngesinde yer değiştirdikçe yakın yıldızlar uzak yıldızların önünde kayar ve kayma açısı uzaklığı verir.",
    },
    {
      title: "İnternet yokken oynanan oyun",
      body:
        "Chrome'un çevrimdışı sayfasındaki dinozor Eylül 2014'te eklendi. Chrome'un arayüz ekibinden üç tasarımcı projeye, T. Rex grubunun solisti Marc Bolan'a gönderme olarak 'Project Bolan' kod adını verdi; karakterin adı 'Yalnız T-Rex'ti. Yapımcıları 2018'de oyunun ayda yaklaşık 270 milyon kez oynandığını söyledi. Bağlantı kopunca ortaya çıkan bir oyun, tarayıcının ağ olmadan da bir şeyler çalıştırabildiğinin en sevimli kanıtı oldu.",
    },
    {
      title: "Yerçekimi Dünya'nınkiyse gemi 17 santimetre",
      body:
        "Oyunun yerçekimi 0.75 piksel/adım², saniyede 60 adımla 2700 piksel/s² eder. Bunu 9.81 m/s²'ye eşitlersen bir piksel 3.63 mm olur: 46 piksellik gemi 16.7 cm'lik bir oyuncaktır, zıplaması 41.7 cm yükselir ve yatay hızı 1.09 m/s'den (yürüyüş) 3.27 m/s'ye (hafif koşu) çıkar. Ölçeği ters kur, gemiyi 10 metre say: o zaman yerçekimi 587 m/s², Dünya'nınkinin 60 katıdır. Oyunlardaki zıplamalar bu yüzden hem 'ağır' hem çevik hissettirir; tasarımcılar g'yi fiziğe göre değil, parmağın ritmine göre seçer.",
    },
  ],
  worked: {
    title: "En büyük asteroit için zamanlama payı",
    prompt:
      "Oyun hızı 10 piksel/adım. Karşıdan 58 piksel genişliğinde, 80 piksel yüksekliğinde bir asteroit geliyor (en büyüğü). Geminin çarpışma kutusu 34 piksel genişliğindedir ve alt kenarı çizilen geminin 4 piksel içindedir. v₀ = 13.5 piksel/adım, g = 0.75 piksel/adım². Tek zıplamayla aşmak için tuşa basabileceğin an aralığı kaç adımdır? Aynı hesabı hız 5 ve 15 için yinele.",
    steps: [
      "Gereken yükseklik: kutunun altı asteroidin tepesinin üstünde olmalı. Kutu 4 piksel içeride olduğundan 80 − 4 = 76 piksel yükselmek yeter.",
      "Sürekli modelle 76 pikselin üstünde geçen süre: h(t) = v₀t − ½gt² = 76 denkleminin iki kökü arası Δt = 2√(v₀² − 2g·76)/g = 2√(182.25 − 114)/0.75 ≈ 22.0 adım.",
      "Kodun adım adım hesabıyla: h<sub>n</sub> = 13.5n − 0.375n(n + 1). n = 7'de 73.5 (yetmez), n = 8'de 81; simetriyle n = 27'de yine 81. Güvenli adımlar 8'den 27'ye: 20 adım. Sürekli modelin 22'sinden iki adım kısa.",
      "Örtüşme süresi: asteroit ile kutunun yatayda üst üste bindiği yol 58 + 34 = 92 pikseldir; hız 10'da 9.2, yani adımların denk gelişine göre 9 ya da 10 adım sürer.",
      "Pay: 10 adımlık örtüşmeyi 20 güvenli adımın içine 20 − 10 + 1 = 11 farklı biçimde yerleştirebilirsin. Basış aralığı 11–12 adım, yani yaklaşık 0.2 saniye ya da 118 piksellik bir yaklaşma mesafesidir.",
      "Hız 5'te örtüşme 92/5 ≈ 19 adım sürer: pay 2–3 adım, 43 milisaniye; insan tepki süresinin çok altında. Hız 15'te örtüşme 6–7 adım: pay 14–15 adım, 0.25 saniye.",
    ],
    result:
      "Hız 10'da yaklaşık 12 adımlık (0.2 s) bir basış aralığı vardır; hız 5'te 3 adım (43 ms), hız 15'te 15 adım (0.25 s). Havada kalış süresi hızdan bağımsız olduğu için yavaş dünya, büyük asteroidi tek zıplama için daha dar bir hedefe çevirir; oyunun başında ikinci zıplama süs değil, zorunluluktur.",
  },
  misconceptions: [
    {
      myth: "Tepe noktasında gemi bir an durur, demek ki orada yerçekimi de sıfırdır.",
      truth:
        "Sıfır olan hızdır, ivme değil. Kodda v ← v + 0.75 satırı tepe noktası dahil her adımda çalışır; hız −0.75'ten 0'a, sonra +0.75'e geçer. Yerçekimi bir an bile kesilseydi gemi tepe noktasında asılı kalırdı. Havaya atılan gerçek bir topta da böyledir: tepe noktasında ivme hâlâ g'dir.",
    },
    {
      myth: "Oyun hızlanınca gemi daha hızlı düşer.",
      truth:
        "Düşüş hep aynıdır: 35 adım, 114.75 piksel. Hızlanan dünyadır; aynı 35 adımda geminin altından 175 yerine 525 piksel geçer ve kemer yayvan görünür. Yatay ve düşey hareket birbirinden bağımsızdır; yatay atılan topla bırakılan topun aynı anda yere varması bunun sınıftaki gösterimidir.",
    },
    {
      myth: "📏 mesafe, geminin kat ettiği yolu ölçer.",
      truth:
        "Sayaç zamanı ölçer: her adım 1 birim, ekranda 10 birim 1 'metre' eder; hız ne olursa olsun saniyede 6 m. Dünyanın kaydığı gerçek piksel yolu hızla birlikte büyür; 600 m yazdığında yaklaşık 60 bin piksel akmıştır. Yol, hızın zamana göre toplamıdır; sayaç ise yalnızca adımları sayar.",
    },
    {
      myth: "Oyun hızlandıkça her engel zorlaşır.",
      truth:
        "Tepki için kalan süre kısalır, doğru: engel aralığı 1.25 saniyeden 0.47 saniyeye iner. Ama tek zıplamayla asteroit aşmanın zamanlama payı tersine genişler, çünkü asteroit altından daha çabuk geçer: en büyüğü için hız 5'te 3 adım, hız 15'te 15 adım. Zorluk tek bir sayı değildir; hangi hatanın cezalandırıldığı hızla birlikte değişir.",
    },
  ],
  glossary: [
    { term: "Sabit zaman adımı", definition: "Fiziğin hep aynı süreyle ilerletilmesi; burada 1/60 saniye, ekran tazelemesi gecikirse biriktirici eksik adımları sonradan tamamlar." },
    { term: "Yarı örtük Euler", definition: "Önce hızı, sonra o yeni hızla konumu güncelleyen sayısal adım; hatası zaman adımıyla orantılıdır, zıplamada 6.75 piksellik eksik yükseklik olarak görünür." },
    { term: "Atış hareketi", definition: "Yatayda sabit hız, düşeyde sabit ivmeyle yapılan hareket; yolu bir paraboldür ve iki bileşen birbirinden bağımsızdır." },
    { term: "Paralaks", definition: "Yakın cisimlerin uzak cisimlerden daha hızlı kayıyor görünmesi; üç yıldız katmanı 0.3, 0.65 ve 1.0 hız oranıyla derinlik yaratır." },
    { term: "Eksenlere hizalı sınır kutusu", definition: "Kenarları eksenlere paralel dikdörtgen; iki kutunun kesişip kesişmediği dört karşılaştırmayla anlaşılır." },
    { term: "Çarpışma kutusu", definition: "Çizilen şekilden küçük tutulan görünmez kutu; gemide 46×38 yerine 34×30, böylece kanat ucunun sürtmesi affedilir." },
    { term: "Yenilmezlik süresi", definition: "Hasardan sonra 90 adım (1.5 s), kalkan kırılınca 60 adım (1 s) boyunca çarpışmaların sayılmaması; gemi bu sırada yanıp söner." },
    { term: "Kombo çarpanı", definition: "Art arda alınan yıldız sayısının beşe bölümüyle büyüyen puan katsayısı; 1.5 saniyelik boşlukta sıfırlanır, en çok 8." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Fizik I'in kinematik bölümü bu sayfadaki iki satırın sürekli hâlidir: sabit ivmede v = v₀ − gt, y = v₀t − ½gt² ve iki boyutta bileşenlerin bağımsızlığı. Kodun yaptığı ise aynı diferansiyel denklemi, dy/dt = v ve dv/dt = −g'yi, küçük adımlarla çözmektir; Sayısal Analiz dersinde bunun adı <strong>sayısal integrasyon</strong>dur. Sürekli formülün 121.5 pikseli ile kodun 114.75 pikseli arasındaki fark, ayrıklaştırma hatasının elle hesaplanabilen bir örneğidir: v₀·Δt/2, yani adımın birinci kuvvetiyle orantılı. Euler, yarı örtük Euler, Verlet ve Runge–Kutta yöntemleri bu hatayı küçültmenin yollarıdır; gezegen yörüngesi de molekül benzetimi de aynı seçimi yapar. Çarpışma tarafında 'tünelleme' sorusu bekler: bir adımda 15–18 piksel kayan dünya, 8 piksel genişliğindeki lazeri atlayabilir mi? Geminin kutusu 34 piksel olduğu için burada hayır; hızlı mermilerde ise yol boyunca süpürülmüş hacimlerle test gerekir.",
      "İkinci köprü olasılık ve yapay zekâya gider. Engel türleri ve aralıkları rastgele değişkenlerdir; üçüncü lazerin yere inme olasılığını (yüzde 19) iki düzgün dağılımın toplamı üzerinden bir alan hesabıyla bulursun, Olasılık dersinin ilk ödevlerinden biri gibi. Tasarım tarafında, 28 adımlık en kısa doğma aralığı 0.47 saniyedir; basit bir görsel uyarana tepki süresi ise saniyenin kabaca beşte biri ile dörtte biri arasındadır. Bir bilgisayara bu oyunu öğretmek istersen durumu birkaç sayıyla özetlersin: geminin yüksekliği, dikey hızı, kalan zıplama hakkı ve bir sonraki engelin uzaklığı ile boyu. <strong>Pekiştirmeli öğrenme</strong> derslerinde Flappy Bird ve dinozor oyunu tam bu yüzden sevilen alıştırmalardır: durum küçük, ödül yalın, fizik iki satır.",
    ],
    topics: ["Fizik I: iki boyutta kinematik ve atış hareketi", "Referans çerçeveleri ve Galileo göreliliği", "Sayısal Analiz: Euler, Verlet, Runge–Kutta", "Oyun döngüsü ve sabit zaman adımı", "Çarpışma tespiti ve tünelleme", "Olasılık: düzgün dağılım ve beklenen değer", "Pekiştirmeli öğrenme"],
  },
  quiz: [
    {
      question: "Zıplama hızı 13.5 piksel/adım, yerçekimi 0.75 piksel/adım². Gemi tepe noktasına kaç adımda ulaşır?",
      options: ["9 adım", "18 adım", "35 adım", "60 adım"],
      answer: 1,
      explanation: "Her adımda hız 0.75 azalır; 13.5 / 0.75 = 18 adımda sıfıra iner. 35 adım yere dönüşün toplam süresidir, 60 ise bir saniyedeki adım sayısı.",
    },
    {
      question: "Yerçekimi iki katına (1.5 piksel/adım²) çıkarılsa ve zıplama hızı aynı kalsa, sürekli modele göre tepe yüksekliği ve havada kalış süresi nasıl değişir?",
      options: ["İkisi de yarıya iner", "Yükseklik dörtte bire, süre yarıya iner", "Yükseklik yarıya iner, süre değişmez", "Yükseklik değişmez, süre yarıya iner"],
      answer: 0,
      explanation: "h = v₀²/2g ve t = 2v₀/g; ikisi de g ile ters orantılıdır, yani ikisi de yarıya iner: 60.75 piksel ve 18 adım. Yüksekliğin dörtte bire inmesi, g sabitken v₀'ın yarıya indirilmesinin sonucudur; çünkü h, v₀'ın karesiyle büyür.",
    },
    {
      question: "Oyun hızı 5'ten 15 piksel/adıma çıktığında tek bir zıplamada ne değişir?",
      options: ["Gemi daha yükseğe çıkar", "Havada kalış süresi kısalır", "Havadayken geminin altından geçen yol üç katına çıkar", "Hiçbir şey değişmez"],
      answer: 2,
      explanation: "Düşey hareket yalnızca v₀ ve g'ye bağlıdır: 35 adım, 114.75 piksel. O 35 adımda dünya 175 yerine 525 piksel kayar; kemer yayvanlaşır ama alçalmaz.",
    },
  ],
  next: [
    { href: "atislar.html", title: "Eğik Atış: Hava Direnci ve En İyi Açı", why: "Geminin çizdiği parabol burada açı, hız ve hava direnciyle karşına çıkar; menzilin neden 45°'de en büyük olduğunu ve havanın bunu nasıl bozduğunu görürsün." },
    { href: "serbest-dusme.html", title: "Serbest Düşme: Galileo'dan Limit Hıza", why: "Zıplamanın iniş yarısı gerçek birimlerle: havasız ortamda sabit ivme, havada hızın karesiyle büyüyen fren ve limit hız." },
    { href: "gezegen-savunmasi.html", title: "Gezegen Savunması", why: "Yerçekimi sabit olmayınca atış hareketi ne olur? Mermiler GM/r² çekiminde düşer, elips çizer ya da kaçar; yörüngeyi kendin ölçersin." },
    { href: "asteroids.html", title: "Asteroids", why: "Aynı oyun döngüsü, bu kez yerçekimsiz: itiş, eylemsizlik ve kenarları birbirine yapışık bir uzay." },
  ],
  sources: [
    { title: "Wikipedia · Canabalt", url: "https://en.wikipedia.org/wiki/Canabalt", note: "Adam Saltsman'ın 2009 tarihli tek tuşlu sonsuz koşu oyunu ve türe etkisi (İngilizce)." },
    { title: "Wikipedia · Dinosaur Game", url: "https://en.wikipedia.org/wiki/Dinosaur_Game", note: "Chrome'un çevrimdışı dinozoru: Eylül 2014, tasarımcıları, Project Bolan ve oynanma sayıları (İngilizce)." },
    { title: "Wikipedia · Moon Patrol", url: "https://en.wikipedia.org/wiki/Moon_Patrol", note: "1982 tarihli Irem oyunu; üç katmanlı paralaks kaydırma ve durmadan ilerleyen araçla kraterlerden atlama (İngilizce)." },
    { title: "OpenStax · University Physics Vol. 1, 4.3 Projectile Motion", url: "https://openstax.org/books/university-physics-volume-1/pages/4-3-projectile-motion", note: "Atış hareketi, bileşenlerin bağımsızlığı ve uçuş süresi formülleri (İngilizce, açık ders kitabı)." },
    { title: "MDN · Anatomy of a video game", url: "https://developer.mozilla.org/en-US/docs/Games/Anatomy", note: "Oyun döngüsü, requestAnimationFrame ve sabit zaman adımı; bu sayfadaki döngünün genel açıklaması (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
