// G · cizge-teorisi: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır
// (kaba kuvvet Euler izi araması, bütün 2-renk/k-renk atamaları, alt küme sayımı, bilinen τ değerleri,
// bütün çizgelerin olasılıkla toplanması, bağımsız doğru parçası kesişim testi). `--browser` gerçek arayüzü dener.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../cizge-teorisi.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınır işaretleri gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.GraphLab;let checks=0;
const eq=(a,b,msg)=>{if(msg===undefined)assert.equal(a,b);else assert.equal(a,b,msg);checks++;};
const ok=(c,msg)=>{assert(c,msg);checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol,(msg||'')+` ${a} ≠ ${b}`);checks++;};
ok(Object.isFrozen(K));

/* Bağımsız yardımcılar */
function rng(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};}
function randomMulti(n,m,r,loops=false){const pos=Array.from({length:n},()=>[.05+.9*r(),.05+.9*r()]),edges=[];for(let k=0;k<m;k++){const u=Math.floor(r()*n);let v=Math.floor(r()*n);if(!loops&&v===u)v=(u+1)%n;edges.push([u,v,1+Math.floor(r()*9)]);}return{pos,names:pos.map((_,i)=>String(i+1)),edges};}
function dfsComponents(n,edges){const A=Array.from({length:n},()=>[]);for(const[u,v]of edges){A[u].push(v);A[v].push(u);}const lab=Array(n).fill(-1);let c=0;for(let s=0;s<n;s++){if(lab[s]>=0)continue;const st=[s];lab[s]=c;while(st.length){const x=st.pop();for(const y of A[x])if(lab[y]<0){lab[y]=c;st.push(y);}}c++;}return{c,lab};}
// Kaba kuvvet: her kenarı tam bir kez kullanan bir yürüyüş var mı? (teoremi kullanmaz)
function bruteEulerTrail(n,edges){const m=edges.length;if(!m)return'empty';const used=Array(m).fill(false);let closed=false,open=false;
  const go=(v,k,start)=>{if(k===m){if(v===start)closed=true;else open=true;return;}for(let i=0;i<m;i++){if(used[i])continue;const[a,b]=edges[i];if(a!==v&&b!==v)continue;used[i]=true;go(a===v?b:a,k+1,start);used[i]=false;if(closed&&open)return;}};
  for(let s=0;s<n;s++)go(s,0,s);return closed?'circuit':open?'trail':'none';}
function validWalk(g,s){for(let j=0;j<s.edges.length;j++){const[u,v]=g.edges[s.edges[j]],a=s.verts[j],b=s.verts[j+1];if(!((u===a&&v===b)||(u===b&&v===a)))return false;}return s.verts.length===s.edges.length+1;}
function* combos(m,k){const idx=Array.from({length:k},(_,i)=>i);if(k>m)return;for(;;){yield idx.slice();let j=k-1;while(j>=0&&idx[j]===m-k+j)j--;if(j<0)return;idx[j]++;for(let t=j+1;t<k;t++)idx[t]=idx[t-1]+1;}}
function refTrees(g){const n=g.pos.length,E=g.edges.filter(e=>e[0]!==e[1]);if(n===1)return{count:1,min:0};let count=0,min=Infinity;for(const c of combos(E.length,n-1)){const es=c.map(i=>E[i]);if(dfsComponents(n,es).c===1){count++;min=Math.min(min,es.reduce((s,e)=>s+e[2],0));}}return{count,min:count?min:null};}
function properColoring(g,col){return g.edges.every(([u,v])=>col[u]!==col[v]);}
function bruteChi(g){const n=g.pos.length;if(g.edges.some(e=>e[0]===e[1]))return null;if(!n)return 0;for(let k=1;k<=n;k++){const col=Array(n).fill(0);for(;;){if(properColoring(g,col))return k;let i=0;while(i<n&&col[i]===k-1){col[i]=0;i++;}if(i===n)break;col[i]++;}}return n;}
function segCross(p,q,r,s){const o=(a,b,c)=>Math.sign((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]));return o(p,q,r)*o(p,q,s)<0&&o(r,s,p)*o(r,s,q)<0;}
function refCrossings(g){let c=0;const E=g.edges;for(let i=0;i<E.length;i++)for(let j=i+1;j<E.length;j++){const[a,b]=E[i],[x,y]=E[j];if(a===x||a===y||b===x||b===y)continue;if(segCross(g.pos[a],g.pos[b],g.pos[x],g.pos[y]))c++;}return c;}

/* 1. El sıkışma, bileşenler, Euler (kaba kuvvet iz aramasıyla) */
for(let seed=1;seed<=400;seed++){const r=rng(seed),n=2+Math.floor(r()*5),m=Math.floor(r()*8),g=randomMulti(n,m,r,seed%3===0);
  const deg=Array(n).fill(0);for(const[u,v]of g.edges){if(u===v)deg[u]+=2;else{deg[u]++;deg[v]++;}}
  const e=K.euler(g);eq(e.deg.join(),deg.join());eq(e.sumDeg,2*m);ok(e.odd.length%2===0);
  const d=dfsComponents(n,g.edges);eq(e.comp.count,d.c);eq(e.comp.bfs,d.c);
  const b=bruteEulerTrail(n,g.edges.map(x=>[x[0],x[1]]));
  const want=b==='empty'?'empty':b==='circuit'?'circuit':b==='trail'?'trail':null;
  if(want)eq(e.kind,want,`seed ${seed}`);else ok(e.kind==='odd'||e.kind==='disconnected',`seed ${seed}: ${e.kind}`);
  // Darbeler: her kenar tam bir kez, her darbe geçerli yürüyüş; sayı = Σ max(1, t/2)
  const all=e.strokes.flatMap(s=>s.edges).sort((a,b)=>a-b);eq(all.join(),g.edges.map((_,i)=>i).join());e.strokes.forEach(s=>ok(validWalk(g,s)));
  let th=0;for(let c=0;c<d.c;c++){if(!g.edges.some(x=>d.lab[x[0]]===c))continue;const t=deg.filter((x,v)=>d.lab[v]===c&&x%2).length;th+=Math.max(1,t/2);}eq(e.strokes.length,th);eq(e.theory,th);
  if(e.kind==='circuit'){const s=e.strokes[0];eq(s.verts[0],s.verts.at(-1));}
  if(e.kind==='trail'){const s=e.strokes[0];eq([s.verts[0],s.verts.at(-1)].sort().join(),e.odd.slice().sort().join());}
}
// Königsberg: Euler'in 5–3–3–3 sayımı; sekizinci köprü (B–C) ile Euler yolu A ↔ D
const kb=K.preset('konigsberg');eq(K.degrees(kb).join(),'5,3,3,3');const ke=K.euler(kb);eq(ke.kind,'odd');eq(ke.strokes.length,2);eq(bruteEulerTrail(4,kb.edges),'none');
kb.edges.push([1,2,1]);const k8=K.euler(kb);eq(k8.kind,'trail');eq(k8.odd.join(),'0,3');eq(bruteEulerTrail(4,kb.edges),'trail');eq(K.euler(kb,1).startOk,false);eq(K.euler(kb,3).strokes[0].verts[0],3);
// İlmek dereceye 2 ekler
eq(K.degrees({pos:[[0,0]],names:['1'],edges:[[0,0,1]]}).join(),'2');

/* 2. Ağaçlar, MST, Kirchhoff */
for(let seed=1;seed<=250;seed++){const r=rng(1000+seed),n=1+Math.floor(r()*6),m=Math.floor(r()*10),g=randomMulti(n,m,r,seed%4===0);
  const ref=refTrees(g),t=K.treeTests(g),d=dfsComponents(n,g.edges);
  eq(t.connected,d.c===1);eq(t.countOk,m===n-1);eq(t.acyclic,g.edges.length===n-d.c&&g.edges.every(e=>e[0]!==e[1]));eq(t.isTree,d.c===1&&t.acyclic&&m===n-1);
  eq(String(K.kirchhoff(g)),String(ref.count),`τ seed ${seed}`);const b=K.bruteTrees(g);eq(b.count,ref.count);
  const kr=K.kruskal(g),pr=K.prim(g,Math.floor(r()*n));
  if(ref.count){near(kr.total,ref.min,1e-9);near(pr.total,ref.min,1e-9);near(b.min,ref.min,1e-9);eq(kr.edges.length,n-1);eq(dfsComponents(n,kr.edges.map(i=>g.edges[i])).c,1);eq(dfsComponents(n,pr.edges.map(i=>g.edges[i])).c,1);}
  else{eq(pr,null);eq(kr.spanning,n<=1&&n>0);eq(dfsComponents(n,kr.edges.map(i=>g.edges[i])).c,d.c);}
}
for(let n=2;n<=9;n++){const g=K.preset('kn',{n});eq(String(K.kirchhoff(g)),String(BigInt(n)**BigInt(n-2)),'Cayley K'+n);ok(K.isComplete(g));}
eq(String(K.kirchhoff(K.preset('k5'))),'125');eq(String(K.kirchhoff(K.preset('petersen'))),'2000');eq(String(K.kirchhoff(K.preset('cube'))),'384');eq(String(K.kirchhoff(K.preset('k33'))),'81');eq(String(K.kirchhoff(K.preset('tree'))),'1');eq(String(K.kirchhoff(K.preset('konigsberg'))),'21');
// Königsberg τ elle: A–B 2, A–C 2, A–D 1, B–D 1, C–D 1 kenarlı çoklu çizge; bütün 3-kenarlı alt kümelerden ağaç olanlar
eq(refTrees(K.preset('konigsberg')).count,21);

/* 3. Boyama */
for(let seed=1;seed<=200;seed++){const r=rng(5000+seed),n=1+Math.floor(r()*7),m=Math.floor(r()*12),g=randomMulti(n,m,r,false);
  const chi=bruteChi(g),ex=K.chromatic(g);eq(ex.chi,chi);ok(properColoring(g,ex.colors));
  for(const kind of['index','degree','random']){const gr=K.greedy(g,K.colorOrder(g,kind,seed));ok(properColoring(g,gr.colors));ok(gr.used>=chi);const A=g.pos.map(()=>new Set());g.edges.forEach(([u,v])=>{A[u].add(v);A[v].add(u);});ok(gr.used<=Math.max(...A.map(s=>s.size))+1);eq(K.conflicts(g,gr.colors),0);}
  const bp=K.bipartite(g);eq(bp.ok,chi<=2);if(bp.ok)ok(properColoring(g,bp.side));else{const c=bp.cycle;ok(c.length%2===1);for(let i=0;i<c.length;i++){const u=c[i],v=c[(i+1)%c.length];ok(g.edges.some(e=>(e[0]===u&&e[1]===v)||(e[0]===v&&e[1]===u)));}eq(new Set(c).size,c.length);}
  const cl=K.maxClique(g);ok(cl.size<=chi);
}
const crown=K.preset('crown');eq(K.greedy(crown,K.colorOrder(crown,'index')).used,4);eq(K.chromatic(crown).chi,2);eq(K.greedy(crown,K.colorOrder(crown,'degree')).used,4);
eq(K.chromatic(K.preset('petersen')).chi,3);eq(K.chromatic(K.preset('k5')).chi,5);eq(K.chromatic(K.preset('map')).chi,4);eq(bruteChi(K.preset('map')),4);eq(K.bipartite(K.preset('petersen')).cycle.length,5);eq(K.bipartite(K.preset('cube')).ok,true);
eq(K.greedy({pos:[[0,0]],names:['1'],edges:[[0,0,1]]},[0]).loop,true);eq(K.bipartite({pos:[[0,0]],names:['1'],edges:[[0,0,1]]}).cycle.length,1);

/* 4. Kesişmeler, yüzler, gerekli koşullar */
eq(K.crossings(K.preset('k5')).count,5);eq(K.crossings(K.preset('k33')).count,9);eq(K.crossings(K.preset('petersen')).count,5);
for(const nm of['cube','map','tree','konigsberg']){const f=K.faces(K.preset(nm));ok(f.embedded,nm);eq(f.V-f.E+f.F,2,nm);}
eq(K.faces(K.preset('cube')).F,6);eq(K.faces(K.preset('map')).F,9);eq(K.faces(K.preset('tree')).F,1);eq(K.faces(K.preset('konigsberg')).F,5);
for(let seed=1;seed<=300;seed++){const r=rng(9000+seed),n=1+Math.floor(r()*9),g={pos:Array.from({length:n},()=>[.05+.9*r(),.05+.9*r()]),names:[],edges:[]};g.names=g.pos.map((_,i)=>String(i+1));
  for(let t=0;t<40;t++){const u=Math.floor(r()*n),v=Math.floor(r()*n);if(u===v||g.edges.some(e=>(e[0]===u&&e[1]===v)||(e[0]===v&&e[1]===u)))continue;const cand={...g,edges:[...g.edges,[u,v,1]]};if(refCrossings(cand)===0)g.edges.push([u,v,1]);}
  const f=K.faces(g),c=dfsComponents(n,g.edges).c;eq(K.crossings(g).count,refCrossings(g));
  if(f.embedded){eq(n-g.edges.length+f.F,1+c,`Euler seed ${seed}`);const inner=f.orbits.filter(o=>Math.abs(o.area)>1e-12&&Math.sign(o.area)===Math.sign(f.orbits.reduce((a,o)=>Math.abs(o.area)<Math.abs(a.area)&&Math.abs(o.area)>1e-12?o:a,{area:1e9}).area)).length;ok(inner<=f.F-1);}
  const extra={...g,edges:[...g.edges]};for(let t=0;t<6&&n>3;t++){const u=Math.floor(r()*n),v=(u+1+Math.floor(r()*(n-1)))%n;if(!extra.edges.some(e=>(e[0]===u&&e[1]===v)||(e[0]===v&&e[1]===u)))extra.edges.push([u,v,1]);}eq(K.crossings(extra).count,refCrossings(extra));
}
// Paralel kenar ve ilmek de gömmede yüz sayar: tek düğüm + ilmek → V − E + F = 1 − 1 + 2
const lp=K.faces({pos:[[.5,.5]],names:['1'],edges:[[0,0,1]]});eq(lp.F,2);const par=K.faces({pos:[[.2,.5],[.8,.5]],names:['1','2'],edges:[[0,1,1],[0,1,1],[0,1,1]]});eq(par.F,3);
const b5=K.planarBounds(K.preset('k5')),b33=K.planarBounds(K.preset('k33')),bp=K.planarBounds(K.preset('petersen'));eq(b5.fail3,true);eq(b5.E,10);eq(b5.b3,9);eq(b33.fail3,false);eq(b33.triFree,true);eq(b33.fail2,true);eq(b33.b2,8);eq(bp.fail3,false);eq(bp.fail2,false);eq(K.planarBounds(K.preset('konigsberg')).simple,false);

/* 5. G(n, p): kesin özyineleme ↔ bütün çizgelerin toplanması; Monte Carlo ↔ kesin */
for(let n=1;n<=6;n++)for(const p of[0,.1,.3,.5,.77,1]){const pairs=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)pairs.push([i,j]);let P=0;for(let mask=0;mask<(1<<pairs.length);mask++){const es=pairs.filter((_,k)=>mask>>k&1);if(dfsComponents(n,es).c===1)P+=p**es.length*(1-p)**(pairs.length-es.length);}near(K.connectProb(n,p),P,1e-12,`n=${n} p=${p}`);}
for(const[n,p,seed]of[[30,.1,1],[30,.113,2],[50,.08,3],[12,.2,4],[100,.05,5]]){const mc=K.monteCarlo(n,p,3000,seed),ex=K.connectProb(n,p),se=Math.sqrt(ex*(1-ex)/3000);ok(Math.abs(mc.prob-ex)<=4.5*se+1e-9,`MC n=${n} p=${p}: ${mc.prob} vs ${ex}`);eq(K.monteCarlo(n,p,3000,seed).connected,mc.connected);}
for(const n of[10,30,100]){let prev=-1;for(let k=0;k<=50;k++){const v=K.connectProb(n,k/100);ok(v>=prev-1e-12&&v>=0&&v<=1);prev=v;}eq(K.connectProb(n,0),0);eq(K.connectProb(n,1),1);}
const w=K.wilson(30,100);ok(w[0]<.3&&w[1]>.3);near(w[0],.2189,5e-4);near(w[1],.3959,5e-4);
for(const call of[()=>K.preset('yok'),()=>K.euler({pos:[[0,0]],edges:[[0,3,1]]}),()=>K.kruskal({pos:[[0,0],[1,1]],edges:[[0,1,-2]]}),()=>K.connectProb(5,1.5)]){assert.throws(call);checks++;}
console.log(`G cizge-teorisi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
  const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
  const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
  try{browser=await chromium.launch();
    for(const[theme,width]of[['light',390],['dark',1280]]){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/cizge-teorisi.html`);
      const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' '),set=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event(e.tagName==='SELECT'?'change':'input',{bubbles:true}));},v),is=async(id,t)=>eq(await read(id),t,id),has=async(id,t)=>{const s=await read(id);ok(s.includes(t),`${id}: “${s}” içinde “${t}” yok`);},fits=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');
      const dragWorld=async(x0,y0,x1,y1)=>{await page.locator('#graphCanvas').scrollIntoViewIfNeeded();await page.waitForTimeout(250);const b=await page.locator('#graphCanvas').boundingBox(),X=x=>b.x+28+x*(b.width-56),Y=y=>b.y+28+y*(b.height-56);await page.mouse.move(X(x0),Y(y0));await page.mouse.down();await page.mouse.move(X((x0+x1)/2),Y((y0+y1)/2),{steps:4});await page.mouse.move(X(x1),Y(y1),{steps:4});await page.mouse.up();await page.waitForTimeout(60);};
      const tapWorld=async(x,y)=>{await page.locator('#graphCanvas').scrollIntoViewIfNeeded();await page.waitForTimeout(250);const box=await page.locator('#graphCanvas').boundingBox();await page.mouse.click(box.x+28+x*(box.width-56),box.y+28+y*(box.height-56));await page.waitForTimeout(60);};
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content input,.app-content select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id).join()),'');
      eq(await page.evaluate(()=>[...document.querySelectorAll('.app-content canvas')].every(c=>c.getAttribute('role')==='img'&&!!c.getAttribute('aria-label'))),true);
      eq(await page.evaluate(()=>Object.isFrozen(GraphLab)&&!Object.getOwnPropertyDescriptor(window,'GraphLab').writable),true);
      // 01 · varsayılan Königsberg
      await is('hsSum','14');await is('hsTwoE','14');await is('hsDiff','0');await is('compUF','1');await is('compBFS','1');await is('oddCount','4 · A, B, C, D');await is('eulVerdict','Euler yolu yok (t = 4)');await is('eulTrail','— / 7');await is('eulStrokes','2 / 2');await has('eulStatus','en az 2 ayrı kalem darbesi');
      await click('eulBridge');await is('hsSum','16');await is('eulVerdict','Euler yolu var: A ↔ D');await is('eulTrail','8 / 8');await is('eulStrokes','1 / 1');await has('eulSeq','Sıra: A →');await has('eulSeq','→ D');
      await set('eulStart','1');await has('eulStatus','çift dereceli');await is('eulTrail','8 / 8');
      await click('eulStep');await is('eulPosOut','1 / 8');await click('eulPlay');await page.waitForFunction(()=>document.getElementById('eulPosOut').textContent.startsWith('8'),null,{timeout:8000});await is('eulPlay','Oynat');
      await click('eulReset');await is('eulStrokes','2 / 2');await is('hsSum','14');await is('eulPosOut','0 / 7');
      // Dokunarak düzenleme: boş tuval, iki düğüm, kenar, ilmek, silme
      await set('edPreset','empty');await click('edLoad');await is('hsSum','0');await tapWorld(.2,.5);await tapWorld(.8,.5);await is('compUF','2');
      await click('modeEdge');await tapWorld(.2,.5);await tapWorld(.8,.5);await is('hsTwoE','2');await is('eulVerdict','Euler yolu var: 1 ↔ 2');await tapWorld(.2,.5);await tapWorld(.2,.5);await is('hsSum','4');await has('degRows','1');
      await click('modeDelete');await tapWorld(.5,.5);await is('hsTwoE','2');await click('modeMove');
      // Klavyeyle düzenleme
      await click('edAddVertex');await set('edFrom','1');await set('edTo','2');await page.locator('#edWeightNew').fill('2,5');await click('edAddEdge');await is('hsTwoE','4');await set('edEdge','1');await page.locator('#edWeight').fill('0');await click('edSetWeight');await has('edMsg','pozitif');await page.locator('#edWeight').fill('3.5');await click('edSetWeight');await has('edMsg','3,5');
      await page.locator('#graphCanvas').focus();await page.keyboard.press('n');await page.keyboard.press('ArrowRight');await page.keyboard.press('Delete');await is('compUF','1');await is('hsTwoE','2');await is('eulVerdict','Euler yolu var: 2 ↔ 3');
      // 02 · Ağaç
      await page.locator('#tab-euler').focus();await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-tree').getAttribute('aria-selected'),'true');
      await click('treeReset');await is('treeConn','Evet · 1 bileşen');await is('treeCount','Hayır · 12 / 7');await has('treeAcyc','Hayır');await is('tauK','384');await is('tauB','384');await is('tauC','— (Kₙ değil)');
      const mk=await read('mstK'),mp=await read('mstP');eq(mk,mp);await has('mstB','en küçük '+mk);await has('treeStatus','fark 0');
      await click('treeOnes');await is('mstK','7');await is('mstB','en küçük 7 · 384 en küçük ağaç');
      await set('treeN','9');await click('treeKn');await is('tauK','4 782 969');await is('tauB','atlandı');await is('tauC','4 782 969 = 9⁷');await set('treeN','5');await click('treeKn');await is('tauB','125');await is('tauC','125 = 5³');
      await set('edPreset','tree');await click('edLoad');await is('treeAcyc','Evet');await has('treeStatus','Üç test de geçti');await is('tauK','1');
      await set('edPreset','random');await set('edN','12');await set('edP','0');await click('edLoad');await is('tauK','0');await is('mstP','— (bağlı değil)');await has('treeStatus','kapsayan ağacı yoktur');
      await set('treeShow','prim');await set('treeN','2');await click('treeKn');await is('tauC','1 = 2⁰');
      // 03 · Boyama
      await page.keyboard.press('End');await click('tab-color');await click('colReset');await is('colGreedy','3');await is('colChi','3');await is('colDiff','0');await is('colBip','Hayır');await has('colOdd','5 kenar');await is('colOmega','2');await is('colDelta','4');await is('colConflict','0 kenar');
      await click('colCrown');await is('colGreedy','4');await is('colChi','2');await is('colDiff','+2');await is('colBip','Evet');await set('colShow','exact');await is('colConflict','0 kenar');
      await click('colMap');await is('colChi','4');await has('colStatus','dört renk teoremi');await set('colShow','bip');await has('colOdd','3 kenar');
      await set('edPreset','konigsberg');await click('edLoad');await click('modeEdge');await page.locator('#graphCanvas').focus();await set('edFrom','0');await set('edTo','0');await click('edAddEdge');await is('colGreedy','Tanımsız (ilmek)');await click('modeMove');
      await set('edPreset','kn');await set('edN','12');await click('edLoad');await is('hsSum'.replace('hsSum','colGreedy'),'10');
      // 04 · Düzlemsellik
      await click('tab-planar');await click('plReset');await is('plV','8');await is('plE','12');await is('plF','6');await is('plEuler','2');await is('plEulerTh','2');await is('plCross','0');await is('plB3','Evet: 12 ≤ 18');await is('plB2','Evet: 12 ≤ 12');await is('plVerdict','Düzlemsel');
      await click('plUntangle');await has('edMsg','üstteki iki düğümü (5 ve 6)');await is('plF','Tanımsız');await is('plCross','2');await is('plB2','Evet: 12 ≤ 12');await is('plVerdict','Karar verilemedi');await dragWorld(.34,.34,.5,.22);await dragWorld(.66,.34,.34,.34);await dragWorld(.5,.22,.66,.34);await is('plCross','0');await is('plF','6');await is('plEuler','2');await is('plVerdict','Düzlemsel');
      await click('plK5');await is('edMsg','K₅ yüklendi.');await is('plCross','5');await is('plB3','Hayır: 10 > 9');await is('plVerdict','Düzlemsel değil');await click('plK33');await is('edMsg','K₃,₃ yüklendi.');await is('plB3','Evet: 9 ≤ 12');await is('plB2','Hayır: 9 > 8');await is('plVerdict','Düzlemsel değil');
      await click('plMap');await is('edMsg','Düzlemsel harita yüklendi.');await is('plF','9');await click('plCube');await is('edMsg','Küp yüklendi.');await click('plMap');await is('plEuler','2');
      await set('edPreset','tree');await click('edLoad');await is('plF','1');await set('edPreset','empty');await click('edLoad');await is('plF','Tanımsız');await tapWorld(.3,.3);await tapWorld(.7,.7);await is('plF','1');await is('plEuler','3');await is('plEulerTh','3 (C = 2)');
      // Rastgele çizge: varsayılan ve sınırlar
      await click('plReset');const ex=K.connectProb(30,.1),mc=K.monteCarlo(30,.1,1000,1);await is('rgExact',(Math.round(ex*1e4)/1e4).toFixed(4).replace(/0+$/,'').replace('.',','));await has('rgMeasured',String(mc.connected)+' / 1 000');await is('rgThr','0,1134');
      await click('rgThreshold');await is('rgPOut','0,113');await set('rgP','0');await is('rgExact','0');await is('rgMeasured','0 (0 / 1 000)');await set('rgP','0.5');await set('rgN','2');await is('rgExact','0,5');await set('rgN','100');await set('rgTrials','100');await click('rgSweep');await has('rgStatus','n = 100');
      await click('plReset');await is('rgNOut','30');await is('rgPOut','0,1');await is('rgTrialsOut','1 000');
      // R kısayolu ve klavye sekmeleri
      await page.locator('h1').click();await page.keyboard.press('r');await is('plF','6');await page.locator('#tab-planar').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-euler').getAttribute('aria-selected'),'true');await page.locator('h1').click();await page.keyboard.press('r');await is('eulStrokes','2 / 2');await page.keyboard.press('Space');await page.waitForTimeout(100);await is('eulPlay','Duraklat');
      await fits();for(const t of['tree','color','planar']){await click('tab-'+t);await fits();}
      assert.deepEqual(errors,[]);checks++;
      await page.close();
    }
    console.log(`G cizge-teorisi: ${checks-before} gerçek tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
