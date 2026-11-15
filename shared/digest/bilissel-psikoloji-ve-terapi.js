window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bilissel-psikoloji-ve-terapi"] = {
  "slug": "bilissel-psikoloji-ve-terapi",
  "title": "Bilişsel Psikoloji ve Bilişsel Terapi",
  "field": "Zihin ve Davranış",
  "level": "Lise–Lisans",
  "minutes": 35,
  "tagline": "Bir renk sözcüğü tepkiyi niçin geciktirebilir? Sentetik Stroop verisini çöz, sonra Beck ve Ellis’in olayla yorum arasına koyduğu ayrımı incele.",
  "hook": "MAVİ sözcüğü turuncu renkle yazıldığında yazının rengini söyle. Konuşma, algı ve dikkat aynı anda farklı yanıtlar önerdiğinde fark ölçülebilir mi?",
  "bigIdea": "Bir bilişsel süreç deneyde ölçülebilen bir hipotezle, klinik bağlamda ise olay ile ona verilen anlamı ayıran bir kuramla ele alınabilir.",
  "story": [
    "Bilişsel psikoloji, algı, bellek ve dildeki işlemleri gözlenebilir davranıştan hareketle açıklamaya çalışır. Stroop’un 1935 deneylerinde sözcüğü okumak ile mürekkep rengini adlandırmak ayrı görevlerdi. Uyuşmayan sözcük, renk adlandırmayı yavaşlatabilir. Tepki süresi, farklı zorluktaki görevleri karşılaştırmanın bir yoludur.",
    "Beck, 1960’ların başında klinik anlatılardaki düşünce örüntülerini inceledi. Ellis, akılcı duygucu davranışçı terapinin öncülü olan yaklaşımında olay, inanç ve sonuç ayrımını kullandı. Piaget ve Vygotsky’nin gelişim kuramları ise düşüncenin nasıl değiştiğine yönelir. Bu ayrı araştırma sorusu gelişim psikolojisi dersinde açılır."
  ],
  "core": [
    {
      "heading": "Girişim ve karşılaştırma",
      "body": "Stroop benzeri bir düzende uyumlu ve uyumsuz koşulların yanı sıra nötr bir koşul kullanmak yararlıdır. Uyumlu koşul hızlandırabilir, uyumsuz koşul yavaşlatabilir. Tek bir fark alınca bu iki katkı birlikte görünür."
    },
    {
      "heading": "Bilgiyi kümelere ayırma",
      "body": "Miller’ın 1956 çalışması mutlak yargı ve kısa süreli bellek bulgularını ayırdı. Bir dizi öğe öğrenilmiş birimlere gruplanınca aynı örüntü daha az bağımsız parça olarak hatırlanabilir. Ünlü yedi sayısı evrensel sabit olarak kullanılmaz."
    },
    {
      "heading": "Olay, yorum ve sonuç",
      "body": "Ellis’in ABC şemasında olay A, inanç veya değerlendirme B, duygusal ve davranışsal sonuç C’dir. Beck’in yaklaşımında da kişinin aklına gelen ilk yorum ile olası alternatiflerin ayrımı önemlidir. Yorumun araştırılması olayın koşullarını ortadan kaldırmaz."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Sıra farkı",
        "predict": "İkinci blok daha hızlıysa hangi ölçüm bundan yararlanır?",
        "do": "Sentetik Stroop’ta önce uyumlu, sonra önce uyumsuzu seç.",
        "observe": "Başlangıç girdileriyle fark 70 ve 150 ms arasında değişir.",
        "explain": "Pratik aynı olmasına rağmen hangi gruba düştüğü farkı değiştirir."
      },
      {
        "title": "Sırayı dengele",
        "predict": "İki sıra dengelendiğinde fark kaç milisaniye olur?",
        "do": "Blok sırasını iki sıra dengeli yap, pratik katsayısını değiştir.",
        "observe": "Başlangıç girişim ve kolaylaştırmasıyla fark 110 ms kalır.",
        "explain": "Eşit pratik payı iki ortalama çıkarıldığında birbirini götürür."
      },
      {
        "title": "ABC kaydını ayır",
        "predict": "Mesajı yetersizlik olarak okumak hangi bileşene aittir?",
        "do": "ABC panelinde önce olay, sonra inanç veya yorum kaydını aç.",
        "observe": "Yetersizlik ifadesi mesajın kendisinde yer almaz.",
        "explain": "Bir bilişsel şema olayın metniyle ona verilen anlamı ayırır."
      }
    ]
  },
  "wow": [
    {
      "title": "Nötr koşul",
      "body": "Uyumlu ve uyumsuz arasındaki farkın tamamı girişimden gelmeyebilir. Nötr uyaran, iki katkıyı ayrı ölçmeye yarar."
    },
    {
      "title": "Ters işaret mümkün",
      "body": "Girişim küçük ve pratik büyükse tek bir blok sırası, toplam farkın eksi görünmesine bile yol açar."
    },
    {
      "title": "Gruplama birimi",
      "body": "Öğrenilmiş bir tarih, dört bağımsız rakam gibi hatırlanmayabilir. Öbekleme, hatırlama görevindeki etkili birimi değiştirir."
    }
  ],
  "worked": {
    "title": "Sıra farkını ayır",
    "prompt": "Girişim 90 ms, kolaylaştırma 20 ms ve pratik 40 ms. Önce uyumlu koşul ölçülürse karşılaştırma ne verir?",
    "steps": [
      "Uyumlu süre 600 − 20 = 580 ms.",
      "İkinci blok uyumsuz süresi 600 + 90 − 40 = 650 ms.",
      "650’den 580’i çıkar."
    ],
    "result": "Gözlenen fark 70 ms olur. Dengeli sırada aynı model 110 ms verir."
  },
  "misconceptions": [
    {
      "myth": "Tepki süresi doğrudan bir kişinin dikkatini ölçer.",
      "truth": "Tepki süresi algı, karar, motor yanıt ve deney sırası gibi birden çok etkeni yansıtır."
    },
    {
      "myth": "Olumsuz bir olayın tek bilişsel sonucu olur.",
      "truth": "Olayın yorumu ve önceki deneyimler farklı kişilerde veya koşullarda farklılaşabilir."
    }
  ],
  "glossary": [
    {
      "term": "Stroop girişimi",
      "definition": "Bir uyaranın ilgisiz boyutunun istenen tepkiyi geciktirmesi."
    },
    {
      "term": "Karşı dengeleme",
      "definition": "Olası sıra etkilerini koşullara eşit dağıtmak için sıraları değiştirme."
    },
    {
      "term": "Öbekleme",
      "definition": "Ayrı öğeleri bellekte daha büyük anlamlı birimler hâlinde düzenleme."
    },
    {
      "term": "Otomatik düşünce",
      "definition": "Beck’in yaklaşımında bir olay üzerine hızlı beliren yorum."
    },
    {
      "term": "ABC şeması",
      "definition": "Ellis’te olay, değerlendirme ve sonuç arasındaki kavramsal ayrım."
    }
  ],
  "bridge": {
    "body": [
      "Tepki süresi deneyindeki sıra etkisi, öğrenme görevlerindeki pratik etkisine benzer. Gelişim araştırmasında farklı yaştaki katılımcıları karşılaştırırken de görev deneyimini düşün."
    ],
    "topics": [
      "Dikkat",
      "Gelişim",
      "Deney sırası"
    ]
  },
  "quiz": [
    {
      "question": "Sıra etkisini dengelemek için hangi tasarım kullanılır?",
      "options": [
        "Her zaman önce uyumlu",
        "Her zaman önce uyumsuz",
        "İki sırayı da eşit kullanmak"
      ],
      "answer": 2,
      "explanation": "Her koşulun birinci ve ikinci sırada eşit ölçülmesi pratik etkisini dengeleyebilir."
    },
    {
      "question": "“Öğretmen projeyi yetersiz buldu” çıkarımı ABC’de nereye aittir?",
      "options": [
        "A · Olay",
        "B · Yorum",
        "C · Sonuç"
      ],
      "answer": 1,
      "explanation": "Yetersiz bulduğu mesajda yazmıyorsa bu öğrencinin değerlendirmesi olarak kaydedilir."
    },
    {
      "question": "Nötr koşul hangi iki katkıyı ayırmaya yarar?",
      "options": [
        "Kolaylaştırma ve girişim",
        "Sıra ve katılımcı sayısı",
        "Yaş ve kültür"
      ],
      "answer": 0,
      "explanation": "Nötr bir taban, uyumlu koşuldaki hızlanma ve uyumsuz koşuldaki yavaşlamayı ayrı ölçmeye yarar."
    }
  ],
  "next": [
    {
      "href": "gelisim-psikolojisi.html",
      "title": "Gelişim Psikolojisi",
      "why": "Piaget ve Vygotsky’nin gelişim sorularını karşılaştır"
    },
    {
      "href": "bellek-ve-ogrenme.html",
      "title": "Bellek ve Öğrenme: Unutma Eğrisi, Seri Konum, Çalışma Belleği, Yanlış Anılar",
      "why": "Hatırlama performansı ile öğrenme düzenini incele"
    }
  ],
  "sources": [
    {
      "title": "J. R. Stroop, Studies of Interference in Serial Verbal Reactions (1935)",
      "url": "https://psychclassics.yorku.ca/Stroop/",
      "note": "Renk adı ve sözcük yanıtlama düzeni."
    },
    {
      "title": "G. A. Miller, The Magical Number Seven, Plus or Minus Two (1956)",
      "url": "https://psychclassics.yorku.ca/Miller/",
      "note": "Bilginin öbeklenmesi ve ölçülerin ayrımı."
    },
    {
      "title": "A. T. Beck, Thinking and Depression I (1963)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/14045261/",
      "note": "Bilişsel içerik ve örüntüler."
    },
    {
      "title": "A. Ellis, Rational Psychotherapy (1958)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/13563813/",
      "note": "Ellis’in erken yaklaşımından bir makale."
    }
  ],
  "revision": "Kasım 2026"
};
