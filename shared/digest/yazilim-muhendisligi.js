window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yazilim-muhendisligi"] = {
  slug: "yazilim-muhendisligi",
  title: "Yazılım Mühendisliği: Kodun Ötesindeki Zanaat",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir satır kod yazmak kolaydır; on milyon satırı yüz kişiyle, on yıl boyunca, kimseyi öldürmeden değiştirmek değil. Yazılım mühendisliği bu ikinci işin disiplinidir.",
  hook:
    "1 Ağustos 2012 sabahı, New York'ta bir aracı kurumun sunucularına yeni bir sürüm yüklendi; sekiz sunucudan yedisi güncellendi, biri unutuldu. Borsa açıldıktan kırk beş dakika sonra şirket yaklaşık 440 milyon dolar kaybetmişti. Yeni sürüm, yüklendiği yedi sunucuda doğru çalışıyordu; yanlış olan, kodun nasıl dağıtıldığıydı. Peki 'doğru kod' neden yetmez?",
  bigIdea:
    "Yazılım mühendisliği, kodu değil <strong>değişimi</strong> yönetir: gereksinimler değişir, ekipler büyür, hatalar geç bulundukça pahalılaşır; bu yüzden işi küçük adımlara böler, her adımı test eder, her sürümü geri alınabilir tutar.",
  story: [
    "Terim bir kışkırtma olarak doğdu. 1968 Ekim'inde NATO Bilim Komitesi, Almanya'nın Garmisch kasabasında yaklaşık elli bilgisayar bilimcisini topladı; toplantının başlığına o günlerde pek bilinmeyen 'yazılım mühendisliği' sözünü koyduran Friedrich L. Bauer, bu adı bile bile kışkırtıcı olsun diye seçmişti: köprü yapan mühendisler gibi hesaplı, ölçülü ve sorumlu çalışmayı yazılımda henüz kimse beceremiyordu. Toplantının tutanaklarında bugün de kullanılan bir deyim geçer: <strong>yazılım krizi</strong>. Projeler bütçesini aşıyor, gecikiyor, teslim edildiğinde de beklenen işi görmüyordu. Söz büsbütün yeni değildi: Anthony Oettinger 1966'da bir ACM yazısında kullanmıştı; aynı yıllarda MIT Alet Laboratuvarı'nda Apollo uçuş yazılımı ekibini yöneten Margaret Hamilton da işine 'yazılım mühendisliği' diyordu, ekibinin emeği donanım mühendisliği kadar ciddiye alınsın diye.",
    "Krizin en ünlü anatomisini Fred Brooks yazdı. IBM'in OS/360 işletim sistemi projesini yönetmiş, geciken projeye adam ekledikçe daha da geciktiğini görmüştü. 1975'te yayımladığı <em>The Mythical Man-Month</em> (Efsanevi Adam-Ay) bu gözlemi bir yasaya çevirdi: 'Geç kalmış bir yazılım projesine insan eklemek onu daha da geciktirir.' Nedeni basit aritmetikti: n kişilik bir ekipte n(n−1)/2 iletişim yolu vardır; beş kişide 10, yirmi kişide 190. Yeni gelenlerin eğitimi ve çoğalan konuşmalar, eklenen iş gücünü yer. 1970'te Winston Royce'un yayımladığı bir makale, gereksinimden işletime uzanan yedi sıralı aşamayı çizmişti. Makalede 'şelale' sözcüğü geçmez; ad sonradan takıldı. Daha ironik olan, Royce'un bu düz akış için aynı makalede 'risklidir ve başarısızlığa davet çıkarır' demesi, aşamalar arasında geri dönüşler ve işin iki kez yapılmasını (önce bir deneme sürümü) önermesidir. Yıllarca yalnızca ilk şema hatırlandı, uyarı unutuldu.",
    "Bedeli yalnızca para değildi. 1985–1987 arasında Therac-25 adlı radyoterapi cihazı, bir yarış koşulu (iki işlemin zamanlamasına bağlı hata) yüzünden hastalara planlananın kat kat üstünde doz verdi; belgelenen altı kazada hastalar ağır yaralandı, bir bölümü hayatını kaybetti. Önceki modellerdeki donanım kilitleri kaldırılmış, güvenlik tümüyle yazılıma bırakılmıştı. 4 Haziran 1996'da Avrupa'nın yeni roketi Ariane 5, ilk uçuşunda kalkıştan kırk saniye kadar sonra kendini imha etti: Ariane 4'ten aynen alınan atalet referans sistemi kodu, 64 bitlik bir kayan noktalı sayıyı 16 bitlik işaretli bir tam sayıya sığdırmaya çalışırken taştı. Daha hızlı roket, eski varsayımı geçersiz kılmıştı. 1999'da NASA'nın Mars Climate Orbiter aracı, bir yazılım iticilerin itmesini (impuls) pound-kuvvet·saniye olarak yazdığı, öteki newton·saniye beklediği için gezegene fazla alçaktan girip kayboldu. Üç kazada da hata tek bir satırda değil, parçaların birbirine güvendiği yerdeydi.",
    "Cevap yavaş yavaş biçimlendi. 1994'te dört yazar (Gamma, Helm, Johnson, Vlissides; 'Dörtlü Çete') tekrar eden tasarım sorunlarına 23 adlandırılmış çözüm katalogladı; sayfadaki tasarım deseni kartları o kitaptan gelir. Şubat 2001'de Utah'ta Snowbird kayak merkezinde on yedi yazılımcı <strong>Çevik Manifesto</strong>'yu imzaladı: kapsamlı belgeden çok çalışan yazılım, plana körü körüne uymaktan çok değişime yanıt. Nisan 2005'te Linux çekirdeği ekibi, kullandığı BitKeeper adlı aracın ücretsiz lisansını yitirdi; Linus Torvalds yerine koyacağı Git'in ilk sürümünü günler içinde yazdı, birkaç hafta sonra çekirdek artık Git ile yönetiliyordu; 2010'da Vincent Driessen'in bir blog yazısı, sayfadaki tuvalin çizdiği Git Flow dallanma modelini yaydı. Bugün iyi kurulmuş bir ekipte kod, gönderildiği anda otomatik testlerden geçer, kısa sürede üretime çıkar ve gerekirse tek komutla geri alınır. Mühendislik, kahramanlıktan rutine dönüştüğünde başarmış demektir.",
  ],
  core: [
    {
      heading: "Ölçek her şeyi değiştirir: Brooks yasası",
      body:
        "Tek başına yazdığın bir programda bütün bilgi kafandadır. İkinci kişi gelince bir iletişim yolu açılır; üçüncüde üç, onuncuda kırk beş. Herkesin herkesle konuşması gereken bir ekipte eklenen her kişi, kendi işinden fazlasını toplantıya götürür. Brooks'un yasası bunun sonucudur: işi parçalara bölmek, parçaların arasına net <strong>arayüzler</strong> koymak ve iletişim yollarını azaltmak, daha çok insan eklemekten daha güçlüdür. Madalyonun öteki yüzünü Melvin Conway 1968'de yazdı: bir kurumun tasarladığı sistem, o kurumun iletişim yapısının kopyası olur. Brooks bu gözleme kitabında 'Conway yasası' adını verdi. Sayfadaki mikroservis kartının 'takım otonomisi' vaadi bu yasayı tersinden kullanır: önce ekipleri böl, mimari arkasından gelsin.",
      formula: "Yol sayısı = n(n − 1)/2",
      formulaNote: "n ekip büyüklüğü; n kişiden 2'li seçim sayısı C(n, 2). 5 kişi: 10 yol; 10 kişi: 45; 20 kişi: 190. Büyük n için yol sayısı ≈ n²/2: insan iki katına çıkınca iletişim yaklaşık dörde katlanır.",
    },
    {
      heading: "Hatanın fiyatı bulunduğu aşamaya göre artar",
      body:
        "Gereksinim toplanırken fark edilen bir yanlış anlama bir cümleyle düzelir. Aynı yanlış tasarıma geçmişse birkaç diyagram, koda geçmişse yüzlerce satır, üretime çıkmışsa müşteri verisi ve itibar değişir. Bu eğilimi sayıya döken Barry Boehm'dur: 1981 tarihli <em>Software Engineering Economics</em> kitabında derlediği proje verilerine dayanarak, 2001'de Victor Basili ile birlikte, teslimden sonra bulunan bir hatayı düzeltmenin büyük projelerde gereksinim aşamasındakinin çoğu kez 100 katına, küçük ve kritik olmayan projelerde ise 5 katı dolayına mal olduğunu yazdı. Sık sık 'her projede 100 kat' diye aktarılan sayı bu yüzden yanıltıcıdır: oran bir doğa sabiti değil, projenin büyüklüğüne ve değişikliğin ne kadar kolay geri alınabildiğine bağlı bir gözlemdir. Sayfadaki SDLC şeridinde 'Test' aşamasına tıkladığında göreceğin <strong>sola kaydırma</strong> (shift-left) fikri buradan çıkar: testi sona bırakma, en başa çek. Çevik yöntemlerin iki-dört haftalık döngüleri de aynı amaca hizmet eder: her döngü sonunda çalışan bir parça teslim edilir, yanlış anlama aylar sonra değil haftalar içinde ortaya çıkar ve eğrinin dik kısmına hiç varılmaz.",
      formula: "M<sub>teslim sonrası</sub> / M<sub>gereksinim</sub> ≈ 5 (küçük proje) … 100 (büyük proje)",
      formulaNote: "Boehm ve Basili'nin (2001) özetlediği gözlemsel aralık; bir denklem değil. M, aynı hatayı o aşamada düzeltmenin maliyeti. Oran projeye göre değişir, yönü değişmez.",
    },
    {
      heading: "Sürüm kontrolü bir çizgedir",
      body:
        "Git'te her <strong>commit</strong>, dosyaların o anki tam fotoğrafı artı 'ebeveyn' commit'inin kimliğidir. Kimlik, içeriğin SHA-1 özetinden türeyen 40 karakterlik bir onaltılık sayıdır; tek bir harf değişse kimlik değişir. Her commit ebeveyninin kimliğini de içerdiğinden eski bir commit'i değiştirmek ondan sonraki bütün kimlikleri değiştirir; geçmişle fark edilmeden oynanamaz. Bir <strong>dal</strong> (branch) yalnızca bir commit'i gösteren hareketli bir etikettir; dal açmak bir satırlık bir işlemdir, kopya çıkarmak değil. <strong>Birleştirme</strong> (merge) ise iki ebeveyni olan özel bir commit'tir. Sayfadaki tuval tam bunu çizer: develop satırındaki noktalar, son develop commit'inden feature satırına çıkan kesikli ok ve dalın ucundan develop'taki 'merge' noktasına dönen ikinci ok. Git Flow, bu çizgeye bir düzen önerir: main yalnızca yayımlanmış sürümleri, develop entegrasyonu, feature dalları yarım işleri taşır.",
      formula: "commit = (ağaç, ebeveyn(ler), mesaj, yazar) → SHA-1 (40 hex)",
      formulaNote: "Merge commit'inin iki ebeveyni vardır. Oklar hep geçmişe baktığı için çizgede döngü oluşamaz: geçmiş, yönlü ve döngüsüz bir çizgedir (DAG).",
    },
    {
      heading: "SOLID: değişime karşı tasarlamak",
      body:
        "Beş ilke tek bir soruya cevap arar: gereksinim değiştiğinde kaç dosyaya dokunman gerekir? Bir sınıfın tek değişim nedeni olsun (S); yeni davranış eski kodu değiştirerek değil, yanına ekleyerek gelsin (O); alt sınıf üst sınıfın yerine geçtiğinde program bozulmasın (L); kimse kullanmadığı yöntemleri taşımak zorunda kalmasın (I); büyük parçalar küçük parçalara değil soyutlamalara yaslansın (D). Beşliyi 2000'de Robert C. Martin derledi, baş harflerden SOLID sözcüğünü Michael Feathers türetti; ilkelerin kendisi daha eskidir. O harfi Bertrand Meyer'in 1988'deki kitabından, L harfi Barbara Liskov'dan gelir; Liskov'un 1987'de ortaya attığı ilke, sayfadaki 'Kare extends Dikdortgen' örneğinin neden tuzak olduğunu söyler: karenin bir kenarını değiştirince öteki de değişir, dikdörtgen bekleyen kod şaşırır. Liskov 2008'de Turing Ödülü aldı.",
      formula: "Alt tür T, üst tür S'nin yerine geçtiğinde program davranışı korunmalı",
      formulaNote: "Kalıtım 'bir tür ...dır' cümlesini değil, 'onun yerine geçebilir' sözünü gerektirir.",
    },
    {
      heading: "Test piramidi ve sürekli entegrasyon",
      body:
        "Dijkstra'nın 1970 dolayındaki uyarısı hâlâ geçerlidir: test, hatanın varlığını gösterebilir, yokluğunu asla. Yine de iyi kurulmuş bir test paketi her değişikliğin ardından dakikalar içinde 'bildiğimiz hiçbir şeyi bozmadın' der. Sayfadaki piramit (Mike Cohn, 2009) bunun ekonomisini çizer: milisaniyeler süren binlerce <strong>birim testi</strong> altta, saniyeler süren yüzlerce entegrasyon testi ortada, dakikalar süren onlarca uçtan uca test tepede. <strong>Sürekli entegrasyon</strong> (CI) bu paketi her commit'te otomatik çalıştırır; sürekli dağıtım (CD) geçen sürümü üretime taşır. Knight Capital'in 440 milyon dolarlık sabahı, 'Deploy' adımının elle ve ikinci bir göz denetlemeden yapıldığı bir zincirin fiyatıdır.",
      formula: "T<sub>toplam</sub> = Σ (test sayısı × test süresi)",
      formulaNote: "Piramit ters çevrilirse aynı kapsama saatler sürer; çözümlü örnekte hesaplıyoruz.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört etkileşimli alan var: tıklanabilir altı aşamalı <strong>SDLC</strong> şeridi (Analiz … Bakım), üç sekmeli <strong>Tasarım Desenleri</strong> paneli (her sekmede beş kart), dört düğmeli <strong>Git Flow</strong> tuvali (<strong>➕ Commit</strong>, <strong>🌿 Feature Branch</strong>, <strong>🔀 Merge</strong>, <strong>↺ Sıfırla</strong>) ve sekiz kartlı <strong>Kod Kalitesi</strong> paneli. Tuvalin altındaki durum satırı her hamleden sonra toplam commit sayısını, dallara dağılımını ve açık bir feature dalı olup olmadığını yazar; ölçüm aracın bu satır, noktalar ve kesikli oklardır.",
    experiments: [
      {
        title: "Fast-forward mı, gerçek birleştirme mi?",
        predict: "Bir dal açıp hemen birleştirirsen 'merge' noktasına kaç yönden çizgi gelir? Dal açıkken develop'a bir commit daha eklenirse resimde ne değişir? İki durumdan hangisinde Git, merge commit'i hiç oluşturmadan da işi bitirebilirdi?",
        do: "↺ Sıfırla, 🌿 Feature Branch, 🔀 Merge; resmi ve durum satırını not et. Sonra ↺ Sıfırla, 🌿 Feature Branch, ➕ Commit, 🔀 Merge ve iki resmi karşılaştır.",
        observe: "İlk dizide 'login' noktası 'core'un tam üstünde belirir, kesikli ok 'core'dan çıkar; 'wip'ten inen ikinci ok 'merge' noktasına varır. Durum satırı: toplam 6 commit, develop 4, feature/login 2. İkinci dizide develop satırında 'core' ile 'merge' arasına 'c5' girer; satır 7 commit, develop 5 der. İki resimde de 'merge' noktasına iki yoldan gelinir: develop çizgisinden ve feature'dan inen oktan.",
        explain: "İlk dizide develop, dal ayrıldıktan sonra hiç ilerlemedi: 'wip', 'core'un doğrudan torunu. Git böyle bir durumda varsayılan olarak <strong>fast-forward</strong> yapar, yani yeni commit üretmeden develop etiketini 'wip'e kaydırır. Git Flow ise dalın izini geçmişte tutmak için merge commit'ini zorlar (--no-ff); tuval bunu çizer. İkinci dizide geçmiş çatallanmıştır: 'c5' ile 'wip'in ortak atası 'core'dur ve iki ebeveynli bir commit kaçınılmazdır. Git bu durumda üç sürümü karşılaştırır (ortak ata ve iki uç); buna üç yollu birleştirme denir.",
      },
      {
        title: "Altıncı commit'te sıkışan zaman çizgisi",
        predict: "Tuval üç noktayla açılır (init, setup, core). ➕ Commit'e her bastığında noktaların arası daralır mı, yoksa bir süre aynı kalıp sonra mı daralır?",
        do: "↺ Sıfırla. ➕ Commit'e bir kez bas ve 'init' ile 'setup' arasını göz kararı ölç (ekrana bir kâğıt şeridi tutabilirsin). İkinci ve üçüncü kez bas; her seferinde ilk üç noktanın yerini karşılaştır.",
        observe: "İlk iki basışta eski noktalar kıpırdamaz; 'c4' ve 'c5' sağa eklenir. Üçüncü basışta ('c6', durum satırında toplam 6 commit) bütün noktalar sola kayar ve aralık yedide bir kadar daralır; sonraki her basış biraz daha sıkıştırır.",
        explain: "Kod aralığı (genişlik − 80) / max(6, k + 1) piksel olarak hesaplar; k o ana kadar kullanılan yuva sayısıdır. Beş commit'e kadar payda 6'da sabittir; altıncı commit paydayı 7 yapar ve aralık 6/7'sine iner, sonra 7/8'ine, 8/9'una… Sabit genişliğe gittikçe daha çok nokta sığdırmanın bedeli budur: nokta yarıçapı 7 piksel olduğundan aralık 14 pikselin altına inince noktalar birbirine değer. Gerçek araçlar bu yüzden geçmişi kaydırılabilir bir liste olarak gösterir.",
      },
      {
        title: "Geçersiz hamle: iki durumlu bir makine",
        predict: "Hiç dal açmadan 🔀 Merge'e basarsan ne olur? Dal açıkken ikinci kez 🌿 Feature Branch'e basarsan? Sonra şu dizinin sonunda durum satırının hangi sayıları yazacağını hesapla: Feature, Commit, Commit, Merge, Feature, Merge.",
        do: "↺ Sıfırla, doğrudan 🔀 Merge'e bas ve durum satırını oku. 🌿 Feature Branch'e arka arkaya iki kez bas. Sonra ↺ Sıfırla ve yukarıdaki altı hamlelik diziyi uygula.",
        observe: "Merge tek başına hiçbir nokta çizmez; satır 'Birleştirilecek açık dal yok' der. İkinci Feature Branch de reddedilir ('zaten açık'), sayı 5'te kalır. Altı hamlelik dizinin sonunda satır 'Toplam 11 commit: develop 7, feature/login 4 · açık feature dalı: yok' yazar; tuvalde iki ayrı dal ve iki 'merge' noktası görürsün.",
        explain: "Tuvalin iki durumu var: dal kapalı ve dal açık. Feature Branch yalnızca birincide, Merge yalnızca ikincide geçerli; Commit ikisinde de. Her hamlenin bedeli sabit: Commit +1, Feature +2 ('login' ve 'wip'), Merge +1. Başlangıçtaki 3'e 2 + 1 + 1 + 1 + 2 + 1 eklenir: 11. Kodun başındaki 'koşul tutmuyorsa çık' satırlarına koruma cümlesi (guard clause) denir; iyi bir arayüz reddettiği hamleyi sessizce yutmaz, nedenini söyler.",
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
        "1 Ağustos 2012'de Knight Capital, borsa yazılımının yeni sürümünü sekiz sunucudan yedisine yükledi. Sekizincide, ABD borsa denetçisi SEC'in raporuna göre 2003'ten beri kullanılmayan eski bir emir işlevinin kodu duruyordu ve yeni sürümün başka bir anlamla yeniden kullandığı bayrak o kodu uyandırdı. Sunucu piyasa açılır açılmaz durmadan emir gönderdi; kırk beş dakikada 154 hissede milyonlarca işlem gerçekleşti, zarar 440 milyon doları geçti. Şirket ancak günler içinde bulunan 400 milyon dolarlık bir kurtarma yatırımıyla ayakta kaldı, ertesi yıl da bir rakibiyle birleşti. Yeni kod doğruydu; ölü kodu silmeyen ve dağıtımı elle yapan süreç değildi.",
    },
    {
      title: "Ay'a inerken alarm çalan bilgisayar",
      body:
        "20 Temmuz 1969'da Apollo 11'in iniş aracı Ay yüzeyine yaklaşırken bilgisayar '1202' ve '1201' alarmları verdi: randevu radarının elektroniği, o an gereği olmadığı hâlde bilgisayara durmadan sinyal yağdırıyor, işlemci zamanının bir bölümünü çalıyordu. MIT'de Margaret Hamilton'ın yönettiği ekibin uçuş yazılımı işleri önceliğe göre sıralıyordu; iş kuyruğu taşınca bilgisayar kendini saniyeler içinde yeniden başlattı, düşük öncelikli işleri bıraktı ve iniş hesaplarını kaldığı yerden sürdürdü. Armstrong ve Aldrin indi. Hamilton 2016'da Başkanlık Özgürlük Madalyası aldı.",
    },
    {
      title: "İki milyar satırlık tek depo",
      body:
        "Google mühendisleri 2016'da yayımladıkları bir makalede şirketin neredeyse bütün kodunu tek bir depoda tuttuğunu anlattı: yaklaşık iki milyar satır kod, 86 terabayt veri ve günde on binlerce commit. Böyle bir ölçekte 'merge' bir düğme değil, her değişikliği otomatik testlerden geçiren koca bir altyapıdır; makalenin anlattığına göre commit'lerin büyük bölümünü de insanlar değil otomatik araçlar atar. Sayfadaki tuvalde elli kadar commit'ten sonra noktalar birbirine değmeye başlar; Google'ın günlük akışı o tuvali saniyeler içinde doldururdu.",
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
      "Topla: 0.1 + 100 + 30 000 ≈ 30 100 s ≈ 8.4 saat. Aynı 1110 test yaklaşık 73 kat daha uzun sürer; hiçbir ekip her commit'te bir iş günü beklemez, testler kapatılır ve hata üretime kaçar.",
      "Süre tek bedel değil. Uçtan uca testler ağ, tarayıcı ve zamanlama yüzünden kod doğruyken de arada bir kalır. Her birinin böyle 'boş yere' kalma olasılığı p = 0.005 ve testler bağımsız olsun. Paketin temiz geçme olasılığı (1 − p)<sup>N</sup>'dir: N = 10 için 0.995<sup>10</sup> ≈ 0.951, yani yirmi çalıştırmadan biri boş yere kırmızı. N = 1000 için 0.995<sup>1000</sup> ≈ e<sup>−5</sup> ≈ 0.007: paket neredeyse her seferinde kırmızıdır ve kimse ona güvenmez.",
    ],
    result:
      "Normal piramit 6.8 dakika sürer ve yaklaşık %95 olasılıkla temiz geçer; ters piramit 8.4 saat sürer ve temiz geçme olasılığı %1'in altındadır. Süreyi sayı × süre çarpımı en büyük olan katman, güveni ise en kırılgan testlerin sayısı belirler.",
  },
  misconceptions: [
    {
      myth: "Yazılım mühendisliği, iyi kod yazmaktır.",
      truth:
        "Kod işin görünen kısmı. Knight Capital'de yeni kod doğruydu, dağıtım yarım kaldı; Mars Climate Orbiter'da iki program ayrı ayrı doğruydu, birimleri uyuşmadı. Mühendislik; gereksinimi anlamayı, parçaların sözleşmesini yazmayı, test etmeyi, sürümü geri alabilmeyi ve ekibi örgütlemeyi kapsar. Sayfadaki SDLC şeridinde 'Geliştirme' altı aşamadan yalnızca biridir.",
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
        "Bir dal, tek bir commit'in kimliğini tutan 41 baytlık bir dosyadır; açmak milisaniyeler sürer. Commit'ler ise içeriğin özetiyle adlandırıldığı için aynı dosya yüz dalda da bir kez saklanır. Tuvalde 🌿 Feature Branch'in çizdiği yeni satır, kopya değil, çizgede yeni bir yoldur.",
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
    { term: "Bug (hata)", definition: "Programın beklenen davranıştan sapması; sözcük mühendislikte eskiden beri kullanılır; Grace Hopper'ın ekibi 1947'de Harvard Mark II'nin rölesine sıkışan gerçek bir güveyi kayıt defterine yapıştırıp ünlendirdi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede programlama tek kişilik bir iştir: yaz, çalıştır, gör. Üniversitede yazılım mühendisliği dersi ilk kez başkasının kodunu okumayı, bir <strong>belirtim</strong> (spec) yazmayı ve ona karşı test üretmeyi öğretir. Önkoşul, sonkoşul ve değişmez (invariant) kavramları, bir fonksiyonun 'sözleşmesi' olarak biçimselleşir; Liskov ilkesi, Liskov ve Jeannette Wing'in 1994'teki makalesiyle bu sözleşmelerin kalıtımda nasıl korunacağını söyleyen biçimsel bir tanıma dönüşür: alt tür önkoşulu sıkılaştıramaz, sonkoşulu gevşetemez. Tasarım desenleri ezberlenecek bir liste değil, bu sözleşmeleri değişime dayanıklı kurmanın örüntüleri olarak yeniden okunur.",
      "Daha ileride yollar ayrılır. <strong>Biçimsel yöntemler</strong>, Therac-25 ya da Ariane gibi hatayı test ile değil matematiksel ispatla dışlamayı amaçlar; sürücüsüz metro hatlarının ve uçak kontrol sistemlerinin bazı yazılımları bu yolla doğrulanır. <strong>Dağıtık sistemler</strong> dersi, mikroservis kartındaki 'eventual consistency' sözünün arkasındaki teoremleri (CAP, uzlaşma algoritmaları) açar. Yazılım ekonomisi ve süreç yönetimi, Brooks'un gözlemlerini ölçülebilir modellere çevirir. Ve her yolda aynı soru yürür: değişen bir dünyada, çalışan bir şeyi bozmadan nasıl değiştirirsin?",
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
      explanation: "Birleştirme, iki dalın geçmişini buluşturur; bu yüzden commit çizgesinde iki ebeveyne bağlanır. Tuvalde 'merge' noktasına hem develop çizgisinin hem de feature dalından inen kesikli okun varması bunun resmidir.",
    },
    {
      question: "Bir uçtan uca test, kod doğruyken bile %1 olasılıkla kalıyor. Birbirinden bağımsız 100 böyle testten oluşan bir paketin tek çalıştırmada tamamen yeşil geçme olasılığı yaklaşık kaçtır?",
      options: ["%99", "%90", "%37", "%1"],
      answer: 2,
      explanation: "Hepsinin geçmesi gerekir: 0.99¹⁰⁰ ≈ e⁻¹ ≈ 0.37. Tek tek güvenilir görünen testler çoğalınca paket üç çalıştırmanın ikisinde boş yere kırmızı olur. Test piramidinin tepesinin dar tutulmasının ikinci nedeni budur; birincisi süredir.",
    },
  ],
  next: [
    { href: "tasarim-desenleri.html", title: "Tasarım Desenleri", why: "Bu sayfadaki on beş kartın ötesi: 23 desenin hepsi, her biri için UML, kod, artı-eksi ve desenler arası ilişki haritası." },
    { href: "programlama-paradigmalari.html", title: "Programlama Paradigmaları: Aynı Problem, Farklı Düşünme Biçimleri", why: "SOLID’in dayandığı nesne yönelimi, fonksiyonel ve mantıksal düşünceyle yan yana: aynı sorunun farklı paradigmalarda adım adım çözülüşü." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "n(n−1)/2'nin neden 'O(n²)' olduğunu ve ölçeğin neden her şeyi değiştirdiğini matematiğiyle gör." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Commit kimliklerini üreten özet fonksiyonları ve 'geçmişi sessizce değiştiremezsin' sözünün kriptografik temeli." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 6.005 Software Construction (Spring 2016)", url: "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/", note: "Belirtim ve değişmezler, test, soyut veri türleri, tasarım desenleri ve eşzamanlılık; lisans düzeyinde açık ders (İngilizce)." },
    { title: "Wikipedia · Software engineering", url: "https://en.wikipedia.org/wiki/Software_engineering", note: "Terimin 1965-1966'daki ilk kullanımları, 7-11 Ekim 1968 Garmisch konferansı ve yazılım krizi (İngilizce)." },
    { title: "Wikipedia · The Mythical Man-Month", url: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month", note: "Brooks yasasının özgün cümlesi, OS/360 deneyimi ve n(n − 1)/2 iletişim yolu hesabı (İngilizce)." },
    { title: "Vikipedi · Git (yazılım)", url: "https://tr.wikipedia.org/wiki/Git_(yazılım)", note: "Git'in 2005'te BitKeeper'ın yerine doğuşu ve dağıtık sürüm kontrolünün tasarım hedefleri (Türkçe)." },
  ],
  revision: "Kasım 2026",
};
