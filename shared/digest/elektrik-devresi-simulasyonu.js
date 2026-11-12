window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["elektrik-devresi-simulasyonu"] = {
  slug: "elektrik-devresi-simulasyonu",
  title: "Doğru Akım Devreleri: Akım Tükenmez, Enerji Paylaşılır",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 30,
  tagline:
    "Bir pil, birkaç direnç ve tel: hepsi iki korunum yasasına ve tek bir doğrusal denklem sistemine iner. Ohm'un termoçiftinden Wheatstone köprüsüne, en büyük güç aktarımından SPICE'a uzanan bir yol.",
  hook:
    "El fenerinin düğmesine bastığın anda ampul yanar; oysa telin içindeki elektronlar saniyede milimetrenin kesirleri kadar ilerler, pilden ampule varmaları dakikalar sürerdi. Peki ampulü yakan elektronlar nereden geliyor? Ve üç lambayı arka arkaya bağladığında neden ilki akımdan payını alıp ötekilere daha azını bırakmıyor da üçü birden aynı ölçüde sönükleşiyor?",
  bigIdea:
    "Bir devrede akım tükenmez, enerji paylaşılır: düğümlerde yük, kapalı yollarda enerji korunur (<strong>Kirchhoff yasaları</strong>) ve bu iki kural Ohm yasasıyla birleşince her doğrusal direnç ağı tek bir denklem sistemine, <em>G·v = i</em>'ye dönüşür.",
  story: [
    "1820'lerin ortasında Köln'deki Cizvit lisesinde matematik ve fizik öğreten Georg Simon Ohm'un sorusu basitti: bir telin uzunluğu, içinden geçen akımı nasıl değiştirir? Önce Volta pilleriyle denedi, ama pillerin gerilimi ve iç direnci ölçüm sürerken değişiyordu. Bu yüzden kaynak olarak bir <strong>termoçift</strong> kullandı: eklemleri farklı sıcaklıkta tutulan iki farklı metalin ürettiği, çok daha kararlı bir gerilim. Akımı bir galvanometreyle, yani akımın saptırdığı mıknatıslı bir iğneyle ölçtü ve devreye farklı uzunlukta, kalınlıkta ve malzemeden deney telleri bağladı. Veriler tek bir bağıntıya oturdu: <em>x = a/(b + ℓ)</em>; x iğnenin okuması, ℓ deney telinin uzunluğu. Bugünkü dille <em>I = ε/(r + R)</em>: kaynağın EMK'sı bölü kendi iç direnciyle dış devrenin direncinin toplamı. Sayfadaki <strong>Formül ε/(R<sub>eş</sub> + r)</strong> kutusu, Ohm'un 1827'de Berlin'de yayımladığı <em>Die galvanische Kette, mathematisch bearbeitet</em> (Galvanik Devrenin Matematiksel İncelemesi) kitabındaki bağıntının bugünkü yazılışıdır.",
    "Kitap soğuk karşılandı. Sık aktarılan bir anlatıya göre eleştirmenler onu 'çıplak hayallerden örülmüş bir ağ' diye küçümsedi, bir bakan da böyle sapkın fikirleri savunan birinin bilim öğretmeye layık olmadığını söyledi; bu alıntıların kaynakları zayıftır ve düşmanlığın boyutu tarihçiler arasında tartışmalıdır. Belgelenen kısım şu: Ohm okulundaki görevinden ayrıldı, 1833'te Nürnberg Politeknik Okulu'na geçti; yasası 1840'larda genel kabul gördü ve Londra Kraliyet Cemiyeti 1841'de ona Copley Madalyası'nı verdi. Aynı orantıyı 1781'de Henry Cavendish de bulmuştu: tuzlu su dolu cam tüplerden geçen akımı, devreyi kendi bedeniyle tamamlayıp hissettiği çarpmanın şiddetiyle ölçerek. Cavendish sonuçlarını yayımlamadı; notları ancak 1879'da James Clerk Maxwell'in derlemesiyle gün yüzüne çıktı. Ohm'un bağıntısı tek halkalı bir devreyi anlatıyordu. Kollara ayrılan bir ağı bütünüyle çözen iki kuralı 1845'te, 21 yaşına bastığı yıl, Königsberg Üniversitesi'nin matematik-fizik seminerinde bir ödev üzerinde çalışan öğrenci <strong>Gustav Robert Kirchhoff</strong> yazdı: biri düğümlerde akımın, öbürü kapalı yollarda gerilimin hesabını tutuyordu. Seminer ödevi sonra doktora tezi oldu.",
    "Ölçüm de güç de aynı yıllarda soru oldu. Samuel Hunter Christie 1833'te farklı kalınlıktaki tellerin dirençlerini karşılaştırmak için dört kollu, 'elmas' biçimli bir düzenek yayımlamıştı; yöntem on yıl boyunca pek ilgi görmedi. 1843'te telgrafın öncülerinden Charles Wheatstone, Kraliyet Cemiyeti'ndeki Bakerian konferansında düzeneği direnç ölçmek için geliştirdi ve Christie'nin buluşu olarak sundu; köprü yine de onun adıyla anıldı. St. Petersburg'da ise Moritz von Jacobi (Kirchhoff'un seminerini yönetenlerden matematikçi C. G. J. Jacobi'nin ağabeyi) elektrik motorları üzerinde çalışıyordu: 1839'da yaptığı pille çalışan tekne, Neva Nehri'nde 14 yolcuyu akıntıya karşı saatte yaklaşık 5 km hızla taşıdı. Jacobi 1840 dolaylarında bir kaynağın en büyük gücü, yükün direnci kaynağın iç direncine eşitken verdiğini yayımladı. Aktarılana göre James Joule bundan, pille çalışan bir motorun veriminin yüzde 50'yi aşamayacağı sonucunu çıkardı. 1880'de Edison'ın ekibinde (kaynaklar Edison'ı ya da yardımcısı Francis Upton'ı anar) yanılgı düzeltildi: hedef en büyük güç değil verimse, kaynağın iç direnci yükünkinden çok küçük olmalıdır. Bu fikirle yaklaşık yüzde 90 verime ulaştılar.",
    "Kirchhoff denklemlerini elle çözmek birkaç ilmekte kolaydır, binlerce transistörlü bir yongada imkânsız. 1973'te Berkeley'de Laurence Nagel ve danışmanı Donald Pederson <strong>SPICE</strong> adlı devre benzetim programını tanıttı. İlk sürüm düz düğüm analizi kullanıyordu; bu yöntem bobinleri ve uçlarından hiçbiri toprağa bağlı olmayan 'yüzen' gerilim kaynaklarını temsil etmekte zorlanır. Ho, Ruehli ve Brennan'ın 1975'te yayımladığı <strong>değiştirilmiş düğüm analizi</strong> (MNA), gerilim kaynaklarının akımlarını da bilinmeyenlere ekleyerek bu sorunu çözdü ve aynı yıl çıkan SPICE2 yöntemi benimsedi. Kaynak koduyla birlikte kamu malı olarak dağıtılan program dünya standardı oldu; İngilizcede 'bir devreyi SPICE'lamak' bugün de benzetimini yapmak demektir. Bu sayfanın çözücüsü aynı fikrin minyatürüdür: her tel ve kapalı anahtar 0 voltluk bir kaynak olarak girer, böylece akımları da çözülür; varsayılan karma devre 12 bilinmeyenli bir sistemdir.",
  ],
  core: [
    {
      heading: "Akım, gerilim ve Ohm yasası: telin içinden bakış",
      body:
        "<strong>Akım</strong> (I), bir kesitten saniyede geçen yüktür: 1 A, saniyede 1 coulomb, yani yaklaşık 6.2×10¹⁸ elektron. <strong>Gerilim</strong> (potansiyel fark, V), birim yük başına enerji farkıdır: 1 V, her coulomb için 1 joule. Bakırda serbest elektronlar saniyede yaklaşık 1.6×10⁶ m hızla gelişigüzel koşturur; tel boyunca bir elektrik alan kurulunca bu kalabalığa küçücük bir ortak kayma eklenir: <strong>sürüklenme hızı</strong>. Paul Drude'un 1900'de kurduğu modelde alan, her elektronu iki çarpışma arasındaki ortalama τ süresi boyunca ivmelendirir; çarpışmalar kazanılan ortak hızı her seferinde dağıttığı için ortalama kayma alanla orantılı kalır: v<sub>d</sub> = qEτ/m. Akım yoğunluğu J = nqv<sub>d</sub> buradan J = σE biçimini alır: mikroskobik Ohm yasası; telin tamamı için V = I·R. Bakırda τ ≈ 2.5×10⁻¹⁴ s'dir, elektron iki çarpışma arasında yaklaşık 40 nm yol alır. Bugün saçılmanın kafes titreşimlerinden ve kusurlardan geldiğini biliyoruz. Kayma saniyede milimetrenin kesirleri kadardır; lambanın düğmeye basar basmaz yanması, alanın tel boyunca ışık hızının büyük bir kesriyle kurulmasındandır.",
      formula: "I = n·q·v<sub>d</sub>·A<br>J = σE, &nbsp;σ = nq²τ/m &nbsp;⇒&nbsp; V = I·R, &nbsp;R = ρL/A",
      formulaNote:
        "n serbest elektron yoğunluğu (bakırda yaklaşık 8.5×10²⁸ m⁻³), A kesit alanı, m elektron kütlesi, σ iletkenlik, ρ = 1/σ özdirenç (bakırda 1.7×10⁻⁸ Ω·m). Ohm yasası bir doğa yasası değil, metallerde geniş bir aralıkta geçerli bir malzeme davranışıdır; diyotta bozulur, ısınan lamba telinde de direnç sıcaklıkla değiştiği için I–V eğrisi doğru olmaz.",
    },
    {
      heading: "Seri ve paralel: eşdeğer direnç",
      body:
        "Seri bağlı dirençlerden aynı akım geçer ve gerilimler toplanır; bu yüzden dirençler de toplanır, her direnç gerilimden kendi direnci oranında pay alır (<strong>gerilim bölücü</strong>). Paralel kollar aynı iki düğüme bağlıdır: gerilim ortaktır, akımlar toplanır, dolayısıyla dirençlerin tersi olan <strong>iletkenlikler</strong> (G = 1/R) toplanır. Paralel eşdeğer her zaman en küçük koldan da küçüktür: üç tane 24 Ω'luk lamba paralelde 8 Ω eder. Sayfanın varsayılan karma devresinde R₂ ∥ R₃ = 30·20/50 = 12 Ω, R<sub>eş</sub> = 20 + 12 = 32 Ω'dur; 0.5 Ω'luk iç direnç de eklenince sayfa I = 12 V / 32.5 Ω = 369.2 mA ölçer. Seri-paralel indirgemenin bittiği yer Wheatstone köprüsüdür: galvanometre iki kolu ne seri ne paralel biçimde birbirine bağlar. Orada Δ–Y dönüşümü ya da Kirchhoff denklemleri gerekir.",
      formula: "R<sub>eş</sub> = R₁ + R₂ + R₃ &nbsp;(seri)<br>1/R<sub>eş</sub> = 1/R₁ + 1/R₂ + 1/R₃ &nbsp;(paralel)",
      formulaNote:
        "İki paralel direnç için kısa yol R₁R₂/(R₁ + R₂): çarpım bölü toplam. Seri iki dirençli bir gerilim bölücüde R₂'nin payı R₂/(R₁ + R₂)'dir.",
    },
    {
      heading: "Kirchhoff yasaları: yük ve enerji korunur",
      body:
        "<strong>Akım yasası (KAY)</strong>: bir düğüme giren akımların toplamı çıkanlarınkine eşittir. Kararlı durumda tellerde yük birikmez; KAY, yük korunumunun devre dilidir. <strong>Gerilim yasası (KGY)</strong>: kapalı bir ilmek boyunca bütün gerilim artışları ve düşüşlerinin toplamı sıfırdır. Durağan elektrik alan korunumludur; ilmeği dolaşıp başladığı yere dönen bir yük için pilin kazandırdığı enerji, dirençlerde ısıya dönen enerjiye eşittir. n düğümlü, b kollu bağlı bir devrede n − 1 bağımsız akım denklemi ve b − n + 1 bağımsız ilmek vardır; toplam b denklem, b kol akımını belirler. Sayfanın köprü devresinde dört düğümün dördü de tabloda yazılıdır ama biri ötekilerden çıkar; üç KGY satırı da altı kollu, dört düğümlü ağın tam 6 − 4 + 1 = 3 bağımsız ilmeğidir. Yasalar toplu eleman varsayımına dayanır: devre, sinyalin dalga boyundan çok küçük olmalı ve değişen manyetik akı elemanların içinde kalmalıdır.",
      formula: "Σ<sub>düğüm</sub> I = 0 &nbsp;&nbsp;·&nbsp;&nbsp; Σ<sub>ilmek</sub> ΔV = 0",
      formulaNote:
        "Sayfadaki Kirchhoff denetimi tablosu her düğüm ve ilmek için bu toplamı gösterir; 10⁻¹⁵ mertebesindeki artıklar kayan nokta yuvarlamasıdır.",
    },
    {
      heading: "EMK, uç gerilimi ve iç direnç",
      body:
        "Bir pilin <strong>elektromotor kuvveti</strong> (EMK, ε), kimyasal tepkimenin birim yüke kazandırdığı enerjidir; adına rağmen bir kuvvet değil, voltla ölçülen bir enerji/yük oranıdır. Akım çekildiğinde yükler pilin içindeki elektrolitten ve elektrotlardan da geçer; bu yolun direnci <strong>iç direnç</strong> r'dir. Uçlarda ölçtüğün gerilim bu yüzden ε'dan I·r kadar düşüktür. Açık devrede (I = 0) uç gerilimi tam ε'dur; uçlar kısa devre edilirse akım ε/r'ye çıkar ve bütün güç pilin içinde ısınır. Kaynağın verdiği güç εI, iç dirençteki I²r ile dış devreye giden VI arasında paylaşılır; dış devrenin payı, yani verim, R/(R + r)'dir. Sayfadaki grafik bunu geometriye çevirir: amber kaynak doğrusu V = ε − I·r ile turkuaz yük doğrusu V = R<sub>eş</sub>·I'nın kesiştiği nokta devrenin çalışma noktasıdır.",
      formula: "V = ε − I·r<br>εI = I²r + VI, &nbsp;η = R/(R + r)",
      formulaNote:
        "ε ve r pilin, R dış devrenin özelliğidir. Gerçek bir pilde r sabit değildir; pil boşaldıkça, soğudukça ve yaşlandıkça büyür.",
    },
    {
      heading: "Düğüm analizi, Thevenin ve en büyük güç",
      body:
        "Bir düğümü toprak (0 V) seçip öteki düğüm potansiyellerini bilinmeyen alırsan, her düğümde KAY ile Ohm yasası birleşir ve devre bir doğrusal sisteme dönüşür: <strong>G·v = i</strong>. G simetrik bir iletkenlik matrisidir; her düğüm bir yoldan toprağa bağlıysa tersinirdir ve çözüm tektir. Gerilim kaynaklarının akımlarını da bilinmeyenlere ekleyen biçime <strong>değiştirilmiş düğüm analizi</strong> (MNA) denir; sayfa her ayarda böyle bir sistemi Gauss yok etmesiyle çözer. Doğrusallığın armağanı <strong>Thevenin teoremidir</strong>: dirençler ve kaynaklardan oluşan her ağ, iki ucundan bakınca tek bir V<sub>th</sub> kaynağı ile ona seri bir R<sub>th</sub>'ye eşdeğerdir. Yük gücünün R<sub>L</sub>'ye göre türevi R<sub>L</sub> = R<sub>th</sub>'de sıfırdır: en büyük güç bu eşleşmede aktarılır; kaynak gerçekten ε ile r'den oluşuyorsa, sayfadaki gibi, o anda verim tam yüzde 50'dir. Wheatstone köprüsünde galvanometrenin gördüğü V<sub>th</sub>, R₁/R₂ = R₃/R₄ iken sıfırdır; galvanometrenin direnci ne olursa olsun I<sub>g</sub> = V<sub>th</sub>/(R<sub>th</sub> + R<sub>g</sub>) = 0.",
      formula:
        "G·v = i<br>P<sub>L</sub> = V<sub>th</sub>²R<sub>L</sub>/(R<sub>L</sub> + R<sub>th</sub>)²<br>dP<sub>L</sub>/dR<sub>L</sub> = V<sub>th</sub>²(R<sub>th</sub> − R<sub>L</sub>)/(R<sub>L</sub> + R<sub>th</sub>)³ = 0 ⇒ R<sub>L</sub> = R<sub>th</sub>, &nbsp;P<sub>max</sub> = V<sub>th</sub>²/(4R<sub>th</sub>)",
      formulaNote:
        "G'nin köşegeninde bir düğüme bağlı iletkenliklerin toplamı, köşegen dışında komşu iletkenliklerin eksisi durur. Türev, R<sub>L</sub> R<sub>th</sub>'den küçükken artı, büyükken eksidir; uç nokta bu yüzden bir tepedir. Sayfada Thevenin kaynağı pilin kendisidir: 12 V ve 0.5 Ω için en büyük güç 12²/(4 × 0.5) = 72 W.",
    },
  ],
  lab: {
    intro:
      "Sayfa bir pil (EMK ε, iç direnç r), bir anahtar ve beş devreden birini kurar ve her ayarda bütün devreyi <strong>değiştirilmiş düğüm analiziyle</strong> çözer. 'Ölçülen' değerler bu çözümdür, yani ideal bir ampermetre ve voltmetrenin göstereceği sayılar; yanlarında el formülü ve aradaki <strong>Fark</strong> durur. Anahtar kapalıyken Fark hep 0.00 % çıkar, çünkü ikisi aynı ideal modelin birbirinden bağımsız iki çözümüdür: biri matrisle, öbürü seri-paralel indirgeme, Δ–Y dönüşümü ya da Thevenin ile. Gerçek bir laboratuvarda farkı ölçü aletlerinin direnci, ısınan lamba telleri ve pilin değişen iç direnci yaratır. <strong>Devre</strong> menüsü Seri, Paralel, Karma, Wheatstone köprüsü ve Maksimum güç aktarımı arasında geçiş yapar; seri ve paralelde <strong>Direnç sayısı</strong> menüsü 1–3 eleman seçer. <strong>Hazır deney</strong> menüsü birkaç ayarı birden yapar ve aşağıdaki deneyleri tekrarlanabilir kılar; bir devre ayarını elle değiştirince menü 'Elle ayar'a döner. <strong>EMK ε</strong> 0.5–24 V, <strong>İç direnç r</strong> 0–10 Ω arasındadır. R₁–R₄ ve galvanometre kaydırıcıları E24 standart değerleriyle 1 Ω–10 kΩ arasında adım adım ilerler; en büyük güç devresindeki <strong>Yük direnci R<sub>L</sub></strong> kaydırıcısı 0.1 Ω–1 kΩ arasında her on katı 100 adımda geçer, <strong>R<sub>L</sub> = r yap</strong> düğmesi yükü tam iç dirence eşitler. Odaktaki kaydırıcıyı ok tuşları tek adım oynatır. <strong>Elemanlar: V, I, P</strong> tablosu her elemanın gerilimini, akımını ve gücünü, <strong>Kirchhoff denetimi</strong> tablosu her düğüm ve ilmek için toplamı verir. Tellerin rengi potansiyeli gösterir (mavi 0 V, kırmızı ε). Noktaların hızı akımla orantılı bir görsel ölçektir, gerçek sürüklenme hızı değildir; lambalar sabit dirençli varsayılır.",
    experiments: [
      {
        title: "Üç lamba: seri mi, paralel mi?",
        predict:
          "Üç özdeş 24 Ω'luk lambayı 12 V'luk ideal bir pile önce seri, sonra paralel bağlıyorsun. Hangisinde lambalar daha parlak yanar ve bir lambanın gücü kaç kat değişir: 3 mü, 9 mu? Seride ilk lamba akımın bir kısmını harcayıp sonrakilere daha azını bırakır mı?",
        do: "Hazır deney menüsünden “Özdeş lambalar seri: 3 × 24 Ω, r = 0” seçeneğini seç. Elemanlar: V, I, P tablosunda üç lambanın değerlerini, Kirchhoff denetimi tablosunda KAY satırlarını ve altındaki düğüm potansiyellerini oku. Sonra “Özdeş lambalar paralel: 3 × 24 Ω, r = 0” seçeneğine geç ve aynılarını oku.",
        observe:
          "Seride Ölçülen akım I = 166.7 mA, R<sub>eş</sub> = 72.00 Ω; her lamba 4.00 V, 167 mA, 667 mW ve parlaklık 11 %. A, B ve C düğümlerinin KAY satırları 166.7 − 166.7 mA verir; potansiyeller 12.0, 8.00 ve 4.00 V. Paralelde I = 1.500 A, R<sub>eş</sub> = 8.000 Ω; her lamba 12.0 V, 500 mA, 6.00 W, parlaklık 100 %. Kaynak εI 2.00 W'tan 18.0 W'a çıkar.",
        explain:
          "Akım tükenmez: seri yolda her lambadan aynı yükler geçer, lambada harcanan şey yüklerin enerjisidir, yani her lambada 4 V'luk potansiyel düşüşü. Seride gerilim üçe bölünür ve P = V²/R olduğundan her lamba paralel bağlamadaki gücün (1/3)² = 1/9'unu alır; paralelde her lamba pilin 12 V'unun tamamını görür. Gerçek akkor lambalarda oran 9'dan küçük çıkar: seride daha soğuk kalan telin direnci küçüktür, bu yüzden beklenenden fazla akım çeker.",
      },
      {
        title: "Pil zorlanınca: iç direnç ve uç gerilimi",
        predict:
          "EMK'sı 12 V, iç direnci 0.5 Ω olan bir pile önce üç tane 1.5 kΩ'luk, sonra üç tane 1.5 Ω'luk direnci paralel bağlıyorsun. Akım kaç kat artar? Uç gerilimi 12 V'ta kalır mı? Pil sabit akım mı verir, sabit gerilim mi?",
        do: "Hazır deney menüsünden “Hafif yük: 3 × 1.5 kΩ paralel, r = 0.5 Ω” seçeneğini seç; Ölçülen akım I, Uç gerilimi, R<sub>eş</sub> ve Verim kutularını ve Güç dengesi panelini oku. Sonra “Ağır yük: 3 × 1.5 Ω paralel, r = 0.5 Ω” seçeneğine geç. Her ikisinde grafikteki amber kaynak doğrusuna, kırmızı çalışma noktasına ve akım ekseninin ölçeğine bak.",
        observe:
          "Hafif yükte I = 23.98 mA, uç gerilimi 11.99 V, R<sub>eş</sub> = 500.0 Ω, verim 99.9 %; iç dirençte yalnızca 287 µW kaybolur. Ağır yükte I = 12.00 A, uç gerilimi 6.000 V, R<sub>eş</sub> = 0.5000 Ω, verim 50.0 %: kaynağın verdiği 144 W'ın 72.0 W'ı pilin içinde, 72.0 W'ı dış devrede harcanır. Grafikte amber kaynak doğrusu hafif yükte neredeyse yatay görünür, ağır yükte 12 V'tan 2 V'a dik iner; çalışma noktası 12.0 A, 6.00 V'a oturur.",
        explain:
          "Akım 500 kat arttı, uç gerilimi yarıya indi: pil ne sabit akım ne de sabit gerilim kaynağıdır. İyi bir model, ideal bir EMK ile ona seri bir iç dirençtir: V = ε − I·r, eğimi −r olan bir doğru. Bu eğim iki durumda da aynıdır (−0.5 V/A); değişen grafiğin akım eksenidir: 0–40 mA'lik eksende doğru yalnızca 20 mV, 0–20 A'lik eksende 10 V düşer. Ağır yükte R<sub>eş</sub> = r olduğu için güç tam ikiye bölünür; bu, bir sonraki deneyin en büyük güç koşuludur. Araba çalıştırılırken farların bir an sönükleşmesi bu düşüşün gündelik hâlidir: marş motoru aküden yüzlerce amper çeker.",
      },
      {
        title: "Aynı 64 W, iki farklı verim",
        predict:
          "Aynı pile (12 V, 0.5 Ω) bağlı yükün direncini 0.25 Ω'dan 1 Ω'a çıkarırsan yük gücü nasıl değişir? En büyük güç hangi yükte aktarılır ve o anda pilin verdiği enerjinin ne kadarı yüke ulaşır?",
        do: "Hazır deney menüsünden “En büyük güç: R_L = r = 0.5 Ω” seçeneğini seç; Ölçülen yük gücü P<sub>L</sub>, En büyük P<sub>max</sub> ve Verim kutularını oku. Yük direnci R<sub>L</sub> kaydırıcısını etiketinde 1.00 Ω yazana kadar sağa kaydır (odaktayken sağ ok tuşuyla 30 adım), sonra 0.251 Ω yazana kadar sola (sol ok tuşuyla 60 adım). R<sub>L</sub> = r yap düğmesi seni tepeye geri götürür.",
        observe:
          "Başlangıçta R<sub>L</sub> = 0.500 Ω: ölçülen ve formül P<sub>L</sub> = 72.00 W, P<sub>max</sub> = 72.00 W, verim 50.0 %. 1.00 Ω'da P<sub>L</sub> = 64.00 W, verim 66.7 %, iç dirençte 32.0 W. 0.251 Ω'da P<sub>L</sub> = 64.08 W, ama verim 33.4 % ve pilin içinde 128 W ısınır. Grafikteki P<sub>L</sub>(R<sub>L</sub>) eğrisi kesikli R<sub>L</sub> = r çizgisinde tepe yapar; mor kesikli verim eğrisi ise hep yükselir.",
        explain:
          "P<sub>L</sub> = ε²R<sub>L</sub>/(R<sub>L</sub> + r)² ifadesinin türevi R<sub>L</sub> = r'de sıfırdır. R<sub>L</sub> ile r²/R<sub>L</sub> aynı gücü verir, bu yüzden logaritmik eksende eğri tepeye göre simetriktir: 0.25 Ω ve 1 Ω'un ikisi de 64 W; 0.251 Ω'daki fazladan 0.08 W, kaydırıcı değerinin 0.25 değil 0.251 olmasındandır. Tepede verim tam yarıdır. Şebekeler ve şarj aletleri bu yüzden bilerek tepeden uzakta, yük direnci iç dirençten çok büyükken çalışır; eşleştirme ise sinyalin zayıf olduğu radyo devrelerinde, örneğin anten ile alıcı arasında aranır.",
      },
      {
        title: "Sıfırı ölçmek: Wheatstone dengesi",
        predict:
          "Dengedeki köprüde galvanometreden akım geçmez. Galvanometrenin direncini 10 000 katına çıkarırsan ya da EMK'yı iki katına çıkarırsan denge bozulur mu? R₄'ü yalnızca bir adım, yaklaşık yüzde 10 değiştirince galvanometreden ne mertebede bir akım geçer? Denge bozukken galvanometrenin direnci önemli midir?",
        do: "Hazır deney menüsünden “Köprü dengesi: 100, 200, 150, 300 Ω” seçeneğini seç; Ölçülen I<sub>g</sub> (B→D), Thevenin ve Denge kutularını oku. Galvanometre R<sub>g</sub> kaydırıcısını en sola ve en sağa, EMK ε kaydırıcısını 24 V'a götür. Sonra hazır deneyi yeniden seç; R₄ kaydırıcısını bir adım sola (270 Ω), ardından iki adım sağa (330 Ω) kaydır ve şemadaki galvanometre ibresini izle. Son olarak R₄'ü 270 Ω'a geri al ve R<sub>g</sub>'yi yine en sola ve en sağa götür.",
        observe:
          "Dengede ölçülen ve Thevenin I<sub>g</sub> = 0 A, Denge kutusu R₄ = 300.0 Ω, düğüm notu B = D = 7.98 V. R<sub>g</sub> 1 Ω'dan 10 kΩ'a, ε 24 V'a çıksa da I<sub>g</sub> sıfırda kalır. R₄ = 270 Ω'da I<sub>g</sub> = 1.083 mA ve ibre sağa sapar; formül notu V<sub>th</sub> = 285 mV, R<sub>th</sub> = 163 Ω yazar. 330 Ω'da I<sub>g</sub> = −924.1 µA ve ibre sola döner: akım artık D'den B'ye akar. Dengesiz köprüde (270 Ω) R<sub>g</sub> = 1 Ω iken I<sub>g</sub> = 1.736 mA, 10 kΩ iken yalnızca 28.03 µA olur; ölçülen ve Thevenin değerleri her adımda aynıdır.",
        explain:
          "Denge koşulu R₁/R₂ = R₃/R₄ yalnızca oranlara bağlıdır: iki kol aynı oranda bölen iki gerilim bölücüdür, B ile D aynı potansiyelde kalır. Galvanometre sıfırı gösterdiği sürece ne onun direnci ne de pilin gerilimi sonucu etkiler. Bu bir <strong>sıfır yöntemidir</strong>: ölçüm, kalibre edilmiş bir ibreye değil bilinen dirençlerin oranına dayanır. Denge bozulunca R<sub>g</sub> önem kazanır: I<sub>g</sub> = V<sub>th</sub>/(R<sub>th</sub> + R<sub>g</sub>), yani direnci R<sub>th</sub> ≈ 163 Ω'dan çok küçük olan bir galvanometre küçük bir dengesizliği bile güçlü bir akımla gösterir.",
      },
    ],
  },
  wow: [
    {
      title: "Saatte iki metre bile değil",
      body:
        "10 A taşıyan 1.5 mm²'lik bir bakır telde, serbest elektron yoğunluğu n ≈ 8.5×10²⁸ m⁻³ alınırsa sürüklenme hızı v<sub>d</sub> = I/(nqA) = 10 A / (8.5×10²⁸ m⁻³ × 1.6×10⁻¹⁹ C × 1.5×10⁻⁶ m²) ≈ 4.9×10⁻⁴ m/s çıkar: saatte yaklaşık 1.8 metre. Bir metrelik kabloyu baştan sona geçmek yarım saatten uzun sürer. Oysa aynı elektronlar gelişigüzel hareketlerinde saniyede yaklaşık 1.6 milyon metre koşturur, sürüklenmenin üç milyar katından hızlı. Bir elektronun tek bir milimetre kayması iki saniye sürer; o iki saniyede, ışık hızının yarısıyla bile ilerleyen bir sinyal Dünya'nın çevresini yedi kezden fazla dolaşır.",
    },
    {
      title: "Bir ohm, iki doğa sabitinden",
      body:
        "1980'de Klaus von Klitzing, çok soğutulmuş ve güçlü bir manyetik alana konmuş iki boyutlu bir elektron tabakasında Hall direncinin basamak basamak değiştiğini buldu. Basamaklar, ölçülen parçanın biçiminden ve malzemesinin ayrıntılarından bağımsız olarak R<sub>K</sub>/i değerlerine oturuyordu (i = 1, 2, 3…); R<sub>K</sub> = h/e² yalnızca Planck sabitinden ve elektronun yükünden oluşur. Keşif ona 1985 Nobel Fizik Ödülü'nü getirdi ve 1990'dan beri dünyanın direnç standartları bu etkiyle ayarlanıyor. 20 Mayıs 2019'da SI'da h ve e kesin değerlerle sabitlenince R<sub>K</sub> de kesinleşti: 25 812.807 45… Ω. Sayfadaki her direnç kaydırıcısının birimi artık bu iki sabite bağlıdır: 1 Ω, h/e²'nin tam 25 812.807 45…'te biridir.",
    },
    {
      title: "Kirchhoff'un ağaçları",
      body:
        "1847'de Kirchhoff devre denklemlerinin genel çözümünü bugün <strong>kapsayan ağaç</strong> dediğimiz kol kümeleri üzerinden yazdı: bütün düğümlere dokunan ama hiç kapalı yol kurmayan kollar. 'Ağaç' adını on yıl sonra Arthur Cayley koydu. Makaleden çizge kuramının matris-ağaç teoremi çıktı: Laplace matrisinden aynı sıradaki satırı ve sütunu silip determinantını alırsan kapsayan ağaç sayısı çıkar. Düğüm analizindeki G matrisi tam da devrenin ağırlıklı Laplace matrisidir: toprak satırı ve sütunu silinince kalan determinant, bütün kapsayan ağaçlardaki iletkenlik çarpımlarının toplamıdır. Pil koluyla dört düğümün her çiftini bağlayan Wheatstone köprüsünün, Cayley formülüne göre 4⁴⁻² = 16 kapsayan ağacı vardır.",
    },
  ],
  worked: {
    title: "Dengesi bozulmuş köprü: Thevenin ve düğüm analizi",
    prompt:
      "Sayfadaki Wheatstone köprüsünde ε = 12 V ve iç direnç r = 0 olsun; R₁ = 100 Ω, R₂ = 200 Ω, R₃ = 150 Ω, galvanometrenin direnci R<sub>g</sub> = 100 Ω. Denge için R₄ = R₂R₃/R₁ = 300 Ω gerekirken yerine 270 Ω'luk bir direnç takılmış. Galvanometreden geçen akımı Thevenin eşdeğeriyle bul, sonucu düğüm analiziyle (G·v = i) doğrula ve sayfayla karşılaştır.",
    steps: [
      "<strong>Thevenin gerilimi.</strong> Galvanometreyi söküp B ile D arasındaki açık devre gerilimini bul. A = 12 V, C = 0 V olduğundan iki kol birer gerilim bölücüdür: V<sub>B</sub> = 12 V × 200/300 = 8.000 V, V<sub>D</sub> = 12 V × 270/420 = 7.714 V. Fark V<sub>th</sub> = V<sub>B</sub> − V<sub>D</sub> = 2/7 V ≈ 0.2857 V; B daha yüksek potansiyeldedir.",
      "<strong>Thevenin direnci.</strong> İdeal kaynağı kısa devre say: A ile C aynı düğüm olur. B'den bakınca R₁ ile R₂, D'den bakınca R₃ ile R₄ paraleldir ve bu iki çift B–D arasında seri durur: R<sub>th</sub> = 100·200/300 Ω + 150·270/420 Ω = 66.67 Ω + 96.43 Ω = 163.1 Ω.",
      "<strong>Galvanometreyi geri tak.</strong> Thevenin devresi tek bir ilmektir: I<sub>g</sub> = V<sub>th</sub>/(R<sub>th</sub> + R<sub>g</sub>) = 0.2857 V / 263.1 Ω ≈ 1.086×10⁻³ A = 1.086 mA, B'den D'ye. Galvanometrenin uçlarındaki gerilim I<sub>g</sub>R<sub>g</sub> ≈ 0.109 V'tur, köprüye uygulanan 12 V'un yüzde birinden az.",
      "<strong>Düğüm analiziyle doğrula.</strong> Bilinmeyenler V<sub>B</sub> ve V<sub>D</sub>; B ve D'de KAY yaz: (V<sub>B</sub> − 12)/100 + V<sub>B</sub>/200 + (V<sub>B</sub> − V<sub>D</sub>)/100 = 0 ve (V<sub>D</sub> − 12)/150 + V<sub>D</sub>/270 + (V<sub>D</sub> − V<sub>B</sub>)/100 = 0. Matris biçimi: G = [0.02500 −0.01000; −0.01000 0.02037] S, i = [0.1200; 0.0800] A, det G = 4.093×10⁻⁴ S². Cramer kuralı V<sub>B</sub> = 7.928 V, V<sub>D</sub> = 7.819 V verir; I<sub>g</sub> = 0.1086 V / 100 Ω = 1.086 mA.",
      "<strong>Sayfada dene.</strong> Hazır deney menüsünden “Köprü dengesi: 100, 200, 150, 300 Ω” seçeneğini seç, İç direnç r kaydırıcısını 0.00 Ω'a, R₄ kaydırıcısını bir adım sola, 270 Ω'a çek. Ölçülen I<sub>g</sub> ve Thevenin kutuları 1.086 mA, formül notu V<sub>th</sub> = 286 mV ve R<sub>th</sub> = 163 Ω, düğüm notu B = 7.93 V ve D = 7.82 V gösterir.",
    ],
    result:
      "I<sub>g</sub> ≈ 1.09 mA, B'den D'ye. R₄'teki yüzde 10'luk sapma, 12 V'luk köprüde 0.29 V'luk bir dengesizlik gerilimi doğurur. İç direnci 0.50 Ω'a geri getirirsen sayfa 1.083 mA gösterir: köprünün yaklaşık 175 Ω'luk eşdeğer direnci yanında 0.5 Ω küçük kaldığı için sonuç yalnızca binde üç değişir.",
  },
  misconceptions: [
    {
      myth: "Akım ilk lambada harcanır; sonraki lambalara daha az kalır.",
      truth:
        "Seri bağlı lambaların hepsinden aynı akım geçer: “Özdeş lambalar seri” deneyinde üçünden de 167 mA akar ve her KAY satırı 166.7 − 166.7 mA verir. Akım kollara ayrılınca da kaybolmaz: varsayılan karma devrede A düğümünün satırı 369.2 − 147.7 − 221.5 mA'dir, toplam sıfır. Harcanan akım değil enerjidir: seride her lambada yüklerin potansiyeli 4.00 V düşer (düğümler 12.0, 8.00 ve 4.00 V) ve lambalar bu enerjiyi ışığa ve ısıya çevirir.",
    },
    {
      myth: "Yükü en iyi beslemek için kaynağın iç direnci yükün direncine eşit olmalıdır.",
      truth:
        "En büyük güç teoremi tersine okunmaz: iç direnç r verildiğinde en iyi yükü seçer (R<sub>L</sub> = r), ama yük verildiğinde en iyi iç direnç sıfırdır. Maksimum güç aktarımı devresinde R<sub>L</sub> etiketi 1.00 Ω iken İç direnç r'yi 1.00 Ω'dan 0.50 Ω'a, sonra 0.00 Ω'a indir: Ölçülen yük gücü 36.00 W'tan 64.00 W'a ve 144.0 W'a çıkar, En büyük P<sub>max</sub> kutusu da 'sınırsız (r = 0)' yazar. Kaynağı sen tasarlıyorsan iç direnci olabildiğince küçültürsün; Edison'ın ekibinin 1880'de yaptığı da buydu.",
    },
    {
      myth: "Düğmeye basınca elektronlar pilden lambaya ışık hızıyla koşar.",
      truth:
        "Elektronların ortalama sürüklenme hızı saniyede milimetrenin kesirleri kadardır. Hızla ilerleyen şey alandır: tel boyunca yüzey yükleri yeniden dağılır ve her yerdeki elektronlar neredeyse aynı anda kaymaya başlar; lambayı yakan elektronlar zaten lambanın telindedir. Kirchhoff 1857'de dirençsiz bir telde bu sinyalin ışık hızıyla ilerleyeceğini hesaplamıştı; gerçek kablolarda hız, yalıtkana bağlı olarak bunun bir kesridir. Sayfada Elektronların sürüklenme yönünü göster kutusunu işaretlersen noktalar akıma ters yönde akar; hızları gerçek hız değil, akımla orantılı bir görsel ölçektir.",
    },
    {
      myth: "Paralel kollar birbirinden bağımsızdır; yeni bir lamba eklemek ötekileri etkilemez.",
      truth:
        "Yalnızca iç direnci sıfır olan ideal bir kaynakta doğru. “Özdeş lambalar paralel” deneyinde İç direnç r'yi 0.50 Ω yap, sonra Direnç sayısı menüsünde önce 1'i, ardından 3'ü seç: toplam akım 489.8 mA'den 1.412 A'e çıkar, uç gerilimi 11.76 V'tan 11.29 V'a iner, ilk lambanın gücü 5.76 W'tan 5.31 W'a düşer ve parlaklığı yüzde 96'dan yüzde 89'a iner. Evde güçlü bir cihaz devreye girince ışıkların bir an titremesinin nedeni de budur: hattın ve kaynağın direnci sıfır değildir.",
    },
  ],
  glossary: [
    { term: "Elektrik akımı (I)", definition: "Bir kesitten birim zamanda geçen net yük, I = dQ/dt; birimi amperdir (1 A = 1 C/s)." },
    { term: "Potansiyel fark (gerilim, V)", definition: "İki nokta arasında birim yükün enerjisindeki fark; birimi volttur (1 V = 1 J/C)." },
    { term: "Direnç (R) ve özdirenç (ρ)", definition: "Direnç R = V/I bir elemanın akıma karşı koyuşudur (ohm); özdirenç malzemenin özelliğidir ve R = ρL/A ile telin boyutlarına bağlanır." },
    { term: "EMK (ε) ve iç direnç (r)", definition: "EMK kaynağın birim yüke kazandırdığı enerjidir (açık devredeki uç gerilimi, volt cinsinden; bir kuvvet değil), iç direnç ise kaynağın kendi direncidir ve akım çekildikçe uç gerilimini V = ε − I·r'ye düşürür." },
    { term: "Sürüklenme hızı", definition: "Serbest yüklerin gelişigüzel hareketinin üstüne binen ortalama hız; bakır tellerde tipik olarak 10⁻⁴ m/s mertebesindedir." },
    { term: "Düğüm ve ilmek", definition: "Düğüm iki ya da daha çok elemanın birleştiği bağlantı noktası, ilmek ise devrede başladığı yere dönen kapalı yoldur; KAY düğümlerde, KGY ilmeklerde yazılır." },
    { term: "Thevenin eşdeğeri", definition: "Doğrusal bir ağın iki ucundan bakınca yerine konabilen tek bir V<sub>th</sub> kaynağı ile ona seri tek bir R<sub>th</sub> direnci." },
    { term: "Wheatstone köprüsü", definition: "Dört direncin elmas biçiminde bağlanıp köşegenine galvanometre konduğu düzenek; R₁/R₂ = R₃/R₄ iken galvanometreden akım geçmez ve bilinmeyen bir direnç üç bilinenden bulunur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede devre bir formüller listesidir; üniversitede bir doğrusal cebir problemidir. <strong>Fizik II</strong> dersinde Kirchhoff yasaları elektromanyetizmanın durağan hâlinden çıkarılır: KGY, ∮E·dl = 0'ın; KAY, kararlı akımda yük korunumunun (∇·J = 0) devre biçimidir. <strong>Devre Analizi</strong> dersinde düğüm ve ilmek yöntemleri sistematik hâle gelir; Thevenin ve Norton eşdeğerleri ile <strong>süperpozisyon</strong>, yani her kaynağın etkisini ayrı ayrı hesaplayıp toplamak, doğrusallığın doğrudan sonuçlarıdır. <strong>Sayısal Yöntemler</strong> ya da Lineer Cebir dersinde G·v = i'yi çözen Gauss yok etmesi, LU ayrışımı ve seyrek matris teknikleri öğrenilir. Büyük bir yonga benzetiminde G'nin neredeyse bütün elemanları sıfırdır; işlem yükü bilinmeyen sayısının küpüyle büyüyen yoğun Gauss yok etmesi orada işe yaramaz, bu seyrekliği kullanan yöntemler gerekir.",
      "Sayfanın bilerek dışarıda bıraktığı şey zamandır. Devreye bir kondansatör ya da bobin eklenince Kirchhoff denklemleri diferansiyel denkleme dönüşür: RC devresinde gerilim τ = RC zaman sabitiyle üstel olarak yükselir ve SPICE'ın geçici durum analizi bu denklemleri küçük zaman adımlarıyla çözer. Alternatif akımda direnç yerini karmaşık <strong>empedansa</strong> bırakır, en büyük güç koşulu Z<sub>L</sub> = Z<sub>th</sub>* olur. <strong>Elektronik</strong> dersinde diyot ve transistör gibi doğrusal olmayan elemanlar gelir; SPICE bunları her yinelemede doğrusallaştırıp Newton–Raphson yöntemiyle yine G·v = i biçimine indirger. Ölçek büyüdükçe Kirchhoff'un kendisi de sınırına varır: devrenin boyu sinyalin dalga boyuna yaklaşınca teller iletim hattına dönüşür ve toplu eleman modeli bozulur; bunu <strong>Elektromanyetik Teori</strong> dersinde Maxwell denklemlerinden görürsün.",
    ],
    topics: [
      "Fizik II: akım, direnç ve DC devreler",
      "Devre Analizi: düğüm ve ilmek yöntemleri",
      "Thevenin, Norton ve süperpozisyon",
      "Sayısal Yöntemler: doğrusal sistemler ve LU ayrışımı",
      "SPICE ile devre benzetimi",
      "RC ve RL geçici durumları",
      "Elektronik: doğrusal olmayan elemanlar",
      "Elektromanyetik Teori: iletim hatları",
    ],
  },
  quiz: [
    {
      question:
        "Üç özdeş lamba 12 V'luk ideal bir pile seri bağlı. Lambalardan birinin uçları bir telle birleştirilirse (kısa devre), kalan iki lambanın her biri öncekinin kaç katı güç harcar?",
      options: ["1.5 katı", "2.25 katı", "3 katı", "Değişmez, çünkü akım hep aynıdır"],
      answer: 1,
      explanation:
        "Kısa devre edilen lamba yoldan çıkar ve 12 V artık iki lambaya bölünür: her lambanın gerilimi 4 V'tan 6 V'a, yani 1.5 katına çıkar. Akım da 1.5 katına çıktığından güç (1.5)² = 2.25 katına çıkar. Sayfada “Özdeş lambalar seri” deneyinde Direnç sayısı menüsünü 2'ye indir: 667 mW'lık lambalar 1.50 W'a, parlaklıkları yüzde 11'den yüzde 25'e çıkar.",
    },
    {
      question:
        "Dengedeki bir Wheatstone köprüsünde galvanometreden akım geçmiyor. Aşağıdaki değişikliklerden hangisi dengeyi bozar?",
      options: [
        "EMK'yı iki katına çıkarmak",
        "Galvanometrenin direncini on katına çıkarmak",
        "R₃ ile R₄'ü birlikte iki katına çıkarmak",
        "Yalnızca R₄'ü iki katına çıkarmak",
      ],
      answer: 3,
      explanation:
        "Denge koşulu R₁/R₂ = R₃/R₄ yalnızca oranlara bağlıdır. EMK ve galvanometre direnci bu oranda yer almaz; R₃ ile R₄'ü birlikte ölçeklemek oranı korur. Yalnızca R₄'ü değiştirmek D'nin potansiyelini kaydırır ve B ile D arasında gerilim doğar. Sayfada galvanometre direncini 1 Ω'dan 10 kΩ'a gezdirince akım sıfırda kalır.",
    },
    {
      question:
        "EMK'sı 12 V, iç direnci 0.5 Ω olan bir kaynağa bağlı yük direnci 0.5 Ω'dan 10 Ω'a çıkarılıyor. Ne olur?",
      options: [
        "Yük gücü artar, verim düşer",
        "Yük gücü azalır, verim artar",
        "Yük gücü de verim de artar",
        "İkisi de değişmez",
      ],
      answer: 1,
      explanation:
        "En büyük güç yük direnci iç dirence eşitken aktarılır: 72 W, verim yüzde 50. 10 Ω'da yük yalnızca 13.06 W alır ama kaynağın verdiği enerjinin yüzde 95.2'si yüke gider, çünkü η = R<sub>L</sub>/(R<sub>L</sub> + r) yükle birlikte hep artar. Güç ve verim ayrı hedeflerdir: şebekeler ve şarj aletleri verim için yük direnci iç dirençten çok büyükken çalışır.",
    },
  ],
  next: [
    {
      href: "elektronik-devre.html",
      title: "RC Devresi",
      why: "Bu sayfanın dışarıda bıraktığı zaman: kondansatörlü devrede akım anında değil, τ = RC zaman sabitiyle üstel olarak değişir. Direnç ve Kapasitans kaydırıcılarıyla τ'yu değiştir.",
    },
    {
      href: "alternatif-akim.html",
      title: "Alternatif Akım: RLC ve Rezonans",
      why: "Kaynak yön değiştirince direncin yerini empedans alır; Kirchhoff yasaları fazörlerle aynen sürer ve seri RLC'de f = f₀ olunca empedans R'ye iner.",
    },
    {
      href: "lineer-cebir-ve-ozdegerler.html",
      title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum",
      why: "Her devre çözümü bir G·v = i sistemidir. Çözümlü örnekteki G matrisini Gauss eleme ve rank sekmesine gir; iki pivot da sıfırdan farklıysa rank tamdır ve çözüm tektir: det G ≠ 0'ı satır işlemlerinde görürsün.",
    },
    {
      href: "elektrostatik.html",
      title: "Elektrostatik",
      why: "Gerilim farkının alan diline geç: kaynak yüklerin potansiyelini topla, alanı potansiyelin değişiminden hesapla; potansiyelin sıfır olduğu yerde alanın neden sıfır olmak zorunda olmadığını gör.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 2, 10.3 Kirchhoff's Rules",
      url: "https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules",
      note: "Düğüm ve ilmek kuralları, çok ilmekli devreler için çözümlü örnekler (İngilizce, açık ders kitabı). Sürüklenme hızı ve iletim modeli için aynı kitabın 9.2 Model of Conduction in Metals bölümüne bak.",
    },
    {
      title: "MIT OpenCourseWare · 6.002 Circuits and Electronics (Bahar 2007)",
      url: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/",
      note: "Anant Agarwal'ın giriş düzeyi devre dersi: toplu eleman soyutlaması, düğüm analizi, Thevenin ve Norton; video dersler ve problem setleri (İngilizce).",
    },
    {
      title: "PhET · Devre Kurulum Aracı: DC",
      url: "https://phet.colorado.edu/tr/simulations/circuit-construction-kit-dc",
      note: "Pil, ampul ve dirençlerle kendi devreni kurup ampermetre ve voltmetreyle ölçebildiğin serbest bir simülasyon; bu sayfanın sabit devrelerini tamamlar.",
    },
    {
      title: "Wikipedia · Ohm's law",
      url: "https://en.wikipedia.org/wiki/Ohm%27s_law",
      note: "Tarihçe: Ohm'un termoçiftli deneyi ve x = a/(b + ℓ) bağıntısı, Cavendish'in 1781 deneyleri, kitabın karşılanışı, Drude modeli ve yasanın geçerlilik sınırları (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
