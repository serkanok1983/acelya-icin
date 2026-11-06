window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tork-denge"] = {
  slug: "tork-denge",
  title: "Tork ve Denge: Kaldıraçtan Kayan Merdivene",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir kuvvetin döndürme gücü, büyüklüğü kadar nereye bindiğine de bağlıdır. Kaldıracı dengele, tahtanın nerede devrildiğini bul, merdivenin hangi basamakta kaydığını ölç: hepsi iki denklemle, ΣF = 0 ve Στ = 0.",
  hook:
    "Kaygan bir duvara yaslanmış merdivenin tam ortasında ister 75 kiloluk bir yetişkin dursun ister 30 kiloluk bir çocuk, merdivenin kaymaya ne kadar yakın olduğu değişmez. En üst basamaklarda ağır olan kaydırır; alt basamaklarda ise ağırlık merdiveni sabitler. Bir kuvvetin ne yapacağını büyüklüğü mü söyler, yoksa nereye bindiği mi?",
  bigIdea:
    "Bir katı cisim, kuvvetlerin toplamı ve herhangi bir noktaya göre torkların toplamı sıfırsa dengededir; tork kuvvet ile kolunun çarpımıdır, <em>τ = r × F</em>, ve denge bozulduğunda cismin ne çabuk döneceğini eylemsizlik momenti belirler: <em>Iα = Στ</em>.",
  story: [
    "Kaldıraç Arşimet'ten önce de biliniyordu. Aristoteles'in okulundan çıkan <em>Mekanik Problemler</em>, yükü dayanağa yakın, kuvveti uzak tutmanın işe yaradığını anlatıyor ve bunu kabaca gerekçelendiriyordu. Yasayı kesin bir matematik diliyle ispatlayan, MÖ 3. yüzyılda Sicilya'daki Siraküza'da yaşayan Arşimet oldu. <em>Düzlemlerin Dengesi Üzerine</em> adlı iki kitaplık eserinin birincisi yedi postüla ve on beş önermeden oluşur; 6. ve 7. önermeler, dayanaktan uzaklıklarıyla ters orantılı iki ağırlığın dengede kaldığını kanıtlar. Arşimet bunu bugün hâlâ kullandığımız bir kavrama dayandırdı: <strong>ağırlık merkezi</strong>. Birinci kitabın geri kalanı paralelkenarın, üçgenin ve yamuğun ağırlık merkezini bulur. Ernst Mach 1883'te ispatın, kanıtlamak istediği sonucu örtük olarak varsaydığını öne sürdü; E. J. Dijksterhuis gibi tarihçiler bu eleştiriyi reddeder. Ünlü 'Bana bir dayanak noktası verin, Dünya'yı yerinden oynatayım' sözünü ise Arşimet'ten beş yüzyıldan uzun süre sonra yaşayan İskenderiyeli Pappus aktarır. Plutarkhos, Kral II. Hieron'un meydan okuması üzerine Arşimet'in bir gemiyi makara düzeneğiyle yerinden oynattığını yazar. Bu anlatımlar birbirini tutmaz ve olanaksız ayrıntılarla doludur: kanıt değil, efsanedir.",
    "Statiğe yeni bir dil on sekiz yüzyıl sonra Hollanda'dan geldi. Brugge'lu mühendis Simon Stevin 1586'da Leiden'de, Felemenkçe yazdığı <em>De Beghinselen der Weeghconst</em>'u (Tartma Sanatının İlkeleri) yayımladı. Kitap kaldıracı ve ağırlık merkezini ele alıyor, eğik düzlem için de bir düşünce deneyi öneriyordu: üçgen bir prizmanın üstüne, eşit aralıklı on dört toptan oluşan kapalı bir zincir, bir 'top çelengi' asılır. Uzun yüz kısa yüzün iki katıdır; uzun yüzde dört top, kısa yüzde iki top durur. Zincir kendiliğinden dönseydi her an aynı görünümde kalır ve sonsuza dek dönerdi; bu olanaksız olduğuna göre zincir durur. Alttaki simetrik sarkık kısım kesilip atılsa da denge bozulmaz: dört top iki topu dengeler. Demek ki eğik düzlemde ağırlığın eğim boyunca bileşeni eğimin sinüsüyle küçülür; bu, kuvvetlerin bileşenlere ayrılmasının ilk açık kanıtlarından biridir. Dijksterhuis'e göre Stevin, enerjinin korunumunu adı konmasından çok önce sezgiyle kullanmıştı. Stevin şeklin altına 'Wonder en is gheen wonder' (Mucize gibi görünen mucize değildir) yazdı ve şekli bir tür imza gibi kullandı. Bugün 'Stevin'in mezar yazıtı' diye anılır, ama Stevin'in mezar taşı hiç bulunmadı.",
    "Denge bozulunca ne olur? Statik bu soruyu cevaplamaz; cevap 17. ve 18. yüzyılda geldi. Christiaan Huygens 1673'te bir pimden sarkan katı cismin, yani <strong>fiziksel sarkacın</strong> salınımını incelerken, kütleler ile eksene uzaklıklarının karelerinin çarpımlarını toplayan bir nicelik kullandı. Leonhard Euler 1765'te <em>Theoria motus corporum solidorum seu rigidorum</em> (Katı Cisimlerin Hareket Kuramı) adlı kitabında ona bugünkü adını verdi: <em>momentum inertiae</em>, eylemsizlik momenti. Böylece Arşimet'in terazisi bir hareket denklemine dönüştü: net tork sıfırsa cisim dengede kalır, değilse eylemsizlik momentiyle ters orantılı bir açısal ivme kazanır. Bu sayfanın üç sekmesi aynı yolu izler: kaldıraçta Στ = 0'dan Iα = Στ'ya, iki destekli tahtada desteklerin neyi taşıyıp neyi taşıyamayacağına, merdivende de sürtünmenin koyduğu sınıra.",
  ],
  core: [
    {
      heading: "Tork: kuvvet, kol ve açı",
      body:
        "Bir kapıyı kolundan itersen kolayca açılır, menteşenin dibinden itersen kıpırdamaz. Kuvvet aynı, sonuç farklı: dönme etkisini kuvvetin büyüklüğü ile dönme ekseninden kuvvetin doğrultusuna olan dik uzaklığın, yani <strong>kuvvet kolunun</strong> çarpımı belirler. Bu çarpıma <strong>tork</strong> denir; mühendislikte aynı niceliğe moment de denir. Vektör dilinde tork, eksenden kuvvetin uygulandığı noktaya giden r vektörü ile kuvvetin vektörel çarpımıdır ve sağ el kuralıyla dönme eksenini gösterir. Düzlemde bir işaret yeter: sayfa saat yönünün tersini (↺) pozitif sayar, bu yüzden desteğin x kadar sağındaki m kütlesinin torku τ = −mgx olur. Doğrultusu eksenden geçen bir kuvvetin kolu ve torku sıfırdır. Birim N·m'dir; joule ile aynı boyutta olsa da tork bir enerji değil, dönmeye zorlamanın ölçüsüdür. Kiriş eğildiğinde ağırlıkların kolları x·cos θ'ya kısalır; sayfa hareket sırasında Στ(θ) = −Mgd·cos θ yazar.",
      formula: "τ = r × F,   |τ| = rF·sin φ = r<sub>⊥</sub>F",
      formulaNote: "φ, r ile F arasındaki açı; r<sub>⊥</sub> = r·sin φ kuvvet koludur. φ = 0 ya da 180° ise kuvvet ekseni hedef alır ve tork sıfırdır.",
    },
    {
      heading: "İki denge koşulu ve pivotu seçme özgürlüğü",
      body:
        "Katı bir cisim için denge iki koşul ister: kuvvetlerin vektörel toplamı sıfır olmalı ki kütle merkezi ivmelenmesin, torkların toplamı sıfır olmalı ki cisim dönmeye başlamasın. Birincisi tek başına yetmez: direksiyonu bir elinle yukarı, öbür elinle aşağı itersen net kuvvet sıfırdır ama direksiyon döner. Kuvvetlerin toplamı sıfırsa torkların toplamı hangi noktaya göre hesaplanırsa hesaplansın aynı çıkar; bu yüzden pivotu istediğin yere koyabilirsin, cismin gerçekten o nokta çevresinde dönmesi gerekmez. Akıllıca seçim, bilinmeyen bir kuvvetin uygulandığı noktadır: o kuvvetin kolu sıfır olur ve denklemden düşer. Sayfanın kiriş sekmesi tam bunu yapar: R<sub>B</sub>'yi A'ya göre tork denkleminden, R<sub>A</sub>'yı kuvvet toplamından bulur ve B'ye göre torkları bağımsız bir denetim olarak yazar. Düzlemde üç denklem vardır (ΣF<sub>x</sub>, ΣF<sub>y</sub>, Στ); bilinmeyen sayısı üçü aşarsa statik tek başına çözemez.",
      formula: "ΣF = 0,   Στ<sub>P</sub> = 0;   τ<sub>P</sub> = τ<sub>O</sub> − r<sub>P</sub> × ΣF",
      formulaNote: "r<sub>P</sub>, P noktasının O'ya göre konumu. ΣF = 0 ise τ<sub>P</sub> = τ<sub>O</sub>: tork dengesi her noktaya göre aynıdır.",
    },
    {
      heading: "Ağırlık merkezi, devrilme ve kararlılık",
      body:
        "Düzgün bir yerçekimi alanında bir cismin bütün parçalarının ağırlık torkları, toplam ağırlık tek bir noktaya, <strong>ağırlık merkezine</strong> uygulanmış gibi toplanır. Kaldıraç bu yüzden tek bir soruya iner: ağırlık merkezi desteğin neresinde? Sayfa bunu d = x<sub>cm</sub> − x<sub>destek</sub> kartında gösterir; d = 0 ise Στ = 0'dır. İki destekli tahtada aynı fikir devrilmeyi açıklar: bir destek itebilir ama çekemez. Bütün yüklerin ortak ağırlık merkezi iki desteğin arasından çıkarsa dengede kalmak için tepkilerden biri eksiye düşmek zorunda kalır; bu olanaksız olduğundan tahta öbür destek üzerinde döner. Dengenin türünü, cisim biraz döndürülünce torkun ne yaptığı belirler: ağırlık merkezi pimin altındaysa tork geri çağırır (kararlı, sarkaç gibi), üstündeyse devirir (kararsız), tam pimin üstündeyse her açıda sıfırdır (nötr). Sayfadaki pim kirişin ekseninden geçer; dengedeki kiriş bu yüzden nötrdür. Teraziler ise pimi kolun ağırlık merkezinin biraz üstüne koyar: kefeler eşitken itilen kol yataya geri döner.",
      formula: "x<sub>cm</sub> = Σm<sub>i</sub>x<sub>i</sub> / Σm<sub>i</sub>,   Στ = −Mg·d·cos θ",
      formulaNote: "M toplam kütle, d = x<sub>cm</sub> − x<sub>destek</sub>, θ kirişin yatayla açısı. Kaldıraçta denge için d = 0 yeter; iki destekli tahtada ortak ağırlık merkezi destekler arasında kalmalıdır.",
    },
    {
      heading: "Eylemsizlik momenti, paralel eksen ve Iα = Στ",
      body:
        "Denge bozulunca net tork cismi döndürür; ne kadar çabuk döndüreceğini kütlenin kendisi değil, eksene göre nasıl dağıldığı belirler. Her kütle parçası eksene uzaklığının karesiyle katkı verir: <strong>eylemsizlik momenti</strong> I = Σmr². Aynı kütleleri dışarı kaydırmak I'yı bu yüzden hızla büyütür. Düzgün bir çubuğun ortasına göre I = ML²/12'dir; ekseni ağırlık merkezinden h kadar kaydırırsan <strong>paralel eksen teoremi</strong> Mh² ekler. Sabit eksenli dönmede Newton'un ikinci yasasının karşılığı Iα = Στ'dur. Sayfa, yatay tutulup bırakılan kirişin ilk açısal ivmesini α₀ = Στ/I ile hesaplar ve benzetimden ölçtüğüyle karşılaştırır. Aynı hareketten şaşırtıcı bir sonuç çıkar: bırakıldığı an ağırlık merkezi d·α₀ ivmesiyle aşağı hızlanır, bu yüzden pim ağırlığın tamamını taşımaz: N₀ = Mg(1 − Md²/I). Tek bir noktasal kütlede I = Md² olduğundan N₀ = 0'dır ve kütle ilk anda serbest düşer. Dayanağa varış hızı enerjiden gelir: ½Iω² = Mg|d|·sin θ.",
      formula: "I = Σm<sub>i</sub>r<sub>i</sub>²,   I = I<sub>cm</sub> + Mh²,   Iα = Στ",
      formulaNote: "Sayfadaki kirişin pime göre momenti M<sub>k</sub>L²/12 + M<sub>k</sub>(L/2 − x<sub>destek</sub>)²: ilk terim kendi ortasına göre, ikincisi paralel eksen kayması.",
    },
    {
      heading: "Sürtünmeyle sınırlı denge: merdiven problemi",
      body:
        "Statik sürtünme bir eşitlik değil, bir eşitsizliktir: zemin kaymayı önlemek için ne gerekiyorsa onu verir, ama en çok μ<sub>s</sub>N kadar. Sürtünmesiz bir duvara yaslı merdivende zeminin dik tepkisi N<sub>zemin</sub>, zemindeki sürtünme f, duvarın yatay tepkisi N<sub>duvar</sub> ve iki ağırlık vardır: ortada merdivenin mg'si, ayaktan dL uzakta kişinin Mg'si. Dikey denge N<sub>zemin</sub> = (m + M)g, yatay denge f = N<sub>duvar</sub> verir. Torku ayağa göre alınca N<sub>zemin</sub> ve f denklemden düşer: N<sub>duvar</sub>·L sin θ = gL cos θ (m/2 + Md). L sadeleşir; merdivenin boyu sonuçta yoktur. Kaymama koşulu f ≤ μ<sub>s</sub>N<sub>zemin</sub> bir en küçük açı verir. Kişinin etkisi inceliklidir: kütlesi hem f'yi (koluyla) hem de N<sub>zemin</sub>'i, dolayısıyla μ<sub>s</sub>N'yi büyütür. Gereken katsayının M'ye göre türevi m(d − ½) ile aynı işaretlidir: kişi ortanın üstündeyse ağırlığı kaymayı kolaylaştırır, tam ortadaysa etkisizdir, altındaysa merdiveni sabitler. Çok ağır bir kişide merdivenin kendi ağırlığı önemsizleşir ve kritik oran d* = μ<sub>s</sub>·tan θ'ya yaklaşır.",
      formula: "f = g(m/2 + Md)/tan θ ≤ μ<sub>s</sub>(m + M)g   ⇒   tan θ<sub>min</sub> = (m/2 + Md) / (μ<sub>s</sub>(m + M))",
      formulaNote: "Kişi yokken ya da tam ortadayken tan θ<sub>min</sub> = 1/(2μ<sub>s</sub>): μ<sub>s</sub> = 0.40 için 51.34°. Aynı koşul d için çözülünce d* = (μ<sub>s</sub>(m + M)·tan θ − m/2)/M.",
    },
  ],
  lab: {
    intro:
      "Sayfanın üç sekmesi var; bağlantının sonuna <code>#kaldirac</code>, <code>#kiris</code> ya da <code>#merdiven</code> ekleyerek doğrudan birini açabilirsin. Her sekmenin bir <strong>Hazır düzen</strong> menüsü, kaydırıcıları ve tuvalde sürüklenebilen cisimleri vardır; elle yapılan her değişiklik menüyü 'Özel ayar'a çevirir. İşaret kuralı: saat yönünün tersine dönme (↺) ve yukarı kuvvet pozitif, g = 9.81 m/s². <strong>Kaldıraç</strong>: kiriş uzunluğu ve kütlesi, destek konumu, bir ile üç arası kütle ve Sönüm kutusu. <em>Serbest bırak</em> kirişi yataydan bırakır; sayfa hareketi 1 ms'lik RK4 adımlarıyla hesaplar ve ilk açısal ivmeyi, bırakma anındaki pim tepkisini, ±20°'deki açı dayanağına varış hızını ve süresini 'Ölçülen | Kuram | Fark' tablosunda karşılaştırır. <strong>İki destekli kiriş</strong>: tahta, A ve B destekleri, bir kişi, isteğe bağlı bir kutu ve cıvata kutusu; <em>Kişiyi yürüt</em> kişiyi 0.5 m/s ile sağa yürütür ve cıvata yoksa bir tepki eksiye düştüğü anda durdurur. <strong>Merdiven</strong>: sürtünmesiz duvara yaslı merdiven; açı θ, zemin sürtünme katsayısı μ<sub>s</sub>, kişinin kütlesi ve ayaktan tırmanma oranı d; <em>Tırman</em> kayma başladığı anda durur. Kiriş ve merdivende sınır tabloları sayısal aramayı kapalı formülle yan yana koyar. Devrilme ve kayma canlandırılmaz: kesikli kırmızı bir tahta çerçevesi ya da hayalet merdiven yalnızca ne olacağını gösterir. Emin değilsen sayfayı yenile.",
    experiments: [
      {
        title: "Ağır taraf neden inmiyor?",
        predict:
          "Varsayılan düzende desteğin 0.60 m solunda 2 kg, 0.40 m sağında 3 kg var. Ağır taraf iner mi? Tek bir 1 kg'lık kütleyi yalnızca kirişin kendi ağırlığı dengeleyebilir mi? Kiriş kütlesiz olsaydı, bırakıldığı an pim kütleyi ne kadar kuvvetle tutardı?",
        do: "Kaldıraç sekmesinde Hazır düzen: Eşit torklar. Tork tablosunu ve Tork terazisini oku, Serbest bırak'a bas. Sonra 'Destek merkez dışında: kirişin ağırlığı' düzenini seç ve tabloyu oku. En sonda Kiriş kütlesi M<sub>k</sub>'yı 0'a çek ve Serbest bırak'a bas.",
        observe:
          "Torklar +11.77 ve −11.77 N·m, Στ = 0.00 N·m, x<sub>cm</sub> = 1.000 m; kiriş kıpırdamaz. İkinci düzende Kütle 1'in kolu −0.60 m (+5.89 N·m), kirişin kendi kolu +0.30 m (−5.89 N·m): yine Στ = 0.00. M<sub>k</sub> = 0'da Στ = +5.89 N·m olur; tablo α₀ için 16.35 / 16.35 rad/s², N₀ için 0.00 / 0.00 N yazar ve kiriş +20° dayanağına 0.2071 s'de, 3.3443 rad/s ile varır.",
        explain:
          "Dönmeyi ağırlık değil tork belirler: 2 kg × 0.6 m = 3 kg × 0.4 m = 1.2 kg·m. Kirişin ağırlığı ortasına binen bir kuvvettir; destek merkezde değilse onun da kolu vardır. Tek noktasal kütlede I = mr² olduğundan N₀ = Mg(1 − Md²/I) = 0: pim ilk anda hiçbir şey taşımaz ve kütle düşmeye g ile başlar, çünkü α₀·r = 16.35 × 0.60 = 9.81 m/s².",
      },
      {
        title: "Aynı tork, iki farklı dönüş",
        predict:
          "İki 'Aynı Στ' düzeninde de Στ = −3.92 N·m ve toplam kütle 5.0 kg. Kütleler dışarıdayken eylemsizlik momenti yaklaşık 3.6 kat büyükse kiriş dayanağa kaç kat geç varır: 3.6 kat mı, √3.6 kat mı? Bırakma anında pim tepkisi Mg = 49.05 N'dan büyük mü olur, küçük mü?",
        do: "Hazır düzen: Aynı Στ, kütleler içeride. Serbest bırak'a bas ve alt tabloyu oku. Sonra 'Aynı Στ, kütleler dışarıda'yı seçip yeniden bırak; grafikte önceki deneme gri noktalı çizgi olarak kalır. En sonda içeride düzenine dön, Sönüm kutusunu işaretle ve bir kez daha bırak.",
        observe:
          "I = 1.013 ve 3.613 kg·m². α₀ −3.872 ve −1.086 rad/s²; ölçülen kuramla aynı, Fark 0.00 %. N₀ 47.50 ve 48.62 N. Kiriş −20° dayanağına 0.4255 s'de 1.6275 rad/s ile, ötekinde 0.8034 s'de 0.8619 rad/s ile varır. Sönüm açıkken α₀ yine −3.872'dir, ama varış 0.4763 s'ye uzar, hız 1.2965 rad/s'ye düşer ve son iki satırın kuram sütunu '—' olur.",
        explain:
          "α = Στ/I: ivmelerin oranı 3.566, tam I oranı. Hareket denklemi θ̈ = −(Mgd/I)·cos θ olduğundan I'yı 3.566 katına çıkarmak zamanı √3.566 = 1.888 katına esnetir: 0.8034/0.4255 = 1.888. Varış hızı enerjiden gelir, ½Iω² = Mg|d|·sin 20°. N₀ Mg'den küçüktür, çünkü ağırlık merkezi bırakıldığı an aşağı ivmelenir; kütleler dışarıdayken bu ivme küçük olduğundan N₀ Mg'ye yaklaşır.",
      },
      {
        title: "Tahta ne zaman devrilir?",
        predict:
          "4 m'lik, 20 kg'lık tahta 0.50 m ve 3.00 m'deki desteklere oturuyor; sağ ucu B'den 1 m taşıyor. 60 kg'lık kişi sağa yürürse tahta tam B'nin üstünde mi devrilir, ötesinde mi? Tahta kütlesiz olsaydı? Cıvatalı bir destek toplam ağırlıktan fazlasını taşıyabilir mi?",
        do: "İki destekli kiriş sekmesinde Hazır düzen: Masadan taşan tahta. Tepki kartlarını ve sınır tablosunu oku, sonra Kişiyi yürüt'e bas. Ardından 'Hafif tahta (M = 0)' düzenine geçip x*'ı oku. En sonda 'Cıvatalı konsol (çıkma)' düzenini seç.",
        observe:
          "Başlangıçta R<sub>A</sub> = 313.9 N, R<sub>B</sub> = 470.9 N, toplamları ΣW = 784.8 N; sınır x* iki sütunda da 3.333 m. Yürüyüş 3.34 m'de durur: R<sub>A</sub> = −1.6 N, durum satırı 'Devrilir' der ve kesikli kırmızı çerçeve tahtanın B çevresinde döneceğini gösterir. M = 0'da x* = 3.000 m, tam B'nin üstü. Konsolda R<sub>A</sub> = −3302.7 N (cıvata aşağı çeker), R<sub>B</sub> = 4087.5 N.",
        explain:
          "B'ye göre tork: kişinin taşmadaki torkunu tahta ağırlığının B'nin öbür yanındaki 1.0 m'lik kolu dengeler: 588.6 N × (x* − 3.00 m) = 196.2 N × 1.0 m, x* = 3.333 m. O noktada bütün yüklerin ortak ağırlık merkezi tam B'nin üstündedir; daha ötede R<sub>A</sub> eksiye düşmek zorunda kalır, ama destek çekemez. Konsolda B'nin 0.60 m'lik kısa kolu, 3.50 m'deki yükü ancak ΣW'nin 5 katından büyük bir tepkiyle dengeler.",
      },
      {
        title: "Merdivende kim kaydırır?",
        predict:
          "5 m'lik, 15 kg'lık merdiven 60°'de, μ<sub>s</sub> = 0.40; 75 kg'lık kişi ortada. Kişi yukarı çıktıkça merdiven nerede kayar? Üst basamakta 30 kg'lık biri kaymıyorsa 100 kg'lık biri kaydırır mı? Kişi ortadayken ya da daha aşağıdayken ağırlık işe mi yarar, zarar mı verir?",
        do: "Merdiven sekmesinde Hazır düzen: Temel. Kartları oku ve Tırman'a bas. Sonra 'Üst basamakta hafif kişi (30 kg)' ile 'Üst basamakta ağır kişi (100 kg)' düzenlerini karşılaştır. En sonda Temel'e dön ve Kişinin kütlesi'ni 30 ile 120 kg arasında gezdir: önce d = 0.50'de, sonra d = 0.30'da.",
        observe:
          "Temel: N<sub>zemin</sub> = 882.9 N, f = N<sub>duvar</sub> = 254.9 N, μ<sub>s</sub>N = 353.2 N, gereken katsayı 0.289; d* = 0.7314 (3.66 m). Tırmanış d = 0.74'te durur: 356.8 N > 353.2 N, durum 'Kayar' der ve en az 60.3° ister. 65°'de 30 kg kaymaz (157.8 N < 167.8 N), 100 kg kayar (446.0 N > 428.7 N). d = 0.50'de katsayı her kütlede 0.289; d = 0.30'da 30 kg'da 0.212, 120 kg'da 0.186.",
        explain:
          "Ağırlık iki işi birden yapar: koluyla gereken f'yi, N<sub>zemin</sub>'i artırarak da μ<sub>s</sub>N'yi büyütür. Hangisinin kazandığını d seçer; gereken katsayının M'ye göre türevi m(d − ½) işaretlidir. Ortanın üstünde ağır kişi kaydırır, tam ortada kütle sadeleşir, altında ağırlık merdiveni sabitler. Kayma canlandırılmaz; kesikli kırmızı merdiven yalnızca yönünü gösterir.",
      },
    ],
  },
  wow: [
    {
      title: "Pisa'yı kurtaran tork",
      body:
        "Pisa Kulesi'nin temeli yumuşak bir zeminde yalnızca 3 metre derindedir; eğiklik 1990'da 5.5°'ye ulaştı ve kule 7 Ocak 1990'da ziyaretçilere kapatıldı. 1993'ten başlayarak kalkık tarafa toplam 870 ton kurşun karşı ağırlık kondu; onların torku kuleyi biraz doğrulttu. Kalıcı çözüm, kalkık tarafın altından 38 metreküp, yaklaşık 70 ton toprak çekmekti: zemin o tarafta oturdu, eğiklik 45 santimetre azaldı ve kule 1838'deki konumuna döndü. Yaklaşık 14 500 tonluk kule 15 Aralık 2001'de yeniden açıldı; bugünkü eğikliği 3.97°.",
    },
    {
      title: "Bir kitabı tutmak için 470 newton",
      body:
        "OpenStax'in College Physics kitabındaki örnekte ön kol yatay, dirsek dik açıyla bükülü: 2.50 kg'lık ön kolun ağırlık merkezi dirsekten 16 cm, eldeki 4.00 kg'lık kitap 38 cm uzakta. Pazı kası ise dirsekten yalnızca 4.0 cm ötede tutunur. Dirseğe göre tork dengesi kası 470 N ile çekmeye zorlar: taşınan 63.7 N'luk ağırlığın 7.38 katı; dirsek eklemi de 407 N ile bastırır. Vücudumuzun kaldıraçları kuvvetten değil hızdan yanadır: kas 1 cm kısaldığında el yaklaşık 9.5 cm (38/4) yükselir.",
    },
    {
      title: "Cambazın sırığı",
      body:
        "7 Ağustos 1974'te Philippe Petit, New York'taki İkiz Kuleler'in çatıları arasına gerdiği çelik telde, yaklaşık 400 metre yükseklikte 45 dakika kaldı ve sekiz kez gidip geldi. Elinde uzun bir denge sırığı vardı; kaynaklar boyunu 8 ile 9 metre, kütlesini 20 ile 25 kilogram arasında verir. Hangi değer alınırsa alınsın, ML²/12 sırığın ortasına göre eylemsizlik momentini 100 kg·m²'nin üstüne çıkarır: sayfadaki 'kütleler dışarıda' kirişinin (3.613 kg·m²) onlarca katı. Yana yatıran aynı tork bu yüzden çok daha küçük bir açısal ivme doğurur ve cambaza düzeltmek için zaman kalır.",
    },
  ],
  worked: {
    title: "4'e 1 kuralı ne kadar güvenli?",
    prompt:
      "5.0 m boyunda, 15 kg'lık düzgün bir merdiven sürtünmesiz bir duvara yaslanıyor; zeminle statik sürtünme katsayısı μ<sub>s</sub> = 0.40. 75 kg'lık biri en üst basamakta (d = 1). Yaygın güvenlik kuralı, merdivenin ayağını duvardan boyunun dörtte biri kadar uzağa koymayı söyler. (a) Kural hangi açıyı verir? (b) 75°'de zemin ve duvar tepkilerini, gereken sürtünmeyi ve gereken katsayıyı bul. (c) Kişi en üst basamakta hangi en küçük açıya kadar kaymaz?",
    steps: [
      "Açı: cos θ = (L/4)/L = 1/4, θ = arccos 0.25 = 75.5°. Sayfanın kaydırıcısı tam derece aldığından 75° kullanılır. Serbest cisim çizimi: ayakta yukarı N<sub>zemin</sub> ve duvara doğru f; üst uçta duvardan dışarı N<sub>duvar</sub>; ortada mg = 147.2 N, en üstte Mg = 735.8 N. Üç bilinmeyen, üç denklem.",
      "ΣF<sub>y</sub> = 0: N<sub>zemin</sub> = (m + M)g = 90 kg × 9.81 m/s² = 882.9 N. ΣF<sub>x</sub> = 0: f = N<sub>duvar</sub>. Ayağa göre Στ = 0 (N<sub>zemin</sub> ve f'nin kolu sıfır): N<sub>duvar</sub>·L sin θ = mg·(L/2)·cos θ + Mg·dL·cos θ, yani N<sub>duvar</sub> = g(m/2 + Md)/tan θ. L sadeleşti.",
      "75°'de: N<sub>duvar</sub> = 9.81 m/s² × (7.5 kg + 75 kg)/tan 75° = 809.3 N / 3.732 = 216.9 N = f. Zeminin verebileceği en büyük sürtünme μ<sub>s</sub>N<sub>zemin</sub> = 0.40 × 882.9 N = 353.2 N; pay 136.3 N. Gereken katsayı f/N<sub>zemin</sub> = 216.9 N / 882.9 N = 0.246.",
      "En küçük açı: kaymanın eşiğinde f = μ<sub>s</sub>N<sub>zemin</sub>, buradan tan θ<sub>min</sub> = (m/2 + Md)/(μ<sub>s</sub>(m + M)) = 82.5 kg / (0.40 × 90 kg) = 2.292 ve θ<sub>min</sub> = 66.4°. Kişi yokken aynı formül 1/(2μ<sub>s</sub>) = 1.25 ve 51.3° verir: tepedeki kişi sınırı yaklaşık 15° yükseltir.",
      "Sayfada denetle: Merdiven sekmesinde Hazır düzen '4'e 1 kuralı: 75°, en üst basamak'. Kartlar 882.9 N, 216.9 N, 353.2 N, 0.246 ve +136.3 N gösterir; sınır tablosunda θ<sub>min</sub> 66.425°, d* = 1.6914 çıkar ve durum satırı kişinin en üst basamağa kadar güvenle çıkabileceğini söyler.",
    ],
    result:
      "Kuralın açısında en üst basamak bile yalnızca μ<sub>s</sub> ≈ 0.25 ister; 0.40'lık zemin rahatça yeter ve kayma ancak 66.4°'nin altında başlar. Kuralın tam açısında (75.5°, tan θ = √15) gereken katsayı 0.237'ye iner. Merdivenin boyu sonuçta hiç görünmez. Model ihtiyatlıdır: gerçek bir duvarın sürtünmesi yükün bir kısmını üstlenir ve zeminden istenen sürtünmeyi azaltır.",
  },
  misconceptions: [
    {
      myth: "Kaldıraçta ağır taraf her zaman aşağı iner.",
      truth:
        "Dönmeyi ağırlık değil tork, yani ağırlık × kol belirler. Sayfanın varsayılan düzeninde desteğin 0.60 m solundaki 2 kg ile 0.40 m sağındaki 3 kg aynı 11.77 N·m'lik torku verir ve kiriş kıpırdamaz. Kirişin kendi ağırlığı da hesaba girer: destek merkezde değilse, karşı tarafta hiç kütle olmasa bile 2 kg'lık kiriş 1 kg'lık bir yükü dengeleyebilir.",
    },
    {
      myth: "Tork yalnızca kuvvete bağlıdır; aynı tork her cismi aynı hızla döndürür.",
      truth:
        "Tork kuvvet ile kolun çarpımıdır; doğrultusu eksenden geçen bir kuvvet ne kadar büyük olursa olsun döndürmez. Aynı tork aynı dönmeyi de vermez, çünkü açısal ivme Στ/I'dır. Sayfadaki iki 'Aynı Στ' düzeninde tork −3.92 N·m'dir; kütleler dışarıdayken I 3.6 kat büyüdüğü için α₀ −3.872'den −1.086 rad/s²'ye düşer ve kiriş dayanağa 1.9 kat geç varır.",
    },
    {
      myth: "Merdivende ağır biri her zaman daha kolay kaydırır.",
      truth:
        "Yalnızca merdivenin ortasının üstündeyken. Ağırlık hem gereken sürtünmeyi hem de zeminin verebileceği en büyük sürtünmeyi büyütür. 60°'de, μ<sub>s</sub> = 0.40 iken gereken katsayı d = 0.90'da 30, 75 ve 120 kg için 0.443, 0.481 ve 0.494'tür; d = 0.50'de üçünde de 0.289; d = 0.30'da ise 0.212, 0.192 ve 0.186. Alt basamaklarda ağır biri merdiveni sabitler.",
    },
    {
      myth: "Bir destek, üzerindeki ağırlıktan fazlasını taşıyamaz.",
      truth:
        "Destekler birlikte toplam ağırlığı taşır, ama tek bir destek çok daha fazlasını taşıyabilir. Cıvatalı konsolda B desteği 4087.5 N taşır, toplam ağırlığın 5 katından fazla; çünkü A desteği tahtayı 3302.7 N ile aşağı çeker. Tersi de olur: bırakılan kaldıraçta pim ilk anda Mg'den azını taşır, 'kütleler içeride' düzeninde 49.05 N yerine 47.50 N, tek noktasal kütlede ise hiç.",
    },
  ],
  glossary: [
    { term: "Tork (τ)", definition: "Bir kuvvetin bir eksen çevresinde döndürme etkisi; kuvvet ile kuvvet kolunun çarpımı, τ = r × F. Birimi N·m; mühendislikte moment de denir." },
    { term: "Kuvvet kolu", definition: "Dönme ekseninden kuvvetin doğrultusuna olan dik uzaklık, r<sub>⊥</sub> = r·sin φ." },
    { term: "Statik denge", definition: "Kuvvetlerin toplamının ve herhangi bir noktaya göre torkların toplamının sıfır olduğu, cismin ne ötelenip ne de dönmeye başladığı durum." },
    { term: "Ağırlık merkezi", definition: "Bir cismin bütün parçalarının ağırlık torklarının, toplam ağırlık oraya uygulanmış gibi toplandığı nokta; düzgün yerçekiminde kütle merkeziyle çakışır." },
    { term: "Eylemsizlik momenti (I)", definition: "Bir cismin bir eksen çevresinde dönmeye karşı direnci, I = Σmr²; kütle eksenden uzaklaştıkça uzaklığın karesiyle büyür." },
    { term: "Paralel eksen teoremi", definition: "Ağırlık merkezinden h uzaktaki paralel bir eksene göre eylemsizlik momenti: I = I<sub>cm</sub> + Mh²." },
    { term: "Statik sürtünme katsayısı (μ<sub>s</sub>)", definition: "Bir yüzeyin kaymayı önlemek için verebileceği en büyük sürtünmenin dik tepkiye oranı; gereken sürtünme f ≤ μ<sub>s</sub>N oldukça cisim kaymaz." },
    { term: "Etki çizgisi (tesir çizgisi)", definition: "Hareketli bir yükün konumuna göre bir tepkinin ya da iç kuvvetin nasıl değiştiğini gösteren grafik; sayfanın kiriş grafiği R<sub>A</sub>(x) ve R<sub>B</sub>(x)'i çizer." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede tork 'kuvvet çarpı uzaklık'tır; <strong>Fizik I</strong>'de bir vektörel çarpıma, τ = r × F'ye dönüşür ve dönme dinamiğinin temel yasası τ = dL/dt ile tamamlanır: sabit eksende L = Iω olduğundan Iα = Στ çıkar. Mühendislik fakültelerinde ilk yılın <strong>Statik</strong> dersi bu sayfanın genişletilmiş hâlidir: serbest cisim diyagramı, kafes sistemler ve çerçeveler, yayılı yükler, sürtünme ve virtüel iş ilkesi. Kilit kavramlardan biri <em>statik belirsizliktir</em>: tahtayı üç desteğe oturtursan üç bilinmeyen tepkiye karşı yalnızca iki denklem (ΣF<sub>y</sub> ve Στ) kalır ve çözüm ancak tahtanın ne kadar eğildiği hesaba katılınca bulunur. Merdiven de duvar sürtünmesi eklenince dört bilinmeyenle aynı duruma düşer. Bu eğilmeyi <strong>Mukavemet</strong> dersi inceler: kirişin her kesitinde bir kesme kuvveti ve bir eğilme momenti vardır; cıvatalı konsolun B desteğindeki kesitte bu moment, taşan kısımdaki yüklerin B'ye göre toplam torkudur ve kirişi orada en çok zorlayan budur.",
      "<strong>Dinamik</strong> dersinde katı cisim üç boyuta çıkar: eylemsizlik momenti bir tensöre dönüşür, açısal momentum açısal hıza paralel olmayabilir ve Euler'in katı cisim denklemleri topacın, jiroskobun ve dönen uyduların davranışını verir. Açısal momentumun korunumu, kollarını çeken buz patencisinin neden hızlandığını anlatır. <strong>Biyomekanik</strong> aynı denge denklemlerini iskelete uygular: kaslar eklemlere yakın tutunduğu için vücut, kuvvetten değil hızdan kazanan kaldıraçlarla doludur ve eklem kuvvetleri taşınan yükün katlarına çıkar. Köprüler ve vinçler, robot kolları, şev kararlılığı ve yürüyen robotların dengesi aynı soruyla başlar: kuvvetler ve torklar dengede mi, değilse sürtünme ne kadarını karşılayabilir?",
    ],
    topics: [
      "Vektörel çarpım ve sağ el kuralı",
      "Serbest cisim diyagramı",
      "Statik belirsizlik",
      "Kesme kuvveti ve eğilme momenti",
      "Katı cisim dinamiği ve Euler denklemleri",
      "Açısal momentum ve korunumu",
      "Virtüel iş ilkesi",
      "Kas-iskelet biyomekaniği",
    ],
  },
  quiz: [
    {
      question:
        "İki 'Aynı Στ' düzeninde tork aynıdır (−3.92 N·m), ama kütleler dışarı kaydırılınca eylemsizlik momenti 1.013'ten 3.613 kg·m²'ye, yani yaklaşık 3.57 katına çıkar. Kiriş ±20° dayanağına kaç kat geç varır?",
      options: ["3.57 kat geç", "Yaklaşık 1.89 kat geç (√3.57)", "Aynı anda; tork değişmedi", "3.57 kat erken"],
      answer: 1,
      explanation:
        "Hareket denklemi θ̈ = −(Mgd/I)·cos θ'dır; iki düzende M ve d aynı. I'yı 3.566 katına çıkarmak zamanı √3.566 = 1.888 katına esnetmekle aynıdır, açının yolu değişmez. Sayfa bunu ölçer: 0.4255 s'ye karşı 0.8034 s. Çarpma hızı da aynı oranda düşer: 1.6275'ten 0.8619 rad/s'ye.",
    },
    {
      question:
        "Masadan taşan tahtada (4 m, destekler 0.50 ve 3.00 m'de) 60 kg'lık kişi B desteğini 0.333 m geçince tahta devriliyor. Tahtanın kütlesi 20 kg'dan 40 kg'a çıkarılırsa kişi B'yi en çok ne kadar geçebilir?",
      options: ["Değişmez: 0.333 m", "0.667 m, iki katı", "0.167 m, yarısı", "Sınır kalkar, tahta hiç devrilmez"],
      answer: 1,
      explanation:
        "B'ye göre tork dengesi: 588.6 N × taşma = tahtanın ağırlığı × B'nin öbür yanındaki 1.0 m'lik kol. Taşma payı (M/m<sub>kişi</sub>)(x<sub>B</sub> − L/2) tahta kütlesiyle doğru orantılıdır: (40/60) × 1.0 m = 0.667 m. Sayfada Tahta kütlesi M'yi 40 kg yap: sınır tablosu x* = 3.667 m yazar. Kule vinçlerinin arka kolundaki karşı ağırlıklar da bu yüzden vardır.",
    },
    {
      question:
        "Temel düzendeki merdiveni (60°, μ<sub>s</sub> = 0.40, 15 kg, kişi 75 kg ortada) kütleler aynı kalmak koşuluyla 5 m'den 8 m'ye uzatırsan gereken sürtünme f ve kritik oran d* nasıl değişir?",
      options: [
        "f 8/5 katına çıkar, d* küçülür",
        "İkisi de değişmez; yalnızca d*'ın metre karşılığı büyür",
        "f azalır, çünkü kişi zeminden uzaklaşır",
        "Merdiven artık kayar",
      ],
      answer: 1,
      explanation:
        "Ayağa göre tork denkleminin her terimi L ile çarpılır: N<sub>duvar</sub>·L sin θ = gL cos θ (m/2 + Md). L sadeleşir; f = 254.9 N ve d* = 0.7314 kalır. Sayfada Merdiven uzunluğu L'yi 8.0 m yap: kartlar aynıdır, durum satırı yalnızca ayaktan 3.66 m yerine 5.85 m der. Gerçekte uzun merdiven daha ağırdır; değişen m'dir, L değil.",
    },
  ],
  next: [
    {
      href: "makine-muhendisligi.html",
      title: "Makine Mühendisliği",
      why: "Statikten mukavemete: ortadan yüklü bir kirişin mesnet tepkilerini ve eğilme momenti üçgenini izle. Burada bulduğun R<sub>A</sub> ve R<sub>B</sub>, kirişin içindeki gerilmenin başlangıç noktasıdır.",
    },
    {
      href: "sarkac.html",
      title: "Sarkaç",
      why: "Dayanaklar olmasaydı bırakılan kiriş, ağırlık merkezi pimin altına gelecek biçimde salınırdı: fiziksel sarkaç, T = 2π√(I/(Mgd)). Noktasal kütlede I = mL² ve d = L ile T = 2π√(L/g)'ye iner.",
    },
    {
      href: "dairesel-hareket.html",
      title: "Dairesel Hareket",
      why: "Dönen kirişte pimin tepkisi neden eğik? Ağırlık merkezi bir çember yayında döner ve merkezcil kuvvet ister. Yarıçap, hız ve kütle kaydırıcılarıyla F = mv²/r'yi orada ölç.",
    },
    {
      href: "is-enerji.html",
      title: "İş–Enerji İlkesi",
      why: "Kirişin dayanağa varış hızını enerji verdi: ½Iω² = Mg|d|·sin θ. Eğim ve sürtünme kaydırıcılarıyla işin kinetik enerjiyi nasıl değiştirdiğini, sürtünmenin enerjiyi nasıl harcadığını izle.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 12.2 Examples of Static Equilibrium",
      url: "https://openstax.org/books/university-physics-volume-1/pages/12-2-examples-of-static-equilibrium",
      note: "Beş adımlı çözüm stratejisi, ön kol (Örnek 12.4) ve sürtünmesiz duvara yaslı merdiven (Örnek 12.5); merdiven sonucunun boydan bağımsız olduğunu vurgular (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · College Physics 2e, 9.6 Forces and Torques in Muscles and Joints",
      url: "https://openstax.org/books/college-physics-2e/pages/9-6-forces-and-torques-in-muscles-and-joints",
      note: "Pazı kası örneği (470 N, yükün 7.38 katı), sırtla yük kaldırmanın omurgaya bindirdiği kuvvet ve kasların neden eklemlere yakın tutunduğu.",
    },
    {
      title: "Feynman Lectures on Physics, Cilt I, Bölüm 4: Conservation of Energy",
      url: "https://www.feynmanlectures.caltech.edu/I_04.html",
      note: "Kaldıraç ve eğik düzlemin denge yasası, ağırlık kaldıran makineler ve enerji korunumuyla; Stevin'in top çelengi (Şekil 4-4) ve 'mezar taşı' notu.",
    },
    {
      title: "Wikipedia · On the Equilibrium of Planes",
      url: "https://en.wikipedia.org/wiki/On_the_Equilibrium_of_Planes",
      note: "Arşimet'in kaldıraç ispatı (I. kitap, 6. ve 7. önermeler), Pappus'un aktardığı söz ve Mach'ın eleştirisi (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
