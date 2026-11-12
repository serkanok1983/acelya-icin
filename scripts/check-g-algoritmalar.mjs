// G · algoritmalar: çekirdek, sayfanın kendi formüllerini yinelemeyen referanslarla sınanır
// (kaba kuvvet, kapalı biçimler, Floyd–Warshall, yol sayımı, Monte Carlo). `--browser` gerçek arayüzü dener.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../algoritmalar.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const context={};vm.createContext(context);vm.runInContext(source+';globalThis.K=AlgoLab;',context);
const K=context.K;let checks=0;
const eq=(a,b,msg)=>{if(msg===undefined)assert.equal(a,b);else assert.equal(a,b,msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b}`);checks++;};
const ALGS=['bubble','insertion','selection','merge','quick','heap'],lg=Math.log2;
ok(Object.isFrozen(K));

/* 1. Sıralama: doğruluk, olay kaydı, bağımsız sayımlar */
const invBrute=a=>{let c=0;for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)if(a[i]>a[j])c++;return c;};
// Bağımsız, sade sayaçlar (sayfanın kodundan ayrı yazıldı).
function refBubble(a){a=a.slice();let c=0,s=0,end=a.length-1;for(;;){let moved=false;for(let i=0;i<end;i++){c++;if(a[i]>a[i+1]){[a[i],a[i+1]]=[a[i+1],a[i]];s++;moved=true;}}end--;if(!moved||end<1)break;}return{c:a.length<2?0:c,w:2*s};}
function refInsertion(a){a=a.slice();let c=0,w=0;for(let i=1;i<a.length;i++){const key=a[i];let j=i;while(j>0){c++;if(a[j-1]>key){a[j]=a[j-1];w++;j--;}else break;}a[j]=key;w++;}return{c,w};}
function refSelection(a){a=a.slice();let c=0,w=0;for(let i=0;i+1<a.length;i++){let m=i;for(let j=i+1;j<a.length;j++){c++;if(a[j]<a[m])m=j;}if(m!==i){[a[i],a[m]]=[a[m],a[i]];w+=2;}}return{c,w};}
const factorialLog2=n=>{let s=0;for(let i=2;i<=n;i++)s+=lg(i);return s;};
for(const kind of['random','sorted','reversed','few'])for(let n=1;n<=48;n+=(n<12?1:5))for(let seed=1;seed<=5;seed++){
  const keys=K.makeInput(n,kind,seed);eq(keys.length,n);
  if(kind!=='few')eq(keys.slice().sort((a,b)=>a-b).join(),Array.from({length:n},(_,i)=>i+1).join());
  eq(K.makeInput(n,kind,seed).join(),keys.join(),'tohum yinelenebilir olmalı');
  const st=K.inputStats(keys);eq(st.inv,invBrute(keys));
  if(st.distinct)eq(st.lower,n<2?0:Math.ceil(factorialLog2(n)-1e-9));
  const want=keys.slice().sort((a,b)=>a-b).join();
  for(const alg of ALGS)for(const pivot of alg==='quick'?['last','mid','random']:['last']){
    const r=K.sortRun(alg,keys,{pivot,seed,trace:true}),plain=K.sortRun(alg,keys,{pivot,seed});
    eq(r.keys.join(),want,alg+' sıralamalı');eq(plain.comparisons,r.comparisons);eq(plain.writes,r.writes);
    eq(r.ids.slice().sort((a,b)=>a-b).join(),keys.map((_,i)=>i).join(),'kimlikler bir permütasyon');
    ok(r.ids.every((id,i)=>keys[id]===r.keys[i]));
    // Olay kaydını baştan oynat: aynı son dizi ve aynı sayaçlar çıkmalı.
    const A=keys.slice(),I=keys.map((_,i)=>i);let c=0,w=0;for(let e=0;e<r.events.length;e+=3){const[t,a,b]=[r.events[e],r.events[e+1],r.events[e+2]];if(t===0)c++;else if(t===1){[A[a],A[b]]=[A[b],A[a]];[I[a],I[b]]=[I[b],I[a]];w+=2;}else{A[a]=keys[b];I[a]=b;w++;}}
    eq(A.join(),want);eq(I.join(),r.ids.join());eq(c,r.comparisons);eq(w,r.writes);
    const th=K.sortTheory(alg,keys,pivot);
    for(const[m,t]of[[r.comparisons,th.cmp],[r.writes,th.wr]]){if(t.type==='exact')eq(m,t.value,`${alg}/${kind}/${pivot}/n=${n}: ${t.text}`);else if(t.type==='bounds')ok((t.lo===null||m>=t.lo)&&m<=t.hi,`${alg} sınır dışı`);}
    const sb=K.stability(r.keys,r.ids);if(['bubble','insertion','merge'].includes(alg))eq(sb.broken,0,alg+' kararlı olmalı');
    if(alg==='bubble'){const ref=refBubble(keys);eq(r.comparisons,ref.c);eq(r.writes,ref.w);eq(r.writes,2*invBrute(keys));}
    if(alg==='insertion'){const ref=refInsertion(keys);eq(r.comparisons,ref.c);eq(r.writes,ref.w);}
    if(alg==='selection'){const ref=refSelection(keys);eq(r.comparisons,ref.c);eq(r.writes,ref.w);eq(r.comparisons,n*(n-1)/2);}
    const q=n*(n-1)/2;
    if(kind==='sorted'){if(alg==='bubble'||alg==='insertion')eq(r.comparisons,Math.max(0,n-1));if(alg==='quick'&&pivot==='last')eq(r.comparisons,q);if(alg!=='heap'&&alg!=='merge'&&!(alg==='quick'&&pivot!=='last'))eq(r.writes,alg==='insertion'?Math.max(0,n-1):0);}
    if(kind==='reversed'){if(alg==='bubble'||alg==='insertion')eq(r.comparisons,q);if(alg==='quick'&&pivot==='last')eq(r.comparisons,q);}
    if(alg==='merge'&&n>1){const up=Math.ceil(lg(n));ok(r.comparisons<=n*up-2**up+1,'birleştirmeli en kötü durum kapalı biçimi');}
    if(alg==='heap'&&n>1)ok(r.comparisons<=2*n*lg(n)+2*n,'yığın 2n log n + 2n altında');
  }}
// Birleştirmeli sıralama: 2'nin kuvvetlerinde kapalı biçimler.
for(const k of[1,2,3,4,5,6]){const n=2**k;eq(K.sortRun('merge',K.makeInput(n,'sorted',1)).comparisons,n/2*k);eq(K.sortRun('merge',K.makeInput(n,'reversed',1)).comparisons,n/2*k);eq(K.sortRun('merge',K.makeInput(n,'random',3)).writes,n*k);eq(K.sizeSum('mergeWorst',n),n*k-n+1);}
// Kararsız yöntemler: az farklı değerli girdilerin çoğunda eşit anahtar sırası bozulmalı.
for(const alg of['selection','quick','heap']){let broken=0;for(let s=1;s<=40;s++){const k=K.makeInput(16,'few',s),r=K.sortRun(alg,k,{pivot:'last',seed:s});if(K.stability(r.keys,r.ids).broken)broken++;}ok(broken>=30,alg+' kararsız olmalı');}
// Ortalamalar: 4 000 koşuluk Monte Carlo, kapalı biçimlerle.
const H=n=>{let h=0;for(let i=1;i<=n;i++)h+=1/i;return h;};
for(const n of[8,32,64]){const q=n*(n-1)/2,runs=4000,tol=m=>Math.max(.5,.012*m);
  const avg=(alg,kind,pivot)=>K.averageRun(alg,n,kind,pivot,1000,runs);
  let a=avg('insertion','random','last');near(a.comparisons,q/2+n-H(n),tol(q/2));near(a.writes,q/2+n-1,tol(q/2));
  a=avg('selection','random','last');near(a.writes,2*(n-H(n)),.5);
  a=avg('bubble','random','last');near(a.writes,q,tol(q));
  a=avg('quick','random','last');near(a.comparisons,2*(n+1)*H(n)-4*n,tol(2*n*H(n)));
  a=avg('quick','random','mid');near(a.comparisons,2*(n+1)*H(n)-4*n,tol(2*n*H(n)));
  a=avg('quick','sorted','random');near(a.comparisons,2*(n+1)*H(n)-4*n,tol(2*n*H(n)));
  a=avg('merge','random','last');near(a.comparisons,K.sortTheory('merge',K.makeInput(n,'random',1),'last').avg.cmp,tol(n*lg(n)));ok(a.comparisons>=factorialLog2(n)-1e-9,'ortalama, log2 n! altına inemez');
  a=avg('heap','random','last');ok(a.comparisons>=factorialLog2(n)&&a.comparisons<=K.heapBounds(n).comparisons);}

/* 2. Arama */
const depthSum=(lo,hi,d)=>lo>hi?0:d+depthSum(lo,((lo+hi)>>1)-1,d+1)+depthSum(((lo+hi)>>1)+1,hi,d+1);
for(const dist of['uniform','skew'])for(let n=1;n<=260;n+=(n<40?1:13)){
  const a=K.makeSorted(n,dist,5);ok(a.every((v,i)=>Number.isInteger(v)&&(i===0||v>a[i-1])),'artan tam sayılar');
  const th=K.searchTheory(n);eq(th.binaryWorst,Math.ceil(lg(n+1)-1e-12));near(th.binaryHitMean,depthSum(0,n-1,1)/n,1e-12);
  for(const[fn,name]of[[K.linearSearch,'lin'],[K.binarySearch,'bin'],[K.interpolationSearch,'int']]){
    a.forEach((t,i)=>{const r=fn(a,t);if(!r.found||r.index!==i||r.steps!==r.probes.length||r.steps>n)assert.fail(name+' bulamadı');if(name==='lin'&&r.steps!==i+1)assert.fail('doğrusal adım');});
    for(let g=0;g<=n;g++){const t=g<n?a[g]-.5:a[n-1]+.5,r=fn(a,t);if(r.found||r.steps>n)assert.fail(name+' yanlış buldu');if(name==='lin'&&r.steps!==n)assert.fail();if(name==='bin'&&(r.steps>th.binaryWorst||r.steps<th.binaryWorst-1))assert.fail('ikili ıska adımı');}
    checks+=2;const st=K.searchStats(a,fn);
    if(name==='lin'){near(st.hitMean,(n+1)/2,1e-12);eq(st.hitMax,n);eq(st.missMax,n);}
    if(name==='bin'){near(st.hitMean,th.binaryHitMean,1e-12);eq(st.hitMax,th.binaryWorst);near(st.missMean,th.binaryMissMean,1e-12);eq(st.missMax,th.binaryWorst);}
  }}
{const u=K.searchStats(K.makeSorted(255,'uniform',7),K.interpolationSearch),s=K.searchStats(K.makeSorted(255,'skew',7),K.interpolationSearch);ok(u.hitMean<4,'düzgün dizide ara değerleme ikiliden iyi');ok(s.hitMean>30,'çarpık dizide ara değerleme kötü');}

// Doğrulayıcı eki: “yok” ortalaması ve en kötüsü, arayüzün seçtirdiği hedeflerle (k = 0: a[0] − 0,5; k ≥ 1: a[k−1] + 0,5) aynı kümede ölçülür.
for(const[n,dist]of[[31,'uniform'],[255,'skew'],[100,'uniform']])for(const fn of[K.linearSearch,K.binarySearch,K.interpolationSearch]){const a=K.makeSorted(n,dist,7);let s=0,m=0;for(let k=0;k<=n;k++){const v=fn(a,k===0?a[0]-.5:a[k-1]+.5).steps;s+=v;if(v>m)m=v;}const st=K.searchStats(a,fn);eq(st.missMax,m);near(st.missMean,s/(n+1),1e-12);}
/* 3. Çizgeler: Floyd–Warshall ve basit yol sayımıyla */
function floyd(g,unit){const n=g.n,d=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?0:Infinity));for(const e of g.edges){if(!e.on)continue;const w=unit?1:e.w;d[e.u][e.v]=Math.min(d[e.u][e.v],w);if(!e.directed)d[e.v][e.u]=Math.min(d[e.v][e.u],w);}for(let k=0;k<n;k++)for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(d[i][k]+d[k][j]<d[i][j])d[i][j]=d[i][k]+d[k][j];return d;}
function cheapestSimplePath(g,s,t){let best=Infinity;const seen=new Array(g.n).fill(false),go=(u,c)=>{if(u===t){best=Math.min(best,c);return;}seen[u]=true;for(const e of g.edges){if(!e.on)continue;if(e.u===u&&!seen[e.v])go(e.v,c+e.w);if(!e.directed&&e.v===u&&!seen[e.u])go(e.u,c+e.w);}seen[u]=false;};go(s,0);return best;}
for(let seed=1;seed<=25;seed++){const g=K.graphPreset('grid',seed);eq(g.n,12);eq(g.edges.length,17);ok(g.edges.every(e=>e.w>=1&&e.w<=9&&Number.isInteger(e.w)));
  if(seed%3===0){g.edges[seed%17].on=false;g.edges[(seed*5)%17].w=0;}
  const fw=floyd(g),fu=floyd(g,true);
  for(const s of[0,5,11]){const dj=K.traverse(g,'dijkstra',s),bf=K.bellmanFord(g,s),bu=K.bellmanFord(g,s,true),b=K.traverse(g,'bfs',s),d=K.traverse(g,'dfs',s);
    eq(bf.negativeCycle,false);
    for(let t=0;t<g.n;t++){eq(dj.dist[t],fw[s][t]);eq(bf.dist[t],fw[s][t]);eq(b.dist[t],fu[s][t]);eq(bu.dist[t],fu[s][t]);ok(d.dist[t]>=fu[s][t]);
      const p=K.pathTo(dj.parent,s,t);eq(K.pathCost(g,p),fw[s][t]);const pb=K.pathTo(b.parent,s,t);eq(pb.length-1,fu[s][t]);ok(K.pathCost(g,pb)>=fw[s][t]);}
    for(const r of[dj,b,d]){eq(r.order.length,12);eq(new Set(r.order).size,12);eq(r.order[0],s);eq(r.frontier.length,12);eq(r.frontier[11],0);eq(r.maxFrontier,Math.max(...r.frontier));}
    ok(dj.order.every((u,i)=>i===0||dj.dist[dj.order[i-1]]<=dj.dist[u]),'Dijkstra uzaklık sırasıyla kesinleştirir');ok(b.order.every((u,i)=>i===0||b.dist[b.order[i-1]]<=b.dist[u]),'BFS katman katman');eq(b.examined,2*g.edges.filter(e=>e.on).length);}
  if(seed<=4)eq(K.bellmanFord(g,0).dist[11],cheapestSimplePath(g,0,11));}
{const g=K.graphPreset('detour'),b=K.traverse(g,'bfs',0),dj=K.traverse(g,'dijkstra',0);eq(K.pathTo(b.parent,0,5).length-1,2);eq(K.pathCost(g,K.pathTo(b.parent,0,5)),15);eq(dj.dist[5],8);eq(K.pathTo(dj.parent,0,5).length-1,4);eq(cheapestSimplePath(g,0,5),8);}
{const g=K.graphPreset('negative'),dj=K.traverse(g,'dijkstra',0),bf=K.bellmanFord(g,0);eq(bf.negativeCycle,false);
  for(let t=0;t<g.n;t++)eq(bf.dist[t],cheapestSimplePath(g,0,t));eq(bf.dist.join(),'0,1,5,2,4');eq(dj.dist.join(),'0,2,5,3,5');eq(dj.dist.filter((d,i)=>d!==bf.dist[i]).length,3);}
{const g=K.graphPreset('negcycle'),bf=K.bellmanFord(g,0);eq(bf.negativeCycle,true);eq(bf.undefinedNodes.join(),'false,true,true,true');eq(K.traverse(g,'dijkstra',0).order.length,4);
  const u=K.graphPreset('grid',7);u.edges[0].w=-1;eq(K.bellmanFord(u,0).negativeCycle,true,'yönsüz negatif kenar bir negatif çevrimdir');
  const off=K.graphPreset('negative');off.edges[3].on=false;eq(K.traverse(off,'bfs',0).dist[4],Infinity);eq(K.pathTo(K.traverse(off,'bfs',0).parent,0,4),null);}
assert.throws(()=>K.graphPreset('yok'));assert.throws(()=>K.sortRun('yok',[1]));assert.throws(()=>K.makeInput(4,'yok',1));checks+=3;

/* 4. Büyüme, Fibonacci, LCS */
near(K.fitSlope([8,16,32,64],[8,16,32,64].map(n=>3*n**1.7)),1.7,1e-12);eq(K.fitSlope([8],[5]),null);
{const ns=[8,16,32,64,128,256,512,1024],slope=id=>K.fitSlope(ns,ns.map(n=>K.growthMeasure(id,n,7)));
  for(const id of['bubble','insertion','selection']){const s=slope(id);ok(s>1.9&&s<2.1,id+' eğimi 2 dolayında');}
  for(const id of['merge','quick','heap']){const s=slope(id);ok(s>1.15&&s<1.45,id+' eğimi 1 ile 2 arasında, 1\'e yakın');}
  near(slope('linear'),K.fitSlope(ns,ns.map(n=>(n+1)/2)),1e-12);ok(slope('binary')<.35);
  near(slope('selection'),K.fitSlope(ns,ns.map(n=>n*(n-1)/2)),1e-12);
  for(const id of['insertion','merge','quick'])near(slope(id),K.fitSlope(ns,ns.map(n=>K.growthTheory(id,n))),.05,id+' ölçülen eğim kuram eğrisine yakın');}
{let a=0n,b=1n;const F=[];for(let i=0;i<40;i++){F.push(a);[a,b]=[b,a+b];}
  for(let n=0;n<=24;n++){const nv=K.fibNaive(n),mm=K.fibMemo(n);eq(BigInt(nv.value),F[n]);eq(BigInt(nv.calls),2n*F[n+1]-1n);eq(BigInt(mm.value),F[n]);eq(mm.calls,n<2?1:2*n-1);eq(BigInt(K.fibValue(n)),F[n]);}
  eq(K.fibNaive(20).calls,21891);eq(K.fibValue(33)*2-1,7049155);near(K.fibNaive(24).calls/K.fibNaive(23).calls,(1+Math.sqrt(5))/2,1e-4);}
const isSubseq=(s,t)=>{let j=0;for(const c of t)if(j<s.length&&s[j]===c)j++;return j===s.length;};
for(const[a,b,len]of[['AGGTAB','GXTXAYB',4],['ABCBDAB','BDCABA',4],['ALGORITMA','LOGARITMA',7],['','ABC',0],['ABC','',0],['AAAA','AA',2],['ABCDEFGHIJ','KLMNOPRSTU',0],['ÇİĞ','ÇIĞ',2]]){const r=K.lcs(a,b);eq(r.length,len,a+'/'+b);eq(K.lcsBrute(a,b),len);eq(Array.from(r.text).length,len);ok(isSubseq(Array.from(r.text),Array.from(a))&&isSubseq(Array.from(r.text),Array.from(b)));eq(K.lcsNaiveCalls(a,b,5e6).value,len);}
{const r=K.rng(99),word=()=>Array.from({length:1+Math.floor(r()*9)},()=>'ABCD'[Math.floor(r()*4)]).join('');for(let i=0;i<150;i++){const a=word(),b=word(),t=K.lcs(a,b);eq(t.length,K.lcsBrute(a,b));ok(isSubseq(Array.from(t.text),Array.from(a))&&isSubseq(Array.from(t.text),Array.from(b)));eq(t.text.length,t.length);}}
{const binom=(n,k)=>{let v=1;for(let i=1;i<=k;i++)v=v*(n-k+i)/i;return Math.round(v);};for(const[m,n]of[[1,1],[3,4],[6,6],[10,10]]){const a='ABCDEFGHIJ'.slice(0,m),b='KLMNOPRSTU'.slice(0,n);eq(K.lcsNaiveCalls(a,b,5e6).calls,2*binom(m+n,m)-1);}eq(K.lcsNaiveCalls('ABCDEFGHIJ','KLMNOPRSTU',1000).capped,true);}
console.log(`G algoritmalar: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/algoritmalar.html`);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>{eq(await read(id),t,id);},has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      // Her denetimin etiketi, her tuvalin rolü ve adı var.
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'');
      eq(await page.evaluate(()=>{const cs=[...document.querySelectorAll('.app-content canvas')];return cs.length===6&&cs.every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'));}),true);
      eq(await page.evaluate(()=>Object.isFrozen(AlgoLab)&&!Object.getOwnPropertyDescriptor(window,'AlgoLab').writable),true);
      // 01 · Sıralama: varsayılan durum
      await is('sortCmp','175');await is('sortCmpTh','103 … 496');await is('sortCmpDiff','sınır içinde');await is('sortWr','126');await is('sortAvgCmp','139,48');await is('sortAvgCmpTh','139,86');await is('sortAvgCmpDiff','−0,27 %');await is('sortInv','311 / 496');await has('sortLower','118');await is('sortOk','Evet');await has('sortStable','Sınanamaz');await is('sortPosOut','0 / 238');
      // Koşu sırasında Başlat'a yeniden basmak durumu bozmaz.
      await set('sortSpeed',8);await click('sortStart');await page.waitForTimeout(60);await click('sortStart');await page.waitForTimeout(60);await click('sortStart');await page.waitForFunction(()=>document.getElementById('sortNow').textContent.includes('Koşu bitti'),null,{timeout:8000});
      await has('sortNow','175 karşılaştırma, 126 yazma');await is('sortPosOut','238 / 238');eq(await page.locator('#sortPause').isDisabled(),true);
      await click('sortStart');await click('sortPause');const mid=await read('sortPosOut');await page.waitForTimeout(120);eq(await read('sortPosOut'),mid,'duraklatılınca ilerlemez');await click('sortEnd');await has('sortNow','175 karşılaştırma, 126 yazma');
      await set('sortPos',0);await click('sortStep');await is('sortPosOut','1 / 238');await has('sortNow','1 karşılaştırma, 0 yazma');
      await click('sortWorst');await is('sortCmp','496');await is('sortCmpTh','496');await is('sortCmpDiff','0');await is('sortWr','0');await has('sortStatus','n² davranışı');await is('sortAvgCmp','—');
      await set('sortPivot','mid');await is('sortCmp','103');await is('sortCmpTh','103');await is('sortCmpDiff','0');await set('sortPivot','random');await has('sortAvgCmpTh','139,86');
      await click('sortStab');await is('sortCmp','66');await is('sortCmpTh','66');await has('sortStable','Bozuldu');await has('sortStatus','kararlı değil');await set('sortAlg','merge');await has('sortStable','Korundu');await has('sortStatus','yöntem kararlı');eq(await page.locator('#sortPivot').isDisabled(),true);
      for(const alg of['bubble','insertion','selection','merge','quick','heap'])for(const kind of['random','sorted','reversed','few'])for(const n of[4,64]){await set('sortAlg',alg);await set('sortKind',kind);await set('sortN',n);const d=await read('sortCmpDiff');ok(d==='0'||d==='sınır içinde',`${alg}/${kind}/${n}: ${d}`);await is('sortOk','Evet');}
      await set('sortAlg','selection');await set('sortKind','random');await set('sortN',64);await is('sortCmp','2 016');await is('sortCmpTh','2 016');
      await click('sortReset');await is('sortCmp','175');await is('sortNOut','32');await is('sortSpeedOut','50 işlem/s');await fits();
      // Klavye: sekmeler, boşluk, R
      await page.locator('#tab-sort').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-search').getAttribute('aria-selected'),'true');
      // 02 · Arama
      await is('linNow','22');await is('linNowTh','22');await is('binNow','4');await is('binMean','4,161');await is('binMeanTh','4,161');await is('binMax','5');await is('binMaxTh','5');await is('searchWorst','5');await is('searchDiffMean','0');await is('searchDiffMax','0');await is('linMean','16');await is('intMean','1,613');
      await set('seaMode','miss');await is('linNow','31');await is('binMean','5');await is('binMeanTh','5');await has('searchTarget','dizide yok');await set('seaK',0);await is('intNow','0');await is('linNow','31');
      await click('seaBig');await is('binMax','8');await is('binMaxTh','8');await is('binMean','7,031');await is('binMeanTh','7,031');await has('searchStatus','kötü kestiriyor');await is('intMean','67,89');
      await click('seaFirst');await is('linNow','1');await click('seaLast');await is('linNow','255');await click('seaMid');await is('binNow','1');
      await set('seaN',1);await is('binMax','1');await is('linNow','1');await is('seaKOut',(await read('seaKOut')));await has('searchStatus','Tek elemanlı');await set('seaMode','miss');await is('binNow','1');
      for(const n of[2,3,7,8,100,255]){await set('seaN',n);await is('searchDiffMean','0');await is('searchDiffMax','0');}
      await click('searchReset');await is('linNow','22');await is('seaNOut','31');await fits();
      await page.locator('#tab-search').focus();await page.keyboard.press('End');eq(await page.locator('#tab-growth').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-graph').getAttribute('aria-selected'),'true');
      // 03 · Çizgeler
      await is('grCost','14');await is('grCostRef','14');await is('grCostDiff','0');await is('grHops','5');await is('grBad','0 / 12');await is('grOrder','A B E F I J C G K H L D');await is('grPath','A → E → F → J → K → L');await is('grOps','4 · 34');
      await set('grAlg','bfs');await is('grHops','5');await is('grHopsRef','5');await is('grCost','25');await is('grCostRef','14');await is('grCostDiff','+11');await is('grBad','0 / 12');
      await set('grAlg','dfs');await is('grHops','11');await is('grCost','46');await has('graphStatus','en kısası olması gerekmez');
      await set('grSpeed',10);await click('grStart');await page.waitForTimeout(50);await click('grStart');await page.waitForFunction(()=>document.getElementById('grNow').textContent.includes('koşu bitti'),null,{timeout:8000});await is('grPosOut','12 / 12');await set('grPos',0);await has('grNow','Henüz');await click('grStep');await is('grPosOut','1 / 12');
      await set('grPreset','detour');await set('grAlg','bfs');await is('grHops','2');await is('grCost','15');await is('grCostRef','8');await set('grAlg','dijkstra');await is('grCost','8');await is('grHops','4');await is('grHopsDiff','+2');eq(await page.locator('#grSeed').isDisabled(),true);
      await set('grPreset','negative');await is('grCost','5');await is('grCostRef','4');await is('grCostDiff','+1');await is('grBad','3 / 5');await has('graphStatus','yanlış');
      await set('grEdge',2);await set('grWeight',4);await is('grCostDiff','0');await is('grBad','0 / 5');await set('grEdge',3);await page.locator('#grOn').uncheck();await is('grCost','Ulaşılamıyor');await is('grCostDiff','—');await has('graphStatus','ulaşılamıyor');ok((await read('graphStatus')).startsWith(({bfs:'BFS',dfs:'DFS',dijkstra:'Dijkstra'})[await page.locator('#grAlg').inputValue()]),'durum satırı yöntemi adıyla anmalı');
      await set('grPreset','negcycle');await has('grCostRef','Tanımsız');await is('grCostDiff','—');await has('graphStatus','negatif çevrim');ok((await read('graphStatus')).startsWith(({bfs:'BFS',dfs:'DFS',dijkstra:'Dijkstra'})[await page.locator('#grAlg').inputValue()]),'durum satırı yöntemi adıyla anmalı');await set('grTo',0);await has('graphStatus','aynı düğüm');ok((await read('graphStatus')).startsWith(({bfs:'BFS',dfs:'DFS',dijkstra:'Dijkstra'})[await page.locator('#grAlg').inputValue()]),'durum satırı yöntemi adıyla anmalı');
      await set('grPreset','grid');await set('grWeight',-1);await has('grCostRef','Tanımsız');await set('grWeight',-9);await set('grWeight',20);await is('grBad','0 / 12');
      const box=await page.locator('#graphCanvas').boundingBox();{const px=box.width<460?30:44;await page.locator('#graphCanvas').click({position:{x:box.width-px-(box.width-2*px)/8,y:30+(box.height-74)/6}});}eq(await page.locator('#grFrom').inputValue(),'3','tuvalde düğüme tıklamak başlangıcı değiştirir');
      await click('graphReset');await is('grCost','14');await is('grSeedOut','7');await fits();
      await page.locator('#tab-graph').focus();await page.keyboard.press('ArrowRight');
      // 04 · Büyüme ve dinamik programlama
      await is('slope-selection','2,023');await is('slopeTh-selection','2,023');await is('slope-linear','0,979');await is('slope-binary','0,252');await is('slopeTh-bubble','—');await is('groMaxOut','1 024');
      await is('fibVal','6 765');await is('fibNaive','21 891');await is('fibNaiveTh','21 891');await is('fibNaiveDiff','0');await is('fibMemo','39');await is('fibMemoTh','39 · fark 0');await is('fibRatio','1,618080');
      await is('lcsLen','7');await is('lcsRef','7 · fark 0');await is('lcsText','LGRITMA');await is('lcsCells','9 × 9 = 81');await is('lcsCalls','50');
      await set('fibN',0);await has('fibRatio','Tanımsız');await is('fibNaive','1');await is('fibNaiveDiff','0');await set('fibN',1);await is('fibMemoTh','1 · fark 0');await set('fibN',32);await is('fibNaive','7 049 155');await is('fibNaiveDiff','0');await is('fibMemo','63');
      await click('lcsNone');await is('lcsLen','0');await is('lcsCalls','369 511');await is('lcsCallsTh','369 511 · fark 0');await is('lcsText','Boş');await click('lcsSame');await is('lcsLen','9');await is('lcsCalls','10');
      await page.locator('#lcsA').fill('');await has('lcsStatus','boş');await is('lcsLen','0');await page.locator('#lcsA').fill('çiğ köfte');await is('lcsCells','8 × 9 = 72');
      await set('groMax',6);await is('groMaxOut','64');await set('groMax',12);await is('groMaxOut','4 096');await is('slope-selection',await read('slopeTh-selection'));
      for(const id of['bubble','insertion','selection','merge','quick','heap','linear','binary'])await page.locator('#gro-'+id).uncheck();await has('growthStatus','Hiçbir yöntem seçili değil');eq(await page.locator('#growthRows tr').count(),0);
      await click('growthReset');await is('slope-selection','2,023');await is('fibVal','6 765');await is('lcsLen','7');eq(await page.locator('#growthRows tr').count(),8);await fits();
      // Boşluk ve R: biçim denetimleri dışında
      await page.locator('#tab-growth').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-sort').getAttribute('aria-selected'),'true');await set('sortN',10);await page.locator('h1').click();await page.keyboard.press('r');await is('sortNOut','32');
      await set('sortSpeed',0);await page.locator('h1').click();await page.keyboard.press(' ');eq(await read('sortPause'),'Duraklat');await page.keyboard.press(' ');eq(await read('sortPause'),'Sürdür');await click('sortReset');
      for(const t of['search','graph','growth','sort']){await click('tab-'+t);await fits();eq(await page.locator('#panel-'+t).isVisible(),true);}
      // Tuvaller boş değil: ilk tuvalde arka plandan farklı piksel var.
      eq(assertCanvasDrawn(await canvasInk(page,'#sortCanvas'),{minDistinct:2,label:'sortCanvas'}),true);
      assert.deepEqual(errors,[]);checks++;await page.close();}
    console.log(`G algoritmalar: ${checks-before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
