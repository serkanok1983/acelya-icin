window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kumeler-bagintilar-ve-fonksiyonlar"] = {
  slug: "kumeler-bagintilar-ve-fonksiyonlar",
  title: "Kümeler, Bağıntılar ve Fonksiyonlar: Matematiğin Ortak Dili",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "∅ ile {∅} neden farklıdır, simetrik ve geçişken bir bağıntı neden yansıyan olmayabilir, gerçek sayılar neden kesirlerden “daha çok”tur? Venn şemasını tara, okları çiz, köşegeni kendin kur.",
  hook:
    "Çift sayılar doğal sayıların yalnızca yarısı gibi görünür, ama ikisi arasında tek bir eleman bile açıkta kalmadan eşleme kurabilirsin: 0 ↦ 0, 1 ↦ 2, 2 ↦ 4… Öte yandan 0 ile 1 arasındaki gerçek sayıları hiçbir liste tüketemez. “Kaç tane?” sorusunu saymadan nasıl yanıtlarız?",
  bigIdea:
    "Matematiğin büyük bölümü üç kavramla yazılır: <strong>küme</strong> (nesnelerin topluluğu), <strong>bağıntı</strong> (sıralı ikililerin bir kümesi) ve <strong>fonksiyon</strong> (her elemana tam bir değer atayan bağıntı); iki kümenin “aynı büyüklükte” olması da aralarında birebir örten bir fonksiyon bulunmasıdır.",
  story: [
    "Georg Cantor 29 Kasım 1873'te meslektaşı Richard Dedekind'e bir soru yazdı: pozitif tam sayılar ile pozitif gerçek sayılar birebir eşlenebilir mi? Kesirli sayıların bir liste hâlinde dizilebildiğini biliyordu; Dedekind yanıtında gerçek cebirsel sayıların da sayılabildiğini gösterdi. 7 Aralık 1873'te Cantor gerçek sayıların sayılamadığını ispatladı ve sonucu 1874'te, cebirsel sayıların sayılabilirliğiyle birlikte ama Dedekind'in payını anmadan yayımladı. Bu, “sonsuz”un tek bir büyüklük olmadığının ilk kanıtıydı ve şaşırtıcı bir yan sonucu vardı: bir anlamda “neredeyse bütün” gerçek sayılar aşkındır. 1877'de bir doğru parçası ile bir karenin noktalarını birebir eşleyince yazdığı söz ünlüdür: “Görüyorum ama inanmıyorum!” Bu makale Leopold Kronecker'in kuşkusuyla karşılaştı ve ancak Dedekind'in araya girmesiyle 1878'de yayımlandı.",
    "Bugün sayfanın beşinci sekmesinde kurduğun <strong>köşegen yöntemi</strong> Cantor'un 1891'de, yeni kurulan Alman Matematikçiler Birliği'nin yıllığının ilk cildinde yayımladığı kısa bir makaleden gelir; sayılamazlığın ilk ispatı ise bu değil, 1874'teki ispattır. Aynı yıl birliğin Halle'deki ilk toplantısına Cantor başkanlık etti. 1878'de ortaya attığı süreklilik hipotezi (doğal sayılarla gerçek sayılar arasında başka bir büyüklük yok mu?) David Hilbert'in 1900'de Paris'te sunduğu açık problemler listesinin ilk maddesi oldu.",
    "Kümeler her şeyi kapsayan bir dil gibi görünüyordu, ta ki Bertrand Russell Mayıs 1901'de bir çelişkiye rastlayana dek: kendi kendisinin elemanı olmayan bütün kümelerin kümesi kendi elemanı mıdır? Russell bunu 1902'de Gottlob Frege'ye bir mektupla bildirdi; Frege'nin yanıtı 22 Haziran 1902 tarihlidir ve Frege, 1903'te çıkan <em>Grundgesetze der Arithmetik</em>'in ikinci cildine paradoksu kabul eden bir ek koydu. Ernst Zermelo aynı paradoksu yayımlamadan, bağımsız olarak bulmuştu. 1908'de “her özellik bir küme tanımlar” ilkesini daha zayıf aksiyomlarla değiştiren bir aksiyom sistemi önerdi; 1920'lerde Abraham Fraenkel, Thoralf Skolem ve Zermelo'nun düzeltmeleriyle bugün kullanılan ZFC küme kuramı ortaya çıktı.",
  ],
  core: [
    {
      heading: "Eleman olmak ile alt küme olmak",
      body:
        "Bir kümeyi yalnızca elemanları belirler; sıra ve tekrar önemsizdir, bu yüzden {1, 2, 2, 3} = {3, 1, 2}. İki ayrı soru vardır: x ∈ A “x, A'nın elemanı mı?” diye sorar, A ⊆ B ise “A'nın her elemanı B'de mi?” diye. 1 ∈ {1, 2} doğrudur ama 1 ⊆ {1, 2} anlamsızdır; doğrusu {1} ⊆ {1, 2}. Aynı ayrım ∅ ile {∅} arasında da var: ilki boştur, ikincisinin tek elemanı boş kümedir. A = B ise “iki yönde alt küme” demektir; iki kümenin eşit olduğunu ispatlamanın standart yolu da budur. Türkiye'deki okul kitapları alt küme için çoğunlukla A ⊂ B ve eleman sayısı için s(A) yazar; üniversite kitaplarında A ⊆ B ve |A| görürsün, öz alt küme A ⊊ B'dir.",
      formula: "A = B ⇔ (A ⊆ B ve B ⊆ A)",
      formulaNote: "Küme eşitliği her zaman iki kapsamaya bölünür; eleman kovalayarak ispatın iskeleti budur.",
    },
    {
      heading: "İşlemler, bölgeler ve De Morgan",
      body:
        "A ∪ B (birleşim), A ∩ B (kesişim), A ∖ B (fark), A′ = E ∖ A (tümleyen) ve A Δ B (simetrik fark) tanımlarla verilir; matematikte “veya” kapsayıcıdır. İki küme evrensel kümeyi dört bölgeye ayırır ve her eleman tam birindedir; bu yüzden bir küme eşitliğini sınamak için dört bölgeye bakmak yeter, üç küme için sekize. Bu, mantıktaki doğruluk tablosunun ta kendisidir. Genel ispat için eleman kovalanır: x ∈ (A ∪ B)′ ⇔ x ∉ A ∪ B ⇔ (x ∉ A ve x ∉ B) ⇔ x ∈ A′ ∩ B′. Sayma da buradan çıkar: kesişimdeki elemanlar s(A) + s(B) toplamında iki kez sayılır, bir kez çıkarılır.",
      formula: "(A ∪ B)′ = A′ ∩ B′  ·  s(A ∪ B) = s(A) + s(B) − s(A ∩ B)",
      formulaNote: "Diğer De Morgan kuralı (A ∩ B)′ = A′ ∪ B′'dir; üç kümede <strong>içerme–dışlama</strong> (bazı kitaplarda içerme–dışarma) ilkesinin işaretleri +, −, + diye sürer.",
    },
    {
      heading: "Çarpım ve kuvvet kümesi: saymayı kodlamaya çevirmek",
      body:
        "<strong>Kartezyen çarpım</strong> A × B, ilk bileşeni A'dan, ikincisi B'den gelen bütün sıralı ikililerdir; (1, a) ile (a, 1) farklı olduğu için genellikle A × B ≠ B × A. Bir ızgara olarak düşünülürse s(A × B) = s(A)·s(B) hemen görülür. <strong>Kuvvet kümesi</strong> P(A), A'nın bütün alt kümeleridir. A'nın n elemanını sıraya koyup her biri için “al” (1) ya da “alma” (0) yazınca her alt küme tam bir bit dizisine karşılık gelir ve tersi de doğrudur. Bu birebir eşleme, alt kümeleri saymayı n bitlik dizileri saymaya çevirir: 2ⁿ. İçinde tam k tane 1 olan dizilerin sayısı C(n, k)'dir; Pascal üçgeninin satır toplamı böylece 2ⁿ olur.",
      formula: "s(P(A)) = 2ⁿ = C(n, 0) + C(n, 1) + … + C(n, n)",
      formulaNote: "n = 3 için 1 + 3 + 3 + 1 = 8; ∅ ve A'nın kendisi de alt kümedir, öz alt küme sayısı 2ⁿ − 1'dir.",
    },
    {
      heading: "Bağıntılar: denklik ve sıralama",
      body:
        "A üzerindeki bir <strong>bağıntı</strong> β, A × A'nın herhangi bir alt kümesidir; n elemanlı kümede n² ikili olduğundan 2<sup>n²</sup> bağıntı vardır. Dört özellik niceleyicilerle tanımlanır: yansıyan (her a için a β a), simetrik, ters simetrik ve geçişken. Yansıyan, simetrik ve geçişken bir bağıntı <strong>denklik bağıntısıdır</strong>; sınıfları ayrıktır ve kümeyi parçalara böler. İspat iki satırdır: c hem [a]'da hem [b]'de ise simetri ve geçişkenlik [a] ⊆ [b] ve [b] ⊆ [a] verir. Mod n eşitliği tam sayıları n sınıfa ayırır. Yansıyan, ters simetrik ve geçişken bağıntı ise bir <strong>kısmi sıralamadır</strong>: bölünebilme böyledir ama 2 ile 3 karşılaştırılamaz. “Ters simetrik” “simetrik değil” demek değildir; a = b bağıntısı ikisini birden sağlar.",
      formula: "[a] ∩ [b] ≠ ∅ ⇒ [a] = [b]",
      formulaNote: "Tersine her bölüntü de bir denklik verir: “aynı parçada olmak”.",
    },
    {
      heading: "Fonksiyon, ters fonksiyon ve sonsuzluğun boyları",
      body:
        "f: A → B, A'nın her elemanından tam bir ok çıkan bağıntıdır. <strong>Bire bir</strong>: farklı elemanlar farklı yere gider. <strong>Örten</strong>: B'nin her elemanı ok alır. Okları ters çevirmek her zaman bir bağıntı verir; bunun bir fonksiyon olması, B'nin her elemanından “en az bir” (örtenlik) ve “en çok bir” (bire birlik) ok çıkmasıdır. Yani ters fonksiyon ancak <strong>birebir örten</strong> fonksiyonda vardır. Bileşke birleşmelidir ama genellikle değişmeli değildir: f(x) = x + 1, g(x) = x² için g(f(2)) = 9, f(g(2)) = 5. Sonsuz kümelerde “aynı büyüklük” birebir örten fonksiyon demektir: N, çift sayılar, Z ve Q eşgüçlüdür. Cantor teoremi ise hiçbir f: A → P(A)'nın örten olmadığını söyler: D = {x : x ∉ f(x)} kümesi hiçbir f(a)'ya eşit olamaz, çünkü a ∈ D ⇔ a ∉ f(a).",
      formula: "s(A) = m, s(B) = n:  nᵐ fonksiyon, n!/(n − m)! bire bir, Σⱼ (−1)ʲ C(n, j)(n − j)ᵐ örten",
      formulaNote: "m > n ise bire bir, m < n ise örten fonksiyon yoktur (güvercin yuvası). Sonsuz kümelerde bu kural bozulur: f(n) = 2n, N'den N'ye bire birdir ama örten değildir.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar beş sekmedir ve her sekme numaralı küçük adımlardan oluşur: önce elinle bir model kurarsın, sonra sayfa simgeyi ve gerekçeyi yazar. <strong>01 · Kümeler ve işlemler</strong> ortak özellikle küme kurmayı, eşitlik ve alt kümeyi, işlem tablosunu, Venn şemasında bölge taramayı ve De Morgan tablosunu içerir. <strong>02 · Çarpım, kuvvet kümesi, sayma</strong> sıralı ikili ızgarası, bit düğmeleriyle alt kümeler ve üç kümeli içerme–dışlama tablosudur. <strong>03 · Bağıntılar</strong> ok şeması ile matris, özellik kartları, kapanış düğmeleri, mod n sınıfları ve bölünebilmenin Hasse çizeneğini verir. <strong>04 · Fonksiyonlar</strong> oklu fonksiyon kurucusu, kaç fonksiyon olduğunu tek tek sayan tablo ve bileşke tablosudur. <strong>05 · Sonsuz kümeler</strong> N ile eşlemeleri, Cantor köşegenini ve Cantor teoremini gösterir. Altta tohumlu, üç düzeyli bir <strong>Alıştırma</strong> (ipucu ve adım adım çözüm), sekiz kartlık <strong>Sık yapılan hatalar</strong> ve <strong>Bundan sonra</strong> bölümü var. Hiçbir yanıt saklanmaz ya da gönderilmez.",
    experiments: [
      {
        title: "Tümleyen birleşimi nereye düşer?",
        predict:
          "(A ∪ B)′ Venn şemasında kaç bölgedir? Peki sık yazılan (A ∪ B)′ = A′ ∪ B′ “kuralı” kaç bölgede bozulur: hiç, bir ya da iki?",
        do:
          "01 sekmesinde 1.4'e in, <strong>Taranacak ifade</strong> menüsünden “(A ∪ B)′”yi seç. Yalnız “A′ ∩ B′” bölge düğmesine bas ve <strong>Taramamı denetle</strong>. Sonra <strong>Temizle</strong>, bu kez A′ ∪ B′'nin üç bölgesini (A ∩ B′, A′ ∩ B, A′ ∩ B′) tarayıp yeniden denetle. Son olarak 1.5'te <strong>Kural</strong> menüsünden “Yanlış aday”ı seç.",
        observe:
          "İlk denetimde “Doğru: (A ∪ B)′ tam olarak bu 1 bölgedir.” yazar. İkincisinde “Henüz değil. Taranmış ama ifadede olmayan: A ∩ B′; A′ ∩ B.” Yanlış adayda tablo “Son iki sütun 2 bölgede farklı” der ve aynı iki satırı çerçeveler.",
        explain:
          "(A ∪ B)′, “ne A'da ne B'de” olan elemanlardır: tek bölge, yani A′ ∩ B′. A′ ∪ B′ ise “en az birinde değil” demektir ve yalnız A'da ya da yalnız B'de olanları da alır; fark tam bu iki bölgedir. Dört bölge bütün olasılıkları tükettiği için tablo bir ispattır; sayfanın verdiği karşı örnekte E = {1, 2, 3, 4}, A = {1, 2}, B = {2, 3} için {4} ≠ {1, 3, 4}.",
      },
      {
        title: "Simetrik ve geçişken, ama yansıyan değil",
        predict:
          "Bir ispat taslağı der ki: “a β b ise simetriyle b β a, geçişkenlikle a β a; öyleyse simetrik ve geçişken her bağıntı yansıyandır.” Bu doğru mu?",
        do:
          "03 sekmesinde n = 4 iken <strong>Hazır bağıntı</strong> menüsünden “simetrik, geçişken, yansımayan”ı seç ve özellik kartlarını oku. <strong>Görev</strong> menüsünde “simetrik ve geçişken, ama yansıyan değil”i seçip <strong>Bağıntımı denetle</strong>. Sonra <strong>Yansıyan kapanış</strong> düğmesine bas.",
        observe:
          "β = {(1, 1), (1, 2), (2, 1), (2, 2)}: Yansıyan Hayır, Simetrik Evet, Ters simetrik Hayır, Geçişken Evet; durum satırı “3 hiçbir elemanla ilişkili değil” der ve görev tamamlanır. Kapanıştan sonra (3, 3) ve (4, 4) eklenir, 6 ikili olur ve sayfa “Denklik bağıntısı: sınıflar {1, 2}, {3}, {4}” yazar.",
        explain:
          "Taslağın tek kusuru ilk adımdadır: “a β b olan bir b vardır” varsayımı. 3 ve 4 kimseyle ilişkili olmadığı için akıl yürütme onlar için hiç başlamaz. İspatlarda niceleyiciyi atlamamak bu yüzden önemlidir. Yansıyan kapanış eksik halkaları ekleyince üç özellik birlikte sağlanır ve sınıflar A'yı ayrık parçalara böler.",
      },
      {
        title: "Fonksiyonları say: 81, 0, 36",
        predict:
          "4 elemanlı bir kümeden 3 elemanlı bir kümeye kaç fonksiyon, kaç bire bir ve kaç örten fonksiyon vardır? 3'ten 4'e örten bir fonksiyon kurabilir misin?",
        do:
          "04 sekmesinde s(A) = 3, s(B) = 4 iken <strong>Görev</strong> menüsünden “örten ama bire bir olmayan”ı seçip <strong>Fonksiyonumu denetle</strong>. Sonra s(A) = 4, s(B) = 3 yap, <strong>Hazır örnek</strong> menüsünden “örten, bire bir değil”i seç ve 4.2'deki sayım tablosunu oku.",
        observe:
          "İlk denetim: “Bu görev m = 3, n = 4 ile imkânsız: m < n iken örten fonksiyon yoktur”. Hazır örnekte f = {(1, a), (2, b), (3, c), (4, a)}: Örten Evet, Bire bir Hayır, not “f(1) = f(4) = a”. Tablo: bütün fonksiyonlar 3⁴ = 81, bire bir 0, örten 36, birebir örten 0; formül ve tek tek sayılan sütunlar eşit.",
        explain:
          "Her eleman 3 değerden birini seçtiği için 3⁴ = 81. Dört elemanı üç değere bire bir göndermek güvercin yuvası ilkesine aykırıdır. Örtenleri saymak için “en az bir değeri hiç vurulmayan” fonksiyonları içerme–dışlamayla çıkarırız: 81 − 3·2⁴ + 3·1⁴ = 36. Sayfa 81 fonksiyonun hepsini üretip bu sayıyı ayrıca bulur.",
      },
      {
        title: "Listede olmayan sayıyı kur",
        predict:
          "Altı sayılık bir listede olmayan bir sayı bulmak kolaydır. Sonsuz bir listede de bunu her zaman yapabileceğini gösteren tek bir kural var mı?",
        do:
          "05 sekmesinde 5.2'ye geç. 1. basamak menüsünden 6'yı seç ve uyarıyı oku. Sonra <strong>Kuralı uygula</strong> düğmesine bas; <strong>Başka bir liste</strong> ile yeniden dene. Ardından 5.3'teki tabloda D kümesine bak.",
        observe:
          "İlk listede köşegen basamaklar 6, 9, 3, 2, 2, 1'dir; 6 seçince “1. basamağınız 6, ama r1 sayısının 1. basamağı da 6” uyarısı gelir. Kural 0,555555… sayısını kurar ve <strong>Listede var mı?</strong> “Hayır” olur. 5.3'te f(1) = {1, 2}, f(2) = ∅, f(3) = {1, 3} için D = {2} ve hiçbir f(x)'e eşit değildir.",
        explain:
          "Kural her k için k'inci sayıdan k'inci basamakta ayrılır; liste ne olursa olsun işler. Asıl ispat da budur: altı satır yalnızca bir resimdir. 0 ve 9'dan kaçınmak, 0,1999… = 0,2000… gibi iki yazılışlı sayıların oyunu bozmasını önler. 5.3'teki D aynı fikirdir: tablonun köşegeni (x ∈ f(x) mi?) tersine çevrilir. Bu yüzden hiçbir küme kendi kuvvet kümesiyle eşgüçlü değildir.",
      },
    ],
  },
  wow: [
    {
      title: "Venn kendi şemalarına “Venn şeması” demedi",
      body:
        "John Venn şemalarını 1880'de bir makalede tanıttı ve 1881'deki <em>Symbolic Logic</em> kitabıyla yaydı, ama onlara “Euler daireleri” diyordu. Euler benzer daireleri 1768'de <em>Bir Alman Prensese Mektuplar</em>'da kullanmıştı. “Venn şeması” adı ise ancak sonra yerleşti; örneğin C. I. Lewis 1918'deki bir mantık kitabında bu adı kullanır.",
    },
    {
      title: "Aynı hile, üç büyük sonuç",
      body:
        "Cantor'un köşegen fikri, kendine uygulandığında çelişki üreten nesneler kurar. Russell paradoksundaki “kendinin elemanı olmayan kümeler” kümesi, Cantor teoremindeki D = {x : x ∉ f(x)} ile aynı yapıdadır. Durma probleminin çözülemezliğinin olağan ispatı ve Gödel'in birinci eksiklik teoremi de özünde birer köşegen argümanıdır.",
    },
    {
      title: "Dört elemanlı bir kümede 65 536 bağıntı",
      body:
        "A = {1, 2, 3, 4} üzerinde 16 ikili vardır ve her biri bağıntıda ya vardır ya yoktur: 2¹⁶ = 65 536 bağıntı. Yansıyan olanlar için 4 halka zorunludur, kalan 12 ikili serbesttir: 4096. Simetriklerde 4 halka ve 6 karşılıklı çift serbesttir: 2¹⁰ = 1024. Beş elemanda bağıntı sayısı 2²⁵ = 33 554 432'ye çıkar.",
    },
  ],
  worked: {
    title: "Örten fonksiyonları içerme–dışlamayla saymak",
    prompt:
      "A = {1, 2, 3, 4} ve B = {a, b, c} olsun. A'dan B'ye kaç fonksiyon, kaç bire bir ve kaç örten fonksiyon vardır? Örten fonksiyon sayısını içerme–dışlamayla bulun ve sonucu sayfanın 04 sekmesindeki sayım tablosuyla (s(A) = 4, s(B) = 3) karşılaştırın.",
    steps: [
      "Bütün fonksiyonlar: A'nın her elemanı B'deki 3 değerden birini bağımsız seçer; çarpım kuralıyla 3·3·3·3 = 3⁴ = 81.",
      "Bire bir fonksiyonlar: 4 elemanı 3 farklı değere göndermek gerekir; güvercin yuvası ilkesiyle en az iki eleman aynı değeri alır, sayı 0'dır.",
      "Kötü kümeler: X<sub>a</sub>, a değerini hiç almayan fonksiyonlar olsun (X<sub>b</sub>, X<sub>c</sub> benzer). X<sub>a</sub>'daki fonksiyonlar yalnız {b, c}'yi kullanır: s(X<sub>a</sub>) = 2⁴ = 16. İki değeri birden atlayanlar sabittir: s(X<sub>a</sub> ∩ X<sub>b</sub>) = 1⁴ = 1. Üçünü birden atlayan fonksiyon yoktur.",
      "İçerme–dışlama: s(X<sub>a</sub> ∪ X<sub>b</sub> ∪ X<sub>c</sub>) = 3·16 − 3·1 + 0 = 45. Örtenler bunların tümleyenidir: 81 − 45 = 36.",
      "Sağlama: örten bir fonksiyonda üç değerden biri iki kez alınır. Hangi iki elemanın birlikte gideceği C(4, 2) = 6, bu üç grubun üç değere dağılışı 3! = 6 yoldur: 6·6 = 36. Sayfa 81 fonksiyonu tek tek sınayıp aynı sonucu verir.",
    ],
    result:
      "81 fonksiyon, 0 bire bir, 36 örten; genel formül Σⱼ (−1)ʲ C(n, j)(n − j)ᵐ = 3⁴ − 3·2⁴ + 3·1⁴ − 0 = 36.",
  },
  misconceptions: [
    {
      myth: "∅ ile {∅} aynı şeydir; ikisi de “boş”.",
      truth:
        "∅'nin hiç elemanı yoktur; {∅} ise tek elemanlı bir kümedir ve o elemanı boş kümedir. Sayfanın 1.2 adımında “∅ ve {∅}” düğmesi A ⊆ B için Evet, A = B için Hayır verir. Aynı nedenle P(∅) = {∅}'nin bir elemanı vardır: 2⁰ = 1.",
    },
    {
      myth: "Tümleyen birleşime dağılır: (A ∪ B)′ = A′ ∪ B′.",
      truth:
        "Tümleyen işlemi değiştirir: (A ∪ B)′ = A′ ∩ B′ ve (A ∩ B)′ = A′ ∪ B′. Yanlış biçim, yalnız A'da ve yalnız B'de olan elemanları da alır. E = {1, 2, 3, 4}, A = {1, 2}, B = {2, 3} için (A ∪ B)′ = {4}, ama A′ ∪ B′ = {1, 3, 4}.",
    },
    {
      myth: "Simetrik ve geçişken bir bağıntı kendiliğinden yansıyandır.",
      truth:
        "“a β b ⇒ b β a ⇒ a β a” zinciri yalnız en az bir ilişkisi olan a için çalışır. {1, 2, 3} üzerinde β = {(1, 1), (1, 2), (2, 1), (2, 2)} simetrik ve geçişkendir ama (3, 3) yoktur. Yansıyanlık her eleman için ayrıca istenmelidir.",
    },
    {
      myth: "Bire bir bir fonksiyon her zaman örtendir; özellikle bir küme kendi içine gönderiliyorsa.",
      truth:
        "Bu, yalnız aynı sayıda elemanlı sonlu kümelerde doğrudur: m = n = 3 iken 6 bire bir fonksiyonun hepsi örtendir. Sonsuz kümelerde bozulur: f(n) = 2n, N'den N'ye bire birdir ama hiçbir tek sayı ok almaz. Dedekind sonsuzluğu tam bu özellikle tanımladı.",
    },
  ],
  glossary: [
    { term: "Alt küme (A ⊆ B)", definition: "A'nın her elemanı B'nin de elemanıysa A, B'nin alt kümesidir; A ≠ B ise öz alt kümedir (A ⊊ B)." },
    { term: "Kuvvet kümesi P(A)", definition: "A'nın bütün alt kümelerinden oluşan küme; n elemanlı A için 2ⁿ elemanlıdır." },
    { term: "Kartezyen çarpım A × B", definition: "İlk bileşeni A'dan, ikinci bileşeni B'den gelen bütün sıralı ikililerin kümesi; s(A × B) = s(A)·s(B)." },
    { term: "Bağıntı", definition: "A'dan B'ye bir bağıntı, A × B'nin herhangi bir alt kümesidir; B = A ise A üzerinde bir bağıntıdır." },
    { term: "Denklik bağıntısı", definition: "Yansıyan, simetrik ve geçişken bağıntı; kümeyi ayrık denklik sınıflarına, yani bir bölüntüye ayırır." },
    { term: "Kısmi sıralama", definition: "Yansıyan, ters simetrik ve geçişken bağıntı; bölünebilme gibi, bazı çiftleri karşılaştırmayabilir." },
    { term: "Birebir örten fonksiyon (eşleme)", definition: "Hem bire bir hem örten fonksiyon; tersi de bir fonksiyondur ve iki kümenin eşgüçlü olduğunu gösterir." },
    { term: "Sayılabilir küme", definition: "Sonlu ya da N ile eşgüçlü küme; elemanları hiçbiri atlanmadan bir liste hâlinde dizilebilir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Ayrık matematik ve “matematiğe giriş” ya da “soyut matematik” derslerinin ilk haftaları bu sayfanın konusudur ve neredeyse her lisans matematik dersi bu dille başlar. Analizde fonksiyon, görüntü ve ters görüntü (f⁻¹(V)) sürekliliğin tanımında kullanılır; lineer cebirde bir doğrusal dönüşümün bire bir olması çekirdeğinin sıfır olmasıdır; olasılıkta olaylar kümelerdir ve De Morgan kuralları gündelik bir hesap aracıdır. Soyut cebirde denklik sınıfları bölüm yapılarını (Z/nZ gibi) kurar, bir kümenin kendine eşlemeleri bileşke altında bir grup oluşturur.",
      "Bilgisayar biliminde ilişkisel veritabanlarında her tablo kelimenin tam anlamıyla bir bağıntıdır ve sorgular küme işlemleridir; biçimsel dillerde dil bir sözcük kümesi, durum geçişi bir fonksiyondur. Köşegen yöntemi hesaplanabilirlik kuramında durma probleminin çözülemezliğini verir. Sayfanın sınırlarını da bil: kümeler küçük ve sonludur, sonsuz kümelerin çizimleri yalnızca ilk eşlemeleri gösterir. Aksiyomatik küme kuramı (ZFC), seçim aksiyomu ve süreklilik hipotezinin bağımsızlığı (Gödel 1940, Cohen 1963) ileri lisans derslerinde ele alınır.",
    ],
    topics: [
      "Ayrık Matematik",
      "Soyut Matematiğe Giriş",
      "Analiz I: fonksiyon, görüntü, ters görüntü",
      "Lineer Cebir: çekirdek ve görüntü",
      "Soyut Cebir: denklik sınıfları ve bölüm grupları",
      "Hesaplama Teorisi: köşegen yöntemi",
      "Aksiyomatik Küme Kuramı (ZFC)",
    ],
  },
  quiz: [
    {
      question:
        "A = {1, 2, 3, 4} üzerinde kaç yansıyan bağıntı vardır?",
      options: ["2⁴ = 16", "2¹² = 4096", "2¹⁶ = 65 536", "4! = 24"],
      answer: 1,
      explanation:
        "A × A'da 16 ikili vardır. Yansıyanlık (1, 1), (2, 2), (3, 3), (4, 4) halkalarını zorunlu kılar; kalan 12 ikilinin her biri bağıntıda olabilir ya da olmayabilir. Çarpım kuralıyla 2¹² = 4096; sayfanın 03 sekmesi n = 4 için aynı sayıyı yazar.",
    },
    {
      question:
        "3 elemanlı bir kümeden 2 elemanlı bir kümeye kaç örten fonksiyon vardır?",
      options: ["2 tane", "3 tane", "6 tane", "8 tane"],
      answer: 2,
      explanation:
        "Bütün fonksiyonlar 2³ = 8'dir. Örten olmayanlar yalnız tek bir değeri kullanan iki sabit fonksiyondur. 8 − 2 = 6; formülle 2³ − C(2, 1)·1³ + 0 = 6. Aynı sayıyı 04 sekmesinde s(A) = 3, s(B) = 2 seçerek görebilirsin.",
    },
    {
      question:
        "f: {1, 2, 3} → P({1, 2, 3}) için f(1) = {2, 3}, f(2) = {2}, f(3) = ∅ olsun. D = {x : x ∉ f(x)} kümesi nedir ve neden hiçbir f(x)'e eşit değildir?",
      options: [
        "D = {2}; çünkü 2 kendi görüntüsünde",
        "D = {1, 3}; D, her f(x)'ten x elemanında ayrılır",
        "D = ∅; çünkü f(3) = ∅",
        "D = {1, 2, 3}; çünkü f örten değil",
      ],
      answer: 1,
      explanation:
        "1 ∉ {2, 3} olduğundan 1 ∈ D; 2 ∈ {2} olduğundan 2 ∉ D; 3 ∉ ∅ olduğundan 3 ∈ D. D = {1, 3}. D ile f(x), x elemanını içerme bakımından hep zıttır; bu Cantor teoreminin köşegen ispatıdır ve f'nin nasıl seçildiğine bağlı değildir.",
    },
  ],
  next: [
    {
      href: "kombinatorik-ve-sayma.html",
      title: "Kombinatorik ve Sayma: Seçimler, Güvercin Yuvası, İçerme–Dışlama ve Catalan",
      why: "Dizinin sonraki durağı: permütasyon ve kombinasyon, güvercin yuvası ilkesi ve içerme–dışlamanın genel hâli, düzensizlikler ve Catalan sayıları; formül ile tek tek sayım yan yana.",
    },
    {
      href: "cizge-teorisi.html",
      title: "Çizge Teorisi: Yapı, Değişmezler ve Teoremler",
      why: "Bir küme üzerindeki simetrik bağıntı bir çizgedir: derece ve Euler yolları, ağaçlar, boyama ve düzlemsellik sekmelerinde bu sayfanın ok şemaları teoremlere dönüşür.",
    },
    {
      href: "grup-teorisi.html",
      title: "Grup Teorisi: Simetrinin Cebiri",
      why: "Bir kümenin kendine birebir örten fonksiyonları bileşke altında bir grup kurar: simetri grupları, grup aksiyomları, permütasyonlar ve devirli gruplar.",
    },
    {
      href: "hesaplama-teorisi.html",
      title: "Hesaplama Teorisi: Turing Makineleri, Lambda Hesabı ve Çözülemezlik",
      why: "Cantor'un köşegen yöntemi burada durma probleminin çözülemezliğine dönüşür; Turing makineleri ve lambda hesabıyla hesaplamanın sınırları.",
    },
  ],
  sources: [
    {
      title: "Georg Cantor — MacTutor History of Mathematics",
      url: "https://mathshistory.st-andrews.ac.uk/Biographies/Cantor/",
      note: "1873–74 sayılabilirlik ve sayılamazlık sonuçları, Dedekind'le yazışma, 1877 boyut sonucu ve Kronecker, 1891 DMV toplantısı.",
    },
    {
      title: "Cantor's diagonal argument — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Cantor%27s_diagonal_argument",
      note: "1891 makalesi, 1874'teki ilk ispat; Cantor teoremi, Russell paradoksu ve durma problemiyle bağlantı.",
    },
    {
      title: "Russell's paradox — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Russell%27s_paradox",
      note: "Russell 1901, Frege'ye mektup ve 22 Haziran 1902 yanıtı, Grundgesetze II (1903), Zermelo'nun bağımsız bulgusu, 1908 aksiyomları ve ZFC.",
    },
    {
      title: "Venn diagram — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Venn_diagram",
      note: "Venn 1880 makalesi ve 1881 Symbolic Logic, Euler 1768, adın C. I. Lewis'in 1918 tarihli kitabında geçmesi.",
    },
    {
      title: "Continuum hypothesis — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Continuum_hypothesis",
      note: "Cantor 1878, Hilbert'in 1900 listesinin ilk problemi, Gödel 1940 ve Cohen 1963 bağımsızlık sonuçları.",
    },
  ],
  revision: "Kasım 2026",
};
