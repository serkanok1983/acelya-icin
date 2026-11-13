window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yazilim-muhendisligi"] = {
  slug: "yazilim-muhendisligi",
  title: "Yazılım Mühendisliği: Kodun Ötesindeki Zanaat",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir satır kod yazmak kolaydır; on milyon satırı yüz kişiyle, on yıl boyunca, kimseyi öldürmeden değiştirmek değil. Yazılım mühendisliği bu ikinci işin disiplinidir.",
  hook:
    "1 Ağustos 2012 sabahı New York borsası açıldı; kırk beş dakika sonra ABD'li bir aracı kurum 440 milyon dolardan fazla kaybetmişti. Önceki günlerde sunucularına yeni bir sürüm yüklenmiş, sekiz sunucudan yedisi güncellenmiş, biri unutulmuştu. Yeni sürüm, yüklendiği yedi sunucuda doğru çalışıyordu; yanlış olan, kodun nasıl dağıtıldığıydı. Peki 'doğru kod' neden yetmez?",
  bigIdea:
    "Yazılım mühendisliği, kodu değil <strong>değişimi</strong> yönetir: gereksinimler değişir, ekipler büyür, hatalar geç bulundukça pahalılaşır; bu yüzden işi küçük adımlara böler, her adımı test eder, her sürümü geri alınabilir tutar.",
  story: [
    "Terim bir kışkırtma olarak doğdu. 1968 Ekim'inde NATO Bilim Komitesi, Almanya'nın Garmisch kasabasında elli kadar uzmanı topladı. Toplantının başlığına o günlerde pek bilinmeyen 'yazılım mühendisliği' sözü konmuştu; başlık Friedrich L. Bauer'e bağlanır ve toplantının raporu adın bile bile kışkırtıcı seçildiğini yazar: köprü yapan mühendisler gibi hesaplı, ölçülü ve sorumlu çalışmayı yazılımda henüz kimse beceremiyordu. O toplantıdan bugüne kalan bir deyim de var: <strong>yazılım krizi</strong>. Projeler bütçesini aşıyor, gecikiyor, teslim edildiğinde de beklenen işi görmüyordu. Söz büsbütün yeni değildi: ACM başkanı Anthony Oettinger 1966'da üyelere yazdığı bir mektupta kullanmıştı; aynı yıllarda MIT'de Apollo uçuş yazılımı üzerinde çalışan, sonra o ekibin başına geçen Margaret Hamilton da işine 'yazılım mühendisliği' diyordu, yapılan iş donanım mühendisliği kadar ciddiye alınsın diye.",
    "Krizin en ünlü anatomisini Fred Brooks yazdı. IBM'in OS/360 işletim sistemi projesini yönetmiş, geciken projeye adam ekledikçe daha da geciktiğini görmüştü. 1975'te yayımladığı <em>The Mythical Man-Month</em> (Efsanevi Adam-Ay) bu gözlemi bir yasaya çevirdi: 'Geç kalmış bir yazılım projesine insan eklemek onu daha da geciktirir.' Nedeni basit aritmetikti: n kişilik bir ekipte n(n−1)/2 iletişim yolu vardır; beş kişide 10, yirmi kişide 190. Yeni gelenlerin eğitimi ve çoğalan konuşmalar, eklenen iş gücünü yer. 1970'te Winston Royce'un yayımladığı bir makale, gereksinimden işletime uzanan yedi sıralı aşamayı çizmişti. Makalede 'şelale' sözcüğü geçmez; ad sonradan takıldı. Daha ironik olan, Royce'un bu düz akış için aynı makalede 'risklidir ve başarısızlığa davet çıkarır' demesi, aşamalar arasında geri dönüşler ve işin iki kez yapılmasını (önce bir deneme sürümü) önermesidir. Yıllarca yalnızca ilk şema hatırlandı, uyarı unutuldu.",
    "Bedeli yalnızca para değildi. 1985–1987 arasında Therac-25 adlı radyoterapi cihazı, bir yarış koşulu (iki işlemin zamanlamasına bağlı hata) yüzünden hastalara planlananın kat kat üstünde doz verdi; belgelenen altı kazada hastalar ağır yaralandı, bir bölümü hayatını kaybetti. Önceki modellerdeki donanım kilitleri kaldırılmış, güvenlik tümüyle yazılıma bırakılmıştı. 4 Haziran 1996'da Avrupa'nın yeni roketi Ariane 5, ilk uçuşunda kalkıştan kırk saniye kadar sonra kendini imha etti: Ariane 4'ten aynen alınan atalet referans sistemi kodu, 64 bitlik bir kayan noktalı sayıyı 16 bitlik işaretli bir tam sayıya sığdırmaya çalışırken taştı. Daha hızlı roket, eski varsayımı geçersiz kılmıştı. 1999'da NASA'nın Mars Climate Orbiter aracı, bir yazılım iticilerin itmesini (impuls) pound-kuvvet·saniye olarak yazdığı, öteki newton·saniye beklediği için gezegene fazla alçaktan girip kayboldu. Üç kazada da hata tek bir satırda değil, parçaların birbirine güvendiği yerdeydi.",
    "Cevap yavaş yavaş biçimlendi. 1994'te dört yazar (Gamma, Helm, Johnson, Vlissides; 'Dörtlü Çete') tekrar eden tasarım sorunlarına 23 adlandırılmış çözüm katalogladı. Şubat 2001'de Utah'ta Snowbird kayak merkezinde on yedi yazılımcı <strong>Çevik Manifesto</strong>'yu imzaladı: kapsamlı belgeden çok çalışan yazılım, plana körü körüne uymaktan çok değişime yanıt. Nisan 2005'te Linux çekirdeği ekibi, kullandığı BitKeeper adlı aracın ücretsiz lisansını yitirdi; Linus Torvalds yerine koyacağı Git'in ilk sürümünü günler içinde yazdı; haziranda çıkan çekirdek sürümü (2.6.12) Git ile yönetilen ilk sürüm oldu; 2010'da Vincent Driessen'in bir blog yazısı, Git Flow adıyla anılan dallanma düzenini yaydı. Bugün iyi kurulmuş bir ekipte kod, gönderildiği anda otomatik testlerden geçer, kısa sürede üretime çıkar ve gerekirse tek komutla geri alınır. Mühendislik, kahramanlıktan rutine dönüştüğünde başarmış demektir.",
  ],
  core: [
    {
      heading: "Geçmiş bir graftır, dal bir etiket",
      body:
        "Git'te her <strong>commit</strong>, dosyaların o anki tam fotoğrafı artı 'ebeveyn' commit'inin kimliğidir. Kimlik, içeriğin SHA-1 özetinden türeyen 40 karakterlik bir onaltılık sayıdır (yeni depolarda SHA-256 da seçilebilir); tek bir harf değişse kimlik değişir. Her commit ebeveyninin kimliğini de içerdiğinden eski bir commit'i değiştirmek ondan sonraki bütün kimlikleri değiştirir; geçmişle fark edilmeden oynanamaz. Bir <strong>dal</strong> yalnızca bir commit'i gösteren hareketli bir etikettir. Birleştirirken üç durum vardır. HEAD öteki ucun atasıysa etiketi kaydırmak yeter (<strong>ileri sarma</strong>). Dallar ayrışmışsa ortak ataların en yenisi, yani <strong>birleştirme tabanı</strong> bulunur ve dosyanın üç hâli karşılaştırılır; sonuç iki ebeveynli bir commit'tir. İki yan aynı satırı farklı değiştirdiyse hangi niyetin geçerli olduğunu yalnız insan söyleyebilir: çakışma. Sayfadaki model bu kuralı dört satırlık bir dosyada satır satır uygular ve kimlikleri 32 bitlik bir özetten üretir; gerçek Git komşu satırlara da bakan bir fark algoritması kullanır.",
      formula: "önde = |ata(HEAD) − ata(öteki)|<br>geride = |ata(öteki) − ata(HEAD)|<br>satır: bizimki = taban ise onlarınki; onlarınki = taban ise bizimki; ikisi de ayrı ayrı değiştiyse çakışma",
      formulaNote: "ata(x), x'ten ebeveyn oklarını izleyerek ulaşılan commit'lerin kümesidir (x dahil). Oklar hep geçmişe baktığı için döngü oluşamaz: geçmiş yönlü ve çevrimsiz bir graftır. Sayfa önde ve gerideyi iki ayrı yoldan sayar ve ikisinin tuttuğunu gösterir.",
    },
    {
      heading: "Kapsama çalıştığını söyler, denetlendiğini değil",
      body:
        "Dijkstra'nın 1970 dolayındaki uyarısı hâlâ geçerlidir: test, hatanın varlığını gösterebilir, yokluğunu asla. Peki elindeki testlerin ne kadar iyi olduğunu nasıl ölçersin? İlk akla gelen <strong>kapsama</strong>dır: testler çalışırken kodun hangi deyimleri, hangi dal sonuçları (her if için doğru ve yanlış), hangi karşılaştırmaları görüldü? Kapsama bir alt sınırdır; hiç çalışmayan satır sınanmamıştır. Ama tersi doğru değildir: bir satırın çalışması, sonucunun denetlendiği anlamına gelmez. <strong>Mutasyon testi</strong> soruyu tersinden sorar: koda tek bir küçük hata ekle (<code>&lt;=</code> yerine <code>&lt;</code>, <code>||</code> yerine <code>&amp;&amp;</code>, 0 yerine 1) ve testleri yeniden çalıştır. En az bir test kalıyorsa mutant 'öldü', hepsi geçiyorsa 'hayatta'dır. Hayatta kalan her mutant, koda girse kimsenin fark etmeyeceği gerçek bir hata türüdür. Sayfadaki üçgen sınıflandırıcısının 37 mutantı vardır ve beş test, bütün dalları gezdiği hâlde, bunların sekizini kaçırır.",
      formula: "kapsama = çalışan öğe / toplam öğe<br>mutasyon skoru = öldürülen mutant / toplam mutant",
      formulaNote: "Sayfadaki işlevde 9 deyim, 8 dal sonucu, 22 koşul sonucu ve 37 mutant var. Gerçek projelerde özgün kodla aynı davranan (eşdeğer) mutantlar skoru %100'ün altında tutabilir; bu küçük işlevde, sayfanın denediği aralıkta böyle bir mutant çıkmaz.",
    },
    {
      heading: "Tahmin bir sayı değil, bir dağılımdır",
      body:
        "'Bu iş kaç gün sürer?' sorusuna tek sayıyla cevap veren kişi çoğu zaman en olası süreyi söyler. Oysa işler erken bitmekten çok geç biter: iyimser süre a ile en olası süre m birbirine yakın, kötümser süre b uzaktadır. <strong>Üç noktalı tahmin</strong> bu çarpıklığı hesaba katar: m'ye dört, uçlara birer ağırlık verir. Görevler art arda yapılıyor ve süreleri birbirinden bağımsızsa ortalamalar da varyanslar da toplanır; standart sapmalar değil. Bu yüzden benzer büyüklükte görevlerde toplamın belirsizliği görev sayısının kareköküyle büyür; uzun bir zincirde tek tek sapmalar birbirini kısmen götürür. Sayfadaki altı görevde en olası sürelerin toplamı 31 gün, ortalama ise 35,33 gündür; 31 günde bitirme olasılığı Monte Carlo ölçümünde yalnızca %16,3 çıkar. Formülün iki varsayımı var: σ = (b − a)/6 bir yaklaşımdır (beta-PERT dağılımının gerçek varyansı (μ − a)(b − μ)/7'dir) ve toplamın normal dağıldığı kabulü altı görevle kabadır. Sayfa ikisinin de bedelini ölçülen değerin yanına yazar.",
      formula: "μ = (a + 4m + b)/6,  σ = (b − a)/6<br>μ<sub>proje</sub> = Σμ<sub>i</sub>,  σ<sub>proje</sub> = √(Σσ<sub>i</sub>²)<br>P(T ≤ hedef) ≈ Φ((hedef − μ<sub>proje</sub>)/σ<sub>proje</sub>)",
      formulaNote: "a, m, b gün cinsinden; Φ standart normal dağılımın birikimli işlevi. Bağımsızlık gerçek projelerde çoğu kez bozulur: aynı yanlış anlama birkaç görevi birden uzatır, o zaman gerçek σ bu formülün verdiğinden büyüktür.",
    },
    {
      heading: "Brooks yasası: yollar karesel büyür, alışma peşin ödenir",
      body:
        "Tek başına yazdığın bir programda bütün bilgi kafandadır. İkinci kişi gelince bir iletişim yolu açılır; üçüncüde üç, onuncuda kırk beş. Madalyonun öteki yüzünü Melvin Conway 1968'de yayımladı: bir kurumun tasarladığı sistem, o kurumun iletişim yapısının kopyası olur. Bu gözlem bugün 'Conway yasası' diye anılır. Sayfa, Brooks'un gözlemini sınanabilir bir <strong>öğretim modeline</strong> çevirir: n kişilik ekibe bugün k kişi eklenir; herkes zamanının c kadarını her bir iş arkadaşıyla eşgüdüme harcar; yeni gelen r gün boyunca doğrusal hızlanır ve bu sürede eski ekipten e kişilik emek alır. Hızın zamana göre integrali kalan işe eşitlendiğinde bitiş günü çıkar. Kalan iş azsa proje, yeni gelenler daha alışırken biter: eğitim yükü ödenmiş, karşılığı alınamamıştır. Bu bir ölçüm değil, bir düşünme aracıdır: katsayılar uydurmadır, iş kusursuz bölünebilir sayılır; Brooks da kendi yasasını aşırı bir basitleştirme diye niteler.",
      formula: "yol = n(n − 1)/2;  N = n + k;  verim = 1 − c·(N − 1)<br>t &lt; r: hız = verim·[(n − e·k) + k·t/r];  t ≥ r: hız = verim·N<br>∫<sub>0</sub><sup>T</sup> hız dt = R",
      formulaNote: "R kalan iş (kişi-gün), T bitiş (gün). Alışma içinde biten iş için integral ikinci derece bir denklem verir: verim·[(n − e·k)T + kT²/(2r)] = R. Varsayılan katsayılarla (n = 5, k = 3, r = 15 gün, e = 0,5, c = %2) başa baş noktası R ≈ 78 kişi-gündür.",
    },
    {
      heading: "Little yasası: eldeki iş, bekleyişin ta kendisidir",
      body:
        "Bir panoya günde ortalama λ iş giriyor, her iş içeride ortalama W gün kalıyorsa içeride ortalama L = λW iş bulunur. <strong>Little yasası</strong> bir sayım özdeşliğidir: işlerin içeride geçirdiği günleri bir kez iş iş, bir kez gün gün toplarsın. Bu yüzden geliş ya da işlem sürelerinin dağılımı hakkında hiçbir şey varsaymaz; yalnız uzun dönem ortalamalarının var olmasını ister. Çıktı hızı sabitken eldeki işi (<strong>WIP</strong>) yarıya indirmek teslim süresini yarıya indirir. WIP sınırı buna bir ek yapar: sayfanın modelinde bir sütun aynı anda k iş yürütürse işler arası gidip gelme yüzünden hızı μ/[1 + s·(k − 1)] olur. Bu <strong>geçiş kaybı</strong> s bir öğretim varsayımıdır. Sınır yoksa ve hız λ'nın altına düşerse biriken iş hızı daha da düşürür; modelin kararlı durumu kalmaz. Bu modelde s = 0 ise sınırın teslim süresine faydası yoktur; bekleyiş yalnızca panodan Hazır kuyruğuna taşınır. Sınır fazla sıkıysa da bitmiş iş devredilemez, sütunlar birbirini bloke eder.",
      formula: "L = λ · W<br>sütun hızı = μ / [1 + s·(k − 1)]<br>hız ≥ λ için: k ≤ 1 + (μ/λ − 1)/s",
      formulaNote: "λ iş/gün, W gün, L iş. Son satır kaba bir eşiktir (bloke olmayı saymaz): varsayılan ayarda Geliştirme için 1 + (1,2/0,7 − 1)/0,1 ≈ 8,1. Benzetim bunu doğrular: sınır 8'de pano zar zor kararlıdır, sınır 9'da kuyruk durmadan büyür ve durum satırı nedenini yazar. Sınırsız ve kayıpsız durumda kuram kapalı biçimlidir: W = Σ 1/(μ<sub>i</sub> − λ).",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvar ve her sekmede ölçülen değer bir denetim değerinin yanında durur. <strong>01 · Sürüm denetimi (Git modeli)</strong> bir commit grafiği ile dört satırlık bir dosyanın birleştirme tablosunu; <strong>02 · Test ve kapsama</strong> on dört onay kutulu bir test kümesini, kapsama kartlarını ve 37 mutantlık öldürme matrisini; <strong>03 · Tahmin ve ekip dinamiği</strong> üstte altı görevlik üç noktalı tahmini, altta Brooks öğretim modelini; <strong>04 · Akış: WIP ve teslim süresi</strong> üç sütunlu bir kanban benzetimini içerir. Animasyon yok: bir ayarı değiştirdiğinde her şey yeniden hesaplanır. Rastgelelik tohumludur, aynı ayar hep aynı sayıyı verir; aşağıdaki sayılar Rastgele tohum 1 içindir. Bir form denetiminin içinde değilken <kbd>R</kbd> etkin sekmeyi sıfırlar. Dört sekme de öğretim modelidir; sınırları sayfanın altında yazılıdır.",
    experiments: [
      {
        title: "İleri sarma, üç yollu birleştirme, rebase",
        predict: "main öteki dalın atasıysa birleştirme yeni bir commit üretir mi? İki dal ayrışmışsa doğan commit'in kaç ebeveyni olur? Rebase aynı değişiklikleri başka bir ucun üstüne taşıdığına göre commit kimlikleri aynı kalır mı?",
        do: "01 · Sürüm denetimi sekmesinde <strong>Hazır: ileri sarma</strong>'ya, sonra <strong>Öteki dalı birleştir (merge)</strong>'e bas. <strong>Depoyu sıfırla</strong> ve yeniden birleştir. Son olarak <strong>Hazır: rebase</strong>'e, ardından <strong>Öteki dalın ucuna taşı (rebase)</strong>'e bas. Her adımda 'Ölçülen: boyalı grafik yürüyüşü' ile 'Erişilebilen / toplam commit' kartlarını oku.",
        observe: "İleri sarmada önce 0 önde · 2 geride; birleştirince main etiketi 34d0b8b'den 30267f4'e kayar, sayaç 4 / 4 kalır. Varsayılan depoda 1 önde · 1 geride, taban 34d0b8b; birleştirince içi boş halkalı 5e4d7a3 doğar, sayaç 5 / 5, okuma 2 önde · 0 geride olur. Rebase hazırında 2 önde · 1 geride; taşıyınca 3730df1 → 157e153, 30267f4 → 9ebd18f, sayaç 5 / 7 · 2 erişilemez.",
        explain: "İleri sarmada yapılacak tek iş etiketi kaydırmaktır. Ayrışmış dallarda tablo satır satır karar verir: 2. satırı yalnız özellik, 3. satırı yalnız main değiştirmiştir, ikisi de korunur. Birleştirmeden sonra main iki commit öndedir: kendi commit'i ve yeni birleştirme commit'i. Rebase dosyada aynı sonucu verir ama kimlik ebeveyne de bağlı olduğundan iki commit yeniden yazılır; eskileri grafikte soluk, sahipsiz kalır. <strong>Hazır: çakışma</strong> ile dördüncü durumu da gör: 2. satırın üç sütunu da farklıdır, Sonuç '?' yazar.",
      },
      {
        title: "Yüzde yüz kapsama, yüzde sıfır güvence",
        predict: "Beş test her if'in iki sonucunu da gezdiriyor: dal kapsaması %100. 37 mutanttan kaçı yine de hayatta kalır? Testlerin sonucu denetlemesini kapatırsan kapsama mı düşer, mutasyon skoru mu?",
        do: "02 · Test ve kapsama sekmesinde varsayılan T1–T5 ile kartları oku. <strong>Hazır: aynı beş test, iddiasız</strong>'a bas. <strong>Testleri sıfırla</strong>, sonra <strong>Hazır: sınır değerleri ekle</strong>. En son T6, T7 ve T11 kutularını da işaretle; her adımda alttaki mutant tablosunda 'hayatta' yazan satırlara bak.",
        observe: "Varsayılan: Dal kapsaması %100 · 8 / 8, Mutasyon skoru %78,4 · 29 / 37, fark +21,6 puan. İddiasız: üç kapsama kartı kıpırdamaz, skor %0 · 0 / 37 olur. Sınır değerleriyle skor %86,5 · 32 / 37, koşul kapsaması %72,7'den %81,8'e çıkar. Üç kutu daha: %100 · 37 / 37; koşul kapsaması ise %90,9 · 20 / 22'de kalır.",
        explain: "Kapsama kodun çalıştığını sayar; iddiasız test de kodu çalıştırır. Mutasyon skoru 'kod bozulsa fark eder miydin' diye sorar. İlk sekiz kaçağın üçü sınır hatasıdır: a + b &lt;= c ile a + b &lt; c yalnız a + b = c iken ayrılır, bunu T8 (1, 2, 3) ve iki eşi yakalar. Kalan beşi kısa devrenin gölgesindedir: beş testte b &lt;= 0 ve c &lt;= 0 hiç doğru çıkmamıştır; T6 (1, 0, 1) ve T7 (1, 1, 0) dördünü öldürür; beşincisi, c &lt;= 0 yerine c &lt;= 1, ancak T11 (1, 1, 1) ile ölür. İki koşul sonucu görülmeden de skorun tam olması, iki ölçünün ayrı şeyler saydığını gösterir.",
      },
      {
        title: "Aynı üç kişi bir projeyi geciktirir, ötekini kurtarır",
        predict: "Beş kişilik ekibe bugün üç kişi ekleniyor; alışma 15 gün sürüyor. Kalan iş 60 kişi-günse bitiş öne mi gelir, geriye mi gider? 300 kişi-günse? Eklemenin zarardan kâra döndüğü iş miktarı 60 ile 300'ün neresindedir?",
        do: "03 · Tahmin ve ekip dinamiği sekmesinin alt yarısında <strong>Hazır: son düzlükte ekle</strong>'ye bas, 'Kimse eklenmezse bitiş' ile 'Seçili eklemeyle bitiş' kartlarını oku. Sonra <strong>Hazır: erken ekle</strong>. Ardından Kalan iş kaydırıcısını önce 70, sonra 80 kişi-güne getir.",
        observe: "İletişim yolu kartı hep 5 kişi: 10 → 8 kişi: 28 der. 60 kişi-günde 13,04 gün 14,18 güne uzar ('Eklemek geciktiriyor: 3 kişiyle bitiş 1,14 gün uzuyor'), en erken bitiren ekleme k = 0'dır ve grafikteki on noktanın hepsi kesikli çizginin üstündedir. 300 kişi-günde 65,22 gün 49,23 güne iner. 70'te hâlâ zarar var (15,22 → 15,8 gün), 80'de kâr başlar (17,39 → 17,25 gün).",
        explain: "Eklemenin bedeli peşindir: verim %92'den %86'ya düşer ve alışma boyunca eski ekipten işe 3,5 kişilik emek kalır. Kazancı ise sonradan gelir. 60 kişi-günlük iş, yeni gelenler daha alışırken biter. İki bitiş süresini eşitlersen R/4,6 = 15 + (R − 64,5)/6,88, buradan R ≈ 78 kişi-gün çıkar; kaydırıcıdaki 70 ile 80 bu eşiğin iki yanıdır. Sayıların hepsi senin seçtiğin katsayılara bağlıdır: bu bir öğretim modelidir, ölçülmüş bir yasa değil. Gerçek projelerde iş çoğu zaman böyle kusursuz bölünmez.",
      },
      {
        title: "WIP sınırı ne zaman işe yarar?",
        predict: "Aynı anda yürütülen iş sayısını sınırlamak teslim süresini her zaman kısaltır mı? İşler arasında gidip gelmenin hiçbir bedeli yoksa sınır neyi değiştirir? Bedel varken sınırı tümden kaldırırsan ne olur?",
        do: "04 · Akış sekmesinde <strong>Hazır: sınırsız, kayıpsız</strong>'a bas. Geçiş kaybı %0'da kalsın; üç WIP sınırını 3'e indir. <strong>Panoyu sıfırla</strong> (sınır 3, kayıp %10). Üç sınırı önce 6'ya, sonra 9'a çıkar. Son olarak <strong>Hazır: sınırsız, kayıplı</strong>'ya bas. Her adımda 'Ortalama teslim süresi W' ve 'Little yasası' kartlarını oku.",
        observe: "Sınırsız, kayıpsız: W 4,49 gün; kuram kartı W = 4,5 gün · L = 3,15 der. Kayıpsız, sınır 3: 4,51 gün; yalnız yer değişir (Hazır kuyruğu 0,21 + pano 2,92). Varsayılan: 6,4 gün, L 4,46 iş, Little kartı 4,46 ile 4,46. Sınır 6: 11,24 gün. Sınır 9: durum satırı 'Kararsız' der ve nedenini yazar: Geliştirme sınırına dayandığında hızı 0,667 iş/gün, λ = 0,7'nin altında; pencerede 27.000 iş gelir, 26.040 iş biter. Sınırsız, kayıplı: çıktı hızı 0,01 iş/gün, L ve W yerine 'kararlı değer yok', Little 'uygulanamaz'.",
        explain: "Dört kararlı ayarın dördünde de çıktı hızı × W ile L iki ondalığa kadar tutar: Little yasası dağılım sormaz. Sınırın faydası yalnız geçiş kaybından gelir: kayıp yokken 4,49 ile 4,51 gün arasında fark yoktur. Kayıp varken sınır 6 sütunları daha çok işe böler, süre uzar; sınır 9'da Geliştirme'nin hızı 1,2/1,8 ≈ 0,667 iş/güne iner (karttaki kaba eşik: k ≤ 8,1). Sınır kalkınca biriken iş hızı düşürür, düşen hız işi biriktirir: kararlı durum kalmaz. Kapasite geliş hızına yaklaştıkça sayılar tohumla oynar (ilk on tohumda sınır 1'de 10,5 ile 14,8, sınır 8'de 32 ile 77 gün); orada tek koşuya güvenme.",
      },
    ],
  },
  wow: [
    {
      title: "Kırk beş dakikada 440 milyon dolar",
      body:
        "Temmuz 2012'nin son günlerinde Knight Capital, emir yönlendirme yazılımının yeni sürümünü sekiz sunucusuna sırayla yükledi; biri atlandı. O sunucuda, ABD borsa denetçisi SEC'in raporuna göre 2003'ten beri kullanılmayan eski bir emir işlevi duruyordu; yeni sürümün başka anlamda kullandığı bayrak onu uyandırdı. 1 Ağustos'ta piyasa açılır açılmaz sunucu durmadan emir gönderdi; kırk beş dakikada 154 hissede yaklaşık dört milyon işlem gerçekleşti. Şirket zararını 440 milyon dolar olarak açıkladı (SEC'in rakamı 460 milyonu aşar) ve ancak günler içinde bulunan 400 milyon dolarlık yatırımla ayakta kaldı. Yeni kod doğruydu; ölü kodu silmeyen ve dağıtımı elle yapan süreç değildi.",
    },
    {
      title: "Ay'a inerken alarm çalan bilgisayar",
      body:
        "20 Temmuz 1969'da Apollo 11'in iniş aracı Ay yüzeyine yaklaşırken bilgisayar '1202' ve '1201' alarmları verdi: randevu radarının elektroniği, o an gereği olmadığı hâlde bilgisayara durmadan sinyal yağdırıyor, işlemci zamanının onda birinden fazlasını çalıyordu. MIT'de yazılan uçuş yazılımı işleri önceliğe göre sıralıyordu (bu tasarım Hal Laning'indi); iş kuyruğu taşınca bilgisayar kendini yeniden başlattı, düşük öncelikli işleri bıraktı ve iniş hesaplarını kaldığı yerden sürdürdü. Armstrong ve Aldrin indi. Uçuş yazılımı ekibinin başındaki Margaret Hamilton 2016'da Başkanlık Özgürlük Madalyası aldı.",
    },
    {
      title: "İki milyar satırlık tek depo",
      body:
        "Google mühendisleri 2016'da yayımladıkları bir makalede şirketin neredeyse bütün kodunu tek bir depoda tuttuğunu anlattı: yaklaşık iki milyar satır kod, 80 terabaytı aşan veri ve her gün on binlerce değişiklik. Böyle bir ölçekte 'merge' bir düğme değil, her değişikliği otomatik testlerden geçiren koca bir altyapıdır. Bu sayfadaki model depo en çok 20 commit tutar. Kaba bir hesap: günde yalnız on bin değişiklik bile dakikada yedi commit eder; o akış modeli üç dakikada doldururdu.",
    },
  ],
  worked: {
    title: "Altı görev, bir teslim tarihi: 38 günde biter mi?",
    prompt:
      "Art arda yapılacak altı görevin iyimser, en olası ve kötümser süreleri (a, m, b; gün) şöyle: Gereksinim 2, 4, 8 · Tasarım 3, 5, 10 · Kodlama 6, 10, 22 · Birim testi 3, 6, 14 · Entegrasyon 2, 4, 12 · Yayın 1, 2, 5. Süreler bağımsız. Projenin beklenen süresini, standart sapmasını ve 38 günde bitme olasılığını bul; 'en olası'ların toplamı olan 31 günün ne kadar güvenli bir söz olduğunu söyle. (Bunlar sayfanın 03 sekmesindeki varsayılan görevlerdir.)",
    steps: [
      "Her görev için μ = (a + 4m + b)/6. Gereksinim: (2 + 16 + 8)/6 = 4,33 gün. Ötekiler aynı yolla 5,5; 11,33; 6,83; 5 ve 2,33 gün. Toplam: μ = 212/6 = 35,33 gün. En olası sürelerin toplamı ise 4 + 5 + 10 + 6 + 4 + 2 = 31 gündür: ortalama, kötümser uçlar uzakta olduğu için 4,33 gün daha uzundur.",
      "Her görev için σ = (b − a)/6: sırasıyla 1; 1,17; 2,67; 1,83; 1,67 ve 0,67 gün. Bağımsız sürelerde varyanslar toplanır: σ² = (36 + 49 + 256 + 121 + 100 + 16)/36 = 578/36 = 16,06 gün². Buradan σ = 4,01 gün. Sapmaları doğrudan toplasaydın 9 gün bulur, belirsizliği iki katından fazla abartırdın.",
      "Toplamı normal dağılımlı say. Hedef 38 gün için z = (38 − 35,33)/4,01 ≈ 0,666 ve Φ(0,666) ≈ 0,747: projenin 38 günde bitme olasılığı yaklaşık %74,7'dir. Dört projeden biri bu tarihi kaçırır.",
      "Aynı hesabı 31 gün için yap: z = (31 − 35,33)/4,01 = −1,08 ve Φ(−1,08) ≈ 0,14. Herkesin 'en olası' dediği sürelerin toplamı, yedi projeden ancak birinde tutar. %80 güven için μ + 0,84σ = 35,33 + 3,37 ≈ 38,7 gün söz vermek gerekir.",
      "Sayfada sına: varsayılan ayarda kartlar PERT 35,33 ve 4,01; 'PERT + normal yaklaşım %74,7' yazar. 20.000 koşuluk Monte Carlo ölçümü %73,9, 31 gün için %16,3, %80 güvenli süre için 38,9 gün verir; ölçülen σ 4,27 gündür. Farkın kaynağı benzetim değil, σ = (b − a)/6 kuralının ve normal eğrinin yaklaşık oluşudur.",
    ],
    result:
      "Beklenen süre 35,33 gün, standart sapma 4,01 gün; 38 günde bitme olasılığı yaklaşık %75 (ölçülen %73,9), 31 günde bitme olasılığı yaklaşık %14 (ölçülen %16,3). Tek sayı söylemen gerekiyorsa en olası süreyi değil, bir güven düzeyini söyle: %80 için yaklaşık 39 gün.",
  },
  misconceptions: [
    {
      myth: "Bir hatayı sonradan düzeltmek her projede 100 kat pahalıdır.",
      truth:
        "Yön doğru, sayı değil. Bu eğilimi sayıya döken Barry Boehm'dur: 1981 tarihli <em>Software Engineering Economics</em> kitabında derlediği proje verilerine dayanarak, 2001'de Victor Basili ile birlikte, teslimden sonra bulunan bir hatayı düzeltmenin büyük projelerde gereksinim aşamasındakinin çoğu kez 100 katına, küçük ve kritik olmayan projelerde ise 5 katı dolayına mal olduğunu yazdı. Oran bir doğa sabiti değil, projenin büyüklüğüne ve değişikliğin ne kadar kolay geri alınabildiğine bağlı bir gözlemdir.",
    },
    {
      myth: "Proje gecikiyorsa daha çok programcı almak işi hızlandırır.",
      truth:
        "Brooks yasası tersini söyler: yeni gelenler eğitilmeli, iletişim yolları n(n − 1)/2 ile büyür; beş kişiye üç kişi eklemek on yolu yirmi sekize çıkarır. Sayfadaki öğretim modelinde aynı üç kişi 60 kişi-günlük işi 1,14 gün geciktirir, 300 kişi-günlük işi 15,99 gün kısaltır: belirleyici olan, işin alışma süresinden uzun sürüp sürmeyeceğidir. Brooks'un cümlesi de zaten geç kalmış projeler içindir ve bir ölçüm değil, bir uyarıdır.",
    },
    {
      myth: "Bütün testler geçiyor ve kapsama %100; demek ki kod sağlam.",
      truth:
        "Test yalnızca denediğin girdileri sınar; kapsama da yalnızca kodun çalıştığını sayar. Sayfada beş test %100 dal kapsamasıyla 37 mutantın sekizini kaçırır, iddiaları kapatınca aynı kapsamayla hiçbirini yakalamaz. Therac-25'in yarış koşulu ancak operatör belirli tuşları belirli bir hızla bastığında ortaya çıkıyordu; sıradan testler bunu hiç görmedi. Geçen testler güven verir, kanıt değil.",
    },
    {
      myth: "Git'te dal açmak dosyaların kopyasını çıkarır.",
      truth:
        "Bir dal, tek bir commit'in kimliğini tutan 41 baytlık bir dosyadır; açmak milisaniyeler sürer. Commit'ler ise içeriğin özetiyle adlandırıldığı için aynı dosya yüz dalda da bir kez saklanır. Sayfada <strong>Yeni dal aç ve geç</strong>'e bastığında sayaç değişmez; durum satırı 'Yeni commit oluşmadı' der ve grafiğe yalnızca bir etiket eklenir.",
    },
  ],
  glossary: [
    { term: "Commit", definition: "Git'te dosyaların bir anlık görüntüsü, ebeveyn bağlantısı ve açıklama; 40 karakterlik SHA-1 özetiyle adlandırılır." },
    { term: "Birleştirme tabanı (merge base)", definition: "İki dal ucunun ortak atalarından, başka bir ortak atanın atası olmayanı; üç yollu birleştirme iki ucu bu commit'le karşılaştırır." },
    { term: "Rebase", definition: "Bir dalın kendine özgü commit'lerini başka bir ucun üstüne sırayla yeniden yazmak; değişiklik aynı kalır, kimlikler değişir." },
    { term: "Dal kapsaması", definition: "Testler çalışırken her karar noktasının (if) doğru ve yanlış çıkışlarından kaçının en az bir kez görüldüğünü veren oran; karşılaştırmaları tek tek sayan koşul kapsamasından ayrıdır." },
    { term: "Mutasyon skoru", definition: "Koda tek tek eklenen küçük hatalardan (mutantlardan) testlerin yakaladıklarının bütün mutantlara oranı." },
    { term: "Üç noktalı tahmin", definition: "Bir görevin süresini iyimser, en olası ve kötümser üç değerle verip ortalamayı (a + 4m + b)/6 ile hesaplayan yöntem." },
    { term: "WIP (yürütülen iş)", definition: "Başlanmış ama bitmemiş işlerin sayısı; kanban panosunda sütun başına bir üst sınırla kısıtlanır." },
    { term: "Teslim süresi ve çevrim süresi", definition: "Teslim süresi işin gelişinden bitişine, çevrim süresi panoya çekilişinden bitişine kadar geçen zamandır; fark, kuyrukta bekleyiştir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede programlama tek kişilik bir iştir: yaz, çalıştır, gör. Üniversitede yazılım mühendisliği dersi ilk kez başkasının kodunu okumayı, bir <strong>belirtim</strong> (spec) yazmayı ve ona karşı test üretmeyi öğretir. Önkoşul, sonkoşul ve değişmez (invariant) kavramları, bir fonksiyonun 'sözleşmesi' olarak biçimselleşir. Barbara Liskov ve Jeannette Wing'in 1994'teki makalesi bu sözleşmelerin kalıtımda nasıl korunacağını biçimsel bir tanıma bağlar: alt tür önkoşulu sıkılaştıramaz, sonkoşulu gevşetemez. Sayfadaki dört sekme de aynı derslerde karşına çıkar: commit grafiği Ayrık Matematik'in yönlü çevrimsiz grafları ve kısmi sıralamasıdır; kapsama ölçütleri ve mutasyon analizi Yazılım Testi dersinin omurgasıdır.",
      "Tahmin ve akış sekmeleri Olasılık ve İstatistik'e açılır: bağımsız rastgele değişkenlerin toplamında varyansların toplanması, merkezi limit teoremi ve Monte Carlo yöntemi orada ispatıyla görülür. Kanban panosu bir kuyruk ağıdır; Yöneylem Araştırması ve Kuyruk Teorisi dersleri Little yasasını, M/M/1 kuyruğunu ve bloke olan ağları Markov zincirleriyle çözer. Daha ileride <strong>biçimsel yöntemler</strong>, Therac-25 ya da Ariane gibi hataları test ile değil matematiksel ispatla dışlamayı amaçlar; sürücüsüz metro hatlarının ve uçak kontrol sistemlerinin bazı yazılımları bu yolla doğrulanır. Yazılım ekonomisi ve süreç yönetimi, Brooks'un gözlemlerini ölçülebilir modellere çevirmeye çalışır. Ve her yolda aynı soru yürür: değişen bir dünyada, çalışan bir şeyi bozmadan nasıl değiştirirsin?",
    ],
    topics: ["Belirtim ve sözleşmeyle tasarım", "Yazılım testi: kapsama ölçütleri ve mutasyon analizi", "Sürüm kontrol teorisi (graflar, üç yollu birleştirme)", "Olasılık: bağımsız toplamlar ve Monte Carlo", "Kuyruk teorisi ve Markov zincirleri", "Biçimsel doğrulama ve model denetimi", "Yazılım ölçümü ve proje ekonomisi"],
  },
  quiz: [
    {
      question: "main ve özellik ortak bir commit'ten ayrılmış, ikisi de birer commit ilerlemiş: main 1 önde · 1 geride. HEAD main'deyken özellik dalını çakışmasız birleştirirsen, main'in özelliğe göre yeni durumu ne olur?",
      options: ["0 önde · 0 geride", "1 önde · 0 geride", "2 önde · 0 geride", "2 önde · 1 geride"],
      answer: 2,
      explanation: "Üç yollu birleştirme iki ebeveynli yeni bir commit oluşturur ve özellik ucunu main'in atası yapar: geride kalan kalmaz. main'de olup özellikte olmayanlar ise ikidir: main'in kendi commit'i ve birleştirme commit'i. özellik etiketi yerinden kıpırdamaz. Sayfanın varsayılan deposunda birleştirince tam bunu okursun.",
    },
    {
      question: "Bir mutant, üçgen eşitsizliği denetimindeki a + b <= c koşulunu a + b < c yapıyor. Aşağıdaki testlerden hangisi bu mutantı yakalar?",
      options: ["(1, 1, 5) → üçgen değil", "(1, 2, 3) → üçgen değil", "(3, 4, 5) → çeşitkenar", "(2, 2, 3) → ikizkenar"],
      answer: 1,
      explanation: "İki koşul yalnız a + b = c olduğunda farklı sonuç verir. (1, 2, 3) için 1 + 2 = 3: özgün kod 'üçgen değil' der, mutant bu satırı geçip 'çeşitkenar' döndürür ve test kalır. (1, 1, 5) için 2 < 5 iki sürümde de doğrudur; öteki iki girdide a + b, c'den büyüktür. Sınır hatasını ancak tam sınırda duran girdi yakalar.",
    },
    {
      question: "Bir ekip günde ortalama 0,7 iş bitiriyor ve sistemde ortalama 4,2 iş var. Çıktı hızı değişmeden eldeki iş 8,4'e çıkarsa ortalama teslim süresi ne olur?",
      options: ["6 günde kalır; hız aynı", "6 günden 12 güne çıkar", "6 günden 8,4 güne çıkar", "Sürelerin dağılımı bilinmeden söylenemez"],
      answer: 1,
      explanation: "Little yasası: W = L/λ. Önce 4,2/0,7 = 6 gün, sonra 8,4/0,7 = 12 gün. Hız aynı kalırken eldeki iş iki katına çıkarsa her iş içeride iki kat uzun kalır. Yasa bir sayım özdeşliği olduğundan dağılım bilgisi gerekmez; gereken tek şey kararlı uzun dönem ortalamalarıdır.",
    },
  ],
  next: [
    { href: "tasarim-desenleri.html", title: "Tasarım Desenleri: Say, Karşılaştır, Bedelini Gör", why: "Dokuz desen sayfanın içinde gerçekten çalışır: gözlemcileri bağlar, algoritmayı çalışırken değiştirir, sınıfları sayar ve her desenin bedelini görürsün." },
    { href: "yoneylem-arastirmasi.html", title: "Yöneylem Araştırması: Doğrusal Programlama, Simpleks ve Kritik Yol", why: "Buradaki tek zincirin ötesi: dallanan bir proje ağında kritik yolu bulur ve zamanında bitme olasılığını sınarsın." },
    { href: "uretim-planlama-ve-endustri-muhendisligi.html", title: "Üretim Planlama: Stok, Kalite ve Akış", why: "İşler neden kuyrukta bekler? Aynı soru fabrikada: tohumlu bir benzetimle ölçer, ölçtüğünü kuyruk formülünün yanına koyarsın." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik Laboratuvarı: Şifre, Özet ve Anahtar", why: "Commit kimliklerini üreten özet işlevlerinin temeli: tek bitlik bir değişikliğin özetin yarısını nasıl çevirdiğini kendin ölçersin." },
  ],
  sources: [
    { title: "Wikipedia · Software engineering", url: "https://en.wikipedia.org/wiki/Software_engineering", note: "Terimin 1965-1966'daki ilk kullanımları, 7-11 Ekim 1968 Garmisch konferansı ve yazılım krizi (İngilizce)." },
    { title: "Wikipedia · The Mythical Man-Month", url: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month", note: "Brooks yasasının özgün cümlesi, OS/360 deneyimi ve n(n − 1)/2 iletişim yolu hesabı (İngilizce)." },
    { title: "Vikipedi · Git (yazılım)", url: "https://tr.wikipedia.org/wiki/Git_(yazılım)", note: "Git'in 2005'te BitKeeper'ın yerine doğuşu ve dağıtık sürüm kontrolünün tasarım hedefleri (Türkçe)." },
    { title: "Wikipedia · Little's law", url: "https://en.wikipedia.org/wiki/Little%27s_law", note: "L = λW bağıntısı, dağılımdan bağımsız oluşu ve sonlu gözlem penceresi çekincesi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
