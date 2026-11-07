window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["veritabanlari"] = {
  slug: "veritabanlari",
  title: "Veritabanları: Soruyu Sor, Yolu Bilme",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 35,
  tagline:
    "1970'te bir IBM matematikçisi, verinin diskte nerede durduğunu bilmeden soru sorulabileceğini iddia etti. Bugün cebindeki telefon bu fikrin onlarca kopyasını taşıyor: tablolar, anahtarlar, JOIN ve bir ağaç.",
  hook:
    "Telefonundaki mesajlar, fotoğraf albümünün etiketleri, tarayıcı geçmişin ve en sevdiğin oyunun kayıtları birer dosya değil; her biri küçük bir veritabanının içinde, satır satır duruyor. Peki bir kütüphaneci binlerce kitap arasından istediğini saniyede nasıl bulur ve 'kimde hangi kitap var?' sorusunu listeleri tek tek okumadan nasıl cevaplar?",
  bigIdea:
    "İlişkisel veritabanı, veriyi <strong>tablolara</strong> ve tablolar arasındaki <strong>anahtar</strong> bağlarına ayırır; sen yalnızca <em>ne</em> istediğini söylersin (SQL), <em>nasıl</em> bulunacağına sistem karar verir ve bunu bir B+ağacı ile logaritmik adımda yapar.",
  story: [
    "1960'larda bilgisayarlar veri saklıyordu ama veriyi bulmak programcının işiydi. Charles Bachman'ın General Electric'te 1963'te kurduğu IDS ve IBM'in Apollo programı için 1968'de hazırladığı IMS gibi sistemlerde kayıtlar birbirine fiziksel işaretçilerle bağlanırdı; bir soru sormak, bu işaretçileri adım adım izleyen bir program yazmak demekti. Veri diskte başka yere taşınırsa program bozulurdu. Haziran 1970'te IBM'in San Jose laboratuvarında çalışan İngiliz matematikçi <strong>Edgar F. Codd</strong>, <em>Communications of the ACM</em>'de on bir sayfalık bir makale yayımladı: veri yalnızca satır ve sütunlardan oluşan tablolarda tutulsun, tablolar arasındaki bağ işaretçiyle değil ortak değerlerle kurulsun ve kullanıcı yolu değil sonucu tarif etsin. IBM bu fikre soğuk baktı; IMS iyi para kazandırıyordu. Codd fikrini müşterilere anlatmaya başlayınca şirket, kendi araştırmacısının gölgesinde kalmamak için bir prototip kurmak zorunda kaldı.",
    "O prototip <strong>System R</strong> (1974–1979) oldu. İçinde Donald Chamberlin ve Raymond Boyce'un 1974'te tasarladığı sorgu dili SEQUEL vardı; İngiliz uçak şirketi Hawker Siddeley'in aynı adlı tescilli markası yüzünden adı kısaltılıp <strong>SQL</strong> yapıldı. Boyce, dilin ilk makalesinin çıktığı yıl, 27 yaşında beyin anevrizmasından öldü; adı bugün normalizasyonun en sıkı biçimi olan Boyce–Codd Normal Formu'nda yaşıyor. Aynı yıllarda Berkeley'de Michael Stonebraker ve Eugene Wong, Codd'un makalesini okuyup <em>Ingres</em>'i yazdı; onun devamı 1986'da Postgres, 1996'da PostgreSQL oldu. 1979'da Larry Ellison'ın küçük şirketi, IBM'den önce davranıp ilk ticari SQL veritabanını satışa çıkardı: Oracle. 1986'da SQL, ANSI standardı oldu. Bachman 1973'te, Codd 1981'de, Stonebraker 2014'te Turing Ödülü aldı: bir fikrin üç kuşağı.",
    "Tablolar yetmezdi; hızlı bulma ve güvenli yazma da gerekiyordu. 1970'te Boeing'de Rudolf Bayer ve Edward McCreight, diskteki bloklara uygun, her zaman dengeli kalan bir arama ağacı tasarladı ve 1972'de yayımladı: <strong>B-ağacı</strong>. Addaki B'nin neyi temsil ettiğini hiç açıklamadılar. Bu ağacın yaprakları birbirine zincirlenmiş sürümü olan B+ağacı, bugün neredeyse her veritabanının varsayılan indeksidir. Jim Gray ise 1970'lerde bir bankadaki havalenin 'ya tamamen olur ya hiç olmaz' garantisini, yani <strong>işlem</strong> (transaction) kavramını kurdu; 1983'te Theo Härder ve Andreas Reuter bu garantilere ACID adını verdi. Gray 1998'de Turing Ödülü aldı.",
    "2000'lerde web, bir makineye sığmayan veriyi getirdi. Google'ın Bigtable (2006) ve Amazon'un Dynamo (2007) makaleleri, veriyi yüzlerce sunucuya dağıtan, bunun karşılığında tabloların bazı garantilerinden vazgeçen sistemleri anlattı. Haziran 2009'da San Francisco'daki küçük bir buluşmada bu sistemlere <strong>NoSQL</strong> dendi. Eric Brewer'ın 2000'de ortaya attığı ve 2002'de Seth Gilbert ile Nancy Lynch'in ispatladığı CAP teoremi, bu vazgeçişin neden kaçınılmaz olduğunu söyler. Bugün ise iki dünya birbirine yaklaşıyor: PostgreSQL JSON belgeleri saklıyor, dağıtık sistemler SQL konuşuyor. Ve 2000'de D. Richard Hipp'in bir savaş gemisi yazılımı için yazdığı tek dosyalık <strong>SQLite</strong>, kamu malı olarak her telefona ve tarayıcıya girdi; sayfadaki kütüphane örneği aslında onun küçücük bir taklididir.",
  ],
  core: [
    {
      heading: "Tablo, anahtar, ilişki",
      body:
        "Sayfanın şema panelindeki üç tablo bütün modeli özetler. <strong>ogrenciler</strong> ve <strong>kitaplar</strong> birer varlık listesi; <strong>odunc</strong> ise ikisi arasındaki olayları tutar. Her tablonun bir <strong>birincil anahtarı</strong> (PK) vardır: her satırı tek başına tanımlayan sütun, burada <code>id</code>. odunc tablosundaki <code>ogrenci_id</code> ve <code>kitap_id</code> ise <strong>yabancı anahtar</strong>dır (FK): başka tablonun birincil anahtarına işaret eden değerler. Öğrencinin adı odunc tablosunda tekrar yazılmaz; yalnızca numarası yazılır. Ad değişirse tek yerde değişir. Codd'un asıl devrimi budur: bağ, diskteki bir adres değil, iki tabloda ortak bir değerdir.",
      formula: "ogrenciler.id = odunc.ogrenci_id",
      formulaNote: "Eşitlik bağı: soldaki birincil anahtar, sağdaki yabancı anahtar. JOIN bu eşitliği kullanır.",
    },
    {
      heading: "JOIN: süzülmüş kartezyen çarpım",
      body:
        "İki tabloyu birleştirmenin en kaba yolu her satırı her satırla eşlemektir; 3 satır ile 3 satırdan 9 satır çıkar. Sayfadaki <strong>CROSS JOIN</strong> sekmesi tam bunu gösterir. <strong>INNER JOIN</strong>, bu 9 satırdan yalnızca ON koşulunu sağlayanları tutar: id'si 2 ve 3 olan iki eşleşme. <strong>LEFT JOIN</strong> soldaki tablonun eşleşmeyen satırlarını da getirir ve boş kalan sütunlara <strong>NULL</strong> yazar; Ali kitap almamış olsa da listede kalır. RIGHT JOIN aynısını sağ tablo için, FULL OUTER JOIN ikisi için yapar. Soru 'kimler kitap aldı?' ise INNER, 'herkesi göster, almayanlar da görünsün' ise LEFT doğru araçtır.",
      formula: "|A × B| = |A|·|B| ;  A ⋈ B ⊆ A × B",
      formulaNote: "⋈ işareti JOIN demektir. Sayfada A ve B üçer satır: çarpım 9, INNER 2, LEFT 3, RIGHT 3, FULL 4 satır.",
    },
    {
      heading: "Normalizasyon: her gerçek tek yerde",
      body:
        "Bir sipariş tablosunda 'ürünler: Kalem, Defter, Silgi' yazarsan üçüncü ürünü silmek için metni ayrıştırman gerekir; müşterinin adını her siparişte tekrar yazarsan ad değiştiğinde yüz satırı düzeltirsin, birini unutursan iki Ali olur. Normalizasyon, bu <strong>anomalileri</strong> önlemek için tabloyu parçalama disiplinidir. Dayanağı <strong>fonksiyonel bağımlılık</strong>tır: 'müşteri_id biliniyorsa ad kesindir' gibi. 1NF her hücrede tek değer ister; 2NF bileşik anahtarın yalnızca parçasına bağlı sütunları ayırır; 3NF anahtar olmayan bir sütunun başka anahtar olmayan sütuna bağlı olmasını yasaklar. Bill Kent'e atfedilen özet: her sütun anahtara, bütün anahtara ve yalnızca anahtara bağlı olmalı.",
      formula: "X → Y  (X biliniyorsa Y tektir)",
      formulaNote: "3NF: anahtar olmayan hiçbir sütun, anahtar olmayan başka bir sütuna bağlı değil. Sayfadaki şehir → bölge bağımlılığı bu yüzden ayrı tabloya taşınır.",
    },
    {
      heading: "İşlem ve ACID: ya hep ya hiç",
      body:
        "Bir havale iki yazma işidir: Ayşe'den 100 lira düş, Ali'ye 100 lira ekle. İlkinden sonra elektrik kesilirse para buharlaşır. <strong>İşlem</strong> (transaction), birden çok yazmayı tek bir bölünmez adıma sarar: BEGIN ile başlar, COMMIT ile kalıcı olur, hata çıkarsa ROLLBACK ile hiç olmamış gibi geri alınır. Kalıcılık numarası <strong>önden yazma günlüğü</strong>dür (WAL): veritabanı tabloyu değiştirmeden önce 'ne yapacağını' sıralı bir günlük dosyasına yazar; çökme sonrası günlüğü okuyup yarım işi tamamlar ya da siler. Yalıtım ise aynı anda çalışan iki işlemin birbirinin yarım hâlini görmemesini sağlar; sayfadaki dört ACID kartı bu dört sözün açılımıdır.",
      formula: "BEGIN → yaz → yaz → COMMIT | ROLLBACK",
      formulaNote: "COMMIT'ten önce çöken bir işlem, günlük sayesinde hiç başlamamış sayılır; sonra çöken ise tamamlanmış sayılır.",
    },
    {
      heading: "İndeks ve B+ağacı: milyarı dört adımda bulmak",
      body:
        "Bir milyon satırlık tabloda <code>WHERE id = 4711</code> aramak, indeks yoksa bir milyon karşılaştırma demektir. <strong>İndeks</strong>, sütunun sıralı bir kopyasıdır ve ağaç biçiminde tutulur. Sayfadaki ağaçta üstteki teal kutu kök, alttaki mor kutular yapraklardır; kökteki anahtarlar yalnızca 'hangi yaprağa in' der, veri yapraklardadır. Kökten bir yaprağa inmek ağacın <strong>yüksekliği</strong> kadar adım alır ve yükseklik, her düğümün kaç çocuğu olduğunun (<em>f</em>, dallanma) logaritmasıyla büyür. Diskte bir düğüm bir sayfa (4–16 KB) olduğundan f yüzlerce olur; yapraklar birbirine zincirli olduğu için '1000 ile 2000 arası' gibi aralık sorguları da tek inişle başlar.",
      formula: "h ≈ log<sub>f</sub> N",
      formulaNote: "N anahtar sayısı, f dallanma. Sayfada yaprak başına 5 anahtar: 17 anahtar → 4 yaprak, 1 kök, h = 2.",
    },
  ],
  lab: {
    intro:
      "Sayfada üç canlı alan var. <strong>SQL Sorgu Playground</strong>: sorguyu kutuya yazıp <strong>▶ Çalıştır</strong> (ya da Ctrl+Enter) ile çalıştırırsın; dört hazır düğme (SELECT *, JOIN, GROUP BY, WHERE) örnek sorgu yükler; sonucun altında '… satır döndü' yazar. <strong>JOIN Türleri</strong> sekmeleri Venn şemasını ve sonuç tablosunu değiştirir. <strong>B+Tree</strong> alanında sayı kutusu (varsayılan 25) ile <strong>➕ Ekle</strong>, <strong>🔍 Ara</strong> ve <strong>↺ Sıfırla</strong> düğmeleri var; ağaçtaki anahtar yazıları bazı tarayıcılarda çok soluk çıkar, kutuların sayısını ve sarı vurguyu izle. Playground gerçek bir SQL motoru değil, birkaç kalıbı tanıyan küçük bir taklit; bunu bilerek deney yap, farklar bile ders olacak.",
    experiments: [
      {
        title: "JOIN kaç satır üretir, GROUP BY kimi sayar?",
        predict: "ogrenciler 5, odunc 6 satır. İkisini öğrenci numarası üzerinden INNER JOIN ile birleştirince kaç satır çıkar: 5 mi, 6 mı, 30 mu? Hangi öğrenci iki kez görünür?",
        do: "<strong>JOIN</strong> düğmesine bas; satır sayısını ve <code>ad</code> sütununu oku. Sonra kutuya <code>SELECT ogrenci_id, COUNT(*) FROM odunc GROUP BY ogrenci_id</code> yazıp çalıştır.",
        observe: "JOIN 6 satır döndürür: her ödünç kaydı bir satır, Ali Yılmaz iki kez görünür (1 ve 3 numaralı ödünçler). GROUP BY 5 satır verir: ogrenci_id 1 için COUNT(*) 2, diğer dördü 1. Dikkat: JOIN çıktısındaki <code>id</code> sütunu öğrencinin değil, ödünç kaydının numarasıdır.",
        explain: "INNER JOIN eşleşen her çift için bir satır üretir; Ali'nin iki ödüncü iki satır demektir. GROUP BY aynı değere sahip satırları tek satıra toplar, COUNT(*) kaç tane olduğunu söyler. İki tabloda aynı adlı sütun (<code>id</code>) olunca gerçek SQL ikisini de ayrı gösterir; sayfadaki taklit motor ikinci tabloyu birincinin üstüne yazdığından ödünç id'si kazanır. Gerçek sorguda <code>ogrenciler.id</code> diye belirtmen gerekir.",
      },
      {
        title: "NULL ile boş aynı şey değil",
        predict: "odunc tablosunda <code>iade</code> sütunu dolu olanlar kitabı geri getirmiş olanlardır. Hâlâ dışarıda olan kaç kitap var? 'Bilgisayar' bölümündeki öğrencileri soran bir sorgu kaç satır döndürmeli?",
        do: "<strong>WHERE</strong> düğmesine bas (<code>iade IS NULL</code>), satır sayısını not et. Sonra sorguyu <code>IS NOT NULL</code> yap. Ardından <code>SELECT * FROM ogrenciler WHERE sinif = 2</code> ve <code>SELECT * FROM ogrenciler WHERE bolum = 'Bilgisayar'</code> sorgularını dene.",
        observe: "IS NULL 3 satır (1, 3 ve 5 numaralı ödünçler), IS NOT NULL 3 satır. <code>sinif = 2</code> iki satır döndürür (Ali ve Mehmet). <code>bolum = 'Bilgisayar'</code> ise 0 satır döndürür, oysa tabloda iki Bilgisayar öğrencisi var.",
        explain: "NULL 'değer yok' demektir; sıfır ya da boş metin değildir ve <code>= NULL</code> ile aranmaz, <code>IS NULL</code> gerekir. Sıfır satırlık sonuç ise sayfanın küçük bir kusurundan gelir: motor sorgunun tamamını küçük harfe çeviriyor, 'Bilgisayar' tırnak içinde bile 'bilgisayar' oluyor ve tablodaki büyük harfli değerle eşleşmiyor. Gerçek veritabanlarında metin karşılaştırmasının büyük-küçük harfe duyarlı olup olmadığı <strong>harmanlama</strong> (collation) ayarına bağlıdır: PostgreSQL varsayılan olarak duyarlı, MySQL çoğu kurulumda duyarsızdır. 'Sorgum neden boş döndü?' sorusunun en sık cevabı budur.",
      },
      {
        title: "ORDER BY ve Türkçe İ'nin yeri",
        predict: "kitaplar tablosunu ada göre sıralarsan 'İşletim Sistemleri' nereye düşer: alfabede H ile K arasına mı, listenin en başına mı, en sonuna mı? Sayfa sayısına göre azalan sıralamada ilk kitap hangisi?",
        do: "<code>SELECT * FROM kitaplar ORDER BY ad</code> çalıştır, sırayı yaz. Sonra <code>SELECT * FROM kitaplar ORDER BY sayfa DESC</code> dene.",
        observe: "Ada göre: Algoritmalara Giriş, Derleyici Tasarımı, Veritabanı Sistemleri, Yapay Zeka ve en sonda İşletim Sistemleri. Sayfaya göre azalan: Cormen 1312, Russell 1152, Tanenbaum 1100, Aho 1009, Date 850.",
        explain: "Motor metinleri Unicode kod numarasına göre karşılaştırır: Latin büyük harfler 65–90 arasında, noktalı büyük İ ise 304'tür; bu yüzden bütün ASCII harflerden sonra gelir. Gerçek veritabanları bunun için dil kurallarını bilen harmanlama tabloları kullanır; PostgreSQL'de <code>ORDER BY ad COLLATE \"tr-TR-x-icu\"</code> gibi bir ek, İ'yi H'den sonra, J'den önce koyar. Sayılarda böyle bir sorun yoktur: 1312 her yerde 1152'den büyüktür.",
      },
      {
        title: "Ağacın yaprakları ne zaman çoğalır?",
        predict: "Sıfırlanmış ağaçta 17 anahtar var ve her yaprak en çok 5 anahtar alıyor. Kaç yaprak kutusu görmeyi bekliyorsun? Kaç anahtar daha eklersen beşinci yaprak belirir?",
        do: "<strong>↺ Sıfırla</strong>'ya bas, mor yaprak kutularını say. Kutuya 12 yazıp <strong>➕ Ekle</strong>; sonra sırayla 1, 2 ve 3'ü ekle. Her eklemeden sonra üstteki teal kutuyu ve yaprak sayısını izle. Son olarak 47 yazıp <strong>🔍 Ara</strong>, ardından 45 ile dene.",
        observe: "Başta 4 yaprak ve kökte 10 | 35 | 60 | 85. 12 eklenince hâlâ 4 yaprak ama kök 10 | 30 | 55 | 80 olur: 30 ilk yapraktan ikinciye kaymıştır. 1 ve 2 ile 20 anahtar, hâlâ 4 yaprak. 3 eklenince (21 anahtar) beşinci yaprak açılır ve üstte ikinci bir teal kutu belirir. 47 için 'bulunamadı', 45 için 'bulundu' mesajı çıkar ve anahtar 1.5 saniye sarı yanar.",
        explain: "Yaprak sayısı ⌈N/5⌉'tir: 17, 18 ve 20 için 4; 21 için 5. Kökteki anahtarlar her yaprağın ilk değeridir; arama 45 için 'kökte 35 ≤ 45 < 60, ikinci yaprağa in' der ve tek inişte bulur. Sayfa her eklemede ağacı sıfırdan kurduğundan anahtarlar yapraklar arasında kayar; gerçek B+ağacı yalnızca taşan yaprağı ikiye böler ve bu yüzden kalan yapraklar yarıdan fazla doludur. 21'de beliren ikinci teal kutu da bir sadeleştirme: gerçek ağaç bu iki kutunun üstüne yeni bir kök açar ve yükseklik 3 olur.",
      },
    ],
  },
  wow: [
    {
      title: "SQL'in adını bir uçak şirketi değiştirdi",
      body:
        "Chamberlin ve Boyce 1974'te dillerine 'Structured English Query Language' demişti: SEQUEL. Adın İngiliz uçak üreticisi Hawker Siddeley'in tescilli markası olduğu anlaşılınca sesli harfler atıldı ve SQL kaldı. Bugün hâlâ pek çok mühendis adı 'sequel' diye okur. Boyce o yıl 27 yaşında öldü; dilin yaygınlaşmasını hiç görmedi ama Boyce–Codd Normal Formu adını taşır.",
    },
    {
      title: "Ay'a giden roketin parça listesi",
      body:
        "IBM'in IMS veritabanı 1966–1968'de, Apollo programında Saturn V roketinin milyonlarca parçasının listesini tutmak için North American Aviation ile birlikte geliştirildi. Codd'un tablolarından iki yıl önce doğan bu hiyerarşik sistem hâlâ satılıyor ve bazı bankaların çekirdeğinde çalışıyor. Ay yolculuğu için yazılan yazılım, altmış yıl sonra para transferlerini işliyor.",
    },
    {
      title: "Dünyanın en çok kopyalanmış programı tek bir dosya",
      body:
        "SQLite, D. Richard Hipp'in 2000'de yazdığı, sunucusu olmayan, bütün veritabanını tek dosyada tutan bir kütüphanedir ve telif hakkı tümüyle kamu malına bırakılmıştır. Her Android ve iPhone'da, her büyük tarayıcıda ve çoğu masaüstü uygulamasında gömülüdür; geliştiricilerinin tahminine göre dünyada bir trilyondan fazla SQLite veritabanı aktif kullanımda. Python'da <code>import sqlite3</code> yazarak sayfadaki kütüphane sorgularını gerçek motorda deneyebilirsin.",
    },
  ],
  worked: {
    title: "Bir milyar satırda tek bir kayıt",
    prompt:
      "Bir tabloda N = 10⁹ (bir milyar) satır var. İndeks B+ağacının her düğümü 4 KB'lık bir disk sayfasına sığıyor; her girdi 8 baytlık anahtar + 8 baytlık işaretçi = 16 bayt. Ağacın yüksekliğini ve indeksli aramanın, indekssiz tam taramaya göre kaç kat az sayfa okuduğunu bul.",
    steps: [
      "Dallanmayı hesapla: bir düğüme 4096 / 16 = 256 girdi sığar; f ≈ 256 (gerçekte başlık bilgisi için biraz azı, 250 diyelim).",
      "Yüksekliği bul: h = log₂₅₀(10⁹) = 9 / log₁₀(250) = 9 / 2.40 ≈ 3.75 → tam sayıya yuvarla, h = 4 seviye. Yani kökten yaprağa 4 sayfa okuması.",
      "Tam taramayı hesapla: her satır 100 bayt olsa tablo 10⁹ × 100 B = 100 GB; 4 KB'lık sayfalarda 100 GB / 4 KB = 2.5 × 10⁷ sayfa okuması.",
      "Oranla: 2.5 × 10⁷ / 4 ≈ 6 milyon kat daha az okuma. Üst 3 seviye (yaklaşık 250² = 62 500 sayfa, 250 MB) bellekte önbellekte kalır; pratikte diskten tek sayfa okunur.",
      "Zamanla: SSD'de sayfa okuması yaklaşık 0.1 ms; indeksli arama milisaniyenin altında. 100 GB'ı 1 GB/s ile taramak 100 saniye sürer.",
    ],
    result:
      "Bir milyar satırlık tabloda bir kaydı bulmak 4 seviyelik ağaçla 4 sayfa okuması, önbellekle çoğunlukla 1 sayfa; tam tarama 25 milyon sayfa. Sayfadaki minik ağaç (f = 4–5, h = 2) ile aynı ilkedir: yükseklik N ile değil, log N ile büyür.",
  },
  misconceptions: [
    {
      myth: "NULL, sıfır ya da boş metin demektir.",
      truth:
        "NULL 'bilinmiyor ya da yok' demektir ve hiçbir değere eşit değildir; <code>NULL = NULL</code> bile doğru çıkmaz. Bu yüzden <code>WHERE iade = NULL</code> hiçbir satır getirmez, <code>IS NULL</code> gerekir. Sayfadaki WHERE düğmesi bunu doğru yazar; ortalama alırken NULL'ların sayılmadığını da unutma.",
    },
    {
      myth: "Tablo ne kadar parçalanırsa o kadar iyidir.",
      truth:
        "Normalizasyon yazma anomalilerini önler ama her soruyu daha çok JOIN'e mahkûm eder. Raporlama ve analiz sistemleri (veri ambarları) bilerek tekrar içeren, az JOIN'li tablolar kurar; buna denormalizasyon denir. Doğru düzey, verinin ne sıklıkla yazıldığına ve nasıl sorgulandığına bağlıdır.",
    },
    {
      myth: "İndeks her sorguyu hızlandırır.",
      truth:
        "İndeks yalnızca indekslenen sütun üzerinden süzen ya da sıralayan sorgulara yardım eder; her yeni satırda ağaç da güncellenmelidir, bu yüzden yazma yavaşlar ve disk büyür. Tablonun yarısını döndürecek bir sorguda tam tarama indeksten hızlı olabilir; iyi bir sorgu planlayıcı bunu tahmin edip indeksi kullanmamayı seçer.",
    },
    {
      myth: "CAP: Tutarlılık, erişilebilirlik ve bölünme toleransından istediğin ikisini seç.",
      truth:
        "Ağ bölünmesi tercih değil, gerçektir; kablolar kopar. Teoremin asıl söylediği, bölünme anında tutarlılık ile erişilebilirlik arasında seçim yapmak zorunda kalındığıdır. Brewer bu sloganın yanıltıcı olduğunu 2012'de kendisi yazdı. Bölünme yokken iyi bir sistem ikisini de sunar.",
    },
  ],
  glossary: [
    { term: "Birincil anahtar (PK)", definition: "Bir tablodaki her satırı tek başına ve tekrarsız tanımlayan sütun ya da sütun kümesi." },
    { term: "Yabancı anahtar (FK)", definition: "Başka bir tablonun birincil anahtarına işaret eden sütun; tablolar arasındaki ilişkiyi kurar." },
    { term: "JOIN", definition: "İki tabloyu ortak bir koşula göre satır satır eşleyen işlem; INNER yalnızca eşleşenleri, LEFT/RIGHT/FULL eşleşmeyenleri NULL ile tamamlayarak getirir." },
    { term: "NULL", definition: "Bir hücrede değer bulunmadığını belirten işaret; sıfır ya da boş metin değildir ve yalnızca IS NULL ile sorgulanır." },
    { term: "İşlem (transaction)", definition: "Birden çok okuma-yazmayı tek bir bölünmez birime saran yapı; ya tümü kalıcı olur (COMMIT) ya hiçbiri (ROLLBACK)." },
    { term: "İndeks", definition: "Bir sütunun sıralı ve ağaç biçiminde tutulan kopyası; aramayı tam taramadan logaritmik adıma indirir." },
    { term: "Normalizasyon", definition: "Tekrar ve anomalileri önlemek için tabloları fonksiyonel bağımlılıklara göre parçalama disiplini (1NF, 2NF, 3NF, BCNF)." },
    { term: "Şema", definition: "Veritabanındaki tabloların, sütunların, tiplerin ve anahtar ilişkilerinin tanımı; sayfadaki sağ panel bir şema özetidir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede veritabanı birkaç SQL kalıbıdır; lisansta önce <strong>ilişkisel cebir</strong> gelir: seçme (σ), izdüşüm (π) ve birleştirme (⋈) işlemleriyle her SQL sorgusu bir cebir ifadesine çevrilir ve <strong>sorgu iyileştirici</strong> bu ifadenin eşdeğer biçimleri arasından en ucuzunu seçer. 'WHERE'i JOIN'den önce uygula', 'küçük tabloyu belleğe al' gibi kurallar maliyet tahminleriyle yarışır. Aynı derste B+ağacının yanına karma indeksler, günlük tabanlı kurtarma (ARIES algoritması) ve kilitlerle eşzamanlılık denetimi eklenir; sayfadaki ACID kartlarının her biri bir hafta ders olur.",
      "Dağıtık sistemler dersi ise CAP'in ötesine geçer: Paxos ve Raft gibi uzlaşı algoritmaları, birkaç sunucudan biri çökse bile tek bir doğru üzerinde anlaşmayı sağlar; Google'ın Spanner'ı (2012) atom saatleriyle dünya çapında tutarlı işlem yapar. Veri modelleme, çizge veritabanları, sütun temelli analitik depolar ve vektör indeksleri (yapay zekâ aramalarının altındaki yapı) hep aynı soruyu sorar: hangi veriyi hangi biçimde tutarsan hangi soru ucuzlar?",
    ],
    topics: ["İlişkisel cebir", "Sorgu iyileştirme ve maliyet modeli", "B+ağacı ve karma indeksler", "Eşzamanlılık denetimi ve kurtarma (ARIES)", "Dağıtık uzlaşı: Paxos, Raft", "Veri ambarları ve sütun depoları"],
  },
  quiz: [
    {
      question: "Hiç kitap almamış öğrencilerin de listede NULL'lu bir satırla görünmesini istiyorsan ogrenciler ile odunc tablolarını hangi JOIN ile birleştirmelisin?",
      options: ["INNER JOIN", "LEFT JOIN (ogrenciler solda)", "CROSS JOIN", "GROUP BY"],
      answer: 1,
      explanation: "LEFT JOIN soldaki tablonun bütün satırlarını tutar, eşleşme yoksa sağ sütunlara NULL yazar. INNER yalnızca eşleşenleri getirir, CROSS her çifti üretir, GROUP BY bir birleştirme değil toplama işlemidir.",
    },
    {
      question: "Sayfadaki odunc tablosunda <code>SELECT ogrenci_id, COUNT(*) FROM odunc GROUP BY ogrenci_id</code> kaç satır döndürür?",
      options: ["6 satır", "5 satır", "3 satır", "2 satır"],
      answer: 1,
      explanation: "GROUP BY, farklı her ogrenci_id değeri için bir satır üretir; altı ödünç kaydında beş farklı öğrenci vardır. Ali (1) iki kayıtla COUNT(*) = 2 alır, diğerleri 1. Satır sayısı kayıt sayısı değil, grup sayısıdır.",
    },
    {
      question: "Her düğümü 100 çocuk taşıyan bir B+ağacında bir milyon anahtar için yükseklik yaklaşık kaçtır?",
      options: ["Yaklaşık 1000", "Yaklaşık 100", "Yaklaşık 3", "Yaklaşık 20"],
      answer: 2,
      explanation: "100³ = 10⁶ olduğundan log₁₀₀(10⁶) = 3. Yükseklik anahtar sayısıyla değil, logaritmasıyla büyür; 20 ikili aramanın adım sayısıdır (2²⁰ ≈ 10⁶), disk için fazla derindir.",
    },
  ],
  next: [
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "B+ağacının ailesi: ikili arama ağaçları, karma tablolar ve bağlı listeler; indeksin neden ağaç olduğunu buradan gör." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı", why: "O(log n) ile O(n) arasındaki uçurum; bir milyar satırda dört adım sözünün matematiği." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi", why: "Neo4j gibi çizge veritabanlarının temeli: düğümler, kenarlar ve 'arkadaşın arkadaşı' sorguları." },
    { href: "siber-guvenlik.html", title: "Siber Güvenlik", why: "SQL enjeksiyonu: kullanıcının yazdığı metnin sorguya karışmasıyla veritabanı nasıl ele geçirilir, nasıl korunur." },
  ],
  sources: [
    { title: "Wikipedia · Relational model", url: "https://en.wikipedia.org/wiki/Relational_model", note: "Codd'un 1970 modeli: ilişki, tuple, anahtar ve ilişkisel cebir (İngilizce)." },
    { title: "MIT OpenCourseWare · 6.830 Database Systems", url: "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/", note: "Lisans düzeyinde veritabanı dersi: sorgu iyileştirme, indeksler, işlemler ve kurtarma; okuma listesi açık." },
    { title: "Python belgeleri · sqlite3 modülü", url: "https://docs.python.org/3/library/sqlite3.html", note: "Sayfadaki kütüphane tablolarını birkaç satır Python ile gerçek bir SQL motorunda kurup sorgulamak için." },
    { title: "Wikipedia · B+ tree", url: "https://en.wikipedia.org/wiki/B%2B_tree", note: "Yaprakları zincirli B-ağacı: yapı, ekleme-bölme işlemi ve veritabanlarındaki kullanımı." },
  ],
  revision: "Ekim 2026",
};
