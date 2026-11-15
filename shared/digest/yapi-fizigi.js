window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yapi-fizigi"] = {
  "slug": "yapi-fizigi",
  "title": "Bir Binada Isı, Işık, Ses",
  "field": "Mühendislik",
  "level": "Lise–Lisans",
  "minutes": 23,
  "tagline": "Bir cephede alanı, bir ışık kaynağında uzaklığı ve bir bölmede açıklığı değiştirip fiziksel konforu modelleyin.",
  "hook": "İnce bir pencere, kalın bir duvar ve küçük bir kapı aralığı. Binanın içindeki deneyimimizi bazen en büyük alan, bazen en küçük açıklık belirler.",
  "bigIdea": "Isı, ışık ve ses farklı yollar izler. Her yolun katkısını fiziksel büyüklüğüne uygun ölçmek gerekir.",
  "story": [
    "Bir binanın kabuğu, iç ortamı dışarıdan ayırır. Pencere görüş ve ışık sağlar, aynı zamanda bir ısı yolu açar. Isı kaybını hesaplarken duvar ve pencere alanlarını ayrı ayrı değerlendirmek, aynı toplam alanda farklı cephelerin neden farklı davrandığını gösterir.",
    "Işık için yüzeye ulaşan akı ve geldiği yön önemlidir. Ses için açıktan ve bölmeden geçen güçlerin toplamı önemlidir. Bu büyüklükleri saymak, bir mekânın görsel veya akustik deneyimini açıklamanın ilk adımlarından biridir."
  ],
  "core": [
    {
      "heading": "Isıl geçirgenlik",
      "body": "U, birim alan ve birim iç-dış sıcaklık farkı için ısı geçişini verir. Farklı yüzeylerden geçen güçler ayrı hesaplanıp toplanır. U'nun birimi W/(m²·K).",
      "formula": "P = ∑ U<sub>i</sub>A<sub>i</sub>ΔT"
    },
    {
      "heading": "Yüzeyde aydınlık",
      "body": "Noktasal kaynağın uzaklığı artınca akı daha geniş alana yayılır. Yüzeyi eğmek de alanın kaynağa bakan izdüşümünü küçültür. Dik geliş en yüksek aydınlığı verir.",
      "formula": "E = I cos θ / d²"
    },
    {
      "heading": "Birleşik ses yalıtımı",
      "body": "Desibel logaritmik olduğu için önce geçişi güç oranına çevirin. Bölgenin ağırlığı alan payıdır. Dönüşte daha büyük geçen güç, daha düşük birleşik ses azaltımı demektir.",
      "formula": "R = −10 log₁₀(τ)"
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Açıklığın alanı",
        "predict": "Aynı cephede daha fazla pencere varsa öğretim modelinde kayıp artar mı?",
        "do": "Duvarın U değeri 0,35 iken Pencere alanı'nı 0'dan 5 m²'ye çıkarın.",
        "observe": "Toplam ısı kaybı 140 W'tan 245 W'a çıkar. Pencerenin payı 140 W.",
        "explain": "Pencere yeni alan eklemiyor. Birim alan başına daha çok kaybeden yol, eski alanın bir kısmını alıyor."
      },
      {
        "title": "Ters kare",
        "predict": "Uzaklık iki katına çıktığında aydınlık yarıya mı iner?",
        "do": "Yüzey dikine göre açı 0° iken Kaynağa uzaklık değerini 2 m'den 4 m'ye çıkarın.",
        "observe": "150 lx yerine 37,5 lx okuyun. Yani aydınlık dörtte bire düşer.",
        "explain": "Noktasal kaynağın ışığı uzaklığın karesiyle artan alana yayılır."
      },
      {
        "title": "Küçük akustik açıklık",
        "predict": "Bölmenin binde biri açık olsa geçen gücün çoğu nereden gelir?",
        "do": "Açıklığın alan payı'nı % 0'dan % 0,10'a çıkarın.",
        "observe": "Birleşik azaltım 40 dB'den yaklaşık 29,59 dB'ye düşer. Geçen gücün yaklaşık % 90,92'si açıklıktan.",
        "explain": "Bölme, kendi metrekaresine gelen gücün çok azını geçirir. Açıklık birim alan başına çok daha baskın bir yoldur."
      }
    ]
  },
  "wow": [
    {
      "title": "Eğimle azalma",
      "body": "Yüzey normaliyle ışık doğrultusu 60° yaptığında, aynı uzaklıkta aydınlık dik gelişin yarısıdır."
    },
    {
      "title": "U ile alan birlikte",
      "body": "Düşük U değerli büyük bir yüzey, yüksek U değerli küçük bir yüzeyden daha fazla ısı kaybedebilir."
    },
    {
      "title": "Daha az yankı ve daha az geçiş",
      "body": "Bir odanın içinde sesi soğurmakla sesi öteki odaya geçirmemek farklı tasarım hedefleridir."
    }
  ],
  "worked": {
    "title": "Pencerenin ve duvarın katkısı",
    "prompt": "20 m² cephede 5 m² pencere var. ΔT = 20 K, U değerleri pencere için 1,40 ve duvar için 0,35.",
    "steps": [
      "15 m² duvar × 0,35 × 20 K = 105 W.",
      "5 m² pencere × 1,40 × 20 K = 140 W.",
      "İki yol aynı sıcaklık farkında çalışır. Güçler eklenir."
    ],
    "result": "Toplam 245 W."
  },
  "misconceptions": [
    {
      "myth": "Yüksek lux değeri her zaman yüksek görsel konfor getirir.",
      "truth": "Kamaşma, kontrast ve dağılım da görsel konforu etkiler."
    },
    {
      "myth": "İki bölge aynı alandaysa dB'lerinin ortalamasını alabiliriz.",
      "truth": "Önce her bölgeyi güç geçiş oranına çevirin. Alan ağırlıklı toplamdan dB bulunur."
    }
  ],
  "glossary": [
    {
      "term": "U değeri",
      "definition": "Birim alan ve sıcaklık farkı başına ısıl geçirgenlik."
    },
    {
      "term": "Isı köprüsü",
      "definition": "Geometrinin veya malzemenin yerel ısı akısını artırdığı bölge."
    },
    {
      "term": "Aydınlık düzeyi",
      "definition": "Birim yüzey alanına gelen ışık akısı."
    },
    {
      "term": "Lux",
      "definition": "Aydınlık düzeyi birimi, lümen/metrekare."
    },
    {
      "term": "Ses azaltımı",
      "definition": "Gelen ve geçen ses güçlerinin oranını dB ile ifade eden büyüklük."
    }
  ],
  "bridge": {
    "body": [
      "Bina Fiziği dersinde bu hesaplar güneş kazancı, günışığı dağılımı ve frekansa göre ses geçişiyle genişletilir. Ölçüm, kullanım biçimi ve malzeme ayrıntıları hesaba girer."
    ],
    "topics": [
      "Isıl konfor",
      "Günışığı",
      "Mimari akustik"
    ]
  },
  "quiz": [
    {
      "question": "20 K farkta 5 m² ve U = 1,40 için kayıp kaç watt?",
      "options": [
        "14",
        "140",
        "1400"
      ],
      "answer": 1,
      "explanation": "Alanı, U değerini ve sıcaklık farkını çarpın."
    },
    {
      "question": "Dik gelen ışıkta uzaklık üç kata çıkarsa aydınlık nedir?",
      "options": [
        "Üçte bir",
        "Altıda bir",
        "Dokuzda bir"
      ],
      "answer": 2,
      "explanation": "Aydınlık uzaklığın karesinin tersiyle ölçeklenir."
    },
    {
      "question": "Akustik açıklıkta birleştirilen büyüklük nedir?",
      "options": [
        "Güç oranı",
        "Desibel sayısı",
        "Frekans değeri"
      ],
      "answer": 0,
      "explanation": "Doğrusal güç oranları alanla ağırlıklandırılır. Sonuç daha sonra dB'ye çevrilir."
    }
  ],
  "next": [
    {
      "href": "isi-transferi.html",
      "title": "Isı Transferi: İletim, Taşınım, Işınım",
      "why": "Cephe kaybında kullanılan ısıl dirençlerin nereden geldiğini öğrenin."
    },
    {
      "href": "kent-planlama.html",
      "title": "Kent Planlama ve Mekân Analizi",
      "why": "Bir binanın çevresindeki ulaşım ağını da modele katın."
    }
  ],
  "sources": [
    {
      "title": "EIA · Commercial Building Shell",
      "url": "https://www.eia.gov/analysis/studies/buildings/buildingshell/pdf/buildingshell.pdf",
      "note": "Alan ağırlıklı ısıl geçirgenlik."
    },
    {
      "title": "CIE · Fotometrik uzaklık yasası",
      "url": "https://cie.co.at/eilvterm/17-25-104",
      "note": "Uzaklık ve yüzey açısı."
    },
    {
      "title": "OpenStax · Ses şiddeti ve desibel",
      "url": "https://openstax.org/books/college-physics-2e/pages/17-3-sound-intensity-and-sound-level",
      "note": "Logaritmik güç ve şiddet ölçeği."
    }
  ],
  "revision": "Kasım 2026"
};
