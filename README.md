# Açelya'nın Yeri — Temel Bilimler Atlası

Açelya'nın Yeri, lise düzeyindeki temel bilimleri yalnızca “okunan” değil;
tahmin, deney, gözlem ve açıklama yoluyla keşfedilen bir ansiklopediye
dönüştürme projesidir. Matematik, fizik, kimya, biyoloji ve yer-uzay
bilimlerini kavram haritaları, etkileşimli laboratuvarlar ve kısa
simülasyonlarla birbirine bağlar.

## İlk ansiklopedi rotası

- `bilim-atlasi.html`: aranabilir konu dünyaları, ön koşullu öğrenme rotası ve
  cihazda saklanan ilerleme.
- `bilimsel-yontem-olcme-ve-belirsizlik.html`: deney tasarımı, SI birimleri,
  doğruluk-kesinlik ve sanal ölçüm laboratuvarı.
- `hareket-ve-grafikler.html`: konum, hız ve ivmeyi eş zamanlı grafiklerle
  ilişkilendiren hareket laboratuvarı.
- `momentum-itme-ve-carpismalar.html`: momentum/enerji karşılaştırmalı çarpışma
  laboratuvarı.

Her amiral içerikte katmanlı anlatım, çözümlü örnekler, kavram yanılgıları,
sözlük, Tahmin → Test → Gözle → Açıkla görevi, geri bildirimli mini sınav,
erişilebilir metin karşılığı, Türkçe seslendirme ve kaynak/revizyon bilgisi
bulunur.

## Yerelde çalıştırma

Proje dizininde basit bir statik sunucu başlatın:

```bash
python3 -m http.server 8000
```

Ardından `http://localhost:8000/` adresini açın. İlerleme bilgileri yalnızca
tarayıcının `localStorage` alanında tutulur; sunucuya kişisel veri gönderilmez.
Tarayıcı destekliyorsa anlatımlar Web Speech API ile Türkçe seslendirilebilir.

Serkan ❤️ Açelya
