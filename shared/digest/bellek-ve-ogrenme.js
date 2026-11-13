window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bellek-ve-ogrenme"] = {
  slug: "bellek-ve-ogrenme",
  title: "Bellek ve Öğrenme: Unutmayı Ölçmek",
  field: "Zihin ve Davranış",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bellek doğrudan görülmez; ne kadar sürede yeniden öğrendiğimizden, hangi sözcüğü geri çağırdığımızdan ve neyi yanlışlıkla \"hatırladığımızdan\" ölçülür. Ebbinghaus'un 1885 verisinden yanlış anılara.",
  hook:
    "1879–80'de bir adam anlamsız hecelerden kurulu binden fazla diziyi ezberledi, bir süre bekledi ve aynı dizileri yeniden ezberledi. Deneği de deneyi yapan da kendisiydi. Elinde kalan tek sayı, ikinci ezberin ne kadar kısa sürdüğüydü. Bu tek sayıdan unutmanın biçimini çıkarmak mümkün mü; ve 130 yıl sonra biri aynı deneyi yinelediğinde ne bulur?",
  bigIdea:
    "Bellek bir kayıt değil, ölçülen bir <strong>davranıştır</strong>: tasarruf, serbest hatırlama, uzam ve tanıma onu farklı açılardan yakalar; unutma eğrisinden çalışma belleğine kadar her kuram, veriye uydurulan ve sınırları açıkça söylenmesi gereken bir <em>modeldir</em>.",
  story: [
    "Hermann Ebbinghaus anlamı ve çağrışımı olmayan bir malzeme istiyordu. İki ünsüzün arasına bir ünlü koyarak yaklaşık 2300 hece kurdu, bunları karıştırıp rastgele diziler çekti. Unutma deneylerini 1879–80'de yaptı: 163 çift sınamanın her birinde 13 heceli sekiz diziyi, iki kez hatasız okuyana kadar öğrendi; aynı dizileri yaklaşık üçte bir saat, 1 saat, 9 saat, 1, 2, 6 ya da 31 gün sonra aynı ölçüte kadar yeniden öğrendi. Ölçtüğü şey <strong>tasarruftu</strong>: yeniden öğrenmede kazanılan sürenin ilk öğrenme süresine oranı. 1885'te yayımladığı <em>Bellek Üzerine</em> kitabında bu değerleri 100k/((log t)<sup>c</sup> + k) biçiminde bir formülle özetledi, k = 1,84 ve c = 1,25 aldı ve bunları en küçük kareler değil, yaklaşık bir kestirimle bulduğunu yazdı. Formülün başka koşullarda ya da başka kişilerde geçerli olup olmadığından emin olmadığını da ekledi.",
    "Verinin en büyük zaafı açıktı: tek denek, Ebbinghaus'un kendisi. Bir yüzyıl sonra Heller, Mack ve Seitz (1991) deneyi iki denekle (Mack ve Seitz) yeniden yaptı. Ardından Murre ve Dros (2015) aynı yedi bekleme süresini kullandı; denek bu kez makalenin ikinci yazarı, 22 yaşındaki Dros'tu. Aralık 2011 ile Şubat 2012 arasında toplam yaklaşık 70 saat hece listesi öğrenip yeniden öğrendi. Yazarlara göre yineleme başarılıydı: eğri, 31 günlük nokta dışında Ebbinghaus'unkine çok benziyordu. Bir gün sonrasında hafif bir yukarı sıçrama da göründü; yazarlar bunu ilk gecenin uykusuyla ilişkilendiren araştırmaları andı, ama nedenin uyku olduğunun ayrıca sınanması gerektiğini söyledi.",
    "Unutma eğrisi belleğin yalnız bir yüzüdür. 1956'da George Miller kısa süreli belleğin yaklaşık yedi öğe tuttuğunu ve sınırın bitlerde değil <strong>öbeklerde</strong> olduğunu öne sürdü; Nelson Cowan (2001) tekrar ve öbekleme engellendiğinde sınırın üç ile beş, ortalama dört öbek olduğunu savundu. Murdock (1962) serbest hatırlamada ilk ve son sözcüklerin ortadakilerden iyi hatırlandığını gösterdi; Glanzer ve Cunitz (1966) hatırlamadan önce araya sesli saymayı koyunca son sözcüklerin üstünlüğü kayboldu. Atkinson ve Shiffrin (1968) bunu kısa ve uzun süreli iki depoyla açıkladı; Baddeley ve Hitch (1974) kısa süreli depoyu bir merkezî yönetici ile sözel ve görsel-uzamsal alt sistemlere böldü.",
    "Bellek yalnız kaybetmez, kurar da. Deese (1959) ve onu yineleyen Roediger ile McDermott (1995), hepsi tek bir kavrama çağrışan sözcük listelerinden sonra insanların listede hiç olmayan o kavramı da \"hatırladığını\" gösterdi. Loftus ve Palmer (1974) aynı kaza filmini izleyenlere hızı farklı fiillerle sordu ve kestirimlerin fiile göre değiştiğini buldu. Öğrenme tarafında ise Cepeda ve arkadaşlarının (2006, 2008) çalışmaları aralıklı tekrarın toplu tekrardan üstün olduğunu, Roediger ve Karpicke (2006) kendini sınamanın yeniden okumaktan kalıcı olduğunu gösterdi. Bu bulguların hepsi ölçme yöntemine sıkı sıkıya bağlıdır: hangi görev, hangi malzeme, hangi gecikme.",
  ],
  core: [
    {
      heading: "Tasarruf: unutulanı yeniden öğrenerek ölçmek",
      body:
        "Artık hatırlayamadığın bir listeyi ikinci kez öğrenmek, ilk seferden çoğu zaman daha kısa sürer: bir iz kalmıştır. Ebbinghaus bu izi <strong>tasarruf</strong> ile ölçtü. İlk öğrenme L saniye, yeniden öğrenme R saniye sürdüyse tasarruf Q = (L − R)/L'dir. Bu ölçü \"akılda kalan hecelerin yüzdesi\" değildir: bir gün sonraki %33,7, hecelerin üçte birinin hatırlandığını değil, yeniden öğrenmenin ilk öğrenmenin %66,3'ü kadar sürdüğünü söyler. Ders kitaplarındaki \"bir günde %70 unutulur\" aktarımı bu ayrımı siler. Tasarruf, serbest hatırlamanın göremediği zayıf izleri de yakalar; bu yüzden aynı bellek için hatırlamadan daha yüksek çıkabilir.",
      formula: "Q = (L − R) / L",
      formulaNote: "L ilk öğrenme, R yeniden öğrenme süresi. R, L'den uzun sürerse Q negatiftir; sayfadaki Tasarruf hesapla kaydırıcıları bunu da gösterir.",
    },
    {
      heading: "Unutmanın biçimi: üç aday eğri",
      body:
        "Tek üstel model Q = μ·e<sup>−t/τ</sup> her izin sabit bir oranla bozunduğunu varsayar; kendine özgü bir zaman ölçeği τ vardır. Kuvvet modeli Q = μ·t<sup>−a</sup> ise ölçekten bağımsızdır: süre on katına çıktığında tasarruf hep aynı çarpanla, 10<sup>−a</sup> ile küçülür. Ebbinghaus verisinin en iyi kuvvet uyumunda a = 0,130, yani her on katlık bekleme Q'yu yaklaşık 0,74 ile çarpar; 20 dakikadan 31 güne (2232 kat) eğri başlangıcın %37'sine iner. Ebbinghaus'un kendi formülü Q = k/((log₁₀ t)<sup>c</sup> + k) üçüncü bir adaydır. Hangi biçimin doğru olduğu açık bir tartışmadır; Murre ve Dros'un uyarısı önemlidir: farklı hızlarla unutulan maddelerin ortalaması, hiçbiri kuvvet yasasına uymasa da kuvvet fonksiyonuna benzeyen bir eğri verebilir.",
      formula: "Q(t) = μ·t<sup>−a</sup> ⇒ Q(10t) / Q(t) = 10<sup>−a</sup>",
      formulaNote: "Log–log eksende kuvvet modeli eğimi −a olan düz bir çizgidir; üstel model ise sonunda hızla aşağı kıvrılır.",
    },
    {
      heading: "Modeli veriyle yarıştırmak: SSD ve AIC",
      body:
        "Bir modelin parametreleri, ölçülen ile öngörülen değerlerin farklarının kareleri toplamını (SSD) en küçük yapacak biçimde seçilir: <strong>en küçük kareler</strong>. Ama daha çok parametreli bir eğri yedi noktaya hep daha iyi uyar; bu yüzden SSD tek başına yarışmayı belirlemez. <strong>Akaike bilgi ölçütü</strong> (AIC) uyumu parametre sayısıyla cezalandırır; küçük olan iyidir ve kaba bir kurala göre iki model arasında 2'den küçük fark, onları ayırmaya yetmez. Parametre sayısı eşit iki model için fark yalnız SSD oranına bağlıdır: ΔAIC = n·ln(SSD₁/SSD₂). Ebbinghaus verisinde tek üstelin SSD'si kuvvetinkinin yaklaşık 20 katıdır; 7·ln 20,4 ≈ 21,1 puanlık bir farktır.",
      formula: "AIC = n·ln(2π·SSD/n) + n + 2(p + 1)",
      formulaNote: "n veri sayısı (burada 7), p parametre sayısı; +1 hata varyansı içindir. Sayfadaki bu biçim Murre ve Dros (2015) tablolarındaki AIC değerlerini verir.",
    },
    {
      heading: "Seri konum eğrisi ve iki depo",
      body:
        "Bir listeyi serbestçe hatırlarken ilk sözcükler (<strong>öncelik etkisi</strong>) ve son sözcükler (<strong>yenilik etkisi</strong>) ortadakilerden iyi hatırlanır. Murdock'un (1962) 10–40 sözcüklük listelerinde öncelik ilk dört konumu kapsıyordu, yenilik son sekiz konumda en güçlüydü ve liste uzunluğundan bağımsızdı. İki depolu yorumda (Atkinson ve Shiffrin 1968) son sözcükler hatırlama başladığında hâlâ kısa süreli depodadır ve oradan \"boşaltılır\"; ilk sözcükler ise depoyu az sözcükle paylaştıkları için daha çok tekrarlanır ve uzun süreli depoya geçer (Rundus 1971 sesli tekrarla bunu gördü). Glanzer ve Cunitz'in (1966) düzeneğinde, liste bittikten sonra rastgele tek basamaklı bir sayıdan başlayıp sesli saymak 10 saniyede yenilik tepesinin çoğunu, 30 saniyede tamamını sildi; yalnız beklemek ise bu kadar etkili değildi. Sayfadaki \"geriye say\" seçeneği bunun bir benzeridir, aynısı değildir: orada üçer üçer geriye sayılır. Uzun süreli yenilik etkisi (Bjork ve Whitten 1974) ise basit iki depo modelinin açıklayamadığı bir bulgu olarak durur.",
      formula: "s<sub>j</sub> ← s<sub>j</sub> + θ / |tampon| ; P(hatırla) = 1 − e<sup>−s</sup>",
      formulaNote: "Sayfadaki tampon modeli: tampondaki her sözcüğün iz gücü her adımda θ'nın tampondaki sözcük sayısına bölümü kadar artar. Bir öğretim modelidir, veriye uydurulmamıştır.",
    },
    {
      heading: "Yedi mi, dört mü? Öbekler ve çalışma belleği",
      body:
        "Miller (1956) uzamın, öğenin taşıdığı bilgi bit olarak çok farklı olsa da (ikili rakam, onlu rakam, sözcük) yaklaşık yedi öğede kaldığını gördü ve sınırın <strong>öbeklerde</strong> olduğunu söyledi; \"sihirli\" sözcüğünü bir söz sanatı olarak kullandı. Uzam malzemeye göre değişir: rakamlarda yaklaşık yedi, harflerde altı, sözcüklerde beş. Cowan (2001) ise tekrar ve öbekleme engellendiğinde merkezî bir sınırın ortalama dört öbek olduğunu savundu. İki sayı çelişmez, farklı şeyleri ölçer: yedi, tekrarın ve öbeklemenin serbest olduğu bir görevin sonucudur; dört, saf kapasite için önerilen bir kestirimdir. Baddeley ve Hitch (1974) kısa süreli belleği tek bir depo değil, bir <strong>çalışma belleği</strong> olarak modelledi: merkezî yönetici, sesbilgisel döngü, görsel-uzamsal kayıt defteri; 2000'de epizodik tampon eklendi. Kanıt çift görev deneylerinden gelir: farklı duyu alanlarındaki iki görev, aynı alandaki iki görevden daha az çakışır.",
    },
  ],
  lab: {
    intro:
      "Sayfa beş sekmeli bir laboratuvardır ve her sekme başka bir ölçme yöntemidir. <strong>01 · Unutma eğrisi</strong> gerçek veri dizilerine (Ebbinghaus ve üç yineleme) dört model uydurur: <strong>Veri dizisi</strong> ve <strong>Model</strong> menüleri, iki parametre kaydırıcısı, <strong>En iyi uyumu bul</strong> ve <strong>Ebbinghaus'un değerleri</strong> düğmeleri; okumalar SSD, en küçük kareler uyumu, R² · AIC ve dört modelin tablosudur. <strong>02 · Seri konum</strong>, <strong>03 · Çalışma belleği</strong> ve <strong>05 · Yanlış anılar</strong> seni denek yapar: serbest hatırlama, uzam, öbekleme ve sözcük tanıma görevleri. Bu görevlerin sonuçları kişiseldir ve birkaç denemede çok gürültülüdür; bir yeteneğin ya da tanının ölçüsü değildir ve yanıtların hiçbir yere kaydedilmez. Aşağıdaki deneyler bu yüzden sayfanın kesin hesaplanan kısımlarına dayanır: model uyumları, seri konumun <strong>tampon modeli</strong>, <strong>04 · Aralıklı tekrar</strong> sekmesindeki iki oturum modeli ve Leitner benzetimi. Kendi görevlerini yaptığında sonuçlarını bu modellerin yanında okuyabilirsin. R tuşu etkin sekmenin ayarlarını varsayılana döndürür.",
    experiments: [
      {
        title: "Ebbinghaus'un elle uydurması ne kadar iyiydi?",
        predict: "Ebbinghaus k ve c'yi 1885'te bilgisayarsız, \"yaklaşık kestirimle\" seçti. En küçük kareler uyumu onun hatasını yarıya mı indirir, yoksa ancak biraz mı iyileştirir?",
        do: "01 · Unutma eğrisi sekmesinde varsayılan ayarlarda (Ebbinghaus verisi, Ebbinghaus 1885 modeli, k 1,84, c 1,25) SSD kutusunu oku. Sonra En iyi uyumu bul düğmesine bas; Ebbinghaus'un değerleri ile geri dön.",
        observe: "Varsayılanda SSD 0,00240, altında \"en iyinin 1,10 katı\". Uyumdan sonra k = 1,80, c = 1,21 ve SSD 0,00219 (kaydırıcı adımı yüzünden; tam uyum 0,00218). Açıklanan varyans · AIC kutusu %97,7 · −30,6 gösterir.",
        explain: "Elle seçilen değerler hatayı yalnız %10 artırır; Murre ve Dros (2015) da 1,8 ve 1,21 buldu. Ama unutma: Q tasarruftur, akılda kalan yüzde değildir; tablodaki fark sütunu her noktada modelin veriden kaç puan saptığını gösterir.",
      },
      {
        title: "Kuvvet mi üstel mi? Ve tek bir aykırı nokta",
        predict: "Sabit hızla bozunan tek bir üstel iz, hem ilk saatteki hızlı düşüşü hem bir ay sonraki uzun kuyruğu yakalayabilir mi? AIC hangi modeli seçer?",
        do: "Model menüsünden sırayla Kuvvet, Tek üstel ve İki üstelin toplamı'nı seç; Dört modelin en iyi uyumu tablosunu oku. Sonra Veri dizisi menüsünde Dros'u seç ve durum satırını oku.",
        observe: "Ebbinghaus verisinde AIC: Ebbinghaus 1885 −30,6 (en küçük), Kuvvet −28,8 (+1,9), İki üstel −21,3 (+9,4), Tek üstel −7,7 (+23,0); tek üstelin SSD'si 0,05801, kuvvetin 20 katı. Dros dizisinde İki üstel en küçük AIC'yi verir; durum satırı 31. gündeki %4,1'i ve düzeltilmiş %13,7'yi anlatır.",
        explain: "Tek üstel çok kötüdür; Ebbinghaus 1885 ile kuvvet arasındaki 1,9 puan ise 2'nin altındadır ve yedi noktayla kesin bir kazanan seçilemez. Dros'un 31 günlük listeleri deneyin başında öğrenilmişti; tek bir nokta model sıralamasını değiştirebilir.",
      },
      {
        title: "Tampon modelinde öncelik ve yenilik nereden gelir?",
        predict: "Kısa süreli tampon tek sözcüklük olsaydı seri konum eğrisi nasıl görünürdü? Tampon büyüyünce gecikmeli hatırlamada son sözcükler ne olur?",
        do: "02 · Seri konum sekmesinde 12 sözcük, r = 4, θ = 0,4 iken Tampon modeli kutusunu oku. Sonra Tampon büyüklüğü r'yi 1'e, ardından 8'e çek. İstersen Hemen yaz ve 30 s geriye say koşullarında üçer dörder deneme yapıp kendi eğrini ekle.",
        observe: "r = 4: hemen · gecikmeli son 3 %80 · %15; ilk 3 %54, orta %40. r = 1: %55 · %33, ilk 3 ve orta %33: öncelik yok, gecikmede yenilik de yok. r = 8: %89 · %9; ilk 3 %81, orta %68.",
        explain: "Öncelik, ilk sözcüklerin tamponu az sözcükle paylaşıp daha çok güç toplamasından; yenilik, son sözcüklerin hatırlamada hâlâ tamponda olmasından gelir. Gecikme tamponu boşaltır. Model gecikmede son konumları ortanın bile altına indirir (orta %27, son 3 %15); Glanzer ve Cunitz'te 30 saniye sonra yenilik tepesi yalnız kayboldu. Bu, oyuncak modelin bir eksiğidir.",
      },
      {
        title: "En iyi boşluk sırtı ve Leitner kutuları",
        predict: "Sınava kalan süre bir haftadan bir yıla uzayınca en iyi tekrar boşluğu büyür mü? Gecikmenin yüzdesi olarak ne olur? Ve kartları kutulara ayıran Leitner takvimi, her gün bütün kartları tekrar etmeye yetişebilir mi?",
        do: "04 · Aralıklı tekrar sekmesinde Sınav gecikmesi'ni 1 hafta yapıp Boşluğu en iyiye ayarla'ya bas; aynısını 50 hafta için yap. Sonra R ile varsayılana dön, Leitner tablosunu oku; Tohum'u 2, 3 ve 4 yapıp tabloyu yeniden oku.",
        observe: "1 haftada Modelin en iyi boşluğu kutusu 3,6 gün gösterir (gecikmeye oranı %51,2, hatırlama %53,1); kaydırıcı en yakın yarım güne, 3,5 güne gider. 50 haftada 30,6 gün (oran %8,7; kaydırıcı 30,5). Tohum 1'de Leitner 10,1 tekrar/kart ile %71,3, her gün 30,0 tekrarla %72,7, yalnız son gün %25,9. Tohum 2'de Leitner 9,9 tekrarla %72,9'a çıkıp her günü geçer; tohum 3'te %68,8, tohum 4'te %67,2 ile geride kalır.",
        explain: "Boşluk büyüdükçe başarılı tekrar izi çok güçlendirir ama başarısızlık olasılığı da artar; en iyi boşluk bu dengedir. Model Cepeda ve arkadaşlarının (2008) yönünü (%20–40'tan %5–10'a) üretir, sayılarını değil. Leitner karşılaştırmasının işareti ise tohuma bağlıdır: 500 tohumun ortalamasında Leitner yaklaşık %70, her gün yaklaşık %74 verir. Sağlam olan sonuç, Leitner'in buna kart başına üçte bir kadar tekrarla yaklaşmasıdır; tek bir tohumdan \"hangisi daha iyi\" sonucu çıkarılamaz.",
      },
    ],
  },
  wow: [
    {
      title: "130 yıl sonra aynı eğri",
      body:
        "Ebbinghaus'un deneyleri 1879–80'deydi. 2011–12 kışında 22 yaşındaki J. Dros yaklaşık 70 saat boyunca aynı yedi bekleme süresiyle hece listeleri öğrenip yeniden öğrendi. Sonuç, 31 günlük nokta dışında, tek bir adamın bir buçuk yüzyıl önce kendi üzerinde ölçtüğü eğriye çok benziyordu. Tek denekli bir çalışma, başka bir tek denekle yinelenerek güç kazandı.",
    },
    {
      title: "Yedi hece tek okumada, otuz altı hece elli beş tekrarda",
      body:
        "Ebbinghaus tek bir okumadan sonra çoğunlukla yedi heceyi doğru söyleyebildiğini, sekizi ancak bazen başarabildiğini yazdı. 1883–84 sınamalarında 12 heceli bir dizi için ortalama 16,6, 16 hece için 30, 24 hece için 44, 36 hece için 55 tekrar gerekti. Uzamın hemen üstünde ezber bambaşka bir iştir; sayfanın 03 sekmesindeki grafik bu tabloyu çizer.",
    },
    {
      title: "Görülmeyen sözcüğü \"hatırlamak\"",
      body:
        "Deese (1959) 50 öğrenciye, hepsi listede olmayan tek bir sözcüğe çağrışan 12'şer sözcüklük listeler okudu; o kritik sözcük bazı listelerde %44'e varan oranda hatırlandı. Roediger ve McDermott (1995) en etkili altı listeyle bu oranı %40 buldu; ikinci deneyde tanınan kritik sözcüklerin %72'si \"hatırlıyorum\" diye işaretlendi: insanlar görmedikleri bir sözcüğü görmüş olmanın anısını bildirdi.",
    },
  ],
  worked: {
    title: "İki oturum, bir sınav: aralık modelini elle hesaplamak",
    prompt:
      "Sayfanın aralıklı tekrar modelinde hatırlama R(t) = (1 + t/S)<sup>−d</sup>'dir. Varsayılan değerler S₀ = 1 gün, G = 2, d = 0,5. Bir bilgiyi bugün öğrenip 7 gün sonra tekrar ediyor, ikinci oturumdan 35 gün sonra sınava giriyorsun. Sınavda hatırlama olasılığını hesapla ve aynı gün iki kez çalışmakla (toplu tekrar) karşılaştır.",
    steps: [
      "Tekrar anında başarı olasılığı: R(7 gün) = (1 + 7/1)<sup>−0,5</sup> = 1/√8 ≈ 0,354. Bilgi 7 günde zayıflamıştır; ikinci oturumda üç kişiden yalnız biri onu geri çağırabilir.",
      "Başarılı tekrar izi güçlendirir: S = S₀ + G·boşluk = 1 + 2·7 = 15 gün. Sınavda hatırlama R(35 gün) = (1 + 35/15)<sup>−0,5</sup> = (10/3)<sup>−0,5</sup> ≈ 0,548.",
      "Başarısız tekrar yeniden öğrenmedir: S = S₀ = 1 gün, sınavda R(35 gün) = 36<sup>−0,5</sup> = 1/6 ≈ 0,167.",
      "Toplam olasılık kuralıyla birleştir: P = 0,354 · 0,548 + 0,646 · 0,167 ≈ 0,194 + 0,108 = 0,301. Sayfada Seçtiğin boşlukta hatırlama kutusu %30,1 gösterir.",
      "Toplu tekrarda boşluk 0'dır: R(0) = 1, ama S = 1 + 2·0 = 1 gün kalır ve sınavda yine 1/6 ≈ %16,7 (Toplu tekrar kutusu). Modelin en iyi boşluğu kutusu 8,1 gün ve %30,2 gösterir; Boşluğu en iyiye ayarla düğmesi kaydırıcıyı en yakın yarım güne, 8 güne getirir ve kutu yine %30,2 olur. Eğri tepe çevresinde düzdür: 7 ile 8,1 gün arasındaki fark puanın onda birinden azdır (%30,14 ile %30,17).",
    ],
    result:
      "Model, 7 günlük boşlukla %30,1, toplu tekrarla %16,7 öngörür: aynı iki oturumla neredeyse iki kat. Bu bir öğretim modelidir ve hiçbir veriye uydurulmamıştır; doğrulanan şey sayı değil, en iyi boşluğun sınav gecikmesiyle büyüdüğü ama oranının küçüldüğü yöndür.",
  },
  misconceptions: [
    {
      myth: "Ebbinghaus'a göre bir gün içinde öğrendiklerimizin %70'ini unuturuz.",
      truth:
        "Ebbinghaus hatırlanan yüzdeyi değil tasarrufu ölçtü: bir gün sonraki %33,7, yeniden öğrenmenin ilk öğrenmenin %66,3'ü kadar sürdüğü demektir. Üstelik denek tek kişiydi, malzeme anlamsız hecelerdi ve ölçüt iki hatasız okumaydı. Anlamlı bir metin ya da iyi öğrenilmiş bir beceri bambaşka bir eğri verir.",
    },
    {
      myth: "Kısa süreli bellek tam yedi öğe tutar.",
      truth:
        "Miller \"sihirli\" sözcüğünü söz sanatı olarak kullandı. Uzam malzemeye göre değişir (rakam yaklaşık 7, harf 6, sözcük 5) ve öbeklemeyle büyür: THY ile TRT altı harf değil, iki öbektir. Tekrar ve öbekleme engellendiğinde Cowan'ın kestirimi ortalama dört öbektir.",
    },
    {
      myth: "Canlı ve emin hatırladığım bir şey kesinlikle olmuştur.",
      truth:
        "DRM deneylerinde tanınan kritik sözcüklerin %72'si, yani hiç gösterilmemiş sözcükler, \"hatırlıyorum\" diye işaretlendi. Loftus ve Palmer'da sorudaki fiil hız kestirimini değiştirdi. Yine de sınırlar var: McCloskey ve Zaragoza (1985) değiştirilmiş bir sınavda özgün anının bozulmadığını buldu ve sözcük listesi ile yaşanmış bir olay aynı şey değildir.",
    },
    {
      myth: "Bir metni yeniden okumak, kendimi sınamaktan daha iyi çalışmaktır.",
      truth:
        "Roediger ve Karpicke'de (2006) beş dakika sonraki sınavda yeniden okuyanlar öndeydi; ama iki gün ve bir hafta sonra sınanmış olanlar belirgin biçimde daha çok hatırladı. Yeniden okuyanlar kendilerine daha çok güveniyordu: kısa vadeli akıcılık uzun vadeli öğrenmeyle karıştırılabilir.",
    },
  ],
  glossary: [
    { term: "Tasarruf (Q)", definition: "Yeniden öğrenmede kazanılan sürenin ilk öğrenme süresine oranı, Q = (L − R)/L; Ebbinghaus'un bellek ölçüsü." },
    { term: "Öncelik ve yenilik etkisi", definition: "Serbest hatırlamada listenin ilk ve son öğelerinin ortadakilerden daha iyi hatırlanması; ikisi birlikte seri konum eğrisini oluşturur." },
    { term: "Bellek uzamı", definition: "Bir kez gösterilen bir diziden aynı sırayla hatasız tekrarlanabilen en uzun dizinin öğe sayısı." },
    { term: "Öbek", definition: "Önceki bilgiyle tek bir birim gibi tutulan öğe grubu; tanıdık bir kısaltma ya da sözcük gibi." },
    { term: "Çalışma belleği", definition: "Bilgiyi kısa süre tutup üzerinde işlem yapan sistem; Baddeley ve Hitch modelinde merkezî yönetici ve ona bağlı alt sistemler." },
    { term: "Aralık etkisi", definition: "Aynı sayıda tekrarın zamana yayıldığında art arda yapıldığından daha kalıcı öğrenme sağlaması." },
    { term: "Sınanma etkisi", definition: "Bilgiyi geri çağırmaya çalışmanın, aynı süre yeniden çalışmaktan daha kalıcı bir iz bırakması." },
    { term: "AIC", definition: "Akaike bilgi ölçütü; model uyumunu parametre sayısıyla cezalandıran, küçüğü yeğlenen karşılaştırma ölçüsü." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Psikoloji bölümünde bu konular <strong>Bilişsel Psikoloji</strong> ve <strong>Deneysel Psikoloji / Araştırma Yöntemleri</strong> derslerinde karşına çıkar: bağımlı ve bağımsız değişken, denek içi ve denekler arası desen, sıra etkileri, yineleme. Ebbinghaus'un tek denekli tasarımı ile Murdock'un altı grubu arasındaki fark, bu derslerin temel sorusudur: bir bulgu kime ve hangi koşula genellenir? Sayfadaki standart hata çubukları ve \"birkaç denemeyle fark rastlantısal olabilir\" uyarısı, aynı soruyu senin verin için sorar.",
      "Unutma eğrisi sekmesi ise bir <strong>İstatistik</strong> ve <strong>Matematiksel Psikoloji</strong> alıştırmasıdır: doğrusal olmayan en küçük kareler, olabilirlik, AIC ile model seçimi ve ortalama alma yanılgısı (bireylerin üstel eğrilerinin ortalaması kuvvet eğrisine benzeyebilir). Bir sonraki adımda bellek modelleri bağlam kayması, iz pekiştirmesi ve tanıma kararları için sinyal saptama kuramıyla kurulur; <strong>Bilişsel Sinirbilim</strong> de bu davranışsal ölçüleri hücre ve sinaps düzeyindeki değişimlere bağlamaya çalışır.",
    ],
    topics: ["Deney tasarımı ve yineleme", "Doğrusal olmayan en küçük kareler", "AIC ve model seçimi", "Seri konum ve bağlam modelleri", "Çalışma belleği modelleri", "Tanımada sinyal saptama", "Öğrenme bilimi: aralık ve sınanma"],
  },
  quiz: [
    {
      question: "İlk öğrenmesi 600 saniye süren bir listenin bir gün sonraki tasarrufu %33,7 ise yeniden öğrenme yaklaşık ne kadar sürmüştür?",
      options: ["Yaklaşık 202 saniye", "Yaklaşık 398 saniye", "Yaklaşık 600 saniye", "Listenin %33,7'si hatırlandığı için yeniden öğrenmeye gerek yoktur"],
      answer: 1,
      explanation: "Q = (L − R)/L'den R = L·(1 − Q) = 600·0,663 ≈ 398 saniye. Tasarruf, akılda kalan yüzde değil, kazanılan süredir. Sayfadaki Tasarruf hesapla kaydırıcılarında L = 600 s, R = 400 s tasarrufu %33,3 gösterir.",
    },
    {
      question: "Ebbinghaus verisine en iyi kuvvet uyumu Q = μ·t<sup>−a</sup>, a = 0,130 verir. Bekleme süresi 1 günden 10 güne çıkarsa model tasarrufu yaklaşık ne yapar?",
      options: ["On kat küçültür", "Yaklaşık 0,74 ile çarpar", "Yarıya indirir", "Değiştirmez"],
      answer: 1,
      explanation: "Kuvvet yasasında Q(10t)/Q(t) = 10<sup>−a</sup> = 10<sup>−0,13</sup> ≈ 0,74; hangi t'den başladığın fark etmez. Üstel modelde ise oran t'ye bağlıdır, çünkü modelin kendine özgü bir zaman ölçeği vardır.",
    },
    {
      question: "Cepeda ve arkadaşlarına (2008) göre bir yıllık sınav gecikmesinde en iyi boşluk gecikmenin yaklaşık %5–10'udur. Bir yıl sonra hatırlamak istediğin bir bilgiyi kabaca hangi aralıkla tekrar etmelisin?",
      options: ["Ertesi gün", "Yaklaşık 2,5–5 hafta sonra", "Yaklaşık 6 ay sonra", "Sınavdan hemen önce"],
      answer: 1,
      explanation: "365 günün %5'i yaklaşık 18, %10'u yaklaşık 37 gündür. En iyi boşluk gecikmeyle mutlak olarak büyür ama oranı küçülür: bir haftalık gecikmede %20–40 iken bir yılda %5–10'dur. Sayfadaki model aynı yönü üretir (50 haftada %8,7), sayıları uydurulmamıştır.",
    },
  ],
  next: [
    { href: "regresyon-ve-korelasyon.html", title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik", why: "Unutma eğrisine uydurulan en küçük karelerin temeli: artıklar, varsayımlar ve tek bir aykırı noktanın (Dros'un 31. günü gibi) uyumu nasıl ele geçirdiği." },
    { href: "algi-psikolojisi.html", title: "Algı Psikolojisi: Yanılsamalar, Eşikler, Sinyal Saptama ve Tepki Süresi", why: "Yine denek sensin: Weber ve Fechner yasaları, eşikler ve tanıma kararlarının arkasındaki sinyal saptama kuramı." },
    { href: "karar-ve-bilissel-yanliliklar.html", title: "Karar ve Bilişsel Yanlılıklar: İnsanlar Gerçekte Nasıl Seçer?", why: "Yine denek sensin: klasik karar problemlerini yanıtlayıp 1979'daki oranlarla karşılaştır; beklenti kuramı, çapalama, çerçeveleme ve taban oranı yanılgısı gibi yargı hataları." },
    { href: "sinir-hucresi-ve-aksiyon-potansiyeli.html", title: "Sinir Hücresi ve Aksiyon Potansiyeli: Nernst, Hodgkin–Huxley, Eşik ve İletim", why: "Belleğin hücresel taşıyıcısı: dinlenim gerilimi, ateşleme eşiği ve uyarının akson boyunca iletimi." },
  ],
  sources: [
    { title: "Classics in the History of Psychology · Ebbinghaus, Memory (1885), bölüm 7", url: "https://psychclassics.yorku.ca/Ebbinghaus/memory7.htm", note: "Ruger ve Bussenius'un 1913 İngilizce çevirisi (kamu malı): 1879–80 deneyleri, 163 çift sınama, tasarruf tablosu ve k = 1,84, c = 1,25'li formül. Bölüm 3 ve 5 hece kurgusunu ve dizi uzunluğu tablosunu verir." },
    { title: "Murre ve Dros (2015) · Replication and Analysis of Ebbinghaus' Forgetting Curve, PLOS ONE", url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644", note: "Açık erişimli yineleme: Dros'un verisi, dört dizinin model uyumları (SSD, AIC), bir gün sonraki sıçrama, ortalama alma uyarısı ve 31 günlük aykırı değer (İngilizce)." },
    { title: "OpenStax · Psychology 2e, 8.3 Problems with Memory", url: "https://openstax.org/books/psychology-2e/pages/8-3-problems-with-memory", note: "Loftus ve Palmer (1974) deneyi ve fiillere göre hız kestirimleri; bölüm 8.1 Atkinson–Shiffrin modelini anlatır (İngilizce, açık ders kitabı)." },
    { title: "PubMed · Cepeda ve ark. (2008), Spacing effects in learning: a temporal ridgeline of optimal retention", url: "https://pubmed.ncbi.nlm.nih.gov/19076480/", note: "1350'den fazla katılımcı, 3,5 aya kadar boşluk, bir yıla kadar sınav gecikmesi; en iyi boşluğun gecikmeye oranı %20–40'tan %5–10'a (İngilizce özet)." },
  ],
  revision: "Kasım 2026",
};
