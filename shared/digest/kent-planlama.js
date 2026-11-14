window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kent-planlama"] = {
  "slug": "kent-planlama",
  "title": "Bir Şehirde Kim Nereye Ulaşır?",
  "field": "Yer ve Çevre Bilimleri",
  "level": "Lise–Lisans",
  "minutes": 22,
  "tagline": "Kurgusal bir yaya ağında en kısa yolu bulun. Bir köprü eklemenin okula erişimi hangi mahallede iyileştirdiğini görün.",
  "hook": "Pencerenizden okulu görebiliyor olmanız, yürüyerek kolayca ulaşabileceğiniz anlamına gelir mi? Aradan bir nehir geçiyorsa cevap iki sokak ve bir köprüye bağlı olabilir.",
  "bigIdea": "Erişim; yerlerin konumuna, bağlantılara, ulaşım biçimine ve kabul ettiğiniz süre eşiğine birlikte bağlıdır.",
  "story": [
    "Bir plan üzerinde iki noktanın yakınlığı cetvelle ölçülebilir. İnsanlar ise kavşaklar, köprüler ve geçitlerden oluşan bir ağ üzerinde yürür. Yeni bir köprü cetvel ölçümünü değiştirmez. Bir okulun günlük yolunu değiştirebilir.",
    "Erişilebilirlik haritası hangi mekânlarda hangi fırsatların bulunduğunu ölçmenin bir yoludur. Aynı karar farklı mahallelerin gününü farklı etkileyebilir. Bu nedenle ortalama veya kent toplamı kadar, sonucun nerede ve kimin için değiştiğini de sormak gerekir."
  ],
  "core": [
    {
      "heading": "Ağ maliyeti",
      "body": "Yol ağını düğümler ve kenarlarla temsil edin. Kenarlar bu modelde sabit dakika maliyetine sahip. En kısa yol, en az kenarı kullanan değil, toplam maliyeti en küçük olan rotadır."
    },
    {
      "heading": "Süre eşiği",
      "body": "Bir mahalleden belirlenen süre içinde ulaşılabilen hizmetler sayılır. Eşik yükseldikçe bu sayı aynı kalır veya artar. Bir erişim süresi eşiği analizin amacına göre seçilir."
    },
    {
      "heading": "Nüfus ağırlığı",
      "body": "Ulaşabilen mahalle sayısı ile ulaşabilen nüfus payı aynı şey değildir. Mahalleleri aynı boydaymış gibi saymak bazı kentsel değişimlerin kime hizmet ettiğini gizleyebilir."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Bir bağlantı ekle",
        "predict": "Köprü hangi mahallede 10 dakikalık okul erişimi sağlar?",
        "do": "Yürüme süresi eşiği 10 dk iken Yaya bağlantısı seçimini Mevcut ağ'dan Yeni köprü'ye alın.",
        "observe": "Okula erişen nüfus % 0'dan % 40'a yükselir. Doğu–Okul süresi 17'den 5 dk'ya iner.",
        "explain": "Köprü Doğu'ya doğrudan yol açar. Batı'nın 11 dakikalık yolu aynı kalır."
      },
      {
        "title": "Eşiğin sınırındaki erişim",
        "predict": "Tam eşik süresinde varılan okul erişilebilir sayılır mı?",
        "do": "Mevcut ağ ile Yürüme süresi eşiği'ni 10'dan 11 dk'ya çıkarın. Veri tablosunu açın.",
        "observe": "% 60 okula erişir. Batı–Okul satırı Eşik içinde, Doğu satırı eşikten uzakta kalır.",
        "explain": "Kural en kısa sürenin eşiğe küçük veya eşit olmasıdır. Batı'dan 11 dakika bu koşulu karşılar."
      },
      {
        "title": "Okul ve tüm hizmetler",
        "predict": "Herkes okula ulaşabiliyorsa her hizmete de erişir mi?",
        "do": "Yeni köprü'yle Yürüme süresi eşiği'ni 11 dk yapın. Sağlık ve park satırlarını okuyun.",
        "observe": "Okula erişim % 100. Batı sağlık ve park için 12 dk ister, Doğu sağlık ve park için 11 dk'yı aşar.",
        "explain": "Tek hedefin erişimi diğer hedefleri ölçmez. Her hizmetin yeri ve bağlantısı farklıdır."
      }
    ]
  },
  "wow": [
    {
      "title": "Aynı mesafe, başka süre",
      "body": "Bir yaya köprüsü iki noktanın kuş uçuşu mesafesine dokunmadan yürüyüş süresini azaltabilir."
    },
    {
      "title": "Eşik çizgisi",
      "body": "Bir dakikalık değişiklik, sınırdakileri erişim sayısına bir anda ekleyebilir. Sürenin kendisi de incelenmeli."
    },
    {
      "title": "Yakınlık ve kapasite",
      "body": "Okula ulaşmak kayıt olup ders almakla aynı ölçüm değildir. Hizmet kapasitesi ayrıca hesaba katılır."
    }
  ],
  "worked": {
    "title": "Eşikte nüfusu topla",
    "prompt": "Köprü var ve eşik 11 dakika. Batı 600, Doğu 400 kişi. Bu eşikte kaç kişi okula erişir?",
    "steps": [
      "Batı–Meydan 6 ve Meydan–Okul 5 dakika. Toplam 11 dakika.",
      "Doğu köprüyle doğrudan 5 dakikada ulaşır.",
      "Her iki süre de 11 veya altında. 600 + 400 = 1000."
    ],
    "result": "Okula erişen nüfus 1000 kişi, yani % 100."
  },
  "misconceptions": [
    {
      "myth": "Cetvelde en yakın okul en kolay ulaşılan okuldur.",
      "truth": "Yürüyüş ağı, engeller ve geçitler kuş uçuşu mesafeden farklı rotalar oluşturur."
    },
    {
      "myth": "Kentin ortalama erişimi yükselirse herkes kazanır.",
      "truth": "Bir grubun büyük kazancı başkalarının sabit kalan ya da düşen erişimini ortalamada gizleyebilir."
    }
  ],
  "glossary": [
    {
      "term": "Düğüm",
      "definition": "Ağda konumu veya kavşağı temsil eden nokta."
    },
    {
      "term": "Kenar",
      "definition": "İki düğüm arasındaki geçilebilir bağlantı."
    },
    {
      "term": "Erişilebilirlik",
      "definition": "Belirlenen koşullarda fırsatlara ulaşabilme ölçüsü."
    },
    {
      "term": "Süre eşiği",
      "definition": "Bir hedefi erişilebilir saymak için kabul edilen üst süre."
    },
    {
      "term": "Arazi kullanımı",
      "definition": "Konut, hizmet, çalışma ve açık alanların yer seçimi."
    }
  ],
  "bridge": {
    "body": [
      "Şehir ve Bölge Planlama derslerinde ağ çözümlemesine toplu taşıma tarifesi, erişilebilir tasarım, hizmet kapasitesi ve katılım verileri eklenir. Sonuçların dağılımı ve kimin ölçüldüğü açıklanır."
    ],
    "topics": [
      "Coğrafi bilgi sistemleri",
      "Ulaşım planlaması",
      "Kamusal katılım"
    ]
  },
  "quiz": [
    {
      "question": "Köprü hangi büyüklüğü doğrudan değiştirir?",
      "options": [
        "Kuş uçuşu mesafe",
        "Ağdaki bağlantı",
        "Mahalle nüfusu"
      ],
      "answer": 1,
      "explanation": "Öğretim modelinde bir kenar eklenir. Konumlar ve nüfus sabit kalır."
    },
    {
      "question": "Sabit bir ağda süre eşiği artarsa erişen nüfus nasıl değişir?",
      "options": [
        "Azalır",
        "Kesin iki katına çıkar",
        "Aynı kalır ya da artar"
      ],
      "answer": 2,
      "explanation": "Daha önce erişebilenler erişmeye devam eder. Bazıları yeni sınıra dahil olabilir."
    },
    {
      "question": "Erişim eşiğinde iki mahalleden yalnız 400 kişilik olan erişiyorsa toplam 1000 kişinin ne kadarı erişir?",
      "options": [
        "% 40",
        "% 50",
        "% 60"
      ],
      "answer": 0,
      "explanation": "Mahalle sayısını değil, erişen mahalledeki nüfusu toplam nüfusa bölün."
    }
  ],
  "next": [
    {
      "href": "demografi-ve-nufus.html",
      "title": "Demografi: Doğurganlık, Yaşam Tablosu, Nüfus Piramidi ve Projeksiyon",
      "why": "Nüfus bileşiminin ve mekânsal dağılımın göstergeleri nasıl değiştirdiğini inceleyin."
    },
    {
      "href": "yol-bulma-algoritmalari.html",
      "title": "Yol Bulma: Az Adım mı, Az Maliyet mi?",
      "why": "Ağ sürelerini hesaplayan en kısa yol algoritmalarını karşılaştırın."
    }
  ],
  "sources": [
    {
      "title": "OECD/ITF · Benchmarking Accessibility in Cities",
      "url": "https://www.itf-oecd.org/sites/default/files/docs/accessibility-proximity-transport-performance.pdf",
      "note": "Zaman içinde erişim ve yakınlık ayrımı."
    },
    {
      "title": "UN-Habitat · Urban and Territorial Planning",
      "url": "https://unhabitat.org/sites/default/files/download-manager-files/IG-UTP_English.pdf",
      "note": "Planlama ölçeği, kamusal katılım ve kapsayıcılık."
    }
  ],
  "revision": "Kasım 2026"
};
