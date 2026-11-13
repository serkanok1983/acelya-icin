window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yasam-oyunu"] = {
  slug: "yasam-oyunu",
  title: "Yaşam Oyunu: İki Kuraldan Bir Evren",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 30,
  tagline:
    "Kareli bir kâğıt ve iki kural: üç komşu doğurur, iki ya da üç komşu yaşatır. Conway'in 1970'te bulduğu bu oyunda desenler yürür, çoğalır, hatta hesap yapar. Bu sayfadaki evren ise bir simit.",
  hook:
    "Desen menüsünden R-pentomino'yu seç, Deseni Kur'a bas: ızgaranın ortasında beş hücre belirir. Şimdi Oynat. Bu beş hücre sonsuz bir düzlemde 1103 nesil boyunca kaynar, altı planör fırlatır ve 116 hücrelik bir enkaz bırakır. Kuralın içinde 'planör' diye bir sözcük yok; peki onları kim tasarladı?",
  bigIdea:
    "Yaşam Oyunu bir <strong>hücresel otomat</strong>tır: her hücre yalnız sekiz komşusuna bakar ve bütün hücreler aynı anda güncellenir. <em>Doğum için tam 3, hayatta kalmak için 2 ya da 3 komşu</em> kuralı, kendi başına bir bilgisayar kurmaya yetecek kadar zengindir.",
  story: [
    "Soru 1940'larda John von Neumann'ındı: bir makine kendi kopyasını yapabilir mi? Meslektaşı Stanisław Ulam, sorunu vidalardan ve motorlardan kurtarmayı önerdi: kareli bir düzlem, her karede birkaç durumdan biri ve komşulara bakan yerel bir kural. Von Neumann bu soyut evrende kendini kopyalayan bir yapı tasarladı; ama kuralı 29 durumluydu ve tasarım yüz binlerce hücre tutuyordu. Kimse onu bir kâğıda çizip izleyemezdi.",
    "Cambridge'de genç bir matematikçi, <strong>John Horton Conway</strong>, aynı fikrin en sade hâlini aradı. 1968'den başlayarak ortak odadaki Go tahtasında taşlarla onlarca kural denedi. Aradığı şey bir dengeydi: desenler ne hemen sönmeli ne de taşkın gibi her yeri kaplamalı, küçük başlangıçların sonu kolayca kestirilememeliydi. 1970'te karar kıldığı kural iki satırdı. Martin Gardner onu <em>Scientific American</em>'ın Ekim 1970 sayısındaki 'Mathematical Games' köşesinde tanıttı ve dergi mektup yağmuruna tutuldu. Conway yazıda bir de ödül koymuştu: hiçbir desenin sınırsız büyüyemeyeceğini 1970 bitmeden ispatlayan ya da çürüten 50 dolar alacaktı.",
    "Parayı Kasım 1970'te MIT'den Bill Gosper'ın ekibi aldı; çürüterek. Buldukları 36 hücrelik <strong>planör tabancası</strong> her 30 nesilde bir planör üretiyor, nüfus sonsuza dek artıyordu. Planörün kendisi daha önce, 1969'da bulunmuştu: Conway'in grubu girişteki beş hücrenin, yani R-pentominonun gidişatını elle izlerken Richard Guy enkazdan ayrılıp yürüyen küçük bir biçim fark etti. Sonrası hızlı geldi: planör akışları sinyal, çarpışmaları mantık kapısı gibi kullanılabiliyordu. Conway, Berlekamp ve Guy 1982'de <em>Winning Ways</em> kitabında oyunun evrensel bir bilgisayar kadar güçlü olduğunu gösterdi; 2000'lerin başında Paul Rendell hücrelerden kurulu, çalışan bir Turing makinesi yayımladı.",
    "O yıllarda bilgisayar merkezlerinde mesai dışı saatlerin Life desenleri kovalanarak geçtiği anlatılır; ne kadar işlemci zamanının buna gittiğini gösteren güvenilir bir kayıt yok, ama oyunun bir kuşak programcıya 'basit kural, karmaşık davranış' fikrini aşıladığı kesin. Conway ise ilişkisini hep buruk anlattı: grup kuramından sayı kuramına uzanan işlerinin bir oyunun gölgesinde kalmasından hoşlanmazdı. Nisan 2020'de, 82 yaşında, COVID-19'dan öldü.",
  ],
  core: [
    {
      heading: "Kural: B3/S23 ve aynı anda atılan adım",
      body:
        "Her hücrenin sekiz komşusu vardır: dört kenar, dört köşe. Buna <strong>Moore komşuluğu</strong> denir. Ölü bir hücre, komşularından tam üçü canlıysa doğar; canlı bir hücre, iki ya da üç canlı komşusu varsa yaşar, daha azında yalnızlıktan, daha çoğunda kalabalıktan ölür. Kısa yazılışı <strong>B3/S23</strong>'tür (birth 3, survival 2-3). İnce ama belirleyici ayrıntı: bütün hücreler yeni durumlarını <em>eski</em> ızgaraya bakarak hesaplar ve hep birlikte değişir. Sayfanın kodu bunun için iki ızgara tutar; birini okur, ötekine yazar, sonra yer değiştirir. Hücreleri sırayla ve yerinde güncelleseydin bambaşka bir oyun elde ederdin. Aynı kalıpta, yani yalnız canlı komşu sayısına bakan iki durumlu kurallardan 2<sup>18</sup> = 262 144 tane vardır; Conway'inki bunlardan yalnızca biridir.",
      formula: "s′ = 1  ⇔  N = 3  ya da  (s = 1 ve N = 2)",
      formulaNote: "s hücrenin şimdiki durumu (0 ölü, 1 canlı), N sekiz komşudaki canlı sayısı, s′ bir sonraki nesildeki durum.",
    },
    {
      heading: "Hayvanat bahçesi: duranlar, salınanlar, yürüyenler",
      body:
        "Kural tek ama ürettiği nesneler türlere ayrılır. <strong>Durağan desenler</strong> hiç değişmez: 2 × 2'lik blokta (Desen menüsündeki Blok) her canlı hücrenin tam üç komşusu vardır, çevredeki ölü hücrelerin en çok iki. <strong>Salınganlar</strong> bir süre sonra başa döner: sayfadaki Titreşen (üç hücre) ve Kurbağa (altı hücre) iki nesilde bir tekrarlar; on hücrelik bir çizgiden doğan pentadecathlon'un periyodu 15'tir. <strong>Uzay gemileri</strong> ise tekrarlarken yer değiştirir. En küçüğü <strong>planör</strong>dür: beş hücre, dört nesilde bir aynı biçime döner ve çaprazda bir hücre ilerlemiş olur. Bu evrende hiçbir etki nesil başına bir hücreden hızlı yayılamaz; bu sınıra 'ışık hızı' denir ve c ile gösterilir. Planörün hızı c/4'tür. Yatay ya da dikey giden gemilerin en hızlısı c/2 ile gider; menüdeki dokuz hücrelik Hafif uzay gemisi bunlardan biridir.",
      formula: "hız = yer değiştirme / periyot;  planör: 1 hücre / 4 nesil = c/4",
      formulaNote: "c = nesil başına 1 hücre. Çapraz yönde c/4, yatay-dikey yönde c/2 aşılamayan sınırlardır.",
    },
    {
      heading: "Sınırsız büyüme: tabanca ve kaynayan beşli",
      body:
        "Conway'in ödül sorusu şuydu: sonlu sayıda hücreyle başlayan bir desenin nüfusu sınırsız artabilir mi? Çoğu başlangıç birkaç yüz ya da birkaç bin nesilde blok, kovan ve titreşen kırıntılarına çöker; bu kalıntıya 'kül' denir. R-pentomino bile, bütün gürültüsüne karşın, 1103. nesilde durulur. Gosper'ın tabancası (Desen menüsündeki adıyla Gosper planör topu) soruyu kapattı: iki mekik birbirine çarpıp geri dönerken her 30 nesilde bir planör bırakır; ilki 15. nesilde ayrılır. Nüfus zamanla doğrusal büyür. Daha sonra, yürürken arkasında tabanca bırakan desenler de kuruldu; onlarda nüfus zamanın karesiyle artar. Daha hızlısı olamaz: etki nesilde bir hücreden hızlı yayılamadığı için t nesil sonra canlı hücreler en çok (2t + sabit)² büyüklüğünde bir karenin içindedir.",
      formula: "N(t) ≤ (2t + L)²",
      formulaNote: "L başlangıç deseninin kenar uzunluğu. Tabancada N(t) ≈ 36 + 5t/30: her 30 nesilde 5 hücrelik bir planör eklenir.",
    },
    {
      heading: "Hesaplama: planörlerden bilgisayar",
      body:
        "Bir planör akışını bit dizisi gibi düşün: planör varsa 1, yoksa 0. İki akış dik açıyla çarpıştığında planörler birbirini yok eder; uygun yerleştirilmiş bir tabancayla bu çarpışmalardan DEĞİL, VE, VEYA kapıları kurulur. Kapılar, bellek ve saat bir araya gelince elindeki şey bir bilgisayardır: Yaşam Oyunu <strong>Turing tam</strong>dır, yani herhangi bir programın yapabildiği her hesabı yeterince büyük bir desen de yapabilir. Bunun sert bir sonucu vardır. Turing'in 1936'da gösterdiği gibi, bir programın durup durmayacağını her durumda söyleyen genel bir yöntem yoktur. Öyleyse 'bu desen sonunda sönecek mi?' sorusunu her desen için yanıtlayan bir algoritma da olamaz. Oyunun geleceğini öğrenmenin genel yolu tektir: çalıştırıp beklemek.",
      formula: "planör var → 1,  planör yok → 0",
      formulaNote: "Sinyal planör akışıdır; mantık, akışların birbirini silip silmemesiyle yapılır.",
    },
    {
      heading: "Bu sayfanın evreni: 80 × 50'lik bir simit",
      body:
        "Conway'in düzlemi sonsuzdur; ekran değildir. Sınırda ne olacağına programcı karar verir. Bu sayfanın kodu komşuyu sayarken satır ve sütun numarasının modunu alır: en üst satırın üst komşusu en alt satırdır, en sağ sütunun sağ komşusu en sol. Izgara böylece kenarı olmayan bir yüzeye, bir <strong>simit</strong>e (torusa) dönüşür. Sonuçları büyüktür. Alttan çıkan planör üstten girer ve 1600 nesilde başladığı yere döner. Kaçan planörler geri gelip kendi külüne çarpar; bu yüzden R-pentomino burada 1103'te değil, 1531. nesilde durulur. Tabancanın planörleri de dönüp 385. nesilde tabancayı vurur; nüfus burada 121'i hiç aşamaz. Ve evren sonludur: 4000 hücrenin 2<sup>4000</sup> ≈ 10<sup>1204</sup> farklı durumu vardır, kural da belirlenimcidir. Öyleyse her başlangıç eninde sonunda daha önce gördüğü bir duruma düşer ve o andan sonra bir döngüde kalır. Sonlu bir simit sonsuz bellek sağlayamaz; Turing tamlık sonsuz düzlemin özelliğidir, bu ızgaranın değil.",
      formula: "komşu(r, c) = ((r + Δr + 50) mod 50, (c + Δc + 80) mod 80)",
      formulaNote: "Δr ve Δc −1, 0, +1 değerlerini alır. Alternatif olan 'ölü kenar'da ızgara dışı hep ölü sayılır ve planörler kenarda bloğa dönüşür.",
    },
  ],
  lab: {
    intro:
      "Izgara 80 sütun, 50 satır; ipucu satırının da söylediği gibi kenarları birbirine bağlıdır. <strong>Çiz</strong> kipinde (ızgaranın çevresinde mavi çerçeve varken) tıklayarak ya da sürükleyerek hücre açıp kapatırsın. <strong>Adım</strong> tek nesil ilerletir, <strong>Oynat</strong> sürekli çalıştırır ve <strong>Durdur</strong>'a dönüşür. <strong>Hız</strong> menüsünde Yavaş, Normal ve Hızlı sırasıyla saniyede yaklaşık 4, 8 ve 17 nesildir. <strong>Rastgele</strong> her hücreyi yüzde 28 olasılıkla canlandırır, <strong>Temizle</strong> ızgarayı boşaltır; ikisi de çalışan benzetimi durdurur. <strong>Desen</strong> menüsünde yedi hazır desen var: Planör, Titreşen, Kurbağa, Blok, Hafif uzay gemisi, R-pentomino ve Gosper planör topu. <strong>Deseni Kur</strong> ızgarayı silip seçili deseni tam ortaya koyar; üstüne Çiz kipinde hücre ekleyebilirsin. Ölçü aletlerin iki sayaç: <strong>Nesil</strong> ve <strong>Canlı</strong>.",
    experiments: [
      {
        title: "Planör dünyayı dolaşır",
        predict:
          "Planör alt kenara varınca ne olur: durur mu, yok mu olur, başka bir şey mi? Başladığı hücrelere tam olarak geri dönebilir mi; dönerse kaçıncı nesilde?",
        do: "Desen menüsünden Planör'ü seçip Deseni Kur'a bas. Adım'a dört kez basıp biçimi karşılaştır. Sonra Hız'ı Hızlı yap, Oynat'a bas ve Nesil sayacı 97, 159 ve 1600'e yaklaşırken ekranı izle. Ardından aynı yolculuğu Hafif uzay gemisi ile dene.",
        observe:
          "Dört adımda aynı beş hücrelik biçim bir sağa, bir aşağı kaymış olur; Canlı hep 5'tir. 97. nesilde planörün ucu alt kenardan çıkıp en üst satırda belirir, 159. nesilde sağ kenardan sol kenara geçer. 1600. nesilde, Hızlı'da yaklaşık 96 saniye sonra, kurulduğu hücrelerin tam üstündedir. Hafif uzay gemisi sola doğru dümdüz gider; Canlı 9 ile 12 arasında gidip gelir ve gemi daha 160. nesilde başladığı yere döner.",
        explain:
          "Planör c/4 hızla çapraz gider: dört nesilde bir hücre aşağı, bir hücre sağa. Başa dönmek için hem 50 satırın hem 80 sütunun tam katı kadar yol almalıdır: ikisinin en küçük ortak katı 400 hücre, 400 × 4 = 1600 nesil. Kenardan çıkıp karşıdan girmesi kodun mod işlemidir; ızgaranın kenarı yoktur. Uzay gemisi c/2 ile yatay gider: iki nesilde bir hücre, 80 sütun için 80 × 2 = 160 nesil. On kat erken dönüşün iki katı hızdan, beş katı yoldan gelir: çapraz giden planör 400 hücre, yatay giden gemi yalnız 80 hücre yol alır.",
      },
      {
        title: "Beş hücre, iki ayrı kader",
        predict:
          "Menüdeki R-pentomino beş hücredir. Canlı sayısı en çok kaça çıkar, ne zaman durulur? Aynı biçimi çeyrek tur yatırıp elle çizersen sonuç değişir mi?",
        do: "Desen menüsünden R-pentomino'yu seçip Deseni Kur'a bas: üst satırda yan yana iki hücre, altında bir sola kaymış iki hücre, en altta ortada bir hücre. Hızlı'da oynat ve Canlı sayacını izle. Sonra Temizle'ye bas ve Çiz kipinde yatık hâlini kendin çiz: üstte ortada bir hücre, altında yan yana üç, en altta sağda bir.",
        observe:
          "Menüdeki hâlde Canlı 5, 6, 7, 9 diye başlar, 100. nesilde 121'dir, 1346. nesilde 395 ile tepe yapar ve 1531. nesilden sonra 123'te sabitlenir; Hızlı'da bir buçuk dakika sürer. Yatık hâl çok daha erken, 403. nesilde 74 hücreyle durulur; tepe değeri 178'dir. Yatık biçimi ızgaranın neresine çizdiğin sonucu değiştirmez.",
        explain:
          "Sonsuz düzlemde iki biçim birbirinin döndürülmüşüdür ve ikisi de 1103. nesilde 116 hücreyle durulur; altı planör sonsuza gider. Simitte o planörler geri döner ve küle çarpar. Izgara kare olmadığı için (80'e 50) dönüş yolları iki yönde farklıdır; aynı desen döndürülünce başka bir tarih yaşar. Kaydırmak ise bir şey değiştirmez, çünkü simidin her noktası eşdeğerdir.",
      },
      {
        title: "Tabanca kendini vurur",
        predict:
          "Gosper planör topu sonsuz düzlemde nüfusu sınırsız büyütür. Bu simitte Canlı sayacı da sonsuza dek artar mı? Fırlattığı planörler nereye gider?",
        do: "Desen menüsünden Gosper planör topu'nu seçip Deseni Kur'a bas; Canlı 36'dır. Normal hızda oynat ve ilk planörün ayrılışını izle. Sonra Hızlı'ya geç; Nesil 104, 162 ve 385'e yaklaşırken gözünü önce kenarlara, sonra tabancanın sağ ucundaki 2 × 2'lik bloğa dik. Nesil 430'u geçince Canlı sayacının en küçük ve en büyük değerini yaz.",
        observe:
          "İlk planör 15. nesilde ayrılır, sağ alta doğru gider; sonra her 30 nesilde bir yenisi gelir ve Canlı her atışta 5 artar: 360. nesilde 96. İlk planör 104. nesilde alt kenardan çıkıp üstten girer, 162. nesilde sağ kenardan sola geçer ve 385. nesilde tabancanın sağ ucundaki bloğa çarpar; birkaç nesil sonra blok yoktur. Canlı en çok 121'e ulaşmıştır (368. nesil). 427. nesilden başlayarak ızgara her 30 nesilde bir kendini tıpatıp tekrarlar; Canlı 98 ile 117 arasında gidip gelir.",
        explain:
          "Sonsuz düzlemde planörler uzaklaşır ve N(t) ≈ 36 + 5t/30 sınırsız büyür; 360. nesilde 36 + 60 = 96, sayfadaki değerle aynı. Simitte planörün kaçacağı yer yoktur: çapraz yolu ızgarayı dolanıp tabancaya geri çıkar. Şaşırtıcı olan sonrasıdır. Tabanca dağılmaz: bloğunu yitirir ama ateş etmeyi sürdürür, çünkü geri dönen her planör tam bloğun eksik kaldığı uca çarpıp orada yok olur. Otuz nesilde bir planör doğar, bir planör ölür; havada hep on kadar planör kalır. Conway'in ödül sorusunun yanıtı bu yüzden sınır koşuluna bağlıdır: sınırsız büyüme için sınırsız bir düzlem gerekir.",
      },
      {
        title: "Rastgele çorba ve küller",
        predict:
          "Rastgele'ye basınca 4000 hücrenin kaçı canlı olur? Oynatınca nüfus artar mı, sıfıra mı iner, bir yerde mi durur? Geriye ne kalır?",
        do: "Rastgele'ye bas ve Canlı'yı oku. Bir kez Adım'a bas, yeniden oku. Sonra Hızlı'da oynat ve Canlı artık değişmeyene (ya da iki değer arasında gidip gelene) kadar bekle. Birkaç kez tekrarla.",
        observe:
          "Başlangıç 1120 dolayındadır (denemelerin çoğunda 1080–1160). İlk adımda Canlı artar, 1290 civarına çıkar; sonra dalgalanarak erir. Tipik bir çorba bin nesil kadar sonra durulur; kodun aynısıyla yapılan 200 denemede en kısası 239, en uzunu 6119 nesil sürdü. Geriye 120 dolayında hücre kalır (denemelerin çoğunda 85 ile 150 arası): bloklar, kovanlar, titreşenler.",
        explain:
          "4000 × 0.28 = 1120. Yüzde 28 yoğunlukta hem kalabalıktan ölüm hem doğum boldur; düzen birkaç adımda kendi dengesini bulur ve oradan yavaş yavaş söner. Kalan kül ızgaranın yaklaşık yüzde 3'üdür. Bu oran bu sayfaya özgü değildir: büyük ızgaralarda yapılan sayımlar da rastgele başlangıçların aynı yoğunlukta, aynı birkaç dayanıklı desene çöktüğünü gösterir.",
      },
    ],
  },
  wow: [
    {
      title: "50 dolarlık soru, bir ayda yanıt",
      body:
        "Conway, Ekim 1970'teki yazıda hiçbir desenin sınırsız büyüyemeyeceğini sanıyordu ve aksini gösterene 50 dolar vaat etti. Bill Gosper'ın MIT'deki ekibi parayı Kasım 1970'te aldı. Buldukları tabanca 36 hücredir; ilk planörünü 15. nesilde, sonrakileri her 30 nesilde bir fırlatır. Tek bir karşı örnek, bir sanıyı sonsuza dek kapatmıştı.",
    },
    {
      title: "Beş hücreden 1103 nesil",
      body:
        "R-pentomino beş hücredir ama sonsuz düzlemde ancak 1103. nesilde durulur; geriye 116 hücre kalır: 8 blok, 4 kovan, 4 titreşen, birer tekne, somun ve gemi ile uzaklaşan 6 planör. Conway'in grubu onu elle izlerken sonunun bir türlü gelmediğini görmüştü; planör de bu izleme sırasında fark edildi. Bu sayfanın simit ızgarasında aynı beş hücre menüdeki duruşuyla 1531, çeyrek tur yatırılınca 403 nesilde durulur.",
    },
    {
      title: "Von Neumann'ın düşü, hücre hücre",
      body:
        "Hücresel otomatlar, kendini kopyalayan makine sorusundan doğmuştu; soru Yaşam Oyunu'nda da yanıtlandı. Mayıs 2010'da Andrew Wade'in duyurduğu Gemini adlı desen yaklaşık 34 milyon nesilde kendi kopyasını biraz öteye kurar ve eskisini söker. Kasım 2013'te Dave Greene, talimat şeridi dahil tam bir kopyasını çıkaran ilk çoğalıcıyı kurdu. İki satırlık kural, kırk yıl sonra hâlâ yeni türler veriyordu.",
    },
  ],
  worked: {
    title: "Planörün bir adımı ve simitteki turu",
    prompt:
      "Sayfadaki Planör deseni şu beş hücredir (satır, sütun): (0,1), (1,2), (2,0), (2,1), (2,2). Kuralı elle uygulayıp bir sonraki nesli bul. Sonra planörün 80 × 50'lik simitte başladığı yere kaç nesilde ve Hızlı kipte kaç saniyede döndüğünü hesapla.",
    steps: [
      "Canlı hücrelerin komşularını say. (0,1): yalnız (1,2) komşu, N = 1, ölür. (1,2): komşuları (0,1), (2,1), (2,2), N = 3, yaşar. (2,0): yalnız (2,1), N = 1, ölür. (2,1): komşuları (2,0), (2,2), (1,2), N = 3, yaşar. (2,2): komşuları (1,2), (2,1), N = 2, yaşar.",
      "Doğumları ara: tam üç canlı komşusu olan ölü hücreler. (1,0)'ın komşuları (0,1), (2,0), (2,1): doğar. (3,1)'in komşuları (2,0), (2,1), (2,2): doğar. Ortadaki (1,1)'in beş canlı komşusu vardır, doğmaz; öteki adayların komşu sayısı en çok 2'dir.",
      "Yeni nesil: (1,0), (1,2), (2,1), (2,2), (3,1). Yine beş hücre ama biçim değişti. Aynı işlemi üç kez daha yaparsan dördüncü nesilde (1,2), (2,3), (3,1), (3,2), (3,3) çıkar: başlangıcın her hücresi bir satır aşağı, bir sütun sağa kaymıştır.",
      "Hız: 4 nesilde çaprazda 1 hücre, yani c/4. Simitte başa dönmek için satır kayması 50'nin, sütun kayması 80'in katı olmalı; ikisi eşit olduğundan EKOK(50, 80) = 400 hücre gerekir. Nesil sayısı 400 × 4 = 1600.",
      "Süre: Hızlı kipte bir nesil 60 ms. 1600 × 0.060 s = 96 s. Normal kipte (120 ms) 192 s, Yavaş kipte (240 ms) 384 s. Bu sürede planör ızgarayı dikey yönde 8, yatay yönde 5 kez dolanır.",
    ],
    result:
      "Bir adımda iki hücre ölür, iki hücre doğar, üçü kalır; dört adımda desen çaprazda bir hücre ilerler. 80 × 50'lik simitte planör 1600 nesilde, Hızlı kipte 96 saniyede başladığı hücrelere döner.",
  },
  misconceptions: [
    {
      myth: "Kural bu kadar basitse sonucu önceden kestirmek de kolaydır.",
      truth:
        "Tam tersi ispatlanmıştır. Oyun Turing tam olduğu için 'bu desen sönecek mi?' sorusunu her desen için yanıtlayan genel bir yöntem olamaz. Pratikte de böyledir; Çiz kipinde dene: yan yana 6 hücrelik çizgi 12 nesilde tümüyle ölür, 7 hücrelik çizgi 14 nesilde dört kovana dönüşür, 10 hücrelik çizgi sonsuza dek salınır. Kestirmenin genel yolu çalıştırmaktır.",
    },
    {
      myth: "Hücreler soldan sağa, sırayla güncellenir.",
      truth:
        "Bütün hücreler aynı anda, bir önceki neslin fotoğrafına bakarak güncellenir. Kod bu yüzden iki ayrı ızgara tutar. Sırayla ve yerinde güncelleme yapılsaydı bir hücrenin yeni durumu komşusunun hesabını bozardı; planör bile yürümezdi.",
    },
    {
      myth: "Film geri sarılabilir: şimdiki desenden bir önceki nesil bulunur.",
      truth:
        "Kural ileri doğru tek sonuç verir, geri doğru vermez. Boş ızgaraya tek bir hücre de, yan yana iki hücre de bir adımda varır; L biçimli üç hücre de hazır bir blok da bir sonraki nesilde aynı bloktur. Hatta hiçbir öncülü olmayan, yalnız başlangıç olarak çizilebilen desenler vardır; adları 'Cennet Bahçesi'dir.",
    },
    {
      myth: "Ekranın kenarına varan planör yok olur.",
      truth:
        "Bu, sınırın nasıl programlandığına bağlıdır ve Conway'in kuralının parçası değildir. Bu sayfada kenarlar birbirine bağlıdır: planör karşı kenardan geri girer. 'Ölü kenar' kullanan programlarda ise planör kenarda bir bloğa dönüşüp kalır. Aynı desen, iki sınır koşulunda iki ayrı tarih yaşar.",
    },
  ],
  glossary: [
    { term: "Hücresel otomat", definition: "Izgaradaki her hücrenin, yalnız komşularının durumuna bakan aynı yerel kuralla ve eşzamanlı olarak güncellendiği ayrık model." },
    { term: "Moore komşuluğu", definition: "Bir hücrenin kenar ve köşe paylaştığı sekiz hücre; yalnız dört kenar komşusu alınırsa von Neumann komşuluğu olur." },
    { term: "Durağan desen", definition: "Bir sonraki nesilde kendisiyle aynı kalan desen; blok ve kovan en sık görülenleridir." },
    { term: "Salıngan", definition: "Sabit sayıda nesilden sonra yerinde kendini tekrarlayan desen; tekrar süresine periyot denir (titreşende 2, pentadecathlon'da 15)." },
    { term: "Uzay gemisi", definition: "Belli bir periyottan sonra aynı biçimde ama başka bir yerde beliren desen; en küçüğü beş hücrelik planördür." },
    { term: "Planör tabancası", definition: "Kendisi yerinde kalıp düzenli aralıklarla planör üreten desen; Gosper'ınki 36 hücredir ve 30 nesilde bir ateşler." },
    { term: "Simit (torus) sınırı", definition: "Izgaranın üst kenarının alta, sol kenarının sağa bağlandığı dönemli sınır koşulu; kodda mod işlemiyle kurulur." },
    { term: "Turing tamlık", definition: "Bir sistemin, yeterli yer ve zaman verildiğinde herhangi bir bilgisayar programının yaptığı her hesabı yapabilmesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Otomata Kuramı</strong> ve <strong>Hesaplama Kuramı</strong> derslerinde Yaşam Oyunu iki kez karşına çıkar. Önce bir model olarak: sonlu durumlu, yerel kurallı makineler ne kadar güçlü olabilir? Sonra bir sınır olarak: Turing tam bir sistemin uzun dönem davranışı hakkındaki soruların çoğu karar verilemezdir ve bunun kaynağı durma problemidir. Aynı sonuç tek boyutta da geçerlidir: Stephen Wolfram'ın 110 numaralı kuralı, bir satır hücre ve üç komşuyla çalışır; evrensel olduğunu Matthew Cook ispatladı. Bu sayfadaki sonlu simit ise dersin öteki yarısına örnektir: durum sayısı sonlu olan her belirlenimci sistem eninde sonunda bir döngüye girer.",
      "Sınır koşulu seçimi, sayısal hesabın gündelik işidir. <strong>Sayısal Analiz</strong> ve <strong>İstatistiksel Fizik</strong> derslerinde ısı denklemini ya da Ising mıknatıs modelini bir ızgarada çözerken aynı kararı verirsin: kenar sabit mi, yansıtıcı mı, yoksa buradaki gibi dönemli mi? Dönemli sınır, küçük bir ızgarayı kenarsız bir evren gibi gösterir ama bedeli vardır: bu sayfada geri dönen planörlerin yaptığı gibi, sistem kendi görüntüsüyle etkileşir. Biyolojide benzer yerel kurallar hayvan postundaki desenleri (Turing, 1952), ekolojide orman yangınlarını ve salgınları modellemek için kullanılır. Ortak fikir <strong>beliriş</strong>tir: bütünün davranışı parçaların kuralında yazılı değildir.",
    ],
    topics: ["Hücresel otomatlar ve Wolfram sınıfları", "Turing makineleri ve durma problemi", "Karar verilemezlik", "Dönemli sınır koşulları", "Ayrık dinamik sistemler ve döngüler", "Tepkime-yayılma ve desen oluşumu", "Karmaşık sistemler ve beliriş"],
  },
  quiz: [
    {
      question: "2 × 2'lik blok neden hiç değişmez?",
      options: [
        "Blok özel bir desen olarak kurala ayrıca yazılmıştır",
        "Her canlı hücrenin tam 3 canlı komşusu vardır; çevredeki ölü hücrelerin ise en çok 2",
        "Dört hücre birbirini beslediği için komşu sayısı önemini yitirir",
        "Çift sayıda hücreden oluşan desenler durağandır",
      ],
      answer: 1,
      explanation: "Bloktaki her hücre öteki üçüne komşudur: N = 3, yaşar. Bloğun kenarına bitişik ölü hücreler iki, köşesine bitişik olanlar bir canlı komşu görür; doğum için gereken 3'e hiçbiri ulaşmaz. Kuralda desen adı yoktur, yalnız sayım vardır.",
    },
    {
      question: "Aynı kod 40 sütun, 30 satırlık bir simitte çalışsaydı planör başladığı hücrelere kaç nesilde dönerdi?",
      options: ["120", "280", "480", "1200"],
      answer: 2,
      explanation: "Planör dört nesilde çaprazda bir hücre gider. Hem 30 satırın hem 40 sütunun katı kadar kaymalıdır: EKOK(30, 40) = 120 hücre, 120 × 4 = 480 nesil. Bu sayfadaki 80 × 50 için aynı hesap 400 × 4 = 1600 verir.",
    },
    {
      question: "Bu sayfadaki ızgarada hiçbir başlangıç sonsuza dek hep yeni desenler üretemez. Neden?",
      options: [
        "Çünkü kural her nesilde canlı sayısını azaltır",
        "Çünkü 4000 hücrenin sonlu sayıda durumu vardır; belirlenimci kural bir durumu ikinci kez görünce döngüye girer",
        "Çünkü Rastgele düğmesi yalnız yüzde 28 yoğunluk verir",
        "Çünkü tarayıcı belirli bir nesilden sonra hesabı durdurur",
      ],
      answer: 1,
      explanation: "Durum sayısı 2<sup>4000</sup>; çok büyük ama sonlu. Aynı durum hep aynı sonraki durumu verdiğinden, bir durum yinelendiği anda arkasından gelen her şey de yinelenir. Güvercin yuvası ilkesi bunu en geç 2<sup>4000</sup> nesilde garanti eder; pratikte birkaç bin nesil yeter. Sonsuz düzlemde bu sav geçerli değildir.",
    },
  ],
  next: [
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi: Turing Makineleri, Lambda Hesabı ve Çözülemezlik", why: "Turing makinesi, durma problemi ve karar verilemezlik: planörlerle kurulan bilgisayarın kuramsal sınırları." },
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Sonlu durumlu makineler: bu sayfadaki simidin neden yalnızca çok büyük bir sonlu otomat olduğunu gör." },
    { href: "mantik-kapilari.html", title: "Mantık Kapıları", why: "Planör akışlarından kurulan VE, VEYA, DEĞİL kapılarının gerçek devrelerdeki karşılığı." },
    { href: "av-avci-lotka-volterra.html", title: "Av–Avcı Modeli", why: "Nüfus dalgalanmasının sürekli denklemlerle anlatımı; yerel kural yerine oranlar ve türevler." },
  ],
  sources: [
    { title: "Wikipedia · Conway's Game of Life", url: "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life", note: "Kurallar, Gardner'ın Ekim 1970 yazısı, 50 dolarlık ödül ve Gosper tabancası, R-pentomino, Gemini ve 2013 çoğalıcısı (İngilizce)." },
    { title: "MathWorld · Game of Life", url: "https://mathworld.wolfram.com/GameofLife.html", note: "Desen türleri, bilinen salınganlar ve uzay gemileri, yaşam benzeri kuralların gösterimi (İngilizce)." },
    { title: "Stanford Encyclopedia of Philosophy · Cellular Automata", url: "https://plato.stanford.edu/entries/cellular-automata/", note: "Von Neumann ve Ulam'dan Conway ve Wolfram'a hücresel otomatlar; evrensellik, karar verilemezlik ve beliriş tartışması (İngilizce)." },
    { title: "MacTutor · John Horton Conway", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Conway/", note: "Conway'in yaşamı ve Yaşam Oyunu'nun matematiğinin geri kalanı içindeki yeri (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
