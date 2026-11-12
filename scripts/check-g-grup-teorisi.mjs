// G: grup teorisi laboratuvarı. Çekirdek, sayfanın kendi formüllerini yinelemeyen başvurularla sınanır:
// köşe permütasyonlarının geometriyle (döndürme/yansıma matrisleri) uyumu, matris çarpımıyla sayılan
// değişmeyen çiftler, bütün alt kümeleri deneyen alt grup sayımı, permütasyon matrisinin determinantı,
// BigInt üs alma, 8 bulmacasının bütün 9! düzeni ve yayımlanmış değerler (8 bulmacası en çok 31 hamle).
// Kullanım: node scripts/check-g-grup-teorisi.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const SLUG='grup-teorisi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.GroupLab;let checks=0;
const eq=(a,b,msg)=>{assert.equal(JSON.stringify(a),JSON.stringify(b),msg||'beklenen değer');checks++;},ok=(c,msg)=>{assert(c,msg);checks++;};
const near=(a,b,msg)=>{assert(Math.abs(a-b)<1e-9,msg||`${a} ≠ ${b}`);checks++;};
const G=(a,b)=>b?G(b,a%b):a;
let seed=20261111;const rnd=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};
const allPerms=n=>{if(n===0)return[[]];const out=[];for(const p of allPerms(n-1))for(let i=0;i<=p.length;i++)out.push([...p.slice(0,i),n-1,...p.slice(i)]);return out;};
const comp=(a,b)=>b.map(x=>a[x]); // önce b, sonra a
const det=m=>{const n=m.length;if(n===1)return m[0][0];let s=0;for(let j=0;j<n;j++){if(!m[0][j])continue;s+=(j%2?-1:1)*m[0][j]*det(m.slice(1).map(r=>r.filter((_,k)=>k!==j)));}return s;};

/* 1 · Dₙ: geometri ile permütasyon uyumu, matrislerle bağımsız sayım */
const mm=(A,B)=>[A[0]*B[0]+A[1]*B[2],A[0]*B[1]+A[1]*B[3],A[2]*B[0]+A[3]*B[2],A[2]*B[1]+A[3]*B[3]];
for(let n=3;n<=8;n++){const D=K.dihedral(n),E=D.elements;eq(D.closureSize,2*n);eq(E.length,2*n);
 for(const e of E){for(let i=0;i<n;i++){const[x,y]=D.vertex(i),[X,Y]=D.vertex(e.perm[i]);near(e.M[0]*x+e.M[1]*y,X);near(e.M[2]*x+e.M[3]*y,Y);}near(e.M[0]*e.M[3]-e.M[1]*e.M[2],e.f?-1:1,'det ±1');}
 // tablo: önce b sonra a, matris çarpımıyla da aynı
 for(let i=0;i<2*n;i++)for(let j=0;j<2*n;j++){const v=D.table[i][j];eq(E[v].perm,comp(E[i].perm,E[j].perm));const M=mm(E[i].M,E[j].M);for(let k=0;k<4;k++)near(M[k],E[v].M[k]);}
 // değişmeyen çiftler ve merkez: matris çarpımı ile kaba kuvvet
 let nc=0,center=0;for(let i=0;i<2*n;i++){let all=true;for(let j=0;j<2*n;j++){const a=mm(E[i].M,E[j].M),b=mm(E[j].M,E[i].M);if(a.some((v,k)=>Math.abs(v-b[k])>1e-9)){nc++;all=false;}}if(all)center++;}
 const T=K.dihedralTheory(n),gi=K.groupInfo(D.table);eq(T.nonCommuting,nc,`D${n} değişmeyen çift`);eq(gi.n*gi.n-gi.commuting,nc);eq(center,n%2?1:2);eq(gi.center.length,center);eq(T.order,2*n);
 // eşlenik sınıf sayısı = Burnside: |{(g,h): gh = hg}| / |G|
 eq(gi.classes,(4*n*n-nc)/(2*n));
 // sr = r⁻¹s; elemanların mertebeleri
 const idx=name=>E.findIndex(e=>e.name===name);const r=idx('r'),s=idx('s');eq(E[D.table[s][r]].name,'r'+K.sup(n-1)+'s');
 for(const e of E){let q=e.perm,k=1;while(q.some((v,i)=>v!==i)){q=comp(e.perm,q);k++;}eq(k,e.order);}
 // yansıma ekseni: rᵏs ekseni üzerindeki nokta yerinde kalır
 for(const e of E.filter(e=>e.f)){const x=Math.cos(e.axis),y=Math.sin(e.axis);near(e.M[0]*x+e.M[1]*y,x);near(e.M[2]*x+e.M[3]*y,y);}
 // Cayley tablosu Latin kare
 for(let i=0;i<2*n;i++){eq(new Set(D.table[i]).size,2*n);eq(new Set(D.table.map(row=>row[i])).size,2*n);}}
eq(K.dihedral(4).elements.map(e=>e.name),['e','r','r²','r³','s','rs','r²s','r³s']);
{const D=K.dihedral(4),t=D.table,E=D.elements,i=n=>E.findIndex(e=>e.name===n);eq(E[t[i('s')][i('r')]].name,'r³s','önce r sonra s');eq(E[t[i('r')][i('s')]].name,'rs','önce s sonra r');}

/* 2 · Desenli karo: 90° adımlarla bağımsız tamsayı haritaları */
{const rot=([c,r])=>[r,3-c],flipV=([c,r])=>[3-c,r],key=cells=>cells.map(x=>x.join(':')).sort().join('|');const maps=[];for(let k=0;k<4;k++)for(const f of[false,true])maps.push(cell=>{let x=f?flipV(cell):cell;for(let i=0;i<k;i++)x=rot(x);return x;});
 const want={plain:[8,1],pinwheel:[4,2],stripes:[4,2],diagonal:[4,2],stripe:[2,4],ell:[1,8]};
 for(const[m,[st,orb]]of Object.entries(want)){const cells=K.MOTIFS[m],base=key(cells),imgs=new Set(maps.map(f=>key(cells.map(f)))),stab=maps.filter(f=>key(cells.map(f))===base).length;eq([stab,imgs.size],[st,orb],m);const ts=K.tileSymmetry(m);eq([ts.stabilizer.length,ts.orbit],[st,orb],m+' çekirdek');eq(ts.stabilizer.length*ts.orbit,8);}
 eq(K.tileSymmetry('pinwheel').stabilizer.every(i=>K.dihedral(4).elements[i].f===0),true,'fırıldak yalnız döndürmelerle korunur');}

/* 3 · Aksiyomlar: bağımsız kaba kuvvet */
function brute(els,op,key){const N=els.length,inS=new Set(els.map(key));let closure=true,assoc=0;for(const a of els)for(const b of els)if(!inS.has(key(op(a,b))))closure=false;for(const a of els)for(const b of els)for(const c of els)if(key(op(op(a,b),c))!==key(op(a,op(b,c))))assoc++;
 const e=els.find(x=>els.every(a=>key(op(x,a))===key(a)&&key(op(a,x))===key(a)));let invFails=e===undefined?null:els.filter(a=>!els.some(b=>key(op(a,b))===key(e)&&key(op(b,a))===key(e))).length;return{N,closure,assoc,e:e===undefined?null:key(e),invFails,group:closure&&!assoc&&e!==undefined&&invFails===0};}
const isPrime=n=>n>1&&[...Array(n).keys()].slice(2).every(d=>n%d);
for(const[id,S]of Object.entries(K.STRUCTS)){const ns=S.n?[...Array(S.n[1]-S.n[0]+1).keys()].map(i=>i+S.n[0]):[null];for(const n of ns){const r=K.axiomCheck(id,n),b=brute(r.elements,(x,y)=>S.op(x,y,n),S.key);
 eq([r.size,r.closure.ok,r.assoc.fails,r.identity.ok?S.key(r.elements[r.identity.e]):null,r.inverse.defined?r.inverse.fails:null,r.isGroup],[b.N,b.closure,b.assoc,b.e,b.invFails,b.group],`${id} n=${n}`);eq(r.assoc.triples,b.N**3);
 if(r.isGroup){const N=r.size;ok(r.orders.every(o=>N%o===0),'Lagrange: eleman');ok(r.subgroups.every(s=>N%s.order===0),'Lagrange: alt grup');
  if(N<=12){// bütün alt kümeleri dene
   const t=r.table;let count=0;for(let m=1;m<1<<N;m++){const set=[];for(let i=0;i<N;i++)if(m>>i&1)set.push(i);if(set.every(a=>set.every(b=>set.includes(t[a][b]))))count++;}eq(r.subgroups.length,count,`${id} n=${n} alt grup sayısı`);}}}}
for(let n=1;n<=12;n++){eq(K.axiomCheck('zadd',n).subgroups.length,[...Array(n).keys()].filter(d=>n%(d+1)===0).length,'ℤn alt grubu = bölen sayısı');eq(K.axiomCheck('zmulNZ',Math.max(2,n)).isGroup,isPrime(Math.max(2,n)));}
for(let n=2;n<=12;n++){eq(K.axiomCheck('sub',n).assoc.fails,n*n*[...Array(n).keys()].filter(c=>(2*c)%n).length);eq(K.axiomCheck('sub',n).isGroup,n===2);}
eq(K.axiomCheck('zmulNZ',6).closure.first.map(i=>K.axiomCheck('zmulNZ',6).elements[i]),[2,3]);
{const a4=K.axiomCheck('a4');eq(a4.size,12);eq(a4.subgroups.length,10);eq(a4.subgroups.some(s=>s.order===6),false,'A₄: 6 mertebeli alt grup yok');eq(a4.hasse.length>0,true);}
{const d4=K.dihedral(4);eq(K.subgroups(d4.table).length,10);eq(K.axiomCheck('zadd',12).subgroups.length,6);eq(K.hasse(K.axiomCheck('zadd',12).subgroups).length,7);}
eq([K.axiomCheck('gl2').size,K.axiomCheck('gl2').abelian,K.axiomCheck('m2').inverse.fails,K.axiomCheck('max',4).inverse.fails,K.axiomCheck('zmul0',6).inverse.fails],[6,false,10,3,4]);
eq(K.axiomCheck('zmulU',5).elements,[1,2,3,4]);
for(const call of[()=>K.axiomCheck('zadd',0),()=>K.axiomCheck('zadd',13),()=>K.axiomCheck('yok',3),()=>K.axiomCheck('zmulU',1.5)]){assert.throws(call);checks++;}

/* 4 · Permütasyonlar */
for(let n=1;n<=6;n++)for(const p of allPerms(n)){const P=p.map((v,i)=>p.map((_,j)=>j===v?1:0)),sg=det(P.map((row,i)=>p.map((v,j)=>+(p[j]===i))));const inv=K.inversions(p),tr=K.transpositions(p);
 eq(inv%2?-1:1,sg,'inversion işareti = determinant');eq(tr.length%2?-1:1,sg,'yer değiştirme işareti = determinant');
 let q=[...Array(n).keys()];for(const[a,b]of tr){const t=[...Array(n).keys()];t[a]=b;t[b]=a;q=comp(t,q);}eq(q,p,'yer değiştirmelerin çarpımı');
 let x=p,k=1;while(x.some((v,i)=>v!==i)){x=comp(p,x);k++;}eq(K.permOrder(p),k);
 const s=K.cycleString(p),back=K.parseCycles(s,n);eq(back.ok,true);eq(back.perm,p,s);}
eq(K.parseCycles('(1 2 3)(4 5)',5).perm,[1,2,0,4,3]);eq(K.cycleString(K.parseCycles('(12)(13)',3).perm),'(1 3 2)','sağdan sola: önce (13)');eq(K.cycleString(K.parseCycles('(1 2)(1 2)',4).perm),'e');
for(const[bad,n]of[['(1 7)',5],['(1 2',5],['1 2',5],['(1 1 2)',5],['()()',3],['(a b)',4],['(4 5)',3]])eq(K.parseCycles(bad,n).ok,false,bad);
eq(K.parseCycles('',4).ok,true);eq(K.parseCycles('e',4).perm,[0,1,2,3]);
{const s=K.parseCycles('(1 2 3)(4 5)',5).perm,t=K.parseCycles('(1 2)',5).perm;eq(K.cycleString(K.compose(s,t)),'(1 3)(4 5)');eq(K.cycleString(K.compose(t,s)),'(2 3)(4 5)');eq(K.permOrder(s),6);eq(K.inversions(s),3);}
eq(Math.max(...allPerms(6).map(K.permOrder)),6);eq(allPerms(5).filter(p=>K.permOrder(p)===6).length,20);

/* 5 · Kayan taş: bütün 9! düzen ve rastgele 4 × 4 tahtalar */
const bfs=K.puzzleBFS3();eq([bfs.reachable,bfs.maxDepth],[181440,31],'8 bulmacası: 9!/2 durum, en çok 31 hamle (Wikipedia, 15 puzzle)');eq(bfs.dist.filter(d=>d===31).length,2,'31 hamle isteyen 2 düzen');
{let bad=0;for(let r=0;r<362880;r++){const b=K.unrankPerm(r,9);eq(K.rankPerm(b),r);if((bfs.dist[r]>=0)!==K.puzzleInfo(b,3).solvable)bad++;}eq(bad,0,'parite ölçütü = BFS ulaşılabilirliği');}
// 4 × 4: ders kitabı ölçütü (taş inversiyonları + boşluğun alttan satır numarası tek ise çözülebilir)
for(let t=0;t<3000;t++){const b=[...Array(16).keys()];for(let i=15;i>0;i--){const j=rnd(i+1);[b[i],b[j]]=[b[j],b[i]];}const tiles=b.filter(v=>v);let inv=0;for(let i=0;i<15;i++)for(let j=i+1;j<15;j++)if(tiles[i]>tiles[j])inv++;const rowFromBottom=4-Math.floor(b.indexOf(0)/4);eq(K.puzzleInfo(b,4).solvable,(inv+rowFromBottom)%2===1);}
{const s=[...Array(15).keys()].map(i=>i+1).concat(0);eq(K.puzzleInfo(s,4).solvable,true);const sw=s.slice();[sw[13],sw[14]]=[sw[14],sw[13]];eq(K.puzzleInfo(sw,4).solvable,false,'14–15 takası');eq(K.slide(s,4,0),null);eq(K.slide(s,4,14)[15],15);let b=s;for(let i=0;i<500;i++){const z=b.indexOf(0),nb=K.puzzleNeighbors(z,4);b=K.slide(b,4,nb[rnd(nb.length)]);}eq(K.puzzleInfo(b,4).solvable,true);}

/* 6 · Sayılar kuramı: BigInt ve bağımsız sayım */
const ordBig=(a,n)=>{if(G(a,n)!==1)return null;let x=BigInt(a%n),k=1;const N=BigInt(n),A=BigInt(a),one=BigInt(1%n);while(x!==one){x=x*A%N;k++;}return k;};
let primN=0;for(let n=1;n<=100;n++){const ph=[...Array(n).keys()].filter(a=>G(a,n)===1).length;eq(K.phiCount(n),ph);eq(K.phiFormula(n),ph);
 for(let a=1;a<n;a++){if(G(a,n)===1){eq(Number(BigInt(a)**BigInt(ph)%BigInt(n)),1%n,`Euler ${a}^${ph} mod ${n}`);eq(K.powMod(a,ph,n),1%n);eq(K.orderMod(a,n),ordBig(a,n));ok(ph%K.orderMod(a,n)===0);}else eq(K.orderMod(a,n),null);}
 const pr=[...Array(n).keys()].filter(a=>G(a,n)===1&&ordBig(a,n)===ph);eq(K.primitiveRoots(n),pr);
 const want=n===1||n===2||n===4||(()=>{let m=n%2?n:n/2;if(m%2===0)return false;for(let p=3;p<=m;p+=2)if(m%p===0){while(m%p===0)m/=p;return m===1;}return false;})();
 eq(K.primRootCriterion(n),want,`ölçüt n=${n}`);eq(pr.length>0,want,`arama = ölçüt, n=${n}`);if(pr.length){primN++;eq(pr.length,[...Array(ph).keys()].filter(a=>G(a,ph)===1).length||1,'φ(φ(n))');}
 // yapı: devirli çarpanların çarpımı, mertebe profili
 const fac=K.unitFactors(n);eq(fac.reduce((x,y)=>x*y,1),ph);const prof=K.cyclicProductProfile(fac.length?fac:[1]),real={};for(let a=0;a<n;a++)if(G(a,n)===1){const o=ordBig(a,n);real[o]=(real[o]||0)+1;}eq(Object.entries(prof).sort(),Object.entries(real).sort(),`ℤ${n}* yapısı`);}
eq(primN,50);eq(K.primitiveRoots(10),[3,7]);eq(K.unitFactors(24),[2,2,2]);eq(K.primitiveRoots(97).length,32);eq(K.primitiveRoots(8),[]);

/* 7 · İzomorfizma */
const S3t=K.tableOf(K.S3(),K.compose,p=>p.join(','));
for(const[A,B,want]of[[K.zTable(6),K.productTable(2,3).table,true],[K.zTable(4),K.productTable(2,2).table,false],[K.unitTable(5).table,K.zTable(4),true],[K.unitTable(8).table,K.productTable(2,2).table,true],[K.unitTable(15).table,K.productTable(2,4).table,true],[K.zTable(12),K.productTable(2,6).table,false],[K.zTable(6),S3t,false],[S3t,K.tableOf(K.axiomCheck('gl2').elements,K.STRUCTS.gl2.op,K.STRUCTS.gl2.key),true],[K.zTable(8),K.productTable(2,4).table,false]]){
 const r=K.isoSearch(A,B);eq(!!r.map,want);if(r.map){const m=r.map,n=A.length;eq(new Set(m).size,n);for(let i=0;i<n;i++)for(let j=0;j<n;j++)eq(m[A[i][j]],B[m[i]][m[j]]);}}
ok(Object.isFrozen(K));
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser,code=0;
 try{browser=await chromium.launch();
  for(const[theme,width]of[['light',390],['dark',1280]]){const before=checks,page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:width<500?2:1});await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(8000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errors.push(m.text());});await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
   const click=id=>page.locator('#'+id).click(),read=id=>page.locator('#'+id).textContent(),has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: “${t}” içinde “${text}” yok`);checks++;},range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},String(v)),type=(id,v)=>page.locator('#'+id).fill(v),pick=(id,v)=>page.locator('#'+id).selectOption(v),noflow=async()=>eq(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma'),painted=async id=>ok(assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:2,label:id}),id+' boş');
   // 01 · Simetri
   await has('symOrder','8 · kuram 2n = 8');await has('symNC','24 / 64 · kuram 24');await has('symCur','e · e');await has('compCaption','b∘a = r³s');await has('compCaption','a∘b = rs');await painted('symCanvas');await painted('compCanvas');eq(await page.locator('#symTable td').count(),64);eq(await page.locator('#symTable td.gt-nc').count(),24);
   await click('symR');await has('symCur','r · (1 2 3 4)');await has('symCurNote','mertebe sayılan 4');await click('symS');await has('symCur','r³s');await has('symStatus','r, s (2 hamle)');await click('symUndo');await has('symCur','r · ');await click('symHome');await has('symCur','e · e');
   await page.locator('#symTable td[data-i="4"][data-j="1"]').click();eq(await page.locator('#symB').inputValue(),'4');eq(await page.locator('#symA').inputValue(),'1');
   await range('symN',3);await has('symOrder','6 · kuram 2n = 6');await has('symNC','18 / 36 · kuram 18');await has('symNCNote','merkez 1 eleman');await range('symN',8);await has('symOrder','16 · kuram 2n = 16');await has('symNC','144 / 256 · kuram 144');eq(await page.locator('#symTable td').count(),256);
   await pick('symA','2');await pick('symB','6');await has('compCaption','İkisi aynı');
   // sürükle: çeyrek tur → r²(n = 8 için 90° = 2 adım)
   {await page.locator('#symCanvas').scrollIntoViewIfNeeded();const box=await page.locator('#symCanvas').boundingBox(),cx=box.x+box.width/2,cy=box.y+box.height/2,R=Math.min(box.width,box.height)*.3;await page.mouse.move(cx+R,cy);await page.mouse.down();for(let i=1;i<=10;i++){const a=i/10*Math.PI/2;await page.mouse.move(cx+R*Math.cos(a),cy-R*Math.sin(a));}await page.mouse.up();await has('symCur','r² ·');}
   await pick('symShape','tile');eq(await page.locator('#symN').isDisabled(),true);await has('symStab','4 · {e, r, r², r³}');await has('symOrbit','2 farklı');await has('symOrbitNote','2 × 4 = 8');await pick('symMotif','ell');await has('symStab','1 · {e}');await has('symOrbit','8 farklı');await pick('symMotif','stripe');await has('symStab','2 · {e, r³s}');await pick('symMotif','plain');await has('symStab','8 ·');await painted('symCanvas');
   await click('symReset');await has('symOrder','8 · kuram 2n = 8');eq(await page.locator('#symShape').inputValue(),'polygon');await noflow();
   await page.locator('h1').click();await page.keyboard.press('Space');await has('symCur','r · ');await page.keyboard.press('r');await has('symCur','e · e');
   // 02 · Aksiyomlar
   await click('tab-ax');await has('axClose','Sağlanıyor');await has('axAssocNote','216 üçlünün hepsinde');await has('axId','e = 0');await has('axInv','Her elemanın tersi var');await has('axStatus','6 elemanlı bir grup, değişmeli');await has('axLagS','4 / 4 alt grup');await painted('axCanvas');eq(await page.locator('#axRows tr').count(),4);
   await pick('axStruct','zmulNZ');await has('axClose','Bozuluyor');await has('axCloseNote','2 ∗ 3 = 0 kümede yok');await has('axStatus','Grup değil');await has('axLagE','—');await range('axN',7);await has('axStatus','6 elemanlı bir grup');
   await pick('axStruct','sub');await has('axAssoc','Bozuluyor');await has('axAssocNote','144 / 216');await has('axId','Yok');await has('axIdNote','sağ birim 0');await has('axInv','Sınanamaz');await range('axN',2);await has('axStatus','2 elemanlı bir grup');
   await pick('axStruct','zmul0');await has('axInvNote','0 için');await pick('axStruct','m2');await has('axInvNote','10 / 16');eq(await page.locator('#axN').isDisabled(),true);await has('axNOut','sabit');
   await pick('axStruct','a4');await has('axLagSNote','6 mertebeli alt grup yok');await has('axLagS','10 / 10 alt grup');await pick('axStruct','gl2');await has('axStatus','değişmeli değil');await pick('axStruct','max');await has('axInv','Bozuluyor');
   await pick('axStruct','zmulU');await range('axN',24);await has('axStatus','8 elemanlı bir grup');await range('axN',29);await has('axTableTitle','28 × 28');await has('axLagE','28 / 28 eleman');
   await click('axReset');await has('axStatus','6 elemanlı');eq(await page.locator('#axStruct').inputValue(),'zadd');await noflow();
   // 03 · Permütasyonlar
   await click('tab-perm');await has('permOrd','6 · kuram ekok(3, 2) = 6');await has('permSign','−1 · tek');await has('permSignNote','iki sayım aynı');await has('permComp','(1 3)(4 5) · (2 3)(4 5)');await has('permCount','0 karıştırma');await painted('cardCanvas');await painted('puzCanvas');
   for(let i=0;i<6;i++){await page.locator('h1').click();await page.keyboard.press('Space');}await has('permCount','6 karıştırma');await has('permCountNote','deste ilk düzende');await click('permApply');await has('permCountNote','deste karışık');
   await type('permSigma','(1 7)');await has('permOrd','—');await has('permStatus','7 bu kümede yok');eq(await page.locator('#permSigma').getAttribute('aria-invalid'),'true');await type('permSigma','(1 2)(1 3)');await has('permSign','+1 · çift');await has('permOrd','3 · kuram');
   await type('permSigma','(1 2 3 4 5 6)');await has('permOrd','—');await range('permN',6);await has('permOrd','6 · kuram ekok(6) = 6');await has('permSign','−1 · tek');await type('permSigma','');await has('permOrd','1 · kuram');await click('permRandom');ok(!(await read('permOrd')).includes('—'));
   await has('puzTheory','Çözülebilir');await click('puzSwap');await has('puzTheory','Çözülemez');await has('puzPar','tek');await pick('puzSize','3');await has('puzBfs','181.440 durum · kuram 9!/2 = 181.440');await has('puzBfsNote','en az 0 hamlede');await has('puzBfsNote','böyle 2 düzen var');await click('puzSwap');await has('puzBfsNote','arasında yok');await has('puzBfsNote','uyumlu');
   await click('puzSolved');await page.locator('#puzCanvas').focus();await page.keyboard.press('ArrowDown');await has('puzBfsNote','en az 1 hamlede');await has('puzStatus','1 hamle');await click('puzScramble');await has('puzTheory','Çözülebilir');await click('puzShuffle');ok(/Çözül/.test(await read('puzTheory')));
   await click('permReset');await has('permOrd','6 · kuram');eq(await page.locator('#puzSize').inputValue(),'4');await has('puzBfs','—');await noflow();
   // 04 · Devirli
   await click('tab-cyc');await has('cycPhi','4 · formül 4');await has('cycOrd','ord(3) = 4');await has('cycEuler','3⁴ mod 10 = 1');await has('cycPrim','2 tane: 3, 7');await has('cycPrimNote','fark 0');await has('cycLam','λ = 4 = φ(n)');await has('cycStruct','ℤ₄');await has('cycStripCaption','50 değerde');await has('cycStripCaption','uyuşmayan değer: 0');await painted('cycCanvas');await painted('cycStrip');
   await range('cycA',4);await has('cycOrd','Tanımsız');await has('cycEuler','4⁴ mod 10 = 6');await page.locator('h1').click();await page.keyboard.press('Space');await has('cycOrd','ord(7) = 4');
   await range('cycN',8);await has('cycPrim','Yok');await has('cycStruct','ℤ₂ × ℤ₂');await has('cycLam','λ = 2 < φ(n) = 4');await click('cycNext');await has('cycStatus','ilkel kök yok');
   await range('cycN',97);await has('cycPrim','32 tane');await has('cycPhi','96 · formül 96');await range('cycN',100);await has('cycStruct','ℤ₂ × ℤ₂₀');await range('cycN',2);await has('cycPhi','1 · formül 1');await has('cycPrim','1 tane: 1');
   await has('isoVerdict','ℤ₆ ≅ ℤ₂ × ℤ₃');eq(await page.locator('#isoRows tr').count(),6);await pick('isoPair','z4');await has('isoVerdict','≇');await has('isoVerdictNote','eşleme aramaya gerek kalmadı');await has('isoProfNote','mertebesi 4 olan eleman sayısı ℤ₄ içinde 2');await pick('isoPair','u15');await has('isoVerdict','ℤ₁₅* ≅ ℤ₂ × ℤ₄');await has('isoVerdictNote','64 çiftin');await pick('isoPair','s3');await has('isoProfNote','S₃ değişmeli değil');
   await click('cycReset');await has('cycPrim','2 tane: 3, 7');eq(await page.locator('#isoPair').inputValue(),'z6');await noflow();
   // klavye, etiketler, çekirdek
   await page.locator('#tab-cyc').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-sym').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-ax').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-cyc').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-sym').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-cyc').isHidden(),true);
   await page.locator('#permSigma').evaluate(e=>e.focus());await page.keyboard.press('r');
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select,main button')].filter(e=>!(e.labels&&e.labels.length)&&!e.getAttribute('aria-label')&&!(e.tagName==='BUTTON'&&e.textContent.trim())).map(e=>e.id)),[]);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   eq(await page.evaluate(()=>/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC').replace(/[çğıöşüÇĞİÖŞÜ]/g,''))),false,'birleşik işaret');
   eq(await page.evaluate(()=>Object.isFrozen(GroupLab)&&!Object.getOwnPropertyDescriptor(window,'GroupLab').writable),true);eq(await page.locator('main a[href="asal-rsa.html"]').count()>=2,true);eq(await page.locator('script[src*="page-info"]').count(),0);
   for(const t of['sym','ax','perm','cyc']){await click('tab-'+t);await noflow();}assert.deepEqual(errors,[]);checks++;await page.close();console.log(`G ${SLUG}: ${checks-before} UI kontrolü PASS (${width} px, ${theme})`);}
 }catch(e){console.error(e);code=1;}finally{await browser?.close();server.close();}
 process.exit(code);
}
