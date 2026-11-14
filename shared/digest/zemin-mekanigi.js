window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["zemin-mekanigi"] = {
  "slug": "zemin-mekanigi",
  "title": "Suyun ve Tanelerin Taşıdığı Yük",
  "field": "Mühendislik",
  "level": "Lise–Lisans",
  "minutes": 28,
  "tagline": "Yeraltı suyunu, kilin drenaj yolunu ve temel genişliğini değiştirerek zeminin üç ayrı tepkisini hesaplayın.",
  "hook": "Binanın ağırlığı suya mı, toprağa mı biner? Suya doygun kil bir yükün ilk etkisiyle yıllar sonra aynı durumda olmayabilir.",
  "bigIdea": "Zeminde su basıncı, tane iskeletinin taşıdığı gerilmeyi ve oturmanın zamanını etkiler.",
  "story": [
    "Doygun bir zemin, birbirine değen tanelerle tanelerin arasındaki sudan oluşur. Üstteki ağırlık toplam gerilmeyi belirler. Boşluk suyunun basıncı, tanelerin temaslarına düşen payı bulmak için hesaba katılır.",
    "Bir temeli değerlendirirken iki ayrı soru sorulur. Zemin yükü göçmeden taşıyabilir mi? Yapı, bu yük altındaki toplam ve farklı oturmayla kullanılabilir kalır mı? Aynı saha araştırması iki soru için farklı ölçümler ve sınırlar gerektirir."
  ],
  "core": [
    {
      "heading": "Etkin gerilme",
      "body": "Tabakaların birim hacim ağırlıklarını derinlikle çarpıp toplayınca düşey toplam gerilme bulunur. Su tablası altında hidrostatik basınç derinlikle artar. Etkin gerilme toplamdan boşluk suyu basıncı çıkarılarak hesaplanır.",
      "formula": "σ′ = σ − u"
    },
    {
      "heading": "Drenaj ve zaman",
      "body": "Konsolidasyon modelinde drenaj mesafesi iki kat olursa aynı boyutsuz süreye dört kat uzun zamanda ulaşılır. Çift drenajda alttaki ve üstteki sınır açıksa en uzak yol tabaka kalınlığının yarısıdır.",
      "formula": "T<sub>v</sub> = c<sub>v</sub>t/H<sub>d</sub>²"
    },
    {
      "heading": "İdeal taşıma gücü",
      "body": "Yüzeydeki şerit temel için kısa süreli doygun kil davranışını sabit drenajsız kayma dayanımıyla idealize ediyoruz. Uygulanan basınç birim boydaki yükün genişliğe bölümüdür. Göçme hesabı farklı oturma koşullarını kapsamaz.",
      "formula": "q<sub>göçme</sub> = (π + 2)s<sub>u</sub>"
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "İnceleme noktası suyun altında",
        "predict": "Su seviyesi yüzeye çıkarsa 6 m'deki etkin gerilme artar mı?",
        "do": "İncelenen derinlik 6 m iken Su seviyesinin derinliği değerini 2 m'den 0 m'ye çekin.",
        "observe": "Etkin gerilme 76,76 kPa'dan 61,14 kPa'ya düşer. Toplam gerilme 116'dan 120 kPa'ya çıkar.",
        "explain": "Doygun ağırlıktaki küçük artıştan daha büyük bir boşluk suyu basıncı artışı var."
      },
      {
        "title": "Drenaj süresi",
        "predict": "Aynı yükte drenajın açık olduğu yüz sayısı son oturmayı değiştirir mi?",
        "do": "Oturma panelinde Geçen süre 60 gün, yük 40 kPa iken Drenaj seçimini değiştirin.",
        "observe": "Son değer iki durumda 80 mm. Çift yüzlü drenajda 60. gündeki oturma daha büyük.",
        "explain": "Drenaj yolu kısalınca aynı sürede yükün oluşturduğu boşluk suyu basıncının daha büyük bir bölümü sönümlenir."
      },
      {
        "title": "Temelin alanı",
        "predict": "Yük sabitken temel genişliği ikiye katlanırsa hangi değer yarıya iner?",
        "do": "Metre başına düşey yük 150 kN/m iken Temel genişliği değerini 1,5 m'den 3 m'ye çıkarın.",
        "observe": "Uygulanan net basınç 100'den 50 kPa'ya iner. İdeal göçme basıncı değişmez.",
        "explain": "Daha geniş alanda aynı kuvvet taşınır. Seçilen φᵤ = 0 modelinde göçme basıncı yalnız dayanımla belirlenir."
      }
    ]
  },
  "wow": [
    {
      "title": "Süre kareyle değişir",
      "body": "Aynı kilde drenaj yolunun yarıya inmesi, aynı konsolidasyon düzeyine ulaşma süresini dörtte bire indirir."
    },
    {
      "title": "Toplam artarken etkin azalabilir",
      "body": "Daha sığ su tablası doygun toplam ağırlığı artırabilir. Boşluk basıncı daha çok artarsa etkin gerilme azalır."
    },
    {
      "title": "Göçmeden de oturabilir",
      "body": "Bir temel kayma göçmesi yaşamadan zamanla gözle görülür oturma gösterebilir. İki davranış ayrı denetlenir."
    }
  ],
  "worked": {
    "title": "6 metrede gerilme bölüşümü",
    "prompt": "Su tablası 2 m, üst zeminin birim hacim ağırlığı 18 ve doygun zeminin 20 kN/m³. 6 m'de etkin gerilme nedir?",
    "steps": [
      "Üst 2 m, 2 × 18 = 36 kPa ekler.",
      "Alt 4 m, 4 × 20 = 80 kPa ekler. Toplam 116 kPa.",
      "Basınç başı 4 m. Suyun 9,81 kN/m³ ağırlığıyla u = 39,24 kPa."
    ],
    "result": "Etkin gerilme 116 − 39,24 = 76,76 kPa."
  },
  "misconceptions": [
    {
      "myth": "Boşluk suyunun basıncı her derinlikte aynıdır.",
      "truth": "Durağan su tablası altında basınç su sütununun yüksekliğiyle artar."
    },
    {
      "myth": "Göçme basıncı yüksekse oturma hesaba katılmaz.",
      "truth": "Oturma ve göçme ayrı sınır durumlarıdır. Birine bakmak ötekinin hesabını karşılamaz."
    }
  ],
  "glossary": [
    {
      "term": "Su tablası",
      "definition": "Hidrostatik durumda su basıncının atmosfere eşit olduğu seviye."
    },
    {
      "term": "Etkin gerilme",
      "definition": "Toplam gerilmeden boşluk suyu basıncının çıkarılmasıyla bulunan gerilme."
    },
    {
      "term": "Konsolidasyon",
      "definition": "Yük sonrası su drenajıyla ince taneli zeminin zamana bağlı sıkışması."
    },
    {
      "term": "Kayma dayanımı",
      "definition": "Zeminin kayma gerilmesine karşı gösterebildiği direnç."
    },
    {
      "term": "Şerit temel",
      "definition": "Boyu genişliğine göre çok büyük olan temel idealleştirmesi."
    }
  ],
  "bridge": {
    "body": [
      "Geoteknik dersinde yanal gerilmeler, laboratuvar sıkışma ve kesme deneyleri, saha araştırması ve temel tasarımını birlikte okumak gerekir."
    ],
    "topics": [
      "Geoteknik",
      "Ödometre deneyi",
      "Taşıma gücü"
    ]
  },
  "quiz": [
    {
      "question": "Su tablasının üzerinde bu modelde boşluk suyu basıncı nedir?",
      "options": [
        "0 kPa",
        "20 kPa",
        "Derinlik × 9,81"
      ],
      "answer": 0,
      "explanation": "Üst bölgedeki kapiler emme öğretim modelinin dışında."
    },
    {
      "question": "Aynı konsolidasyon derecesi için drenaj yolu ikilenirse süre ne olur?",
      "options": [
        "Yarıya iner",
        "Dört katına çıkar",
        "Sabit kalır"
      ],
      "answer": 1,
      "explanation": "Süre drenaj yolu uzunluğunun karesiyle orantılı."
    },
    {
      "question": "150 kN/m yük 3 m genişliğe yayılırsa net basınç nedir?",
      "options": [
        "450 kPa",
        "150 kPa",
        "50 kPa"
      ],
      "answer": 2,
      "explanation": "Birim boy yükü genişliğe bölün. kN/m² ile kPa eşdeğer."
    }
  ],
  "next": [
    {
      "href": "mukavemet.html",
      "title": "Mukavemet: Gerilme, Sehim ve Burkulma",
      "why": "Gerilme ve şekil değiştirmeyi elde ettiğiniz kuvvetlerle ilişkilendirin."
    },
    {
      "href": "depremler-ve-sismik-dalgalar.html",
      "title": "Depremler ve Sismik Dalgalar: P ve S, Merkez Üssü, Büyüklük ve Gutenberg–Richter",
      "why": "Dalgaların yayılımını ve yer etkilerini başka bir modelle inceleyin."
    }
  ],
  "sources": [
    {
      "title": "FHWA · Shallow Foundations",
      "url": "https://www.fhwa.dot.gov/engineering/geotech/pubs/010943.pdf",
      "note": "Taşıma gücü ve oturma, bölüm 5."
    },
    {
      "title": "FHWA · Geotechnical Site Characterization",
      "url": "https://www.fhwa.dot.gov/engineering/geotech/pubs/nhi16072.pdf",
      "note": "Yerinde toplam ve etkin gerilmeler, bölüm 11."
    }
  ],
  "revision": "Kasım 2026"
};
