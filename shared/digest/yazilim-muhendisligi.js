window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yazilim-muhendisligi"] = {
  slug: "yazilim-muhendisligi",
  title: "Yazılım Mühendisliği: Kodun Ötesindeki Zanaat",
  field: "Mühendislik",
  level: "Lise",
  minutes: 35,
  tagline:
    "Bir satır kod yazmak kolaydır; on milyon satırı yüz kişiyle, on yıl boyunca, kimseyi öldürmeden değiştirmek değil. Yazılım mühendisliği bu ikinci işin bilimidir.",
  hook:
    "1 Ağustos 2012 sabahı, New York'ta bir aracı kurumun sunucularına yeni bir sürüm yüklendi; sekiz sunucudan yedisi güncellendi, biri unutuldu. Kırk beş dakika sonra şirket 440 milyon dolar kaybetmişti ve kodun tek bir satırı bile yanlış değildi. Yanlış olan, kodun nasıl dağıtıldığıydı. Peki 'doğru kod' neden yetmez?",
  bigIdea:
    "Yazılım mühendisliği, kodu değil <strong>değişimi</strong> yönetir: gereksinimler değişir, ekipler büyür, hatalar geç bulundukça pahalılaşır; bu yüzden işi küçük adımlara böler, her adımı test eder, her sürümü geri alınabilir tutar.",
  story: [
    "Terim bir kışkırtma olarak doğdu. 1968 Ekim'inde NATO Bilim Komitesi, Almanya'nın Garmisch kasabasında yaklaşık elli bilgisayar bilimcisini topladı; toplantıya 'yazılım mühendisliği' adını veren Friedrich L. Bauer, bu adı özellikle seçmişti: köprü yapan mühendisler gibi hesaplı, ölçülü ve sorumlu çalışmayı henüz kimse yazılımda beceremiyordu. Toplantının tutanaklarında bugün de kullanılan bir deyim geçer: <strong>yazılım krizi</strong>. Projeler bütçeyi iki üç katına aşıyor, yıllarca gecikiyor, teslim edildiğinde de çalışmıyordu. Aynı yıllarda Boston'da, MIT Alet Laboratuvarı'nda Apollo uçuş yazılımını yöneten Margaret Hamilton da aynı deyimi kullanıyordu; ekibinin işinin donanım mühendisliği kadar ciddiye alınması için.",
    "Krizin en ünlü anatomisini Fred Brooks yazdı. IBM'in OS/360 işletim sistemi projesini yönetmiş, geciken projeye adam ekledikçe daha da geciktiğini görmüştü. 1975'te yayımladığı <em>The Mythical Man-Month</em> (Efsanevi Adam-Ay) bu gözlemi bir yasaya çevirdi: 'Geç kalmış bir yazılım projesine insan eklemek onu daha da geciktirir.' Nedeni basit aritmetikti: n kişilik bir ekipte n(n−1)/2 iletişim yolu vardır; beş kişide 10, yirmi kişide 190. Yeni gelenlerin eğitimi ve çoğalan konuşmalar, eklenen iş gücünü yer. 1970'te Winston Royce'un yayımladığı bir makale, analizden bakıma uzanan sıralı aşamaları çizmişti; ironik olan, Royce'un bu düz akışın (sonradan <strong>şelale</strong> denecek modelin) riskli olduğunu, geri dönüşler gerektiğini aynı makalede söylemesidir. Yıllarca yalnızca şema hatırlandı, uyarı unutuldu.",
    "Bedeli yalnızca para değildi. 1985–1987 arasında Therac-25 adlı radyoterapi cihazı, bir yarış koşulu (iki işlemin zamanlamasına bağlı hata) yüzünden hastalara planlananın kat kat üstünde doz verdi; altı kaza, en az üç ölüm. Önceki modellerdeki donanım kilitleri kaldırılmış, güvenlik tümüyle yazılıma bırakılmıştı. 4 Haziran 1996'da Avrupa'nın yeni roketi Ariane 5, ilk uçuşunda kalkıştan kırk saniye kadar sonra kendini imha etti: Ariane 4'ten aynen alınan bir yönlendirme kodu, 64 bitlik bir ondalık sayıyı 16 bitlik bir tam sayıya sığdırmaya çalışırken taştı. Daha hızlı roket, eski varsayımı geçersiz kılmıştı. 1999'da NASA'nın Mars Climate Orbiter aracı, bir yazılım itme kuvvetini pound-saniye, öteki newton-saniye beklediği için gezegene fazla alçaktan girip kayboldu. Üç kazada da hata tek bir satırda değil, parçaların birbirine güvendiği yerdeydi.",
    "Cevap yavaş yavaş biçimlendi. 1994'te dört yazar (Gamma, Helm, Johnson, Vlissides; 'Dörtlü Çete') tekrar eden tasarım sorunlarına 23 adlandırılmış çözüm katalogladı; sayfadaki tasarım deseni kartları o kitaptan gelir. Şubat 2001'de Utah'ta Snowbird kayak merkezinde on yedi yazılımcı <strong>Çevik Manifesto</strong>'yu imzaladı: kapsamlı belgeden çok çalışan yazılım, plana körü körüne uymaktan çok değişime yanıt. Nisan 2005'te Linus Torvalds, Linux çekirdeğinin binlerce katkıcısını yönetebilmek için Git'i birkaç hafta içinde yazdı; 2010'da Vincent Driessen'in bir blog yazısı, sayfadaki tuvalin çizdiği Git Flow dallanma modelini yaydı. Bugün büyük bir ekipte kod, yazıldığı anda otomatik testlerden geçer, dakikalar içinde üretime çıkar ve gerekirse tek tuşla geri alınır. Mühendislik, kahramanlıktan rutine dönüştüğünde başarmış demektir.",
  ],
  core: [
    {
      heading: "Ölçek her şeyi değiştirir: Brooks yasası",
      body:
        "Tek başına yazdığın bir programda bütün bilgi kafandadır. İkinci kişi gelince bir iletişim yolu açılır; üçüncüde üç, onuncuda kırk beş. Herkesin herkesle konuşması gereken bir ekipte eklenen her kişi, kendi işinden fazlasını toplantıya götürür. Brooks'un yasası bunun sonucudur: işi parçalara bölmek, parçaların arasına net <strong>arayüzler</strong> koymak ve iletişim yollarını azaltmak, daha çok insan eklemekten daha güçlüdür. Mikroservis mimarisinin 'takım otonomisi' vaadi de, bir fonksiyonun 5–15 satır olması önerisi de aynı fikrin farklı ölçeklerdeki yansımasıdır.",
      formula: "Yol sayısı = n(n − 1)/2",
      formulaNote: "n ekip büyüklüğü. 5 kişi: 10 yol; 10 kişi: 45; 20 kişi: 190. İnsan iki katına çıkınca iletişim dörde katlanır.",
    },
    {
      heading: "Hatanın fiyatı bulunduğu aşamaya göre artar",
      body:
        "Gereksinim toplanırken fark edilen bir yanlış anlama bir cümleyle düzelir. Aynı yanlış tasarıma geçmişse birkaç diyagram, koda geçmişse yüzlerce satır, üretime çıkmışsa müşteri verisi ve itibar değişir. Barry Boehm'un 1981'de derlediği proje verileri bu artışın kat kat, çoğu projede on katlar düzeyinde olduğunu gösteriyordu. Sayfadaki SDLC şeridinde 'Test' aşamasına tıkladığında göreceğin <strong>sola kaydırma</strong> (shift-left) fikri buradan çıkar: testi sona bırakma, en başa çek. Çevik yöntemlerin iki haftalık döngüleri de aynı amaca hizmet eder; her döngü sonunda çalışan bir parça teslim edilir, yanlış anlama en geç iki hafta sonra ortaya çıkar.",
      formula: "Düzeltme maliyeti ∝ (aşama sayısı)↑",
      formulaNote: "Kesin bir denklem değil, gözlemsel bir eğilim; oran projeye göre değişir ama yönü değişmez.",
    },
    {
      heading: "Sürüm kontrolü bir çizgedir",
      body:
        "Git'te her <strong>commit</strong>, dosyaların o anki tam fotoğrafı artı 'ebeveyn' commit'inin kimliğidir. Kimlik, içeriğin SHA-1 özetinden türeyen 40 karakterlik bir onaltılık sayıdır; tek bir harf değişse kimlik değişir, bu yüzden geçmişi sessizce değiştirmek imkânsızdır. Bir <strong>dal</strong> (branch) yalnızca bir commit'i gösteren hareketli bir etikettir; dal açmak bir satırlık bir işlemdir, kopya çıkarmak değil. <strong>Birleştirme</strong> (merge) ise iki ebeveyni olan özel bir commit'tir. Sayfadaki tuval tam bunu çizer: develop satırındaki noktalar, feature/login satırına çıkan kesikli ok ve geri dönen 'merge' noktası. Git Flow, bu çizgeye bir düzen önerir: main yalnızca yayımlanmış sürümleri, develop entegrasyonu, feature dalları yarım işleri taşır.",
      formula: "commit = (ağaç, ebeveyn(ler), mesaj, yazar) → SHA-1 (40 hex)",
      formulaNote: "Merge commit'inin iki ebeveyni vardır; geçmişi okumak, bu yönlü çizgeyi gezmektir.",
    },
    {
      heading: "SOLID: değişime karşı tasarlamak",
      body:
        "Beş ilke tek bir soruya cevap arar: gereksinim değiştiğinde kaç dosyaya dokunman gerekir? Bir sınıfın tek değişim nedeni olsun (S); yeni davranış eski kodu değiştirerek değil, yanına ekleyerek gelsin (O); alt sınıf üst sınıfın yerine geçtiğinde program bozulmasın (L); kimse kullanmadığı yöntemleri taşımak zorunda kalmasın (I); büyük parçalar küçük parçalara değil soyutlamalara yaslansın (D). L harfi Barbara Liskov'a aittir; 1987'de ortaya attığı ilke, sayfadaki 'Kare extends Dikdortgen' örneğinin neden tuzak olduğunu söyler: karenin bir kenarını değiştirince öteki de değişir, dikdörtgen bekleyen kod şaşırır. Liskov 2008'de Turing Ödülü aldı.",
      formula: "Alt tür T, üst tür S'nin yerine geçtiğinde program davranışı korunmalı",
      formulaNote: "Kalıtım 'bir tür ...dır' cümlesini değil, 'onun yerine geçebilir' sözünü gerektirir.",
    },
    {
      heading: "Test piramidi ve sürekli entegrasyon",
      body:
        "Dijkstra'nın 1970 dolayındaki uyarısı hâlâ geçerlidir: test, hatanın varlığını gösterebilir, yokluğunu asla. Yine de iyi kurulmuş bir test paketi her değişikliğin ardından dakikalar içinde 'bildiğimiz hiçbir şeyi bozmadın' der. Sayfadaki piramit (Mike Cohn, 2009) bunun ekonomisini çizer: milisaniyeler süren binlerce <strong>birim testi</strong> altta, saniyeler süren yüzlerce entegrasyon testi ortada, dakikalar süren onlarca uçtan uca test tepede. <strong>Sürekli entegrasyon</strong> (CI) bu paketi her commit'te otomatik çalıştırır; sürekli dağıtım (CD) geçen sürümü üretime taşır. Knight Capital'in 440 milyon dolarlık sabahı, 'Deploy' adımının elle yapıldığı bir zincirin fiyatıdır.",
      formula: "T<sub>toplam</sub> = Σ (test sayısı × test süresi)",
      formulaNote: "Piramit ters çevrilirse aynı kapsama saatler sürer; çözümlü örnekte hesaplıyoruz.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört etkileşimli alan var: tıklanabilir altı aşamalı <strong>SDLC</strong> şeridi (Analiz … Bakım), üç sekmeli <strong>Tasarım Desenleri</strong> paneli (her sekmede beş kart), dört düğmeli <strong>Git Flow</strong> tuvali (<strong>➕ Commit</strong>, <strong>🌿 Feature Branch</strong>, <strong>🔀 Merge</strong>, <strong>↺ Sıfırla</strong>) ve sekiz kartlı <strong>Kod Kalitesi</strong> paneli. Tuval sayı göstermez; gözlem aracın nokta sayısı, aralıklar ve oklar. Sayfanın kendi kodu da bir inceleme nesnesi: aşağıdaki deneylerden biri gerçek bir hatayı bulduruyor.",
    experiments: [
      {
        title: "Üçüncü commit'te sıkışan zaman çizgisi",
        predict: "Tuval üç noktayla açılır (init, setu, core). ➕ Commit'e her bastığında noktaların arası daralır mı, yoksa bir süre aynı kalıp sonra mı daralır? Yeni noktaların üstünde ne yazacak?",
        do: "↺ Sıfırla'ya bas. ➕ Commit'e bir kez bas, aralığı göz kararı ölçüsüne al (bir cetveli ekrana tutabilirsin); ikinci ve üçüncü kez bas, her seferinde ilk üç noktanın yerini karşılaştır.",
        observe: "İlk iki tıklamada eski noktalar kıpırdamaz, yeni nokta sağa eklenir. Üçüncü tıklamada bütün noktalar sola kayar ve aralık yaklaşık yedide bir daralır; sonraki her tıklama biraz daha sıkıştırır. Yeni noktaların etiketi hep 'feat'.",
        explain: "Kod aralığı (genişlik − 80) / max(6, n+1) ile hesaplar; n sıradaki commit numarası. Tuvalde toplam altı commit olana kadar payda 6'da sabit kalır; altıncı commit (üçüncü basış) paydayı 7'ye çıkarır ve sonraki her commit biraz daha büyütür: geniş ekranda 124 piksel, 106, 93… Etiketler 'feat-4', 'feat-5' diye üretilir ama yalnızca ilk dört harf çizilir.",
      },
      {
        title: "Dal aç, birleştir, oku kimden çıkıyor?",
        predict: "🌿 Feature Branch'e basınca yeni satır nereden dallanır: son develop commit'inden mi, ilkinden mi? 🔀 Merge'den sonra geri dönen ok, dalın son noktasından mı başlar?",
        do: "↺ Sıfırla, sonra bir kez 🌿 Feature Branch. Üst satırdaki iki yeni noktayı ve kesikli oku incele. Ardından 🔀 Merge'e bas ve develop satırına eklenen 'merg' noktasına gelen oku izle.",
        observe: "Üst satırda 'logi' noktası tam 'core'un üstünde, 'wip' bir yuva sağda belirir; satırın adı ve kesikli kılavuz çizgisi yoktur, noktalar beyazdır. Dallanma oku 'core'dan değil, en soldaki 'init'ten çıkar. Merge oku da 'wip'ten değil 'logi'den gelir.",
        explain: "Mantık doğru, uygulama hatalı: kod kaynak commit'i 'x'i küçük olan ilk eşleşme' ile arar; ilk eşleşme her zaman en eski commit'tir, oysa en yakını gerekir. Renk tablosu 'feature' anahtarını tanır, commit ise 'feature/login' adını taşır; bu uyuşmazlık satırı etiketsiz bırakır. İki küçük hata, bir kod incelemesinde yakalanacak türden.",
      },
      {
        title: "Düğme hiçbir şey yapmadığında",
        predict: "Hiç dal açmadan 🔀 Merge'e basarsan ne olur: hata mı, boş bir merge noktası mı, hiçbir şey mi? Peki araya commit koymadan iki kez 🌿 Feature Branch'e basarsan kaç yeni nokta görürsün?",
        do: "↺ Sıfırla, doğrudan 🔀 Merge'e bas. Sonra 🌿 Feature Branch'e arka arkaya iki kez bas ve üst satırdaki noktaları say.",
        observe: "Merge tek başına hiçbir şey çizmez; sayfa sessiz kalır. İki Feature Branch sonrasında üst satırda üç nokta görürsün, dört değil: ikinci 'logi' birincisinin tam üstüne biner, 'wip' noktaları ise iki ayrı yuvaya düşer.",
        explain: "Merge kodu bir koruma cümlesiyle başlar: dal yoksa çık. Bu, çökmeyi önleyen doğru bir savunma; ama kullanıcıya hiçbir şey söylemediği için eksik bir arayüz. Dallanma noktası her zaman son develop commit'inin yuvasına yerleşir; develop ilerlemediyse aynı yere iki nokta çizilir. İyi bir arayüz düğmeyi geçersiz durumda devre dışı bırakırdı.",
      },
      {
        title: "Kare, dikdörtgenin yerine geçebilir mi?",
        predict: "SOLID panelinde L kartının ❌ örneğini oku: Kare, Dikdortgen'den türüyor. Bir dikdörtgen bekleyen kod genişliği 5, yüksekliği 3 yapıp alanı isterse 15 bekler. Elindeki nesne kareyse kaç alır?",
        do: "L kartındaki ❌ ve ✅ satırlarını karşılaştır. Sonra Kod Kalitesi panelinde 'Magic Numbers' kartına tıkla ve koddaki 86400 sayısının ne olduğunu, sayfanın verdiği isme bakmadan önce kendin hesapla.",
        observe: "Karede setYukseklik(3) genişliği de 3'e çeker; alan 9 çıkar, 15 değil. ✅ çözümde ikisi de yalnızca ortak bir Sekil arayüzünü uygular, kalıtım yoktur. 86400 = 24 × 60 × 60, kartın verdiği ad SECONDS_PER_DAY.",
        explain: "Geometride kare bir dikdörtgendir; ama değiştirilebilir nesneler dünyasında 'kenarlar bağımsız ayarlanabilir' sözünü tutamaz. Liskov ilkesi tam bunu sorar: üst türün bütün sözleri alt türde de geçerli mi? Sihirli sayı ise aynı sorunun küçük ölçeği: anlamı kodda değil okuyanın kafasında olan bilgi, bir gün yanlış hatırlanır.",
      },
    ],
  },
  wow: [
    {
      title: "Kırk beş dakikada 440 milyon dolar",
      body:
        "1 Ağustos 2012'de Knight Capital, borsa yazılımının yeni sürümünü sekiz sunucudan yedisine yükledi. Sekizincide, yıllardır kullanılmayan eski bir test kodu duruyordu ve yeni sürümün yeniden anlam verdiği bir bayrak o kodu uyandırdı. Sunucu piyasa açılır açılmaz milyonlarca hatalı emir gönderdi; borsa açılışından yaklaşık kırk beş dakika sonra zarar 440 milyon dolara ulaşmıştı. Şirket haftalar içinde satıldı. Kod hatasız sayılırdı; dağıtım süreci değildi.",
    },
    {
      title: "Ay'a inerken alarm çalan bilgisayar",
      body:
        "20 Temmuz 1969'da Apollo 11'in iniş aracı Ay yüzeyine yaklaşırken bilgisayar '1202' ve '1201' alarmları verdi: yanlış konumlanmış bir radar anahtarı yüzünden işlemciye kapasitesinin üstünde iş yağıyordu. Margaret Hamilton'ın ekibinin tasarladığı yazılım, işleri önceliğe göre sıralıyor ve dolunca düşük öncelikli olanları bırakıyordu. Bilgisayar çökmedi, iniş hesaplarını sürdürdü ve Armstrong indi. Hamilton 2016'da Başkanlık Özgürlük Madalyası aldı.",
    },
    {
      title: "İki milyar satırlık tek depo",
      body:
        "Google mühendisleri 2016'da yayımladıkları bir makalede şirketin neredeyse bütün kodunu tek bir depoda tuttuğunu anlattı: yaklaşık iki milyar satır kod, 86 terabayt veri ve günde on binlerce commit. Böyle bir ölçekte 'merge' bir düğme değil, saniyede binlerce testi çalıştıran devasa bir sistemdir. Sayfadaki tuvalde elli commit sonra noktalar birbirine değer; gerçek dünyada o noktaları insanlar değil makineler çizer.",
    },
  ],
  worked: {
    title: "Test piramidi ters dönerse",
    prompt:
      "Bir ekibin test paketinde 1000 birim testi (her biri 10 ms), 100 entegrasyon testi (her biri 1 s) ve 10 uçtan uca test (her biri 30 s) olsun. Paketin toplam süresini bul. Sonra piramidi ters çevir: 10 birim, 100 entegrasyon, 1000 uçtan uca test; süre ne olur?",
    steps: [
      "Her katmanın süresini sayı × süre olarak yaz. Birim: 1000 × 0.010 s = 10 s. Entegrasyon: 100 × 1 s = 100 s. Uçtan uca: 10 × 30 s = 300 s.",
      "Topla: 10 + 100 + 300 = 410 s ≈ 6.8 dakika. Her commit'te bu kadar beklemek, bir çay molası; sürekli entegrasyon için kabul edilebilir.",
      "Ters piramit: birim 10 × 0.010 s = 0.1 s; entegrasyon yine 100 s; uçtan uca 1000 × 30 s = 30 000 s.",
      "Topla: 0.1 + 100 + 30 000 ≈ 30 100 s ≈ 8.4 saat. Aynı 1110 test, 74 kat daha uzun sürer; hiçbir ekip her commit'te bir iş günü beklemez, testler kapatılır ve hata üretime kaçar.",
    ],
    result:
      "Normal piramit 6.8 dakika, ters piramit 8.4 saat. Tepedeki testler tek başına yavaş değil, pahalı olanın sayısı kritik: süreyi belirleyen en ağır katmanın çarpımıdır.",
  },
  misconceptions: [
    {
      myth: "Yazılım mühendisliği, iyi kod yazmaktır.",
      truth:
        "Kod işin görünen kısmı. Knight Capital'de kod hatasızdı, dağıtım yarım kaldı; Mars Climate Orbiter'da iki program ayrı ayrı doğruydu, birimleri uyuşmadı. Mühendislik; gereksinimi anlamayı, parçaların sözleşmesini yazmayı, test etmeyi, sürümü geri alabilmeyi ve ekibi örgütlemeyi kapsar. Sayfadaki SDLC şeridinde 'Geliştirme' altı aşamadan yalnızca biridir.",
    },
    {
      myth: "Proje gecikiyorsa daha çok programcı almak işi hızlandırır.",
      truth:
        "Brooks yasasının tam tersi: yeni gelenler eğitilmeli, iletişim yolları n(n−1)/2 ile büyür. Beş kişiye beş kişi daha eklemek on yolu kırk beşe çıkarır. İş gerçekten bağımsız parçalara bölünebiliyorsa ve arayüzler netse ekleme işe yarayabilir; ama 'adam-ay' birimi, dokuz kadının bir ayda bebek doğuramayacağı kadar yanıltıcıdır.",
    },
    {
      myth: "Bütün testler geçtiyse program hatasızdır.",
      truth:
        "Test yalnızca denediğin girdileri sınar. Dijkstra'nın sözüyle test hatanın varlığını gösterir, yokluğunu değil. Therac-25'in yarış koşulu ancak operatör belirli tuşları belirli bir hızla bastığında ortaya çıkıyordu; sıradan testler bunu hiç görmedi. Geçen testler güven verir, kanıt değil.",
    },
    {
      myth: "Git'te dal açmak dosyaların kopyasını çıkarır.",
      truth:
        "Bir dal, tek bir commit'i gösteren küçük bir etikettir; açmak milisaniye sürer ve disk yer kaplamaz. Commit'ler ise içeriğin özetiyle adlandırıldığı için aynı dosya yüz dalda da bir kez saklanır. Tuvalde 🌿 Feature Branch'in çizdiği yeni satır, kopya değil, çizgede yeni bir yoldur.",
    },
  ],
  glossary: [
    { term: "SDLC (yazılım geliştirme yaşam döngüsü)", definition: "Analiz, tasarım, geliştirme, test, dağıtım ve bakım aşamalarının bütünü; şelalede sırayla, çevikte döngü döngü yürür." },
    { term: "Gereksinim", definition: "Yazılımın ne yapması gerektiğinin, nasıl yapacağından bağımsız, doğrulanabilir ifadesi." },
    { term: "Refactoring (yeniden düzenleme)", definition: "Programın davranışını değiştirmeden iç yapısını iyileştirmek; testler bu sırada emniyet kemeridir." },
    { term: "Code smell (kod kokusu)", definition: "Kesin hata olmayan ama derinde bir tasarım sorununa işaret eden belirti; uzun yöntem, sihirli sayı, kopya kod." },
    { term: "Commit", definition: "Git'te dosyaların bir anlık görüntüsü, ebeveyn bağlantısı ve açıklama; 40 karakterlik SHA-1 özetiyle adlandırılır." },
    { term: "Merge (birleştirme)", definition: "İki dalın geçmişini tek noktada buluşturan, iki ebeveyni olan commit." },
    { term: "Sürekli entegrasyon (CI)", definition: "Her commit'te derleme ve test paketinin otomatik çalışması; hatayı dakikalar içinde yüzeye çıkarır." },
    { term: "Bug (hata)", definition: "Programın beklenen davranıştan sapması; Grace Hopper'ın ekibi 1947'de Harvard Mark II'nin rölesine sıkışan gerçek bir güveyi kayıt defterine yapıştırmıştı." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede programlama tek kişilik bir iştir: yaz, çalıştır, gör. Üniversitede yazılım mühendisliği dersi ilk kez başkasının kodunu okumayı, bir <strong>belirtim</strong> (spec) yazmayı ve ona karşı test üretmeyi öğretir. Önkoşul, sonkoşul ve değişmez (invariant) kavramları, bir fonksiyonun 'sözleşmesi' olarak biçimselleşir; Liskov ilkesi bu sözleşmelerin kalıtımda nasıl korunacağını söyleyen bir teoreme dönüşür. Tasarım desenleri ezberlenecek bir liste değil, bu sözleşmeleri değişime dayanıklı kurmanın örüntüleri olarak yeniden okunur.",
      "Daha ileride yollar ayrılır. <strong>Biçimsel yöntemler</strong>, Therac-25 ya da Ariane gibi hatayı test ile değil matematiksel ispatla dışlamayı amaçlar; uçak ve tren yazılımları bu yolla doğrulanır. <strong>Dağıtık sistemler</strong> dersi, mikroservis kartındaki 'eventual consistency' sözünün arkasındaki teoremleri (CAP, uzlaşma algoritmaları) açar. Yazılım ekonomisi ve süreç yönetimi, Brooks'un gözlemlerini ölçülebilir modellere çevirir. Ve her yolda aynı soru yürür: değişen bir dünyada, çalışan bir şeyi bozmadan nasıl değiştirirsin?",
    ],
    topics: ["Belirtim ve sözleşmeyle tasarım", "Biçimsel doğrulama ve model denetimi", "Dağıtık sistemler ve tutarlılık", "Yazılım mimarisi", "Sürüm kontrol teorisi (çizgeler, üç yollu birleştirme)", "Yazılım ölçümü ve proje ekonomisi"],
  },
  quiz: [
    {
      question: "Beş kişilik bir ekibe beş kişi daha katılırsa ekipteki ikili iletişim yolu sayısı nasıl değişir?",
      options: ["10'dan 20'ye çıkar", "10'dan 45'e çıkar", "5'ten 10'a çıkar", "Değişmez; iş bölünür"],
      answer: 1,
      explanation: "Yol sayısı n(n−1)/2'dir: 5 kişide 10, 10 kişide 45. İnsan iki katına çıkınca iletişim dört buçuk katına çıkar; Brooks yasasının aritmetik çekirdeği budur.",
    },
    {
      question: "Git'te 'merge' commit'ini sıradan bir commit'ten ayıran nedir?",
      options: ["Dosyaların kopyasını içermesi", "SHA-1 özeti olmaması", "İki ebeveyni olması", "Yalnızca main dalında bulunabilmesi"],
      answer: 2,
      explanation: "Birleştirme, iki dalın geçmişini buluşturur; bu yüzden commit çizgesinde iki ebeveyne bağlanır. Tuvalde 'merg' noktasına hem develop satırından hem feature satırından çizgi gelmesi bunun resmidir.",
    },
    {
      question: "Sayfadaki tuvalde ↺ Sıfırla'dan sonra ➕ Commit'e kaçıncı basışta eski noktalar ilk kez yer değiştirir?",
      options: ["Birinci", "İkinci", "Üçüncü", "Hiçbir zaman; yalnızca yeni nokta eklenir"],
      answer: 2,
      explanation: "Aralık (genişlik − 80)/max(6, yuva+1) ile hesaplanır; 'yuva' bir sonraki commit'in sırasıdır ve başta 3'tür. Birinci ve ikinci basıştan sonra 4 ve 5 olur, payda hâlâ 6'dır. Üçüncü basıştan sonra yuva 6, payda 7 olur ve bütün noktalar sıkışır.",
    },
  ],
  next: [
    { href: "tasarim-desenleri.html", title: "Tasarım Desenleri", why: "Bu sayfadaki on beş kartın ötesi: Dörtlü Çete'nin kataloğunu daha derin ve etkileşimli incele." },
    { href: "programlama-paradigmalari.html", title: "Programlama Paradigmaları", why: "SOLID'in dayandığı nesne yönelimi, fonksiyonel düşünceyle yan yana: aynı sorunu farklı dillerde çözmek." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "n(n−1)/2'nin neden 'O(n²)' olduğunu ve ölçeğin neden her şeyi değiştirdiğini matematiğiyle gör." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Commit kimliklerini üreten özet fonksiyonları ve 'geçmişi sessizce değiştiremezsin' sözünün kriptografik temeli." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 6.005 Software Construction (Spring 2016)", url: "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/", note: "Belirtim, test, sürüm kontrolü ve değişime dayanıklı tasarım; üniversite birinci sınıf düzeyinde açık ders (İngilizce)." },
    { title: "Wikipedia · Software engineering", url: "https://en.wikipedia.org/wiki/Software_engineering", note: "1968 NATO konferansı, yazılım krizi ve disiplinin tarihçesi için başlangıç noktası." },
    { title: "Wikipedia · The Mythical Man-Month", url: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month", note: "Brooks yasası, OS/360 deneyimi ve iletişim yolları aritmetiği." },
    { title: "Vikipedi · Git", url: "https://tr.wikipedia.org/wiki/Git", note: "Git'in 2005'teki doğuşu, commit çizgesi ve dallanma kavramları (Türkçe)." },
  ],
  revision: "Ekim 2026",
};
