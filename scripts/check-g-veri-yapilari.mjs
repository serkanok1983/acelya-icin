// G: veri-yapilari.html kalıcı denetimi.
// Çekirdek (VeriLab) burada sayfanın kendi formülleriyle değil, bağımsız başvurularla sınanır:
// kaba kuvvet, tüm permütasyonların/tüm hash atamalarının sayımı, JS'in yerleşik dizi işlemleri,
// sıralı küme başvurusu ve ayrı yazılmış kapalı biçimler.
// Kullanım: node scripts/check-g-veri-yapilari.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html=fs.readFileSync(new URL('../veri-yapilari.html',import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'KERNEL sınırları gerekli');
const context={window:{}};vm.createContext(context);vm.runInContext(source,context);
const K=context.window.VeriLab;assert(K&&Object.isFrozen(K),'VeriLab dondurulmuş olmalı');
let checks=0;
const ok=(c,msg)=>{assert(c,msg);checks++;};
const norm=x=>x===undefined?undefined:JSON.parse(JSON.stringify(x));
const eq=(a,b,msg)=>{if(msg)assert.deepEqual(norm(a),norm(b),msg);else assert.deepEqual(norm(a),norm(b));checks++;};
const near=(a,b,tol,msg)=>{assert(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${msg||''} ${a} ≠ ${b}`);checks++;};
// Testin kendi üreteci (sayfanınkinden farklı: LCG).
let lcgState=12345;const rnd=()=>{lcgState=(Math.imul(lcgState,1664525)+1013904223)>>>0;return lcgState/4294967296;};
const ri=n=>Math.floor(rnd()*n);
function* permutations(a){if(a.length<=1){yield a.slice();return;}for(let i=0;i<a.length;i++){const rest=a.slice(0,i).concat(a.slice(i+1));for(const p of permutations(rest))yield[a[i],...p];}}

/* ---------- 0. üreteç ---------- */
{const a=K.rng(42),b=K.rng(42),c=K.rng(43);const xa=[],xb=[],xc=[];for(let i=0;i<50;i++){xa.push(a());xb.push(b());xc.push(c());}
 eq(xa,xb,'aynı tohum aynı dizi');ok(xa.join()!==xc.join(),'farklı tohum farklı dizi');ok(xa.every(x=>x>=0&&x<1));
 let s=0;const r=K.rng(9);for(let i=0;i<20000;i++)s+=r();near(s/20000,.5,.02,'üreteç ortalaması');
 for(const[seed,n,max]of[[1,99,99],[7,2048,99999],[3,15,99],[5,0,10]]){const k=K.distinctKeys(seed,n,max);eq(k.length,n);eq(new Set(k).size,n);ok(k.every(x=>Number.isInteger(x)&&x>=1&&x<=max));}
 assert.throws(()=>K.distinctKeys(1,100,99));checks++;
 for(let n=1;n<5000;n++){if(K.floorLog2(n)!==31-Math.clz32(n))assert.fail('floorLog2 '+n);if(K.popcount(n)!==n.toString(2).replace(/0/g,'').length)assert.fail('popcount '+n);}checks+=2;}

/* ---------- 1a. büyüyen dizi ---------- */
{ // Bağımsız başvuru: kapasite dizisini ayrı üret, n'den küçük kalan kapasiteleri topla.
 const refCopies=(n,first,next)=>{let cap=first,sum=0,res=0;while(cap<n){sum+=cap;cap=next(cap);res++;}return{sum,cap,res};};
 for(let n=0;n<=3000;n++){
  const d=K.growth({n,policy:'double'}),rd=refCopies(n,1,c=>2*c);
  if(d.copies!==rd.sum||d.cap!==rd.cap||d.resizes!==rd.res)assert.fail('double '+n);
  if(n>0&&!(d.copies<2*n))assert.fail('ikiye katlama: ekleme başına < 2, n='+n);
  if(K.growthTheory({n,policy:'double'}).exact!==d.copies)assert.fail('double kapalı biçim '+n);
  const x=K.growth({n,policy:'x15'}),rx=refCopies(n,1,c=>c+Math.floor((c+1)/2));
  if(x.copies!==rx.sum||x.cap!==rx.cap)assert.fail('x15 '+n);
  if(n>0&&!(x.copies<3*n))assert.fail('× 1,5: ekleme başına < 3, n='+n);
  for(const k of[1,3,8,64]){const a=K.growth({n,policy:'addk',k}),j=Math.max(0,Math.ceil(n/k)-1);let sum=0;for(let t=1;t<=j;t++)sum+=t*k;
   if(a.copies!==sum||a.cap!==Math.max(k,Math.ceil(n/k)*k))assert.fail('addk '+n+' '+k);if(K.growthTheory({n,policy:'addk',k}).exact!==sum)assert.fail('addk kapalı biçim');}
 }
 checks+=3001*6;
 // 2^p eklemede 2^p − 1, 2^p + 1 eklemede 2^(p+1) − 1 kopya.
 for(let p=1;p<=12;p++){eq(K.growth({n:2**p,policy:'double'}).copies,2**p-1);eq(K.growth({n:2**p+1,policy:'double'}).copies,2**(p+1)-1);}
 // + k karesel: n iki katına çıkınca toplam ≈ 4 kat.
 near(K.growth({n:4096,policy:'addk',k:8}).copies/K.growth({n:2048,policy:'addk',k:8}).copies,4,.01,'karesel büyüme');
 // trace dizisi kümülatif ve son değeri toplam.
 const t=K.growth({n:500,policy:'x15',trace:true});eq(t.series.length,500);eq(t.series[499],t.copies);ok(t.series.every((v,i)=>i===0||v>=t.series[i-1]));
 eq(K.growth({n:1000,policy:'double'}).copies,1023);eq(K.growth({n:1000,policy:'x15'}).copies,2120);eq(K.growth({n:1000,policy:'addk',k:8}).copies,62000);
 for(const bad of[{n:-1},{n:1.5},{n:5,policy:'x'},{n:5,policy:'addk',k:0}]){assert.throws(()=>K.growth(bad));checks++;}
}

/* ---------- 1b. dizi ve bağlı liste ---------- */
{ const backward=L=>{const out=[];for(let nd=L.tail;nd;nd=nd.prev)out.push(nd.v);return out.reverse();};
 for(const doubly of[false,true])for(let round=0;round<60;round++){
  const n0=ri(12),ref=Array.from({length:n0},(_,i)=>100+i),arr=ref.slice(),L=K.listFrom(ref,doubly);let nextV=500;
  for(let step=0;step<60;step++){
   const n=ref.length,ins=n===0||rnd()<.55;
   if(ins){const i=ri(n+1),v=nextV++,moves=K.arrayInsert(arr,i,v),r=K.listInsert(L,i,v);ref.splice(i,0,v);
    eq(moves,n-i);const hops=n===0||i===0||i===n?0:doubly?Math.min(i,n-1-i):i-1;eq(r.hops,hops);eq(K.seqTheory('insert',i,n,doubly),{moves:n-i,hops});
    ok(r.writes>=2&&r.writes<=4);}
   else{const i=ri(n),moves=K.arrayDelete(arr,i),r=K.listDelete(L,i),[gone]=ref.splice(i,1);
    eq(moves,n-1-i);eq(r.value,gone);const hops=i===0?0:doubly?Math.min(i,n-1-i):i-1;eq(r.hops,hops);eq(K.seqTheory('delete',i,n,doubly),{moves:n-1-i,hops});}
   eq(arr,ref);eq(K.listToArray(L),ref);eq(L.size,ref.length);
   if(doubly)eq(backward(L),ref);
   ok(ref.length?L.head.v===ref[0]&&L.tail.v===ref[ref.length-1]&&L.tail.next===null:L.head===null&&L.tail===null,'baş/kuyruk');
  }}
 // Tek yönlü listede sondan silme n − 2 adım; çift yönlüde 0.
 for(const n of[2,5,20]){eq(K.listDelete(K.listFrom(Array.from({length:n},(_,i)=>i),false),n-1).hops,n-2);eq(K.listDelete(K.listFrom(Array.from({length:n},(_,i)=>i),true),n-1).hops,0);}
 assert.throws(()=>K.arrayInsert([1],3,0));assert.throws(()=>K.arrayDelete([],0));assert.throws(()=>K.listDelete(K.listFrom([],false),0));assert.throws(()=>K.listInsert(K.listFrom([1],false),5,0));checks+=4;
}

/* ---------- 2. halka tampon, parantez, sonek ---------- */
{ for(let round=0;round<80;round++){
  const cap=1+ri(12),s=K.ringNew(cap),ref=[];let shift=0,v=0,H=0,wr=0;const blk=x=>Math.floor(x/cap);/* H: başın sarılmamış (mutlak) konumu; dolanma = baş ya da son eleman blok sınırını geçer */
  for(let step=0;step<120;step++){
   const op=['pushBack','pushFront','popFront','popBack'][ri(4)];const r=K.ringOp(s,op,++v);
   if(op==='pushBack'){if(ref.length===cap)eq(r,{ok:false,error:'full'});else{ok(r.ok);if(ref.length&&blk(H+ref.length-1)!==blk(H+ref.length))wr++;ref.push(v);}}
   else if(op==='pushFront'){if(ref.length===cap)eq(r,{ok:false,error:'full'});else{ok(r.ok);shift+=ref.length;ref.unshift(v);if(blk(H)!==blk(H-1))wr++;H--;}}
   else if(op==='popFront'){if(!ref.length)eq(r,{ok:false,error:'empty'});else{eq(r.value,ref.shift());shift+=ref.length;if(blk(H)!==blk(H+1))wr++;H++;}}
   else{if(!ref.length)eq(r,{ok:false,error:'empty'});else{eq(r.value,ref.pop());if(ref.length&&blk(H+ref.length)!==blk(H+ref.length-1))wr++;}}
   eq(K.ringItems(s),ref);eq(s.count,ref.length);eq(K.ringTail(s),(s.head+ref.length)%cap);eq(s.shiftCost,shift);eq(s.wraps,wr,'dolanma sayacı');eq(s.head,((H%cap)+cap)%cap);
   ok(s.head>=0&&s.head<cap&&s.buf.filter(x=>x!==null).length===ref.length,'hücre sayımı');
  }}
 // Sayfadaki sarma gösterisi: 6 ekle, 4 çıkar, 5 ekle (kapasite 8).
 const s=K.ringNew(8);for(let i=1;i<=6;i++)K.ringOp(s,'pushBack',i);for(let i=0;i<4;i++)K.ringOp(s,'popFront');for(let i=7;i<=11;i++)K.ringOp(s,'pushBack',i);
 eq([s.head,K.ringTail(s),s.count,s.wraps,s.shiftCost],[4,3,7,1,14]);eq(K.ringItems(s),[5,6,7,8,9,10,11]);eq(s.buf,[9,10,11,null,5,6,7,8]);
 // Yığın kipi (baş hep 0): tamponu doldurup boşaltmak dolanma değildir. Kuyrukta baş, deque'de öne ekleme ucu gerçekten geçer.
 {const t=K.ringNew(8);for(let i=1;i<=8;i++)K.ringOp(t,'pushBack',i);eq(t.wraps,0,'son hücreye yazmak dolanma değil');K.ringOp(t,'popBack');eq([t.head,K.ringTail(t),t.count,t.wraps],[0,7,7,0]);for(let i=0;i<7;i++)K.ringOp(t,'popBack');eq([t.count,t.wraps],[0,0]);
  const q=K.ringNew(4);for(let i=0;i<4;i++)K.ringOp(q,'pushBack',i);for(let i=0;i<3;i++)K.ringOp(q,'popFront');eq(q.wraps,0);K.ringOp(q,'pushBack',9);eq([K.ringItems(q),q.wraps],[[3,9],1]);K.ringOp(q,'popFront');eq([q.head,q.wraps],[0,2]);K.ringOp(q,'popFront');eq([q.head,q.count,q.wraps],[1,0,2]);
  const d=K.ringNew(8);K.ringOp(d,'pushFront','a');eq([d.head,d.wraps],[7,1]);K.ringOp(d,'pushBack','b');eq([K.ringTail(d),d.wraps],[1,2]);K.ringOp(d,'popBack');eq(d.wraps,3);K.ringOp(d,'popBack');eq([d.count,d.wraps],[0,3]);}
 assert.throws(()=>K.ringNew(0));assert.throws(()=>K.ringOp(K.ringNew(2),'peek'));checks+=2;

 // Parantez: bağımsız başvuru = eşleşen çiftleri art arda silme.
 const reduceCheck=t=>{let b=[...t].filter(c=>'()[]{}'.includes(c)).join(''),prev;do{prev=b;b=b.replace(/\(\)|\[\]|\{\}/g,'');}while(b!==prev);return b==='';};
 const alpha='()[]{}ab';
 for(let i=0;i<6000;i++){let t='';const len=ri(13);for(let j=0;j<len;j++)t+=alpha[ri(alpha.length)];const r=K.brackets(t);if(r.ok!==reduceCheck(t))assert.fail('parantez: '+t);
  if(r.ok){let d=0,m=0;for(const c of t){if('([{'.includes(c))m=Math.max(m,++d);if(')]}'.includes(c))d--;}if(r.maxDepth!==m||r.pushes!==r.pops)assert.fail('derinlik: '+t);}}
 checks+=6000;
 for(const[t,okay,kind,index,depth]of[['{[(a+b)*c]-d}',true,null,null,3],['([)]',false,'mismatch',2,2],['((a+b)*c',false,'unclosed',0,2],['a+b)*(c',false,'extra',3,0],['(((())))',true,null,null,4],['',true,null,null,0]]){
  const r=K.brackets(t);eq(r.ok,okay);eq(r.maxDepth,depth);if(!okay){eq(r.error.kind,kind);eq(r.error.index,index);}}

 // Sonek: rastgele ifade ağaçları; değer ağaçtan doğrudan hesaplanır.
 const gen=d=>{if(d===0||rnd()<.3){const v=ri(9)+1;return{v,post:String(v)};}const op='+-*/'[ri(4)],a=gen(d-1),b=gen(d-1);const v=op==='+'?a.v+b.v:op==='-'?a.v-b.v:op==='*'?a.v*b.v:a.v/b.v;return{v,bad:!!(a.bad||b.bad||(op==='/'&&b.v===0)),post:a.post+' '+b.post+' '+op};};
 for(let i=0;i<3000;i++){const e=gen(4),r=K.postfix(e.post);if(e.bad){if(r.ok||r.error.kind!=='divzero')assert.fail('sıfıra bölme: '+e.post);}else{if(!r.ok||Math.abs(r.value-e.v)>1e-9*Math.max(1,Math.abs(e.v)))assert.fail('sonek: '+e.post);
   // Üretilen alışılmış yazım, bağımsız olarak JS ile değerlendirilir.
   const js=Function('"use strict";return '+r.infix.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-'))();if(Math.abs(js-e.v)>1e-9*Math.max(1,Math.abs(e.v)))assert.fail('infix: '+r.infix);}}
 checks+=3000;
 for(const[t,v,depth]of[['3 4 + 2 * 7 -',7,2],['5 1 2 + 4 * + 3 -',14,3],['2 3 ^ 4 5 * +',28,3],['1,5 2 *',3,2],['6 2 ÷',3,2]]){const r=K.postfix(t);ok(r.ok);eq(r.value,v);eq(r.maxDepth,depth);}
 eq(K.postfix('3 4 + 2 * 7 -').infix,'(((3 + 4) × 2) − 7)');
 for(const[t,kind]of[['3 +','underflow'],['4 0 /','divzero'],['1 2 3 +','leftover'],['',  'empty'],['2 x +','token'],['10 400 ^','range']]){const r=K.postfix(t);eq(r.ok,false);eq(r.error.kind,kind);eq(r.value,null);}
}

/* ---------- 3. hash ---------- */
{ // Yapısal değişmezler.
 for(const fn of['good','mod','digits'])for(const[m,n]of[[8,7],[64,48],[64,63],[101,60],[512,300],[16,40]]){
  const r=K.hashMeasure({m,n,fn,seed:3,misses:500});eq(r.keys.length,n);eq(r.absent.length,500);eq(r.buckets.reduce((s,b)=>s+b.length,0),n);
  ok(r.keys.every(k=>K.chainFind(r.buckets,k,fn).found)&&r.absent.every(k=>!K.chainFind(r.buckets,k,fn).found),'zincir arama');
  ok(r.buckets.every((b,i)=>b.every(k=>K.hashFns[fn](k,m)===i)),'yuva = h(k)');
  // Ölçülen ortalamaların bağımsız yeniden hesabı: zincirdeki konumların toplamı.
  let pos=0;for(const b of r.buckets)pos+=b.length*(b.length+1)/2;near(r.chain.hit,pos/n,1e-12,'zincir bulunan');
  near(r.chain.miss,r.absent.reduce((s,k)=>s+r.buckets[K.hashFns[fn](k,m)].length,0)/500,1e-12,'zincir bulunmayan');
  if(n<m){eq(r.slots.filter(x=>x!==null).length,n);ok(r.keys.every(k=>K.probeFind(r.slots,k,fn).found)&&r.absent.every(k=>!K.probeFind(r.slots,k,fn).found),'yoklama arama');
   // Başvuru: aynı tabloyu kaba kuvvetle yeniden kur, her anahtarın yer değiştirmesini say.
   const t=new Array(m).fill(null);let disp=0;for(const k of r.keys){let i=K.hashFns[fn](k,m);while(t[i]!==null)i=(i+1)%m;t[i]=k;}
   for(let i=0;i<m;i++)if(t[i]!==null)disp+=((i-K.hashFns[fn](t[i],m)+m)%m)+1;eq(r.slots,t);near(r.probe.hit,disp/n,1e-12,'yoklama bulunan');
   let miss=0;for(const k of r.absent){let i=K.hashFns[fn](k,m),p=1;while(t[i]!==null){i=(i+1)%m;p++;}miss+=p;}near(r.probe.miss,miss/500,1e-12,'yoklama bulunmayan');
  }else{eq(r.probe,null);eq(r.slots,null);}
 }
 assert.throws(()=>K.probeBuild([1,2,3],3,'good'));checks++;
 // Kuram formülleri: küçük m, n için TÜM m^n hash atamalarının kaba kuvvet sayımı (düzgün hash varsayımı).
 for(const[m,n]of[[2,1],[3,2],[4,3],[5,3],[5,4],[6,4],[7,3]]){
  let chHit=0,chMiss=0,lpHit=0,lpMiss=0,count=0;const h=new Array(n).fill(0);
  for(;;){
   const b=Array.from({length:m},()=>0);let hit=0;for(const x of h){b[x]++;hit+=b[x];}chHit+=hit/n;chMiss+=n/m;
   const t=new Array(m).fill(false);let ph=0;for(const x of h){let i=x,p=1;while(t[i]){i=(i+1)%m;p++;}t[i]=true;ph+=p;}lpHit+=ph/n;
   let pm=0;for(let s0=0;s0<m;s0++){let i=s0,p=1;while(t[i]){i=(i+1)%m;p++;}pm+=p;}lpMiss+=pm/m;count++;
   let d=0;while(d<n&&++h[d]===m){h[d]=0;d++;}if(d===n)break;
  }
  const th=K.hashTheory(m,n);near(th.chainHit,chHit/count,1e-12,'zincir bulunan kuramı');near(th.chainMiss,chMiss/count,1e-12);near(th.probeHit,lpHit/count,1e-12,`Knuth bulunan m=${m} n=${n}`);near(th.probeMiss,lpMiss/count,1e-12,`Knuth bulunmayan m=${m} n=${n}`);
 }
 // m → ∞ limiti: sonlu-m değeri klasik formüle yakınsar.
 for(const alpha of[.25,.5,.75]){const m=200000,th=K.hashTheory(m,alpha*m);near(th.probeHit,.5*(1+1/(1-alpha)),2e-3,'limit bulunan');near(th.probeMiss,.5*(1+1/(1-alpha)**2),2e-3,'limit bulunmayan');near(th.chainHit,1+alpha/2,1e-4);}
 // Asimptotik formül sonlu m'de büyük sapar: m = 64, n = 48'de limit 8,5 iken tam değer 6,13.
 {const th=K.hashTheory(64,48);near(th.probeMiss,6.1338,1e-4);near(th.probeMissLimit,8.5,1e-12);near(th.probeHit,2.1770,1e-4);near(th.chainHit,1.3671875,1e-12);}
 eq(K.hashTheory(16,16).probeHit,null);eq(K.hashTheory(16,40).probeMiss,null);
 // İyi fonksiyon + Monte Carlo ortalaması kurama uyar (birkaç tohum ve boyut).
 for(const[m,n,seed]of[[64,48,7],[64,48,31],[128,64,2],[97,80,11],[256,128,5],[64,58,7]]){
  const a=K.hashAverage({m,n,fn:'good',seed,tables:200}),th=K.hashTheory(m,n);
  near(a.chainHit,th.chainHit,.02,'MC zincir bulunan');near(a.chainMiss,th.chainMiss,.04,'MC zincir bulunmayan');near(a.probeHit,th.probeHit,.05,'MC yoklama bulunan');near(a.probeMiss,th.probeMiss,.08,'MC yoklama bulunmayan');}
 // Düzgünlük: 99 999 anahtarın 64 yuvaya dağılımı (ki-kare, 63 serbestlik derecesi; 130 çok cömert bir eşik).
 {const m=64,c=new Array(m).fill(0);for(let k=1;k<=99999;k++)c[K.hashFns.good(k,m)]++;const e=99999/m;const chi=c.reduce((s,x)=>s+(x-e)**2/e,0);ok(chi<130,'ki-kare '+chi);}
 // Kötü fonksiyon: rakam toplamı en çok 45; ölçülen maliyet kuramın çok üstünde.
 {let mx=0;for(let k=1;k<=99999;k++)mx=Math.max(mx,K.hashFns.digits(k,1000));eq(mx,45);
  const r=K.hashMeasure({m:64,n:48,fn:'digits',seed:7}),th=K.hashTheory(64,48);ok(r.chain.used<=46&&r.chain.miss>2*th.chainMiss&&r.probe.miss>3*th.probeMiss,'kötü hash bozulması');}
 // Yeniden boyutlandırma: m iki katına çıkınca α yarıya iner, kuram maliyeti düşer.
 {const a=K.hashTheory(64,48),b=K.hashTheory(128,48);near(b.alpha,a.alpha/2,1e-12);ok(b.probeMiss<a.probeMiss&&b.chainHit<a.chainHit);}
}

/* ---------- 4. BST ve AVL ---------- */
{ const depthStats=T=>{let ipl=0,h=-1,n=0;const rec=(nd,d)=>{if(!nd)return;n++;ipl+=d;h=Math.max(h,d);rec(nd.left,d+1);rec(nd.right,d+1);};rec(T.root,0);return{ipl,h,n};};
 const avlOk=nd=>{if(!nd)return 0;const l=avlOk(nd.left),r=avlOk(nd.right);if(l<0||r<0||Math.abs(l-r)>1)return-1;return 1+Math.max(l,r);};
 // Bağımsız AVL yükseklik üst sınırı: h yüksekliğindeki en seyrek ağaç N(h) = N(h−1) + N(h−2) + 1.
 const N=[1,2];for(let h=2;h<40;h++)N.push(N[h-1]+N[h-2]+1);const maxAvl=n=>{let h=0;while(N[h+1]<=n)h++;return h;};
 for(let n=1;n<=20000;n++){const th=K.treeTheory(n);if(th.avlMax!==maxAvl(n)||th.minHeight!==Math.floor(Math.log2(n)+1e-12)||!(th.avlMax<=th.avlFormula)||th.maxHeight!==n-1)assert.fail('treeTheory '+n);}checks+=20000;
 eq(K.treeTheory(0).minHeight,null);
 for(let round=0;round<120;round++){
  const B=K.treeNew(false),A=K.treeNew(true),ref=new Set();
  for(let step=0;step<150;step++){
   const key=1+ri(60);
   if(rnd()<.62){const had=ref.has(key),a=K.treeInsert(B,key),b=K.treeInsert(A,key);ref.add(key);eq(a.inserted,!had);eq(b.inserted,!had);ok(b.rotations.length<=2,'eklemede en çok 2 temel dönüş');eq(a.rotations.length,0);}
   else{const had=ref.has(key),a=K.treeDelete(B,key),b=K.treeDelete(A,key);ref.delete(key);eq(a.removed,had);eq(b.removed,had);}
   const sorted=[...ref].sort((x,y)=>x-y);
   for(const T of[B,A]){
    eq(K.treeTraverse(T,'in'),sorted);eq(T.size,sorted.length);const d=depthStats(T),s=K.treeStats(T);eq([s.n,s.height,s.ipl],[d.n,d.h,d.ipl]);eq(K.treeHeight(T),d.h);ok(s.ordered&&s.heightsOk);
    if(sorted.length){ok(d.h>=Math.floor(Math.log2(sorted.length)),'alt sınır');near(s.meanSearch,(d.ipl+d.n)/d.n,1e-12);}
   }
   ok(avlOk(A.root)>=0&&K.treeStats(A).balanced,'AVL dengesi');if(ref.size)ok(K.treeHeight(A)<=maxAvl(ref.size),'AVL üst sınırı');
   const probe=1+ri(60);for(const T of[B,A]){const f=K.treeFind(T,probe);eq(f.found,ref.has(probe));eq(f.comparisons,f.path.length);if(f.found)eq(f.path[f.path.length-1],probe);}
  }
  // Dolaşmalar: önce-kök + sıralı dizilerinden ağaç bağımsız kurulur; sonra-kök ve düzey sırası ondan türetilir.
  for(const T of[B,A]){const pre=K.treeTraverse(T,'pre'),ino=K.treeTraverse(T,'in');
   const build=(p,i)=>{if(!p.length)return null;const root=p[0],k=i.indexOf(root);return{key:root,left:build(p.slice(1,1+k),i.slice(0,k)),right:build(p.slice(1+k),i.slice(k+1))};};
   const t=build(pre,ino),post=[],lvl=[];const po=nd=>{if(!nd)return;po(nd.left);po(nd.right);post.push(nd.key);};po(t);const q=t?[t]:[];while(q.length){const nd=q.shift();lvl.push(nd.key);if(nd.left)q.push(nd.left);if(nd.right)q.push(nd.right);}
   eq(K.treeTraverse(T,'post'),post);eq(K.treeTraverse(T,'level'),lvl);
   const lay=K.treeLayout(T);eq(lay.map(o=>o.key),ino);eq(lay.map(o=>o.x),ino.map((_,i)=>i));
   // Yerleşim çakışmasızlığı: aynı derinlikteki iki düğüm arasında en az bir sıra indisi boşluk var.
   const byDepth=new Map();for(const o of lay){const prev=byDepth.get(o.depth);if(prev!==undefined&&o.x-prev<2)assert.fail('aynı düzeyde bitişik düğüm');byDepth.set(o.depth,o.x);}checks++;
  }}
 // Sıralı girdi: BST zincir (h = n − 1), AVL 2^k − 1 anahtarda kusursuz ağaç (h = k − 1).
 for(const dir of[1,-1])for(const n of[1,3,7,15,31,63,127,500]){const B=K.treeNew(false),A=K.treeNew(true);for(let i=1;i<=n;i++){K.treeInsert(B,dir>0?i:n+1-i);K.treeInsert(A,dir>0?i:n+1-i);}
  eq(K.treeHeight(B),n-1);near(K.treeStats(B).meanSearch,(n+1)/2,1e-12);if(((n+1)&n)===0){eq(K.treeHeight(A),Math.log2(n+1)-1);eq(A.rotations,n-Math.log2(n+1));}ok(K.treeHeight(A)<=maxAvl(n));}
 // Rastgele BST'nin beklenen arama maliyeti: n ≤ 7 için bütün ekleme sıraları sayılır (kesin sonuç).
 for(let n=1;n<=7;n++){let sum=0,count=0;for(const p of permutations(Array.from({length:n},(_,i)=>i+1))){const T=K.treeNew(false);for(const k of p)K.treeInsert(T,k);sum+=K.treeStats(T).meanSearch;count++;}
  let H=0;for(let i=1;i<=n;i++)H+=1/i;near(sum/count,2*(1+1/n)*H-3,1e-10,'rastgele BST beklenen değeri n='+n);near(K.treeTheory(n).randomMean,sum/count,1e-10);}
 // AVL: n ≤ 7 için bütün ekleme sıralarında denge ve yükseklik sınırı.
 for(let n=1;n<=7;n++)for(const p of permutations(Array.from({length:n},(_,i)=>i+1))){const T=K.treeNew(true);for(const k of p)K.treeInsert(T,k);if(avlOk(T.root)<0||K.treeHeight(T)>maxAvl(n))assert.fail('AVL perm');}checks+=7;
 // Dönüş örnekleri: 10,20,30 tek sola dönüş; 30,10,20 çift dönüş (2 temel dönüş).
 {const T=K.treeNew(true);K.treeInsert(T,10);K.treeInsert(T,20);const r=K.treeInsert(T,30);eq(r.rotations,[{dir:'L',down:10,up:20}]);eq(K.treeTraverse(T,'pre'),[20,10,30]);
  const U=K.treeNew(true);K.treeInsert(U,30);K.treeInsert(U,10);const q=K.treeInsert(U,20);eq(q.rotations.map(x=>x.dir),['L','R']);eq(K.treeTraverse(U,'pre'),[20,10,30]);}
 // Sayfanın varsayılan durumu (tohum 3, 15 anahtar).
 {const keys=K.distinctKeys(3,15,99),B=K.treeNew(false),A=K.treeNew(true);for(const k of keys){K.treeInsert(B,k);K.treeInsert(A,k);}
  eq(keys,[72,5,47,11,77,51,52,22,32,59,28,19,75,54,82]);eq([K.treeHeight(B),K.treeHeight(A),A.rotations],[6,4,8]);near(K.treeStats(B).meanSearch,64/15,1e-12);near(K.treeStats(A).meanSearch,50/15,1e-12);}
}

/* ---------- 5. heap ---------- */
{ const sumFloorLog=n=>{let s=0;for(let i=1;i<=n;i++)s+=31-Math.clz32(i);return s;};
 // Yükseklikler toplamı = n − (ikilik yazımdaki 1 sayısı): bağımsız sayım.
 for(let n=1;n<=3000;n++){let sum=0;for(let i=0;i<n;i++){let h=0,j=i;while(2*j+1<n){j=2*j+1;h++;}sum+=h;}const th=K.heapTheory(n);if(th.floydBound!==2*sum||th.insertWorst!==sumFloorLog(n)||th.insertStep!==31-Math.clz32(n))assert.fail('heapTheory '+n);}checks+=3000;
 // n ≤ 8: bütün permütasyonlar.
 for(let n=1;n<=8;n++){let maxF=0,maxI=0;const th=K.heapTheory(n);for(const p of permutations(Array.from({length:n},(_,i)=>i+1))){const f=K.heapFloyd(p),ins=K.heapByInserts(p);if(!K.heapOk(f.heap)||!K.heapOk(ins.heap)||f.heap[0]!==1||ins.heap[0]!==1)assert.fail('heap perm');maxF=Math.max(maxF,f.comparisons);maxI=Math.max(maxI,ins.comparisons);}
  ok(maxF<=th.floydBound&&maxF<2*n,'Floyd sınırı n='+n);eq(maxI,th.insertWorst,'ekleme en kötü durumu n='+n);}
 for(let round=0;round<300;round++){
  const n=1+ri(400),vals=Array.from({length:n},()=>ri(1000)),f=K.heapFloyd(vals),ins=K.heapByInserts(vals),th=K.heapTheory(n);
  ok(K.heapOk(f.heap)&&K.heapOk(ins.heap));ok(f.comparisons<=th.floydBound&&f.comparisons<2*n,'Floyd ≤ 2(n − popcount)');ok(ins.comparisons<=th.insertWorst);
  const sorted=vals.slice().sort((a,b)=>a-b);
  for(const h of[f.heap.slice(),ins.heap.slice()]){const out=[];let size=h.length;while(h.length){const r=K.heapExtract(h);size--;out.push(r.min);if(r.comparisons>2*(size?31-Math.clz32(size):0))assert.fail('çıkarma sınırı');if(!K.heapOk(h))assert.fail('çıkarma sonrası heap');}eq(out,sorted);}
 }
 eq(K.heapExtract([]),null);
 // Tek tek ekleme: karşılaştırma ≤ ⌊log₂ n⌋, yer değiştirme = iz uzunluğu − 1.
 {const a=[];for(let i=0;i<2000;i++){const r=K.heapInsert(a,ri(5000));if(r.comparisons>31-Math.clz32(a.length)||r.swaps!==r.trace.length-1||r.trace[0]!==a.length-1)assert.fail('ekleme');}checks++;}
 // Azalan girdi: ardışık ekleme tam olarak Σ⌊log₂ i⌋; artan girdi: n − 1.
 for(const n of[1,2,10,255,256,1000,2047]){eq(K.heapByInserts(K.heapInput(n,'desc',1)).comparisons,sumFloorLog(n));eq(K.heapByInserts(K.heapInput(n,'asc',1)).comparisons,n-1);eq(K.heapFloyd(K.heapInput(n,'asc',1)).swaps,0);
  const inp=K.heapInput(n,'random',5);eq(inp.slice().sort((a,b)=>a-b),Array.from({length:n},(_,i)=>i+1));}
 // Sayfanın varsayılan sayıları.
 {const r=K.heapInput(1000,'random',5);eq([K.heapFloyd(r).comparisons,K.heapByInserts(r).comparisons],[1885,2309]);const d=K.heapInput(1000,'desc',5);eq([K.heapFloyd(d).comparisons,K.heapByInserts(d).comparisons,K.heapTheory(1000).floydBound],[1982,7987,1988]);
  eq(K.heapByInserts(K.distinctKeys(11,10,99)).heap,[6,14,51,53,50,61,56,60,64,85]);}
 // Rastgele girdide ardışık ekleme doğrusal kalır (birkaç tohum): eleman başına < 3.
 for(const seed of[1,5,17,42,99])for(const n of[500,2000]){const c=K.heapByInserts(K.heapInput(n,'random',seed)).comparisons/n;ok(c>1.5&&c<3,'rastgele ekleme ortalaması '+c);}
}
console.log(`G veri-yapilari: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

/* ---------- tarayıcı ---------- */
if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const before=checks;
 try{
  browser=await chromium.launch();
  for(const[width,theme]of[[390,'light'],[1280,'dark']]){
   const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});const page=await ctx.newPage();
   await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(6000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&!/404/.test(m.text()))errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/veri-yapilari.html`);await page.waitForTimeout(300);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).replace(/ /g,' ');
   const range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v);
   const sel=(id,v)=>page.locator('#'+id).selectOption(v),type=(id,v)=>page.locator('#'+id).fill(v);
   const has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`[${width}] ${id}: «${t}» içinde «${text}» yok`);checks++;};
   const is=async(id,text)=>{const t=await read(id);assert.equal(t,text,`[${width}] ${id}`);checks++;};
   const noOverflow=async tag=>{const d=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);assert(d<=0,`[${width}] yatay taşma ${tag}: ${d}`);checks++;};
   const inked=async id=>{assertCanvasDrawn(await canvasInk(page,'#'+id),{minDistinct:3,label:`[${width}] ${id}`});checks++;};
   eq(await page.evaluate(()=>document.documentElement.dataset.theme==='light'),theme==='light');
   eq(await page.evaluate(()=>Object.isFrozen(VeriLab)&&!Object.getOwnPropertyDescriptor(window,'VeriLab').writable),true);

   /* 01 */
   await is('growCopies','1023');await has('growCopiesTheory','= 1023 · fark 0');await is('growPer','1,023');await has('growPerBound','2’den küçük');await is('growCap','1024 / 1000');await is('growResizes','10');await inked('growChart');
   eq(await page.locator('#growK').isDisabled(),true);
   await click('growFull');await is('growPer','0,999');await is('growNOut','1024');await click('growJust');await is('growCopies','2047');await is('growPer','1,997');await is('growCap','2048 / 1025');
   await sel('growPolicy','x15');await range('growN',1000);await is('growCopies','2120');await is('growPer','2,120');await has('growPerBound','3’ten küçük');await has('growCopiesTheory','3000');
   await sel('growPolicy','addk');eq(await page.locator('#growK').isDisabled(),false);await is('growCopies','62 000');await has('growCopiesTheory','= 62 000 · fark 0');await is('growPer','62,000');await has('growPerBound','62,500');
   await range('growN',2000);await is('growCopies','249 000');await range('growK',1);await range('growN',4096);await is('growCopies','8 386 560');await range('growN',1);await is('growCopies','0');await is('growPer','0,000');
   await sel('growPolicy','double');await range('growN',1);await is('growCopies','0');await is('growCap','1 / 1');await range('growN',4096);await is('growCopies','4095');
   // araya ekleme / silme
   await has('seqPosOut','5 (n = 10)');await is('seqArrMoves','—');await click('seqInsert');await is('seqArrMoves','5');await has('seqArrTheory','= 5 · fark 0');await is('seqListHops','4');await has('seqListTheory','i − 1 = 4 · fark 0');await is('seqListWrites','2');await is('seqTotals','5 · 4');
   await click('seqHead');await click('seqInsert');await is('seqArrMoves','11');await is('seqListHops','0');await has('seqListTheory','uç işlem');
   await click('seqEnd');await has('seqPosOut','12 (n = 12)');await click('seqDelete');await has('seqStatus','Silme yapılmadı');await is('seqArrMoves','—');
   await click('seqInsert');await is('seqArrMoves','0');await is('seqListHops','0');
   await click('seqLast');await click('seqDelete');await is('seqArrMoves','0');await is('seqListHops','11');await has('seqStatus','baştan yürümek gerekti');
   await sel('seqKind','cift');await is('seqTotals','0 · 0');await click('seqLast');await click('seqDelete');await is('seqListHops','0');await click('seqMid');await click('seqInsert');await has('seqListTheory','min(i, n − 1 − i)');
   eq(await page.locator('#seqArrayView .vy-cell').count(),await page.locator('#seqListView .vy-cell').count());
   await range('seqN',20);for(let i=0;i<5;i++)await click('seqInsert');await has('seqStatus','en çok 24');eq(await page.locator('#seqArrayView .vy-cell').count(),24);
   await range('seqN',4);for(let i=0;i<4;i++){await click('seqHead');await click('seqDelete');}eq(await page.locator('#seqDelete').isDisabled(),true);await has('seqListView','Liste boş');await click('seqInsert');await is('seqListWrites','2');
   await noOverflow('dizi');
   await click('diziReset');await is('growCopies','1023');await is('growNOut','1000');await has('seqPosOut','5 (n = 10)');await is('seqTotals','0 · 0');

   /* 02 */
   await click('tab-yigin');await is('ringCount','0 / 8');eq(await page.locator('#ringPushFront').isDisabled(),true);eq(await page.locator('#ringPopBack').isDisabled(),true);
   await click('ringPopFront');await has('ringStatus','Boşalma');
   await click('ringDemo');await is('ringHead','4');await is('ringTail','3');await has('ringTailTheory','(4 + 7) mod 8 = 3');await is('ringCount','7 / 8');await has('ringWraps','1 kez');await is('ringMoves','0');await has('ringShift','14 eleman');await has('ringLogical','5, 6, 7, 8, 9, 10, 11');await has('ringOut','1, 2, 3, 4');
   await click('ringPushBack');await is('ringCount','8 / 8');await click('ringPushBack');await has('ringStatus','Taşma');await is('ringCount','8 / 8');
   await sel('ringMode','stack');await is('ringCount','0 / 8');eq(await page.locator('#ringPopFront').isDisabled(),true);for(let i=0;i<8;i++)await click('ringPushBack');await is('ringCount','8 / 8');await is('ringTail','0');await has('ringWraps','dolanma: 0 kez');await click('ringPopBack');await is('ringCount','7 / 8');await has('ringWraps','dolanma: 0 kez');await sel('ringMode','queue');await sel('ringMode','stack');await is('ringCount','0 / 8');for(const v of['a','b','c']){await type('ringValue',v);await click('ringPushBack');}await click('ringPopBack');await has('ringOut','c');await is('ringHead','0');await is('ringTail','2');
   await type('ringValue','');await click('ringPushBack');await has('ringStatus','değer boş');
   await sel('ringMode','deque');eq(await page.locator('#ringPushFront').isDisabled(),false);await type('ringValue','5');await click('ringPushFront');await is('ringHead','7');await is('ringTail','0');await click('ringPushFront');await is('ringHead','6');await click('ringPopBack');await has('ringOut','5');await click('ringPopFront');await has('ringOut','5, 6');await is('ringCount','0 / 8');
   await range('ringCap',4);await is('ringCount','0 / 4');for(let i=0;i<5;i++)await click('ringPushBack');await has('ringStatus','Taşma');await range('ringCap',12);await is('ringCount','0 / 12');
   // parantez
   await is('brRead','0 / 13');await click('brStep');await is('brRead','1 / 13');await has('brStatus','açılış');await click('brRun');await has('brStatus','Dengeli');await is('brDepth','3');eq(await page.locator('#brStep').isDisabled(),true);
   await sel('brPreset','([)]');await click('brRun');await has('brStatus','eşleşmiyor');await is('brDepth','2');await sel('brPreset','((a+b)*c');await click('brRun');await has('brStatus','hiç kapanmadı');await sel('brPreset','a+b)*(c');await click('brRun');await has('brStatus','yığın boştu');
   await type('brText','');await has('brStatus','İfade boş');await type('brText','[{}]');await click('brRun');await has('brStatus','Dengeli');await click('brRestart');await is('brRead','0 / 4');
   // sonek
   await click('pfRun');await is('pfResult','7');await has('pfInfix','(((3 + 4) × 2) − 7)');await is('pfDepth','2');await click('pfRestart');await is('pfResult','—');await click('pfStep');await has('pfStatus','bir sayı');
   await sel('pfPreset','5 1 2 + 4 * + 3 -');await click('pfRun');await is('pfResult','14');await is('pfDepth','3');await sel('pfPreset','2 3 ^ 4 5 * +');await click('pfRun');await is('pfResult','28');
   await sel('pfPreset','3 +');await click('pfRun');await is('pfResult','Tanımsız');await has('pfStatus','iki sayı ister');await sel('pfPreset','4 0 /');await click('pfRun');await has('pfStatus','sıfıra bölme');await is('pfResult','Tanımsız');await sel('pfPreset','1 2 3 +');await click('pfRun');await has('pfStatus','işleç eksik');
   await type('pfText','1 3 /');await click('pfRun');await is('pfResult','0,3333');await type('pfText','');await has('pfStatus','İfade boş');await type('pfText','7 2,5 *');await click('pfRun');await is('pfResult','17,5');
   await noOverflow('yigin');await click('yiginReset');await is('ringCount','0 / 8');await is('brRead','0 / 13');await is('pfResult','—');eq(await page.locator('#ringMode').inputValue(),'queue');

   /* 03 */
   await click('tab-hash');await is('hashAlpha','0,750');await is('hChainHit','1,458');await is('hChainHitAvg','1,370');await has('hChainHitTh','1,367');await is('hChainMiss','0,751');await has('hChainMissTh','0,750');await is('hProbeHit','2,438');await is('hProbeHitAvg','2,170');await has('hProbeHitTh','2,177');await has('hProbeHitTh','2,500');await is('hProbeMiss','9,287');await is('hProbeMissAvg','6,271');await has('hProbeMissTh','6,134');await has('hProbeMissTh','8,500');await is('hProbeMissDiff','+2,2 %');await is('hashMaxChain','4');await is('hashMaxCluster','30');await has('hashUsed','31 / 64');await inked('hashCanvas');
   await click('hashPickHit');await has('hashSearchOut','bulundu');await click('hashPickMiss');await has('hashSearchOut','yok');await type('hashKey','abc');await click('hashFind');await has('hashSearchOut','Arama yapılmadı');await type('hashKey','0');await click('hashFind');await has('hashSearchOut','Arama yapılmadı');
   await click('hashDouble');await is('hashMOut','128');await is('hashAlpha','0,375');await has('hashStatus','64 → 128');await has('hashStatus','0,750 → 0,375');
   await click('hashReset');await is('hashMOut','64');await sel('hashFn','digits');await has('hashStatus','varsayımı bozulduğu');await is('hProbeMiss','34,452');await is('hChainMiss','2,274');await has('hashUsed','21 / 64');
   await sel('hashFn','mod');await is('hChainHit','1,354');await sel('hashFn','good');
   await range('hashN',64);await is('hProbeHit','Tanımsız');await is('hProbeMissAvg','Tanımsız');await is('hashMaxCluster','Tanımsız');await has('hashStatus','n < m olmalı');await is('hashAlpha','1,000');await has('hChainMissTh','1,000');
   await range('hashN',63);await has('hProbeMissTh','32,500');await range('hashN',512);await range('hashM',8);await is('hashAlpha','64,000');await is('hProbeHit','Tanımsız');await range('hashM',512);await range('hashN',1);await is('hChainHit','1,000');await is('hProbeHit','1,000');eq(await page.locator('#hashDouble').isDisabled(),true);
   await noOverflow('hash');await click('hashReset');await is('hChainHit','1,458');await is('hashNOut','48');

   /* 04 */
   await click('tab-agac');await is('treeCount','15');await is('bstH','6');await is('avlH','4');await has('treeMinH','= 3');await has('avlHNote','üst sınırı 4');await has('avlHNote','4,56');await is('bstMean','4,267');await has('randMean','4,079');await is('avlMean','3,333');await is('avlRot','8');await has('treeCheck','sağlanıyor');await inked('bstCanvas');await inked('avlCanvas');
   await has('treeWalkOut','BST: 5, 11, 19, 22, 28, 32, 47, 51, 52, 54, 59, 72, 75, 77, 82');await has('treeWalkOut','AVL: 5, 11, 19, 22, 28, 32, 47, 51, 52, 54, 59, 72, 75, 77, 82');
   await sel('treeWalk','pre');await has('treeWalkOut','BST: 72, 5, 47');await sel('treeWalk','level');await has('treeWalkOut','BST: 72, 5, 77');await sel('treeWalk','post');await sel('treeWalk','in');
   await type('treeKey','54');await click('treeFind');await has('treeStatus','bulundu');await click('treeInsert');await has('treeStatus','zaten ağaçta');await is('treeCount','15');
   await type('treeKey','50');await click('treeFind');await has('treeStatus','ağaçta yok');await click('treeInsert');await is('treeCount','16');await click('treeDelete');await is('treeCount','15');await click('treeDelete');await has('treeStatus','ağaçta yok');
   await type('treeKey','0');await click('treeInsert');await has('treeStatus','1 ile 99 arasında');await type('treeKey','x');await click('treeFind');await has('treeStatus','1 ile 99 arasında');
   await sel('treeOrder','asc');await is('bstH','14');await is('avlH','3');await has('treeStatus','zincire döndü');await is('bstMean','8,000');await sel('treeOrder','desc');await is('bstH','14');
   await range('treeN',31);await is('bstH','30');await is('avlH','4');await is('avlRot','26');await type('treeKey','1');await click('treeInsert');await has('treeStatus','en çok 31');
   const hBst=await page.locator('#bstCanvas').evaluate(c=>c.getBoundingClientRect().height);ok(hBst>=30*22+40&&hBst<760,'zincir çizimi sığmalı: '+hBst);
   await range('treeN',1);await is('bstH','0');await is('avlH','0');await has('treeMinH','= 0');
   await click('treeClear');await is('treeCount','0');await is('bstH','Tanımsız');await is('avlMean','Tanımsız');await has('treeWalkOut','Ağaç boş');
   for(const k of['10','20','30','40','50','60','70']){await type('treeKey',k);await click('treeInsert');}await is('bstH','6');await is('avlH','2');await is('avlRot','4');await has('treeStatus','sola dönüş');
   await type('treeKey','40');await click('treeDelete');await is('treeCount','6');await has('treeCheck','sağlanıyor');
   await range('treeSeed',99);await range('treeN',31);await sel('treeOrder','random');await has('treeCheck','sağlanıyor');
   await noOverflow('agac');await click('agacReset');await is('bstH','6');await is('treeNOut','15');eq(await page.locator('#treeOrder').inputValue(),'random');

   /* 05 */
   await click('tab-heap');await is('heapSize','10');await has('heapProp','sağlanıyor');eq(await page.locator('#heapArray .vy-cell').first().textContent(),'60');await inked('heapCanvas');await inked('buildChart');
   await click('heapInsert');await is('heapSize','11');await is('heapLastCmp','3');await has('heapLastBound','= 3 · pay 0');await is('heapLastSwaps','3');eq(await page.locator('#heapArray .vy-cell').first().textContent(),'10');
   await click('heapExtract');await has('heapOut','1');await is('heapSize','10');await has('heapLastBound','2⌊log₂ n⌋ = 6');await click('heapExtract');await click('heapExtract');await has('heapOut','1, 6, 14');
   await type('heapValue','0');await click('heapInsert');await has('heapStatus','1 ile 99 arasında');await is('heapSize','8');
   await click('heapClear');await is('heapSize','0');await click('heapExtract');await has('heapStatus','yığın boş');
   for(let i=0;i<32;i++)await click('heapRandom');await is('heapSize','31');await has('heapStatus','en çok 31');await has('heapProp','sağlanıyor');
   const outs=[];for(let i=0;i<31;i++)await click('heapExtract');const outText=(await read('heapOut')).replace(/[^0-9,]/g,'').split(',').filter(Boolean).map(Number);ok(outText.length===31&&outText.every((v,i)=>i===0||v>=outText[i-1]),'çıkış sırası küçükten büyüğe');void outs;
   await is('floydCmp','1885');await has('floydBound','= 1988 · pay 103');await is('floydPer','1,885');await is('insCmp','2309');await has('insWorst','= 7987');await is('insPer','2,309');await has('insPerNote','1,22 katı');
   await sel('buildOrder','desc');await is('floydCmp','1982');await is('insCmp','7987');await has('insWorst','fark 0');await is('insPer','7,987');eq(await page.locator('#buildSeed').isDisabled(),true);
   await sel('buildOrder','asc');await is('insCmp','999');await is('floydCmp','999');
   await range('buildN',1);await is('floydCmp','0');await is('insCmp','0');await has('buildStatus','Tek eleman');await range('buildN',2047);await sel('buildOrder','desc');await is('insCmp','18 434');await has('floydBound','= 4072');
   await noOverflow('heap');await click('heapReset');await is('heapSize','10');await is('floydCmp','1885');await is('buildNOut','1000');

   /* klavye, etiketler, tablo */
   await page.locator('#tab-heap').focus();await page.keyboard.press('Home');eq(await page.locator('#tab-dizi').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-yigin').getAttribute('aria-selected'),'true');await page.keyboard.press('End');eq(await page.locator('#tab-heap').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-dizi').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-heap').getAttribute('aria-selected'),'true');
   eq(await page.locator('[role=tabpanel]:not([hidden])').count(),1);
   await range('buildN',50);await page.locator('h1').click();await page.keyboard.press('r');await is('buildNOut','1000');
   await page.locator('#heapValue').focus();await page.keyboard.type('r');await is('heapSize','10');await type('heapValue','2');await page.locator('#heapValue').press('Enter');await is('heapSize','11');
   const unlabeled=await page.evaluate(()=>[...document.querySelectorAll('main input,main select')].filter(e=>!document.querySelector('label[for="'+e.id+'"]')).map(e=>e.id));eq(unlabeled,[]);
   const canv=await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length);eq(canv,0);
   const cmp=await page.evaluate(()=>{const cells=[...document.querySelectorAll('.vy-big tbody td')];return{n:cells.length,bad:cells.filter(td=>!td.querySelector('b')||!td.querySelector('small')||td.querySelector('small').textContent.trim().length<20).length,star:document.querySelector('.vy-cmp').textContent.includes('*')};});eq(cmp,{n:30,bad:0,star:false});
   const text=await page.evaluate(()=>document.querySelector('main').innerText);ok(!/[̀-ͯ]/.test(text.normalize('NFC')),'birleşik işaret yok');ok(!/\p{Extended_Pictographic}/u.test(text.replace(/[→⇄∅]/g,'')),'emoji yok');
   for(const t of['dizi','yigin','hash','agac','heap']){await click('tab-'+t);await noOverflow('sekme '+t);}
   assert.deepEqual(errors,[],`[${width}] konsol hatası`);checks++;await ctx.close();
  }
  // Canlandırma açıkken de son durum doğru olmalı (hareket azaltma kapalı).
  {const page=await browser.newPage({viewport:{width:900,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(`http://127.0.0.1:${server.address().port}/veri-yapilari.html`);await page.locator('#tab-heap').click();await page.locator('#heapInsert').click();await page.locator('#heapExtract').click();await page.waitForTimeout(2200);
   eq(await page.locator('#heapArray .vy-cell').allTextContents(),['60','141','512','533','504','615','566','607','648','859']);eq(await page.locator('#heapSize').textContent(),'10');assert.deepEqual(errors,[]);await page.close();}
  console.log(`G veri-yapilari: ${checks-before} tarayıcı kontrolü (390 px aydınlık + 1280 px karanlık) PASS`);
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
}
