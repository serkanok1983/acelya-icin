window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["dusunurler-dizini"] = {
  "slug": "dusunurler-dizini",
  "title": "Düşünürler Dizini",
  "field": "Felsefe ve Mantık",
  "level": "Lise–Lisans",
  "minutes": 20,
  "tagline": "Felsefe tarihi derslerine bir düşünürün adı, kavramı veya dönemi üzerinden ulaş. Bağlantılar ilgili argüman haritasını açar.",
  "hook": "İbn Sînâ’yı başka bir kitapta Avicenna adıyla görebilirsin. Bir metni bulmak ve ona yönelen düşünceyi anlamak için iki adı aynı iz üzerinden aramayı dene.",
  "bigIdea": "Dizin bir sorudan ilgili savı bulmaya yardım eder. Bir düşünürü anlamak için metin, gerekçe ve ona yönelen itiraz ayrı ayrı okunabilir.",
  "story": [
    "Bir düşünür farklı alfabe ve yayın geleneklerinde başka adlarla yer alabilir. Dizin, aynı kişinin yaygın adlarını ilgili derse bağlar. Yazımda Türkçe karakterleri kullanabilir veya işaretsiz yazabilirsin. Bir kartın bağlantısı seni kişinin ele alındığı argüman haritasına götürür.",
    "Dönem filtresi kişinin bütün yaşamını sınıflamak yerine, sitede konunun ele alındığı dersi gösterir. Kronoloji, metinlerin birbirini etkileyebileceği sırayı anlamaya yardım eder. Yöntem benzerliği tek başına doğrudan etkiyi ortaya koymaz. Bu ilişki için metin ve aktarım koşulları da incelenebilir."
  ],
  "core": [
    {
      "heading": "Adla başla",
      "body": "Aramada bir kişinin soyadı, bilinen farklı yazımı veya kavramını kullanabilirsin. Örneğin Avicenna ve İbn Sînâ aynı kişiye ait kartı getirir. Dizin aramasında birden çok sözcük yazarsan hepsi o kartla ilişkili olmalıdır."
    },
    {
      "heading": "Dönemi daralt",
      "body": "Bir kavram farklı dönemlerde yer bulabilir. ‘Nedensellik’ aramasını dönem filtresiyle birlikte kullanarak hangi derslerin kalacağını görebilirsin. Filtreyi temizlediğinde arama alanı da sıfırlanır ve dizin yeniden tam listeyi gösterir."
    },
    {
      "heading": "Metne ve gerekçeye git",
      "body": "Bir bağlantı açıldığında argüman haritasındaki ilgili sav seçilmiş gelir. Metin ve bağlam satırını, savın gerekçesinden ayır. İtirazı açmadan önce savın zayıf kaldığını düşündüğün öncülü kendin belirlemeye çalış."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "İki adın izi",
        "predict": "Avicenna ile İbn Sînâ aramaları aynı karta mı gider?",
        "do": "Düşünür veya kavram alanına sırayla «avicenna» ve «ibn sina» yaz.",
        "observe": "İki yazım İbn Sînâ kartını ve Orta Çağ ve İslam Felsefesi bağlantısını gösterir.",
        "explain": "Alternatif adlar aynı düşünürün sayfada nasıl bulunacağını açık eder."
      },
      {
        "title": "Dönem aralığı",
        "predict": "Nedensellik seçildiğinde yalnız bir düşünür kalır mı?",
        "do": "‘nedensellik’ yaz ve dönemi sırayla Orta Çağ ile Erken Modern Felsefe seç.",
        "observe": "Orta Çağ filtresi Gazâlî’yi, erken modern filtre Hume’u gösterir.",
        "explain": "Benzer bir kavram, farklı zaman ve soru bağlamlarında ele alınabilir."
      },
      {
        "title": "Savı bul",
        "predict": "Bir kişinin kartı, birden fazla yaklaşım içeren derste doğru sava nasıl gider?",
        "do": "Hume’u ara ve Empiristler bağlantısını aç. Sav veya yaklaşım alanına bak.",
        "observe": "Hume ve tümevarım seçili gelir. İtiraz ve olası yanıtı açarak savın sınırını görebilirsin.",
        "explain": "Dizin bir kişiden, ders içindeki tartışma ve gerekçeye geçiş sağlar."
      }
    ]
  },
  "wow": [
    {
      "title": "Bir kavram çeşitli çağlarda",
      "body": "Nedensellik farklı dönem derslerinde görünür. Ortak ad, ele alınan sorunun aynı olduğunu garanti etmez."
    },
    {
      "title": "Geriye doğru okuma",
      "body": "Bir dersin kaynak notundan metni bulup sonra haritaya dönmek, bir savın nasıl özetlendiğini denetlemeye yardım eder."
    },
    {
      "title": "Bir adın tarihçesi",
      "body": "İbn Sînâ ve Avicenna, Arapça ve Latince eser geleneğinde görülen iki farklı adlandırmadır."
    }
  ],
  "worked": {
    "title": "Kavram ve dönem",
    "prompt": "Nedensellik konusunda erken modern bir örneğin gerekçesini nasıl bulursun?",
    "steps": [
      "Arama alanına ‘nedensellik’ yaz ve dersin dönemini Erken Modern Felsefe seç.",
      "Hume kartındaki derse geç. Gözlenen olaylar ile gelecek iddiasını ayır.",
      "İtirazı aç ve yöntemin hangi başarısına başvurulduğunu incele."
    ],
    "result": "Dizin ilgili ders ve argümanı gösterir. Savı taşıyan gerekçe dersin içinde incelenir."
  },
  "misconceptions": [
    {
      "myth": "Döneme göre arama bir düşünürün bütün etkisini gösterir.",
      "truth": "Filtre, kişinin sitedeki bir derste nasıl yer aldığını gösterir. Tarihsel alımlanışı daha geniş olabilir."
    },
    {
      "myth": "Aynı kavramı kullanan iki düşünür aynı sonuca ulaşır.",
      "truth": "Kavrama hangi soruyla yaklaştıklarını, hangi öncülleri kullandıklarını ve hangi sonuca ulaştıklarını ayrıca oku."
    }
  ],
  "glossary": [
    {
      "term": "Dizin",
      "definition": "Ad veya konu üzerinden ilgili kayıtların bulunabildiği liste."
    },
    {
      "term": "Takma ad",
      "definition": "Bir yazarın belirli bir metinde kullandığı farklı ad."
    },
    {
      "term": "Dönem",
      "definition": "Karşılaştırmayı kolaylaştırmak için kullanılan tarihsel aralık."
    },
    {
      "term": "Sav",
      "definition": "Bir tartışmada gerekçelendirilmek üzere ileri sürülen iddia."
    },
    {
      "term": "Aktarım",
      "definition": "Bir metnin veya kavramın başka bir dil veya bağlamda okunma süreci."
    }
  ],
  "bridge": {
    "body": [
      "Bir düşünürün ana metnini seçtiğinde kavramın hangi soruya karşılık çıktığını araştır. Benzer sözcüklerle yapılan iki savın karşılaştırılabilmesi için öncül ve gerekçeleri ayrı ayrı yaz."
    ],
    "topics": [
      "Kronoloji",
      "Arama",
      "Argüman"
    ]
  },
  "quiz": [
    {
      "question": "Avicenna araması hangi kişinin kartını açar?",
      "options": [
        "İbn Sînâ",
        "İbn Rüşd",
        "Fârâbî"
      ],
      "answer": 0,
      "explanation": "Dizin yaygın farklı adları aynı düşünürün kaydında toplar."
    },
    {
      "question": "Bir kart dönem filtresinde görünmüyorsa ilk kontrolün ne olur?",
      "options": [
        "Yazarın adını değiştiririm",
        "Tümü’ne dönüp sorguyu korurum",
        "Bağlantıyı silerim"
      ],
      "answer": 1,
      "explanation": "Dönem filtresi ile arama birlikte çalışır. Filtreyi genişletmek nedenin dönem olup olmadığını gösterir."
    },
    {
      "question": "Bir ders bağlantısını açtığında savın hangi yönünü ayrıca inceleyebilirsin?",
      "options": [
        "Sayfanın dosya boyutunu",
        "Bağlantının rengini",
        "Savın itirazlara nasıl yanıt verdiğini"
      ],
      "answer": 2,
      "explanation": "Argüman haritasında itiraz ve olası yanıt ayrı bir bölümde açılır."
    }
  ],
  "next": [
    {
      "href": "sokrates-oncesi-felsefe.html",
      "title": "Sokrates Öncesi Felsefe",
      "why": "Bir kaynak fragmanı ve sonraki yorum arasındaki farkla başla"
    },
    {
      "href": "analitik-felsefe.html",
      "title": "Analitik Felsefe: Dil, Mantık ve Kanıt",
      "why": "Bir düşünürün savını mantıksal biçim ve kanıt üzerinden incele"
    }
  ],
  "sources": [
    {
      "title": "Stanford Encyclopedia of Philosophy, Presocratic Philosophy",
      "url": "https://plato.stanford.edu/entries/presocratics/",
      "note": "Erken Yunan metin tanıklıkları ve dönem sınıflaması."
    },
    {
      "title": "Stanford Encyclopedia of Philosophy, Ibn Sina’s Metaphysics",
      "url": "https://plato.stanford.edu/entries/ibn-sina-metaphysics/",
      "note": "İbn Sînâ’nın farklı adlandırmaları ve kavramları."
    }
  ],
  "revision": "Kasım 2026"
};
