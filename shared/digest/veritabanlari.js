window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["veritabanlari"] = {
  slug: "veritabanlari",
  title: "Veritabanları: Soruyu Sor, Yolu Bilme",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "1970'te bir IBM araştırmacısı, verinin diskte nerede durduğunu bilmeden soru sorulabileceğini öne sürdü. Burada o fikri çalıştırırsın: sorgu yaz, motorun okuduğu satırları say, indeksi aç ve farkı gör.",
  hook:
    "Otuz satırlık bir tabloda tek bir kaydı arayan sorgu, indeks yokken otuz satırın otuzunu da okur; indeks varken tek satır okur ve bir ağaçta üç düğüme uğrar. Tablo bir milyar satıra çıksa ilk sayı bir milyar olur; düğümleri yüzlerce anahtar taşıyan gerçek bir indekste uğranan düğüm sayısı dört beşi geçmez. Bu uçurum nereden geliyor ve sen yalnızca ne istediğini yazarken, nasıl bulunacağına kim karar veriyor?",
  bigIdea:
    "İlişkisel veritabanı, veriyi <strong>tablolara</strong> ve tablolar arasındaki <strong>anahtar</strong> bağlarına ayırır; sen yalnızca <em>ne</em> istediğini söylersin (SQL), <em>nasıl</em> bulunacağına sistem karar verir ve çoğu zaman bunu bir B+ağacında logaritmik sayıda adımla yapar.",
  story: [
    "1960'larda bilgisayarlar veri saklıyordu ama veriyi bulmak programcının işiydi. Charles Bachman'ın 1960'ların başında General Electric'te kurduğu IDS'te ve IBM'in 1966–1968'de Apollo programı için geliştirdiği IMS'te kayıtlar birbirine işaretçilerle bağlanırdı; bir soru sormak, bu işaretçileri adım adım izleyen bir program yazmak demekti. Verinin düzeni değişirse program da bozulurdu. Haziran 1970'te IBM'in San Jose laboratuvarında çalışan, Oxford'da matematik okumuş İngiliz bilgisayar bilimci <strong>Edgar F. Codd</strong>, <em>Communications of the ACM</em>'de on bir sayfalık bir makale yayımladı: veri, matematikteki anlamıyla <strong>ilişkilerde</strong>, yani satır ve sütunlardan oluşan tablolarda tutulsun; tablolar arasındaki bağ işaretçiyle değil ortak değerlerle kurulsun; kullanıcı yolu değil sonucu tarif etsin. IBM'in o sırada iyi satan bir ürünü, IMS'i vardı ve şirket yeni fikre hemen sarılmadı; bir prototipe ancak birkaç yıl sonra girişildi.",
    "O prototip <strong>System R</strong> (1974–1979) oldu. İçinde Donald Chamberlin ile Raymond Boyce'un 1974'te tasarladığı sorgu dili SEQUEL vardı; ad, İngiliz havacılık grubu Hawker Siddeley'in bir şirketinin tescilli markası çıkınca kısaltılıp <strong>SQL</strong> yapıldı. Boyce, dilin ilk makalesinin sunulduğu 1974 yılında, 27 yaşında bir anevrizmadan öldü; adı bugün Boyce–Codd Normal Formu'nda yaşıyor. Aynı yıllarda Berkeley'de Michael Stonebraker ve Eugene Wong, Codd'un makalelerinden yola çıkarak <em>Ingres</em>'i yazdı; onun ardılı olan Postgres projesi 1986'da başladı ve 1996'da PostgreSQL adını aldı. 1979'da Larry Ellison'ın küçük şirketi, IBM'den önce davranıp ilk ticari SQL veritabanlarından birini satışa çıkardı: Oracle. 1986'da SQL, ANSI standardı oldu. Bachman 1973'te, Codd 1981'de, Stonebraker 2014'te Turing Ödülü aldı.",
    "Tablolar yetmezdi; hızlı bulma ve güvenli yazma da gerekiyordu. Boeing'in araştırma laboratuvarında Rudolf Bayer ve Edward McCreight, disk bloklarına uygun ve her zaman dengeli kalan bir arama ağacı tasarladı; 1970 tarihli raporları 1972'de dergide yayımlandı: <strong>B-ağacı</strong>. Addaki B'nin ne anlama geldiğini hiç açıklamadılar. Bu ağacın, veriyi yalnızca yapraklarda tutan ve yaprakları birbirine zincirleyen türü olan B+ağacı, bugün ilişkisel veritabanlarının çoğunda varsayılan indekstir. Jim Gray ise bir havalenin 'ya tamamen olur ya hiç olmaz' garantisini, yani <strong>işlem</strong> (transaction) kavramını System R yıllarındaki çalışmalarıyla ve 1981 tarihli makalesiyle biçimlendirdi; 1983'te Theo Härder ve Andreas Reuter bu garantilere ACID adını verdi. Gray 1998'de Turing Ödülü aldı.",
    "2000'lerde web, tek makineye sığmayan veriyi getirdi. Google'ın Bigtable (2006) ve Amazon'un Dynamo (2007) makaleleri, veriyi yüzlerce sunucuya dağıtan, karşılığında tabloların bazı garantilerinden vazgeçen sistemleri anlattı. Haziran 2009'da San Francisco'daki bir buluşma bu sistemlere bugünkü ortak adını verdi: <strong>NoSQL</strong>. Eric Brewer'ın 2000'de bir varsayım olarak ortaya attığı, 2002'de Seth Gilbert ile Nancy Lynch'in ispatladığı CAP teoremi, bu vazgeçişin bir bölümünün neden kaçınılmaz olduğunu söyler. Bugün iki dünya birbirine yaklaşıyor: PostgreSQL JSON belgeleri saklıyor, dağıtık sistemler yeniden SQL konuşuyor. D. Richard Hipp'in 2000'de, ABD donanmasının güdümlü füze destroyerlerindeki bir hasar kontrol yazılımı için tasarladığı tek dosyalık <strong>SQLite</strong> ise kamu malı olarak telefonlara ve tarayıcılara girdi.",
  ],
  core: [
    {
      heading: "İlişki ve ilişkisel cebir: sorgu bir ifadedir",
      body:
        "Codd'un modelinde tablo bir <strong>ilişkidir</strong>: sütunların değer kümelerinden seçilmiş n'lilerin kümesi. Küme olduğu için satırların sırası yoktur; iki tablo arasındaki bağ da diskteki bir adres değil, ortak bir değerdir: <code>odunc.ogrenci_id</code>, <code>ogrenciler.id</code> ile eşleşir. Bu kümelerin üzerinde bir cebir kurulur. <strong>σ</strong> (seçme) koşulu sağlayan satırları, <strong>π</strong> (izdüşüm) istenen sütunları tutar; <strong>⋈</strong> (birleştirme) iki ilişkinin satırlarını bir koşulla eşler ve tanımı gereği kartezyen çarpımın süzülmüş hâlidir: A ⋈<sub>θ</sub> B = σ<sub>θ</sub>(A × B). Her SELECT böyle bir ifadeye çevrilir; sayfa onu «Mantıksal plan» ağacında, aşağıdan yukarı okunacak biçimde yazar. Aynı sonucu veren pek çok ifade vardır: σ yalnızca A'nın sütunlarına bakıyorsa σ(A ⋈ B) = σ(A) ⋈ B olur ve ikincisi çok daha az satıra dokunur. Gerçek sistemlerde bu seçimi <strong>sorgu iyileştirici</strong> yapar; sayfanın motoru, sayaçları elle hesaplayabilesin diye bunu bilerek yapmaz; tek ayrıcalığı, indeks açıkken FROM tablosundaki indeksli bir eşitliği birleştirmelerden önce uygulamasıdır. SQL saf modelden iki yerde ayrılır: aynı satırın yinelenmesine izin verir ve 'değer yok' anlamında NULL kullanır.",
      formula: "π<sub>ad, baslik, verilis</sub>(σ<sub>iade IS NULL</sub>((odunc ⋈ ogrenciler) ⋈ kitaplar))",
      formulaNote: "Varsayılan «İki JOIN» sorgusunun cebir ifadesi; sıralama (τ) ve takma adlar (ρ) atlandı. Ağaç aşağıdan yukarı okunur: önce iki birleştirme, sonra seçme, en son izdüşüm. Bir ilişki biçimsel olarak R ⊆ D<sub>1</sub> × … × D<sub>n</sub>'dir; ogrenciler tablosunda n = 4.",
    },
    {
      heading: "Birleştirmenin bedeli: çarpım mı, ağaç inişi mi?",
      body:
        "En yalın birleştirme algoritması <strong>iç içe döngüdür</strong>: soldaki her satır için sağ tablonun bütün satırlarını oku ve ON koşulunu sına. Sol girdi |A|, sağ tablo |B| satırsa bu |A|·|B| okuma ve bir o kadar karşılaştırmadır; kaç satırın eşleştiği bedeli değiştirmez. Varsayılan sorguda odunc 30, ogrenciler 12, kitaplar 10 satırdır: FROM taraması 30, ilk birleştirme 30·12 = 360, ikincisi 30·10 = 300 okuma eder. Toplam 690 satır okuması ve 660 karşılaştırma; sayfa bu öngörüyü sayaçların yanına yazar ve fark 0 çıkar. Sağ tablonun birleştirme sütununda indeks varsa iç döngünün yerini bir ağaç araması alır: sol satır başına h düğüm ziyareti, ardından yalnızca eşleşen satırların okunması. Aynı sorgu indeksle 30 + 30 + 30 = 90 satır okur ve 60 arama × h 2 = 120 düğüme uğrar. Tablolar bu kadar küçükken kazanç gösterişsizdir; ama iki tablo birlikte büyüdükçe |A|·|B| karesel, |A|·h neredeyse doğrusal artar. Gerçek sistemler karma (hash) ve sıralı-birleştirme algoritmalarını da kullanır ve disk sayfası sayar; sayfanın sayaçları satır ve düğüm erişimidir.",
      formula: "C<sub>döngü</sub> = |A|·|B|,   C<sub>indeks</sub> = |A|·h + (eşleşen satırlar)",
      formulaNote: "|A| sol girdinin, |B| sağ tablonun satır sayısı; h sağ tablodaki indeks ağacının düzey sayısı. Sayfada ogrenciler birleştirmesi: 30·12 = 360 erişim yerine 30·2 = 60 düğüm ziyareti + 30 satır.",
    },
    {
      heading: "B+ağacı: yükseklik neden logaritmik kalır?",
      body:
        "<strong>İndeks</strong>, bir sütunun sıralı ve ağaç biçiminde tutulan kopyasıdır. B+ağacında kayıtların bütün anahtarları yapraklardadır; üst düzeyler yalnızca 'hangi çocuğa in' diyen ayırıcıları taşır. Yapraklar soldan sağa zincirlidir; aralık sorgusu bir kez iner, sonra yan yana yürür. Bir düğüm en çok m anahtar alır; kök dışındaki yapraklar en az ⌈m/2⌉, iç düğümler en az ⌊m/2⌋ anahtar taşımak zorundadır. Taşan yaprak ikiye bölünür ve sağ yarının ilk anahtarı üst düğüme <em>kopyalanır</em>; taşan iç düğümde ortadaki anahtar yukarı <em>taşınır</em>. Bölünme köke ulaşırsa yeni bir kök kurulur: ağaç yalnızca tepeden uzar, bu yüzden bütün yapraklar aynı derinlikte kalır. Sınır buradan çıkar. h düzeyli bir ağaç en çok m·(m+1)<sup>h−1</sup> anahtar taşır; en seyrek hâlinde bile kökün iki çocuğu, altındaki her iç düğümün ⌊m/2⌋+1 çocuğu vardır, yani en az 2·⌈m/2⌉·(⌊m/2⌋+1)<sup>h−2</sup> anahtar. İki eşitsizliğin logaritmasını alınca h, alttan da üstten de log n ile sınırlanır. Her arama tam h düğüm okur. Diskte bir düğüm bir sayfadır ve yüzlerce anahtar taşır; ağaç bu yüzden çok sığdır.",
      formula: "1 + log<sub>m+1</sub>(n/m) ≤ h ≤ 2 + log<sub>⌊m/2⌋+1</sub>(n / (2·⌈m/2⌉))",
      formulaNote: "n anahtar sayısı, m düğüm kapasitesi, h düzey sayısı (h ≥ 2). m = 4, n = 1.000 için 4,43 ≤ h ≤ 7,03, yani 5 … 7: sayfadaki tablonun «h sınırları» sütunu. m = 200, n = 10⁹ için h = 4 ya da 5.",
    },
    {
      heading: "Fonksiyonel bağımlılık, kapanış ve normal formlar",
      body:
        "<strong>Fonksiyonel bağımlılık</strong> X → Y, 'X'i aynı olan iki satırın Y'si de aynıdır' demektir; veriden okunmaz, işin kuralından gelir. Verilen bağımlılıklardan yenileri üç kuralla türetilir (<strong>Armstrong aksiyomları</strong>): Y ⊆ X ise X → Y; X → Y ise XZ → YZ; X → Y ve Y → Z ise X → Z. Uygulamada kuralları tek tek işletmek yerine <strong>kapanış</strong> X⁺ hesaplanır: X ile başla, sol yanı kümenin içinde kalan her bağımlılığın sağ yanını ekle, küme büyümeyince dur. X⁺ bütün nitelikleri veriyorsa X <strong>üst anahtardır</strong>; hiçbir öz alt kümesi üst anahtar değilse <strong>aday anahtar</strong>. Normal formlar bunun üstüne kurulur. <strong>1NF</strong> her hücrede tek değer ister. <strong>2NF</strong>, anahtar dışı hiçbir niteliğin bir aday anahtarın yalnızca bir parçasına bağlı olmamasını; <strong>3NF</strong>, anahtar dışı bir niteliğin anahtara başka bir anahtar dışı nitelik üzerinden, dolaylı bağlanmamasını ister. <strong>BCNF</strong> en kısa hâliyle söyler: her bağımlılığın sol yanı bir üst anahtardır. Bill Kent'in 3NF için özetiyle anahtar dışı her nitelik anahtara, bütün anahtara ve yalnızca anahtara bağlı olmalıdır.",
      formula: "Her X → A (A ∉ X) için — BCNF: X üst anahtar · 3NF: X üst anahtar ya da A asal",
      formulaNote: "Asal nitelik: bir aday anahtarda geçen nitelik. Sayfa anahtarları ve üç sınamayı bütün alt kümeleri deneyerek bulur (2ⁿ küme; bu yüzden en çok 10 nitelik) ve formu bozan bağımlılığı adıyla gösterir.",
    },
    {
      heading: "İşlem, ACID ve çakışma-serileştirilebilirlik",
      body:
        "Bir havale iki yazmadır; ilkinden sonra elektrik kesilirse para buharlaşır. <strong>İşlem</strong> (transaction) birden çok okuma ve yazmayı bölünmez bir adıma sarar: COMMIT ile kalıcı olur, ROLLBACK ile hiç olmamış sayılır. ACID dört ayrı sözdür: <strong>A</strong> bölünmezlik, <strong>C</strong> tanımlı kısıtların işlem sonunda bozulmamış olması, <strong>I</strong> eşzamanlı işlemlerin birbirinin işini bozmaması, <strong>D</strong> onaylanan işin çökmeden sonra da yerinde durması. I'nın ölçütü şudur: adımları iç içe geçmiş bir <strong>çizelge</strong>, işlemlerin art arda çalıştığı bir <em>seri</em> sırayla eşdeğerse kabul edilir. Sınaması kolay olan türü <strong>çakışma-serileştirilebilirliktir</strong>. İki adım, farklı işlemlere aitse, aynı öğeye erişiyorsa ve en az biri yazıyorsa <em>çakışır</em>; çakışan bir çiftin sırası çevrilirse sonuç değişebilir. Her çakışma için önce davranan işlemden ötekine bir ok çiz: bu <strong>öncelik grafiğidir</strong>. Döngü yoksa oklara uyan seri sıra çizelgeyle eşdeğerdir; döngü varsa T1 hem T2'den önce hem sonra gelmek zorunda kalır, böyle bir sıra olamaz. Sayfa aynı soruyu bütün seri sıraları tek tek deneyerek de yanıtlar ve iki sonucu karşılaştırır.",
      formula: "Çizelge çakışma-serileştirilebilir ⇔ öncelik grafiğinde döngü yok",
      formulaNote: "Kayıp güncelleme çizelgesinde R2(A), W1(A)'dan önce geldiği için T2 → T1; R1(A) ve W1(A), W2(A)'dan önce geldiği için T1 → T2. Döngü: T1 → T2 → T1. Ölçüt güvenlidir ama dardır: sayfanın ele almadığı görünüm-serileştirilebilirlik daha fazla çizelgeyi kabul eder.",
    },
  ],
  lab: {
    intro:
      "Sayfada üç sekme var. <strong>01 · SQL çalışma alanı</strong>: dört tabloluk uydurma bir kütüphane verisi (bolumler 5, ogrenciler 12, kitaplar 10, odunc 30 satır) üzerinde gerçek bir SQL alt kümesi çalışır. «Hazır sorgu» menüsü on üç sorgu yükler, kendi sorgunu da yazıp «Çalıştır»a (ya da Ctrl+Enter) basabilirsin; «İndeks kullan» kutusu anahtar sütunlarındaki B+ağaçlarını devreye sokar. Dört kart sonuç satırını, okunan tablo satırını, birleştirme karşılaştırmasını ve indeks düğüm ziyaretini ölçer ve öngörüyle yan yana yazar; yanında mantıksal plan ile adım adım fiziksel yürütme durur. Motor iyileştirme yapmaz: FROM tablosu, yazıldığı sırayla JOIN'ler, en son WHERE. Tek ayrıcalık indeks açıkken görülür: FROM tablosunun indeksli bir sütunundaki eşitlik («Yabancı anahtarla arama» sorgusunda <code>o.ogrenci_id = 7</code>) birleştirmeden önce, indeksle uygulanır; kart «birleştirmelerden 30» yerine «birleştirmelerden 7» yazar, mantıksal plandaki σ ve sonuç değişmez. <strong>02 · B+ağacı indeksi</strong>: «Düğüm kapasitesi m», «Anahtar» kutusu, «Ekle», «Sil», «Ara», «Aralığı tara» ve «Toplu ekleme» düğmeleriyle gerçek bir ağacı işletirsin; bir denetçi dört değişmezi her adımda sınar. <strong>03 · Normalizasyon ve işlemler</strong>: A bölümü yazdığın bağımlılıklardan kapanışı, aday anahtarları, normal formu ve ayrışımları hesaplar; B bölümünde iki-üç işlemin çizelgesini ok düğmeleriyle karıştırıp öncelik grafiğini izlersin. Sayılar Türkçe biçimde yazılır: %75,0 ve 1.000.",
    experiments: [
      {
        title: "Otuz satırda bir kayıt: tarama mı, ağaç mı?",
        predict:
          "odunc tablosunda 30 satır var. <code>id = 17</code> olan kaydı bulmak için motor kaç satır okur? Aynı sütunda bir B+ağacı olsa kaç satır, kaç düğüm? Peki 30 ödüncü 12 öğrenci ve 10 kitapla birleştiren sorgu toplam kaç satır okur?",
        do:
          "01 sekmesinde «Hazır sorgu» menüsünden «Tek kayıt: indeksi dene»yi seç ve kartları oku; sonra «İndeks kullan» kutusunu işaretle. Kutuyu kapat, «İki JOIN: şu an ödünçte olan kitaplar» sorgusunu seç, kartları ve «Fiziksel yürütme» tablosunu oku; kutuyu yeniden işaretle.",
        observe:
          "Tek kayıt, indekssiz: okunan tablo satırı 30 («öngörü 30 · fark 0»), düğüm ziyareti 0. İndeksle: 1 satır («indekssiz 30 olurdu · 29 satır daha az») ve 3 düğüm («öngörü arama × h = 3 · fark 0»). İki JOIN, indekssiz: 690 satır okuması, 660 karşılaştırma; adımlar 30, 30 · 12 = 360 ve 30 · 10 = 300. İndeksle: 90 satır okuması ve 120 düğüm ziyareti. Sonuç iki durumda da aynı 6 satırdır.",
        explain:
          "Tam tarama tablonun boyuyla, ağaç araması ağacın yüksekliğiyle ölçülür: 30 anahtarlı, m = 4 kapasiteli ağaç 3 düzeylidir. Birleştirmede iç içe döngü her sol satır için sağ tabloyu baştan okur; indeksli yol her sol satır için bir kez iner: 60 arama × h 2 = 120 düğüm, 30 + 30 + 30 = 90 satır. Bu ölçekte 690 erişim 210'a iner; asıl fark tablolar büyüyünce açılır, çünkü çarpım karesel, yükseklik logaritmik büyür. Değişen yalnızca yoldur, sonuç değil.",
      },
      {
        title: "NULL nereye kayboldu?",
        predict:
          "12 öğrenciden dördünün bölüm kodu 'BIL'. <code>bolum_kod &lt;&gt; 'BIL'</code> koşulu kaç satır döndürür: 8 mi? Bölümü boş olan öğrenciyi <code>bolum_kod = NULL</code> yazarak bulabilir misin?",
        do:
          "01 sekmesinde sırayla üç hazır sorguyu seç: «&lt;&gt; ve kaybolan satır», «NULL tuzağı: = NULL», «IS NULL». Her birinde «Sonuç satırı» kartını ve durum satırını oku; sayfanın altındaki «Üç değerli mantık» tablosuna bak. Son olarak «LEFT JOIN: hiç ödünç almayanlar» sorgusunu çalıştır.",
        observe:
          "<code>&lt;&gt; 'BIL'</code> 7 satır döndürür: Barış, Çınar, Deniz, Işıl, İpek, Ömer, Şule (Türk alfabesi sırasıyla); Umut listede yok. <code>= NULL</code> 0 satır döndürür ve durum satırı NULL ile yapılan her karşılaştırmanın BİLİNMEYEN verdiğini yazar. <code>IS NULL</code> tek satır getirir: Umut. 4 + 7 = 11; on ikinci öğrenci iki koşulun da dışında kalmıştır. LEFT JOIN sorgusu 2 satır verir: Barış ve Şule.",
        explain:
          "SQL'in mantığı üç değerlidir: doğru, yanlış, bilinmeyen. Umut'un bölüm kodu NULL olduğundan <code>bolum_kod = 'BIL'</code> de <code>bolum_kod &lt;&gt; 'BIL'</code> de onun için bilinmeyendir; WHERE yalnızca doğru çıkan satırları tutar. NOT bilinmeyen yine bilinmeyendir, bu yüzden bir koşul ile değili tabloyu ikiye bölmez. LEFT JOIN'de aynı NULL işe yarar: eşleşmeyen öğrencinin odunc sütunları NULL ile dolar, <code>o.id IS NULL</code> tam onları seçer. Listenin sırası da motora bağlıdır: sayfa adları Türk alfabesiyle dizer; aynı sorgu SQLite'ta varsayılan bayt sırasıyla Barış, Deniz, Işıl, Çınar, Ömer, İpek, Şule diye gelir.",
      },
      {
        title: "Ağaç ne zaman uzar, sıralı ekleme yaprakları nasıl bırakır?",
        predict:
          "Başlangıç ağacında (m = 4) 12 anahtar, 4 yaprak ve 2 düzey var. Hangi ekleme kökü böler? 1…30 anahtarlarını bir kez artan, bir kez azalan sırayla eklersen yaprak sayısı aynı mı çıkar?",
        do:
          "02 sekmesinde «Ağacı sıfırla»ya bas. «Anahtar» kutusunda 45 varken «Ekle»; sonra 33 yazıp «Ekle», sonra 12 yazıp «Ekle». Her seferinde adım listesini ve «Son işlemde bölünme · ödünç · birleşme» kartını oku. Ardından «Toplu ekleme»de N = 30 ile «Artan sırayla», sonra «Azalan sırayla»ya bas; alttaki 1.000 anahtarlık tabloya bak.",
        observe:
          "45: «0 bölünme». 33: «1 bölünme»; yaprak [30 | 33 | 35] ve [40 | 45] olur, 40 köke kopyalanır, kök [30 | 40 | 50 | 80] ile dolar. 12: «2 bölünme», «kök bölündü: yükseklik arttı»; yeni kök [40], h = 3, 15 anahtar · 6 yaprak. Artan: 30 anahtar · 10 yaprak, doluluk %75,0. Azalan: 14 yaprak, %53,6. 1.000 anahtarda artan 333 yaprak, %75,1, h = 6; azalan 499 yaprak, %50,1, h = 7; sınırlar 5 … 7.",
        explain:
          "Beş anahtara taşan yaprak 3 + 2 diye bölünür: sol ⌈(m+1)/2⌉ = 3, sağ 2 anahtar alır. Artan sırada yeni anahtarlar hep en sağdaki yaprağa gider; geride kalan sol yarılar 3 anahtarla donar: 3/4 = %75. Azalan sırada eklemeler en soldaki yaprağa gider; bu kez 2 anahtarlı sağ yarılar donar: 2/4 = %50. Yükseklik yalnızca kök bölününce artar; yaprak bölünmesi anahtarı kopyalar (40 hem kökte hem yaprakta), iç düğüm bölünmesi taşır (40 köke çıkar, ikinci düzeyde kalmaz). 1.000 anahtardaki %75,1 ve %50,1'in küsuratı, eklemelerin sürdüğü uçtaki yaprağın dolu olmasındandır.",
      },
      {
        title: "İki adım yer değiştirince 10 lira kaybolur",
        predict:
          "T1, A'ya 10; T2, A'ya 20 ekliyor. A = 100 ile başlayınca sonuç adımların sırası ne olursa olsun 130 mu çıkar? Hangi iki adımın yer değiştirmesi sonucu bozar?",
        do:
          "03 sekmesinin B bölümünde «Hazır çizelge»den «Seri çizelge: önce T1, sonra T2»yi seç. C1 adımını (3. satır) ↓ düğmesine iki kez basarak iki satır aşağı indir: fareyi oynatmadan aynı yere ikinci kez basman yeter, sayfa aynı adımı taşımayı sürdürür. Kartları oku. Sonra imleci R2(A) satırına götür ve ↑ düğmesine bir kez bas.",
        observe:
          "Başta son durum A = 130, «Döngü yok», kaba kuvvet «1 / 2». C1 inince çizelge <code>R1(A) W1(A=A+10) R2(A) W2(A=A+20) C1 C2</code> olur: yine A = 130 ve «Döngü yok», ama «Kirli okuma» saptanır. R2(A) yukarı çıkınca <code>R1(A) R2(A) W1(A=A+10) W2(A=A+20) C1 C2</code>: son durum A = 120, B = 50, C = 20; «Döngü var» (T1 → T2 → T1), kaba kuvvet «0 / 2», iki yöntem «Uyuşuyor», aykırılık «Kayıp güncelleme». İki seri sıra da A = 130 verir.",
        explain:
          "C1 hiçbir adımla çakışmaz; onu kaydırmak okları değiştirmez (ama T2 artık kalıcı olmamış bir değeri okur). R2(A) ile W1(A) ise çakışan bir çifttir: sıraları çevrilince T1 → T2 okunun yanına T2 → T1 eklenir ve döngü kapanır. İki işlem de 100'ü okumuş, T2'nin yazdığı 120 T1'in 110'unu ezmiştir. Alttaki yalıtım tablosunda kayıp güncelleme ayrı bir sütun değildir; hiçbir seri sırayla açıklanamadığı için serileştirme aykırılığı sayılır ve tabloda bu sütunu yalnızca SERIALIZABLE satırı «olamaz» diye işaretler.",
      },
    ],
  },
  wow: [
    {
      title: "SQL'in adını bir uçak şirketi değiştirdi",
      body:
        "Chamberlin ve Boyce 1974'te dillerine 'Structured English Query Language' demişti: SEQUEL. Adın, İngiliz havacılık grubu Hawker Siddeley'in bir şirketine ait tescilli marka olduğu anlaşılınca sesli harfler atıldı ve SQL kaldı. Bugün hâlâ pek çok mühendis adı 'sequel' diye okur. Boyce aynı yıl 27 yaşında öldü; dilin yaygınlaşmasını göremedi, ama Boyce–Codd Normal Formu adını taşıyor.",
    },
    {
      title: "Ay'a giden roketin parça listesi",
      body:
        "IBM'in IMS veritabanının geliştirilmesine 1966'da, Apollo programında Saturn V roketinin parça listelerini izlemek için başlandı; ekipte IBM'in yanında North American Rockwell ve Caterpillar mühendisleri vardı. Sistem 14 Ağustos 1968'de Rockwell'de kuruldu. Codd'un makalesinden iki yıl önce çalışmaya başlayan bu hiyerarşik veritabanının yeni sürümleri hâlâ çıkıyor ve büyük kurumların ana bilgisayarlarında işlem yürütüyor. Ay yolculuğu için doğan yazılım, yaklaşık altmış yıl sonra hâlâ görevde.",
    },
    {
      title: "Bir trilyon veritabanı, tek dosyalık bir kütüphane",
      body:
        "SQLite, D. Richard Hipp'in 2000'de yazdığı, sunucusu olmayan, bütün veritabanını tek dosyada tutan bir kütüphanedir ve kaynak kodu kamu malına bırakılmıştır. Android ve iPhone'larda, yaygın tarayıcılarda ve sayısız uygulamada gömülüdür; geliştiricilerinin tahminine göre dünyada bir trilyondan (10¹²) fazla SQLite veritabanı kullanımda. Python'un standart kitaplığındaki <code>sqlite3</code> modülüyle sayfadaki dört tabloyu gerçek bir motorda kendin kurabilirsin.",
    },
  ],
  worked: {
    title: "Bir ders kayıt tablosunu bağımlılıklarından normalleştirmek",
    prompt:
      "R(OgrNo, Ders, Ad, Bolum, Not) ilişkisinde iki bağımlılık geçerli: OgrNo → Ad, Bolum ve OgrNo, Ders → Not. (a) {OgrNo}⁺ ve {OgrNo, Ders}⁺ kapanışlarını hesapla, (b) aday anahtarları bul, (c) ilişkinin en yüksek normal formunu belirle, (d) kayıpsız bir BCNF ayrışımı yap ve bağımlılıkların korunup korunmadığını söyle. Sonuçlarını 03 sekmesinin A bölümünde, açılışta yüklü gelen «Ders kaydı: kısmi bağımlılık (2NF bozulur)» şemasıyla karşılaştır.",
    steps: [
      "Kapanış: {OgrNo} ile başla. OgrNo → Ad, Bolum'un sol yanı kümede; Ad ve Bolum eklenir: {OgrNo, Ad, Bolum}. İkinci bağımlılığın sol yanı Ders'i ister, Ders kümede yok; küme artık büyümez. {OgrNo}⁺ = {OgrNo, Ad, Bolum}; Ders ve Not eksik, yani OgrNo üst anahtar değil. {OgrNo, Ders} ile başlarsan iki bağımlılık da uygulanır ve beş niteliğin beşi gelir.",
      "Aday anahtar: {OgrNo, Ders} üst anahtardır; öz alt kümelerinden {OgrNo}⁺ eksik kalır, {Ders}⁺ = {Ders}. Öyleyse en küçüktür: aday anahtar. Başka anahtar da yoktur, çünkü OgrNo ve Ders hiçbir bağımlılığın sağ yanında geçmez; her anahtar ikisini de içermek zorundadır. Sayfa aynı sonucu sayarak bulur: 2⁵ = 32 alt küme, 8 üst anahtar ({OgrNo, Ders}'i içeren 2³ küme), 1 aday anahtar.",
      "Normal form: asal nitelikler OgrNo ve Ders; Ad, Bolum ve Not asal değil. OgrNo → Ad, asal olmayan bir niteliği anahtarın yalnızca bir parçasına bağlıyor: kısmi bağımlılık. 2NF bozulur, en yüksek form 1NF'dir. Bedeli tabloda görülür: öğrencinin adı ve bölümü aldığı her ders için yeniden yazılır; bölüm değişince satırların hepsini düzeltmek gerekir.",
      "BCNF ayrışımı: bozan belirleyen X = {OgrNo}. R₁ = X⁺ = (OgrNo, Ad, Bolum), R₂ = X ∪ (R − X⁺) = (OgrNo, Ders, Not). R₁'in anahtarı {OgrNo}, R₂'nin anahtarı {OgrNo, Ders}; ikisinde de her belirleyen üst anahtar, yani ikisi de BCNF. Ortak nitelik OgrNo, R₁'in anahtarı olduğundan R₁ ⋈ R₂ özgün ilişkiyi tam olarak geri verir: ayrışım kayıpsızdır. Her bağımlılık tek bir parçanın içinde kaldığı için ikisi de korunur.",
      "Her zaman bu kadar temiz bitmez. «Hazır şema»dan «Adres: 3NF ama BCNF değil; bağımlılık kaybı kaçınılmaz» seçeneğini aç: Sehir, Sokak → PostaKodu ve PostaKodu → Sehir. Aday anahtarlar {Sehir, Sokak} ve {Sokak, PostaKodu}; bütün nitelikler asal olduğundan ilişki 3NF'dir, ama PostaKodu üst anahtar olmadığından BCNF değildir. BCNF ayrışımı (Sehir, PostaKodu) ve (Sokak, PostaKodu) kayıpsızdır, yine de Sehir, Sokak → PostaKodu artık hiçbir parçada tek başına denetlenemez.",
    ],
    result:
      "{OgrNo}⁺ = {OgrNo, Ad, Bolum}; tek aday anahtar {OgrNo, Ders}; ilişki 1NF'de kalır (2NF'yi OgrNo → Ad bozar); (OgrNo, Ad, Bolum) ve (OgrNo, Ders, Not) ayrışımı BCNF'dir, kayıpsızdır ve iki bağımlılığı da korur: sayfadaki «BCNF ayrışımı» kartı «2 ilişki» ve altında «kayıpsız · bağımlılıklar korunuyor» yazar. Adres şemasında aynı kart «kayıpsız · 1 bağımlılık korunmuyor» der; 3NF sentezi ilişkiyi tek parça bırakarak ikisini birden sağlar. BCNF ile bağımlılık koruma arasında seçim yapmak gereken klasik durum budur.",
  },
  misconceptions: [
    {
      myth: "NULL, sıfır ya da boş metin demektir.",
      truth:
        "NULL 'bilinmiyor ya da yok' demektir ve hiçbir değere eşit sayılmaz; <code>NULL = NULL</code> bile doğru çıkmaz. Bu yüzden <code>WHERE bolum_kod = NULL</code> hiçbir satır getirmez, <code>IS NULL</code> gerekir. Kümeleme işlevleri de NULL'ı atlar: sayfadaki «Kümeleme işlevleri» sorgusunda tarih türünün iki kitabından birinin yılı NULL'dır; COUNT(*) 2, COUNT(yil) 1, AVG(yil) 1998 çıkar. Sıralamadaki yeri bile üründen ürüne değişir: SQLite ve bu sayfanın motoru artan sırada NULL'ları en başa, PostgreSQL varsayılan olarak en sona koyar.",
    },
    {
      myth: "Tablo ne kadar parçalanırsa o kadar iyidir.",
      truth:
        "Normalizasyon yazma anomalilerini önler ama soruları daha çok JOIN'e bağlar. Raporlama ve analiz sistemleri (veri ambarları) bilerek tekrar içeren, az JOIN'li tablolar kurar; buna denormalizasyon denir. Doğru düzey, verinin ne sıklıkla yazıldığına ve nasıl sorgulandığına bağlıdır. Kuramın kendisi de bir bedel gösterir: Adres şemasında BCNF'ye geçmek bir bağımlılığın tek tabloda denetlenebilmesinden vazgeçmek demektir.",
    },
    {
      myth: "İndeks her sorguyu hızlandırır.",
      truth:
        "İndeks yalnızca indekslenen sütun üzerinden süzen, birleştiren ya da sıralayan sorgulara yardım eder; her yeni satırda ağaç da güncellenir, bu yüzden yazma yavaşlar ve disk büyür. Sayfada «İndeks kullan» açıkken «Bütün öğrenciler» sorgusu yine 12 satırın 12'sini okur; durum satırı indeksli sütuna eşitlik bulunmadığını söyler. Tablonun yarısını döndürecek bir sorguda tam tarama indeksten hızlı olabilir; iyi bir sorgu planlayıcı bunu tahmin edip indeksi kullanmamayı seçer.",
    },
    {
      myth: "CAP: tutarlılık, erişilebilirlik ve bölünme toleransından istediğin ikisini seç.",
      truth:
        "Ağ bölünmesi seçilecek bir özellik değil, başa gelen bir olaydır; kablolar kopar. Gilbert ve Lynch'in ispatladığı şey şudur: mesajların kaybolabildiği bir ağda hiçbir sistem hem her isteğe cevap vermeyi hem de her okumanın en son yazılanı görmesini aynı anda garanti edemez. Yani seçim bölünme anında tutarlılık ile erişilebilirlik arasındadır; bölünme yokken ikisi birlikte sunulabilir. Brewer 2012'de 'üçten ikisi' sloganının yanıltıcı olduğunu kendisi yazdı. Buradaki tutarlılık, ACID'in C'siyle aynı şey de değildir.",
    },
  ],
  glossary: [
    { term: "Birincil anahtar (PK)", definition: "Bir tablodaki her satırı tek başına ve tekrarsız tanımlayan sütun ya da sütun kümesi; sayfadaki tablolarda altı çizili sütun." },
    { term: "Yabancı anahtar (FK)", definition: "Başka bir tablonun anahtarındaki bir değere işaret eden sütun; tablolar arasındaki ilişkiyi kurar (odunc.ogrenci_id → ogrenciler.id)." },
    { term: "NULL", definition: "Bir hücrede değer bulunmadığını belirten işaret; sıfır ya da boş metin değildir, karşılaştırmaları bilinmeyen sonucunu verir ve IS NULL ile sorgulanır." },
    { term: "Fonksiyonel bağımlılık", definition: "X → Y: X niteliklerinde aynı değeri taşıyan her iki satırın Y niteliklerinde de aynı değeri taşıması." },
    { term: "Aday anahtar", definition: "Kapanışı bütün nitelikleri veren ve hiçbir niteliği çıkarılamayan nitelik kümesi; birincil anahtar, aday anahtarlardan seçilen biridir." },
    { term: "İndeks", definition: "Bir sütunun sıralı, çoğunlukla B+ağacı biçiminde tutulan kopyası; aramayı tam taramadan ağacın yüksekliği kadar düğüm okumasına indirir." },
    { term: "İşlem (transaction)", definition: "Birden çok okuma ve yazmayı tek bir bölünmez birime saran yapı; ya tümü kalıcı olur (COMMIT) ya hiçbiri (ROLLBACK)." },
    { term: "Önden yazma günlüğü (WAL)", definition: "Değişikliğin tabloya işlenmeden önce sıralı bir günlük dosyasına yazılması; çökmeden sonra onaylanmış işlemler yeniden uygulanır, onaylanmamışlar geri alınır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisansın 'Veritabanı Sistemleri' dersi bu sayfanın üç sekmesini de derinleştirir. İlişkisel cebirin yanına <strong>sorgu iyileştirme</strong> gelir: iyileştirici, aynı sonucu veren ifadeler arasından en ucuzunu arar; koşulları birleştirmenin altına iter, birleştirme sırasını tablo istatistiklerine göre seçer ve iç içe döngünün yanında karma ve sıralı-birleştirme algoritmalarını tartar. Sayfanın motoru bunlardan yalnızca en basitini, indeksli bir eşitliği öne almayı yapar; 690 ile 90 arasındaki farkı senin görmen için gerisini sana bırakır. Normalizasyon kanıtlanabilir bir kurama dönüşür: Armstrong aksiyomlarının sağlamlığı ve tamlığı, en küçük örtü, kayıpsız birleştirmenin tablo (chase) sınaması, ardından çok değerli bağımlılıklar ve 4NF. İşlemler tarafında sayfanın bilerek dışarıda bıraktığı konular başlar: iki aşamalı kilitleme, çok sürümlü eşzamanlılık denetimi, anlık görüntü yalıtımı, kilitlenme ve günlük tabanlı kurtarma (ARIES algoritması).",
      "'Dağıtık Sistemler' dersi CAP'in ötesine geçer: Paxos ve Raft gibi uzlaşı algoritmaları, sunucuların bir azınlığı çökse bile kalanların tek bir kayıt sırası üzerinde anlaşmasını sağlar; Google'ın 2012'de tanıttığı Spanner, atom saatleri ve GPS ile eşgüdümlenen saatlerle dünya çapında tutarlı işlem yürütür. 'Veri Yapıları ve Algoritmalar' dersinde B-ağacının ekleme, silme ve bölme işlemleri, yüksekliğin O(log n) olduğunun ispatıyla birlikte görülür; ikinci sekmedeki denetçinin sınadığı değişmezler o ispatın dayandığı özelliklerdir. Çizge veritabanları, sütun temelli analitik depolar ve vektör indeksleri hep aynı soruyu sorar: veriyi hangi biçimde tutarsan hangi soru ucuzlar?",
    ],
    topics: ["İlişkisel cebir ve ilişkisel hesap", "Fonksiyonel bağımlılıklar, Armstrong aksiyomları, 4NF", "Sorgu iyileştirme ve maliyet modeli", "B+ağacı ve karma indeksler", "Eşzamanlılık denetimi: kilitleme ve çok sürümlü yöntemler", "Kurtarma (ARIES) ve dağıtık uzlaşı (Paxos, Raft)"],
  },
  quiz: [
    {
      question: "Sayfadaki motor (iyileştirme yok, iç içe döngü) «İki JOIN» sorgusunda 660 birleştirme karşılaştırması yapıyor. Üç tablo da on kat büyüse (odunc 300, ogrenciler 120, kitaplar 100 satır) bu sayı kaç olurdu?",
      options: ["6.600", "13.200", "66.000", "660.000"],
      answer: 2,
      explanation: "Karşılaştırma sayısı Σ|sol|·|sağ| = 300·120 + 300·100 = 66.000'dir. İki çarpan da on katına çıktığı için bedel yüz katına çıkar: iç içe döngü karesel büyür. İndeksli yolda arama sayısı 60'tan 600'e, yani yalnızca on katına çıkar; her aramanın bedeli olan ağaç yüksekliği ise logaritmik arttığı için yalnızca birkaç düzey büyür.",
    },
    {
      question: "ogrenciler tablosunda 12 satır var ve bolum_kod = 'BIL' koşulu 4 satır döndürüyor. Aynı tabloda WHERE NOT (bolum_kod = 'BIL') kaç satır döndürür?",
      options: ["8 satır: geri kalanların hepsi", "7 satır: bölüm kodu NULL olan öğrenci iki sorguda da görünmez", "12 satır: NOT bütün satırları geri getirir", "0 satır: tabloda NULL varsa NOT hiçbir şey seçmez"],
      answer: 1,
      explanation: "Umut'un bölüm kodu NULL'dır; onun için bolum_kod = 'BIL' ne doğru ne yanlış, bilinmeyendir. NOT bilinmeyen yine bilinmeyendir ve WHERE yalnızca doğru olan satırları tutar. Geriye bölümü bilinen ve BIL olmayan 7 öğrenci kalır: 4 + 7 = 11. Tabloyu eksiksiz bölmek için üçüncü bir koşul gerekir: bolum_kod IS NULL.",
    },
    {
      question: "«Yinelenemeyen okuma» hazır çizelgesinde son durum A = 70 çıkıyor ve iki seri sıranın (T1 → T2, T2 → T1) son durumu da A = 70. Bu çizelge çakışma-serileştirilebilir mi?",
      options: ["Evet; son durum bir seri sıranınkiyle aynıysa çizelge serileştirilebilirdir", "Evet; T1 hiçbir şey yazmadığı için hiçbir adımla çakışamaz", "Hayır; öncelik grafiğinde T1 → T2 → T1 döngüsü var ve T1 aynı öğeyi önce 100, sonra 70 okuyor", "Hayır; bir çizelgede iki COMMIT varsa çizelge serileştirilemez"],
      answer: 2,
      explanation: "T1'in ilk okuması W2(A)'dan önce, ikincisi sonra gelir: R1(A) → W2(A) T1 → T2 okunu, W2(A) → R1(A) T2 → T1 okunu verir. Okuma ile yazma da çakışır; çakışma için adımlardan birinin yazması yeter. Hiçbir seri sırada T1 iki farklı değer okuyamaz: ya iki kez 100 ya iki kez 70 görür. Sayfa bunu «Okumalar aynı: hayır» diye gösterir; son duruma bakmak yetmez.",
    },
  ],
  next: [
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Dizi, bağlı liste, hash tablosu, ikili arama ağacı ve heap aynı sayfada; bir indeksin neden ağaç ya da hash tablosu olarak kurulduğunu yapıları yan yana deneyerek gör." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "O(log n), O(n) ve O(n²) arasındaki uçurumu büyüme sınıflarının grafiğinde izle; ağaç aramasının, tam taramanın ve iç içe döngülü birleştirmenin matematiği orada." },
    { href: "programlama-paradigmalari.html", title: "Programlama Paradigmaları: Aynı Problem, Farklı Düşünme Biçimleri", why: "Üçüncü sekmedeki mini Prolog da SQL gibi bildirimseldir: olguları ve kuralları yazarsın, sorgunun cevabını arama ağacı bulur; yapılan birleştirmeleri sayabilirsin." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi (Graph Theory)", why: "Öncelik grafiğinin dili ve çizge veritabanlarının veri modeli: düğümler, kenarlar, BFS ile 'arkadaşın arkadaşı' taraması ve Dijkstra ile en kısa yol." },
  ],
  sources: [
    { title: "PostgreSQL 18 Belgeleri · 13.2 Transaction Isolation", url: "https://www.postgresql.org/docs/current/transaction-iso.html", note: "Tablo 13.1: SQL standardının dört yalıtım düzeyi ile kirli okuma, yinelenemeyen okuma, hayalet okuma ve serileştirme aykırılığı tanımları; sayfadaki yalıtım tablosu buradan aktarılmıştır (İngilizce)." },
    { title: "PostgreSQL 18 Belgeleri · 7.5 Sorting Rows (ORDER BY)", url: "https://www.postgresql.org/docs/current/queries-order.html", note: "NULL değerler varsayılan olarak her değerden büyük sayılır: artan sırada en sonda (NULLS LAST), azalan sırada en başta gelir (İngilizce)." },
    { title: "SQLite · Datatypes In SQLite", url: "https://www.sqlite.org/datatype3.html", note: "Bölüm 4.1 ve 6: NULL her değerden küçük sayılır ve sıralamada en başa gelir; bölüm 7: varsayılan BINARY karşılaştırması metni bayt sırasıyla dizer (İngilizce)." },
    { title: "MIT OpenCourseWare · 6.830 Database Systems (Güz 2010)", url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/", note: "Madden, Morris ve Stonebraker'ın lisans ve lisansüstü dersi: ders notları, alanın özgün makalelerinden okuma listesi, ödevler ve çözümlü sınavlar (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
