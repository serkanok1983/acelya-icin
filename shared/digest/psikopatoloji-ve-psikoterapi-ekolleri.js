window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["psikopatoloji-ve-psikoterapi-ekolleri"] = {
  "slug": "psikopatoloji-ve-psikoterapi-ekolleri",
  "title": "Psikopatoloji Modelleri ve Psikoterapi Ekolleri",
  "field": "Zihin ve Davranış",
  "level": "Lise–Lisans",
  "minutes": 35,
  "tagline": "Bir denemenin etkisi neyle karşılaştırıldığına bağlıdır. Ruhsal güçlüklerin açıklama modellerini, psikoterapi ekollerini ve sentetik bir klinik araştırmayı incele.",
  "hook": "Kurgusal bir araştırmada bir grupta ortalama 9 puan iyileşme var. Karşılaştırma grubunda 2 puan yerine 6 puan iyileşme bulunsaydı çalışmanın sonucu nasıl değişirdi?",
  "bigIdea": "Bir ruhsal güçlük modeli hangi etkenleri ölçtüğünü, bir psikoterapi denemesi ise hangi karşılaştırmaya dayandığını açıkça belirtir.",
  "story": [
    "George Engel’in biyopsikososyal modeli, sağlık ve hastalıkla ilgili biyolojik, psikolojik ve toplumsal süreçleri birlikte incelemeyi önerir. Yatkınlık ve stres modelleri, kişideki ve çevredeki etkenlerin zaman içindeki ilişkisine bakar. Bir açıklamayı sınamak için bu etkenleri nasıl ölçtüğümüzü ve hangi karşılaştırmada değiştiğini belirtmek gerekir.",
    "Kategorik tanı sistemleri ortak bir dil sağlar. Boyutsal araştırmada özelliklerin bir süreklilik boyunca nasıl değiştiği incelenir. NIMH’in Araştırma Alanı Ölçütleri programı RDoC, davranış ile biyolojik süreçler gibi birden çok analiz birimini ilişkilendirmek için oluşturulan bir araştırma çerçevesidir. Klinik tanı vermek için kullanılmaz."
  ],
  "core": [
    {
      "heading": "Ekollerin birimleri",
      "body": "Psikodinamik yaklaşımlar tekrar eden duygu ve ilişki örüntülerine, bilişsel ve davranışsal yaklaşımlar yorum ve öğrenme süreçlerine, kişi merkezli yaklaşım kişinin yaşantısına ve ilişkiye, sistemik yaklaşımlar aile veya diğer ilişki ağlarındaki etkileşimlere odaklanabilir."
    },
    {
      "heading": "Hangi grup karşılaştırılıyor?",
      "body": "Bekleme listesi ile karşılaştırma, hemen sunulan bir programla beklemeye atanmanın ortalama farkını verir. Olağan hizmet veya önceden tanımlanmış etkin karşılaştırma farklı bir soru sorar. Gruplara rastgele atama ve eksik kayıtların takibi sonuçların yorumunu destekler."
    },
    {
      "heading": "Belirsizlik ve destek",
      "body": "Bir ortalama, tek bir kişinin sonucu hakkında kesinlik vermez. Grup etkisini örneklem, belirsizlik aralığı, izlem ve olası olumsuz sonuçlarla birlikte değerlendir. Kişisel destek için bir sağlık profesyoneline başvurulabilir. Türkiye’de acil durumlar için 112 aranır."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Bekleme değişince",
        "predict": "Karşılaştırma grubu daha çok ilerlerse fark nasıl değişir?",
        "do": "Karşılaştırma olarak önce bekleme, sonra olağan hizmet, sonra etkin grubu seç.",
        "observe": "Çalışma grubunda 9 sabit kalırken fark 7, 4 ve 3 olur.",
        "explain": "Atamaların neyle karşılaştırıldığı, sonucun ifade ettiği etkiyi değiştirir."
      },
      {
        "title": "Değişkenliği artır",
        "predict": "Standart sapma büyüyünce iki ortalamanın farkı değişir mi?",
        "do": "Etkin karşılaştırmayı seç ve standart sapmayı 5’ten 10’a çıkar.",
        "observe": "Puan farkı 3 kalır, standartlaştırılmış fark 0,6’dan 0,3’e iner.",
        "explain": "Ölçüt, aynı farkı daha geniş saçılım birimleriyle ifade eder."
      },
      {
        "title": "Birimleri ayır",
        "predict": "Tek bireyin hikâyesi ve bir takımın iletişimi nasıl ayrılır?",
        "do": "Kuramsal yaklaşımda kişi merkezli ve sistemik seçenekleri karşılaştır.",
        "observe": "İlkinde öznel bildirim, ikincide etkileşim ölçüleri öne çıkar.",
        "explain": "Bir araştırma sorusu hangi düzeyde veri toplandığını belirtir."
      }
    ]
  },
  "wow": [
    {
      "title": "Karşılaştırılan koşul",
      "body": "Cuijpers ve çalışma arkadaşlarının meta-analizinde, bekleme listesi ve olağan hizmet kullanılan denemeler farklı etki büyüklükleri verdi."
    },
    {
      "title": "Ortalama ve yayılım",
      "body": "İki grubun farkı aynı olsa bile puanların yayılımı değiştiğinde farkın standart sapma birimindeki karşılığı değişir."
    },
    {
      "title": "Araştırma eksenleri",
      "body": "RDoC, bir davranış işlevini kişinin bildirimi, gözlem ve daha başka analiz birimlerinde araştırmaya elverişli bir çerçeve olarak tasarlandı."
    }
  ],
  "worked": {
    "title": "Farkı ortak ölçeğe getir",
    "prompt": "Sentetik denemede gruplar 9 ve 6 puan ilerledi. Ortak standart sapma 5 puan ise standartlaştırılmış fark kaçtır?",
    "steps": [
      "Ortalama farkını 9 − 6 = 3 puan hesapla.",
      "Farkı ortak standart sapmaya böl."
    ],
    "result": "3 ÷ 5 = 0,6 standart sapma."
  },
  "misconceptions": [
    {
      "myth": "Bir gruptaki ilerleme tümüyle uygulamadan gelir.",
      "truth": "Zaman ve başka etkenler de değişim yaratabilir. Kontrollü karşılaştırma, varsayılan etkiyi ayırmaya çalışır."
    },
    {
      "myth": "RDoC yeni bir klinik tanı listesidir.",
      "truth": "RDoC boyutları ve analiz birimleriyle tasarlanmış bir araştırma çerçevesidir."
    }
  ],
  "glossary": [
    {
      "term": "Biyopsikososyal model",
      "definition": "Sağlıkta biyolojik, psikolojik ve toplumsal süreçlerin ilişkisini araştıran çerçeve."
    },
    {
      "term": "Yatkınlık",
      "definition": "Belirli koşullarda güçlük olasılığıyla ilişkilendirilen bireysel veya gelişimsel etken."
    },
    {
      "term": "Etkin karşılaştırma",
      "definition": "Araştırılan uygulamayla karşılaştırılan, önceden tanımlanmış başka bir uygulama."
    },
    {
      "term": "Rastgele atama",
      "definition": "Deney koşullarını katılımcılara şansa dayalı biçimde verme."
    },
    {
      "term": "Standartlaştırılmış fark",
      "definition": "İki ortalama arasındaki farkın ortak yayılım birimiyle ifade edilmesi."
    }
  ],
  "bridge": {
    "body": [
      "Klinik araştırma dersinde rastgele atamanın, psikometri dersinde ise ölçümün deneme sonuçlarına nasıl yansıdığına bak. Bir makalede grupları, ölçeği ve izlem süresini birlikte kaydet."
    ],
    "topics": [
      "Klinik araştırma",
      "Ölçme",
      "Etki büyüklüğü"
    ]
  },
  "quiz": [
    {
      "question": "Çalışma grubu aynı kalıp karşılaştırma daha çok ilerlerse fark ne olur?",
      "options": [
        "Artar",
        "Azalır",
        "Aynı kalır"
      ],
      "answer": 1,
      "explanation": "Karşılaştırmanın ortalaması yükselirken iki ortalama arasındaki fark küçülür."
    },
    {
      "question": "RDoC’un amacı nedir?",
      "options": [
        "Klinik tanı vermek",
        "İlaç seçmek",
        "Araştırma sorularını düzenlemek"
      ],
      "answer": 2,
      "explanation": "RDoC analiz birimleri ve davranış işlevleri etrafında kurulmuş bir araştırma programıdır."
    },
    {
      "question": "Hangi yaklaşım ilişki ağındaki karşılıklı davranışı ölçer?",
      "options": [
        "Sistemik",
        "Tek ipuculu koşullanma",
        "Psikofizik"
      ],
      "answer": 0,
      "explanation": "Sistemik yaklaşım, kişiyle birlikte ilişki içindeki etkileşim düzenini de inceler."
    }
  ],
  "next": [
    {
      "href": "epidemiyoloji-ve-klinik-arastirma.html",
      "title": "Epidemiyoloji ve Klinik Araştırma: Risk, Karıştırıcı, Randomizasyon ve Kanıt",
      "why": "Atama ve karşılaştırma yöntemlerinin araştırmadaki etkisini gör"
    },
    {
      "href": "psikiyatri-tarihi-ve-tani-sistemleri.html",
      "title": "Psikiyatri Tarihi ve Tanı Sistemleri: Sınıflama, Güvenilirlik, Taban Oranı",
      "why": "Sınıflamaların tarihsel oluşumunu ve güvenirliğini incele"
    }
  ],
  "sources": [
    {
      "title": "G. L. Engel, The Need for a New Medical Model (1977)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/847460/",
      "note": "Biyopsikososyal modelin ilk metinlerinden biri."
    },
    {
      "title": "NIMH, Araştırma Alanı Ölçütleri",
      "url": "https://www.nimh.nih.gov/research/research-funded-by-nimh/rdoc/about-rdoc",
      "note": "Boyutsal araştırma çerçevesi."
    },
    {
      "title": "P. Cuijpers ve çalışma arkadaşları, Bekleme listesi ile olağan hizmet karşılaştırması (2024)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/39501660/",
      "note": "Karşılaştırma grubunun etki büyüklüğüne etkisi."
    },
    {
      "title": "OpenStax, Psikoterapi Türleri",
      "url": "https://openstax.org/books/psychology-2e/pages/16-2-types-of-treatment",
      "note": "Ekollerin tarihsel ve kavramsal ayrımı."
    },
    {
      "title": "T.C. İçişleri Bakanlığı, 112 Acil Çağrı Merkezi",
      "url": "https://www.icisleri.gov.tr/kurumlar/icisleri.gov.tr/IcSite/strateji/raporlar/performans-programlari/2022_Performans_Programi.pdf",
      "note": "112’nin acil durumlar için resmî çağrı numarası olduğu kaynak."
    }
  ],
  "revision": "Kasım 2026"
};
