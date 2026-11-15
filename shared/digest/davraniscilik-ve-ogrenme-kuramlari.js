window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["davraniscilik-ve-ogrenme-kuramlari"] = {
  "slug": "davraniscilik-ve-ogrenme-kuramlari",
  "title": "Davranışçılık ve Öğrenme Kuramları",
  "field": "Zihin ve Davranış",
  "level": "Lise–Lisans",
  "minutes": 35,
  "tagline": "Bir ses ne zaman ipucu, bir sonuç ne zaman pekiştireç olur? Pavlov, Watson, Thorndike, Skinner ve Bandura’yı kurgusal görevler ve bir öğrenme eğrisiyle karşılaştır.",
  "hook": "Bir oyunda ışık yanınca kapı açılıyor. Başka bir turda kapıyı senin düğmeye basman açıyor. Bu iki deneyim aynı şekilde mi öğrenilir?",
  "bigIdea": "Uyaranların eşleşmesi, davranışın sonuçları ve başka birinin eyleminin gözlenmesi farklı öğrenme düzenleridir.",
  "story": [
    "Pavlov, başlangıçta nötr bir ipucunun başka bir uyaranla eşleştiğinde ölçülebilir tepkiyi nasıl değiştirdiğini inceledi. Watson psikolojinin programında gözlenebilir davranışa ağırlık verdi. Klasik koşullanmada ipucunu başka bir uyaran izler. Edimsel koşullanmada ise sonucun ortaya çıkması yapılan davranışa bağlıdır.",
    "Thorndike etki yasasında, sonuçların bir davranışın yeniden ortaya çıkma olasılığıyla ilişkisini ele aldı. Skinner, sonuçların hangi zaman veya tepki sayısı düzeninde verildiğini sistematik biçimde değiştirdi. Bandura ve çalışma arkadaşları, başkasının davranışına tanık olmanın, daha sonra gözlenebilen taklitle ilişkisini deneysel gruplar üzerinden araştırdı."
  ],
  "core": [
    {
      "heading": "Klasik koşullanma",
      "body": "İpucu ile sonuç tekrar tekrar birlikte geldiğinde ipucu bir beklentiyle ilişkilendirilebilir. İpucu tek başına sunulduğunda tepkinin zamanla azalmasına sönme denir. Farklı bağlamlarda tepki geri dönebilir."
    },
    {
      "heading": "Edimsel koşullanma",
      "body": "Bir sonuç, kendinden önce gelen davranışın ilerideki sıklığını artırıyorsa pekiştirici işlev görür. Sabit veya değişken oran düzeninde tepki sayısı, sabit veya değişken aralık düzeninde geçen süre önemlidir. Aralık düzeninde süre geçtikten sonra ilk tepki sonucu getirir."
    },
    {
      "heading": "Gözlemsel öğrenme",
      "body": "Modelin bir görevi nasıl yaptığını izlemek, gözlemciye adımlar hakkında bilgi verir. Sonraki performans hem edinilen bilgiyi hem de onu ortaya koyma koşullarını yansıtır. İzleyen ve izlemeyen grupları eşit süre ve fırsatla karşılaştırmak bu yüzden önemlidir."
    }
  ],
  "lab": {
    "experiments": [
      {
        "title": "İlk iki deneme",
        "predict": "Başlangıç sıfırsa 0,5 katsayıyla iki eşleşmede nereye varırsın?",
        "do": "Katsayıyı 0,5, eşleşen denemeyi 2, tek ipucunu 0 yap.",
        "observe": "Beklenti ilk denemede 0,5, ikinci denemede 0,75 olur.",
        "explain": "Her deneme hedefle aradaki farkın yarısını kapatır."
      },
      {
        "title": "Sönme adımı",
        "predict": "0,75’ten sonra bir tek ipucu sunulursa ne olur?",
        "do": "Aynı ayarlarda tek başına ipucu sayısını 1 yap.",
        "observe": "Beklenti 0,375’e iner. Veri tablosunda üçüncü adımı aç.",
        "explain": "Hedef 0 iken fark bu kez beklentiyi aşağı doğru iter."
      },
      {
        "title": "Sebep değişince",
        "predict": "Kapı düğmeye bağlıysa hangi gözlem değişmeli?",
        "do": "Kapı panelinde edimsel ve gözlem seçeneklerini karşılaştır.",
        "observe": "Tepki sıklığı ile doğru sıra ölçümünün farklılığını bul.",
        "explain": "Sonucun eyleme bağlılığı ve model izleme ayrı değişkenlerdir."
      }
    ]
  },
  "wow": [
    {
      "title": "Sabit sayım, değişken zaman",
      "body": "Her üçüncü doğru tepkinin ödüllendiği bir düzen, tepkiler hızlandığında ödüllerin zaman aralığını kısaltabilir."
    },
    {
      "title": "Aralık saatle başlar",
      "body": "Aralık dolduğunda pekiştirmeye uygunluk oluşur. Sonucun ortaya çıkması için sonra bir tepki gerekir."
    },
    {
      "title": "Sönmede bağlam",
      "body": "Tepkideki azalma belleğin tümüyle silindiğini göstermez. Tepki zaman veya ortam değiştiğinde kısmen geri gelebilir."
    }
  ],
  "worked": {
    "title": "Tek ipucu",
    "prompt": "Beklenti 0,6 ve katsayı 0,25. İpucu bir kez ödülsüz beliriyor. Sonraki beklenti kaç?",
    "steps": [
      "Ödül yoksa adımın hedefi sıfırdır.",
      "Fark −0,6 olur. Bunun dörtte birini önceki beklentiye ekle."
    ],
    "result": "0,6 − 0,15 = 0,45."
  },
  "misconceptions": [
    {
      "myth": "Her ödül pekiştireçtir.",
      "truth": "Pekiştirme, öğrendiğimiz davranışın sonraki sıklığında bir artışla tanımlanır."
    },
    {
      "myth": "Sönmeyle önceki öğrenme tamamen silinir.",
      "truth": "Klasik koşullanma çalışmalarında tepki daha sonra veya farklı bağlamda yeniden ortaya çıkabilir."
    }
  ],
  "glossary": [
    {
      "term": "Koşullu uyaran",
      "definition": "Eşleşme sonrasında bir tepkiyle ilişkilendirilen ipucu."
    },
    {
      "term": "Pekiştirme",
      "definition": "Bir davranışın sonrasında gelecekteki sıklığını artıran sonuç düzeni."
    },
    {
      "term": "Sönme",
      "definition": "Koşullu ilişki veya pekiştirme düzeni değiştiğinde tepkinin azalması."
    },
    {
      "term": "Oran düzeni",
      "definition": "Pekiştirecin uygunluğunu tepki sayısına bağlayan düzen."
    },
    {
      "term": "Gözlemsel öğrenme",
      "definition": "Başka birinin davranışını ve sonuçlarını izleyerek edinilen bilgi veya davranış."
    }
  ],
  "bridge": {
    "body": [
      "Beklenti eğrisinin her adımında önceki tahmin yeni bilgiyle güncellenir. Bellek görevleri, davranış sıklığı dışındaki öğrenme ölçülerini karşılaştırmana yardım eder."
    ],
    "topics": [
      "Bellek",
      "Deney tasarımı",
      "Geri bildirim"
    ]
  },
  "quiz": [
    {
      "question": "Kapı yalnız oyuncu bastığında açılıyorsa başlıca ilişki hangisidir?",
      "options": [
        "Uyaran–uyaran",
        "Eylem–sonuç",
        "Bellek kapasitesi"
      ],
      "answer": 1,
      "explanation": "Kapının açılması basma eylemine bağlıdır. Bu, edimsel düzenin ayırt edici özelliğidir."
    },
    {
      "question": "Aralık düzeninde süreden sonra ne gerekir?",
      "options": [
        "Bir tepki",
        "Başka bir model",
        "İki ödül"
      ],
      "answer": 0,
      "explanation": "Süre geçtikten sonra ilk uygun tepki pekiştirmeyi getirir."
    },
    {
      "question": "Ödülsüz ipucuna verilen tepkinin azalmasına ne denir?",
      "options": [
        "Genelleme",
        "Korelasyon",
        "Sönme"
      ],
      "answer": 2,
      "explanation": "İpucunun eski sonucu artık getirmemesi sönme düzenini tanımlar."
    }
  ],
  "next": [
    {
      "href": "bellek-ve-ogrenme.html",
      "title": "Bellek ve Öğrenme: Unutma Eğrisi, Seri Konum, Çalışma Belleği, Yanlış Anılar",
      "why": "Tekrar, geri çağırma ve unutmayı incele"
    },
    {
      "href": "bilissel-psikoloji-ve-terapi.html",
      "title": "Bilişsel Psikoloji ve Bilişsel Terapi",
      "why": "Zihinsel süreçleri tepki süresiyle araştır"
    }
  ],
  "sources": [
    {
      "title": "I. Pavlov, Conditioned Reflexes, Birinci Ders",
      "url": "https://psychclassics.yorku.ca/Pavlov/lecture1.htm",
      "note": "Klasik koşullanmanın deney programı."
    },
    {
      "title": "E. Thorndike, Animal Intelligence, Bölüm 5",
      "url": "https://psychclassics.yorku.ca/Thorndike/Animal/chap5.htm",
      "note": "Etki yasasının tarihsel ifadesi."
    },
    {
      "title": "J. B. Watson, Psychology as the Behaviorist Views It (1913)",
      "url": "https://psychclassics.yorku.ca/Watson/views.htm",
      "note": "Gözlenebilir davranışa yönelen program."
    },
    {
      "title": "OpenStax, Edimsel Koşullanma",
      "url": "https://openstax.org/books/psychology-2e/pages/6-3-operant-conditioning",
      "note": "Skinner ve pekiştirme düzenleri."
    },
    {
      "title": "Bandura, Ross ve Ross, Transmission of Aggression (1961)",
      "url": "https://psychclassics.yorku.ca/Bandura/bobo.htm",
      "note": "Gözlemsel öğrenmenin tarihsel deney tasarımı."
    }
  ],
  "revision": "Kasım 2026"
};
