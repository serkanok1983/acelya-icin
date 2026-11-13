window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["epidemiyoloji-ve-klinik-arastirma"] = {
  slug: "epidemiyoloji-ve-klinik-arastirma",
  title: "Epidemiyoloji ve Klinik Araştırma: Sayarak Bilmek",
  field: "İnsan Bedeni",
  level: "Lise–Lisans",
  minutes: 50,
  tagline:
    "Tıp bir tedavinin işe yaradığını nasıl bilir? 2×2 tablo, risk ölçüleri, karıştırıcı, randomizasyon, güç ve küçük denemelerin abarttığı etkiler; yapay veriyle. Tanı ya da tedavi önerisi değildir.",
  hook:
    "Gerçek etkisi tam olarak sıfır olan bir maruziyet düşün. Yapay bir nüfusta, maruz kalanlar yalnızca daha yaşlı olduğu için hastalık riski onlarda iki katı çıkar: kaba RR 2,058. Aynı veriyi yaşa göre ikiye ayırınca oran 0,970 ve 1,056'ya iner. Sayılar yalan söylemedi; yanlış soruyu yanıtladılar.",
  bigIdea:
    "Bir ilişkiyi ölçmek kolaydır; zor olan, o ilişkinin <strong>maruziyetin kendisinden</strong> mi yoksa grupları zaten farklı kılan başka bir şeyden mi geldiğini ayırmaktır. Epidemiyolojinin araçları (doğru ölçü, doğru tasarım, katmanlama, rastgele atama, yeterli örneklem) bu ayrımı yapmak için vardır.",
  story: [
    "20 Mayıs 1747'de, HMS Salisbury gemisinde iskorbüte yakalanmış on iki denizci vardı. Gemi hekimi James Lind onları ikişerli altı gruba ayırdı; hepsi aynı temel yemeği yedi, her çift farklı bir ek aldı: elma şarabı, seyreltik sülfürik asit, sirke, deniz suyu, iki portakal ve bir limon, baharatlı bir macun. Meyve alan çiftten biri altı gün sonra göreve dönebilecek durumdaydı. Lind sonucunu 1753'te yayımladı, ama donanmanın limon suyunu bütün filoya vermesi 1795'i buldu. Bu, eşzamanlı grupları aynı koşullarda karşılaştıran erken bir deneydi; kimin hangi eki alacağı ise rastgele belirlenmemişti.",
    "Yüz yıl sonra, 31 Ağustos 1854'te Londra'nın Soho semtinde kolera başladı ve ilk üç günde 127 kişi öldü. John Snow ölümleri haritaya işledi, vakaların Broad Street'teki su pompasının çevresinde toplandığını gösterdi; yakındaki bira fabrikasının, pompa suyu yerine bira içen işçileri hastalanmadı. Snow ayrıca kirli Thames suyu dağıtan Southwark and Vauxhall şirketinin abonelerinde kolera ölümlerinin, Lambeth şirketinin abonelerine göre 14 kat yüksek olduğunu buldu. Kimse suyu rastgele dağıtmamıştı, ama iki şirketin abonelerinin aynı sokaklarda karışık yaşaması ona bir doğal deney sağladı.",
    "1948'de Britanya Tıbbi Araştırma Konseyi'nin akciğer tüberkülozunda streptomisin denemesi yayımlandı; tıpta yayımlanmış ilk randomize kontrollü deneme kabul edilir ve modern tasarımı yazarlarından Austin Bradford Hill'e atfedilir. İki yıl sonra Richard Doll ile Hill, yirmi Londra hastanesindeki akciğer kanseri hastalarını kanser olmayan hastalarla karşılaştırdılar ve günde 25 ya da daha fazla sigara içenlerde riskin içmeyenlerin 50 katı olabileceğini yazdılar. Ekim 1951'de başlattıkları İngiliz Hekimler Çalışmasına 40 701 hekim yanıt verdi; 34 439 erkek hekimin 50 yıllık çözümlemesi (2004), sigarayı 30 yaşından önce bırakanlarda ek ölüm görmedi, 60 yaşında bırakanlarda ise yaklaşık 7 yıl kayıp buldu.",
    "Bu yöntemin karanlık bir tarihi de var ve kayıt açıktır. 20 Ağustos 1947'de Nürnberg'deki Hekimler Davası'nın kararı on ilke sıraladı; ilki, deneğin gönüllü onamının mutlak olarak zorunlu olduğudur. Dünya Tabipler Birliği Haziran 1964'te Helsinki Bildirgesi'ni kabul etti (son revizyon Ekim 2024). Buna karşın ABD Halk Sağlığı Servisi'nin Tuskegee çalışması 1932'den 1972'ye sürdü: frengisi olan 399 Afrikalı Amerikalı erkeğe hastalıkları söylenmedi ve 1947'de penisilin standart tedavi olduğu halde onlara verilmedi. Çalışma Peter Buxtun'un bilgileri basına ulaştırmasıyla 1972'de durduruldu; ardından 1974'te National Research Act, 1979'da Belmont Raporu geldi ve 1997'de ABD başkanı hayatta kalanlardan ve ailelerinden resmen özür diledi.",
  ],
  core: [
    {
      heading: "2×2 tablo: risk, göreli risk, olasılık oranı, NNT",
      body:
        "Bir grupta belirli bir sürede olay yaşayanların payı <strong>risktir</strong>: tedavide a/(a+b), kontrolde c/(c+d). İki riskin oranı <strong>göreli risk (RR)</strong>, farkı <strong>risk farkıdır (RF)</strong>. <strong>Odds</strong> ise olay yaşayanların yaşamayanlara oranıdır (risk %20 iken odds 0,25); iki oddsun oranına sayfa <strong>olasılık oranı (OR)</strong> der. Mutlak farkın tersi, bir olayı önlemek için kaç kişinin tedavi edilmesi gerektiğini söyler: <strong>NNT</strong> (fark zarar yönündeyse NNH), geleneksel olarak yukarı yuvarlanır. Sayfanın varsayılan yapay tablosunda (15/185, 30/170) riskler %7,5 ve %15,0, RR 0,500, RF −7,5 puan, OR 0,459, NNT 14. Aynı RR = 0,5, temel risk %40 iken NNT 5, %2 iken NNT 100 demektir: göreli sayı tek başına kazancı anlatmaz.",
      formula: "RR = [a/(a+b)] / [c/(c+d)] · OR = ad/bc · NNT = ⌈1/|RF|⌉",
      formulaNote: "OR ile RR arasında kesin bağıntı: RR = OR / (1 − r₀ + r₀·OR), r₀ kontrol riski. Olay seyrekken (r₀ küçük) OR ≈ RR; olay sıklaştıkça OR etkiyi 1'den daha uzağa iter.",
    },
    {
      heading: "Tasarım soruyu belirler: kesitsel, vaka-kontrol, kohort, RKÇ",
      body:
        "<strong>Kesitsel</strong> çalışma bir fotoğraftır: şu an kimde var? Yaygınlığı ölçer ama zaman sırasını kuramaz. <strong>Kohort</strong> maruziyeti önce ölçer, insanları ileriye doğru izler, risk ve RR hesaplar. <strong>Vaka-kontrol</strong> sonuçtan başlar: hastaları ve hasta olmayanları seçer, geçmişteki maruziyeti sorar. Kaç kontrol alınacağını araştırmacı seçtiği için tablodan risk hesaplanamaz; ama OR = (a/c)/(b/d) = ad/bc sütun toplamlarından bağımsızdır ve hayatta kalır. <strong>Randomize kontrollü çalışma (RKÇ)</strong> maruziyeti yazı-turayla dağıtır. <strong>Meta-analiz</strong> denemeleri ters varyansla ağırlıklandırıp birleştirir; ama yalnız olumlu çıkanlar yayımlanmışsa birleşik sonuç da yanlıdır.",
      formula: "ln RR<sub>birleşik</sub> = Σ wᵢ ln RRᵢ / Σ wᵢ, wᵢ = 1/SHᵢ²",
      formulaNote: "Sabit etkiler modeli: bütün denemeler aynı gerçek etkiyi ölçüyor sayılır. Heterojenlik Q ve I² = max(0, (Q − sd)/Q) ile ölçülür. Sayfadaki sekiz deneme yapay veridir.",
    },
    {
      heading: "Karıştırıcı ve standartlaştırma",
      body:
        "<strong>Karıştırıcı</strong>, hem maruziyetle hem sonuçla ilişkili olan ve aralarındaki yolun üzerinde durmayan üçüncü bir değişkendir (ör. yaş). Maruz kalanlar arasında karıştırıcının payı daha yüksekse, kaba karşılaştırma onun etkisini maruziyete yükler. Çare, karıştırıcının her düzeyinde ayrı bakmak (<strong>katmanlama</strong>) ve katman sonuçlarını ortak bir nüfusun ağırlıklarıyla birleştirmektir (<strong>standartlaştırma</strong>). Sayfadaki modelde risk r₀·k<sub>C</sub><sup>C</sup>·RR<sub>E</sub><sup>E</sup>'dir; kaba RR'nin kuramı, iki grubun karıştırıcı karışımlarının ağırlıklı ortalamasıdır. Gerçek bir örnek: 1986'daki böbrek taşı karşılaştırmasında A tedavisi her iki taş boyutunda daha başarılıyken birleşik veride B önde görünür (<strong>Simpson paradoksu</strong>), çünkü A çoğunlukla zor, büyük taşlara uygulanmıştır.",
      formula: "Kaba risk<sub>E</sub> = Σ<sub>C</sub> P(C | E)·risk(C, E) · RR<sub>std</sub> = Σ P(C)·risk(C,1) / Σ P(C)·risk(C,0)",
      formulaNote: "Katmanlama yalnız ölçülmüş karıştırıcıları düzeltir. Ölçülmemiş bir karıştırıcıya karşı tek genel çare atamayı rastgele yapmaktır.",
    },
    {
      heading: "Randomizasyon, niyet-tedavi ve körleme",
      body:
        "Tedaviyi yazı-turayla dağıtmak, ölçülmüş ya da ölçülmemiş her özelliği iki kola <strong>ortalamada</strong> eşit böler. Tek bir denemede ise şans farkı kalır ve bu fark kişi sayısının kareköküyle küçülür: p yaygınlığındaki gizli bir etkenin iki kol arasındaki farkının standart sapması yaklaşık √(p(1−p)·(1/n₁ + 1/n₀)). Randomizasyonun kazancı, çözümleme atanan kola göre yapılırsa korunur: <strong>niyet-tedavi (ITT)</strong>. Tedaviyi bırakanları dışarıda bırakan <strong>protokole uygun (PP)</strong> çözümleme, bırakanlar riskli kişilerse seçilmiş bir grubu karşılaştırır ve etkisiz bir tedaviye yarar yazabilir. <strong>Atamanın gizlenmesi</strong> (mühürlü zarflar, merkezi randomizasyon) sıradakinin kolunu önceden bilmeyi engeller; <strong>körleme</strong> beklentinin ölçümü çarpıtmasını.",
      formula: "SS(U farkı) ≈ √(p(1 − p)·(1/n₁ + 1/n₀)) ∝ 1/√n",
      formulaNote: "p = 0,3, deneme başına 100 kişi (kol başına yaklaşık 50): yaklaşık 9,2 puan. Kişi sayısı dört katına çıkınca yarıya iner.",
    },
    {
      heading: "Güç, örneklem büyüklüğü ve anlamlılık süzgeci",
      body:
        "Bir deneme, gerçek bir farkı p &lt; α ile yakalama olasılığına göre planlanır: <strong>güç</strong>. İki oranı karşılaştırırken normal yaklaşımla grup başına gereken kişi sayısı aşağıdaki formüldür; farkın karesi paydada olduğu için etkiyi yarıya indirmek gereken n'yi yaklaşık dört katına çıkarır. Gücü düşük bir denemede yalnız şans eseri büyük çıkan tahminler anlamlılık eşiğini aşar; yayımlanan (anlamlı) sonuçların ortalaması bu yüzden gerçek etkiden büyüktür (<strong>abartma oranı</strong>, Tip M hatası) ve küçük bir kısmı yanlış yöndedir (Tip S). Benzer bir süzgeç alt grup avında çalışır: etkisiz bir tedavide m bağımsız alt grup denenirse en az bir \"bulgu\" olasılığı 1 − (1 − α)<sup>m</sup>'dir.",
      formula: "n = (z<sub>1−α/2</sub> + z<sub>1−β</sub>)²·[p₀(1−p₀) + p₁(1−p₁)] / (p₀ − p₁)²",
      formulaNote: "Yukarı yuvarlanır. Oranlar 0 ya da 1'e yakınken ve n küçükken normal yaklaşım zayıflar. %20 → %15, α = 0,05, güç %80: 902,62 → 903.",
    },
  ],
  lab: {
    intro:
      "Sayfa beş sekmedir: <strong>01 · Ölçüler ve 2×2 tablo</strong>, <strong>02 · Çalışma tasarımları</strong>, <strong>03 · Karıştırıcı ve yanlılık</strong>, <strong>04 · Randomizasyon ve körleme</strong>, <strong>05 · Güç ve anlamlılık süzgeci</strong>. Bütün hasta, deneme ve nüfus verileri yapay veridir; gerçek olan yalnız 1986 böbrek taşı tablosu ve tarih bölümündeki yayımlanmış sayılardır. Rastgele süreçler tohumludur: aynı tohum aynı sayıları verir, aşağıdaki değerler varsayılan tohumla elde edilmiştir. Okuma kartları benzetimden <em>ölçülen</em> değeri <em>kuram</em> değerinin yanında gösterir. Her sekmede bir sıfırlama düğmesi var; R tuşu da etkin sekmeyi varsayılana döndürür. Sayfa tanı koymaz, tarama yapmaz, tedavi önermez; sağlıkla ilgili kararlar için bir sağlık profesyoneline başvurun, acil durumda 112.",
    experiments: [
      {
        title: "Vaka-kontrolde OR kıpırdamaz, risk uçar",
        predict:
          "Varsayılan tabloda OR 0,459. \"Tablo nereden geldi?\" menüsünü vaka-kontrole çevirip kontrol sayısını iki katına çıkarırsan OR değişir mi? Kohorta geri dönünce tedavi grubunun riski ne olur?",
        do:
          "01 sekmesinde \"Tablo nereden geldi?\" = \"Vaka-kontrol (sütun toplamları sabit)\" seç, sonra \"Sağ sütunu (b, d) iki katına çıkar\" düğmesine bas. Ardından menüyü \"Kohort ya da randomize deneme\"ye geri al.",
        observe:
          "Vaka-kontrol modunda risk, RF, RR ve NNT \"tanımsız\" yazar; kontrol sayısı 355'ten 710'a çıkar, OR 0,459'da kalır (aralığı 0,239 – 0,883'ten 0,243 – 0,869'a daralır). Kohorta dönünce tedavi riski %7,5'ten %3,9'a, kontrol riski %8,1'e düşer, NNT 24 olur.",
        explain:
          "OR = ad/bc; b ile d aynı sayıyla çarpılınca oran değişmez. Risk ise payda olarak satır toplamını kullanır ve kontrolleri kaç tane topladığın araştırmacının kararıdır, doğanın değil. Vaka-kontrol çalışmalarının yalnız OR vermesinin nedeni budur. Aralığın daralması, daha çok kontrolün kestirimi kesinleştirmesidir.",
      },
      {
        title: "Etkisi sıfır olan maruziyete iki kat risk",
        predict:
          "03 sekmesinin varsayılanında maruziyetin gerçek etkisi RR = 1,00, ama karıştırıcı C riski 4 katına çıkarıyor ve C'si olanların %70'i maruz, olmayanların %20'si. Kaba RR ne çıkar?",
        do:
          "03 sekmesinde \"Sahte ilişki\" ayarına bak (varsayılan). Sonra \"Gerçek etkiyi gizler\" düğmesine, en son \"Karıştırıcı yok (gerçek RR 0,5)\" düğmesine bas. Her seferinde kaba, katman ve standartlaştırılmış RR kartlarını karşılaştır.",
        observe:
          "Sahte ilişki: kaba RR 2,058 (kuram 1,937), C = 0 katmanında 0,970, C = 1 katmanında 1,056, standartlaştırılmış 1,032. Gerçek etkiyi gizler: gerçek RR 0,50 iken kaba RR 1,268 (kuram 1,188); tedavi koruyucu olduğu halde zararlı görünür. Karıştırıcı yok (gerçek RR yine 0,50, ama maruziyet artık C'den bağımsız: C taşıyanların da taşımayanların da %40'ı maruz): kaba RR 0,490, katmanlar 0,472 ve 0,483; kaba karşılaştırma gerçeği bulur.",
        explain:
          "Maruz kalanların %70,6'sı C taşırken maruz olmayanlarda bu pay %19,4; kaba karşılaştırma C'nin dört kat riskini maruziyete yükler. Katmanların içinde C sabit olduğundan karşılaştırma adil olur. Ölçülen ile kuram arasındaki fark (2,058 – 1,937) 20 000 kişilik nüfusun şans payıdır; \"Nüfus büyüklüğü\" = 100 000 seçince kaba RR 1,973'e yaklaşır.",
      },
      {
        title: "Kim tedaviyi seçerse ona göre yalan",
        predict:
          "04 sekmesinde tedavinin gerçek etkisi RR = 1,00. Gizli etken U riski üç katına çıkarıyor ve kimse onu ölçmüyor. Atama rastgele olunca 1000 denemenin kaçında U'nun iki koldaki payı 10 puandan fazla farklı olur? Hekim riskli görünenleri seçerse ne olur?",
        do:
          "\"Tedaviyi kim alır?\" = \"Rastgele\" ile kartları oku; sonra \"Hekim seçer\" ve \"Gönüllü seçer\" seçeneklerini dene. Rastgeleye dönüp \"Deneme başına kişi\" kaydırıcısını 400'e çek. Alttaki ITT/PP bölümünde varsayılanı ve \"Eşit bırakma\" düğmesini karşılaştır.",
        observe:
          "Rastgele: U farkının ortalaması −0,23 puan (kuram 0), standart sapması 9,28 puan (kuram 9,21), denemelerin %28,7'sinde |fark| &gt; 10 puan; tahmin edilen etkinin ortalaması −0,57 puan. Hekim seçer: U farkı 25,22 puan (kuram 25,21), etkisiz tedaviye ortalama 4,76 puanlık sahte zarar (beklenen 5,04). n = 400: SS 4,44 puan, |fark| &gt; 10 puan yalnız %2,9. ITT −0,07 puan, PP −2,19 puan (kuram −2,15); eşit bırakmada PP 0,01 puan.",
        explain:
          "Rastgele atama U'yu ortalamada dengeler ama tek denemede dengelemez; dengesizlik 1/√n ile küçülür (n dört katında SS yarıya iner). Seçimle atamada denge ortalamada bile bozulur ve fark n büyüdükçe kaybolmaz: bu, endikasyon karıştırıcılığı ile sağlıklı kullanıcı etkisinin sayısal hâlidir. PP, bırakma riskle ilişkiliyse randomizasyonun kurduğu dengeyi geri alır.",
      },
      {
        title: "Küçük deneme, büyük ve yanlış masal",
        predict:
          "Gerçek etki kontrolde %20'den tedavide %15'e iniş. Formül %80 güç için grup başına kaç kişi istiyor? Grup başına yalnız 100 kişiyle yapılıp anlamlı çıkan denemeler etkiyi ortalama ne kadar büyük gösterir?",
        do:
          "05 sekmesinde varsayılan kartları oku (\"Grup başına kişi\" = 100). Sonra \"Küçük deneme (n = 50)\" ve \"Planlanan n\" düğmelerine bas. En altta \"Denenebilecek alt grup sayısı m\" kaydırıcısını 1, 20 ve 40'a getir.",
        observe:
          "n = 903 (formül 902,62), kuram gücü %80,02, benzetimde %81,3. n = 100: güç %14,3 (kuram %15,4), anlamlıların abartma oranı 2,64 kat (kuram 2,66), %0,7'si yanlış yönde. n = 50: 3,59 kat. Planlanan n: 1,12 kat. Alt gruplarda en az bir \"bulgu\" olasılığı (kuram): m = 1'de %5,0, m = 20'de %64,2 (4000 yapay çalışmada ölçülen %64,9), m = 40'ta %87,1.",
        explain:
          "Gerçek fark 5 puan, ama n = 100'de tahminin standart hatası yaklaşık 5,4 puan; ancak şansın büyüttüğü tahminler 1,96 SH eşiğini geçer. \"Anlamlı\" etiketi süzgeç işi görür ve geçenler abartılıdır. Güç yükseldikçe süzgeç neredeyse herkesi geçirir, abartma 1'e yaklaşır. Alt grup avında olasılık 1 − 0,95<sup>m</sup> ile hızla büyür.",
      },
    ],
  },
  wow: [
    {
      title: "Daha iyi tedavi, daha kötü toplam",
      body:
        "1986'da yayımlanan böbrek taşı karşılaştırmasında A tedavisi küçük taşlarda 81/87 (%93), büyük taşlarda 192/263 (%73) başarı gösterdi; B ise sırasıyla 234/270 (%87) ve 55/80 (%69). A her iki grupta önde. Ama toplamda A 273/350 (%78), B 289/350 (%83). Sırrı taş boyutu: A'nın hastalarının %75'i büyük taşlıydı, B'ninkilerin yalnız %23'ü. Bu bir yöntem örneğidir, tedavi önerisi değil.",
    },
    {
      title: "Yirmi soru sorarsan bir cevap mutlaka gelir",
      body:
        "Hiçbir etkisi olmayan bir tedavide, birbirinden bağımsız 20 alt grup (kadınlar, 65 yaş üstü, şeker hastalığı olanlar…) ayrı ayrı test edilirse en az birinin p &lt; 0,05 çıkma olasılığı 1 − 0,95²⁰ = %64'tür. 05 sekmesinde 4000 yapay çalışmada bu oran %64,9 ölçülür. Önceden belirtilmemiş bir alt grup bulgusu yeni bir hipotezdir, kanıt değil.",
    },
    {
      title: "Penisilin vardı, verilmedi",
      body:
        "Tuskegee çalışmasında 1947'de penisilin frenginin standart tedavisi olmuştu; buna rağmen çalışmadaki frengisi olan erkeklere verilmedi ve çalışma 1972'ye kadar sürdü. İnsan katılımcılı araştırmalar için kurallar yazacak bir kurul oluşturan 1974 National Research Act ile araştırma etiğinin ilkelerini koyan 1979 Belmont Raporu, bu çalışmanın ortaya çıkmasının ardından geldi.",
    },
  ],
  worked: {
    title: "Bir deneme tablosundan RR, güven aralığı ve NNT",
    prompt:
      "Yapay bir denemede tedavi grubundaki 200 kişiden 15'inde, kontrol grubundaki 200 kişiden 30'unda olay (hastalığın ilerlemesi) görüldü. RR'yi ve %95 güven aralığını, risk farkını ve NNT'yi bul; aralığın etkisizlikle bağdaşıp bağdaşmadığını söyle. (Sayfanın 01 sekmesindeki varsayılan tablo.)",
    steps: [
      "Riskler: r₁ = 15/200 = 0,075 (%7,5), r₀ = 30/200 = 0,150 (%15,0). RR = 0,075/0,150 = 0,500; risk farkı RF = 0,075 − 0,150 = −0,075, yani −7,5 puan.",
      "Aralık log ölçekte kurulur: SH(ln RR) = √(1/a − 1/(a+b) + 1/c − 1/(c+d)) = √(1/15 − 1/200 + 1/30 − 1/200) = √(0,0667 − 0,0050 + 0,0333 − 0,0050) = √0,0900 = 0,300.",
      "ln 0,5 = −0,693; −0,693 ± 1,960 × 0,300 = −0,693 ± 0,588 → (−1,281; −0,105). Üstel alınca RR'nin %95 aralığı 0,278 – 0,900. Aralık log ölçekte simetrik olduğu için 0,500 doğrusal ölçekte ortada durmaz.",
      "RF'nin Wald aralığı: SH = √(0,075 × 0,925/200 + 0,150 × 0,850/200) = √0,000984 = 0,0314; −0,075 ± 1,960 × 0,0314 → −0,1365 ile −0,0135, yani −13,6 ile −1,4 puan.",
      "NNT = 1/0,075 = 13,33 → yukarı yuvarlanır: 14. Aralığı RF uçlarının tersidir: 1/0,1365 ≈ 7,3 ile 1/0,0135 ≈ 74,0.",
    ],
    result:
      "RR = 0,500 (%95 GA 0,278 – 0,900), RF = −7,5 puan (−13,6 – −1,4), NNT = 14 (7,3 – 74,0). RR aralığı 1'i, RF aralığı 0'ı dışarıda bıraktığı için veri etkisizlikle bağdaşmıyor; ama aralığın genişliği, 200'er kişilik bir denemenin etkinin büyüklüğünü kabaca bildiğini gösteriyor. Sayfadaki kartlar aynı sayıları verir.",
  },
  misconceptions: [
    {
      myth: "OR 0,375 çıktıysa tedavi riski %62,5 azaltıyordur.",
      truth:
        "Bu, olasılık oranını göreli risk gibi okumaktır. Kontrol riski %40 ve gerçek RR 0,5 iken OR = (0,2/0,8)/(0,4/0,6) = 0,375 olur: gerçek göreli azalma %50'dir. Olay sık oldukça OR 1'den RR'nin olduğundan daha uzağa düşer. 01 sekmesindeki \"Sık olay\" ayarında RR 2,000 iken OR 3,500'dür.",
    },
    {
      myth: "p-değeri çok küçükse etki hem gerçek hem büyüktür.",
      truth:
        "p-değeri, etki yokken bu kadar uç bir verinin ne sıklıkla görüleceğini söyler, etkinin büyüklüğünü söylemez. Çok büyük bir çalışmada önemsiz bir fark çok küçük p verir. Küçük bir çalışmada anlamlı çıkan etki ise çoğunlukla abartılıdır: 05 sekmesinde grup başına 100 kişiyle anlamlı çıkan denemeler etkiyi ortalama 2,64 kat büyük gösterir. Etki büyüklüğünü ve güven aralığını oku.",
    },
    {
      myth: "Randomizasyon iki kolu her denemede birebir eşit yapar.",
      truth:
        "Yalnız ortalamada eşit yapar. Tek bir denemede şans farkı kalır: deneme başına 100 kişiyle gizli bir etkenin kollar arasındaki farkı 1000 denemenin %28,7'sinde 10 puanı aşar. Randomizasyonun gücü bu farkların yansız olması ve n büyüdükçe 1/√n ile küçülmesidir; seçimle atamada fark n ne olursa olsun kalır.",
    },
    {
      myth: "Tedaviyi bırakanları çıkarırsak tedavinin asıl etkisini görürüz.",
      truth:
        "Bırakanlar rastgele bırakmıyorsa (ör. yüksek riskliler daha çok bırakıyorsa) kalanlar seçilmiş bir gruptur ve randomizasyonun kurduğu denge bozulur. 04 sekmesinin varsayılanında etkisiz bir tedavi protokole uygun çözümlemede riski 2,19 puan azaltıyor görünür; niyet-tedavi −0,07 puanla sıfırda kalır.",
    },
  ],
  glossary: [
    { term: "Göreli risk (RR)", definition: "Maruz kalan (ya da tedavi edilen) gruptaki riskin karşılaştırma grubundaki riske oranı; 1 etkisizlik demektir." },
    { term: "Olasılık oranı (OR)", definition: "İki grubun oddslarının oranı, ad/bc; kimi kitaplarda odds oranı. Klasik vaka-kontrol çalışmasının tablodan doğrudan verebildiği ilişki ölçüsüdür." },
    { term: "NNT / NNH", definition: "Bir olayı önlemek (NNT) ya da bir ek olaya yol açmak (NNH) için tedavi edilmesi gereken kişi sayısı; mutlak risk farkının tersi, yukarı yuvarlanır." },
    { term: "Yaygınlık ve sıklık", definition: "Yaygınlık bir anda hastalığı taşıyanların payıdır (fotoğraf); sıklık sağlıklıların birim zamanda hastalanma hızıdır (akış). Küçük değerlerde yaygınlık ≈ sıklık × süre." },
    { term: "Karıştırıcı", definition: "Hem maruziyetle hem sonuçla ilişkili olup aralarındaki nedensel yolun üzerinde bulunmayan ve ilişkiyi çarpıtan üçüncü değişken." },
    { term: "Randomize kontrollü çalışma (RKÇ)", definition: "Katılımcıların tedavi ve kontrol kollarına şansla atandığı, böylece ölçülmemiş farkların da ortalamada dengelendiği deneme." },
    { term: "Niyet-tedavi (ITT)", definition: "Katılımcıları tedaviyi alıp almadıklarına bakmaksızın atandıkları kolda çözümleyen yöntem; randomizasyonun dengesini korur." },
    { term: "Güç", definition: "Gerçek bir etki varken bir çalışmanın onu seçilen anlamlılık düzeyinde yakalama olasılığı, 1 − β." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her yaklaşım üniversitede adı konmuş bir yönteme dönüşür. 2×2 tablo ve OR, biyoistatistik derslerinde <strong>lojistik regresyonun</strong> içine girer: OR'nin logaritması bir regresyon katsayısı olur ve birden çok karıştırıcı aynı anda düzeltilir. Katmanlama, epidemiyoloji derslerinde doğrudan ve dolaylı standartlaştırmaya, Mantel–Haenszel tahmincilerine ve eğilim puanı yöntemlerine genişler; karıştırıcı fikri, nedensel çıkarımın grafik modellerinde (yönlü çizgeler) kesin bir dile kavuşur.",
      "Klinik araştırma ve iyi klinik uygulama derslerinde deneme protokolü, ön kayıt, örneklem büyüklüğü hesabı, etik kurul onayı ve CONSORT raporlaması işlenir; sağkalım çözümlemesi (Kaplan–Meier eğrileri, orantılı tehlikeler modeli) olayın <em>olup olmadığına</em> değil <em>ne zaman</em> olduğuna bakar. Meta-analiz, rastgele etkiler modeli ve yayın yanlılığının huni grafikleriyle sınanmasıyla sürer. Bu sayfanın bilerek dışarıda bıraktığı GRADE ve Mantel–Haenszel oranları bu derslerin konusudur.",
    ],
    topics: ["Biyoistatistik", "Lojistik regresyon", "Sağkalım çözümlemesi", "Nedensel çıkarım", "Klinik araştırma yöntemleri", "Meta-analiz", "Araştırma etiği"],
  },
  quiz: [
    {
      question:
        "04 sekmesinde rastgele atamayla, deneme başına 100 kişiyken gizli etkenin iki kol arasındaki farkının standart sapması yaklaşık 9,3 puandır. Deneme başına kişi sayısı 400'e çıkarılırsa bu standart sapma yaklaşık ne olur?",
      options: ["Yaklaşık 2,3 puan", "Yaklaşık 4,6 puan", "Yaklaşık 9,3 puan; randomizasyon kişi sayısına bağlı değildir", "Sıfır olur"],
      answer: 1,
      explanation:
        "Şans dengesizliği √(p(1−p)(1/n₁ + 1/n₀)) ile ölçeklenir, yani 1/√n ile küçülür. n dört katına çıkınca SS yarıya iner: 9,21 → 4,59 (kuram). Sayfa 4,44 puan ölçer. Dengesizlik hiçbir sonlu n'de tam sıfır olmaz.",
    },
    {
      question:
        "Bir hastalığın yeni vaka sıklığı değişmiyor, ama yeni bir tedavi ölümleri azaltarak hastalığın ortalama süresini iki katına çıkarıyor. Yaygınlık küçükken yaygınlığa ne olur?",
      options: ["Yarıya iner, çünkü tedavi işe yarıyor", "Değişmez, çünkü yeni vaka sayısı aynı", "Yaklaşık iki katına çıkar", "Sıfıra iner"],
      answer: 2,
      explanation:
        "Dengede yeni vaka akışı çıkış akışına eşittir: I(1 − P) = P/D, buradan P = ID/(1 + ID) ≈ I × D. Süre iki katına çıkınca yaygınlık da yaklaşık iki katına çıkar. Yüksek yaygınlık her zaman kötü haber değildir; insanların hastalıkla daha uzun yaşadığını da gösterebilir.",
    },
    {
      question:
        "İki oranı karşılaştıran bir deneme %20'den %15'e inişi %80 güçle yakalamak için grup başına 903 kişi gerektiriyor. Beklenen etki yarıya inse (%20'den %17,5'e), gereken kişi sayısı yaklaşık nasıl değişir?",
      options: ["Yarıya iner", "Aynı kalır", "İki katına çıkar", "Yaklaşık dört katına çıkar"],
      answer: 3,
      explanation:
        "Formülde (p₀ − p₁)² paydadadır: farkı yarıya indirmek n'yi yaklaşık dört katına çıkarır (pay da biraz değiştiği için tam dört değil). Küçük etkileri güvenle görmek çok büyük denemeler ister; küçük denemelerde anlamlı çıkan küçük etkiler bu yüzden çoğunlukla abartılıdır.",
    },
  ],
  next: [
    {
      href: "hipotez-testi-ve-guven-araligi.html",
      title: "Hipotez Testi ve Güven Aralığı: Örnekleme, p-Değeri, Hata Türleri ve Güç",
      why: "Bu sayfanın kullandığı araçların temeli: örnekleme dağılımı, güven aralığının anlamı, p-değeri, hata türleri, güç ve Bonferroni düzeltmeli çoklu test.",
    },
    {
      href: "bayes-olasilik.html",
      title: "Bayes ve Koşullu Olasılık Laboratuvarı",
      why: "Burada yalnız anılan tanı ve tarama testlerinin isabeti: taban oranı, yanlış pozitifler ve Simpson paradoksunun ağırlıklı ortalaması.",
    },
    {
      href: "regresyon-ve-korelasyon.html",
      title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik",
      why: "Karıştırıcıyı katmanlamak yerine modele koymak: gizli ortak neden, kısmi korelasyon ve müdahalenin korelasyonla nedenselliği nasıl ayırdığı.",
    },
    {
      href: "salgin-modelleri-sir.html",
      title: "Salgın Modelleri (SIR): R₀, Sürü Bağışıklığı, Rastlantı ve Ağlar",
      why: "Bulaşıcı hastalıklarda sıklık kendi kendini besler: R₀, salgın eğrisi, sürü bağışıklığı ve stokastik salgınlar.",
    },
  ],
  sources: [
    {
      title: "Wikipedia: Randomized controlled trial",
      url: "https://en.wikipedia.org/wiki/Randomized_controlled_trial",
      note: "1948 MRC streptomisin denemesi ilk yayımlanmış RKÇ olarak ve Bradford Hill'in rolü; atamanın gizlenmesi yöntemleri; CONSORT 1996, 2001, 2010 (Nisan 2025'te CONSORT 2025 ile güncellendi).",
    },
    {
      title: "Wikipedia: Simpson's paradox",
      url: "https://en.wikipedia.org/wiki/Simpson%27s_paradox",
      note: "Böbrek taşı örneği: Charig ve ark., BMJ 292 (1986) 879–882; Julious ve Mullee, BMJ 309 (1994) 1480–1481; taş boyutuna göre başarı sayıları.",
    },
    {
      title: "Wikipedia: British Doctors Study",
      url: "https://en.wikipedia.org/wiki/British_Doctors_Study",
      note: "Ekim 1951, 40 701 hekim; 1954 ve 1956 raporları; 34 439 erkek hekimin 50 yıllık çözümlemesi ve bırakma yaşına göre kayıp yıllar. 1950 vaka-kontrol çalışması için \"Richard Doll\" maddesi.",
    },
    {
      title: "Wikipedia: Tuskegee Syphilis Study",
      url: "https://en.wikipedia.org/wiki/Tuskegee_Syphilis_Study",
      note: "1932–1972; 399 frengili ve 201 kontrol; 1947 penisilin; Peter Buxtun ve 1972; 1974 National Research Act, 1979 Belmont Raporu, 1997 özür.",
    },
    {
      title: "Wikipedia: Declaration of Helsinki",
      url: "https://en.wikipedia.org/wiki/Declaration_of_Helsinki",
      note: "Haziran 1964 kabul, Nürnberg Kodu'nun on ilkesine dayanması, son revizyon Ekim 2024. Nürnberg kararının tarihi (20 Ağustos 1947) için \"Nuremberg Code\" maddesi.",
    },
  ],
  revision: "Kasım 2026",
};
