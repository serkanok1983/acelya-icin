window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["elektrikli-araclar"] = {
  slug: "elektrikli-araclar",
  title: "Elektrikli Araçlar: Pilden Tekerleğe Enerji",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Menzili en çok uzatan hız neden saatte 30 kilometre, kışın neden 55? Yolun istediği kuvvetten bataryaya, şarj eğrisinden motor zarfına bir elektrikli aracın enerji hesabını kur ve kuramla karşılaştır.",
  hook:
    "1899 baharında Paris yakınlarında torpido biçimli bir araç saatte 105,88 kilometreye ulaştı; bir otomobil ilk kez 100 km/sa sınırını geçmişti ve gövdesinde benzin deposu değil, akü vardı. Peki elektrikli otomobil sonra neden neredeyse yüz yıl ortadan kayboldu ve onu geri getiren şey neden bir dizüstü bilgisayar pili oldu?",
  bigIdea:
    "Elektrikli araç bir <strong>enerji muhasebesidir</strong>: yolun istediği kuvvet, bataryanın bu gücü verirken ısıya kaptırdığı pay ve frenlerken geri alınabilen kısım aynı deftere, kilometre başına watt-saat olarak yazılır.",
  story: [
    "1881'de Gustave Trouvé, Paris sokaklarında akülü üç tekerlekli bir araç sürdü; 1899'da Belçikalı yarışçı Camille Jenatzy, <em>La Jamais Contente</em> (Hiç Memnun Olmayan) adlı elektrikli aracıyla saatte 105,88 kilometreye çıkarak bir karayolu taşıtıyla 100 km/sa hızı aşan ilk insan oldu. Sık aktarılan bir sayıma göre 1900 yılında ABD'de üretilen yaklaşık 4200 otomobilin en büyük iki dilimi buharlılar ve elektriklilerdi; benzinliler üçüncü sıradaydı. Elektrikli araba sessizdi, kokmuyordu ve kolla çevrilerek çalıştırılmak zorunda değildi; şehir içinde doktorların ve kadınların tercihiydi. Sonra üç şey oldu: 1908'de Ford Model T ucuz seri üretimi başlattı, 1912'de Charles Kettering'in elektrikli marşı benzinli motorun en büyük derdini çözdü ve Teksas petrolü yakıtı ucuzlattı. Kurşun-asit akünün kilogramında 30–40 watt-saat vardı; benzinin kilogramında yaklaşık 12 000 (alt ısıl değer, 43–44 MJ/kg). Kırsala uzanan yollar menzil istiyordu ve 1920'lerde elektrikli otomobil kayboldu.",
    "Geri dönüşün anahtarı bir otomobil fabrikasında değil, kimya laboratuvarlarında döküldü. 1970'lerde Exxon'da çalışan Stanley Whittingham, lityum iyonlarının titanyum disülfür katmanları arasına girip çıkabildiğini gösterdi; lityum metal anotlu bu ilk hücre 2 voltun biraz üstünde gerilim veriyordu. Ne var ki tekrar tekrar şarj edilince lityum iğne gibi dallanıp kısa devre yapabiliyor, hücre alev alabiliyordu. 1980'de Oxford'da John Goodenough katodu lityum kobalt oksit yapıp gerilimi 4 volta çıkardı. 1985'te Japonya'da Akira Yoshino lityum metalini bırakıp iyonları karbon bir anotta sakladı: artık hücrede metalik lityum yoktu ve pil güvenle şarj edilebiliyordu. Sony 1991'de bu tasarımı el kamerası pili olarak piyasaya sürdü. Üçlü 2019 Nobel Kimya Ödülü'nü paylaştı. 1997'de Goodenough'ın Teksas'taki grubu bir de kobaltsız katot önerdi: lityum demir fosfat, bugünün LFP'si.",
    "Otomobil dünyası pilin peşinden yavaş geldi. General Motors'un 1996'daki EV1'i önce kurşun-asit, sonra nikel-metal hidrit kullandı; kiralanan araçlar 2003'te geri toplanıp hurdaya ayrıldı. 2008'de Tesla Roadster, 6831 adet dizüstü bilgisayar pilini (18650 hücre) bir paket hâlinde birleştirip 300 kilometrenin üstünde menzil verdi. 2010'da Nissan Leaf seri üretim elektrikli otomobili sıradan bir alıcıya ulaştırdı. Satış sayıları her yıl değişiyor; değişmeyen, hesabın hâlâ aynı sayıya dayanması. Lityum-iyon hücreler kimyasına göre kilogramda kabaca 100–300 watt-saat taşır. Benzinin 12 000'i yanında bu küçük görünür; ama içten yanmalı motor yakıttaki enerjinin ancak dörtte bir ile üçte birini tekerleğe ulaştırırken, elektrikli aktarma bataryadakinin yüzde 85–90'ını ulaştırır. Bu sayfadaki laboratuvar o muhasebeyi marka ve model olmadan, yalnız fizikle kurar.",
  ],
  core: [
    {
      heading: "Yol ne kadar kuvvet ister?",
      body:
        "Sabit hızla giden bir aracın motoru üç kuvveti yener: havayı yarmanın bedeli olan <strong>hava direnci</strong>, lastiğin her turda ezilip toparlanmasından doğan <strong>yuvarlanma direnci</strong> ve yokuşta ağırlığın yola paralel bileşeni. İlki hızın karesiyle büyür, öbür ikisi hıza bakmaz. Laboratuvarın varsayılan aracında (1800 kg, C<sub>d</sub>·A = 0,60 m², C<sub>rr</sub> = 0,010) düz yolda 90 km/sa = 25 m/s hızda hava 230 N, yuvarlanma 177 N ister; toplam 406 N, kabaca 41 kilogramlık bir yükün ağırlığıdır. Bu kuvveti 25 m/s hızla itmek tekerlekte 10,16 kW eder. Batarya bundan fazlasını verir: aktarma verimi η = 0,90 olduğundan 11,28 kW, üstüne 0,5 kW <strong>yardımcı güç</strong> (ısıtma, soğutma, elektronik) ile 11,78 kW. Gücü hıza bölünce kilometre başına enerji çıkar: 130,9 Wh/km. 60 kWh'lik batarya bu hızda 458 km eder. Bir newtonluk kuvvet bir kilometrede 1 kJ, yani 0,278 Wh harcadığı için kuvvet ile tüketim aslında aynı şeyin iki birimidir.",
      formula:
        "F = ½ρ·C<sub>d</sub>A·v² + C<sub>rr</sub>·m·g·cos θ + m·g·sin θ<br>P<sub>batarya</sub> = F·v/η + P<sub>y</sub><br>Tüketim = P<sub>batarya</sub>/v,  menzil = E/tüketim",
      formulaNote:
        "ρ = 1,225 kg/m³ havanın yoğunluğu, C_d·A sürükleme alanı, θ yol eğiminin açısı (tan θ = eğim/100), P_y yardımcı güç, E kullanılabilir batarya enerjisi. Hava direncini yenen güç F·v olduğundan v³ ile büyür.",
    },
    {
      heading: "En uzun menzilin hızı: bir türev sorusu",
      body:
        "Yavaş giden az harcar; ama ne kadar yavaş? Kilometre başına tüketimi c(v) diye yazalım. Hava payı A·v²/η biçimindedir (A = ½ρ·C<sub>d</sub>A) ve hızla büyür. Hızdan bağımsız yol direnci B bir sabit ekler. Yardımcı güç ise saat gibi işler: araç yavaşladıkça aynı kilometre daha uzun sürer ve P<sub>y</sub>/v payı büyür. Biri artan, öbürü azalan iki terimin toplamının bir dibi vardır; dc/dv = 0 koşulu onu verir. Türevde B kaybolur: en uzun menzil hızı aracın kütlesine ve lastiğine hiç bakmaz. Varsayılan araçta v* = 30,57 km/sa çıkar ve menzil 759 km'ye uzar; 90 km/sa hızdaki 458 km'nin yanında büyük bir fark, ama kimsenin otoyolda gitmeyeceği bir hız. Aynı koşuldan zarif bir yan sonuç düşer: dipte yardımcı gücün kilometre başına payı, hava direnci payının tam <strong>iki katıdır</strong>. Sayfa v* değerini formülü kullanmadan, 5–200 km/sa arasını 0,05 km/sa adımla tarayarak da bulur; iki sayının farkı 0,000 % yazar.",
      formula:
        "c(v) = (A·v² + B)/η + P<sub>y</sub>/v<br>dc/dv = 2A·v/η − P<sub>y</sub>/v² = 0<br>v* = ∛(η·P<sub>y</sub> / (ρ·C<sub>d</sub>A)),  P<sub>y</sub>/v* = 2·A·v*²/η",
      formulaNote:
        "c(v) newton cinsindendir (J/m); 3,6'ya bölününce Wh/km olur. İkinci türev 2A/η + 2P_y/v³ her zaman pozitiftir, yani bulunan nokta gerçekten en küçük tüketimdir. P_y = 0 ise dip kalmaz: tüketim hız düştükçe azalır.",
    },
    {
      heading: "Paket: bir gerilim kaynağı ve bir direnç",
      body:
        "Bir lityum-iyon hücrede Li⁺ iyonları iki elektrotun katmanları arasında gidip gelir (<strong>interkalasyon</strong>); elektronlar elektrolitten geçemediği için dış devreden dolaşır ve motoru çalıştıran da bu dolambaçlı yoldur. Tek hücre 3–4 volt verir, motor yüzlerce volt ister. <strong>Seri</strong> bağlanan hücrelerin gerilimleri, <strong>paralel</strong> bağlananların kapasiteleri toplanır. Laboratuvarın 96s2p paketi (96 seri, 2 paralel, 90 Ah'lik 192 hücre) yarı doluyken 361,4 V, 180 Ah ve 64,85 kWh eder. Her hücrenin 1,2 mΩ'luk <strong>iç direnci</strong> de aynı kurala uyar: seri dirençler toplanır, paralel kollar böler; R = 96 × 1,2/2 = 57,6 mΩ. Yük altında paketin uç gerilimi I·R kadar düşer. 100 kW çekmek bu yüzden 100 000/361,4 ≈ 277 A değil, 290,08 A ister: uç gerilimi 344,7 V'a inmiştir ve hücrelerde 4,85 kW ısı doğar. Şimdi aynı hücreleri 192s1p dizelim: gerilim iki katına, akım tam yarıya iner. Kablo ve bağlantı gibi <strong>direnci sabit</strong> parçalarda ısı dörtte bire düşer. Hücrelerin kendi ısısı ise değişmez, çünkü paketin direnci dört katına çıkmıştır; her hücreden yine aynı akım geçer.",
      formula:
        "V = s·V<sub>hücre</sub>,  Q = p·Q<sub>hücre</sub>,  R = s·r/p<br>P = (V<sub>oc</sub> − I·R)·I  →  I = [V<sub>oc</sub> − √(V<sub>oc</sub>² − 4R·P)] / 2R<br>Isı = I²R,  C-oranı = I/Q",
      formulaNote:
        "V_oc paketin açık devre gerilimi, s seri hücre sayısı, p paralel kol sayısı. Kökün içi eksiye düşerse paket o gücü veremez; en büyük güç V_oc²/4R'dir (varsayılanda 567 kW) ve o noktada enerjinin yarısı ısıya gider.",
    },
    {
      heading: "Şarj neden sonda yavaşlar: sabit akım, sabit gerilim",
      body:
        "Şarj akımını her an üç sınırın en küçüğü belirler: hücrenin (ve kablonun) izin verdiği akım, şarj cihazının güç sınırı ve hücreyi 4,20 voltun üstüne çıkarmama kuralı. Boşa yakın pakette ilk sınır geçerlidir: <strong>sabit akım</strong> evresinde doluluk zamanla doğrusal artar. Varsayılan pakette 2,0 C'lik hücre sınırı 360 A demektir; yüzde 10'dan 80'e 126 Ah gerekir ve 126/360 = 0,35 saat, yani 21,00 dakika sürer. Ama dolan hücrenin açık devre gerilimi yükselir, üstüne akımın I·R'si biner. Uç gerilimi 96 × 4,20 = 403,2 V tavanına yüzde 82,3 dolulukta dayanır. Oradan sonra <strong>sabit gerilim</strong> evresi başlar: akım artık tavan ile açık devre gerilimi arasındaki farkın dirence bölümüdür ve hücre doldukça bu fark erir. Akım sıfıra ancak yaklaşır; bu yüzden şarj 0,05 C'lik bir kesme akımında bitirilir. Sonuç: yüzde 80'den kesmeye kadar (yüzde 99,79) geçen 14,63 dakika, yüzde puan başına ilk bölümün 2,46 katıdır. Gerçek bir batarya yönetim sistemi akımı sıcaklığa ve doluluğa göre bu basit kuraldan daha erken de kısabilir.",
      formula:
        "Sabit akım: t = Q·Δs / I<br>Sabit gerilim: I = (s·4,20 V − V<sub>oc</sub>(SoC)) / R<br>Bitiş: I = 0,05 C",
      formulaNote:
        "Q paket kapasitesi (Ah), Δs doluluk farkı (0–1 arası), I akım (A); t saat çıkar. Yavaş şarjda I·R küçük kaldığından tavana çok geç varılır: 11 kW ile sabit gerilim evresi ancak yüzde 99,4'te başlar.",
    },
    {
      heading: "Motor zarfı: önce sabit tork, sonra sabit güç",
      body:
        "Benzinli motor rölantinin altında çalışamaz; kalkış için debriyaja ve viteslere muhtaçtır. Elektrik motoru dururken bile en büyük torkunu verebilir, bu yüzden çoğu elektrikli araçta tek bir sabit dişli yeter. Düşük devirde torku inverterin verebildiği akım sınırlar ve tork sabittir; güç tork çarpı açısal hız olduğundan devirle doğrusal büyür. Sonra bir tavana çarpar: dönen rotorun sargılarda ürettiği zıt gerilim batarya gerilimine yaklaşır. Denetleyici bu noktadan sonra mıknatıs alanını kısmen bastırarak (<strong>alan zayıflatma</strong>) devri artırmayı sürdürür; güç sabit kalır, tork 1/ω ile düşer. İki bölgenin sınırı <strong>taban hızdır</strong>. Varsayılan motor (300 N·m, 100 kW, dişli 9,0, tekerlek 0,33 m) için ω = P/T = 333 rad/s, yani 3183 dev/dk ve yolda 44,0 km/sa. Kalkışta tekerlekteki kuvvet 7364 N'dur; taban hızın üstünde η·P/v ile azalır. En yüksek hız, bu azalan çekişin büyüyen dirençle kesiştiği yerdir: 216,03 km/sa. Dirençsiz bir hesap 0–100 km/sa için 9,21 s verir; sayfanın dirençle yaptığı integral 9,87 s bulur.",
      formula:
        "v<sub>taban</sub> = (P/T)·r/G<br>F = η·G·T/r  (v ≤ v<sub>taban</sub>),  F = η·P/v  (v &gt; v<sub>taban</sub>)<br>En yüksek hız: A·v³ + B·v = η·P",
      formulaNote:
        "T en yüksek tork, P en yüksek güç, G toplam dişli oranı, r tekerlek yarıçapı, A = ½ρ·C_dA, B hızdan bağımsız yol direnci. Motorun devir sınırı daha düşük bir hızda dolarsa en yüksek hızı o belirler.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın üç sekmesi var: <strong>01 · Direnç ve menzil</strong>, <strong>02 · Batarya ve şarj</strong>, <strong>03 · Motor ve rejenerasyon</strong>. Her sekmede kaydırıcılar, hazır ayar düğmeleri ve kendi sıfırlama düğmesi bulunur; <kbd>R</kbd> tuşu da etkin sekmeyi varsayılanlarına döndürür. Sayfa bir hesap laboratuvarıdır: her ölçülen değerin (tarama, kök bulma, sayısal integral) yanına kapalı biçimli kuram değerini ve aradaki farkı yazar. Üç sekme tek bir aracı paylaşır: üçüncü sekme kütleyi, sürükleme alanını, yuvarlanma katsayısını ve aktarma verimini birinci sekmenin kaydırıcılarından alır, birinci sekmedeki sürüş çevrimi de fren enerjisini üçüncü sekmedeki <strong>Tekerlek → batarya verimi</strong> (varsayılan %85) ile geri kazanır. <strong>Sürüşü sıfırla</strong> ve <strong>Motoru sıfırla</strong> bu ortak değerleri de varsayılana döndürür. Bütün araç, hücre, motor ve şarj değerleri öğretim değeridir; hiçbir modelin ölçülmüş verisi değildir. Sayılar ondalık virgülle yazılır.",
    experiments: [
      {
        title: "En uzun menzil hangi hızda, kış onu nereye taşır?",
        predict:
          "Menzili en çok uzatan hız mümkün olan en düşük hız mıdır? Kabin ısıtması açılınca bu hız artar mı, azalır mı? Yardımcı güç tümüyle kapatılırsa menzil–hız eğrisinin tepesi ne olur?",
        do:
          "01 · Direnç ve menzil sekmesinde Sürüşü sıfırla'ya bas. Bu hızda menzil, En uzun menzil hızı v* (ölçülen: tarama) ve altındaki kuram kartını oku. Hız v kaydırıcısını 50, 90 ve 130 km/sa yap; Tüketim ile Toplam tüketimin yerel eğimi kartlarını not et. Hızı yeniden 90'a getir, sırayla Kış: 3 kW ve Yardımcı güç yok düğmelerine bas.",
        observe:
          "Varsayılanda 90 km/sa hızda tüketim 130,9 Wh/km, menzil 458 km; v* taramada da kuramda da 30,57 km/sa (Menzil: 759 km), v*'da yardımcı pay / hava payı 2,000. Hız 50 → 90 → 130 km/sa olurken tüketim 86,4 → 130,9 → 206,2 Wh/km, menzil 695 → 458 → 291 km, yerel eğim 0,391 → 1,040 → 1,416; hava payının log–log eğimi hep 2,000. Kış: 3 kW ile batarya gücü 14,28 kW, tüketim 158,7 Wh/km, menzil 378 km olur; v* 55,55 km/sa'e çıkar (Menzil: 443 km), oran yine 2,000. Yardımcı güç yok seçilince 90 km/sa için 479 km okunur, v* kartı “İç tepe yok”, kuram kartı “Tanımsız: P_y = 0” yazar.",
        explain:
          "Tüketimde iki karşıt terim var: hava payı v² ile büyür, yardımcı pay 1/v ile. Dip, v*³ = η·P_y/(ρ·C_dA) koşulundadır; yardımcı güç altı katına çıkınca v* yalnız ∛6 ≈ 1,82 katına çıkar. Yerel eğim 1,416 ise hızı yüzde 1 artırmak tüketimi yüzde 1,4 artırır; eğim 2'ye varmaz, çünkü yuvarlanma payı hıza bakmaz. Yardımcı güç sıfırken dip kalmaz; menzil hız düştükçe uzar. Model bilerek yalın: soğukta artan hava yoğunluğu, lastik direnci ve bataryanın azalan enerjisi hesapta yok; kış yalnız 3 kW olarak girer.",
      },
      {
        title: "Şehir mi pahalı, otoyol mu? Cevap mevsime bağlı",
        predict:
          "50 km/sa hızla, yarım kilometrede bir durarak gitmek mi daha çok enerji ister, 120 km/sa hızla kesintisiz gitmek mi? Isıtma 3 kW çekerken sıralama değişir mi? Rejeneratif frenleme hangi çevrimde işe yarar?",
        do:
          "Aynı sekmede Sürüşü sıfırla'ya bas ve Sürüş çevrimi bölümüne in. Hazır şehir çevrimi, bu araç ile Hazır otoyol çevrimi, bu araç kartlarını oku; Çevrim tüketimi ve Aynı hızda kesintisiz seyir kartlarını karşılaştır. Frenlemenin rejeneratif payı kaydırıcısını 0, 70 ve 100 % yap. Payı 70'e geri getir ve yukarıdaki Kış: 3 kW düğmesine bas.",
        observe:
          "Ilımanda şehir çevrimi 137,5 Wh/km (ortalama hız 27,6 km/sa), otoyol çevrimi 188,7 Wh/km. Aynı 50 km/sa hızda durmadan gitmek 86,4 Wh/km tutardı; dur-kalk bunu yüzde 59,3 artırır. Bir durak arasında 26,4 Wh bataryaya döner (fren işinin %59,5'i). Rejeneratif pay 0 → 70 → 100 % olurken şehir 190,4 → 137,5 → 114,9 Wh/km, otoyol 195,8 → 188,7 → 185,6 Wh/km. Kış: 3 kW ile sıra tersine döner: şehir 228,2, otoyol 210,3 Wh/km. Enerji dengesi artığı 0,000000 Wh kalır.",
        explain:
          "Yardımcı güç kilometreyle değil saatle harcanır. Şehir çevriminde araç 0,5 km'yi 65,3 saniyede alır; fazladan 2,5 kW bu sürede 45,3 Wh, yani kilometrede 90,6 Wh eder. Otoyolda aynı 2,5 kW, 622 saniyede kilometre başına yalnız 21,6 Wh ekler. Soğuk bu yüzden en çok yavaş ve duraklı sürüşü vurur. Rejenerasyon yalnız fren yapılan yerde kazandırır: otoyolda 20 km'de tek duruş vardır. Pay yüzde 100 olsa bile fren işinin %85,0'ı döner, çünkü motora giren iş bataryaya tekerlek → batarya verimiyle ulaşır. Bunlar öğretim çevrimidir, resmî test çevrimi değildir.",
      },
      {
        title: "Son yüzde 20 neden uzun sürer, 800 volt neyi değiştirir?",
        predict:
          "150 kW'lık şarjda yüzde 80'den sonrası, yüzde puan başına öncesinden kaç kat yavaştır? Aynı hücreleri iki kat gerilim verecek biçimde dizersen kablodaki ısı ile hücrelerdeki ısı aynı oranda mı azalır?",
        do:
          "02 · Batarya ve şarj sekmesinde Bataryayı sıfırla'ya bas. Akım (ölçülen: ikiye bölme kökü), Hücrelerde ısı I²R ve Kabloda ısı I²R_k kartlarını oku. 800 V sınıfı: 192s1p düğmesine bas; aynı üç kartı ve iki dizilimi karşılaştıran tabloyu oku, sonra 400 V sınıfı: 96s2p ile geri dön. Şarj bölümünde %10 → %80 (ölçülen), %80 → şarj sonu: 0,05 C kesme akımı, Yüzde puan başına süre oranı ve Sabit gerilime geçiş kartlarına bak. Kablo sınırı 250 A düğmesine, ardından yeniden 800 V sınıfı: 192s1p düğmesine bas. Son olarak Bataryayı sıfırla ve AC 11 kW'ı dene.",
        observe:
          "96s2p'de akım 290,08 A (1,61 C), hücre ısısı 4,85 kW, kablo ısısı 1,68 kW. 192s1p'de 145,04 A, yine 4,85 kW ve 0,42 kW. Tabloda 361,4 → 722,9 V, kablo 1683 → 421 W, hücre 4847 → 4847 W; oranlar 2,0000 / 0,5000 / 0,2500 / 1,0000. Şarjda %10 → %80 21,00 dk, %80 → şarj sonu 14,63 dk, oran 2,46 kat; sabit gerilim %82,3'te başlar, şarj %99,79'da biter. Kablo sınırı 250 A ile ilk bölüm 30,24 dk'ya uzar, oran 1,82 kata iner, geçiş %90,4'e kayar; 800 V diziliminde yeniden 21,00 dk olur. AC 11 kW'ta süreler 247,70 ve 77,21 dk, oran 1,10 kat; sabit akım evresi “Yok”.",
        explain:
          "Sabit akımda süre Q·Δs/I'dır: 180 Ah × 0,70 / 360 A = 0,35 saat; 250 A ile 30,24 dk. 192s1p'de kapasite 90 Ah'e iner; 2,0 C sınırı artık 180 A'dir ve kablo darboğaz olmaktan çıkar. Gerilimi ikiye katlamanın kazancı budur: aynı güç yarı akımla taşınır, direnci sabit kabloda ısı dörtte bire iner. Hücrelerin ısısı değişmez, çünkü her hücreden geçen akım aynıdır. Yavaş şarjda I·R küçüktür, gerilim tavanına geç varılır ve son yüzde 20 pek yavaşlamaz. Modelde sıcaklık ve yaşlanma yoktur; bunlar ölçülmüş şarj süreleri değildir.",
      },
      {
        title: "Dişli neyi değiştirir, fren enerjisinin ne kadarı geri gelir?",
        predict:
          "Dişli oranını 9'dan 6'ya indirmek en yüksek hızı artırır mı? 100 km/sa hızdan dururken kinetik enerjinin tamamı bataryaya dönebilir mi; en çok enerjiyi en yumuşak duruş mu geri getirir?",
        do:
          "03 · Motor ve rejenerasyon sekmesinde Motoru sıfırla'ya bas; bu düğme birinci sekmeden gelen araç değerlerini de varsayılana döndürür (kaydırıcıların altındaki not aracı yazar). Taban hız, En yüksek hız (ölçülen: ikiye bölme) ve 0 → 100 km/sa kartlarını oku. Uzun dişli: 6 ve Kısa dişli: 12 düğmelerini dene, sonra Motoru sıfırla. Rejeneratif frenleme bölümünde Kinetik enerji ½mv² ile Bataryaya dönen kartlarını ve duruş tablosunu oku; Yumuşak duruş: 1 m/s² ve Sert duruş: 4 m/s² düğmelerine bas.",
        observe:
          "Varsayılanda taban hız 44,0 km/sa (3183 dev/dk), en yüksek hız 216,03 km/sa (kuramla fark 0,0000 %), 0 → 100 km/sa 9,87 s; dirençsiz kapalı biçim 9,21 s. Uzun dişlide en yüksek hız yine 216,03 km/sa, 0 → 100 ise 11,88 s. Kısa dişlide 0 → 100 9,18 s; ama en yüksek hız 165,88 km/sa'te devir sınırına takılır. Duruşta kinetik enerji 192,9 Wh; bataryaya dönen 138,9 Wh (%72,0); disklere 15,9, dönüşüm kaybına 24,5, hava ve yuvarlanmaya 13,6 Wh gider. Yumuşak duruşta 135,0 Wh (%70,0) döner ve disklere 0,0 Wh gider; sert duruşta 104,2 Wh (%54,0).",
        explain:
          "Sabit güç bölgesinde tekerleğe ulaşan güç η·P'dir; dişli yalnız kalkış kuvvetini ve devir sınırının hızını değiştirir. Frenlemede üç kesinti var: direncin aldığı enerji frene hiç uğramaz; fren gücü 100 km/sa hızda yaklaşık 112 kW'tır ve 80 kW sınırını aşan kısım, hız yaklaşık 69 km/sa'e inene dek diskte ısı olur (bu iki sayı sayfanın P_fren formülünden bizim hesabımız); motora giren işin yüzde 85'i bataryaya varır. Yumuşak duruş diskleri kurtarır ama 385,8 m boyunca dirence 34,1 Wh kaptırır; sert duruşta 61,8 Wh diske gider. En iyisi ikisinin arasındadır. Modelde lastik tutunması yoktur.",
      },
    ],
  },
  wow: [
    {
      title: "100 km/sa hızı ilk aşan araç elektrikliydi",
      body:
        "Camille Jenatzy 1899 baharında (kayıtların çoğuna göre 29 Nisan'da), Paris yakınlarındaki Achères'de <em>La Jamais Contente</em> ile saatte 105,88 kilometreye çıktı. Gövde alüminyum alaşımından torpido biçimindeydi; ne var ki sürücü gövdenin üstünde, rüzgâra açık oturuyordu. Rekor üç yıl elektriklide kaldı; 1902'de onu kıran araç buharlıydı, benzinlinin sırası ancak ondan sonra geldi.",
    },
    {
      title: "Ay'daki ilk otomobil de elektrikliydi",
      body:
        "1971–1972'de Apollo 15, 16 ve 17 astronotları Ay'da elektrikli bir araç sürdü. Lunar Roving Vehicle'ın dört tekerleğinin her birinde yaklaşık 190 wattlık bir doğru akım motoru vardı; enerjisini şarj edilemeyen gümüş-çinko akülerden alıyordu. Apollo 17'de araç 35 kilometreden fazla yol yaptı ve saatte 18 kilometreyle Ay hız rekorunu kırdı. Benzinli bir motor Ay'da zaten çalışamazdı: yakacak oksijen yok.",
    },
    {
      title: "97 yaşında Nobel ve iki katot birden",
      body:
        "John Goodenough 2019'da Nobel Kimya Ödülü'nü aldığında 97 yaşındaydı; o güne kadarki en yaşlı Nobel sahibiydi. Aynı insan 1980'de Oxford'da lityum kobalt oksit katodu bulmuş, 1997'de Teksas'ta kobaltsız alternatifi, lityum demir fosfatı önermişti. Bugün yoldaki elektrikli araçların iki büyük batarya ailesinden LFP doğrudan onun grubundan çıktı; NMC ise aynı katmanlı oksit fikrinin kobaltı nikel ve manganezle seyreltilmiş torunudur.",
    },
  ],
  worked: {
    title: "Kışın en uzun menzil hızı kaça çıkar?",
    prompt:
      "Kütlesi 1800 kg, sürükleme alanı C<sub>d</sub>·A = 0,60 m², yuvarlanma katsayısı 0,010 ve aktarma verimi η = 0,90 olan araç düz yolda sabit hızla gidiyor; kullanılabilir batarya enerjisi 60 kWh. Yardımcı güç ılıman havada 0,5 kW, kışın 3 kW. Kilometre başına tüketimi en küçük yapan hızı türevle bul; iki durumda o hızdaki tüketimi ve menzili hesapla (ρ = 1,225 kg/m³, g = 9,80665 m/s²). Sonucu 01 sekmesinde Sürüşü sıfırla ve Kış: 3 kW düğmeleriyle denetle.",
    steps: [
      "Sabitler: A = ½ρ·C<sub>d</sub>A = 0,5 × 1,225 kg/m³ × 0,60 m² = 0,3675 kg/m. Düz yolda B = C<sub>rr</sub>·m·g = 0,010 × 1800 kg × 9,80665 m/s² = 176,5 N.",
      "Metre başına batarya enerjisi: c(v) = (A·v² + B)/η + P<sub>y</sub>/v; birimi J/m = N. Türev: dc/dv = 2A·v/η − P<sub>y</sub>/v². Sıfıra eşitle: v*³ = η·P<sub>y</sub>/(2A) = η·P<sub>y</sub>/(ρ·C<sub>d</sub>A). B türevde kayboldu; ikinci türev pozitif olduğundan bu bir en küçük değerdir.",
      "Ilıman: v*³ = 0,90 × 500 W / 0,735 kg/m = 612,2 m³/s³, v* = 8,491 m/s = 30,57 km/sa. Tüketim: (0,3675 × 8,491² + 176,5)/0,90 + 500/8,491 = 225,6 N + 58,9 N = 284,5 N. 3,6'ya böl: 79,0 Wh/km. Menzil: 60 000 Wh / 79,0 Wh/km ≈ 759 km.",
      "Kış: v*³ = 0,90 × 3000 W / 0,735 kg/m = 3673 m³/s³, v* = 15,43 m/s = 55,55 km/sa. Tüketim: (0,3675 × 15,43² + 176,5)/0,90 + 3000/15,43 = 293,4 N + 194,4 N = 487,8 N, yani 135,5 Wh/km. Menzil: 60 000/135,5 ≈ 443 km.",
      "Denetim: en uygun hızda yardımcı pay hava payının iki katı olmalı. Ilımanda hava payı 0,3675 × 8,491²/0,90 = 29,4 N, yardımcı pay 58,9 N; kışın 97,2 N ve 194,4 N. İkisi de tutuyor. Ölçekleme de tutuyor: güç 6 katına çıktı, hız ∛6 = 1,817 katına: 30,57 × 1,817 = 55,55 km/sa.",
    ],
    result:
      "En uzun menzil hızı ılımanda 30,57 km/sa (79,0 Wh/km, 759 km), kışın 55,55 km/sa (135,5 Wh/km, 443 km); sayfanın taraması aynı hızları bulur. Kışın 90 km/sa hızda menzil 378 km'dir: yavaşlamanın getirisi ılımandaki 458 → 759 km'den 378 → 443 km'ye iner. Isıtma açıkken oyalanmak pahalıdır; hesap yalnız yardımcı gücü sayar, soğuğun bataryaya ve lastiğe etkisini saymaz.",
  },
  misconceptions: [
    {
      myth: "Ne kadar yavaş gidersem menzil o kadar uzar.",
      truth:
        "Yalnız bir yere kadar. Isıtma, soğutma ve elektronik kilometreyle değil saatle harcar; çok yavaş giden araç aynı yolu daha uzun sürede alır ve bu payı büyütür. Varsayılan araçta dip 30,57 km/sa hızdadır; 3 kW ısıtmayla 55,55 km/sa'e çıkar. Yardımcı güç sıfır olsaydı söz doğru olurdu.",
    },
    {
      myth: "800 volt mimaride bütün I²R kayıpları dörtte bire iner.",
      truth:
        "Dörtte bire inen, direnci sabit kalan parçaların ısısıdır: kablo, bağlantı, bara. Aynı hücreleri iki kat seri, yarı paralel dizdiğinde paketin iç direnci dört katına çıkar ve akımın yarıya inmesini tam götürür; hücrelerin ısısı aynı kalır. Sayfa iki oranı da ölçer: kabloda 0,2500, hücrelerde 1,0000.",
    },
    {
      myth: "Batarya 75 kW, şarj cihazı 11 kWh.",
      truth:
        "Tersi. kWh enerjinin, kW gücün birimidir: kWh bir deponun büyüklüğü, kW musluktan akan suyun hızıdır. Süre ikisinin oranıdır, ama yalnız güç sabit kaldıkça: sayfadaki 64,85 kWh'lik paket 150 kW'lık cihazda yüzde 10'dan 80'e 21,00 dakikada gelir, kalan yüzde 20 için 14,63 dakika daha ister.",
    },
    {
      myth: "Rejeneratif fren, harcanan enerjiyi geri verir; dur-kalk bedavaya gelir.",
      truth:
        "Motor yalnız daha önce harcanmış kinetik enerjinin bir kısmını geri alır. 1800 kg'lık aracı 100 km/sa hızdan durdururken 192,9 Wh'in 138,9 Wh'i (yüzde 72,0) bataryaya döner; gerisini hava ve yuvarlanma direnci, güç sınırını aşınca devreye giren diskler ve dönüşüm kaybı alır. Hızlanırken bataryadan çıkan 231,6 Wh'tir; bir kalkış ve duruşun net bedeli 92,7 Wh olur.",
    },
  ],
  glossary: [
    { term: "SoC (doluluk oranı)", definition: "Bataryada kalan yükün tam kapasiteye oranı; yüzde ile yazılır." },
    { term: "Tüketim (Wh/km)", definition: "Bataryadan çekilen gücün hıza bölümü; bir kilometre için harcanan enerji." },
    { term: "Sürükleme alanı (C_d·A)", definition: "Sürükleme katsayısı ile ön alanın çarpımı; hava direnci kuvvetini belirleyen, metrekare birimli tek sayı." },
    { term: "Yardımcı güç", definition: "Aracı itmeye değil ısıtma, soğutma ve elektroniğe giden, hızdan bağımsız batarya gücü." },
    { term: "C-oranı", definition: "Akımın kapasiteye oranı; 1 C bataryayı bir saatte, 2 C yarım saatte dolduran ya da boşaltan akımdır." },
    { term: "İç direnç", definition: "Hücrenin içinden akım geçerken gerilimi düşüren ve I²R kadar ısı üreten direnç; pakette s·r/p olur." },
    { term: "Sabit akım–sabit gerilim (CC–CV)", definition: "Hücre gerilim tavanına varana dek akımın, vardıktan sonra gerilimin sabit tutulduğu şarj kuralı." },
    { term: "Taban hız", definition: "Motorun sabit tork bölgesinden sabit güç bölgesine geçtiği hız; P/T açısal hızına karşılık gelir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu laboratuvarın her sekmesi üniversitede bir derse açılır. En uzun menzil hızı <strong>Kalkülüs</strong>'ün ilk eniyileme problemlerinden biridir; sürükleme kuvveti <strong>Fizik I</strong>'de, daha derini <strong>Akışkanlar Mekaniği</strong>'nde işlenir. Hücre gerilimi <strong>elektrokimyada</strong> Nernst denklemiyle hesaplanır; iyonların grafit katmanlarına girişi katı hâl fiziği ve difüzyon denklemleridir. Sayfanın tek dirençli paket modeli, <strong>Devre Analizi</strong>'ndeki Thévenin eşdeğeridir; gerçek hücre modellerine zamana yayılan gerilim tepkisi için direnç–kondansatör kolları eklenir. İnverter <strong>güç elektroniğinin</strong> alanıdır: transistörler saniyede on binlerce kez açılıp kapanarak (darbe genişlik modülasyonu) doğru akımdan sinüs çizer. Motoru yöneten alan yönelimli kontrol, üç fazlı akımı iki eksene indirgeyen Clarke ve Park dönüşümlerine dayanır: lisede öğrendiğin vektör bileşenleri ve döndürme matrisleri burada tork olur.",
      "Batarya yönetim sisteminin doluluk kestirimi başlı başına bir kontrol kuramı problemidir: gerilim ölçümü gürültülü, akım integrali zamanla kayar; ikisini birleştiren <strong>Kalman filtresi</strong> aynı zamanda uzay araçlarının ve telefonların konum bulmasında kullanılır. Sayfanın yok saydıkları da birer derstir: hücrenin ısınması ve soğutulması ısı transferi, kapasitenin çevrimle azalması malzeme bilimi, lastiğin yola tutunması taşıt dinamiği. Daha geniş ölçekte elektrikli araç bir sistem mühendisliği sorusudur: kaç kilometre menzil için kaç kilo batarya, kaç kilovat şarj için hangi şebeke, hangi madenler, hangi geri dönüşüm. Tek bir aracı anlamak, enerji sisteminin tamamına bakmayı öğretir.",
    ],
    topics: ["Tek değişkenli eniyileme (Kalkülüs)", "Elektrokimya ve Nernst denklemi", "Thévenin eşdeğeri ve hücre devre modelleri", "Güç elektroniği ve PWM", "Alan yönelimli motor kontrolü (Clarke–Park dönüşümleri)", "Kalman filtresi ve durum kestirimi", "Isı transferi ve termal yönetim"],
  },
  quiz: [
    {
      question: "Varsayılan araçta yardımcı güç 0,5 kW iken en uzun menzil hızı 30,57 km/sa. Yardımcı güç 8 katına, 4 kW'a çıkarsa bu hız ne olur?",
      options: ["Değişmez; 30,57 km/sa", "61,14 km/sa", "86,5 km/sa", "244,6 km/sa"],
      answer: 1,
      explanation: "v* = ∛(η·P_y/(ρ·C_dA)) olduğundan hız, yardımcı gücün küp köküyle ölçeklenir: ∛8 = 2 ve 2 × 30,57 = 61,14 km/sa. Karekök alan 86,5'i, doğru orantı kuran 244,6'yı bulur. Sayfada Yardımcı güç P_y kaydırıcısını 4,0 kW yaparak denetleyebilirsin.",
    },
    {
      question: "96s2p paket aynı hücrelerle 192s1p olarak yeniden diziliyor ve yine 100 kW veriyor. Direnci 20 mΩ olan kablodaki ısı ile hücrelerdeki ısı için hangisi doğrudur?",
      options: ["İkisi de dörtte bire iner", "İkisi de yarıya iner", "Kablo ısısı dörtte bire iner, hücre ısısı değişmez", "Kablo ısısı değişmez, hücre ısısı dörtte bire iner"],
      answer: 2,
      explanation: "Gerilim iki katına, akım yarıya iner. Kablonun direnci sabit olduğundan ısısı (½)² = ¼ olur: 1683 W'tan 421 W'a. Paketin iç direnci ise s·r/p kuralıyla dört katına çıkar (57,6 → 230,4 mΩ); (½)² × 4 = 1 ve hücre ısısı 4847 W olarak kalır. Hücre açısından bakarsan: her hücreden geçen akım aynıdır.",
    },
    {
      question: "Varsayılan motorda toplam dişli oranı 9'dan 6'ya indirilirse (Uzun dişli) en yüksek hız ve 0 → 100 km/sa süresi nasıl değişir?",
      options: ["En yüksek hız değişmez, 0 → 100 süresi uzar", "En yüksek hız 1,5 katına çıkar, süre değişmez", "İkisi de değişmez", "En yüksek hız üçte ikisine iner, süre kısalır"],
      answer: 0,
      explanation: "En yüksek hız sabit güç bölgesindedir; orada tekerleğe giden güç η·P'dir ve dişli oranını içermez, kök 216,03 km/sa olarak kalır. Dişli küçülünce kalkış kuvveti η·G·T/r 7364 N'dan 4909 N'a düşer ve 0 → 100 süresi 9,87 s'den 11,88 s'ye uzar. Devir sınırı 331,8 km/sa'e çıktığı için engel olmaz.",
    },
  ],
  next: [
    { href: "elektrokimya.html", title: "Elektrokimya Laboratuvarı: Hücre, Nernst, Faraday", why: "Buradaki hücre eğrisi hazır verildi; gerilimin nereden geldiğini görmek için dokuz yarı hücreden anot ile katodu kendin seç, derişimi değiştir ve Nernst geriliminin nasıl kaydığını izle." },
    { href: "elektrik-muhendisligi.html", title: "Elektrik Mühendisliği: Güç, İletim ve Dönüşüm", why: "800 volt dersinin şebekedeki karşılığı: iletim gerilimini yükseltince hat kaybının nasıl düştüğünü ölç, üç fazlı gücü ve transformatörü incele." },
    { href: "otomotiv-muhendisligi.html", title: "Otomotiv Mühendisliği: Motor, Aktarma ve Araç Dinamiği", why: "Aynı çekiş kuvveti–direnç kesişimini bu kez vitesli, içten yanmalı bir aktarmayla kur; krank-biyel mekanizmasını, durma mesafesini ve viraj sınırlarını sına." },
    { href: "termodinamik.html", title: "Termodinamik: PV Diyagramı, İş, Isı ve Çevrimler", why: "Benzinli motorun yakıttaki enerjinin çoğunu neden tekerleğe ulaştıramadığını Otto ve Carnot çevrimlerinin veriminde gör." },
  ],
  sources: [
    { title: "Nobel Prize · Chemistry 2019 (Goodenough, Whittingham, Yoshino)", url: "https://www.nobelprize.org/prizes/chemistry/2019/summary/", note: "Lityum-iyon pilin icat öyküsü ve üç bilim insanının katkıları, resmî özet (İngilizce)." },
    { title: "OpenStax · University Physics Vol. 1, 6.4 Drag Force and Terminal Speed", url: "https://openstax.org/books/university-physics-volume-1/pages/6-4-drag-force-and-terminal-speed", note: "Laboratuvarın kullandığı sürükleme kuvveti F = ½CρAv² ve sürükleme katsayısı; açık ders kitabı (İngilizce)." },
    { title: "Wikipedia · Energy density", url: "https://en.wikipedia.org/wiki/Energy_density", note: "Benzin (tabloda yaklaşık 46 MJ/kg; defterdeki 43–44 MJ/kg alt ısıl değer için yaygın kullanılan aralıktır) ile pillerin özgül enerjilerini aynı tabloda karşılaştırır (İngilizce)." },
    { title: "Wikipedia · Lithium-ion battery", url: "https://en.wikipedia.org/wiki/Lithium-ion_battery", note: "Hücre kimyası, icadın kronolojisi (Whittingham, Goodenough, Yoshino, Sony 1991), özgül enerji aralığı ve sabit akım–sabit gerilim şarjı; kaynaklı ayrıntılı madde (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
