window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["makine-ogrenmesi-derin-ogrenme-llm"] = {
  slug: "makine-ogrenmesi-derin-ogrenme-llm",
  title: "Makine Öğrenmesi: Hatadan Öğrenen Makineler",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Tahmin et, hatayı ölç, her sayıyı eğimin tersine azıcık kaydır. Sayfadaki 17 parametreli ağ da, 2020'de 175 milyar parametreli GPT-3 de böyle eğitildi. Üç sekmede bu adımı kendin atıp kuramla karşılaştırıyorsun.",
  hook:
    "1958'de New York Times, ABD Donanması'nın, yeni makinesinin 'yürüyeceğini, konuşacağını, göreceğini, yazacağını, kendini çoğaltacağını ve varlığının bilincinde olacağını' umduğunu yazdı. 1960'ta gösterilen makine, 400 fotoselle baktığı 20×20'lik görüntüde iki şekli ayırt etmeyi öğreniyordu; o kadar. Aynı fikrin torunu bugün bu cümleyi senin dilinde yazabiliyor. Değişen fikir değil; sayı, veri ve bir türev hilesi.",
  bigIdea:
    "Bir sinir ağı öğrenmez, <strong>ayarlanır</strong>: tahmin ile hedef arasındaki kaybın her ağırlığa göre türevi hesaplanır ve her ağırlık o eğimin tersine küçük bir adım atar, <em>w ← w − η·∂L/∂w</em>. Bu adımı yeterince çok tekrarlarsan ağ veriye uyar; akıllanıp akıllanmadığı ayrı bir sorudur.",
  story: [
    "1943'te nörofizyolog Warren McCulloch ile yirmi yaşındaki mantıkçı Walter Pitts, bir sinir hücresini 'girdileri topla, eşiği aşarsa ateşle' diye özetleyen bir matematiksel nöron önerdi. 1958'de Cornell Havacılık Laboratuvarı'nda psikolog Frank Rosenblatt bu nöronun ağırlıklarını veriden ayarlayan <strong>perceptron</strong>'u tanıttı; donanım olarak kurulan Mark I Perceptron 20×20'lik 400 fotoselden görüntü alıyor, ağırlıkları küçük elektrik motorlarıyla çevrilen potansiyometrelerde tutuyordu. Basın coştu. 1969'da Marvin Minsky ve Seymour Papert <em>Perceptrons</em> kitabında tek katmanlı bu makinenin basit bir mantık işlemini, 'ya biri ya öteki ama ikisi değil' anlamındaki XOR'u bile temsil edemeyeceğini kanıtladı. Kanıt yalnızca tek katmanlı algılayıcılar içindi; çok katmanlı ağlar için böyle bir imkânsızlık göstermiyordu, ama onları eğitecek bir yöntem de ortada yoktu. Kitabın ardından sinir ağlarına ilgi de para da azaldı; bu soğuma çoğu anlatıda ilk 'yapay zekâ kışı'nın parçası sayılır.",
    "Çıkış yolu çok katmandı; ama ara katmanların ağırlıklarını nasıl ayarlayacağını kimse bilmiyordu: hata çıktıda ölçülüyor, suç gizli nöronlara nasıl paylaştırılacaktı? Cevap aslında bir türev kuralıydı. Seppo Linnainmaa 1970'te yüksek lisans tezinde, Paul Werbos 1974'te doktorasında zincir kuralını tersten işleten yöntemi yazmıştı; ama fikir 1986'da David Rumelhart, Geoffrey Hinton ve Ronald Williams'ın <em>Nature</em>'daki dört sayfalık makalesiyle yayıldı. Adı <strong>geri yayılım</strong> oldu. 1989'da Yann LeCun bu yöntemi posta kodlarındaki el yazısı rakamlara uyguladı, 1998'de LeNet-5 ile evrişimli ağın bugün de tanıdık gelen biçimini verdi; 1997'de Sepp Hochreiter ve Jürgen Schmidhuber uzun dizileri hatırlayan LSTM hücresini tasarladı. Yine de 2000'lerde sinir ağları modası geçmiş sayılıyordu; Hinton'ın çevresindeki küçük topluluğu Kanada'nın araştırma kurumu CIFAR'ın bir programı ayakta tutuyordu.",
    "Dönüm noktası 2012'nin sonbaharıdır. Fei-Fei Li'nin öncülük ettiği ImageNet veri kümesinin yarışmasında (bin sınıf, yaklaşık 1,2 milyon eğitim görüntüsü) Alex Krizhevsky, Ilya Sutskever ve Hinton'ın ağı, iki oyuncu ekran kartında eğitilmiş 60 milyon ağırlıkla ilk beş tahminde yüzde 15,3 hata yaptı; en yakın rakip yüzde 26,2'deydi. Birkaç yıl içinde bilgisayarla görü araştırmasının büyük bölümü derin ağlara döndü. 2016'da DeepMind'ın AlphaGo'su Seul'de Lee Sedol'u 4–1 yendi. 2017'de Google çatısı altında çalışan sekiz araştırmacı 'Attention Is All You Need' makalesiyle <strong>Transformer</strong>'ı önerdi: dizideki her sözcüğün ötekilere 'dikkat' ettiği, paralel hesaplanabilen bir mimari. 2018'de aynı mimariden iki aile doğdu: haziranda OpenAI'ın GPT'si, ekimde Google'ın BERT'i. 2020'de GPT-3 bu mimariyi 175 milyar ağırlığa ve 300 milyar eğitim token'ına taşıdı. Daha yeni modellerin boyutu çoğu zaman açıklanmıyor ve 'en büyük model' unvanı birkaç ayda el değiştiriyor; bu defter o yüzden 2020'nin belgeli sayısında duruyor. 2024'te Nobel Fizik Ödülü Hopfield ile Hinton'a, Kimya Ödülü'nün yarısı protein yapısını tahmin eden AlphaFold için Hassabis ile Jumper'a verildi.",
    "Bu tarihin dürüst okuması şudur: temel fikirler 1986'da hazırdı; eksik olan veri ve hesap gücüydü. Bir de dil modelinin ne yaptığını açık söylemek gerekir. Bir LLM, verilen metinden sonra gelecek token'ın olasılık dağılımını hesaplar ve oradan bir token çeker; bunu her yeni token için yineler. Dünya hakkında inandırıcı yazması, yazdığının doğru olduğu anlamına gelmez; eğitim verisinin yanlılıklarını taşır ve emin bir sesle yanlış söyleyebilir. Sayfadaki 17 parametreli ağ aynı türevle aynı adımı atar; harf ikililerini sayan küçük dil modeli de aynı kaybı ölçer. İkisi de devin kendisi değildir, onun çalışma ilkesinin elle tutulur minyatürleridir.",
  ],
  core: [
    {
      heading: "Kayıp yüzeyi: hatayı tek sayıya indir, yokuş aşağı yürü",
      body:
        "Bir modelin ne kadar yanıldığını tek bir sayıyla ölçmek gerekir; buna <strong>kayıp</strong> denir. İlk sekmede model bir doğrudur, y = wx + b; kayıp da 24 noktadaki hataların karelerinin ortalamasıdır. Her (w, b) çiftine bir kayıp düşer: bu iki boyutlu bir arazidir ve sayfa onu eş yükselti eğrileriyle çizer. <strong>Gradyan</strong>, kaybın w'ye ve b'ye göre türevlerinden oluşan vektördür; en dik yokuş yukarı yönü gösterir. Gradyan inişi ters yöne, η çarpı gradyan kadar yürür. Varsayılan başlangıçta (w = −0,5 · b = 2,5) kayıp 4,6612'dir; iniş 0,2818'de durur. Sıfıra inmez, çünkü veri bir doğrunun çevresine gürültüyle serpilmiştir ve hiçbir doğru 24 noktanın hepsinden geçemez. Bu çanak biçimli yüzeyde en dip nokta kalemle de bulunur (normal denklem: w = 1,1844, b = 0,7687) ve iniş aynı sayılara varır. Yöntemin asıl değeri başka yerdedir: sinir ağlarında kapalı bir çözüm yoktur, ama türev her zaman hesaplanabilir; aynı yürüyüş orada da işler.",
      formula: "θ ← θ − η·∇L(θ);  L(w, b) = (1/n) Σ (w·x<sub>i</sub> + b − y<sub>i</sub>)²",
      formulaNote: "θ = (w, b) parametre vektörü, η öğrenme oranı, yani adım boyu. Tek değişkende ∇L sıradan türeve iner: x ← x − η·f′(x).",
    },
    {
      heading: "Adım sınırı: η neden 2/λ_max değerini aşamaz?",
      body:
        "Yüzeyin eğriliğini ikinci türevlerin matrisi, <strong>Hessian</strong> H taşır. Kayıp ikinci dereceden olduğu için gradyan tam olarak ∇L = H(θ − θ*) biçimindedir; θ* en dip noktadır. Bunu güncellemeye koy: θ<sub>k+1</sub> − θ* = (I − ηH)(θ<sub>k</sub> − θ*). Hata vektörü her adımda aynı matrisle çarpılır. H'nin özvektörleri yönünde bu çarpım tek bir sayıya iner: 1 − ηλ. Hatanın küçülmesi için her özdeğerde |1 − ηλ| &lt; 1 gerekir; en sıkı koşul en büyük özdeğerden gelir: η &lt; 2/λ<sub>max</sub>. Sayfanın verisinde λ<sub>max</sub> = 6,882 ve λ<sub>min</sub> = 0,886'dır; eşik 0,2906 çıkar ve sayfa aynı sayıyı inişi gerçekten koşturup η'yı ikiye bölerek ölçer. Hızı ise en yavaş yön belirler: ρ = max |1 − ηλ|; η = 0,1'de ρ = 0,9114. Gerilim buradadır: dik yön adımı sınırlar, yayvan yön sabır ister; ikisinin oranı (burada 7,8) büyüdükçe iniş yavaşlar. Sinir ağında yüzey çanak değildir, H noktadan noktaya değişir; aynı hesap orada ancak yerel olarak geçerlidir.",
      formula: "e<sub>k+1</sub> = (I − ηH)·e<sub>k</sub>  ⇒  |1 − ηλ<sub>i</sub>| &lt; 1  ⇒  η &lt; 2/λ<sub>max</sub>",
      formulaNote: "e<sub>k</sub> = θ<sub>k</sub> − θ*, optimuma uzaklık vektörü. Sayfadaki momentumlu güncellemede (v ← βv − η∇L, θ ← θ + v) her özyönde z² − (1 + β − ηλ)z + β = 0 denkleminin kökleri birim çemberin içinde kalmalıdır; bu, eşiği 2(1 + β)/λ<sub>max</sub> yapar: β = 0,9 için 0,5521.",
    },
    {
      heading: "Nöron ve gizli katman: bükmeden derinlik olmaz",
      body:
        "Yapay nöron girdilerini ağırlıklarıyla çarpıp toplar, bir <strong>eşik</strong> (b) ekler ve sonucu bükücü bir <strong>etkinleştirme fonksiyonundan</strong> (tanh, ReLU, sigmoid) geçirir. Gizli katmanı olmayan ağda yalnızca çıkış nöronu vardır; olasılığın 0,5 olduğu yer w·x + b = 0 doğrusudur. XOR verisinde iki sınıf çapraz köşelere yerleşmiştir ve hiçbir doğru onları ayıramaz: sayfada bu ağ %48,8 doğrulukta, ln 2 = 0,6931'in hemen yanında bir kayıpla kalır. Bükmeden katman eklemek de çare değildir, çünkü iki doğrusal katman tek bir doğrusal katmana eşittir: W₂(W₁x) = (W₂W₁)x. Araya tanh girince katmanlar birbirine indirgenemez. Dört gizli nöronlu ağın 2·4 + 4 + 4 + 1 = 17 parametresi vardır ve aynı veride 500 adımda eğitimde %100, testte %96 doğruluğa ulaşır. Cybenko'nun 1989'da sigmoid türü etkinleştirmeler için kanıtladığı gibi, tek gizli katmanlı bir ağ yeterince nöronla, kapalı ve sınırlı bir bölgedeki sürekli bir fonksiyona istenen yakınlıkta yaklaşabilir. Kanıt bunun mümkün olduğunu söyler; gradyan inişinin o ağırlıkları bulacağını söylemez.",
      formula: "a = f(Wx + b);  W₂(W₁x) = (W₂W₁)x",
      formulaNote: "f bükücü fonksiyondur. Sigmoidin türevi σ(1 − σ) en çok 0,25'tir; çok katmanlı sigmoid ağlarda gradyanın katman katman sönmesinin ve ReLU'nun yaygınlaşmasının bir nedeni budur.",
    },
    {
      heading: "Geri yayılım: zincir kuralı, işi yeniden kullanarak",
      body:
        "17 türevi en saf yolla da bulabilirsin: her parametreyi azıcık oynat, kaybın ne kadar değiştiğine bak. Bu, parametre başına iki ileri geçiş demektir; 17 parametrede katlanılır, milyarlarca parametrede imkânsızdır. <strong>Geri yayılım</strong> aynı türevlerin hepsini tek bir ileri ve tek bir geri geçişle verir. İleri geçişte her katmanın çıktısı saklanır. Geri geçiş çıktıdan başlar: çapraz entropi ile sigmoid birlikte türevlendiğinde hata payı yalın bir farktır, δ = (p − y)/N. Bir katmanın ağırlık türevi, o katmanın hata payı ile girişindeki etkinliğin çarpımıdır; bir önceki katmanın hata payı da aynı δ'nın ağırlıklarla geriye taşınıp etkinleştirmenin türeviyle çarpılmasıyla bulunur. Püf noktası budur: bir katman için hesaplanan δ, gerisindeki bütün ağırlıkların türevinde yeniden kullanılır; zincir kuralının ortak çarpanları yalnızca bir kez hesaplanır. Sayfa sonucu sınar: varsayılan ağda, eğitim başlamadan önce W1[1,1] için geri yayılım 0,022923 verir, kaybı iki yana 10⁻⁵ oynatan merkezî fark da 0,022923; bağıl fark 9,5 × 10⁻¹¹.",
      formula: "δ<sup>(l−1)</sup> = (W<sup>(l)T</sup>·δ<sup>(l)</sup>) ∘ f′;  ∂L/∂W<sup>(l)</sup> = δ<sup>(l)</sup>·a<sup>(l−1)T</sup>",
      formulaNote: "∘ bileşen bileşen çarpım, a<sup>(l−1)</sup> katmanın girişindeki etkinlik vektörüdür. Yöntemin kökü Linnainmaa (1970) ve Werbos'a (1974) uzanır; 1986 makalesi onu sinir ağlarının olağan aracı yaptı.",
    },
    {
      heading: "Softmax, çapraz entropi, dikkat: aynı fonksiyon üç işte",
      body:
        "Dil modeli metni <strong>token</strong> denen parçalara böler ve her adımda sözlükteki her aday için ham bir puan, yani <strong>logit</strong> üretir. <strong>Softmax</strong> puanları olasılığa çevirir; <strong>sıcaklık</strong> T puanları böler. Sayfadaki altı adayda 'güzel' T = 1'de 0,4402, T = 0,1'de 0,9933, T = 5'te 0,2185 olasılık alır; sıradaki sözcük bu dağılımdan atılan bir zardır. Eğitim aynı dağılımı cezalandırır: <strong>çapraz entropi</strong>, doğru adaya verilen olasılığın eksi logaritmasıdır. Doğru sözcük 'güzel' ise kayıp −ln 0,4402 = 0,8205 nat, 'mavi' ise 3,8205 nattır; logite göre türevi de yalın bir farktır, p − y. Üçüncü iş <strong>dikkat</strong>tir: her sözcüğün sorgu vektörü q, ötekilerin anahtarı k ile çarpılır ve softmax bu puanlardan ağırlık üretir. Bileşenleri bağımsız ve birim varyanslı vektörlerde q·k'nin saçılımı √d<sub>k</sub> ile büyür; sayfa d<sub>k</sub> = 64'te 8,095 ölçer, kuram 8 der. Beş anahtarlı bu deneyde puanlar bölünmezse softmax ağırlığın ortalama 0,899'unu tek anahtara verir ve türevi söner; √d<sub>k</sub>'ya bölününce bu pay 0,463'te kalır.",
      formula: "p<sub>i</sub> = e<sup>z<sub>i</sub>/T</sup> / Σ<sub>j</sub> e<sup>z<sub>j</sub>/T</sup>;  L = −ln p<sub>doğru</sub>;  Dikkat(Q, K, V) = softmax(QK<sup>T</sup>/√d<sub>k</sub>)·V",
      formulaNote: "∂L/∂z<sub>i</sub> = (p<sub>i</sub> − y<sub>i</sub>)/T; y<sub>i</sub> doğru aday için 1, ötekiler için 0'dır. d<sub>k</sub> anahtar vektörlerinin boyutudur. Sayfadaki logitler ve vektörler öğretim için seçilmiştir, gerçek bir modelden alınmamıştır.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmeli bir laboratuvardır ve her sekmede ölçülen değer, kuramın verdiği sayıyla aynı çizelgede durur. <strong>01 · Gradyan inişi</strong> sekmesinde 24 noktaya bir doğru oturtursun: <strong>Eğim w (başlangıç)</strong>, <strong>Kesişim b (başlangıç)</strong>, <strong>Öğrenme oranı η</strong>, <strong>Momentum β</strong>, <strong>Her adımda kullanılan veri</strong> ve <strong>Veri tohumu</strong> denetimleri, <strong>Çalıştır</strong>, <strong>Tek adım</strong>, <strong>Sona git</strong>, <strong>Başa al</strong> düğmeleri ve üç hazır ayar vardır; başlangıç noktasını kayıp yüzeyine tıklayarak da seçebilirsin. Formül kutusunun altındaki <strong>Bu verinin ortalamaları</strong> satırı ⟨x⟩, ⟨x²⟩, ⟨y⟩ ve ⟨xy⟩ değerlerini verir. Aynı sekmenin B bölümü iki çukurlu f(x) = x⁴ − 3x² + x eğrisidir: <strong>Başlangıç x₀</strong>, <strong>Öğrenme oranı η</strong> ve dört hazır ayar. <strong>02 · Sinir ağı</strong> sekmesinde <strong>Veri kümesi</strong> (iki öbek, XOR, iç içe halkalar, iki sarmal), <strong>Gizli katman sayısı</strong>, <strong>Gizli katman genişliği</strong>, <strong>Etkinleştirme fonksiyonu</strong>, <strong>Güncelleme kuralı</strong>, <strong>L2 düzenlileştirme λ</strong> ve <strong>Tohum (veri ve ilk ağırlıklar)</strong> ağı kurar; <strong>Eğit</strong>, <strong>Tek adım</strong>, <strong>500 adım</strong> ve <strong>Başa al</strong> onu yürütür. Bir ayarı değiştirmek eğitimi baştan başlatır. Alttaki <strong>Parametre</strong> kaydırıcısıyla herhangi bir ağırlığı seçip gradyan denetimini okuyabilir, değerini elle değiştirebilirsin. <strong>03 · Softmax, dikkat, dil modeli</strong> sekmesi üç bölümdür: altı adaylı softmax (<strong>Sıcaklık T</strong>, <strong>top-k</strong>, <strong>top-p</strong>, <strong>Örnek sayısı N</strong>), dört sözcüklü dikkat tablosu (<strong>1/√d_k ölçeğini uygula</strong> kutusu ve <strong>Boyut deneyi: d_k</strong>) ve harf ikililerini sayan bir dil modeli (<strong>Düzleştirme α</strong>, <strong>Üretim sıcaklığı T</strong>, <strong>Ayrılmış cümle</strong>). Bütün rastgelelik tohumludur: aynı ayar herkeste aynı sayıyı verir. Sayfa ondalık virgül kullanır, yüzdeyi %96 biçiminde, eksi sayıları − işaretiyle (w = −0,5) yazar; sıfıra yuvarlanacak kadar küçük olasılıkları 9,29 × 10⁻¹⁴ biçiminde gösterir. Boşluk tuşu ilk iki sekmede oynatır ya da duraklatır, R etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Adım ne kadar büyük olabilir?",
        predict: "Öğrenme oranı 0,1 iken iniş sorunsuz. η'yı 0,25'e çıkarırsan hedefe daha çabuk mu varırsın, daha geç mi? 0,3'te ne olur? Yakınsama ile ıraksama arasındaki sınır bu iki değerin arasındaysa, yerini verinin hangi özelliği belirler?",
        do: "01 · Gradyan inişi sekmesinde Sekmeyi sıfırla'ya bas ve durum satırındaki iki özdeğeri not et. Sona git'e basıp kuram–ölçüm çizelgesini oku. Sonra Salınım: η = 0,25 düğmesine bas, Çalıştır ile yolu izle. Son olarak Iraksama: η = 0,3 düğmesine ve Sona git'e bas.",
        observe: "Varsayılanda λ_max = 6,882, λ_min = 0,886. Eşik kuramda da ölçümde de 0,2906; daralma oranı ρ 0,9114 ↔ 0,9114; binde bire inmek için yaklaşık 75 adım. İniş w = 1,184 · b = 0,769'da durur, normal denklem 1,1844 ve 0,7687 der. η = 0,25'te yol vadinin iki yamacı arasında zikzak çizer ama ρ = 0,7785'e düşer, 28 adım yeter. η = 0,3'te ρ = 1,0647 olur; 3.000 adımın sonunda L = 5,76 × 10¹⁶³.",
        explain: "En dik yönde hata her adımda (1 − ηλ_max) ile çarpılır. η = 0,25'te bu çarpan −0,721'dir: işaret her adımda değişir, zikzak budur; büyüklük ise küçülür. η = 0,3'te çarpan −1,065 olur ve hata büyür. Sınır |1 − ηλ_max| = 1, yani η = 2/6,882 = 0,2906'dır. Hızı yayvan yön belirler: 1 − η·0,886 çarpanı η = 0,1'de 0,9114, η = 0,25'te 0,7785'tir. Sayfa eşiği formülden okumaz; inişi koşturup η'yı ikiye bölerek arar, iki sayı yine de örtüşür.",
      },
      {
        title: "Tek doğru XOR'a yetmez; peki türev doğru mu?",
        predict: "XOR verisinde iki sınıf, çapraz köşelere dağılmış dört öbektir. Gizli katmanı olmayan ağ bu veride en çok yüzde kaç doğruluk alabilir; sence o sınıra ulaşır mı? Dört gizli nöron eklenince 17 parametrenin türevini geri yayılım doğru hesaplıyor mu, bunu nasıl sınarsın?",
        do: "02 · Sinir ağı sekmesinde XOR, gizli katman yok düğmesine, ardından iki kez 500 adım'a bas. Gizli katman sayısı menüsünden 1 gizli katman seç (genişlik 4 nöron kalır) ve bir kez 500 adım'a bas. Parametre kaydırıcısını gezdirerek çizelgedeki gradyan denetimi satırlarını oku.",
        observe: "Gizli katmansız ağın 3 parametresi var. 1.000 adımda eğitim doğruluğu %48,8, kayıp 0,6888; çizelge bunu %75 üst sınırı ve ln 2 = 0,6931 ile yan yana koyar. Tek gizli katmanda 17 parametre: kayıp başta 0,7259, 500 adım sonra eğitimde 0,0146, testte 0,0926; doğruluk %100 ve %96. Gradyan denetiminin iki sütunu aynı sayıyı gösterir; 17 parametredeki en büyük bağıl fark 10⁻⁷'nin altındadır.",
        explain: "Tek doğru dört öbekten en çok üçünü doğru yana düşürür. Ağ o %75'e bile gitmez, çünkü kayıp doğruluğu değil olasılığı ölçer: bir öbeği kesin kaybetmek, hepsine 0,5 demekten pahalıdır; kayıp ln 2'de kalır. Minsky ile Papert'in 1969'da gösterdiği sınır budur; yalnızca tek katmanlı algılayıcılar içindir. tanh'lı gizli katman düzlemi büker. Gradyan denetimine gelince: geri yayılım bir yaklaşıklık değil, zincir kuralının kendisidir; 10⁻⁸ dolayındaki fark sonlu farkın kesme ve yuvarlama hatasıdır. Gizli katmansız ağda 1.000 adım sonra aynı satırlar 'Tanımsız' yazar: türevler sıfıra inmiştir.",
      },
      {
        title: "Ezber mi, öğrenme mi?",
        predict: "24 gürültülü noktayı 105 parametreli bir ağla eğitiyorsun. Eğitim doğruluğu %100'e vardığında test kaybı da en düşük değerinde midir? Ağırlıkların büyümesini cezalandıran L2 terimi eğitim başarısını düşürürse test başarısı da düşer mi?",
        do: "02 · Sinir ağı sekmesinde Aşırı öğrenme düğmesine bas (XOR, 24 nokta, gürültü 0,3, sekizer nöronlu iki gizli katman). Dört kez 500 adım'a bas; Kayıp grafiğinde düz ve kesikli çizgiyi karşılaştır, durum satırını oku. Sonra L2 düzenlileştirme λ kaydırıcısını 0,01'e getir ve yine dört kez 500 adım'a bas.",
        observe: "λ = 0 iken 2.000. adımda eğitim kaybı 5,46 × 10⁻⁵, eğitim doğruluğu %100; test kaybı 2,3887, test doğruluğu %72. Durum satırı test kaybının en düşük değerini 34. adımda (0,474) gördüğünü yazar. λ = 0,01 ile eğitim kaybı 0,1354'e, eğitim doğruluğu %91,7'ye geriler; test kaybı 0,4265'e iner, test doğruluğu %82'ye çıkar.",
        explain: "Parametre sayısı nokta sayısının dört katını aşıyor: ağ, gürültünün yerinden oynattığı noktaları bile tek tek kuşatacak kadar esnek. Eğitim kaybı sıfıra giderken karar yüzeyi o noktaların çevresinde kıvrılır ve yeni noktalarda kendinden emin biçimde yanılır. L2 terimi (λ/2)ΣW² büyük ağırlıkları pahalı kılar, yüzeyi yumuşatır. Fazlası da zarar: λ = 0,03'te ağırlıklar sıfıra çekilir, ağ her noktaya 0,5 der. Bu sayılar tek bir tohuma ve yalnızca 200 test noktasına aittir.",
      },
      {
        title: "Sıcaklık, zar ve şaşkınlık",
        predict: "Altı adaylı dağılımda en olası sözcük 'güzel'dir (p = 0,4402). Sıcaklık 0,1'e inince bu pay ne olur, 5'e çıkınca ne olur? Harf ikililerini sayan model, eğitim metninde geçmeyen bir cümlede daha mı çok şaşırır, ne kadar?",
        do: "03 · Softmax, dikkat, dil modeli sekmesinde Soğuk: T = 0,1 ve Sıcak: T = 5 düğmelerini dene; Sekmeyi sıfırla ile T = 1'e dön ve Örnek sayısı N menüsünü 100'den 100.000'e gez. Sonra C bölümüne in: şaşkınlık kartlarını oku, Ayrılmış cümle kutusuna önce kendi cümleni, sonra eğitim metninden bir cümleyi ('Deniz bugün sakin olmalı.') yaz.",
        observe: "T = 0,1'de p(güzel) = 0,9933, entropi 0,059 bit; T = 5'te 0,2185 ve 2,553 bit (üst sınır 2,585). T = 1, N = 1.000'de χ² 4,32 çıkar; beklenen 5 ± 3,16. Sıklıkların beklenen sapma ölçeği N = 100'de 0,0496, N = 100.000'de 0,0016'dır. Harf modeli eğitim metninde karakter başına 3,1634 bit (şaşkınlık 8,96), ayrılmış cümlede 3,6714 bit (12,74) verir; hiçbir şey bilmeyen modelin şaşkınlığı 31'dir. Eğitim metninden alınan 'Deniz bugün sakin olmalı.' cümlesinde değer 2,956 bite düşer ve durum satırı cümlenin metinde geçtiğini söyler.",
        explain: "Sıcaklık logitleri böler: küçük T farkları büyütüp dağılımı tek adaya çökertir, büyük T düzleştirir. Örnekleme bir zar atışıdır; sıklıklar olasılığa 1/√N hızıyla yaklaşır, bin kat örnek sapma ölçeğini yaklaşık otuz iki kat küçültür. Şaşkınlıktaki 8,96 → 12,74 farkı genelleme açığının minyatürüdür; modelin sayarken gördüğü cümlede ise şaşkınlık ortalamanın altına iner. Tek bir cümle küçük bir örneklemdir: fark cümleden cümleye değişir. Yine de bu model yalnızca son harfe bakan 31 × 31'lik bir sayım tablosudur; büyük dil modelleriyle ortak yanı ölçtüğü kayıp ve zar atışıdır, gerisi değil.",
      },
    ],
  },
  wow: [
    {
      title: "1958: 'kendi varlığının bilincinde olacak' makine",
      body:
        "8 Temmuz 1958'de New York Times, Rosenblatt'ın perceptron'u için Donanma'nın 'yürüyen, konuşan, gören, yazan, kendini çoğaltan ve varlığının bilincinde olan bir elektronik bilgisayarın embriyosu' beklediğini yazdı. Makinenin yaptığı iş, 400 fotoselden gelen 20×20'lik görüntüde iki sınıfı ayırmaktı; ağırlıkları motorların çevirdiği potansiyometrelerdi. Abartılı beklenti ile mütevazı makine arasındaki uçurum, on yıl sonraki hayal kırıklığını besledi. Benzer başlıkları bugün de okuyorsun; sayfadaki ağa bakıp ölçeği hatırla.",
    },
    {
      title: "İki oyuncu ekran kartı, bir alanın yönü",
      body:
        "2012 ImageNet yarışmasında Krizhevsky, Sutskever ve Hinton'ın ağı 60 milyon ağırlık taşıyordu ve iki NVIDIA GTX 580 oyun kartında beş altı gün eğitildi. İlk beş tahminde yüzde 15,3 hata yaptı; ikinci olan ekip yüzde 26,2'deydi. On puanı aşan bu fark, görüntü tanımada elle tasarlanan özelliklerin yerini birkaç yıl içinde öğrenilen özelliklere bıraktı. Oyun için tasarlanmış ekran kartları da yapay zekâ araştırmasının olağan donanımı oldu.",
    },
    {
      title: "Fizik Nobel'i bir bilgisayar bilimcisine",
      body:
        "2024 Nobel Fizik Ödülü, 'yapay sinir ağlarıyla makine öğrenmesini mümkün kılan temel keşif ve icatlar' için John Hopfield ile Geoffrey Hinton'a verildi; Hinton 1986'daki geri yayılım makalesinin yazarlarındandır. Aynı yıl Kimya Ödülü'nün yarısı Demis Hassabis ile John Jumper'a, protein yapısını amino asit diziliminden tahmin eden AlphaFold için gitti; AlphaFold veri tabanı 2022'de 200 milyonu aşkın protein yapısı tahmini yayımladı. Ağın eğitim verisi, biyologların onlarca yılda deneyle tek tek çözdüğü yapılardı; tahminler deneyin yerini tutmaz, ama ağırlıkları bu sayfadaki türev hilesinin devasa bir sürümüyle ayarlandı.",
    },
  ],
  worked: {
    title: "Eşiği kalemle bul: dört ortalamadan 0,2906'ya",
    prompt:
      "Sayfanın varsayılan verisinde (Veri tohumu 1, 24 nokta) ortalamalar şöyledir: ⟨x⟩ = 1,1661, ⟨x²⟩ = 2,8842, ⟨y⟩ = 2,1498, ⟨xy⟩ = 4,3124. Sayfa bu dört sayıyı ilk sekmede, formül kutusunun altındaki 'Bu verinin ortalamaları' satırında gösterir. Başlangıç w = −0,5, b = 2,5 ve η = 0,1. (a) İlk adımı elle at. (b) Kararlılık eşiğini ve uzaklığın binde bire inmesi için gereken adım sayısını bul. (c) İnişin varacağı noktayı hesapla. x ve y birimsiz öğretim verisidir; bütün nicelikler birimsizdir.",
    steps: [
      "Gradyan: L = ⟨(wx + b − y)²⟩ olduğundan ∂L/∂w = 2(w⟨x²⟩ + b⟨x⟩ − ⟨xy⟩) = 2(−1,4421 + 2,9152 − 4,3124) = −5,679 ve ∂L/∂b = 2(w⟨x⟩ + b − ⟨y⟩) = 2(−0,5831 + 2,5 − 2,1498) = −0,466. İkisi de eksi: w de b de artırılırsa kayıp azalır; w yönü on iki kat daha diktir.",
      "İlk adım: w₁ = −0,5 − 0,1·(−5,679) = 0,068 ve b₁ = 2,5 − 0,1·(−0,466) = 2,547. Sayfada Sekmeyi sıfırla'dan sonra Tek adım'a basınca 'w = 0,068 · b = 2,547' yazar; kayıp 4,6612'den 2,4088'e iner.",
      "Hessian: ikinci türevler sabittir, H = 2·[[⟨x²⟩, ⟨x⟩], [⟨x⟩, 1]] = [[5,768; 2,332], [2,332; 2]]. İzin yarısı 3,884, determinant 5,768·2 − 2,332² = 6,098. Özdeğerler λ = 3,884 ± √(3,884² − 6,098) = 3,884 ± 2,998; yani λ_max = 6,882 ve λ_min = 0,886. Durum satırındaki sayılar bunlardır.",
      "Eşik: hata her özyönde (1 − ηλ) ile çarpılır; |1 − ηλ_max| &lt; 1 koşulu η &lt; 2/6,882 = 0,2906 verir. η = 0,1'de çarpanlar 1 − 0,688 = 0,312 ve 1 − 0,0886 = 0,9114'tür; yavaş olan ikincisidir, ρ = 0,9114.",
      "Adım sayısı: ρ<sup>k</sup> = 10⁻³ için k = ln 1000 / (−ln 0,9114) = 6,908 / 0,0928 = 74,5; yani yaklaşık 75 adım (durum satırındaki sayı). η = 0,25'te çarpanlar −0,721 ve 0,7785 olur; k = 6,908 / 0,2504 = 27,6, yani 28 adım. η = 0,3'te ilk çarpan −1,065'tir: hata her adımda büyür.",
      "Varış noktası: gradyanı sıfırlayan çift normal denklemin çözümüdür. w* = (⟨xy⟩ − ⟨x⟩⟨y⟩) / (⟨x²⟩ − ⟨x⟩²) = (4,3124 − 2,5069) / (2,8842 − 1,3598) = 1,8055 / 1,5244 = 1,1844 ve b* = ⟨y⟩ − w*⟨x⟩ = 2,1498 − 1,3811 = 0,7687. Çizelgenin 'normal denklem ↔ 3.000 adımlık iniş' satırlarında iki sütun da bu sayıları gösterir.",
    ],
    result:
      "İlk adım (0,068; 2,547); kararlılık eşiği η = 0,2906; binde bire inmek için η = 0,1'de 75, η = 0,25'te 28 adım; varış noktası w = 1,1844, b = 0,7687. Sayfada Tek adım düğmesi, durum satırı ve kuram–ölçüm çizelgesi bu sonuçların her birini ayrı ayrı doğrular. Dört ortalama, 2 × 2'lik bir matris ve bir karekök: bütün inişin kaderi bu kadarının içindedir.",
  },
  misconceptions: [
    {
      myth: "Dil modeli akıcı ve emin yazıyorsa söylediği doğrudur.",
      truth:
        "Model, eğitim metinlerine göre olası olan sonraki token'ı seçer; 'olası' ile 'doğru' aynı şey değildir. Uydurma bir kaynak adı ya da yanlış bir tarih, gerçeklerle aynı akıcılıkta gelir. Softmax bölümünde gördüğün zar atışı her sözcükte yinelenir: aynı soruya iki ayrı cevap almanın nedeni budur. Önemli bir bilgiyi bağımsız bir kaynakla doğrulamadan kullanma.",
    },
    {
      myth: "Eğitim verisinde %100 doğruluk, iyi bir model demektir.",
      truth:
        "Yeterince esnek bir ağ eğitim örneklerini ezberleyebilir. Sayfanın Aşırı öğrenme ayarında 105 parametreli ağ 24 eğitim noktasının hepsini bilir, ama hiç görmediği 200 noktada doğruluğu %72'dir ve test kaybı 2,3887'ye tırmanır. Ölçüt, eğitimde kullanılmamış ayrı bir test kümesidir. Doğruluğun kendisi de yanıltabilir: sınıflar dengesizse 'herkese hayır de' kuralı bile yüksek doğruluk alır.",
    },
    {
      myth: "Gradyan inişi yeterince adım atarsa en iyi çözümü mutlaka bulur.",
      truth:
        "İniş yalnızca bulunduğu yerin eğimini görür. İlk sekmenin B bölümünde x₀ = 0,15 düğmesi inişi derin çukura (f = −3,5139), x₀ = 0,2 düğmesi sığ çukura (f = −1,0702) götürür; ikisini ayıran tepe 0,16994'tedir. Ağda da böyledir: XOR için 2 gizli nöron ilke olarak yeter, ama tohum 1'de ağ 1.000 adım sonra %73,8'de kalır, veriyi ve ilk ağırlıkları değiştiren tohum 2'de %97,5'e çıkar. Bu yüzden tek bir koşudan sonuç okunmaz; deney birkaç tohumla yinelenir.",
    },
    {
      myth: "Sayfadaki harf modeli, büyük dil modellerinin küçültülmüş bir kopyasıdır.",
      truth:
        "Ortak olan yalnızca görev ve ölçüdür: sıradaki simgeyi tahmin et, çapraz entropiyle puanla, dağılımdan örnekle. Gerisi başkadır. Harf modeli tek bir önceki harfe bakar; Transformer binlerce token'lık bağlama dikkatle bakar. Biri 31 × 31 = 961 hücrelik bir sayım tablosudur ve 1.030 karakter sayılarak doldurulur; öteki dikkat katmanlarından oluşan derin bir ağdır ve çok büyük metinlerde gradyan inişiyle eğitilir. Harf modelinin ürettiği yazı bu yüzden Türkçeyi andıran hecelerden öteye geçmez; kısa sözcükler rastlantıyla çıkar, cümle çıkmaz.",
    },
  ],
  glossary: [
    { term: "Parametre (ağırlık ve eşik)", definition: "Eğitim sırasında ayarlanan sayılar: bağlantıların çarpanları (W) ve nöronların sabit kaydırmaları (b); sayfadaki varsayılan ağda 17 tanedir." },
    { term: "Kayıp fonksiyonu", definition: "Tahmin ile hedef arasındaki uyumsuzluğu tek bir sayıya indiren ölçü; eğitim bu sayıyı küçültmeye çalışır." },
    { term: "Gradyan", definition: "Kaybın her parametreye göre türevlerinden oluşan vektör; en dik artış yönünü gösterir, öğrenme ters yönde yürür." },
    { term: "Öğrenme oranı (η)", definition: "Gradyan inişinde adım boyu; ikinci dereceden bir kayıpta 2/λ_max eşiğini aşarsa iniş ıraksar, çok küçükse sürünür." },
    { term: "Geri yayılım", definition: "Çıktıdaki hata payını zincir kuralıyla katman katman geriye taşıyarak bütün türevleri tek bir geri geçişte hesaplayan yöntem." },
    { term: "Logit ve softmax", definition: "Logit, modelin bir adaya verdiği ham puandır; softmax bu puanları üstelini alıp toplama bölerek toplamı 1 olan olasılıklara çevirir." },
    { term: "Şaşkınlık (perplexity)", definition: "2 üzeri bit cinsinden çapraz entropi: modelin her adımda kaç eşit olasılıklı seçenek arasında kalmış gibi davrandığı." },
    { term: "Aşırı öğrenme", definition: "Modelin eğitim verisinin ayrıntısını ve gürültüsünü ezberleyip yeni veride başarısız olması; ayrı bir test kümesiyle yakalanır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bu konu bir sözcük dağarcığıdır; üniversitede dört dersin kesişimine dönüşür. <strong>Lineer cebir</strong>: bir katman aslında matris çarpımıdır, a = f(Wx + b); bu sayfadaki adım sınırı da bir matrisin en büyük özdeğerinden okunur. GPT-3'ün (2020) 175 milyar parametresi bu matrislerin elemanlarıdır ve ekran kartları bu çarpımları paralel yaptığı için eğitimin olağan donanımıdır. <strong>Çok değişkenli kalkülüs</strong>: gradyan, Hessian, zincir kuralı ve geri yayılım; otomatik türev kütüphaneleri bu dersin algoritmaya dökülmüş hâlidir. <strong>Olasılık</strong>: softmax bir olasılık dağılımıdır, çapraz entropi kaybı doğru token'a verilen olasılığın eksi logaritmasıdır ve eğitim, en çok olabilirlik kestiriminin ta kendisidir. <strong>Optimizasyon</strong>: gradyan inişi en basit yöntemdir; momentum, Adam ve öğrenme oranı takvimleri aynı vadiye daha akıllıca iner. Sayfada farkı görebilirsin: varsayılan XOR ağı Adam ile 1.000 adımda 0,0056 kayba inerken, aynı η ile düz gradyan inişi 0,6516'da kalır.",
      "Sonra büyük sorular gelir. Neden milyarlarca parametreli bir model ezberlemek yerine genelleştiriyor; klasik istatistik bunu beklemezdi. Model büyüdükçe kayıp, ölçümlerde neden düzgün bir kuvvet yasasına yakın düşüyor ve veri ile parametre arasındaki en verimli oran nedir? Bir modelin davranışını insan tercihlerine nasıl hizalarsın ve bunu nasıl ölçersin? Bu soruların bir kısmı 2020'lerde açıldı, bir kısmı hâlâ açık. Makine öğrenmesi lisans programlarında genellikle ikinci ya da üçüncü sınıfta başlar; ama türev, matris ve olasılığı sağlam öğrenen biri, oraya vardığında yeni hiçbir şey görmez, yalnızca eski araçların yeni bir birleşimini.",
    ],
    topics: ["Matris çarpımı ve katmanlar", "Hessian, özdeğerler ve koşul sayısı", "Zincir kuralı ve otomatik türev", "Çapraz entropi ve en çok olabilirlik", "Stokastik gradyan inişi ve Adam", "Düzenlileştirme ve genelleme", "Öz-dikkat ve Transformer", "Ölçekleme yasaları"],
  },
  quiz: [
    {
      question: "Sayfanın verisinde λ_max = 6,882 ve kararlılık eşiği 0,2906'dır. Girdiler yeniden ölçeklenip kayıp yüzeyinin en dik yöndeki eğriliği iki katına çıksaydı (λ_max = 13,764), tam yığınlı ve momentumsuz inişin eşiği ne olurdu?",
      options: ["0,5812; daha dik yüzeyde daha büyük adım atılır", "0,1453; eşik λ_max ile ters orantılıdır", "0,2906; eşik veriye bağlı değildir", "0,2055; eşik λ_max'ın kareköküyle ters orantılıdır"],
      answer: 1,
      explanation: "En dik yönde hata her adımda (1 − ηλ_max) ile çarpılır; |1 − ηλ_max| &lt; 1 koşulu η &lt; 2/λ_max verir. λ_max iki katına çıkınca eşik yarıya iner: 2/13,764 = 0,1453. Vadi dikleştikçe aynı adım karşı yamaçta daha yükseğe çıkar. Girdileri benzer ölçeklere getirmenin eğitimi kolaylaştırmasının nedeni de budur: dik ve yayvan yönler arasındaki oran küçülür.",
    },
    {
      question: "Aşırı öğrenme ayarında 2.000 adım sonra test doğruluğu %72, test kaybı 2,3887'dir. Her noktaya 0,5 diyen bir model %50 doğrulukla yalnızca ln 2 = 0,6931 kayıp alırdı. Daha çok doğru bilen ağın kaybı nasıl daha büyük olabilir?",
      options: ["Olamaz; sayfada bir hesap hatası vardır", "Test kümesi dengesiz olduğu için", "Çapraz entropi −ln p'dir: kendinden emin yapılan az sayıda yanlış, kaybı çok büyütür", "Kayıp eğitim, doğruluk test verisinden hesaplandığı için"],
      answer: 2,
      explanation: "Doğruluk yalnızca p'nin 0,5'in hangi yanında olduğuna bakar; kayıp doğru sınıfa verilen olasılığın eksi logaritmasıdır. Doğru sınıfa 10⁻⁴ olasılık veren tek bir tahmin −ln 10⁻⁴ = 9,2 nat ceza alır; kararsız bir 0,5 tahmini ise yalnızca 0,69. Ezberleyen ağ, eğitim noktalarının çevresinde keskinleşen yüzeyi yüzünden yanıldığı test noktalarında neredeyse kesin konuşur. Test sınıfları dengelidir.",
    },
    {
      question: "Sorgu ve anahtar vektörlerinin bileşenleri bağımsız, ortalaması 0, varyansı 1 olsun. Boyut d_k 64'ten 256'ya çıkınca q·k iç çarpımının standart sapması yaklaşık ne olur?",
      options: ["Değişmez, 8 kalır", "16 olur; iki katına çıkar", "32 olur; dört katına çıkar", "4 olur; yarıya iner"],
      answer: 1,
      explanation: "q·k, d_k tane bağımsız çarpımın toplamıdır; her birinin varyansı 1 olduğundan varyanslar toplanır: Var(q·k) = d_k, standart sapma √d_k. Boyut dört katına çıkınca saçılım iki katına çıkar: √64 = 8, √256 = 16. Sayfanın boyut deneyi 8,095 ve 15,97 ölçer. Puanları √d_k'ya bölmek saçılımı her boyutta 1'de tutar; bölünmezse softmax tek bir anahtara kilitlenir.",
    },
  ],
  next: [
    { href: "turev.html", title: "Türev: Kesenden Teğete (Limit Laboratuvarı)", why: "Gradyan denetimindeki merkezî farkın kaynağı: fark bölümünün h küçülürken eğime yaklaşmasını, h fazla küçülünce bilgisayarın yanılmasını izle." },
    { href: "cok-degiskenli-kalkulus.html", title: "Çok Değişkenli Kalkülüs", why: "Kısmi türevi, gradyanı ve zincir kuralını seviye haritası üzerinde gör; buradaki kayıp yüzeyinin ve eş yükselti eğrilerinin matematiği orada." },
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler", why: "Adım sınırını belirleyen λ_max bir özdeğerdir: özvektörü, özdeğeri ve tekrarlanan bir dönüşümde en büyük özdeğerin neden baskın çıktığını 2×2 tezgâhta gör." },
    { href: "normal-dagilim.html", title: "Normal Dağılım ve Merkezi Limit Teoremi", why: "Örnekleme deneyindeki 1/√N kuralının evi: standart hata, 'dört kat ölçüm, iki kat kesinlik' ve ölçümün kuramdan kaç standart hata uzakta olduğu sorusu." },
  ],
  sources: [
    { title: "Vaswani ve diğerleri (2017) · Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", note: "Transformer'ın doğduğu makale; sayfadaki ölçekli iç çarpım dikkati formülünün, softmax(QKᵀ/√d_k)·V, kaynağı. Özeti ve ilk şekli lise bilgisiyle okunabilir." },
    { title: "3Blue1Brown · Neural networks", url: "https://www.3blue1brown.com/topics/neural-networks", note: "Ağırlıkları, gradyan inişini ve geri yayılımı animasyonla anlatan video dizisi; Transformer ve dikkat bölümleri de var (İngilizce)." },
    { title: "MIT OpenCourseWare · 6.036 Introduction to Machine Learning (Fall 2020)", url: "https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/", note: "Denetimli öğrenmeden sinir ağlarına ve pekiştirmeli öğrenmeye uzanan bir lisans dersi (İngilizce)." },
    { title: "Nobel Prize · 2024 Fizik Ödülü özeti", url: "https://www.nobelprize.org/prizes/physics/2024/summary/", note: "Hopfield ve Hinton: yapay sinir ağlarıyla makine öğrenmesinin temelleri; resmi gerekçe ve popüler açıklama (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
