window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["besin-agi"] = {
  slug: "besin-agi",
  title: "Besin Ağı: Bir Lokmanın Yolculuğu",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Bir baykuşun öğününü üreticilere kadar izle. Enerji bütçesini kur; üç aktarımın nasıl çarpıldığını ve bir yolun var olmasının neden hayatta kalma garantisi olmadığını keşfet.",
  hook: "Ekrandaki çayırdan çekirgeyi çıkarırsan baykuşa giden bütün besin yolları kapanır mı? Fareyi çıkarmak da aynı sonucu mu verir? Birkaç ok, bu soruların bir bölümünü cevaplar; ama baykuşun yarın aç kalıp kalmayacağını söylemek için çok daha fazlası gerekir.",
  bigIdea: "Besin ağı <strong>kimin kimden beslendiğini</strong> gösterir; ne kadar enerjinin geçtiğini, hangi maddenin döndüğünü ve popülasyonların nasıl değişeceğini anlamak için bu bağlantılara ayrı ölçüler ve modeller eklemek gerekir.",
  story: [
    "Bir gölü canlı adlarından oluşan bir liste gibi okuyabilirsin: algler, böcekler, balıklar. Raymond Lindeman farklı bir soru sordu: Bu canlı gruplarının üretimini <strong>aynı enerji diliyle</strong> ifade edersek aralarındaki ilişkiyi görebilir miyiz? Minnesota'daki Cedar Bog Lake araştırması, 1942'de <em>Ecology</em> dergisinde yayımlanan <em>The Trophic-Dynamic Aspect of Ecology</em> makalesine temel oldu. Bir balığın büyümesiyle bir bitkinin yeni dokusunu aynı bütçenin farklı yerlerine koymak, ekolojide enerji akışını incelemenin yolunu açtı.",
    "Bu yaklaşım ilk sunulduğunda hemen kabul görmedi. R. E. Cook'un 1977'de yayımladığı incelemeye göre hakemler, model için verileri yetersiz ve kuramsal yazıyı dergi için uygunsuz bulmuştu. G. Evelyn Hutchinson'ın editörle yazışmaları, kuramın değerini savunarak kabul sürecine katkı verdi. Bir modelin değeri, ölçüm gereksinimini ortadan kaldırmaz: ölçümle model birbirini sınar.",
    "Senin laboratuvarındaki çayır, Lindeman'ın gölünün verileri değildir. Sekiz canlı grubu ve on beslenme bağlantısı içeren bir öğretim örneğidir. İkinci sekmedeki dört düzeyli enerji zinciri de bu çizimden hesaplanmaz; ayrı bir modeldir. Önce okun yönünü, sonra aktarım oranını, en son da modelin cevaplayamadığı soruyu ayırdığında, bir besin ağı resmi araştırılabilir bir soruya dönüşür.",
  ],
  core: [
    {
      heading: "Ok, avcının baktığı yön değildir",
      body: "Bu sayfada <strong>kaynak → tüketici</strong> yazılır: Çekirge → Kurbağa, kurbağanın çekirgeyi yediği anlamına gelir. Bir besin zinciri tek bir yoldur; ağ, ortak düğümler paylaşan yolları birlikte tutar. Çizimdeki yüksek konum, trofik düzeyin ölçüsü değildir. Bir üreticiden hedefe ulaşan farklı düğüm dizilerini sayabilirsin; ortak bir ara düğümü paylaşan yollar bağımsız yedekler değildir. Sayfanın döngüsüz ağında bir tüketicinin kaynak yolu sayısı, doğrudan besinlerinin kaynak yolu sayılarının toplamıdır.",
      formula: "N(i) = ∑<sub>j → i</sub> N(j)",
      formulaNote: "Üreticide N = 1: sıfır kenarlı başlangıç yolu. Çıkarılmış düğümden geçen yol sayılmaz. Bu yineleme sayfanın döngüsüz ağı içindir; genel bir döngülü ağda ayrıca yol tanımı gerekir.",
    },
    {
      heading: "Stok ile üretim hızını ayır",
      body: "Bir çayırda bugün duran biyokütle bir <strong>stoktur</strong>; bir yılda yeni dokuya katılan enerji ise üretimdir. Fotosentezle bağlanan toplam enerjiden üreticilerin kendi solunumunu çıkardığında <strong>net birincil üretim</strong> kalır. Laboratuvarın P₀ kaydırıcısı bu net üretim hızını verir; gelen güneş ışığının kendisini veya bitkilerin toplam kütlesini vermez. Aynı alan ve aynı zaman aralığı üzerinden karşılaştırma yapmazsan aktarım oranı da anlamını yitirir.",
      formula: "P₀ = GPP − R<sub>üretici</sub>",
      formulaNote: "GPP brüt birincil üretim; R üreticilerin solunum enerji hızıdır. Burada üçü de kJ m⁻² yıl⁻¹ cinsindedir. Laboratuvarda GPP ve R ayrı ölçülmez; doğrudan P₀ seçilir.",
    },
    {
      heading: "Üç aktarım, üç çarpan",
      body: "<strong>Trofik aktarım verimi</strong>, sonraki düzeyin üretiminin önceki düzeyin üretimine oranıdır. Üç aktarım varsa üretime tek bir yüzde uygulamak yetmez: her aktarımın çarpanı bir sonrakinin girdisini küçültür. Hepsi %10 olduğunda 0,10³ = 0,001 kalır; bu <em>%0,1</em>'dir. %10 bir doğa sabiti değildir. Tüketilen pay, sindirilebilen pay ve metabolik kullanım gibi süreçler farklı gruplarda farklı sonuçlar verir.",
      formula: "P₃ = P₀ε₀ε₁ε₂<br>∂P₃/∂ε₁ = P₀ε₀ε₂",
      formulaNote: "ε değerlerini kesir olarak kullan: %20 = 0,20. Diğerleri sabitken bir verimi iki kat yapmak P₃'ü iki kat; üçünü birden iki kat yapmak sekiz kat yapar. Türev, bu modelde tek bir verime duyarlılığı verir.",
    },
    {
      heading: "Detritus bir çıkmaz sokak değildir",
      body: "Ölü yapraklar, dökülen dokular ve organik atıklar <strong>detritus</strong> yoluna katılır. Ayrıştırıcılar bu malzemeyi kullanır; bazı besin elementleri yeniden üreticilerin kullanabileceği biçimlere dönüşür. Madde bu yolla dönebilir, fakat ısı olarak çevreye dağılmış enerji fotosentezin girdisi yerine geçmez. İzlenen zincirde sonraki düzeyin üretimine katılmayan payı topluca hesaplamak, bunun ne kadarının hemen ısıya, ne kadarının detritusa gittiğini ölçmek değildir.",
      formula: "Lₖ = Pₖ − Pₖ₊₁<br>P₀ = L₀ + L₁ + L₂ + P₃",
      formulaNote: "Lₖ, zincirde sonraki düzeyin üretimine katılmayan toplam paydır. Sayfanın bütçesi bunun hangi süreçlere dağıldığını ayırmaz; Lₖ'nın tümüne solunum ya da ısı denemez.",
    },
    {
      heading: "Bir canlıya tek basamak yetmeyebilir",
      body: "Yılan fareyi yediği zincirde ikincil, kurbağayı yediği zincirde üçüncül tüketicidir. Üniversite ekolojisinde <strong>trofik konum</strong>, besinlerin konumlarını diyet paylarıyla ağırlıklandırarak tanımlanabilir. Üreticiye 1 verirsek fare 2, kurbağa 3 olur; diyeti yarı yarıya bu ikisinden oluşan bir yılanın konumu 1 + 0,5 × 2 + 0,5 × 3 = 3,5'tir. Bu örnekteki yarı yarıya paylar varsayımdır; çizimde iki ok görmek bu payları bilmek demek değildir.",
      formula: "τᵢ = 1 + ∑ⱼ dᵢⱼτⱼ<br>∑ⱼ dᵢⱼ = 1",
      formulaNote: "τ üreticiden itibaren trofik konum; dᵢⱼ, i tüketicisinin diyetindeki j kaynağının payıdır. Laboratuvar diyet payı ölçmediğinden böyle bir sayısal konum hesaplamaz.",
    },
  ],
  lab: {
    intro: "Üç sekme birbirinden farklı soruları araştırır. <strong>Besin ağını oku</strong>, yönlü bağlantıları ve yolları gösterir. <strong>Enerjiyi hesapla</strong>, varsaydığın üretim ve üç verimle ayrı bir zincirin bütçesini kurar. <strong>Bir düğümü çıkar</strong>, bir grubun çıkarılmasından sonra kaynak yolu kalıp kalmadığını sayar. Burada çıkan sayılar arazi ölçümü veya popülasyon tahmini değildir.",
    experiments: [
      {
        title: "İki yol nasıl üç bağlantı eder?",
        predict: "Kurbağaya iki üreticiden ulaşılabiliyorsa iki yol toplam dört farklı bağlantı mı içerir? Baykuşa giden bütün yolları seçmek ağın tamamını aydınlatır mı?",
        do: "Besin ağını oku sekmesinde Ağı sıfırla'ya bas. Canlı grubu Kurbağa iken İzlenecek ilişkiler menüsünü önce Doğrudan besinleri, sonra Doğrudan tüketicileri ve Üreticilerden gelen yollar yap. Son olarak Baykuşa giden yollar'a bas.",
        observe: "İlk iki görünümde sırasıyla Çekirge → Kurbağa ve Kurbağa → Yılan görünür; her biri 1 bağlantıdır. Kurbağaya üreticilerden 2 yol gelir, ama Seçili bağlantı 3 olur: iki yol Çekirge → Kurbağa kenarını paylaşır. Baykuş için 4 yol ve 8 farklı bağlantı seçilir; tavşana giden iki bağlantı seçilmez.",
        explain: "Yol sayısı ile kenar sayısı farklı niceliklerdir. Bir oku iki farklı yol kullanabilir. Seçim, bağlantıları ok yönünde izler; ağın herhangi bir biçimde birbirine bağlı olması her grubun baykuşa besin yolu sunduğu anlamına gelmez.",
      },
      {
        title: "Yüzdeyi ikiye katla; sonucu tahmin et",
        predict: "Üç aktarımın verimini birden %10'dan %20'ye çıkarırsan son düzey üretimi iki kat mı, altı kat mı, sekiz kat mı olur?",
        do: "Enerjiyi hesapla sekmesinde Enerjiyi sıfırla'ya bas. P₀ = 10.000 ve üç aktarım %10 iken tabloyu oku. Üçü de %20'ye basıp son düzey üretimini ve birleşik aktarımı karşılaştır.",
        observe: "Başlangıç üretimleri 10.000 → 1.000 → 100 → 10 kJ m⁻² yıl⁻¹; birleşik aktarım %0,1 ve üreticiye oranı 1 / 1.000. Üçü %20 olduğunda 10.000 → 2.000 → 400 → 80; birleşik aktarım %0,8 ve oran 1 / 125. Son değer sekiz katına çıkar.",
        explain: "P₃ üç verimin çarpımına bağlıdır: 2 × 2 × 2 = 8. İlk bütçe 10.000 = 9.000 + 900 + 90 + 10 biçiminde kapanır; ikinci bütçe 10.000 = 8.000 + 1.600 + 320 + 80 olur. Dışarıda kalan payın hangi süreçlere dağıldığını bu tablo söylemez.",
      },
      {
        title: "Kaynağı büyütmek, verimi büyütmek mi?",
        predict: "Üreticilerin net üretimi iki katına çıkarken aktarım oranları aynı kalırsa, son düzeyin mutlak üretimi ve üreticiye oranı nasıl değişir?",
        do: "Enerjiyi sıfırla'ya bas. Üç verim %10 kalırken Net birincil üretim P₀ kaydırıcısını 20.000 yap. Sonra P₀'ı 1.000'e, üç verimi de %1'e indir; grafiğin yanındaki sayıyı oku.",
        observe: "P₀ = 20.000 için son düzey 20 kJ m⁻² yıl⁻¹ olur: iki kat üretim, yine %0,1 aktarım ve 1 / 1.000 oranı. En küçük ayarlarda üretimler 1.000; 10; 0,1; 0,001 kJ m⁻² yıl⁻¹'dir. Birleşik aktarım %0,0001'dir; son çubuk görünmeyecek kadar kısa olsa da değer sıfır değildir.",
        explain: "P₀ mutlak ölçeği, ε çarpımı göreli oranı belirler. Bir grafikte pikselden küçük kalan değer ile matematikte sıfır aynı şey değildir. Düşük değerden kaç bireyin yaşayabileceği de çıkmaz; bunun için bireylerin gereksinimleri ve başka süreçler gerekir.",
      },
      {
        title: "Aynı yol sayısı, farklı kırılma",
        predict: "Çekirgeyi veya fareyi çıkardıktan sonra baykuşa ikişer yol kalırsa iki müdahale ağın geri kalanı için de eşdeğer midir?",
        do: "Bir düğümü çıkar sekmesinde Karşılaştırmayı sıfırla'ya bas. Hedef Baykuş iken önce Çekirgeyi çıkar, sonra Fareyi çıkar düğmelerini dene. Kaynağa erişim tablosunda Kurbağa satırını özellikle karşılaştır.",
        observe: "Başlangıçta 8 grubun 8'inin kaynak yolu vardır; baykuşa 4 yol gelir. Çekirge çıkarılınca 7 grup kalır: 6'sının yolu vardır, yalnız kurbağanın yolu kalmaz; baykuşa fare üzerinden 2 yol kalır. Fare çıkarılınca kalan 7 grubun da yolu vardır; baykuşa yine 2 yol gelir, bu kez iki üreticiden çekirge–kurbağa–yılan üzerinden.",
        explain: "Baykuşun yol sayısı iki durumda aynı, diğer düğümlerin durumu farklıdır. Ayrıca iki yol ortak düğümler taşıdığı için tam bağımsız değildir. Yolu olan bir grup için yeterli enerji garanti edilmez; yolu olmayan kurbağa da program tarafından yok olmuş sayılmaz. Gerçek popülasyon sonucu için bu modelde bulunmayan hızlar ve alternatif beslenme ilişkileri gerekir.",
      },
    ],
  },
  wow: [
    {
      title: "Biyokütle piramidi ters durabilir",
      body: "OpenStax'ın Manş Denizi örneğinde fitoplankton biyokütlesi 4 g/m², onu tüketen zooplanktonunki 21 g/m²'dir. Bu bir enerji yaratma makinesi değildir: küçük üretici stoku hızlı yenilenerek daha büyük tüketici stokunu besleyebilir. Bir anın fotoğrafı ile bir yıl boyunca üretileni birbirine karıştırma.",
    },
    {
      title: "Üç küçük iyileştirme, sekiz kat sonuç",
      body: "Laboratuvarın üç aktarımında %10 yerine %20 kullanmak, son düzeyin üretimini 10'dan 80 kJ m⁻² yıl⁻¹'e çıkarır. Tek tek her çarpan yalnız iki katına çıkmıştır; birlikte 2³ = 8 ederler. Bu hesap belirli bir ekosistem için iyileştirme önerisi değildir; çarpımsal bir modelde değişimlerin nasıl biriktiğini gösterir.",
    },
    {
      title: "Dört yol, dört bağımsız güvence değil",
      body: "Bu ağda baykuşa dört üretici yolu vardır. İkisi tarla faresinden, diğer ikisi çekirge–kurbağa–yılan kolundan geçer. Dört yolun her birini ayrı bir güvence sanırsan ortak düğümlerdeki kırılganlığı gözden kaçırırsın. Yol sayısını bir dayanıklılık puanına çevirmek için bağlantıların ortaklığını ve taşıdığı miktarı da incelemek gerekir.",
    },
  ],
  worked: {
    title: "Bir hektarın üretim bütçesi",
    prompt: "Varsayımsal bir alanda net birincil üretim P₀ = 12.000 kJ m⁻² yıl⁻¹, üç aktarım verimi sırasıyla %20, %15 ve %10 olsun. Üçüncül tüketicilerin üretimi, 1 hektarda bir yılda kaç MJ eder? Aynı verimlerle P₃ = 60 kJ m⁻² yıl⁻¹ için gereken P₀ nedir?",
    steps: [
      "Yüzdeleri kesre çevir: ε₀ = 0,20; ε₁ = 0,15; ε₂ = 0,10. Birleşik verim 0,003, yani %0,3'tür.",
      "Ardışık üretimler P₁ = 12.000 × 0,20 = 2.400; P₂ = 2.400 × 0,15 = 360; P₃ = 360 × 0,10 = 36 kJ m⁻² yıl⁻¹. Dışarıda kalan paylar 9.600, 2.040 ve 324'tür; 9.600 + 2.040 + 324 + 36 = 12.000 ile bütçeyi kontrol et.",
      "1 hektar = 10.000 m². Bir yıldaki son düzey üretimi 36 kJ m⁻² yıl⁻¹ × 10.000 m² × 1 yıl = 360.000 kJ = 360 MJ. Alan ve zaman birimleri çarpımda sadeleşir.",
      "Ters soruda P₀ = P₃/(ε₀ε₁ε₂) = 60/0,003 = 20.000 kJ m⁻² yıl⁻¹. Verimler sabit tutulduğu için hedefi büyütmenin burada yalnız kaynak ölçeğini büyüttüğünü gör.",
      "Bu değerleri Enerjiyi hesapla sekmesinde deneyebilirsin: P₀ için 12.000 ve 20.000; verimler %20, %15, %10. Son üretimler 36 ve 60 çıkar. Bu enerji hızlarından doğrudan hayvan sayısı veya mevcut biyokütle hesaplanmaz.",
    ],
    result: "Verilen koşullarda bir hektarda bir yıllık üçüncül tüketici üretimi 360 MJ'dür. P₃ = 60 kJ m⁻² yıl⁻¹ hedefi için aynı modelde P₀ = 20.000 kJ m⁻² yıl⁻¹ gerekir.",
  },
  misconceptions: [
    { myth: "Besin ağındaki ok, avcıdan avına gider.", truth: "Bu sayfanın okları besin kaynağından onu tüketene gider. Kurbağa → Yılan, yılanın kurbağayı yediğini anlatır. Başka bir diyagramı okurken önce ok geleneğini kontrol et." },
    { myth: "Her aktarımda enerjinin tam %10'u geçer; kalanın hepsi hemen ısı olur.", truth: "Aktarım verimi ölçülen koşullara bağlıdır; %10 burada bir başlangıç varsayımıdır. Sonraki düzeyin üretimine girmeyen pay, solunumun yanında yenmeyen biyokütle, atıklar ve detrital yolları da kapsayabilir." },
    { myth: "Ayrıştırıcılar enerjiyi bitkilere geri vererek döngüyü kapatır.", truth: "Ayrıştırıcılar bazı elementlerin yeniden kullanılabilir biçimlere dönüşmesine katkı verir. Bu madde döngüsüdür. Çevreye dağılmış ısı, bitkilerin fotosentez için gereksindiği yeni ışık girişinin yerini tutmaz." },
    { myth: "Bir gruba üreticiden yol kalıyorsa popülasyonu kesin yaşar; yol kalmadıysa kesin tükenir.", truth: "Erişilebilirlik yalnız çizilmiş bağlantılara ilişkin bir sonuçtur. Enerji miktarı, nüfus, diyet değişimi ve eksik ilişkiler bilinmeden hayatta kalma veya tükenme kararı verilemez." },
  ],
  glossary: [
    { term: "Besin ağı", definition: "Canlı grupları arasındaki birden çok beslenme ilişkisini birlikte gösteren yönlü bağlantı modelidir." },
    { term: "Trofik düzey", definition: "Üreticiden başlayarak bir besin zincirindeki beslenme basamağıdır." },
    { term: "Net birincil üretim", definition: "Üreticilerin bağladığı enerjiden kendi solunumları çıkarılınca yeni organik madde üretiminde kalan miktarın belirli alan ve zamana göre ifadesidir." },
    { term: "Aktarım verimi", definition: "Aynı alan ve zaman ölçeğinde sonraki trofik düzeyin üretiminin önceki düzeyin üretimine oranıdır." },
    { term: "Biyokütle", definition: "Belirli bir anda tanımlı bir alandaki canlı madde kütlesidir; üretim hızıyla aynı nicelik değildir." },
    { term: "Detritus", definition: "Ölü organizma parçaları ve organik atıklar gibi canlı olmayan organik malzemedir." },
    { term: "Erişilebilirlik", definition: "Bir başlangıç düğümünden hedefe okların yönünde ilerleyen en az bir yol bulunmasıdır." },
    { term: "Trofik konum", definition: "Bir tüketicinin besin kaynaklarını diyet paylarıyla ağırlıklandırarak üreticilere göre konumunu ifade eden ölçüdür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Genel Ekoloji</strong> ve <strong>Ekosistem Ekolojisi</strong> derslerinde bu bütçeye ölçüm belirsizliği, mevsimsellik, detrital akış ve birden çok alan eklenir. P₃ = P₀ε₀ε₁ε₂ için logaritma almak, ln P₃ = ln P₀ + ln ε₀ + ln ε₁ + ln ε₂ verir. Küçük bağıl değişimlerde ΔP₃/P₃ ≈ ΔP₀/P₀ + Δε₀/ε₀ + Δε₁/ε₁ + Δε₂/ε₂ olur; örneğin tek bir verimdeki küçük %5 bağıl artış, diğerleri sabitken son üretimi de yaklaşık %5 artırır. Buradaki bağıl yüzde ile yüzde puanını ayır: %10'dan %15'e çıkış, 5 yüzde puanı ama %50 bağıl artıştır.",
      "<strong>Çizge Teorisi</strong> kaynak yolunu; <strong>Matematiksel Biyoloji</strong> ise zaman içindeki değişimi incelemeye yardım eder. Nüfus dinamiği için dN/dt = doğum − ölüm + göç gibi bir bütçeye, tüketim ve üremenin hangi değişkenlere bağlı olduğuna ihtiyaç vardır. Bu sayfanın düğüm silme deneyi böyle bir diferansiyel denklem çözmez. Birbirinden ayrı bu soruları aynı modelden cevaplamaya zorlamamak, model kurmanın temel becerilerindendir.",
    ],
    topics: ["Ekosistem ekolojisi", "Üretim ve stok ölçümleri", "Trofik konum", "Yönlü çizgeler", "Duyarlılık analizi", "Popülasyon dinamiği"],
  },
  quiz: [
    {
      question: "P₀ = 10.000 kJ m⁻² yıl⁻¹ iken üç aktarım sırasıyla %10, %20 ve %10. Son düzey üretimi kaçtır?",
      options: ["2.000 kJ m⁻² yıl⁻¹", "200 kJ m⁻² yıl⁻¹", "20 kJ m⁻² yıl⁻¹", "2 kJ m⁻² yıl⁻¹"],
      answer: 2,
      explanation: "10.000 × 0,10 × 0,20 × 0,10 = 20. Her çarpan bir önceki düzeyin üretimine uygulanır. Birleşik verim 0,002 = %0,2'dir; yüzdeleri toplamak veya yalnız sonuncuyu kullanmak yanlış olur.",
    },
    {
      question: "Bir canlı grubu çıkarıldıktan sonra baykuşa hâlâ iki üretici yolu kalıyor. Bu modelden hangi sonuç çıkar?",
      options: ["Baykuşların popülasyonu kesin artar.", "Çizilmiş ilişkiler içinde en az bir kaynak yolu sürer; yeterli enerji ve nüfus sonucu henüz bilinmez.", "Baykuşların besin enerjisi başlangıcın tam yarısına iner.", "Kalan iki yol mutlaka birbirinden bağımsızdır."],
      answer: 1,
      explanation: "Yol sayısı miktar değildir. Yollar ortak bir düğümden geçebilir; bağlantıların tüketim hızları bilinmez. Çizge erişilebilirliği gösterir, popülasyonun tepkisini hesaplamaz.",
    },
    {
      question: "Bir bölgede üreticilerin anlık biyokütlesi tüketicilerinkinden az ölçülüyor. Enerji korunumu bununla çelişir mi?",
      options: ["Evet; üretici kütlesi her an bütün tüketicilerin toplamından büyük olmalıdır.", "Evet; bu ancak ayrıştırıcıların ısıyı tekrar besine dönüştürmesiyle mümkündür.", "Hayır; çünkü canlılar gerektiğinde enerji yaratabilir.", "Hayır; üreticiler hızla yenileniyorsa küçük bir anlık stok, zaman boyunca daha büyük bir üretim akışı sağlayabilir."],
      answer: 3,
      explanation: "Biyokütle bir anın stoku, üretim ise zaman içindeki akıştır. Hızla çoğalan ve yenilen fitoplanktonlar ters biyokütle piramidi oluşturabilir. Bu, enerjinin yoktan yaratıldığı veya zincirde verimin birden büyük olduğu anlamına gelmez.",
    },
  ],
  next: [
    { href: "fotosentez-solunum.html", title: "Fotosentez ve Hücresel Solunum", why: "Ağın girişindeki ışığın nasıl kimyasal enerjiye çevrildiğini ve solunumda ne olduğunu molekül ölçeğinde izle." },
    { href: "av-avci-lotka-volterra.html", title: "Av–Avcı Laboratuvarı", why: "Kaynak yolu sorusundan nüfusun zaman içinde değişmesine geç; denklemlerin ve varsayımların neden değiştiğini gör." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi", why: "Düğümleri, yönlü yolları ve ortak bağlantıları matematik diliyle incele." },
    { href: "termodinamik.html", title: "Termodinamik", why: "Enerji korunurken işe dönüştürülebilirliğin neden azaldığını ısı, iş ve entropiyle ilişkilendir." },
  ],
  sources: [
    { title: "OpenStax Biology 2e · Ecology of Ecosystems", url: "https://openstax.org/books/biology-2e/pages/46-1-ecology-of-ecosystems", note: "Besin zincirleri ve ağlar; farklı ekosistem modellerinin hangi soruları cevapladığı." },
    { title: "OpenStax Biology 2e · Energy Flow through Ecosystems", url: "https://openstax.org/books/biology-2e/pages/46-2-energy-flow-through-ecosystems", note: "Üretim, trofik aktarım verimi ve biyokütle piramitleri. Manş Denizi örneğinin kaynağı; laboratuvarın sayıları ise varsayımsal model hesaplarıdır." },
    { title: "OpenStax Biology 2e · Biogeochemical Cycles", url: "https://openstax.org/books/biology-2e/pages/46-3-biogeochemical-cycles", note: "Enerjinin yönlü akışı ile elementlerin biyolojik ve jeolojik yollarla döngüsü arasındaki ayrım." },
    { title: "R. E. Cook · Raymond Lindeman and the Trophic-Dynamic Concept in Ecology (1977)", url: "https://pubmed.ncbi.nlm.nih.gov/17741875/", note: "Science 198:22–26; Lindeman'ın makalesinin ilk reddi ve Hutchinson'ın katkısı üzerine tarihsel araştırmanın PubMed kaydı. Özgün Lindeman makalesi: Ecology 23:399–417 (1942), DOI 10.2307/1930126." },
  ],
  revision: "Kasım 2026",
};
