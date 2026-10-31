window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["dairesel-hareket"] = {
  slug: "dairesel-hareket",
  title: "Dairesel Hareket: Hiç Yere Varmayan Düşüş",
  field: "Fizik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Sürat hiç değişmese bile çember üzerindeki her cisim ivmelenir. İpin ucundaki anahtarlığı, virajdaki arabayı ve Ay'ı aynı formül tutar: F = mv²/r.",
  hook: "Uluslararası Uzay İstasyonu sen bu cümleyi okurken Dünya'ya doğru düşüyor; ama hiç yere varmıyor. Saniyede yaklaşık 7.7 km ile öyle hızlı ilerliyor ki düştükçe altındaki yeryüzü de eğrilip kaçıyor. İpin ucunda çevirdiğin anahtarlık da aynı fiziği yaşar: elin dışa doğru çekildiğini hisseder, oysa ip anahtarlığa yalnızca içe doğru kuvvet uygular.",
  bigIdea:
    "Çember üzerinde dönen bir cismin hızı sürekli yön değiştirdiği için cisim her an merkeze doğru <strong>a = v²/r</strong> ile ivmelenir; bu ivmeyi sağlayan kuvvet ayrı bir kuvvet değil, ip, sürtünme ya da kütleçekim gibi gerçek kuvvetlerin merkeze yönelen toplamıdır.",
  story: [
    "Bir taşı sapanda döndürüp bırak: taş merkezden dışarı doğru değil, çembere teğet uçar. René Descartes 1644'te yayımladığı <em>Felsefenin İlkeleri</em>'nde tam bu sapan örneğini kullandı ve kuralı açıkça yazdı: kendi hâline bırakılan cisim <strong>düz bir çizgide</strong> gitmeye devam eder. Bu cümlenin şaşırtıcı bir yan sonucu vardı. Çember üzerinde dönen taş da aslında her an düz gitmek ister; çember onun doğal yolu değil, zorla bükülmüş bir yoldur. O zaman soru değişir: taşı her an çemberin içine doğru büken nedir ve ne kadar güçlü olmalıdır?",
    "Nicel cevabı ilk bulan, sarkaçlı saatin mucidi Christiaan Huygens oldu. Huygens 1659 civarında yazdığı <em>De vi centrifuga</em> (Merkezkaç kuvvet üzerine) adlı incelemede, dönen bir cismin ipi germe eğiliminin süratin karesiyle arttığını ve yarıçapla azaldığını gösterdi; bugünkü diliyle <em>v²/r</em>. 'Merkezkaç' (<em>centrifuga</em>, merkezden kaçan) adını da o koydu. Sonuçlarını kanıtsız olarak 1673'te <em>Horologium Oscillatorium</em> kitabının sonuna ekledi; kanıtlarıyla birlikte tam metin ancak ölümünden sonra, 1703'te basıldı. Huygens olaya ipi tutan elin gözünden bakıyordu: elin hissettiği, dışa doğru bir çekişti.",
    "Isaac Newton aynı ilişkiye 1660'ların ortasında, Huygens'ten bağımsız olarak kendi notlarında ulaştı; o da önce 'merkezden uzaklaşma çabası' diye düşünüyordu. 1679'da Robert Hooke mektupla bir fikir önerdi: gezegen hareketini düz bir eylemsizlik hareketi ile merkeze doğru bir çekimin bileşimi olarak düşünmek. Newton bakışı tersine çevirdi: önemli olan cismin kaçma eğilimi değil, onu içe çeken kuvvetti. 1680'lerde Huygens'in terimine karşılık bu kuvvete <strong>merkezcil</strong> (<em>vis centripeta</em>, merkeze yönelen) adını verdi. 1687'de <em>Principia</em>'nın üçüncü kitabında Ay'ın yörüngesinde kalması için gereken ivmeyi hesaplayıp yeryüzündeki düşmeyle karşılaştırdı: Ay, Dünya yarıçapının yaklaşık 60 katı uzakta ve 60² = 3600 kat zayıf bir çekimle aynı yasaya uyuyordu. Aşağıdaki çözümlü örnek, bu karşılaştırmanın ta kendisidir.",
    "Ya elma? Öykünün iki tanığı var. Newton'un genç arkadaşı William Stukeley, 1726'da Newton'la bahçede yaptığı bir sohbeti 1752'de kaleme aldığı anılarında yazıya geçirdi: Newton ona, gençliğinde düşen bir elmayı görünce 'Bu elma neden yana ya da yukarı değil de hep Dünya'nın merkezine doğru düşüyor?' diye sorduğunu anlatmıştı. Darphane'deki yardımcısı ve yeğeninin eşi John Conduitt ise aynı bahçe anısında Newton'un 'Bu çekim neden Ay'a kadar uzanmasın?' diye düşündüğünü aktardı. Elmanın Newton'un kafasına düştüğü bu kayıtların hiçbirinde yoktur; o kısım sonradan eklenmiş bir süstür. Kesin olan, elmanın değil hesabın tarihe geçtiğidir: Ay'ı yörüngede tutan ivme ile ağaçtan düşen elmanın ivmesi tek bir ters kare yasasının iki ucuydu.",
  ],
  core: [
    {
      heading: "Yön değişimi de ivmedir",
      body: "İvme yalnızca hızlanmak ya da yavaşlamak değildir; hız bir <strong>vektördür</strong> ve yönü değiştiğinde de ivme vardır. Çember üzerinde kısa bir Δt süresinde cisim Δs = vΔt kadar yol alır ve hız vektörü, yarıçapın döndüğü açı kadar döner. Konumların oluşturduğu üçgenle hızların oluşturduğu üçgen benzerdir: |Δv|/v = Δs/r. Buradan |Δv|/Δt = v²/r çıkar. Δt küçüldükçe Δv tam merkeze yönelir; bu yüzden bu ivmeye <strong>merkezcil ivme</strong> denir.",
      formula: "a<sub>c</sub> = v²/r",
      formulaNote:
        "Sürati iki katına çıkarmak ivmeyi dört katına çıkarır; yarıçapı iki katına çıkarmak (aynı süratte) ivmeyi yarıya indirir.",
    },
    {
      heading: "Açısal hız ve periyot: dönmenin saati",
      body: "Bir tur 2πr uzunluğundadır; v süratiyle bu yol <strong>periyot</strong> denen T = 2πr/v sürede biter. Yarıçapın saniyede taradığı açıya <strong>açısal hız</strong> denir: ω = v/r, birimi rad/s. v = ωr yazınca ivme ω²r biçimini alır. Bu iki yazım bir paradoks gibi görünür: v²/r'de yarıçap paydada, ω²r'de payda. Çelişki yok; hangi büyüklüğü sabit tuttuğuna bağlı. Sabit süratle daha geniş bir virajda ivme azalır; aynı atlıkarıncada dış kenardaki at ise hem daha hızlı gider hem daha büyük ivme yaşar.",
      formula: "ω = v/r = 2π/T ; a<sub>c</sub> = ω²r = 4π²r/T²",
      formulaNote:
        "Son biçim çok kullanışlıdır: yalnızca yarıçapı ve tur süresini bilmek ivmeyi bulmaya yeter. Newton'un Ay hesabı tam olarak budur.",
    },
    {
      heading: "Merkezcil kuvvet bir görevdir, kuvvet türü değil",
      body: "Newton'un ikinci yasası F = ma'yı merkezcil ivmeye uygula: cismi çemberde tutmak için merkeze doğru <strong>mv²/r</strong> büyüklüğünde net kuvvet gerekir. Bu kuvveti kim sağlar? Anahtarlıkta ipin gerilmesi, virajdaki arabada lastikle asfalt arasındaki sürtünme, lunaparkta dönen silindirde duvarın itişi, Ay'da Dünya'nın kütleçekimi, hızlandırıcıdaki protonda manyetik kuvvet. Serbest cisim çiziminde 'merkezcil kuvvet' diye ayrı bir ok çizilmez; çizilen gerçek kuvvetlerin merkeze yönelen toplamı mv²/r'ye eşit olmak zorundadır.",
      formula: "ΣF<sub>merkeze</sub> = m·v²/r",
      formulaNote:
        "Gereken kuvvet sağlanamazsa (sürtünme yetmezse, ip koparsa) cisim çemberden ayrılır ve o anki hız yönünde, yani teğet boyunca gider.",
    },
    {
      heading: "Merkezkaç: dönen gözün gördüğü kuvvet",
      body: "Sağa dönen bir arabada sola, kapıya doğru itildiğini hissedersin. Yoldan bakan biri başka bir şey görür: sen düz gitmeye devam etmek istersin, araba sağa döner ve kapı seni içe doğru iterek dönüşe katar. Seni iten kapıdır; seni kapıya doğru iten bir kuvvet yoktur. Dönen bir çerçevenin içinden bakan biri ise Newton yasalarını kullanabilmek için dışa doğru <strong>mω²r</strong> büyüklüğünde bir <strong>eylemsizlik kuvveti</strong> eklemek zorundadır. Bu kuvvetin bir kaynağı, bir tepki kuvveti yoktur; yalnızca dönen bakış açısında hesap kolaylığı sağlar.",
      formula: "F<sub>merkezkaç</sub> = mω²r (yalnızca dönen çerçevede)",
      formulaNote:
        "Eylemsiz (dönmeyen) bir çerçevede bu terim hiç yazılmaz; orada yalnızca merkezcil yönde gerçek kuvvetler vardır.",
    },
    {
      heading: "Yörünge: hiç yere varmayan düşüş",
      body: "Bir dağın tepesinden yatay atılan gülle yere düşer. Daha hızlı atarsan daha uzağa düşer. Newton bu düşünce deneyini sonuna kadar götürdü: gülle yeterince hızlıysa yeryüzü onun altından eğrilerek kaçar ve gülle dünyayı dolanır. Koşul basittir: kütleçekim tam olarak gereken merkezcil kuvveti sağlamalıdır. Yeryüzüne yakın bir yörüngede bu √(gR) ≈ 7.9 km/s demektir. Aynı eşitlikten tur süresi için T² ∝ r³ çıkar; Kepler'in üçüncü yasası, çember yörünge için tam olarak budur.",
      formula: "GMm/r² = mv²/r ⟹ v = √(GM/r)",
      formulaNote:
        "Kütle m iki tarafta da var ve sadeleşir: aynı yükseklikteki bir uydu ile bir tükenmez kalem aynı süratle dolanır.",
    },
  ],
  lab: {
    intro:
      "Sayfada üç kaydırıcı var: <strong>Yarıçap r</strong> (60–160 m), <strong>Hız v</strong> (1–12 m/s) ve <strong>Kütle m</strong> (1–10 kg). Hepsi tam sayı adımlarla değişir; kaydırıcıya tıklayıp klavyenin ok tuşlarıyla birer birer ayarlayabilirsin. Kaydırıcıların yanında sayı yazmaz: seçtiğin değerleri alt satırın sonundaki parantezden (m, v, r) oku. Aynı satırda a<sub>c</sub> ile F<sub>c</sub>, sol üst köşede ω ile T yazar. <strong>Duraklat</strong> düğmesi hareketi dondurur, aynı düğme <strong>Devam</strong> olur. Oklara güvenme, sayılara güven: yeğil hız oku v ile uzar (90 pikselde kesilir); kırmızı a<sub>c</sub> okunun boyu ise v'ye değil yalnızca r'ye bağlıdır, bu yüzden v²/r'nin tersine r büyüyünce uzar. Turuncu F oku (lejantta yok) m·v² ile orantılı çizilir ve çoğu ayarda birkaç pikseldir; ancak m = 10, v = 12'de yaklaşık 20 piksele ulaşır. Animasyon her karede sabit bir açı ilerlediği için tur süresi ekranın yenileme hızına bağlıdır: 60 Hz ekranda T'nin söylediğinden 2.4 kat, 120 Hz ekranda 4.8 kat hızlı döner. Gerçek tur süresi sol üstteki T'dir. Ölçek ise gerçekçidir: 12 m/s yaklaşık 43 km/sa eder, 60–160 m da gerçek yol virajlarının boyutudur.",
    experiments: [
      {
        title: "Sürati iki katına çıkar",
        predict:
          "Yarıçap ve kütle sabitken sürati 3'ten 6'ya, sonra 12 m/s'ye çıkarırsan a<sub>c</sub> her adımda kaç katına çıkar: iki mi, dört mü?",
        do: "Yarıçap r'yi 100, Kütle m'yi 2 yap. Hız v kaydırıcısını sırayla 3, 6 ve 12'ye getir; her seferinde alt satırdaki a<sub>c</sub> ve F<sub>c</sub> ile sol üstteki T değerini not et.",
        observe:
          "a<sub>c</sub>: 0.09 → 0.36 → 1.44 m/s²; F<sub>c</sub>: 0.18 → 0.72 → 2.88 N; T: 209.44 → 104.72 → 52.36 s. Yeşil ok uzar, ama ivme 16 kat büyüdüğü hâlde kırmızı ok kıpırdamaz: sayfa onun boyunu 0.35·r piksel olarak çizer, burada r = 100 sabit olduğu için ok da 35 pikselde sabit kalır. Büyüklüğü oktan değil, sayıdan oku.",
        explain:
          "Hız iki katına çıkınca hız vektörü hem iki kat büyüktür hem de iki kat hızlı döner; iki etki çarpılır ve ivme 2² = 4 kat olur. Virajı iki kat hızlı alan bir araba dört kat sürtünme kuvveti ister; virajlarda hız sınırının düşürülmesinin nedeni budur.",
      },
      {
        title: "Virajı genişlet",
        predict:
          "Sürat 6 m/s'de sabitken yarıçapı 60'tan 120 m'ye çıkarırsan ivme ne olur? Kırmızı okun ne yapacağını da tahmin et.",
        do: "Hız v = 6, Kütle m = 2 iken Yarıçap r'yi önce 60'a, sonra 120'ye getir. a<sub>c</sub>, F<sub>c</sub>, ω ve T değerlerini karşılaştır.",
        observe:
          "a<sub>c</sub> 0.60'tan 0.30 m/s²'ye, F<sub>c</sub> 1.20'den 0.60 N'ye iner; ω 0.10'dan 0.05 rad/s'ye düşer, T 62.83'ten 125.66 s'ye çıkar. Ama kırmızı ok kısalacağı yerde 21'den 42 piksele uzar: sayfa onu yarıçapla orantılı çiziyor, yani fiziğin tam tersini gösteriyor. Burada sayı haklı, ok haksız.",
        explain:
          "Aynı süratle geniş bir çemberde hız vektörü daha yavaş döner (ω = v/r yarıya indi), bu yüzden ivme de yarıya iner. Otoyol virajlarının şehir içi virajlardan çok daha geniş yapılmasının nedeni budur.",
      },
      {
        title: "Aynı tur süresi, iki pist",
        predict:
          "İki bisikletçi aynı merkezli iki dairesel pistte yan yana kalıyor, yani turlarını aynı sürede bitiriyor; iç pistin yarıçapı 80 m, dışınki 160 m. Hangisinin ivmesi büyük ve kaç kat?",
        do: "Önce Yarıçap r = 80, Hız v = 4 yap; sonra Yarıçap r = 160, Hız v = 8 yap (dıştaki aynı sürede iki kat yol aldığı için iki kat hızlıdır). Sol üstteki ω ve T'nin aynı kaldığını doğrula, a<sub>c</sub>'yi oku.",
        observe:
          "İki durumda da ω = 0.05 rad/s ve T = 125.66 s. Ama a<sub>c</sub> 0.20'den 0.40 m/s²'ye çıkar: dıştaki bisikletçinin ivmesi iki katıdır. Ekranda da top iki durumda aynı açısal hızla döner: animasyon iki durumu aynı oranda hızlandırdığı için bu kıyas gözle de doğrudur.",
        explain:
          "Açısal hız sabitken a = ω²r yarıçapla doğru orantılıdır. Bir önceki deneyde r büyüyünce ivme azalmıştı; çünkü orada v sabitti. Hangi büyüklüğün sabit tutulduğunu sormak, iki formülün görünürdeki çelişkisini çözer. Atlıkarıncada dış kenardaki atın daha büyük ivme yaşaması da bundandır.",
      },
      {
        title: "Kütle ve kopan ip",
        predict:
          "Kütleyi 1'den 10 kg'a çıkarırsan a<sub>c</sub> ile F<sub>c</sub>'den hangisi değişir? İp tam şu an kopsaydı top hangi yöne giderdi?",
        do: "Yarıçap r = 110, Hız v = 6 iken Kütle m'yi 1'den 10'a getir. Sonra Duraklat'a basıp yeşil ile kırmızı okun arasındaki açıya bak; Devam ile sürdürüp topu birkaç farklı konumda yeniden dondur.",
        observe:
          "a<sub>c</sub> 0.33 m/s²'de sabit kalır; F<sub>c</sub> 0.33'ten 3.27 N'ye çıkar. 0.33 × 10 = 3.30 etmez mi? Ekran iki basamağa yuvarlar: gerçek değer 36/110 = 0.327… N'dir ve on katı tam olarak 3.27 N'dir. Dondurulmuş her karede yeşil ok yarıçapa diktir, kırmızı ok merkeze bakar.",
        explain:
          "İvme yalnızca hareketin geometrisine (v ve r) bağlıdır; kütle yalnızca bu ivmeyi üretmek için gereken kuvveti büyütür. İp kopsaydı merkeze çeken kuvvet kaybolur ve top yeşil ok boyunca, teğet doğrultuda düz giderdi; merkezden dışarı doğru değil.",
      },
    ],
  },
  wow: [
    {
      title: "Saniyede 7.7 km hızla düşen laboratuvar",
      body: "Uluslararası Uzay İstasyonu yaklaşık 400 km yükseklikte, saniyede yaklaşık 7.7 km hızla dolanır. NASA'ya göre yaklaşık 90 dakikada bir tur atar; 24 saatte 16 gün doğumu ve 16 gün batımı görür. O yükseklikte yerçekimi yok değildir: yeryüzündekinin yaklaşık yüzde 89'u, yani 8.7 m/s² kadardır. Şimdi merkezcil ivmeyi hesapla: Dünya'nın merkezine uzaklık 6371 + 400 = 6771 km, daha kesin sürat 7.67 km/s; v²/r ≈ 8.7 m/s². İki sayı aynı, çünkü kütleçekim tam olarak gereken merkezcil ivmeyi sağlıyor. Astronotlar da istasyon da bu ivmeyle birlikte düşer; bu yüzden yüzerler.",
    },
    {
      title: "Bir buçuk saatten kısa gün, ağırlıksız ekvator",
      body: "Dünya'nın dönüşü ekvatordaki birini saniyede yaklaşık 465 m (saatte yaklaşık 1670 km) hızla taşır. Buna rağmen merkezcil ivme yalnızca 0.034 m/s² eder, g'nin binde 3.5'i: dönüşün tek başına etkisi, 50 kg'lık birinin tartısında 200 gramdan az bir fark yaratır. Peki gün ne kadar kısa olsaydı ekvatordaki cisimler ağırlıksız kalırdı? ω²R = g koşulundan yaklaşık 84 dakika çıkar. Bu, yeryüzünü sıyırarak dolanan bir uydunun tur süresiyle aynıdır: o hızda dönen bir ekvatorda yerde duran taş, aslında yörüngede olurdu.",
    },
    {
      title: "Bir milyon g ile molekül tartmak",
      body: "İsveçli kimyacı The Svedberg 1925'te ultrasantrifüjü geliştirdi; ertesi yıl kolloidler (dispers sistemler) üzerine çalışmalarıyla Nobel Kimya Ödülü'nü aldı. Fikir a = ω²r'de gizli: dakikada 150 000 devirle dönen bir rotorda merkezden 4 cm uzaktaki nokta yaklaşık 10⁷ m/s² ivmelenir, yani yaklaşık bir milyon g. Böyle bir ivmede proteinler bile kütlelerine ve biçimlerine göre farklı hızlarda çöker. Biyologların ribozomlara '70S' ve '80S' demesindeki S, onun adını taşıyan çökelme birimidir. Kıyas için: dakikada 1200 devir yapan 25 cm yarıçaplı bir çamaşır makinesi tamburunun duvarı yaklaşık 400 g yaşar.",
    },
  ],
  worked: {
    title: "Newton'un Ay testi",
    prompt:
      "Ay, Dünya'nın merkezinden yaklaşık r = 3.84×10⁸ m uzakta (Dünya yarıçapının yaklaşık 60 katı) ve bir turunu yıldızlara göre T = 27.32 günde tamamlıyor. Ay'ın merkezcil ivmesini bul ve yerçekiminin uzaklığın karesiyle zayıfladığı varsayımının öngördüğü g/60² değeriyle karşılaştır (g = 9.81 m/s²).",
    steps: [
      "Periyodu saniyeye çevir: T = 27.32 gün × 86 400 s/gün ≈ 2.360×10⁶ s.",
      "Yörünge süratini bul: v = 2πr/T = 2π × 3.84×10⁸ m / 2.360×10⁶ s ≈ 1022 m/s. Ay saniyede yaklaşık 1 km yol alır.",
      "Merkezcil ivmeyi hesapla: a = v²/r = (1022 m/s)² / 3.84×10⁸ m ≈ 2.72×10⁻³ m/s². Aynı sonucu a = 4π²r/T² ile de alırsın.",
      "Ters kare öngörüsünü hesapla: 60 kat uzaklıkta çekim 60² = 3600 kat zayıf olmalı: g/3600 = 9.81/3600 ≈ 2.73×10⁻³ m/s². İki sayı yüzde bir içinde örtüşür.",
      "Sonucu sezgiye çevir: Ay bir saniyede düz yolundan yalnızca ½at² ≈ 1.4 mm sapar, yani Dünya'ya doğru 'düşer'. Bir dakikada ise ½ × 2.72×10⁻³ × 60² ≈ 4.9 m düşer: yeryüzünde bir elmanın ilk saniyede düştüğü kadar.",
    ],
    result:
      "Ay'ın merkezcil ivmesi yaklaşık 2.72×10⁻³ m/s²'dir ve g/3600 ile örtüşür. Ay'ı yörüngede tutan kuvvet, elmayı düşüren kuvvetin 60 kat uzaktaki hâlidir.",
  },
  misconceptions: [
    {
      myth: "Merkezkaç kuvvet dönen cismi dışarı iter; ip koparsa top merkezden dışa doğru fırlar.",
      truth:
        "Yerden bakan biri için dışa doğru iten bir kuvvet yoktur; yalnızca içe doğru çeken ip vardır. İp koptuğunda bu kuvvet kaybolur ve top o anki hız yönünde, yani çembere teğet olarak düz gider. Sayfada Duraklat'a bas: topun gideceği yol yeşil oktur, merkezden dışarı bakan bir ok yoktur.",
    },
    {
      myth: "Sürat sabitse ivme sıfırdır.",
      truth:
        "İvme hız vektörünün değişimidir, yalnızca büyüklüğünün değil. Düzgün dairesel harekette sürat sabittir ama yön her an değişir; ivme merkeze doğru ve v²/r büyüklüğündedir. Sayfada v ve r sabitken bile a<sub>c</sub> sıfırdan farklı bir sayı gösterir.",
    },
    {
      myth: "Merkezcil kuvvet, cisme etki eden kuvvetlere eklenen ayrı bir kuvvettir.",
      truth:
        "Merkezcil kuvvet, gerçek kuvvetlerin (gerilme, sürtünme, normal kuvvet, kütleçekim) merkeze yönelen toplamına verilen addır. Serbest cisim çizimine ayrıca 'F<sub>merkezcil</sub>' oku eklemek kuvveti iki kez saymaktır. Doğru yol: gerçek kuvvetleri çiz, merkeze yönelen bileşenlerini topla ve mv²/r'ye eşitle.",
    },
    {
      myth: "Uzay istasyonundaki astronotlar orada yerçekimi olmadığı için yüzer.",
      truth:
        "Yaklaşık 400 km yükseklikte yerçekimi yeryüzündekinin yaklaşık yüzde 89'udur. Astronotlar yüzer, çünkü istasyonla birlikte serbest düşmededir: kütleçekim onları ve istasyonu aynı ivmeyle merkeze doğru çeker. Yerçekimi olmasaydı istasyon çemberden teğet çıkıp uzaya giderdi.",
    },
  ],
  glossary: [
    {
      term: "Düzgün dairesel hareket",
      definition:
        "Bir cismin çember üzerinde sabit süratle dolanması; hızın büyüklüğü sabit, yönü sürekli değişir.",
    },
    {
      term: "Merkezcil ivme (a<sub>c</sub>)",
      definition:
        "Hız vektörünün yön değişiminden doğan, çemberin merkezine yönelik ve büyüklüğü v²/r = ω²r olan ivme.",
    },
    {
      term: "Merkezcil kuvvet",
      definition:
        "Cismi çember üzerinde tutan, gerçek kuvvetlerin merkeze yönelen toplamı; büyüklüğü mv²/r'dir.",
    },
    {
      term: "Açısal hız (ω)",
      definition:
        "Yarıçapın birim zamanda taradığı açı; düzgün dairesel harekette ω = v/r = 2π/T, birimi rad/s.",
    },
    {
      term: "Periyot (T)",
      definition: "Bir tam turun süresi; T = 2πr/v, birimi saniye.",
    },
    {
      term: "Teğet",
      definition:
        "Çembere tek noktada dokunan ve o noktada yarıçapa dik olan doğru; dönen cismin anlık hızı bu doğrultudadır.",
    },
    {
      term: "Eylemsiz referans çerçevesi",
      definition:
        "İvmelenmeyen ve dönmeyen bir bakış noktası; Newton yasaları burada ek kuvvet eklemeden geçerlidir.",
    },
    {
      term: "Merkezkaç kuvvet",
      definition:
        "Yalnızca dönen bir çerçeveden bakınca hesaba eklenen, dışa yönelik ve kaynağı olmayan mω²r büyüklüğündeki eylemsizlik kuvveti.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede a = v²/r benzer üçgenlerle bulunur; üniversitede tek satırlık bir türevdir. Konumu vektör olarak yaz: <strong>r</strong>(t) = r·(cos ωt, sin ωt). İki kez türev alınca <strong>a</strong>(t) = −ω²·<strong>r</strong>(t) çıkar: eksi işareti 'merkeze doğru' demektir, büyüklük ω²r'dir. Sürat de değişiyorsa ivme ikiye ayrılır: süratin değişimini taşıyan teğetsel bileşen ve yön değişimini taşıyan merkezcil bileşen. Kutupsal koordinatlarda genel ivme formülü, yarıçapın da değiştiği durumları kapsar ve gezegen yörüngelerinin elips olduğunu kanıtlamanın yolunu açar.",
      "Dönen çerçeveler ayrı bir ders konusudur. Dönen bir platform üzerinde hareket eden cisim için merkezkaçın yanına bir eylemsizlik kuvveti daha eklenir: <strong>Coriolis kuvveti</strong>. Kuzey yarımkürede tropikal siklonların (kasırga, tayfun) saat yönünün tersine dönmesi bu etkinin büyük ölçekli sonucudur; hortum ya da lavabo girdabı gibi küçük dönmelerde Coriolis etkisi çoğu zaman diğer etkilerin yanında önemsiz kalır. Aynı mv²/r eşitliği yüklü parçacıklar için qvB = mv²/r olur ve r = mv/(qB) verir; siklotronlar, kütle spektrometreleri ve parçacık hızlandırıcıları bu bağıntıyla tasarlanır. Dönme hareketinin tam dili ise açısal momentum, tork ve eylemsizlik momentidir.",
    ],
    topics: [
      "Vektör değerli fonksiyonların türevi",
      "Kutupsal koordinatlarda ivme",
      "Dönen çerçeveler ve Coriolis kuvveti",
      "Açısal momentum ve tork",
      "Merkezî kuvvet problemi",
      "Siklotron ve kütle spektrometresi",
    ],
  },
  quiz: [
    {
      question:
        "Bir sürücü aynı düz (eğimsiz) virajı dün 36 km/sa ile, bugün 72 km/sa ile alıyor. Arabayı virajda tutmak için lastiklerin sağlaması gereken sürtünme kuvveti bugün kaç katıdır?",
      options: [
        "İki katı",
        "Dört katı",
        "Yarısı",
        "Aynı, çünkü viraj ve araba değişmedi",
      ],
      answer: 1,
      explanation:
        "Gereken kuvvet mv²/r'dir ve sürat karesiyle girer: 2² = 4. Sayfada r = 100, m = 2 iken v'yi 6'dan 12'ye çıkarınca F<sub>c</sub> 0.72'den 2.88 N'ye çıkar. Hız vektörü hem iki kat büyüktür hem iki kat hızlı döner; iki etki çarpılır. Hızı iki katına çıkarmak, lastiklerden dört kat fazlasını istemektir.",
    },
    {
      question:
        "Duraklat'a bastın ve top çemberin en sağında. İp tam bu anda kopsaydı top nereye giderdi?",
      options: [
        "Yarıçap boyunca merkezden dışarı",
        "Merkeze doğru",
        "Yeşil ok doğrultusunda, çembere teğet",
        "Çember üzerinde dönmeye devam ederek",
      ],
      answer: 2,
      explanation:
        "İp kopunca merkeze çeken kuvvet ortadan kalkar; net kuvvet yoksa cisim o anki hızıyla düz gider (Newton'un birinci yasası). O anki hız teğettir. Dışa doğru gitmesi için dışa doğru bir kuvvet gerekirdi, öyle bir kuvvet yok.",
    },
    {
      question:
        "Aynı atlıkarıncada biri merkeze 2 m, öteki 4 m uzakta oturan iki çocuk aynı sürede bir tur atıyor. Hangisi doğrudur?",
      options: [
        "İçteki çocuğun ivmesi daha büyüktür, çünkü a = v²/r'de r paydadadır",
        "Dıştaki çocuğun ivmesi iki katıdır",
        "İvmeleri eşittir, çünkü tur süreleri aynıdır",
        "Dıştaki çocuğun ivmesi dört katıdır",
      ],
      answer: 1,
      explanation:
        "Tur süresi aynıysa ω aynıdır ve a = ω²r yarıçapla doğru orantılıdır: 4 m'deki çocuk iki kat ivmelenir. v²/r ile de aynı sonuç çıkar, çünkü dıştaki çocuğun sürati de iki katıdır: (2v)²/(2r) = 2·v²/r. İlk seçenek v'nin sabit olduğunu varsayma hatasıdır.",
    },
  ],
  next: [
    {
      href: "kepler-yasalari.html",
      title: "Kepler Yasaları",
      why: "Eksantriklik kaydırıcısını 0'a çek: elips çembere döner ve buradaki GMm/r² = mv²/r eşitliği geçerli olur. Sonra Gezegen menüsünde Merkür'den Mars'a T²/a³'ün hep 1 kaldığını gör.",
    },
    {
      href: "atislar.html",
      title: "3B Atış Simülasyonu",
      why: "Newton'un güllesinin ilk adımı: düz yer ve sabit g ile atılan top bir parabol çizer. Hızı artırdıkça topun daha uzağa düştüğünü izle; yeryüzü eğri ve hız 7.9 km/s olsaydı top hiç yere varmazdı.",
    },
    {
      href: "sarkac.html",
      title: "Sarkaç Laboratuvarı",
      why: "Sarkaç topu da bir çember yayında gider. En alt noktada hız en büyüktür ve ip, ağırlığa ek olarak mv²/L kadar fazla gerilir; sayfa gerilmeyi göstermez ama enerji çubukları hızın nerede tepe yaptığını gösterir.",
    },
    {
      href: "birim-cember.html",
      title: "Birim Çember",
      why: "Buradaki top da (r·cos θ, r·sin θ) noktasında dolaşır. Açı kaydırıcısını 0'dan 360°'ye sürükle ve cos θ ile sin θ izdüşümlerinin nasıl salındığını izle; köprüdeki r(t) formülü bu resimdir.",
    },
  ],
  sources: [
    {
      title:
        "OpenStax · University Physics Vol. 1, 4.4 Uniform and Nonuniform Circular Motion",
      url: "https://openstax.org/books/university-physics-volume-1/pages/4-4-uniform-and-nonuniform-circular-motion",
      note: "Merkezcil ivmenin türetilmesi, teğetsel ivme ve çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · University Physics Vol. 1, 6.3 Centripetal Force",
      url: "https://openstax.org/books/university-physics-volume-1/pages/6-3-centripetal-force",
      note: "Düz ve eğimli virajlar, merkezkaç kuvvetin bir eylemsizlik kuvveti olarak açıklanması ve Coriolis kuvveti.",
    },
    {
      title: "NASA · International Space Station Facts and Figures",
      url: "https://www.nasa.gov/international-space-station/space-station-facts-and-figures/",
      note: "İstasyonun hızı, tur süresi ve günlük tur sayısı için resmî veriler.",
    },
    {
      title: "NobelPrize.org · The Svedberg, Nobel Kimya Ödülü 1926",
      url: "https://www.nobelprize.org/prizes/chemistry/1926/svedberg/facts/",
      note: "Ultrasantrifüjün 1925'te geliştirilmesi ve ödül gerekçesi.",
    },
  ],
  revision: "Ekim 2026",
};
