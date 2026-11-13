window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mantik-ve-argumantasyon"] = {
  slug: "mantik-ve-argumantasyon",
  title: "Mantık ve Argümantasyon: Biçim, Kanıt ve Paradoks",
  field: "Felsefe ve Mantık",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Doğru bir sonuç, iyi bir argüman demek değildir. Doğruluk tablosu kur, karşı model ara, kuralları tek tek uygulayarak kanıt yaz; sonra safsatalara ve iki bin yılı aşkın paradokslara bak.",
  hook:
    "“Pil bittiyse telefon açılmaz. Telefon açılmıyor. Öyleyse pil bitmiş.” Kulağa kusursuz geliyor, değil mi? Ama pil dolu, ekran bozuk olabilir. Öncüllerin ikisi de doğruyken sonuç yanlış çıkabiliyorsa, akıl yürütmenin neresi bozuk? Üstelik bu kusuru konuya hiç bakmadan, yalnız cümlenin kalıbından görmek mümkün.",
  bigIdea:
    "Bir argümanın <strong>geçerliliği</strong> konusuna değil biçimine bağlıdır: öncüllerin hepsini doğru, sonucu yanlış yapan tek bir durum (bir <strong>karşı model</strong>) bulunursa biçim çöker; hiçbir durumda bulunamıyorsa öncüller doğru olduğu sürece sonuç da doğrudur.",
  story: [
    "Mantığı ayrı bir inceleme alanı olarak ilk kuran Aristoteles'tir (MÖ 4. yüzyıl). <em>Birinci Analitikler</em>'deki kıyas kuramı, orta terimin yerine göre üç figür ayırır ve olası öncül birleşimlerinden on dördünün sonucunun zorunlu olarak çıktığını gösterir. Aynı yüzyılda Megaralı okulun Miletli Eubulides'i, yalancı paradoksunun ve yığın (sorites) paradoksunun yaratıcısı sayılır. Diyalektikçiler Diodoros ve öğrencisi Philon'un başlattığı yolu Stoacı Khrysippos (MÖ 3. yüzyıl) bambaşka bir mantığa dönüştürdü: kavramlar arasındaki ilişkiler yerine bütün önermeleri “ve”, “veya”, “eğer” ile bağlayan bir <strong>önermeler mantığı</strong>. Sisteminin temelinde beş “kanıtlanamaz” çıkarım vardı; ilk ikisi bugün modus ponens ve modus tollens dediğimiz kalıplardır. Philon ise koşulu, öncülü doğru sonucu yanlışken yanlış, öteki her durumda doğru sayarak tanımlamıştı: bu sayfadaki → bağlacının ta kendisi.",
    "Orta Çağ'da mantığın en etkili adı İbn Sina'dır (980–1037). Mantığı en kapsamlı biçimde 1020'lerde yazdığı <em>eş-Şifa</em>'da işledi; etkisi o kadar büyüktü ki sonraki Arapça mantıkçılar artık Aristoteles'i değil onu yorumladı ya da eleştirdi; bu yüzden Arapça mantık tarihi “İbn Sina'dan önce” ve “sonra” diye ikiye ayrılır. Koşullu ve ayırıcı önermeleri de “her”, “bazı” gibi niceleyicilerle ele alan, Aristoteles'te bulunmayan bir koşullu kıyas kuramı kurdu; dayandığı bazı ayrımlar ise, adını pek anmasa da, Farabi'ye kadar uzanır. On dokuzuncu yüzyılda George Boole mantığı cebire çevirdi (<em>The Mathematical Analysis of Logic</em>, 1847; <em>The Laws of Thought</em>, 1854): bir sınıfı kendisiyle “çarpmak” onu değiştirmez, yani x² = x. Gottlob Frege 1879'da <em>Begriffsschrift</em>'i, “aritmetiğin dilini örnek alan bir saf düşünce formül dili”ni yayımladı; modern mantığın biçimsel dili buradan doğdu.",
    "Frege'nin büyük yapısı bir mektupla sarsıldı. Bertrand Russell 1901 baharında, kendi kendisinin öğesi olmayan sınıfların sınıfının bir çelişki doğurduğunu fark etti ve 16 Haziran 1902'de bunu Frege'ye yazdı. <em>Aritmetiğin Temel Yasaları</em>'nın ikinci cildi baskıdaydı; Frege kitaba aceleyle bir ek yazdı ve temel yasalarından birinin (V. yasa) bu biçimiyle savunulamayacağını kabul etti. Bu kriz yirminci yüzyıl mantığını biçimlendirdi. Alfred Tarski 1933'te Lehçe yayımladığı makalede, bir dilin doğruluk tanımının ancak ondan özce daha güçlü bir üst dilde verilebileceğini gösterdi. 1934'te Gerhard Gentzen ve Stanisław Jaśkowski birbirinden habersiz, insanların gerçekten akıl yürüttüğü gibi varsayım açıp kapatan <strong>doğal çıkarım</strong> sistemlerini yayımladı; 1952'de Frederic Fitch bunlara bu sayfada kullandığın girintili yazımı verdi.",
    "Gündelik tartışmanın hataları da Aristoteles'le başlar: <em>Sofistik Çürütmeler</em> on üç aldatıcı çürütme türü sayar, altısı dile bağlı (iki anlamlılık gibi), yedisi dilin dışında (kanıtlanacak olanı varsaymak gibi). Sonraki yüzyıllarda liste uzadı ve değişti; John Locke 1690'da <em>ad hominem</em> dediği şeyi, karşıdakini kendi kabullerinin sonuçlarıyla sıkıştırmak anlamında meşru bir yöntem olarak anlatıyordu. 1970'te Charles Hamblin <em>Fallacies</em> kitabında ders kitaplarının “standart işleyişi”ni sert biçimde eleştirdi. O günden bu yana safsataların tanımı, adları ve sınıflaması tartışılıyor; örneğin pragma-diyalektik yaklaşım safsatayı, eleştirel bir tartışmanın on kuralından birinin çiğnenmesi olarak tanımlar.",
  ],
  core: [
    {
      heading: "Geçerli, doğru, sağlam: üç ayrı şey",
      body:
        "Doğruluk tek tek önermelerin, geçerlilik argümanın niteliğidir. Bir argüman, öncüllerinin hepsinin doğru, sonucunun yanlış olduğu <em>hiçbir durum</em> yoksa geçerlidir. Bu tanım şaşırtıcı birleşimlere izin verir: “Bütün kuşlar uçar, penguen kuştur, öyleyse penguen uçar” geçerlidir ama bir öncülü yanlıştır. Tersine, “Pil bittiyse telefon açılmaz; telefon açılmıyor; öyleyse pil bitmiş” argümanının öncülleri de sonucu da bugün doğru olabilir, yine de geçersizdir, çünkü biçimi bir karşı modele izin verir. Olanaksız olan tek birleşim şudur: geçerli biçim, doğru öncüller, yanlış sonuç. Geçerli olup öncülleri gerçekten doğru olan argümana <strong>sağlam</strong> denir; sağlamlığın sınanması mantığın değil dünyanın işidir.",
      formula: "Γ ⊨ C ⇔ Γ'nin hepsini D, C'yi Y yapan satır yoktur",
      formulaNote: "Γ öncüller kümesi, C sonuç. Tek bir karşı model satırı geçersizliğin eksiksiz kanıtıdır.",
    },
    {
      heading: "Doğruluk tablosu ve tuhaf “ise”",
      body:
        "Önermeler mantığında her değişken D ya da Y olabilir; n değişkenli bir formülün 2ⁿ satırlık tablosu bütün olası durumları listeler. Her satırda doğru olan formül <strong>totoloji</strong> (p ∨ ¬p), hiçbirinde doğru olmayan <strong>çelişki</strong> (p ∧ ¬p), ikisi de olmayan <strong>olumsal</strong>dır. İki formül her satırda aynı değeri alıyorsa eşdeğerdir (De Morgan: ¬(p ∧ q) ile ¬p ∨ ¬q). Maddi koşul p → q yalnız p doğru, q yanlışken yanlıştır; öncül yanlışsa, iki parça arasında hiçbir bağ olmasa da doğrudur. Gündelik “eğer” çoğu zaman bir bağ ister; bu yüzden → bir yaklaşıklıktır ve koşulluların başka çözümlemeleri felsefede hâlâ tartışılır. Peirce yasası ((p → q) → p) → p gibi sezgiye hiç de açık gelmeyen formüller bile tabloyla dört satırda totoloji çıkar.",
      formula: "p → q ≡ ¬p ∨ q ≡ ¬q → ¬p, ama p → q ≢ q → p",
      formulaNote: "Karşıt ters (¬q → ¬p) koşulla eşdeğerdir; evrik (q → p) değildir. Gerektirme de tabloyla sınanır: F₁ ⊨ F₂ ancak ve ancak F₁ → F₂ bir totolojidir.",
    },
    {
      heading: "Doğal çıkarım: varsayım aç, kapat",
      body:
        "Tablo her durumu tek tek dener; kanıt ise sonuca kurallarla yürür. Doğal çıkarımda her bağlacın bir <strong>giriş</strong> ve bir <strong>eleme</strong> kuralı vardır: ∧E bir birleşimden parçasını alır, →E modus ponenstir. En güçlü kurallar varsayım açar: A'yı varsayıp B'ye ulaşırsan alt kanıtı kapatır, A → B yazarsın (→G); A'dan ⊥'a ulaşırsan ¬A yazarsın (¬G). Kapanan alt kanıtın içindeki satırlar artık kullanılamaz, yalnız bütünü gösterilebilir; kapsam kuralı budur ve bir varsayımı “unutup” sonucu ona yaslamayı engeller. Bu sistemde kanıtlanan her argüman geçerlidir (<strong>sağlamlık</strong>) ve önermeler mantığında geçerli her argüman kanıtlanabilir (<strong>tamlık</strong>); anlam ile sözdizimi aynı argümanları onaylar.",
      formula: "[A ⋯ B] ⊢ A → B · [A ⋯ ⊥] ⊢ ¬A",
      formulaNote: "Köşeli ayraç kapanmış bir alt kanıtı gösterir; sayfada mor dikey çizgiyle çizilir.",
    },
    {
      heading: "“Her” ve “bir”in sırası",
      body:
        "Önermeler mantığı “Her öğrenci bir kitap okudu” cümlesini bölünmez bir p sayar; içine girmek için yüklem mantığının niceleyicileri gerekir: ∀x (her x için) ve ∃y (en az bir y vardır ki). Bu cümle iki ayrı önerme söyleyebilir: ∀x ∃y O(x, y), yani herkesin okuduğu bir kitap var ama kitaplar farklı olabilir; ya da ∃y ∀x O(x, y), yani herkesin okuduğu tek bir kitap var. İkincisi birinciyi gerektirir, tersi geçmez. Sayfadaki üç öğrenci ve üç kitaplık dünyada 9 olası okuma ilişkisi, dolayısıyla 2⁹ = 512 dünya vardır; sayfa hepsini tarar: birincinin doğru, ikincinin yanlış olduğu 174 dünya, tersi için 0 dünya bulur. Sonsuz modelli tam yüklem mantığında böyle bir tarama artık mümkün değildir; orada geçerliliği göstermenin yolu kanıttır.",
      formula: "∃y ∀x O(x, y) ⊨ ∀x ∃y O(x, y), ama ∀x ∃y O(x, y) ⊭ ∃y ∀x O(x, y)",
      formulaNote: "O(x, y): x öğrencisi y kitabını okudu. Niceleyicilerin yerini değiştirmek çoğu zaman anlamı değiştirir.",
    },
    {
      heading: "Bir paradoksu “çözmek” ne demek?",
      body:
        "Paradoks, kabul edilebilir görünen öncüllerden kabul edilemez görünen bir sonuca geçerli görünen bir yoldan varan argümandır. Çözmek üç yoldan birini seçmektir: bir öncülü reddetmek, bir çıkarım adımını reddetmek ya da sonucu kabul etmek. Yalancıda (“Bu cümle yanlıştır”) iki klasik değerin hiçbiri tutarlı değildir: Tarski dilin kendi doğruluğundan söz etmesini kısıtlar, Kripke yalancıyı doğruluk boşluğuna koyar, Priest onun hem doğru hem yanlış olduğunu kabul eder. Yığında epistemik görüş keskin ama bilinmeyen bir sınır, derece kuramları ise 0 ile 1 arasında doğruluk önerir. Curry paradoksu hiç “değil” kullanmadan her iddiayı kanıtlar; bu yüzden yalnız değilin davranışını değiştiren çözümler onu durdurmaz, bir varsayımı iki kez kullanmayı (daraltma) sorgulamak gerekir.",
      formula: "K: “K doğruysa, Q.” ⟹ Q",
      formulaNote: "Q yerine ne yazılırsa yazılsın: Curry'nin modern biçimi 1942'ye, Haskell Curry'nin bir makalesine dayanır.",
    },
  ],
  lab: {
    intro:
      "Sayfa beş sekmeli bir formül ve argüman tezgâhıdır. <strong>01 · Önermeler ve doğruluk tabloları</strong> sekmesinde Formül 1 ve Formül 2 kutularına yazdığın formüllerin tablosu kurulur; satırlar bütün değişkenlerin D olduğu durumdan başlar, iki formülün ayrıldığı satırlar kırmızıdır. <strong>02 · Geçerlilik ve karşı model</strong> bütün satırları tarayıp karşı modeli kırmızıyla gösterir; altında niceleyicilerin küçük dünyası durur. <strong>03 · Doğal çıkarımla kanıt</strong> her satırı kural kural denetler, <strong>04 · Safsatalar</strong> on üç örnekte teşhis ister, <strong>05 · Paradokslar</strong> yalancı, yığın, Akhilleus ve Curry'yi yarışan çözümleriyle gösterir. Formül kutularında ¬ ∧ ∨ → ↔ simge düğmeleri vardır; “ve”, “veya”, “ise” diye Türkçe de yazabilirsin.",
    experiments: [
      {
        title: "Evrik bir tuzak mı?",
        predict: "“Yağmur yağarsa sokak ıslanır” ile “Sokak ıslanırsa yağmur yağmıştır” aynı şeyi mi söyler? p → q ile q → p kaç satırda aynı değeri alır?",
        do: "1. sekmede <strong>Evrik (tuzak)</strong> düğmesine bas ve Karşılaştırma kutusunu oku. Sonra <strong>Karşıt ters</strong> düğmesine bas.",
        observe: "Evrikte kutu <strong>2 / 4 · eşdeğer değil</strong> gösterir; durum satırı “İlk ayrılan satır 2 (p = D, q = Y): F₁ Y, F₂ D” der, kırmızı satırlar 2 ve 3'tür ve ikisi de ötekini gerektirmez. Karşıt terste (¬q → ¬p) kutu <strong>4 / 4 · eşdeğer</strong> olur.",
        explain: "Koşul yalnız “öncül doğru, sonuç yanlış” durumunu yasaklar. Evrik bu yasağı öbür satıra taşır, bu yüzden başka bir önermedir. Karşıt ters ise aynı satırı yasaklar: “ıslanmadıysa yağmamıştır” ile ilk cümle aynı bilgiyi taşır.",
      },
      {
        title: "Karşı modeli yakala",
        predict: "Sayfanın açılıştaki biçimi “Sonucu doğrulama”dır: p → q, q ⊢ p. Geçerli mi? Peki “Bir seçeneği doğrulama” (p ∨ q, p ⊢ ¬q)?",
        do: "2. sekmede kararı ve Karşı model kutusunu oku. Sonra Hazır biçim menüsünden önce <strong>Modus tollens</strong>'i, ardından <strong>Bir seçeneği doğrulama</strong>'yı seç. Son olarak Öncül 1 kutusundaki p ∨ q'yu silip yerine p ↔ ¬q yaz.",
        observe: "Sonucu doğrulama: <strong>Geçersiz</strong>, karşı model <strong>1 satır · ilk: 3</strong> (p = Y, q = D). Modus tollens: <strong>Geçerli</strong>, öncüllerin hepsi yalnız 1 / 4 satırda doğru ve sonuç orada da doğru. Bir seçeneği doğrulama: Geçersiz, karşı model satır 1 (p = D, q = D). p ↔ ¬q yazınca hazır biçim “Kendi biçimim”e döner ve karar <strong>Geçerli</strong> olur.",
        explain: "3. satır, pilin dolu ama ekranın bozuk olduğu dünyadır. “Veya” mantıkta kapsayıcıdır: şeker de bal da katılmış olabilir. “Ya … ya …” anlamını p ↔ ¬q ile açıkça yazınca biçim geçerli olur.",
      },
      {
        title: "Kanıt yalan söyleyemez",
        predict: "Doğruluk tablosu bir argümanı geçersiz buluyorsa, kurallara uyan bir kanıt yine de ona ulaşabilir mi?",
        do: "3. sekmede Görev menüsünden <strong>Hatalı deneme: p → q, q ⊢ p</strong> seç. Yeni satırın formülüne p yaz, Kural olarak <strong>→E · modus ponens</strong>, Dayanak satırlar olarak 1, 2 gir ve <strong>Satırı ekle</strong>. Sonra Görev menüsünden Modus tollens'i seçip <strong>Çözümü göster</strong>'e bas ve q satırını <strong>T · tekrar</strong> kuralıyla 4. satıra dayanarak ekle.",
        observe: "Doğruluk tablosuna göre kutusu <strong>geçersiz · karşı model satır 3</strong> der; 3. satırda “q, p → q koşulunun öncülü değil sonucudur; sonucu doğrulayarak öncüle geçilemez.” hatası çıkar. Modus tollensin 7. satırında ise “4. satır kapanmış bir alt kanıtın içinde; artık kullanılamaz.” yazar.",
        explain: "Sistem sağlamdır: her kural doğruyu korur, bu yüzden geçersiz bir sonuca hiçbir doğru kanıt ulaşamaz. Kapsam kuralı da bunun parçasıdır: 4. satırdaki q, kapanmış bir p varsayımına dayanıyordu.",
      },
      {
        title: "Sonsuz aşama, sonlu yol",
        predict: "Akhilleus 10 m/s, kaplumbağa 5 m/s koşuyor ve kaplumbağa 90 m önde. Zenon'un aşamaları sonsuzdur; yetişme mesafesi ve süresi ne olur? Hızlar eşitlenirse?",
        do: "5. sekmede Akhilleus bölümünde Kaplumbağanın hızı kaydırıcısını 1 m/s'den 5 m/s'ye getir; aşama tablosunu ve dört kutuyu oku. Sonra 10 m/s'ye çıkar.",
        observe: "Varsayılanda oran 0,100, toplam 100,00 m · 10,00 s ve 5 aşama. 5 m/s'de oran <strong>0,500</strong>, sonsuz toplam <strong>180,00 m · 18,00 s</strong>, göreli hızla buluşma da 18,00 s; ara 1 mm'nin altına <strong>17</strong> aşamada iner. 10 m/s'de toplam “∞ (ıraksak)”, buluşma “yetişemez” olur.",
        explain: "Aşamaların yolları 90 + 45 + 22,5 + … geometrik dizisidir; r &lt; 1 iken toplamı d / (1 − r) = 90 / 0,5 = 180 m'dir. Aynı sonuç aşama saymadan çıkar: 90 m / 5 m/s = 18 s. Sonsuz sayıda terim, sonsuz büyüklük demek değildir.",
      },
    ],
  },
  wow: [
    {
      title: "Stoacıların “veya”sı başkaydı",
      body:
        "Khrysippos'un beş kanıtlanamazından dördüncüsü şöyledir: “Ya birincisi ya ikincisi; birincisi; öyleyse ikincisi değil.” Bu, sayfanın geçersiz bulduğu “Bir seçeneği doğrulama” biçimidir. Stoacılar yanılmıyordu: onların ayırıcısı dışlayıcıydı, iki seçeneğin birlikte doğru olmasına izin vermiyordu (daha sonraki Stoacılar kapsayıcı bir “veya” da tanımladı). 2. sekmede ilk öncülü p ↔ ¬q diye yazınca karar Geçerli'ye döner. İki bin yıllık bir “hata”, aslında bir tanım farkıdır.",
    },
    {
      title: "Mor çizgiler aslında kutu",
      body:
        "Jaśkowski 1934'te her varsayımın geçerli olduğu bölgeyi bir kutunun içine alıyordu. Fitch 1952'de kutuları korudu ama yalnız sol kenarlarını çizdi; varsayımı da kısa bir yatay çizginin üstüne yazdı. 3. sekmedeki mor dikey çizgiler ve altı çizili varsayım satırları, Jaśkowski'nin 1934 kutularının bugünkü hâlidir.",
    },
    {
      title: "999 999 iyi adım, bir kötü zincir",
      body:
        "Yığın paradoksunda derece kuramının sayfadaki öğretim modeli, 1 000 000 taneden 1 taneye inen 999 999 koşulluyu hesaplar. En zayıfı 578 tanededir ve derecesi bile 0,99935'tir: her adım neredeyse tam doğru. Ama kayıplar toplanır, toplam 0,999998 eder; Łukasiewicz modus ponensi “1 tane yığındır” sonucu için yalnız 0,000001'lik bir güvence bırakır. Her halka sağlam görünür, zincir kopar.",
    },
  ],
  worked: {
    title: "İki koşul ve bir yadsıma: tam bir Fitch kanıtı",
    prompt:
      "“Alarm çalarsa bekçi uyanır. Bekçi uyanırsa ışık yanar. Işık yanmadı. Öyleyse alarm çalmadı.” Bu argümanı p → q, q → r, ¬r ⊢ ¬p olarak yaz, doğal çıkarımla kanıtla ve doğruluk tablosuyla sağlamasını yap.",
    steps: [
      "Biçimi çıkar: p “alarm çalar”, q “bekçi uyanır”, r “ışık yanar”. 3. sekmede “Kendi görevin” kutusuna <code>p → q, q → r, ¬r ⊢ ¬p</code> yaz ve <strong>Kendi görevini başlat</strong>. Üç öncül 1–3. satırlara yerleşir; Doğruluk tablosuna göre kutusu <strong>geçerli</strong> der.",
      "Strateji: hedef bir yadsıma (¬p), o hâlde ¬G kullanacağız: p'yi varsay, ⊥'a ulaş. 4. satır: p, kural <strong>Varsayım</strong>. Bir alt kanıt açılır (Açık alt kanıt kutusu “1 açık”).",
      "Alt kanıtın içinde iki kez modus ponens: 5. satır q, →E 1, 4; 6. satır r, →E 2, 5. Şimdi elimizde hem r (6) hem ¬r (3) var: 7. satır ⊥, ¬E 6, 3. 3. satır dışarıda, ama alt kanıtın üstünde olduğu için içeriden kullanılabilir.",
      "8. satır: ¬p, kural ¬G, dayanak 4–7. Kural alt kanıtı kendiliğinden kapatır; p varsayımı artık açık değildir. Durum satırı: “Kanıt tamam: hedef ¬p, 8. satırda en dış düzeyde elde edildi; 8 satırın hepsi kurala uygun.”",
      "Sağlama: 2. sekmede Öncül 1–3 kutularına p → q, q → r, ¬r, Sonuç kutusuna ¬p yaz. 8 satırdan yalnız birinde (8. satır, p = q = r = Y) öncüllerin hepsi doğrudur, orada ¬p de doğrudur: <strong>1 / 8</strong>, karşı model yok, <strong>Geçerli</strong>.",
    ],
    result:
      "Sekiz satırlık kanıt ile sekiz satırlık tablo aynı yargıya varır; tamlık teoremi bunun tesadüf olmadığını söyler. Argüman geçerlidir; sağlam olup olmadığı, ışığın gerçekten yanmadığına ve koşulların gerçekten tuttuğuna bağlıdır.",
  },
  misconceptions: [
    {
      myth: "Geçerli bir argümanın sonucu doğrudur.",
      truth:
        "Geçerlilik yalnız “öncüller doğruysa sonuç da doğrudur” der. “Bütün kuşlar uçar, penguen kuştur, öyleyse penguen uçar” geçerlidir, sonucu yanlıştır; çünkü bir öncülü yanlıştır. Sonucun doğruluğunu güvenceye alan, sağlamlıktır: geçerli biçim artı gerçekten doğru öncüller.",
    },
    {
      myth: "Mantıktaki “veya”, gündelik “ya … ya …” gibi iki seçenekten yalnız birine izin verir.",
      truth:
        "p ∨ q, ikisi birden doğruyken de doğrudur (kapsayıcı veya). Bu yüzden “şeker ya da bal katılmış; şeker katılmış; öyleyse bal katılmamış” geçersizdir; 2. sekme karşı modeli 1. satırda (p = D, q = D) gösterir. Dışlayıcı anlam isteniyorsa açıkça p ↔ ¬q yazılmalıdır.",
    },
    {
      myth: "Bir argümanda safsata bulduysam, sonucu yanlıştır.",
      truth:
        "Kötü bir gerekçe yalnız o gerekçenin sonucu desteklemediğini gösterir; sonuç başka gerekçelerle yine doğru olabilir. Üstelik etiketler bağlama bağlıdır: konusunda uzman bir otoriteye dayanmak çoğu zaman akıllıcadır, bir tanığın güvenilirliğini sorgulamak kişiye saldırı değil konunun kendisidir. Locke'un 1690'da “ad hominem” dediği şey bile bir safsata değil, karşıdakini kendi kabulleriyle sıkıştıran meşru bir yöntemdi.",
    },
    {
      myth: "Sonsuz sayıda aşamayı geçmek sonsuz zaman ister; Zenon bu yüzden haklıdır.",
      truth:
        "Aşamaların süreleri de geometrik olarak küçülür: varsayılan ayarlarda 9 + 0,9 + 0,09 + … = 10 s. Cauchy'nin sonsuz toplam tanımı bu sonlu sınırı kesinleştirdi. Felsefi soru yine de tam kapanmış değildir: sonsuz sayıda işin tek tek tamamlanabileceği (süper görevler) ve uzayın gerçekten sürekli olup olmadığı hâlâ tartışılır.",
    },
  ],
  glossary: [
    { term: "Geçerlilik", definition: "Öncüllerin hepsi doğruyken sonucun yanlış olabileceği hiçbir durumun bulunmaması; argümanın biçimine bağlı bir nitelik." },
    { term: "Sağlamlık (argüman)", definition: "Geçerli olup öncüllerinin hepsi gerçekten doğru olan argümanın niteliği; sonucu da zorunlu olarak doğrudur." },
    { term: "Karşı model", definition: "Öncüllerin hepsini doğru, sonucu yanlış yapan değer ataması; tek bir tanesi argümanın geçersiz olduğunu kanıtlar." },
    { term: "Totoloji", definition: "Doğruluk tablosunun her satırında doğru olan formül, ör. p ∨ ¬p; doğruluğu yalnız biçiminden gelir." },
    { term: "Gerektirme (⊨)", definition: "F₁'in doğru olduğu her durumda F₂'nin de doğru olması; F₁ → F₂ bir totolojiyse F₁ ⊨ F₂ yazılır." },
    { term: "Maddi koşul (→)", definition: "Yalnız öncülü doğru, sonucu yanlışken yanlış olan bağlaç; p → q, ¬p ∨ q ile eşdeğerdir." },
    { term: "Alt kanıt", definition: "Doğal çıkarımda bir varsayımla açılan ve →G, ¬G ya da ∨E ile kapanan bölge; kapanınca içindeki satırlar kullanılamaz." },
    { term: "Safsata", definition: "İkna edici görünen ama sonucunu desteklemeyen akıl yürütme; biçimsel (sonucu doğrulama) ya da biçim dışı (korkuluk) olabilir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki malzeme üniversitede iki kapıdan girer. Felsefe bölümlerinin <strong>Mantığa Giriş</strong> dersinde doğruluk tabloları, doğal çıkarım ve gündelik argümanların çözümlenmesi; matematik ve bilgisayar bölümlerinin <strong>Ayrık Matematik</strong> dersinde ise önermeler mantığı, niceleyiciler ve kanıt yöntemleri (doğrudan kanıt, olmayana ergi, karşıt ters) işlenir. Sonra yüklem mantığına geçilir: niceleyiciler, eşitlik, modeller. Orada tablo artık işe yaramaz, çünkü bir formülün sonsuz sayıda modeli olabilir; sağlamlık ve tamlık teoremleri, kanıt ile anlam arasındaki köprüyü bu kez sonsuz modeller için kurar.",
      "<strong>Matematiksel Mantık</strong> dersinde kanıtın kendisi incelenir: kanıt kuramı (Gentzen'in ardılı), model kuramı (Tarski'nin ardılı) ve Gödel'in eksiklik teoremleri, yeterince güçlü ve tutarlı bir aritmetik kuramının kendi tutarlılığını kanıtlayamayacağını gösterir. Bu teoremlerdeki kendinden söz etme hilesi, yalancı paradoksunun ve hesaplamadaki durma probleminin akrabasıdır. Bilgisayar biliminde aynı fikirler SAT çözücülerde (doğruluk tablosunu akıllıca kısaltmak), program doğrulamada ve kanıt yardımcılarında yaşar; felsefede ise koşullular, belirsizlik (yığın) ve doğruluk kuramı canlı araştırma alanlarıdır.",
    ],
    topics: ["Yüklem mantığı", "Sağlamlık ve tamlık", "Gödel'in eksiklik teoremleri", "Modal mantık", "Kanıt kuramı", "SAT ve otomatik kanıt", "Belirsizlik ve doğruluk kuramları"],
  },
  quiz: [
    {
      question: "Geçerli olduğunu bildiğin bir argümanın sonucu yanlış çıktı. Ne söylenebilir?",
      options: ["Argüman aslında geçersizdir", "Öncüllerden en az biri yanlıştır", "Öncüllerin hepsi yanlıştır", "Hiçbir şey söylenemez"],
      answer: 1,
      explanation: "Geçerli biçimde “öncüllerin hepsi doğru, sonuç yanlış” durumu olanaksızdır. Sonuç yanlışsa öncüllerin hepsi birden doğru olamaz; en az biri yanlıştır. Hangisinin yanlış olduğunu biçim söylemez; bu, modus tollensin argümanların kendisine uygulanmasıdır.",
    },
    {
      question: "Γ ⊨ C geçerli bir argümandır. Γ'ye istediğin yeni bir öncülü (çelişkili olsa bile) eklersen argüman ne olur?",
      options: ["Geçerli kalır", "Geçersiz olabilir", "Yeni öncül sonuçla çelişiyorsa geçersiz olur", "Ancak yeni öncül doğruysa geçerli kalır"],
      answer: 0,
      explanation: "Öncül eklemek, öncüllerin hepsinin doğru olduğu satırları yalnız azaltır; karşı model daha önce yoktu, şimdi de olamaz. Bu yüzden klasik mantık “tekdüzedir”. Uç durum: çelişkili öncüller hiçbir satırı bırakmaz ve argüman boş yere geçerli olur (2. sekmede “Çelişkiden her şey”: 0 / 4).",
    },
    {
      question: "Üç öğrenci ve üç kitaplık bir dünyada “Bütün öğrencilerin okuduğu tek bir kitap var” (∃y ∀x O) doğru. “Her öğrencinin okuduğu en az bir kitap var” (∀x ∃y O) için ne söylenebilir?",
      options: ["Kesinlikle doğrudur", "Kesinlikle yanlıştır", "Dünyaya bağlıdır", "Yalnız köşegen dünyada doğrudur"],
      answer: 0,
      explanation: "Herkesin okuduğu bir kitap varsa, her öğrenci için o kitap bir tanık olur. Sayfa 512 dünyanın hepsini tarar ve ∃∀'nın doğru, ∀∃'nin yanlış olduğu 0 dünya bulur; tersi için 174 dünya vardır, örneğin “Herkes ayrı kitap” köşegeni.",
    },
  ],
  next: [
    { href: "mantik-kapilari.html", title: "Mantık Kapıları Laboratuvarı", why: "Aynı ∧, ∨ ve ¬ bu kez elektrik devresinde: kapıları doğruluk tablolarıyla sına, De Morgan eşdeğerliklerini karşılaştır, bir toplayıcı kur." },
    { href: "anlambilim-ve-edimbilim.html", title: "Anlambilim ve Edimbilim: Anlam İlişkileri, Frege, Kapsam, Grice, Söz Edimleri", why: "Mantığın doğal dildeki karşılığı: gerektirme ile sezdirimi ayırır, niceleyici kapsamını küçük dünyalarda sınar, önvarsayımın olumsuzlamadan nasıl sağ çıktığını görürsün." },
    { href: "epistemoloji.html", title: "Epistemoloji: Bilgi, Gettier, Şüphecilik, Gerekçe ve Tümevarım", why: "Geçerli çıkarımdan bilgiye: Gettier örneklerini yargıla, şüphecilik argümanının öncüllerini tek tek kabul ya da ret et." },
    { href: "bayes-olasilik.html", title: "Bayes ve Koşullu Olasılık Laboratuvarı", why: "Tümdengelimin bittiği yerde kanıt ağırlığı başlar: bir gözlemden sonra bir iddiaya inancını ne kadar değiştirmen gerektiğini hesapla." },
  ],
  sources: [
    { title: "Stanford Encyclopedia of Philosophy · Ancient Logic", url: "https://plato.stanford.edu/entries/logic-ancient/", note: "Aristoteles'in kıyas kuramı ve on dört geçerli kip, Eubulides'in paradoksları, Khrysippos'un beş kanıtlanamazı ve Stoacıların dışlayıcı “veya”sı, Philon'un ve Diodoros'un koşul tanımları (İngilizce)." },
    { title: "Stanford Encyclopedia of Philosophy · Natural Deduction Systems in Logic", url: "https://plato.stanford.edu/entries/natural-deduction/", note: "Gentzen ve Jaśkowski'nin 1934 sistemleri ve Fitch'in 1952 yazımı; giriş ve eleme kuralları (İngilizce)." },
    { title: "Stanford Encyclopedia of Philosophy · Fallacies", url: "https://plato.stanford.edu/entries/fallacies/", note: "Sofistik Çürütmeler'deki on üç tür, Locke'un ad hominem'i, Hamblin'in 1970 eleştirisi ve pragma-diyalektik yaklaşım (İngilizce)." },
    { title: "Stanford Encyclopedia of Philosophy · Liar Paradox", url: "https://plato.stanford.edu/entries/liar-paradox/", note: "Tarski'nin dil hiyerarşisi, Kripke'nin 1975 kısmi doğruluk yüklemi, Priest'in diyaleteizmi ve intikam sorunu (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
