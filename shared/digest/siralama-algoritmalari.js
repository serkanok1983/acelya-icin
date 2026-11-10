window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["siralama-algoritmalari"] = {
  slug: "siralama-algoritmalari",
  title: "Sıralama: Sonucun Sakladığı Bilgi",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 30,
  tagline: "1, 2, 2 doğru sıralanmış olabilir; peki iki tane 2 yer değiştirdi mi? Kayıt kimlikleriyle kararlılığı, tur sınırlarıyla doğruluğu ve tersliklerle yapılan işi ölç.",
  hook: "Aynı notu alan iki öğrenciyi notlarına göre sıraladın. Başlangıçta önce gelen öğrenci, sonuçta arkadaşının arkasına geçti. Sayılar doğru sırada; kaybolan bilgi ne? Üç kayıtlık 2A, 2B, 1C örneği bu farkı görünür kılıyor.",
  bigIdea: "Bir sıralamanın doğruluğu kayıtları koruyup anahtarları sıraya koymasıdır; kararlılığı ise eşit anahtarların geçmişteki göreli sırasını da korumasıdır.",
  story: [
    "Bir telefon rehberinde yalnız soyadı yoktur: ad, numara ve başka alanlar aynı kayda bağlıdır. MIT'nin 2011 tarihli 6.006 dersinin sıralama sunumu rehber düzenlemeyi örnek verir; aynı ders sıralamayı, girdinin küçükten büyüğe dizilmiş bir permütasyonunu üretmek olarak tanımlar. Yeni bir sayı listesi yazmak yetmez; özgün kayıtlar eksilmemeli veya çoğalmamalıdır.",
    "Bu laboratuvarda yükseklik anahtar, harf kayıt kimliğidir. NIST'in algoritma sözlüğündeki önemli ayrım da burada belirir: seçmeli sıralama, minimumu uzaktan takasla yerine getirince kararsızdır; aradaki kayıtları kaydırarak yerleştiren başka bir sürüm kararlı olabilir. Algoritmanın adı kadar, uygulanan adımın ayrıntısı da önemlidir. Burada üç yöntemi aynı kayıtların üzerinde durdurup geriye alabilirsin."
  ],
  core: [
    { heading: "Anahtar ile kayıt aynı şey değildir", body: "<strong>Anahtar</strong>, kıyaslanan değerdir; kayıt kimliği o değerin hangi özgün öğeye ait olduğunu söyler. Doğru sonuç iki şartı birlikte sağlar: anahtarlar azalmayan sıradadır ve her özgün kayıt tam bir kez bulunur. Sayfadaki üç sürüm yalnız takas yaptığı için bütün ara kareler de aynı kayıtların bir permütasyonudur.", formula: "a₀ ≤ a₁ ≤ … ≤ aₙ₋₁", formulaNote: "Bu eşitsizlik tek başına yeterli değildir; kayıtların korunması da gerekir. İndisler 0'dan başlar." },
    { heading: "Eşitler birbirini geçebilir mi?", body: "<strong>Kararlılık</strong>, eşit anahtarlı kayıtların başlangıçtaki göreli sırasının korunmasıdır. Kabarcık ve buradaki komşu takaslı eklemeli, yalnız soldaki anahtar büyükse takaslar. Eşit iki kayıt birbirini komşu takasıyla geçemez. Seçmeli ise küçük bir kaydı uzaktan takas ederken aradaki eşitlerin sırasını bozabilir.", formula: "key(A) = key(B), başlangıçta A önce<br>Kararlı sonuçta da A önce", formulaNote: "Sonuç kartı yalnız mevcut girdiyi sınar. Tek başarılı örnek bütün girdiler için kararlılık kanıtı değildir." },
    { heading: "Tur biterken ne garanti edilir?", body: "<strong>Döngü değişmezi</strong>, belirli döngü sınırlarında doğru kalan önermedir. Kabarcıkta sağ son ek, seçmelide sol önek nihai yerindedir. Eklemelide sol önek yalnız kendi içinde sıralıdır; sonra gelen küçük kayıt onu kaydırabilir. Doğruluk kanıtı başlangıcı, her turda korunmayı ve döngü sonunda bütün diziyi kapsamasını ayrı ayrı gösterir.", formula: "Başlangıç → korunma → bitiş", formulaNote: "Mor bölümün anlamını yanındaki açıklama belirler. Eklemelide 'sıralı' ile 'son yerinde' aynı iddia değildir." },
    { heading: "Bir kare, bir işlem değildir", body: "<strong>C</strong> yalnız anahtar karşılaştırmalarını, <strong>W</strong> ana diziye yazmaları sayar. Bir gerçek takas W'ye 2 ekler; tur sonu açıklaması yeni görüntü üretip hiçbir karşılaştırma yapmayabilir. İndis denetimleri, çizim ve geçici değişkenler bu sayaçlara dahil değildir. Görüntü hızını değiştirmek C veya W'yi değiştirmez.", formula: "W = 2 × takas sayısı", formulaNote: "Bu sayfadaki üç takaslı sürüm için geçerli; kaydırmalı ekleme veya tamponlu birleştirme için farklı sayım gerekir." },
    { heading: "Düzensizliği çiftlerle ölç", body: "<strong>Terslik</strong>, i&lt;j iken aᵢ&gt;aⱼ olan çifttir; eşitler terslik sayılmaz. Sırası yanlış iki komşuyu takas etmek tam bir tersliği yok eder, diğer çiftlerin toplamını değiştirmez. Bu nedenle kabarcık ve komşu takaslı eklemelinin toplam takası başlangıç terslik sayısına eşittir. Bu, bütün karşılaştırmaların takasla sonuçlandığı anlamına gelmez.", formula: "I = #{(i,j): i&lt;j ve aᵢ&gt;aⱼ}<br>W = 2I<br>Azalan farklı anahtarlarda I = n(n−1)/2", formulaNote: "I boyutsuz bir çift sayısıdır. Uzaktan takas yapan seçmeli için bir takas birden fazla tersliği giderebilir." }
  ],
  lab: {
    intro: "Algoritma menüsü girdiyi korur. Hazır örnek, Girdi düzeni ve Kayıt sayısı n girdiyi belirler; Sona git kesin son sayaçları açar. Tek adım, Önceki ve Görüntü adımı kaydırıcısı ara kayıtları inceletir. Başa al aynı deneyi yeniden başlatır.",
    experiments: [
      { title: "Üç kayıtla kararlılığı çürüt", predict: "2A ile 2B aynı yüksekliğe sahip. 1C sola taşınınca hangi yöntem onların sırasını bozacak?", do: "2A, 2B, 1C örneği düğmesine bas. Sırayla Kabarcık, Seçmeli ve Eklemeli seç; her seçimden sonra Sona git. Alttaki Şimdi sütununu ve iki sayacı oku.", observe: "Kabarcık ve Eklemeli: 1C, 2A, 2B; C=3, W=4. Seçmeli: 1C, 2B, 2A; C=3, W=2. Üç sonuç da anahtara göre sıralı, yalnız seçmelide eşitlerin sırası bozuldu.", explain: "Seçmeli ilk turda 1C ile 2A'yı uzaktan takas eder; 2A, 2B'nin arkasına düşer. Tek karşı örnek kararlılık iddiasını çürütür. Daha az yazma bu örnekte mümkündür, fakat bunun karşılığında hangi bilginin korunmadığını da görürsün." },
      { title: "Zaten sıralı olmak kime yarar?", predict: "Sekiz kayıt zaten artıyorsa üç yöntem de hemen durabilir mi?", do: "Girdi düzeni Artan, Kayıt sayısı n=8 olsun. Her algoritmada Sona git. Sonra Başa al; Görüntü adımı/saniye değerini değiştirip aynı sonuca yeniden git.", observe: "Kabarcık ve Eklemeli C=7, W=0; Seçmeli C=28, W=0. Görüntü hızı son sayaçları değiştirmez.", explain: "Kabarcık tek takassız turla durur. Eklemeli her yeni kaydı öneğin sonuyla bir kez kıyaslar. Seçmeli, kalan minimumu aramayı sürdürür: 7+6+…+1=28. Sıfır yazma, sıfır çalışma demek değildir." },
      { title: "Terslikler yazma sayısını söylesin", predict: "Azalan sekiz kayıt için kaç yanlış sıralı çift var? n iki katına çıktığında bu sayı tam dört kat mı olur?", do: "Azalan girdide n=8 ve Eklemeli seç; Sona git. Ardından n=16 ile tekrarla. Kabarcık seçerek aynı sayaçları kontrol et.", observe: "n=8 için C=28, W=56; n=16 için C=120, W=240. Karşılaştırma ve yazma oranı 120/28≈4,286; tam 4 değil.", explain: "Her çift terstir: I=n(n−1)/2. Bu girdide her karşılaştırma bir komşu takasını tetikler. n²'nin katsayısı büyümeyi belirler; −n terimi sonlu boyuttaki oranı dört değerinden ayırır. Oran büyük n'de dörde yaklaşır." },
      { title: "Mor bölüm bir söz veriyor", predict: "İlk iki 2 kendi içinde sıralıysa artık yerlerinden oynamayacaklarını söyleyebilir misin?", do: "Hazır üçlü örneği aç; Eklemeli seç. Tek adım ile ilk tur sonuna, Görüntü adımı 2'ye gel. Sonra Sona git. Aynı örnekte Kabarcık seçip ilk tur sonu olan görüntü 4'ü incele.", observe: "Eklemelide ilk tur sonunda önek 2A,2B sıralıdır; sonuçta ikisi de sağa kayar. Kabarcığın ilk tur sonunda sağdaki 2B nihai yerindedir. Morun iki durumda farklı bir garantisi vardır.", explain: "Eklemeli yalnız işlenen öneğin iç düzenini korur; henüz okunmayan 1C daha küçüktür. Kabarcık bir tam taramayla kalan maksimumu sona taşımıştır. Yerel bir önermeyi bütün dizi hakkında daha güçlü bir önermeye çevirmemek, doğruluk kanıtının özüdür." }
    ]
  },
  wow: [
    { title: "Üç kayıt yeter", body: "2A,2B,1C örneği takaslı seçmelinin kararsızlığını kanıtlar. Bin başarılı örneğin kuramadığı evrensel garanti, tek başarısız örnekle çürütülebilir. Burada 3 karşılaştırma ve 1 takas sonucu görmeye yeter." },
    { title: "2.016 kıyas, en çok 63 takas", body: "n=64 için seçmeli her girdide 63+…+1=2.016 anahtar karşılaştırması yapar. Her turda en çok bir takas vardır: en çok 63 takas, 126 ana dizi yazması. Karşılaştırmayı ve yazmayı ayrı saymak algoritmaların farklı maliyetlerini açığa çıkarır." },
    { title: "Önce ikinci anahtar", body: "Üç kayıt düşün: Banu Demir, Cem Aras, Ada Demir. Önce ada göre sırala: Ada, Banu, Cem. Sonra soyada göre kararlı sırala: Cem Aras, Ada Demir, Banu Demir. İkinci geçiş aynı soyadı grubunda ilk geçişin ad sırasını korur. İki ayrı sıralamayla soyad–ad düzeni kurulabilir." }
  ],
  worked: {
    title: "Komşu takaslarının kesin hesabı",
    prompt: "8,7,…,1 dizisini bu sayfanın komşu takaslı Eklemeli yöntemiyle sırala. Karşılaştırma C ve ana dizi yazması W'yi döngüyü çalıştırmadan bul; ardından n=16 için ölçekleme oranını hesapla. Birimler işlem ve kayıt çiftidir, saniye değildir.",
    steps: [
      "n farklı anahtarın azalan dizisinde her i&lt;j çifti terstir. Çift sayısı I=8×7/2=28'dir.",
      "Yeni gelen her kayıt öneğin en küçüğüdür. Eklemelinin turları 1,2,…,7 karşılaştırma ve aynı sayıda komşu takası yapar: C=28.",
      "Her takas ana diziye iki kayıt yazar: W=2I=56. Sona git sonucundaki 28 ve 56 bu seçilmiş sayım sözleşmesini doğrular.",
      "n=16 için I=C=16×15/2=120 ve W=240. Oran 120/28=30/7≈4,286. Genel oran C(2n)/C(n)=2(2n−1)/(n−1), n büyüdükçe 4'e yaklaşır."
    ],
    result: "Sekiz kayıt 28 karşılaştırma ve 56 yazma; on altı kayıt 120 karşılaştırma ve 240 yazma gerektirir. Kesin toplam ile karesel büyüme aynı bilgiyi farklı ölçeklerde anlatır."
  },
  misconceptions: [
    { myth: "Doğru sıralanmış bir sonuç mutlaka kararlıdır.", truth: "Anahtarlar sıralı olsa bile eşit anahtarların kimlik sırası değişebilir. 1C,2B,2A doğru sıralıdır; 2A,2B,1C girdisinin kararlı sonucu değildir." },
    { myth: "Bir örnekte sıra korunuyorsa algoritma kararlıdır.", truth: "Sonuç kartı mevcut girdiyi değerlendirir. Evrensel kararlılık için bütün geçerli girdileri kapsayan gerekçe gerekir; eşitlerin komşu takasında geçememesi böyle bir gerekçedir." },
    { myth: "Mor kayıtlar her algoritmada nihai yerlerindedir.", truth: "Eklemelinin mor öneği yalnız kendi içinde sıralıdır. Sonradan işlenen küçük kayıt bu öneğin içine yerleşebilir." },
    { myth: "Görüntü adımı sayısı çalışma süresidir.", truth: "Kareler karşılaştırma, takas ve açıklama olaylarını içerir. Donanım, çizim ve programlama ayrıntıları ölçülmediği için bu sayaçlardan saniye sonucu çıkarılamaz." }
  ],
  glossary: [
    { term: "Anahtar", definition: "Bir kaydı sıralarken karşılaştırılan değer." },
    { term: "Permütasyon", definition: "Özgün öğeleri eksiltmeden veya çoğaltmadan yeniden sıralama." },
    { term: "Kararlılık", definition: "Eşit anahtarlı kayıtların başlangıçtaki göreli sırasını bütün geçerli girdilerde koruma özelliği." },
    { term: "Önek / son ek", definition: "Bir dizinin başından / sonundan alınan kesintisiz bölümü." },
    { term: "Döngü değişmezi", definition: "Döngünün belirtilen sınırlarında her yinelemede doğru olan önerme." },
    { term: "Terslik", definition: "i&lt;j olmasına rağmen soldaki anahtarın sağdakinden büyük olduğu kayıt çifti." },
    { term: "Sayım sözleşmesi", definition: "Hangi işlemin hangi sayaca kaç birim eklediğini belirleyen açık ölçüm modeli." }
  ],
  bridge: { heading: "Üniversiteye köprü", body: [
    "Algoritmalara Giriş ve Ayrık Matematik dersleri burada buluşur. Döngü değişmezi, matematiksel tümevarımın programdaki karşılığıdır: başlangıçta doğru olduğunu göster, bir tur doğruysa sonraki turda da doğru kaldığını kanıtla, bitişte hedef önermeyi çıkar. Kayıtların korunması ile anahtarların sıralanması ayrı yükümlülüklerdir.",
    "Algoritma Analizi'nde terslik sayısı bir ilerleme ölçüsüdür: negatif olamaz ve her yanlış komşu takası onu bir azaltır. Böylece yalnız sonlanma değil, kesin takas sayısı da elde edilir. Farklı bir uygulamaya geçerken bu hesabı yeniden kurmak gerekir; ikili arama karşılaştırmaları azaltabilir ama dizi içinde kayıt taşımanın maliyetini kendiliğinden ortadan kaldırmaz."
  ], topics: ["Tümevarım", "Döngü değişmezleri", "Algoritma doğruluğu", "Terslik sayısı", "En iyi ve en kötü durum", "Çok anahtarlı sıralama"] },
  quiz: [
    { question: "2A,2B,1C girdisinin hangi sonucu hem doğru hem kararlıdır?", options: ["1C,2B,2A", "1C,2A,2B", "2A,1C,2B", "1C,1C,2A"], answer: 1, explanation: "Anahtarlar artmalı, bütün kayıtlar korunmalı ve eşit 2'lerde A, B'den önce kalmalıdır. Diğer seçenekler bu üç koşuldan en az birini bozar." },
    { question: "Eklemelinin ilk turunda 2A,2B öneği sıralı. Henüz işlenmeyen 1C için ne söylenebilir?", options: ["Önek artık hiç değişmez", "1C öneğe girince iki 2 sağa kayabilir", "1C silinmelidir", "Bu durum algoritmanın hatalı olduğunu gösterir"], answer: 1, explanation: "Değişmez öneğin kendi içindeki sırasıdır; nihai konum sözü vermez. 1C başa yerleşince yine sıralı, bu kez üç kayıtlık bir önek oluşur." },
    { question: "Azalan 10 farklı kaydı komşu takaslı Eklemeli ile sıralarken kaç ana dizi yazması gerekir?", options: ["9 yazma", "45 yazma", "90 yazma", "100 yazma"], answer: 2, explanation: "10×9/2=45 terslik vardır. Her komşu takası bir tersliği yok edip iki ana dizi yazması yapar: W=90. Bu sayı geçici skaler atamaları içermez." }
  ],
  next: [
    { href: "siralama-yarisi.html", title: "Sıralama Yarışı: İş Sayacı", why: "Aynı girdide karşılaştırma, ana dizi ve tampon yazmalarının ayrı maliyetlerini karşılaştır." },
    { href: "algoritmalar.html", title: "Algoritmalar", why: "Adım, doğruluk ve çalışma maliyeti düşüncesini başka problemlere taşı." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Kaydı hangi yapıda tuttuğunun taşıma ve erişim maliyetini nasıl değiştirdiğini incele." }
  ],
  sources: [
    { title: "NIST DADS · Bubble sort", url: "https://xlinux.nist.gov/dads/HTML/bubblesort.html", note: "Komşu takası, takassız turda durma ve kararlılık. Deney sayaçları sayfanın belirli uygulamasından hesaplandı." },
    { title: "NIST DADS · Selection sort", url: "https://xlinux.nist.gov/dads/HTML/selectionSort.html", note: "Takaslı seçmelinin kararsızlığı; yerleştirmeli sürümle farkı." },
    { title: "MIT OCW 6.006 · Insertion sort, merge sort (2011)", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/mit6_006f11_lec03/", note: "Kayıt permütasyonu, komşu takaslı eklemeli, ters girdi ve karşılaştırma/taşıma ayrımı." }
  ],
  revision: "Kasım 2026"
};
