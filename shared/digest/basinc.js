window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["basinc"] = {
  slug: "basinc",
  title: "Basınç: Derinlik, Pascal ve Hava Okyanusu",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Durgun bir akışkanda basınç yalnızca derinliğe bağlıdır; kabın biçimi de içindeki sıvının miktarı da bunu değiştirmez. Aynı kural Torricelli'nin cıva tüpünü, hidrolik krikoyu ve Everest'teki ince havayı açıklar.",
  hook:
    "Avucunun içine şu an yaklaşık bin newtonluk bir kuvvetle hava bastırıyor: 100 kilogramlık bir kütlenin ağırlığı kadar. Elin ezilmiyor, çünkü aynı basınç avucunu alttan ve yanlardan da itiyor. On metre suyun altına inince bu yük neredeyse ikiye katlanır; suyun ince bir boruda mı, koca bir gölde mi durduğu ise hiç fark etmez. Basınç neden yalnızca derinliği sayar?",
  bigIdea:
    "Durgun bir akışkanda basınç yalnızca derinlikle değişir, <em>dP/dz = −ρg</em>: kabın biçimi taban basıncını değiştirmez, kapalı bir akışkanın bir noktasına eklenen basınç her noktasına aynen iletilir ve barometredeki sıvı sütunu, üstündeki hava okyanusunun ağırlığını tartar.",
  story: [
    "1638'de yayımlanan <em>İki Yeni Bilim</em>'de Galileo, Sagredo'ya bir sarnıç tulumbasını anlattırır: su belli bir düzeyin altına inince tulumba çalışmayı bırakmış. Çağrılan usta tulumbada kusur olmadığını, emerek çalışan hiçbir makinenin suyu on sekiz braccio'dan (yaklaşık 10.5 m) bir kıl payı bile yukarı kaldıramayacağını söylemiş. Galileo sayıyı kabul etti ama nedeni yanlış yorumladı: su sütununun, fazla uzatılan bir halat gibi kendi ağırlığıyla koptuğunu düşündü. Galileo'nun son aylarında yanında çalışan ve ölümünden sonra yerine atanan Evangelista Torricelli soruyu tersine çevirdi: suyu borunun içine çeken bir şey yoksa, onu dışarıdan iten bir şey vardır. 1643'te onun tasarladığı deneyde bir ucu kapalı, cıvayla dolu bir cam tüp cıva çanağına ters çevrildi. Cıva yaklaşık 76 cm'de durdu ve tepesinde kayıtlara geçen ilk kalıcı boşluk belirdi. Cıva sudan 13.6 kat yoğun olduğundan sütun, tulumbanın on metresinden tam o kadar kısaydı. Torricelli 11 Haziran 1644'te Michelangelo Ricci'ye yazdığı mektupta sonucu tek cümleye sığdırdı: 'Bir hava okyanusunun dibinde, içine gömülü yaşıyoruz.'",
    "Paris'te genç Blaise Pascal bu fikri sınamanın yolunu düşündü: hava gerçekten bir okyanussa, bir dağın tepesinde insanın üstünde daha az hava kalır ve cıva sütunu kısalmalıdır. Deneyi Auvergne'de yaşayan eniştesi Florin Périer üstlendi. 19 Eylül 1648 sabahı Périer, Clermont'taki Minimler manastırının bahçesinde iki tüpte cıvayı yaklaşık 71.2 cm ölçtü. Tüplerden birini yerinde bırakıp gün boyu gözlemesi için manastırın rahiplerinden Peder Chastin'e emanet etti; öbürüyle tanıklar eşliğinde, kendi tahminine göre manastırdan bir kilometre kadar yüksekteki Puy de Dôme'un tepesine çıktı. Orada cıva yaklaşık 62.7 cm'de durdu: 8.5 cm, yüzde 12'ye yakın bir düşüş. Ölçümü zirvede beş kez daha, rüzgârda, sisin içinde ve küçük şapelin çatısı altında yineledi; sonuç değişmedi. Aşağıda bırakılan tüp ise, hava gün boyu yağmurla sis arasında gidip geldiği hâlde hiç değişmemişti: deneyin bir denetim tüpü vardı. Pascal haberi alınca Paris'teki yaklaşık 50 metrelik Saint-Jacques kulesinde denedi ve 4.5 mm'den fazla bir fark buldu. Barometre artık hem havayı hem yüksekliği ölçen bir aletti.",
    "Pascal sıvılara da aynı gözle baktı. 1650'lerin başında yazdığı, ölümünden bir yıl sonra, 1663'te yayımlanan <em>Sıvıların Dengesi Üzerine İnceleme</em>'de 'kuvvetleri çoğaltan yeni bir makine' tarif etti: her yanı kapalı, su dolu bir kabın biri öbüründen yüz kat geniş iki ağzı varsa, küçük pistonu iten bir adam büyüğünü iten yüz adamı dengeler. Bedelini de hemen yazdı: küçük piston bir pus inerse büyüğü ancak yüzde biri kadar kalkar; yol, kuvvetle aynı oranda artar. Bu sayfanın hidrolik kaldıracındaki alan oranı da tam 100'dür. Makineyi sanayiye, 1795'te patentini alan İngiliz mucit Joseph Bramah taşıdı; bugün kriko, fren, ekskavatör ve pres aynı ilkeyle çalışır. Çok anlatılan 'Pascal'ın fıçısı' ise başka bir şeydir: su dolu bir fıçıya takılan uzun, ince boruya birkaç bardak su dökülünce fıçının patladığı öykü Pascal'ın korunmuş yazılarında geçmez; 19. yüzyıl Fransız yazarlarının 'crève-tonneau' (fıçı patlatan) adıyla anlattığı bir söylencedir. Fiziği yine de doğrudur ve sayfadaki dar boyunlu şişe onu sınar.",
  ],
  core: [
    {
      heading: "Basınç: alan başına kuvvet, her yöne aynı",
      body:
        "Basınç, bir yüzeye dik etkiyen kuvvetin o yüzeyin alanına oranıdır. Aynı ağırlık küçük bir alana binince basınç büyür: 60 kilogramlık biri 1 cm²'lik bir topuğa bütün ağırlığıyla basarsa altındaki basınç 5.9 MPa, yani 58 atmosfer olur. Durgun bir akışkanın ayırt edici yanı, kayma gerilmesi taşıyamamasıdır: teğet bir kuvvet görünce akar. Bu yüzden durgun akışkanın bir yüzeye uyguladığı kuvvet her zaman o yüzeye diktir. Akışkanın içinden üçgen kesitli küçük bir kama ayırıp üç yüzündeki kuvvetleri dengelersen, kama küçüldükçe ağırlığı (boyutun küpüyle) yüzey kuvvetlerinden (boyutun karesiyle) hızla küçülür ve geriye P<sub>x</sub> = P<sub>y</sub> = P<sub>n</sub> kalır: bir noktadaki basınç yöne bağlı değildir. Basınç bu yüzden bir skalerdir; kuvvete yönünü, üzerine bastığı yüzey verir. Sayfadaki sondanın sekiz oku bunun için eşit boydadır.",
      formula: "P = F<sub>⊥</sub>/A",
      formulaNote:
        "1 Pa = 1 N/m². Deniz düzeyindeki 1 atm = 101 325 Pa, santimetrekare başına 10.1 N eder: 1 cm²'lik bir parmak ucuna 1 kilogramlık bir kütlenin ağırlığı kadar hava basar.",
    },
    {
      heading: "Hidrostatik denklem: her metre derinlik ρg ekler",
      body:
        "Durgun bir sıvının içinden kesit alanı A, kalınlığı dz olan yatay, ince bir dilim düşün. Dilim alttan P(z)·A ile itilir, üstten P(z + dz)·A ile bastırılır, ağırlığı ρg·A·dz'dir. Kıpırdamadığına göre üç kuvvet dengededir; A sadeleşir ve geriye <strong>hidrostatik denklem</strong> kalır. Yoğunluk sabitse integral hemen alınır: yüzeyden h derinlikte P = P₀ + ρgh. Basınç yatayda değişmez; aynı akışkanın içinden birbirine bağlı, aynı düzeydeki bütün noktalarda aynıdır. P–h grafiği eğimi ρg olan bir doğrudur: tatlı suda 9.790 kPa/m, yani her 10.35 metre bir atmosfer ekler; cıvada eğim 132.769 kPa/m'dir. U-tüpü manometresi bu kuralın uygulamasıdır: iki koldaki A ve B noktaları aynı sıvının içinde ve aynı düzeydeyse üstlerindeki sütunlar eşit basınç yapar, ρ₁gh₁ = ρ₂gh₂. <strong>Mutlak basınç</strong> boşluğa göre, <strong>gösterge basıncı</strong> P − P₀ ise atmosfere göre ölçülür; lastik basınç ölçeri de tansiyon aleti de göstergedir.",
      formula: "dP/dz = −ρg   ⇒   P(h) = P₀ + ρgh",
      formulaNote:
        "z yukarı doğru yüksekliktir, h serbest yüzeyden aşağı doğru derinlik. İkinci biçim yalnızca ρ ve g sabitken geçerlidir; havada ρ basınçla birlikte değişir.",
    },
    {
      heading: "Hidrostatik paradoks: farkı duvarlar öder",
      body:
        "Taban alanları ve su yükseklikleri aynı üç kap düşün: düz bir silindir, yukarı doğru genişleyen bir koni, dar boyunlu bir şişe. Üçünün de tabanındaki basınç ρgH, taban kuvveti ρgH·A'dır. Oysa sayfadaki konide su silindirdekinin 3.6 katı, şişede üçte birinden biraz fazlası kadardır. Çelişkiyi duvarlar çözer. Akışkan her duvara dik bastırır; Newton'un üçüncü yasasıyla duvar da akışkanı dik iter. Silindirin düşey duvarı yalnızca yatay iter. Koninin yatık duvarı suyu yukarı iter ve ağırlığın bir kısmını taşır; şişenin omzu suyu aşağı bastırır ve tabana ağırlığından fazla yük bindirir. Akışkanlar mekaniğinin kısa kuralı: eğik bir yüzeyin düşey kuvveti, o yüzeyle serbest yüzey düzeyi arasındaki (gerçek ya da hayalî) sıvı sütununun ağırlığına eşittir. Teraziyi ilgilendiren ise taban kuvveti değil, kabın ve sıvının toplam ağırlığıdır: duvar kuvvetleri kabın malzemesinden geçip tartıya ulaşır.",
      formula: "F<sub>taban</sub> + F<sub>duvar,z</sub> = W,   F<sub>duvar,z</sub> = ∫ ρg(H − y) dA(y)",
      formulaNote:
        "A(y), y yüksekliğindeki yatay kesit alanıdır. Kap yukarı genişliyorsa dA > 0 ve duvar sıvıyı yukarı iter; daralıyorsa dA < 0 ve aşağı bastırır. Gösterge basıncı kullanılır: P₀ hem serbest yüzeye hem kabın dışına etkiyip sadeleşir.",
    },
    {
      heading: "Pascal ilkesi: kuvvet kazanılır, iş kazanılmaz",
      body:
        "P = P₀ + ρgh'de yüzeydeki P₀'ı artırırsan sıvının her noktasındaki basınç aynı miktarda artar. <strong>Pascal ilkesi</strong> budur: kapalı, durgun ve sıkıştırılamaz bir akışkanda bir noktaya eklenen basınç her noktaya ve kabın bütün duvarlarına azalmadan iletilir. Küçük pistona F₁ uygularsan yağa F₁/A₁ kadar basınç eklenir; bu basınç büyük pistonu A₂ alanıyla iter ve F₂ = F₁·A₂/A₁ doğar. Çapı on kat büyük piston kuvveti yüz kat büyütür. Bedeli yoldur: yağ sıkışmadığından küçük pistonun ittiği A₁Δx₁ hacmi büyük silindire geçer ve A₂Δx₂'ye eşittir. Kuvvet çarpı yol, yani iş, iki yanda aynıdır; kaldıraç ve makara da aynı takası yapar. Gerçek bir krikoda her vuruştan sonra çek valf yükü tutar, pompa depodan yeniden yağ emer. Sayfa bir ayrıntıyı daha hesaba katar: büyük silindirde yükselen yağ sütunu da bir ağırlıktır ve araç 10 cm kalktığında gereken kuvveti binde dört artırır.",
      formula: "F₂/F₁ = A₂/A₁ = (d₂/d₁)²,   A₁Δx₁ = A₂Δx₂,   F₁Δx₁ = F₂Δx₂",
      formulaNote:
        "d₁ ve d₂ piston çaplarıdır. Sayfanın varsayılanı 3 cm ve 30 cm: oran 100, 1500 kg'lık aracı (14.7 kN) 147.2 N tutar; karşılığında her 10 cm'lik vuruş aracı 1 mm kaldırır.",
    },
    {
      heading: "Hava okyanusu: barometre ve ölçek yüksekliği",
      body:
        "<strong>Torricelli barometresinde</strong> ters çevrilmiş tüpün tepesi boştur ve sütunu dışarıdaki hava basıncı taşır: h = P/(ρg). Deniz düzeyinde bu, cıvada 760 mm, suda 10.3 m eder. Hava ise sıkışır; yoğunluğu basınçla birlikte azalır. İdeal gaz yasasından ρ = PM/(RT) yazıp hidrostatik denkleme koyunca dP/P = −dz/H çıkar; H = RT/(Mg) <strong>ölçek yüksekliğidir</strong>. Sıcaklık sabitse çözüm üsteldir: her H yükselişte basınç e ≈ 2.718 kat düşer; 15 °C'de H = 8.43 km. Bu sayı, hava deniz düzeyindeki yoğunluğunda (1.225 kg/m³) sıkıştırılamaz olsaydı atmosferin kalınlığına da eşittir: P₀/(ρ₀g). Gerçek troposfer her kilometrede yaklaşık 6.5 K soğur; <strong>Uluslararası Standart Atmosfer</strong> (ISA) bu düşüşü içerir. Soğuk hava aynı basınçta daha yoğun olduğundan basınç izotermal modelin öngördüğünden hızlı düşer: Everest'te ISA 31.44 kPa, izotermal model 35.49 kPa verir. Sayfadaki formül yalnızca 0–11 km için geçerli, ortalama bir modeldir; hava durumunu ve enlemi bilmez.",
      formula: "P = P₀e<sup>−z/H</sup>,  H = RT/(Mg);   ISA: P = P₀(1 − Lz/T₀)<sup>g₀M/(RL)</sup>",
      formulaNote:
        "T₀ = 288.15 K, L = 6.5 K/km, M = 0.02896 kg/mol, g₀ = 9.80665 m/s²; üs g₀M/(RL) = 5.256. L → 0 limitinde ISA formülü izotermal üstele döner.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var ve bağlantıyla doğrudan açılırlar: <code>#derinlik</code>, <code>#utup</code>, <code>#hidrolik</code>, <code>#barometre</code>. <strong>Derinlik ve kap biçimi</strong>nde Sıvı ve Kap biçimi menüleri, Sıvı yüksekliği H ve Sonda derinliği h kaydırıcıları var; sondayı sıvının içinde sürükleyebilirsin. Tablo, kabı 0.5 mm'lik yatay halkalara bölüp yaptığı sayısal toplamı kapalı formülle karşılaştırır. <strong>U-tüpü manometre</strong>de Sıvı çifti menüsü ve iki hacim kaydırıcısı var: sıvı dökülür, salınır, dengeye gelir; okumayı Durum kartı 'Dengede' yazınca yap. <strong>Hidrolik kaldıraç</strong>ta kütleyi, piston çaplarını, kursu ve hedefi seçip Bir vuruş ya da Hedefe kadar pompala düğmesine basarsın; giren iş ∫F₁dx₁ küçük adımlarla toplanır. <strong>Barometre ve yükseklik</strong>te İrtifa z kaydırıcısı, hazır irtifa düğmeleri, cıvanın sıcaklığı menüsü ve su buharı kutusu var; basınç hem ISA formülüyle hem hidrostatik denklemin sayısal tümlemesiyle hesaplanır. Sıvı sütunlarında g = 9.81 m/s², atmosfer modelinde standart g₀ = 9.80665 m/s² kullanılır. <kbd>R</kbd> açık sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Kabın biçimi taban basıncını değiştirir mi?",
        predict:
          "Silindirde 10 m su var. Aynı taban alanlı, yukarı doğru genişleyen bir koniye geçince su 3.6 kat artar. Tabandaki basınç ve taban kuvveti de artar mı? Dar boyunlu şişede su üçte birin biraz üstüne inince ne olur?",
        do: "Varsayılan ayarlarda (Tatlı su, Silindir, H = 10.0 m) sondayı sıvının içinde yatay sürükle ve Mutlak basınç kartını izle; sonra Sonda derinliği h'yi 10.00 m'ye getir. Ardından Kap biçimi menüsünden sırayla Yukarı genişleyen koni, Dar boyunlu şişe ve Eğik tüp'ü seç; her birinde taban kuvvetini, sıvının ağırlığını ve tablodaki duvar kuvvetini oku.",
        observe:
          "5.00 m'de sonda 150.3 kPa (1.483 atm) gösterir; yatay sürükleyince sayı kıpırdamaz. 10.00 m'de 199.2 kPa = 1.966 atm, gösterge basıncı 97.9 kPa. Dört kapta da taban kuvveti 307.6 kN'dur. Ağırlık W silindirde 307.6 kN, konide 1.105 MN, şişede 113.0 kN, eğik tüpte 307.6 kN; F<sub>taban</sub>/W 1.000, 0.278, 2.723 ve 1.000. Duvarların düşey kuvveti 0.0 N, +797.4 kN, −194.6 kN ve 0.0 N; F<sub>taban</sub> + F<sub>duvar</sub> − W satırı hep 0.0 N.",
        explain:
          "Basınç yalnızca derinliğe bağlıdır: tabanda ρgH = 97.9 kPa her kapta aynıdır, taban alanı da ortak olduğundan taban kuvveti de. Farkı duvarlar kapatır. Koninin yatık duvarı, tam üstündeki 'sarkan' suyun ağırlığını (797.4 kN) yukarı iterek taşır; şişenin omzu suyu 194.6 kN ile aşağı bastırır, bu yüzden taban ağırlığın 2.7 katını görür. Eğik tüpte sarkan ve karşı duvarların kuvvetleri birbirini götürür; eksen boyunca uzanan 10.64 m'lik sütun değil, 10 m'lik düşey derinlik sayılır.",
      },
      {
        title: "Bilinmeyen yağı tartmadan tart",
        predict:
          "U-tüpüne önce 80 mL su, sonra sağ koldan 30 mL yağ dökülüyor. Denge gelince hangi koldaki yüzey daha yüksekte durur? Yağ zeytinyağından (915 kg/m³) hafifse iki yüzey arasındaki fark büyür mü, küçülür mü?",
        do: "U-tüpü manometre sekmesinde Sıvı çifti Su + zeytinyağı iken Durum kartı 'Dengede' yazana dek birkaç saniye bekle; h₁, h₂ ve Serbest yüzeyler arası farkı oku. Sonra Su + bilinmeyen yağ'ı seç, ölçümü yinele, ρ₂ = ρ₁h₁/h₂'yi kendin hesapla ve en sonda Gerçek değeri göster düğmesine bas.",
        observe:
          "Zeytinyağında h₁ = 13.75 cm, h₂ = 15.00 cm; yağın yüzeyi suyunkinden 1.25 cm yukarıdadır ve durum satırı 998 × 13.75 / 15.00 = 915 kg/m³ yazar (Fark 0.00 %). Bilinmeyen yağda h₁ 12.93 cm'ye iner, fark +2.07 cm'ye çıkar; tablo 860 kg/m³ ölçer, gerçek değer düğmeye basana dek '?' kalır, sonra 860 kg/m³ görünür. P<sub>A</sub> − P<sub>B</sub> 0.0 Pa'ya iner; salınım periyodu iki çiftte 1.090 s ve 1.082 s'dir, ölçülen ve kuramsal değer aynı.",
        explain:
          "A ve B aynı sıvının (suyun) içinde ve aynı düzeyde olduğundan basınçları eşittir; üstlerindeki sütunlar da eşit basınç yapmalıdır: ρ₁gh₁ = ρ₂gh₂. Hafif yağ aynı basıncı daha uzun bir sütunla verir, bu yüzden yüzeyi yukarıda kalır. Elle hesap 998 × 12.93 / 15.00 = 860.3 kg/m³ verir. Duyarlılığa dikkat: h₁'i 1 mm yanlış okumak ρ₂'yi 6.7 kg/m³ (yüzde 0.8) kaydırır. Sönüm salınımın süresini etkiler, denge yüksekliklerini etkilemez.",
      },
      {
        title: "Pascal'ın yüz adamı: 147 N ile bir otomobil",
        predict:
          "Varsayılan kaldıraçta (1500 kg, d₁ = 3 cm, d₂ = 30 cm) aracı tutmak için pompa pistonuna kaç newton gerekir? 10 cm kaldırmak için kaç vuruş, küçük piston toplam kaç metre yol ister? Giren iş, aracın kazandığı mgd₂'den büyük mü, küçük mü, eşit mi çıkar?",
        do: "Hidrolik kaldıraç sekmesinde varsayılan ayarlarla (Pompa kursu s = 10 cm, Hedef yükseklik 10 cm) kartları oku, sonra Hedefe kadar pompala'ya bas ve sayaç durana dek bekle. Ardından Küçük piston çapı d₁'i 6.0 cm yap.",
        observe:
          "Başta alan oranı 100.0, F₁ = 147.2 N, yük 14.7 kN, yağ basıncı 208.2 kPa. Pompalama 100.0 / 100 vuruşta biter: Σd₁ = 10.000 m, yükseliş 10.000 cm. Giren iş 1474.52 J, çıkan iş 1474.52 J (Fark 0.00 %); bunun +3.02 J'ü yağın potansiyel enerjisi, kalan 1471.50 J aracın mgd₂'si. F₁ 147.8 N'a çıkmıştır: kuvvet kazancı 99.59, ideal 100.00 (−0.41 %). d₁ = 6 cm'de oran 25 olur, kart 588.6 N ister ve durum satırı 'Kuvvet yetmiyor' der: sınır 250 N.",
        explain:
          "Yağın basıncı her yerde mg/A₂ = 208.2 kPa'dır; küçük piston bunu yüz kat küçük alanla, yüz kat küçük kuvvetle dengeler. Yağ sıkışmadığından her 10 cm'lik vuruş aracı 1 mm kaldırır: kuvvetteki yüz kat kazanç yoldaki yüz kat kayıptır, iş korunur. Fazladan 3.02 J, büyük silindire taşınıp 10 cm'lik bir sütun oluşturan yağın potansiyel enerjisidir; aynı sütun F₁'i 0.6 N artırır. Çapı iki katına çıkarmak alanı, dolayısıyla kuvveti dört katına çıkarır.",
      },
      {
        title: "Torricelli'nin iki tüpü ve Everest'in havası",
        predict:
          "Deniz düzeyinde cıva sütunu 760 mm'ye yakındır. Aynı hava basıncını taşıyan su sütunu kaç metre olur? Everest'in tepesinde (8849 m) basınç deniz düzeyinin yarısı mı, üçte biri mi? İzotermal model ISA'dan büyük mü, küçük mü bir değer verir?",
        do: "Barometre ve yükseklik sekmesinde Deniz düzeyi'nde sütunları ve tabloyu oku; Su buharının basıncını hesaba kat kutusunu işaretle, sonra yeniden kaldır. Ardından Everest · 8849 m ve 11 km düğmelerine sırayla bas.",
        observe:
          "Deniz düzeyinde cıva 759.7 mm, su 10.349 m; basınç 760.0 mmHg; sütun oranı 13.622, yoğunluk oranına eşit. Buhar açılınca su sütunu 10.111 m'ye kısalır, oran −2.31 % sapar. Everest'te 230.63 K (−42.5 °C), 31.44 kPa, yani deniz düzeyinin 31.03 %'ü; cıva 235.7 mm, su 3.211 m, hava yoğunluğu 0.475 kg/m³. İzotermal model 35.49 kPa (+12.88 %) verir; sayısal tümleme ISA formülüyle 0.00 % uyuşur. 11 km'de 22.63 kPa, izotermal fark +21.51 %.",
        explain:
          "Sütunu üstündeki havanın ağırlığı taşır, h = P/(ρg); bu yüzden su sütunu cıvanınkinden 13.6 kat uzundur. 759.7 mm'nin 760 olmaması hata değildir: mmHg birimi g₀ = 9.80665 m/s² ile tanımlıdır, sayfadaki sütun ise g = 9.81 ile hesaplanır. Tüpün tepesindeki su buharı 2.34 kPa'lık karşı basınçla su sütununu 23.9 cm kısaltır. Everest'te basınç üçte bire iner; izotermal model fazla verir, çünkü gerçek hava yukarıda soğur ve aynı basınçta daha yoğun olur.",
      },
    ],
  },
  wow: [
    {
      title: "Bir atın atardamarında 2.5 metre",
      body:
        "İngiliz rahip ve doğabilimci Stephen Hales, 1733'te yayımladığı <em>Haemastaticks</em>'te sırtüstü bağlanmış bir kısrağın uyluk atardamarına pirinç bir boruyla 9 ayak (2.7 m) uzunluğunda cam bir tüp bağladığını anlatır. Kan tüpte kalbin sol karıncığının 8 ayak 3 inç, yaklaşık 2.5 metre üstüne çıktı ve her nabızda 5–10 cm inip kalktı: kan basıncının ilk ölçümü. Tüpü kısaltmanın yolu cıvaydı; 1828'de Jean Poiseuille cıvalı bir U-tüpü manometresi kullandı ve kan basıncının birimi o günden beri mmHg'dir. Cıva 13.6 kat yoğun olduğundan bugünkü 120 mmHg'lik büyük tansiyon, cam bir boruda yaklaşık 1.5 m'lik kan sütunu demektir.",
    },
    {
      title: "Everest'in tepesinde bir ölçüm: model yüzde yedi eksik",
      body:
        "24 Ekim 1981'de Amerikan Everest Tıbbi Araştırma Seferi'nden hekim Christopher Pizzo, zirvede kristal algılayıcılı bir barometreyle 253.0 mmHg (33.7 kPa) okudu. Sayfadaki standart atmosfer aynı yükseklik için 235.8 mmHg verir. West ve arkadaşlarının 1983'teki yorumuna göre başlıca neden enlemdir: 2 ile 16 km arasında basınç ekvatora yakın bölgelerde daha yüksektir; mevsim de rol oynar, zirve yüksekliğinde yaz ortasındaki basınç kıştakinden yaklaşık 11.5 mmHg fazladır. Bu yüzde yedi önemsiz değildir: zirvedeki oksijen basıncı insanın dayanabileceği sınırdadır ve yazarlara göre günlük basınç değişimleri bile en yüksek oksijen alımını etkiler.",
    },
    {
      title: "Magdeburg yarıküreleri ve gereksiz at takımı",
      body:
        "Magdeburg belediye başkanı Otto von Guericke kendi yaptığı hava pompasını 1654'te Regensburg'da İmparatorluk Meclisi önünde sergiledi: içi boşaltılan, yaklaşık 50 cm çaplı iki bakır yarıküre at takımlarıyla bile ayrılamadı; Magdeburg'da yinelenen gösteride iki takım hâlinde 16 at kullanıldı. İçerisi tamamen boşalsaydı yarıküreleri bastıran kuvvet P₀ × π(0.25 m)² ≈ 19.9 kN, yaklaşık iki tonluk bir kütlenin ağırlığı olurdu; pompanın bu boşluğa ulaşıp ulaşmadığı bilinmiyor. Fizik bir sürpriz daha saklar: ikinci at takımı gereksizdi. Yarıkürelerden birini bir ağaca bağlamak aynı gerilimi yaratırdı, çünkü ağaç da tıpkı karşı takım gibi geri çeker.",
    },
  ],
  worked: {
    title: "Koninin duvarı ne kadar su taşır?",
    prompt:
      "Sayfadaki 'Yukarı genişleyen koni' kesik koni biçimlidir: taban yarıçapı 1 m, yarıçap yükseklikle r(y) = 1 m + y/6 diye büyür. Kap H = 10 m tatlı suyla dolu (ρ = 998 kg/m³, g = 9.81 m/s²). Tabandaki gösterge basıncını ve taban kuvvetini, suyun ağırlığını ve duvarların suya uyguladığı düşey kuvveti integralle bul; üçünü birbirine bağla.",
    steps: [
      "Taban: gösterge basıncı ρgH = 998 × 9.81 × 10 Pa = 97 903.8 Pa ≈ 97.9 kPa. Taban alanı A = π(1 m)² = 3.1416 m², kuvvet F<sub>taban</sub> = 97 903.8 Pa × 3.1416 m² = 307.6 kN. Kabın biçimi bu hesaba hiç girmedi.",
      "Hacim: V = ∫₀ᴴ πr² dy = π∫₀¹⁰ (1 + y/6)² dy = 2π[(1 + y/6)³]₀¹⁰ = 2π[(8/3)³ − 1] = 2π × 17.963 = 112.865 m³. Ağırlık W = ρgV = 9790.38 N/m³ × 112.865 m³ = 1.105 MN, taban kuvvetinin 3.6 katı.",
      "Duvar: y ile y + dy arasındaki halkada gösterge basıncı ρg(10 m − y)'dir. Yatık duvar suyu yüzeyine dik, içeri ve yukarı doğru iter; düşey bileşen, halkanın yatay izdüşüm alanıyla hesaplanır: dA = d(πr²) = 2πr·r′dy = (π/3)(1 + y/6)dy. Böylece F<sub>duvar,z</sub> = (π/3)ρg∫₀¹⁰ (10 − y)(1 + y/6) dy.",
      "İntegrali aç: (10 − y)(1 + y/6) = 10 + (2/3)y − y²/6, belirli integrali 100 + 100/3 − 1000/18 = 77.778 m³. F<sub>duvar,z</sub> = (π/3) × 9790.38 N/m³ × 77.778 m³ = 797.4 kN, yukarı doğru. Birim denetimi: (N/m³)·m³ = N.",
      "Denetle: F<sub>taban</sub> + F<sub>duvar,z</sub> = 307.6 kN + 797.4 kN = 1105.0 kN = W. Üstelik (π/3) × 77.778 m³ = 81.449 m³ = V − πR²H: yatık duvar, tam üstünde duran 'sarkan' suyun ağırlığını taşır; taban yalnızca kendi üstündeki 10 m'lik silindirin ağırlığını görür. Sayfada Kap biçimi = Yukarı genişleyen koni seç: tablonun Sayısal ve Formül sütunları +797.4 kN, oran kartı 0.278 gösterir.",
    ],
    result:
      "Taban basıncı 97.9 kPa ve taban kuvveti 307.6 kN kabın biçiminden bağımsızdır; suyun ağırlığı 1.105 MN'dur ve farkı, 797.4 kN'u, yatık duvar taşır. Aynı integral dar boyunlu şişede eksi çıkar: omuz suyu 194.6 kN ile aşağı bastırır. Genel kural: eğri bir yüzeye etkiyen hidrostatik kuvvetin düşey bileşeni, o yüzeyle serbest yüzey düzeyi arasındaki gerçek ya da hayalî sıvının ağırlığıdır.",
  },
  misconceptions: [
    {
      myth: "Geniş bir kap ya da uzun bir göl tabana daha büyük basınç yapar; büyük bir gölü tutan baraj, küçük bir gölünkinden daha güçlü olmalıdır.",
      truth:
        "Basınç yalnızca derinliğe bağlıdır. 10 m derinlikte gösterge basıncı, su ister dar bir boruda ister kilometrelerce uzanan bir gölde dursun, 97.9 kPa'dır. Suyu 10 m derinliğe kadar tutan iki baraj, arkalarındaki göl ne kadar uzun olursa olsun, metre genişlik başına aynı yatay kuvveti görür: ½ρgH² = 489.5 kN. Gölün uzunluğu değil derinliği önemlidir. Barajlar dibe doğru kalınlaşır, çünkü basınç derinlikle doğrusal büyür. Sayfada koniyle silindiri karşılaştır: su 3.6 kat fazla, taban basıncı aynı.",
    },
    {
      myth: "Basınç yalnızca aşağı doğru etkir; derindeki bir cisme yalnızca üstündeki su bastırır.",
      truth:
        "Bir noktadaki basınç her yönde aynıdır ve her yüzeye dik etkir: aşağı, yana ve yukarı bakan yüzeylere aynı büyüklükte. Sayfadaki sondanın sekiz oku bu yüzden eşittir; şişenin omzunu yukarı iten de aynı basınçtır. Kaldırma kuvveti de buradan doğar: batmış bir cismin alt yüzü üst yüzünden daha derinde olduğu için yukarı doğru basınç aşağı doğru basınçtan büyüktür.",
    },
    {
      myth: "Hidrolik kaldıraç enerji üretir; küçük bir kuvvetle büyük bir kuvvet bedavaya elde edilir.",
      truth:
        "Kuvvet çoğalır, iş çoğalmaz. Sayfadaki krikoda 147 N'luk itme 14.7 kN'luk aracı kaldırır, ama küçük piston 10 m giderken araç yalnızca 10 cm kalkar. Giren iş 1474.52 J, çıkan iş de 1474.52 J'dür: 1471.50 J aracın, 3.02 J büyük silindire taşınan yağın potansiyel enerjisi. Gerçek bir krikoda sürtünme ve sızıntı yüzünden giren iş çıkandan biraz fazladır, hiçbir zaman az değil.",
    },
    {
      myth: "Pipet ya da emme tulumbası suyu 'çeker'; yeterince güçlü bir pompa suyu istediği yüksekliğe emebilir.",
      truth:
        "Emme bir çekme değildir: pompa borudaki havayı boşaltır, suyu dışarıdaki atmosfer basıncı borunun içine iter. Kusursuz bir boşluk bile suyu en fazla P₀/(ρg) kadar, deniz düzeyinde yaklaşık 10.3 m yükseltebilir; sayfanın su barometresi 10.349 m, su buharını hesaba katınca 10.111 m gösterir. Galileo'nun ustasının 'on sekiz braccio' sınırı budur. Daha derin kuyularda pompa suyun içine indirilir ve suyu aşağıdan iter.",
    },
  ],
  glossary: [
    { term: "Basınç (P)", definition: "Bir yüzeye dik etkiyen kuvvetin alana oranı, P = F⊥/A; skaler bir niceliktir, SI birimi pascaldır (1 Pa = 1 N/m²)." },
    { term: "Mutlak ve gösterge basıncı", definition: "Mutlak basınç boşluğa göre ölçülür; gösterge basıncı, P − P₀, atmosfer basıncının üstündeki kısımdır. Sıvıda h derinlikte gösterge basıncı ρgh'dir." },
    { term: "Pascal ilkesi", definition: "Kapalı, durgun bir akışkanın bir noktasındaki basınç değişiminin akışkanın her noktasına ve kabın duvarlarına azalmadan iletilmesi." },
    { term: "Hidrostatik paradoks", definition: "Taban basıncının ve taban kuvvetinin kaptaki sıvının miktarına ve kabın biçimine değil, yalnızca derinliğe ve taban alanına bağlı olması; farkı duvar kuvvetleri kapatır." },
    { term: "Manometre", definition: "Bir basınç farkını sıvı sütunlarının yükseklik farkından okuyan alet; U-tüpü en basit biçimidir." },
    { term: "Barometre", definition: "Atmosfer basıncını ölçen alet; Torricelli barometresinde ters çevrilmiş tüpteki sıvı sütununu hava basıncı taşır, h = P/(ρg)." },
    { term: "Ölçek yüksekliği (H)", definition: "İzotermal bir atmosferde basıncın e ≈ 2.718 kat azaldığı yükseklik, H = RT/(Mg); 15 °C'de yaklaşık 8.4 km." },
    { term: "Milimetre cıva (mmHg)", definition: "0 °C'deki cıvanın standart yerçekiminde 1 mm'lik sütununun yaptığı basınç, 133.322 Pa; 760 mmHg yaklaşık 1 atm'dir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede P = P₀ + ρgh bir formüldür; üniversitede bir vektör denkleminin özel hâlidir. <strong>Fizik I</strong>'in akışkanlar bölümünde ve <strong>Akışkanlar Mekaniği</strong> derslerinde durgun akışkanın denge koşulu ∇P = ρg diye yazılır: basıncın gradyanı birim hacme düşen dış kuvvete eşittir ve eş basınç yüzeyleri etkin yerçekimine diktir. Bu tek satır sayfadaki her şeyi ve fazlasını verir. Düzgün ivmelenen bir tankta g yerine g − a gelir ve serbest yüzey eğilir; ω açısal hızıyla dönen bir kovada merkezkaç terimi eklenir ve yüzey bir paraboloide döner: z = ω²r²/(2g). Düzlem ve eğri yüzeylere etkiyen kuvvetlerin, basınç merkezinin ve yüzen cisimlerin kararlılığının hesabı bu denklemin yüzey integralleridir; çözümlü örnekteki koni bunun küçük bir örneğidir. Akışkan hareket edince denklem Euler denklemine, ρ Dv/Dt = −∇P + ρg, viskozite eklenince Navier–Stokes denklemine büyür; durgunluk, hızın sıfır olduğu özel durumdur.",
      "<strong>Atmosfer Bilimleri</strong>nde basınç neredeyse bir yükseklik ölçüsüdür. Hidrostatik denklem ideal gaz yasasıyla birleşince iki basınç yüzeyi arasındaki kalınlığı o katmanın ortalama sıcaklığına bağlayan <em>hipsometrik denklem</em> çıkar: sıcak hava sütunu daha kalındır ve hava haritalarındaki 500 hPa yüzeyinin yüksekliği sıcak ve soğuk hava kütlelerini bu yüzden gösterir. <strong>Sıkıştırılabilir akışkanlar</strong> konusunda yükselen hava genleşip soğur ve kuru adyabatik sıcaklık düşüşü g/c<sub>p</sub> ≈ 9.8 K/km çıkar; yıldızların iç yapısı da aynı dengeyle, dP/dr = −Gm(r)ρ/r², hesaplanır. <strong>Fizyoloji</strong>de hidrostatik basınç dolaşımın bir parçasıdır: ayakta duran birinin ayaklarında, kalbin yaklaşık 1.3 m altındaki kan sütunu damar basıncına 100 mmHg kadar ekler, her 10 cm yaklaşık 8 mmHg. Tansiyon bu yüzden kalp düzeyindeki üst koldan ölçülür. Manşetli ölçümü 1896'da Scipione Riva-Rocci geliştirdi; Nikolay Korotkov 1905'te manşet inerken stetoskopla duyulan sesleri tarif etti ve bugünkü 120/80'in iki sayısını okumayı mümkün kıldı.",
    ],
    topics: [
      "Fizik I: akışkanlar statiği",
      "Akışkanlar Mekaniği: eğri yüzeylere hidrostatik kuvvet",
      "Dönen ve ivmelenen kaplar",
      "Euler ve Navier–Stokes denklemleri",
      "Sıkıştırılabilir akışkanlar ve adyabatik atmosfer",
      "Atmosfer Bilimleri: hipsometrik denklem",
      "Fizyoloji: kan basıncı ve ölçümü",
      "Yıldızlarda hidrostatik denge",
    ],
  },
  quiz: [
    {
      question:
        "Taban alanları ve su yükseklikleri aynı üç kap (silindir, yukarı genişleyen koni, dar boyunlu şişe) birer teraziye konuyor. Kapların kendi kütlesi önemsizse hangisi doğrudur?",
      options: [
        "Taban kuvvetleri de terazi okumaları da üç kapta aynıdır",
        "Taban kuvvetleri aynıdır; terazi ise her kapta içindeki suyun ağırlığını okur",
        "Konide hem taban kuvveti hem terazi okuması en büyüktür",
        "Şişede taban basıncı en büyüktür, çünkü su dar boyunda sıkışır",
      ],
      answer: 1,
      explanation:
        "Taban basıncı ρgH ve taban kuvveti ρgH·A yalnızca derinliğe ve taban alanına bağlıdır: sayfada üç kapta da 307.6 kN. Terazi ise kabın üzerine binen toplam kuvveti, yani suyun ağırlığını okur: 307.6 kN, 1.105 MN ve 113.0 kN. Aradaki farkı duvarlar taşır; konide yatık duvar suyu yukarı iter, şişede omuz aşağı bastırır ve bu kuvvetler kabın malzemesinden geçip teraziye ulaşır.",
    },
    {
      question:
        "Varsayılan krikoda (d₁ = 3 cm, d₂ = 30 cm, kurs 10 cm) küçük pistonun çapını 6 cm'ye çıkarırsan, aracı tutmak için gereken kuvvet ve aracı 10 cm kaldırmak için gereken vuruş sayısı nasıl değişir?",
      options: [
        "Kuvvet 2 katına çıkar, vuruş sayısı yarıya iner",
        "Kuvvet 4 katına çıkar, vuruş sayısı dörtte bire iner",
        "Kuvvet 4 katına çıkar, vuruş sayısı değişmez",
        "Kuvvet dörtte bire iner, vuruş sayısı 4 katına çıkar",
      ],
      answer: 1,
      explanation:
        "Alan çapın karesiyle büyür: A₁ dört kat artar, A₂/A₁ 100'den 25'e iner ve F₁ = mg·A₁/A₂ 147.2 N'dan 588.6 N'a çıkar. Her vuruş dört kat fazla yağ ittiği için araç vuruş başına 1 mm yerine 4 mm kalkar; 100 yerine 25 vuruş yeter. Kuvvet çarpı yol, yani iş, değişmez. Sayfada Vuruş kartı 0.0 / 25 gösterir, ama 250 N'luk sınırın yetmediğini de söyler.",
    },
    {
      question:
        "Sıcaklığı her yükseklikte 15 °C olan izotermal bir atmosferde (ölçek yüksekliği H = 8.43 km) basınç hangi yükseklikte deniz düzeyindekinin yarısına iner?",
      options: ["Yaklaşık 4.2 km", "Yaklaşık 5.8 km", "Yaklaşık 8.4 km", "Yaklaşık 11 km"],
      answer: 1,
      explanation:
        "P = P₀e<sup>−z/H</sup> = P₀/2 için z = H·ln 2 = 8.43 km × 0.693 ≈ 5.85 km. 8.4 km, basıncın yarıya değil e kat, yani yüzde 37'ye indiği yüksekliktir; 4.2 km ise doğrusal bir düşüş varsayar. Gerçek hava yukarıda soğuduğu için basınç biraz daha hızlı düşer: sayfada İrtifa z'yi 5477 m'ye getir, P/P₀ kartı 50.00 % gösterir.",
    },
  ],
  next: [
    {
      href: "kaldirma-kuvveti.html",
      title: "Kaldırma Kuvveti: Arşimet İlkesi",
      why: "Batmış bir cismin alt yüzü üst yüzünden daha derindedir; bu basınç farkının yüzey boyunca toplamı, yerini aldığı sıvının ağırlığıdır. Arşimet ilkesi P = P₀ + ρgh'nin bir cisim üzerinden integralidir.",
    },
    {
      href: "akiskanlar-mekanigi.html",
      title: "Akışkanlar Mekaniği: Bernoulli ve Viskozite",
      why: "Akışkan hareket edince basınç hıza da bağlanır: Bernoulli denklemi, Torricelli'nin boşalma yasası ve kan basıncının birimini cıvayla ölçen Poiseuille'ün adını taşıyan akış.",
    },
    {
      href: "ideal-gaz.html",
      title: "İdeal Gaz: Moleküllerden Basınca",
      why: "Gazın basıncı duvara çarpan moleküllerin momentumundan doğar. Barometrik formülde kullandığın ρ = PM/(RT) bağıntısının mikroskobik kökünü orada ölç.",
    },
    {
      href: "kalp-dolasim.html",
      title: "Kalp ve Dolaşım",
      why: "120/80 mmHg'nin iki sayısı, kalbin kasılma (sistol) ve gevşeme (diyastol) evrelerinde atardamardaki basınçtır; o sayfada bu iki evreyi ve kanın yolunu izle.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 14.3 Pascal's Principle and Hydraulics",
      url: "https://openstax.org/books/university-physics-volume-1/pages/14-3-pascals-principle-and-hydraulics",
      note: "Pascal ilkesi, hidrolik krikoda ve frenlerde F₁/A₁ = F₂/A₂ bağıntısı ve sistemin aldığından fazla iş yapamayacağı notu; çözümlü fren örneğiyle (İngilizce, açık ders kitabı).",
    },
    {
      title: "Feynman Lectures on Physics, Cilt II, Bölüm 40: The Flow of Dry Water",
      url: "https://www.feynmanlectures.caltech.edu/II_40.html",
      note: "40-1 Hydrostatics: kayma gerilmesi taşımayan akışkanda basıncın her yönde aynı olduğu ve birim hacme düşen basınç kuvvetinin −∇p olduğu; ardından akan akışkanlar (İngilizce, lisans düzeyi).",
    },
    {
      title: "HyperPhysics · The Barometric Formula",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/Kinetic/barfor.html",
      note: "İzotermal barometrik formülün türetilişi ve küçük bir hesaplayıcı; sıcaklık düşüşünü yok saydığı için basıncı fazla tahmin ettiği notuyla.",
    },
    {
      title: "West ve ark. (1983) · Barometric pressures at extreme altitudes on Mt. Everest (PubMed)",
      url: "https://www.ncbi.nlm.nih.gov/pubmed/6863078",
      note: "J Appl Physiol 54(5):1188–1194. Zirvede ölçülen 253.0 mmHg, standart atmosferle karşılaştırma, enlem ve mevsim etkisi (İngilizce özet).",
    },
  ],
  revision: "Kasım 2026",
};
