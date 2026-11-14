window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["sosyal-psikoloji"] = {
  "slug": "sosyal-psikoloji",
  "title": "Grup, Durum ve Davranış",
  "field": "Zihin ve Davranış",
  "level": "Lise–Lisans",
  "minutes": 22,
  "tagline": "Yanıtın görünürlüğünü ve yardım fırsatının güçlüğünü değiştirin. Kurgusal iki çalışmayı karşılaştırın.",
  "hook": "Kalabalıktaki birinin verdiği yanıtı tek başına olsa da vereceğini nasıl bilebilirsiniz? İçinde bulunduğu durum, gözlediğiniz davranışın bir parçası olabilir.",
  "bigIdea": "Davranışı yorumlamadan önce ölçülen durumu ve grupların hangi koşullarda karşılaştırıldığını inceleyin.",
  "story": [
    "Sosyal psikoloji çevredeki insanların, normların ve rollerin düşünce veya davranışla ilişkisini araştırır. Herkes aynı sırada duruyorsa kişi bunun işe yaradığını düşünebilir, gruba aykırı görünmek istemeyebilir ya da ikisini birden yaşayabilir.",
    "Çizgi karşılaştırmalarıyla bilinen Asch çalışmalarında araştırmacı katılımcının çevresindeki yanıtları düzenlemiştir. Bu sayfadaki oranlar o çalışmalara ait değildir. Burada şartlar arasındaki basit farkı nasıl okuyacağınızı yapay örneklerle denersiniz."
  ],
  "core": [
    {
      "heading": "Normatif ve bilgisel etki",
      "body": "Kabul görme isteğiyle gruba uyum normatif etkiyle, başkalarının doğruyu bildiğini düşünerek uyum bilgisel etkiyle ilişkilidir. Bu süreçler aynı anda işleyebilir. Açık veya gizli yanıt tek başına niyeti ölçmez."
    },
    {
      "heading": "Rastgele atama",
      "body": "Katılımcıların koşullara rastgele dağıtılması, başlangıçtaki farkları tek bir koşula yığmama amacını taşır. Bir çalışmanın sonuç özeti oranların yanı sıra örnekleme belirsizliğini ve uygulama koşullarını da belirtmelidir."
    },
    {
      "heading": "Bağlama göre oran",
      "body": "Oranları toplarken kolay ve zor fırsatlar aynı paya sahip olmayabilir. Her tabakada aynı yön görüldüğü halde toplam ters yönde çıkabilir. Bölme, ilgili koşulları görünür kılar ama kendiliğinden nedensellik sağlamaz."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Açık ve gizli yanıt",
        "predict": "Açık koşulda uyma oranı gizli koşulun kaç yüzde puan üzerinde?",
        "do": "Görevin güçlüğü için Açık seçik çizgi karşılaştırması'nı seçin. Veri tablosunu açın.",
        "observe": "14 / 40 = % 35 ve 6 / 40 = % 15. Fark 20 yüzde puan.",
        "explain": "Her oran kendi koşulundaki kişi sayısına bölünür. Sonra oranlar doğrudan çıkarılır."
      },
      {
        "title": "Görev güçlüğü",
        "predict": "Belirsiz çizgilerde iki oran da artabilir mi?",
        "do": "Görevin güçlüğü'nü Belirsiz çizgi karşılaştırması olarak değiştirin.",
        "observe": "% 60 ve % 40 görünür. İki oran yükselir, fark 20 yüzde puan kalır.",
        "explain": "Yapay düzen, görev güçlüğünün oranlara ortak katkısı olabileceği bir örnek. Gerçek mekanizmayı göstermek için ek ölçüm gerekir."
      },
      {
        "title": "Toplam ve tabaka",
        "predict": "A grubu toplamda öndeyse benzer fırsatlarda da önde mi?",
        "do": "Karşılaştırılan fırsat'ı Tümü, Kolay, Zor olarak sırayla seçin. A − B farkını okuyun.",
        "observe": "Fark toplamda +33, kolayda −5, zorda −10 yüzde puan.",
        "explain": "A'nın kayıtlarında yüksek başarı olasılıklı kolay fırsatlar ağırlıkta. Toplam bu farklı bileşimleri içeriyor."
      }
    ]
  },
  "wow": [
    {
      "title": "Bir fark, birkaç olası neden",
      "body": "Açık ve gizli yanıtlar arasında fark gözlemek, kararın gerekçesini tek başına belirlemeye yetmez."
    },
    {
      "title": "Ağırlıklar sıralamayı değiştirir",
      "body": "Alt grupların payları farklı olduğunda bütün verinin yönü her alt gruptaki yönün tersi olabilir."
    },
    {
      "title": "Aynı sonuç, farklı tasarım",
      "body": "Gözlemsel bir kayıtla deney aynı oranı gösterebilir. Nedensel yorum, sayının kendisi kadar tasarıma bağlıdır."
    }
  ],
  "worked": {
    "title": "Toplam yardım farkını bul",
    "prompt": "A kolayda 72/80, zorda 4/20. B kolayda 19/20, zorda 24/80. Toplam fark nedir?",
    "steps": [
      "A'da 72 + 4 = 76 yardım, 80 + 20 = 100 fırsat.",
      "B'de 19 + 24 = 43 yardım, 20 + 80 = 100 fırsat.",
      "% 76 − % 43 = 33 yüzde puan."
    ],
    "result": "Toplamda A 33 yüzde puan önde. Kolay ve zor fırsatlar tek tek ele alındığında B önde."
  },
  "misconceptions": [
    {
      "myth": "Gruba uyan herkes aynı şeyi düşünüyor.",
      "truth": "Uyma davranışı aynı olsa bile bilgi edinme, kabul görme ve başka nedenlerin katkısı kişiye göre farklı olabilir."
    },
    {
      "myth": "Toplam örnek büyüyünce karıştırıcı ortadan kalkar.",
      "truth": "Büyük bir örnek daha hassas bir oran verebilir. Karşılaştırılan grupların bileşimi yine ayrı bir sorudur."
    }
  ],
  "glossary": [
    {
      "term": "Norm",
      "definition": "Bir grubun davranışla ilgili paylaşılan beklentisi."
    },
    {
      "term": "Uyma",
      "definition": "Kişinin tutumunu veya davranışını bir grup normuna yaklaştırması."
    },
    {
      "term": "Atıf",
      "definition": "Bir davranış için kişiyle veya durumla ilgili neden çıkarımı."
    },
    {
      "term": "Rastgele atama",
      "definition": "Katılımcıları çalışma koşullarına şans yoluyla dağıtma."
    },
    {
      "term": "Simpson paradoksu",
      "definition": "Bir ilişkinin tabakalarda ve birleşik veride ters yönlü görünmesi."
    }
  ],
  "bridge": {
    "body": [
      "Sosyal Psikoloji ve Araştırma Yöntemleri derslerinde aynı hipotezin farklı görev ve örneklemlerde sınanması önemlidir. Nedensel bir iddia için hangi değişkenin nasıl değiştirildiğini, kimlerin izlendiğini ve hangi karşılaştırmanın yapıldığını belirleyin."
    ],
    "topics": [
      "Toplumsal etki",
      "Deney tasarımı",
      "Nedensel çıkarım"
    ]
  },
  "quiz": [
    {
      "question": "% 60 ile % 40 arasındaki fark kaç yüzde puandır?",
      "options": [
        "40",
        "50",
        "20"
      ],
      "answer": 2,
      "explanation": "Yüzde puan hesabında iki yüzdeyi doğrudan çıkarın."
    },
    {
      "question": "Grup doğru biliyor diye yanıtını benimsemek en çok hangi etkiye örnektir?",
      "options": [
        "Bilgisel etki",
        "Ölçüm hatası",
        "Katılımcı kaybı"
      ],
      "answer": 0,
      "explanation": "Bu örnekte grubun doğruluk hakkında bilgi sağladığı varsayılıyor."
    },
    {
      "question": "Toplam yardım oranı ters sıralama veriyorsa ilk hangi ölçüye bakılır?",
      "options": [
        "Sadece A'nın toplamına",
        "Fırsat türleri ve ağırlıklarına",
        "Ölçüm saatinin adına"
      ],
      "answer": 1,
      "explanation": "Tabakaların oranı ve her gruptaki bileşim hangi etkinin toplama girdiğini gösterir."
    }
  ],
  "next": [
    {
      "href": "gelisim-psikolojisi.html",
      "title": "Gelişim Psikolojisi",
      "why": "Kuşak farkıyla yaş etkisinin aynı karşılaştırmada nasıl birleşebildiğine bakın."
    },
    {
      "href": "sosyal-modeller-ve-aglar.html",
      "title": "Sosyal Modeller ve Ağlar: Basit Kurallar, Şaşırtıcı Toplumlar",
      "why": "Davranışların bağlantılar boyunca yayılması için kullanılan modelleri deneyin."
    }
  ],
  "sources": [
    {
      "title": "OpenStax · Uyma, razı olma ve itaat",
      "url": "https://openstax.org/books/psychology-2e/pages/12-4-conformity-compliance-and-obedience",
      "note": "Asch çalışmaları ve etki türleri."
    },
    {
      "title": "OpenStax · Bulguları analiz etme",
      "url": "https://openstax.org/books/psychology-2e/pages/2-3-analyzing-findings",
      "note": "Rastgele atama ve deney koşulları."
    }
  ],
  "revision": "Kasım 2026"
};
