window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["newton-hareket-yasalari"] = {
  slug: "newton-hareket-yasalari",
  title: "Newton Yasaları: Kuvvet, Kütle ve İvme",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir bloğu it, sürtünmenin itmene nasıl yanıt verdiğini ölç; asılı kütleyle bir arabayı çekip a–F doğrusundan kütleyi tart; yayla ayrılan iki arabada etki ile tepkiyi yan yana gör.",
  hook: "2 kilogramlık tahta bloğu 6 newtonla itiyorsun, kıpırdamıyor. Formülü açıp sürtünmeyi hesaplıyorsun: μ<sub>s</sub>·N = 0,5 × 2 kg × 9,81 m/s² = 9,81 N. Ama sürtünme gerçekten 9,81 N olsaydı, 6 N'luk itmene karşı blok sana doğru, geriye fırlardı. O hâlde sürtünme şu anda tam olarak kaç newton?",
  bigIdea:
    "Kuvvet hareketi değil, hareketin <strong>değişimini</strong> belirler: her cismin ivmesini yalnız o cisme etkiyen kuvvetlerin toplamı verir ve iki cisim birbirini her an eşit ve zıt kuvvetle iter.",
  story: [
    "Aristoteles'in fiziğinde zorla yaptırılan her hareketin bir iticisi olmalıydı; itici ortadan kalkınca hareket de biterdi. Bu fikrin açığı ortadaydı: elden çıkan bir taş neden yoluna devam ediyordu? Soru yüzyıllarca tartışıldı. Galileo, 1630'larda yayımlanan kitaplarında eğik düzlemlerle düşündü: bir eğimden yuvarlanan top, karşıdaki eğimde neredeyse aynı yüksekliğe çıkar. Karşı eğimi giderek yatırırsan top o yüksekliğe ulaşmak için hep daha uzağa gitmek zorunda kalır. Eğim tamamen yatay olsaydı ve sürtünme hiç olmasaydı, top durmadan giderdi. 1644'te Descartes bu fikri daha keskin söyledi: kendi hâline bırakılan bir cisim <em>düz bir çizgide</em> hareketini sürdürür.",
    "Çarpışmalar ayrı bir bilmeceydi. 1668'de Londra'daki Kraliyet Cemiyeti, çarpışan cisimlerin kurallarını sordu. John Wallis, Christopher Wren ve Christiaan Huygens birbirinden bağımsız yanıtlar gönderdi. Yanıtların ortak paydası bugün <strong>momentum korunumu</strong> dediğimiz şeydi. Huygens bir adım daha ileri gitmişti: esnek çarpışmalarda, her cismin kütlesiyle hızının karesinin çarpımı toplanınca bu toplam da değişmiyordu. Bugünkü kinetik enerji kavramının atası budur. Newton, <em>Principia</em>'da yasalarının ardından gelen açıklamada bu üç ismi anar ve kendi sarkaç çarpışması deneylerini anlatır. Esnekliği tam olmayan toplarla bile etki ile tepki eşit çıkıyordu.",
    "<em>Principia</em>'nın yazılması bir ziyaretle başladı. 1684'te Edmond Halley, Cambridge'de Newton'a uzaklığın karesiyle azalan bir çekim kuvvetinin gezegene nasıl bir yörünge çizdireceğini sordu. Abraham de Moivre'ın yıllar sonra aktardığına göre Newton hiç duraksamadan 'elips' dedi; bunu çoktan hesaplamıştı. Halley'nin ısrarıyla kısa bir hesap, üç yıl içinde koca bir kitaba dönüştü. <em>Philosophiae Naturalis Principia Mathematica</em> 1687 yazında Latince olarak basıldı. Kraliyet Cemiyeti'nin yayın bütçesi bir yıl önce bir balık kitabına harcandığı için baskı masrafını Halley kendi cebinden karşıladı. Üç hareket yasası kitabın başında, tanımların hemen ardından gelir. Newton aynı yasalarla hem düşen bir taşın hem de Ay'ın hareketini açıklar.",
    "Peki elma? Newton'un yaşlılığında, 1726'da arkadaşı William Stukeley'e, kütleçekim fikrinin gençliğinde bir bahçede otururken düşen bir elmayı görünce aklına geldiğini anlattığı kayıtlıdır. Stukeley bu sohbeti 1752'de yazdığı <em>Memoirs of Sir Isaac Newton's Life</em> (Sir Isaac Newton'un Hayatına Dair Anılar) adlı kitapta aktarır. Elmanın Newton'un kafasına düştüğü ise sonradan eklenmiş bir süsleme; bu ayrıntı Newton'un kendi anlatımında yok. Hikâye doğru olsa bile hareket yasalarıyla değil, kütleçekimle ilgilidir. Üç yasa bir anlık ilhamdan değil, Galileo'dan Huygens'e uzanan yarım yüzyıllık bir birikimin Newton'un elinde tek bir dizgeye dönüşmesinden doğdu.",
  ],
  core: [
    {
      heading: "Birinci yasa: hareketi sürdürmek bedavadır",
      body: "Net kuvvet sıfırsa hız vektörü değişmez: duran durmaya devam eder, giden aynı hızla ve aynı doğrultuda gider. Buna <strong>eylemsizlik</strong> denir. Günlük hayatta kayan her şey eninde sonunda durur, çünkü sürtünme ve hava direnci hiç eksik olmaz. Yani hareket kendiliğinden sönmez; onu söndüren de bir kuvvettir. Laboratuvarın ilk sekmesi bunu iki yüzeyle gösterir. Tahta zeminde kuvveti kestiğinde blok hemen durmaz; kinetik sürtünme onu −μ<sub>k</sub>·g ivmesiyle frenler. Yüzeyi <em>Hava rayı (ideal)</em> yaptığında fren de kalkar: net kuvvet 0,00 N olur, hız–zaman çizgisi yatay uzanır ve zemindeki cetvel akmayı sürdürür.",
      formula: "ΣF = 0 ⇔ v = sabit",
      formulaNote:
        "'Sabit hız' sıfır hızı da kapsar: durgun kalmak ile düzgün doğrusal hareket etmek aynı yasanın iki hâlidir.",
    },
    {
      heading: "İkinci yasa: kuvvet, değişimin hızıdır",
      body: "Net kuvvet bir cismin <strong>momentumunu</strong> (kütle × hız) değiştirir. Kuvvet ne kadar büyük ve ne kadar uzun süre etkirse değişim o kadar büyük olur; kuvvet × süre çarpımına <strong>itme</strong> (impuls) denir ve tam olarak momentum değişimine eşittir. Kütle sabitken yasa tanıdık F = m·a biçimini alır. Aynı kuvvet büyük kütleye küçük ivme verir; kütle bu yüzden bir <strong>eylemsizlik ölçüsüdür</strong>. Denklemin sol yanında tek bir kuvvet değil, cisme etkiyen bütün kuvvetlerin toplamı durur. İkinci sekmede arabayı süren yalnız asılı kütlenin ağırlığıdır, ama hızlanan şey arabayla asılı kütlenin toplamıdır: 0,4905 N'luk kuvvet 0,550 kg'ı 0,8918 m/s² ile ivmelendirir.",
      formula: "ΣF = Δp/Δt = m·a   ·   F·Δt = Δp",
      formulaNote:
        "p = m·v. Kuvvetin birimi newton: 1 N = 1 kg·m/s². Hava yastığı Δt'yi uzatarak aynı Δp için gereken kuvveti küçültür.",
    },
    {
      heading: "Üçüncü yasa: kuvvet tek başına gezmez",
      body: "Kuvvet her zaman iki cisim arasındaki bir etkileşimdir. A, B'yi iterse B de aynı anda A'yı aynı büyüklükte ve zıt yönde iter. Newton'un kendi örneği: parmağınla bir taşa bastırırsan taş da parmağına bastırır. Bu iki kuvvet <em>farklı cisimlere</em> etki eder; bu yüzden birbirini götürmez. Roket egzoz gazını geriye iter, gaz da roketi ileri iter; itecek havaya gerek yoktur. Eşit ve zıt kuvvetler aynı süre etkidiği için itmeler de eşit ve zıttır: birinin kazandığı momentumu öteki kaybeder, dışarıdan net kuvvet yoksa toplam hiç değişmez. Üçüncü sekmenin yay deneyinde iki kuvvet eğrisi zaman ekseninin iki yanında birbirinin ayna görüntüsüdür ve p₁ + p₂ çizgisi sıfırdan ayrılmaz.",
      formula: "F<sub>A→B</sub> = −F<sub>B→A</sub>   ⇒   m₁·v₁ + m₂·v₂ = sabit",
      formulaNote:
        "Kuvvetler eşit, ivmeler değil: a = F/m olduğundan |a₁|/|a₂| = m₂/m₁. Korunum, sisteme dışarıdan net kuvvet etkimediği sürece geçerlidir.",
    },
    {
      heading: "Sürtünme bir sayı değil, bir yanıttır",
      body: "Sürtünmenin iki ayrı hâli vardır. Cisim dururken <strong>statik sürtünme</strong> sabit bir değer taşımaz: uygulanan kuvvet neyse ona eşit olur ve net kuvveti sıfırda tutar. μ<sub>s</sub>·N yalnız bu yanıtın tavanıdır. Tavan aşılınca cisim kopar ve <strong>kinetik sürtünme</strong> devreye girer; büyüklüğü itmeden bağımsızdır, μ<sub>k</sub>·N kadardır. μ<sub>k</sub> &lt; μ<sub>s</sub> ise blok koptuğu anda sıfırdan büyük bir ivmeyle fırlar. İki sonuçta kütle denklemden düşer. Kuvvet kesilince durma yolu v₀²/(2·μ<sub>k</sub>·g) olur. Eğik düzlemde blok tan θ = μ<sub>s</sub> açısında kopar: üçüncü sekmenin (c) deneyinde <em>Yavaşça eğ</em>, μ<sub>s</sub> = 0,50 için “26,5° tuttu, 26,6° kaydırdı” yazar; kuram 26,57°'dir. Bu <strong>Coulomb modeli</strong> bir yaklaşımdır: katsayılar deneyle bulunur ve gerçek yüzeylerde koşula göre değişir.",
      formula: "f<sub>s</sub> ≤ μ<sub>s</sub>·N   ·   f<sub>k</sub> = μ<sub>k</sub>·N   ·   tan θ<sub>c</sub> = μ<sub>s</sub>",
      formulaNote:
        "N normal kuvvettir: yatay zeminde m·g, eğimde m·g·cos θ. İlk bağıntı bir eşitsizliktir; eşitlik yalnız kopmanın eşiğinde geçerlidir.",
    },
    {
      heading: "Her cisme kendi denklemi: Atwood'un makinesi",
      body: "Birden çok cisim varsa yöntem hep aynıdır: her cismi ayrı çiz, yalnız ona etkiyen kuvvetleri yaz, her biri için ΣF = m·a kur, sonra cisimleri bağlayan koşulu ekle. George Atwood 1784'te sabit ivmeli hareketin yasalarını sınamak için bir makaradan sarkan iki kütle kullandı; kütleler birbirine yakınsa ivme g'nin küçük bir kesri olur. Sayfanın yarı-Atwood düzeneğinde ip esnemediği için arabanın ve asılı kütlenin ivmesi aynıdır. Araba için M·a = T₁ − μ·M·g, asılı kütle için m·a = m·g − T₂ yazılır. Makara dolu bir diskse dönebilmesi için iki yandaki gerilim farklı olmalıdır: (T₂ − T₁)·R = I·a/R ve I = ½·m<sub>p</sub>·R² olduğundan T₂ − T₁ = (m<sub>p</sub>/2)·a. Üç denklemi toplayınca gerilimler götürür ve ivme kalır. Asılı kütle hızlanarak iniyorsa T₂ = m·(g − a), m·g'den küçüktür. Model ipi kütlesiz ve esnemez, makara yatağını sürtünmesiz sayar; m ≤ μ·M ise sistem hiç kıpırdamaz.",
      formula: "a = (m − μ·M)·g / (M + m + m<sub>p</sub>/2)",
      formulaNote:
        "Makaranın yarıçapı sonuca girmez: dolu disk, ipin gözünde m<sub>p</sub>/2 kadar ek kütledir. μ = 0 ve m<sub>p</sub> = 0 için a = m·g/(M + m) kalır.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmeli bir laboratuvardır ve her kartta simülasyondan <strong>ölçülen</strong> değer, <strong>kuram</strong> değeri ve aradaki fark yan yana durur. <strong>01 · Birinci yasa ve sürtünme</strong>: yatay yüzeyde bir blok; <em>Uygulanan kuvvet F</em>, <em>Kütle m</em>, <em>Yüzey çifti</em> menüsü, iki sürtünme katsayısı, <em>Kuvveti kes</em> ve <em>Kuvveti yavaşça artır</em> düğmeleri, bir de kuvveti seçtiğin hızda kesen <em>Kuvveti kendiliğinden kes</em> menüsü. <strong>02 · İkinci yasa: Atwood</strong>: asılı kütlenin çektiği araba (yarı-Atwood) ya da makaradan sarkan iki kütle; <em>Bırak</em> tek ölçüm yapar, <em>Veri serisi al</em> altı bırakmadan bir a–F doğrusu çıkarır. <strong>03 · Üçüncü yasa ve sistemler</strong>: <em>Deney</em> menüsünde (a) yayla ayrılan iki araba, (b) birbirine dayalı iki blok, (c) eğik düzlemde blok. Sayılar ondalık virgülle yazılır, g = 9,81 m/s² sabittir; <kbd>Boşluk</kbd> duraklatır ya da deneyi başlatır, <kbd>R</kbd> etkin sekmeyi sıfırlar. Modelin sınırlarını bilerek çalış: cisimler noktasaldır, hava direnci yoktur, sürtünme katsayıları hızdan bağımsızdır ve statikten kinetiğe geçiş anidir. Sabit kuvvetli deneylerde fark bu yüzden 0,00 % çıkar; sıfırdan farklı bir fark gördüğünde nedeni fizikseldir (makara, ray sürtünmesi) ya da ölçümün çözünürlüğü ve gürültüsüdür. Eşik ölçümleri tek sayı değil, “tuttu / kaydırdı” aralığı olarak yazılır.",
    experiments: [
      {
        title: "Sürtünme şu anda kaç newton?",
        predict:
          "İlk sekme varsayılan hâlinde: tahta üstünde 2,0 kg'lık blok, F = 6,0 N, μ_s = 0,50. Sürtünme kuvveti kartı 9,81 N mı yazar? Kuvveti 9,8 N'a, sonra 10,0 N'a çıkarınca sürtünme büyür mü, küçülür mü?",
        do: "Kartlara bak. <em>Uygulanan kuvvet F</em> kaydırıcısını 9,8 N'a getir (ok tuşları 0,1 N'luk adım atar), ardından 10,0 N yap. Sonra <em>Bloğu sıfırla</em> ve <em>Kuvveti yavaşça artır</em> düğmesine bas; blok kopana dek yaklaşık 5 saniye bekle. Son olarak <em>Kütle m</em> değerini 4,0 kg yapıp artırmayı yinele.",
        observe:
          "F = 6,0 N'da kart “6,00 N · statik, F ile eşit”, net kuvvet “0,00 N”, statik sınır “9,81 N” yazar. 9,8 N'da sürtünme 9,80 N olur, blok yerindedir. 10,0 N'da blok kopar: “5,89 N · kinetik, μ_k·N”, net kuvvet “4,11 N”, kuram ivmesi “2,057 m/s²”, ölçülen ivme aynı ve fark “0,00 %”. Yavaş artırma “9,8 N tuttu, 9,9 N kaydırdı · kuram 9,81 N” ölçer. 4,0 kg ile sonuç “19,6 N tuttu, 19,7 N kaydırdı · kuram 19,62 N” olur.",
        explain:
          "Blok dururken ivme sıfırdır, öyleyse net kuvvet de sıfır olmalıdır: statik sürtünme tam itme kadardır. μ<sub>s</sub>·N = 9,81 N bir değer değil, tavandır. Tavan aşılınca sürtünme μ<sub>k</sub>·N = 0,3 × 19,62 N = 5,89 N'a düşer; kuvvet–zaman grafiğindeki ani basamak budur. Ölçüm 0,1 N'luk adımlarla yapıldığı için eşik bir aralık olarak verilir. Kütle iki katına çıkınca N, dolayısıyla tavan da iki katına çıkar.",
      },
      {
        title: "Kuvveti kesince bloğu ne durdurur?",
        predict:
          "Blok 4,00 m/s ile kayarken itmeyi bırakırsan hemen durur mu, durmazsa kaç metre gider? Kütleyi iki katına çıkarırsan bu yol uzar mı, kısalır mı? Aynı deneyi sürtünmesiz hava rayında yaparsan ne olur?",
        do: "İlk sekmede <em>Bloğu sıfırla</em>; <em>Kuvveti kendiliğinden kes</em> menüsünde <em>Hız 4,00 m/s olunca</em> seç ve F'yi 10,0 N yap. Blok yaklaşık 2 saniyede 4,00 m/s'ye ulaşır, kuvvet o anda kendiliğinden kesilir. Blok durunca <em>Durma yolu</em> ve <em>İş toplamı</em> kartlarını oku. <em>Kütle m</em> değerini 4,0 kg yap, F'yi 20,0 N'a çıkar ve yeniden izle. Son olarak <em>Yüzey çifti</em> menüsünden <em>Hava rayı (ideal)</em> seç ve F'yi 5,0 N yap.",
        observe:
          "Tahtada kuvvet kesilince net kuvvet “−5,89 N”, kuram ivmesi “−2,943 m/s²” olur; hız–zaman çizgisi düzgün eğimle iner. Durma yolu kartı “2,718 m · 2,718 m · fark 0,00 %” yazar, iş toplamı “38,89 J + (−38,89 J) = 0,00 J” olur. 4,0 kg'lık blokta sürtünme iki katına çıkar, ama durma yolu yine “2,718 m”dir. Hava rayında blok “1,250 m/s²” ile hızlanır; kuvvet 4,00 m/s'de kesilince net kuvvet “0,00 N” olur, hız 4,00 m/s'de kalır ve kart “tanımsız · μ_k = 0, blok durmaz” der.",
        explain:
          "Bloğu durduran, kesilen kuvvetin yokluğu değil, sürtünmenin varlığıdır. Tek yatay kuvvet μ<sub>k</sub>·m·g olunca ivme −μ<sub>k</sub>·g'dir; kütle sadeleşir ve v² = v₀² − 2·μ<sub>k</sub>·g·x bağıntısından durma yolu v₀²/(2·μ<sub>k</sub>·g) = (4,00 m/s)²/(2 × 0,30 × 9,81 m/s²) = 2,718 m çıkar. İş diliyle: itmenin verdiği enerjiyi sürtünme kuruşu kuruşuna geri alır, kinetik enerji sıfıra iner. Sürtünme yoksa geri alan da yoktur; hız sonsuza dek aynı kalır.",
      },
      {
        title: "İp arabayı m·g ile mi çeker?",
        predict:
          "İkinci sekmede 0,050 kg'lık asılı kütle 0,50 kg'lık arabayı çekiyor. İpteki gerilim m·g = 0,4905 N mudur? a–F doğrusunun eğiminin tersi hangi kütleyi verir; makara 0,100 kg olursa ne değişir?",
        do: "<em>Bırak</em> düğmesine bas ve kartları oku; ardından <em>Veri serisi al</em>. Sonra <em>Makara kütlesi m_p (dolu disk)</em> değerini 0,100 kg yapıp ikisini yinele. Makarayı sıfıra döndür, <em>Ray sürtünme katsayısı μ</em> = 0,020 ile seriyi yeniden al. Son olarak μ = 0 iken <em>Zamanlama gürültüsü</em> menüsünde 2 ms seç ve <em>Gürültü tohumu</em> 1, 2, 3 için seriyi karşılaştır.",
        observe:
          "Kapı süresi “1,3394 s”, ölçülen ivme “0,8918 m/s²”, gerilim “ölçülen 0,4459 N · kuram 0,4459 N”; yaygın yanlış kartı “0,4905 N · gerçek T bundan 0,0446 N küçük” der. Seride eğimden kütle “0,5500 kg”, fark “0,00 %”. Makara 0,100 kg iken ivme “0,8175 m/s²” (basit kurama göre “−8,33 %”), gerilimler 0,4496 N ve 0,4088 N, eğimden kütle “0,6000 kg”, fark “+9,09 %”. μ = 0,020 ile “0,5392 kg” ve kesim “−0,1962 m/s²”. Gürültüde tohum 1, 2, 3: 0,5481, 0,5513 ve 0,5517 kg.",
        explain:
          "Gerilim m·g olsaydı asılı kütleye net kuvvet sıfır olur, kütle ivmelenemezdi; T = m·(g − a). Eğimin tersi ivmelenen her şeyi tartar: dolu disk makara m<sub>p</sub>/2 = 0,050 kg ekler ve 0,050/0,550 = %9,09'luk sistematik fark doğar. Ray sürtünmesi doğruyu aşağı kaydırır, eğimi de (1 + μ) katına çıkarır. Gürültü ise rastgeledir: tohumdan tohuma yön değiştirir, tek seri belirsizliği göstermez.",
      },
      {
        title: "Eşit kuvvet, eşit olmayan sonuç",
        predict:
          "Üçüncü sekmede yay 0,50 kg ve 1,00 kg'lık arabaları ayırıyor: hangisi daha büyük kuvvet görür, hangisi daha hızlı gider? (b) deneyinde 12 N ile itilen 1 kg'lık blok, önündeki 3 kg'lık bloğa kaç newton aktarır; soldan ya da sağdan itmek fark eder mi?",
        do: "(a) deneyinde <em>Yayı bırak</em>; kuvvet kartlarını ve iki grafiği izle. Sonra <em>Deney</em> menüsünden <em>(b) Birbirine dayalı iki blok</em> seç ve <em>İtmeye başla</em>. <em>Kuvvet nereden uygulanıyor?</em> menüsünü <em>Sağdan</em> yapıp yinele. Yeniden <em>Soldan</em> seç, <em>Sürtünme katsayısı μ</em> değerini 0,20 yap ve bir kez daha it.",
        observe:
          "Yay kuvvetleri her an eşit ve zıttır (başta “−4,000 N” ve “+4,000 N”), ivme oranı “2,0000 · 2,0000”. Ayrılma hızları “−0,6532 · +0,3266 m/s”, süre “128,25 ms”, toplam momentum “0,0000 kg·m/s”; durum satırındaki itmeler −0,3266 ve +0,3266 N·s. (b)'de temas kuvveti “9,000 N”, ivme “3,0000 m/s²”; sağdan itince C “3,000 N”. μ = 0,20 ile ivme “1,0380 m/s²”ye iner, C yine 9,000 N'dur.",
        explain:
          "Yay iki arabayı aynı kuvvetle iter; a = F/m olduğundan hafif araba iki kat ivmelenir, iki kat hızla ayrılır ve 0,1600 J'lük yay enerjisinin üçte ikisini alır. Eşit ve zıt itmeler toplam momentumu sıfırda tutar. Dayalı bloklarda temas kuvveti yalnız öndeki bloğu ivmelendirmeye yeter: C = F·m<sub>ö</sub>/(m₁ + m₂). Öndeki blok 3 kg ise 9 N, 1 kg ise 3 N. Sürtünme her bloğa kütlesiyle orantılı etkidiği için ivmeyi düşürür ama paylaşımı değiştirmez.",
      },
    ],
  },
  wow: [
    {
      title: "Principia'da F = m·a yazmaz",
      body: "Newton'un ikinci yasası Latince aslında şunu söyler: 'Hareketin değişimi, uygulanan hareket ettirici kuvvetle orantılıdır ve o kuvvetin etkidiği doğru boyunca olur.' Newton 'hareket niceliği'ni kütle ile hızın çarpımı, yani bugünkü momentum olarak tanımlamıştı. Kitap neredeyse tamamen geometrik oranlarla yazılmıştır; bugünkü anlamda denklem çok azdır. F = m·a biçimi kitabın hiçbir baskısında geçmez; yasa bu kılıkta Jakob Hermann'ın 1716 tarihli <em>Phoronomia</em>'sında ve 1740'larda Leonhard Euler'in yazılarında görülür. Newton yasayı hem sürekli etkiyen kuvvetlere hem de bir çarpmanın verdiği ani darbeye uygular.",
    },
    {
      title: "49 yıl sonra gelen özür",
      body: "13 Ocak 1920'de The New York Times bir başyazıda roket öncüsü Robert Goddard'la alay etti: boşlukta itecek hava yoktu, roket orada çalışamazdı. Üçüncü yasa tersini söylüyordu; roket egzozu iter, egzoz da roketi iter. Gazete, Apollo 11 Ay'a doğru yola çıktıktan bir gün sonra, 17 Temmuz 1969'da bir düzeltme yayımladı: roketin boşlukta da çalıştığı artık kesinleşmişti, gazete hatası için üzgündü. Goddard 1945'te ölmüştü.",
    },
    {
      title: "Motoru susmuş, yolu bitmemiş sonda",
      body: "Voyager 1 Eylül 1977'de fırlatıldı. Hızını, fırlatma günü ateşlenip ayrılan roket kademelerinden ve Jüpiter (1979) ile Satürn (1980) yakın geçişlerindeki <strong>kütleçekim yardımından</strong> aldı: gezegenin yanından geçerken onun çekimiyle hızlandı. Satürn'den sonra onu hızlandıran bir motor çalışmadı; küçük iticiler esas olarak antenini Dünya'ya dönük tutuyor. Yine de onlarca yıldır Güneş'e göre saniyede yaklaşık 17 km hızla, insan yapımı en uzak nesne olarak yol alıyor. Onu yavaşlatan neredeyse tek etki, uzaklaştıkça zayıflayan Güneş çekimi. Birinci yasa Güneş Sistemi ölçeğinde de iş başında.",
    },
  ],
  worked: {
    title: "Makarası dönen yarı-Atwood",
    prompt:
      "Sürtünmesiz rayda M = 0,50 kg'lık araba, kütlesiz bir iple m = 0,050 kg'lık asılı kütleye bağlı. İp, m<sub>p</sub> = 0,100 kg'lık dolu disk biçimli bir makaradan kaymadan geçiyor. Sistem durgun bırakılıyor; ışık kapısı d = 0,80 m ötede, g = 9,81 m/s². İvmeyi, ipin iki yanındaki gerilimi ve kapı süresini bul. Makarayı yok sayan biri ne kadar yanılır? Sayfada: ikinci sekme, makara kütlesi 0,100 kg, <em>Bırak</em>.",
    steps: [
      "Her cisme kendi denklemi. Araba (yatay): M·a = T₁. Asılı kütle (aşağı artı): m·a = m·g − T₂. Makara: net tork (T₂ − T₁)·R, açısal ivme a/R ve I = ½·m<sub>p</sub>·R² olduğundan (T₂ − T₁)·R = ½·m<sub>p</sub>·R²·(a/R), yani T₂ − T₁ = (m<sub>p</sub>/2)·a. Yarıçap sadeleşti.",
      "Üç denklemi topla: m·g = (M + m + m<sub>p</sub>/2)·a. Süren kuvvet m·g = 0,050 kg × 9,81 m/s² = 0,4905 N; ivmelenen etkin kütle 0,50 + 0,050 + 0,050 = 0,600 kg. a = 0,4905 N / 0,600 kg = 0,8175 m/s².",
      "Gerilimler: T₂ = m·(g − a) = 0,050 kg × (9,81 − 0,8175) m/s² = 0,4496 N; T₁ = M·a = 0,50 kg × 0,8175 m/s² = 0,4088 N. Fark 0,0409 N = (m<sub>p</sub>/2)·a: makarayı döndüren tam budur. İkisi de m·g = 0,4905 N'dan küçüktür.",
      "Kapı süresi: durgun hâlden d = ½·a·t², t = √(2d/a) = √(1,60 m / 0,8175 m/s²) = 1,3990 s; o andaki hız v = a·t = 1,1437 m/s. Enerji denetimi: m·g·d = 0,3924 J ve ½·(0,600 kg)·v² = 0,3924 J; makaranın dönme enerjisi etkin kütlenin içindedir.",
      "Makarayı yok sayan a = m·g/(M + m) = 0,4905 N / 0,550 kg = 0,8918 m/s² bekler; gerçek ivme bundan %8,33 küçüktür. Tersine, ölçülen a–F doğrusunun eğiminden kütle hesaplayan biri 0,550 kg yerine 0,600 kg bulur: 0,050/0,550 = %9,09 fazla.",
    ],
    result:
      "a = 0,8175 m/s²; T₂ = 0,4496 N (asılı kütle tarafı), T₁ = 0,4088 N (araba tarafı); t = 1,3990 s. Sayfa aynı sayıları verir: tam kuram “0,8175 m/s²”, basit kurama göre fark “−8,33 %”, veri serisinde eğimden kütle “0,6000 kg” ve fark “+9,09 %”. Tek bir ipin iki ucunda iki ayrı gerilim olması bir çelişki değildir; dönen makaranın da bir eylemsizliği vardır ve onu ivmelendirmek için net tork gerekir.",
  },
  misconceptions: [
    {
      myth: "Bir cismin hareket etmeye devam etmesi için ona sürekli kuvvet uygulanmalıdır.",
      truth:
        "Kuvvet hareketi sürdürmek için değil, değiştirmek için gerekir. Bisiklette pedalı bırakınca yavaşlarsın, çünkü sürtünme ve hava direnci seni frenler. İlk sekmede hava rayındaki blok kuvvet kesildikten sonra aynı hızla gitmeyi sürdürür; tahtadaki bloğu durduran da kinetik sürtünmedir.",
    },
    {
      myth: "Statik sürtünme kuvveti her zaman μ_s·N'ye eşittir.",
      truth:
        "μ<sub>s</sub>·N yalnız üst sınırdır. Duran bir cisimde statik sürtünme, öteki kuvvetleri dengelemek için gereken kadardır: 2 kg'lık tahta blokta 6 N'luk itmeye 6,00 N, 9,8 N'luk itmeye 9,80 N. Hiç itmezsen sürtünme de sıfırdır; sürtünme kendiliğinden itmez, yalnız karşı koyar.",
    },
    {
      myth: "Bir ipe asılı kütle, ipi her zaman kendi ağırlığı kadar gerer: T = m·g.",
      truth:
        "Bu yalnız kütle duruyorsa ya da sabit hızla gidiyorsa doğrudur. Kütle aşağı doğru ivmeleniyorsa üzerindeki net kuvvet sıfır olamaz: T = m·(g − a). İkinci sekmenin varsayılan düzeneğinde m·g = 0,4905 N iken gerilim 0,4459 N'dur. Serbest düşmede (a = g) ip tümüyle gevşer.",
    },
    {
      myth: "Etki ve tepki eşit ve zıtsa birbirini götürür; o hâlde hiçbir şey hareket edemez.",
      truth:
        "Etki–tepki çiftindeki kuvvetler farklı cisimlere etki eder; bir cismin ivmesini yalnız o cisme etkiyen kuvvetler belirler. At–araba çıkmazının çözümü budur: arabanın defterinde atın çekişi ile yerin sürtünmesi, atın defterinde yerin toynağı ileri itmesi ile arabanın geri çekişi yazar. Kuvvetlerin eşitliği sonuçların eşitliği de değildir: aynı yay kuvveti hafif arabaya iki kat ivme verir.",
    },
  ],
  glossary: [
    {
      term: "Eylemsizlik",
      definition:
        "Bir cismin, net kuvvet etki etmedikçe hız vektörünü (büyüklüğünü ve yönünü) koruması.",
    },
    {
      term: "Net kuvvet (ΣF)",
      definition:
        "Bir cisme etki eden bütün kuvvetlerin vektörel toplamı; ivmeyi tek başına bu belirler.",
    },
    {
      term: "Newton (N)",
      definition:
        "Kuvvet birimi, 1 N = 1 kg·m/s²; yaklaşık 102 gramlık bir kütlenin Dünya'daki ağırlığıdır.",
    },
    {
      term: "Serbest cisim diyagramı",
      definition:
        "Tek bir cismi çevresinden ayırıp yalnız ona etkiyen kuvvetleri oklarla gösteren çizim.",
    },
    {
      term: "Normal kuvvet (N)",
      definition:
        "Bir yüzeyin, üzerindeki cisme yüzeye dik doğrultuda uyguladığı temas kuvveti; yatay zeminde m·g, θ açılı eğimde m·g·cos θ.",
    },
    {
      term: "Statik sürtünme",
      definition:
        "Birbirine göre kaymayan iki yüzey arasındaki sürtünme; kaymayı önlemek için gereken kadardır ve en çok μ_s·N olabilir.",
    },
    {
      term: "Kinetik sürtünme",
      definition:
        "Birbirine göre kayan iki yüzey arasındaki sürtünme; Coulomb modelinde büyüklüğü μ_k·N, yönü kaymaya zıttır.",
    },
    {
      term: "İtme (impuls)",
      definition:
        "Kuvvet ile etki süresinin çarpımı, F·Δt; bir cismin momentum (p = m·v) değişimine eşittir, birimi N·s = kg·m/s.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede F = m·a bir formüldür; üniversitede bir <strong>diferansiyel denklemdir</strong>: m·d²x/dt² = F(x, v, t). Kuvveti, başlangıç konumunu ve hızı bilirsen hareketin geleceği belirlenir. Bu denklem çoğu zaman kâğıt üzerinde çözülemez; bilgisayar onu, bu sayfanın yaptığı gibi küçük zaman adımlarıyla ilerleterek çözer. Adım seçimi, durma ya da ayrılma gibi olayların anını adımın içinde yakalamak ve hata birikimi, <em>hesaplamalı fizik</em> ile oyun motorlarının ortak dertleridir. Fizik I'in dönme konularında makara artık 'ek kütle' değil, eylemsizlik momenti olan bir <strong>katı cisimdir</strong>; ipin esnememesi gibi koşullar <strong>kısıt</strong> adını alır. Analitik Mekanik dersinde aynı fizik <strong>Lagrange</strong> ve <strong>Hamilton</strong> biçimleriyle yeniden yazılır: kuvvetler yerine enerjiler konuşur, gerilim gibi kısıt kuvvetleri denklemlerden kendiliğinden düşer ve korunum yasaları simetrilerden türetilir. Noether teoremine göre momentum korunumu, fizik yasalarının uzayın her yerinde aynı olmasının sonucudur.",
      "Newton yasalarının bir de sınırı vardır. Yasalar yalnızca <strong>eylemsiz referans çerçevelerinde</strong> bu sade hâlleriyle geçerlidir. Dönen bir atlıkarıncada 'hayalî' kuvvetler eklemek gerekir. Işık hızına yaklaşan cisimlerde özel görelilik, atom ölçeğinde kuantum mekaniği devreye girer. Yine de bu kuramlar momentum korunumunu korur ve düşük hızlarda Newton'a geri döner. Köprü, uzay aracı ve çarpışma testi hesaplarında hâlâ Newton kullanılır. Sürtünme ise kendi başına bir araştırma alanıdır: Coulomb modelinin iki katsayısı, yüzeylerin mikroskobik temasını özetleyen deneysel sayılardır ve bu alana <em>triboloji</em> denir.",
    ],
    topics: [
      "Diferansiyel denklemler",
      "Sayısal integrasyon",
      "Katı cisim dönmesi ve eylemsizlik momenti",
      "Kısıtlı sistemler",
      "Lagrange ve Hamilton mekaniği",
      "Noether teoremi",
      "Eylemsiz olmayan çerçeveler",
    ],
  },
  quiz: [
    {
      question:
        "Tahta zeminde kayan bir bloğun kuvveti, hızı v₀ iken kesiliyor ve blok x kadar yol alıp duruyor. Aynı zeminde kütlesi iki kat olan bir bloğun kuvveti, hızı 2·v₀ iken kesilirse durma yolu ne olur?",
      options: ["x; kütle ile hızın etkisi birbirini götürür", "2x", "4x", "8x"],
      answer: 2,
      explanation:
        "Kuvvet kesilince tek yatay kuvvet μ_k·m·g, ivme −μ_k·g'dir: kütle sadeleşir. Durma yolu v₀²/(2·μ_k·g) olduğundan yalnız hızın karesiyle büyür; hız iki katsa yol dört kat. Ağır blok daha büyük sürtünme görür ama aynı oranda daha fazla eylemsizliği vardır. İlk sekmede <em>Kuvveti kendiliğinden kes</em> menüsüyle sına: tahtada 2,00 m/s'de kesilen blok 0,680 m, 4,00 m/s'de kesilen blok 2,718 m kayar; kütleyi değiştirmek bu sayıları oynatmaz.",
    },
    {
      question:
        "Sürtünmesiz, makarası kütlesiz bir yarı-Atwood'da araba kütlesi M sabit tutulup asılı kütle m sınırsızca büyütülüyor. İpteki gerilim hangi değere yaklaşır?",
      options: ["m·g; asılı kütle ne kadar ağırsa ip o kadar gerilir", "M·g", "Sıfır; sistem serbest düşer", "(M + m)·g"],
      answer: 1,
      explanation:
        "a = m·g/(M + m) ve T = M·a = M·m·g/(M + m). m büyüdükçe a → g olur, yani asılı kütle neredeyse serbest düşer; ip ise arabayı g ile ivmelendirmeye yetecek kadar gerilir: T → M·g. Sayfanın uç değerleriyle dene: M = 0,20 kg, m = 0,300 kg için a = 5,8860 m/s² ve T = 1,1772 N; bu, m·g = 2,9430 N'dan çok küçük, M·g = 1,962 N'a doğru yoldadır.",
    },
    {
      question:
        "Yan yana duran 1 kg ve 3 kg'lık iki blok sürtünmesiz zeminde soldan 12 N ile itiliyor; aralarındaki temas kuvveti 9 N. Zemin iki blok için de μ = 0,20 olacak biçimde sürtünmeli yapılırsa ne değişir?",
      options: [
        "Temas kuvveti de ivme de aynı oranda küçülür",
        "Temas kuvveti büyür, çünkü öndeki bloğu itmek zorlaşır",
        "Hiçbir şey değişmez; sürtünme iç kuvvettir",
        "İvme 3,0000'dan 1,0380 m/s²'ye iner, temas kuvveti 9 N kalır",
      ],
      answer: 3,
      explanation:
        "Sistem için a = F/(m₁ + m₂) − μ·g = 3 − 0,20 × 9,81 = 1,0380 m/s². Öndeki 3 kg'lık blok için C − μ·m·g = m·a, yani C = 3 kg × (1,0380 + 1,962) m/s² = 9,000 N. Sürtünme her bloğa kütlesiyle orantılı etkidiğinden F'nin paylaşımı bozulmaz: C = F·m_ö/(m₁ + m₂). Üçüncü sekmenin (b) deneyinde dene; 12 N, toplam 7,85 N'luk sürtünme tavanını aştığı için bloklar kayar.",
    },
  ],
  next: [
    {
      href: "momentum-itme-ve-carpismalar.html",
      title: "Momentum, İtme ve Çarpışmalar",
      why: "Yay deneyindeki eşit ve zıt itmelerin devamı: <strong>Çarpışma türü</strong> menüsünde e = 1, 0,5 ve 0'ı seç; toplam momentum hep aynı kalırken kinetik enerjinin ne kadarının kaybolduğunu izle.",
    },
    {
      href: "serbest-dusme.html",
      title: "Serbest Düşme: Galileo'dan Limit Hıza",
      why: "İkinci yasa hıza bağlı bir kuvvetle: <em>Hava direnci</em> sekmesinde ağırlık ile direnç dengelenince ivmenin sıfıra indiğini ve hızın bir limit değere yaklaştığını ölç.",
    },
    {
      href: "is-enerji.html",
      title: "İş–Enerji İlkesi",
      why: "İlk sekmedeki iş toplamı kartının arkasındaki ilke: <em>Eğim açısı</em> ve <em>Sürtünme μ</em> kaydırıcılarıyla, kuvvetlerin yaptığı işin kinetik enerjiyi nasıl değiştirdiğini çubuk grafikte izle.",
    },
    {
      href: "tork-denge.html",
      title: "Tork ve Denge: Kaldıraç, Ağırlık Merkezi ve Statik",
      why: "Makarayı döndüren gerilim farkının adı torktur. <em>Merdiven</em> sekmesinde statik sürtünmenin tavanı bu kez bir merdivenin kayıp kaymayacağını belirliyor.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 5.5 Newton's Third Law",
      url: "https://openstax.org/books/university-physics-volume-1/pages/5-5-newtons-third-law",
      note: "Etki–tepki çiftleri, sistem seçimi ve çözümlü örnekler (İngilizce, açık ders kitabı); 5. bölümün tamamı üç yasayı işler.",
    },
    {
      title: "OpenStax · University Physics Vol. 1, 6.2 Friction",
      url: "https://openstax.org/books/university-physics-volume-1/pages/6-2-friction",
      note: "Statik ve kinetik sürtünme, f_s ≤ μ_s·N bağıntısı ve sayfadaki yüzey çiftlerinin yaklaşık katsayılarını veren Tablo 6.1 (İngilizce).",
    },
    {
      title: "Stanford Encyclopedia of Philosophy · Newton's Principia",
      url: "https://plato.stanford.edu/entries/newton-principia/",
      note: "Halley'nin 1684'teki sorusu, yasaların özgün ifadesi, F = m·a biçiminin Hermann ve Euler'le gelişi (İngilizce, ileri düzey).",
    },
    {
      title: "Wikipedia · Atwood machine",
      url: "https://en.wikipedia.org/wiki/Atwood_machine",
      note: "George Atwood'un 1784'te sabit ivmeli hareket yasalarını sınamak için tasarladığı düzenek ve ideal (kütlesiz makaralı) durumda ivmenin türetilişi (İngilizce).",
    },
    {
      title: "Vikipedi · Newton'un hareket yasaları",
      url: "https://tr.wikipedia.org/wiki/Newton%27un_hareket_yasalar%C4%B1",
      note: "Üç yasanın Türkçe özeti ve tarihçe.",
    },
  ],
  revision: "Kasım 2026",
};
