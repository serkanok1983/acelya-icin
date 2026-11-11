window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["veritabanlari"] = {
  slug: "veritabanlari",
  title: "Veritabanları: Soruyu Sor, Yolu Bilme",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "1970'te bir IBM matematikçisi, verinin diskte nerede durduğunu bilmeden soru sorulabileceğini iddia etti. Bugün cebindeki telefon bu fikrin onlarca kopyasını taşıyor: tablolar, anahtarlar, JOIN ve bir ağaç.",
  hook:
    "Telefonundaki mesajlar, rehberin ve tarayıcı geçmişin düz birer metin dosyası değil; her biri küçük bir veritabanının içinde, satır satır duruyor. Peki bir kütüphane 'kimde hangi kitap var, hangisi hâlâ dönmedi?' sorusunu defterleri baştan sona okumadan nasıl cevaplar; bir milyar kayıt arasından birini neden dört beş adımda bulabilir?",
  bigIdea:
    "İlişkisel veritabanı, veriyi <strong>tablolara</strong> ve tablolar arasındaki <strong>anahtar</strong> bağlarına ayırır; sen yalnızca <em>ne</em> istediğini söylersin (SQL), <em>nasıl</em> bulunacağına sistem karar verir ve çoğu zaman bunu bir B+ağacında logaritmik sayıda adımla yapar.",
  story: [
    "1960'larda bilgisayarlar veri saklıyordu ama veriyi bulmak programcının işiydi. Charles Bachman'ın 1960'ların başında General Electric'te kurduğu IDS'te ve IBM'in 1966–1968'de Apollo programı için geliştirdiği IMS'te kayıtlar birbirine işaretçilerle bağlanırdı; bir soru sormak, bu işaretçileri adım adım izleyen bir program yazmak demekti. Verinin düzeni değişirse program da bozulurdu. Haziran 1970'te IBM'in San Jose laboratuvarında çalışan İngiliz matematikçi <strong>Edgar F. Codd</strong>, <em>Communications of the ACM</em>'de on bir sayfalık bir makale yayımladı: veri, matematikteki anlamıyla <strong>ilişkilerde</strong>, yani satır ve sütunlardan oluşan tablolarda tutulsun; tablolar arasındaki bağ işaretçiyle değil ortak değerlerle kurulsun; kullanıcı yolu değil sonucu tarif etsin. IBM'in o sırada iyi satan bir ürünü, IMS'i vardı ve şirket yeni fikre hemen sarılmadı; bir prototipe ancak birkaç yıl sonra girişildi.",
    "O prototip <strong>System R</strong> (1974–1979) oldu. İçinde Donald Chamberlin ile Raymond Boyce'un 1974'te tasarladığı sorgu dili SEQUEL vardı; ad, bir İngiliz uçak şirketinin tescilli markası çıkınca kısaltılıp <strong>SQL</strong> yapıldı. Boyce, dilin ilk makalesinin sunulduğu 1974 yılında, 27 yaşında bir anevrizmadan öldü; adı bugün Boyce–Codd Normal Formu'nda yaşıyor. Aynı yıllarda Berkeley'de Michael Stonebraker ve Eugene Wong, Codd'un makalelerinden yola çıkarak <em>Ingres</em>'i yazdı; onun ardılı olan Postgres projesi 1986'da başladı ve 1996'da PostgreSQL adını aldı. 1979'da Larry Ellison'ın küçük şirketi, IBM'den önce davranıp ilk ticari SQL veritabanını satışa çıkardı: Oracle. 1986'da SQL, ANSI standardı oldu. Bachman 1973'te, Codd 1981'de, Stonebraker 2014'te Turing Ödülü aldı.",
    "Tablolar yetmezdi; hızlı bulma ve güvenli yazma da gerekiyordu. Boeing'in araştırma laboratuvarında Rudolf Bayer ve Edward McCreight, disk bloklarına uygun ve her zaman dengeli kalan bir arama ağacı tasarladı; 1970 tarihli raporları 1972'de dergide yayımlandı: <strong>B-ağacı</strong>. Addaki B'nin ne anlama geldiğini hiç açıklamadılar. Bu ağacın, veriyi yalnızca yapraklarda tutan ve yaprakları birbirine zincirleyen türü olan B+ağacı, bugün ilişkisel veritabanlarının çoğunda varsayılan indekstir. Jim Gray ise 1970'lerde bir havalenin 'ya tamamen olur ya hiç olmaz' garantisini, yani <strong>işlem</strong> (transaction) kavramını biçimlendirdi; 1983'te Theo Härder ve Andreas Reuter bu garantilere ACID adını verdi. Gray 1998'de Turing Ödülü aldı.",
    "2000'lerde web, tek makineye sığmayan veriyi getirdi. Google'ın Bigtable (2006) ve Amazon'un Dynamo (2007) makaleleri, veriyi yüzlerce sunucuya dağıtan, karşılığında tabloların bazı garantilerinden vazgeçen sistemleri anlattı. Haziran 2009'da San Francisco'daki bir buluşma bu sistemlere bugünkü ortak adını verdi: <strong>NoSQL</strong>. Eric Brewer'ın 2000'de bir varsayım olarak ortaya attığı, 2002'de Seth Gilbert ile Nancy Lynch'in ispatladığı CAP teoremi, bu vazgeçişin bir bölümünün neden kaçınılmaz olduğunu söyler. Bugün iki dünya birbirine yaklaşıyor: PostgreSQL JSON belgeleri saklıyor, dağıtık sistemler yeniden SQL konuşuyor. D. Richard Hipp'in 2000'de, bir savaş gemisinde kullanılacak yazılım için yazdığı tek dosyalık <strong>SQLite</strong> ise kamu malı olarak telefonlara ve tarayıcılara girdi; sayfadaki kütüphane sorgularını onunla birebir deneyebilirsin.",
  ],
  core: [
    {
      heading: "Tablo, anahtar, ilişki",
      body:
        "Sayfanın şema panelindeki üç tablo bütün modeli özetler. <strong>ogrenciler</strong> ve <strong>kitaplar</strong> birer varlık listesidir; <strong>odunc</strong> ikisi arasındaki olayları tutar. Her tablonun bir <strong>birincil anahtarı</strong> (PK) vardır: her satırı tek başına tanımlayan sütun, burada <code>id</code>. odunc tablosundaki <code>ogrenci_id</code> ve <code>kitap_id</code> ise <strong>yabancı anahtardır</strong> (FK): başka bir tablonun anahtarına işaret eden değerler. Öğrencinin adı odunc tablosunda tekrar yazılmaz, yalnızca numarası yazılır; ad değişirse tek yerde değişir. Codd'un asıl buluşu buradadır: bağ, diskteki bir adres değil, iki tabloda ortak bir değerdir. Matematik diliyle bir tablo, sütunlarının alabileceği değer kümelerinin kartezyen çarpımının bir alt kümesidir; satırları sırasızdır. SQL bu saf modelden iki yerde ayrılır: aynı satırın yinelenmesine izin verir ve 'değer yok' anlamında NULL kullanır.",
      formula: "R ⊆ D<sub>1</sub> × D<sub>2</sub> × … × D<sub>n</sub>",
      formulaNote: "R bir ilişki (tablo), D<sub>i</sub> i. sütunun değer kümesi. Her satır bir n'lidir; ogrenciler tablosunda n = 4: (id, ad, bolum, sinif).",
    },
    {
      heading: "JOIN: süzülmüş kartezyen çarpım",
      body:
        "İki tabloyu birleştirmenin en kaba yolu her satırı her satırla eşlemektir; 3 satır ile 3 satırdan 9 satır çıkar. Sayfadaki <strong>CROSS JOIN</strong> sekmesi tam bunu gösterir. <strong>INNER JOIN</strong>, bu 9 satırdan yalnızca ON koşulunu sağlayanları tutar: id'si 2 ve 3 olan iki eşleşme. İlişkisel cebirde bu, çarpımın üstüne bir seçme işlemidir. <strong>LEFT JOIN</strong> soldaki tablonun eşleşmeyen satırlarını da getirir ve boş kalan sütunlara <strong>NULL</strong> yazar; Ali kitap almamış olsa da listede kalır. RIGHT JOIN aynısını sağ tablo için, FULL OUTER JOIN ikisi için yapar. Soru 'kimler kitap aldı?' ise INNER, 'herkesi göster, almayanlar da görünsün' ise LEFT doğru araçtır. Veritabanı çarpımı gerçekten kurmaz; eşleşenleri indeksle ya da karma tabloyla bulur, ama sonuç bu tanımla aynıdır.",
      formula: "A ⋈<sub>θ</sub> B = σ<sub>θ</sub>(A × B),  |A × B| = |A|·|B|",
      formulaNote: "σ seçme, θ ON koşulu, ⋈ birleştirme. Sayfada A ve B üçer satır: çarpım 9, INNER 2, LEFT 3, RIGHT 3, FULL 4 satır.",
    },
    {
      heading: "Normalizasyon: her gerçek tek yerde",
      body:
        "Bir hücreye 'Kalem, Defter, Silgi' yazarsan üçüncü ürünü silmek için metni ayrıştırman gerekir; müşterinin şehrini her siparişte yinelersen şehir değiştiğinde yüz satırı düzeltirsin, birini unutursan veri kendisiyle çelişir. Normalizasyon bu <strong>anomalileri</strong> önlemek için tabloyu bölme disiplinidir; dayanağı <strong>fonksiyonel bağımlılıktır</strong>: X → Y, 'X'i aynı olan iki satırın Y'si de aynıdır' demektir. <strong>1NF</strong> her hücrede tek değer ister. <strong>2NF</strong>, anahtar dışı hiçbir sütunun bileşik bir anahtarın yalnızca bir parçasına bağlı olmamasını ister; anahtarı tek sütun olan tablo bunu kendiliğinden sağlar. <strong>3NF</strong>, anahtar dışı bir sütunun anahtara başka bir anahtar dışı sütun üzerinden, dolaylı bağlanmasını yasaklar. <strong>BCNF</strong> en kısa hâliyle söyler: her bağımlılığın sol yanı bir anahtar içermelidir. Bill Kent'in özetiyle her sütun anahtara, bütün anahtara ve yalnızca anahtara bağlı olmalıdır.",
      formula: "BCNF: her X → A için (A ∉ X) X bir üst anahtardır",
      formulaNote: "Üst anahtar: satırı tek başına belirleyen sütun kümesi. 3NF aynı koşulu, A'nın kendisi bir aday anahtarın parçasıysa gevşetir. Sayfadaki müşteri → şehir → bölge zinciri 3NF'yi bozar; bu yüzden şehirler ayrı tabloya taşınır.",
    },
    {
      heading: "İşlem ve ACID: ya hep ya hiç",
      body:
        "Bir havale iki yazma işidir: Ayşe'den 100 lira düş, Ali'ye 100 lira ekle. İlkinden sonra elektrik kesilirse para buharlaşır. <strong>İşlem</strong> (transaction), birden çok yazmayı tek bir bölünmez adıma sarar: BEGIN ile başlar, COMMIT ile kalıcı olur, hata çıkarsa ROLLBACK ile hiç olmamış gibi geri alınır. Dört harf dört ayrı sözdür: <strong>A</strong> bölünmezlik, <strong>C</strong> tanımlı kuralların (anahtarlar, kısıtlar) işlem sonunda bozulmamış olması, <strong>I</strong> aynı anda çalışan işlemlerin birbirinin yarım hâlini görmemesi, <strong>D</strong> onaylanan işin çökmeden sonra da yerinde durması. Kalıcılığın yaygın yolu <strong>önden yazma günlüğüdür</strong> (WAL): veritabanı tabloyu değiştirmeden önce yapacağı değişikliği sıralı bir günlük dosyasına yazar. Çökmeden sonra günlüğü okur; onaylanmış işlemleri yeniden uygular, onaylanmamışları geri alır.",
      formula: "BEGIN → yaz → yaz → COMMIT | ROLLBACK",
      formulaNote: "COMMIT kaydı günlüğe ulaşmadan çöken işlem hiç başlamamış sayılır; ulaştıktan sonra çöken tamamlanmış sayılır. Arası yoktur.",
    },
    {
      heading: "İndeks ve B+ağacı: milyarı dört adımda bulmak",
      body:
        "Bir milyar satırlık tabloda <code>WHERE id = 4711</code> aramak, indeks yoksa satırların hepsine bakmak demektir. <strong>İndeks</strong>, bir sütunun sıralı ve ağaç biçiminde tutulan kopyasıdır. Sayfadaki çizimde üstteki turkuaz kutu yönlendirici düğüm, alttaki mor kutular yapraklardır; üstteki anahtarlar yalnızca 'hangi yaprağa in' der, kayıtların adresleri yapraklarda durur. Diskte bir düğüm bir sayfadır (çoğunlukla 4–16 KB) ve içine yüzlerce anahtar sığar; bu sayıya <strong>dallanma</strong> (f) denir. h seviyeli bir ağaç en çok f<sup>h</sup> anahtara ulaşabildiğinden N anahtar için gereken yükseklik log<sub>f</sub> N kadardır. Kural gereği kök dışındaki düğümler en az yarı dolu tutulur; en kötü durumda bile yükseklik yaklaşık log<sub>f/2</sub> N + 1'i aşmaz. Yapraklar birbirine zincirli olduğundan '1000 ile 2000 arası' gibi aralık sorguları tek inişle başlar, sonra yan yana yürür.",
      formula: "⌈log<sub>f</sub> N⌉ ≤ h ≲ log<sub>f/2</sub> N + 1",
      formulaNote: "N anahtar sayısı, f bir düğümün en çok taşıdığı çocuk sayısı, h seviye sayısı. f = 250 ve N = 10⁹ için h = 4 ya da 5. Sayfada yaprak başına 5 anahtar: 17 anahtar → 4 yaprak, h = 2.",
    },
  ],
  lab: {
    intro:
      "Sayfada üç canlı alan ve üç okuma paneli var. <strong>SQL Sorgu Playground</strong>: sorguyu kutuya yazıp <strong>Çalıştır</strong> (ya da Ctrl+Enter) ile işletirsin; dört hazır düğme (SELECT *, JOIN, GROUP BY, WHERE) örnek sorgu yükler, sonucun altında '… satır döndü' yazar, sağdaki panel şemayı gösterir. <strong>JOIN Türleri</strong> sekmeleri (INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER, CROSS JOIN) Venn şemasını ve sonuç tablosunu değiştirir. <strong>B+Tree</strong> alanında sayı kutusu (varsayılan 25) ile <strong>Ekle</strong>, <strong>Ara</strong> ve <strong>Sıfırla</strong> düğmeleri bulunur. Normalizasyon, ACID ve NoSQL panelleri okunacak kartlardır. Playground gerçek bir SQL motoru değil, birkaç kalıbı tanıyan küçük bir taklittir: tek tablodan <code>SELECT</code>, tek koşullu <code>WHERE</code>, iki tablolu <code>JOIN … ON</code>, <code>GROUP BY</code> ile sayma ve <code>ORDER BY</code>. Tanımadığı sorguda hata mesajı verir; aşağıdaki sayıların hepsi gerçek SQLite'ta da aynı çıkar.",
    experiments: [
      {
        title: "JOIN kaç satır üretir, GROUP BY kimi sayar?",
        predict: "ogrenciler 5, odunc 6 satır. İkisini öğrenci numarası üzerinden birleştirince kaç satır çıkar: 5 mi, 6 mı, 30 mu? Hangi öğrenci iki kez görünür?",
        do: "<strong>JOIN</strong> düğmesine bas; satır sayısını ve <code>ad</code> sütununu oku. Sonra kutuya <code>SELECT ogrenci_id, COUNT(*) FROM odunc GROUP BY ogrenci_id</code> yazıp çalıştır. Son olarak JOIN Türleri panelinde beş sekmeyi sırayla aç ve sonuç tablolarının satırlarını say.",
        observe: "JOIN 6 satır döndürür: her ödünç kaydı bir satır, Ali Yılmaz iki kez görünür (1 ve 3 numaralı ödünçler). Sonuçta iki ayrı numara sütunu vardır: <code>ogrenciler.id</code> ve <code>odunc.id</code>. GROUP BY 5 satır verir: ogrenci_id 1 için COUNT(*) 2, diğer dördü için 1. Sekmelerde INNER 2, LEFT 3, RIGHT 3, FULL OUTER 4, CROSS 9 satır sayarsın.",
        explain: "Çarpım 5 × 6 = 30 satırdır; ON koşulu bunlardan yalnızca numarası tutan 6'sını bırakır. INNER JOIN eşleşen her çift için bir satır üretir, Ali'nin iki ödüncü iki satır demektir. GROUP BY aynı değere sahip satırları tek satıra toplar, COUNT(*) kaç tane olduğunu söyler: satır sayısı kayıt sayısı değil, grup sayısıdır. Sekmelerdeki 3 satırlık A ve B için 2 + 1 + 1 = 4: iki eşleşen, bir yalnız A'da, bir yalnız B'de.",
      },
      {
        title: "NULL ve büyük harf: sorgu neden boş döner?",
        predict: "odunc tablosunda <code>iade</code> sütunu boş olanlar hâlâ dışarıdaki kitaplardır. Kaç tane var? Aynı satırları <code>iade = NULL</code> diye sorsan ne olur? <code>bolum = 'bilgisayar'</code> ile <code>bolum = 'Bilgisayar'</code> aynı sonucu verir mi?",
        do: "<strong>WHERE</strong> düğmesine bas (<code>iade IS NULL</code>), satır sayısını not et. Sorguyu <code>IS NOT NULL</code>, sonra <code>iade = NULL</code> yapıp çalıştır. Ardından <code>SELECT * FROM ogrenciler WHERE bolum = 'Bilgisayar'</code> sorgusunu önce böyle, sonra küçük b ile dene.",
        observe: "IS NULL 3 satır (1, 3 ve 5 numaralı ödünçler), IS NOT NULL 3 satır, <code>iade = NULL</code> ise 0 satır döndürür. 'Bilgisayar' 2 satır getirir (Ali Yılmaz ve Mehmet Demir); 'bilgisayar' 0 satır.",
        explain: "NULL 'değer yok' demektir ve hiçbir şeye eşit sayılmaz: <code>iade = NULL</code> karşılaştırmasının sonucu doğru ya da yanlış değil, 'bilinmiyor'dur; WHERE yalnızca doğru çıkan satırları geçirir. Metin karşılaştırmasının harf büyüklüğüne duyarlı olup olmadığı ise <strong>harmanlama</strong> (collation) ayarına bağlıdır: SQLite ve PostgreSQL varsayılan olarak duyarlıdır, MySQL'in yaygın varsayılanı duyarsızdır. 'Sorgum neden boş döndü?' sorusunun en sık iki cevabı bu deneydedir.",
      },
      {
        title: "ORDER BY ve Türkçe İ'nin yeri",
        predict: "kitaplar tablosunu ada göre sıralarsan 'İşletim Sistemleri' nereye düşer: alfabedeki yerine mi, listenin en başına mı, en sonuna mı? Sayfa sayısına göre azalan sıralamada ilk kitap hangisi?",
        do: "<code>SELECT * FROM kitaplar ORDER BY ad</code> çalıştır, sırayı yaz. Sonra <code>SELECT * FROM kitaplar ORDER BY sayfa DESC</code> dene.",
        observe: "Ada göre: Algoritmalara Giriş, Derleyici Tasarımı, Veritabanı Sistemleri, Yapay Zeka ve en sonda İşletim Sistemleri. Sayfaya göre azalan: Cormen 1312, Russell 1152, Tanenbaum 1100, Aho 1009, Date 850.",
        explain: "Motor metinleri karakterlerin Unicode numarasına göre karşılaştırır: A–Z harfleri 65–90 arasındadır, noktalı büyük İ ise 304'tür ve hepsinden sonra gelir. SQLite da varsayılan ayarıyla aynı sırayı verir. Dil kurallarını bilen bir harmanlama İ'yi alfabedeki yerine, I ile J'nin arasına koyar; PostgreSQL'de bu, sıralamaya <code>COLLATE \"tr-TR-x-icu\"</code> eklenerek istenir. Sayılarda böyle bir sorun yoktur: 1312 her yerde 1152'den büyüktür.",
      },
      {
        title: "Ağacın yaprakları ne zaman çoğalır?",
        predict: "Sıfırlanmış ağaçta 17 anahtar var ve her yaprak en çok 5 anahtar alıyor. Kaç yaprak kutusu görmeyi bekliyorsun? Kaç anahtar daha eklersen beşinci yaprak belirir?",
        do: "<strong>Sıfırla</strong>'ya bas, mor yaprak kutularını say. Kutuya 45 yazıp <strong>Ara</strong>'ya, sonra 47 yazıp yine Ara'ya bas. Ardından 12 yazıp <strong>Ekle</strong>; sonra sırayla 1, 2 ve 3'ü ekle. Her eklemeden sonra üstteki kutuyu ve yaprak sayısını izle.",
        observe: "Başta 4 yaprak ve üstte 10 | 35 | 60 | 85. 45 için 'bulundu' mesajı çıkar ve anahtar 1.5 saniye sarı yanar; 47 'bulunamadı'. 12 eklenince hâlâ 4 yaprak vardır ama üst kutu 10 | 30 | 55 | 80 olur: 30 ilk yapraktan ikinciye kaymıştır. 1 ve 2 ile 20 anahtar, hâlâ 4 yaprak. 3 eklenince (21 anahtar) beşinci yaprak açılır ve üstte ikinci bir turkuaz kutu belirir.",
        explain: "Yaprak sayısı ⌈N/5⌉'tir: 17, 18 ve 20 için 4; 21 için 5. Üstteki anahtarlar yaprakların ilk değerleridir; 45 için '35 ≤ 45 < 60, ikinci yaprağa in' denir ve tek inişte bulunur. Sayfa her eklemede ağacı sıralı listeden yeniden kurduğu için anahtarlar yapraklar arasında kayar ve yapraklar tıka basa dolar. Gerçek B+ağacı yalnızca taşan yaprağı ikiye böler, ortadaki anahtarı üst düğüme kopyalar; 21'de beliren iki turkuaz kutunun üstüne de yeni bir kök açar ve yükseklik 3 olur.",
      },
    ],
  },
  wow: [
    {
      title: "SQL'in adını bir uçak şirketi değiştirdi",
      body:
        "Chamberlin ve Boyce 1974'te dillerine 'Structured English Query Language' demişti: SEQUEL. Adın İngiliz uçak üreticisi Hawker Siddeley'in tescilli markası olduğu anlaşılınca sesli harfler atıldı ve SQL kaldı. Bugün hâlâ pek çok mühendis adı 'sequel' diye okur. Boyce aynı yıl 27 yaşında öldü; dilin yaygınlaşmasını göremedi, ama Boyce–Codd Normal Formu adını taşıyor.",
    },
    {
      title: "Ay'a giden roketin parça listesi",
      body:
        "IBM'in IMS veritabanının geliştirilmesine 1966'da, Apollo programında Saturn V roketinin parça listelerini izlemek için başlandı; ekipte IBM'in yanında North American Rockwell ve Caterpillar mühendisleri vardı. Sistem 14 Ağustos 1968'de kuruldu. Codd'un makalesinden iki yıl önce çalışmaya başlayan bu hiyerarşik veritabanı hâlâ satılıyor ve büyük kurumların ana bilgisayarlarında işlem yürütüyor. Ay yolculuğu için doğan yazılım, yaklaşık altmış yıl sonra hâlâ görevde.",
    },
    {
      title: "Bir trilyon veritabanı, tek dosyalık bir kütüphane",
      body:
        "SQLite, D. Richard Hipp'in 2000'de yazdığı, sunucusu olmayan, bütün veritabanını tek dosyada tutan bir kütüphanedir ve kaynak kodu kamu malına bırakılmıştır. Android ve iPhone'larda, yaygın tarayıcılarda ve sayısız uygulamada gömülüdür; geliştiricilerinin tahminine göre dünyada bir trilyondan (10¹²) fazla SQLite veritabanı kullanımda. Python'da <code>import sqlite3</code> yazarak sayfadaki kütüphane tablolarını gerçek motorda kurabilirsin.",
    },
  ],
  worked: {
    title: "Bir milyar satırda tek bir kayıt",
    prompt:
      "Bir tabloda N = 10⁹ (bir milyar) satır var; her satır ortalama 100 bayt. İndeks B+ağacının her düğümü 4 KB'lık (4096 bayt) bir disk sayfasına sığıyor; her girdi 8 baytlık anahtar + 8 baytlık işaretçi = 16 bayt. Ağacın yüksekliğini ve indeksli aramanın, indekssiz tam taramaya göre kaç kat az sayfa okuduğunu bul.",
    steps: [
      "Dallanmayı hesapla: bir düğüme 4096 B / 16 B = 256 girdi sığar. Sayfa başlığı için biraz yer ayıralım ve f = 250 alalım.",
      "Düğümler tam doluysa seviyeleri aşağıdan say: yapraklar 10⁹ / 250 = 4 × 10⁶ sayfa (yaklaşık 16 GB), üstünde 4 × 10⁶ / 250 = 16 000 sayfa, onun üstünde 64 sayfa ve tek bir kök. Dört seviye: h = ⌈log₂₅₀ 10⁹⌉ = ⌈9 / log₁₀ 250⌉ = ⌈9 / 2.40⌉ = ⌈3.75⌉ = 4.",
      "En kötü durumu da gör: düğümler yalnızca yarı doluysa dallanma 125 olur, log₁₂₅ 10⁹ = 9 / 2.10 ≈ 4.3 ve ağaç 5 seviyeye çıkar. Yükseklik doluluğa neredeyse duyarsızdır: 4 ya da 5.",
      "Tam taramayı hesapla: tablo 10⁹ × 100 B = 10¹¹ B = 100 GB; 4096 baytlık sayfalarla 10¹¹ / 4096 ≈ 2.4 × 10⁷ sayfa. İndeksli arama 4 indeks sayfası + satırın bulunduğu 1 tablo sayfası = 5 okuma yapar. Oran: 2.4 × 10⁷ / 5 ≈ 5 × 10⁶, yani yaklaşık beş milyon kat az okuma.",
      "Zamana çevir: yapraklar dışındaki üç seviye 1 + 64 + 16 000 ≈ 16 000 sayfa, yani yaklaşık 64 MB tutar ve rahatça bellekte kalır; diskten geriye bir yaprak ve bir tablo sayfası okumak kalır. Okuma başına 0.1 ms alan bir SSD'de bu 0.2 ms eder. Aynı diskte 100 GB'ı 1 GB/s hızla baştan sona taramak 100 s sürer.",
    ],
    result:
      "Bir milyar satırda bir kaydı bulmak 4 seviyelik ağaçla 5 sayfa okuması (üst seviyeler bellekteyse 2), tam tarama ise yaklaşık 24 milyon sayfa okuması ister. Sayfadaki minik ağaçla (yaprak başına 5 anahtar, h = 2) ilke aynıdır: yükseklik N ile değil, log N ile büyür; N bin katına çıksa ağaca bir iki seviye eklenir.",
  },
  misconceptions: [
    {
      myth: "NULL, sıfır ya da boş metin demektir.",
      truth:
        "NULL 'bilinmiyor ya da yok' demektir ve hiçbir değere eşit sayılmaz; <code>NULL = NULL</code> bile doğru çıkmaz, sonucu yine NULL'dır. Bu yüzden <code>WHERE iade = NULL</code> hiçbir satır getirmez, <code>IS NULL</code> gerekir. Toplama işlevleri de NULL'ı atlar: 10, NULL ve 20'nin AVG'si 10 değil 15'tir, çünkü ortalama iki değer üzerinden alınır.",
    },
    {
      myth: "Tablo ne kadar parçalanırsa o kadar iyidir.",
      truth:
        "Normalizasyon yazma anomalilerini önler ama soruları daha çok JOIN'e bağlar. Raporlama ve analiz sistemleri (veri ambarları) bilerek tekrar içeren, az JOIN'li tablolar kurar; buna denormalizasyon denir. Doğru düzey, verinin ne sıklıkla yazıldığına ve nasıl sorgulandığına bağlıdır.",
    },
    {
      myth: "İndeks her sorguyu hızlandırır.",
      truth:
        "İndeks yalnızca indekslenen sütun üzerinden süzen ya da sıralayan sorgulara yardım eder; her yeni satırda ağaç da güncellenir, bu yüzden yazma yavaşlar ve disk büyür. Tablonun yarısını döndürecek bir sorguda tam tarama indeksten hızlı olabilir; iyi bir sorgu planlayıcı bunu tahmin edip indeksi kullanmamayı seçer.",
    },
    {
      myth: "CAP: tutarlılık, erişilebilirlik ve bölünme toleransından istediğin ikisini seç.",
      truth:
        "Ağ bölünmesi seçilecek bir özellik değil, başa gelen bir olaydır; kablolar kopar. Gilbert ve Lynch'in ispatladığı şey şudur: mesajların kaybolabildiği bir ağda hiçbir sistem hem her isteğe cevap vermeyi hem de her okumanın en son yazılanı görmesini aynı anda garanti edemez. Yani seçim bölünme anında tutarlılık ile erişilebilirlik arasındadır; bölünme yokken ikisi birlikte sunulabilir. Brewer 2012'de 'üçten ikisi' sloganının yanıltıcı olduğunu kendisi yazdı. Buradaki tutarlılık, ACID'in C'siyle aynı şey de değildir.",
    },
  ],
  glossary: [
    { term: "Birincil anahtar (PK)", definition: "Bir tablodaki her satırı tek başına ve tekrarsız tanımlayan sütun ya da sütun kümesi." },
    { term: "Yabancı anahtar (FK)", definition: "Başka bir tablonun anahtarındaki bir değere işaret eden sütun; tablolar arasındaki ilişkiyi kurar." },
    { term: "JOIN", definition: "İki tablonun satırlarını bir koşula göre eşleyen işlem; INNER yalnızca eşleşenleri getirir, LEFT/RIGHT/FULL eşleşmeyenleri de NULL ile tamamlayarak getirir." },
    { term: "NULL", definition: "Bir hücrede değer bulunmadığını belirten işaret; sıfır ya da boş metin değildir ve IS NULL ile sorgulanır." },
    { term: "Fonksiyonel bağımlılık", definition: "X → Y: X sütunlarında aynı değeri taşıyan her iki satırın Y sütunlarında da aynı değeri taşıması." },
    { term: "İşlem (transaction)", definition: "Birden çok okuma ve yazmayı tek bir bölünmez birime saran yapı; ya tümü kalıcı olur (COMMIT) ya hiçbiri (ROLLBACK)." },
    { term: "İndeks", definition: "Bir sütunun sıralı, çoğunlukla B+ağacı biçiminde tutulan kopyası; aramayı tam taramadan logaritmik sayıda sayfa okumasına indirir." },
    { term: "Şema", definition: "Veritabanındaki tabloların, sütunların, tiplerin ve anahtar ilişkilerinin tanımı; sayfadaki sağ panel bir şema özetidir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede veritabanı birkaç SQL kalıbıdır; lisansta 'Veritabanı Sistemleri' dersi önce <strong>ilişkisel cebiri</strong> kurar: seçme (σ), izdüşüm (π) ve birleştirme (⋈) işlemleriyle her SQL sorgusu bir cebir ifadesine çevrilir. <strong>Sorgu iyileştirici</strong> bu ifadenin eşdeğer biçimleri arasından en ucuzunu arar; σ<sub>θ</sub>(A ⋈ B) yerine önce süzüp sonra birleştirmek aynı sonucu verir ama çok daha az satıra dokunur. Normalizasyon da kanıtlanabilir bir kurama dönüşür: Armstrong aksiyomlarıyla bir bağımlılık kümesinin kapanışı hesaplanır, aday anahtarlar bulunur ve bir tablonun bilgi kaybetmeden nasıl bölüneceği ispatlanır. Aynı derste B+ağacının yanına karma indeksler, günlük tabanlı kurtarma (ARIES algoritması) ve kilitlerle eşzamanlılık denetimi eklenir; sayfadaki ACID kartlarının her biri birkaç haftalık konudur.",
      "'Dağıtık Sistemler' dersi CAP'in ötesine geçer: Paxos ve Raft gibi uzlaşı algoritmaları, sunucuların bir azınlığı çökse bile kalanların tek bir kayıt sırası üzerinde anlaşmasını sağlar; Google'ın 2012'de tanıttığı Spanner, atom saatleri ve GPS ile eşgüdümlenen saatlerle dünya çapında tutarlı işlem yürütür. 'Veri Yapıları ve Algoritmalar' dersinde B-ağacının ekleme ve bölme işlemleri, yüksekliğin O(log N) olduğunun ispatıyla birlikte görülür. Çizge veritabanları, sütun temelli analitik depolar ve vektör indeksleri hep aynı soruyu sorar: veriyi hangi biçimde tutarsan hangi soru ucuzlar?",
    ],
    topics: ["İlişkisel cebir ve ilişkisel hesap", "Fonksiyonel bağımlılıklar ve Armstrong aksiyomları", "Sorgu iyileştirme ve maliyet modeli", "B+ağacı ve karma indeksler", "Eşzamanlılık denetimi ve kurtarma (ARIES)", "Dağıtık uzlaşı: Paxos, Raft"],
  },
  quiz: [
    {
      question: "Hiç kitap almamış öğrencilerin de listede NULL'lu bir satırla görünmesini istiyorsan ogrenciler ile odunc tablolarını hangi JOIN ile birleştirmelisin?",
      options: ["INNER JOIN", "LEFT JOIN (ogrenciler solda)", "CROSS JOIN", "RIGHT JOIN (ogrenciler solda)"],
      answer: 1,
      explanation: "LEFT JOIN soldaki tablonun bütün satırlarını tutar, eşleşme yoksa sağ sütunlara NULL yazar. INNER yalnızca eşleşenleri getirir, CROSS her çifti üretir; RIGHT ise sağdaki odunc tablosunun bütün satırlarını korur, kitap almayan öğrenciyi yine düşürür.",
    },
    {
      question: "Sayfadaki odunc tablosunda <code>SELECT ogrenci_id, COUNT(*) FROM odunc GROUP BY ogrenci_id</code> kaç satır döndürür?",
      options: ["6 satır", "5 satır", "3 satır", "2 satır"],
      answer: 1,
      explanation: "GROUP BY, farklı her ogrenci_id değeri için bir satır üretir; altı ödünç kaydında beş farklı öğrenci vardır. Ali (1) iki kayıtla COUNT(*) = 2 alır, diğerleri 1. Satır sayısı kayıt sayısı değil, grup sayısıdır.",
    },
    {
      question: "Dallanması 100 olan bir B+ağacında bir milyon anahtar 3 seviyeye sığıyor. Anahtar sayısı bin katına, bir milyara çıkarsa seviye sayısı ne olur?",
      options: ["3000 seviye", "30 seviye", "6 seviye", "5 seviye"],
      answer: 3,
      explanation: "100³ = 10⁶ olduğundan bir milyon anahtar 3 seviye ister. Bir milyar için log₁₀₀ 10⁹ = 9 / 2 = 4.5, yani 5 seviye: 100⁴ = 10⁸ yetmez, 100⁵ = 10¹⁰ yeter. Veri bin kat büyürken ağaç yalnızca iki seviye uzar; logaritmik büyümenin anlamı budur.",
    },
  ],
  next: [
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Dizi, bağlı liste, karma tablo, ikili arama ağacı ve yığın aynı sayfada; bir indeksin neden ağaç ya da karma tablo olarak kurulduğunu yapıları yan yana deneyerek gör." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "O(log n) ile O(n) arasındaki uçurumu büyüme sınıflarının grafiğinde izle; 'bir milyar satırda beş okuma' sözünün matematiği orada." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi (Graph Theory)", why: "Çizge veritabanlarının veri modeli: düğümler, kenarlar, BFS ile 'arkadaşın arkadaşı' taraması ve Dijkstra ile en kısa yol." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "Saldırı sözlüğündeki SQL enjeksiyonu kartı: kullanıcının yazdığı metin sorguya karışırsa veritabanı nasıl ele geçirilir; aynı sayfada özet fonksiyonları ve parola gücü var." },
  ],
  sources: [
    { title: "Wikipedia · Relational model", url: "https://en.wikipedia.org/wiki/Relational_model", note: "Codd'un modeli: ilişki, n'li, anahtarlar, ilişkisel işlemler ve fonksiyonel bağımlılıkların küme kuramı diliyle anlatımı (İngilizce)." },
    { title: "MIT OpenCourseWare · 6.830 Database Systems", url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/", note: "Lisans ve lisansüstü düzeyde veritabanı dersi: ders notları, okuma listesi, sınavlar; sorgu iyileştirme, indeksler, işlemler ve kurtarma." },
    { title: "Python belgeleri · sqlite3 modülü", url: "https://docs.python.org/3/library/sqlite3.html", note: "Baştaki kısa öğretici tablo kurmayı ve sorgulamayı gösterir; sayfadaki kütüphane tablolarını gerçek bir SQL motorunda denemek için." },
    { title: "Wikipedia · B+ tree", url: "https://en.wikipedia.org/wiki/B%2B_tree", note: "Yaprakları zincirli B-ağacı: yapı, taşan düğümün bölünmesi ve veritabanlarındaki kullanımı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
