window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["grup-teorisi"] = {
  slug: "grup-teorisi",
  title: "Grup Teorisi: Simetrinin Dilbilgisi",
  field: "Matematik",
  level: "Lisans",
  minutes: 40,
  tagline:
    "Bir kareyi döndürmek, saati ileri almak ve Rubik küpünü karıştırmak aynı dört kurala uyar. Grup teorisi bu kuralların bilimidir; Galois'nın 20 yaşında bıraktığı mektuptan Monster grubuna uzanır.",
  hook:
    "Kâğıttan bir kare kes, köşelerini 1-2-3-4 diye numarala. Önce 90° döndür, sonra dikey ekseni etrafında ters çevir. Baştan başla ve sırayı değiştir: önce çevir, sonra döndür. Köşeler aynı yere geldi mi? Gelmedi. Bu küçük 'hayır', beşinci derece denklemin genel kök formülü olmamasından kristallerin tam 230 simetri türüne ve Rubik küpünün 20 hamle sınırına uzanan bir matematiğin kapısıdır.",
  bigIdea:
    "Grup, her adımın geri alınabildiği bir işlem dünyasıdır: dört aksiyomu sağlayan her yapı (saat aritmetiği, karenin simetrileri, küp hamleleri) aynı teoremlere uyar ve bunların ilki olan <strong>Lagrange teoremi</strong>, sonlu bir grupta her alt grubun eleman sayısının grubun eleman sayısını tam böldüğünü söyler.",
  story: [
    "Her şey bir formül arayışıyla başladı. İkinci dereceden denklemleri Babilliler çözebiliyordu; 1545'te Cardano'nun <em>Ars Magna</em>'sı üçüncü ve dördüncü derece için de kök formüllerini yayımladı. Sonra duvar: beşinci derece için yaklaşık iki yüz elli yıl boyunca kimse dört işlem ve kök almayla yazılan genel bir formül bulamadı. 1770–71'de Joseph-Louis Lagrange tuhaf bir yere baktı: bilinen formüllerin neden işlediğini, köklerin birbiriyle <strong>yer değiştirme</strong> biçimlerinde aradı. 1799'da Paolo Ruffini böyle bir formülün <em>olamayacağını</em> gösteren ilk, ama boşluklu kanıtı yayımladı; 1824'te Norveçli Niels Henrik Abel eksiksiz kanıtı, parasını kendi ödediği altı sayfalık bir broşüre sığdırdı. Abel 26 yaşında veremden öldü. Geriye kesin bir 'hayır' kalmıştı, ama hangi denklemin neden çözülemediğini söyleyen genel bir ölçüt yoktu.",
    "Ölçütü Paris'te, kimsenin anlamadığı bir genç buldu. Évariste Galois 1811'de doğdu, École Polytechnique'in giriş sınavında iki kez başarısız oldu. 1830'da Akademi sekreteri Fourier'ye teslim ettiği bir çalışma, Fourier ölünce kayboldu; 1831'de bir başkasını Poisson 'yeterince açık değil' diye geri çevirdi. Siyasi eylemleri yüzünden hapse girdi. 30 Mayıs 1832 sabahı bir düelloda karnından vuruldu ve ertesi gün, 20 yaşında öldü. Düellodan önceki gece arkadaşı Auguste Chevalier'ye fikirlerini özetleyen bir mektup yazdı, el yazmalarının üzerinden geçti; birinin kenarındaki not hâlâ okunabiliyor: 'Bu kanıtta tamamlanacak bir şey var. Zamanım yok.' Bütün teoriyi o gece yazdığı ise abartılmış bir efsanedir. Buluşu şuydu: bir denklemin köklerinin yer değiştirmeleri bir <strong>grup</strong> oluşturur ve denklemin kök almayla çözülüp çözülemeyeceğini bu grubun iç yapısı belirler. Genel beşinci derece denklemin grubu 120 elemanlı S₅'tir; içindeki 60 elemanlı A₅ daha küçük parçalara ayrılamaz (<strong>basit</strong>tir) ve değişmeli değildir: formül bu yüzden yoktur. Çalışmaları ancak 1846'da, Joseph Liouville onları kendi dergisinde yayımlayınca matematik dünyasına ulaştı.",
    "Sonraki yüzyılda grup, denklemlerden koptu ve kendi başına bir nesne oldu. 1854'te Arthur Cayley grubu somut bir örnekten bağımsız, yalnızca kurallarıyla tanımladı; sayfadaki çarpım tablosu onun adını taşır. 1872'de Felix Klein, Erlangen Programı'nda geometriyi tersine çevirdi: bir geometri, bir dönüşüm grubunun değiştirmediği şeylerin incelenmesidir. 1918'de Emmy Noether, bir fizik sisteminin eylemini değiştirmeyen her sürekli simetrinin bir korunum yasası doğurduğunu kanıtladı: zamanda kaydırmaya karşı simetri enerjinin, uzayda kaydırmaya karşı simetri momentumun korunumunu verir. 1961'de Murray Gell-Mann ve Yuval Ne'eman birbirinden bağımsız olarak parçacıkları SU(3) grubunun örüntülerine dizdi; Gell-Mann 1962'de boş kalan bir yere yeni bir parçacık öngördü ve Ω⁻ 1964'te bulundu. Grup teorisinin kendi büyük projesi ise <strong>sonlu basit grupların sınıflandırılması</strong>ydı; asal sayılar tam sayılar için neyse, basit gruplar da sonlu gruplar için odur. Kanıt, yaklaşık yüz yazarın birkaç yüz makalesine, on binlerce sayfaya yayıldı. Daniel Gorenstein işin bittiğini 1983'te ilan etti; ama İngilizcede 'quasithin' denen bir grup ailesinde boşluk kalmıştı ve onu Michael Aschbacher ile Stephen D. Smith 2004'te 1221 sayfalık bir kanıtla kapattı.",
  ],
  core: [
    {
      heading: "Dört kural, sonsuz örnek",
      body:
        "Bir grup, bir küme ve onun iki elemanını birleştiren bir işlemdir; dört şart vardır. <strong>Kapalılık:</strong> sonuç kümeden çıkmaz. <strong>Birleşme:</strong> parantezlerin yeri önemsizdir. <strong>Birim:</strong> hiçbir şeyi değiştirmeyen bir eleman vardır. <strong>Ters:</strong> her yapılan geri alınabilir. Tam sayılar toplamayla gruptur (birim 0, a'nın tersi −a); doğal sayılar değildir, çünkü 3'ü geri alacak −3 yoktur. Sayfadaki Z₅ˣ bu yüzden 0'ı dışarıda bırakır: mod 5 çarpmada 0'ın tersi yoktur; 1, 2, 3, 4'ün ise her birinin tersi yine bu kümededir (2·3 = 6 ≡ 1). İlk kanıtlar da bu dört satırdan çıkar. İki birim e ve e′ olsaydı e = e∗e′ = e′ olurdu: birim tektir. Aynı oyunla her elemanın tersi de tektir ve bir çarpımın tersi sırayı çevirir: çorabı ve ayakkabıyı giydiğin sıranın tersiyle çıkarırsın.",
      formula: "(a∗b)⁻¹ = b⁻¹ ∗ a⁻¹",
      formulaNote: "Kanıt tek satır: (a∗b)∗(b⁻¹∗a⁻¹) = a∗(b∗b⁻¹)∗a⁻¹ = a∗a⁻¹ = e. Değişme (a∗b = b∗a) kurallar arasında yoktur; onu sağlayan gruplara Abel grubu denir.",
    },
    {
      heading: "Cayley tablosu: grubun parmak izi",
      body:
        "Küçük bir grubu bütünüyle bir tabloya sığdırabilirsin: satır a, sütun b, hücre a∗b. Tablonun zorunlu bir özelliği vardır: her satır ve her sütunda her eleman <strong>tam bir kez</strong> görünür, yani tablo bir Latin karedir. Nedeni sadeleştirme kuralıdır: a∗b = a∗c ise iki tarafı soldan a⁻¹ ile çarp, b = c çıkar. Birimin yerleri ters eşleri gösterir; sayfanın Z₄ sekmesinde 0 yazan hücreler (0,0), (1,3), (2,2), (3,1)'dedir: 2 kendi tersidir, 1 ile 3 birbirinin. Tablo köşegene göre simetrikse grup değişmelidir; S₃ sekmesinde simetri bozulur: (12) ∗ (13) = (132) ama (13) ∗ (12) = (123). Tablo bir teorem de saklar: a'nın satırı x ↦ a∗x eşlemesidir ve elemanların bir permütasyonudur. Her elemanı kendi satırına götürmek, grubu kendi elemanlarının permütasyon grubunun içine birebir ve işlemi koruyarak yerleştirir. Buna <strong>Cayley teoremi</strong> denir: n elemanlı her grup, Sₙ'in bir alt grubuna izomorftur.",
      formula: "a ∗ b = a ∗ c ⇒ b = c",
      formulaNote: "Sol sadeleştirme; sağdan da aynı biçimde sadeleşir. Latin kare özelliğinin tek nedeni budur, değişme gerekmez.",
    },
    {
      heading: "Devirli gruplar: tek elemandan bütün grup",
      body:
        "Saatin akrebi tek bir hamleyi tekrarlar ve bütün kadranı dolaşır. Z<sub>n</sub> = {0, 1, …, n−1} mod n toplama ile böyle bir gruptur: 1'i tekrar tekrar ekleyerek her elemana ulaşırsın; 1 bir <strong>üreteç</strong>tir. Peki 5, Z₁₂'yi üretir mi? 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0: evet, on iki adımda hepsi. 8 üretir mi? 8, 4, 0 ve döngü kapandı: hayır, yalnızca üç elemanlı bir alt grup verir. Kural: k'nin mertebesi n/ebob(k, n)'dir. Kanıtı kısadır: d = ebob(k, n) ise m·k ≡ 0 (mod n) koşulu (n/d) | m·(k/d) demektir; n/d ile k/d aralarında asal olduğu için bu (n/d) | m demektir. Demek ki üreteçler tam olarak ebob(k, n) = 1 olan k'lardır ve sayıları Euler'in φ(n) fonksiyonudur: φ(12) = 4 (1, 5, 7, 11), φ(11) = 10. Bir adım ötesi: devirli bir grubun her alt grubu da devirlidir; bu yüzden n'nin her böleni d için d elemanlı tam olarak bir alt grup vardır, ⟨n/d⟩.",
      formula: "ord(k) = n / ebob(k, n)",
      formulaNote: "Toplamsal grupta 'kuvvet' tekrar tekrar toplamaktır: sayfadaki 5³ = 3 yazısı 5 + 5 + 5 = 15 ≡ 3 (mod 12) demektir.",
    },
    {
      heading: "Karenin sekiz simetrisi: D₄",
      body:
        "Bir kareyi kaldırıp görüntüsü aynı kalacak biçimde yerine koymanın tam sekiz yolu vardır: dört döndürme (0°, 90°, 180°, 270°) ve dört yansıma (iki orta çizgi, iki köşegen). Bu sekiz hareket <strong>dihedral grup D₄</strong>'ü oluşturur (bazı kitaplar eleman sayısına bakıp D₈ yazar); tek bir döndürme r ile tek bir yansıma s hepsini üretir: {e, r, r², r³, s, sr, sr², sr³}. Yazım fonksiyon bileşkesi gibi sağdan sola okunur: sr 'önce r, sonra s' demektir; sayfanın düğmeleri de bu kuralla çalışır. Hesapla görmek için hareketleri 2×2 matris yaz (x sağa, y yukarı): saat yönünde 90° döndüren R'nin satırları (0, 1) ve (−1, 0), dikey eksene göre yansıtan S'ninkiler (−1, 0) ve (0, 1). Çarpınca SR'nin (x, y)'yi (−y, −x)'e, RS'nin ise (y, x)'e götürdüğü çıkar: ilki sol üst–sağ alt, ikincisi sağ üst–sol alt köşegenine göre yansımadır ve sayfanın durum kutusu da tam bu iki ekseni yazar. Her simetri dört köşenin bir permütasyonudur; 24 permütasyonun yalnızca 8'i gerçek bir simetridir.",
      formula: "D<sub>n</sub> = ⟨r, s | rⁿ = e, s² = e, rs = sr⁻¹⟩",
      formulaNote: "Üç kural bütün grubu belirler; düzgün n-genin simetri grubu 2n elemanlıdır. D₄'te r⁻¹ = r³ olduğu için rs = sr³.",
    },
    {
      heading: "Lagrange teoremi ve tersinin çöktüğü yer",
      body:
        "H, G'nin içinde kendi başına grup olan bir parçaysa (bir <strong>alt grup</strong>), G'yi H'nin birbirine değmeyen kopyalarıyla döşeyebilirsin: H, g₁H, g₂H, … Bu kopyalara <strong>koset</strong> (yan küme) denir; hepsi H kadar elemanlıdır ve iki koset ya aynıdır ya hiç kesişmez. Döşeme tam çıktığı için |G| = |H| × (koset sayısı), yani |H|, |G|'yi böler. Sonuçları ağırdır: her elemanın mertebesi |G|'yi böler ve a<sup>|G|</sup> = e; mod 5 çarpma grubunda 2⁴ = 16 ≡ 1 çıkar, Fermat'nın küçük teoremi bir satırlık sonuç olur. Tersi yanlıştır; en küçük karşı örnek 12 elemanlı A₄'tür. Kanıt taslağı: 6 elemanlı bir H olsaydı indeksi 2 olurdu. İndeksi 2 olan alt grup normaldir ve G/H iki elemanlı olduğundan her g için g² ∈ H. A₄'ün sekiz 3-döngüsünün her biri σ = (σ²)² biçiminde bir karedir, yani hepsi birimle birlikte H'de olmalı: 9 eleman 6'ya sığmaz.",
      formula: "|G| = |H| · [G : H]",
      formulaNote: "[G : H] koset sayısı, yani indeks. Örgüde bir düğüme tıklayınca sayfa bu eşitliği yazar, ör. '[A₄ : H] = 3, yani 12 = 4 · 3'. Teorem Lagrange'ın adını taşır, ama o 1770–71'de yalnızca permütasyonlarla ilgili özel bir hâlini görmüştü; permütasyon grupları için genel kanıt Camille Jordan'ındır (1861).",
    },
  ],
  lab: {
    intro:
      "Bu sayfada ölçüm aleti yok; deneyler tablo okuma, sayma ve tahmini sayfanın hesabıyla karşılaştırma üzerine. <strong>Cayley Tablosu</strong> panelinde dört sekme (Z₄, Klein-4, S₃, Z₅ˣ) var; tıkladığın hücre renkli bir çerçeve, ters sıradaki hücre (b∗a) mor çerçeve alır ve alttaki satır iki çarpımı da yazar. <strong>Alt Grup Örgüsü</strong> panelindeki Z₁₂, D₄ ve A₄ örgüleri çarpım tablosundan hesaplanır: her satır |G|'nin bir bölenidir, bir düğüme tıklayınca elemanlar, indeks ve normallik yazılır. <strong>Devirli Gruplar</strong> panelinde 4–12 arası <strong>n</strong> kaydırıcısı, tıklanabilir sayı çemberi ve 'Rastgele üreteç' düğmesi var. <strong>Dihedral</strong> panelinde 'Döndür (r): 90° saat yönünde', 'Yansıt (s): dikey eksen' ve 'Sıfırla' düğmeleri ile bir durum kutusu bulunur. Sayfanın sıra kuralı: düğmeler basış sırasıyla uygulanır, yazımda sağdaki önce gelir (sr = önce r, sonra s); S₃ tablosunda da a∗b = önce b, sonra a.",
    experiments: [
      {
        title: "Tablonun parmak izi: Z₄, Klein-4 ve S₃",
        predict: "Z₄ ile Klein-4 dörder elemanlı. Birim (0 ya da e) iki tabloda aynı yerlere mi düşer? Altı elemanlı S₃'ün tablosu köşegene göre simetrik olur mu?",
        do: "Cayley panelinde 'Z₄ (mod 4 toplama)' ve 'Klein-4 (V₄)' sekmelerinde renkli birim hücrelerini bul. Z₄'te satır 1 ile sütun 3'ün kesiştiği hücreye tıkla. Sonra 'S₃ (simetrik grup)' sekmesinde satır (12) ile sütun (13)'e tıkla ve mor çerçeveli hücreye bak.",
        observe: "Z₄'te birim (0,0), (1,3), (2,2), (3,1)'de; bilgi satırı '1 ∗ 3 = 0 (birim): 1 ile 3 birbirinin tersi' yazar. Klein-4'te birim köşegeni baştan sona doldurur. S₃'te '(12) ∗ (13) = (132) · ters sıra: (13) ∗ (12) = (123), farklı: sıra önemli' yazar; tıkladığın hücre ile mor çerçeveli hücre köşegenin iki yanında farklı değer taşır.",
        explain: "Z₄'te 1'i tekrar ekleyince 1, 2, 3, 0 ile bütün grup dolaşılır; Klein-4'te her elemanın karesi birim olduğu için hiçbir eleman bunu yapamaz. Aynı büyüklükte iki farklı grup: Z₄ ≇ V₄. İkisi de değişmeli, tabloları simetrik; S₃ değişmeli olmayan en küçük gruptur ama Latin kare kuralı onda da bozulmaz, çünkü sadeleştirme değişme istemez. Z₅ˣ sekmesine de bak: birim (1,1), (2,3), (3,2), (4,4)'te; Z₄'teki gibi bir eleman (4) kendi tersi, bir çift (2 ile 3) birbirinin tersi, çünkü Z₅ˣ ≅ Z₄.",
      },
      {
        title: "Üreteç avı: kim bütün çemberi dolaşır?",
        predict: "Z₁₂'de 5, 7, 8 ve 3 sayılarından hangileri 0'dan başlayıp bütün çemberi dolaşır? Kaç üreteç vardır? 'Rastgele üreteç' hangi sayıları gösterebilir?",
        do: "Devirli Gruplar panelinde n kaydırıcısını 12'ye getir (sayfa üreteç olarak 5'i seçer). Çemberde sırayla 8'e, 3'e ve 7'ye tıkla; her seferinde okları ve alttaki üç satırı oku. Sonra 'Rastgele üreteç'e birkaç kez bas. Son olarak n = 11 ve n = 9'u dene.",
        observe: "5 ve 7 on iki okla bütün çemberi dolaşır (5¹ = 5, 5² = 10, 5³ = 3, …, 5¹² = 0). 8 üçgen çizip kapanır: '8 üreteç değil: ⟨8⟩ = {0, 4, 8}'; 3 kare çizer: '⟨3⟩ = {0, 3, 6, 9}'. Alt satır 'φ(12) = 4 üreteç: 1, 5, 7, 11' der ve düğme yalnızca bu dört sayıyı seçer. n = 11'de 'φ(11) = 10 üreteç: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10', n = 9'da 'φ(9) = 6 üreteç: 1, 2, 4, 5, 7, 8' yazar.",
        explain: "k'nin yolu n/ebob(k, n) adımda kapanır: ebob(8, 12) = 4 olduğu için 12/4 = 3 adım, ebob(3, 12) = 3 için 4 adım. Yol ancak ebob 1 ise bütün n elemana uğrar; bu yüzden üreteçler tam olarak n ile aralarında asal k'lardır ve sayıları Euler'in φ(n)'sidir. 11 asal olduğu için 1'den 10'a her sayı üreteçtir; 9'da 3 ve 6 düşer. Erken kapanan küçük çokgenler de birer alt gruptur.",
      },
      {
        title: "Lagrange'ı say, tersini ara",
        predict: "12'nin bölenleri 1, 2, 3, 4, 6, 12. Z₁₂ örgüsünde her bölen satırında kaç düğüm olur? A₄'te 6 satırı dolu mu? D₄'te kaç alt grup bekliyorsun?",
        do: "Alt Grup Örgüsü panelinde Z₁₂, D₄ ve A₄ sekmelerini sırayla aç ve alttaki özet satırını oku. Sonra A₄'te ⟨(12)(34), (13)(24)⟩ düğümüne, D₄'te ⟨s⟩ ve ⟨r², s⟩ düğümlerine tıkla.",
        observe: "Z₁₂: '6 alt grup: her bölen (1, 2, 3, 4, 6, 12) için tam 1 tane'. D₄: '10 alt grup: 1 tane mertebe 1, 5 tane mertebe 2, 3 tane mertebe 4, 1 tane mertebe 8'. A₄: '10 alt grup' ve 'Mertebe 6 için alt grup yok, oysa 6 bir bölen'; çizimde o satır kesikli çizgiyle boş kalır. V₄ düğümü '[A₄ : H] = 3, yani 12 = 4 · 3' ve 'normal alt grup' yazar; D₄'te ⟨s⟩ 'normal değil', ⟨r², s⟩ 'normal alt grup' der.",
        explain: "Her düğümün mertebesi en üstteki sayıyı böler: Lagrange. 'Her bölen için bir alt grup' ise tersidir ve A₄'te çöker: 6 elemanlı bir alt grubun indeksi 2 olurdu, bütün kareleri içerirdi ve sekiz 3-döngüsünün hepsi bir karedir. Devirli Z₁₂'de tersi doğrudur. D₄'te indeksi 2 olan üç alt grup da normaldir. ⟨s⟩ değildir: s'nin r ile eşleniği r·s·r⁻¹ = sr², yani dikey eksen 90° dönünce yatay eksene göre yansıma çıkar ve bu ⟨s⟩'nin dışındadır.",
      },
      {
        title: "rs ile sr: karede sıra ve eşlenik",
        predict: "Kareyi önce döndürüp sonra yansıtmak (r, s) ile önce yansıtıp sonra döndürmek (s, r) aynı simetri mi? Yansıt, döndür, yeniden yansıt (s, r, s) dizisi bir yansıma mı verir, bir döndürme mi?",
        do: "Dihedral panelinde 'Sıfırla'ya, sonra 'Döndür (r): 90° saat yönünde' ve 'Yansıt (s): dikey eksen' düğmelerine bu sırayla bas; durum kutusunu oku. Sıfırla ve sırayı çevir: önce s, sonra r. Son olarak sıfırla ve s, r, s bas.",
        observe: "r → s: 'Eleman: s·r = sr (yansıma, eksen: sol üst–sağ alt köşegeni)', köşeler 1, 4, 3, 2. s → r: 'Eleman: r·s = sr³ (yansıma, eksen: sağ üst–sol alt köşegeni)', köşeler 3, 2, 1, 4; mor eksen çizgisi öteki köşegende belirir. s → r → s: 'Eleman: s·r·s = r³ (döndürme: 270° saat yönünde, yani 90° ters yönde)'.",
        explain: "Yazımda sağdaki önce uygulanır; 'önce r, sonra s' = sr. Sıra değişince sonuç değişir: rs = sr³ ≠ sr, D₄ değişmeli değildir. s kendi tersi olduğu için s·r·s = srs⁻¹, r'nin s ile eşleniğidir ve r⁻¹ çıkar: aynadaki saat ters yönde döner. Bir döndürmenin her eşleniği yine döndürme olduğu için ⟨r⟩ normal alt gruptur; örgüdeki ⟨r⟩ düğümü de bunu yazar. Bileşkeyi soldan sağa okuyan kitaplarda adlar yer değiştirir, sonuç değişmez.",
      },
    ],
  },
  wow: [
    {
      title: "43 kentilyon durum, 20 hamle",
      body:
        "Ernő Rubik'in 1974'te yaptığı küpün 43.252.003.274.489.856.000 farklı durumu vardır; saniyede bir durum saysan evrenin yaşının yaklaşık yüz katı sürer. Yine de yarım dönüşler de tek hamle sayılınca her durum en fazla 20 hamlede çözülür (yalnızca çeyrek dönüşlerle sınır 26). Bu 'Tanrı'nın sayısı'nı 2010'da Tomas Rokicki, Herbert Kociemba, Morley Davidson ve John Dethridge, Google'ın bağışladığı yaklaşık 35 işlemci-yılıyla kanıtladı. Yöntem düpedüz Lagrange'dı: küp grubunu 19.508.428.800 elemanlı bir alt grubun 2.217.093.120 kosetine böldüler; simetri sayesinde bunlardan yalnızca 55.882.296'sını çözmek yetti.",
    },
    {
      title: "Duvar kâğıdı için yalnızca 17 desen",
      body:
        "Bir düzlemi iki yönde tekrarlayan bir desenle kaplamanın, simetri bakımından tam 17 türü vardır; ne eksik ne fazla. Listenin tam olduğunu 1891'de Rus kristalograf Evgraf Fedorov kanıtladı, George Pólya 1924'te bağımsız olarak yeniden buldu. Elhamra Sarayı'nın süslemelerinde bunlardan kaçının bulunduğu ise hâlâ tartışılıyor. Üç boyutta, kristaller için sayı 230'dur: Fedorov ve Arthur Schoenflies 1891'de birbirinden bağımsız listeler çıkardı, mektuplaşarak hatalarını ayıkladı ve doğru liste 1892'de tamamlandı. Kristallerden X ışını kırınımı ilk kez 1912'de gözlendi: atomların dizilişi görülmeden önce olası bütün simetrileri sayılmıştı.",
    },
    {
      title: "Canavar ve ay ışığı",
      body:
        "26 sporadik basit grubun en büyüğü olan Monster'ın eleman sayısı 54 basamaklıdır, yaklaşık 8 × 10⁵³. Robert Griess 1980'de onu, 196.883 boyutlu bir uzaydaki özel bir cebirin simetri grubu olarak kurduğunu duyurdu. 1978'de John McKay, sayılar teorisinin j-fonksiyonunun açılımında 196.884 katsayısını görünce irkilmişti: 196.883 + 1. Conway ve Norton 1979'da bu rastlantının ardında bir yapı olduğunu öne sürdü ve ona, İngilizcede hem 'ay ışığı' hem 'boş hayal' anlamına gelen sözcükle <em>Monstrous Moonshine</em> adını verdi. Hayal değildi: Richard Borcherds 1992'de kanıtladı ve 1998'de Fields Madalyası aldı.",
    },
  ],
  worked: {
    title: "Z₁₂'nin bütün alt grupları",
    prompt:
      "Saat aritmetiğinde (mod 12 toplama) 8 elemanının mertebesini bul, ürettiği alt grubun kosetlerini yaz ve bu kosetlerin oluşturduğu bölüm grubunu tanı. Sonra Z₁₂'nin bütün alt gruplarını ve aralarındaki kapsama çizgilerini bul, üreteçlerini say ve sonucu sayfanın örgüsü ve sayı çemberiyle karşılaştır.",
    steps: [
      "Mertebe, bir elemanı kendisiyle kaç kez toplayınca birime (0'a) döndüğünü sayar. 8 → 8 + 8 = 16 ≡ 4 → 4 + 8 = 12 ≡ 0: ord(8) = 3. Formülle de: ebob(8, 12) = 4 ve 12/4 = 3.",
      "H = ⟨8⟩ = {0, 4, 8}. Kosetleri {0, 4, 8}, {1, 5, 9}, {2, 6, 10}, {3, 7, 11}: dört koset, hepsi üç elemanlı, hiçbiri ötekine değmiyor. Lagrange: 12 = 3 · 4, indeks [Z₁₂ : H] = 4. Z₁₂ değişmeli olduğu için H normaldir ve kosetler kendi aralarında toplanır: (1 + H) + (3 + H) = 4 + H = H. 1 + H dört adımda H'ye döner, yani Z₁₂/H ≅ Z₄.",
      "Z₁₂ devirli olduğu için 12'nin her böleni d için tam olarak bir alt grup vardır, ⟨12/d⟩: {0}, ⟨6⟩ = {0, 6}, ⟨4⟩, ⟨3⟩ = {0, 3, 6, 9}, ⟨2⟩ = çift sayılar ve Z₁₂'nin kendisi; toplam 6 alt grup. Bölenler a ve b için ⟨a⟩ ⊆ ⟨b⟩ ancak ve ancak b | a. Araya başka alt grup girmeyen çiftleri birleştirince 7 çizgi çıkar: {0}–⟨6⟩, {0}–⟨4⟩, ⟨6⟩–⟨3⟩, ⟨6⟩–⟨2⟩, ⟨4⟩–⟨2⟩, ⟨3⟩–Z₁₂, ⟨2⟩–Z₁₂.",
      "Üreteçler ebob(k, 12) = 1 olan k'lardır: 1, 5, 7, 11. Euler formülü de aynısını verir: φ(12) = 12 · (1 − 1/2) · (1 − 1/3) = 4.",
      "Sayfada dene: Alt Grup Örgüsü'nün Z₁₂ sekmesi altı düğüm ve yedi çizgi gösterir, ⟨4⟩ düğümüne tıklayınca '⟨4⟩ = {0, 4, 8} · |H| = 3, [Z₁₂ : H] = 4' yazar. Devirli Gruplar'da n = 12 seçip 8'e tıklarsan oklar 0 → 8 → 4 → 0 üçgenini çizer; alt satır 'φ(12) = 4 üreteç: 1, 5, 7, 11' der.",
    ],
    result:
      "ord(8) = 3, ⟨8⟩ = {0, 4, 8}, indeksi 4 ve Z₁₂/⟨8⟩ ≅ Z₄. Z₁₂'nin tam altı alt grubu (her bölene bir tane), örgüsünde yedi çizgi ve dört üreteci (1, 5, 7, 11) vardır.",
  },
  misconceptions: [
    {
      myth: "Grubun mertebesini bölen her sayı için bir alt grup vardır.",
      truth:
        "Lagrange tek yönlüdür: alt grup varsa mertebesi böler. Tersi yanlıştır; 12 elemanlı A₄'ün 6 elemanlı alt grubu yoktur ve sayfanın A₄ örgüsü bunu 'Mertebe 6 için alt grup yok, oysa 6 bir bölen' diye yazar. Tersi bütün sonlu Abel gruplarında doğrudur; her grupta da asal kuvvet bölenler için doğrudur (Sylow).",
    },
    {
      myth: "Grup işlemi her zaman değişmelidir; sıra fark etmez.",
      truth:
        "Değişme aksiyomlarda yoktur. Karede önce döndürüp sonra yansıtmak ile tersini yapmak farklı simetrilerdir: sayfada r, s basışı sr, s, r basışı sr³ verir. Altı elemanlı S₃ değişmeli olmayan en küçük gruptur: (12) ∗ (13) = (132) ama (13) ∗ (12) = (123). Rubik küpü, matris çarpımı ve üç boyutlu döndürmeler de değişmeli değildir.",
    },
    {
      myth: "Eleman sayısı aynıysa gruplar aynıdır.",
      truth:
        "Z₄ ve Klein-4 dörder elemanlıdır ama farklıdır: Z₄'te 1'in mertebesi 4'tür (1 + 1 = 2 ≠ 0), Klein-4'te ise her elemanın karesi birimdir. Tabloları da farklı görünür: Klein-4'ün köşegeni baştan sona e'dir. Buna karşılık Z₅ˣ, sayıları farklı olsa da Z₄'ün aynısıdır: 2ᵏ ↦ k eşlemesi işlemi korur. İki grup ancak böyle bir eşleme varsa 'aynı' (izomorf) sayılır.",
    },
    {
      myth: "Normal alt grup, elemanları grubun her elemanıyla değişen alt gruptur.",
      truth:
        "Normallik küme düzeyinde bir eşitliktir: her g için gN = Ng, yani gNg⁻¹ = N; elemanların tek tek değişmesi gerekmez. D₄'te döndürmelerin alt grubu ⟨r⟩ normaldir (sayfanın örgüsü 'normal alt grup' yazar) ama r ile s değişmez: rs = sr³ ≠ sr. Olan şu: s·r·s⁻¹ = r³, yani eşlenik alma bir döndürmeyi başka bir döndürmeye götürür, kümeden çıkarmaz. Her elemanla gerçekten değişen elemanlar ayrı bir kavramdır, grubun merkezi; D₄'te merkez {e, r²}'dir.",
    },
  ],
  glossary: [
    { term: "Grup", definition: "Kapalılık, birleşme, birim ve ters eleman şartlarını sağlayan bir küme ile bir ikili işlem." },
    { term: "Mertebe", definition: "Grubun eleman sayısı |G|; bir g elemanının mertebesi ise gᵏ = e olan en küçük pozitif k'dir (toplamsal yazımda k·g = 0)." },
    { term: "Abel grubu", definition: "İşlemin değişmeli olduğu grup: her a, b için a∗b = b∗a; Cayley tablosu köşegene göre simetriktir." },
    { term: "Devirli grup ve üreteç", definition: "Tek bir elemanın kuvvetleriyle tamamı elde edilen grup; o elemana üreteç denir. Z₁₂'nin üreteçleri 1, 5, 7, 11'dir." },
    { term: "Alt grup", definition: "Grubun içinde, aynı işlemle kendi başına grup olan alt küme; sonlu grupta mertebesi Lagrange'a göre grubun mertebesini böler." },
    { term: "Koset (yan küme)", definition: "Bir H alt grubunun bir g elemanıyla kaydırılmış kopyası gH; kosetler grubu çakışmadan döşer, sayılarına indeks [G : H] denir." },
    { term: "Normal alt grup", definition: "Her g için gNg⁻¹ = N olan, yani elemanlarının bütün eşleniklerini içeren alt grup; kosetleri ancak bu durumda G/N bölüm grubunu oluşturur." },
    { term: "İzomorfizma", definition: "İki grup arasında işlemi koruyan birebir ve örten eşleme, φ(a∗b) = φ(a)∗φ(b); varsa gruplar yapı olarak aynıdır (Z₅ˣ ≅ Z₄)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Matematik bölümlerindeki <strong>Soyut Cebir</strong> dersi tam bu sayfanın kaldığı yerden başlar: koset, normal alt grup, bölüm grubu ve homomorfizma. Normal bir alt grubun kosetleri kendi aralarında yine grup oluşturur; bu, büyük grubu 'katlayıp' küçültmektir: Z₁₂'yi ⟨8⟩ ile katlamak Z₄'ü, A₄'ü V₄ ile katlamak Z₃'ü verir. Katlamayı sürdürünce her sonlu grup <strong>basit</strong> parçalara ayrılır ve Jordan–Hölder teoremi bu parçaların, sıraları dışında, tek türlü olduğunu söyler: A₄'ün parçaları Z₃, Z₂, Z₂'dir. Ama parçaları bilmek binayı bilmek değildir: Z₄ ile V₄ aynı iki Z₂ parçasından yapılır ve yine de farklıdır. Sylow teoremleri Lagrange'ın tersini asal kuvvetler için kurtarır. Ardından Galois teorisi gelir: bir polinomun kökleri, ancak ve ancak Galois grubu değişmeli basamaklarla parçalanabiliyorsa (<em>çözülebilir</em> ise) kök almayla yazılabilir; S₅ çözülebilir olmadığı için beşinci derecenin genel formülü yoktur.",
      "Fizikte sürekli gruplar (Lie grupları) devreye girer: üç boyutlu döndürmeler sonsuz elemanlı SO(3) grubunu oluşturur ve kuantum mekaniğindeki spin onun 'çift örtüsü' SU(2) ile anlatılır. Standart Model'in parçacıkları SU(3) × SU(2) × U(1) ayar grubunun temsillerine göre dizilir; Noether teoremi her sürekli simetriyi bir korunum yasasına bağlar. Kimyada bir molekülün nokta grubu, hangi titreşimlerin kızılötesi spektrumda görüneceğini önceden söyler; katıhal fiziği ve kristalografi 230 uzay grubuyla çalışır. Bilgisayar biliminde mod p çarpma grubu Diffie–Hellman anahtar değişimini (1976) taşır; eliptik eğri grupları bugün tarayıcının ve telefonun güvenli bağlantılarında kullanılır.",
    ],
    topics: ["Soyut Cebir: koset, normal alt grup, bölüm grubu", "Homomorfizma ve izomorfizma teoremleri", "Sylow ve Jordan–Hölder teoremleri", "Galois teorisi", "Grup temsilleri ve karakter tabloları", "Lie grupları: SO(3), SU(2), SU(3)", "Kriptografide devirli gruplar", "Kristalografik uzay grupları"],
  },
  quiz: [
    {
      question: "13 elemanlı bir G grubu için hangisi kesinlikle doğrudur?",
      options: ["G değişmeli olmayabilir", "G'nin 6 elemanlı bir alt grubu olabilir", "Birim dışındaki her eleman bütün grubu üretir", "G'nin tam iki üreteci vardır"],
      answer: 2,
      explanation: "Bir elemanın mertebesi, ürettiği alt grubun eleman sayısıdır ve Lagrange'a göre 13'ü böler: 1 ya da 13. Birim dışındaki bir elemanın mertebesi 1 olamaz; demek ki 13'tür ve ⟨g⟩ = G. Asal mertebeli her grup bu yüzden devirlidir, değişmelidir ve p − 1 üreteci vardır (burada 12). Sayfada n = 11 seç: '1, 2, …, 10' hepsi üreteç çıkar.",
    },
    {
      question: "Z₁₂'nin (mod 12 toplama) aşağıdaki elemanlarından hangisi üreteçtir?",
      options: ["4 elemanı", "6 elemanı", "7 elemanı", "8 elemanı"],
      answer: 2,
      explanation: "Üreteç olmanın şartı ebob(k, 12) = 1. ebob(7, 12) = 1; 4, 6 ve 8 ise 12 ile bölen paylaşır. 7'nin katları 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5, 0: on ikisi de çıkar. Sayfada n = 12 seçip çemberde 7'ye tıkla: on iki ok bütün çemberi dolaşır; 'Rastgele üreteç' de yalnızca 1, 5, 7 ve 11'i seçer.",
    },
    {
      question: "D₄'te kareyi önce dikey eksene göre yansıtıp (s) sonra saat yönünde 90° döndürmek (r) hangi elemana eşittir? (Yazımda sağdaki önce uygulanır: sr = önce r, sonra s.)",
      options: ["sr", "sr²", "sr³", "e (birim)"],
      answer: 2,
      explanation: "Önce s sonra r, yazımda rs demektir ve D₄'ün kuralı rs = sr⁻¹ = sr³'tür. Sayfada sıfırlayıp önce s sonra r bas: durum kutusu 'r·s = sr³' ve köşeler 3, 2, 1, 4 yazar. Ters sırada (r, s) sonuç sr olur; iki yansımanın ekseni farklı köşegenlerdir.",
    },
  ],
  next: [
    { href: "asal-rsa.html", title: "Asal Sayılar & RSA", why: "Mod 5 çarpma grubunun büyüğü: Lagrange'tan çıkan a^φ(n) ≡ 1 (mod n) kuralı Euler teoremidir ve RSA'nın kalbinde çalışır." },
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri", why: "Döndürme ve yansımayı 2×2 matris olarak yaz; rs ≠ sr'nin sayısal karşılığı matris çarpımının sırasıdır." },
    { href: "sezar-sifre.html", title: "Sezar Şifresi", why: "Harfleri kaydırmak Z₂₆'da toplamadır: iki kaydırma art arda tek bir kaydırmadır, şifreyi çözmek ters elemanı uygulamaktır." },
    { href: "kristal-yapilar.html", title: "Kristal Yapılar", why: "Kübik ve altıgen sıkı paket hücreler: her biri 230 uzay grubundan birine aittir; simetri sayımının üç boyuttaki karşılığı." },
  ],
  sources: [
    { title: "Wikipedia · Group (mathematics)", url: "https://en.wikipedia.org/wiki/Group_(mathematics)", note: "Aksiyomlar, örnekler, tarihçe ve D₄ üzerinden anlatılan simetri grubu; sayfadaki kavramların kapsamlı özeti (İngilizce)." },
    { title: "MIT OpenCourseWare · 18.703 Modern Algebra", url: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/", note: "Lagrange, kosetler, bölüm grupları ve Sylow'a kadar ders notlarıyla açık bir lisans dersi (İngilizce)." },
    { title: "3Blue1Brown · Group theory, abstraction, and the 196,883-dimensional monster", url: "https://www.3blue1brown.com/lessons/groups-and-monsters", note: "Simetriden Monster grubuna görsel bir giriş; grup soyutlamasını ve değişmeme fikrini animasyonla anlatır." },
    { title: "Vikipedi · Évariste Galois", url: "https://tr.wikipedia.org/wiki/%C3%89variste_Galois", note: "Galois'nın yaşamı, düello ve el yazmalarının kaderi (Türkçe)." },
  ],
  revision: "Kasım 2026",
};
