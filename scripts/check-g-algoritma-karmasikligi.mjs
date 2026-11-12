// G · algoritma-karmasikligi: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır
// (BigInt ile tam aritmetik, kaba kuvvet, dinamik programlama ile erişilebilir toplamlar, permütasyon taraması,
// alt küme taraması, kapalı biçimler). `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../algoritma-karmasikligi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
// vm bağlamı çok yavaş olduğundan çekirdek yalıtılmış bir işlev gövdesinde çalıştırılır (DOM'a erişimi yoktur).
const K=new Function('"use strict";'+source+';return ComplexityLab;')();
let checks=0;
const eq=(a,b,msg)=>{assert.equal(a,b,msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b}`);checks++;};
ok(Object.isFrozen(K)&&Object.isFrozen(K.PAIRS));

/* 1. Büyüme sınıfları: kesişim, bütçe, tanıklar */
// Tam sayı n için maliyetin bağımsız değeri: BigInt (polinom, üstel, faktöriyel) ya da double (log içerenler).
const exactCost=(id,n)=>{const b=BigInt(n);switch(id){case'n':return b;case'n2':return b*b;case'n3':return b*b*b;case'exp':return 1n<<b;case'fact':{let f=1n;for(let i=2n;i<=b;i++)f*=i;return f;}}return null;};
const cheaper=(F,cF,S,cS,n)=>{const a=exactCost(F,n),b=exactCost(S,n);if(a!==null&&b!==null)return BigInt(cF)*a<BigInt(cS)*b;
  const v=id=>id==='log'?Math.log2(n):id==='nlogn'?n*Math.log2(n):Number(exactCost(id,n));return cF*v(F)<cS*v(S)*(1-1e-13);};
const ORD=['log','n','nlogn','n2','n3','exp','fact'];
for(const[A,cA,B,cB]of[['n2',1,'nlogn',30],['exp',1,'n3',1000],['n',1,'log',100],['n2',10,'n3',1],['n2',7,'n3',1],['n3',1,'exp',1],['fact',1,'exp',1],['fact',1,'exp',100],['n',8,'nlogn',1],['n2',1,'n',1000],['nlogn',2,'n2',1],['n3',1,'exp',3],['n',1,'n2',1],['log',1,'n',1]]){
  const r=K.crossover(A,cA,B,cB),fast=ORD.indexOf(A)<ORD.indexOf(B)?'A':'B';eq(r.fast,fast);
  const[F,cF,S,cS]=fast==='A'?[A,cA,B,cB]:[B,cB,A,cA];
  // Kesişimden sonra (N … max(4N, N + 3000)) hızlı sınıf her tam sayıda ucuz; N − 1'de değil.
  for(let n=r.N;n<=Math.max(4*r.N,r.N+3000);n++)if(!cheaper(F,cF,S,cS,n))assert.fail(`${A}/${B}: n=${n} öne geçmeli`);checks++;
  if(r.N>2)ok(!cheaper(F,cF,S,cS,r.N-1),`${A}/${B}: N − 1 = ${r.N-1} hâlâ pahalı olmalı`);
  if(r.nStar!==null){ok(r.nStar<=r.N&&r.nStar>r.N-1-1e-9,'n* ile N tutarlı');}}
// Kapalı biçimler: c n² ile n³ tam n = c'de eşit, N = c + 1; n² ile c n log₂ n kökü n = c log₂ n.
for(const c of[2,5,10,37,100]){const r=K.crossover('n2',c,'n3',1);near(r.nStar,c,1e-9*c);eq(r.N,c+1);}
for(const c of[8,30,100]){const r=K.crossover('n2',1,'nlogn',c);near(r.nStar,c*Math.log2(r.nStar),1e-6*r.nStar);}
{const r=K.crossover('n2',1,'nlogn',30);eq(r.N,237);near(r.nStar,236.587,1e-3);eq(K.crossover('exp',1,'n3',1000).N,24);eq(K.crossover('n',1,'log',100).N,997);
  ok(K.crossover('n2',3,'n2',5).same);eq(K.crossover('n2',3,'n2',5).fast,'A');eq(K.crossover('n',2,'n',2).fast,null);eq(K.crossover('log',1,'fact',1).fromStart,true);}
assert.throws(()=>K.crossover('n',0,'n2',1));assert.throws(()=>K.crossover('x',1,'n2',1));checks+=2;
// Bütçe: f(n) ≤ B < f(n + 1), BigInt ile; n log₂ n için komşu denetimi.
for(const R of[10n**6n,10n**9n,10n**12n])for(const t of K.SPANS){const B=R*BigInt(t);
  for(const id of['n','n2','n3','exp','fact']){const b=K.budget(id,B);eq(b.kind,'int');ok(exactCost(id,b.n)<=B&&exactCost(id,b.n+1n)>B,`${id} bütçe ${B}`);}
  const l=K.budget('log',B);eq(l.kind,'pow2');eq(l.exp,B);
  const nl=K.budget('nlogn',B);if(nl.kind==='int'){const n=Number(nl.n);ok(n*Math.log2(n)<=Number(B)*(1+1e-12)&&(n+1)*Math.log2(n+1)>Number(B)*(1-1e-12));}else near(nl.n*Math.log2(nl.n)/Number(B),1,1e-9);}
{const B=10n**9n;eq(K.budget('n2',B).n,31622n);eq(K.budget('n3',B).n,1000n);eq(K.budget('exp',B).n,29n);eq(K.budget('fact',B).n,12n);eq(K.budget('nlogn',B).n,39620077n);
  const Y=B*31557600n;eq(K.budget('exp',Y).n,54n);eq(K.budget('exp',Y*1000n).n,64n);eq(K.budget('fact',Y).n,18n);eq(K.budget('n3',Y).n,316010n);}
// Tanıklar: bağımsız tam sayı taraması (BigInt / tam formüller) ve kapalı biçimler.
const Tex={poly:n=>[3n*BigInt(n)**2n+20n*BigInt(n)+500n,BigInt(n)**2n],shift:n=>[2n**BigInt(n+1),2n**BigInt(n)],four:n=>[4n**BigInt(n),2n**BigInt(n)]};
const holdsBig=(key,n,c,dir)=>{const[T,g]=Tex[key](n),[p,q]=c;return dir>0?q*T<=p*g:q*T>=p*g;}; // c = p/q
{const w=K.witness('poly',3,4);eq(w.hi.status,'ok');eq(w.hi.n0,Math.ceil(10+Math.sqrt(600)));eq(w.lo.status,'ok');eq(w.lo.n0,1);ok(w.isO&&w.isOmega);
  for(let n=1;n<=3000;n++){if(holdsBig('poly',n,[4n,1n],1)!==(n>=35))assert.fail('poly üst sınır '+n);if(!holdsBig('poly',n,[3n,1n],-1))assert.fail();}checks++;
  eq(K.witness('poly',3,3).hi.status,'none');const b=K.witness('poly',2.9,3.0001);eq(b.hi.status,'ok');
  // 3n² + 20n + 500 ≤ 3,0001 n² ⇔ 0,0001 n² − 20n − 500 ≥ 0 ⇔ n ≥ (20 + √(400 + 0,2))/0,0002
  eq(b.hi.n0,Math.ceil((20+Math.sqrt(400+4*0.0001*500))/(2*0.0001)));}
{const w=K.witness('shift',2,2);eq(w.hi.status,'ok');eq(w.lo.status,'ok');eq(w.hi.n0,1);eq(w.lo.n0,1);for(let n=1;n<=200;n++)ok(holdsBig('shift',n,[2n,1n],1)&&holdsBig('shift',n,[2n,1n],-1));
  eq(K.witness('shift',2.5,1.5).hi.status,'none');eq(K.witness('shift',2.5,1.5).lo.status,'none');}
{const w=K.witness('four',1,1000);eq(w.hi.status,'none');eq(w.lo.status,'ok');eq(w.lo.n0,1);eq(w.isO,false);
  const w2=K.witness('four',1,1e6);eq(w2.hi.status,'none');for(let n=1;n<=60;n++)if(holdsBig('four',n,[1000000n,1n],1)!==(n<=19))assert.fail('4ⁿ ≤ 10⁶·2ⁿ yalnız n ≤ 19');checks++;}
{const w=K.witness('nlogn',0.1,0.001);eq(w.hi.status,'ok');let last=0;for(let n=2;n<=1e6;n++)if(n*Math.log2(n)>0.001*n*n*(1+1e-12))last=n;eq(w.hi.n0,last+1);eq(w.lo.status,'none');ok(w.isO&&!w.isOmega);}
{const w=K.witness('hundred',0.5,1);eq(w.hi.status,'beyond');near(Math.log2(w.hi.n0Approx),100,1e-6);eq(w.lo.status,'theory');
  // 100 n ≤ 10 n log₂ n ⇔ n ≥ 2¹⁰ = 1024
  const w2=K.witness('hundred',0.5,10);eq(w2.hi.status,'ok');eq(w2.hi.n0,1024);}
{const w=K.witness('osc',0.5,1);eq(w.hi.status,'ok');eq(w.hi.n0,1);eq(w.lo.status,'tail');eq(w.ratio,1);near(w.ratioOdd,1/999999,1e-15);ok(w.isO&&!w.isOmega);eq(K.witness('osc',0.5,0.9).hi.status,'none');}
{const w=K.witness('logsq',2,2);eq(w.hi.status,'ok');eq(w.lo.status,'ok');eq(w.hi.n0,2);const w2=K.witness('square',1,1000);eq(w2.lo.status,'ok');eq(w2.hi.status,'none');}
// Limitler: n = 10¹⁵ civarında oran, kuramın sınırlarına yakın.
for(const[k,p]of Object.entries(K.PAIRS)){const r=[1e15,1e15+1].map(n=>K.ratioAt(k,n));
  if(p.sup===Infinity)ok(Math.max(...r)>1e3,k+' üstten sınırsız');else if(p.sup===0)ok(K.ratioAt(k,1e300)<0.11&&K.ratioAt(k,1e300)<K.ratioAt(k,1e15)&&K.ratioAt(k,1e15)<K.ratioAt(k,1e6),k+' 0a iner');else ok(Math.max(...r)<=p.sup*(1+1e-3)+1e-9,k+' sup');
  if(p.inf===0)ok(Math.min(...r,K.ratioAt(k,1e300))<0.11,k+' inf 0');else if(p.inf<Infinity)near(Math.min(...r),p.inf,1e-3*p.inf,k+' inf');}

/* 2. P ve NP */
const reach=(w,T)=>{let s=new Set([0]);for(const x of w){const t=new Set(s);for(const v of s)if(v+x<=T)t.add(v+x);s=t;}return s.has(T);};
for(const mode of['planted','random'])for(let n=2;n<=16;n++)for(let seed=1;seed<=6;seed++){const I=K.subsetInstance(n,seed,mode);eq(K.subsetInstance(n,seed,mode).w.join(),I.w.join(),'tohum yinelenebilir');
  ok(I.w.every(x=>Number.isInteger(x)&&x>=1&&x<=2**n));const b=K.subsetBrute(I.w,I.T);eq(b.found,reach(I.w,I.T),'kaba kuvvet ile DP aynı yanıtı vermeli');
  ok(b.examined>=1&&b.examined<=2**n);if(!b.found)eq(b.examined,2**n);else{const v=K.verifySubset(I.w,I.T,b.mask);ok(v.ok);eq(v.ops,n+1);ok(!K.verifySubset(I.w,I.T,b.mask^1).ok,'bir bit çevrilince red');}
  if(mode==='planted')ok(b.found);}
// Gray kodu her alt kümeyi tam bir kez ziyaret eder: çözümsüz örnekte (T > toplam) 2ⁿ aday.
for(let n=1;n<=18;n++){const w=Array.from({length:n},(_,i)=>i+1);eq(K.subsetBrute(w,n*(n+1)).examined,2**n);}
// 3-SAT: kaba kuvvet, bağımsız özyinelemeli bir aramayla; ilk çözümün sırası ikili sayma sırasıdır.
const evalF=(F,a)=>F.every(c=>c.some(l=>l>0?(a>>(l-1)&1):!(a>>(-l-1)&1)));
for(const n of[3,4,5,6,8,10])for(const ratio of[2,4.3,6])for(let seed=1;seed<=8;seed++){const m=Math.round(ratio*n),F=K.satInstance(n,m,seed);eq(F.length,m);
  ok(F.every(c=>c.length===3&&new Set(c.map(Math.abs)).size===3&&c.every(l=>Math.abs(l)>=1&&Math.abs(l)<=n)));
  let first=-1;for(let a=0;a<2**n;a++)if(evalF(F,a)){first=a;break;}const b=K.satBrute(F,n);eq(b.sat,first>=0);eq(b.tried,first>=0?first+1:2**n);
  if(b.sat){const v=K.verifySat(F,b.a);ok(v.ok&&v.lits>=m&&v.lits<=3*m);eq(K.verifySat(F,b.a^1).ok,evalF(F,b.a^1));}}
{const F=K.satInstance(3,8,1,'unsat');eq(F.length,8);for(let a=0;a<8;a++)ok(!evalF(F,a));for(let s=1;s<=10;s++){const G=K.satInstance(5,1,s,'tight');eq(G.length,7);let c=0;for(let a=0;a<8;a++)if(evalF(G,a))c++;eq(c,1,'7 tümce: x₁…x₃ üzerinde tek çözüm');}}
// Uydurma: kesin 2ⁿ verisinde taban tam 2.
{const xs=[4,5,6,7,8],f=K.fitLine(xs,xs.map(n=>n+3));near(f.b,1,1e-12);near(f.a,3,1e-12);eq(K.fitLine([1],[2]),null);}
{const s=K.series('subset',20,10);ok(s.base>1.85&&s.base<2.1,'alt küme tabanı 2 dolayında: '+s.base);near(s.verSlope,K.fitLine(s.rows.map(r=>Math.log(r.n)),s.rows.map(r=>Math.log(r.n+1))).b,1e-9);
  const t=K.series('subset',20,10,{mode:'random'});ok(t.base>1.9&&t.base<2.1);
  const h=K.series('sat',16,10,{ratio:4.3}),e=K.series('sat',16,10,{ratio:2});ok(h.base>1.9&&h.base<2.1,'m/n=4,3 tabanı '+h.base);ok(e.base<h.base,'kolay oranda taban daha küçük');ok(e.rows.every(r=>r.satFrac===1));
  near(s.base,1.953,1e-3);near(h.base,1.999,1e-3);near(e.base,1.909,1e-3);}

/* 3. İndirgeme: bağımsız çizge kuruluşu ve 2^V alt küme taramasıyla */
const bruteAlpha=(nv,E)=>{let best=0;for(let S=0;S<2**nv;S++){let okS=true;for(const[u,v]of E)if(S>>u&1&&S>>v&1){okS=false;break;}if(okS){let c=0;for(let x=S;x;x&=x-1)c++;if(c>best)best=c;}}return best;};
let satSeen=0,unsatSeen=0;
for(let k=1;k<=240;k++){const n=3+k%3,mode=k%3===0?'unsat':k%3===1?'tight':'random',m=mode==='random'?2+k%5:0,F=K.satInstance(n,m||1,k,mode),R=K.reduce(F),M=F.length;
  eq(R.V.length,3*M);const E=[];for(let u=0;u<3*M;u++)for(let v=u+1;v<3*M;v++){const cu=Math.floor(u/3),cv=Math.floor(v/3),lu=F[cu][u%3],lv=F[cv][v%3];if(cu===cv||lu===-lv)E.push([u,v]);}
  eq(R.E.length,E.length);eq(R.tri,3*M);
  const I=K.maxIndependent(R.V.length,R.adj),sat=F.length&&[...Array(2**n).keys()].some(a=>evalF(F,a));
  if(3*M<=18)eq(I.size,bruteAlpha(3*M,E));ok(K.isIndependent(I.set,R.adj));ok(I.size<=M);eq(sat,I.size===M,'φ doyurulabilir ⇔ α = m');
  if(sat){satSeen++;const a=K.satBrute(F,n).a,S=K.isFromAssignment(F,a);eq(K.popcount(S),M);ok(K.isIndependent(S,R.adj));}else unsatSeen++;
  if(I.size===M)ok(evalF(F,K.assignmentFromIS(R,I.set)),'kümeden kurulan atama doyurur');}
ok(satSeen>50&&unsatSeen>50);
{const b=K.reductionBatch(4,5,200,1);eq(b.agree,200);eq(b.fwd,b.sat);eq(b.back,b.sat);eq(b.sat+b.unsat,200);eq(b.unsat,50);}

/* 4. Yaklaşık çözümler */
const permBest=D=>{const n=D.length,rest=[...Array(n-1).keys()].map(i=>i+1);let best=Infinity;const go=(t,left,len)=>{if(!left.length){best=Math.min(best,len+D[t[t.length-1]][0]);return;}for(let i=0;i<left.length;i++){const v=left[i];go([...t,v],left.filter((_,j)=>j!==i),len+D[t[t.length-1]][v]);}};go([0],rest,0);return best;};
const binom=(a,b)=>{let v=1;for(let i=1;i<=b;i++)v=v*(a-b+i)/i;return v;};
for(let n=3;n<=9;n++){let sumForm=n-1;for(let k=2;k<=n-1;k++)sumForm+=binom(n-1,k)*k*(k-1);eq(K.hkTheory(n),sumForm);
  for(let seed=1;seed<=(n<=8?6:2);seed++){const P=K.points(n,seed),D=K.distances(P),H=K.heldKarp(D);eq(H.steps,K.hkTheory(n));near(H.length,permBest(D),1e-9);
    eq(H.tour.length,n);eq(new Set(H.tour).size,n);near(K.tourLength(D,H.tour),H.length,1e-9);
    const nn=K.nearestNeighbour(D),t=K.twoOpt(D,nn.tour);ok(nn.length>=H.length-1e-9&&t.length>=H.length-1e-9&&t.length<=nn.length+1e-12);
    // 2-opt sonucu yerel en iyidir: hiçbir iki kenar değişimi kısaltmaz.
    const T=t.tour;for(let i=0;i<n;i++)for(let k=i+2;k<n;k++){if(i===0&&k===n-1)continue;const d=D[T[i]][T[k]]+D[T[i+1]][T[(k+1)%n]]-D[T[i]][T[i+1]]-D[T[k]][T[(k+1)%n]];if(d<-1e-9)assert.fail('2-opt yerel en iyi değil');}checks++;
    // En yakın komşu: her adımda ziyaret edilmemiş en yakın şehir.
    const seen=new Set([0]);for(let i=1;i<n;i++){const u=nn.tour[i-1],v=nn.tour[i];for(let x=0;x<n;x++)if(!seen.has(x))ok(D[u][v]<=D[u][x]+1e-15);seen.add(v);}}}
{const b=K.tspBatch(8,200,1);ok(b.nn.min>=1-1e-12&&b.two.min>=1-1e-12&&b.two.mean<=b.nn.mean);near(b.nn.max,1.365,1e-3);near(b.two.max,1.086,1e-3);eq(b.optimal2,167);}
const bruteVC=G=>{let best=G.n;for(let S=0;S<2**G.n;S++){if(G.E.every(([u,v])=>S>>u&1||S>>v&1)){let c=0;for(let x=S;x;x&=x-1)c++;best=Math.min(best,c);}}return best;};
let maxRatio=0;for(let s=1;s<=300;s++){const n=4+s%10,p=[0.1,0.2,0.3,0.5,0.8][s%5],G=K.randomGraph(n,p,s),A=K.matchingCover(G),O=K.minVertexCover(G);
  eq(O.size,bruteVC(G));ok(K.isCover(G,O.set));ok(K.isCover(G,A.cover));
  const used=new Set(A.M.flat());eq(used.size,2*A.M.length,'eşleşme kenarları ortak uçsuz');ok(G.E.every(([u,v])=>used.has(u)||used.has(v)),'maksimal');
  ok(A.M.length<=O.size&&O.size<=A.size);if(O.size)maxRatio=Math.max(maxRatio,A.size/O.size);}
ok(maxRatio<=2&&maxRatio>1);
{const v=K.vcBatch(10,0.3,200,1);eq(v.chain,200);eq(v.valid,200);eq(v.max,2);near(v.mean,1.587,1e-3);}
console.log(`G algoritma-karmasikligi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);
      const errors=[];page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
      page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/algoritma-karmasikligi.html`);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{if(e.type==='checkbox')e.checked=v;else e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'||e.type==='checkbox'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content canvas')];return cs.length===6&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true);
      eq(await page.evaluate(()=>Object.isFrozen(ComplexityLab)&&!Object.getOwnPropertyDescriptor(window,'ComplexityLab').writable),true);
      eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.body.innerText)),false,'birleşik aksan işareti yok');
      // 01 · Büyüme
      await is('gCostA','1 000 000');await is('gCostB','298 974');await is('gCross','236,59');await is('gCrossN','237');await has('gStatus','n = 237 için A: 56 169, B: 56 089');
      await is('wN0Hi','35');await is('wN0Lo','1');await is('wRatio','3,00002');await is('wLimit','alt 3 · üst 3');await has('wVerdict','Θ');
      const row=async i=>(await page.locator('#budgetRows tr').nth(i).textContent()).replace(/ /g,' ');ok((await row(3)).includes('31 622')&&(await row(3)).includes('9 295 160'));ok((await row(5)).includes('29')&&(await row(5)).includes('+10 (n = 64)'));ok((await row(6)).includes('+2 (n = 20)'));
      await set('gRate','6');ok((await row(5)).includes('19'));await set('gRate','9');
      await click('gPresetExp');await is('gCross','23,66');await is('gCrossN','24');await is('gMaxOut','100');await click('gPresetLog');await is('gCrossN','997');await is('gMaxOut','10 000');
      await set('gCB','100,0');await is('gCrossN','997');await set('gCA','abc');await is('gCross','—');await has('gInputNote','Geçersiz');await set('gCA','0');await has('gInputNote','Geçersiz');await set('gCA','0,001');await is('gInputNote','');
      await set('gA','n2');await set('gB','n2');await set('gCA','2');await set('gCB','3');await is('gCross','Yok');await has('gStatus','Aynı sınıf');
      await set('gA','log');await set('gB','fact');await set('gCA','1');await set('gCB','1');await has('gCross','n ≥ 2 boyunca önde');
      for(const sc of['lin','log','loglog'])for(const mx of[1,6]){await set('gScale',sc);await set('gMax',mx);}
      await set('wPair','hundred');await set('wLo','0,5');await set('wHi','1');await is('wN0Hi','≈ 1,27 × 10³⁰');await has('wN0Lo','Yok');await has('wVerdict','∉ Ω');
      await set('wHi','10');await is('wN0Hi','1 024');await set('wPair','osc');await set('wHi','1');await is('wN0Hi','1');await is('wN0Lo','Yok');await has('wRatio','(tek)');await set('wPair','poly');await set('wHi','3');await is('wN0Hi','Yok');
      await click('growthReset');await is('gCrossN','237');await is('wN0Hi','35');await is('gMaxOut','1 000');eq(await page.locator('#gA').inputValue(),'n2');await fits();
      await page.locator('#tab-growth').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-np').getAttribute('aria-selected'),'true');
      // 02 · P ve NP
      await is('pTried','30 260');await is('pVer','17');await is('pVerTh','kuram n + 1 = 17');await is('pBase','1,953');await has('pBaseTh','−2,3 %');await is('pWall','n ≈ 31,6 · n ≈ 57,3');await is('pExtra','5 242 064');await has('pCert','kabul eder');
      await set('pCorrupt',true);await has('pCert','reddeder');await set('pCorrupt',false);
      await click('pNo');await is('pTried','65 536');await has('pCert','NP = co-NP olup olmadığı da bilinmiyor');await is('pVer','Sertifika yok');await is('pBase','2,008');
      await click('pSatHard');await is('pTried','211');await is('pVer','99');await is('pBase','1,999');await is('pNOut','14');eq(await page.locator('#pRatioField').isVisible(),true);eq(await page.locator('#pModeField').isVisible(),false);
      await click('pSatEasy');await is('pBase','1,909');await is('pTried','88');await set('pN',18);await is('pNOut','18');await set('pN',4);await set('pSerMax',8);await is('pSerMaxOut','8');
      await set('pProb','subset');await set('pN',22);await is('pNOut','22');await set('pProb','sat');await is('pNOut','18');await is('pSerMaxOut','8');
      await click('npReset');await is('pTried','30 260');await is('pNOut','16');await is('pSerMaxOut','20');await fits();
      await page.locator('#tab-np').focus();await page.keyboard.press('End');eq(await page.locator('#tab-approx').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-red').getAttribute('aria-selected'),'true');
      // 03 · İndirgeme
      await is('rSize','15 düğüm · 23 kenar');await is('rSat','Evet');await is('rSatTried','6 / 16 atama denendi');await is('rAlpha','5');await is('rFwd','Bağımsız, boyut 5');await is('rBack','Formülü doyurur');await is('rBatch','200 / 200');await has('rBatchNote','150 doyurulabilir, 50 doyurulamaz');
      await click('rUnsat');await is('rSat','Hayır');await is('rAlpha','7');await has('rAlphaTh','α < k');await is('rFwd','Atama yok');eq(await page.locator('#rM').isDisabled(),true);
      await click('rTight');await is('rSat','Evet');await is('rAlpha','7');
      await set('rMode','random');await set('rN',6);await set('rM',10);await set('rShow','brute');await is('rSize','30 düğüm · 64 kenar');await is('rAlpha','10');await is('rBatch','200 / 200');await set('rN',3);await set('rM',2);await is('rAlpha','2');
      await click('redReset');await is('rSatTried','6 / 16 atama denendi');eq(await page.locator('#rM').isDisabled(),false);await fits();
      await page.locator('#tab-red').focus();await page.keyboard.press('ArrowRight');
      // 04 · Yaklaşık
      await is('tOpt','2,8594 birim');await is('tHeurLen','3,5379 birim');await has('tRatio','oran 1,2373');await is('tSteps','1 351');await has('tStepsTh','= 1 351 · fark 0');await is('tBatchNN','ort. 1,081 · en çok 1,365');await is('tBatch2','ort. 1,005 · en çok 1,086');
      await set('tHeur','two');await has('tRatio','oran 1,0415');await set('tN',10);await is('tSteps','9 225');await set('tN',4);await is('tSteps','15');
      await is('vApprox','|M| = 4 · 2|M| = 8');await is('vOpt','4');await is('vRatio','2');await is('vBatch','2 · ort. 1,587');await has('vChain','✓');
      await click('vSparse');await is('vPOut','0,1');await set('vN',4);await set('vP',0.05);for(let s=1;s<=100;s++){await set('vSeed',s);if((await read('vRatio')).startsWith('Tanımsız'))break;}await has('vRatio','Tanımsız');await has('vStatus','kenar yok');await set('vN',16);await set('vP',0.9);await has('vChain','✓');
      await click('approxReset');await is('tSteps','1 351');await is('vOpt','4');await is('vPOut','0,3');await fits();
      // R tuşu ve Home
      await set('tN',5);await page.locator('h1').click();await page.keyboard.press('r');await is('tNOut','8');
      await page.locator('#tab-approx').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-growth').getAttribute('aria-selected'),'true');
      for(const t of['np','red','approx','growth']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);
        eq(assertCanvasDrawn(await canvasInk(page,'#panel-'+t+' canvas'),{minDistinct:3,label:t+' tuvali'}),true,t+' tuvali boş');}
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G algoritma-karmasikligi: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
