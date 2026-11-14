window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kalite-kontrol-ve-istatistiksel-surec-kontrolu"] = {
  "slug": "kalite-kontrol-ve-istatistiksel-surec-kontrolu",
  "title": "Süreç Sinyali ve Ürün Şartnamesi",
  "field": "Mühendislik",
  "level": "Lise–Lisans",
  "minutes": 24,
  "tagline": "Bir üretim dizisinde normal değişkenliği, ortalama kaymasını ve şartname dışına çıkmayı ayrı ayrı okuyun.",
  "hook": "Boyu şartnameye uyan bir parçanın ölçümü neden alarm verebilir? Kontrol grafiği o parçanın kullanılabilirliğinin ötesinde, ölçümü üreten sürecin geçmişine bakar.",
  "bigIdea": "Kontrol limiti süreçten, şartname sınırı üründen gelir. İkisi iki farklı soruya yanıt verir.",
  "story": [
    "Üretim tezgâhı zaman içinde aynı ayarda kalsa bile ölçüler az çok değişir. Ölçüm dizisindeki bir kayma takımın değiştiğini düşündürebilir. Bir kontrol sinyali, nedenin araştırılması için bir işarettir. Sinyalin kaynağını veri tek başına söylemez.",
    "Ürün şartnamesi tasarım gereksiniminden gelir. Çok geniş bir şartnamede tüm parçalar kabul edilebilirken bir ayar kayması görülebilir. Çok dar bir şartnamede ise süreç istikrarlı biçimde çalışıp bazı parçalar şartnameyi aşabilir."
  ],
  "core": [
    {
      "heading": "Hareketli aralık",
      "body": "Ardışık iki tekil ölçümün mutlak farkını alırız. Başlangıç verisindeki bu farkların ortalaması, ardışık ölçümler uygun koşullardaysa süreç içi yayılımı kestirmek için kullanılabilir.",
      "formula": "MR<sub>i</sub> = |x<sub>i</sub> − x<sub>i−1</sub>|"
    },
    {
      "heading": "Bireysel kontrol grafiği",
      "body": "Başlangıç ortalamasının çevresine üç tahmini standart sapmalı sınır koyarız. Yeni ölçümleri aynı sınırla kıyaslamak, kayan sürecin kendi kendine yeni bir normal çizmesini önler.",
      "formula": "σ ≈ MR<sub>ort</sub>/1,128"
    },
    {
      "heading": "Yeterlilik ve merkezlenme",
      "body": "Cp şartname genişliğinin yayılıma oranıdır. Cpk, en yakın şartnameye olan uzaklığı kullanır. Süreç merkezdeyse eşittirler. Durağanlık ve dağılım varsayımları incelenmeden bu sayıdan kusur oranı çıkarılamaz."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Ürün uygun, grafik uyarıyor",
        "predict": "Ortalama kayması bir parçayı şartname dışına çıkarmadan grafik sinyali yaratabilir mi?",
        "do": "İkinci seride ortalama kayması'nı 0,55 mm, Şartname yarı genişliği'ni 0,80 mm yapın.",
        "observe": "İzleme döneminde kontrol sinyali vardır. Şartname dışı kutusu 0 / 8 gösterir.",
        "explain": "İzleme ölçümleri, şartnamenin üst sınırına ulaşmadan süreçten öğrenilen üst kontrol limitini aşabilir."
      },
      {
        "title": "Şartnameyi daralt",
        "predict": "Çizim toleransı değişirse başlangıçtaki süreç tahmini değişir mi?",
        "do": "Ortalama kaymasını 0 yapın. Şartname yarı genişliği'ni 0,80 mm'den 0,15 mm'ye indirin.",
        "observe": "Kontrol limitleri sabit kalır. Başlangıç Cp ve Cpk değerleri küçülür.",
        "explain": "Hareketli aralık aynı veriyle hesaplanır. Yeterlilik sayısı ise şartnamenin genişliğini de içerir."
      },
      {
        "title": "İki yönlü değişim",
        "predict": "Kontrol grafiği yalnız yukarı kaymaları mı bulur?",
        "do": "İkinci seride ortalama kayması'nı −0,80 mm yapın. Veri tablosundaki izleme satırlarını açın.",
        "observe": "İzleme noktaları alt kontrol limitini aşar ve tabloda Sinyal olarak işaretlenir.",
        "explain": "Merkezin hem üstü hem altı için süreçten hesaplanan bir limit var."
      }
    ]
  },
  "wow": [
    {
      "title": "Sıra bilgisi",
      "body": "Aynı ölçümleri karıştırmak ortalamayı bozmaz. Hareketli aralıklar komşuluk değiştiği için değişebilir."
    },
    {
      "title": "Tolerans veriden gelmez",
      "body": "Bir parçanın çizim toleransını daraltınca aynı ölçüm dizisinin kontrol limiti değişmez."
    },
    {
      "title": "Merkez kayması",
      "body": "Yayılım sabitken süreç ortalaması bir sınıra yaklaştığında Cp sabit kalırken Cpk düşebilir."
    }
  ],
  "worked": {
    "title": "Küçük bir ölçüm dizisi",
    "prompt": "9,9, 10,0 ve 10,1 mm ölçümleri için başlangıç ortalamasını ve örnek kontrol limitlerini bulun.",
    "steps": [
      "İki ardışık mutlak fark 0,1 mm olduğu için ortalama hareketli aralık 0,1 mm.",
      "Tahmini σ = 0,1/1,128 ≈ 0,0887 mm.",
      "Ortalama 10 mm. Her iki limit için üç σ, yaklaşık 0,266 mm."
    ],
    "result": "Örnek limitler yaklaşık 9,734 ve 10,266 mm. Üç nokta gerçek bir başlangıç çalışması için yetersiz."
  },
  "misconceptions": [
    {
      "myth": "Kontrol limitinin dışındaki parça mutlaka hatalıdır.",
      "truth": "Ürünün kabulü şartnameye göre değerlendirilir. Kontrol sinyali süreç koşullarını araştırmaya çağırır."
    },
    {
      "myth": "Cp ile Cpk her zaman eşittir.",
      "truth": "Cp yayılımı ölçer. Cpk, ortalamanın en yakın tolerans sınırına uzaklığını da kullanır."
    }
  ],
  "glossary": [
    {
      "term": "Şartname",
      "definition": "Üründen beklenen ölçü ve kabul sınırları."
    },
    {
      "term": "Kontrol limiti",
      "definition": "Süreç verisinden hesaplanan grafik karar sınırı."
    },
    {
      "term": "Hareketli aralık",
      "definition": "İki ardışık ölçüm arasındaki mutlak fark."
    },
    {
      "term": "Özel neden",
      "definition": "Süreçteki beklenen değişkenlik dışındaki yerel veya dönemsel etken."
    },
    {
      "term": "Cpk",
      "definition": "Ortalamanın en yakın şartname sınırına uzaklığını yayılımla karşılaştıran indeks."
    }
  ],
  "bridge": {
    "body": [
      "Kalite Mühendisliği dersinde ölçüm sistemi analizi, rasyonel alt gruplar ve küçük kaymalar için EWMA gibi grafikler kullanılır. İlk iş değişkenliğin nereden geldiğini anlamaktır."
    ],
    "topics": [
      "Ölçüm sistemi analizi",
      "Kontrol grafikleri",
      "Süreç yeterliliği"
    ]
  },
  "quiz": [
    {
      "question": "Şartname daralırsa aynı verinin kontrol grafiğinde ne değişir?",
      "options": [
        "Merkez",
        "Kontrol limitleri",
        "Hiçbiri"
      ],
      "answer": 2,
      "explanation": "Başlangıç verisi aynı kaldığı sürece ikisi aynı kalır."
    },
    {
      "question": "Cpk neden Cp'den küçük olabilir?",
      "options": [
        "Ortalama sınırın birine yakın",
        "Veri sıralı",
        "İki adet sınır var"
      ],
      "answer": 0,
      "explanation": "Ortalama bir sınıra yakınsa Cpk daha kısa mesafeyi kullanır."
    },
    {
      "question": "Bir kontrol sinyali ilk olarak neyi gerektirir?",
      "options": [
        "Her ürünün imhası",
        "Sürecin ve ölçümün incelenmesi",
        "Şartnamenin genişletilmesi"
      ],
      "answer": 1,
      "explanation": "Sinyal bir araştırma başlangıcıdır. Kararı sinyalin nedeni ve ürün ölçümü belirler."
    }
  ],
  "next": [
    {
      "href": "uretim-planlama-ve-endustri-muhendisligi.html",
      "title": "Üretim Planlama: Stok, Kalite ve Akış",
      "why": "Kaliteyi üretim akışı ve işletme kararlarıyla birlikte değerlendirin."
    },
    {
      "href": "hipotez-testi-ve-guven-araligi.html",
      "title": "Hipotez Testi ve Güven Aralığı: Örnekleme, p-Değeri, Hata Türleri ve Güç",
      "why": "Örneklemden hareketle belirsizlik ve karar hatalarını inceleyin."
    }
  ],
  "sources": [
    {
      "title": "NIST/SEMATECH · Individuals Control Charts",
      "url": "https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc322.htm",
      "note": "Bireysel ölçüm grafiği ve hareketli aralık."
    },
    {
      "title": "NIST/SEMATECH · Assessing Process Capability",
      "url": "https://www.itl.nist.gov/div898/handbook/ppc/section4/ppc46.htm",
      "note": "Şartname ve Cpk karşılaştırması."
    }
  ],
  "revision": "Kasım 2026"
};
