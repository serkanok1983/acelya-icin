window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["grup-teorisi"] = {
  slug: "grup-teorisi",
  title: "Grup Teorisi: Simetrinin Dilbilgisi",
  field: "Matematik",
  level: "Lise ileri",
  minutes: 35,
  tagline:
    "Bir kareyi döndürmek, saati ileri almak ve Rubik küpünü karıştırmak aynı dört kurala uyar. Grup teorisi bu kuralların bilimidir; Galois'nın 20 yaşında bıraktığı mektuptan Monster grubuna uzanır.",
  hook:
    "Kâğıttan bir kare kes, köşelerini 1-2-3-4 diye numarala. Önce 90° döndür, sonra aynadaki görüntüsüne çevir; şimdi sırayı değiştir: önce çevir, sonra döndür. Köşeler aynı yere mi geldi? Gelmedi. Bu küçük 'hayır', beşinci dereceden denklemlerin neden formülle çözülemediğini, kristallerin neden tam 230 biçimde dizilebildiğini ve Rubik küpünün neden 20 hamlede çözüldüğünü açıklayan matematiğin kapısıdır.",
  bigIdea:
    "Grup, 'yapılan her şeyin geri alınabildiği' bir işlem dünyasıdır: dört aksiyomu sağlayan her yapı (saat sayıları, karenin simetrileri, küp hamleleri) aynı teoremlere uyar ve <strong>Lagrange teoremi</strong> bunların en güçlüsüdür: bir alt grubun eleman sayısı, grubun eleman sayısını tam böler.",
  story: [
    "Her şey bir formül arayışıyla başladı. İkinci dereceden denklemin çözüm formülünü Babilliler biliyordu; 1545'te Cardano'nun <em>Ars Magna</em>'sı üçüncü ve dördüncü derece için de formüller yayımladı. Sonra duvar: beşinci derece için iki yüz elli yıl boyunca kimse formül bulamadı. 1770'te Joseph-Louis Lagrange tuhaf bir yere baktı: formüllerin işlemesinin, köklerin birbiriyle <strong>yer değiştirme</strong> biçimlerine bağlı olduğunu fark etti. 1799'da Paolo Ruffini, 1824'te de Norveçli Niels Henrik Abel beşinci derece için genel bir formülün <em>olamayacağını</em> kanıtladı. Abel 26 yaşında veremden öldü; geriye bir 'hayır' bıraktı ama 'neden' sorusu açıktaydı.",
    "Cevabı Paris'te, kendisini kimsenin anlamadığı bir genç verdi. Évariste Galois 1811'de doğdu, École Polytechnique'in sınavını iki kez kaybetti, Akademi'ye gönderdiği el yazmalarından biri kayboldu, 1831'de bir diğerini Poisson 'yeterince açık değil' diye geri çevirdi; siyasi gösterilerden hapse girdi. 30 Mayıs 1832 sabahı bir düelloda karnından vuruldu ve ertesi gün, 20 yaşında öldü. Düellodan önceki gece arkadaşı Auguste Chevalier'ye yazdığı mektup kayıtlarda duruyor: fikirlerinin özetini çıkarmış, kenara 'zamanım yok' notunu düştüğü anlatılır. Bütün teoriyi tek gecede yazdığı ise efsanedir; mektup, yıllardır üzerinde çalıştığı sonuçları toparlıyordu. Galois'nın buluşu şuydu: bir denklemin köklerinin yer değiştirmeleri kendi başına bir yapı, bir <strong>grup</strong> oluşturur ve denklemin formülle çözülüp çözülemeyeceğini bu grubun iç yapısı belirler. Beşinci derecede ortaya çıkan grup, bugün A₅ dediğimiz 60 elemanlı yapı, 'parçalanamaz' olduğu için formül yoktur. Mektup ancak 1846'da, Joseph Liouville yayımlayınca anlaşıldı.",
    "Sonraki yüzyılda grup, denklemlerden koptu ve kendi başına bir nesne oldu. 1854'te Arthur Cayley, grubu somut bir örnekten bağımsız, yalnızca kurallarıyla tanımladı; sayfadaki çarpım tablosu onun adını taşır. 1872'de Felix Klein, Erlangen Programı'nda geometriyi tersine çevirdi: önce şekiller değil, önce dönüşümler grubu; bir geometri, o grubun değiştirmediği şeylerin incelenmesidir. 1918'de Emmy Noether fiziğin en derin bağlantılarından birini kanıtladı: doğanın her sürekli simetrisi bir korunum yasası doğurur; zamanda öteleme enerjinin, uzayda öteleme momentumun korunumudur. 1961'de Murray Gell-Mann parçacıkları SU(3) adlı grubun örüntüsüne dizdi, boş kalan yere bir parçacık öngördü ve Ω⁻ 1964'te bulundu. Grup teorisinin kendi büyük projesi ise 'sonlu basit grupların sınıflandırılması'ydı: yaklaşık yüz matematikçi, beş yüz kadar makale, on binden fazla sayfa. 1983'te tamamlandığı ilan edildi; son boşluk 2004'te kapatıldı. Bu sayfadaki her tablo, kaydırıcı ve düğme o devasa yapının en küçük tuğlalarını gösteriyor.",
  ],
  core: [
    {
      heading: "Dört kural, sonsuz örnek",
      body:
        "Bir grup, bir küme ile iki elemanı birleştiren bir işlemdir; dört şart vardır. <strong>Kapalılık:</strong> sonuç kümeden çıkmaz. <strong>Birleşme:</strong> parantezlerin yeri önemsizdir. <strong>Birim:</strong> hiçbir şeyi değiştirmeyen bir eleman vardır. <strong>Ters:</strong> her yapılan geri alınabilir. Tam sayılar toplamayla gruptur (birim 0, tersi −a); doğal sayılar değildir, çünkü 3'ü geri alacak −3 yoktur. Sayfadaki Z₅ˣ bu yüzden 0'ı dışarıda bırakır: mod 5 çarpmada 0'ın tersi yoktur, 1·2·3·4 ise birbirini geri alır (2·3 = 6 ≡ 1). Kural listesi kısa olduğu için örnek listesi uzundur: saat sayıları, bir karenin simetrileri, Rubik küpünün hamleleri, bir denklemin köklerinin yer değiştirmeleri.",
      formula: "a ∗ a⁻¹ = a⁻¹ ∗ a = e",
      formulaNote: "e birim eleman. Dikkat: 'değişme' (a∗b = b∗a) kurallar arasında yoktur; onu sağlayan gruplara Abel grubu denir.",
    },
    {
      heading: "Cayley tablosu: grubun parmak izi",
      body:
        "Küçük bir grubu bütünüyle bir tabloya sığdırabilirsin: satır a, sütun b, hücre a∗b. Tablonun bir zorunlu özelliği vardır: her satır ve her sütunda her eleman <strong>tam bir kez</strong> görünür, yani tablo bir Latin karedir. Nedeni sadeleştirme kuralıdır: a∗b = a∗c ise iki tarafı a⁻¹ ile çarp, b = c çıkar; aynı satırda bir eleman iki kez olamaz. Tablo ana köşegene göre simetrikse grup değişmelidir. Birim elemanın yerleri ters eşleri gösterir: hücrede e görüyorsan satır başı ile sütun başı birbirinin tersidir. Sayfanın Z₄ sekmesinde 0 yazan hücreler (0,0), (1,3), (2,2), (3,1)'dedir: 2 kendi tersidir, 1 ile 3 birbirinin.",
      formula: "a ∗ b = a ∗ c ⇒ b = c",
      formulaNote: "Sol sadeleştirme; sağ tarafı da aynı biçimde sadeleştirebilirsin. Latin kare özelliğinin tek nedeni budur.",
    },
    {
      heading: "Devirli gruplar: tek elemandan bütün grup",
      body:
        "Saatin akrebi tek bir hamleyi tekrarlar ve bütün kadranı dolaşır. Z<sub>n</sub> = {0, 1, …, n−1} mod n toplama ile böyle bir gruptur: 1'i tekrar tekrar ekleyerek her elemana ulaşırsın; 1 bir <strong>üreteç</strong>tir. Peki 5, Z₁₂'yi üretir mi? 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0: evet, on iki adımda hepsi. 8 üretir mi? 8, 4, 0 ve döngü kapandı: hayır, yalnızca üç elemanlık bir alt grup verir. Kural basittir: k'nin mertebesi n/ebob(k, n)'dir; ebob 1 ise k üreteçtir. Üreteç sayısı Euler'in φ(n) fonksiyonudur: φ(12) = 4 (1, 5, 7, 11), φ(7) = 6. n asal olunca 0 dışındaki her eleman üreteçtir; sayfa 'φ(11) = 10 üreteç var' yazar.",
      formula: "ord(k) = n / ebob(k, n)",
      formulaNote: "Toplamsal grupta 'kuvvet' tekrar tekrar toplamaktır: k³ demek k+k+k demektir. Sayfadaki 'g¹, g², …' yazımı bunu kasteder.",
    },
    {
      heading: "Karenin sekiz simetrisi: D₄",
      body:
        "Bir kareyi kaldırıp yerine koymanın, görüntüsü aynı kalacak biçimde tam sekiz yolu vardır: dört döndürme (0°, 90°, 180°, 270°) ve dört yansıma (iki orta çizgi, iki köşegen). Bu sekiz hareket bir grup oluşturur: <strong>dihedral grup D₄</strong>. Tek bir döndürme r ve tek bir yansıma s her şeyi üretir: {e, r, r², r³, s, sr, sr², sr³}. Ama sıra önemlidir: önce yansıtıp sonra döndürmek, önce döndürüp sonra yansıtmakla aynı değildir; <em>rs = sr³</em>. D₄ değişmeli olmayan en küçük gruplardan biridir (en küçüğü altı elemanlı S₃'tür). Her simetri köşeleri bir yere taşır, yani dört köşenin bir permütasyonudur; 24 permütasyonun yalnızca 8'i gerçek bir simetridir. Düzgün n-gen için aynı yapı 2n elemanlıdır.",
      formula: "D<sub>n</sub> = ⟨r, s | rⁿ = e, s² = e, rs = sr⁻¹⟩",
      formulaNote: "Üç kural bütün grubu belirler. rs = sr⁻¹, 'döndürmeyi yansımanın öbür tarafına geçirince yönü ters döner' demektir.",
    },
    {
      heading: "Lagrange: alt grubun mertebesi grubu böler",
      body:
        "H, G'nin içinde kendi başına grup olan bir parçaysa (bir <strong>alt grup</strong>), G'yi H'nin birbirine hiç değmeyen kopyalarıyla döşeyebilirsin: H, g₁H, g₂H, … Bu kopyalara <em>koset</em> denir ve hepsi H kadar elemanlıdır. Döşeme tam çıktığı için |G| = |H| × (kopya sayısı); yani |H|, |G|'yi böler. Sonuçları ağırdır: 15 elemanlı bir grupta 4 elemanlı alt grup olamaz; her elemanın mertebesi grubun mertebesini böler; a<sup>|G|</sup> = e. Sonuncusu mod 5 çarpma grubuna uygulanınca 2⁴ = 16 ≡ 1, 3⁴ = 81 ≡ 1 çıkar: Fermat'nın küçük teoremi, Lagrange'ın bir satırlık sonucudur. Tersi doğru değildir: 12 elemanlı A₄ grubunun 6 elemanlı alt grubu yoktur. Sayfadaki örgü sekmelerinde her düğümün altındaki |·| sayısına bak; hepsi en üstteki sayıyı böler.",
      formula: "|G| = |H| · [G : H]",
      formulaNote: "[G : H] koset sayısı, 'indeks'. Z₁₂ içinde {0,4,8} için indeks 12/3 = 4'tür.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada ölçüm aleti yok; deneyler tablo okuma, sayma ve tahmin doğrulama üzerine. Kontroller: <strong>Cayley Tablosu</strong> panelinde dört sekme (Z₄, Klein-4, S₃, Z₅ˣ) ve tıklanabilir hücreler; <strong>Alt Grup Örgüsü</strong> panelinde Z₁₂, D₄, A₄ sekmeleri; <strong>Devirli Gruplar</strong> panelinde 4–12 arası <strong>n</strong> kaydırıcısı ve 'Rastgele Üreteç' düğmesi; <strong>Dihedral</strong> panelinde 'Döndür (r) → 90°', 'Yansıt (s) — dikey' ve 'Sıfırla' düğmeleriyle altlarındaki durum satırı. Dürüst bir not: bu sürümde Klein-4 ve S₃ sekmeleri tabloyu yenilemiyor, Z₅ˣ sekmesinin bazı hücreleri de yanlış; bu üç grubu kâğıtta kur, Z₄ sekmesi ve öteki paneller doğru çalışır.",
    experiments: [
      {
        title: "Latin kare ve ters eşler",
        predict: "Z₄ tablosunda 0 kaç hücrede görünür ve nerede? 2'nin tersi kimdir? Tablo ana köşegene göre simetrik mi çıkar?",
        do: "Cayley panelinde 'Z₄ (mod 4 toplama)' sekmesi seçiliyken açık renkle vurgulanmış hücreleri bul. Sonra satır 1 ile sütun 3'ün kesiştiği hücreye, ardından satır 2 ile sütun 2'ye tıkla; alttaki bilgi satırını oku.",
        observe: "0 tam dört hücrede, her satırda ve her sütunda bir kez: (0,0), (1,3), (2,2), (3,1). Tıklayınca satır ve sütun kehribar rengine boyanır, bilgi satırı '1 ∗ 3 = 0' ve '2 ∗ 2 = 0' yazar. Satırlar 0123, 1230, 2301, 3012: her satır bir öncekinin bir kaydırılmışı ve tablo köşegene göre simetrik.",
        explain: "Her satırda her eleman bir kez: sadeleştirme kuralı başka seçenek bırakmaz. 0'ın bulunduğu hücreler ters çiftleri gösterir; 1 + 3 = 4 ≡ 0 olduğundan 1 ile 3 birbirinin tersi, 2 + 2 = 4 ≡ 0 olduğundan 2 kendi tersidir. Simetri değişme demektir: a + b = b + a. Kâğıtta Klein-4'ü kur: dört hücrenin dördünde de e köşegene oturur, her eleman kendi tersidir; Z₄ ile aynı büyüklükte ama farklı bir grup.",
      },
      {
        title: "Üreteç avı: kim bütün grubu dolaşır?",
        predict: "n = 12 için sayfa en küçük uygun üreteci seçer; hangi sayı olur? Kaç üreteç vardır? n = 11 için φ(11) kaç çıkar?",
        do: "Devirli Gruplar panelinde n kaydırıcısını 12'ye getir, adım listesini ve 'φ(12) = …' yazısını oku. Sonra 11, 8 ve 9'u dene. Son olarak sayfayı yenile (n = 7, üreteç 3 ile açılır) ve 'Rastgele Üreteç' düğmesine üç kez bas.",
        observe: "n = 12: üreteç 5, adımlar 5 → 10 → 3 → 8 → 1 → 6 → 11 → 4 → 9 → 2 → 7 → 0; 'φ(12) = 4 üreteç var'. n = 11: üreteç 2, φ(11) = 10. n = 8: üreteç 3, φ(8) = 4. n = 9: üreteç 2, φ(9) = 6. Yeni açılan sayfada düğme üreteci 3'ten 2'ye çevirir, sonraki basışlarda 2'de kalır. Listede '51=5' gibi görünen yazıyı 5¹ = 5 diye oku.",
        explain: "Sayfa 'rastgele' demesine karşın 2'den başlayıp n ile aralarında asal ilk sayıyı seçer: 12 için 5 (2, 3, 4 bölen paylaşır), 8 için 3, 9 için 2. Üreteç olmanın tek şartı ebob(k, n) = 1'dir; φ(n) bu k'ları sayar. 11 asal olduğu için 1'den 10'a her sayı üreteçtir: φ(p) = p − 1. 12'nin dört üreteci 1, 5, 7, 11'dir; 8'i dener gibi yapamazsın çünkü sayfa yalnızca üreteç gösterir, ama kâğıtta 8, 4, 0 döngüsünü üç adımda kapatır.",
      },
      {
        title: "Değişme yasasının çöktüğü yer",
        predict: "'Döndür' düğmesine kaç basışta durum satırı 'e (birim)'e döner? Önce r sonra s basınca köşe 1 nereye gider? Sırayı tersine çevirince aynı yere mi?",
        do: "'Sıfırla'ya bas. 'Döndür (r) → 90°' düğmesine dört kez basıp her seferinde durum satırını oku; 'Sıfırla' deyip 'Yansıt (s) — dikey'e iki kez bas. Sonra sıfırla, bir kez r bir kez s bas ve köşe numaralarını saat yönünde, sol üstten başlayarak not et. Aynı şeyi kâğıt kareyle önce s sonra r sırasında yap.",
        observe: "Durum satırı r, r², r³ ve 'e (birim)' der: dört döndürme kareyi başa getirir; iki yansıma da öyle. r sonra s: durum 'sr¹', köşeler sol üstten saat yönünde 1, 4, 3, 2. Kâğıtta önce s sonra r ise 3, 2, 1, 4 verir; farklı bir simetri. Sayfanın sayacı yalnızca döndürme sayısını ve yansımanın açık olup olmadığını tutar, sırayı değil; bu yüzden iki sırada da aynı 'sr¹' görüntüsünü gösterir.",
        explain: "r⁴ = e ve s² = e: sekiz durum, |D₄| = 8. Önce s sonra r uygulamak rs demektir ve D₄'te rs = sr⁻¹ = sr³; kâğıtta bulduğun 3, 2, 1, 4 dizilişi tam olarak sr³'ün dizilişidir (sayfada sıfırla, üç kez r, bir kez s basarak doğrula). Sıranın sonucu değiştirmesi değişmeli olmamanın ta kendisidir; Rubik küpünü de bu yüzden 'hamleleri sırayla' ezberlersin.",
      },
      {
        title: "Lagrange'ı say, tersini ara",
        predict: "12'nin bölenleri 1, 2, 3, 4, 6, 12. Z₁₂ sekmesinde her bölen için bir düğüm görecek misin? A₄ sekmesinde de mi?",
        do: "Alt Grup Örgüsü panelinde Z₁₂ sekmesini aç ve düğümlerin altındaki '|·|=' sayılarını listele; sonra D₄ ve A₄ sekmelerinde aynısını yap. Her listede en üstteki sayıyı bölmeyen bir mertebe ara.",
        observe: "Z₁₂: 12, 6, 4, 3, 2, 2, 1. D₄: 8, 4, 4, 2, 2, 2, 1. A₄: 12, 4, 3, 3, 3, 2, 2, 1. Hiçbir düğüm en üstteki sayıyı bölmeyen bir mertebe taşımaz. Z₁₂'de her bölen bir düğümde karşılık bulur; A₄'te 6 yoktur, 12'nin böleni olduğu hâlde.",
        explain: "Lagrange yalnızca 'olamaz'ı söyler: alt grup mertebesi grubu bölmek zorundadır. 'Her bölen için alt grup vardır' tersidir ve genelde yanlıştır; A₄ en küçük karşı örnektir. Devirli Z₁₂'de ise tersi de doğrudur ve her bölen için tam bir alt grup vardır; ekrandaki iki Z₂ dairesi aynı kümeyi, {0, 6}'yı temsil eder. Çizimler örgünün tamamı değildir: D₄'ün aslında 10 alt grubu (beşi mertebe 2, üçü mertebe 4), A₄'ün de 10 alt grubu (üçü mertebe 2, dördü mertebe 3) vardır.",
      },
    ],
  },
  wow: [
    {
      title: "43 kentilyon durum, 20 hamle",
      body:
        "Ernő Rubik'in 1974'te yaptığı küpün 43.252.003.274.489.856.000 farklı durumu vardır; saniyede bir durum sayarsan evrenin yaşının yaklaşık yüz katı sürer. Yine de her durum en fazla 20 hamlede çözülür. Bu sayıya 'Tanrı'nın sayısı' denir ve 2010'da Tomas Rokicki, Herbert Kociemba, Morley Davidson ve John Dethridge, Google'ın bağışladığı yaklaşık 35 işlemci-yılı hesapla kanıtladı. Hesabı mümkün kılan şey küpün simetri grubuydu: birbirine simetriyle bağlı durumları tek tek saymak gerekmedi.",
    },
    {
      title: "Duvar kâğıdı için yalnızca 17 desen",
      body:
        "Bir düzlemi tekrarlayan bir desenle kaplamanın, simetri bakımından tam 17 yolu vardır; ne eksik ne fazla. Bunu 1891'de Rus kristalograf Evgraf Fedorov kanıtladı, George Pólya 1924'te bağımsız olarak yeniden buldu. Elhamra Sarayı'nın çinileri bu desenlerin büyük bölümünü yüzyıllar önce kullanmıştı. Üç boyutta, kristallerin atom dizilişleri için sayı 230'dur; Fedorov ve Arthur Schoenflies bu 230 uzay grubunu 1891'de, X ışınlarıyla ilk kristal görüntülenmeden 21 yıl önce tamamladı. Doğanın bütün kristal biçimleri daha görülmeden sınıflanmıştı.",
    },
    {
      title: "Canavar ve ay ışığı",
      body:
        "Sonlu basit grupların en büyüğü olan Monster grubunun eleman sayısı 54 basamaklıdır, yaklaşık 8 × 10⁵³. Robert Griess onu 1980'de 196.883 boyutlu bir uzayın simetrileri olarak elle kurdu. 1978'de John McKay, bambaşka bir alandaki bir fonksiyonun katsayısında 196.884 sayısını görünce irkildi: 196.883 + 1. Conway ve Norton bu 'tesadüfe' <em>Monstrous Moonshine</em> adını verdi; sayı teorisi ile en büyük sonlu simetri arasındaki köprü gerçekti. Richard Borcherds 1992'de kanıtladı ve 1998'de Fields Madalyası aldı.",
    },
  ],
  worked: {
    title: "Z₁₂'de kim neyi üretir?",
    prompt:
      "Saat aritmetiğinde (mod 12 toplama) 8 elemanının mertebesini bul, ürettiği alt grubu yaz ve Lagrange teoremiyle kontrol et. Sonra Z₁₂'nin bütün üreteçlerini say ve sonucu sayfadaki kaydırıcıyla karşılaştır.",
    steps: [
      "Mertebe, bir elemanı kendisiyle kaç kez toplayınca birime (0'a) döndüğünü sayar. 8 → 8 + 8 = 16 ≡ 4 → 4 + 8 = 12 ≡ 0. Üçüncü adımda birime döndük: ord(8) = 3.",
      "8'in ürettiği alt grup ⟨8⟩ = {0, 8, 4}: üç eleman. Lagrange: 3, 12'yi böler, 12 = 3 × 4. Dört koset döşemeyi tamamlar: {0,4,8}, {1,5,9}, {2,6,10}, {3,7,11}; hiçbiri ötekine değmez, hepsi üç elemanlı.",
      "Kısayol: ord(k) = n / ebob(k, n). ebob(8, 12) = 4, 12 / 4 = 3, doğrulandı. 5 için ebob(5, 12) = 1, ord(5) = 12: 5 bütün grubu üretir. 6 için ebob = 6, ord(6) = 2: {0, 6}.",
      "Üreteçler ebob(k, 12) = 1 olan k'lar: 1, 5, 7, 11. Dört tane; Euler'in φ(12) = 4 dediği budur. Sayfada n kaydırıcısını 12'ye getir: üreteç 5 seçilir, adımlar 5 → 10 → 3 → 8 → 1 → 6 → 11 → 4 → 9 → 2 → 7 → 0 ve 'φ(12) = 4 üreteç var' yazar.",
    ],
    result:
      "8'in mertebesi 3, ürettiği alt grup {0, 4, 8}; Z₁₂'nin tam dört üreteci vardır: 1, 5, 7, 11. Bütün alt grup mertebeleri (1, 2, 3, 4, 6, 12) on ikinin bölenidir ve devirli olduğu için her bölene tam bir alt grup düşer.",
  },
  misconceptions: [
    {
      myth: "Grubun mertebesini bölen her sayı için bir alt grup vardır.",
      truth:
        "Lagrange tek yönlüdür: alt grup varsa mertebesi böler. Tersi yanlıştır; 12 elemanlı A₄'ün 6 elemanlı alt grubu yoktur. Sayfanın A₄ sekmesinde mertebe 6 düğüm ara, bulamazsın. Tersi yalnızca devirli gruplarda ve bazı özel durumlarda (ör. asal kuvveti mertebeler) garanti edilir.",
    },
    {
      myth: "Grup işlemi her zaman değişmelidir; sıra fark etmez.",
      truth:
        "Değişme aksiyomlarda yoktur. Karede önce döndürüp sonra yansıtmak ile tersini yapmak farklı simetrilerdir: rs = sr³. Altı elemanlı S₃ değişmeli olmayan en küçük gruptur; Rubik küpü, matris çarpımı ve üç boyutlu döndürmeler de değişmeli değildir. Değişmeli olanlara Abel grubu denir ve ayrıca belirtilir.",
    },
    {
      myth: "Eleman sayısı aynıysa gruplar aynıdır.",
      truth:
        "Z₄ ve Klein-4 dörder elemanlıdır ama farklıdır: Z₄'te 1 + 1 = 2 ≠ 0, yani mertebesi 4 olan eleman vardır; Klein-4'te her elemanın karesi birimdir, mertebesi 4 olan eleman yoktur. Tabloları da farklı görünür: Klein-4'ün köşegeni baştan sona e'dir. İki grup ancak işlemi koruyan birebir bir eşleme varsa 'aynı' (izomorf) sayılır.",
    },
    {
      myth: "Birim eleman her zaman 0 ya da 1'dir ve 0 her grupta vardır.",
      truth:
        "Birim, 'hiçbir şeyi değiştirmeyen' elemandır; karenin simetrilerinde 'yerinde bırak' hareketidir, bir sayı değildir. Mod 5 çarpma grubu Z₅ˣ'da birim 1'dir ve 0 grupta yoktur: 0'ın tersi olmadığı için kümeye alınamaz. Birimin ne olduğu işleme bağlıdır, sayının adına değil.",
    },
  ],
  glossary: [
    { term: "Grup", definition: "Kapalılık, birleşme, birim ve ters eleman şartlarını sağlayan bir küme ile bir ikili işlem." },
    { term: "Mertebe", definition: "Grubun eleman sayısı |G|; bir elemanın mertebesi ise onu birime döndüren en küçük kuvvet (tekrar sayısı)." },
    { term: "Abel grubu", definition: "İşlemin değişmeli olduğu grup: her a, b için a∗b = b∗a; Cayley tablosu köşegene göre simetriktir." },
    { term: "Devirli grup ve üreteç", definition: "Tek bir elemanın kuvvetleriyle tamamı elde edilen grup; o elemana üreteç denir. Z₁₂'nin üreteçleri 1, 5, 7, 11'dir." },
    { term: "Alt grup", definition: "Grubun içinde, aynı işlemle kendi başına grup olan alt küme; mertebesi Lagrange'a göre grubun mertebesini böler." },
    { term: "Koset", definition: "Bir alt grubun bir elemanla 'kaydırılmış' kopyası (gH); kosetler grubu çakışmadan döşer." },
    { term: "Cayley tablosu", definition: "Satırı a, sütunu b olan hücreye a∗b yazılan çarpım tablosu; her satır ve sütunda her eleman tam bir kez bulunur." },
    { term: "İzomorfizm", definition: "İki grup arasında işlemi koruyan birebir ve örten eşleme; var ise gruplar yapı olarak aynıdır (Z₅ˣ ≅ Z₄)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede ilk soyut cebir dersi tam bu sayfanın kaldığı yerden başlar: koset, <strong>normal alt grup</strong> ve bölüm grubu. Bir alt grubun kosetleri kendi aralarında yine grup oluşturuyorsa büyük grubu 'katlayıp' küçültebilirsin; Z₁₂'yi {0,4,8} ile katlamak Z₄'ü verir. Homomorfizm teoremleri bu katlamanın dilidir, Sylow teoremleri Lagrange'ın tersinin ne zaman kurtarıldığını söyler. Sonra Galois teorisi gelir: bir polinomun köklerinin simetri grubu 'katman katman çözülebiliyorsa' denklemin formülü vardır; A₅ çözülemediği için beşinci derecenin formülü yoktur. Aynı yoldan, cetvel ve pergelle açının üçe bölünemeyeceği de kanıtlanır.",
      "Fizik ve mühendislikte sürekli gruplar devreye girer: üç boyutlu döndürmeler sonsuz elemanlı bir gruptur, SO(3), ve kuantum mekaniğindeki spin onun 'çift örtüsü' SU(2) ile anlatılır. Standart Model'in bütün parçacık listesi SU(3) × SU(2) × U(1) grubunun temsilleridir; Noether teoremi her simetriyi bir korunum yasasına bağlar. Kimyada moleküllerin nokta grupları hangi titreşimin kızılötesinde görüneceğini önceden söyler. Bilgisayarda ise mod p çarpma grubu Diffie–Hellman anahtar değişimini (1976), eliptik eğri grupları telefonundaki şifrelemeyi taşır; hata düzelten kodlar ve Rubik çözücüler de grup hesaplarıdır.",
    ],
    topics: ["Koset ve normal alt grup", "Bölüm grubu ve homomorfizm teoremleri", "Sylow teoremleri", "Galois teorisi", "Grup temsilleri", "Lie grupları: SO(3), SU(2), SU(3)", "Kriptografide devirli gruplar", "Kristalografik uzay grupları"],
  },
  quiz: [
    {
      question: "15 elemanlı bir grupta aşağıdaki mertebelerden hangisi bir alt grup için kesinlikle mümkün değildir?",
      options: ["Mertebe 1", "Mertebe 3", "Mertebe 5", "Mertebe 4"],
      answer: 3,
      explanation: "Lagrange: alt grubun mertebesi 15'i bölmelidir. 1, 3 ve 5 böler; 4 bölmez. (Bu arada 15 elemanlı tek bir grup vardır: Z₁₅, ve 3 ile 5 mertebeli alt grupları gerçekten vardır.)",
    },
    {
      question: "Z₁₂'nin (mod 12 toplama) aşağıdaki elemanlarından hangisi üreteçtir?",
      options: ["4 elemanı", "6 elemanı", "7 elemanı", "8 elemanı"],
      answer: 2,
      explanation: "Üreteç olmanın şartı ebob(k, 12) = 1. ebob(7, 12) = 1; 4, 6 ve 8 ise 12 ile bölen paylaşır. 7'nin katları 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5, 0: on ikisi de çıkar. Sayfa en küçük üreteç olarak 5'i seçer; 7 de aynı işi görür.",
    },
    {
      question: "D₄'te kareyi önce dikey eksende yansıtıp (s) sonra 90° döndürmek (r) hangi elemana eşittir?",
      options: ["sr (bir döndürme)", "sr² (iki döndürme)", "sr³ (üç döndürme)", "e (birim)"],
      answer: 2,
      explanation: "Önce s sonra r, rs demektir ve D₄'ün kuralı rs = sr⁻¹ = sr³'tür. Kâğıt kareyle köşeleri sol üstten saat yönünde okursan 3, 2, 1, 4 çıkar; sayfada sıfırlayıp üç kez r ve bir kez s basınca aynı dizilişi görürsün.",
    },
  ],
  next: [
    { href: "asal-rsa.html", title: "Asal Sayılar & RSA", why: "Z₅ˣ'ın büyüğü: mod n çarpma grubunda a^|G| = e kuralı Fermat–Euler teoremidir ve RSA'nın kalbinde çalışır." },
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri", why: "Döndürme ve yansımayı 2×2 matris olarak yaz; rs ≠ sr'nin sayısal karşılığı matris çarpımının sırasıdır." },
    { href: "sezar-sifre.html", title: "Sezar Şifresi", why: "Harfleri kaydırmak Z₂₆'da toplamadır; 26 anahtar, devirli bir grubun 26 elemanıdır." },
    { href: "kristal-yapilar.html", title: "Kristal Yapılar", why: "Atom dizilişlerini sınıflayan 230 uzay grubu; simetri sayımının üç boyutlu hâli." },
  ],
  sources: [
    { title: "Wikipedia · Group (mathematics)", url: "https://en.wikipedia.org/wiki/Group_(mathematics)", note: "Aksiyomlar, örnekler, tarihçe ve D₄ üzerinden anlatılan simetri grubu; sayfadaki kavramların kapsamlı özeti (İngilizce)." },
    { title: "MIT OpenCourseWare · 18.703 Modern Algebra", url: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/", note: "Lagrange, kosetler, bölüm grupları ve Sylow'a kadar ders notlarıyla açık bir lisans dersi (İngilizce)." },
    { title: "3Blue1Brown · Group theory and the 196,883-dimensional monster", url: "https://www.3blue1brown.com/lessons/monster", note: "Simetriden Monster grubuna görsel bir giriş; Cayley tablosunu ve değişmeme fikrini animasyonla anlatır." },
    { title: "Vikipedi · Évariste Galois", url: "https://tr.wikipedia.org/wiki/%C3%89variste_Galois", note: "Galois'nın yaşamı, düello ve el yazmalarının kaderi (Türkçe)." },
  ],
  revision: "Ekim 2026",
};
