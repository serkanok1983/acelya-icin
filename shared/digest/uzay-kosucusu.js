window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["uzay-kosucusu"] = {
  slug: "uzay-kosucusu",
  title: "Uzay Koşucusu: Tek Tuşla Yerçekimi",
  field: "Oyun",
  level: "Lise hazırlık",
  minutes: 25,
  tagline:
    "Tek bir tuş, sabit bir yerçekimi ve saniyede altmış kez dönen bir döngü. Zıplayan geminin arkasında atış hareketinin matematiği, paralaks yıldızlar ve kronometre kılığında bir mesafe sayacı var.",
  hook:
    "Gemi her zıplayışta aynı yüksekliğe çıkar, 35 adımda yere iner ve oyun ne kadar hızlanırsa hızlansın havada kalış süresi bir salise bile değişmez. Peki mavi kuyruklu yıldız yerde duran gemiye neden hiç çarpamaz, üç kırmızı lazerin hangisi gerçekten tehlikelidir ve ⚡ Hız güçlendirmesi aslında ne yapar?",
  bigIdea:
    "Sonsuz koşu oyununda gemi değil dünya hareket eder: yatay hız oyunun saatidir, dikey hareket ise her adımda <em>v ← v + g, y ← y + v</em> ile hesaplanan bir atış hareketidir ve ikisi birbirinden bağımsızdır.",
  story: [
    "Kendiliğinden kayan bir dünyada engel atlama fikri 1982'de salon makinelerine girdi. Japon şirketi Irem'in <strong>Moon Patrol</strong>'unda bir ay aracı sürekli sağa gider, kraterlerin üstünden zıplar ve tepeden gelen uçan dairelere ateş eder; oyuncu aracı durduramaz, yalnızca yavaşlatır, hızlandırır ve zıplatır. Oyun başka bir ilkle de anılır: arkadaki dağlar ve şehir silüeti farklı hızlarda kayar. Bu <strong>paralaks</strong> tekniğine derinlik duygusu veren bu oyun çoğu kaynakta ilk örnek sayılır. Bu sayfadaki yıldızlar da üç katmanda, oyun hızının 0.3, 0.65 ve 1.0 katıyla akar; kırk yıllık numara hâlâ iş görüyor.",
    "Türün bugünkü adı çok sonra, dokunmatik ekranla geldi. 2009'da Adam Saltsman, <strong>Canabalt</strong> adlı küçük bir tarayıcı oyunu yaptı: çatıdan çatıya koşan bir adam, giderek artan hız, tek bir tuş. Oyuncu yalnızca ne zaman zıplayacağına karar verir; hız, yön ve engeller oyunundur. Bu 'tek tuşlu sonsuz koşu' kalıbı telefona tam oturdu ve iki yıl içinde Temple Run (2011), Jetpack Joyride (2011) ve Subway Surfers (2012) milyonlarca kişiye aynı şeyi yaptırdı: parmağını doğru anda kaldırmak.",
    "2014'te tür iki kez daha manşet oldu. Hanoili geliştirici Dong Nguyen'in <strong>Flappy Bird</strong>'ü, her dokunuşta kuşa yukarı hız veren, boru aralıklarından geçiren acımasız bir oyundu; şubat ayında dünyanın en çok indirilen oyunuyken geliştiricisi onu mağazalardan kaldırdı ve basına günde yaklaşık 50 bin dolar reklam geliri getirdiğini söyledi. Aynı yıl Google, Chrome'un 'internet yok' sayfasına küçük bir dinozor koydu; boşluk tuşuna basınca kaktüslerin üstünden atlamaya başlıyordu. İnternet kesilince oynanan bir oyun, bağlantı olmadan da bir şeyin çalışabileceğinin en sevimli kanıtı oldu.",
    "Bu sayfadaki oyun tam o soydan gelir: bir gemi, bir tuş, saniyede 60 kez dönen bir döngü. Her adımda gemiye yerçekimi eklenir, engeller sola kayar, kutular kesişiyor mu diye bakılır ve ekran yeniden çizilir. Kod yüz satırı geçmeyen bir fizik dersi anlatır; aşağıda o dersi satır satır okuyacağız.",
  ],
  core: [
    {
      heading: "Dünya kayar, gemi yerinde durur",
      body:
        "Gemi hiç ilerlemez; x koordinatı 120 pikselde sabittir. İlerleme hissini engellerin, yıldızların ve zemin çizgilerinin her adımda <strong>oyun hızı</strong> kadar sola kayması verir. Bu hız mesafeyle doğrusal büyür: oyun 5 piksel/adımla başlar, her 60 metrede 1 piksel/adım artar ve 600 metrede 15'e ulaşıp orada kilitlenir. Saniyede 60 adım olduğundan 5 piksel/adım 300 piksel/saniye, 15 piksel/adım ise 900 piksel/saniye demektir: 900 piksel genişliğindeki sahne her saniye baştan sona bir kez akar.",
      formula: "v = 5 + m/60 (piksel/adım), en çok 15",
      formulaNote: "m, HUD'daki 📏 mesafe değeri. 300 m'de hız 10, 600 m'de 15'tir.",
    },
    {
      heading: "Zıplama: her adımda iki satır",
      body:
        "Tuşa basınca geminin dikey hızı −13.5 piksel/adım olur (eksi yukarı demektir). Sonra her adımda kod iki şey yapar: önce hıza yerçekimini ekler, v ← v + 0.75; sonra konumu günceller, y ← y + v. Hız 18 adımda sıfıra iner, gemi tepe noktasına varır ve aynı adımlarla geri düşer; 35 adım sonra zemindedir, yani yaklaşık 0.58 saniye. Tepe yüksekliği 114.75 pikseldir: geminin kendi boyunun (38 piksel) üç katı. Sürekli formül h = v₀²/2g = 121.5 piksel verir; aradaki yüzde beşlik fark, hızın konumdan önce güncellenmesinden, yani hesabın adım adım yapılmasından gelir.",
      formula: "v<sub>n+1</sub> = v<sub>n</sub> + g,  y<sub>n+1</sub> = y<sub>n</sub> + v<sub>n+1</sub>",
      formulaNote: "g = 0.75 piksel/adım², v₀ = −13.5 piksel/adım. Bu sıraya 'yarı örtük Euler' denir; enerjiyi uzun vadede iyi korur.",
    },
    {
      heading: "Yatay ve dikey birbirini görmez",
      body:
        "Zıplama denkleminde oyun hızı hiç geçmez. Bu yüzden havada kalış süresi hep 35 adımdır; oyun ister 5 ister 15 piksel/adımla aksın. Değişen şey, o 35 adımda altından kaç piksel geçtiğidir: hız 5'te 175 piksel, 10'da 350, 15'te 525. Aynı yükseklikteki kemer giderek yayvanlaşır; gemi daha hızlı düşüyormuş gibi görünür ama düşmez, dünya daha hızlı kayar. Fizikte buna hareketin bileşenlerinin bağımsızlığı denir: top yatay atılsa da serbest düşen bir topla aynı anda yere varır.",
      formula: "Δx = v<sub>yatay</sub> · t<sub>hava</sub> = v · 35 adım",
      formulaNote: "t_hava yalnızca v₀ ve g'ye bağlıdır; v'yi üç katına çıkarmak Δx'i üç katına çıkarır, yüksekliği değiştirmez.",
    },
    {
      heading: "Çarpışma: kutular ve çemberler",
      body:
        "Gemi 46×38 piksel çizilir ama çarpışma için içine 34×30'luk daha küçük bir kutu konur; kanat uçlarına sürtünmek ölüm sayılmaz. Asteroit, kristal ve lazer için kod, iki dikdörtgenin kesişip kesişmediğine bakar: biri ötekinin sağında ya da tamamen altında değilse çarpışmışlardır. Yıldızlar ve güçlendirmeler için ise merkezler arası uzaklık ölçülür: 23 + 8 = 31 pikselden yakınsa yıldız alınır, 23 + 14 = 37 pikselden yakınsa güçlendirme. Çemberin sakin, kutunun hızlı olmasının nedeni budur: biri karekök ister, öteki dört karşılaştırma.",
      formula: "Kutu: A.x < B.x+B.w ∧ A.x+A.w > B.x ∧ A.y < B.y+B.h ∧ A.y+A.h > B.y",
      formulaNote: "Çember: r₁ + r₂ > √(dx² + dy²). Dördüncü koşul yanlışsa cisimler kesişmez; biri üstte, biri alttadır.",
    },
    {
      heading: "Rastgelelik ve zorluk eğrisi",
      body:
        "Engeller bir sayaçla doğar: başta 75 adımda bir sayaç dolar, yüzde 80 olasılıkla bir engel üretilir. Aralık mesafeyle kısalır, 376 metrede 28 adıma iner ve orada kalır. Engel türü de zarla seçilir: yüzde 35 asteroit, yüzde 25 kristal kapı, yüzde 20 kuyruklu yıldız, yüzde 20 üçlü lazer. Yıldızlar ortalama saniyede 0.64 tane, güçlendirmeler her 5 saniyede bir yazı tura ile gelir. Tasarımcı hız ve aralığı öyle seçmiş ki engeller arası piksel mesafesi 315 ile 420 arasında kalır: zorlaşan şey engellerin sıklığı değil, aynı boşluğu geçmek için sana kalan süredir, 1.25 saniyeden 0.47 saniyeye.",
      formula: "aralık = max(28, 75 − m/8) adım",
      formulaNote: "m metre cinsinden mesafe. 28 adım 0.47 saniyedir; insanın görsel tepki süresinin yaklaşık iki katı.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı yok; bir tuş var: <strong>tıklama</strong>, <strong>Space</strong>, <strong>↑</strong> ya da <strong>W</strong> zıplatır. Üstteki HUD beş sayı gösterir: ⭐ skor, 🏆 rekor, 📏 mesafe (m), 🔥 kombo çarpanı ve ❤️ canlar; aktif güçlendirme sahnenin üstünde sarı bir rozetle yazılır. Deneylerin çoğu için telefonundaki kronometre ve dikkatli bir göz yeter.",
    experiments: [
      {
        title: "Mesafe sayacı aslında bir kronometre",
        predict:
          "Oyun hızlandıkça 📏 mesafe daha hızlı artar mı? Hiç yıldız toplamazsan skorla mesafe arasında nasıl bir ilişki olur?",
        do: "Kronometreyi oyuna tıkladığın anda başlat. 10. ve 20. saniyede mesafe değerini oku. Ayrıca yıldızlara hiç dokunmadan bir süre koş ve skorla mesafeyi karşılaştır (ölürsen de olur; bitiş ekranı ikisini yazar).",
        observe:
          "10 saniyede 60 m, 20 saniyede 120 m, 100 saniyede 600 m: ekran iki kat hızlı aksa da sayaç saniyede hep 6 m yazar. Yıldız toplanmadıysa skor her an mesafenin tam 10 katıdır: 180 m'de 1800.",
        explain:
          "Kod her adımda mesafeyi ve skoru 1 artırır, ekrana mesafenin onda birini yazar. Saniyede 60 adım olduğundan 'metre' 1/6 saniyelik bir zaman birimidir; gerçek kat edilen piksel yolu ise hızla büyür ve 600 m'de yaklaşık 60 bin pikseli, yani 67 ekran genişliğini bulur.",
      },
      {
        title: "Üç zıplama ve tavan",
        predict:
          "İpucu 'çift zıplama' diyor. Havada kaç kez daha zıplayabilirsin? Tek zıplamada gemi kendi boyunun kaç katı yükselir?",
        do: "Engelsiz bir anda bir kez bas ve geminin yere dönüşünü izle; 'bin bir' derken iner. Sonra art arda hızlıca üç kez, ardından dördüncü kez bas. Son olarak her tepe noktasında bir kez olmak üzere üç basış dene.",
        observe:
          "Tek zıplama yaklaşık 0.6 saniye sürer ve gemi boyunun üç katı kadar yükselir. Dördüncü basış hiçbir şey yapmaz; yere inince hak yenilenir. Tepe noktalarında üç basış gemiyi sahnenin en üstüne, üst kenardan 60 piksel kadar aşağıya taşır.",
        explain:
          "Kod yere inişte zıplama hakkını 3'e kurar: yerden bir, havada iki. Her basış dikey hızı mevcut değere bakmadan −13.5'e sıfırlar; tepe noktasında basarsan 114.75 piksel daha kazanırsın, üçü 344 piksel eder. Düşerken basarsan düşme hızı silinir ama kazanılan yükseklik azdır.",
      },
      {
        title: "Kuyruklu yıldıza ve lazere karşı en iyi savunma: yerde kalmak",
        predict:
          "Mavi, aşağı yukarı sekerek gelen kuyruklu yıldız yerde duran gemiye çarpabilir mi? Üç kırmızı lazerden hangileri yerde duran gemiyi vurur?",
        do: "Kuyruklu yıldız göründüğünde zıplama, geçmesini bekle. Üçlü lazer geldiğinde de yerde kal; yalnızca üçüncü lazerin alt ucu zemin çizgisine değiyorsa ikinci lazer geçtikten sonra tek zıplama yap.",
        observe:
          "Kuyruklu yıldız yerdeki gemiye hiç değmez. İlk iki lazer neredeyse her zaman geminin üstünden geçer; üçüncüsü yaklaşık her beş kapıdan birinde zemine kadar iner ve yerde duranı vurur.",
        explain:
          "Kuyruklu yıldız 40 ile 366 piksel arasında seker; çarpışma kutusunun altı en fazla 386'ya iner, geminin kutusu ise 412'de başlar. Lazerler 206–326 arasından başlayıp 70–120 piksel uzar; yalnızca üçüncüsünün alt ucu 412'yi geçebilir ve hesapla bu olasılık yüzde 19'dur.",
      },
      {
        title: "Kombo, mıknatıs ve sahte hız",
        predict:
          "🔥 x2 kaç yıldızda yanar? Mıknatıs geride kalan yıldızı geri çekebilir mi? ⚡ Hız rozeti oyunu gözle görülür biçimde hızlandırır mı?",
        do: "Art arda yıldız toplayıp 🔥 göstergesini izle; sonra iki saniye hiç yıldız alma. 🧲 aldığında kasıtlı olarak bir yıldızın altından geç. ⚡ aldığında zemin çizgilerinin ve yıldızların hızına bak.",
        observe:
          "🔥 x2, aralarında 1.5 saniyeden az olan 5. yıldızda yanar, x3 10. yıldızda; en çok x8. İki saniyelik boşlukta çarpan 1'e döner. Mıknatıs 200 piksel içindeki yıldızı 6 piksel/adımla çeker; 60 m'den sonra geçmiş bir yıldızı artık geri getiremez. ⚡ Hız'da hiçbir fark görmezsin.",
        explain:
          "Çarpan 1 + ⌊sayaç/5⌋ ile hesaplanır, sayaç 90 adım (1.5 s) yıldız gelmezse sıfırlanır; her yıldız 10 × çarpan puan verir. Mıknatısın çekişi 6 piksel/adım, dünya ise hız kadar kayar: hız 6'yı geçince geride kalan yıldız net olarak uzaklaşır. ⚡ ise hıza yalnızca 0.02 ekler; hız her adımda mesafeden yeniden hesaplandığı için birikmez.",
      },
    ],
  },
  wow: [
    {
      title: "Paralaks 1982'de ay yüzeyinde doğdu",
      body:
        "Irem'in Moon Patrol'unda arkadaki dağlar yavaş, öndeki yol hızlı kayar; göz bunu derinlik olarak okur. Teknik, salon oyunlarında ilk kez bu oyunla yaygınlaştı ve bugün hemen her yan kaydırmalı oyunun, bu sayfadaki üç katmanlı yıldız alanı dahil, standart parçası. Aynı oyun kraterlerin üstünden zıplayarak otomatik ilerleyen aracıyla sonsuz koşu türünün de büyük dedesi sayılır.",
    },
    {
      title: "İnternet yokken oynanan oyun",
      body:
        "Chrome'un çevrimdışı sayfasındaki dinozor 2014'te eklendi; Google'ın tasarımcıları projeye, T. Rex grubunun solisti Marc Bolan'a gönderme olarak 'Project Bolan' adını verdiler. Oyunun hızı belli bir noktada sabitlenir ve Google'a göre oyunu 'bitirmek' yaklaşık 17 milyon yıl sürer: T. rex'in yeryüzünde yaşadığı süre kadar. Google 2018'de ayda 270 milyon kez oynandığını açıkladı.",
    },
    {
      title: "Sınırlı bir tuşla 50 bin dolar",
      body:
        "Flappy Bird'de tek kontrol vardı: dokun, kuş yukarı hız kazansın. Oyun 2013'te sessizce çıktı, 2014 başında dünyanın en çok indirilen uygulaması oldu ve geliştiricisi Dong Nguyen, basına günde yaklaşık 50 bin dolar reklam geliri getirdiğini söyledi; 10 Şubat 2014'te oyunu bağımlılık yarattığı gerekçesiyle mağazalardan kendi eliyle kaldırdı. Oyunun fiziği bu sayfadakiyle aynı iki satırdır: hıza yerçekimi ekle, konuma hızı ekle.",
    },
  ],
  worked: {
    title: "Gemi gerçek dünyada ne kadar büyük?",
    prompt:
      "Oyunun yerçekimi 0.75 piksel/adım², saniyede 60 adım. Ekrandaki yerçekimi Dünya'nınkiyle (9.81 m/s²) aynı olsaydı bir piksel kaç metre olurdu, gemi ne kadar büyük olurdu ve zıplama gerçekte kaç santimetre ederdi?",
    steps: [
      "Yerçekimini saniye birimine çevir: 0.75 piksel/adım² × 60² adım²/s² = 2700 piksel/s².",
      "Ölçeği kur: 2700 piksel/s² = 9.81 m/s² ise 1 piksel = 9.81/2700 = 0.00363 m, yani 3.63 mm. Geminin 46 pikseli 16.7 cm: avuç içi büyüklüğünde bir model.",
      "Zıplama hızını çevir: 13.5 piksel/adım × 60 = 810 piksel/s = 2.94 m/s. Sürekli formülle tepe yüksekliği h = v₀²/2g = 8.66/19.62 = 0.441 m, havada kalış 2v₀/g = 0.60 s.",
      "Kodun adım adım hesabıyla karşılaştır: 114.75 piksel × 3.63 mm = 41.7 cm ve 35 adım = 0.58 s. Fark yüzde beş; her adımda hız önce azaltılıp sonra konuma eklendiği için gemi biraz daha az yükselir.",
      "Yatay hızı da çevir: 5 piksel/adım = 300 piksel/s = 1.09 m/s (yürüyüş temposu); 15 piksel/adım = 3.27 m/s (hafif koşu). Ters ölçek de mümkün: gemiyi 10 m sayarsan yerçekimi 587 m/s², Dünya'nınkinin 60 katı olur.",
    ],
    result:
      "Dünya yerçekimiyle oyun, 17 santimetrelik bir oyuncağın 42 cm zıplayıp 0.6 saniyede inişidir; yatay hızı yürüyüşten koşuya çıkar. Kod ile formül arasındaki yüzde beş, ayrık zamanın sürekli zamana bedelidir.",
  },
  misconceptions: [
    {
      myth: "Tepe noktasında gemi bir an durur, demek ki orada yerçekimi de sıfırdır.",
      truth:
        "Duran hızdır, ivme değil. Kodda v ← v + 0.75 satırı tepe noktası dahil her adımda çalışır; hız −0.75'ten 0'a, sonra +0.75'e geçer. Yerçekimi bir an bile kesilseydi gemi tepe noktasında asılı kalırdı.",
    },
    {
      myth: "Oyun hızlanınca gemi daha hızlı düşer.",
      truth:
        "Düşüş hep aynıdır: 35 adım, 114.75 piksel. Hızlanan dünyadır; aynı 35 adımda altından 175 yerine 525 piksel geçer ve kemer yayvan görünür. Yatay ve dikey hareket birbirinden bağımsızdır; serbest düşme sayfasındaki topla aynı kural.",
    },
    {
      myth: "📏 mesafe, geminin kat ettiği yolu ölçer.",
      truth:
        "Sayaç zamanı ölçer: her adım 1 birim, ekranda 10 birim = 1 'metre', yani saniyede 6 m, hız ne olursa olsun. Gerçek piksel yolu hızla büyür; 600 m yazdığında dünya altından yaklaşık 60 bin piksel kaymıştır.",
    },
    {
      myth: "⚡ Hız güçlendirmesi oyunu hızlandırır.",
      truth:
        "Rozet beş saniye yanar ama hız yalnızca 0.02 piksel/adım artar; üstelik hız her adımda mesafeden yeniden hesaplandığı için artış birikmez. Etkisi yüzde yarımın altındadır ve gözle görülmez; kodun düzeltilmesi gereken bir köşesi.",
    },
  ],
  glossary: [
    { term: "Sabit zaman adımı", definition: "Simülasyonun fiziği hesapladığı değişmez süre; burada 1/60 saniye, ekran yavaşlasa bile biriktirici eksik adımları tamamlar." },
    { term: "Yarı örtük Euler", definition: "Önce hızı, sonra o yeni hızla konumu güncelleyen adım yöntemi; salınım ve atış hesaplarında enerjiyi iyi korur." },
    { term: "Paralaks", definition: "Yakın cisimlerin uzak cisimlerden daha hızlı kayması; üç katmanlı yıldızlar 0.3, 0.65 ve 1.0 hız oranıyla derinlik yaratır." },
    { term: "Eksenlere hizalı sınır kutusu", definition: "Kenarları eksenlere paralel dikdörtgen; iki kutunun kesişimi dört karşılaştırmayla anlaşılır." },
    { term: "Çarpışma kutusu", definition: "Çizilen şekilden küçük tutulan görünmez kutu; gemide 46×38 yerine 34×30, böylece kanat ucu sürtmesi affedilir." },
    { term: "Yenilmezlik süresi", definition: "Hasardan sonra 90 adım (1.5 s) boyunca çarpışmaların sayılmaması; gemi bu sırada yanıp söner." },
    { term: "Doğma aralığı", definition: "İki engel üretimi arasındaki adım sayısı; 75'ten başlar, mesafeyle 28'e iner." },
    { term: "Kombo çarpanı", definition: "Art arda alınan yıldız sayısının beşe bölümüyle büyüyen puan katsayısı; 1.5 saniye boşlukta sıfırlanır, en çok 8." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki döngü, her oyun motorunun ve her fizik simülasyonunun çekirdeğidir. Üniversitede 'hıza g ekle, konuma hızı ekle' adımı <strong>sayısal integrasyon</strong> adıyla karşına çıkar; sürekli formülün 121.5 pikseli ile kodun 114.75 pikseli arasındaki fark, ayrıklaştırma hatasının ilk örneğidir. Euler, yarı örtük Euler, Verlet ve Runge–Kutta yöntemleri bu hatayı küçültmenin yollarıdır; gezegen yörüngeleri de molekül simülasyonları da aynı seçimi yapar. Çarpışma tarafında ise 'tünelleme' sorusu bekler: bir adımda 15 piksel ilerleyen dünya 8 piksel genişliğindeki lazeri atlayabilir mi? Burada çarpışma kutusu 34 piksel olduğu için hayır; ama hızlı mermiler için yol boyunca süpürülmüş kutular gerekir.",
      "İkinci köprü psikoloji ve yapay zekâya gider. 28 adımlık doğma aralığı 0.47 saniyedir; insanın görsel tepki süresi ise 0.2–0.25 saniye. Tasarımcı zorluğu tam bu sınırın az üstünde tutmuştur, oyunun 'akış' hissi buradan gelir. Öte yandan bir bilgisayara bu oyunu öğretmek istersen durumu üç sayıyla özetlersin: geminin yüksekliği, dikey hızı ve bir sonraki engele uzaklık. <strong>Pekiştirmeli öğrenme</strong> ajanları Flappy Bird ve dinozor oyununu tam bu temsille, ödül olarak yalnızca hayatta kalma süresini alarak öğrenir. Bu sayfada elle hesapladığın her sayı, o ajanın girdi vektörünün bir bileşenidir.",
    ],
    topics: ["Sayısal integrasyon (Euler, Verlet, Runge–Kutta)", "Oyun döngüsü ve sabit zaman adımı", "Çarpışma tespiti ve tünelleme", "Yordamsal üretim ve olasılık", "Tepki süresi ve zorluk tasarımı", "Pekiştirmeli öğrenme"],
  },
  quiz: [
    {
      question: "Zıplama hızı 13.5 piksel/adım, yerçekimi 0.75 piksel/adım². Gemi tepe noktasına kaç adımda ulaşır?",
      options: ["9 adım", "18 adım", "35 adım", "60 adım"],
      answer: 1,
      explanation: "Her adımda hız 0.75 azalır; 13.5 / 0.75 = 18 adımda sıfıra iner. 35 adım yere dönüşün toplam süresidir, 60 ise bir saniyedeki adım sayısı.",
    },
    {
      question: "Hiç yıldız toplamadan tam 30 saniye hayatta kaldın. HUD ne gösterir?",
      options: ["90 m ve 900 puan", "180 m ve 1800 puan", "180 m ve 180 puan", "Hıza bağlı, hesaplanamaz"],
      answer: 1,
      explanation: "30 s × 60 adım = 1800 adım; mesafe sayacı bunun onda birini, yani 180 m yazar, skor ise adım başına 1 puanla 1800 olur. Oyun hızı bu sayıları hiç etkilemez.",
    },
    {
      question: "Oyun hızı 5'ten 15 piksel/adıma çıktığında tek bir zıplamada ne değişir?",
      options: ["Gemi daha yükseğe çıkar", "Havada kalış süresi kısalır", "Havada alınan yatay yol üç katına çıkar", "Hiçbir şey değişmez"],
      answer: 2,
      explanation: "Dikey hareket yalnızca v₀ ve g'ye bağlıdır: 35 adım, 114.75 piksel. O 35 adımda dünya 175 yerine 525 piksel kayar; kemer yayvanlaşır ama alçalmaz.",
    },
  ],
  next: [
    { href: "serbest-dusme.html", title: "Serbest Düşme", why: "Geminin zıplama denklemi burada gerçek birimlerle, hava direnci de eklenerek karşına çıkar." },
    { href: "atislar.html", title: "Atış (3B)", why: "Yatayla dikeyin bağımsızlığını üç boyutta gör: aynı kemer, bu kez açı ve hızla." },
    { href: "hareket-ve-grafikler.html", title: "Hareket ve Grafikler", why: "Mesafe sayacının neden bir kronometre olduğunu konum-zaman ve hız-zaman grafikleriyle çöz." },
    { href: "pong.html", title: "Pong", why: "Aynı 60 adımlık döngü ve çarpışma mantığı, bu kez yerçekimsiz bir topla." },
  ],
  sources: [
    { title: "Wikipedia · Moon Patrol", url: "https://en.wikipedia.org/wiki/Moon_Patrol", note: "1982 tarihli Irem oyunu; paralaks kaydırma ve otomatik ilerleyen araçla kraterlerden atlama (İngilizce)." },
    { title: "Wikipedia · Dinosaur Game", url: "https://en.wikipedia.org/wiki/Dinosaur_Game", note: "Chrome'un çevrimdışı dinozoru: 2014, Project Bolan ve 17 milyon yıl anlatısı." },
    { title: "MDN · Anatomy of a video game", url: "https://developer.mozilla.org/en-US/docs/Games/Anatomy", note: "Oyun döngüsü, requestAnimationFrame ve sabit zaman adımı; bu sayfadaki döngünün açıklaması." },
    { title: "OpenStax · University Physics, Cilt 1", url: "https://openstax.org/details/books/university-physics-volume-1", note: "Serbest düşme ve atış hareketi bölümleri; zıplamanın sürekli zaman formülleri (açık ders kitabı)." },
  ],
  revision: "Ekim 2026",
};
