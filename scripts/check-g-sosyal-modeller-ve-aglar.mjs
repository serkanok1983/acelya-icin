// G · sosyal-modeller-ve-aglar.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// Schelling için kaba kuvvet komşu sayımı ve bağımsız denge denetimi, rastgele ızgaralarda Monte Carlo taban çizgisi;
// Granovetter için kişi kişi eşzamanlı benzetim, Simpson tümlevli normal dağılım ve yayımlanmış σc ≈ 12,2;
// Watts–Strogatz için üçgen sayımı yerine komşu kümesi kesişimi, halka uzaklıkları için genişlik öncelikli arama,
// yayımlanmış eğri biçimi (n = 1000, k = 10) ve kapalı biçim C(0); yıpranma için bağımsız Monte Carlo;
// Barabási–Albert için bağ sayısı korunumu ve büyük N sınırındaki ana denklem çözümleri birden çok tohumda;
// zayıf bağlar için kaba kuvvet örtüşme ve genişlik öncelikli bileşen sayımı; yayımlanmış veriler ayrıca yazılmış tablodan.
// Kullanım: node scripts/check-g-sosyal-modeller-ve-aglar.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "sosyal-modeller-ve-aglar";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.SocialModelsLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
function lcg(seed) { let s = BigInt(seed); return () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; }; }

/* ── Kabuk ── */
ok(Object.isFrozen(K) && Object.isFrozen(K.WS_TABLE[0]) && Object.isFrozen(K.DUNBAR.bayes), "çekirdek dondurulmuş");
ok(source.includes("window.SocialModelsLab") && !/window\.(?!SocialModelsLab)[A-Za-z]+\s*=/.test(source), "çekirdek yalnız bu sayfanın kodu");
ok(!/fonts\.googleapis|cdn\.|<script src="https?:/.test(html), "dış betik, Google Fonts ya da CDN yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Sosyal Modeller ve Ağlar: ") && title.length <= 80, "başlık biçimi ve uzunluğu: " + title.length);
ok(/<body class="app-page" data-page="sosyal-modeller-ve-aglar">/.test(html) && /<meta name="description" content="[^"]{60,}"/.test(html), "kabuk ve açıklama");
ok(/<link rel="stylesheet" href="shared\/theme\.css">/.test(html) && /<script src="shared\/app\.js"><\/script>/.test(html), "theme.css ve app.js");
ok(/viewport-fit=cover/.test(html) && /<html lang="tr" class="app-root">/.test(html), "viewport ve kök");
ok(!/[̀-ͯ⃗]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html), "emoji yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html), "body overflow:hidden yok");
ok(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon/.test(html.split("<script>")[1]), "hiçbir şey saklanmıyor ya da gönderilmiyor");
for (const l of ["oyun-kurami", "cizge-teorisi", "salgin-modelleri-sir", "yasam-oyunu", "karar-ve-bilissel-yanliliklar"]) ok(html.includes(`href="${l}.html"`), "bağlantı " + l);
ok(/13 Kasım 2026/.test(html) && !/type="number"/.test(html), "tarih ve type=number yok");

/* ── Yayımlanmış veriler: kaynaklardan ayrıca yazılmış tablo ── */
const WS_PUB = [[3.65, 2.99, 0.79, 0.00027, 225226, 61], [18.7, 12.4, 0.080, 0.005, 4941, 2.67], [2.65, 2.25, 0.28, 0.05, 282, 14]];
K.WS_TABLE.forEach((r, i) => ok(JSON.stringify([r.Lact, r.Lrand, r.Cact, r.Crand, r.n, r.k]) === JSON.stringify(WS_PUB[i]), "Watts–Strogatz Tablo 1 satır " + i));
for (const r of K.WS_TABLE) ok(r.Lact >= r.Lrand && r.Cact / r.Crand > 5, r.name + ": L ≳ L_rastgele, C ≫ C_rastgele");
ok(K.MILGRAM.sent === 296 && K.MILGRAM.lost === 232 && K.MILGRAM.sent - K.MILGRAM.lost === K.MILGRAM.reached, "Milgram 296 − 232 = 64");
ok(JSON.stringify(K.JOBS.pct) === "[16.7,55.6,27.8]" && K.JOBS.n === 54 && K.JOBS.surveyed === 282 && K.JOBS.interviewed === 100, "Granovetter iş verisi");
abs(K.JOBS.pct.reduce((a, b) => a + b, 0), 100, 0.15, "yüzdelerin toplamı (yuvarlama)");
ok(JSON.stringify(K.DUNBAR) === JSON.stringify({ d1992: { meanLo: 148, meanHi: 148, lo: 100, hi: 230 }, bayes: { meanLo: 69, meanHi: 109, lo: 4, hi: 520 }, gls: { meanLo: 16, meanHi: 42, lo: 2, hi: 336 } }), "Dunbar aralıkları");
ok(K.GRAN.sigmaC === 12.2 && K.GRAN.mu === 25 && K.BC19.strongest === 4 && K.BC19.weakest === 52, "Granovetter ve Broido–Clauset sabitleri");

/* ── 1 · Schelling ── */
{
  const bruteCounts = (S, i) => { const x = i % S.w, y = Math.floor(i / S.w); let a = 0, b = 0; for (let j = 0; j < S.g.length; j++) { if (j === i) continue; const X = j % S.w, Y = Math.floor(j / S.w); if (Math.max(Math.abs(X - x), Math.abs(Y - y)) === 1) { if (S.g[j] === 1) a++; else if (S.g[j] === 2) b++; } } return [a, b]; };
  const S = K.schInit({ w: 12, h: 9, vac: 0.3, minor: 0.4, seed: 5 });
  for (let i = 0; i < S.g.length; i++) { const [a, b] = K.schCounts(S, i), [A, B] = bruteCounts(S, i); ok(a === A && b === B, "komşu sayımı " + i); }
  const cnt = (g) => [0, 1, 2].map((v) => g.filter((x) => x === v).length);
  const c0 = cnt([...S.g]);
  ok(c0[0] === Math.round(0.3 * 108) && c0[2] === Math.round(0.4 * (108 - c0[0])), "başlangıç sayıları");
  // denge denetimi: bağımsız olarak, memnun olmayan her ajan için hiçbir boş kare onu memnun etmemeli
  for (const [t, rule, seed] of [[0.33, "nearest", 1], [0.5, "random", 2], [0.7, "nearest", 3], [0.85, "random", 4]]) {
    const R = K.schRun({ w: 20, h: 20, vac: 0.25, minor: 0.5, seed }, t, rule, 200);
    ok(JSON.stringify(cnt([...R.S.g])) === JSON.stringify(cnt([...K.schInit({ w: 20, h: 20, vac: 0.25, minor: 0.5, seed }).g])), "grup sayıları korunur");
    if (R.converged) {
      for (let i = 0; i < R.S.g.length; i++) {
        const c = R.S.g[i]; if (!c) continue;
        const [a, b] = bruteCounts(R.S, i), same = c === 1 ? a : b;
        if (a + b === 0 || same >= t * (a + b) - 1e-9) continue;
        R.S.g[i] = 0; let any = false;
        for (let j = 0; j < R.S.g.length && !any; j++) { if (R.S.g[j] || j === i) continue; const [A, B] = bruteCounts(R.S, j), sm = c === 1 ? A : B; if (A + B === 0 || sm >= t * (A + B) - 1e-9) any = true; }
        R.S.g[i] = c; ok(!any, `t=${t}: memnun olmayan ajanın gidebileceği kare yok`);
      }
    }
  }
  // t = 0: kimse taşınmaz
  { const R = K.schRun({ w: 20, h: 20, vac: 0.25, minor: 0.5, seed: 9 }, 0, "nearest"); ok(R.sweeps === 1 && R.converged && R.end.similarity === R.start.similarity, "t = 0 hareketsiz"); }
  // benzerlik ve oran: bağımsız hesap
  { const R = K.schRun({ w: 30, h: 30, vac: 0.2, minor: 0.3, seed: 3 }, 0.4, "nearest"); let s = 0, n = 0, sa = 0, ot = 0; for (let i = 0; i < R.S.g.length; i++) { const c = R.S.g[i]; if (!c) continue; const [a, b] = bruteCounts(R.S, i), same = c === 1 ? a : b, o = c === 1 ? b : a; sa += same; ot += o; if (a + b) { s += same / (a + b); n++; } } near(R.end.similarity, s / n, 1e-12, "benzerlik"); near(R.end.likeRatio, sa / ot, 1e-12, "benzer/farklı oranı"); }
  // rastgele taban çizgisi: büyük rastgele ızgaralarda Monte Carlo
  for (const f of [0.5, 0.3, 0.1]) { let s = 0; for (let seed = 1; seed <= 4; seed++) s += K.schStats(K.schInit({ w: 120, h: 120, vac: 0.25, minor: f, seed })).similarity; abs(s / 4, K.schRandomSimilarity(f), 0.01, "rastgele benzerlik f=" + f); }
  // sayfada yazılan aralıklar: 40 × 40, %25 boş, tohum 1–10
  const span = (t, rule) => { const v = []; for (let seed = 1; seed <= 10; seed++) v.push(K.schRun({ w: 40, h: 40, vac: 0.25, minor: 0.5, seed }, t, rule).end.likeRatio); v.sort((a, b) => a - b); return v; };
  const third = span(0.33, "nearest"), half = span(0.5, "nearest"), thirdR = span(0.33, "random"), halfR = span(0.5, "random");
  ok(third[0] >= 1.65 && third[9] <= 1.95, "üçte birde oran 1,7–1,9: " + third[0].toFixed(2) + "–" + third[9].toFixed(2));
  ok(half[0] >= 3.25 && half[9] <= 3.85, "yarıda oran 3,3–3,8: " + half[0].toFixed(2) + "–" + half[9].toFixed(2));
  ok(thirdR[0] > third[9] && halfR[0] > half[9], "rastgele kare kuralı ayrışmayı artırır");
  // varsayılan durum (sayfada gösterilen)
  const D = K.schRun({ w: 40, h: 40, vac: 0.25, minor: 0.5, seed: 1 }, 0.33, "nearest");
  ok(D.sweeps === 4 && D.converged && D.end.unhappyN === 0, "varsayılan: 4 tur, herkes memnun");
  abs(D.end.similarity, 0.640, 0.0005, "varsayılan benzerlik %64,0"); abs(D.end.likeRatio, 1.69, 0.005, "varsayılan oran 1,69"); abs(D.start.similarity, 0.504, 0.0005, "başlangıç %50,4");
  const hi = K.schRun({ w: 40, h: 40, vac: 0.25, minor: 0.5, seed: 1 }, 0.85, "nearest");
  ok(hi.end.unhappyN > 0 && hi.converged, "t = %85: kilitlenme");
  assert.throws(() => K.schInit({ w: 2, h: 5, vac: 0.2, minor: 0.5, seed: 1 })); assert.throws(() => K.schInit({ w: 5, h: 5, vac: 0, minor: 0.5, seed: 1 })); checks += 2;
}

/* ── 2 · Granovetter ── */
{
  const simulate = (th) => { let rioting = new Array(th.length).fill(false), n = 0; for (;;) { const next = th.map((x, i) => rioting[i] || x <= n); const m = next.filter(Boolean).length; if (m === n) return n; rioting = next; n = m; } };
  ok(K.granCascade(K.granUniform(100, false)).final === 100 && simulate(K.granUniform(100, false)) === 100, "düzgün: 100 kişi");
  ok(K.granCascade(K.granUniform(100, true)).final === 1 && simulate(K.granUniform(100, true)) === 1, "eşiği 1 olan 2 olunca: 1 kişi");
  near(K.granUniform(100, true).reduce((a, b) => a + b, 0) / 100, 49.51, 1e-12, "ortalama 49,51");
  for (let seed = 1; seed <= 30; seed++) { const th = K.normalSample(100, 25, 5 + seed / 2, seed); ok(K.granCascade(th).final === simulate(th) && th.every((x) => x >= 0), "çığ = kişi kişi benzetim, tohum " + seed); }
  // normal dağılım fonksiyonu: Simpson tümlevi
  const phiRef = (x) => { const a = -12, n = 20000, h = (x - a) / n, f = (t) => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI); let s = f(a) + f(x); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };
  for (const x of [-4, -2.5, -1, -0.3, 0, 0.7, 1.96, 3]) abs(K.Phi(x), phiRef(x), 2e-7, "Φ(" + x + ")");
  // denge: bağımsız ileri yineleme (sürekli model) ile
  const iter = (mu, sg) => { let r = 0; for (let i = 0; i < 200000; i++) { const n = 100 * phiRef((r - mu) / sg); if (Math.abs(n - r) < 1e-9) break; r = n; } return r; };
  for (const sg of [5, 10, 12, 13, 20, 40]) abs(K.granEq(25, sg), iter(25, sg), 0.01, "denge σ=" + sg);
  const sc = K.granSigmaC(25); abs(sc, 12.2, 0.05, "σc ≈ 12,2 (Granovetter 1978)");
  ok(K.granEq(25, sc - 0.05) < 7 && K.granEq(25, sc + 0.05) > 99, "σc'de sıçrama: altta ≈ 6'ya kadar, üstte ≈ 100");
  ok(K.granEq(25, 1000) > 50 && K.granEq(25, 1000) < 52 && K.granEq(25, 0) === 0, "σ → ∞'da 50'ye iner, σ = 0'da çığ yok");
  const cw = K.granCobweb(25, 20); abs(cw[cw.length - 1], K.granEq(25, 20), 1e-3, "merdiven dengeye varır");
  assert.throws(() => K.granCascade([])); checks++;
}

/* ── 3 · Watts–Strogatz ── */
{
  const triClust = (adj) => { let s = 0; for (let v = 0; v < adj.length; v++) { const N = [...adj[v]]; if (N.length < 2) continue; let e = 0; for (const a of N) for (const b of N) if (a < b && [...adj[a]].includes(b)) e++; s += e / (N.length * (N.length - 1) / 2); } return s / adj.length; };
  for (const k of [4, 6, 10, 20]) { const g = K.wsGraph(200, k, 0, 1); near(triClust(g.adj), K.wsC0(k), 1e-12, "C(0) k=" + k); near(K.clustering(g.adj), K.wsC0(k), 1e-12); near(K.pathStats(g.adj).L, K.ringL(200, k), 1e-12, "halka L k=" + k); }
  near(K.wsC0(10), 2 / 3, 1e-15, "C(0) = 2/3 (k = 10)");
  for (const p of [0, 0.01, 0.3, 1]) for (const seed of [1, 2]) {
    const g = K.wsGraph(300, 8, p, seed); let deg = 0, bad = false;
    g.adj.forEach((a, i) => { deg += a.length; if (a.includes(i) || new Set(a).size !== a.length) bad = true; a.forEach((j) => { if (!g.adj[j].includes(i)) bad = true; }); });
    ok(deg === 300 * 8 && !bad, `kenar sayısı nk/2, kendine bağ ve çift kenar yok, simetrik (p=${p})`);
  }
  // yayımlanmış eğri biçimi (n = 1000, k = 10): küçük dünya bölgesi
  const g0 = K.wsGraph(1000, 10, 0, 1), C0 = K.clustering(g0.adj), L0 = K.pathStats(g0.adj).L;
  const avg = (p) => { let c = 0, l = 0; for (let s = 1; s <= 3; s++) { const g = K.wsGraph(1000, 10, p, s); c += K.clustering(g.adj); l += K.pathStats(g.adj).L; } return [c / 3 / C0, l / 3 / L0]; };
  const [c1, l1] = avg(0.01), [c2, l2] = avg(1e-4), [c3, l3] = avg(1);
  ok(c1 > 0.95 && l1 < 0.25, "p = 0,01: C/C(0) > 0,95, L/L(0) < 0,25: " + c1.toFixed(3) + ", " + l1.toFixed(3));
  ok(c2 > 0.99 && l2 > 0.85, "p = 10⁻⁴: hâlâ düzenli");
  ok(c3 < 0.05 && Math.abs(l3 * L0 - Math.log(1000) / Math.log(10)) / 3 < 0.15, "p = 1: rastgele çizge düzeyi (L ≈ ln n / ln k)");
  const D = K.wsGraph(1000, 10, 0.01, 1), DC = K.clustering(D.adj), DP = K.pathStats(D.adj);
  ok(D.rewired === 45, "varsayılan 45 kenar"); abs(DC, 0.649, 0.0005, "varsayılan C 0,649"); abs(DP.L, 9.09, 0.005, "varsayılan L 9,09"); ok(DP.diameter === 18 && DP.unreachable === 0, "çap 18");
  // genişlik öncelikli aramanın histogramı: toplam çift sayısı
  ok(DP.hist.reduce((a, b) => a + b, 0) === 1000 * 999, "uzaklık histogramı bütün sıralı çiftler");
  // yıpranma: bağımsız Monte Carlo (LCG)
  for (const q of [0, 0.1, 0.25, 0.5]) {
    const A = K.attrition(DP.hist, q); const r = lcg(11 + q * 100); let done = 0, sd = 0; const M = 60000; const tot = 999000;
    for (let i = 0; i < M; i++) { let u = r() * tot, d = 1; while (u >= DP.hist[d]) { u -= DP.hist[d]; d++; } let alive = true; for (let s = 0; s < d; s++) if (r() < q) { alive = false; break; } if (alive) { done++; sd += d; } }
    abs(A.completion, done / M, 0.006, "ulaşma oranı q=" + q); if (done > 200) abs(A.observedMean, sd / done, 0.06 + 0.3 * q, "ulaşanların ortalaması q=" + q);
    if (q > 0) ok(A.observedMean < A.trueMean, "yıpranma ölçülen ortalamayı kısaltır");
  }
  near(K.attrition(DP.hist, 0).observedMean, DP.L, 1e-12, "q = 0: ölçülen = gerçek");
  const sim = K.attritionSim(DP.hist, 0.25, 296, 1); ok(sim.completed > 0 && sim.completed < 296, "296 mektuplu deneme");
  assert.throws(() => K.wsGraph(10, 3, 0.1, 1)); assert.throws(() => K.wsGraph(10, 4, 1.5, 1)); checks += 2;
}

/* ── 4 · Barabási–Albert ── */
{
  for (const m of [1, 2, 3, 5]) for (const mode of ["pref", "unif"]) {
    const N = 3000, G = K.baGraph(N, m, 7, mode), E = m * (m + 1) / 2 + (N - m - 1) * m;
    ok(G.edges === E && G.deg.reduce((a, b) => a + b, 0) === 2 * E && Math.min(...G.deg) === m, `bağ korunumu ve en küçük derece m (m=${m}, ${mode})`);
  }
  // ana denklem çözümleri birçok tohumda (büyük N)
  for (const m of [1, 2, 3]) {
    let pm = 0, p2 = 0, um = 0, u3 = 0; const S = 4, N = 50000;
    for (let seed = 1; seed <= S; seed++) { const h = K.degreeHist(K.baGraph(N, m, seed).deg), hu = K.degreeHist(K.baGraph(N, m, seed, "unif").deg); pm += h[m] / N; p2 += h[2 * m] / N; um += hu[m] / N; u3 += hu[m + 3] / N; }
    abs(pm / S, 2 / (m + 2), 0.008, "P(m) = 2/(m + 2), m=" + m); abs(p2 / S, 2 * m * (m + 1) / (2 * m * (2 * m + 1) * (2 * m + 2)), 0.006, "P(2m), m=" + m);
    abs(um / S, 1 / (m + 1), 0.006, "tercihsiz P(m) = 1/(m + 1)"); abs(u3 / S, (1 / (m + 1)) * (m / (m + 1)) ** 3, 0.005, "tercihsiz geometrik P(m + 3)");
    let s = 0; for (let k = 1; k < 5000; k++) s += K.pkPref(k, m); abs(s, 1, 1e-6, "P(k) toplamı 1");
  }
  const gs = []; for (let seed = 1; seed <= 6; seed++) gs.push(K.tailExponent(K.baGraph(50000, 1, seed).deg, 10).gamma);
  ok(gs.every((g) => g > 2.75 && g < 3.2), "kuyruk üssü ≈ 3: " + gs.map((g) => g.toFixed(2)).join(" "));
  ok(K.degreeHist(K.baGraph(50000, 2, 1).deg).length > 10 * K.degreeHist(K.baGraph(50000, 2, 1, "unif").deg).length, "tercihli ağda göbekler");
  const D = K.baGraph(10000, 2, 1); ok(D.deg.reduce((a, b) => Math.max(a, b), 0) === 282, "varsayılan en büyük derece 282");
  abs(K.tailExponent(D.deg, 20).gamma, 2.87, 0.005, "varsayılan kuyruk üssü 2,87");
  near(K.topShare(Int32Array.from([10, 1, 1, 1, 1, 1, 1, 1, 1, 1]), 0.1), 10 / 19, 1e-12, "en büyük %10'un payı");
  assert.throws(() => K.baGraph(3, 2, 1)); checks++;
}

/* ── 5 · Zayıf bağlar ── */
{
  const net = K.communityGraph(10, 20, 0.4, 20, 1);
  const bridges = net.edges.filter(([a, b]) => Math.floor(a / 20) !== Math.floor(b / 20));
  ok(bridges.length === 20, "20 köprü");
  for (let i = 0; i < net.edges.length; i += 7) { const [a, b] = net.edges[i], A = [...net.adj[a]], B = [...net.adj[b]], c = A.filter((x) => B.includes(x)).length, den = A.length - 1 + B.length - 1 - c; near(K.overlap(net.adj, a, b), den > 0 ? c / den : 0, 1e-12, "örtüşme"); }
  const bfsLargest = (alive) => { const adj = Array.from({ length: net.n }, () => []); net.edges.forEach(([a, b], i) => { if (alive[i]) { adj[a].push(b); adj[b].push(a); } }); const seen = new Uint8Array(net.n); let best = 0; for (let s = 0; s < net.n; s++) { if (seen[s]) continue; let c = 0; const st = [s]; seen[s] = 1; while (st.length) { const v = st.pop(); c++; for (const u of adj[v]) if (!seen[u]) { seen[u] = 1; st.push(u); } } best = Math.max(best, c); } return best; };
  const O = K.removalOrders(net, 1);
  for (const f of [0, 0.05, 0.1, 0.5, 0.9]) for (const ord of ["weak", "strong", "random"]) { const R = K.removalAt(net, O[ord], f); ok(R.largest * net.n === bfsLargest(R.alive), `bileşen ${ord} f=${f}`); }
  ok(K.removalAt(net, O.weak, 0.1).largest <= 0.15 && K.removalAt(net, O.strong, 0.1).largest === 1 && K.removalAt(net, O.random, 0.1).largest === 1, "varsayılan %10: zayıf önce %10, güçlü ve rastgele %100");
  ok(bridges.reduce((s, [a, b]) => s + K.overlap(net.adj, a, b), 0) / 20 < 0.02, "köprülerin örtüşmesi ≈ 0");
  for (let seed = 1; seed <= 5; seed++) { const n2 = K.communityGraph(10, 20, 0.4, 20, seed), O2 = K.removalOrders(n2, seed); ok(K.removalAt(n2, O2.weak, 0.1).largest < 0.5 && K.removalAt(n2, O2.strong, 0.1).largest > 0.9, "zayıf/güçlü sırası tohum " + seed); }
}
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(20000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); e.dispatchEvent(new Event("change", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const settle = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const pressR = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); };
      const labels = async () => { const u = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id)); ok(u.length === 0, "etiketsiz denetim: " + u.join(",")); };
      await labels();
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      // 1 · Schelling
      await has("smTOut", "%33"); await has("smSim", "%50,4"); await has("smSweeps", "0"); await has("smStatus", "Başlangıç rastgele");
      await page.click("#smStep"); await has("smSweeps", "1");
      for (let i = 0; i < 4; i++) await page.click("#smStep");
      await has("smSim", "%64,0"); await has("smRatio", "1,69"); await has("smSweeps", "4"); await has("smStatus", "4 turda denge"); await has("smUnhappy", "%0,0");
      ok(await page.locator("#smRun").isDisabled(), "bitince Çalıştır kapalı");
      await page.click("#smHalf"); await has("smTOut", "%50 (1/2)"); await has("smSweeps", "0");
      await page.click("#smRun"); await page.waitForFunction(() => document.getElementById("smRun").disabled, null, { timeout: 15000 }); await has("smStatus", "denge");
      const r50 = parseFloat((await read("smRatio")).replace(",", ".")); ok(r50 > 3 && r50 < 4, "yarıda oran " + r50);
      await range("smT", 85); await settle(); for (let i = 0; i < 6; i++) await page.click("#smStep"); await has("smStatus", "kilitlenir");
      await range("smT", 0); await settle(); await page.click("#smStep"); await has("smStatus", "t = 0");
      await range("smT", 33); await range("smMinor", 10); await settle(); await has("smMinorOut", "%10"); await has("smStatus", "Gruplar eşit değil");
      await sel("smRule", "random"); await sel("smSize", "20"); await settle(); ok(!(await page.locator("#panel-sch").textContent()).includes("NaN"), "Schelling NaN yok");
      await page.locator("#smSeed").fill("abc"); await page.locator("#smSeed").dispatchEvent("change"); ok((await page.locator("#smSeed").inputValue()) === "1", "geçersiz tohum 1'e döner");
      await page.click("#smNew"); ok((await page.locator("#smSeed").inputValue()) === "2", "yeni tohum");
      await pressR(); await has("smTOut", "%33"); ok((await page.locator("#smSize").inputValue()) === "40" && (await page.locator("#smRule").inputValue()) === "nearest", "R sıfırlar (1)");
      // sekme klavyesi
      await page.locator("#tab-sch").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-wt").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); ok((await page.locator("#tab-sch").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-gr").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2 · Granovetter
      await has("grFinal", "100 / 100"); await has("grMean", "49,50"); await has("grSigC", "12,22"); await has("grSteps", "100"); await has("grEq", "—");
      await page.click("#grUni2"); await has("grFinal", "1 / 100"); await has("grMean", "49,51"); await has("grStatus", "kışkırtıcı tek başına"); await has("grNews", "Tek kişi");
      await page.click("#grBelow"); await has("grSigmaOut", "12,1"); const eqB = parseFloat((await read("grEq")).replace(",", ".")); ok(eqB > 4 && eqB < 7, "σ = 12,1 dengesi " + eqB);
      await page.click("#grAbove"); await has("grEq", "100,0"); await has("grStatus", "üstündesin"); await has("grFinal", "1 / 100"); await has("grStatus", "sonlu kalabalık sürekli modelden ayrılıyor"); await has("grStatus", "σc'ye tam oturamaz");
      await range("grSigma", 15); await settle(); await has("grFinal", "9 / 100"); await has("grStatus", "sürekli modelden ayrılıyor"); await has("grStatus", "σ düğmeleri tohumu değiştirmez");
      await page.click("#grAbove"); await page.locator("#grSeed").fill("15"); await settle(); await has("grFinal", "100 / 100"); ok(!(await read("grStatus")).includes("ayrılıyor"), "tohum 15: sonlu ve sürekli uyumlu, uyarı yok");
      await page.click("#grBelow"); await has("grFinal", "7 / 100"); await page.locator("#grSeed").fill("1"); await settle(); await has("grFinal", "1 / 100");
      await range("grSigma", 0); await settle(); await has("grStatus", "σ = 0"); await range("grSigma", 40); await range("grMu", 50); await settle(); ok(!(await page.locator("#panel-gr").textContent()).includes("NaN"), "Granovetter NaN yok");
      await page.click("#grNew"); ok((await page.locator("#grSeed").inputValue()) === "2", "yeni tohum (2)");
      await pressR(); await has("grFinal", "100 / 100"); ok((await page.locator("#grDist").inputValue()) === "uni", "R sıfırlar (2)");
      // 3 · Küçük dünya
      await page.click("#tab-ws"); await settle();
      await has("wsC", "0,649"); await has("wsL", "9,09"); await has("wsRew", "45"); await has("wsDiam", "18"); await has("wsPOut", "0,01"); await has("wsCE", "0,667"); await has("wsLE", "50,45");
      await page.waitForFunction(() => !document.getElementById("wsCurveGo").disabled, null, { timeout: 30000 }); await has("wsStatus", "Eğriler hesaplandı");
      await has("mgDone", "%"); await has("mgDoneE", "%21,6"); await has("wsTable", "18,7 · 12,4"); await has("wsTable", "0,00027");
      await range("mgQ", 0); await settle(); await has("mgNote", "q = 0"); await range("mgQ", 0.6); await settle(); ok(!(await page.locator("#mgCard").textContent()).includes("NaN"), "q = 0,6 NaN yok");
      await page.click("#wsReg"); await settle(); await has("wsC", "0,667"); await has("wsL", "50,45"); await has("wsStatus", "düzenli halka");
      await page.click("#wsRandom"); await settle(); await has("wsStatus", "neredeyse rastgele");
      await sel("wsN", "100"); await range("wsK", 4); await settle(); ok(!(await page.locator("#panel-ws").textContent()).includes("NaN"), "küçük ağ NaN yok");
      await pressR(); await has("wsC", "0,649"); ok((await page.locator("#wsN").inputValue()) === "1000", "R sıfırlar (3)");
      // 4 · Barabási–Albert
      await page.click("#tab-ba"); await settle();
      await has("baMax", "282"); await has("baGamma", "2,87"); await has("baPmE", "%50,0"); await has("baStatus", "Tercihli bağlanma");
      await page.click("#baUnif"); await settle(); await has("baStatus", "Tercihsiz büyüme"); await has("baPmE", "%33,3");
      await range("baM", 5); await sel("baN", "1000"); await settle(); ok(!(await page.locator("#panel-ba").textContent()).includes("NaN"), "BA NaN yok");
      await pressR(); await has("baMax", "282"); ok((await page.locator("#baMode").inputValue()) === "pref", "R sıfırlar (4)");
      // 5 · Zayıf bağlar
      await page.click("#tab-wt"); await settle();
      ok(await page.locator("#jobRes").isHidden(), "iş sonucu önce gizli");
      await page.click("#job0"); await has("jobRes", "%55,6"); await has("jobRes", "En sık yanıt"); await page.click("#job1"); await has("jobRes", "Tahminin tuttu");
      ok((await page.locator("#job1").getAttribute("aria-pressed")) === "true", "seçili tahmin işaretli");
      await has("wtWeak", "%100"); await has("wtStatus", "Henüz bağ silinmedi");
      await range("wtF", 10); await settle(); await has("wtWeak", "%10"); await has("wtStrong", "%100"); await has("wtStatus", "Köprüler gidince");
      await sel("wtOrder", "strong"); await range("wtB", 80); await range("wtPin", 0.8); await settle(); ok(!(await page.locator("#panel-wt").textContent()).includes("NaN"), "zayıf bağlar NaN yok");
      await pressR(); await has("wtFOut", "%0"); ok(await page.locator("#jobRes").isHidden(), "R sıfırlar (5)");
      await labels();
      await page.locator(".digest").scrollIntoViewIfNeeded(); ok(await page.locator(".digest").isVisible() && (await page.locator(".digest").textContent()).includes("Granovetter"), "Keşif Defteri yüklendi ve görünür");
      for (const t of ["sch", "gr", "ws", "ba", "wt"]) { await page.click("#tab-" + t); await settle(); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].filter((c) => c.offsetParent).every((c) => c.width > 0)), `${t}: görünür tuvaller çizildi`); }
      ok(await page.evaluate(() => Object.isFrozen(SocialModelsLab) && !Object.getOwnPropertyDescriptor(window, "SocialModelsLab").writable), "çekirdek salt okunur");
      ok(!(await page.locator("main").textContent()).includes("NaN") && !(await page.locator("main").textContent()).includes("undefined"), "NaN ya da undefined yok");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
