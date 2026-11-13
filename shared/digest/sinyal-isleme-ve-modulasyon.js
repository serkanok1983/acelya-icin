window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["sinyal-isleme-ve-modulasyon"] = {
  slug: "sinyal-isleme-ve-modulasyon",
  title: "Sinyal İşleme ve Modülasyon: Örnekleme, FFT, AM–FM ve Süzgeçler",
  field: "Mühendislik",
  level: "Lisans",
  minutes: 45,
  tagline:
    "Telefonundaki ses, radyodaki şarkı, kameradaki görüntü: hepsi önce sayılara dönüşür, sonra frekanslarına ayrılır, bir taşıyıcıya bindirilir ve gürültüden süzülür. Bu sayfa o zincirin her halkasını ölçerek gösterir.",
  hook:
    "Filmlerde hızlanan bir arabanın tekerleği bir an durur, sonra geriye dönmeye başlar. Kamera bozuk değildir; saniyede yalnızca belli sayıda kare çeker ve aradakini göremez. Peki bir dalgayı saniyede kaç kez ölçmek yeter, ve az ölçersen kaybettiğin bilgi nereye gider?",
  bigIdea:
    "Bir sinyali <strong>frekanslarının toplamı</strong> olarak görmek her şeyi açar: fₛ hızında örneklenen dalga, en yüksek frekansı <em>fₛ/2</em>'nin altındaysa tam geri kurulur; üstündeyse başka bir frekansa katlanır. Modülasyon tayfı taşıyıcının yanına taşır, süzgeç ise tayftan istediğini seçer.",
  story: [
    "Hikâye ısıyla başlar. Joseph Fourier, katı cisimlerde ısının yayılması üzerine çalışmasını 21 Aralık 1807'de Paris Enstitüsü'ne sundu ve 1822'de <em>Théorie analytique de la chaleur</em> (Isının Analitik Kuramı) adlı kitabını yayımladı. Fikri cesurdu: karmaşık görünen bir eğri, sinüs ve kosinüslerin toplamı olarak yazılabilir. Ondan bile önce, yaklaşık 1805'te, Carl Friedrich Gauss Pallas ve Juno asteroitlerinin yörüngelerini ara değerlemek için bugün FFT dediğimiz hızlı yöntemin bir biçimini kullanmıştı; ama Latince yazdığı bu not ancak ölümünden sonra toplu eserlerinde yayımlandı ve uzun süre bir algoritma olarak fark edilmedi.",
    "Örnekleme kuramının tek bir babası yoktur. Edmund Whittaker'ın 1915 tarihli makalesi bazen ilk sayılır, ama asıl konusu bir ara değerleme formülüydü. Harry Nyquist'in 1928'deki telgraf iletimi makalesi kuramın adını taşır, oysa Nyquist teoremi açıkça yazmamıştır: makalesi bir hattan saniyede kaç bağımsız darbe geçebileceğini bant genişliğine bağlıyordu. Vladimir Kotelnikov 1933'te sonucu bağımsız olarak buldu; Rusça kaynaklarda teorem hâlâ onun adıyla anılır. Claude Shannon ise 1948'deki iletişim kuramı makalesinde ve 1949'da yayımlanan <em>Communication in the Presence of Noise</em> (Gürültü Altında İletişim) makalesinde onu bugünkü biçimiyle yazıp iletişim kuramının temel taşı yaptı.",
    "Radyo da aynı matematiğin çocuğudur. Reginald Fessenden 1900'ün sonunda konuşmayı yaklaşık 1,6 km öteye radyo dalgasıyla iletti; ses çok bozuktu ama bu, bilinen ilk başarılı sesli radyo iletimiydi. 21 Aralık 1906'da Brant Rock'tan konuşmayı 18 km uzaktaki Plymouth'a ulaştırdı. 1922'de John Renshaw Carson frekans modülasyonunun sonsuz sayıda yan frekans ürettiğini, genliklerinin Bessel fonksiyonlarıyla verildiğini gösterdi; bugün adını taşıyan bant genişliği kuralı da bu makaleye dayandırılır. Carson aynı makalede FM'in bant genişliğinden tasarruf sağlamadığını, bu yüzden pek yararlı olmadığını savundu. Bu yargıyı Edwin Howard Armstrong tersine çevirdi: geniş bantlı FM'in temel özellikleri için 26 Aralık 1933'te beş ABD patenti aldı, 1934–1935'te Empire State Binası'ndaki denemelerle FM'in paraziti nasıl bastırdığını gösterdi ve sonuçlarını 1936'da yayımladı.",
    "Bilgisayar çağının dönüm noktası 1965'tir: James Cooley ve John Tukey, <em>Mathematics of Computation</em> dergisinde ayrık Fourier dönüşümünü bilgisayarda hızla hesaplamanın yolunu anlattı. Tukey'nin derdi pratikti: Sovyetler Birliği'ndeki nükleer denemeleri ülke dışındaki sismometrelerle saptamak için büyük veri yığınlarını hızla dönüştürmek gerekiyordu. N² çarpmayı (N/2)·log₂N'e indiren bu algoritma, bugün her telefonda, her Wi-Fi alıcısında ve her ses dosyasında saniyede milyonlarca kez çalışır.",
  ],
  core: [
    {
      heading: "Örnekleme, sinc ile geri kurma ve örtüşme",
      body:
        "Sürekli bir x(t) dalgasını her 1/fₛ saniyede bir ölçtüğünde elinde yalnızca x[n] sayıları kalır. Dalganın en yüksek frekansı fₛ/2'nin (Nyquist frekansı) altındaysa bu sayılar dalgayı tümüyle belirler: her örneğe bir sinc darbesi koyup toplamak aradaki her değeri geri verir. Frekans fₛ/2'yi aşınca iş bozulur: cos(2π·17n/20) ile cos(2π·3n/20) örnekleri aynı açılara düşer, çünkü aradaki fark 2π'nin tam katıdır. Örnekler hangi dalgadan geldiğini bilemez; sinc toplamı da en düşük frekanslı adayı, yani 3 Hz'i kurar. Vagon tekerleği aynı olaydır: kamera saniyede 20 kare çekerken 17 tur/s dönen tekerlek kareden kareye 17/20 tur ilerler, göz bunu −3/20 turluk geri adım olarak okur.",
      formula: "x(t) = Σ x[n]·sinc(fₛt − n), görünen frekans = |f − k·fₛ|, k = yuvarla(f/fₛ)",
      formulaNote: "sinc(u) = sin(πu)/(πu). Sayfada f = 3, fₛ = 20 iken geri kurma hatası 0,003; f = 17'de 1,000 olur: kurulan eğri artık başka bir dalgadır.",
    },
    {
      heading: "Nicemleme: bit başına 6 dB nereden gelir?",
      body:
        "Örneklerin değeri de sonlu sayıda basamağa yuvarlanır. ±1 aralığını b bitle bölersen basamak Δ = 2/2ᵇ olur. Hata −Δ/2 ile +Δ/2 arasında düzgün dağılıyorsa gücü Δ²/12'dir; tam ölçek sinüsün gücü ise 1/2. Oran 1,5·4ᵇ çıkar; desibele çevirince 20·log₁₀2 ≈ 6,02 dB her bit için, artı 10·log₁₀1,5 ≈ 1,76 dB. Kural yine de bir yaklaşımdır: saf bir sinüsün hatası tam düzgün değildir. Sinüs tepelerde yavaşlar, en üst ve en alt basamakta uzun kalır; orada hata hep basamak kenarına, Δ/2'ye yakındır. Sayfa 8 bitte 49,79 dB ölçer, kural 49,93 dB der (fark −0,14 dB); hata RMS'i Δ'nın 0,2933 katıdır, düzgün dağılımın 1/√12 = 0,2887'si değil. Bit arttıkça bu tepe basamağı toplamda önemsizleşir. Sinyali tam ölçeğin 30 dB altına çekersen SQNR de kabaca 30 dB düşer: kural 19,93 dB der, sayfa 19,05 dB ölçer (−0,87 dB), çünkü sinüs artık yalnız sekiz kadar basamağı tarar ve hata sinyale bağlanır.",
      formula: "SQNR ≈ 6,02·b + 1,76 dB (tam ölçek sinüs)",
      formulaNote: "16 bit (CD) için ölçülen 98,08 dB, kural 98,09 dB. 3 bitte fark −0,73 dB'ye çıkar: basamak az olunca hata artık gürültüye benzemez.",
    },
    {
      heading: "DFT, FFT, sızıntı ve pencereler",
      body:
        "N örneğin ayrık Fourier dönüşümü tayfı Δf = fₛ/N aralıklı kutularda verir. Doğrudan hesap N² karmaşık çarpma ister; FFT diziyi çift ve tek yarılara bölerek bunu (N/2)·log₂N kelebeğe indirir: N = 256'da 65 536'ya karşı 1024. Ton tam bir kutuya düşmezse enerjisi komşu kutulara sızar: iki kutunun tam ortasındaki tonun tepesi 1 yerine yaklaşık 2/π ≈ 0,64 okunur. Bunun kaynağı dikdörtgen pencerenin çekirdeğidir: kutudan δ kadar uzaktaki tonun okunan genliği |sin(πδ)/(N·sin(πδ/N))|; δ = ½ ve N = 256'da 1/(256·sin(π/512)) = 0,6366, 2/π'ye beş basamak yakın. Dikdörtgen pencerenin yan lobları uzaklıkla ancak 1/k gibi söner ve yakındaki zayıf bir tonu gömer. Hann penceresi kaydın kenarlarını yumuşakça sıfıra indirir; yan lobları 1/k³ gibi söner, bedeli daha geniş bir ana lobdur. Sıfır doldurma tayfı daha sık noktalarda çizer ama ayırma gücünü artırmaz: iki tonu ayırmak için kaydı uzatmak gerekir.",
      formula: "X[k] = Σ x[n]·w[n]·e<sup>−2πikn/N</sup>, Δf = fₛ/N",
      formulaNote: "Sayfa f₁ = 102 Hz (25,5 kutu) için 0,6413 ölçer; farkı negatif frekanstaki ayna ve zayıf ikinci ton getirir. Hann'da aynı değer 8/(3π) ≈ 0,8488 olur. Ayırma gücü kabaca kayıt süresinin tersidir: N/fₛ = 0,25 s'lik kayıt, 4 Hz'ten çok daha yakın tonları ayıramaz. Kare dalganın harmonikleri 4/(πn) olur; örneklenmiş kare dalgada kesin değer 4/(P·sin(πn/P))'dir.",
    },
    {
      heading: "AM ve FM: tayfı taşıyıcının yanına taşımak",
      body:
        "Genlik modülasyonunda mesaj taşıyıcının genliğini oynatır: [1 + m·cos 2πfₘt]·cos 2πfₜt. Çarpımı toplama açınca tayfta üç çizgi belirir: fₜ'de 1, fₜ ± fₘ'de m/2. Gücün yalnız m²/(2 + m²) kadarı bilgi taşıyan yan bantlardadır; m = 1'de bile yüzde 33,3. m > 1 olunca 1 + m·cos 2πfₘt sıfırın altına iner ve basit zarf dedektörü mesajı bozar; taşıyıcının kopyasıyla çarpan eş evreli dedektör ise doğru okur, yeter ki evreyi bilsin (çıkış m·cos φ). Frekans modülasyonunda mesaj evreyi oynatır: cos(2πfₜt + β·sin 2πfₘt). Tayf fₜ ± n·fₘ'de sonsuz sayıda çizgidir ve genlikleri Bessel fonksiyonları Jₙ(β)'dır. β ≈ 2,405'te J₀ = 0 olur: taşıyıcı tümüyle kaybolur, bütün güç yan bantlara geçer.",
      formula: "AM: P<sub>yan</sub>/P = m²/(2 + m²) · FM: B<sub>Carson</sub> = 2(β + 1)·fₘ",
      formulaNote: "Carson kuralı gücün kabaca yüzde 98'ini kapsayan bandı verir. Sayfada β = 5'te iki ölçü de 1200 Hz çıkar, β = 2,405'te Carson 681 Hz, ölçülen yüzde 98 bandı 600 Hz'dir.",
    },
    {
      heading: "Sayısal süzgeçler, kutuplar ve kararlılık",
      body:
        "Sayısal süzgeç bir fark denklemidir: çıkış, girişlerin ve (IIR'de) önceki çıkışların ağırlıklı toplamıdır. FIR süzgecin (hareketli ortalama, pencereli sinc) belleği sonludur, her zaman kararlıdır. IIR süzgeç kendi çıkışını geri besler; z düzlemindeki kutupları birim çemberin içindeyse dürtü yanıtı her adımda |p| katına küçülür, dışındaysa büyür ve süzgeç patlar. Beyaz gürültü süzgeçten geçerken gücü Σh² katına iner, f₀'daki sinyal ise |H(f₀)|² katına; SNR kazancı bu ikisinin oranıdır. M = 8'lik hareketli ortalamada Σh² = 1/8, yani kazanç yaklaşık 10·log 8 ≈ 9 dB'dir; sinyal 10 Hz'de biraz zayıfladığı için kuram +8,94 dB verir.",
      formula: "H(e<sup>iω</sup>) = Σ bₖe<sup>−iωk</sup> / Σ aₖe<sup>−iωk</sup>, ω = 2πf/fₛ; SNR kazancı = 10·log(|H(f₀)|²/Σh²)",
      formulaNote: "Varsayılan pencereli sinc (51 katsayı, Hamming, fₖ = 50 Hz) 30 Hz'i |H| = 0,9186 ile geçirir; 10 Hz'lik sinyal için SNR kazancı kuramı +10,76 dB, tohum 1'de ölçülen +10,58 dB. Rezonatörde kutup yarıçapı r: dürtü yanıtı rⁿ gibi söner. r = 0,95'te ölçülen sönüm 0,9500/örnek, r = 1,01'de büyüme 1,0100/örnek.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir: <strong>01 · Örnekleme ve Nyquist</strong>, <strong>02 · DFT ve FFT</strong>, <strong>03 · AM ve FM</strong> ve <strong>04 · Sayısal süzgeçler</strong>. Her okumada ölçülen değer kuramın yanında durur: görünen frekans örneklerin DFT'sinden, SQNR 65 536 örnekten, yan bantlar 16 384 noktalı FFT'den, süzgeç yanıtı içinden kosinüs geçirerek ölçülür. Frekanslar öğretim değerleridir (taşıyıcı fₜ = 4000 Hz gibi); gerçek yayında taşıyıcı çok daha yüksektir (orta dalga AM, Türkiye'nin de bulunduğu ITU 1. bölgede 531–1602 kHz arasında; FM radyo çoğunlukla 87,5–108 MHz arasında yayın yapar) ama oranlar ve tayfın biçimi aynı kalır. <strong>R</strong> tuşu etkin sekmeyi sıfırlar, Boşluk tekerleği duraklatır.",
    experiments: [
      {
        title: "Geri dönen tekerlek",
        predict: "Saniyede 17 tur dönen bir tekerleği saniyede 20 kare çeken bir kamera nasıl görür: hızlı ileri mi, yavaş ileri mi, geri mi?",
        do: "Örnekleme ve Nyquist sekmesinde \"f = 17 Hz: geri dönen tekerlek\" düğmesine bas. Sonra \"f = fₛ: duran tekerlek\" ve \"f = 21 Hz: yavaş ileri\" düğmelerini dene.",
        observe: "Kuram |f − k·fₛ| 3,000 Hz (k = 1), ölçülen görünen frekans da 3,000 Hz; tekerlek −3,00 tur/s ile geri döner ve geri kurma hatası 1,000'e çıkar. f = fₛ'de görünen frekans 0,000 Hz, tekerlek durur; f = 21 Hz'de +1,00 tur/s ileri döner.",
        explain: "17 Hz'lik kosinüsün örnekleri, −3 Hz'lik (yani 3 Hz'lik) kosinüsün örnekleriyle birebir aynıdır: 17/20 tur ilerlemek ile 3/20 tur gerilemek kamera karesinde aynı görünür (30°'lik evre de işaret değiştirir). Sinc toplamı en düşük frekanslı adayı kurar; asıl dalga kaybolmuştur.",
      },
      {
        title: "Pencere ve gizli zayıf ton",
        predict: "Güçlü bir tonun 16 Hz ötesinde, ondan 40 dB (yüz kat genlik) zayıf ikinci bir ton var. Tayfta ayrı bir tepe olarak görünür mü?",
        do: "DFT ve FFT sekmesini varsayılanında bırak (dikdörtgen pencere, f₁ = 102 Hz, yani 25,5 kutu; a₂ = 0,01). Okumaları not et, sonra \"Hann ile zayıf ton\" düğmesine bas.",
        observe: "Dikdörtgende tepe 0,6413 (−3,86 dB; kuram 0,6366), f₂'ye en yakın kutuda −21,8 dB okunur, oysa ikinci ton yokken de orada −22,4 dB vardır; ayrı tepe yok. Hann'da tepe 0,8489 (−1,42 dB), f₂ −44,2 dB (ton yokken −48,7 dB) ve ayrı tepe var.",
        explain: "Dikdörtgen pencerenin yan lobları 1/k gibi yavaş söner; güçlü tonun sızıntısı zayıf tonu gömer. Hann'ın yan lobları 1/k³ gibi söner, zayıf ton ortaya çıkar. Ek deney: \"Yarım kutu arayla iki ton\" Z = 16 sıfır doldurmayla bile ayrışmaz; N = 2048 seçince ayrışır.",
      },
      {
        title: "Aşırı modülasyon ve iki dedektör",
        predict: "AM'de modülasyon indisi 1,5'e çıkarsa mesaj kaybolur mu? Tayf mı bozulur, yoksa yalnız alıcının işi mi zorlaşır?",
        do: "AM ve FM sekmesinde \"AM, m = 1,5: aşırı\" düğmesine bas; demodülasyon okumalarına bak. Sonra yerel osilatör evre hatası φ'yi 90°'ye çek.",
        observe: "Tayf hâlâ temiz: taşıyıcı 1,0000, yan bantlar 0,7500 / 0,7500; güç payı 52,941 %, kuram m²/(2 + m²) ile aynı. Zarf dedektörü 1,1713 genlik ve 28,119 % THD (2.–5. harmonikler) verir; eş evreli dedektör 1,5000 ve 0,000 % THD. φ = 90°'de eş evreli çıkış 0,0000'a düşer.",
        explain: "m > 1'de 1 + m·cos negatif olur; zarf dedektörü yalnız mutlak değeri görür ve dalgayı katlar. Eş evreli dedektör işareti korur ama taşıyıcının evresini bilmek zorundadır; çıkışı m·cos φ'dir. FM ek deneyi: \"FM, β = 2,405\" ile J₀² 0,000 % olur, taşıyıcı tümüyle kaybolur.",
      },
      {
        title: "Kutup birim çemberi aşınca",
        predict: "Bir rezonatörün kutup yarıçapını 0,95'ten 0,8'e indirince ve sonra 1'in üstüne çıkarınca dürtü yanıtına ne olur?",
        do: "Sayısal süzgeçler sekmesinde Süzgeç türü olarak \"Rezonatör: kutupları elle yerleştir\" seç (r = 0,95), sonra r = 0,8 yap, en sonda \"Rezonatör, r = 1,01\" düğmesine bas. Ardından \"Hareketli ortalama, M = 8\" ile SNR okumalarına bak.",
        observe: "Dürtü yanıtının sönümünden ölçülen değer 0,9500 ve 0,8000 olur: tam r. r = 1,01'de büyüme 1,0100/örnek, durum satırı KARARSIZ der; ölçülen |H| ve SNR tanımsızdır. Hareketli ortalamada SNR kazancı +8,83 dB (tohum 1), kuram +8,94 dB.",
        explain: "IIR süzgecin dürtü yanıtı kutbun kuvvetleri gibi davranır: |p| < 1 söner, |p| > 1 patlar. Hareketli ortalama beyaz gürültüyü Σh² = 1/8 katına indirir; tek bir tohumun ölçümü kuramın çevresinde salınır, \"Yeni gürültü\" ile birkaç tohumun ortalaması kurama oturur.",
      },
    ],
  },
  wow: [
    {
      title: "FFT'yi Gauss bulmuştu",
      body:
        "Cooley ve Tukey 1965'te algoritmayı yayımladığında aslında onu yeniden keşfetmişlerdi. Gauss aynı fikri yaklaşık 1805'te Pallas ve Juno asteroitlerinin yörüngelerini ara değerlemek için kullanmıştı; Fourier'nin ısı makalesinden bile önce. Not, Gauss'un ölümünden sonra Latince yayımlanan toplu eserlerinde kaldı ve uzun süre kimse onu bir algoritma olarak fark etmedi.",
    },
    {
      title: "Nükleer denemeleri dinleyen dönüşüm",
      body:
        "Tukey, Başkan Kennedy'nin bilim danışma kurulundaki bir toplantıda Sovyet nükleer denemelerinin ülke dışındaki sismometrelerle nasıl saptanabileceğini tartışıyordu. Bunun için çok sayıda kaydın Fourier dönüşümünü hızla almak gerekiyordu. Toplantıdaki Richard Garwin, Tukey'i Cooley ile tanıştırdı ama asıl amacı ondan sakladı. Hızlı dönüşüm, nükleer deneme yasağının denetlenebilir olması için kritik görülüyordu.",
    },
    {
      title: "İlk radyo yayını gerçekten oldu mu?",
      body:
        "1906 Noel arifesinde gemilere müzik ve konuşma yayımlandığı öyküsü yalnız Fessenden'in 1932'de yazdığı bir mektuba dayanır; eski çalışma arkadaşı Samuel Kintner bunu Fessenden'in ölümünden sonra yayımladı. Yayının 50. ve 100. yıl dönümlerinde gemi telsiz kayıtları da taranarak yapılan doğrulama çabaları bir iz bulamadı. Belgelenmiş olan, aynı ayın 21'inde Brant Rock'tan 18 km öteye yapılan konuşma gösterisidir.",
    },
  ],
  worked: {
    title: "Taşıyıcısı kaybolan FM sinyalinin bant genişliği",
    prompt:
      "Bir taşıyıcı fₘ = 100 Hz'lik bir sinüsle β = 2,405 indisle frekans modüle ediliyor. Frekans sapmasını ve Carson bant genişliğini bul; sonra Bessel genliklerinden gücün en az yüzde 98'ini taşıyan en dar simetrik bandı hesapla ve sayfanın ölçtüğüyle karşılaştır.",
    steps: [
      "Sapma: Δf = β·fₘ = 2,405 × 100 Hz = 240,5 Hz. Carson kuralı: B = 2(Δf + fₘ) = 2(240,5 + 100) Hz = 681 Hz.",
      "Tayf fₜ ± n·fₘ'deki çizgilerdir, genlikleri Jₙ(β). β = 2,405'te J₀ ≈ 0, J₁ = 0,51911, J₂ = 0,43178, J₃ = 0,19903. Σ Jₙ² = 1 olduğundan, n'inci çizgi çiftinin güç payı 2·Jₙ²'dir (taşıyıcınınki J₀²).",
      "Payları topla: J₁² = 0,26948, J₂² = 0,18643, J₃² = 0,03961. ±1 çizgiyle 0,539, ±2 ile 0,539 + 0,373 = 0,912 (yetmez), ±3 ile 0,912 + 0,079 = 0,991 ≥ 0,98. Demek ki K = 3 ve bant 2·K·fₘ = 600 Hz.",
      "Sayfada dene: AM ve FM sekmesinde \"FM, β = 2,405\" düğmesine bas. Ölçülen taşıyıcı payı J₀² 0,000 %, ölçülen 98 % bandı 600 Hz (±3 çizgi), Carson 681 Hz okunur; tablodaki J₁, J₂, J₃ elle kullandığımız değerlerdir.",
      "Ölçekle: FM radyoda en büyük sapma tipik olarak ±75 kHz'dir. En yüksek ses frekansı 15 kHz alınırsa β = 5 olur ve Carson bandı 2(75 + 15) kHz = 180 kHz çıkar. Sayfada \"FM, β = 5\" ile Carson ve yüzde 98 bandı ikisi de 1200 Hz = 12·fₘ'dir; aynı oran 15 kHz'e taşınınca 180 kHz verir.",
    ],
    result:
      "Δf = 240,5 Hz, Carson bandı 681 Hz; gücün yüzde 98'i ise ±3 yan bantta, 600 Hz içinde toplanır. Carson kuralı bu β'da biraz cömerttir; β = 5'te tam tutar.",
  },
  misconceptions: [
    {
      myth: "Sıfır doldurma tayfın çözünürlüğünü artırır, yakın iki tonu ayırır.",
      truth:
        "Sıfır doldurma aynı kaydın tayfını daha sık noktalarda çizer; yeni bilgi eklemez. Ayırma gücü kayıt süresine bağlıdır (Δf = fₛ/N). Sayfadaki \"Yarım kutu arayla iki ton\" Z = 16'da bile tek tepede birleşir, N = 2048 seçince iki tepe olur.",
    },
    {
      myth: "Sinyalin frekansının tam iki katında örneklemek yeter.",
      truth:
        "Tam fₛ/2'de sonuç evreye bağlıdır: örnekler dalganın tepelerine de sıfırlarına da düşebilir. Sayfada f = fₛ/2 seçince 30° evreli kosinüsün geri kurma hatası 0,361 olur. Teorem, frekansın fₛ/2'nin kesinlikle altında olmasını ister; pratikte arada pay bırakılır.",
    },
    {
      myth: "FM'in bant genişliği frekans sapmasının iki katıdır, 2Δf.",
      truth:
        "Mesaj frekansını unutmak büyük hatadır. Küçük β'da sapma neredeyse sıfırdır ama yine de fₜ ± fₘ'de yan bantlar vardır. Carson kuralı 2(Δf + fₘ) her iki ucu da kapsar; β = 5'te 2Δf = 1000 Hz verirken gerçek yüzde 98 bandı 1200 Hz'dir.",
    },
    {
      myth: "AM'de taşıyıcı mesajı taşır, güç ne kadar büyükse bilgi o kadar çoktur.",
      truth:
        "Taşıyıcının frekansı ve genliği mesajdan bağımsızdır; bilgi yalnız yan bantlardadır. m = 0,5'te gücün yalnız 11,111 %'i yan bantlardadır, m = 1'de bile 33,333 %. Taşıyıcının işi basit zarf dedektörünün çalışmasını sağlamaktır.",
    },
  ],
  glossary: [
    { term: "Nyquist frekansı", definition: "Örnekleme frekansının yarısı, fₛ/2. Bunun altındaki frekanslar örneklerden tek anlamlı geri kurulur." },
    { term: "Örtüşme (aliasing)", definition: "fₛ/2'nin üstündeki bir frekansın örneklerde |f − k·fₛ| frekanslı başka bir dalga gibi görünmesi; vagon tekerleği etkisi bunun görsel biçimidir." },
    { term: "SQNR", definition: "Sinyalin nicemleme gürültüsüne güç oranı, desibel olarak. Tam ölçek sinüste yaklaşık 6,02·b + 1,76 dB." },
    { term: "Spektral sızıntı", definition: "Kayda tam sayıda periyot sığmayan bir tonun enerjisinin komşu DFT kutularına yayılması; pencere ile azaltılır." },
    { term: "Pencere (Hann)", definition: "Kaydı kenarlarda yumuşakça sıfıra indiren ağırlık. Yan lobları hızla söndürür, ana lobu genişletir; adını meteorolog Julius von Hann'dan alır." },
    { term: "Modülasyon indisi", definition: "AM'de m: genliğin taşıyıcıya göre bağıl oynaması. FM'de β = Δf/fₘ: tepe evre sapması, radyan cinsinden." },
    { term: "Carson kuralı", definition: "FM sinyalinin bant genişliği için B ≈ 2(Δf + fₘ); gücün kabaca yüzde 98'ini kapsar." },
    { term: "Kutup", definition: "Süzgecin aktarım fonksiyonunda paydayı sıfırlayan z değeri. Bütün kutuplar birim çemberin içindeyse süzgeç kararlıdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her sekme bir lisans dersinin çekirdeğidir. <strong>İşaretler ve Sistemler</strong> dersinde Fourier serisi ve dönüşümü, evrişim ve örnekleme kuramı; <strong>Sayısal İşaret İşleme</strong>'de DFT, FFT, pencereler, z dönüşümü ve FIR/IIR süzgeç tasarımı; <strong>Haberleşme Sistemleri</strong>'nde AM, FM, dedektörler ve gürültü altında başarım işlenir. z dönüşümü, Laplace dönüşümünün ayrık kardeşidir: kutupların birim çemberin içinde olma koşulu, sürekli sistemlerde kutupların sol yarı düzlemde olma koşuluna karşılık gelir.",
      "Bir adım ötede Shannon'ın kanal kapasitesi bekler: gürültülü bir kanaldan saniyede en çok kaç bit geçebileceği, bant genişliği ve SNR ile belirlenir. Bugünkü Wi-Fi ve 4G/5G sistemleri yüzlerce taşıyıcıyı FFT ile aynı anda üretip çözer; ses ve görüntü sıkıştırma ise tayfın kulağın ve gözün fark etmediği kısmını atar. Hepsinin dili bu sayfadaki tayf ve süzgeç düşüncesidir.",
    ],
    topics: ["Fourier dönüşümü", "Örnekleme kuramı", "z dönüşümü", "FIR ve IIR süzgeç tasarımı", "Pencereler ve tayf kestirimi", "Analog ve sayısal modülasyon", "Kanal kapasitesi"],
  },
  quiz: [
    {
      question: "Saniyede 1200 örnek alan bir sistem 1000 Hz'lik bir tonu hangi frekansta görür?",
      options: ["1000 Hz", "600 Hz", "200 Hz", "2200 Hz"],
      answer: 2,
      explanation: "1000 Hz, Nyquist frekansı 600 Hz'in üstündedir. k = yuvarla(1000/1200) = 1, görünen frekans |1000 − 1200| = 200 Hz. Sayfada aynı oranı f = 17, fₛ = 20 ile dene: 3 Hz görünür.",
    },
    {
      question: "fₛ = 1024 Hz ve N = 256 örnekle 2 Hz arayla duran iki eşit tonu ayırmak istiyorsun. Hangisi işe yarar?",
      options: ["Z = 16 sıfır doldurmak", "Hann penceresine geçmek", "Kaydı N = 2048 örneğe uzatmak", "Örnek başına bit sayısını artırmak"],
      answer: 2,
      explanation: "Çözünürlük Δf = fₛ/N = 4 Hz'tir; 2 Hz arayı ancak kaydı uzatarak (N = 2048'de Δf = 0,5 Hz) ayırabilirsin. Sıfır doldurma yalnız çizimi sıklaştırır, Hann ana lobu daha da genişletir.",
    },
    {
      question: "8 bitlik bir çözücüde tam ölçek sinüs yaklaşık 50 dB SQNR verir. Aynı sinüs 16 bitle nicemlenirse SQNR yaklaşık ne olur?",
      options: ["Yaklaşık 100 dB (iki katı, çünkü bit iki katı)", "Yaklaşık 98 dB (her bit 6 dB ekler)", "Yaklaşık 56 dB", "Değişmez, gürültü örneklemeden gelir"],
      answer: 1,
      explanation: "Her ek bit basamağı yarıya, gürültü gücünü dörtte bire indirir: 6,02 dB. 8 ek bit 48,2 dB ekler: 49,9 + 48,2 ≈ 98,1 dB. Sayfada \"16 bit (CD)\" ölçülen 98,08 dB verir.",
    },
  ],
  next: [
    { href: "fourier-ses.html", title: "Fourier: Sesten Örneklere", why: "Harmoniklerden ses kurup canlı dinle; tayfı kulakla duyduğunda bu sayfadaki çizgiler somutlaşır." },
    { href: "bilgi-kurami-ve-sikistirma.html", title: "Bilgi Kuramı ve Sıkıştırma: Entropi, Huffman, LZ ve Kanal Kapasitesi", why: "Shannon'ın öteki büyük sorusu: bir mesaj kaç bitle yazılır, gürültülü bir kanaldan saniyede en çok kaç bit geçer?" },
    { href: "alternatif-akim.html", title: "Alternatif Akım: RLC Devresi, Fazörler ve Rezonans", why: "Süzgeçlerin analog atası: RLC devresinde rezonans, kalite çarpanı Q ve fazörlerle frekans yanıtı." },
    { href: "karmasik-sayilar.html", title: "Karmaşık Sayılar: Düzlemde Döndürme ve Büyütme", why: "e^(iω) neden bir döndürmedir, kutup neden birim çemberle karşılaştırılır: z düzleminin geometrisi buradan gelir." },
  ],
  sources: [
    { title: "Wikipedia · Nyquist–Shannon sampling theorem", url: "https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem", note: "Teoremin ifadesi, örtüşme ve tarihçe: Whittaker 1915, Nyquist 1928, Kotelnikov 1933, Shannon 1949 (İngilizce)." },
    { title: "Wikipedia · Cooley–Tukey FFT algorithm", url: "https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm", note: "Radix-2 FFT'nin işleyişi, Gauss'un 1805 civarındaki çalışması, 1965 makalesi ve nükleer deneme bağlamı (İngilizce)." },
    { title: "Wikipedia · Frequency modulation", url: "https://en.wikipedia.org/wiki/Frequency_modulation", note: "Bessel yan bantları, β ≈ 2,405'te taşıyıcı sıfırı, Carson kuralı ve Carson'ın 1922 makalesi (İngilizce)." },
    { title: "Wikipedia · AM broadcasting", url: "https://en.wikipedia.org/wiki/AM_broadcasting", note: "Fessenden'in 1900 ve 1906 iletimleri, yalnız 1932 tarihli bir mektuba dayanan Noel yayını ve ITU bölgelerine göre orta dalga bandı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
