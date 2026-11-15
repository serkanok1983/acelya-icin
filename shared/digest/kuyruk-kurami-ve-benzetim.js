window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kuyruk-kurami-ve-benzetim"] = {
  "slug": "kuyruk-kurami-ve-benzetim",
  "title": "Kuyruk Hangi Hızda Büyür?",
  "field": "Mühendislik",
  "level": "Lise–Lisans",
  "minutes": 24,
  "tagline": "Tek hizmet noktasında beklemeyi olay benzetimiyle ölçün. Kapasiteye yaklaşınca durağan kuramın ne söylediğini karşılaştırın.",
  "hook": "Bir vezne saatte 18 kişiyle ilgilenebiliyorsa ve ortalama 12 kişi geliyorsa ne kadar beklersiniz? Bazı dakikalarda kimse gelmez, bazılarında üç kişi art arda gelebilir.",
  "bigIdea": "Ortalama kapasitenin talebi aşması beklemeyi yok etmez. Talep kapasiteye yaklaşınca bekleme hızla büyür.",
  "story": [
    "Kuyruk, kıt bir hizmetin zaman içinde paylaşılmasıdır. Bir sunucu boşken gelen iş hemen başlar. Aynı sunucu meşgulse yeni iş önceki işlerin bitmesini bekler. Akışların ortalamaları aynı görünse bile sürelerin dağılımı bu beklemeyi değiştirebilir.",
    "Benzetimde saati saniye saniye ilerletmek yerine bir sonraki geliş anına atlarız. Sunucunun hangi anda boşalacağını bilmek yeterlidir. Birkaç bin yapay müşterinin beklemesine bakınca kısa gözlemin mi, durağan kuramın mı konuştuğunu ayırmak gerekir."
  ],
  "core": [
    {
      "heading": "M/M/1",
      "body": "İlk M, Poisson gelişlerini ve üstel geliş aralarını, ikinci M ise bağımsız üstel hizmet sürelerini belirtir. 1 tek sunucudur. Bu modelde bekleme alanı sınırsızdır ve geliş sırası korunur."
    },
    {
      "heading": "Durağanlık",
      "body": "Gelişler hizmet kapasitesinden yavaşsa durağan dağılım vardır. Geliş ve hizmet hızı arasındaki pay küçülürken ortalama sistem süresi büyür. Hizmet süresini çıkarınca kuyrukta bekleme kalır.",
      "formula": "W = 1/(μ − λ)"
    },
    {
      "heading": "Little yasası",
      "body": "Ortalama kişi sayısını bulmak için ortalama kalış süresini aynı sınırdan geçen etkin geliş hızıyla çarpın. Dakika cinsinden süreyi saatlik hızla doğrudan çarpmayın.",
      "formula": "L<sub>q</sub> = λW<sub>q</sub>"
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "Başlangıçtaki kuram",
        "predict": "12 kişi/saat gelişte kuyrukta bekleme 10 dakika mı olur?",
        "do": "Geliş hızı 12 ve Hizmet hızı 18 olsun. Kuramsal kuyruk beklemesi ile Kuramsal sistemde kalış kutularını okuyun.",
        "observe": "Bekleme 6,67 dk. Hizmet dahil kalış 10 dk. Aradaki fark yaklaşık 3,33 dk.",
        "explain": "10 dakikanın içine ortalama hizmet süresi de girer. Kuyruk yalnız hizmet öncesi süreyi sayar."
      },
      {
        "title": "Tohumu değiştir",
        "predict": "Bütün benzetim sonuçları aynıysa tohumun bir etkisi var mı?",
        "do": "Geliş ve hizmeti sabit tutun. Rastgele sayı tohumu değerini 7 yerine 8 yapın.",
        "observe": "Ölçüm ortalaması ve o ortalamanın izi değişir. Kuram çizgisi aynı yerde kalır.",
        "explain": "Farklı örneklem aynı olasılık yasasından gelir. Sonlu ölçümlerde farklı ortalamalar beklenir."
      },
      {
        "title": "Kapasite sınırı",
        "predict": "Sunucu yükü % 100 olduğunda sonlu örneklemden bir değer çıkar mı?",
        "do": "Geliş hızı ve Hizmet hızı değerlerini 18 kişi/saat yapın.",
        "observe": "Benzetim ölçümü var. Durağan kuramsal ortalama ve ölçüm farkı gösterilmez.",
        "explain": "Sonlu bir çalıştırmada süreler sayılabilir. Bu sayı uzun dönemli durağan bir ortalama oluşturmaz."
      }
    ]
  },
  "wow": [
    {
      "title": "Boş zaman beklemeyi önlemez",
      "body": "Durağan tek sunucu zamanın bir bölümünde boş kalırken yine de bazı gelen işler kuyrukta bekler."
    },
    {
      "title": "Sınıra yaklaşmak",
      "body": "Hizmetle geliş arasındaki saatlik fark altıdan üçe düşerse kuramsal sistem süresi iki katına çıkar."
    },
    {
      "title": "Isınma süresi",
      "body": "Benzetim boş başlatıldığında ilk gözlemler gerçek durağan kuyruğa benzemeyebilir. Başlangıç örnekleri dışarıda bırakılır."
    }
  ],
  "worked": {
    "title": "Kuyrukta ortalama kaç kişi?",
    "prompt": "λ = 12 ve μ = 18 kişi/saat olan M/M/1 için ortalama kuyruk uzunluğunu bulun.",
    "steps": [
      "Sistemde kalış 1/(18 − 12) saat = 10 dk.",
      "Hizmet 1/18 saat. Kuyrukta bekleme 1/6 − 1/18 = 1/9 saat.",
      "Little yasasıyla 12 kişi/saat ile 1/9 saati çarpın."
    ],
    "result": "Ortalama 4/3 ≈ 1,33 kişi kuyruktadır."
  },
  "misconceptions": [
    {
      "myth": "% 50 kullanımda kimse beklemez.",
      "truth": "Ardışık gelişler bir hizmet tamamlanmadan önce gerçekleşebilir. Boş zaman ve kuyruk bir arada görülebilir."
    },
    {
      "myth": "Bir benzetimde yakın sonuç çıkması modeli kanıtlar.",
      "truth": "Uyum uygulamanın iç tutarlılığına işaret eder. Gerçek sistem için dağılımlar ve sıra politikası ölçülmelidir."
    }
  ],
  "glossary": [
    {
      "term": "Geliş hızı",
      "definition": "Birim zamanda sisteme giren işlerin ortalama sayısı."
    },
    {
      "term": "Hizmet hızı",
      "definition": "Sunucu sürekli meşgulse birim zamanda işleyebildiği ortalama iş sayısı."
    },
    {
      "term": "Sunucu yükü",
      "definition": "Geliş hızının hizmet hızına oranı."
    },
    {
      "term": "Durağan dağılım",
      "definition": "Model zamanla ilerlerken değişmeyen durum olasılıkları."
    },
    {
      "term": "Ayrık olay benzetimi",
      "definition": "Sistemi sürekli zaman adımlarıyla değil, olay anlarında güncelleme yöntemi."
    }
  ],
  "bridge": {
    "body": [
      "Yöneylem Araştırması dersinde çok sunuculu ağlar, kapasite kısıtları ve sıra öncelikleri devreye girer. Benzetim tekrarları güven aralıklarıyla birlikte raporlanabilir."
    ],
    "topics": [
      "Doğum–ölüm süreçleri",
      "Kuyruk ağları",
      "Benzetim çıktısı analizi"
    ]
  },
  "quiz": [
    {
      "question": "Bir saatlik hızla 5 dakikalık beklemeyi Little yasasında nasıl çarparsınız?",
      "options": [
        "Hızı 5 ile çarparım",
        "5/60 saati kullanırım",
        "60 ile çarparım"
      ],
      "answer": 1,
      "explanation": "Hız saat başına verildiği için süreyi saate dönüştürün."
    },
    {
      "question": "λ = μ durumunda benzetimin verdiği sonlu sayı neyi gösterir?",
      "options": [
        "Durağan ortalama",
        "Sonsuz örneklem",
        "Bu çalıştırmanın örnek ortalaması"
      ],
      "answer": 2,
      "explanation": "Durağan ortalama için λ küçük olmalıdır. Sonlu koşuda bir örneklem sayısı elde edilir."
    },
    {
      "question": "Sistem süresine hangi iki bileşen girer?",
      "options": [
        "Kuyruk ve hizmet",
        "Yalnız hizmet",
        "Yalnız kuyruk"
      ],
      "answer": 0,
      "explanation": "Müşteri sıraya vardığı andan hizmeti bitene kadar sistemdedir."
    }
  ],
  "next": [
    {
      "href": "yoneylem-arastirmasi.html",
      "title": "Yöneylem Araştırması: Doğrusal Programlama, Simpleks ve Kritik Yol",
      "why": "Kısıtlar ve karar değişkenleriyle kapasite kararlarını biçimlendirin."
    },
    {
      "href": "kalite-kontrol-ve-istatistiksel-surec-kontrolu.html",
      "title": "Kalite Kontrol ve İstatistiksel Süreç Kontrolü",
      "why": "Bir süreçte değişkenliği zaman dizisinden okuyun."
    }
  ],
  "sources": [
    {
      "title": "Bertsekas ve Gallager · Data Networks §3.3",
      "url": "https://web.mit.edu/dimitrib/www/Queueing_Data_Nets.pdf",
      "note": "Durağan M/M/1 çözümü."
    },
    {
      "title": "MIT OpenCourseWare · Queueing lecture",
      "url": "https://ocw.mit.edu/courses/1-203j-logistical-and-transportation-planning-methods-fall-2006/resources/lec5/",
      "note": "Olay türleri, Little yasası ve model varsayımları."
    }
  ],
  "revision": "Kasım 2026"
};
