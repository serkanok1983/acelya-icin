window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["sinir-hucresi-ve-aksiyon-potansiyeli"] = {
  slug: "sinir-hucresi-ve-aksiyon-potansiyeli",
  title: "Sinir Hücresi: Dinlenimden Ateşlemeye ve İletime",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir sinir hücresinin içi dışına göre yaklaşık 65 mV negatiftir; bir milisaniyelik akım bunu +40 mV'ye fırlatır ve uyarı aksonda saniyede metrelerle ilerler. Üçünün de arkasında birkaç iyon ve bir kondansatör vardır.",
  hook:
    "Bir nöronun dinlenim gerilimini kurmak için içerideki potasyumun ne kadarı dışarı çıkmalıdır? Yarısı mı, yüzde biri mi? Cevap yaklaşık yüz binde ikidir. Bu kadar az iyonla kurulan bir gerilim nasıl olur da bir saniyede yüzlerce kez çöküp yeniden kurulur ve bir aksonun boyunca hiç sönmeden ilerler?",
  bigIdea:
    "Sinir hücresinin zarı, iyonlara seçici kapıları olan bir <strong>kondansatördür</strong>: dinlenim gerilimi, hangi iyonun ne kadar geçtiğinin ağırlıklı ortalamasıdır; aksiyon potansiyeli ise bu ağırlıkların birkaç milisaniyeliğine K⁺'dan Na⁺'ya kayıp geri dönmesidir.",
  story: [
    "Canlı dokunun elektrikle ilgisi, Luigi Galvani'nin kurbağa bacaklarıyla yaptığı deneylerle tartışma konusu oldu: anlatılana göre 1780'de bir elektrik kıvılcımının ölü bir kurbağanın bacak kaslarını seğirttiğini gördü; 1791'de yayımladığı ana eseri Avrupa'da hararetli bir tartışma başlattı. Bir asır sonra, 1880'lerin sonunda Walther Nernst, Leipzig'de Wilhelm Ostwald'ın yanında çalışırken, iki çözelti arasındaki derişim farkının ne kadar gerilim doğuracağını veren denklemi derişim hücreleri için türetti. Julius Bernstein bu fikri sinire taşıdı: 1902 ve 1912'deki <strong>zar kuramına</strong> göre uyarılabilir hücreler dinlenimde K⁺'ya seçici geçirgen bir zarla çevriliydi; uyarılınca zar bir anlığına bütün iyonlara açılıyor ve gerilim sıfıra doğru çöküyordu.",
    "Kuramı sınamak için zarın içine girmek gerekiyordu. Kalamarın dev aksonu ilk kez 1909'da L. W. Williams tarafından tarif edilmiş, sonra unutulmuştu; 1930'larda J. Z. Young onun bir sinir lifi olduğunu gösterdi. Çapı tipik olarak yarım milimetre, kimi zaman 1,5 mm'ye varan bu lif, bir telin içine sokulabileceği kadar kalındı. Alan Hodgkin ve Andrew Huxley 1939 yazında Plymouth'taki deniz laboratuvarında aksonun içine ince bir elektrot sokup aksiyon potansiyelini ilk kez lifin içinden kaydettiler ve kısa notlarını savaş patlamadan hemen önce <em>Nature</em>'a gönderdiler. Kayıt Bernstein'ı yalanlıyordu: tepede gerilim sıfırda durmuyor, iç taraf belirgin biçimde pozitif oluyordu. Savaştan sonra Hodgkin ve Bernard Katz 1949'da bu aşmanın dış Na⁺'ya bağlı olduğunu, yani aksiyon potansiyeli sırasında zarın Na⁺ geçirgenliğinin yükseldiğini gösterdiler. Bu çalışmada David Goldman'ın 1943'te türettiği sabit alan denklemini kalamar aksonuna uyguladılar; dinlenim gerilimini birkaç iyonun geçirgenliğiyle hesaplayan denklem bu yüzden bugün Goldman–Hodgkin–Katz (GHK) adını taşır.",
    "Asıl kırılma bir ölçüm tekniğinden geldi. 1947'de Kenneth Cole ve George Marmont, bir geri besleme devresiyle kalamar aksonunun zar gerilimini deneycinin seçtiği değerde tutmayı başardılar: <strong>gerilim kenetlemesi</strong>. Gerilim sabit tutulunca zardan geçen akım, gerilimin kendini değiştirmesine karışmadan ölçülebiliyordu. Hodgkin ve Huxley bu yöntemle ve dış Na⁺ ile K⁺ derişimlerini değiştirerek akımı Na⁺ ve K⁺ bileşenlerine ayırdılar; 1952'de <em>The Journal of Physiology</em>'de beş makalelik bir dizi yayımladılar. Sonuncusu, akımı üç kapı değişkeniyle anlatan dört diferansiyel denklemdi ve bu denklemlerden aksiyon potansiyelinin biçimi ile iletim hızı hesaplanabiliyordu. Hodgkin ve Huxley, sinapslar üzerinde çalışan John Eccles ile birlikte 1963 Nobel Fizyoloji veya Tıp Ödülü'nü paylaştılar.",
    "Hodgkin ve Huxley kapıları, iyon kanallarını hiç görmeden, yalnızca akımların davranışından çıkarmıştı. Kanalların gerçekten tek tek açılıp kapanan moleküller olduğunu Erwin Neher ve Bert Sakmann'ın <strong>yama kenetlemesi</strong> gösterdi: 1976'da ince bir cam pipetin ucuna yapışan küçük bir zar parçasında tek bir kanal molekülünün akımını ilk kez kaydettiler; yöntem 1980'lerin başında bütün hücre biyolojisine yayıldı. İkisi 1991 Nobel Fizyoloji veya Tıp Ödülü'nü aldı. Sayfadaki model, 1952 denklemlerinin bugünkü işaret geleneğiyle yazılmış hâlidir; kapılar hâlâ sürekli birer olasılık olarak alınır, tek kanalların gürültüsü yoktur.",
  ],
  core: [
    {
      heading: "Nernst: bir iyonun durduğu gerilim",
      body:
        "Zar yalnız K⁺'yı geçirseydi ne olurdu? İçeride 140 mM, dışarıda 5 mM K⁺ varken iyonlar derişim farkıyla dışarı sızar. Her çıkan iyon pozitif yük götürür, içerisi negatifleşir ve bu gerilim yeni çıkışları frenler. Denge, bir iyonu içeri taşımanın elektriksel işi zFE ile derişim farkının kimyasal işi RT ln([K]ₒ/[K]ᵢ) eşitlendiğinde kurulur. 37 °C'de RT/F = 26,7 mV olduğundan on katlık derişim oranı 61,5 mV eder. Sayfanın varsayılan derişimleriyle E<sub>K</sub> = −89,1 mV, E<sub>Na</sub> = +65,7 mV, E<sub>Cl</sub> = −64,1 mV çıkar. Bu gerilimi kurmak için gereken yük şaşırtıcı biçimde küçüktür: zar 1 µF/cm²'lik bir kondansatördür ve 10 µm yarıçaplı bir hücrede içerideki K⁺'nın yalnız %0,0020'sinin dışarı çıkması yeter. Bu yüzden derişimler pratikte hiç değişmez ve hücre bütünüyle elektrikçe nötr kalır; yük, zarın iki yüzünde ince bir katmanda toplanır.",
      formula: "E<sub>X</sub> = (RT / zF) · ln([X]<sub>ₒ</sub> / [X]<sub>ᵢ</sub>)",
      formulaNote: "z iyonun yükü (K⁺ için +1, Cl⁻ için −1). 37 °C'de 2,303 RT/F = 61,5 mV: derişim oranındaki her on kat 61,5 mV demektir.",
    },
    {
      heading: "GHK: eğim neden 61,5 değil 18,6 mV?",
      body:
        "Gerçek zar K⁺'yı çok, Na⁺'yı ve Cl⁻'yi biraz geçirir. GHK denklemi, iyonların bağımsız geçtiğini ve zardaki alanın düzgün olduğunu varsayarak üç iyonun geçirgenlik ağırlıklı derişimlerini aynı logaritmaya koyar. Varsayılan değerlerle pay 5 + 0,05·140 + 0,45·10 = 16,5 mM, payda 140 + 0,05·12 + 0,45·110 = 190,1 mM olur ve V = 26,7 mV · ln(16,5/190,1) = −65,3 mV çıkar. Şimdi [K]ₒ'yu değiştir. Bölen (alttaki toplam) [K]ₒ'ya hiç bağlı değildir; üstteki 16,5 mM'nin ise yalnız 5'i K⁺ terimidir. ln(üst)'ün ln[K]ₒ'ya türevi tam olarak K⁺ teriminin üstteki toplamdaki kesridir: eğim 61,5 mV'nin 5/16,5'i, yani 18,6 mV/on kattır. Bu bir yaklaşım değil, o noktadaki kesin türevdir. [K]ₒ büyüdükçe K⁺ terimi üstteki toplamı ele geçirir ve eğim Nernst değerine yaklaşır: 50 mM'de toplam 61,5 mM olur ve eğim 61,5 × 50/61,5 ≈ 50,0 mV/on kat çıkar. Önemli bir varsayım: bu modelde Cl⁻ derişimleri sabit tutulur, yani eğim zarın ilk, hızlı tepkisidir. Varsayılanda E<sub>Cl</sub> (−64,1 mV) zaten V'ye (−65,3 mV) çok yakındır. Cl⁻ zamanla yeni gerilime göre yeniden dağılırsa net Cl⁻ akımı sıfırlanır, Cl⁻ terimi denklemden düşer ve eğim P<sub>Cl</sub> = 0 durumundaki 25,6 mV/on kata yaklaşır.",
      formula: "dV / dlog<sub>10</sub>[K]<sub>ₒ</sub> = 61,5 mV · P<sub>K</sub>[K]<sub>ₒ</sub> / (P<sub>K</sub>[K]<sub>ₒ</sub> + P<sub>Na</sub>[Na]<sub>ₒ</sub> + P<sub>Cl</sub>[Cl]<sub>ᵢ</sub>)",
      formulaNote: "37 °C'de, Cl⁻ derişimleri sabitken geçerli. Na⁺ ve Cl⁻ geçirgenlikleri sıfırlanırsa kesir 1 olur ve GHK, K⁺'nın Nernst denklemine iner.",
    },
    {
      heading: "Hodgkin–Huxley: üç kapı, dört denklem",
      body:
        "Zar bir kondansatör, her iyon kanalı ailesi kendi denge gerilimine bağlı bir değişken dirençtir. Toplam akım sığayı yükler: C dV/dt = I − I<sub>Na</sub> − I<sub>K</sub> − I<sub>L</sub>. Hodgkin ve Huxley iletkenlikleri üç kapı değişkeniyle yazdı: Na⁺ için hızlı açılan m ve yavaş kapanan h (g<sub>Na</sub>m³h), K⁺ için gecikmeyle açılan n (g<sub>K</sub>n⁴). Her kapı birinci mertebe bir denklemle kendi gerilime bağlı denge değerine doğru gider; hız sabitleri α ve β, gerilimin üstel fonksiyonlarıdır ve her 10 °C'de 3 kat artar. Döngü şöyle işler: biraz depolarizasyon m'yi açar, Na⁺ içeri girer, zar daha çok depolarize olur. Bu <strong>pozitif geri besleme</strong> gerilimi E<sub>Na</sub>'ya doğru fırlatır. Birkaç milisaniye içinde h kapanır, n açılır ve K⁺ dışarı akarak zarı geri getirir, hatta E<sub>K</sub>'ya doğru bir an aşırı çeker. Tepe E<sub>Na</sub>'ya ulaşmaz (varsayılanda 39,04 mV, E<sub>Na</sub> = 50 mV), çünkü o sırada K⁺ ve sızıntı kanalları da açıktır. Dikkat: buradaki E<sub>Na</sub> = 50 ve E<sub>K</sub> = −77 mV kalamar modelinin öğretim değerleridir; 1. sekmedeki memeli derişimleri Nernst ile 65,7 ve −89,1 mV verir. İki sekme iki ayrı, etiketli parametre takımı kullanır.",
      formula: "C dV/dt = I − g<sub>Na</sub>m³h(V − E<sub>Na</sub>) − g<sub>K</sub>n⁴(V − E<sub>K</sub>) − g<sub>L</sub>(V − E<sub>L</sub>)",
      formulaNote: "C = 1 µF/cm², g<sub>Na</sub> = 120, g<sub>K</sub> = 36, g<sub>L</sub> = 0,3 mS/cm². Kapılar için dx/dt = α<sub>x</sub>(1 − x) − β<sub>x</sub>x, x = m, h, n.",
    },
    {
      heading: "Eşik bir sayı değil, bir yarış",
      body:
        "Eşik, içeri Na⁺ akımının dışarı K⁺ ve sızıntı akımlarını geçtiği noktadır; o yüzden uyarının biçimine bağlıdır. Kısa bir uyarıda zarın yüklenmesi zaman aldığından daha büyük akım gerekir: çok kısa uyarılarda eşikteki yük (akım × süre) neredeyse sabittir, çok uzun uyarılarda akım bir tabana, <strong>reobaza</strong> iner. Reobazın iki katı akımın yettiği süreye <strong>kronaksi</strong> denir. Louis Lapicque 1907'de zarı bir RC devresi gibi ele almış, iki terimi 1909'da ortaya atmıştı; Weiss'ın doğrusal yük yasası 1901 tarihlidir. Bir tepeden hemen sonra h küçük, n büyük kalır: Na⁺ kanalları etkisiz, K⁺ kanalları açıktır. Bu sırada hiçbir uyarı ikinci tepe üretemez (<strong>mutlak refrakter dönem</strong>), ardından yalnız daha güçlü bir uyarı üretebilir (<strong>göreli refrakter dönem</strong>). HH modelinde sabit akımla ateşleme sıfır frekanstan başlamaz (II. tip uyarılabilirlik). Akım artarken önce büyük bir ateşleme döngüsü onlarca hertzlik bir frekansla birden belirir; dinlenim noktası ise ancak daha büyük bir akımda, alt kritik bir <strong>Hopf çatallanmasıyla</strong> kararlılığını yitirir. Aradaki bantta iki durum birlikte kararlıdır.",
      formula: "Lapicque: I = I<sub>rh</sub> / (1 − e<sup>−D/τ</sup>)   ·   Weiss: I = I<sub>rh</sub>(1 + c/D)",
      formulaNote: "D uyarı süresi, I<sub>rh</sub> reobaz. Lapicque'te kronaksi τ ln 2, Weiss'ta c'dir. HH zarı ikisine de tam uymaz.",
    },
    {
      heading: "Kablo: hız neden √d ile, miyelinde d ile büyür?",
      body:
        "Akson, iç direnci r<sub>i</sub> = 4R<sub>i</sub>/(πd²) olan bir tel ve zar direnci r<sub>m</sub> = R<sub>m</sub>/(πd) olan sızdıran bir yalıtkandır. Sabit bir gerilim boyunca e<sup>−x/λ</sup> ile söner; uzunluk sabiti λ = √(r<sub>m</sub>/r<sub>i</sub>) = √(R<sub>m</sub>d/4R<sub>i</sub>)'dir. Uyarı ilerlerken her bölge, önündeki zarı eşiğe kadar yükler. Zarın zaman ölçeği τ = R<sub>m</sub>C çaptan bağımsızdır, uzaklık ölçeği ise λ ∝ √d olduğundan hız v ∼ λ/τ ∝ √d olur: hızı iki katına çıkarmak dört kat kalın bir akson ister. Omurgalılar başka yolu seçti. Miyelin, aksonun çevresine defalarca sarılmış zar katmanlarıdır; sığayı ve sızıntıyı kabaca katman sayısıyla orantılı olarak azaltır. Uyarı yalnız <strong>Ranvier düğümlerinde</strong> yeniden üretilir ve düğümden düğüme <strong>sıçrar</strong>. Sayfanın öğretim modelinde düğümler arası uzaklık 100 d, katman sayısı 20·d(µm)'dir; her şey d ile orantılı ölçeklendiğinden hız da d ile doğrusal büyür. Bu bir model ölçeklemesidir, gerçek bir sinirin hız ölçümü değildir.",
      formula: "λ = √(R<sub>m</sub> d / 4R<sub>i</sub>)    ·    v<sub>miyelinsiz</sub> ∝ √d,  v<sub>miyelinli</sub> ∝ d",
      formulaNote: "R<sub>m</sub> zar özdirenci (Ω·cm²), R<sub>i</sub> sitoplazma özdirenci (Ω·cm). 500 µm, 3333 Ω·cm², 35,4 Ω·cm için λ = 10,85 mm.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvardır ve her kartta ölçülen değer kuramın yanında durur. <strong>01 · Nernst ve GHK</strong> sekmesinde altı derişim kaydırıcısı, sıcaklık ve iki geçirgenlik oranı dinlenim gerilimini, ölçülen eğimi ve [K⁺]ₒ tablosunu belirler; altta bir elektrodifüzyon oyuncağı iyonları tek tek zardan geçirir. <strong>02 · Hodgkin–Huxley</strong> sekmesi uyarı genliği, süresi, sıcaklığı ve TTX/TEA kutularıyla tek bir zar yamasını ateşler. <strong>03 · Eşik ve refrakter dönem</strong> iki uyarı, kuvvet–süre ve sabit akım (f–I) deneylerini 6,3 °C'de yapar; eğriler sekme ilk açıldığında birkaç saniyede hesaplanır. <strong>04 · İletim</strong> sekmesinde Model menüsü edilgen kablo, miyelinsiz HH aksonu ve miyelinli model arasında seçim yapar. R tuşu etkin sekmeyi varsayılana döndürür. Not: 1. sekme memeli derişimleriyle, 2–4. sekmeler kalamar aksonu modeliyle çalışır; ikisi ayrı modellerdir.",
    experiments: [
      {
        title: "On kat potasyum, üçte bir eğim",
        predict: "Dış K⁺'yı 5 mM'den 50 mM'ye çıkarırsan dinlenim gerilimi kaç mV değişir? Nernst denklemi 61,5 mV diyor; zar Na⁺ ve Cl⁻'yi de biraz geçiriyorsa daha az mı, daha çok mu beklersin?",
        do: "01 · Nernst ve GHK sekmesinde varsayılandan <strong>[K⁺]ₒ × 10</strong> düğmesine bas ve V (GHK) kartını oku. Varsayılana dönüp <strong>Yalnız K⁺ geçsin</strong> düğmesine bas; sonra yine varsayılandan yalnız P<sub>Cl</sub>/P<sub>K</sub> kaydırıcısını 0'a çek.",
        observe: "V −65,3 mV'den −30,2 mV'ye çıkar: 35,1 mV, beklenen 61,5'in çok altında. Varsayılan noktadaki ölçülen eğim 18,6 mV / on kattır (fark −69,7 %). Yalnız K⁺ geçince V = E<sub>K</sub> = −89,1 mV ve eğim tam 61,5 mV / on kat olur. Cl⁻ kapatılınca eğim 25,6'ya çıkar. Tablodaki V − E<sub>K</sub> sütunu 0,5 mM'de +76,8 mV iken 200 mM'de −6,7 mV'ye iner.",
        explain: "Eğim, payda K⁺ teriminin payıyla çarpılmış Nernst eğimidir: 61,5 × 5/16,5 = 18,6. Cl⁻'siz pay 12 mM olur ve 61,5 × 5/12 = 25,6 çıkar. [K]ₒ büyüdükçe K⁺ terimi baskınlaşır ve zar bir K⁺ elektrotuna benzer.",
      },
      {
        title: "Hepsi ya da hiç: eşiğin iki yanı",
        predict: "Eşiğin binde birkaç altında ve üstünde iki uyarı ver. Tepe yükseklikleri uyarıyla orantılı mı değişir, yoksa biri hiç tepe vermez mi?",
        do: "02 · Hodgkin–Huxley sekmesinde (1 ms uyarı, 6,3 °C) önce <strong>Eşiğin hemen altı</strong>, sonra <strong>Eşiğin hemen üstü</strong> düğmesine bas; Ölçülen tepe ve Tepe anı kartlarını karşılaştır. Ardından varsayılan 10 µA/cm²'de <strong>TTX</strong> kutusunu işaretle.",
        observe: "Ölçülen eşik 6,903 µA/cm². 6,9 µA/cm²'de 'tepe yok', en yüksek gerilim −55,54 mV. 7,0'da tam bir tepe gelir (35,04 mV), ama 7,16 ms'de; varsayılan 10 µA/cm²'de tepe 39,04 mV, 4,510 ms'dedir. TTX altında en yüksek −59,2 mV kalır, eşik '1000 µA/cm²'de bile yok' olur.",
        explain: "Eşikte Na⁺ akımının pozitif geri beslemesi kaçak akımları yener ve tepe kendi dinamiğiyle oluşur; genlik uyarıya değil zara bağlıdır. Eşiğe çok yakın bir uyarıda Na⁺ akımı K⁺ ve sızıntı akımlarını ancak az farkla geçer; yükseliş yavaş başlar ve tepe gecikir. TTX'le Na⁺ kanalları kapanınca geri besleme yoktur.",
      },
      {
        title: "Refrakter dönem ve kısa bir aşırı duyarlılık",
        predict: "İlk uyarının başlangıcından 5 ms ve 20 ms sonra başlayan ikinci uyarı için eşik, tek bir uyarının eşiğinden (13,24 µA/cm²) büyük mü, küçük mü olur?",
        do: "03 · Eşik ve refrakter dönem sekmesinde Uyarılar arası süre Δ'yı 5 ms yap ve İkinci uyarı eşiği kartını oku. Sonra Δ = 20 ms seç; İkinci uyarının genliğini önce 11,2, sonra 11,3 µA/cm² yapıp İkinci tepe kartına bak.",
        observe: "Δ = 5 ms'de ikinci eşik '8 × eşikte bile yok' (mutlak refrakter dönem 7,28 ms). Δ = 10 ms'de eşik 46,37 µA/cm², tek eşiğin 3,502 katı. Δ = 20 ms'de ikinci eşik 11,27 µA/cm²'dir: 11,3 ikinci tepeyi verir, 11,2 vermez. İkisi de tek uyarı eşiğinin altındadır. En düşük eşik kartı 0,851 × tek eşik gösterir.",
        explain: "Tepeden hemen sonra h kapalı, n açıktır; Na⁺ kanalları toparlanana kadar tepe imkânsızdır. İkinci uyarı 20 ms'de geldiğinde h dinlenim değerinin biraz üstüne çıkmış, n biraz altına inmiştir ve zar yarım milivolt kadar depolarizedir: zar dinlenimdekinden kolay uyarılır. Mutlak dönemin 7,28 ms değeri 8 × eşik tanımına bağlıdır.",
      },
      {
        title: "Kalınlık mı, miyelin mi?",
        predict: "Miyelinsiz bir aksonun çapını dörtte bire indirirsen hızı ne olur? Aynı 10 µm çapta miyelinli bir akson kaç kat hızlı olabilir?",
        do: "04 · İletim sekmesinde Miyelinsiz HH aksonu ile Akson çapı d'yi 500'den 125 µm'ye indir ve Ölçülen kartını oku. Çapı yeniden 500 µm yap ve Sıcaklığı 18,5 °C'ye çıkar. Sonra <strong>Varsayılana dön</strong>'e bas (sıcaklık 6,3 °C'ye döner; miyelinli model de bu sıcaklığı kullanır), Model menüsünden miyelinli modeli seç ve <strong>Çap taraması</strong>'na bas. Son olarak Model menüsünden edilgen kabloyu seç.",
        observe: "500 µm'de 12,56 m/s, 125 µm'de 6,28 m/s: tam yarı. 500 µm ve 18,5 °C'de 19,02 m/s. Miyelinli model 10 µm'de 23,15 m/s; tarama 10 µm'de 13,0 kat (23,1 / 1,78 m/s) ve üsler 0,500 ile 0,998 verir. Edilgen kabloda 500 µm'nin λ'sı 10,85 mm'dir.",
        explain: "Dörtte bir çapta λ yarıya iner, zarın zaman ölçeği aynı kalır; hız √(1/4) = 1/2 katına düşer. Miyelinde düğümler arası uzaklık d ile büyür, hız da d ile. Sıcaklık kapıları hızlandırır. Kaynaklar 0,5 mm'lik tipik bir kalamar aksonu için yaklaşık 25 m/s verir; modelin 18,5 °C'deki 19 m/s'si bu büyüklükte, ama sıcaklık ve çap aynı olmadığı için birebir karşılaştırma yapılamaz.",
      },
    ],
  },
  wow: [
    {
      title: "Yüz binde iki iyon yeter",
      body:
        "Varsayılan derişimlerle E<sub>K</sub> = −89,1 mV'yi kurmak için 10 µm yarıçaplı bir hücrede içerideki K⁺'nın yalnız %0,0020'sinin dışarı çıkması gerekir. Zar 1 µF/cm²'lik bir kondansatördür; yük Q = CV kadar ince bir katmanda toplanır. Hücre bu yüzden bir aksiyon potansiyelinden sonra derişimlerini hissedilir biçimde değiştirmez; pompalar uzun vadede yalnız sızıntıyı geri öder.",
    },
    {
      title: "Hodgkin–Huxley aksonu yavaş ateşleyemez",
      body:
        "Sabit akımı yavaş yavaş artırınca HH zarı 1 Hz, 5 Hz diye başlamaz. Sayfanın 400 ms'lik protokolünde, akım dinlenimden birden açılınca, sürekli ateşleme 6,228 µA/cm²'de doğrudan 48,8 Hz'le başlar. Dinlenim noktası ise ancak 9,749 µA/cm²'de bir Hopf çatallanmasıyla kararlılığını yitirir; orada doğrusallaştırılmış sistemin salınım frekansı (Im λ/2π) 93,3 Hz'dir. Arada dinlenim ile sürekli ateşleme birlikte kararlıdır: 8 µA/cm²'de akım birden açılırsa hücre ateşler, oysa aynı akımın denge noktasına yavaşça getirilen bir zar sessiz kalır.",
    },
    {
      title: "Demir telden kurbağa sinirine",
      body:
        "Uyarının miyelinli lifte düğümden düğüme sıçradığı fikrini Ralph Lillie 1925'te bir demir tel modeliyle ortaya attı. Ichiji Tasaki 1939'da Japon kara kurbağasının tek sinir lifleriyle, Andrew Huxley ve Robert Stämpfli 1949'da kurbağa sinirleriyle doğruladı. Huxley, üç yıl sonra kalamar aksonunun denklemlerini yazacak olan adamdı.",
    },
  ],
  worked: {
    title: "Dinlenim gerilimi, eğim ve gereken yük",
    prompt:
      "37 °C'de [K⁺] 140/5, [Na⁺] 12/140, [Cl⁻] 10/110 mM (iç/dış), P<sub>Na</sub>/P<sub>K</sub> = 0,05 ve P<sub>Cl</sub>/P<sub>K</sub> = 0,45 olan bir zarın GHK dinlenim gerilimini ve dV/dlog₁₀[K]ₒ eğimini bul. Sonra yarıçapı 10 µm olan küresel bir hücrede E<sub>K</sub>'yı kurmak için içerideki K⁺'nın hangi kesrinin dışarı çıkması gerektiğini hesapla (C = 1 µF/cm²).",
    steps: [
      "Isıl gerilim: RT/F = (8,314 J/(mol·K) × 310,15 K) / (96 485 C/mol) = 26,73 mV. On kat başına 2,303 × 26,73 = 61,5 mV.",
      "GHK payı (dış katyonlar, iç anyon): 5 + 0,05·140 + 0,45·10 = 16,5 mM. Paydası: 140 + 0,05·12 + 0,45·110 = 190,1 mM. V = 26,73 mV · ln(16,5/190,1) = 26,73 · (−2,444) = −65,3 mV. Sayfa da V (GHK) kartında −65,3 mV gösterir.",
      "Eğim: payda [K]ₒ'ya bağlı değildir, dolayısıyla dV/dln[K]ₒ = (RT/F)·[K]ₒ/pay. On kat başına 61,5 mV × 5/16,5 = 18,6 mV. Sayfanın merkezi farkla ölçtüğü eğim de 18,6 mV / on kattır.",
      "E<sub>K</sub> = 26,73 mV · ln(5/140) = −89,1 mV. Zardaki yük: q = C|E<sub>K</sub>| = 1 µF/cm² × 0,0891 V = 8,91 × 10⁻⁸ C/cm². Mol olarak q/F = 9,23 × 10⁻¹³ mol/cm².",
      "Kürede hacim/alan = r/3 = 3,33 × 10⁻⁴ cm. Birim alan başına içerideki K⁺: 140 × 10⁻⁶ mol/cm³ × 3,33 × 10⁻⁴ cm = 4,67 × 10⁻⁸ mol/cm². Kesir: 9,23 × 10⁻¹³ / 4,67 × 10⁻⁸ = 1,98 × 10⁻⁵, yani %0,0020; sayfanın son oyuncak kartındaki değer.",
    ],
    result:
      "V = −65,3 mV, eğim 18,6 mV / on kat (Nernst eğiminin yaklaşık %30'u), gereken K⁺ kesri yaklaşık yüz binde iki. Kesir 3C|V|/(rF[K]ᵢ) ile verildiğinden hücre on kat büyürse on kat küçülür.",
  },
  misconceptions: [
    {
      myth: "Dinlenim gerilimi, hücrenin içinde çok sayıda fazla negatif iyon biriktiği için oluşur.",
      truth:
        "Hücrenin içi bütünüyle neredeyse tam nötrdür. Gerilim, zarın iki yüzünde ince bir yük katmanından gelir ve bunu kurmak için içerideki K⁺'nın yalnız yüz binde birkaçının yer değiştirmesi yeter. Belirleyici olan iyon sayısı değil, zarın hangi iyonu ne kadar geçirdiğidir; 1. sekmedeki geçirgenlik kaydırıcıları gerilimi derişimlere hiç dokunmadan değiştirir.",
    },
    {
      myth: "Aksiyon potansiyelinin tepesi Na⁺'nın denge gerilimine ulaşır.",
      truth:
        "Yaklaşır ama ulaşmaz. Tepe anında K⁺ ve sızıntı kanalları da açıktır ve h kapısı kapanmaya başlamıştır; gerilim bütün iletkenliklerin ağırlıklı ortalamasında durur. Sayfanın HH modelinde tepe 39,04 mV, E<sub>Na</sub> = 50 mV'dir: 10,96 mV aşağıda.",
    },
    {
      myth: "Daha güçlü bir uyarı daha büyük bir aksiyon potansiyeli üretir.",
      truth:
        "Eşiğin altında zar uyarıyla orantılı biraz yükselir; eşiğin üstünde tepe zarın kendi dinamiğiyle oluşur. 2. sekmedeki Hepsi ya da hiç grafiğinde en yüksek gerilim eşiğin hemen altında −59 mV civarındayken eşiği geçince birden tam tepeye sıçrar. Ölçülen tepe kartında 7,0 µA/cm²'de 35,04 mV, 100 µA/cm²'de 44,99 mV okunur: uyarı on dört kat büyüdüğü hâlde tepe yalnız 10 mV kadar yükselir. Sinir sistemi uyarının şiddetini tepe yüksekliğiyle değil, ateşleme sıklığıyla ve kaç lifin ateşlediğiyle taşır.",
    },
    {
      myth: "Miyelinli aksonda uyarı yalıtılmış bir tel gibi akar; düğümler yalnızca birer boşluktur.",
      truth:
        "Miyelin boyunca akım edilgen olarak yayılır ve söner; sinyal her Ranvier düğümünde Na⁺ kanallarıyla yeniden üretilir. Düğümleri olmayan miyelinli bir lif uzak mesafeye uyarı taşıyamazdı. Hızı artıran, sığanın azalması ve yeniden üretimin yalnız düğümlerde yapılmasıdır.",
    },
  ],
  glossary: [
    { term: "Denge (Nernst) gerilimi", definition: "Bir iyonun zardan net akışının sıfır olduğu gerilim; elektriksel itiş ile derişim farkının itişi o gerilimde eşitlenir." },
    { term: "Geçirgenlik oranı", definition: "Bir iyonun zardan geçme kolaylığının K⁺'nınkine oranı (P<sub>Na</sub>/P<sub>K</sub> gibi); GHK denkleminde derişimlerin ağırlığıdır." },
    { term: "Gerilim kenetlemesi", definition: "Zar gerilimini bir geri besleme devresiyle sabit tutup zardan geçen akımı ölçme yöntemi; Cole ve Marmont 1947'de kalamar aksonunda kurdu." },
    { term: "Kapı değişkeni", definition: "HH modelinde bir kanal ailesinin açık olma olasılığını anlatan, 0 ile 1 arasında değişen sayı (m, h, n)." },
    { term: "Eşik", definition: "İçeri Na⁺ akımının dışarı akımları yenip kendini besleyen bir tepe başlattığı uyarı düzeyi; uyarının süresine ve zarın geçmişine bağlıdır." },
    { term: "Refrakter dönem", definition: "Bir tepeden sonra hiçbir uyarının (mutlak) ya da yalnız daha güçlü bir uyarının (göreli) yeni tepe üretebildiği süre." },
    { term: "Reobaz ve kronaksi", definition: "Reobaz, çok uzun bir uyarının eşik akımıdır; kronaksi, reobazın iki katı akımın uyarmaya yettiği en kısa süredir." },
    { term: "Uzunluk sabiti λ", definition: "Akson boyunca sabit bir gerilimin e katına (yaklaşık %37'ye) düştüğü uzaklık; λ = √(R<sub>m</sub>d/4R<sub>i</sub>)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede aksiyon potansiyeli bir çizimdir: yükselen, düşen, biraz aşağı inen bir eğri. Üniversitede (<strong>Hücre Biyolojisi</strong>, <strong>Fizyoloji</strong> ve <strong>Biyofizik</strong> derslerinde) bu eğrinin bir devre denkleminden çıktığını görürsün. Nernst ve GHK denklemleri <strong>Fizikokimya</strong>'daki elektrokimyasal potansiyelin, yani iyonun kimyasal potansiyeli ile zFV toplamının, dengede iki yanda eşit olmasıdır; GHK, Nernst–Planck akı denkleminin düzgün alan varsayımıyla tümlenmesinden gelir. Kablo denklemi ise sızıntı terimi eklenmiş bir ısı denklemidir; <strong>Kısmi Diferansiyel Denklemler</strong> dersinde aynı matematiği ısı iletiminde, telgraf hatlarında ve difüzyonda yeniden bulursun.",
      "Hodgkin–Huxley denklemleri, <strong>Diferansiyel Denklemler ve Dinamik Sistemler</strong> dersinin canlı bir örneğidir: dört boyutlu, doğrusal olmayan bir sistem; dinlenim kararlı bir denge noktası, sürekli ateşleme bir limit çevrim, ateşlemenin başlaması bir Hopf çatallanması. <strong>Hesaplamalı Sinirbilim</strong> bu sistemi FitzHugh–Nagumo gibi iki boyutlu modellere indirger, faz düzleminde eşiği ve refrakterliği geometriyle anlatır; sonra binlerce nöronu ağlara bağlar. Yama kenetlemesiyle görülen tek kanalların rastgele açılıp kapanması ise modeli <strong>Olasılık</strong> ve Markov zincirlerine taşır.",
    ],
    topics: ["Elektrokimyasal potansiyel", "Nernst–Planck denklemi", "Kablo denklemi", "Doğrusal olmayan dinamik ve Hopf çatallanması", "FitzHugh–Nagumo modeli", "Yama kenetlemesi ve tek kanal akımları", "Hesaplamalı sinirbilim"],
  },
  quiz: [
    {
      question: "Varsayılan derişimlerle GHK payı 16,5 mM'dir ve bunun 5 mM'si K⁺ terimidir. P<sub>Cl</sub>/P<sub>K</sub> sıfırlanırsa (pay 12 mM olur) dV/dlog₁₀[K]ₒ eğimi yaklaşık kaç olur?",
      options: ["18,6 mV / on kat", "25,6 mV / on kat", "61,5 mV / on kat", "89,1 mV / on kat"],
      answer: 1,
      explanation: "Eğim, Nernst eğimi ile K⁺ teriminin paydaki payının çarpımıdır: 61,5 × 5/12 = 25,6. Cl⁻ terimi kalkınca K⁺ payı büyür ve eğim artar; ama Na⁺ sızıntısı durdukça tam 61,5'e çıkmaz. 1. sekmede P<sub>Cl</sub>/P<sub>K</sub> kaydırıcısını 0'a çekerek doğrula.",
    },
    {
      question: "Çok kısa uyarılarda eşikteki yük (akım × süre) neredeyse sabittir. 0,1 ms'lik bir uyarının eşiği 65 µA/cm² ise 0,05 ms'lik uyarının eşiği yaklaşık kaçtır?",
      options: ["32 µA/cm²", "65 µA/cm²", "130 µA/cm²", "260 µA/cm²"],
      answer: 2,
      explanation: "Yük sabitse süre yarıya inince akım iki katına çıkar: 6,5 nC/cm² / 0,05 ms ≈ 130 µA/cm². Sayfanın kuvvet–süre eğrisinde 0,05 ms için 129,8 µA/cm² (yük 6,49 nC/cm²) çıkar. Uzun uyarılarda ise kural bozulur ve akım reobaza, 2,236 µA/cm²'ye iner.",
    },
    {
      question: "Miyelinsiz bir aksonun hızını iki katına çıkarmak için çapı kaç katına çıkarmak gerekir? Sayfanın miyelinli modelinde aynı hız artışı için ne gerekir?",
      options: ["Miyelinsizde 2 kat, miyelinlide 4 kat", "Miyelinsizde 4 kat, miyelinlide 2 kat", "İkisinde de 2 kat", "İkisinde de 4 kat"],
      answer: 1,
      explanation: "Miyelinsiz aksonda v ∝ √d olduğundan iki kat hız dört kat çap ister (125 → 500 µm: 6,28 → 12,56 m/s). Miyelinli modelde düğümler arası uzaklık da d ile büyüdüğü için v ∝ d: 10 µm'den 20 µm'ye 23,15 → 46,29 m/s.",
    },
  ],
  next: [
    { href: "elektrokimya.html", title: "Elektrokimya Laboratuvarı: Hücre, Nernst, Faraday", why: "Aynı Nernst denklemi, bu kez metal elektrotlu bir derişim hücresinde: gerilimin log Q ile değişimini ölç." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa", why: "Kararlılık, faz portresi ve van der Pol limit çevrimi: HH'nin dinlenim noktası ile sürekli ateşlemesinin dili." },
    { href: "homeostaz-ve-geri-besleme.html", title: "Homeostaz ve Geri Besleme: Döngü, Glukoz–İnsülin, Isı ve İki Durumluluk", why: "Na⁺ kanallarının pozitif, K⁺ kanallarının negatif geri beslemesi; geri besleme döngülerini ve iki durumlu anahtarı ayrı bir laboratuvarda incele." },
    { href: "elektrik-devresi-simulasyonu.html", title: "DC Devre Laboratuvarı: Ohm ve Kirchhoff Yasaları", why: "Kablo modeli, bölmeler arası dirençlerden kurulmuş bir zincirdir; düğüm akımlarını Kirchhoff yasalarıyla burada çöz." },
  ],
  sources: [
    { title: "Wikipedia · Hodgkin–Huxley model", url: "https://en.wikipedia.org/wiki/Hodgkin%E2%80%93Huxley_model", note: "Devre ve kapı denklemleri, gerilim kenetlemesiyle kurulan 1952 modeli, 1963 Nobel'i; akım çatallanma parametresi alınınca Hopf çatallanması ve bunun sonucu olan en düşük ateşleme frekansı (İngilizce)." },
    { title: "Wikipedia · Alan Hodgkin", url: "https://en.wikipedia.org/wiki/Alan_Hodgkin", note: "1939 Plymouth kaydı ve savaştan hemen önce Nature'a gönderilen not, Katz ile Na⁺ geçirgenliği çalışması, beş makalelik 1952 dizisi ve Huxley ile Eccles'le paylaşılan 1963 Nobel'i (İngilizce)." },
    { title: "Wikipedia · Saltatory conduction", url: "https://en.wikipedia.org/wiki/Saltatory_conduction", note: "Lillie'nin 1925 demir tel modeli, Tasaki 1939 ve Huxley ile Stämpfli 1949 doğrulamaları (İngilizce)." },
    { title: "Wikipedia · Chronaxie", url: "https://en.wikipedia.org/wiki/Chronaxie", note: "Reobaz ve kronaksinin tanımı; Lapicque 1907 ve 1909, Weiss 1901 (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
