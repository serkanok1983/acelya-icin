window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["grup-teorisi"] = {
  slug: "grup-teorisi",
  title: "Grup Teorisi: Simetrinin Dil Bilgisi",
  field: "Matematik",
  level: "Lisans",
  minutes: 45,
  tagline:
    "Bir kareyi döndürmek, kartları karıştırmak ve saat aritmetiği aynı dört kurala uyar. Grup teorisi bu kuralların bilimidir; Galois'nın 20 yaşında bıraktığı fikirlerden 15 bulmacasının yarısının neden çözülemediğine uzanır.",
  hook:
    "Kâğıttan bir kare kes, köşelerini 1-2-3-4 diye numarala. Önce 90° döndür, sonra bir eksen etrafında ters çevir. Baştan başla ve sırayı değiştir: önce çevir, sonra döndür. Köşeler aynı yere geldi mi? Gelmedi. Bu küçük 'hayır', beşinci derece denklemin genel kök formülü olmamasından 15 bulmacasının çözülemeyen yarısına ve Rubik küpünün 20 hamle sınırına uzanan bir matematiğin kapısıdır.",
  bigIdea:
    "Grup, her adımın geri alınabildiği bir işlem dünyasıdır: dört aksiyomu sağlayan her yapı (karenin simetrileri, kart karıştırma, mod n çarpma) aynı teoremlere uyar ve bunların ilki olan <strong>Lagrange teoremi</strong>, sonlu bir grupta her alt grubun eleman sayısının grubun eleman sayısını tam böldüğünü söyler.",
  story: [
    "Her şey bir formül arayışıyla başladı. İkinci dereceden denklemleri Babilliler çözebiliyordu; 1545'te Cardano'nun <em>Ars Magna</em>'sı üçüncü ve dördüncü derece için de kök formüllerini yayımladı; üçüncü derecenin çözümünü önce del Ferro ve Tartaglia bulmuştu, dördüncününkini Cardano'nun öğrencisi Ferrari. Sonra duvar: beşinci derece için yaklaşık iki yüz elli yıl boyunca kimse dört işlem ve kök almayla yazılan genel bir formül bulamadı. 1770–71'de Joseph-Louis Lagrange tuhaf bir yere baktı: bilinen formüllerin neden işlediğini, köklerin birbiriyle <strong>yer değiştirme</strong> biçimlerinde aradı. 1799'da Paolo Ruffini böyle bir formülün <em>olamayacağını</em> gösteren ilk, ama boşluklu kanıtı yayımladı; 1824'te Norveçli Niels Henrik Abel eksiksiz kanıtı, parasını kendi ödediği altı sayfalık bir broşüre sığdırdı. Abel 26 yaşında veremden öldü. Geriye kesin bir 'hayır' kalmıştı, ama hangi denklemin neden çözülemediğini söyleyen genel bir ölçüt yoktu.",
    "Ölçütü Paris'te, kimsenin anlamadığı bir genç buldu. Évariste Galois 1811'de doğdu, École Polytechnique'in giriş sınavında iki kez başarısız oldu. 1830'da Akademi sekreteri Fourier'ye teslim ettiği bir çalışma, Fourier ölünce kayboldu; 1831'de bir başkasını Poisson 'yeterince açık değil' diye geri çevirdi. Siyasi eylemleri yüzünden hapse girdi. 30 Mayıs 1832 sabahı bir düelloda karnından vuruldu ve ertesi gün, 20 yaşında öldü. Düellodan önceki gece arkadaşı Auguste Chevalier'ye fikirlerini özetleyen bir mektup yazdı, el yazmalarının üzerinden geçti; birinin kenarındaki not hâlâ okunabiliyor: 'Bu kanıtta tamamlanacak bir şey var. Zamanım yok.' Bütün teoriyi o gece yazdığı ise abartılmış bir efsanedir. Buluşu şuydu: bir denklemin köklerinin yer değiştirmeleri bir <strong>grup</strong> oluşturur ve denklemin kök almayla çözülüp çözülemeyeceğini bu grubun iç yapısı belirler. Genel beşinci derece denklemin grubu 120 elemanlı S₅'tir; içindeki 60 elemanlı A₅ daha küçük parçalara ayrılamaz (<strong>basit</strong>tir) ve değişmeli değildir: formül bu yüzden yoktur. Çalışmaları ancak 1846'da, Joseph Liouville onları kendi dergisinde yayımlayınca matematik dünyasına ulaştı.",
    "Aynı yüzyılda gruplar başka kapılardan da girdi. Carl Friedrich Gauss 1801'de yayımlanan <em>Disquisitiones Arithmeticae</em>'de, asal bir modülde bütün sıfırdan farklı kalanları tek bir sayının kuvvetleri olarak üreten bir <strong>ilkel kök</strong> bulunduğunu kanıtladı; bugünkü dille mod p çarpma grubu devirlidir. 1854'te Arthur Cayley grubu somut bir örnekten bağımsız, yalnızca işlem tablosuyla tanımladı; sayfadaki çarpım tablolarına onun adı verilir. Grupların bir oyuncağa girmesi de uzun sürmedi: New York eyaletinin Canastota kasabasında posta müdürü olan Noyes Chapman'ın, 15 bulmacasının bir öncülünü (satırları 34 eden on altı numaralı blok) 1874'te arkadaşlarına gösterdiği anlatılır. 1879'da Johnson ve Story, <em>American Journal of Mathematics</em>'te başlangıç düzenlerinin tam yarısının bir parite savıyla çözülemeyeceğini, öteki yarısının ise hep çözülebildiğini kanıtladı. Sam Loyd 1911'deki ölümüne dek, 1891'den beri, bulmacanın mucidi olduğunu ileri sürdü; bu iddia doğru değildir. Loyd'un anlattığına göre 14 ile 15'in yer değiştirdiği düzeni çözene 1.000 dolar ödül koymuştu; anlatıları tarihçilerce pek güvenilir sayılmaz, ama ödülün kazanılamayacağı kesindir: o düzenin çözülemeyeceği 1879'dan beri kanıtlıydı.",
    "Sonraki yüzyılda grup, denklemlerden koptu ve kendi başına bir nesne oldu. 1872'de Felix Klein, Erlangen Programı'nda geometriyi tersine çevirdi: bir geometri, bir dönüşüm grubunun değiştirmediği şeylerin incelenmesidir. 1918'de Emmy Noether, bir fizik sisteminin eylemini değiştirmeyen her sürekli simetrinin bir korunum yasası doğurduğunu kanıtladı: zamanda kaydırmaya karşı simetri enerjinin, uzayda kaydırmaya karşı simetri momentumun korunumunu verir. 1961'de Murray Gell-Mann ve Yuval Ne'eman birbirinden bağımsız olarak parçacıkları SU(3) grubunun örüntülerine dizdi; Gell-Mann 1962'de boş kalan bir yere yeni bir parçacık öngördü ve Ω⁻ 1964'te bulundu. Grup teorisinin kendi büyük projesi ise <strong>sonlu basit grupların sınıflandırılması</strong>ydı; asal sayılar tam sayılar için neyse, basit gruplar da sonlu gruplar için odur. Kanıt, yaklaşık yüz yazarın birkaç yüz makalesine, on binlerce sayfaya yayıldı. Daniel Gorenstein işin bittiğini 1983'te ilan etti; ama İngilizcede 'quasithin' denen bir grup ailesinde boşluk kalmıştı ve onu Michael Aschbacher ile Stephen D. Smith 2004'te 1221 sayfalık bir kanıtla kapattı.",
  ],
  core: [
    {
      heading: "Dört kural ve onları bozan yapılar",
      body:
        "Bir grup, bir küme ve onun iki elemanını birleştiren bir işlemdir; dört şart vardır. <strong>Kapalılık:</strong> sonuç kümeden çıkmaz. <strong>Birleşme:</strong> parantezlerin yeri önemsizdir. <strong>Birim:</strong> hiçbir şeyi değiştirmeyen bir e vardır. <strong>Ters:</strong> her yapılan geri alınabilir. Şartların her biri ayrı ayrı bozulabilir ve sayfanın 02 sekmesi her birine bir karşı örnek bulur. {1, 2, 3, 4, 5} mod 6 çarpmada 2 · 3 = 0 kümeden çıkar; ℤ₆'da çıkarma kapalıdır ama birleşmeli değildir, (0 − 0) − 1 = 5 iken 0 − (0 − 1) = 1; 'büyük olanı al' işleminde 0 birimdir ama 3'ü 0'a geri götüren eleman yoktur. Bütün bunlardan sonra bile dört satırdan güçlü sonuçlar çıkar. İki birim e ve e′ olsaydı e = e∗e′ = e′ olurdu: birim tektir. Sadeleştirme de bedavadır: a∗b = a∗c ise soldan a⁻¹ ile çarp, b = c. Bu yüzden bir grubun işlem tablosunda her satır ve her sütun her elemanı tam bir kez içerir: tablo bir <strong>Latin kare</strong>dir ve bunun için değişme gerekmez. Bir çarpımın tersi de sırayı çevirir: çorabı ve ayakkabıyı giydiğin sıranın tersiyle çıkarırsın.",
      formula: "(a∗b)⁻¹ = b⁻¹ ∗ a⁻¹",
      formulaNote: "Kanıt tek satır: (a∗b)∗(b⁻¹∗a⁻¹) = a∗(b∗b⁻¹)∗a⁻¹ = a∗a⁻¹ = e. Değişme (a∗b = b∗a) kurallar arasında yoktur; onu sağlayan gruplara Abel grubu denir.",
    },
    {
      heading: "Çokgenin simetrileri: Dₙ ve sağdan sola okuma",
      body:
        "Düzgün n-geni görüntüsü değişmeyecek biçimde yerine koymanın tam 2n yolu vardır: n döndürme ve n yansıma. Hepsi iki üreteçten çıkar: <strong>r</strong>, 360°/n saat yönünün tersine döndürme; <strong>s</strong>, uzayda sabit duran bir eksene göre yansıma. Yazım fonksiyon bileşkesi gibi sağdan sola okunur: a∘b 'önce b, sonra a' demektir; sr 'önce r, sonra s'. Elemanlar e, r, …, rⁿ⁻¹ ve s, rs, …, rⁿ⁻¹s biçiminde yazılır; rᵏs önce s'yi, sonra rᵏ'yı uygular. Ayna döndürmenin yönünü çevirdiği için önce r sonra s, önce s sonra ters yönde döndürmeyle aynıdır: sr = r⁻¹s. Karede bu sr = r³s ≠ rs demektir; grup değişmeli değildir. Ne kadar değişmeli olmadığı da sayılabilir. a ile değişen elemanlar a'nın merkezleyicisini oluşturur ve onun eleman sayısı |G| bölü a'nın eşlenik sınıfının büyüklüğüdür. Bütün a'lar üzerinden toplayınca değişen sıralı çiftlerin sayısı |G| · k çıkar; k eşlenik sınıfı sayısıdır. Dₙ'de k, tek n için (n + 3)/2, çift n için (n + 6)/2'dir: birim, döndürme çiftleri {rᵏ, r⁻ᵏ} ve tek n'de tek bir yansıma sınıfı; çift n'de ayrıca r<sup>n/2</sup> ve iki yansıma sınıfı. Bir döndürmenin mertebesi de bir formüle bağlanır: rᵏ'yı n/ebob(n, k) kez uygulayınca şekil başa döner.",
      formula: "|{(a, b): ab ≠ ba}| = (2n)² − 2n·k",
      formulaNote: "D₄ için k = 5: 64 − 40 = 24; D₅ için k = 4: 100 − 40 = 60. Sayfa aynı sayıyı tabloyu tek tek tarayarak bulur. Bileşkeyi soldan sağa okuyan kitaplarda rs ile sr'nin adları yer değiştirir, çarpımların kendisi değişmez.",
    },
    {
      heading: "Lagrange teoremi: yörünge, sabitleyici ve tersinin çöktüğü yer",
      body:
        "H, G'nin içinde kendi başına grup olan bir parçaysa (bir <strong>alt grup</strong>), G'yi H'nin birbirine değmeyen kopyalarıyla döşeyebilirsin: H, g₁H, g₂H, … Bu kopyalara <strong>koset</strong> (yan küme) denir; hepsi H kadar elemanlıdır ve iki koset ya aynıdır ya hiç kesişmez. Döşeme tam çıktığı için |H|, |G|'yi böler. Dₙ'de döndürmeler ⟨r⟩ n elemanlıdır ve indeksi 2'dir: bütün yansımalar öteki kosette, ⟨r⟩s'dedir. Aynı fikir bir desenin simetrisini de sayar. Desenli bir kare karoyu D₄'ün 8 elemanıyla hareket ettir: deseni değiştirmeyenler bir alt grup olan <strong>sabitleyici</strong>yi, ortaya çıkan farklı görüntüler <strong>yörünge</strong>yi oluşturur. Aynı görüntüyü veren elemanlar tam olarak sabitleyicinin bir kosetini doldurduğu için yörünge × sabitleyici = 8 olur. Fırıldak deseninde 2 × 4, tek yatay şeritte 4 × 2, L işaretinde 8 × 1. Tersi ise yanlıştır: 12 elemanlı A₄'ün 6 elemanlı alt grubu yoktur. Kanıt taslağı: 6 elemanlı bir H olsaydı indeksi 2 olurdu; indeksi 2 olan alt grup her elemanın karesini içerir, çünkü G/H iki elemanlıdır. A₄'ün sekiz 3-döngüsünün her biri σ = (σ²)² biçiminde bir karedir; birimle birlikte 9 eleman 6'ya sığmaz.",
      formula: "|G| = |H| · [G : H]  ·  |Yörünge| · |Sabitleyici| = |G|",
      formulaNote: "[G : H] koset sayısı, yani indeks. Teorem Lagrange'ın adını taşır, ama o 1770–71'de yalnızca bir polinomun değişkenlerini karıştırınca çıkan farklı polinom sayısının n!'i böldüğünü görmüştü. Sonra Gauss ℤₚ* için, Cauchy simetrik gruplar için kanıtladı; her permütasyon grubu için kanıt Camille Jordan'ındır (1861).",
    },
    {
      heading: "Permütasyonun işareti ve 15 bulmacasının değişmezi",
      body:
        "Bir permütasyonu ayrık döngülere ayırınca iki şey hemen okunur. <strong>Mertebe</strong>, döngü uzunluklarının en küçük ortak katıdır: (1 2 3)(4 5) üç adımlık ve iki adımlık iki çark gibidir, ikisi aynı anda ancak 6 adımda başa döner. <strong>İşaret</strong> ise permütasyonu kaç yer değiştirmeye (transpozisyona) ayırabildiğinin paritesidir. k uzunluklu bir döngü k − 1 yer değiştirmedir: (a₁ … aₖ) = (a₁ aₖ)…(a₁ a₃)(a₁ a₂), en sağdaki önce. Ayrıştırma tek değildir ama paritesi tektir; bunun bir kanıtı, ikinci bir sayımla aynı sonucun çıkmasıdır: sıralamada ters düşen çiftlerin sayısı, her yer değiştirmede tek sayı kadar değişir. Kayan taş bulmacası bu fikrin oyun hâlidir. Boşluğu da bir taş say: her kaydırma boşlukla bir taşın yer değiştirmesidir, permütasyonun paritesini çevirir; aynı anda boşluğu bir kare taşır, sağ alt köşeye sokak uzaklığının paritesini de çevirir. İkisinin toplamı mod 2 hiç değişmez ve çözülmüş tahtada 0'dır. Yalnız 14 ile 15'i değiştirmek pariteyi 1 yapar, boşluğu yerinde bırakır: toplam 1, tahta çözülemez. Tersi de doğrudur, değişmezi çift olan her düzen çözülür; 3 × 3 tahtada bu, 9!/2 = 181.440 düzenin hepsine gerçekten ulaşılarak görülür.",
      formula: "sgn σ = (−1)<sup>n − c</sup> = (−1)<sup>ters düşen çift sayısı</sup>",
      formulaNote: "c, sabit noktalar dahil döngü sayısı. sgn(στ) = sgn σ · sgn τ olduğundan çift permütasyonlar bir alt grup oluşturur: n! elemanlı Sₙ'nin yarısı, Aₙ.",
    },
    {
      heading: "Mod n çarpma: Euler, ilkel kök ve grubun yapısı",
      body:
        "n ile aralarında asal kalanlar mod n çarpmayla bir grup oluşturur: <strong>ℤₙ*</strong>. Eleman sayısı Euler'in φ(n)'sidir, φ(10) = 4 ({1, 3, 7, 9}). Lagrange'tan Euler teoremi tek satırda çıkar: a'nın kuvvetleri ord(a) elemanlı bir alt grup oluşturur, ord(a) φ(n)'yi böler ve a<sup>φ(n)</sup> ≡ 1. n asalken bu Fermat'nın küçük teoremidir. Asıl soru, grubun <strong>devirli</strong> olup olmadığıdır: mertebesi φ(n) olan bir eleman, yani bir <strong>ilkel kök</strong> var mı? Mod 10'da 3'ün kuvvetleri 1, 3, 9, 7 ile bütün grubu dolaşır; mod 8'de ise 3² = 9, 5² = 25, 7² = 49 hepsi 1'e eşittir ve hiçbir eleman 4 adım yürüyemez. Genel cevap şudur: ilkel kök ancak ve ancak n = 1, 2, 4, pᵏ ya da 2pᵏ (p tek asal) iken vardır ve o zaman sayısı φ(φ(n))'dir. Nedeni Çin kalan teoremidir: n = ∏ pᵏ ise ℤₙ* ≅ ∏ ℤ<sub>pᵏ</sub>* olur; tek asal kuvvetlerin çarpanları devirlidir, ℤ<sub>2ᵏ</sub>* ise k ≥ 3 iken kendisi bile devirli değildir (ℤ₈* ≅ ℤ₂ × ℤ₂). İki çarpanın ikisi de çift mertebeliyse en büyük mertebe λ(n), φ(n)'den küçük kalır. ℤ₁₀₀* ≅ ℤ₄* × ℤ₂₅* ≅ ℤ₂ × ℤ₂₀ grubunda λ = 20, φ = 40.",
      formula: "a<sup>φ(n)</sup> ≡ 1 (mod n),  φ(n) = n · ∏ (1 − 1/p)",
      formulaNote: "Çarpım n'yi bölen farklı asallar üzerindendir. İki grubun aynı olup olmadığını da mertebeler ele verir: izomorfizma her elemanı aynı mertebeden bir elemana götürür.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var ve bütün gruplar üreteçlerden tarayıcıda hesaplanır; her okuma, sayılan değeri kuramın verdiğiyle yan yana yazar. Yazım her yerde sağdan sola: a∘b = önce b, sonra a. <strong>01 · Simetri grupları</strong>: <strong>Kenar sayısı n</strong> kaydırıcısı (3–8), <strong>r: döndür</strong> (360°/n saat yönünün tersine), <strong>r⁻¹: geri döndür</strong>, <strong>s: yansıt</strong> (sabit kesikli eksene göre), <strong>Başlangıç konumu</strong>; her yeni hamle soldan çarpılır. Bileşke panelinde <strong>Birinci hamle a</strong> ve <strong>İkinci hamle b</strong> seçilir; Cayley tablosunda satır a, sütun b, hücre a∘b. <strong>Şekil</strong> menüsünde <strong>Desenli kare karo</strong> seçilince <strong>Karo deseni</strong> menüsü ile sabitleyici ve yörünge kartları açılır. <strong>02 · Grup aksiyomları</strong>: <strong>Yapı</strong> menüsü ve n kaydırıcısı; dört aksiyom kartı, işlem tablosu, Lagrange kartları ve alt grup kafesi. <strong>03 · Permütasyonlar</strong>: <strong>σ, döngü gösterimiyle</strong> ve <strong>τ</strong> kutuları, <strong>σ'yı uygula</strong>, <strong>Desteyi diz</strong>; altta <strong>Tahta</strong> menülü kayan taş bulmacası ve <strong>Son iki taşı değiştir</strong>, <strong>Çözülmüş tahta</strong> düğmeleri. <strong>04 · Devirli gruplar ve sayılar</strong>: <strong>Modül n</strong> (2–100), <strong>Taban a</strong>, <strong>Sonraki ilkel kök</strong> ve <strong>Karşılaştırılan iki grup</strong> menüsü. 'Rastgele σ', 'Kaydırarak karıştır' ve 'Taşları rastgele diz' her basışta farklı sonuç verir; aşağıdaki deneyler yalnız her seferinde aynı sonucu veren düğmeleri kullanır.",
    experiments: [
      {
        title: "Sıra önemli mi? Karede r ile s",
        predict: "Kareyi önce döndürüp sonra yansıtmak, önce yansıtıp sonra döndürmekle aynı mı? 8 elemanlı D₄'te 64 sıralı çiftten kaçı değişmez (ab ≠ ba)? Beşgende bu oran artar mı, azalır mı?",
        do: "01 · Simetri grupları sekmesinde <strong>Bu sekmeyi sıfırla</strong>'ya bas ve bileşke panelinin altındaki yazıyı oku (a = r, b = s). Sonra <strong>r: döndür</strong>, ardından <strong>s: yansıt</strong>'a bas. <strong>Başlangıç konumu</strong>'na dönüp önce s, sonra r bas. Son olarak Kenar sayısı n'yi 5 yap.",
        observe: "Bileşke yazısı: 'Önce a = r, sonra b = s: b∘a = r³s. Ters sıra: a∘b = rs. İkisi farklı (turuncu)'. r, s basınca şu anki eleman 'r³s · (1 4)(2 3)', mertebe sayılan 2, kuram 2; s, r basınca 'rs · (1 2)(3 4)'. Değişmeyen çiftler kartı '24 / 64 · kuram 24', merkez {e, r²}. n = 5'te '60 / 100 · kuram 60' ve merkez yalnız {e}.",
        explain: "Önce r sonra s, yazımda sr'dir ve sr = r⁻¹s = r³s: ayna, döndürmenin yönünü çevirir. Ters sıra rs başka bir eksene göre yansımadır; tabloda iki hücre farklı renkte çerçevelenir. Sayım formüle uyar: D₄'te 5 eşlenik sınıfı var, değişen çift sayısı 8 · 5 = 40, değişmeyen 64 − 40 = 24. D₅'te sınıf sayısı (5 + 3)/2 = 4, değişmeyen 100 − 40 = 60: oran %37,5'ten %60'a çıkar. Çift n'de r<sup>n/2</sup> (karede 180° döndürme) her şeyle değişir ve merkeze girer; tek n'de böyle bir döndürme yoktur.",
      },
      {
        title: "Hangi aksiyom bozuluyor?",
        predict: "{1, …, n − 1} kümesi mod n çarpmayla n = 6'da grup olur mu, n = 7'de? ℤ₆'da çıkarma hangi şartta takılır? 12 elemanlı A₄'te 12'nin her böleni için bir alt grup bulunur mu?",
        do: "02 · Grup aksiyomları sekmesinde Yapı menüsünden '{1, …, n − 1}, çarpma mod n' seç (n = 6); dört kartı oku, sonra n'yi 7 yap. Ardından 'ℤₙ, çıkarma a − b mod n' (n = 6) ve en son 'A₄: dört nesnenin çift permütasyonları' seç; Lagrange kartlarını ve bölenler tablosunu oku.",
        observe: "n = 6: kapalılık 'Bozuluyor', '2 ∗ 3 = 0 kümede yok · 4 / 25 çarpım dışarı taşıyor'; ters '3 / 5 elemanın tersi yok'. n = 7: '6 elemanlı bir grup, değişmeli'. Çıkarmada birleşme '(0 ∗ 0) ∗ 1 = 5 ama 0 ∗ (0 ∗ 1) = 1 · 144 / 216 üçlüde bozuk', birim 'Yok' (yalnız sağ birim 0), ters 'Sınanamaz'. A₄: '10 / 10 alt grup' ve 'tersi doğru değil: 6 mertebeli alt grup yok'.",
        explain: "6 bileşik olduğu için iki sıfırdan farklı kalanın çarpımı 0 olabilir; 7 asalken p | ab ise p | a ya da p | b'dir, sıfır bölen yoktur ve kalanlar ℤ₇* grubunu oluşturur. Çıkarmada a − 0 = a ama 0 − a ≠ a: 0 yalnız sağdan birimdir, birim olmayınca 'ters' sorusu anlamsızdır. Tek bir karşı örnek bir şartı çürütmeye yeter; şartın sağlandığını söylemek için sayfa 6³ = 216 üçlünün hepsini dener. A₄ Lagrange'ın tek yönlü olduğunu gösterir: 10 alt grubun hepsinin mertebesi 12'yi böler, ama 6 bölen olduğu hâlde 6 elemanlı alt grup yoktur.",
      },
      {
        title: "Kart karıştırma ve 15 bulmacasının yasak yarısı",
        predict: "σ = (1 2 3)(4 5) ile beş kartı kaç kez karıştırırsan deste ilk düzenine döner? σ çift mi tek mi? 15 bulmacasında yalnız 14 ile 15'i değiştirirsen tahta çözülebilir mi?",
        do: "03 · Permütasyonlar sekmesinde varsayılan σ'nın kartlarını oku, sonra <strong>σ'yı uygula</strong>'ya altı kez bas. Bulmacada <strong>Son iki taşı değiştir</strong>'e bas. Sonra Tahta menüsünden '3 × 3 · 8 bulmacası' seç; önce çözülmüş tahtayı, sonra yine Son iki taşı değiştir'i oku.",
        observe: "Mertebe '6 · kuram ekok(3, 2) = 6'; işaret '−1 · tek', notu '3 yer değiştirme → (−1)^3 = −1; 3 ters düşen çift → (−1)^3 = −1; iki sayım aynı'. Altı basıştan sonra '6 karıştırma', 'deste ilk düzende'. 4 × 4 takas: parite 'tek · 1 yer değiştirme', uzaklık 0, 'Çözülemez'. 3 × 3: '181.440 durum · kuram 9!/2 = 181.440'; çözülmüş tahta 'en az 0 hamlede çözülür (en zor düzen 31 hamle; böyle 2 düzen var)'; takastan sonra 'bu düzen arasında yok: hiçbir hamle dizisi çözemez · kuramla uyumlu'.",
        explain: "Döngüler iki çark gibidir: 3 ve 2 adımlık çarklar ancak ekok(3, 2) = 6 adımda birlikte başa döner. (1 2 3) iki, (4 5) bir yer değiştirmedir: toplam 5 − 2 = 3, tek; iki satırlı yazımda 2 3 1 5 4 sıralamasının (2, 1), (3, 1), (5, 4) çiftleri de 3 eder. Bulmacada her kaydırma permütasyon paritesini ve boşluğun uzaklık paritesini birlikte çevirir; toplamları değişmez. Takas tahtasında toplam 1 + 0 = 1, çözülmüş tahtada 0: arada hiçbir hamle dizisi yoktur. 3 × 3'te genişlik öncelikli arama 9! = 362.880 düzenin tam yarısına ulaşır; kuramın iki yönü birlikte doğrulanır.",
      },
      {
        title: "İlkel kök avı: hangi modül devirli?",
        predict: "Mod 10 çarpmada 3'ün kuvvetleri bütün birimleri dolaşır mı? Mod 8'de dolaşan bir taban var mı? Mod 100'de en büyük mertebe φ(100) = 40'a ulaşır mı?",
        do: "04 · Devirli gruplar ve sayılar sekmesinde varsayılanla başla (Modül n = 10, Taban a = 3). Sonra Modül n'yi 8'e, ardından 100'e getir; Taban a 3'te kalsın. Son olarak Karşılaştırılan iki grup menüsünden 'ℤ₄ ve ℤ₂ × ℤ₂' seç.",
        observe: "n = 10: φ kartı '4 · formül 4', 'ord(3) = 4', ilkel kökler '2 tane: 3, 7' ve 'kuram φ(φ(n)) = φ(4) = 2 · fark 0', yapı 'ℤ₄'. n = 8: 'ord(3) = 2', ilkel kök 'Yok', 'λ = 2 < φ(n) = 4', yapı 'ℤ₂ × ℤ₂'. n = 100: 'ord(3) = 20', '3⁴⁰ mod 100 = 1', 'Yok', 'λ = 20 < φ(n) = 40', yapı 'ℤ₂ × ℤ₂₀'. Tarama şeridi: arama ve ölçüt 50'şer değerde 'var' diyor, uyuşmayan değer 0. İzomorfizma: 'ℤ₄ ≇ ℤ₂ × ℤ₂', profiller '1: 1, 2: 1, 4: 2' ve '1: 1, 2: 3'; arama kartı mertebe profillerinin farklı olmasının tek başına yettiğini, eşleme aramaya gerek kalmadığını yazar.",
        explain: "10 = 2 · 5 ölçüte uyar (2pᵏ biçimi), 8 = 2³ ve 100 = 4 · 25 uymaz. Mod 8'de her birimin karesi 1'dir; grup, iki tane iki elemanlı devirli grubun çarpımıdır. Mod 100'de Çin kalan teoremi grubu ℤ₄* × ℤ₂₅* ≅ ℤ₂ × ℤ₂₀ diye ayırır; bir elemanın mertebesi iki bileşenin mertebelerinin ekok'udur ve ekok(2, 20) = 20'yi aşamaz. Euler teoremi yine işler, çünkü 20, 40'ı böler. ℤ₄'te mertebesi 4 olan iki eleman (1 ve 3) vardır, ℤ₂ × ℤ₂'de hiç yoktur; izomorfizma mertebeyi koruduğu için bu fark tek başına iki grubun farklı olduğunu kanıtlar.",
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
      title: "181.440 düzenin yalnız ikisi 31 hamle ister",
      body:
        "8 bulmacasında taşları kutudan çıkarıp gelişigüzel dizmenin 9! = 362.880 yolu vardır; bunların tam yarısına hiçbir kaydırma dizisiyle ulaşılamaz, bunu Johnson ve Story 1879'da bir parite savıyla kanıtladı. Ulaşılabilen 181.440 düzenin her biri en çok 31 tek taş hamlesiyle çözülür ve sayfanın bütün düzenleri tek tek gezen araması, 31 hamle isteyen düzenin yalnızca 2 tane olduğunu bulur: 03 sekmesinde 3 × 3 tahtanın arama kartı 'böyle 2 düzen var' yazar. 4 × 4 tahtada hesap tarayıcıya sığmaz: 16!/2 ≈ 1,05 × 10¹³ düzen vardır, en zorları 80 hamle ister ve bunlardan 17 tane vardır.",
    },
    {
      title: "Duvar kâğıdı için yalnızca 17 desen",
      body:
        "Bir düzlemi iki yönde tekrarlayan bir desenle kaplamanın, simetri bakımından tam 17 türü vardır; ne eksik ne fazla. Listenin tam olduğunu 1891'de Rus kristalograf Evgraf Fedorov kanıtladı, George Pólya 1924'te bağımsız olarak yeniden buldu. Elhamra Sarayı'nın süslemelerinde bunlardan kaçının bulunduğu ise hâlâ tartışılıyor. Üç boyutta, kristaller için sayı 230'dur: Fedorov ve Arthur Schoenflies 1891'de birbirinden bağımsız listeler çıkardı, mektuplaşarak hatalarını ayıkladı ve doğru liste 1892'de tamamlandı. Kristallerden X ışını kırınımı ilk kez 1912'de gözlendi: atomların dizilişi görülmeden önce olası bütün simetrileri sayılmıştı.",
    },
  ],
  worked: {
    title: "ℤ₁₅*: neden ilkel kök yok?",
    prompt:
      "15 ile aralarında asal kalanların mod 15 çarpma grubu ℤ₁₅*'ı ele al. (a) Elemanlarını ve φ(15)'i bul. (b) Her elemanın mertebesini hesapla ve Lagrange ile karşılaştır. (c) İlkel kök olmadığını Çin kalan teoremiyle açıkla ve grubu devirli grupların çarpımı olarak tanı. (d) 2⁸ mod 15'i Euler teoremiyle hesapla. Sonucu sayfanın 04 sekmesinde Modül n = 15, Taban a = 2 ile karşılaştır.",
    steps: [
      "15 = 3 · 5. 15 ile ortak böleni olmayan kalanlar 1, 2, 4, 7, 8, 11, 13, 14: φ(15) = 8. Formülle de 15 · (1 − 1/3) · (1 − 1/5) = 15 · 2/3 · 4/5 = 8.",
      "Kuvvetleri 1'e dönene dek yürü. 2: 2, 4, 8, 16 ≡ 1, yani ord(2) = 4. 4: 16 ≡ 1, ord(4) = 2. 7: 7, 49 ≡ 4, 28 ≡ 13, 91 ≡ 1, ord(7) = 4. Aynı yolla ord(8) = ord(13) = 4, ord(11) = ord(14) = 2. Profil: mertebe 1 bir eleman, mertebe 2 üç eleman (4, 11, 14), mertebe 4 dört eleman (2, 7, 8, 13). Hepsi 8'i böler: Lagrange.",
      "Mertebesi 8 olan eleman yok, demek ki ilkel kök yok ve grup devirli değil. Nedeni: Çin kalan teoremi a ↦ (a mod 3, a mod 5) eşlemesiyle ℤ₁₅* ≅ ℤ₃* × ℤ₅* ≅ ℤ₂ × ℤ₄ verir. Bir çiftin mertebesi bileşen mertebelerinin ekok'udur ve ekok(2, 4) = 4'ü aşamaz: λ(15) = 4 < 8. 15, 1, 2, 4, pᵏ, 2pᵏ biçimlerinin hiçbirine uymaz.",
      "Sağlama: ℤ₂ × ℤ₄'te (x, y)'nin mertebesi ekok(ord x, ord y)'dir; mertebe 2 olanlar (1, 0), (0, 2), (1, 2): üç tane; mertebe 4 olanlar y = 1 ya da 3 olan dört eleman. Profil ℤ₁₅*'ınkiyle aynı.",
      "Euler: ebob(2, 15) = 1 olduğundan 2⁸ ≡ 1 (mod 15); doğrudan 256 = 17 · 15 + 1. Aslında 2⁴ ≡ 1 zaten, çünkü ord(2) = 4 ve 4 | 8. Sayfada: φ kartı '8 · formül 8', 'ord(2) = 4', '4 | 8 (bölüm 2)', '2⁸ mod 15 = 1', ilkel kökler 'Yok', 'λ = 4 < φ(n) = 8', yapı 'ℤ₂ × ℤ₄'. İzomorfizma menüsünde 'ℤ₁₅* ve ℤ₂ × ℤ₄' seçilince 'ℤ₁₅* ≅ ℤ₂ × ℤ₄' ve '64 çiftin hepsinde' korunan bir eşleme çıkar.",
    ],
    result:
      "ℤ₁₅* = {1, 2, 4, 7, 8, 11, 13, 14}, φ(15) = 8. Mertebeler 1 (1 eleman), 2 (3 eleman), 4 (4 eleman); en büyük mertebe λ = 4 < 8, ilkel kök yoktur ve ℤ₁₅* ≅ ℤ₂ × ℤ₄. 2⁸ ≡ 1 (mod 15).",
  },
  misconceptions: [
    {
      myth: "Grubun mertebesini bölen her sayı için bir alt grup vardır.",
      truth:
        "Lagrange tek yönlüdür: alt grup varsa mertebesi böler. Tersi yanlıştır; 12 elemanlı A₄'ün 6 elemanlı alt grubu yoktur ve sayfanın 02 sekmesi A₄ için 'tersi doğru değil: 6 mertebeli alt grup yok' yazar. Tersi bütün devirli gruplarda ve sonlu Abel gruplarında doğrudur; her grupta da asal kuvvet bölenler için doğrudur (Sylow).",
    },
    {
      myth: "Grup işlemi her zaman değişmelidir; sıra fark etmez.",
      truth:
        "Değişme aksiyomlarda yoktur. Karede önce döndürüp sonra yansıtmak r³s, önce yansıtıp sonra döndürmek rs verir; ikisi farklı eksenlere göre yansımadır ve D₄'ün 64 sıralı çiftinden 24'ü değişmez. Altı elemanlı S₃ değişmeli olmayan en küçük gruptur: sağdan sola okuyunca (1 2)(1 3) = (1 3 2) ama (1 3)(1 2) = (1 2 3). Matris çarpımı, üç boyutlu döndürmeler ve Rubik küpü de değişmeli değildir.",
    },
    {
      myth: "Eleman sayısı aynıysa gruplar aynıdır.",
      truth:
        "ℤ₄ ve ℤ₂ × ℤ₂ dörder elemanlıdır ama farklıdır: ℤ₄'te 1 ve 3'ün mertebesi 4'tür, ℤ₂ × ℤ₂'de birim dışındaki her elemanın mertebesi 2'dir. İzomorfizma mertebeyi koruduğu için bu kadarı yeter. Buna karşılık ℤ₅*, sayıları farklı olsa da ℤ₄'ün aynısıdır: 2'nin kuvvetleri 1, 2, 4, 3 olduğundan 2ᵏ ↦ k eşlemesi işlemi korur. Mertebe profilinin aynı olması ise kanıt değildir, yalnız bir ön sınavdır; sayfa bu yüzden bulduğu eşlemeyi bütün çiftlerde sınar.",
    },
    {
      myth: "Normal alt grup, elemanları grubun her elemanıyla değişen alt gruptur.",
      truth:
        "Normallik küme düzeyinde bir eşitliktir: her g için gNg⁻¹ = N; elemanların tek tek değişmesi gerekmez. Dₙ'de döndürmelerin alt grubu ⟨r⟩ normaldir ama r ile s değişmez: sr = r⁻¹s ≠ rs. Olan şu: s·r·s⁻¹ = r⁻¹, yani eşlenik alma bir döndürmeyi başka bir döndürmeye götürür, kümeden çıkarmaz. 02 sekmesinde S₃'ü seçince alt grup kafesinde ⟨(1 2 3)⟩'ün dairesi (içinde 3 yazar) dolu, yani normal; iki elemanlı üç alt grubun daireleri (içlerinde 2 yazar) boştur. Her elemanla gerçekten değişen elemanlar ayrı bir kavramdır, grubun merkezi; D₄'te merkez {e, r²}'dir.",
    },
  ],
  glossary: [
    { term: "Grup", definition: "Kapalılık, birleşme, birim ve ters eleman şartlarını sağlayan bir küme ile bir ikili işlem." },
    { term: "Mertebe", definition: "Grubun eleman sayısı |G|; bir g elemanının mertebesi ise gᵏ = e olan en küçük pozitif k'dir (toplamsal yazımda k·g = 0)." },
    { term: "Abel grubu", definition: "İşlemin değişmeli olduğu grup: her a, b için a∗b = b∗a; işlem tablosu köşegene göre simetriktir." },
    { term: "Alt grup ve koset", definition: "Alt grup, aynı işlemle kendi başına grup olan alt kümedir; kosetleri gH grubu çakışmadan döşer ve sayılarına indeks [G : H] denir." },
    { term: "Normal alt grup", definition: "Her g için gNg⁻¹ = N olan, yani elemanlarının bütün eşleniklerini içeren alt grup; kosetleri ancak bu durumda G/N bölüm grubunu oluşturur." },
    { term: "İzomorfizma", definition: "İki grup arasında işlemi koruyan birebir ve örten eşleme, f(a∗b) = f(a)∗f(b); varsa gruplar yapı olarak aynıdır (ℤ₅* ≅ ℤ₄)." },
    { term: "Permütasyonun işareti", definition: "Permütasyonu oluşturan yer değiştirme sayısının paritesine göre +1 (çift) ya da −1 (tek); ayrıştırma tek değildir ama işaret tektir." },
    { term: "İlkel kök", definition: "Kuvvetleri ℤₙ*'ın bütün elemanlarını üreten, yani mertebesi φ(n) olan kalan; varsa ℤₙ* devirlidir ve bu ancak n = 1, 2, 4, pᵏ, 2pᵏ iken olur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Matematik bölümlerindeki <strong>Soyut Cebir</strong> dersi tam bu sayfanın kaldığı yerden başlar: koset, normal alt grup, bölüm grubu ve homomorfizma. Normal bir alt grubun kosetleri kendi aralarında yine grup oluşturur; bu, büyük grubu 'katlayıp' küçültmektir: ℤ₁₂'yi ⟨4⟩ = {0, 4, 8} ile katlamak ℤ₄'ü, A₄'ü V₄ ile katlamak ℤ₃'ü verir. Katlamayı sürdürünce her sonlu grup <strong>basit</strong> parçalara ayrılır ve Jordan–Hölder teoremi bu parçaların, sıraları dışında, tek türlü olduğunu söyler: A₄'ün parçaları ℤ₃, ℤ₂, ℤ₂'dir. Ama parçaları bilmek binayı bilmek değildir: ℤ₄ ile ℤ₂ × ℤ₂ aynı iki ℤ₂ parçasından yapılır ve yine de farklıdır. Sylow teoremleri Lagrange'ın tersini asal kuvvetler için kurtarır; sonlu Abel gruplarının yapı teoremi, sayfanın ℤₙ* için yaptığı ayrıştırmayı (ℤ₁₀₀* ≅ ℤ₂ × ℤ₂₀) her sonlu Abel grubuna genelleştirir. Ardından Galois teorisi gelir: bir polinomun kökleri, ancak ve ancak Galois grubu değişmeli basamaklarla parçalanabiliyorsa (<em>çözülebilir</em> ise) kök almayla yazılabilir; S₅ çözülebilir olmadığı için beşinci derecenin genel formülü yoktur.",
      "Fizikte sürekli gruplar (Lie grupları) devreye girer: üç boyutlu döndürmeler sonsuz elemanlı SO(3) grubunu oluşturur ve kuantum mekaniğindeki spin onun 'çift örtüsü' SU(2) ile anlatılır. Standart Model'in parçacıkları SU(3) × SU(2) × U(1) ayar grubunun temsillerine göre dizilir; Noether teoremi her sürekli simetriyi bir korunum yasasına bağlar. Kimyada bir molekülün nokta grubu, hangi titreşimlerin kızılötesi spektrumda görüneceğini önceden söyler; katıhal fiziği ve kristalografi 230 uzay grubuyla çalışır. Bilgisayar biliminde mod p çarpma grubu ve onun ilkel kökleri Diffie–Hellman anahtar değişimini (1976) taşır; eliptik eğri grupları bugün tarayıcının ve telefonun güvenli bağlantılarında kullanılır. Kombinatorikte Burnside lemması, yörünge–sabitleyici eşitliğinden çıkarak bir desenin simetri bakımından kaç farklı boyanışı olduğunu sayar.",
    ],
    topics: ["Soyut Cebir: koset, normal alt grup, bölüm grubu", "Homomorfizma ve izomorfizma teoremleri", "Grup etkileri, yörünge–sabitleyici ve Burnside lemması", "Sylow ve Jordan–Hölder teoremleri", "Sonlu Abel gruplarının yapı teoremi", "Galois teorisi", "Lie grupları: SO(3), SU(2), SU(3)", "Kriptografide devirli gruplar"],
  },
  quiz: [
    {
      question: "Düzgün yedigenin simetri grubu D₇'nin 14 elemanı var ve 7 tek olduğu için eşlenik sınıfı sayısı (7 + 3)/2 = 5. Cayley tablosunun 196 sıralı çiftinden kaçında ab ≠ ba olur?",
      options: ["70", "98", "126", "140"],
      answer: 2,
      explanation: "Bir a ile değişen elemanların sayısı |G| bölü a'nın sınıfının büyüklüğüdür; bütün a'lar üzerinden toplayınca değişen çiftler |G| · k = 14 · 5 = 70 eder. Değişmeyenler 196 − 70 = 126, yani çiftlerin yaklaşık %64'ü. 70, değişen çiftlerin sayısıdır; tuzak budur. Sayfada 01 sekmesinde Kenar sayısı n'yi 7 yap: kart '126 / 196 · kuram 126' yazar.",
    },
    {
      question: "S₆'da σ = (1 2 3 4)(5 6) altı kartlık bir desteye art arda uygulanıyor. Deste en az kaç karıştırmada ilk düzenine döner ve σ çift mi tek mi?",
      options: ["4 karıştırma, çift", "8 karıştırma, tek", "6 karıştırma, çift", "4 karıştırma, tek"],
      answer: 0,
      explanation: "Mertebe döngü uzunluklarının ekok'udur: ekok(4, 2) = 4, uzunlukların çarpımı olan 8 değil. 4-döngü 3, 2-döngü 1 yer değiştirmedir; toplam 4 = 6 − 2 (n eksi döngü sayısı), yani σ çifttir. 03 sekmesinde Nesne sayısı n'yi 6, σ'yı (1 2 3 4)(5 6) yap: mertebe '4 · kuram ekok(4, 2) = 4', işaret '+1 · çift' ve iki sayım da 4 çıkar.",
    },
    {
      question: "Aşağıdaki modüllerin hangisinde mod n çarpma grubu ℤₙ* devirli değildir, yani ilkel kök yoktur?",
      options: ["n = 18", "n = 45", "n = 50", "n = 54"],
      answer: 1,
      explanation: "İlkel kök ancak n = 1, 2, 4, pᵏ, 2pᵏ (p tek asal) iken vardır: 18 = 2 · 3², 50 = 2 · 5², 54 = 2 · 3³ bu biçimdedir. 45 = 3² · 5 iki ayrı tek asal içerir; Çin kalan teoremi ℤ₄₅* ≅ ℤ₉* × ℤ₅* ≅ ℤ₆ × ℤ₄ verir ve en büyük mertebe ekok(6, 4) = 12 < φ(45) = 24 olur. Sayfada Modül n = 45: ilkel kökler 'Yok', 'λ = 12 < φ(n) = 24'.",
    },
  ],
  next: [
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri: Düzlemi Dört Sayıyla Yeniden Çizmek", why: "Döndürme ve yansımayı 2×2 matris olarak yaz; Bileşke ve ters sekmesinde çarpımın sırası sağdan sola okunur ve rs ≠ sr'nin sayısal karşılığı AB ≠ BA olur." },
    { href: "asal-rsa.html", title: "Asal Sayılar ve RSA: Elekten Şifreye", why: "Modüler aritmetik sekmesinde Euler fonksiyonu φ(n) ve hızlı üs alma; ℤₙ*'ta Lagrange'tan çıkan a^φ(n) ≡ 1 kuralı RSA anahtarının kalbinde çalışır." },
    { href: "perspektif-ve-simetri.html", title: "Perspektif ve Simetri: Kaçış Noktaları, Duvar Kâğıdı Grupları ve Girih", why: "Grupları desende gör: bir motiften 7 şerit ve 17 duvar kâğıdı grubunu kur, İslam geometrik desenlerinin simetrisini bul." },
    { href: "kristal-yapilar.html", title: "Kristal Yapılar: Birim Hücre, Paketleme ve X-Işını Kırınımı", why: "Her yapının 230 uzay grubundan hangisine ait olduğunu yazar: FCC Fm-3m (225), BCC Im-3m (229). Karonun simetri sayımının üç boyuttaki karşılığı." },
  ],
  sources: [
    { title: "Wikipedia · Group (mathematics)", url: "https://en.wikipedia.org/wiki/Group_(mathematics)", note: "Aksiyomlar, örnekler, tarihçe ve D₄ üzerinden anlatılan simetri grubu; sayfadaki kavramların kapsamlı özeti (İngilizce)." },
    { title: "MIT OpenCourseWare · 18.703 Modern Algebra", url: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/", note: "Lagrange, kosetler, bölüm grupları ve Sylow'a kadar ders notlarıyla açık bir lisans dersi (İngilizce)." },
    { title: "Wikipedia · 15 puzzle", url: "https://en.wikipedia.org/wiki/15_puzzle", note: "Chapman'ın bulmacası, Johnson ve Story'nin 1879 parite kanıtı, Loyd'un iddiaları ve en kısa çözüm uzunlukları (İngilizce)." },
    { title: "Vikipedi · Évariste Galois", url: "https://tr.wikipedia.org/wiki/%C3%89variste_Galois", note: "Galois'nın yaşamı, düello ve el yazmalarının kaderi (Türkçe)." },
  ],
  revision: "Kasım 2026",
};
