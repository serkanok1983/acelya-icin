window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["programlamaya-giris"] = {
  slug: "programlamaya-giris",
  title: "Programlamaya Giriş: Makineye Adım Adım Anlatmak",
  field: "Bilgisayar Bilimi",
  level: "Lise hazırlık",
  minutes: 60,
  tagline:
    "Değişken, koşul, döngü, fonksiyon ve liste: Türkçe anahtar sözcüklü küçük bir dilde gerçek programlar yaz, çalıştır, satır satır izle ve gizli testlerle sına.",
  hook:
    "Matematik öğretmeni tahtaya <code>x = x + 1</code> yazsa sınıf itiraz eder: hiçbir sayı kendisinin bir fazlasına eşit değildir. Oysa bu satır, dünyadaki programların belki de en sık yazılan satırıdır. Bu sayfada ilk programını yazarken o satırın neden çelişki değil bir eylem olduğunu, değişkenler tablosunda x'in 5'ten 6'ya geçtiği anı izleyerek göreceksin.",
  bigIdea:
    "Bir program, bilgisayarın hiç yorum katmadan sırayla yaptığı küçük adımların listesidir; programlamayı öğrenmek, her adımdan sonra değişkenlerin ne olduğunu kafanda izleyebilmektir.",
  story: [
    "Programlama, onu çalıştıracak makineden önce doğdu. 1842–43'te Ada Lovelace, Luigi Menabrea'nın Charles Babbage'ın Analitik Makinesi üzerine yazdığı makaleyi İngilizceye çevirdi ve çeviriye A'dan G'ye, makalenin kendisinden üç kat uzun yedi not ekledi; metin 1843 Eylülünde yayımlandı. <strong>G notu</strong>, makinenin Bernoulli sayılarını nasıl hesaplayacağını adım adım anlatır ve sık sık yayımlanmış ilk bilgisayar programı diye anılır. Makine hiç inşa edilmediği için program hiç çalışmadı. Tarihçiler bu unvanı tartışır: Babbage'ın kendi defterlerinde daha önce yazılmış programlar vardır ve notlardaki programların ne kadarının Lovelace'a ait olduğu konusunda görüşler ayrılır. Lovelace'ın tartışmasız bir öngörüsü ise makinenin “sayılardan başka şeyler” üzerinde de işleyebileceği, örneğin müzik besteleyebileceği fikriydi.",
    "İlk elektronik bilgisayarlar sayı kodlarıyla programlanıyordu ve bu çok yorucuydu. Kariyerine 1944'te Harvard Mark I'in programcı kadrosunda başlayan Grace Hopper, 1952'de A-0 adlı sistemi çalışır hâle getirdi; kendisi buna <strong>derleyici</strong> diyordu, ama bugünkü ölçülerle bir derleyicinin parçası olan bağlayıcıya (linker) daha yakındı. Hopper'ın asıl tutkusu, programların İngilizce sözcüklerle yazılması ve makine koduna bilgisayarın kendisince çevrilmesiydi; “bilgisayarlar İngilizce anlamaz” itirazı yüzünden fikri üç yıl kabul görmedi. Bu fikir FLOW-MATIC'e, oradan da COBOL'a uzandı. Aynı yıllarda IBM'de John Backus'un ekibi FORTRAN'ı (adı “formül çevirisi” anlamına gelir) geliştirdi; ilk derleyicisi 1957'de teslim edildi ve bilim insanları programlarını formüllere yakın bir yazımla yazabilir oldu.",
    "Sonra programlama uzmanların elinden çıkmaya başladı. 1964'te Dartmouth College'da John Kemeny ve Thomas Kurtz, fen dışındaki bölümlerin öğrencileri de bilgisayar kullanabilsin diye BASIC'i tasarladı; adı “yeni başlayanlar için çok amaçlı simgesel komut kodu” anlamına gelen İngilizce sözcüklerin baş harfleridir. 1967'de Wally Feurzeig, Seymour Papert ve Cynthia Solomon, çocukların sözcüklerle ve cümlelerle oynayarak deneyebileceği Logo dilini tasarladılar; çizgi çizen “kaplumbağa” kısa süre sonra, önce ekranda, 1969'da da yerde gezen bir robot olarak geldi. Bu sayfadaki öğretim dili de aynı geleneğin küçük bir torunudur: anahtar sözcükleri Türkçedir, hata iletileri ne yanlış gittiğini açıklamaya çalışır.",
    "Hata ayıklamanın da meşhur bir hikâyesi var. 1947'de Hopper'ın ekibi Mark II bilgisayarının bir rölesine sıkışmış bir güve buldu ve kayıt defterine “bulunan ilk gerçek böcek (bug) vakası” diye not düştü. Hopper bu terimi icat etmedi: mühendisler arızalara onlarca yıldır böyle diyordu. Ama hikâye, programcılığın büyük bölümünün yazmak değil, yazdığın şeyin neden beklediğin gibi çalışmadığını bulmak olduğunu iyi anlatır. Bu sayfanın “Adım adım izle” düğmesi tam bu iş için var.",
  ],
  core: [
    {
      heading: "Değer, tür ve değişken",
      body:
        "Bir program <strong>değerlerle</strong> çalışır. Sayfadaki dilde üç temel tür var: sayı (<code>42</code>, <code>3.5</code>), metin (tırnak içinde, <code>\"42\"</code>) ve mantıksal değer (<code>doğru</code>, <code>yanlış</code>). Tür, bir değerle ne yapılabileceğini belirler: <code>7 + 1</code> sekizdir, <code>\"7\" + \"1\"</code> ise iki metni uç uca ekler ve <code>71</code> yazdırır. <strong>Değişken</strong> bir değere verilmiş addır; <code>x = 5</code>, x adını 5 değerine bağlar. Kodda ondalık ayırıcının nokta olduğuna dikkat et: virgül değerleri birbirinden ayırır, <code>yaz(3,5)</code> iki ayrı sayı yazar.",
      formula: "yaz(tür(42), tür(\"42\"), tür(yanlış))  →  sayı metin mantıksal",
      formulaNote: "Ders 1'in ilk örneğinin son satırı. Aynı görünen 42 ile \"42\" farklı türdendir; bu fark sayfadaki pek çok hatanın kaynağıdır.",
    },
    {
      heading: "Atama bir eşitlik değil, bir eylemdir",
      body:
        "<code>x = x + 1</code> satırını bilgisayar iki adımda okur: önce sağ tarafı, x'in <em>şimdiki</em> değeriyle hesaplar, sonra sonucu soldaki ada koyar. Eski değer silinir. Bu yüzden iki değişkenin değerini takas etmek için üçüncü bir değişken gerekir: <code>a = b</code> yazıldığı an a'nın eski değeri kaybolur. Eşitliği <em>sormak</em> için ayrı bir işaret vardır: <code>==</code>. İkisini karıştırmak o kadar yaygındır ki sayfadaki dil koşulda tek <code>=</code> görünce programı hiç başlatmaz ve “tek = atamadır” der.",
      formula: "x = 5 → x = x + 1 → x = x * 2   (x: 5, 6, 12)",
      formulaNote: "Ders 2'nin ilk örneği. Her satır bir öncekinin bıraktığı değerle çalışır; sıra değişirse sonuç değişir.",
    },
    {
      heading: "İfade ve işlem önceliği",
      body:
        "<strong>İfade</strong>, tek bir değere indirgenen bir yazımdır. Bilgisayar ifadeyi her adımda tek bir işlem yaparak indirir; hangi işlemin önce yapılacağını öncelik sırası belirler: parantez, sonra çarpma ve bölmeler, sonra toplama ve çıkarma, sonra karşılaştırmalar, en son <code>değil</code>, <code>ve</code>, <code>veya</code>. Aynı düzeydekiler soldan sağa yapılır, bu yüzden <code>10 - 4 - 3</code> üçtür, dokuz değil. Bölmenin üç biçimi var: <code>7 / 2</code> → 3.5, taban bölme <code>7 // 2</code> → 3 ve kalan <code>7 % 2</code> → 1. Kalan, bir sayının çift olup olmadığını söyler: <code>n % 2 == 0</code>.",
      formula: "2 + 3 * 4 - (8 - 2) / 3 → 2 + 12 - (8 - 2) / 3 → 14 - (8 - 2) / 3 → 14 - 6 / 3 → 14 - 2 → 12",
      formulaNote: "Ders 3'teki “Bir ifadeyi adım adım indir” kutusunun varsayılan ifadesi: 5 işlem adımı. Kendi ifadeni yazıp her ara adımı görebilirsin.",
    },
    {
      heading: "Koşul ve döngü: karar vermek, tekrarlamak",
      body:
        "<code>eğer K ise … değilse eğer … değilse … son</code> bloğu koşulları sırayla dener ve yalnız <em>ilk</em> doğru olanın bloğunu çalıştırır. <code>iken K … son</code>, koşul doğru kaldıkça bloğu yeniden çalıştırır; bir gün bitebilmesi için blok koşuldaki bir değişkeni değiştirmelidir. <code>her i için aralık(a, b)</code> ise i'ye sırayla a, a + 1, …, b − 1 değerlerini verir: <strong>b dahil değildir</strong>, bu yüzden <code>aralık(0, 4)</code> tam dört değer üretir. Python'un <code>range</code> fonksiyonu da aynı kuralla çalışır. Bir döngünün doğru olduğunu göstermenin yolu bir <strong>döngü değişmezi</strong> bulmaktır: her turun başında doğru kalan bir cümle. Ders 6'nın ikinci örneğinde bu cümle “toplam = 1 + 2 + … + (i − 1)” cümlesidir ve <code>doğrula(…)</code> onu her turda gerçekten sınar.",
      formula: "turun başında: toplam = 1 + 2 + … + (i − 1) = (i − 1)·i / 2",
      formulaNote: "i = 1'de toplam 0, cümle doğru. Bir tur i'yi ekler ve i bir artar, cümle yine doğru. aralık(1, 6) bitince i'nin son değeri 5 eklenmiştir: toplam 15.",
    },
    {
      heading: "Fonksiyon, yerel değişken ve liste",
      body:
        "<strong>Fonksiyon</strong> bir işe ad verir: <code>fonksiyon kare(x) … döndür x * x … son</code>. Çağrıldığında parametre değeri alır, gövde çalışır ve <code>döndür</code> ile bir değer geri verilir; <code>kare(7)</code> ifadesinin yerine 49 konur. Fonksiyonun içinde atanan değişkenler <strong>yereldir</strong>: yalnız o çağrı sürerken yaşar ve dışarıdaki aynı adlı değişkene dokunmaz. Sayfa her çağrıyı <strong>çağrı yığınına</strong> bir kat olarak ekler ve <code>döndür</code> ile kaldırır. <strong>Liste</strong> sıralı bir değerler dizisidir: <code>notlar = [70, 85, 90]</code>. Konumlar 0'dan başlar, n elemanlı bir listenin son konumu n − 1'dir; <code>notlar[3]</code> okunmaya çalışılırsa sayfa “geçerli konumlar 0 … 2” der.",
      formula: "yaz(kare(7)) → 49 · yaz(kareler_toplamı(3, 4)) → 25",
      formulaNote: "Ders 7'nin ilk örneği. kareler_toplamı, kare'yi iki kez çağırır; izlerken yığın “genel → kareler_toplamı(3, 4) → kare(3)” olur.",
    },
  ],
  lab: {
    intro:
      "Sayfanın dört sekmesi var. <strong>01 · Kavramlar</strong> dokuz dersten oluşur (Değer ve tür, Değişken ve atama, İfadeler, Girdi ve çıktı, Koşul, Döngüler, Fonksiyonlar, Listeler, Hata ayıklama); her dersin “Örnek 1: …” biçiminde adlandırılmış çalıştırılabilir örnekleri var. Her programın altında aynı düğmeler bulunur: <strong>Çalıştır</strong> (ya da Ctrl + Enter), <strong>Adım adım izle</strong> ve <strong>Örneği geri yükle</strong>. İzleme kipinde <strong>Başa</strong>, <strong>‹ Geri</strong>, <strong>İleri ›</strong>, <strong>Sona</strong> düğmeleri ve <strong>İz adımı</strong> kaydırıcısıyla gezersin; çalışacak satır renklenir, <strong>Değişkenler</strong> tablosu o satırdan <em>önceki</em> durumu gösterir. <strong>Girdi</strong> kutusundaki her satırı bir <code>oku()</code> alır. Çoğu örneğin altında “Çalıştırmadan önce tahmin et” kutusu vardır: son çıktı satırını yazıp <strong>Tahmini denetle</strong>'ye basarsın. <strong>02 · Alıştırmalar</strong> sekmesinde 14 alıştırma (Kolay, Orta, Zor) gizli testlerle denetlenir; <strong>03 · Sık yapılan hatalar</strong> sekmesinde sekiz hatalı program, <strong>04 · Bundan sonra</strong> sekmesinde Python ve JavaScript karşılıkları durur. Programlar sayfanın kendi küçük yorumlayıcısında çalışır; hiçbir şey saklanmaz, hiçbir yere gönderilmez.",
    experiments: [
      {
        title: "x = x + 1 neden çelişki değil?",
        predict:
          "Kavramlar sekmesinde <strong>2 · Değişken ve atama</strong> dersini aç; <strong>Örnek 1: x = x + 1</strong> yüklenir. Program <code>x = 5</code>, <code>x = x + 1</code>, <code>x = x * 2</code>, <code>yaz(x)</code> satırlarından oluşuyor. Çalıştırmadan önce son çıktı satırını tahmin kutusuna yaz: 11 mi, 12 mi, yoksa program bir hata mı verir?",
        do:
          "<strong>Tahmini denetle</strong>'ye bas, sonra <strong>Adım adım izle</strong>'ye geç ve <strong>İleri ›</strong> düğmesiyle sona kadar ilerle. Ardından <strong>Düzenlemeye dön</strong>, ikinci ve üçüncü satırın yerini değiştirip yeniden çalıştır.",
        observe:
          "Değişkenler tablosunda x önce 5, sonra 6, sonra 12 olur; her değişimde satır renklenir. İz 4 adımda biter ve çıktı 12'dir. Satırların sırası değişince (önce çarp, sonra ekle) çıktı 11 olur.",
        explain:
          "Atama önce sağ tarafı hesaplar, sonra sonucu soldaki ada koyar; x'in eski değeri o anda silinir. Program bir denklem sistemi değil, bir talimat dizisidir: aynı satırlar farklı sırada farklı sonuç verir. İkinci örnek (Takas) bunun bedelini gösterir: <code>a = b</code> yazıldığı an a'nın eski değeri kaybolduğu için ara bir <code>geçici</code> değişken gerekir.",
      },
      {
        title: "4 ile 5'i toplayınca 45 çıkması",
        predict:
          "<strong>4 · Girdi ve çıktı</strong> dersinde <strong>Örnek 2: oku() metin verir</strong>'i aç. Girdi kutusunda alt alta 4 ve 5 yazıyor. Program <code>tür(a)</code>, <code>a + b</code> ve <code>sayı(a) + sayı(b)</code> yazdırıyor. Üç satırın ne olacağını tahmin et.",
        do:
          "Önce <strong>Çalıştır</strong>, sonra <strong>Adım adım izle</strong> ile Değişkenler tablosunun <strong>Tür</strong> sütununa bak. Ardından girdiyi 2 ve 3 yap ve yeniden çalıştır. Aynı hatanın kısa hâlini <strong>03 · Sık yapılan hatalar</strong> sekmesindeki <strong>6 · \"2\" + \"3\" = \"23\"</strong> programında da bul.",
        observe:
          "Çıktı alt alta <code>metin</code>, <code>45</code>, <code>9</code> olur; tabloda a'nın değeri tırnaklı <code>\"4\"</code>, türü “metin” görünür. Girdi 2 ve 3 iken çıktı <code>metin</code>, <code>23</code>, <code>5</code> olur. Hatalar sekmesinde <strong>Düzeltilmiş hâli yükle</strong> deyince program 5 yazar.",
        explain:
          "<code>oku()</code>, kutuya ne yazılırsa yazılsın bir <strong>metin</strong> verir. İki metin arasındaki <code>+</code> toplama değil uç uca eklemedir. Hesap yapmadan önce <code>sayı(…)</code> ile çevirmek gerekir. Tür yalnız bir etiket değildir; aynı işaretin ne iş yapacağını belirler.",
      },
      {
        title: "aralık nerede biter: bir eksik hatası",
        predict:
          "<strong>6 · Döngüler</strong> dersinde <strong>Örnek 3: aralık nerede biter?</strong> programı <code>her k için aralık(0, 4)</code> ile k'yi yazdırıyor. Kaç sayı yazılacak, son sayı ne olacak? Sonra şunu düşün: 1'den n'e toplamı <code>aralık(1, n)</code> ile hesaplayan bir program n = 5 için ne yazar?",
        do:
          "Örneği çalıştır. Sonra <strong>03 · Sık yapılan hatalar</strong> sekmesinde <strong>1 · Bir eksik, bir fazla</strong> programını girdi 5 ile çalıştır, <strong>Neden yanlış?</strong> ve <strong>Düzeltilmiş hâli yükle</strong>'ye bas. Son olarak <strong>02 · Alıştırmalar</strong> sekmesinde <strong>1'den n'e toplam</strong> alıştırmasını seç, aynı hatalı döngüyü (<code>aralık(1, n)</code>) yaz ve <strong>Gizli testlerle denetle</strong>'ye bas.",
        observe:
          "Örnek 0, 1, 2, 3 yazar; 4 yoktur. Hatalı toplam programı 10 yazar, düzeltilmiş hâl (<code>aralık(1, n + 1)</code>) 15. Alıştırmada tohum 1 ile sonuç “1 / 8 test geçti” olur: geçen tek test n = 0'dır (beklenen 0); n = 1 için 1 yerine 0, n = 10 için 55 yerine 45, n = 100 için 5050 yerine 4950 çıkar. Doğru döngüyle 8 testin hepsi geçer.",
        explain:
          "<code>aralık(a, b)</code> b'yi dahil etmez; bu yüzden n'yi de saymak için bitiş n + 1 olmalı. Hatalı program her zaman tam olarak n kadar eksik verir. n = 0 testinin geçmesi önemli bir ders: bir programın bazı testleri geçmesi doğru olduğunu göstermez. Gizli testlerin sınır durumları (0, 1) ve rastgele girdiler içermesinin nedeni bu. Bir eksik hatası çok eskidir: aynı mantık “10 bölmeli düz bir çit için 11 direk gerekir” bilmecesinde de vardır.",
      },
      {
        title: "Bitmeyen döngüyü yakalamak",
        predict:
          "<strong>9 · Hata ayıklama</strong> dersinde <strong>Örnek 3: Bitmeyen döngü</strong> programı <code>n = 10</code> ile başlıyor ve <code>iken n != 0</code> döngüsünde n'den 3 çıkarıyor. n hangi değerleri alır? Döngü biter mi?",
        do:
          "<strong>Çalıştır</strong>'a bas ve durum satırını oku. Sonra <strong>Adım adım izle</strong> ile ilk birkaç turda n'nin değerlerine bak ve <strong>Sona</strong> git. Ardından <strong>Düzenlemeye dön</strong>, koşulu <code>iken n &gt; 0</code> yap ve yeniden çalıştır. Son olarak başlangıç değerini 12 yapıp eski koşulu (<code>n != 0</code>) dene.",
        observe:
          "Sayfa programı durdurur: “Durduruldu · 2. satır: Program 100 000 adımda bitmedi ve durduruldu.” İzde n 10, 7, 4, 1, −2 diye iner ve 0'ı atlar; iz yalnız ilk 2000 adımı kaydettiğini söyler. Koşul <code>n &gt; 0</code> olunca program 11 adımda biter ve −2 yazar. n = 12 ile başlayınca <code>n != 0</code> koşulu da yeter ve 0 yazılır.",
        explain:
          "<code>n != 0</code> koşulu yalnız n tam 0'a düşerse yanlış olur; 10'dan 3'er 3'er inen bir sayı 0'a hiç uğramaz. Gerçek bir dilde bu program sonsuza kadar döner; sayfanın yorumlayıcısı ise her satırı ve her döngü denetimini bir adım sayar ve 100 000 adımda durur. Hata satırı olarak döngünün başlığını gösterir, çünkü sorun oradaki koşuldadır. Güvenli koşul “eşit değil” değil “büyük”tür: atlanabilecek bir hedef yerine geçilemeyecek bir sınır koyar.",
      },
    ],
  },
  wow: [
    {
      title: "Ondalık sayılar da yuvarlanır",
      body:
        "Sayfada <code>yaz(0.1 + 0.2)</code> çalıştırırsan 0.30000000000000004 çıkar. Bu yorumlayıcının hatası değil: sayılar bilgisayarda ikili tabanda tutulur ve 0,1 ikili tabanda tam yazılamaz, tıpkı 1/3'ün onluk tabanda tam yazılamaması gibi. Python ve JavaScript de aynı sonucu verir. Bu yüzden ondalıklı sayıları <code>==</code> ile karşılaştırmak tehlikelidir.",
    },
    {
      title: "Hiç çalışmamış ilk program",
      body:
        "Ada Lovelace'ın 1843'te yayımlanan G notundaki Bernoulli sayıları yöntemi, sık sık yayımlanmış ilk bilgisayar programı diye anılır, ama hiç çalıştırılmadı: Babbage'ın Analitik Makinesi hiç tamamlanmadı. Bir programın doğruluğunu makinesi olmadan, yalnız adımları kafada izleyerek düşünmek, bu sayfanın “tahmin et, sonra izle” alışkanlığının ta kendisidir.",
    },
    {
      title: "Çit direkleri iki bin yıllık bir hata",
      body:
        "Bir eksik hatasının adı İngilizcede “çit direği hatası” diye de geçer: 10 bölmeli düz bir çit için 10 değil 11 direk gerekir. Bu hesap karışıklığının erken bir anlatımı, Romalı mimar Vitruvius'un <em>Mimarlık Üzerine</em> kitabında bulunur. Sayfanın Hatalar sekmesindeki ilk program da tam bu hatayı yapar.",
    },
  ],
  worked: {
    title: "Öklid'in yöntemini programa dökmek",
    prompt:
      "İki pozitif tam sayının en büyük ortak bölenini (EBOB) bulan bir fonksiyon yaz ve <code>ebob(252, 105)</code> çağrısını elle izle. Öklid'in yöntemi: büyük sayıyı küçüğe böl, kalanla devam et; kalan 0 olunca son bölen EBOB'dur. Program kaç adımda biter, ve <code>ebob(105, 252)</code> neden bir tur daha sürer?",
    steps: [
      "Programı sayfadaki herhangi bir program kutusuna yaz (girinti bu dilde zorunlu değildir):<br><code>fonksiyon ebob(a, b)<br>iken b != 0<br>kalan = a % b<br>a = b<br>b = kalan<br>son<br>döndür a<br>son<br>yaz(ebob(252, 105))</code>",
      "Döngünün her turu üç atama yapar. Elle tablo kur: başta a = 252, b = 105. 1. tur: kalan = 252 % 105 = 42, sonra a = 105, b = 42. 2. tur: kalan = 105 % 42 = 21, a = 42, b = 21. 3. tur: kalan = 42 % 21 = 0, a = 21, b = 0. Şimdi <code>b != 0</code> yanlış, döngü biter ve <code>döndür a</code> 21 verir.",
      "Neden doğru? Döngü değişmezi: “ebob(a, b) her turun başında aynıdır.” Çünkü a % b = a − b·(a // b): a ile b'yi bölen her sayı a % b'yi de böler, tersine b ile a % b'yi bölen her sayı a = b·(a // b) + a % b'yi de böler. Yani (a, b) ile (b, a % b) çiftinin ortak bölenleri tamamen aynıdır. b her turda kesin küçülür ve negatif olamaz, bu yüzden döngü biter; b = 0 iken ebob(a, 0) = a.",
      "Adımları say. Sayfa her çalışan satırı ve her döngü denetimini bir adım sayar, fonksiyon tanımını saymaz: yaz satırı 1, üç turun her biri 1 denetim + 3 atama = 12, döngüden çıkaran son denetim 1 ve döndür 1. Toplam 1 + 12 + 1 + 1 = 15. <strong>Çalıştır</strong>'a basınca sayfa “Program 15 adımda bitti.” der; <strong>Adım adım izle</strong> ile tablonun yukarıdaki üç turu aynen gösterdiğini, değişkenlerin “yerel · ebob” diye işaretlendiğini görürsün.",
      "Sıra ters verilirse, <code>ebob(105, 252)</code> için ilk tur 105 % 252 = 105 hesaplar ve yalnız iki sayının yerini değiştirir: a = 252, b = 105. Sonra aynı üç tur gelir. Fazladan bir tur 4 adım daha demektir: program 19 adımda biter ve yine 21 yazar.",
    ],
    result:
      "ebob(252, 105) = 21 (252 = 21 · 12, 105 = 21 · 5); program 15 adımda biter, ters sırayla çağrılınca bir tur fazla dönerek 19 adımda.",
  },
  misconceptions: [
    {
      myth: "<code>=</code> işareti programda da eşitlik demektir; <code>x = x + 1</code> saçmadır.",
      truth:
        "Programda <code>=</code> bir atamadır: sağ taraf hesaplanır, sonuç soldaki ada konur. Eşitliği sormak için <code>==</code> kullanılır. Sayfadaki dil, koşulda tek <code>=</code> görünce bunu yazım hatası olarak yakalar; bazı dillerde aynı hata sessizce yanlış çalışabilir.",
    },
    {
      myth: "Program birkaç örnekte doğru sonuç verdiyse doğrudur.",
      truth:
        "1'den n'e toplamı <code>aralık(1, n)</code> ile yazan hatalı program n = 0 testini geçer ama tohum 1 ile öteki yedi testte kalır. Örnekler hatayı gösterebilir, doğruluğu kanıtlayamaz. Sınır durumlarını (0, 1, boş liste) denemek ve döngü değişmezi gibi bir gerekçe bulmak gerekir.",
    },
    {
      myth: "Bir fonksiyonun sonucu <code>yaz</code> ile ekrana basmaktır.",
      truth:
        "<code>yaz</code> değeri ekrana basar ama çağırana geri vermez. Hatalar sekmesindeki son programda <code>kare(4)</code> 16'yı ekrana yazar, kendisi ise <code>yok</code> değerini verir ve <code>kare(4) + 1</code> hesaplanamaz. Sonucu başka bir hesapta kullanılacak fonksiyon <code>döndür</code> ile bitmelidir; düzeltilmiş hâl 17 yazar.",
    },
    {
      myth: "Listenin ilk elemanı 1. konumdadır.",
      truth:
        "Bu dilde, Python'da ve JavaScript'te konumlar 0'dan başlar: <code>[70, 85, 90]</code> listesinin konumları 0, 1, 2'dir. Bu yüzden konumla dolaşan döngünün koşulu <code>i &lt; uzunluk(notlar)</code> olmalıdır; <code>&lt;=</code> yazınca sayfa üç notu yazdıktan sonra “Konum 3 listenin dışında” der.",
    },
  ],
  glossary: [
    { term: "Değişken", definition: "Bir değere verilen ad; atama ile değeri değiştirilebilir." },
    { term: "Atama", definition: "Sağdaki ifadeyi hesaplayıp sonucu soldaki ada koyan <code>=</code> işlemi." },
    { term: "Tür", definition: "Bir değerin cinsi (sayı, metin, mantıksal, liste); o değerle hangi işlemlerin yapılabileceğini belirler." },
    { term: "İfade", definition: "Tek bir değere indirgenebilen yazım; örneğin <code>2 + 3 * 4</code> ya da <code>x &gt; 0 ve x &lt; 10</code>." },
    { term: "Döngü değişmezi", definition: "Bir döngünün her turunun başında doğru kalan ve döngü bitince istenen sonucu veren cümle." },
    { term: "Yerel değişken", definition: "Bir fonksiyonun içinde atanan, yalnız o çağrı sürerken var olan değişken." },
    { term: "Çağrı yığını", definition: "O anda süren fonksiyon çağrılarının, en son çağrılan en üstte olacak biçimde tutulan listesi." },
    { term: "Yorumlayıcı", definition: "Bir programı önceden makine koduna çevirmeden, okuyup adım adım yürüten program; bu sayfa kendi küçük yorumlayıcısını kullanır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Mühendislik ve fen fakültelerinin ilk yılında “Bilgisayar Programlama” ya da “Programlamaya Giriş” adlı bir ders vardır ve konusu tam olarak bu sayfadır: değişken, koşul, döngü, fonksiyon, liste, sonra bunlarla küçük problemler çözmek. Fark dildedir. Derste Python, C ya da Java gibi gerçek bir dil kullanılır; bu sayfanın dördüncü sekmesindeki eşleme tablosu ve her programın altındaki “Python ve JavaScript karşılığı” kutusu bu geçiş için yazıldı. Bir dilde düşünmeyi öğrenen biri ikinci dili çok daha hızlı öğrenir, çünkü değişen çoğunlukla yazım biçimidir.",
      "Bu araçlar daha sonra her derste geri gelir: sayısal yöntemlerde bir denklemi döngüyle yaklaşık çözmek, veri analizinde bir ölçüm listesini işlemek, benzetim derslerinde bir sistemi adım adım ilerletmek. Bilgisayar bilimi tarafında sıradaki adımlar, aynı işi yapan yöntemlerin attığı adımları saymak (algoritmalar), veriyi doğru biçimde tutmak (veri yapıları) ve bu sayfadaki yorumlayıcının yaptığı işin kendisidir (derleyiciler ve yorumlayıcılar). Döngü değişmezi ise ayrık matematik derslerindeki tümevarımla ispatın programdaki karşılığıdır.",
    ],
    topics: ["Bilgisayar Programlama", "Algoritmalar", "Veri Yapıları", "Sayısal Yöntemler", "Derleyiciler", "Ayrık Matematik"],
  },
  quiz: [
    {
      question:
        "Sayfada şu program çalıştırılıyor: <code>x = 3</code>, <code>y = x</code>, <code>x = x + 4</code>, <code>yaz(x, y)</code>. Çıktı ne olur?",
      options: ["7 7", "7 3", "3 7", "Hata: x iki değer alamaz"],
      answer: 1,
      explanation:
        "<code>y = x</code> satırı y'ye x'in o anki değerini, yani 3'ü koyar; y ile x arasında kalıcı bir bağ kurmaz. Sonra x 7 olur, y 3 kalır. Çıktı “7 3”. Adım adım izlersen yalnız x'in satırının renklendiğini görürsün.",
    },
    {
      question:
        "1'den n'e toplamın örnek çözümü (<code>her i için aralık(1, n + 1)</code> döngüsüyle) n = 5 için 13 adımda, n = 10 için 23 adımda bitiyor. n = 1000 için kaç adım bekler misin?",
      options: ["1003", "2003", "13 000", "1 000 003"],
      answer: 1,
      explanation:
        "n 5 arttığında adım sayısı 10 arttı: her tur 2 adım (döngü denetimi ve toplama satırı). Döngü dışındaki satırlarla birlikte adım sayısı 2n + 3'tür: n = 1000 için 2003. Sayfa da “Program 2003 adımda bitti.” der. Adım sayısının n ile doğru orantılı büyümesi, algoritmaların dilinde “doğrusal” iş demektir.",
    },
    {
      question:
        "<code>iken n != 0</code> döngüsü her turda <code>n = n - 3</code> yapıyor. Aşağıdaki başlangıç değerlerinden hangisiyle program 100 000 adım sınırına takılmadan biter?",
      options: ["n = 10", "n = 11", "n = 12", "n = 13"],
      answer: 2,
      explanation:
        "Döngü yalnız n tam 0'a düştüğünde biter. 3'er 3'er inen bir sayı ancak 3'ün katıysa 0'a uğrar: 12, 9, 6, 3, 0. 10, 11 ve 13 ise 0'ın yanından geçip eksiye iner ve döngü hiç bitmez. Güvenli koşul <code>n &gt; 0</code> olurdu.",
    },
  ],
  next: [
    {
      href: "algoritmalar.html",
      title: "Algoritmalar: Adımları Say",
      why: "Bu sayfada adım saymayı öğrendin; orada aynı işi yapan sıralama ve arama yöntemlerinin karşılaştırma sayıları, kuramın verdiği değerle yan yana sayılıyor.",
    },
    {
      href: "veri-yapilari.html",
      title: "Veri Yapıları Laboratuvarı",
      why: "Buradaki liste tek bir raftı; orada dizi, bağlı liste, yığın, kuyruk, hash tablosu ve arama ağaçlarının her işlemde kaç eleman kopyaladığı ya da kaç karşılaştırma yaptığı ölçülüyor.",
    },
    {
      href: "derleyici-ve-yorumlayicilar.html",
      title: "Derleyici ve Yorumlayıcılar",
      why: "Bu sayfanın programlarını çalıştıran şeyin içi: küçük bir dilde yazılan programın sözcüklere, ağaca ve ara koda dönüşüp yürütüldüğünü adım adım gösterir.",
    },
    {
      href: "mantik-kapilari.html",
      title: "Mantık Kapıları Laboratuvarı",
      why: "<code>ve</code>, <code>veya</code>, <code>değil</code> işlemlerinin donanımdaki karşılığı: doğruluk tabloları, De Morgan eşdeğerlikleri ve dört bitlik bir toplayıcı.",
    },
  ],
  sources: [
    {
      title: "Ada Lovelace",
      url: "https://en.wikipedia.org/wiki/Ada_Lovelace",
      note: "1843 çevirisi, A–G notları, G notundaki Bernoulli sayıları yöntemi ve “ilk program” unvanı üzerine tarihçilerin görüşleri.",
    },
    {
      title: "Grace Hopper",
      url: "https://en.wikipedia.org/wiki/Grace_Hopper",
      note: "1944'te Mark I kadrosu, 1952'deki A-0 ve bağlayıcı benzeri yapısı, İngilizceye yakın programlama fikri, FLOW-MATIC ve COBOL; 1947 güve kaydı ve “bug” teriminin daha eski olduğu.",
    },
    {
      title: "History of programming languages",
      url: "https://en.wikipedia.org/wiki/History_of_programming_languages",
      note: "FORTRAN (Backus'un IBM'deki ekibi, ilk derleyici 1957), BASIC (1964) ve eğitim dili Logo (1967) dahil dillerin zaman çizelgesi.",
    },
    {
      title: "Off-by-one error",
      url: "https://en.wikipedia.org/wiki/Off-by-one_error",
      note: "Bir eksik ve çit direği hataları; erken bir anlatımın Vitruvius'un <em>De Architectura</em>'sında (III. kitap) bulunduğu.",
    },
  ],
  revision: "Kasım 2026",
};
