window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["pong"] = {
  slug: "pong",
  title: "Pong: Bir Topun Geometrisi",
  field: "Oyun",
  level: "Lise hazırlık",
  minutes: 25,
  tagline:
    "1972'de bir barın bozuk para kutusunu dolduran oyun, aslında saf geometri: hız vektörü, duvarda yansıma ve raketin ucundaki 60 derecelik sır. Bilgisayarı yenmenin formülü de burada.",
  hook:
    "Sunnyvale, Kaliforniya, 1972 sonbaharı. Bir barın köşesine konan tahta kutu birkaç gün sonra bozulur; teknisyen kapağı açınca arızayı bulur: bozuk para kutusu tıka basa doludur. Ekranda iki çizgi ve bir kare vardır, o kadar. Bu kadar basit bir şey insanları neden saatlerce tutar ve bu sayfadaki topu raketin neresine vurursan bilgisayar kaçırır?",
  bigIdea:
    "Pong'daki top bir <strong>hız vektörüdür</strong>: v<sub>x</sub> = v·cos θ ve v<sub>y</sub> = v·sin θ. Duvar yalnızca dikey bileşenin işaretini çevirir; raket ise açıyı yansıma yasasıyla değil, topun raketin <em>neresine</em> çarptığıyla belirler.",
  story: [
    "Ekranda top sektiren ilk oyun bir bilgisayar oyunu bile değildi. 1958'de Brookhaven Ulusal Laboratuvarı'nda fizikçi William Higinbotham, yıllık ziyaretçi gününde insanlar sıkılmasın diye bir osiloskopa iki düğme bağladı ve <strong>Tennis for Two</strong>'yu yaptı: yandan görünen bir tenis kortu, yerçekimiyle düşen bir nokta, ağa takılan toplar. Ziyaretçiler saatlerce kuyruk oldu. İki yıl sonra cihaz söküldü, parçaları başka deneylere gitti; Higinbotham patent bile almadı. Kayıtlara göre o, bu işi hayatının en önemsiz işlerinden biri sayıyordu.",
    "Asıl zincir 1960'ların sonunda Ralph Baer'le başladı. Televizyona bağlanan bir oyun kutusu fikrini bir mühendislik şirketinde gizlice geliştirdi; prototipine 'Brown Box' deniyordu ve içinde bir masa tenisi oyunu vardı. Bu kutu 1972'de <strong>Magnavox Odyssey</strong> adıyla satışa çıktı: tarihin ilk ev konsolu. Mayıs 1972'de Burlingame'deki bir tanıtımda Nolan Bushnell o tenis oyununu oynadı; birkaç hafta sonra Ted Dabney ile Atari'yi kurdu ve işe aldığı genç mühendis Allan Alcorn'a bir 'alıştırma' verdi: bir top, iki raket. Bushnell bunun General Electric için sipariş olduğunu söylemişti; değildi. Alcorn alıştırmayı ciddiye aldı ve oyunu oyun yapan üç şeyi ekledi: raketi bölümlere ayırıp her bölümün topu farklı açıyla göndermesini sağladı, topu oyunda kaldıkça hızlandırdı ve bir vuruş sesi koydu. Mikroişlemci yoktu, yazılım yoktu; her şey onlarca mantık çipiyle, elle kurulmuş devreydi.",
    "Prototip 1972 sonbaharında Sunnyvale'deki Andy Capp's Tavern'e kondu. Birkaç gün sonra barın sahibi makinenin bozulduğunu bildirdi; Alcorn gidip baktığında bozuk para kutusunun dolup taştığını gördü. Hikâyenin bu kısmı Alcorn ve Bushnell'in anlatımıdır; ama rakamlar anlatıdan ibaret değil: Atari aynı yıl Pong salon makinesini üretime aldı, binlerce kabin sattı ve dünyanın her yerinde kopyaları çıktı. Baer'in patentini elinde tutan Magnavox dava açtı; anlaşmazlık 1976'da Atari'nin lisans alıp ödeme yapmasıyla kapandı. 1975'te Sears kataloğundan satılan ev tipi Pong ise bir konsolu Noel hediyesine çevirdi. Bugün hangi oyunu açarsan aç, çekirdeğinde hâlâ Alcorn'un döngüsü döner: konumu güncelle, çarpışmayı denetle, çiz; saniyede altmış kez.",
  ],
  core: [
    {
      heading: "Hız bir oktur: iki bileşen",
      body:
        "Sayfadaki <strong>Hız</strong> göstergesi tek bir sayı verir, oyun başında 4.00. Bu sayı topun her adımda kaç piksel ilerlediğidir; ama top çapraz gidiyorsa bu uzunluk ikiye bölünür. Topun yönü yatayla θ açısı yapıyorsa, yatay ilerleme v·cos θ, dikey ilerleme v·sin θ olur. Kod da tam bunu yapar: ballDX = v·cos θ, ballDY = v·sin θ. İki bileşenin kareleri toplamının karekökü yine v'dir; yani top ne kadar dik giderse gitsin, 'hızı' değişmez, sadece yatay ilerlemesi azalır. Dik vuruşların karşıya daha geç varmasının sebebi budur.",
      formula: "v<sub>x</sub> = v·cos θ,  v<sub>y</sub> = v·sin θ,  v² = v<sub>x</sub>² + v<sub>y</sub>²",
      formulaNote: "v piksel/adım cinsinden; oyun saniyede 60 adım attığı için 4.00 ≈ 240 piksel/saniye demektir.",
    },
    {
      heading: "Duvar: yansıma yasası",
      body:
        "Top üst ya da alt kenara değdiğinde kod tek bir şey yapar: dikey bileşenin işaretini çevirir, yatay bileşene dokunmaz. Bu, aynanın ışığa yaptığıdır: geliş açısı gidiş açısına eşittir ve hızın büyüklüğü korunur. Geometrik sonucu şaşırtıcıdır: topun çizdiği zikzak yalnızca açıya bağlıdır, hıza değil. 60°'lik bir top ister 4 ister 10 hızla gitsin, karşı rakete varana kadar aynı sayıda duvara çarpar; hız sadece bunu kaç saniyede yaptığını belirler.",
      formula: "(v<sub>x</sub>, v<sub>y</sub>) → (v<sub>x</sub>, −v<sub>y</sub>)",
      formulaNote: "Mükemmel esnek çarpışma: enerji ve hız büyüklüğü kayıpsız korunur.",
    },
    {
      heading: "Raket: yansıma değil, kural",
      body:
        "Gerçek bir düz duvar gibi davransaydı raket yalnızca yatay bileşeni çevirirdi ve top geldiği açıyla dönerdi. Pong öyle yapmaz; Alcorn'un 1972'deki fikrini kullanır. Kod, topun raket merkezine olan uzaklığını raketin yarı boyuna (40 piksel) böler, −1 ile +1 arasına sıkıştırır ve bu sayıyı 60° ile çarpar. Tam ortadan vuruş 0°: top dümdüz gider. Raketin en ucundan vuruş 60°: dik bir çapraz. Topun geliş açısı denklemde hiç yoktur; yeni yön tamamen senin elinde. Hız büyüklüğü de korunur, yalnızca iki bileşene yeniden dağıtılır. Oyunun 'strateji' dediği şey bu tek satırdır.",
      formula: "θ = (y<sub>top</sub> − y<sub>merkez</sub>) / 40 × 60°",
      formulaNote: "Kodda açı radyandır: relativeHit × π/3. 20 piksel uzaklık 30°, 40 piksel 60° verir.",
    },
    {
      heading: "Saniyede 60 adım: zaman nasıl akar",
      body:
        "Oyunda sürekli hareket yoktur; vardır gibi görünür. Her adımda konum, hız kadar artırılır: x ← x + v<sub>x</sub>, y ← y + v<sub>y</sub>. Sayfa bu adımı ekranın tazeleme hızından bağımsız olarak saniyede tam 60 kez atar; bir 'zaman biriktirici' geciken kareleri sonradan telafi eder. Bu yöntem matematikte <strong>Euler adımı</strong>dır ve en büyük tuzağı tünellemedir: top bir adımda engelin kalınlığından fazla ilerlerse çarpışma hiç fark edilmez. Burada raketin yakalama penceresi 18 piksel, en yüksek hız ise 10 piksel/adım; pencere adımdan büyük olduğu için top raketi hiçbir zaman 'delip geçmez'. Tasarımcı bunu hesaplamış olmalı.",
      formula: "x<sub>n+1</sub> = x<sub>n</sub> + v<sub>x</sub>·Δt,  Δt = 1/60 s",
      formulaNote: "Kodda Δt birim sayılır; hızlar zaten piksel/adım olarak tutulur.",
    },
    {
      heading: "Rakibin beyni: üç satırlık kontrolcü",
      body:
        "Sağdaki raket düşünmez, kovalar. Her adımda raket merkezi topun 20 piksel üstündeyse aşağı, 20 piksel altındaysa yukarı kayar; aradaysa durur. Adım boyu senin raketinin yüzde 70'idir: sen 8 piksel, o 5.6 piksel. Bu üç satırın iki sonucu var. Birincisi, bilgisayar topu çoğunlukla 20 piksel sapmayla karşılar, yani vuruşları en çok 30° civarında olur; raketi kenara dayandığında bu 48°'ye çıkabilir ama senin 60°'lik uç vuruşuna hiç ulaşamaz. İkincisi, topun dikey hızı 5.6'yı aştığında rakip yetişemez: 60°'lik vuruşta bu, v > 6.47 demektir. Duvar sekmeleri ona biraz nefes aldırır; benzetimde uç vuruşlar yaklaşık 7.0 hızdan sonra neredeyse her seferinde geçer.",
      formula: "|y<sub>raket</sub> − y<sub>top</sub>| > 20 ⇒ 5.6 piksel/adım yaklaş",
      formulaNote: "20 piksellik aralığa 'ölü bölge' denir; raketin titremesini önler ama vuruş açısını da sınırlar.",
    },
  ],
  lab: {
    intro:
      "Kontroller az ama yeterli: <strong>↑ ↓</strong> tuşları (ya da dokunmatikte parmağını kaydırmak) raketi oynatır, <strong>Space</strong> topun hızını her basışta yüzde 8 artırır, üstteki <strong>Hız</strong> göstergesi piksel/adım cinsinden anlık hızı yazar. Her 5 toplam sayıda hız kendiliğinden yüzde 10 artar; oyun 20 sayıda biter. Deneyler için yavaş başla: Space'e dokunmadan Hız 4.00'da kal.",
    experiments: [
      {
        title: "Ortadan mı, uçtan mı?",
        predict:
          "Topu raketin tam ortasıyla karşılarsan nasıl bir çizgi çizer? En ucuyla karşılarsan karşıya varana kadar kaç kez duvara çarpar: bir mi, üç mü, on mu?",
        do: "Hız 4.00'da raketi topun hizasına getir ve topun raketin ortasına denk gelmesini sağla. Sonraki vuruşta raketi öyle ayarla ki top raketin en üst ya da en alt 5 pikseline çarpsın.",
        observe:
          "Ortadan vuruş dümdüz yatay bir çizgi: top hiç duvara değmeden yaklaşık 3.2 saniyede karşıya ulaşır. Uç vuruş dik bir zikzak: 60°'lik çizgi, karşıya varana kadar üç ya da dört duvar sekmesi ve yaklaşık 6.4 saniye.",
        explain:
          "Ortada θ = 0°, cos 0 = 1: hızın tamamı yataydır. Uçta θ = 60°, cos 60° = 0.5: yatay ilerleme yarıya iner, karşıya varmak iki kat uzun sürer; dikey bileşen 3.46 piksel/adım olduğundan top yolda 1300 piksel kadar aşağı yukarı gider, 384 piksellik alanda bu üç dört sekme eder.",
      },
      {
        title: "Space ve üstel büyüme",
        predict:
          "Her basış hızı yüzde 8 artırıyorsa 4.00'dan 10.00'a kaç basışta çıkılır? Hız artınca topun yönü değişir mi?",
        do: "Space'e her seferinde bir kez basıp Hız göstergesini not et. Topun çizdiği çizginin eğimine de bak.",
        observe:
          "Dizi şöyle gider: 4.32, 4.67, 5.04, 5.44, 5.88, 6.35, 6.86, 7.40, 8.00, 8.64, 9.33 ve 12. basışta 10.00; sonra gösterge kıpırdamaz. Top hızlanır ama çizgisinin eğimi aynı kalır.",
        explain:
          "Hız her basışta 1.08 ile çarpılır: v<sub>n</sub> = 4 × 1.08<sup>n</sup>. 10'a ulaşmak için 1.08<sup>n</sup> ≥ 2.5 gerekir; n ≈ 11.9, yani 12 basış. Yön değişmez çünkü kod iki bileşeni de aynı oranla çarpar; oran değişmeyince açı da değişmez. 10.00 üst sınırdır, kod daha ötesine izin vermez.",
      },
      {
        title: "Bilgisayarın vuruş açısı",
        predict:
          "Bilgisayar da senin gibi 60°'lik dik vuruş yapabilir mi? Ona dümdüz yatay bir top gönderirsen nasıl geri gelir?",
        do: "Hız 4.00'da birkaç ralli oyna; bilgisayarın geri gönderdiği topların eğimini kendi uç vuruşlarınla karşılaştır. Sonra ortadan vurup yatay top gönder ve dönüşü izle.",
        observe:
          "Bilgisayarın vuruşları hep daha yatıktır; çoğu 30° dolayında ya da altında. Yalnızca raketi en üstte ya da en altta sıkıştığında daha dik, en çok 48° civarında döner. Yatay gönderdiğin top neredeyse yatay geri gelir.",
        explain:
          "Rakip, merkezi topa 20 pikselden yakınken durur; 20/40 = 0.5, 0.5 × 60° = 30°. Kenarda raket 0 ile 320 arasına sıkıştırılır, merkezi 40'tan yukarı çıkamaz; top 8'e kadar inebildiğinden sapma 32 piksel, açı 0.8 × 60° = 48° olur. 60° için topun raketin tam ucuna gelmesi gerekir; ölü bölge buna izin vermez.",
      },
      {
        title: "Bilgisayarı yenmenin eşiği",
        predict:
          "Rakip raket adımda 5.6 piksel kayabiliyor. 60°'lik vuruşun dikey hızı v·sin 60° olduğuna göre hangi Hız değerinden sonra rakip yetişemez olur?",
        do: "Space'e 8 kez basıp Hız'ı 7.40'a getir ve topu raketin en ucuyla karşıla. Ardından 9. basışla 8.00'e çık ve aynı vuruşu dene. Son olarak aynı hızda ortadan vur.",
        observe:
          "Hız 6.86'da (7 basış) rakip uç vuruşlara hâlâ yetişir. 7.40'ta tam uç vuruş çoğunlukla geçer; 8.00 ve üzerinde raketin en dış 4 pikseline çarpan her top sayı olur, 10.00'da en dış 8 piksel yeter. Ortadan vuruşları ise rakip hiçbir hızda kaçırmaz.",
        explain:
          "v·sin 60° > 5.6 koşulu v > 6.47 verir; ama bu gerekli, yeterli değil. Duvar sekmesi topu geri döndürüp rakibe zaman kazandırır, bu yüzden eşik pratikte 7 dolayına kayar. Ortadan vuruşta dikey hız sıfırdır; kovalayacak bir şey olmayınca rakip asla kaybetmez. Strateji: önce hızı yükselt, sonra uçla vur.",
      },
    ],
  },
  wow: [
    {
      title: "Osiloskopta tenis, 1958",
      body:
        "Brookhaven Ulusal Laboratuvarı'nın ziyaretçi gününde William Higinbotham, nükleer araştırma cihazlarını sıkıcı bulacak konukları eğlendirmek için bir osiloskopa iki kumanda bağladı. Tennis for Two'da top yerçekimiyle düşüyor, ağa takılıyor, kort yandan görünüyordu. Cihaz iki ziyaretçi gününden sonra söküldü; Higinbotham patent almadı ve o zaman kimse bunun bir sektörün başlangıcı olduğunu anlamadı.",
    },
    {
      title: "Mikroişlemcisiz oyun",
      body:
        "Alcorn'un 1972'deki Pong'unda ne işlemci ne yazılım vardı. Topun konumu, raketlerin hareketi, skor ve ses onlarca mantık çipinin elle çizilmiş devresiyle üretiliyordu; oyun bir programdan çok bir makineydi. Kabinin tek talimatı da buna yakışır kadar kısaydı: 'Yüksek skor için topu kaçırmayın.'",
    },
    {
      title: "Hatadan doğan özellik",
      body:
        "Orijinal Pong'da raketler ekranın en üstüne ulaşamıyordu; sebebi devredeki küçük bir kusurdu. Alcorn bunu düzeltmek yerine bıraktı: iyi iki oyuncu aksi hâlde rallileri sonsuza kadar sürdürebilirdi, oysa bir salon makinesinin bozuk para almak için oyunları bitirmesi gerekiyordu. Bu sayfadaki raket ise kenara kadar gider; sonsuz ralliyi burada rakibin 20 piksellik ölü bölgesi değil, hızlanma kuralı engeller.",
    },
  ],
  worked: {
    title: "Uç vuruşun yolculuğu",
    prompt:
      "Hız 4.00 iken topu raketin en ucuyla karşıladın. Topun bileşenlerini bul; karşı rakete kaç saniyede ulaşır, yolda kaç kez duvara çarpar? Ortadan vuruşla karşılaştır.",
    steps: [
      "Açıyı bul: uç vuruşta relativeHit = 1, θ = 1 × 60° = 60°.",
      "Bileşenlere ayır: v<sub>x</sub> = 4.00 × cos 60° = 2.00 piksel/adım, v<sub>y</sub> = 4.00 × sin 60° ≈ 3.46 piksel/adım. Kontrol: 2.00² + 3.46² ≈ 16 = 4².",
      "Yatay yolu hesapla: senin raketinin yakalama çizgisi x = 18, rakibinki x = 782; aradaki mesafe 764 piksel. 764 / 2.00 = 382 adım; 60 adım bir saniye olduğundan 382 / 60 ≈ 6.4 saniye.",
      "Dikey yolu hesapla: 382 adım × 3.46 ≈ 1323 piksel. Top 8 ile 392 arasında, yani 384 piksellik bir şeritte gidip gelir; 1323 / 384 ≈ 3.4, yani başlangıç noktasına göre üç ya da dört duvar sekmesi.",
      "Ortadan vuruşla karşılaştır: θ = 0°, v<sub>x</sub> = 4.00; 764 / 4.00 = 191 adım ≈ 3.2 saniye, sıfır sekme.",
    ],
    result:
      "Uç vuruş karşıya 6.4 saniyede, üç dört sekmeyle varır; ortadan vuruş 3.2 saniyede dümdüz gider. Aynı hız, iki kat süre: fark yalnızca cos 60° = 0.5'tir.",
  },
  misconceptions: [
    {
      myth: "Top raketten de aynadaki gibi, geldiği açıyla yansır.",
      truth:
        "Duvarda evet, rakette hayır. Raket, topun geliş açısına hiç bakmaz; yeni açıyı yalnızca çarpma noktasının raket merkezine uzaklığı belirler. 60°'yle gelen bir topu ortayla karşılarsan dümdüz 0°'yle döner. Bu, fizik değil tasarım kararıdır ve oyunu oyun yapan şeydir.",
    },
    {
      myth: "Hız artınca top daha çok duvara çarpar.",
      truth:
        "Çarpma sayısı yalnızca açıya bağlıdır. Space'e basınca iki bileşen aynı oranla çarpılır, çizginin eğimi değişmez; top aynı zikzağı daha kısa sürede çizer. Sayfada hız 4.00'dan 10.00'a çıkarken 60°'lik topun sekme sayısı aynı kalır, süresi 6.4 saniyeden 2.6 saniyeye iner.",
    },
    {
      myth: "Bilgisayar topun nereye gideceğini önceden biliyor, o yüzden kaçırmıyor.",
      truth:
        "Hiçbir şey hesaplamıyor; sadece topun o anki yüksekliğini senin raketinin yüzde 70 hızıyla kovalıyor. Yavaş toplarda bu yeterlidir, bu yüzden yenilmez görünür. Topun dikey hızı raketin 5.6 piksel/adım sınırını aşınca kovalamak yetmez ve kaçırmaya başlar.",
    },
    {
      myth: "Hız göstergesindeki 4.00 topun saniyedeki hızıdır.",
      truth:
        "Piksel/adım cinsindendir; oyun saniyede 60 adım attığından 4.00, oyun alanı ölçeğinde 240 piksel/saniye demektir. Ekranda alan küçültülmüşse görünen hız da küçülür ama oyunun içindeki sayılar ve süreler değişmez: karşıya varış 3.2 saniye kalır.",
    },
  ],
  glossary: [
    { term: "Hız vektörü", definition: "Hem büyüklüğü hem yönü olan hız; yatay ve dikey bileşenlere ayrılır." },
    { term: "Bileşen", definition: "Bir vektörün tek eksendeki payı: v<sub>x</sub> = v·cos θ, v<sub>y</sub> = v·sin θ." },
    { term: "Yansıma yasası", definition: "Düz bir yüzeye çarpan şeyin geliş açısıyla gidiş açısının eşit olması; yüzeye dik bileşenin işareti değişir." },
    { term: "Zaman adımı", definition: "Simülasyonun hareketi hesapladığı sabit süre; burada 1/60 saniye, hızlar piksel/adım olarak tutulur." },
    { term: "Euler adımı", definition: "Yeni konumu eski konuma hız çarpı zaman adımı ekleyerek bulma; en basit sayısal integrasyon yöntemi." },
    { term: "Çarpışma tespiti", definition: "İki nesnenin birbirine değip değmediğini koordinat karşılaştırmasıyla anlama; burada topun x'i 18'in altına inince ve y'si raket aralığındaysa." },
    { term: "Ölü bölge", definition: "Kontrolcünün tepki vermediği küçük hata aralığı; rakip raket topa 20 pikselden yakınken kıpırdamaz." },
    { term: "Geometrik dizi", definition: "Her terimin bir öncekinin sabit katı olduğu dizi; Space ile hız 4, 4.32, 4.67 … diye 1.08 kat büyür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki döngü, bir oyun motorunun ve bir fizik simülasyonunun küçültülmüş hâlidir. Üniversitede 'konum artı hız çarpı zaman' adımı <strong>sayısal integrasyon</strong> adıyla karşına çıkar; Euler yönteminin hatası, enerjiyi koruyan daha iyi şemalar (Verlet, Runge–Kutta) ve bir adımda engelden geçip giden cisimler için <em>sürekli çarpışma tespiti</em> bu dersin konularıdır. Rakip raketin üç satırı ise kontrol teorisinin en küçük örneğidir: hatayı ölç, hata büyükse düzelt, küçükse dur. Ölü bölgeli bir açma-kapama kontrolcüsü; termostat da aynı mantıkla çalışır, bir dronun irtifa tutması ise bunun oransal-türevsel-integral (PID) gibi daha ince sürümlerini kullanır.",
      "Pong'un ikinci üniversite hayatı yapay zekâdadır. 2013'te DeepMind'ın araştırmacıları, yalnızca ekran piksellerini gören ve skoru ödül olarak alan bir derin sinir ağını yedi Atari oyununda eğitti; Pong bunlardan biriydi ve ağ, kurallar hiç anlatılmadan insan düzeyini geçti. Bu çalışma <strong>derin pekiştirmeli öğrenme</strong> alanını başlattı. Aynı yöntemin arkasında ise lisede tanıştığın araçlar vardır: vektörler, olasılık, türev. Bir topun açısını hesaplamakla bir ajana topu vurmayı öğretmek arasındaki yol, sanıldığından kısadır.",
    ],
    topics: ["Sayısal integrasyon (Euler, Verlet, Runge–Kutta)", "Çarpışma tespiti ve oyun fiziği", "Kontrol teorisi ve PID", "Pekiştirmeli öğrenme", "Doğrusal cebir ve 2B dönüşümler", "Ayrık zamanlı dinamik sistemler"],
  },
  quiz: [
    {
      question: "Hız 4.00 iken top raketin tam merkezine çarpıyor. Yeni hız bileşenleri nedir?",
      options: ["v<sub>x</sub> = 2.00, v<sub>y</sub> = 3.46", "v<sub>x</sub> = 4.00, v<sub>y</sub> = 0", "v<sub>x</sub> = 0, v<sub>y</sub> = 4.00", "Geliş açısına bağlıdır"],
      answer: 1,
      explanation: "Merkezde relativeHit = 0, açı 0°; cos 0 = 1 ve sin 0 = 0. Top dümdüz yatay gider. Raket geliş açısına hiç bakmaz; yeni yönü yalnızca çarpma noktası belirler.",
    },
    {
      question: "Space'e iki kez basılınca Hız göstergesi 4.00'dan kaça çıkar?",
      options: ["4.16", "4.32", "4.67", "4.80"],
      answer: 2,
      explanation: "Her basış 1.08 ile çarpar: 4 × 1.08 = 4.32, 4.32 × 1.08 ≈ 4.67. Artış toplanmaz, çarpılır; bu yüzden 4.16 ya da 4.80 değil 4.67. Dizi geometriktir.",
    },
    {
      question: "Top üst duvara çarptığında hangisi doğrudur?",
      options: ["Yatay bileşen işaret değiştirir", "Hız büyüklüğü azalır", "Yalnızca dikey bileşenin işareti değişir", "Açı raketteki gibi yeniden hesaplanır"],
      answer: 2,
      explanation: "Kod ballDY'nin işaretini çevirir, ballDX'e dokunmaz. Bu yansıma yasasıdır: geliş ve gidiş açıları eşit, hız büyüklüğü aynı. Açıyı yeniden hesaplayan yalnızca rakettir.",
    },
  ],
  next: [
    { href: "breakout.html", title: "Tuğla Kırmaca (Breakout)", why: "Aynı top, aynı raket kuralı; bu kez üstte kırılacak tuğlalar var. Yansıma geometrisini bir adım ileri taşı." },
    { href: "optik-yansima-kirilma.html", title: "Optik: Yansıma ve Kırılma", why: "Duvardaki sekmenin fizik dersi karşılığı: geliş açısı eşittir gidiş açısı, bu kez ışıkla." },
    { href: "vektorler.html", title: "Vektörler", why: "v·cos θ ve v·sin θ'nın geldiği yer; bileşenlere ayırma ve toplama alıştırmaları." },
    { href: "birim-cember.html", title: "Birim Çember", why: "Raket açısını hıza çeviren sinüs ve kosinüsü çember üzerinde gör." },
  ],
  sources: [
    { title: "Wikipedia · Pong", url: "https://en.wikipedia.org/wiki/Pong", note: "Alcorn'un tasarım kararları, Andy Capp's Tavern anlatısı ve Magnavox davası (İngilizce)." },
    { title: "Wikipedia · Tennis for Two", url: "https://en.wikipedia.org/wiki/Tennis_for_Two", note: "Higinbotham'ın 1958 osiloskop oyunu ve Brookhaven ziyaretçi günleri." },
    { title: "MDN · 2D Breakout game using pure JavaScript", url: "https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript", note: "Bu sayfadakine çok benzeyen bir top-raket oyununu sıfırdan yazdıran adım adım öğretici." },
    { title: "arXiv · Playing Atari with Deep Reinforcement Learning (2013)", url: "https://arxiv.org/abs/1312.5602", note: "Pong dahil yedi Atari oyununu piksellerden öğrenen DeepMind makalesi; köprü bölümündeki çalışma." },
  ],
  revision: "Ekim 2026",
};
