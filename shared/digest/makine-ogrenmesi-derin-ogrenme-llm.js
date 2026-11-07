window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["makine-ogrenmesi-derin-ogrenme-llm"] = {
  slug: "makine-ogrenmesi-derin-ogrenme-llm",
  title: "Makine Öğrenmesi: Hatadan Öğrenen Makineler",
  field: "Bilgisayar Bilimi",
  level: "Lise ileri",
  minutes: 40,
  tagline:
    "Sayfadaki ağın dokuz ağırlığı var; GPT-3'ün 175 milyar. İkisi de aynı şeyi yapar: tahmin et, hatayı ölç, her sayıyı eğimin tersine bir tık kaydır. Öğrenme dediğimiz şey, bu üç adımın milyarlarca kez tekrarıdır.",
  hook:
    "1958'de New York Times, ABD Donanması'nın yeni bir makinesinin yakında 'yürüyeceğini, konuşacağını, göreceğini, yazacağını ve varlığının bilincinde olacağını' yazdı. İki yıl sonra kurulan makine 400 fotoselle 20×20'lik bir görüntüye bakıp iki şekli ayırt etmeyi öğreniyordu; o kadar. Altmış yıl sonra aynı fikrin torunu bu cümleyi senin dilinde yazabiliyor. Arada ne değişti? Fikir değil; sayı, veri ve bir türev hilesi.",
  bigIdea:
    "Bir sinir ağı öğrenmez, <strong>ayarlanır</strong>: tahmin ile hedef arasındaki kaybın her ağırlığa göre türevi hesaplanır ve her ağırlık o eğimin tersine küçük bir adım atar, <em>w ← w − η·∂L/∂w</em>. Bu adımı yeterince çok tekrarlarsan ağ veriye uyar; akıllanıp akıllanmadığı ayrı bir sorudur.",
  story: [
    "1943'te nörofizyolog Warren McCulloch ile yirmi yaşındaki mantıkçı Walter Pitts, bir sinir hücresini 'girdileri topla, eşiği aşarsa ateşle' diye özetleyen bir matematiksel nöron önerdi. 1958'de Cornell'de psikolog Frank Rosenblatt bu nöronun ağırlıklarını veriden ayarlayan <strong>perceptron</strong>'u kurdu: Mark I Perceptron, 20×20'lik 400 fotoselden görüntü alıyor, ağırlıkları küçük elektrik motorlarıyla çevrilen potansiyometrelerde tutuyordu. Basın çıldırdı. 1969'da Marvin Minsky ve Seymour Papert <em>Perceptrons</em> kitabında tek katmanlı bu makinenin basit bir mantık işlemini, 'ya biri ya öteki ama ikisi değil' anlamındaki XOR'u bile öğrenemeyeceğini kanıtladı. Fon kesildi; alan ilk 'yapay zekâ kışına' girdi.",
    "Çıkış yolu çok katmandı; ama ara katmanların ağırlıklarını nasıl ayarlayacağını kimse bilmiyordu: hata çıktıda ölçülüyor, suç gizli nöronlara nasıl paylaştırılacaktı? Cevap aslında bir türev kuralıydı. Seppo Linnainmaa 1970'te yüksek lisans tezinde, Paul Werbos 1974'te doktorasında zincir kuralını tersten işleten yöntemi yazmıştı; ama fikir 1986'da David Rumelhart, Geoffrey Hinton ve Ronald Williams'ın <em>Nature</em>'daki üç sayfalık makalesiyle yayıldı. Adı <strong>geri yayılım</strong> oldu. 1989'da Yann LeCun bu yöntemi posta kodlarındaki el yazısı rakamlara uyguladı; 1997'de Sepp Hochreiter ve Jürgen Schmidhuber uzun dizileri hatırlayan LSTM hücresini tasarladı. Yine de 2000'lerde sinir ağları modası geçmiş sayılıyordu; Hinton'ın grubunu Kanada'da küçük bir fon ayakta tutuyordu.",
    "Dönüm noktası 2012'nin sonbaharıdır. Fei-Fei Li'nin derlediği ImageNet veri kümesinde (bin sınıf, bir milyonu aşkın eğitim görüntüsü) Alex Krizhevsky, Ilya Sutskever ve Hinton'ın ağı, iki oyuncu ekran kartında eğitilmiş 60 milyon ağırlıkla ilk beş tahminde yüzde 15,3 hata yaptı; en yakın rakip yüzde 26,2'deydi. Bir yılda bütün görü araştırması yön değiştirdi. 2016'da DeepMind'ın AlphaGo'su Seul'de Lee Sedol'u 4–1 yendi. 2017'de Google'dan sekiz araştırmacı 'Attention Is All You Need' makalesiyle <strong>Transformer</strong>'ı önerdi: dizideki her sözcüğün ötekilere 'dikkat' ettiği, paralel hesaplanabilen bir mimari. 2020'de GPT-3 bu mimariyi 175 milyar ağırlığa ve 300 milyar eğitim token'ına taşıdı. 2024'te Nobel Fizik Ödülü Hopfield ile Hinton'a, Kimya Ödülü'nün yarısı protein yapısını tahmin eden AlphaFold için Hassabis ile Jumper'a verildi.",
    "Bu tarihin dürüst okuması şudur: temel fikirler 1986'da hazırdı; eksik olan veri ve hesap gücüydü. Bir de dil modelinin ne yaptığını açık söylemek gerekir. Bir LLM, verilen metinden sonra gelecek token'ın olasılık dağılımını hesaplar ve oradan bir token çeker; bunu her yeni token için yineler. Dünya hakkında inandırıcı yazması, yazdığının doğru olduğu anlamına gelmez; eğitim verisinin yanlılıklarını taşır ve emin bir sesle yanlış söyleyebilir. Sayfadaki 2-3-1 ağ bu devin en küçük kopyasıdır: aynı türev, aynı adım, dokuz ağırlık.",
  ],
  core: [
    {
      heading: "Yapay nöron: ağırlıklı toplam ve bir sıkıştırma",
      body:
        "Sayfadaki her düğüm aynı işi yapar: gelen sayıları ağırlıklarıyla çarpıp toplar, sonra toplamı <strong>sigmoid</strong> fonksiyonundan geçirir. Sigmoid, −∞ ile +∞ arasındaki her sayıyı 0 ile 1 arasına sıkıştırır; sıfırda tam 0,5 verir. Girdi [1,0; 0,5] sabittir. Üç gizli nöronun her birine iki çizgi girer (6 ağırlık), çıktı nöronuna üç çizgi (3 ağırlık): toplam dokuz ayarlanabilir sayı. Ekranda çizginin rengi ağırlığın işaretini (turkuaz artı, kırmızı eksi), kalınlığı büyüklüğünü, düğümün parlaklığı aktivasyonunu gösterir. Bu ağda bias (sabit kaydırma) terimi yoktur; gerçek ağlarda her nöronun bir de b'si olur.",
      formula: "h = σ(w₁x₁ + w₂x₂), σ(z) = 1 / (1 + e<sup>−z</sup>)",
      formulaNote: "σ(0) = 0,5; σ(2) ≈ 0,88; σ(−2) ≈ 0,12. Çıktı asla tam 0 ya da tam 1 olmaz.",
    },
    {
      heading: "Kayıp ve gradyan inişi: hatayı bir sayıya indir, yokuş aşağı yürü",
      body:
        "Ağın ne kadar yanıldığını tek bir sayıyla ölçmek gerekir; buna <strong>kayıp</strong> denir. Sayfa, tahmin ile 0,8 hedefi arasındaki farkı kullanır; çoğu regresyon modeli farkın karesini alır. Kayıp, dokuz ağırlığın bir fonksiyonudur: dokuz boyutlu bir arazi düşün, her noktanın yüksekliği kayıp. Öğrenme bu arazide en alçak noktayı aramaktır. Her ağırlık için 'bu ağırlığı birazcık artırsam kayıp ne kadar değişir' sorusunun cevabı, kaybın o ağırlığa göre türevidir; dokuz türevin listesine <strong>gradyan</strong> denir ve en dik yokuş yukarı yönü gösterir. Ters yöne, η çarpı gradyan kadar adım atarsın. Sayfada η = 0,1'dir ve her Eğit tıklaması beş adım atar.",
      formula: "w ← w − η · ∂L/∂w",
      formulaNote: "η (öğrenme oranı) adım boyu. Çok büyükse vadiyi atlayıp karşı yamaca çıkarsın; çok küçükse yüzlerce adım gerekir.",
    },
    {
      heading: "Geri yayılım: zincir kuralı tersten",
      body:
        "Çıktıdaki hatayı ölçmek kolay; zor olan, gizli katmandaki bir ağırlığın bu hataya ne kadar katkı yaptığını bulmaktır. Zincir kuralı bunu adım adım verir. Önce çıktı nöronunun 'hata payı' hesaplanır: δ<sub>çıktı</sub> = (hedef − y)·y(1−y). Buradaki y(1−y), sigmoidin kendi çıktısı cinsinden türevidir. Sonra bu pay geriye, her gizli nörona kendi ağırlığı oranında dağıtılır ve o nöronun sigmoid türeviyle çarpılır: δ<sub>h</sub> = δ<sub>çıktı</sub>·w·h(1−h). Her ağırlığın gradyanı, çizginin başındaki aktivasyon çarpı sonundaki hata payıdır. İleri geçiş sayıları soldan sağa taşır, geri geçiş suçu sağdan sola. Modern kütüphaneler (PyTorch, JAX) bunu otomatik yapar; ama altında bu sayfadaki üç satır vardır.",
      formula: "∂L/∂w<sub>ij</sub> = −δ<sub>j</sub> · a<sub>i</sub>",
      formulaNote: "a<sub>i</sub> çizginin girişindeki aktivasyon, δ<sub>j</sub> çıkışındaki nöronun hata payı. İşaret, kaybın ½(hedef − y)² alınmasından gelir.",
    },
    {
      heading: "Doğrusal olmayan katman olmadan derinlik boştur",
      body:
        "Sigmoidi kaldırıp nöronları yalnızca toplama-çarpma yapan kutular olarak bırakırsan, iki katman üst üste konduğunda sonuç yine tek bir doğrusal işlemdir: W₂(W₁x) = (W₂W₁)x. Yüz katman da olsa düz bir çizgiden fazlasını çizemez; XOR'u öğrenemez. Minsky ile Papert'in 1969'daki itirazının özü buydu. Araya sigmoid, tanh ya da ReLU gibi bükücü bir fonksiyon girince katmanlar birbirine indirgenemez ve ağ, 1989'da Cybenko'nun kanıtladığı gibi, yeterince gizli nöronla her sürekli fonksiyona istenen yakınlıkta yaklaşabilir. Ama sigmoidin bir bedeli vardır: türevi en çok 0,25'tir. On katmanlık bir zincirde gradyan 0,25¹⁰, yani milyonda birin altına inebilir. 2010'larda ReLU'ya geçişin nedeni budur.",
      formula: "ReLU(z) = max(0, z); σ′(z) = σ(z)(1 − σ(z)) ≤ 0,25",
      formulaNote: "ReLU'nun türevi pozitif tarafta tam 1'dir; derin ağlarda gradyan sönmeden geriye taşınır.",
    },
    {
      heading: "Transformer ve sıcaklık: sonraki token bir zar atışıdır",
      body:
        "Dil modeli metni önce <strong>token</strong> denen parçalara böler (Türkçede bir sözcük çoğu zaman birkaç token olur), her tokenı yüzlerce sayılık bir vektöre çevirir ve <strong>öz-dikkat</strong> ile her konumun ötekilerden ne alacağını hesaplar: sorgu Q anahtar K ile çarpılır, √d ile ölçeklenir, softmax'tan geçirilip değerlerin V ağırlıklı toplamı alınır. Sayfadaki akış şemasının son kutusu işin püf noktasıdır: ağ, sözlükteki her token için bir puan (logit) üretir, softmax bu puanları olasılığa çevirir. <strong>Sıcaklık</strong> τ puanları bölen bir sayıdır: τ küçülünce en yüksek puan tüm olasılığı toplar, τ büyüyünce dağılım düzleşir. Aynı soruya iki kez farklı cevap almanın nedeni bu zar atışıdır.",
      formula: "p<sub>i</sub> = e<sup>z<sub>i</sub>/τ</sup> / Σ<sub>j</sub> e<sup>z<sub>j</sub>/τ</sup>",
      formulaNote: "Puanlar [2, 1, 0] için τ = 1'de olasılıklar 0,665 / 0,245 / 0,090; τ = 0,5'te 0,867 / 0,117 / 0,016.",
    },
  ],
  lab: {
    intro:
      "Sayfanın deney alanı <strong>Yapay Sinir Ağı</strong> panelidir: 2-3-1 ağ, sabit giriş [1, 0.5] (yani 1 ve 0,5), hedef 0,8, öğrenme oranı 0,1. Üç düğme var: <strong>Forward Pass</strong> (ileri geçiş, tahmini hesaplar), <strong>Eğit (Backprop)</strong> (beş geri yayılım adımı) ve <strong>Sıfırla</strong> (dokuz ağırlığı −1 ile 1 arasında yeniden kurar). Altındaki satır Tahmin'i dört ondalıkla, çıktı düğümü iki ondalıkla gösterir; Hata = |0,8 − Tahmin|. Sayfa açılır açılmaz bir ileri geçiş yapılmış olur. Diğer paneller tıklanabilir kartlardır: sekiz mimari, on iki kavram. Kalem ve hesap makinesi bulundur.",
    experiments: [
      {
        title: "Rastgele ağ hedefe ne kadar yaklaşır?",
        predict: "Sıfırla'ya basıp Forward Pass'a tıkladığında Tahmin 0 ile 1 arasında her yere düşebilir mi? On denemede kaçında 0,8'in üstüne çıkar?",
        do: "On kez sırayla Sıfırla ve Forward Pass'a bas; her seferinde Tahmin ve Hata değerlerini bir tabloya yaz. En küçük ve en büyük Tahmin'i işaretle.",
        observe: "Tahmin hiçbir zaman 0,08'in altına ya da 0,92'nin üstüne çıkmaz; on denemenin çoğu 0,30–0,70 bandına düşer ve tipik Hata 0,30 civarıdır. 0,8'i aşan bir tahmin görmen yaklaşık dört yüz denemede bir olur. Sıfırla'dan hemen sonra bütün düğümler sönüktür; Forward Pass'a kadar Tahmin '—' kalır.",
        explain: "Giriş 1 ve 0,5, ağırlıklar −1 ile 1 arasında: gizli nöronların toplamı en çok ±1,5 olabilir, sigmoid bunu 0,18–0,82'ye sıkıştırır. Çıktı toplamı da en çok ±3·0,82 ≈ ±2,45'tir; σ(2,45) = 0,92. Hedef 0,8 ulaşılabilir ama kıyıda; rastgele ağırlıkla oraya düşmek nadirdir. Öğrenmeye ihtiyaç tam bu yüzden var.",
      },
      {
        title: "Çizgileri ve ışıkları okumak",
        predict: "Sıfırla'dan sonra dokuz çizgiden kaçı kırmızı olur? Forward Pass'tan sonra üç gizli düğümden hangisi en parlak yanar: en kalın kırmızı çizgileri alan mı, en kalın turkuaz çizgileri alan mı?",
        do: "Sıfırla'ya bas, kırmızı ve turkuaz çizgileri say. Forward Pass'a bas; üst giriş düğümü (1) ile alt giriş düğümünün (0,5) parlaklığını, sonra üç gizli düğümü karşılaştır. Forward Pass'a üç kez daha bas.",
        observe: "Kırmızı sayısı her Sıfırla'da değişir, ortalaması dokuzda dört buçuktur. Üst giriş düğümü her zaman alttakinden parlaktır. En parlak gizli düğüm, özellikle üst girişten gelen çizgisi kalın ve turkuaz olandır; iki çizgisi de kırmızı olan düğüm en sönüktür ama tam kararmaz. Forward Pass'ı tekrarlamak hiçbir sayıyı değiştirmez.",
        explain: "Çizgi rengi ağırlığın işareti, kalınlık büyüklüğü (en çok 1,5 piksel, bu yüzden hepsi incedir), düğüm parlaklığı aktivasyonudur. Giriş 1 olan düğümün çizgileri toplama 0,5'likten iki kat çok katkı yapar. Hiçbir gizli düğüm tam kararmaz çünkü sigmoid 0,18'in altına inemez. İleri geçiş deterministiktir: aynı ağırlık, aynı giriş, aynı çıktı; rastgelelik yalnızca Sıfırla'dadır.",
      },
      {
        title: "Eğit: beş adımda hata ne kadar erir?",
        predict: "Öğrenme oranı 0,1, bir tıklama beş adım. Doğru çalışan bir geri yayılımda tek tıklama Hata'yı yüzde kaç azaltır: yüzde 50 mi, yüzde 10 mu, yüzde 2 mi? Hata'yı 0,01'in altına indirmek kaç tıklama ister?",
        do: "Sıfırla ve Forward Pass ile bir başlangıç Hata'sı al, not et. Eğit (Backprop)'a bir kez bas, Hata'yı oku; sonra on kez daha bas.",
        observe: "Doğru geri yayılım tek tıklamada Hata'yı tipik olarak yalnızca yüzde 2–3 azaltır (0,300 → 0,290 gibi); 0,01'in altı için 150–200 tıklama gerekir. Sayfanın Ekim 2026 sürümünde ise Eğit'e basınca Tahmin ve Hata satırında 'NaN' belirir: koddaki geri yayılım döngüsü gizli katmanın hata paylarını hesapladıktan sonra atıyor, giriş katmanı ağırlıklarını tanımsız bir sayıyla güncelliyor ve tanımsızlık dokuz ağırlığa yayılıyor. NaN, 'Not a Number' demektir; sonrasında yalnızca Sıfırla kurtarır.",
        explain: "Adım küçüktür çünkü üç çarpan birden küçüktür: hata (≈0,3), sigmoid türevi (en çok 0,25) ve η = 0,1. Çarpımları binde birkaç; ağırlık başına kayma o kadardır. Gerçek modeller bu yüzden milyonlarca adım atar ve Adam gibi adım boyunu uyarlayan yöntemler kullanır. Sayfa düzeltilince çözümlü örnekteki el hesabıyla ilk tıklamanın sonucunu doğrulayabilirsin; düzeltilene kadar NaN'ı da bir ders say: tek bir tanımsız sayı, bir hesabın tamamını zehirler.",
      },
      {
        title: "Sıcaklık kartıyla elle softmax",
        predict: "Üç token için puanlar [2, 1, 0] olsun. τ = 1'de en olası token'ın payı yüzde kaç? τ'yu 0,5'e indirince bu pay artar mı, azalır mı; 2'ye çıkarınca?",
        do: "ML & DL Temel Kavramlar panelinde Temperature & Sampling kartına tıkla, formülü oku. Hesap makinesinde e², e¹, e⁰ değerlerini bul, topla, her birini toplama böl. Sonra puanları τ = 0,5 için ikiyle çarp, τ = 2 için ikiye böl ve yinele.",
        observe: "τ = 1: 7,389 / 2,718 / 1 toplam 11,107, olasılıklar 0,665 / 0,245 / 0,090. τ = 0,5: puanlar [4, 2, 0], olasılıklar 0,867 / 0,117 / 0,016. τ = 2: puanlar [1, 0,5, 0], olasılıklar 0,506 / 0,307 / 0,186. τ = 0,1'de ilk token 1,000'e yuvarlanır.",
        explain: "Üstel fonksiyon farkları büyütür: puan farkı 1 iken olasılık oranı e ≈ 2,7; τ = 0,5 ile fark 2'ye çıkınca oran e² ≈ 7,4 olur. Düşük sıcaklık modeli tutucu ve tekrarcı, yüksek sıcaklık yaratıcı ama dağınık yapar. Sohbet uygulamaları genellikle 0,7–1 civarında çalışır; kod üretirken daha düşük tercih edilir.",
      },
    ],
  },
  wow: [
    {
      title: "1958: 'kendi varlığının bilincinde olacak' makine",
      body:
        "8 Temmuz 1958'de New York Times, Rosenblatt'ın perceptron'u için Donanma'nın 'yürüyen, konuşan, gören, yazan, kendini çoğaltan ve varlığının bilincinde olan bir elektronik bilgisayarın embriyosu' beklediğini yazdı. Makinenin yaptığı iş, 400 fotoselden gelen 20×20'lik görüntüde iki sınıfı ayırmaktı; ağırlıkları motorların çevirdiği potansiyometrelerdi. Abartılı başlık ile mütevazı makine arasındaki uçurum, alanı on yıl sonra kışa soktu. Benzer başlıkları bugün de okuyorsun; sayfadaki ağa bakıp ölçeği hatırla.",
    },
    {
      title: "İki oyuncu ekran kartı, bir alanın yönü",
      body:
        "2012 ImageNet yarışmasında Krizhevsky, Sutskever ve Hinton'ın ağı 60 milyon ağırlık taşıyordu ve iki NVIDIA GTX 580 oyun kartında yaklaşık bir hafta eğitildi. İlk beş tahminde yüzde 15,3 hata yaptı; ikinci olan ekip yüzde 26,2'deydi. On puanı aşan bu fark, görüntü tanımada on yıllık el yapımı özellik mühendisliğini bir yılda rafa kaldırdı. Oyun kartları o günden sonra 'yapay zekâ donanımı' oldu; NVIDIA'nın bugünkü değeri o yarışmaya çok şey borçlu.",
    },
    {
      title: "Fizik Nobel'i bir bilgisayar bilimcisine",
      body:
        "2024 Nobel Fizik Ödülü, 'yapay sinir ağlarıyla makine öğrenmesini mümkün kılan temel keşifler' için John Hopfield ile Geoffrey Hinton'a verildi; Hinton 1986'daki geri yayılım makalesinin yazarlarındandır. Aynı yıl Kimya Ödülü'nün yarısı Demis Hassabis ile John Jumper'a, protein yapısını amino asit diziliminden tahmin eden AlphaFold için gitti; AlphaFold veri tabanı 2022'de 200 milyonu aşkın protein yapısı tahmini yayımladı. Elli yıl boyunca biyologların tek tek, yıllar harcayarak çözdüğü yapılar, bu sayfadaki türev hilesinin devasa bir sürümüyle hesaplandı.",
    },
  ],
  worked: {
    title: "Tek bir geri yayılım adımı, elle",
    prompt:
      "Sayfadaki ağla aynı yapıda (2-3-1, sigmoid, bias yok) bir ağın ağırlıkları şöyle olsun. Giriş→gizli: üst girişten [0,5; −0,3; 0,2], alt girişten [0,4; 0,6; −0,8]. Gizli→çıktı: [0,7; −0,5; 0,9]. Giriş [1,0; 0,5], hedef 0,8, η = 0,1. Tahmini bul, bir geri yayılım adımı at, yeni tahmini hesapla. (Bütün nicelikler birimsizdir.)",
    steps: [
      "İleri geçiş, gizli katman: z₁ = 1,0·0,5 + 0,5·0,4 = 0,70 → h₁ = σ(0,70) = 0,668. z₂ = −0,30 + 0,30 = 0 → h₂ = 0,500. z₃ = 0,20 − 0,40 = −0,20 → h₃ = σ(−0,20) = 0,450.",
      "İleri geçiş, çıktı: z = 0,668·0,7 + 0,500·(−0,5) + 0,450·0,9 = 0,468 − 0,250 + 0,405 = 0,623 → y = σ(0,623) = 0,651. Hata = 0,8 − 0,651 = 0,149. Sayfa bu durumda 'Tahmin: 0.6509 · Hata: 0.1491' yazardı.",
      "Çıktının hata payı: δ = (hedef − y)·y(1 − y) = 0,149 · 0,651 · 0,349 = 0,0339. Sigmoid türevi burada 0,227; en iyi ihtimalle 0,25 olabilirdi.",
      "Gizli→çıktı ağırlıklarını güncelle: Δw = η·δ·h. 0,1·0,0339·0,668 = +0,0023; 0,1·0,0339·0,500 = +0,0017; 0,1·0,0339·0,450 = +0,0015. Yeni ağırlıklar 0,7023; −0,4983; 0,9015. Üçü de arttı: çıktıyı büyütmek için her gizli nöronun katkısı artırılır.",
      "Hata payını geriye dağıt: δ<sub>h</sub> = δ·w·h(1 − h). h₁ için 0,0339·0,7·0,222 = 0,0053; h₂ için 0,0339·(−0,5)·0,25 = −0,0042; h₃ için 0,0339·0,9·0,248 = 0,0075. Giriş ağırlıkları Δw = η·δ<sub>h</sub>·x ile kayar: üst giriş (x = 1) için +0,0005; −0,0004; +0,0008, alt giriş için bunların yarısı. İkinci nöronun ağırlıkları küçülür; çünkü onun çıktıya ağırlığı negatiftir, daha az aktifleşmesi tahmini yükseltir.",
      "Yeni ileri geçiş: y = 0,6517. Tahmin 0,0008 arttı; beş adımdan (bir Eğit tıklaması) sonra 0,6547, hata 0,01'in altına 709. adımda, yani yaklaşık 142 tıklamada iner.",
    ],
    result:
      "Tek bir adım tahmini binde birden az oynatır. Öğrenme dramatik bir sıçrama değil, doğru yönde atılmış yüzlerce küçük adımdır; ölçeği büyüt, GPT-3'ün eğitimini elde edersin.",
  },
  misconceptions: [
    {
      myth: "Dil modeli akıcı ve emin yazıyorsa söylediği doğrudur.",
      truth:
        "Model, eğitim metinlerine göre en olası sonraki token'ı seçer; 'olası' ile 'doğru' aynı şey değildir. Uydurma bir kaynak adı ya da yanlış bir tarih, gerçeklerle aynı akıcılıkta gelir. Sıcaklık deneyinde gördüğün zar atışı her cümlede vardır. Önemli bir bilgiyi bağımsız bir kaynakla doğrulamadan kullanma.",
    },
    {
      myth: "Eğitim verisinde yüzde 99 doğruluk, iyi bir model demektir.",
      truth:
        "Yeterince büyük bir ağ eğitim örneklerini ezberleyebilir; buna aşırı uyum denir. Ölçüt, modelin hiç görmediği ayrı bir test kümesindeki başarıdır. Eğitimde yüzde 99, testte yüzde 72 veren bir model ezberlemiştir; ayrıca dengesiz sınıflarda yüzde 99 doğruluk, 'herkese hayır de' kuralıyla bile alınabilir.",
    },
    {
      myth: "Daha çok katman eklemek ağı her zaman daha güçlü yapar.",
      truth:
        "Sigmoidli bir ağda her katmanın türev çarpanı en çok 0,25'tir; on katmanda milyonda bire kadar düşebilen gradyanla ilk katmanlar hiç öğrenemez. Derinlik ancak ReLU, normalizasyon, artık bağlantı gibi hilelerle ve yeterli veriyle işe yarar. Kırk katmanlı bir ağı bin örnekle eğitmek, kırk katmanlı bir ezber makinesi üretir.",
    },
    {
      myth: "Sohbet botuna yazdıklarım onu anında eğitir.",
      truth:
        "Eğitim ile kullanım ayrı evrelerdir. Sohbet sırasında ağırlıklar donuktur; model yalnızca ileri geçiş yapar, geri yayılım çalışmaz. Konuşma içinde 'hatırlıyor' görünmesi, önceki metnin bağlam penceresinde durmasındandır; pencere kapanınca gider. Sayfada bunun küçük modeli: Forward Pass hiçbir ağırlığı değiştirmez, yalnızca Eğit değiştirir.",
    },
  ],
  glossary: [
    { term: "Ağırlık (w)", definition: "İki nöron arasındaki bağlantının çarpanı; öğrenme sırasında ayarlanan sayıların kendisi, bir modelin 'parametreleri'." },
    { term: "Aktivasyon fonksiyonu", definition: "Ağırlıklı toplamı büken fonksiyon (sigmoid, tanh, ReLU); onsuz katmanlar tek bir doğrusal işleme çöker." },
    { term: "Kayıp fonksiyonu", definition: "Tahmin ile hedef arasındaki uyumsuzluğu tek bir sayıya indiren ölçü; eğitim bu sayıyı küçültmeye çalışır." },
    { term: "Gradyan", definition: "Kaybın her ağırlığa göre türevlerinin listesi; en dik artış yönünü gösterir, öğrenme ters yönde yürür." },
    { term: "Öğrenme oranı (η)", definition: "Gradyan inişinde adım boyu; sayfada 0,1. Büyükse ıraksar, küçükse sürünür." },
    { term: "Geri yayılım", definition: "Çıktıdaki hata payını zincir kuralıyla katman katman geriye dağıtarak her ağırlığın gradyanını hesaplayan yöntem." },
    { term: "Token", definition: "Dil modelinin metni böldüğü parça: bir sözcük, bir hece ya da bir harf olabilir; model her adımda bir sonraki token'ı tahmin eder." },
    { term: "Aşırı uyum", definition: "Modelin eğitim verisinin ayrıntı ve gürültüsünü ezberleyip yeni veride başarısız olması; ayrı test kümesiyle yakalanır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bu konu bir sözcük dağarcığıdır; üniversitede dört dersin kesişimine dönüşür. <strong>Lineer cebir</strong>: bir katman aslında matris çarpımıdır, h = σ(Wx); GPT-3'ün 175 milyar parametresi bu matrislerin elemanlarıdır ve ekran kartları tam da matris çarpmak için vardır. <strong>Çok değişkenli kalkülüs</strong>: gradyan, zincir kuralı ve geri yayılım; otomatik türev kütüphaneleri bu dersin algoritmaya dökülmüş hâlidir. <strong>Olasılık</strong>: softmax bir olasılık dağılımıdır, çapraz entropi kaybı 'doğru token'a verilen olasılığın eksi logaritması'dır ve eğitim, en çok olabilirlik kestiriminin ta kendisidir. <strong>Optimizasyon</strong>: gradyan inişi en basit yöntemdir; momentum, Adam ve öğrenme oranı takvimleri aynı vadiye daha akıllıca iner.",
      "Sonra büyük sorular gelir. Neden milyarlarca parametreli bir model ezberlemek yerine genelleştiriyor; klasik istatistik bunu beklemezdi. Model büyüdükçe kayıp neden düzgün bir kuvvet yasasıyla düşüyor ve veri ile parametre arasındaki en verimli oran nedir? Bir modelin davranışını insan tercihlerine nasıl hizalarsın ve bunu nasıl ölçersin? Bu soruların bir kısmı 2020'lerde açıldı, bir kısmı hâlâ açık. Makine öğrenmesi lisans programlarında genellikle ikinci ya da üçüncü sınıfta başlar; ama türev, matris ve olasılığı sağlam öğrenen biri, oraya vardığında yeni hiçbir şey görmez, yalnızca eski araçların yeni bir birleşimini.",
    ],
    topics: ["Matris çarpımı ve katmanlar", "Zincir kuralı ve otomatik türev", "Çapraz entropi ve en çok olabilirlik", "Stokastik gradyan inişi ve Adam", "Düzenlileştirme ve genelleme", "Öz-dikkat ve Transformer", "Ölçekleme yasaları", "Pekiştirmeli öğrenme"],
  },
  quiz: [
    {
      question: "Sayfada Sıfırla ve Forward Pass'a bastığında Tahmin hangi aralıkta olabilir?",
      options: ["0 ile 1 arasında her yerde", "Yaklaşık 0,08 ile 0,92 arasında", "Her zaman tam 0,5", "−1 ile 1 arasında"],
      answer: 1,
      explanation: "Ağırlıklar −1 ile 1 arasında, giriş 1 ve 0,5: gizli aktivasyonlar 0,18–0,82'ye, çıktı toplamı ±2,45'e sıkışır ve σ(±2,45) ≈ 0,08 / 0,92 verir. Pratikte çoğu değer 0,3–0,7 arasına düşer.",
    },
    {
      question: "Sigmoid fonksiyonunun türevi y(1 − y) en çok kaç olabilir ve bu neden önemlidir?",
      options: ["1; türev hiç sönmez", "0,5; iki katmanda yarıya iner", "0,25; her sigmoid katmanı gradyanı en az dörtte birlik bir çarpanla söndürür", "0; sigmoid türevlenemez"],
      answer: 2,
      explanation: "y = 0,5'te y(1 − y) = 0,25, başka her yerde daha küçük. On sigmoid katmanı art arda gelince gradyan 0,25¹⁰ ≈ 10⁻⁶ ile çarpılır; derin ağlarda ReLU'ya geçilmesinin nedeni bu sönmedir.",
    },
    {
      question: "Puanları [2, 1, 0] olan üç token için sıcaklığı 1'den 0,5'e indirirsen en olası token'ın olasılığı ne olur?",
      options: ["Değişmez, 0,665 kalır", "Düşer, 0,506 olur", "Yükselir, 0,867 olur", "Tam 1,000 olur"],
      answer: 2,
      explanation: "τ = 0,5 puanları ikiye katlar: [4, 2, 0]. e⁴ = 54,6, e² = 7,39, e⁰ = 1; toplam 63,0 ve ilk pay 0,867. Düşük sıcaklık dağılımı keskinleştirir; 1,000'e ancak τ → 0'da yaklaşır.",
    },
  ],
  next: [
    { href: "turev.html", title: "Türev", why: "Gradyan inişinin dişlisi: fark oranı, limit ve eğimin tersine adım atmak." },
    { href: "cok-degiskenli-kalkulus.html", title: "Çok Değişkenli Kalkülüs", why: "Dokuz boyutlu kayıp arazisinde gradyanın gerçekten ne olduğu ve zincir kuralının çok değişkenli hâli." },
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler", why: "Bir katman bir matris çarpımıdır; embedding vektörleri ve dikkat matrisleri bu dilde yazılır." },
    { href: "bayes-olasilik.html", title: "Bayes Olasılığı", why: "Softmax bir olasılık dağılımıdır; modelin 'emin olması' ile haklı olması arasındaki farkı olasılıkla düşün." },
  ],
  sources: [
    { title: "Vaswani ve diğerleri (2017) · Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", note: "Transformer'ın doğduğu makale; sayfadaki LLM akış şemasının kaynağı. Özeti ve ilk şekli lise bilgisiyle okunabilir." },
    { title: "3Blue1Brown · Neural networks", url: "https://www.3blue1brown.com/topics/neural-networks", note: "Ağırlıkları, gradyan inişini ve geri yayılımı animasyonla anlatan video dizisi; Transformer ve dikkat bölümleri de var (İngilizce)." },
    { title: "MIT OpenCourseWare · 6.036 Introduction to Machine Learning (Fall 2020)", url: "https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/", note: "Perceptron'dan sinir ağlarına ve pekiştirmeli öğrenmeye, ders notları ve alıştırmalarla tam bir lisans dersi (İngilizce)." },
    { title: "Nobel Prize · 2024 Fizik Ödülü özeti", url: "https://www.nobelprize.org/prizes/physics/2024/summary/", note: "Hopfield ve Hinton: yapay sinir ağlarıyla makine öğrenmesinin temelleri; resmi gerekçe ve popüler açıklama (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
