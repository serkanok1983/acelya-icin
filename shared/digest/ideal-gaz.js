window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["ideal-gaz"] = {
  slug: "ideal-gaz",
  title: "İdeal Gaz: Rastgele Çarpışmalardan Kusursuz Bir Yasa",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Basınç, duvara saniyede bırakılan momentumdur; sıcaklık, moleküllerin ortalama hareket enerjisi. Düz bir sert disk gazında PV = nRT'nin iki boyutlu hâlini, Maxwell–Boltzmann dağılımını ve ideallikten sapmayı ölç.",
  hook:
    "Şu anda elinin üstündeki her santimetrekareye saniyede yaklaşık 3 × 10<sup>23</sup> hava molekülü çarpıyor ve bunların üçte ikisinden fazlası sesten hızlı. Tek tek hiçbirini hissetmezsin; toplamları ise o santimetrekareye bir kilogramlık ağırlık kadar, 10 newton bastırır. Bu görünmez dolu nasıl olur da PV = nRT gibi pürüzsüz bir yasaya dönüşür?",
  bigIdea:
    "Basınç, duvara çarpan moleküllerin taşıdığı momentumun ortalamasıdır; sıcaklık molekül başına düşen ortalama hareket enerjisini ölçer; ikisini yan yana koyunca molekül ağır ya da hafif, gaz üç ya da iki boyutlu olsun, aynı yasa çıkar: <em>P = n·k<sub>B</sub>·T</em>.",
  story: [
    "1662'de Robert Boyle, ucu kapalı J biçimli bir cam tüpün kısa kolunda biraz hava hapsetti ve uzun koldan cıva döktü. Cıva yükseldikçe hava sıkıştı; Boyle'un kendi gözlemiyle, yoğunluğu iki katına çıkan hava 'iki kat güçlü bir yay' kazanıyordu. Bugün P·V = sabit diye yazdığımız bu ilişkiyi Richard Towneley ile Henry Power da fark etmişti; bazı tarihçilere göre düzeneği Boyle'un yardımcısı Robert Hooke kurmuştu ve Fransa'da Edme Mariotte aynı yasayı 1679'da bağımsız olarak buldu. Ama neden böyleydi? Boyle havayı, aralarında görünmez yaylar bulunan duran parçacıklar olarak düşünüyordu. 1738'de Daniel Bernoulli <em>Hydrodynamica</em>'da bambaşka bir resim çizdi: gaz her yöne koşturan sayısız küçük parçacıktır, basınç onların pistona çarpmasıdır, ısınan gazın parçacıkları daha hızlıdır. Boyle yasası bu resimden kendiliğinden çıkıyordu; ama enerjinin korunumu henüz bilinmediği için fikir bir yüzyıldan uzun süre kenarda kaldı.",
    "Fikri yeniden bulanlar da şanssızdı. İskoç John James Waterston, kinetik kuramın temel sonuçlarını doğru türeten makalesini 1845'te Royal Society'ye gönderdi; hakem raporuna 'Makale saçmalıktan başka bir şey değil' yazıldı. Waterston kendine kopya ayırmamıştı; metin arşivde kaldı ve Lord Rayleigh onu ancak Waterston'un ölümünden sonra bulup 1892'de yayımlattı. Kuramı kalıcı kılanlar 1856'da August Krönig ve 1857'de Rudolf Clausius oldu. Clausius, buzun erime sıcaklığında azot molekülleri için saniyede 492 metre hesapladı. Hollandalı meteorolog Buys Ballot hemen itiraz etti: moleküller bu kadar hızlıysa, odanın bir ucunda açılan bir kokunun öbür uca varması neden dakikalar sürüyor? Clausius'un 1858'deki cevabı kurama yeni bir kavram ekledi: <strong>ortalama serbest yol</strong>. Moleküller hızlıdır ama bir sonrakine çarpmadan önce çok kısa bir yol alırlar; yolları zikzaktır ve koku bu zikzaklarla ancak yavaşça yayılır.",
    "1859'da 28 yaşındaki James Clerk Maxwell bu zikzaklı kalabalığa yeni bir soru sordu: hızlar moleküller arasında nasıl dağılır? Hız bileşenlerinin birbirinden bağımsız olduğunu ve hiçbir yönün ayrıcalıklı olmadığını varsayarak dağılımın biçimini buldu ve 1860'ta yayımladı; bu, fiziğin ilk istatistiksel yasası sayılır. Ludwig Boltzmann 1868'den başlayarak sonucu genelleştirdi ve 1872'de çarpışmaların her başlangıç dağılımını neden bu biçime sürüklediğini gösteren <strong>H teoremini</strong> yayımladı. Kanıtlar ise yavaş geldi. Moleküllerin gerçekliği 20. yüzyılın başına kadar tartışıldı; Albert Einstein'ın 1905'teki Brown hareketi kuramı ve Jean Perrin'in 1908'den itibaren yaptığı ölçümler tartışmayı kapattı. 1920'de Otto Stern döner bir düzenekle gümüş atomlarının hızını doğrudan ölçtü. 1955'te Robert Miller ile Polykarp Kusch, potasyum ve talyum atom demetlerinde ölçtükleri hız dağılımının Maxwell'in eğrisinden en yüksek değerin yüzde biri kadar bile sapmadığını gösterdiler.",
    "Bilgisayar çağında sahneye bu sayfanın gazı çıktı. 1953'te Los Alamos'ta Nicholas Metropolis, Arianna ve Marshall Rosenbluth, Augusta ve Edward Teller, MANIAC bilgisayarında 224 sert diskin hal denklemini hesapladılar. Makale, bugün Monte Carlo yöntemi dediğimiz algoritmayı ve kutu kenarı etkilerini silen periyodik sınır koşullarını doğurdu. Algoritma Metropolis'in adını taşır; ama Marshall Rosenbluth 2003'te asıl işi kendisiyle Arianna'nın yaptığını, Metropolis'in bilgisayar zamanı sağladığını anlattı. 1957'de Livermore'da Berni Alder ile Thomas Wainwright aynı soruyu öteki yoldan çözdü: sert kürelerin Newton yasalarına uyan hareketini çarpışma çarpışma izlediler. UNIVAC'ta 32 küre saatte yaklaşık 300 çarpışma yapabiliyordu. Bu sayfa onların <strong>olay güdümlü moleküler dinamik</strong> yönteminin torunudur: tarayıcın varsayılan hızda bile saniyede yaklaşık 250 disk çarpışmasını tam zamanında işler ve basıncı, Bernoulli'nin dediği gibi duvara aktarılan momentumdan ölçer.",
  ],
  core: [
    {
      heading: "Basınç: duvara yağan momentum",
      body:
        "Duvara x yönünde v<sub>x</sub> hızıyla çarpıp geri seken bir molekül, duvara 2m·v<sub>x</sub> momentum bırakır. Birim zamanda duvarın bir parçasına kaç molekülün çarptığı hem sayı yoğunluğuna n hem de v<sub>x</sub>'e bağlıdır: hızlı molekül hem daha sert hem daha sık vurur. Bu iki çarpanı duvara doğru giden yarı kalabalık üzerinden toplayınca P = n·m·⟨v<sub>x</sub>²⟩ çıkar. Hiçbir yön ayrıcalıklı olmadığından ⟨v<sub>x</sub>²⟩, ⟨v²⟩'nin boyut sayısına bölümüdür: uzayda üçte biri, sayfadaki düz gazda yarısı. Sayfa basıncı tam bu tanımla ölçer: duvarların köşelerden uzak kısımlarına aktarılan momentumu toplar, duvar uzunluğuna ve süreye böler. İki boyutta basınç birim <em>alana</em> değil birim <em>uzunluğa</em> düşen kuvvettir; birimi N/m, sayfada mN/m. Tek tek vuruşlar rastgeledir; zaman grafiğindeki basınç çizgisinin birkaç yüzde titremesi bundandır, tablonun uzun ortalaması ise kararlıdır.",
      formula: "P = n·m·⟨v<sub>x</sub>²⟩ = (1/D)·n·m·⟨v²⟩",
      formulaNote: "D boyut sayısıdır. Üç boyutta P = ⅓·n·m·⟨v²⟩ ve n birim hacimdeki, iki boyutta P = ½·n·m·⟨v²⟩ ve n birim alandaki molekül sayısıdır.",
    },
    {
      heading: "Sıcaklık: her hareket yönüne eşit pay",
      body:
        "Kinetik formülü deneyin yasasıyla, P = n·k<sub>B</sub>·T ile yan yana koy: ikisinin tutması için molekül başına ortalama öteleme enerjisi her hareket yönü için ½k<sub>B</sub>T olmalıdır. Buna <strong>eşbölüşüm</strong> denir. Uzaydaki tek atomlu gazda ⟨E<sub>k</sub>⟩ = (3/2)k<sub>B</sub>T, 300 K'de 6.2 zJ (1 zJ = 10⁻²¹ J); sayfanın düz gazında k<sub>B</sub>T = 4.1 zJ. Molekülleri mol olarak sayınca N·k<sub>B</sub> = n·R olur ve tanıdık PV = nRT çıkar (burada n mol sayısı, R = N<sub>A</sub>·k<sub>B</sub> = 8.314 J/(mol·K)). Formülde kütle yoktur: aynı T ve yoğunlukta helyum da ksenon da aynı basıncı yapar; değişen yalnızca hızlardır, 1/√m ile. Isı sığası da boyutu ele verir: molekül başına C<sub>V</sub> = (D/2)k<sub>B</sub> ve γ = C<sub>P</sub>/C<sub>V</sub> = (D + 2)/D; uzayda 5/3, düz gazda tam 2. Yalıtılmış gaz yavaşça sıkıştırılınca bu yüzden T·V<sup>2/D</sup> sabit kalır: düz gazda T·A, uzayda T·V<sup>2/3</sup>.",
      formula: "⟨½mv²⟩ = (D/2)·k<sub>B</sub>T   ⇒   P = n·k<sub>B</sub>T",
      formulaNote: "Her hareket yönü ortalama ½kT taşır (k: Boltzmann sabiti). Termostat kapalıyken Isıt düğmesi gaza 207 zJ verir ve 200 diski 300'den 375 K'e çıkarır; aynı enerji uzaydaki 200 atomu yalnızca 50 K ısıtırdı.",
    },
    {
      heading: "Maxwell–Boltzmann: çarpışmaların ördüğü dağılım",
      body:
        "Maxwell'in 1860 fikri iki varsayıma dayanır: hız bileşenleri birbirinden bağımsızdır ve hiçbir yön ayrıcalıklı değildir. İkisini birden sağlayan tek dağılım, her bileşen için bir çan eğrisidir: e<sup>−mv<sub>x</sub>²/2k<sub>B</sub>T</sup>. Bileşenlerin dağılımı her boyutta aynıdır; değişen, belirli bir v hızına giden yönlerin sayısıdır: düzlemde 2πv uzunluğunda bir çember, uzayda 4πv² alanında bir küre. Bu yüzden düz dağılım sıfırdan doğru gibi, uzaydaki parabol gibi kalkar ve düz gazın eğrisi göreli olarak daha geniştir: σ/⟨v⟩ düzlemde 0.523, uzayda 0.422. Argon 300 K'de sayfada v<sub>p</sub>, ⟨v⟩, v<sub>rms</sub> = 250, 313, 353 m/s; uzayda 353, 399, 433 m/s olurdu. Dağılımı kuran çarpışmalardır: her çarpışma enerjiyi ve momentumu korur ama iki molekül arasında yeniden paylaştırır. Toplam enerji sabitken en çok mikrodurumla gerçekleşen paylaşım budur ve Boltzmann'ın H teoremi her başlangıcın oraya aktığını gösterir.",
      formula: "f<sub>2B</sub>(v) = (mv/k<sub>B</sub>T)·e<sup>−mv²/2k<sub>B</sub>T</sup><br>f<sub>3B</sub>(v) = 4π·(m/2πk<sub>B</sub>T)<sup>3/2</sup>·v²·e<sup>−mv²/2k<sub>B</sub>T</sup>",
      formulaNote: "v ve v² çarpanları yön sayısıdır (çember çevresi 2πv, küre yüzeyi 4πv²). En olası hız düzlemde √(kT/m), uzayda √(2kT/m); sayfadaki beyaz eğri iki boyutlu formüldür.",
    },
    {
      heading: "Ortalama serbest yol: kalabalıkta zikzak",
      body:
        "İlerleyen bir molekül önündeki bir şeridi süpürür ve merkezi o şeride düşen her molekülle çarpışır. Uzayda bu şeridin kesiti σ = πd² alanlı bir dairedir; düzlemde ise σ = 2d genişliğinde bir çizgi. Birim yolda ortalama n·σ çarpışma olur, öyleyse iki çarpışma arası yol 1/(n·σ) kadardır. Öteki moleküller de hareket ettiği için göreli hız ortalama √2 kat büyüktür ve λ bu oranda kısalır. Oda koşullarında havada λ ≈ 67 nm, molekül çapının yaklaşık 180 katıdır; sayfanın varsayılan gazında λ ≈ 6.1 nm ≈ 18d. λ ∝ 1/n olduğundan kutuyu yarıya indirince λ da yarıya iner. Yoğun gazda komşular çarpışmayı sıklaştırır; sayfa bunu Enskog'un temas çarpanı g ile hesaba katar (seyreltik gazda g ≈ 1). Buys Ballot'un kokusunun cevabı da buradadır: N serbest uçuştan sonra molekülün net uzaklığı N·λ değil, rastgele yürüyüşteki gibi yaklaşık √N·λ'dır.",
      formula: "λ = 1/(√2·n·σ)   ·   σ = πd² (uzay)   ·   σ = 2d (düzlem)",
      formulaNote: "Düz gazda λ = 1/(2√2·n·d). Çarpışmalar arası ortalama süre τ = λ/⟨v⟩; sayfanın varsayılan ayarında yaklaşık 19.5 ps.",
    },
    {
      heading: "İdeallikten sapma: kapladığı yer ve çekim",
      body:
        "İdeal gaz yasası iki şeyi yok sayar: moleküllerin kendi boyutunu ve aralarındaki çekimi. Sapmanın ölçüsü <strong>sıkıştırılabilirlik çarpanıdır</strong>, Z = PV/(N·k<sub>B</sub>T); ideal gazda tam 1. Sert parçacıklarda bir merkez ötekinin çevresindeki d yarıçaplı bölgeye giremez; bu dışlanmış alan ya da hacim serbest yeri daraltır ve basıncı artırır. Seyreltik gazda Z ≈ 1 + B<sub>2</sub>·n olur: diskler için B<sub>2</sub> = πd²/2 (disk alanının iki katı), küreler için B<sub>2</sub> = 2πd³/3 (küre hacminin dört katı); doluluk oranı η ile sırasıyla Z ≈ 1 + 2η ve Z ≈ 1 + 4η. 1873'te Johannes van der Waals buna çekimi ekledi: (P + a·n²)(1 − b·n) = n·k<sub>B</sub>T. Çekim basıncı düşürür, dışlanmış hacim artırır; gaz ile sıvının sürekliliğini ve kritik noktayı açıklayan ilk denklem budur. Yüksek dolulukta bu basit düzeltmeler çöker; sayfa sert diskler için simülasyonlarla yüzde birin altında uyuşan Henderson (1975) denklemini kullanır. Sayfanın diskleri birbirini çekmediği için orada Z hiç 1'in altına inmez ve gaz hiçbir sıcaklıkta sıvılaşmaz.",
      formula: "Z = P·A/(N·k<sub>B</sub>T) = (1 + η²/8)/(1 − η)²",
      formulaNote: "Sert diskler için Henderson denklemi; η = N·πd²/(4A). Seyreltikte Z ≈ 1 + 2η; η = 0.47'de Z ≈ 3.7. Üç boyuttaki karşılığı Carnahan–Starling denklemidir.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar, argon benzeri sert disklerin kesin bir moleküler dinamiğidir: adım boyu yoktur, her çarpışma tam anında çözülür. <strong>Deney ayarları</strong> panelinde <strong>Gaz</strong> menüsü (helyumdan ksenona yalnızca kütle değişir), <strong>Molekül sayısı N</strong>, <strong>Disk çapı d</strong>, <strong>Termostat sıcaklığı T</strong>, termostat kutusu, <strong>Isıt</strong> ve <strong>Soğut</strong> düğmeleri, <strong>Kutu genişliği W</strong> (pistonu sağdan sürükleyerek de değişir), <strong>Piston hızı</strong>, <strong>Simülasyon hızı</strong> ve <strong>Herkese aynı hız</strong> düğmesi var; kutunun yüksekliği hep 30 nm. Kutudaki mor iz bir molekülün yoludur (kutuya dokunarak başka birini seçebilirsin); her düz parçası, iki çarpışma ya da duvar vuruşu arasındaki bir serbest uçuştur. Tablo her büyüklüğü Ölçülen, Kuram ve Fark sütunlarıyla verir ve son ayar değişikliğinden beri biriktirir. Varsayılan 50 ps/s hızında P ve Z satırları 4 saniyede belirir, 30 saniyede belirsizlik yaklaşık ±%1'e iner; Simülasyon hızı'nı 200 ps/s yaparsan bekleme süreleri yaklaşık dörtte bire iner. Her deneye varsayılan ayarlarla başla (Argon, N = 200, d = 0.34 nm, T = 300 K, W = 40 nm, piston 25 m/s); sayfayı yenilemek hepsini geri getirir. Gaz rastgele olduğu için aşağıdaki değerler aralık olarak verildi; senin denemen bu aralığa düşmeli.",
    experiments: [
      {
        title: "Boyle'u moleküllerle sına",
        predict: "Kutunun alanını yarıya indirirsen basınç tam iki katına mı çıkar, biraz fazlasına mı? Ortalama serbest yol ve çarpışmalar arası süre ne olur?",
        do: "Sıfırla'ya bas, termostat açıkken 30 saniye bekle ve tablodan Basınç P, Z ve λ satırlarını not et. Sonra Kutu genişliği W'yi 20 nm'ye çek. Piston 25 m/s'yle yaklaşık 16 saniyede varır; durduktan sonra 30 saniye daha bekleyip aynı satırları oku. Son olarak Disk çapı d'yi 0.10 nm yapıp ölçümü 20 ve 40 nm'de tekrarla.",
        observe: "40 nm'de P ≈ 0.71 mN/m (ideal sütunu 0.690), 20 nm'de ≈ 1.47 mN/m (ideal 1.381): oran 2.06 civarı (tek denemede 2.02–2.10), Z de 1.03'ten 1.06'ya çıkar. λ 6.1'den 3.0 nm'ye, τ 19.5'ten 9.5 ps'ye iner. Enerji kartlarında Piston işi ≈ +610 zJ, Isı Q ≈ −610 zJ, ΔU = 0.0 zJ okunur. d = 0.10 nm'de oran 2.00 ± 0.01'dir.",
        explain: "Sıcaklık sabitken her vuruş ortalama aynı momentumu taşır; alan yarıya inince birim duvar uzunluğuna düşen vuruş sayısı iki katına çıkar. Fazladan %3 disklerin kendi alanından gelir: Z ≈ 1 + 2η ve η %1.5'ten %3'e çıktı. Yaptığın iş gazı ısıtmaz, termostat onu ısı olarak dışarı alır; ideal gaz için beklenen iş N·k<sub>B</sub>T·ln 2 = 574 zJ'dür, disklerin alanı ve pistonun hızı bunu biraz artırır.",
      },
      {
        title: "Herkese aynı hız: düzen kaç çarpışmada çözülür?",
        predict: "Bütün moleküllere aynı hızı verirsen bu düzen sürer mi? Sürmezse Maxwell–Boltzmann biçimine dönmesi kaç çarpışma alır? Bu arada basınç değişir mi?",
        do: "Varsayılan durumda birkaç saniye bekle ve Herkese aynı hız'a bas. Gözünü hız histogramına ve sağ üstündeki 'dağılım genişliği σ/⟨v⟩' yazısına dik. 5 saniye sonra zaman grafiğindeki basınç çizgisine, 30 saniye sonra tablodaki P satırına bak.",
        observe: "Tık anında histogram tek çubuğa çöker: 200 molekülün hemen hepsi 353 m/s'yi (v<sub>rms</sub>) içeren çubuktadır ve σ/⟨v⟩ sıfıra yakındır. Yarım saniyede çubuk yarıdan fazla erir (σ/⟨v⟩ ≈ 0.32), 1 saniyede ≈ 0.41, 2 saniyede ≈ 0.48 olur; 5 saniyede 0.52 ± 0.02 ile beyaz eğriye oturur (MB: 0.523). T 300.0 K'de kalır, basınç çizgisi sıçramaz ve P yine 0.71 mN/m civarındadır.",
        explain: "Her molekül saniyede ortalama 2.5 kez çarpışır (τ ≈ 19.5 ps) ve her çarpışma iki molekülün enerjisini merkezler doğrultusunda yeniden paylaştırır. Toplam enerji sabitken en çok mikrodurumu olan paylaşım Maxwell–Boltzmann'dır; oraya varmak 4–5 çarpışma süresi alır. Basınç ise dağılımın biçimine değil yalnızca ⟨v²⟩'ye bağlıdır ve düğme ⟨v²⟩'yi değiştirmez.",
      },
      {
        title: "Kalabalık gaz: ideal yasa ne kadar yanılır?",
        predict: "Diskleri büyütüp kutunun yarısını doldurursan gaz ideal yasanın dediğinden daha az mı, daha çok mu bastırır? Ortalama serbest yol bir disk çapından kısa olabilir mi?",
        do: "Molekül sayısı N'yi 400'e, Disk çapı d'yi 1.20 nm'ye çıkar. Sonra Kutu genişliği W kaydırıcısını en sola çek: piston 30.5 nm'de durur ve kaydırıcının altında 'En dar kutu: 30.5 nm (doluluk η en çok 0.50)' yazar. Piston durduktan sonra 30 saniye bekle.",
        observe: "Doluluk η %49.4 (iç bölge yaklaşık %47). Basınç ≈ 6.3 mN/m, ideal sütunu ise 1.81: Fark +%247 civarı, yani Z ≈ 3.47. Henderson kuramı 3.49 der; fark yüzde birin altındadır. λ ≈ 0.25 nm, disk çapının beşte biri; τ ≈ 0.8 ps.",
        explain: "Bir diskin merkezi ötekinin çevresindeki d yarıçaplı bölgeye giremez; bu dışlanmış alan serbest yeri daraltır ve vuruşları sıklaştırır. Seyreltik gaz için yeterli olan Z ≈ 1 + 2η burada 2 civarında kalır; van der Waals'ın 1/(1 − 2η) biçimi ise η = 0.5'te sonsuza gider. Bu yoğunlukta 'serbest uçuş' artık bir sıvıdaki titreşime benzer: her disk komşularının kurduğu kafeste çırpınır.",
      },
      {
        title: "Isıtmadan ısıtmak: yalıtılmış gazı sıkıştır",
        predict: "Termostatı kapatıp alanı yarıya indirirsen gaz ısınır mı? Düz ideal gazda T·A sabit kalmalı; 300 K'den kaç kelvine çıkar? Pistonu çok hızlı sürmek sonucu değiştirir mi?",
        do: "Sıfırla'ya bas ve Termostat açık kutusunun işaretini kaldır; sıcaklık satırının kuramı 'tersinir adyabat' olur. W'yi 20 nm'ye çek, piston durunca T'yi ve enerji kartlarını oku, sonra W'yi 40 nm'ye geri al. Ardından Piston hızı'nı 200 m/s yap, W 40 nm'deyken Sıfırla'ya bas ve aynı gidiş-dönüşü tekrarla.",
        observe: "25 m/s'de T ≈ 625 K (tek denemede 610–640), kuram 619 K; Piston işi ile ΔU ≈ +900 zJ, Isı Q = 0.0 zJ. 40 nm'ye dönünce T ≈ 305 K. 200 m/s'de gaz 710–790 K'e fırlar ve dönüşte 300'e değil 400–450 K'e iner; net piston işi +250 ile +450 zJ arasında kalır.",
        explain: "Yaklaşan pistona çarpan molekül v' = 2u − v ile daha hızlı döner, uzaklaşan pistondan yavaşlayarak. Yavaş harekette kazanç ve kayıp tersinir adyabatı izler: seyreltik limitte T·A sabittir (γ = 2), disklerin alanı yüzünden kuram 600 değil 619 K der. Hızlı pistonun önünde moleküller yığılır; fazladan yapılan iş, dönüşte geri alınamayan ısıya dönüşür.",
      },
    ],
  },
  wow: [
    {
      title: "Gazı incelt, sürtünmesi azalmasın",
      body:
        "Maxwell 1860'ta yayımladığı makalede kinetik kuramdan iki tuhaf sonuç çıkardı: gazın viskozitesi yoğunluğa bağlı olmamalı ve sıvılarınkinin tersine sıcaklıkla artmalıydı. Gaz incelince sürtünmeyi taşıyan molekül azalır, ama her biri bir sonraki çarpışmadan önce o oranda uzağa gidip momentumu daha uzağa taşır; ikisi birbirini götürür. Eldeki tek deney viskozitenin yoğunlukla arttığını söylüyordu ve Maxwell kuramın çürüyeceğini bekledi. 1865'te Londra'daki evinde, gaz içinde salınan disklerin sönümünü kendisi ölçtü; eşi Katherine odayı sabit sıcaklıkta tutmak için saatlerce ateşi besledi. Viskozite geniş bir yoğunluk aralığında sabit çıktı: bu kez kuram deneyi düzeltmişti.",
    },
    {
      title: "Su yüzünde iki boyutlu bir gaz",
      body:
        "Üniversiteye kadınlar alınmadığı için fizik okuyamayan Agnes Pockels, 1891'de Lord Rayleigh'e bir mektup yazdı: on yıldır evinde bir tepsi, kaydırılan bir şerit ve bir düğmeyle su yüzeyindeki yağ ve sabun tabakalarını ölçüyordu. Rayleigh mektubu Nature'a gönderdi. Düzeneği geliştiren Irving Langmuir, yüzey kimyası çalışmalarıyla 1932 Nobel Kimya Ödülü'nü aldı. Suda çözünmeyen moleküllerin seyrek bir tek katmanı, yüzeyde kayan iki boyutlu bir gaz gibi davranır: yüzey basıncı Π·A = k<sub>B</sub>T yasasına uyar ve tıpkı bu sayfadaki gibi mN/m ile ölçülür. Molekül başına 6 nm² düşerken 300 K'de Π = 0.69 mN/m bulunur: sayfanın varsayılan ideal basıncı budur, suyun yüzey geriliminin yüzde birinden az.",
    },
    {
      title: "Bu kutunun diskleri 0.70'te erir",
      body:
        "Sert diskleri sıkıştırmaya devam etsen ne olur? Aralarında hiçbir çekim olmadığı hâlde, yeterince sıkışınca düzenli bir kristale dizilirler; 1962'de Alder ve Wainwright bu geçişi bilgisayarda gördü. Erimenin nasıl olduğu ise elli yıl tartışıldı: tek adımda mı, yoksa 1970'lerde öngörülen ara bir 'heksatik' evreden geçerek mi? 2011'de Etienne Bernard ile Werner Krauth, yaklaşık bir milyon diskle aylarca süren simülasyonlarla cevabı verdi: sıvı η ≈ 0.70'te heksatik evreye, o da η ≈ 0.72'de katıya geçer. Sayfa doluluğu 0.50'de durdurur; ekranda gördüğün en kalabalık kutu bile hâlâ bir sıvıdır.",
    },
  ],
  worked: {
    title: "Bir litre havanın içinde",
    prompt:
      "Oda koşullarında (25 °C = 298.15 K, 1 atm = 101 325 Pa) bir litre havada kaç molekül vardır? Azot molekülünün viskozite ölçümlerinden çıkan etkin çapını d ≈ 0.37 nm ve kütlesini 28.0 u alarak ortalama serbest yolu, ortalama hızı ve bir molekülün saniyedeki çarpışma sayısını bul; sonuçları sayfanın düz gazıyla karşılaştır.",
    steps: [
      "Sayı yoğunluğu P = n·k<sub>B</sub>T'den: n = 101 325 Pa / (1.380649 × 10⁻²³ J/K × 298.15 K) = 2.46 × 10²⁵ m⁻³. Bir litre 10⁻³ m³ olduğundan içinde 2.46 × 10²² molekül vardır; bu 0.041 mol eder (molar hacim 24.5 L).",
      "Komşu moleküller arası ortalama uzaklık n<sup>−1/3</sup> ≈ 3.4 nm, yani yaklaşık 9 molekül çapı. Moleküllerin kendi hacmi toplamın yalnızca n·πd³/6 ≈ %0.07'si: hava neredeyse tümüyle boşluktur. NIST verilerine göre 25 °C ve 1 atm'de gerçek azotun Z'si 0.9998'dir.",
      "Ortalama serbest yol: σ = πd² = 4.30 × 10⁻¹⁹ m² ve λ = 1/(√2·n·σ) = 1/(1.414 × 2.46 × 10²⁵ m⁻³ × 4.30 × 10⁻¹⁹ m²) ≈ 6.7 × 10⁻⁸ m = 67 nm, yaklaşık 180 molekül çapı.",
      "Hızlar: m = 28.0 × 1.661 × 10⁻²⁷ kg = 4.65 × 10⁻²⁶ kg; ⟨v⟩ = √(8k<sub>B</sub>T/(πm)) ≈ 475 m/s ve v<sub>rms</sub> = √(3k<sub>B</sub>T/m) ≈ 515 m/s. Aynı formül 0 °C'de 493 m/s verir: Clausius'un 1857'de bulduğu 492 m/s budur.",
      "Çarpışma sıklığı ν = ⟨v⟩/λ = 475 m/s ÷ 6.7 × 10⁻⁸ m ≈ 7.1 × 10⁹ s⁻¹; çarpışmalar arası süre τ ≈ 0.14 ns = 140 ps. Bir saniyede molekül 475 m yol alır ama yedi milyar kez yön değiştirir; rastgele yürüyüşte net uzaklık yalnızca √N·λ ≈ 8.4 × 10⁴ × 67 nm ≈ 6 mm mertebesindedir.",
    ],
    result:
      "Bir litrede 2.5 × 10²² molekül var; her biri ortalama 67 nm (180 çap) yolda bir, saniyede yedi milyar kez çarpışır. Sayfanın varsayılan düz gazında λ ≈ 6.1 nm ≈ 18d ve τ ≈ 19.5 ps: çapına oranla sayfanın gazı havadan on kat kalabalıktır, ideal yasadan %3 sapması da bundandır. Buys Ballot'un kokusunun yavaşlığı da bu zikzaklardan gelir.",
  },
  misconceptions: [
    {
      myth: "Isınan gazın molekülleri büyür; gaz bu yüzden genleşir.",
      truth:
        "Moleküllerin boyu sıcaklıkla değişmez, değişen hızlarıdır. Sayfada Termostat sıcaklığı T'yi 300'den 1200 K'e çıkar: Disk çapı d aynı kalır, ortalama hız 313'ten 626 m/s'ye iki katına, basınç dört katına çıkar. Piston serbest olsaydı bu sık ve sert vuruşlar onu dışarı iter, gaz genleşirdi.",
    },
    {
      myth: "Ağır moleküllü gaz aynı sıcaklıkta duvara daha sert vurur, bu yüzden basıncı daha büyüktür.",
      truth:
        "Ağır molekül her vuruşta daha çok momentum bırakır ama o kadar yavaştır ki duvara daha seyrek ulaşır; iki etki tam olarak sadeleşir. Sayfada Gaz menüsünden Helyum'dan Ksenon'a geçince ⟨v⟩ 989'dan 173 m/s'ye düşer, basınç 0.71 mN/m'de kalır. Aynı sıcaklık ve yoğunlukta basınç yalnızca molekül sayısına bağlıdır; Avogadro'nun 1811 varsayımının kinetik açıklaması budur.",
    },
    {
      myth: "Bir gazın bütün molekülleri aynı hızla hareket eder; sıcaklık o hızı söyler.",
      truth:
        "Hızlar geniş bir dağılıma yayılır ve her çarpışmada değişir; sıcaklık tek bir molekülün değil, kalabalığın ortalama enerjisinin ölçüsüdür. Sayfanın 300 K'deki argon gazında moleküllerin yaklaşık %6'sı 600 m/s'den hızlı, %10'u 115 m/s'den yavaştır. Herkese aynı hız düğmesiyle kurduğun düzen de birkaç saniyede çözülür.",
    },
    {
      myth: "Havada moleküller neredeyse birbirine değecek kadar sık dizilidir.",
      truth:
        "Ders kitabı çizimleri yanıltır. Oda koşullarında komşu moleküller arası ortalama uzaklık 3.4 nm, yaklaşık 9 molekül çapıdır ve moleküller hacmin yalnızca %0.07'sini doldurur. Hava için ideal gaz yasasının binde birden iyi çalışmasının sebebi budur. Sayfanın varsayılan gazı %1.5 dolulukla bundan çok daha kalabalıktır ve ideal yasadan %3 sapar.",
    },
  ],
  glossary: [
    { term: "Kinetik kuram", definition: "Gazın basınç, sıcaklık ve viskozite gibi makroskobik özelliklerini sayısız molekülün hareketinden ve çarpışmalarından türeten model." },
    { term: "Boltzmann sabiti", definition: "Sıcaklığı molekül başına enerjiye çeviren sabit: k<sub>B</sub> = 1.380649 × 10⁻²³ J/K (2019'dan beri tanım gereği tam); R = N<sub>A</sub>·k<sub>B</sub>." },
    { term: "Eşbölüşüm", definition: "Dengede, enerjiye karesel katkı yapan her serbestlik derecesinin (ör. her öteleme yönünün) ortalama ½k<sub>B</sub>T enerji taşıması." },
    { term: "Maxwell–Boltzmann dağılımı", definition: "Dengedeki bir gazda molekül hızlarının dağılımı; her hız bileşeni, genişliği √(k<sub>B</sub>T/m) olan bir çan eğrisine uyar." },
    { term: "Ortalama serbest yol (λ)", definition: "Bir molekülün art arda iki çarpışması arasında aldığı ortalama yol; λ = 1/(√2·n·σ)." },
    { term: "Doluluk oranı (η)", definition: "Moleküllerin kendi kapladığı alanın (uzayda hacmin) toplam alana oranı; disklerde η = N·πd²/(4A)." },
    { term: "Sıkıştırılabilirlik çarpanı (Z)", definition: "Z = PV/(N·k<sub>B</sub>T); ideal gazda 1, itme baskınsa 1'den büyük, çekim baskınsa küçüktür." },
    { term: "Adyabatik süreç", definition: "Isı alışverişi olmadan geçen süreç; sayfada termostat kapalıyken pistonun gazı sıkıştırması ya da genleştirmesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede ideal gaz bir formüldür; üniversitede bir türetme zinciri. <strong>Fizik I–II</strong> dizisinin ısı ve kinetik kuram bölümü basıncı momentum akısından türetir, eşbölüşümü ve Maxwell–Boltzmann dağılımını kullanır. <strong>Termodinamik</strong> aynı gazı iş, ısı ve çevrimlerle makroskobik olarak inceler. <strong>İstatistiksel Mekanik</strong> ise bu defterdeki her sonucu tek bir kaynaktan çıkarır: Boltzmann çarpanı e<sup>−E/k<sub>B</sub>T</sup> ve bölüşüm fonksiyonu. Orada eşbölüşümün neden 'her karesel terime ½k<sub>B</sub>T' dediğini, hal denkleminin virial açılımını ve B<sub>2</sub>'nin moleküller arası potansiyelin bir integrali olduğunu görürsün. Boltzmann denklemi ve Chapman–Enskog kuramı viskoziteyi, ısı iletimini ve difüzyonu hesaplar; Maxwell'in 1860 paradoksu orada sıradan bir sonuçtur. <strong>Fiziksel Kimya</strong> gerçek gazları, Lennard-Jones potansiyelini, kritik noktayı ve tepkime hızlarının çarpışma kuramını işler.",
      "<strong>Hesaplamalı Fizik</strong> ve moleküler dinamik derslerinde bu sayfanın yaptığını kendin yazarsın: sert diskler için olay güdümlü dinamik, yumuşak potansiyeller için Verlet algoritması, dengeyi örneklemek için Metropolis Monte Carlo ve kenar etkilerini silmek için periyodik sınır koşulları. Orada boyutun ne kadar önemli olduğunu da görürsün. Alder ile Wainwright 1970'te bir diskin hızının kendisiyle ilişkisinin üstel değil, yaklaşık 1/t gibi yavaş söndüğünü buldu: molekülün ardında bıraktığı girdap onu itmeye devam eder. Uzayda bu kuyruk 1/t<sup>3/2</sup> ile söner ve difüzyon katsayısı sonludur; düzlemde ise toplamı ıraksar ve iki boyutlu akışkanın difüzyon katsayısı ölçüm süresi uzadıkça büyümeyi sürdürür. Düz bir dünyada gaz yasası aynı kalır, taşınım yasaları değişir.",
    ],
    topics: [
      "Fizik I–II: kinetik kuram",
      "Termodinamik: hal denklemleri",
      "İstatistiksel Mekanik: bölüşüm fonksiyonu",
      "Fiziksel Kimya: gerçek gazlar",
      "Boltzmann denklemi ve H teoremi",
      "Taşınım: viskozite, difüzyon, ısı iletimi",
      "Hesaplamalı Fizik: moleküler dinamik ve Monte Carlo",
      "İki boyutta erime ve heksatik evre",
    ],
  },
  quiz: [
    {
      question: "Sayfada termostat açıkken sıcaklığı 300 K'den 1200 K'e çıkarıyorsun. Ortalama hız ⟨v⟩ ve basınç P kaç katına çıkar?",
      options: ["İkisi de 4 katına", "⟨v⟩ 2 katına, P 4 katına", "İkisi de 2 katına", "⟨v⟩ 4 katına, P 2 katına"],
      answer: 1,
      explanation: "Hızlar √T ile büyür: √4 = 2, sayfada 313'ten 626 m/s'ye. Basınç ise T ile orantılıdır, çünkü P = ½·n·m·⟨v²⟩ ve ⟨v²⟩ sıcaklıkla doğru orantılı büyür: 0.71'den yaklaşık 2.84 mN/m'ye. Hızı iki katına çıkan molekül duvara hem iki kat sert hem iki kat sık vurur; 2 × 2 = 4.",
    },
    {
      question: "Yalıtılmış tek atomlu bir gazı yavaşça (tersinir adyabatik) yarı hacme sıkıştırıyorsun. Sayfanın iki boyutlu gazı 300 K'den yaklaşık 600 K'e çıkıyor. Aynı deney üç boyutlu argonla yapılsa son sıcaklık yaklaşık kaç olur?",
      options: ["600 K", "476 K", "396 K", "1200 K"],
      answer: 1,
      explanation: "Adyabatta T·V^(2/D) sabittir, çünkü molekül başına iç enerji (D/2)kT'dir: işin getirdiği enerji ne kadar çok hareket yönüne paylaşılırsa sıcaklık o kadar az artar. Düz gazda T·A sabit, 300 × 2 = 600 K. Uzayda T·V^(2/3) sabit: 300 × 2^(2/3) ≈ 476 K. 396 K iki atomlu hava (γ = 7/5) için çıkar; 1200 K hiçbir gaz için doğru değildir.",
    },
    {
      question: "Herkese aynı hız düğmesine bastıktan hemen sonra, dağılım henüz Maxwell–Boltzmann biçiminde değilken gazın basıncı ne olur?",
      options: ["Sıfıra düşer, çünkü gaz dengede değil", "Artar, çünkü yavaş molekül kalmadı", "Değişmez, çünkü basınç yalnızca yoğunluğa ve ⟨v²⟩'ye bağlıdır", "Azalır, çünkü hızlı molekül kalmadı"],
      answer: 2,
      explanation: "Düğme her moleküle o anki rms hızı verir ve yönleri rastgele seçer: toplam kinetik enerji, dolayısıyla ⟨v²⟩ ve T değişmez. P = ½·n·m·⟨v²⟩ dağılımın biçimini sormaz; yönler eşit dağıldıkça hangi hız karışımı olursa olsun aynı basıncı verir. Sayfada basınç çizgisi sıçramaz, P 0.71 mN/m civarında kalır.",
    },
  ],
  next: [
    { href: "termodinamik.html", title: "Termodinamik", why: "Aynı gazın makroskobik yüzü: PV diyagramında izotermal ve adyabatik süreçler, eğrinin altındaki iş ve motor çevrimleri." },
    { href: "entropi-ve-istatistiksel-fizik.html", title: "Entropi ve İstatistiksel Fizik", why: "Herkese aynı hız düzeninin neden kendiliğinden çözüldüğünü mikrodurum sayarak gör: S = k ln Ω ve en olası enerji paylaşımı." },
    { href: "rastgele-yuruyus.html", title: "Rastgele Yürüyüş", why: "Bir molekülün zikzaklı yolu: adım sayısı büyüdükçe net uzaklığın neden yalnızca √N ile arttığını, kokunun neden yavaş yayıldığını izle." },
    { href: "normal-dagilim.html", title: "Normal Dağılım", why: "Maxwell dağılımının yapı taşı: her hız bileşeni standart sapması √(kT/m) olan bir çan eğrisidir; σ'yı büyütmek gazı ısıtmak gibidir." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 2, 2.4 Distribution of Molecular Speeds", url: "https://openstax.org/books/university-physics-volume-2/pages/2-4-distribution-of-molecular-speeds", note: "Üç boyutlu Maxwell–Boltzmann dağılımı, karakteristik hızlar ve azotla çözümlü örnek; bölümün önceki kısımları basınç, rms hız ve eşbölüşümü işler (İngilizce, açık ders kitabı)." },
    { title: "Feynman Lectures · Cilt I, Bölüm 39: The Kinetic Theory of Gases", url: "https://www.feynmanlectures.caltech.edu/I_39.html", note: "Pistonlu bir kutudan basıncı türetir; adyabatik sıkıştırmayı ve sıcaklığı moleküllerin diliyle anlatır (İngilizce)." },
    { title: "PhET · Gazların Özellikleri", url: "https://phet.colorado.edu/tr/simulations/gas-properties", note: "Basıncı atmosfer biriminde gösteren, hız histogramlı bir başka gaz simülasyonu; ölçümlerini bu sayfanın düz gazıyla karşılaştır." },
    { title: "HyperPhysics · Kinetic Temperature", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/Kinetic/kintem.html", note: "Kinetik sıcaklık, rms hız ve Maxwell hız dağılımı için kısa formüller ve bir hız hesaplayıcı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
