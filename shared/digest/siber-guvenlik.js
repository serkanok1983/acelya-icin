window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["siber-guvenlik"] = {
  slug: "siber-guvenlik",
  title: "Siber Güvenlik: Tersi Zor Olan İşlemler",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Herkesin dinlediği hatta iki yabancı nasıl ortak sır kurar? Parola neden bitle ölçülür, tek bitlik değişiklik özetin yarısını neden çevirir? Hepsi tek fikre dayanır: bir yönde kolay, tersi zor işlem.",
  hook:
    "1976'da iki genç araştırmacı, şifrecilerin iki bin yıllık kuralını yıkan bir makale yayımladı: ortak bir sır kurmak için önce gizlice buluşmak gerekmiyordu, bütün konuşma herkesin önünde yapılabilirdi. Üçüncü sekmede Alice ile Bob bunu bir dinleyicinin gözü önünde yapar. p = 23 iken dinleyici altı denemede kazanır; sayılar büyüdükçe kimin işinin ne kadar arttığını sayfa senin için sayar.",
  bigIdea:
    "Modern güvenlik, bir yönde kolay ama tersi pratikte imkânsız işlemlere yaslanır: üs almak kolay, <strong>ayrık logaritma</strong> zor; özet almak kolay, özetten metne dönmek imkânsız. Gizliliği algoritma değil, <em>anahtar</em> taşır.",
  story: [
    "Suetonius'un yazdığına göre Julius Caesar özel mektuplarında her harfi alfabede üç ileri kaydırıyordu; ilk sekmenin varsayılanı olan <strong>Sezar</strong> şifresi, k = 3 ile bu iki bin yıllık numaranın kendisidir. Kırılması da eskidir: 9. yüzyılda Bağdat'ta El-Kindî, bir dilde harflerin belli sıklıkta geçtiğini ve şifreli metinde en sık görünen işaretin büyük olasılıkla en sık harf olduğunu yazdı. <strong>Sıklık analizi</strong> denen bu fikir, yeterince uzun bir metinde tek alfabeli bütün şifreleri bir öğleden sonra işine çevirir. 1553'te Giovan Battista Bellaso bir anahtar kelimeyle her harfe farklı kaydırma uygulayan yöntemi yayımladı; yöntem sonradan yanlışlıkla Blaise de Vigenère'in adıyla anıldı ve üç yüzyıl boyunca <em>le chiffre indéchiffrable</em>, yani çözülemez şifre diye ün saldı. Charles Babbage onu 1854 dolayında kırdı ama yayımlamadı; Friedrich Kasiski 1863'te aynı yöntemi bastı: tekrar eden harf öbekleri arasındaki uzaklıklar anahtarın uzunluğunu ele verir, gerisi yine sıklık analizidir.",
    "1883'te Auguste Kerckhoffs, bugün hâlâ ilk ders olan ilkeyi yazdı: bir sistem, anahtar dışında her şeyi düşman bilse bile güvenli kalmalıdır. 1917'de Gilbert Vernam, telgraf bandındaki her işareti bir anahtar bandıyla XOR'layan bir makine tasarladı; Joseph Mauborgne anahtarın rastgele olması ve hiç tekrarlanmaması gerektiğini ekledi. 1949'da Claude Shannon bu düzenin neden özel olduğunu kanıtladı: anahtar gerçekten rastgeleyse, mesaj kadar uzunsa ve yalnızca bir kez kullanılırsa şifreli metin mesaj hakkında <strong>hiçbir</strong> bilgi taşımaz. Bu 'tek kullanımlık şerit', kusursuz gizliliği matematiksel olarak kanıtlanmış şifredir; sorunu pratiktir: her mesaj için mesaj kadar uzun bir sır dağıtmak gerekir. Shannon'ın bir yıl önce tanımladığı <em>entropi</em> ise ikinci sekmedeki parola hesabının birimidir.",
    "Anahtar dağıtma sorunu 1976'da çözüldü. Whitfield Diffie ve Martin Hellman, Ralph Merkle'ın fikirlerinden de yararlanarak 'New Directions in Cryptography' makalesini yayımladı: iki taraf herkese açık bir hatta birkaç sayı alışverişi yapar ve sonunda yalnızca ikisinin bildiği bir sayıya ulaşır. Ertesi yıl Rivest, Shamir ve Adleman asal sayılara dayanan RSA'yı buldu; e-ticaret, bankacılık ve bugün her tarayıcıdaki kilit simgesi bu iki fikrin üstünde durur. 1997'de İngiliz istihbarat kurumu GCHQ'nun yıllar önce aynı sonuçlara gizlice ulaştığı açıklandı; bilim tarihinde bazen keşif iki kez yapılır ve biri sessiz kalır.",
    "Güvenlik yalnızca matematik değildir. 2 Kasım 1988 akşamı Cornell'de bir lisansüstü öğrencisinin yazdığı, kendini kopyalayan program internete salındı ve bir gün içinde binlerce bilgisayarı kullanılmaz hâle getirdi; kesin sayı hiç bilinmedi, dolaşan rakamlar o günün kaba tahminleridir. Program bir <strong>bellek taşması</strong> hatasından, yanlış yapılandırılmış bir ağ hizmetinden ve tahmin edilebilir parolalardan yararlanıyordu; yani bugün konuşulan zayıflık türlerinin çoğu otuz yıldan eskidir, savunmaları da öyle. Sayfanın altındaki altı ilkenin ilk ikisi tam bunlardır: güncelle, ve her hesaba ayrı, uzun, rastgele bir parola kullan. Bugünün standartları ise Kerckhoffs'un ilkesine uygun biçimde, herkesin gözü önünde sınanır: AES, NIST'in 1997'de açtığı herkese açık yarışmada Ekim 2000'de seçilen ve 2001'de standartlaşan Rijndael algoritmasıdır; SHA-256 ise NSA'nın tasarladığı, NIST'in ilk kez 2001'de yayımladığı ve o günden beri açıkça incelenen SHA-2 ailesinin üyesidir. Sayfada Sezar'dan Diffie–Hellman'a, RSA'dan SHA-256'ya bu zincirin halkalarını küçük sayılarla kendin ölçebilirsin.",
  ],
  core: [
    {
      heading: "Sıklık ve çakışma indeksi: harfler iz bırakır",
      body:
        "Sezar şifresi her harfi sabit bir k kadar kaydırır; 29 harfli alfabede yalnızca 29 anahtar vardır. Denemeye bile gerek yoktur, çünkü Türkçe düzyazıda harfler eşit sıklıkta geçmez: sayfanın örnek metninde A %10.5, E %9.0, N %8.4 pay alır. Kaydırma bu payları silmez, başka harflerin üstüne taşır. Saldırı, şifreli metni her k için geri kaydırır ve dağılımı örnek dağılımla <strong>χ²</strong> ölçüsüyle karşılaştırır; en küçük χ² anahtarı verir. İkinci ölçü <strong>çakışma indeksi</strong>dir (IC): metinden rastgele çekilen iki harfin aynı olma olasılığı. Harfler eşit dağılsaydı 1/29 = 0.0345 olurdu; örnek metinde 0.0577'dir ve kaydırma bu sayıyı değiştirmez. <strong>Vigenère</strong> bir anahtar sözcükle her harfe farklı kaydırma uygular, IC rastgele değere yaklaşır. Ama anahtar her L harfte bir tekrarlanır: metni L sütuna bölen kişi her sütunda yine yüksek IC'li bir Sezar şifresi bulur ve sütunları tek tek χ² ile çözer. İstatistik veri ister; kısa metinde ölçüm şansa kalır. Anahtar ileti kadar uzun ve rastgeleyse Shannon'ın kırılamaz şeridine varırsın.",
      formula: "χ²(k) = Σ (G<sub>j</sub> − n·p<sub>j</sub>)² / (n·p<sub>j</sub>),   IC = Σ n<sub>j</sub>(n<sub>j</sub> − 1) / (n(n − 1))",
      formulaNote: "n harf sayısı, n<sub>j</sub> şifreli metinde j harfinin sayısı; G<sub>j</sub> aynı sayının k basamak geri kaydırılmış metindeki değeri, p<sub>j</sub> harfin örnek metindeki payı. Örnek dağılım sayfaya gömülü 2464 harflik düzyazıdan gelir, büyük bir derlemden değil.",
    },
    {
      heading: "Entropi: rastgele parolayı bitle ölçmek",
      body:
        "Bir parolanın gücü görünüşü değil, saldırganın denemesi gereken olasılık sayısıdır. Her biri N seçenekli bir kümeden bağımsız ve eşit olasılıkla yapılan L seçim N<sup>L</sup> olasılık eder; bunun 2 tabanında logaritması <strong>entropi</strong>dir ve birimi bittir. Her ek bit aramayı ikiye katlar: 10 bit bin kat, 20 bit milyon kat demektir. Seçim başına kazanç kümeye bağlıdır: rakam 3.32 bit, küçük harf 4.70, harf ve rakam karışımı (N = 62) 5.95, yazdırılabilir ASCII (N = 95) 6.57, beş zarla seçilen 7776 sözcüklük listeden bir sözcük 12.92 bit. Uzunluk formüle çarpan olarak, küme büyüklüğü logaritmanın içinden girer; bu yüzden uzatmak, çeşitlendirmekten ucuzdur. Süre, olasılık sayısının tahmin hızına bölümüdür ve hız senin koyduğun bir varsayımdır. Önemli sınır: formül yalnızca rastgele seçimler için doğrudur. İnsanın seçtiği parolalar adlara, tarihlere, klavye sıralarına yığılır; saldırgan o kalıpları önce dener ve gerçek entropi formülün verdiğinden düşüktür. Ne kadar düşük olduğu kişiye göre değişir; sayfa bunu bilerek ölçmez, yazdığın parolayı puanlayan bir ölçer de yoktur.",
      formula: "H = L · log<sub>2</sub> N,   t<sub>tam</sub> = N<sup>L</sup> / v,   t<sub>beklenen</sub> = t<sub>tam</sub> / 2",
      formulaNote: "v saniyedeki tahmin sayısı. Eşit olasılıklı bir sır ortalamada uzayın yarısında bulunur; sayfa iki süreyi ayrı kartlarda verir.",
    },
    {
      heading: "Yavaş ve tuzlu özet: her tahmine fiyat biçmek",
      body:
        "Sunucu parolanı değil, ondan türetilmiş bir değeri saklar. Sıradan bir özet hızlı olsun diye tasarlanır; parola saklarken bu bir kusurdur, çünkü kayıtları ele geçiren biri de her tahmini aynı hızla sınar. Çözüm, doğru parolayı bilen kullanıcının girişte bir kez, saldırganın ise her tahminde ödediği bir bedel koymaktır. Sayfadaki <strong>PBKDF2</strong> bunu HMAC'i c kez zincirleyerek yapar. Her HMAC iki SHA-256 sıkıştırma çağrısıdır, anahtarın hazırlanması iki çağrı daha ister: sayfadaki gibi kısa parola ve tuzla toplam tam 2c + 2 (parola 64 baytı, tuz 51 baytı aşarsa ek bloklar gerekir). Bu sayı cihazdan bağımsızdır, süre değildir. c'yi on katına çıkarmak her tahmini yaklaşık on kat pahalılaştırır; bu, parolaya log<sub>2</sub>10 ≈ 3.32 bit eklemekle aynı iştir. Zayıf bir parolayı kurtarmaz, yalnızca aramayı yavaşlatır. <strong>Tuz</strong> ise kaydın yanında açıkça duran rastgele bir sayıdır; gizli değildir. İşi, aynı parolayı seçen iki kişinin kaydını farklılaştırmak ve tek bir hazır tablonun bütün hesaplara birden uygulanmasını engellemektir. Saldırganın özel donanımı tarayıcıdaki tek çekirdekli koddan çok hızlıdır; gerçek sistemler bu yüzden bellek de harcatan scrypt ve Argon2 gibi işlevleri yeğler.",
      formula: "U<sub>1</sub> = HMAC(parola, tuz ‖ 1),   U<sub>i</sub> = HMAC(parola, U<sub>i−1</sub>),   saklanan = U<sub>1</sub> ⊕ U<sub>2</sub> ⊕ … ⊕ U<sub>c</sub>",
      formulaNote: "⊕ bit bit XOR, ‖ uç uca ekleme. Tahmin başına maliyet 2c + 2 sıkıştırma çağrısıdır: c = 1000 için 2002.",
    },
    {
      heading: "Özet: çığ etkisi ve doğum günü sınırı",
      body:
        "SHA-256 bir harfi de bin sayfalık kitabı da 256 bitlik bir özete indirir. İyi bir <strong>kriptografik özet</strong>te çıktının her biti girdinin her bitine yarı yarıya bağlıdır: girdide tek bit değişince her özet biti yazı tura atmış gibi davranır. Dönen bit sayısı bu yüzden iki terimli B(256, ½) dağılımına uyar; ortalaması 128, standart sapması √(256·¼) = 8 bittir. Buna <em>çığ etkisi</em> denir ve tek denemede tam 128 çıkması gerekmez. İkinci özellik çakışma direncidir. N = 2<sup>k</sup> olası değer varken <em>belirli</em> bir özeti tutturmak ortalama N deneme ister; ama <em>herhangi iki</em> iletinin çakışması çok daha erken gelir, çünkü n ileti n(n − 1)/2 çift oluşturur. Beklenen deneme sayısı yaklaşık √(πN/2)'dir: uzayın kendisi değil, karekökü. 256 bitin tamamı için bu 4.26 × 10³⁸, yani yaklaşık 2¹²⁸ deneme eder; 256 bitlik bir özetin çakışma direnci bu yüzden 128 bit sayılır. Özet tek başına gönderen hakkında bir şey söylemez, onu herkes hesaplar; içine gizli bir anahtar karıştırıldığında (<strong>HMAC</strong>) iletinin hem değişmediğini hem de anahtarı bilen birinden geldiğini gösterir.",
      formula: "dönen bit ~ B(256, ½): ortalama 128, σ = 8;   E[ilk çakışma] ≈ √(π·2<sup>k</sup> / 2)",
      formulaNote: "Karekök formülü büyük N için bir yaklaşımdır; kesin beklenen değer ondan yaklaşık 2/3 deneme fazladır (k = 16'da 320.8'e karşı 321.5) ve sayfa onu toplamla hesaplar. 365 günlük klasik doğum günü probleminde beklenen değer 24.6 kişidir; ünlü 23 ise çakışma olasılığının %50'yi geçtiği kişi sayısıdır.",
    },
    {
      heading: "Diffie–Hellman: kolay yön, zor yön",
      body:
        "Herkes p asalını ve g tabanını bilir. Alice gizli a ile A = g<sup>a</sup> mod p'yi, Bob gizli b ile B = g<sup>b</sup> mod p'yi açıkça gönderir; Alice B<sup>a</sup>, Bob A<sup>b</sup> hesaplar ve ikisi de g<sup>ab</sup> mod p'ye varır. Hattı dinleyen kişi p, g, A ve B'yi görür; a'yı bulmak için 'g'nin kaçıncı kuvveti A eder' sorusunu, yani <strong>ayrık logaritmayı</strong> çözmelidir. İki yönün bedeli sayılabilir. Üs alma <em>kare al–çarp</em> yöntemiyle yapılır: üssün ilk bitinden sonraki her bit için bir kare, her 1 biti için bir çarpma daha; a = 6 = 110<sub>2</sub> için üç işlem. Kuvvetleri sırayla deneyen dinleyici ise ortalamada g'nin <strong>mertebesinin</strong> yarısı kadar deneme yapar. Mertebe, g'nin kuvvetlerinin aldığı farklı değer sayısıdır; Fermat'nın küçük teoremi g<sup>p−1</sup> ≡ 1 dediği için p − 1'i böler. Mertebesi tam p − 1 olan tabana ilkel kök denir; mod 23'te 22 adaydan onu böyledir. Küçük mertebeli bir taban, aranacak yeri küçültür. Sayfadaki asallar bilerek oyuncak boyuttadır. Gerçek gruplar en az 2048 bit kullanır ve bu boylar, sırayla denemeden çok daha hızlı algoritmalar hesaba katılarak seçilir.",
      formula: "K = B<sup>a</sup> = A<sup>b</sup> = g<sup>ab</sup> mod p;   çarpma sayısı = ⌊log<sub>2</sub>a⌋ + (a'daki 1 bitleri) − 1;   dinleyici ≈ (mertebe + 1) / 2",
      formulaNote: "Üs almanın işi p'nin bit sayısıyla, sırayla aramanın işi p'nin kendisiyle büyür. RSA aynı fikri başka bir zor yöne, çarpanlara ayırmaya yaslar; çözümlü örnek onu kurar.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir ve her sekmenin kendi <strong>Sekmeyi sıfırla</strong> düğmesi vardır. <strong>01 · Klasik şifreler ve frekans analizi</strong>: <strong>Şifre</strong> menüsü (Sezar, Atbash, Vigenère), <strong>Kaydırma k</strong> ya da <strong>Anahtar sözcük</strong>, üç hazır <strong>Düz metin</strong> ve saldırganın gördüğü harf sayısını kısan <strong>Saldırganın elindeki metin</strong> menüsü; hiçbir saldırı sonucu gerçek anahtara bakmaz. <strong>02 · Parolalar ve özetler</strong>: küme, <strong>Uzunluk L</strong>, <strong>Saldırganın tahmin hızı</strong> ve dört hazır düğme; altında gerçek PBKDF2 için <strong>Yineleme sayısı c</strong>, dört hesaplı bir tuz tablosu ve küçük bir PIN uzayını gerçekten tarayan ölçüm. <strong>03 · Açık anahtar</strong>: <strong>Açık asal p</strong>, <strong>Açık taban g</strong>, iki gizli üs ve oyuncak bir RSA anahtarı; gizli üslerin ve RSA'daki m sayısının kaydırıcısı altında, belirli bir sayıyı doğrudan girebileceğin <strong>Tam değeri yaz</strong> kutusu durur. <strong>04 · Bütünlük</strong>: çığ etkisi, kısaltılmış özette çakışma araması ve HMAC. Süre okumaları (tahmin başına süre, özet hızı) cihazına göre değişir; sayılan sıkıştırma çağrıları, deneme sayıları ve tohumlu deneylerin sonuçları her açılışta aynıdır. Üçüncü sekmedeki bütün sayılar birkaç adımda kırılacak kadar küçüktür ve dinleyici yalnızca sırayla dener; amaç gerçek bir sistemi değil, işlemin biçimini göstermektir.",
    experiments: [
      {
        title: "İstatistik anahtarı bulur, periyot Vigenère'i ele verir",
        predict:
          "Sezar'la şifrelenmiş 766 harflik bir metinde saldırgan, anahtarı bilmeden kaydırmayı bulabilir mi? Elinde yalnızca ilk 25 harf olsa? Aynı metni LİMON anahtarıyla Vigenère'e verince çakışma indeksi hangisine yaklaşır: örnek Türkçenin 0.0577'sine mi, rastgele metnin 0.0345'ine mi?",
        do:
          "01 sekmesinde varsayılanla başla (Sezar, Kaydırma k = 3, Deniz feneri). 'İstatistiğin bulduğu kaydırma', 'χ²: en iyi · ikinci' ve 'Ölçülen çakışma indeksi' kartlarını oku. 'Saldırganın elindeki metin' menüsünden İlk 25 harf'i seç. Sonra menüyü Metnin tamamı'na döndür, Şifre'yi Vigenère yap (anahtar sözcük LİMON) ve alttaki tabloyu incele. Son olarak İlk 100 harf'i seç.",
        observe:
          "Sezar, tam metin: k = 3, χ² 58.4 · 1029, IC 0.0594, doğru harf 766 / 766. İlk 25 harfte de k = 3 bulunur ama aradaki fark daralır: 26.3 · 56.1. Vigenère, tam metin: IC 0.0368'e düşer; tablonun m = 5 satırında ortalama IC 0.0593'tür, Kasiski 'm = 5 (66 yineleme)' yazar, bulunan anahtar LİMON, doğru harf 766 / 766. İlk 100 harfte m = 5 yine bulunur ama anahtar UİCON çıkar, 60 / 100 harf doğrudur ve Kasiski 'Yetersiz (1 yineleme)' der.",
        explain:
          "Kaydırma harflerin adını değiştirir, sıklık sırasını değiştirmez; IC bu yüzden düz metindeki değerinde kalır ve χ² doğru kaydırmada dibe vurur. Vigenère beş farklı kaydırmayı üst üste bindirip dağılımı düzler, ama her beşinci harf aynı kaydırmadan geçer: metin beş sütuna bölününce her sütun yeniden Türkçe gibi görünür. İstatistik veri ister: 100 harfte sütun başına 20 harf kalır ve beş kaydırmadan ikisi yanlış seçilir. Metin kısaldıkça ve anahtar uzadıkça saldırı zorlaşır; bu yolun sonunda Shannon'ın tek kullanımlık şeridi durur.",
      },
      {
        title: "Uzunluk, karakter çeşidi ve bir tahminin fiyatı",
        predict:
          "Saniyede 10⁹ tahmin yapan birine karşı hangisi daha uzun dayanır: rastgele 12 karışık karakter mi, bir listeden rastgele çekilmiş 5 sözcük mü? Yineleme sayısı c 1000'den 100 000'e çıkınca bir tahmin kaç kat pahalanır? Aynı parolayı seçen iki hesabın kayıtları da aynı mı görünür?",
        do:
          "02 sekmesinde dört hazır düğmeye sırayla bas; her birinde 'Entropi' ve 'Tamamını deneme süresi' kartlarını not et. Sekmeyi sıfırla ve 'Uzunluk L'yi 10'dan 11'e çıkar. 'Yineleme sayısı c' kaydırıcısını c = 1, c = 1000 ve c = 100 000 konumlarına getirip 'Sayılan SHA-256 sıkıştırma çağrısı' kartını oku. Son olarak 'Her hesaba ayrı tuz kullan' kutusunun işaretini kaldır.",
        observe:
          "4 haneli PIN: 13.3 bit, 10.0 µs. 8 küçük harf: 37.6 bit, 3.48 dk. 12 karışık karakter: 78.8 bit, 17.1 milyon yıl. 5 rastgele sözcük: 64.6 bit, 901 yıl. L = 11'de 59.5 bit 65.5'e, 26.6 yıl 1.65 bin yıla çıkar; kart '× 62' yazar. Sayılan çağrı 4, 2002 ve 200 002'dir; c = 100 000 için kuram oranı 99.9'dur; ölçülen oran cihazına göre değişir ama ondan yalnızca birkaç yüzde ayrılır. Tuz kapalıyken farklı saklanan değer sayısı 3 / 4'e iner, Deniz ile Ada'nın kayıtları harfi harfine aynıdır; tuz açıkken 4 / 4.",
        explain:
          "Entropi L·log₂N'dir: uzunluk çarpan olarak, küme logaritmanın içinden girer. Beş sözcük yalnızca beş seçimdir ama her biri 12.92 bit taşır. PBKDF2 her tahmine 2c + 2 sıkıştırma çağrısı ödetir; c'yi yüz katına çıkarmak log₂100 ≈ 6.6 bit, yani kabaca bir rastgele karakter kazandırır. Zayıf parolayı kurtarmaz, her tahmini pahalılaştırır. Tuz gizli değildir; işi aynı parolaların aynı kaydı vermesini ve tek bir hazır tablonun bütün hesaplara uygulanmasını engellemektir. Bu bit sayıları rastgele seçim içindir; insanın seçtiği parola daha azını taşır.",
      },
      {
        title: "Kolay yön, zor yön",
        predict:
          "p = 23, g = 5, a = 6 iken Alice açık değerini kaç çarpmayla bulur, dinleyici a'yı kaç denemede? p'yi 65 521'e çıkarınca hangisinin işi daha çok büyür? Tabanı, mertebesi yalnızca 11 olan g = 2 yaparsan dinleyicinin ortalama denemesi ne olur?",
        do:
          "03 sekmesinde varsayılan kartları oku. 'Açık taban g' menüsünden 'g = 2 · kötü seçim (mertebe 11)' satırını seç ve 'Dinleyici: ölçülen ortalama' kartına bak. Sonra 'Açık asal p'yi 65 521 yap (taban kendiliğinden g = 17 olur) ve 'Alice'in gizli üssü a' kaydırıcısının altındaki 'Tam değeri yaz' kutusuna sırayla 200, 40000 ve 65520 yaz; her birinde 'g<sup>a</sup> için sayılan çarpma' ile 'Dinleyici: bu A için deneme' kartlarını oku. Aşağıdaki RSA bölümünde 'İletiyi yolda değiştir' düğmesine bas.",
        observe:
          "Varsayılan: A = 8, B = 19, ortak sır iki tarafta da 2; sayılan çarpma 3, dinleyici 6. denemede bulur, ortalama 11.5. g = 2 ile mertebe '11 < p − 1', ortalama 6.00 olur. p = 65 521 (g = 17): 400 rastgele üsle ölçülen ortalama 31 449 ± 961, kuram 32 761; fark 1.4 standart hatadır. a = 200 için 9 çarpma ve 200 deneme, a = 40 000 için 19 çarpma ve 40 000 deneme okunur. a = 65 520 iken 26 çarpma yeter, dinleyici 65 520 deneme yapar; ama A = 1 çıkar ve durum satırı bu açık değerin hiçbir şey gizlemediğini yazar. RSA'da imzadan çıkan özet 1460, alınan iletinin özeti 220'dir: 'İmza geçersiz'.",
        explain:
          "Kare al–çarp üssün bitleri kadar iş ister: yük log₂p ile büyür. Sırayla deneyen dinleyicinin işi mertebenin yarısıdır: p ile büyür. a 200 katına çıkınca çarpma 9'dan 19'a, deneme 200'den 40 000'e çıkar. Küçük mertebeli taban aranacak yeri küçültür; a = p − 1 ise Fermat'nın küçük teoremi gereği A = 1 olur, gerçek uygulamalar o değeri reddeder. Bu sayılar oyuncaktır: gerçek gruplar en az 2048 bittir ve boyları, sırayla denemeden çok daha hızlı algoritmalar hesaba katılarak seçilir.",
      },
      {
        title: "Tek bit, yarım özet; karekök kadar deneme",
        predict:
          "'Açelya'nın Yeri' iletisinin tek bitini çevirirsen 256 özet bitinden kaçı döner? Özetin yalnızca ilk 16 biti tutulursa (65 536 olası değer) iki iletinin çakışması için kaç deneme gerekir: on binlerce mi, birkaç yüz mü? İleti yolda değişirse yanına konmuş yalın özet bunu yakalar mı?",
        do:
          "04 sekmesinde 'Bu değişiklikte dönen bit' ve 'Ölçülen ortalama' kartlarını oku; 'Çevrilecek girdi biti'ni 1 yap. 'Özetin tutulan biti k'yi sırayla 8, 12, 16 ve 20'ye getir, ölçülen ortalamayı kesin beklenen değerle karşılaştır. HMAC bölümünde 'Yolda değiştir: 100 yerine 900' düğmesine bas; ardından 'Kısaltılmış etiket uzunluğu t'yi 4 ile 16 arasında gezdir.",
        observe:
          "Bit 0: 124 / 256. Bit 1: yine 124 / 256, ama başka bitler. 1000 denemede ortalama 128.26, standart sapma 7.45, en az · en çok 106 · 152. Çakışma: k = 8'de 20.4 (kesin 20.7), k = 12'de 78.3 (80.9), k = 16'da 330.8 ± 11.8 (321.5), k = 20'de 1275.1 (1284.1). İleti değişince yalın özet 'Geçti: değişiklik fark edilmedi', HMAC 'Reddedildi' der; etiketler 126 / 256 bitte ayrılır. 100 000 rastgele etiketten t = 8'de yaklaşık 390'ı, t = 16'da bir ikisi tutar.",
        explain:
          "Her özet biti girdinin her bitine yarı yarıya bağlıdır; dönen bit sayısı B(256, ½) dağılır ve 124, ortalamaya yarım standart sapma uzaktadır. Çakışmada sayılan şey çiftlerdir: n ileti n(n − 1)/2 çift eder, bu yüzden deneme sayısı 2ᵏ ile değil karekökü ile büyür; k dört bit artınca iş 16 değil 4 katına çıkar. Yalın özeti araya giren de hesaplar; HMAC'te anahtarı bilmeyen etiketi üretemez, geriye deneme başına 2⁻ᵗ olasılıklı körlemesine tahmin kalır. HMAC iletiyi gizlemez ve aynı iletinin yeniden gönderilmesini tek başına engellemez.",
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
        "Şubat 2017'de Google ve Amsterdam'daki CWI araştırmacıları içerikleri farklı ama SHA-1 özetleri birebir aynı iki PDF yayımladı: ilk gerçek SHA-1 çakışması. Hesap yaklaşık 2⁶³, yani dokuz milyar kere milyar SHA-1 işlemi gerektirdi: araştırmacıların ifadesiyle 6.500 yıllık tek işlemci hesabı ile 110 yıllık tek GPU hesabının toplamı. Kaba kuvvetle çakışma aramak (2⁸⁰ işlem) bunun yüz bin katı sürerdi; fark, algoritmanın iç yapısındaki zayıflıktan geliyordu. Tarayıcılar SHA-1 imzalı sertifikaları o sıralarda zaten reddetmeye başlamıştı. Sayfanın kullandığı SHA-256 için bilinen bir çakışma yok.",
    },
    {
      title: "Bir solucan, ilk acil müdahale ekibi",
      body:
        "2 Kasım 1988'de Cornell lisansüstü öğrencisi Robert Tappan Morris'in internete saldığı solucan, bir bellek taşması hatası ve zayıf parolalar sayesinde binlerce makineye yayıldı. Dava, 1986 tarihli Bilgisayar Dolandırıcılığı ve Kötüye Kullanım Yasası'ndan verilen ilk ağır suç mahkûmiyetiyle bitti: üç yıl denetimli serbestlik, 400 saat kamu hizmeti ve 10.050 dolar para cezası. Kalıcı sonucu ise bir savunma kurumuydu: olayın ardından DARPA'nın desteğiyle Carnegie Mellon'da, türünün ilk örneği olan acil müdahale ekibi CERT/CC kuruldu.",
    },
  ],
  worked: {
    title: "Kâğıt üstünde oyuncak RSA: anahtar, şifre ve bir zaaf",
    prompt:
      "p = 61, q = 53 ve açık üs e = 17 veriliyor (03 sekmesinin varsayılan RSA anahtarı). Gizli üs d'yi genişletilmiş Öklid algoritmasıyla bul, m = 65 sayısını şifrele ve şifreli sayıyı 2¹⁷ ile çarpan birinin, anahtarı bilmeden açık metne ne yaptığını göster.",
    steps: [
      "Modül ve Euler fonksiyonu: n = p·q = 61·53 = 3233; φ(n) = (p − 1)(q − 1) = 60·52 = 3120. Açık anahtar (n, e) = (3233, 17) çiftidir. e ile φ(n) aralarında asal olmalıdır: 17 asaldır ve 3120'yi bölmez, koşul sağlanır.",
      "Gizli üs, e·d ≡ 1 (mod φ(n)) eşitliğini sağlayan d'dir. Öklid: 3120 = 183·17 + 9; 17 = 1·9 + 8; 9 = 1·8 + 1. Geriye doğru: 1 = 9 − 8 = 9 − (17 − 9) = 2·9 − 17 = 2·(3120 − 183·17) − 17 = 2·3120 − 367·17. Demek ki 17·(−367) ≡ 1; eksi sayıya 3120 eklenir: d = 3120 − 367 = 2753. Sınama: 17·2753 = 46 801 = 15·3120 + 1.",
      "Neden geri açılır: e·d = 1 + 15·φ(n). Euler teoremine göre m ile n aralarında asalsa m<sup>φ(n)</sup> ≡ 1 (mod n); o hâlde (m<sup>e</sup>)<sup>d</sup> = m·(m<sup>φ(n)</sup>)<sup>15</sup> ≡ m. d'yi bulmak için φ(n)'yi, onun için de p ile q'yu bilmek gerekir; gizlilik n'yi çarpanlarına ayırmanın zorluğuna yaslanır.",
      "Şifreleme: c = 65¹⁷ mod 3233. 17 = 16 + 1 olduğundan dört kare ve bir çarpma yeter: 65² = 4225 ≡ 992; 992² = 984 064 ≡ 1232; 1232² = 1 517 824 ≡ 1547; 1547² = 2 393 209 ≡ 789; 789·65 = 51 285 ≡ 2790. Sayfadaki şifreli c kartı 2790, geri açılan değer kartı 65 gösterir.",
      "Zaaf: saldırgan c′ = 2¹⁷·c mod n hesaplar. 2¹⁷ = 131 072 ≡ 1752; 1752·2790 = 4 888 080 ≡ 3017 (mod 3233). Alıcı 3017'yi gizli üsle açınca (2¹⁷·65¹⁷)<sup>d</sup> = (2·65)<sup>17·d</sup> ≡ 130 bulur. Açık metin, anahtar hiç bilinmeden ikiyle çarpılmıştır; sayfanın son iki kartı aynı 130'u gösterir.",
    ],
    result:
      "d = 2753, c = 2790 ve 2¹⁷·c açılınca 130 = 2·65. İşlem doğrudur ama tek başına güvenli değildir: dolgusuz, 'ders kitabı' RSA belirlenimcidir (aynı m hep aynı c'yi verir) ve çarpımsaldır. Gerçek sistemler iletiyi şifrelemeden önce rastgele dolguyla sarar (şifrelemede OAEP, imzada PSS). Buradaki n dört basamaklıdır ve elle çarpanlarına ayrılır; gerçek modüller en az 2048 bittir.",
  },
  misconceptions: [
    {
      myth: "Sembol ve rakam eklemek, parolayı uzatmaktan her zaman daha etkilidir.",
      truth:
        "Rastgele seçimde 95'lik kümeden bir karakter 6.57 bit, küçük harf 4.70 bit getirir. Sekiz karışık karakter 52.6 bit, on iki küçük harf 56.4 bit eder; saniyede 10⁹ tahminle ilki 76.8 günde, ikincisi 3.02 yılda taranır (02 sekmesinde dene). Uzunluk çarpan olarak girer, küme logaritmanın içinden. Üstelik 'P@ssw0rd' gibi öngörülebilir değişimler rastgele seçim değildir: saldırgan o kalıpları önce dener ve formülün verdiği bit sayısı böyle bir parola için geçerli olmaz.",
    },
    {
      myth: "Parolam özetlenmiş (hash'lenmiş) saklanıyorsa sızsa bile güvendedir.",
      truth:
        "Özet geri döndürülemez ama denenebilir: kayıtları ele geçiren biri tahminleri özetleyip kayıtla karşılaştırır. 02 sekmesindeki ölçüm bunu küçük ölçekte yapar: üç haneli rastgele bir PIN'in tuzsuz SHA-256 özeti ortalama 488.2 denemede bulunur (kuram 500.5). Savunma üç katlıdır: uzun ve rastgele bir parola, her hesaba ayrı tuz ve PBKDF2, scrypt ya da Argon2 gibi bilerek yavaşlatılmış bir özet.",
    },
    {
      myth: "İletinin yanına özetini koymak, yolda değiştirilmesini engeller.",
      truth:
        "Özeti herkes hesaplayabilir; iletiyi değiştiren kişi yeni özeti de hesaplayıp yanına koyar. 04 sekmesinde 100, 900 yapılınca yalın özet denetimi 'Geçti: değişiklik fark edilmedi' der. Bütünlük için gizli bir anahtar gerekir: HMAC etiketini anahtarı bilmeyen biri üretemez, alıcı değişmiş iletiyi reddeder. Yalın özet ancak özetin kendisi güvenilir bir yoldan geldiyse işe yarar.",
    },
    {
      myth: "Adres çubuğundaki kilit, sitenin güvenilir olduğunu gösterir.",
      truth:
        "Kilit yalnızca bağlantının şifreli olduğunu ve sertifikanın o alan adına ait olduğunu söyler; oltalama siteleri de ücretsiz sertifika alır. Kilit 'kimse hattı dinleyemiyor' demektir, 'karşındaki dürüst' değil. Alan adını okumak ve nereden geldiğini sorgulamak hâlâ senin işin.",
    },
  ],
  glossary: [
    { term: "Entropi (bit)", definition: "Rastgele seçilmiş bir parolanın ya da anahtarın olası değer sayısının 2 tabanında logaritması; her bit arama uzayını ikiye katlar." },
    { term: "Çakışma indeksi (IC)", definition: "Bir metinden rastgele çekilen iki harfin aynı olma olasılığı; 29 harfli alfabede rastgele metin için 1/29, doğal dil için belirgin biçimde daha yüksektir." },
    { term: "Kriptografik özet (hash)", definition: "Her uzunluktaki girdiyi sabit uzunlukta, geri döndürülemez ve küçük değişikliğe aşırı duyarlı bir parmak izine çeviren fonksiyon; SHA-256 çıktısı 256 bittir." },
    { term: "Tuz (salt)", definition: "Parola özetlenirken katılan, kaydın yanında açıkça saklanan rastgele veri; aynı parolaların aynı kaydı vermesini ve hazır tabloları engeller." },
    { term: "Doğum günü sınırı", definition: "N olası değer arasında herhangi iki girdinin çakışması için gereken deneme sayısının N ile değil, yaklaşık √N ile büyümesi." },
    { term: "HMAC", definition: "Özetin içine gizli bir anahtar karıştırarak üretilen ileti doğrulama kodu; iletinin değişmediğini ve anahtarı bilen birinden geldiğini gösterir, iletiyi gizlemez." },
    { term: "Açık anahtarlı kriptografi", definition: "Tarafların önceden sır paylaşmadan, herkese açık değerlerle ortak anahtar kurduğu, şifrelediği ya da imzaladığı yöntemler; Diffie–Hellman ve RSA." },
    { term: "Ayrık logaritma", definition: "g ve A = gᵃ mod p bilinirken a'yı bulma problemi; büyük p için klasik bilgisayarlarda verimli bir çözümü bilinmediğinden Diffie–Hellman'ın güvencesidir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede 'mod 23' bir bölme kalanıdır; üniversitede <strong>sayılar teorisinin</strong> kapısıdır. Fermat'nın küçük teoremi (a<sup>p−1</sup> ≡ 1 mod p) Diffie–Hellman'daki kuvvetlerin neden p−1 adımda döndüğünü, Euler'in genellemesi RSA'nın neden çalıştığını açıklar; üreteç kavramı grup teorisine, hızlı üs alma algoritmalara bağlanır. Öbür yandan <strong>hesaplama karmaşıklığı</strong> dersi rahatsız edici bir gerçeği söyler: ayrık logaritmanın ya da özet fonksiyonlarının gerçekten 'tek yönlü' olduğu kanıtlanmamıştır; modern kriptografi, kimsenin henüz bulamadığı algoritmaların var olmadığı umuduna dayanır ve bu, P ile NP sorusuna komşudur.",
      "Bugünün tarayıcısı Diffie–Hellman'ı asal mod yerine <strong>eliptik eğriler</strong> üzerinde çalıştırır; aynı güvenlik çok daha kısa anahtarla gelir. Ufukta ise kuantum bilgisayar var: Peter Shor 1994'te yeterince büyük bir kuantum makinesinin hem çarpanlara ayırmayı hem ayrık logaritmayı hızla çözeceğini gösterdi. NIST, Ağustos 2024'te kuantuma dayanıklı ilk standartları yayımladı (ML-KEM, ML-DSA, SLH-DSA); kafes ve özet tabanlı bu yöntemler lisans müfredatına yeni giriyor. Bu konular bilgisayar mühendisliğinde Ayrık Matematik, Sayılar Teorisi, Kriptografiye Giriş ve Bilgisayar Ağları derslerine dağılır; dördüncü sekmedeki iki terimli dağılım ve doğum günü hesabı ise Olasılık dersinin konusudur. Güvenlik mühendisliği matematiğin bittiği yerde başlar: tehdit modeli, yan kanallar, insan hatası ve sayfanın altındaki altı savunma ilkesinin her biri ayrı bir çalışma alanıdır.",
    ],
    topics: [
      "Sayılar teorisi ve modüler aritmetik",
      "Hesaplama karmaşıklığı ve tek yönlü fonksiyonlar",
      "Bilgi teorisi (Shannon)",
      "Olasılık: iki terimli dağılım ve doğum günü problemi",
      "Eliptik eğri kriptografisi",
      "Kuantum sonrası kriptografi",
      "Ağ güvenliği ve TLS",
      "Güvenli yazılım geliştirme",
    ],
  },
  quiz: [
    {
      question: "Deniz feneri metni Sezar'la (k = 3) şifrelenince çakışma indeksi 0.0594, LİMON anahtarlı Vigenère'le şifrelenince 0.0368 ölçülüyor. Hangi açıklama doğrudur?",
      options: [
        "Vigenère harflerin bir bölümünü attığı için metin kısalır; IC, harf sayısı azaldıkça kendiliğinden düşen bir ölçüdür",
        "Sezar'da IC'nin yüksek çıkması k'nin küçük olmasındandır; k = 20 gibi büyük bir kaydırmada o da 0.0345'e iner",
        "Sezar sıklıkları yalnızca başka harflere taşır; Vigenère beş kaydırmayı karıştırıp dağılımı düzler, ama beş sütunun her birinde IC yine 0.059 dolayındadır",
        "IC yalnızca alfabenin harf sayısına bağlıdır; iki değer arasındaki fark 766 harflik metnin ölçüm gürültüsüdür",
      ],
      answer: 2,
      explanation:
        "IC, harflerin adına değil sıklıkların ne kadar eşitsiz olduğuna bakar; tek bir kaydırma bunu hiçbir k için değiştirmez. Beş farklı kaydırma üst üste binince dağılım düzleşir ve IC 1/29 = 0.0345'e yaklaşır. Metni beş sütuna bölen kişi her sütunda tek kaydırma bulur: sayfada m = 5 satırının ortalama IC'si 0.0593'tür. Anahtar uzunluğunu ele veren şey tam bu sıçramadır.",
    },
    {
      question: "PBKDF2'de yineleme sayısı c 1000'den 100 000'e çıkarılıyor. Bu, rastgele seçilmiş bir parolaya yaklaşık kaç bit eklemekle aynı işi görür?",
      options: [
        "Yaklaşık 17 bit, çünkü 100 000 ≈ 2¹⁷",
        "Yaklaşık 6.6 bit: 62'lik kümeden bir karakterden (5.95 bit) biraz fazla",
        "Yaklaşık 100 bit, çünkü maliyet 100 kat artar",
        "Hiç; yineleme sayısı saldırganın işini değiştirmez",
      ],
      answer: 1,
      explanation:
        "Tahmin başına maliyet 2c + 2 sıkıştırma çağrısıdır: 2002'den 200 002'ye, yani 99.9 katına çıkar. Süreyi 99.9 katına çıkarmak, olasılık sayısını 99.9 katına çıkarmakla aynı etkiyi yapar: log₂99.9 ≈ 6.6 bit. Önemli olan artışın oranıdır, c'nin kendisi değil. Parolaya tek bir rastgele karakter eklemek de kabaca bunu sağlar; ikisi birlikte kullanılır, biri ötekinin yerini tutmaz.",
    },
    {
      question: "Özetin ilk 16 biti tutulduğunda ilk çakışma için kesin beklenen değer 321.5 denemedir. İlk 24 bit tutulursa (yaklaşık 16.8 milyon olası değer) kaç deneme beklenir?",
      options: [
        "Yaklaşık 640: 8 bit fazlası işi iki katına çıkarır",
        "Yaklaşık 82 000: 256 katı",
        "Yaklaşık 8.4 milyon: uzayın yarısı",
        "Yaklaşık 5100: 16 katı",
      ],
      answer: 3,
      explanation:
        "Beklenen deneme √(π·2ᵏ/2) ile, yani 2^(k/2) ile büyür. k sekiz bit artınca uzay 256 katına, deneme sayısı √256 = 16 katına çıkar: 321.5 · 16 ≈ 5100 (sayfanın kesin değeri 5134.2). Uzayın yarısı, belirli tek bir değeri arayan içindir; herhangi iki iletinin çakışması çift sayısı n(n − 1)/2 ile büyüdüğü için çok daha erken gelir.",
    },
  ],
  next: [
    { href: "asal-rsa.html", title: "Asal Sayılar ve RSA: Elekten Şifreye", why: "RSA'nın tam hâli: Öklid algoritmasını, Euler teoremini ve hızlı üs almayı tabloda izle, iki asaldan anahtar kur, sonra küçük bir anahtarı çarpanlarına ayırarak kır." },
    { href: "sezar-sifre.html", title: "Sezar Şifresi: Harf Değişir, İz Kalır", why: "İlk sekmenin tek şifreye ayrılmış hâli: alfabeyi kaydır, bütün anahtarları dene ve şifreli metinde kalan sıklık izini say." },
    { href: "enigma-makinesi.html", title: "Enigma: Rotor, Adım ve Elektrik Yolu", why: "Bir harfin rotorlar ve yansıtıcıdaki yolunu izle; çift adımlamayı ve aynı başlangıç ayarının çözme için neden gerektiğini araştır." },
    { href: "internet-ve-ag-teknolojileri.html", title: "İnternet ve Ağ Teknolojileri: Paket, Pencere, Önek, Ad", why: "Bir paketi yönlendiriciler arasında yürüt, kayıplı kanalda güvenilir aktarımı ölç, CIDR bloklarını böl ve bir alan adını çöz: buradaki anahtar değişiminin üstünde çalıştığı ağ." },
  ],
  sources: [
    { title: "Wikipedia · Diffie–Hellman key exchange", url: "https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange", note: "Protokolün tarihi, GCHQ'daki gizli keşfin 1997'de açıklanması ve en az 2048 bitlik asal önerisiyle birlikte güvenlik tartışması (İngilizce)." },
    { title: "Wikipedia · SHA-1", url: "https://en.wikipedia.org/wiki/SHA-1", note: "Şubat 2017'deki SHAttered çakışması: iki PDF, yaklaşık 2⁶³ işlem, 6.500 işlemci yılı ve 110 GPU yılı; özet fonksiyonlarının nasıl eskidiğinin öyküsü (İngilizce)." },
    { title: "MDN · SubtleCrypto.digest()", url: "https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest", note: "Tarayıcının yerleşik SHA-256 işlevi. Sayfa özeti kendi yazdığı kodla hesaplar; aynı iletiyi bu API'ye verip sonucu karşılaştırarak kendi deneylerine başlayabilirsin." },
    { title: "NIST · Cryptography", url: "https://www.nist.gov/cryptography", note: "AES, SHA-2 ve kuantum sonrası standartları yayımlayan kurumun giriş sayfası; standartların güncel durumu için (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
