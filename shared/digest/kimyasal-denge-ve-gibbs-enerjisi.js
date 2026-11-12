window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kimyasal-denge-ve-gibbs-enerjisi"] = {
  slug: "kimyasal-denge-ve-gibbs-enerjisi",
  title: "Kimyasal Denge: Q, K ve Gibbs Enerjisi",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir tepkime nerede durur, bozulunca nereye kayar? Q ile K'yi karşılaştır, Gibbs eğrisinin dibini bul ve Le Chatelier kuralının yanıldığı gerçek bir durumu kendi gözünle gör.",
  hook:
    "Sabit basınçta tutulan, azotu zaten bol bir amonyak karışımına biraz daha azot ekliyorsun. Ders kitabı kuralı açık: giren eklersen denge ürünlere kayar. Bu sayfa dengeyi baştan, tam olarak çözüyor ve tersini buluyor: amonyak azalıyor. Kural mı yanlış, yoksa onu yanlış yerde mi kullanıyoruz?",
  bigIdea:
    "Tepkimenin yönünü tek bir karşılaştırma belirler: o anki <strong>tepkime bölümü Q</strong> denge sabiti <strong>K</strong>'den küçükse tepkime ileri, büyükse geri gider; ΔG = RT ln(Q/K) bunun enerji dilidir, Le Chatelier ise çoğu zaman doğru çıkan bir kestirmedir.",
  story: [
    "Napolyon'un Mısır seferine katılan kimyager Claude Louis Berthollet, Mısır'daki Natron Vadisi'nin tuz göllerinin kıyılarında sodyum karbonat birikintileri buldu. Laboratuvarda sodyum karbonat ile kalsiyum klorür kireçtaşı ve sofra tuzu verir; göl kıyısında ise bol tuzlu su ile kireçtaşı, bu tepkimeyi tersine yürütüp sodyum karbonat üretiyordu. 1803'te yayımladığı <em>Essai de statique chimique</em>'te vardığı sonuç, bugün sıradan görünen ama o gün cesur olan bir fikirdi: tepkimenin son hâli, birbirine zıt iki sürecin dengesidir. Hangi yöne gidileceğini yalnız maddelerin \"çekimi\" değil, ne kadar bulundukları da belirliyordu.",
    "Bu fikri nicel hâle getirenler, Christiania'da (bugünkü Oslo) birlikte çalışan Cato Guldberg ve Peter Waage oldu. 1864'te Danca yayımladıkları üç makale ve 1867'deki Fransızca metinleri neredeyse hiç fark edilmedi. Jacobus van 't Hoff 1877'de onların çalışmasından habersiz benzer sonuçlara ulaştı. Guldberg ve Waage 1879'da daha ayrıntılı bir Almanca açıklama yayımladı, van 't Hoff da sonradan önceliklerini kabul etti. Bugün <strong>kütle etkisi yasası</strong> dediğimiz şey budur: dengede ürün ve giren derişimlerinin uygun üslerle kurulan oranı, sıcaklık sabitken sabittir.",
    "Aynı yıllarda Yale'de Josiah Willard Gibbs, 1875–1878 arasında iki bölüm hâlinde yayımlanan <em>On the Equilibrium of Heterogeneous Substances</em> ile dengenin termodinamik temelini kurdu: sabit sıcaklık ve basınçta sistem, bugün onun adını taşıyan enerjinin en küçük olduğu yerde durur. Makaleyi 1892'de Wilhelm Ostwald Almancaya, 1899'da Henry Le Chatelier Fransızcaya çevirdi. Van 't Hoff 1884'te <em>Études de dynamique chimique</em>'te sıcaklığın dengeyi hangi yöne kaydırdığını açıkladı; Le Chatelier aynı yıl bu düşünceyi basınca ve bileşime genişleten, bugün kendi adıyla bilinen ilkeyi ortaya attı. Karl Ferdinand Braun 1887'de aynı sonuca bağımsız olarak vardığı için ilkeye Braun–Le Chatelier ilkesi de denir. Van 't Hoff 1901'de kimyasal dinamik yasaları ile çözeltilerdeki osmotik basınç üzerine çalışmaları için Nobel Kimya Ödülü'nü aldı.",
    "Kuramın en büyük sınavı amonyak oldu. Fritz Haber 1909'da asistanı Robert Le Rossignol ile laboratuvarda, saatte yaklaşık 125 mL damla damla amonyak üretti. BASF süreci satın aldı, Carl Bosch 1910'da ölçek büyütmeyi başardı ve ilk sanayi tesisi 1913'te Oppau'da açıldı. Haber 1918'de, Bosch 1931'de Nobel aldı. Sürecin özü bu sayfanın 03. sekmesinde görünen bir uzlaşmadır: düşük sıcaklık dengeyi amonyağa kaydırır ama tepkimeyi yavaşlatır. Bugün reaktörden her geçişte gazın yalnız yaklaşık yüzde 15'i dönüşür; tepkimeye girmeyen gaz geri döndürülerek toplam dönüşüm yaklaşık yüzde 97'ye çıkarılır.",
  ],
  core: [
    {
      heading: "Denge durmak değil, eşit hızdır",
      body:
        "Kapalı bir kapta N₂ ile H₂ amonyağa dönüşürken amonyak da geri ayrışır. Başta ileri hız büyüktür; ürün biriktikçe geri hız artar, ileri hız düşer. İkisi eşitlendiğinde mol sayıları artık değişmez, ama moleküller dönüşmeyi sürdürür. Bu andaki bileşimi <strong>tepkime bölümü</strong> Q ölçer: her türün kısmi basıncını (gazlarda p/p°) stokiyometri katsayısı kadar üsle çarparsın; ürünlerin üssü artı, girenlerinki eksidir. Dengede Q, sıcaklığa bağlı tek bir sayıya, K'ye eşittir. Dengede ürünle girenin eşit olması gerekmez; eşit olan hızlardır.",
      formula: "Q = Π (pᵢ/p°)<sup>νᵢ</sup> &nbsp;·&nbsp; Q &lt; K → ileri, &nbsp;Q &gt; K → geri",
      formulaNote: "νᵢ girenlerde eksi, ürünlerde artı; p° = 1 bar. Saf katı ve sıvılar Q'ya girmez, bu yüzden Ksp = [M]ᵐ[A]ᵃ yazılır.",
    },
    {
      heading: "ΔG, Q ile K arasındaki uzaklıktır",
      body:
        "Sabit sıcaklık ve basınçta bir tepkimenin kendiliğinden yönünü Gibbs enerjisi değişimi verir. <strong>ΔG°</strong>, bütün türler standart hâldeyken (1 bar) bir tepkime molunun Gibbs enerjisi değişimidir; gerçek karışımın bileşimi RT ln Q terimiyle eklenir. Dengede ΔG = 0 ve Q = K olduğundan ΔG° = −RT ln K çıkar. İki denklem birleşince ΔG = RT ln(Q/K) olur: yön kararı Q/K'nin 1'den küçük ya da büyük olmasıdır. Ölçek akılda tutulacak kadar sadedir: 25 °C'de RT ln 10 ≈ 5.71 kJ/mol, yani ΔG°'deki her 5.71 kJ/mol, K'yi on kat değiştirir.",
      formula: "ΔG = ΔG° + RT ln Q &nbsp;·&nbsp; ΔG° = −RT ln K",
      formulaNote: "ΔG° bir referans farktır, tepkimenin hızı hakkında hiçbir şey söylemez; o soru kimyasal kinetiğindir.",
    },
    {
      heading: "ΔG° &gt; 0 iken bile ürün neden oluşur?",
      body:
        "Stokiyometrik bir karışımın Gibbs enerjisini tepkime ilerlemesi ξ'ye göre çiz. İki parçası vardır: saf türlerin standart enerjilerinden gelen bir <em>doğru</em> (eğimi ΔG°) ve karışmadan gelen <em>RT Σ nᵢ ln xᵢ</em> terimi. Karışma terimi her zaman negatiftir ve ξ = 0'da eğimi eksi sonsuzdur: saf girenlerin içine ilk ürün molekülleri girdiği anda entropi çok hızlı artar. Bu yüzden ΔG° ne kadar pozitif olursa olsun G ilk başta azalır ve en alçak nokta hiçbir zaman tam uçta değildir. Eğrinin herhangi bir yerdeki eğimi tam olarak o bileşimdeki ΔG'dir; dip, eğimin sıfır olduğu yerdir.",
      formula: "G(ξ) = Σ nᵢ[μᵢ° + RT ln(xᵢP/p°)] &nbsp;·&nbsp; dG/dξ = Σ νᵢμᵢ = ΔG",
      formulaNote: "ξ = 0 saf girenler, ξ = 1 saf ürünler. Büyük pozitif ΔG° dibi sıfıra çok yaklaştırır ama sıfıra oturtmaz.",
    },
    {
      heading: "Le Chatelier bir kestirmedir: türetme",
      body:
        "Sabit basınçta amonyak dengesi için mol kesirleriyle yaz: Q = x(NH₃)² / [x(N₂)·x(H₂)³] · (P/p°)⁻². Mol kesirlerini n'lerle açınca ln Q = 2 ln n(NH₃) − ln n(N₂) − 3 ln n(H₂) + 2 ln n<sub>top</sub> + sabit. Şimdi biraz N₂ ekle ve türev al: ∂ln Q/∂n(N₂) = −1/n(N₂) + 2/n<sub>top</sub>. İlk terim beklenen etkidir: N₂ arttıkça Q düşer, tepkime ileri gider. İkinci terim gizli etkidir: toplam mol arttığı için öbür türlerin mol kesirleri, yani kısmi basınçları düşer. x(N₂) &gt; 1/2 olduğunda ikinci terim kazanır, Q <em>artar</em> ve denge geri kayar. Kural yanlış değildir; yalnız kesin ölçüt olan Q ile K'nin yerini tutmaz.",
      formula: "∂ln Q/∂n(N₂) = (2x(N₂) − 1) / n(N₂)",
      formulaNote: "Sabit basınçta, N₂ + 3H₂ ⇌ 2NH₃ için. Sabit hacimde n<sub>top</sub> terimi yoktur ve kural her zaman doğru çıkar.",
    },
    {
      heading: "K(T): van 't Hoff ve ısı kapasitesi",
      body:
        "Sıcaklık Q'yu değil K'yi değiştirir. Gibbs–Helmholtz bağıntısından <strong>van 't Hoff denklemi</strong> çıkar: ln K'nin 1/T'ye göre eğimi −ΔH°/R'dir. Ekzotermik tepkimede K ısınınca küçülür. ΔH° sabit sayılırsa denklem kolayca integrallenir. Ama ΔH° sabit değildir: tepkimenin ısı kapasitesi farkı ΔrCp° sıfırdan farklıysa dΔH°/dT = ΔrCp° olur (Kirchhoff bağıntısı). Amonyakta ΔH° 25 °C'de −91.80, 400 °C'de −104.62 kJ/mol'dür ve sabit-ΔH° yolu 400 °C'de K'yi 3.3 kat büyük verir. Sayfa tam hesabı NIST-JANAF ısı kapasitesi denklemleriyle (Shomate katsayıları) yapar. Bir uyarı daha: iki saygın tablo aynı tür için birkaç kJ/mol farklı değer verebilir, K da bu farka üstel olarak duyarlıdır.",
      formula: "d ln K / d(1/T) = −ΔH°(T)/R &nbsp;·&nbsp; ln(K₂/K₁) ≈ −(ΔH°/R)(1/T₂ − 1/T₁)",
      formulaNote: "İkinci biçim yalnız ΔH° sabitken geçerlidir; T₁ ile T₂ birbirine yaklaştıkça hatası küçülür.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var. <strong>01 · Q, K ve Le Chatelier</strong>, kapalı kapta üç gaz tepkimesinden birini (amonyak, N₂O₄ ⇌ 2NO₂, H₂ + I₂ ⇌ 2HI) Q = K denklemini sayısal olarak tam çözerek dengeye getirir. <strong>Dengeyi boz</strong> düğmeleri (+1 mol giren, Sıkıştır, +2 mol Ar, +50 °C …) Le Chatelier tahminini ve yeniden çözülen dengenin <strong>Ölçülen kayma Δξ</strong> değerini yan yana koyar. <strong>Oynat</strong>, aynı dengeye bir kinetik benzetimle zamanla varır; buradaki hız yasaları stokiyometriden yazılmış öğretici bir varsayımdır, gerçek amonyak sentezinin kinetiği değildir. <strong>02 · ΔG°, ΔG ve K</strong> Gibbs eğrisini çizer, <strong>03 · Sıcaklık: van 't Hoff</strong> K(T)'yi iki yoldan hesaplar, <strong>04 · Çözünürlük dengesi</strong> Ksp ile çözünürlüğü ve karıştırmada çökelmeyi inceler. Termodinamik veriler OpenStax Chemistry 2e Ek G ve Ek J ile NIST Chemistry WebBook'tan gelir; gazlar idealdir, çözeltilerde etkinlik katsayıları 1 alınır.",
    experiments: [
      {
        title: "Kural nerede tutar, nerede yanılır?",
        predict:
          "Varsayılan amonyak dengesinde (400 °C, 1 L, 1 mol N₂ + 3 mol H₂) kabı sıkıştırmak, Ar eklemek ve ısıtmak dengeyi nereye kaydırır? Sabit basınçta N₂ fazlası olan bir karışıma N₂ eklemek ne yapar?",
        do:
          "01. sekmede sırayla <strong>Sıkıştır</strong>, <strong>+2 mol Ar</strong> ve <strong>+50 °C</strong> düğmelerine bas; her seferinde <strong>Hemen sonra Q ve yeni K</strong>, <strong>Le Chatelier tahmini</strong> ve <strong>Ölçülen kayma Δξ</strong> kutularını oku. Sonra <strong>Örnek: N₂ fazlası, sabit P</strong> düğmesine bas (200 bar, 3 mol N₂ + 1 mol H₂, ardından +1 mol N₂).",
        observe:
          "Sıkıştırma: Q/K = 0.2500, tahmin ve ölçüm ileri, Δξ = +0.1101 mol. Sabit hacimde Ar: Q/K = 1.000, kayma yok. Isıtma: K 1.797×10⁻⁴ → 4.900×10⁻⁵, Q/K = 3.177, Δξ = −0.09844 mol, geri. N₂ fazlası örneğinde dengede x(N₂) = 0.775; N₂ ekleyince Q/K = 1.200 olur. Tahmin \"ileri\" der, ölçülen Δξ = −0.006049 mol'dür ve durum satırı \"Tahmin ile ölçüm uyuşmuyor\" yazar.",
        explain:
          "İlk üç bozmada Q/K'nin 1'den küçük ya da büyük olması Le Chatelier'yle aynı sonucu verir. Sıkıştırmada Δn = −2 olduğu için Q tam dört kat küçülür. Isıtmada asıl değişen K'dir: 3.67 kat düşer. Sabit hacimde kısmi basınçlar T ile arttığından Q da (723.15/673.15)⁻² = 0.8665 katına iner; durum satırı bunu yazar. Sonuç Q/K = 3.177'dir. Son örnekte ∂ln Q/∂n(N₂) = (2x(N₂) − 1)/n(N₂) pozitiftir, çünkü x(N₂) &gt; 1/2: eklenen N₂ öbür türlerin kısmi basınçlarını o kadar düşürür ki Q yükselir. Kural ilk etkiyi görür, ikinciyi görmez.",
      },
      {
        title: "ΔG° pozitifken ürün",
        predict:
          "400 °C ve 1 bar'da amonyak oluşumu için ΔG° = +48.27 kJ/mol. Stokiyometrik N₂ + 3H₂ karışımında hiç amonyak oluşmaz mı?",
        do:
          "02. sekmede <strong>ΔG° &gt; 0: NH₃, 400 °C</strong> düğmesine bas. <strong>K'den çözülen denge ξ</strong> ile <strong>G(ξ) eğrisinin ölçülen en alçak noktası</strong> kutularını karşılaştır. <strong>İmleç</strong> kaydırıcısını gezdirip <strong>İmleçte ölçülen eğim dG/dξ</strong> ile <strong>İmleçte ΔG</strong> değerlerine bak. Sonra <strong>N₂O₄, 25 °C</strong> düğmesine geç.",
        observe:
          "K = 1.797×10⁻⁴, K'den ξ = 0.00859439, eğrinin dibi 0.00859440; dengede x(NH₃) = 0.00432. ξ = 0.5'te ΔG = 57.638 kJ/mol ve ölçülen eğim de 57.638 kJ/mol. N₂O₄'te ΔG° = 4.73 kJ/mol, K = 0.1484, dip ξ = 0.189165 ve x(NO₂) = 0.318.",
        explain:
          "Eğrinin dibi, ΔG°'yi taşıyan doğrunun değil, ona eklenen karışma çukurunun işidir; bu çukurun ξ = 0'daki eğimi eksi sonsuz olduğu için dip uçtan biraz içeridedir. Eğimin ΔG formülüyle aynı çıkması, ΔG'nin aslında dG/dξ olduğunu gösterir. ΔG° küçük olan N₂O₄'te dip çok daha içeridedir: K = 0.15, \"az ama hatırı sayılır\" ürün demektir.",
      },
      {
        title: "Sabit ΔH° ne kadar uzağa taşınır?",
        predict:
          "25 °C'deki K ve ΔH° ile van 't Hoff denklemi amonyağın 400 °C'deki K'sini yüzde kaç doğrulukla verir?",
        do:
          "03. sekmeyi varsayılan hâlinde aç ve <strong>K(T), tam hesap</strong>, <strong>K(T), van 't Hoff (sabit ΔH°)</strong> ve <strong>ΔrCp°(T)</strong> kutularını oku. Sonra <strong>T₁ = T − 50 °C</strong> ve <strong>Amonyak, 450 °C</strong> düğmelerine bas; <strong>OpenStax 13.2 değeriyle karşılaştırma</strong> kutusuna da göz at.",
        observe:
          "Tam hesap 1.797×10⁻⁴, van 't Hoff 5.960×10⁻⁴: fark +231.71 %. ΔH° −91.80'den −104.62 kJ/mol'e değişir, ΔrCp° = −23.71 J/(mol·K). T₁ = 350 °C seçilince fark +0.89 %'e iner. OpenStax'ın Kc = 0.50 değerinden çevrilen Kp = 1.60×10⁻⁴, hesap 1.80×10⁻⁴ (+12.57 %). 450 °C'de K = 4.900×10⁻⁵; 100 bar'da denge dönüşümü 27.63 %, 1 bar'da 0.45 %.",
        explain:
          "Sabit-ΔH° yaklaşımının hatası ΔrCp° ile orantılıdır ve aralık genişledikçe hızla büyür: 375 K'lik bir sıçramada K'yi üç kattan fazla şaşırır, 50 K'de ise yüzde bire iner. Dönüşüm eğrisi Haber–Bosch ikilemini gösterir: sıcaklık arttıkça denge verimi düşer, ama hız artar; yüksek basınç (Δn = −2) verimi geri kazandırır.",
      },
      {
        title: "Küçük Ksp, büyük çözünürlük",
        predict:
          "Ag₂CrO₄'ün Ksp'si (9.0×10⁻¹²) AgCl'ninkinden (1.6×10⁻¹⁰) küçük. Saf suda hangisi daha çok çözünür? Suya 0.010 mol/L Cl⁻ eklemek AgCl'nin çözünürlüğünü kaç kat düşürür?",
        do:
          "04. sekmede AgCl için <strong>Molar çözünürlük s</strong> değerini not et, sonra <strong>Ag₂CrO₄ ile AgCl</strong> düğmesine bas. <strong>Tuz</strong> menüsünden AgCl'ye dönüp <strong>Ortak iyon</strong> menüsünden <strong>Anyon eklenmiş</strong> seç (derişim 0.010 mol/L). Son olarak karıştırma kutularına bak: varsayılan 1 mM + 1 mM AgNO₃ ve NaCl, sonra <strong>Sınırda: 10⁻⁵ + 10⁻⁵ M</strong>.",
        observe:
          "AgCl'de s = 1.265×10⁻⁵, Ag₂CrO₄'te 1.310×10⁻⁴ mol/L: on kat daha çözünür. 0.010 mol/L Cl⁻ ile s = 1.600×10⁻⁸ mol/L, saf sudakinin 0.00126 katı; durum satırı iyon şiddeti uyarısı verir. Karıştırmada Qsp = 2.50×10⁻⁷, Q/K = 1560 ve 0.04874 mmol AgCl çöker; kalan çarpım tam Ksp'dir. Sınırdaki karışımda Qsp &lt; Ksp, çökelti yok.",
        explain:
          "AgCl'de Ksp = s², Ag₂CrO₄'te Ksp = (2s)²·s = 4s³; farklı üslerle yazılmış iki Ksp doğrudan karşılaştırılamaz. Ortak iyon dengeyi tuz tarafına iter ve s ≈ Ksp/[Cl⁻] olur. Bu derişimde gerçek çözünürlük gösterilenden büyüktür, çünkü sayfa etkinlik katsayılarını 1 alır; yüksek Cl⁻'de oluşan AgCl₂⁻ gibi kompleksleri de içermez.",
      },
    ],
  },
  wow: [
    {
      title: "Saatte 125 mL'den yılda 230 milyon tona",
      body:
        "Haber ile Le Rossignol'ün 1909'daki masaüstü düzeneği saatte yaklaşık 125 mL amonyak damlatıyordu. 2018'de dünyada yaklaşık 230 milyon ton amonyak üretildi; süreç dünya enerjisinin yaklaşık yüzde 1–2'sini kullanıyor.",
    },
    {
      title: "Vücudundaki azotun neredeyse yarısı",
      body:
        "Yapay gübre yapılmasaydı bugünkü nüfusu beslemek mümkün olmazdı. Vaclav Smil'in çalışmalarına dayanan bir kestirime göre insan dokularındaki azotun neredeyse yarısı Haber–Bosch sürecinden gelir. Kesin bir ölçüm değil, küresel azot bütçesinden yapılmış bir hesaptır.",
    },
    {
      title: "İki tablo, iki kat fark",
      body:
        "N₂O₄ ⇌ 2NO₂ için 25 °C'de OpenStax Ek G verisi ΔG° = ΔH° − TΔS° yoluyla 2.885 kJ/mol ve K = 0.3123, NIST-JANAF verisi 4.729 kJ/mol ve K = 0.1484 verir. Yalnız 1.84 kJ/mol'lük fark K'yi 2.10 katına çıkarır: K üstel bir büyüklüktür ve tablo seçimi bile sonucu değiştirir. 02. sekmede tepkimeyi N₂O₄ seçip tablonun son satırına bak.",
    },
  ],
  worked: {
    title: "N₂O₄ ne kadar ayrışır?",
    prompt:
      "Kapalı, pistonlu bir kapta 1.00 mol saf N₂O₄ 25 °C'de ve 1 bar toplam basınçta dengeye geliyor: N₂O₄(g) ⇌ 2NO₂(g). NIST-JANAF verisiyle ΔG° = 4.73 kJ/mol'dür. K'yi, ayrışma kesrini ve NO₂'nin mol kesrini bul; basınç 10 bar'a çıkınca ne olacağını hesapla.",
    steps: [
      "K'yi ΔG°'den bul: RT = 8.314 J/(mol·K) × 298.15 K = 2479 J/mol. ln K = −4729 / 2479 = −1.908, K = e<sup>−1.908</sup> ≈ 0.148.",
      "Bileşimi α ile yaz: n(N₂O₄) = 1 − α, n(NO₂) = 2α, n<sub>top</sub> = 1 + α. Kısmi basınçlar pᵢ = xᵢP olduğundan K = (2α/(1+α))² P / [((1−α)/(1+α)) p°] = 4α²P / [(1 − α²) p°].",
      "P = 1 bar için çöz: α² = K/(4 + K) = 0.1484/4.1484 = 0.03578, α = 0.189. x(NO₂) = 2α/(1 + α) = 0.378/1.189 = 0.318.",
      "P = 10 bar: α² = K/(40 + K) = 0.1484/40.148 = 0.003697, α = 0.0608. Basınç on kat arttı, ayrışma üç kattan fazla azaldı: sistem daha az gaz molü olan N₂O₄ tarafına kaydı, ama K hiç değişmedi.",
      "Sayfada dene: 02. sekmede <strong>N₂O₄, 25 °C</strong> düğmesi ξ = 0.189165 ve x(NO₂) = 0.318 gösterir; <strong>Toplam basınç P</strong> kaydırıcısını 10 bar yapınca dip 0.0608'e kayar. Ek G verisiyle (K = 0.3123) aynı hesap α = 0.269 verirdi.",
    ],
    result:
      "25 °C ve 1 bar'da N₂O₄'ün yaklaşık yüzde 19'u ayrışır (x(NO₂) = 0.318); 10 bar'da bu oran yüzde 6'ya iner. Tablo verisindeki küçük bir fark ise ayrışmayı yüzde 27'ye çıkarabilir.",
  },
  misconceptions: [
    {
      myth: "Le Chatelier ilkesi bir doğa yasasıdır, her zaman doğru yönü verir.",
      truth:
        "O, çoğu durumda doğru çıkan bir kestirmedir. Sabit basınçta amonyak karışımına, N₂'nin mol kesri 1/2'den büyükken N₂ eklemek dengeyi girenlere kaydırır. Kesin ölçüt bozmadan hemen sonraki Q'yu K ile karşılaştırmaktır; 01. sekmedeki N₂ fazlası örneği bunu gösterir.",
    },
    {
      myth: "ΔG° pozitifse tepkime hiç olmaz.",
      truth:
        "ΔG° pozitifse K &lt; 1'dir, yani dengede girenler baskındır; ama ürün sıfır değildir. 400 °C'de amonyak için ΔG° = +48.27 kJ/mol iken stokiyometrik karışımda x(NH₃) = 0.00432 olur. Karışma terimi G'nin dibini uçtan içeri çeker.",
    },
    {
      myth: "Ksp'si küçük olan tuz her zaman daha az çözünür.",
      truth:
        "Yalnız aynı formül tipindeki tuzlar için. Ag₂CrO₄'te Ksp = 4s³, AgCl'de Ksp = s²; daha küçük Ksp'ye karşın Ag₂CrO₄ saf suda on kat daha çözünür (1.310×10⁻⁴'e karşı 1.265×10⁻⁵ mol/L).",
    },
    {
      myth: "Kaba soy gaz eklemek her zaman dengeyi kaydırır, çünkü basınç artar.",
      truth:
        "Sabit hacimde Ar eklemek toplam basıncı artırır ama hiçbir kısmi basıncı değiştirmez; Q aynı kalır ve kayma olmaz. Sabit basınçta ise Ar karışımı seyreltir ve Δn ≠ 0 ise denge çok mollü tarafa kayar; H₂ + I₂ ⇌ 2HI gibi Δn = 0 tepkimelerde yine kayma olmaz.",
    },
  ],
  glossary: [
    { term: "Tepkime bölümü (Q)", definition: "Herhangi bir anda ürün ve giren etkinliklerinin stokiyometri katsayılarıyla üslenmiş oranı; dengede K'ye eşittir." },
    { term: "Denge sabiti (K)", definition: "Belirli bir sıcaklıkta dengedeki Q değeri; K = e<sup>−ΔG°/RT</sup> ile standart Gibbs enerjisine bağlıdır." },
    { term: "Tepkime ilerlemesi (ξ)", definition: "Tepkimenin kaç \"tepkime molu\" ilerlediğini ölçen değişken: nᵢ = nᵢ,₀ + νᵢξ." },
    { term: "Standart Gibbs enerjisi değişimi (ΔG°)", definition: "Bütün türler standart hâldeyken (gazlarda 1 bar) bir tepkime molunun Gibbs enerjisi değişimi." },
    { term: "Kimyasal potansiyel (μ)", definition: "Bir türün mol başına Gibbs enerjisi; ideal gazda μ = μ° + RT ln(p/p°)." },
    { term: "Le Chatelier ilkesi", definition: "Dengedeki bir sistemin bozmanın etkisini azaltacak yönde tepki vereceğini söyleyen, çoğu durumda doğru çıkan nitel kural." },
    { term: "Çözünürlük çarpımı (Ksp)", definition: "Az çözünen bir tuzun doymuş çözeltisindeki iyon derişimlerinin, formüldeki katsayılarla üslenmiş çarpımı." },
    { term: "Etkinlik", definition: "Bir türün denge ifadesine giren \"etkin\" derişimi; seyreltik çözeltide derişime, iyon şiddeti büyüdükçe ondan küçük bir değere karşılık gelir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede denge bir ezber listesidir: giren ekle, ürün çoğalır; ısıt, endotermik yön kazanır. Üniversitede, <strong>Genel Kimya</strong>'dan sonra <strong>Fizikokimya</strong> ve <strong>Kimyasal Termodinamik</strong> derslerinde bu liste tek bir koşula iner: sabit T ve P'de Σνᵢμᵢ = 0. Kimyasal potansiyel, karışımın Gibbs enerjisinin mol sayısına göre kısmi türevidir ve bu sayfanın 02. sekmesi tam olarak bu türevi sayısal olarak alır. K(T) için van 't Hoff ve Kirchhoff bağıntıları, ısı kapasitesi tabloları ve Gibbs–Helmholtz denklemi aynı derslerin ilk haftalarındadır.",
      "Sayfanın açıkça söylediği sınırlar, sonraki derslerin konusudur. Yüksek basınçta gazlar ideal değildir; basınç yerine <em>fügasite</em> kullanılır ve amonyak reaktörleri böyle hesaplanır. İyonik çözeltilerde derişim yerine etkinlik gelir; Debye–Hückel kuramı, iyon şiddeti arttıkça etkinlik katsayısının neden 1'in altına düştüğünü açıklar. <strong>İstatistiksel Termodinamik</strong> ise K'yi moleküllerin bölüşüm fonksiyonlarından hesaplar: tablolardaki ΔG° değerlerinin kaynağı, sonunda moleküllerin enerji düzeyleridir. Kinetik tarafta da sayfanın öğretici hız yasası yerini yüzey kataliziyle ölçülen gerçek mekanizmalara bırakır.",
    ],
    topics: ["Kimyasal potansiyel", "Gibbs–Helmholtz denklemi", "Kirchhoff bağıntısı", "Fügasite ve gerçek gazlar", "Etkinlik ve Debye–Hückel kuramı", "Bölüşüm fonksiyonları", "Heterojen kataliz"],
  },
  quiz: [
    {
      question:
        "Sabit basınçta N₂ + 3H₂ ⇌ 2NH₃ dengesindeki bir karışımda x(N₂) = 0.80. Az miktarda N₂ eklenirse ne olur?",
      options: [
        "Q düşer, denge ileri kayar",
        "Q artar, denge geri kayar",
        "K artar, denge ileri kayar",
        "Hiçbir şey değişmez, çünkü basınç sabittir",
      ],
      answer: 1,
      explanation:
        "∂ln Q/∂n(N₂) = (2x(N₂) − 1)/n(N₂) ve x(N₂) = 0.80 için pozitiftir: eklenen N₂ öbür türlerin kısmi basınçlarını o kadar düşürür ki Q yükselir. Q &gt; K olduğundan denge geri kayar. K yalnız sıcaklıkla değişir.",
    },
    {
      question:
        "25 °C'de bir tepkimenin ΔG° değeri 11.4 kJ/mol artarsa K yaklaşık nasıl değişir?",
      options: ["İki katına çıkar", "Yarıya iner", "Yüzde birine iner", "Değişmez"],
      answer: 2,
      explanation:
        "ΔG° = −RT ln K ve 25 °C'de RT ln 10 ≈ 5.71 kJ/mol. 11.4 kJ/mol yaklaşık iki on katlık adımdır, yani K yüz kat küçülür. Aynı ölçekle RT ln 2 = 1.72 kJ/mol'lük bir fark K'yi iki kat değiştirir. N₂O₄ ⇌ 2NO₂'de iki tablo arasındaki 1.84 kJ/mol fark K'yi 2.10 katına çıkarır; tablo verilerindeki küçük farkların önemi buradan gelir.",
    },
    {
      question:
        "Amonyak sentezinde 25 °C'deki K ve ΔH° ile 400 °C'deki K'yi sabit-ΔH° van 't Hoff denklemiyle bulursan sonuç neden tam hesaptan üç kattan fazla büyük çıkar?",
      options: [
        "Çünkü van 't Hoff denklemi yalnız endotermik tepkimelerde geçerlidir",
        "Çünkü ΔrCp° sıfır değildir ve ΔH° bu aralıkta −91.80'den −104.62 kJ/mol'e değişir",
        "Çünkü yüksek sıcaklıkta katalizör K'yi değiştirir",
        "Çünkü basınç 1 bar'dan farklıdır",
      ],
      answer: 1,
      explanation:
        "dΔH°/dT = ΔrCp° bu aralıkta −44 ile −24 J/(mol·K) arasında olduğundan tepkime ısıtıldıkça daha da ekzotermik olur; K, sabit ΔH°'nin öngördüğünden hızlı düşer. K basınca bağlı değildir ve katalizör K'yi değiştirmez. 03. sekmede T₁'i T'ye yaklaştırınca hata yüzde bire iner.",
    },
  ],
  next: [
    { href: "kimyasal-kinetik.html", title: "Kimyasal Kinetik Laboratuvarı", why: "Dengenin \"nereye\" sorusunun yanında \"ne kadar hızlı\" sorusu: hız yasaları, Arrhenius ve katalizörün K'yi değiştirmeden dengeye varışı nasıl hızlandırdığı." },
    { href: "asit-baz-titrasyonu.html", title: "Asit-Baz Titrasyonu Laboratuvarı", why: "Aynı Q–K düşüncesi çözeltide: zayıf asitlerin Ka dengesi, tampon bölgesi ve çok protonlu asitlerin titrasyon eğrileri." },
    { href: "elektrokimya.html", title: "Elektrokimya Laboratuvarı: Hücre, Nernst, Faraday", why: "ΔG = −nFE ile Gibbs enerjisi voltaja dönüşür; Nernst denklemi, ΔG = ΔG° + RT ln Q'nun elektrokimyasal biçimidir." },
    { href: "entropi-ve-istatistiksel-fizik.html", title: "Entropi ve İstatistiksel Fizik: Mikro Durumlar, Boltzmann ve Ising", why: "Gibbs eğrisini dibe çeken karışma entropisinin mikro durumlarla sayılan kökeni." },
  ],
  sources: [
    { title: "OpenStax · Chemistry 2e, 13.3 Shifting Equilibria: Le Châtelier's Principle", url: "https://openstax.org/books/chemistry-2e/pages/13-3-shifting-equilibria-le-chateliers-principle", note: "Bozmalar, Haber–Bosch sürecinin 400–500 °C çalışma aralığı ve katalizörün K'yi değiştirmemesi; Ek G ve Ek J sayfadaki veri tablolarıdır (İngilizce, açık ders kitabı)." },
    { title: "NIST Chemistry WebBook", url: "https://webbook.nist.gov/chemistry/", note: "N₂, H₂, NH₃, NO₂, N₂O₄, HI ve I₂(g) için Shomate ısı kapasitesi katsayıları (Chase 1998, NIST-JANAF); sayfanın tam K(T) hesabının kaynağı." },
    { title: "Wikipedia · Law of mass action", url: "https://en.wikipedia.org/wiki/Law_of_mass_action", note: "Tarihçe: Berthollet'nin Mısır'daki natron gözlemi, Guldberg ve Waage'ın 1864, 1867 ve 1879 yayınları, van 't Hoff'un 1877'deki bağımsız sonucu (İngilizce)." },
    { title: "Wikipedia · Haber process", url: "https://en.wikipedia.org/wiki/Haber_process", note: "Haber ile Le Rossignol'ün 1909 düzeneği, Bosch, Oppau 1913, geçiş başına dönüşüm, üretim miktarı ve Smil'in azot tahmini (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
