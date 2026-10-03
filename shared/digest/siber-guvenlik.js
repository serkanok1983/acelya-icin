window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["siber-guvenlik"] = {
  slug: "siber-guvenlik",
  title: "Siber Güvenlik: Tersi Zor Olan İşlemler",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 35,
  tagline:
    "Herkesin dinlediği bir hatta iki yabancı nasıl ortak bir sır kurar? Parola gücü neden bitle ölçülür, bir noktanın değişmesi özetin yarısını neden alt üst eder? Hepsi tek fikre dayanır: bir yönde kolay, tersi zor işlem.",
  hook:
    "1976'da iki genç araştırmacı, 'kilidi herkesin önünde kurabilirsiniz, yine de kimse açamaz' diyen bir makale yayımladı. Şifrecilerin iki bin yıllık kuralı yıkılmıştı: sırrı paylaşmak için önce gizlice buluşmak gerekmiyordu. Bu sayfada Alice ile Bob'un, Eve'in gözü önünde yaptığı şey tam olarak bu; ve p = 23 ile sen de Eve'i kâğıt üstünde yenebilirsin.",
  bigIdea:
    "Modern güvenlik, bir yönde kolay ama tersi pratikte imkânsız işlemlere yaslanır: üs almak kolay, <strong>ayrık logaritma</strong> zor; özet almak kolay, özetten metne dönmek imkânsız. Gizliliği algoritma değil, <em>anahtar</em> taşır.",
  story: [
    "Suetonius'un yazdığına göre Julius Caesar özel mektuplarında her harfi alfabede üç ileri kaydırıyordu; sayfadaki <strong>Sezar</strong> sekmesi bu iki bin yıllık numaranın kendisidir. Kırılması da eskidir: 9. yüzyılda Bağdat'ta El-Kindî, bir dilde harflerin belli sıklıkta geçtiğini ve şifreli metinde en sık görünen işaretin büyük olasılıkla en sık harf olduğunu yazdı. <strong>Sıklık analizi</strong> denen bu fikir, tek alfabeli bütün şifreleri bir öğleden sonra işine çevirir. 1553'te Giovan Battista Bellaso bir anahtar kelimeyle her harfe farklı kaydırma uygulayan yöntemi yayımladı; yöntem sonradan yanlışlıkla Blaise de Vigenère'in adıyla anıldı ve üç yüzyıl boyunca Fransızlar ona <em>le chiffre indéchiffrable</em>, çözülemez şifre dediler. Charles Babbage onu 1854 dolayında kırdı ama yayımlamadı; Friedrich Kasiski 1863'te aynı yöntemi bastı: tekrar eden harf öbekleri arasındaki uzaklıklar anahtarın uzunluğunu ele verir, gerisi yine sıklık analizidir.",
    "1883'te Auguste Kerckhoffs, bugün hâlâ ilk ders olan ilkeyi yazdı: bir sistem, anahtar dışında her şeyi düşman bilse bile güvenli kalmalıdır. 1917'de Gilbert Vernam, telgraf bantlarını rastgele bir anahtar bandıyla XOR'layan bir makine yaptı. 1949'da Claude Shannon bu makinenin neden özel olduğunu kanıtladı: anahtar gerçekten rastgeleyse, mesaj kadar uzunsa ve yalnızca bir kez kullanılırsa şifreli metin mesaj hakkında <strong>hiçbir</strong> bilgi taşımaz. Bu 'tek kullanımlık şerit', matematiksel olarak kırılamaz tek şifredir; sorunu pratiktir: her mesaj için mesaj kadar uzun bir sır dağıtmak gerekir. Shannon'ın bir yıl önce tanımladığı <em>entropi</em> ise sayfadaki parola ölçerin birimi oldu.",
    "Anahtar dağıtma sorunu 1976'da çözüldü. Whitfield Diffie ve Martin Hellman, Ralph Merkle'ın fikirlerinden de yararlanarak 'New Directions in Cryptography' makalesini yayımladı: iki taraf herkese açık bir hatta birkaç sayı alışverişi yapar ve sonunda yalnızca ikisinin bildiği bir sayıya ulaşır. Ertesi yıl Rivest, Shamir ve Adleman asal sayılara dayanan RSA'yı buldu; e-ticaret, bankacılık ve bugün her tarayıcıdaki kilit simgesi bu iki fikrin üstünde durur. 1997'de İngiliz istihbarat kurumu GCHQ'nun yıllar önce aynı sonuçlara gizlice ulaştığı açıklandı; bilim tarihinde bazen keşif iki kez yapılır ve biri sessiz kalır.",
    "Güvenlik yalnızca matematik değildir. 2 Kasım 1988 gecesi Cornell'de bir yüksek lisans öğrencisinin yazdığı kendini kopyalayan program, internetteki tahminen altı bin bilgisayarı saatler içinde kilitledi; o günkü ağın yaklaşık onda biri. Program bir <strong>bellek taşması</strong> ve zayıf parolalar kullanıyordu; yani sayfanın alt bölümündeki sözlükte adı geçen saldırıların çoğu otuz yıldan eskidir. Bugünün standartları da bu derslerle doğdu: AES, 2000'de NIST'in herkese açık bir yarışmasında seçilen Rijndael algoritmasıdır; SHA-256 ise 2001'de yayımlanan özet ailesinin üyesi. Sayfada Sezar'dan SHA-256'ya kadar bu zincirin her halkasını elinle kurcalayabilirsin.",
  ],
  core: [
    {
      heading: "Entropi: parolayı bitle ölçmek",
      body:
        "Bir parolanın gücü uzunluğu değil, saldırganın denemesi gereken olasılık sayısıdır. L karakterli ve her karakteri N seçenekten gelen bir parola N<sup>L</sup> olasılık demektir; bunun 2 tabanında logaritması <strong>entropi</strong>dir ve birimi bittir. Her ek bit olasılıkları ikiye katlar: 10 bit fazlası bin kat, 20 bit fazlası milyon kat daha uzun arama. Sayfa karakter kümesini dört sınıftan toplar: küçük harf 26, büyük harf 26, rakam 10, geri kalan her şey 32; en fazla 94 sembol. Küçük harf başına 4.70 bit, dört sınıflı karakter başına 6.55 bit kazanırsın. Kırma süresi saniyede bir milyar tahmin varsayımıyla hesaplanır. Dikkat: formül parolanın <em>rastgele</em> seçildiğini varsayar; 'P@ssw0rd' 52 bit görünür ama her sözlük saldırısının ilk sayfasındadır.",
      formula: "H = L · log<sub>2</sub> N,   t ≈ 2<sup>H</sup> / 10<sup>9</sup> s",
      formulaNote: "Sayfa tüm uzayı tarama süresini verir; ortalama saldırgan yarı yolda bulur, beklenen süre bunun yarısıdır.",
    },
    {
      heading: "Yerine koyma: Sezar'dan Vigenère'e",
      body:
        "Sezar şifresi her harfi sabit bir k kadar kaydırır. Sayfa 29 harfli Türk alfabesini kullanır; k = 0 anlamsız olduğundan yalnızca 28 farklı anahtar vardır ve hepsini denemek birkaç saniyedir. Denemeden de kırılır: Türkçede en sık harf A'dır, şifreli metindeki en sık harf A'nın kaydırılmış hâli olmalıdır. <strong>Vigenère</strong> bunu zorlaştırır: anahtar bir kelimedir ve i'inci harf, anahtarın (i mod n)'inci harfi kadar kaydırılır. Aynı düz harf farklı yerlerde farklı şifreli harfe gider, sıklıklar düzleşir. Yine de anahtar her n harfte bir tekrarlar; Kasiski'nin gösterdiği gibi bu periyodu bulan kişi metni n tane Sezar şifresine ayırır ve her birini ayrı ayrı sıklıkla kırar. Anahtar ne kadar uzunsa saldırı o kadar zorlaşır; anahtar mesaj kadar uzun ve rastgeleyse Shannon'ın kırılamaz şeridine varırsın.",
      formula: "c<sub>i</sub> = (m<sub>i</sub> + k<sub>i mod n</sub>) mod 29",
      formulaNote: "m harfin alfabedeki sırası (A = 0), n anahtar uzunluğu. Çözme için toplama yerine çıkarma.",
    },
    {
      heading: "XOR: kendi tersi olan işlem",
      body:
        "Bilgisayar harf değil bit kaydırır. İki bitin <strong>XOR</strong>'u, bitler farklıysa 1, aynıysa 0'dır. Bu işlemin büyülü özelliği kendi tersi olmasıdır: bir sayıyı aynı anahtarla iki kez XOR'larsan başa dönersin. Şifrele ve çöz aynı işlemdir, bu yüzden sayfadaki XOR sekmesinde 'Çöz' düğmesi 'Şifrele' ile aynı sonucu verir. XOR, anahtarın her bitini metnin bir bitine 'çevir/çevirme' emri olarak uygular; anahtar rastgeleyse çıktı da rastgele görünür. Büyük şifreler bunu yapı taşı olarak kullanır: AES-256, 14 turda yerine koyma, karıştırma ve anahtarla XOR adımlarını üst üste yığar. Küçük bir oyun: ASCII'de büyük harfle küçük harf yalnızca 32 değerindeki bit ile ayrılır (A = 65, a = 97). Anahtar olarak tek bir boşluk (kod 32) yazarsan metnin bütün harflerinin büyük-küçüğü yer değiştirir.",
      formula: "c = m ⊕ k,   (m ⊕ k) ⊕ k = m",
      formulaNote: "⊕: bit bit XOR. Sayfa her karakterin Unicode kodunu anahtarın sıradaki karakter koduyla XOR'lar; anahtar biter, baştan döner.",
    },
    {
      heading: "Özet fonksiyonu: tek yönlü parmak izi",
      body:
        "SHA-256 bir harfi de bin sayfalık kitabı da 256 bitlik (32 bayt, 64 onaltılık rakam) bir özete sıkıştırır. İyi bir <strong>kriptografik özet</strong> üç söz verir: özetten girdiyi bulamazsın, aynı özeti veren ikinci bir girdi bulamazsın ve girdideki en küçük değişiklik özetin ortalama yarısını, yani 128 bitini çevirir. Bu son özelliğe <em>çığ etkisi</em> denir. Sayfadaki karşılaştırma baytları renklendirir: bir baytın sekiz bitinin de tesadüfen aynı kalma olasılığı 1/256 olduğundan 32 baytın neredeyse hepsi değişir; yüzde 50 kuralı bit düzeyinde geçerlidir, bayt düzeyinde yüzde 100'e yakın görmek normaldir. Siteler parolanı değil özetini saklar; ama hızlı bir özet GPU'da saniyede milyarlarca denenebildiği için parola için yavaş ve tuzlu özetler (bcrypt, Argon2) kullanılır.",
      formula: "h = SHA-256(m), |h| = 256 bit;  çakışma için ≈ 2<sup>128</sup> deneme",
      formulaNote: "2¹²⁸ ≈ 3.4×10³⁸: saniyede milyar denemeyle 10²² yıl. Doğum günü paradoksu yüzünden 2²⁵⁶ değil, karekökü.",
    },
    {
      heading: "Diffie–Hellman: açık kanalda ortak sır",
      body:
        "Herkes p asalını ve g tabanını bilir. Alice gizli bir a seçer ve A = g<sup>a</sup> mod p'yi açıkça gönderir; Bob gizli b ile B = g<sup>b</sup> mod p'yi. Alice B<sup>a</sup>, Bob A<sup>b</sup> hesaplar; ikisi de g<sup>ab</sup> mod p'ye varır çünkü üsler yer değiştirebilir. Eve hatta p, g, A ve B'yi görür ama a'yı bulmak için 'g'nin kaçıncı kuvveti A verir' sorusunu, yani <strong>ayrık logaritmayı</strong> çözmelidir. Mod alma işlemi kuvvetleri karıştırdığı için büyümeyi izleyerek tahmin yürütemezsin; p = 23 iken 22 deneme yeter ama p 2048 bitlik bir sayıyken bilinen en iyi algoritmalar evrenin yaşından uzun sürer. Sayfa p'yi küçük tutar ki Eve'in işini elle yapabilesin. Bir ayrıntı: 'Yeni Sayılar' g'yi rastgele seçer; g her zaman üreteç olmaz, o zaman olası ortak anahtarlar p−1'den az olur, gerçek sistemlerde bu özellikle kontrol edilir.",
      formula: "A = g<sup>a</sup> mod p,  B = g<sup>b</sup> mod p,  K = B<sup>a</sup> = A<sup>b</sup> = g<sup>ab</sup> mod p",
      formulaNote: "Üs alma hızlıdır: kare al, gerekirse çarp, her adımda mod al. 2048 bitlik üs için yaklaşık 2048 kare alma yeter.",
    },
  ],
  lab: {
    intro:
      "Sayfada beş araç var. <strong>Parola Gücü</strong> alanına yazdıkça entropi ve kırma süresi anında güncellenir. <strong>Kriptografi Simülatörü</strong>nde XOR, Sezar, Vigenère ve Atbash sekmeleri, bir düz metin kutusu ve bir anahtar kutusu bulunur; sonuç sağdaki kutuya düşer. <strong>Hash</strong> panelindeki iki metin kutusunun SHA-256 özetleri bayt bayt karşılaştırılır. <strong>Diffie-Hellman</strong> panelinde '▶ Anahtar Değişimini Başlat' ve '🎲 Yeni Sayılar' düğmeleri vardır. <strong>Güvenlik duvarı</strong> ise rastgele paket üretir: 12 olası porttan üçü (22, 25, 3306) kırmızıdır, uzun vadede kayıtların yaklaşık dörtte biri RED olur; alttaki açıklama satırı 25 ve 53 kurallarını yazmaz, kural çipleri yazar.",
    experiments: [
      {
        title: "Uzunluk mu, karmaşıklık mı?",
        predict:
          "'Ac3ly@!' (7 karakter, dört sınıf) ile 'acelyaninyeri' (13 küçük harf) karşılaştırılıyor. Hangisinin entropisi yüksek? Kırma süreleri arasında kaç kat fark bekliyorsun?",
        do:
          "Parola alanına önce Ac3ly@! yaz; Karakter Seti, Entropi ve kırma süresi kutularını not et. Alanı temizleyip acelyaninyeri yaz ve aynı üç değeri oku.",
        observe:
          "Ac3ly@!: 94 sembol, 45.9 bit, 'Zayıf', yaklaşık 18.0 saat. acelyaninyeri: 26 sembol, 61.1 bit, 'Orta', yaklaşık '1 yüzyıl' (sayfa 79 yılı yüzyıla yuvarlar). Olası kombinasyon 6.48×10¹³'ten 2.48×10¹⁸'e çıkar.",
        explain:
          "Her küçük harf 4.70 bit, her dört sınıflı karakter 6.55 bit ekler; altı fazla karakter, karakter başına kazanılan 1.85 biti fazlasıyla aşar. Aradaki 15.2 bit, 2¹⁵·² ≈ 38 bin kat demektir. Uzunluk ucuz ve güçlüdür; NIST'in güncel kılavuzu da uzun parola cümlelerini zorunlu sembol kurallarına tercih eder.",
      },
      {
        title: "Anahtar kendini ele veriyor",
        predict:
          "Vigenère sekmesinde anahtar SECRET iken düz metin kutusuna 18 tane A yazarsan sağ kutuda ne belirir? Sonra anahtarı tek bir boşluk yapıp XOR sekmesinde 'Merhaba Dünya!' ile ne olacağını tahmin et.",
        do:
          "Kriptografi Simülatörü'nde Vigenère sekmesine geç, anahtar SECRET kalsın, düz metne AAAAAAAAAAAAAAAAAA yaz. Ardından düz metni 'Merhaba Dünya!' yap. Son olarak XOR sekmesine geç ve anahtar kutusunu silip yalnızca bir boşluk bırak.",
        observe:
          "Vigenère: SECRETSECRETSECRET; anahtar üç kez, olduğu gibi. 'Merhaba Dünya!' ise 'Gişaeus Hygçt!' olur, boşluk ve ünlem dokunulmadan kalır. XOR'da boşluk anahtarıyla metin 'mERHABA' ve 'dÜNYA'ya dönüşür; aradaki boşluk ile ünlem görünmez denetim karakterleri olur.",
        explain:
          "A alfabede 0'ıncı harftir; 0 + k = k olduğundan şifreli harf anahtar harfinin ta kendisidir. Bilinen düz metinle anahtarı çıkarma fikri, Enigma'yı kıran 'crib' yönteminin çekirdeğidir. Vigenère'in altı harfte bir tekrarlayan deseni ise Kasiski'nin saldırısına kapı açar. XOR'da 32 değerindeki bit, ASCII'de büyük-küçük harf farkıdır; boşluk (32) tam o biti çevirir. ü ve Ü de Latin-1'de aynı 32 farkla ayrılır.",
      },
      {
        title: "Bir nokta, bütün özet",
        predict:
          "Varsayılan metinler 'Merhaba Dünya!' ve 'Merhaba Dünya.' yalnızca son karakterde ayrılır. 32 bayttan kaçının değişeceğini düşünüyorsun? Açıklama 'ideal yüzde 50' diyor.",
        do:
          "Hash panelinde önce varsayılan sonucu oku. Sonra Metin 2'yi Metin 1 ile birebir aynı yap ('Merhaba Dünya!'). Son olarak Metin 1'e Acelya, Metin 2'ye acelya yaz.",
        observe:
          "Varsayılanda 32 / 32 bayt değişti (%100.0) yazar; özetler db5db03b… ve 1f5c371c… ile başlar. Metinler eşitlenince 0 / 32 (%0.0) ve iki özet aynıdır. Acelya/acelya çiftinde yine 32 / 32: tek harfin büyüklüğü bile özeti tanınmaz kılar.",
        explain:
          "Çığ etkisi bitlerin yarısını çevirir; varsayılan çiftte 256 bitin 134'ü (%52.3) değişir. Ama sayfa baytları karşılaştırır ve bir baytın sekiz bitinin de şans eseri aynı kalma olasılığı 1/256'dır; 32 bayttan beklenen 31.9'u değişir. Yüzde 100 görmek yanlış değil, ölçeğin bayt olması. Özetin geri döndürülemez olması ve küçük farkı büyütmesi, dosya bütünlük kontrolünün ve parola saklamanın temelidir.",
      },
      {
        title: "Eve'i kâğıtla yen",
        predict:
          "p = 23, g = 5, Alice'in gizlisi 6, Bob'unki 15. Alice'in açık değeri 5⁶ mod 23 kaçtır? Ortak anahtar her ikisinde de aynı çıkacak mı? Eve, 5'in kuvvetlerini sırayla deneyerek Alice'in gizlisini kaç adımda bulur?",
        do:
          "Sayfayı yeni açtıysan değerler bunlardır; değilse yenileyip '▶ Anahtar Değişimini Başlat'a bas. Alice ve Bob'un Açık, Eve'in 'Gördükleri' ve 0.6 saniye sonra beliren Ortak değerlerini oku. Sonra kâğıda 5¹, 5², 5³… mod 23 yaz, 8'e ulaşana kadar.",
        observe:
          "Alice açık 8, Bob açık 19, Eve 'A=8, B=19' görür, iki Ortak kutusu da 2 olur ve yeşile döner. Kuvvetler: 5, 2, 10, 4, 20, 8; altıncı adımda 8 çıkar, yani a = 6. Aynı diziyi 15'inci adıma kadar sürdürürsen 19'u görürsün: Bob'un gizlisi de elde.",
        explain:
          "İki taraf aynı sayıya varır çünkü (g^b)^a = (g^a)^b. Eve'in yaptığı ayrık logaritmadır ve p = 23 iken en fazla 22 deneme ister. p 617 basamaklı (2048 bit) olduğunda deneme sayısı evrendeki atom sayısını aşar; bilinen en akıllı algoritmalar bile pratik sınırın dışındadır. 'Yeni Sayılar'a basıp birkaç tur daha dene: g bazen üreteç olmaz ve olası ortak anahtar sayısı küçülür.",
      },
    ],
  },
  wow: [
    {
      title: "Gizli servis yıllar önce bulmuştu",
      body:
        "İngiliz istihbarat kurumu GCHQ'da James Ellis 1970'te 'gizli olmayan şifreleme' fikrini, Clifford Cocks 1973'te RSA ile aynı yöntemi, Malcolm Williamson 1974'te Diffie–Hellman değişimini buldu. Hepsi devlet sırrı olarak kaldı; dünya aynı fikirleri 1976–77'de yeniden keşfetti ve isimleri aldı. GCHQ belgeleri ancak Aralık 1997'de açıkladı; Ellis açıklamadan haftalar önce ölmüştü.",
    },
    {
      title: "İki PDF, aynı parmak izi",
      body:
        "Şubat 2017'de Google ve Amsterdam'daki CWI araştırmacıları içerikleri farklı ama SHA-1 özetleri birebir aynı iki PDF yayımladı: ilk gerçek SHA-1 çakışması. Hesap, yaklaşık 2⁶³ (dokuz milyar milyar) SHA-1 işlemi gerektirdi; tek işlemcide 6.500 yıl, tek GPU'da 110 yıl. SHA-1 o gün tarayıcılardan ve sertifikalardan emekli edildi. Sayfanın kullandığı SHA-256 için böyle bir çakışma bilinmiyor.",
    },
    {
      title: "Altı bin bilgisayar, bir öğrenci",
      body:
        "2 Kasım 1988'de Cornell öğrencisi Robert Tappan Morris'in internete saldığı solucan, bellek taşması açığı ve zayıf parolalarla tahminen altı bin makineyi, o günkü ağın onda birini durdurdu. Morris, 1986 tarihli Bilgisayar Dolandırıcılığı ve Kötüye Kullanım Yasası'ndan mahkûm edilen ilk kişi oldu: üç yıl denetimli serbestlik, 400 saat kamu hizmeti ve 10.050 dolar ceza. Aynı ay Carnegie Mellon'da dünyanın ilk acil müdahale merkezi CERT kuruldu.",
    },
  ],
  worked: {
    title: "Elle Diffie–Hellman ve Eve'in masası",
    prompt:
      "p = 23, g = 5, Alice'in gizlisi a = 6, Bob'unki b = 15. Açık değerleri, ortak anahtarı ve Eve'in a'yı bulmak için yapması gerekeni adım adım hesapla.",
    steps: [
      "Alice'in açık değeri: 5⁶ mod 23. Kare alarak ilerle: 5² = 25 → 25 − 23 = 2; 5⁴ = 2² = 4; 5⁶ = 5⁴ · 5² = 4 · 2 = 8. A = 8.",
      "Bob'un açık değeri: 5¹⁵ mod 23. 5⁸ = 4² = 16; 5¹⁵ = 5⁸ · 5⁴ · 5² · 5¹ = 16 · 4 · 2 · 5 = 640; 640 − 23 · 27 = 640 − 621 = 19. B = 19. Eve hatta yalnızca 23, 5, 8 ve 19'u görür.",
      "Alice'in ortak anahtarı: 19⁶ mod 23. 19² = 361 = 23 · 15 + 16 → 16; 19⁴ = 16² = 256 = 23 · 11 + 3 → 3; 19⁶ = 19⁴ · 19² = 3 · 16 = 48 → 48 − 46 = 2. K = 2.",
      "Bob'un ortak anahtarı: 8¹⁵ mod 23. 8² = 64 → 18; 8⁴ = 18² = 324 = 23 · 14 + 2 → 2; 8⁸ = 2² = 4; 8¹⁵ = 8⁸ · 8⁴ · 8² · 8 = 4 · 2 · 18 · 8 = 1152 → 1152 − 1150 = 2. İki taraf da 2 buldu; sayfada iki Ortak kutusu bu yüzden yeşile döner.",
      "Eve'in işi: 5ᵏ mod 23 dizisini yaz ve 8'i ara. 5, 2, 10, 4, 20, 8 → k = 6. Altı denemede Alice'in gizlisi elde; sonra 19⁶ mod 23 = 2 ile anahtarı da bilir. p 2048 bitlik olsaydı bu tablo 10⁶¹⁶ satır olurdu.",
    ],
    result:
      "A = 8, B = 19, ortak anahtar K = 2. Güvenlik sayıların büyüklüğünden gelir: 23 ile Eve altı adımda kazanır, 2048 bitlik p ile hiçbir bilgisayar yetişemez.",
  },
  misconceptions: [
    {
      myth: "Sembol ve rakam eklemek, parolayı uzatmaktan her zaman daha etkilidir.",
      truth:
        "Sayfanın formülünde dört sınıflı bir karakter 6.55 bit, küçük harf 4.70 bit getirir; fark iki bit bile değildir. Üç küçük harf eklemek, bütün parolayı dört sınıfa çıkarmaktan fazla kazandırır. Üstelik 'P@ssw0rd' gibi öngörülebilir değişimler sözlüklerde hazırdır; sayfa onu 52 bit sayar, gerçek saldırgan ilk saniyede dener.",
    },
    {
      myth: "Parolam özetlenmiş (hash'lenmiş) saklanıyorsa sızsa bile güvendedir.",
      truth:
        "Özet geri döndürülemez ama denenebilir: saldırgan milyarlarca tahmini özetleyip sızan listeyle karşılaştırır; sayfadaki '1 milyar/saniye' tam bu senaryodur. Kısa ya da yaygın parola saniyeler içinde eşleşir. Savunma, her parolaya rastgele bir tuz eklemek ve özellikle yavaş olacak şekilde tasarlanmış bcrypt ya da Argon2 gibi özetler kullanmaktır.",
    },
    {
      myth: "Algoritma gizli tutulursa şifre daha güvenli olur.",
      truth:
        "Kerckhoffs 1883'te tersini yazdı ve tarih onu haklı çıkardı: Enigma makineleri ele geçirildi, gizli algoritmalar tersine mühendislikle çözüldü. AES 2000'de herkese açık bir yarışmada, bütün dünya yıllarca saldırdıktan sonra seçildi; tasarımı kamuya açıktır. Güvenlik yalnızca anahtarda durmalıdır; gerisini düşman zaten bilir varsayılır.",
    },
    {
      myth: "Adres çubuğundaki kilit, sitenin güvenilir olduğunu gösterir.",
      truth:
        "Kilit yalnızca bağlantının şifreli olduğunu ve sertifikanın o alan adına ait olduğunu söyler; oltalama siteleri de ücretsiz sertifika alır. Kilit 'kimse hattı dinleyemiyor' demektir, 'karşındaki dürüst' değil. Alan adını okumak ve nereden geldiğini sorgulamak hâlâ senin işin.",
    },
  ],
  glossary: [
    { term: "Entropi (bit)", definition: "Bir parolanın ya da anahtarın olası değer sayısının 2 tabanında logaritması; her bit arama uzayını ikiye katlar." },
    { term: "Simetrik şifreleme", definition: "Şifreleme ve çözmenin aynı gizli anahtarla yapıldığı yöntem; Sezar, Vigenère, XOR ve AES bu sınıftadır." },
    { term: "Açık anahtarlı kriptografi", definition: "Tarafların önceden sır paylaşmadan, herkese açık değerlerle güvenli anahtar kurduğu ya da şifrelediği yöntem; Diffie–Hellman ve RSA." },
    { term: "Kriptografik özet (hash)", definition: "Her uzunluktaki girdiyi sabit uzunlukta, geri döndürülemez ve küçük değişikliğe aşırı duyarlı bir parmak izine çeviren fonksiyon; SHA-256 çıktısı 256 bittir." },
    { term: "Tuz (salt)", definition: "Özetlemeden önce her parolaya eklenen rastgele veri; aynı parolaların aynı özeti vermesini ve hazır tabloları engeller." },
    { term: "Ayrık logaritma", definition: "g ve A = gᵃ mod p bilinirken a'yı bulma problemi; büyük p için verimli bir çözümü bilinmediğinden Diffie–Hellman'ın güvencesidir." },
    { term: "Kerckhoffs ilkesi", definition: "Bir şifre sisteminin, anahtar dışındaki her şeyi düşman bilse bile güvenli kalması gerektiği ilkesi (1883)." },
    { term: "Güvenlik duvarı", definition: "Ağ trafiğini kaynak, hedef ve port gibi ölçütlere göre sıralı kurallarla süzen sistem; ilk eşleşen kural uygulanır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede 'mod 23' bir bölme kalanıdır; üniversitede <strong>sayılar teorisinin</strong> kapısıdır. Fermat'nın küçük teoremi (a<sup>p−1</sup> ≡ 1 mod p) Diffie–Hellman'daki kuvvetlerin neden p−1 adımda döndüğünü, Euler'in genellemesi RSA'nın neden çalıştığını açıklar; üreteç kavramı grup teorisine, hızlı üs alma algoritmalara bağlanır. Öbür yandan <strong>hesaplama karmaşıklığı</strong> dersi rahatsız edici bir gerçeği söyler: ayrık logaritmanın ya da özet fonksiyonlarının gerçekten 'tek yönlü' olduğu kanıtlanmamıştır; modern kriptografi, kimsenin henüz bulamadığı algoritmaların var olmadığı umuduna dayanır ve bu, P ile NP sorusuna komşudur.",
      "Bugünün tarayıcısı Diffie–Hellman'ı asal mod yerine <strong>eliptik eğriler</strong> üzerinde çalıştırır; aynı güvenlik çok daha kısa anahtarla gelir. Ufukta ise kuantum bilgisayar var: Peter Shor 1994'te yeterince büyük bir kuantum makinesinin hem çarpanlara ayırmayı hem ayrık logaritmayı hızla çözeceğini gösterdi. NIST, Ağustos 2024'te kuantuma dayanıklı ilk standartları yayımladı (ML-KEM, ML-DSA, SLH-DSA); kafes ve özet tabanlı bu yöntemler lisans müfredatına yeni giriyor. Güvenlik mühendisliği ise matematiğin bittiği yerde başlar: tehdit modeli, yan kanallar, insan hatası ve sayfanın alt sözlüğündeki saldırıların her biri ayrı bir araştırma alanıdır.",
    ],
    topics: [
      "Sayılar teorisi ve modüler aritmetik",
      "Hesaplama karmaşıklığı ve tek yönlü fonksiyonlar",
      "Bilgi teorisi (Shannon)",
      "Eliptik eğri kriptografisi",
      "Kuantum sonrası kriptografi",
      "Ağ güvenliği ve TLS",
      "Güvenli yazılım geliştirme",
    ],
  },
  quiz: [
    {
      question: "Sayfadaki H = L · log₂N formülüne göre hangi parolanın entropisi en yüksektir?",
      options: ["8 karakter, dört sınıf da var (N = 94)", "12 küçük harf (N = 26)", "9 karakter, harf ve rakam (N = 62)", "Üçü de eşit"],
      answer: 1,
      explanation:
        "8 · 6.55 = 52.4 bit, 12 · 4.70 = 56.4 bit, 9 · 5.95 = 53.6 bit. Uzunluk çarpan olarak girer, karakter sınıfı yalnızca logaritmanın içine; dört ek küçük harf, bütün karakterleri zenginleştirmekten fazla kazandırır.",
    },
    {
      question: "Diffie–Hellman'da hattı dinleyen Eve hangisini göremez?",
      options: ["p ve g değerlerini", "Alice'in açık değeri gᵃ mod p'yi", "Alice'in gizli üssü a'yı", "Bob'un açık değeri gᵇ mod p'yi"],
      answer: 2,
      explanation:
        "p, g, A ve B açıkça gönderilir; Eve hepsini görür. a ise hiç gönderilmez; Eve onu A'dan çıkarmak için ayrık logaritma çözmelidir. Küçük p ile bu kolaydır, 2048 bitlik p ile pratikte imkânsız.",
    },
    {
      question: "Güvenlik duvarı simülatöründe kurallar sırayla değerlendirilir ve ilk eşleşen uygulanır. Port 25'e gelen bir paket ne olur?",
      options: ["İZİN, çünkü alttaki açıklama 'Diğer → İZİN' diyor", "RED, çünkü 'DENY Port 25' kuralı 'Diğer' kuralından önce eşleşir", "Rastgele; simülatör yazı tura atar", "Yalnızca UDP ise izin verilir"],
      answer: 1,
      explanation:
        "Kural çiplerinde DENY Port 25 (SMTP relay) vardır ve liste sırasında 'Diğer → ALLOW'dan önce gelir; ilk eşleşen kural kazanır. Alttaki özet satırı bu kuralı yazmaz, çipler yazar. Gerçek güvenlik duvarlarında tersi tercih edilir: varsayılan RED, yalnızca gerekli portlara açıkça izin.",
    },
  ],
  next: [
    { href: "asal-rsa.html", title: "Asal Sayılar & RSA Fikri", why: "Diffie–Hellman'ın kardeşi: aynı 'tersi zor' fikri, bu kez çarpanlara ayırmayla." },
    { href: "sezar-sifre.html", title: "Sezar Şifresi", why: "Sıklık analizini elinle yap; 28 anahtarın neden birkaç saniyede bittiğini gör." },
    { href: "enigma-makinesi.html", title: "Enigma Makinesi", why: "Bilinen düz metnin (crib) bir makineyi nasıl kırdığı; AAAA deneyinin tarihteki büyük versiyonu." },
    { href: "internet-ve-ag-teknolojileri.html", title: "İnternet ve Ağ Teknolojileri", why: "Port, TCP ve UDP ne demek; güvenlik duvarının ağın neresinde durduğunu anla." },
  ],
  sources: [
    { title: "Wikipedia · Diffie–Hellman key exchange", url: "https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange", note: "Protokolün tarihi, GCHQ'daki gizli keşif ve ayrık logaritma problemine dayanan güvenlik tartışması (İngilizce)." },
    { title: "Khan Academy · Journey into cryptography", url: "https://www.khanacademy.org/computing/computer-science/cryptography", note: "Sezar'dan tek kullanımlık şeride, sıklık analizinden modüler aritmetiğe kısa videolar ve alıştırmalar (İngilizce)." },
    { title: "MDN · SubtleCrypto.digest()", url: "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest", note: "Sayfanın SHA-256 özetlerini hesaplamak için çağırdığı tarayıcı API'si; kendi hash deneylerini yazmak için başlangıç noktası." },
    { title: "NIST · Cryptography", url: "https://www.nist.gov/cryptography", note: "AES, SHA-2 ve kuantum sonrası standartları yayımlayan kurumun giriş sayfası; standartların güncel durumu için (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
