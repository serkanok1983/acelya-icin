window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kisilik-kuramlari"] = {
  "slug": "kisilik-kuramlari",
  "title": "Kişilik Kuramları ve Bireysel Farklar",
  "field": "Zihin ve Davranış",
  "level": "Lise–Lisans",
  "minutes": 35,
  "tagline": "Bir özellik kategori mi, boyut mu? Beş Faktör yaklaşımını ve kişilik kuramlarının farklı sorularını karşılaştır, sentetik ikiz korelasyonlarının ne anlattığını hesapla.",
  "hook": "Bir öğrenci sınıf sunumlarında rahat, yabancı bir grupta ise sessiz. Özellik ölçümünde bu gözlemler birlikte nasıl okunabilir?",
  "bigIdea": "Kişilik araştırması gözlenen farklılıkları, onları açıklamak için kurulan modellerden ve kişi hakkında verilen kararlardan ayrı değerlendirir.",
  "story": [
    "Araştırmacılar insanları tanımlayan sözcüklerin puanlarının birlikte nasıl değiştiğine bakabilir. Faktör analizi, çok sayıda ölçümdeki ortak değişimi daha az sayıda boyutla ifade etmeye çalışır. Beş Faktör yaklaşımı dışadönüklük, uyumluluk, sorumluluk, duygusal dengesizlik ve deneyime açıklık gibi sürekli boyutlar kullanır.",
    "Sosyal bilişsel yaklaşımlar beklentilerin, davranışın ve çevrenin karşılıklı etkisini ele alır. Psikodinamik yaklaşım çatışma ve ilişki örüntülerine, hümanistik yaklaşım öznel yaşantı ve benlik algısına bakabilir. Davranış genetiğinde ikiz korelasyonları bir örneklem içindeki farklılıkların kaynaklarına ilişkin sınırlı çıkarımlar sağlar."
  ],
  "core": [
    {
      "heading": "Puan bir boyut üzerindedir",
      "body": "Dışadönüklük puanı düşük veya yüksek olabilir, arada da çok sayıda değer bulunur. Birden çok durumdaki davranış veya bildirim kullanılabilir. Faktörün tekrarlanabilirliği, aracın dili ve örneklemi ayrı değerlendirilir."
    },
    {
      "heading": "ACE bileşenleri",
      "body": "Basit modelde A eklemeli genetik varyans, C paylaşılan çevreye bağlı varyans, E ise paylaşılmayan çevre ve ölçüm hatası kalanıdır. Bir yumurta ikizlerinde A + C, çift yumurta ikizlerinde 0,5A + C korelasyonu beklenir."
    },
    {
      "heading": "Varsayımlar ve sınır",
      "body": "İki ikiz grubunun ölçülen özelliğe ilişkin çevresel benzerliğinin uygun olduğu varsayılır. Örneklem, ölçüm hatası ve gen-çevre ilişkisi tahminleri değiştirebilir. Bir varyans oranı toplumdaki ve bağlamdaki farklılığı özetler."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "İki korelasyonu çıkar",
        "predict": "0,58 ve 0,34 girilince A kaç olur?",
        "do": "Tek yumurtayı 0,58, çift yumurtayı 0,34 seç.",
        "observe": "A yüzde 48, C yüzde 10, E yüzde 42 çıkar.",
        "explain": "İki eşitlikteki C çıkarılınca fark A’nın yarısıdır."
      },
      {
        "title": "Model dışı giriş",
        "predict": "Çift yumurta korelasyonu 0,15 olursa C ne olur?",
        "do": "Tek yumurtayı 0,58 bırak, çift yumurtayı 0,15’e indir.",
        "observe": "C eksi çıkar ve uyum uyarısı belirir.",
        "explain": "Negatif varyans bir model uyuşmazlığına işaret eder."
      },
      {
        "title": "Bir durumdan diğerine",
        "predict": "Tek bir sunumdan hangi kişilik ölçüsü çıkarılabilir?",
        "do": "Boyutsal ve sosyal bilişsel seçeneklerde ölçümleri karşılaştır.",
        "observe": "Birinde tipik dağılım, diğerinde durum değişimi ön plandadır.",
        "explain": "Bir kişi birçok durumun ölçümleriyle daha iyi betimlenir."
      }
    ]
  },
  "wow": [
    {
      "title": "Aynı değerin iki okuması",
      "body": "Korelasyon hem iki kişinin puanlarının ne kadar birlikte hareket ettiğini hem de ölçümlerin güvenilirliğini yansıtan bir istatistiktir."
    },
    {
      "title": "Kalanın anlamı",
      "body": "E bileşeni paylaşılmayan çevreyle birlikte ölçüm hatasını da içerir. Bu ikisini yalnız iki korelasyondan ayıramazsın."
    },
    {
      "title": "Özellikler bir arada",
      "body": "Bir kişi bir boyutta görece yüksek, diğerinde görece düşük olabilir. Beş puanı tek bir kutuya çevirmek ayrıntı kaybettirir."
    }
  ],
  "worked": {
    "title": "Eşit korelasyon",
    "prompt": "İki ikiz grubunun korelasyonu da 0,40 olsa sade ACE ne gösterir?",
    "steps": [
      "A = 2 × (0,40 − 0,40) = 0.",
      "C = 2 × 0,40 − 0,40 = 0,40 ve E = 1 − 0,40 = 0,60."
    ],
    "result": "Bu sentetik veride model A’yı 0 tahmin eder. Sonuç örneklem ve model koşullarına bağlıdır."
  },
  "misconceptions": [
    {
      "myth": "Kalıtılabilirlik, bir kişinin ne kadar genetik olduğunu söyler.",
      "truth": "Kalıtılabilirlik bir örneklemdeki varyansın varsayılan koşullarda hesaplanan oranıdır."
    },
    {
      "myth": "Kişilik boyutları insanları kesin tiplere ayırır.",
      "truth": "Özellik puanları süreklidir. Tip sınırları ek bir karar kuralı gerektirir."
    }
  ],
  "glossary": [
    {
      "term": "Faktör analizi",
      "definition": "Ölçümlerin birlikte değişmesini daha az sayıda örtük boyutla açıklayan yöntemler."
    },
    {
      "term": "Beş Faktör",
      "definition": "Kişilikle ilgili geniş ve sürekli beş boyutu betimleyen yaklaşım."
    },
    {
      "term": "Tek yumurta ikizi",
      "definition": "Aynı döllenmiş yumurtanın ayrılmasıyla gelişen ikizlerden biri."
    },
    {
      "term": "Paylaşılan çevre",
      "definition": "Modelde ikizlerin benzerliğine katkı veren genetik dışı etkiler."
    },
    {
      "term": "Kalıtılabilirlik",
      "definition": "Belli bir örneklemde fenotipik varyansın genetik farklarla ilişkili oranı."
    }
  ],
  "bridge": {
    "body": [
      "Korelasyon dersi iki puanın birlikte değişmesini gösterir. Psikometri dersindeki ölçüm hatası, bir ikiz modelinde çevreye ilişkin çıkarımlara doğrudan yansıyabilir."
    ],
    "topics": [
      "Korelasyon",
      "Psikometri",
      "İkiz tasarımı"
    ]
  },
  "quiz": [
    {
      "question": "Dışadönüklük puanı Beş Faktör yaklaşımında nedir?",
      "options": [
        "Sürekli bir boyut",
        "Bir tanı",
        "Sabit bir kategori"
      ],
      "answer": 0,
      "explanation": "Puanlar bir aralıkta yer alır, iki zorunlu kutuya ayrılmaz."
    },
    {
      "question": "Ölçüm hatası sade ACE’nin hangi bölümüne girer?",
      "options": [
        "A · Eklemeli genetik",
        "C · Paylaşılan çevre",
        "E · Kalan varyans"
      ],
      "answer": 2,
      "explanation": "E, ortak genetik ve çevresel etkenler çıkarıldıktan sonra kalan varyansı içerir."
    },
    {
      "question": "Tek yumurta korelasyonu 0,60, çift yumurta 0,40 ise A kaçtır?",
      "options": [
        "0,20",
        "0,40",
        "0,60"
      ],
      "answer": 1,
      "explanation": "A = 2 × (0,60 − 0,40) = 0,40 olarak hesaplanır."
    }
  ],
  "next": [
    {
      "href": "psikometri-ve-olcme.html",
      "title": "Psikometri: Güvenirlik, Geçerlik, Faktör Analizi, Madde Tepki Kuramı, Normlar",
      "why": "Puanların ölçüm hatası ve geçerliğini incele"
    },
    {
      "href": "regresyon-ve-korelasyon.html",
      "title": "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik",
      "why": "Korelasyonun neyi ölçtüğünü ve sınırlarını gör"
    }
  ],
  "sources": [
    {
      "title": "L. R. Goldberg, An Alternative Description of Personality (1990)",
      "url": "https://projects.ori.org/lrg/pdfs_papers/goldberg.big-five-factorsstructure.jpsp.1990.pdf",
      "note": "Sözcüklerden beş boyuta giden araştırma."
    },
    {
      "title": "H. H. M. Maes ve çalışma arkadaşları, Genetic and Environmental Variation in Continuous Phenotypes",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9823057/",
      "note": "Birincil ikiz araştırmasında ACE ve Falconer yaklaşımı."
    },
    {
      "title": "OpenStax, Learning Approaches",
      "url": "https://openstax.org/books/psychology-2e/pages/11-4-learning-approaches",
      "note": "Sosyal bilişsel ve öğrenme odaklı kişilik yaklaşımları."
    }
  ],
  "revision": "Kasım 2026"
};
