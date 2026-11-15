window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["isi-transferi"] = {
  "slug": "isi-transferi",
  "title": "Isının İzlediği Yollar",
  "field": "Mühendislik",
  "level": "Lise–Lisans",
  "minutes": 25,
  "tagline": "Katmanlı bir duvarda sıcaklığın nerede düştüğünü ve sıcak bir levhanın ısıyı nasıl yaydığını inceleyin.",
  "hook": "Bir duvara dokunduğunuzda hissettiğiniz soğukluk ısının yolculuğundan bir ipucudur. Duvarın iki yanında hava varsa, ısı o havadan duvara ve duvardan öbür havaya nasıl geçer?",
  "bigIdea": "Seri katmanlarda aynı ısı akısı akar. Sıcak bir yüzeyden farklı yollarla ayrılan akılar ise toplanır.",
  "story": [
    "Bir tencerenin metal tabanında enerji madde taşınmadan ilerler. Tabanın üstündeki sıcak su yükselip daha soğuk suyla yer değiştirir. Ocağın sıcak yüzeyi de çevreye ışınım gönderir. Bu üç yol aynı mutfakta birlikte işler.",
    "Duvar çizimini okurken iç hava, iç yüzey ve dış yüzey sıcaklıklarını ayrı düşünün. Bir yüzeyin sıcaklığı ile yanındaki havanın sıcaklığı farklı olabilir. O fark, havanın akışına ve yüzeyle ısı alışverişine bağlı bir sınır koşuludur."
  ],
  "core": [
    {
      "heading": "İletim ve geometri",
      "body": "Düz bir katmanda kararlı ve tek boyutlu iletim için akı sıcaklık farkıyla doğru, kalınlıkla ters orantılıdır. Isıl iletkenlik k malzeme özelliğidir. Birim alan için direncin birimi m²·K/W.",
      "formula": "R = L/k"
    },
    {
      "heading": "Taşınım sınırı",
      "body": "Yüzeyle akışkan arasındaki sıcaklık farkını ısı akısına çevirmek için h katsayısı kullanılır. Akışkanın hızı, akış biçimi, geometri ve özellikleri h'yi etkiler. Duvar modelinde h verilidir.",
      "formula": "q = h(T<sub>yüzey</sub> − T<sub>akışkan</sub>)"
    },
    {
      "heading": "Net ışınım",
      "body": "Sıcak levha ışınım yayarken ortamdan da ışınım alır. Büyük ve tek sıcaklıklı bir çevrede net akı mutlak sıcaklıkların dördüncü kuvvetlerinin farkına ve levhanın yayma katsayısına bağlıdır.",
      "formula": "q = εσ(T<sub>levha</sub><sup>4</sup> − T<sub>çevre</sub><sup>4</sup>)"
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Yalıtımın sıcaklık farkındaki payı",
        "predict": "Yalıtım eklenince iç yüzeyin sıcaklığı havaya yaklaşır mı?",
        "do": "Duvar panelinde Yalıtım kalınlığı değerini 0 cm, sonra 6 cm yapın. Dış taşınım katsayısı 20 W/(m²·K) kalsın.",
        "observe": "Isı akısı 47,06'dan 10,39 W/m²'ye düşer. İç yüzey 14,12'den 18,70 °C dolayına çıkar.",
        "explain": "Akı azalınca iç taşınım tabakasındaki q/h düşüşü de azalır. Yalıtım sıcaklık farkının büyük kısmını taşır."
      },
      {
        "title": "Yüzey direnci",
        "predict": "Dış hava daha güçlü ısı taşıyorsa duvar akısı nasıl değişir?",
        "do": "Yalıtım 6 cm iken Dış taşınım katsayısı değerini 5, sonra 40 W/(m²·K) yapın.",
        "observe": "Dış direnç küçülür. Akı yaklaşık 9,64'ten 10,53 W/m²'ye çıkar.",
        "explain": "Direnç toplamında yalıtım büyük yer tuttuğu için dış katsayıdaki sekiz kat değişim akıyı sekiz kat değiştirmez."
      },
      {
        "title": "Yayma katsayısı",
        "predict": "Yayma katsayısı sıfır olduğunda levha ısı vermeyi sürdürür mü?",
        "do": "Açık yüzey panelinde Levha sıcaklığı 60 °C ve Taşınım katsayısı 6 W/(m²·K) iken Yayma katsayısı'nı 0'a getirin.",
        "observe": "Net ışınım 0 W/m² olur. Taşınım ve toplam akı 240 W/m² kalır.",
        "explain": "Levha havaya taşınımla enerji verir. Bu iki akı aynı yüzeyden farklı yollarla ayrılır."
      }
    ]
  },
  "wow": [
    {
      "title": "Direnci büyük katman",
      "body": "Seri bir duvarda en büyük ısıl dirence sahip katmanda en büyük sıcaklık düşüşü gerçekleşir."
    },
    {
      "title": "Termometrenin yeri",
      "body": "Havadaki termometrenin gösterdiği sıcaklık yüzey sıcaklığından farklı olabilir. Isı hesabında konum önemlidir."
    },
    {
      "title": "Fark var, ölçek farklı",
      "body": "Bir kelvinlik sıcaklık farkı bir santigrat derecelik farka eşittir. Işınım hesabı mutlak sıcaklık ister."
    }
  ],
  "worked": {
    "title": "Birim alandan geçen ısı",
    "prompt": "20 K farkta, 6 cm yalıtımla ve dış yüzeyde h = 20 W/(m²·K) iken akıyı hesaplayın.",
    "steps": [
      "Gövde direnci 0,20/0,80 = 0,25. Yalıtım direnci 0,06/0,04 = 1,50.",
      "İç ve dış yüzey dirençleri 1/8 = 0,125 ve 1/20 = 0,05 m²·K/W.",
      "20 K farkı toplam 1,925 m²·K/W dirence bölün."
    ],
    "result": "q ≈ 10,39 W/m²."
  },
  "misconceptions": [
    {
      "myth": "Yalıtımın iki katı her zaman ısı kaybını yarıya indirir.",
      "truth": "Yalnız yalıtım direnci iki katına çıkar. Diğer seri dirençler sonuçta kalır."
    },
    {
      "myth": "Işınım için bir taşıyıcı akışkan gerekir.",
      "truth": "Işınım elektromanyetik dalgalarla taşınır. Boşlukta da yayılabilir."
    }
  ],
  "glossary": [
    {
      "term": "Isı akısı",
      "definition": "Birim yüzeyden birim zamanda geçen ısı enerjisi."
    },
    {
      "term": "İletkenlik",
      "definition": "Sıcaklık gradyanını iletim akısına bağlayan malzeme özelliği."
    },
    {
      "term": "Taşınım",
      "definition": "Akışkan hareketinin ve yüzeydeki ısı geçişinin birlikte etkisi."
    },
    {
      "term": "Yayma katsayısı",
      "definition": "Yüzeyin aynı sıcaklıktaki kara cisme göre ışınım yayma oranı."
    },
    {
      "term": "Kararlı durum",
      "definition": "Sıcaklıkların ve akıların zamana göre değişmediği durum."
    }
  ],
  "bridge": {
    "body": [
      "Isı Transferi dersinde sıcaklık zamana da bağlı olur. Isı denklemine geçen bir model, yüzey koşullarıyla birlikte malzemenin ısı kapasitesini de kullanır."
    ],
    "topics": [
      "Isı denklemi",
      "Isı değiştiriciler",
      "Sınır koşulları"
    ]
  },
  "quiz": [
    {
      "question": "6 cm yalıtımın birim alan direnci hangisidir?",
      "options": [
        "0,24",
        "1,5",
        "6,0"
      ],
      "answer": 1,
      "explanation": "Kalınlığı metreye çevirip 0,04'e bölün. Birim m²·K/W."
    },
    {
      "question": "Levha ve ortam aynı sıcaklıktaysa net ışınım nedir?",
      "options": [
        "Sıfır",
        "En büyük",
        "h'ye eşit"
      ],
      "answer": 0,
      "explanation": "Giden ve gelen ışınım akıları birbirini dengeler."
    },
    {
      "question": "Seri duvarda bütün katmanlar için ortak olan nedir?",
      "options": [
        "Kalınlık",
        "Sıcaklık düşüşü",
        "Kararlı ısı akısı"
      ],
      "answer": 2,
      "explanation": "Enerji birikmediği için her katmandan aynı akı geçer."
    }
  ],
  "next": [
    {
      "href": "yapi-fizigi.html",
      "title": "Yapı Fiziği: Isı, Işık ve Ses",
      "why": "Yan yana duvar ve pencerenin cephenin kaybına katkısını hesaplayın."
    },
    {
      "href": "termodinamik.html",
      "title": "Termodinamik: PV Diyagramı, İş, Isı ve Çevrimler",
      "why": "Enerji dengelerini döngülerde ve basit süreçlerde izleyin."
    }
  ],
  "sources": [
    {
      "title": "OpenStax University Physics · Isı aktarımı",
      "url": "https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer",
      "note": "İletim ve net ışınım."
    },
    {
      "title": "MIT 2.005 · Isı aktarımı bağıntıları",
      "url": "https://web.mit.edu/gallup/www/class/005cheatsheet.pdf",
      "note": "Seri ve paralel ısıl dirençler."
    }
  ],
  "revision": "Kasım 2026"
};
