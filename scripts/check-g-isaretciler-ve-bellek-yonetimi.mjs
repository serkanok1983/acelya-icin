// İşaretçiler ve bellek yönetimi laboratuvarı: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın kendi formüllerini yinelemez: Node Buffer okuma/yazmaları, kaba kuvvet blok taraması,
// bayt dizisi üzerinde elle strcpy, Floyd–Warshall kapanışı. `--browser` ile gerçek arayüz de sınanır.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const SLUG='isaretciler-ve-bellek-yonetimi';
const html=fs.readFileSync(new URL(`../${SLUG}.html`,import.meta.url),'utf8');
const source=html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source,'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context={};vm.createContext(context);vm.runInContext(source+';globalThis.K=PointerLab;',context);
const K=context.K;let checks=0;
const ok=(c,m)=>{assert(c,m);checks++;},eq=(a,b,m)=>{assert.deepStrictEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)),m||"eşit değil");checks++;};
const near=(a,b,t=1e-12)=>{assert(Math.abs(a-b)<=t,`${a} ≠ ${b}`);checks++;};
let seed=12345;const rnd=()=>{seed=(Math.imul(seed,1103515245)+12345)>>>0;return seed/4294967296;},ri=(a,b)=>a+Math.floor(rnd()*(b-a+1));
ok(Object.isFrozen(K),'çekirdek dondurulmuş olmalı');

/* ---- 1. tipli okuma/yazma: Node Buffer ile karşılaştırma ---- */
{const B={char:['readInt8','writeInt8',1,-128,127],short:['readInt16LE','writeInt16LE',2,-32768,32767],int:['readInt32LE','writeInt32LE',4,-2147483648,2147483647]};
 for(const[type,[rd,wr,size,lo,hi]]of Object.entries(B)){eq(K.SIZES[type],size);
  for(let i=0;i<400;i++){const v=i<2?[lo,hi][i]:ri(lo,hi),off=ri(0,64-size),mem=new Uint8Array(64),buf=Buffer.alloc(64);K.writeLE(mem,off,type,v);buf[wr](v,off);eq(Array.from(mem),Array.from(buf));eq(K.readLE(mem,off,type),buf[rd](off));}}
 for(let i=0;i<400;i++){const v=[0,-0,1.5,-2.25,Math.PI,1e308,5e-324,Infinity,-Infinity][i]??(rnd()-0.5)*10**ri(-20,20),off=ri(0,56),mem=new Uint8Array(64),buf=Buffer.alloc(64);K.writeLE(mem,off,'double',v);buf.writeDoubleLE(v,off);eq(Array.from(mem),Array.from(buf));ok(Object.is(K.readLE(mem,off,'double'),buf.readDoubleLE(off)));}
 for(let i=0;i<200;i++){const v=ri(0,2**31)*ri(1,2**20),mem=new Uint8Array(16),buf=Buffer.alloc(16);K.writeLE(mem,3,'ptr',v);buf.writeBigUInt64LE(BigInt(v),3);eq(Array.from(mem),Array.from(buf));eq(K.readLE(mem,3,'ptr'),v);eq(K.hexLE(mem,3,8),v.toString(16).toUpperCase().padStart(16,'0'));}
 // int'e sığmayan değer: alt 32 bit (Buffer ile değil, modüler aritmetikle)
 {const mem=new Uint8Array(8);K.writeLE(mem,0,'char',300);eq(K.readLE(mem,0,'char'),44);K.writeLE(mem,0,'short',-32769);eq(K.readLE(mem,0,'short'),32767);}
 // başlangıç belleği: elle kurulan Buffer
 const ref=Buffer.alloc(64);ref.write('Merhaba\0',0,'latin1');[100,200,-3,1000].forEach((v,i)=>ref.writeInt16LE(v,8+2*i));[10,20,30,40].forEach((v,i)=>ref.writeInt32LE(v,16+4*i));ref.writeDoubleLE(1.5,32);ref.writeDoubleLE(-2.25,40);ref.writeBigUInt64LE(0x1010n,48);ref.writeBigUInt64LE(0x1030n,56);
 const mem=K.initMemory();eq(Array.from(mem),Array.from(ref));eq(K.BASE,0x1000);eq(K.LEN,64);
 // yerleşim: çakışmasız, boşluksuz, her değişken kendi boyuna hizalı
 let end=K.BASE;for(const v of K.LAYOUT){eq(v.addr,end);eq(v.addr%K.SIZES[v.type],0);end+=v.count*K.SIZES[v.type];}eq(end,K.BASE+K.LEN);
 // p + k: sayarak ilerleme = taban + k·sizeof(T); a[i] ≡ *(a+i); fark
 const rdr={char:o=>ref.readInt8(o),short:o=>ref.readInt16LE(o),int:o=>ref.readInt32LE(o),double:o=>ref.readDoubleLE(o)};
 for(const type of['char','short','int','double'])for(const v of K.LAYOUT)for(let k=-4;k<=16;k++){const size=K.SIZES[type],addr=K.advance(v.addr,type,k);eq(addr,v.addr+k*size);
  const d=K.deref(mem,addr,type),inside=addr>=0x1000&&addr+size<=0x1040;eq(d.ok,inside);
  if(inside){ok(Object.is(d.value,rdr[type](addr-0x1000)));eq(d.bytes,Array.from(ref.subarray(addr-0x1000,addr-0x1000+size)));}else eq(d.why,addr===0?'null':addr>0&&addr<0x1000?'unmapped':'range');
  const total=v.count*K.SIZES[v.type],off=k*size;eq(K.bounds(v,type,k),off>=0&&off+size<=total?'inside':off===total?'onepast':'outside');
  for(let j=-4;j<=16;j+=5){const df=K.ptrDiff(addr,K.advance(v.addr,type,j),type);eq(df.elements,k-j);eq(df.bytes,(k-j)*size);eq(df.exact,true);}}
 for(let i=0;i<4;i++){eq(K.deref(mem,K.advance(0x1010,'int',i),'int').value,[10,20,30,40][i]);eq(K.deref(mem,K.advance(0x1008,'short',i),'short').value,[100,200,-3,1000][i]);}
 eq(K.deref(mem,0,'int'),{ok:false,why:'null'});eq(K.deref(mem,8,'int').why,'unmapped');eq(K.deref(mem,0xFFF,'char').why,'unmapped');eq(K.deref(mem,0x103D,'int').why,'range');eq(K.deref(mem,-8,'int').why,'range');eq(K.deref(mem,0x1040,'char').why,'range');
 eq(K.store(mem,0,'int',1).ok,false);eq(K.store(mem,0x1040,'char',1).ok,false);eq(Array.from(mem),Array.from(ref));
 // işaretçiye işaretçi: **pp = a[0]; (*pp)++ sonrası a[1]
 const pp=K.deref(mem,0x1038,'ptr').value;eq(pp,0x1030);const q=K.deref(mem,pp,'ptr').value;eq(q,0x1010);eq(K.deref(mem,q,'int').value,10);
 K.store(mem,pp,'ptr',K.advance(q,'int',1));eq(K.deref(mem,K.deref(mem,pp,'ptr').value,'int').value,20);eq(mem[0x30],0x14);
 // işaretçi üzerinden yazma komşu baytlara dokunmaz
 const m2=K.initMemory();K.store(m2,0x1014,'int',-2);const r2=Buffer.from(ref);r2.writeInt32LE(-2,0x14);eq(Array.from(m2),Array.from(r2));
 eq(K.owner(0x1017).name,'a');eq(K.owner(0x1038).name,'pp');eq(K.owner(0x1040),null);
 // little-endian: int a[1] = 20 → 14 00 00 00; char* ile 4. bayt
 eq(K.deref(K.initMemory(),0x1014,'char').value,20);eq(K.deref(K.initMemory(),0x1024,'int').value,0x3FF80000);}

/* ---- 2. ayırıcı: her işlemden sonra kaba kuvvet değişmezleri ve bağımsız politika başvurusu ---- */
const up=(n,a)=>{let x=n;while(x%a)x++;return x;};
function auditHeap(st){let off=0,head=0,used=0,free=0,req=0,largest=0,pad=0;const ids=new Set();
 st.blocks.forEach((b,i)=>{assert.equal(b.off,off);assert(b.size>=up(9,st.A)&&b.size%st.A===0);assert.equal((st.base+b.off+8)%st.A,0);off+=b.size;head+=8;
  if(b.used){assert(b.req>=1&&b.req<=b.size-8&&!ids.has(b.id));ids.add(b.id);used+=b.size-8;req+=b.req;pad+=up(b.req+8,st.A)-8-b.req;}else{free+=b.size-8;largest=Math.max(largest,b.size-8);if(st.coalesce&&i>0)assert(st.blocks[i-1].used,'bitişik iki boş blok');}});
 assert.equal(off,st.arena);const m=K.heapMetrics(st);
 assert.deepStrictEqual([m.headers,m.usedCap,m.freeCap,m.sum,m.req,m.internal,m.alignPad,m.slack,m.largest],[head,used,free,st.arena,req,used-req,pad,used-req-pad,largest]);
 assert.equal(m.ext,free>0?1-largest/free:null);assert(m.slack>=0);checks+=4;return ids;}
function expectPick(st,n,rover){const need=up(n+8,st.A),F=st.blocks.filter(b=>!b.used&&b.size>=need);if(!F.length)return null;
 if(st.policy==='first')return F[0].off;if(st.policy==='best')return F.reduce((a,b)=>b.size<a.size?b:a).off;
 const after=F.filter(b=>b.off>=rover);return(after.length?after[0]:F[0]).off;}
for(const policy of['first','best','next'])for(const coalesce of[true,false])for(const A of[4,8,16])for(const dist of['small','mixed','bimodal'])for(const s of[1,5,77]){
 const cfg={policy,coalesce,A},ops=K.heapWorkload(s,160,dist,0.5),st=K.heapNew(cfg);eq(st.base%A===(A===16?8:0),true);let rover=0,fails=0,frag=0;const live=new Set();
 for(const o of ops){if(o.op==='m'){const want=expectPick(st,o.n,rover),need=up(o.n+8,A),freeSum=st.blocks.reduce((a,b)=>a+(b.used?0:b.size),0),r=K.heapMalloc(st,o.id,o.n);
   if(want===null){assert.equal(r.ok,false);fails++;assert.equal(r.frag,freeSum>=need);if(freeSum>=need)frag++;}
   else{assert.equal(r.ok,true);assert.equal(r.addr,st.base+want+8);assert(r.cap>=o.n&&r.cap-o.n<need-o.n-8+up(9,A));live.add(o.id);const b=st.blocks.find(x=>x.used&&x.id===o.id);rover=(b.off+b.size)%st.arena;}}
  else{const r=K.heapFree(st,o.id);assert.equal(r.ok,live.has(o.id));live.delete(o.id);
   if(coalesce){const m=st.blocks.find(b=>rover>b.off&&rover<b.off+b.size);if(m)rover=m.off;}}
  const ids=auditHeap(st);assert.deepStrictEqual([...ids].sort((a,b)=>a-b),[...live].sort((a,b)=>a-b));assert.equal(st.rover,rover);checks++;}
 eq(st.stats.fails,fails);eq(st.stats.fragFails,frag);
 const rep=K.heapReplay(cfg,ops);eq(rep.st.blocks,st.blocks);eq(rep.history.length,ops.length);eq(rep.history.filter(h=>h.fail).length,fails);}
// iş yükü üreteci: belirlenimci, tutarlı, dağılım sınırları içinde
for(const[dist,lo,hi]of[['small',8,32],['mixed',8,128],['bimodal',8,200]])for(const s of[1,2,3,5,9999]){const ops=K.heapWorkload(s,400,dist,0.45);eq(ops,K.heapWorkload(s,400,dist,0.45));eq(ops.length,400);
 const seen=new Set(),freed=new Set();let frees=0;for(const o of ops){if(o.op==='m'){ok(!seen.has(o.id)&&o.n>=lo&&o.n<=hi);seen.add(o.id);}else{ok(seen.has(o.id)&&!freed.has(o.id));freed.add(o.id);frees++;}}
 ok(Math.abs(frees/400-0.45)<0.1,'free oranı');if(dist==='bimodal')ok(!ops.some(o=>o.op==='m'&&o.n>24&&o.n<96));}
ok(JSON.stringify(K.heapWorkload(1,50,'mixed',0.5))!==JSON.stringify(K.heapWorkload(2,50,'mixed',0.5)));
// delikli düzen: elle hesap. 8 × (8 + 104) = 896; kalan 128 (8 + 120). Boş yük 4×104 + 120 = 536; en büyük 120.
{const holes=[];for(let i=1;i<=8;i++)holes.push({op:'m',id:i,n:100});for(const i of[1,3,5,7])holes.push({op:'f',id:i});
 const m=K.heapReplay({},holes).metrics;eq([m.nBlocks,m.headers,m.usedCap,m.freeCap,m.sum,m.internal,m.alignPad,m.slack,m.largest],[9,72,416,536,1024,16,16,0,120]);near(m.ext,1-120/536);
 const f=K.heapReplay({},holes.concat([{op:'m',id:9,n:200}])).results.at(-1);eq([f.ok,f.frag,f.need,f.freeSum,f.largest],[false,true,208,576,128]);
 const g=K.heapReplay({},holes.concat([{op:'f',id:2},{op:'m',id:9,n:200}]));eq([g.results.at(-1).ok,g.results.at(-1).addr,g.results.at(-2).merged],[true,0x2008,2]);
 const h=K.heapReplay({coalesce:false},holes.concat([{op:'f',id:2},{op:'m',id:9,n:200}]));eq([h.results.at(-1).ok,h.results.at(-1).frag,h.st.stats.fragFails],[false,true,1]);
 // bölünemeyen artık: 16 B hizalamada malloc(1000): blok 1008, artan 16 = en küçük blok → bölünür; malloc(1010): 1024 tam
 const z=K.heapNew({A:8});const r=K.heapMalloc(z,1,1009);eq([r.ok,r.cap,r.split],[true,1016,false]);eq(K.heapMetrics(z).slack,0);eq(K.heapMetrics(z).internal,7);
 const y=K.heapNew({A:8});K.heapMalloc(y,1,1000);eq(K.heapMetrics(y).nBlocks,2);K.heapMalloc(y,2,1);eq(K.heapMetrics(y).freeCap,0);eq(K.heapMetrics(y).ext,null);eq(K.heapMalloc(y,3,1).frag,false);
 // varsayılan iş yükü (tohum 5, karışık, 200 işlem, p = 0,50): sabitlenmiş sayılar
 const rows=K.heapCompare({A:8},K.heapWorkload(5,200,'mixed',0.5));eq(rows.map(r=>[r.policy,r.coalesce,r.fails,r.fragFails,r.largest]),[['first',true,9,8,88],['first',false,31,31,64],['best',true,13,11,104],['best',false,25,25,88],['next',true,10,10,64],['next',false,46,46,56]]);
 for(const bad of[()=>K.heapNew({A:3}),()=>K.heapNew({policy:'worst'}),()=>K.heapMalloc(K.heapNew(),1,0),()=>K.heapMalloc(K.heapNew(),1,1.5),()=>K.heapWorkload(1,10,'x',0.5)]){assert.throws(bad);checks++;}}

/* ---- 3. bellek hataları ---- */
{const C=K.ERR,run=(p,f,n,s)=>K.errRun(p,f,n,s);
 // adım tutarlılığı: s adımlık koşu, her program için belirlenimci ve sınırlar kırpılıyor
 for(const p of['uaf','double','leak','stack','obo'])for(const f of[false,true]){const full=run(p,f,12);eq(full.step,full.total);eq(run(p,f,12,1e9).step,full.total);eq(run(p,f,12,-3).step,0);eq(run(p,f,12,0).line,-1);
  for(let s=0;s<=full.total;s++){const x=run(p,f,12,s);eq(x.step,s);eq(x,run(p,f,12,s));ok(x.line<x.lines.length);}}
 // serbest bıraktıktan sonra kullanma
 let x=run('uaf',false);eq([x.out,x.metrics.uafAccesses,x.events],[['7'],1,['uaf']]);eq(x.vars.find(v=>v.name==='p').value,x.vars.find(v=>v.name==='q').value);eq(x.vars.find(v=>v.name==='p').dangling,true);
 eq(Buffer.from(run('uaf',false,0,2).heap).readInt32LE(0),42);eq(Number(Buffer.from(run('uaf',false,0,3).heap).readBigUInt64LE(0)),C.HEAP0+C.CHUNK);
 x=run('uaf',true);eq([x.out,x.metrics.uafAccesses,x.events,x.vars.find(v=>v.name==='p').value],[[],0,[],0]);
 // çift serbest bırakma: ikinci free'den sonra liste döngülü; sonunda c == d ve çıktı 2
 x=run('double',false,0,3);eq([x.list.cyclic,x.list.distinct,x.events],[true,1,['double-free']]);eq(Number(Buffer.from(x.heap).readBigUInt64LE(0)),C.HEAP0);
 x=run('double',false);eq([x.out,x.metrics.doubleFrees,x.metrics.shared,x.list.wild,x.alloc[0]],[['2'],1,[C.HEAP0],2,2]);eq(x.vars.find(v=>v.name==='c').value,x.vars.find(v=>v.name==='d').value);
 x=run('double',true);eq([x.out,x.metrics.doubleFrees,x.metrics.shared,x.list.cyclic,x.list.wild,x.list.nodes],[['1'],0,[],false,null,[0x3020,0x3030]]);ok(x.vars.find(v=>v.name==='c').value!==x.vars.find(v=>v.name==='d').value);
 // sızıntı: dört parça × 16 B; beşinci istek başarısız. Düzeltilmişte hepsi geri verilir.
 x=run('leak',false);eq([x.metrics.leakedBlocks,x.metrics.leakedBytes,x.metrics.mallocs,x.metrics.nullMallocs,x.metrics.frees,x.list.nodes],[4,64,5,1,0,[]]);eq([0,16,32,48].map(o=>x.heap[o]),[65,66,67,68]);
 for(let s=0;s<=x.total;s++){const y=run('leak',false,0,s),al=y.metrics.mallocs-y.metrics.nullMallocs-y.metrics.frees,known=new Set(y.vars.filter(v=>v.type==='ptr'&&v.value).map(v=>v.value)).size;eq(y.metrics.leakedBlocks,al-known);}
 x=run('leak',true);eq([x.metrics.leakedBlocks,x.metrics.mallocs,x.metrics.nullMallocs,x.metrics.frees,x.list.distinct],[0,5,0,5,4]);
 // yığın taşması: 32 baytlık Buffer üzerinde elle strcpy
 const ret0=Buffer.alloc(8);ret0.writeBigUInt64LE(BigInt(C.RET0));
 for(let n=0;n<=31;n++)for(const f of[false,true]){const ref=Buffer.alloc(32,0xAA);ref.writeBigUInt64LE(BigInt(C.FP0),16);ref.writeBigUInt64LE(BigInt(C.RET0),24);ref.writeInt32LE(0,8);
  const m=f?Math.min(n,7):n;for(let i=0;i<m;i++)ref[i]=0x41;ref[m]=0;const y=run('stack',f,n);
  eq(y.stack,Array.from(ref));eq(y.metrics.oobBytes,f?0:Math.max(0,n+1-8));eq(y.metrics.yetki,ref.readInt32LE(8));eq(y.out.length,ref.readInt32LE(8)!==0?1:0);
  const retBad=!ref.subarray(24).equals(ret0);eq(y.halt,retBad?'bad-return':null);eq(y.events.includes('ret'),retBad);eq(retBad,!f&&n>=24);eq(y.events.includes('fp'),!f&&n>=16&&n<24);if(f)eq(y.events,[]);}
 eq(run('stack',false,8).metrics.yetki,0);eq(run('stack',false,9).metrics.yetki,0x41);eq(run('stack',false,12).metrics.yetki,0x41414141);eq(run('stack',false,24).metrics.retHex,'0000000000401100');
 assert.throws(()=>run('stack',false,32));assert.throws(()=>run('stack',false,-1));assert.throws(()=>run('yok',false,0));checks+=3;
 // bir fazla tur
 x=run('obo',false);eq([x.out,x.metrics.sinir,x.metrics.oobBytes],[['40'],40,4]);eq([0,4,8,12].map(o=>Buffer.from(x.stack).readInt32LE(o)),[0,10,20,30]);
 x=run('obo',true);eq([x.out,x.metrics.sinir,x.metrics.oobBytes],[['99'],99,0]);}

/* ---- 4. çöp toplama: Floyd–Warshall kapanışıyla karşılaştırma ---- */
function closure(n,edges){const R=Array.from({length:n},()=>new Array(n).fill(false));for(const[f,t,w]of edges)if(!w)R[f][t]=true;
 for(let k=0;k<n;k++)for(let i=0;i<n;i++)if(R[i][k])for(let j=0;j<n;j++)if(R[k][j])R[i][j]=true;return R;}
for(let trial=0;trial<4000;trial++){const n=ri(0,10),edges=[],roots=[];if(n){for(let e=ri(0,2*n);e>0;e--)edges.push([ri(0,n-1),ri(0,n-1),rnd()<0.2]);for(let r=ri(0,3);r>0;r--)roots.push(ri(0,n-1));}
 const g=K.gcAnalyze(n,roots,edges),R=closure(n,edges),reach=[],leak=[];
 for(let v=0;v<n;v++)reach.push(roots.includes(v)||roots.some(r=>R[r][v]));
 for(let v=0;v<n;v++)if(!reach[v]&&Array.from({length:n},(_,u)=>u).some(u=>!reach[u]&&R[u][u]&&(u===v||R[u][v])))leak.push(v);
 eq(g.mark,reach);eq(g.leaked,leak);eq(g.theoryLeaked,leak);eq(g.swept,reach.map((r,i)=>r?-1:i).filter(i=>i>=0));
 eq([...g.order].sort((a,b)=>a-b),reach.map((r,i)=>r?i:-1).filter(i=>i>=0));eq([...g.freeOrder].sort((a,b)=>a-b),g.freed.map((f,i)=>f?i:-1).filter(i=>i>=0));
 const strong=edges.filter(e=>!e[2]),uniq=[...new Set(roots)];
 for(let v=0;v<n;v++){ok(!(g.freed[v]&&reach[v]));eq(g.rc0[v],uniq.filter(r=>r===v).length+strong.filter(e=>e[1]===v).length);
  if(!g.freed[v])eq(g.rc[v],uniq.filter(r=>r===v).length+strong.filter(e=>e[1]===v&&!g.freed[e[0]]).length);if(!g.freed[v]&&!reach[v])ok(g.rc[v]>0);}
 eq(g.decrements,strong.filter(e=>g.freed[e[0]]).length);eq(g.scanned,strong.filter(e=>reach[e[0]]).length);}
{const E=[[0,1],[1,2],[3,4],[4,3],[4,5]];let g=K.gcAnalyze(6,[0,3],E);eq([g.swept,g.leaked,g.decrements,g.scanned],[[],[],0,5]);
 g=K.gcAnalyze(6,[0],E);eq([g.swept,g.leaked,g.theoryLeaked,g.freeOrder,g.scanned],[[3,4,5],[3,4,5],[3,4,5],[],2]);
 g=K.gcAnalyze(6,[0],[[0,1],[1,2],[3,4],[4,3,true],[4,5]]);eq([g.swept,g.leaked,g.freeOrder,g.decrements],[[3,4,5],[],[3,4,5],2]);
 g=K.gcAnalyze(4,[],[[0,1],[1,2],[2,3]]);eq([g.leaked,g.freeOrder,g.decrements],[[],[0,1,2,3],3]);
 g=K.gcAnalyze(4,[],[[0,1],[1,0],[1,2],[2,1],[2,3],[3,2]]);eq(g.leaked,[0,1,2,3]);
 g=K.gcAnalyze(2,[],[[0,1],[1,1]]);eq([g.leaked,g.freeOrder],[[1],[0]]);
 assert.throws(()=>K.gcAnalyze(2,[5],[]));assert.throws(()=>K.gcAnalyze(2,[],[[0,2]]));checks+=2;}
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi (Buffer, kaba kuvvet ayırıcı, elle strcpy, Floyd–Warshall) PASS`);

if(process.argv.includes('--browser')){
 const {chromium}=await import('playwright');const {createServer}=await import('node:http');const {join,extname}=await import('node:path');const {fileURLToPath}=await import('node:url');const root=fileURLToPath(new URL('../',import.meta.url));
 const server=createServer((req,res)=>{const file=join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{browser=await chromium.launch();const before=checks;
  for(const[theme,width]of[['light',390],['dark',1280]]){const ctx=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:width===390?2:1});const page=await ctx.newPage();
   await page.addInitScript(t=>{localStorage.setItem('acelya-theme',t);localStorage.setItem('acelya-sound-muted','1');},theme);page.setDefaultTimeout(5000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
   const click=id=>page.locator('#'+id).click(),read=async id=>(await page.locator('#'+id).textContent()).trim(),sel=(id,v)=>page.locator('#'+id).selectOption(v),
    range=(id,v)=>page.locator('#'+id).evaluate((e,v)=>{e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));},v),
    has=async(id,text)=>{const t=await read(id);assert(t.includes(text),`${id}: "${t}" içinde "${text}" yok`);checks++;},is=async(id,text)=>{assert.equal(await read(id),text,id);checks++;},
    bad=async(id,b)=>{assert.equal(await page.locator('#'+id).evaluate(e=>e.classList.contains('is-bad')),b,id+' is-bad');checks++;},
    noflow=async()=>{assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'yatay taşma');checks++;};
   // erişilebilirlik: her denetimin etiketi, her tuvalin rolü, tek hint
   eq(await page.evaluate(()=>[...document.querySelectorAll('main input,main select,main textarea')].filter(e=>!(e.id&&document.querySelector('label[for="'+e.id+'"]'))&&!e.getAttribute('aria-label')).map(e=>e.id)),[]);
   eq(await page.evaluate(()=>[...document.querySelectorAll('main canvas')].filter(c=>c.getAttribute('role')!=='img'||!c.getAttribute('aria-label')).length),0);
   eq(await page.evaluate(()=>[document.querySelectorAll('main p.hint').length,document.querySelectorAll('[role=tab]').length,document.querySelectorAll('main button:not([aria-label])').length>0&&[...document.querySelectorAll('main button')].every(b=>b.textContent.trim()||b.getAttribute('aria-label'))]),[1,4,true]);
   eq(await page.evaluate(()=>Object.isFrozen(PointerLab)&&!Object.getOwnPropertyDescriptor(window,'PointerLab').writable),true);
   /* 01 */
   await is('ptSize','4 bayt');await is('ptAddrMeas','0x1014');await has('ptAddrTheo','0x1010 + 1 × 4 = 0x1014');await is('ptAddrDiff','0 bayt');await is('ptValue','20');await is('ptBytes','14 00 00 00');await has('ptDiffMeas','= 1 eleman');await has('ptDiffTheo','= 1 eleman');await has('ptSame','a[1]');await is('ptQQ','10');await bad('ptStatus',false);
   eq(await page.locator('#ptGrid .c').count(),64);eq(await page.locator('#ptGrid .c.is-p').count(),4);eq(await page.locator('#ptGrid .c.is-r').count(),4);
   await click('ptPreWalk');await is('ptValue','30');await is('ptAddrMeas','0x1018');await has('ptDiffMeas','8 bayt ÷ 4 = 2 eleman');
   await click('ptPreBytes');await is('ptValue','20 (yazdırılamaz)');await is('ptAddrMeas','0x1014');await is('ptSize','1 bayt');
   await click('ptPreOut');await is('ptValue','1073217536');await has('ptStatus','dışında');await bad('ptStatus',true);await has('ptSame','5[a]');await has('ptSame','tanımsız davranış');await range('ptK',-1);await has('ptSame','(−1)[a]');await has('ptSame','tanımsız davranış');await range('ptK',3);await has('ptSame','üçü de 40 verir');
   await range('ptK',4);await has('ptStatus','sonundan bir sonraki adres');await is('ptValue','0');
   await click('ptPreNull');await is('ptValue','okunamadı');await has('ptStatus','p = NULL');await has('ptStatus','garanti değildir');await bad('ptStatus',true);await is('ptAddrMeas','0x0000');
   await click('ptWrite');await has('ptStatus','yazılamadı');await range('ptK',-4);await is('ptAddrMeas','0xFFFFFFFFFFFFFFF0');await range('ptK',16);await is('ptAddrMeas','0x0040');await has('ptStatus','eşlenmemiş');
   await click('ptReset');await page.locator('#ptVal').fill('-7');await click('ptWrite');await is('ptValue','−7');await is('ptBytes','F9 FF FF FF');await has('ptVars','10, −7, 30, 40');await bad('ptStatus',false);
   await page.locator('#ptVal').fill('abc');await click('ptWrite');await has('ptStatus','bir sayı değil');await page.locator('#ptVal').fill('1,5');await click('ptWrite');await has('ptStatus','kesirli');await is('ptValue','−7');
   await sel('ptType','double');await sel('ptBase','d');await range('ptK',0);await is('ptValue','1,5');await page.locator('#ptVal').fill('2,75');await click('ptWrite');await is('ptValue','2,75');
   await sel('ptType','char');await sel('ptBase','s');await range('ptK',0);await is('ptValue',"77 ('M')");await page.locator('#ptVal').fill('300');await click('ptWrite');await has('ptStatus','sığmıyor');await is('ptValue',"44 (',')");
   await click('ptQInc');await is('ptQ','0x1014');await is('ptQQ','−7');await click('ptQDec');await click('ptQDec');await is('ptQ','0x100C');await has('ptQQ','65601533');await has('ptQQ','a dizisinin dışında');
   await click('ptReset');await sel('ptType','double');await is('ptValue','8,4880 × 10^−313');await has('ptStatus','strict aliasing');await has('ptStatus','IEEE 754 double diye okunmuş');await sel('ptType','char');eq((await read('ptStatus')).includes('IEEE 754'),false);await click('ptReset');await is('ptValue','20');await is('ptQQ','10');await is('ptKOut','1');eq(await page.locator('#ptVal').inputValue(),'99');await noflow();
   /* sekmeler: klavye */
   await page.locator('#tab-ptr').focus();await page.keyboard.press('End');eq(await page.locator('#tab-gc').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-ptr').getAttribute('aria-selected'),'true');await page.keyboard.press('ArrowLeft');eq(await page.locator('#tab-gc').getAttribute('aria-selected'),'true');await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');eq(await page.locator('#tab-heap').getAttribute('aria-selected'),'true');eq(await page.locator('#panel-ptr').isHidden(),true);eq(await page.locator('#panel-heap').isVisible(),true);
   /* 02 */
   await is('alSum','1024 B');await is('alSumDiff','0 B');await is('alExt','%0,0');await is('alLargest','1016 B');await is('alFails','0 / 0');eq(await page.locator('#alFreeBtn').isDisabled(),true);eq(await page.locator('#alT').isDisabled(),true);
   await click('alHoles');await is('alHeaders','9 × 8 = 72 B');await is('alUsed','416 B');await is('alFree','536 B');await is('alSum','1024 B');await is('alLargest','120 B');await is('alExt','%77,6');await is('alInt','16 B');await is('alPad','16 B');await is('alSlack','0 B');await is('alTOut','12 / 12');
   await range('alSize',200);await click('alMalloc');await has('alStatus','başarısız');await has('alStatus','576 bayt');await bad('alStatus',true);await is('alFails','1 / 9');await is('alFragFails','1');
   await sel('alFreeSel','2');await click('alFreeBtn');await has('alStatus','2 komşu boş blokla birleştirildi');await is('alLargest','328 B');await click('alMalloc');await has('alStatus','0x2008');await is('alFails','1 / 10');
   await page.locator('#alCoalesce').uncheck();await has('alStatus','baştan yürütüldü');await is('alFails','2 / 10');await is('alSum','1024 B');await page.locator('#alCoalesce').check();await is('alFails','1 / 10');
   await range('alT',12);await is('alExt','%77,6');await is('alTOut','12 / 15');await has('alStatus','12. işleminden sonraki an');
   await click('alRun');await is('alTOut','200 / 200');await is('alFails','9 / 106');await is('alFragFails','8');await is('alSum','1024 B');await is('alSumDiff','0 B');await is('alExt','%31,3');await is('alLargest','88 B');await is('alInt','40 B');await is('alPad','32 B');await is('alSlack','8 B');
   eq(await page.locator('#alCompare tr').evaluateAll(r=>r.map(x=>x.children[2].textContent+'/'+x.children[3].textContent)),['9/8','31/31','13/11','25/25','10/10','46/46']);eq(await page.locator('#alCompare tr.is-cur').count(),1);
   await sel('alPolicy','best');await is('alFails','13 / 106');await sel('alPolicy','next');await is('alFails','10 / 106');await sel('alAlign','16');await is('alSum','1024 B');await is('alSumDiff','0 B');await has('alBlocks','0x2008');await sel('alAlign','4');await is('alSum','1024 B');
   await page.locator('#alSeed').fill('0');await click('alRun');await has('alStatus','Tohum 1 ile 9999');await bad('alStatus',true);await page.locator('#alSeed').fill('x1');await click('alRun');await has('alStatus','üretilmedi');
   await range('alSteps',20);await range('alPFree',0.3);await sel('alDist','small');await page.locator('#alSeed').fill('9999');await click('alRun');await is('alTOut','20 / 20');await is('alSumDiff','0 B');
   await range('alSteps',400);await range('alPFree',0.6);await sel('alDist','bimodal');await click('alRun');await is('alTOut','400 / 400');await is('alSumDiff','0 B');
   await click('alReset');await is('alTOut','0 / 0');await is('alExt','%0,0');eq(await page.locator('#alPolicy').inputValue(),'first');eq(await page.locator('#alAlign').inputValue(),'8');eq(await page.locator('#alSeed').inputValue(),'5');await is('alSizeOut','100 B');await is('alPFreeOut','0,50');
   for(let i=0;i<4;i++){await range('alSize',256);await click('alMalloc');}await is('alFails','1 / 4');await is('alFree','224 B');await has('alStatus','zaten yetmiyordu');await range('alSize',224);await click('alMalloc');await is('alFree','0 B');await is('alExt','tanımsız: boş alan yok');await is('alLargest','boş blok yok');await is('alSumDiff','0 B');await click('alReset');await noflow();
   /* 03 */
   await click('tab-err');await has('erStatus','Henüz hiçbir satır');await is('erCount','0 / 6');eq(await page.locator('#erBack').isDisabled(),true);eq(await page.locator('#erNField').isHidden(),true);
   await click('erStep');await is('erCount','1 / 6');eq(await page.locator('#erSrc li.is-cur').count(),1);await click('erBack');await is('erCount','0 / 6');
   await click('erEnd');await is('erCount','6 / 6');await is('erM1','1');await has('erM3','evet (0x3000)');await is('erOut','7');await has('erStatus','garanti değildir');await bad('erStatus',true);eq(await page.locator('#erStep').isDisabled(),true);await has('erVars','sarkan');
   await page.locator('#erFixed').check();await is('erCount','0 / 7');await click('erEnd');await is('erM1','0');await is('erOut','—');await bad('erStatus',false);await page.locator('#erFixed').uncheck();
   await sel('erProg','double');await is('erCount','0 / 8');for(let i=0;i<3;i++)await click('erStep');await has('erList','döngü');await has('erM1','1 (döngü var)');await click('erEnd');await is('erOut','2');await has('erList','0x0002 (geçersiz adres)');await has('erM3','−2');await has('erHeap','iki kez verilmiş');
   await page.locator('#erFixed').check();await click('erEnd');await is('erOut','1');await is('erM3','0');await has('erList','0x3020 → 0x3030 → NULL');await page.locator('#erFixed').uncheck();
   await sel('erProg','leak');await click('erEnd');await is('erM1','4 blok, 64 B');await has('erM2','= 4');await is('erM3','0');await is('erM4','1 / 5');await has('erHeap','sızıntı');await page.locator('#erFixed').check();await click('erEnd');await is('erM1','0 blok, 0 B');await is('erM4','0 / 5');await page.locator('#erFixed').uncheck();
   await sel('erProg','stack');eq(await page.locator('#erNField').isVisible(),true);eq(await page.locator('#erHeapPlate').isHidden(),true);await is('erNOut','12 karakter');await click('erEnd');await is('erM1','5');await has('erM2','5; fark 0');await has('erM3','1094795585');await has('erM4','0x401136 (sağlam)');await is('erOut','ozel_islem() çağrıldı');eq(await page.locator('#erStack .c.is-oob').count(),5);
   await range('erN',0);await is('erCount','0 / 6');await click('erEnd');await is('erM1','0');await is('erM3','0');await bad('erStatus',false);
   await range('erN',8);await click('erEnd');await is('erM1','1');await is('erM3','0');await is('erOut','—');
   await range('erN',31);await click('erEnd');await is('erM1','24');await has('erM2','24; fark 0');await has('erM4','bozuk');await has('erStatus','Model burada duruyor');
   await page.locator('#erFixed').check();await click('erEnd');await is('erM1','0');await has('erM4','sağlam');await has('erStatus','çağırana döndü');await click('erBack');await click('erBack');await has('erStatus','24 karakteri kesildi');await page.locator('#erFixed').uncheck();
   await sel('erProg','obo');await is('erCount','0 / 14');await click('erEnd');await is('erM1','4');await is('erM3','40');await is('erOut','40');await page.locator('#erFixed').check();await click('erEnd');await is('erM1','0');await is('erM3','99');
   await click('erReset');eq(await page.locator('#erProg').inputValue(),'uaf');eq(await page.locator('#erFixed').isChecked(),false);await is('erCount','0 / 6');await noflow();
   /* 04 */
   await click('tab-gc');await is('gcN','6');await has('gcReach','6 (');await has('gcSwept','0 (yok)');await has('gcLeak','0 (yok)');await is('gcSweptDiff','0');await is('gcLeakDiff','0');await bad('gcStatus',false);
   await page.locator('[data-root="3"]').click();await has('gcReach','3 (A, B, C)');await has('gcSwept','3 (D, E, F)');await is('gcSweptTheo','6 − 3 = 3');await has('gcLeak','3 (D, E, F)');await has('gcLeakTheo','3 (D, E, F)');await is('gcLeakDiff','0');await has('gcRcFreed','0 (yok)');await bad('gcStatus',true);await has('gcTable','sızdı');
   await sel('gcFrom','4');await sel('gcTo','3');await page.locator('#gcWeak').check();await click('gcAdd');await has('gcStatus','güçlüden zayıfa çevrildi');await click('gcAdd');await has('gcStatus','zaten var (zayıf)');await has('gcLeak','0 (yok)');await has('gcRcFreed','3 (D, E, F)');await is('gcDec','2');await has('gcEdges','(zayıf)');await has('gcStatus','zayıf başvuru');
   await sel('gcPreset','cift');await has('gcLeak','0 (yok)');await click('gcDropRoots');await has('gcLeak','4 (A, B, C, D)');await has('gcSwept','4 (A, B, C, D)');await has('gcStatus','Hiç kök yok');eq(await page.locator('#gcDropRoots').isDisabled(),true);
   await sel('gcPreset','zincir');await click('gcDropRoots');await has('gcLeak','0 (yok)');await has('gcRcFreed','4 (A, B, C, D)');await is('gcDec','3');
   await sel('gcPreset','oz');await click('gcDropRoots');await has('gcLeak','1 (B)');await sel('gcPreset','agac');await click('gcDropRoots');await has('gcLeak','5 (');
   await sel('gcFrom','root');await sel('gcTo','2');await page.locator('#gcWeak').uncheck();await click('gcAdd');await has('gcReach','5 (');await has('gcLeak','0 (yok)');
   for(let i=0;i<7;i++)await page.locator('#gcAddNode').click({force:true}).catch(()=>{});await is('gcN','10');eq(await page.locator('#gcAddNode').isDisabled(),true);await is('gcSweptDiff','0');
   for(let i=0;i<9;i++)await click('gcDelNode');await is('gcN','1');eq(await page.locator('#gcDelNode').isDisabled(),true);await is('gcLeakDiff','0');
   await click('gcReset');await is('gcN','6');await has('gcLeak','0 (yok)');eq(await page.locator('#gcPreset').inputValue(),'karma');await noflow();
   // tuvaller gerçekten çizildi mi (boş değil)
   for(const[t,c]of[['heap','alMap'],['heap','alChart'],['gc','gcCanvas']]){await click('tab-'+t);if(c!=='gcCanvas')await click('alHoles');eq(await page.locator('#'+c).evaluate(cv=>{const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data,s=new Set();for(let i=0;i<d.length;i+=4*97)s.add(d[i]<<16|d[i+1]<<8|d[i+2]);return s.size>=3&&cv.width>100;}),true,c);}
   assert.deepEqual(errors,[]);checks++;await ctx.close();}
  console.log(`G ${SLUG}: ${checks-before} tarayıcı denetimi (390 px açık + 1280 px koyu; dört sekme, hazır düzenler, sınır değerler, klavye, sıfırlama, etiketler, taşma) PASS`);
 }finally{await browser?.close();server.closeAllConnections?.();await new Promise(r=>server.close(r));}
}
