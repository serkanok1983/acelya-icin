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
    "Kâğıttan bir kare kes, köşelerini 1-2-3-4 diye numarala. Önce 90° döndür, sonra aynadaki görüntüsüne çevir; şimdi sırayı değiştir: önce çevir, sonra döndür. Köşeler aynı yere mi geldi? Gelmedi. Bu küçük 'hayır', beşinci dereceden denklemlerin neden formülle çözülemediğini, kristal simetrilerinin neden tam 230 türe ayrıldığını ve Rubik küpünün 20 hamle sınırının nasıl kanıtlandığını anlatan matematiğin kapısıdır.",
  bigIdea:
    "Grup, 'yapılan her şeyin geri alınabildiği' bir işlem dünyasıdır: dört aksiyomu sağlayan her yapı (saat sayıları, karenin simetrileri, küp hamleleri) aynı teoremlere uyar ve <strong>Lagrange teoremi</strong> bunların en güçlüsüdür: bir alt grubun eleman sayısı, grubun eleman sayısını tam böler.",
  story: [
    "Her şey bir formül arayışıyla başladı. İkinci dereceden denklemleri Babilliler çözebiliyordu; 1545'te Cardano'nun <em>Ars Magna</em>'sı üçüncü ve dördüncü derece için de formüller yayımladı. Sonra duvar: beşinci derece için iki yüz elli yıl boyunca kimse formül bulamadı. 1770'te Joseph-Louis Lagrange tuhaf bir yere baktı: formüllerin işlemesinin, köklerin birbiriyle <strong>yer değiştirme</strong> biçimlerine bağlı olduğunu fark etti. 1799'da Paolo Ruffini, 1824'te de Norveçli Niels Henrik Abel beşinci derece için genel bir formülün <em>olamayacağını</em> kanıtladı. Abel 26 yaşında veremden öldü; geriye bir 'hayır' bıraktı ama 'neden' sorusu açıktaydı.",
    "Cevabı Paris'te, kendisini kimsenin anlamadığı bir genç verdi. Évariste Galois 1811'de doğdu, École Polytechnique'in sınavını iki kez kaybetti, Akademi'ye gönderdiği el yazmalarından biri kayboldu, 1831'de bir diğerini Poisson 'yeterince açık değil' diye geri çevirdi; siyasi gösterilerden hapse girdi. 30 Mayıs 1832 sabahı bir düelloda karnından vuruldu ve ertesi gün, 20 yaşında öldü. Düellodan önceki gece arkadaşı Auguste Chevalier'ye yazdığı mektup kayıtlarda duruyor: fikirlerinin özetini çıkarmış, kenara 'zamanım yok' notunu düştüğü anlatılır. Bütün teoriyi tek gecede yazdığı ise efsanedir; mektup, yıllardır üzerinde çalıştığı sonuçları toparlıyordu. Galois'nın buluşu şuydu: bir denklemin köklerinin yer değiştirmeleri kendi başına bir yapı, bir <strong>grup</strong> oluşturur ve denklemin formülle çözülüp çözülemeyeceğini bu grubun iç yapısı belirler. Genel beşinci derece denklemin grubu 120 elemanlı S₅'tir; içindeki 60 elemanlı A₅ 'parçalanamaz' (basit) ve değişmeli olmadığı için formül yoktur. Mektup ancak 1846'da, Joseph Liouville yayımlayınca anlaşıldı.",
    "Sonraki yüzyılda grup, denklemlerden koptu ve kendi başına bir nesne oldu. 1854'te Arthur Cayley, grubu somut bir örnekten bağımsız, yalnızca kurallarıyla tanımladı; sayfadaki çarpım tablosu onun adını taşır. 1872'de Felix Klein, Erlangen Programı'nda geometriyi tersine çevirdi: önce şekiller değil, önce dönüşümler grubu; bir geometri, o grubun değiştirmediği şeylerin incelenmesidir. 1918'de Emmy Noether fiziğin en derin bağlantılarından birini kanıtladı: doğanın her sürekli simetrisi bir korunum yasası doğurur; zamanda öteleme enerjinin, uzayda öteleme momentumun korunumudur. 1961'de Murray Gell-Mann parçacıkları SU(3) adlı grubun örüntüsüne dizdi, boş kalan yere bir parçacık öngördü ve Ω⁻ 1964'te bulundu. Grup teorisinin kendi büyük projesi ise 'sonlu basit grupların sınıflandırılması'ydı: yaklaşık yüz matematikçi, yüzlerce makale, on binlerce sayfa. Daniel Gorenstein işin bittiğini 1983'te ilan etti; ama 'quasithin' (yarı ince) gruplar durumunda bir boşluk kalmıştı ve onu Michael Aschbacher ile Stephen D. Smith 2004'te 1221 sayfalık bir kanıtla kapattı. Bu sayfadaki her tablo, kaydırıcı ve düğme o devasa yapının en küçük tuğlalarını gösteriyor.",
  ],
  core: [
    {
      heading: "Dört kural, sonsuz örnek",
      body:
        "Bir grup, bir küme ile iki elemanı birleştiren bir işlemdir; dört şart vardır. <strong>Kapalılık:</strong> sonuç kümeden çıkmaz. <strong>Birleşme:</strong> parantezlerin yeri önemsizdir. <strong>Birim:</strong> hiçbir şeyi değiştirmeyen bir eleman vardır. <strong>Ters:</strong> her yapılan geri alınabilir. Tam sayılar toplamayla gruptur (birim 0, tersi −a); doğal sayılar değildir, çünkü 3'ü geri alacak −3 yoktur. Sayfadaki Z₅ˣ bu yüzden 0'ı dışarıda bırakır: mod 5 çarpmada 0'ın tersi yoktur; 1, 2, 3, 4 ise birbirini geri alır (2·3 = 6 ≡ 1). İlk kanıtlar da bu dört satırdan çıkar. İki birim e ve e′ olsaydı e = e∗e′ = e′ olurdu: birim tektir. Aynı oyunla her elemanın tersi de tektir ve bir çarpımın tersi sırayı çevirir: çorabı ve ayakkabıyı giydiğin sıranın tersiyle çıkarırsın.",
      formula: "(a∗b)⁻¹ = b⁻¹ ∗ a⁻¹",
      formulaNote: "Kanıt tek satır: (a∗b)∗(b⁻¹∗a⁻¹) = a∗(b∗b⁻¹)∗a⁻¹ = a∗a⁻¹ = e. Değişme (a∗b = b∗a) kurallar arasında yoktur; onu sağlayan gruplara Abel grubu denir.",
    },
    {
      heading: "Cayley tablosu: grubun parmak izi",
      body:
        "Küçük bir grubu bütünüyle bir tabloya sığdırabilirsin: satır a, sütun b, hücre a∗b. Tablonun zorunlu bir özelliği vardır: her satır ve her sütunda her eleman <strong>tam bir kez</strong> görünür, yani tablo bir Latin karedir. Nedeni sadeleştirme kuralıdır: a∗b = a∗c ise iki tarafı soldan a⁻¹ ile çarp, b = c çıkar. Birimin yerleri ters eşleri gösterir; sayfanın Z₄ sekmesinde 0 yazan hücreler (0,0), (1,3), (2,2), (3,1)'dedir: 2 kendi tersidir, 1 ile 3 birbirinin. Tablo köşegene göre simetrikse grup değişmelidir; S₃ sekmesinde simetri bozulur: (12) ∗ (13) = (132) ama (13) ∗ (12) = (123). Tablo bir teorem de saklar: a'nın satırı x ↦ a∗x eşlemesidir ve elemanların bir permütasyonudur. Her elemanı kendi satırına götürmek grubu, elemanlarının permütasyon grubunun içine birebir yerleştirir. Buna <strong>Cayley teoremi</strong> denir: her sonlu grup bir Sₙ'in alt grubudur.",
      formula: "a ∗ b = a ∗ c ⇒ b = c",
      formulaNote: "Sol sadeleştirme; sağdan da aynı biçimde sadeleşir. Latin kare özelliğinin tek nedeni budur, değişme gerekmez.",
    },
    {
      heading: "Devirli gruplar: tek elemandan bütün grup",
      body:
        "Saatin akrebi tek bir hamleyi tekrarlar ve bütün kadranı dolaşır. Z<sub>n</sub> = {0, 1, …, n−1} mod n toplama ile böyle bir gruptur: 1'i tekrar tekrar ekleyerek her elemana ulaşırsın; 1 bir <strong>üreteç</strong>tir. Peki 5, Z₁₂'yi üretir mi? 5, 10, 3, 8, 1, 6, 11, 4, 9, 2, 7, 0: evet, on iki adımda hepsi. 8 üretir mi? 8, 4, 0 ve döngü kapandı: hayır, yalnızca üç elemanlık bir alt grup verir. Kural: k'nin mertebesi n/ebob(k, n)'dir. Kanıtı kısadır: d = ebob(k, n) ise m·k ≡ 0 (mod n) koşulu (n/d) | m·(k/d) demektir; n/d ile k/d aralarında asal olduğu için bu (n/d) | m demektir. Demek ki üreteçler tam olarak ebob(k, n) = 1 olan k'lardır ve sayıları Euler'in φ(n) fonksiyonudur: φ(12) = 4 (1, 5, 7, 11), φ(11) = 10. Yan ürün: Zₙ'nin her böleni d için tam bir alt grubu vardır, ⟨n/d⟩.",
      formula: "ord(k) = n / ebob(k, n)",
      formulaNote: "Toplamsal grupta 'kuvvet' tekrar tekrar toplamaktır: sayfadaki 5³ = 3 yazısı 5 + 5 + 5 = 15 ≡ 3 (mod 12) demektir.",
    },
    {
      heading: "Karenin sekiz simetrisi: D₄",
      body:
        "Bir kareyi kaldırıp yerine koymanın, görüntüsü aynı kalacak biçimde tam sekiz yolu vardır: dört döndürme (0°, 90°, 180°, 270°) ve dört yansıma (iki orta çizgi, iki köşegen). Bu sekiz hareket <strong>dihedral grup D₄</strong>'ü oluşturur ve tek bir döndürme r ile tek bir yansıma s hepsini üretir: {e, r, r², r³, s, sr, sr², sr³}. Yazım fonksiyon bileşkesi gibi sağdan sola okunur: sr 'önce r, sonra s' demektir; sayfanın düğmeleri de bu kuralla çalışır. Sıra önemlidir: rs = sr³ ≠ sr. Hesapla görmek için hareketleri 2×2 matris yaz (x sağa, y yukarı): saat yönünde 90° döndüren R'nin satırları (0, 1) ve (−1, 0), dikey eksene göre yansıtan S'ninkiler (−1, 0) ve (0, 1). Çarpınca SR'nin satırları (0, −1) ve (−1, 0), RS'ninkiler (0, 1) ve (1, 0) çıkar: iki farklı köşegene göre iki farklı yansıma. Her simetri dört köşenin bir permütasyonudur; 24 permütasyonun yalnızca 8'i gerçek bir simetridir.",
      formula: "D<sub>n</sub> = ⟨r, s | rⁿ = e, s² = e, rs = sr⁻¹⟩",
      formulaNote: "Üç kural bütün grubu belirler; düzgün n-gende grup 2n elemanlıdır. D₄'te r⁻¹ = r³ olduğu için rs = sr³.",
    },
    {
      heading: "Lagrange teoremi ve tersinin çöktüğü yer",
      body:
        "H, G'nin içinde kendi başına grup olan bir parçaysa (bir <strong>alt grup</strong>), G'yi H'nin birbirine değmeyen kopyalarıyla döşeyebilirsin: H, g₁H, g₂H, … Bu kopyalara <em>koset</em> denir; hepsi H kadar elemanlıdır ve iki koset ya aynıdır ya hiç kesişmez. Döşeme tam çıktığı için |G| = |H| × (koset sayısı), yani |H|, |G|'yi böler. Sonuçları ağırdır: her elemanın mertebesi |G|'yi böler ve a<sup>|G|</sup> = e; mod 5 çarpma grubunda 2⁴ = 16 ≡ 1 çıkar, Fermat'nın küçük teoremi bir satırlık sonuç olur. Tersi yanlıştır; en küçük karşı örnek 12 elemanlı A₄'tür. Kanıt taslağı: 6 elemanlı bir H olsaydı indeksi 2 olurdu. İndeksi 2 olan alt grup normaldir ve G/H iki elemanlı olduğundan her g için g² ∈ H. A₄'ün sekiz 3-döngüsünün her biri σ = (σ²)² biçiminde bir karedir, yani hepsi birimle birlikte H'de olmalı: 9 eleman 6'ya sığmaz.",
      formula: "|G| = |H| · [G : H]",
      formulaNote: "[G : H] koset sayısı, yani indeks. Örgüde bir düğüme tıklayınca sayfa bu eşitliği yazar, ör. '[A₄ : H] = 3, yani 12 = 4 · 3'.",
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
        explain: "Her düğümün mertebesi en üstteki sayıyı böler: Lagrange. 'Her bölen için bir alt grup' ise tersidir ve A₄'te çöker: 6 elemanlı bir alt grubun indeksi 2 olurdu, bütün kareleri içerirdi ve sekiz 3-döngüsünün hepsi bir karedir. Devirli Z₁₂'de tersi doğrudur. D₄'te indeksi 2 olan üç alt grup da normaldir; ⟨s⟩ değildir, çünkü r·s·r⁻¹ = sr² ve s'yi r ile eşlenik alınca ⟨s⟩'nin dışına çıkılır.",
      },
      {
        title: "rs ile sr: karede sıra",
        predict: "Kareyi önce döndürüp sonra yansıtmak (r, s) ile önce yansıtıp sonra döndürmek (s, r) aynı simetri mi? Köşe 1 iki durumda nereye gider?",
        do: "Dihedral panelinde 'Sıfırla'ya, sonra 'Döndür (r): 90° saat yönünde' ve 'Yansıt (s): dikey eksen' düğmelerine bu sırayla bas; durum kutusunu oku. Sıfırla ve sırayı çevir: önce s, sonra r. Son olarak sıfırla ve r, r, r, s bas.",
        observe: "r → s: 'Eleman: s·r = sr (yansıma, eksen: sol üst–sağ alt köşegeni)', köşeler 1, 4, 3, 2. s → r: 'Eleman: r·s = sr³ (yansıma, eksen: sağ üst–sol alt köşegeni)', köşeler 3, 2, 1, 4. r, r, r, s de sr³ verir. İki sonuçta da karenin içindeki yön oku ters döner ve mor eksen çizgisi farklı köşegende belirir.",
        explain: "Yazımda sağdaki önce uygulanır; bu yüzden 'önce r, sonra s' = sr. Sıra değişince sonuç değişir: rs = sr³ ≠ sr, D₄ değişmeli değildir. Döndürme ile yansımanın bileşkesi yine tek bir yansımadır, yalnızca ekseni başkadır; r³ = r⁻¹ olduğundan bu, rs = sr⁻¹ kuralının ta kendisidir. Bazı kitaplar bileşkeyi soldan sağa okur; o zaman adlar yer değiştirir ama 'sıra önemli' sonucu değişmez.",
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
        "Bir düzlemi tekrarlayan bir desenle kaplamanın, simetri bakımından tam 17 yolu vardır; ne eksik ne fazla. Bunu 1891'de Rus kristalograf Evgraf Fedorov kanıtladı, George Pólya 1924'te bağımsız olarak yeniden buldu. Elhamra Sarayı'nın çinileri bu desenlerin büyük bölümünü yüzyıllar önce kullanmıştı. Üç boyutta, kristallerin atom dizilişleri için sayı 230'dur; Fedorov ve Arthur Schoenflies bu 230 uzay grubunu 1891'de, X ışınlarıyla ilk kristal görüntülenmeden 21 yıl önce tamamladı. Doğanın bütün kristal simetrileri daha görülmeden sınıflanmıştı.",
    },
    {
      title: "Canavar ve ay ışığı",
      body:
        "26 sporadik basit grubun en büyüğü olan Monster grubunun eleman sayısı 54 basamaklıdır, yaklaşık 8 × 10⁵³. Robert Griess onu 1980'de 196.883 boyutlu bir uzayın simetrileri olarak elle kurdu. 1978'de John McKay, bambaşka bir alandaki bir fonksiyonun katsayısında 196.884 sayısını görünce irkildi: 196.883 + 1. Conway ve Norton bu 'tesadüfe' <em>Monstrous Moonshine</em> adını verdi; sayı teorisi ile en büyük sporadik simetri arasındaki köprü gerçekti. Richard Borcherds 1992'de kanıtladı ve 1998'de Fields Madalyası aldı.",
    },
  ],
  worked: {
    title: "Z₁₂'nin bütün alt grupları",
    prompt:
      "Saat aritmetiğinde (mod 12 toplama) 8 elemanının mertebesini bul, ürettiği alt grubun kosetlerini yaz. Sonra Z₁₂'nin bütün alt gruplarını ve aralarındaki kapsama çizgilerini bul, üreteçlerini say ve sonucu sayfanın örgüsü ve sayı çemberiyle karşılaştır.",
    steps: [
      "Mertebe, bir elemanı kendisiyle kaç kez toplayınca birime (0'a) döndüğünü sayar. 8 → 8 + 8 = 16 ≡ 4 → 4 + 8 = 12 ≡ 0: ord(8) = 3. Formülle de: ebob(8, 12) = 4 ve 12/4 = 3.",
      "⟨8⟩ = {0, 4, 8}. Kosetleri {0, 4, 8}, {1, 5, 9}, {2, 6, 10}, {3, 7, 11}: dört koset, hepsi üç elemanlı, hiçbiri ötekine değmiyor. Lagrange: 12 = 3 · 4, indeks [Z₁₂ : ⟨8⟩] = 4.",
      "Z₁₂ devirli olduğu için 12'nin her böleni d için tam bir alt grup vardır, ⟨12/d⟩: {0}, ⟨6⟩ = {0, 6}, ⟨4⟩, ⟨3⟩ = {0, 3, 6, 9}, ⟨2⟩ = çift sayılar ve Z₁₂'nin kendisi; toplam 6 alt grup. Bölenler a ve b için ⟨a⟩ ⊆ ⟨b⟩ ancak ve ancak b | a. Araya başka alt grup girmeyen çiftleri birleştirince 7 çizgi çıkar: {0}–⟨6⟩, {0}–⟨4⟩, ⟨6⟩–⟨3⟩, ⟨6⟩–⟨2⟩, ⟨4⟩–⟨2⟩, ⟨3⟩–Z₁₂, ⟨2⟩–Z₁₂.",
      "Üreteçler ebob(k, 12) = 1 olan k'lardır: 1, 5, 7, 11. Euler formülü de aynısını verir: φ(12) = 12 · (1 − 1/2) · (1 − 1/3) = 4.",
      "Sayfada dene: Alt Grup Örgüsü'nün Z₁₂ sekmesi altı düğüm ve yedi çizgi gösterir, ⟨4⟩ düğümüne tıklayınca '⟨4⟩ = {0, 4, 8} · |H| = 3, [Z₁₂ : H] = 4' yazar. Devirli Gruplar'da n = 12 seçip 8'e tıklarsan oklar 0 → 8 → 4 → 0 üçgenini çizer; alt satır 'φ(12) = 4 üreteç: 1, 5, 7, 11' der.",
    ],
    result:
      "ord(8) = 3, ⟨8⟩ = {0, 4, 8} ve indeksi 4. Z₁₂'nin tam altı alt grubu (her bölene bir tane), örgüsünde yedi çizgi ve dört üreteci (1, 5, 7, 11) vardır.",
  },
  misconceptions: [
    {
      myth: "Grubun mertebesini bölen her sayı için bir alt grup vardır.",
      truth:
        "Lagrange tek yönlüdür: alt grup varsa mertebesi böler. Tersi yanlıştır; 12 elemanlı A₄'ün 6 elemanlı alt grubu yoktur ve sayfanın A₄ örgüsünde o satır 'mertebe 6: alt grup yok' diye boş kalır. Tersi bütün sonlu Abel gruplarında doğrudur; her grupta da asal kuvvet bölenler için doğrudur (Sylow).",
    },
    {
      myth: "Grup işlemi her zaman değişmelidir; sıra fark etmez.",
      truth:
        "Değişme aksiyomlarda yoktur. Karede önce döndürüp sonra yansıtmak ile tersini yapmak farklı simetrilerdir: sayfada r, s basışı sr, s, r basışı sr³ verir. Altı elemanlı S₃ değişmeli olmayan en küçük gruptur: (12) ∗ (13) = (132) ama (13) ∗ (12) = (123). Rubik küpü, matris çarpımı ve üç boyutlu döndürmeler de değişmeli değildir.",
    },
    {
      myth: "Eleman sayısı aynıysa gruplar aynıdır.",
      truth:
        "Z₄ ve Klein-4 dörder elemanlıdır ama farklıdır: Z₄'te 1 + 1 = 2 ≠ 0, yani mertebesi 4 olan eleman vardır; Klein-4'te her elemanın karesi birimdir. Tabloları da farklı görünür: Klein-4'ün köşegeni baştan sona e'dir. Buna karşılık Z₅ˣ, sayıları farklı olsa da Z₄'ün aynısıdır: 2ᵏ ↦ k eşlemesi işlemi korur. İki grup ancak böyle bir eşleme varsa 'aynı' (izomorf) sayılır.",
    },
    {
      myth: "Birim eleman her zaman 0 ya da 1'dir ve 0 her grupta vardır.",
      truth:
        "Birim, 'hiçbir şeyi değiştirmeyen' elemandır; karenin simetrilerinde 'yerinde bırak' hareketidir, bir sayı değildir. Mod 5 çarpma grubu Z₅ˣ'ta birim 1'dir ve 0 grupta yoktur: 0'ın tersi olmadığı için kümeye alınamaz. Birimin ne olduğu işleme bağlıdır, sayının adına değil.",
    },
  ],
  glossary: [
    { term: "Grup", definition: "Kapalılık, birleşme, birim ve ters eleman şartlarını sağlayan bir küme ile bir ikili işlem." },
    { term: "Mertebe", definition: "Grubun eleman sayısı |G|; bir elemanın mertebesi ise onu birime döndüren en küçük kuvvet (tekrar sayısı)." },
    { term: "Abel grubu", definition: "İşlemin değişmeli olduğu grup: her a, b için a∗b = b∗a; Cayley tablosu köşegene göre simetriktir." },
    { term: "Devirli grup ve üreteç", definition: "Tek bir elemanın kuvvetleriyle tamamı elde edilen grup; o elemana üreteç denir. Z₁₂'nin üreteçleri 1, 5, 7, 11'dir." },
    { term: "Alt grup", definition: "Grubun içinde, aynı işlemle kendi başına grup olan alt küme; mertebesi Lagrange'a göre grubun mertebesini böler." },
    { term: "Koset", definition: "Bir alt grubun bir elemanla 'kaydırılmış' kopyası (gH); kosetler grubu çakışmadan döşer, sayılarına indeks denir." },
    { term: "Normal alt grup", definition: "Her g için gHg⁻¹ = H olan alt grup; kosetleri kendi aralarında bir grup, G/H bölüm grubunu oluşturur." },
    { term: "İzomorfizm", definition: "İki grup arasında işlemi koruyan birebir ve örten eşleme; var ise gruplar yapı olarak aynıdır (Z₅ˣ ≅ Z₄)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede ilk soyut cebir dersi tam bu sayfanın kaldığı yerden başlar: koset, <strong>normal alt grup</strong> ve bölüm grubu. Bir alt grubun kosetleri kendi aralarında yine grup oluşturuyorsa büyük grubu 'katlayıp' küçültebilirsin; Z₁₂'yi {0, 4, 8} ile katlamak Z₄'ü verir. Sayfanın örgüsü her düğüm için 'normal alt grup' ya da 'normal değil' yazar: A₄'te {e} ve A₄'ün kendisi dışında yalnızca V₄ normaldir ve A₄/V₄ ≅ Z₃ olur. Homomorfizm teoremleri bu katlamanın dilidir, Sylow teoremleri Lagrange'ın tersinin ne zaman kurtarıldığını söyler. Sonra Galois teorisi gelir: bir polinomun köklerinin simetri grubu 'katman katman çözülebiliyorsa' denklemin formülü vardır; S₅ çözülemediği için beşinci derecenin genel formülü yoktur. Aynı cebir, cetvel ve pergelle açının üçe bölünemeyeceğini de kanıtlar.",
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
    { href: "asal-rsa.html", title: "Asal Sayılar & RSA", why: "Z₅ˣ'ın büyüğü: mod n çarpma grubunda a^|G| = e kuralı Fermat–Euler teoremidir ve RSA'nın kalbinde çalışır." },
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri", why: "Döndürme ve yansımayı 2×2 matris olarak yaz; rs ≠ sr'nin sayısal karşılığı matris çarpımının sırasıdır." },
    { href: "sezar-sifre.html", title: "Sezar Şifresi", why: "Harfleri kaydırmak Z₂₆'da toplamadır; 26 anahtar, devirli bir grubun 26 elemanıdır." },
    { href: "kristal-yapilar.html", title: "Kristal Yapılar", why: "Atom dizilişlerini sınıflayan 230 uzay grubu; simetri sayımının üç boyutlu hâli." },
  ],
  sources: [
    { title: "Wikipedia · Group (mathematics)", url: "https://en.wikipedia.org/wiki/Group_(mathematics)", note: "Aksiyomlar, örnekler, tarihçe ve D₄ üzerinden anlatılan simetri grubu; sayfadaki kavramların kapsamlı özeti (İngilizce)." },
    { title: "MIT OpenCourseWare · 18.703 Modern Algebra", url: "https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/", note: "Lagrange, kosetler, bölüm grupları ve Sylow'a kadar ders notlarıyla açık bir lisans dersi (İngilizce)." },
    { title: "3Blue1Brown · Group theory, abstraction, and the 196,883-dimensional monster", url: "https://www.3blue1brown.com/lessons/groups-and-monsters", note: "Simetriden Monster grubuna görsel bir giriş; grup soyutlamasını ve değişmeme fikrini animasyonla anlatır." },
    { title: "Vikipedi · Évariste Galois", url: "https://tr.wikipedia.org/wiki/%C3%89variste_Galois", note: "Galois'nın yaşamı, düello ve el yazmalarının kaderi (Türkçe)." },
  ],
  revision: "Kasım 2026",
};
