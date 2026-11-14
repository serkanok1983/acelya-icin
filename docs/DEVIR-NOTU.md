# Devir notu — Açelya'nın Yeri (15 Kasım 2026)

Bu belge, projeyi başka bir ajana (ya da yeni bir oturuma) eksiksiz devretmek için yazıldı. Önce bunu, sonra
`docs/OGRENME-YOLLARI-PLANI.md` dosyasını oku. Ayrıntı gerektikçe aşağıda adı geçen öteki belgelere in.

## 1. Proje

- **Ne:** "Açelya'nın Yeri" — liseden üniversiteye Türkçe, etkileşimli bir ansiklopedi. Her konu bir HTML sayfası
  (`<slug>.html`, tek dosya, derleme adımı yok) ve altında bir **Keşif Defteri** (`shared/digest/<slug>.js`).
- **Depo:** `/Users/serkanok/Development/HTML/acelya-icin` · uzak: `https://github.com/serkanok1983/acelya-icin.git`
  (dal `main`).
- **Canlı:** https://serkanok1983.github.io/acelya-icin (GitHub Pages, `gh-pages` dalı; GitHub Actions kullanılmıyor,
  yayın yerelden elle yapılır, bkz. §5).
- **Boyut (15 Kasım, U5 sonrası):** 264 konu sayfası + `index.html`, `bilgi.html`, `404.html`, `ogrenme-yollari.html`,
  `onsart.html`. Menüde 10 grup.

## 2. Kullanıcının kalıcı kuralları (bağlayıcı; birebir sözleri)

1. **Doğruluk pazarlık konusu değil.** Her olgu açılmış bir kaynaktan; uydurma sayı, tarih, URL yok. Akıcı, doğal
   Türkçe; yansızlık; ondalık virgül, "−" eksi işareti, 10 000 ve üstünde ince boşluk (U+202F).
2. **Bilgi biçimden önce gelir:** "Konu gerektirdiğinde biçimde dilediğin kadar özgür olabilirsin; anlatım şekline
   uydurmak için teorinin kendisini eğip bükmeyelim, en iyi anlatım şekli ne ise ona uyalım. Esas amaç bilgiyi sunmak,
   alanı tanıtmak, temeli en iyi şekilde vermek. Standart yöntem tutarlılık sağlar ama bilgi biçimden önce gelir."
3. **Yayın:** "Geliştirme bittikten sonra yayınlayıp sonraki tura devam edebilirsin." Tur bitip **bütün testler
   geçince** sormadan commit → push → yayın → canlı doğrulama, sonra sıradaki tur. Test düşerse ya da kapsamı
   değiştiren/tartışmalı bir karar çıkarsa dur ve sor.
4. **Mobil:** Site telefonda tam kullanılabilir olmalı, bütün sayfa parmakla kaydırılabilmeli (`npm run test:mobile`).
5. **Gizlilik:** Kullanıcının e-postası ve kişisel bilgileri dış servislere gönderilmez.
6. **Commit mesajı sonu:** `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` (oturumun ilettiği atıf neyse o).
7. **Telif:** Yalnız kamu malı eserler (Türkiye için yazar 1956'dan önce ölmüş; ABD eserleri için 1930 ve öncesi
   yayım). Şarkı sözü yok. Alıntı en çok 15 sözcük, atıflı. Telifli eserler yalnız kendi sözlerimizle anılır.
8. **Kapsam sınırsız:** "300 ders de olur 500 ders de, bunu STEM diye sınırlandırmayalım. Okuyan okuyucu bir film
   izlediğinde, bir roman okuduğunda her detayı, her katmanı, her değişimi okuyabilmeli, farkındalığı artmalı, analiz
   yeteneği güçlenmeli." Klasik ve modern bütün önemli düşünürler (Freud, Adler, Jung, Lacan; Kant, Hegel, Fichte,
   Nietzsche, Schopenhauer, Kierkegaard, Spinoza; Locke, İbn Haldun, Weber, Habermas, Marx, Smith, Keynes…) kapsamda.
9. **Menü:** "Menüyü sürekli güncel tutarsın, bazı derslerin yeni gruplara geçmesi gerekebilir." Her turda grup
   dengesini gözden geçir; dersleri gerekirse taşı; büyük değişikliği turun özetinde bildir. Daha önce: "bir grupta
   100 ders bir grupta 3 ders olması doğru olmaz… temel bir bölümlendirme yeterli."
10. **Yazım kararları:** "dil bilgisi", "söz dizimi" her yerde ayrı yazılır (TDK). "öge" yalnız Türkçe Dil Bilgisi
    sayfasında; kullanıcı: "Sitenin geri kalanında 'öğe' olarak kalabilir."
11. **Öğrenme Yolları/Önşart:** ana liste "geniş liste, dilediğini seç, hemen oku" olarak kalır; yollar isteğe bağlı rehber.

Bu kuralların özeti ajanın kalıcı hafızasında da var:
`~/.claude/projects/-Users-serkanok-Development-HTML-acelya-icin/memory/` (proje-vizyonu, yayin-onayi,
bilgi-bicimden-once, menu-guncel-tut). Aynı makinede çalışan yeni oturum bunları otomatik yükler.

## 3. Çalışma yöntemi: üçlü hat (her yeni ders için)

Her ders üç **ayrı** alt ajandan geçer (genel amaçlı ajan, arka planda, her biri kendi dosyalarıyla sınırlı):

1. **Kurucu** — sayfayı (`<slug>.html`), kalıcı testi (`scripts/check-g-<slug>.mjs`) ve kurucu raporunu
   (`.shots/briefs/<slug>.md`) yazar. Sözleşmeler: `docs/ajan-sozlesmeleri/_kurucu-ortak.md`,
   `_kurucu-yeni-alanlar.md`, `_onsart.md` (önşart ve U3/U4 ek kuralları), gerekiyorsa `_ucuncu-halka.md`.
2. **Yazar** — yalnız Keşif Defteri'ni (`shared/digest/<slug>.js`) kurucu raporuna ve sayfanın gerçek değerlerine
   dayanarak yazar. Sözleşme: `_yazar-ortak.md` + `docs/icerik-rehberi.md` (şema).
3. **Bağımsız doğrulayıcı** — sayfayı ve defteri kendi koduyla yeniden hesaplar, kaynakları açar, küçük hataları
   düzeltir, her kuralı PASS/FAIL raporlar, 1–10 puan verir. Sözleşme: `_dogrulayici-ortak.md`.

Sekiz ders paralel kurulur; biri bittikçe yazarı, yazar bittikçe doğrulayıcısı başlatılır. Yazarın ya da kurucunun
bulduğu sayfa hataları doğrulayıcının istemine **açıkça** yazılır. Raporlardaki iddiaları körü körüne kabul etme:
şüpheli bir şey varsa kendin kontrol et (örn. TDK sözlüğüne sorarak, `sozluk.gov.tr/gts?ara=…`).

Sözleşmelerin çalışan kopyaları `.shots/briefs/` altında da var (git'e girmez); **kanonik kopya
`docs/ajan-sozlesmeleri/`**. Bir sözleşmeyi değiştirirsen ikisini de güncelle ya da istemlerde yalnız `docs/` yolunu ver.

### İstem şablonları (kısaltılmış; tam örnekler bu oturumda kullanıldı)

**Kurucu:** "You are the BUILDER (kurucu) for one new page … Read first, in this order, and follow them (binding):
docs/ajan-sozlesmeleri/_kurucu-ortak.md; _kurucu-yeni-alanlar.md (this page is NEW — skip the 'read the CURRENT
page/digest' step; a digest 404 in smoke is the only allowed failure); _onsart.md (+ ilgili 'additions'); shared/yollar.js
(sayfanın yeri); okunacak komşu sayfalar … PAGE: slug, field (FIELDS listesinden), level, title önerisi (≤ 80
karakter), Scope (madde madde içerik, bağlanacak var olan sayfalar, planlı sayfalar düz metin '(hazırlanıyor)').
Create ONLY: <slug>.html, scripts/check-g-<slug>.mjs, .shots/briefs/<slug>.md (scratch .shots/tmp-g-<slug>/, delete
at end). No other files, no git state changes, no npm run build. Run the final gates. Report back briefly."

**Yazar:** "You are the WRITER … Read and follow: _yazar-ortak.md, docs/icerik-rehberi.md, _onsart.md, shared/yollar.js
(planned pages must not be linked in `next`), docs/sayfa-katalogu.md (exact <title> for next). PAGE: slug, field,
level. Builder report … base every experiment on the REAL controls … History only from sources you actually open on
the allowed domains (scripts/check-site.mjs SOURCE_PREFIXES) … Create ONLY shared/digest/<slug>.js … Gates: check-site
--only <slug> --require-digests; smoke --only <slug> --digest --tabs."

**Doğrulayıcı:** "You are the independent VALIDATOR + EDITOR … Read: _dogrulayici-ortak.md, _onsart.md (list each rule
PASS/FAIL), _kurucu-yeni-alanlar.md, docs/icerik-rehberi.md. SLUG … Known items (writer/builder flags) … Also check
independently: … Solve at least ten generated exercises by hand per level; malformed answers against the parser …
Modify ONLY the three files … Final gates … Report: page findings, rules PASS/FAIL, claimsChecked, digest fixes,
scoreBefore/scoreAfter, uncertainties."

## 4. Bütünleştirme adımları (her turun sonunda, sen yaparsın)

1. **Menü:** `index.html` içindeki `const MENU = [...]`. Her öğe `{ href, label, sub, keywords }`. Büyük gruplarda
   her dersin `sub` (ara başlık) alanı olmalı; aynı ara başlık ardışık blok olmalı. Grup dengesini gözden geçir.
2. **Yollar:** `shared/yollar.js` — `planned` sözlüğündeki bir slug'ın sayfası yazılınca **hiçbir şey değiştirmeden**
   bağlantıya dönüşür (katalogda görünmesi yeter). Yeni ders bir yola/önşarta eklenecekse `stages[].items` listesine
   slug ekle; henüz yazılmamışsa `planned`'a başlığıyla ekle.
3. **Sayfalar arası bağlantı:** Yeni dersler birbirinden "(hazırlanıyor)" diye söz ediyorsa, hepsi doğrulanınca bunları
   bağlantıya çevir ve testlerdeki "düz metin" iddialarını tersine çevir (bu turda yapılan örnekler: U3, U4).
   Komşu eski bir defterin `next` listesine yeni sayfayı eklemek keşfedilebilirliği artırır (title = hedef `<title>`).
4. **Belgeler:** `docs/simulasyon-notlari.md` (tur özeti, puanlar), `docs/OGRENME-YOLLARI-PLANI.md` (durum),
   `docs/DEVAM-PLANI.md` (§4.S durum satırları), `docs/sayfa-katalogu.md` (`node scripts/build-sayfa-katalogu.mjs` ile menüden yeniden üretilir).
5. `npm run -s build` (katalog + sw), tam test turu (§5), yayın (§5).

## 5. Komutlar, testler, yayın

Ortam: `export PLAYWRIGHT_BROWSERS_PATH=$HOME/Library/Caches/ms-playwright`. `ls` takma adı `eza --icons`'tır ve
etkileşimsiz kabukta takılabilir: dizin listelemek için `/bin/ls` kullan. Testleri **sırayla** çalıştır.

- Derleme: `npm run -s build` (= `build-catalog.mjs` + `build-sw.mjs`).
- Tek sayfa: `node scripts/check-site.mjs --only <slug> --require-digests`,
  `timeout 120 node scripts/smoke.mjs --only <slug> --digest --tabs`, `node scripts/check-g-<slug>.mjs --browser`,
  `node scripts/audit-mobile.mjs --only <slug> --width 360`, `node scripts/audit-scroll.mjs --only <slug> --tabs`.
- **Tam tur** (arka planda, ~30 dk; boru hattında çıkış kodunu kaybetmemek için `set -o pipefail`):
  ```sh
  set -o pipefail; npm run -s build
  node scripts/check-site.mjs --require-digests > /tmp/cs.txt 2>&1; echo "site $?"
  node scripts/check-yollar.mjs --browser | tail -1; echo "yollar $?"
  npm run -s test:g 2>&1 | grep -v "^✓" | tail -4; echo "test:g $?"
  for t in public a7 f1 f2 c d e; do npm run -s test:$t >/tmp/t-$t.txt 2>&1; echo "$t $?"; done
  node scripts/smoke.mjs --digest --tabs 2>&1 | tail -4; echo "smoke $?"
  npm run -s test:mobile 2>&1 | grep -v "^\s*$" | tail -6; echo "mobile $?"
  ```
  Beklenen: hepsi 0. Smoke'ta "digest yok: 5 404 bilgi index ogrenme-yollari onsart" normaldir.
- **Yayın:** `git add -A && git commit -m "…" && git push` → `sh scripts/deploy-manual.sh --publish`
  (çalışma ağacı temiz olmalı; `docs/`, `scripts/`, `.shots/` canlıya gitmez). Sonra canlı `sw.js` sürümünü
  bekle ve değişen dosyaların özetini karşılaştır:
  ```sh
  want=$(grep -o "acelya-[0-9a-f]*" sw.js | head -1)
  for i in $(seq 1 40); do v=$(curl -s "https://serkanok1983.github.io/acelya-icin/sw.js?t=$RANDOM" | grep -o "acelya-[0-9a-f]*" | head -1); [ "$v" = "$want" ] && break; sleep 10; done; echo "want $want live $v"
  # her değişen dosya için: git show HEAD:<f> | shasum  ile  curl …/<f> | shasum  eşit olmalı
  ```
- **Denge testi:** `scripts/check-yollar.mjs` menüyü denetler: 8–10 grup, en küçük grup ≥ 10, en büyük ≤ toplamın
  %22'si, büyük gruplarda her derste ara başlık, her katalog sayfası menüde. Yeni grup açılınca (ör. "Düşünce
  Tarihi", "Edebiyat ve Sinema") bu sınırları güncelle.
- **İzinli kaynak alan adları:** `scripts/check-site.mjs` içindeki `SOURCE_PREFIXES` (yalnız defterler için
  denetlenir). Yeni alanlar için gerekirse resmî/akademik alan adı ekle. `FIELDS` listesi defterlerin `field` değerleri.

## 6. Durum (15 Kasım 2026, devir anı)

- U4 yayınından sonraki sürüm `acelya-0a90f61dea` idi. Güncel commit ve önbellek sürümü için `git log -1` ve
  `sw.js` kullanılır. Canlı doğrulama adımları §5'te.
- U4 sonundaki tam test turu (15 Kasım) site, yollar, test:g (159/159), public/a7/f1/f2/c/d/e, smoke ve
  mobil denetimlerinden geçti. Bu tur yaklaşık 70 dakika sürmüştü.
- U5 ile 264 dersin tamamı katalogda. U5 modelleri `scripts/check-g-u5.mjs --browser` ile sınanır.
  Masaüstü ana sayfanın belge kaydırması `scripts/check-yollar.mjs --browser` kapsamındadır.
- Bir sonraki iş: **U6** (aşağıda).

### Tamamlanan turlar (hepsi yayında)
- **U1** — on dengeli menü grubu ve ara başlıklar; Bilim Atlası ve STEM Omurgası kaldırıldı (konular dağıtıldı);
  `ogrenme-yollari.html`, `onsart.html`, `shared/yollar.{js,css}`, `shared/yollar-view.js`, `scripts/check-yollar.mjs`;
  oyunlarda telefonda duraklatma katmanı hatası düzeltildi (`shared/theme.css`).
- **U2** — önşart matematik ve programlama (8 ders).
- **U3** — önşart fen-dil ve hekim yolu (8 ders); TDK yazımı (dil bilgisi/söz dizimi) sitenin her yerinde.
- **U4** — hukukçu ve genetik yolları (8 ders): hukuka-giris, anayasa-hukuku-ve-temel-haklar,
  ceza-hukukunun-genel-ilkeleri, borclar-ve-sozlesme-hukuku, hukuk-felsefesi, populasyon-genetigi,
  biyoinformatik-ve-dizi-hizalama, gen-muhendisligi. Menüde "İnsan ve Toplum" > yeni "Hukuk" ara başlığı.
- **U5** — ısı transferi, zemin mekaniği, kuyruk kuramı ve benzetim, kalite kontrol, finans matematiği,
  yapı fiziği, kent planlama, gelişim psikolojisi ve sosyal psikoloji. Planlanan bütün yol dersleri
  bağlantıya dönüştü. Masaüstü ana sayfada iç kaydırma kaldırıldı.

Tur ayrıntıları `docs/simulasyon-notlari.md` belgesinde.

### Sıradaki işler (sırasıyla; ayrıntılı kapsam `docs/OGRENME-YOLLARI-PLANI.md` §3, §5, §6, §7)
1. **U6** — psikoloji ve psikanaliz (~10 ders; Freud, Adler, Jung, Rank, Reich; Anna Freud, Klein, Winnicott,
   Bowlby, Erikson, Kohut; Lacan, Fromm, Horney; davranışçılık; hümanistik/varoluşçu; bilişsel; kişilik;
   psikopatoloji ve psikoterapi ekolleri — tedavi önerisi yok, `_ucuncu-halka.md`; motivasyon ve duygu).
   Psikolog ve hekim yollarına eklenecek.
2. **U7** — felsefe tarihi (~12 ders, Sokrates öncesinden yapısalcılık sonrasına).
3. **U8** — sosyal bilimler ve siyaset kuramı (~10 ders).
   U7–U8 için aranabilir **Düşünürler Dizini** sayfası ve gerekirse ayrı "Düşünce Tarihi" menü grubu.
4. **U9** — edebiyat kuramı ve çözümleme (~10 ders): akımlar (Türk edebiyatı dahil), eleştiri kuramları, karakter
   ve karakter psikolojisi, anlatım teknikleri, retorik, dram, türler, şiir, uyarlama.
5. **U10** — sinema kuramı, akımları, senaryo, mizansen, kurgu, ses, oyunculuk, belgesel, film çözümleme atölyesi.
   U9–U10 için "Edebiyat ve Sinema" grubu açılabilir.
6. **Genel değerlendirme:** içerik zenginliği ve kalite denetimi + boşluk analizi; ardından UI/UX değerlendirmesi
   (`docs/OGRENME-YOLLARI-PLANI.md` §7).

Her tur için önce, o turun özel kurallarını `docs/ajan-sozlesmeleri/_onsart.md` sonuna "U5 additions" gibi bir
bölüm olarak ekle (U3/U4 örneklerine bak), gerekirse `SOURCE_PREFIXES`'e alan adları ekle, sonra sekiz kurucuyu başlat.

## 7. Açık noktalar ve bilinen tuhaflıklar

- Bilgisayarda iki gündür bekleyen bir `eza --icons` süreci var (kaynağı bu oturuma bağlanamadı; zararsız). Ajanların
  takılı kalmaması için istemlerde `/bin/ls` kullanmalarını söylemek iyi olur.
- `scripts/check-g-hukuk-felsefesi.mjs --browser` bir kez açıklamasız düştü, sonraki koşularda geçti; tam turda
  düşerse yeniden koş, tekrar ederse incele.
- Birçok yeni defterde 5 kaynak var; `docs/icerik-rehberi.md` 2–4 der ama check-site 5'e izin veriyor (bilinçli bırakıldı).
- Önşart sayfalarının bir kısmı "Lise–Lisans" düzeyinde; kural "Lise ile başla, yalnız 'Lisans' olmasın" diye yorumlandı.
- Bazı sayfalarda çalışan sürümleri "13 Kasım 2026'da mevzuat.gov.tr'deki metin" gibi tarihli; mevzuat değişebilir,
  sayfalar okuru güncel metni kontrol etmeye yönlendiriyor.
- Kurucu raporları (`.shots/briefs/<slug>.md`) yalnız bu makinede (`.shots/` git'e girmez); yeni yazar ya da
  doğrulayıcı gerekiyorsa sayfanın kendisi ve testi yeterli bilgi taşır.

## 8. Önemli dosyalar

| Dosya | Ne |
|---|---|
| `index.html` | Ana menü (`MENU`), arama, ara başlık çizimi, iki rehber kartı |
| `ogrenme-yollari.html`, `onsart.html`, `shared/yollar*.{js,css}` | Yollar ve önşart; veri `shared/yollar.js` |
| `shared/digest/<slug>.js`, `shared/digest.js` | Keşif Defterleri ve çizicisi |
| `shared/catalog.js`, `sw.js` | Üretilir (`npm run build`), elle düzenlenmez |
| `shared/theme.css`, `shared/app.js` | Ortak kabuk, tema, üst çubuk, oyun duraklatma |
| `scripts/check-site.mjs` | Site denetimi, `FIELDS`, `SOURCE_PREFIXES` |
| `scripts/check-yollar.mjs` | Yollar ve menü dengesi testi |
| `scripts/check-g-*.mjs`, `check-g-all.mjs` | Sayfa başına kalıcı testler (`npm run test:g`) |
| `scripts/deploy-manual.sh` | Yayın |
| `docs/OGRENME-YOLLARI-PLANI.md` | Proje planı ve turlar (asıl yol haritası) |
| `docs/DEVAM-PLANI.md` | Uzun tarihçe ve genel plan (§4.S güncel durum) |
| `docs/icerik-rehberi.md` | Defter şeması ve yazım standardı |
| `docs/ajan-istemleri.md` | Eski ajan istem blokları (sözleşmeler bunlara atıf yapar) |
| `docs/ajan-sozlesmeleri/` | Kurucu/yazar/doğrulayıcı sözleşmeleri (kanonik) |
| `docs/simulasyon-notlari.md` | Tur tur yapılanlar ve puanlar |
| `docs/sayfa-katalogu.md` | Menüden üretilen sayfa listesi (next için slug ve başlıklar) |

`docs/sayfa-katalogu.md`'yi yeniden üretmek için: `npm run -s build && node scripts/build-sayfa-katalogu.mjs`.
