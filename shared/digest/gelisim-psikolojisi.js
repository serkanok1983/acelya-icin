window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["gelisim-psikolojisi"] = {
  "slug": "gelisim-psikolojisi",
  "title": "Yaş ve Kuşak Nasıl Ayrılır?",
  "field": "Zihin ve Davranış",
  "level": "Lise–Lisans",
  "minutes": 21,
  "tagline": "Kesitsel ve boylamsal veriye geçiş yapın. Yapay bir ölçümde yaş, kuşak ve ölçüm koşulunun katkısını ayırın.",
  "hook": "Kırk yaşındakiler bir görevde yirmi yaşındakilerden düşük puan aldı. Aynı insanların yirmi yıl önceki puanını bilmeden ne kadarını yaşa bağlayabilirsiniz?",
  "bigIdea": "Yaş grupları arasındaki fark, aynı kişinin zaman içinde ne kadar değiştiğini tek başına göstermez.",
  "story": [
    "Gelişim psikolojisi doğum öncesinden ileri yaşa kadar bedendeki, düşünmedeki ve ilişkilerdeki değişimi inceler. Bir çocuğun yeni bir kuralı öğrenmesi, bir yetişkinin yaşam geçişine uyumu, ileri yaşta bildik bir işi başka yöntemle yapması farklı gelişim örüntüleridir.",
    "Araştırma tasarımı öğrendiğimiz şeyin sınırını çizer. Tek bir yılda farklı kuşakları ölçmek hızlı bir karşılaştırma verir. Aynı kişileri izlemek değişimi gösterir ama arada ölçüm biçimi veya katılan insanlar değişebilir. Tasarım değişince sorulan soru da değişir."
  ],
  "core": [
    {
      "heading": "Yaş ve kuşak",
      "body": "Aynı yaşta ölçülen iki farklı kuşak farklı dönemlerden geçmiştir. Eğitim, dil, teknolojiye erişim ve doğum koşulları fark yaratabilir. Tek yılda yaş ile doğum kuşağı birlikte değişir."
    },
    {
      "heading": "Kesitsel ve boylamsal",
      "body": "Kesitsel düzen aynı dönemde farklı grupları ölçer. Boylamsal düzen aynı kişilerin ölçümlerine zaman ekler. İkincisi kuşak karşılaştırmasını azaltır ama alıştırma etkisi ve katılımcı kaybıyla karşılaşabilir."
    },
    {
      "heading": "Gelişim kuramı ve ölçüm",
      "body": "Kuram gözlemi örgütler. Kesikli evre açıklamaları stratejinin nitel değişimine, süreklilik açıklamaları birikimli değişime dikkat çeker. Bir görevin sözcükleri, yönergesi ve ölçme sınırı hangi örüntünün görünür olacağını etkiler."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Kesitsel fark",
        "predict": "Kuşak farkı büyütülürse aynı yaştaki kişiler mi değişir, yaşlar arası karşılaştırma mı?",
        "do": "Araştırma düzeni olarak Kesitsel ve sıra olarak Birinci seçin. Kuşak başına başlangıç farkı'nı 0, sonra 6 puan yapın.",
        "observe": "Son − ilk puan farkı −8'den −20 puana gider. Karşılaştırılan yaşlar aynı kalır.",
        "explain": "Yaş etkisine iki kuşak aralığının toplam 12 puanlık başlangıç farkı eklenir."
      },
      {
        "title": "Tek kuşağı izle",
        "predict": "Aynı kişiler yeniden ölçülünce kuşak ofseti farkı değiştirir mi?",
        "do": "Boylamsal düzeni ve Birinci sırayı seçin. Kuşak başına başlangıç farkı'nı −8'den 8'e getirin.",
        "observe": "Son − ilk puan farkı −8 puan kalır. Her nokta aynı kuşağa aittir.",
        "explain": "Aynı kuşağı kendiyle karşılaştırınca başlangıç farkı çıkarma işleminde birbirini götürür."
      },
      {
        "title": "Ortadaki ölçüm",
        "predict": "Arada ortam değişirse başlangıç ve son farkı bunu yakalar mı?",
        "do": "Boylamsal düzende İkinci yıldaki ölçüm farkı'nı 0'dan −10'a çekin. Veri tablosunu açın.",
        "observe": "Takip yılı 10 olan nokta 10 puan aşağı iner. Takip yılı 0 ve 20 değişmez.",
        "explain": "Bir dönem etkisi yalnız o dönem ölçülen örnekleri kaydırabilir. Uç değerlerin özeti ara düşüşü gizler."
      }
    ]
  },
  "wow": [
    {
      "title": "Eğim bakış açısına bağlı",
      "body": "Aynı yapay veri kesitsel çizildiğinde kuşak farkını da, boylamsal çizildiğinde kişilerin zaman değişimini de görünür kılabilir."
    },
    {
      "title": "Alıştırma etkisi",
      "body": "Aynı göreve yeniden katılmak performansı değiştirebilir. Araştırma düzeni de ölçümün bir parçasıdır."
    },
    {
      "title": "Üç değişken birbirine bağlı",
      "body": "Takvim yılından doğum yılını çıkarınca yaş bulunur. Her üç etkinin ayrı tahmini ek varsayım gerektirir."
    }
  ],
  "worked": {
    "title": "Bir puan farkını çözümle",
    "prompt": "Modelde genç kuşak başlangıçta 92, yaşlı kuşak 72 puan alıyor. Yaş farkı 20 yıl ve yaş etkisi yılda −0,4. Ne kadar fark kuşak teriminden gelir?",
    "steps": [
      "Yaş terimi 20 × (−0,4) = −8 puan.",
      "Kesitsel son − ilk fark 72 − 92 = −20 puan.",
      "Geriye −20 − (−8) = −12 puan kalır."
    ],
    "result": "İki kuşak aralığı için toplam −12 puanlık başlangıç bileşeni."
  },
  "misconceptions": [
    {
      "myth": "Gelişim yalnız çocuklukta olur.",
      "truth": "Biyolojik, bilişsel ve psikososyal değişimler yaşam boyunca farklı biçimlerde sürer."
    },
    {
      "myth": "Boylamsal tasarım bütün karıştırıcıları ortadan kaldırır.",
      "truth": "Kuşak sabit tutulsa da alıştırma, dönem etkisi ve seçici katılımcı kaybı sonucu değiştirebilir."
    }
  ],
  "glossary": [
    {
      "term": "Kesitsel tasarım",
      "definition": "Farklı katılımcı gruplarının aynı ölçüm döneminde karşılaştırılması."
    },
    {
      "term": "Boylamsal tasarım",
      "definition": "Aynı katılımcıların birden çok dönemde yeniden ölçülmesi."
    },
    {
      "term": "Kuşak etkisi",
      "definition": "Ortak doğum dönemiyle birlikte gelen deneyim farkının ölçüme yansıması."
    },
    {
      "term": "Dönem etkisi",
      "definition": "Belirli bir ölçüm zamanının koşullarındaki ortak etki."
    },
    {
      "term": "Psikososyal gelişim",
      "definition": "Kimlik, duygu ve ilişkilerin yaşam boyunca değişimi."
    }
  ],
  "bridge": {
    "body": [
      "Gelişim Psikolojisi ve Araştırma Yöntemleri derslerinde yaşı, dönemi ve kuşağı örneklem seçimiyle birlikte tartışın. Bir görevdeki puanın zaman içinde aynı şeyi ölçüp ölçmediğini sınamak da gerekir."
    ],
    "topics": [
      "Yaşam boyu gelişim",
      "Ölçüm değişmezliği",
      "Boylamsal tasarım"
    ]
  },
  "quiz": [
    {
      "question": "Kesitsel tasarımda hangi karşılaştırma yapılır?",
      "options": [
        "Aynı kişilerin farklı yılları",
        "Farklı kişilerin aynı dönemi",
        "Yalnız bir kişide bir ölçüm"
      ],
      "answer": 1,
      "explanation": "Grupların aynı dönemde ölçülmesi, kişilerin izlendiği anlamına gelmez."
    },
    {
      "question": "Üç boylamsal ölçümden yalnız ortadaki değişirse son − ilk fark ne olur?",
      "options": [
        "Aynı kalır",
        "İkiye katlanır",
        "Sıfır olur"
      ],
      "answer": 0,
      "explanation": "İki uç aynı kaldığı için fark değişmez. Çizgi veya tablo ara hareketi gösterir."
    },
    {
      "question": "Takipte çalışmadan ayrılanlar seçiciyse ne olabilir?",
      "options": [
        "Yalnız hesap hızlanır",
        "Kuşak sayısı artar",
        "Kalanlar farklı bir örneklem olur"
      ],
      "answer": 2,
      "explanation": "Katılımcı kaybı performansla ilişkiliyse aynı kişiler hakkında genelleme değişebilir."
    }
  ],
  "reasoning": [
    {
      "title": "Tablet hızı ve kuşak farkı",
      "example": "Yapay gözlem. Aynı yıl, 20–25 ve 65–70 yaş aralığındaki iki gruba tablet üzerinde yeni bir sıralama görevi veriliyor. Genç grubun ortalaması daha hızlı. Tablet kullanım geçmişi ölçülmemiş.",
      "prompt": "Yaş dışındaki bir açıklamayı göster. Kişi içindeki değişimi görmek için bir izleme tasarımı öner. Aynı göreve daha önce girmiş olmak sonuçları nasıl değiştirebilir?",
      "model": "Tablet deneyimi yaş grupları arasında farklıysa hız farkına katkıda bulunabilir. Aynı kişileri belirli aralıklarla ölçüp tablet kullanımlarını da kaydetmek kişi içi değişimi görmeyi sağlar. Aynı görev tekrar edildiğinde öğrenme etkisi yaratabilir. Eşdeğer görev sürümleri ve izlemden ayrılan kişilerin incelenmesi yorumu iyileştirir."
    }
  ],
  "next": [
    {
      "href": "psikometri-ve-olcme.html",
      "title": "Psikometri: Güvenirlik, Geçerlik, Faktör Analizi, Madde Tepki Kuramı, Normlar",
      "why": "Görev puanının neyi ölçtüğünü ve ölçümün tutarlılığını sorgulayın."
    },
    {
      "href": "sosyal-psikoloji.html",
      "title": "Sosyal Psikoloji",
      "why": "Araştırma düzeninin grup etkisine dair yorumu nasıl değiştirdiğini görün."
    }
  ],
  "sources": [
    {
      "title": "OpenStax · Yaşam boyu gelişim",
      "url": "https://openstax.org/books/psychology-2e/pages/9-1-what-is-lifespan-development",
      "note": "Gelişim alanları ve araştırma soruları."
    },
    {
      "title": "OpenStax · Gelişim kuramları",
      "url": "https://openstax.org/books/psychology-2e/pages/9-2-lifespan-theories",
      "note": "Piaget ve Vygotsky."
    },
    {
      "title": "OpenStax · Araştırma yaklaşımları",
      "url": "https://openstax.org/books/psychology-2e/pages/2-2-approaches-to-research",
      "note": "Kesitsel ve boylamsal düzen."
    }
  ],
  "revision": "Kasım 2026"
};
