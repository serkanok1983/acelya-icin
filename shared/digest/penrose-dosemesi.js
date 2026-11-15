window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["penrose-dosemesi"] = {
  "slug": "penrose-dosemesi",
  "title": "Penrose: Periyotsuz Bir Düzen",
  "field": "Matematik",
  "level": "Lise–Lisans",
  "minutes": 30,
  "tagline": "İki üçgeni aynı kuralla böl, sayılarının altın orana yaklaşmasını ölç. Sonra aynı dörtgenlerin neden bazen periyodik bir zemin oluşturabildiğini araştır.",
  "hook": "Bir zemindeki her parçayı tek tek tarif etmeden, yalnız iki şekil ve bir yerleştirme kuralı verebilir misin? Üstelik zemini ne kadar kaydırırsan kaydır, bütün desen kendisiyle yeniden çakışmasın. Penrose döşemesi bu iki isteği bir araya getirir.",
  "bigIdea": "<strong>Penrose düzenini yalnız parçaların biçimi değil, nasıl birleşmelerine izin verildiği belirler</strong>; altın oran ise bu yapının ölçeğinde ve parça sıklıklarında görünür.",
  "story": [
    "Mutfak fayansında küçük bir bölgeyi kopyalayıp iki doğrultuda öteleyerek bütün zemini kurabilirsin. Roger Penrose'un 1970'lerde geliştirdiği döşemeler başka bir düzen olanağını gösterdi: parçalar kurallı biçimde birleşir, fakat sonsuz döşemenin tamamını kendisiyle çakıştıran sıfırdan farklı bir öteleme yoktur. Bu, her küçük motifin yalnız bir kez görüldüğü anlamına gelmez. Yerel bir desenin yeniden bulunmasıyla bütün zeminin bir periyodu olması ayrı şeylerdir.",
    "Tanıdık gösterimlerden biri ince ve kalın iki eşkenar dörtgen kullanır. Kenarlara konan eşleme işaretleri, komşu parçaların hangi yönlerde birleşebileceğini belirler. Bu işaretleri yok sayarsan aynı şekillerle sıradan periyodik zeminler de kurabilirsin. Laboratuvarın son deneyi tam bu karşı örneği görünür kılar: iki biçime sahip olmak tek başına aperiyodiklik demek değildir.",
    "Hesap yapmak için dörtgenleri Robinson üçgenlerine ayırmak kullanışlıdır. Bir üçgen iki, öteki üç küçük üçgene bölünür. Görünüşte basit olan bu işlem; alan korunumu, Fibonacci sayıları, matris özdeğerleri ve öteleme simetrisini aynı masaya getirir. Buradaki resim sonlu bir yamadır; sonsuz düzlem hakkındaki teoremleri yalnız resme bakarak kanıtlamış olmayız."
  ],
  "core": [
    {
      "heading": "İki üçgen, tek ortak kenar ölçeği",
      "body": "A türü 36°–72°–72° açılı dar tepeli, B türü 108°–36°–36° açılı geniş tepeli ikizkenar üçgendir. İkisinin eşit kenarlarına s dersek tabanları aynı uzunlukta değildir. Uygun eş iki üçgen ortak tabanlarından birleşince ince veya kalın eşkenar dörtgen çıkar. Bu ayrım, üçgen sayısını neden doğrudan tam dörtgen sayısı diye okuyamayacağımızı da açıklar: sonlu yamanın kenarında eş bulamayan yarımlar kalabilir.",
      "formula": "φ = (1 + √5)/2<br>taban(A) = s/φ<br>taban(B) = φs<br>alan(A) = ½s²sin 36°<br>alan(B) = ½s²sin 108° = φ·alan(A)",
      "formulaNote": "s bir uzunluktur; alan s² birimindedir. Alan oranı φ, aynı ölçekteki iki üçgenin geometrik özelliğidir; sayıca B/A oranıyla karıştırma."
    },
    {
      "heading": "Alanı koruyarak ayrıntıyı artır",
      "body": "Yerine koyma kuralı A'yı bir A ve bir B'ye; B'yi bir A ve iki B'ye ayırır. Yeni parçaların eşit kenarları eskisinin 1/φ katıdır. Daha küçük parçalar üretmek yamanın kapladığı alanı değiştirmez. Ancak köşelerin sırası da kuralın parçasıdır: aynı üçgeni ayna görüntüsündeki yönde bölmek komşularla birleşmesini etkiler.",
      "formula": "A → A + B<br>B → A + 2B<br>sₙ = s₀φ⁻ⁿ<br>Yeni A alanı = eski A alanı / φ²",
      "formulaNote": "Okların sağındaki parçalar küçültülmüştür; aynı büyüklükteki alanları toplama. Sol/sağ yön bilgisini silerek yalnız renk saymak, geometrik döşemeyi üretmeye yetmez."
    },
    {
      "heading": "Sayıların içinden çıkan özdeğer",
      "body": "n. adımda A ve B sayıları aₙ ve bₙ olsun. Her eski A birer A ve B; her eski B bir A ve iki B verdiği için yeni sayıları bir matris belirler. Matrisin büyük özdeğeri φ², ona karşılık gelen yön (1, φ)'dir. Bu yüzden bu yerine koyma dizisinde bₙ/aₙ, φ'ye yaklaşır. Her sonlu adımda iki tam sayının oranı rasyoneldir; irrasyonel limit buna engel değildir.",
      "formula": "aₙ₊₁ = aₙ + bₙ<br>bₙ₊₁ = aₙ + 2bₙ<br>M = [[1, 1], [1, 2]]<br>λ² − 3λ + 1 = 0 ⇒ λ = φ² veya φ⁻²",
      "formulaNote": "Sayı vektörünün sırası (A, B)'dir. Ters sırayla yazılmış bir kaynakta matrisin görünüşü değişebilir. Sonlu yamanın oranı genel olarak tam φ değildir."
    },
    {
      "heading": "Bir motifi tekrarlamak ile bir periyoda sahip olmak",
      "body": "Bir öteleme periyodu t, bütün sonsuz döşemeyi t kadar kaydırınca parçaları ve birleşimlerini aynen korur. Yerel bir yıldızın başka yerde görülmesi bu koşulu sağlamaz. Penrose eşleme kurallarının sonucu, böyle sıfırdan farklı bir ötelemenin olmamasıdır. İşaretsiz bir eşkenar dörtgen ise iki kenar vektörü boyunca kopyalanarak periyodik bir örgü kurar.",
      "formula": "Periyot: T + t = T, t ≠ 0<br>Periyodik örgü: m·u + n·v, m,n ∈ ℤ",
      "formulaNote": "u ve v bağımsız kenar vektörleridir. Sonlu ekranın çerçevesi de kayar; periyot kavramı çerçevenin değil, sınırsız devam eden modelin özelliğidir."
    },
    {
      "heading": "Bir sayı oranı neyi kanıtlar?",
      "body": "Sonlu bir temel hücre iki bağımsız yönde tekrarlanıyorsa hücrede bulunan iki karo türünün sayı oranı rasyoneldir. Uygun büyük bölgelerde sınır etkisi küçüldüğünde aynı oran elde edilir. Penrose'daki irrasyonel sayı oranı böyle bir örgüyle bağdaşmaz. Fakat bu argüman tek başına yalnız bir yönde öteleme olasılığını dışlayan genel bir kanıt değildir; Penrose'un tam aperiyodiklik sonucu eşleme ve hiyerarşi yapısına ayrıca dayanır.",
      "formula": "Sonlu hücrede b/a ∈ ℚ<br>Penrose sayı oranı limiti: b/a → φ ∉ ℚ",
      "formulaNote": "Sonlu çizim, yakın bir ondalık sayı veya birkaç denenmiş kaydırma; sonsuz döşemenin bütün olası ötelemeleri için kanıt oluşturmaz."
    }
  ],
  "lab": {
    "intro": "Üç sekme bağımsızdır: Yamayı kur, on başlangıç üçgeninin bütününü; Bir üçgeni böl, tek bir kuralın geometrisini; Şekil mi, kural mı?, işaretsiz dörtgenlerin periyodik karşı örneğini gösterir. Her sekmenin sıfırlama düğmesi vardır. Sayımlar, yakınlaştırılmış pencereye değil bütün yamaya aittir.",
    "experiments": [
      {
        "title": "Aynı küçülme, farklı parça sayısı",
        "predict": "İki üçgenin eşit kenarı da 1/φ ile küçülüyorsa her biri aynı sayıda alt parçaya mı ayrılır?",
        "do": "Bir üçgeni böl sekmesinde Kuralı sıfırla'ya bas: A türü, birinci yön, k = 1, L = 1 birim. Sonra Ana üçgen menüsünden B türünü seç. Yeni eş kenar ve Alan toplamı kartlarını karşılaştır.",
        "observe": "A için 1 A + 1 B; B için 1 A + 2 B çıkar. İkisinde de yeni eş kenar yaklaşık 0,618034 birimdir. Toplam alanlar sırasıyla 0,293892626 ve 0,475528258 birim² olur; köşe koordinatlarından hesaplanan alan toplamı ile kuram gösterilen basamaklarda örtüşür.",
        "explain": "A ve B'nin tepe açıları farklıdır. Aynı kenar ölçeğinde B'nin alanı φ kat büyüktür ve bölünme kuralı bir fazla B parçası içerir. İki örnekte de alt parçalar ana üçgenin alanını korur."
      },
      {
        "title": "Büyütme ve aynalama neyi değiştirir?",
        "predict": "Ana kenarı iki katına çıkarmak daha çok parça üretir mi? Bölme yönünü aynalamak sayı oranını değiştirir mi?",
        "do": "Kuralı sıfırla ile A türü, k = 1, L = 1 durumuna dön. Ana eş kenar L'yi 2 birim yap. Sonra Bölme yönü menüsünden Aynalanmış yön'ü seç; çizgilerin ve okumaların değişimini karşılaştır.",
        "observe": "Sayılar 1 A ve 1 B olarak kalır. Yeni eş kenar 1,236068 birime, toplam alan 1,175570505 birim²'ye çıkar. Aynalama iç bölmeyi yansıtır; bu sayıları, kenar uzunluklarını ve alanı değiştirmez.",
        "explain": "Uzunluklar iki katına çıkınca alan dört katına çıkar. Aynalama uzaklığı ve alanın mutlak değerini korur. Buna rağmen yön bilgisi gereksiz değildir: birden çok parçanın ortak sınırlarında hangi bölmenin oluşacağını belirler."
      },
      {
        "title": "Rasyonel sayımlardan irrasyonel limite",
        "predict": "Her adımda iki tam sayı sayıyorsak oranları irrasyonel bir sayıya yaklaşabilir mi? Yakınlaştırmak oranı değiştirmeli mi?",
        "do": "Yamayı kur sekmesinde n = 0, n = 3 ve n = 7 düğmelerini sırayla kullan. n = 7'de Çizim biçimi'ni Bütün üçgen sınırları yap; sonra Yakınlaştırma'yı 2× yap. B / A kartını ve toplam yama uyarısını izle.",
        "observe": "(A, B) sayıları (10, 0) → (50, 80) → (2.330, 3.770); toplamlar 10 → 130 → 6.100'dür. B/A oranı 0 → 1,6 → 1,618025751 olur. n = 7'de φ'ye mutlak fark yaklaşık 0,000008238'dir. Çizim biçimi ve yakınlaştırma sayıları değiştirmez; dış ongenin alanı yaklaşık 2,938926261 birim² olarak kalır.",
        "explain": "Yeni sayıları a′ = a + b, b′ = a + 2b belirler. Bu sayım dizisinin baskın yönü (1,φ)'dir. Sonlu oranların hepsi rasyoneldir; limitleri irrasyonel olabilir. Yakınlaştırma sadece görünen pencereyi değiştirir."
      },
      {
        "title": "Aynı şekillerle bir periyot bul",
        "predict": "Penrose ile ilişkilendirilen ince dörtgeni kullanmak, tek başına periyodik bir zemin kurmayı engeller mi?",
        "do": "Şekil mi, kural mı? sekmesinde Karşıörneği sıfırla'ya bas. Bir kenar ötele, Yarım kenar ötele ve Öteleme yok düğmelerini sırayla dene. Son olarak Bir kenar ötele'ye dönüp Serbest eşkenar dörtgen menüsünden Kalın seç.",
        "observe": "İnce dörtgende |t| sırasıyla 1, 0,5 ve 0 birimdir: ilkinde sıfırdan farklı periyot, ikincide çakışma yok, üçüncüde yalnız özdeşlik yazılır. Kalın dörtgende de bir kenarlık öteleme periyottur. Karo alanı ince türde 0,587785252, kalın türde 0,951056516 birim²'dir.",
        "explain": "Bu sekmede eşleme işaretleri uygulanmaz. Tam sayı a ve b, kafes indislerini değiştirerek aynı sonsuz örgüyü verir. Yarım ötelemenin başarısız olması, başka bir ötelemenin de başarısız olacağını söylemez; bir kenarlık öteleme zaten karşı örnektir."
      }
    ]
  },
  "wow": [
    {
      "title": "Daha çok parça, aynı toplam alan",
      "body": "On A üçgeninden başlayan yama dört adım sonra 130 A ve 210 B, toplam 340 üçgen içerir. Her yeni eşit kenar başlangıcın yaklaşık 0,145898 katıdır. Parça sayısı 34 katına çıksa da bütün parçaların alanı ilk yamanın alanına eşittir: bölme işlemi yeni zemin eklemez."
    },
    {
      "title": "Geometri ile sayım aynı sayıda buluşur",
      "body": "Eşit kenarları aynı uzunlukta iki üçgenin alan oranı B/A tam φ'dir. Aynı türlerin yerine koyma altında oluşan sayı oranı ise yalnız limitte φ'ye yaklaşır. Biri trigonometriden, öteki bir matrisin baskın özvektöründen gelir; aynı sayı, iki ayrı sorunun cevabıdır."
    },
    {
      "title": "Düzen, kristalde de periyot demek değil",
      "body": "Dan Shechtman 8 Nisan 1982'de alüminyum–mangan örneğinin elektron kırınımında alışılmadık bir simetri gözledi; kuazikristallerin keşfi 2011 Nobel Kimya Ödülü'ne konu oldu. Penrose düzenleri, periyodik olmayan düzeni düşünmek için matematiksel modeller sunar. Ekrandaki iki boyutlu yama, gerçek bir malzemenin atomlarını veya kırınım şiddetlerini hesaplamaz."
    }
  ],
  "worked": {
    "title": "Dört adımın hesabını çizimden önce yap",
    "prompt": "Yarıçapı 1 birim olan başlangıç ongeni 10 A üçgeninden oluşuyor. Dört bölmeden sonra iki türün sayılarını, eş kenarını ve toplam alanını hesapla. B/A'nın altın orana mutlak farkını bul.",
    "steps": [
      "Başlangıç (a₀,b₀) = (10,0). (a,b) → (a+b,a+2b) kuralını uygula: (10,10), (20,30), (50,80), (130,210). Dördüncü adımda toplam 340 üçgen vardır.",
      "Eş kenar her adımda 1/φ ile küçülür: s₄ = φ⁻⁴ ≈ 0,145898034 birim. Bir A'nın alanı ½s₄²sin36° ≈ 0,006255868 birim²; bir B'ninki ½s₄²sin108° ≈ 0,010122207 birim²'dir.",
      "Yuvarlanmamış değerlerle alanları topla: 130·alan(A) + 210·alan(B) ≈ 2,938926261 birim². Başlangıçta 10·½sin36° aynı alanı verir. Sayının büyümesi alanın büyümesi değildir.",
      "B/A = 210/130 = 21/13 ≈ 1,615384615. Mutlak fark |φ − 21/13| ≈ 0,002649373'tür ve boyutsuzdur. Buradaki oran, iki tek üçgenin tam φ olan alan oranı değildir.",
      "Yamayı kur sekmesinde Bölünme sayısı n'yi 4 yap. Çizilen A/B kartında 130/210, eş kenarda yaklaşık 0,145898 birim, fark kartında 0,002649373 görürsün. Panelin altındaki toplam alanla hesabını karşılaştır."
    ],
    "result": "340 küçük üçgen, aynı 2,938926261 birim²'lik ongeni doldurur. Sayı oranı φ'ye yaklaşmaktadır; dördüncü adımda tam eşit değildir."
  },
  "misconceptions": [
    {
      "myth": "İnce ve kalın dörtgenleri boşluksuz dizmek her zaman Penrose döşemesi verir.",
      "truth": "Biçimler yeterli değildir; eşleme veya buna uygun yerine koyma kuralı gerekir. İşaretler yok sayılırsa bu şekillerle periyodik örgüler de yapılabilir."
    },
    {
      "myth": "Periyodik değilse hiçbir motif tekrar etmez.",
      "truth": "Yerel motifler tekrar edebilir. Olmayan şey, bütün sonsuz döşemeyi aynı anda kendisiyle çakıştıran sıfırdan farklı bir ötelemedir."
    },
    {
      "myth": "B/A kartı 1,618'e yuvarlandıysa oran artık tam altın orandır.",
      "truth": "Sonlu tam sayı sayımlarının oranı rasyoneldir. φ irrasyoneldir; sonlu gösterimde eşit görünen basamaklar yalnız sayısal yakınlığı anlatır."
    },
    {
      "myth": "Bu desen fraktal gibi göründüğüne göre karoların içi kesirli boyutludur.",
      "truth": "Bir karo, içi olan düzlemsel bir çokgendir ve boyutu 2'dir. Yerine koyma ölçekler arasında bir düzen kurar; bu tek başına her çizilmiş nesnenin kesirli boyutu olduğu anlamına gelmez."
    }
  ],
  "glossary": [
    {
      "term": "Döşeme",
      "definition": "Düzlemi boşluk bırakmadan ve parçaların içleri örtüşmeden kaplayan karo düzeni."
    },
    {
      "term": "Yama",
      "definition": "Bir döşemenin sonlu sayıdaki karodan oluşan parçası; bütün sonsuz düzlem değildir."
    },
    {
      "term": "Robinson üçgeni",
      "definition": "Penrose yapımında kullanılan 36°–72°–72° veya 108°–36°–36° açılı ikizkenar üçgen türü."
    },
    {
      "term": "Yerine koyma",
      "definition": "Bir karoyu belirli bir kurala göre daha küçük karolara ayırma veya büyütülmüş karoyu özgün boyuttaki karolarla doldurma işlemi."
    },
    {
      "term": "Eşleme kuralı",
      "definition": "Komşu parçaların hangi kenar ve yönlerle birleşebileceğini belirleyen koşul."
    },
    {
      "term": "Öteleme periyodu",
      "definition": "Bütün sonsuz düzeni değiştirmeden kaydıran sıfırdan farklı vektör."
    },
    {
      "term": "Özvektör",
      "definition": "Bir matris uygulandığında yalnız bir skalerle çarpılmış hâline dönüşen sıfırdan farklı vektör."
    },
    {
      "term": "Karo sıklığı",
      "definition": "Sınır etkisi denetlenmiş büyüyen bölgelerde bir karo türünün sayısının toplam sayıya oranının limiti, varsa."
    }
  ],
  "bridge": {
    "heading": "Üniversiteye köprü",
    "body": [
      "<strong>Lineer Cebir</strong>'de M matrisinin karakteristik polinomu λ² − 3λ + 1'dir. İki özdeğer φ² ve φ⁻² olduğundan tekrar tekrar çarpmada büyük özdeğere ait yön baskınlaşır. İkincinin birinciye oranı φ⁻⁴ ≈ 0,145898'dir; normalize edilmiş sayı vektöründeki ikincil katkı bu çarpanla azalır. Bu, çizimdeki altın oranı yalnız bir benzerlik olarak görmekten çıkartıp hesaplanan bir limit yapar.",
      "<strong>Ayrık Matematik</strong> ve <strong>Döşeme Kuramı</strong>'nda yerel eşleme koşullarından küresel sonuçlara nasıl geçildiği araştırılır. <strong>Katıhal Fiziği</strong>'nde periyodik örgü, atomik düzen ve kırınım birbirinden ayrılır. Laboratuvarın sonlu yaması bu bağlantılara bir başlangıçtır; bir çizimin büyüklüğü ne kadar artarsa artsın, sonsuz düzleme geçiş için varlık ve aperiyodiklik kanıtları ayrıca gerekir."
    ],
    "topics": [
      "Matris kuvvetleri",
      "Özdeğer ve özvektör",
      "Fibonacci bağıntıları",
      "Yerel ve küresel koşullar",
      "Öteleme simetrisi",
      "Kuazikristaller"
    ]
  },
  "quiz": [
    {
      "question": "On A ve hiç B yokken iki yerine koyma adımı yapılıyor. Hangi sayım elde edilir?",
      "options": [
        "20 A ve 20 B",
        "20 A ve 30 B",
        "30 A ve 20 B",
        "10 A ve 40 B"
      ],
      "answer": 1,
      "explanation": "İlk adım (10,10), ikinci adım (10+10, 10+2·10) = (20,30) olur. İki tür aynı sayıda alt parça üretmez."
    },
    {
      "question": "İşaretsiz bir eşkenar dörtgen iki kenar vektörü boyunca tekrarlanarak periyodik bir zemin yaptı. Bu neyi gösterir?",
      "options": [
        "Penrose teoreminin yanlış olduğunu",
        "Bir döşemede yerel motiflerin tekrarlanamayacağını",
        "Parça biçiminin tek başına aperiyodikliği zorlamadığını",
        "Altın oranın rasyonel olduğunu"
      ],
      "answer": 2,
      "explanation": "Penrose sonucu uygun eşleme kurallarıyla ilgilidir. Bu kuralları kaldırmak, farklı bir izinli düzenler ailesi oluşturur; periyodik karşı örnek teoreme aykırı değildir."
    },
    {
      "question": "Sonlu yamada 210 B ve 130 A sayıldı. B/A için hangi ifade doğrudur?",
      "options": [
        "Tam φ'dir; çünkü iki sayı da Fibonacci dizisindendir.",
        "φ'den büyüktür ve adım artırmak farkı değiştirmez.",
        "Sayımın ondalığı φ'ye yakınsa bütün ötelemeler dışlanmış olur.",
        "21/13 rasyoneldir; φ'ye yakın olması kesin eşitlik veya aperiyodiklik kanıtı değildir."
      ],
      "answer": 3,
      "explanation": "210/130 = 21/13 ≈ 1,615385; φ ≈ 1,618034. Yakınsama bir dizi hakkındadır, tek bir sonlu oran hakkında kesin eşitlik değildir."
    }
  ],
  "next": [
    {
      "href": "sierpinski-fraktali-peano-egrisi-altin-oran.html",
      "title": "Üç Yapım, Üç Ayrı Limit",
      "why": "Altın oran sekmesinde rₙ₊₁ = 1 + 1/rₙ bağıntısını dene; Fibonacci oranlarının φ'ye yakınsamasını farklı bir yinelemeyle ölç."
    },
    {
      "href": "lineer-cebir-ve-ozdegerler.html",
      "title": "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum",
      "why": "Sayı vektörünü dönüştüren matrisin baskın yönünü özvektör diliyle incele."
    },
    {
      "href": "kristal-yapilar.html",
      "title": "Kristal Yapılar",
      "why": "Periyodik birim hücre ve kırınımın düzeni nasıl görünür kıldığını karşılaştır."
    }
  ],
  "sources": [
    {
      "title": "Utah · Andrejs Treibergs, Penrose Tiling",
      "url": "https://www.math.utah.edu/~treiberg/PenroseSlides.pdf",
      "note": "Üniversite kolokyum notları: eşleme kuralları, üçgenlerin bölünmesi, sayı bağıntısı ve limit oranı. Sonlu temel hücre argümanı ile tam aperiyodiklik iddiasını ayırarak oku."
    },
    {
      "title": "Bielefeld · Robinson Triangle",
      "url": "https://tilings.math.uni-bielefeld.de/substitution/robinson-triangle/",
      "note": "Tilings Encyclopedia: Robinson üçgenlerinde sol/sağ yön bilgisi ve geometrik yerine koyma; üçgen biçiminin simetrisi bölünmenin yön bilgisini ortadan kaldırmaz."
    },
    {
      "title": "Bielefeld · Penrose Rhomb",
      "url": "https://tilings.math.uni-bielefeld.de/substitution/penrose-rhomb/",
      "note": "İki karo türü, eşleme kuralları, altın ölçek çarpanı ve Fibonacci bağlantısı; ilgili özgün araştırmalara kaynakça."
    },
    {
      "title": "Nobel · Chemistry 2011, Information for the Public",
      "url": "https://www.nobelprize.org/uploads/2018/06/popular-chemistryprize2011.pdf",
      "note": "İsveç Kraliyet Bilimler Akademisinin açıklaması: Shechtman'ın 1982 gözlemi, 2011 ödülü ve Penrose modelleriyle kuazikristaller arasındaki bağlantı."
    }
  ],
  "revision": "Kasım 2026"
};
