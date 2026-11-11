# Simülasyon Notları (yazar ajanlarından)

Keşif Defteri yazarları her sayfanın kodunu okurken fark ettikleri hata ve zayıflıkları bildirdi.
Bu liste **simülasyon iyileştirme** aşamasının girdisidir. Bir madde düzeltildiğinde ilgili defterin
laboratuvar deneyleri de (sayfa davranışına bağlı sayılar) yeniden kontrol edilmelidir.

Durum: ❑ bekliyor · ✔ yapıldı

## algoritmalar.html

- ❑ Canvas colors use CSS variables, which the 2D canvas API ignores: algoritmalar.html sort panel drawArr() sets ctx.fillStyle = "var(--accent)" (invalid, so the previous fillStyle sticks). On first paint bars are drawn black on the dark background; once a highlight runs, every non-highlighted bar takes the last highlight color (#fbbf24/#f472b6), so the 'focus' coloring the description promises is indistinguishable. Same bug in the graph panel (strokeStyle "var(--accent)"/"var(--border)", fillStyle "var(--text-muted)") and the Big-O chart axis labels (fillStyle "var(--text-muted)": invisible on first draw, red after any resize). Fix: use literal hex colors or read getComputedStyle(document.documentElement).getPropertyValue('--accent').
- ❑ Big-O chart axis labels do not match the plotted scale: x labels read 0,20,…,100 but the curves are drawn for n = 0…20 (label '100' sits at n = 20); y labels 0…100 are placed with ph/10 spacing while curves use ph/120 per unit (and clip at 120). Either relabel (x: 0,4,8,…,20; y: 0,24,…,120) or change the plotting scale.
- ❑ DP panel silently computes different n in the two boxes: naive is capped at min(n, 40) while DP uses the clamped n (5–45). For n = 41–45 the naive box shows F(40) = 102 334 155 next to DP's F(45) = 1 134 903 170 with no notice. Show a caption like 'naif hesap güvenlik için 40'ta durduruldu' or disable the naive box above 40.
- ❑ Insertion sort's displayed counters lag: comparisons++ happens before the break, but updateStats() is only called after a shift, so the final 'Karşılaştırma' readout is typically 1 lower than the true count and, on an already-sorted array (press Başlat twice), shows 0/0 although 39 comparisons were made. Call updateStats() after the inner while loop (and after the outer loops in all algorithms).
- ❑ Quick sort's partition counts self-swaps: when arr[j] < pivot with i === j, [arr[i], arr[j]] is swapped with itself and swaps++ fires; on a sorted array the readout shows 819 'yer değiştirme' for 40 elements. Guard with if (i !== j) before swapping/counting. Also the page offers no deliberate 'sorted / reversed input' button, which is the most instructive comparison (quick worst case, insertion best case).
- ❑ 'Yer Değiştirme' means different things per algorithm (bubble/selection/quick: swaps; insertion: shifts; merge: elements taken from the right half) but is shown under one label. Consider per-algorithm labels or a tooltip.
- ❑ Search panel: both 'Doğrusal Ara' and 'İkili Ara' call resetBars() first, so the two methods can never be compared on the same array, and the default target 42 is present only ~22 % of the time (20 values drawn from 5–84). Suggest: keep the array between searches (regenerate only via Sıfırla) and either pick the default target from the array or add a 'rastgele hedef seç' button. The input's min=1/max=99 are not enforced (parseInt accepts anything; 0 becomes 42 via || 42).
- ❑ Graph panel description says 'Başlangıç düğümüne tıklayarak keşif sırasını izleyin' but the canvas has no click handler; traversal always starts at A (node 0). Add hit-testing on nodes or fix the text. DFS never prints a 'tamamlandı' line with the final order (BFS does), so the DFS order A→B→D→G→E→C→F→H→J→I can only be read from the #numbers.
- ❑ Sort speed button: 'Başlat' during a running sort sets running=false then restarts on the partially sorted array with counters reset; acceptable but surprising. Bubble at normal speed takes 780×25 ms ≈ 20 s (≈ 5 s with ⚡ Hızlı); a progress or 'bitti' indicator would help.
- ❑ Complexity cards (complexityGrid) have cursor:pointer styling but no click handler; the DP panel labels naive Fibonacci as O(2ⁿ) although the true growth is Θ(φⁿ), φ ≈ 1.618 (2ⁿ is only a loose upper bound). The merge sort animation also has an unused `arr.length`-based `sleep(20)` copy phase that is not counted anywhere.

## altin-oran.html

- ❑ altin-oran.html: the spiral is not a golden spiral. generateFibonacciSpiral() multiplies radius by φ every 45° (angle += Math.PI/4), so it grows φ⁸ ≈ 47× per turn instead of φ⁴ ≈ 6.85×; a real golden spiral needs φ per 90° (or growth factor √φ ≈ 1.272 per 45°). The page title promises 'Altın Oran & Fibonacci Spirali' but shows neither; the digest documents this honestly, but the code should be fixed.
- ❑ altin-oran.html: 100 spheres are generated but only ~12 are ever visible at the default camera (z = 20, fov 75 sees ~15 units of radius; sphere 12 is at r = 32, sphere 20 at r = 1513). Because every sphere has a fixed 0.2 radius, zooming out makes them sub-pixel after ~15 spheres, and beyond camera distance 1000 the far clipping plane empties the scene entirely. Suggest ~30 spheres, radius scaled with distance, or a logarithmic layout, plus camera.far raised.
- ❑ altin-oran.html: the 45° step aligns every sphere on 8 straight rays, so the scene looks like spokes, not a spiral or a sunflower. Using the golden angle (137.508°) with r ∝ √n (Vogel's model) would show real phyllotaxis and the Fibonacci parastichy counts, which is the content the page is named after.
- ❑ altin-oran.html: sphere.rotation.y += 0.005 in animate() has no visible effect because spheres use a uniform MeshBasicMaterial (unlit, single color); dead code or should be replaced by a visible animation.
- ❑ altin-oran.html: there is no UI at all (no sliders, readouts, labels, legend), no title overlay, no hint that the mouse rotates/zooms; the only interaction is OrbitControls. Adding controls for step angle (45° vs 137.5°), growth factor, and sphere count would make the lab tasks far richer. Also the inner 4–5 spheres (r = 0.1…0.42 with 0.2 sphere radius) overlap into a single blob.
- ❑ altin-oran.html: renderer and camera are sized to window.innerWidth/innerHeight and body has overflow:hidden inline; shared/digest.css overrides overflow-y so the Keşif Defteri is reachable, but the full-window canvas then scrolls away with the page rather than staying as a header-sized stage. Consider giving the canvas a fixed height container like other pages.

## bicimsel-diller-ve-otomata-teorisi.html

- ❑ DFA panel: the description text and the dfaInfo line say the machine accepts 'çift sayıda 0 ve tek sayıda 1', but the code (states[] in section 2, `accept: true` only on q0, comment 'q0: çift 0, çift 1 (kabul)') accepts even 0s AND even 1s. The default input '0101' (two 1s) is therefore shown as KABUL, contradicting the panel text. Fix either by moving `accept: true` to q2 (then update the digest's lab experiment 1, core card 2 and quiz 1, which currently describe the as-built behaviour) or by changing the text to 'çift 0 ve çift 1'. Moving the text is the smaller change and keeps the digest valid.
- ❑ DFA panel: the ▶️ Çalıştır button (run()) does not re-read #dfaInput; it reuses the stale inputStr. A user who types a new string and clicks Çalıştır runs the previous string. Fix: read the input value at the start of run() (same as the Enter/Sıfırla handlers).
- ❑ DFA panel: step() silently returns for any character other than '0'/'1', so a string like '012' freezes the machine with no feedback, and an empty string (after Enter) never produces a verdict even though ε should be accepted at q0. Suggest validating the input (show a warning) and evaluating result immediately when inputStr is empty.
- ❑ DFA canvas: ctx.strokeStyle / ctx.fillStyle are assigned CSS custom-property strings ('var(--accent)', 'var(--border)', 'var(--text-muted)'); Canvas 2D ignores invalid colour strings, so the accept-state double circle, non-current state borders and the 'Giriş:' label inherit whatever colour was set previously (e.g. the yellow #fbbf24 of the current state). Replace with concrete hex/rgba values or read the CSS variable via getComputedStyle.
- ❑ DFA canvas: paired transitions (q0↔q1 on '0', q0↔q2 on '1', etc.) are drawn as two overlapping straight segments with arrowheads at both ends and labels at the same midpoint, so the diagram looks like undirected double-headed edges; curved/offset arcs would make the direction readable. The self-loop branch in draw() is dead code (no self-loops in the transition table).
- ❑ Regex panel: the default pattern in the HTML attribute is value="^[a-z]+@[a-z]+\\.(com|org)$" — HTML attributes do not process backslash escapes, so the live pattern contains two backslashes (\\ = literal backslash, then . = any char) and the page loads showing ❌ EŞLEŞMEDİ for 'test@example.com'. Fix: use a single backslash in the attribute (value="^[a-z]+@[a-z]+\.(com|org)$"). The digest's experiment 3 currently relies on the buggy default; if the page is fixed, rewrite that experiment (the anchors/char-class/alternation parts remain valid).
- ❑ Regex panel: the description claims 'Her regex bir DFA'ya dönüştürülebilir', but the box uses JavaScript RegExp, which supports backreferences (\1), lookahead etc. and thus matches non-regular languages (e.g. ^(.+)\1$ matches ww). Consider a one-line caveat in the panel text.
- ❑ Turing machine panel: the description says '▼ kafanın konumunu gösterir' and 'B boş hücreyi', but the renderer never draws ▼ (the head is the raised, glowing cell) and blanks render as '␣'. The '.tm-cell.visited' CSS class is never applied (dead style). Align text with rendering.
- ❑ Turing machine panel: the 'Bant' readout filters out B cells and parses the remainder as binary, so intermediate tapes show misleading decimal values (1011 → 1010 (10) → 1000 (8) → 1100 (12)); this is pedagogically interesting (the digest uses it) but could be labelled 'ara değer' during computation to avoid confusion.
- ❑ Complexity panel: the NP-Hard card lists 'Halting Problem (karar verilemez!)' as an example, which is correct, but the P ⊆ NP / NP ⊆ PSPACE descriptions are only shown as native title tooltips on hover, which are not accessible on touch devices; consider a click-to-reveal detail box like the automata cards.

## bilgisayar-sistemleri-ve-mimarisi.html

- ❑ Pipeline (bilgisayar-sistemleri-ve-mimarisi.html, stepPipeline ~line 777-784): an instruction reaching the WB stage is immediately set to null, so the WB box and the WB history column are never shown as occupied. The instruction vanishes after MEM. Fix: let the instruction sit in WB for one cycle and remove it on the following step.
- ❑ Pipeline hazard (line 775, 792-795, 806-809): the 'data hazard' is a Math.random() < 0.15 event that only suppresses the next fetch and colours the EX cell red; instructions already in the pipe keep advancing, so nothing actually stalls. The instruction list itself contains real RAW hazards (SUB R4,R1,R5 and LW R6,0(R1) both read R1 written by ADD R1,R2,R3) that could be detected deterministically and used to freeze IF/ID while EX bubbles — far more educational than random red cells. Also a hazard can be flagged after all six instructions were fetched (no effect but still shown red).
- ❑ Pipeline stage boxes (renderStages, line 759) show the instruction index (0-5) while the history rows show the instruction text truncated to 8 chars ('ADD R1,R'), so the two views do not match; show the mnemonic in both.
- ❑ Number converter (lines 978-1006): values >= 2^31 (e.g. 2147483648) are displayed as positive decimals but their 32-bit two's-complement row starts with 1; values >= 2^32 (e.g. 4294967296) get a two's-complement row of all zeros and bytes 0·0·0·0 because of >>> 0 wrapping. Inputs like '12abc' silently parse as 12, '3.7' as 3, and '-0x10' as -0 (parseInt with base 10 on a prefixed negative). Decimal cell uses toLocaleString, so the thousands separator depends on browser locale. Suggest range validation (|x| < 2^31) and an explicit error for malformed input.
- ❑ Binary Tree tab (drawTree, lines 1356-1372): edges are drawn by handing each parent the next two children in level order, not by BST relationship. With the default data (sorted 8,17,42,56,93) the picture shows 17 with children 8 and 56, and 93 with none; in a correct BST 56 is the left child of 93. Also the tree is rebuilt perfectly balanced from the sorted array on every draw, so it never shows insertion order or degeneration — the dsInfo claim 'O(log n) ortalama' is not demonstrated.
- ❑ Data-structure canvas overflow (lines 1155-1161, 1176-1177, 1214-1215, 1262-1263): the shared items array is capped at 12 by items.shift(), which silently removes the BOTTOM of the stack (physically wrong for a stack). Even below the cap, 9+ stack items are drawn above the canvas top (H <= 280 px, 34 px per item) and 12 queue/list nodes (912 px / 1368 px wide) run off the right edge at typical widths.
- ❑ Linked List info text (line 1312) says 'Başa ekleme O(1)' while the Ekle button appends to the tail (items.push) and the drawing labels the first element HEAD.
- ❑ Gate cards (lines 1079, 1099-1107): AND is the active gate on load but no card is highlighted until clicked; selecting the NOT gate hides B but keeps the old inputB value for when another gate is reselected (harmless, but a small inconsistency).
- ❑ Memory hierarchy / concept-card content errors: 'Dosya Sistemleri' card (line 1512) says ext4 has '1 EB max dosya' — ext4's maximum file size is 16 TiB (with 4 KiB blocks); 1 EiB is the maximum volume size. 'Register ~1 KB' in the pyramid is a loose figure (a 64-bit core's architectural registers are a few hundred bytes; the physical register file is a few KB) — consider labelling it 'birkaç yüz bayt – birkaç KB'.

## cizge-teorisi.html

- ✔ Düzeltildi (Kasım 2026): Königsberg örneği artık Euler'in gerçek çoklu çizgesi (dereceler 5, 3, 3, 3; Euler yolu yok). Paralel kenarlar ayrı eğriler olarak çiziliyor ve elle eklenebiliyor; Sil en yakın kenarı siliyor; kenar ağırlığı girilebiliyor (Kenar ağırlığı, Ağırlık Ver); BFS/DFS için başlangıç düğümü seçiliyor ve DFS gerçek derinlik öncelikli; Dijkstra yalnız var olan düğümleri listeliyor ve paralel kenarların en hafifini kullanıyor; sonuçlar düğüm sürüklenince silinmiyor; tam sayı ağırlıklarda uzaklık tam sayı yazılıyor; tuval açık temaya uyuyor; emoji kaldırıldı.
- ❑ İlmek (self-loop) yok; "ilmek dereceye 2 ekler" durumu gösterilemiyor.
- ❑ Tuval yalnız fare ve dokunmayla kullanılıyor; klavye alternatifi yok.
- ❑ `neighbors()` her çağrıda bütün kenarları tarıyor; BFS/DFS O(|V|·|E|) çalışıyor (defter "komşuluk listesiyle O(|V|+|E|)" diyor).
- ❑ Mod değiştirmek (`setMode`) sonuç metnini ipucu metniyle eziyor; vurgular kalıyor ama sonuç yazısı kayboluyor.
- ❑ Düğümler tek tek eklenince Hedef menüsü en yeni düğümü değil 1'i seçili tutuyor. Etiketler yalnız kendi kenarı boyunca kayarak çakışmadan kaçıyor; yoğun çizimlerde yine çakışabilir. Nehir çizimi düğüm sürüklenince yerinde kalıyor.

## derleyici-ve-yorumlayicilar.html

- ❑ AST canvas: ctx.fillStyle = "var(--text-muted)" is not valid for canvas (CSS variables are ignored), so the expression label at the top of the canvas and the 'İfade seçin…' placeholder are drawn with whatever fillStyle was previously set. On the very first draw that is the canvas default black, invisible on the dark theme; later draws inherit #fff from node labels. Fix: resolve the CSS variable via getComputedStyle(document.documentElement).getPropertyValue('--text-muted') or hard-code a color. (derleyici-ve-yorumlayicilar.html, AST block, draw())
- ❑ AST button '(a + b) * c' (btnAst2) actually calls parseExpr("a+b*c"): the mini recursive-descent parser has no parenthesis support (it splits only on + - * / =), so the drawn tree is a + (b × c) with root '+', contradicting the button label; the info text only half-admits this. Either add a parsePrimary case for '(' … ')' (which also enables a free-text expression input) or relabel the button. The digest turns this into an honest observation task, but the page would be better if the tree matched the label. (AST block, parsePrimary/btnAst2)
- ❑ AST parser cannot handle assignment: parsePrimary treats '=' as a prefix node with left: null, and for 'x = …' it returns the bare identifier x and silently drops the remaining tokens. That is why btnAst3 hard-codes its tree. Worth implementing a proper assignment level (lowest precedence) so all three buttons go through the same parser. (AST block)
- ❑ Lexer identifier rule is ASCII-only ([a-zA-Z_][a-zA-Z0-9_]*): on a Turkish site a student typing 'int sayı = 5;' gets 'say' as identifier and 'ı' as PUNCTUATION. Consider \p{L}/\p{N} with the u flag so Turkish identifiers tokenize as one token (most modern languages allow Unicode identifiers). (Lexer block, tokenize())
- ❑ Lexer number rule accepts any run of digits and dots, so '1.2.3' becomes a single NUMBER token; no error is shown. Minor, but a short 'geçersiz sayı' highlight would be more instructive. (Lexer block)
- ❑ Lexer keyword list lacks common C/C++ types such as bool, long, short, unsigned, string, so these show up as identifiers; '->' is split into '-' and '>' operators. (Lexer block, keywords set)
- ❑ Pipeline stage 'Semantik Analiz' is labeled 'AST → IR' but semantic analysis produces an annotated/type-checked AST; IR generation is a separate step (the 'Optimizasyon' stage then says IR → IR'). Suggest 'AST → tipli AST' or adding an IR-generation note so the stage labels are internally consistent. (Pipeline stages array)
- ❑ Concept card 'Tail Call Optimization' says 'Scheme, Haskell, Lua garantiler': Scheme (R5RS+) and Lua (5.x) require proper tail calls; Haskell's guarantee is a property of GHC's evaluation model rather than a language-spec requirement. Softening to 'Scheme ve Lua dil düzeyinde garanti eder' would be more accurate.

## dna-replikasyon.html

- ✔ Düzeltildi (Ekim 2026): adım düğmeleri artık boş tuval göstermiyor. Kalıp iplikler her adımda tam görünür; bir adım düğmesi Oynat'ı durdurur ve o adımı bir kez canlandırıp son hâlinde bırakır. Oynat adımları kısa bir duraklamayla döndürür; prefers-reduced-motion açıkken adımlar doğrudan son hâlleriyle çizilir.
- ✔ Düzeltildi (Ekim 2026): yeni iplik artık kalıbın üstüne çizilmiyor. Her yeni iplik kendi kalıbının iç tarafında (newOffset = 34 px), yeşil omurgayla ayrı bir sıra olarak çiziliyor ve her baz kalıptaki eşine noktalı çizgiyle bağlı. 4. Tamamlanma'da "Gri: eski (kalıp) iplik · Yeşil: yeni iplik" açıklamasıyla iki ürünün her biri görünür biçimde "bir eski + bir yeni".
- ✔ Düzeltildi (Ekim 2026): 5′/3′ etiketleri ve yön hataları. Dört ipliğin de iki ucu etiketli: kalıplar gri (üst 5′ sol / 3′ sağ, alt 3′ sol / 5′ sağ), yeni iplikler yeşil (üst 3′ sol / 5′ sağ, alt 5′ sol / 3′ sağ). Üst yeni iplik sağdan sola, alt yeni iplik soldan sağa büyüyor; "← DNA Pol III" ve "DNA Pol III →" etiketleri büyüyen ucu izliyor ve yönleriyle tutarlı.
- ✔ Düzeltildi (Ekim 2026): primerler artık her yeni ipliğin 5′ ucunda, kalıbın 3′ ucunun karşısında (üstte en sağdaki, altta en soldaki iki baz). 4. Tamamlanma'da mor kareler animasyonun yarısında kayboluyor; adım metni primerin DNA ile değiştirilmesini (DNA polimeraz I) ve ligazı söylüyor.
- ✔ Düzeltildi (Ekim 2026): "Helikaz" yazısı yalnız 1. Açılma'da görünüyor (sol üst açıklama); resize() artık draw() çağırıyor; etiketlerden önce textAlign açıkça ayarlanıyor.
- ❑ dna-replikasyon.html: hâlâ gerçek çatal geometrisi yok. 1. Açılma'da iki kalıp paralel çizgiler olarak düzgünce ayrılıyor; Y biçiminde bir taraftan açılmıyor. Adım 1 metni ise "replikasyon çatalı oluşur" diyor. Soldan sağa (ya da merkezden dışa) ilerleyen bir açılma metinle uyuşur.
- ❑ dna-replikasyon.html: öncü/geciken iplik ayrımı ve Okazaki parçaları hâlâ gösterilmiyor; iki yeni iplik de tek primerden kesintisiz büyüyor. Çatal yönü çizilince, çataldan uzaklaşan iplik 2–3 kısa parça ve her biri için ayrı primerle doldurulmalı.
- ❑ dna-replikasyon.html: RNA primeri karelerinin içinde T harfi yazıyor (her iki primer de bir T içeriyor); RNA'da T yerine U bulunur. Primer bazlarında T → U gösterilmeli (Tamamlanma'da primer silinince T'ye dönebilir; bu, primerin DNA ile değiştirilmesini de görünür kılar).
- ❑ dna-replikasyon.html: primerler 12 bazlık parçanın en uçlarında duruyor; Pol I'in primerin yerini doldurması için primerin ötesinde uzatacağı bir 3′ ucu gerekir. Parçanın uzun bir molekülün penceresi olduğu (iki uçta kesik omurga ya da "…" işareti) belirtilirse çizim kendi içinde tutarlı olur.
- ❑ dna-replikasyon.html tick(): animasyon hâlâ kare başına sabit 0.012 ilerliyor, Oynat'taki duraklama da 70 kare; dt yok. Hız ekran yenileme hızına bağlı (120 Hz ekranda iki kat hızlı). Zaman damgası farkı kullanılmalı.
- ❑ dna-replikasyon.html: prefers-reduced-motion açıkken 3. Sentez'de "DNA Pol III" etiketleri hiç görünmüyor (yalnız anim < 1 iken çiziliyorlar); sentez yönü bu kullanıcılar için yalnız yeşil 5′/3′ etiketlerinden okunabiliyor. Statik görünümde etiketleri yeni ipliğin 3′ ucunda göstermek yeterli olur.

## elektrikli-araclar.html

- ❑ Ion direction is tied to SoC instead of mode (elektrikli-araclar.html, initIons, ~line 174: inAnode=(soc<50&&charge)||(soc>50&&discharge)). Below 50% SoC the Li+ dots flow cathode→anode during discharge and anode→cathode during charge, contradicting the info line under the canvas. Fix: inAnode = (mode==='discharge').
- ❑ Ion reset condition never fires correctly (~line 269: ion.targetX===cX+cW/2; cX is scoped inside draw() and targetX is random, so it is never equal). After the first traverse every ion is reset to the cathode side regardless of its direction, so anode→cathode ions jitter in place until the random 1%-per-frame re-init. Fix: store a direction flag on each ion and reset x to the proper start side.
- ❑ SoC readout prints floating-point garbage ('79.69999999999999') because soc is decremented by 0.15/0.2 per frame and printed raw (~lines 302 and 308). Fix: Math.round(soc) or soc.toFixed(0) when displaying.
- ❑ SoC rate is frame-rate dependent (per-frame constants, no dt; ~lines 313-314): 80→5 takes ~8.3 s at 60 Hz but ~4 s on a 120 Hz screen. Fix: scale by elapsed time (e.g. 9 %/s × dt).
- ❑ '⏸ Durdur' freezes SoC but ions keep moving because draw() advances ion.phase (~lines 267-268) and animate() calls draw() in pause mode. Either freeze the phase in pause or rename the button.
- ❑ Electron dots on the external circuit are static (eDir only offsets positions by 0.03, ~lines 258-264), so electron flow direction is never actually visualized; animate the dot positions with time and reverse on charge.
- ❑ Initial ion.phase is random in [0, 2π) but the reset threshold is phase>1 (~line 181), so most ions start past their target at initIons and overshoot for the first frames. Use Math.random() alone.
- ❑ Content error in the SRM motor card (~line 367): Renault Zoe uses a wound-rotor (externally excited) synchronous motor, not a switched reluctance motor; the 'Dyson projesi' claim is unverified. The card should name a real SRM application or drop the Zoe example.
- ❑ Labelling inconsistency: the '🔌 Şarj (Regen)' button relabels the external device as 'ŞARJ CİHAZI 🔌' (~line 254), but regenerative braking energy comes from the motor acting as a generator, not from a charger. Consider 'MOTOR (jeneratör)' for regen or renaming the button to plain 'Şarj'.
- ❑ Asenkron motor card (~line 365) says Tesla Model S/X use an induction front motor 'in the performance version'; the 2019+ Raven S/X use a permanent-magnet front motor with induction rear, and Plaid is all-PM. The claim should be checked and reworded (e.g. 'eski nesil Model S/X').
- ❑ Page desc (~line 76) states 'Tesla Model 3: 96s46p ~400V, ~75 kWh'; nominal is ~355 V (96×3.7), ~400 V is the fully charged value. The digest explains this; the page could say 'nominal ~355 V, dolu ~400 V'.

## elektrokimya.html

- ❑ Mislabelled potential on the anode line (elektrokimya.html, updateReactionsBox): the Anot row prints 'E°yük = −0.76 V' but the value is the tabulated REDUCTION potential (anotRed). An oxidation potential would be +0.76 V. Either relabel it 'E°ind' / 'E° (indirgenme)' or print the sign-flipped value; as it stands the subscript contradicts the number and invites the classic student error.
- ❑ The 'Kendiliğinden değil ✗' and 'Dengede' branches of spontaneityDisplay are unreachable: every entry in `pairs` is pre-ordered with the lower-E° metal as anode, so ecell is always positive. A 'Yönü çevir' (swap anode/cathode) toggle would let the page actually show a negative E°cell, ΔG > 0 and the link to electrolysis.
- ❑ Electron animation speed is frame-rate dependent (animate(): el.t += el.speed * 0.016, ignoring the timestamp argument). On 120 Hz displays electrons move twice as fast. Use the real delta time from `ts`.
- ❑ Electron speed and density do not depend on the cell potential: 0.47 V (Pb/Cu) and 3.17 V (Mg/Ag) look identical on the canvas except for the voltmeter digits. Scaling speed (or the number of visible electrons) with ecell would make the comparison between pairs visible.
- ❑ Electrons are drawn flowing THROUGH the voltmeter; an ideal voltmeter draws (almost) no current. Physically the animated current needs a load (a bulb or resistor) in series, with the voltmeter in parallel, or the device should be labelled as a load/ammeter. Small conceptual issue but the digest has to tiptoe around it.
- ❑ The salt bridge shows no ion movement (no NO₃⁻ drifting toward the anode compartment, no K⁺ toward the cathode), so the most common misconception ('electrons go through the salt bridge') is not visually addressed. A few slow ion particles in the bridge would be a cheap and valuable addition.
- ❑ No electrode mass change: the anode never thins and the cathode never thickens, and the solution colours never change; a simple time-based animation would connect the picture to Faraday's laws. Also no concentration/Nernst control at all; the page is a Q = 1 snapshot only.
- ❑ Minor: metalInfo Mg and Al entries have `"color"` quoted as a string key (harmless but inconsistent). The potential table lists F₂ as the only non-metal; adding O₂/H₂O and Cl₂ would make the 'ladder' idea and corrosion more complete. Table highlighting compares floating-point ev values with === (works today because the same literals are used, but fragile).

## elektronik-muhendisligi.html

- ❑ Logic canvas: the 'D FF' output is hard-wired to A (`const dOut = A;` in draw()) and ignores the clock entirely; the 'Clock Pulse' button only toggles a `clk` variable 0/1 (a level toggle, not a pulse) and changes nothing else. A real edge-triggered D flip-flop should latch D only on the rising edge (clk 0→1) and hold Q until the next edge. Where: elektronik-muhendisligi.html, section '3. LOGIC CANVAS' (draw() and btnClk handler). The digest's third experiment turns this into an honest observation task, but the page would teach far more if fixed.
- ❑ All three canvases set `ctx.fillStyle`/`ctx.strokeStyle` to CSS custom-property strings such as "var(--accent)", "var(--text-muted)", "var(--border)", "var(--danger)". Canvas 2D does not resolve CSS variables, so these assignments are silently ignored and the previous colour stays in effect. Consequences: in the diode tab the 'boşaltım' label and the 'Anot (+) →' / '← Katot (-)' labels are drawn with the previous fill rgba(255,255,255,0.05) and are practically invisible; the op-amp triangle is stroked with the default black on a near-black background; in the logic canvas gate outputs are not coloured green/red by value (all stay white). Fix: read the computed value via getComputedStyle(document.documentElement).getPropertyValue('--accent') or use literal hex colours.
- ❑ Logic canvas: gate boxes are placed at hard-coded x positions (130, 220, 310, 400; each 72 px wide) while the canvas width floors at 340 px; on narrow phones the NAND gate (x 396–468) is clipped off the right edge. The 'temsili' wires also only run to the AND/OR boxes and nothing connects CLK to the D FF box.
- ❑ Op-amp canvas: there is no input control at all (no Vin, no Rf/Rin sliders); the info line therefore only ever shows the two fixed gains (−2 and 3). A Vin slider plus Rf/Rin selectors with a live Vout readout (and saturation at the supply rails) would make the panel a real experiment. The differential-amplifier text mentions 'Rf=Rg olmalı' but no Rg is drawn, and the non-inverting drawing's R1 ground leg is a bare stub.
- ❑ Semiconductor panel: tab labels promise 'BJT (NPN/PNP)' and 'MOSFET (N/P Kanal)' but only NPN and N-channel are drawn/explained; the initial HTML info text for the diode ('İleri yönde 0.7V (Si) eşik gerilimi …') is immediately overwritten by a different sentence from draw(), so the two should be reconciled. Canvases are not DPR-scaled (canvas.width = CSS px), so text is blurry on high-DPI screens.
- ❑ Minor content nits on the page: the UART card says 'Baud rate: 9600-115200' (common values, not a range limit); the MCU detail for Teensy says '2MB Flash' (the board has 1984 KB, fine) and Arduino Uno 'debug yok' is reasonable; ESP32 'Bluetooth 4.2/BLE' is correct for the original ESP32.

## grup-teorisi.html

- ✔ Düzeltildi (Kasım 2026): Cayley tablosu bütün gruplar için tek, indis tabanlı yapıda (V₄ ve S₃ sekmeleri çökmüyor; S₃ permütasyonlardan, "önce b, sonra a" kuralıyla); Z₅ˣ değerleri 1–4 mod 5; alt grup kafesleri koddan hesaplanan Hasse diyagramları (Z₁₂: 6, D₄: 10, A₄: 10 alt grup; A₄'te 6 mertebeli alt grup yok); D₄ paneli gerçek bileşim tutuyor ("sr = önce r, sonra s"; r→s = sr, s→r = sr³); rastgele üreteç φ(n) üreteç arasından düzgün seçiyor ve saat diyagramı üretecin yolunu izliyor; sınıflandırma kartı 1983/2004 ayrımını doğru veriyor; emoji kaldırıldı; temanın gizlediği vurgular görünür.
- ❑ Kafes düğümlerinin yerleşimi grup başına sabit (kenarlar hesaplanıyor); A₄ diyagramı bilerek yamuk; 320 px ekranda etiketler yaklaşık 8 px.
- ❑ Rastgele üreteç aynı üreteci art arda seçebiliyor (düzgün örneklemenin doğası; istenirse bir önceki dışlanabilir).
- ❑ Sayfa kartları "izomorfizm", defter "izomorfizma" diyor; terim birliği sağlanmalı.

## hesaplama-teorisi.html

- ❑ The 'β-Redüksiyon Simülatörü' panel is not a simulator: the textarea #lcInput is never read, and the four buttons (#btnLC1–#btnLC4) only print hard-coded strings. The textarea even says 'Bu satırlar otomatik çalışır', which is false. A real normal-order β-reducer (a few dozen lines) that evaluates what the user types would turn this into a genuine lab; the digest's experiments currently have to fall back to pencil-and-paper for IF FALSE A B, AND TRUE FALSE and PLUS 2 3.
- ❑ Complexity landscape (#landscape, section 6): the last bar sets color to 'var(--danger)' and the code builds background as `${c.color}11`, producing the invalid CSS 'var(--danger)11', so the 'Karar Verilemez' bar has no background tint (only its border-left renders). Use a hex color there or compose alpha with color-mix().
- ❑ Landscape bars have cursor:pointer and a hover brightness effect but no click handler; the only information is a native title tooltip, which does not work on touch devices. Either add a click-to-detail box like the theorem grid or drop the pointer cursor.
- ❑ Landscape ordering implies a linear containment chain P ⊂ NP ⊂ co-NP ⊂ PSPACE …, but co-NP is not a superset of NP (NP vs co-NP is open and they are believed to be incomparable). Drawing NP and co-NP side by side at the same width (or a note) would avoid teaching a false inclusion.
- ❑ Theorem card 'Satz / Matiyasevich Teoremi': 'Satz' is just German for 'theorem' and is not part of the name; the standard names are 'Matiyasevich teoremi' or 'MRDP teoremi' (Matiyasevich–Robinson–Davis–Putnam).
- ❑ Model card 'Post Sistemi / Markov Algoritmaları — Emil Post, 1936-43' attributes Markov algorithms to Post; they are due to Andrey Markov Jr. (1951). Also the Turing card says Turing 'karar verme problemini çözdü' — he proved it unsolvable; 'çözülemez olduğunu gösterdi' would be accurate.
- ❑ Y Combinator button: the FACT definition uses thunks (λx.1), (λx.MULT …) but the displayed trace 'IF (ISZERO 3) 1 (MULT 3 ((Y F) 2))' drops them, so the two halves are inconsistent; also the Y combinator is not attributed (Haskell Curry).
- ❑ Decidability table includes a joke row 'Mortgage Hesaplama … 😄' among real theorems; it skews the EVET/HAYIR count (5/7) and reads as noise in an otherwise rigorous table. Consider removing it or replacing with a real decidable problem such as 'Regex → dizgi eşleşmesi' or 'Presburger aritmetiği'.
- ❑ Gödel card's link sentence ('Tutarlılık kanıtı yapmaya çalışan bir program sonsuza kadar çalışır veya yanlış sonuç verir') is hand-wavy; the precise connection is that incompleteness follows from the undecidability of the halting problem (a sound, complete proof system for 'M halts on w' would decide halting).
- ❑ Cook-Levin card gives only 1971; Levin's independent result is 1973. Minor, but the card title pairs both names.

## internet-ve-ag-teknolojileri.html

- ❑ Paket Yolculuğu: the 'Gecikme' readout is pure random (10–50 ms per hop, 30–210 ms at arrival, in animate()/updateStats()) and is not derived from distance. It can show values below the physical light-in-fiber minimum (~54 ms one-way for Istanbul–San Francisco, ~10 800 km). Worth computing per-edge latency from geographic distance (d / 200 000 km/s) and summing, so the number teaches something.
- ❑ Paket Yolculuğu: animation is frame-based (pkt.progress += 0.012 * speed per requestAnimationFrame), so the journey takes ~7 s on a 60 Hz display but ~3.5 s on 120 Hz. Should use elapsed time (performance.now delta) instead.
- ❑ Paket Yolculuğu: TTL inconsistency — the stat box starts at 64 while the label drawn on the packet during the first segment shows 'TTL:63' (TTL_INIT − (segIndex + 1)); on arrival the box shows 59 but the packet label shows 59 only on the last segment. Pick one convention (decrement on router exit) and apply it to both.
- ❑ Paket Yolculuğu: nodes 'Frankfurt IXP' and 'Chicago' are drawn with edges but never used; there is no way to change the route. A 'reroute' button or a toggle to cut a link (e.g. Londra–New York) would show why alternative paths exist.
- ❑ TCP el sıkışma: before the first click the packets display 'seq=0', 'seq=0, ack=1', 'seq=1, ack=1', but after clicking they become 1000/5000/1001/5001. The initial placeholders should match the values the animation uses (or be blank).
- ❑ DNS: the flow is a template, not a resolver. The 'Root Sunucu' row always says '.com TLD' regardless of the typed domain (e.g. tr.wikipedia.org), and the answer is always 93.184.216.34. At minimum derive the TLD from the input (last label) and vary the shown IP; a 'second query → cached' path would also be valuable. Note 93.184.216.34 is the historic example.com address, which changed in 2024.
- ❑ Alt Ağ Hesaplayıcı: input is not validated — octets > 255 or non-numeric text do not throw (ipToNum yields NaN → '0.0.0.0'), so the '⚠️ Geçersiz IP/CIDR' branch is effectively unreachable. Also /32 shows 'Toplam Adres 0' (should be 1), and typing /0–/7 or /31–/32 in the text box works while the slider is clamped to 8–30, producing a slider/text mismatch.
- ❑ OSI panel: TLS is listed under both layer 7 (Uygulama) and layer 6 (Sunum), and the protocol card puts TLS 1.3 at L6 and Wi-Fi 6 at L1 only (802.11 also defines the L2 MAC). Minor, but students will ask.
- ❑ Protocol cards: minor factual drift — 'Wi-Fi 6E' is described as 'yakında 6 GHz' though 6E has shipped since 2021; HTTP/3 card could note that 0-RTT applies to resumed connections only.

## isaretciler-ve-bellek-yonetimi.html

- ❑ Bellek Modeli tuvali: 'Genel Görünüm / Stack / Heap' sekmeleri hiçbir şey değiştirmiyor. draw() içinde vizMode hiç okunmuyor (isaretciler-ve-bellek-yonetimi.html ~satır 327-397); ya sekmeler kaldırılmalı ya da Stack/Heap sekmelerinde çerçeve/parça yakınlaştırması çizilmeli.
- ❑ Canvas'ta ctx.fillStyle = 'var(--text-muted)' geçersiz (canvas CSS değişkeni çözmez) ve sessizce yok sayılıyor. Sonuç: çağrı yığını boşken 'Stack boş. Çağrı başlatın.' yazısı varsayılan siyahla koyu zemine çizildiği için görünmüyor; bellek modelinde açıklama satırları ve adres etiketleri bir önceki fillStyle rengiyle (segment rengi, 'Boşluk' etiketi ise %5 opak beyazla) çiziliyor. Sabit bir renk (ör. '#94a3b8') ya da getComputedStyle ile çözülmüş değer kullanılmalı (satırlar ~359, ~364, ~373, ~380, ~562, ~577, ~599).
- ❑ Bellek modeli haritasında 'İşletim Sistemi' bölgesi en düşük adreslere (0x00000000 tarafına) çizilmiş; geleneksel x86/Linux düzeninde çekirdek alanı adres aralığının en üstündedir (32-bit'te 0xC0000000-0xFFFFFFFF), yığın onun hemen altında başlar. Ayrıca 'Data' açıklaması 'sabit string'ler' diyor; string sabitleri genelde .rodata'dadır (küçük hassasiyet).
- ❑ Çağrı yığını tuvali: üstteki '↓ Stack büyüme yönü ↓' oku aşağıyı gösterirken çerçeveler tabandan yukarıya doğru yığılıyor; 'Stack Pointer (SP)' etiketi de taban çizgisinde duruyor, oysa SP en üstteki (en yeni) çerçevede olmalı. Çizim ya ters çevrilmeli (en yeni çerçeve altta, SP altta, yüksek adres üstte) ya da ok ve SP etiketi en üst çerçeveye taşınmalı.
- ❑ Çağrı yığını: 5-6 çerçevede çerçeve yüksekliği ~39 px'e düşüyor (fh = min(70, (H-40)/n - 4)) ama içine param/locals/dönüş olmak üzere 3 satır metin (y+16, y+34, y+48, y+62) yazılıyor; metin kutunun dışına, komşu çerçevenin üstüne taşıyor. Satır sayısı yüksekliğe göre azaltılmalı ya da tuval yüksekliği çerçeve sayısına göre büyümeli.
- ❑ Çağrı yığını: frames[].returnAddr alanı ('main+0x14', 'factorial(5)+0x0C') hiç çizilmiyor; yerine 0x4000 + i*16 gibi yapay bir dönüş adresi gösteriliyor. Gerçek returnAddr metni gösterilirse öğretici değer artar. Ayrıca stackInfo satırı SP'yi küçük harf hex (0x7f70) yazarken canvas adresleri büyük/küçük karışık.
- ❑ İşaretçi simülatörü: 'int *p = &x' ve 'y = *p' düğmeleri tekrar tekrar basılabiliyor ve her basışta adsız yetim hücreler (eski p/y) birikiyor; vars[] yalnızca son adresi tutuyor. İkinci basışta düğme pasifleşmeli ya da var olan hücre güncellenmeli.
- ❑ İşaretçi simülatörü: 'p = NULL' sonrası 'y = *p (deref)' ve 'p++' hiçbir tepki vermiyor (sessizce return), oysa bilgi satırı 'Dereference edilirse segmentation fault!' diye söz veriyor. NULL deref'te kırmızı bir 'Segmentation fault' mesajı, p++ ile var olmayan hücreye gidip deref edilince 'çöp/wild okuma' mesajı gösterilmeli (btnDeref ~satır 495-507, btnPtrArith ~509-521).
- ❑ İşaretçi simülatörü: p++ sonrası bilgi satırı 'Şimdi sonraki bellek hücresini gösteriyor' diyor ama sonraki hücre p'nin kendisi (0x104); deref edince y = 260 (=0x104) çıkıyor. Bu aslında güzel bir öğretici an; mesaj bunu açıkça söylemeli ('p artık kendi adresini gösteriyor; *p p'nin içindeki sayıyı verir'). Ayrıca render() içinde üretilen 'p → x (değer: 42)' ok metni, her düğme işleyicisinin hemen ardından ptrInfo'yu ezmesi yüzünden hiç görünmüyor.
- ❑ Bellek sızıntısı demosu: sızıntı 'uzun süre çalışan programlarda birikir' deniyor ama bunu gösteren bir döngü/otomatik tekrar yok; 'Döngüyü 10 kez çalıştır' gibi bir düğme (her turda malloc + işaretçi kaybı) birikimi somutlaştırırdı. Blok boyu sabit 16 B; gerçek ayırıcı ek yükünü (glibc'de 32 B parça) göstermek için 'gerçek tüketim' sütunu eklenebilir.
- ❑ memInfo metni '64-bit sistemlerde teorik limit 16 EB' diyor; 2^64 bayt = 16 EiB ≈ 18.4 EB. 'EiB' ya da '16 milyar GB' yazılmalı (satır ~387). Benzer şekilde 48-bit için 256 TiB.

## isletim-sistemleri-ve-linux.html

- ❑ Terminal: the panel description invites `cat /proc/cpuinfo`, but /proc/cpuinfo is not in the simulated `filesystem` map, so the command answers 'Böyle bir dosya yok' and `ls /proc` prints '(boş)'. Either add /proc/cpuinfo and /proc/meminfo entries (ideal teaching moment for 'virtual filesystem') or drop the suggestion from the description (isletim-sistemleri-ve-linux.html, terminal IIFE, `filesystem` object).
- ❑ Terminal: `~` is not expanded, so `cat ~/.bashrc` fails although the file exists; `&&` and `;` are not parsed, so `cd /etc && cat hostname` silently runs only `cd /etc`. `df` and `free` without `-h` print nothing at all (no error, no output). Hidden dotfiles are listed by plain `ls` (real ls hides them; `ls -a` is not supported). Small fixes in `execute()` would make the simulator behave like a real shell for the commands it advertises.
- ❑ Process lifecycle canvas: `addProcess` pushes `{ id: nextPid++, label: 'P' + nextPid }`, so the label uses the already-incremented counter: the first new process gets id 4 but is drawn as 'P5'. Should be `label: 'P' + id` computed before incrementing.
- ❑ Process lifecycle canvas: `schedule()` is not round-robin. After the running process is demoted it stays first in the `processes` array, so `ready[0]` re-selects it most of the time (init keeps hogging the CPU, bash rarely runs). Also the newly selected process is immediately given a 20% chance to terminate in the same click, so 'Çalışıyor' can read 0 right after scheduling and 'Sonlandı' is visible for only one click before the cleanup filter removes it. Rotating the array (move the demoted process to the end) and applying termination before selection would make the animation match the state diagram the panel describes.
- ❑ Round-robin scheduler: once every process is done, each further click on '1 Quantum İlerle' appends another gray 'idle' slot to the timeline without bound; the 'done' card state is styled with the 'waiting' class, and the '⏸️ Bekliyor' label can never appear (no I/O state exists). A small 'tamamlandı: 18 quantum, ortalama bekleme 10.5 q' readout would turn the timeline into a measurable result and would let the digest's worked example be read directly off the page.
- ❑ FHS tree: the panel text says 'Her dizine tıklayarak ne işe yaradığını görün', but descriptions are already rendered inline and a click only flashes the row purple for 0.8 s; the lookup code (`node`, `key`) computes a node and then discards it. Either show a richer detail box on click (like the OS layers panel) or remove the click hint.
- ❑ OS architecture layer text says each syscall is a 'context switch'; strictly it is a privilege-level transition (mode switch), while a context switch is between processes. The digest avoids the term; the page text could be corrected. The scheduler panel also presents CFS as Linux's current scheduler; since kernel 6.6 (2023) the default is EEVDF.

## isletme-bilimi-ve-yonetim.html

- ❑ Variable cost is not adjustable: varCost is hardcoded to 25 and there is no 'Değişken Maliyet' button, although the intro text says 'parametreleri değiştirerek ... gözlemleyin'. Adding ± buttons for V (and clamping price > V) would unlock the most instructive experiment (unit-cost vs scale). Location: isletme-bilimi-ve-yonetim.html, breakeven IIFE (let varCost=25) and the button row.
- ❑ When BEP > maxQ (800), e.g. price 35₺ or fixed cost 22.000₺, the white BEP dot and the colored zones vanish, but the 'ZARAR' and 'KÂR' labels are still drawn at x-positions computed from the off-chart toX(bepQ); the KÂR label lands outside the plot (beyond W-pad.r) and ZARAR is centered off-plot. No message tells the reader the breakeven is off-scale. Fix: clamp label positions or hide them and print 'BEP grafik dışında' in #beInfo. Location: draw(), the 'Profit & Loss zones' block.
- ❑ Boundary inconsistency at bepQ === maxQ (fixed cost 20.000₺ with defaults): the dot is drawn (condition bepQ<=maxQ) but zones are not (condition bepQ<maxQ). Use the same comparison in both places.
- ❑ BEP uses Math.round(fixCost/(price-varCost)); for 10.000/30 it prints 333 adet, but at 333 units profit is still −10₺. Breakeven in units should be Math.ceil (334) or shown with a decimal. Location: draw(), const bepQ.
- ❑ Number formatting is inconsistent: the initial static #beInfo text uses a thousands separator ('2.500₺') while draw() overwrites it with plain integers ('2500₺', '10500₺'); y-axis labels also print '40000₺'. Use toLocaleString('tr-TR') everywhere.
- ❑ The y-axis rescales silently (maxCost = max(TC@800, revenue@800, 20000)) when price or fixed cost changes, so the fixed-cost line appears to move even when only the price changed; a fixed or stepped y-scale (or a note) would make the 'parallel shift vs slope change' lesson visible.
- ❑ resize() uses rect.width-36 assuming 18px panel padding, but the mobile media query reduces padding to 14px, so the canvas is 8px narrower than the panel on phones. Read the computed padding or use the canvas's own clientWidth.
- ❑ Content errors in the info cards (same file, topics arrays): public-finance card says 'Dikey/dikey eşitlik' (should be 'Yatay/dikey eşitlik'); 'Vergi esnekliği (Laffer eğrisi)' is a misnomer (Laffer curve is about tax rate vs revenue, not elasticity); 'Program bazlı bütçeleme ... Türkiye'de 2020'den beri' is doubtful (program budgeting applied from the 2021 budget); tax-rate figures (gelir vergisi %15-40, kurumlar %25, KDV %1-20) are date-sensitive and will go stale without a year stamp. ESG card's 'CSRD raporlaması (AB 2024)' is ambiguous (directive in force 2023, first reports for FY2024 published 2025).

## makine-dili-assembly-c.html

- ❑ Panel 2 ('Aynı Fonksiyon, Üç Seviye'), hex sütunu: '0F 4D C2' = cmovge eax, edx. After 'cmp eax, edx' this computes the MINIMUM, contradicting the AT&T column's 'cmovll %edx, %eax' (which correctly computes max) and the C code. Should be '0F 4C C2' (cmovl eax, edx).
- ❑ Panel 2, hex and AT&T columns: '48 89 F8 ; mov rax, rdi' / 'movq %rdi, %rax # max = arr[0]' moves the POINTER into rax, not arr[0]. Should be 'mov eax, [rdi]' (8B 07) / 'movl (%rdi), %eax'. As written, max_value(arr,len) returns the array address (and for len<=0 returns the pointer, not 0 as the C column says).
- ❑ Panel 2: loop start index is inconsistent across columns: hex column 'xor ecx, ecx' (i = 0), AT&T column 'movl $1, %ecx' (i = 1), C column 'i = 1'.
- ❑ Panel 2, hex column jump offsets are wrong: '7E 12' (jle +18) should be '7E 10' (+16 bytes: xor ecx,ecx = 2 + loop = 14, landing on C3 ret); '7C F3' (jl -13) lands one byte INSIDE the loop (loop body is 14 bytes), should be '7C F2' (-14). Decoding the current bytes would mis-execute.
- ❑ Panel 3 (C → ASM gezgini), simpleCompile(): branch selection is substring matching in fixed order ('x * x'/'x*x' → square, 'sum'/'toplam' → sum, 'factorial'/'fakt' → factorial, 'strlen'/'uzunluk' → strlen, 'swap'/'degistir'/'temp'/'gecici' → swap). Any code containing 'assume', 'consume', 'template', 'attempt' etc. gets a wrong canned output; a comment line alone ('// sum') selects a branch; renaming x→a in square() falls through to the generic stub. The digest turns this into a teaching experiment, but the UI should state plainly that this is a lookup table, not a compiler, and ideally the textarea label should say so.
- ❑ Panel 3, sum output: 'test rsi, rsi' / 'cmp rcx, rsi' test the full 64-bit rsi although the C parameter 'int len' is 32-bit; the System V ABI does not guarantee the upper 32 bits of rsi are zero/sign-extended. Real GCC uses 'test esi, esi' / movsxd. Pedantic but worth fixing since the page claims 'GCC -O2 benzeri'.
- ❑ Panel 3, generic fallback: the 'for/while' template emits 'cmp rax, rsi / jge .Ldone' using rax both as counter and (implicitly) return value, and emits 'ret' only if the code contains 'return'; a void function with a loop produces a label block with no ret. Cosmetic, but misleading.
- ❑ Panel 1 evolution step 'Makine Dili — 1940'lar': the detail text says early computers were programmed 'fiziksel anahtarlarla veya delikli kartlarla' but does not mention the stored-program idea (Manchester Baby, 21 June 1948), which is the actual bridge from switches to machine code in memory; a one-line addition would make the timeline accurate.

## makine-ogrenmesi-derin-ogrenme-llm.html

- ❑ CRITICAL: the 'Eğit (Backprop)' button produces NaN on the very first click. In backward() (makine-ogrenmesi-derin-ogrenme-llm.html, NN IIFE), after each layer the code calls deltas.shift() which discards the freshly computed hidden-layer deltas instead of the output deltas. On l=0 the weight update reads deltas[1][j] from the 1-element output delta array, so weights[0][i][1] and weights[0][i][2] become NaN (0.1 * undefined), and the next forward() turns every activation and the readout into 'Tahmin: NaN · Hata: NaN'. Reproduced with a node replica of the exact code. Fix: keep a per-layer delta array (e.g. compute nextDeltas, update weights[l] with the CURRENT layer's deltas, then set deltas = nextDeltas), i.e. remove the unshift/shift juggling.
- ❑ The canvas draws edge/node colors with rgba alpha values derived from weights/activations; once weights are NaN the strokeStyle strings become invalid and the previous style silently persists, so the NaN state is not even visually signalled. Consider guarding with Number.isFinite and showing an explicit error state.
- ❑ The network has no bias terms and the input is fixed at [1.0, 0.5] with target 0.8. With weights in (−1,1) the initial prediction is provably confined to about 0.08–0.92 (in practice mostly 0.3–0.7); with lr = 0.1 and only 5 backprop steps per click, a correct implementation would reduce the error by only ~2–3% per click and need roughly 150–200 clicks to get below 0.01. A learning-rate slider (e.g. 0.1–3) and/or 50 steps per click, plus a small loss-vs-step sparkline, would make training visible and teach the lr trade-off.
- ❑ Edge thickness is capped at max(0.5, |w|*1.5) px, so all connections look nearly identical; scaling to e.g. 0.5–4 px would make weight magnitude readable. Hidden-node activations are not printed anywhere (only input values and the output), although they are computed; printing them with 2 decimals would support hand-verification.
- ❑ ctx.fillStyle = 'var(--text-muted)' is not valid for canvas (CSS variables are not resolved), so the 'Girdi / Gizli / Çıktı' layer labels are drawn with whatever fill style was last set (white from the node labels) rather than the muted color.
- ❑ The 'Mimari Ailesi' panel intro states the deep-learning revolution 'started with AlexNet winning ImageNet in 2012' and the architecture card lists CNN as '1989/2012'; fine, but the LSTM card says 'çözer' (solves) vanishing gradients, which is overstated — 'hafifletir' would be accurate.
- ❑ The 'Dropout' concept card says at inference 'ağırlıklar dropout oranıyla ölçeklenir' — true for classic dropout; modern 'inverted dropout' (PyTorch/TF default) scales during training instead. Minor accuracy nit.

## metalurji-ve-malzeme-muhendisligi.html

- ❑ FCC drawing is wrong (metalurji-ve-malzeme-muhendisligi.html, crystal canvas, 'Yüzey merkezleri' loops): the three nested loops place atoms at (±s/2, ±s/2, 0), (±s/2, 0, ±s/2), (0, ±s/2, ±s/2), i.e. the 12 EDGE midpoints, not the 6 face centres. The tab therefore shows 8 + 12 = 20 spheres instead of 14, and a face-on view has an empty centre. Fix: push 6 atoms at (0,0,±s/2), (0,±s/2,0), (±s/2,0,0).
- ❑ HCP drawing is a cube with 8 corner atoms plus 3 atoms at (±0.17s, ±0.17s, 0); it is not a hexagonal prism and the 3 'middle layer' positions are not the real interstitial positions. The info line claims 6 atoms/cell while the picture shows 11 spheres. Should be redrawn as a hexagonal prism (12 corners, 2 basal centres, 3 mid-plane atoms).
- ❑ Phase-diagram canvas (id 'stressCanvas', misnamed) assigns CSS variables to canvas styles: ctx.fillStyle = 'var(--accent)', 'var(--text-muted)', 'var(--accent-warm)' and ctx.strokeStyle = 'var(--accent-warm)'. Canvas cannot resolve var(); the assignments are silently ignored, so fillStyle stays at the last phase colour rgba(248,113,113,0.04). Result: point labels (A₃, A₁, Acm, Ötektik), axis labels and the 'Ötektoid Nokta' text are drawn at ~4 % alpha (effectively invisible) and the eutectoid ring takes the axis colour. Fix: use literal colours or read getComputedStyle(document.documentElement).getPropertyValue('--accent').
- ❑ Phase diagram geometry is not to scale and internally inconsistent: the eutectoid point (0.8 % C) and the eutectic point (4.3 % C) are both drawn at x = 0.8 of the width; 'Acm (1147°C)' and 'A₃ (911°C)' are at the same height (y = 0.25); the ferrite region occupies 20 % of the axis although ferrite dissolves at most 0.022 % C; the α+Fe₃C region ends at x = 0.8 although it should extend to 6.7 % C. No numeric ticks on either axis. Either add a real scale (0–6.7 % C, 400–1600 °C) or label it clearly as 'şematik'.
- ❑ Crystal canvas depth sorting sorts atoms by projected screen y (pa.y − pb.y) instead of by depth (z1 after rotation), so painting order is not a depth order; combined with the orthographic projection and single colour there is no depth cue at all. Sorting by z1 and scaling radius/alpha with depth would make rotation legible.
- ❑ Touch rotation: there is no touchstart handler to seed lastX/lastY, so the first touch move uses stale mouse coordinates (jump), and touchmove does not call preventDefault, so the page scrolls while the user tries to rotate on a phone. Also mousedown never calls preventDefault, so a drag can select text.
- ❑ Material class cards (.mat-card) have cursor:pointer and a hover lift but no click handler and no detail box, which suggests interactivity that does not exist. Steel cards are likewise static. Either remove the pointer cursor or add detail panels.
- ❑ Minor content nits on the page: 'Çelik, %2.06'ya kadar karbon' (modern value 2.14 %); 'A₃ 911°C' (912 °C in current references); Carbon-fibre card's '10x dayanıklı' and aerogel 'dünyanın en hafif katısı' are marketing claims (aerographene and others are lighter); metallic-glass '~10⁶ K/s' applies to the first ribbon glasses, bulk metallic glasses form at 1–100 K/s.

## mikro-ekonomi-ve-uretim-faktorleri.html

- ❑ Supply-demand canvas (mikro-ekonomi-ve-uretim-faktorleri.html, draw() in the '2. SUPPLY-DEMAND CANVAS' IIFE): the curve slopes are swapped. The line labelled D is drawn from dy=[0.9,0.1] (bottom-left to top-right, i.e. upward-sloping) and the line labelled S from sy=[0.1,0.9] (downward-sloping). Canvas y grows downward, so the demand curve is drawn as a supply curve and vice versa. Fix: use dy=[0.1,0.9] for demand and sy=[0.9,0.1] for supply (or swap the labels/colors). The digest warns the reader to trust the numbers, not the picture.
- ❑ Supply-demand canvas: the equilibrium point E is not the intersection of the drawn lines. eqP/eqQ are computed from a separate linear rule (0.5 ± 0.05·shift) while the lines shift by 0.08·shift in x only; after any shift the orange dot floats off the crossing (e.g. demandShift=1 gives dot at Q=55,P=55 but the drawn lines cross near Q=53.8,P=46.6). Either compute the intersection geometrically or move the lines so they cross at the computed point.
- ❑ Supply-demand canvas: the 'rant' shaded triangles use dx[0],dy[0] / sx[0],sy[0] as corners (the lower-left ends of the lines), so they do not represent consumer/producer surplus (should be the triangles between each curve, the price line P* and the vertical axis). They are decorative at best and misleading at worst.
- ❑ Supply-demand buttons: 'Talebi Artır' / 'Arzı Artır' cycle 0→1→2→−2→−1→0, so the third press silently decreases the curve while the button still says 'Artır'. Consider separate +/− buttons or clamping at 2 and showing the current shift count.
- ❑ Utility canvas: the three drawn indifference curves are fixed at U=24, 64, 144, but the optimum's utility is X·Y = (I/2Px)·(I/2Py): 12.5 at the default state, so the 'Optimum' dot lies on none of the drawn curves (it only coincides at I=140 where U=24.5). The curve through the optimum should be drawn dynamically (u = optX*optY), and the label 'U₃' is attached to the middle curve (64), not the third one.
- ❑ Utility canvas: budget line is drawn from (0, maxY) to (min(16, maxX), 0). Whenever maxX > 16 (Px=4 at any income; Px=7 for I>=140; Px=10 for I>=180) the line is clipped by moving its endpoint instead of cutting it, which changes its slope, so the optimum dot no longer sits on the drawn budget line. Clip the line properly (compute y at x=16) or enlarge the axis range. Also for I=140,Px=4 (optX=17.5) and larger cases the optimum dot is drawn outside the plot area.
- ❑ Utility readout: optY = income/(2*20) is always x.5 (2.5, 3.5, 4.5, 5.5) and toFixed(0) rounds it to 3, 4, 5, 6, so the text says e.g. '(5X, 3Y)' for a basket that actually costs 5·10+3·20 = 110 > 100. Show one decimal. Likewise MRS 0.35 is shown as '0.3'. The static initial HTML text 'Optimum: (4X, 3Y)' is wrong for U=X·Y (should be 5X, 2.5Y) but is overwritten on load.
- ❑ Game-theory table: cells have a pointer cursor and hover style but no click handler; either add an interaction (e.g. click a cell to see each player's best response) or remove cursor:pointer.
- ❑ Bias card 'Hediye Etkisi' cites 'alıcılar $2 verir, satıcılar $5 ister' for the Kahneman mug experiment; the commonly reported medians from Kahneman, Knetsch & Thaler (1990) are roughly $7 (WTA) vs $3 (WTP). Worth correcting or softening to 'yaklaşık iki kat'.
- ❑ Factor card 'Sermaye' says 'Getiri: Faiz'; in standard treatments the return to capital is interest (for loanable funds) and the entrepreneur's return is profit — fine — but page text 'Klasik iktisatta üretim dört temel faktörün' is slightly anachronistic: classical economists listed three (land, labour, capital); entrepreneurship/organization was added later (Marshall 1890). Minor.

## otomotiv-muhendisligi.html

- ❑ Biyel (connecting rod) esniyor: otomotiv-muhendisligi.html draw() içinde piston konumu krank açısına göre doğrusal (üçgen dalga, strokeH = 117 px) hesaplanırken krank pimi 42 px yarıçaplı çember üzerinde çiziliyor. Piston stroku (117 px) krank çapından (84 px) büyük olduğu için biyel uzunluğu 0°'de 172 px, 180°'de 139 px (~%24 fark). Düzeltme: pistonY'yi gerçek krank-biyel kinematiğiyle (x = r·cosθ + √(l² − r²sin²θ)) hesaplayıp strokeH = 2·crankR yapmak; bu aynı zamanda pistonun ÜÖN yakınında daha hızlı hareket etmesini doğru gösterir.
- ❑ Halkadaki aktif faz göstergesi her yayın yalnızca ilk yarısını tarayıp sonra 45° sıçrıyor: activeArc = -90 + 90*(strokePhase/360) biçimindeki dört formülde payda 360 yerine 180 olmalı (her 180° krank = 90° görsel yay).
- ❑ Çizimin sıkıştırma oranı ~5.7 (ÜÖN'de oda 25 px, AÖN'de 142 px); açıklama metni benzinli için 9–12 diyor. cylCY+25 ofsetini küçültmek (örn. +12) oranı ~10'a yaklaştırır.
- ❑ Kıvılcım yalnızca 340°<faz<360° aralığında çiziliyor; ⏭ İlerlet 30° adımladığı için durulan açının 30'a bölümünden kalan ≤10 ise kıvılcım hiç görülmez. Adım 10° yapılabilir ya da kıvılcım penceresi adım noktalarını kapsayacak şekilde ayarlanabilir (ör. 330°–360°).
- ❑ Animasyon hızı 'kare başına derece' tanımlı (speed=0.6, requestAnimationFrame): 120 Hz ekranda çevrim 10 s, 60 Hz'de 20 s. Zaman damgası (timestamp farkı) ile derece/saniye tanımlanmalı.
- ❑ draw() içinde ctx.fillStyle="var(--text-muted)" geçersiz (canvas CSS değişkeni çözmez); 'Krank: …°' yazısı önceki fillStyle (faz rengi) ile çiziliyor. Sabit bir renk verilmeli.
- ❑ Tanımlı ama kullanılmayan pistonDir değişkeni (strokePhase<360 ? 'yukarı çıkıyor' : 'aşağı iniyor') yanlış mantık içeriyor; silinmeli ya da düzeltilmeli.
- ❑ Supaplar tam ölü noktalarda açılıp kapanıyor; gerçek motordaki supap bindirmesi ve ateşleme avansı değişken yok. Sayfanın açıklama metni η_Otto ve sıkıştırma oranından söz ettiği hâlde r için bir kaydırıcı ya da hesaplanan verim/ basınç/ sıcaklık okuması yok; bir 'sıkıştırma oranı' kaydırıcısı ve canlı η = 1 − 1/r^(γ−1) okuması sayfayı gerçek bir laboratuvara dönüştürür.
- ❑ '▶ Oynat/Durdur' düğmesinin ilk etiketi ikinci basıştan sonra '▶ Oynat' / '⏸ Durdur' olarak değişiyor; başlangıç etiketi de durumla tutarlı olmalı ('⏸ Durdur', çünkü açılışta oynuyor).

## periyodik-tablo.html

- ✔ Düzeltildi (Kasım 2026): 18 sütunlu ızgara 118 elementin hepsini doğru hücreye yerleştiriyor (Fe 8. grupta); lantanit ve aktinitler gerçek periyotlarıyla ve "f-blok" olarak gösteriliyor; Metaller (91) ve Ametaller (20) süzgeçleri tam; kütleler CIAAW 2024 standart atom ağırlıkları, kararlı izotopu olmayanlar köşeli parantezli kütle numarasıyla; NIST ASD elektron dizilimleri (20 Madelung istisnası işaretli), 100 element için birinci iyonlaşma enerjisi, CRC ile WebElements'in uyuştuğu 69 element için Pauling elektronegatifliği; "Kutularda göster" ısı haritası; Z ≥ 104 "öngörülen" olarak işaretli; renk açıklaması ve klavye erişimi; cıva notu standart koşullara göre hassaslaştırıldı.
- ❑ Mobilde tablo kendi çerçevesinde yatay kaydırma istiyor (en az 660 px; bilinçli seçim).
- ❑ Bazı sınıflandırmalar uzlaşma meselesi (Po yarı metal, At halojen, Zn/Cd/Hg geçiş metali); sayfada not var.
- ❑ Elektronegatiflik değerleri CRC'nin kendisinden değil, Wikipedia'daki CRC alıntısından doğrulandı.

## pong.html

- ❑ pong.html (HUD): the static markup shows 'Hız: 3.00x' but the game starts at ballSpeed = 4 and updateSpeedUi() immediately overwrites it to '4.00x'; the initial text should be 4.00 to avoid a flash of a wrong value.
- ❑ pong.html (HUD): the Hız readout's 'x' suffix suggests a multiplier, but the number is ballSpeed in pixels per 1/60 s step (4.00 = 240 px/s). Either drop the 'x' or show a true multiplier relative to baseBallSpeed (1.00x … 2.50x).
- ❑ pong.html (update): paddle collision tests ballY strictly between paddleY and paddleY + 80, ignoring the ball's 8 px radius in Y; a ball whose edge visibly overlaps the paddle tip passes through. Using ballY + 8 > paddleY && ballY - 8 < paddleY + paddleHeight would match what the player sees.
- ❑ pong.html (update): keyboard movement is guarded by playerY > 0 / playerY < 320 but not clamped after the 8 px step; after a touch sets a non-multiple-of-8 value, the paddle can end up at -7 or 327 (partly off-field). Clamp playerY like computerY.
- ❑ pong.html (AI): the computer paddle chases ball Y at 0.7 × paddleSpeed with a 20 px dead zone and never loses to a ball whose vertical speed is below 5.6 px/step (verified by simulation: 0 % misses for centre or half-paddle hits at every speed up to 10). Only near-tip hits at speed ≥ ~7 beat it. There is no difficulty setting; the game is unwinnable without using Space or waiting for the automatic speed-ups, which is unfriendly to new players.
- ❑ pong.html (AI): the computer paddle tracks the ball even when the ball is moving away from it, which looks robotic; tracking only when ballDX > 0 (and returning to centre otherwise) would feel more natural and open up strategy.
- ❑ pong.html (resetBall): after a point the ball is relaunched instantly from centre in a random direction with no pause or countdown, so the player can be scored on before reacting; a short delay (e.g. 1 s) is standard.
- ❑ pong.html (controls): Space only increases speed; there is no way to slow down, pause, or restart mid-game, and desktop mouse movement is not supported (keyboard only). Consider mouse/pointer tracking on the canvas and a pause key.
- ❑ pong.html (speed-up): increaseBallSpeed(1.1) fires on every 5th total point, but the Space key can already have pushed ballSpeed to the 10 cap, after which score-based speed-ups silently do nothing; fine functionally, but the two mechanisms interact without feedback.

## programlama-paradigmalari.html

- ❑ Dil & Paradigma Matrisi (programlama-paradigmalari.html, section 5 `langs` array): the 'Concurrent' column is entirely empty (every row's 8th entry is ""), even though Go, Rust, Elixir and Java are explicitly listed as concurrency languages in the 'Concurrent / Parallel' advanced card. The data looks column-shifted: SQL has its only ✅ under 'Logic' instead of 'Declarative'; C# is marked ✅ under 'Logic' (it is not a logic language; LINQ would be 'Declarative'); Go is marked ✅ under 'Reactive' (likely meant Concurrent); Haskell is not marked Declarative. Fix: re-author rows against the header order [Imperative, OOP, FP, Logic, Declarative, Reactive, Concurrent] and fill the Concurrent column (Go, Rust, Elixir, Java, C#, Kotlin, Swift, Scala…). The digest's third lab experiment currently turns this into a 'spot the data error' task; once fixed, update observe/explain there.
- ❑ PAGE_INFO["programlama-paradigmalari"] in shared/page-info.js says '7 ana paradigmanın kartları'; the page renders 8 paradigm cards (Imperative, OOP, Functional, Declarative, Procedural, Event-Driven, Reactive, Logic). Update the count.
- ❑ 'Aynı Problem' C tab: `int result[6]` is declared but only 3 slots are written; the trailing comment `// result = [4, 16, 36]` hides that slots 3–5 hold uninitialized garbage and that `j` (=3) is the real length. Either print `result[0..j)` in the comment or declare `int result[6] = {0};` and note `j` as the count.
- ❑ FP card 'Recursion' claims 'Tail-call optimization (TCO) ile stack overflow önlenir', but the shown `sum` example is NOT tail-recursive (the addition happens after the recursive call returns), and mainstream JS engines other than JavaScriptCore do not implement TCO. Either show an accumulator-style tail-recursive version or soften the claim.
- ❑ FP card 'Monad / Functor' code uses `Maybe.of(...)` in JS syntax; there is no such built-in, so a reader who tries it in the console gets a ReferenceError. Label it as pseudocode or use a real library/`Optional` (Java) example.
- ❑ Advanced card 'Dependent Types' says Rust's borrow checker and TS template literal types are 'steps toward dependent types'. The borrow checker is an ownership/affine-type system, not dependent typing; this is misleading. Suggest rewording to 'richer type systems' or dropping the Rust claim.
- ❑ Paradigm card 'Reactive (Tepkisel)' lists libraries/frameworks (RxJS/RxJava, React, Vue, SwiftUI, Kotlin Flow) under 'langs' while every other card lists languages; the label mismatch confuses the 'count languages per card' exercise.
- ❑ Accessibility/UX: paradigm, FP and advanced cards are plain <div>s with click handlers (no role=button, tabindex, or keyboard handler), so none of the page's interactive content is reachable by keyboard. The detail panels also keep no 'selected' state across the three card groups beyond inline borderColor, so there is no visible focus ring.
- ❑ Minor: SQL tab uses `number % 2 = 0`; `%` is dialect-specific (MySQL/SQLite/PostgreSQL) while standard SQL uses MOD(number, 2). Fine for the page's purpose but worth a footnote.

## roma-hukuku.html

- ❑ roma-hukuku.html (Hukukun Dalları, branch click handler): on click, every other card gets `c.style.borderColor = "var(--border)"`, which is the shorthand for all four sides and so wipes out the coloured `borderLeft` stripe set at creation. After the first click, all unselected branch cards permanently lose their colour accent. Fix: reset only `borderTopColor/RightColor/BottomColor`, or toggle a `.selected` class like the timeline does.
- ❑ roma-hukuku.html (Kaynaklar panel, .source-card CSS): cards have `cursor:pointer` and a hover lift but no click handler and nothing to open; the affordance is dead and misleads the reader into clicking. Either remove `cursor:pointer` or make the cards expand/collapse like the branch cards.
- ❑ roma-hukuku.html (timeline): the five era boxes are equal-width flex items although the eras span ~600, 400, 277, 38 and open-ended years. A categorical strip presented as a 'zaman çizelgesi' invites a wrong reading (the digest's first lab task exploits this). Consider flex-grow proportional to duration (with a floor for the 38-year Justinian era) or a visible note that the strip is not to scale.
- ❑ roma-hukuku.html (Corpus Iuris, Digesta card): the book-range labels are inaccurate. Books 12–19 are mainly contracts/obligations (not 'eşya'), 20–27 cover pledge, dowry and guardianship (not purely 'borçlar'), 37–44 are praetorian succession/possession (not 'aile'), and the criminal books are 47–48 ('libri terribiles'), with 49 appeals/military and 50 municipal matters. Books 45–46 are missing from the listing entirely.
- ❑ roma-hukuku.html (Corpus Iuris, Codex card vs timeline era 3): the Codex detail says 'Gregorius ... kodeksleri' while the timeline says 'Gregorianus ve Hermogenianus Kodeksleri'; the correct name is Codex Gregorianus. Inconsistent on the same page.
- ❑ roma-hukuku.html (timeline, branch and corpus cards): all interactive elements are plain <div>s with click listeners, no role="button", no tabindex, no keyboard handler, and no initial selection; keyboard and screen-reader users cannot operate the page. Also, the branch panel uses inline borderColor for selection while the timeline uses a `.selected` class: two different selection mechanisms for the same interaction.
- ❑ roma-hukuku.html (h2 headings and default detail texts '👆 Bir döneme tıklayarak...', '🖱️ Bir hukuk dalına tıklayın.'): emoji in headings and prompts conflict with the owner's no-emoji content direction and with the digest's tone; worth cleaning when the page is brought to production level.
- ❑ roma-hukuku.html (timeline era 5 detail): says Irnerius began in the '11. yüzyılda'; he is generally placed around 1100–1125 (late 11th / early 12th century). Minor, but the era label 'MS 1100+' and the text disagree by a century boundary.
- ❑ roma-hukuku.html (Novellae card): '156-168 arası kanun' is given without explanation; the range exists because different medieval collections preserve different numbers (the Greek collection has 168, including some by Justinian's successors). A half-sentence of context would prevent the number looking like an error.
- ❑ roma-hukuku.html (kaynak kartları): İmparatorluk Emirnameleri için "MS 27" yazıyor; Augustus'un tek başına yönetimi MÖ 27'de başlar. Kasım 2026 editör geçişi ayrıca "Gaius'un dörtlü ayrımı" etiketinin Justinianus'a ait bir ayrımı Gaius'a mal ettiğini bildirdi; düzeltmeden önce doğrulanmalı. Defterin ikinci deneyi okura bu tarihi kontrol ettiriyor; sayfa düzeltilince o deneyin açıklaması güncellenmeli.

## siber-guvenlik.html

- ❑ Parola paneli (crackDuration, siber-guvenlik.html ~line 735): 1000–500000 yıl aralığındaki süreler '0 milyon yıl' olarak gösteriliyor, çünkü 'yüzyıl' dalı 1000 yılda bitiyor ve bir sonraki dal yıl/1e6'yı toFixed(0) ile yuvarlıyor. Örnek: 'Acelya2012!' (72.1 bit) → '0 milyon yıl'. 65–74 bitlik, yani 'Güçlü' etiketli parolaların çoğu bu aralığa düşüyor. Bin yıl/milyon yıl arasına 'bin yıl' dalı eklenmeli ya da toFixed(1) kullanılmalı.
- ❑ Parola paneli: kırma süresi 2^H / 1e9 ile tüm arama uzayı olarak hesaplanıyor; beklenen süre bunun yarısıdır. Ayrıca Türkçe harfler (ç, ğ, ş, ü…) /[^a-zA-Z0-9]/ ile 'sembol' sayılıyor (32 eklenir); açıklama metninde belirtilmiyor. Sözlük/örüntü kontrolü yok: 'P@ssw0rd' 52.4 bit 'Orta' görünüyor.
- ❑ Hash paneli (updateHash): karşılaştırma bayt düzeyinde yapılıp 'İdeal çığ etkisi: ~%50' yazılıyor; bayt düzeyinde beklenen fark ~%99.6'dır (varsayılan çift 32/32 = %100.0, bit düzeyinde 134/256 = %52.3). Ya bit sayımı eklenmeli ya da açıklama 'bitlerin ~%50'si, baytların ~%100'ü' diye düzeltilmeli.
- ❑ Kripto simülatörü: XOR sekmesinde 'Çöz' düğmesi düz metne yeniden XOR uygular (process(decrypt) decrypt bayrağını XOR'da kullanmaz) ve Sezar/Vigenère'de 'Çöz' şifreli çıktıyı değil, soldaki düz metni ters kaydırır; gerçek bir gidiş-dönüş için çıktıyı elle sol kutuya yapıştırmak gerekiyor. Çıktıyı girdiye kopyalayan bir '⇐' düğmesi iyi olur.
- ❑ Kripto simülatörü, Türkçe büyük/küçük harf: JS toUpperCase/toLowerCase yerel ayarsız çalışıyor. 'İ'.toLowerCase() = 'i̇' (i + birleşik nokta) olduğundan şifreli küçük harf İ'ye düştüğünde çıktıda iki kod birimi oluşuyor (örn. Sezar k=3 ile 'g' → 'i̇'); 'ı' ve 'i' ikisi de 'I'ya gidiyor, 'ı' çözümde 'i' olarak dönüyor; Vigenère anahtarındaki 'i' de 'I' (ı) sayılıyor. toLocaleUpperCase('tr') / toLocaleLowerCase('tr') ve ALPHA tablosu için özel i/ı eşlemesi gerekir.
- ❑ Sezar: anahtar parseInt ile okunuyor; '0' falsy olduğu için 3'e düşüyor (k=0 denenemiyor), sayı olmayan anahtar (varsayılan 'SECRET') sessizce 3 sayılıyor. Sezar sekmesine geçince anahtar kutusunun varsayılanı sayı olmalı ya da kaydırma için ayrı bir sayı girişi verilmeli.
- ❑ XOR çıktısı denetim karakterleri (U+0000, U+0001 vb.) içeriyor ve textarea'da görünmez; onaltılık (hex) gösterim seçeneği öğretici olurdu.
- ❑ Diffie-Hellman 'Yeni Sayılar': g, [2, p−2] aralığından rastgele seçiliyor ve 'üreteç' olarak etiketleniyor; p=23 için 20 adaydan yalnızca 10'u gerçek üreteç (p=31'de 28'de 8). g=p−1 seçilirse olası ortak anahtar yalnızca 1 ve p−1 olur. Üreteç kontrolü eklenmeli ya da etiket 'taban' yapılmalı. Ayrıca a veya b'nin 1 çıkması gizli üssü açık değere eşitliyor.
- ❑ Güvenlik duvarı: 'durum bilgili (stateful)' deniyor ama simülasyon durumsuz (bağlantı takibi yok). Alttaki özet satırı 25 (DENY) ve 53 (ALLOW) kurallarını yazmıyor; kural çipleriyle çelişiyor. Varsayılan politika ALLOW olduğu için 3389 (RDP), 5432 (PostgreSQL), 21 (FTP) gibi portlar izinli görünüyor; öğretici açıdan 'varsayılan RED' iyi uygulamasına ters. Kurallar kullanıcı tarafından eklenip silinemiyor (CSS'de .fw-rule button var ama kullanılmıyor).
- ❑ Saldırı sözlüğündeki sayılar (WannaCry 150 ülke/200.000+, SolarWinds 18.000+, Morris 1988) yaygın kaynaklarla uyumlu; ancak kartlarda kaynak bağlantısı yok.

## sicim-teorisi.html

- ❑ Canvas colors use CSS variables: in sicim-teorisi.html the string-mode canvas sets ctx.fillStyle/strokeStyle/shadowColor to "var(--accent)" and "var(--text-muted)". Canvas 2D does not parse CSS custom properties, so the assignment is ignored and the default black (#000) remains. Result: in the default dark theme, the two endpoint dots, the whole string in mode n=0 and the 'n = …' label are drawn black on a dark card and are nearly invisible (the digest's lab intro warns readers about this). Fix: read the resolved color with getComputedStyle(document.documentElement).getPropertyValue('--accent') or hard-code hex values like the other modes already do.
- ❑ All four vibration modes animate at the same temporal frequency (y uses Math.cos(t) with t += 0.04 per frame regardless of mode). A real fixed-end string's n-th harmonic oscillates n times faster; the digest turns this into an honest 'observe that it does not' experiment, but a mode-dependent phase (cos((mode+1)·t)) would make the canvas physically meaningful. Also the animation is frame-rate dependent (2π/0.04 ≈ 157 frames per cycle, i.e. ~2.6 s at 60 Hz, ~1.3 s at 120 Hz); using requestAnimationFrame timestamps would fix that.
- ❑ Mode labeling mixes two conventions: the tab 'Temel (n=0)' draws one half-wave (the classical 1st harmonic) and '3. Harmonik (n=3)' draws four half-waves. The code uses n = mode+1 for the shape but displays 'n = mode'. String-theory level N=0 (massless) is fine, but calling the tabs 'Harmonik' invites confusion with the standing-wave harmonic number from duran-dalgalar.html.
- ❑ The stringInfo texts per mode ('Ağır parçacıklar (~10¹⁹ GeV)' for n=1, 'Daha ağır rezonanslar' for n=2, 'Planck kütlesi mertebesinde' for n=3) suggest a growing hierarchy, but with M² = N/α′ the levels are only 1 : √2 : √3 times the string mass; all excited levels sit at the same order of magnitude. A single consistent statement (M_N = √N · M_s) would be more accurate.
- ❑ Panel 2 states 'Yaklaşık 10⁵⁰⁰ farklı Calabi-Yau şekli mümkündür'. The 10⁵⁰⁰ figure is the estimated number of flux vacua (Bousso–Polchinski / Douglas estimates), not the number of Calabi–Yau shapes; the known count of distinct Calabi–Yau threefold constructions (Kreuzer–Skarke, 473,800,776 reflexive polytopes) is far smaller. The String Landscape concept card repeats the same conflation.
- ❑ Panel 3 dualite ağı says 'T-duality açık/kapalı sicimleri birbirine bağlar'. T-duality relates Type IIA↔IIB and the two heterotic theories (and turns Neumann into Dirichlet boundary conditions for open strings); it does not connect open and closed strings. Suggest 'T-duality IIA↔IIB ve iki heterotik kuramı birbirine bağlar'.
- ❑ Panel 3 asserts 'M'in anlamı: membran'. Witten deliberately left the letter ambiguous ('magic, mystery or membrane, according to taste'); the page states it as fact.
- ❑ Page uses many emoji in h2 headings and card icons (🎻📐🌌🎵🪞🔬 …) while the content guide for digests forbids emoji; harmless functionally but inconsistent with the new editorial tone.

## tasarim-desenleri.html

- ❑ Relation map (section 3, relMap click handler): `n.style.borderWidth = "2px"/"1px"` overrides the inline `border-left:3px solid <color>` accent on every node, so after the first click all category accent bars shrink (related 2px, others 1px) and the visual category coding is partly lost. Use a CSS class (e.g. `.related`) or only set borderColor/boxShadow instead of borderWidth.
- ❑ Relation map shows only 15 of 23 patterns, but `relations` strings reference the 8 missing ones (prototype, bridge, flyweight, interpreter, iterator, mediator, memento, visitor). Clicking Composite thickens only Decorator although its data lists three relations; Strategy loses Flyweight and Bridge; Facade loses Mediator. Either add the missing nodes or list the off-map relations as text under the map.
- ❑ Relations are directed/asymmetric in the data (Proxy→Adapter but not Adapter→Proxy; Builder, Proxy and Observer have zero incoming links) while the UI presents them as 'frequently used together' (an undirected notion). Symmetrize the relation set at render time (union of outgoing + incoming).
- ❑ Clicking a pattern card in the grid calls highlightRelations(pid), which only sets `active-node` on the matching map node; it does not thicken related nodes and does not reset borderWidths left over from a previous map click, so the map can show stale 'related' thickening for a different pattern. Unify the two handlers.
- ❑ Clicking a category tab re-renders the grid, dropping the `.selected` class while the detail panel still shows the previously selected pattern; re-apply selection for the current detail pattern after renderGrid().
- ❑ Facade code sample calls `lights.dim()` but declares only `tv`, `dvd`, `sound` fields; add `private Lights lights;`.
- ❑ Factory Method UML text box is misaligned: the line `│ +olustur():Sekil│` is wider than the box border lines above/below it.
- ❑ Several framework/real-world mappings are loose or contested and could mislead a learner: 'Spring DI = Abstract Factory + Singleton', 'React Hooks = Observer + Strategy', 'Context API = Mediator', Mediator real-world 'Express.js app (router)', 'try-catch blocks' as Chain of Responsibility, 'Python @decorator' listed as GoF Decorator (related but a different mechanism), 'Redux reducers = State + Strategy'. Consider softening wording ('benzer', 'esinlenir') or trimming.
- ❑ Accessibility: pattern cards, relation nodes are plain divs with click handlers (no role=button, tabindex, keyboard activation, aria-pressed). Category tabs are buttons but lack aria-selected.
- ❑ No URL hash / deep link for the selected pattern (e.g. #observer); a digest or another page cannot link to a specific pattern's detail panel.

## turev.html

- ✔ Yeniden kuruldu (Kasım 2026): h artık kullanıcı denetiminde (logaritmik |h|, işaret seçimi, "h → 0" yarılama animasyonu); ileri, geri ve merkezi fark; yedi fonksiyon (|x| ve √x özel durumlarıyla); eşit ölçekli, kendiliğinden ölçeklenen eksenler ve büyüteç; kesme hatası ile kayan nokta yuvarlamasını ayıran log–log hata grafiği; "kesen" terimi doğru; MathJax CDN'i ve sayfaya özel stil kaldırıldı.
- ❑ Bir düğme odaktayken (ör. Sıfırla'ya basınca) Boşluk tuşu çalışmıyor (`keydown` işleyicisi, ~1372–1381. satırlar).
- ❑ Fonksiyon değişince a, h'nin işareti ve tarama durumu korunuyor; bu yüzden defter deneyleri başlangıç durumunu açıkça yazıyor.
- ❑ Kırmızı yuvarlama çizgisi bir üst sınır değil, kaba bir kestirim; eˣ ileri farkta h = 2.8·10⁻⁸ noktası çizginin üstünde kalıyor.

## ucak-muhendisligi-ve-aerodinamik.html

- ❑ Whole scene rotates with angle of attack: drawStreamlines, the freestream arrows, drawPressureDist and drawAirfoilShape are all drawn inside ctx.rotate(-alphaRad), and the L/D arrows are computed from alphaRad in the same rotated sense. Result: the chord-to-flow angle never changes visually; the picture is just tilted. Fix: keep freestream and streamlines in the world frame and rotate only the airfoil (and recompute streamline deflection around it). (ucak-muhendisligi-ve-aerodinamik.html, airfoil IIFE, draw()/drawStreamlines/drawPressureDist)
- ❑ C_L keeps rising after stall: clApprox = max(0.1, 0.25 + aoa*0.09 - (aoa>14 ? 0.3 : 0)) gives 1.51 at 14°, 1.39 at 16°, then 1.57/1.75/1.93 at 18/20/22°, exceeding the pre-stall peak in 'Derin STALL'. Real airfoils lose lift after C_L,max. Suggested: plateau/decay after 14°, e.g. C_L = 1.51 - 0.08*(aoa-14). (draw(), 'Update info' block)
- ❑ Stall thresholds are inconsistent: the info text says 'STALL başlangıcı' from aoa>=14, the visuals (separated streamlines, red wake, red lower-surface arrows) switch at Math.abs(aoa)>14 i.e. 16°, and the panel description says ~15–16°. Also `if(!stalled || Math.abs(aoa)<=14)` is redundant with `stalled`. (drawStreamlines, drawPressureDist, draw)
- ❑ Pressure-distribution arrows do not depend on angle of attack at all (fixed `dist` profile); only the lower-surface colour flips to red at stall. The suction peak should grow with alpha and move toward the leading edge; at negative alpha the suction should nearly vanish. (drawPressureDist)
- ❑ Lift arrow length scales with |aoa| (arrowLen = 30 + |aoa|*5), so at −2° the L arrow is longer than at 0° while C_L is smaller (0.10 vs 0.25). Arrow length should scale with the computed C_L (and the D arrow with a C_D model), otherwise the picture contradicts the readout. (draw(), 'Lift and Drag arrows')
- ❑ At stall the separated streamlines are drawn symmetrically on both upper and lower surfaces (isUpper?1:-1); physically only the upper (suction) side separates. (drawStreamlines, separated-flow branch)
- ❑ Flow labels tie 'laminer'/'türbülansa geçiş' to angle of attack; laminar–turbulent transition depends mainly on Reynolds number, not alpha. Better wording: 'Tutunmuş', 'Sınır tabaka kalınlaşıyor', 'Ayrılma başlıyor', 'Tam ayrılma'. (flowDesc in draw())
- ❑ Minor: the static #airfoilInfo markup says C_L≈0.2 while draw() immediately writes 0.25 at load; the stall wake uses Math.random so its shape changes on every redraw/resize; AoA range is −2..22 in 2° steps so the zero-lift angle (~−2.8° on the page's own line) can never be reached, and the 0.1 floor hides the linear model.
- ❑ Content card nit: 'Pitot tıkanması Air France 447 kazasının ana nedeni' — the BEA report identifies pitot icing as the triggering event, with the crew's response (sustained stall) as the cause of the crash; wording could be softened to 'tetikleyici olay'.

## uluslararasi-iliskiler.html

- ❑ Canvas label bug (uluslararasi-iliskiler.html, drawNode): ctx.fillStyle is set to the string "var(--text-muted)" for inactive node labels and all sub-labels. Canvas 2D does not resolve CSS variables, so the assignment is silently ignored and the previous fillStyle persists. Result: inactive-level labels are drawn at rgba(148,163,184,0.08) (practically invisible) and active-level sub-labels come out white instead of muted. Fix: use a literal color, e.g. getComputedStyle(document.documentElement).getPropertyValue('--text-muted') or a hard-coded rgba.
- ❑ Dead/unused drawing code in the canvas IIFE: the `zones` array defines label/desc text ("SİSTEM DÜZEYİ", "Anarşi · Kutupsallık · Güç Dengesi" …) that is never rendered; the `dash` variable computed from `phase` inside the System↔State loop is never used, so the dashed connection lines are static despite the per-frame `phase += 0.008`; the `if(autoMode){}` block in animate() is empty. Either draw the zone labels / animate the dash offset (ctx.lineDashOffset) or remove the code. Also draw() runs on every animation frame although nothing moves — wasteful on mobile.
- ❑ Navigation inconsistency: ⬆/⬇ buttons clamp at Sistem (2) and Birey (0), but 'Otomatik Gezinti' uses (level+1)%3, so it cycles Sistem → Birey → Devlet → Sistem, i.e. it wraps from the top to the bottom instead of walking down the stack. A reader expects Sistem → Devlet → Birey. Consider stepping with (level+2)%3 (downward) or a ping-pong order.
- ❑ Minor UI oddity: the 'Kutupsallık' node sub-label switches to the English word "Polarity" whenever the system level is active and to "Tek/Çift/Çok kutuplu" otherwise; it should stay Turkish in both states.
- ❑ Content accuracy in the org cards: NATO card says "2022'de Finlandiya ve İsveç katılımı" — both applied in May 2022, but Finland joined in April 2023 and Sweden in March 2024. AB card says "Euro (20 ülke)" — Bulgaria adopted the euro on 1 January 2026, so 21 as of the page's revision date. DTÖ card says "164 üye" — Comoros and Timor-Leste joined in 2024, making 166. 'Sharp Power (Walker, 2018)' — the Walker & Ludwig NED report/Foreign Affairs piece is from 2017.
- ❑ Translation issue in the 'İttifaklar ve Güvenlik' card: "Bandwagoning (Pezvenklik)" is a mistranslation; the accepted Turkish rendering is "peşine takılma" (or "güçlüye yanaşma").

## uzay-kosucusu.html

- ❑ ⚡ Hız (boost) power-up is effectively a no-op: update() recomputes gameSpeed = 5 + distance/600 every tick, then the boost branch adds only +0.02 (uzay-kosucusu.html ~line 578 and ~608). Net effect is a permanent +0.02 px/tick (<0.5%), invisible to the player while the indicator says 'Hız' for 5 s. Fix: keep a separate boost multiplier (e.g. gameSpeed *= 1.5 while active) or add a persistent boost offset.
- ❑ Hint text says 'Çift zıplama' but the code grants 3 jumps per landing (player.jumpsLeft = 3 in resetGame, jump() and the landing branch): one from the ground plus two in the air. Either change the hint to 'üçlü zıplama' or set jumpsLeft = 2. Note that some crystal gates (topH + gap < ~212) require the triple jump to pass (needed rise > 229.5 px, which a double jump at apex cannot reach), so reducing to 2 would make some gates impossible.
- ❑ Laser gates are drawn as pulsing/'opening and closing' (alpha = |sin(phase)|*0.7 + 0.3) but collision is always active regardless of phase; the comment says 'açılıp kapanan'. Fix: skip collision when alpha is low (e.g. |sin(phase)| < 0.3) so the visual matches the gameplay.
- ❑ Comet hitbox is misaligned with its drawing: the comet is drawn as a circle centred at (o.x, o.y) with radius 10, but collision uses the rectangle [o.x, o.x+20] × [o.y, o.y+20], i.e. offset by (10,10) from the visual. Fix: use o.x - w/2, o.y - h/2 in the AABB test or draw at o.x + w/2, o.y + h/2.
- ❑ Comets (y bouncing between 40 and 366, hitbox bottom ≤ 386) can never hit a grounded ship (hitbox top at 412); laser #1 and #2 of the triple almost never hit a grounded ship (0.3% for #2), laser #3 only ~19% of the time. The 'stay on the ground' strategy trivialises 40% of obstacle spawns. Consider lowering comet range (e.g. up to GROUND_Y - 30) or adding a ground-level comet variant.
- ❑ const difficulty = Math.min(gameSpeed / 5, 2.5) in spawnObstacle() is computed but never used; dead code. Could scale obstacle size/gap with it.
- ❑ Combo window (comboTimer = 90 ticks = 1.5 s) is roughly equal to the mean coin spawn interval (~56 ticks timer × 1/0.6 probability ≈ 93 ticks ≈ 1.55 s), so chaining 5 coins for x2 without the magnet is mostly luck. Consider spawning coins in short rows/arcs or lengthening the combo window to ~3 s.
- ❑ Score is dominated by survival: score++ every tick (60 pts/s) while a coin gives 10 × multiplier; coins matter little. Displayed distance is floor(distance/10) with distance++ per tick, so 'm' is a pure timer (6 m/s regardless of speed) rather than distance travelled. Consider accumulating distance += gameSpeed so the metre counter reflects speed.
- ❑ The touchend 'swipe up to jump' handler (~line 1078) is an empty no-op block; either implement or remove. Also the comet comment says 'hızlı' but comets move at the same gameSpeed as everything else (only a vertical drift ±1.5 px/tick).

## veri-yapilari.html

- ❑ Deque panel (data-sq="deque") has no front-side operations: 'Pop / Dequeue' always pops from the rear and 'Push / Enqueue' always pushes to the rear, so the 'Çift Uçlu' tab behaves exactly like the stack tab. Needs separate push-front/pop-front buttons (veri-yapilari.html, section 2 script, btnStackPop/btnStackPush handlers).
- ❑ Array/linked-list panel never visualises the cost difference it describes: 'Başa Ekle' and 'Ortaya Ekle' only flash the inserted cell; there is no shifting animation, no index labels on cells, and the info line is a fixed string per tab. A per-operation readout such as 'kaydırılan eleman sayısı: n' or 'değiştirilen işaretçi: 2' would make the O(n) vs O(1) claim observable (section 1 script, render()/flashCell).
- ❑ Hash table never resizes: load factor can grow without bound (e.g. 12/7 = 1.71 after three inserts) while the 'Ara' message still prints 'O(1) ortalama' even when the hit is 7th in a chain. Consider a rehash at a threshold (e.g. α > 0.75 → 14 slots) or at least changing the message when chain position > 1 (section 3 script, btnHashFind/render).
- ❑ BST panel has no 'Boşalt' (empty) control: 'Sıfırla' reloads the 11-node sample tree, so a reader cannot build a degenerate chain from scratch (e.g. insert 10,20,…) without deleting 11 nodes one by one. An 'Ağacı boşalt' button or a 'sıralı ekle' demo would make the O(n) worst case reachable (section 4 script, btnBstReset).
- ❑ BST drawing uses a fixed vertical gap (≈58 px) and 30 px top offset on a canvas at most 340 px tall; after depth ≈6 nodes are drawn below the canvas and disappear (the depth-8 chain from the lab experiment is only partly visible). Scale vGap by depth or enlarge the canvas (section 4 script, drawNode/resize).
- ❑ BST insert silently ignores duplicate values via find() before insert, but remove() with the Hibbard successor can leave the highlight/info text stale: 'Sil' never shows a confirmation message, unlike 'Ekle'/'Ara' (section 4 script, btnBstDel).
- ❑ Heap 'Ekle (insert)' shows the new element at the end for 400 ms and then jumps to its final position in one frame; the sift-up swaps are not animated step by step, so the 'log n karşılaştırma' idea is not visible. Same for extract-min sift-down (section 5 script, heapifyUp/heapifyDown).
- ❑ Comparison table marks O(1)* entries green for linked list insert/delete without explaining the asterisk anywhere on the page; the table legend only names colours. A footnote ('* düğüm biliniyorsa') is missing (section 6 script, rows).

## veritabanlari.html

- ❑ SQL playground lowercases the entire query including string literals (execSQL: `sql.trim().toLowerCase()`), so `WHERE bolum = 'Bilgisayar'` or `WHERE yazar = 'Date'` returns 0 rows even though matching rows exist. Fix: lowercase only keywords/identifiers, or compare values case-insensitively. (veritabanlari.html, execSQL/filterData)
- ❑ JOIN merges rows with `{...r1, ...r2}` so same-named columns collide: in the default JOIN example the `id` column shows odunc.id, not ogrenciler.id; in `odunc JOIN kitaplar` the id shown is the book id. Real SQL would show both columns. Fix: prefix columns with table name (ogrenciler.id, odunc.id). (execSQL JOIN branch)
- ❑ JOIN ON clause ignores table prefixes (m[4], m[6] unused) and is direction-sensitive: `... JOIN odunc ON odunc.ogrenci_id = ogrenciler.id` returns 0 rows with an empty header because t1col is looked up on the wrong table. Fix: resolve each side of the ON clause to its named table. (execSQL JOIN branch)
- ❑ filterData silently returns `true` (all rows) for any unrecognised condition, e.g. `WHERE sayfa >= 1000`, `WHERE sinif = 2 AND bolum = ...`, or `WHERE sayfa > 1000 ORDER BY sayfa` (the WHERE regex swallows the ORDER BY). The user sees 5 rows with no error. Fix: return an 'Anlaşılamayan koşul' error instead of true. (filterData)
- ❑ `SELECT COUNT(*) FROM ogrenciler` (aggregate without GROUP BY) matches the projection branch and renders 5 rows of NULL. Fix: detect aggregate functions and handle them, or reject with a message. GROUP BY branch also ignores the select list entirely and always emits COUNT(*). (execSQL projection/GROUP BY branches)
- ❑ ORDER BY uses raw JS `>` on strings (code-point order), so 'İşletim Sistemleri' sorts after 'Yapay Zeka'. If this is to be fixed, use `localeCompare(b, 'tr')`; the digest currently uses this as a teaching moment about collation, so if it is fixed the digest's third lab experiment must be updated. (execSQL ORDER BY branch)
- ❑ Canvas text colours use CSS variables (`ctx.fillStyle = 'var(--text)'`, 'var(--text-muted)'), which the Canvas API ignores; the previous fillStyle persists. In the B+Tree, keys are therefore drawn with the node-box fill rgba(94,234,212,0.08) / rgba(167,139,250,0.08) and are nearly invisible unless highlighted; in the JOIN Venn canvas the 'A'/'B' labels are drawn at 15% alpha. Fix: read the computed colour via getComputedStyle(document.documentElement).getPropertyValue('--text') or hard-code colours. (drawNodeBox, join draw/drawDots)
- ❑ JOIN Venn highlighting is wrong: for 'inner' the code clips both ellipses with 'evenodd', which highlights the symmetric difference (everything EXCEPT the intersection); for left/right/full/cross it always clips the LEFT ellipse only, so RIGHT JOIN and FULL OUTER highlight only A. Fix: use nonzero clip of the intersection for inner, right ellipse for right, union for full/cross. (join draw())
- ❑ CROSS JOIN rows are built with `{...l, ...r}` so the `id` column shows B's id (e.g. 'Ali' appears with id 2, 3, 4). Minor but confusing. (renderJoinResult cross case)
- ❑ Normalisation panel description says 'Her aşamaya tıklayarak ... görün' but the steps are rendered statically with no click handler. Also content issues: 3NF card says 'şehir → ilçe' while the table shows sehir → bolge; the 2NF card claims a partial dependency on müşteri_id but the 1NF table shown has a single-column key (id), so 2NF does not apply as stated. (normalisation section)
- ❑ B+Tree 'Ekle' with a value already in the tree (including the default 25) silently does nothing; show a message. Also the layout rebuilds the whole tree on every insert (keys slide between leaves) rather than splitting the overflowing leaf, and with 21+ keys it draws two parentless internal nodes instead of adding a new root; btreeInfo text 'B+Tree'de arama O(log n)' is asserted but no path is visualised. Consider implementing a real leaf split and root growth, or at least a search-path highlight. (buildLevels/draw)
- ❑ NoSQL cards contain marketing claims that are hard to verify: Neo4j 'SQL'den binlerce kat hızlı', PostgreSQL 'dünyanın en gelişmiş', SQLite 'tarayıcı (Web SQL)' (Web SQL was removed from Chrome in 2023–24). Tone down or source. CAP sentence 'ancak ikisini garanti edebilir' repeats the misleading 'pick two' slogan; Brewer himself corrected it in 2012.

## yazilim-muhendisligi.html

- ❑ Git Flow canvas, branch-off/merge arrows pick the WRONG source commit: in draw() the merge-arrow loop uses `commits.find(c2 => c2.branch === c.mergeFrom && c2.x < c.x)`, which returns the FIRST (oldest) matching commit. The feature branch-off arrow therefore starts at 'init' (x=0) instead of the last develop commit, and the merge arrow starts at the first feature commit 'login' instead of the latest 'wip'. Fix: pick the matching commit with the largest x (e.g. filter + last, or iterate in reverse). The digest's lab experiment 2 deliberately uses this as a 'find the bug' task; if the bug is fixed, update that experiment's observe/explain text.
- ❑ Git Flow canvas, feature branch row is unlabeled and uncolored: branchColors has key 'feature' but commits use branch name 'feature/login'. Consequences: (1) the dashed guide line and 'feature' label are never drawn for that row (the Object.entries(branchColors) loop checks commits.some(c => c.branch === 'feature')); (2) branchColors['feature/login'] is undefined, so ctx.fillStyle/strokeStyle assignments are ignored and the feature dots render white with leftover stroke colors. Fix: use a consistent key (either rename the commit branch to 'feature' or add a 'feature/login' entry / a lookup that strips the '/login' suffix).
- ❑ Git Flow canvas, Merge button silently does nothing when no feature branch exists (`if (!feat) return;`), and Feature Branch pressed twice without an intervening commit stacks a second 'login' dot exactly on top of the first (branch-off x = last develop x). Suggest disabling Merge until a feature exists, disabling Feature Branch while one is open (or giving successive features different names/rows), and showing a short status line (commit count, open branch).
- ❑ Git Flow canvas is described as Git Flow with main/develop/feature/release/hotfix, but only 'develop' and 'feature/login' ever receive commits; main/release/hotfix rows and the branchYs entries for them are dead code. Either add Release/Hotfix buttons or soften the panel description.
- ❑ Git Flow canvas, commit labels: msg is generated as 'feat-' + nextX AFTER the increment (first added commit at x=3 is labeled 'feat-4'), and only msg.substring(0,4) is drawn in a 6px font, so every new commit reads 'feat' and the text is nearly illegible on high-DPI screens. Also the canvas is not scaled by devicePixelRatio, so dots/text are blurry.
- ❑ Git Flow canvas spacing: stepX = (W-80)/max(6, nextX+1) with no lower bound; at desktop width (~824px) dots (radius 7) start overlapping after about 50 commits, at 340px after about 15. A minimum step with horizontal scrolling, or a cap with an automatic 'squash' of old commits, would keep the graph readable.
- ❑ Design Patterns panel text says 'Gang of Four tarafından kataloglanan 23 klasik tasarım deseni' but the panel shows only 15 cards (5 per tab); the intro should say it shows 15 of the 23, or the remaining 8 should be added (Bridge, Flyweight, Interpreter, Iterator, Mediator, Memento, State, Visitor).
- ❑ SDLC 'Bakım' detail asserts 'Yazılım maliyetinin ~%70'i bakımdadır!' without a source; the figure varies widely across studies. Consider softening to 'çoğu' or citing a source.
- ❑ Minor: 'Chain of Resp.' card name is abbreviated while all others are full; and the SOLID 'D' bad example ('private EmailServisi email = new EmailServisi()') and pattern code snippets are rendered via innerHTML with `<` characters inside strings (e.g. 'List<Bilesen>', 'List<ClickListener>', 'List<Komut>') which the browser may parse as unknown tags and drop from the displayed code; escape them as &lt; or set textContent for .dp-code.

## dairesel-hareket.html

- ❑ Kırmızı a_c oku yanlış fiziği gösteriyor: uzunluğu 0.35·r px (r büyüdükçe uzuyor, v'yi yok sayıyor); gerçekte a_c = v²/r. Ok uzunluğu a_c ile orantılı olmalı.
- ❑ Turuncu F oku 0.014·m·v² px; varsayılanda ~1 px, en çok ~20 px, ok başı topun altında kalıyor ve göstergede (legend) yok.
- ❑ Animasyon kare başına `angle += v/R*0.04`; 60 Hz'de gösterilen T'den ~2.4 kat, 120 Hz'de ~4.8 kat hızlı. requestAnimationFrame zaman damgası kullanılmalı.
- ❑ ω göstergesi toFixed(2) ile çok kaba (0.01–0.20); kaydırıcılar değer göstermiyor, seçilen değerler yalnız alt satırda.
- ❑ r = 160'ta çember kısa pencerelerde (innerHeight < ~630 px) tuvalden taşıyor. Ölü kod: kullanılmayan `scale`, boş `oninput` işleyicileri.

## fonksiyon-grafigi.html

- ❑ Kaydırıcı etiketi genişlik ≥ 5.97 olduğunda hep "2π" yazıyor (`spanX >= Math.PI*1.9`); ilk açılışta kaydırıcı 6.5 gösterirken gerçek yarıçap 2π.
- ❑ Eğri ±1.05×, ızgara ±1.0× hesaplanıyor ama tuval ±1.11× gösteriyor; kenarlarda boş şeritler kalıyor. Yatay ve dikey ölçek farklı (324/r ve 168/s px), eksenlerde sayı yok.
- ❑ İpucu iki parmakla yakınlaştırmayı vaat ediyor ama çoklu dokunma kodu yok; tekerlek yakınlaştırması imleç yerine merkeze göre ve olay büyüklüğünden bağımsız.
- ❑ Sinüs açılışta dikey yarıçap 4 ile, menüden seçilince 2.5 ile çiziliyor; "Görünümü sıfırla" açılış görünümüne dönmüyor. Her çizimde canvas.width yeniden atanıyor.

## is-enerji.html

- ✔ Düzeltildi (Ekim 2026): Başlat animasyonu başlatmıyordu, kaydırıcılar etkisizdi, top rampada yukarı çıkıyordu, birimler pikseldi. Simülasyon fiziksel birimlerle (L = 5 m, m = 2 kg) yeniden yazıldı; Isı çubuğu eklendi; μ ≥ tanθ iken cisim kaymıyor.
- ❑ Kare başına sabit 1/60 s adım; 120 Hz ekranda gerçek zamanda iki kat hızlı.
- ❑ Son adımda konum 5 m'ye kırpılıyor ama hız düzeltilmiyor; altta KE ≠ W_net (25°, μ = 0'da 41.2 / 41.4 J). Bitişte v = √(2aL) kesin değeri kullanılabilir.
- ❑ Kaydırıcılar değerlerini göstermiyor (θ yalnız rampada, μ hiçbir yerde). Statik ve kinetik μ aynı kabul ediliyor.

## kepler-yasalari.html

- ✔ Düzeltildi (Ekim 2026): gezegen piksel ölçeği iki kez çarpıldığı için ekran dışında çiziliyordu; Güneş elipsin merkezindeydi. Konum artık Kepler denklemi M = E − e·sinE çözülerek bulunuyor, Güneş odakta, taranan alan son T/8 süre (her an elipsin 1/8'i), sol üstte r ve vis-viva hızı.
- ❑ T²/a³ göstergesi T = a^1.5 tanımından hesaplandığı için her zaman 1.00; ölçüm değil. Gözlenen periyotlar yanında gösterilebilir.
- ❑ Hız oku her gezegenin kendi ortalama hızına göre ölçekleniyor; gezegenler arasında karşılaştırılamaz.
- ❑ Kaydırıcı ya da menü değişince gezegen günberiye sıfırlanıyor; kaydırıcı 0.005 adımlı, gerçek e değerleri (0.206, 0.007, 0.017) tam seçilemiyor. Merkür turu 1.44 s, yakalaması zor; hız kontrolü yok.
- ❑ Dar ekranlarda (~360 px) sol üst değer metinleri yörüngeyle çakışabilir.

## manyetik-alan.html

- ✔ Düzeltildi (Ekim 2026): kapatınca B göstergesi ve grafik güncellenmiyordu; Sıfırla kaydırıcıları geri almıyordu; Chart.js yüklenemezse sayfa hata veriyordu.
- ❑ Tuval alan çizgisi, yön ya da kutup çizmiyor; yalnız sayı gösteriliyor.
- ❑ 41 sarımın üstünde camgöbeği sarım çizgileri çemberin dışına taşıyor.
- ❑ Zaman ekseni "Zaman (s)" diyor ama `time += 0.1` kare başına ve kaydırıcı hareketi başına artıyor.
- ❑ Açma anında akım anlık (öz-indüktans yok); hava çekirdeği ve L = 0.2 m sabit; akım yönü değiştirilemiyor. Aç/Kapat'a hızlı iki kez basmak ikinci animasyon döngüsü başlatabiliyor.

## matris-donusumleri.html

- ❑ Ev ters çiziliyor: baseShape y-aşağı (ekran) düşünülerek yazılmış, drawShape y-yukarı çiziyor; çatı aşağı bakıyor ("X eksenine göre" ile düzeliyor).
- ❑ "Kaydırma (Shear)" iki kaydırıcı birlikteyken [[1, shx], [shy, 1]] tek matrisi; det = 1 − Shx·Shy, alan korunmuyor (Shx = Shy = 1'de şekil y = x doğrusuna çöküyor). Gerçek iki yönlü kesme iki matrisin çarpımı olmalı.
- ❑ Şekil simetrik ve yönelim işareti yok: "Y eksenine göre" yansıma görünmez (det = −1). (1,0) ve (0,1)'in görüntüsü, dönüştürülmüş ızgara ve özvektörler çizilmiyor.
- ❑ Çarpım sırası (ölçek → kesme → döndürme → yansıma) sabit ve arayüzde yazmıyor; ±180°'de "-0.000"; otomatik sığdırma ve sıfırla düğmesi yok.

## newton-hareket-yasalari.html

- ❑ Grafik eksenleri "m/s" ve "s" diyor ama hızlar piksel/kare, zaman kare başına 0.1 artan sayaç; ekran yenileme hızına bağlı.
- ❑ updateChart, `if (collisionChart)` denetiminden önce collisionChart.data okuyor; Chart.js yüklenemezse animasyon ilk karede donuyor.
- ❑ Çarpışma yalnız örtüşmeyle algılanıyor (yaklaşma denetimi, ayırma yok); bir kare geç yakalanıyor (5 px örtüşme). Duvar yok; toplar ekrandan çıkıp döngü sonsuza dek sürüyor.
- ❑ Sayfa "momentum ve enerji korunumu" diyor ama momentum/enerji göstergesi, kütle, hız ya da esneklik kontrolü yok; duraklat düğmesi yok; grafik son 51 noktayı tuttuğu için çarpışma sıçraması bir saniyeden kısa görünüyor.

## serbest-dusme.html

- ✔ Düzeltildi (Ekim 2026): Yerçekimi kaydırıcısı tam sayı adımlıydı (9.8 seçilemiyordu); step = 0.1.
- ❑ Direnç her zaman `k·v²` olarak çıkarılıyor (`−k·v·|v|` olmalı); düşüş sırasında k artırılır ya da kütle azaltılırsa hız yukarı dönüp sonsuza kaçıyor (göstergeler Infinity).
- ❑ Kare başına 0.1 s; 60 Hz'de gerçek zamandan 6 kat hızlı. Başlat'a her basış yeni döngü başlatıyor; Sıfırla düşüşü durdurmuyor ve göstergeleri yenilemiyor.
- ❑ Yere varış enterpolasyonsuz (kısa süre negatif yükseklik); grafik yalnız son 50 noktayı (5 s) tutuyor; kaydırıcılar değer ve birim (kg/m) göstermiyor; zemin ve ölçek çizilmiyor.

## vektorler.html

- ❑ Paralelkenar hiç çizilmiyor: `pAB` ile `pR` aynı nokta, kesikli yol tek bir kenar. A'nın B'nin ucuna taşınmış hâli görünmüyor.
- ❑ θ atan2'den (−180°…180°) gelirken açı kaydırıcıları 0–360°; sıfır vektörde yuvarlama artıklarından anlamsız θ ve "−0.00" görünüyor (|R| < 0.005 iken "tanımsız" yazılmalı).
- ❑ Orijin (80, 400) noktasında; sola ve aşağı yalnız ~2.9 birim yer var, 5 birimlik oklar tuvalden çıkıyor. Izgara kısmi, eksen numarası yok.
- ❑ Etiketler girişlere bağlı değil (erişilebilir ad yok), okuma aria-live değil; A ile B arasındaki açı gösterilmiyor; sayfa bilgisi çıkarma yapılabildiğini söylüyor ama sayfa yalnız topluyor.

## yay-kutle.html

- ❑ `tick()` kare başına sabit `t += 0.016`; 60 Hz'de %4 yavaş, 120 Hz'de ~2 kat hızlı, arka plan sekmede duruyor.
- ❑ Fizik motoru yok: x = A·cos(ωt) doğrudan çiziliyor. Genlik 0.8 m sabit (periyodun genlikten bağımsızlığı denenemiyor); sönüm ve enerji göstergesi yok; duraklat düğmesi yok.
- ❑ Hız eğrisi k/m > ~120'de grafikten taşıyor; konum ve hız aynı eksende etiketsiz farklı ölçeklerle çiziliyor.
- ❑ Her karede canvas boyutu yeniden atanıyor; kaydırıcı etiketlerinin `for` özniteliği yok.

## asit-baz-titrasyonu.html

- ✔ Düzeltildi (Kasım 2026): H₂SO₄ + NaOH iki protonu yok sayıyordu, HCl + NH₃ eşdeğerlikte NH₄⁺'yı baz sayıyordu (pH 10.97, sonra düşüş). calcPH artık tüm çiftler için yük denkliğini ikiye bölmeyle çözüyor (H₂SO₄ pKₐ₂ 1.99, NH₄⁺ pKₐ 9.25); eşdeğerlik hacmi hesaplanıyor; eğriler monoton; aralık 50 mL; indikatör rengi düzgün geçiyor.
- ❑ "Eşdeğerlik noktası geçildi" mesajı ancak 26.0 mL'den sonra çıkıyor (`> eqVol + 1`); düşen damla büret ucunun altında değil, şişenin ortasında çiziliyor.

## atom-orbitalleri.html

- ✔ Düzeltildi (Kasım 2026): enerji diyagramı (1s en üstte, eşit aralık, 4s/3d sırası) yeniden çizildi, hidrojen anahtarı eklendi; orbital metinlerindeki düğüm düzlemi hataları düzeltildi; noktalar artık gerçek |ψ|²'den örnekleniyor (1s/2s/3s, Kesit ile radyal düğümler); mℓ ve radyal/açısal düğüm okumaları doğru; tekerlek sayfa kaydırmayı engellemiyor; kesit kalınlığı en çok ±0.8 a₀.
- ❑ Dokunmatik ekranda tuvalde sürükleme sayfayı kaydırmıyor (döndürme için touch-action: none). 3p ve f orbitalleri sayfada yok.

## ay-evreleri.html

- ✔ Düzeltildi (Kasım 2026): Ay Dünya'nın yanlış tarafındaydı; evre diski yanlış aydınlatılıyordu; mevsim paneli Dünya merkezliydi ve ekseni sallıyordu; Otomatik düğmesi çalışmıyordu. Geometri, aydınlık küre çizimi, sabit eksenli mevsim paneli (23,44°), İstanbul öğle Güneş'i yüksekliği, büyüyen/küçülen evre adları, gün sayacı ve 12,37 oranlı Otomatik eklendi.
- ❑ İki yörünge aynı düzlemde ve dairesel; Ay yörüngesinin ~5,1° eğikliği yok (sayfa ve defter bunu söylüyor).

## bayes-olasilik.html

- ✔ Düzeltildi (Kasım 2026): "Zar (hile)" senaryosunda adil zar için 6 olasılığı %5 alınıyordu (artık 1/6 ≈ %17); kaydırıcı etiketleri senaryoya göre değişiyor; yüzde biçimi ve statik P(B) düzeltildi; açık tema okunur.
- ❑ Önsel kaydırıcısı %50'de duruyor; duyarlılık ≥ %50 ve yanlış pozitif ≤ %50 olduğu için kanıtın inancı azalttığı durum gösterilemiyor.

## dalga-superpozisyonu.html

- ❑ İki dalga hep aynı frekansta; "frequency" değişkeni aslında dalga sayısı, uzun dalgalar daha hızlı ilerliyor, zamanla vuru görülmüyor.
- ❑ Faz farkı π/2'de sabit; tam yıkıcı girişim gösterilemiyor; kaydırıcı ya da sayısal gösterge yok.
- ❑ ECharts grafiği tuvale göre ters, y ekseni ±100'de kırpıyor ("Toplam Dalga Genliği" başlığı da y(x) için yanlış); ECharts yüklenemezse tuval de boş kalıyor; kare başına zaman.

## dogal-secilim.html

- ✔ Düzeltildi (Kasım 2026): "alel frekansı" etiketleri "fenotip oranı" oldu; dar tuvalde alt sıra kırpılmıyor; grafik ölçeklemesi düzeltildi.
- ❑ Kelebekler listedeki sıraya göre sabit yerlerde çiziliyor, bireyler evrimleşiyormuş gibi görünüyor; nüfus kaydırıcısı çalışırken rastgele birey ekleyip siliyor; hale sınırda çok soluk; hız kontrolü ve tohum yok.

## enzim-kinetigi.html

- ✔ Düzeltildi (Kasım 2026): tuval arka planı CSS değişkeniyle boyanmıyordu; "µM/s" büyük harfe çevrilip "ΜM/S" oluyordu.
- ❑ Yarışmalı modda Km ≥ 1.15'te Km işareti grafiğin dışına çıkıyor; şema [S]/Vmax/Km'ye tepki vermiyor ve yarışmalı inhibitörü bağlı substratın yanında çiziyor.

## fotosentez-solunum.html

- ✔ Düzeltildi (Kasım 2026): tuval son parçacık rengine boyanıyordu; O₂ mitokondriden çıkıyormuş gibi çiziliyordu; Glikoliz adımı mitokondriyi vurguluyordu; etiketler kırpılıyordu; Krebs halkası kristaların üstündeydi; güneş simgesi glikoz renginde çiziliyordu.
- ❑ Nicel model yok (ışık/CO₂/sıcaklık ayarı, kompansasyon noktası yok); animasyon reduced-motion'a uymuyor.

## gunes-sistemi.html

- ✔ Düzeltildi (Kasım 2026): Ay Dünya'nın çevresinde dönmüyordu (hız oranı 1); tıklamalar Güneş parıltısına takılıyordu; hareket kare hızına bağlıydı; Satürn halkası dikti; arka plan yıldızları Güneş Sistemi'nin içindeydi; kamera yıldız kabuğundan çıkabiliyordu. Bilgi paneli dönem ve uzaklık gösteriyor; ölçek uyarısı var.
- ❑ Ay'ın çizilen yörüngesi Venüs ve Mars'ın yörüngesine değiyor; x2 üstünde Ay kare başına onlarca derece atlıyor. Uzaklıklar ve boyutlar ölçeksiz (sayfada yazıyor).

## integral.html

- ❑ Aralık hep 0'ı içeriyor (a: −5…0, b: 0…5); [1, 3] gibi aralıklar seçilemiyor.
- ❑ Gerçek integral ve hata göstergesi yok; düşey aralık ±10'da sabit (x² ve x³ kırpılıyor, sin neredeyse düz); simetrik tek fonksiyonlarda "-0.000000"; yalnız orta nokta; süs dalgası yüzünden sürekli animasyon; MathJax CDN'e bağlı.

## kimyasal-kinetik.html

- ❑ Parçacık paneli çarpışma modellemiyor: her karede her parçacık kalan A oranına göre rastgele renkleniyor, B çizilmiyor, hız sıcaklıkla değişmiyor; sayfadaki "Parçacıklar çarpıştıkça ürün oluşur" yazısı yanıltıcı.
- ❑ İki grafik eğrisi farklı zaman ölçeği kullanıyor; geçmiş 500 noktayla sınırlı; "Enzim" ayarı 100 °C'de bile ×10 (gerçek enzimlerden çok zayıf); kare başına sabit dt; k ve t½ göstergesi yok.

## mekatronik-muhendisligi.html

- ✔ Düzeltildi (Kasım 2026): robot kol tuvalinin renkleri CSS değişkeninden okunmuyordu; kol 12 konumun 7'sinde tuvalden çıkıyordu; uç konumu artık tabana göre, y yukarı.
- ❑ Yalnız θ₁ değiştirilebiliyor (θ₂ = 30° sabit), çalışma alanı halkası denenemiyor. Sayfanın ana fikri olan kapalı döngü/PID yalnız statik şema; etkileşimli PID simülasyonu en değerli ek olur. PLC panelinde "STL" (IEC dili ST), IMU kartında manyetometre eksik.

## mitoz-mayoz.html

- ✔ Düzeltildi (Kasım 2026): mitoz iki hücre üretmiyordu; anafazda kromozom sayısı yarıya iniyormuş gibi görünüyordu; mayozda homologlar ayrılmıyordu; krossing-over yanlış evredeydi; evreler eksikti; kardeş kromatitler ve iki kutuplu iğ yoktu; Oynat kare hızına bağlı ve bozuktu. 2n = 4 modeli, X kromozomlar, evre başına "Kromozom · Kromatit · Hücre" sayacı ve zaman tabanlı Oynat eklendi.
- ❑ Metafaz I'de tek bir dizilim ve çift başına tek sabit krossing-over gösteriliyor (bağımsız dağılım çeşitliliği yalnız metinde).

## molekul-sekli.html

- ✔ Düzeltildi (Kasım 2026): bütün dış atomlar "H" yazıyordu; NH₃ düzdü; H₂O 135°, CH₄ bozuk çiziliyordu; ortaklanmamış çiftler molekülle dönmüyordu; 2D'de atomlar üst üste biniyordu. Gerçek atom etiketleri, açılardan hesaplanan 3B geometri, dönen elektron çifti lobları, kama/kesikli kama 2D görünümü, açı yayı ve ölçekli bağ uzunlukları eklendi.
- ❑ 2D NH₃'te açı yayı kama ile kesikli kama arasında (ekranda ~80°) ama gerçek 107° yazıyor; defter bunu açıklıyor.

## takimyildiz-haritasi.html

- ✔ Düzeltildi (Kasım 2026): Büyük Ayı metni Kutup Yıldızı'nı sap yıldızlarına gösterttiriyordu; pusula harfleri köşelerdeydi; mevsimler yalnız parlaklığı değiştiriyordu; kutup çevresi takımyıldızlar "zor görünür" diyordu; yerleşim uydurmaydı. Harita artık gerçek J2000 koordinatlarıyla, Ankara (39,9° K) için her mevsimin ortasında saat 22.00'deki gökyüzünü başucu merkezli gösteriyor; parlaklıklar, çizgiler ve mitler düzeltildi; arka plan yıldızları tohumlu.
- ❑ Harita tek konum ve saate sabit; kalabalık yerlerde bazı sönük yıldız adları gizleniyor; tuval klavye ve ekran okuyucuyla kullanılamıyor.

## yildiz-yasam-dongusu.html

- ✔ Düzeltildi (Kasım 2026): eksen etiketleri görünmüyordu (CSS değişkeni); yıldızlar tayf alt sınıfına göre ters yerleşiyordu (Sirius B G sütununda); Polaris kartı süpernova diyordu; "Kütle Yolları" evrim yolu değildi; parlaklıklar hatalıydı. Yıldızlar artık sıcaklığa göre logaritmik eksende; şematik ama doğru evrim yolları; düzeltilmiş kartlar; çakışmayan etiketler.
- ❑ Diyagram açık temada da koyu kalıyor (bilinçli seçim); yıldızlara klavyeyle erişilemiyor.

## sarkac.html

- ✔ Düzeltildi (Kasım 2026): sönüm alanı `hidden` iken de görünüyordu (`.field { display: grid }` özniteliği eziyordu; `shared/theme.css`'e `[hidden] { display: none !important; }` eklendi). Okuma etiketlerindeki büyük harf dönüşümü "2π√(L/g)"yi "2Π√(L/G)" yapıyordu; kaldırıldı.
- ✔ Düzeltildi (7 Kasım 2026): periyot ölçümü denge geçişini 1/240 s'lik adımın içinde ara değerle buluyor. Önce adımın sonuna yuvarlanıyordu: 20°'de okuma 2.021 ile 2.022 s arasında titriyor, küçük açılarda Fark −0.03 %'ye düşebiliyordu; şimdi sabit 2.021 s (+0.77 %), 2°'de +0.01 %. Uzunluk ya da yerçekimi değişince sarkaç θ₀'dan yeniden bırakılıyor (önce genlik sessizce değişiyordu); sürükleyip bırakınca kaydırıcının gösterdiği tam dereceye oturuyor; grafikteki T₀ çizgileri ilk geçişten önce de yukarı yönlü geçişlere hizalı; not modelin çubuk olduğunu söylüyor (açı 170°'ye kadar gidiyor, ip 90°'nin üstünde gevşerdi).

## Ortak katman (shared/)

- ✔ Düzeltildi (Kasım 2026): `digest.css` — mobilde iki satıra sarılan sınav soruları (`legend`) kutunun üst çerçevesine biniyordu; legend artık kutunun içinde.
- ✔ Düzeltildi (6 Kasım 2026): `digest.js` kavram başlığı, formül notu, deney ve vay başlıkları, sözlük terimi, köprü konuları, sınav sorusu ve açıklaması ile kaynak notunu HTML'den kaçırarak basıyordu; 41 defterde 76 alanda `<sub>` gibi ham etiketler sayfada görünüyordu. Bu alanlar artık `sanitize()` ile işleniyor. `smoke.mjs --digest` defter metninde ham etiket kalırsa hata veriyor (her soruda bir şık seçip açıklamaları da denetliyor).
- ❑ `digest.js`: "🔈 Hikâyeyi dinle" düğmesinde emoji var (içerik rehberi emoji istemiyor; arayüz öğesi olduğu için ertelendi).

---

# Kasım 2026'da yeniden kurulan laboratuvarlar

Bu sayfalar `sarkac.html` standardında sıfırdan yazıldı (gerçek birimler, kare hızından bağımsız sayısal yöntem, ölçülen–kuram karşılaştırması). Kurucu ajanların ayrıntılı raporları depoda tutulmuyor; aşağıdaki maddeler doğrulayıcı ve editör ajanların bildirdiği açık kalan zayıflıklardır.

## lorentz-kuvveti.html

- ❑ Serbest senaryoda görünüm her değişiklikte yörüngeye göre yeniden ölçekleniyor; yarıçapın büyüdüğü tuvalde görülmüyor, yalnız tabloda ve ölçek çubuğunda. "Zaman ölçeğini sabitle" işaretliyken görünüm de sabitlenebilir.
- ❑ Spektrometrede yük kaydırıcısı oynatılınca gizli parçacık menüsü sessizce "Özel"e geçiyor.
- ❑ Model göreli değil (0.1c üstünde yalnız uyarı); E hep +y yönünde, B düzgün (grad-B sürüklenmesi ve manyetik şişe yok).

## klasik-girisim.html

- ❑ Beyaz ışıkta imleç okuması "I/I₀" diyor, açıklama "parlaklık Y/Y₀" (`updateCursorReadout`).
- ❑ Beyaz ışıkta karanlık saçak aralığındaki −1.02 % farkın nedeni (kısa dalga boylarının daha dik çukurları) sayfada açıklanmıyor.
- ❑ Fresnel kartı 0.3'ün altındaki her değere "≪ 1" diyor; 0.12 için cömert.
- ❑ L = 3 m'de varsayılan ±20 mm görünüme merkez zarftaki 9 saçağın 7'si sığıyor.

## fotoelektrik.html

- ❑ `collectedShare()` düzgün enerji dağılımı varsaydığı için akım −V₀'da keskin kesiliyor; gerçek eğrilerin yumuşak kuyruğu ve temas potansiyeli yok (sayfa bunu söylüyor).
- ❑ "Belirsizlik" okuması deterministik yuvarlamayı rastgele hata gibi ele alıyor.
- ❑ 5 V üstündeki V₀ ölçülemiyor; sezyumda 178 nm altına inilemiyor.

## radyoaktif-bozunma.html

- ❑ Her sıfırlama ya da ayar değişikliği koşuyu kendiliğinden başlatıyor; "Başlat" durumu neredeyse hiç görülmüyor.
- ❑ Uydurulan λ'nın belirsizliği gösterilmiyor; N₀ = 100'de yaklaşık % 3 yanlı; yaklaşık % 25 daha dar olan en çok olabilirlik kestirimi sunulmuyor.

## termodinamik.html

- ❑ R = 8.314 kullanılıyor (tam değer 8.314462618); enerjiler yaklaşık % 0.005 düşük.
- ❑ Hazır çevrimden sonra Temizle, 10 L / 300 K'ya değil hazır çevrimin başlangıcına dönüyor.
- ❑ Sabit hacimde ısıtma tek bir "Sıcak kaynak" kutusuyla gösteriliyor; tersinir bir adım sürekli bir kaynaklar dizisi ister ve gösterilen ΔS yalnız gazınki; sayfa bunu söylemiyor.
- ❑ Ters yönlü (soğutucu) çevrimler için etkinlik katsayısı (COP) okuması yok.

## ideal-gaz.html

- ❑ Termostat açıkken "Isıt (enerji ×1.25)" hedefi 10 K'ya yuvarlıyor: 300 → 380 K (×1.27) (`heatBy()`).
- ❑ Varsayılanlara dönme düğmesi yok; `fullReset()` kaydırıcıları sıfırlamıyor, defter sayfanın yeniden yüklenmesini söylüyor.
- ❑ d = 0.10 nm'de ortalama serbest yol (21 nm) 30 nm'lik kutu yüksekliğine yaklaşıyor; seyrek gazda sıkıştırma tersinirlikten belirgin biçimde uzaklaşıyor.

## gorelilik-uzayzaman.html

- ❑ İkizler senaryosunda olay tablosu E₁ ve E₂'yi gidiş hızıyla dönüştürüyor; E₂ için okur dönüş çerçevesindeki değeri bekleyebilir (ct′ = 13.67 görünüyor; ~456–465 ve ~1460. satırlar).
- ❑ "Doppler k (uzaklaşan)" okuması dönüş (yaklaşma) bacağını yok sayıyor; 1/k yalnız grafikte.
- ❑ Eşzamanlılık tablosu geometriden hesaplanıyor, değerler ışık daha varmadan görünüyor; β ≥ 0.8'de A'nın ışığı koşu bittikten sonra varıyor.
- ❑ Göreli hız toplama için denetim yok.

## doppler-etkisi.html

- ❑ Hazır deney düğmeleri geçiş uzaklığı d'yi sıfırlamıyor (~1273. satır); defter deneyleri bunu hesaba katıyor.
- ❑ M ≥ 1'de C sürüklendikten sonra durum satırı bir sonraki tepe C'ye varana dek "dışında" diyebiliyor.
- ❑ Gözlemciler yalnız kaynağa doğru hareket edebiliyor, C ortama göre hep durgun; geçiş sesinin şiddeti duyulabilirlik için 1/r yerine 1/√r ile azalıyor.

## alternatif-akim.html

- ❑ Frekans kaydırıcısı logaritmik adımlı; 400 Hz'den ayrılınca tam 400 Hz'e dönülemiyor (399.9 Hz). Varsayılana dönüş düğmesi ya da sayısal giriş eklenmeli (`freqRange`).
- ❑ Saf L ya da saf C devresi yok (R ≥ 1 Ω); paralel RLC, sargı direnci ve kaynak empedansı yok.
- ❑ `elektrik-muhendisligi.html` şebeke gerilimini 220 V yazıyor; Türkiye'de anma değeri 230 V.

## elektrik-devresi-simulasyonu.html

- ❑ Köprüde anahtar açıkken formül notu hâlâ V_th = 285 mV yazıyor (`DCCore.theory()` `p.closed`'ı denetlemiyor).
- ❑ I–V grafiğinde akım ekseni devreye göre yeniden ölçekleniyor; kaynak doğrusunun eğimi (−r) değişmediği hâlde dik ya da yatık görünüyor. Açıklamaya "eğim −r" notu eklenmeli.
- ❑ Maksimum güç kipinde r = 0 iken lamba referansı 6 W'a düşüyor ve parlaklık % 2400 gösterebiliyor (yalnız görsel).

## akiskanlar-mekanigi.html (6 Kasım 2026)

- ✔ Yeniden kuruldu: Venturi borusu (süreklilik, Bernoulli, piyezometre tüpleri, venturimetre), Torricelli boşalan tank (C_d = C_c·C_v, jet menzili, boşalma süresi), Poiseuille viskoz akışı (parabolik hız profili, R⁴ yasası, Reynolds sayısı).
- ❑ Sekme bağlantıları (#venturi, #torricelli, #poiseuille) yalnız sayfa yüklenirken okunuyor; `hashchange` dinleyicisi yok.
- ❑ Poiseuille'de "tam gelişmiş akış" eşiği (`poiTick`, 5e-5) gösterim yuvarlamasından gevşek; tablo kararlı görünür olduktan sonra yaklaşık 0.4 s boyunca 627.0 µL/s yazıp sonra 627.1'e geçiyor.
- ❑ Torricelli'de başlangıç hızı ve debisi kartlarda okunamayacak kadar hızlı geçiyor (kartlar 150 ms'de bir yenileniyor, 20× hızda).
- ❑ Jet hız katsayısı C_v = 0.98 ders kitabı değeri; hassas ölçümler 1'e çok yakın değer veriyor. Zeytinyağı viskozitesi sayfada 84 mPa·s, OpenStax tablosunda 138 mPa·s (kaynağa ve sıcaklığa bağlı).

## tork-denge.html (6 Kasım 2026)

- ✔ Yeniden kuruldu: kaldıraç (tork, ağırlık merkezi, serbest bırakınca Iα = Στ, paralel eksen teoremi), iki destekli kiriş (tepki kuvvetleri, devrilme), merdiven (sürtünmeli statik, kritik açı).
- ❑ `fx()` aynı 539.55 N tepkiyi bir hazır düzende 539.6, ötekinde 539.5 gösteriyor (yuvarlama tutarsızlığı, ~614. satır).
- ❑ Kaldıraçtaki `#lvN` kartı ("Destek tepkisi N = Mg (dengede)") kiriş dengesizken ya da dönerken de Mg gösteriyor; yanındaki dinamik N₀ ile karışabilir (~936. satır).
- ❑ Merdivende kişinin kütlesi 0 iken Tırman düğmesi ve d kaydırıcısı çalışıyor ama hiçbir şey değişmiyor (`setClimbing`, ~874. satır).
- ❑ Devrilme ve kayma canlandırılmıyor, yalnız kesikli çizgiyle gösteriliyor; bir düğme odaktayken kısayollar çalışmıyor.

## kaldirma-kuvveti.html (6 Kasım 2026)

- ✔ Yeniden kuruldu: serbest bırakılan düşey silindirin yüzme dengesi ve salınımı (kararlılık uyarısı), dinamometre ile taşırma kabı, kral tacı yoğunluk testi.
- ❑ Sekme bağlantıları (#serbest, #dinamometre, #tac) yalnız sayfa yüklenirken okunuyor; `hashchange` dinleyicisi yok.
- ❑ Cisim dururken ζ, C_d, H ya da D değiştirilirse periyot satırı "ölçülüyor…"da kalıyor; hareket yeniden başlamadığı için Sıfırla gerekiyor (`paramsChangedA`, ~641. satır).
- ❑ Eklenmiş kütle (added mass) modelde yok; gerçek bir blok sayfadakinden daha yavaş salınır (sayfa bunu söylüyor).

## basinc.html (6 Kasım 2026)

- ✔ Yeniden kuruldu: derinlik ve kap biçimi (hidrostatik paradoks, duvar kuvvetleri), U-tüpü manometre (gizli yoğunluklu yağ), hidrolik kaldıraç (iş dengesi, pompa vuruşları), barometre ve yükseklik (ISA ve izotermal model).
- ❑ U-tüpünde durum satırı yaklaşık 5.2 s'de "Dengede" deyip 0.3 s kadar "Salınıyor"a dönüyor; denge testinde kilit yok (`stepB()`, ~1180. satır).
- ❑ Cıva + su durumunda durum satırındaki işlem ("13534 × 1.47 / 20.00 = 998") gösterilen sayılarla yeniden yapılınca 994.7 veriyor; h₁ üç ondalıkla gösterilmeli (`readoutsB()`, ~1218. satır).
- ❑ Hidrolik sekmede d₁/d₂ hem piston çapları hem de yer değiştirmeler için kullanılıyor ("Σd₁", "mgd₂"); defter Δx₁/Δx₂ kullanıyor.
- ❑ U-tüpü grafiğinin ekran okuyucu etiketi (`ARIA.utup[1]`, ~604. satır) çizilen grafiği yanlış tarif ediyor.

## optik-yansima-kirilma.html (6 Kasım 2026)

- ✔ Yeniden kuruldu: arayüz (Snell yasası ve Fermat ilkesiyle sayısal en kısa süre, s ve p kutuplu Fresnel güç oranları, Brewster ve kritik açı, sönümlenen dalganın derinliği), prizma ve dispersiyon (Sellmeier indisleri, en küçük sapmadan n ölçümü, F/d/C çizgileri), optik fiber (sayısal açıklık, kabul konisi, duvardaki yansıma sayısı, ışınlar arası gecikme).
- ❑ Kritik açıya git düğmesinde (n₁/n₂)·sin θ₁ tam 1 çıkıyor; sayfa bunu tam iç yansıma sayıp θ₂ kartına "yok (tam iç yansıma)" yazıyor, durum satırı ise "Kritik açıdasın … θ₂ = 90°" diyor (`st >= 1`, ~416. satır; kart ~926. satır). Sınırda kart "90.00° (sıyırır)" göstermeli; defterdeki deney bugünkü metni andığı için ikisi birlikte güncellenmeli.
- ❑ Fiberde 14.1°'de sızan ışının 1 m sonraki gücü yaklaşık 10⁻⁵⁷⁷; JavaScript'in en küçük sayısının altında kaldığı için 0'a yuvarlanıyor ve "≈ 0" görünüyor. Gücün logaritması gösterilebilir.
- ❑ Fiberdeki 1 m'lik güç soğurmayı hesaba katmıyor (gerçek silika 0.2–3 dB/km); darbeler aynı hızla çiziliyor, yalnız uzun yolu gösteriyor.

## mercek-isinlari.html (6 Kasım 2026)

- ✔ Yeniden kuruldu: tek mercek (ince mercek denklemi, ışın çizimi, Newton biçimi, büyüteç, ıraksak mercek), mercek yapıcı denklemi (Snell ile gerçek ışın izleme, kalın mercek, hava/su/yağ, küresel sapma), iki mercekli sistemler (mikroskop, Kepler ve Galileo teleskobu, eşdeğer kırıcılık, açısal büyütme).
- ✔ İki mercekli sistemlerde durum satırı son görüntü gerçekse yakınsayan demet, 25 cm'den yakınsa yakın nokta uyarısı veriyor (teleskopta da); net görüş aralığı (mikroskopta s_o, teleskopta d) o anki düzenden hesaplanıyor.
- ❑ Tek mercek sekmesinde açısal büyütme okuması yok; Büyüteç düğmesinde yanal m = +2.5 rastlantıyla 25 cm/f = 2.5'e eşit ve okuru yanıltabilir. Sanal görüntü (−15 cm) de 25 cm'lik yakın noktanın içinde (defterdeki bir kavram yanılgısı bunu açıklıyor).
- ❑ Mikroskopta net görüş aralığı yaklaşık 0.02 mm; s_o kaydırıcısının adımı (0.01 cm) bundan büyük, kaydırıcıyla yalnız hazır değer (1.76 cm) netlikte. Bir ince ayar denetimi eklenebilir; defter 1.75 cm'ye "bir adım" demeye dayanıyor.
- ❑ Gözlük gücündeki mercekler (|f| > 20 cm) Tek mercek sekmesinde kurulamıyor; defterin gözlük örneği yalnız metinde. Dispersiyon yok, renk sapınçı yalnız metinde anlatılıyor.
- ❑ İnce mercekler sonsuz açıklıklı: çizilen mercek boyunun üstünden geçen ışınlar da kırılıyor.
- ❑ İki mercekli sistemlerde M satırı göz son görüntüyü göremezken de büyük bir değer gösteriyor (1.75 cm'de −186.05); durum satırı açıklıyor ama satır da işaretlenebilir.
- ❑ Mercek yapıcı denkleminde küresel sapma yalnız h = 1.8 cm'de gösteriliyor; ikinci bir yükseklik (h = 0.9 cm'de 0.13 cm) h²'yle büyümeyi sınatırdı.

## cift-sarkac.html (6 Kasım 2026)

- ✔ Yeniden kuruldu: tam Lagrange denklemleri, 0.5 ms adımlı RK4; 2–10 kopya θ₂'de Δ farkla başlar; ln d grafiği, eğim uydurma, Benettin λ, öngörülebilirlik ufku ve ayrışma zamanı; küçük açılarda normal mod periyotları; faz portresi ve Poincaré kesiti.
- ❑ 200 s'lik Benettin λ JavaScript motoruna bağlı (Chromium 0.945, node 1.007 1/s): `Math.sin`/`Math.cos`'un son bitteki farkı kaosla yaklaşık 35 s'de büyüyor. Sayfa bunu formül notunda söylüyor, defter aralık veriyor.
- ❑ Eğim uydurma t = 0'dan başlıyor ve ilk hizalanma geçişini içeriyor; Δ ≥ 10⁻³'te pencere anlamlı olamayacak kadar kısa.
- ❑ Kopyalar yalnız θ₂'de farklı başlıyor (ω ya da θ₁ bozulması, rastgele topluluk yok); bütün hazır başlangıçlar durgun, ilk hız denetimi yok. Mod hazırlarının genliği sabit (5° ve 3°).
- ❑ Herhangi bir parametre değişince koşu baştan başlıyor (`sarkac.html`'deki gibi koşu sırasında değiştirme yok). Poincaré kesiti kısa koşuda seyrek; kaotik denizi görmek için birkaç dakika ya da N = 10 gerekiyor.
- ✔ Defterin "sonraki" bağlantısı `lorenz-cekici.html` eski, tek "Çiz!" düğmeli bir sayfaydı; sayfa 7 Kasım'da yeniden kuruldu, bağlantı metni yeni sayfayı anlatıyor.

## kuantum-dalga.html (6 Kasım 2026)

- ✔ Yeniden kuruldu: sonsuz kuyu, sonlu kuyu, harmonik osilatör ve çift kuyu; Schrödinger denklemi ızgarada sayısal çözülüyor ve özdeğerler kesin değerlerle karşılaştırılıyor; üç bileşene kadar süperpozisyon, ⟨x⟩ ve periyot ölçümü, Gauss paketi ve yeniden canlanma (T_rev), çift kuyuda tünelleme ve yarılma.
- ✔ Osilatörde |m − n| ≠ 1 çiftleri artık ⟨x⟩ salınımı üretmiyor (ızgaradaki ⟨φ₀|x|φ₃⟩ ≈ −5×10⁻⁶ nm kalıntısı ⟨x⟩ = 0 iken 6.893 fs'lik sahte bir periyot gösteriyordu). Her iki durumlu karışımda zaman kartı t/T'yi, harita T'nin katlarını gösteriyor; ⟨x⟩ sabitse kart nedenini (parite ya da merdiven kuralı) söylüyor.
- ❑ 1 meV'den sığ bağlı durumlar 16 nm'lik hesap kutusuna sığmıyor ve sayılmıyor (V₀ ve a taramasında ayarların yaklaşık % 0.5'i); sayfa "Bağlı durum sayısı" alt satırında bunu söylüyor.
- ❑ Çift kuyuda yasak bölgedeki olasılık yalnız sayısal; kesin değerle karşılaştırılmıyor.
- ❑ Yüksek hızlarda Re ψ ve Im ψ kare hızından hızlı döndüğü için çakarak görünüyor ("Ortak faz dönüşünü çıkar" bunu gideriyor); ölçümler etkilenmiyor.

## atislar.html (6 Kasım 2026)

- ✔ Yeniden kuruldu (Three.js/CDN prototipi kaldırıldı): ikinci dereceden hava direnciyle noktasal top, 1 ms adımlı RK4; menzil, tepe yüksekliği, süre ve çarpma hızı boşluk formülleriyle karşılaştırılıyor; açı taraması en iyi açıyı buluyor. Futbol, beyzbol, golf, masa tenisi topu, gülle ve özel top; Dünya (deniz düzeyi ve Denver), Mars ve Ay.
- ✔ Ay'da durum satırı oranları Dünya'daki boşluk atışına göre veriyor (yerden 6.06 kat uzak, 6.06 kat uzun); `index.html` etiketi ve `page-info.js` girdisi 2B sayfaya göre düzeltildi.
- ❑ Kaldırma (Magnus) kuvveti, dönme ve sürükleme krizi yok (C_d sabit): golf ve beyzbolda taşıma mesafesi, futbolda kritik hız (~12 m/s) çevresi eksik modelleniyor. Sayfa bunu "Top" panelinde söylüyor.
- ❑ Rüzgâr, sekme ve yuvarlanma yok; zemin atış düzeyinde düz. "Tipik atış" değerleri yuvarlanmış örnekler, ölçülmüş veri değil.
- ❑ Çok hafif özel topların yüksekten bırakıldığı taramalar birkaç saniye sürebiliyor.

## duran-dalgalar.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: titreştiricili tel (dalga denklemi sonlu farklarla; rezonansta genlik birikir, düğümler ve düğüm aralığı ölçülür, rezonans eğrisi taranır, iki yürüyen dalga gösterilir; gitar teli D'Addario PL010 verisiyle), açık ve kapalı borular (uç düzeltmesi, yer değiştirme ve basınç desenleri), rezonans tüpüyle ses hızı ve uç düzeltmesi, çekilen telin harmonikleri ve sesi çal düğmesi.
- ✔ Titreştirici frekansı için "f (Hz)" sayı kutusu (kaydırıcı 0.01 Hz adımlı olduğundan 90.00 Hz'e inmek yüzlerce tuş istiyordu).
- ❑ Gerilme kuvveti kaydırıcısında (`aT`, 0.5–150 N) sayı kutusu yok; 10.00 N'a inmek sürükleme ve 50'ye yakın ok tuşu istiyor, her basış teli yeniden başlatıyor. `aFNum` gibi bir "T (N)" kutusu eklenmeli.
- ❑ Yerleşme ölçütü (`settledA`, 7/β beklemesi) önceki durumun e⁻⁷'sini bırakıyor; 100 Hz'den 90 Hz'e geçince kartlar "yerleşti" dendikten sonra kısa bir süre kayıyor ve durum satırındaki kazanç (bir ondalıkla, `fix(gain, 1)`) 1.05'in iki yanında 1.0 ile 1.1 arasında gidip geliyor. Bekleme ln(A_eski/A_yeni)/β kadar uzatılmalı ya da kazanç iki ondalıkla yazılmalı (defter bugünkü davranışı anlatıyor).
- ❑ Düğüm konumları yalnız tuval cetvelinden okunuyor; tabloda listelenmeli. Sönüm bütün modlar için aynı, gitar telininki görünürlük için abartılı (β = 8 s⁻¹, sayfa söylüyor). "İlk 6 harmoniği ayrı ayrı çiz" açıkken eksik modlar hiç çizilmiyor.
- ❑ Borularda uç düzeltmesi frekanstan bağımsız (0.61 r, kr ≪ 1); boru tablosu ölçüm değil, düzeltmeli ve düzeltmesiz formül değerlerini karşılaştırıyor; rezonans tüpünün dB değerleri göreli.
- ❑ Defterin önceki "sonraki" bağlantısı `dalga-superpozisyonu.html` aynı yönlü iki dalga gösteren, faz denetimi olmayan eski bir sayfa; duran dalgaların doğal ön koşulu olarak yeniden kurulmalı.

## kirinim-izgarasi.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: N yarıklı Fraunhofer deseni (tepe, sıfır ve ikincil maksimumlar sayısal bulunur; eksik mertebeler), gonyometreli spektrometre (H, Na, Hg ve beyaz ışık; iki yanlı okuma, ölçek sıfır hatası, Rayleigh ölçütü, Balmer çizgilerinden Rydberg sabiti ve indirgenmiş kütle düzeltmesi), CD, DVD ve Blu-ray iz aralığı ölçümü.
- ✔ Rayleigh sınırında kıl çizgisi çözülmüş iki çizginin arasındaysa kart "arası" diyor ve kayıt yapmıyor (önceden en yakın çizginin adını yazıyordu).
- ❑ W = 1.65 mm'de "Bütün çizgileri ölç" 1. mertebede Na D₁'i bulamıyor; düz tepede tepe araması boş dönüyor (`PHYS.autoMeasureB`). 2 mm'de dört çizgi de kaydediliyor.
- ❑ "Na çifti, m = 2" düzeninde kıl çizgisi iki çizginin arasındaki karanlık boşluğa düşüyor; 45.00° iki çizginin de yarı genişliği dışında kaldığı için kart "arası" yerine "çizgi yok" diyor.
- ❑ Otomatik ölçüm sıfır okumasını her zaman kaydettiği için tek yanlı ölçümün hatası (defterdeki −1.07 %) ancak elle kayıtla görülebiliyor.
- ❑ Skaler Fraunhofer kuramı: eğiklik çarpanı ve kutuplanma yok, d < 2λ'da şiddetler nitel; spektrometrede yarık zarfı ve parlatma (blaze) yok.

## kuantum-mekanigi.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: tohumlu üreteçle tek tek gelen elektronlar (Jönsson 1961 düzeni; histogramdan saçak aralığı, görünürlük ve χ², klasik toplamın reddi), yol işaretçisi ve kuantum silgisi (V² + D² ≤ 1), de Broglie dalga boyu (foton, göreli elektron, ısıl nötron, C₆₀, tenis topu; Jönsson, Tonomura ve Arndt düzenleri).
- ✔ Demet örtüşmesi iki sekmede de üç düzeyli: (λL/a)/d ≥ 1 örtüşür, 0.5–1 kısmen, < 0.5 ayrı (önceden 1'in altı "hiç örtüşmez" diyordu). Parçacıklar sekmesi uzak alan formülünün yaklaşık kaldığı düzenleri not ediyor; pencere kartı "saçak aralığı" sayıyor.
- ❑ Kısmi örtüşmede sayfa yalnız uyarıyor; desen uzak alan formülüyle çizilmeyi sürdürüyor (Fresnel hesabı yok). Arndt ızgarası iki yarık olarak modelleniyor; biprizmanın sınırlı örtüşme bölgesi ve tel kenarı saçakları yok.
- ❑ Büyük N'de ölçülen görünürlük gürültüyle 1'i biraz aşabiliyor (1.007 ± 0.006); sayfa belirsizliği gösteriyor, kırpmıyor.
- ❑ Uzak alanda "1. yarık", "2. yarık" ve "sırayla" aynı isabet dizisini veriyor; yakın alandaki ±d/2 kayması modellenmiyor (sayfa açıklıyor).

## elektronik-devre.html (7 Kasım 2026)

- ✔ Yeniden kuruldu (MathJax CDN'i kaldırıldı): RC şarj ve deşarj (τ iki yoldan, enerji bilançosu), kare dalga ve RC filtre (alçak ve yüksek geçiren çıkış, dalgalanma, yükselme süresi, Bode çizimi), seri RLC ve RL basamak yanıtı (aşma, sönümlü periyot, logaritmik azalma, kutuplar).
- ✔ RC tablosu notundaki bozuk cümle ve ısı payı kartındaki düz "W_R/W_E" etiketi düzeltildi.
- ❑ Kare dalgada 100 kHz hazır düzeni 1×'te kararlı duruma ancak yaklaşık 2 dakikada ulaşıyor; hız kendiliğinden seçilebilir. Kararlı durum ilan edildikten sonra dalgalanma birkaç periyot 250.0 mV okuyor (kuram 249.9 mV): `sqEndPeriod` eşiği (1e-5·V₀) gösterim duyarlığından gevşek.
- ❑ "V_R tepesi" V₀ − V_min'den hesaplanıyor, V_R izinden bağımsız ölçülmüyor.
- ❑ RC sekmesinde anahtar çevrildikten sonra V₀ gösterilmiyor ve okumalar 120 ms'de bir yenileniyor; kısmi dolum deneyleri zahmetli ("t = τ'da dur" düğmesi ya da durum satırında V₀).
- ❑ RLC'de %2 yerleşme süresinin ζ'ya bağlılığı grafikte yok; 150 Ω → 160 Ω'daki 574 → 376 µs sıçraması yalnız sayılarla görülüyor. İdeal elemanlar (ESR, sargı direnci, kaynak empedansı yok), paralel RLC yok.

## kara-cisim-isimasi.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: Planck eğrisi (dalga boyu ya da frekans ekseni, Rayleigh–Jeans ve Wien yaklaşımları; tepe ve toplam güç eğriden sayısal ölçülür, aralık dışı tepe için sayı yazılmaz), CIE 1931 tablosuyla kara cisim rengi ve Planck eğrisi, gezegen denge sıcaklığı (Venüs, Dünya, Mars, sera farkı).
- ✔ Dünya'nın Bond albedosu NASA'nın güncel değeri 0.294 (255.1 K, sera farkı +32.9 K); tablodaki NASA değeri 254.0 K eski albedo 0.306 ile hesaplı ve yıldızla nota bağlı. `nssdc.gsfc.nasa.gov` kaynak izin listesine eklendi.
- ❑ Gezegen sekmesinde yalnız albedo değişince gözlenen sıcaklık ve sera farkı kutuları boşalıyor ("yalnız hazır gezegenlerde"); yıldız ve uzaklık bir gezegene uyuyorsa gözlenen değer korunabilir.
- ❑ İmleç kaydırıcısıyla 0–3 µm aralığında 300 nm'ye varsayılandan 340 ok tuşuyla iniliyor; karşılaştırma tablosunda tepe yüksekliği sütunu yok (T⁵ ölçeklemesi elle not edilmeli).
- ❑ Akkor lamba kara cisim olarak modelleniyor (tungsten seçici yayıcıdır, ε < 0.5); durum satırında not yok. Gezegen tayfında 8–13 µm atmosfer penceresi çizilmiyor. Ekran dışı renkler kırpılıyor (çok soğuk cisimler #FF0000).

## nukleer-fizik.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: AME2020'den ölçülmüş 2549 çekirdeğin B/A eğrisi ve Bethe–Weizsäcker formülü (terim dökümü, sihirli sayılarda sapma), N–Z haritası ve izobar kütle parabolleri (β⁻, β⁺ ve EC yönü), fisyon ve füzyon Q değerleri ve iki cisimli son durumda enerji paylaşımı.
- ✔ Formülün yüzde hatası her yerde ölçülen değere göre, (ölçülen − formül)/ölçülen; önceden kart ve durum satırı formüle bölüp grafik ölçülene bölüyordu (²H'de formülün B'si negatif).
- ❑ 3. sekmede gizli paneller (kinetik enerji tablosu, β zinciri kartı) önceki tepkimenin metnini tutuyor; görünmüyor ama `readoutsC` yalnız `hidden`'ı değiştiriyor.
- ❑ 1. sekmede B/A sıralaması yalnız bazı çekirdekler için yazılıyor (⁵⁸Fe'nin ikinciliği yalnız tepe notunda); 2. sekmede "yalnız EC" örneği (¹⁰¹Rh) için hazır düğme yok.
- ❑ Formül katsayıları Rohlf (1994) setinin Wikipedia tablosundan; ağır çekirdeklerde yaklaşık % 0.5–0.7 fazla bağlar. Uyarılmış durumlar, yarı ömürler, α ve fisyon engeli modellenmiyor.

## lorenz-cekici.html (7 Kasım 2026)

- ✔ Yeniden kuruldu (Chart.js, jsPDF ve CDN'ler kaldırıldı): RK4 ile Lorenz sistemi. Çekici sekmesi hacim küçülme hızını, ⟨z⟩'yi ve ⟨xy⟩ = β⟨z⟩ özdeşliğini, kanat değişimlerini ve üç Lyapunov üstelini (Gram–Schmidt bulutu) ölçüyor; kelebek etkisi sekmesi Δ farkla başlayan kopyaları, Benettin λ'yı (0.902 ± 0.004; Sprott 0.9056) ve öngörü ufkunu; harita sekmesi z tepelerinin Lorenz haritasını, sabit noktasını ve 400 sütunluk ileri ve geri ρ taramasını (Hopf eşiği ve kaotik çekicinin alt sınırı).
- ✔ Harita kutuları merkezleriyle değil içlerindeki zₙ ortalamasıyla temsil ediliyor: en küçük |eğim| başlangıca göre 0.79–1.08 arasında oynuyordu ("sağlanıyor" kararı şanstı), şimdi 1.08–1.12. f′(z*) z*'ın çevresindeki tepe çiftlerine uydurulan doğrudan: −2.29 yerine −2.18 (periyodik yörüngeden −2.17).
- ✔ Çekici sekmesi h/2 adımlı bir ikiz hesapla yolun gerçek çözümden kopma anını ölçüyor: (0, 1, 0)'dan t = 30.9, (10, 10, 10)'dan 16.8, uzak başlangıçtan 9.5. Durum satırı ve notlar kopmayı artık yuvarlamaya bağlamıyor; yuvarlama sınırı t ≈ 41.
- ❑ Çekici sekmesi sayfa açılınca koşmaya başlıyor; okur defteri okurken t ilerliyor (defterin deney 1'i önce Duraklat dedirtiyor).
- ❑ ρ = 35'te harita sağ uçta düzleşip dönüyor (|f′| < 1 gerçek); en küçük |eğim| okuması tepelerin o uca ne kadar uğradığına bağlı ve başlangıca göre 0.13 ile 1.13 arasında değişiyor.

## taylor-serisi.html (7 Kasım 2026)

- ✔ Yeniden kuruldu (eski sayfa iki fonksiyon ve tek kaydırıcıydı): polinom yaklaşımı (sekiz fonksiyon; a ± d aralığında ölçülen en büyük hata ve Lagrange sınırı, toleransa inen derece), yakınsaklık yarıçapı (karmaşık düzlemdeki tekilliklerle R ve oran testi), sayıları hesaplamak (e, Leibniz ve Machin ile π, ln 2; sin θ ≈ θ ve sarkaç periyodu için eşik açıları).
- ✔ (b) sekmesinin durum satırı kartla aynı birimi kullanıyor: hata "her derecede" (önce "her terimde") |x − a|/R oranında küçülüyor.

## riemann-toplamlari.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: toplamlar (sol, sağ, orta nokta, yamuk, Simpson, Darboux üst ve alt toplamı; Neumaier telafili toplama), hata ve yakınsama hızı (log–log grafik, eğim uydurma, Euler–Maclaurin öncü terimi, Richardson), Monte Carlo (tohumlu ortalama değer yöntemi, 64 koşuluk RMS, d boyutlu bütçe tablosu).
- ✔ Tablo notundaki yuvarlama eşiği kodla aynı; öncü terim eşiğin altındaysa kart "ölçülemez" diyor (exp(cos x), n ≥ 14). Richardson notu, hatası yamuktan büyükken "0.321 kat daha küçük" yazıyordu; şimdi "3.12 kat daha büyük" (basamak, n = 100). Boyut notu yalnız N<sup>−1/2</sup> hızının d'den bağımsız olduğunu, bağıl yayılımın √(r<sup>d</sup> − 1) ile büyüdüğünü söylüyor.
- ❑ Hata sütununda yazım 10⁻⁴'te sabitten bilimsele geçiyor; −0.000115 ile −1.44·10⁻⁵ aynı sütunda yan yana.
- ❑ Monte Carlo sekmesinde "isabet-ıska" seçeneği yok; π sayfasının yöntemiyle aradaki yaklaşık 3.4 katlık varyans farkı yalnız metinde.

## karmasik-sayilar.html (7 Kasım 2026)

- ✔ Yeniden kuruldu (eski dört kutulu prototip kaldırıldı): düzlemde işlemler (toplama, çarpma, bölme, eşlenik; çarpımın açısı iletkiyle, uzunluğu cetvelle çizimden ölçülür), Euler formülü ve kökler (Euler serisinin sarmalı ve hata sınırı, De Moivre kuvvetleri, n'inci ve birim kökler), düzlemi eğen fonksiyonlar (z², 1/z, eᶻ, Joukowski; küçük karenin görüntüsünden yerel büyütme, dönme, köşe açısı ve alan oranı).
- ✔ Kutulara sırayla yazmak çalışıyor (ara değer kaydırıcıya yuvarlanmıyordu). Kök kipinde "Bütün kökler" kartı her kökü yazıyor; seri tablosu tek indisle (∠(t₁₁, t₁₂) ve |t₁₂|/|t₁₁|; önce biri 1'den, öbürü 0'dan sayıyordu); fonksiyon sekmesinde yarım kenarlar h/2 ve ih/2, görüntüleri Δf₁ ve Δf₂ (u ve v adları f = u + iv yazımıyla çakışıyordu).
- ❑ Sayılar "2 + 1i" biçiminde yazılıyor; katsayı 1 için "i" daha alışılmış.

## normal-dagilim.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: Galton tahtası (tohumlu; binom ve normal dağılımla χ² karşılaştırması, ölçüm çizelgesi), merkezi limit teoremi (dört ana dağılım; çarpıklık ve standart hata), alanlar ve güven aralıkları (Φ'nin sayısal integrali, yüzdelikler, K aralıkla kapsama; σ yerine s kullanmanın bedeli).
- ❑ Galton grafiğinde kutu başına sayı yok; orta kutudaki yaklaşık 226 top yalnız gözle okunuyor.
- ❑ z aralığı ±5'te bitiyor, altı sigma kuyruğu karşılaştırılamıyor. Aralık sayısı K seçeneklerinde 750 yok; Gosset'in 750 × 4 deneyi birebir kurulamıyor.
- ❑ Odak bir düğmedeyken Boşluk o düğmeye basıyor; duraklatma kısayolu yalnız odak düğmede değilken çalışıyor.
- ❑ Öneri: s ile kurulan aralıklarda t* seçeneği (kapsamanın t dağılımıyla % 95'e dönüşünü göstermek için).

## konik-kesitler.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: koniyi kesmek (döndürülebilir çift koni ve kesen düzlem; 720 noktaya genel konik uydurularak ölçülen e, a, b, ℓ ve odaklar; Dandelin küreleri; tepeden geçen düzlemde dejenere kesitler), odak ve doğrultman (PF = e·PD, iki odaklı tanımlar, kutupsal denklem, Dünya ve Halley yörüngeleri aynı ölçekte), yansıma özellikleri (elips, parabol ve hiperbol aynalarında ışın izleme, eşit yol, odaktan kaydırılan kaynak).
- ✔ (a) notu çember yakınındaki farkı doğru veriyor: yalnız tam çemberde 10⁻⁸ düzeyinde, 89°–89.99° arasında 10⁻¹¹'in altında (önce 10⁻⁷ diyordu). Gerçek biçim grafiği koni ekseninin düzlemi deldiği noktayı çarpıyla gösteriyor; bu nokta elipsin merkezinde değil, varsayılan kesitte 0.23 br kayık. (b) notu iki yörüngenin aynı düzlemde çizildiğini, Halley'in yörünge düzleminin ekliptiğe yaklaşık 162° eğik olduğunu söylüyor; PF ve PD ayrı bir kartta.
- ❑ (c) sekmesinde kaynak odaktan kaydırılınca tablo yalnız en kötü ışını gösteriyor; en uzun yol yalnız grafikte okunuyor.

## A4 ajanlarının başka sayfalarda bulduğu sorunlar

- ✔ `rastgele-yuruyus.html` (7 Kasım, A6): ortalama uzaklık artık √n ile değil, sonlu adım sayısındaki kesin değeriyle karşılaştırılıyor. √n ortalama karekök uzaklıktır; düzlemde ortalama uzaklık yaklaşık 0.886√n.
- ✔ `mandelbrot-fraktali.html`, `julia-fraktali.html`: jsPDF yüklenmediği için çalışmayan PDF düğmesi kaldırıldı, çizim sayfa açılınca yapılıyor.
- ✔ `mandelbrot-fraktali.html` (B1, 10 Kasım): −2 ucu görünür; z₀ = 0, sıkı `|z| > 2` kaçış testi, eş ölçekli eksenler ve sonlu yineleme uyarısı eklendi.
- ❑ `matris-donusumleri.html`: özdeğerler boşluksuz yazılıyor ("1.732±1.000i").

## av-avci-lotka-volterra.html (7 Kasım 2026)

- ✔ Yeniden kuruldu (eski parçacıklı "Ekosistem" görünümü kaldırıldı): Lotka–Volterra (RK4, 0.01 yıl; ölçülen periyot ve genlik düzeltmeli T₁, her genlikte kesin döngü ortalamaları, iki türe hasat ve Volterra ilkesi, avcı tepesinin gecikmesi), gerçekçi av–avcı (lojistik av ve Holling II avcı, Rosenzweig–MacArthur: sönümlü yaklaşma, Hopf eşiği, zenginleşme paradoksu), rekabet (dört sonuç sıfır eğrilerinden). Faz görünümü "Faz diyagramı"; α, β, δ, γ kaydırıcıları korundu.
- ✔ (b) "⟨x⟩ ile x*" satırı farkın beklendiğini söylüyor (Holling II döngüsünde ⟨x⟩ > x*; önce +%40 hata gibi okunuyordu). ε kaydırıcısı α gibi 2'ye kadar; ε ≥ α'da kart "iki tür de tükenir" diyor. Durum satırı periyot farkını tabloyla aynı üç ondalıkla yazıyor; gecikme satırı T₀/4 eşitliğinin yalnız küçük genlikte geçerli olduğunu söylüyor. D'Ancona notu "sonradan damadı olacak".
- ❑ (b) sınır döngüsünde periyot "Fark" sütunu doğrusal kestirime göre +%19 (etiket uyarıyor, ama sayı göze batıyor).
- ❑ Taşıma kapasitesi K için tarama ya da çatallanma çizimi yok; zenginleşme paradoksu yalnız tek tek denenerek görülüyor.

## genetik-caprazlama.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: bir ve iki karakter (yavrular tohumlu mayoz ve döllenme benzetimiyle; χ² ve tam p, küçük örneklemde kesin çok terimli test, ölçüm çizelgesi, Mendel'in kendi verisi, 2/3 taşıyıcı sorusu), cinsiyete bağlı kalıtım (X'e bağlı çekinik özellikler ve soy ağacı), bağlı genler ve haritalama (r tahmini, üç nokta çaprazlaması, girişim, Haldane eşlem fonksiyonu). Varsayılan tohumlar 1866, 1910, 1913.
- ✔ Kraliçe Victoria'nın soyundaki hastalık hemofili B (F9; 2009 Romanov DNA'sı); renk körlüğü yaygınlığı iki cinsiyet için "Kuzey Avrupa kökenli insanlarda". Küçük örneklemde kesin test satırı χ² yaklaşımının p'sini de yazıyor (N = 12: 0.182 ↔ kesin 0.316). Durum satırı "Gerçek uzaklık" yerine "Harita uzaklığı"; Doğal Seçilim bağlantısı alel değil renk biçimi oranlarından söz ediyor.
- ❑ ABO yalnız 1. gende, MN yalnız 2. gende seçilebiliyor; sekme başına en çok 100 000 yavru.
- ❑ Sturtevant'ın 1913 konumları sayfada yok (kaynakla doğrulanamadı); üç nokta deneyi kurgusal genlerle.

## ph-indikator.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: pH ölçeği ve su (IAPWS pK<sub>w</sub>(T); 25 °C'de nötr 7.00, 37 °C'de 6.81, 100 °C'de 6.13; 10⁻⁸ M HCl'de tam yük dengesiyle pH 6.976), asit ve baz çözeltileri (tam yük dengesi ile ders kitabı kısayollarının hatası, Ostwald yasası, Davies etkinlik uyarısı, çok protonlu asitlerde tür dağılımı), indikatörler ve renk (iki biçimin soğurma bantları, Beer–Lambert, eş soğurma noktası, CIE 1931 ile renk, gürültülü spektrofotometrik pK<sub>a</sub> ölçümü).
- ✔ Ton adı sınırı 196°: bromtimol mavisi pH 8'den sonra hep "mavi" (pH 10'da "turkuaz"a dönüyordu); kaynak etiketi geçişte "ortası yeşil" diyor ve sınır değerlerinde (ör. tam pH 6.0) "geçiş" yerine dış rengi yazıyor.
- ❑ Renk modeli tek Gauss bandı: metil oranj ve metil kırmızısı asitte pembe (kırmızı olmalı), fenolftalein lila (pembe), bromtimol mavisi pH 7.1'de turkuaz (yeşil). Sayfa kaynak renk adını yanında yazıyor; iki bantlı ya da ölçülmüş tayflar renkleri düzeltir. Varsayılan derişim (20 µmol/L, 1 cm) renkleri soluk gösteriyor.
- ❑ (a) sekmesinde oran kartı [H₃O⁺]/[OH⁻], durum satırı tersini veriyor (37 °C'de 0.418 ile 2.39 ×); ikisi de doğru ama okur karıştırabilir.

## kristal-yapilar.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: birim hücre (yedi yapı döndürülebilir 3B görünümde; hücredeki atom sayısı, komşu kabukları ve doluluk geometriden ölçülür, temas koşulu, örgü ve uzay grubu), düzlemler ve Miller indisleri (düzlem aileleri, aralık ve düzlem yoğunluğu; FCC'de ABC, HCP'de AB istifi), X-ışını kırınımı (Cu ve Mo Kα₁ toz deseni, yapı çarpanı ve sönme kuralları, sin²θ oranlarıyla indisleme, örgü sabiti uydurma; yoğunluk BCC'yi basit kübikten ayırır).
- ✔ HCP katman yoğunluğunda iki sütun aynı formülden geldiği için Fark "—". İkinci komşu kabuğu kartı üçüncü kabuğu da yazıyor (FCC 24 atom, oran 1.7321; ideal HCP 2 atom, oran 1.6330): iki sıkı paketin ilk ayrıldığı kabuk artık sayfada okunuyor.
- ❑ Isıl titreşim (Debye–Waller) çarpanı yok; yüksek açılı çizgiler güçlü (Cu (420) %38.5 > (220) %26.6, W (321) %49.2; sayfa notu söylüyor). `reflections()`'a isteğe bağlı bir B çarpanı eklenebilir.
- ❑ Desen gürültüsüz ve Kα₂ yok: uydurulan a hep "belirsizlik < 0.00001 Å"; gerçekçi bir belirsizlik deneyi kurulamıyor. Kırınım yalnız kübik yapılarda; Ti ve Au kaynak getirilemediği için çıkarıldı.
- ❑ Doluluk çubukları küçükten büyüğe yukarıdan aşağı sıralı; 0.7405 en altta (yazar "en üstte" diye okumuştu).

## denklem-denklestirme.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: gerçek formül ayrıştırıcı (parantez, köşeli parantez, hidrat, iyon yükü), 19 hazır tepkime ve yazılan denklem; atom ve yük sayım tablosu, yükseltgenme basamakları ve aktarılan elektron; bileşim matrisi, BigInt ile adım adım Gauss–Jordan, rank ve çözüm uzayı (C + O₂ → CO + CO₂ iki boyutlu); kütleden mole, sınırlayıcı bileşen, verim, kütle korunumu ve gaz hacmi (IUPAC 2021 atom kütleleri).
- ✔ İç redoks: NH₄NO₃ → N₂O + 2H₂O "Redoks değil" deniyordu (ortalama basamak −3 ile +5'i gizliyor). Bir element bir tarafta formülde birden çok yerde, öbür tarafta tek yerde geçiyorsa sayfa artık iç redoks olabileceğini söylüyor (nötrleşmelerde söylemiyor); basamağı değişen tepkimelerde de ortalamayla sayılan elektronun eksik kalabileceğini yazıyor (2NH₄NO₃ → 2N₂ + O₂ + 4H₂O: 4 değil 10 e⁻). "Fe+3" yazınca hata Fe^3+ yazımını öneriyor; Σν·M kartı "hesap çöker" yerine en küçük tam sayılı çözümü kullandığını söylüyor.
- ❑ Basamaklar formül ortalaması; iç redoks uyarısı yapı bilgisi olmadan sezgisel (CH₃COOH yanmasında da çıkıyor, orada ortalama doğru sonucu verir).
- ❑ "r₁'i katsayılara yaz" sıfırlı bir vektör yazınca rozet "Eksik" (tasarım gereği: o tür tepkimeden düşer).

## kalp-dolasim.html (7 Kasım 2026)

- ✔ Yeniden kuruldu: zamanla değişen elastanslı sol karıncık (Suga–Sagawa, Stergiopulos etkinleşmesi), ideal diyot kapaklar, sabit basınçlı sol kulakçık ve üç elemanlı windkessel; RK4 0.5 ms, kapak olayları ara değerle, değerler periyodik kararlı durumda. Kalp döngüsü (nabız, dolaşım şeması, Wiggers diyagramı, basınç–hacim döngüsü), Frank–Starling ve yük (altı hazır deney, 11 noktalı tarama, diyastolik zaman sabiti = R·C, kompliyans ve nabız basıncı), oksijen taşıma (Severinghaus 1979 eğrisi, Bohr kayması, karbon monoksit, Fick).
- ✔ Birleşik nokta ve üst çizgi (Q̇, V̇O₂, v̄) kayıyor ya da görünmüyordu: Q ve VO₂ düz yazılıyor, karışık venöz v üst çizgi sınıfıyla, gösterim notta sözle açıklanıyor. 110–150 atım/dk durum satırı atım hacminin önce ard yük yüzünden düştüğünü (etkin atardamar elastansı nabızla büyür, ESV 49.6 → 61.9 mL) ve dolumun ancak yaklaşık 130 atım/dk üstünde kısaldığını o anki EDV ile yazıyor (120'de 118.6, 150'de 99.9 mL).
- ❑ İzovolümik kasılma 0.094 s (Guyton & Hall 0.02–0.03 s; sayfa söylüyor); etkinleşme başlangıcı kaydırılarak kısaltılabilir.
- ❑ Dikrotik çentik yok (kapak kapanışındaki geri akış ve kanın eylemsizliği modelde yok); eylemsizlikli dört elemanlı windkessel Wiggers diyagramına ekler. Kuvvet–frekans (Bowditch merdiveni) etkisi de yok.
- ❑ "Kompliyans kestirimi SV/PP" satırının son basamağı tıklama yoluna bağlı (değer 5.205 % yuvarlama sınırında); kararlılık eşiği sıkılaştırılabilir.
- ❑ Refleks, kulakçık kasılması, sağ kalp ve kapak hastalığı yok; 150 atım/dk üstünde kırmızı uyarı. Fick çıktısı kütle dengesi gereği girdiye eşit (sayfa söylüyor).

## A5'te başka sayfalarda bulunan ve düzeltilen sorunlar

- ✔ Harf üstü birleşik işaretler (U+0302 şapka, U+0304 üst çizgi, U+0307 nokta, U+20D7 ok) Outfit ve Fraunces'te harfin yanına kayıyor, görünmüyor ya da kutu çıkıyordu. Kalp sayfasında Q̇ "Q`" gibi görünüyordu; momentum sayfasındaki 19 vektör oku boş kutuydu; genetikte r̂, kara cisim ve üretim planlamada x̄ ile X̄, akışkanlarda v̄, klasik girişimde λ̄ kayıktı; üç defterde (alternatif akım V̂, genetik r̂, otonom araçlar x̂) aynısı. `shared/theme.css`'e `.ov`, `.hat` ve `.vec` sınıfları eklendi, yerler bunlara çevrildi; check-site defterlerde birleşik işareti hata sayıyor (33af3a4). Karmaşık sayılardaki z̄ ve bozunmadaki √N̄ Outfit'te düzgün olduğu için kaldı.

## A6 laboratuvarları (7 Kasım 2026)

Altı sayfa yeniden kuruldu ve altı defter de doğrulayıcıdan geçti (birim çember 8, π 7→9, rastgele yürüyüş 8→9, asal sayılar 7→9, Lissajous 8, Pisagor 7).

- ✔ `birim-cember.html`: çember, dalgalar ve faz, CORDIC. Varsayılan açı 30°. 180° ve 270° düğmeleri eklendi. 15°'nin katına yuvarlama |θ − 15k| < 10⁻⁸° (mesajla aynı). CORDIC hatası tek açıda her adımda yarıya inmez; 300 açıda ortalama adım başına bir bit.
- ✔ `rastgele-yuruyus.html`: ⟨r²⟩ = n, ortalama uzaklık kesin sonlu-n değeriyle. Geri dönüş sekmesi 1 − π/ln N yerine kesin değeri ve 1 − π/(ln N + γ + ln 8) kullanır (N = 1000'de kaba formül %54.5, kesin %67.8). p = 0.6 hazırı varsayılan tohumda "sınırda" (aynı rastgele sayıları yeniden kullanır).
- ❑ `pi-yaklasimi.html`: yarış tablosunda aynı hata bir hücrede −1.00·10⁻³, kuram hücresinde −0.00100 (`sig` yalnız 10⁻³ altında bilimsele geçer). Basamak paneli yalnız ilk yanlış basamağı boyar; sonradan yine π ile tutan basamaklar düz kalır. 32 bit üreteç en çok 2³¹ noktada tekrarlar. Tohum 1777, 10⁶ noktada şanslıdır (tipik doğruluk yaklaşık 2.8 basamak). Saf kenar ikileme 28. adımdan sonra 0 verir.
- ✔ `asal-rsa.html`: φ(n)/4 sınırı yalnız 9'dan büyük tek bileşik sayılarda yazılıyor (9'da 2 güçlü yalancı vardır). Tarama kartı ve grafik noktaları rho yinelemelerini aynı sayar. 561'in durum satırı "önemsiz olmayan karekök" diyor.
- ❑ `lissajous.html`: varsayılan Verlet (adım 0.01 s) 3:2 kaplamasını 200 s'de %15.04'ten %16.46'ya sürükler (frekans hatası +2.08·10⁻⁵); RK4 %15.04'te kalır, sayfa söylüyor. Yaklaşık 450'den çok kendini kesme sayılmaz, kuramsal sayı yazılır.
- ✔ `pisagor.html`: rastgelelik yok. Yaklaşık 10 km'nin altındaki üçgenlerde küçük üçgen yaklaşımının artığı çift duyarlıkta çözünmez; durum satırı bunu yazar. Oktant 8.5 % sapmayı yazar ama kırmızıya dönmez; 3000 × 4000 km'lik üçgen döner. P(10⁷) = 1 591 579, oran 1.00002 (sayfa 10⁷'yi göstermez). Küre tam küredir.

## A7 kapanışı — 10 Kasım 2026

- ✔ `pascal-ucgeni.html`: çalışmayan PDF ve biriken animasyon zamanlayıcısı
  kaldırıldı. BigInt katsayıları ve satır toplamları, tohumlu binom deneyi,
  asal modüllerde kalan deseni ve Lucas sayımı eklendi. Satır numarası n ile
  çizilen satır sayısı R ayrı tanımlandı; örneklem varyansı M'ye bölünür.
- ✔ `collatz.html`: Number kesinlik kaybı, kesri sessizce kesme ve sınırsız
  döngü giderildi. BigInt, girdi/adım/bit sınırları, doğrusal/log grafik,
  ilk altına iniş ile toplam durma süresi ayrımı ve iptal edilebilir tarama
  var. Sınırda kalan başlangıçlar karşı örnek veya tamamlanmış ölçüm sayılmaz.
- ✔ `molekul.html`: hatalı etan bağlantısı, açılarıyla uyuşmayan yapılar ve
  fiziksel olmayan ölçek animasyonu yerine kaynaklı altı yapı, yaklaşık
  H₂/D₂ Morse modeli ve dipol vektörleri geldi. Gerçek kuantum molekülü ile
  klasik model; Dₑ ile D₀; ölçülen su dipolü ile oyuncak bağ okları ayrıldı.
- ✔ `mantik-kapilari.html`: yedi kapı, bütün doğruluk tabloları, De Morgan
  karşı örnekleri, yarım/tam toplayıcı ve dört bit taşıma zinciri eklendi.
  NOT'ta ikinci giriş kullanılmıyor; devreler ideal ve gecikmesizdir.
- ✔ `besin-agi.html`: her seçimin bütün ağı vurgulaması ve gerekçesiz
  beslenme ilişkileri kaldırıldı. Açıkça varsayımsal yönlü ağ; bağımsız
  üretim/verim bütçesi; nüfus tahmini yapmayan kaynak erişimi deneyi var.
  Üç bütçe formülünde ayraç ile çarpma işareti karışıklığı giderildi.
- ✔ Görsel QA: Pascal/Collatz/besin ağında ortak tema kurallarının seçili
  sekmeyi örtmesi; besin ağında tuval yüksekliğinin mobilde düşüp düğümleri
  üst üste getirmesi giderildi. Molekülde de tuval yüksekliği ve açık tema
  kontrastı düzeltildi.
- ✔ Beş yeni defter bağımsız doğrulayıcı/editörden geçti. Eski beş defterin
  gelen bağlantıları yeni kontrollere uyarlandı. `npm run test:a7`, beş
  laboratuvarın gerçek kontrollerini iki görünümde kullanarak 136 referans
  kontrolünü çalıştırır; kaynak/arazi doğrulamasının yerini tutmaz.


## B1 ve girişsiz kullanım — 10 Kasım 2026

- ✔ `mandelbrot-fraktali.html`: parametre haritası, tek yörünge ve gerçek
  eksen deneyi. Eski z₀ = c kayması ve `|z| = 2` kaçış hatası giderildi.
  c = 1 üçüncü adımda kaçar, c = −2 için 0 → −2 → 2 → 2; c = 0,2501
  ancak 312. adımda kaçar. Bütçede kaçmayan nokta üyelik kanıtı sayılmaz.
- ✔ `julia-fraktali.html`: sabit c altında z₀ haritası, yörünge ve kritik
  nokta deneyi. Genel z₀ için R = max(2, |c|) kullanılır; c = −6, z₀ = 3
  sabit yörüngesi yanlışlıkla kaçmış sayılmaz. c = 0 için sayısal normun
  1'e yuvarlanması sınır üyeliği sertifikası üretmez; küçük girdiler korunur.
- ✔ `koch-kar-tanesi.html`: dışa dönük doğru yapım, gerçek köşelerden çevre
  ve alan, geometrik serinin hata hedefi, sonlu çizimde hizalı ölçek deneyi.
  n = 2, a = 9 cm için çevre 48 cm ve alan 51,9615 cm²; %0,1 limit alanı
  hatası için en küçük n = 8. Ölçek deneyi kutu sayımı veya Hausdorff
  boyutu ölçümü diye sunulmaz; çizimin alt ölçeğinde üs 1'e döner.
- ✔ `hilbert-egrisi.html`: hücre merkezlerini izleme, uzunluk/örtme sınırı,
  Hilbert–satır–Morton sıralaması. n = 3 için 64 farklı hücre, 63 komşu
  adım; L = 10 cm için yol 78,75 cm. Komşu hücrelerde sıra farkı 53
  olabilir. r = √2 L / (2·2ⁿ) bir üst sınırdır; yolun gerçek en uzak
  mesafesi olarak sunulmaz. Sonlu yolun alanı 0, sürekli örten limitin
  görüntüsünün alanı L²; yalnız uzunluğun artması örtenliği kanıtlamaz.
- ✔ Dört defter bağımsız doğrulama/editörden geçti. İki eski defterin
  Mandelbrot bağlantı deneyleri yeni kontrollere uyarlandı. Hilbert'in
  kuramsal kaynağı MIT Yufei Zhao §9.6; yerellik uygulamalarıyla ilgili
  iddiaları sorunlu olan Kanungo ön baskısı kaynaklardan çıkarıldı.
- ✔ Giriş formu, hesap tabanlı yönlendirmeler, açık metin hesap dosyası,
  kişisel etkinlik paneli ve Firebase okuma/yazma kodu kaldırıldı. Eski
  oturum anahtarları temizlenir; depolama kapalıyken de içerik açılır.
  Rekorlar yeni anonim cihaz anahtarına yazılır. Küçük skorun daha iyi
  olduğu oyunlarda 0 geçerli rekor sayılır; eski hesap kayıtları taşınmaz.
- Kapsam sınırı: geçmiş Git commit'leri ve uzak Firebase verileri yeniden
  yazılmadı/silinmedi. Kullanıcı Doğukan fotoğraflarını korumayı istedi;
  bu tur diğer depoya veya fotoğraflara dokunulmadı.


## B2 — Penrose, Barnsley ve üç limit deneyi (10 Kasım 2026)

- ✔ `penrose-dosemesi.html`: üst üste konmuş iki dörtgen yerine yönlü
  Robinson altbölünmesi, tek üçgende alan/kenar deneyi ve işaretsiz
  dörtgenlerden periyodik karşı örnek kuruldu. On A üçgeninden n = 5'te
  340 A + 550 B; n = 7'de 2.330 A + 3.770 B çıkar. Ortak tabandan
  birleştirilen tam dörtgenler ve sınır yarımları ayrı sayılır; yakınlaştırma
  sayımları değiştirmez. İrrasyonel sıklık yalnız iki yönlü periyodik örgüyü
  doğrudan dışlar; hiçbir öteleme periyodu olmaması ayrıca Penrose eşleme
  teoremine dayanır. Sonlu yama teoremin kanıtı gibi sunulmaz.
- ✔ `barnsley-egreltiotu.html`: dört doğru afin dönüşüm; tohumlu üretim,
  ilk 100 adımı atma, aynı tohumda N artırılınca öneki koruma; geometri ve
  olasılık sekmeleri eklendi. |det A| alan, en büyük tekil değer uzaklık
  çarpanıdır. diag(2; 0,2) karşı örneği, alan küçülmesinin kontraksiyon
  olmadığını gösterir ve eğreltiotu üretimine katılmaz. Pozitif olasılıklar
  desteği korur, dağılımı değiştirir; sıfır olasılıkta bu garanti kalkar.
  Durağan ortalama doğrusal denklemle bulunur; ardışık noktalar bağımlı
  olduğundan bağımsız örnek hata çubuğu gösterilmez. Tek f₂ sabit noktası
  (640/241; 2400/241)'dir. Model doğal yaprağın biyolojisi değildir.
- ✔ `sierpinski-fraktali-peano-egrisi-altin-oran.html`: üç yanlış/ilişkisiz
  3B animasyon yerine üç bağımsız limit deneyi. Sierpiński'de köşelerden
  alan/çevre toplamı, n ve fiziksel ölçek ayrı; dış çerçevenin çevresi
  3a sabit, bütün kenarların toplamı 3a(3/2)ⁿ. Eski altı alt parçalı
  kopuk 'Peano' yerine gerçek 3×3 yansımalı sıra; n = 1..4'te her hücre
  tek kez ziyaret edilir, bütün ardışık çiftler kenar komşusudur. %100
  hücre örtüsü çizginin alanı değildir. Altın oran sekmesinde pozitif
  rₙ₊₁ = 1 + 1/rₙ, işaretli hata, denklem kalanı ve ilk hata hedefi var;
  r₀ = 0,2 ilk adımda 6'ya gider, hata önce büyüyebilir.
- ✔ Üç sayfada dış çizim kütüphanesi ve sürekli boş animasyon kaldırıldı;
  çizimler tema/boyut/denetim değişince yenilenir. Bütün kontroller etiketli,
  mobil düzenler ve her sekmenin bağımsız sıfırlaması var.
- ✔ `test:b2`, gerçek HTML çekirdeklerini bağımsız geometrik/rasyonel
  referanslarla sınar: 3.848 kontrol. Penrose çocuklarının içeride kalması
  ve içlerinin örtüşmemesi; Peano'nun komşuluğu ve düzeyler arası blok
  sırası; Barnsley'nin alanı, uzaklık çarpanı ve durağan ortalamaları;
  altın oranda 57 başlangıç ve ilk hata hedefleri dahildir. Bu kontroller
  sonsuz kümeler hakkındaki teoremlerin yerine geçmez.
- ✔ Ajan istemlerindeki eski oturum enjekte etme talimatı B1'in girişsiz
  yapısına uyarlandı. Dört mevcut defterin sonraki durakları yeni
  laboratuvarların gerçek içerikleriyle eşleştirildi.
- ✔ Üç yeni defter bağımsız yazar ve doğrulayıcı/editörden geçti. İnceleme
  sırasında Penrose'da tür sıklığı/sayı oranı, Barnsley'de tekil matris ve
  ideal Markov süreci koşulları, Peano'da bire bir olmayan harita anlatımı
  netleştirildi. Mobil son denetim: üç sayfa, dokuz sekme, görünür üç defter;
  JS/konsol/istek hatası ve yatay taşma yok. B2 statik denetimi 0 hata/uyarı.

- ✔ Canlı son görsel kontrolde Üç Yapım sekmelerinin seçili durumunu
  bastıran ortak düğme stili bulundu. Üç sekmeye mevcut `app-btn-ghost`
  sınıfı eklendi; vurgu çerçevesi/alt çizgi her iki temada doğrulandı.
  Mobil üç sekme ve defter tekrar hatasız geçti.


## B3 — Lorenz, harita–akış, Fibonacci ve Pascal (10 Kasım 2026)

- ✔ `lorenz-cekici2.html`: dış 3B kütüphaneye bağlı eski animasyon yerine
  faz uzayı/kesit/yakınsama deneyleri. Kamera yalnız görünümü değiştirir;
  x-y, x-z ve y-z izdüşümleri aynı yörüngedendir. z=c kesitinde yön ve
  geçiş türevi denetlenir, doğrusal ara değerleme hatası açıkça belirtilir.
  İlk geçişleri atmak istatistiksel yakınsama kanıtı değildir; xₙ→xₙ₊₁
  grafiği iki koordinatlı kesitin yalnız izdüşümüdür. Euler/RK4 için h,
  h/2,h/4 ve ince referans; özel eksende gerçek üstel hata kontrolü var.
- ✔ `mandelbrot+lorenz.html`: Mandelbrot resminin üstüne sinüsle bozulan
  Lorenz noktaları bindiren sahne kaldırıldı. Aynı gerçek c altında kritik
  0 ve serbest karmaşık başlangıç ayrı izlenir. c=−2'de |z|=2 kaçış
  değildir; c=0,26'da N20 kaçışı göremez, N100 ilk n30'u bulur. Lorenz
  türevi, tek Euler tahmini ve kısa RK4 akışı ayrı; 64/128 farkı kesin hata
  sınırı sayılmaz. c0 haritasının kuvvet çözümü ve x=y=0 Lorenz ekseninin
  üstel çözümü kendi koşullarıyla verilir; n ve t fiziksel olarak eşlenmez.
- ✔ `fibo.html`: kareler gerçek köşelerle bitişik ve örtüşmesiz yerleşir;
  geometrik alan, dış çevre ve yay uzunluğu ayrı hesaplanır. n0…500 alan
  özdeşliği BigInt ile tam sayılıdır; bu aralıkta 500 kare çizildiği iddia
  edilmez. Çeyrek çemberlerin gerçek uçları ve teğetleri birleşir ama
  yarıçap değiştiğinde eğrilik sıçrar. Logaritmik karşılaştırma başlangıç
  eğriliğini eşler; uzamsal hizalama veya en iyi uyum iddiası yoktur.
- ✔ `fibo+pascal.html`: salınan Pascal küreleri yerine gerçek hücreler,
  sığ köşegen ve şerit döşemeleri. k domino için C(n−k,k) gerekçesi
  taş sayısından çıkar; Tₙ=Fₙ₊₁ indis kayması ve tek boş döşeme açık.
  Renkli sayım ΣC(n−k,k)tᵏ ile ayrı yineleme karşılaştırılır. t renk
  adedi, G biçimsel seri; ortalama k eş olasılıklı renkli döşeme modeline
  aittir. Grafikteki yaklaşık yüzdeler deneysel frekans değildir.
- ✔ Dört sayfanın üçer sekmesinde bağımsız sıfırlama, klavye erişimi,
  etiketli denetim, mobil düzen ve Canvas'a eşdeğer sayısal tablolar var.
  CDN ve sürekli boş animasyon kaldırıldı. Kurucu görsel kontrollerinde
  Fibonacci/Pascal büyük sayı taşması, açık tema döşeme etiketi kontrastı,
  Lorenz grafik kenar etiketleri ve haritada tam sayı n ekseni düzeltildi.
- ✔ `test:b3`: 24.128 kalıcı kontrol. Taylor referansları üretimdeki RK4'ü
  tekrar etmez; 24.mertebe/h=.01 ile 32.mertebe/h=.005 sonuç farkı 16 kısa
  örnekte 6,7×10⁻³⁰'dan küçük. İki yüksek hassasiyetli hesabın bu uyumu
  sertifikalı hata sınırı diye sunulmuyor. Diğer bağımsız referanslar hızlı
  Fibonacci ikiye katlaması, Pascal toplama tablosu, domino bit maskeleri
  ve doğrudan geometrik ölçümlerdir.
- ✔ Eski `lorenz-cekici` HTML/defteri hedefli incelendi: örneklenmiş tepe
  eğimleri, kesin 1B indirgeme ve bütün periyodik yörüngeler için kanıt
  değildir. h/h2 ayrışması gerçek hata ölçümü değil; evrensel t≈40 sınırı
  ve koşulsuz istatistik eşitliği kaldırıldı. Denge/özel eksen istisnaları,
  sonlu Lyapunov kestirimi ve uzun zaman özdeşlikleri açıklığa kavuştu.
  Bu çalışma eski sayfanın diğer parametre taraması iddialarının yeniden
  tam doğrulaması değildir. Yeni Lorenz sayfalarına bağlantılar eklendi.

## B4 — Hücrelerden sonlu farklara ve sonsuz seriye (10 Kasım 2026)

- ✔ Üç eski tek-sayı tablosu birbirini tamamlayan dokuz deneye dönüştürüldü.
  Sayfalar ilk açılışta hesaplanır; sonsuz satır üretimi, durdurulamayan
  zamanlayıcılar ve Chart.js/jsPDF CDN bağımlılıkları kaldırıldı.
- ✔ `tek-sayi-toplam3.html`: L katmanları gerçek birim hücrelerden oluşur.
  Köşesinden m² çıkarılmış n² kare, aynı kimlikli hücrelerle (n+m)×(n−m)
  dikdörtgenine taşınır; sayısal eşleme tablosu, boşluk/örtüşme sayımı var.
  n=m boş eşleme, m=0 bütün kare olarak ele alınır. Bütçeden kareye
  deneyinde 120 rakama kadar tam sayı ve tamsayı karekökü kullanılır;
  n²≤L<(n+1)² sertifikası, kalan, yeni katmanın maliyeti ve eksik hücre
  ayrı gösterilir. Büyük hesaplarda çizim sınırı açık; negatif/ondalık/üs
  girdileri sessizce tam sayıya dönüştürülmez.
- ✔ `tek-sayi-toplam4.html`: n²/n³ dizilerinde ileri, geri ve ikinci
  ileri farkın indisleri ayrıldı. Gösterilen pencerenin dışı null;
  bunu polinomun tanımsız olmasıyla karıştırmayan açıklamalar var.
  İşaretli aritmetik diziler ters sıra ile eşlenir; tek sayıda terim için
  ortadaki terim iki kopyada da sayılır, boş dizinin ortalaması yoktur.
  2x için orta nokta toplamı her n'de tamdır; x² karşı örneğinde
  hata −L³/(12n²) ve bölüm sayısını ikiye katlama gözlemlenir.
  Bağımsız sol/orta/sağ toplamlar ile analitik integral karşılaştırılır.
- ✔ `tek-sayi-toplam5.html`: Aₙ=Σ(2k−1)rᵏ⁻¹ sonlu polinomu ve r<1
  sonsuz toplamı ayrıldı. r≥1'de sonlu deney çalışır, sonsuz limit/kalan
  verilmez. Pozitif kuyruk G−A çıkarımıyla hesaplanmadığından yakın
  sayılar birbirini götürmez. İlk uygun N, önceki başarısız değerle
  gösterilir; arama sınırı yetmezse sonuç uydurulmaz. Geometrik modelde
  olasılık kütlesi, ortalamaya sonlu katkı ve koşullu ortalama ayrı;
  N=0'da sıfır olasılığa bölünmez. Bu bir teorik modeldir, rastgele
  örnekleme değildir. Çift duyarlık ve çok küçük terimler açıklanır.
- ✔ Bozuk PDF düğmesi yerine seçili sekmenin ayarlarını, okumalarını ve
  tam tablosunu içeren tarayıcı yazdırma raporu var. Üç varsayılan rapor
  ve 300 terimli, 11 sayfalık stres raporu üretildi; Poppler görüntüleri
  incelendi. Devam sayfalarında tablo başlıkları tekrarlanır.
- ✔ `test:b4`: gerçek HTML çekirdeklerinde 53.791 kalıcı kontrol.
  Referanslar doğrudan hücre kümeleri ve uzaklıklar, karekök eşitsizliği,
  açılmış fark polinomları, kuvvet toplamları ve BigInt ortak paydalı
  rasyonel seri toplamlarıdır. İlk uygun N, logaritma veya kayan nokta
  bölmesi kullanmadan tamsayı eşitsizliğiyle bağımsız bulunur.

## C — Ses, renk, şifreleme ve algoritmalar (10 Kasım 2026)

- ✔ `fourier-ses`: beş harmonikten normalize dalga, kontrollü DFT/örnekleme
  ve gerçek Web Audio analizörü ayrı deneyler. Canlı tepe, gruplanmış bir
  sütunun sol ucundan değil gerçek FFT kutusundan okunur. Dikdörtgen/Hann
  ile canlı Blackman penceresi ve normalleştirmeler birbirine karıştırılmaz.
  Sıfır/Nyquist sinüsü, katlanma, sızıntı ve kutu aralığının sınırları açık.
  İlk harmonik sıfırken 1/f₀ zorunlu en küçük periyot sayılmaz; referans
  periyodu denir. Durdur eski ölçüm okumalarını da temizler.
- ✔ `ses-sentezleyici`: gerçek doğrusal ADSR otomasyonu, erken bırakma,
  alçak geçiren biquad ve eşit tamperaman notaları. Web Audio lowpass Q
  parametresinin dB birimi hesaba katılır. Zarfın örnekleri ve filtreden
  önce/sonra kaydedilen RMS, OfflineAudioContext ile kuramla karşılaştırılır.
  Canlı grafik gerçek cihaz örnekleme hızını kullanır; çevrimdışı ölçüm
  48 kHz'dir. Eski kaynağın bitiş olayı yeni notayı kapatamaz.
- ✔ İki ses sayfası açılışta AudioContext oluşturmaz. Ses açık eylemle
  başlar; sekme, ayar, Escape, ortak sessiz tercih, gizlenme ve sayfadan
  ayrılma temizliği var. Gecikmiş mikrofon sonucunda iptal edilen akışın
  track'leri kapatılır. Kök tarayıcı kontrolü bu yarışı Web Audio'dan
  üretilmiş gerçek MediaStream ve kontrollü izin yanıtlarıyla sınadı;
  fiziksel mikrofon veya hoparlörden dinleme testi yapılmış sayılmaz.
- ✔ `renk-teorisi`: HSV artık yeniden etiketlenmiş HSL değildir. Kanonik
  renk kayan noktalı sRGB'de kalır; gösterim değişimi rengi yuvarlamaz,
  kaydırıcı DOM'u yeniden kurulmaz. Kod/lineer ışık karışımı ve ideal
  RGB ışıkları/CMY filtreleri ayrı; boya veya yazıcı benzetimi iddiası yok.
  Gri ton açısı tanımsız, luminans ile HSL L/HSV V farklı, HEX gösterimi
  yuvarlanmış ve Y hesabı yuvarlanmamış değerlerdir.
- ✔ `sezar-sifre`: açık 26/29 harfli alfabeler, I/ı ve İ/i ayrımı, NFC ve
  isteğe bağlı kayıplı sadeleştirme. Şifreleme/çözme harf izi seçili işlem
  yönünde hesaplanır. Bütün anahtarlar (0 dahil) denenir; dil kararı
  uydurulmaz. Frekans/çakışma oranı sayılır, N<2 tanımsızdır.
  Bağımsız incelemede B+akut gibi işaretli kümelerin kaydırıldıktan sonra
  yeniden NFC'de birleşip ters çözümü bozduğu bulundu. NFC sonrası artık
  birleştirici işaret taşıyan kümeler kaydırma/sadeleştirme/sayımda tek
  parça alfabe dışı tutulur; hazırlama idempotansı ve frekans korunumu
  genişletilmiş regresyonla doğrulandı.
  NFC'nin karakter sayısını artırabildiği ikinci sınır bulgusunda 500 kod
  noktası sınırı normalleştirme sonrasına taşındı. Üç deney uzunluk
  hatasını görünür mesajla karşılar, eski sonuçları temizler ve geçerli
  metin girilince yeniden çalışır; beklenmeyen program hataları yutulmaz.
- ✔ `enigma-makinesi`: I–V rotorları, B/C yansıtıcı, halka/pencere ve
  fiş tahtası. Akımdan önce mekanik adım, gerçek çift adım, ileri/geri
  elektrik yolu ve sabit eşlemenin tersinirliği ayrı deneylerdir. Eski
  kilometre sayacı ilerleyişi kaldırıldı; no-self özelliği çözme algoritması
  diye sunulmaz. Tarihsel mesaj ve Hamer/Tony Sale örnekleri referanstır.
- ✔ `siralama-algoritmalari`: aynı başlangıç, etiketli eşit anahtarlar,
  gerçek işlem izi ve ayrı sıralı/kesinleşmiş bölgeler. Komşu takaslı
  ekleme ve kabarcık kararlı; seçim için 2A,2B,1C karşı örneği var.
- ✔ `siralama-yarisi`: Bubble/son-pivot Quick/Merge aynı dizinin kopyasını
  işler. Karşılaştırma, ana dizi yazması ve tampon yazması ayrı sayaçlar;
  ortak iş bütçesi CPU süresi değildir. Bitişte hazır sort ile sonucu
  değiştirme kaldırıldı; merge tamponları ve ana dizinin ara durumu açık.
- ✔ `yol-bulma-algoritmalari`: dört yönlü ızgarada 1/5 hücre giriş bedeli,
  BFS en az adım, Dijkstra/A* en az maliyet. Manhattan alt sınırı ve
  tutarlılık koşulu açıklanır. Kuyruk/kenar/sezgi işi ayrı; erişilmez yol
  null, başlangıç=hedef 0 adım/0 maliyet. Sürüklemenin klavye ve satır/sütun
  menüsü eşdeğerleri var; aynı harita korunarak yöntem karşılaştırılır.
- ✔ `test:c`: 22 çekirdek + 4 tarayıcı kripto senaryosu, 86.345 algoritma kontrolü,
  gerçek tarayıcı dahil 41.871 ses/renk kontrolü. Referanslar yayımlanmış
  şifreli mesajlar, küçük girdi uzayları, bağımsız Bellman–Ford, birim
  kenarlı arama, Parseval, Butterworth dönüşümü ve Python colorsys'tir.
  Kök ek kontrolünde 435 HSL örneği tarayıcının yerel Canvas dönüşümüyle
  en çok 1 kod düzeyi farklıydı; dokuz çevrimdışı filtre deneyi bağımsız
  kuramdan en çok 1,3×10⁻⁸ ayrıldı. Bunlar sınanan modellerin regresyonudur.

## F1 — Elektrostatik, basit makineler ve statik (10 Kasım 2026)

- ✔ `elektrostatik`: üç yeni deney; iki noktasal yükün vektörel alanı,
  potansiyeli ve test yüküne kuvveti; dipolde analitik alan ile merkezi
  farkla −grad V; küresel kabuk/hacim yükünde E, V, Q_iç ve akı. Kaynakta
  sonlu bir değer uydurulmaz. Sıfır kaynak hesap dışında, fakat tanımsız
  alanda sıfır test yükü için de kuvvet değeri üretilmez. Kabuk yüzeyinde
  farklı E limitleri ve sürekli V ayrı gösterilir.
- ✔ Gauss sekmesinin orta nokta toplamı, önceden küresel simetri/Gauss
  kullanılarak bulunan alanı entegre eder; bağımsız yasa kanıtı diye
  sunulmaz. Ağ hatası ile yüzey alanı yaklaşımının ilişkisi görünür.
  Ayrı regresyonda gerçek noktasal alan, merkez dışı bir kürede
  Gauss–Legendre yöntemiyle entegre edildi; dış yükün net akıya katkısı,
  kapalı yol işi ve ayrık yüklerden küre kabuğu toplamı ayrıca sınandı.
  Hacim yükü simgeleri kesitin içine, kabuk simgeleri yalnız yüzeye konur.
- ✔ `basit-makineler`: palanga, eğik düzlem, çark–mil ve tek ağızlı vida.
  Geometrik kuvvet oranı, uygulanan kuvvet, giriş yolu, yükselme, yararlı
  iş ve kayıp birlikte hesaplanır. Palanga/çark/vida toplam η modeli ile
  eğik düzlemin kinetik Coulomb sürtünmesi aynı yasa diye sunulmaz.
  Sıfır işte iş verimi, sıfır yükte kuvvet oranı tanımsızdır. Sürtünmeli
  yatay yolda pozitif giriş işi ve sıfır yükseltme işi için verim 0'dır.
- ✔ Çarkın R ve milin r kontrolünün aynı ID'ye dönüşmesi gerçek tarayıcı
  testinde yakalandı; `wheelRadius` ve `wheelAxle` ayrıldı. θ=90°'de
  sıfır normal kuvvet, m=0'da sıfır kuvvetler oklarla varmış gibi çizilmez.
  Dar/gizli canvas ResizeObserver yarışında negatif yarıçap önlendi;
  yeniden görünür olduğunda çizim yenilenir. Bunlar kalıcı UI testindedir.
  Vida çiziminde sabit somun tabana yan desteklerle bağlıdır; şaftın
  ilerlemesi ve kolun teğet kuvveti ayrı görünümlerde açıklanır.
- ✔ `statik`: doğrusal yayılı yükün integrali/bileşkesi ve etki noktası;
  kiriş dış tepkileri ve temas koşulu; üç çubuk kafeste düğüm vektörleri;
  beş mesnet düzeninde rank, yük uyumluluğu ve tepki aileleri. Yayılı
  yükün tek kuvvete indirgenmesi iç kesme/moment dağılımını korumaz.
  Negatif tepki yalnız iki yönlü bağlantıda mümkündür; yalnız iten temas
  için aynı sayı gerçek kuvvet diye sunulmaz.
- ✔ Kafeste h=0 ilk mertebe tekilliği, sonlu hareket veya ikinci mertebe
  rijitlik hükmüyle karıştırılmaz. Yükle uyumsuz tekil sistemde kuvvet
  tablosu temizlenir; sonsuz kuvvet bir çözüm sayılmaz. Üç paralel tepki
  rank 2 olabilir; pim+pim rank 3 olsa da dört tepki tek başına statikten
  belirlenmez. λ yalnız denge ailesinden bir üye seçer; elastik çözüm
  değildir. Mukavemet/sehim/burkulma bu modellerin kapsamında değildir.
- ✔ Üç saf hesap API'si salt okunur ve dondurulmuştur. `test:f1`, gerçek
  HTML çekirdeklerini bağımsız integral, vektör dengesi, iş/tork bütçesi
  ve sınır durumlarıyla; ardından gerçek Chromium kontrolleriyle sınar.
  Çekirdek/API denetimi ile fiziksel donanım ölçümü aynı şey değildir.
- ✔ Ortak `npm run test:f1` kapanışı: elektrostatikte 22 model senaryosu
  ve 74 UI kontrolü; basit makinelerde 17.801 hesap + 28 UI; statikte
  9.803 hesap + 35 UI geçti. `test:public` 35 girişsiz erişim kontrolünden
  hatasız geçti. Kontrol adetleri genel doğruluk ispatı olarak sunulmaz.

## 10 Kasım 2026 — F2: mukavemet, çelik, hidrolik ve boru–pompa

- ✔ `mukavemet`: eksenel çubukta gerilme/birim uzama ve yükleme işi;
  basit mesnetli kirişte merkezî P veya düzgün q, V/M, dikdörtgen kesitin
  yönü ve sehim; ideal uç koşullarıyla Euler kolon. Kirişin kapalı formu
  eğriliğin sayısal çift integraliyle, Euler sonucu eşdeğer mafsallı
  kolonun sonlu fark özdeğeriyle karşılaştırılır. Gerçek uçların ayrı
  sayısal çözümü veya fiziksel ölçüm diye sunulmaz. Seçilen doğrusal
  gerilme eşiği malzeme sertifikası değildir; aşılınca elastik uzantı
  işaretlenir. Küçük şekil değiştirme/kayma ihmali koşulları açık.
- ✔ Mukavemet QA: mobil canvas yüksekliği, kesit döndürme aralıkları,
  gerçek n=40 varsayılanı, sıfır yükte tepki okları düzeltildi. Kalıcı
  test 29 fizik senaryosunda 107 bağımsız denge/enerji/eğrilik/özdeğer
  kontrolü ve 56 mobil/masaüstü UI kontrolü içerir.
- ✔ `celik-yapilar`: ideal I kesitin A/I/W değerleri ve iki eksenli
  elastik eğilme; delikli levhada nominal net/brüt gerilme, eşit paylaşılan
  bulon yükü ve tek kesme/izdüşüm ezilmesi; iki eğilme düzleminde ideal
  yanal bağlarla Euler kolon. Yanal burulmalı/yerel burkulma, kayma
  gecikmesi, bağlantıdaki yerel yük aktarımı ve gerçek tasarım dayanımı
  hesaplanmaz. E=200 GPa ve fy=250 MPa belirli kaliteye atanmayan eğitim
  varsayımlarıdır. Her yönün Euler elastiklik sınırı ayrıca etiketlidir;
  akma yüküyle min alıp kapasite üretmez. Test: 2041 bağımsız kesit
  integrali/özmod/ölçek/sınır kontrolü + 65 gerçek UI kontrolü.
- ✔ `hidrolik-sistemler`: çift etkili silindirde yük/karşı basınçtan
  gereken giriş basıncı; debiden hız ve dönüş debisi. Pompa sekmesinde
  deplasman/devir/verimlerle akış, tork ve şaft bütçesi. Kısma–relief
  devresinde yük/orifis/akış düğümü birlikte çözülür. Normal, relief,
  durma, kapalı kısma ve pompa kapalı durumları ayrıdır. Kapalı/izole
  taraftaki bilinmeyen tutma basıncına sıfır atanmaz. Yetersiz basınçta
  ters hareketi önleyen ideal mekanik durdurucu açıkça varsayılır;
  genel yük tutma devresi veya valf dinamiği çözülmez.
- ✔ Hidrolik şaft bütçesi yük + kısma + relief + dönüş + kaçak + mekanik
  kayıptır. Pozitif basınçtaki sabit verimler sıfır basınca kesintisiz
  gerçek kaçak yasası diye taşınmaz; yüksüz ideal sınır ayrı tanımlıdır.
  Devre çizimi yönle besleme/dönüş portlarını değiştirir; sıfır akışta
  akış okları yoktur. Test: 8 fizik senaryosu / 1777 bağımsız kontrol
  (akış düğümü ayrıca bisection ile çözülür) + 66 gerçek UI kontrolü.
- ✔ `akiskanlar-mekanigi`: ilk üç deney korunarak dördüncü **Boru ve
  pompa** sekmesi eklendi. Darcy–Weisbach/laminer Poiseuille eşitliği,
  türbülansta Colebrook–White ve iki açık depo için sistem eğrisi.
  Öğretim pompasının parabolik eğrisiyle kesişim çözülür; verilen debi
  modu ayrıca yalnız sistem gereksinimini gösterir. 2300<Re<4000 için
  tek katsayı/kayıp uydurulmaz; bu aralıktaki çalışma noktası çözülemez
  aralık olarak gösterilir. H0≤Δz durumunda ideal çekvalf ileri akışı
  durdurur. Hidrolik güç sıfır olabilir; şaft gücü hesaplanmış olmaz.
- ✔ Akışkanlar testi: 315 bağımsız Colebrook sabit nokta, Poiseuille,
  enerji, kök ve sınır kontrolü; dört gerçek mobil sekme, hazır deneyler,
  sıfır/geçiş/durma ve klavye. Denklem artığı modelin fiziksel doğruluğu
  değil sayısal tutarlılığı gösterir. Geçiş akışı, NPSH, su darbesi ve
  sıcaklık etkileri kapsam dışında. Yeni SVG ve grafik açık/koyu temaya
  uyar; dördüncü sekmede eski zaman entegratörü ilerletilmez.
- ✔ `npm run test:f2` dört laboratuvarın tamamında geçti. Çekirdekler
  salt okunur/dondurulmuş API'lerle sınanır; mobil 390 px ve koyu
  masaüstü kontrolleri fiziksel donanım deneyi değildir.

## 11 Kasım 2026 — F2 kapanışı, D (mühendislik) ve E (oyunlar)

### F2 doğrulama bulguları

- ✔ `mukavemet`: çubuk sekmesindeki dayanaksız "dairesel kesit" ifadesi "sabit kesit" oldu.
- ✔ `celik-yapilar`: "biçimsel elastik uzatma" ("uzama" gibi okunuyordu) açık yazıldı.
- ✔ `akiskanlar-mekanigi`: dördüncü sekmede ham `h_f`, `H_s` etiketleri alt simge oldu; pompa modunda
  devre dışı debi çıktısı artık "pompa ve sistem belirler" diyor.
- ✔ `hidrolik-sistemler`: kayan nokta artığından gelen "-0 W" gösterimi giderildi.
- ✔ `check-f2-strength.mjs`: defterin sınav seçeneklerini etiketsiz form alanı sayan denetim düzeltildi.
- ✗ `akiskanlar-mekanigi`: dördüncü sekme ondalık virgül, ilk üç sekme nokta kullanıyor; dördüncü sekmenin
  grafiği sabit 800×520 çiziliyor (DPR duyarlı değil).
- ✗ `celik-yapilar`: tam eşitlikte elastik sınır karşılaştırmaları tutarsız (`<=` / `<` / `>=`); kaydırıcı
  adımlarıyla erişilemiyor. "M_y,ref" adı y ekseniyle karışabilir.
- ✗ `hidrolik-sistemler`: R kısayolu Cmd/Ctrl+R'de de sıfırlıyor (zararsız).

### D — beş mühendislik laboratuvarı (sıfırdan)

- ✔ `yoneylem-arastirmasi`: grafik DP (kesin ve ölçülen gölge fiyat, dejenere köşede aralık), BigInt kesirli
  simpleks (Bland/Dantzig), CPM/PERT ve tohumlu Monte Carlo ayrıştırması. Hazır düzenler varsayılanlardan
  başlar; "K1, K2 ve K3" yazımı düzeltildi. Açık: gölge fiyatın geçerlilik aralığı gösterilmiyor.
- ✔ `uretim-planlama-ve-endustri-muhendisligi`: EOQ ve stok tükenme benzetimi, X̄–R grafikleri ve ölçülen ARL,
  seri hat/CONWIP. Sabit süreli açık hatta toplam artık kesin (Friedman 1965 indirgeme; aynı rastgele akışlarda
  1e-9 ile doğrulandı; atıf bellekten, kaynak açılmadı). Açık: Erlang-4'te Kingman yaklaşımı kapasiteye yakın
  %13–25 düşük kalır (uyarılı); sabit sürede istasyon satırları toplam kartıyla toplanmaz (sayfada yazılı).
- ✔ `elektrik-muhendisligi`: üç faz ve kompanzasyon, iletim kaybı (1/V²), transformatör eşdeğer devresi ve
  açık/kısa devre deneyleri. İki kayıp yüzdesinin paydaları başlıkta açıklandı; hedef zaten sağlanıyorsa
  batarya açılmıyor. Açık: "Yükün türü" çıktısı "Geri" yazıyor (seçenek "Endüktif").
- ✔ `kimya-muhendisligi`: CSTR/seri tank/PFR ve Levenspiel, McCabe–Thiele, ısı değiştirici (LMTD, ε–NTU).
  Son kademenin kesri artık ln[x/(1−x)] içinde ara değerlenir; toplam geri akışta Fenske'ye eşittir.
  Gerçek madde verisi yok (α öğretim değeri). Açık: durum satırlarında alt simgeler alt çizgiyle (R_min).
- ✔ `gemi-makineleri-isletme-muhendisligi`: çift (Sabathé) çevrim, pervane yasası ve yakıt, kutu mavnada
  çokgen kırpmayla kesin GZ. Sıfıra yakın kolda yüzde yerine açıklama; 200 bar üstü tepe basıncında uyarı.
  CO₂ katsayıları IMO MEPC.364(79)'dan; motor ölçüleri ve SFC eğrisi öğretim değeridir.

### E — oyunlar

- ✔ `gezegen-savunmasi` **sıfırdan yeniden kuruldu**: eski sürümde çekim mermi hızına göre ~73 kat güçlüydü,
  mermiler iki adımda yok oluyor, oyun girdiden bağımsız ~3 s'de bitiyordu. Yenisi GM = R = 1 ölçekli
  birimler, hız Verlet, Kepler yörüngeli aylar, süpürmeli çarpışma, öngörülen yol ve deney modu içerir.
  Bilinen sınır: öngörü 4×DT ile integre eder; sıyırma vuruşları tahminden sapabilir.
- ✔ `oyun-2048`: yukarı/aşağı (ok ve kaydırma) tersti; düzeltildi. "En iyi" cihazda saklanıyor.
- ✔ `mayin-tarlasi`: ipucunun genel tahmin dalı hiç çalışmıyordu (`!flagged` dizinin kendisini sınıyordu);
  doymuş sayıya komşu hücre %100; ilk tıklamadan önce doğru mesaj.
  Açık: ipucu tek sayı kestirimlerinin en küçüğünü alır, sayıları birleştirmez (defterin 1-2-1 deneyi);
  fazla bayrakta sonuç komşu sırasına bağlı; dokunmatikte ipucu yok.
- ✔ `isik-sondurme`: karıştırma tamamen sönük tahta verirse yeniden karıştırır.
  Açık: "İpucu" tek adımlık açgözlü öneridir, 5×5'te oyunların ~%0,4'ünü çözer (defter bunu deney yapar);
  gerçek çözücü (GF(2) eleme) eklenirse defterin o deneyi yeniden yazılmalı.
- ✔ `hanoi-kuleleri`: durum satırı ilk hamleden "Çok iyi!" diyordu; artık bulunulan dizilişten en kısa
  çözüme göre fazla hamleyi gösterir. Seçili çubuğa yeniden tıklamak seçimi iptal eder.
  Açık: "Çöz" hep baştan başlar; rekor disk sayılarını karıştırır.
- ✔ `yasam-oyunu`: Blok, Hafif uzay gemisi, R-pentomino, Gosper planör topu eklendi; simit sınırı ipucunda;
  Temizle/Rastgele benzetimi durdurur. Açık: durağanlık/periyot algılama yok; nesil sayısı "skor" diye kaydedilir.
- ✔ `tetris`: oyun bitince dokunma kilitli; aşağı kaydırma taşı düşürür. Açık: duvar tekmesi yok, rastgele
  seçici belleksiz (defter buna dayanır), düşme zamanlaması kare hızına yuvarlanır.
- ✔ `breakout`: klavyeyle raket alan dışına taşabiliyordu. Açık: oyun yüklenince başlar ve ilk top klavyeyle
  zor yakalanır; fare kontrolü yok; top kare gibi sınanır; adım başına tek tuğla.
- ✗ `snake`: adım süresi kare hızına yuvarlanır (60 Hz'te 120 ms → 133 ms; dokuz hızlanmanın beşi görünür) —
  defterin ölçüm deneyi buna dayanır, düzeltilirse defter güncellenmeli. Tek gözlü yön tamponu; kazanma durumu yok.
- ✗ `formul-hafiza`: animasyon döngüsü yok (efektler tek karede donar); skor HUD'da görünmez; klavye erişimi yok.
- ✔ Snake, Breakout, Hanoi ve Işık Söndürme başlıklarındaki emojiler kaldırıldı.

## 11 Kasım 2026 — eski 36 defterin bağımsız doğrulaması

Otuz altı eski defterin her biri bağımsız doğrulayıcı/editörden geçti. Doğrulayıcılar sayfalarda yanlış
öğreten içeriği de düzeltti; birkaç sayfada bu küçük düzeltmeyi aştı (uçak profili tuvali, metalurji
çizimleri, veri yapıları ağaç yerleşimi, mantık devresi değerlendirmesi, assembly paneli). Bu bölüm, aynı
sayfalar için bu dosyanın önceki bölümlerinde ❑ ile duran maddelerin yerine geçer: aşağıda "✔" altında
sayılanlar kapanmıştır, "Açık" diye yazılanlar sürmektedir. Puanlar doğrulayıcının kendi değerlendirmesidir.

- ✔ `derleyici-ve-yorumlayicilar` (6,5→8,5): AST ayrıştırıcısı parantezi yok sayıyordu ("(a + b) * c" düğmesi a+b*c çiziyordu); parantez dalı eklendi. Canvas etiket rengi (`var(--text-muted)`) sabit renge çevrildi. "3 adres kodu" kartı Java bytecode/CIL'i yanlış sınıflıyordu. Defterde: Python bytecode komut sayısı, Dartmouth BASIC'in derleyici oluşu, EBNF, Rust/Go'nun doğuşu düzeltildi. Açık: "x = y + 5 * z" ağacı sabit kodlu; sözcük çözümleyici `'a'`, `1.2.3`, `10e5` durumlarında tutarsız; canvas DPR duyarsız; başlıklarda emoji.
- ✔ `programlama-paradigmalari` (6,5→8,5): dil–paradigma matrisi sütun kaymalıydı (Eşzamanlı boş, SQL ve C# "Mantıksal", Go "Reaktif"); 16 satır yeniden yazıldı (yargı içerir). Haskell sekmesindeki "point-free" satırı ve derlenmeyen Rust `match` örneği düzeltildi; "borrow checker bağımlı tiplere adım" iddiası kaldırıldı. Açık: Özyineleme kartı kuyruk özyinelemeli olmayan `sum` yanında TCO diyor; Monad kartı yalnız functor `map` gösteriyor; sayfa yalnız kart.
- ✔ `algoritmalar` (7→9): canvas `var(--…)` renkleri sabit renge çevrildi; Büyük-O eksen etiketleri yanlıştı (x 0–100 / y 0–100 yerine 0–20 / 0–120); doğrusal ve ikili arama artık aynı dizide çalışıyor (her tıklamada yeni dizi çiziliyordu); n > 40'ta naif Fibonacci kutusu sessizce F(40) gösteriyordu, artık kesildiğini yazıyor. Defterde: sıralı dizide Quick "780 karşılaştırma" yanlıştı (eşit değerler yüzünden çoğunlukla 540–700), BFS kuyruk boyu, "Algoritmi de numero Indorum" açılışı düzeltildi. Açık: Merge çalışırken Başlat'a basınca iki koşu üst üste binebilir; "Yer Değiştirme" sayacı sekmeye göre farklı anlam taşır.
- ✔ `veri-yapilari` (7→8,5): BST tuvali derinlik 5'ten sonra düğümleri üst üste bindiriyor, 7+ derinliği dışarı taşırıyordu; sıralı sütun yerleşimiyle değişti. Deque sekmesine "Öne Ekle / Önden Çıkar" düğmeleri eklendi (notlardaki eski hata). Canvas renkleri; "extract-min O(1)" → O(log n). Açık: karşılaştırma tablosundaki `*` açıklamasız ve bazı hücreler tartışmalı; hash "Ara" zincirin 7. elemanında da "O(1) ortalama" yazıyor; BST kartı veritabanı indekslerini sayıyor (aslında B-ağacı).
- ✔ `tasarim-desenleri` (6,5→8,5): kod örnekleri kaçırılmadığı için `List<User>` gibi tür parametreleri etiket sanılıp kayboluyordu; kaçırıldı. Facade, Chain of Responsibility, Interpreter ve Command örnekleri düzeltildi; ilişki haritası tek işlevle ve `.related` sınıfıyla çalışıyor. Defterde: "1972 Pong Observer kullanır", "1994'te Java bir yaşında bile değildi", n = 1'de eşitlik ve Java I/O "üç sarmalayıcı" yanlışları düzeltildi. Açık: gevşek çerçeve eşlemeleri (Spring DI = Abstract Factory + Singleton, Context API = Mediator…); kartlara klavye erişimi yok.
- ✔ `yazilim-muhendisligi` (6→8,5): Git tuvalinde dallanma/birleşme okları yanlış commit'ten çıkıyordu; feature satırının rengi/etiketi yoktu; açık dal yokken birleştirme sessizdi. "%70 bakım maliyeti" sayısı kaldırıldı; Observer "View-Controller" düzeltildi. Defterde: Knight Capital, Apollo 11 alarmı ("yanlış ayarlı radar anahtarı" efsanesi), Royce 1970, Bauer'in terimi "icat etmesi" ve hata maliyeti çarpanı (Boehm) düzeltildi. Açık: tuvalde main/release/hotfix satırı yok, DPR duyarsız; test piramidi ve CI/CD şeridi durağan.
- ✔ `siber-guvenlik` (7,5→9): kırma süresi 10–49 yıl için "0 yüzyıl", 1.000–500.000 yıl için "0 milyon yıl" yazıyordu; özet (hash) paneli bayt sayarken "ideal ~%50" diyordu (artık bit de sayıyor); Diffie–Hellman'da "üreteç" diye etiketlenen g rastgeleydi; Vigenère/Sezar/Atbash Türkçe büyük-küçük harf (i/İ, ı/I) ve anahtarda Q/W/X ile "undefined" hatası; güvenlik duvarı "durum bilgili" değil durumsuz port filtresi. Saldırı sözlüğü kavramsal düzeye çekildi (gerçek SQL enjeksiyon yükü kaldırıldı). Açık: Eve kutusu p ≤ 47 için de "Hesaplayamaz!" diyor; parola ölçer ASCII dışı her harfi "sembol" sayıyor; güvenlik duvarı kuralları düzenlenemiyor.
- ✔ `makine-ogrenmesi-derin-ogrenme-llm` (7→9): `backward()` ilk "Eğit" tıklamasında NaN üretiyordu; katman deltalarıyla yeniden yazıldı (sayısal gradyanla altı basamak uyumlu). Dikkat formülünde softmax yoktu; dropout ölçeği, top-p tanımı, backprop atfı düzeltildi. Defter GPT-3 sayısını tarihli veriyor. Açık: eğitim çok yavaş (yakınsama ~180 tıklama; öğrenme hızı kaydırıcısı ya da tıklama başına daha çok adım gerek — değişirse defterin 3. deneyi yeniden hesaplanmalı); canvas etiketleri `var(--text-muted)` kullanıyor (açık temada görünmeyebilir); ağırlık/girdi ayarlanamıyor.
- ✔ `hesaplama-teorisi` (7→9): Turing kartı "Entscheidungsproblem'i çözdü" diyordu (çözülemeyeceğini gösterdi); Y birleştirici tanımı kendisiyle çelişiyordu; Gödel kartındaki şüpheli gerekçe standart argümanla değişti. Defterde: zaman hiyerarşisi teoremi yanlış anlatılıyordu, indirgeme yönü iki yerde tersti, meşgul kunduz makinesinin yılı (1989). Açık: sayfada Turing makinesi yok, "β-Redüksiyon Simülatörü" hesap yapmıyor (hazır türetme basıyor); sınıf çubukları NP/co-NP'yi iç içe gösteriyor; tanımlar yalnız `title` ipucunda (dokunmatikte erişilmez).
- ✔ `bicimsel-diller-ve-otomata-teorisi` (6→9): DFA metni "çift 0, tek 1" diyordu, makine çift 0 ve çift 1 kabul ediyor; Çalıştır eski dizgiyi koşturuyordu; {0,1} dışı karakterde sessizce donuyordu; canvas renkleri; düzen değişti (0 kenarları yatay, 1 kenarları dikey); regex varsayılanı çift ters bölüydü; PSPACE/EXPTIME örnekleri yanlıştı (satranç genellemesi EXPTIME-tamdır; Presburger EXPTIME'da değil); Tip-0 açıklamasında Church–Turing tersti. Açık: karşılıklı kenar çiftleri üst üste çizilip çift başlı ok gibi okunuyor; açık temada canvas yazıları zayıf; Turing makinesi kafası son bitte başlıyor.
- ✔ `elektrokimya` (6,5→8,5): hücre potansiyeli hesabı doğruydu; yanlış olan anot satırının etiketiydi (`E°yük` yazıp indirgenme potansiyelini gösteriyordu) → `E°ind`. Defterde: Daniell'in 1836 hücresi, "Özgürlük Heykeli bir Daniell piliydi" (Fe/Cu çifti, katotta oksijen indirgenir), glikoz ölçer örneği (amperometrik) düzeltildi; Nernst türetmesi eklendi. Açık: "kendiliğinden değil"/"dengede" dalları erişilemez; elektron animasyonu kare hızına bağlı ve E'den bağımsız; elektronlar voltmetreden geçiyor; tuz köprüsünde iyon hareketi, derişim denetimi yok; negatifler ASCII tire ile.
- ✔ `sicim-teorisi` (6→8,5): canvas renkleri; "E = √(n/α′)" → "M = …"; kanıtlanmış ile sanı ayrıldı (süpersimetri "vardır" → gözlenmemiş hipotez; 10⁵⁰⁰ "şekil sayısı" → kaba boşluk tahmini; Maldacena "keşfi" → sanısı; M-kuramı "gösterdi" → öne sürdü; kara delik entropisi "güçlü kanıt" → özel 5B kara deliklerde tutarlılık sınaması). Defterde: göreli parçacık "en kısa yol", "4 Planck alanına bir bit" (≈0,36 bit) ve Veneziano'nun yaşı düzeltildi. Açık: dört kip aynı ve kare hızına bağlı tempoda; sekme adları harmonik numarasıyla sicim düzeyini karıştırıyor; çok sayıda çevrilmemiş İngilizce terim.
- ✔ `veritabanlari` (6→8,5): SQL alanı metin sabitlerini küçük harfe çeviriyordu (`'Bilgisayar'` 0 satır); `= NULL` satır döndürüyordu; desteklenmeyen WHERE koşulu sessizce bütün satırları veriyordu; JOIN'de çakışan `id` sütunları birbirini eziyordu; Venn gölgelendirmesi yanlıştı (INNER simetrik farkı boyuyordu); canvas yazıları `var(--text)` yüzünden neredeyse görünmezdi. Defterde: "BCNF en katı normal form", B+ağacı sayfa hesabı ve IMS tarihi düzeltildi. Açık: B+ağacı gerçek ağaç değil (sıralı listeyi 5'li yapraklara böler, 21+ anahtarda köksüz iki üst düğüm); normalizasyon paneli "tıkla" diyor ama işleyici yok, 2NF adımında kısmi bağımlılık gerçekte yok; PostgreSQL/SQLite "NoSQL" başlığı altında; `<h1>` yok.
- ✔ `internet-ve-ag-teknolojileri` (6,5→8,5): varış TTL'i 59 gösteriyordu (60 olmalı) ve kutu ile etiket bir kayıktı; "gecikme" rastgeleydi (artık bağlantı uzunluklarından, tek yön 61,3 ms); animasyon kare hızına bağlıydı; DNS akışı yazılan adı yok sayıyordu; alt ağ hesaplayıcı bozuk IP/önek kabul ediyordu, /32 için 0 adres veriyordu. Açık: Frankfurt IXP ve Chicago düğümleri hiç kullanılmıyor; "IP sınıfı" eskimiş A/B/C gösteriyor; her ad aynı temsilî adresi alıyor; `<h1>` yok.
- ✔ `isaretciler-ve-bellek-yonetimi` (7→9): Bellek Modeli sekmeleri çalışmıyordu; çekirdek bandı düşük adres ucundaydı (üste taşındı, altta "Eşlenmemiş (NULL)" bandı); "BSS (Sıfırlanmamış)" → "İlklenmemiş"; bölüt etiketleri kırpılıyordu; canvas renkleri; yığın tabanı "Stack Pointer" diye etiketliydi; `p = NULL` iken dereference sessizdi; "segmentation fault" kesin diye yazılmıştı (tanımsız davranış). Defterde: Morris solucanı "99 satır" (yalnız yükleyici), sızıntının "tanımsız davranış" sayılması, "260" sonucunun garanti gibi sunulması düzeltildi; C davranışları yerel clang ile derlenip çalıştırıldı. Açık: işaretçi hücresinde ad değerin üstüne biniyor ("42x"); sekme düğmelerinde seçili durum görünmüyor; benzeteç işaretçi üzerinden yazamıyor.
- ✔ `isletim-sistemleri-ve-linux` (6,5→9): zamanlayıcının Otomatik modu hiç durmuyor, sonsuza dek gri kare ekliyordu; yeni süreçler bir fazla numaralanıyordu; terminale `/proc/cpuinfo` ve `/proc/meminfo` eklendi; Ring 3 → Ring 0 geçişi "context switch" diye yazılmıştı (kip geçişi); `/usr` "Unix System Resources" değil. Defterde: kilitlenmenin dört koşulla "kaçınılmaz" olduğu (gerekli, yeterli değil), 1973'te "ilk taşınabilir işletim sistemi", sistem çağrısı süresi düzeltildi. Açık: `ps` bayraksız daemonları listeliyor; `ls` `-a` olmadan `.bashrc` gösteriyor; süreç tuvali gerçek kuyruk kullanmıyor.
- ✔ `bilgisayar-sistemleri-ve-mimarisi` (6→8,5): boru hattında WB sütunu hiç dolmuyordu (komut MEM'den sonra kayboluyordu); rastgele "tehlike" bazen görünmez gecikme üretiyordu; aşama kutuları komut adı yerine indeks gösteriyordu; veri yapısı tuvalinde 19 `var(--…)` renk; ikili ağaçta kenarlar yanlış ebeveyne gidiyordu; "ext4 1 EB dosya" (birim 1 EiB, dosya 16 TiB). Defterde: "ışık bir çevrimde çipi geçemez" yanlıştı; işaret-büyüklük −1; Moore yasasının 1965/1975 ifadeleri. Açık: tehlike hâlâ rastgele (komut listesindeki gerçek R1 bağımlılığı belirlenimci gösterilebilir — yeniden tasarım); kuyruk ve bağlı liste tuvali sağa taşıyor; dönüştürücü ≥ 2³² değerleri sıfırlıyor, "12abc"yi 12 okuyor.
- ✔ `makine-dili-assembly-c` (6,5→8,5): "Aynı Fonksiyon, Üç Seviye" paneli beş yerden yanlıştı (`mov rax, rdi` "max = arr[0]" diye etiketli ama işaretçi döndürüyordu; hex `cmovge` ile AT&T `cmovll` çelişiyordu; iki atlama ofseti yanlıştı; `int len` için 64 bit sınama). 30 baytlık doğru kodla yeniden yazıldı: AT&T sütunu clang ile birebir hex sütununu üretiyor, bayt düzeyi bir emülatörde 20.000 rastgele dizide C işleviyle eşleşti. Mimari: x86-64, System V AMD64. Defterde: "telefonundaki her uygulama 48 89 F8" (telefonlar ARM), Ariane 5 ("sessiz taşma" değil, istisna bilgisayarı kapattı). Açık: "derleyici gezgini" beş girdili bir arama tablosu (sayfada artık yazıyor); alt dizgi eşlemesi yorum satırından bile dal seçiyor.
- ✔ `otomotiv-muhendisligi` (6,5→8,5): piston üçgen dalgayla hareket ediyor, biyel kolu uzayıp kısalıyordu; gerçek krank–biyel kinematiğiyle (sabit 172 px kol) değişti. Kartlarda: Toyota HSD "paralel hibrit" (güç bölüşümlü), ESC'nin AB'de zorunluluk yılı, "vites küçüldükçe (1→6)" düzeltildi. Defterde: Bertha Benz'in aracı, vuruntunun tanımı (kıvılcımdan önce tutuşma değil, uç gazın kendiliğinden tutuşması), sıkıştırma sonu sıcaklığı. Açık: çizilen sıkıştırma oranı 4,4; İlerlet 30°'nin katlarına oturmuyor; hız kare başına (120 Hz'te iki kat); sayfa motor tuvali dışında yalnız kart.
- ✔ `elektrikli-araclar` (6→8,5): iyon animasyonunun yönü ve yeniden doğma mantığı yanlıştı (iyonlar hep katot tarafında başlıyordu); SoC "79.69999999999999" yazıyordu; araç içi şarj kartı 7,2 kW diyordu (7,4/11/22 kW); Renault Zoe "anahtarlamalı relüktans" değil; birkaç kart düzeltildi ya da tarihlendi. Defterde: 17 Wh'lik hücre "telefon pilinin üç katı" (yaklaşık aynı), NMC orta değeri, "insanlık ilk kez 100 km/sa" (trenler geçmişti), NMC/LFP'nin "aynı laboratuvardan" çıkışı. Açık: dış devre elektronları durağan; iyonlar saniyede birkaç kez rastgele sıçrıyor; kWh/menzil/şarj hesaplayıcısı yok; hızla eskiyen kart iddiaları (ısı pompası kazancı, istasyon sayıları).
- ✔ `mantik-devresi` (5→8,5): **girişler kapılara hiç ulaşmıyordu** (`evalGate("input", [])` hep 0; A=B=1 için AND 0 gösteriyordu, bütün doğruluk tabloları yanlıştı). Değerlendirme yeniden yazıldı; SR kilidi artık durum tutuyor; teller çıkış pininden çiziliyor; "Tümünü Temizle" çalışıyor. Kullanılabilirlik: pinler ve kapılar üst üste düşmüyor, giriş pinleri sürüklenebiliyor ve A, B, C… etiketli; tuvale `touch-action: none` eklendi. Açık: tel yalnız sürükleyerek çekiliyor; tablo ve LED yalnız son eklenen kapıyı izliyor, 3+ pinde "≥3 giriş" diyor; geri alma yok.
- ✔ `elektronik-muhendisligi` (6,5→8,5): D flip-flop saati yok sayıyordu (`dOut = A`); artık yalnız CLK 0→1 kenarında yakalıyor. Canvas'ta 13 `var(--x)` rengi (anot/katot etiketleri görünmüyordu). Defterde: "dört NAND her kapıyı kurar", flip-flop'un "Shannon'ın mirası" oluşu (Eccles–Jordan 1918), diyot akım oranı. Açık: op-amp çizimleri şematik ve devre olarak eksik; sekmeler "NPN/PNP", "N/P kanal" vaat edip yalnız birini çiziyor; sayfa analog hiçbir şey hesaplamıyor (Vin kaydırıcısı, I–V eğrisi yok).
- ✔ `makine-muhendisligi` (5→8): termodinamik çevrimler sabit kodlu çokgenlerdi (Carnot P–V'de dikdörtgendi; Otto/Diesel rastgele altıgen) — artık PV = sabit ve PV^k = sabit eğrilerinden hesaplanıyor, verimler yazıyor; kiriş yük oku yukarı bakıyordu; canvas renkleri; "2. yasa: entropi artar", Navier–Stokes ve Grashof kartları düzeltildi. Defterde: çözümlü örnek kirişi yalnız akma oranından "rahat" ilan ediyordu (artık σ = M·c/I ve sehim, modelin dışında kalanlarla; mukavemet sayfasında aynı sayılar okunuyor); "yüz kat" W'ye bağlanmıştı (rijitlik I ile 100×, dayanım W ile 10×); Tacoma Narrows "rezonans" (aeroelastik çırpınma); Prandtl sınır tabakası "kanadın neden kaldırdığını açıklar". Açık: kaydırıcı yok (r, sıcaklık, kesit, açıklık sabit); P–V eksenlerinde ölçek yok; canvas DPR duyarsız ve açık temada koyu zeminli; akışkan, mekanizma ve imalat panelleri yalnız kart.
- ✔ `plc-hidrolik-pnomatik-cnc-cadcam` (5→8): merdiven mantığında mühürleme yoktu (`motor = start && stop`), oysa çizim ve durum satırı tuttuğunu söylüyordu → `(start || motor) && stop`; mühür dalı START kontağının ortasından çıkıyordu; NK kontak açıkken vurgulanıyordu; canvas renkleri. Defterde: NK kontak anlatımı kendisiyle çelişiyordu; Tower Bridge "şehir şebekesinden" (kendi akümülatörleri); çözümlü örnek hidrolik-sistemler sayfasında yeniden üretilebilir sayılarla değişti. Açık: START anlık buton değil geçiş düğmesi (1'de bırakılırsa STOP dönünce motor yeniden kalkar — defter bunu güvenlik dersi yapar); G02 satırı teğet olmayan köşe üretiyor (muhtemelen G03 kastedilmişti — değişirse defterin 4. deneyi ve 3. sorusu güncellenmeli); tarama çevrimi, zamanlayıcı yok; hidrolik/pnömatik/CAD bölümleri yalnız kart.
- ✔ `metalurji-ve-malzeme-muhendisligi` (6,5→8,5): kristal tuvali YMK'yi 20 küreyle (kenar ortaları) çiziyordu → 14 (yüz merkezleri); SDH küp biçimindeydi → gerçek altıgen prizma (17 küre); Fe–C diyagramı ölçeksizdi ve etiketleri görünmüyordu → ölçekli Fe–Fe₃C (iki çizim işlevi yeniden yazıldı); "beş ana sınıf" (altı), ötektoid 0,8 → 0,76. Defterde: Brearley'nin "hurda yığını" efsanesi, martensit miktarının hızla değil sıcaklıkla belirlenmesi. Açık: sayısal etkileşim yok (diyagram üzerinde kaldıraç kuralı okuması gerçek laboratuvar yapardı); sınırlar doğru parçalarıyla çizili (ara sıcaklıklar onlarca °C yaklaşık).
- ✔ `maden-muhendisligi` (7→8,5): "Kırma" kartı enerji payını yanlış veriyordu; Elektroliz/Ergitme kartı Hall–Héroult'yu mat ergitme sayıyordu; Türkiye kartlarında bor, altın, nadir toprak, krom, feldspat iddiaları kaynaklandı ya da yumuşatıldı. Koordinatör: doğrulanamayan mermer "dünya 1.'si / 4 milyar m³", linyit "en büyük enerji kaynağı / 20 milyar ton / 4,8 milyar ton", trona "dünya 2.'si", "açık ocak %80" ve "Çukurova Krom" örneği sayısız, sıralamasız ifadelere çevrildi. Defterde: Elsner denklemi ve kesme tenörü tanımı eklendi; bor payı çıplak sayı olmadan. Açık: hesaplayıcı yok (tenör/verim ya da dekapaj oranı aracı gerçek laboratuvar yapardı).
- ✔ `isletme-bilimi-ve-yonetim` (6,5→8,5): "dikey/dikey eşitlik" → yatay/dikey; 4P/4C atıfları; Hawthorne araştırmacıların yorumu olarak ve Levitt–List 2011 çekincesiyle; Maslow 1943 (piramit ona ait değil); cari oran "ideal >1,5" → sektöre göre değişen kaba eşik; vergi oranları 2025 tarihli. Defterde: eksen otomatik ölçeklendiği için "yeşil doğru dikleşir" ve "beyaz nokta yukarıda" gözlemleri ekranda yanlıştı; Ford hat süresi tarihi ve 5 dolarlık günün karşılaştırması; başabaş grafiğinin Rautenstrauch'a atfı kaldırıldı. Açık: değişken maliyet 25'e sabit, denetimi yok; y ekseni otomatik ölçeklenince eğimler yanıltıcı; BEP > 800 iken ZARAR/KÂR etiketleri grafik dışı konumdan çiziliyor.
- ✔ `uluslararasi-iliskiler` (6,5→8,5): tarafsızlık için kuramlar ekol olarak sunuldu (gerçekçilik, liberal kurumsalcılık, inşacılık, İngiliz Okulu); "Bandwagoning (Pezvenklik)" hakaret içeren yanlış çeviriydi → "Peşine takılma"; NATO genişlemesi (Finlandiya 2023, İsveç 2024), avro bölgesi, DTÖ üye sayısı, UNCLOS, R2P, Mackinder, Paris hedefi düzeltildi; süren çatışmalar hakkındaki yorum cümleleri çıkarıldı; canvas rengi. Defterde: Petrov "aramadı" (yanlış alarm diye bildirdi), deniz mili tanımı, veto ve demokratik barış yargıları tartışmalı olarak yazıldı. Açık: tuval durağan bir şema; "İngiliz Okulu & Rasyonalizm" kartı Wight'ın rasyonalizmini rasyonel seçimle karıştırıyor; konu kartları süren çatışmaları adıyla anıyor; güncel sayılar (avro 21, DTÖ 166, New START) bellekten.
- ✔ `mikro-ekonomi-ve-uretim-faktorleri` (6→8,5): arz–talep tuvalinde eğimler ters çizilmişti (notlardaki eski hata) — iki doğru yeniden çizildi, denge noktası her kaymada tam kesişimde; "rant" gölgesi anlamsız iki üçgendi → tüketici ve üretici artığı; fayda tuvali bütçeyi aşan (5X, 3Y) ve MRS 0,3 gösteriyordu → (5X, 2,5Y), MRS 0,5, optimumdan geçen kayıtsızlık eğrisiyle; canvas renkleri. Defterde: kupa deneyi iki ayrı çalışmanın sayılarını karıştırıyordu; Tversky'nin Nobel aldığı izlenimi. Açık: eksenlerde sayı yok; düğmeler +1, +2, −2 döngüsünde, "azalt" yok; artık alanları yazılmıyor; sayfa yeniden kurulum adayı (esneklik kaydırıcısı, vergi kaması, maliyet eğrileri).
- ✔ `makro-ekonomi-ve-para-politikalari` (6→8,5): döngüsel akıştaki "← emek" etiketi baş aşağıydı; "her karta tıkla" diyordu ama kartlar tıklanmıyor; "Çözüm: faiz artışı" → "yaygın reçete… tartışmalıdır"; net rezerv tanımı düzeltildi. Defterde politika yargıları tartışmalı olarak yeniden yazıldı; 70 kuralının %65 enflasyona uygulanması, Fed'in "M'yi ikiye katlaması", Almanya 1923 ve Volcker sayıları düzeltildi; Türkiye enflasyon serisi Dünya Bankası'ndan (okuma tarihiyle). Açık: sayfada hiç hesap yok — yeniden kurulum adayı (çarpan turları, MV = PY, Taylor kuralı kaydırıcıları); "Bitcoin Avusturya okulunun ruhunu taşır" görüş; cari denge tanımı transferleri atlıyor; tarihli Türkiye sayıları (Ekim 2022 %85,5; politika faizi 2023–24) bellekten.
- ✔ `ucak-muhendisligi-ve-aerodinamik` (6,5→9): kanat profili tuvali hücum açısını yanlış öğretiyordu (notlardaki eski hata) — çizim işlevleri yeniden yazıldı (~150 satır): serbest akım yatay, yalnız profil dönüyor, arkada aşağı sapma; sürükleme oku akışa karşı bakıyordu; alt yüzey basınç okları emme gibi dışa bakıyordu; C_L perdövitesten sonra artmaya devam ediyordu (22°'de 1,93 → 0,95); okuma satırına C_D ve L/D eklendi; profil %2 yerine %12 kalınlıkta. Kartlarda ramjet aralığı, AF447, jet menzili düzeltildi. Defterde kaldırma hem basınç hem momentum (aşağı sapma) hesabıyla; "eşit geçiş süresi" açıkça reddediliyor; X-43A düzeltildi. Açık: akım çizgileri nitel el yapımı alan; hız/yoğunluk/alan denetimi yok (L = ½ρv²S·C_L keşfedilemiyor); kart panellerinde çevrilmemiş jargon.
- ✔ `otonom-araclar-ve-iha` (7→9): tuval tıklamaları CSS ölçeğini yok sayıyordu (sağ kenarda iki hücre kayıyordu); A* yol bulamayınca sessizdi → durum satırı yol uzunluğunu ve incelenen kare sayısını yazıyor; pil kartında başıboş Çince karakterler; SAE düzeyleri (L2 "eller direksiyonda" şartı yok), LiDAR doğruluğu ve şirket iddiaları düzeltildi/tarihlendi. Defterde: Stanley "parçacık filtresi", "eğilen drone daha da eğilir", Urban Challenge'da trafik ışığı, "aynı 22 Wh ile saatlerce süzülür" yanlışları. Açık: PID/Kalman/sensör panelleri durağan kart; A*'da h = 0 (Dijkstra) seçeneği ve adım görünümü yok; pencere yeniden boyutlanınca engeller siliniyor; şirket paneli tarihli olsa da eskimeye devam edecek.
- ✔ `pong` (7,5→9): **oyun yüklenince donuyordu** — `gameLoop()` zaman damgası olmadan çağrılıyor, biriktirici NaN oluyor, `update()` hiç çalışmıyordu; `requestAnimationFrame(gameLoop)` ile düzeldi. HUD "Hız: 3.00x" → "4.00 piksel/adım"; oyuncu raketi 0…320'ye sınırlandı. Defter (örnek defter; sesi ve yapısı korundu, 30 hedefli düzeltme): ıskalama oranları düşük verilmişti (7,40'ta uç vuruşların %40–50'si geçiyor), "hızlanma kuralı sonsuz ralliyi engeller" yanlıştı (4,00'te bilgisayar 50.000 vuruşta 0 ıskalıyor), Tennis for Two analog bilgisayarda çalışıyordu, Andy Capp's prototipi Ağustos 1972. Açık: raket çarpışması Y'de top yarıçapını yok sayıyor; ~6,9'un altında yapay zekâ yenilmez, zorluk seçeneği yok; fare denetimi ve duraklatma yok; h1'de emoji.
- ✔ `altin-oran` (6,5→9): sayfa altın sarmal çizmiyordu — yarıçap 45°'de bir φ ile büyüyordu (tur başına φ⁸ ≈ 47×); `Math.sqrt(φ)` ile çeyrek turda φ oldu. Defterde altın oran folkloru ayıklandı (Parthenon, Leonardo, piramit, insan bedeni, "en güzel dikdörtgen", nautilus — logaritmik ama altın değil); yaprak dizilimi mekanizması düzeltildi (bitki "en sıkı paketi seçmez"; yeni taslak engellemenin en az olduğu yerde çıkar); Binet ve hata yasası eklendi. Açık: tam pencere tuval tekerlek ve dokunma kaydırmasını yutuyor (deftere üst çubuktaki kitap düğmesi, klavye ya da kaydırma çubuğuyla ulaşılıyor); `<title>` hâlâ "… - Three.js"; Three.js CDN'den yükleniyor; arayüz/açıklama yok; içteki küreler birbirine karışıyor.
- ✔ `asteroids` (6→9): başlıktan emoji kaldırıldı; oyun masaüstü ve 390 px dokunmatikte baştan sona oynandı. Defter sayfayla çelişiyordu ("sürtünme olmadığı için" — bu gemide kare başına %2,33 sürtünme var); tarih hataları (Computer Space Nutting'indi, Atari'nin değil; satış sayıları kaynaklara göre aralık olarak). Açık: çarpışma düz uzaklıkla hesaplanıyor, ekran dikişinin iki yanındaki nesneler çarpışmıyor; lazer gemi hızını devralmıyor (defter sadeleştirme olarak anlatır); tuval yazı tipi serife düşüyor; REKOR her yeni oyunda 0'dan başlıyor.
- ✔ `uzay-kosucusu` (6→9): hızlandırıcı etkisizdi (`gameSpeed + 0.02`; notlardaki eski hata) → `+ 3`, etkinken adım başına bir ek puan (tasarım kararı: tek `score++` satırı); "Çift zıplama" yazıyordu ama kod üç zıplama veriyor; ölüm anındaki dokunuş skor ekranını atlıyordu (0,6 s koruma); başlıktan emoji. Defterde: "ikinci lazerden sonra tek zıpla" tavsiyesi imkânsızdı (üçünün de üstünden geçmek gerek); yıldız hızı; Flappy Bird tarihi. Açık: kuyruklu yıldızın çarpışma kutusu çizimden 10 px kaymış; asteroitler elips çizilip dikdörtgen çarpışıyor; ↑ ve W oyun bitince yeniden başlatmıyor; tuval metinlerinde emoji.

**Yeniden kurulum adayları (bu turda yalnız düzeltildi, laboratuvar düzeyine çıkarılmadı):**
`makro-ekonomi-ve-para-politikalari` (hiç hesap yok), `mikro-ekonomi-ve-uretim-faktorleri`,
`hesaplama-teorisi` (Turing makinesi ve gerçek β-indirgeyici yok), `elektrikli-araclar`,
`otomotiv-muhendisligi`, `maden-muhendisligi`, `metalurji-ve-malzeme-muhendisligi` (kaldıraç kuralı
okuması), `uluslararasi-iliskiler`, `programlama-paradigmalari`, `veritabanlari` (gerçek B+ağacı),
`altin-oran` (tuval kaydırmayı yutuyor, arayüz yok), `makine-ogrenmesi-derin-ogrenme-llm` (eğitim hızı).
