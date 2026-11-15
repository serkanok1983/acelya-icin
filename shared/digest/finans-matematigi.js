window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["finans-matematigi"] = {
  "slug": "finans-matematigi",
  "title": "Faiz ve Paranın Zamanı",
  "field": "Toplum ve Ekonomi",
  "level": "Lise–Lisans",
  "minutes": 22,
  "tagline": "Bileşik faiz, iskonto ve net bugünkü değerle farklı tarihlerdeki kurgusal ödemeleri karşılaştırın.",
  "hook": "Bir proje iki yıl sonra daha çok ödeme yaparsa her zaman daha değerli olur mu? Sonucu öğrenmek için ödemelerin hangi tarihte gerçekleştiğini de bilmeniz gerekir.",
  "bigIdea": "Tutarları toplamak için önce bütün ödemeleri aynı tarihin para birimine dönüştürün.",
  "story": [
    "Bir takvim üzerinde bugünkü bir tutarı ileri taşırsanız bileşik büyümeyi görürsünüz. Aynı yoldan geriye döndüğünüzde iskonto yaparsınız. Her adım bir çarpan kullanır ve iki işlemin birbirinin tersi olması birimlerin eşleşmesine bağlıdır.",
    "Proje değerlendirmesinde bütün giderler aynı anda çıkmaz ve bütün gelirler aynı gün tahsil edilmez. Bir takvim, gelecekteki safi para akışını düşünmeye yardım eder. İşletmenin muhasebe kârı ve projeden gelen net nakit akışı iki ayrı kavramdır."
  ],
  "core": [
    {
      "heading": "Basit ve bileşik faiz",
      "body": "Basit faiz her yıl anapara üzerinde hesaplanır. Bileşik faizde önceki dönemin faizi de sonraki dönemin hesabına girer. Aynı nominal yıllık oran farklı bileşik dönemlerle farklı etkin oran verir.",
      "formula": "GD = BD(1 + j/m)<sup>mt</sup>"
    },
    {
      "heading": "Net bugünkü değer",
      "body": "Her akışa yılına göre iskonto uygulayın. Bugünkü gideri işaretini koruyarak toplamda tutun. Pozitif net değer seçili oran ve nakit akışı varsayımı altında bir model sonucudur.",
      "formula": "NBD = ∑ C<sub>t</sub>/(1 + r)<sup>t</sup>"
    },
    {
      "heading": "Oran ve tutarlılık",
      "body": "Bileşik dönem ile faiz oranının dönemi uyumlu olmalıdır. Yıl sonu ödeme yıllık oranla indirgenir. Sabit fiyatlarla ifade edilen reel akışlar için reel iskonto oranı gerekir."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Faiz üzerinde faiz",
        "predict": "Aynı nominal oranla dönem sayısını artırınca beş yıl sonunda tutar artar mı?",
        "do": "Yıllık nominal faiz % 10 ve Vade 5 yıl iken Yıldaki bileşik dönem seçimini yıllıktan aylığa alın.",
        "observe": "Bileşik tutar ilk durumda 1610,51 PB, aylıkta yaklaşık 1645,31 PB. Basit değer 1500 PB olarak kalır.",
        "explain": "Faiz daha erken bakiyeye katılır ve sonraki dönemlerde onun üzerinden de faiz hesaplanır."
      },
      {
        "title": "İskonto sıfır",
        "predict": "Sıfır oranla net bugünkü değer hangi toplama eşit olur?",
        "do": "Yıllık iskonto oranı'nı % 0 yapın. Üçüncü yıl geliri 600 PB kalsın.",
        "observe": "İskontosuz toplam ve NBD 300 PB. Son akışın bugünkü değeri 600 PB.",
        "explain": "Bütün tarih çarpanları 1 olur ve nakit akışları nominal tutarlarıyla toplanır."
      },
      {
        "title": "Aynı akış, daha yüksek oran",
        "predict": "Pozitif gelecek ödemelerinde iskonto oranı yükselince NBD düşer mi?",
        "do": "Üçüncü yıl geliri 600 PB iken Yıllık iskonto oranı'nı % 10'dan % 30'a çıkarın.",
        "observe": "NBD pozitif değerden negatif değere geçer. Yıl 0 gideri tablonun iki sütununda da aynı.",
        "explain": "Bugünkü gider sabit. Gelecekteki pozitif tutarların bugünkü karşılığı küçülür."
      }
    ]
  },
  "wow": [
    {
      "title": "Bugün değişmez",
      "body": "Bugün yapılan ödeme kaç yıllık analize bakılırsa bakılsın t = 0 satırında aynen yer alır."
    },
    {
      "title": "Daha erken ödeme",
      "body": "Pozitif iskonto oranında iki eşit pozitif ödemeden daha erken olanın bugünkü değeri daha büyüktür."
    },
    {
      "title": "İki ayrı yüzde",
      "body": "Nominal yıllık oran ile etkin yıllık oran, aynı tutarı bir yıl sonunda farklı biçimlerde ifade edebilir."
    }
  ],
  "worked": {
    "title": "Yıl sonu akışlarını indirge",
    "prompt": "Bugün 1000 PB gider, yıl 1'de 300, yıl 2'de 400, yıl 3'te 600 PB gelir. Yıllık iskonto % 10.",
    "steps": [
      "300/1,1 ≈ 272,73 PB.",
      "400/1,1² ≈ 330,58 PB.",
      "600/1,1³ ≈ 450,79 PB. Yuvarlamadan önce üç tutarı toplayıp 1000'i çıkarın."
    ],
    "result": "NBD ≈ 54,09 PB."
  },
  "misconceptions": [
    {
      "myth": "% 12 yıllık ve % 1 aylık her durumda aynı anlama gelir.",
      "truth": "Aylık % 1 bileşik, % 12 nominal oranı verir. Etkin yıllık oran yaklaşık % 12,68."
    },
    {
      "myth": "NBD'de gelecekteki para doğrudan bugünkü giderden çıkarılabilir.",
      "truth": "Önce gelecekteki parayı seçilen oran ve süreyle bugüne indirgeyin."
    }
  ],
  "glossary": [
    {
      "term": "Anapara",
      "definition": "Faiz hesabının başlangıcındaki tutar."
    },
    {
      "term": "Bileşik faiz",
      "definition": "Faizlerin sonraki dönemlerde bakiyeye katıldığı hesap."
    },
    {
      "term": "İskonto oranı",
      "definition": "Gelecekteki akışı bugüne dönüştüren dönemlik oran."
    },
    {
      "term": "Nakit akışı",
      "definition": "Belli bir tarihte ödenen veya tahsil edilen para."
    },
    {
      "term": "Net bugünkü değer",
      "definition": "Bütün işaretli akışların bugünkü değerleri toplamı."
    }
  ],
  "bridge": {
    "body": [
      "Finans derslerinde iskonto oranının riskle ilişkisi ve alternatif proje karşılaştırmaları incelenir. Tablodaki tek oran yerine birden çok senaryoyla duyarlılık sınanabilir."
    ],
    "topics": [
      "Sermaye bütçelemesi",
      "Risk ve iskonto",
      "Duyarlılık analizi"
    ]
  },
  "quiz": [
    {
      "question": "Bir dönem önceki değer için gelecek tutara ne yapılır?",
      "options": [
        "(1 + r) ile bölünür",
        "r ile çarpılır",
        "r çıkarılır"
      ],
      "answer": 0,
      "explanation": "İskonto bileşik büyümenin tersidir. Bir dönem için çarpanın tersi gerekir."
    },
    {
      "question": "Yıllık nominal j, m kez bileşiyorsa dönem oranı nedir?",
      "options": [
        "jm",
        "j/m",
        "j + m"
      ],
      "answer": 1,
      "explanation": "Yıllık nominal oran eşit bileşik dönemlerin sayısına bölünür."
    },
    {
      "question": "% 0 iskonto altında NBD hangi değerdir?",
      "options": [
        "Yalnız gider",
        "Yalnız son ödeme",
        "İşaretli toplam"
      ],
      "answer": 2,
      "explanation": "Bütün iskonto çarpanları 1 olur. Gelirleri ve giderleri işaretiyle toplayın."
    }
  ],
  "next": [
    {
      "href": "us-ve-logaritma.html",
      "title": "Üstel Fonksiyon ve Logaritma: Büyüme, Yarılanma ve Logaritmik Ölçek",
      "why": "Bileşik büyümenin üstel yapısını ve tersini inceleyin."
    },
    {
      "href": "isletme-bilimi-ve-yonetim.html",
      "title": "İşletme Bilimi: Başabaş, Yatırım, Mali Tablolar ve Karar",
      "why": "Proje değerlemesini bütçe ve yönetim kararlarıyla ilişkilendirin."
    }
  ],
  "sources": [
    {
      "title": "OpenStax · Paranın zaman değeri",
      "url": "https://openstax.org/books/principles-finance/pages/7-4-applications-of-tvm-in-finance",
      "note": "Dönem eşleştirmesi ve bileşik faiz."
    },
    {
      "title": "OpenStax · Net bugünkü değer",
      "url": "https://openstax.org/books/principles-finance/pages/16-2-net-present-value-npv-method",
      "note": "Nakit akışlarını iskonto etme."
    }
  ],
  "revision": "Kasım 2026"
};
