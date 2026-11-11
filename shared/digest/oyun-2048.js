window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["oyun-2048"] = {
  slug: "oyun-2048",
  title: "2048: İkinin Kuvvetleriyle Muhasebe",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 25,
  tagline:
    "On dokuz yaşında bir geliştiricinin hafta sonu projesi, ikinin kuvvetlerini dört yöne kaydırtıyor. Skorun içinde gizli bir sayaç, tahtada bozulmayan bir toplam ve 131 072'de duran bir tavan var.",
  hook:
    "Oyunun adı 2048, ama 4×4'lük bu tahtada kurulabilecek en büyük taş 131 072. Daha tuhafı: oyunun sonunda skoruna ve tahtaya bakıp, oyun boyunca önüne kaç tane 4 düştüğünü tek tek saymadan söyleyebilirsin. Dört ok tuşundan ibaret bir oyunda bu kadar muhasebe nereden çıkıyor?",
  bigIdea:
    "Birleşme tahtadaki <strong>toplamı</strong> değiştirmez, yalnızca aynı toplamı daha az taşa sığdırır; toplamı büyüten tek şey her hamlede doğan 2 ya da 4'tür. Oyunun bütün sayıları, tavanı ve skoru bu tek gözlemden çıkar.",
  story: [
    "Mart 2014'te İtalyan web geliştiricisi Gabriele Cirulli on dokuz yaşındaydı ve kendine bir soru soruyordu: sıfırdan bir oyun yazabilir miyim? Bir hafta sonunu JavaScript ve CSS'e ayırdı; ortaya çıkan şeyi 9 Mart 2014'te GitHub'a açık kaynak olarak koydu ve 'vakit geçirmek için' yaptığını söyledi. Fikir ona ait değildi, bunu hiç gizlemedi: oyun, Veewo Studio'nun <em>1024</em>'ünden ve Saming'in aynı adlı <em>2048</em>'inden esinlenmişti; onların arkasında da bir ay kadar önce iOS'ta çıkan <strong>Threes</strong> vardı. Bir haftadan kısa sürede sayfayı dört milyondan fazla kişi ziyaret etti. Cirulli oyundan para kazanmayı reddetti; gerekçesi, 'kendi icat etmediği bir fikirden' kâr etmek istememesiydi.",
    "Threes'in yapımcıları Asher Vollmer ve Greg Wohlwend için tablo daha buruktu. Onların oyununda 1 ile 2 birleşip 3 oluyor, sonra üçün katları ikiye katlanıyordu ve taşlar tahtanın ucuna kadar kaymıyor, yalnızca bir kare ilerliyordu. 2048'in kuralını, yani aynı sayıların birleşmesini ve taşların duvara kadar kaymasını, geliştirme sırasında deneyip 'fazla kolay' diye elediklerini söylediler; 2014'te Wired'a, ikisinin de 2048'i ilk denemede bitirdiğini anlattılar. Bu onların anlatımıdır; ama kuralın oyunu kolaylaştırdığı doğru: duvara kadar kayan taşlar bir köşeyi sabit tutmayı mümkün kılar ve bütün iyi stratejiler bunun üstüne kuruludur.",
    "Oyunun ikinci hayatı bilgisayar bilimi dersliklerinde geçti. Kuralları bir sayfaya sığıyor, ama her hamleden sonra zar atılıyor: yeni taş rastgele bir boş kareye, yüzde 90 olasılıkla 2, yüzde 10 olasılıkla 4 olarak düşüyor. Bu, rakibi şans olan oyunlar için yazılmış <strong>expectimax</strong> aramasının ders kitabı örneği. Karmaşıklık kuramcıları da boş durmadı: 2014'te Rahul Mehta oyunun bir çeşitlemesinin PSPACE-tam olduğunu, 2015'te Stefan Langerman ile Yushi Uno, m×n'lik tahtalarda belli bir taşa ulaşılıp ulaşılamayacağına karar vermenin NP-zor olduğunu gösterdi. Bir hafta sonu projesi için fena bir akademik kariyer sayılmaz.",
  ],
  core: [
    {
      heading: "Her taş bir ikili basamak",
      body:
        "Tahtadaki bütün sayılar ikinin kuvvetidir: 2, 4, 8, …, 2<sup>k</sup>. İki eş taşın birleşmesi 2<sup>k</sup> + 2<sup>k</sup> = 2<sup>k+1</sup> demektir; bu, ikili sayı sisteminde iki tane 1'in toplanıp bir üst basamağa 'elde' vermesinden başka bir şey değildir. Güzel bir sonucu var: tahtadaki taşların hepsi birbirinden farklıysa, taşlar toplamın ikili yazılışıdır. Örneğin 64, 32, 8 ve 2 taşları 106 eder; 106'nın ikili yazılışı 1101010'dur, yani tam olarak 64 + 32 + 8 + 2. İyi oynanan bir tahta bu yüzden bir sayaca benzer: taşlar büyükten küçüğe dizilir ve yeni gelen 2'ler en sağdaki basamaktan içeri 'elde' olarak yürür.",
      formula: "2<sup>k</sup> + 2<sup>k</sup> = 2<sup>k+1</sup>",
      formulaNote: "2048 = 2¹¹: on bir kez ikiye katlanmış bir 1. Tek bir 2'den 2048'e on katlama var.",
    },
    {
      heading: "Bozulmayan toplam: hamle başına 2.2",
      body:
        "Bir hamlede kaç birleşme olursa olsun, taşların toplamı aynı kalır; birleşme toplamı değil taş sayısını değiştirir. Toplamı büyüten tek olay hamle sonunda doğan taştır. Sayfanın kodu bunu 0.9 olasılıkla 2, 0.1 olasılıkla 4 yapar; <strong>beklenen değer</strong> 0.9 × 2 + 0.1 × 4 = 2.2 olur. Oyun iki taşla başladığından, m geçerli hamleden sonra tahtadaki toplam ortalamada 4.4 + 2.2·m'dir. Buradan bir hız sınırı çıkar: 2048 taşını görmek için toplamın en az 2048 olması gerekir; bu da ortalamada dokuz yüz küsur hamle, zarların hepsi 4 gelse bile 510 hamle demektir. Hiçbir strateji bunu kısaltamaz; strateji yalnızca o kadar hamle boyunca tahtanın tıkanmamasını sağlar. Tahtayı hiç kıpırdatmayan bir tuş hamle sayılmaz ve taş doğurmaz.",
      formula: "S<sub>m</sub> = S<sub>0</sub> + 2m + 2d,  E[S<sub>m</sub>] = 4.4 + 2.2·m",
      formulaNote: "S tahtadaki toplam, m geçerli hamle sayısı, d bu hamlelerde doğan 4'lerin sayısı; her 4, bir 2'den iki fazla getirir.",
    },
    {
      heading: "Skorun formülü ve içindeki sayaç",
      body:
        "Sayfa skoru şöyle tutar: her birleşmede, oluşan taşın değeri kadar puan. Yalnız 2'lerden kurulan bir 2<sup>k</sup> taşının toplam kaç puan getirdiğini P(k) ile gösterelim. Onu kurmak için iki tane 2<sup>k−1</sup> gerekir, son birleşme de 2<sup>k</sup> puan verir: P(k) = 2·P(k−1) + 2<sup>k</sup>, P(1) = 0. Çözümü P(k) = (k−1)·2<sup>k</sup>'dir; yerine koyarak doğrulayabilirsin. Bir 2048 taşı 10 × 2048 = 20 480 puan demektir. Ama 4 olarak doğan bir taş, iki 2'nin birleşmesinden gelseydi kazandıracağı 4 puanı kazandırmamıştır. Sonuç: skor, tahtadaki taşlardan hesaplanan 'ideal' değerden tam olarak 4 × (doğan 4 sayısı) kadar eksiktir. Skor göstergesi, zarların kaç kez 4 geldiğini sessizce sayar.",
      formula: "Skor = Σ (k − 1)·2<sup>k</sup> − 4·d",
      formulaNote: "Toplam tahtadaki bütün taşlar üzerinden; d, başlangıçtaki iki taş dahil 4 olarak doğan taşların sayısı.",
    },
    {
      heading: "Tavan: neden 131 072?",
      body:
        "2<sup>n</sup> taşını yapmak için iki tane 2<sup>n−1</sup> yan yana gelmelidir. İkincisini kurarken birincisi bir kareyi işgal eder; ikincinin ikinci yarısını kurarken bir kare daha dolar. Zinciri sonuna kadar izle: son birleşmeden hemen önce tahtada 2<sup>n−1</sup>, 2<sup>n−2</sup>, …, 8, 4 ve yeni doğmuş bir 4 daha durmak zorundadır. Bu n − 1 taş eder ve tahtada yalnızca 16 kare vardır: n − 1 ≤ 16, yani n ≤ 17. En büyük taş 2<sup>17</sup> = 131 072'dir ve ancak zincirin son halkası 4 olarak doğarsa kurulabilir. Yalnız 2 doğuran bir sürümde zincir bir halka uzar, tavan 2<sup>16</sup> = 65 536'ya iner. Tavan tahtanın alanıyla doğrusal, taşın değeriyle üstel büyür: her fazladan kare, ulaşılabilir en büyük sayıyı ikiye katlar.",
      formula: "n<sub>max</sub> = (kare sayısı) + 1 = 17",
      formulaNote: "4 doğabildiği için +1; yalnız 2 doğsaydı n<sub>max</sub> kare sayısına, 16'ya eşit olurdu.",
    },
    {
      heading: "Şansa karşı oynamak: expectimax",
      body:
        "2048 bir <strong>Markov karar süreci</strong>dir: durum tahtanın o anki hâli, eylem dört yönden biri, sonuç ise bir olasılık dağılımıdır. e boş kare kalıyorsa hamlenin 2e olası devamı vardır; her kareye 0.9/e olasılıkla 2, 0.1/e olasılıkla 4 düşer. Geleceği yalnız şimdiki tahta belirler, oraya nasıl geldiğin değil; 'Markov' sözü bunu söyler. En iyi oyun, her durumun değerini şu kuralla tanımlar: kendi sıranda en iyi eylemi seç (max), zarın sırasında olasılıklarla ağırlıklı ortalama al (beklenti). Bu iki düğüm türünü sırayla açan ağaç aramasına <em>expectimax</em> denir. Ağaç çok hızlı dallanır ve durum sayısının kaba üst sınırı 18<sup>16</sup> ≈ 1.2 × 10<sup>20</sup>'dir; bu yüzden programlar birkaç hamle derine bakar, gerisini 'büyük taş köşede mi, sıra düzgün azalıyor mu, kaç boş kare var' gibi ölçütlerle tahmin eder.",
      formula: "V(s) = max<sub>a</sub> Σ<sub>s′</sub> P(s′ | s, a)·[ r(s, a) + V(s′) ]",
      formulaNote: "Bellman denklemi: s durum, a yön, r o hamlede kazanılan puan, s′ zar atıldıktan sonraki tahta.",
    },
  ],
  lab: {
    intro:
      "Kontroller yalın: <strong>ok tuşları</strong> (dokunmatikte tahtanın üzerinde kaydırma) bütün taşları bir yöne iter; üstte <strong>Skor</strong> ve <strong>En iyi</strong> göstergeleri, altında <strong>Yeni Oyun</strong> düğmesi var. En iyi skor tarayıcında saklanır, sayfayı kapatıp açsan da durur. Hamle sayacı yok; bu yüzden deneylerde ya kısa diziler sayacak ya da skoru sayaç olarak kullanacaksın. Tahtayı kıpırdatmayan bir tuş hiçbir şey yapmaz, yeni taş da doğmaz. Stratejilerle ilgili sayılar, sayfanın kodunun bilgisayarda oynatıldığı yirmişer bin oyunun ortalamasıdır; senin üç beş oyunun bunların çevresinde dağılır.",
    experiments: [
      {
        title: "Dört tane 2 sekiz eder mi?",
        predict:
          "Bir satırda yan yana 2, 2, 2 varken ← tuşuna basarsan ne kalır: 4 ile 2 mi, 2 ile 4 mü? Dört tane 2 tek hamlede 8 olur mu?",
        do: "Yeni bir oyunda taşları bir satırda biriktir. Yan yana üç eş taş yakaladığında önce ←, bir başka sefer → dene. 4, 2, 2 dizilişini bulduğunda yine ← bas. Her seferinde Skor'un kaç arttığına bak.",
        observe:
          "2, 2, 2 dizisi ← ile 4, 2 olur; → ile 2, 4. Dört tane 2, tek hamlede 4, 4 verir ve skor 8 artar; 8'i görmek için aynı tuşa bir kez daha basman gerekir. 4, 2, 2 dizisi ← ile 4, 4 olur, 8 olmaz.",
        explain:
          "Kod satırı gidilen yönün ucundan başlayarak tarar, ilk eş çifti birleştirir ve birleşen taşı o hamlede bir daha birleştirmez. Bu yüzden çiftler duvara yakın uçtan kurulur ve zincirleme birleşme bir sonraki hamleye kalır. Skor, oluşan taşların toplamı kadar artar: 4 + 4 = 8.",
      },
      {
        title: "On hamlede toplam ne kadar büyür?",
        predict:
          "Yeni oyunda tahtadaki iki taşı topla. On geçerli hamle sonra toplam en az ve en çok kaç olabilir? En olası değer hangisi?",
        do: "Yeni Oyun'a bas, başlangıç toplamını yaz (4, 6 ya da 8). Tahtayı gerçekten kıpırdatan tam on hamle yap; birleşmeleri hiç dert etme. Sonra tahtadaki bütün taşları topla. Birkaç oyunda tekrarla.",
        observe:
          "Artış her zaman 20 ile 40 arasında bir çift sayıdır; çoğu kez 20 ya da 22, ara sıra 24. Hangi yöne bastığın, kaç birleşme yaptığın sonucu hiç etkilemez. Başlangıç toplamı beş oyunun dördünde 4'tür.",
        explain:
          "Birleşme toplamı korur; her hamle 2 ya da 4 ekler. On hamlede hiç 4 gelmeme olasılığı 0.9<sup>10</sup> ≈ % 35 (artış 20), tam bir 4 gelmesi % 39 (artış 22), iki 4 gelmesi % 19 (artış 24). Ortalama artış 10 × 2.2 = 22. Başlangıçta iki taşın da 2 olması 0.9² = % 81.",
      },
      {
        title: "Skordan kaç tane 4 doğduğunu bul",
        predict:
          "Oyun boyunca doğan 4'leri saymadın. Yalnızca son tahtaya ve Skor'a bakarak kaç tane olduklarını bulabilir misin? Kabaca kaç bekliyorsun?",
        do: "Bir oyunu bitene kadar oyna (ya da istediğin anda dur). Tahtadaki her taş için (k − 1) × değer hesapla: 2 için 0, 4 için 4, 8 için 16, 16 için 48, 32 için 128, 64 için 320, 128 için 768, 256 için 1792. Hepsini topla, Skor'u çıkar, 4'e böl.",
        observe:
          "Sonuç her zaman tam sayı çıkar. Örnek: tahtada 64, 32, 8, 4, 2, 2 varsa ideal değer 320 + 128 + 16 + 4 = 468'dir; Skor 452 gösteriyorsa (468 − 452)/4 = 4 tane 4 doğmuştur. Toplam 112 olduğundan 50 hamle yapılmış, 52 taş doğmuştur: on üçte biri 4.",
        explain:
          "Her 2<sup>k</sup> taşı yalnız 2'lerden kurulsaydı (k − 1)·2<sup>k</sup> puan getirirdi; 4 olarak doğan her taş bunun 4 puanını eksik bırakır. Doğan taş sayısı hamle + 2'dir ve uzun oyunda 4'lerin payı onda bire yaklaşır. Benzetimde bu oran 0.100 çıkıyor.",
      },
      {
        title: "Rastgele parmak mı, köşe inadı mı?",
        predict:
          "Tuşlara gözün kapalı rastgele basarsan en büyük taşın kaç olur? Hep aynı iki komşu yöne yüklenirsen ne değişir: skor iki katına çıkar mı, 2048 görünür mü?",
        do: "Önce üç oyunu ok tuşlarına rastgele basarak bitir; skoru ve en büyük taşı yaz. Sonra birbirine dik iki yön seç (örneğin ← ve ↓): hep birincisine bas, tahta kıpırdamazsa ikincisine. O da kıpırdatmazsa ikincinin tersine (↑), yalnızca çaresiz kalınca birincinin tersine (→) bas.",
        observe:
          "Rastgele oyun ortalama 118 geçerli hamlede biter, skor 1100 dolayındadır; en büyük taş oyunların yaklaşık % 48'inde 128, % 37'sinde 64, % 8'inde 256'dır. Köşe kuralında oyun ortalama 226 hamle sürer, skor 2550 dolayına çıkar; en büyük taş % 47 olasılıkla 256, % 38 olasılıkla 128, % 5 olasılıkla 512. Kırk bin oyunun hiçbirinde 1024 bile görünmedi.",
        explain:
          "İki yöne yüklenmek büyük taşları bir köşede toplar ve ortayı boş tutar; ömür iki katına çıkar, toplam da onunla birlikte: 2.2 × 226 ≈ 500. Ama 2048 için toplamın 2048'i aşması, yani ortalamada dokuz yüzden fazla hamle dayanmak gerekir. Bunu ezber bir tuş sırası sağlamaz; taşları büyükten küçüğe dizili tutan ve birkaç hamle ileriye bakan bir oyun sağlar.",
      },
    ],
  },
  wow: [
    {
      title: "Bir hafta sonu, dört milyon ziyaretçi",
      body:
        "Gabriele Cirulli 2048'i tek bir hafta sonunda, 'sıfırdan oyun yazabilir miyim' diye kendini sınamak için yazdı ve 9 Mart 2014'te MIT lisansıyla GitHub'a koydu. Bir haftadan kısa sürede dört milyondan fazla ziyaretçi geldi. Kod açık olduğu için kısa sürede sayısız türevi çıktı; Cirulli ise 'kendi icat etmediği bir fikirden' para kazanmak istemediğini söyledi.",
    },
    {
      title: "Skorun tavanı: 3 932 156",
      body:
        "Düşünülebilecek en dolu tahta, 4'ten 131 072'ye kadar on altı farklı taşın yan yana durduğu tahtadır: toplamı 262 140, yani 2<sup>18</sup> − 4. Skor formülü bu tahta için Σ (k − 1)·2<sup>k</sup> = 3 932 164 verir; oyun boyunca doğan her 4 bundan dört puan düşürür. En az iki taş 4 olarak doğmak zorundadır: 131 072 zincirinin son halkası ve tahtada duran 4'ün kendisi. Skor bu yüzden 3 932 156'yı geçemez. O tahtaya varmak için toplamın 262 140'a ulaşması, yani yaklaşık 119 000 hamle yapılması ve şansın sonuna kadar yaver gitmesi gerekir.",
    },
    {
      title: "Makineler 2048'i çoktan geçti",
      body:
        "İnsanlar için 2048 taşı bir zaferdir; programlar için ısınma turu. Wikipedia'nın aktardığı 2025 tarihli bir denemede, expectimax türü bir aramayı önceden hesaplanmış oyun sonu tablolarıyla birleştiren bir program, 1200 oyunun % 99.9'unda 16 384 taşına, % 86.1'inde 32 768 taşına, % 8.4'ünde 65 536 taşına ulaştı. Tavandaki 131 072 ise hâlâ bir kuram sayısı: ona varmak için on altı karenin on altısının da kusursuz dizilmesi gerekiyor.",
    },
  ],
  worked: {
    title: "2048'e giden yolun hesabı",
    prompt:
      "Sayfadaki kurallarla (yeni taş 0.9 olasılıkla 2, 0.1 olasılıkla 4; her birleşme oluşan taş kadar puan) ilk 2048 taşını kurduğun anda yaklaşık kaç hamle yapmış ve kaç puan toplamış olursun?",
    steps: [
      "Puan bağıntısını kur. Yalnız 2'lerden yapılan 2<sup>k</sup> taşı için P(k) = 2·P(k−1) + 2<sup>k</sup>, P(1) = 0. Sırayla: P(2) = 4, P(3) = 16, P(4) = 48, P(5) = 128. Örüntü P(k) = (k − 1)·2<sup>k</sup>; denetle: 2·(k − 2)·2<sup>k−1</sup> + 2<sup>k</sup> = (k − 1)·2<sup>k</sup>.",
      "2048 = 2<sup>11</sup> için P(11) = 10 × 2048 = 20 480 puan. Bu, hiç 4 doğmadığı varsayımıyla taşın tek başına getirdiği puandır.",
      "Hamle sayısını toplamdan bul. Tahtada 2048 varsa toplam en az 2048'dir. Beklenen toplam 4.4 + 2.2·m olduğundan 4.4 + 2.2·m = 2048 eşitliği m ≈ 929 hamle verir. Kesin bir alt sınır da var: her taş 4 doğsa bile en az (2048 − 8)/4 = 510 hamle gerekir.",
      "4'lerin düzeltmesini ekle. 929 hamlede 931 taş doğar; onda biri, yaklaşık 93'ü 4'tür. Her biri 4 puan eksiltir: 93 × 4 ≈ 372 puan. Yalnız 2048 taşının payı 20 480 − 372 ≈ 20 100 puana iner.",
      "Gerçeğe yaklaştır. 2048 kurulduğu anda tahta boş değildir; yanında tipik olarak birkaç yüzlük küçük taş durur. Onlar hem hamle sayısını hem skoru biraz yukarı çeker: toplamdaki her fazladan 100, yaklaşık 45 hamle demektir.",
    ],
    result:
      "İlk 2048 taşı tipik olarak 930–1000 hamlenin ve 20 000 puanın biraz üzerinde bir skorun sonunda gelir. Skor göstergesi 20 000'e yaklaşmadan 2048'i görmeyi bekleme; geçtiyse ve hâlâ yoksa puanların küçük taşlara dağılmış demektir.",
  },
  misconceptions: [
    {
      myth: "Skor, tahtadaki taşların toplamıdır.",
      truth:
        "Toplam hamle başına ortalama 2.2 artar ve birleşmelerden etkilenmez; skor ise yalnız birleşmelerle büyür. Tek bir 2<sup>k</sup> taşının toplama katkısı 2<sup>k</sup>, skora katkısı (k − 1)·2<sup>k</sup>'dir: 2048 taşı toplamda 2048, skorda 20 480 eder. Skor kabaca toplam × (log₂ toplam − 1) kadar büyür; toplam doğrusal ilerlerken skor ondan hızlı koşar.",
    },
    {
      myth: "Yeni gelen taş her zaman 2'dir.",
      truth:
        "Sayfanın kodunda on taştan biri 4 olarak doğar. Bu küçük ayrıntı iki büyük şeyi değiştirir: tavanı 65 536'dan 131 072'ye çıkarır ve skoru her 4 için dört puan düşürür. Skor ile tahtayı karşılaştırarak kaç tane 4 doğduğunu sayabilirsin.",
    },
    {
      myth: "Yan yana dört eş taş tek hamlede iki kat yukarı çıkar.",
      truth:
        "Bir taş bir hamlede yalnızca bir kez birleşir. 2, 2, 2, 2 dizisi 4, 4 olur, 8 olmaz; 4, 2, 2 dizisi de 4, 4'te durur. Zincirin ikinci halkası için aynı tuşa bir kez daha basman gerekir ve arada doğan taş planını bozabilir.",
    },
    {
      myth: "2048 taşı oyunun sonudur, daha büyüğü yoktur.",
      truth:
        "Sayfa 2048'de bir şerit gösterip oyunu sürdürür. Kuramsal tavan 2<sup>17</sup> = 131 072'dir; çünkü son birleşmeden önce tahtada 65 536'dan 4'e kadar on beş taş ve bir 4 daha, toplam on altı taş durabilir. 2048, o merdivenin on yedi basamağından yalnızca on birincisi.",
    },
  ],
  glossary: [
    { term: "İkinin kuvveti", definition: "2'nin kendisiyle k kez çarpımı, 2<sup>k</sup>; tahtadaki her taş bu biçimdedir ve birleşme k'yi bir artırır." },
    { term: "Değişmez (invaryant)", definition: "Bir işlem boyunca değeri bozulmayan nicelik; burada birleşmeler sırasında taşların toplamı." },
    { term: "Beklenen değer", definition: "Olası sonuçların olasılıklarıyla ağırlıklı ortalaması; yeni taş için 0.9 × 2 + 0.1 × 4 = 2.2." },
    { term: "Yineleme bağıntısı", definition: "Bir dizinin terimini öncekiler cinsinden veren kural; skor için P(k) = 2·P(k−1) + 2<sup>k</sup>." },
    { term: "Durum uzayı", definition: "Oyunun bulunabileceği bütün tahtaların kümesi; 4×4 için kaba üst sınır 18<sup>16</sup> ≈ 1.2 × 10<sup>20</sup>." },
    { term: "Markov karar süreci", definition: "Sonraki durumun yalnız şimdiki duruma, seçilen eyleme ve şansa bağlı olduğu karar modeli." },
    { term: "Expectimax", definition: "Oyuncu düğümlerinde en büyüğü, şans düğümlerinde olasılık ağırlıklı ortalamayı alan oyun ağacı araması." },
    { term: "Sezgisel değerlendirme", definition: "Aramanın inemediği derinlikte tahtanın değerini boş kare sayısı ve taşların dizilişi gibi ölçütlerle tahmin eden işlev." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki üç hesap üç ayrı lisans dersinin ilk haftasıdır. Toplamın birleşmede bozulmaması bir <strong>değişmez</strong> argümanıdır; Ayrık Matematik dersinde bir şeyin <em>yapılamayacağını</em> kanıtlamanın başlıca yolu budur ve 131 072 tavanı tam böyle bir kanıttır. P(k) = 2·P(k−1) + 2<sup>k</sup> bağıntısı, Algoritmalar dersinde birleştirmeli sıralamanın çalışma süresini veren T(n) = 2·T(n/2) + n ile aynı biçimdedir; çözümü de aynı yerden gelir: her düzeyde aynı iş, log n düzey. Hamle başına 2.2 ise Olasılık dersindeki beklentinin doğrusallığıdır: zarlar ne kadar dağınık düşerse düşsün, ortalamalar toplanır.",
      "Oyunu iyi oynayan programlar <strong>Yapay Zekâ</strong> dersinin konusudur. Expectimax, satrançtaki minimax'ın rakibi şans olan sürümüdür; değer fonksiyonunu elle yazmak yerine oynayarak öğrenmek ise <strong>pekiştirmeli öğrenme</strong>dir ve Bellman denklemi ikisinin de temelidir. Karmaşıklık kuramı tarafında dikkatli olmak gerekir: NP-zorluk ve PSPACE-tamlık sonuçları 4×4'lük oyun için değil, tahta büyüdükçe ve oyunun belli çeşitlemelerinde geçerlidir. Sabit boyutlu bir tahta sonlu bir nesnedir; zorluk, problemin büyüdükçe nasıl ölçeklendiğini anlatır. Bu ayrım Hesaplama Kuramı dersinin en sık karıştırılan noktalarından biridir.",
    ],
    topics: ["Değişmezler ve imkânsızlık kanıtları", "Yineleme bağıntıları", "Beklenen değer ve doğrusallığı", "Markov karar süreçleri", "Expectimax ve oyun ağaçları", "Pekiştirmeli öğrenme", "NP-zorluk ve PSPACE"],
  },
  quiz: [
    {
      question: "Bir satırda soldan sağa 2, 2, 4 taşları ve bir boş kare var. ← tuşuna basınca satır ne olur ve skor kaç artar?",
      options: ["8 olur, skor 8 artar", "4, 4 olur, skor 4 artar", "4, 4 olur, skor 8 artar", "Değişmez; önce 4'ün yanına gelmek gerekir"],
      answer: 1,
      explanation: "İki 2 birleşip 4 olur ve 4 puan getirir; yeni 4, yanındaki 4'le aynı hamlede birleşmez, çünkü bir taş hamle başına yalnız bir kez birleşir. 8 için ← tuşuna bir kez daha basılır ve o zaman 8 puan daha gelir.",
    },
    {
      question: "Tahtada 512 taşını gören biri, oyunun başından beri en az kaç geçerli hamle yapmıştır?",
      options: ["9, çünkü 512 = 2⁹", "126", "256", "512"],
      answer: 1,
      explanation: "Toplam en az 512 olmalı. Başlangıç toplamı en çok 8, her hamlenin katkısı en çok 4'tür: 8 + 4m ≥ 512, m ≥ 126. Bu, bütün taşların 4 doğduğu en şanslı durumdur; ortalamada (512 − 4.4)/2.2 ≈ 231 hamle gerekir. Dokuz, katlama sayısıdır, hamle sayısı değil.",
    },
    {
      question: "Yalnızca 2'lerden kurulmuş tek bir 64 taşı, kurulana kadar skora toplam kaç puan yazdırmıştır?",
      options: ["64", "128", "320", "384"],
      answer: 2,
      explanation: "64 = 2⁶ ve P(k) = (k − 1)·2<sup>k</sup> olduğundan 5 × 64 = 320. Tek tek saymak da mümkün: 16 tane 4 (64 puan), 8 tane 8 (64), 4 tane 16 (64), 2 tane 32 (64) ve bir 64 (64): beş düzey, her düzeyde 64 puan.",
    },
  ],
  next: [
    { href: "hanoi-kuleleri.html", title: "Hanoi Kuleleri", why: "Bir başka ikiye katlama: her yeni disk hamle sayısını 2ⁿ − 1 kuralıyla büyütür; yineleme bağıntısı çözmenin en temiz örneği." },
    { href: "mayin-tarlasi.html", title: "Mayın Tarlası", why: "Şans yine işin içinde, ama bu kez gizli bilgi var: olasılığı sayarak bulmak ve NP-tamlık." },
    { href: "isik-sondurme.html", title: "Işık Söndürme", why: "Şanssız, saf cebir bir bulmaca: ikili sayılar bu kez 1 + 1 = 0 kuralıyla toplanır." },
    { href: "makine-ogrenmesi-derin-ogrenme-llm.html", title: "Makine Öğrenmesi, Derin Öğrenme ve LLM", why: "Değer fonksiyonunu elle yazmak yerine veriden öğrenen yöntemlerin genel resmi." },
  ],
  sources: [
    { title: "Wikipedia · 2048 (video game)", url: "https://en.wikipedia.org/wiki/2048_(video_game)", note: "Cirulli'nin anlatımı, 9 Mart 2014 tarihi, Threes ve 1024 ile ilişkisi, 131 072 tavanı ve yapay zekâ denemelerinin sonuçları (İngilizce)." },
    { title: "arXiv · Langerman ve Uno, Threes!, Fives, 1024!, and 2048 are Hard (2015)", url: "https://arxiv.org/abs/1505.04274", note: "m×n tahtalarda belli bir taşa ulaşılıp ulaşılamayacağına karar vermenin NP-zor olduğunu gösteren makale (İngilizce)." },
    { title: "arXiv · Mehta, 2048 is (PSPACE) Hard, but Sometimes Easy (2014)", url: "https://arxiv.org/abs/1408.6315", note: "n×n tahtada verilen bir konumdan hedef konuma ulaşma problemi için PSPACE-tamlık kanıtı; hamle dizisi önceden belliyse hızlı bir algoritma (İngilizce)." },
    { title: "UC Berkeley · CS 188 Introduction to Artificial Intelligence", url: "https://inst.eecs.berkeley.edu/~cs188/", note: "Expectimax, Markov karar süreçleri ve Bellman denklemi için açık ders notları ve videolar (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
