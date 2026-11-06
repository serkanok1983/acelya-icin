window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["ideal-gaz"] = {
  slug: "ideal-gaz",
  title: "İdeal Gaz: Çarpışma Kaosundan Basit Bir Yasa",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Basınç, birim duvar yüzeyine saniyede yağan momentumdur; sıcaklık, ortalama hareket enerjisinin ölçüsü. Düz bir sert disk gazında PV = nRT'nin iki boyutlu hâlini, Maxwell–Boltzmann dağılımını ve ideallikten sapmayı ölç.",
  hook:
    "Şu anda elinin üstündeki her santimetrekareye saniyede yaklaşık 3 × 10<sup>23</sup> hava molekülü çarpıyor ve bunların beşte dördünden fazlası sesten hızlı. Tek tek hiçbirini hissetmezsin; toplamları ise o tek santimetrekareye 10 newton, yani bir kilogramlık bir ağırlık kadar bastırır. Bu görünmez dolu nasıl olur da PV = nRT gibi pürüzsüz bir yasaya dönüşür?",
  bigIdea:
    "Basınç, moleküllerin birim zamanda duvarın birim yüzeyine bıraktığı momentumdur, sıcaklık ise molekül başına ortalama hareket enerjisini ölçer; ikisini yan yana koyunca molekül ağır ya da hafif, gaz üç ya da iki boyutlu olsun, aynı yasa çıkar: <em>P = n·k<sub>B</sub>·T</em>.",
  story: [
    "1662'de Robert Boyle, ucu kapalı J biçimli bir cam tüpün kısa kolunda biraz hava hapsetti ve uzun koldan cıva döktü. Cıva yükseldikçe hava sıkıştı; Boyle'un kendi gözlemiyle, yoğunluğu iki katına çıkan hava 'iki kat güçlü bir yay' kazanıyordu. Bugün P·V = sabit diye yazdığımız bu ilişkiyi Richard Towneley ile Henry Power da fark etmişti; bazı tarihçilere göre düzeneği Boyle'un yardımcısı Robert Hooke kurmuştu ve Fransa'da Edme Mariotte aynı yasayı 1670'lerde bağımsız olarak buldu. Ama neden böyleydi? Boyle havayı, bir tutam yünün lifleri gibi üst üste yığılmış, her biri küçük bir yay gibi esneyen duran parçacıklar olarak düşünüyordu. 1738'de Daniel Bernoulli <em>Hydrodynamica</em>'da bambaşka bir resim çizdi: gaz her yöne koşturan sayısız küçük parçacıktır, basınç onların pistona çarpmasıdır, ısınan gazın parçacıkları daha hızlıdır. Boyle yasası bu resimden kendiliğinden çıkıyordu; ama enerjinin korunumu henüz bilinmediği için fikir bir yüzyıldan uzun süre kenarda kaldı.",
    "Fikri yeniden bulanlar da şanssızdı. İskoç John James Waterston, kinetik kuramın temel sonuçlarını doğru türeten makalesini 1845'te Royal Society'ye gönderdi; hakem raporuna 'Makale saçmalıktan başka bir şey değil' yazıldı. Waterston kendine kopya ayırmamıştı; metin arşivde kaldı ve Lord Rayleigh onu ancak Waterston'un ölümünden sonra bulup 1892'de yayımlattı. Kuramı kalıcı kılanlar 1856'da August Krönig ve 1857'de Rudolf Clausius oldu. Clausius, buzun erime sıcaklığında azot molekülleri için saniyede 492 metre hesapladı. Hollandalı meteorolog Buys Ballot hemen itiraz etti: moleküller bu kadar hızlıysa, odanın bir ucunda açılan bir kokunun öbür uca varması neden dakikalar sürüyor? Clausius'un 1858'deki cevabı kurama yeni bir kavram ekledi: <strong>ortalama serbest yol</strong>. Moleküller hızlıdır ama bir sonrakine çarpmadan önce çok kısa bir yol alırlar; yolları zikzaktır ve koku bu zikzaklarla ancak yavaşça yayılır.",
    "1859'da 28 yaşındaki James Clerk Maxwell bu zikzaklı kalabalığa yeni bir soru sordu: hızlar moleküller arasında nasıl dağılır? Hız bileşenlerinin birbirinden bağımsız olduğunu ve hiçbir yönün ayrıcalıklı olmadığını varsayarak dağılımın biçimini buldu ve 1860'ta yayımladı; bu, fiziğin ilk istatistiksel yasası sayılır. Ludwig Boltzmann 1868'den başlayarak sonucu genelleştirdi ve 1872'de çarpışmaların her başlangıç dağılımını neden bu biçime sürüklediğini gösteren <strong>H teoremini</strong> yayımladı. Kanıtlar ise yavaş geldi. Moleküllerin gerçekliği 20. yüzyılın başına kadar tartışıldı; Albert Einstein'ın 1905'teki Brown hareketi kuramı ve Jean Perrin'in 1908'den itibaren yaptığı ölçümler tartışmayı kapattı. 1920'de Otto Stern döner bir düzenekle gümüş atomlarının hızını doğrudan ölçtü. 1955'te Columbia'da Robert Miller ile Polykarp Kusch, sarmal yarıklı dönen bir silindirle potasyum ve talyum atomlarını hızlarına göre süzdüler: en olası hızın 0.3 ile 2.5 katı arasında ölçtükleri dağılım, Maxwell'in eğrisinden beklenenle çok iyi örtüştü.",
    "Bilgisayar çağında sahneye bu sayfanın gazı çıktı. 1953'te Los Alamos'ta Nicholas Metropolis, Arianna ve Marshall Rosenbluth, Augusta ve Edward Teller, MANIAC bilgisayarında 224 sert diskin hal denklemini hesapladılar. Makale bugün <strong>Metropolis algoritması</strong> dediğimiz yöntemi tanıttı: molekülleri zamanda izlemek yerine rastgele küçük kaymalar dener, her kaymayı enerji değişimine bağlı bir olasılıkla kabul eder (sert disklerde kural basittir: diskler üst üste binmiyorsa kabul) ve böylece dengedeki dizilişleri doğru ağırlıklarla örnekler. Kutu kenarlarının etkisini silmek için de periyodik sınır koşulları kullandı. Algoritma Metropolis'in adını taşır; ama Marshall Rosenbluth 2003'te asıl işi kendisiyle Arianna'nın yaptığını, Metropolis'in bilgisayar zamanı sağladığını anlattı. 1957'de Livermore'da Berni Alder ile Thomas Wainwright aynı soruyu öteki yoldan çözdü: sert kürelerin Newton yasalarına uyan hareketini çarpışma çarpışma izlediler. İlk programlarını kurdukları UNIVAC'ın belleği 100 kadar küreye yetiyor, makine saatte yaklaşık 100 çarpışma hesaplayabiliyordu. Bu sayfa onların <strong>olay güdümlü moleküler dinamik</strong> yönteminin torunudur: tarayıcın varsayılan hızda saniyede yaklaşık 250 disk çarpışmasını tam zamanında işler, yani UNIVAC'ın bir saatlik işini yarım saniyeden kısa sürede bitirir; basıncı da Bernoulli'nin dediği gibi duvara aktarılan momentumdan ölçer.",
  ],
  core: [
    {
      heading: "Basınç: duvara yağan momentum",
      body:
        "Duvara x yönünde v<sub>x</sub> hızıyla çarpıp geri seken bir molekül, duvara 2m·v<sub>x</sub> momentum bırakır. Birim zamanda duvarın bir parçasına kaç molekülün çarptığı hem sayı yoğunluğuna n hem de v<sub>x</sub>'e bağlıdır: hızlı molekül hem daha sert hem daha sık vurur. Bu iki çarpanı duvara doğru giden yarı kalabalık üzerinden toplayınca P = n·m·⟨v<sub>x</sub>²⟩ çıkar. Hiçbir yön ayrıcalıklı olmadığından ⟨v<sub>x</sub>²⟩, ⟨v²⟩'nin boyut sayısına bölümüdür: üç boyutta üçte biri, sayfanın düz gazında yarısı. Bu türetme molekülleri nokta sayar; disklerin kendi alanının etkisini son kart anlatır. Sayfa basıncı tam bu tanımla ölçer: duvarların köşelerden uzak kısımlarına aktarılan momentumu toplar, duvar uzunluğuna ve süreye böler. İki boyutta basınç birim <em>alana</em> değil birim <em>uzunluğa</em> düşen kuvvettir; birimi N/m, sayfada mN/m. Tek tek vuruşlar rastgeledir; zaman grafiğindeki basınç çizgisinin yüzde birkaçlık titremesi bundandır, tablonun uzun ortalaması ise kararlıdır.",
      formula: "P = n·m·⟨v<sub>x</sub>²⟩ = (1/D)·n·m·⟨v²⟩",
      formulaNote: "D boyut sayısıdır. Üç boyutta P = ⅓·n·m·⟨v²⟩ ve n birim hacimdeki, iki boyutta P = ½·n·m·⟨v²⟩ ve n birim alandaki molekül sayısıdır.",
    },
    {
      heading: "Sıcaklık: her hareket yönüne eşit pay",
      body:
        "Kinetik formülü deneyin yasasıyla, P = n·k<sub>B</sub>·T ile yan yana koy: ikisinin tutması için molekül başına ortalama öteleme enerjisi her hareket yönü için ½k<sub>B</sub>T olmalıdır. Buna <strong>eşbölüşüm</strong> denir. Üç boyutlu tek atomlu gazda ⟨E<sub>k</sub>⟩ = (3/2)k<sub>B</sub>T, 300 K'de 6.2 zJ (1 zJ = 10⁻²¹ J); sayfanın düz gazında k<sub>B</sub>T = 4.1 zJ. Molekülleri mol olarak sayınca N·k<sub>B</sub> = n·R olur ve tanıdık PV = nRT çıkar (burada n mol sayısı, R = N<sub>A</sub>·k<sub>B</sub> = 8.314 J/(mol·K)). Formülde kütle yoktur: aynı T ve yoğunlukta helyum da ksenon da aynı basıncı yapar; değişen yalnızca hızlardır, 1/√m ile. Isı sığası da boyutu ele verir: molekül başına C<sub>V</sub> = (D/2)k<sub>B</sub> ve γ = C<sub>P</sub>/C<sub>V</sub> = (D + 2)/D; üç boyutta 5/3, düz gazda tam 2. Yalıtılmış gaz yavaşça sıkıştırılınca bu yüzden T·V<sup>2/D</sup> sabit kalır: düz gazda T·A, üç boyutta T·V<sup>2/3</sup>.",
      formula: "⟨½mv²⟩ = (D/2)·k<sub>B</sub>T   ⇒   P = n·k<sub>B</sub>T",
      formulaNote: "Her hareket yönü ortalama ½k<sub>B</sub>T taşır. Termostat kapalıyken Isıt düğmesi gaza 207 zJ verir ve 200 diski 300'den 375 K'e çıkarır; aynı enerji üç boyutlu bir gazın 200 atomunu yalnızca 50 K ısıtırdı.",
    },
    {
      heading: "Maxwell–Boltzmann: çarpışmaların ördüğü dağılım",
      body:
        "Maxwell'in 1860 fikri iki varsayıma dayanır: hız bileşenleri birbirinden bağımsızdır ve hiçbir yön ayrıcalıklı değildir. İkisini birden sağlayan tek dağılım, her bileşen için bir çan eğrisidir, e<sup>−mv<sub>x</sub>²/2k<sub>B</sub>T</sup>; genişliğini sıcaklık belirler. Bileşenlerin dağılımı her boyutta aynıdır; değişen, belirli bir v hızına giden yönlerin sayısıdır: düzlemde 2πv uzunluğunda bir çember, üç boyutta 4πv² alanında bir küre. Bu yüzden düz dağılım sıfırdan bir doğru gibi, üç boyutlusu bir parabol gibi kalkar ve düz gazın eğrisi göreli olarak daha geniştir: σ/⟨v⟩ düzlemde 0.523, üç boyutta 0.422. Argon 300 K'de sayfada v<sub>p</sub>, ⟨v⟩, v<sub>rms</sub> = 250, 313, 353 m/s; gerçek, üç boyutlu argonda 353, 399, 433 m/s. Dağılımı kuran çarpışmalardır: her çarpışma enerjiyi ve momentumu korur ama iki molekül arasında yeniden paylaştırır. Toplam enerji sabitken en çok mikrodurumla gerçekleşen paylaşım budur; Boltzmann'ın H teoremi, çarpışacak moleküllerin önceden ilişkisiz olduğu varsayımıyla, her başlangıcın oraya aktığını gösterir.",
      formula: "f<sub>2B</sub>(v) = (mv/k<sub>B</sub>T)·e<sup>−mv²/2k<sub>B</sub>T</sup><br>f<sub>3B</sub>(v) = 4π·(m/2πk<sub>B</sub>T)<sup>3/2</sup>·v²·e<sup>−mv²/2k<sub>B</sub>T</sup>",
      formulaNote: "v ve v² çarpanları o hızdaki yönlerin ölçüsüdür (çember çevresi 2πv, küre yüzeyi 4πv²). En olası hız düzlemde √(k<sub>B</sub>T/m), üç boyutta √(2k<sub>B</sub>T/m); sayfada histogramın üstündeki sürekli çizgi iki boyutlu formüldür.",
    },
    {
      heading: "Ortalama serbest yol: kalabalıkta zikzak",
      body:
        "İlerleyen bir molekül önündeki bir koridoru süpürür ve merkezi o koridora düşen her molekülle çarpışır. Üç boyutta bu koridor kesiti σ = πd² olan bir tüptür; düzlemde ise genişliği σ = 2d olan bir şerit. Birim yolda ortalama n·σ çarpışma olur, öyleyse iki çarpışma arası yol 1/(n·σ) kadardır. Öteki moleküller de hareket ettiği için göreli hız ortalama √2 kat büyüktür ve λ bu oranda kısalır; bu çarpan iki boyutta da aynıdır. Oda koşullarında havada λ ≈ 67 nm, molekül çapının yaklaşık 180 katıdır; sayfanın varsayılan gazında λ ≈ 6.1 nm ≈ 18d. λ ∝ 1/n olduğundan kutuyu yarıya indirince λ da yaklaşık yarıya iner. Yoğun gazda komşular çarpışmayı sıklaştırır; sayfa bunu Enskog'un temas çarpanı g ile hesaba katar (seyreltik gazda g ≈ 1). Buys Ballot'un kokusunun cevabı da buradadır: N serbest uçuştan sonra molekülün net uzaklığı N·λ değil, rastgele yürüyüşteki gibi √N·λ mertebesindedir.",
      formula: "λ = 1/(√2·n·σ)   ·   σ = πd² (üç boyut)   ·   σ = 2d (düzlem)",
      formulaNote: "Düz gazda λ = 1/(2√2·n·d); yoğun gazda payda ayrıca g ile çarpılır. Çarpışmalar arası ortalama süre τ = λ/⟨v⟩; sayfanın varsayılan ayarında yaklaşık 19.5 ps.",
    },
    {
      heading: "İdeallikten sapma: kapladığı yer ve çekim",
      body:
        "İdeal gaz yasası iki şeyi yok sayar: moleküllerin kendi boyutunu ve aralarındaki çekimi. Sapmanın ölçüsü <strong>sıkıştırılabilirlik çarpanıdır</strong>, Z = PV/(N·k<sub>B</sub>T); ideal gazda tam 1. Sert parçacıklarda bir merkez ötekinin çevresindeki d yarıçaplı <strong>dışlanmış bölgeye</strong> giremez; her çift bu bölgeyi paylaştığından seyreltik gazda Z ≈ 1 + B<sub>2</sub>·n olur ve B<sub>2</sub> o bölgenin yarısıdır: diskler için πd²/2 (disk alanının iki katı), küreler için 2πd³/3 (küre hacminin dört katı). Doluluk oranı η ile bu, Z ≈ 1 + 2η ve Z ≈ 1 + 4η demektir. Fazla basıncın nerede doğduğunu duvar söyler: sert bir duvarda P = n<sub>duvar</sub>·k<sub>B</sub>T her dolulukta tam geçerlidir; kalabalık gazda diskler duvarın dibine yığılır ve n<sub>duvar</sub> ortalama n'yi aşar. 1873'te Johannes van der Waals dışlanmış hacme çekimi de ekledi: (P + a·n²)(1 − b·n) = n·k<sub>B</sub>T. Çekim basıncı düşürür, dışlanmış hacim artırır; gaz ile sıvının sürekliliğini ve kritik noktayı açıklayan ilk denklem budur. Yüksek dolulukta bu düzeltmeler çöker; sayfa, η ≤ 0.5 aralığında simülasyonlarla yüzde birin altında uyuşan Henderson (1975) denklemini kullanır. Diskler birbirini çekmediği için Z hiç 1'in altına inmez ve gaz yoğuşmaz; çok sıkıştırılırsa ancak donar.",
      formula: "Z = P·A/(N·k<sub>B</sub>T) = (1 + η²/8)/(1 − η)²",
      formulaNote: "Sert diskler için Henderson denklemi; η = N·πd²/(4A). Seyreltikte Z ≈ 1 + 2η; η = 0.47'de Z ≈ 3.66. Üç boyuttaki karşılığı Carnahan–Starling denklemidir.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar, argon benzeri sert disklerin kesin bir moleküler dinamiğidir: adım boyu yoktur, her çarpışma tam anında çözülür. <strong>Deney ayarları</strong> panelinde <strong>Gaz</strong> menüsü (helyumdan ksenona yalnızca kütle değişir), <strong>Molekül sayısı N</strong>, <strong>Disk çapı d</strong>, <strong>Termostat sıcaklığı T</strong>, termostat kutusu, <strong>Isıt</strong> ve <strong>Soğut</strong> düğmeleri, <strong>Kutu genişliği W</strong> (pistonu sağdan sürükleyerek de değişir), <strong>Piston hızı</strong>, <strong>Simülasyon hızı</strong> ve <strong>Herkese aynı hız</strong> düğmesi var; kutunun yüksekliği hep 30 nm. Kutudaki mor iz bir molekülün yoludur (kutuya dokunarak başka birini seçebilirsin); her düz parçası, iki çarpışma ya da duvar vuruşu arasındaki bir serbest uçuştur. Tablo her büyüklüğü Ölçülen, Kuram ve Fark sütunlarıyla verir ve son ayar değişikliğinden beri biriktirir. Varsayılan 50 ps/s hızında P ve Z satırları 4 saniyede belirir, 30 saniyede belirsizlik yaklaşık ±%1'e iner; Simülasyon hızı'nı 200 ps/s yaparsan aynı sürede dört kat uzun bir ölçüm birikir. Her deneye varsayılan ayarlarla başla: Argon, N = 200, d = 0.34 nm, T = 300 K, termostat açık, W = 40 nm, piston 25 m/s, 50 ps/s. <strong>Sıfırla</strong> kaydırıcılara dokunmaz, molekülleri o anki ayarlarla yeniden dağıtır; varsayılanlara dönmek için sayfayı yenile. Gaz rastgele olduğu için aşağıdaki değerler aralık olarak verildi; senin denemen bu aralığa düşmeli.",
    experiments: [
      {
        title: "Boyle'u moleküllerle sına",
        predict: "Kutunun alanını yarıya indirirsen basınç tam iki katına mı çıkar, biraz fazlasına mı? Ortalama serbest yol ve çarpışmalar arası süre ne olur? Pistonun yaptığı iş nereye gider?",
        do: "Simülasyon hızı'nı 200 ps/s yap ve Sıfırla'ya bas. 30 saniye bekle; tablodan Basınç P, Z ve λ satırlarını not et. Sonra Kutu genişliği W'yi 20 nm'ye çek: piston 25 m/s'yle 800 ps'de, bu hızda 4 saniyede varır. Durduktan sonra 30 saniye daha bekleyip aynı satırları ve enerji kartlarını oku. Son olarak Disk çapı d'yi 0.10 nm yap (moleküller 20 nm'lik kutuya yeniden dağılır) ve ölçümü 20 ve 40 nm'de tekrarla.",
        observe: "40 nm'de P ≈ 0.71 mN/m (ideal sütunu 0.690), 20 nm'de ≈ 1.47 mN/m (ideal 1.381): oran 2.06 (tek denemede 2.05–2.08), Z de 1.03'ten 1.06'ya çıkar. λ 6.1'den 3.0 nm'ye, τ 19.5'ten 9.5 ps'ye iner. Enerji kartlarında Piston işi ≈ +615 zJ (600–635), Isı Q aynı büyüklükte eksi, ΔU = 0.0 zJ okunur. d = 0.10 nm'de oran 1.99–2.03 arasına iner; λ ise 40 nm'lik kutuda 21 nm'ye uzar, kutunun yüksekliğine yaklaşır.",
        explain: "Sıcaklık sabitken her vuruş ortalama aynı momentumu taşır; alan yarıya inince birim duvar uzunluğuna düşen vuruş sayısı iki katına çıkar. Fazladan %3 disklerin kendi alanından gelir: Z ≈ 1 + 2η ve η %1.5'ten %3'e çıktı. Yaptığın iş gazı ısıtmaz, termostat onu ısı olarak dışarı alır. Nokta parçacıklı ideal gaz için tersinir iş N·k<sub>B</sub>T·ln 2 = 574 zJ olurdu; disklerin alanı bunu 600 zJ'e, pistonun sonlu hızı yaklaşık 615 zJ'e çıkarır.",
      },
      {
        title: "Herkese aynı hız: düzen kaç çarpışmada çözülür?",
        predict: "Bütün moleküllere aynı hızı verirsen bu düzen sürer mi? Sürmezse Maxwell–Boltzmann biçimine dönmesi kaç çarpışma alır? Ortalama hız artarken basınç değişir mi?",
        do: "Varsayılan ayarlarda (Simülasyon hızı 50 ps/s) birkaç saniye bekle ve Herkese aynı hız'a bas. Gözünü hız histogramına ve sağ üstündeki 'dağılım genişliği σ/⟨v⟩' yazısına dik; tablonun ⟨v⟩ ve v<sub>rms</sub> satırlarını izle. 5 saniye sonra zaman grafiğindeki basınç çizgisine, 30 saniye sonra tablodaki P satırına bak.",
        observe: "Tık anında histogram tek çubuğa çöker: 200 molekülün neredeyse hepsi 353 m/s'yi (v<sub>rms</sub>) içeren çubuktadır ve σ/⟨v⟩ sıfıra yakındır. Yarım saniyede çubuk yarıdan fazla erir (σ/⟨v⟩ ≈ 0.3), 1 saniyede ≈ 0.41, 2 saniyede ≈ 0.48 olur; 5 saniyede Maxwell–Boltzmann çizgisine oturur ve bundan sonra 200 molekülün gürültüsüyle 0.47–0.58 arasında titrer (MB: 0.523). Tablonun ⟨v⟩ satırı ilk anda 350 m/s'ye yakındır, 5 saniyede 320'ye, 30 saniyede 314'e iner; v<sub>rms</sub> 353'te, T 300.0 K'de kalır. Basınç çizgisi sıçramaz ve P yine 0.71 mN/m civarındadır.",
        explain: "Varsayılan hızda ekranda geçen her saniye 50 ps'dir ve bu sürede her molekül ortalama 2.6 kez çarpışır (τ ≈ 19.5 ps). Her çarpışma iki molekülün enerjisini merkezler doğrultusunda yeniden paylaştırır. Toplam enerji sabitken en çok mikrodurumu olan paylaşım Maxwell–Boltzmann'dır; oraya varmak 4–5 çarpışma süresi alır. Basınç ise dağılımın biçimine değil yalnızca ⟨v²⟩'ye bağlıdır: düğme ⟨v²⟩'yi değiştirmez, yalnızca ⟨v⟩'yi bir süreliğine artırır.",
      },
      {
        title: "Kalabalık gaz: ideal yasa ne kadar yanılır?",
        predict: "Diskleri büyütüp kutunun yarısını doldurursan gaz ideal yasanın dediğinden daha az mı, daha çok mu bastırır? Ortalama serbest yol bir disk çapından kısa olabilir mi?",
        do: "Molekül sayısı N'yi 400'e, Disk çapı d'yi 1.20 nm'ye çıkar. Sonra Kutu genişliği W kaydırıcısını en sola çek: piston 30.5 nm'de durur ve kaydırıcının altında 'En dar kutu: 30.5 nm (doluluk η en çok 0.50)' yazar. Piston durduktan sonra 30 saniye bekle.",
        observe: "Doluluk η %49.4 (iç bölge yaklaşık %47). Basınç ≈ 6.3 mN/m, ideal sütunu ise 1.81: Fark yaklaşık +%248, yani Z ≈ 3.48. Henderson sütunu da 3.48 civarındadır; ölçümle farkı yüzde birin altında kalır. λ ≈ 0.25 nm, disk çapının beşte biri; τ ≈ 0.8 ps.",
        explain: "Bir diskin merkezi ötekinin çevresindeki d yarıçaplı bölgeye giremez; bu dışlanmış alan serbest yeri daraltır ve vuruşları sıklaştırır. Seyreltik gaz için yeterli olan Z ≈ 1 + 2η burada 2 civarında kalır; van der Waals'ın 1/(1 − 2η) biçimi ise η = 0.5'te sonsuza gider. Sayfa kuramı iç bölgenin yoğunluğuyla hesaplar: duvar dibinde diskler katman katman dizilir ve içerisi biraz seyrelir; kutunun ortalama doluluğuyla Henderson 4.0 derdi. Bu yoğunlukta 'serbest uçuş' bir sıvıdaki titreşime benzer: her disk komşularının kurduğu kafeste çırpınır.",
      },
      {
        title: "Isıtmadan ısıtmak: yalıtılmış gazı sıkıştır",
        predict: "Termostatı kapatıp alanı yarıya indirirsen gaz ısınır mı? Düz ideal gazda T·A sabit kalmalı; 300 K'den kaç kelvine çıkar? Pistonu çok hızlı sürmek sonucu değiştirir mi?",
        do: "Sıfırla'ya bas ve Termostat açık kutusunun işaretini kaldır; sıcaklık satırının kuramı 'tersinir adyabat' olur. W'yi 20 nm'ye çek, piston durunca T'yi ve enerji kartlarını oku, sonra W'yi 40 nm'ye geri al. Ardından Piston hızı'nı 200 m/s yap, W 40 nm'deyken Sıfırla'ya bas ve aynı gidiş-dönüşü tekrarla.",
        observe: "25 m/s'de T ≈ 623 K (tek denemede 610–635), kuram 619 K; Piston işi ile ΔU ≈ +890 zJ, Isı Q = 0.0 zJ. 40 nm'ye dönünce T ≈ 307 K (300–315): yavaş gidiş-dönüş neredeyse tersinirdir. 200 m/s'de gaz ortalama 760 K'e fırlar (tek denemede 670–850) ve dönüşte 300'e değil 380–475 K'e iner; gidiş-dönüşün net piston işi +220 ile +480 zJ arasında kalır.",
        explain: "Yaklaşan pistona çarpan molekül v' = 2u − v ile daha hızlı döner, uzaklaşan pistondan yavaşlayarak. Yavaş harekette kazanç ve kayıp tersinir adyabatı izler: seyreltik limitte T·A sabittir (γ = 2), disklerin alanı yüzünden kuram 600 değil 619 K der. Hızlı pistonun önünde moleküller yığılır, arkasında seyrekleşir: sıkıştırırken fazladan iş yaparsın, genleşirken gaz pistona daha az iş geri verir. Q = 0 olduğu hâlde gaz net ısınır; bu fark geri alınamaz, gazın entropisi artmıştır.",
      },
    ],
  },
  wow: [
    {
      title: "Gazı incelt, sürtünmesi azalmasın",
      body:
        "Maxwell 1860'ta kinetik kuramdan tuhaf bir sonuç çıkardı: gazın viskozitesi yoğunluğa bağlı olmamalı, sıvılarınkinin tersine sıcaklıkla artmalıydı. Gaz incelince momentum taşıyan molekül azalır ama her biri o oranda uzağa gider; ikisi birbirini götürür. Maxwell bunu 'çok şaşırtıcı' buldu; bildiği tek deney de doğrulamıyor gibiydi. 1860'ların ortasında Londra'daki evinde gazda salınan cam disklerin sönümünü ölçtü; yüksek sıcaklık ölçümleri için eşi Katherine saatlerce ateşi besledi. Viskozite geniş bir basınç aralığında sabit kaldı; sıcaklıkla da arttı, ama sert kürelerin dediği √T ile değil, T ile; Maxwell bu yüzden 1867'de modelini uzaklığın beşinci kuvvetiyle zayıflayan bir itmeye çevirdi.",
    },
    {
      title: "Su yüzünde iki boyutlu bir gaz",
      body:
        "Üniversiteye kadınlar alınmadığı için fizik okuyamayan Agnes Pockels, 1891'de Lord Rayleigh'e bir mektup yazdı: yaklaşık on yıldır evinde bir tepsi, kaydırılan bir şerit ve bir düğmeyle su yüzeyindeki yağ ve sabun tabakalarını ölçüyordu. Rayleigh mektubu Nature'a gönderdi. Düzeneği geliştiren Irving Langmuir 1932'de Nobel Kimya Ödülü'nü aldı. Suda çözünmeyen moleküllerin seyrek bir tek katmanı, yüzeyde kayan iki boyutlu bir gaz gibi davranır: molekül başına alan A ile yüzey basıncı Π·A = k<sub>B</sub>T yasasına uyar ve bu sayfadaki gibi mN/m ile ölçülür. Molekül başına 6 nm² düşerken 300 K'de Π = 0.69 mN/m bulunur: sayfanın varsayılan ideal basıncı budur, suyun yüzey geriliminin yüzde birinden az.",
    },
    {
      title: "Hiç çekim yok, yine de donar",
      body:
        "Sert diskleri sıkıştırmaya devam etsen ne olur? Aralarında hiçbir çekim olmadığı hâlde kristale dizilirler: o kalabalıkta düzenli dizilişte her diskin kıpırdayacak daha çok yeri kalır. Alder ve Wainwright bu geçişi 1962'de bilgisayarda gördü. Erimenin nasıl olduğu ise elli yıl tartışıldı: tek adımda mı, yoksa 1970'lerde öngörülen ara bir 'heksatik' evreden geçerek mi? 2011'de Etienne Bernard ile Werner Krauth yaklaşık bir milyon diskle cevabı buldu: erime iki adımlıdır, ama ilk adım kuramın beklediği gibi yumuşak değil, ani bir geçiştir. Akışkan η ≈ 0.70'te heksatik evreye, o da η ≈ 0.72'de katıya geçer. Sayfa doluluğu 0.50'de durdurur; en kalabalık kutu bile hâlâ bir akışkandır.",
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
      "Hızlar: m = 28.0 × 1.661 × 10⁻²⁷ kg = 4.65 × 10⁻²⁶ kg; ⟨v⟩ = √(8k<sub>B</sub>T/(πm)) ≈ 475 m/s ve v<sub>rms</sub> = √(3k<sub>B</sub>T/m) ≈ 515 m/s. v<sub>rms</sub> formülü 0 °C'de 493 m/s verir: Clausius'un 1857'de bulduğu 492 m/s budur.",
      "Çarpışma sıklığı ν = ⟨v⟩/λ = 475 m/s ÷ 6.7 × 10⁻⁸ m ≈ 7.1 × 10⁹ s⁻¹; çarpışmalar arası süre τ ≈ 0.14 ns = 140 ps. Bir saniyede molekül 475 m yol alır ama yedi milyar kez yön değiştirir; rastgele yürüyüşte net uzaklık yalnızca √N·λ ≈ 8.4 × 10⁴ × 67 nm ≈ 6 mm mertebesindedir. Uzaklık zamanın karekökü ile büyüdüğü için bu yürüyüşle 5 metrelik bir odayı geçmek günler sürerdi.",
    ],
    result:
      "Bir litrede 2.5 × 10²² molekül var; her biri ortalama 67 nm (180 çap) yolda bir, saniyede yedi milyar kez çarpışır. Sayfanın varsayılan düz gazında ise molekül yalnızca 18 çap (λ ≈ 6.1 nm) gidip çarpışır, havadakinin onda biri; ideal yasadan %3'lük sapma bu kalabalıktan gelir. Buys Ballot'un sorusunun son kısmı da çözülür: zikzaklar kokuyu gerçekten yavaşlatır, ama onu odada dakikalar içinde taşıyan havanın kendi akımlarıdır.",
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
        "Ağır molekül her vuruşta daha çok momentum bırakır ama o kadar yavaştır ki duvara daha seyrek ulaşır; iki etki tam olarak sadeleşir. Sayfada Gaz menüsünden Helyum'dan Ksenon'a geçince ⟨v⟩ 989'dan 173 m/s'ye düşer, basınç 0.71 mN/m'de kalır. Aynı sıcaklıkta basınç yalnızca birim hacimdeki (sayfada birim alandaki) molekül sayısına bağlıdır; Avogadro'nun 1811 varsayımının kinetik açıklaması budur.",
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
    { term: "Maxwell–Boltzmann dağılımı", definition: "Dengedeki bir gazda molekül hızlarının dağılımı; her hız bileşeni, standart sapması √(k<sub>B</sub>T/m) olan bir çan eğrisine uyar." },
    { term: "Ortalama serbest yol (λ)", definition: "Bir molekülün art arda iki çarpışması arasında aldığı ortalama yol; λ = 1/(√2·n·σ)." },
    { term: "Doluluk oranı (η)", definition: "Moleküllerin kendi kapladığı alanın (üç boyutta hacmin) toplam alana oranı; disklerde η = N·πd²/(4A)." },
    { term: "Sıkıştırılabilirlik çarpanı (Z)", definition: "Z = PV/(N·k<sub>B</sub>T); ideal gazda 1, itme baskınsa 1'den büyük, çekim baskınsa küçüktür." },
    { term: "Adyabatik süreç", definition: "Isı alışverişi olmadan geçen süreç; sayfada termostat kapalıyken pistonun gazı sıkıştırması ya da genleştirmesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede ideal gaz bir formüldür; üniversitede bir türetme zinciri. <strong>Fizik I–II</strong> dizisinin ısı ve kinetik kuram bölümü basıncı momentum akısından türetir, eşbölüşümü ve Maxwell–Boltzmann dağılımını kullanır. <strong>Termodinamik</strong> aynı gazı iş, ısı ve çevrimlerle makroskobik olarak inceler. <strong>İstatistiksel Mekanik</strong> ise bu defterdeki denge sonuçlarının hepsini tek bir kaynaktan çıkarır: Boltzmann çarpanı e<sup>−E/k<sub>B</sub>T</sup> ve bölüşüm fonksiyonu. Orada eşbölüşümün neden 'her karesel terime ½k<sub>B</sub>T' dediğini, hal denkleminin virial açılımını ve B<sub>2</sub>'nin moleküller arası potansiyelin bir integrali olduğunu görürsün. Boltzmann denklemi ve Chapman–Enskog kuramı viskoziteyi, ısı iletimini ve difüzyonu hesaplar; Maxwell'in 1860 paradoksu orada sıradan bir sonuçtur. <strong>Fiziksel Kimya</strong> gerçek gazları, Lennard-Jones potansiyelini, kritik noktayı ve tepkime hızlarının çarpışma kuramını işler.",
      "<strong>Hesaplamalı Fizik</strong> ve moleküler dinamik derslerinde bu sayfanın yaptığını kendin yazarsın: sert diskler için olay güdümlü dinamik, yumuşak potansiyeller için Verlet algoritması, dengeyi örneklemek için Metropolis Monte Carlo ve kenar etkilerini silmek için periyodik sınır koşulları. Orada boyutun ne kadar önemli olduğunu da görürsün. Alder ile Wainwright 1970'te bir molekülün hızının kendi geçmişiyle ilişkisinin üstel değil, düzlemde yaklaşık 1/t gibi yavaş söndüğünü buldu: molekülün çevresinde açtığı girdap onu itmeye devam eder. Üç boyutta bu kuyruk 1/t<sup>3/2</sup> ile söner ve difüzyon katsayısı sonludur; düzlemde ise toplamı ıraksar ve iki boyutlu akışkanın difüzyon katsayısı, ölçüm süresi uzadıkça çok yavaş da olsa büyümeyi sürdürür. Düz bir dünyada gaz yasası aynı kalır, taşınım yasaları değişir.",
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
      question: "Gaz menüsünden argon yerine ksenon seçiyorsun: kütle 39.95 u'dan 131.29 u'ya, yani 3.3 katına çıkıyor; T, N ve kutu aynı kalıyor. Ortalama serbest yol λ ve çarpışmalar arası süre τ ne olur?",
      options: ["λ da τ da yaklaşık 1.8 kat uzar", "λ kısalır, τ aynı kalır", "λ aynı kalır, τ yaklaşık 1.8 kat uzar", "λ aynı kalır, τ 3.3 kat uzar"],
      answer: 2,
      explanation: "λ = 1/(2√2·n·d·g) formülünde kütle yoktur: molekül ne hızla giderse gitsin, birim yolda aynı sayıda komşuya rastlar. τ = λ/⟨v⟩ ise hıza bağlıdır; ⟨v⟩ ∝ 1/√m olduğundan τ, √(131.29/39.95) ≈ 1.81 kat uzar. Sayfada ⟨v⟩ 313'ten 173 m/s'ye düşer, λ 6.1 nm civarında kalır, τ 19.5'ten yaklaşık 35 ps'ye çıkar.",
    },
    {
      question: "Yalıtılmış tek atomlu bir gazı yavaşça (tersinir adyabatik) yarı hacme sıkıştırıyorsun. Sayfanın iki boyutlu gazı yarı alanda 300 K'den yaklaşık 600 K'e çıkıyor. Aynı deney üç boyutlu argonla yapılsa son sıcaklık yaklaşık kaç olur?",
      options: ["600 K", "476 K", "396 K", "1200 K"],
      answer: 1,
      explanation: "Adyabatta T·V^(2/D) sabittir, çünkü molekül başına iç enerji (D/2)k<sub>B</sub>T'dir: işin getirdiği enerji ne kadar çok hareket yönüne paylaşılırsa sıcaklık o kadar az artar. Düz gazda T·A sabit, 300 × 2 = 600 K. Üç boyutta T·V^(2/3) sabit: 300 × 2^(2/3) ≈ 476 K. 396 K iki atomlu hava (γ = 7/5) için çıkar; 1200 K ise ancak tek boyutlu bir gazda (D = 1, γ = 3) olurdu.",
    },
    {
      question: "Herkese aynı hız düğmesine bastığın anda her molekül v<sub>rms</sub> = 353 m/s ile gitmeye başlar ve ortalama hız ⟨v⟩ 313'ten 353 m/s'ye, yani %13 artar. Dağılım henüz Maxwell–Boltzmann biçimine dönmemişken basınç ne olur?",
      options: ["Değişmez, çünkü basınç ⟨v⟩'ye değil ⟨v²⟩'ye bağlıdır ve ⟨v²⟩ değişmedi", "Yaklaşık %13 artar, çünkü ortalama hız %13 arttı", "Yaklaşık %27 artar, çünkü basınç hızın karesiyle büyür", "Azalır, çünkü hızlı molekül kalmadı"],
      answer: 0,
      explanation: "Düğme her moleküle o anki v<sub>rms</sub>'yi verir ve yönleri rastgele seçer: toplam kinetik enerji, dolayısıyla ⟨v²⟩ ve T değişmez. P = ½·n·m·⟨v²⟩ ortalama karesel hızı sorar, ortalama hızın karesini değil; ⟨v⟩'nin artması yalnızca hızların birbirine yaklaştığını söyler (Maxwell–Boltzmann'da ⟨v⟩² = (π/4)·⟨v²⟩, tek hızlı gazda ⟨v⟩² = ⟨v²⟩). Sayfada basınç çizgisi sıçramaz, P 0.71 mN/m civarında kalır.",
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
