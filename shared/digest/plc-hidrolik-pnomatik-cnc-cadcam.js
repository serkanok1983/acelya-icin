window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["plc-hidrolik-pnomatik-cnc-cadcam"] = {
  slug: "plc-hidrolik-pnomatik-cnc-cadcam",
  title: "Otomasyon: Beyin, Kas ve Dijital Köprü",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir otomasyon hattının dört katmanı: tarama tarama karar veren merdiven programı, sıraya giren pnömatik silindirler, tezgâhın okuduğu G-kodu ve o kodu üreten takım yolu hesabı. Dördünü de çalıştır, ölç, kuramla kıyasla.",
  hook:
    "Bir pres hattında durdurma butonunun kablosu kopsa makine ne yapmalı? İyi kurulmuş bir devrede yanıt bellidir: durmalı. 1960'larda bu yanıtı dolaplar dolusu röle veriyordu ve model her değiştiğinde hepsinin kablosu yeniden çekiliyordu. Bugün aynı işi, saniyede yüzlerce kez aynı üç adımı yineleyen bir program yapıyor: girişleri oku, basamakları çöz, çıkışları yaz.",
  bigIdea:
    "Otomasyonda her katman dünyayı kendi penceresinden görür: PLC yalnız <strong>tarama anlarında</strong> bakar, pnömatik valf <strong>son gelen sinyali</strong> hatırlar, tezgâh çizimi değil <strong>takım merkezinin yolunu</strong> izler; kâğıtta doğru görünen mantık, bu pencereler hesaba katılmadıkça sahada takılır.",
  story: [
    "Blaise Pascal 1650'lerde, kapalı bir sıvıya uygulanan basıncın her yöne aynen iletildiğini yazdı; bu, bir gün tonlarca yükü kaldıracak fikrin kâğıttaki ilk hâliydi. Fikri makineye çeviren kişi İngiliz mucit Joseph Bramah oldu: 1795'te iki silindirli hidrolik presin patentini aldı. Küçük pistondaki mütevazı kuvvet, alan oranı kadar büyüyerek büyük pistona geçiyordu. Presin asıl sorunu sızdırmazlıktı; Bramah'nın atölyesinde çalışan Henry Maudslay'ye atfedilen deri conta, basınç arttıkça silindir duvarına daha sıkı yaslanarak bu sorunu çözdü. On dokuzuncu yüzyılın sonunda Londra'da sokakların altına döşenen basınçlı su boruları vinçleri ve asansörleri çalıştırıyordu; 1894'te açılan Tower Bridge'in kanatlarını ise köprünün kendi buhar makinelerinin doldurduğu altı hidrolik akümülatördeki basınçlı su kaldırıyordu. Bu sayfadaki pnömatik silindirler aynı çarpımı, basınç çarpı alanı, havayla yapar; yağlı hâli <a href='hidrolik-sistemler.html'>Hidrolik Sistemler</a> sayfasındadır.",
    "Fabrikanın beyni çok daha gençtir. 1960'ların sonunda otomobil fabrikalarının montaj hatları dolaplar dolusu <strong>röle</strong> ile yönetiliyordu: elektromıknatısla açılıp kapanan mekanik anahtarlar. Her yeni modelde panolar sökülüp yeniden kablolanıyordu. 1968'de General Motors'un Hydramatic bölümü, röle panosunun yerine geçecek programlanabilir bir denetleyici için şartname yayımladı. Yarışı Bedford Associates kazandı; Dick Morley ve arkadaşlarının 1969'da kurduğu Modicon 084, fabrika ortamına dayanacak biçimde tasarlanmış, röle mantığını yazılımla taklit eden bir bilgisayardı. Can alıcı tercih programlama dili oldu: ilk PLC'ler, fabrika elektrikçilerinin zaten okuduğu röle şemasına benzeyen <strong>merdiven (ladder) diyagramıyla</strong> programlandı. Elektrikçi yeni bir dil öğrenmedi; kabloyu çizgiye, röleyi sembole çevirdi. Sayfanın ilk programındaki üç kontak ve bir bobin, o fikrin en küçük örneğidir.",
    "Tezgâhların bilgisayarla buluşması daha erken başladı. 1940'larda Michigan'da helikopter pali parçaları üreten John T. Parsons ile mühendisi Frank Stulen, pal profilinin koordinatlarını delikli kart makineleriyle hesaplıyordu; Parsons 1949'da ABD Hava Kuvvetleri'nden aldığı destekle bu sayıları doğrudan bir tezgâha vermek istedi. İş MIT'nin Servomekanizma Laboratuvarı'na geçti; laboratuvar 1950'de ihtiyaç fazlası bir Cincinnati Hydro-Tel frezesi aldı ve Eylül 1952'de, delikli şeritten okuduğu komutlarla üç eksende hareket eden tezgâhı gösterdi: <strong>sayısal kontrolün</strong> (NC) doğuşu. Sonraki sorun, her parça için binlerce koordinatı elle yazmaktı; MIT'de Douglas Ross'un ekibinin 1950'lerin ikinci yarısında geliştirdiği APT dili bunu bilgisayara yaptırdı. Komutların bugünkü kısa hâli, 'G01 X50 F200' gibi satırlar, 1963'te ABD'de Elektronik Sanayicileri Birliği'nin (EIA) RS-274 standardında toplandı; G-kodu bu yüzden hâlâ delikli şerit çağının tutumlu üslubunu taşır.",
    "Çizimin kendisi bilgisayara 1963'te girdi: Ivan Sutherland'ın MIT'deki doktora tezi Sketchpad, ışıklı kalemle ekrana çizilen şekillere 'bu iki çizgi dik kalsın' gibi kısıtlar koyabiliyordu. Aynı yıllarda Citroën'de Paul de Casteljau ve Renault'da Pierre Bézier, otomobil kaportasının kıvrımlarını birkaç kontrol noktasıyla tarif eden eğrileri geliştirdi; bugün CAD yüzeylerinin ve yazı tiplerinin altında o eğriler yatar. 1980'lerin sonunda Pro/ENGINEER, ölçüleri sonradan değiştirilebilen <strong>parametrik</strong> modellemeyi yaygınlaştırdı. Böylece zincir tamamlandı: CAD modeli, CAM yazılımında takım yoluna, son işlemcide (post-processor) tezgâha özel G-koduna, tezgâhta da talaşa dönüşür. PLC ise o tezgâhın kapısını, hidrolik mengenesini ve pnömatik takım değiştiricisini yönetir.",
  ],
  core: [
    {
      heading: "Tarama çevrimi ve mühür: tek basamakta bir bitlik bellek",
      body:
        "PLC, programını sonsuz bir döngüde <strong>tarar</strong>: önce bütün girişleri okuyup bir <strong>giriş görüntüsüne</strong> kopyalar, sonra basamakları yukarıdan aşağıya çözer, en sonda çıkışları yazar. Merdivenin iki dikey rayı güç hattıdır; her basamak 'güç soldan sağa geçer mi?' sorusudur. Seri kontaklar VE, paralel kollar VEYA demektir. Sayfanın ilk programı tek basamaktır: <code>(BAŞLAT | MOTOR) &amp; DUR -&gt; MOTOR</code>. BAŞLAT'a paralel duran MOTOR kontağı <strong>mühürdür</strong>: motor bir kez çalışınca kendi kontağı butonun yerini alır. Eşitliğin sağındaki MOTOR bir önceki taramadan kalan değerdir; basamak bu yüzden bir bellek elemanıdır ve aynı girişlerle (BAŞLAT = 0, DUR = 1) motor hem durmuş hem çalışıyor olabilir. DUR sahada <strong>normalde kapalı (NK)</strong> bir butondur: basılmadıkça girişi 1 tutar, program da onu düz kontakla okur. Butona basmak da kablonun kopması da girişi 0 yapar; arıza makineyi çalıştırmaz, durdurur. Sayfanın uyarısı burada da geçerli: bu bir güvenlik devresi tasarımı değildir, gerçek acil durdurma ayrı ve sertifikalı donanımla kurulur.",
      formula: "MOTOR = (BAŞLAT ∨ MOTOR) ∧ DUR",
      formulaNote: "∨ VEYA, ∧ VE; DUR, butona basılmadığında 1 okunan giriştir. Sağdaki MOTOR bir önceki taramanın sonucudur. Dene: (1 ∨ 0) ∧ 1 = 1; buton bırakılınca (0 ∨ 1) ∧ 1 = 1; DUR = 0 olunca (0 ∨ 1) ∧ 0 = 0 ve mühür düşer.",
    },
    {
      heading: "Zaman taramayla nicelenir, basamak sırası sonucu değiştirir",
      body:
        "PLC dünyaya sürekli bakmaz; yalnız tarama anlarında bakar. Bunun ölçülebilir iki sonucu vardır. Birincisi zamanla ilgilidir. Sayfadaki modelde TON zamanlayıcısı, girişini 1 gördüğü ilk taramada saymaya başlar ve sürenin dolduğunu ancak bir tarama anında fark edebilir. Ayarı PT, tarama süresi T ise o ilk taramadan sayılan gecikme PT'nin bir üst tarama katıdır; fark hiçbir zaman T'yi bulmaz. Anahtarı çevirdiğin an ile onu okuyan ilk tarama arasında da T'ye varan bir bekleme vardır; kart onu saymaz. PT = 2 s için T = 100 ms'de fark sıfırdır, T = 150 ms'de gecikme 2.100 ms olur. İkincisi sırayla ilgilidir: bir basamağın yazdığı biti aynı taramada yalnız altındaki basamaklar görür, üsttekiler eski değeri okumuştur. 'Tek taramalık darbe' programı bunu bilerek kullanır: üstte <code>B &amp; !ESKİ -&gt; DARBE</code>, altta <code>B -&gt; ESKİ</code> durur. Butona basılan taramada ESKİ henüz 0'dır ve DARBE tam bir tarama boyunca 1 olur. İki basamağın yeri değişirse ESKİ önce güncellenir, darbe hiç oluşmaz. Röle panosunda bütün kontaklar aynı anda canlıdır; programda ise sıra, mantığın bir parçasıdır. Gerçek PLC'lerde zamanlayıcının saati taramadan bağımsız akar, ama çıkışı yine ancak bir taramada görülür.",
      formula: "t<sub>ölçülen</sub> = ⌈PT/T⌉·T,   PT ≤ t<sub>ölçülen</sub> &lt; PT + T",
      formulaNote: "⌈x⌉ yukarı yuvarlamadır. PT = 2.000 ms için: T = 70 ms → 29 tarama = 2.030 ms; T = 150 ms → 14 tarama = 2.100 ms; T = 100 ms → tam 2.000 ms. Sayfa bunu 'Son biten zamanlayıcı: girişi ilk gören taramadan Q'ya (ölçülen)' kartında gösterir; süre, girişin okunduğu ilk taramadan sayılır.",
    },
    {
      heading: "Çift pilotlu valf bir bellektir: çakışma ve kaskat",
      body:
        "Pnömatik silindirin kuvveti tek bir çarpımdır: gösterge basıncı çarpı piston alanı. Dönüşte mil kesiti alanı küçülttüğü için silindir çekerken, iterken olduğundan zayıftır. Asıl incelik kuvvette değil sıradadır. Silindiri süren çift pilotlu 5/2 valf, son gelen pilot sinyalinin konumunda kalır; iki pilotu birden basınçlıysa kıpırdayamaz. Buna <strong>sinyal çakışması</strong> denir. A+ B+ A− B− sırasında her sinyal geldiğinde karşıtı çoktan bırakılmıştır; devre doğrudan bağlanır. A+ B+ B− A− sırasında ise B'yi geri çekecek b1 sinyali geldiğinde, B'yi ileri süren a1 hâlâ basılıdır; başlangıçta da b0, A'yı geride tutan pilotu besler. <strong>Kaskat</strong> bağlantı hareketleri, aynı silindirin iki yönü aynı gruba düşmeyecek biçimde gruplar (G1 = {A+, B+}, G2 = {B−, A−}) ve bir bellek valfiyle her an yalnız bir grup hattını basınçlı tutar: grup değişince eski grubun bütün sinyalleri birlikte söner. Sayfadaki model mantık düzeyindedir; piston sabit hızla gider. Gerçekte hava sıkışır: pnömatik silindir yük değişince bir yay gibi esner, hızı da yüke bağlıdır.",
      formula: "F<sub>ileri</sub> = p·A,   F<sub>geri</sub> = p·(A − a),   V<sub>serbest</sub> = [A + (A − a)]·s·(p + p₀)/p₀",
      formulaNote: "A = πD²/4 piston alanı, a = πd²/4 mil kesiti; p gösterge basıncı (1 bar = 100.000 Pa), p₀ = 1,01325 bar, s bir çevrimdeki toplam strok. Varsayılan değerlerle (6 bar, D = 50 mm, d = 20 mm, 200 + 100 mm) sayfa 1.178 N, 990 N ve 7,502 L/çevrim yazar; kuvvetler sürtünmesiz üst sınırdır.",
    },
    {
      heading: "G-kodu: modal sözcükler ve yay sınaması",
      body:
        "Bir G-kodu satırı birkaç sözcükten oluşur: G hareketin türünü (G0 hızlı konumlama, G1 doğrusal kesme, G2 saat yönünde, G3 tersine yay), X Y Z hedef noktayı, F ilerlemeyi, S devri, M makine işlevlerini (M3 iş milini aç, M30 program sonu) verir. Çoğu sözcük <strong>modaldır</strong>: bir kez yazılan F600 ya da G1, değiştirilene kadar geçerli kalır; 'Kare çevre' programında F600 yalnız ilk kenarda yazılıdır. Yay satırı daha fazla bilgi taşır: bitiş noktası, I ve J ile başlangıca göre verilen merkez ve yön. Üçü birbirini tutmak zorundadır. Kontrolcü, merkezin başlangıca ve bitişe uzaklığını karşılaştırır; sayfadaki yorumlayıcı fark 0,01 mm'yi aşarsa satır numarasıyla hata verir ve bütün programı reddeder. Tutarlı bir yayın boyu, yarıçap çarpı süpürülen açıdır; süre, her bloğun boyunun kendi ilerlemesine bölümlerinin toplamıdır. Sayfa aynı yolu bir de kontrolcü gibi ölçer: her 10 ms'de bir konum hesaplar ve ardışık konumlar arasındaki kirişleri toplar. Kiriş yaydan kısa olduğu için ölçülen boy bir parça eksik çıkar. Model ivmelenmeyi yok sayar; gerçek tezgâh köşelerde yavaşlar ve süre uzar.",
      formula: "r₀ = |başlangıç − merkez|,   r₁ = |bitiş − merkez|,   boy = r·|Δθ|,   t = Σ boy/F",
      formulaNote: "'İki yayla çember' programı: 6 mm dalma ve iki yarım çember, 6 + 2π·20 = 131,664 mm. 'Hatalı yay'da I15 merkezi X25 Y30'a koyar: r₀ = 15 mm, r₁ = 25 mm; iki noktadan da geçen, merkezi orada olan bir çember yoktur.",
    },
    {
      heading: "Kesme verileri ve küresel ucun bıraktığı iz",
      body:
        "CAM yazılımı takım yolunu üretirken birkaç sayıyı birbirine bağlar. Kesme hızı V<sub>c</sub>, takım çevresinin malzemeye göre hızıdır; devir ondan çıkar: n = 1000·V<sub>c</sub>/(π·D). Her kesici ağız bir turda f<sub>z</sub> kadar ilerlerse tabla hızı v<sub>f</sub> = f<sub>z</sub>·z·n olur. Dakikada kaldırılan talaş hacmi, kesitin ilerlemeyle çarpımıdır: Q = a<sub>e</sub>·a<sub>p</sub>·v<sub>f</sub>. Takım küçüldükçe aynı kesme hızı daha yüksek devir ister; iş milinin tavanına çarpınca gerçek kesme hızı düşer. Yüzey de geometriyle hesaplanır. R yarıçaplı küresel uç, s aralıklı komşu geçişlerde iki dairenin kesiştiği yükseklikte bir sırt bırakır. Dik üçgenden h = R − √(R² − s²/4) çıkar; s, R'den çok küçükken karekök seriye açılırsa h ≈ s²/(8R) kalır. Sonuç bir ölçekleme yasasıdır: yanal adımı yarıya indirmek izi dörtte bire düşürür, geçiş sayısını ise iki katına çıkarır. Sayfadaki V<sub>c</sub> ve f<sub>z</sub> listesi öğretim değerleridir; gerçek değerler takım üreticisinin kataloğundan seçilir. Kesme kuvveti, iş mili gücü, takım sehimi ve takım ömrü bu hesapta yoktur.",
      formula: "n = 1000·V<sub>c</sub>/(π·D),   v<sub>f</sub> = f<sub>z</sub>·z·n,   h = R − √(R² − s²/4) ≈ s²/(8R)",
      formulaNote: "V<sub>c</sub> m/dak, D mm, n dev/dak; f<sub>z</sub> mm/diş, v<sub>f</sub> mm/dak. Varsayılan değerler (120 m/dak, D = 10 mm, z = 4, f<sub>z</sub> = 0,05 mm) 3.820 dev/dak ve 763,9 mm/dak verir; a<sub>e</sub> = 5 mm, a<sub>p</sub> = 5 mm ile Q = 19,1 cm³/dak. R = 3 mm, s = 1 mm için h = 41,96 µm, yaklaşık formül 41,67 µm.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmedir: <strong>01 · Merdiven mantığı (PLC)</strong>, <strong>02 · Pnömatik sıralama</strong>, <strong>03 · CNC ve G-kodu</strong>, <strong>04 · CAM: kesme ve takım yolu</strong>. PLC sekmesinde <strong>Hazır program</strong> menüsünden bir program seçer, saha girişlerine basar, çevrimi <strong>Tek tarama</strong> ile adım adım ya da <strong>Çalıştır</strong> ile gerçek zamanlı yürütürsün; butonlar basılı tutulduğu sürece basılıdır, kısa bir dokunuş bir sonraki taramada okunur. Pnömatikte <strong>Sonraki olaya ilerle</strong> bir sonraki uç konuma atlar. CNC'de yazı alanını değiştirince <strong>Programı yükle</strong>'ye basman gerekir. CAM'de <strong>Görünüm</strong> menüsü üç ayrı hesap arasında geçiş yapar. Her sekmede simülasyonun ölçtüğü değer formülün verdiğinin yanında durur ve bir <strong>Bu deneyi sıfırla</strong> düğmesi vardır. Aşağıdaki sayılar sayfanın biçimiyle yazıldı: ondalık virgül, binlik nokta.",
    experiments: [
      {
        title: "Mühür, durdurma ve kopan kablo",
        predict: "Mühürlenmiş motor çalışırken DUR butonunun kablosu koparsa ne olur? Kablo onarılınca motor kendiliğinden kalkar mı? Aynı devre normalde açık (NA) bir durdurma butonuyla kurulsaydı kopuk kablo fark edilir miydi?",
        do: "01 sekmesini sıfırla. BAŞLAT'a dokun, <strong>Tek tarama</strong>'ya bas; bir kez daha bas. <strong>Kablo arızası</strong> menüsünden 'DUR girişinin kablosu kopuk'u seçip bir tarama yürüt; sonra 'Yok: bütün kablolar sağlam'a dön ve bir tarama daha yürüt. Ardından <strong>Hazır program</strong>'dan 'Aynı devre, NA durdurma butonuyla'yı seç: BAŞLAT'a dokunup tara, DUR kablosunu kopar, DUR'a dokunup yeniden tara.",
        observe: "İlk taramada giriş görüntüsü 'BAŞLAT = 1 · DUR = 1', lamba 'MOTOR = 1' olur; ikincide görüntü 'BAŞLAT = 0 · DUR = 1'e döner ama motor çalışmayı sürdürür. Kablo kopunca 'BAŞLAT = 0 · DUR = 0' okunur ve 'MOTOR = 0' olur; kablo onarılınca motor durmuş kalır. NA butonlu devrede kablo kopukken DUR'a basman hiçbir şeyi değiştirmez: 'MOTOR = 1' kalır, durum satırı 'butona basılsa da PLC bunu göremez' der.",
        explain: "Mühür, (0 ∨ 1) ∧ 1 = 1 eşitliğidir: motor kendi kontağından beslenir. NK buton basılmadıkça 1 verir; kopuk kablo PLC'ye butona basılmış gibi görünür, (0 ∨ 1) ∧ 0 = 0 olur ve mühür düşer. Onarımdan sonra (0 ∨ 0) ∧ 1 = 0: makine ancak bilinçli bir BAŞLAT ile kalkar. NA butonda 'dur' bilgisi akımın gelmesidir; kablo kopunca o bilgi hiç gelemez. Güvenli tasarım, arızanın sinyali kestiği yönü 'dur' olarak seçer.",
      },
      {
        title: "Kâğıtta doğru, devrede takılan sıra",
        predict: "A+ B+ A− B− sırası 200 mm ve 100 mm strokla, 0,2 m/s piston hızıyla kaç saniye sürer? Sırayı A+ B+ B− A− yapıp aynı doğrudan bağlantıyı kullanırsan çevrim uzar mı, kısalır mı, yoksa başka bir şey mi olur?",
        do: "02 sekmesini sıfırla. <strong>Sonraki olaya ilerle</strong>'ye dört kez bas; çevrim süresi ve serbest hava kartlarını, yol–adım diyagramının altındaki zamanları oku. <strong>Hareket sırası ve bağlantı</strong> menüsünden 'A+ B+ B− A− · doğrudan bağlantı (çakışır)' seç ve <strong>BAŞLAT</strong>'a bas; durum satırını ve pilot sinyalleri tablosunu oku. Sonra 'A+ B+ B− A− · kaskat (bellek valfli)' seçip dört kez ilerle.",
        observe: "İlk sırada olaylar 1, 1,5, 2,5 ve 3 s'de biter: ölçülen çevrim '3 s', kuram '3 s · %0', hava '7,502 L (1 çevrim)'. Doğrudan bağlı ikinci sırada hiçbir şey kıpırdamaz: 0,3 s'lik darbe bitince durum satırı 'Sinyal çakışması yüzünden sıra hiç başlamadı' diye başlar, tabloda A+ satırı 'BAŞLAT darbesinde çakıştı: valf yerinde kaldı' der. Alttaki kutu, 1. adımda (A+) ve 3. adımda (B−) karşı pilotun basınçlı olduğunu yazar. Kaskatta sıra yürür: olaylar 1, 1,5, 2 ve 3 s'de biter, çevrim yine 3 s'dir.",
        explain: "Süre yalnız toplam yola bağlıdır: 2·(0,2 m + 0,1 m) / 0,2 m/s = 3 s; hareketlerin sırası onu değiştirmez. Değişen, sinyallerin birbirini bırakıp bırakmadığıdır. İkinci sırada başlangıçta b0 basılıdır ve A− pilotunu besler; BAŞLAT'ın A+ sinyali karşısında basınç bulur. Kaskat, sınır anahtarlarının havasını grup hattından verir: G1 basınçlıyken G2'ye bağlı b0 sinyali kaynağından kesilmiştir. Bedeli bir bellek valfi ve iki hattır; uzun sıralar bu yüzden PLC ile kurulur.",
      },
      {
        title: "Yay tutmazsa tezgâh durur",
        predict: "Bir G2 satırında başlangıç X10 Y30, bitiş X50 Y30, merkez ofseti I15 J0. Kontrolcü bu yayı çizer mi? I20 yazılsaydı kesme yolu kaç milimetre olurdu? G2'yi G3 yaparsan yolun boyu değişir mi?",
        do: "03 sekmesinde <strong>Hazır program</strong>'dan 'Hatalı yay: uç yarıçapı tutmuyor'u seç ve hata listesini oku. Yazı alanında I15'i I20 yap, <strong>Programı yükle</strong>'ye bas; kesme yolu kartlarını oku, <strong>Çalıştır</strong> ile yolu izle. Sonra 'İki yayla çember, R20'yi seç, iki yay satırının başındaki G2'yi G3 yap, yeniden yükle ve hareket blokları tablosuna bak.",
        observe: "Hata listesi 'Satır 7: Yay tutarsız: başlangıç yarıçapı 15,000 mm, bitiş yarıçapı 25,000 mm' yazar; durum satırı bütün yolun reddedildiğini söyler ve tuvalde yol çizilmez. I20 ile hata kalkar: kesme yolu '68,832 mm', kuramsal toplam süre 13,54 s olur. Çember programında boy G2 ile de G3 ile de '131,664 mm'dir; tabloda yaylar 'G3 yay, R 20, 180°' diye görünür ve yön okları tersine döner.",
        explain: "I15 merkezi X25 Y30'a koyar: başlangıç 15 mm, bitiş 25 mm uzaktadır; ikisinden de geçen, merkezi orada olan bir çember yoktur. I20 ile merkez X30 Y30 olur ve yarım çember çıkar: 6 mm dalma + π·20 mm = 68,832 mm. Yön değişince takım aynı iki nokta arasında çemberin öbür yarısını keser; yarılar eşit olduğu için boy değişmez, yalnız dolaşma yönü döner. Tutarsız yayı reddetmek bir titizlik değildir: yanlış merkez, yanlış yerden kesilmiş malzeme demektir.",
      },
      {
        title: "Takımın yarıçapı: telafi ve iz yüksekliği",
        predict: "10 mm çaplı takım 60 × 40 mm'lik bir cebin içinden dolanırken merkezi kaç milimetre yol gider; aynı dikdörtgenin dışından dolanırken kaç? İç köşeler keskin çıkar mı? Küresel uçta yanal adımı 1 mm'den 0,5 mm'ye indirince iz yüksekliği yarıya mı iner?",
        do: "04 sekmesinde <strong>Görünüm</strong>'den 'Takım yarıçapı telafisi'ni seç ve dört kartı oku. <strong>Takım hangi yanda?</strong> menüsünü 'Dışarıda: ada' yapıp yeniden oku. Sonra görünümü 'Küresel uç: iz yüksekliği' yap; <strong>Geçişler arası yanal adım s</strong> kaydırıcısını 1, 0,5 ve 2 mm'ye getirerek ölçülen, tam ve yaklaşık değerleri karşılaştır. Son olarak s'yi 6 mm yap.",
        observe: "İçeride yol '160 mm' (kontur çevresi 200 mm), kesilemeyen köşe alanı ızgarayla '21,28 mm² (ızgara payı ±%4)', formülle '21,46 mm² · %−0,85'. Dışarıda ölçülen yol '231,414 mm', formül '231,416 mm · %0', kalan alan '0 mm² (iç köşe yok)'. Küresel uçta R = 3 mm için s = 1 mm '41,96 µm', s = 0,5 mm '10,43 µm', s = 2 mm '171,57 µm' verir; yaklaşık formül 2 mm'de '166,67 µm' ile %−2,86 geride kalır. s = 6 mm'de kart 'tanımsız: s ≥ 2R' yazar.",
        explain: "İçeride her kenar iki ucundan r = 5 mm kısalır: 200 − 8·5 = 160 mm. Takım köşeye sığmaz; her köşede r²(1 − π/4) kadar malzeme kalır, dördü 21,46 mm² eder. Dışarıda merkez her köşede çeyrek çember çizer: 200 + 2π·5 = 231,416 mm, köşeler keskin kalır. Ölçülen yol binde birkaç milimetre kısadır, çünkü yaylar 2°'lik kirişlerle toplanır; alandaki fark ızgaranın çözünürlüğüdür ve küçük alanlarda büyür (altıgende, içeride: 8,36'ya karşı 8,06 mm², %+3,7); kart bu yüzden ±%4 payını yanında taşır. İz yüksekliği s² ile ölçeklenir: adım yarıya inince iz dörtte bire iner, geçiş sayısı iki katına çıkar.",
      },
    ],
  },
  wow: [
    {
      title: "84'üncü proje",
      body:
        "Modicon 084'ün adındaki sayı, Bedford Associates'in 84'üncü projesi olmasından gelir; Modicon ise 'MOdular DIgital CONtroller'ın kısaltmasıdır. Dick Morley, fikrin ilk notlarını 1 Ocak 1968'de, yılbaşı sabahı yazdığını anlatırdı. İlk 084, 1969'da General Motors için kuruldu. O günden beri bir PLC'nin programını fabrika elektrikçisi okuyabilir; bu, bir tasarım tercihinin elli yılı aşan ömrüdür.",
    },
    {
      title: "Elli bin tonluk pres hâlâ çalışıyor",
      body:
        "1955'te ABD Hava Kuvvetleri'nin Ağır Pres Programı kapsamında Cleveland'da kurulan Alcoa presi 50.000 ton-kuvvet, yani yaklaşık 445 meganewton uygular ve hafif alaşım kütüklerini uçakların tek parça taşıyıcı elemanlarına döver. Bütün o kuvvet tek bir çarpımdır: silindirlerdeki basınç çarpı piston alanı. Pres onarılıp yenilenerek bugün de üretimde tutuluyor; 1981'de Amerikan Makine Mühendisleri Derneği (ASME) onu tarihî mühendislik anıtı ilan etti.",
    },
    {
      title: "Işıklı kalemle çizilen ilk CAD",
      body:
        "1963'te Ivan Sutherland, MIT Lincoln Laboratuvarı'ndaki TX-2 bilgisayarında Sketchpad'i çalıştırdı: ekrana ışıklı kalemle çizilen çizgiler 'paralel kalsın', 'eşit uzunlukta olsun' gibi kısıtlarla bağlanabiliyor, bir köşeyi çekince bütün şekil kurallara uyarak yeniden hesaplanıyordu. Grafik arayüzlerin ve bugünkü kısıt tabanlı, parametrik CAD'in öncüsü sayılan bu çalışma bir doktora teziydi. Sutherland 1988'de Turing Ödülü'nü aldı.",
    },
  ],
  worked: {
    title: "Tarama süresi bir gecikmeyi ve bir trafik ışığını ne kadar uzatır?",
    prompt:
      "'Gecikmeler: TON ve TOF' programında T1 zamanlayıcısının ayarı PT = 2 s'dir. (a) Tarama süresi T = 150 ms ve T = 70 ms iken ölçülen gecikme ne olur? (b) 'Trafik ışığı dizisi'nde üç TON art arda bağlıdır: 3 s, 3 s ve 1 s. T = 100 ms ve T = 250 ms için KIRMIZI'nın iki yanışı arasındaki süreyi bul. Model: zamanlayıcı, girişini 1 gördüğü ilk taramada başlar; dolup dolmadığına yalnız tarama anlarında bakılır.",
    steps: [
      "Kural: TON, girişini ilk gördüğü taramada başlar; bu taramadan k tarama sonra k·T kadar süre geçtiğini görür. Q çıkışı, k·T ≥ PT koşulunu sağlayan ilk taramada 1 olur; yani k = ⌈PT/T⌉. İlk taramadan ölçülen gecikme k·T'dir ve PT ≤ k·T &lt; PT + T aralığında kalır. Anahtarın çevrildiği andan saymak istersen buna, o ilk taramayı bekleme süresini (0 ile T arası) eklersin.",
      "T = 150 ms: 2.000 ms / 150 ms = 13,33…; k = 14, gecikme 14 × 150 ms = 2.100 ms, fark +100 ms (%+5). T = 70 ms: 2.000 / 70 = 28,57…; k = 29, gecikme 29 × 70 ms = 2.030 ms, fark +30 ms (%+1,5). T = 100 ms'de bölüm tam 20 çıkar ve fark sıfırdır.",
      "Trafik ışığı, T = 100 ms: 3 s, 3 s ve 1 s'nin üçü de T'nin tam katıdır, yuvarlama farkı yoktur; ΣPT = 7.000 ms = 70 tarama. Çevrim yine de 70 tarama sürmez. T3'ün dolduğu taramada, en üstteki T1 basamağı çoktan çözülmüş ve T3'ü 0 okumuştur.",
      "Bir sonraki taramada T1 basamağı T3 = 1 görür ve T1 sıfırlanır; aynı taramada altındaki T2 ve T3 de sıfırlanır. T1 yeniden saymaya ancak ondan sonraki taramada başlar. Zincire böylece iki tarama eklenir: periyot = ΣPT + 2T = 7.000 ms + 200 ms = 7,2 s, fark %+2,86.",
      "T = 250 ms: 3 s = 12 tarama, 1 s = 4 tarama; yine tam katlar. Periyot = 7.000 ms + 2 × 250 ms = 7,5 s, fark %+7,14. Bağıl hata 2T/ΣPT'dir: tarama süresi 2,5 katına çıkınca hata da 2,5 katına çıkar.",
    ],
    result:
      "Gecikme T = 150 ms'de 2.100 ms, T = 70 ms'de 2.030 ms; trafik ışığının periyodu T = 100 ms'de 7,2 s, T = 250 ms'de 7,5 s. Sayfada doğrula: 01 sekmesinde programı seç, önce <strong>Tarama süresi T</strong>'yi ayarla (kaydırıcı programı baştan yükler), sonra S1'i ya da ÇALIŞ'ı aç ve <strong>Çalıştır</strong>'a bas. Kartlar 'T1 (TON): 2.100 ms' ve '2.000 ms · +100 ms (%+5)' yazar. Trafik ışığında en az iki tam çevrim (15 s kadar) bekle: kart önce 'KIRMIZI: 7,1 s (1. periyot, açılıştan)' gösterir, çünkü açılışta T1 beklemeden başlar ve ilk çevrim bir tarama kısa çıkar; ikinci çevrimden sonra 'KIRMIZI: 7,2 s (2. periyot)' ve '7 s · +2 tarama (%+2,86)' okunur. Sonuç, sayfadaki tek görevli ve sabit taramalı modele aittir; gerçek bir PLC'de zamanlayıcının saati taramadan bağımsız akar, çıkışın ancak bir taramada görülmesi ise değişmez.",
  },
  misconceptions: [
    {
      myth: "Durdurma butonu normalde kapalıysa programda da normalde kapalı kontak (!DUR) yazılır.",
      truth:
        "Butonun yapısı ile programdaki simge ayrı şeylerdir. NK buton basılmadığında girişi 1 yapar; programdaki düz kontak 'giriş 1 ise geçir' der ve motorun çalışmasına izin verir. Aynı girişi !DUR ile okursan mantık tersine döner: motor ancak butona basılıyken çalışır. !DUR yazımı, sayfanın ikinci programındaki gibi normalde açık bir butona aittir; o devrede de kopuk kablo fark edilmez.",
    },
    {
      myth: "Merdiven diyagramındaki bütün basamaklar gerçek kablolar gibi aynı anda 'canlıdır'.",
      truth:
        "PLC basamakları yukarıdan aşağıya sırayla çözer. Bir basamağın yazdığı biti o taramada yalnız alttakiler görür; aynı bobini iki basamakta yazarsan alttaki kazanır; bir girişin tarama ortasında değişmesi o taramada görülmez. Gerçekte bir taramadan kısa süren darbe hiç görülmeyebilir; sayfa, kısa dokunuşu kolaylık olsun diye bir tarama boyunca tutar. Sıra ve zamanlama, röle panosunda olmayan kavramlardır.",
    },
    {
      myth: "Yol–adım diyagramı kâğıtta doğruysa pnömatik devre de o sırayla çalışır.",
      truth:
        "Diyagram hangi hareketin hangi sınır anahtarıyla başlayacağını söyler; o anahtarın ne zaman bırakılacağını söylemez. Çift pilotlu valf, karşı pilotu basınçlıyken konum değiştiremez. A+ B+ B− A− sırasında b0 ve a1 tam da yanlış anda basılı kalır ve doğrudan bağlı devre daha ilk adımda takılır. Çare sinyali kaynağından kesmektir: kaskat bağlantı ya da sırayı bir PLC'ye bırakmak.",
    },
    {
      myth: "Takım, çizimdeki konturun tam üstünden gider ve her köşeyi çizildiği gibi keser.",
      truth:
        "Takım bir noktayla değil bir daireyle keser; merkezi konturdan bir yarıçap uzakta gitmelidir. Dışından dolandığı köşe keskin kalır, içine girdiği köşede ise takımın yarıçapı kadar bir kavis kalır: dönen bir takım kendi yarıçapından dar bir iç köşeyi açamaz. 60 × 40 mm'lik cepte 10 mm çaplı takım dört köşede toplam 21,46 mm² malzeme bırakır. Tasarımcının iç köşelere yarıçap vermesi bundandır.",
    },
  ],
  glossary: [
    { term: "Tarama çevrimi", definition: "PLC'nin girişleri okuma, basamakları yukarıdan aşağıya çözme ve çıkışları yazma turu; süresi çoğu uygulamada milisaniyeler düzeyindedir." },
    { term: "NA / NK kontak", definition: "Normalde açık (NA) program kontağı ilgili bit 1 iken, normalde kapalı (NK) kontak bit 0 iken iletir; NK bir buton ise basılmadığı sürece devreyi kapalı tutar." },
    { term: "Mühürleme", definition: "Bobinin kendi kontağının başlatma butonuna paralel bağlanması; buton bırakıldıktan sonra da bobini enerjili tutan geri besleme." },
    { term: "TON zamanlayıcısı", definition: "Girişi, ayarlanan PT süresi boyunca kesintisiz 1 kalırsa çıkışını 1 yapan çekmede gecikmeli zamanlayıcı; giriş 0 olunca sıfırlanır." },
    { term: "Çift pilotlu 5/2 valf", definition: "Beş kapılı, iki konumlu yön valfi; son gelen pilot sinyalinin konumunda kalır, iki pilotu birden basınçlıysa konum değiştiremez." },
    { term: "Kaskat bağlantı", definition: "Hareketleri gruplara ayırıp bir bellek valfiyle her an yalnız bir grup hattını basınçlı tutarak sinyal çakışmasını önleyen pnömatik devre düzeni." },
    { term: "G-kodu", definition: "CNC tezgâhının hareketlerini ve makine işlevlerini satır satır tarif eden dil; G hareket, M makine işlevi, F ilerleme, S devir." },
    { term: "Takım yarıçapı telafisi", definition: "Takım merkezinin, çizimdeki konturdan takım yarıçapı kadar ötelenmiş yolu izlemesi; iç köşede kavis bırakır, dış köşede yay çizer." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın dört sekmesi üniversitede birer derse açılır. Merdiven diyagramı, IEC 61131-3 standardındaki PLC dillerinden yalnızca biridir; <strong>Mantık Devreleri</strong> dersinde mühürleme bir kilit devresi, makinenin adımları bir <strong>sonlu durum makinesi</strong> olarak modellenir. Pnömatik sıralama da aynı gözle okunur: kaskattaki bellek valfi, sıranın hangi grupta olduğunu tutan durum bitidir. <strong>Otomatik Kontrol</strong> dersinde bir motorun hızı ya da bir fırının sıcaklığı <strong>PID</strong> denetleyicilerle kapalı çevrimde tutulur; bunun sensör ve eyleyici tarafı <a href='mekatronik-muhendisligi.html'>Mekatronik Mühendisliği</a> sayfasındadır. <strong>Hidrolik ve Pnömatik</strong> (akışkan gücü) dersinde silindir hızı, valf karakteristiği ve basınç kayıpları hesaplanır. <a href='hidrolik-sistemler.html'>Hidrolik Sistemler</a> laboratuvarı bunun ilk adımıdır: debi hızı, yük basıncı belirler; pompanın şaft gücü yük, kısma valfi ve emniyet valfi arasında paylaşılır.",
      "Üretim tarafında G-kodunun arkasında <strong>kinematik</strong> vardır: beş eksenli bir tezgâhta takımın ucunu istenen noktaya ve yönelime götürmek için eksen konumlarının ters kinematikle çözülmesi gerekir; bu, robot kolunun problemiyle aynıdır. Kontrolör, yay ve doğru parçalarını her eksen için milisaniyelik konum hedeflerine böler (<strong>enterpolasyon</strong>) ve ivme sınırlarına uyar; sayfadaki 10 ms'lik adımlar bunun ivmesiz, en yalın hâlidir. Takım yarıçapı telafisi, geometri derslerindeki paralel (öteleme) eğrisi problemidir. CAD yüzeyleri Bézier ve NURBS eğrilerinin matematiğine dayanır: n'inci dereceden bir Bézier eğrisi, kontrol noktalarının Bernstein polinomlarıyla ağırlıklı toplamıdır. <strong>Talaşlı İmalat</strong> dersi ise bu sayfanın hesaplamadığı şeyleri inceler: kesme kuvveti, takım ömrü (Taylor bağıntısı: V·T<sup>n</sup> = C) ve tezgâh titreşiminin kararlılığı.",
    ],
    topics: ["IEC 61131-3 ve PLC programlama", "Kilit devreleri ve sonlu durum makineleri", "PID denetim ve kapalı çevrim", "Akışkan gücü: valf ve pompa karakteristikleri", "Robot ve tezgâh kinematiği", "Bézier ve NURBS yüzeyler", "Talaşlı imalat: kesme kuvveti ve takım ömrü"],
  },
  quiz: [
    {
      question: "MOTOR = (BAŞLAT ∨ MOTOR) ∧ DUR basamağında motor mühürle çalışıyor (BAŞLAT = 0, DUR = 1). Normalde kapalı DUR butonunun kablosu kopuyor, birkaç saniye sonra yeniden temas ediyor. Motor ne yapar?",
      options: ["Hiç etkilenmez, çalışmayı sürdürür", "Durur ve temas gelince kendiliğinden yeniden çalışır", "Durur ve BAŞLAT'a basılana kadar durmuş kalır", "Yalnızca kablo kopukken çalışır"],
      answer: 2,
      explanation: "Kablo kopunca DUR girişi 0 okunur: (0 ∨ 1) ∧ 0 = 0, motor durur ve mühür düşer. Temas geri gelince (0 ∨ 0) ∧ 1 = 0: BAŞLAT'a basılmadıkça motor kalkmaz. Durdurma butonunu NK seçmenin kazandırdığı budur: arıza durdurur, kendiliğinden çalıştırmaz. Sayfada 'Kablo arızası' menüsüyle sınayabilirsin.",
    },
    {
      question: "'Tek taramalık darbe' programında üstte B ∧ ¬ESKİ → DARBE, altta B → ESKİ basamağı var; DARBE bir sayacı sürüyor. İki basamağın yeri değiştirilip B butonuna bir kez basılırsa sayaç kaç olur?",
      options: ["1; mantık aynı olduğu için sıra sonucu değiştirmez", "0; ESKİ aynı taramada önce güncellenir, DARBE hiç 1 olmaz", "Buton basılı kaldığı sürece her taramada 1 artar", "2; darbe iki tarama boyunca sürer"],
      answer: 1,
      explanation: "Özgün sırada butona basılan taramada ESKİ henüz 0'dır: DARBE = 1 ∧ 1 = 1 olur, hemen altında ESKİ = 1 yazılır; sonraki taramada DARBE 0'a döner ve sayaç 1'de kalır. Yer değişince B → ESKİ önce çözülür; DARBE basamağı aynı taramada ESKİ = 1 okur ve 1 ∧ 0 = 0 verir. Sayfa 'C1 = 0 / 99' gösterir. Basamak sırası, programın mantığının parçasıdır.",
    },
    {
      question: "Yarıçapı 5 mm olan takım; çevresi 200 mm olan bir dikdörtgenin, çevresi 180 mm olan bir eşkenar üçgenin ve çevresi 180 mm olan bir düzgün altıgenin dışından dolanıyor. Takım merkezinin yolu, konturun çevresinden ne kadar uzundur?",
      options: ["Üçünde de 2π·5 ≈ 31,4 mm", "Köşe sayısıyla orantılı: üç, dört ve altı köşe için farklı", "Üçünde de 8·5 = 40 mm", "Çevreyle orantılı: her birinde çevrenin aynı yüzdesi"],
      answer: 0,
      explanation: "Dışarıdan dolanan merkez, her köşede r·φ boyunda bir yay çizer; φ o köşedeki dönme açısıdır. Kapalı, dışbükey bir konturda dönme açılarının toplamı tam bir turdur: Σφ = 2π. Fazlalık bu yüzden köşe sayısından ve çevreden bağımsızdır: 2π·5 = 31,416 mm. Sayfanın kapalı formül kartı dikdörtgende 231,416 mm, üçgende ve altıgende 211,416 mm yazar.",
    },
  ],
  next: [
    { href: "hidrolik-sistemler.html", title: "Hidrolik Sistemler: Debi, Yük ve Güç", why: "Aynı F = p·A, bu kez yağla: silindirde debi–hız ve yük–basınç ilişkisini, pompada hacim ve mekanik verimi, kısma ve emniyet (relief) valfli devrede gücün nereye gittiğini hesapla." },
    { href: "mantik-devresi.html", title: "Mantık Devreleri Laboratuvarı", why: "Basamağın VE/VEYA mantığını kapılarla kur ve sadeleştir; Ardışıl mantık sekmesindeki SR kilidi, mühürlemenin kapı düzeyindeki karşılığıdır." },
    { href: "uretim-planlama-ve-endustri-muhendisligi.html", title: "Üretim Planlama: Stok, Kalite ve Akış", why: "Tek tezgâhtan bütün hatta geç: sipariş miktarını seç, kontrol grafikleriyle sürecin bozulduğunu yakala, darboğazın kuyruğu nasıl büyüttüğünü tohumlu benzetimle ölç." },
    { href: "basinc.html", title: "Basınç: Hidrostatik, Pascal İlkesi ve Hidrolik", why: "F = p·A çarpımının kaynağı: Hidrolik kaldıraç sekmesinde kütleyi ve piston çaplarını seçip yükü vuruş vuruş kaldır; kuvvet kazancının yolla ödendiğini gör." },
  ],
  sources: [
    { title: "Wikipedia · Programmable logic controller", url: "https://en.wikipedia.org/wiki/Programmable_logic_controller", note: "GM Hydramatic'in 1968 şartnamesi, Modicon 084, tarama döngüsü ve IEC 61131-3 dilleri." },
    { title: "Wikipedia · History of numerical control", url: "https://en.wikipedia.org/wiki/History_of_numerical_control", note: "Parsons, MIT Servomekanizma Laboratuvarı, Hydro-Tel frezesinin Eylül 1952 gösterimi ve APT dili." },
    { title: "Wikipedia · G-code", url: "https://en.wikipedia.org/wiki/G-code", note: "G-kodunun RS-274 adıyla 1963'te standartlaşması ve ISO 6983; gerçek kontrolcüler arasında ayrıntıların değiştiği notuyla." },
    { title: "Wikipedia · Sketchpad", url: "https://en.wikipedia.org/wiki/Sketchpad", note: "Sutherland'ın 1963 tezi, TX-2 bilgisayarı, kısıt tabanlı çizim ve 1988 Turing Ödülü." },
  ],
  revision: "Kasım 2026",
};
