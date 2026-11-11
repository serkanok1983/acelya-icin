window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["breakout"] = {
  slug: "breakout",
  title: "Breakout: Yansıyan Top, Kırılan Duvar",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 25,
  tagline:
    "1976'da Pong'un tek kişilik hâli olarak doğdu; devresini Steve Wozniak dört gecede kurdu. Altında yansıma yasasının vektör hâli, kutu çarpışması ve ayrık zamanın tuzakları var.",
  hook:
    "Kaliforniya, 1970'lerin ortası. Gündüzleri Hewlett-Packard'da çalışan genç bir mühendis, dört gece üst üste Atari'de sabahlayıp bir oyunun devresini kuruyor; arkadaşı Steve Jobs teslim tarihini dört gün diye söz vermiş. Ekranda bir top, bir raket ve bir tuğla duvarı var. Peki top, tuğlaya alttan mı yandan mı çarptığını nereden biliyor?",
  bigIdea:
    "Breakout'ta her çarpışma tek bir işlemdir: hız vektörünün yüzeye dik bileşenini ters çevirmek. Duvar ve tuğla bunu <strong>yansıma yasası</strong>yla yapar; raket ise yasayı bilerek çiğner ve topun yönünü, çarpma noktası üzerinden senin eline verir.",
  story: [
    "Pong 1972'de iki kişiyi karşı karşıya getirmişti; rakibin yoksa oyun da yoktu. Atari'nin kurucusu Nolan Bushnell aynı topu ve raketi tek kişinin oynayabileceği bir oyuna çevirmek istedi ve Steve Bristow'la birlikte fikri buldu: rakibin yerine bir duvar koy, top duvardan parça koparsın. Fikir tümüyle yeni değildi; Ramtek'in 1974 tarihli Clean Sweep'i benzer bir şey denemişti. Asıl sorun maliyetti. O yılların oyunlarında işlemci yoktu; her şey mantık çipleriyle kuruluyordu ve bir Atari oyunu 150–170 çip tutuyordu. Bushnell prototip işini şirketin genç teknisyeni Steve Jobs'a verdi: 750 dolar, ayrıca tasarım 50 çipin altına indiği her çip için 100 dolar prim. Jobs dört günde teslim edeceğini söyledi.",
    "Jobs işi arkadaşı Steve Wozniak'a götürdü. Wozniak gündüz Hewlett-Packard'daki işine gidiyor, gece Atari'de çalışıyordu; dört gecenin sonunda devre hazırdı. Çizimi 42 çip kullanıyordu, teslim edilen deneme kartında 44 çip vardı. Atari bu tasarımı üretmedi: kart o kadar sıkıştırılmıştı ki şirketin alışılmış montaj ve test yöntemlerine uymuyordu. Fabrikadan çıkan sürümde 100 dolayında çip vardı; Wozniak yine de oyunun kendi tasarımıyla birebir aynı oynandığını söyler. Hikâyenin para kısmı Wozniak'ın anlatımına ve sonradan yazılanlara dayanır: Wozniak 350 dolar aldığını, toplamın 700 dolar olduğunu sandığını anlatır; sonradan yazılanlara göre ise Atari 5000 dolarlık bir prim ödemiş, Jobs bunu ondan gizlemiştir.",
    "Breakout 13 Mayıs 1976'da salonlara çıktı; ilk üretimde 11 000 kabin yapıldı. Özgün oyunda sekiz sıra tuğla vardı: alttan üste ikişer sıra sarı, yeşil, turuncu ve kırmızı; sırasıyla 1, 3, 5 ve 7 puan. Top dördüncü ve on ikinci vuruşta, bir de turuncu ve kırmızı sıralara ilk değdiğinde hızlanıyor; kırmızı sırayı delip tavana vurduğunda raket yarı boyuna iniyordu. Oyunun kalıcı etkisi ise bir bilgisayarın içinde saklı: Wozniak, Apple II'ye renkli grafiği, raket kumandası girişini ve sesi, Breakout'u bu kez yazılımla yazabilmek için koyduğunu anlatır. 1978'de Super Breakout, 1986'da Taito'nun Arkanoid'i geldi. Bu sayfadaki sürüm sadedir: 5 sıra, 8 sütun, her tuğla 10 puan, tek can.",
  ],
  core: [
    {
      heading: "Yansıma: dik bileşeni çevir",
      body:
        "Topun hızı iki bileşenli bir vektördür: v = (v<sub>x</sub>, v<sub>y</sub>). Düz bir yüzeye çarptığında hızın yüzeye paralel kısmı değişmez, dik kısmı işaret değiştirir. Yüzeyin dışarı bakan birim dikmesine <strong>normal</strong> denir ve n ile gösterilir; kural tek satıra sığar: v′ = v − 2(v·n)n. Sol duvarda n = (1, 0)'dır, formül yalnızca v<sub>x</sub>'in işaretini çevirir; tavanda n = (0, 1), çevrilen v<sub>y</sub>'dir. İki sonuç hemen çıkar. Hızın büyüklüğü korunur, çünkü bir bileşenin işaretini değiştirmek karelerin toplamını değiştirmez. Geliş açısı da gidiş açısına eşittir: ışığın aynada yaptığının aynısı. Fizikte bu, yerinden oynamayan bir duvarla <strong>esnek çarpışma</strong>dır: enerji kaybı yoktur. Kodda bir incelik var: duvarlar işareti çevirmek yerine mutlak değer kullanır (sol duvarda v<sub>x</sub> = |v<sub>x</sub>|). Böylece duvarın içinde kalmış bir top ikinci kez çevrilip duvara yapışmaz.",
      formula: "v′ = v − 2(v·n)n",
      formulaNote: "v ve n vektördür, v·n iç çarpımdır. Sol duvar için n = (1, 0): (v<sub>x</sub>, v<sub>y</sub>) → (−v<sub>x</sub>, v<sub>y</sub>).",
    },
    {
      heading: "Tuğla: hangi yüzünden girdim?",
      body:
        "Tuğla bir dikdörtgendir, top ise kodun gözünde 16 piksellik bir kare. Kenarları eksenlere paralel iki kutunun kesişip kesişmediği dört karşılaştırmayla anlaşılır: yatayda da dikeyde de aralıklar üst üste biniyorsa çarpışma vardır. Bu sınamaya eksen hizalı sınır kutusu, kısaca <strong>AABB</strong> testi denir. Zor olan sonrasıdır: top hangi yüze çarptı? Kod iki eksendeki örtüşmeyi ölçer; top, en az gömüldüğü eksenden girmiş sayılır ve hızın o bileşeni ters çevrilir. Yatay örtüşme küçükse yan yüz (v<sub>x</sub> döner), değilse alt ya da üst yüz (v<sub>y</sub> döner). Kural basit ve hızlıdır ama iki kusuru vardır. Topu kare saymak köşelerde erken tetiklenir: karenin köşesi daireden 8·(√2 − 1) ≈ 3.3 piksel dışarı taşar. Ayrıca kod adım başına tek tuğla işler; sıralar arasındaki 10 piksellik aralık topun çapından dar olduğundan top iki tuğlaya birden değebilir ve ikinci tuğla bir sonraki adımda hızı yeniden çevirir.",
      formula: "örtüşme<sub>x</sub> &lt; örtüşme<sub>y</sub> ⇒ v<sub>x</sub> → −v<sub>x</sub>;  değilse v<sub>y</sub> → −v<sub>y</sub>",
      formulaNote: "Örtüşme, iki kutunun o eksende iç içe geçtiği uzunluktur. Küçük olan, topun içeri yeni girdiği yönü gösterir.",
    },
    {
      heading: "Raket: yasayı çiğneyen kural",
      body:
        "Raket düz bir yüzey gibi davransaydı top her seferinde geldiği açıyla dönerdi ve oyuncunun yapabileceği tek şey topu kaçırmamak olurdu. Kod bunun yerine topun raket merkezine uzaklığını raketin yarı genişliğine (50 piksel) böler, −1 ile +1 arasına sıkıştırır ve 60° ile çarpar. Açı düşeyden ölçülür: ortadan vuruş topu dimdik yukarı, sağ uçtan vuruş 60° sağa yatık gönderir. Geliş açısı formülde yoktur; hızın büyüklüğü ise korunur. Bu kuralın gizli bir sonucu vardır. Raketten çıkan topun dikey hızı en az s·cos 60° = s/2'dir. Duvarlar ve tuğlalar yalnızca işaret çevirdiği için iki bileşenin büyüklükleri bir sonraki raket vuruşuna kadar hiç değişmez. Top bu yüzden yataya yakın bir zikzağa kilitlenemez; düşeyle yaptığı açı iki raket vuruşu arasında sabit kalır. Nişan almak, raketin neresiyle karşıladığını seçmek demektir.",
      formula: "θ = (x<sub>top</sub> − x<sub>merkez</sub>)/50 × 60°,  v = (s·sin θ, −s·cos θ)",
      formulaNote: "θ düşeyden ölçülür, s topun hızıdır; eksi işareti ekranda yukarı yönü gösterir. 25 piksel sapma 30°, 50 piksel ve ötesi 60° verir.",
    },
    {
      heading: "Ayrık zaman: top sıçrayarak ilerler",
      body:
        "Top kesintisiz hareket etmez; saniyede 60 kez, her seferinde hızı kadar sıçrar. Başlangıçta sıçrama 5.66 pikseldir. Kod çarpışmayı yalnızca sıçramanın bittiği yerde denetler; arada geçilen yere bakmaz. Tehlikesi <strong>tünelleme</strong>dir: sıçrama, engelin yakalama penceresinden uzunsa top engelin öbür yanında belirir. Pencere, engelin kalınlığı ile topun çapının toplamıdır: 20 piksellik tuğla için 36, 10 piksellik raket için 26 piksel. Hız kırılan her 10 tuğlada yüzde 8 artar; 40 tuğlalık oyunda bu en çok üç kez olur ve sıçrama 7.13 piksele çıkar, pencerelerin çok altında kalır. Raketi delip geçmek için hızın 20 kez artması, yani 200 tuğla gerekirdi. 40 tuğlalık oyunda hızlanma kuralı güvenli bölgeden hiç çıkmaz. Aynı pencerenin tuhaf bir yan etkisi de var: top raketin üst yüzünün 18 piksel altına inmişken raket altına yetişirse top yakalanmış sayılır ve raketin üstüne geri konur.",
      formula: "s<sub>n</sub> = 5.66 × 1.08<sup>n</sup> piksel/adım;  tünelleme koşulu: |v<sub>y</sub>| &gt; kalınlık + çap",
      formulaNote: "n = 0, 1, 2, 3 için 5.66, 6.11, 6.60 ve 7.13 piksel/adım; saniyede 339, 367, 396 ve 428 piksel.",
    },
    {
      heading: "Aynalar salonu: yolu düzleştirmek",
      body:
        "Topun zikzağını hesaplamanın zarif bir yolu vardır: topu yansıtmak yerine odayı yansıt. Duvarın öbür yanında odanın ayna görüntüsünü hayal edersen top duvardan sekmez, ayna odaya dümdüz girer. Görüntüleri yan yana ve üst üste dizdiğinde kırık çizgi tek bir doğruya açılır; fizikçiler buna <strong>görüntü yöntemi</strong> der. Hesap basitleşir: top düşeyle θ açısı yapıyorsa, dikeyde toplam D piksel yol aldığında yatayda D·tan θ kayar; duvar sekmelerini en sonda, sonucu oyun alanına geri katlayarak hesaba katarsın. Topun merkezi x = 8 ile 792 arasında gidip gelir; katlama bu 784 piksellik aralığı bir akordeon gibi ileri geri sayar. Önceki kartın değişmezi burada işe yarar: iki raket vuruşu arasında θ sabit olduğundan, top yolda kaç kez yan duvara çarparsa çarpsın iniş noktası tek bir formülle bulunur. Matematikte bu konunun adı bilardo problemidir; dikdörtgen masada eğimi kenarların oranına göre rasyonel olan yollar kendini tekrar eder, öbürleri masanın her noktasına dilediğin kadar yaklaşır.",
      formula: "x<sub>iniş</sub> = katla(x₀ + D·tan θ)",
      formulaNote: "D gidiş ve dönüşte alınan toplam dikey yoldur; 'katla' sonucu 8–792 aralığına yansıtarak indirger. Yandan vurulan tuğla da düşey bir ayna gibi davranır ve hesabı kaydırır.",
    },
  ],
  lab: {
    intro:
      "Kontroller: <kbd>←</kbd> <kbd>→</kbd> tuşları raketi her basışta 50 piksel kaydırır; dokunmatikte raket parmağını izler. <strong>Yeni Oyun</strong> düğmesi ya da oyun bitince Enter yeniden başlatır. Tek gösterge <strong>Skor</strong>'dur: her tuğla 10 puan, 40 tuğla 400 puan. Alan 800×500 pikseldir; tuğlalar 5 sıra, 8 sütundur ve her biri 80×20 pikseldir. Top 16 piksel çapındadır, ortadan 45°'yle yukarı doğru başlar; tek canın vardır. Sayılar oyun alanının kendi pikselleridir; ekranın küçükse hepsi aynı oranda küçülür, süreler değişmez.",
    experiments: [
      {
        title: "İlk top: 1.6 saniyen var",
        predict:
          "Yeni Oyun'a bastığında top ortadan 45°'yle fırlar; sağa mı sola mı gideceği yazı turadır. Alt sıradan bir tuğla kırıp döndüğünde raket hizasına nerede iner: ortada mı, kenarda mı? Klavyeyle yetişmek için kaç basış gerekir?",
        do: "Yeni Oyun'a bas ve ilk denemede rakete dokunmadan topun nereye düştüğünü izle. Sonraki denemede topun gittiği yöndeki ok tuşuna art arda bas ya da basılı tut; raketi duvara daya.",
        observe:
          "Top 0.3 saniyede ortanın hemen yanındaki alt tuğlayı kırar, döner ve 1.6 saniyede duvarın dibine, kenardan 24 piksel içeriye iner. Raket ancak duvara dayalıysa, yani ortadan 7 basış ötedeyse topu karşılar; 6 basışta top raketin ucunun 18 piksel açığından geçer.",
        explain:
          "Top her adımda 4 piksel yana, 4 piksel yukarı gider. Tuğlanın altına 19 adımda varır (x = 476), dikey hızı ters döner ve 75 adım sonra raket hizasındadır: 400 + 94 × 4 = 776. Toplam 94 adım, 94/60 ≈ 1.57 s. Raket 100 piksel genişliğindedir ve klavyeyle yalnızca 50'nin katlarında durur; 776'yı yalnızca en sağdaki konum (700–800) kapsar.",
      },
      {
        title: "Raketin ortası, raketin ucu",
        predict:
          "Top raketin tam ortasına düşerse nasıl döner? Ucuna düşerse? Topun hangi yönden geldiği sonucu değiştirir mi?",
        do: "Dokunmatikte raketi kaydırarak, klavyede bir basış erken ya da geç davranarak benzer topları bir kez raketin ortasıyla, bir kez sağ ucuyla, bir kez sol ucuyla karşıla. Dönen topun yatıklığına ve alt tuğla sırasına ne kadar sürede vardığına bak.",
        observe:
          "Ortadan dönen top dimdik çıkar ve alt sıraya 0.9 saniyede varır. Uçtan dönen top 60° yatar; aynı yüksekliğe 1.7 saniyede ulaşır. Sağ uç topu hep sağa, sol uç hep sola gönderir; top hangi yönden gelmiş olursa olsun.",
        explain:
          "Kod, topun raket merkezine uzaklığını 50'ye böler ve 60° ile çarpar; geliş açısı formülde yoktur. Ortada θ = 0: hızın tamamı dikeydir. Uçta θ = 60°: dikey bileşen cos 60° = 0.5 ile çarpılır, aynı yol iki kat uzun sürer. Klavyede raket 50 piksel atladığından aynı topu komşu iki konumdan karşılayabilirsin; bu iki seçeneğin açıları arasında tam 60° fark vardır.",
      },
      {
        title: "Alttan mı, yandan mı?",
        predict:
          "Top bir tuğlaya alt yüzünden çarparsa hangi bileşeni değişir? İki sütun arasındaki 20 piksellik boşluğa girip bir tuğlaya yandan değerse ne olur? Yan vuruşlar ne kadar sıktır?",
        do: "Bir oyun boyunca her tuğla kırılışında topun dikey yönünün mü, yatay yönünün mü değiştiğine bak ve yan vuruşları say. Sütun aralarına dalan toplara ve iki tuğlanın peş peşe kaybolduğu anlara özellikle dikkat et.",
        observe:
          "Çoğu vuruşta top aşağı ya da yukarı döner. Kabaca dört tuğladan biri yandan kırılır (benzetimde yüzde 25–29): top yatay yönünü değiştirir, dikey gidişini sürdürür ve çoğu kez bir üst sıraya dalar. Seyrek olarak üst üste iki tuğla art arda iki adımda kırılır ve top hiç dönmemiş gibi yoluna devam eder.",
        explain:
          "Kod topu 16 piksellik bir kare sayar ve tuğlayla örtüşmesini iki eksende ölçer; hangisi küçükse top o yüzden girmiştir ve o bileşen ters çevrilir. Sıralar arasındaki 10 piksellik aralık topun çapından dardır, top iki sıraya birden değebilir. Kod adım başına tek tuğla işlediğinden ilk adımda dikey hız döner, sonraki adımda öteki tuğla onu geri çevirir. İki tuğla gider, yön aynı kalır.",
      },
      {
        title: "Duvarın arkasına geç",
        predict:
          "Bir sütunu baştan sona açıp topu tuğlaların üstüne, tavanla en üst sıra arasına sokarsan ne olur? Top sen rakete dokunmadan kaç tuğla kırabilir?",
        do: "Vuruşlarını aynı sütuna yöneltmeye çalış: topu raketin ortasına yakın, dike yakın açılarla karşıla. Sütun açılınca topu oradan yukarı gönder ve bir sonraki raket vuruşuna kadar kırılan tuğlaları say.",
        observe:
          "Tavanla en üst sıra arasındaki 30 piksellik koridora giren top, tavandan ve tuğlaların üst yüzünden peş peşe seker. Skor sen hiçbir şey yapmadan artar. Olağan bir raket vuruşu bir iki tuğla kırar; kodun aynısıyla yapılan 2000 oyunluk benzetimde ise bir oyunun en verimli vuruşu çoğunlukla 3–6 tuğla kırdı, kabaca yirmi oyunun birinde 10'u buldu.",
        explain:
          "Koridorda top merkezinin gidebileceği dikey yol yalnızca 14 pikseldir (y = 8 ile 22 arası); birkaç adımda bir yüzeye çarpar ve tuğlaya her çarpış bir kırılmadır. Üstten vurulan tuğla da dikey hızı çevirir, top tavana döner. Raket devrede olmadığından açı değişmez; top duvar boyunca sabit eğimle ilerler. Oyunun en bilinen stratejisi budur.",
      },
    ],
  },
  wow: [
    {
      title: "44 çip, dört gece",
      body:
        "O yıllarda bir Atari oyunu 150–170 mantık çipiyle kuruluyordu. Wozniak'ın dört gecede bitirdiği Breakout devresi çizimde 42, teslim edilen deneme kartında 44 çip kullanıyordu. Atari tasarımı üretime alamadı; fabrika sürümü 100 dolayında çiple çıktı. Wozniak, bitmiş makinenin kendi devresiyle aynı oynandığını söyler.",
    },
    {
      title: "Apple II'nin içindeki Breakout",
      body:
        "Wozniak'ın anlatımına göre Apple II'nin en bilinen özelliklerinden birkaçı Breakout yüzünden vardır: renkli grafik, raket kumandası girişi, ses ve BASIC'teki çizim komutları. Hepsini, donanımla kurduğu oyunu bu kez yazılımla yazabilmek için eklemişti. 1977'de çıkan bilgisayar, bir salon oyununun gereksinim listesini taşıyordu.",
    },
    {
      title: "En yüksek skor: 896",
      body:
        "Özgün Breakout'ta sarı, yeşil, turuncu ve kırmızı tuğlalar sırasıyla 1, 3, 5 ve 7 puan veriyordu. Bir ekran 448 puandı ve oyun en çok iki ekran sunuyordu: ulaşılabilecek en yüksek skor 896'ydı. Top kırmızı sırayı delip tavana değdiğinde raket yarı boyuna iniyordu. Bu sayfada her tuğla 10 puan, tavan skor 400'dür.",
    },
  ],
  worked: {
    title: "Bu top nereye düşer?",
    prompt:
      "Raket başlangıç konumunda, merkezi x = 400'de duruyor. Hızı 5.66 piksel/adım olan top raketin merkezinin 20 piksel sağına çarpıyor. (a) Dönüş açısını ve hız bileşenlerini bul. (b) Top hangi tuğlaya, kaç saniye sonra çarpar? (c) Raket hizasına nerede ve ne zaman döner; klavyeyle kaç basış gerekir?",
    steps: [
      "(a) θ = 20/50 × 60° = 24°. v<sub>x</sub> = 5.66 × sin 24° = 2.30, v<sub>y</sub> = −5.66 × cos 24° = −5.17 piksel/adım. Denetim: 2.30² + 5.17² ≈ 32.0 = 5.66².",
      "(b) Top raketten merkez yüksekliği y = 471.5'te ayrılır. Alt sıranın alt yüzü y = 170'tedir; yarıçap 8 olduğundan merkez 178'in üstüne çıkınca temas başlar. 293.5 / 5.17 = 56.8, yani 57 adım: 57/60 = 0.95 s.",
      "O anda x = 420 + 57 × 2.30 ≈ 551. Soldan altıncı sütunun tuğlası x = 510 ile 590 arasındadır; top onu ortasına yakın bir yerden, alttan vurur. Dikey örtüşme küçük olduğu için v<sub>y</sub> işaret değiştirir, v<sub>x</sub> aynı kalır.",
      "(c) Raketle temas, merkez y = 472'ye inince başlar: (472 − 176.9) / 5.17 = 57.1, yani 58 adım. x = 551 + 58 × 2.30 ≈ 685. Toplam 57 + 58 = 115 adım = 1.92 s.",
      "Klavyede raketin sol kenarı 50'nin katlarında durur. 685'i kapsayan iki konum vardır: 600–700 (350'den 5 basış) ve 650–750 (6 basış). İlkinde merkez 650, sapma +35 piksel, yeni açı 42° sağa; ikincisinde merkez 700, sapma −15 piksel, açı 18° sola.",
    ],
    result:
      "Top 24°'yle çıkar, 0.95 saniyede altıncı sütunun alt tuğlasını kırar ve 1.92 saniyede x ≈ 685'e iner. Kestirme hesap da aynı yeri gösterir: 420 + 2 × 293.5 × tan 24° ≈ 681; aradaki 4 piksel, ayrık adımların yuvarlamasıdır.",
  },
  misconceptions: [
    {
      myth: "Top raketten de aynadaki gibi, geldiği açıyla yansır.",
      truth:
        "Duvarda ve tuğlada evet, rakette hayır. Raket geliş açısına hiç bakmaz; yeni açıyı yalnızca topun raket merkezine uzaklığı belirler: ortada 0°, uçta 60°. Sağdan gelen topu raketin sağ ucuyla karşılarsan geldiği tarafa geri döner; bir aynada bu olamazdı. Fizik değil, tasarım kararıdır; nişan almayı mümkün kılan da odur.",
    },
    {
      myth: "Top hızlandıkça tuğlaların içinden geçmeye başlar.",
      truth:
        "Bu oyunda hayır. Tünelleme, bir adımdaki sıçramanın yakalama penceresini aşmasıyla olur. Top en çok 7.13 piksel/adım hıza ulaşır; tuğlanın penceresi 36, raketinki 26 pikseldir. İki tuğlanın birden kırılıp topun yoluna devam ettiğini görürsen sebep hız değil, kodun adım başına tek tuğla işlemesidir.",
    },
    {
      myth: "Tuğlaya çarpan top her zaman geri, aşağı doğru döner.",
      truth:
        "Yalnızca alt yüze çarptığında. Yandan giren topun yatay bileşeni çevrilir, dikey gidişi sürer; top tuğlayı kırıp yukarı doğru yoluna devam eder. Kabaca her dört tuğladan biri böyle kırılır. Üst yüze çarpan top ise yukarı, tavana doğru döner; duvarın arkasında art arda kırışların kaynağı budur.",
    },
    {
      myth: "Top giderek yatıklaşıp sonunda iki yan duvar arasında sıkışabilir.",
      truth:
        "Olamaz. Raketten çıkan topun düşeyle açısı en çok 60°'dir, yani dikey hızı en az toplam hızın yarısıdır. Duvar ve tuğla çarpışmaları bileşenlerin yalnızca işaretini değiştirir, büyüklüğüne dokunmaz. Açı ancak bir sonraki raket vuruşunda değişir ve yine 60°'yi geçemez.",
    },
  ],
  glossary: [
    { term: "Hız vektörü", definition: "Hem büyüklüğü hem yönü olan hız; burada adım başına yatay ve dikey piksel sayısı olarak tutulur." },
    { term: "Normal", definition: "Bir yüzeye dik, birim uzunlukta vektör; yansımada hızın hangi bileşeninin çevrileceğini belirler." },
    { term: "Yansıma yasası", definition: "Düz bir yüzeye çarpan cismin geliş açısının gidiş açısına eşit olması; hızın yüzeye dik bileşeni işaret değiştirir." },
    { term: "Esnek çarpışma", definition: "Toplam kinetik enerjinin korunduğu çarpışma; sabit bir duvara esnek çarpan cismin hızının büyüklüğü değişmez." },
    { term: "AABB", definition: "Eksen hizalı sınır kutusu; kenarları koordinat eksenlerine paralel dikdörtgen. İki AABB'nin kesişimi dört karşılaştırmayla sınanır." },
    { term: "Tünelleme", definition: "Ayrık zamanlı benzetimde cismin bir adımda engelin kalınlığından fazla ilerleyip çarpışma algılanmadan karşıya geçmesi." },
    { term: "Zaman adımı", definition: "Benzetimin durumu güncellediği sabit süre; burada 1/60 saniye, hızlar piksel/adım olarak tutulur." },
    { term: "Görüntü yöntemi", definition: "Yansıyan bir yolu, yüzeyin ardındaki ayna görüntüsüne uzanan düz bir doğru olarak hesaplama tekniği." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Duvardan seken top, <strong>Fizik I</strong>'in çarpışmalar bölümünün sınır durumudur. Orada kütleleri m ve M olan iki cismin esnek çarpışmasını momentumun ve kinetik enerjinin korunumundan çözersin; M sonsuza giderken hafif cismin hızı tam ters döner, duvar kıpırdamaz. Gerçek toplar enerji kaybeder; bunu ölçen sayıya geri sıçrama katsayısı denir ve bu oyunda 1'dir. <strong>Lineer Cebir</strong> aynı işlemi bir matrisle yazar: v′ = (I − 2nn<sup>T</sup>)v. Bu yansıma matrisi ortogonaldir, uzunlukları korur ve determinantı −1'dir; dönmelerin +1'iyle karşılaştır. Sayısal lineer cebirde aynı matris Householder dönüşümü adıyla, büyük denklem sistemlerini çözmekte kullanılır.",
      "Oyunun döngüsü <strong>Sayısal Yöntemler</strong> ve bilgisayar grafiği derslerinin konusudur: sabit zaman adımı, adımlar arasında kaçan çarpışmaları yakalayan sürekli çarpışma tespiti, kutulardan dışbükey çokgenlere genelleyen ayırıcı eksen teoremi. Aynalar salonu fikri <strong>Dinamik Sistemler</strong>'e açılır: matematiksel bilardo, bir masanın biçiminin yörüngeleri nasıl düzenli ya da kaotik yaptığını inceler. Breakout'un bir de yapay zekâ hayatı var. 2013'te DeepMind araştırmacıları yalnızca ekran piksellerini ve skoru gören bir sinir ağını yedi Atari oyununda eğitti; Breakout bunlardan biriydi ve ağ insan uzmanı geçti. Ekibin 2015'te yayımladığı devam çalışmasında ağın, duvarın kenarında tünel açıp topu arkaya gönderme stratejisini kendi başına bulduğu gösterildi.",
    ],
    topics: [
      "Esnek ve esnek olmayan çarpışmalar, geri sıçrama katsayısı",
      "Yansıma matrisleri ve ortogonal dönüşümler",
      "Sabit zaman adımı ve sürekli çarpışma tespiti",
      "Ayırıcı eksen teoremi",
      "Matematiksel bilardo ve dinamik sistemler",
      "Derin pekiştirmeli öğrenme",
    ],
  },
  quiz: [
    {
      question: "Top raketin merkezinin 25 piksel soluna çarptı. Nasıl döner?",
      options: [
        "Geldiği açıyla, aynadaki gibi",
        "Düşeyle 30° yaparak sola doğru",
        "Düşeyle 60° yaparak sola doğru",
        "Dimdik yukarı",
      ],
      answer: 1,
      explanation:
        "Kural: θ = sapma/50 × 60°. 25 piksel sapma 0.5 × 60° = 30° verir; sapma solda olduğu için top sola yatar. Geliş açısı formülde yoktur. 60° için topun raketin ucuna, dimdik çıkması için tam ortasına gelmesi gerekirdi.",
    },
    {
      question: "Tuğlalar 20 yerine 4 piksel kalınlığında, top yine 16 piksel çapında olsaydı, topun bir tuğlayı algılanmadan geçebilmesi için dikey hızı en az ne olmalıydı?",
      options: ["4 piksel/adımdan fazla", "16 piksel/adımdan fazla", "20 piksel/adımdan fazla", "36 piksel/adımdan fazla"],
      answer: 2,
      explanation:
        "Yakalama penceresi tuğlanın kalınlığı ile topun çapının toplamıdır: 4 + 16 = 20 piksel. Top merkezi bu aralığın içine düştüğü her adımda çarpışma algılanır; atlamak için sıçramanın 20 pikseli aşması gerekir. İnce engeli koruyan şey topun kendi büyüklüğüdür; nokta kadar bir top 4 pikselde tünellerdi.",
    },
    {
      question: "Top raketten düşeyle 40° yaparak çıktı ve bir sonraki raket vuruşuna kadar iki duvara, bir tavana ve üç tuğlaya çarptı. Rakete dönerken düşeyle yaptığı açının büyüklüğü nedir?",
      options: ["Her çarpışmada biraz azalmıştır", "40°", "50°", "Bilinemez; çarpışmaların sırasına bağlıdır"],
      answer: 1,
      explanation:
        "Duvar, tavan ve tuğla çarpışmaları hız bileşenlerinin yalnızca işaretini çevirir; büyüklükleri aynı kalır. Açının büyüklüğü |v<sub>x</sub>| / |v<sub>y</sub>| oranıyla belirlendiğinden değişmez. Hızlanma da iki bileşeni aynı oranla çarpar. Açıyı değiştiren tek şey rakettir.",
    },
  ],
  next: [
    { href: "pong.html", title: "Masa Tenisi (Pong)", why: "Aynı raket kuralının atası: 60°'lik uç vuruş ve bilgisayar rakibi yenmenin eşiği." },
    { href: "optik-yansima-kirilma.html", title: "Optik: Yansıma ve Kırılma", why: "Geliş açısı eşittir gidiş açısı; bu kez topla değil ışıkla, aynalar ve görüntülerle." },
    { href: "momentum-itme-ve-carpismalar.html", title: "Momentum, İtme ve Çarpışmalar", why: "Duvardan seken topun fiziği: esnek çarpışma, momentum değişimi ve itme." },
    { href: "vektorler.html", title: "Vektörler", why: "Hızı bileşenlere ayırma, iç çarpım ve v − 2(v·n)n formülünün arkasındaki araçlar." },
  ],
  sources: [
    { title: "Wikipedia · Breakout (video game)", url: "https://en.wikipedia.org/wiki/Breakout_(video_game)", note: "Bushnell ve Bristow'un fikri, Jobs ile Wozniak'ın prototipi, çip sayıları, özgün kurallar ve Apple II'ye etkisi (İngilizce)." },
    { title: "MDN · 2D collision detection", url: "https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection", note: "Eksen hizalı kutu, daire ve ayırıcı eksen sınamalarının kısa anlatımı ve örnek kodu." },
    { title: "MDN · 2D Breakout game using pure JavaScript", url: "https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript", note: "Bu sayfadakine çok benzeyen bir oyunu sıfırdan yazdıran adım adım öğretici." },
    { title: "arXiv · Playing Atari with Deep Reinforcement Learning (2013)", url: "https://arxiv.org/abs/1312.5602", note: "Breakout dahil yedi Atari oyununu piksellerden öğrenen DeepMind makalesi; köprü bölümündeki çalışma." },
  ],
  revision: "Kasım 2026",
};
