window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["termokimya-ve-hess-yasasi"] = {
  slug: "termokimya-ve-hess-yasasi",
  title: "Termokimya ve Hess Yasası: Isıyı Ölçmek, Döngüyü Kapatmak",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Isı ölçmek göründüğünden zordur: termometre geç kalır, kap ısı çalar, bomba ΔH değil ΔU verir. Hess yasası ise hiç ölçemediğin bir entalpiyi ölçebildiklerinden kurar.",
  hook:
    "Bir fincanda seyreltik asidi bazla karıştırıyorsun; termometre en çok 5,834 K yükseliyor. Bu sayıyla hesapladığın nötrleşme entalpisi, doğru değerden yüzde 12,6 küçük çıkıyor. Isının bir kısmı nereye gitti? Ve hiçbir kalorimetreye sığmayan bir kristalin örgü enerjisini nasıl bilebilirsin?",
  bigIdea:
    "Entalpi bir <strong>hâl fonksiyonudur</strong>: ΔH yalnız başlangıç ve son hâle bağlıdır. Bu yüzden tepkimeler denklem gibi toplanır, ölçülemeyen bir ΔH ölçülebilen basamaklardan kurulur ve her verideki hata katsayısıyla çarpılarak sonuca taşınır.",
  story: [
    "Isıyı sıcaklıktan ayırmak bir buluştu. 1761'de Joseph Black <strong>gizli ısı</strong> fikrini ortaya attı: buz erirken ısı alır ama termometre kıpırdamaz. Bu fikir ilk buz kalorimetrelerine yol açtı. 1782–83 kışında Antoine Lavoisier ile Pierre-Simon Laplace, bir yanmanın ya da bir canlının verdiği ısıyı, eriyen buzun kütlesinden ölçen bir düzenek kurdular. İçine canlı bir kobay koydular; hayvanın soluk verirken çıkardığı karbondioksiti ve erittiği buzu, kömür yakarak aynı miktarda karbondioksit üreten bir yanmayla karşılaştırdılar. Vardıkları sonucu 1783 tarihli ortak anılarına yazdılar: solunum yavaş ama gerçek bir yanmadır, «la respiration est donc une combustion».",
    "1840'ta İsviçre doğumlu Rus kimyacı ve hekim Germain Hess, bir tepkimenin ısısının tek adımda ya da ara basamaklarla yürümesine bağlı olmadığını yayımladı. Bugün bunu entalpinin hâl fonksiyonu olmasının sonucu olarak okuyoruz: yasa çiğnenebilseydi, bir döngüden bedava enerji çekilir ve birinci yasa bozulurdu. 1858'de Gustav Kirchhoff tepkime ısısının sıcaklıkla değişiminin ürünlerle girenlerin ısı sığaları farkına eşit olduğunu gösterdi. Aynı yüzyılda Julius Thomsen 1869–1882 arasında çok sayıda tepkime ısısı ölçtü ve sonuçlarını 1882–1886'da dört cilt hâlinde yayımladı. Thomsen 1854'te, Marcellin Berthelot 1864'te, her kimyasal değişimin ısı verdiğini, verilen ısının da kimyasal ilginin gerçek ölçüsü olduğunu savundu. Kendiliğinden yürüyen ısı alan süreçler bu ilkeyi çürüttü. 1882'de Hermann von Helmholtz ilginin ölçüsünün ısı değil, tersinir yürütülen bir tepkimenin verebileceği en büyük iş olduğunu gösterdi.",
    "Yirminci yüzyılda termokimya, doğrudan ölçülemeyen bir sayının peşine düştü: bir iyonik kristali gaz iyonlarına ayırmanın bedeli olan <strong>örgü entalpisi</strong>. 1918'de Max Born ve Alfred Landé bunu Coulomb çekimi ile kısa erimli bir itmeden kuramsal olarak hesapladı. 1919'da Born ve Fritz Haber, aynı sayıyı ölçülebilen basamaklardan (süblimleşme, bağ ayrışması, iyonlaşma, elektron ilgisi, oluşum entalpisi) kuran döngüyü yayımladı; Kazimierz Fajans da aynı ilişkiyi bağımsız olarak buldu. 1956'da Anatoli Kapustinskii kristal yapısını bilmeyi gerektirmeyen, yalnız iyon yükleri ve yarıçaplarıyla çalışan bir formül yayımladı. Bu sayfada bu üç yol yan yana durur.",
  ],
  core: [
    {
      heading: "Hâl fonksiyonu ve oluşum entalpileri",
      body:
        "Sabit basınçta bir sistemin aldığı ısı, iç enerjisindeki değişim ile çevresine yaptığı hacim işinin toplamıdır; bu toplama <strong>entalpi değişimi</strong> denir. Entalpi, iç enerji ve hacim gibi, yalnız sistemin o anki hâline bağlıdır. Mutlak değeri ölçülemez ama farkı ölçülür; bu yüzden bir başlangıç noktası seçilir: en kararlı hâlindeki elementlerin <strong>standart oluşum entalpisi</strong> sıfır kabul edilir. Sonra her tepkime için ΔH°, ürünlerin oluşum entalpilerinden girenlerinkini çıkararak bulunur. Sayfanın her yerindeki “oluşum yolu” bu toplamdır; değerler OpenStax Chemistry 2e'nin Ek G tablosundan gelir.",
      formula: "ΔH = ΔU + PΔV = q<sub>p</sub><br>ΔH°<sub>tep</sub> = Σ ν·ΔH°<sub>f</sub>(ürün) − Σ ν·ΔH°<sub>f</sub>(giren)",
      formulaNote: "ν stokiyometri katsayısıdır. CH₄ + 2O₂ → CO₂ + 2H₂O(s): −393,51 + 2(−285,83) − (−74,6) = −890,57 kJ/mol.",
    },
    {
      heading: "Kalorimetre: ısı kaybını geri uzatarak düzeltmek",
      body:
        "Kalorimetre tek bir ısıl kütle gibi davranır: ısı sığası C, içine verilen gücü sıcaklık artışına çevirir. Ama kap gerçek bir yalıtkan değildir; Newton soğuma yasasına göre her an θ = T − T<sub>oda</sub> ile orantılı bir ısı kaçar. Termometre en yüksek değeri gösterdiğinde ısının bir kısmı çoktan gitmiştir. Çare, soğuma kuyruğundaki okumalara üstel bir eğri uydurup karıştırma anına (t = 0) <strong>geri uzatmaktır</strong>. Isı τ süresince yayılarak salındığı için bu yöntem de küçük bir fazlalık bırakır. Üstel salımda denklemin çözümü θ(t) = Q/(C(1 − kτ))·(e<sup>−kt</sup> − e<sup>−t/τ</sup>) olur; salım bitince ikinci terim söner ve t = 0'a uzatılan genlik Q/C değil, Q/(C(1 − kτ))'dir. Geç salınan ısı odaya kaçmak için daha az zaman bulmuştur, geri uzatma onu da baştan kaçmış sayar. Bu yüzden C kitaptan alınmaz, bilinen bir ısıyla (sayfada 2000 J'lik ısıtıcı ya da 1,000 g benzoik asit) <strong>kalibre edilir</strong>; deney ile kalibrasyon aynı sapmayı taşıdıkça sapma sadeleşir.",
      formula: "dθ/dt = P(t)/C − kθ<br>ΔH = −C<sub>ölçülen</sub>·ΔT<sub>düzeltilmiş</sub>/n",
      formulaNote: "k ısı kaybı katsayısı, τ ısı salım süresi. Varsayılanda kτ = 0,015: geri uzatma % 1,52 fazla ölçer. t<sub>d</sub> = 20 s'lik ısıtıcının payı (e<sup>k·t<sub>d</sub></sup> − 1)/(k·t<sub>d</sub>) − 1 ≈ k·t<sub>d</sub>/2 da % 1,52'dir, çünkü t<sub>d</sub> = 2τ. İki pay sadeleşir, sonuç kaynaktan yalnız +0,03 % ayrılır.",
    },
    {
      heading: "Bomba ΔU ölçer, kahve fincanı ΔH",
      body:
        "Kahve fincanı açık havadadır: basınç sabittir, ölçülen ısı q<sub>p</sub> = ΔH olur. Bomba kalorimetresi katı ve kapalıdır: hacim sabittir, gaz genleşip iş yapamaz, ölçülen ısı q<sub>V</sub> = ΔU olur. İkisini ideal gaz yaklaşımıyla PΔV = Δn<sub>gaz</sub>RT bağlar; sıvı ve katıların hacim değişimi bunun yanında ihmal edilir. Yanmada su sıvı kaldığı için Δn<sub>gaz</sub> çoğunlukla negatiftir. Düzeltme yalnızca birkaç kJ/mol tutar, binlerce kJ/mol'ün yanında küçüktür; ama sayfadaki ölçüm farkından büyüktür, yani ihmal edilemez.",
      formula: "ΔH = ΔU + Δn<sub>gaz</sub>·RT",
      formulaNote: "Δn<sub>gaz</sub> = gaz ürün molleri − gaz giren molleri. Metanol: 1 − 1,5 = −0,5, Δn·RT = −0,5 × 8,314 × 298,15 J/mol = −1,239 kJ/mol.",
    },
    {
      heading: "Hess yasası doğrusal cebirdir",
      body:
        "Tepkimeleri toplamak bir vektör toplamıdır. Her türü bir satır, her verilen tepkimeyi bir sütun yaparsan bir <strong>stokiyometri matrisi</strong> A elde edersin; hedef tepkime b vektörüdür. Ac = b denklemini sağlayan c katsayıları bulunursa ΔH<sub>hedef</sub> = Σ cᵢ·ΔHᵢ olur. Sayfa bunu en küçük kareler ve Gauss eleme ile çözer; artık ‖Ac − b‖ sıfır değilse hedef bu tepkimelerden kurulamaz. Eksi katsayı tepkimenin ters çevrildiği, sıfır katsayı gereksiz olduğu anlamına gelir. Aynı doğrusallık hatayı da taşır: i. veride δ kadar hata varsa sonuç tam cᵢ·δ kayar. Dürüst bir not: sayfadaki iki yol (Hess ve oluşum) aynı Ek G tablosundan beslendiği için farkları yalnız yuvarlamadır. Bu yasanın deneysel sınaması değil, bir tutarlılık sınamasıdır.",
      formula: "A·c = b ⇒ ΔH<sub>hedef</sub> = Σ cᵢ·ΔHᵢ<br>δ(ΔH<sub>hedef</sub>) = cᵢ·δᵢ",
      formulaNote: "CH₄ hedefinde c = (+1; +2; −1): CO₂ oluşumu + 2 × su oluşumu − metan yanması = −74,60 kJ/mol.",
    },
    {
      heading: "Kirchhoff: ΔH sıcaklıkla neden değişir?",
      body:
        "Ek G'deki değerler 298,15 K içindir. Tepkimeyi başka bir sıcaklıkta yürütmek, girenleri o sıcaklıktan 298 K'e soğutup tepkimeyi orada yapmak ve ürünleri geri ısıtmakla aynı hâl değişimidir; Hess'in döngüsü burada da işler. Sonuç Kirchhoff yasasıdır: ΔH'nin sıcaklık türevi, ürünlerin ve girenlerin ısı sığaları farkı ΔC<sub>p</sub>'dir. C<sub>p</sub> sıcaklıkla değiştiği için sayfa NIST'in <strong>Shomate</strong> polinomlarını kullanır ve integrali hem kapalı biçimde hem Simpson kuralıyla alır. Aynı denge, adyabatik alev sıcaklığını da verir: yanmanın ısısı ürünlerin entalpisini girenlerinkine eşitleyene kadar onları ısıtır. C<sub>p</sub> sıcaklıkla arttığı için sabit C<sub>p</sub> varsayımı alevi olduğundan sıcak gösterir.",
      formula: "ΔH(T) = ΔH(298 K) + ∫<sub>298</sub><sup>T</sup> ΔC<sub>p</sub>(T′) dT′",
      formulaNote: "CH₄ yanmasında (bütün türler gaz) ΔC<sub>p</sub> 298 K'de +9,90, 1000 K'de −4,69 J/(mol·K): işaret değiştirdiği için sabit ΔC<sub>p</sub> 5 kJ/mol yanılır.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvardır. <strong>01 · Kalorimetre</strong> gürültülü termometre okumaları üretir, saf ΔT'yi, geri uzatılmış ΔT'yi ve kalibrasyonla bulunan C'yi kartlarda kuramla karşılaştırır; <strong>Süreç</strong> menüsünde iki kahve fincanı ve dört bomba deneyi vardır. <strong>02 · Hess döngüleri</strong> katsayıları stokiyometri matrisinden kendisi bulur ve Born–Haber döngüsünü kurar. <strong>03 · Bağ enerjileri</strong> ortalama bağ entalpilerinden yapılan tahmini oluşum entalpilerinden gelen değerle karşılaştırır ve farkı hâl payı ile ortalama değer payına ayırır. <strong>04 · Sıcaklık ve yanma</strong> Kirchhoff yasasını, adyabatik alev sıcaklığını ve yakıtların enerji yoğunluğunu gösterir. R tuşu etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Termometre neden yanılır?",
        predict: "Varsayılan nötrleşmede (1,00 mol/L, 100 mL) yalnız suyun ısı sığasını ve en yüksek okumayı kullanırsan ΔH kaynak değer −55,83 kJ/mol'den ne kadar sapar? Isı salımı yavaşlarsa kalibrasyon hatayı yine götürür mü?",
        do: "01 · Kalorimetre sekmesinde kartları oku. Sonra Kusursuz yalıtım düğmesine bas. Ardından Sekmeyi sıfırla ve Yavaş tepkime düğmesine bas (τ = 60 s); durum satırını oku.",
        observe: "Saf yöntem −48,82 kJ/mol (−12,56 %), geri uzatma ve kalibrasyonla −55,85 kJ/mol (+0,03 %). Kusursuz yalıtımda saf sonuç −52,31'e (−6,31 %) çıkar. Yavaş tepkimede ölçülen ΔH −60,29 kJ/mol olur (+7,99 %); durum satırı deneyde +9,89 %, kalibrasyonda +1,52 % fazla ölçüm olduğunu ve kalibrasyonun bunu “tam götüremez” olduğunu söyler.",
        explain: "Saf hesap iki hata yapar: kabın 30 J/K'lik ısı sığasını atlar (C % 6,69 küçük) ve odaya kaçan ısıyı yok sayar (en uç okuma % 7,73 küçük). Geri uzatma 1/(1 − kτ) kadar fazla ölçer: kτ = 0,015'te % 1,52, kτ = 0,09'da % 9,89. Isıtıcının 20 s'lik dikdörtgen atımı τ'ya bağlı değildir, payı % 1,52'de kalır; yavaş tepkimede sapmalar sadeleşmez. Beklenen kalıntı 1,0989/1,0152 − 1 ≈ +8,2 %'tir: durum satırındaki gürültüsüz ikiz ölçüm +8,22 % verir, tohum 1'in gürültüsü bunu +7,99 %'e çeker.",
      },
      {
        title: "Hatalı bir veri sonuca nasıl taşınır?",
        predict: "Metanın oluşum entalpisini üç yanma tepkimesinden kurarken metan yanmasının ΔH'sine +10 kJ hata karışırsa sonuç ne kadar ve hangi yöne kayar?",
        do: "02 · Hess döngüleri sekmesinde Hedef tepkime olarak “C(grafit) + 2H₂ → CH₄” seç, katsayıları oku. Hatalı veri menüsünden 3. tepkimeyi seç (Eklenen hata δ = +10 kJ). Sonra hedefi Born–Haber yap ve Born üssü n'yi 7 ve 9'a getir.",
        observe: "Katsayılar +1,000; +2,000; −1,000; 0,000 (4. tepkime gereksiz), iki yol −74,60 kJ/mol. Bozmayla Hess yolu −84,60 olur, kayma −10,000 kJ = c₃·δ. Born–Haber döngüsü 787,2 kJ/mol verir; Born–Landé n = 8'de 753,3, n = 7'de 738,0, n = 9'da 765,3; Kapustinskii 745,9 kJ/mol.",
        explain: "Metan yanması ters çevrilerek (c₃ = −1) kullanıldığı için +10 kJ'lik hata sonuca −10 kJ olarak geçer; katsayısı +2 olan bir verinin hatası iki katına çıkardı. Born üssü sonuca yalnız (1 − 1/n) çarpanıyla girer, yine de 7'den 9'a geçiş 27,3 kJ/mol fark yaratır.",
      },
      {
        title: "Bağ enerjileri nerede yanılır?",
        predict: "Ortalama bağ entalpileriyle metanın yanma entalpisini tahmin edersen gerçek gaz fazı değerinden daha mı ekzotermik, daha mı az ekzotermik bulursun?",
        do: "03 · Bağ enerjileri sekmesinde Hazır tepkime “CH₄ yanması” iken kartları oku. Sonra Oluşum yolunda suyun hâli menüsünde Sıvı'yı seç. Son olarak Hazır tepkimeyi “CO + 2H₂ → CH₃OH” yap.",
        observe: "Kırılan 2656 kJ, oluşan 3338 kJ, tahmin −682 kJ/mol; gaz fazında ΔH° −802,55 kJ/mol, fark +120,55 kJ. Durum satırına göre en büyük pay CO₂'den (+126,5 kJ). Su sıvı seçilince ΔH° −890,57 kJ/mol, hâl payı −88,02 kJ. Metanol sentezinde tahmin −107, oluşum yolu −90,48 kJ/mol.",
        explain: "Tahmin az ekzotermik çıkar, çünkü CO₂'deki iki C=O bağı ortalama değerden güçlüdür: molekül tablosunda Σ D = 1482 kJ, atomlaşma 1608,53 kJ (−7,9 %). Bağ entalpileri yalnız gazlar için tanımlıdır; 88,02 kJ, iki mol suyun yoğuşma ısısıdır (2 × 44,01). Metanol örneği OpenStax'ın Örnek 7.9'udur.",
      },
      {
        title: "Sıcaklık ΔH'yi ve alevi nasıl değiştirir?",
        predict: "Metanın gaz fazı yanma entalpisi 1000 K'de 298 K'dekinden daha mı negatif olur? Sabit ısı sığasıyla hesaplanan alev sıcaklığı gerçeğinden yüksek mi, düşük mü çıkar?",
        do: "04 · Sıcaklık ve yanma sekmesinde Kirchhoff bölümünü varsayılanla oku (T = 1000 K, N = 2), sonra Simpson aralık sayısı N'yi 4 yap. Adyabatik alev bölümünde Metan CH₄ ve hava ile oku, sonra Yakıcı'yı Saf O₂ yap.",
        observe: "ΔH(298) −802,30, 1000 K'de kapalı biçim −800,484 kJ/mol; Simpson N = 2 hatası 219 J/mol, N = 4'te 20,4 J/mol (oran 10,8). Sabit ΔCp −795,357 verir (+5,13 kJ/mol yanlış). Alev 2323,6 K (2050,5 °C), sabit Cp(298) ile 2775 K; Wikipedia tablosu 1963 °C, fark +87 K. Saf O₂'de 5206,9 K.",
        explain: "ΔCp 298 K'de pozitif, 1000 K'de negatiftir; ΔH önce az değişir, sonra geri döner. Simpson hatası N⁻⁴ gibi küçülür (ideal oran 16), ama O₂'nin 700 K'deki Shomate sınırında Cp'nin eğimi sıçradığından oran sapar. Cp sıcaklıkla arttığından sabit Cp alevi fazla ısıtır. Model ayrışmayı hesaplamaz, sonuç bir üst sınırdır; saf O₂'de bu sınır gerçekçi olmaktan çıkar.",
      },
    ],
  },
  wow: [
    {
      title: "Isı vermeden yürüyen tepkime",
      body:
        "Thomsen ve Berthelot, kendiliğinden olan her kimyasal değişimin ısı verdiğine inanıyordu. Sayfadaki ikinci kahve fincanı deneyi bunun tersini gösterir: 8,0 g amonyum nitrat 100 mL suda kendiliğinden çözünür ve suyu yaklaşık 5,9 K soğutur; ölçülen ΔH +28,04 kJ/mol'dür. Bir sürecin yönünü ısı değil, entropiyi de hesaba katan serbest enerji belirler; Helmholtz bunu 1882'de en büyük iş kavramıyla gösterdi.",
    },
    {
      title: "Hiç ölçülmemiş bir sayı, iki ders kitabı değeri",
      body:
        "NaCl'nin örgü entalpisi hiçbir kalorimetrede doğrudan ölçülemez. OpenStax Chemistry 2e'nin 7.5 bölümü, kaynak belirtmeden 769 kJ der. Oysa aynı kitabın Ek G'sindeki üç oluşum entalpisi (Na(g), Cl(g), NaCl), Wikipedia'daki sodyum iyonlaşma enerjisi (495,8 kJ/mol) ve klor elektron ilgisiyle (348,575 kJ/mol) kurulan Born–Haber döngüsü 787,2 kJ/mol verir; Wikipedia'nın deneysel değeri de 787'dir. 0 K ile 298 K verilerini karıştırmanın getirdiği düzeltme yalnız birkaç kJ/mol'dür, 18 kJ'lik farkı açıklamaz. 769'un nereden geldiğini kitap söylemez; sayfa da bir neden uydurmaz, kartta “metin kaynağını belirtmez” yazar.",
    },
    {
      title: "Hidrojenin kilogramı ağır, litresi hafif",
      body:
        "Hidrojen kilogram başına 141,8 MJ ile metandan 2,55 kat, etanolden 4,78 kat fazla enerji taşır. Ama −253 °C'ye (20 K) soğutulup sıvılaştırıldığında bile yoğunluğu yalnız 70,85 kg/m³'tür: litresi 10,05 MJ, etanolün 23,42 MJ'sinin 0,429 katıdır. Bir otomobil deposu ya da bir roket tankı için hangi ölçünün önemli olduğu, hidrojenin neden hem en umut verici hem en zor yakıt olduğunu açıklar.",
    },
  ],
  worked: {
    title: "Bomba kalorimetresinde metanol: ΔU'dan ΔH'ye",
    prompt:
      "Bomba kalorimetresi 1,000 g benzoik asitle kalibre ediliyor (ΔcH° = −3226,86 kJ/mol, M = 122,123 g/mol, Δn<sub>gaz</sub> = −0,5). Kalibrasyonda geri uzatılmış ΔT = 2,552 K. Ardından 1,000 g sıvı metanol (M = 32,042 g/mol) yakılıyor, geri uzatılmış ΔT = 2,187 K. Metanolün ΔcU'sunu ve ΔcH°'sini 298,15 K'de bul.",
    steps: [
      "Kalibrasyon maddesinin bombadaki ısısı ΔU ile verilir: ΔU = ΔH − Δn·RT = −3226,86 kJ/mol − (−0,5)(8,314 J/(mol·K))(298,15 K) = −3226,86 + 1,239 = −3225,62 kJ/mol. n = 1,000 g / 122,123 g/mol = 8,1885 mmol, salınan ısı Q = 8,1885 × 10⁻³ mol × 3225,62 kJ/mol = 26,413 kJ.",
      "Kalorimetre sabiti: C = Q/ΔT = 26 413 J / 2,552 K ≈ 10 350 J/K. Sayfa yuvarlanmamış ΔT ile 10 348,1 J/K gösterir; kuramsal değer (2000 g su × 4,184 J/(g·K) + 2000 J/K) 10 368,0 J/K'dir, fark −0,19 %.",
      "Metanol: n = 1,000 / 32,042 = 31,209 mmol. Kalorimetrenin aldığı ısı q = 10 348,1 J/K × 2,187 K ≈ 22 631 J. Sistem bu ısıyı vermiştir: ΔU = −22,631 kJ / 0,031209 mol ≈ −725,2 kJ/mol (sayfa: −725,20 kJ/mol).",
      "Tepkime CH₃OH(s) + 1½O₂(g) → CO₂(g) + 2H₂O(s); gaz molleri 1,5'ten 1'e iner, Δn<sub>gaz</sub> = −0,5. ΔH = ΔU + Δn·RT = −725,20 + (−1,239) = −726,44 kJ/mol.",
      "Karşılaştır: Ek G'de sıvı metanolün oluşum entalpisi −239,2 kJ/mol'dür, ΔcH° = −393,51 + 2(−285,83) − (−239,2) = −725,97 kJ/mol. Ölçüm +0,06 % farklıdır (0,47 kJ/mol). Δn·RT düzeltmesi (1,239 kJ/mol) bu farkın iki buçuk katından büyüktür: atlanıp ΔU doğrudan ΔH sayılsaydı sonuç −725,20 olur, kaynaktan 0,77 kJ/mol ve ters yönde ayrılırdı.",
    ],
    result:
      "ΔcU ≈ −725,2 kJ/mol, ΔcH° ≈ −726,4 kJ/mol (kaynak −725,97). Bomba sabit hacimde ΔU ölçer; ΔH'ye geçmek için gaz mollerindeki değişim kadar RT eklenir. Sayfada Süreç menüsünden “Metanol (sıvı) yanması”nı seçip son iki kartı oku.",
  },
  misconceptions: [
    {
      myth: "Bağ kırmak enerji açığa çıkarır.",
      truth:
        "Bağ kırmak her zaman enerji ister; enerji, yeni bağlar kurulurken açığa çıkar. Metan yanmasında 2656 kJ harcanarak bağlar kırılır, 3338 kJ geri alınarak yenileri kurulur; tepkimenin ekzotermik olmasının nedeni oluşan bağların daha güçlü olmasıdır. 03 · Bağ enerjileri sekmesindeki basamak çizelgesi bunu bir tepe ve daha derin bir vadi olarak gösterir.",
    },
    {
      myth: "Termometrenin gösterdiği en yüksek değer gerçek sıcaklık değişimidir.",
      truth:
        "En yüksek okuma geldiğinde ısının bir kısmı odaya kaçmıştır; ısı salımı da anlık değildir. Varsayılan nötrleşmede en uç okuma +5,834 K, geri uzatılmış değer +6,323 K'dir. Doğru yöntem soğuma kuyruğunu t = 0'a geri uzatmak ve kalorimetreyi bilinen bir ısıyla kalibre etmektir.",
    },
    {
      myth: "Kendiliğinden olan her tepkime ısı verir.",
      truth:
        "Thomsen–Berthelot ilkesi tam bunu söylüyordu ve yanlış çıktı. Amonyum nitratın suda çözünmesi ısı alır (+28,04 kJ/mol) ama kendiliğinden yürür. Yönü ΔH değil, ΔG = ΔH − TΔS belirler; düzensizliği artan süreçler ısı alarak da ilerleyebilir.",
    },
    {
      myth: "Sayfadaki Hess yolu ile oluşum yolunun aynı çıkması Hess yasasını kanıtlar.",
      truth:
        "İki yol aynı Ek G tablosundan hesaplandığı için aynı çıkmak zorundadır; farkları yalnız 0,01 kJ'e yuvarlamadan gelir. Bu bir tutarlılık sınamasıdır. Yasanın deneysel sınaması, basamakların ayrı ayrı ölçülüp toplamın doğrudan ölçümle karşılaştırılmasıdır. Sayfanın kalorimetresi de okumalarını aynı tablodan ürettiği için bunu yapamaz; Hess'in kendisi 1840'ta bunu gerçek ölçümlerle yaptı.",
    },
  ],
  glossary: [
    { term: "Entalpi (H)", definition: "H = U + PV; sabit basınçta bir sistemin aldığı ısı, entalpisindeki değişime eşittir (q<sub>p</sub> = ΔH)." },
    { term: "Hâl fonksiyonu", definition: "Değeri yalnız sistemin o anki hâline bağlı olan, oraya hangi yoldan gelindiğine bağlı olmayan nicelik; iç enerji, entalpi, entropi." },
    { term: "Standart oluşum entalpisi", definition: "Bir mol maddenin standart koşullarda, en kararlı hâlindeki elementlerinden oluşurken entalpisindeki değişim; elementler için sıfırdır." },
    { term: "Kalorimetre sabiti", definition: "Kalorimetrenin (su, kap, termometre, bomba) toplam ısı sığası C, J/K; bilinen bir ısıyla kalibre edilerek ölçülür." },
    { term: "Geri uzatma", definition: "Karıştırmadan sonraki soğuma okumalarına üstel bir eğri uydurup karıştırma anına uzatarak ısı kaybını düzelten yöntem." },
    { term: "Örgü entalpisi", definition: "Bir mol iyonik katıyı birbirinden sonsuz uzaklıkta gaz iyonlarına ayırmak için gereken entalpi; doğrudan ölçülemez, Born–Haber döngüsüyle kurulur." },
    { term: "Ortalama bağ entalpisi", definition: "Gaz hâlindeki moleküllerde belirli bir bağı koparmanın birçok molekül üzerinden ortalaması alınmış bedeli; C–H için 415 kJ/mol." },
    { term: "Adyabatik alev sıcaklığı", definition: "Yanmanın ısısı dışarı kaçmadan yalnız ürünleri ısıttığında ulaşılan sıcaklık; ayrışma hesaba katılmazsa bir üst sınırdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede termokimya bir tablo ve bir toplamadır; üniversitede, <strong>Genel Kimya</strong>'dan sonra <strong>Fizikokimya</strong> (kimyasal termodinamik) dersinde, hâl fonksiyonlarının tam diferansiyel olduğunu görürsün: dH = T dS + V dP. Hess yasası bu tam diferansiyelin bir döngü üzerindeki integralinin sıfır olmasıdır; Kirchhoff yasası ise (∂H/∂T)<sub>P</sub> = C<sub>p</sub> tanımının tepkimeye uygulanmasıdır. Aynı derste ΔH'nin yanına ΔS ve ΔG gelir; kendiliğindenliği ΔG belirler, sıcaklığa bağlılığı van 't Hoff denklemiyle denge sabitine taşınır. Oluşum entalpilerini bir matrisle birleştirmek, kimya mühendisliğinin <strong>enerji denkliği</strong> hesaplarının da temelidir.",
      "Sayfanın sınırları bir sonraki adımı gösterir. Gerçek bir kalorimetre birden fazla ısıl kütledir ve karışma anlık değildir; hassas ölçümler daha ayrıntılı modellerle düzeltilir. Gerçek bir alevde CO₂ ve H₂O kısmen ayrışır; alev sıcaklığı bu yüzden kimyasal dengeyle birlikte hesaplanır ve sayfadaki değerden düşüktür. Bağ entalpileri ve örgü enerjileri ise kuantum kimyası hesaplarıyla, ortalama değerlere başvurmadan tek tek bulunabilir. İstatistik termodinamik, Shomate polinomlarının taklit ettiği C<sub>p</sub>(T) eğrilerini moleküllerin titreşim ve dönme düzeylerinden türetir.",
    ],
    topics: ["Kimyasal termodinamik", "Tam diferansiyeller ve hâl fonksiyonları", "Gibbs enerjisi ve denge", "Kirchhoff ve van 't Hoff denklemleri", "Yanma ve kimyasal denge", "Enerji denkliği", "İstatistik termodinamik"],
  },
  quiz: [
    {
      question: "Metanolün sentezini (CO + 2H₂ → CH₃OH(g)) dört tepkimeden kurarken H₂ yanmasının katsayısı +2 çıkıyor. Bu tepkimenin ΔH'sinde +10 kJ hata varsa sonuç ne kadar kayar?",
      options: ["+10 kJ", "+20 kJ", "−20 kJ", "Kaymaz; Hess yasası hatayı sadeleştirir"],
      answer: 1,
      explanation: "ΔH<sub>hedef</sub> = Σ cᵢ·ΔHᵢ doğrusal olduğu için bir verideki δ hatası cᵢ·δ olarak geçer: 2 × (+10) = +20 kJ. Ters çevrilerek kullanılan (cᵢ = −1) bir tepkimenin hatası ise işaret değiştirir. Sayfada Hatalı veri menüsüyle bunu doğrudan görebilirsin.",
    },
    {
      question: "Etanol bomba kalorimetresinde yakılıyor: C₂H₅OH(s) + 3O₂(g) → 2CO₂(g) + 3H₂O(s). 298 K'de ΔH ile ΔU arasındaki ilişki nedir?",
      options: ["ΔH = ΔU, çünkü ikisi de yanma ısısıdır", "ΔH, ΔU'dan yaklaşık 2,48 kJ/mol daha negatiftir", "ΔH, ΔU'dan yaklaşık 2,48 kJ/mol daha pozitiftir", "ΔH, ΔU'dan yaklaşık 7,4 kJ/mol daha negatiftir"],
      answer: 1,
      explanation: "Gaz molleri 3'ten 2'ye iner: Δn<sub>gaz</sub> = −1. ΔH − ΔU = Δn·RT = −1 × 8,314 × 298,15 J/mol ≈ −2,48 kJ/mol. Sıvı su sayılmaz; yalnız gazlar hacim işi yapar. Sabit basınçta atmosfer küçülen gaz hacmini sıkıştırırken sisteme iş yapar, bu da ΔH'yi daha negatif kılar.",
    },
    {
      question: "Gaz fazında CH₄ yanmasında ΔC<sub>p</sub>(298 K) = +9,90 J/(mol·K). ΔC<sub>p</sub>'yi sabit sayarak 298,15 K'den 1000 K'e geçersen ΔH = −802,30 kJ/mol ne olur?",
      options: ["Yaklaşık −809,2 kJ/mol", "Yaklaşık −795,4 kJ/mol", "Değişmez: ΔH sıcaklıktan bağımsızdır", "Yaklaşık −792,4 kJ/mol"],
      answer: 1,
      explanation: "ΔH(T) = ΔH(298) + ΔC<sub>p</sub>(T − 298,15) = −802,30 + 9,90 × 701,85 / 1000 ≈ −802,30 + 6,95 = −795,35 kJ/mol; sayfa −795,357 gösterir. Ama gerçek ΔC<sub>p</sub> 1000 K'de −4,69 J/(mol·K)'e iner, Shomate integrali −800,484 verir: sabit ΔC<sub>p</sub> varsayımı 5,13 kJ/mol yanılır.",
    },
  ],
  next: [
    { href: "termodinamik.html", title: "Termodinamik: PV Diyagramı, İş, Isı ve Çevrimler", why: "Birinci yasanın ve PΔV işinin kökü: bir gazı PV diyagramında yönet, ısı ile işi çevrim boyunca say." },
    { href: "kimyasal-denge-ve-gibbs-enerjisi.html", title: "Kimyasal Denge ve Gibbs Enerjisi: Q, K, ΔG ve Çözünürlük", why: "ΔH'nin tek başına yetmediği yer: ΔG° ile K arasındaki bağ ve ΔH'nin van 't Hoff denklemiyle dengeyi sıcaklıkla nasıl kaydırdığı." },
    { href: "denklem-denklestirme.html", title: "Kimyasal Denklem Denkleştirme: Atom Sayımı, Matris Yöntemi ve Stokiyometri", why: "Hess sekmesindeki stokiyometri matrisinin ilk kullanımı: atomları denkleştiren katsayılar A·v = 0 sisteminin çözümüdür." },
    { href: "kimya-muhendisligi.html", title: "Kimya Mühendisliği: Reaktör, Damıtma ve Isı Değiştirici", why: "Tepkime ısısının sanayideki karşılığı: reaktörleri karşılaştır ve bir ısı değiştiricide ısının akımlar arasında nasıl taşındığını izle." },
  ],
  sources: [
    { title: "OpenStax · Chemistry 2e, 5.3 Enthalpy", url: "https://openstax.org/books/chemistry-2e/pages/5-3-enthalpy", note: "Entalpinin hâl fonksiyonu olması, ΔH = ΔU + PΔV = q<sub>p</sub>, Hess yasası ve standart oluşum entalpileri (İngilizce, açık ders kitabı; Ek G tablosu aynı kitapta)." },
    { title: "OpenStax · Chemistry 2e, 7.5 Strengths of Ionic and Covalent Bonds", url: "https://openstax.org/books/chemistry-2e/pages/7-5-strengths-of-ionic-and-covalent-bonds", note: "Ortalama bağ entalpileri tablosu, Örnek 7.9 (−107 ve −90,5 kJ), örgü entalpisi ve CsF için Born–Haber döngüsü (İngilizce)." },
    { title: "Wikipedia · Calorimeter", url: "https://en.wikipedia.org/wiki/Calorimeter", note: "Black'in 1761'deki gizli ısı fikri, Lavoisier ve Laplace'ın 1782–83 buz kalorimetresi, kahve fincanı ve benzoik asitle kalibre edilen bomba kalorimetresi (İngilizce)." },
    { title: "NIST Chemistry WebBook", url: "https://webbook.nist.gov/chemistry/", note: "Sayfanın Kirchhoff ve alev hesaplarında kullandığı Shomate ısı sığası katsayıları ve oluşum entalpileri (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
