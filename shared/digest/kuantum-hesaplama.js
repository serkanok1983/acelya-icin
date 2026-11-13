window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kuantum-hesaplama"] = {
  slug: "kuantum-hesaplama",
  title: "Kuantum Hesaplama: Kübit, Dolanıklık ve Girişim",
  field: "Bilgisayar Bilimi",
  level: "Lisans",
  minutes: 40,
  tagline:
    "Bir kübit, ölçülene kadar bir küre üzerindeki oktur; iki kübit, hiçbir klasik talimatın taklit edemediği biçimde birbirine bağlanabilir. Kuantum algoritmaları bu genliklerin girişimiyle çalışır, sihirle değil.",
  hook:
    "Otuz iki kapalı kutudan birinde bir bilye var. Klasik olarak ortalama on altı buçuk kutu açarsın; kuantum bir arayıcı dört sorguda yüzde 99,9 olasılıkla bulur. Ama beşinci sorguyu da sorarsan başarı yüzde 86'ya düşer. Daha çok çalışmak neden daha kötü sonuç versin?",
  bigIdea:
    "Kuantum bilgisayar bütün cevapları aynı anda okumaz: <strong>genlikleri</strong> döndürür ve girişime sokar, öyle ki yanlış cevapların genlikleri birbirini söndürsün, doğru cevabınki büyüsün; ölçüm sonunda yalnızca tek bir sonuç verir.",
  story: [
    "1980'de Paul Benioff, kuantum mekaniğinin yasalarına uyan bir Turing makinesi tarif etti. Aynı yıllarda Yuri Manin (1980) ve Richard Feynman (1981) ters yönden bir soru sordu: kuantum sistemlerini sıradan bilgisayarda benzetmek neden bu kadar zor? Feynman'ın 1981'deki bir konuşmasına dayanan ve 1982'de <em>International Journal of Theoretical Physics</em>'te yayımlanan \"Simulating Physics with Computers\" makalesinin yanıtı basitti: parçacık sayısı arttıkça durumu tarif eden uzay üstel büyür. Belki de kuantum sistemlerini en iyi, kuantum yasalarıyla çalışan bir makine benzetirdi.",
    "Bu fikrin bir hesap üstünlüğüne dönüşebileceğini ilk gösteren örnekler yapay görünen \"kahin\" problemleriydi. David Deutsch 1985'te tek bitlik bir fonksiyonun sabit mi dengeli mi olduğunu soran problemi ele aldı; ilk algoritması ancak yarı yarıya olasılıkla yanıt veriyordu. 1992'de Deutsch ve Richard Jozsa problemi n bitlik girdilere genelleyip iki sorguyla kesin yanıt veren bir algoritma buldu; 1998'de Cleve, Ekert, Macchiavello ve Mosca algoritmayı hem kesin hem tek sorguluk hâle getirdi. Klasik deterministik bir yöntem en kötü durumda 2<sup>n−1</sup> + 1 sorgu ister.",
    "Asıl sarsıntı 1994'te geldi: Peter Shor, ölçeklenebilir bir kuantum bilgisayarın büyük sayıları çarpanlarına ayırmayı ve ayrık logaritmayı polinom zamanda çözebileceğini, dolayısıyla RSA gibi açık anahtarlı şifreleri tehdit edeceğini gösterdi. 1996'da Lov Grover sıralanmamış bir listede aramayı karesel olarak hızlandıran algoritmasını yayımladı. 1998'de nükleer manyetik rezonansla (NMR) çalışan iki kübitlik ilk aygıtlar Deutsch–Jozsa ve Grover algoritmalarını en küçük ölçekte çalıştırarak fikrin teknik olarak uygulanabildiğini gösterdi; o günden beri alanın başlıca uğraşı, kübitleri çevrelerinden yalıtmak ve <strong>dekoheransı</strong> hata düzeltmeyle denetlemek oldu.",
    "Dolanıklığın gerçek olduğunun kanıtı ise bilgisayardan önce, temel fizikten geldi. John Bell 1964'te yerel gizli değişkenlerin uyması gereken bir eşitsizlik buldu; 1969'da Clauser, Horne, Shimony ve Holt bunu deneyle sınanabilir CHSH biçimine soktu. Stuart Freedman ve John Clauser 1972'de ilk ihlali gözledi; Alain Aspect'in Orsay'daki ekibi 1982'de ölçüm ayarlarını fotonlar yoldayken seçti; 2015'te Delft, Viyana ve Boulder'da açık kapıları aynı anda kapatan üç test yayımlandı. 2022 Nobel Fizik Ödülü Clauser, Aspect ve Anton Zeilinger'e verildi.",
  ],
  core: [
    {
      heading: "Kübit ve Bloch küresi",
      body:
        "Klasik bit ya 0'dır ya 1. Bir <strong>kübit</strong> ise iki karmaşık genliğin birleşimidir: |ψ⟩ = α|0⟩ + β|1⟩, |α|² + |β|² = 1. Bütün durumun ortak bir evre çarpanı hiçbir ölçümde görünmediği için geriye iki gerçek sayı kalır: θ ve φ. Bunlar kübiti birim küre üzerinde bir noktaya, <strong>Bloch vektörüne</strong> eşler. Kuzey kutbu |0⟩, güney kutbu |1⟩; ekvatordaki noktalar |0⟩ ile |1⟩'in eşit ağırlıklı, yalnız bağıl evresi farklı süperpozisyonlarıdır: |+⟩, |−⟩, |+i⟩, |−i⟩. Tek kübitlik her kapı bu kürenin bir dönmesidir: X, x ekseni çevresinde 180°; S, z çevresinde 90°; T, 45°; Hadamard (H) ise x ile z'nin tam ortasındaki eksen çevresinde 180°. Sayfa aynı Bloch vektörünü iki bağımsız yoldan (genliklerden ve doğrudan dönme formülünden) hesaplar; fark 10⁻¹⁶ düzeyindedir.",
      formula: "|ψ⟩ = cos(θ/2)|0⟩ + e<sup>iφ</sup> sin(θ/2)|1⟩",
      formulaNote: "Yarım açıya dikkat: θ = 180° kürenin öbür ucu, yani |1⟩ demektir. Bloch vektörü r = (sin θ cos φ; sin θ sin φ; cos θ).",
    },
    {
      heading: "Ölçüm, Born kuralı ve taban seçimi",
      body:
        "Kübiti ölçtüğünde genlikleri değil, tek bir sonucu görürsün. <strong>Born kuralı</strong> olasılığı verir: bir taban durumunu bulma olasılığı, o duruma izdüşen genliğin mutlak karesidir. Z tabanında p(0) = |α|²; bu sayı yalnız θ'ya bağlıdır, φ'yi hiç görmez. Bağıl evre ancak başka bir tabanda ölçünce ortaya çıkar: X tabanında |+⟩ bulma olasılığı (1 + x)/2'dir ve x, φ'ye bağlıdır. Bloch dilinde kural çok sadedir: bir eksen boyunca ölçtüğünde \"+\" sonucunun olasılığı, vektörün o eksen üzerindeki izdüşümüne bağlıdır. Ölçüm durumu da değiştirir: sonuç hangi taban durumuysa kübit artık odur.",
      formula: "p₊ = |⟨e₊|ψ⟩|² = (1 + r·n)/2",
      formulaNote: "n ölçüm ekseni, r Bloch vektörü. N atışta sayımın standart sapması √(Np₊(1 − p₊)); p₊ 0 ya da 1 ise sonuç kesindir.",
    },
    {
      heading: "Tensör çarpımı, CNOT ve dolanıklık",
      body:
        "İki kübit birlikte dört taban durumundan oluşan bir uzayda yaşar: |00⟩, |01⟩, |10⟩, |11⟩. Genel durum, <strong>tensör çarpımı</strong> uzayında dört genlikle yazılır; n kübitte bu 2ⁿ genlik eder. Bazı durumlar iki ayrı kübitin çarpımıdır, örneğin |+⟩⊗|+⟩. Bazıları değildir: H ve ardından <strong>CNOT</strong> (kontrol 1 ise hedefi çeviren kapı) |00⟩'ı Bell durumu (|00⟩ + |11⟩)/√2'ye götürür. Bu durumu hiçbir a, b, c, d için (a|0⟩ + b|1⟩)⊗(c|0⟩ + d|1⟩) biçiminde yazamazsın; buna <strong>dolanıklık</strong> denir. Dolanıklığı ölçmenin bir yolu, kübitlerden birini tek başına ele almaktır: Bell durumunda q0'ın indirgenmiş yoğunluk matrisi I/2 olur, saflığı Tr ρ² = 0,5 ve entropisi tam 1 bittir. Çarpım durumunda ise saflık 1, entropi 0'dır.",
      formula: "S(ρ<sub>A</sub>) = −Σ λ<sub>i</sub> log₂ λ<sub>i</sub>",
      formulaNote: "λ<sub>i</sub>, alt sistemin yoğunluk matrisinin özdeğerleri. Saf iki kübitlik bir durumda S = 0 çarpım durumu, S = 1 bit en dolanık durumdur.",
    },
    {
      heading: "CHSH: klasik sınır 2, kuantum sınırı 2√2",
      body:
        "Alice iki ayardan birini (a ya da a′), Bob da iki ayardan birini (b ya da b′) seçip ±1 sonuç ölçsün. Sonuçlar önceden belirlenmiş ortak bir \"talimattan\" geliyorsa (yerel gizli değişkenler), dört bağıntının S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′) birleşimi hiçbir zaman 2'yi aşamaz: her talimat için ifade ya +2 ya −2 olur, ortalaması da bu aralıkta kalır. Bell durumu Φ⁺ için kuantum mekaniği, x–z düzlemindeki ölçüm yönleri arasında E(a,b) = cos(a − b) verir. a = 0°, a′ = 90°, b = 45°, b′ = −45° seçilince dört terim ±0,707 olur ve S = 2√2 ≈ 2,83'e ulaşır. Boris Tsirelson kuantum mekaniğinin bunun ötesine geçemeyeceğini gösterdi. Önemli bir ayrıntı: Alice'in kendi sonuçları her durumda yarı yarıya rastgeledir; bağıntı ancak iki taraf verilerini karşılaştırınca görünür, bu yüzden dolanıklıkla haber gönderilemez.",
      formula: "|S| ≤ 2 (yerel)  ·  |S| ≤ 2√2 (kuantum)",
      formulaNote: "Φ⁺ için E(a,b) = cos(a − b); tekli durum Ψ⁻ için E(a,b) = −cos(a − b) ve S = −2√2.",
    },
    {
      heading: "Girişimle hesap: Deutsch–Jozsa ve Grover",
      body:
        "Deutsch–Jozsa'da kahin her |x⟩ genliğine (−1)<sup>f(x)</sup> işaretini koyar; son Hadamard'lar |0…0⟩ genliğini bu işaretlerin ortalaması yapar. f sabitse ortalama ±1'dir ve ölçüm kesin |0…0⟩ verir; f dengeliyse artı ve eksiler tam söner, |0…0⟩ olasılığı sıfırdır. Grover'da her yineleme (kahin ve ortalama çevresinde yansıma) durumu, işaretli ve işaretsiz öğelerin gerdiği düzlemde 2θ kadar döndürür; sin θ = √(M/N). Başarı olasılığı sin²((2k + 1)θ)'dir ve (2k + 1)θ ≈ 90° olunca en büyüktür: k ≈ (π/4)√(N/M). Bu, klasik ortalama N/2 sorguya karşı yalnızca <strong>karesel</strong> bir hızlanmadır ve Bennett, Bernstein, Brassard ve Vazirani 1997'de kara kutu aramada bundan iyisinin olamayacağını kanıtladı. Durmayı kaçırırsan dönme seni hedeften uzaklaştırır.",
      formula: "P(k) = sin²((2k + 1)θ),  k<sub>en iyi</sub> = ⌊π/(4θ)⌋",
      formulaNote: "N = 32, M = 1 için θ = 10,18°, k<sub>en iyi</sub> = 4, P = 0,999182. Kuantum sorgu sayısı √N ile, klasik sorgu sayısı N ile büyür.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var. <strong>01 · Kübit ve Bloch küresi</strong>'nde başlangıç açılarını seçip kapı düğmelerine basarak bir dizi kurarsın; küre her kapının döndürdüğü yayı çizer, <strong>Ölçüm tabanı</strong> menüsü Z, X ya da Y tabanında tohumlu atışlar yapar. <strong>02 · Kapılar ve dolanıklık</strong> iki ya da üç kübitlik devre kurar, her taban durumu için kesin olasılığı ve ölçülen sıklığı yan yana koyar, q0'ın saflığını ve dolanıklık entropisini verir; altta Alice ve Bob'un açılarıyla CHSH deneyi çalışır. <strong>03 · Deutsch–Jozsa</strong> dört aşamanın genliklerini çizer ve klasik sıralı aramayla karşılaştırır. <strong>04 · Grover araması</strong>'nda yineleme sayısını, işaretli öğe sayısını ve yineleme başına gürültüyü değiştirirsin. Her ölçümde kuram yanında durur; sapma σ cinsinden yazılır. Tohum değişmedikçe atışlar aynı kalır, bu yüzden aşağıdaki sayıları birebir görürsün.",
    experiments: [
      {
        title: "Evre görünmez mi?",
        predict: "Kübiti H ile ekvatora getirdin. Ardından T kapısı eklersen Z tabanındaki ölçüm sonuçları değişir mi?",
        do: "Birinci sekmede \"H sonra T: evre ölçülür mü?\" hazırını seç. Z tabanındaki sayımı oku; sonra <strong>Ölçüm tabanı</strong> menüsünden X'i seç ve yeniden oku.",
        observe: "Bloch vektörü (0,7071; 0,7071; 0,0000), açılar 90,0° ; 45,0°, β = 0,5000 + 0,5000i. Z tabanında 505 / 1000, kuram 0,5000 (fark +0,32 σ). X tabanında 858 / 1000, kuram 0,8536 (fark +0,40 σ). İki hesap yolu arasındaki fark 2,2 × 10⁻¹⁶.",
        explain: "T yalnız φ'yi 45° döndürür; |α|² değişmediği için Z ölçümü hâlâ yarı yarıya. X tabanında ise olasılık (1 + x)/2 = (1 + cos 45°)/2 = cos²(22,5°) = 0,8536 olur: evre, doğru tabanda ölçünce görünür. Karşılaştır: \"|+⟩: H, X tabanında ölç\" hazırında 1000 / 1000 çıkar, çünkü durum o tabanın öz durumudur.",
      },
      {
        title: "Bell bağıntıları klasik sınırı aşar",
        predict: "Kübitler ortak bir talimatla davransaydı |S| en çok 2 olurdu. Dolanık Bell durumu, dolanık olmayan bir çarpım durumu ve ölçülmüş bir Bell durumu ne verir?",
        do: "İkinci sekme Bell Φ⁺ devresi (H, CNOT) ve en iyi açılarla (0°, 90°, 45°, −45°) açılır. S'yi oku; sonra sırayla \"Tekli Ψ⁻: X, H, CNOT, Z\", \"Çarpım durumu: H, H\" ve \"Bell, sonra q0 ölçülür\" hazırlarını dene.",
        observe: "Φ⁺: ölçülen S = +2,896 ± 0,044, kesin +2,8284, 2'nin 20,5 σ üstünde; saflık 0,5000, entropi 1,0000 bit. Ψ⁻: −2,852 ± 0,044 (kesin −2,8284). Çarpım durumu: entropi 0,0000 bit, kesin S = +1,4142, ölçülen +1,382 ± 0,055. Ara ölçümden sonra: kesin yine +1,4142, ölçülen +1,422 ± 0,055; ikisi de 2'nin on σ'dan fazla altında.",
        explain: "Φ⁺ için E = cos(a − b); seçilen açılarda dört terim ±0,707 toplanır ve S = 2√2, yani Tsirelson sınırı olur. Tekli durumda işaretler tersine döner. q0'ı ölçmek dolanıklığı bozar: geriye |00⟩ ya da |11⟩ kalır, E = cos a·cos b olur ve S bu açılarda √2'ye iner. Çarpım durumları hiçbir açıda 2'yi aşamaz.",
      },
      {
        title: "Tek sorgu ile dokuz sorgu",
        predict: "n = 4 bitlik girdide (16 olası x) klasik deterministik bir algoritma f'nin sabit mi dengeli mi olduğuna en kötü durumda kaç sorguda kesin karar verir?",
        do: "Üçüncü sekmede \"Klasik en kötü durum, n = 4\" hazırını seç; aşama grafiğini incele. Sonra \"Sabit f, n = 4\"e geç.",
        observe: "f(0…15) = 0000 0000 1111 1111; klasik sıralı arama 9 sorgu → dengeli, kuram 9. Kuantum: tek sorgudan sonra P(|0…0⟩) = 0,000000, atışlar 0 / 1000 → dengeli. Sayfa n = 4 için 12 872 fonksiyonun hepsini tarar: kuantum hata sayısı 0. Sabit f'de P = 1,000000, 1000 / 1000 → sabit.",
        explain: "Klasik algoritma ilk sekiz girdide hep 0 görür; dokuzuncu bakmadan f sabit de olabilir, dengeli de: 2ⁿ⁻¹ + 1 = 9. Kuantumda kahin her genliğe (−1)<sup>f(x)</sup> koyar, son Hadamard'lar |0…0⟩ genliğini 2⁻ⁿ Σ(−1)<sup>f(x)</sup> yapar: dengeli f'de toplam sıfırdır, yani yıkıcı girişim.",
      },
      {
        title: "Grover: ne zaman durmalı?",
        predict: "N = 32 öğede tek işaretli öğe var. Yineleme sayısı arttıkça başarı olasılığı hep artar mı?",
        do: "Dördüncü sekmenin varsayılanında (k = 4) başarıyı oku, \"Bir yineleme\" ile k = 5'e geç. Sonra \"Aşırı dönme: 2k<sub>en iyi</sub> + 1\" hazırını, ardından \"N = 256\" ve \"N = 256, gürültü 0,02\" hazırlarını dene.",
        observe: "k = 4: P = 0,999182 (formül de 0,999182); klasik ortalama 16,32 ± 0,15 sorgu. k = 5: 0,859637. k = 9: 0,054175, atışlar 51/1000. N = 256: θ = 3,58°, k<sub>en iyi</sub> = 12, P = 0,999947, klasik 127,22 ± 1,18. Gürültüyle atışlar 0,8020 ± 0,0130, beklenen 0,7855.",
        explain: "Her yineleme durumu 2θ döndürür; (2k + 1)θ 90°'yi geçince durum hedeften uzaklaşır. N sekiz kat büyüyünce en iyi k yalnız üç kat büyüdü (4'ten 12'ye; √8 ≈ 2,8), klasik beklenti ise yaklaşık sekiz kat (16,5'ten 128,5'e): karesel hızlanma. Gürültü her adımda tutarlılığı (1 − p) çarpanıyla eritir: 0,98<sup>12</sup> = 0,7847.",
      },
    ],
  },
  wow: [
    {
      title: "Elli kübit, on sekiz petabayt",
      body:
        "n kübitlik bir durumu klasik bilgisayarda tam olarak saklamak 2ⁿ karmaşık genlik ister. Her genliği iki çift duyarlıklı sayıyla (16 bayt) tutarsan, 30 kübit yaklaşık 17 gigabayt, 50 kübit 2⁵⁰ × 16 bayt ≈ 18 petabayt eder. Sayfa en çok sekiz kübitle (256 genlik) çalışır; her kübit eklemek belleği iki katına çıkarır. Feynman'ın kuantum sistemlerini kuantum makineleriyle benzetme önerisinin kökü bu üstel büyümedir.",
    },
    {
      title: "16 girdi, 12 872 fonksiyon",
      body:
        "Dört bitlik girdide 2 sabit fonksiyon ve 16 girdiden tam 8'ine 1 veren C(16, 8) = 12 870 dengeli fonksiyon vardır. Deutsch–Jozsa sekmesi bunların hepsini tek tek çalıştırır: kuantum algoritması 12 872 fonksiyonun hiçbirinde yanılmaz ve her biri için kahini yalnız bir kez çağırır. Klasik sıralı algoritmanın en kötü durumu ise 9 sorgudur.",
    },
    {
      title: "Fazla çalışan Grover rastgele tahminden pek iyi değildir",
      body:
        "N = 32 için dört yineleme yüzde 99,9 başarı verir. Dokuz yinelemede ise başarı yüzde 5,4'e düşer; körlemesine bir kutu açmanın şansı 1/32 ≈ yüzde 3,1'dir. Klasik aramada fazladan bakmak hiç zarar vermez; Grover'da ise durum vektörü dönmeye devam eder ve hedefi geçip gider. Kuantum algoritmalarında ne zaman ölçeceğini bilmek algoritmanın bir parçasıdır.",
    },
  ],
  worked: {
    title: "256 öğede Grover araması",
    prompt:
      "N = 256 öğeli (n = 8 kübit) sıralanmamış bir listede tek bir işaretli öğe arıyorsun. Dönme açısını θ, en iyi yineleme sayısını ve o noktadaki başarı olasılığını hesapla; klasik ortalama sorgu sayısıyla karşılaştır. Sonra her yinelemede p = 0,02 olasılıkla durumu rastgele bir taban durumuna çeviren gürültüyle başarıyı yeniden bul.",
    steps: [
      "Açı: sin θ = √(M/N) = √(1/256) = 1/16, θ = arcsin(0,0625) ≈ 0,0625 rad = 3,58°. Her yineleme durumu 2θ = 7,17° döndürür; başlangıçta durum hedefle θ açısı yapar.",
      "Durma noktası: (2k + 1)θ ≈ π/2 olmalı, yani k ≈ π/(4θ) − ½. π/(4θ) = 12,56 ve k<sub>en iyi</sub> = ⌊12,56⌋ = 12. Kaba kural (π/4)√N = (π/4)·16 ≈ 12,6 da aynı yere çıkar.",
      "Başarı: P(12) = sin²(25θ) = sin²(1,5635 rad) = sin²(89,58°) = 0,999947. Bir yineleme eksik (k = 11) 0,982583, bir fazla (k = 13) 0,986186 verir: tepe dardır ama sivri değildir.",
      "Klasik: işaretli öğe rastgele bir yerdeyse tekrarsız aramada beklenen sorgu (N + 1)/(M + 1) = 257/2 = 128,5'tir. Kuantum 12 sorgu, klasik ≈ 128,5: oran yaklaşık 10,7 ve N büyüdükçe √N gibi artar.",
      "Gürültü: 12 yinelemenin hepsinden bozulmadan geçme olasılığı (1 − 0,02)¹² = 0,7847. Bozulan yörüngeler rastgele tahmine (1/256) düşer: P ≈ 0,7847 × 0,999947 + 0,2153 × (1/256) ≈ 0,7855.",
      "Sayfada dene: \"N = 256\" hazırı θ = 3,58° (0,0625 rad), k<sub>en iyi</sub> = 12, P = 0,999947 ve klasik benzetimde 127,22 ± 1,18 sorgu gösterir; \"N = 256, gürültü 0,02\" hazırında beklenen 0,7855, 1000 atışta ölçülen 0,8020 ± 0,0130 (+1,27 σ).",
    ],
    result:
      "θ = 3,58°, k<sub>en iyi</sub> = 12, P = 0,999947; klasik ortalama 128,5 sorgu. Yineleme başına yüzde 2 gürültü, başarıyı 0,7855'e indirir: uzun devrelerde hatalar birikir, hata düzeltme bu yüzden gereklidir.",
  },
  misconceptions: [
    {
      myth: "Kübit aynı anda hem 0 hem 1 olduğu için kuantum bilgisayar bütün cevapları paralel hesaplayıp okur.",
      truth:
        "Ölçüm, 2ⁿ genliğin içinden yalnız tek bir sonuç verir; genlikleri doğrudan okuyamazsın. Hızlanma, yanlış cevapların genliklerini girişimle söndüren dikkatli tasarımdan gelir. Deutsch–Jozsa'da dengeli f için |0…0⟩ olasılığının tam sıfır olması bunun en temiz örneğidir.",
    },
    {
      myth: "Dolanıklık sayesinde ışıktan hızlı mesaj gönderilebilir.",
      truth:
        "Bell durumunda q0 tek başına tamamen rastgeledir: indirgenmiş yoğunluk matrisi I/2, Bob ne yaparsa yapsın Alice'in sayımları yarı yarıyadır. CHSH bağıntısı ancak iki taraf sonuçlarını sıradan bir kanaldan karşılaştırınca görünür.",
    },
    {
      myth: "Kuantum bilgisayarlar bütün şifreleri kırar.",
      truth:
        "Shor'un algoritması, büyük ve hata düzeltmeli bir makine kurulursa RSA'yı ve eliptik eğri gibi açık anahtarlı sistemleri tehdit eder; bu yüzden kuantuma dayanıklı (post-kuantum) şifreler geliştiriliyor. Simetrik şifrelere karşı Grover yalnız karesel hızlanma sağlar; anahtarı uzatmak bunu dengeler.",
    },
    {
      myth: "Grover'ı ne kadar uzun çalıştırırsan sonuç o kadar iyi olur.",
      truth:
        "Başarı sin²((2k + 1)θ) ile salınır. N = 32'de k = 4'te 0,999182 olan başarı, k = 5'te 0,859637'ye, k = 9'da 0,054175'e düşer. Doğru k'yı bilmek için işaretli öğe sayısını (M) yaklaşık bilmek gerekir.",
    },
  ],
  glossary: [
    { term: "Kübit", definition: "İki durumlu bir kuantum sistemi; durumu α|0⟩ + β|1⟩ biçiminde, |α|² + |β|² = 1 koşuluyla iki karmaşık genlikle yazılır." },
    { term: "Bloch küresi", definition: "Tek kübitin saf durumlarını birim küre üzerindeki noktalara eşleyen gösterim; kapılar bu kürenin dönmeleridir." },
    { term: "Born kuralı", definition: "Bir ölçüm sonucunun olasılığının, durumun o sonuca karşılık gelen taban durumuna izdüşen genliğinin mutlak karesi olduğunu söyleyen kural." },
    { term: "Tensör çarpımı", definition: "Alt sistemlerin uzaylarını birleştiren işlem; n kübitin uzayı 2ⁿ boyutludur." },
    { term: "CNOT", definition: "Kontrol kübiti 1 iken hedef kübiti çeviren iki kübitlik kapı; Hadamard ile birlikte dolanıklık üretir." },
    { term: "Dolanıklık", definition: "Bileşik bir durumun alt sistemlerin durumlarının çarpımı olarak yazılamaması; alt sistem tek başına karışık görünür." },
    { term: "Kahin (oracle)", definition: "Algoritmanın içini görmeden yalnız sorgulayabildiği kara kutu fonksiyon; karmaşıklık burada sorgu sayısıyla ölçülür." },
    { term: "Dekoherans", definition: "Kübitin çevresiyle etkileşerek bağıl evre bilgisini, dolayısıyla girişim yeteneğini kaybetmesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın matematiği tümüyle <strong>Lineer Cebir</strong>'dir: durumlar karmaşık vektörler, kapılar üniter matrisler, ölçüm izdüşüm operatörleri, iki kübit tensör çarpımı. Fizik bölümlerinde <strong>Kuantum Mekaniği I</strong> spin-½ ve Stern–Gerlach deneyiyle aynı Bloch küresine varır; bilgisayar ve elektrik mühendisliği bölümlerinde seçmeli <strong>Kuantum Bilgi ve Hesaplama</strong> dersleri genellikle Nielsen ve Chuang'ın kitabını izler. Sonraki adımlar kuantum Fourier dönüşümü ve evre kestirimi, onların üzerine kurulan Shor algoritması, yoğunluk matrisleri ve kuantum kanallar, karmaşıklık kuramında BQP sınıfıdır.",
      "Sayfadaki gürültü modeli bilerek basit tutuldu: gerçek donanımda hatalar kapıya, kübite ve zamana bağlıdır, ölçüm de kusurludur. <strong>Kuantum hata düzeltme</strong> bir mantıksal kübiti çok sayıda fiziksel kübite yayarak hataları bilgiyi bozmadan bulur ve düzeltir; ölçeklenebilir bir kuantum bilgisayarın asıl mühendislik problemi budur. Buradaki CHSH benzetimi de ideal algılayıcılar varsayar; gerçek Bell testlerinde algılama verimi ve ölçüm ayarlarının uzayca ayrılması ayrıca sağlanmalıdır.",
    ],
    topics: ["Üniter matrisler ve tensör çarpımı", "Yoğunluk matrisleri", "Kuantum Fourier dönüşümü", "Shor algoritması", "Kuantum hata düzeltme", "BQP ve sorgu karmaşıklığı", "Bell testleri"],
  },
  quiz: [
    {
      question: "Grover aramasında liste uzunluğu N, 4 katına çıkarılıyor (M = 1). En iyi yineleme sayısı yaklaşık kaç katına çıkar?",
      options: ["Değişmez", "2 katına", "4 katına", "16 katına"],
      answer: 1,
      explanation: "k<sub>en iyi</sub> ≈ (π/4)√N; √4 = 2. Klasik arama ise N ile, yani 4 kat büyür. Sayfada N = 64'ten 256'ya çıkınca k<sub>en iyi</sub> 6'dan 12'ye çıkar. Hızlanma üstel değil, kareseldir.",
    },
    {
      question: "n = 10 bitlik girdide (1024 olası x), klasik deterministik bir algoritma f'nin sabit mi dengeli mi olduğuna en kötü durumda kaç sorguda kesin karar verir?",
      options: ["10", "512", "513", "1024"],
      answer: 2,
      explanation: "İlk 512 girdi hep aynı değeri verebilir; bu durumda f hâlâ sabit de dengeli de olabilir. Bir girdi daha bakmak kararı kesinleştirir: 2ⁿ⁻¹ + 1 = 513. Deutsch–Jozsa'ya tek sorgu yeter. Rastgele soran klasik bir algoritma ise birkaç sorguyla yetinip küçük bir hata olasılığını kabul eder; hatayı tamamen sıfırlamak yine 513 sorgu ister.",
    },
    {
      question: "Bell durumunda q0, CHSH ölçümünden önce Z tabanında ölçülürse ve açılar aynı kalırsa (0°, 90°, 45°, −45°) |S| ne olur?",
      options: ["2√2 olarak kalır", "√2'ye iner", "Tam 2 olur", "0 olur"],
      answer: 1,
      explanation: "Ölçüm dolanıklığı bozar; geriye yarı yarıya |00⟩ ya da |11⟩ kalır. Bu karışımda E(a,b) = cos a·cos b'dir: a′ = 90° olan iki terim sıfırlanır, kalan ikisi 0,707 eder ve S = √2 ≈ 1,4142. Sayfada \"Bell, sonra q0 ölçülür\" hazırı tam bunu gösterir.",
    },
  ],
  next: [
    { href: "kuantum-mekanigi.html", title: "Kuantum Çift Yarık: Tek Tek Parçacıklarla Girişim", why: "Genliklerin toplanıp olasılığın kareden geldiği yer: Deutsch–Jozsa ve Grover'ın dayandığı girişim, burada tek tek parçacıklarla ekrana düşüyor." },
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum", why: "Kapıların matris, ölçümün izdüşüm, dolanıklık entropisinin özdeğer olduğu dilin kendisi: matrisler, alt uzaylar ve spektrum." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme: Sınıflar, NP ve Yaklaşık Çözümler", why: "√N ile N ve 2ⁿ ile n arasındaki farkı büyüme sınıfları, P ve NP üzerinden ölç; karesel hızlanmanın nereye düştüğünü gör." },
    { href: "asal-rsa.html", title: "Asal Sayılar ve RSA: Elekten Şifreye", why: "Shor algoritmasının hedef aldığı şifre: iki asalı çarpmanın kolay, çarpımı ayırmanın zor olduğu asimetri." },
  ],
  sources: [
    { title: "Wikipedia · Quantum computing", url: "https://en.wikipedia.org/wiki/Quantum_computing", note: "Kübit, girişim ve dekoherans; tarihçe: Benioff 1980, Manin ve Feynman, Deutsch 1985, Shor 1994, Grover 1996, 1998'de iki kübitlik ilk gösterim (İngilizce)." },
    { title: "Wikipedia · Deutsch–Jozsa algorithm", url: "https://en.wikipedia.org/wiki/Deutsch%E2%80%93Jozsa_algorithm", note: "Deutsch 1985, Deutsch–Jozsa 1992, Cleve ve arkadaşlarının 1998 iyileştirmesi; klasik en kötü durum 2ⁿ⁻¹ + 1 ve rastgele algoritmanın hata sınırı (İngilizce)." },
    { title: "Wikipedia · CHSH inequality", url: "https://en.wikipedia.org/wiki/CHSH_inequality", note: "Clauser, Horne, Shimony ve Holt 1969; klasik sınır 2 ve Tsirelson sınırı 2√2 (İngilizce)." },
    { title: "Wikipedia · Bell test", url: "https://en.wikipedia.org/wiki/Bell_test", note: "Freedman ve Clauser 1972, Aspect'in 1982 Orsay deneyleri, 2015'teki açık kapısız testler ve 2022 Nobel Fizik Ödülü (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
