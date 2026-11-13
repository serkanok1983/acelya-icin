window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["psikometri-ve-olcme"] = {
  slug: "psikometri-ve-olcme",
  title: "Psikometri: Görülmeyeni Ölçmenin Kuramı",
  field: "Zihin ve Davranış",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir yeteneği cetvelle ölçemezsin; psikometri onu yanıtların arasındaki ilişkilerden çıkarır. Güvenirlik, geçerlik, faktörler, madde tepki kuramı ve normlar: hepsi benzetilmiş verilerle, elinin altında.",
  hook:
    "1904'te Charles Spearman bir okuldaki 22 öğrencinin Klasikler, Fransızca, İngilizce ve Matematik derecelerini, ses ayırt etme ve müzik ölçümleriyle karşılaştırdı: bütün korelasyonlar pozitifti. Aynı tablo bu sayfada açılıyor; tek faktörlü bir model ondan, Wikipedia'da yayımlanan altı g yükünü üç basamağına kadar yeniden çıkarıyor. Ama o altı sayı neyin ölçüsü?",
  bigIdea:
    "Psikolojik bir puan tek başına bir gerçek değil, bir <strong>modelin</strong> çıktısıdır: güvenirlik puanın ne kadarının hatadan arınmış olduğunu, geçerlik o puanla yapılan yorumun ne kadar savunulabildiğini söyler; ikisi de bir kez ölçülüp biten sayılar değil, kanıtla kestirilen ve tartışılan niceliklerdir.",
  story: [
    "Charles Spearman 1904'te <em>American Journal of Psychology</em>'de \"General Intelligence, Objectively Determined and Measured\" başlıklı uzun bir makale yayımladı. Verilerinden biri bir hazırlık okulundan geliyordu: 33 erkek öğrenciden müzik dersi alan 22'si. Spearman yalnız korelasyon hesaplamadı; her ölçümün kendi hatası olduğunu fark etti ve korelasyonları bu hataya göre ayrıca düzeltti. Sayfadaki tablo onun ham, düzeltilmemiş değerleridir: metinde verdiği ortalamalar (Klasikler 0,77, Fransızca 0,72, İngilizce 0,70, Matematik 0,67) tabloyla birebir uyuşur. Bugün <strong>zayıflama düzeltmesi</strong> denen bu adım, klasik test kuramının ilk adımlarından sayılır. Vardığı sonuç, kendi çevirimizle, zihinsel etkinliğin bütün dallarının \"tek bir temel işlevi ortak taşıdığıydı\". 1910'da Spearman ve William Brown, <em>British Journal of Psychology</em>'nin aynı cildinde art arda iki makaleyle, bir testi uzatınca güvenirliğin nasıl değiştiğini veren formülü birbirinden bağımsız yayımladılar; Wikipedia iki yazarın rekabet içinde olduğunu not eder.",
    "Sonraki yarım yüzyıl bu fikirleri bir kurama dönüştürdü. Lee Cronbach 1951'de <em>Psychometrika</em>'da α katsayısını tanıttı; makale çok atıf aldı, Cronbach bunu kendi çevirimizle \"sıradan bir katsayıya bir marka adı koyduğum için\" diye açıkladı. Melvin Novick klasik test kuramını 1966'da derli toplu biçime soktu, Lord ve Novick'in 1968 kitabı temel kaynak oldu. Geçerlik tarafında Cronbach ve Paul Meehl 1955'te <em>Psychological Bulletin</em>'de yapı geçerliğini tanımladı: bir yapının anlamı, onu gözlenebilirlere bağlayan yasalar ağında, <strong>nomolojik ağda</strong> aranır. Donald Campbell ve Donald Fiske 1959'da aynı dergide çok özellik–çok yöntem matrisini önerdi. Samuel Messick 1989'da geçerliği altı yönü olan tek bir kavram olarak ele aldı; yapı geçerliğinin nasıl görülmesi gerektiği bugün de tartışılır.",
    "Klasik kuramın bir zaafı vardı: aynı ölçme hatasını herkese yükler ve kişinin puanı ile testin özelliklerini birbirinden ayıramaz. Danimarkalı matematikçi Georg Rasch'ın 1960 kitabı, ETS'den Frederic Lord'un çalışmaları ve sosyolog Paul Lazarsfeld'in koşut araştırmaları <strong>madde tepki kuramını</strong> doğurdu: doğru yanıt olasılığı, kişinin düzeyi ile maddenin güçlüğünün bir fonksiyonudur. Kuram ancak 1970'lerin sonu ve 1980'lerde, kişisel bilgisayarlar hesabı kolaylaştırınca yaygınlaştı; bilgisayarla uyarlamalı testler 1970'lerden beri vardır.",
    "Ölçmenin tarihi yalnız başarılardan oluşmaz. Lewis Terman, Binet'nin testinin uygulanışını standartlaştırıp 1916'da Stanford–Binet ölçeğini çıkardı; David Wechsler 1939'da kendi ölçeğini yayımladı. OpenStax'in hatırlattığı gibi zekâ testleri öjeni hareketini desteklemek için de kullanıldı ve ABD'de Buck v. Bell kararından sonra yaklaşık 65 000 kişi zorla kısırlaştırıldı. Normların da bir son kullanma tarihi olduğu sonradan anlaşıldı: Hollandalı askerlik adaylarının puanları 1952–1982 arasında 21 puan, on yılda yaklaşık 7 puan artmıştı. Bu yüzden psikometrinin bugünkü dili ihtiyatlıdır: bir puan, bir grup ve bir zaman karşısında yorumlanır.",
  ],
  core: [
    {
      heading: "X = T + E: gözlenen, gerçek ve hata",
      body:
        "Klasik test kuramına göre gözlenen puan X, görülmeyen bir <strong>gerçek puan</strong> T ile bir hata E'nin toplamıdır. Gerçek puan, aynı testin sonsuz kez bağımsız uygulanmasındaki ortalamadır; hiçbir araştırmacı onu görmez. <strong>Güvenirlik</strong>, gözlenen varyansın gerçek puandan gelen payıdır; karekökü T ile X arasındaki korelasyondur. Sayfanın benzetiminde her madde λ·T + hata olarak üretilir: λ = 0,6 ve hata ss'si 1 ile tek bir maddenin güvenirliği 0,36/1,36 = 0,265'tir, on maddenin toplamınınki 0,783. Bilgisayar T'yi bildiği için Güvenirlik sekmesi gerçek bir araştırmada hiç göremeyeceğin bir şeyi gösterir: kestirimleri gerçeğin yanına koyar.",
      formula: "ρ<sub>XX′</sub> = σ²<sub>T</sub> / σ²<sub>X</sub> = σ²<sub>T</sub> / (σ²<sub>T</sub> + σ²<sub>E</sub>)",
      formulaNote: "Hatalar birbiriyle ve gerçek puanla ilişkisiz varsayılır; bu varsayım bozulursa formül de yanılır.",
    },
    {
      heading: "Alfa neyi söyler, neyi söylemez?",
      body:
        "Güvenirlik doğrudan ölçülemediği için kestirilir: test–tekrar test, paralel formlar, yarıya bölme ya da iç tutarlılık. En yaygın iç tutarlılık katsayısı Cronbach'ın α'sıdır; maddelerin varyanslarını toplamın varyansıyla karşılaştırır. Novick ve Lewis 1967'de α'nın güvenirliğe ancak maddeler özünde <strong>tau-eşdeğer</strong> (eşit yüklü) olduğunda eşit olduğunu gösterdi; yükler farklıysa α güvenirliği olduğundan düşük verir. Yükleri ayrı ayrı kestiren <strong>konjenerik güvenirlik</strong> (McDonald'ın ω'sı) bu farkı kapatır. Yüksek bir α maddelerin tek bir şeyi ölçtüğünü kanıtlamaz: tek boyutluluk α'nın ön koşuludur, sonucu değil; madde sayısı arttıkça α iki boyutlu bir testte bile yükselir. ,8 ya da ,9 gibi eşikler gelenektir, kural değil.",
      formula: "α = k/(k − 1)·(1 − Σσ²<sub>j</sub> / σ²<sub>X</sub>) · ω = (Σλ<sub>j</sub>)² / ((Σλ<sub>j</sub>)² + Σσ²<sub>E,j</sub>)",
      formulaNote: "k madde sayısı, σ²<sub>j</sub> madde varyansları, σ²<sub>X</sub> toplam puanın varyansı, λ<sub>j</sub> madde yükleri.",
    },
    {
      heading: "Uzatmak, bant çizmek, düzeltmek",
      body:
        "Güvenirlik üç pratik soruyu yanıtlar. Test n katına uzatılırsa ne olur? <strong>Spearman–Brown</strong> formülü, eklenen maddeler eskilerle paralelse yeni güvenirliği verir. Bir kişinin puanı ne kadar oynar? <strong>Standart ölçme hatası</strong> SÖH = s·√(1 − ρ); %95 bant yaklaşık X ± 1,96·SÖH'tür. Klasik kuram bu hatayı her puan düzeyinde aynı sayar; bu gerçekçi bulunmaz, uç puanlarda hata genellikle büyüktür. İki ölçümün korelasyonu, hatalar yüzünden gerçek ilişkiden küçük çıkar (<strong>zayıflama</strong>); Spearman'ın düzeltmesi bunu geri alır ama yalnız hatalar ilişkisizse ve güvenirlikler doğru biliniyorsa. Sayfada ρ = 0,6, güvenirlikler 0,7 ve 0,8 iken beklenen gözlenen r = 0,6·√0,56 = 0,449'dur.",
      formula: "ρ* = nρ / (1 + (n − 1)ρ) · r<sub>düz</sub> = r<sub>xy</sub> / √(r<sub>xx</sub>·r<sub>yy</sub>)",
      formulaNote: "Tersinden, hedef ρ* için gereken uzatma n = ρ*(1 − ρ) / (ρ(1 − ρ*)).",
    },
    {
      heading: "Geçerlik: bir sayı değil, bir savunma",
      body:
        "Güvenilir bir puan yanlış şeyi tutarlı biçimde ölçebilir. 1954 Teknik Önerileri dört tür geçerlik sayıyordu: yordama, eş zamanlı, kapsam ve yapı. Cronbach ve Meehl'e göre görülmeyen bir özellik için tek bir ölçüt yoktur; puanın kuramın öngördüğü gibi davranıp davranmadığına bakılır ve geçerlik hiçbir zaman kesin kanıtlanmaz. Campbell ve Fiske'nin matrisinde aynı özelliğin farklı yöntemlerle ölçümleri yüksek korelasyon vermeli (<strong>yakınsak</strong>), farklı özelliklerinki düşük kalmalıdır (<strong>ayırt edici</strong>); aynı yöntemi paylaşan iki puan yalnız bu yüzden de ilişkili çıkabilir (<strong>yöntem varyansı</strong>). Messick'in birleşik görüşü, puanın yanlış yorumlanmasının doğuracağı riskleri de geçerliğe kattı; yapı geçerliğinin nasıl tanımlanması gerektiği ise hâlâ tartışılır (ör. Borsboom ve arkadaşları 2004). Sayfa taraf tutmaz.",
      formula: "aynı özellik–farklı yöntem: τ · farklı özellik–aynı yöntem: τφ + μ · farklı–farklı: τφ",
      formulaNote: "Sayfanın öğretim modeli: τ özellik, μ yöntem varyansı payı, φ özellikler arası ilişki (özellik çiftine göre φ, 0,6φ ya da 0,3φ; ortalaması φₒ). μ, τ(1 − φₒ)'ya ulaşınca aynı yöntemli farklı özellikler ortalamada geçerlik köşegeni kadar ilişkili çıkar.",
    },
    {
      heading: "Maddeden düzeye: madde tepki kuramı",
      body:
        "Madde tepki kuramı (MTK) testin toplamını değil tek tek maddeleri modeller. İki parametreli modelde doğru yanıt olasılığı, kişinin gizil düzeyi θ ile maddenin güçlüğü b ve ayırt ediciliği a'nın lojistik bir fonksiyonudur; üç parametreli model tahminle doğru yanıt için bir taban c ekler. Her maddenin bir <strong>bilgi fonksiyonu</strong> vardır: 2PL'de a²·P·Q, en büyük değerini θ = b'de alır. Yerel bağımsızlık sayesinde madde bilgileri toplanır ve ölçme hatası 1/√I olur; yani klasik kuramın tek SÖH'ü yerine düzeye göre değişen bir hata. Uyarlamalı test bundan yararlanır: her yanıttan sonra kestirimi yeniler ve o düzeyde en çok bilgi veren maddeyi sorar. Bedeli: maddeler önceden büyük örneklemlerde denenmeli, sık seçilen maddeler yayılabilir.",
      formula: "P(θ) = c + (1 − c) / (1 + e<sup>−a(θ − b)</sup>) · I(θ) = a²PQ (c = 0) · hata(θ) = 1/√I(θ)",
      formulaNote: "Q = 1 − P. a = 1,8 olan bir madde θ = b'de 1,8²/4 = 0,81 bilgi verir; sayfada madde 2 için θ = 0,5 seçince 0,810 okunur.",
    },
  ],
  lab: {
    intro:
      "Sayfa seni ölçmez: hiçbir soru sormaz, yanıt toplamaz. Bütün katılımcılar, maddeler ve norm grupları <strong>benzetilmiş (sentetik)</strong> verilerdir; tek gerçek veri Spearman'ın 1904 korelasyon tablosudur. Beş sekme var: <strong>Güvenirlik</strong>, <strong>Geçerlik</strong>, <strong>Faktör analizi</strong>, <strong>Madde tepki kuramı</strong>, <strong>Normlar</strong>. Benzetimler tohumludur: aynı <strong>Tohum</strong> aynı katılımcıları verir, bu yüzden aşağıdaki sayılar tohum 1'de birebir tekrarlanır. Okumalar çoğu yerde \"örneklem · kuram\" çifti olarak yazılır; aradaki fark örnekleme hatasıdır. R tuşu etkin sekmeyi varsayılana döndürür. Kendinle ilgili bir kaygın varsa bir sağlık profesyoneline başvur; acil bir durumda 112'yi ara.",
    experiments: [
      {
        title: "Alfa yüksek, ama test tek bir şey mi ölçüyor?",
        predict: "Maddelerin yarısı bir özelliği, yarısı başka bir özelliği ölçse α çöker mi? Yükler farklı olsa α güvenirliği doğru verir mi?",
        do: "Güvenirlik sekmesinde önce varsayılanı oku. Sonra <strong>Maddelerin yapısı</strong> menüsünden \"İki boyutlu\"yu, ardından \"Farklı yükler (konjenerik)\"i seç.",
        observe: "Varsayılanda α 0,787 · 0,783, tek–çift yarı 0,628 → 0,772. İki boyutluda α hâlâ 0,647 · 0,659 ama yarı korelasyonu 0,187'ye, Spearman–Brown 0,315'e düşer; kuramsal ω \"—\" olur, çünkü tek faktörlü model artık yanlıştır. Farklı yüklerde kuramsal α 0,770, kuramsal güvenirlik 0,783; ω 0,787 · 0,783.",
        explain: "α tek boyutluluğun kanıtı değildir: iki zayıf ilişkili özellik (0,3) bile \"orta\" bir α verir. Tek–çift bölme yarılardan birini A'ya, öbürünü B'ye verdiği için yapıyı ele verir. Tau-eşdeğerlik yoksa α güvenirliğin altında kalır; yükleri ayrı kestiren ω farkı kapatır.",
      },
      {
        title: "Güvenilir ama geçerli değil: yöntem baskın",
        predict: "Ölçümlerin güvenirliği 0,70 iken aynı özelliği farklı yöntemlerle ölçen puanlar ne kadar ilişkili çıkar? Seçilmiş bir grupta test–ölçüt korelasyonu ne olur?",
        do: "Geçerlik sekmesinde \"İyi ölçme\", sonra \"Yöntem baskın\" düğmesine bas ve dört ölçütü oku. Ardından <strong>Varsayılana dön</strong> ve seçim benzetiminde <strong>Seçilenlerin payı</strong>nı 0,30'dan 0,10'a indir.",
        observe: "İyi ölçmede geçerlik köşegeni 0,610 · 0,600; ilk üç ölçüt sağlanır. Yöntem baskında (τ 0,25, μ 0,45) köşegen 0,248 · 0,250'ye düşer, farklı özellik–aynı yöntem 0,517 · 0,497'ye çıkar; 3. ölçüt 0 / 36. Seçimde r bütün 500 kişide 0,465, en iyi %30'da 0,235, en iyi %10'da 0,192.",
        explain: "Güvenirlik köşegeni τ + μ = 0,70 iken özellik payı yalnız 0,25: ölçümler özellikten çok yöntemi yakalar. Güvenirlik geçerliğin üst sınırını koyar ama onu sağlamaz. Seçilmiş grupta puan yayılımı daralır ve korelasyon küçülür; bu bir istatistik olgusudur, testin kusuru değil.",
      },
      {
        title: "Spearman'ın tablosu ve g'nin yorumu",
        predict: "Tek faktörlü bir model Spearman'ın 15 korelasyonunu ne kadar iyi açıklar? İki ilişkili faktörden üretilmiş verilerde de bütün korelasyonlar pozitif çıkar mı?",
        do: "Faktör analizi sekmesinde varsayılanı (Spearman 1904, 1 faktör) oku. Sonra <strong>Veri dizisi</strong>nden \"İki ilişkili faktör\"ü seç, <strong>Faktör sayısı</strong>nı 1 ve 2 arasında değiştir; faktör ilişkisini 0,40'tan 0,90'a çıkar.",
        observe: "Spearman: 15 / 15 pozitif, g yükleri 0,958 … 0,646 (Wikipedia'dakilerle aynı), kalan farkların KOK'u 0,0284. İlk özdeğer 4,103, yani toplam varyansın %68,4'ü; yük tablosunun \"açıklanan varyans\" satırı ise %62,9 der, çünkü özdeğer her testin kendine özgü varyansını da sayar, ana eksen çözümü yalnız ortak varyansı. İki faktörlü dizide de 15 / 15 pozitif; 1 faktör KOK 0,1542, 2 faktör 0,0124. İlişki 0,90 iken tek faktörün KOK'u 0,0326'ya iner.",
        explain: "Tek faktörde r<sub>ij</sub> = ℓ<sub>i</sub>ℓ<sub>j</sub> olduğu için dörtlü farklar sıfıra yakın olmalıdır; örneğin Klasikler–Fransızca ile İngilizce–Matematik'in çarpımından Klasikler–İngilizce ile Fransızca–Matematik'inkini çıkar: 0,83·0,64 − 0,78·0,67 = 0,0086. Ama olumlu yığılım tek bir genel faktörü zorunlu kılmaz: ilişkili faktörler, örnekleme kuramı ya da karşılıklılık aynı örüntüyü üretebilir. g'nin neyi temsil ettiği bu yüzden tartışmalıdır.",
      },
      {
        title: "Uyarlamalı test uçta kazanır, ortada değil",
        predict: "Gerçek düzeyi θ = 2 olan bir katılımcıyı uyarlamalı test mi, aynı sayıda orta güçlükte madde mi daha iyi ölçer? θ = 0'da fark kalır mı?",
        do: "Madde tepki kuramı sekmesinde varsayılanı (θ 2,0, durma 0,30) oku, <strong>100 kez yürüt</strong>'e bas. Sonra <strong>Katılımcının gerçek düzeyi θ</strong>'yı 0'a çek ve yine 100 kez yürüt.",
        observe: "θ = 2'de uyarlamalı test 19 maddede 1,81 ± 0,30, sorulan maddelerin ortalama güçlüğü 1,69; sabit test 1,36 ± 0,46. 100 benzetimde KOH 0,347 · 0,555 (ortalama 20,4 madde). θ = 0'da 0,02 ± 0,30 ve 100 benzetimde 0,251 · 0,250.",
        explain: "Orta güçlükteki maddelerin bilgisi θ = 0 çevresinde yığılıdır; uç bir düzeyde neredeyse hepsi doğru yanıtlanır ve az bilgi verir. Uyarlamalı test bilgiyi kişinin düzeyine taşır. EAP kestirimi önsel yüzünden ortalamaya çekilir: 1,81 < 2,0.",
      },
    ],
  },
  wow: [
    {
      title: "Flynn etkisinin adını Flynn koymadı",
      body:
        "Terimi Richard Herrnstein ve Charles Murray 1994'te <em>The Bell Curve</em>'de kullandı. Flynn, adını vermek gerekirse 1948'de ülke çapında bir örneklemle büyük kazançları ilk inandırıcı biçimde gösteren Read Tuddenham'ın seçilmesini isterdi. Hollandalı askerlik adayları 1952–1982 arasında 21 puan, on yılda yaklaşık 7 puan kazanmıştı; Norveç ve Danimarka'da ise sonradan düşüş bildirildi.",
    },
    {
      title: "Bir formül, iki rakip, art arda iki makale",
      body:
        "Spearman–Brown formülü 1910'da <em>British Journal of Psychology</em>'nin 3. cildinde art arda iki makaleyle çıktı; adındaki tire bir ortaklık düşündürse de iki yazar rakipti. Bugün kullanılan biçim Brown'unkine daha yakın olduğu için \"Brown–Spearman\" adını önerenler var. Formülün bir örneği şaşırtıcıdır: güvenirliği 0,80 olan 50 maddelik bir testi 0,95'e çıkarmak için yaklaşık 238 madde gerekir.",
    },
    {
      title: "Alfanın babası başka bir yol gösterdi",
      body:
        "Cronbach'ın 1951 makalesi çok atıf aldı; Cronbach bunu katsayıya bir \"marka adı\" koymasına bağladı. 2004'te Richard Shavelson ile yayımlanan yazıda ise okurları α yerine, hatanın birden çok kaynağını (maddeler, puanlayıcılar, zamanlar) ayrı ayrı kestiren genellenebilirlik kuramını kullanmaya çağırdı.",
    },
  ],
  worked: {
    title: "Puanın arkasındaki belirsizlik",
    prompt:
      "Benzetilmiş bir norm grubunda (500 kişi, ortalama 30,07, ss 5,93) bir kişi 39 ham puan alıyor. Testin güvenirliği α = 0,787. Kişinin z ve T puanını bul; T ölçeğinde (ortalama 50, ss 10) SÖH'ü, %95 bandı ve gerçek puan kestirimini hesapla; güvenirliği 0,90'a çıkarmak için test kaç kat uzamalı?",
    steps: [
      "z = (39 − 30,07)/5,93 = 1,51. T = 50 + 10z = 65,1; ortalaması 100, ss'si 15 olan ölçekte 122,6; stanin ⌊2z + 5,5⌋ = 8. Dağılım normalse yüzdelik Φ(1,51) ≈ %93,4. Normlar sekmesi varsayılanda tam bunları gösterir; yüzdelik sırası grubun kendisinden %93,0'dır.",
      "T ölçeğinde SÖH = 10·√(1 − 0,787) = 10·√0,213 = 4,62 puan. Güvenirlik sekmesinde Gözlenen puan 65 iken SÖH kutusu 4,62 gösterir.",
      "%95 bant: 65 ± 1,96·4,62 = 65 ± 9,05, yani 56,0 – 74,0; %68 bant 60,4 – 69,6. Gerçek puanın regresyon kestirimi 50 + 0,787·(65 − 50) = 61,8: uç bir gözlenen puanda hatanın da uç olma olasılığı yüksek olduğu için kestirim ortalamaya doğru çekilir.",
      "Spearman–Brown tersi: n = 0,90·(1 − 0,787) / (0,787·(1 − 0,90)) = 0,1917/0,0787 ≈ 2,44. On maddelik test yaklaşık 25 maddeye çıkmalı; sayfanın kutusu da 2,44 kat, yaklaşık 25 madde der.",
      "O zaman SÖH 10·√0,10 ≈ 3,16 puana iner. <strong>Madde sayısı k</strong>'yi 25 yap: α 0,901 · 0,900, SÖH 3,15, %95 bant 58,8 – 71,2 olur.",
    ],
    result:
      "z = 1,51, T ≈ 65; SÖH 4,62 ile %95 bant 56,0 – 74,0, gerçek puan kestirimi 61,8. Güvenirliği 0,90'a çıkarmak testi 2,44 kat uzatmayı ister; bant ancak üçte bir kadar daralır. Tek bir puan, bir aralığın ortasıdır.",
  },
  misconceptions: [
    {
      myth: "Yüksek bir α, testin tek bir özelliği ölçtüğünü gösterir.",
      truth:
        "α madde sayısıyla yükselir ve iki boyutlu bir testte de yüksek çıkabilir. Sayfada iki boyutlu yapıda α 0,647'dir, ama tek–çift yarı korelasyonu 0,187'ye düşer. Tek boyutluluk faktör analiziyle ayrıca sınanmalıdır.",
    },
    {
      myth: "Güvenilir bir test geçerli bir testtir.",
      truth:
        "Güvenirlik geçerliğin üst sınırını koyar, onu sağlamaz. \"Yöntem baskın\" durumunda her ölçümün güvenirliği 0,70 iken aynı özelliği farklı yöntemlerle ölçen puanlar yalnız 0,25 dolayında ilişkilidir: ölçümler tutarlıdır ama çoğunlukla yöntemi yakalar.",
    },
    {
      myth: "z puanını bilen yüzdeliği de bilir.",
      truth:
        "z'den yüzdeliğe geçiş yalnız dağılım normalse doğrudur. Normlar sekmesinde \"Sola çarpık\" seçilince 39 ham puan için z'den %93,2 çıkar, grubun kendi yüzdelik sırası ise %99,4'tür: tohum 1'de 39 bu grubun en yüksek puanıdır, uzun kuyruk solda kalır. Çarpık bir dağılımda yüzdelik norm grubundan okunur.",
    },
    {
      myth: "Seçilmiş çalışanlarda test ile iş başarısı zayıf ilişkiliyse test işe yaramıyordur.",
      truth:
        "Seçilenler testte zaten yüksek puan almış kişilerdir; yayılım daralır ve korelasyon küçülür. Sayfada bütün başvuranlarda 0,465 olan r, en iyi %30'da 0,235'e iner. Geçerlik çalışmalarında grubun nasıl seçildiği bu yüzden raporlanır.",
    },
  ],
  glossary: [
    { term: "Gerçek puan", definition: "Klasik test kuramında, aynı testin sonsuz kez bağımsız uygulanmasında kişinin alacağı beklenen puan; doğrudan gözlenemez." },
    { term: "Güvenirlik", definition: "Gözlenen puan varyansının gerçek puandan gelen payı; bir ölçümün hatadan ne kadar arınmış olduğunun kestirimi." },
    { term: "Cronbach α", definition: "Madde varyanslarını toplam puanın varyansıyla karşılaştıran iç tutarlılık katsayısı; maddeler tau-eşdeğer değilse güvenirliği olduğundan düşük gösterir." },
    { term: "Standart ölçme hatası (SÖH)", definition: "Gözlenen puanın gerçek puan çevresindeki tipik sapması, s·√(1 − ρ); klasik kuramda her puan düzeyinde aynı varsayılır." },
    { term: "Yapı geçerliği", definition: "Bir puanın, ölçtüğü varsayılan görülmeyen özellik hakkındaki kuramın öngördüğü gibi davrandığına dair biriken kanıt." },
    { term: "Yöntem varyansı", definition: "İki ölçümün yalnız aynı yöntemle (ör. ikisi de öz-bildirim) elde edildiği için paylaştığı, özellikten gelmeyen ortak varyans." },
    { term: "Faktör yükü", definition: "Bir testin bir ortak faktörle ilişkisinin ölçüsü; tek faktörlü modelde testin o faktörle korelasyonu." },
    { term: "Madde bilgi fonksiyonu", definition: "Bir maddenin her θ düzeyinde ölçme kesinliğine katkısı; 2PL'de a²·P·(1 − P), test bilgisi madde bilgilerinin toplamıdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Psikoloji ve eğitim bölümlerinde bu konu <strong>Psikolojide Ölçme ve Değerlendirme</strong> ya da <strong>Psikometri</strong> derslerinde başlar; arkasındaki matematik <strong>Doğrusal Cebir</strong> (özdeğerler, kovaryans matrisleri) ve <strong>Çok Değişkenli İstatistik</strong>tir. Faktör analizinde korelasyon matrisi ΛΛᵀ + Ψ biçiminde ayrıştırılır; sayfanın ana eksen yöntemi tam bunu Jacobi özdeğer ayrışımıyla yapar. Bir sonraki adım <strong>doğrulayıcı faktör analizi</strong> ve <strong>yapısal eşitlik modelleri</strong>dir: modeli önceden yazar, uyumunu sınar, MTMM matrisini özellik ve yöntem faktörleriyle açıkça kurarsın.",
      "Madde tepki kuramı lisansüstüne uzanır: parametreler en çok olabilirlik ya da Bayesçi yöntemlerle kestirilir, sayfadaki EAP gibi. <strong>Ölçme değişmezliği</strong> ve değişen madde fonksiyonu (DIF), bir testin farklı gruplarda ve kuşaklarda aynı şeyi ölçüp ölçmediğini sorar. Cronbach'ın önerdiği <strong>genellenebilirlik kuramı</strong> ise hatayı maddeler, puanlayıcılar ve zamanlar gibi kaynaklara ayırır. Bu araçların hepsi aynı ilkeye dayanır: görülmeyeni ölçerken önce modeli yaz, sonra modelin nerede yanıldığını ara.",
    ],
    topics: ["Doğrulayıcı faktör analizi", "Yapısal eşitlik modelleri", "Genellenebilirlik kuramı", "Ölçme değişmezliği ve DIF", "Bayesçi kestirim", "Uyarlamalı test tasarımı"],
  },
  quiz: [
    {
      question: "Güvenirliği 0,60 olan bir testin uzunluğu, eskileriyle paralel maddeler eklenerek iki katına çıkarılıyor. Yeni güvenirlik yaklaşık kaçtır?",
      options: ["0,60 (değişmez)", "0,75", "0,90", "1,20"],
      answer: 1,
      explanation: "Spearman–Brown: 2·0,60 / (1 + 0,60) = 1,20/1,60 = 0,75. Güvenirlik uzunlukla artar ama doğrusal değil, 1'e doğru giderek yavaşlar; bu yüzden 0,80'den 0,95'e çıkmak testi neredeyse beş katına uzatmayı ister.",
    },
    {
      question: "2PL modelinde ayırt ediciliği a = 1,8, güçlüğü b = 0,5 olan bir madde hangi düzeyde en çok bilgi verir ve o düzeyde doğru yanıt olasılığı nedir?",
      options: ["θ = 0'da, %50", "θ = 0,5'te, %50", "θ = 0,5'te, %90", "θ = 1,8'de, %50"],
      answer: 1,
      explanation: "2PL'de bilgi a²·P·Q'dur ve P·Q, P = 0,5 iken en büyüktür; bu da θ = b'de olur. Bilgi orada 1,8²/4 = 0,81'dir. Sayfada madde 2 için θ'yı 0,5 yap: %50,0 ve 0,810 okunur.",
    },
    {
      question: "Normları 1990'da toplanmış bir test 2020'de uygulanıyor; kuşak ortalaması on yılda 3 puan artmış. Eski normlarla 130 eşiğini aşanların payı ne olur?",
      options: ["Değişmez, %2,28 kalır", "Yarıya iner", "Yaklaşık %8'e çıkar", "Herkes eşiği aşar"],
      answer: 2,
      explanation: "Ortalama kişi eski normlarla 100 + 3·3 = 109 alır. Eşiği aşma payı 1 − Φ((130 − 109)/15) = 1 − Φ(1,4) ≈ %8,08 olur; güncel normlarla %2,28 idi, yani 3,55 kat. Eşikle karar verilen yerlerde normların yaşı bu yüzden önemlidir.",
    },
  ],
  next: [
    { href: "regresyon-ve-korelasyon.html", title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik", why: "Psikometrinin her katsayısının altında yatan korelasyon ve en küçük kareler; aykırı değerlerin ve kısıtlı aralığın bir r'yi nasıl oynattığı." },
    { href: "hipotez-testi-ve-guven-araligi.html", title: "Hipotez Testi ve Güven Aralığı: Örnekleme, p-Değeri, Hata Türleri ve Güç", why: "Örneklem α'sı ile kuramsal α arasındaki farkın kaynağı: örnekleme dağılımı, standart hata ve güven aralıkları." },
    { href: "algi-psikolojisi.html", title: "Algı Psikolojisi: Yanılsamalar, Eşikler, Sinyal Saptama ve Tepki Süresi", why: "Psikolojide ölçmenin öbür kolu: Weber ve Fechner'den sinyal saptamaya, duyumların eşiklerle ve modellerle ölçülmesi." },
    { href: "psikiyatri-tarihi-ve-tani-sistemleri.html", title: "Psikiyatri Tarihi ve Tanı Sistemleri: Sınıflama, Güvenilirlik, Taban Oranı", why: "Güvenirlik ve geçerlik tanı sistemlerinde: kurgusal vakalarla değerlendiriciler arası uyum (kappa), taban oranı ve kategori–boyut tartışması." },
  ],
  sources: [
    { title: "Spearman (1904) · General Intelligence, Objectively Determined and Measured, 5. bölüm", url: "https://psychclassics.yorku.ca/Spearman/chap5.htm", note: "Classics in the History of Psychology: hazırlık okulundaki 33 öğrenci ve müzik dersi alan 22'si, ölçme hatasına göre düzeltme ve \"one fundamental function\" sonucu (İngilizce, tam metin)." },
    { title: "Cronbach ve Meehl (1955) · Construct Validity in Psychological Tests", url: "https://psychclassics.yorku.ca/Cronbach/construct.htm", note: "Psychological Bulletin 52, 281–302: dört geçerlik türü, nomolojik ağ ve geçerliğin kesin kanıtlanamaması (İngilizce, tam metin)." },
    { title: "Wikipedia · Cronbach's alpha", url: "https://en.wikipedia.org/wiki/Cronbach%27s_alpha", note: "Cronbach 1951, Novick ve Lewis 1967'nin tau-eşdeğerlik koşulu, Cronbach ve Shavelson 2004; α'nın yanlış kullanımları (İngilizce)." },
    { title: "Wikipedia · Flynn effect", url: "https://en.wikipedia.org/wiki/Flynn_effect", note: "Terimin Herrnstein ve Murray 1994'e ait olması, Flynn'in Read D. Tuddenham'ı (1948) anması, Hollandalı askerlik adaylarının 1952–1982 kazancı, Norveç'te tersine dönüş (İngilizce)." },
    { title: "OpenStax · Psychology 2e, 7.5 Measures of Intelligence", url: "https://openstax.org/books/psychology-2e/pages/7-5-measures-of-intelligence", note: "Binet, Terman 1916, Wechsler 1939, standartlaştırma ve normlar, ortalama 100 ss 15, Flynn etkisi, öjeni ve Buck v. Bell (İngilizce, açık ders kitabı)." },
  ],
  revision: "Kasım 2026",
};
