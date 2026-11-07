window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["ph-indikator"] = {
  slug: "ph-indikator",
  title: "pH ve İndikatörler: Su Dengesi, Logaritma ve Renk",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Saf su 100 °C'de pH 6.13'tedir ama asidik değildir; asit eklenen su asla bazik olmaz; bir indikatörün rengi de tek bir dalga boyundan değil, bütün soğurma tayfından doğar.",
  hook:
    "Kaynayan saf suya bir pH metre daldırdığını düşün: ekran 6.13 gösteriyor. Su asitlenmiş mi? Hayır: 100 °C'de nötr nokta tam orasıdır; ekran 7.00 deseydi su bazik olurdu.",
  bigIdea:
    "pH, H₃O⁺ derişiminin on katlık basamaklarla yazılışıdır ve anlamını suyun kendi dengesinden alır: <strong>nötr</strong>, pH 7 değil [H₃O⁺] = [OH⁻] demektir; bir <strong>indikatör</strong> ise bu dengeyi soğurma tayfıyla renge çeviren, iki biçimli bir zayıf asittir.",
  story: [
    "Asitliği renkle okumak, pH sözcüğünden yüzyıllarca eskidir. Turnusolün İngilizce adı <em>litmus</em>, Eski İskandinavcada 'boya yosunu' anlamına gelen <em>litmosi</em>'den gelir; sözcüğün bilinen tek Orta Çağ kaydı, 1316 tarihli bir Norveç yasasının kürk gümrüğü bölümüdür. Kaynaklar Katalan hekim Arnaldus de Villa Nova'nın 1300 dolaylarında likenlerden çıkarılan bu boyayla asitleri ve bazları incelediğini, onu asitlik testi olarak kullanan bilinen ilk kişi olduğunu yazar. Turnusol tek bir molekül değildir: 10–15 boyanın karışımıdır, üretimi uzun süre sır gibi saklanmıştır; bilinen bir tarifte likenler soda ve amonyak çözeltisinde dört hafta kadar bekletilir ve renk kırmızıdan mora, sonra maviye döner. Sayfada turnusolün hesaplanmış bir tayfı olmamasının nedeni budur: tek bir soğurma tayfı yoktur.",
    "Rengin neden değiştiğini anlamak için önce suyun içinde ne olduğunu bilmek gerekiyordu. 1870'lerin ikinci yarısında Würzburg'da Friedrich Kohlrausch, elektrolizi önlemek için alternatif akım kullanarak tuz ve asit çözeltilerinin iletkenliğini büyük bir hassasiyetle ölçtü. Zayıf elektrolitlerde çözelti seyreldikçe molar iletkenlik artıyordu: moleküllerin daha büyük bir kesri iyonlarına ayrılıyordu. İyon kuramının kurucuları Arrhenius, Ostwald ve van 't Hoff, Kohlrausch'tan gelen yöntem ve aletlerle yetişti. Arrhenius'un tanımında (hikâyesi Asit-Baz Titrasyonu defterinde) asit, suda H⁺ veren maddeydi; Ostwald, seyreltmeyle büyüyen ayrışmayı kütle etkisi yasasıyla birleştirip <strong>seyreltme yasası</strong> diye bilinen formüle döktü. Sayfadaki 'Ostwald yasası' kartı odur ve sayfa onun nerede yanıldığını da gösterir: yasa suyun kendi iyonlarını hesaba katmaz. Oysa en saf su bile az da olsa elektrik iletir, çünkü su kendi kendine iyonlaşır. Sørensen 1909'da bu küçücük derişimleri pH ile yazmayı önerdi; ölçeğin ortasındaki 7 de bu dengeden gelir: 25 °C'de K<sub>w</sub> ≈ 10⁻¹⁴ olduğu için saf suda iki iyonun her biri yaklaşık 10⁻⁷ mol/L'dir. Ama K<sub>w</sub> sıcaklıkla değişir; sayfanın ilk sekmesi tam bunu gösterir.",
    "İndikatörün sırrı ise molekülün içindedir. Proton kaybı yalnızca yükü değil, molekülün elektronlarının yayıldığı bağ sistemini de değiştirir; bu yüzden iki biçim farklı dalga boylarını soğurur. Fenolftalein bunun en temiz örneğidir: Adolf von Baeyer'in 1871'de sentezlediği bu molekül, nötr ve asidik çözeltide renksiz bir halka (lakton) biçimindedir; iki proton kaybedince halka açılır ve pembe In²⁻ biçimi doğar. Kuvvetli bazda bir OH⁻ daha bağlanır, elektron sistemi bölünür ve renk yavaşça kaybolur. Mutfakta da aynı fizik çalışır: kırmızı lahananın antosiyaninleri asitte kırmızı, bazda mavidir ve lahana suyu sirkeyle karbonat arasında renkten renge geçer. Bugün bu renk değişimi bir ölçüm aracıdır: spektrofotometre her dalga boyunda soğurbanlığı ölçer ve pK<sub>In</sub>, sayfanın son panelindeki gibi bir eğri uydurmayla bulunur.",
  ],
  core: [
    {
      heading: "Logaritmik ölçek: bir birim, on kat",
      body:
        "Mide özsuyunda (pH 1.4) H₃O⁺ derişimi kandakinin (pH 7.4) yaklaşık bir milyon katıdır; iki sayı arasında yalnızca altı birim var. pH bu yüzden bir <strong>logaritmik ölçek</strong>tir: [H₃O⁺]'yi 10'un kuvveti olarak yazar ve üssün işaretini çevirir. Bir birim on kat, üç birim bin kat demektir; 0.30 birim bile iki kat eder, çünkü log 2 = 0.301. Suda serbest bir proton dolaşmaz, bir su molekülüne bağlanır; [H⁺] ile [H₃O⁺] aynı şeyin iki yazılışıdır. Sayfadaki şeridin üstünde [H₃O⁺], altında [OH⁻] on katlık basamaklarla yazılıdır. 0 ile 14 bir duvar değildir: 1 mol/L'den derişik kuvvetli asitte pH sıfırın altına iner; kaydırıcı bu yüzden −1'den 15'e uzanır ve uçları 'derişik' diye işaretler.",
      formula: "pH = −log[H₃O⁺] &nbsp;·&nbsp; [H₃O⁺] = 10<sup>−pH</sup> mol/L",
      formulaNote:
        "Logaritmanın içine birimsiz sayı girer: derişim 1 mol/L'ye bölünmüş alınır. Kesin tanımda derişimin yerini etkinlik alır ('Tam pH' kartına bak).",
    },
    {
      heading: "Su kendi kendine iyonlaşır; nötr nokta sıcaklıkla kayar",
      body:
        "En saf su bile yalnız moleküllerden oluşmaz: iki su molekülü arada bir proton alışverişi yapar, 2H₂O ⇌ H₃O⁺ + OH⁻. 25 °C'de bu dengenin sabiti K<sub>w</sub> = 1.01·10⁻¹⁴'tür (pK<sub>w</sub> = 13.995); saf suda iki iyon eşit derişimdedir, her biri 1.0·10⁻⁷ mol/L. Yaklaşık 550 milyon su molekülüne bir H₃O⁺ düşer. Tepkime ısı alır, bu yüzden ısıtınca denge sağa kayar: K<sub>w</sub> 0 °C'de 1.13·10⁻¹⁵, 37 °C'de 2.39·10⁻¹⁴, 100 °C'de 5.60·10⁻¹³'tür; 0'dan 100 °C'ye yaklaşık 500 kat büyür. <strong>Nötr</strong>, [H₃O⁺] = [OH⁻] demektir ve bu pH = pK<sub>w</sub>/2'de olur: 0 °C'de 7.47, 25 °C'de 7.00, 37 °C'de 6.81, 100 °C'de 6.13. Kaynayan saf su asidik değildir; yalnızca iki iyondan da daha çok içerir.",
      formula: "K<sub>w</sub> = [H₃O⁺][OH⁻] &nbsp;·&nbsp; pH<sub>nötr</sub> = ½·pK<sub>w</sub>(T) &nbsp;·&nbsp; d ln K<sub>w</sub>/dT = ΔH°/(RT²)",
      formulaNote:
        "Sonuncusu van 't Hoff denklemidir. Sayfanın 20 ve 30 °C'deki pK<sub>w</sub> değerleri ΔH° ≈ 56 kJ/mol verir: kuvvetli asit ile kuvvetli bazın nötrleşme ısısının ters işaretlisi.",
    },
    {
      heading: "Tam pH: kütle ve yük denkliği, kısa yolların sınırı",
      body:
        "Bir çözeltinin pH'ını kesin bulmak için üç tür denklem yeter: denge sabitleri (K<sub>a</sub>, K<sub>w</sub>), <strong>kütle denkliği</strong> (asidin bütün biçimlerinin toplamı c'dir) ve <strong>yük denkliği</strong> (artı yüklerin toplam derişimi eksi yüklerinkine eşittir). Tek protonlu zayıf asit HA için bunlar birleşince tek bilinmeyenli bir denklem kalır. Ders kitabının kısa yolu, [H₃O⁺] = √(K<sub>a</sub>·c), bu denklemden iki terim atar: suyun OH⁻'sini ve ayrışan kısmı (c − x ≈ c). Biri bozulunca kısa yol çöker. Sayfada asetik asit 0.1 M'de tam çözüm 2.881, kısa yol 2.878 verir; 10⁻⁵ M'de 5.148'e karşı 4.878: moleküllerin yüzde 71'i ayrışmıştır ve 'az ayrışma' varsayımı çökmüştür. Kısa yol ancak c ≳ 2 mM'de 0.02 birim içinde kalır. Son bir sınır daha var: hesap derişimle yapılır, ölçülen pH ise <strong>etkinliğe</strong> bağlıdır, a = γ·c. 0.1 M HCl'de iyonlar birbirini perdeler; Davies denklemi γ ≈ 0.78 verir ve pH 1.000 yerine yaklaşık 1.11 olur. Sayfa bu durumda 'Model sınırında' uyarısı yazar.",
      formula: "[H₃O⁺] = K<sub>w</sub>/[H₃O⁺] + c·K<sub>a</sub>/([H₃O⁺] + K<sub>a</sub>)",
      formulaNote:
        "Sol yan tek artı yük, sağ yan OH⁻ ile A⁻. h büyüdükçe sol yan artar, sağ yan azalır; kök tektir ve sayfa onu log h üzerinde ikiye bölmeyle 10⁻¹¹ pH'a kadar bulur.",
    },
    {
      heading: "Tür kesirleri: hangi biçim, hangi pH'ta?",
      body:
        "Bir asidin her biçiminin payı (α) yalnız pH'a ve pK<sub>a</sub>'lara bağlıdır, toplam derişime bağlı değildir. Tek protonlu asitte pH = pK<sub>a</sub>'da iki biçim eşittir; pH bir birim uzaklaştıkça oran on kat değişir. Çok protonlu asitte fikir zincirlenir: fosforik asidin dört biçimi (H₃PO₄, H₂PO₄⁻, HPO₄²⁻, PO₄³⁻) pK<sub>a</sub> = 2.16, 7.21 ve 12.32'de sırayla devir teslim yapar. Kan pH'ında, 7.40'ta, fosfatın yüzde 39.2'si H₂PO₄⁻, yüzde 60.8'i HPO₄²⁻'dir; öteki iki biçimin payı milyonda birkaçtır. Logaritmik derişim (Sillén) diyagramında aynı bilgi, eğimleri tam sayı (0, ±1, ±2, …) olan doğru parçalarına dönüşür. Kesirler bir sürprizi de açıklar: Ostwald yasası suyu yok saydığı için seyreltince her zayıf asidin tamamen ayrışacağını söyler; oysa sonsuz seyreltmede pH suyun belirlediği ≈ 7'ye gider ve ayrışma K<sub>a</sub>/(K<sub>a</sub> + 10⁻⁷) civarında donar. HCN (pK<sub>a</sub> 9.21) için bu sınır yüzde 0.61'dir: ne kadar seyreltirsen seyrelt, HCN moleküllerinin yüzde 99'dan fazlası ayrışmadan kalır.",
      formula: "α<sub>j</sub> = [H₃O⁺]<sup>n−j</sup>·K<sub>1</sub>⋯K<sub>j</sub> / Σ<sub>k=0…n</sub> [H₃O⁺]<sup>n−k</sup>·K<sub>1</sub>⋯K<sub>k</sub>",
      formulaNote:
        "α<sub>j</sub>, j proton vermiş biçimin kesri; kesirlerin toplamı 1'dir. Tek protonlu asitte α(A⁻) = K<sub>a</sub>/([H₃O⁺] + K<sub>a</sub>).",
    },
    {
      heading: "İndikatörün rengi: denge, Beer–Lambert, eş soğurma noktası",
      body:
        "İndikatör, asit biçimi (HIn) ile baz biçimi (In⁻) farklı ışık soğuran bir zayıf asittir; oran [In⁻]/[HIn] = 10<sup>pH − pK<sub>In</sub></sup> olduğu için renk pH'ı izler. Azınlık biçim yüzde 10'un altına düşünce göz onu fark etmez diye kabul edilirse, geçiş In⁻ yüzde 10'dan 90'a giderken olur: pK<sub>In</sub> ± log 9 = pK<sub>In</sub> ± 0.954. Ders kitabının 'pK ± 1' kuralı oranı 1:10'dan 10:1'e alır. Gerçek göz aralığı boyaya göre değişir: bromtimol mavisinde kaynak 6.0–7.6 verir, model 6.15–8.05. Bir dalga boyundaki soğurbanlık iki biçimin katkılarının toplamıdır (<strong>Beer–Lambert</strong>). İki biçimin molar soğurma katsayısının eşit olduğu dalga boyunda toplam soğurbanlık pH'tan bağımsızdır: bu <strong>eş soğurma noktası</strong>dır; bütün tayf ailesi oradan geçer ve bu, yalnız iki biçimin birbirine dönüştüğünün işaretidir. Rengi ise tek bir tepe değil, geçen ışığın bütün tayfı ve gözün üç koni duyarlılığı belirler: sayfa D65 gün ışığını 360–830 nm boyunca 10<sup>−A(λ)</sup> ile çarpar, CIE 1931 renk eşleme fonksiyonlarıyla tartar ve sRGB'ye çevirir.",
      formula: "A(λ) = ℓ·(ε<sub>HIn</sub>(λ)·[HIn] + ε<sub>In</sub>(λ)·[In⁻]) &nbsp;·&nbsp; pH = pK<sub>In</sub> + log([In⁻]/[HIn])",
      formulaNote:
        "ℓ ışık yolu (cm), ε molar soğurma katsayısı (L mol⁻¹ cm⁻¹). A = 1, ışığın onda birinin geçmesi demektir.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmedir; her sekmenin kendi <strong>Sıfırla</strong> düğmesi var (<kbd>R</kbd> de çalışır). <strong>pH ölçeği ve su</strong>: pH kaydırıcısı ve kutusu (−1…15), <strong>Sıcaklık T</strong> (0–100 °C) ile 0, 25, 37 ve 100 °C düğmeleri, <strong>pH'ı nötre getir</strong>; altta <strong>Seyreltme tuzağı</strong> paneli <strong>HCl derişimi c</strong> için yük denkliğinden ölçülen pH'ı −log c ile karşılaştırır. <strong>Asit ve baz çözeltileri</strong>: <strong>Madde</strong> menüsü (HCl'den fosforik aside on çözelti), <strong>Toplam derişim c</strong>, <strong>Diyagram</strong> (tür kesirleri ya da Sillén), <strong>0.1 M</strong>, <strong>10⁻⁵ M</strong> ve <strong>Kan pH'ı 7.40'ta fosfat</strong> düğmeleri; tablo tam çözümü suyu yok sayan ikinci derece çözüm ve kısa yolla yan yana koyar. <strong>İndikatörler ve renk</strong>: <strong>İndikatör</strong> menüsü (yedi seçenek), pH, <strong>İndikatör derişimi c</strong>, <strong>Işık yolu ℓ</strong>, <strong>Okuma dalga boyu λ</strong>, <strong>λ = baz biçiminin tepesi</strong> ve <strong>λ = eş soğurma noktası</strong>; altta <strong>Soğurbanlık gürültüsü σ<sub>A</sub></strong> ve <strong>Yeni ölçüm dizisi</strong> (<kbd>Boşluk</kbd>) ile dokuz tamponlu simüle bir spektrofotometrik ölçüm. Sayfa etkinlik yerine derişimle hesaplar ve bu yaklaşım bozulunca uyarır. Renkler, her biçimi tek bir soğurma bandıyla temsil eden yaklaşık bir modelden hesaplanır ve bazı tonlar gerçeğinden sapar: metil oranj ile metil kırmızısı asitte kırmızı yerine pembe, fenolftalein pembe yerine lavanta, bromtimol mavisi pH 7 civarında yeşil yerine turkuaz çıkar. Bu yüzden her rengin yanında kaynakta yazan renk adı durur; turnusol ise hesaplanmış değil, kaynaktan çizilmiş temsili bir şerittir.",
    experiments: [
      {
        title: "pH 7.00 ne zaman nötrdür?",
        predict:
          "pH'ı 7.00'de bırakıp sıcaklığı 37 °C'ye, sonra 100 °C'ye çıkarırsan çözelti nötr mü kalır, asidik mi olur, bazik mi? 0 °C'de ne olur? 100 °C'de nötr nokta kaçtır?",
        do: "pH ölçeği ve su sekmesinde Sıfırla'ya bas (pH 7.00, 25 °C). Sırayla 37 °C, 100 °C ve 0 °C düğmelerine bas; her seferinde Nötr nokta kartını, [H₃O⁺]/[OH⁻] kartının altındaki sınıfı ve durum satırını oku. Sonra 100 °C'ye dönüp pH'ı nötre getir'e bas.",
        observe:
          "25 °C'de Nötr nokta 7.00 ve sınıf 'nötr'; durum satırı iki derişimin yine de 1.3 % farklı olduğunu ekler, çünkü pK<sub>w</sub>/2 tam 6.997'dir. 37 °C'de nötr nokta 6.81'e iner ve pH 7.00 artık baziktir: [OH⁻], [H₃O⁺]'nın 2.39 katı. 100 °C'de nötr nokta 6.13, oran 56.0. 0 °C'de tablo tersine döner: nötr nokta 7.47 ve pH 7.00 asidiktir, [H₃O⁺] [OH⁻]'nin 8.84 katı. 100 °C'de pH'ı nötre getir pH'ı 6.13'e taşır ve sınıf yeniden 'nötr' olur. Alttaki grafikte nötr çizgisi 0'dan 100 °C'ye 1.35 birim alçalır.",
        explain:
          "Nötrlüğün tanımı [H₃O⁺] = [OH⁻]'dir, pH 7 değil. Suyun iyonlaşması ısı aldığı için K<sub>w</sub> sıcaklıkla büyür ve pK<sub>w</sub>/2 aşağı kayar. 100 °C'deki saf su her iki iyondan 25 °C'dekinin yaklaşık 7.4 katı içerir ama yine nötrdür. pH 7.00'de iki derişimin oranı 10<sup>pK<sub>w</sub> − 14</sup>'tür; 37 °C'de 10<sup>13.621 − 14</sup> = 0.418 (kartın gösterdiği değer), yani OH⁻ 2.39 kat fazladır.",
      },
      {
        title: "Kısa yol nerede yanılır?",
        predict:
          "0.1 M asetik asitte kısa yol ½(pK<sub>a</sub> − log c) tam çözümden ne kadar sapar? Derişimi on bin kat azaltıp 10⁻⁵ M'ye indirince sapma büyür mü, küçülür mü? Ayrışma derecesi ne olur?",
        do: "Asit ve baz çözeltileri sekmesinde Sıfırla'ya bas (asetik asit, 0.1 M). Ölçülen pH kartını, Ayrışma derecesi α kartını ve tablodaki Kısa yol satırını oku. Sonra 10⁻⁵ M düğmesine bas ve aynılarını yeniden oku; alttaki grafikte kırmızı gölgenin nerede başladığına bak. Son olarak Madde menüsünden HCN'yi seç ve derişim kutusuna 1e-9 yaz.",
        observe:
          "0.1 M'de ölçülen pH 2.881, kısa yol 2.878 (ΔpH −0.003), α 1.32 %. 10⁻⁵ M'de ölçülen pH 5.148, kısa yol 4.878: ΔpH −0.270 ve satır kırmızıya boyanır; α artık 71.14 %. Geçerli derişim sütunu kısa yol için c ≥ 10<sup>−2.68</sup> (yaklaşık 2 mM) yazar; suyu yok sayan ikinci derece çözüm ise 10⁻⁵ M'de de tam çözümle aynıdır (5.148) ve c ≥ 10<sup>−6.33</sup> için geçerlidir. HCN 10⁻⁹ M'de pH 6.997, α yalnız 0.61 %; Ostwald kartı ise 53.53 % der.",
        explain:
          "Kısa yol iki varsayıma dayanır: ayrışan kısım c'nin yanında küçüktür ve su ihmal edilebilir. 10⁻⁵ M'de K<sub>a</sub> = 1.75·10⁻⁵ derişimden büyüktür; asidin çoğu ayrışır, birinci varsayım çöker ve kısa yol [H₃O⁺]'yi 10<sup>0.27</sup> ≈ 1.9 kat büyük bulur. İkinci derece çözüm bu varsayımı bırakır, bu yüzden doğru kalır; su ancak c ≈ 5·10⁻⁷ M'nin altında devreye girer. HCN'de ise ikinci varsayım çöker: pH'ı artık su belirler (≈ 7) ve ayrışma K<sub>a</sub>/(K<sub>a</sub> + 10⁻⁷), yani yüzde 0.6 civarında donar. Ostwald yasası suyu görmediği için seyreltmeyle ayrışmanın yüzde 100'e gideceğini sanır.",
      },
      {
        title: "Bromtimol mavisi: renk, tayf ve eş soğurma noktası",
        predict:
          "Bromtimol mavisinin pK<sub>In</sub>'i 7.10. pH 6, 7.1 ve 8'de küvet ne renk olur, 616 nm'deki soğurbanlık nasıl değişir? Soğurbanlığın pH'tan hiç etkilenmediği bir dalga boyu var mıdır?",
        do: "İndikatörler ve renk sekmesinde Sıfırla'ya bas (bromtimol mavisi, 20 µmol/L, 1.0 cm, λ = 616.0 nm). pH kutusuna sırayla 6, 7.1 ve 8 yaz; küveti, hesaplanan rengi, kaynakta yazan rengi, In²⁻ kesrini ve Soğurbanlık kartını not et. Sonra λ = eş soğurma noktası düğmesine bas ve pH'ı 6 ile 8 arasında gezdir.",
        observe:
          "pH 6'da #eff5bf, açık sarı (sayfanın ton adı 'sarı-yeşil'), In²⁻ 7.4 %, A 0.059. pH 7.1'de #92d2df · turkuaz, In²⁻ tam 50.0 %, A 0.400. pH 8'de #3db8fc · mavi, In²⁻ 88.8 %, A 0.711. Eş soğurma noktası 498.0 nm'dir: orada A her pH'ta 0.089 kalır ve tayf grafiğindeki bütün eğriler o halkadan geçer. Görsel geçiş kartı modelde 6.15 – 8.05 yazar, kaynağın göz aralığı 6.0–7.6'dır.",
        explain:
          "616 nm mavi biçimin tepesidir; A, In²⁻ kesriyle orantılı büyür (0.059 : 0.400 : 0.711 ≈ 7.4 : 50.0 : 88.8). 498 nm'de iki biçimin ε'si eşittir, biçim değişimi A'yı değiştirmez. Ama modelde bu nokta, bant genişliği kaynaktaki 498 nm'ye ayarlandığı için oradadır: öngörü değil, ayardır. Renk de modeldir: gerçek bromtimol mavisi geçişin ortasında yeşildir, model turkuaz verir. Rengi tepe dalga boyu değil, geçen ışığın bütün tayfı ve gözün üç koni tepkisi belirler; her biçimi tek bir Gauss bandıyla çizmek gerçek bantların omuzlarını ve kanatlarını kaybeder, ton kayar.",
      },
      {
        title: "pK<sub>In</sub>'i ölçmek: dokuz tampon, bir sigmoit",
        predict:
          "Gürültülü dokuz ölçümden uydurulan pK<sub>In</sub> girdi değeri 7.100'e ne kadar yaklaşır? Gürültüyü dört katına çıkarırsan standart hata ne olur? Metil oranjda sonucun daha mı iyi, daha mı kötü olmasını beklersin?",
        do: "Sıfırla'dan sonra (bromtimol mavisi, σ = 0.005, tohum 2026) Spektrofotometrik pK<sub>In</sub> ölçümü panelindeki kartları oku. Soğurbanlık gürültüsü menüsünden önce Gürültüsüz'ü, sonra σ = 0.020'yi seç. Yeniden Sıfırla'ya bas ve İndikatör menüsünden Metil oranj'ı seç. İstersen birkaç kez Yeni ölçüm dizisi'ne basıp sonuçların nasıl dağıldığına bak.",
        observe:
          "Varsayılan dizide Ölçülen pK<sub>In</sub> 7.094 ± 0.013, kuram 7.100, fark −0.006: standart hatanın 0.4 katı. Gürültüsüz'de tam 7.100 ve kalıntılar ≈ 0. σ = 0.020'de standart hata 0.052'ye çıkar: gürültü dört kat, hata da dört kat. Metil oranjda 3.398 ± 0.119, girdi 3.460: hata çubuğu bromtimol mavisinin dokuz katı.",
        explain:
          "Uydurulan eğri A(pH) = (A<sub>asit</sub> + A<sub>baz</sub>·r)/(1 + r), r = 10<sup>pH − pK</sup>; dönüm noktası pK<sub>In</sub>'dir. Standart hata gürültüyle doğru, ölçülen değişimin büyüklüğüyle ters orantılıdır. Bromtimol mavisinde 616 nm'de A 0.000'dan 0.800'e çıkar; metil oranjın 464 nm'deki tepesinde asit biçimi de güçlü soğurduğu için A yalnız 0.41'den 0.50'ye çıkar, sinyal dokuz kat küçüktür. Deneyci bu yüzden okuma dalga boyunu iki biçimin en çok ayrıştığı yere koyar. Simülasyonda yalnız soğurbanlık gürültüsü var; gerçek ölçüme pH metre hatası, kaçak ışık ve sıcaklık kayması da eklenir.",
      },
    ],
  },
  wow: [
    {
      title: "Okyanusta 0.1 birim, yüzde 26",
      body:
        "IPCC'nin 2013 tarihli Beşinci Değerlendirme Raporu'na göre okyanus yüzeyinin pH'ı sanayi döneminin başından bu yana 0.1 birim düştü. Küçük görünen bu sayı logaritmik ölçekte H₃O⁺ derişiminin yüzde 26 artması demektir: 10<sup>0.1</sup> = 1.26. Deniz suyu hâlâ baziktir (pH 8 civarı); 'asitlenme' sözcüğü varılan yeri değil, gidilen yönü anlatır.",
    },
    {
      title: "Suyun direncinin bir tavanı var",
      body:
        "Laboratuvarların ultra saf su cihazları en iyi durumda 18.2 MΩ·cm gösterir (25 °C'ye göre); bundan daha dirençli su yoktur. Bütün yabancı iyonlar sudan atılsa bile suyun kendi H₃O⁺ ve OH⁻ iyonları, her biri 1.0·10⁻⁷ mol/L, akımı taşır. İki iyonun molar iletkenliği (yaklaşık 350 ve 200 S·cm²/mol) bu derişimle çarpılınca 0.055 µS/cm çıkar; tersi tam o 18 MΩ·cm'dir.",
    },
    {
      title: "Fenolftaleinin ikinci kariyeri",
      body:
        "Adolf von Baeyer fenolftaleini 1871'de 'yeni bir boya sınıfı' üzerine yazdığı makalede tanıttı. Anlatılana göre 1900'de Macar hükümeti yerli beyaz şarapları işaretlemek için içlerine fenolftalein kattırmak istedi; tadı değiştirmiyordu ve bazla renk verdiği için ilkesel olarak iyi bir işaretti, ama içenler ishal oldu. New York'ta yaşayan Macar asıllı eczacı Max Kiss haberi duydu ve 1906'da Ex-Lax adlı müshili piyasaya sürdü. Fenolftalein yaklaşık bir yüzyıl müshil olarak kullanıldı; kemirgen çalışmalarındaki kanser bulguları üzerine ABD'de FDA 1997'de yasaklanmasını önerdi ve ürünler başka etken maddelere geçti.",
    },
  ],
  worked: {
    title: "Yüz milyonda bir molar HCl: pH kaç?",
    prompt:
      "25 °C'de 1.0·10⁻⁸ mol/L HCl çözeltisinin pH'ını tam olarak hesapla (K<sub>w</sub> = 10<sup>−13.995</sup> = 1.013·10⁻¹⁴, sayfanın değeri). H₃O⁺'nın ne kadarı sudan gelir? −log c neden yanılır?",
    steps: [
      "Türleri ve denklemleri yaz. HCl tamamen ayrışır: [Cl⁻] = c = 1.0·10⁻⁸ mol/L. Su da iyonlaşır: [H₃O⁺][OH⁻] = K<sub>w</sub>. Yük denkliği: [H₃O⁺] = [Cl⁻] + [OH⁻].",
      "Tek bilinmeyene indir: h = [H₃O⁺] dersen h = c + K<sub>w</sub>/h, yani h² − c·h − K<sub>w</sub> = 0. Fiziksel (artı) kök: h = (c + √(c² + 4K<sub>w</sub>))/2.",
      "Sayıları yerleştir: c² = 1.0·10⁻¹⁶ ve 4K<sub>w</sub> = 4.05·10⁻¹⁴ (mol/L)²; toplam 4.06·10⁻¹⁴ (mol/L)², karekökü 2.015·10⁻⁷ mol/L. h = (0.100·10⁻⁷ + 2.015·10⁻⁷)/2 = 1.058·10⁻⁷ mol/L, pH = −log(1.058·10⁻⁷) = 6.976.",
      "Payları ayır: [OH⁻] = K<sub>w</sub>/h = 9.58·10⁻⁸ mol/L. Suyun iyonlaşması her OH⁻ için bir H₃O⁺ üretir, bu yüzden sudan gelen pay [OH⁻]/h = 0.905'tir: H₃O⁺'nın yüzde 90.5'i suyun kendisinden gelir, asit yalnız yüzde 9.5 katar.",
      "Yaklaşımı sına ve sayfada dene: −log c = 8.000, fark +1.024 pH. −log c ancak c, √K<sub>w</sub> ≈ 10⁻⁷ mol/L'nin çok üstündeyse geçerlidir; sayfa 0.02 sınırını c ≈ 4.6·10⁻⁷ mol/L'de bulur. pH ölçeği ve su sekmesinde HCl derişimi kutusuna 1e-8 yaz: Ölçülen pH 6.976, Saf yaklaşım 8.000, Fark +1.024, sudan gelen pay 90.5 %. 37 °C düğmesine basınca pH 6.796 olur: nötr nokta (6.81) kayınca çözelti de onunla kayar.",
    ],
    result:
      "pH = 6.976: çözelti nötrün (6.997) yalnızca 0.02 birim altında, hafifçe asidiktir. Çok seyreltik asitte pH'ı suyun kendi iyonlaşması belirler; −log c'nin söylediği 8.00 fiziksel olarak imkânsızdır, çünkü asit eklenen su bazik olamaz.",
  },
  misconceptions: [
    {
      myth: "pH 7 her zaman nötrdür.",
      truth:
        "Nötr, [H₃O⁺] = [OH⁻] demektir ve bu pH = pK<sub>w</sub>/2'de olur: 25 °C'de 7.00, 37 °C'de 6.81, 100 °C'de 6.13. Vücut sıcaklığında pH 7.00 hafif baziktir; kanın 7.40'ında [OH⁻], [H₃O⁺]'nın yaklaşık 15 katıdır. Sayfada Sıcaklık T'yi 37 °C yapıp pH kutusuna 7.4 yaz: durum satırı 15.1 kat der.",
    },
    {
      myth: "Bir asidi yeterince seyreltirsen çözelti bazik olur.",
      truth:
        "−log c formülü 10⁻⁸ M HCl için 8.00 verir, ama yük denkliği 6.976 der. Asit eklenmiş su nötrün altında kalır; seyrelttikçe nötre yaklaşır, onu geçemez. Seyreltik sınırda pH'ı suyun kendi iyonlaşması belirler: 10⁻⁸ M'de H₃O⁺'nın yüzde 90.5'i sudan gelir.",
    },
    {
      myth: "İndikatör rengini tam pK<sub>In</sub>'de değiştirir.",
      truth:
        "pK<sub>In</sub>'de iki biçim yalnızca eşittir; renk değişimi bir aralığa yayılır. Azınlık biçim yüzde 10'un altında fark edilmez diye kabul edilirse aralık pK<sub>In</sub> ± 0.954'tür (kaba kural ± 1). Gözün gördüğü aralık boyanın renklerine ve derişimine de bağlıdır: fenolftaleinin tek renkli pembesi az miktarda bile göze çarptığı için görünür başlangıcı (8.2) indikatör derişimiyle kayar.",
    },
    {
      myth: "Kuvvetli asit, derişik asit demektir.",
      truth:
        "Güç ayrışmanın ne kadar tam olduğunu, derişim litrede kaç mol bulunduğunu söyler. 10⁻⁵ M HCl kuvvetli ama seyreltiktir (pH 5.000); 0.1 M asetik asit zayıf ama ondan on bin kat derişiktir ve pH'ı 2.881'dir. Sayfadaki α kartı farkı gösterir: 0.1 M asetik asidin yalnız yüzde 1.32'si ayrışmıştır.",
    },
  ],
  glossary: [
    { term: "pH", definition: "H₃O⁺ etkinliğinin eksi on tabanlı logaritması; seyreltik çözeltide −log[H₃O⁺] ile aynıdır ve bir birim on kat derişim farkıdır." },
    { term: "Suyun iyonlaşma çarpımı (K<sub>w</sub>)", definition: "[H₃O⁺][OH⁻] çarpımı; 25 °C'de 1.01·10⁻¹⁴, 100 °C'de 5.60·10⁻¹³." },
    { term: "Nötr çözelti", definition: "[H₃O⁺] = [OH⁻] olan çözelti; pH'ı pK<sub>w</sub>/2'dir ve yalnız 25 °C civarında 7'dir." },
    { term: "Yük denkliği", definition: "Çözeltideki artı yüklerin toplam derişiminin eksi yüklerinkine eşit olması; tam pH hesabının temel denklemi." },
    { term: "Ayrışma derecesi (α)", definition: "Zayıf asit moleküllerinin iyonlarına ayrılmış kesri; seyreltmeyle büyür, ama sınırını suyun pH'ı koyar." },
    { term: "Beer–Lambert yasası", definition: "Soğurbanlığın molar soğurma katsayısı, ışık yolu ve derişimin çarpımı olması, A = ε·ℓ·c; A = 1 ışığın onda birinin geçtiğini söyler." },
    { term: "Eş soğurma noktası", definition: "İki biçimin molar soğurma katsayısının eşit olduğu, toplam soğurbanlığın pH'tan bağımsız kaldığı dalga boyu." },
    { term: "Etkinlik", definition: "Bir iyonun dengede 'etkin' derişimi, a = γ·c; iyonlar birbirini perdeledikçe γ 1'in altına düşer." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede pH bir formüldür, üniversitede bir denklem sistemi. <strong>Genel Kimya</strong>'da K<sub>a</sub>, K<sub>w</sub> ve ikinci derece denklem gelir; <strong>Analitik Kimya</strong>'da kütle ve yük denkliği her problemin iskeleti olur ve tür kesirleri ile Sillén diyagramları çok protonlu asitlerde, metal komplekslerinde ve çözünürlükte aynı mantıkla kullanılır. Derişik çözeltide derişim yerine etkinlik gerekir: <strong>Fizikokimya</strong>'da Debye–Hückel kuramı, her iyonu saran zıt yük bulutundan log γ = −A·z²·√I sınır yasasını türetir (25 °C'de A ≈ 0.509); sayfanın kullandığı Davies denklemi onun yarı deneysel bir uzantısıdır. Aynı dersin termodinamik kısmı K<sub>w</sub>'nin sıcaklıkla neden büyüdüğünü van 't Hoff denklemiyle açıklar.",
      "pH'ı gerçekte ölçen alet bir voltmetredir: cam elektrodun ince zarı, iki yanındaki H₃O⁺ etkinliklerinin oranına bağlı bir gerilim üretir; Nernst denklemine göre bu gerilim 25 °C'de pH birimi başına yaklaşık 59.2 mV değişir. Spektrofotometri ise sayfanın son panelini gerçeğe çevirir: deniz suyunun pH'ı, timol mavisi gibi boyaların iki dalga boyundaki soğurbanlık oranından ölçülür. <strong>Biyokimya</strong>'da aynı kesir hesabı amino asitlerin yükünü, enzimlerin çalıştığı pH'ı ve kandaki fosfat ile bikarbonat tamponlarını anlatır. Tampon kapasitesi ve titrasyon eğrileri Asit-Baz Titrasyonu sayfasında.",
    ],
    topics: [
      "Kütle ve yük denkliği",
      "Etkinlik katsayıları ve Debye–Hückel",
      "Cam elektrot ve Nernst denklemi",
      "Tampon kapasitesi",
      "Spektrofotometri ve çok dalga boylu analiz",
      "Van 't Hoff denklemi",
      "CIE renk uzayı ve kolorimetri",
    ],
  },
  quiz: [
    {
      question: "Bir çözeltideki [H₃O⁺] iki katına çıkarsa pH ne olur?",
      options: ["0.30 azalır", "2 azalır", "0.30 artar", "Yarıya iner"],
      answer: 0,
      explanation:
        "pH logaritmadır: −log(2h) = −log h − log 2 ve log 2 = 0.301. İki kat H₃O⁺ pH'ı 0.30 düşürür, on kat bir tam birim düşürür. pH'ı yarıya indirmek ise [H₃O⁺]'yi katlarca artırmak demektir: pH 4'ten 2'ye inmek yüz kat.",
    },
    {
      question: "Fosforik asidin pK<sub>a2</sub>'si 7.21'dir. pH'ı 7.40'ta sabit tutulan kanda hangisi doğrudur?",
      options: [
        "H₂PO₄⁻ baskındır, çünkü pH 7'ye yakındır",
        "HPO₄²⁻ baskındır; [HPO₄²⁻]/[H₂PO₄⁻] ≈ 1.55",
        "İki biçim tam eşittir",
        "PO₄³⁻ baskındır, çünkü kan baziktir",
      ],
      answer: 1,
      explanation:
        "pH, pK<sub>a2</sub>'nin 0.19 birim üstünde olduğu için oran 10<sup>0.19</sup> ≈ 1.55'tir: fosfatın yüzde 60.8'i HPO₄²⁻, yüzde 39.2'si H₂PO₄⁻. PO₄³⁻'ün baskın olması için pH'ın pK<sub>a3</sub> = 12.32'yi geçmesi gerekir; kanda payı milyonda birkaçtır. Sayfada Kan pH'ı 7.40'ta fosfat düğmesi bu kesirleri gösterir.",
    },
    {
      question: "Bromtimol mavisinin farklı pH'larda çizilen soğurma tayflarının hepsi 498 nm'de aynı noktadan geçer. Bu nokta neyi gösterir?",
      options: [
        "İndikatörün pK<sub>In</sub>'ini",
        "İki biçimin molar soğurma katsayılarının eşit olduğu dalga boyunu; orada soğurbanlık pH'tan bağımsızdır",
        "Gözün en duyarlı olduğu dalga boyunu",
        "Çözeltinin yeşile döndüğü dalga boyunu",
      ],
      answer: 1,
      explanation:
        "Eş soğurma noktasında ε(HIn⁻) = ε(In²⁻) olduğu için bir molekülün biçim değiştirmesi soğurbanlığı etkilemez; sayfada A orada her pH'ta 0.089'dur. Bütün eğrilerin tek noktadan geçmesi, yalnız iki biçimin birbirine dönüştüğünün işaretidir. pK<sub>In</sub> ise bir dalga boyu değil, iki biçimin eşit olduğu pH'tır.",
    },
  ],
  next: [
    {
      href: "asit-baz-titrasyonu.html",
      title: "Asit-Baz Titrasyonu",
      why: "Tamponlar, titrasyon eğrileri ve eşdeğerlik noktasına göre indikatör seçimi; Sørensen'in pH'ı nasıl icat ettiği ve 'p'nin bilmecesi de orada.",
    },
    {
      href: "kara-cisim-isimasi.html",
      title: "Kara Cisim Işıması",
      why: "Bu sayfadaki renk hesabının aynısı (CIE 1931 eşleme fonksiyonları, D65 beyazı, sRGB) orada ısınan bir cismin rengini bulur.",
    },
    {
      href: "kimyasal-denge-ve-gibbs-enerjisi.html",
      title: "Kimyasal Denge ve Gibbs Enerjisi",
      why: "K<sub>a</sub> ve K<sub>w</sub> birer denge sabitidir; tepkime bölümü Q'yu K ile karşılaştırarak yönü bulmayı ve K'nın Gibbs enerjisiyle bağını orada keşfet.",
    },
    {
      href: "kimyasal-kinetik.html",
      title: "Kimyasal Kinetik",
      why: "Fenolftaleinin kuvvetli bazda dakikalar süren solması derslerde klasik bir hız deneyidir; hız sabitini, yarı ömrü ve sıcaklığın etkisini orada keşfet.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Chemistry 2e, 14.2 pH and pOH",
      url: "https://openstax.org/books/chemistry-2e/pages/14-2-ph-and-poh",
      note: "pH ve pOH, nötrlüğün [H₃O⁺] = [OH⁻] diye tanımı, 80 °C'de nötr pH'ın 6.31 olduğu örnek ve gündelik maddelerin pH'ı; sayfadaki şeridin maddeleri bölümün Şekil 14.2'sinden (İngilizce, açık ders kitabı).",
    },
    {
      title: "Wikipedia · Self-ionization of water",
      url: "https://en.wikipedia.org/wiki/Self-ionization_of_water",
      note: "Suyun kendi kendine iyonlaşması, K<sub>w</sub>'nin sıcaklık ve basınçla değişimi, Bandura–Lvov bağıntısı (İngilizce).",
    },
    {
      title: "Wikipedia · pH indicator",
      url: "https://en.wikipedia.org/wiki/PH_indicator",
      note: "İndikatör dengesi, 'pK ± 1' kuralının varsayımı, geçiş aralıkları tablosu ve spektrofotometrik pH ölçümü (İngilizce).",
    },
    {
      title: "Wikipedia · Phenolphthalein",
      url: "https://en.wikipedia.org/wiki/Phenolphthalein",
      note: "Fenolftaleinin dört biçimi, pK değerleri 9.05, 9.50 ve 12, kuvvetli bazda solma, Baeyer'in 1871 sentezi ve müshil tarihi (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
