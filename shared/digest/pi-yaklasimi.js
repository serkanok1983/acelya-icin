window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["pi-yaklasimi"] = {
  slug: "pi-yaklasimi",
  title: "π'yi Hesaplamak: Hata Hangi Hızla Küçülür?",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Bir milyon rastgele nokta π'nin tipik olarak 2.8 basamağını verir. Chudnovsky serisinin tek terimi 13.2 basamak getirir. Dokuz yöntemi yarıştır; Arşimet'in sınırlarını ve kayan noktanın tuzağını ölç.",
  hook:
    "Birim kareye bir milyon rastgele nokta at ve çeyrek çemberin içine düşenleri say: π'nin tipik olarak yalnız 2.8 basamağını yakalarsın. Chudnovsky serisinin tek terimi 13.2 basamak verir. Daha tuhafı, çokgenin kenarını ikileyen ve matematikte kusursuz olan bir formülü bilgisayarda 28 kez uygularsan π yerine tam sıfır elde edersin.",
  bigIdea:
    "π'ye giden yolları ayıran şey hatanın küçülme hızıdır: rastgele noktalar <em>1/√N</em>, Leibniz serisi <em>1/N</em>, Arşimet'in çokgenleri <em>1/n²</em> ile yavaşça ilerlerken Machin ve Chudnovsky serileri her terimde sabit sayıda basamak ekler.",
  story: [
    "MÖ 3. yüzyılda Arşimet'in <em>Çemberin Ölçümü</em>'nde yaptığı hesap, bugün bir sayısal analiz dersinin ilk haftasına konabilir. Elinde ondalık yoktu: √3 için 265/153 &lt; √3 &lt; 1351/780 sınırlarından başladı ve her karekökü güvenli yöne yuvarladı, alt sınırı aşağı, üst sınırı yukarı. Bu yüzden 3 10/71 &lt; π &lt; 3 1/7 aralığı, sayfadaki gerçek 96-gen sınırlarından biraz geniştir. İç çokgen 3.141032 verir, 223/71 ise 3.140845. Genişlik bir kusur değil, bir garantidir; bugünün <strong>aralık aritmetiği</strong> de her yuvarlamayı güvenli yöne yaparak aynı işi görür. Neden 96'da durduğu bilinmiyor. İskenderiyeli Heron, MS 1. yüzyılda, Arşimet'in hesabı bugün kayıp bir kitapta sürdürdüğünü yazar; elimize ulaşan kopyadaki sayılar bozuktur, tanıklık ihtiyatla okunur.",
    "Çokgenin bedeli baştan bellidir: hata kenar sayısının karesiyle küçülür, her yeni ondalık yaklaşık √10 ≈ 3.2 kat fazla kenar ister. Liu Hui 263'te <em>Matematik Sanatı Üzerine Dokuz Bölüm</em>'e yazdığı şerhte kenarı Pisagor teoremiyle ikiledi ve 96 ile 192 kenarla π'yi 3.141 ile 3.143 arasına sıkıştırdı. Ardışık alan farklarının yaklaşık dörtte birine indiğini görüp kuyruğu geometrik seriyle topladı; kalan, son farkın üçte biridir. Bu kısa yola <strong>hızlı yöntem</strong> denir. 3927/1250 = 3.1416 sonucunun ona mı, Zu Chongzhi'ye mi ait olduğu tartışılır. Birim çemberde 2n-genin alanı n-genin yarı çevresine eşit olduğundan, aynı hamle sayfanın sayılarıyla (4b₉₆ − b₄₈)/3 = 3.14159253 verir, hatası −1.2·10⁻⁷. 480 dolaylarında Zu Chongzhi 3.1415926 &lt; π &lt; 3.1415927 aralığını ve 355/113 kesrini (<em>milü</em>, 'yakın oran') buldu. Kitabı kayıp; çokgenin 12 288 mi yoksa 24 576 mı kenarlı olduğu, sonucu geri kuranların ayrıldığı yerdir. Bu yedi ondalık neredeyse bin yıl aşılamadı. 1424'te Semerkant'ta Cemşid el-Kâşî aynı yolu 3·2²⁸ = 805 306 368 kenara kadar götürdü ve 2π'yi 16 ondalık basamağa kadar hesapladı.",
    "Seriler çokgeni emekliye ayırınca soru değişti: π nasıl bir sayıdır? Serilerin türetilişi, Madhava'dan Machin'e, Taylor Serisi sayfasında durur; burada yalnız hızları yarışır. 1761'de Johann Heinrich Lambert π'nin <strong>irrasyonel</strong> olduğunu kanıtladı: iki tam sayının oranı değildir. 22/7 ve 355/113 ne kadar iyi olursa olsun π olamaz. 1882'de Ferdinand von Lindemann daha fazlasını gösterdi. π <strong>aşkındır</strong>, katsayıları tam sayı olan hiçbir polinom denkleminin kökü değildir; cetvel ve pergelle çemberi karelemek imkânsızdır. Haber herkese ulaşmadı. 5 Şubat 1897'de Indiana Temsilciler Meclisi, hekim Edward J. Goodwin'in çemberi karelediğini ileri süren 246 sayılı tasarıyı 67'ye 0 oyla geçirdi. Metinde 'pi' sözcüğü hiç geçmez; satırlardan birbiriyle çelişen değerler çıkar, en belirgini π = 3.2'dir, çünkü çapın çevreye oranı 5/4 : 4 diye yazılmıştır. Purdue Üniversitesi'nden C. A. Waldo, eyalet bilim akademisinin ödeneği için Indianapolis'teydi ve senatörlerle konuştu. Senato 12 Şubat'ta tasarıyı süresiz erteledi.",
    "Makineler aynı soruyu başka bir ölçeğe taşıdı. Eylül 1949'da G. W. Reitwiesner ve ENIAC ekibi 70 saatte 2037 ondalık hesapladı. 1988'de David ve Gregory Chudnovsky, Ramanujan'ın serilerinin izinden her terimi yaklaşık 14 basamak ekleyen bir seri kurdu. Aralık 2009'dan beri ondalık rekorları, Aralık 2025'te duyurulan 314 trilyon basamak da dahil, bu seriyle kırıldı. Bu hızın yanında Monte Carlo umutsuz görünür: bir milyon nokta tipik olarak 2.8 basamak verir. Yine de sayfada durur, çünkü hızı boyuttan bağımsızdır ve kendi hatasını kendisi ölçer. Üç sekme istatistiği, seriyi ve geometriyi yan yana koyar; her birinde ölçülen hata kuramın öngördüğüyle karşılaştırılır.",
  ],
  core: [
    {
      heading: "π bir olasılıktır: isabet yöntemi ve 1/√N",
      body:
        "Birim karede düzgün dağılmış bir nokta seç. Çeyrek çemberin içine düşme olasılığı alanların oranıdır: p = π/4. N noktadan H tanesi içeri düşerse 4H/N, π'nin bir tahminidir. Her nokta bağımsız bir yazı-tura gibidir; bu yüzden H <strong>binom dağılımına</strong> uyar: ortalaması Np, varyansı Np(1 − p). Tahminin standart sapmasına <strong>standart hata</strong> (SE) denir: 4√(p(1 − p)/N). Varyans 1/N ile küçülür, standart sapma onun karekökü kadar, 1/√N ile. Sonuç acımasızdır: hatayı 10 kat küçültmek, yani bir basamak daha kazanmak için 100 kat nokta gerekir. 10⁶ noktada SE = 0.00164, tipik doğru basamak sayısı −log₁₀(0.00164) ≈ 2.8. Np(1 − p) ≥ 10 olunca merkezi limit teoreminin verdiği normal yaklaşım yeterince iyidir: hata çan eğrisine uyar ve koşuların yaklaşık %95'i π ± 1.96 SE aralığına düşer. Sayfada tohum 1777 ile 1000 noktanın 807'si içeri düşer: 3.228, π'den +1.66 SE uzakta. Şaşırtıcı değil; bu büyüklükte sapmalar sıradandır.",
      formula: "<span class=hat>π</span> = 4H/N,   H ~ Binom(N, π/4),   SE = 4√(p(1 − p)/N) = √(4π − π²)/√N ≈ 1.642/√N",
      formulaNote:
        "Bir noktanın katkısı 4 (içeride) ya da 0'dır; ortalaması π, varyansı 16p(1 − p) = 4π − π² ≈ 2.697.",
    },
    {
      heading: "Aynı noktalar, 3.4 kat az varyans",
      body:
        "İsabet yöntemi her noktada tek bir soru sorar: y eğrinin altında mı? Oysa x'i bildiğin anda eğrinin o noktadaki yüksekliği f(x) = √(1 − x²) zaten bellidir. <strong>Ortalama değer yöntemi</strong> y'yi hiç kullanmaz, 4f(x) değerlerinin ortalamasını alır (Riemann Toplamları sayfasındaki Monte Carlo budur). İki tahminin de ortalaması π'dir; varyansları ise farklıdır. Farkı <strong>toplam varyans yasası</strong> açıklar: isabetin varyansı, x verildiğinde koşullu ortalamanın varyansı ile koşullu varyansın ortalamasının toplamıdır. Birinci parça tam ortalama değer yönteminin varyansıdır (0.797); ikinci parça (1.900) yalnızca y'nin rastgeleliğinden gelir ve π hakkında hiçbir bilgi taşımaz. Bir tahminciyi koşullu beklenen değeriyle değiştirmek varyansı asla artırmaz; Rao–Blackwell teoreminin özü budur. Oran 2.697/0.797 ≈ 3.38: isabet yöntemi aynı doğruluk için 3.4 kat nokta ister. Buffon'un iğnesi (ℓ = t) daha da savurgandır: atış başına varyans π²(π/2 − 1) ≈ 5.634, isabetin 2.09 katı.",
      formula: "Var(h) = Var(E[h | x]) + E[Var(h | x)]:   4π − π² = (32/3 − π²) + (4π − 32/3),   2.697 = 0.797 + 1.900",
      formulaNote:
        "h = 4 ya da 0 (isabet), g = 4f(x) (ortalama değer); E[g²] = 16·∫₀¹(1 − x²)dx = 32/3. Sayfa üç sayıyı da aynı noktalardan ölçer.",
    },
    {
      heading: "Cebirsel ve geometrik: basamak kazanmanın iki yolu",
      body:
        "Hatayı adım sayısı N'nin fonksiyonu olarak yaz. <strong>Cebirsel</strong> yakınsamada hata C/N<sup>p</sup> gibi küçülür ve her on kat adım p basamak getirir: Leibniz'de p = 1, iki ardışık kısmi toplamın ortalamasında p = 2, Nilakantha'da p = 3, Monte Carlo'da p = ½. <strong>Geometrik</strong> yakınsamada hata her adımda sabit bir q oranıyla çarpılır ve her adım log₁₀(1/q) basamak getirir: Euler dönüşümünde q ≈ 1/2 (0.30 basamak), Arşimet'in ikilemesinde 1/4 (0.60), Machin'de 1/25 (1.40), Chudnovsky'de yaklaşık 6.6·10⁻¹⁵ (14.18). Arşimet iki gruba birden girer: hatası kenar sayısı n'ye göre cebirseldir (1/n²), ikileme sayısına göre geometrik. Yarış grafiğinin yatay ekseni logaritmik olduğu için cebirsel yöntemler eğimi p olan doğrular çizer, geometrik olanlar yukarı kıvrılıp grafikten çıkar. Hızı artırmanın yolu hatanın biçimini bilmektir. Leibniz'in kısmi toplamları π'nin iki yanında dönüşümlü durur; ardışık ikisinin ortalaması öncü ±1/N terimini götürür ve geriye 1/(2N²) kalır. Euler dönüşümü aynı seriyi, terimleri her adımda yaklaşık yarıya inen bir seriye çevirir: cebirsel yakınsama geometriğe dönüşür.",
      formula: "hata ≈ C/N<sup>p</sup> ⇒ basamak ≈ p·log₁₀N + sabit;   hata ≈ C·q<sup>N</sup> ⇒ basamak ≈ N·log₁₀(1/q) + sabit",
      formulaNote:
        "Chudnovsky'de q = 1728/640320³, terim başına log₁₀(640320³/1728) ≈ 14.18 basamak. Monte Carlo'nun C'si de rastgeledir: tek koşu kuram çizgisinin çevresinde titrer.",
    },
    {
      heading: "Arşimet'in sınırları: neden 1/n², neden 1/n⁴?",
      body:
        "Birim çembere içten çizilen düzgün n-genin yarı çevresi b<sub>n</sub> = n·sin(π/n), dıştan çizileninki a<sub>n</sub> = n·tan(π/n)'dir ve her n için b<sub>n</sub> &lt; π &lt; a<sub>n</sub>. Hatalar Taylor açılımlarından okunur: sin x = x − x³/6 + … ve tan x = x + x³/3 + … içine x = π/n koyunca iç sınır π'den π³/(6n²) eksik, dış sınır π³/(3n²) fazla çıkar. Kenar sayısını ikiye katlamak ikisini de 4 kat küçültür: adım başına log₁₀ 4 ≈ 0.60 basamak. Açılımlar bir şey daha söyler: 1/n² teriminde dış hata, iç hatanın tam iki katıdır ve ters işaretlidir. Bunu Snell 1621'de gösterdi, Huygens 1654'te kanıtladı. O hâlde (2b<sub>n</sub> + a<sub>n</sub>)/3 bileşiminde 1/n² terimleri birbirini götürür, geriye π⁵/(20n⁴) kalır ve her ikileme hatayı 16 kat küçültür. 96-gende iç sınırın hatası 5.6·10⁻⁴, bileşiminki 1.8·10⁻⁷: aynı çokgenden üç bin kat iyi bir sonuç. Arşimet trigonometri kullanmadı; n'den 2n'ye bir ortalama zinciriyle geçti: önce dış sınır, iki sınırın harmonik ortalamasıyla; sonra iç sınır, yeni dış sınırla eskisinin geometrik ortalamasıyla güncellenir.",
      formula:
        "b<sub>n</sub> = π − π³/(6n²) + π⁵/(120n⁴) − …,   a<sub>n</sub> = π + π³/(3n²) + 2π⁵/(15n⁴) + …,   (2b<sub>n</sub> + a<sub>n</sub>)/3 = π + π⁵/(20n⁴) + …",
      formulaNote:
        "Zincir: a<sub>2n</sub> = 2a<sub>n</sub>b<sub>n</sub>/(a<sub>n</sub> + b<sub>n</sub>), b<sub>2n</sub> = √(a<sub>2n</sub>b<sub>n</sub>); altıgenden başlar, a<sub>6</sub> = 2√3, b<sub>6</sub> = 3.",
    },
    {
      heading: "Kayan nokta: aynı formül, iki farklı sonuç",
      body:
        "Bilgisayar gerçel sayıları çoğunlukla <strong>IEEE 754 çift duyarlık</strong> biçiminde tutar: 53 ikili basamaklı bir anlamlı kısım ve bir üs. 1 ile ondan büyük ilk sayı arasındaki fark <strong>makine epsilonu</strong> ε = 2⁻⁵² ≈ 2.2·10⁻¹⁶'dır; her işlemin sonucu en yakın sayıya yuvarlanır, bağıl hata en çok ε/2 olur. Kenarı s<sub>2n</sub> = √(2 − √(4 − s<sub>n</sub>²)) ile ikilediğini düşün. s küçükken √(4 − s²) ≈ 2 − s²/4, yani 2'ye çok yakındır. Yakın iki sayıyı çıkarınca ortak baş basamaklar silinir ve sonuca yuvarlama gürültüsü hâkim olur: buna <strong>yok etme</strong> denir. Farkın bağıl hatası kabaca ε/(s²/4)'tür ve her ikilemede 4 kat büyür; kesme hatası π³/(6n²) ise 4 kat küçülür. İkisi n ≈ 2·10⁴ dolayında dengelenir: sayfada saf formülün en iyi hatası k = 12'de (n = 24 576) 8.3·10⁻⁹'dur ve 28. ikilemeden itibaren yarı çevre tam sıfırdır. İfadeyi s²/(2 + √(4 − s²)) diye yazmak çıkarmayı kaldırır. İşin ilginci, Liu Hui'nin üç adımlı biçimi (G = √(1 − s²/4), j = 1 − G, s<sub>2n</sub> = √(s²/4 + j²)) de kararlıdır, çünkü yok etmeye uğrayan j yalnız karesiyle, küçük bir düzeltme olarak girer: çift duyarlıkta 40 ikilemeden sonra bile hatası 3.2·10⁻¹⁶'dır. Formülü bozan, onu sadeleştirmek olmuştur.",
      formula: "2 − √(4 − s²) = s²/(2 + √(4 − s²)),   ε = 2⁻⁵² ≈ 2.2·10⁻¹⁶",
      formulaNote:
        "Matematikte iki taraf eşittir; kayan noktada sol taraf birbirine çok yakın iki sayıyı çıkarır, sağ taraf hiç çıkarma yapmaz. Kararlı formül 30 ikilemede π'ye en yakın çift duyarlıklı sayıyı, 3.141592653589793'ü verir.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın üç sekmesi var. <strong>Monte Carlo</strong>'da <strong>Yöntem</strong> menüsü çeyrek çembere nokta atışı (isabet) ile Buffon'un iğnesi arasında seçer; Buffon'da <strong>ℓ/t</strong> kaydırıcısı ve kutusu (0.05–1, 0.01 adımla) ile <strong>ℓ = t</strong> ve <strong>ℓ = t/2</strong> düğmeleri açılır. <strong>Hız</strong> kaydırıcısı saniyede 10 ile 100 000 nokta arasında ayarlanır ama sonucu değiştirmez; nokta dizisini yalnız <strong>Tohum</strong> kutusu (varsayılan 1777) belirler. <strong>1000 nokta</strong> ve <strong>10⁶ nokta</strong> koşuyu hemen o sayıya getirir; <strong>Aynı tohumla yeniden</strong>, <strong>Yeni tohum</strong> ve <strong>Sıfırla</strong> da var. Kartlar tahmini, hatayı, kuramsal standart hatayı, aynı x'lerle ortalama değer yöntemini ve N ≥ 1000 olunca bir noktanın varyansını verir; arka planda 16 koşuluk bir topluluk (tohum … tohum + 15, her biri 10⁶ nokta) log–log eğimi ölçer. <strong>Seriler ve yarış</strong>'ta <strong>Adım sayısı N</strong> kaydırıcısı ve kutusu (1–10⁶), <strong>N = 5</strong>, <strong>N = 100</strong>, <strong>N = 1000</strong>, <strong>N = 10⁶</strong> düğmeleri, N'yi 12 saniyede 1'den 10⁶'ya çıkaran <strong>Yarışı başlat</strong>, <strong>Monte Carlo tohumu</strong>, <strong>Grafikte göster</strong> kutucukları ve <strong>Basamaklar</strong> menüsü var; tablo dokuz yöntemin değerini, ölçülen hatasını, öncü terim kuramını ve doğru basamağını (−log₁₀|hata|) yan yana yazar. Seriler 60 basamaklı tamsayı aritmetiğiyle hesaplanır, 50 basamaktan ötesi yazılmaz. <strong>Arşimet çokgenleri</strong>'nde <strong>İkileme sayısı k</strong> (0–40, n = 6·2ᵏ), <strong>Büyütme penceresi</strong> menüsü, <strong>Altıgen</strong>, <strong>96 kenar (Arşimet)</strong>, <strong>30 ikileme</strong> düğmeleri ve <strong>Sıfırla</strong> var; alttaki kayan nokta kartları aynı yarı çevreyi iki formülle çift duyarlıkta hesaplar. <kbd>Boşluk</kbd> Monte Carlo'yu ya da yarışı durdurur, <kbd>R</kbd> açık sekmeyi sıfırlar.",
    experiments: [
      {
        title: "1000 nokta, bir milyon nokta: şans ve kuram",
        predict:
          "1000 noktada standart hata 1.642/√1000 ≈ 0.052. Tohum 1777'nin tahmini π'den kaç standart hata uzak çıkabilir? 10⁶ noktada hata kaç kat küçülür, kaç doğru basamak beklersin?",
        do: "<strong>Monte Carlo</strong> sekmesinde <strong>Sıfırla</strong>'ya, sonra <strong>1000 nokta</strong>'ya bas ve kartları oku. Ardından <strong>10⁶ nokta</strong>'ya bas. Son olarak <strong>Tohum</strong> kutusuna 1778, sonra 1779 yazıp her seferinde yeniden <strong>10⁶ nokta</strong>'ya bas.",
        observe:
          "N = 1000: 807 isabet, tahmin 3.228000, hata +0.0864 = +1.66 SE (uyumlu), kuramsal SE 0.0519, doğru basamak 1.1 (kuramın tipik değeri 1.3). N = 10⁶: 785 408 isabet, 3.141632, hata +3.93·10⁻⁵ = +0.02 SE, 4.4 basamak; kart tipik değeri 2.8 diye yazar. Tohum 1778: 3.143124 (+0.93 SE), tohum 1779: 3.139896 (−1.03 SE); ikisi de 2.8 basamak. Tohum 1777'nin 16 koşusu eğimi −0.493 ± 0.014 ölçer.",
        explain:
          "Hata rastgele bir sayıdır ve standart sapması 1.642/√N'dir: 1000 kat nokta hatayı yalnız √1000 ≈ 32 kat küçültür. Tohum 1777'nin 10⁶'daki kartı +0.02 SE yazar; yuvarlanmamış oran +0.024 SE'dir ve |z| bu kadar küçük bir koşu yaklaşık elli koşuda bir çıkar. Tipik olanı tek koşu değil topluluk söyler: 16 koşunun kök ortalama kare hatası log–log grafikte eğimi −1/2 olan doğruya oturur.",
      },
      {
        title: "Aynı noktalardan iki tahmin, sonra iğneler",
        predict:
          "Kuram bir noktanın varyansını isabet yönteminde 4π − π² ≈ 2.697, ortalama değer yönteminde 32/3 − π² ≈ 0.797 diye verir. Aynı 10⁶ noktadan ölçülen oran kaç çıkar? Buffon'un iğnesi (ℓ = t) isabet yönteminden iyi mi, kötü mü? İğneyi yarıya kısaltınca ne olur?",
        do: "<strong>Sıfırla</strong>'ya, sonra <strong>10⁶ nokta</strong>'ya bas; <strong>Bir noktanın varyansı</strong>, <strong>Fazla varyans</strong> ve <strong>Aynı x'lerle ortalama değer yöntemi</strong> kartlarını oku. Sonra <strong>Yöntem</strong> menüsünden Buffon'un iğnesini seç (ℓ/t = 1.00) ve <strong>10⁶ iğne</strong>'ye bas; ardından <strong>ℓ = t/2</strong> düğmesine ve yeniden <strong>10⁶ iğne</strong>'ye bas.",
        observe:
          "İsabet: varyanslar 2.697 ve 0.797, oran 3.38 (kuram 3.383); fazla varyans 1.900 (kuram 1.900). Ortalama değer tahmini 3.141038 (−0.62 SE, SE 8.93·10⁻⁴). Buffon, ℓ = t: 636 773 iğne kesti, tahmin 3.140837 (−0.32 SE), kuramsal SE 0.00237; varyans kartı 5.634 ve 2.697, gereken atış oranı 2.09 kat. ℓ = t/2: tahmin 3.141434 (−0.03 SE), SE 0.00460, oran 7.84 kat.",
        explain:
          "Toplam varyans yasası: isabet yöntemi x'te bilinen yüksekliği yalnız 'altında mı' sorusuna çevirir ve y'nin rastgeleliğinden 1.900'lük fazladan varyans alır. Buffon'da tahmin 2ℓN/(tH) bir orandır; delta yöntemi atış başına varyansı π²(1 − P)/P verir, P = 2ℓ/(πt). İğne kısaldıkça kesme olasılığı azalır ve her atış daha az bilgi taşır: ℓ ≤ t iken en iyisi ℓ = t'dir, o bile isabet yönteminin iki katı atış ister.",
      },
      {
        title: "Yarış: Leibniz Monte Carlo'ya karşı",
        predict:
          "Leibniz'in hatası yaklaşık 1/N, Monte Carlo'nun tipik hatası 1.64/√N. N = 1000'de ve N = 10⁶'da ikisi kaçar doğru basamak verir? Aradaki fark N büyüdükçe açılır mı, kapanır mı?",
        do: "<strong>Seriler ve yarış</strong> sekmesinde <strong>Sıfırla</strong>'ya, sonra <strong>Yarışı başlat</strong>'a bas ve 12 saniye izle. Yarış bitince <strong>N = 1000</strong>'e bas, tabloyu ve <strong>Basamaklar</strong> panelini (Leibniz seçili) oku. Sonra <strong>N = 10⁶</strong>'ya bas; son olarak <strong>Monte Carlo tohumu</strong> kutusuna 1778 yaz.",
        observe:
          "N = 1000: Leibniz 3.140592653839793, hata −1.00·10⁻³ (kuram −0.00100, oran 1.0000), 3.0 basamak; Monte Carlo 3.228000 (807/1000 isabet), +0.0864, ±0.0519, +1.66 SE, 1.1 basamak (kuram 1.3); Leibniz ortalaması 6.3. Basamaklar paneli '2 ondalık eşleşir' der. N = 10⁶: Leibniz 6.0, Monte Carlo 4.4 (kuram 2.8); tohum 1778 ile 2.8. Grafikte Leibniz eğimi 1 olan bir doğru çizer; Monte Carlo'nun titrek eğrisi eğimi ½ olan kesikli kuram doğrusunun çevresinde dolaşır. Chudnovsky 3., Machin 23. adımda grafiğin tepesinden çıkar.",
        explain:
          "Leibniz cebirseldir ve p = 1: on kat adım bir basamak. Monte Carlo'da p = ½: on kat nokta yarım basamak. 10⁶ adımda tipik fark üç basamaktır ve N büyüdükçe açılır; 10¹⁰ adımda 10'a karşı 4.8 olurdu. Leibniz'in hatası düzenli bir açılımdır (−1/N + 1/(4N³) − …), bu yüzden ortalama almak gibi hilelerle hızlanır. Monte Carlo'nun hatası ise gürültüdür: işareti ve büyüklüğü koşudan koşuya değişir; bir açılımla silinemez, ancak varyansı küçültülerek (ikinci deneydeki gibi) azalır.",
      },
      {
        title: "96 kenar, iki kesir ve bozulan bir formül",
        predict:
          "96-gende iç ve dış sınırın hatası kuramdan π³/(6n²) ≈ 5.6·10⁻⁴ ve π³/(3n²) ≈ 1.1·10⁻³. Snell–Huygens bileşimi kaç kat daha iyi olur? Çift duyarlıkta (yaklaşık 16 basamak) saf formül 30 ikilemede kaç basamak verir?",
        do: "<strong>Arşimet çokgenleri</strong> sekmesinde <strong>96 kenar (Arşimet)</strong> düğmesine bas ve sınır kartlarını oku. Sonra <strong>İkileme sayısı k</strong> kutusuna sırayla 12, 20 ve 28 yaz, en son <strong>30 ikileme</strong>'ye bas; her adımda <strong>Kayan nokta: ölçülen</strong> kartlarını karşılaştır.",
        observe:
          "k = 4: b₉₆ = 3.141031950891 (π − b = 5.61·10⁻⁴, oran 0.9999), a₉₆ = 3.142714599645 (oran 1.0004), Snell–Huygens 3.141592833809 (+1.80·10⁻⁷), aralık 0.001683, öncekinden 4.003 kat dar; 223/71 = 3.140845 &lt; b₉₆ &lt; π &lt; a₉₆ &lt; 22/7 = 3.142857. Saf formül: k = 12'de −8.27·10⁻⁹ (en iyi değeri, 8.1 basamak), k = 20'de +8.16·10⁻⁵, k = 28'de 0. k = 30'da saf 0 (hata −π), kararlı 3.141592653589793 (hata −1.22·10⁻¹⁶).",
        explain:
          "Bileşim 1/n² terimlerini götürür: 96-gende hata 5.6·10⁻⁴'ten 1.8·10⁻⁷'ye, yaklaşık 3100 kat iner. Arşimet'in kesirleri sınırları biraz genişletir, çünkü √3'ü kesirle sınırladı ve hep güvenli yöne yuvarladı. Kayan noktada saf formülün 2 − √(4 − s²) farkı k = 20'de, ilk 12.9 basamağı ortak iki sayıyı çıkarır; 16 basamaklık bir sayıdan geriye üç anlamlı basamak kalır. Kararlı formül aynı sayıyı çıkarmadan hesaplar; kalan hata, π'nin çift duyarlıkta tam yazılamamasından gelir: π − 3.141592653589793 ≈ 1.22·10⁻¹⁶.",
      },
    ],
  },
  wow: [
    {
      title: "Yanlış rakamların düzeni",
      body:
        "Leibniz serisinin ilk 1000 terimi π için 3.140592653839793… verir. İlk on dört ondalıktan yalnız üçü yanlıştır: üçüncüsü (1 yerine 0), onuncusu ve on birincisi; aradakiler π'nin rakamlarıdır. Sebep, hatanın temiz bir açılımı olmasıdır: −1/N + 1/(4N³) − 5/(16N⁵) + …; N = 1000'de −10⁻³ üçüncü ondalığı, +2.5·10⁻¹⁰ onuncu ve on birinciyi, −3.1·10⁻¹⁶ de on beşinciden sonrasını bozar. Paylardaki 1, 1, 5, 61, … Euler sayılarıdır; bu bağı 1989'da Jonathan ve Peter Borwein, Karl Dilcher'le yazdıkları bir makalede açıkladı. Sayfada <strong>Basamaklar</strong> paneli N = 1000'de ilk ayrılan rakamı (0) kırmızıyla işaretler; arkasından π'nin 592653 rakamlarının sürdüğünü kendin gör.",
    },
    {
      title: "640320'nin sırrı",
      body:
        "Chudnovsky serisindeki tuhaf 640320 rastgele değildir: e<sup>π√163</sup> = 262 537 412 640 768 743.99999999999925…, yani 640320³ + 744'ten yalnız 7.5·10⁻¹³ küçüktür. Bu yakınlık, 163'ün sayılar kuramında 'Heegner sayısı' denen dokuz sayının en büyüğü olmasından gelir; aynı yapı seriye terim başına log₁₀(640320³/1728) ≈ 14.18 basamak kazandırır. Yakınlık o kadar büyüktür ki ln(640320³ + 744)/√163, π'yi 30 ondalık doğru verir. Martin Gardner 1975'te bir 1 Nisan şakasıyla bu sayının tam sayı olduğunu ve bunu Ramanujan'ın öngördüğünü yazdı; sayının 'Ramanujan sabiti' adı o şakadan kalmıştır.",
    },
    {
      title: "Hocanın 2⁶² kenarı, öğrencinin kısa yolu",
      body:
        "Ludolph van Ceulen 1596'da π'nin 20 ondalığını yayımladı, sonra 2⁶² ≈ 4.6·10¹⁸ kenarlı bir çokgenle 35 ondalığa ulaştı. Basamaklar ölümünden sonra Leiden'deki mezar taşına kazındı; taşı hazırlatan dul eşiydi. Öğrencisi Willebrord Snell 1621'de aynı çokgenlerden çok daha dar sınırlar çıkarmanın yolunu gösterdi; 96-genden altı-yedi basamak aldığı yazılır. Christoph Grienberger 1630'da Snell'in yöntemiyle 39 ondalığa vardı. Sayfada (2b<sub>n</sub> + a<sub>n</sub>)/3 bileşimi van Ceulen'in 35 ondalığını k = 28'de, 1 610 612 736 kenarla verir (hata +2.27·10⁻³⁶): yaklaşık 2.9 milyar kat az kenar. Aynı çokgenin iç sınırı 17.7 doğru basamakta kalır.",
    },
  ],
  worked: {
    title: "Üç ondalık için kaç nokta, kaç terim, kaç kenar?",
    prompt:
      "π'yi üç doğru ondalıkla, yani |hata| ≤ 5·10⁻⁴ olacak biçimde hesaplamak istiyoruz. (a) İsabet yöntemiyle bu hedefe %95 güvenle ulaşmak için kaç nokta gerekir, ortalama değer yöntemiyle kaç? (b) Leibniz serisinden kaç terim gerekir? (c) Arşimet'in iç çokgeninde ve Snell–Huygens bileşiminde kaç kenar gerekir? Sonuçları sayfada doğrula.",
    steps: [
      "(a) Monte Carlo'da hata rastgeledir; %95 güven için 1.96·SE ≤ 5·10⁻⁴ isteriz (N büyük olduğundan normal yaklaşım geçerlidir). SE = σ/√N ve isabette σ = √(4π − π²) = 1.6422: √N ≥ 1.96 × 1.6422 / (5·10⁻⁴) = 6437, yani N ≥ 4.14·10⁷ nokta (8.3·10⁷ rastgele sayı). Ortalama değer yönteminde σ = √(32/3 − π²) = 0.8928 ve N ≥ 1.22·10⁷, 3.38 kat az.",
      "Sayfada denetle: 10⁶ noktada kuramsal SE 0.00164, yani 1.96·SE = 0.0032; hedefin 6.4 katı, bu yüzden (6.4)² ≈ 41 kat nokta gerekir. Tohum 1777'nin 10⁶'daki hatası (+3.93·10⁻⁵) hedefi şans eseri tutturur; tohum 1778 (+0.00153) ve 1779 (−0.00170) tutturamaz.",
      "(b) Leibniz'in hatası yaklaşık 1/N: 1/N ≤ 5·10⁻⁴ ⇒ N ≥ 2000 terim; hata rastgele olmadığından güven düzeyi de gerekmez. Alterne seri kuralı (hata, atılan ilk terimden küçüktür) yalnız 4/(2N + 1) ≈ 2/N sınırını verir ve 4000 terim isterdi; kısmi toplamlar π'nin iki yanında salındığından gerçek hata bu sınırın yarısıdır. Sayfada N kutusuna 2000 yaz: hata −5.00·10⁻⁴, 3.3 basamak. Ardışık iki toplamın ortalaması hedefe N = 32'de varır (−4.73·10⁻⁴).",
      "(c) İç çokgen: π³/(6n²) ≤ 5·10⁻⁴ ⇒ n² ≥ 10 335, n ≥ 102. Altıgenden ikilenen zincirde 96 kenar yetmez (π − b = 5.61·10⁻⁴), 192 yeter: <strong>İkileme sayısı k</strong> = 5'te π − b = 1.40·10⁻⁴. Snell–Huygens bileşiminde π⁵/(20n⁴) ≤ 5·10⁻⁴ ⇒ n⁴ ≥ 30 602, n ≥ 14; zincirde 24 kenar (k = 2, hata +4.64·10⁻⁵) yeter.",
      "Bedelleri yan yana koy: isabet yöntemi 4·10⁷ nokta ister ve yine de yirmi koşudan birinde hedefi ıskalar; Leibniz 2000 terimle hedefi garanti eder; Arşimet'in zinciri beş, Snell–Huygens iki ikilemeyle hedefi geçer; Machin üç adımda (+2.84·10⁻⁵), Chudnovsky tek terimde (13.2 basamak) çok öteye gider.",
    ],
    result:
      "Üç ondalık için isabet yöntemi yaklaşık 4.1·10⁷ nokta (%95 güvenle; ortalama değer yöntemiyle 1.2·10⁷), Leibniz 2000 terim, Arşimet'in zinciri 192 kenar, Snell–Huygens 24 kenar ister. Yakınsama hızı kaba kuvvetten çok daha önemlidir.",
  },
  misconceptions: [
    {
      myth: "22/7, π'nin kendisidir; en azından okulda öyle kabul edilir.",
      truth:
        "22/7 = 3.142857…, π'den 0.00126 büyüktür; Arşimet'in 96-genden çıkardığı <em>üst sınırdır</em>. Sayfada <strong>96 kenar (Arşimet)</strong> düğmesine bas: dış çokgen bile 3.142715 ile 22/7'nin altında kalır. π irrasyoneldir (Lambert, 1761), hiçbir kesir ona eşit olamaz. Zu Chongzhi'nin 355/113'ü bile π'den 2.7·10⁻⁷ uzaktadır; paydası 16 604'ten küçük hiçbir kesir π'ye ondan daha yakın değildir.",
    },
    {
      myth: "Yeterince nokta atarsan Monte Carlo π'yi tam bulur.",
      truth:
        "Hata rastgeledir ve standart sapması 1.642/√N'dir; her yeni basamak 100 kat nokta ister. 10⁶ noktada tipik doğruluk 2.8 basamaktır; tohum 1777'nin 4.4 basamağı şanstır, tohum 1778 ve 1779 ise 2.8 basamak verir. Bir sınır daha var: sözde rastgele üretecin bir dönemi vardır. Sayfadaki 32 bitlik mulberry32 en geç 2³² sayıda başa döner. Her nokta iki sayı harcadığı için bu, 2³¹ ≈ 2.1 milyar noktadır; ondan sonra atışlar aynı diziyi tekrarlar.",
    },
    {
      myth: "Bilgisayar matematiği tam hesaplar; matematikte doğru olan formül bilgisayarda da doğru sonuç verir.",
      truth:
        "Çift duyarlıkta her sayı 53 ikili basamakla yuvarlanır. Kenar ikileme formülünün saf biçimi 12. ikilemede en iyi değerine (hata −8.27·10⁻⁹) ulaşır, sonra yok etme yüzünden bozulur ve 28. ikilemeden itibaren tam 0 verir; aynı formülün çıkarmasız biçimi 30 ikilemede π'ye en yakın çift duyarlıklı sayıyı bulur. Sayfanın seri tablosu da bu yüzden 60 basamaklı tamsayı aritmetiği kullanır: Nilakantha 10⁶ terimde 18.6 basamağa ulaşır, çift duyarlık ise yaklaşık 15.6 basamakta durur.",
    },
    {
      myth: "Bilim π'nin binlerce basamağına ihtiyaç duyar.",
      truth:
        "NASA'nın Jet İtki Laboratuvarı (JPL), en yüksek doğruluk isteyen gezegenler arası seyrüsefer hesaplarında π'yi 15 ondalıkla, 3.141592653589793 olarak kullanır. JPL'den Marc Rayman'ın hesabına göre yarıçapı 32 milyar km olan bir çemberin çevresi bu değerle yalnız yaklaşık 1.5 cm şaşar; yarıçapı 46 milyar ışık yılı olan bir çemberin çevresini bir hidrojen atomunun çapı kadar hatayla bulmak için 37 ondalık yeter. Bu 15 ondalık, sayfadaki kararlı formülün 30 ikilemede bulduğu çift duyarlıklı π'nin ta kendisidir.",
    },
  ],
  glossary: [
    { term: "Standart hata (SE)", definition: "Bir tahminin koşudan koşuya değişen hatasının standart sapması; isabet yönteminde 4√(p(1 − p)/N) ≈ 1.642/√N." },
    { term: "Ortalama değer yöntemi", definition: "İntegrali, rastgele x'lerde hesaplanan f(x) değerlerinin ortalamasıyla tahmin eden Monte Carlo; çeyrek çemberde isabet yönteminden 3.4 kat az nokta ister." },
    { term: "Toplam varyans yasası", definition: "Var(X) = Var(E[X | Y]) + E[Var(X | Y)]; bir değişkenin varyansını, başka bir değişkenle açıklanan ve açıklanamayan iki parçaya ayırır." },
    { term: "Cebirsel ve geometrik yakınsama", definition: "Hatanın C/N<sup>p</sup> gibi (her on kat adımda p basamak) ya da C·q<sup>N</sup> gibi (her adımda log₁₀(1/q) basamak) küçülmesi." },
    { term: "Yakınsama hızlandırma", definition: "Hatanın bilinen biçimini kullanarak aynı terimlerden daha hızlı yakınsayan bir dizi kurma; ör. ardışık kısmi toplamların ortalaması, Euler dönüşümü, Snell–Huygens bileşimi." },
    { term: "Makine epsilonu (ε)", definition: "1 ile ondan büyük ilk kayan nokta sayısı arasındaki fark; IEEE 754 çift duyarlıkta 2⁻⁵² ≈ 2.2·10⁻¹⁶." },
    { term: "Yok etme", definition: "Birbirine çok yakın iki yaklaşık sayı çıkarılınca ortak baş basamakların silinmesi ve sonucun bağıl hatasının büyümesi (İngilizcede catastrophic cancellation)." },
    { term: "Aşkın sayı", definition: "Katsayıları tam sayı olan hiçbir polinom denkleminin kökü olmayan sayı; π'nin aşkın olduğunu Lindemann 1882'de kanıtladı." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede π bir sabittir; üniversitede bir hesap problemine dönüşür ve birkaç dersin kesişiminde durur. <strong>Olasılık ve İstatistik</strong> dersinde isabet yöntemi binom dağılımının, ±1.96 SE aralığı merkezi limit teoreminin ilk uygulamasıdır; koşullu beklenen değer ve toplam varyans yasası ise <strong>varyans azaltma</strong> yöntemlerinin (kontrol değişkenleri, tabakalı örnekleme, önem örneklemesi) temelidir. <strong>Quasi-Monte Carlo</strong> rastgele noktalar yerine düzgün yayılmış, düşük tutarsızlıklı diziler kullanır; düzgün integrandlarda hata 1/√N yerine logaritmik çarpanlarla birlikte 1/N'ye yaklaşır. <strong>Analiz</strong> derslerinde Taylor açılımları kalan terimleriyle, alterne serilerin hata sınırı ve π'nin irrasyonelliğinin kanıtı gelir; Ivan Niven'in 1947'deki kısa kanıtı yalnızca türev ve integral kullanır.",
      "<strong>Sayısal Analiz</strong> yakınsama mertebesini, Richardson ekstrapolasyonunu ve hata analizini sistemleştirir; kararlılık ve koşul sayısı, saf ve kararlı formül arasındaki farkın genel dilidir. Arşimet'in harmonik–geometrik ortalama zinciri adım başına 0.6 basamak kazanır; Gauss'un aritmetik–geometrik ortalamasına (AGM) dayanan <strong>Gauss–Legendre yinelemesi</strong> ise karesel yakınsar, her adımda doğru basamak sayısını yaklaşık iki katına çıkarır (Salamin ve Brent, 1976). <strong>Bilgisayar Aritmetiği</strong> ve <strong>Hesaplamalı Bilim</strong> derslerinde IEEE 754 standardı, yuvarlama kipleri, aralık aritmetiği (Arşimet'in güvenli yöne yuvarlamasının modern hâli) ve keyfî duyarlıklı aritmetik işlenir: π rekorları Chudnovsky serisini 'ikili bölme' denen bir yöntemle toplar ve milyarlarca basamaklı sayıları hızlı Fourier dönüşümüne dayanan algoritmalarla çarpar.",
    ],
    topics: [
      "Binom dağılımı ve merkezi limit teoremi",
      "Varyans azaltma",
      "Quasi-Monte Carlo",
      "Yakınsama mertebesi ve Richardson ekstrapolasyonu",
      "Gauss–Legendre (AGM) yinelemesi",
      "IEEE 754 ve yuvarlama hatası",
      "Aralık aritmetiği",
      "İrrasyonellik ve aşkınlık kanıtları",
    ],
  },
  quiz: [
    {
      question:
        "Bir π yönteminin hatası N = 100 adımda −2.43·10⁻⁷, N = 1000 adımda −2.49·10⁻¹⁰ ölçülüyor. Bu hangi yöntem olabilir?",
      options: ["Leibniz serisi (hata ≈ 1/N)", "Leibniz ortalaması (hata ≈ 1/(2N²))", "Nilakantha serisi (hata ≈ 1/(4N³))", "Machin formülü (adım başına 1.40 basamak)"],
      answer: 2,
      explanation:
        "Oran 2.43·10⁻⁷ / 2.49·10⁻¹⁰ ≈ 976 ≈ 10³: on kat adım üç basamak getiriyor, yani hata 1/N³ gibi küçülüyor. Leibniz on kat adımda hatayı yalnız 10 kat, ortalaması 100 kat küçültürdü; geometrik yakınsayan Machin ise 900 adımda yüzlerce basamak kazanırdı. Sayfada N = 100 ve N = 1000 düğmeleriyle Nilakantha satırını oku: ölçülen hatanın öncü terime oranı 0.9999 ve 1.0000'dır.",
    },
    {
      question:
        "Aynı 10⁶ noktadan isabet yönteminin standart hatası 0.00164, ortalama değer yönteminin 0.000893 çıkıyor. İsabet yöntemi 0.000893'lük standart hataya yaklaşık kaç noktayla ulaşır?",
      options: ["1.8·10⁶", "3.4·10⁶", "10⁷", "Hiçbir zaman, çünkü isabet yöntemi yanlıdır"],
      answer: 1,
      explanation:
        "Standart hata σ/√N olduğundan N'yi (0.00164/0.000893)² ≈ 3.38 katına çıkarmak gerekir: 3.4·10⁶. 1.8 kat, standart hataların oranıdır; nokta sayısı onun karesiyle büyür. İsabet yöntemi yansızdır, ortalaması tam π'dir; kaybettiği şey verimliliktir. Sayfanın varyans kartı oranı 10⁶ noktada 3.38 ölçer (kuram 3.383).",
    },
    {
      question:
        "Saf formül s<sub>2n</sub> = √(2 − √(4 − s<sub>n</sub>²)) ile kararlı formül s<sub>2n</sub> = s<sub>n</sub>/√(2 + √(4 − s<sub>n</sub>²)) matematikte eşittir. Çift duyarlıkta 30 ikilemeden sonra ne olur?",
      options: [
        "İkisi de π'yi yaklaşık 16 basamakla verir",
        "Saf formül 0 verir, kararlı formül π'ye en yakın çift duyarlıklı sayıyı",
        "Saf formül daha doğrudur, çünkü daha az işlem yapar",
        "İkisi de 0 verir, çünkü kenar uzunluğu sıfıra çok yakındır",
      ],
      answer: 1,
      explanation:
        "s küçüldükçe √(4 − s²) 2'ye yaklaşır; 2'den çıkarmak ortak baş basamakları siler ve geriye yuvarlama gürültüsü kalır. 28. ikilemeden itibaren √(4 − s²) tam 2'ye yuvarlanır ve fark sıfırlanır. Kararlı biçim aynı değeri çıkarma yapmadan hesaplar; k = 30'da 3.141592653589793 verir, hatası π'nin çift duyarlıkta tam yazılamamasından gelen 1.22·10⁻¹⁶'dır. Kenarın küçüklüğü tek başına sorun değildir: çift duyarlık 10⁻³⁰⁸'e kadar inen sayıları tutabilir.",
    },
  ],
  next: [
    { href: "riemann-toplamlari.html", title: "Riemann Toplamları", why: "Aynı çeyrek çember, bu kez ortalama değer Monte Carlo'su ve ızgara kurallarıyla: 1/√n hızının boyuttan bağımsız olduğunu ve beş boyuttan sonra yamuk kuralını geçtiğini gör." },
    { href: "taylor-serisi.html", title: "Taylor Serisi", why: "Leibniz ve Machin serilerinin kaynağı olan arctan serisi ve yakınsaklık yarıçapı; Arşimet'in 1/n² hatalarını veren Taylor açılımı ve kalan terimi." },
    { href: "normal-dagilim.html", title: "Normal Dağılım", why: "Merkezi limit teoremi ve güven aralıkları: Monte Carlo hatasının neden çan eğrisine uyduğunu ve π ± 1.96 SE aralığının neden yaklaşık %95 kapsadığını gösterir." },
    { href: "birim-cember.html", title: "Birim Çember", why: "Çokgen sınırlarındaki sinüs ve tanjant birim çemberde birer uzunluktur; Hesap makinesi nasıl hesaplar sekmesi sinüsün CORDIC ile kayan noktada nasıl bulunduğunu gösterir." },
  ],
  sources: [
    { title: "Wikipedia · Approximations of π", url: "https://en.wikipedia.org/wiki/Approximations_of_%CF%80", note: "Arşimet, Liu Hui, Zu Chongzhi, el-Kâşî, van Ceulen ve Snell'in çokgenlerinden Ramanujan ve Chudnovsky serilerine, güncel rekorlara (İngilizce)." },
    { title: "Wikipedia · Liu Hui's π algorithm", url: "https://en.wikipedia.org/wiki/Liu_Hui%27s_%CF%80_algorithm", note: "Pisagor teoremiyle kenar ikileme, 96 ve 192 kenarlı hesap ve alan farklarının dörtte birine inmesinden yararlanan 'hızlı yöntem' (İngilizce)." },
    { title: "NASA JPL · How Many Decimals of Pi Do We Really Need?", url: "https://www.jpl.nasa.gov/edu/news/2016/3/16/how-many-decimals-of-pi-do-we-really-need/", note: "JPL'in seyrüseferde kullandığı 15 ondalık ve evren ölçeğinde bile 37 ondalığın yettiğini gösteren hesaplar (İngilizce)." },
    { title: "Wikipedia · Indiana pi bill", url: "https://en.wikipedia.org/wiki/Indiana_pi_bill", note: "1897'deki 246 sayılı tasarının öyküsü, C. A. Waldo'nun rolü ve metnin ima ettiği değerler (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
