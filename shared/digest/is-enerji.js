window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["is-enerji"] = {
  slug: "is-enerji",
  title: "İş ve Enerji: Doğanın Muhasebe Defteri",
  field: "Fizik",
  level: "Lise",
  minutes: 25,
  tagline:
    "Rampadan kayan bir kutunun hızını, ivmeyi ve zamanı hiç hesaplamadan bulabilirsin. Tek gereken bir hesap defteri: kim ne kadar iş yaptı, enerji nereye gitti?",
  hook: "Bir kutuyu duvara dayayıp bir saat boyunca var gücünle itersen terlersin, yorulursun; ama fizikçiye göre duvara bir joule bile iş yapmamışsındır. Şimdi aynı 2 kilogramlık kutuyu 25 derecelik, 5 metrelik bir rampanın tepesinden bırak: yerçekimi ona sessizce 41 joule'dan fazla iş yapar. Bu iş nereye gider ve sürtünme ondan ne kadarını çalar?",
  bigIdea:
    "Bir cisme yapılan <strong>net iş</strong>, kinetik enerjisindeki değişime eşittir; sürtünmenin “kaybettirdiği” enerji yok olmaz, ısı olarak deftere yazılır.",
  story: [
    "17. yüzyılın sonunda Avrupa'nın en parlak kafaları basit görünen bir soru yüzünden kavgalıydı: hareket eden bir cismin “gücü” neyle ölçülür? Descartes'ın izinden gidenler kütle çarpı hıza (mv) bakıyordu. Leibniz ise 1686'da asıl önemli olanın hızın karesi olduğunu savundu; mv²'ye sonradan “canlı kuvvet” anlamında <em>vis viva</em> adını verdi. Tartışmaya en çok ses getiren katkılardan biri Fransız doğa filozofu ve matematikçi <strong>Émilie du Châtelet</strong>'den geldi. 1740'ta yayımladığı <em>Institutions de physique</em> kitabında Leibniz'in tarafını tuttu ve Hollandalı Willem 's Gravesande'ın 1722'deki deneyini bunun kanıtı olarak öne çıkardı: farklı yüksekliklerden yumuşak bir kil tabakasına ağır toplar bırakılıyordu. Topun kilde yerinden ettiği malzeme hızla değil, hızın karesiyle büyüyordu; kütleleri farklı iki top, mv² değerleri aynıysa aynı büyüklükte iz bırakıyordu. Du Châtelet, Newton'un <em>Principia</em>'sını da Fransızcaya çevirdi; çevirinin tam baskısı ölümünden on yıl sonra, 1759'da çıktı.",
    "Bugünkü ½mv² ifadesi ve fizikteki anlamıyla “iş” kelimesi mühendislerden geldi. 1820'ler ve 1830'larda Fransız mühendisler Gaspard-Gustave Coriolis ve Jean-Victor Poncelet, makineleri karşılaştırmak için kuvvet ile yolun çarpımını ölçü aldılar ve buna <em>travail</em> (iş) dediler. Canlı kuvvetin önüne ½ çarpanını koyan Coriolis oldu: 1829'daki kitabında iş ile ½mv² arasındaki eşitliği mühendisliğin günlük aracına çevirdi. Ama büyük bir boşluk kalmıştı: sürtünmeli her harekette ½mv² azalıyordu. O enerji nereye gidiyordu? Kont Rumford 1798'de yayımladığı raporda, Münih'te top namlusu delinirken açığa çıkan ısının suyu yaklaşık iki buçuk saatte kaynatabildiğini ve sürtünme sürdükçe ısının tükenmediğini anlatmıştı. Yine de “ısı, kalorik denen ayrı bir akışkandır” görüşü yaygındı.",
    "Soruyu ölçümle kapatan kişi, Manchester yakınlarında aile bira fabrikasını işleten <strong>James Prescott Joule</strong> oldu. 1843'te Cork'taki ilk sunumu sessizlikle karşılandı; Royal Society 1844'te okuduğu makaleyi basmayı reddetti. Joule vazgeçmedi. 1845'te ünlü <strong>çarklı deneyini</strong> anlattı: düşen ağırlıklar bir ipi çözerek yalıtılmış bir su kabındaki kanatlı çarkı döndürüyor, çalkalanan su çok az ısınıyordu. Joule, Fahrenheit derecesinin 1/200'ünü (yaklaşık 0.003 °C) okuyabildiğini söylüyordu. 1850'de yayımladığı değere göre bir kalorilik ısı yaklaşık 4.16 joule'luk mekanik işe eşittir; bu, bugün kabul edilen değerin (yaklaşık 4.19) yüzde birinden daha az altındadır.",
    "Aynı yıllarda Alman hekim Julius Robert Mayer da 1842'de iş ile ısının eşdeğer olduğunu yayımladı. Kendi anlatımına göre fikir, 1840'ta Java'ya giden bir Hollanda gemisinde doktorken, tropiklerde denizcilerden aldığı toplardamar kanının beklenenden çok daha parlak kırmızı olmasıyla başlamıştı. 1847'de Hermann von Helmholtz enerjinin korunumunu genel bir ilke olarak ortaya koydu ve sonunda hem Joule'un hem Mayer'in payını kabul etti. Aynı yıl, balayındaki Joule ile genç William Thomson'ın (sonraki Lord Kelvin) Alplerde bir şelalenin tepesi ile dibi arasındaki sıcaklık farkını ölçmeye niyetlendiği anlatılır; ölçüm uygulanamaz çıktı. Sayfadaki pembe “Isı” çubuğu, işte bu bir buçuk asırlık tartışmanın cevabıdır.",
  ],
  core: [
    {
      heading: "İş: kuvvetin yol boyunca bıraktığı iz",
      body: "Gündelik dilde yorulduğun her şey iştir; fizikte değil. <strong>İş</strong>, bir kuvvetin cismi kendi doğrultusunda ne kadar ilerlettiğinin ölçüsüdür ve yalnızca kuvvetin harekete paralel bileşeni sayılır. Harekete dik kuvvet (rampanın kutuyu taşıyan <em>normal kuvveti</em> gibi) hiç iş yapmaz; harekete ters kuvvet (sürtünme) negatif iş yapar. Birimi <strong>joule</strong>'dur: 1 J, 1 newtonluk kuvvetin 1 metre boyunca yaptığı iştir; yaklaşık 100 gramlık bir elmayı bir metre kaldırmak kadar.",
      formula: "W = F·d·cos φ",
      formulaNote:
        "φ kuvvet ile yer değiştirme arasındaki açıdır; rampanın eğim açısı θ ile karıştırma. φ = 90° ise cos φ = 0 ve iş sıfırdır; φ = 180° ise iş negatiftir.",
    },
    {
      heading: "İş–enerji teoremi",
      body: "Sabit bir net kuvvet için ikinci yasa (F = ma) ile v² = v₀² + 2ad birleştirilince sonuç kendiliğinden çıkar: F·d = ma·d = ½mv² − ½mv₀². Net kuvvetin yaptığı iş, ½mv² niceliğinin değişimine eşittir; bu niceliğe <strong>kinetik enerji</strong> denir. Teoremin gücü şuradadır: ivmeyi ve süreyi bilmeden, yalnızca başlangıç ve bitiş durumlarından hız bulursun. Sayfadaki turuncu W_net çubuğu ile yeşil KE çubuğunun koşu boyunca neredeyse aynı boyda kalması bu eşitliğin görüntüsüdür; aradaki en fazla 1 joule'luk fark sayfanın adım adım hesabından gelir.",
      formula: "W<sub>net</sub> = ½mv<sub>son</sub>² − ½mv<sub>ilk</sub>²",
      formulaNote:
        "Hız karesiyle girer: durgun bir cismi 2v'ye çıkarmak, v'ye çıkarmaktan dört kat iş ister. Zaten v hızıyla giden cismi 2v'ye çıkarmak için gereken ek iş ise baştaki ½mv²'nin üç katıdır.",
    },
    {
      heading: "Yerçekimi işi ve potansiyel enerji",
      body: "Rampa boyunca yerçekiminin işe yarayan bileşeni mg·sin θ'dır ve L metre yol boyunca etkir. Ama L·sin θ tam olarak rampanın yüksekliğidir; yani yerçekimi işi yalnızca düşülen yüksekliğe bağlıdır, yolun eğimine ya da şekline değil. İşi yoldan bağımsız olan kuvvetlere <strong>korunumlu kuvvet</strong> denir ve yalnızca onlar için bir <strong>potansiyel enerji</strong> tanımlanabilir. Sayfada mavi PE çubuğu ne kadar kısalırsa, alt satırdaki yerçekimi işi o kadar artar: ikisi aynı enerjinin iki farklı muhasebe kaydıdır.",
      formula: "W<sub>g</sub> = mg·L·sin θ = mgh",
      formulaNote:
        "Sayfada L = 5 m sabittir, bu yüzden açı büyüdükçe h₀ = 5·sin θ da büyür: 25°'de 2.11 m, 45°'de 3.54 m.",
    },
    {
      heading: "Sürtünme: işin ısıya dönüşen kısmı",
      body: "Kinetik sürtünme kuvveti f = μN'dir; eğik düzlemde N = mg·cos θ. Kuvvet hep harekete ters olduğu için işi negatiftir ve gidilen yolla büyür: aynı iki nokta arasında uzun yoldan gidersen daha çok ısı üretirsin. Bu yüzden sürtünme için potansiyel enerji tanımlanamaz. Mekanik enerji (KE + PE) tam sürtünme işi kadar azalır; ama E<sub>mek</sub> ile Isı'nın toplamı başlangıç enerjisine eşit kalır. Enerji korunur, yalnızca artık geri alınamayacak bir biçime geçer.",
      formula: "W<sub>s</sub> = −μ·mg·cos θ·L",
      formulaNote:
        "Sürtünme işinin yerçekimi işine oranı μ·cos θ/sin θ = μ/tan θ'dır; dik rampada sürtünmenin payı küçülür.",
    },
    {
      heading: "Kayacak mı, kaymayacak mı?",
      body: "Rampa boyunca net kuvvet mg·sin θ − μmg·cos θ'dır. Bu sayı sıfır ya da negatifse duran kutu harekete geçemez. Eşik koşulu tan θ = μ'dür ve kütle burada da sadeleşir: aynı rampada hafif ve ağır kutu aynı eşikte kaymaya başlar. Kaydığında da alttaki hız kütleye bağlı değildir. Gerçek yüzeylerde durgun cismi tutan <em>statik</em> sürtünme katsayısı genellikle kayma sırasındakinden büyüktür; sayfa ikisini aynı μ kabul eder.",
      formula: "v<sub>son</sub> = √(2gL·(sin θ − μ·cos θ))",
      formulaNote:
        "μ ≥ tan θ ise kökün içi sıfır ya da negatiftir: kutu kımıldamaz. μ = 0 ise v = √(2gh), aynı yükseklikten serbest düşmeyle aynı hız.",
    },
  ],
  lab: {
    intro:
      "Sayfada 2 kg'lık bir kutu, 5 m uzunluğunda bir rampanın tepesinden durgun hâlde bırakılır (g = 9.8 m/s²). Ekrandaki mavi disk yuvarlanan bir top değil, dönmeden kayan bu kutudur. <strong>Eğim açısı (°)</strong> kaydırıcısı 5°–45°, <strong>Sürtünme μ</strong> kaydırıcısı 0–0.4 arasında 0.02'lik adımlarla değişir; kaydırıcıya dokunmak koşuyu sıfırlar. <strong>Başlat/Duraklat</strong> ve <strong>Sıfırla</strong> düğmeleri hareketi yönetir. Sağdaki dört çubuk KE, PE, W_net ve Isı'yı joule olarak gösterir; sol üstte E<sub>mek</sub>, altta yerçekimi işi, sürtünme işi ve hız yazar. Açı, rampanın alt ucunda θ olarak görünür; μ'nün değeri ise ekranda yazmaz. Bu yüzden kaydırıcıya tıklayıp <kbd>←</kbd>/<kbd>→</kbd> tuşlarını kullan: her basış μ'yü 0.02, açıyı 1° değiştirir. <kbd>Home</kbd> en küçük, <kbd>End</kbd> en büyük değere götürür. Varsayılan değerler 25° ve μ = 0.10'dur.",
    experiments: [
      {
        title: "Sürtünmesiz rampa: hız yüksekliğin kökü",
        predict:
          "μ = 0 iken 25°'lik rampadan inen kutu alta kaç m/s ile varır? Açıyı 45°'ye çıkarınca yükseklik 1.67 kat artar; hız da 1.67 kat mı artar?",
        do: "Sürtünme μ kaydırıcısında <kbd>Home</kbd> ile μ'yü 0 yap, açı 25°'de Başlat'a bas ve kutu alta varınca alttaki hızı oku. Sonra açıda <kbd>End</kbd> ile 45°'ye geç, yeniden Başlat.",
        observe:
          "25°'de h₀ = 2.11 m, E<sub>mek</sub> başta 41.4 J; altta hız 6.42 m/s, KE 41.2 J, W_net 41.4 J, Isı 0.0 J. 45°'de h₀ = 3.54 m; hız 8.32 m/s, KE 69.1 J. Hız oranı 8.32/6.42 ≈ 1.30'dur, 1.67 değil.",
        explain:
          "Sürtünme yokken mgh = ½mv², yani v = √(2gh): 6.44 m/s'lik teorik değere çok yakın. Hız yüksekliğin kareköküyle büyür, √1.67 ≈ 1.29. KE ile W_net arasındaki 0.2 joule'luk fark fizik değil, sayfanın 1/60 s'lik adımlarla hesap yapmasından gelen küçük sayısal hatadır.",
      },
      {
        title: "Sürtünmeyi iki katına çıkar: ısı ne yapar?",
        predict:
          "Açı 25° iken μ = 0.10 ve μ = 0.20 için alttaki Isı değerlerini tahmin et. μ iki katına çıkınca ısı iki katına mı çıkar? Hız yarıya mı iner?",
        do: "Açıyı 25°'de tut. μ'yü 0.10 yap (Home'dan sonra 5 kez <kbd>→</kbd>), Başlat'a bas, sonuçları yaz. Sonra 5 kez daha <kbd>→</kbd> ile μ = 0.20 yapıp tekrarla. Koşu sırasında Duraklat ile bir ara anı dondurup E<sub>mek</sub> ile Isı'yı topla.",
        observe:
          "μ = 0.10: Isı 8.9 J, W_net 32.5 J, KE 32.4 J, hız 5.69 m/s. μ = 0.20: Isı 17.8 J, W_net 23.7 J, KE 23.5 J, hız 4.85 m/s. Yerçekimi işi ikisinde de 41.4 J. Herhangi bir anda E<sub>mek</sub> + Isı yaklaşık 41.1–41.4 J arasındadır.",
        explain:
          "Sürtünme işi μ ile doğru orantılıdır, bu yüzden ısı tam iki katına çıkar (8.9 → 17.8 J). Hız ise kinetik enerjinin kareköküyle gider: KE yaklaşık %27 azalırken (32.4 → 23.5 J) hız yalnızca %15 azalır (5.69 → 4.85 m/s). Kaybolan mekanik enerji tam olarak Isı çubuğunda durur.",
      },
      {
        title: "Aynı μ, daha dik rampa",
        predict:
          "μ = 0.10 iken 45°'lik rampada, 25°'liğe göre daha mı çok, daha mı az ısı üretilir? Rampa daha yüksek ama yol yine 5 m.",
        do: "μ'yü 0.10'a geri al (<kbd>Home</kbd>, sonra 5 kez <kbd>→</kbd>). Açıyı <kbd>End</kbd> ile 45° yap ve Başlat'a bas. Alttaki satırdaki sürtünme işini önceki deneyin 8.9 J değeriyle karşılaştır.",
        observe:
          "45°'de yerçekimi işi 69.3 J, sürtünme işi −6.9 J, KE 62.4 J, hız 7.90 m/s. Isı 25°'dekinden (8.9 J) azdır. Sürtünmenin yerçekimi işine oranı 25°'de 8.9/41.4 ≈ 0.21 iken 45°'de 6.9/69.3 ≈ 0.10'dur.",
        explain:
          "Dik rampada kutu yüzeye daha hafif bastırır: N = mg·cos θ, 25°'de 17.8 N iken 45°'de 13.9 N'a iner; sürtünme kuvveti de onunla küçülür. Oran μ/tan θ ile verilir: 0.10/0.47 ≈ 0.21 ve 0.10/1.00 = 0.10.",
      },
      {
        title: "Kayma eşiğini bul",
        predict:
          "15°'lik rampada tan θ ≈ 0.27'dir. μ = 0.26 ile μ = 0.28 arasında ne fark olur? Kutu kayarsa alta varınca KE ne kadar kalır?",
        do: "Açıyı 15° yap (Home'dan sonra 10 kez <kbd>→</kbd>). μ'yü 0.26 yap (Home'dan sonra 13 kez <kbd>→</kbd>) ve Başlat'a bas; sabırla bekle. Ardından μ'yü bir adım artırıp 0.28 yap.",
        observe:
          "μ = 0.26'da kutu çok yavaş kayar (60 Hz'lik ekranda alta varması yaklaşık 11.5 s sürer); altta hız 0.87 m/s, KE 0.8 J, Isı 24.6 J. Toplam 25.4 J'ün neredeyse tamamı ısı olmuştur. μ = 0.28'de turuncu bir uyarı çıkar: “μ ≥ tanθ (0.27): sürtünme cismi tutar, kayma başlamaz.” PE 25.4 J'de kalır.",
        explain:
          "Net kuvvet mg(sin θ − μ cos θ), μ = tan θ'da sıfırlanır. Eşiğin hemen altında ivme küçücüktür (yaklaşık 0.075 m/s²) ve enerjinin büyük kısmı sürtünmeye gider. Gerçekte duran bir cismi harekete geçirmek için daha büyük statik sürtünmeyi aşmak gerekir; sayfa bunu basitleştirir.",
      },
    ],
  },
  wow: [
    {
      title: "Şelalenin dibindeki su daha sıcaktır",
      body: "Düşen suyun potansiyel enerjisi tamamen ısıya dönüşürse sıcaklık artışı ΔT = gh/c olur; suyun özgül ısısı c ≈ 4186 J/(kg·°C) alınınca 100 metrelik düşüşte en fazla yaklaşık 0.23 °C eder. Kütle sadeleşir: küçük dere de dev şelale de düşülen her metre için aynı ısınmayı verir. Joule'un 0.003 °C okuyan termometresi bu farkı kâğıt üstünde rahatça görürdü; gerçek bir şelalede ise sıçrayan suyun buharlaşması ve havayla ısı alışverişi bu küçük farkı kolayca örtebilir.",
    },
    {
      title: "Bir günlük yemek, neredeyse iki Everest",
      body: "Günde 2000 kilokalori almak yaklaşık 8.4 milyon joule demektir. 50 kg'lık birinin kendini dikey olarak kaldırması için gereken iş mgh olduğuna göre, bu enerji kâğıt üstünde onu yaklaşık 17 km yükseğe çıkarmaya yeter; Everest'in (8849 m) iki katına yakın. Gerçekte kaslar besin enerjisinin ancak kabaca beşte birini, dörtte birini mekanik işe çevirebilir ve vücut enerjisinin çoğunu zaten yaşamak için harcar.",
    },
    {
      title: "İki kat hız, dört kat fren mesafesi",
      body: "Frenler arabayı durdurmak için tüm kinetik enerjiyi sürtünme işiyle ısıya çevirmek zorundadır: μmg·d = ½mv², yani d = v²/(2μg). Kuru asfalt için tipik μ ≈ 0.7 alınırsa 50 km/h'te fren mesafesi yaklaşık 14 m, 100 km/h'te 56 m olur; tepki süresinde alınan yol buna dahil değildir. Küçük farklar bile büyür: hızı %10 artırmak fren mesafesini %21 uzatır, çünkü 1.1² = 1.21.",
    },
  ],
  worked: {
    title: "Sayfadaki rampayı elle hesapla",
    prompt:
      "2.0 kg'lık kutu, 25° eğimli 5.0 m'lik rampanın tepesinden durgun hâlde bırakılıyor; μ = 0.20, g = 9.8 m/s². Yerçekimi işini, sürtünme işini ve kutunun alttaki hızını iş–enerji teoremiyle bul; sonucu sayfayla karşılaştır.",
    steps: [
      "Yüksekliği bul: h = L·sin 25° = 5.0 m × 0.42262 ≈ 2.1131 m. Yerçekimi işi W<sub>g</sub> = mgh = 2.0 kg × 9.8 m/s² × 2.1131 m ≈ 41.42 J. Bu, başlangıçtaki E<sub>mek</sub> değeridir (sayfada 41.4 J).",
      "Normal kuvvet ve sürtünme: N = mg·cos 25° = 2.0 kg × 9.8 m/s² × 0.9063 ≈ 17.76 N. Sürtünme kuvveti f = μN = 0.20 × 17.76 N ≈ 3.552 N. Normal kuvvet harekete dik olduğu için iş yapmaz.",
      "Sürtünme işi: W<sub>s</sub> = −f·L = −3.552 N × 5.0 m ≈ −17.76 J. Bu enerji Isı çubuğuna gider (sayfada 17.8 J).",
      "Net iş ve hız: W<sub>net</sub> = 41.42 J − 17.76 J = 23.66 J ≈ 23.7 J. Başlangıç hızı sıfır olduğundan ½mv² = 23.66 J; v² = 2 × 23.66 J / 2.0 kg = 23.66 m²/s², v ≈ 4.86 m/s.",
      "Sayfada dene: 25° ve μ = 0.20 ile Başlat'a bas. Altta hız 4.85 m/s, W_net 23.7 J, KE 23.5 J, Isı 17.8 J okunur. Hızdaki 0.01 m/s'lik ve KE ile W_net arasındaki 0.2 joule'luk farklar, sayfanın 1/60 s'lik adımlarla yaptığı sayısal hesaptan gelir.",
    ],
    result:
      "Kutu alta yaklaşık 4.86 m/s ile varır. Sürtünmesiz olsaydı √(2gh) ≈ 6.44 m/s olurdu. Sürtünme başlangıç enerjisinin 17.76/41.42 ≈ %43'ünü ısıya çevirmiştir; bu oran, kavram kartındaki μ/tan θ = 0.20/0.466 ≈ 0.43 ile aynıdır.",
  },
  misconceptions: [
    {
      myth: "Kutu rampada kayarken normal kuvvet de iş yapar.",
      truth:
        "Normal kuvvet yüzeye diktir, hareket ise yüzey boyuncadır; aradaki açı 90° olduğu için cos 90° = 0 ve iş sıfırdır. Normal kuvvet işe dolaylı katılır: büyüklüğü sürtünmeyi belirler. Sayfadaki dört çubukta normal kuvvete ait bir çubuk olmamasının nedeni budur.",
    },
    {
      myth: "Sürtünme varsa enerji korunumu geçerli değildir.",
      truth:
        "Geçerli olmayan, <em>mekanik</em> enerjinin korunumudur. Toplam enerji korunur: E<sub>mek</sub> düştüğü kadar kutunun ve yüzeyin iç enerjisi artar. Sayfada herhangi bir anda E<sub>mek</sub> ile Isı'yı topla; sonuç başlangıç enerjisine (25°'de 41.4 J) çok yakın çıkar.",
    },
    {
      myth: "Ağır kutu rampadan daha hızlı iner.",
      truth:
        "Yerçekimi işi de sürtünme işi de kütleyle orantılıdır; kinetik enerji de öyle. Kütle her terimde sadeleşir ve alttaki hız v = √(2gL(sin θ − μ cos θ)) olur. Sayfada kütle 2 kg'a sabitlenmiştir, bu yüzden bunu formülden doğrula; ağır kutunun yalnızca joule değerleri büyür.",
    },
    {
      myth: "Cisim sabit hızla gidiyorsa ona hiç iş yapılmıyordur.",
      truth:
        "Sıfır olan <em>net</em> iştir, tek tek kuvvetlerin işi değil. Sabit hızla çıkan bir asansörde motor pozitif, yerçekimi ise aynı büyüklükte negatif iş yapar; kinetik enerji değişmez, potansiyel enerji artar. Sayfada 15° ve μ = 0.26'da da benzerini görürsün: yerçekimi 25.4 J, sürtünme −24.6 J iş yapar, kutuya kalan yalnızca 0.8 J'dir.",
    },
  ],
  glossary: [
    {
      term: "İş (W)",
      definition:
        "Kuvvetin yer değiştirme doğrultusundaki bileşeni ile yer değiştirmenin çarpımı; enerji aktarımının ölçüsü.",
    },
    {
      term: "Joule (J)",
      definition:
        "SI enerji ve iş birimi; 1 J = 1 N·m, yani 1 newtonluk kuvvetin 1 metre boyunca yaptığı iş.",
    },
    {
      term: "Kinetik enerji",
      definition: "Kütlesi m, hızı v olan cismin hareketinden doğan ½mv² enerjisi.",
    },
    {
      term: "Yerçekimi potansiyel enerjisi",
      definition:
        "Cismin seçilen sıfır düzeyinden h kadar yukarıda olmasından doğan mgh enerjisi.",
    },
    {
      term: "Mekanik enerji",
      definition:
        "Kinetik ve potansiyel enerjinin toplamı; yalnızca korunumlu kuvvetler iş yaparken sabit kalır.",
    },
    {
      term: "Korunumlu kuvvet",
      definition:
        "Yaptığı iş yalnızca başlangıç ve bitiş noktasına bağlı olan, izlenen yola bağlı olmayan kuvvet; yerçekimi gibi.",
    },
    {
      term: "Kinetik sürtünme katsayısı (μ)",
      definition:
        "Kayan yüzeyler arasındaki sürtünme kuvvetinin normal kuvvete oranı; birimsizdir.",
    },
    {
      term: "İç enerji",
      definition:
        "Bir cismin taneciklerinin düzensiz hareket ve etkileşim enerjilerinin toplamı; sürtünmenin ürettiği ısı buraya eklenir.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede iş, sabit kuvvet çarpı yoldur. Üniversitede kuvvet yol boyunca değişir ve iş bir <strong>çizgi integrali</strong> olur: W = ∫F·dr. Korunumlu kuvvetler bir potansiyelin eğiminden türetilir, F = −∇U; bu yüzden kapalı bir yol boyunca işleri sıfırdır. Sürtünmede böyle bir U yoktur. Daha derinde, Emmy Noether'in 1918'de kanıtladığı teorem enerjinin korunumunu bir simetriye bağlar: fizik yasaları bugün de yarın da aynıysa, korunan bir enerji vardır.",
      "Isı çubuğu seni <strong>termodinamiğin birinci yasasına</strong> götürür: ΔU = Q − W. Dikkat: bu yazımda W, sistemin dışarıya yaptığı iştir; bu sayfadaki W ise cisme yapılan iştir, işaretler bu yüzden terstir (bazı kitaplar sisteme yapılan işi kullanıp ΔU = Q + W yazar). Joule'un çarkı bu yasanın deneysel temelidir; ikinci yasa ise ısıya dönüşen enerjinin neden kendiliğinden hareket enerjisine geri dönmediğini anlatır. Sayfanın kendisi de bir ders saklar: hareket 1/60 s'lik adımlarla, önce hız sonra bu yeni hızla konum güncellenerek çözülür. Bu <em>yarı örtük Euler</em> (Euler–Cromer) yöntemi, uzun yörünge ve molekül simülasyonlarında tercih edilen <em>simplektik</em> yöntemlerin en basit üyesidir: salınan sistemlerde enerji hatası zamanla birikip kaçmaz, sınırlı kalır. Yine de hata sıfır değildir. Bu rampada sapma o anki hızla orantılıdır (½·m·a·Δt·v) ve 45°'lik sürtünmesiz rampada kutu dibe yaklaşırken yaklaşık 1 J'e çıkar. Adımı yarıya indirmek sapmayı da yarıya indirir.",
    ],
    topics: [
      "Çizgi integralleri",
      "Potansiyel ve gradyan",
      "Termodinamiğin birinci yasası",
      "Lagrange ve Hamilton mekaniği",
      "Noether teoremi",
      "Sayısal integrasyon",
    ],
  },
  quiz: [
    {
      question:
        "Sayfada θ = 45°, μ = 0.10 iken kutu alta vardığında yerçekimi işi 69.3 J, sürtünme işi −6.9 J olarak okunuyor. Kutunun kinetik enerjisi yaklaşık kaç joule olur?",
      options: ["76.2 J", "69.3 J", "62.4 J", "6.9 J"],
      answer: 2,
      explanation:
        "Net iş, bütün kuvvetlerin işlerinin toplamıdır: 69.3 + (−6.9) = 62.4 J. Normal kuvvet iş yapmaz. Kutu durgun başladığı için ΔKE = KE'dir; sayfa da KE = 62.4 J gösterir. Sürtünme işini eklemek (76.2 J) en sık yapılan işaret hatasıdır.",
    },
    {
      question:
        "Bir bisikletliyi durgun hâlden 5 m/s'ye çıkarmak için W kadar iş gerekiyor. Onu 5 m/s'den 10 m/s'ye çıkarmak için kaç W daha gerekir?",
      options: ["1 W (aynı)", "2 W", "3 W", "4 W"],
      answer: 2,
      explanation:
        "Kinetik enerji hızın karesiyle gider: 10 m/s'deki KE, 5 m/s'dekinin (10/5)² = 4 katıdır, yani 4W. Ama bisikletli zaten W kadar enerjiye sahiptir; eklenmesi gereken 4W − W = 3W'dir. “Dört kat” cevabı, durgun hâlden başlayan hesapla karıştırmaktan gelir.",
    },
    {
      question:
        "Sayfada eğim açısı 10° (tan θ ≈ 0.18) iken Sürtünme μ hangisi seçilirse kutu hiç kaymaz?",
      options: ["0.10", "0.14", "0.16", "0.18"],
      answer: 3,
      explanation:
        "Kutu ancak mg·sin θ, μmg·cos θ'dan büyükse kayar; yani μ'nün tan θ'dan küçük olması gerekir. tan 10° ≈ 0.176 olduğundan 0.16 ile kutu çok yavaş da olsa kayar (alta yaklaşık 8 s'de varır), 0.18 ile kaymaz ve sayfada “μ ≥ tanθ” uyarısı çıkar. Kütle eşitsizliğin iki yanından sadeleşir.",
    },
  ],
  next: [
    {
      href: "basit-makineler.html",
      title: "Basit Makineler",
      why: "Palanga, eğik düzlem, çark–mil ve vidada kuvvet azalırken yolun nasıl değiştiğini karşılaştır; giriş işinin ne kadarının yükü yükselttiğini, ne kadarının kayıp olduğunu hesapla.",
    },
    {
      href: "sarkac.html",
      title: "Sarkaç Laboratuvarı",
      why: "Kinetik ve potansiyel enerji ileri geri el değiştirir. “Sönüm (hava direnci) açık” kutusunu işaretle: Toplam çubuğu erir, eksilen enerji buradaki Isı çubuğunun karşılığıdır.",
    },
    {
      href: "momentum-itme-ve-carpismalar.html",
      title: "Momentum, İtme ve Çarpışmalar",
      why: "Leibniz ile Descartes'ın kavgasının öbür yarısı: yapışan arabalarda momentum korunur, ama 9.5 J'lük kinetik enerjinin 5.3 J'ü ısıya ve şekil değişimine gider.",
    },
    {
      href: "termodinamik.html",
      title: "Termodinamik: PV Diyagramı ve Çevrimler",
      why: "Isı çubuğuna giden enerji taneciklerin düzensiz hareketini hızlandırır; sıcaklık bunun ölçüsüdür. Burada gazı adım adım genişletip sıkıştır, iş ile ısının birinci yasada nasıl dengelendiğini izle.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 7.3 Work-Energy Theorem",
      url: "https://openstax.org/books/university-physics-volume-1/pages/7-3-work-energy-theorem",
      note: "Teoremin türetilmesi, sürtünmesiz eğik düzlemde Newton yasalarıyla karşılaştırma; çember pist ve tahtalarda duran mermi çözümlü örnekleri (İngilizce, açık ders kitabı).",
    },
    {
      title: "PhET · Enerji - Kaykay Parkı",
      url: "https://phet.colorado.edu/tr/simulations/energy-skate-park",
      note: "Sürtünmeyi açıp kapatarak kinetik, potansiyel ve ısı enerjisini pist üzerinde izleyebileceğin Türkçe simülasyon.",
    },
    {
      title: "HyperPhysics · Work, Energy and Power",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/work.html",
      note: "İş, enerji, güç ve iş–enerji ilkesi için kısa özet; fren mesafesi ve çarpışma örnekleriyle (İngilizce).",
    },
    {
      title: "Wikipedia · Mechanical equivalent of heat",
      url: "https://en.wikipedia.org/wiki/Mechanical_equivalent_of_heat",
      note: "Rumford, Mayer, Joule ve Helmholtz: ısının işe eşdeğerliğinin tarihi ve öncelik tartışması (İngilizce).",
    },
  ],
  revision: "Ekim 2026",
};
